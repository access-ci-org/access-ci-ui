import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  build:
    mode === "staging"
      ? null
      : mode === "react"
        ? {
            lib: {
              entry: ["src/shadow.jsx"],
              name: "AccessCiUi",
              fileName: "access-ci-ui-react",
            },
            emptyOutDir: false,
            rollupOptions: {
              external: [
                "react",
                "react-dom",
                "react-dom/server",
                "react/jsx-runtime",
              ],
              output: {
                globals: {
                  react: "React",
                  "react-dom": "ReactDOM",
                  "react-dom/server": "ReactDOMServer",
                  "react/jsx-runtime": "jsxRuntime",
                },
              },
            },
          }
        : {
            lib: {
              entry: ["src/index.jsx"],
              name: "AccessCiUi",
              fileName: "access-ci-ui",
            },
          },
  base: "/access-ci-ui",
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
    "process.env.REACT_APP_NETLIFY_BASE_URL": JSON.stringify(
      "https://access-ai.ccs.uky.edu/api/query",
    ),
  },
  plugins: [react()],
}));
