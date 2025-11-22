import { exec } from "node:child_process";

export function openInEditor(folderPath) {
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
