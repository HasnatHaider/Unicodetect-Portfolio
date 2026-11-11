import { SiteLink } from "../sharedUi/Interactive";
import { ApiSystemsIntegrationEyebrow } from "./ApiSystemsIntegrationSectionHeading";

const ApiSystemsIntegrationCta = () => (
  <section
    className="service-section api-integration-cta"
    aria-labelledby="api-integration-cta-title"
  >
    <div className="service-container">
      <ApiSystemsIntegrationEyebrow>
        READY TO GET STARTED
      </ApiSystemsIntegrationEyebrow>
      <h2 id="api-integration-cta-title">
        Turn architectural friction into structured operations.
      </h2>
      <p>
        Bring us your fragmented schemas, high transaction rates, legacy ERPs,
        or sync errors. We will architect a highly secure, high-throughput
        integration pipeline tailored directly to your operating model.
      </p>
      <SiteLink schedule className="api-integration-audit-button">
        Book a Strategy Call
      </SiteLink>
    </div>
  </section>
);

export default ApiSystemsIntegrationCta;
