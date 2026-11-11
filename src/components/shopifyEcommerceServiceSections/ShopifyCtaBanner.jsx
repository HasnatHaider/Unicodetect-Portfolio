import { companyContent } from "../../utils/companyContent";
import { IMAGES } from "../../utils/Constant";
import { SiteLink } from "../sharedUi/Interactive";
const ShopifyCtaBanner = () => {
  return (
    <div
      className="layout-item shopify-cta-banner layout-full is-loaded layout-flex layout section-root"
      id="shopify-cta-banner"
    >
      <div className="layout-item shopify-cta-banner__image width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="275"
            height="300"
            src={IMAGES.unicode_shopify_2215_1178}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item shopify-cta-banner__image-2 width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="440"
            height="470"
            src={IMAGES.unicode_shopify_2215_1179}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item shopify-cta-banner__layout is-loaded layout-flex layout-boxed layout">
        <div className="layout-inner is-loaded">
          <div className="layout-item shopify-cta-banner__layout-2 layout-full is-loaded layout-flex layout">
            <div className="layout-item shopify-cta-banner__layout-3 layout-full is-loaded layout-flex layout">
              <div className="layout-item shopify-cta-banner__layout-4 layout-full is-loaded layout-flex layout">
                <div className="layout-item shopify-cta-banner__discuss-a-commerce-workflow-with-an content-block block-heading">
                  <div className="content-inner">
                    <h2 className="heading">
                      Discuss a commerce workflow with an engineer.
                    </h2>
                  </div>
                </div>
                <div className="layout-item shopify-cta-banner__send-us-the-friction-points-in-your content-block block-heading">
                  <div className="content-inner">
                    <p className="heading">
                      Send us the friction points in your checkout or
                      storefront. We will map them out, recommend optimal tech
                      stack paths, and scope the smallest custom build that
                      immediately proves business value.
                    </p>
                  </div>
                </div>
              </div>
              <div className="layout-item shopify-cta-banner__layout-5 layout-full is-loaded layout-flex layout">
                <div className="layout-item shopify-cta-banner__layout-6 layout-full is-loaded layout-flex layout">
                  <div className="layout-item shopify-cta-banner__email-us width-custom content-block block-heading">
                    <div className="content-inner">
                      <p className="heading shopifyCta">EMAIL US</p>
                    </div>
                  </div>
                  <div className="layout-item shopify-cta-banner__hello-unicodetech-com content-block block-heading">
                    <div className="content-inner">
                      <p className="heading">
                        <SiteLink
                          target="_blank"
                          href="mailto:info@unicodetech.com"
                          className="ctaHref"
                        >
                          info@unicodetech.com
                        </SiteLink>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="layout-item shopify-cta-banner__layout-7 layout-full is-loaded layout-flex layout">
                  <div className="layout-item shopify-cta-banner__call-us width-custom content-block block-heading">
                    <div className="content-inner">
                      <p className="heading shopifyCta">CALL US</p>
                    </div>
                  </div>
                  <div className="layout-item shopify-cta-banner__1-800-unicode content-block block-heading">
                    <div className="content-inner">
                      <p className="heading ctaNumAlign">
                        <SiteLink
                          href={companyContent.office.phoneHref}
                          className="ctaHref"
                        >
                          {companyContent.office.phone}
                        </SiteLink>
                        {" · "}
                        <SiteLink
                          href={companyContent.consultationPhoneHref}
                          className="ctaHref"
                        >
                          {companyContent.consultationPhone}
                        </SiteLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item shopify-cta-banner__layout-8 layout-full is-loaded layout-flex layout">
              <div className="layout-item shopify-cta-banner__button ui-align-left width-auto content-block">
                <div className="content-inner">
                  <div>
                    <SiteLink schedule className="button">
                      <span className="button-content">
                        <span className="button-label">
                          Book a Strategy Call
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
    </div>
  );
};
export default ShopifyCtaBanner;
