import { useEffect, useRef } from "react";
import "../../assets/styles/components/cursor.css";
const CustomCursor = () => {
  const cursorRef = useRef(null);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cursor = cursorRef.current;
    const dot = cursor.querySelector(".custom-cursor__dot");
    const ring = cursor.querySelector(".custom-cursor__ring");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastTime = 0;
    let initialized = false;
    let point = { x: 0, y: 0 };
    let follower = { x: 0, y: 0 };
    const position = (element, x, y) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const hide = () => {
      cursor.classList.remove("is-visible");
      cancelAnimationFrame(frame);
      frame = 0;
      initialized = false;
    };
    const follow = (time) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      const ease = reducedMotion.matches ? 1 : 1 - Math.exp(-elapsed / 85);
      follower.x += (point.x - follower.x) * ease;
      follower.y += (point.y - follower.y) * ease;
      if (Math.hypot(point.x - follower.x, point.y - follower.y) < 0.1) {
        follower = { ...point };
        frame = 0;
      } else {
        frame = requestAnimationFrame(follow);
      }
      position(ring, follower.x, follower.y);
    };
    const move = (event) => {
      if (!media.matches || event.pointerType === "touch") return;
      point = { x: event.clientX, y: event.clientY };
      position(dot, point.x, point.y);
      if (!initialized || reducedMotion.matches) {
        follower = { ...point };
        position(ring, follower.x, follower.y);
        initialized = true;
      }
      cursor.classList.add("is-visible");
      cursor.classList.toggle(
        "is-hovering",
        Boolean(
          event.target.closest(
            'a, button, summary, [role="button"], [data-cursor="link"]',
          ),
        ),
      );
      cursor.classList.toggle(
        "is-editing",
        Boolean(
          event.target.closest('input, textarea, [contenteditable="true"]'),
        ),
      );
      if (!frame && !reducedMotion.matches) {
        lastTime = 0;
        frame = requestAnimationFrame(follow);
      }
    };
    const sync = () => {
      document.documentElement.classList.toggle(
        "custom-cursor-enabled",
        media.matches,
      );
      if (!media.matches) hide();
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", sync);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);
  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor__ring" />
      <span className="custom-cursor__dot" />
    </div>
  );
};
export default CustomCursor;
