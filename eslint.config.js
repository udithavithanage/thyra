import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "**/dist/**",
    "**/build/**",
    "**/node_modules/**",
    "**/.turbo/**",
    "**/public/**"
  ]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["packages/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ["apps/docs/**/*.{ts,tsx}"],
    extends: [
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser
      }
    }
  }
]);
