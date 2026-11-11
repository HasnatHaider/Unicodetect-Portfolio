import WebDevelopmentSectionHeading from "./WebDevelopmentSectionHeading";

const steps = [
  [
    "Blueprint & Audit",
    "We detail interface mockups, evaluate backend data flows, and outline full API structure requirements.",
  ],
  [
    "Modular Frontend",
    "Develop scalable design tokens and structured responsive UI elements based on production designs.",
  ],
  [
    "Core Backend Logic",
    "Connect state-management services, normalized database tables, and establish reliable API integrations.",
  ],
  [
    "Testing & Launch",
    "Deploy through secure pipelines, optimize serverless queries, and enforce accessibility compliance checks.",
  ],
];

const WebDevelopmentProcess = () => (
  <section
    className="service-section web-dev-process web-dev-dark"
    aria-labelledby="web-dev-process-title"
  >
    <div className="service-container">
      <WebDevelopmentSectionHeading
        eyebrow="OUR PROCESS"
        title="From Blueprint to Digital Product"
        id="web-dev-process-title"
      >
        Our structured engineering methodologies eliminate guessing games and
        align software milestones directly with clear product expectations.
      </WebDevelopmentSectionHeading>
      <ol className="web-dev-process-grid">
        {steps.map(([title, description], index) => (
          <li key={title}>
            <span className="web-dev-step-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default WebDevelopmentProcess;
