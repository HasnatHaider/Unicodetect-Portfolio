import meta from "./meta.js";
import detail from "./detail.js";
import card from "../../../assets/images/LiftPitchCover-1024.webp";
import cardSmall from "../../../assets/images/LiftPitchCover-480.webp";
import heroBg from "../../../assets/images/LiftPitchHero-1792.webp";
import { defineCaseStudy } from "../../defineCaseStudy.js";

export default defineCaseStudy(meta, {
  category: "Social & business networking",
  description: "LiftPitch brings personal and professional networking together with profiles, content sharing, and tools to manage connections.",
  stack: [
    "iOS",
    "Android"
  ],
  logoId: "liftpitch",
  images: {
    card,
    cardSmall,
    heroBg
  },
  hero: {
    dark: false,
    artInBackground: true
  },
  detail
});
