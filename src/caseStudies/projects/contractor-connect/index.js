import meta from "./meta.js";
import detail from "./detail.js";
import card from "../../../assets/images/ContractorConnect-card-1024.webp";
import cardSmall from "../../../assets/images/ContractorConnect-card-480.webp";
import heroMockup from "../../../assets/images/Contractor-case-study-hero-Mockup-960.webp";
import heroBg from "../../../assets/images/Contractor-case-study-hero-bg-1600.webp";
import { defineCaseStudy } from "../../defineCaseStudy.js";

export default defineCaseStudy(meta, {
  category: "Services marketplace",
  description: "ContractorConnect connects users and contractors across a wide range of services. Post a job, find a provider, and agree on price and scope before work begins.",
  technology: "React Native",
  stack: [
    "React Native",
    "Node.js",
    "MongoDB",
    "iOS",
    "Android"
  ],
  logoId: "contractorconnect",
  clientLogoId: "bms",
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
