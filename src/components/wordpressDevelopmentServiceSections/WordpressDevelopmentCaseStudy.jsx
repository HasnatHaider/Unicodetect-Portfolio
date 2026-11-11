import { IMAGES } from "../../utils/Constant";
import { WordpressDevelopmentEyebrow } from "./WordpressDevelopmentSectionHeading";

const metrics = [
  ["Custom", "React Gutenberg Blocks"],
  ["Multi-Site", "Centralized Editorial Governance"],
  ["Hardened", "Cloudflare & PHP 8.3 Security"],
];

const WordpressDevelopmentCaseStudy = () => (
  <section
    id="wordpress-development-case-study"
    className="service-section wp-dev-case-study"
    aria-labelledby="wp-dev-case-study-title"
  >
    <div className="service-container wp-dev-case-study-grid">
      <div>
        <WordpressDevelopmentEyebrow badge>
          ARCHITECTURE SPOTLIGHT
        </WordpressDevelopmentEyebrow>
        <h2 id="wp-dev-case-study-title">
          Consolidating fragmented WordPress sites into a governed Gutenberg
          publishing system.
        </h2>
        <p>
          We replace plugin-heavy legacy themes with custom React-based
          Gutenberg block libraries, structured custom post types, and
          cloud-cached delivery so editorial teams can publish without layout
          breakage.
        </p>
        <dl className="wp-dev-case-metrics">
          {metrics.map(([value, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <img
        src={IMAGES.wordpressDevelopmentCaseStudy}
        alt="WordPress network connecting healthcare sites to a secure central cloud platform"
        width="620"
        height="500"
        loading="lazy"
      />
    </div>
  </section>
);

export default WordpressDevelopmentCaseStudy;
