import { paths } from "../routes/paths";

export const BASE_URL = "https://unicodetech-react.vercel.app";
export const aliases = {
  "/portfolio-case-studies": "/case-studies",
  ...Object.fromEntries(["spin-the-night", "carecompass", "daily-digest", "contractor-connect", "task-hive"].map((slug) => [`/${slug}`, `/case-studies/${slug}`])),
};
const serviceKeys = ["aiAgents", "saas", "mobileWeb", "shopify", "uiUx", "webDevelopment", "wordpressDevelopment", "apiSystemsIntegration", "customSoftwareDevelopment", "crmErpSolutions", "cloudDevOps", "qaTesting", "dedicatedProductTeams", "productDiscoveryStrategy", "maintenanceSupport"];
const servicePaths = new Set(serviceKeys.map((key) => paths[key]));
const shortName = (value) => value.replace(/\s*\|.*$/, "").replace(/\s+Case Study$/, "").replace(/\s+Services$/, "").trim();
export function resolveMetadata(page, pathname) {
  const path = aliases[pathname] ?? pathname;
  const title = page.title;
  const description = page.description ?? "";
  const canonical = page.noIndex ? null : (page.canonical ?? `${BASE_URL}${path}`);
  const schemas = [];
  if (path !== "/" && !page.noIndex) {
    const segments = path.split("/").filter(Boolean);
    schemas.push({ id: "breadcrumb", data: {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        ...segments.map((segment, index) => ({
          "@type": "ListItem", position: index + 2,
          name: index === segments.length - 1 ? shortName(title) : segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          item: `${BASE_URL}/${segments.slice(0, index + 1).join("/")}`,
        })),
      ],
    }});
  }
  const schema = page.noIndex ? null : servicePaths.has(path) ? {
    "@context": "https://schema.org", "@type": "Service", name: shortName(title), description,
    provider: { "@type": "Organization", name: "UnicodeTech", url: BASE_URL }, url: canonical,
  } : page.schema;
  if (schema) schemas.push({ id: "page-schema", data: schema });
  return { title, description, canonical, url: canonical ?? `${BASE_URL}${path}`, robots: page.noIndex ? "noindex, nofollow" : "index, follow", ogImage: page.ogImage ?? `${BASE_URL}/og-image.png`, bodyClass: page.bodyClass ?? "", schemas };
}
