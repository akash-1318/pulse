import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export function useSocket(token, handlers = {}) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) return undefined;
    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", { auth: { token } });
    socketRef.current = socket;
    if (handlers.onVideoProgress) socket.on("video:progress", handlers.onVideoProgress);
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, handlers]);

  return socketRef;
}
