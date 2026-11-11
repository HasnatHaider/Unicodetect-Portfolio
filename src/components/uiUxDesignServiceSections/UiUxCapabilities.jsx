import { IMAGES } from "../../utils/Constant";
import { Layers, Monitor, PlayCircle, Users } from "lucide-react";
import UiUxSectionHeading from "./UiUxSectionHeading";

const capabilities = [
  {
    title: "User Research & Validation",
    description:
      "Stakeholder interviews, usability testing, and persona maps that align business intent with user behavior.",
    image: IMAGES.uiuxUserResearch,
    Icon: Users,
  },
  {
    title: "SaaS & Web Interface Design",
    description:
      "Responsive application layouts optimized for density, performance, and accessibility.",
    image: IMAGES.uiuxInterfaceDesign,
    Icon: Monitor,
  },
  {
    title: "High-Fidelity Prototyping",
    description:
      "Prototypes mirroring final code behaviors, micro-interactions, and real transition states.",
    image: IMAGES.uiuxPrototyping,
    Icon: PlayCircle,
  },
  {
    title: "Scalable Design Systems",
    description:
      "Tokenized, component-based frameworks with Figma docs mapped to React/Tailwind architectures.",
    image: IMAGES.uiuxDesignSystems,
    Icon: Layers,
  },
];

const UiUxCapabilities = () => (
  <section
    className="uiux-section uiux-capabilities uiux-dark"
    aria-labelledby="uiux-capabilities-title"
  >
    <div className="uiux-container">
      <UiUxSectionHeading
        eyebrow="OUR SPECIALTIES"
        id="uiux-capabilities-title"
      >
        Comprehensive design capabilities
      </UiUxSectionHeading>
      <div className="uiux-four-grid">
        {capabilities.map(({ title, description, image, Icon }) => (
          <article className="uiux-capability" key={title}>
            <img src={image} alt="" width="292" height="340" loading="lazy" />
            <div className="uiux-capability-copy">
              <span className="uiux-icon-tile">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default UiUxCapabilities;
