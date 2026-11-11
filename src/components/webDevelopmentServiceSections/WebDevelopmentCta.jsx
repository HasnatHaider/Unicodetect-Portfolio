import { SiteLink } from "../sharedUi/Interactive";

const WebDevelopmentCta = () => (
  <section
    className="service-section web-dev-cta web-dev-dark"
    aria-labelledby="web-dev-cta-title"
  >
    <div className="service-container">
      <h2 id="web-dev-cta-title">
        Ready to Build Your
        <br />
        Next-Gen Web Platform?
      </h2>
      <p>
        Book a free technical strategy call. We will examine your current site
        performance, plan backend integration paths, and design a deployment
        timeline to optimize your core objectives.
      </p>
      <SiteLink
        schedule
        className="web-dev-button web-dev-button-primary"
      >
        Book a Strategy Call
      </SiteLink>
      <p className="web-dev-cta-note">Free • 30 minutes • No commitment</p>
    </div>
  </section>
);

export default WebDevelopmentCta;
