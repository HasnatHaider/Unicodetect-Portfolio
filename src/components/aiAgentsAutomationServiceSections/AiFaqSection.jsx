import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "../sharedUi/Interactive";
const AiFaqSection = () => {
  return (
    <div
      className="layout-item ai-faq-section layout-full is-loaded layout-flex layout section-root"
      id="ai-faq-section"
    >
      <div className="layout-item ai-faq-section__layout is-loaded layout-flex layout-boxed layout">
        <div className="layout-inner is-loaded">
          <div className="layout-item ai-faq-section__layout-2 layout-full is-loaded layout-flex layout">
            <div className="layout-item ai-faq-section__common-questions width-auto content-block block-heading">
              <div className="content-inner">
                <p className="heading">COMMON QUESTIONS</p>
              </div>
            </div>
            <div className="layout-item ai-faq-section__ai-agents-faq content-block block-heading">
              <div className="content-inner">
                <h2 className="heading">AI Agents FAQ</h2>
              </div>
            </div>
          </div>
          <Accordion className="layout-item ai-faq-section__layout-3 layout-full is-loaded layout-flex layout">
            <div className="layout-item ai-faq-section__accordion content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-ai01"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-ai01"
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
                        How long until a working agent?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-ai01"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-ai01"
                    >
                      <p>
                        Most clients have a working agent in production within 4–6 weeks. The first two weeks cover discovery and architecture — mapping your data sources, APIs, and the exact workflow the agent will own. Weeks three and four are build and integration. The final sprint is testing, guardrails, and handover. More complex multi-agent systems take 8–12 weeks.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item ai-faq-section__accordion-2 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-ai02"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-ai02"
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
                        Do we have to replace our existing tools?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-ai02"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-ai02"
                    >
                      <p>
                        No. We build agents that connect to the tools you already use — your CRM, Slack, Google Workspace, databases, or any system with an API. You keep your stack; the agent sits on top and handles the work between them.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item ai-faq-section__accordion-3 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-ai03"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-ai03"
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
                        Which AI models do you use?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-ai03"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-ai03"
                    >
                      <p>
                        We are model-agnostic. Most production agents are built on OpenAI, Anthropic Claude, or Google Gemini depending on the task — latency requirements, context window needs, and cost. We recommend the right model for your use case, not the most expensive one.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item ai-faq-section__accordion-4 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-ai04"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-ai04"
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
                        What happens when the AI gets something wrong?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-ai04"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-ai04"
                    >
                      <p>
                        Every agent we ship includes guardrails — confidence thresholds, retry logic, and human-in-the-loop escalation paths for edge cases. Low-confidence outputs are flagged for review rather than acted on. Monitoring dashboards track accuracy and error rates so issues are caught before they affect your operations.
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
export default AiFaqSection;
