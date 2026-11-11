import { IMAGES } from "../../utils/Constant";
import { SiteLink } from "../sharedUi/Interactive";
const MobileGetStarted = () => {
  return (
    <div
      className="layout-item mobile-get-started layout-full is-loaded layout-flex layout section-root"
      id="mobile-get-started"
    >
      <div className="layout-item mobile-get-started__layout is-loaded layout-flex layout-boxed layout">
        <div className="layout-inner is-loaded">
          <div className="layout-item mobile-get-started__layout-2 layout-full layout-flex layout is-loaded">
            <div className="layout-item mobile-get-started__layout-3 layout-full layout-flex layout is-loaded">
              <div className="layout-item mobile-get-started__image width-custom content-block block-image">
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
              <div className="layout-item mobile-get-started__get-started content-block block-heading">
                <div className="content-inner">
                  <p className="heading">Get Started</p>
                </div>
              </div>
            </div>
            <div className="layout-item mobile-get-started__ready-to-build-your-next-product width-custom content-block block-heading">
              <div className="content-inner">
                <h2 className="heading">Ready to build your next product?</h2>
              </div>
            </div>
            <div className="layout-item mobile-get-started__schedule-a-strategy-consultation-cal width-custom content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Schedule a strategy consultation call with our product
                  architects. We’ll sketch a direct scope, timeline, and tech
                  architecture.
                </p>
              </div>
            </div>
            <div className="layout-item mobile-get-started__layout-4 layout-full layout-flex layout is-loaded">
              <div className="layout-item mobile-get-started__button ui-align-left width-auto content-block">
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
              <div className="layout-item mobile-get-started__button-2 ui-align-left width-auto content-block">
                <div className="content-inner">
                  <div>
                    <SiteLink
                      className="button"
                      href="/saas-development#saas-engagement"
                    >
                      <span className="button-content">
                        <span className="button-label">
                          Compare Engagement Models
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
export default MobileGetStarted;
