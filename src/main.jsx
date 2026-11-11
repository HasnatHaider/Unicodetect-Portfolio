import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";
import { backgroundImageKeys } from "./utils/imageBackgrounds";
import { IMAGES } from "./utils/Constant";
import ErrorBoundary from "./components/errorHandling/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import "swiper/css";
import "swiper/css/effect-fade";
import "./assets/styles/foundation.css";
import "./assets/styles/components/sections.css";
import "./assets/styles/components/site-shell.css";
import "./assets/styles/global.css";
import "./assets/styles/components/status-screens.css";
import "./assets/styles/responsive-layout.css";
import "./assets/styles/components/service-hero-content.css";

backgroundImageKeys.forEach((name) => {
  const source = IMAGES[name];
  if (source)
    document.documentElement.style.setProperty(
      `--image-${name}`,
      `url("${source}")`,
    );
});

const application = (
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <App />
          <Toaster richColors />
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
const root = document.getElementById("root");
if (root.hasChildNodes()) hydrateRoot(root, application);
else createRoot(root).render(application);
