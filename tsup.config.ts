import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2022",
  platform: "browser",
  minify: false,
  /** Single file for simple `<script type="module" src=".../dist/index.js">` usage. */
  noExternal: ["marked", "dompurify", "highlight.js"],
});
