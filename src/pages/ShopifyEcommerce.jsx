import "../assets/styles/pages/shopify.css";
import usePageMetadata from "../hooks/usePageMetadata";
import ShopifyHeroSection from "../components/shopifyEcommerceServiceSections/ShopifyHeroSection";
import ShopifyCapabilities from "../components/shopifyEcommerceServiceSections/ShopifyCapabilities";
import ShopifyOverviewProof from "../components/shopifyEcommerceServiceSections/ShopifyOverviewProof";
import ShopifyProcess from "../components/shopifyEcommerceServiceSections/ShopifyProcess";
import ShopifyMethodologySection from "../components/shopifyEcommerceServiceSections/ShopifyMethodologySection";
import ShopifyFaqSection from "../components/shopifyEcommerceServiceSections/ShopifyFaqSection";
import ShopifyCtaBanner from "../components/shopifyEcommerceServiceSections/ShopifyCtaBanner";

const ShopifyEcommerce = () => {
  usePageMetadata({
    title: "Shopify & E-commerce Development | UnicodeTech",
    description:
      "Custom Shopify store development, theme design, and e-commerce solutions by UnicodeTech. We build Shopify stores that convert and scale.",
    bodyClass: "site site-design shopify-page-body",
  });
  return (
    <div className="page-content shopify-page">
      <ShopifyHeroSection />
      <ShopifyCapabilities />
      <ShopifyOverviewProof />
      <ShopifyProcess />
      <ShopifyMethodologySection />
      <ShopifyFaqSection />
      <ShopifyCtaBanner />
    </div>
  );
};

export default ShopifyEcommerce;
