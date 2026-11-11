import { ArrowUpRight } from "lucide-react";
import { IMAGES } from "../../utils/Constant";
import { ImageCarousel, SiteLink } from "../sharedUi/Interactive";
const HomeTechnology = () => {
  return (
    <div
      className="layout-item home-technology layout-full layout-flex layout section-root is-loaded"
      id="technology"
    >
      <div className="layout-item home-technology__image width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="900"
            height="740"
            src={IMAGES.unicode_dd0f4e2e_4d66_49dd_b9d4_34b8b194f346}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item home-technology__image-2 width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="760"
            height="670"
            src={IMAGES.unicode_33e57ee7_6320_4f06_896a_083a2f104e78}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item home-technology__layout layout-flex layout-boxed layout is-loaded">
        <div className="layout-inner is-loaded">
          <div className="layout-item home-technology__layout-2 layout-full layout-flex layout is-loaded">
            <div className="layout-item home-technology__image-3 width-custom content-block block-image">
              <div className="content-inner">
                <img
                  loading="lazy"
                  decoding="async"
                  width="7"
                  height="7"
                  src={IMAGES.unicode_5664d042_78af_443a_9b2b_7279e73b5fc0}
                  alt=""
                />
              </div>
            </div>
            <div className="layout-item home-technology__technology-architecture content-block block-heading">
              <div className="content-inner">
                <div className="heading">TECHNOLOGY &amp; ARCHITECTURE</div>
              </div>
            </div>
          </div>
          <div className="layout-item home-technology__spacer content-block block-spacer">
            <div className="content-inner">
              <div className="ui-spacer">
                <div className="ui-spacer-inner"></div>
              </div>
            </div>
          </div>
          <div className="layout-item home-technology__layout-3 layout-full layout-flex layout is-loaded">
            <div className="layout-item home-technology__layout-4 layout-full layout-flex layout is-loaded">
              <div className="layout-item home-technology__built-with-the-right-technology-eng content-block block-heading">
                <div className="content-inner">
                  <h2 className="heading">
                    Built with the right technology. Engineered for what comes
                    next.
                  </h2>
                </div>
              </div>
            </div>
            <div className="layout-item home-technology__layout-5 layout-full layout-flex layout is-loaded">
              <div className="layout-item home-technology__from-product-interfaces-and-mobile-a content-block block-heading">
                <div className="content-inner">
                  <div className="heading">
                    From product interfaces and mobile apps to backend systems,
                    AI infrastructure and production delivery, we choose each
                    layer around performance, scale and long-term
                    maintainability.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="layout-item home-technology__spacer-2 content-block block-spacer">
            <div className="content-inner">
              <div className="ui-spacer">
                <div className="ui-spacer-inner"></div>
              </div>
            </div>
          </div>
          <div className="layout-item home-technology__product-mobile-web content-block block-heading">
            <div className="content-inner">
              <div className="heading">PRODUCT · MOBILE · WEB</div>
            </div>
          </div>
          <div className="layout-item home-technology__spacer-3 content-block block-spacer">
            <div className="content-inner">
              <div className="ui-spacer">
                <div className="ui-spacer-inner"></div>
              </div>
            </div>
          </div>
          <ImageCarousel
            className="layout-item home-technology__image-carousel home-achieve one content-block block-image-carousel layout-widget-swiper"
            desktop={6}
            tablet={4}
            mobile={3}
            gap={20}
            tabletGap={20}
            mobileGap={15}
            speed={4000}
            fade={false}
            autoplay
            reverseDirection
            delay={1}
            loop
          >
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_Next_js_1_0}
                  alt="Next.js"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_Python_1_0}
                  alt="Python"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_WordPress_1_0}
                  alt="WordPress"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_iOS_1_0}
                  alt="iOS"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_Android_1_0}
                  alt="Android"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_React_Native_1_0}
                  alt="React Native"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_React_1_0}
                  alt="React"
                />
              </figure>
            </div>
          </ImageCarousel>
          <div className="layout-item home-technology__divider block-divider--view-line content-block block-divider">
            <div className="content-inner">
              <div className="ui-divider">
                <span className="ui-divider-separator"></span>
              </div>
            </div>
          </div>
          <div className="layout-item home-technology__spacer-4 content-block block-spacer">
            <div className="content-inner">
              <div className="ui-spacer">
                <div className="ui-spacer-inner"></div>
              </div>
            </div>
          </div>
          <ImageCarousel
            className="layout-item home-technology__image-carousel-2 home-achieve two content-block block-image-carousel layout-widget-swiper"
            desktop={6}
            tablet={4}
            mobile={3}
            gap={20}
            tabletGap={20}
            mobileGap={15}
            speed={4000}
            fade={false}
            autoplay
            delay={1}
            loop
          >
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_Node_js_1_0}
                  alt="Node.js"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_GitHub_1_0}
                  alt="GitHub"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_OpenAI_1_0}
                  alt="OpenAI"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_MongoDB_1_0}
                  alt="MongoDB"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_Firebase_1_0}
                  alt="Firebase"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_AWS_1_0}
                  alt="AWS"
                />
              </figure>
            </div>
            <div className="swiper-slide-content">
              <figure>
                <img
                  loading="lazy"
                  decoding="async"
                  className="swiper-slide-image"
                  src={IMAGES.Tech_PostgreSQL_1_0}
                  alt="PostgreSQL"
                />
              </figure>
            </div>
          </ImageCarousel>
          <div className="layout-item home-technology__spacer-5 content-block block-spacer">
            <div className="content-inner">
              <div className="ui-spacer">
                <div className="ui-spacer-inner"></div>
              </div>
            </div>
          </div>
          <div className="layout-item home-technology__divider-2 block-divider--view-line content-block block-divider">
            <div className="content-inner">
              <div className="ui-divider">
                <span className="ui-divider-separator"></span>
              </div>
            </div>
          </div>
          <div className="layout-item home-technology__spacer-6 content-block block-spacer">
            <div className="content-inner">
              <div className="ui-spacer">
                <div className="ui-spacer-inner"></div>
              </div>
            </div>
          </div>
          <div className="layout-item home-technology__layout-6 layout-full layout-flex layout is-loaded">
            <div className="layout-item home-technology__web-mobile-ai-cloud-commerce content-block block-heading">
              <div className="content-inner">
                <div className="heading">
                  WEB · MOBILE · AI · CLOUD · COMMERCE · INTEGRATIONS
                </div>
              </div>
            </div>
            <div className="layout-item home-technology__button ui-align-right content-block">
              <div className="content-inner">
                <div>
                  <SiteLink className="button" href="#services">
                    <span className="button-content">
                      <span className="button-icon">
                        <ArrowUpRight size={"1em"} aria-hidden="true" />
                      </span>
                      <span className="button-label">
                        Explore engineering capabilities
                      </span>
                    </span>
                  </SiteLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeTechnology;
