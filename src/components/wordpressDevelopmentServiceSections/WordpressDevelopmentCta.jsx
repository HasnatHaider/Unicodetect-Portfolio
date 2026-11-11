import { SiteLink } from "../sharedUi/Interactive";

const WordpressDevelopmentCta = () => (
  <section
    className="service-section wp-dev-cta"
    aria-labelledby="wp-dev-cta-title"
  >
    <div className="service-container">
      <h2 id="wp-dev-cta-title">
        Ready for a faster
        <br />
        WordPress site?
      </h2>
      <p>
        Book a free technical strategy call with our expert engineers. We’ll
        examine your current WordPress configuration, find technical
        bottlenecks, and map out a high-speed custom delivery blueprint.
      </p>
      <SiteLink
        schedule
        className="wp-dev-button wp-dev-button-primary"
      >
        Book a Strategy Call
      </SiteLink>
      <p className="wp-dev-cta-note">Free • 30 minutes • No commitment</p>
    </div>
  </section>
);

export default WordpressDevelopmentCta;
