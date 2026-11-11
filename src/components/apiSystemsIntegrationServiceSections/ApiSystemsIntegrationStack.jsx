import ApiSystemsIntegrationSectionHeading from "./ApiSystemsIntegrationSectionHeading";

const technologies = [
  "RESTful APIs",
  "GraphQL",
  "gRPC Engines",
  "Apache Kafka",
  "Salesforce",
  "NetSuite API",
  "Stripe Connect",
  "AWS API Gateway",
  "MuleSoft Middleware",
  "Redis Event Cache",
  "RabbitMQ",
  "PostgreSQL / MySQL",
];

const ApiSystemsIntegrationStack = () => (
  <section
    className="service-section api-integration-stack"
    aria-labelledby="api-integration-stack-title"
  >
    <div className="service-container">
      <ApiSystemsIntegrationSectionHeading
        eyebrow="BATTLE-TESTED INTEGRATION ENGINE"
        variant="plain"
        title="Supported Protocols & Systems"
        id="api-integration-stack-title"
      >
        We build integrations on the platforms your teams already trust, using
        battle-tested protocols for maximum reliability and interoperability.
      </ApiSystemsIntegrationSectionHeading>
      <ul
        className="api-integration-technologies"
        aria-label="Supported integration protocols and systems"
      >
        {technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default ApiSystemsIntegrationStack;
