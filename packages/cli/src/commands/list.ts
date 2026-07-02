import color from "picocolors";

import { colorize, printCommandTable, ConfigStore } from "~/core";

export function runList(store: ConfigStore) {
  const all = store.all();
  const keys = Object.keys(all);

  if (keys.length === 0) {
    console.log(color.dim("No folders saved yet."));
    console.log("Use: " + colorize("thyra config <name> <folder_path>"));
    return;
  }

  const rows = keys.map((key) => {
    const entry = all[key];
    return {
      Command: color.cyan(entry.alias || key),
      Description: color.dim(entry.path),
    };
  });

  console.log("\n" + color.bold("Saved folders:\n"));

  printCommandTable(rows, {
    header: {
      Command: "Name",
      Description: "Path",
    },
  });
}
