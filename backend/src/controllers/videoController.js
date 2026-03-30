import fs from "node:fs";
import path from "node:path";
import { Video } from "../models/Video.js";
import { httpError } from "../utils/httpError.js";
import { env } from "../config/env.js";
import { processVideo } from "../services/videoProcessingService.js";

function canAccessVideo(user, video) {
  const sameOrg = user.organizationId === video.organizationId.toString();
  if (!sameOrg) return false;
  if (user.role === "admin") return true;
  if (user.role === "editor") return true;
  return video.ownerId.toString() === user.id;
}

export async function uploadVideo(req, res, next) {
  try {
    if (!req.file) return next(httpError(400, "Video file is required"));
    const { title, description = "", category = "general" } = req.body;
    if (!title) return next(httpError(400, "title is required"));

    const video = await Video.create({
      organizationId: req.user.organizationId,
      ownerId: req.user.id,
      title, description, category,
      originalName: req.file.originalname,
      storedFilename: req.file.filename,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      processingStatus: "uploaded",
      processingProgress: 0,
      sensitivityStatus: "pending"
    });

    processVideo(video._id.toString()).catch((error) => console.error("Video processing failed", error));
    res.status(201).json({ video });
  } catch (error) { next(error); }
}

export async function listVideos(req, res, next) {
  try {
    const { status, sensitivity, category, q, from, to } = req.query;
    const filter = { organizationId: req.user.organizationId };
    if (req.user.role === "viewer") filter.ownerId = req.user.id;
    if (status) filter.processingStatus = status;
    if (sensitivity) filter.sensitivityStatus = sensitivity;
    if (category) filter.category = category;
    if (q) filter.$or = [{ title: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: "i" } }];
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }
    const videos = await Video.find(filter).sort({ createdAt: -1 });
    res.json({ videos });
  } catch (error) { next(error); }
}

export async function getVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(httpError(404, "Video not found"));
    if (!canAccessVideo(req.user, video)) return next(httpError(403, "You do not have access to this video"));
    res.json({ video });
  } catch (error) { next(error); }
}

export async function updateVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(httpError(404, "Video not found"));
    if (!canAccessVideo(req.user, video)) return next(httpError(403, "You do not have access to this video"));

    const { title, description, category } = req.body;
    if (title !== undefined) video.title = title;
    if (description !== undefined) video.description = description;
    if (category !== undefined) video.category = category;

    await video.save();
    res.json({ video });
  } catch (error) { next(error); }
}

export async function streamVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(httpError(404, "Video not found"));
    if (!canAccessVideo(req.user, video)) return next(httpError(403, "You do not have access to this video"));
    if (video.processingStatus !== "completed") return next(httpError(409, "Video is not ready for streaming yet"));

    const filePath = path.resolve(process.cwd(), env.uploadDir, video.storedFilename);
    if (!fs.existsSync(filePath)) return next(httpError(404, "Stored video file not found"));

    const fileSize = fs.statSync(filePath).size;
    const range = req.headers.range;

    if (!range) {
      res.writeHead(200, { "Content-Length": fileSize, "Content-Type": video.mimeType, "Accept-Ranges": "bytes" });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    const parts = range.replace(/bytes=/, "").split("-");
    const start = Number.parseInt(parts[0], 10);
    const end = parts[1] ? Number.parseInt(parts[1], 10) : fileSize - 1;

    if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= fileSize) {
      return next(httpError(416, "Invalid range request"));
    }

    const chunkSize = end - start + 1;
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": video.mimeType
    });

    fs.createReadStream(filePath, { start, end }).pipe(res);
  } catch (error) { next(error); }
}

export async function deleteVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(httpError(404, "Video not found"));
    if (!canAccessVideo(req.user, video)) return next(httpError(403, "You do not have access to this video"));

    const filePath = path.resolve(process.cwd(), env.uploadDir, video.storedFilename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await video.deleteOne();
    res.json({ message: "Video deleted successfully" });
  } catch (error) { next(error); }
}
