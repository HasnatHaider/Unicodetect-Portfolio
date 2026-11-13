// Writes case study routes into public/sitemap.xml and vercel.json from
// src/caseStudies/projects/*/meta.js, so a new project folder is all it takes.
// `--check` changes nothing and exits 1 if either file is out of date.
import { readFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const projectsDir = new URL("src/caseStudies/projects/", root);
const sitemapFile = new URL("public/sitemap.xml", root);
const vercelFile = new URL("vercel.json", root);
const BASE = "https://unicodetech-dev.vercel.app";
const START = "  <!-- Case study detail pages -->\n";
const END = "\n  <!-- Primary service pages -->";

export async function loadCaseStudyMetas() {
  const slugs = await readdir(projectsDir);
  const metas = await Promise.all(
    slugs.map(async (slug) => {
      const meta = (await import(new URL(`${slug}/meta.js`, projectsDir))).default;
      if (meta.slug !== slug) {
        throw new Error(`Folder "${slug}" holds meta.slug "${meta.slug}"`);
      }
      return { aliases: [], ...meta };
    }),
  );
  return metas.sort((a, b) => a.order - b.order);
}

export function renderSitemap(sitemap, metas) {
  const start = sitemap.indexOf(START);
  const end = sitemap.indexOf(END);
  if (start < 0 || end < start) throw new Error("sitemap.xml case study markers not found");
  const entries = metas
    .map(
      (m) => `  <url>
    <loc>${BASE}/case-studies/${m.slug}</loc>
    <lastmod>${m.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    )
    .join("\n");
  return sitemap.slice(0, start) + START + entries + "\n" + sitemap.slice(end);
}

export function renderVercel(vercelText, metas) {
  const config = JSON.parse(vercelText);
  const isCaseStudyAlias = (r) => r.destination.startsWith("/case-studies/");
  const firstAlias = config.redirects.findIndex(isCaseStudyAlias);
  const others = config.redirects.filter((r) => !isCaseStudyAlias(r));
  const aliases = metas.flatMap((m) =>
    m.aliases.map((source) => ({
      source,
      destination: `/case-studies/${m.slug}`,
      statusCode: 301,
    })),
  );
  const at = firstAlias < 0 ? others.length : firstAlias;
  config.redirects = [...others.slice(0, at), ...aliases, ...others.slice(at)];
  return JSON.stringify(config, null, 2) + "\n";
}

async function main() {
  const check = process.argv.includes("--check");
  const metas = await loadCaseStudyMetas();
  const outputs = [
    [sitemapFile, renderSitemap],
    [vercelFile, renderVercel],
  ];
  let stale = false;
  for (const [file, render] of outputs) {
    const current = (await readFile(file, "utf8")).replace(/\r\n/g, "\n");
    const next = render(current, metas);
    if (next === current) continue;
    if (check) {
      console.error(`Out of date: ${fileURLToPath(file)} (run npm run routes)`);
      stale = true;
    } else {
      await writeFile(file, next);
      console.log(`Updated ${fileURLToPath(file)}`);
    }
  }
  if (stale) process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
