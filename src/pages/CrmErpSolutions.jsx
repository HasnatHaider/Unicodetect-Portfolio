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

const service = pendingServices.find((item) => item.key === "crmErpSolutions");

const CrmErpSolutions = () => (
  <ServicePage service={service}>
    <ServiceHero
      service={service}
      note="Sales, finance and operations. One connected picture."
    />
    <ServiceCapabilities
      service={service}
      layout="matrix"
      title="Connect every part of the customer journey."
    />
    <ServiceScenario service={service} layout="connected" />
    <ServiceProcess
      service={service}
      layout="timeline"
      title="A careful rollout. A connected operation."
    />
    <ServiceDeliverables
      service={service}
      layout="light"
      title="Ready for everyday operations."
    />
    <ServiceFaq service={service} layout="centered" />
    <ServiceCta service={service} layout="split" />
  </ServicePage>
);

export default CrmErpSolutions;
