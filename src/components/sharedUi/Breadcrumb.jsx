import { ChevronRight } from "lucide-react";
import { SiteLink } from "./Interactive";

export default function Breadcrumb({ items, extraBottomMargin = false }) {
  return (
    <nav
      className={`breadcrumb ${extraBottomMargin ? "breadcrumb--extra-bottom-margin" : ""}`}
      aria-label="Breadcrumb"
    >
      <ol className="breadcrumb__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="breadcrumb__item">
              {isLast ? (
                <span className="breadcrumb__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <SiteLink href={item.href} className="breadcrumb__link">
                    {item.label}
                  </SiteLink>
                  <ChevronRight
                    size={12}
                    aria-hidden="true"
                    className="breadcrumb__sep"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
