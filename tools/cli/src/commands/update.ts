import { ConfigStore } from "~/core";
import { resolveFolderPath, ensureDirectoryExists } from "~/utils";

export function runUpdate(store: ConfigStore, args: string[]): void {
  const name = args[0];

  if (!name) {
    console.error("Missing <name> argument for 'update' command.");
    console.log(
      "Usage: thyra update <name> [--path <folder_path>] [--editor <editor>]",
    );
    process.exit(1);
  }

  if (!store.has(name)) {
    console.error(
      `No folder found for alias "${name}". Use 'thyra list' to see saved entries.`,
    );
    process.exit(1);
  }

  const entry = store.get(name)!;

  let pathArg: string | undefined;
  let editorArg: string | undefined;

  // Simple flag parsing
  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--path" && args[i + 1]) {
      pathArg = args[i + 1];
      i++;
    } else if (args[i] === "--editor" && args[i + 1]) {
      editorArg = args[i + 1];
      i++;
    }
  }

  let updated = false;

  if (pathArg) {
    const folderPath = resolveFolderPath(pathArg);
    ensureDirectoryExists(folderPath);
    entry.path = folderPath;
    updated = true;
  }

  if (editorArg) {
    entry.editor = editorArg;
    updated = true;
  }

  if (updated) {
    store.set(name, entry);
    console.log(
      `Updated mapping: "${name}" -> ${entry.path}${entry.editor ? ` (editor: ${entry.editor})` : ""}`,
    );
  } else {
    console.log(
      "No changes provided. Usage: thyra update <name> [--path <folder_path>] [--editor <editor>]",
    );
  }
}
