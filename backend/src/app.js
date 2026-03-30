import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { env } from "./config/env.js";

export function createApp() {
  const app = express();
  app.use(cors({ origin: env.clientUrl, credentials: true }));
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(morgan("dev"));
  app.use(express.json());

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/videos", videoRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
