import "../assets/styles/pages/saas.css";
import usePageMetadata from "../hooks/usePageMetadata";
import SaasSaasProductDevelopment from "../components/saasDevelopmentServiceSections/SaasSaasProductDevelopment";
import SaasFeatureCards from "../components/saasDevelopmentServiceSections/SaasFeatureCards";
import SaasBeyondLaunch from "../components/saasDevelopmentServiceSections/SaasBeyondLaunch";
import SaasEngagement from "../components/saasDevelopmentServiceSections/SaasEngagement";
import SaasFaq from "../components/saasDevelopmentServiceSections/SaasFaq";
import SaasFinalCta from "../components/saasDevelopmentServiceSections/SaasFinalCta";

const SaasDevelopment = () => {
  usePageMetadata({
    title: "SaaS Development Services | UnicodeTech",
    description: "Design and build scalable SaaS platforms with UnicodeTech. We deliver multi-tenant architectures, subscription systems, and production-ready SaaS products.",
    bodyClass: "site site-design saas-page-body",
  });
  return (
    <div className="page-content saas-page">
      <SaasSaasProductDevelopment />
      <SaasFeatureCards />
      <SaasBeyondLaunch />
      <SaasEngagement />
      <SaasFaq />
      <SaasFinalCta />
    </div>
  );
};

export default SaasDevelopment;
