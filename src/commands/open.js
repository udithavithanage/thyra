import fs from "node:fs";
import { exec } from "node:child_process";

function openInEditor(folderPath) {
  const editorCmd = process.env.THYRA_EDITOR || "code";
  let safePath = folderPath;
  if (editorCmd.trim() != "explorer") {
    safePath = folderPath.replace(/(["\\$`])/g, "\\$1");
  }
  const command = `${editorCmd} "${safePath}"`;

  console.log(`Opening "${folderPath}" in "${editorCmd}"...`);

  const child = exec(command, (error, stdout, stderr) => {
    if (stdout) {
      process.stdout.write(stdout);
    }
    if (stderr) {
      process.stderr.write(stderr);
    }

    if (error && editorCmd !== "explorer") {
      console.error(
        `Failed to start editor "${editorCmd}". Is it installed and on your PATH?`
      );
      console.error(error.message);
      process.exit(1);
    }
  });

  if (child.stdout) {
    child.stdout.pipe(process.stdout);
  }
  if (child.stderr) {
    child.stderr.pipe(process.stderr);
  }
}

function ensureDirectoryExists(folderPath) {
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

export function runOpen(store, args) {
  const name = args[0];
  if (!name) {
    console.error("Missing <name> argument for 'open' command.");
    console.log("Usage: thyra open <name>");
    process.exit(1);
  }

  if (!store.has(name)) {
    console.error(
      `No folder found for name "${name}". Use 'thyra list' to see saved entries.`
    );
    process.exit(1);
  }

  const folderPath = store.get(name);
  ensureDirectoryExists(folderPath);
  openInEditor(folderPath);
}
