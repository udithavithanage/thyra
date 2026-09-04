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

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--path") {
      if (pathArg) {
        console.error("Error: Path already specified.");
        process.exit(1);
      }
      const val = args[i + 1];
      if (!val || val.startsWith("--")) {
        console.error("Error: Missing value for --path.");
        process.exit(1);
      }
      pathArg = val;
      i++;
    } else if (arg === "--editor") {
      if (editorArg) {
        console.error("Error: --editor already specified.");
        process.exit(1);
      }
      const val = args[i + 1];
      if (!val || val.startsWith("--")) {
        console.error("Error: Missing value for --editor.");
        process.exit(1);
      }
      editorArg = val;
      i++;
    } else if (arg.startsWith("--")) {
      console.error(`Error: Unknown flag '${arg}'.`);
      process.exit(1);
    } else {
      if (pathArg) {
        console.error(`Error: Unexpected argument '${arg}'.`);
        process.exit(1);
      }
      pathArg = arg;
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
    console.error(
      "No changes provided. Usage: thyra update <name> [--path <folder_path>] [--editor <editor>]",
    );
    process.exit(1);
  }
}
