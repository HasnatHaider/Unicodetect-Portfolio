import { paths } from "../../routes/paths";
import { IMAGES } from "../../utils/Constant";
import { SiteLink } from "../sharedUi/Interactive";
import PageBreadcrumb from "../sharedUi/PageBreadcrumb";
const MobileHero = () => {
  return (
    <div
      className="layout-item mobile-hero layout-full layout-flex layout section-root is-loaded service-hero-theme"
      id="mobile-hero"
    >
      <div className="layout-item mobile-hero__layout layout-flex layout-boxed layout is-loaded">
        <div className="layout-inner is-loaded">
          <div className="layout-item mobile-hero__layout-2 layout-full layout-flex layout is-loaded">
              <PageBreadcrumb />
            <div className="layout-item mobile-hero__layout-3 layout-full layout-flex layout is-loaded">
              <div className="layout-item mobile-hero__image width-custom content-block block-image">
                <div className="content-inner">
                  <img
                    decoding="async"
                    width="7"
                    height="7"
                    src={
                      IMAGES.unicode_mobile_52f23651_84c9_4b91_9621_4d1b34f62e68
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="layout-item mobile-hero__core-engineering-service content-block block-heading">
                <div className="content-inner">
                  <p className="heading">MOBILE &amp; WEB ENGINEERING</p>
                </div>
              </div>
            </div>
            <div className="layout-item mobile-hero__high-performance-apps-responsive-w content-block block-heading">
              <div className="content-inner">
                <h1 className="heading service-hero-title">
                  High-performance apps &amp; responsive web products.
                </h1>
              </div>
            </div>
            <div className="layout-item mobile-hero__pain-point content-block block-heading">
              <div className="content-inner">
                <p className="services-pain-point">
                  Struggling with an app that crashes, runs slow, or doesn&#39;t feel right on users&#39; devices?
                </p>
              </div>
            </div>
            <div className="layout-item mobile-hero__we-build-lightning-fast-ios-android content-block block-heading">
              <div className="content-inner">
                <p className="heading service-hero-description">
                  We build lightning-fast iOS, Android, and web products focused
                  on real-world utility, native performance, and beautiful user
                  experience.
                </p>
              </div>
            </div>
            <div className="layout-item mobile-hero__layout-4 layout-full layout-flex layout is-loaded">
              <div className="layout-item mobile-hero__button ui-align-left width-auto content-block">
                <div className="content-inner">
                  <div>
                    <SiteLink
                      schedule
                      className="button service-hero-button service-hero-button--primary"
                    >
                      <span className="button-content">
                        <span className="button-label">Book a Strategy Call</span>
                      </span>
                    </SiteLink>
                  </div>
                </div>
              </div>
              <div className="layout-item mobile-hero__button-2 ui-align-left width-auto content-block">
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default MobileHero;
