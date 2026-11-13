import meta from "./meta.js";
import detail from "./detail.js";
import card from "../../../assets/images/DailyDigest-card-1024.webp";
import cardSmall from "../../../assets/images/DailyDigest-card-480.webp";
import heroMockup from "../../../assets/images/DailyDigest-case-study-hero-Mockup-960.webp";
import heroBg from "../../../assets/images/DailyDigest-case-study-hero-bg-1600.webp";
import { defineCaseStudy } from "../../defineCaseStudy.js";

export default defineCaseStudy(meta, {
  category: "Health & well-being",
  description: "DailyDigest is designed to help individuals understand how their diet impacts digestion, bloating, and daily energy levels.",
  technology: "React Native",
  stack: [
    "React Native",
    "Firebase",
    "UI/UX",
    "Node.js",
    "iOS",
    "Android"
  ],
  logoId: "dailydigest",
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
