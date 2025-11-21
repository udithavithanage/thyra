# thyra

A tiny CLI to bookmark project folders under short names and open them instantly in your favorite editor.

[![npm version](https://img.shields.io/npm/v/thyra.svg)](https://www.npmjs.com/package/thyra)
[![npm downloads](https://img.shields.io/npm/dm/thyra.svg)](https://www.npmjs.com/package/thyra)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-339933)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

**thyra** is designed for developers who hop between multiple projects and want a faster, keyboard-only way to jump straight into a folder—no file explorer, no hassle.

---

## Features

- Save any directory under a short, memorable name
- Open saved directories instantly from the terminal
- Check the CLI version easily (`thyra version`)
- Works with any editor (VS Code, WebStorm, Vim, Sublime Text, Emacs, etc.)
- Stores configuration in your user directory
- Cross-platform: macOS, Linux, Windows
- Simple, fast, no fluff

---

## Installation

```bash
npm install -g thyra
```

> Requires **Node.js v14+**.

After install, the `thyra` command will be available system-wide.

---

## Quick Start

```bash
# Save projects
thyra config blog ~/projects/personal-blog
thyra config api /var/www/company/api

# Open instantly
thyra open blog

# See everything you saved
thyra list

# Check thyra version
thyra version
```

---

## Usage

### Save a project folder

```bash
thyra config <name> <path>
```

**Examples**

```bash
thyra config blog ~/projects/personal-blog
thyra config api /var/www/company/api
```

### Open a saved project

```bash
thyra open <name>
```

**Example**

```bash
thyra open blog
```

This opens the saved path in your configured editor.

### List all saved projects

```bash
thyra list
```

**Sample output**

```
blog     → /Users/you/projects/personal-blog
api      → /var/www/company/api
```

### Show CLI version

```bash
thyra --version
```

**Output**

```
v1.0.5
```

This shows the currently installed version of **thyra**.

### Help

```bash
thyra --help
```

---

## Editor Configuration

By default, **thyra** uses **VS Code** (`code`) if it’s available.

To use a different editor, set the `THYRA_EDITOR` environment variable:

```bash
# one-off for current shell
THYRA_EDITOR=webstorm thyra open blog

# or set it permanently (bash/zsh)
export THYRA_EDITOR=webstorm
```

### Common editor commands

| Editor             | Command       |
| ------------------ | ------------- |
| Visual Studio Code | `code`        |
| WebStorm           | `webstorm`    |
| PhpStorm           | `pstorm`      |
| Vim / Neovim       | `vim`, `nvim` |
| Sublime Text       | `subl`        |
| Emacs              | `emacs`       |

Tip (Windows, PowerShell):

```powershell
setx THYRA_EDITOR "webstorm"
```

---

## How It Works

`thyra` stores your mappings in a JSON file:

| Platform      | Path                         |
| ------------- | ---------------------------- |
| macOS / Linux | `~/.config/thyra/thyra.json` |
| Windows       | `%APPDATA%\thyra\thyra.json` |

Each entry maps a **name** → **absolute path**.

When you run `thyra open <name>`:

1. thyra reads the target path from the config
2. thyra launches your editor with that directory

---

## Example Workflow

```bash
# Save projects
thyra config frontend ~/code/myapp/frontend
thyra config backend  ~/code/myapp/backend
thyra config docs     ~/code/myapp/docs

# Hop around instantly
thyra open frontend
thyra open backend
thyra open docs

# View all
thyra list

# Check thyra version
thyra version
```

---

## Troubleshooting

- **Command not found**
  Ensure global npm binaries are on your PATH. On macOS/Linux, this is often `$HOME/.npm-global/bin` or the Node version manager’s bin directory.

- **Editor doesn’t open**
  Confirm the editor command works by itself (e.g., run `webstorm .` or `code .` in any folder). If it does, set `THYRA_EDITOR` to that command.

- **Paths with spaces**
  Wrap the path in quotes when configuring:
  `thyra config design "/Users/you/Work/Client A/Design"`

---

## Uninstall

```bash
npm uninstall -g thyra
```

Your config file is left in place so you can reinstall later. Remove it manually if you want a clean slate.

---

## Keywords

```
cli, command-line, open-folder, project-manager, developer-tools, shortcuts, vscode, jetbrains, vim, productivity, workspace, folder-alias
```

---

## Author

- **Email**: [udithavithanage358@gmail.com](mailto:udithavithanage358@gmail.com)
- **GitHub**: [github.com/udithavithanage](https://github.com/udithavithanage)

---

## License

[MIT License](LICENSE) – You are free to use, modify, and distribute this tool.
