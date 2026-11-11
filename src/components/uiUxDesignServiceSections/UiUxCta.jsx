import { paths } from "../../routes/paths";
import { ArrowRight } from "lucide-react";
import { SiteLink } from "../sharedUi/Interactive";

const UiUxCta = () => (
  <section
    className="uiux-section uiux-cta uiux-dark"
    aria-labelledby="uiux-cta-title"
  >
    <div className="uiux-container">
      <span className="uiux-plain-eyebrow">LET’S COLLABORATE</span>
      <h2 id="uiux-cta-title">
        Build something
        <br /> extraordinary
      </h2>
      <p>
        Ready to redesign your flagship platform, build a high-performance
        design system, or create an engaging mobile application? Get in touch
        with our lead architects today.
      </p>
      <div className="uiux-actions">
        <SiteLink schedule className="uiux-button uiux-button-primary">
          Book a Strategy Call
        </SiteLink>
        <SiteLink
          href={paths.caseStudies}
          className="uiux-button uiux-button-outline"
        >
          View Our Work{" "}
          <span aria-hidden="true">
            <ArrowRight size={"1em"} aria-hidden="true" />
          </span>
        </SiteLink>
      </div>
      <p className="uiux-cta-note">Free • 30 minutes • No commitment</p>
    </div>
  </section>
);

export default UiUxCta;
