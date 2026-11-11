import { useLocation, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { breadcrumbMap } from "../../utils/breadcrumbRoutes";
import { caseStudyProjects } from "../../utils/caseStudies";
import { paths } from "../../routes/paths";

const BASE_URL = "https://unicodetech.com";

export default function PageBreadcrumb({ extraBottomMargin = false }) {
  const { pathname, state } = useLocation();
  const params = useParams();

  let items =
    pathname === paths.contact && state?.breadcrumbParent
      ? [
          { label: "Home", href: "/" },
          { label: "Services", href: paths.services },
          state.breadcrumbParent,
          { label: "Contact" },
        ]
      : breadcrumbMap[pathname];

  if (!items) {
    const slug = params.slug || pathname.replace("/case-studies/", "");
    const project = caseStudyProjects.find(
      (p) => p.slug === slug || `/${p.slug}` === pathname,
    );
    if (project) {
      items = [
        { label: "Home", href: "/" },
        { label: "Case Studies", href: paths.caseStudies },
        { label: project.title },
      ];
    }
  }

  if (!items) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${BASE_URL}${item.href}` : `${BASE_URL}${pathname}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumb extraBottomMargin={extraBottomMargin} items={items} />
    </>
  );
}
