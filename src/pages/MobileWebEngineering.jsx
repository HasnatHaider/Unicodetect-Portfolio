import "../assets/styles/pages/mobile.css";
import usePageMetadata from "../hooks/usePageMetadata";
import MobileHero from "../components/mobileWebEngineeringServiceSections/MobileHero";
import MobileCapabilities from "../components/mobileWebEngineeringServiceSections/MobileCapabilities";
import MobileProcess from "../components/mobileWebEngineeringServiceSections/MobileProcess";
import MobileCaseStudy from "../components/mobileWebEngineeringServiceSections/MobileCaseStudy";
import MobileFaqSection from "../components/mobileWebEngineeringServiceSections/MobileFaqSection";
import MobileGetStarted from "../components/mobileWebEngineeringServiceSections/MobileGetStarted";

const CLIENT_REVIEWS = [
  {
    quote: "From developing our iOS and Android applications to building the web dashboard and backend infrastructure, UnicodeTech demonstrated strong technical capabilities and a genuine understanding of product development.",
    attribution: "DailyDigest",
  },
  {
    quote: "Great Service, Communication is great, and meets deadlines.",
    attribution: "Listah",
  },
];

const MobileWebEngineering = () => {
  usePageMetadata({
    title: "Mobile & Web Engineering Services | UnicodeTech",
    description: "Expert mobile and web engineering from UnicodeTech. We build React Native apps, responsive web applications, and cross-platform digital products.",
    bodyClass: "site site-design mobile-page-body",
  });
  return (
    <div className="page-content mobile-page">
      <MobileHero />
      <MobileCapabilities />
      <MobileProcess />
      <MobileCaseStudy />
      <section className="service-section mobile-client-reviews" aria-label="Client reviews">
        <div className="service-container mobile-reviews-grid">
          {CLIENT_REVIEWS.map((r) => (
            <blockquote key={r.attribution} className="mobile-review-card">
              <p>"{r.quote}"</p>
              <footer>— {r.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </section>
      <MobileFaqSection />
      <MobileGetStarted />
    </div>
  );
};

export default MobileWebEngineering;
