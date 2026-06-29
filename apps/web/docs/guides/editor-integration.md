# Editor Integration

Connect Thyra with your favorite code editors and IDEs for seamless project access. This guide covers popular editors and customization options.

---

## Supported Editors

Thyra works with any editor that can be launched from the command line:

- ✅ Visual Studio Code
- ✅ JetBrains IDEs (WebStorm, PhpStorm, IntelliJ IDEA, PyCharm)
- ✅ Vim / Neovim
- ✅ Sublime Text
- ✅ Emacs
- ✅ Atom
- ✅ Notepad++
- ✅ And many more!

---

## Visual Studio Code

### Basic Setup

VS Code is often the default editor. Thyra will use it automatically if `code` is in your PATH.

```bash
# Open project in VS Code
thyra open my-project

# If VS Code is your system default, this opens in VS Code
```

### Verify VS Code Command

```bash
# Test if 'code' command works
code --version

# If not found, install VS Code command:
# 1. Open VS Code
# 2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows/Linux)
# 3. Type "Shell Command: Install 'code' command in PATH"
# 4. Press Enter
```

### Custom VS Code Options

```bash
# Open in new window
alias thyra-new="code -n"

# Open and immediately run tasks
thyra open my-app && code . --command "workbench.action.tasks.runTask"

# Open with specific settings
code . --user-data-dir ~/.vscode-thyra
```

---

## JetBrains IDEs

### WebStorm

```bash
# Add WebStorm to PATH (macOS)
export PATH="/Applications/WebStorm.app/Contents/MacOS:$PATH"

# Set as default editor
export EDITOR="webstorm"

# Open projects
thyra open my-project  # Opens in WebStorm
```

### IntelliJ IDEA

```bash
# Add IntelliJ to PATH
export PATH="/Applications/IntelliJ IDEA.app/Contents/MacOS:$PATH"

# Use command
idea ~/path/to/project
```

### PhpStorm

```bash
# Add PhpStorm to PATH
export PATH="/Applications/PhpStorm.app/Contents/MacOS:$PATH"

# Open with PhpStorm
export EDITOR="phpstorm"
thyra open my-php-project
```

### PyCharm

```bash
# Professional
export PATH="/Applications/PyCharm.app/Contents/MacOS:$PATH"

# Community Edition
export PATH="/Applications/PyCharm CE.app/Contents/MacOS:$PATH"

# Open Python projects
export EDITOR="pycharm"
thyra open my-python-project
```

---

## Vim / Neovim

### Basic Vim Setup

```bash
# Set Vim as default
export EDITOR="vim"

# Open projects
thyra open my-project  # Opens in Vim

# Open specific file
thyra_open_file() {
    cd $(thyra list | grep "$1" | awk -F '→' '{print $2}' | tr -d ' ')
    vim .
}
```

### Neovim Setup

```bash
# Set Neovim as default
export EDITOR="nvim"

# Custom Neovim config for projects
alias thyra-vim="nvim -c 'cd' -c 'NERDTree'"
```

### Advanced Vim Integration

Create a custom script:

```bash
#!/bin/bash
# thyra-vim.sh

PROJECT_NAME=$1
PROJECT_PATH=$(thyra list | grep "$PROJECT_NAME" | awk -F '→' '{print $2}' | tr -d ' ')

if [ -z "$PROJECT_PATH" ]; then
    echo "Project not found: $PROJECT_NAME"
    exit 1
fi

cd "$PROJECT_PATH" || exit
nvim .
```

Usage:

```bash
chmod +x thyra-vim.sh
./thyra-vim.sh my-project
```

---

## Sublime Text

### Setup

```bash
# macOS
export PATH="/Applications/Sublime Text.app/Contents/SharedSupport/bin:$PATH"

# Linux
sudo ln -s /opt/sublime_text/sublime_text /usr/local/bin/subl

# Windows (Git Bash)
export PATH="/c/Program Files/Sublime Text:$PATH"
```

### Usage

```bash
# Set as default
export EDITOR="subl"

# Open projects
thyra open my-project  # Opens in Sublime Text

# Open in new window
subl -n $(thyra list | grep "my-project" | awk -F '→' '{print $2}')
```

---

## Emacs

### Setup

```bash
# Set Emacs as default editor
export EDITOR="emacs"

# Use Emacs client for faster opening
export EDITOR="emacsclient -c"

# Alias for GUI Emacs
alias thyra-emacs="emacsclient -c -n"
```

### Usage

```bash
# Open in Emacs
thyra open my-project

# Custom Emacs integration
thyra_emacs() {
    PROJECT_PATH=$(thyra list | grep "$1" | awk -F '→' '{print $2}' | tr -d ' ')
    emacsclient -c "$PROJECT_PATH"
}
```

---

## Multiple Editors

### Choose Editor Per Project Type

```bash
#!/bin/bash
# smart-open.sh

PROJECT_NAME=$1
PROJECT_PATH=$(thyra list | grep "$PROJECT_NAME" | awk -F '→' '{print $2}' | tr -d ' ')

# Detect project type and open with appropriate editor
if [ -f "$PROJECT_PATH/package.json" ]; then
    # JavaScript/TypeScript project - use VS Code
    code "$PROJECT_PATH"
elif [ -f "$PROJECT_PATH/pom.xml" ]; then
    # Java project - use IntelliJ
    idea "$PROJECT_PATH"
elif [ -f "$PROJECT_PATH/requirements.txt" ]; then
    # Python project - use PyCharm
    pycharm "$PROJECT_PATH"
else
    # Default editor
    code "$PROJECT_PATH"
fi
```

### Manual Editor Selection

```bash
# Add aliases for different editors
alias thyra-code="code"
alias thyra-vim="vim"
alias thyra-idea="idea"

# Usage
thyra open my-project && thyra-code .
thyra open my-project && thyra-vim .
thyra open my-project && thyra-idea .
```

---

## Custom Scripts and Automation

### Open and Start Dev Server

```bash
#!/bin/bash
# thyra-dev.sh - Open project and start dev server

PROJECT=$1

# Open in editor
thyra open "$PROJECT"

# Get project path
PROJECT_PATH=$(thyra list | grep "$PROJECT" | awk -F '→' '{print $2}' | tr -d ' ')

# Start dev server in new terminal tab
cd "$PROJECT_PATH" && npm run dev
```

### Open Multiple Related Projects

```bash
#!/bin/bash
# open-stack.sh - Open full-stack project

FRONTEND=$1-frontend
BACKEND=$1-backend
DOCS=$1-docs

# Open all in VS Code
code $(thyra list | grep "$FRONTEND" | awk -F '→' '{print $2}')
code $(thyra list | grep "$BACKEND" | awk -F '→' '{print $2}')
code $(thyra list | grep "$DOCS" | awk -F '→' '{print $2}')
```

---

## Terminal Integration

### iTerm2 (macOS)

Create a custom profile:

```bash
# In iTerm2 > Preferences > Profiles
# Create new profile: "Thyra Project"
# Command: thyra open $PROJECT_NAME
```

### Tmux Integration

```bash
# .tmux.conf
bind-key p command-prompt -p "project:" "run-shell 'thyra open %%'"

# Usage in tmux:
# Press prefix + p
# Type project name
# Project opens in current pane
```

### Zsh/Bash Functions

```bash
# Add to ~/.zshrc or ~/.bashrc

# Quick open with selection
to() {
    if [ -z "$1" ]; then
        # Show menu if no argument
        thyra list
        read -p "Enter project name: " PROJECT
    else
        PROJECT=$1
    fi
    thyra open "$PROJECT"
}

# Open and cd
tcd() {
    PROJECT_PATH=$(thyra list | grep "$1" | awk -F '→' '{print $2}' | tr -d ' ')
    cd "$PROJECT_PATH" || return
    pwd
}
```

---

## IDE-Specific Features

### VS Code Workspaces

```bash
# Save VS Code workspace
code --add ~/my-project workspace.code-workspace

# Open with Thyra
thyra open my-project && code workspace.code-workspace
```

### JetBrains Projects

```bash
# WebStorm saves projects automatically
# Access recent projects
webstorm --recent

# Combine with Thyra
thyra open my-app && webstorm .
```

---

## Troubleshooting

### Editor Command Not Found

**Problem:** `command not found: code` (or vim, subl, etc.)

**Solution:**

```bash
# Find where your editor is installed
which code
which vim
which subl

# If not found, add to PATH
export PATH="/path/to/editor:$PATH"

# Make permanent by adding to ~/.bashrc or ~/.zshrc
```

### Wrong Editor Opens

**Problem:** Project opens in wrong editor

**Solution:**

```bash
# Check default editor
echo $EDITOR

# Set correct editor
export EDITOR="code"  # or vim, subl, etc.

# Make permanent
echo 'export EDITOR="code"' >> ~/.bashrc
source ~/.bashrc
```

### Editor Opens Empty

**Problem:** Editor opens but shows empty workspace

**Solution:**

```bash
# Verify project path
thyra list | grep "project-name"

# Check if path exists
ls -la /path/from/thyra/list

# Update path if moved
thyra delete old-name
thyra config new-name /correct/path
```

---

## Platform-Specific Notes

### macOS

```bash
# Applications are in /Applications/
# Add to PATH:
export PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin:$PATH"
```

### Linux

```bash
# Editors usually in /usr/bin or /opt
# Verify with:
which code
which vim
```

### Windows

```powershell
# PowerShell
$env:EDITOR = "code"

# Git Bash
export EDITOR="code"

# Add to PATH in System Environment Variables
```

---

## Next Steps

- **[Advanced Workflows](/advanced/custom-workflows)** - Build advanced automation
- **[Shell Integration](/advanced/shell-integration)** - Deep terminal integration
- **[Configuration](/reference/configuration)** - Advanced configuration options

---

**Your editor is now perfectly integrated with Thyra!**

[Explore Advanced Workflows →](/advanced/custom-workflows)
