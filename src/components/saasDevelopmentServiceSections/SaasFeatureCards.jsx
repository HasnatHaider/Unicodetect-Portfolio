import { IMAGES } from "../../utils/Constant";
const SaasFeatureCards = () => {
  return (
    <div
      className="layout-item saas-feature-cards layout-full layout-flex layout section-root is-loaded"
      id="saas-feature-cards"
    >
      <div className="layout-item saas-feature-cards__image width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            decoding="async"
            width="1240"
            height="760"
            src={IMAGES.unicode_saas_d59bd937_4ef8_4eae_8bae_2ee76f492436}
            alt=""
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="layout-item saas-feature-cards__layout layout-flex layout-boxed layout is-loaded">
        <div className="layout-inner is-loaded">
          <div className="layout-item saas-feature-cards__layout-2 layout-full layout-flex layout is-loaded">
            <div className="layout-item saas-feature-cards__built-different-around-it content-block block-heading">
              <div className="content-inner">
                <p className="heading">HOW WE BUILD</p>
              </div>
            </div>
            <div className="layout-item saas-feature-cards__engineered-around-your-workflow-not width-auto content-block block-heading">
              <div className="content-inner">
                <h2 className="heading">
                  Engineered around your workflow,
                  <br />
                  not a template.
                </h2>
              </div>
            </div>
            <div className="layout-item saas-feature-cards__start-with-the-workflow-then-choos width-auto content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Start with the workflow — then choose the right model, tools
                  and level of automation.
                  <br />
                  Every build is scoped around measurable handoffs and real
                  operating cadence.
                </p>
              </div>
            </div>
          </div>
          <div className="layout-item saas-feature-cards__layout-3 layout-full layout-flex layout is-loaded">
            <div className="layout-item saas-feature-cards__layout-4 layout-full layout-flex layout is-loaded">
              <div className="layout-item saas-feature-cards__layout-5 layout-full layout-flex layout is-loaded"></div>
              <div className="layout-item saas-feature-cards__product-thinking-before-implementati content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    Product thinking before implementation
                  </p>
                </div>
              </div>
              <div className="layout-item saas-feature-cards__we-map-the-product-journey-user-flo content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    We map the product journey, user flow and data model before
                    a line of code is written - so the architecture reflects the
                    product, not the other way around.
                  </p>
                </div>
              </div>
            </div>
            <div className="layout-item saas-feature-cards__layout-6 layout-full layout-flex layout is-loaded">
              <div className="layout-item saas-feature-cards__layout-7 layout-full layout-flex layout is-loaded"></div>
              <div className="layout-item saas-feature-cards__one-accountable-team content-block block-heading">
                <div className="content-inner">
                  <p className="heading">One accountable team</p>
                </div>
              </div>
              <div className="layout-item saas-feature-cards__design-frontend-backend-and-qa-und content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    Design, frontend, backend and QA under one roof. No handoff
                    gaps between agencies. You get a single point of contact for
                    decisions, updates and delivery.
                  </p>
                </div>
              </div>
            </div>
            <div className="layout-item saas-feature-cards__layout-8 layout-full layout-flex layout is-loaded">
              <div className="layout-item saas-feature-cards__layout-9 layout-full layout-flex layout is-loaded"></div>
              <div className="layout-item saas-feature-cards__architecture-that-scales-with-you content-block block-heading">
                <div className="content-inner">
                  <p className="heading">Architecture that scales with you</p>
                </div>
              </div>
              <div className="layout-item saas-feature-cards__we-don-t-build-for-today-multi-tena content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    We don't build for today. Multi-tenancy, role-based access,
                    API-first design and cloud-native infrastructure are built
                    in from day one.
                  </p>
                </div>
              </div>
            </div>
            <div className="layout-item saas-feature-cards__layout-10 layout-full layout-flex layout is-loaded">
              <div className="layout-item saas-feature-cards__layout-11 layout-full layout-flex layout is-loaded"></div>
              <div className="layout-item saas-feature-cards__transparent-delivery content-block block-heading">
                <div className="content-inner">
                  <p className="heading">Transparent delivery</p>
                </div>
              </div>
              <div className="layout-item saas-feature-cards__every-sprint-is-visible-weekly-demo content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    Every sprint is visible. Weekly demos, a live project board
                    and async check-ins mean you always know exactly where
                    things stand and what's next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SaasFeatureCards;
