import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MetadataContext } from "../contexts/metadata-context";
import { resolveMetadata } from "../utils/metadata";
import { scrollToSection } from "../utils/scrollToSection";
function setMeta(attr, key, value) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.content = value;
}
export default function usePageMetadata(page) {
  const { pathname, hash } = useLocation();
  const collector = useContext(MetadataContext);
  const metadata = resolveMetadata(page, pathname);
  if (collector) collector(metadata);
  const serialized = JSON.stringify(metadata);
  useEffect(() => {
    const current = JSON.parse(serialized);
    document.title = current.title;
    document.body.className = current.bodyClass;
    setMeta("name", "description", current.description);
    setMeta("name", "robots", current.robots);
    document
      .querySelectorAll('link[rel="canonical"],script[data-seo]')
      .forEach((node) => node.remove());
    if (current.canonical) {
      const canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = current.canonical;
      document.head.appendChild(canonical);
    }
    for (const [key, value] of Object.entries({
      title: current.title,
      description: current.description,
      url: current.url,
      image: current.ogImage,
      type: "website",
      site_name: "UnicodeTech",
    }))
      setMeta("property", `og:${key}`, value);
    for (const [key, value] of Object.entries({
      card: "summary_large_image",
      title: current.title,
      description: current.description,
      image: current.ogImage,
    }))
      setMeta("name", `twitter:${key}`, value);
    current.schemas.forEach(({ id, data }) => {
      const element = document.createElement("script");
      element.type = "application/ld+json";
      element.dataset.seo = id;
      element.textContent = JSON.stringify(data);
      document.head.appendChild(element);
    });
  }, [serialized]);
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
      return;
    }
    let cancelScroll;
    const frame = requestAnimationFrame(() => {
      cancelScroll = scrollToSection(hash);
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelScroll?.();
    };
  }, [pathname, hash]);
}
