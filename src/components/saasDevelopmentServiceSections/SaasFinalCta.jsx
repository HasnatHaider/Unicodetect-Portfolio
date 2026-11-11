import { SiteLink } from "../sharedUi/Interactive";
const SaasFinalCta = () => {
  return (
    <div
      className="layout-item saas-final-cta layout-full layout-flex layout section-root is-loaded"
      id="saas-final-cta"
    >
      <div className="layout-item saas-final-cta__layout layout-flex layout-boxed layout is-loaded">
        <div className="layout-inner is-loaded">
          <div className="layout-item saas-final-cta__layout-2 layout-full layout-flex layout is-loaded">
            <div className="layout-item saas-final-cta__ready-to-build-your-saas-product content-block block-heading">
              <div className="content-inner">
                <h2 className="heading">
                  Ready to Build Your
                  <br />
                  SaaS Product?
                </h2>
              </div>
            </div>
            <div className="layout-item saas-final-cta__book-a-strategy-call-description content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Book a strategy call. We will map out your goals, assess your
                  architecture needs, and outline a clear path to production.
                </p>
              </div>
            </div>
            <div className="layout-item saas-final-cta__button ui-align-center width-auto content-block">
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
            <div className="layout-item saas-final-cta__free-30-minutes-no-commitment content-block block-heading">
              <div className="content-inner">
                <p className="heading">Free • 30 minutes • No commitment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SaasFinalCta;
