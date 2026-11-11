import { paths } from "../routes/paths";

const HOME = { label: "Home", href: "/" };
const SERVICES = { label: "Services", href: paths.services };
const CASE_STUDIES = { label: "Case Studies", href: paths.caseStudies };

export const breadcrumbMap = {
  [paths.about]: [HOME, { label: "About Us" }],
  [paths.contact]: [HOME, { label: "Contact" }],
  [paths.accessibility]: [HOME, { label: "Accessibility" }],
  [paths.termsAndConditions]: [HOME, { label: "Terms & Conditions" }],
  [paths.privacyPolicy]: [HOME, { label: "Privacy Policy" }],
  [paths.bmsEcosystem]: [HOME, { label: "BMS Ecosystem" }],
  [paths.services]: [HOME, { label: "Services" }],
  [paths.caseStudies]: [HOME, CASE_STUDIES],
  [paths.aiAgents]: [HOME, SERVICES, { label: "AI Agents & Automation" }],
  [paths.aiVideoCreation]: [HOME, SERVICES, { label: "AI Video Creation" }],
  [paths.saas]: [HOME, SERVICES, { label: "SaaS Development" }],
  [paths.mobileWeb]: [HOME, SERVICES, { label: "Mobile & Web Engineering" }],
  [paths.shopify]: [HOME, SERVICES, { label: "Shopify & E-commerce" }],
  [paths.uiUx]: [HOME, SERVICES, { label: "UI/UX Design" }],
  [paths.webDevelopment]: [HOME, SERVICES, { label: "Web Development" }],
  [paths.wordpressDevelopment]: [
    HOME,
    SERVICES,
    { label: "WordPress Development" },
  ],
  [paths.apiSystemsIntegration]: [
    HOME,
    SERVICES,
    { label: "API & Systems Integration" },
  ],
  [paths.customSoftwareDevelopment]: [
    HOME,
    SERVICES,
    { label: "Custom Software Development" },
  ],
  [paths.crmErpSolutions]: [HOME, SERVICES, { label: "CRM & ERP Solutions" }],
  [paths.cloudDevOps]: [HOME, SERVICES, { label: "Cloud & DevOps" }],
  [paths.qaTesting]: [HOME, SERVICES, { label: "QA & Testing" }],
  [paths.dedicatedProductTeams]: [
    HOME,
    SERVICES,
    { label: "Dedicated Product Teams" },
  ],
  [paths.productDiscoveryStrategy]: [
    HOME,
    SERVICES,
    { label: "Product Discovery & Strategy" },
  ],
  [paths.maintenanceSupport]: [
    HOME,
    SERVICES,
    { label: "Maintenance & Support" },
  ],
};
