import { paths } from "../../routes/paths";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "../../utils/Constant";
import { SiteLink } from "../sharedUi/Interactive";
import PageBreadcrumb from "../sharedUi/PageBreadcrumb";
const ShopifyHeroSection = () => {
  return (
    <div
      className="layout-item shopify-hero-section layout-full is-loaded layout-flex layout section-root service-hero-theme"
      id="shopify-hero_section"
    >
      <div className="layout-item shopify-hero-section__layout is-loaded layout-flex layout-boxed layout">
        <div className="layout-inner is-loaded">
          <div className="layout-item shopify-hero-section__layout-2 layout-full is-loaded layout-flex layout">
              <PageBreadcrumb />
            <div className="layout-item shopify-hero-section__layout-3 layout-full is-loaded layout-flex layout">
              <div className="layout-item shopify-hero-section__image width-custom content-block block-image">
                <div className="content-inner">
                  <img
                    decoding="async"
                    width="8"
                    height="8"
                    src={IMAGES.unicode_shopify_2215_929}
                    alt=""
                  />
                </div>
              </div>
              <div className="layout-item shopify-hero-section__shopify-e-commerce-solutions width-auto content-block block-heading">
                <div className="content-inner">
                  <p className="heading">SHOPIFY &amp; E-COMMERCE SOLUTIONS</p>
                </div>
              </div>
            </div>
            <div className="layout-item shopify-hero-section__bespoke-storefronts-built-for-high-c content-block block-heading">
              <div className="content-inner">
                <h1 className="heading service-hero-title">
                  Bespoke Storefronts Built for High Conversions.
                </h1>
              </div>
            </div>
            <div className="layout-item shopify-hero-section__pain-point content-block block-heading">
              <div className="content-inner">
                <p className="services-pain-point">
                  Losing sales to a slow, generic storefront that doesn&#39;t reflect your brand?
                </p>
              </div>
            </div>
            <div className="layout-item shopify-hero-section__we-design-and-build-bespoke-lightni content-block block-heading">
              <div className="content-inner">
                <p className="heading service-hero-description">
                  We design and build bespoke, lightning-fast Shopify stores,
                  custom headless checkouts, and strategic integrations that
                  turn standard store traffic into brand loyalists.
                </p>
              </div>
            </div>
            <div className="layout-item shopify-hero-section__layout-4 layout-full is-loaded layout-flex layout">
              <div className="layout-item shopify-hero-section__button ui-align-left width-auto content-block">
                <div className="content-inner">
                  <div>
                    <SiteLink
                      schedule
                      className="button service-hero-button service-hero-button--primary"
                    >
                      <span className="button-content">
                        <span className="button-label">
                          Book a Strategy Call
                        </span>
                      </span>
                    </SiteLink>
                  </div>
                </div>
              </div>
              <div className="layout-item shopify-hero-section__button-2 ui-align-left width-auto content-block">
                <div className="content-inner">
                  <div>
                    <SiteLink
                      className="button service-hero-button service-hero-button--secondary"
                      href={paths.caseStudies}
                    >
                      <span className="button-content">
                        <span className="button-label">View Case Studies</span>
                      </span>
                    </SiteLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item shopify-hero-section__layout-5 layout-full is-loaded layout-flex layout">
              <div className="layout-item shopify-hero-section__custom-themes width-auto content-block block-heading">
                <div className="content-inner">
                  <p className="heading">Custom Themes</p>
                </div>
              </div>
              <div className="layout-item shopify-hero-section__heading width-auto content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    <ArrowRight size={"1em"} aria-hidden="true" />
                  </p>
                </div>
              </div>
              <div className="layout-item shopify-hero-section__headless-commerce width-auto content-block block-heading">
                <div className="content-inner">
                  <p className="heading">Headless Commerce</p>
                </div>
              </div>
              <div className="layout-item shopify-hero-section__heading-2 width-auto content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    <ArrowRight size={"1em"} aria-hidden="true" />
                  </p>
                </div>
              </div>
              <div className="layout-item shopify-hero-section__erp-api-sync width-auto content-block block-heading">
                <div className="content-inner">
                  <p className="heading">ERP &amp; API Sync</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopifyHeroSection;
