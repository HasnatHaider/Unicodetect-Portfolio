import meta from "./meta.js";
import detail from "./detail.js";
import card from "../../../assets/images/IconicBeauti-card-1024.webp";
import cardSmall from "../../../assets/images/IconicBeauti-card-480.webp";
import heroMockup from "../../../assets/images/Iconic-case-study-hero-Mockup-960.webp";
import heroBg from "../../../assets/images/Iconic-case-study-hero-bg-1600.webp";
import { defineCaseStudy } from "../../defineCaseStudy.js";

export default defineCaseStudy(meta, {
  category: "Beauty e-commerce",
  description: "We built a custom Shopify storefront for Iconic Beauti, translating a premium beauty brand identity into every product page, collection, and checkout step.",
  technology: "Shopify",
  stack: [
    "Shopify",
    "Custom Theme",
    "UI/UX Design",
    "E-commerce",
    "Liquid"
  ],
  logoId: "iconicBeauti",
  images: {
    card,
    cardSmall,
    heroMockup,
    heroBg
  },
  hero: {
    dark: false
  },
  detail
});
