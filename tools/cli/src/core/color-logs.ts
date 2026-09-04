import color from "picocolors";

// Strip ANSI escape sequences (for width calc)
export function stripAnsi(s: string) {
  // eslint-disable-next-line no-control-regex
  return String(s).replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, "");
}

// Visible length (ignores ANSI)
export function vlen(s: string) {
  return stripAnsi(s).length;
}

// Pad right by visible width
export function padRight(s: string, width: number) {
  const diff = Math.max(0, width - vlen(s));
  return s + " ".repeat(diff);
}

export function colorize(cmd: string) {
  return cmd.replace(/thyra\b|--\S+|<[^>]+>/g, (tok) => {
    if (tok === "thyra") return color.green(tok);
    if (tok.startsWith("--")) return color.yellow(tok);
    if (tok.startsWith("<")) return color.cyan(tok);
    return tok;
  });
}

export interface CommandTableRow {
  Command: string;
  Description: string;
  Extra?: string;
}

interface PrintCommandTableOptions {
  header?: {
    Command: string;
    Description: string;
    Extra?: string;
  };
}

export function printCommandTable(
  rows: CommandTableRow[],
  options: PrintCommandTableOptions = {},
) {
  const hasExtra =
    options.header?.Extra !== undefined ||
    rows.some((r) => r.Extra !== undefined);

  const header = options.header ?? {
    Command: "Command",
    Description: "Description",
  };

  const col1 = [header.Command, ...rows.map((r) => r.Command)];
  const col2 = [header.Description, ...rows.map((r) => r.Description)];
  const col3 = hasExtra
    ? [header.Extra || "", ...rows.map((r) => r.Extra || "")]
    : [];

  const w1 = Math.max(...col1.map(vlen));
  const w2 = Math.max(...col2.map(vlen));
  const w3 = hasExtra ? Math.max(...col3.map(vlen)) : 0;

  const sep = "  "; // spacing between columns
  const line = (t1: string, t2: string, t3?: string) =>
    padRight(t1, w1) +
    sep +
    padRight(t2, w2) +
    (hasExtra ? sep + padRight(t3 || "", w3) : "");

  // header
  console.log(
    color.bold(line(header.Command, header.Description, header.Extra)),
  );
  // separator
  console.log(
    padRight("-".repeat(w1), w1) +
      sep +
      "-".repeat(w2) +
      (hasExtra ? sep + "-".repeat(w3) : ""),
  );

  // rows
  for (const r of rows) {
    console.log(line(r.Command, r.Description, r.Extra));
  }
}
