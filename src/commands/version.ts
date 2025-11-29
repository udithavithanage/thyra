import { version } from "package" assert { type: "json" };

export function runVersion(): void {
  console.log(`v${version}`);
}
