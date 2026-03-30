import http from "node:http";
import { Server } from "socket.io";
import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { setSocketIo } from "./services/socketService.js";
import { verifyToken } from "./utils/jwt.js";

const app = createApp();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: env.clientUrl, credentials: true },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication token missing"));
    socket.data.user = verifyToken(token);
    next();
  } catch {
    next(new Error("Socket authentication failed"));
  }
});

io.on("connection", (socket) => {
  const { sub: userId, organizationId } = socket.data.user;
  socket.join(`user:${userId}`);
  socket.join(`org:${organizationId}`);
});

setSocketIo(io);

connectDb()
  .then(() => {
    server.listen(env.port, () =>
      console.log(`Backend running on http://localhost:${env.port}`),
    );
  })
  .catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });
