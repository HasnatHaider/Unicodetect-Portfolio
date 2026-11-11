import usePageMetadata from "../hooks/usePageMetadata";
import { CompanyHero, CompanyHeading } from "../components/companySections/CompanyUi";
import { SiteLink } from "../components/sharedUi/Interactive";
import { paths } from "../routes/paths";
import { companyContent } from "../utils/companyContent";

export default function Accessibility() {
  usePageMetadata({
    title: "Accessibility Statement | UnicodeTech",
    description:
      "UnicodeTech is committed to building accessible digital experiences. Read our accessibility statement and learn how to report issues.",
    bodyClass: "site site-design company-page-body",
  });
  return (
    <div className="page-content company-page accessibility-page">
      <CompanyHero
        eyebrow="ACCESSIBILITY"
        title="Accessible by design."
        description="We're committed to ensuring our website and digital products are usable by everyone, regardless of ability or technology."
      />

      <section className="company-section" aria-labelledby="a11y-commitment">
        <div className="company-container company-story-grid">
          <CompanyHeading
            eyebrow="OUR COMMITMENT"
            title="Building for everyone."
            id="a11y-commitment"
          />
          <div className="company-story-copy">
            <p>
              UnicodeTech aims to meet the{" "}
              <strong>Web Content Accessibility Guidelines (WCAG) 2.2, Level AA</strong>.
              We continuously review and improve our website to remove barriers and
              ensure a consistent experience for all users.
            </p>
            <p>
              We use semantic HTML, keyboard-navigable interfaces, sufficient colour
              contrast, focus indicators, and screen-reader-friendly labelling across
              our pages and components.
            </p>
          </div>
        </div>
      </section>

      <section
        className="company-section company-dark-section"
        aria-labelledby="a11y-measures"
      >
        <div className="company-container">
          <CompanyHeading
            eyebrow="WHAT WE DO"
            title="Measures we take."
            id="a11y-measures"
          />
          <ul className="accessibility-measures">
            <li>Semantic HTML5 landmarks and heading hierarchy on every page</li>
            <li>Keyboard navigation and visible focus rings throughout</li>
            <li>Colour contrast ratios meeting WCAG 2.2 AA minimums</li>
            <li>Alt text on all meaningful images; decorative images marked <code>aria-hidden</code></li>
            <li>Skip-to-content link at the top of every page</li>
            <li>Reduced-motion support via <code>prefers-reduced-motion</code></li>
            <li>ARIA roles, labels, and live regions on interactive components</li>
            <li>No content that flashes more than three times per second</li>
          </ul>
        </div>
      </section>

      <section className="company-section" aria-labelledby="a11y-known">
        <div className="company-container company-story-grid">
          <CompanyHeading
            eyebrow="KNOWN LIMITATIONS"
            title="Areas we're actively improving."
            id="a11y-known"
          />
          <div className="company-story-copy">
            <p>
              While we strive for full WCAG 2.2 AA conformance, some third-party
              components (such as the Calendly scheduling widget) are outside our
              direct control. We work to minimise reliance on these where possible.
            </p>
            <p>
              We perform periodic accessibility audits and address issues as they are
              identified.
            </p>
          </div>
        </div>
      </section>

      <section
        className="company-section company-about-cta"
        aria-labelledby="a11y-contact"
      >
        <div className="company-container company-cta-row">
          <div>
            <CompanyHeading
              eyebrow="REPORT AN ISSUE"
              title="Found an accessibility barrier?"
              id="a11y-contact"
            />
            <p>
              If you experience difficulty accessing any part of our website,
              please contact us — we'll respond within 2 business days.
            </p>
          </div>
          <SiteLink href={`mailto:${companyContent.email}`} className="company-button">
            Email Our Team
          </SiteLink>
        </div>
      </section>
    </div>
  );
}
