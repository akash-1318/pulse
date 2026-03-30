import { Router } from "express";
import { deleteVideo, getVideo, listVideos, streamVideo, updateVideo, uploadVideo } from "../controllers/videoController.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";
import { uploadVideo as uploadMiddleware } from "../middleware/upload.js";

const router = Router();
router.use(requireAuth);
router.get("/", listVideos);
router.post("/", requireRole("editor", "admin"), uploadMiddleware.single("video"), uploadVideo);
router.get("/:id", getVideo);
router.patch("/:id", requireRole("editor", "admin"), updateVideo);
router.delete("/:id", requireRole("editor", "admin"), deleteVideo);
router.get("/:id/stream", streamVideo);
export default router;
