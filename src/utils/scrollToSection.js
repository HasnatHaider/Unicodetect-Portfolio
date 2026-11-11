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
  const end = Math.max(
    0,
    Math.min(
      start + target.getBoundingClientRect().top - margin,
      document.documentElement.scrollHeight - window.innerHeight,
    ),
  );
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: end, behavior: "instant" });
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
      top: start + (end - start) * eased,
      behavior: "instant",
    });
    if (progress < 1) frame = requestAnimationFrame(tick);
    else cancel();
  };
  cancelCurrentScroll = cancel;
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", onKeyDown);
  frame = requestAnimationFrame(tick);
  return cancel;
}
