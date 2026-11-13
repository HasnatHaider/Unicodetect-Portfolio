import meta from "./meta.js";
import detail from "./detail.js";
import card from "../../../assets/images/TaskHive-card-1024.webp";
import cardSmall from "../../../assets/images/TaskHive-card-480.webp";
import heroMockup from "../../../assets/images/TaskHive-case-study-hero-Mockup-960.webp";
import heroBg from "../../../assets/images/TaskHive-case-study-hero-bg-1600.webp";
import { defineCaseStudy } from "../../defineCaseStudy.js";

export default defineCaseStudy(meta, {
  category: "Cleaning services",
  description: "TaskHive Pro is a marketplace for cleaning services. Post a job, find a cleaner, and chat to agree on price and requirements before arranging the work.",
  technology: "React Native",
  stack: [
    "React Native",
    "Firebase",
    "iOS",
    "Android"
  ],
  logoId: "taskhive",
  clientLogoId: "bms",
  images: {
    card,
    cardSmall,
    heroMockup,
    heroBg
  },
  hero: {
    dark: true
  },
  detail
});
