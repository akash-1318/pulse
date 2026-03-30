import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || "change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  maxVideoSizeMb: Number(process.env.MAX_VIDEO_SIZE_MB || 200),
  uploadDir: process.env.UPLOAD_DIR || "uploads",
};
