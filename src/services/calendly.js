export const CALENDLY_URL = "https://calendly.com/mohsin-unicodetech/30min";
const SCRIPT_URL = "https://assets.calendly.com/assets/external/widget.js";
const STYLE_URL = "https://assets.calendly.com/assets/external/widget.css";
let widgetPromise;
let opening;

function loadAsset(tag, url) {
  const existing = document.querySelector(`[data-calendly-asset="${tag}"]`);
  if (existing?.dataset.loaded === "true") return Promise.resolve();
  return new Promise((resolve, reject) => {
    const element = existing || document.createElement(tag);
    const timeout = setTimeout(() => fail(), 15000);
    const done = () => {
      clearTimeout(timeout);
      element.dataset.loaded = "true";
      resolve();
    };
    const fail = () => {
      clearTimeout(timeout);
      element.remove();
      reject(new Error("Calendly could not load."));
    };
    element.addEventListener("load", done, { once: true });
    element.addEventListener("error", fail, { once: true });
    if (!existing) {
      element.dataset.calendlyAsset = tag;
      if (tag === "script") {
        element.src = url;
        element.async = true;
      } else {
        element.href = url;
        element.rel = "stylesheet";
      }
      document.head.appendChild(element);
    }
  });
}

export function openCalendly() {
  if (opening) return opening;
  if (!widgetPromise) {
    widgetPromise = Promise.all([
      loadAsset("link", STYLE_URL),
      loadAsset("script", SCRIPT_URL),
    ]).catch((error) => {
      widgetPromise = undefined;
      throw error;
    });
  }
  opening = widgetPromise
    .then(() => {
      if (!window.Calendly?.initPopupWidget)
        throw new Error("Calendly is unavailable.");
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    })
    .finally(() => {
      opening = undefined;
    });
  return opening;
}
