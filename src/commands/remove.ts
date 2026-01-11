import type { ConfigStore } from "~/configStore";

export function runRemove(store: ConfigStore, args: string[]): void {
  const name = args[0];

  if (!name) {
    console.error("Missing <name> argument for 'remove' command.");
    console.log("Usage: thyra remove <name>");
    process.exit(1);
  }

  if (!store.has(name)) {
    console.error(
      `No folder found for name "${name}". Use 'thyra list' to see saved entries.`
    );
    process.exit(1);
  }

  store.delete(name);
  console.log(`Removed mapping: "${name}"`);
}
