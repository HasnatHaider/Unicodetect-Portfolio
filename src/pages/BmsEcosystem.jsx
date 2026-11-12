import { ArrowUpRight, Layers, Workflow, ShieldCheck } from "lucide-react";
import usePageMetadata from "../hooks/usePageMetadata";
import { caseStudyProjects } from "../utils/caseStudies";
import { paths } from "../routes/paths";
import { SiteLink } from "../components/sharedUi/Interactive";
import PageBreadcrumb from "../components/sharedUi/PageBreadcrumb";
import CaseStudyCard from "../components/caseStudySections/CaseStudyCard";
import { CompanyHeading } from "../components/companySections/CompanyUi";
import ClientLogo from "../components/sharedUi/ClientLogo";
import "../assets/styles/pages/caseStudies.css";
import "../assets/styles/pages/bmsEcosystem.css";

const products = caseStudyProjects.filter((project) =>
  ["carecompass", "daily-digest", "contractor-connect", "task-hive"].includes(
    project.slug,
  ),
);

export default function BmsEcosystem() {
  usePageMetadata({
    title: "BMS Product Ecosystem | UnicodeTech",
    description: "Explore the BMS multi-product ecosystem built by UnicodeTech — a suite of connected digital products spanning marketplaces, health, and services.",
    bodyClass: "site site-design company-page-body",
  });
  return (
    <div className="page-content company-page portfolio-page bms-page">
      <section
        className="portfolio-hero service-hero-theme"
        aria-labelledby="bms-title"
      >
        <div className="company-container">
          <PageBreadcrumb />
          <div className="client-logo-lockup bms-hero-client">
            <ClientLogo id="bms" size={64} />
            <span className="company-eyebrow">MULTI-PRODUCT PARTNERSHIP</span>
          </div>
          <h1 id="bms-title" className="service-hero-title">
            The BMS product ecosystem.
          </h1>
          <p className="service-hero-description">
            One engineering partnership supporting BMS Computer Management
            across marketplaces, logistics, wellness, and contractor services.
            We support every stage, from product planning and design to
            engineering, quality assurance, and ongoing support.
          </p>
          <div className="company-actions">
            <SiteLink
              href="#bms-products"
              className="service-hero-button service-hero-button--primary"
            >
              Explore the Products <ArrowUpRight size={18} aria-hidden="true" />
            </SiteLink>
            <SiteLink
              href={`${paths.contact}#project-inquiry`}
              className="service-hero-button service-hero-button--secondary"
            >
              Discuss Your Product
            </SiteLink>
          </div>
        </div>
      </section>
      <section
        className="company-section company-dark-section"
        aria-labelledby="bms-partnership-title"
      >
        <div className="company-container">
          <CompanyHeading
            eyebrow="FROM IDEA TO PRODUCTION"
            title="Support across the product lifecycle."
            id="bms-partnership-title"
          />
          <div className="company-strengths bms-strengths">
            <article>
              <Layers size={28} aria-hidden="true" />
              <h3>Product planning & design</h3>
              <p>
                Shape the product experience around its users and business
                needs.
              </p>
            </article>
            <article>
              <Workflow size={28} aria-hidden="true" />
              <h3>Engineering & delivery</h3>
              <p>
                Build mobile applications and web platforms through a shared
                engineering partnership.
              </p>
            </article>
            <article>
              <ShieldCheck size={28} aria-hidden="true" />
              <h3>Quality & support</h3>
              <p>
                Carry products through QA and deployment, with ongoing support
                after launch.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="company-section" aria-labelledby="quickzip-title">
        <div className="company-container">
          <ClientLogo id="quickzip" size={56} className="bms-quickzip-icon" />
          <CompanyHeading
            eyebrow="3-APP LOGISTICS SUITE · MOBILE + WEB"
            title="QuickZip (Customer, Vendor & Driver Apps)"
            id="quickzip-title"
          />
          <p>
            QuickZip comprises three connected mobile applications — Customer
            Ordering, Business Dispatch, and Driver Delivery — backed by a
            centralized operations dashboard. UnicodeTech engineered the
            real-time order routing, driver tracking, and multi-role workflows
            that account for three of the seven mobile products in the BMS
            ecosystem, alongside CareCompass, DailyDigest, ContractorConnect,
            and TaskHive Pro below.
          </p>
        </div>
      </section>
      <section
        id="bms-products"
        className="portfolio-project-section"
        aria-labelledby="bms-products-title"
      >
        <div className="portfolio-container">
          <CompanyHeading
            eyebrow="EXPLORE THE ECOSYSTEM"
            title="Products built around different needs."
            id="bms-products-title"
          />
          <div className="portfolio-grid">
            {products.map((project) => (
              <CaseStudyCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
      <section
        className="company-section company-about-cta"
        aria-labelledby="bms-cta-title"
      >
        <div className="company-container company-cta-row">
          <CompanyHeading
            eyebrow="YOUR NEXT PRODUCT"
            title="Build with a long-term engineering partner."
            id="bms-cta-title"
          />
          <SiteLink schedule className="company-button">
            Book a Strategy Call <ArrowUpRight size={18} aria-hidden="true" />
          </SiteLink>
        </div>
      </section>
    </div>
  );
}
