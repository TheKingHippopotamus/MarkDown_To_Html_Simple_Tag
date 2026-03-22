/**
 * Base URL for resolving relative `src` on <md-spawn>.
 *
 * Static servers often redirect `/folder/index.html` → `/folder`, so `location.pathname`
 * may be `/folder` with no trailing slash. The URL API would then resolve `./a.md` against
 * `/folder` as `/a.md`. We treat the last segment as a directory unless it looks like a file.
 */
export function getFetchBaseUrl(locationHref: string): string {
  const u = new URL(locationHref);
  const parts = u.pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  if (last && last.includes(".")) {
    parts.pop();
  }
  u.pathname = parts.length === 0 ? "/" : `/${parts.join("/")}/`;
  u.hash = "";
  u.search = "";
  return u.href;
}

export function resolveMarkdownFetchUrl(src: string, locationHref: string): string {
  const trimmed = src.trim();
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) || trimmed.startsWith("//")) {
    return new URL(trimmed, locationHref).href;
  }
  if (trimmed.startsWith("/")) {
    const { origin } = new URL(locationHref);
    return new URL(trimmed, origin).href;
  }
  const base = getFetchBaseUrl(locationHref);
  return new URL(trimmed, base).href;
}
