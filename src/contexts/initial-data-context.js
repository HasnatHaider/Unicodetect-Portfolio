import { createContext, useContext } from "react";

// Data a page was prerendered with. The prerender passes it to the server
// render and embeds the same JSON in the page (#initial-data), so the first
// client render matches the static HTML instead of starting from a loader.
export const InitialDataContext = createContext({});

export const INITIAL_DATA_ELEMENT_ID = "initial-data";

/** Reads the JSON embedded by the prerender; {} when there is none. */
export function readEmbeddedInitialData() {
  if (typeof document === "undefined") return {};
  const element = document.getElementById(INITIAL_DATA_ELEMENT_ID);
  if (!element) return {};
  try {
    return JSON.parse(element.textContent) ?? {};
  } catch {
    return {};
  }
}

/** The prerendered post for this slug, or null. */
export function useInitialBlogPost(slug) {
  const { blogPost } = useContext(InitialDataContext);
  return blogPost?.slug === slug ? blogPost : null;
}
