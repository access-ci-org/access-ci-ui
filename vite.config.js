import { resolve } from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build:
    mode !== "staging"
      ? {
          lib: {
            entry: resolve(__dirname, "src/index.jsx"),
            name: "AccessCiUi",
            fileName: "access-ci-ui",
          },
        }
      : null,
  base: "/access-ci-ui",
  plugins: [preact()]
}));
