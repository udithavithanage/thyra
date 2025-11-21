import fs from "fs";

export function runVersion() {
  const data = JSON.parse(fs.readFileSync("package.json", "utf8"));
  console.log(`v${data.version}`);
}
