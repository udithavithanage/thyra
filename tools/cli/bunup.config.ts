import { defineConfig } from "bunup";

import {
  version,
  dependencies,
  peerDependencies,
} from "package" with { type: "json" };

export default defineConfig({
  entry: ["src/index.ts"],
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
  minify: true,
  banner: "#!/usr/bin/env node\n",
  footer: "// Smart navigation for developers who value time.",
  env: {
    NODE_ENV: "production",
    VERSION: version,
  },
});
