import { ArrowRight, RefreshCw, TriangleAlert } from "lucide-react";
import { paths } from "../../routes/paths";

const StatusScreen = ({ isError = false }) => (
  <section className="fallback-screen" aria-labelledby="status-title">
    <div className="status-container">
      <div className="status-panel">
        <div className="status-content">
          <p className="status-eyebrow">
            <span aria-hidden="true" />
            {isError ? "PAGE UNAVAILABLE" : "404 / PAGE NOT FOUND"}
          </p>
          <h1 id="status-title">
            {isError ? "Let’s try that again." : "Let’s get you back on track."}
          </h1>
          <p className="status-description">
            {isError
              ? "We couldn’t load this page. Refresh to try again, or return to the home page to keep exploring."
              : "The page you’re looking for may have moved, or the link may be incorrect. You can head home or explore our services."}
          </p>
          <div className="status-actions">
            {isError ? (
              <button
                className="status-button status-button-primary"
                type="button"
                onClick={() => window.location.reload()}
              >
                <RefreshCw size={18} aria-hidden="true" />
                Reload page
              </button>
            ) : (
              <a
                className="status-button status-button-primary"
                href={paths.home}
              >
                Return home <ArrowRight size={18} aria-hidden="true" />
              </a>
            )}
            <a
              className="status-button status-button-secondary"
              href={isError ? paths.home : `${paths.home}#services`}
            >
              {isError ? "Return home" : "Explore services"}
            </a>
          </div>
          <p className="status-note">
            {isError
              ? "If the problem continues, please try again in a moment."
              : "Good ideas deserve a clear path forward."}
          </p>
        </div>
        <div className="status-visual" aria-hidden="true">
          {isError ? <TriangleAlert strokeWidth={1.25} /> : <span>404</span>}
          <span className="status-visual-label">
            {isError ? "A fresh start" : "A new direction"}
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default StatusScreen;
