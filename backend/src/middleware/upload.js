import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { env } from "../config/env.js";
import { httpError } from "../utils/httpError.js";

const uploadDirectory = path.resolve(process.cwd(), env.uploadDir);
fs.mkdirSync(uploadDirectory, { recursive: true });

const allowedMimeTypes = ["video/mp4","video/webm","video/ogg","video/quicktime","video/x-msvideo"];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDirectory),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`)
});

export const uploadVideo = multer({
  storage,
  limits: { fileSize: env.maxVideoSizeMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) return cb(httpError(400, "Unsupported video format"));
    cb(null, true);
  }
});
