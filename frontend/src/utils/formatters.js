export function formatBytes(bytes = 0) {
  if (!bytes) return "0 B";
  const sizes = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
  return `${(bytes / (1024 ** index)).toFixed(1)} ${sizes[index]}`;
}
export function formatDate(value) { return new Date(value).toLocaleString(); }
export function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return "Unknown";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
}
