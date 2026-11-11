import LegalPolicyPage from "../components/legalSections/LegalPolicyPage";
import { legalPolicies } from "../utils/legalPolicies";

export default function TermsAndConditions() {
  return <LegalPolicyPage policy={legalPolicies.terms} type="terms" />;
}
