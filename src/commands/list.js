import { c, colorize, printCommandTable } from "../colorLogs.js";

export function runList(store) {
  const all = store.all();
  const keys = Object.keys(all);

  if (keys.length === 0) {
    console.log(c.dim("No folders saved yet."));
    console.log("Use: " + colorize("thyra config <name> <folder_path>"));
    return;
  }

  const rows = keys.map((key) => ({
    Command: c.cyan(key),
    Description: c.dim(all[key]),
  }));

  console.log("\n" + c.bold("Saved folders:\n"));

  printCommandTable(rows, {
    header: {
      Command: "Name",
      Description: "Path",
    },
  });
}
