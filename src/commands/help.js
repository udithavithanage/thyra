export function runHelp(exitCode) {
  console.log(`
thyra - Quick shortcut manager for project folders
`);

  console.table([
    {
      Command: "thyra config <name> <folder_path>",
      Description: "Save a folder path",
    },
    { Command: "thyra open <name>", Description: "Open folder in your editor" },
    { Command: "thyra list", Description: "Show all saved paths" },
    { Command: "thyra --version", Description: "Show CLI version" },
    { Command: "thyra --help", Description: "Show this help" },
  ]);

  console.log(`
Examples:
  thyra config my-app ~/projects/my-app
  thyra open my-app
  thyra --version

Environment:
  THYRA_EDITOR                        Editor command (default: "code")
`);

  if (typeof exitCode === "number") {
    process.exit(exitCode);
  }
}
