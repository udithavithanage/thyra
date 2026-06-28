import { spawn } from "node:child_process";

import color from "picocolors";

import { ConfigStore } from "~/core";
import { ensureDirectoryExists } from "~/utils";

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

function levenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
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
    
    // Fuzzy matching suggestion
    const allAliases = Object.keys(store.all());
    if (allAliases.length > 0) {
      let closest = "";
      let minDistance = Infinity;
      for (const alias of allAliases) {
        if (alias.includes(name)) {
          closest = alias;
          break; // fast path
        }
        const dist = levenshteinDistance(name, alias);
        if (dist < minDistance) {
          minDistance = dist;
          closest = alias;
        }
      }
      
      if (closest && (closest.includes(name) || minDistance <= 3)) {
        console.log(`\nDid you mean: ${color.green(closest)} ?`);
      }
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
