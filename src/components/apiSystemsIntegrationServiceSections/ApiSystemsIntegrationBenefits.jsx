import ApiSystemsIntegrationSectionHeading from "./ApiSystemsIntegrationSectionHeading";

const benefits = [
  [
    "Zero-Downtime Architecture",
    "Every cutover uses atomic transaction patterns, blue-green deployment strategies, and parallel validation pipelines — so your business keeps operating through every migration.",
  ],
  [
    "Security-First, Always",
    "We build integrations with AES-256 encryption at rest and TLS 1.3 in transit, least-privilege API access profiles, automatic token rotation, and full audit logging — and we can design for HIPAA and SOC 2 requirements with your compliance team.",
  ],
  [
    "Observable & Self-Healing",
    "Built-in circuit breakers, dead-letter queues, exponential backoffs, and real-time alerting mean your integrations recover automatically — before your team even notices an issue.",
  ],
];

const ApiSystemsIntegrationBenefits = () => (
  <section
    className="service-section api-integration-benefits"
    aria-labelledby="api-integration-benefits-title"
  >
    <div className="service-container">
      <ApiSystemsIntegrationSectionHeading
        eyebrow="WHY UNICODETECH"
        title="Integrations Built for True Production"
        id="api-integration-benefits-title"
      />
      <div className="api-integration-benefit-grid">
        {benefits.map(([title, description]) => (
          <article className="api-integration-benefit" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ApiSystemsIntegrationBenefits;
