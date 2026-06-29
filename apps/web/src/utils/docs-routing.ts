const DOCS_PREFIX = "../docs/";

function normalizePathname(pathname: string): string {
  return pathname.replace(/^\/+/, "").replace(/\/+$/, "");
}

function sectionLabel(value: string): string {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function pageLabel(value: string): string {
  return value
    .replace(/\.md$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function resolveDocsFile(pathname: string, files: string[]): string {
  const normalized = normalizePathname(pathname);
  const rootFile = files.includes("./docs/README.md")
    ? "./docs/README.md"
    : files[0];

  if (!normalized || /^README(?:\.md)?$/i.test(normalized)) {
    return rootFile;
  }

  const withoutReadme = normalized.replace(/\/README(?:\.md)?$/i, "");
  const candidates = [
    `${DOCS_PREFIX}${normalized}.md`,
    `${DOCS_PREFIX}${normalized}/README.md`,
    `${DOCS_PREFIX}${withoutReadme}.md`,
    `${DOCS_PREFIX}${withoutReadme}/README.md`,
  ];

  return candidates.find((file) => files.includes(file)) ?? rootFile;
}

export function docsFileToPath(file: string): string {
  const relative = file.replace(DOCS_PREFIX, "").replace(/\.md$/i, "");

  return relative.toUpperCase() === "README" ? "/" : `/${relative}`;
}

export function getDocsSectionLabel(file: string): string {
  const relative = file.replace(`${DOCS_PREFIX}.`, "");

  if (/^README(?:\.md)?$/i.test(relative)) {
    return "Docs";
  }

  return sectionLabel(relative.split("/")[0]);
}

export function getDocsPageLabel(file: string): string {
  const relative = file.replace(`${DOCS_PREFIX}.`, "");
  const fileName = relative.split("/").at(-1) ?? "";

  if (/^README(?:\.md)?$/i.test(fileName)) {
    return "Overview";
  }

  return pageLabel(fileName);
}

export function getDocsTitle(file: string): string {
  return `${getDocsPageLabel(file)} - Thyra Docs`;
}
