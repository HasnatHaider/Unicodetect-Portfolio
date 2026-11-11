import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "../sharedUi/Interactive";
const ShopifyFaqSection = () => {
  return (
    <div
      className="layout-item shopify-faq-section layout-full is-loaded layout-flex layout section-root"
      id="shopify-faq-section"
    >
      <div className="layout-item shopify-faq-section__layout is-loaded layout-flex layout-boxed layout">
        <div className="layout-inner is-loaded">
          <div className="layout-item shopify-faq-section__layout-2 layout-full is-loaded layout-flex layout">
            <div className="layout-item shopify-faq-section__common-questions width-auto content-block block-heading">
              <div className="content-inner">
                <p className="heading">COMMON QUESTIONS</p>
              </div>
            </div>
            <div className="layout-item shopify-faq-section__e-commerce-faq content-block block-heading">
              <div className="content-inner">
                <h2 className="heading">E-commerce FAQ</h2>
              </div>
            </div>
          </div>
          <Accordion className="layout-item shopify-faq-section__layout-3 layout-full is-loaded layout-flex layout">
            <div className="layout-item shopify-faq-section__accordion content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-3681"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-3681"
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
                        Should we build a custom Liquid theme or go Headless?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-3681"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-3681"
                    >
                      <p>
                        It depends entirely on your traffic volume and catalog
                        complexity. Custom Liquid themes built with modern
                        optimization are extremely fast, reliable, and easily
                        managed by internal marketing teams. Headless is
                        recommended for high-volume, multi-platform businesses
                        requiring ultimate front-end presentation freedom.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item shopify-faq-section__accordion-2 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-2871"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-2871"
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
                        How long does a typical migration to Shopify Plus take?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-2871"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-2871"
                    >
                      <p>
                        Standard migrations take between 8 to 12 weeks. This
                        includes importing existing customer records, historic
                        order data, SEO redirect logic mapping, payment gateway
                        configurations, and custom Liquid template setups.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item shopify-faq-section__accordion-3 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-3521"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-3521"
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
                        Can you integrate custom enterprise ERPs and inventory
                        managers?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-3521"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-3521"
                    >
                      <p>
                        Yes. We have built custom endpoints and middleware
                        scripts to sync legacy ERPs, SAP modules, and advanced
                        inventory tools to Shopify’s Admin API, keeping stock
                        counts accurate to the second.
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
            <div className="layout-item shopify-faq-section__accordion-4 content-block block-accordion">
              <div className="content-inner">
                <div className="accordion">
                  <AccordionItem className="accordion-item">
                    <AccordionTrigger
                      id="faq-question-1581"
                      className="accordion-trigger is-active"
                      aria-controls="faq-answer-1581"
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
                        How do you handle page speed optimization?
                      </span>
                    </AccordionTrigger>
                    <AccordionPanel
                      id="faq-answer-1581"
                      className="accordion-panel clearfix is-active"
                      aria-labelledby="faq-question-1581"
                    >
                      <p>
                        We optimize page speed by writing modular Liquid code,
                        keeping third-party app scripts to an absolute minimum,
                        serving optimized image formats, and utilizing modern
                        vanilla JavaScript instead of heavy library scripts.
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
export default ShopifyFaqSection;
