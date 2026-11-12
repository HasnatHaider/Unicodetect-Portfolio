import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render, imageStyles } from "../.prerender/entry-server.js";

const base = "https://unicodetech-dev.vercel.app";
const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
const appSource = await readFile("src/App.jsx", "utf8");
const pathSource = await readFile("src/routes/paths.js", "utf8");
const namedPaths = Object.fromEntries(
  [...pathSource.matchAll(/(\w+): "([^"]+)"/g)].map((m) => [m[1], m[2]]),
);
const routeModules = Object.fromEntries(
  [...appSource.matchAll(/path=\{paths\.(\w+)\}\s+element=\{<(\w+)/g)].map(
    (m) => [namedPaths[m[1]], `src/pages/${m[2]}.jsx`],
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
const template = await readFile("dist/index.html", "utf8");
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
for (const route of [...routes, "/home-copy", "/services", "/faq", "/404"]) {
  const { html, metadata: m } = await render(
    route === "/404" ? "/audit-invalid-route" : route,
  );
  if (!m || !html.includes("<h1"))
    throw new Error(`Missing metadata/H1: ${route}`);
  let page = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escape(m.title)}</title>`,
  );
  page = page.replace(
    /<meta (?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,
    "",
  );
  page = page.replace(/<link rel="canonical"[^>]*>/g, "");
  const routeModule = route.startsWith("/case-studies/")
    ? "src/pages/ProjectDetails.jsx"
    : routeModules[route];
  const styles = [...new Set(routeStyles(routeModule))].filter(
    (file) => !template.includes(`href="/${file}"`),
  );
  const tags = [
    ...styles.map((file) => `<link rel="stylesheet" href="/${file}">`),
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
    .replace("</head>", `${tags}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace("<body>", `<body class="${escape(m.bodyClass)}">`);
  // Background variables must be available before JavaScript executes.
  page = page.replace(
    '<html lang="en">',
    `<html lang="en" style="${escape(
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
        : `dist${route}.html`;
  await mkdir(destination.slice(0, destination.lastIndexOf("/")), {
    recursive: true,
  });
  await writeFile(destination, page);
}
console.log(`Prerendered ${routes.length} primary routes and 404 for ${base}`);
