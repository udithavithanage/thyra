import { c, colorize, printCommandTable } from "../colorLogs.js";

export function runHelp(exitCode) {
  console.log(
    `\n${c.bold(c.cyan("thyra"))} ${c.dim(
      "- Quick shortcut manager for project folders"
    )}\n`
  );

  const rows = [
    {
      Command: colorize("thyra config <name> <folder_path>"),
      Description: "Save a folder path",
    },
    {
      Command: colorize("thyra open <name>"),
      Description: "Open folder in your editor",
    },
    { Command: colorize("thyra list"), Description: "Show all saved paths" },
    { Command: colorize("thyra --version"), Description: "Show CLI version" },
    { Command: colorize("thyra --help"), Description: "Show this help" },
  ];

  printCommandTable(rows);

  console.log(
    `\n${c.bold(c.underline("Examples:"))}
  ${colorize("thyra config <name> <folder_path>")}   ${c.dim("# Save a path")}
  ${colorize("thyra open <name>")}                   ${c.dim(
      "# Open in editor"
    )}
  ${colorize("thyra --version")}

${c.bold(c.underline("Environment:"))}
  ${c.cyan("THYRA_EDITOR")}  ${c.dim('Editor command (default: "code")')}
`
  );

  if (typeof exitCode === "number") process.exit(exitCode);
}
