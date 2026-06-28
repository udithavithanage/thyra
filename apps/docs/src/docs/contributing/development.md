# Development Setup

Set up your local development environment for contributing to Thyra.

---

## Prerequisites

- **Node.js** v14 or higher
- **npm** v6 or higher
- **Git**
- A code editor (VS Code recommended)

---

## Initial Setup

### 1. Fork and Clone

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/udithavithanage/thyra.git
cd thyra
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify Setup

```bash
# Run tests
npm test

# Check linting
npm run lint
```

---

## Development Workflow

### Running Locally

```bash
# Link your local version globally
npm link

# Now 'thyra' command uses your local code
thyra version

# Test your changes
thyra config test-project /tmp/test
thyra open test-project
```

### Making Changes

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes to src/

# Test your changes
npm test

# Lint your code
npm run lint
```

### Unlinking

```bash
# When done developing
npm unlink

# Reinstall global Thyra
npm install -g thyra
```

---

## Project Structure

```
thyra/
├── src/              # Source code
├── tests/            # Test files
├── docs/             # Documentation
├── package.json      # Package configuration
└── README.md         # Project README
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run specific test
npm test -- --grep "config"

# Run with coverage
npm run test:coverage
```

---

## Building

```bash
# Build for production
npm run build

# Output in dist/
```

---

## Troubleshooting Development Issues

### Tests Failing

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm test
```

### Link Not Working

```bash
npm unlink
npm link
which thyra  # Should point to your local version
```

---

**Ready to code!**

[Back to Contributing →](/contributing/README)
