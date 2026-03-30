import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["viewer", "editor", "admin"], default: "viewer" }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
