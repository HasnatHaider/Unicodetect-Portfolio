import CalendlyLink from "./CalendlyLink";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  Children,
  createContext,
  useContext,
  useId,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/scrollToSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade } from "swiper/modules";
import { HeroProvider } from "../../contexts/HeroContext";
import { useHero } from "../../contexts/hero-context";
import {
  NavigationContext,
  useNavigation,
} from "../../contexts/navigation-context";
import { ServicesContext, useServices } from "../../contexts/services-context";
export const SiteLink = ({ href, children, schedule = false, ...props }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const outbound = /^(?:https?:|\/\/|mailto:|tel:|skype:)/i.test(href ?? "");
  const outboundRel = [
    ...new Set([...(props.rel?.split(/\s+/) ?? []), "noopener", "noreferrer"]),
  ].join(" ");
  const closeMenu = () => {
    navigation?.setOpen(false);
    navigation?.setSubmenu(false);
  };
  const handleClick = (event) => {
    closeMenu();
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (href === "#") {
      event.preventDefault();
      return;
    }
    const destination = new URL(href, window.location.href);
    if (
      destination.origin === window.location.origin &&
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search &&
      destination.hash
    ) {
      event.preventDefault();
      if (destination.hash === window.location.hash)
        scrollToSection(destination.hash);
      else
        navigate(destination.pathname + destination.search + destination.hash);
    }
  };
  if (schedule)
    return (
      <CalendlyLink {...props} onBeforeOpen={closeMenu}>
        {children}
      </CalendlyLink>
    );
  if (href?.startsWith("/") && !href.startsWith("//"))
    return (
      <Link {...props} to={href} onClick={handleClick}>
        {children}
      </Link>
    );
  return (
    <a
      {...props}
      href={href}
      target={/^(?:https?:|\/\/)/i.test(href ?? "") ? "_blank" : props.target}
      rel={outbound ? outboundRel : props.rel}
      onClick={href ? handleClick : undefined}
    >
      {children}
    </a>
  );
};
export const HeroSection = ({ images, children, ...props }) => {
  return (
    <HeroProvider images={images}>
      <HeroBackground {...props}>{children}</HeroBackground>
    </HeroProvider>
  );
};
const HeroBackground = ({ children, ...props }) => {
  const hero = useHero();
  return (
    <section {...props}>
      <div className="react-hero-background" aria-hidden="true">
        {hero.images.map((image, index) => (
          <div
            key={image.url}
            className={hero.index === index ? "is-active" : ""}
            style={{ backgroundImage: `url(${image.url})` }}
          />
        ))}
      </div>
      {children}
    </section>
  );
};
export const HeroDots = () => {
  const hero = useHero();
  return (
    <div className="hero-sync-dots" role="group" aria-label="Choose hero slide">
      {hero.images.map((image, index) => (
        <button
          key={image.url}
          type="button"
          aria-label={`Show image ${index + 1}`}
          aria-pressed={hero.index === index}
          onClick={() => hero.setIndex(index)}
        />
      ))}
    </div>
  );
};
export const ImageCarousel = ({
  children,
  desktop = 1,
  tablet = desktop,
  mobile = tablet,
  gap = 0,
  tabletGap = gap,
  mobileGap = tabletGap,
  speed = 500,
  fade = false,
  autoplay = false,
  delay = 1,
  reverseDirection = false,
  loop = false,
  ...props
}) => {
  const hero = useHero();
  const swiperRef = useRef(null);
  const heroIndex = hero?.index;
  useEffect(() => {
    if (
      heroIndex !== undefined &&
      swiperRef.current &&
      swiperRef.current.realIndex !== heroIndex
    )
      swiperRef.current.slideToLoop(heroIndex);
  }, [heroIndex]);
  const slides = Children.toArray(children);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div {...props}>
      <div className="content-inner">
        <Swiper
          className="image-carousel"
          wrapperClass="image-carousel-track"
          modules={[A11y, Autoplay, EffectFade]}
          effect={fade ? "fade" : "slide"}
          fadeEffect={{ crossFade: true }}
          loop={loop && slides.length > desktop}
          speed={speed}
          slidesPerView={mobile}
          spaceBetween={mobileGap}
          breakpoints={{
            768: { slidesPerView: tablet, spaceBetween: tabletGap },
            1025: { slidesPerView: desktop, spaceBetween: gap },
          }}
          autoplay={
            !hero && !reducedMotion && autoplay
              ? {
                  delay,
                  reverseDirection,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            if (hero && hero.index !== swiper.realIndex)
              hero.setIndex(swiper.realIndex);
          }}
          a11y={{ containerMessage: "Image carousel" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>{slide}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export const ServicesSection = ({ children, className, ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <ServicesContext.Provider value={{ open, setOpen }}>
      <section
        {...props}
        className={`${className}${open ? " services-open" : ""}`}
      >
        {children}
      </section>
    </ServicesContext.Provider>
  );
};
export const ServicesToggle = (props) => {
  const { open, setOpen } = useServices();
  return (
    <button
      {...props}
      type="button"
      aria-expanded={open}
      onClick={(event) => {
        const section = event.currentTarget.closest("section");
        const scrollPosition = { left: window.scrollX, top: window.scrollY };
        setOpen(!open);
        if (!open) {
          requestAnimationFrame(() => {
            window.scrollTo({ ...scrollPosition, behavior: "instant" });
          });
        }
        if (open && section) {
          requestAnimationFrame(() => {
            if (section.id) scrollToSection(`#${section.id}`);
            else
              section.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
                block: "start",
              });
          });
        }
      }}
    >
      <span className="button-content">
        <span className="button-label">
          {open ? "View Less" : "Show all 15 services"}
        </span>
        <span className="button-icon">
          <ChevronDown size={"1em"} aria-hidden="true" />
        </span>
      </span>
    </button>
  );
};
const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);
export const Accordion = ({ children, ...props }) => {
  const [open, setOpen] = useState(0);
  return (
    <AccordionContext.Provider value={{ open, setOpen }}>
      <div {...props}>
        {Children.toArray(children).map((child, index) => (
          <AccordionItemContext.Provider key={index} value={index}>
            {child}
          </AccordionItemContext.Provider>
        ))}
      </div>
    </AccordionContext.Provider>
  );
};
export const AccordionItem = (props) => {
  return <div {...props} />;
};
export const AccordionTrigger = ({ className: _className, ...props }) => {
  const { open, setOpen } = useContext(AccordionContext);
  const index = useContext(AccordionItemContext);
  const expanded = open === index;
  const toggle = () => setOpen(expanded ? null : index);
  return (
    <div
      {...props}
      className={`accordion-trigger${expanded ? " is-active" : ""}`}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
    />
  );
};
const AnimatedFaqPanel = ({ expanded, children, onClosed, ...props }) => {
  const panelRef = useRef(null);
  const innerRef = useRef(null);
  const animationRef = useRef(null);
  const closedRef = useRef(onClosed);
  useLayoutEffect(() => {
    closedRef.current = onClosed;
  }, [onClosed]);
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const from = panel.getBoundingClientRect().height;
    animationRef.current?.cancel();
    const to = expanded ? innerRef.current.scrollHeight : 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    panel.style.height = `${to}px`;
    const finish = () => {
      panel.style.height = expanded ? "auto" : "0px";
      if (!expanded) closedRef.current?.();
    };
    if (reducedMotion || from === to) {
      finish();
      return;
    }
    const animation = panel.animate(
      [
        { height: `${from}px`, opacity: expanded ? 0.4 : 1 },
        { height: `${to}px`, opacity: expanded ? 1 : 0.4 },
      ],
      { duration: 280, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    animationRef.current = animation;
    animation.onfinish = finish;
    return () => animation.cancel();
  }, [expanded]);
  return (
    <div
      {...props}
      ref={panelRef}
      className="faq-animation-panel"
      aria-hidden={!expanded}
      inert={!expanded}
    >
      <div ref={innerRef} className="faq-animation-content">
        {children}
      </div>
    </div>
  );
};
export const AccordionPanel = ({ className = "", children, ...props }) => {
  const { open } = useContext(AccordionContext);
  const index = useContext(AccordionItemContext);
  const expanded = open === index;
  return (
    <AnimatedFaqPanel expanded={expanded}>
      <div
        {...props}
        className={`accordion-panel clearfix ${className}${expanded ? " is-active" : ""}`}
        style={{ display: "block" }}
      >
        {children}
      </div>
    </AnimatedFaqPanel>
  );
};
const DisclosureGroupContext = createContext(null);
export const DisclosureGroup = ({
  children,
  defaultOpenIndex = 0,
  ...props
}) => {
  const [open, setOpen] = useState(defaultOpenIndex);
  return (
    <DisclosureGroupContext.Provider value={{ open, setOpen }}>
      <div {...props}>
        {Children.toArray(children).map((child, index) => (
          <AccordionItemContext.Provider key={child.key ?? index} value={index}>
            {child}
          </AccordionItemContext.Provider>
        ))}
      </div>
    </DisclosureGroupContext.Provider>
  );
};
const DisclosureContext = createContext(null);
export const Disclosure = ({ defaultOpen = false, children, ...props }) => {
  const group = useContext(DisclosureGroupContext);
  const index = useContext(AccordionItemContext);
  const id = useId();
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const open = group ? group.open === index : localOpen;
  const [renderedOpen, setRenderedOpen] = useState(open);
  if (open && !renderedOpen) setRenderedOpen(true);
  const setOpen = (next) =>
    group ? group.setOpen(next ? index : null) : setLocalOpen(next);
  const [summary, ...content] = Children.toArray(children);
  return (
    <DisclosureContext.Provider
      value={{ open, setOpen, panelId: `${id}-answer` }}
    >
      <details {...props} open={open || renderedOpen} data-expanded={open}>
        {summary}
        <AnimatedFaqPanel
          id={`${id}-answer`}
          expanded={open}
          onClosed={() => setRenderedOpen(false)}
        >
          {content}
        </AnimatedFaqPanel>
      </details>
    </DisclosureContext.Provider>
  );
};
export const DisclosureSummary = (props) => {
  const { open, setOpen, panelId } = useContext(DisclosureContext);
  return (
    <summary
      {...props}
      aria-controls={panelId}
      aria-expanded={open}
      onClick={(event) => {
        event.preventDefault();
        setOpen(!open);
      }}
    />
  );
};
export const NavigationMenu = ({ children, className, style, ...props }) => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [position, setPosition] = useState({});
  const rootRef = useRef(null);
  useLayoutEffect(() => {
    const measure = () => {
      const root = rootRef.current;
      if (!root) return;
      const isMobile = window.matchMedia("(max-width: 1024px)").matches;
      setMobile(isMobile);
      if (!isMobile) setOpen(false);
      const rect = root.getBoundingClientRect();
      const toggle = root
        .querySelector(".navigation-toggle")
        ?.getBoundingClientRect();
      const services = root
        .querySelector(".has-submenu")
        ?.getBoundingClientRect();
      setPosition({
        "--services-menu-available-width": `${window.innerWidth - (services?.left || rect.left) - 50}px`,
        "--navigation-left": `${-rect.left}px`,
        "--navigation-width": `${window.innerWidth}px`,
        "--navigation-top": `${(toggle?.bottom || rect.bottom) - rect.top}px`,
        "--navigation-toggle-bottom": `${toggle?.bottom || rect.bottom}px`,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);
  useEffect(() => {
    if (open && mobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mobile]);
  return (
    <NavigationContext.Provider
      value={{ open, setOpen, submenu, setSubmenu, mobile }}
    >
      <div
        {...props}
        ref={rootRef}
        style={{ ...style, ...position }}
        className={`${className} react-navigation${open ? " is-open" : ""}${submenu ? " submenu-open" : ""}`}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            setSubmenu(false);
          }
        }}
      >
        {children}
        {open && mobile && (
          <div
            className="nav-overlay"
            aria-hidden="true"
            onClick={() => {
              setOpen(false);
              setSubmenu(false);
            }}
          />
        )}
      </div>
    </NavigationContext.Provider>
  );
};
export const NavigationToggle = ({ className, ...props }) => {
  const nav = useNavigation();
  return (
    <button
      {...props}
      type="button"
      className={`${className}${nav.open ? " navigation-active" : ""}`}
      aria-label={nav.open ? "Close menu" : "Open menu"}
      aria-controls="main-navigation"
      aria-expanded={nav.open}
      onClick={() => nav.setOpen(!nav.open)}
    >
      <span className="screen-reader-text">Menu</span>
      <span className="navigation-icon">
        {nav.open ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <Menu size={24} aria-hidden="true" />
        )}
      </span>
    </button>
  );
};
export const NavigationLinks = ({ className, ...props }) => {
  const nav = useNavigation();
  return (
    <nav
      {...props}
      className={`${className}${nav.mobile ? ` navigation-dropdown${nav.open ? " menu-is-active" : ""}` : ""}`}
    />
  );
};
export const NavigationSubmenuItem = (props) => {
  const nav = useNavigation();
  const expanded = nav.submenu === props.id;
  const setExpanded = (next) =>
    nav.setSubmenu((current) =>
      next ? props.id : current === props.id ? false : current,
    );
  const closeTimer = useRef(null);
  const cancelClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);
  useEffect(() => {
    if (nav.mobile || !expanded) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, [nav.mobile, expanded]);
  const scheduleClose = () => {
    if (nav.mobile) return;
    cancelClose();
    closeTimer.current = window.setTimeout(
      () =>
        nav.setSubmenu((current) => (current === props.id ? false : current)),
      200,
    );
  };
  return (
    <NavigationContext.Provider
      value={{
        ...nav,
        submenu: expanded,
        setSubmenu: setExpanded,
        submenuId: `${props.id}-submenu`,
      }}
    >
      <li
        {...props}
        className={`${props.className || ""}${expanded ? " is-submenu-open" : ""}`}
        onPointerEnter={(event) => {
          if (nav.mobile || event.pointerType !== "mouse") return;
          cancelClose();
          setExpanded(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") scheduleClose();
        }}
        onFocus={(event) => {
          if (!nav.mobile && event.target.matches(":focus-visible")) {
            cancelClose();
            setExpanded(true);
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            scheduleClose();
        }}
      />
    </NavigationContext.Provider>
  );
};
export const SubmenuTrigger = (props) => {
  const nav = useNavigation();
  return (
    <button
      {...props}
      type="button"
      aria-controls={nav.submenuId}
      aria-expanded={nav.submenu}
      onClick={() => nav.setSubmenu(!nav.submenu)}
    />
  );
};
