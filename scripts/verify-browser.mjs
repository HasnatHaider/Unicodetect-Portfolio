import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

const origin = "https://unicodetech-react.vercel.app";
const config = JSON.parse(await readFile("vercel.json", "utf8"));
const browser = await chromium.launch({
  ...(process.env.CHROME_EXECUTABLE
    ? { executablePath: process.env.CHROME_EXECUTABLE }
    : {}),
  headless: true,
});
const context = await browser.newContext({ reducedMotion: "reduce" });
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
// Exercise the built release under its production origin without a dev server.
await context.route("**/*", async (route) => {
  const request = route.request();
  const url = new URL(request.url());
  if (url.origin !== origin) return route.abort();
  if (url.pathname === "/api/contact") {
    return route.fulfill({
      contentType: "application/json",
      body:
        request.method() === "GET"
          ? JSON.stringify({ token: "mocked-browser-token" })
          : JSON.stringify({ success: false }),
      status: request.method() === "GET" ? 200 : 503,
    });
  }
  const alias = config.redirects.find((item) => item.source === url.pathname);
  if (alias)
    return route.fulfill({
      status: 301,
      headers: { location: origin + alias.destination },
    });
  let filename = url.pathname === "/" ? "/index.html" : url.pathname;
  if (!path.extname(filename)) filename += ".html";
  let body;
  let status = 200;
  try {
    body = await readFile(path.join(process.cwd(), "dist", filename));
  } catch {
    body = await readFile("dist/404.html");
    filename = "/404.html";
    status = 404;
  }
  const headers = Object.fromEntries(
    config.headers[0].headers.map(({ key, value }) => [key, value]),
  );
  await route.fulfill({
    status,
    headers,
    contentType: mime[path.extname(filename)] ?? "application/octet-stream",
    body,
  });
});
const sitemap = await readFile("public/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const results = [];
try {
  for (const width of [375, 1440]) {
    const page = await context.newPage();
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        /hydrat|Minified React error/.test(message.text())
      )
        errors.push(message.text());
    });
    for (const url of urls) {
      errors.length = 0;
      const response = await page.goto(url, { waitUntil: "networkidle" });
      await page.locator("main h1").first().waitFor();
      assert.equal(response.status(), 200, url);
      assert.equal(await page.locator("h1").count(), 1, `${url} H1 count`);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      assert.equal(overflow, false, `${url} overflow ${width}`);
      assert.deepEqual(errors, [], `${url} exceptions`);
      const missing = await page
        .locator("img")
        .evaluateAll((images) =>
          images
            .filter((i) => i.complete && i.naturalWidth === 0)
            .map((i) => i.src),
        );
      assert.deepEqual(missing, [], `${url} broken images`);
      results.push({ url, width, status: "pass" });
    }
    await page.goto(`${origin}/custom-software-development`, {
      waitUntil: "networkidle",
    });
    assert.equal(
      await page.locator('script[data-seo="page-schema"]').count(),
      1,
    );
    await page
      .locator('header a[href="/contact"]')
      .evaluate((element) => element.click());
    await page.waitForURL("**/contact");
    await page.waitForFunction(
      () => !document.querySelector('script[data-seo="page-schema"]'),
    );
    await page.locator('header a[href="/"]').first().click();
    await page.waitForURL(origin + "/");
    await page.waitForFunction(
      () => !document.querySelector('script[data-seo="breadcrumb"]'),
    );
    await page.goto(`${origin}/audit-invalid-route`, {
      waitUntil: "networkidle",
    });
    assert.equal(await page.locator('link[rel="canonical"]').count(), 0);
    assert.equal(
      await page.locator('meta[name="robots"]').getAttribute("content"),
      "noindex, nofollow",
    );
    await page.goto(`${origin}/contact`, { waitUntil: "networkidle" });
    await page.getByLabel("Full name").fill("Browser test");
    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByLabel("Phone number").fill("123456789");
    await page.getByLabel("Company name").fill("Test company");
    await page
      .getByLabel("Project details", { exact: false })
      .fill("Mocked inquiry: no email will be sent.");
    await page.getByRole("button", { name: "Send Message" }).click();
    await page
      .getByText("We couldn’t send your message.", { exact: true })
      .waitFor();
    assert.equal(
      await page.getByLabel("Full name").inputValue(),
      "Browser test",
    );
    console.log(`Passed viewport ${width}px`);
    await page.close();
  }
  await writeFile(
    "/tmp/unicodetech-browser-results.json",
    JSON.stringify(results, null, 2),
  );
  console.log(
    `PASS: ${results.length} route/viewport checks, metadata cleanup, 404 and mocked contact failures.`,
  );
} finally {
  await browser.close();
}
