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
  (item) => item.key === "productDiscoveryStrategy",
);

const ProductDiscoveryStrategy = () => (
  <ServicePage service={service}>
    <ServiceHero
      service={service}
      note="Explore the problem. Challenge assumptions. Decide what comes next."
    />
    <ServiceProcess
      service={service}
      layout="roadmap"
      title="Find the signal before writing the code."
    />
    <ServiceCapabilities
      service={service}
      layout="bento"
      title="Ask better questions. Shape a better product."
    />
    <ServiceScenario service={service} layout="canvas" />
    <ServiceDeliverables
      service={service}
      layout="numbered"
      title="Clarity you can build on."
    />
    <ServiceFaq service={service} layout="split" />
    <ServiceCta service={service} layout="framed" />
  </ServicePage>
);

export default ProductDiscoveryStrategy;
