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

const service = pendingServices.find((item) => item.key === "cloudDevOps");

const CloudDevOps = () => (
  <ServicePage service={service}>
    <ServiceHero
      service={service}
      note="Versioned infrastructure. Repeatable releases. Visible operations."
    />
    <ServiceCapabilities
      service={service}
      layout="infrastructure"
      title="A stronger foundation for every release."
    />
    <ServiceProcess
      service={service}
      layout="terminal"
      title="Make delivery a repeatable system."
    />
    <ServiceDeliverables
      service={service}
      layout="tiles"
      title="Infrastructure with an operating manual."
    />
    <ServiceScenario service={service} layout="console" />
    <ServiceFaq service={service} layout="dark" />
    <ServiceCta service={service} layout="split" />
  </ServicePage>
);

export default CloudDevOps;
