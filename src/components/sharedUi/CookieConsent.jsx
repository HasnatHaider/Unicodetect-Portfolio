import { useState, useEffect } from "react";
import {
  grantAnalyticsConsent,
  revokeAnalyticsConsent,
  getConsentStatus,
} from "../../utils/analytics";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prior = getConsentStatus();
    if (prior === "accepted") {
      // Restore consent on page reload
      grantAnalyticsConsent();
    } else if (!prior) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    grantAnalyticsConsent();
    setVisible(false);
  };

  const handleDecline = () => {
    revokeAnalyticsConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <p className="cookie-banner__text">
        Cookies help us keep our website secure, improve your browsing
        experience, and make content more relevant to you. You’re in control of
        your cookie preferences.{" "}
        <a href="/accessibility" className="cookie-banner__link">
          Learn more
        </a>
      </p>
      <div className="cookie-banner__actions">
        <button
          className="cookie-banner__btn cookie-banner__btn--decline"
          onClick={handleDecline}
        >
          Decline
        </button>
        <button
          className="cookie-banner__btn cookie-banner__btn--accept"
          onClick={handleAccept}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
