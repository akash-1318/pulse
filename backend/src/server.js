import http from "node:http";
import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";

const app = createApp();
const server = http.createServer(app);

connectDb()
  .then(() => {
    server.listen(env.port, () =>
      console.log(`Backend running on port ${env.port}`),
    );
  })
  .catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });
