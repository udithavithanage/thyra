import { spawn } from "node:child_process";

import color from "picocolors";

import { ConfigStore } from "~/core";
import { ensureDirectoryExists, suggestClosestAlias } from "~/utils";

function quoteShellArg(value: string): string {
  if (process.platform === "win32") return `"${value.replace(/"/g, '""')}"`;
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

function openInEditor(folderPath: string) {
  const editorCmd = process.env.EDITOR || "code";
  const command = `${editorCmd} ${quoteShellArg(folderPath)}`;

  console.log(`Opening "${folderPath}" in "${editorCmd}"...`);

  const child = spawn(command, {
    shell: true,
    stdio: "inherit",
  });

  child.on("error", (error) => {
    if (editorCmd !== "explorer") {
      console.error(`Failed to start editor "${editorCmd}". Is it installed and on your PATH?`);
      console.error(error.message);
      process.exit(1);
    }
  });

  child.on("close", (code) => {
    if (code && editorCmd !== "explorer") {
      console.error(`Editor "${editorCmd}" exited with code ${code}.`);
      process.exit(code);
    }
  });
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
      `No folder found for alias "${name}". Use 'thyra list' to see saved entries.`
    );

    const allAliases = Object.keys(store.all());
    const closest = suggestClosestAlias(name, allAliases);
    if (closest) {
      console.log(`\nDid you mean: ${color.green(closest)} ?`);
    }

    process.exit(1);
  }

  const entry = store.get(name);
  if (!entry || !entry.path) {
    console.error(`Invalid folder path for alias "${name}".`);
    process.exit(1);
  }

  ensureDirectoryExists(entry.path);
  openInEditor(entry.path);
}
