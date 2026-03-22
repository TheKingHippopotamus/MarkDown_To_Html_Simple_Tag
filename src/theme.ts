/**
 * Scoped default theme (GitHub-flavored markdown + highlight.js–friendly code blocks).
 * Applied under `.md-spawn-body` inside `.md-spawn__root`.
 */
export const MD_SPAWN_THEME_CSS = `
.md-spawn__root.md-spawn-body {
  color: #1f2328;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  word-wrap: break-word;
  box-sizing: border-box;
}
.md-spawn__root.md-spawn-body * { box-sizing: border-box; }
.md-spawn__root.md-spawn-body > :first-child { margin-top: 0 !important; }
.md-spawn__root.md-spawn-body > :last-child { margin-bottom: 0 !important; }

.md-spawn__root.md-spawn-body h1,
.md-spawn__root.md-spawn-body h2,
.md-spawn__root.md-spawn-body h3,
.md-spawn__root.md-spawn-body h4,
.md-spawn__root.md-spawn-body h5,
.md-spawn__root.md-spawn-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  border-bottom: 1px solid #d1d9e0;
  padding-bottom: 0.3em;
}
.md-spawn__root.md-spawn-body h1 { font-size: 2em; }
.md-spawn__root.md-spawn-body h2 { font-size: 1.5em; }
.md-spawn__root.md-spawn-body h3 { font-size: 1.25em; border-bottom: none; }
.md-spawn__root.md-spawn-body h4 { font-size: 1em; border-bottom: none; }
.md-spawn__root.md-spawn-body h5 { font-size: 0.875em; border-bottom: none; }
.md-spawn__root.md-spawn-body h6 { font-size: 0.85em; border-bottom: none; color: #59636e; }

.md-spawn__root.md-spawn-body p { margin-top: 0; margin-bottom: 16px; }
.md-spawn__root.md-spawn-body blockquote {
  margin: 0 0 16px 0;
  padding: 0 1em;
  color: #59636e;
  border-left: 0.25em solid #d1d9e0;
}
.md-spawn__root.md-spawn-body ul,
.md-spawn__root.md-spawn-body ol { margin-top: 0; margin-bottom: 16px; padding-left: 2em; }
.md-spawn__root.md-spawn-body li { margin: 0.25em 0; }
.md-spawn__root.md-spawn-body li > p { margin-bottom: 0.5em; }

.md-spawn__root.md-spawn-body code {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 85%;
  padding: 0.2em 0.4em;
  margin: 0;
  background-color: #818b981f;
  border-radius: 6px;
}
.md-spawn__root.md-spawn-body pre {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 85%;
  line-height: 1.45;
  padding: 16px;
  overflow: auto;
  background-color: #f6f8fa;
  border-radius: 6px;
  margin-bottom: 16px;
}
.md-spawn__root.md-spawn-body pre code {
  display: block;
  padding: 0;
  margin: 0;
  background: transparent;
  border-radius: 0;
  white-space: pre;
}

.md-spawn__root.md-spawn-body table {
  display: block;
  width: max-content;
  max-width: 100%;
  overflow: auto;
  border-spacing: 0;
  border-collapse: collapse;
  margin-bottom: 16px;
}
.md-spawn__root.md-spawn-body table th,
.md-spawn__root.md-spawn-body table td {
  padding: 6px 13px;
  border: 1px solid #d1d9e0;
}
.md-spawn__root.md-spawn-body table tr:nth-child(2n) { background-color: #f6f8fa; }

.md-spawn__root.md-spawn-body img {
  max-width: 100%;
  height: auto;
  box-sizing: content-box;
  background-color: #fff;
}
.md-spawn__root.md-spawn-body a {
  color: #0969da;
  text-decoration: none;
}
.md-spawn__root.md-spawn-body a:hover { text-decoration: underline; }

.md-spawn__root.md-spawn-body hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #d1d9e0;
  border: 0;
}

/* highlight.js (github-like) */
.md-spawn__root.md-spawn-body .hljs { color: #24292e; background: #f6f8fa; }
.md-spawn__root.md-spawn-body .hljs-doctag,
.md-spawn__root.md-spawn-body .hljs-keyword,
.md-spawn__root.md-spawn-body .hljs-meta .hljs-keyword,
.md-spawn__root.md-spawn-body .hljs-template-tag,
.md-spawn__root.md-spawn-body .hljs-template-variable,
.md-spawn__root.md-spawn-body .hljs-type,
.md-spawn__root.md-spawn-body .hljs-variable.language_ { color: #d73a49; }
.md-spawn__root.md-spawn-body .hljs-title,
.md-spawn__root.md-spawn-body .hljs-name,
.md-spawn__root.md-spawn-body .hljs-selector-id,
.md-spawn__root.md-spawn-body .hljs-selector-class,
.md-spawn__root.md-spawn-body .hljs-section,
.md-spawn__root.md-spawn-body .hljs-attribute { color: #6f42c1; }
.md-spawn__root.md-spawn-body .hljs-string,
.md-spawn__root.md-spawn-body .hljs-meta .hljs-string,
.md-spawn__root.md-spawn-body .hljs-attr { color: #032f62; }
.md-spawn__root.md-spawn-body .hljs-symbol,
.md-spawn__root.md-spawn-body .hljs-bullet,
.md-spawn__root.md-spawn-body .hljs-subst,
.md-spawn__root.md-spawn-body .hljs-meta,
.md-spawn__root.md-spawn-body .hljs-link,
.md-spawn__root.md-spawn-body .hljs-selector-attr,
.md-spawn__root.md-spawn-body .hljs-selector-pseudo { color: #e36209; }
.md-spawn__root.md-spawn-body .hljs-comment,
.md-spawn__root.md-spawn-body .hljs-quote { color: #6a737d; font-style: italic; }
.md-spawn__root.md-spawn-body .hljs-literal,
.md-spawn__root.md-spawn-body .hljs-number { color: #005cc5; }
.md-spawn__root.md-spawn-body .hljs-emphasis { font-style: italic; }
.md-spawn__root.md-spawn-body .hljs-strong { font-weight: 600; }

.md-spawn__error {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #9a6700;
  background: #fff8c5;
  border: 1px solid #d4a72c;
  border-radius: 6px;
  padding: 12px 14px;
  margin: 0;
}
.md-spawn__error strong { color: #7c4a00; }
`;
