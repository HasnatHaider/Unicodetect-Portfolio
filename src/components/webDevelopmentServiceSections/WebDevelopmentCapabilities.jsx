import { Code2, Cpu, ShoppingCart, SlidersHorizontal } from "lucide-react";
import WebDevelopmentSectionHeading from "./WebDevelopmentSectionHeading";

const capabilities = [
  {
    title: "Custom SaaS Web Apps",
    description:
      "Responsive, component-driven reactive applications built on React and Next.js, featuring real-time client sync, complex analytics dashboards, and state-managed workflows.",
    Icon: Code2,
  },
  {
    title: "Headless & Jamstack E-commerce",
    description:
      "Lightning-fast storefronts separating content management from transactional layers, resulting in 95+ Lighthouse scores, secure checkouts, and higher conversion rates.",
    Icon: ShoppingCart,
  },
  {
    title: "Decoupled & Headless CMS",
    description:
      "Implement elegant editor dashboards with Contentful, Strapi, or Sanity, allowing marketing teams to update copy without breaking complex site layouts.",
    Icon: SlidersHorizontal,
  },
  {
    title: "Production-Ready Backends",
    description:
      "Develop high-availability APIs and microservices utilizing Node.js, Python, and AWS Serverless infrastructure for dependable communication with all third-party endpoints.",
    Icon: Cpu,
  },
];

const WebDevelopmentCapabilities = () => (
  <section
    className="service-section web-dev-capabilities web-dev-light"
    aria-labelledby="web-dev-capabilities-title"
  >
    <div className="service-container">
      <WebDevelopmentSectionHeading
        eyebrow="CAPABILITIES"
        title="Engineered for Performance & Scalability"
        id="web-dev-capabilities-title"
      >
        We combine high-performance frontends with clean, resilient database and
        backend logic to deliver digital interfaces that support thousands of
        simultaneous requests.
      </WebDevelopmentSectionHeading>
      <div className="web-dev-capability-grid">
        {capabilities.map(({ title, description, Icon }) => (
          <article className="web-dev-capability" key={title}>
            <span className="web-dev-icon-tile">
              <Icon size={20} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default WebDevelopmentCapabilities;
