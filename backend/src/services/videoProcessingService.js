import path from "node:path";
import { Video } from "../models/Video.js";
import { classifySensitivity } from "../utils/sensitivity.js";
import { probeVideoDuration } from "../utils/videoMetadata.js";
import { emitToOrganizationUser } from "./socketService.js";
import { env } from "../config/env.js";

const progressStages = [10, 25, 45, 65, 80, 100];
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function processVideo(videoId) {
  const video = await Video.findById(videoId);
  if (!video) return;

  try {
    video.processingStatus = "processing";
    video.processingProgress = 5;
    await video.save();
    emitProgress(video);

    for (const progress of progressStages) {
      await wait(900);

      if (progress === 25) {
        const filePath = path.resolve(process.cwd(), env.uploadDir, video.storedFilename);
        const duration = await probeVideoDuration(filePath);
        if (duration) video.durationSeconds = Math.round(duration);
      }

      if (progress === 65) {
        const result = classifySensitivity({ title: video.title, description: video.description, filename: video.originalName });
        video.sensitivityStatus = result.status;
        video.sensitivityScore = result.score;
        video.matchedKeywords = result.matchedKeywords;
      }

      video.processingProgress = progress;
      await video.save();
      emitProgress(video);
    }

    video.processingStatus = "completed";
    if (video.sensitivityStatus === "pending") {
      const result = classifySensitivity({ title: video.title, description: video.description, filename: video.originalName });
      video.sensitivityStatus = result.status;
      video.sensitivityScore = result.score;
      video.matchedKeywords = result.matchedKeywords;
    }
    await video.save();
    emitProgress(video, true);
  } catch (error) {
    video.processingStatus = "failed";
    video.processingProgress = 100;
    await video.save();
    emitProgress(video, false, error.message);
  }
}

function emitProgress(video, completed = false, error = null) {
  emitToOrganizationUser(video.ownerId.toString(), "video:progress", {
    videoId: video._id.toString(),
    title: video.title,
    processingStatus: video.processingStatus,
    processingProgress: video.processingProgress,
    sensitivityStatus: video.sensitivityStatus,
    sensitivityScore: video.sensitivityScore,
    matchedKeywords: video.matchedKeywords,
    completed,
    error
  });
}
