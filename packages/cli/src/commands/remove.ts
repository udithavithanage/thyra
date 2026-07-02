import readline from "node:readline";

import color from "picocolors";

import type { ConfigStore } from "~/core";

export async function runRemove(store: ConfigStore, args: string[]): Promise<void> {
  const isAll = args.includes("--all");
  const isForce = args.includes("--force");

  if (isAll) {
    const allKeys = Object.keys(store.all());
    if (allKeys.length === 0) {
      console.log("No projects to remove.");
      return;
    }

    if (!isForce) {
      console.log(color.yellow("⚠️  You are about to delete ALL projects."));
      console.log(color.yellow("This action cannot be undone."));
      
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await new Promise<string>((resolve) => {
        rl.question("\nType 'yes' to confirm: ", (input) => {
          rl.close();
          resolve(input.trim());
        });
      });

      if (answer !== "yes") {
        console.log("\nOperation cancelled.");
        return;
      }
    }

    store.clearCache();
    store.clear();
    store.reload();
    console.log(color.green("\nRegistry cleared successfully."));
    return;
  }

  // Original single-project deletion logic
  const name = args.find((arg) => !arg.startsWith("--"));

  if (!name) {
    console.error("Missing <name> argument for 'remove' command.");
    console.log("Usage: thyra remove <name> OR thyra remove --all");
    process.exit(1);
  }

  if (!store.has(name)) {
    console.error(
      `No folder found for alias "${name}". Use 'thyra list' to see saved entries.`
    );
    process.exit(1);
  }

  store.delete(name);
  console.log(`Removed mapping: "${name}"`);
}
