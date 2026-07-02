import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";

import type { ProjectEntry } from "~/types";

const CONFIG_FILE_NAME = "thyra.json";
const THYRA_VERSION_DATA_FILE_NAME = "thyra.version.json";
const APP_DIR_NAME = "thyra";

export function getConfigFilePath(): string[] {
  const homeDir = os.homedir();

  if (!homeDir) {
    console.error("Could not determine home directory.");
    process.exit(1);
  }

  let baseConfigDir: string;

  if (process.platform === "win32") {
    baseConfigDir =
      process.env.APPDATA || path.join(homeDir, "AppData", "Roaming");
  } else {
    baseConfigDir =
      process.env.XDG_CONFIG_HOME || path.join(homeDir, ".config");
  }

  const appConfigDir = path.join(baseConfigDir, APP_DIR_NAME);

  if (!fs.existsSync(appConfigDir)) {
    fs.mkdirSync(appConfigDir, { recursive: true });
  }

  return [
    path.join(appConfigDir, CONFIG_FILE_NAME),
    path.join(appConfigDir, THYRA_VERSION_DATA_FILE_NAME),
  ];
}

export class ConfigStore {
  private filePath: string;
  private data: Record<string, ProjectEntry>;

  public versionDataFilePath: string;

  constructor([filePath, versionDateFilePath]: string[]) {
    this.filePath = filePath;
    this.versionDataFilePath = versionDateFilePath;
    this.data = this.load();
  }

  private load(): Record<string, ProjectEntry> {
    if (!fs.existsSync(this.filePath)) {
      return {};
    }

    try {
      const raw = fs.readFileSync(this.filePath, "utf8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        const migrated: Record<string, ProjectEntry> = {};
        for (const [key, value] of Object.entries(parsed)) {
          if (typeof value === "string") {
            // Migrate old string-based config to new ProjectEntry
            migrated[key] = {
              id: crypto.randomUUID(),
              name: key,
              alias: key,
              path: value,
              createdAt: new Date().toISOString(),
            };
          } else {
            migrated[key] = value as ProjectEntry;
          }
        }
        return migrated;
      }
      console.warn("Config file is not an object. removeting.");
      return {};
    } catch (err) {
      const error = err as Error;
      console.warn("Failed to read config file. removeting.", error.message);
      return {};
    }
  }

  private save(): void {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.data, null, 2),
        "utf8"
      );
    } catch (err) {
      const error = err as Error;
      console.error("Failed to save config file:", error.message);
      process.exit(1);
    }
  }

  set(key: string, entry: ProjectEntry): void {
    this.data[key] = entry;
    this.save();
  }

  get(key: string): ProjectEntry | undefined {
    return this.data[key];
  }

  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.data, key);
  }

  existsByPath(targetPath: string): boolean {
    return Object.values(this.data).some((entry) => entry.path === targetPath);
  }

  delete(key: string): void {
    if (this.has(key)) {
      delete this.data[key];
      this.save();
    }
  }

  clear(): void {
    this.data = {};
    this.save();
  }

  clearCache(): void {
    this.data = {};
  }

  reload(): void {
    this.data = this.load();
  }

  all(): Record<string, ProjectEntry> {
    return { ...this.data };
  }
}
