# Contributing to Thyra

First off, thank you for considering contributing to **Thyra**! 🎉

Thyra is a tiny CLI designed to make developers' lives easier by bookmarking project folders and opening them instantly. Whether you want to fix a bug, add a new feature, improve performance, or update documentation, your contributions are highly valued.

This document outlines the process for contributing to the repository.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: v14 or higher.
- **Bun**: Thyra uses Bun for package management (as indicated by `bun.lock`). You can install it via [bun.sh](https://bun.sh/).
- **Git**: For version control.

## Local Development Setup

To set up Thyra locally for development, follow these steps:

### 1. Fork and Clone the Repository

Fork the [Thyra repository](https://github.com/udithavithanage/thyra) to your GitHub account, then clone it locally:

```bash
git clone https://github.com/YOUR-USERNAME/thyra.git
cd thyra
```

### 2. Install Dependencies

Use Bun to install the project dependencies:

```bash
bun install

```

### 3. Link the CLI Locally

To test the CLI commands (like `thyra config` or `thyra open`) while developing, link the package globally on your local machine:

```bash
npm link
# OR
bun link
```

_Note: This allows you to run `thyra` in your terminal, and it will execute your local, modified code._

## Branching Strategy

Always create a new branch for your work. Do not commit directly to the `main` branch.

Use descriptive branch names that indicate the purpose of your contribution:

- **Features:** `feature/add-new-editor-support`
- **Bug Fixes:** `bugfix/fix-path-resolution`
- **Documentation:** `docs/update-readme-examples`

```bash
git checkout -b feature/your-feature-name
```

## Making Changes

When writing code for Thyra, please keep the following in mind:

- **TypeScript:** Thyra is written in 100% TypeScript. Ensure your code is strongly typed and follows the existing conventions in the `src/` directory.
- **Keep it Tiny:** Thyra's core philosophy is to be simple, fast, and have no fluff. Avoid adding heavy dependencies unless absolutely necessary.
- **Update Documentation:** If you add a new command or change how a feature works, update the `README.md` to reflect those changes.

## Commit Guidelines

Thyra uses specific commit message conventions. **Please review the `.noto` folder** in the root directory for the project's exact commit guidelines before committing your changes.

A general rule of thumb is to use conventional commits:

```bash
git add .
git commit -m "feat: add support for custom editor paths"

```

_(Common types: `feat`, `fix`, `docs`, `chore`, `refactor`)_

## Submitting a Pull Request

Once your changes are ready and tested locally, it's time to submit a Pull Request (PR)!

1. **Push your branch** to your forked repository:

```bash
git push origin feature/your-feature-name
```

2. Navigate to the [Thyra GitHub repository](https://github.com/udithavithanage/thyra) and click **Compare & pull request**.
3. **Describe your changes** clearly in the PR description:

- What does this PR do?
- Why is this change necessary?
- Include any relevant issue numbers (e.g., `Fixes #12`).

4. Submit the PR and wait for review!

Maintainers will review your code, potentially request some changes, and finally merge it into the project.

## Need Help?

If you get stuck or have questions about how a specific part of the codebase works, feel free to open a **Discussion** or an **Issue** tagged as a `question` on GitHub.

Thank you for helping make Thyra better!
