import { useEffect, useState } from "react";
import { HeroContext } from "./hero-context";

export const HeroProvider = ({ images, children }) => {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (reduced || images.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [images.length, reduced]);
  return (
    <HeroContext.Provider value={{ index, setIndex, images }}>
      {children}
    </HeroContext.Provider>
  );
};
