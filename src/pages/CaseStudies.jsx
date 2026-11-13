import { ArrowUpRight } from "lucide-react";
import usePageMetadata from "../hooks/usePageMetadata";
import { listCaseStudies } from "../caseStudies";
import { paths } from "../routes/paths";
import { SiteLink } from "../components/sharedUi/Interactive";
import PageBreadcrumb from "../components/sharedUi/PageBreadcrumb";
import CaseStudyCard from "../components/caseStudySections/CaseStudyCard";
import "../assets/styles/pages/caseStudies.css";

export default function CaseStudies() {
  usePageMetadata({
    title: "Case Studies & Portfolio | UnicodeTech",
    description: "Explore UnicodeTech's portfolio of digital products including mobile apps, SaaS platforms, and marketplace solutions built for real businesses.",
    bodyClass: "site site-design case-studies-page-body",
  });
  return (
    <div className="page-content portfolio-page">
      <section
        className="portfolio-hero service-hero-theme"
        aria-labelledby="portfolio-title"
      >
        <div className="portfolio-container">
          <div>
            <PageBreadcrumb />
            <span className="portfolio-eyebrow">OUR WORK</span>
            <h1 id="portfolio-title" className="service-hero-title">
              Ideas brought to life.
            </h1>
            <p className="service-hero-description">
              Explore digital products built around real business needs — from
              dining and wellness to connected mobile and web platforms.
            </p>
            <div className="portfolio-actions">
              <a
                href="#portfolio-projects"
                className="service-hero-button service-hero-button--primary"
              >
                Explore the Projects{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <SiteLink
                href={paths.contact}
                className="service-hero-button service-hero-button--secondary"
              >
                Book a Strategy Call
              </SiteLink>
            </div>
          </div>
        </div>
      </section>
      <section
        id="portfolio-projects"
        className="portfolio-project-section"
        aria-labelledby="portfolio-projects-title"
      >
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <div>
              <span className="portfolio-eyebrow">OUR PORTFOLIO</span>
              <h2 id="portfolio-projects-title">
                Different ideas. Purposeful solutions.
              </h2>
            </div>
            <p>
              Discover the projects, their purpose, and the technologies behind
              them.
            </p>
          </div>
          <div id="portfolio-grid" className="portfolio-grid">
            {listCaseStudies().map((project) => (
              <CaseStudyCard project={project} key={project.slug} />
            ))}
          </div>
        </div>
      </section>
      <section className="portfolio-cta" aria-labelledby="portfolio-cta-title">
        <div className="portfolio-container">
          <span className="portfolio-eyebrow">YOUR NEXT PROJECT</span>
          <h2 id="portfolio-cta-title">Let’s bring your idea to life.</h2>
          <p>
            Share what you’re planning. We’ll help you explore the right
            direction for your product.
          </p>
          <SiteLink href={paths.contact} className="portfolio-cta-button">
            Book a Strategy Call <ArrowUpRight size={18} aria-hidden="true" />
          </SiteLink>
        </div>
      </section>
    </div>
  );
}
