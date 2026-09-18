import path from "path";
import fs from "fs";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Consistent paths with leading slashes
const monorepoAssets: Record<string, { source: string; contentType: string }> =
  {
    "/thyra.ico": {
      source: path.resolve(__dirname, "../../assets/images/thyra.ico"),
      contentType: "image/x-icon",
    },
    "/thyra.png": {
      source: path.resolve(__dirname, "../../assets/images/thyra.png"),
      contentType: "image/png",
    },
    "/thyra-banner.png": {
      source: path.resolve(__dirname, "../../assets/images/thyra-banner.png"),
      contentType: "image/png",
    },
  };

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),

    {
      name: "monorepo-assets",
      generateBundle() {
        for (const [publicPath, { source }] of Object.entries(monorepoAssets)) {
          if (!fs.existsSync(source)) {
            throw new Error(`Asset not found: ${source}`);
          }

          // Safely remove leading slash for the output bundle file name
          this.emitFile({
            type: "asset",
            fileName: publicPath.replace(/^\//, ""),
            source: fs.readFileSync(source),
          });
        }
      },

      // Serve the assets in dev mode
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split("?")[0];

          if (url && monorepoAssets[url]) {
            const { source, contentType } = monorepoAssets[url];

            if (!fs.existsSync(source)) {
              res.statusCode = 404;
              res.end(`Asset not found: ${source}`);
              return;
            }

            res.setHeader("Content-Type", contentType);
            res.end(fs.readFileSync(source));
            return;
          }

          next();
        });
      },
    },
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      package: path.resolve(__dirname, "./package.json"),
    },
  },
});
