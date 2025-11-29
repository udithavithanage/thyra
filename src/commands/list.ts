import type { ConfigStore } from "~/configStore";

export function runList(store: ConfigStore): void {
  const all = store.all();
  const keys = Object.keys(all);

  if (keys.length === 0) {
    console.log("No folders saved yet.");
    console.log("Use: thyra config <name> <folder_path>");
    return;
  }

  const rows = keys.map((key) => ({
    Name: key,
    Path: all[key],
  }));

  console.log("\nSaved folders:\n");
  console.table(rows);
}
