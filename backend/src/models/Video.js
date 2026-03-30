import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    category: { type: String, default: "general", trim: true },
    originalName: { type: String, required: true },
    storedFilename: { type: String, required: true },
    mimeType: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    durationSeconds: { type: Number, default: null },
    processingStatus: { type: String, enum: ["uploaded", "processing", "completed", "failed"], default: "uploaded", index: true },
    processingProgress: { type: Number, default: 0 },
    sensitivityStatus: { type: String, enum: ["pending", "safe", "flagged"], default: "pending", index: true },
    sensitivityScore: { type: Number, default: 0 },
    matchedKeywords: { type: [String], default: [] }
  },
  { timestamps: true }
);

videoSchema.index({ organizationId: 1, ownerId: 1, createdAt: -1 });
export const Video = mongoose.model("Video", videoSchema);
