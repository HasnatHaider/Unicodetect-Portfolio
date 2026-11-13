import meta from "./meta.js";
import detail from "./detail.js";
import card from "../../../assets/images/CareCompass-card-1024.webp";
import cardSmall from "../../../assets/images/CareCompass-card-480.webp";
import heroMockup from "../../../assets/images/CareCompass-case-study-hero-Mockup-960.webp";
import heroBg from "../../../assets/images/CareCompass-case-study-hero-bg-1600.webp";
import { defineCaseStudy } from "../../defineCaseStudy.js";

export default defineCaseStudy(meta, {
  category: "Services marketplace",
  description: "CareCompass connects self-care providers with clients, offering targeted marketing to boost visibility and help businesses thrive.",
  technology: "React Native",
  stack: [
    "React Native",
    "Firebase",
    "UI/UX",
    "Node.js",
    "MongoDB",
    "iOS",
    "Android"
  ],
  logoId: "carecompass",
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
