function isAbsoluteOrSpecial(ref: string): boolean {
  const t = ref.trim();
  if (!t) return true;
  if (t.startsWith("#")) return true;
  if (t.startsWith("mailto:") || t.startsWith("tel:") || t.startsWith("data:")) return true;
  if (/^[a-z][a-z0-9+.-]*:/i.test(t)) return true;
  return t.startsWith("//");
}

/**
 * Resolve relative `href` / `src` in markdown output against the markdown file URL.
 */
export function resolveRelativeAssets(root: HTMLElement, baseUrl: string, locationHref?: string): void {
  let base: URL;
  try {
    base = new URL(baseUrl, locationHref ?? "http://localhost/");
  } catch {
    return;
  }

  for (const el of root.querySelectorAll("a[href]")) {
    const a = el as HTMLAnchorElement;
    const href = a.getAttribute("href");
    if (!href || isAbsoluteOrSpecial(href)) continue;
    try {
      a.setAttribute("href", new URL(href, base).href);
    } catch {
      /* ignore invalid */
    }
  }

  for (const el of root.querySelectorAll("img[src]")) {
    const img = el as HTMLImageElement;
    const src = img.getAttribute("src");
    if (!src || isAbsoluteOrSpecial(src)) continue;
    try {
      img.setAttribute("src", new URL(src, base).href);
    } catch {
      /* ignore invalid */
    }
  }
}
