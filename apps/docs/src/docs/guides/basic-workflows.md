# Basic Workflows

Master the essential day-to-day workflows with Thyra. This guide covers common tasks you'll perform regularly.

---

## Prerequisites

- Thyra installed ([Installation Guide](/getting-started/installation))
- Completed the [Quick Start](/getting-started/quick-start) tutorial
- At least one project saved in Thyra

---

## Daily Workflows

### 1. Starting Your Work Day

Open your current project instantly when you start working:

```bash
# Open your main project
thyra open main-project

# Or if you're working on multiple things
thyra open client-site
thyra open api-backend
thyra open mobile-app
```

**Pro Tip:** Create a shell script to open multiple projects at once:

```bash
#!/bin/bash
# morning-setup.sh
thyra open frontend
thyra open backend
thyra open docs
```

---

### 2. Saving New Projects

When you start a new project, bookmark it immediately:

```bash
# Save with a memorable name
thyra config portfolio ~/projects/portfolio-2024
thyra config blog ~/websites/personal-blog

# For client work, use client prefix
thyra config acme-web ~/clients/acme/website
thyra config acme-api ~/clients/acme/api
```

**Naming Best Practices:**

- Use lowercase with hyphens: `my-project` ✅ not `My Project` ❌
- Keep names short but descriptive: `blog` ✅ not `personal-coding-blog-website` ❌
- Use prefixes for grouping: `client-acme`, `client-techcorp` ✅

---

### 3. Checking What You Have Saved

Quickly view all your bookmarked projects:

```bash
# List everything
thyra list

# Example output:
# Saved projects:
# - portfolio → /Users/you/projects/portfolio-2024
# - blog → /Users/you/websites/personal-blog
# - api → /Users/you/work/company-api
# - docs → /Users/you/documents/documentation
```

**Use Case:** Run `thyra list` when you can't remember what you named a project.

---

### 4. Switching Between Projects

Jump between projects without changing directories:

```bash
# Working on frontend, need to check backend
thyra open backend

# Need to update documentation
thyra open docs

# Back to frontend
thyra open frontend
```

**Time Saved:** Instead of:

```bash
cd ~/very/long/path/to/projects/company/backend/api
code .
```

Just:

```bash
thyra open api
```

---

### 5. Removing Old Projects

Clean up projects you no longer need:

```bash
# Remove a single project
thyra delete old-project

# Verify it's gone
thyra list
```

**When to Remove:**

- Project is completed and archived
- Project was deleted from disk
- You made a typo when saving
- Client relationship ended

---

### 6. Quick Project Access

Use Thyra for rapid context switching:

```bash
# Check something in project A
thyra open project-a

# Quickly switch to project B
thyra open project-b

# Back to A
thyra open project-a
```

**Scenario:** You're in a meeting discussing Project B, but working on Project A. Instantly switch to show your screen without fumbling through folders.

---

## Common Patterns

### Pattern 1: Client-Based Organization

```bash
# Save all client projects with prefixes
thyra config acme-web ~/clients/acme/website
thyra config acme-api ~/clients/acme/backend
thyra config techcorp-app ~/clients/techcorp/mobile

# Easy to remember and list
thyra list
```

### Pattern 2: Feature-Based Organization

```bash
# Organize by feature or component
thyra config frontend ~/project/client-app
thyra config backend ~/project/server-api
thyra config mobile ~/project/mobile-app
thyra config docs ~/project/documentation
```

### Pattern 3: Priority-Based Organization

```bash
# Use numbers for priority
thyra config 1-urgent ~/urgent/critical-fix
thyra config 2-active ~/work/current-project
thyra config 3-backlog ~/backlog/future-feature
```

---

## Time-Saving Tips

### Tip 1: Create Shortcuts for Frequent Projects

```bash
# Instead of typing long names
alias o1="thyra open main-project"
alias o2="thyra open secondary-project"
alias o3="thyra open documentation"
```

### Tip 2: Use Tab Completion

Most shells support tab completion:

```bash
thyra open proj<TAB>  # Auto-completes to 'project-name'
```

### Tip 3: Check Version and Location

```bash
# Verify your Thyra version
thyra version

# Find where a project is located (from list)
thyra list | grep "project-name"
```

### Tip 4: Combine with Other Commands

```bash
# Save current directory quickly
thyra config temp-work $(pwd)

# Open and run commands
thyra open api && npm run dev
```

---

## Troubleshooting Common Issues

### "Project not found" Error

```bash
# Check if project exists
thyra list

# If missing, re-add it
thyra config project-name /path/to/project
```

### Editor Doesn't Open

```bash
# Verify your editor is in PATH
which code  # For VS Code
which vim   # For Vim

# Set default editor in Thyra config
thyra config --editor code
```

### Accidentally Saved Wrong Path

```bash
# Remove the incorrect entry
thyra delete wrong-project

# Re-add with correct path
thyra config correct-project /correct/path
```

---

## Next Steps

Now that you've mastered basic workflows, you're ready for more advanced topics:

- **[Multi-Project Management](/guides/multi-project)** - Handle multiple projects like a pro
- **[Editor Integration](/guides/editor-integration)** - Set up your favorite editor
- **[Team Collaboration](/guides/team-setup)** - Share configurations with your team

---

## Quick Reference Card

```bash
# Essential Commands
thyra config <name> <path>    # Save a project
thyra open <name>              # Open a project
thyra list                     # List all projects
thyra delete <name>            # Remove a project
thyra version                  # Check Thyra version

# Examples
thyra config blog ~/my-blog
thyra open blog
thyra list
thyra delete blog
```

---

**Keep practicing these workflows, and they'll become second nature!**

[Explore Multi-Project Management →](/guides/multi-project)
