import ApiSystemsIntegrationSectionHeading from "./ApiSystemsIntegrationSectionHeading";

const steps = [
  [
    "System Audit & Discovery",
    "We analyze raw endpoint schemas, trace network latencies, check rate limits, and map out your single source of truth across every connected platform.",
  ],
  [
    "Schema & Gateway Design",
    "Construct secure, transactional mock-ups, design payload specs, and set typed contracts with strict validation before any line of production code is written.",
  ],
  [
    "Resilient Build & Test",
    "Program fail-safes, dead-letter queues, exponential backoffs, and load-test systems with high transaction simulations to guarantee stability under peak load.",
  ],
  [
    "Phased Zero-Downtime Rollout",
    "Perform atomic database cutovers, deploy telemetry monitoring, and verify accuracy with parallel processing pipelines before full production release.",
  ],
];

const ApiSystemsIntegrationProcess = () => (
  <section
    className="service-section api-integration-process api-integration-dark"
    aria-labelledby="api-integration-process-title"
  >
    <div className="service-container">
      <ApiSystemsIntegrationSectionHeading
        eyebrow="IMPLEMENTATION ROADMAP"
        variant="dark"
        title="Secure, Downtime-Free Systems Architecture"
        id="api-integration-process-title"
      >
        Our battle-hardened process ensures every integration is
        production-ready before a single byte crosses your live environment.
      </ApiSystemsIntegrationSectionHeading>
      <ol className="api-integration-process-grid">
        {steps.map(([title, description], index) => (
          <li key={title}>
            <span className="api-integration-step-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ApiSystemsIntegrationProcess;
