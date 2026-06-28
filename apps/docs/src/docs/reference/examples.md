# Examples

Real-world examples and use cases for Thyra.

---

## Basic Usage

### Save and Open a Project

```bash
# Save your main project
thyra config myapp ~/projects/awesome-app

# Open it from anywhere
thyra open myapp
```

---

## Multi-Project Development

### Managing Multiple Related Projects

Perfect for microservices architecture or monorepo-style development:

```bash
# Save all components of your application
thyra config app-frontend ~/code/myapp/frontend
thyra config app-backend ~/code/myapp/backend
thyra config app-mobile ~/code/myapp/mobile
thyra config app-docs ~/code/myapp/documentation

# Switch between them instantly
thyra open app-frontend
thyra open app-backend
thyra open app-mobile
```

### Work Projects vs Personal Projects

```bash
# Work projects
thyra config work-api ~/work/company/api
thyra config work-web ~/work/company/website
thyra config work-admin ~/work/company/admin-panel

# Personal projects
thyra config blog ~/personal/blog
thyra config portfolio ~/personal/portfolio-site
thyra config sideproject ~/personal/cool-idea
```

---

## Client Work

### Managing Multiple Client Projects

```bash
# Different clients
thyra config client-acme ~/freelance/acme-corp/website
thyra config client-xyz ~/freelance/xyz-inc/ecommerce
thyra config client-abc ~/freelance/abc-ltd/app

# Quick client switching
thyra open client-acme
thyra open client-xyz
```

---

## Learning & Experiments

### Organizing Learning Projects

```bash
# Tutorials and courses
thyra config learn-react ~/learning/react-tutorial
thyra config learn-rust ~/learning/rust-book
thyra config learn-ml ~/learning/machine-learning

# Quick experiments
thyra config experiment-1 ~/experiments/web3-test
thyra config scratch ~/experiments/sandbox
```

---

## Open Source Contributions

### Managing Multiple Repositories

```bash
# Forked repositories
thyra config oss-react ~/opensource/react
thyra config oss-vscode ~/opensource/vscode
thyra config oss-nodejs ~/opensource/node

# Your own projects
thyra config my-plugin ~/github/vscode-plugin
thyra config my-lib ~/github/utility-library
```

---

## Path Examples

### Relative Paths

```bash
# From current directory
cd ~/projects/my-app
thyra config myapp .

# Relative to current location
thyra config utils ../shared/utilities
```

### Absolute Paths

```bash
# macOS/Linux
thyra config docs /Users/you/Documents/project-docs
thyra config data /var/data/analytics

# Windows
thyra config app "C:\Projects\MyApp"
thyra config docs "D:\Documents\Work\Documentation"
```

### Paths with Spaces

```bash
# Always use quotes for paths with spaces
thyra config design "/Users/you/Work/Client A/Design Files"
thyra config project "C:\Users\You\My Projects\Important App"
```

---

## Editor-Specific Examples

### Using Different Editors

```bash
# Configure your preferred editor
export THYRA_EDITOR=webstorm

# Or use different editors for different projects
THYRA_EDITOR=code thyra open frontend
THYRA_EDITOR=vim thyra open config
THYRA_EDITOR=idea thyra open java-backend
```

### Editor with Arguments

```bash
# VS Code with new window
export THYRA_EDITOR="code --new-window"

# Sublime Text with project support
export THYRA_EDITOR="subl --new-window"
```

---

## Workflow Examples

### Morning Routine

```bash
# Check what projects you have
thyra list

# Start with email automation
thyra open email-script

# Then move to main project
thyra open main-app
```

### Context Switching

```bash
# Working on feature A
thyra open feature-a

# Got a bug report, switch to hotfix
thyra open production-fix

# Back to feature development
thyra open feature-a
```

### End of Day

```bash
# Review all projects
thyra list

# Open documentation to update
thyra open docs
```

---

## Team Collaboration

### Shared Setup Script

Create a setup script for your team:

```bash
#!/bin/bash
# setup-thyra.sh

echo "Setting up Thyra bookmarks..."

thyra config frontend ~/code/company-app/frontend
thyra config backend ~/code/company-app/backend
thyra config mobile ~/code/company-app/mobile
thyra config docs ~/code/company-app/documentation
thyra config infra ~/code/company-app/infrastructure

echo "✅ Thyra bookmarks configured!"
echo "Run 'thyra list' to see all projects"
```

Make it executable and run:

```bash
chmod +x setup-thyra.sh
./setup-thyra.sh
```

---

## Advanced Use Cases

### Integration with Other Tools

```bash
# Create aliases for common workflows
alias dev-frontend='thyra open frontend && npm start'
alias dev-backend='thyra open backend && npm run dev'
alias dev-all='thyra open backend && npm run dev & thyra open frontend && npm start'
```

### Shell Functions

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# Quick save current directory
tsave() {
    thyra config "$1" "$(pwd)"
    echo "✅ Saved $(pwd) as $1"
}

# Save and open
tsaveopen() {
    thyra config "$1" "$(pwd)"
    thyra open "$1"
}

# Fuzzy find and open (requires fzf)
topen() {
    local project=$(thyra list | fzf | awk '{print $1}')
    if [ -n "$project" ]; then
        thyra open "$project"
    fi
}
```

Usage:

```bash
# Save current directory
cd ~/projects/my-app
tsave myapp

# Save and open immediately
cd ~/projects/another-app
tsaveopen another
```

---

## Platform-Specific Examples

### macOS

```bash
# Home directory projects
thyra config blog ~/Documents/Blog
thyra config photos ~/Pictures/PhotoApp

# Applications folder (if you have source)
thyra config xcode-project ~/Developer/MyApp
```

### Linux

```bash
# Common Linux paths
thyra config web /var/www/html/mysite
thyra config config ~/.config/my-app
thyra config scripts /usr/local/bin/scripts
```

### Windows

```bash
# Windows paths
thyra config website "C:\inetpub\wwwroot\mysite"
thyra config userapp "%USERPROFILE%\Projects\App"
thyra config shared "\\NetworkShare\Projects\SharedApp"
```

---

## Naming Conventions

### Good Names

```bash
# Short and descriptive
thyra config blog ~/projects/blog
thyra config api ~/projects/api
thyra config docs ~/projects/docs

# Context-prefixed
thyra config work-cms ~/work/cms
thyra config personal-site ~/personal/website
thyra config client-shop ~/clients/ecommerce
```

### Avoid

```bash
# Too generic
thyra config project ~/projects/thing

# Too long
thyra config my-awesome-super-cool-blog-that-i-made ~/projects/blog

# Special characters (may cause issues)
thyra config my@project ~/projects/app
thyra config site#1 ~/projects/site
```

---

## Troubleshooting Examples

### Check What's Saved

```bash
# List all projects
thyra list

# Check configuration file directly (macOS/Linux)
cat ~/.config/thyra/thyra.json

# Windows (PowerShell)
Get-Content "$env:APPDATA\thyra\thyra.json"
```

### Fix Wrong Path

```bash
# Simply re-save with correct path
thyra config myapp ~/correct/path/to/project

# Or edit JSON file directly
```

### Test Editor Command

```bash
# Make sure your editor command works
code .
webstorm .
vim .

# Then set it for Thyra
export THYRA_EDITOR=webstorm
```

---

## Next Steps

- Review the complete [CLI Reference](./cli.md)
- Learn about [Configuration Options](./configuration.md)
- Check out [Troubleshooting](./cli.md#troubleshooting) tips
