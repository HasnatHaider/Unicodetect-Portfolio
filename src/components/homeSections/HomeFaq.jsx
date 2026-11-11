import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { IMAGES } from "../../utils/Constant";
import {
  Disclosure,
  DisclosureGroup,
  DisclosureSummary,
  SiteLink,
} from "../sharedUi/Interactive";
const HomeFaq = () => {
  return (
    <div
      className="layout-item home-faq layout-full layout-flex layout section-root is-loaded"
      id="faq"
    >
      <div className="layout-item home-faq__layout layout-flex layout-boxed layout is-loaded">
        <div className="layout-inner is-loaded">
          <div className="layout-item home-faq__layout-2 layout-full layout-flex layout is-loaded">
            <div className="layout-item home-faq__layout-3 layout-full layout-flex layout is-loaded">
              <div className="layout-item home-faq__layout-4 layout-full layout-flex layout is-loaded">
                <div className="layout-item home-faq__image width-custom content-block block-image">
                  <div className="content-inner">
                    <img
                      loading="lazy"
                      decoding="async"
                      width="7"
                      height="7"
                      src={IMAGES.unicode_dde03f96_4d25_41b8_8269_8a0cd27cdc63}
                      alt=""
                    />
                  </div>
                </div>
                <div className="layout-item home-faq__common-questions content-block block-heading">
                  <div className="content-inner">
                    <div className="heading">COMMON QUESTIONS</div>
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__spacer content-block block-spacer">
                <div className="content-inner">
                  <div className="ui-spacer">
                    <div className="ui-spacer-inner"></div>
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__questions-teams-usually-ask-before-w content-block block-heading">
                <div className="content-inner">
                  <h2 className="heading">
                    Questions teams usually ask before we start.
                  </h2>
                </div>
              </div>
              <div className="layout-item home-faq__spacer-2 content-block block-spacer">
                <div className="content-inner">
                  <div className="ui-spacer">
                    <div className="ui-spacer-inner"></div>
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__clear-answers-upfront-make-better-pa content-block block-heading">
                <div className="content-inner">
                  <div className="heading">
                    Clear answers upfront make better partnerships later. The
                    details still depend on your product, but these are the
                    principles we work by.
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__spacer-3 content-block block-spacer">
                <div className="content-inner">
                  <div className="ui-spacer">
                    <div className="ui-spacer-inner"></div>
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__layout-5 layout-full layout-flex layout is-loaded">
                <div className="layout-item home-faq__still-unsure content-block block-heading">
                  <div className="content-inner">
                    <div className="heading">STILL UNSURE?</div>
                  </div>
                </div>
                <div className="layout-item home-faq__bring-the-messy-versionof-the-proble content-block block-heading">
                  <div className="content-inner">
                    <h3 className="heading">
                      Bring the messy version
                      <br />
                      of the problem.
                    </h3>
                  </div>
                </div>
                <div className="layout-item home-faq__a-rough-brief-existing-product-or-e content-block block-heading">
                  <div className="content-inner">
                    <div className="heading">
                      A rough brief, existing product or even a half-formed idea
                      is enough to start a useful conversation.
                    </div>
                  </div>
                </div>
                <div className="layout-item home-faq__button ui-align-left red-arrow-btn content-block">
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
            <DisclosureGroup className="layout-item home-faq__layout-6 layout-full layout-flex layout is-loaded">
              <div className="layout-item home-faq__nested-accordion content-block block-n-accordion">
                <div className="content-inner">
                  <div
                    className="disclosure-accordion"
                    aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys"
                  >
                    <Disclosure
                      id="faq-question-1"
                      className="disclosure-accordion-item"
                      defaultOpen
                    >
                      <DisclosureSummary
                        className="disclosure-accordion-item-title"
                        tabIndex="0"
                        aria-expanded="true"
                        aria-controls="faq-question-1"
                      >
                        <span className="disclosure-accordion-item-title-header">
                          <div className="disclosure-accordion-item-title-text">
                            {" How quickly can we start? "}
                          </div>
                        </span>
                        <span className="disclosure-accordion-item-title-icon">
                          <span className="layout-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="layout-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                      </DisclosureSummary>
                      <div
                        role="region"
                        aria-labelledby="faq-question-1"
                        className="layout-item home-faq__layout-7 layout-full layout-flex layout is-loaded"
                      >
                        <div className="layout-item home-faq__divider block-divider--view-line content-block block-divider">
                          <div className="content-inner">
                            <div className="ui-divider">
                              <span className="ui-divider-separator"></span>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__spacer-4 content-block block-spacer">
                          <div className="content-inner">
                            <div className="ui-spacer">
                              <div className="ui-spacer-inner"></div>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__once-scope-team-shape-and-prioritie content-block block-heading">
                          <div className="content-inner">
                            <div className="heading">
                              Most projects kick off within 1–2 weeks after we
                              confirm scope, team allocation, and the first
                              delivery milestone. If you need a fast technical
                              discovery or codebase audit first, we can start
                              that within a few business days.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Disclosure>
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__nested-accordion-2 content-block block-n-accordion">
                <div className="content-inner">
                  <div
                    className="disclosure-accordion"
                    aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys"
                  >
                    <Disclosure
                      id="faq-question-2"
                      className="disclosure-accordion-item"
                      defaultOpen={false}
                    >
                      <DisclosureSummary
                        className="disclosure-accordion-item-title"
                        tabIndex="0"
                        aria-expanded="false"
                        aria-controls="faq-question-2"
                      >
                        <span className="disclosure-accordion-item-title-header">
                          <div className="disclosure-accordion-item-title-text">
                            {
                              " Do you work with startups, established companies, or both? "
                            }
                          </div>
                        </span>
                        <span className="disclosure-accordion-item-title-icon">
                          <span className="layout-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="layout-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                      </DisclosureSummary>
                      <div
                        role="region"
                        aria-labelledby="faq-question-2"
                        className="layout-item home-faq__layout-8 layout-full layout-flex layout is-loaded"
                      >
                        <div className="layout-item home-faq__divider-2 block-divider--view-line content-block block-divider">
                          <div className="content-inner">
                            <div className="ui-divider">
                              <span className="ui-divider-separator"></span>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__spacer-5 content-block block-spacer">
                          <div className="content-inner">
                            <div className="ui-spacer">
                              <div className="ui-spacer-inner"></div>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__we-work-with-teams-at-different-prod content-block block-heading">
                          <div className="content-inner">
                            <div className="heading">
                              Both. For early-stage founders, we scope lean MVPs
                              with milestone-based pricing so you can launch
                              and validate quickly. For established companies,
                              we provide dedicated monthly product teams or
                              focused AI and integration sprints.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Disclosure>
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__nested-accordion-3 content-block block-n-accordion">
                <div className="content-inner">
                  <div
                    className="disclosure-accordion"
                    aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys"
                  >
                    <Disclosure
                      id="faq-question-3"
                      className="disclosure-accordion-item"
                      defaultOpen={false}
                    >
                      <DisclosureSummary
                        className="disclosure-accordion-item-title"
                        tabIndex="0"
                        aria-expanded="false"
                        aria-controls="faq-question-3"
                      >
                        <span className="disclosure-accordion-item-title-header">
                          <div className="disclosure-accordion-item-title-text">
                            {
                              " Can you take over an existing product or codebase? "
                            }
                          </div>
                        </span>
                        <span className="disclosure-accordion-item-title-icon">
                          <span className="layout-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="layout-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                      </DisclosureSummary>
                      <div
                        role="region"
                        aria-labelledby="faq-question-3"
                        className="layout-item home-faq__layout-9 layout-full layout-flex layout is-loaded"
                      >
                        <div className="layout-item home-faq__divider-3 block-divider--view-line content-block block-divider">
                          <div className="content-inner">
                            <div className="ui-divider">
                              <span className="ui-divider-separator"></span>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__spacer-6 content-block block-spacer">
                          <div className="content-inner">
                            <div className="ui-spacer">
                              <div className="ui-spacer-inner"></div>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__we-start-by-reviewing-the-existing-p content-block block-heading">
                          <div className="content-inner">
                            <div className="heading">
                              Yes. We begin with a 3–5 day codebase and
                              architecture audit covering test coverage,
                              deployment pipelines, security risks, and
                              technical debt, then give you a prioritized
                              stabilization and feature roadmap before taking
                              over delivery.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Disclosure>
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__nested-accordion-4 content-block block-n-accordion">
                <div className="content-inner">
                  <div
                    className="disclosure-accordion"
                    aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys"
                  >
                    <Disclosure
                      id="faq-question-4"
                      className="disclosure-accordion-item"
                      defaultOpen={false}
                    >
                      <DisclosureSummary
                        className="disclosure-accordion-item-title"
                        tabIndex="0"
                        aria-expanded="false"
                        aria-controls="faq-question-4"
                      >
                        <span className="disclosure-accordion-item-title-header">
                          <div className="disclosure-accordion-item-title-text">
                            {
                              " Who owns the source code and intellectual property? "
                            }
                          </div>
                        </span>
                        <span className="disclosure-accordion-item-title-icon">
                          <span className="layout-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="layout-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                      </DisclosureSummary>
                      <div
                        role="region"
                        aria-labelledby="faq-question-4"
                        className="layout-item home-faq__layout-10 layout-full layout-flex layout is-loaded"
                      >
                        <div className="layout-item home-faq__divider-4 block-divider--view-line content-block block-divider">
                          <div className="content-inner">
                            <div className="ui-divider">
                              <span className="ui-divider-separator"></span>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__spacer-7 content-block block-spacer">
                          <div className="content-inner">
                            <div className="ui-spacer">
                              <div className="ui-spacer-inner"></div>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__source-code-intellectual-property-a content-block block-heading">
                          <div className="content-inner">
                            <div className="heading">
                              You own 100% of your source code and IP. We put
                              that in writing in the project agreement before
                              work starts.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Disclosure>
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__nested-accordion-5 content-block block-n-accordion">
                <div className="content-inner">
                  <div
                    className="disclosure-accordion"
                    aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys"
                  >
                    <Disclosure
                      id="faq-question-5"
                      className="disclosure-accordion-item"
                      defaultOpen={false}
                    >
                      <DisclosureSummary
                        className="disclosure-accordion-item-title"
                        tabIndex="0"
                        aria-expanded="false"
                        aria-controls="faq-question-5"
                      >
                        <span className="disclosure-accordion-item-title-header">
                          <div className="disclosure-accordion-item-title-text">
                            {
                              " How do you handle scope changes during development? "
                            }
                          </div>
                        </span>
                        <span className="disclosure-accordion-item-title-icon">
                          <span className="layout-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="layout-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                      </DisclosureSummary>
                      <div
                        role="region"
                        aria-labelledby="faq-question-5"
                        className="layout-item home-faq__layout-11 layout-full layout-flex layout is-loaded"
                      >
                        <div className="layout-item home-faq__divider-5 block-divider--view-line content-block block-divider">
                          <div className="content-inner">
                            <div className="ui-divider">
                              <span className="ui-divider-separator"></span>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__spacer-8 content-block block-spacer">
                          <div className="content-inner">
                            <div className="ui-spacer">
                              <div className="ui-spacer-inner"></div>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__changes-are-reviewed-for-their-effec content-block block-heading">
                          <div className="content-inner">
                            <div className="heading">
                              When priorities shift mid-sprint, we document the
                              impact on timeline and budget in writing. You can
                              either swap an equal-sized item out of the current
                              milestone at zero extra cost or approve a clear
                              change order before we build it.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Disclosure>
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__nested-accordion-6 content-block block-n-accordion">
                <div className="content-inner">
                  <div
                    className="disclosure-accordion"
                    aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys"
                  >
                    <Disclosure
                      id="faq-question-6"
                      className="disclosure-accordion-item"
                      defaultOpen={false}
                    >
                      <DisclosureSummary
                        className="disclosure-accordion-item-title"
                        tabIndex="0"
                        aria-expanded="false"
                        aria-controls="faq-question-6"
                      >
                        <span className="disclosure-accordion-item-title-header">
                          <div className="disclosure-accordion-item-title-text">
                            {
                              " How do communication and progress updates work? "
                            }
                          </div>
                        </span>
                        <span className="disclosure-accordion-item-title-icon">
                          <span className="layout-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="layout-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                      </DisclosureSummary>
                      <div
                        role="region"
                        aria-labelledby="faq-question-6"
                        className="layout-item home-faq__layout-12 layout-full layout-flex layout is-loaded"
                      >
                        <div className="layout-item home-faq__divider-6 block-divider--view-line content-block block-divider">
                          <div className="content-inner">
                            <div className="ui-divider">
                              <span className="ui-divider-separator"></span>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__spacer-9 content-block block-spacer">
                          <div className="content-inner">
                            <div className="ui-spacer">
                              <div className="ui-spacer-inner"></div>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__we-align-on-regular-updates-working content-block block-heading">
                          <div className="content-inner">
                            <div className="heading">
                              You work directly with a named engineering lead in
                              a shared Slack channel and issue tracker, backed
                              by weekly working demos in staging and written
                              progress summaries every Friday.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Disclosure>
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__nested-accordion-7 content-block block-n-accordion">
                <div className="content-inner">
                  <div
                    className="disclosure-accordion"
                    aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys"
                  >
                    <Disclosure
                      id="faq-question-7"
                      className="disclosure-accordion-item"
                      defaultOpen={false}
                    >
                      <DisclosureSummary
                        className="disclosure-accordion-item-title"
                        tabIndex="0"
                        aria-expanded="false"
                        aria-controls="faq-question-7"
                      >
                        <span className="disclosure-accordion-item-title-header">
                          <div className="disclosure-accordion-item-title-text">
                            {
                              " Can you work alongside our internal product or engineering team? "
                            }
                          </div>
                        </span>
                        <span className="disclosure-accordion-item-title-icon">
                          <span className="layout-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="layout-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                      </DisclosureSummary>
                      <div
                        role="region"
                        aria-labelledby="faq-question-7"
                        className="layout-item home-faq__layout-13 layout-full layout-flex layout is-loaded"
                      >
                        <div className="layout-item home-faq__divider-7 block-divider--view-line content-block block-divider">
                          <div className="content-inner">
                            <div className="ui-divider">
                              <span className="ui-divider-separator"></span>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__spacer-10 content-block block-spacer">
                          <div className="content-inner">
                            <div className="ui-spacer">
                              <div className="ui-spacer-inner"></div>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__we-can-discuss-how-our-product-and-e content-block block-heading">
                          <div className="content-inner">
                            <div className="heading">
                              Yes. Our engineers work inside your Git
                              repositories, CI/CD pipelines, pull-request review
                              standards, and sprint rituals so there is never a
                              black-box handoff.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Disclosure>
                  </div>
                </div>
              </div>
              <div className="layout-item home-faq__nested-accordion-8 content-block block-n-accordion">
                <div className="content-inner">
                  <div
                    className="disclosure-accordion"
                    aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys"
                  >
                    <Disclosure
                      id="faq-question-8"
                      className="disclosure-accordion-item"
                      defaultOpen={false}
                    >
                      <DisclosureSummary
                        className="disclosure-accordion-item-title"
                        tabIndex="0"
                        aria-expanded="false"
                        aria-controls="faq-question-8"
                      >
                        <span className="disclosure-accordion-item-title-header">
                          <div className="disclosure-accordion-item-title-text">
                            {" What happens after launch? "}
                          </div>
                        </span>
                        <span className="disclosure-accordion-item-title-icon">
                          <span className="layout-opened">
                            <Minus size={"1em"} aria-hidden="true" />
                          </span>
                          <span className="layout-closed">
                            <Plus size={"1em"} aria-hidden="true" />
                          </span>
                        </span>
                      </DisclosureSummary>
                      <div
                        role="region"
                        aria-labelledby="faq-question-8"
                        className="layout-item home-faq__layout-14 layout-full layout-flex layout is-loaded"
                      >
                        <div className="layout-item home-faq__divider-8 block-divider--view-line content-block block-divider">
                          <div className="content-inner">
                            <div className="ui-divider">
                              <span className="ui-divider-separator"></span>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__spacer-11 content-block block-spacer">
                          <div className="content-inner">
                            <div className="ui-spacer">
                              <div className="ui-spacer-inner"></div>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item home-faq__launch-is-followed-by-the-support-m content-block block-heading">
                          <div className="content-inner">
                            <div className="heading">
                              Every production release includes a 30-day
                              post-launch warranty window for bug fixes and
                              stabilization. After that, you can transition to
                              your in-house team with full documentation or keep
                              us on a monthly support and feature retainer.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Disclosure>
                  </div>
                </div>
              </div>
            </DisclosureGroup>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeFaq;
