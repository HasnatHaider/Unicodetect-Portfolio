import LegalPolicyPage from "../components/legalSections/LegalPolicyPage";
import { legalPolicies } from "../utils/legalPolicies";

export default function PrivacyPolicy() {
  return <LegalPolicyPage policy={legalPolicies.privacy} type="privacy" />;
}
