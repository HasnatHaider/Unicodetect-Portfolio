import { clientLogos } from "../utils/clientLogos.js";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function fail(slug, message) {
  throw new Error(`Case study "${slug ?? "?"}": ${message}`);
}

/**
 * Validates one project and fills in derived fields. Runs when the project
 * module loads, so a bad entry fails `vite build` and the prerender instead of
 * rendering a broken page.
 */
export function defineCaseStudy(meta, data) {
  const { slug, title, order, lastmod, aliases = [] } = meta;
  if (!SLUG.test(slug ?? "")) fail(slug, "slug must be kebab-case");
  if (!title) fail(slug, "title is required");
  if (!Number.isFinite(order)) fail(slug, "order must be a number");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod ?? "")) fail(slug, "lastmod must be YYYY-MM-DD");
  for (const alias of aliases) {
    if (!alias.startsWith("/")) fail(slug, `alias "${alias}" must start with /`);
  }
  for (const field of ["category", "description", "stack", "images", "detail"]) {
    if (!data[field]) fail(slug, `${field} is required`);
  }
  if (!data.images.card) fail(slug, "images.card is required");
  if (data.logoId && !clientLogos[data.logoId]) fail(slug, `unknown logoId "${data.logoId}"`);
  if (data.clientLogoId && !clientLogos[data.clientLogoId]) {
    fail(slug, `unknown clientLogoId "${data.clientLogoId}"`);
  }
  if (data.liveCall && !/^\+\d{6,15}$/.test(data.liveCall.tel ?? "")) {
    fail(slug, "liveCall.tel must be in +E.164 form");
  }

  return {
    ...meta,
    aliases,
    ...data,
    hero: { dark: false, ...data.hero },
    href: `/case-studies/${slug}`,
    clientLogo: data.clientLogoId ? clientLogos[data.clientLogoId] : null,
  };
}
