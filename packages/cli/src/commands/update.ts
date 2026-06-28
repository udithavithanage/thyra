import { ConfigStore } from "~/core";
import { resolveFolderPath, ensureDirectoryExists } from "~/utils";

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
      `No folder found for alias "${name}". Use 'thyra list' to see saved entries.`
    );
    process.exit(1);
  }

  const folderPath = resolveFolderPath(folderArg);
  ensureDirectoryExists(folderPath);

  const entry = store.get(name)!;
  entry.path = folderPath;
  store.set(name, entry);
  console.log(`Updated mapping: "${name}" -> ${folderPath}`);
}
