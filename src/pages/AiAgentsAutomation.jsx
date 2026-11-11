import "../assets/styles/pages/ai.css";
import usePageMetadata from "../hooks/usePageMetadata";
import AiHero from "../components/aiAgentsAutomationServiceSections/AiHero";
import AiWhatWeBuildSection from "../components/aiAgentsAutomationServiceSections/AiWhatWeBuildSection";
import AiHowItWorksSection from "../components/aiAgentsAutomationServiceSections/AiHowItWorksSection";
import AiUseCases from "../components/aiAgentsAutomationServiceSections/AiUseCases";
import AiTechnologyStackSection from "../components/aiAgentsAutomationServiceSections/AiTechnologyStackSection";
import AiCaseStudySpotlight from "../components/aiAgentsAutomationServiceSections/AiCaseStudySpotlight";
import AiWhyUnicodetechSection from "../components/aiAgentsAutomationServiceSections/AiWhyUnicodetechSection";
import AiFaqSection from "../components/aiAgentsAutomationServiceSections/AiFaqSection";
import AiFinalConversionCta from "../components/aiAgentsAutomationServiceSections/AiFinalConversionCta";

const AiAgentsAutomation = () => {
  usePageMetadata({
    title: "AI Agents & Automation Services | UnicodeTech",
    description: "Build intelligent workflows, AI agents, and automation solutions with UnicodeTech. We connect AI capabilities to real business processes and products.",
    bodyClass: "site site-design ai-page-body",
  });
  return (
    <div className="page-content ai-page">
      <AiHero />
      <AiWhatWeBuildSection />
      <AiHowItWorksSection />
      <AiUseCases />
      <AiTechnologyStackSection />
      <AiCaseStudySpotlight />
      <AiWhyUnicodetechSection />
      <AiFaqSection />
      <AiFinalConversionCta />
    </div>
  );
};

export default AiAgentsAutomation;
