import fs from "fs";

const latestReleasePath = "./apps/web/docs/thyra/latest-release.md";
const content = fs.readFileSync(latestReleasePath, "utf-8");

if (content.trim().length === 0) {
  console.error(
    "Commit blocked: apps/web/docs/thyra/latest-release.md is empty. Add release notes before committing.",
  );
  process.exit(1);
}
