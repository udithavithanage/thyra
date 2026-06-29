# Troubleshooting

Solutions to common problems and error messages when using Thyra.

---

## Installation Issues

### "command not found: npm"

**Problem:** npm is not installed or not in PATH.

**Solution:**

```bash
# Check if Node.js is installed
node --version

# If not installed, download from:
# https://nodejs.org/

# After installing Node.js, verify npm:
npm --version
```

---

### "permission denied" during installation

**Problem:** Insufficient permissions to install globally.

**Solution:**

```bash
# Option 1: Use sudo (macOS/Linux)
sudo npm install -g thyra

# Option 2: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g thyra

# Option 3: Use a Node version manager (recommended)
# Install nvm first, then:
nvm install node
npm install -g thyra
```

---

### Thyra not found after installation

**Problem:** Thyra installed but command not recognized.

**Solution:**

```bash
# Find where npm installs global packages
npm list -g --depth=0

# Add npm bin to PATH
export PATH="$(npm config get prefix)/bin:$PATH"

# Make permanent (add to ~/.bashrc or ~/.zshrc)
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Verify
thyra version
```

---

## Command Errors

### "Project not found"

**Problem:** Trying to open a project that doesn't exist in Thyra.

**Solution:**

```bash
# List all saved projects
thyra list

# If project is missing, add it
thyra config project-name /path/to/project

# Check for typos in project name
thyra list | grep "partial-name"
```

---

### "Path does not exist"

**Problem:** Saved path no longer exists on disk.

**Solution:**

```bash
# Verify the path
thyra list | grep "project-name"

# If project was moved, update it
thyra delete old-project
thyra config project-name /new/path/to/project

# If project was deleted, remove from Thyra
thyra delete project-name
```

---

### "Editor not found"

**Problem:** Default editor command not found.

**Solution:**

```bash
# Check if editor is in PATH
which code  # for VS Code
which vim   # for Vim
which subl  # for Sublime Text

# If not found, install editor or add to PATH
# VS Code example:
export PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin:$PATH"

# Set environment variable
export EDITOR="code"

# Make permanent
echo 'export EDITOR="code"' >> ~/.bashrc
source ~/.bashrc
```

---

## Configuration Issues

### Can't find Thyra config file

**Problem:** Need to manually edit or check Thyra configuration.

**Solution:**

```bash
# Thyra stores config in:
# macOS/Linux: ~/.thyra/config.json
# Windows: %USERPROFILE%\.thyra\config.json

# View config
cat ~/.thyra/config.json  # macOS/Linux
type %USERPROFILE%\.thyra\config.json  # Windows

# If corrupted, recreate by saving projects again
thyra config project-name /path/to/project
```

---

### Config file is corrupted

**Problem:** Thyra config file is unreadable or malformed.

**Solution:**

```bash
# Backup existing config
cp ~/.thyra/config.json ~/.thyra/config.json.backup

# Remove corrupted config
rm ~/.thyra/config.json

# Re-add your projects
thyra config project1 /path/to/project1
thyra config project2 /path/to/project2

# Or restore from backup if you have one
cp ~/.thyra/config.json.backup ~/.thyra/config.json
```

---

## Path Issues

### Spaces in project path

**Problem:** Project path contains spaces causing issues.

**Solution:**

```bash
# Use quotes around paths with spaces
thyra config my-project "/Users/me/My Projects/my-app"

# Or use escaped spaces
thyra config my-project /Users/me/My\ Projects/my-app

# Verify it saved correctly
thyra list | grep "my-project"
```

---

### Tilde (~) not expanding

**Problem:** Using `~` for home directory doesn't work.

**Solution:**

```bash
# Use full path instead of ~
# Wrong:
thyra config project ~/projects/my-app

# Right (macOS/Linux):
thyra config project /Users/yourusername/projects/my-app

# Or use $HOME
thyra config project $HOME/projects/my-app

# Windows:
thyra config project C:\\Users\\YourName\\projects\\my-app
```

---

### Relative paths not working

**Problem:** Saved relative path, but Thyra can't find it.

**Solution:**

```bash
# Always use absolute paths
# Wrong:
thyra config project ../my-app

# Right:
thyra config project /full/path/to/my-app

# Or use pwd to get current directory
thyra config project $(pwd)
```

---

## Platform-Specific Issues

### macOS: "command not found"

**Problem:** Command works in one terminal but not another.

**Solution:**

```bash
# Check which shell you're using
echo $SHELL

# Add to appropriate config file:
# Bash: ~/.bashrc or ~/.bash_profile
# Zsh: ~/.zshrc

# For zsh (default on newer macOS)
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

---

### Linux: Permission errors

**Problem:** Permission denied when running commands.

**Solution:**

```bash
# Check file permissions
ls -la $(which thyra)

# If owned by root, fix npm permissions (see above)
# Or use sudo (not recommended)
sudo thyra config ...

# Better: Fix npm global installs
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

### Windows: Path format issues

**Problem:** Windows path formats causing problems.

**Solution:**

```bash
# PowerShell
thyra config project "C:\Users\YourName\projects\my-app"

# Git Bash (use forward slashes)
thyra config project "/c/Users/YourName/projects/my-app"

# CMD (use backslashes, escape them)
thyra config project C:\\Users\\YourName\\projects\\my-app
```

---

### Windows: Command not recognized

**Problem:** 'thyra' is not recognized as an internal or external command.

**Solution:**

```powershell
# Find npm global path
npm config get prefix

# Add to PATH in System Environment Variables:
# 1. Search "Environment Variables" in Windows
# 2. Edit "Path" under System Variables
# 3. Add: C:\Users\YourName\AppData\Roaming\npm
# 4. Restart terminal

# Or for current session:
$env:Path += ";C:\Users\YourName\AppData\Roaming\npm"
```

---

## Editor Issues

### VS Code: "code: command not found"

**Problem:** VS Code command-line tool not installed.

**Solution:**

```bash
# macOS:
# 1. Open VS Code
# 2. Press Cmd+Shift+P
# 3. Type "Shell Command: Install 'code' command in PATH"
# 4. Press Enter

# Linux (manual installation):
sudo ln -s /usr/share/code/bin/code /usr/local/bin/code

# Windows: Add to PATH
# C:\Program Files\Microsoft VS Code\bin
```

---

### Wrong editor opens

**Problem:** Project opens in unexpected editor.

**Solution:**

```bash
# Check current default editor
echo $EDITOR

# Set your preferred editor
export EDITOR="code"  # or vim, subl, etc.

# Make it permanent
echo 'export EDITOR="code"' >> ~/.bashrc
source ~/.bashrc

# Verify
echo $EDITOR
```

---

### Editor opens but workspace is empty

**Problem:** Editor launches but doesn't show project files.

**Solution:**

```bash
# Verify project path exists
thyra list | grep "project-name"

# Check if directory exists
ls -la /path/from/thyra/list

# If path changed, update it
thyra delete project-name
thyra config project-name /correct/new/path
```

---

## Performance Issues

### Thyra is slow to open projects

**Problem:** noticeable delay when opening projects.

**Solution:**

```bash
# Check if path is on a slow network drive
thyra list

# If on network drive, consider local copy
# Or use faster storage

# Check disk performance
# macOS:
diskutil list

# Linux:
df -h
```

---

### List command is slow

**Problem:** `thyra list` takes too long.

**Solution:**

```bash
# Check how many projects you have
thyra list | wc -l

# If many projects (100+), consider organizing:
# - Remove old/unused projects
# - Use grep to filter
thyra list | grep "active"

# Clean up old projects
thyra delete old-project-1
thyra delete old-project-2
```

---

## Upgrade Issues

### New version breaks existing setup

**Problem:** After upgrading Thyra, saved projects don't work.

**Solution:**

```bash
# Check Thyra version
thyra version

# Check config file
cat ~/.thyra/config.json

# If config is incompatible, backup and recreate
cp ~/.thyra/config.json ~/.thyra/config.backup.json
rm ~/.thyra/config.json

# Re-add projects from backup
# Or reinstall specific version:
npm install -g thyra@1.x.x
```

---

### Can't upgrade Thyra

**Problem:** `npm update -g thyra` doesn't work.

**Solution:**

```bash
# Uninstall completely
npm uninstall -g thyra

# Clear npm cache
npm cache clean --force

# Reinstall latest version
npm install -g thyra

# Verify
thyra version
```

---

## Still Having Issues?

### Check These First

1. **Verify installation:**

   ```bash
   thyra version
   node --version
   npm --version
   ```

2. **Check config file:**

   ```bash
   cat ~/.thyra/config.json
   ```

3. **Test with simple project:**
   ```bash
   thyra config test /tmp/test
   thyra open test
   ```

### Get Help

- **GitHub Issues:** [github.com/udithavithanage/thyra/issues](https://github.com/udithavithanage/thyra/issues)
- **Check FAQ:** [FAQ](/reference/faq)
- **Documentation:** [Getting Started](/getting-started/README)

### Reporting Bugs

When reporting issues, include:

```bash
# System info
uname -a  # macOS/Linux
systeminfo  # Windows

# Thyra version
thyra version

# Node/npm versions
node --version
npm --version

# Config file (remove sensitive paths)
cat ~/.thyra/config.json

# Error message (full output)
thyra open project-name 2>&1
```

---

**Still stuck? We're here to help!**

[Check the FAQ →](/reference/faq) | [Open an Issue](https://github.com/udithavithanage/thyra/issues)
