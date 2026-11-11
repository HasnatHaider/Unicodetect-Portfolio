import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "../sharedUi/Interactive";
const WebDevelopmentFaq = () => {
  return (
    <div
      className="layout-item web-development-faq layout-full is-loaded layout-flex layout section-root"
      id="web-development-faq"
    >
      <div className="layout-item web-development-faq__layout is-loaded layout-flex layout-boxed layout">
        <div className="layout-inner is-loaded">
          <div className="layout-item web-development-faq__layout-2 layout-full is-loaded layout-flex layout">
            <div className="layout-item web-development-faq__common-questions width-auto content-block block-heading">
              <div className="content-inner">
                <p className="heading">COMMON QUESTIONS</p>
              </div>
            </div>
            <div className="layout-item web-development-faq__web-development-faq content-block block-heading">
              <div className="content-inner">
                <h2 className="heading">Web Development FAQ</h2>
              </div>
            </div>
          </div>
          <Accordion className="layout-item web-development-faq__layout-3 layout-full is-loaded layout-flex layout">
            <div className="layout-item web-development-faq__accordion content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-web01"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-web01"
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
                        Which stack do you use and why?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-web01"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-web01"
                    >
                      <p>
                        We default to React or Next.js on the frontend and Node.js, Python, or Go on the backend — chosen based on your performance requirements, team familiarity, and hosting constraints. We avoid framework novelty for its own sake. If you already have a stack, we work within it.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item web-development-faq__accordion-2 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-web02"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-web02"
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
                        How do you handle SEO during a rebuild?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-web02"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-web02"
                    >
                      <p>
                        We audit your current rankings and URL structure before writing a line of code. Every existing URL that drives traffic gets a permanent redirect mapped before launch. Canonical tags, structured data, and meta descriptions are part of the build, not an afterthought. We've rebuilt sites without a single ranking drop when the process is followed correctly.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item web-development-faq__accordion-3 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-web03"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-web03"
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
                        Can our own team maintain it after handover?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-web03"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-web03"
                    >
                      <p>
                        Yes — that is a design goal, not an afterthought. We write clean, documented code and hold a handover session with your team before we close the project. If your developers have specific tooling preferences, tell us early and we'll align the architecture to what they know.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item web-development-faq__accordion-4 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-web04"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-web04"
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
                        Can you migrate our site without losing search rankings?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-web04"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-web04"
                    >
                      <p>
                        Yes. The key is a complete redirect map before anything goes live, not after. We crawl your current site, identify every indexed URL, and build the redirect list as part of the migration plan. Combined with pre-launch SEO checks and a staged rollout, ranking loss from a migration is avoidable.
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
export default WebDevelopmentFaq;
