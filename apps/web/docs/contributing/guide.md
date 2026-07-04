# Contributing to Thyra

First off, thank you for considering contributing to **Thyra**! 🎉

Thyra is a tiny CLI designed to make developers' lives easier by bookmarking project folders and opening them instantly. Whether you want to fix a bug, add a new feature, improve performance, or update documentation, your contributions are highly valued.

This document outlines the process for contributing to the repository.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Bun**: Thyra uses Bun as its runtime and package manager. Install it via [bun.sh](https://bun.sh/).
- **Git**: For version control.

## Local Development Setup

To set up Thyra locally for development, follow these steps:

### 1. Fork and Clone the Repository

Fork the [Thyra repository](https://github.com/udithavithanage/thyra) and clone it locally:

```bash
git clone https://github.com/YOUR-USERNAME/thyra.git
cd thyra
```

### 2. Install Dependencies

Use Bun to install all necessary dependencies:

```bash
bun install
```

### 3. Local Workflow Scripts

We have introduced several utility scripts to streamline the development process:

| Action               | Command          |
| -------------------- | ---------------- |
| **Link for Testing** | `bun run link`   |
| **Unlink**           | `bun run unlink` |

#### Version Bumping

We use an automated script to handle version updates seamlessly. Depending on the type of changes you are introducing, use one of the following:

- **Patch** (minor bug fixes): `bun run bump:patch`
- **Minor** (new features): `bun run bump:minor`
- **Major** (breaking changes): `bun run bump:major`

## Branching Strategy

Always create a new branch for your work. Use descriptive names:

- **Features:** `feature/your-feature-name`
- **Bug Fixes:** `bugfix/fix-path-resolution`
- **Documentation:** `docs/update-guide`

## Making Changes

- **TypeScript**: Thyra is built with TypeScript. Follow existing conventions in the `src/` directory.
- **Keep it Tiny**: Thyra's core philosophy is to be simple and fast. Avoid heavy dependencies.
- **Commit Standards**: We enforce strict commit conventions using **Husky** and **commitlint**. Every commit must adhere to [Conventional Commits](https://www.conventionalcommits.org/).
- **Pre-commit Checks**: Before committing, Husky will automatically trigger a build verification. If the build fails for any package in the monorepo, the commit will be blocked. Ensure your code passes all build checks locally.

## Submitting a Pull Request

1. **Push your branch** to your fork:

```bash
git push origin feature/your-feature-name
```

2. Open a Pull Request on the [Thyra repository](https://github.com/udithavithanage/thyra).
3. Clearly describe your changes, the motivation behind them, and link any relevant Issue numbers.

## Need Help?

If you are stuck, open a **Discussion** or an **Issue** tagged as a `question` on GitHub.

_Thank you for helping make Thyra better!_
