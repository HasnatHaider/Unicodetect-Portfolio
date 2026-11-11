import { ArrowUpRight } from "lucide-react";
import { SiteLink } from "../sharedUi/Interactive";
import { paths } from "../../routes/paths";
import { companyContent } from "../../utils/companyContent";

const Footer = () => {
  return (
    <footer>
      <div className="page-content footer-page">
        <div
          className="layout-item footer-unicodetech-footer layout-full layout-flex layout section-root is-loaded"
          id="unicodetech-footer"
        >
          <div className="layout-item footer-unicodetech-footer__layout layout-flex layout-boxed layout is-loaded">
            <div className="layout-inner is-loaded">
              <div className="layout-item footer-unicodetech-footer__divider block-divider--view-line content-block block-divider">
                <div className="content-inner">
                  <div className="ui-divider">
                    <span className="ui-divider-separator"></span>
                  </div>
                </div>
              </div>
              <div className="layout-item footer-unicodetech-footer__spacer content-block block-spacer">
                <div className="content-inner">
                  <div className="ui-spacer">
                    <div className="ui-spacer-inner"></div>
                  </div>
                </div>
              </div>
              <div className="layout-item footer-unicodetech-footer__layout-2 layout-grid layout-full layout is-loaded">
                <div className="layout-item footer-unicodetech-footer__layout-3 layout-full layout-flex layout is-loaded">
                  <div className="layout-item footer-unicodetech-footer__unicodetech content-block block-heading">
                    <div className="content-inner">
                      <h3 className="heading">
                        Unicode<span style={{ color: "#ee3e23" }}>Tech</span>
                      </h3>
                    </div>
                  </div>
                  <div className="layout-item footer-unicodetech-footer__spacer-2 content-block block-spacer">
                    <div className="content-inner">
                      <div className="ui-spacer">
                        <div className="ui-spacer-inner"></div>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-unicodetech-footer__product-engineering-for-saas-ai-mo content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        We turn ambitious ideas into reliable digital products that help businesses grow.
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-unicodetech-footer__spacer-3 content-block block-spacer">
                    <div className="content-inner">
                      <div className="ui-spacer">
                        <div className="ui-spacer-inner"></div>
                      </div>
                    </div>
                  </div>
                  <nav
                    className="footer-social-links"
                    aria-label="Follow UnicodeTech"
                  >
                    <SiteLink
                      href="https://www.linkedin.com/company/unicodetech/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="UnicodeTech on LinkedIn (opens in a new tab)"
                    >
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M5.372 24H.398V7.982h4.974ZM2.882 5.797A2.884 2.884 0 1 1 2.882.029a2.884 2.884 0 0 1 0 5.768ZM24 24h-4.965v-7.794c0-1.858-.038-4.248-2.589-4.248-2.589 0-2.986 2.024-2.986 4.114V24H8.49V7.982h4.771v2.185h.07c.664-1.26 2.286-2.589 4.705-2.589 5.033 0 5.964 3.313 5.964 7.621Z" />
                      </svg>
                    </SiteLink>
                    <SiteLink
                      href="https://github.com/UnicodeTech-PVT"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="UnicodeTech on GitHub (opens in a new tab)"
                    >
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.334-5.466-5.931 0-1.31.465-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.805 5.628-5.478 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </SiteLink>
                    <SiteLink
                      href="https://www.facebook.com/profile.php?id=61555655735585&mibextid=ZbWKwL"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="UnicodeTech on Facebook (opens in a new tab)"
                    >
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0c-3.159 0-5.323 1.987-5.323 5.639V9H6.188v4.266h3.485V24h4.273V13.267h3.344L17.821 9h-3.876V6.062c0-1.233.333-2.077 2.052-2.077Z" />
                      </svg>
                    </SiteLink>
                  </nav>
                </div>
                <div className="layout-item footer-unicodetech-footer__layout-5 layout-full layout-flex layout is-loaded">
                  <div className="layout-item footer-unicodetech-footer__company content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">COMPANY</div>
                    </div>
                  </div>
                  <div className="layout-item footer-unicodetech-footer__spacer-5 content-block block-spacer">
                    <div className="content-inner">
                      <div className="ui-spacer">
                        <div className="ui-spacer-inner"></div>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-navigation-item content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href={paths.about}>
                          About UnicodeTech
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-navigation-item content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href="/#experience">Our Experience</SiteLink>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-navigation-item content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href="/#client-trust">
                          Client Testimonials
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-navigation-item content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href="/#delivery-process">
                          How We Work
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-navigation-item content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href={paths.contact}>
                          Contact Our Team
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="layout-item footer-unicodetech-footer__layout-6 layout-full layout-flex layout is-loaded">
                  <div className="layout-item footer-unicodetech-footer__explore content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">EXPLORE</div>
                    </div>
                  </div>
                  <div className="layout-item footer-unicodetech-footer__spacer-6 content-block block-spacer">
                    <div className="content-inner">
                      <div className="ui-spacer">
                        <div className="ui-spacer-inner"></div>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-navigation-item content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href={paths.caseStudies}>
                          Success Stories
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-navigation-item content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href={paths.aiVideoCreation}>
                          AI Video Creation
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-navigation-item content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href="/#industries">
                          Industries We Serve
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-navigation-item content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href="/#technology">
                          Technology & Expertise
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-navigation-item content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href="/#engagement-models">
                          Engagement Models
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-navigation-item content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href="/#faq">
                          Frequently Asked Questions
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="layout-item footer-unicodetech-footer__layout-7 layout-full layout-flex layout is-loaded">
                  <div className="layout-item footer-unicodetech-footer__start-a-project content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">START A PROJECT</div>
                    </div>
                  </div>
                  <div className="layout-item footer-unicodetech-footer__spacer-7 content-block block-spacer">
                    <div className="content-inner">
                      <div className="ui-spacer">
                        <div className="ui-spacer-inner"></div>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-unicodetech-footer__hello-unicodetech-com content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink
                          target="_blank"
                          href="mailto:info@unicodetech.com"
                        >
                          info@unicodetech.com
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-unicodetech-footer__hello-unicodetech-com content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        <SiteLink href={companyContent.office.phoneHref}>
                          {companyContent.office.phone}
                        </SiteLink>
                        {" · "}
                        <SiteLink href={companyContent.consultationPhoneHref}>
                          {companyContent.consultationPhone}
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-unicodetech-footer__hello-unicodetech-com content-block block-heading">
                    <div className="content-inner">
                      <div className="heading" style={{ opacity: 0.8 }}>
                        {companyContent.locationLabel}
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-unicodetech-footer__tell-us-what-you-are-building content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                        Tell us what you're building.
                      </div>
                    </div>
                  </div>
                  <div className="layout-item footer-unicodetech-footer__button ui-align-left red-arrow-btn content-block">
                    <div className="content-inner">
                      <div>
                        <SiteLink schedule className="button">
                          <span className="button-content">
                            <span className="button-icon">
                              <ArrowUpRight size={"1em"} aria-hidden="true" />
                            </span>
                            <span className="button-label">
                              Book a Strategy Call
                            </span>
                          </span>
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="layout-item footer-unicodetech-footer__divider-2 block-divider--view-line content-block block-divider">
                <div className="content-inner">
                  <div className="ui-divider">
                    <span className="ui-divider-separator"></span>
                  </div>
                </div>
              </div>
              <div className="layout-item footer-unicodetech-footer__spacer-8 content-block block-spacer">
                <div className="content-inner">
                  <div className="ui-spacer">
                    <div className="ui-spacer-inner"></div>
                  </div>
                </div>
              </div>
              <div className="layout-item footer-unicodetech-footer__layout-8 layout-full layout-flex layout is-loaded">
                <div className="layout-item footer-unicodetech-footer__layout-9 layout-full layout-flex layout is-loaded">
                  <div className="layout-item footer-unicodetech-footer__2026-unicodetech-pvt-ltd-all-ri content-block block-heading">
                    <div className="content-inner">
                      <div className="heading">
                      © {new Date().getFullYear()} UnicodeTech (Pvt) Ltd. All rights reserved.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="layout-item footer-unicodetech-footer__layout-10 layout-full layout-flex layout is-loaded">
                  <div className="layout-item footer-unicodetech-footer__layout-11 layout-full layout-flex layout is-loaded">
                    <div className="layout-item footer-unicodetech-footer__privacy content-block block-heading">
                      <div className="content-inner">
                        <div className="heading">
                          <SiteLink href={paths.termsAndConditions}>
                            Terms & Conditions
                          </SiteLink>
                        </div>
                      </div>
                    </div>
                    <div className="layout-item footer-unicodetech-footer__terms content-block block-heading">
                      <div className="content-inner">
                        <div className="heading">
                          <SiteLink href={paths.privacyPolicy}>
                            Privacy Policy
                          </SiteLink>
                        </div>
                      </div>
                    </div>
                    <div className="layout-item footer-unicodetech-footer__terms content-block block-heading">
                      <div className="content-inner">
                        <div className="heading">
                          <SiteLink href={paths.accessibility}>
                            Accessibility
                          </SiteLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
