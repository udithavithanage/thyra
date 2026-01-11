import fs from "node:fs";
import os from "node:os";
import path from "node:path";

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
  private data: Record<string, string>;

  public versionDataFilePath: string;

  constructor([filePath, versionDateFilePath]: string[]) {
    this.filePath = filePath;
    this.versionDataFilePath = versionDateFilePath;
    this.data = this.load();
  }

  private load(): Record<string, string> {
    if (!fs.existsSync(this.filePath)) {
      return {};
    }

    try {
      const raw = fs.readFileSync(this.filePath, "utf8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
      console.warn("Config file is not an object. Resetting.");
      return {};
    } catch (err) {
      const error = err as Error;
      console.warn("Failed to read config file. Resetting.", error.message);
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

  set(key: string, value: string): void {
    this.data[key] = value;
    this.save();
  }

  get(key: string): string | undefined {
    return this.data[key];
  }

  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.data, key);
  }

  delete(key: string): void {
    if (this.has(key)) {
      delete this.data[key];
      this.save();
    }
  }

  all(): Record<string, string> {
    return { ...this.data };
  }
}
