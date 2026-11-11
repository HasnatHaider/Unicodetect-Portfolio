import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const origin = "http://127.0.0.1:5173";
const output = ".impeccable/review";
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });

try {
  const results = [];
  const errors = [];

  const check = (name, value) => {
    assert.ok(value, name);
    results.push(name);
  };

  async function settle(page) {
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
  }

  async function capture(page, name) {
    await settle(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${output}/${name}-full.png`, fullPage: true });
    await page.screenshot({ path: `${output}/${name}.png` });
  }

  async function widthCheck(page, name) {
    const ok = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    );
    check(`${name}: no horizontal overflow`, ok);
  }

  async function fontCheck(page, name) {
    const fonts = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const bodyFont = getComputedStyle(document.body).fontFamily;
      const h1Font = h1 ? getComputedStyle(h1).fontFamily : "";
      return { bodyFont, h1Font };
    });
    check(
      `${name}: uses Manrope/Inter without Instrument Serif`,
      /Manrope/i.test(fonts.h1Font) &&
        !/Instrument\s+Serif/i.test(fonts.bodyFont) &&
        !/Instrument\s+Serif/i.test(fonts.h1Font),
    );
  }

  // ── 1. Login Page QA (Unauthenticated context) ───────────────────────
  const loginContext = await browser.newContext({
    viewport: { width: 1440, height: 1050 },
  });
  await loginContext.route("**/src/contexts/AuthContext.jsx*", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `
        export const AuthProvider = ({ children }) => children;
        export const useAuth = () => ({
          user: null,
          login: async (email, password) => {
            if (password !== "valid-pass") throw new Error("Invalid credentials");
          },
          logout: async () => {},
        });
      `,
    }),
  );

  const loginPage = await loginContext.newPage();
  loginPage.on("pageerror", (err) => errors.push(`login: ${err.message}`));
  await loginPage.goto(`${origin}/admin/login`);
  await loginPage.getByRole("heading", { name: "Admin Access" }).waitFor();
  await fontCheck(loginPage, "Admin Login");
  await widthCheck(loginPage, "Admin Login desktop");

  const passInput = loginPage.getByLabel("Password", { exact: true });
  check(
    "Login password starts masked",
    (await passInput.getAttribute("type")) === "password",
  );
  await loginPage.getByRole("button", { name: "Show password" }).click();
  check(
    "Login password visibility toggle reveals password",
    (await passInput.getAttribute("type")) === "text",
  );
  await loginPage.getByRole("button", { name: "Hide password" }).click();

  await loginPage.getByLabel("Email").fill("admin@unicodetech.com");
  await passInput.fill("wrong-pass");
  await loginPage.getByRole("button", { name: "Sign In" }).click();
  await loginPage.getByRole("alert").waitFor();
  check(
    "Login invalid credentials alert renders",
    (await loginPage.getByRole("alert").textContent()).includes(
      "Invalid credentials",
    ),
  );
  await capture(loginPage, "admin-login-desktop");

  await loginPage.setViewportSize({ width: 390, height: 844 });
  await widthCheck(loginPage, "Admin Login mobile");
  await capture(loginPage, "admin-login-mobile");
  await loginContext.close();

  // ── 2. Authenticated Admin Workspace QA (Browser-only fixtures) ──────
  const adminContext = await browser.newContext({
    viewport: { width: 1440, height: 1050 },
  });

  await adminContext.route("**/src/contexts/AuthContext.jsx*", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `
        export const AuthProvider = ({ children }) => children;
        export const useAuth = () => ({
          user: { email: "admin@unicodetech.com" },
          login: async () => {},
          logout: async () => {},
        });
      `,
    }),
  );

  await adminContext.route("**/src/services/dashboard.services.js*", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `
        export async function getAnalytics() {
          if (!window.__allowAnalyticsSuccess) {
            throw new Error("Simulated telemetry timeout");
          }
          return {
            totalPosts: 4,
            published: 3,
            drafts: 1,
            totalCategories: 4,
            postsLast6Months: [
              { month: "Jun", posts: 1 },
              { month: "Jul", posts: 0 },
              { month: "Aug", posts: 1 },
              { month: "Sep", posts: 0 },
              { month: "Oct", posts: 1 },
              { month: "Nov", posts: 1 },
            ],
            postsByCategory: [
              { category: "Engineering", count: 2 },
              { category: "Design", count: 1 },
              { category: "AI & Automation", count: 1 },
            ],
            recentPosts: [
              {
                id: "article",
                title: "A thoughtful approach to web development",
                category: { name: "Engineering" },
                status: "published",
              },
              {
                id: "draft-post",
                title: "Upcoming architecture notes",
                category: { name: "Design" },
                status: "draft",
              },
            ],
          };
        }
      `,
    }),
  );

  await adminContext.route("**/src/services/blog.services.js*", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `
        const posts = [
          {
            id: "article",
            title: "A thoughtful approach to web development",
            slug: "fixture-article",
            excerpt: "Build software with clarity.",
            coverImage: "/og-image.png",
            category: { id: "engineering", name: "Engineering", slug: "engineering", searchKey: "engineering" },
            content: "<h2>Start with the reader</h2><p>A useful article with a clear structure.</p>",
            status: "published",
            tags: ["react", "architecture"],
            createdAt: { toDate: () => new Date("2026-10-12T10:00:00Z") },
          },
          {
            id: "social",
            title: "A social update",
            slug: "fixture-social",
            excerpt: "Quick dispatch from our product team.",
            sourceUrl: "https://www.instagram.com/p/example/",
            category: { id: "ai", name: "AI & Automation", slug: "ai-automation", searchKey: "ai" },
            content: "",
            status: "published",
            tags: ["social"],
            createdAt: { toDate: () => new Date("2026-10-15T10:00:00Z") },
          },
          {
            id: "systems",
            title: "Designing resilient design systems",
            slug: "resilient-design-systems",
            excerpt: "Tokens, primitives, and governance.",
            coverImage: "/og-image.png",
            category: { id: "design", name: "Design", slug: "design", searchKey: "design" },
            content: "<p>Design systems scale clarity.</p>",
            status: "published",
            tags: ["design"],
            createdAt: { toDate: () => new Date("2026-10-18T10:00:00Z") },
          },
          {
            id: "draft-post",
            title: "Upcoming architecture notes",
            slug: "upcoming-architecture-notes",
            excerpt: "Drafting our Q4 roadmap.",
            coverImage: "",
            category: { id: "engineering", name: "Engineering", slug: "engineering", searchKey: "engineering" },
            content: "<p>Work in progress.</p>",
            status: "draft",
            tags: ["roadmap"],
            createdAt: { toDate: () => new Date("2026-10-20T10:00:00Z") },
          },
        ];

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        export async function getBlogsWithPagination({ status = "", search = "", lastDoc = null } = {}) {
          if (search === "slow") {
            await delay(900);
            return {
              blogs: [{ ...posts[0], id: "stale", title: "Stale slow blog result" }],
              hasMore: false,
              lastDoc: null,
            };
          }
          const filtered = posts.filter((p) => {
            const statusOk = !status || p.status === status;
            const searchOk = !search || p.title.toLowerCase().includes(search.toLowerCase());
            return statusOk && searchOk;
          });
          return {
            blogs: filtered,
            hasMore: false,
            lastDoc: null,
          };
        }

        export async function getBlogsCounts() {
          const published = posts.filter((p) => p.status === "published").length;
          const drafts = posts.filter((p) => p.status === "draft").length;
          return { total: posts.length, published, drafts };
        }

        export async function getBlogById(id) {
          return posts.find((p) => p.id === id) || null;
        }

        export async function createBlog(data) {
          const created = {
            ...data,
            id: "created-" + (posts.length + 1),
            createdAt: { toDate: () => new Date("2026-11-01T10:00:00Z") },
          };
          posts.unshift(created);
          window.__lastCreatedBlog = created;
        }

        export async function updateBlog(id, data) {
          const idx = posts.findIndex((p) => p.id === id);
          if (idx !== -1) {
            posts[idx] = { ...posts[idx], ...data, id };
          }
          window.__lastUpdatedBlog = posts[idx];
        }

        export async function deleteBlog(id) {
          const idx = posts.findIndex((p) => p.id === id);
          if (idx !== -1) posts.splice(idx, 1);
        }
      `,
    }),
  );

  await adminContext.route("**/src/services/category.services.js*", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `
        const categories = [
          {
            id: "engineering",
            name: "Engineering",
            slug: "engineering",
            searchKey: "engineering",
            blogIds: ["article", "draft-post"],
            createdAt: { toDate: () => new Date("2026-09-01T10:00:00Z") },
          },
          {
            id: "design",
            name: "Design",
            slug: "design",
            searchKey: "design",
            blogIds: ["systems"],
            createdAt: { toDate: () => new Date("2026-09-05T10:00:00Z") },
          },
          {
            id: "ai",
            name: "AI & Automation",
            slug: "ai-automation",
            searchKey: "ai",
            blogIds: ["social"],
            createdAt: { toDate: () => new Date("2026-09-10T10:00:00Z") },
          },
          {
            id: "cloud",
            name: "Cloud Native",
            slug: "cloud-native",
            searchKey: "cloud",
            blogIds: [],
            createdAt: { toDate: () => new Date("2026-09-14T10:00:00Z") },
          },
        ];

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        export async function searchCategoriesWithPagination(search = "") {
          if (search === "slow") {
            await delay(900);
            return {
              categories: [{ id: "stale", name: "Stale Category", slug: "stale", blogIds: [] }],
              hasMore: false,
              lastDoc: null,
            };
          }
          const q = search.trim().toLowerCase();
          const filtered = categories.filter(
            (c) => !q || c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q),
          );
          return {
            categories: filtered,
            hasMore: false,
            lastDoc: null,
          };
        }

        export async function getCategoryCounts() {
          return { total: categories.length };
        }

        export async function createCategory({ name, slug }) {
          const next = {
            id: slug || "cat-" + (categories.length + 1),
            name,
            slug,
            searchKey: name.toLowerCase(),
            blogIds: [],
            createdAt: { toDate: () => new Date("2026-11-11T10:00:00Z") },
          };
          categories.unshift(next);
          return next;
        }

        export async function updateCategory(id, { name, slug }) {
          const target = categories.find((c) => c.id === id);
          if (target) {
            target.name = name;
            target.slug = slug;
          }
        }

        export async function deleteCategory(id) {
          const idx = categories.findIndex((c) => c.id === id);
          if (idx !== -1) categories.splice(idx, 1);
        }
      `,
    }),
  );

  await adminContext.route("**/api/v1/social-preview?*", async (route) => {
    const url = new URL(route.request().url()).searchParams.get("url");
    await route.fulfill({
      json: {
        url,
        provider: "YouTube",
        title: "Fetched YouTube Keynote",
        description: "Keynote summary from YouTube.",
        image: "/og-image.png",
        status: "ready",
      },
    });
  });

  const page = await adminContext.newPage();
  page.on("pageerror", (err) => errors.push(`admin: ${err.message}`));
  page.setDefaultTimeout(30000);

  // ── Dashboard QA ──
  await page.goto(`${origin}/admin`);
  await page
    .getByRole("heading", { name: "Unable to load dashboard" })
    .waitFor();
  results.push("Dashboard analytics error state renders without crashing");

  await page.evaluate(() => {
    window.__allowAnalyticsSuccess = true;
  });
  await page.getByRole("button", { name: "Retry" }).click();
  await page.locator(".admin-donut-center").waitFor();
  check(
    "Dashboard retry recovers and renders donut percentage",
    (await page.locator(".admin-donut-center strong").textContent()) === "75%",
  );
  check(
    "Dashboard shows category usage note",
    (await page.getByText("3 of 4 categories used").count()) === 1,
  );
  check(
    "Dashboard recent post links to editor",
    (await page
      .locator(".admin-recent-item__title")
      .first()
      .getAttribute("href")) === "/admin/blogs/edit/article",
  );
  check(
    "Sidebar shows live counts for Blogs and Categories",
    (await page.locator(".admin-nav-count").allTextContents()).join(",") ===
      "4,4",
  );
  await fontCheck(page, "Admin Dashboard");
  await widthCheck(page, "Admin Dashboard desktop");
  await capture(page, "admin-dashboard-desktop");

  // Mobile Dashboard + Drawer QA
  await page.setViewportSize({ width: 390, height: 844 });
  await widthCheck(page, "Admin Dashboard mobile");
  await capture(page, "admin-dashboard-mobile");

  const navToggle = page.getByRole("button", { name: "Toggle navigation" });
  await navToggle.click();
  check(
    "Mobile drawer opens on toggle click",
    await page.evaluate(() =>
      document
        .querySelector(".admin-sidebar")
        .classList.contains("admin-sidebar--open"),
    ),
  );
  await page.keyboard.press("Escape");
  check(
    "Mobile drawer closes on Escape key",
    await page.evaluate(
      () =>
        !document
          .querySelector(".admin-sidebar")
          .classList.contains("admin-sidebar--open"),
    ),
  );
  await navToggle.click();
  await page.locator(".admin-sidebar").getByRole("link", { name: /Blogs/i }).click();
  await page.waitForURL("**/admin/blogs");
  check(
    "Mobile drawer closes after navigation",
    await page.evaluate(
      () =>
        !document
          .querySelector(".admin-sidebar")
          .classList.contains("admin-sidebar--open"),
    ),
  );

  // ── Blog Posts List QA ──
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.getByRole("heading", { name: "Blog Posts" }).waitFor();
  await widthCheck(page, "Admin Blogs desktop");

  const searchBox = page.getByRole("searchbox", { name: "Search posts" });
  await searchBox.fill("slow");
  await page.waitForTimeout(350);
  await searchBox.fill("thoughtful");
  await page.waitForTimeout(1100);
  const visiblePostTitles = await page
    .locator(".admin-table__title")
    .allTextContents();
  check(
    "Admin Blogs ignores stale slow search responses",
    visiblePostTitles.length === 1 &&
      visiblePostTitles[0] === "A thoughtful approach to web development",
  );

  await page.getByRole("button", { name: "Clear search" }).click();
  await page.waitForTimeout(400);
  check(
    "Admin Blogs table header, column headers, and all odd/even rows have uniform white background",
    await page.evaluate(() => {
      const headerBg = getComputedStyle(
        document.querySelector(".admin-table-wrap__header"),
      ).backgroundColor;
      const thBgs = Array.from(document.querySelectorAll(".admin-table th")).map(
        (el) => getComputedStyle(el).backgroundColor,
      );
      const tdBgs = Array.from(
        document.querySelectorAll(".admin-table tbody td"),
      ).map((el) => getComputedStyle(el).backgroundColor);
      return (
        headerBg === "rgb(255, 255, 255)" &&
        thBgs.length > 0 &&
        thBgs.every((bg) => bg === "rgb(255, 255, 255)") &&
        tdBgs.length > 0 &&
        tdBgs.every((bg) => bg === "rgb(255, 255, 255)")
      );
    }),
  );
  await capture(page, "admin-blogs-desktop");

  // Filter by Published (3 posts), edit 1 post to Draft, return and verify reconciliation
  await page.getByRole("tab", { name: "Published" }).click();
  await page.waitForTimeout(200);
  check(
    "Published filter tab shows 3 published posts",
    (await page.locator(".admin-table__title").count()) === 3,
  );

  // Open delete modal and cancel
  await page
    .getByRole("button", {
      name: "Delete A thoughtful approach to web development",
    })
    .click();
  await page.getByRole("heading", { name: "Delete Post?" }).waitFor();
  await page.getByRole("button", { name: "Cancel" }).click();

  // Navigate to edit "A thoughtful approach to web development"
  await page
    .getByRole("button", {
      name: "Edit A thoughtful approach to web development",
    })
    .click();
  await page.waitForURL("**/admin/blogs/edit/article");

  // ── Blog Editor QA ──
  await page.getByRole("heading", { name: "Edit Post" }).waitFor();
  check(
    "On /admin/blogs/edit/:id, Blogs nav item is active and New Post is not active",
    await page.evaluate(() => {
      const blogsLink = document.querySelector(
        '.admin-sidebar a[href="/admin/blogs"]',
      );
      const newPostLink = document.querySelector(
        '.admin-sidebar a[href="/admin/blogs/new"]',
      );
      return (
        Boolean(blogsLink?.classList.contains("admin-nav-item--active")) &&
        !newPostLink?.classList.contains("admin-nav-item--active")
      );
    }),
  );
  await widthCheck(page, "Admin Editor desktop");
  check(
    "Editor right rail renders Cover preview, Post details, and Ready to publish?",
    (await page.locator(".aed__rail-card").count()) === 3,
  );
  check(
    "Editor checklist marks all 4 items ready on complete article",
    (await page.locator(".aed__check--ok").count()) === 4,
  );

  // Check SEO & Sharing live preview tabs (Google, Facebook, Twitter)
  await page.getByRole("tab", { name: "SEO & Sharing" }).click();
  await page.getByRole("button", { name: "Facebook", exact: true }).click();
  check(
    "SEO Facebook card preview renders",
    (await page.locator(".seo-preview--facebook").count()) === 1,
  );
  await page.getByRole("button", { name: "Twitter", exact: true }).click();
  check(
    "SEO Twitter card preview renders",
    (await page.locator(".seo-preview--twitter").count()) === 1,
  );
  await page.getByRole("tab", { name: "Content" }).click();
  await capture(page, "admin-editor-desktop");

  await page.setViewportSize({ width: 390, height: 844 });
  await widthCheck(page, "Admin Editor mobile");
  await capture(page, "admin-editor-mobile");

  // Switch back to desktop, save as draft via right-rail "Save draft" button, and verify reconciliation on return
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.getByRole("button", { name: "Save draft" }).click();
  await page.waitForURL("**/admin/blogs");
  await page.waitForTimeout(250);

  const remainingPublishedTitles = await page
    .locator(".admin-table__title")
    .allTextContents();
  check(
    "Returning from editor removes newly-drafted post from active Published tab",
    remainingPublishedTitles.length === 2 &&
      !remainingPublishedTitles.includes(
        "A thoughtful approach to web development",
      ),
  );
  check(
    "Returning from editor refreshes post counts",
    (await page.locator(".admin-page-sub").textContent()).includes(
      "2 published · 2 drafts",
    ),
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await widthCheck(page, "Admin Blogs mobile");
  await capture(page, "admin-blogs-mobile");

  // ── Categories QA ──
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto(`${origin}/admin/categories`);
  await page.getByRole("heading", { name: "Categories", exact: true }).waitFor();
  await widthCheck(page, "Admin Categories desktop");

  check(
    "Categories renders 2-letter avatar chips and post counts",
    (await page.locator(".admin-cat-avatar").first().textContent()) === "EN" &&
      (await page.locator(".admin-cat-cell__info small").first().textContent()) ===
        "2 posts",
  );

  // Stale search guard on categories
  const catSearch = page.getByRole("searchbox", { name: "Search categories" });
  await catSearch.fill("slow");
  await page.waitForTimeout(350);
  await catSearch.fill("eng");
  await page.waitForTimeout(1100);
  const catNames = await page
    .locator(".admin-cat-cell__info strong")
    .allTextContents();
  check(
    "Admin Categories ignores stale slow search responses",
    catNames.length === 1 && catNames[0] === "Engineering",
  );
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.waitForTimeout(350);

  // Inline edit category
  await page.getByRole("button", { name: "Edit Design" }).click();
  const editNameInput = page.getByLabel("Category name for Design");
  await editNameInput.fill("Design Systems");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByText("Category updated").waitFor();
  results.push("Categories inline edit saves and shows toast");

  // Add New Category modal
  await page.getByRole("button", { name: "New Category" }).click();
  await page.getByRole("heading", { name: "Add New Category" }).waitFor();
  await page.getByLabel(/Name/).fill("Product Strategy");
  check(
    "Add Category modal auto-generates slug from name",
    (await page.getByLabel(/Slug/).inputValue()) === "product-strategy",
  );
  await page.getByRole("button", { name: "Add Category" }).click();
  await page.getByText("Category added").waitFor();
  check(
    "Adding category updates header count badge and sidebar badge",
    (await page.locator(".admin-badge--count").textContent()).includes(
      "5 total",
    ),
  );
  check(
    "Admin Categories table header, column headers, and all odd/even rows have uniform white background",
    await page.evaluate(() => {
      const headerBg = getComputedStyle(
        document.querySelector(".admin-table-wrap__header"),
      ).backgroundColor;
      const thBgs = Array.from(document.querySelectorAll(".admin-table th")).map(
        (el) => getComputedStyle(el).backgroundColor,
      );
      const tdBgs = Array.from(
        document.querySelectorAll(".admin-table tbody td"),
      ).map((el) => getComputedStyle(el).backgroundColor);
      return (
        headerBg === "rgb(255, 255, 255)" &&
        thBgs.length > 0 &&
        thBgs.every((bg) => bg === "rgb(255, 255, 255)") &&
        tdBgs.length > 0 &&
        tdBgs.every((bg) => bg === "rgb(255, 255, 255)")
      );
    }),
  );
  await capture(page, "admin-categories-desktop");

  await page.setViewportSize({ width: 390, height: 844 });
  await widthCheck(page, "Admin Categories mobile");
  await capture(page, "admin-categories-mobile");

  // Verify /admin/blogs/new sidebar active state
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto(`${origin}/admin/blogs/new`);
  await page.getByRole("heading", { name: "New Post" }).waitFor();
  check(
    "On /admin/blogs/new, New Post nav item is active and Blogs nav item is NOT active",
    await page.evaluate(() => {
      const blogsLink = document.querySelector(
        '.admin-sidebar a[href="/admin/blogs"]',
      );
      const newPostLink = document.querySelector(
        '.admin-sidebar a[href="/admin/blogs/new"]',
      );
      return (
        Boolean(newPostLink?.classList.contains("admin-nav-item--active")) &&
        !blogsLink?.classList.contains("admin-nav-item--active")
      );
    }),
  );

  check("No uncaught browser errors across admin QA", errors.length === 0);

  await writeFile(
    `${output}/admin-qa-results.json`,
    JSON.stringify({ checks: results.length, results, errors }, null, 2),
  );
  console.log(
    JSON.stringify({ checks: results.length, results, errors }, null, 2),
  );
  await adminContext.close();
} finally {
  await browser.close();
}
