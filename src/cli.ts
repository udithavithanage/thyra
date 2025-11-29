import { runConfig } from "~/commands/config";
import { runVersion } from "~/commands/version";
import { runOpen } from "~/commands/open";
import { runList } from "~/commands/list";
import { runHelp } from "~/commands/help";

import { getConfigFilePath, ConfigStore } from "~/configStore";

(function run() {
  const [, , command, ...rest] = process.argv;

  const configPath = getConfigFilePath();
  const store = new ConfigStore(configPath);

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
    runVersion();
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
      break;
  }
})();
