import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const targets = [
  "h2",
  ".service-card",
  ".professional-service-capability",
  ".professional-service-step",
  ".uiux-story",
].join(",");
const entranceTargets = [
  ".service-hero-title",
  ".service-hero-description",
  ".service-hero-button",
  ".home-hero__ai-first-product-engineering-for-amb .heading",
  ".home-hero__we-build-ai-powered-saas-web-and-mo .heading",
  ".home-hero__layout-3 .button",
  ".fallback-screen h1",
].join(",");
export default function useSiteMotion() {
  const { pathname } = useLocation();
  useEffect(() => {
    const main = document.getElementById("main-content");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!main || !window.IntersectionObserver) return;
    const registered = new Set();
    const animated = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer.unobserve(target);
          if (preference.matches) return;
          target.classList.add("site-reveal");
          animated.add(target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    const register = (root) => {
      const entrances = root.matches?.(entranceTargets) ? [root] : [];
      entrances.push(...root.querySelectorAll(entranceTargets));
      entrances.forEach((element) => {
        if (registered.has(element) || preference.matches) return;
        registered.add(element);
        element.classList.add("site-entrance");
        animated.add(element);
      });
      const elements = root.matches?.(targets) ? [root] : [];
      elements.push(...root.querySelectorAll(targets));
      elements.forEach((element) => {
        if (registered.has(element)) return;
        registered.add(element);
        if (
          preference.matches ||
          element.closest(".home-hero, .service-hero-theme") ||
          element.getBoundingClientRect().top < window.innerHeight
        )
          return;
        observer.observe(element);
      });
    };
    register(main);
    const mutations = new MutationObserver((records) => {
      records.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) register(node);
        });
      });
    });
    mutations.observe(main, { childList: true, subtree: true });
    const reduceMotion = () => {
      if (!preference.matches) return;
      observer.disconnect();
      animated.forEach((element) =>
        element.classList.remove("site-reveal", "site-entrance"),
      );
    };
    preference.addEventListener("change", reduceMotion);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", reduceMotion);
      animated.forEach((element) =>
        element.classList.remove("site-reveal", "site-entrance"),
      );
    };
  }, [pathname]);
}
