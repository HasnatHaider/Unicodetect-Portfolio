import { useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { CALENDLY_URL, openCalendly } from "../../services/calendly";
import { trackEvent } from "../../utils/analytics";

export default function CalendlyLink({
  children,
  onBeforeOpen,
  rel,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const pending = useRef(false);
  const handleClick = async (event) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    onBeforeOpen?.();
    setLoading(true);
    try {
      await openCalendly();
      trackEvent("calendly_open", { source: props["data-source"] ?? "unknown" });
    } catch {
      toast.error(
        "The scheduler couldn’t load. Please try again, or open the booking link in a new tab.",
      );
    } finally {
      pending.current = false;
      setLoading(false);
    }
  };
  return (
    <a
      {...props}
      href={CALENDLY_URL}
      target="_blank"
      rel={[
        ...new Set([...(rel?.split(/\s+/) ?? []), "noopener", "noreferrer"]),
      ].join(" ")}
      onClick={handleClick}
      aria-busy={loading}
      aria-haspopup="dialog"
      data-site-action="calendly"
    >
      {children}
      {loading && (
        <LoaderCircle
          size={16}
          aria-hidden="true"
          className="calendly-loading-icon"
        />
      )}
    </a>
  );
}
