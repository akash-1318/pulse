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

  const allowedOrigins = [
    "http://localhost:5173",
    "https://pulse-five-tan.vercel.app",
    "https://pulse-1-czde.onrender.com",
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (
          !origin ||
          allowedOrigins.includes(origin) ||
          origin.endsWith(".vercel.app") ||
          origin.endsWith(".onrender.com")
        ) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      optionsSuccessStatus: 200,
      maxAge: 86400,
    }),
  );

  // Handle preflight requests
  app.options("*", cors());

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
