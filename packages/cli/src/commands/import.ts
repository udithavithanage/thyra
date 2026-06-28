import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

import color from "picocolors";

import { resolveFolderPath } from "~/utils";
import type { ConfigStore } from "~/core";

type ExecutionMode = "real" | "dry-run";

function generateSlug(name: string): string {
  let slug = name.toLowerCase();
  slug = slug.replace(/[^a-z0-9]+/g, "-");
  slug = slug.replace(/^-+|-+$/g, "");
  return slug;
}

function formatImportResult(mode: ExecutionMode, importedCount: number, skippedCount: number, collisionsCount: number): void {
  if (mode === "dry-run") {
    console.log(color.yellow("[DRY RUN] Simulation mode. No registry changes made.\n"));
    console.log(color.bold(`Would import: ${importedCount}`));
    if (skippedCount > 0) console.log(color.dim(`Would skip:  ${skippedCount} (already exists)`));
    if (collisionsCount > 0) console.log(color.dim(`Would resolve collision: ${collisionsCount}`));
  } else {
    console.log(color.bold(`Imported: ${importedCount}`));
    if (skippedCount > 0) console.log(color.dim(`Skipped:  ${skippedCount} (already exists)`));
    if (collisionsCount > 0) console.log(color.dim(`Resolved collision: ${collisionsCount}`));
  }
  console.log("");
}

export function runImport(store: ConfigStore, args: string[]): void {
  const mode: ExecutionMode = args.includes("--dry-run") ? "dry-run" : "real";
  const pathArgs = args.filter((arg) => arg !== "--dry-run");

  if (pathArgs.length === 0) {
    console.error("Missing <directory> argument for 'import' command.");
    console.log("Usage: thyra import <directory> [--dry-run]");
    process.exit(1);
  }

  const baseArg = pathArgs[0];
  const basePath = resolveFolderPath(baseArg);

  if (!fs.existsSync(basePath)) {
    console.error(`Directory not found: ${basePath}`);
    process.exit(1);
  }

  const stat = fs.statSync(basePath);
  if (!stat.isDirectory()) {
    console.error(`Path is not a directory: ${basePath}`);
    process.exit(1);
  }

  console.log(`Scanning ${basePath}...\n`);

  const entries = fs.readdirSync(basePath, { withFileTypes: true });
  const imported: { name: string; alias: string }[] = [];
  const skipped: { name: string; reason: string }[] = [];
  let collisionsResolved = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const folderName = entry.name;
    const projectPath = path.join(basePath, folderName);

    // 1. Idempotency check (CRITICAL FIX)
    if (store.existsByPath(projectPath)) {
      skipped.push({ name: folderName, reason: "already exists" });
      continue; // Skip project completely before collision/slug logic
    }

    const baseSlug = generateSlug(folderName);
    if (!baseSlug) continue;

    let alias = baseSlug;
    let counter = 2;
    let collision = false;

    // 2. Predict Collisions (simulated or real)
    while (store.has(alias) || imported.some((i) => i.alias === alias)) {
      alias = `${baseSlug}-${counter}`;
      counter++;
      collision = true;
    }

    if (collision) collisionsResolved++;

    // 3. Stable Project Identity
    const stableId = crypto.createHash("sha256").update(projectPath).digest("hex");

    // 4. Persistence Layer Separation
    if (mode === "real") {
      store.set(alias, {
        id: stableId,
        name: folderName,
        alias,
        path: projectPath,
        createdAt: new Date().toISOString(),
      });
    }

    imported.push({ name: folderName, alias });
  }

  // 5. Standardized Output
  formatImportResult(mode, imported.length, skipped.length, collisionsResolved);

  if (imported.length > 0) {
    const maxNameLength = Math.max(...imported.map((i) => i.name.length));
    for (const project of imported) {
      const paddedName = project.name.padEnd(maxNameLength, " ");
      console.log(`${paddedName} → ${color.cyan(project.alias)}`);
    }
  }
}
