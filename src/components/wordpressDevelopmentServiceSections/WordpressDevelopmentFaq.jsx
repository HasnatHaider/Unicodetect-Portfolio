import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "../sharedUi/Interactive";
import WordpressDevelopmentSectionHeading from "./WordpressDevelopmentSectionHeading";

const questions = [
  [
    "Do you build custom WordPress themes from scratch?",
    "Yes. We write every theme entirely from scratch using clean PHP and native Gutenberg React blocks. We never use visual page builders like Elementor or WPBakery, which means zero bloat, faster load times, and a codebase your team can actually maintain.",
  ],
  [
    "Can you migrate our existing site to WordPress without losing content or SEO rankings?",
    "Absolutely. Our migration process maps all existing URLs, sets up 301 redirect logic, exports and re-imports content with full fidelity, and validates SEO metadata before go-live. We test across staging environments before touching production.",
  ],
  [
    "What is headless WordPress and do we need it?",
    "Headless WordPress decouples your content management from the frontend, letting you use WordPress as a structured content API while serving pages through a fast Next.js or Astro frontend. It is best suited for high-traffic sites or teams that want near-instant page loads and maximum frontend flexibility. For most content-driven sites, a well-optimized traditional setup is faster to maintain.",
  ],
  [
    "How do you handle WordPress security and ongoing performance?",
    "We harden every build with strict sanitization rules, limited login exposure, Cloudflare integration, and clean hosting configurations on WP Engine or Kinsta. We also eliminate unused plugins, optimize database queries, and configure edge caching to keep Lighthouse scores consistently high after launch.",
  ],
];

const WordpressDevelopmentFaq = () => (
  <section
    className="service-section wp-dev-faq"
    aria-labelledby="wp-dev-faq-title"
  >
    <div className="service-container wp-dev-faq-layout">
      <WordpressDevelopmentSectionHeading
        eyebrow="COMMON QUESTIONS"
        title="WordPress Development FAQ"
        id="wp-dev-faq-title"
      >
        Quick answers about our WordPress development services.
      </WordpressDevelopmentSectionHeading>
      <Accordion className="wp-dev-accordion">
        {questions.map(([question, answer], index) => (
          <AccordionItem key={question}>
            <h3>
              <AccordionTrigger
                id={`wp-question-${index}`}
                aria-controls={`wp-answer-${index}`}
              >
                <span>{question}</span>
                <span className="wp-dev-accordion-indicator" aria-hidden="true">
                  <Plus
                    size={18}
                    aria-hidden="true"
                    className="lucide-disclosure-plus"
                  />
                  <Minus
                    size={18}
                    aria-hidden="true"
                    className="lucide-disclosure-minus"
                  />
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionPanel
              id={`wp-answer-${index}`}
              role="region"
              aria-labelledby={`wp-question-${index}`}
            >
              <p>{answer}</p>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default WordpressDevelopmentFaq;
