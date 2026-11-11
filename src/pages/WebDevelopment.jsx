import usePageMetadata from "../hooks/usePageMetadata";
import WebDevelopmentHero from "../components/webDevelopmentServiceSections/WebDevelopmentHero";
import WebDevelopmentCapabilities from "../components/webDevelopmentServiceSections/WebDevelopmentCapabilities";
import WebDevelopmentProcess from "../components/webDevelopmentServiceSections/WebDevelopmentProcess";
import WebDevelopmentStack from "../components/webDevelopmentServiceSections/WebDevelopmentStack";
import WebDevelopmentCaseStudy from "../components/webDevelopmentServiceSections/WebDevelopmentCaseStudy";
import WebDevelopmentMetrics from "../components/webDevelopmentServiceSections/WebDevelopmentMetrics";
import WebDevelopmentFaq from "../components/webDevelopmentServiceSections/WebDevelopmentFaq";
import WebDevelopmentCta from "../components/webDevelopmentServiceSections/WebDevelopmentCta";
import "../assets/styles/pages/webDevelopment.css";

const WebDevelopment = () => {
  usePageMetadata({
    title: "Web Development Services | UnicodeTech",
    description: "Professional web development services by UnicodeTech. We build fast, accessible, and maintainable websites and web applications for your business.",
    bodyClass: "site site-design web-development-page-body",
  });
  return (
    <div className="page-content web-development-page">
      <WebDevelopmentHero />
      <WebDevelopmentCapabilities />
      <WebDevelopmentProcess />
      <WebDevelopmentStack />
      <WebDevelopmentCaseStudy />
      <WebDevelopmentMetrics />
      <WebDevelopmentFaq />
      <WebDevelopmentCta />
    </div>
  );
};

export default WebDevelopment;
