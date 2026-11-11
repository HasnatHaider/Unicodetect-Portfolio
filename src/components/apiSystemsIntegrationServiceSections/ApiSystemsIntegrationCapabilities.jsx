import { Code2, CreditCard, Layers, Server } from "lucide-react";
import ApiSystemsIntegrationSectionHeading from "./ApiSystemsIntegrationSectionHeading";

const capabilities = [
  {
    category: "CUSTOM INTEGRATION",
    title: "Custom Middleware & ETL",
    description:
      "High-velocity serverless orchestration pipelines written in Node.js and Python to sync mission-critical customer and transaction records with extreme efficiency and zero data loss.",
    Icon: Layers,
  },
  {
    category: "API STRATEGY",
    title: "Design-First GraphQL & REST",
    description:
      "Fully typed, self-documenting APIs built with strict schemas, automated validation checks, granular access control, and complete developer SDKs ready for partner onboarding.",
    Icon: Code2,
  },
  {
    category: "E-COMMERCE & FINANCE",
    title: "Transactional Gateways",
    description:
      "Zero-loss payment flow integrations with Stripe, Adyen, legacy payment backends, and multi-currency billing systems with instant reconciliation and comprehensive audit trails.",
    Icon: CreditCard,
  },
  {
    category: "LEGACY SYSTEMS",
    title: "EHR, ERP & CRM Hooks",
    description:
      "Bridging legacy mainframes and modern products through secure asynchronous message queues (Kafka, RabbitMQ) and resilient API micro-proxies with automatic failover.",
    Icon: Server,
  },
];

const ApiSystemsIntegrationCapabilities = () => (
  <section
    className="service-section api-integration-capabilities"
    aria-labelledby="api-integration-capabilities-title"
  >
    <div className="service-container">
      <ApiSystemsIntegrationSectionHeading
        eyebrow="WHAT WE BUILD"
        title="Reliable, Production-Grade APIs & Pipelines"
        id="api-integration-capabilities-title"
      >
        We engineer resilient integration layers that eliminate manual data
        processing and unify disparate enterprise architectures into cohesive,
        high-throughput systems.
      </ApiSystemsIntegrationSectionHeading>
      <div className="api-integration-capability-grid">
        {capabilities.map(({ category, title, description, Icon }) => (
          <article className="api-integration-capability" key={title}>
            <div className="api-integration-card-header">
              <span>{category}</span>
              <Icon size={24} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ApiSystemsIntegrationCapabilities;
