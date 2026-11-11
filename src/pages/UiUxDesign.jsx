import usePageMetadata from "../hooks/usePageMetadata";
import UiUxHero from "../components/uiUxDesignServiceSections/UiUxHero";
import UiUxDesignPhilosophy from "../components/uiUxDesignServiceSections/UiUxDesignPhilosophy";
import UiUxCapabilities from "../components/uiUxDesignServiceSections/UiUxCapabilities";
import UiUxProcess from "../components/uiUxDesignServiceSections/UiUxProcess";
import UiUxCaseStudies from "../components/uiUxDesignServiceSections/UiUxCaseStudies";
import UiUxMetrics from "../components/uiUxDesignServiceSections/UiUxMetrics";
import UiUxDeliverables from "../components/uiUxDesignServiceSections/UiUxDeliverables";
import UiUxFaq from "../components/uiUxDesignServiceSections/UiUxFaq";
import UiUxCta from "../components/uiUxDesignServiceSections/UiUxCta";
import "../assets/styles/pages/uiUx.css";

const UiUxDesign = () => {
  usePageMetadata({
    title: "UI/UX Design Services | UnicodeTech",
    description: "User-centered UI/UX design services from UnicodeTech. We create design systems, user research, prototypes, and polished interfaces for digital products.",
    bodyClass: "site site-design ui-ux-page-body",
  });
  return (
    <div className="page-content ui-ux-page">
      <UiUxHero />
      <UiUxDesignPhilosophy />
      <UiUxCapabilities />
      <UiUxProcess />
      <UiUxCaseStudies />
      <UiUxMetrics />
      <UiUxDeliverables />
      <UiUxFaq />
      <UiUxCta />
    </div>
  );
};

export default UiUxDesign;
