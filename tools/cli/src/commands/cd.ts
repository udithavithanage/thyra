import color from "picocolors";

import { ConfigStore } from "~/core";
import { ensureDirectoryExists, suggestClosestAlias } from "~/utils";

export function runCd(store: ConfigStore, args: string[]): void {
  const name = args[0];

  if (!name) {
    console.error("Missing <name> argument for 'cd' command.");
    console.error("Usage: thyra cd <name>");
    process.exit(1);
  }

  if (!store.has(name)) {
    console.error(
      `No folder found for alias "${name}". Use 'thyra list' to see saved entries.`
    );

    const allAliases = Object.keys(store.all());
    const closest = suggestClosestAlias(name, allAliases);
    if (closest) {
      console.error(`\nDid you mean: ${color.green(closest)} ?`);
    }

    process.exit(1);
  }

  const entry = store.get(name);
  if (!entry || !entry.path) {
    console.error(`Invalid folder path for alias "${name}".`);
    process.exit(1);
  }

  ensureDirectoryExists(entry.path);

  process.stdout.write(`${entry.path}\n`);
}