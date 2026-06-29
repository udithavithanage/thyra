# Contributing Guide

Thank you for considering contributing to Thyra! This guide will help you get started.

---

## Code of Conduct

Be respectful, inclusive, and professional. We're all here to make Thyra better.

---

## Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported
2. Try the latest version of Thyra
3. Check the [Troubleshooting](/reference/troubleshooting) guide

### How to Report

Open an issue with:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: How to trigger the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**:
  ```bash
  Thyra version: (thyra version)
  Node version: (node --version)
  OS: (macOS/Linux/Windows)
  Shell: (bash/zsh/fish/powershell)
  ```

---

## Suggesting Features

We love new ideas! Open an issue with:

- **Problem**: What problem does this solve?
- **Solution**: Your proposed solution
- **Alternatives**: Other approaches you've considered
- **Use Cases**: Real-world examples

---

## Pull Request Process

### 1. Fork and Clone

```bash
git clone https://github.com/udithavithanage/thyra.git
cd thyra
```

### 2. Create Branch

```bash
git checkout -b feature/my-feature
# or
git checkout -b fix/bug-description
```

### 3. Make Changes

- Write clean, readable code
- Follow existing code style
- Add tests if applicable
- Update documentation

### 4. Test

```bash
npm test
npm run lint
```

### 5. Commit

```bash
git commit -m "feat: add amazing feature"
# or
git commit -m "fix: resolve issue with X"
```

**Commit Message Format:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Test changes
- `refactor:` Code refactoring

### 6. Push and Create PR

```bash
git push origin feature/my-feature
```

Then open a Pull Request on GitHub with:

- Clear description of changes
- Link to related issues
- Screenshots (if applicable)

---

## Development Workflow

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Build
npm run build
```

---

## Coding Standards

- Use meaningful variable names
- Write comments for complex logic
- Keep functions small and focused
- Follow existing code patterns

---

## Documentation

When adding features:

1. Update relevant `.md` files
2. Add examples
3. Update the changelog

---

## Questions?

- Open a [Discussion](https://github.com/udithavithanage/thyra/discussions)
- Ask in your Pull Request

---

**Thank you for contributing to Thyra!** 🎉
