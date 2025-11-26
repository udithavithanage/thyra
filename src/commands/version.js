import { version } from "../../package.json" assert { type: "json" };

export function runVersion() {
  console.log(`v${version}`);
}
