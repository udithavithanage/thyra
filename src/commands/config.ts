import type { ConfigStore } from "~/configStore";
import { resolveFolderPath, ensureDirectoryExists } from "~/utils/path";

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

  store.set(name, folderPath);
  console.log(`Saved mapping: "${name}" -> ${folderPath}`);
}
