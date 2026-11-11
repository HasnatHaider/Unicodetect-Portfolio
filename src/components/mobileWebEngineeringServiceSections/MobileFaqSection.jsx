import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "../sharedUi/Interactive";
const MobileFaqSection = () => {
  return (
    <div
      className="layout-item mobile-faq-section layout-full is-loaded layout-flex layout section-root"
      id="mobile-faq-section"
    >
      <div className="layout-item mobile-faq-section__layout is-loaded layout-flex layout-boxed layout">
        <div className="layout-inner is-loaded">
          <div className="layout-item mobile-faq-section__layout-2 layout-full is-loaded layout-flex layout">
            <div className="layout-item mobile-faq-section__common-questions width-auto content-block block-heading">
              <div className="content-inner">
                <p className="heading">COMMON QUESTIONS</p>
              </div>
            </div>
            <div className="layout-item mobile-faq-section__mobile-web-faq content-block block-heading">
              <div className="content-inner">
                <h2 className="heading">Mobile &amp; Web FAQ</h2>
              </div>
            </div>
          </div>
          <Accordion className="layout-item mobile-faq-section__layout-3 layout-full is-loaded layout-flex layout">
            <div className="layout-item mobile-faq-section__accordion content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-mob01"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-mob01"
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
                        Native or cross-platform — which do you recommend?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-mob01"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-mob01"
                    >
                      <p>
                        For most products, React Native gives you a near-native experience from a single codebase, which usually costs less to build and maintain, covering both iOS and Android. We recommend going fully native only when you need direct access to platform-specific hardware or are building something that pushes performance limits — real-time video processing, AR, or high-frequency sensor data.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item mobile-faq-section__accordion-2 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-mob02"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-mob02"
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
                        Do you handle App Store and Google Play submission?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-mob02"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-mob02"
                    >
                      <p>
                        Yes. We handle the full submission process for both stores — build signing, metadata, screenshots, privacy declarations, and review response if Apple or Google comes back with questions. First-time submissions are included in the project scope.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item mobile-faq-section__accordion-3 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-mob03"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-mob03"
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
                        What does post-launch maintenance look like?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-mob03"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-mob03"
                    >
                      <p>
                        We offer monthly retainer plans covering OS compatibility updates, dependency upgrades, bug fixes, and minor feature additions. Most clients stay on a retainer after launch because mobile OS updates from Apple and Google require regular attention. You pick the hours; we handle the work.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item mobile-faq-section__accordion-4 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-mob04"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-mob04"
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
                        Can you take over our existing app?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-mob04"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-mob04"
                    >
                      <p>
                        Yes. We start with a codebase audit to understand what's there, what's broken, and what can be kept. From there we produce a clear handover plan — no black-box rewrites unless the code genuinely cannot be saved. Most takeovers move into active development within two weeks.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
export default MobileFaqSection;
