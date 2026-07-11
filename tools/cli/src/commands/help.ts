import color from "picocolors";

import { colorize, printCommandTable } from "~/core";

export function runHelp(exitCode: number) {
  console.log(
    `\n${color.bold(color.cyan("thyra"))} ${color.dim(
      "- Quick shortcut manager for project folders"
    )}\n`
  );

  const rows = [
    {
      Command: colorize("thyra config <name> <folder_path>"),
      Description: "Save a folder path",
    },
    {
      Command: colorize("thyra import <directory>"),
      Description: "Scan and register projects from a directory",
    },
    {
      Command: colorize("thyra open <name>"),
      Description: "Open folder in your editor",
    },
    {
      Command: colorize("thyra update <name> <folder_path>"),
      Description: "Update an existing saved path",
    },
    {
      Command: colorize("thyra remove <name> | --all | --force"),
      Description: "Remove a saved path or all paths (--force to skip confirmation)",
    },
    { Command: colorize("thyra list"), Description: "Show all saved paths" },
    { Command: colorize("thyra --version"), Description: "Show CLI version" },
    { Command: colorize("thyra --help"), Description: "Show this help" },
  ];

  printCommandTable(rows);

  console.log(
    `\n${color.bold(color.underline("Examples:"))}
  ${colorize("thyra config <name> <folder_path>")}   ${color.dim(
      "# Save a path"
    )}
  ${colorize("thyra import ./projects")}             ${color.dim(
      "# Import multiple projects"
    )}
  ${colorize("thyra open <name>")}                   ${color.dim(
      "# Open in editor"
    )}
  ${colorize("thyra update <name> <folder_path>")} ${color.dim(
      "# Update an existing saved path"
    )}
  ${colorize("thyra remove <name>")}                ${color.dim(
      "# Remove a saved path"
    )}
  ${colorize("thyra remove --all")}                 ${color.dim(
      "# Remove all saved paths"
    )}
  ${colorize("thyra --version")}

${color.bold(color.underline("Environment:"))}
  ${color.cyan("EDITOR")}  ${color.dim(
      'Editor command (default: "code")'
    )}
`
  );

  if (typeof exitCode === "number") process.exit(exitCode);
}
