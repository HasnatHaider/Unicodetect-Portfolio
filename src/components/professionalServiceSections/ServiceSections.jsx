import ReviewCard from "../sharedUi/ReviewCard";
import { clientReviews } from "../../utils/clientReviews";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ClipboardCheck,
  Film,
  Cloud,
  Code2,
  Compass,
  Database,
  Headphones,
  Layers,
  Minus,
  Plus,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import {
  Disclosure,
  DisclosureGroup,
  DisclosureSummary,
  SiteLink,
} from "../sharedUi/Interactive";
import PageBreadcrumb from "../sharedUi/PageBreadcrumb";
import usePageMetadata from "../../hooks/usePageMetadata";
import { IMAGES } from "../../utils/Constant";
import "../../assets/styles/pages/professionalServices.css";
import "../../assets/styles/pages/serviceDesignVariants.css";
const iconSets = {
  customSoftwareDevelopment: [Code2, Users, Layers, Workflow],
  crmErpSolutions: [Users, Database, Workflow, Layers],
  cloudDevOps: [Cloud, Code2, Layers, ShieldCheck],
  qaTesting: [ClipboardCheck, Code2, Layers, ShieldCheck],
  dedicatedProductTeams: [Users, Code2, Compass, Layers],
  productDiscoveryStrategy: [Users, Compass, Layers, Code2],
  maintenanceSupport: [Code2, Headphones, ShieldCheck, Workflow],
  aiVideoCreation: [Film, Layers, Workflow, ClipboardCheck, Compass, Cloud],
};
export const ServicePage = ({ service, children }) => {
  usePageMetadata({
    title: `${service.title} Services | UnicodeTech`,
    description: service.description,
    noIndex: service.noIndex,
    bodyClass: "site site-design professional-service-page-body",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      provider: {
        "@type": "Organization",
        name: "UnicodeTech",
        url: "https://unicodetech-dev.vercel.app",
      },
      description: service.description,
      url: `https://unicodetech-dev.vercel.app/${service.slug}`,
    },
  });
  return (
    <div
      className={`page-content professional-service-page service-design-${service.key}`}
    >
      {children}
    </div>
  );
};
export const ServiceHeading = ({ eyebrow, id, children, description }) => (
  <div className="professional-service-heading">
    <span className="professional-service-eyebrow">{eyebrow}</span>
    <h2 id={id}>{children}</h2>
    {description && <p>{description}</p>}
  </div>
);
export const ServiceHero = ({ service, note }) => (
  <section
    className="service-section professional-service-hero service-hero-theme"
    aria-labelledby="service-hero-title"
    style={{ "--service-hero-art": `url("${IMAGES[service.heroImage]}")` }}
  >
    <div className="service-container">
      <div className="professional-service-hero-copy">
        <PageBreadcrumb extraBottomMargin />
        <span className="professional-service-eyebrow">{service.eyebrow}</span>
        <h1 id="service-hero-title" className="service-hero-title">
          {service.headline}
        </h1>
        {service.painPoint && (
          <p className="services-pain-point">{service.painPoint}</p>
        )}
        <p className="professional-service-intro service-hero-description">
          {service.description}
        </p>
        {service.supportingStatement && (
          <p className="professional-service-supporting-statement">
            {service.supportingStatement}
          </p>
        )}
        <div className="professional-service-actions">
          <SiteLink
            schedule
            className="professional-service-button service-hero-button service-hero-button--primary"
          >
            {service.heroCta || "Book a Strategy Call"}{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </SiteLink>
          {!service.hideHeroSecondaryCta && (
            <a
              className="professional-service-text-link service-hero-button service-hero-button--secondary"
              href={
                service.heroSecondaryCtaHref ||
                service.secondaryCtaHref ||
                "#service-capabilities"
              }
            >
              {service.secondaryCtaLabel || "See what's included"}{" "}
              <span aria-hidden="true">
                <ArrowDown size={"1em"} aria-hidden="true" />
              </span>
            </a>
          )}
        </div>
        <p className="professional-service-hero-note">{note}</p>
      </div>
    </div>
  </section>
);
export const ServiceCapabilities = ({
  service,
  layout,
  title,
  description,
  eyebrow = "WHAT WE DO",
}) => (
  <section
    id="service-capabilities"
    className={`service-section professional-service-capability-section capabilities-${layout}`}
    aria-labelledby="service-capabilities-title"
  >
    <div className="service-container">
      <ServiceHeading
        eyebrow={eyebrow}
        id="service-capabilities-title"
        description={description}
      >
        {title}
      </ServiceHeading>
      <div className="professional-service-capabilities">
        {service.capabilities.map(
          ({ title: cardTitle, description: copy }, index) => {
            const Icon = iconSets[service.key][index];
            return (
              <article
                className="professional-service-capability"
                key={cardTitle}
              >
                <div className="professional-service-card-top">
                  <span>0{index + 1}</span>
                  <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="service-capability-text">
                  <h3>{cardTitle}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            );
          },
        )}
      </div>
    </div>
  </section>
);
export const ServiceProcess = ({ service, layout, title, description }) => (
  <section
    className={`service-section professional-service-process process-${layout}`}
    aria-labelledby="service-process-title"
  >
    <div className="service-container">
      <ServiceHeading
        eyebrow="HOW WE WORK"
        id="service-process-title"
        description={description}
      >
        {title}
      </ServiceHeading>
      <ol className="professional-service-steps">
        {service.process.map(
          ({ title: stepTitle, description: copy }, index) => (
            <li key={stepTitle}>
              <span className="professional-service-step-number">
                0{index + 1}
              </span>
              <div>
                <h3>{stepTitle}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ),
        )}
      </ol>
    </div>
  </section>
);
export const ServiceScenario = ({ service, layout }) => (
  <section
    className={`service-section professional-service-scenario scenario-${layout}`}
    aria-labelledby="service-scenario-title"
  >
    <div className="service-container professional-service-scenario-grid">
      <ServiceHeading
        eyebrow={service.scenario.label}
        id="service-scenario-title"
        description={service.scenario.description}
      >
        {service.scenario.title}
      </ServiceHeading>
      <div className="professional-service-delivery-plan">
        <div className="professional-service-plan-top">
          <span>THE DELIVERY PATH</span>
          <Workflow size={24} aria-hidden="true" />
        </div>
        <ol>
          {service.scenario.stages.map((stage, index) => (
            <li key={stage}>
              <span>0{index + 1}</span>
              <p>{stage}</p>
            </li>
          ))}
        </ol>
        <p className="professional-service-plan-note">
          {service.scenario.note ||
            `Milestones and acceptance criteria for ${service.title.toLowerCase()} are scoped around your system architecture and rollout timeline.`}
        </p>
      </div>
    </div>
  </section>
);
export const ServiceToolbox = ({ service }) => (
  <div className="professional-service-toolbox">
    <p>TOOLS & APPROACHES</p>
    <ul aria-label="Tools and approaches">
      {service.tools.map((tool) => (
        <li key={tool}>{tool}</li>
      ))}
    </ul>
    <p className="professional-service-toolbox-note">
      Selected for your environment, goals and delivery needs.
    </p>
  </div>
);
export const ServiceDeliverables = ({ service, layout, title }) => (
  <section
    className={`service-section professional-service-handover handover-${layout}`}
    aria-labelledby="service-deliverables-title"
  >
    <div className="service-container professional-service-handover-grid">
      <ServiceHeading
        eyebrow="WHAT YOU TAKE FORWARD"
        id="service-deliverables-title"
        description="Working deliverables, visible decisions and the context your team needs to move forward."
      >
        {title}
      </ServiceHeading>
      <ul className="professional-service-deliverables">
        {service.deliverables.map((item, index) => (
          <li key={item}>
            <span className="service-deliverable-number">0{index + 1}</span>
            <Check size={19} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <ServiceToolbox service={service} />
    </div>
  </section>
);
export const ServiceFaq = ({
  service,
  layout = "split",
  title = "A little clarity before we begin.",
}) => (
  <section
    className={`service-section professional-service-faq faq-${layout}`}
    aria-labelledby="service-faq-title"
  >
    <div className="service-container professional-service-faq-grid">
      <ServiceHeading eyebrow="COMMON QUESTIONS" id="service-faq-title">
        {title}
      </ServiceHeading>
      <DisclosureGroup className="professional-service-faq-list">
        {service.faqs.map(({ question, answer }, index) => (
          <Disclosure
            className="professional-service-disclosure"
            defaultOpen={index === 0}
            key={question}
          >
            <DisclosureSummary aria-controls={`service-answer-${index}`}>
              <span>{question}</span>
              <span
                className="professional-service-disclosure-icon lucide-disclosure-indicator"
                aria-hidden="true"
              >
                <Plus
                  size={18}
                  aria-hidden="true"
                  className="lucide-disclosure-plus"
                />
                <Minus
                  size={18}
                  aria-hidden="true"
                  className="lucide-disclosure-minus"
                />
              </span>
            </DisclosureSummary>
            <div
              id={`service-answer-${index}`}
              className="professional-service-answer"
            >
              <p>{answer}</p>
            </div>
          </Disclosure>
        ))}
      </DisclosureGroup>
    </div>
  </section>
);
export const ServiceCta = ({ service, layout = "centered" }) => (
  <>
    {(service.reviewCardId || service.review) && (
      <section className="service-section professional-service-review">
        <div className="service-container">
          {service.reviewCardId ? (
            <ReviewCard
              review={clientReviews[service.reviewCardId]}
              variant="case-study"
            />
          ) : (
            <blockquote className="professional-service-quote">
              <p>"{service.review}"</p>
              <footer>{service.reviewAttribution}</footer>
            </blockquote>
          )}
          {service.caseStudyLink && (
            <SiteLink
              href={service.caseStudyLink}
              className="professional-service-case-study-link"
            >
              View case study <ArrowUpRight size={14} aria-hidden="true" />
            </SiteLink>
          )}
        </div>
      </section>
    )}
    <section
      className={`service-section professional-service-cta cta-${layout}`}
      aria-labelledby="service-cta-title"
    >
      <div className="service-container">
        <div>
          <span className="professional-service-eyebrow">
            LET’S TALK ABOUT WHAT’S NEXT
          </span>
          <h2 id="service-cta-title">{service.cta}</h2>
          <p>
            {service.ctaDescription ||
              "Tell us where you are today and what you want to achieve. We’ll help define a practical next step."}
          </p>
        </div>
        <div className="professional-service-cta-actions">
          <SiteLink schedule className="professional-service-button">
            {service.ctaLabel || "Book a Strategy Call"}{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </SiteLink>
          {service.secondaryCta && service.secondaryCtaHref && (
            <SiteLink
              href={service.secondaryCtaHref}
              state={
                service.secondaryCtaBreadcrumb
                  ? { breadcrumbParent: service.secondaryCtaBreadcrumb }
                  : undefined
              }
              className="professional-service-button professional-service-button--secondary"
            >
              {service.secondaryCta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </SiteLink>
          )}
        </div>
      </div>
    </section>
  </>
);
