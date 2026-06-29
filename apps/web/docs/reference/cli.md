# CLI Reference

Complete command reference for Thyra CLI.

---

## `thyra config`

Save a project folder under a short name.

### Syntax

```bash
thyra config <name> <path>
```

### Parameters

- `<name>` - A short, memorable name for your project (e.g., `blog`, `api`, `frontend`)
- `<path>` - The absolute or relative path to your project directory

### Examples

```bash
# Save a project with an absolute path
thyra config blog ~/projects/personal-blog

# Save with a relative path
thyra config api ./backend

# Windows path
thyra config design "C:\Users\You\Work\Client A\Design"

# Path with spaces (use quotes)
thyra config myapp "/Users/you/My Projects/app"
```

### Tips

- Use simple, memorable names
- Paths with spaces must be wrapped in quotes
- Both absolute and relative paths are supported

---

## `thyra open`

Open a saved project in your configured editor.

### Syntax

```bash
thyra open <name>
```

### Parameters

- `<name>` - The name of the saved project you want to open

### Examples

```bash
# Open a saved project
thyra open blog

# Open your API project
thyra open api
```

### How It Works

1. Thyra reads the saved path for the given name
2. Thyra launches your configured editor with that directory
3. Default editor is VS Code (`code`), but you can configure any editor

---

## `thyra list`

Display all saved projects and their paths.

### Syntax

```bash
thyra list
```

### Example Output

```
blog     → /Users/you/projects/personal-blog
api      → /var/www/company/api
frontend → ~/code/myapp/frontend
backend  → ~/code/myapp/backend
docs     → ~/code/myapp/docs
```

### Use Cases

- View all your bookmarked projects
- Check if a project name is already used
- Verify saved paths are correct

---

## `thyra version`

Display the currently installed version of Thyra.

### Syntax

```bash
thyra version
```

or

```bash
thyra --version
```

### Example Output

```
v1.1.1
```

---

## `thyra --help`

Display help information about available commands.

### Syntax

```bash
thyra --help
```

### Output

Shows a summary of all available commands and their usage.

---

## Editor Configuration

Thyra uses **VS Code** (`code`) by default if it's available on your system.

### Using a Different Editor

Set the `THYRA_EDITOR` environment variable to use a different editor:

#### macOS / Linux (bash/zsh)

```bash
# Temporary (current shell session only)
THYRA_EDITOR=webstorm thyra open blog

# Permanent (add to ~/.bashrc or ~/.zshrc)
export THYRA_EDITOR=webstorm
```

#### Windows (PowerShell)

```powershell
# Temporary (current session)
$env:THYRA_EDITOR = "webstorm"
thyra open blog

# Permanent (all sessions)
setx THYRA_EDITOR "webstorm"
```

#### Windows (Command Prompt)

```cmd
# Temporary
set THYRA_EDITOR=webstorm
thyra open blog

# Permanent
setx THYRA_EDITOR "webstorm"
```

### Common Editor Commands

| Editor             | Command         |
| ------------------ | --------------- |
| Visual Studio Code | `code`          |
| WebStorm           | `webstorm`      |
| PhpStorm           | `pstorm`        |
| Vim / Neovim       | `vim` or `nvim` |
| Sublime Text       | `subl`          |
| Emacs              | `emacs`         |

---

## Configuration Storage

Thyra stores your project mappings in a JSON file:

| Platform      | Location                     |
| ------------- | ---------------------------- |
| macOS / Linux | `~/.config/thyra/thyra.json` |
| Windows       | `%APPDATA%\thyra\thyra.json` |

Each entry maps a **name** → **absolute path**.

---

## Example Workflow

```bash
# Save multiple projects
thyra config frontend ~/code/myapp/frontend
thyra config backend  ~/code/myapp/backend
thyra config docs     ~/code/myapp/docs

# Switch between them instantly
thyra open frontend
thyra open backend
thyra open docs

# View all saved projects
thyra list

# Check version
thyra version
```

---

## Troubleshooting

### Command not found

**Problem:** `thyra: command not found` or `'thyra' is not recognized`

**Solution:** Ensure global npm binaries are on your PATH:

- **macOS/Linux:** Add `$HOME/.npm-global/bin` or your Node version manager's bin directory to PATH
- **Windows:** npm's global directory should be added automatically, but you may need to restart your terminal
- Try running: `npm list -g thyra` to verify installation

### Editor doesn't open

**Problem:** Nothing happens when running `thyra open <name>`

**Solution:**

1. Verify your editor command works by itself (e.g., run `code .` or `webstorm .` in any folder)
2. If it works, set the `THYRA_EDITOR` environment variable to that command
3. Make sure the editor is installed and available in your PATH

### Paths with spaces

**Problem:** Paths with spaces aren't working correctly

**Solution:** Always wrap paths containing spaces in quotes:

```bash
thyra config design "/Users/you/Work/Client A/Design"
```

---

## Uninstall

To remove Thyra from your system:

```bash
npm uninstall -g thyra
```

**Note:** Your configuration file will remain in place, so you can reinstall later without losing your saved projects. To completely remove everything, manually delete the config file:

- **macOS/Linux:** `rm -rf ~/.config/thyra`
- **Windows:** Delete `%APPDATA%\thyra`
