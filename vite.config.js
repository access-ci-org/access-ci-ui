import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
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
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
    "process.env.REACT_APP_NETLIFY_BASE_URL": JSON.stringify(
      "https://access-ai.ccs.uky.edu/api/query",
    ),
  },
  plugins: [react()],
}));
