import { Code2, Settings, Server, Shield } from "lucide-react";
import WordpressDevelopmentSectionHeading from "./WordpressDevelopmentSectionHeading";

const capabilities = [
  {
    title: "Custom Gutenberg Engineering",
    description:
      "Bespoke Gutenberg editor blocks engineered using React. Eliminates the visual drag of third-party plugins while keeping content editing effortless.",
    Icon: Code2,
  },
  {
    title: "Migration & Speed Optimization",
    description:
      "Structured migrations from legacy platforms, reusable section libraries, and performance tuning to give marketing and design teams complete creative freedom at speed.",
    Icon: Settings,
  },
  {
    title: "Headless & Decoupled WP",
    description:
      "Use WordPress solely as a structured content store API fueling high-performance static frontends like Next.js, Gatsby, or Astro.",
    Icon: Server,
  },
  {
    title: "Hardened Enterprise Security",
    description:
      "Rigorous security hardening, optimized cloud hosting paths, strict sanitization protocols, and complete prevention of database drag.",
    Icon: Shield,
  },
];

const WordpressDevelopmentCapabilities = () => (
  <section
    className="service-section wp-dev-capabilities wp-dev-light"
    aria-labelledby="wp-dev-capabilities-title"
  >
    <div className="service-container">
      <WordpressDevelopmentSectionHeading
        eyebrow="WORDPRESS CAPABILITIES"
        title="Unmatched WordPress Optimization & Engineering"
        id="wp-dev-capabilities-title"
      >
        We combine flexible content editing controls with hardened custom
        architecture configurations to deliver reliable enterprise WordPress
        environments.
      </WordpressDevelopmentSectionHeading>
      <div className="wp-dev-capability-grid">
        {capabilities.map(({ title, description, Icon }) => (
          <article className="wp-dev-capability" key={title}>
            <span className="wp-dev-icon-tile">
              <Icon size={22} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default WordpressDevelopmentCapabilities;
