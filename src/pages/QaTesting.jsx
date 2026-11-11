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

const service = pendingServices.find((item) => item.key === "qaTesting");

const QaTesting = () => (
  <ServicePage service={service}>
    <ServiceHero
      service={service}
      note="Critical journeys. Reproducible findings. Clear release decisions."
    />
    <ServiceCapabilities
      service={service}
      layout="coverage"
      title="Cover the journeys that matter."
    />
    <ServiceProcess
      service={service}
      layout="checkpoints"
      title="Quality checks at every decision point."
    />
    <ServiceScenario service={service} layout="checklist" />
    <ServiceDeliverables
      service={service}
      layout="dark"
      title="Evidence your team can release with."
    />
    <ServiceFaq service={service} layout="cards" />
    <ServiceCta service={service} layout="centered" />
  </ServicePage>
);

export default QaTesting;
