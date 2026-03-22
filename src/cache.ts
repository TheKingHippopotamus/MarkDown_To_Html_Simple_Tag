const textCache = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

/**
 * Fetch text with global deduplication and response caching.
 */
export function fetchTextCached(url: string): Promise<string> {
  const hit = textCache.get(url);
  if (hit !== undefined) {
    return Promise.resolve(hit);
  }
  const pending = inflight.get(url);
  if (pending) {
    return pending;
  }

  const p = fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load ${url}: HTTP ${res.status} ${res.statusText}`.trim());
      }
      return res.text();
    })
    .then((text) => {
      textCache.set(url, text);
      inflight.delete(url);
      return text;
    })
    .catch((err) => {
      inflight.delete(url);
      throw err;
    });

  inflight.set(url, p);
  return p;
}

/** Clear cached responses (e.g. for tests). */
export function clearFetchCache(): void {
  textCache.clear();
  inflight.clear();
}
