import {
  ServicePage,
  ServiceHero,
  ServiceCapabilities,
  ServiceProcess,
  ServiceScenario,
  ServiceDeliverables,
  ServiceFaq,
  ServiceCta,
} from "../components/professionalServiceSections/ServiceSections";
import { pendingServices } from "../utils/pendingServices";

const service = pendingServices.find(
  (item) => item.key === "dedicatedProductTeams",
);

const DedicatedProductTeams = () => (
  <ServicePage service={service}>
    <ServiceHero
      service={service}
      note="Product, design, engineering and quality. Working together."
    />
    <ServiceCapabilities
      service={service}
      layout="roster"
      title="The right expertise, around one roadmap."
    />
    <ServiceDeliverables
      service={service}
      layout="editorial"
      title="Shared context. Shared ownership."
    />
    <ServiceProcess
      service={service}
      layout="staggered"
      title="Build a working rhythm together."
    />
    <ServiceScenario service={service} layout="team" />
    <ServiceFaq service={service} layout="centered" />
    <ServiceCta service={service} layout="framed" />
  </ServicePage>
);

export default DedicatedProductTeams;
