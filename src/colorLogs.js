// Basic colors/styles
export const c = {
  reset: "\x1b[0m",
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  underline: (s) => `\x1b[4m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

// Strip ANSI escape sequences (for width calc)
export function stripAnsi(s) {
  return String(s).replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, "");
}

// Visible length (ignores ANSI)
export function vlen(s) {
  return stripAnsi(s).length;
}

// Pad right by visible width
export function padRight(s, width) {
  const diff = Math.max(0, width - vlen(s));
  return s + " ".repeat(diff);
}

export function colorize(cmd) {
  return cmd.replace(/thyra\b|--\S+|<[^>]+>/g, (tok) => {
    if (tok === "thyra") return c.green(tok);
    if (tok.startsWith("--")) return c.yellow(tok);
    if (tok.startsWith("<")) return c.cyan(tok);
    return tok;
  });
}

export function printCommandTable(rows, options = {}) {
  const header = options.header ?? {
    Command: "Command",
    Description: "Description",
  };

  const col1 = [header.Command, ...rows.map((r) => r.Command)];
  const col2 = [header.Description, ...rows.map((r) => r.Description)];

  const w1 = Math.max(...col1.map(vlen));
  const w2 = Math.max(...col2.map(vlen));

  const sep = "  "; // spacing between columns
  const line = (t1, t2) => padRight(t1, w1) + sep + padRight(t2, w2);

  // header
  console.log(c.bold(line(header.Command, header.Description)));
  // separator
  console.log(padRight("-".repeat(w1), w1) + sep + "-".repeat(w2));

  // rows
  for (const r of rows) {
    console.log(line(r.Command, r.Description));
  }
}
