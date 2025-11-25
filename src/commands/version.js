import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

function saveVersionCheckData(store, data) {
  try {
    fs.writeFileSync(store.versionDataFilePath, JSON.stringify(data), "utf8");
  } catch (err) {
    console.error("Failed to save version check file:", err.message);
  }
}

function loadVersionCheckData(store) {
  if (!fs.existsSync(store.versionDataFilePath)) return {};

  try {
    const parsed = JSON.parse(
      fs.readFileSync(store.versionDataFilePath, "utf8")
    );
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (err) {
    console.warn("Failed to read version check file. Resetting.", err.message);
    return {};
  }
}

function fetchLatestVersion(pkgName) {
  const url = `https://registry.npmjs.org/${encodeURIComponent(
    pkgName
  )}/latest`;

  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 3500 }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return resolve(null);
      }

      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data).version ?? null);
        } catch {
          resolve(null);
        }
      });
    });

    req.on("error", () => resolve(null));
    req.on("timeout", () => {
      req.destroy();
      resolve(null);
    });
  });
}

function askYesNo(question) {
  return new Promise((resolve) => {
    if (!process.stdin.isTTY) return resolve(false);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const prompt = question.endsWith("(y/n)")
      ? `${question} `
      : `${question} (y/n) `;

    rl.question(prompt, (answer) => {
      rl.close();
      const s = answer.trim().toLowerCase();
      resolve(s === "y" || s === "yes");
    });

    rl.on("SIGINT", () => {
      rl.close();
      resolve(false);
    });
  });
}

function detectAgent() {
  const ua = process.env.npm_config_user_agent || "";
  if (/pnpm\//i.test(ua)) return "pnpm";
  if (/yarn\//i.test(ua)) return "yarn";
  if (/bun\//i.test(ua)) return "bun";
  return "npm";
}

function isGlobalInstall() {
  if (process.env.npm_config_global === "true") return true;

  const bin = process.argv[1] || "";
  return (
    /[/\\]node_modules[/\\].*[/\\].bin[/\\]/i.test(bin) ||
    /[/\\]lib[/\\]node_modules[/\\]/i.test(bin)
  );
}

function buildUpdateCommand(pkg) {
  const agent = detectAgent();
  const global = isGlobalInstall();

  switch (agent) {
    case "pnpm":
      return global
        ? ["pnpm", ["add", "-g", pkg]]
        : ["pnpm", ["add", `${pkg}@latest`]];

    case "yarn":
      return global
        ? ["npm", ["i", "-g", pkg]]
        : ["yarn", ["add", `${pkg}@latest`]];

    case "bun":
      return global
        ? ["bun", ["add", "-g", pkg]]
        : ["bun", ["add", `${pkg}@latest`]];

    default:
      return global
        ? ["npm", ["i", "-g", pkg]]
        : ["npm", ["i", `${pkg}@latest`]];
  }
}

function runUpdate(pkg) {
  return new Promise((resolve) => {
    const [cmd, args] = buildUpdateCommand(pkg);
    const child = spawn(cmd, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("close", (code) => resolve(code === 0));
    child.on("error", () => resolve(false));
  });
}

export async function ensureUpToDate(store, currentVersion) {
  const pkgName = "thyra";
  const today = new Date().toISOString().split("T")[0];

  const config = loadVersionCheckData(store);
  if (config.lastChecked === today) return;

  const latest = await fetchLatestVersion(pkgName);
  if (!latest) return;

  saveVersionCheckData(store, {
    lastChecked: today,
    lastKnownLatest: latest ?? null,
  });

  if (latest === currentVersion) return;

  const question = `A new version of ${pkgName} is available (${latest}). Would you like to update now?`;
  const yes = await askYesNo(question);

  if (yes) {
    const success = await runUpdate(pkgName);
    if (!success) {
      const [cmd, args] = buildUpdateCommand(pkgName);
      console.error(
        `\nUpdate failed. Run manually:\n  ${[cmd, ...args].join(" ")}`
      );
    }
  }
}

export async function runVersion(store) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pkgPath = path.join(__dirname, "../../package.json");

    const { version } = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    console.log(`v${version}`);

    await ensureUpToDate(store, version);
  } catch (err) {
    console.error("Error running version check:", err);
  }
}
