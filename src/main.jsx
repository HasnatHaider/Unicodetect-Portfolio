import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";
import { backgroundImageKeys } from "./utils/imageBackgrounds";
import ErrorBoundary from "./components/errorHandling/ErrorBoundary";
import {
  InitialDataContext,
  readEmbeddedInitialData,
} from "./contexts/initial-data-context";
import "./assets/styles/foundation.css";
import "./assets/styles/components/sections.css";
import "./assets/styles/components/site-shell.css";
import "./assets/styles/global.css";
import "./assets/styles/components/status-screens.css";
import "./assets/styles/responsive-layout.css";
import "./assets/styles/components/service-hero-content.css";

// Prerendered pages already carry these variables on <html>. Only the admin
// shell and the dev server need them set here, so Constant.js (every image
// URL on the site) stays out of the entry chunk.
if (!document.documentElement.style.getPropertyValue(`--image-${backgroundImageKeys[0]}`)) {
  import("./utils/Constant").then(({ IMAGES }) => {
    backgroundImageKeys.forEach((name) => {
      const source = IMAGES[name];
      if (source)
        document.documentElement.style.setProperty(
          `--image-${name}`,
          `url("${source}")`,
        );
    });
  });
}

const application = (
  <InitialDataContext.Provider value={readEmbeddedInitialData()}>
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
        <Toaster richColors />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
  </InitialDataContext.Provider>
);
const root = document.getElementById("root");
if (root.hasChildNodes()) hydrateRoot(root, application);
else createRoot(root).render(application);
