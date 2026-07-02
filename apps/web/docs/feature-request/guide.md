# How to Request a Feature

We are always looking for ways to make Thyra more useful and efficient for developers! If you have an idea for a new command, an enhancement to an existing feature, or better editor support, we would love to hear about it.

Follow this guide to submit a feature request that helps us understand exactly what you need and why.

## Step 1: Check Existing Feature Requests

Before submitting a new idea, please check if someone else has already suggested it.

- Go to the **[Thyra Issues page](https://github.com/udithavithanage/thyra/issues)**.
- Search the issues for keywords related to your idea (e.g., "rename alias", "fzf support", "custom themes").
- If your idea has already been proposed, please upvote it by adding a 👍 reaction to the original issue. You can also add a comment if you have additional thoughts or use cases!

## Step 2: Open a New Feature Request

If your idea hasn't been requested yet, let's create a new one!

1. Navigate to the **[Thyra Issues page](https://github.com/udithavithanage/thyra/issues)**.
2. Click the green **"New issue"** button in the top right corner.
3. If issue templates are enabled, select the **Feature Request** template. Otherwise, open a regular issue.

## Step 3: Write a Great Feature Request

A well-written feature request helps the maintainers understand the value of your idea and how it fits into Thyra's philosophy of being "simple, fast, and no fluff."

Please include the following details in your request:

### 1. The Problem

Great features solve real problems. Describe the pain point or workflow bottleneck you are experiencing.

- _Example:_ "Currently, if I make a typo in an alias name, I have to remove it and reconfigure it from scratch. It's frustrating when managing many projects."

### 2. The Proposed Solution

Explain exactly how you want Thyra to solve the problem.

- _Example:_ "I would love a `thyra rename <old_name> <new_name>` command that simply updates the key in the JSON config file without changing the path."

### 3. Example CLI Usage

Since Thyra is a CLI tool, showing exactly how the command would look in the terminal is the best way to explain your idea.

```text
$ thyra rename blog personal-blog
Output: Successfully renamed alias 'blog' to 'personal-blog'.
```

### 4. Alternatives Considered

Did you try to solve this in a different way? Mention any workarounds you are currently using.

## Step 4: Submit and Discuss

Once your request is filled out, click **Submit new issue**.

The maintainers will review your idea to see if it aligns with the project's goals. We might ask some clarifying questions or discuss implementation details with you. If the feature gets approved, anyone from the community (including you!) can pick it up and submit a Pull Request.

**Ready to suggest a feature? Click here:** --> **[https://github.com/udithavithanage/thyra/issues](https://github.com/udithavithanage/thyra/issues)**
