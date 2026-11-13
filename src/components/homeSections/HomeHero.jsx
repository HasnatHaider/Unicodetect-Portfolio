import { useState, useEffect, useCallback, useRef } from "react";
import { paths } from "../../routes/paths";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { SiteLink } from "../sharedUi/Interactive";
import ResponsiveImage from "../sharedUi/ResponsiveImage";
import { IMAGES } from "../../utils/Constant";
import { companyContent } from "../../utils/companyContent";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SLIDES = [
  {
    bg: IMAGES.Hero_Section_1_Scaled,
    eyebrow: "AI-First Engineering Studio",
    title: "Build Products\nThat Scale,\nShipped Fast.",
    sub: "We pair AI-native engineering with enterprise delivery discipline — from strategy to launch.",
  },
  {
    bg: IMAGES.Ui_Ux_serices_Hero_bg,
    eyebrow: "SaaS · Mobile · Web",
    title: "From Concept\nTo Launch\nIn Weeks.",
    sub: "Full-cycle product teams that move fast without breaking things — design, build, ship.",
  },
  {
    bg: IMAGES.AI_Service_Hero_Visual_Light_Orange_1_1_Scaled,
    eyebrow: "Enterprise Delivery",
    title: "AI-Powered\nSystems That\nWork 24/7.",
    sub: "Intelligent automation and custom AI agents built to replace repetitive work at scale.",
  },
];
const STATS_BAR = companyContent.stats;
const INTERVAL = 5000;
const HomeHero = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(prefersReducedMotion);
  const [userPaused, setUserPaused] = useState(false);
  const hoverPausedRef = useRef(false);
  const goTo = useCallback((i) => {
    setActive(i);
  }, []);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused]);
  const togglePause = () => {
    setUserPaused((p) => {
      const next = !p;
      setPaused(next || hoverPausedRef.current);
      return next;
    });
  };
  const s = SLIDES[active];
  return (
    <section
      className="hvs"
      onMouseEnter={() => {
        hoverPausedRef.current = true;
        setPaused(true);
      }}
      onMouseLeave={() => {
        hoverPausedRef.current = false;
        if (!userPaused) setPaused(false);
      }}
    >
      {}
      <div className="hvs__scene">
        {}
        <div className="hvs__bg" aria-hidden="true">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className={`hvs__bg-slide${i === active ? " is-active" : ""}`}
            >
              <ResponsiveImage
                src={slide.bg}
                sizes="100vw"
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : undefined}
              />
            </div>
          ))}
          <div className="hvs__overlay" />
        </div>
        {}
        <div className="hvs__inner-container">
          <div className="hvs__inner">
            <div className="hvs__left">
              <h1 className="screen-reader-text">
                AI-First Product Engineering Company
              </h1>
              <p className="hvs__eyebrow">
                <span className="hvs__live-dot" aria-hidden="true" />
                {s.eyebrow}
              </p>
              <p className="hvs__h1" aria-live="polite" aria-atomic="true">
                {s.title.split("\n").map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </p>
              <p className="hvs__sub">{s.sub}</p>
              <div className="hvs__ctas">
                <SiteLink schedule className="hvs__btn hvs__btn--fill">
                  Book a Strategy Call <ArrowRight size={15} />
                </SiteLink>
                <SiteLink
                  className="hvs__btn hvs__btn--ghost"
                  href={paths.caseStudies}
                >
                  View Case Studies <ArrowRight size={15} />
                </SiteLink>
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="hvs__controls">
          <button
            className="hvs__arrow hvs__arrow--prev"
            onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="hvs__dots" role="tablist" aria-label="Slides">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                className={`hvs__dot${i === active ? " is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="hvs__arrow hvs__arrow--next"
            onClick={() => goTo((active + 1) % SLIDES.length)}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
          <button
            className="hvs__pause"
            onClick={togglePause}
            aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={userPaused}
          >
            {userPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>
      {}
      <div className="hvs__statsbar-wrap">
        <div className="hvs__statsbar">
          {STATS_BAR.map((s, i) => (
            <div key={s.label} className="hvs__stat-item">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
              {i < STATS_BAR.length - 1 && <div className="hvs__stat-sep" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HomeHero;
