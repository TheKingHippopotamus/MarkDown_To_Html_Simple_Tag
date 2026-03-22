import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearFetchCache, fetchTextCached } from "../src/cache.js";

describe("fetchTextCached", () => {
  beforeEach(() => {
    clearFetchCache();
  });

  afterEach(() => {
    clearFetchCache();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("dedupes concurrent requests for the same URL", async () => {
    let calls = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        calls += 1;
        return Promise.resolve({
          ok: true,
          status: 200,
          statusText: "OK",
          text: () => Promise.resolve("body"),
        });
      }),
    );

    const p1 = fetchTextCached("https://example.com/doc.md");
    const p2 = fetchTextCached("https://example.com/doc.md");
    const [a, b] = await Promise.all([p1, p2]);
    expect(a).toBe("body");
    expect(b).toBe("body");
    expect(calls).toBe(1);
  });

  it("reuses cached text on subsequent calls", async () => {
    let calls = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        calls += 1;
        return Promise.resolve({
          ok: true,
          status: 200,
          statusText: "OK",
          text: () => Promise.resolve("cached"),
        });
      }),
    );

    await fetchTextCached("https://example.com/once.md");
    await fetchTextCached("https://example.com/once.md");
    expect(calls).toBe(1);
  });
});
