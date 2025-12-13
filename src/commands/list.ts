import color from "picocolors";

import { colorize, printCommandTable } from "~/color-logs";

import type { ConfigStore } from "~/configStore";

export function runList(store: ConfigStore) {
  const all = store.all();
  const keys = Object.keys(all);

  if (keys.length === 0) {
    console.log(color.dim("No folders saved yet."));
    console.log("Use: " + colorize("thyra config <name> <folder_path>"));
    return;
  }

  const rows = keys.map((key) => ({
    Command: color.cyan(key),
    Description: color.dim(all[key]),
  }));

  console.log("\n" + color.bold("Saved folders:\n"));

  printCommandTable(rows, {
    header: {
      Command: "Name",
      Description: "Path",
    },
  });
}
