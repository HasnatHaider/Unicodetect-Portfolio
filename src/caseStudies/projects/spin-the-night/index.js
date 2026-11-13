import meta from "./meta.js";
import detail from "./detail.js";
import card from "../../../assets/images/STN-card-1024.webp";
import cardSmall from "../../../assets/images/STN-card-480.webp";
import heroMockup from "../../../assets/images/STN-case-study-hero-Mockup-960.webp";
import heroBg from "../../../assets/images/STN-case-study-hero-bg-1600.webp";
import { defineCaseStudy } from "../../defineCaseStudy.js";

export default defineCaseStudy(meta, {
  category: "Dining & events",
  description: "Spin The Night helps users discover dining and events in urban areas, offering personalized recommendations for every taste.",
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
  logoId: "spinTheNight",
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
