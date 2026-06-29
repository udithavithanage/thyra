# Quick Start

Get up and running with Thyra in under 5 minutes!

---

## Step 1: Install Thyra

```bash
npm install -g thyra
```

Verify installation:

```bash
thyra --version
```

---

## Step 2: Save Your First Project

Navigate to any project directory or provide its path:

```bash
thyra config myapp ~/projects/my-awesome-app
```

✅ Your project is now saved under the name `myapp`!

---

## Step 3: Open Your Project

From anywhere in your terminal:

```bash
thyra open myapp
```

🚀 Your project opens instantly in your editor!

---

## Step 4: Add More Projects

```bash
thyra config blog ~/projects/personal-blog
thyra config api ~/work/company-api
thyra config portfolio ~/sites/portfolio
```

---

## Step 5: View All Your Projects

```bash
thyra list
```

Output:

```
myapp     → /Users/you/projects/my-awesome-app
blog      → /Users/you/projects/personal-blog
api       → /Users/you/work/company-api
portfolio → /Users/you/sites/portfolio
```

---

## Common Workflow

```bash
# Morning: Start working on the blog
thyra open blog

# Afternoon: Switch to API development
thyra open api

# Evening: Update portfolio
thyra open portfolio

# Anytime: Check what projects you have
thyra list
```

---

## Customize Your Editor

By default, Thyra uses VS Code. To use a different editor:

**macOS/Linux:**

```bash
export THYRA_EDITOR=webstorm
```

**Windows (PowerShell):**

```powershell
setx THYRA_EDITOR "webstorm"
```

---

## Next Steps

- 📖 Read the full [CLI Reference](../reference/cli.md)
- ⚙️ Learn about [Editor Configuration](../reference/cli.md#editor-configuration)
- 🔧 Check out [Troubleshooting Tips](../reference/cli.md#troubleshooting)

---

## Pro Tips

1. **Use short, memorable names** - `blog` is better than `personal-blog-2024`
2. **Organize by context** - `work-api`, `personal-site`, etc.
3. **Use thyra list regularly** - Keep track of all your bookmarks
4. **Set your preferred editor once** - Configure `THYRA_EDITOR` in your shell profile

Happy coding! 🎉
