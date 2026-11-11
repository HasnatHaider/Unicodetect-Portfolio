import { useEffect, useRef, useState } from "react";
import { CheckCircle, LoaderCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { getContactToken, sendMailHelper } from "../../services/mail.services";
import { trackEvent } from "../../utils/analytics";
import { SiteLink } from "./Interactive";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ServiceInquiryForm({ service = "General" }) {
  const [status, setStatus] = useState("idle");
  const tokenRef = useRef(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    getContactToken()
      .then((t) => { tokenRef.current = t; })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sendingRef.current) return;
    const form = e.currentTarget;
    const name = String(form.elements.name.value).trim();
    const email = String(form.elements.email.value).trim();
    const message = String(form.elements.message.value).trim();

    if (!name || !email || !EMAIL_RE.test(email) || !message) {
      toast.error("Please fill in all fields with a valid email.");
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    try {
      await sendMailHelper({
        body: { name, email, message, company: "", phone: "" },
        subject: `${service} inquiry from ${name}`,
        token: tokenRef.current ?? (await getContactToken()),
        website: "",
      });
      form.reset();
      setStatus("success");
      trackEvent("service_inquiry_submit", { service });
      toast.success("Message sent — we'll be in touch within 1 business day.");
    } catch {
      setStatus("idle");
      toast.error("Couldn't send your message. Please try again.");
    } finally {
      sendingRef.current = false;
      tokenRef.current = null;
      getContactToken().then((t) => { tokenRef.current = t; }).catch(() => {});
    }
  };

  if (status === "success") {
    return (
      <div className="svc-inquiry-form svc-inquiry-form--success">
        <CheckCircle size={36} aria-hidden="true" />
        <p>Message sent! We'll reply within 1 business day.</p>
      </div>
    );
  }

  return (
    <form className="svc-inquiry-form" onSubmit={handleSubmit} noValidate>
      <input
        name="name"
        type="text"
        placeholder="Your name"
        maxLength={120}
        autoComplete="name"
        required
        disabled={status === "sending"}
      />
      <input
        name="email"
        type="email"
        placeholder="Email address"
        maxLength={254}
        autoComplete="email"
        required
        disabled={status === "sending"}
      />
      <textarea
        name="message"
        rows={3}
        placeholder="Tell us briefly what you're building…"
        maxLength={1000}
        required
        disabled={status === "sending"}
      />
      <button type="submit" className="company-button" disabled={status === "sending"}>
        {status === "sending" ? (
          <>Sending… <LoaderCircle size={16} aria-hidden="true" className="contact-send-spinner" /></>
        ) : (
          <>Send Inquiry <Send size={16} aria-hidden="true" /></>
        )}
      </button>
    </form>
  );
}
