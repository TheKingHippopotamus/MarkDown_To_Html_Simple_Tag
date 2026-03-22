import { fetchTextCached } from "./cache.js";
import { renderMarkdown } from "./render.js";
import { getFetchBaseUrl, resolveMarkdownFetchUrl } from "./resolve-src.js";
import { MD_SPAWN_THEME_CSS } from "./theme.js";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export class MdSpawn extends HTMLElement {
  static observedAttributes = ["src", "loading", "shadow", "unsafe"];

  private _inlineMarkdown = "";
  private _inlineCaptured = false;
  private _abort?: AbortController;
  private _io?: IntersectionObserver;
  /** Waiting for intersection before first render (loading=lazy). */
  private _lazyInitialPending = false;
  /** Shadow vs light is fixed on first render shell setup. */
  private _shadowLocked: boolean | null = null;
  private _shellReady = false;
  private _renderGeneration = 0;

  connectedCallback(): void {
    this.captureInline();

    if (this.getAttribute("loading") === "lazy") {
      this.replaceChildren();
      this._lazyInitialPending = true;
      this._io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this._io?.disconnect();
            this._io = undefined;
            this._lazyInitialPending = false;
            void this.runRender();
          }
        },
        { rootMargin: "100px" },
      );
      this._io.observe(this);
    } else {
      void this.runRender();
    }
  }

  disconnectedCallback(): void {
    this._abort?.abort();
    this._io?.disconnect();
    this._io = undefined;
  }

  attributeChangedCallback(name: string, _old: string | null, _val: string | null): void {
    if (!this.isConnected) return;
    if (name === "shadow" || name === "loading") {
      return;
    }
    if (this._lazyInitialPending) {
      return;
    }
    void this.runRender();
  }

  private captureInline(): void {
    if (this._inlineCaptured) return;
    this._inlineMarkdown = this.textContent?.trim() ?? "";
    this._inlineCaptured = true;
  }

  private ensureBody(): HTMLElement {
    if (this._shadowLocked === null) {
      this._shadowLocked = this.hasAttribute("shadow");
    }

    if (this._shadowLocked) {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: "open" });
      }
      if (!this._shellReady) {
        this.replaceChildren();
        this._shellReady = true;
      }
      return this.insertShell(this.shadowRoot!);
    }

    if (!this._shellReady) {
      this.replaceChildren();
      this._shellReady = true;
    }
    return this.insertShell(this);
  }

  private insertShell(container: HTMLElement | ShadowRoot): HTMLElement {
    let styleEl = container.querySelector("style[data-md-spawn-theme]") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.setAttribute("data-md-spawn-theme", "");
      styleEl.textContent = MD_SPAWN_THEME_CSS;
      container.appendChild(styleEl);
    }
    let body = container.querySelector(".md-spawn__root.md-spawn-body") as HTMLElement | null;
    if (!body) {
      body = document.createElement("div");
      body.className = "md-spawn__root md-spawn-body";
      container.appendChild(body);
    }
    return body;
  }

  private showError(body: HTMLElement, message: string): void {
    body.innerHTML = `<div class="md-spawn__error" role="alert"><strong>MD-Spawn</strong> — ${escapeHtml(
      message,
    )}</div>`;
  }

  private async runRender(): Promise<void> {
    this._abort?.abort();
    this._abort = new AbortController();
    const signal = this._abort.signal;
    const generation = ++this._renderGeneration;

    const src = this.getAttribute("src");
    const unsafe = this.hasAttribute("unsafe");
    let md = "";
    let baseUrl: string | null = null;

    if (src) {
      let resolvedSrc: string;
      try {
        resolvedSrc = resolveMarkdownFetchUrl(src, document.location.href);
      } catch (e) {
        const body = this.ensureBody();
        const msg = e instanceof Error ? e.message : String(e);
        this.showError(body, `Invalid src URL: ${msg}`);
        return;
      }

      try {
        md = await fetchTextCached(resolvedSrc);
        baseUrl = resolvedSrc;
      } catch (e) {
        if (signal.aborted || generation !== this._renderGeneration) return;
        const msg = e instanceof Error ? e.message : String(e);
        if (this._inlineMarkdown) {
          md = this._inlineMarkdown;
          baseUrl = getFetchBaseUrl(document.location.href);
        } else {
          const body = this.ensureBody();
          this.showError(body, `Could not load markdown from "${src}": ${msg}`);
          return;
        }
      }
    } else {
      md = this._inlineMarkdown;
      baseUrl = getFetchBaseUrl(document.location.href);
    }

    if (signal.aborted || generation !== this._renderGeneration) return;

    if (!md) {
      const body = this.ensureBody();
      if (src) {
        this.showError(
          body,
          "No markdown to display: the file was empty and there is no inline fallback inside the tag.",
        );
      } else {
        this.showError(
          body,
          'No markdown to display: add a src="..." URL or put Markdown text inside &lt;md-spawn&gt;.',
        );
      }
      return;
    }

    try {
      const html = renderMarkdown(md, {
        unsafe,
        baseUrl,
        window,
      });
      if (signal.aborted || generation !== this._renderGeneration) return;
      const body = this.ensureBody();
      body.innerHTML = html;
    } catch (e) {
      if (signal.aborted || generation !== this._renderGeneration) return;
      const body = this.ensureBody();
      const msg = e instanceof Error ? e.message : String(e);
      this.showError(body, `Could not render markdown: ${msg}`);
    }
  }
}

/** Register the custom element (default tag name: md-spawn). */
export function defineMdSpawn(tagName = "md-spawn"): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, MdSpawn);
  }
}
