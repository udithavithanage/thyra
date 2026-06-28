import {
  runConfig,
  runVersion,
  runOpen,
  runList,
  runHelp,
  runRemove,
  runUpdate,
  runImport,
} from "./commands";
import { getConfigFilePath, ConfigStore } from "~/core";

(function run() {
  const [, , command, ...rest] = process.argv;

  const store = new ConfigStore(getConfigFilePath());

  if (
    !command ||
    command === "help" ||
    command === "--help" ||
    command === "-h"
  ) {
    runHelp(0);
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
    case "remove":
      runRemove(store, rest);
      break;
    case "update":
      runUpdate(store, rest);
      break;
    case "list":
      runList(store);
      break;
    case "import":
      runImport(store, rest);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      runHelp(1);
  }
})();
