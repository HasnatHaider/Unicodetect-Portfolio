import { IMAGES } from "../../utils/Constant";
import ReviewCard from "../sharedUi/ReviewCard";
import { clientReviews } from "../../utils/clientReviews";
const MobileCaseStudy = () => {
  return (
    <div
      className="layout-item mobile-case-study layout-full layout-flex layout section-root is-loaded"
      id="mobile-case-study"
    >
      <div className="layout-item mobile-case-study__image width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="806"
            height="300"
            src={IMAGES.unicode_mobile_29e4ecd3_9e4b_4118_a19e_30870d0b7ad6}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item mobile-case-study__layout layout-flex layout-boxed layout is-loaded">
        <div className="layout-inner is-loaded">
          <div className="layout-item mobile-case-study__layout-2 layout-full layout-flex layout is-loaded">
            <div className="layout-item mobile-case-study__layout-3 layout-full layout-flex layout is-loaded">
              <div className="layout-item mobile-case-study__layout-4 layout-full layout-flex layout is-loaded">
                <div className="layout-item mobile-case-study__image-2 width-custom content-block block-image">
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
                <div className="layout-item mobile-case-study__featured-case-study content-block block-heading">
                  <div className="content-inner">
                    <p className="heading">Featured Case Study</p>
                  </div>
                </div>
              </div>
              <div className="layout-item mobile-case-study__rebuilding-spin-the-night-across-mob width-custom content-block block-heading">
                <div className="content-inner">
                  <h2 className="heading">
                    Rebuilding Spin The Night across mobile ecosystem.
                  </h2>
                </div>
              </div>
              <div className="layout-item mobile-case-study__we-took-a-fragmented-legacy-product content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    We partnered with Spin The Night to evolve a cross-device
                    React Native product spanning iOS, Android, and tablet —
                    delivering location-based dining and event discovery through
                    a multi-year engineering relationship.
                  </p>
                </div>
              </div>
              <div className="layout-item mobile-case-study__layout-5 layout-full layout-flex layout is-loaded">
                <ReviewCard
                  review={clientReviews.flaviusdarity}
                  variant="embedded"
                />
              </div>
            </div>
            {}
            <div className="layout-item mobile-case-study__layout-6 layout-full layout-flex layout is-loaded">
              <div className="layout-item mobile-case-study__layout-7 layout-full layout-flex layout is-loaded">
                <div className="layout-item mobile-case-study__3x-faster content-block block-heading">
                  <div className="content-inner">
                    <h3 className="heading">4.6★</h3>
                  </div>
                </div>
                <div className="layout-item mobile-case-study__app-transition-page-load-speeds content-block block-heading">
                  <div className="content-inner">
                    <p className="heading">
                      App Store user rating
                    </p>
                  </div>
                </div>
              </div>
              <div className="layout-item mobile-case-study__layout-8 layout-full layout-flex layout is-loaded">
                <div className="layout-item mobile-case-study__98 content-block block-heading">
                  <div className="content-inner">
                    <h3 className="heading">20k+</h3>
                  </div>
                </div>
                <div className="layout-item mobile-case-study__completely-crash-free-user-sessions content-block block-heading">
                  <div className="content-inner">
                    <p className="heading">
                      Active platform users
                    </p>
                  </div>
                </div>
              </div>
              <div className="layout-item mobile-case-study__layout-9 layout-full layout-flex layout is-loaded">
                <div className="layout-item mobile-case-study__40 content-block block-heading">
                  <div className="content-inner">
                    <h3 className="heading">iOS · Android · Tablet</h3>
                  </div>
                </div>
                <div className="layout-item mobile-case-study__increase-in-active-user-engagement content-block block-heading">
                  <div className="content-inner">
                    <p className="heading">
                      Cross-device React Native delivery
                    </p>
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
export default MobileCaseStudy;
