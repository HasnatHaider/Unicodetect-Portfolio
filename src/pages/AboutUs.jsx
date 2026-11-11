import {
  ArrowUpRight,
  Code2,
  Layers,
  ShieldCheck,
  Smartphone,
  Compass,
  Users,
  Workflow,
  Globe,
  Database,
  PenTool,
} from "lucide-react";
import usePageMetadata from "../hooks/usePageMetadata";
import { companyContent } from "../utils/companyContent";
import {
  CompanyHero,
  CompanyHeading,
} from "../components/companySections/CompanyUi";
import { SiteLink } from "../components/sharedUi/Interactive";
import { paths } from "../routes/paths";

const strengths = [
  {
    Icon: Code2,
    title: "Built around your business",
    text: "Customized websites and web applications shaped around the unique needs of your business.",
  },
  {
    Icon: Smartphone,
    title: "Digital products that connect",
    text: "Mobile applications engineered around real customer habits, retention, and business growth.",
  },
  {
    Icon: ShieldCheck,
    title: "Quality at every step",
    text: "Thorough testing for performance, security, and integrity before delivery.",
  },
  {
    Icon: Layers,
    title: "Support beyond delivery",
    text: "Development, delivery, and ongoing maintenance for your websites and applications.",
  },
];

const capabilities = [
  {
    Icon: Globe,
    title: "Websites & web applications",
    text: "Build a clear digital presence or a web application that supports the way your business operates. We connect interface design with the systems and data behind it.",
    href: paths.webDevelopment,
  },
  {
    Icon: Smartphone,
    title: "Mobile product engineering",
    text: "Bring your product closer to the people who use it. Our mobile engineering services cover application development, integrations, and the work needed to maintain a useful experience.",
    href: paths.mobileWeb,
  },
  {
    Icon: Code2,
    title: "Custom business software",
    text: "Shape software around your own processes instead of forcing your team to work around generic tools. Explore applications for workflows, customer portals, and business operations.",
    href: paths.customSoftwareDevelopment,
  },
  {
    Icon: Workflow,
    title: "AI & automation",
    text: "Explore where intelligent workflows and AI-assisted tools can support your product. Start with a clear business problem and an understanding of the people and systems involved.",
    href: paths.aiAgents,
  },
  {
    Icon: PenTool,
    title: "UI/UX & product design",
    text: "Make complex ideas easier to understand and use. Research, interface design, and design systems help create a coherent experience across your digital product.",
    href: paths.uiUx,
  },
  {
    Icon: Database,
    title: "Connected systems",
    text: "Bring applications, data, and business tools together through purposeful integrations. Clear boundaries and maintainable connections support your product as it develops.",
    href: paths.apiSystemsIntegration,
  },
];

const approach = companyContent.deliveryProcess;

export default function AboutUs() {
  usePageMetadata({
    title: "About UnicodeTech | Product Engineering Team in Lahore",
    description:
      "Meet UnicodeTech — a product engineering company based in Lahore shipping web, mobile, and AI products for clients in 15+ countries since 2023.",
    bodyClass: "site site-design company-page-body",
  });
  return (
    <div className="page-content company-page about-page">
      <CompanyHero
        eyebrow="WHO WE ARE"
        title="Product engineering built on long-term partnerships."
        description="Based in Lahore, our team of 30+ engineers, designers, and QA specialists ships web, mobile, and AI products for teams in 15+ countries."
      />
      <section className="company-section about-facts-section" aria-label="Company facts">
        <div className="company-container about-facts-row">
          <dl className="about-facts">
            <div>
              <dt>Founder &amp; CEO</dt>
              <dd>Mohsin Ali</dd>
            </div>
            <div>
              <dt>Founded</dt>
              <dd>{companyContent.foundedYear}</dd>
            </div>
            <div>
              <dt>In-house engineers</dt>
              <dd>30+</dd>
            </div>
            <div>
              <dt>Products delivered</dt>
              <dd>100+</dd>
            </div>
            <div>
              <dt>Countries served</dt>
              <dd>15+</dd>
            </div>
            <div>
              <dt>Base</dt>
              <dd>Lahore, Pakistan</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="company-section" aria-labelledby="about-story-title">
        <div className="company-container company-story-grid">
          <CompanyHeading
            eyebrow="OUR STORY"
            title={companyContent.title}
            id="about-story-title"
          />
          <div className="company-story-copy">
            <p>{companyContent.description}</p>
            <p>{companyContent.aboutStory}</p>
          </div>
        </div>
      </section>
      <section
        className="company-section company-dark-section"
        aria-labelledby="about-strengths-title"
      >
        <div className="company-container">
          <CompanyHeading
            eyebrow="WHY CHOOSE US"
            title="Reliable delivery. Thoughtful engineering."
            id="about-strengths-title"
          />
          <p className="company-section-intro">{companyContent.quality}</p>
          <div className="company-strengths">
            {strengths.map(({ Icon, title, text }) => (
              <article key={title}>
                <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="company-section"
        aria-labelledby="about-collaboration-title"
      >
        <div className="company-container company-collaboration-grid">
          <div>
            <CompanyHeading
              eyebrow="OUR PARTNERS"
              title="Good products start with strong collaboration."
              id="about-collaboration-title"
            />
            <p>
              Explore the teams we’ve partnered with and the products we’ve
              designed, engineered, and launched together.
            </p>
            <SiteLink
              className="company-text-link"
              href={paths.caseStudies}
            >
              Explore our partnerships{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </SiteLink>
          </div>
          <div className="company-toolkit">
            <span className="company-eyebrow">TECHNOLOGIES</span>
            <h3>The right tools for your product.</h3>
            <p>
              From websites and web applications to mobile platforms, our
              engineering approach is tailored to your project.
            </p>
            <SiteLink
              className="company-text-link"
              href={`${paths.home}#technology`}
            >
              Explore our technology stack{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </SiteLink>
          </div>
        </div>
      </section>
      <section
        className="company-section about-services-section"
        aria-labelledby="about-services-title"
      >
        <div className="company-container">
          <CompanyHeading
            eyebrow="WHAT WE DO"
            title="The expertise to move your idea forward."
            id="about-services-title"
          />
          <p className="company-section-intro">
            Every product has different needs. Explore the services that bring
            design, development, and connected systems together around yours.
          </p>
          <div className="about-services-grid">
            {capabilities.map(({ Icon, title, text, href }) => (
              <article key={title}>
                <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
                <SiteLink href={href} className="company-text-link">
                  See what's included{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </SiteLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="company-section about-approach-section"
        aria-labelledby="about-approach-title"
      >
        <div className="company-container">
          <CompanyHeading
            eyebrow="HOW WE WORK"
            title="From a shared understanding to a useful product."
            id="about-approach-title"
          />
          <p className="company-section-intro">
            Good engineering begins before the first line of code. Our approach
            connects your business context with the decisions that shape the
            product.
          </p>
          <ol className="about-approach-list">
            {approach.map(({ title, text }, index) => (
              <li key={title}>
                <span className="about-step-number">0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        className="company-section"
        aria-labelledby="about-principles-title"
      >
        <div className="company-container company-story-grid">
          <div>
            <CompanyHeading
              eyebrow="OUR WORKING PRINCIPLES"
              title="Clear communication. Shared direction."
              id="about-principles-title"
            />
            <p>
              Your understanding of the product matters as much as ours. Keep
              the conversation focused on the problem, the tradeoffs, and the
              next useful step.
            </p>
          </div>
          <div className="about-principles">
            <article>
              <Users size={24} aria-hidden="true" />
              <div>
                <h3>Work together</h3>
                <p>
                  Bring business knowledge and technical expertise into the same
                  conversation. Questions and feedback help shape a product that
                  makes sense to the people using it.
                </p>
              </div>
            </article>
            <article>
              <Compass size={24} aria-hidden="true" />
              <div>
                <h3>Keep the purpose clear</h3>
                <p>
                  Connect decisions to the goals of the project. A considered
                  scope helps keep attention on the experience and functionality
                  your business needs.
                </p>
              </div>
            </article>
            <article>
              <Layers size={24} aria-hidden="true" />
              <div>
                <h3>Think beyond launch</h3>
                <p>
                  Consider maintenance and future changes while designing and
                  building. The choices made today should support the next stage
                  of the product.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section
        className="company-section company-about-cta"
        aria-labelledby="about-contact-title"
      >
        <div className="company-container company-cta-row">
          <div>
            <CompanyHeading
              eyebrow="LET’S BUILD TOGETHER"
              title="Have a clear plan — or just an idea?"
              id="about-contact-title"
            />
            <p>We’re here to guide you every step of the way.</p>
          </div>
          <SiteLink schedule className="company-button">
            Book a Strategy Call{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </SiteLink>
        </div>
      </section>
    </div>
  );
}
