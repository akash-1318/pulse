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

  const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        callback(null, true);
        return;
      }

      // Check exact matches
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      // Check domain patterns
      if (
        origin.includes("vercel.app") ||
        origin.includes("onrender.com") ||
        origin.includes("localhost")
      ) {
        callback(null, true);
        return;
      }

      callback(null, true); // Allow all origins in production for now
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    optionsSuccessStatus: 200,
    maxAge: 86400,
  };

  app.use(cors(corsOptions));

  // Handle preflight requests explicitly
  app.options("*", cors(corsOptions));

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
