import { ConfigStore } from "./configStore.js";
import { runConfig } from "./commands/config.js";
import { runVersion } from "./commands/version.js";
import { runOpen } from "./commands/open.js";
import { runList } from "./commands/list.js";
import { runHelp } from "./commands/help.js";
import { getConfigFilePath } from "./configStore.js";

(function run() {
  const [, , command, ...rest] = process.argv;

  const store = new ConfigStore(getConfigFilePath());

  if (
    !command ||
    command === "help" ||
    command === "--help" ||
    command === "-h"
  ) {
    runHelp();
    return;
  }
  if (command === "version" || command === "--version" || command === "-v") {
    runVersion(store);
    return;
  }

  switch (command) {
    case "config":
      runConfig(store, rest);
      break;
    case "open":
      runOpen(store, rest);
      break;
    case "list":
      runList(store);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      runHelp(1);
  }
})();
