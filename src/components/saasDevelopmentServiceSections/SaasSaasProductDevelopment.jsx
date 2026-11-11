import { paths } from "../../routes/paths";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "../../utils/Constant";
import { SiteLink } from "../sharedUi/Interactive";
import PageBreadcrumb from "../sharedUi/PageBreadcrumb";
const SaasSaasProductDevelopment = () => {
  return (
    <div
      className="layout-item saas-saas-product-development layout-full layout-flex layout section-root is-loaded service-hero-theme"
      id="saas-saas-product-development"
    >
      <div className="layout-item saas-saas-product-development__layout layout-flex layout-boxed layout is-loaded">
        <div className="layout-inner is-loaded">
          <div className="layout-item saas-saas-product-development__layout-2 layout-full layout-flex layout is-loaded">
              <PageBreadcrumb />
            <div className="layout-item saas-saas-product-development__layout-3 layout-full layout-flex layout is-loaded">
              <div className="layout-item saas-saas-product-development__image width-custom content-block block-image">
                <div className="content-inner">
                  <img
                    decoding="async"
                    width="8"
                    height="8"
                    src={
                      IMAGES.unicode_saas_7c4da2ae_084d_4c77_a26f_189e0025b03b
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="layout-item saas-saas-product-development__saas-product-development content-block block-heading">
                <div className="content-inner">
                  <p className="heading">SaaS Product Development</p>
                </div>
              </div>
            </div>
            <div className="layout-item saas-saas-product-development__saas-products-built-to-scale-monet content-block block-heading">
              <div className="content-inner">
                <h1 className="heading service-hero-title">
                  SaaS Products Built to Scale &amp; Monetize.
                </h1>
              </div>
            </div>
            <div className="layout-item saas-saas-product-development__pain-point content-block block-heading">
              <div className="content-inner">
                <p className="services-pain-point">
                  Is your platform struggling to keep up with your customers?
                </p>
              </div>
            </div>
            <div className="layout-item saas-saas-product-development__we-engineer-high-performance-multi-t content-block block-heading">
              <div className="content-inner">
                <p className="heading service-hero-description">
                  We engineer high-performance multi-tenant platforms, flexible
                  subscription billing systems, enterprise dashboards, and
                  secure operational backends designed to grow with your
                  business.
                </p>
              </div>
            </div>
            <div className="layout-item saas-saas-product-development__layout-4 layout-full layout-flex layout is-loaded">
              <div className="layout-item saas-saas-product-development__button ui-align-left width-auto content-block">
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
              <div className="layout-item saas-saas-product-development__button-2 ui-align-left width-auto content-block">
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
            <div className="layout-item saas-saas-product-development__layout-5 layout-full layout-flex layout is-loaded">
              <div className="layout-item saas-saas-product-development__multi-tenancy width-auto content-block block-heading">
                <div className="content-inner">
                  <p className="heading">Multi-tenancy</p>
                </div>
              </div>
              <div className="layout-item saas-saas-product-development__heading width-auto content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    <ArrowRight size={"1em"} aria-hidden="true" />
                  </p>
                </div>
              </div>
              <div className="layout-item saas-saas-product-development__subscription-workflows width-auto content-block block-heading">
                <div className="content-inner">
                  <p className="heading">Subscription Workflows</p>
                </div>
              </div>
              <div className="layout-item saas-saas-product-development__heading-2 width-auto content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    <ArrowRight size={"1em"} aria-hidden="true" />
                  </p>
                </div>
              </div>
              <div className="layout-item saas-saas-product-development__enterprise-grade-backend width-auto content-block block-heading">
                <div className="content-inner">
                  <p className="heading">Enterprise-Grade Backend</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SaasSaasProductDevelopment;
