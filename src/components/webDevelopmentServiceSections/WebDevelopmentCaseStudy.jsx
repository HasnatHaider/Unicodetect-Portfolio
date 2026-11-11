import { IMAGES } from "../../utils/Constant";
import { WebDevelopmentEyebrow } from "./WebDevelopmentSectionHeading";

const metrics = [
  ["Custom", "Liquid & React Architecture"],
  ["Mobile-First", "Responsive Shopping Flows"],
  ["Self-Serve", "Catalog & Promo Control"],
];

const WebDevelopmentCaseStudy = () => (
  <section
    id="web-development-case-study"
    className="service-section web-dev-case-study web-dev-dark"
    aria-labelledby="web-dev-case-study-title"
  >
    <div className="service-container web-dev-case-study-grid">
      <div>
        <WebDevelopmentEyebrow badge>FEATURED LAUNCH</WebDevelopmentEyebrow>
        <h2 id="web-dev-case-study-title">
          Translating Iconic Beauti’s brand vision into a custom e-commerce
          storefront.
        </h2>
        <p>
          We designed and engineered a bespoke storefront from scratch — pairing
          fast mobile product discovery with structured collection browsing and
          self-serve promotional controls for the founder.
        </p>
        <dl className="web-dev-case-metrics">
          {metrics.map(([value, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <img
        src={IMAGES.webDevelopmentCaseStudy}
        alt="Web engineering illustration with a laptop, responsive interfaces, code, and connected components"
        width="620"
        height="500"
        loading="lazy"
      />
    </div>
  </section>
);

export default WebDevelopmentCaseStudy;
