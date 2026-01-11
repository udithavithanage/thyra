import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export function resolveFolderPath(inputPath: string): string {
  let folderPath = inputPath.replace(/^~(?=$|[\\\/])/, os.homedir());
  folderPath = path.resolve(folderPath);
  return folderPath;
}

export function ensureDirectoryExists(folderPath: string): void {
  if (!fs.existsSync(folderPath)) {
    console.error(`Folder does not exist: ${folderPath}`);
    process.exit(1);
  }

  const stat = fs.statSync(folderPath);
  if (!stat.isDirectory()) {
    console.error(`Path is not a directory: ${folderPath}`);
    process.exit(1);
  }
}
