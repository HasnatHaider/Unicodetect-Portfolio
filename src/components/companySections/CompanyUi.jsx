import { ArrowUpRight } from "lucide-react";
import { SiteLink } from "../sharedUi/Interactive";
import PageBreadcrumb from "../sharedUi/PageBreadcrumb";
import { paths } from "../../routes/paths";
import "../../assets/styles/pages/companyPages.css";

export const CompanyHero = ({ eyebrow, title, description, children }) => (
  <section
    className="company-hero service-hero-theme"
    aria-labelledby="company-page-title"
  >
    <div className="company-container company-hero-grid">
      <div>
        <PageBreadcrumb />
        <span className="company-eyebrow">{eyebrow}</span>
        <h1 id="company-page-title" className="service-hero-title">
          {title}
        </h1>
        <p className="service-hero-description">{description}</p>
        <div className="company-actions">
          <SiteLink
            href={paths.contact}
            className="service-hero-button service-hero-button--primary"
          >
            Let’s Talk <ArrowUpRight size={18} aria-hidden="true" />
          </SiteLink>
          <SiteLink
            href={paths.caseStudies}
            className="service-hero-button service-hero-button--secondary"
          >
            Explore Our Work
          </SiteLink>
        </div>
      </div>
      {children}
    </div>
  </section>
);

export const CompanyHeading = ({ eyebrow, title, id }) => (
  <div className="company-section-heading">
    <span className="company-eyebrow">{eyebrow}</span>
    <h2 id={id}>{title}</h2>
  </div>
);
