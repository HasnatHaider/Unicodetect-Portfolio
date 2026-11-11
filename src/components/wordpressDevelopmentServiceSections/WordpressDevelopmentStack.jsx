import WordpressDevelopmentSectionHeading from "./WordpressDevelopmentSectionHeading";

const technologies = [
  "WordPress Core",
  "Gutenberg (React)",
  "GraphQL / WPGraphQL",
  "Tailwind CSS",
  "Next.js (Headless)",
  "WP Engine",
  "Kinsta Cloud",
  "PHP 8.3",
  "MySQL",
  "Cloudflare Enterprise",
];

const WordpressDevelopmentStack = () => (
  <section
    className="service-section wp-dev-stack"
    aria-labelledby="wp-dev-stack-title"
  >
    <div className="service-container">
      <WordpressDevelopmentSectionHeading
        eyebrow="MODERN ENGINEERING STACK"
        title="Built on Top-Tier Cloud Infrastructures"
        id="wp-dev-stack-title"
      >
        We select modern frameworks and database layers to ensure security,
        fast load times, and straightforward editorial management.
      </WordpressDevelopmentSectionHeading>
      <ul
        className="wp-dev-technologies"
        aria-label="WordPress development technologies"
      >
        {technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default WordpressDevelopmentStack;
