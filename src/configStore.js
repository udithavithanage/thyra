import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CONFIG_FILE_NAME = "thyra.json";
const THYRA_VERSION_DATA_FILE_NAME = "thyra.version.json";
const APP_DIR_NAME = "thyra";

export function getConfigFilePath() {
  const homeDir = os.homedir();

  if (!homeDir) {
    console.error("Could not determine home directory.");
    process.exit(1);
  }

  let baseConfigDir;

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
  constructor([filePath, versionDataFilePath]) {
    this.filePath = filePath;
    this.versionDataFilePath = versionDataFilePath;
    this.data = this.load();
  }

  load() {
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
      console.warn("Failed to read config file. Resetting.", err.message);
      return {};
    }
  }

  save() {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.data, null, 2),
        "utf8"
      );
    } catch (err) {
      console.error("Failed to save config file:", err.message);
      process.exit(1);
    }
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }

  get(key) {
    return this.data[key];
  }

  has(key) {
    return Object.prototype.hasOwnProperty.call(this.data, key);
  }

  all() {
    return { ...this.data };
  }
}
