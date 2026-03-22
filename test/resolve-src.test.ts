import { describe, expect, it } from "vitest";
import { getFetchBaseUrl, resolveMarkdownFetchUrl } from "../src/resolve-src.js";

describe("resolveMarkdownFetchUrl", () => {
  it("resolves ./file against /demo (no trailing slash) as /demo/file", () => {
    expect(resolveMarkdownFetchUrl("./sample.md", "http://127.0.0.1:4173/demo")).toBe(
      "http://127.0.0.1:4173/demo/sample.md",
    );
  });

  it("resolves relative to directory of HTML file", () => {
    expect(resolveMarkdownFetchUrl("a.md", "http://x.com/docs/page.html")).toBe("http://x.com/docs/a.md");
  });

  it("resolves root-relative src", () => {
    expect(resolveMarkdownFetchUrl("/demo/sample.md", "http://x.com/other")).toBe("http://x.com/demo/sample.md");
  });
});

describe("getFetchBaseUrl", () => {
  it("treats last segment without dot as directory", () => {
    expect(getFetchBaseUrl("http://h/demo")).toBe("http://h/demo/");
  });
});
