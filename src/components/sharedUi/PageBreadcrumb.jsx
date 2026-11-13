import { useLocation } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { breadcrumbMap } from "../../utils/breadcrumbRoutes";
import { findCaseStudyRoute } from "../../caseStudies/routes";
import { paths } from "../../routes/paths";

const BASE_URL = "https://unicodetech.com";

export default function PageBreadcrumb({ extraBottomMargin = false }) {
  const { pathname, state } = useLocation();

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
    const project = findCaseStudyRoute(pathname);
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
