# How to Report a Bug

We want Thyra to be as stable and reliable as possible. If you run into an issue, a crash, or unexpected behavior, please let us know!

Reporting bugs helps us improve the tool for everyone. Follow this guide to ensure your bug report is as helpful and actionable as possible.

## Step 1: Check Existing Issues

Before creating a new bug report, please check if someone else has already reported the same problem.

- Go to the **[Thyra Issues page](https://github.com/udithavithanage/thyra/issues)**.
- Use the search bar to look for keywords related to your problem (e.g., "spaces in path", "Windows editor not opening").
- If you find an existing issue that matches yours, feel free to add a 👍 reaction to the original post or leave a comment with any additional context from your own experience.

## Step 2: Open a New Bug Report

If you couldn't find an existing issue, it's time to open a new one!

1. Navigate to the **[Thyra Issues page](https://github.com/udithavithanage/thyra/issues)**.
2. Click the green **"New issue"** button in the top right corner.
3. If you have issue templates configured, select the **Bug Report** template. Otherwise, just open a regular issue.

## Step 3: Write a Great Bug Report

A good bug report contains enough information for the maintainers to reproduce and fix the issue. Please include the following information in your report:

### 1. Title

Write a clear, descriptive title.

- ❌ _Bad:_ "It doesn't work"
- ✅ _Good:_ "bug: thyra open fails when folder path contains spaces on Windows"

### 2. Steps to Reproduce

List the exact steps you took before encountering the bug.

```text
1. Run `thyra config myproject "C:\Users\Name\My Projects"`
2. Run `thyra open myproject`
3. See error output regarding invalid directory.
```

### 3. Expected vs. Actual Behavior

- **Expected:** What did you think was going to happen? (e.g., "VS Code should open the directory").
- **Actual:** What actually happened? (e.g., "The terminal crashed with a 'path not found' error"). Paste any error logs or terminal outputs directly into the issue (use formatting like ``` for code blocks).

### 4. Your Environment

This is critical for debugging! Always include:

- **Operating System:** (e.g., macOS Sonoma, Windows 11, Ubuntu 22.04)
- **Node.js Version:** (e.g., v20.11.0)
- **Thyra Version:** Run `thyra version` to get this.
- **Terminal/Shell:** (e.g., PowerShell, zsh, bash, Command Prompt)
- **Editor:** (e.g., VS Code, WebStorm) and whether you are using the `THYRA_EDITOR` environment variable.

## Step 4: Submit and Collaborate

Once you've filled out all the information, click **Submit new issue**.

A maintainer will review your report. We might ask follow-up questions to help narrow down the problem, so please keep an eye on your GitHub notifications!

---

**Link to report an issue directly:** --> **[https://github.com/udithavithanage/thyra/issues](https://github.com/udithavithanage/thyra/issues)**
