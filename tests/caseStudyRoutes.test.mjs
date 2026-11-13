import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  loadCaseStudyMetas,
  renderSitemap,
  renderVercel,
} from "../scripts/generate-case-study-routes.mjs";

const read = async (path) =>
  (await readFile(new URL(`../${path}`, import.meta.url), "utf8")).replace(/\r\n/g, "\n");

test("case study metas have unique slugs, orders and aliases", async () => {
  const metas = await loadCaseStudyMetas();
  assert.ok(metas.length > 0);
  const paths = metas.flatMap((m) => [m.slug, ...m.aliases]);
  assert.equal(new Set(paths).size, paths.length, "duplicate slug or alias");
  const orders = metas.map((m) => m.order);
  assert.equal(new Set(orders).size, orders.length, "duplicate order");
});

test("sitemap.xml and vercel.json match the case study folders", async () => {
  const metas = await loadCaseStudyMetas();
  const sitemap = await read("public/sitemap.xml");
  const vercel = await read("vercel.json");
  assert.equal(renderSitemap(sitemap, metas), sitemap, "run npm run routes");
  assert.equal(renderVercel(vercel, metas), vercel, "run npm run routes");
});
