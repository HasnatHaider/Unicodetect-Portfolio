import { ArrowRight } from "lucide-react";
import { SiteLink } from "../sharedUi/Interactive";
import { WordpressDevelopmentEyebrow } from "./WordpressDevelopmentSectionHeading";
import PageBreadcrumb from "../sharedUi/PageBreadcrumb";

const WordpressDevelopmentHero = () => (
  <section
    className="service-section wp-dev-hero service-hero-theme"
    aria-labelledby="wp-dev-hero-title"
  >
    <div className="service-container">
      <div className="wp-dev-hero-content">
        <PageBreadcrumb extraBottomMargin />
        <WordpressDevelopmentEyebrow>
          WORDPRESS SYSTEMS DEVELOPMENT
        </WordpressDevelopmentEyebrow>
        <h1 id="wp-dev-hero-title" className="service-hero-title">
          Custom WordPress, built for extreme enterprise speeds.
        </h1>
        <p className="services-pain-point">
          Stuck with a sluggish, builder-bloated WordPress site that&#39;s hard
          to manage?
        </p>
        <p className="service-hero-description">
          We engineer clean-coded, secure, Gutenberg systems and headless
          setups. Zero visual page-builder bloat, zero slow assets — just easily
          manageable content at scale with lightning performance.
        </p>
        <div className="wp-dev-actions">
          <SiteLink
            schedule
            className="wp-dev-button wp-dev-button-primary service-hero-button service-hero-button--primary"
          >
            Book a Strategy Call
          </SiteLink>
          <SiteLink
            href="/wordpress-development#wordpress-development-case-study"
            className="wp-dev-button wp-dev-button-outline service-hero-button service-hero-button--secondary"
          >
            Explore Case Studies <ArrowRight size={16} aria-hidden="true" />
          </SiteLink>
        </div>
        <p className="wp-dev-hero-path">
          Gutenberg Blocks <ArrowRight size={14} aria-hidden="true" /> Headless
          Decoupled WP <ArrowRight size={14} aria-hidden="true" /> Zero-Bloat
          Engineering
        </p>
      </div>
    </div>
  </section>
);

export default WordpressDevelopmentHero;
