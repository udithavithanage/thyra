import { defineConfig } from "bunup";

import { version } from "package" with { type: "json" };

export default defineConfig({
  entry: ["src/index.ts"],
  minify: true,
  banner: "#!/usr/bin/env node",
  footer: "// Smart navigation for developers who value time.",
  env: {
    NODE_ENV: "production",
    VERSION: version,
  },
});
