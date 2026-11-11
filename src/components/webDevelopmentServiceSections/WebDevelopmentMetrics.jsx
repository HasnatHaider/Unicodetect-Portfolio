import WebDevelopmentSectionHeading from "./WebDevelopmentSectionHeading";

const benefits = [
  [
    "Uncompromising Speed",
    "Sub-second paint times on all landing pages. We utilize Edge routing, responsive graphics optimization, and minimal client-side bundles, built for fast performance.",
  ],
  [
    "Clean Code Handoff",
    "Our engineering structures follow clean component rules, strict TypeScript standards, and strong automated test coverage so your in-house teams can scale the codebase with ease.",
  ],
  [
    "Accessibility Enforced",
    "We develop according to WCAG 2.1 specifications, providing structured screen-reader paths, complete keyboard-only flows, and clear focus-indicator states by default.",
  ],
];

const WebDevelopmentMetrics = () => (
  <section
    className="service-section web-dev-metrics"
    aria-labelledby="web-dev-metrics-title"
  >
    <div className="service-container">
      <WebDevelopmentSectionHeading
        eyebrow="WHY UNICODETECH"
        title="Built For Real Business Metrics"
        id="web-dev-metrics-title"
      >
        We measure success not just in clean code snippets, but in solid
        platform uptime, improved conversion paths, and decreased operational
        maintenance costs.
      </WebDevelopmentSectionHeading>
      <div className="web-dev-benefit-grid">
        {benefits.map(([title, description]) => (
          <article className="web-dev-benefit" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default WebDevelopmentMetrics;
