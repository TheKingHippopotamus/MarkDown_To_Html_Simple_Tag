# MD-Spawn demo

1. Build the library: `npm run build` (Playwright e2e runs this automatically).
2. From the **repository root**, serve the project (not only this folder), for example:

   ```bash
   npx serve . -l 4173
   ```

3. Open `http://127.0.0.1:4173/demo/index.html`.

The page loads `/dist/index.js`, which registers `<md-spawn>` automatically.
