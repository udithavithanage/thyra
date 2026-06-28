# Reference

Complete technical documentation for all Thyra features, commands, and configuration options.

---

## 📘 Documentation Sections

### [CLI Commands](/reference/cli)

Complete reference for all Thyra commands with syntax, options, and examples.

**Contents:**

- `thyra config` - Save projects
- `thyra open` - Open projects
- `thyra list` - View all projects
- `thyra delete` - Remove projects
- `thyra version` - Check version
- Command options and flags

### [Configuration](/reference/configuration)

Customize Thyra to match your workflow and preferences.

**Contents:**

- Configuration file location
- Editor preferences
- Custom settings
- Environment variables
- Advanced options

### [Examples](/reference/examples)

Real-world, copy-paste ready code examples for common scenarios.

**Contents:**

- Basic usage examples
- Advanced workflows
- Script templates
- Integration examples

### [FAQ](/reference/faq)

Answers to frequently asked questions about Thyra.

**Contents:**

- General questions
- Installation issues
- Usage questions
- Technical questions
- Troubleshooting tips

### [Troubleshooting](/reference/troubleshooting)

Solutions to common problems and error messages.

**Contents:**

- Installation errors
- Command failures
- Path issues
- Editor problems
- Platform-specific issues

---

## 🎯 Quick Reference

### Essential Commands

```bash
# Save a project
thyra config <name> <path>

# Open a project
thyra open <name>

# List all projects
thyra list

# Remove a project
thyra delete <name>

# Check version
thyra version
```

### Common Patterns

```bash
# Save current directory
thyra config my-project $(pwd)

# Open with specific editor
EDITOR=vim thyra open my-project

# Batch operations
for project in proj1 proj2 proj3; do
    thyra open $project
done
```

---

## 📖 How to Use This Reference

### For Beginners

1. Start with [CLI Commands](/reference/cli) to learn all available commands
2. Check [Examples](/reference/examples) for practical usage
3. Read [FAQ](/reference/faq) for common questions

### For Advanced Users

1. Dive into [Configuration](/reference/configuration) for customization
2. Check [Troubleshooting](/reference/troubleshooting) when you hit issues
3. Explore command options and flags in [CLI Commands](/reference/cli)

### For Problem Solving

1. Check [Troubleshooting](/reference/troubleshooting) first
2. Review [FAQ](/reference/faq) for known issues
3. Check [Examples](/reference/examples) for working code

---

## 🔍 Search Tips

Looking for something specific?

- **Commands:** Check [CLI Commands](/reference/cli)
- **How to do X:** Check [Examples](/reference/examples)
- **"It's not working":** Check [Troubleshooting](/reference/troubleshooting)
- **"How do I...":** Check [FAQ](/reference/faq)
- **Settings:** Check [Configuration](/reference/configuration)

---

## 📚 Related Documentation

- **[Getting Started](/getting-started/README)** - New to Thyra?
- **[Guides](/guides/README)** - Practical tutorials
- **[Advanced](/advanced/README)** - Power user features

---

**Find what you need quickly**

[Browse CLI Commands →](/reference/cli)

---

## Support

### Having Issues?

1. Check the [Troubleshooting Section](./cli.md#troubleshooting)
2. Review the [Examples](./examples.md) for similar use cases
3. Verify your [Configuration](./configuration.md)

### Need Help?

- **GitHub Issues:** [github.com/udithavithanage/thyra/issues](https://github.com/udithavithanage/thyra/issues)
- **Email:** [udithavithanage358@gmail.com](mailto:udithavithanage358@gmail.com)
- **npm Package:** [npmjs.com/package/thyra](https://www.npmjs.com/package/thyra)

---

## Contributing

Found a bug or want to contribute? Visit the [GitHub repository](https://github.com/udithavithanage/thyra).

---

## License

Thyra is released under the [MIT License](https://github.com/udithavithanage/thyra/blob/main/LICENSE).
