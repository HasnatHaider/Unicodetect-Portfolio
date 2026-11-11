import { Minus, Plus } from "lucide-react";
import { IMAGES } from "../../utils/Constant";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "../sharedUi/Interactive";
const SaasFaq = () => {
  return (
    <div
      className="layout-item saas-faq layout-full layout-flex layout section-root is-loaded"
      id="saas-faq"
    >
      <div className="layout-item saas-faq__image width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="473"
            height="473"
            src={IMAGES.unicode_saas_d8f656ea_3c34_4cc9_825c_05df88f03a1f}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item saas-faq__image-2 width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="567"
            height="567"
            src={IMAGES.unicode_saas_f0c6ec05_84fe_49bb_8bff_4616a28e5f92}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item saas-faq__layout layout-flex layout-boxed layout is-loaded">
        <div className="layout-inner is-loaded">
          <div className="layout-item saas-faq__layout-2 layout-full layout-flex layout is-loaded">
            <div className="layout-item saas-faq__layout-3 layout-full layout-flex layout is-loaded">
              <div className="layout-item saas-faq__common-questions content-block block-heading">
                <div className="content-inner">
                  <p className="heading">COMMON QUESTIONS</p>
                </div>
              </div>
              <div className="layout-item saas-faq__what-teams-usually-ask content-block block-heading">
                <div className="content-inner">
                  <h2 className="heading">What teams usually ask.</h2>
                </div>
              </div>
            </div>
            <div className="layout-item saas-faq__layout-4 layout-full saas-dev-service-faq-list layout-flex layout is-loaded">
              <div className="layout-item saas-faq__accordion content-block block-accordion">
                <div className="content-inner">
                  <Accordion className="accordion">
                    <AccordionItem className="accordion-item">
                      <AccordionTrigger
                        id="faq-question-2261"
                        className="accordion-trigger is-active"
                        aria-controls="faq-answer-2261"
                      >
                        <span
                          className="accordion-icon ui-accordion-icon-right"
                          aria-hidden="true"
                        >
                          <span className="accordion-icon-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="accordion-icon-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                        <span className="accordion-label">
                          How quickly can we start?
                        </span>
                      </AccordionTrigger>
                      <AccordionPanel
                        id="faq-answer-2261"
                        className="accordion-panel clearfix is-active"
                        aria-labelledby="faq-question-2261"
                      >
                        <p>
                          Most engagements begin within 1–2 weeks. We start with
                          a scoping call to understand your requirements, then
                          issue a proposal within 3 business days.
                        </p>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem className="accordion-item">
                      <AccordionTrigger
                        id="faq-question-2262"
                        className="accordion-trigger"
                        aria-controls="faq-answer-2262"
                      >
                        <span
                          className="accordion-icon ui-accordion-icon-right"
                          aria-hidden="true"
                        >
                          <span className="accordion-icon-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="accordion-icon-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                        <span className="accordion-label">
                          Who owns delivery?
                        </span>
                      </AccordionTrigger>
                      <AccordionPanel
                        id="faq-answer-2262"
                        className="accordion-panel clearfix"
                        aria-labelledby="faq-question-2262"
                      >
                        <p>
                          Design, frontend, backend and QA under one roof. No
                          handoff gaps between agencies. You get a single point
                          of contact for decisions, updates and delivery.
                        </p>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem className="accordion-item">
                      <AccordionTrigger
                        id="faq-question-2263"
                        className="accordion-trigger"
                        aria-controls="faq-answer-2263"
                      >
                        <span
                          className="accordion-icon ui-accordion-icon-right"
                          aria-hidden="true"
                        >
                          <span className="accordion-icon-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="accordion-icon-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                        <span className="accordion-label">
                          What happens after launch?
                        </span>
                      </AccordionTrigger>
                      <AccordionPanel
                        id="faq-answer-2263"
                        className="accordion-panel clearfix"
                        aria-labelledby="faq-question-2263"
                      >
                        <p>
                          Post-launch support, feature iteration and platform
                          monitoring – retained or on-demand.
                        </p>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem className="accordion-item">
                      <AccordionTrigger
                        id="faq-question-2264"
                        className="accordion-trigger"
                        aria-controls="faq-answer-2264"
                      >
                        <span
                          className="accordion-icon ui-accordion-icon-right"
                          aria-hidden="true"
                        >
                          <span className="accordion-icon-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="accordion-icon-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                        <span className="accordion-label">
                          Do you work with early-stage startups?
                        </span>
                      </AccordionTrigger>
                      <AccordionPanel
                        id="faq-answer-2264"
                        className="accordion-panel clearfix"
                        aria-labelledby="faq-question-2264"
                      >
                        <p>
                          We scope each build around your workflow, constraints
                          and priorities. Engagement options include a focused
                          sprint, a project-based build or a dedicated product
                          team.
                        </p>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SaasFaq;
