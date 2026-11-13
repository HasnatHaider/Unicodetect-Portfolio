// Route facts only (slug, path, aliases), read from each project's meta.js.
// Kept apart from ./index.js so the app shell and metadata can route case
// studies without bundling every project's narrative and images.
const metas = import.meta.glob("./projects/*/meta.js", {
  eager: true,
  import: "default",
});

const routes = Object.values(metas)
  .sort((a, b) => a.order - b.order)
  .map(({ slug, title, aliases = [] }) => ({
    slug,
    title,
    path: `/case-studies/${slug}`,
    aliases,
  }));

const byPath = new Map(
  routes.flatMap((route) =>
    [route.slug, route.path, ...route.aliases].map((key) => [key, route]),
  ),
);

/** Canonical paths and their aliases, in display order. */
export function caseStudyRoutes() {
  return routes;
}

/** Route facts for a slug, canonical path or alias; null when none match. */
export function findCaseStudyRoute(slugOrPath) {
  return byPath.get(slugOrPath) ?? null;
}
