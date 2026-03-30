import { execFile } from "node:child_process";

function execFileAsync(command, args) {
  return new Promise((resolve, reject) => {
    execFile(command, args, (error, stdout) => error ? reject(error) : resolve(stdout));
  });
}

export async function probeVideoDuration(filePath) {
  try {
    const output = await execFileAsync("ffprobe", [
      "-v","error","-show_entries","format=duration","-of",
      "default=noprint_wrappers=1:nokey=1", filePath
    ]);
    const duration = Number.parseFloat(output.trim());
    return Number.isFinite(duration) ? duration : null;
  } catch {
    return null;
  }
}
