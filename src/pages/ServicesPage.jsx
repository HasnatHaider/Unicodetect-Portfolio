import { useState } from "react";
import "../assets/styles/pages/services.css";
import usePageMetadata from "../hooks/usePageMetadata";
import CalendlyLink from "../components/sharedUi/CalendlyLink";
import PageBreadcrumb from "../components/sharedUi/PageBreadcrumb";
const SERVICES = {
  1: {
    suite: "suite-ai",
    index: "PRACTICE #01",
    suiteBadge: "AI & Product",
    icon: "smart_toy",
    name: "AI Agents & Automation",
    subtext: "Voice AI, Workflows, Copilots, RAG",
    tag: "Autonomous",
    title: "AI Agents & Automation",
    path: "/ai-agents-automation",
    cadence: "7-14 Business Days",
    summary:
      "Voice AI, intelligent custom workflows, multi-agent copilots, and production-ready integrations built to optimize real-world business operations at scale. We design low-latency voice agents, embed semantic search into your products, and wire up internal AI copilots that work inside your team's existing tools.",
    deliverables: [
      {
        num: "01",
        text: "Low-latency Voice AI agents for booking, diagnostics, and customer routing.",
      },
      {
        num: "02",
        text: "Intelligent workflow automation via n8n, Make, and serverless orchestrators.",
      },
      {
        num: "03",
        text: "Embedded semantic search and predictive analysis on vector databases.",
      },
      {
        num: "04",
        text: "Internal team copilots with LLM-powered knowledge retrievers.",
      },
    ],
    stack: [
      "OpenAI",
      "LangChain",
      "n8n",
      "Make",
      "Twilio",
      "ElevenLabs",
      "Pinecone",
      "Python",
      "Node.js",
    ],
    proof:
      "Engineered BellReserve Voice AI and a multi-agent production system",
  },
  2: {
    suite: "suite-ai",
    index: "PRACTICE #02",
    suiteBadge: "AI & Product",
    icon: "search_insights",
    name: "Product Discovery & Strategy",
    subtext: "Research, prototyping, architecture planning",
    tag: "Strategy",
    title: "Product Discovery & Strategy",
    path: "/product-discovery-strategy",
    cadence: "5-10 Business Days",
    summary:
      "Understanding the problem, testing assumptions, and defining what to build first before any larger investment. Discovery connects user needs, business priorities, and technical reality into a clear scope and architecture recommendation before a single line of production code is written.",
    deliverables: [
      {
        num: "01",
        text: "User & stakeholder research: workflows, pain points, and context.",
      },
      {
        num: "02",
        text: "Product definition: objectives, journeys, and first-release scope.",
      },
      {
        num: "03",
        text: "Prototype with documented feedback from real users.",
      },
      {
        num: "04",
        text: "Architecture options, delivery risks, and a prioritized roadmap.",
      },
    ],
    stack: [
      "Figma",
      "FigJam",
      "Miro",
      "Notion",
      "User Interviews",
      "Architecture Workshops",
    ],
    proof:
      "Delivered discovery sprints for Series A and enterprise product teams",
  },
  3: {
    suite: "suite-ai",
    index: "PRACTICE #03",
    suiteBadge: "AI & Product",
    icon: "code",
    name: "Custom Software Development",
    subtext: "Business apps, portals, legacy modernization",
    tag: "Bespoke",
    title: "Custom Software Development",
    path: "/custom-software-development",
    cadence: "14-28 Business Days",
    summary:
      "Software designed and built around your workflows, users, and long-term product goals — replacing manual workarounds and rigid off-the-shelf tools with purposeful applications. From approval flows and operational dashboards to customer portals and legacy modernization, we ship software that fits the job.",
    deliverables: [
      {
        num: "01",
        text: "Business applications: approvals, reporting, and operational workflows.",
      },
      {
        num: "02",
        text: "Customer portals with self-service and role-based access.",
      },
      {
        num: "03",
        text: "Legacy modernization through incremental, risk-managed improvements.",
      },
      {
        num: "04",
        text: "Documented integrations, data models, and deployment configuration.",
      },
    ],
    stack: ["React", "Node.js", "Python", "PostgreSQL", "REST APIs", "Docker"],
    proof:
      "Replaced legacy workflows across finance, logistics, and healthcare clients",
  },
  4: {
    suite: "suite-web",
    index: "PRACTICE #04",
    suiteBadge: "Web & Commerce",
    icon: "dataset",
    name: "SaaS Development",
    subtext: "Multi-tenancy, billing, enterprise dashboards",
    tag: "Scale",
    title: "SaaS Development",
    path: "/saas-development",
    cadence: "14-28 Business Days",
    summary:
      "High-performance multi-tenant platforms, subscription billing systems, enterprise dashboards, and secure operational backends designed for sustainable business growth. We architect SaaS engines with granular organization hierarchies, Stripe subscription billing, audit trails, and onboarding workflows built to support growing customer bases.",
    deliverables: [
      {
        num: "01",
        text: "Multi-tenancy architecture with tenant-isolated data and permissions.",
      },
      {
        num: "02",
        text: "Stripe subscription workflows with usage-based metering.",
      },
      {
        num: "03",
        text: "Enterprise-grade backend APIs with audit-ready activity logs.",
      },
      {
        num: "04",
        text: "Weekly demos, transparent delivery, and full IP ownership from day one.",
      },
    ],
    stack: [
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Auth0",
      "AWS",
    ],
    proof: "Engineered multi-tenant SaaS platforms and subscription billing architectures",
  },
  5: {
    suite: "suite-web",
    index: "PRACTICE #05",
    suiteBadge: "Web & Commerce",
    icon: "web",
    name: "Web Development",
    subtext: "React, Next.js, headless CMS, backends",
    tag: "Frontend",
    title: "Web Development",
    path: "/web-development",
    cadence: "7-21 Business Days",
    summary:
      "Fast, accessible, and maintainable websites and web applications — from custom SaaS dashboards and real-time apps to Jamstack storefronts and headless CMS builds. We ship production-ready code with 95+ Lighthouse scores, clean architecture, and full documentation.",
    deliverables: [
      {
        num: "01",
        text: "Custom SaaS web apps: React, Next.js, real-time sync, dashboards.",
      },
      {
        num: "02",
        text: "Headless & Jamstack e-commerce with secure checkout and 95+ scores.",
      },
      {
        num: "03",
        text: "Decoupled CMS integration: Contentful, Strapi, Sanity.",
      },
      {
        num: "04",
        text: "Production-ready backends: high-availability APIs and microservices.",
      },
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Vercel",
      "GraphQL",
      "AWS",
    ],
    proof: "Delivered custom React, Next.js, and multi-product web platforms",
  },
  6: {
    suite: "suite-web",
    index: "PRACTICE #06",
    suiteBadge: "Web & Commerce",
    icon: "shopping_bag",
    name: "Shopify & E-commerce",
    subtext: "Custom themes, headless, checkout, ERP sync",
    tag: "Commerce",
    title: "Shopify & E-Commerce Development",
    path: "/shopify-e-commerce",
    cadence: "10-21 Business Days",
    summary:
      "Bespoke, lightning-fast Shopify stores, custom headless checkouts, and strategic integrations that turn standard store traffic into brand loyalists. From custom Liquid themes and payment gateway engineering to headless Hydrogen storefronts and multi-warehouse inventory sync — built for growing merchants.",
    deliverables: [
      {
        num: "01",
        text: "Custom Shopify themes with lightweight, conversion-optimized Liquid.",
      },
      {
        num: "02",
        text: "Payment gateway engineering: localized payments, multi-currency, Apple Pay.",
      },
      {
        num: "03",
        text: "Multi-warehouse inventory management and ERP synchronization.",
      },
      {
        num: "04",
        text: "Headless commerce with Shopify Storefront API and Jamstack frontend.",
      },
    ],
    stack: [
      "Shopify",
      "Liquid",
      "Hydrogen",
      "Oxygen",
      "Shopify GraphQL API",
      "Remix",
      "Tailwind CSS",
    ],
    proof: "Designed and built the custom Iconic Beauti Shopify storefront",
  },
  7: {
    suite: "suite-web",
    index: "PRACTICE #07",
    suiteBadge: "Web & Commerce",
    icon: "article",
    name: "WordPress Development",
    subtext: "Custom themes, plugins, headless, security",
    tag: "CMS",
    title: "WordPress Development",
    path: "/wordpress-development",
    cadence: "7-14 Business Days",
    summary:
      "Custom WordPress development with bespoke themes, plugins, and solutions tailored to your content and business needs. From custom Gutenberg blocks and headless WordPress APIs to legacy migrations, performance tuning, and enterprise security hardening — built on PHP 8.3 with modern cloud hosting.",
    deliverables: [
      {
        num: "01",
        text: "Custom Gutenberg blocks built with React for flexible editorial control.",
      },
      {
        num: "02",
        text: "Legacy platform migrations with speed optimization and performance tuning.",
      },
      {
        num: "03",
        text: "Headless & decoupled WordPress as a structured content API.",
      },
      {
        num: "04",
        text: "Enterprise security hardening: cloud hosting, database optimization, Cloudflare.",
      },
    ],
    stack: [
      "WordPress",
      "PHP 8.3",
      "Gutenberg (React)",
      "WPGraphQL",
      "Next.js",
      "WP Engine",
      "Cloudflare",
    ],
    proof:
      "Delivered custom Gutenberg blocks, headless CMS APIs, and site migrations",
  },
  8: {
    suite: "suite-design",
    index: "PRACTICE #08",
    suiteBadge: "Design, Mobile & Integration",
    icon: "design_services",
    name: "UI/UX Design",
    subtext: "Research, design systems, prototyping",
    tag: "Design",
    title: "UI/UX Design",
    path: "/ui-ux-design",
    cadence: "7-14 Business Days",
    summary:
      "User-centered design creating design systems, user research, prototypes, and polished interfaces for digital products. We run stakeholder interviews, usability testing, and persona mapping before crafting high-fidelity prototypes and scalable Figma-to-React design systems that eliminate developer ambiguity.",
    deliverables: [
      {
        num: "01",
        text: "User research & validation: interviews, usability testing, personas.",
      },
      {
        num: "02",
        text: "SaaS & web interface design: responsive, performance-optimized layouts.",
      },
      {
        num: "03",
        text: "High-fidelity prototypes mirroring final code behaviors and micro-interactions.",
      },
      {
        num: "04",
        text: "Scalable design systems: Figma tokens to React/Tailwind component libraries.",
      },
    ],
    stack: [
      "Figma",
      "React",
      "Tailwind CSS",
      "Design Tokens",
      "Storybook",
      "Chromatic",
    ],
    proof: "Standardized cross-platform UI systems for multiple SaaS products",
  },
  9: {
    suite: "suite-design",
    index: "PRACTICE #09",
    suiteBadge: "Design, Mobile & Integration",
    icon: "phone_iphone",
    name: "Mobile & Web Engineering",
    subtext: "iOS, Android, React Native, Flutter, PWA",
    tag: "Mobile",
    title: "Mobile & Web Engineering",
    path: "/mobile-web-engineering",
    cadence: "14-28 Business Days",
    summary:
      "Lightning-fast iOS, Android, and web products focused on real-world utility, native performance, and beautiful user experience. We build native Swift/SwiftUI, Kotlin, React Native, Flutter, and Progressive Web Apps — with offline-first sync, hardware integrations, and Fastlane CD pipelines.",
    deliverables: [
      {
        num: "01",
        text: "Native iOS (Swift & SwiftUI) and Android (Kotlin) development.",
      },
      {
        num: "02",
        text: "Cross-platform React Native and Flutter with offline-first sync.",
      },
      {
        num: "03",
        text: "Responsive web apps (Next.js & TypeScript) with PWA support.",
      },
      {
        num: "04",
        text: "Automated Fastlane pipelines for instant App Store & Google Play delivery.",
      },
    ],
    stack: [
      "Swift",
      "SwiftUI",
      "Kotlin",
      "React Native",
      "Flutter",
      "Next.js",
      "TypeScript",
      "Expo EAS",
    ],
    proof:
      "Shipped Spin The Night (4.6★ rating, 20k+ users) across iOS, Android, and tablet",
  },
  10: {
    suite: "suite-design",
    index: "PRACTICE #10",
    suiteBadge: "Design, Mobile & Integration",
    icon: "api",
    name: "API & Systems Integration",
    subtext: "REST, GraphQL, gRPC, event-driven, Kafka",
    tag: "Integration",
    title: "API & Systems Integration",
    path: "/api-systems-integration",
    cadence: "7-14 Business Days",
    summary:
      "Purpose-built APIs and integrations connecting business systems with maintainable integration layers that scale with your product. From RESTful and GraphQL APIs to Kafka event brokers, Salesforce connectors, and payment gateway wiring — we build the glue that makes your systems work together reliably.",
    deliverables: [
      {
        num: "01",
        text: "RESTful and GraphQL API design with rate-limiting and versioning.",
      },
      {
        num: "02",
        text: "Enterprise system connections: Salesforce, NetSuite, Stripe Connect.",
      },
      {
        num: "03",
        text: "Event-driven architecture: Apache Kafka, RabbitMQ, AWS SQS.",
      },
      {
        num: "04",
        text: "Real-time data synchronization with zero-downtime bi-directional sync.",
      },
    ],
    stack: [
      "RESTful APIs",
      "GraphQL",
      "gRPC",
      "Apache Kafka",
      "RabbitMQ",
      "AWS API Gateway",
      "Redis",
      "PostgreSQL",
    ],
    proof: "Interconnected 7 distinct operational apps in the BMS Ecosystem",
  },
  11: {
    suite: "suite-design",
    index: "PRACTICE #11",
    suiteBadge: "Design, Mobile & Integration",
    icon: "hub",
    name: "CRM & ERP Solutions",
    subtext: "Salesforce, HubSpot, Odoo, NetSuite",
    tag: "Enterprise",
    title: "CRM & ERP Solutions",
    path: "/crm-erp-solutions",
    cadence: "14-30 Business Days",
    summary:
      "Sales, finance, and operations connected through CRM and ERP workflows built around your teams — eliminating fragmented data and creating clear sources of truth. We implement pipelines, automate lifecycles, migrate data, and wire bi-directional sync between Salesforce, HubSpot, Odoo, and NetSuite.",
    deliverables: [
      {
        num: "01",
        text: "CRM implementation: pipelines, lifecycle stages, and automations.",
      },
      {
        num: "02",
        text: "ERP workflows: inventory, purchasing, and order management.",
      },
      {
        num: "03",
        text: "Data migration & integration: mapping, cleaning, and synchronization.",
      },
      {
        num: "04",
        text: "Reporting dashboards, automated workflows, and reconciliation reports.",
      },
    ],
    stack: [
      "Salesforce",
      "HubSpot",
      "Odoo",
      "Microsoft Dynamics",
      "NetSuite",
      "REST APIs",
      "Debezium",
    ],
    proof:
      "Connected sales, inventory, and operations workflows across CRM and ERP systems",
  },
  12: {
    suite: "suite-cloud",
    index: "PRACTICE #12",
    suiteBadge: "Cloud, Quality & Teams",
    icon: "cloud_done",
    name: "Cloud & DevOps",
    subtext: "AWS, Kubernetes, Terraform, CI/CD, IaC",
    tag: "Infra",
    title: "Cloud & DevOps",
    path: "/cloud-devops",
    cadence: "7-14 Business Days",
    summary:
      "A dependable path from commit to production — cloud infrastructure, CI/CD automation, and production visibility built around your application's needs. We provision AWS, Azure, and GCP multi-region architectures with zero-downtime deploys, Infrastructure as Code, and full observability from day one.",
    deliverables: [
      {
        num: "01",
        text: "Cloud architecture designed for resilience, scale, and cost efficiency.",
      },
      {
        num: "02",
        text: "CI/CD automation: repeatable build, test, and deployment pipelines.",
      },
      {
        num: "03",
        text: "Infrastructure as Code: versioned Terraform / OpenTofu configuration.",
      },
      {
        num: "04",
        text: "Monitoring dashboards, alert rules, and deployment & recovery runbooks.",
      },
    ],
    stack: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "ArgoCD",
    ],
    proof: "Automated CI/CD pipelines and containerized cloud environments on AWS and GCP",
  },
  13: {
    suite: "suite-cloud",
    index: "PRACTICE #13",
    suiteBadge: "Cloud, Quality & Teams",
    icon: "verified",
    name: "QA & Testing",
    subtext: "Playwright, Cypress, k6, accessibility",
    tag: "Quality",
    title: "QA & Testing",
    path: "/qa-testing",
    cadence: "5-10 Business Days",
    summary:
      "Quality integrated into the delivery process — combining focused manual testing and maintainable automation to understand risk before releases. We build Playwright E2E suites, k6 load simulations up to 50k concurrent users, accessibility audits, and release-readiness summaries that ship with every sprint.",
    deliverables: [
      {
        num: "01",
        text: "Functional & exploratory testing: scenarios, findings, and edge cases.",
      },
      {
        num: "02",
        text: "Test automation: high-value checks at the right layers (unit, integration, E2E).",
      },
      {
        num: "03",
        text: "Performance & compatibility: k6 workloads, cross-browser, and device testing.",
      },
      {
        num: "04",
        text: "Accessibility audits and release-readiness summaries per sprint.",
      },
    ],
    stack: [
      "Playwright",
      "Cypress",
      "Postman",
      "k6",
      "BrowserStack",
      "axe-core",
      "Jest / Vitest",
    ],
    proof:
      "Stress-tested high-traffic ticket sale releases with zero production drops",
  },
  14: {
    suite: "suite-cloud",
    index: "PRACTICE #14",
    suiteBadge: "Cloud, Quality & Teams",
    icon: "groups",
    name: "Dedicated Product Teams",
    subtext: "Cross-functional, embedded, your roadmap",
    tag: "Embedded",
    title: "Dedicated Product Teams",
    path: "/dedicated-product-teams",
    cadence: "7-14 Business Days Kickoff",
    summary:
      "A focused team of product, design, engineering, and quality working together around your roadmap — with visible priorities and shared ownership. Engineers aligned to your architecture, designers who know your system, QA built into every sprint, and continuity documentation that outlasts the engagement.",
    deliverables: [
      {
        num: "01",
        text: "Cross-functional delivery: design, engineering, testing, and coordination.",
      },
      {
        num: "02",
        text: "Engineering capacity aligned to your architecture and tech stack.",
      },
      {
        num: "03",
        text: "Product collaboration: translating roadmap into sprint-ready increments.",
      },
      {
        num: "04",
        text: "Reviewed code, test coverage, release documentation, and handover guide.",
      },
    ],
    stack: [
      "GitHub",
      "GitLab",
      "Jira",
      "Linear",
      "Figma",
      "Slack",
      "Agile / Scrum",
    ],
    proof:
      "Long-standing dedicated pods supporting Series A to Unicorn-stage teams",
  },
  15: {
    suite: "suite-cloud",
    index: "PRACTICE #15",
    suiteBadge: "Cloud, Quality & Teams",
    icon: "support_agent",
    name: "Maintenance & Support",
    subtext: "Incident response, updates, stability",
    tag: "SRE",
    title: "Maintenance & Support",
    path: "/maintenance-support",
    cadence: "Immediate Transition",
    summary:
      "Supporting the software your business relies on — with application maintenance, defect support, and planned improvements with clear ownership. Dependency reviews, performance monitoring, incident triage, and periodic health checks so your systems stay current, stable, and secure.",
    deliverables: [
      {
        num: "01",
        text: "Application maintenance: dependency reviews, updates, and security patches.",
      },
      {
        num: "02",
        text: "Incident & defect support: triage, prioritization, and root-cause fixes.",
      },
      {
        num: "03",
        text: "Performance & stability reviews with documented improvement plans.",
      },
      {
        num: "04",
        text: "Periodic health reviews and continuous improvement backlog.",
      },
    ],
    stack: [
      "Datadog",
      "Sentry",
      "PagerDuty",
      "Prometheus",
      "Grafana",
      "CI/CD Pipelines",
      "Runbooks",
    ],
    proof:
      "Ongoing production support and multi-year release management since 2024",
  },
  16: {
    suite: "suite-ai",
    index: "PRACTICE #16",
    suiteBadge: "AI & Product",
    icon: "movie",
    name: "AI Video Creation",
    subtext: "Creative direction, AI-assisted production, editing",
    tag: "Creative",
    title: "AI Video Creation",
    path: "/ai-video-creation",
    cadence: "Scoped to your brief",
    summary:
      "From scroll-stopping advertisements to cinematic brand stories, we create engaging AI-powered videos that help businesses capture attention, communicate their value, and drive growth.",
    deliverables: [
      { num: "01", text: "Creative brief and production outline for the agreed video scope." },
      { num: "02", text: "Script or storyboard for review before production." },
      { num: "03", text: "Reviewed video edit with agreed revisions." },
      { num: "04", text: "Final exports and included captions or format variants." },
    ],
    stack: ["Creative direction", "AI-assisted production", "Video editing", "Caption and export preparation"],
    proofLabel: "Creative Approach",
    proof:
      "Creative direction, AI-powered production, professional storytelling, and platform-ready delivery",
  },
};
const SUITES = [
  {
    id: "suite-ai",
    label: "SUITE A · AI & PRODUCT",
    icon: "smart_toy",
    labelClass: "suite-label-row--ai",
    serviceIds: [1, 2, 3, 16],
  },
  {
    id: "suite-web",
    label: "SUITE B · WEB & COMMERCE",
    icon: "web",
    labelClass: "suite-label-row--default",
    serviceIds: [4, 5, 6, 7],
  },
  {
    id: "suite-design",
    label: "SUITE C · DESIGN, MOBILE & INTEGRATION",
    icon: "devices",
    labelClass: "suite-label-row--default",
    serviceIds: [8, 9, 10, 11],
  },
  {
    id: "suite-cloud",
    label: "SUITE D · CLOUD, QUALITY & TEAMS",
    icon: "dns",
    labelClass: "suite-label-row--default",
    serviceIds: [12, 13, 14, 15],
  },
];
const CATEGORIES = [
  { id: "all", label: "All Practices (16)" },
  { id: "suite-ai", label: "AI & Product (4)" },
  { id: "suite-web", label: "Web & Commerce (4)" },
  { id: "suite-design", label: "Design, Mobile & Integration (4)" },
  { id: "suite-cloud", label: "Cloud, Quality & Teams (4)" },
];
const ServicesPage = () => {
  usePageMetadata({
    title: "Services | UnicodeTech — 16 Specialized Engineering Practices",
    description:
      "Explore UnicodeTech\u2019s 16 specialized engineering practices — AI video creation, AI agents, SaaS platforms, mobile apps, cloud infrastructure, and dedicated product teams.",
    bodyClass: "site services-page",
  });
  const [selectedId, setSelectedId] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === "all") {
      setSelectedId(1);
    } else {
      const suite = SUITES.find((s) => s.id === catId);
      if (suite && suite.serviceIds.length > 0) {
        setSelectedId(suite.serviceIds[0]);
      }
    }
  };
  const visibleSuites =
    activeCategory === "all"
      ? SUITES
      : SUITES.filter((s) => s.id === activeCategory);
  const visibleCount = visibleSuites.reduce(
    (sum, s) => sum + s.serviceIds.length,
    0,
  );
  const current = SERVICES[selectedId];
  return (
    <div className="services-page">
      {}
      <section className="services-hero">
        <svg
          className="hero-grid-overlay"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="svc-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="#e7e4df"
                strokeWidth="0.75"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#svc-grid)" />
        </svg>
        <div className="hero-inner">
          <div className="hero-top-row">
            <div className="hero-text-block">
              <PageBreadcrumb />
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" aria-hidden="true" />
                Practice Directory • Engineering Services
              </div>
              <h1 className="hero-heading">
                Engineering services for{" "}
                <span className="hero-heading-accent">
                  every layer of your product.
                </span>
              </h1>
              <p className="hero-description">
                From AI agents and SaaS platforms to mobile apps, cloud
                infrastructure, and dedicated product teams — 16 specialized
                practices built to ship production-grade software at velocity.
              </p>
            </div>
            <div className="metric-ribbon">
              <div className="metric-card">
                <div className="metric-value">100+</div>
                <div className="metric-label">Products Delivered</div>
              </div>
              {/* <div className="metric-card">
                <div className="metric-value">Est. 2023</div>
                <div className="metric-label">Founded in Lahore</div>
              </div> */}
              <div className="metric-card">
                <div className="metric-value metric-value--accent">
                  &lt;14 Days
                </div>
                <div className="metric-label">Mobilization</div>
              </div>
              <div className="metric-card">
                <div className="metric-value metric-value--teal">100%</div>
                <div className="metric-label">Client IP Day 1</div>
              </div>
            </div>
          </div>
          <div
            className="filter-bar"
            role="tablist"
            aria-label="Service categories"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`filter-pill${activeCategory === cat.id ? " filter-pill--active" : ""}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      {}
      <div className="services-detail-section">
        <div className="master-detail-grid">
          {}
          <div className="practice-navigator">
            <div className="navigator-header-row">
              <span className="navigator-label">
                PRACTICE REGISTRY · SELECTOR
              </span>
              <span className="navigator-count">
                {visibleCount} of 16 Practices
              </span>
            </div>
            <div className="practice-list">
              {visibleSuites.map((suite) => (
                <div key={suite.id} className="suite-group">
                  <div className={`suite-label-row ${suite.labelClass}`}>
                    <span>{suite.label}</span>
                    <span className="material-symbols-outlined suite-label-icon">
                      {suite.icon}
                    </span>
                  </div>
                  {suite.serviceIds.map((id) => {
                    const svc = SERVICES[id];
                    const isActive = selectedId === id;
                    return (
                      <button
                        key={id}
                        className={`service-btn${isActive ? " service-btn--active" : ""}`}
                        onClick={() => setSelectedId(id)}
                        aria-pressed={isActive}
                      >
                        <div className="service-btn-left">
                          <span className="material-symbols-outlined service-btn-icon">
                            {svc.icon}
                          </span>
                          <div className="service-btn-text">
                            <span className="service-btn-name">{svc.name}</span>
                            <span className="service-btn-sub">
                              {svc.subtext}
                            </span>
                          </div>
                        </div>
                        <span className="service-tag">{svc.tag}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          {}
          <div className="dossier-card">
            <div className="dossier-card-header">
              <div>
                <div className="dossier-badge-row">
                  <span className="dossier-index-badge">{current.index}</span>
                  <span className="dossier-suite-badge">
                    {current.suiteBadge}
                  </span>
                </div>
                <h2 className="dossier-title">{current.title}</h2>
              </div>
              <div className="dossier-cadence-block">
                <span className="dossier-cadence-label">
                  Mobilization Cadence
                </span>
                <span className="dossier-cadence-value">{current.cadence}</span>
              </div>
            </div>
            <div className="dossier-section">
              <div className="dossier-section-label">SERVICE OVERVIEW</div>
              <p className="dossier-summary-text">{current.summary}</p>
            </div>
            <div className="deliverables-box">
              <div className="deliverables-heading">
                <span className="material-symbols-outlined deliverables-heading-icon">
                  verified
                </span>
                What We Deliver
              </div>
              <ul className="deliverables-list">
                {current.deliverables.map((item) => (
                  <li key={item.num} className="deliverable-item">
                    <span className="deliverable-num">{item.num}.</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dossier-section">
              <div className="dossier-section-label">TOOLS & TECHNOLOGIES</div>
              <div className="stack-pills">
                {current.stack.map((tech) => (
                  <span key={tech} className="stack-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="proof-bar">
              <div className="proof-left">
                <div className="proof-icon-circle">
                  <span className="material-symbols-outlined">award_star</span>
                </div>
                <div>
                  <span className="proof-meta-label">
                    {current.proofLabel || "Production Proof"}
                  </span>
                  <span className="proof-meta-text">{current.proof}</span>
                </div>
              </div>
              <div className="proof-actions">
                <a
                  className="scope-cta-btn scope-cta-btn--secondary"
                  href={current.path}
                >
                  <span>Learn More</span>
                  <span className="material-symbols-outlined scope-cta-icon">
                    open_in_new
                  </span>
                </a>
                <CalendlyLink className="scope-cta-btn">
                  <span>Book a Strategy Call</span>
                  <span className="material-symbols-outlined scope-cta-icon">
                    arrow_forward
                  </span>
                </CalendlyLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      {}
      <section className="engagement-section">
        <div className="engagement-inner">
          <div className="engagement-top-row">
            <div>
              <div className="engagement-eyebrow">
                TRANSPARENT ENGAGEMENT PROTOCOLS
              </div>
              <h2 className="engagement-heading">
                Structured for High Velocity. No Bureaucracy.
              </h2>
            </div>
            <p className="engagement-sub-text">
              Predictable delivery models tailored to technical scope, speed
              requirements, and ongoing scaling benchmarks.
            </p>
          </div>
          <div className="engagement-cards-grid">
            {}
            <div className="engagement-card">
              <div className="card-bg-decoration" aria-hidden="true" />
              <div>
                <div className="card-top-row">
                  <span className="card-type-badge">Continuous Pod</span>
                  <span className="card-kickoff-label">14d Kickoff</span>
                </div>
                <h3 className="card-title">Dedicated Engineering Pod</h3>
                <p className="card-description">
                  Cross-functional squads — Staff Engineer, 2–4
                  Full-Stack/Backend Engineers, Lead QA, Product Architect —
                  integrated directly into your Jira/Slack with full-time
                  allocation.
                </p>
                <div className="card-feature-list">
                  <div className="card-feature-item">
                    <span className="material-symbols-outlined feature-check-icon feature-check-icon--green">
                      check_circle
                    </span>
                    <span>Full-time allocation — no shared resources</span>
                  </div>
                  <div className="card-feature-item">
                    <span className="material-symbols-outlined feature-check-icon feature-check-icon--green">
                      check_circle
                    </span>
                    <span>Monthly rolling cadence with 30-day flexibility</span>
                  </div>
                  <div className="card-feature-item">
                    <span className="material-symbols-outlined feature-check-icon feature-check-icon--green">
                      check_circle
                    </span>
                    <span>
                      Daily standups — US and EU timezone overlap available
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-footer-block">
                <span className="card-footer-label">Ideal For</span>
                <div className="card-footer-text">
                  Scale-ups needing rapid feature release and architectural
                  muscle.
                </div>
              </div>
            </div>
            {}
            <div className="engagement-card engagement-card--featured">
              <div className="card-popular-badge">Most Popular</div>
              <div>
                <div className="card-top-row">
                  <span className="card-type-badge">Turnkey Milestone</span>
                  <span className="card-kickoff-label">Defined SLA</span>
                </div>
                <h3 className="card-title">Fixed-Scope Product Release</h3>
                <p className="card-description">
                  From technical PRD and prototype validation to production
                  deployment. Capped budget, clear milestones, and defined
                  performance targets with 30-day post-launch warranty.
                </p>
                <div className="card-feature-list">
                  <div className="card-feature-item">
                    <span className="material-symbols-outlined feature-check-icon feature-check-icon--red">
                      check_circle
                    </span>
                    <span>
                      Strict milestone deliverables with acceptance criteria
                    </span>
                  </div>
                  <div className="card-feature-item">
                    <span className="material-symbols-outlined feature-check-icon feature-check-icon--red">
                      check_circle
                    </span>
                    <span>
                      30-day post-launch warranty &amp; hypercare included
                    </span>
                  </div>
                  <div className="card-feature-item">
                    <span className="material-symbols-outlined feature-check-icon feature-check-icon--red">
                      check_circle
                    </span>
                    <span>Complete CI/CD, documentation &amp; IP transfer</span>
                  </div>
                </div>
              </div>
              <div className="card-footer-block">
                <span className="card-footer-label">Ideal For</span>
                <div className="card-footer-text">
                  Greenfield apps, MVP launches, or discrete module rewrites.
                </div>
              </div>
            </div>
            {}
            <div className="engagement-card">
              <div>
                <div className="card-top-row">
                  <span className="card-type-badge">2-4 Week Sprint</span>
                  <span className="card-kickoff-label card-kickoff-label--teal">
                    Fast
                  </span>
                </div>
                <h3 className="card-title">
                  Discovery &amp; Architecture Sprint
                </h3>
                <p className="card-description">
                  Rapid validation of product hypotheses, technical architecture
                  options, or AI feasibility — with a working prototype and
                  production-ready implementation blueprint.
                </p>
                <div className="card-feature-list">
                  <div className="card-feature-item">
                    <span className="material-symbols-outlined feature-check-icon feature-check-icon--green">
                      check_circle
                    </span>
                    <span>
                      Live working prototype integrated with your data
                    </span>
                  </div>
                  <div className="card-feature-item">
                    <span className="material-symbols-outlined feature-check-icon feature-check-icon--green">
                      check_circle
                    </span>
                    <span>
                      Architecture options with delivery risks documented
                    </span>
                  </div>
                  <div className="card-feature-item">
                    <span className="material-symbols-outlined feature-check-icon feature-check-icon--green">
                      check_circle
                    </span>
                    <span>Production scale-up implementation blueprint</span>
                  </div>
                </div>
              </div>
              <div className="card-footer-block">
                <span className="card-footer-label">Ideal For</span>
                <div className="card-footer-text">
                  Teams assessing technical feasibility before committing
                  capital.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-dark-card">
            <svg
              className="cta-mesh-overlay"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="20"
                x2="100%"
                y2="20"
                stroke="#14B8A6"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <line
                x1="0"
                y1="80"
                x2="100%"
                y2="80"
                stroke="#14B8A6"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <line
                x1="0"
                y1="140"
                x2="100%"
                y2="140"
                stroke="#14B8A6"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
            </svg>
            <div className="cta-content-row">
              <div className="cta-text-col">
                <div className="cta-eyebrow-row">
                  <span className="cta-eyebrow-dot" aria-hidden="true" />
                  Direct Technical Engagement
                </div>
                <h2 className="cta-heading">
                  Ready to build something that ships?{" "}
                  <span className="cta-heading-accent">
                    Bring your hardest requirements.
                  </span>
                </h2>
                <div className="cta-trust-row">
                  <span>
                    <span className="trust-check">✓</span> Zero vendor lock-in
                  </span>
                  <span>
                    <span className="trust-check">✓</span> 100% Client IP
                    Ownership
                  </span>
                  <span>
                    <span className="trust-check">✓</span> Direct Senior
                    Engineer Access
                  </span>
                </div>
              </div>
              <div className="cta-buttons-col">
                <CalendlyLink className="cta-btn-book">
                  <span>Book a Strategy Call</span>
                  <span className="material-symbols-outlined cta-btn-icon">
                    calendar_month
                  </span>
                </CalendlyLink>
                <a className="cta-btn-download" href="/contact">
                  <span>Get in Touch</span>
                  <span className="material-symbols-outlined cta-btn-icon">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ServicesPage;
