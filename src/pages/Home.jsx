import "../assets/styles/pages/home.css";
import usePageMetadata from "../hooks/usePageMetadata";
import HomeHero from "../components/homeSections/HomeHero";
import HomeExperience from "../components/homeSections/HomeExperience";
import HomeServices from "../components/homeSections/HomeServices";
import HomeSuccessStories from "../components/homeSections/HomeSuccessStories";
import HomeAiEngineering from "../components/homeSections/HomeAiEngineering";
import HomeIndustries from "../components/homeSections/HomeIndustries";
import HomeTechnology from "../components/homeSections/HomeTechnology";
import HomeDeliveryProcess from "../components/homeSections/HomeDeliveryProcess";
import HomeWhyUnicodetech from "../components/homeSections/HomeWhyUnicodetech";
import HomeEngagementModels from "../components/homeSections/HomeEngagementModels";
import HomeSpacer10 from "../components/homeSections/HomeSpacer10";
import HomeClientTrust from "../components/homeSections/HomeClientTrust";
import HomeSpacer12 from "../components/homeSections/HomeSpacer12";
import HomeFaq from "../components/homeSections/HomeFaq";
import HomeStartAProject from "../components/homeSections/HomeStartAProject";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How quickly can we start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most projects kick off within 1–2 weeks after we confirm scope, team allocation, and the first delivery milestone. If you need a fast technical discovery or codebase audit first, we can start that within a few business days.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with startups, established companies, or both?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both. For early-stage founders, we scope lean MVPs with milestone-based pricing so you can launch and validate quickly. For established companies, we provide dedicated monthly product teams or focused AI and integration sprints.",
      },
    },
    {
      "@type": "Question",
      name: "Can you take over an existing product or codebase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We begin with a 3–5 day codebase and architecture audit covering test coverage, deployment pipelines, security risks, and technical debt, then give you a prioritized stabilization and feature roadmap before taking over delivery.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the source code and intellectual property?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You own 100% of your source code and IP. We put that in writing in the project agreement before work starts.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle scope changes during development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When priorities shift mid-sprint, we document the impact on timeline and budget in writing. You can either swap an equal-sized item out of the current milestone at zero extra cost or approve a clear change order before we build it.",
      },
    },
    {
      "@type": "Question",
      name: "How do communication and progress updates work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You work directly with a named engineering lead in a shared Slack channel and issue tracker, backed by weekly working demos in staging and written progress summaries every Friday.",
      },
    },
    {
      "@type": "Question",
      name: "Can you work alongside our internal product or engineering team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our engineers work inside your Git repositories, CI/CD pipelines, pull-request review standards, and sprint rituals so there is never a black-box handoff.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every production release includes a 30-day post-launch warranty window for bug fixes and stabilization. After that, you can transition to your in-house team with full documentation or keep us on a monthly support and feature retainer.",
      },
    },
  ],
};

const Home = () => {
  usePageMetadata({
    title: "UnicodeTech | AI-First Product Engineering Company",
    description:
      "UnicodeTech builds AI-first digital products — SaaS platforms, mobile apps, web applications, and Shopify solutions for ambitious businesses worldwide.",
    bodyClass: "site site-design home-page-body",
    canonical: "https://unicodetech-dev.vercel.app/",
    schema: FAQ_SCHEMA,
  });
  return (
    <div className="page-content home-page">
      <HomeHero />
      <HomeExperience />
      <HomeServices />
      <HomeSuccessStories />
      <HomeAiEngineering />
      <HomeIndustries />
      <HomeTechnology />
      <HomeDeliveryProcess />
      <HomeWhyUnicodetech />
      <HomeEngagementModels />
      <HomeSpacer10 />
      <HomeClientTrust />
      <HomeSpacer12 />
      <HomeFaq />
      <HomeStartAProject />
    </div>
  );
};

export default Home;
