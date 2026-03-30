let ioInstance = null;

export function setSocketIo(io) { ioInstance = io; }
export function emitToOrganizationUser(userId, event, payload) {
  if (!ioInstance) return;
  ioInstance.to(`user:${userId}`).emit(event, payload);
}
