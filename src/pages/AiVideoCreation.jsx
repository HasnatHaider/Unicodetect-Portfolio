import { Clapperboard, PanelsTopLeft, Sparkles } from "lucide-react";
import {
  ServiceCapabilities,
  ServiceCta,
  ServiceFaq,
  ServiceHero,
  ServicePage,
  ServiceProcess,
} from "../components/professionalServiceSections/ServiceSections";
import { pendingServices } from "../utils/pendingServices";
import "../assets/styles/pages/aiVideoCreation.css";

const service = pendingServices.find((item) => item.key === "aiVideoCreation");
const highlightCards = [
  {
    title: "Campaign-Ready Content",
    description:
      "Creative videos tailored for advertising campaigns, promotions, and product launches.",
    Icon: Clapperboard,
  },
  {
    title: "Brand-Consistent Visuals",
    description:
      "Visual storytelling that reflects your brand identity, messaging, and creative direction.",
    Icon: Sparkles,
  },
  {
    title: "Multi-Platform Delivery",
    description:
      "Video formats prepared for websites, social media, digital advertisements, and other marketing channels.",
    Icon: PanelsTopLeft,
  },
];

const AiVideoCreation = () => (
  <ServicePage service={service}>
    <ServiceHero
      service={service}
    />
    <ServiceCapabilities
      service={service}
      layout="showcase"
      title="Creative video solutions for modern brands."
      description="We combine AI technology, creative storytelling, and visual production to deliver versatile video content designed around your business goals."
      eyebrow="OUR CAPABILITIES"
    />
    <ServiceProcess
      service={service}
      layout="rail"
      title="From creative concept to final production."
      description="A streamlined production process that transforms your ideas into professional video content with creativity, precision, and control."
    />
    <section
      id="video-creation-highlights"
      className="service-section ai-video-highlights"
      aria-labelledby="ai-video-highlights-title"
    >
      <div className="service-container">
        <span className="professional-service-eyebrow">
          {service.scenario.label}
        </span>
        <h2 id="ai-video-highlights-title">{service.scenario.title}</h2>
        <p className="ai-video-highlights__intro">
          {service.scenario.description}
        </p>
        <div className="ai-video-highlights__grid">
          {highlightCards.map(({ title, description, Icon }) => (
            <article className="ai-video-highlights__card" key={title}>
              <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <p className="ai-video-highlights__note">{service.scenario.note}</p>
      </div>
    </section>
    <ServiceFaq
      service={service}
      layout="split"
      title="AI Video Creation FAQs"
    />
    <ServiceCta service={service} layout="dark" />
  </ServicePage>
);

export default AiVideoCreation;
