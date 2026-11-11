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
  (item) => item.key === "customSoftwareDevelopment",
);

const CustomSoftwareDevelopment = () => (
  <ServicePage service={service}>
    <ServiceHero
      service={service}
      note="Designed for your workflows. Built for your next chapter."
    />
    <ServiceCapabilities
      service={service}
      layout="showcase"
      title="Your business logic deserves a better home."
    />
    <ServiceProcess
      service={service}
      layout="rail"
      title="From a business problem to a working product."
    />
    <ServiceScenario service={service} layout="blueprint" />
    <ServiceDeliverables
      service={service}
      layout="dark"
      title="An application your team can own."
    />
    <ServiceFaq service={service} layout="split" />
    <ServiceCta service={service} layout="dark" />
  </ServicePage>
);

export default CustomSoftwareDevelopment;
