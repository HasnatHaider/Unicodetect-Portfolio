import { paths } from "../../routes/paths";
import { ArrowRight } from "lucide-react";
import { SiteLink } from "../sharedUi/Interactive";
import { UiUxEyebrow } from "./UiUxSectionHeading";
import PageBreadcrumb from "../sharedUi/PageBreadcrumb";


const UiUxHero = () => (
  <section
    className="uiux-hero service-hero-theme"
    aria-labelledby="uiux-hero-title"
  >
    <div className="uiux-container">
      <div className="uiux-hero-content">
        <PageBreadcrumb extraBottomMargin />
        <UiUxEyebrow>UI/UX DESIGN SERVICES</UiUxEyebrow>
        <h1 id="uiux-hero-title" className="service-hero-title">
          Interfaces that feel natural, systems that scale.
        </h1>
        <p className="services-pain-point">
          Shipping features users struggle to understand or navigate?
        </p>
        <p className="service-hero-description">
          We build cohesive visual languages, meticulous design systems, and
          researched user pathways that transform complex technical capabilities
          into intuitive software products.
        </p>
        <div className="uiux-actions">
          <SiteLink
            schedule
            className="uiux-button uiux-button-primary service-hero-button service-hero-button--primary"
          >
            Book a Strategy Call
          </SiteLink>
          <SiteLink
            className="uiux-button uiux-button-outline service-hero-button service-hero-button--secondary"
            href={paths.caseStudies}
          >
            View Case Studies{" "}
            <span aria-hidden="true">
              <ArrowRight size={"1em"} aria-hidden="true" />
            </span>
          </SiteLink>
        </div>
        <p className="uiux-hero-method">
          Research{" "}
          <span aria-hidden="true">
            <ArrowRight size={"1em"} aria-hidden="true" />
          </span>{" "}
          Wireframe{" "}
          <span aria-hidden="true">
            <ArrowRight size={"1em"} aria-hidden="true" />
          </span>{" "}
          Design{" "}
          <span aria-hidden="true">
            <ArrowRight size={"1em"} aria-hidden="true" />
          </span>{" "}
          Handoff
        </p>
      </div>
    </div>
  </section>
);

export default UiUxHero;
