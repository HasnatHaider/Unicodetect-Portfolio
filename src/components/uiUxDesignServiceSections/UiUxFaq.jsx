import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "../sharedUi/Interactive";
import UiUxSectionHeading from "./UiUxSectionHeading";

const questions = [
  [
    "How long does a comprehensive product redesign take?",
    "Our typical full-scale application redesigns take anywhere between 6 to 12 weeks. This includes exhaustive research, low-fidelity wireframing, styling, active validation, testing cycles, and developer handoff setup.",
  ],
  [
    "Do you build the final code or just deliver visual files?",
    "We can deliver design files and developer-ready specifications, or work with our engineering team to build the final product. We agree on the scope and handoff requirements at the start of the project.",
  ],
  [
    "How do you handle transitions into our design systems?",
    "We review your existing components, patterns, and design tokens, then map new designs to your system. Our handoff includes responsive specifications and component guidance for your engineering team.",
  ],
  [
    "What is your design approach to complex user pathways?",
    "We begin with research and user journey mapping to identify friction. We validate wireframes and interactive prototypes with users before refining the interface and preparing it for development.",
  ],
];

const UiUxFaq = () => (
  <section className="uiux-section uiux-faq" aria-labelledby="uiux-faq-title">
    <div className="uiux-container">
      <UiUxSectionHeading eyebrow="QUESTIONS" id="uiux-faq-title">
        Frequently Asked Questions
      </UiUxSectionHeading>
      <p>Quick answers about our UI/UX design services.</p>
      <Accordion className="uiux-accordion">
        {questions.map(([question, answer], index) => (
          <AccordionItem key={question}>
            <h3>
              <AccordionTrigger
                id={`uiux-question-${index}`}
                aria-controls={`uiux-answer-${index}`}
              >
                <span>{question}</span>
                <span
                  className="uiux-accordion-indicator lucide-disclosure-indicator"
                  aria-hidden="true"
                >
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
              id={`uiux-answer-${index}`}
              role="region"
              aria-labelledby={`uiux-question-${index}`}
            >
              <p>{answer}</p>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default UiUxFaq;
