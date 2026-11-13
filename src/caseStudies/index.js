// Case studies: one folder per project under ./projects/<slug>/.
// Add a project by adding a folder (meta.js + index.js). Nothing else to edit:
// the list, the detail page, the /<slug> alias and the sitemap all read from here.
const modules = import.meta.glob("./projects/*/index.js", { eager: true });

const projects = Object.entries(modules)
  .map(([file, mod]) => {
    const folder = file.split("/")[2];
    const project = mod.default;
    if (project.slug !== folder) {
      throw new Error(`Case study folder "${folder}" holds slug "${project.slug}"`);
    }
    return project;
  })
  .sort((a, b) => a.order - b.order);

const byPath = new Map();
for (const project of projects) {
  for (const key of [project.slug, project.href, ...project.aliases]) {
    if (byPath.has(key)) throw new Error(`Case study path "${key}" is used twice`);
    byPath.set(key, project);
  }
}

projects.forEach((project, index) => {
  Object.defineProperty(project, "next", {
    value: projects[(index + 1) % projects.length],
    enumerable: false,
  });
  Object.freeze(project);
});

/**
 * Look up one case study by slug, canonical path or alias
 * ("bellreserve", "/case-studies/bellreserve" or "/bellreserve").
 * Returns null when nothing matches; it never throws.
 */
export function getCaseStudy(slugOrPath) {
  return byPath.get(slugOrPath) ?? null;
}

/**
 * Case studies in display order. Optional filters:
 * - slugs: keep only these, in display order
 * - client: keep projects built for this parent client logo id (e.g. "bms")
 * - limit: cap the count
 */
export function listCaseStudies({ slugs, client, limit } = {}) {
  let list = projects;
  if (slugs) list = list.filter((p) => slugs.includes(p.slug));
  if (client) list = list.filter((p) => p.clientLogoId === client);
  return limit ? list.slice(0, limit) : list;
}

export { caseStudyRoutes } from "./routes.js";
