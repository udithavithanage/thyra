# Configuration

Learn how to configure Thyra to match your workflow.

---

## Configuration File

Thyra stores all your project bookmarks in a JSON configuration file:

### File Location

| Platform    | Path                         |
| ----------- | ---------------------------- |
| **macOS**   | `~/.config/thyra/thyra.json` |
| **Linux**   | `~/.config/thyra/thyra.json` |
| **Windows** | `%APPDATA%\thyra\thyra.json` |

### File Structure

The configuration file is a simple JSON object mapping project names to absolute paths:

```json
{
  "blog": "/Users/you/projects/personal-blog",
  "api": "/var/www/company/api",
  "frontend": "/Users/you/code/myapp/frontend",
  "backend": "/Users/you/code/myapp/backend"
}
```

---

## Editor Configuration

### Default Editor

Thyra uses **Visual Studio Code** (`code`) as the default editor if available.

### Custom Editor

Set the `THYRA_EDITOR` environment variable to use a different editor.

#### macOS / Linux

**Temporary (current session):**

```bash
THYRA_EDITOR=webstorm thyra open blog
```

**Permanent (add to `~/.bashrc`, `~/.zshrc`, or `~/.bash_profile`):**

```bash
export THYRA_EDITOR=webstorm
```

Apply changes:

```bash
source ~/.bashrc  # or ~/.zshrc
```

#### Windows

**PowerShell (temporary):**

```powershell
$env:THYRA_EDITOR = "webstorm"
thyra open blog
```

**PowerShell (permanent):**

```powershell
setx THYRA_EDITOR "webstorm"
```

**Command Prompt (temporary):**

```cmd
set THYRA_EDITOR=webstorm
thyra open blog
```

**Command Prompt (permanent):**

```cmd
setx THYRA_EDITOR "webstorm"
```

> **Note:** After using `setx`, restart your terminal for changes to take effect.

---

## Supported Editors

Thyra works with any editor that can be launched from the command line:

| Editor              | Command     | Notes                                        |
| ------------------- | ----------- | -------------------------------------------- |
| Visual Studio Code  | `code`      | Default editor                               |
| VSCodium            | `codium`    | Open-source VS Code alternative              |
| WebStorm            | `webstorm`  | JetBrains IDE                                |
| PhpStorm            | `pstorm`    | JetBrains IDE                                |
| IntelliJ IDEA       | `idea`      | JetBrains IDE                                |
| PyCharm             | `pycharm`   | JetBrains IDE                                |
| Sublime Text        | `subl`      | Popular text editor                          |
| Atom                | `atom`      | GitHub's editor (deprecated but still works) |
| Vim                 | `vim`       | Terminal-based editor                        |
| Neovim              | `nvim`      | Modern Vim fork                              |
| Emacs               | `emacs`     | Extensible editor                            |
| Notepad++ (Windows) | `notepad++` | Windows text editor                          |
| TextMate (macOS)    | `mate`      | macOS text editor                            |

### Setting Up Editor Commands

If your editor command isn't available globally, you may need to:

1. **Add it to your PATH** - Most modern editors provide this option during installation
2. **Create an alias** - Add to your shell profile:
   ```bash
   alias myeditor='/path/to/editor/executable'
   ```
3. **Use the full path** - Set THYRA_EDITOR to the complete path:
   ```bash
   export THYRA_EDITOR="/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl"
   ```

---

## Advanced Configuration

### Multiple Editor Profiles

You can create shell aliases for different editors:

```bash
# In ~/.bashrc or ~/.zshrc
alias thyra-code='THYRA_EDITOR=code thyra'
alias thyra-vim='THYRA_EDITOR=nvim thyra'
alias thyra-idea='THYRA_EDITOR=idea thyra'
```

Usage:

```bash
thyra-code open blog      # Opens in VS Code
thyra-vim open config     # Opens in Neovim
thyra-idea open backend   # Opens in IntelliJ IDEA
```

### Custom Editor Arguments

Some editors support additional arguments. You can include them in `THYRA_EDITOR`:

```bash
# Open in a new window
export THYRA_EDITOR="code --new-window"

# Open with specific settings
export THYRA_EDITOR="subl --new-window --project"
```

---

## Configuration Tips

### 1. Backup Your Configuration

Since your bookmarks are stored in a single file, backing it up is easy:

**macOS/Linux:**

```bash
cp ~/.config/thyra/thyra.json ~/Dropbox/thyra-backup.json
```

**Windows:**

```powershell
Copy-Item "$env:APPDATA\thyra\thyra.json" "$env:USERPROFILE\Dropbox\thyra-backup.json"
```

### 2. Share Configuration Across Machines

Copy your configuration file to sync folders (Dropbox, OneDrive, etc.) and create a symlink:

**macOS/Linux:**

```bash
ln -s ~/Dropbox/thyra.json ~/.config/thyra/thyra.json
```

### 3. Manual Editing

You can manually edit the configuration file if needed:

```bash
# macOS/Linux
vim ~/.config/thyra/thyra.json

# Windows
notepad %APPDATA%\thyra\thyra.json
```

**Format:**

```json
{
  "project-name": "/absolute/path/to/project",
  "another-project": "/another/absolute/path"
}
```

> **Warning:** Always use absolute paths in the configuration file.

---

## Environment Variables Reference

| Variable       | Description                                 | Default          |
| -------------- | ------------------------------------------- | ---------------- |
| `THYRA_EDITOR` | Editor command to use when opening projects | `code` (VS Code) |

---

## Reset Configuration

To start fresh, delete the configuration file:

**macOS/Linux:**

```bash
rm -rf ~/.config/thyra
```

**Windows (PowerShell):**

```powershell
Remove-Item -Recurse -Force "$env:APPDATA\thyra"
```

**Windows (Command Prompt):**

```cmd
rmdir /s /q "%APPDATA%\thyra"
```

After deletion, Thyra will create a new configuration file when you save your next project.

---

## Next Steps

- Learn all available commands in the [CLI Reference](./cli.md)
- Check out [Examples](./examples.md) for real-world usage patterns
