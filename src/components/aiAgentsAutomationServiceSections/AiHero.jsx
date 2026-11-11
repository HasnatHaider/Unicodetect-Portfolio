import { paths } from "../../routes/paths";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "../../utils/Constant";
import { SiteLink } from "../sharedUi/Interactive";
import PageBreadcrumb from "../sharedUi/PageBreadcrumb";

const AiHero = () => {
  return (
    <div className="layout-item ai-hero layout-full layout-flex layout section-root is-loaded service-hero-theme">
      <div className="layout-item ai-hero__image width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            decoding="async"
            width="840"
            height="840"
            src={IMAGES.unicode_ai_1d513f78_7ce4_40d4_877f_f09b1d152553}
            alt=""
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="layout-item ai-hero__layout layout-flex layout-boxed layout is-loaded">
        <div className="layout-inner is-loaded">
          <div className="layout-item ai-hero__layout-2 layout-full layout-flex layout is-loaded">
            <PageBreadcrumb />
            <div className="layout-item ai-hero__layout-3 layout-full layout-flex layout is-loaded">
              <div className="layout-item ai-hero__image-2 width-custom content-block block-image">
                <div className="content-inner">
                  <img
                    decoding="async"
                    width="8"
                    height="8"
                    src={IMAGES.unicode_ai_efbb3264_d20b_40aa_88bf_98c30087fdd7}
                    alt=""
                  />
                </div>
              </div>
              <div className="layout-item ai-hero__ai-agents-automation content-block block-heading">
                <div className="content-inner">
                  <p className="heading">AI agents &amp; automation</p>
                </div>
              </div>
            </div>
            <div className="layout-item ai-hero__ai-agents-automation-thatactually-w content-block block-heading">
              <div className="content-inner">
                <h1 className="heading service-hero-title">
                  AI Agents &amp; Automation That Actually Work.
                </h1>
              </div>
            </div>
            <div className="layout-item ai-hero__pain-point content-block block-heading">
              <div className="content-inner">
                <p className="services-pain-point">
                  Drowning in repetitive processes your team handles manually?
                </p>
              </div>
            </div>
            <div className="layout-item ai-hero__voice-ai-intelligent-custom-workflo content-block block-heading">
              <div className="content-inner">
                <p className="heading service-hero-description">
                  Voice AI, intelligent custom workflows, multi-agent copilots,
                  and production-ready integrations built to optimize real-world
                  business operations at scale.
                </p>
              </div>
            </div>
            <div className="layout-item ai-hero__layout-4 layout-full layout-flex layout is-loaded">
              <div className="layout-item ai-hero__button ui-align-left width-auto content-block">
                <div className="content-inner">
                  <div>
                    <SiteLink
                      schedule
                      className="button service-hero-button service-hero-button--primary"
                    >
                      <span className="button-content">
                        <span className="button-label">
                          Book a Strategy Call
                        </span>
                      </span>
                    </SiteLink>
                  </div>
                </div>
              </div>
              <div className="layout-item ai-hero__button-2 ui-align-left width-auto content-block">
                <div className="content-inner">
                  <div>
                    <SiteLink
                      className="button service-hero-button service-hero-button--secondary"
                      href={paths.caseStudies}
                    >
                      <span className="button-content">
                        <span className="button-label">View Case Studies</span>
                      </span>
                    </SiteLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item ai-hero__layout-5 layout-full layout-flex layout is-loaded">
              <div className="layout-item ai-hero__voice-ai content-block block-heading">
                <div className="content-inner">
                  <p className="heading">Voice AI</p>
                </div>
              </div>
              <div className="layout-item ai-hero__heading content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    <ArrowRight size={"1em"} aria-hidden="true" />
                  </p>
                </div>
              </div>
              <div className="layout-item ai-hero__workflow-automation content-block block-heading">
                <div className="content-inner">
                  <p className="heading">Workflow Automation</p>
                </div>
              </div>
              <div className="layout-item ai-hero__heading-2 content-block block-heading">
                <div className="content-inner">
                  <p className="heading">
                    <ArrowRight size={"1em"} aria-hidden="true" />
                  </p>
                </div>
              </div>
              <div className="layout-item ai-hero__agentic-ai-features content-block block-heading">
                <div className="content-inner">
                  <p className="heading">Agentic AI Features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiHero;
