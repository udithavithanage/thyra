import fs from "node:fs";
import readline from "node:readline";
import { spawn } from "node:child_process";

import { ConfigStore } from "~/core";

import { version } from "package" with { type: "json" };

const PACKAGE_NAME = "thyra";
const REGISTRY_TIMEOUT_MS = 3500;
const DEFAULT_THROTTLE_MS = 24 * 60 * 60 * 1000;

interface EnsureUpToDateOptions {
  throttleMs?: number;
  envSkip?: boolean;
}

interface VersionCheckData {
  lastChecked: number;
  lastKnownLatest: string | null;
}

type PackageAgent = "npm" | "pnpm" | "yarn" | "bun";

function saveVersionCheckData(
  store: ConfigStore,
  data: VersionCheckData,
): void {
  try {
    fs.writeFileSync(store.versionDataFilePath, JSON.stringify(data), "utf8");
  } catch (err) {
    console.error("Failed to save version check file:", (err as Error).message);
  }
}

function loadVersionCheckData(store: ConfigStore): Partial<VersionCheckData> {
  if (!fs.existsSync(store.versionDataFilePath)) return {};

  try {
    const parsed = JSON.parse(
      fs.readFileSync(store.versionDataFilePath, "utf8"),
    );
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (err) {
    console.error("Failed to load version check file:", (err as Error).message);
    return {};
  }
}

async function fetchLatestVersion(pkgName: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REGISTRY_TIMEOUT_MS);

  try {
    const res = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(pkgName)}/latest`,
      { signal: controller.signal },
    );

    if (!res.ok) return null;

    const data = (await res.json()) as { version?: unknown };
    return typeof data.version === "string" ? data.version : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function askYesNo(question: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!process.stdin.isTTY) {
      resolve(false);
      return;
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const prompt = question.endsWith("(y/n)")
      ? `${question} `
      : `${question} (y/n) `;

    rl.question(prompt, (answer) => {
      rl.close();
      const normalized = answer.trim().toLowerCase();
      resolve(normalized === "y" || normalized === "yes");
    });

    rl.on("SIGINT", () => {
      rl.close();
      resolve(false);
    });
  });
}

function detectAgent(): PackageAgent {
  const ua = process.env.npm_config_user_agent;

  if (ua) {
    if (ua.startsWith("pnpm/")) return "pnpm";
    if (ua.startsWith("yarn/")) return "yarn";
    if (ua.startsWith("bun/")) return "bun";
    if (ua.startsWith("npm/")) return "npm";
  }

  // Fallback
  try {
    const cliPath = process.argv[1] ?? "";
    const realPath = fs.realpathSync(cliPath).replace(/\\/g, "/");

    if (realPath.includes("pnpm")) return "pnpm";
    if (realPath.includes("yarn")) return "yarn";
    if (realPath.includes("thyra")) return "bun";
  } catch {
    // Ignore errors and fall back to npm
  }

  return "npm";
}

function isGlobalInstall(): boolean {
  if (process.env.npm_config_global === "true") {
    return true;
  }

  const cliPath = process.argv[1] ?? "";
  try {
    const realPath = fs.realpathSync(cliPath).replace(/\\/g, "/");
    return (
      /[/\\]node_modules[/\\].*[/\\]\.bin[/\\]/i.test(realPath) ||
      /[/\\](lib|global)[/\\]node_modules[/\\]/i.test(realPath)
    );
  } catch {
    return false;
  }
}

function buildUpdateCommand(pkg: string, latest: string): [string, string[]] {
  const agent = detectAgent();
  const global = isGlobalInstall();

  switch (agent) {
    case "pnpm":
      return global
        ? ["pnpm", ["add", "-g", pkg]]
        : ["pnpm", ["add", `${pkg}@${latest}`]];

    case "yarn":
      return global
        ? ["npm", ["i", "-g", pkg]]
        : ["yarn", ["add", `${pkg}@${latest}`]];

    case "bun":
      return global
        ? ["bun", ["add", "-g", pkg]]
        : ["bun", ["add", `${pkg}@${latest}`]];

    default:
      return global
        ? ["npm", ["i", "-g", pkg]]
        : ["npm", ["i", `${pkg}@${latest}`]];
  }
}

function runUpdate(pkg: string, latest: string): Promise<boolean> {
  return new Promise((resolve) => {
    const [cmd, args] = buildUpdateCommand(pkg, latest);
    console.log(`Running update command: ${[cmd, ...args].join(" ")}`);
    const child = spawn(cmd, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("close", (code) => resolve(code === 0));
    child.on("error", () => resolve(false));
  });
}

function shouldSkipCheck(options: EnsureUpToDateOptions): boolean {
  if (!process.stdin.isTTY) return true;
  if (process.env.NO_UPDATE_NOTIFIER === "1") return true;

  if (options.envSkip && process.env.CI === "true") return true;

  return false;
}

async function ensureUpToDate(
  store: ConfigStore,
  currentVersion: string,
  options: EnsureUpToDateOptions = {},
): Promise<void> {
  if (shouldSkipCheck(options)) return;

  const throttleMs = options.throttleMs ?? DEFAULT_THROTTLE_MS;
  const now = Date.now();
  const cached = loadVersionCheckData(store);

  if (cached.lastChecked && now - cached.lastChecked < throttleMs) return;

  const latest = await fetchLatestVersion(PACKAGE_NAME);
  if (!latest) return;

  saveVersionCheckData(store, {
    lastChecked: now,
    lastKnownLatest: latest,
  });

  if (latest === currentVersion) return;

  const shouldUpdate = await askYesNo(
    `A new version of ${PACKAGE_NAME} is available (${latest}). Would you like to update now?`,
  );

  if (!shouldUpdate) return;

  const success = await runUpdate(PACKAGE_NAME, latest);
  if (!success) {
    const [cmd, args] = buildUpdateCommand(PACKAGE_NAME, latest);
    console.error(
      `\nUpdate failed. Run manually:\n  ${[cmd, ...args].join(" ")}`,
    );
  }
}

export async function runVersion(store: ConfigStore): Promise<void> {
  try {
    console.log(`v${version}`);
    await ensureUpToDate(store, version);
  } catch (err) {
    console.error("Error running version check:", err);
  }
}
