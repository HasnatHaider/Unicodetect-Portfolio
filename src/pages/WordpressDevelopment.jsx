import usePageMetadata from "../hooks/usePageMetadata";
import WordpressDevelopmentHero from "../components/wordpressDevelopmentServiceSections/WordpressDevelopmentHero";
import WordpressDevelopmentCapabilities from "../components/wordpressDevelopmentServiceSections/WordpressDevelopmentCapabilities";
import WordpressDevelopmentProcess from "../components/wordpressDevelopmentServiceSections/WordpressDevelopmentProcess";
import WordpressDevelopmentStack from "../components/wordpressDevelopmentServiceSections/WordpressDevelopmentStack";
import WordpressDevelopmentCaseStudy from "../components/wordpressDevelopmentServiceSections/WordpressDevelopmentCaseStudy";
import WordpressDevelopmentBenefits from "../components/wordpressDevelopmentServiceSections/WordpressDevelopmentBenefits";
import WordpressDevelopmentFaq from "../components/wordpressDevelopmentServiceSections/WordpressDevelopmentFaq";
import WordpressDevelopmentCta from "../components/wordpressDevelopmentServiceSections/WordpressDevelopmentCta";
import "../assets/styles/pages/wordpressDevelopment.css";

const WordpressDevelopment = () => {
  usePageMetadata({
    title: "WordPress Development Services | UnicodeTech",
    description: "Custom WordPress development by UnicodeTech. We build bespoke themes, plugins, and WordPress solutions tailored to your content and business needs.",
    bodyClass: "site site-design wordpress-development-page-body",
  });
  return (
    <div className="page-content wordpress-development-page">
      <WordpressDevelopmentHero />
      <WordpressDevelopmentCapabilities />
      <WordpressDevelopmentProcess />
      <WordpressDevelopmentStack />
      <WordpressDevelopmentCaseStudy />
      <WordpressDevelopmentBenefits />
      <WordpressDevelopmentFaq />
      <WordpressDevelopmentCta />
    </div>
  );
};

export default WordpressDevelopment;
