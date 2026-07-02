import fs from "fs";

const type = process.argv[2];

const inc = (version: string, type: string) => {
  const [major, minor, patch] = version.split(".").map(Number);

  if (type === "patch") return `${major}.${minor}.${patch + 1}`;
  if (type === "minor") return `${major}.${minor + 1}.0`;
  if (type === "major") return `${major + 1}.0.0`;

  return version;
};

// root version
const rootPath = "./package.json";
const root = JSON.parse(fs.readFileSync(rootPath, "utf-8"));

const newVersion = inc(root.version, type);
root.version = newVersion;

fs.writeFileSync(rootPath, JSON.stringify(root, null, 2));

// bump all workspace packages
const folders = ["apps", "packages"];

for (const folder of folders) {
  if (!fs.existsSync(folder)) continue;

  for (const dir of fs.readdirSync(folder)) {
    const pkgPath = `${folder}/${dir}/package.json`;

    if (!fs.existsSync(pkgPath)) continue;

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    pkg.version = newVersion;

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }
}

console.log("✔ bumped to", newVersion);
