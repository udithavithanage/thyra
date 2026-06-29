# FAQ

Frequently Asked Questions about Thyra.

---

## General Questions

### What is Thyra?

Thyra is a command-line tool that lets you bookmark project folders with short names and open them instantly in your favorite code editor.

### Why should I use Thyra?

If you work on multiple projects and find yourself:

- Typing long paths repeatedly
- Searching through folders to find projects
- Wasting time on directory navigation

Then Thyra will save you time and keep you focused on coding.

### Is Thyra free?

Yes! Thyra is completely free and open source under the MIT License.

---

## Installation & Setup

### What are the system requirements?

- Node.js version 14 or higher
- npm (comes with Node.js)
- Any operating system: macOS, Linux, or Windows

### How do I install Thyra?

```bash
npm install -g thyra
```

### How do I check if Thyra is installed correctly?

```bash
thyra --version
```

You should see the version number (e.g., `v1.1.1`).

### Can I install Thyra without admin/sudo privileges?

Yes! Use npm's user-level global installation:

```bash
npm config set prefix ~/.npm-global
npm install -g thyra
```

Then add `~/.npm-global/bin` to your PATH.

---

## Usage Questions

### How many projects can I save?

There's no limit! You can save as many projects as you want.

### Can I use spaces in project names?

While technically possible, it's not recommended. Use hyphens or underscores instead:

```bash
# Good
thyra config my-blog ~/projects/blog
thyra config personal_site ~/projects/site

# Avoid
thyra config "my blog" ~/projects/blog
```

### Can paths contain spaces?

Yes! Just wrap them in quotes:

```bash
thyra config myapp "/Users/you/My Projects/My App"
```

### Do I need to use absolute paths?

No, both absolute and relative paths work:

```bash
# Absolute
thyra config blog ~/projects/blog

# Relative
cd ~/projects
thyra config blog ./blog
```

However, Thyra stores them as absolute paths internally.

### Can I rename a saved project?

Not directly. You'll need to delete the old entry and create a new one:

```bash
# Method 1: Overwrite by re-saving
thyra config new-name ~/same/path

# Method 2: Edit the config file manually
# macOS/Linux: ~/.config/thyra/thyra.json
# Windows: %APPDATA%\thyra\thyra.json
```

### How do I delete a saved project?

Currently, you need to manually edit the configuration file:

**macOS/Linux:**

```bash
vim ~/.config/thyra/thyra.json
```

**Windows:**

```powershell
notepad "$env:APPDATA\thyra\thyra.json"
```

Remove the line with your project name and save the file.

---

## Editor Configuration

### Which editor does Thyra use by default?

Visual Studio Code (`code`) if it's available on your system.

### How do I change the default editor?

Set the `THYRA_EDITOR` environment variable:

**macOS/Linux:**

```bash
export THYRA_EDITOR=webstorm
```

**Windows (PowerShell):**

```powershell
setx THYRA_EDITOR "webstorm"
```

### Can I use different editors for different projects?

Yes! Use the environment variable temporarily:

```bash
THYRA_EDITOR=vim thyra open config
THYRA_EDITOR=code thyra open frontend
```

Or create shell aliases:

```bash
alias thyra-vim='THYRA_EDITOR=vim thyra'
alias thyra-code='THYRA_EDITOR=code thyra'
```

### My editor doesn't open. What should I do?

1. Make sure the editor command works by itself:

   ```bash
   code .
   webstorm .
   vim .
   ```

2. If it doesn't work, the command might not be in your PATH
3. Find the full path to your editor and use that:
   ```bash
   export THYRA_EDITOR="/full/path/to/editor"
   ```

### Can I pass arguments to my editor?

Yes! Include them in the `THYRA_EDITOR` variable:

```bash
export THYRA_EDITOR="code --new-window"
export THYRA_EDITOR="vim -p"
```

---

## Configuration & Storage

### Where does Thyra store my projects?

In a JSON file located at:

- **macOS/Linux:** `~/.config/thyra/thyra.json`
- **Windows:** `%APPDATA%\thyra\thyra.json`

### Can I backup my Thyra configuration?

Yes! Just copy the JSON file:

**macOS/Linux:**

```bash
cp ~/.config/thyra/thyra.json ~/Dropbox/thyra-backup.json
```

**Windows:**

```powershell
Copy-Item "$env:APPDATA\thyra\thyra.json" "$env:USERPROFILE\Dropbox\thyra-backup.json"
```

### Can I share my configuration across multiple computers?

Yes! You can:

1. Copy the configuration file to each machine
2. Use cloud storage and symlinks to keep it synced
3. Store it in a dotfiles repository

### Can I edit the configuration file manually?

Yes! It's just JSON. Edit it with any text editor:

```json
{
  "blog": "/Users/you/projects/blog",
  "api": "/var/www/api"
}
```

Just make sure to use valid JSON format and absolute paths.

---

## Troubleshooting

### "Command not found" error

**Problem:** Terminal says `thyra: command not found` or `'thyra' is not recognized`

**Solutions:**

1. Make sure Thyra is installed globally: `npm list -g thyra`
2. Check if npm's global bin directory is in your PATH
3. Try reinstalling: `npm uninstall -g thyra && npm install -g thyra`
4. Restart your terminal

### Nothing happens when I run `thyra open`

**Possible causes:**

1. **Editor not installed or not in PATH**

   - Test: `code .` (or your editor command)
   - Solution: Install the editor or add it to PATH

2. **Wrong editor command**

   - Check: `echo $THYRA_EDITOR`
   - Solution: Set the correct command

3. **Project doesn't exist**
   - Check: `thyra list`
   - Solution: Make sure the project name is saved

### Thyra opens the wrong editor

You likely have `THYRA_EDITOR` set. Check:

```bash
echo $THYRA_EDITOR  # macOS/Linux
echo $env:THYRA_EDITOR  # Windows PowerShell
```

To reset to default (VS Code), unset the variable:

```bash
unset THYRA_EDITOR  # macOS/Linux
Remove-Item Env:\THYRA_EDITOR  # Windows PowerShell
```

### Paths with spaces don't work

Always wrap paths with spaces in quotes:

```bash
thyra config myapp "/path/with spaces/to/project"
```

### Changes to THYRA_EDITOR don't persist

If you used `export` (Linux/Mac) or `$env:` (Windows), it's only for the current session.

For persistence:

**macOS/Linux:** Add to `~/.bashrc` or `~/.zshrc`:

```bash
export THYRA_EDITOR=webstorm
```

**Windows:** Use `setx` instead of `$env:`:

```powershell
setx THYRA_EDITOR "webstorm"
```

---

## Advanced Usage

### Can I integrate Thyra with other tools?

Yes! Thyra works well with:

- **fzf** for fuzzy finding projects
- **tmux** for terminal session management
- **Shell aliases** for custom workflows

See the [Examples page](./examples.md#advanced-use-cases) for details.

### Can I use Thyra in scripts?

Absolutely! Thyra commands work in any script:

```bash
#!/bin/bash
thyra config newproject ~/projects/new
thyra open newproject
```

### Does Thyra work with remote/network paths?

Yes, as long as your editor can open them:

```bash
# Network share (Windows)
thyra config shared "\\\\server\\share\\project"

# Mounted network drive (macOS/Linux)
thyra config remote /mnt/remote/project
```

### Can I use Thyra for non-code projects?

Yes! Thyra works with any folder:

```bash
thyra config photos ~/Pictures/Vacation2024
thyra config docs ~/Documents/Reports
thyra config music ~/Music/Productions
```

---

## Updates & Maintenance

### How do I update Thyra?

```bash
npm update -g thyra
```

### How do I check which version I have?

```bash
thyra --version
```

or

```bash
thyra version
```

### How do I uninstall Thyra?

```bash
npm uninstall -g thyra
```

Your configuration file will remain at `~/.config/thyra/thyra.json` (or `%APPDATA%\thyra\thyra.json` on Windows) in case you want to reinstall later.

### Will my saved projects be deleted if I uninstall?

No! Your configuration is stored separately and won't be deleted.

To completely remove everything:

**macOS/Linux:**

```bash
npm uninstall -g thyra
rm -rf ~/.config/thyra
```

**Windows:**

```powershell
npm uninstall -g thyra
Remove-Item -Recurse -Force "$env:APPDATA\thyra"
```

---

## Platform-Specific

### Does Thyra work on Windows?

Yes! Thyra is fully cross-platform and works on Windows, macOS, and Linux.

### Does Thyra work with WSL (Windows Subsystem for Linux)?

Yes! Install it in your WSL environment just like on Linux:

```bash
npm install -g thyra
```

### Can I use Thyra with Git Bash on Windows?

Yes! Thyra works in Git Bash, PowerShell, Command Prompt, and any other shell.

---

## Still Have Questions?

- Check the [CLI Reference](./cli.md) for detailed command documentation
- Browse [Examples](./examples.md) for real-world usage
- Visit the [GitHub Issues](https://github.com/udithavithanage/thyra/issues) page
- Email: [udithavithanage358@gmail.com](mailto:udithavithanage358@gmail.com)
