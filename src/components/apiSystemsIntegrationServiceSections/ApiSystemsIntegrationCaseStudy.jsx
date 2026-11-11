import { IMAGES } from "../../utils/Constant";
import { ApiSystemsIntegrationEyebrow } from "./ApiSystemsIntegrationSectionHeading";

const metrics = [
  ["7 Apps", "Connected in BMS Ecosystem"],
  ["2-Way", "Idempotent Data Sync"],
  ["Zero", "Unreconciled Payload Drops"],
];

const ApiSystemsIntegrationCaseStudy = () => (
  <section
    id="api-systems-integration-case-study"
    className="service-section api-integration-case-study api-integration-dark"
    aria-labelledby="api-integration-case-study-title"
  >
    <div className="service-container api-integration-case-study-grid">
      <div>
        <ApiSystemsIntegrationEyebrow variant="spotlight">
          INTEGRATION ARCHITECTURE
        </ApiSystemsIntegrationEyebrow>
        <h2 id="api-integration-case-study-title">
          Connecting CRM, ERP, and multi-app backends into one order-to-cash
          workflow.
        </h2>
        <p>
          Across multi-product ecosystems like BMS and custom B2B platforms, we
          replace fragile point-to-point webhooks with event-driven queues,
          idempotent retry workers, and dead-letter monitoring so records stay
          synchronized across sales, billing, and fulfillment.
        </p>
        <dl className="api-integration-case-metrics">
          {metrics.map(([value, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <img
        src={IMAGES.apiSystemsIntegrationCaseStudy}
        alt="API platform connecting cloud services, databases, and business systems through a central integration hub"
        width="484"
        height="416"
        loading="lazy"
      />
    </div>
  </section>
);

export default ApiSystemsIntegrationCaseStudy;
