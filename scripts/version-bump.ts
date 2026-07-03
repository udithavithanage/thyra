import fs from "fs";

const type = process.argv[2] as "patch" | "minor" | "major";

if (type !== "patch" && type !== "minor" && type !== "major") {
  console.error("Usage: bun run scripts/version-bump.ts <patch|minor|major>");
  process.exit(1);
}

const inc = (version: string, bump: typeof type) => {
  const parts = version.split(".").map((n) => Number(n));
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) {
    throw new Error(`Invalid version: ${version}`);
  }

  const [major, minor, patch] = parts;
  if (bump === "patch") return `${major}.${minor}.${patch + 1}`;
  if (bump === "minor") return `${major}.${minor + 1}.0`;
  return `${major + 1}.0.0`;
};

// root version
const rootPath = "./package.json";
const root = JSON.parse(fs.readFileSync(rootPath, "utf-8"));

const newVersion = inc(root.version, type);
root.version = newVersion;

fs.writeFileSync(rootPath, JSON.stringify(root, null, 2) + "\n");

// bump all workspace packages
const folders = ["apps", "packages"];

for (const folder of folders) {
  if (!fs.existsSync(folder)) continue;

  for (const dir of fs.readdirSync(folder)) {
    const pkgPath = `${folder}/${dir}/package.json`;

    if (!fs.existsSync(pkgPath)) continue;

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    pkg.version = newVersion;

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  }
}

console.log("✔ bumped to", newVersion);
