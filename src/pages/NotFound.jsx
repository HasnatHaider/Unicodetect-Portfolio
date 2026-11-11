import StatusScreen from "../components/errorHandling/StatusScreen";
import usePageMetadata from "../hooks/usePageMetadata";

const NotFound = () => {
  usePageMetadata({
    title: "Page Not Found | UnicodeTech",
    description: "The page you are looking for does not exist. Return to UnicodeTech to explore our services.",
    bodyClass: "site site-design status-page-body",
    noIndex: true,
  });

  return <StatusScreen />;
};

export default NotFound;
