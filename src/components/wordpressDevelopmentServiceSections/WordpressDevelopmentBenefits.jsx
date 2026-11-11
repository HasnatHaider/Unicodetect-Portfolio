import WordpressDevelopmentSectionHeading from "./WordpressDevelopmentSectionHeading";

const benefits = [
  [
    "Uncompromising Speed",
    "Sub-second LCP scores on all page templates. We use Edge routing, responsive layout optimization, and lightweight assets to guarantee high lighthouse ranks.",
  ],
  [
    "Clean Modular Handoff",
    "Custom block libraries coded directly in native React structures with explicit developer handoffs and documentation so your teams can scale easily.",
  ],
  [
    "Accessibility Compliant",
    "Designed directly around strict WCAG 2.1 guidelines, providing clear keyboard path indicator logic and accessible visual structures by default.",
  ],
];

const WordpressDevelopmentBenefits = () => (
  <section
    className="service-section wp-dev-benefits"
    aria-labelledby="wp-dev-benefits-title"
  >
    <div className="service-container">
      <WordpressDevelopmentSectionHeading
        eyebrow="WHY UNICODETECH"
        title="Engineered for Measurable Business Speed"
        id="wp-dev-benefits-title"
      >
        We measure our custom layouts not just by aesthetic polish, but by
        lightning-quick page performance and absolute zero-bloat standards.
      </WordpressDevelopmentSectionHeading>
      <div className="wp-dev-benefit-grid">
        {benefits.map(([title, description]) => (
          <article className="wp-dev-benefit" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default WordpressDevelopmentBenefits;
