let cancelCurrentScroll;
export function scrollToSection(hash) {
  cancelCurrentScroll?.();
  let id;
  try {
    id = decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return;
  }
  const target = document.getElementById(id);
  if (!target) return;
  const start = window.scrollY;
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  // Measured fresh on every frame: sections below the fold use
  // content-visibility, so their heights change as they render during the
  // scroll and the target moves.
  const targetY = () =>
    Math.max(
      0,
      Math.min(
        window.scrollY + target.getBoundingClientRect().top - margin,
        document.documentElement.scrollHeight - window.innerHeight,
      ),
    );
  // After arriving, keep correcting for a few frames while late sections settle.
  const settle = (framesLeft = 12) => {
    const y = targetY();
    if (Math.abs(window.scrollY - y) > 1)
      window.scrollTo({ top: y, behavior: "instant" });
    if (framesLeft > 0) requestAnimationFrame(() => settle(framesLeft - 1));
  };
  const end = targetY();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: end, behavior: "instant" });
    settle();
    return;
  }
  const duration = Math.min(1800, Math.max(900, Math.abs(end - start) * 0.22));
  const started = performance.now();
  let frame;
  const cancel = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", onKeyDown);
    if (cancelCurrentScroll === cancel) cancelCurrentScroll = undefined;
  };
  const onKeyDown = (event) => {
    if (
      [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ].includes(event.key)
    )
      cancel();
  };
  const tick = (now) => {
    const progress = Math.min(1, (now - started) / duration);
    const eased =
      progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
    window.scrollTo({
      top: start + (targetY() - start) * eased,
      behavior: "instant",
    });
    if (progress < 1) frame = requestAnimationFrame(tick);
    else {
      cancel();
      settle();
    }
  };
  cancelCurrentScroll = cancel;
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", onKeyDown);
  frame = requestAnimationFrame(tick);
  return cancel;
}
