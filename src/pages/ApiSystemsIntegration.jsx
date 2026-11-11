import usePageMetadata from "../hooks/usePageMetadata";
import ApiSystemsIntegrationHero from "../components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationHero";
import ApiSystemsIntegrationCapabilities from "../components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationCapabilities";
import ApiSystemsIntegrationProcess from "../components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationProcess";
import ApiSystemsIntegrationCaseStudy from "../components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationCaseStudy";
import ApiSystemsIntegrationStack from "../components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationStack";
import ApiSystemsIntegrationBenefits from "../components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationBenefits";
import ApiSystemsIntegrationFaq from "../components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationFaq";
import ApiSystemsIntegrationCta from "../components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationCta";
import "../assets/styles/pages/apiSystemsIntegration.css";

const ApiSystemsIntegration = () => {
  usePageMetadata({
    title: "API & Systems Integration Services | UnicodeTech",
    description: "Connect your business systems with purpose-built APIs and integrations by UnicodeTech. We design maintainable integration layers that scale with your product.",
    bodyClass: "site site-design api-systems-integration-page-body",
  });

  return (
    <div className="page-content api-systems-integration-page">
      <ApiSystemsIntegrationHero />
      <ApiSystemsIntegrationCapabilities />
      <ApiSystemsIntegrationProcess />
      <ApiSystemsIntegrationCaseStudy />
      <ApiSystemsIntegrationStack />
      <ApiSystemsIntegrationBenefits />
      <ApiSystemsIntegrationFaq />
      <ApiSystemsIntegrationCta />
    </div>
  );
};

export default ApiSystemsIntegration;
