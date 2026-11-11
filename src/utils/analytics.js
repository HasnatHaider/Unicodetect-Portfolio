export function trackEvent(name, params = {}) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", name, params);
    }
  } catch {
    // analytics must never break the UI
  }
}

export function grantAnalyticsConsent() {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
      });
    }
    localStorage.setItem("uc_consent", "accepted");
  } catch {
    // ignore
  }
}

export function revokeAnalyticsConsent() {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
    }
    localStorage.setItem("uc_consent", "declined");
  } catch {
    // ignore
  }
}

export function getConsentStatus() {
  try {
    return localStorage.getItem("uc_consent"); // 'accepted' | 'declined' | null
  } catch {
    return null;
  }
}
