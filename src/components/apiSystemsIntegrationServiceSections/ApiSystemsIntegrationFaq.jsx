import { Minus, Plus } from "lucide-react";
import {
  DisclosureGroup,
  Disclosure,
  DisclosureSummary,
} from "../sharedUi/Interactive";
import ApiSystemsIntegrationSectionHeading from "./ApiSystemsIntegrationSectionHeading";

const questions = [
  [
    "How do you handle API security and compliance (such as SOC 2 and HIPAA)?",
    "All integration brokers we build use least-privilege API access profiles, AES-256 encryption at rest and TLS 1.3 in transit, automatic API token rotations, and complete audit-logging schemas. For regulated workloads, we can design for HIPAA and SOC 2 requirements with your compliance team so no unencrypted sensitive records pass through secondary workers.",
  ],
  [
    "What happens when third-party servers go offline or start rate-limiting requests?",
    "Our custom middleware includes structured queuing brokers (e.g. BullMQ, RabbitMQ) configured with exponential backoff algorithms, sliding-window rate limiters, circuit breakers, and automatic alerting systems to notify engineering teams before sync lag impacts operations.",
  ],
  [
    "Can we synchronize on-premises relational databases with modern cloud apps?",
    "Absolutely. We set up secure virtual private clouds (VPC), configure SSH tunnel proxies or secure IPSec VPN connections, and build transactional change-data-capture (CDC) listeners that safely propagate database mutations without creating security vulnerabilities.",
  ],
  [
    "Do you help document the APIs and train internal developer teams?",
    "Yes, every pipeline ships with typed schemas, comprehensive Swagger docs, or GraphQL playgrounds. We also compile interactive Postman collections and host walk-through calls with your system administrators to ensure smooth maintenance operations.",
  ],
  [
    "How long does a typical integration project take?",
    "Scope varies by complexity. A focused point-to-point integration can be live within 2–3 weeks. A full enterprise middleware backbone spanning multiple ERPs, CRMs, and payment systems typically runs 6–12 weeks. We provide fixed-scope estimates after our discovery sprint so you have full cost visibility before we begin.",
  ],
];

const ApiSystemsIntegrationFaq = () => (
  <section
    className="service-section api-integration-faq api-integration-dark"
    aria-labelledby="api-integration-faq-title"
  >
    <div className="service-container">
      <ApiSystemsIntegrationSectionHeading
        eyebrow="COMMON QUESTIONS"
        variant="plain"
        title="Questions enterprise IT leaders ask us"
        id="api-integration-faq-title"
      />
      <DisclosureGroup className="api-integration-faq-list">
        {questions.map(([question, answer], index) => (
          <Disclosure
            defaultOpen
            className="api-integration-faq-item"
            key={question}
          >
            <DisclosureSummary
              aria-controls={`api-integration-answer-${index}`}
            >
              <span>{question}</span>
              <span
                className="api-integration-faq-indicator lucide-disclosure-indicator"
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
            </DisclosureSummary>
            <div
              id={`api-integration-answer-${index}`}
              className="api-integration-faq-answer"
            >
              <p>{answer}</p>
            </div>
          </Disclosure>
        ))}
      </DisclosureGroup>
    </div>
  </section>
);

export default ApiSystemsIntegrationFaq;
