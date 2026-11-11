import WordpressDevelopmentSectionHeading from "./WordpressDevelopmentSectionHeading";

const steps = [
  [
    "Structure & Layout Audit",
    "We catalog existing themes, map template blocks, and evaluate visual page builder dependencies.",
  ],
  [
    "Gutenberg Block Coding",
    "Develop custom theme schemas and clean Gutenberg editor blocks in lightweight React templates.",
  ],
  [
    "Database Cleanup & Caching",
    "Clean database entries, eliminate leftover plugin configurations, and set optimized asset caching.",
  ],
  [
    "Hardening & Deploy",
    "Implement headless API bridges, enforce strict sanitization rules, and deploy behind Cloudflare.",
  ],
];

const WordpressDevelopmentProcess = () => (
  <section
    className="service-section wp-dev-process wp-dev-dark"
    aria-labelledby="wp-dev-process-title"
  >
    <div className="service-container">
      <WordpressDevelopmentSectionHeading
        eyebrow="OUR METHODOLOGY"
        title="From Bloated Monolith to High-Speed Architecture"
        id="wp-dev-process-title"
      >
        Our structured migration and design workflows convert messy visual
        architectures into highly reliable WordPress instances.
      </WordpressDevelopmentSectionHeading>
      <ol className="wp-dev-process-grid">
        {steps.map(([title, description], index) => (
          <li key={title}>
            <span className="wp-dev-step-number" aria-hidden="true">
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

export default WordpressDevelopmentProcess;
