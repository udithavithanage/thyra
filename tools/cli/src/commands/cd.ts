import { spawn } from "node:child_process";

import { ConfigStore } from "~/core";

export function runCd(store: ConfigStore, args: string[]): void {
  const name = args[0];

  if (!name) {
    console.error("Missing argument for 'cd' command.");
    console.log("Usage: thyra cd <alias>");
    process.exit(1);
  }

  const entry = store.get(name);

  if (!entry || !entry.path) {
    console.error(`No project found with alias "${name}".`);
    process.exit(1);
  }

  try {
    // Open a new Terminal window in the project directory
    spawn("open", ["-a", "Terminal", entry.path], {
      detached: true,
      stdio: "ignore",
    });

    console.log(`Opened terminal at: ${entry.path}`);
  } catch (err) {
    console.error(`Failed to open terminal at "${entry.path}":`, err);
    process.exit(1);
  }
}
