# MD-Spawn

Browser-native **Markdown** as a **custom element**: drop in `<md-spawn>`, load one module script, and render remote or inline Markdown with sanitization, syntax highlighting, and a default theme—no build step required.

## Quick start

```html
<md-spawn src="./README.md"></md-spawn>
<script type="module" src="./dist/index.js"></script>
```

Use the path to `dist/index.js` from your project or CDN. The script **registers** `<md-spawn>` automatically.

Inline Markdown (no `src`):

```html
<md-spawn>
# Hello

**Markdown** here.
</md-spawn>
<script type="module" src="./dist/index.js"></script>
```

## Behavior

| Feature | Details |
|--------|---------|
| **`src`** | Fetches Markdown and renders it. Relative URLs are resolved so paths like `./doc.md` work even when the page URL is rewritten (e.g. `/demo` instead of `/demo/index.html`). |
| **Inline** | If there is no `src`, text inside the element is treated as Markdown. |
| **Fetch failure** | If `src` fails and the tag has inline content, the inline Markdown is used instead. |
| **`loading="lazy"`** | Defers the first render until the element is near the viewport. |
| **`shadow`** | Renders inside an **open** shadow root (isolation). Mode is fixed on first render. |
| **`unsafe`** | Skips HTML sanitization (XSS risk). Default is **sanitized** with DOMPurify. |

## API (V1)

```html
<md-spawn
  src="./README.md"
  loading="lazy"
  shadow
  unsafe
></md-spawn>
```

## npm

```bash
npm install md-spawn
```

```js
import "md-spawn"; // registers <md-spawn>
```

Or:

```js
import { defineMdSpawn, MdSpawn, renderMarkdown } from "md-spawn";
defineMdSpawn();
```

## Development

```bash
npm install
npm run build    # outputs dist/
npm test         # Vitest
npm run test:e2e # Playwright (builds then serves the repo root)
```

See [demo/README.md](demo/README.md) for running the demo locally.

## Publishing to npm

The name **`md-spawn`** is available on the public registry (verify with `npm view md-spawn` before you publish).

**Option A — interactive login**

```bash
npm login
npm publish
```

`prepublishOnly` runs `npm run build` automatically.

**Option B — token in `.env`**

1. Create an access token under your npm account (**Access Tokens**), e.g. granular token with **Publish** for this package.
2. Put it in `.env` as `NPM_TOKEN=npm_...` (see [`.env.example`](.env.example)). **Do not commit `.env`** — it is gitignored.
3. Copy [`.npmrc.template`](.npmrc.template) to `.npmrc`, load the token, publish:

   ```bash
   cp .npmrc.template .npmrc
   set -a && source .env && set +a   # bash/zsh: exports vars from .env
   npm publish
   ```

   Keep `.npmrc` only if it uses `${NPM_TOKEN}` — never commit a literal token.

## Security

Default mode strips dangerous HTML/scripts. The **`unsafe`** attribute disables sanitization—only use with trusted Markdown.

## License

MIT
