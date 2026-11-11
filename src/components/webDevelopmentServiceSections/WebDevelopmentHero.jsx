import { paths } from "../../routes/paths";
import { ArrowRight } from "lucide-react";
import { SiteLink } from "../sharedUi/Interactive";
import { WebDevelopmentEyebrow } from "./WebDevelopmentSectionHeading";
import PageBreadcrumb from "../sharedUi/PageBreadcrumb";

const WebDevelopmentHero = () => (
  <section
    className="service-section web-dev-hero service-hero-theme"
    aria-labelledby="web-dev-hero-title"
  >
    <div className="service-container">
      <div className="web-dev-hero-content">
        <PageBreadcrumb extraBottomMargin />
        <WebDevelopmentEyebrow>MODERN WEB DEVELOPMENT</WebDevelopmentEyebrow>
        <h1 id="web-dev-hero-title" className="service-hero-title">
          High-Fidelity Web Apps &amp; Systems.
        </h1>
        <p className="services-pain-point">
          Is your website outdated and failing to turn visitors into clients?
        </p>
        <p className="service-hero-description">
          Responsive frontend interfaces, dependable API integrations, scalable
          headless commerce engines, and lightweight custom CMS platforms
          engineered for conversion and speed.
        </p>
        <div className="web-dev-actions">
          <SiteLink
            schedule
            className="web-dev-button web-dev-button-primary service-hero-button service-hero-button--primary"
          >
            Book a Strategy Call{" "}
            <span aria-hidden="true">
              <ArrowRight size={"1em"} aria-hidden="true" />
            </span>
          </SiteLink>
          <SiteLink
            href={paths.caseStudies}
            className="web-dev-button web-dev-button-outline service-hero-button service-hero-button--secondary"
          >
            Explore Portfolio{" "}
            <span aria-hidden="true">
              <ArrowRight size={"1em"} aria-hidden="true" />
            </span>
          </SiteLink>
        </div>
        <p className="web-dev-hero-path">
          React &amp; Next.js{" "}
          <span aria-hidden="true">
            <ArrowRight size={"1em"} aria-hidden="true" />
          </span>{" "}
          Headless Commerce{" "}
          <span aria-hidden="true">
            <ArrowRight size={"1em"} aria-hidden="true" />
          </span>{" "}
          Scalable Serverless
        </p>
      </div>
    </div>
  </section>
);

export default WebDevelopmentHero;
