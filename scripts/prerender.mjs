import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render, imageStyles } from "../.prerender/entry-server.js";
import { loadPublishedPosts, postLastmod } from "./published-posts.mjs";

const base = "https://unicodetech-dev.vercel.app";
const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
const appSource = await readFile("src/App.jsx", "utf8");
const pathSource = await readFile("src/routes/paths.js", "utf8");
const namedPaths = Object.fromEntries(
  [...pathSource.matchAll(/(\w+): "([^"]+)"/g)].map((m) => [m[1], m[2]]),
);
// Component name -> file, from `const X = lazy(() => import("./pages/Y"))`,
// since a component's name does not always match its file name.
const lazyFiles = Object.fromEntries(
  [...appSource.matchAll(/const (\w+) = lazy\(\s*\(\) => import\("\.\/([^"]+)"\)/g)].map(
    (m) => [m[1], `src/${m[2]}.jsx`],
  ),
);
const routeModules = Object.fromEntries(
  [...appSource.matchAll(/path=\{paths\.(\w+)\}\s+element=\{<(\w+)/g)].map(
    (m) => [namedPaths[m[1]], lazyFiles[m[2]] ?? `src/pages/${m[2]}.jsx`],
  ),
);
function routeStyles(moduleId, seen = new Set()) {
  if (seen.has(moduleId) || !manifest[moduleId]) return [];
  seen.add(moduleId);
  const chunk = manifest[moduleId];
  return [
    ...(chunk.imports ?? []).flatMap((id) => routeStyles(id, seen)),
    ...(chunk.css ?? []),
  ];
}
// The route's lazy chunk and its static imports, so the browser fetches them
// alongside the entry instead of after it runs.
function routeScripts(moduleId, seen = new Set()) {
  if (seen.has(moduleId) || !manifest[moduleId]) return [];
  seen.add(moduleId);
  const chunk = manifest[moduleId];
  return [
    chunk.file,
    ...(chunk.imports ?? []).flatMap((id) => routeScripts(id, seen)),
  ];
}
// Preload the latin (U+00..FF) files of the body and heading fonts so text
// does not wait for the stylesheet to download before the font request starts.
const entryCss = await readFile(`dist/${manifest["index.html"].css[0]}`, "utf8");
const fontPreloads = [
  ...entryCss.matchAll(/@font-face\s*\{([^}]*)\}/g),
]
  .map(([, body]) => body)
  .filter(
    (body) =>
      /font-family:\s*"?(Inter|Manrope)"?;/.test(body) &&
      /font-style:\s*normal/.test(body) &&
      /unicode-range:\s*U\+\?\?,/.test(body),
  )
  .map((body) => body.match(/url\(([^)]+\.woff2)\)/)?.[1])
  .filter(Boolean)
  .map(
    (url) =>
      `<link rel="preload" href="${url}" as="font" type="font/woff2" crossorigin>`,
  );
const template = (await readFile("dist/index.html", "utf8")).replace(
  "</head>",
  () => `${fontPreloads.join("\n")}\n</head>`,
);
const sitemap = await readFile("public/sitemap.xml", "utf8");
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => new URL(match[1]).pathname,
);
const escape = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const json = (data) => JSON.stringify(data).replace(/</g, "\\u003c");
// One shared template for every /blog/:slug URL (vercel.json rewrites to it).
// It renders the post's loading state, which is also the first client render,
// so hydration matches; the post itself loads from Firestore afterwards.
const BLOG_POST_TEMPLATE = "/blog/__post__";

// Published posts get full static HTML. If Firestore is unreachable the build
// still ships: those URLs fall back to the template above.
let posts = [];
try {
  posts = await loadPublishedPosts();
} catch (error) {
  console.warn(`Blog posts not prerendered: ${error.message}`);
}
const postsByRoute = new Map(posts.map((post) => [`/blog/${post.slug}`, post]));

for (const route of [
  ...routes,
  "/home-copy",
  "/redesign-landing",
  "/services",
  "/faq",
  "/404",
  BLOG_POST_TEMPLATE,
  ...postsByRoute.keys(),
]) {
  const isTemplate = route === BLOG_POST_TEMPLATE;
  const post = postsByRoute.get(route);
  const initialData = post ? { blogPost: post } : {};
  const { html, metadata: m } = await render(
    route === "/404" ? "/audit-invalid-route" : route,
    initialData,
  );
  // React streams large Suspense boundaries out of line: the content goes in a
  // hidden <div> and an inline $RC script swaps it in. The CSP blocks inline
  // scripts, so that content would stay hidden until the app hydrates.
  if (/<!--\$\?-->|\$RC\(/.test(html))
    throw new Error(`Out-of-line Suspense content (blocked by CSP): ${route}`);
  if (!m || (!isTemplate && !html.includes("<h1")))
    throw new Error(`Missing metadata/H1: ${route}`);
  // The template serves many URLs, so it must not claim one canonical URL.
  if (isTemplate) Object.assign(m, { canonical: null, url: `${base}/blog` });
  // Replacements below use functions: content from Firestore may contain
  // `$&`, `$'` or `` $` ``, which a string replacement would expand.
  let page = template.replace(
    /<title>[\s\S]*?<\/title>/,
    () => `<title>${escape(m.title)}</title>`,
  );
  page = page.replace(
    /<meta (?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,
    "",
  );
  page = page.replace(/<link rel="canonical"[^>]*>/g, "");
  const routeModule = route.startsWith("/case-studies/")
    ? "src/pages/ProjectDetails.jsx"
    : isTemplate || post
      ? "src/pages/BlogPost.jsx"
      : routeModules[route];
  const styles = [...new Set(routeStyles(routeModule))].filter(
    (file) => !template.includes(`href="/${file}"`),
  );
  const scripts = [...new Set(routeScripts(routeModule))].filter(
    (file) => !template.includes(`/${file}"`),
  );
  const tags = [
    ...styles.map((file) => `<link rel="stylesheet" href="/${file}">`),
    ...scripts.map(
      (file) => `<link rel="modulepreload" crossorigin href="/${file}">`,
    ),
    `<meta name="description" content="${escape(m.description)}">`,
    `<meta name="robots" content="${m.robots}">`,
    ...(m.canonical ? [`<link rel="canonical" href="${m.canonical}">`] : []),
    ...Object.entries({
      title: m.title,
      description: m.description,
      url: m.url,
      image: m.ogImage,
      type: "website",
      site_name: "UnicodeTech",
      "image:width": "1200",
      "image:height": "630",
    }).map(
      ([key, value]) =>
        `<meta property="og:${key}" content="${escape(value)}">`,
    ),
    ...Object.entries({
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      image: m.ogImage,
    }).map(
      ([key, value]) =>
        `<meta name="twitter:${key}" content="${escape(value)}">`,
    ),
    ...m.schemas.map(
      ({ id, data }) =>
        `<script type="application/ld+json" data-seo="${id}">${json(data)}</script>`,
    ),
  ].join("\n");
  page = page
    .replace("</head>", () => `${tags}\n</head>`)
    .replace(
      '<div id="root"></div>',
      () =>
        `<div id="root">${html}</div>` +
        (post
          ? `<script type="application/json" id="initial-data">${json(initialData)}</script>`
          : ""),
    )
    .replace("<body>", () => `<body class="${escape(m.bodyClass)}">`);
  // Background variables must be available before JavaScript executes.
  page = page.replace(
    '<html lang="en">',
    () => `<html lang="en" style="${escape(
      Object.entries(imageStyles)
        .map(([key, value]) => `${key}:${value}`)
        .join(";"),
    )}">`,
  );
  const destination =
    route === "/"
      ? "dist/index.html"
      : route === "/404"
        ? "dist/404.html"
        : isTemplate
          ? "dist/blog-post.html"
          : `dist${route}.html`;
  await mkdir(destination.slice(0, destination.lastIndexOf("/")), {
    recursive: true,
  });
  await writeFile(destination, page);
}
// Admin pages render only in the browser: an empty root, so main.jsx uses
// createRoot instead of hydrating, and noindex keeps them out of search.
await writeFile(
  "dist/app-shell.html",
  template
    .replace(/<meta name="robots"[^>]*>\s*/g, "")
    .replace(/<link rel="canonical"[^>]*>\s*/g, "")
    .replace("</head>", '<meta name="robots" content="noindex, nofollow">\n</head>'),
);
// Posts change without code changes, so they go into the built sitemap only.
if (posts.length) {
  const entries = posts
    .map(
      (post) => `  <url>
    <loc>${base}/blog/${post.slug}</loc>
    <lastmod>${postLastmod(post)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
    )
    .join("\n");
  await writeFile(
    "dist/sitemap.xml",
    sitemap.replace("</urlset>", () => `  <!-- Blog posts -->\n${entries}\n</urlset>`),
  );
}
console.log(`Prerendered ${posts.length} blog posts.`);
console.log(`Prerendered ${routes.length} primary routes and 404 for ${base}`);
