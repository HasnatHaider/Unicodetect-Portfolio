import meta from "./meta.js";
import detail from "./detail.js";
import card from "../../../assets/images/BellReserveAIReceptionistDashboard-card-1024.webp";
import cardSmall from "../../../assets/images/BellReserveAIReceptionistDashboard-card-480.webp";
import heroBg from "../../../assets/images/BRHeroBG.jpg";
import video from "../../../assets/videos/bellreserve-full-video-re-new.mp4";
import { defineCaseStudy } from "../../defineCaseStudy.js";

export default defineCaseStudy(meta, {
  category: "Restaurant voice AI",
  description: "BellReserve gives restaurants an AI phone receptionist that answers guest calls around the clock, manages reservations and pickup or delivery orders, and keeps staff informed with clear call summaries.",
  stack: [
    "Voice AI",
    "Call automation",
    "Reservations",
    "Order handling",
    "Restaurant dashboard",
    "Multi-location"
  ],
  logoId: "bellreserve",
  images: {
    card,
    cardSmall,
    heroMockup: card,
    heroBg
  },
  hero: {
    dark: false,
    overlay: "rgba(255, 255, 255, 0.58)"
  },
  video: {
    src: video,
    poster: "https://i.vimeocdn.com/video/2225714126-1bb85c3a1f5bd4c91b7d509cf7cc1152f10a4bdb0ef747c2910379c717fe2428-d_1280?region=us"
  },
  liveCall: {
    intro: "See how BellReserve answers a real call.",
    label: "Tap to test BellReserve live",
    tel: "+16414664655",
    display: "+1 (641) 466-4655"
  },
  detail
});
