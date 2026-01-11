import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { ConfigStore } from "~/configStore";

function resolveFolderPath(inputPath: string): string {
  let folderPath = inputPath.replace(/^~(?=$|[\\\/])/, os.homedir());
  folderPath = path.resolve(folderPath);
  return folderPath;
}

function ensureDirectoryExists(folderPath: string): void {
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

export function runUpdate(store: ConfigStore, args: string[]): void {
  const name = args[0];
  const folderArg = args[1];

  if (!name || !folderArg) {
    console.error("Missing arguments for 'update' command.");
    console.log("Usage: thyra update <name> <folder_path>");
    process.exit(1);
  }

  if (!store.has(name)) {
    console.error(
      `No mapping found for name "${name}". Use 'thyra list' to see saved entries.`
    );
    process.exit(1);
  }

  const folderPath = resolveFolderPath(folderArg);
  ensureDirectoryExists(folderPath);

  store.set(name, folderPath);
  console.log(`Updated mapping: "${name}" -> ${folderPath}`);
}
