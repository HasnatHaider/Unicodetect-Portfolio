import { IMAGES } from "../../utils/Constant";
import { ImageCarousel } from "../sharedUi/ImageCarousel";
import { clientLogos } from "../../utils/clientLogos";

const officialLogo = (id) => ({
  src: clientLogos[id].transparentSrc || clientLogos[id].src,
  alt: clientLogos[id].alt,
  official: true,
});

// Official client-supplied logos first; the remaining three are the existing
// monochrome company marks already used in this strip.
const trustedLogos = [
  officialLogo("bms"),
  officialLogo("liftpitch"),
  officialLogo("spinTheNight"),
  officialLogo("quickzip"),
  {
    src: IMAGES.Image_1_e1790338579351_1024x312,
    alt: "Maven Technologies logo",
  },
  officialLogo("carecompass"),
  officialLogo("iconicBeauti"),
  officialLogo("taskhive"),
  {
    src: IMAGES.Logo_Image_04_Replace_This_Fill_e1790338671732,
    alt: "Jayda Cheaves Beauty logo",
  },
  officialLogo("dailydigest"),
  officialLogo("contractorconnect"),
  {
    src: IMAGES.Logo_Image_06_Replace_This_Fill_e1790338733313,
    alt: "VirsaMigrate Overseas Recruitment logo",
  },
  officialLogo("boatBuddy"),
];
const HomeExperience = () => {
  return (
    <div
      id="experience"
      className="layout-item home-proven-delivery-long-term-partnerships proven-delivery-container layout-flex layout-boxed layout section-root is-loaded"
    >
      <div className="layout-inner is-loaded">
        <div className="layout-item home-proven-delivery-long-term-partnerships__layout layout-full layout-flex layout is-loaded">
          <div className="layout-item home-proven-delivery-long-term-partnerships__image width-custom content-block block-image">
            <div className="content-inner">
              <img
                loading="lazy"
                decoding="async"
                width="8"
                height="8"
                src={IMAGES.unicode_f7a0ebc7_0c17_42fb_868f_f8b7cfff7702}
                alt=""
              />
            </div>
          </div>
          <div className="layout-item home-proven-delivery-long-term-partnerships__proven-delivery-long-term-partners content-block block-heading">
            <div className="content-inner">
              <div className="heading">
                PROVEN DELIVERY • LONG-TERM PARTNERSHIPS
              </div>
            </div>
          </div>
        </div>
        <div className="layout-item home-proven-delivery-long-term-partnerships__layout-2 layout-full layout-flex layout is-loaded">
          <div className="layout-item home-proven-delivery-long-term-partnerships__experience-that-shows-up-in-the-prod width-custom content-block block-heading">
            <div className="content-inner">
              <h2 className="heading">
                {"Experience that shows up\nin the product."}
              </h2>
            </div>
          </div>
          <div className="layout-item home-proven-delivery-long-term-partnerships__layout-3 layout-full layout-flex layout is-loaded">
            <div className="layout-item home-proven-delivery-long-term-partnerships__we-build-ai-saas-web-and-mobile-pr content-block block-heading">
              <div className="content-inner">
                <h3 className="heading">
                  We build AI, SaaS, web and mobile products for real operations
                  — from strategy through production.
                </h3>
              </div>
            </div>
            <div className="layout-item home-proven-delivery-long-term-partnerships__built-across-markets-shipped-with-c content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Built across markets. Shipped with care. Supported beyond
                  launch.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="layout-item home-proven-delivery-long-term-partnerships__layout-4 layout-full dark-gradient layout-flex layout is-loaded">
          <div className="layout-item home-proven-delivery-long-term-partnerships__layout-5 proven-stat-card layout-full layout-flex layout is-loaded">
            <div className="layout-item home-proven-delivery-long-term-partnerships__160 content-block block-heading">
              <div className="content-inner">
                <p className="heading">7 Products</p>
              </div>
            </div>
            <div className="layout-item home-proven-delivery-long-term-partnerships__projects-delivered content-block block-heading">
              <div className="content-inner">
                <p className="heading">Built for One Partner</p>
              </div>
            </div>
            <div className="layout-item home-proven-delivery-long-term-partnerships__ai-saas-mobile-web width-custom no-wrap content-block block-heading">
              <div className="content-inner">
                <span className="heading">BMS multi-app ecosystem</span>
              </div>
            </div>
          </div>
          <div className="layout-item home-proven-delivery-long-term-partnerships__layout-6 proven-stat-card layout-full layout-flex layout is-loaded">
            <div className="layout-item home-proven-delivery-long-term-partnerships__8-years content-block block-heading">
              <div className="content-inner">
                <p className="heading">End-to-End</p>
              </div>
            </div>
            <div className="layout-item home-proven-delivery-long-term-partnerships__engineering-experience content-block block-heading">
              <div className="content-inner">
                <p className="heading">Full-Cycle Development</p>
              </div>
            </div>
            <div className="layout-item home-proven-delivery-long-term-partnerships__production-grade-engineering width-custom no-wrap content-block block-heading">
              <div className="content-inner">
                <span className="heading">From strategy to production</span>
              </div>
            </div>
          </div>
          <div className="layout-item home-proven-delivery-long-term-partnerships__layout-7 proven-stat-card layout-full layout-flex layout is-loaded">
            <div className="layout-item home-proven-delivery-long-term-partnerships__multi-year content-block block-heading">
              <div className="content-inner">
                <p className="heading">Multi-Year</p>
              </div>
            </div>
            <div className="layout-item home-proven-delivery-long-term-partnerships__client-partnerships content-block block-heading">
              <div className="content-inner">
                <p className="heading">Client Partnerships</p>
              </div>
            </div>
            <div className="layout-item home-proven-delivery-long-term-partnerships__built-for-long-term-collaboration width-custom no-wrap content-block block-heading">
              <div className="content-inner">
                <span className="heading">
                  Built for long-term collaboration
                </span>
              </div>
            </div>
          </div>
          <div className="layout-item home-proven-delivery-long-term-partnerships__layout-8 proven-stat-card layout-full layout-flex layout is-loaded">
            <div className="layout-item home-proven-delivery-long-term-partnerships__global content-block block-heading">
              <div className="content-inner">
                <p className="heading">Global</p>
              </div>
            </div>
            <div className="layout-item home-proven-delivery-long-term-partnerships__product-delivery content-block block-heading">
              <div className="content-inner">
                <p className="heading">Product Delivery</p>
              </div>
            </div>
            <div className="layout-item home-proven-delivery-long-term-partnerships__cross-border-product-execution width-custom no-wrap content-block block-heading">
              <div className="content-inner">
                <span className="heading">Cross-border product execution</span>
              </div>
            </div>
          </div>
        </div>
        <div className="layout-item home-proven-delivery-long-term-partnerships__layout-9 layout-full layout-flex layout is-loaded">
          <div className="layout-item home-proven-delivery-long-term-partnerships__trusted-by-teams-we-ve-built-with content-block block-heading">
            <div className="content-inner">
              <p className="heading">TRUSTED BY TEAMS WE’VE BUILT WITH</p>
            </div>
          </div>
          <ImageCarousel
            className="layout-item home-proven-delivery-long-term-partnerships__image-carousel image-slider-container content-block block-image-carousel layout-widget-swiper"
            desktop={6}
            tablet={4}
            mobile={3}
            gap={20}
            tabletGap={20}
            mobileGap={20}
            speed={4000}
          >
            {trustedLogos.map((logo) => (
              <div className="swiper-slide-content" key={logo.alt}>
                <figure>
                  <img
                    loading="lazy"
                    decoding="async"
                    className={`swiper-slide-image trusted-logo${logo.official ? " trusted-logo--official" : ""}`}
                    src={logo.src}
                    width="150"
                    height="50"
                    alt={logo.alt}
                  />
                </figure>
              </div>
            ))}
          </ImageCarousel>
        </div>
      </div>
    </div>
  );
};
export default HomeExperience;
