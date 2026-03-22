import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { resolveRelativeAssets } from "../src/resolve-assets.js";

describe("resolveRelativeAssets", () => {
  it("rewrites relative href and src against base markdown URL", () => {
    const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
      url: "https://example.com/app/page.html",
    });
    const { document } = dom.window;
    const root = document.createElement("div");
    root.innerHTML = '<a href="./other.md">link</a><img src="../static/pic.png" alt="x" />';
    resolveRelativeAssets(root, "https://example.com/docs/readme.md", "https://example.com/app/page.html");
    expect(root.querySelector("a")?.getAttribute("href")).toBe("https://example.com/docs/other.md");
    expect(root.querySelector("img")?.getAttribute("src")).toBe("https://example.com/static/pic.png");
  });

  it("leaves absolute URLs unchanged", () => {
    const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
    const { document } = dom.window;
    const root = document.createElement("div");
    root.innerHTML = '<a href="https://a.com/x">x</a><img src="data:image/png;base64,xx" alt="" />';
    resolveRelativeAssets(root, "https://example.com/doc.md");
    expect(root.querySelector("a")?.getAttribute("href")).toBe("https://a.com/x");
    expect(root.querySelector("img")?.getAttribute("src")).toBe("data:image/png;base64,xx");
  });
});
