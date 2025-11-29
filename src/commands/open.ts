import fs from "node:fs";
import { openInEditor } from "~/editor.js";

import type { ConfigStore } from "~/configStore";

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

export function runOpen(store: ConfigStore, args: string[]): void {
  const name = args[0];
  if (!name) {
    console.error("Missing <name> argument for 'open' command.");
    console.log("Usage: thyra open <name>");
    process.exit(1);
  }

  if (!store.has(name)) {
    console.error(
      `No folder found for name "${name}". Use 'thyra list' to see saved entries.`,
    );
    process.exit(1);
  }

  const folderPath = store.get(name);
  if (!folderPath) {
    console.error(`Invalid folder path for name "${name}".`);
    process.exit(1);
  }

  ensureDirectoryExists(folderPath);
  openInEditor(folderPath);
}
