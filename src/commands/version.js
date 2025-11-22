import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function runVersion() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const packagePath = path.join(__dirname, "../../package.json");

  const data = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  console.log(`v${data.version}`);
}
