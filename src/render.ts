import createDOMPurify from "dompurify";
import type { WindowLike } from "dompurify";
import hljs from "highlight.js";
import { marked } from "marked";
import { resolveRelativeAssets } from "./resolve-assets.js";

marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    code({ text, lang }) {
      const trimmedLang = lang?.trim();
      try {
        if (trimmedLang && hljs.getLanguage(trimmedLang)) {
          const { value } = hljs.highlight(text, { language: trimmedLang });
          return `<pre><code class="hljs language-${trimmedLang}">${value}</code></pre>\n`;
        }
      } catch {
        /* fall through to auto */
      }
      const auto = hljs.highlightAuto(text);
      const name = auto.language ?? "plaintext";
      return `<pre><code class="hljs language-${name}">${auto.value}</code></pre>\n`;
    },
  },
});

export interface RenderMarkdownOptions {
  /** When true, skip DOMPurify (XSS risk). */
  unsafe?: boolean;
  /** Base URL of the markdown file (for resolving relative images/links). */
  baseUrl?: string | null;
  /** Browser or JSDOM `window` — required for sanitization and/or asset resolution. */
  window?: Window;
}

function getWindow(options: RenderMarkdownOptions): Window | undefined {
  if (options.window) return options.window;
  if (typeof globalThis !== "undefined" && "document" in globalThis) {
    return globalThis as unknown as Window;
  }
  return undefined;
}

/**
 * Parse markdown to HTML, optionally sanitize, resolve relative assets.
 */
export function renderMarkdown(markdown: string, options: RenderMarkdownOptions = {}): string {
  const rawHtml = marked.parse(markdown, { async: false }) as string;

  let html = rawHtml;
  if (!options.unsafe) {
    const win = getWindow(options);
    if (!win?.document) {
      throw new Error(
        "MD-Spawn: secure rendering needs a `window` with document (pass JSDOM in Node tests).",
      );
    }
    const purify = createDOMPurify(win as unknown as WindowLike);
    html = purify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
    });
  }

  const baseUrl = options.baseUrl;
  if (!baseUrl) {
    return html;
  }

  const win = getWindow(options);
  if (!win?.document) {
    throw new Error("MD-Spawn: resolving relative assets requires a `window` with document.");
  }

  const container = win.document.createElement("div");
  container.innerHTML = html;
  resolveRelativeAssets(container, baseUrl, win.location?.href);
  return container.innerHTML;
}
