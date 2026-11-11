import { ArrowRight } from "lucide-react";
import { SiteLink } from "../sharedUi/Interactive";
import { ApiSystemsIntegrationEyebrow } from "./ApiSystemsIntegrationSectionHeading";
import PageBreadcrumb from "../sharedUi/PageBreadcrumb";

const ApiSystemsIntegrationHero = () => (
  <section
    className="service-section api-integration-hero service-hero-theme"
    aria-labelledby="api-integration-hero-title"
  >
    <div className="service-container">
      <div className="api-integration-hero-content">
        <PageBreadcrumb extraBottomMargin />
        <ApiSystemsIntegrationEyebrow variant="hero">
          INTEGRATIONS
        </ApiSystemsIntegrationEyebrow>
        <h1 id="api-integration-hero-title" className="service-hero-title">
          API &amp; Systems Integration
        </h1>
        <p className="services-pain-point">
          Your systems don&apos;t talk to each other — data lives in silos and manual work fills the gaps?
        </p>
        <p className="service-hero-description">
          Connect products, CRMs, payments, and custom business tools into one
          dependable, well-documented ecosystem. We engineer secure data
          pipelines that power real-time syncing at scale.
        </p>
        <SiteLink
          schedule
          className="api-integration-docs-link service-hero-button service-hero-button--primary"
        >
          Book a Strategy Call <ArrowRight size={18} aria-hidden="true" />
        </SiteLink>
        <p className="api-integration-hero-path">
          Middleware Orchestration <ArrowRight size={14} aria-hidden="true" />{" "}
          API Gateways <ArrowRight size={14} aria-hidden="true" /> Legacy
          Modernization
        </p>
      </div>
    </div>
  </section>
);

export default ApiSystemsIntegrationHero;
