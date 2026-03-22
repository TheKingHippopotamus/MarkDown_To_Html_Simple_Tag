import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { renderMarkdown } from "../src/render.js";

function makeWindow(url = "https://example.com/app/page.html") {
  return new JSDOM("<!DOCTYPE html><html><body></body></html>", { url }).window;
}

describe("renderMarkdown", () => {
  it("sanitizes script tags by default", () => {
    const window = makeWindow();
    const html = renderMarkdown("Hello<script>alert(1)</script>", { window });
    expect(html.toLowerCase()).not.toContain("<script");
  });

  it("renders headings and resolves relative images with baseUrl", () => {
    const window = makeWindow();
    const html = renderMarkdown("# Title\n\n![](./a.png)", {
      window,
      baseUrl: "https://example.com/folder/readme.md",
    });
    expect(html).toContain("Title");
    expect(html).toContain("https://example.com/folder/a.png");
  });

  it("allows raw HTML when unsafe is true", () => {
    const window = makeWindow();
    const html = renderMarkdown('<p class="x">Hi</p>', { window, unsafe: true });
    expect(html).toContain('class="x"');
  });
});
