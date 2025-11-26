# Commit Message Guidelines

## Format
Simple, concise descriptions. No conventional commits format detected.

## Style Rules
- **Tense**: Imperative / Present (e.g., "Add", "Fix", "Update")
- **Capitalization**: First letter capitalized
- **Length**: Concise, typically under 70 characters
- **Tone**: Technical

## Commit Types
Based on the history, the types are inferred. There is no strict adherence to types, so be mindful of the context.
- `Refactor`: Code improvements or changes without altering functionality.
- `Bump`: Version updates, usually in package.json.
- `Update`: General updates, often encompassing documentation, configurations, or dependencies.
- `Add`: Introducing new files, features, or functionalities.
- `Fix`: Resolving bugs or errors.
- `Initial commit`: The very first commit to start the project.

## Scope Usage
No scopes used.

## Description Patterns
Start with an action verb (e.g., Add, Fix, Update, Refactor, Bump). Clearly state what is being changed or added. Mention specific files or areas affected where relevant (e.g., package.json, README, editor command).

## Examples from History
- Refactor imports in version and editor commands to use node: prefix
- Bump version to 1.0.6 in package.json
- Fix editor command execution by replacing spawn with exec for better output handling and error management
- Add .gitignore file and implement version command in CLI
- Update README and version to 1.0.5; add version check command and improve editor command handling