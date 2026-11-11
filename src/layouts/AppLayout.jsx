import { Outlet } from "react-router-dom";
import CustomCursor from "../components/sharedUi/CustomCursor";
import Header from "../components/siteNavigation/Header";
import Footer from "../components/siteNavigation/Footer";
import StickyMobileCta from "../components/sharedUi/StickyMobileCta";
import CookieConsent from "../components/sharedUi/CookieConsent";
import useSiteMotion from "../hooks/useSiteMotion";
import "../assets/styles/components/site-motion.css";

const AppLayout = ({ children }) => {
  useSiteMotion();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <CustomCursor />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children ?? <Outlet />}
      </main>
      <Footer />
      <StickyMobileCta />
      <CookieConsent />
    </>
  );
};

export default AppLayout;
