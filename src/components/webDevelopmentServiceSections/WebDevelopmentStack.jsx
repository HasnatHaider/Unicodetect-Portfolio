import WebDevelopmentSectionHeading from "./WebDevelopmentSectionHeading";

const technologies = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "TypeScript",
  "AWS",
  "Serverless Architecture",
  "GraphQL",
  "PostgreSQL",
  "Vercel",
];

const WebDevelopmentStack = () => (
  <section
    className="service-section web-dev-stack web-dev-light"
    aria-labelledby="web-dev-stack-title"
  >
    <div className="service-container">
      <WebDevelopmentSectionHeading
        eyebrow="BATTLE-TESTED INFRASTRUCTURE"
        title="Our Modern Web Engineering Stack"
        id="web-dev-stack-title"
      >
        We select industry-leading cloud frameworks to ensure maximum uptime,
        maintainability, and clean code handoffs.
      </WebDevelopmentSectionHeading>
      <ul
        className="web-dev-technologies"
        aria-label="Web engineering technologies"
      >
        {technologies.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default WebDevelopmentStack;
