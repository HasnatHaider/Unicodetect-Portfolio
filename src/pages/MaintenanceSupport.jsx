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
  (item) => item.key === "maintenanceSupport",
);

const MaintenanceSupport = () => (
  <ServicePage service={service}>
    <ServiceHero
      service={service}
      note="Clear triage. Planned upkeep. A dependable next release."
    />
    <ServiceScenario service={service} layout="status" />
    <ServiceCapabilities
      service={service}
      layout="support"
      title="Keep the essentials running smoothly."
    />
    <ServiceDeliverables
      service={service}
      layout="light"
      title="A support model with clear ownership."
    />
    <ServiceProcess
      service={service}
      layout="cycle"
      title="Resolve today. Improve tomorrow."
    />
    <ServiceFaq service={service} layout="cards" />
    <ServiceCta service={service} layout="dark" />
  </ServicePage>
);

export default MaintenanceSupport;
