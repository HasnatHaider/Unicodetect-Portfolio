import { Children } from "react";
import "../../assets/styles/components/marquee.css";

/**
 * Continuously scrolling logo strip. CSS-only: the slides are rendered twice
 * and the track slides left by one full set, so the loop is seamless and the
 * main thread does no work per frame (Swiper used to drive this in JS).
 *
 * `speed` is the time one slide takes to move its own width. Hovering pauses
 * the strip, and it stays still for people who prefer reduced motion.
 */
export const ImageCarousel = ({
  children,
  desktop = 1,
  tablet = desktop,
  mobile = tablet,
  gap = 0,
  tabletGap = gap,
  mobileGap = tabletGap,
  speed = 500,
  reverseDirection = false,
  className = "",
  style,
  ...props
}) => {
  const slides = Children.toArray(children);
  const vars = {
    "--marquee-show-mobile": mobile,
    "--marquee-show-tablet": tablet,
    "--marquee-show-desktop": desktop,
    "--marquee-gap-mobile": `${mobileGap}px`,
    "--marquee-gap-tablet": `${tabletGap}px`,
    "--marquee-gap-desktop": `${gap}px`,
    "--marquee-duration": `${slides.length * speed}ms`,
  };
  const renderSet = (copy) =>
    slides.map((slide, index) => (
      <div
        key={`${copy}-${index}`}
        className="marquee__slide"
        aria-hidden={copy === "b" ? "true" : undefined}
      >
        {slide}
      </div>
    ));
  return (
    <div className={className} style={{ ...style, ...vars }} {...props}>
      <div className="content-inner">
        <div
          className={`marquee${reverseDirection ? " marquee--reverse" : ""}`}
        >
          <div className="marquee__track">
            {renderSet("a")}
            {renderSet("b")}
          </div>
        </div>
      </div>
    </div>
  );
};
