import crypto from "node:crypto";
import path from "node:path";

import { resolveFolderPath, ensureDirectoryExists } from "~/utils";
import  { ConfigStore } from "~/core";

export function runConfig(store: ConfigStore, args: string[]): void {
  const name = args[0];
  const folderArg = args[1];

  if (!name || !folderArg) {
    console.error("Missing arguments for 'config' command.");
    console.log("Usage: thyra config <name> <folder_path>");
    process.exit(1);
  }

  const folderPath = resolveFolderPath(folderArg);
  ensureDirectoryExists(folderPath);

  const folderName = path.basename(folderPath);

  store.set(name, {
    id: crypto.randomUUID(),
    name: folderName || name,
    alias: name,
    path: folderPath,
    createdAt: new Date().toISOString(),
  });
  console.log(`Saved mapping: "${name}" -> ${folderPath}`);
}
