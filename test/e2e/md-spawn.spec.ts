import { expect, test } from "@playwright/test";

test.describe("MD-Spawn", () => {
  test("renders inline markdown", async ({ page }) => {
    await page.goto("/demo/index.html");
    await expect(page.locator("md-spawn").first().locator(".md-spawn-body h1")).toContainText("Hello from inline");
  });

  test("loads markdown from src", async ({ page }) => {
    await page.goto("/demo/index.html");
    await expect(page.locator("md-spawn").nth(1).locator(".md-spawn-body")).toContainText("loadedFromFile");
  });

  test("uses inline fallback when src fails", async ({ page }) => {
    await page.goto("/demo/fallback.html");
    await expect(page.locator("md-spawn .md-spawn-body h1")).toContainText("Fallback heading");
  });

  test("lazy loading defers first paint until scroll", async ({ page }) => {
    await page.goto("/demo/index.html");
    const lazy = page.locator("md-spawn[loading='lazy']");
    await expect(lazy.locator(".md-spawn-body")).toHaveCount(0);
    await lazy.scrollIntoViewIfNeeded();
    await expect(lazy.locator(".md-spawn-body h1")).toContainText("Lazy inline", { timeout: 10_000 });
  });

  test("shadow mode uses shadow root", async ({ page }) => {
    await page.goto("/demo/index.html");
    const host = page.locator("md-spawn[shadow]");
    const hasShadow = await host.evaluate((el: HTMLElement) => !!el.shadowRoot);
    expect(hasShadow).toBe(true);
    const title = await host.evaluate(
      (el: HTMLElement) => el.shadowRoot?.querySelector(".md-spawn-body h1")?.textContent?.trim() ?? "",
    );
    expect(title).toBe("Inside shadow root");
  });
});
