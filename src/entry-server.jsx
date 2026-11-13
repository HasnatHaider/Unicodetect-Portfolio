import { createElement, StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { PassThrough } from "node:stream";
import App from "./App";
import ErrorBoundary from "./components/errorHandling/ErrorBoundary";
import { Toaster } from "sonner";
import { MetadataContext } from "./contexts/metadata-context";
import { InitialDataContext } from "./contexts/initial-data-context";
import { IMAGES } from "./utils/Constant";
import { backgroundImageKeys } from "./utils/imageBackgrounds";

export const imageStyles = Object.fromEntries(
  backgroundImageKeys
    .filter((key) => IMAGES[key])
    .map((key) => [`--image-${key}`, `url("${IMAGES[key]}")`]),
);
export async function render(url, initialData = {}) {
  const collector = { current: null };
  const element = createElement(
    MetadataContext.Provider,
    {
      value: (metadata) => {
        collector.current = metadata;
      },
    },
    createElement(
      InitialDataContext.Provider,
      { value: initialData },
      createElement(
        StrictMode,
        null,
        createElement(
          StaticRouter,
          { location: url },
          createElement(
            ErrorBoundary,
            null,
            createElement(App),
            createElement(Toaster, { richColors: true }),
          ),
        ),
      ),
    ),
  );
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    let html = "";
    let failed;
    const timeout = setTimeout(() => {
      stream.abort();
      reject(new Error(`Render timed out: ${url}`));
    }, 30000);
    output.on("data", (chunk) => {
      html += chunk;
    });
    output.on("error", reject);
    output.on("end", () => {
      clearTimeout(timeout);
      if (failed) reject(failed);
      else resolve({ html, metadata: collector.current });
    });
    const stream = renderToPipeableStream(element, {
      onAllReady() {
        stream.pipe(output);
      },
      onShellError(error) {
        clearTimeout(timeout);
        reject(error);
      },
      onError(error) {
        failed = error;
      },
    });
  });
}
