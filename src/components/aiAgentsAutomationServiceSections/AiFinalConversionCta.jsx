import { IMAGES } from "../../utils/Constant";
import { SiteLink } from "../sharedUi/Interactive";
import ServiceInquiryForm from "../sharedUi/ServiceInquiryForm";

const AiFinalConversionCta = () => {
  return (
    <div
      className="layout-item ai-final-conversion-cta layout-full layout-flex layout section-root is-loaded"
      id="ai-final-conversion-cta"
    >
      <div className="layout-item ai-final-conversion-cta__image width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="1180"
            height="700"
            src={IMAGES.unicode_ai_e00b33e2_5308_4d15_bc4d_634f8fd5a260}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item ai-final-conversion-cta__layout layout-flex layout-boxed layout is-loaded">
        <div className="layout-inner is-loaded">
          <div className="layout-item ai-final-conversion-cta__layout-2 layout-full layout-flex layout is-loaded">
            <div className="layout-item ai-final-conversion-cta__ready-to-add-intelligenceto-your-pro content-block block-heading">
              <div className="content-inner">
                <h2 className="heading">
                  Ready to add intelligence
                  <br />
                  to your product?
                </h2>
              </div>
            </div>
            <div className="layout-item ai-final-conversion-cta__book-a-free-product-strategy-call-w content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Book a free product strategy call. We will map out your goals,
                  assess your timeline and opportunities, and demonstrate how UnicodeTech
                  speeds up deployment.
                </p>
              </div>
            </div>
            <div className="layout-item ai-final-conversion-cta__button ui-align-center width-auto content-block">
              <div className="content-inner">
                <div>
                  <SiteLink schedule className="button">
                    <span className="button-content">
                      <span className="button-label">Book a Strategy Call</span>
                    </span>
                  </SiteLink>
                </div>
              </div>
            </div>
            <div className="layout-item ai-final-conversion-cta__free-30-minutes-no-commitment content-block block-heading">
              <div className="content-inner">
                <p className="heading">Free • 30 minutes • No commitment</p>
              </div>
            </div>
            {/* <div className="layout-item content-block" style={{ marginTop: "24px" }}>
              <div className="content-inner">
                <ServiceInquiryForm service="AI Agents & Automation" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiFinalConversionCta;
