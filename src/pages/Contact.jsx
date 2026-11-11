import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Check,
  CheckCircle,
  Mail,
  Phone,
  Send,
  LoaderCircle,
  ChevronRight,
} from "lucide-react";
import usePageMetadata from "../hooks/usePageMetadata";
import { companyContent } from "../utils/companyContent";
import { CompanyHeading } from "../components/companySections/CompanyUi";
import ResponsiveImage from "../components/sharedUi/ResponsiveImage";
import { IMAGES } from "../utils/Constant";
import { SiteLink } from "../components/sharedUi/Interactive";
import { paths } from "../routes/paths";
import PageBreadcrumb from "../components/sharedUi/PageBreadcrumb";
import { getContactToken, sendMailHelper } from "../services/mail.services";
import { trackEvent } from "../utils/analytics";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <span id={id} className="contact-field-error" role="alert">
      {message}
    </span>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()\-+]{5,18}$/;
const MIN_MESSAGE = 20;

function validate(body) {
  const errs = {};
  if (!body.name) errs.name = "Please enter your full name.";
  if (!body.email) errs.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(body.email))
    errs.email = "Please enter a valid email address.";
  if (body.phone && !PHONE_RE.test(body.phone))
    errs.phone =
      "Please enter a valid phone number (digits, spaces, +, -, parentheses).";
  if (!body.message) errs.message = "Please tell us about your project.";
  else if (body.message.length < MIN_MESSAGE)
    errs.message = `Please add a bit more detail — at least ${MIN_MESSAGE} characters.`;
  return errs;
}

export default function Contact() {
  usePageMetadata({
    title: "Contact UnicodeTech | Start Your Project",
    description:
      "Get in touch with UnicodeTech to discuss your next software project. We're ready to help with engineering, design, and product delivery.",
    bodyClass: "site site-design company-page-body",
  });

  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [messageLength, setMessageLength] = useState(0);
  const sendingRef = useRef(false);
  const tokenRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const controller = { active: true };
    getContactToken()
      .then((token) => {
        if (controller.active) tokenRef.current = token;
      })
      .catch(() => {});
    return () => {
      controller.active = false;
    };
  }, []);

  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sendingRef.current) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const body = Object.fromEntries(
      ["name", "email", "phone", "company", "message"].map((field) => [
        field,
        String(fields.get(field) ?? "").trim(),
      ]),
    );

    const errs = validate(body);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstField = Object.keys(errs)[0];
      form.elements[firstField]?.focus();
      return;
    }

    setErrors({});
    sendingRef.current = true;
    setStatus("sending");

    try {
      await sendMailHelper({
        subject: `Project inquiry from ${body.name} — ${body.company}`,
        body,
        token: tokenRef.current ?? (await getContactToken()),
        website: String(fields.get("website") ?? ""),
      });
      form.reset();
      setStatus("success");
      trackEvent("contact_form_submit", { source: "contact_page" });
      toast.success(
        "Thank you — your message has been sent. Our team will be in touch.",
      );
    } catch {
      setStatus("error");
      toast.error("We couldn't send your message.", {
        description: (
          <>
            Your details are still here — please try again or{" "}
            <SiteLink
              style={{ color: "#ffffffff" }}
              target="_blank"
              href={`mailto:${companyContent.email}`}
            >
              email our team
            </SiteLink>
            .
          </>
        ),
      });
    } finally {
      sendingRef.current = false;
      tokenRef.current = null;
      getContactToken()
        .then((token) => {
          tokenRef.current = token;
        })
        .catch(() => {});
    }
  };

  return (
    <div className="page-content company-page contact-page">
      <section
        className="company-hero contact-hero service-hero-theme"
        aria-labelledby="company-page-title"
        style={{ "--image-contactHeroBg": `url(${IMAGES.contactHeroBgNew})` }}
      >
        <div className="company-container company-hero-grid">
          <div>
            <PageBreadcrumb />
            <span className="company-eyebrow">LET'S TALK</span>
            <h1 id="company-page-title" className="service-hero-title">
              Tell us what you're building.
            </h1>
            <p className="service-hero-description">
              {companyContent.locationSummary} Share what you have in mind and
              we will help you map the clearest path forward.
            </p>
            <div className="company-actions">
              <SiteLink
                schedule
                className="service-hero-button service-hero-button--primary"
              >
                Book a Strategy Call{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </SiteLink>
              <a
                href="#project-inquiry"
                className="service-hero-button service-hero-button--secondary"
              >
                Send a Message <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="contact-hero-artwork">
            <ResponsiveImage
              src={IMAGES.contactHeroMockup}
              width="960"
              height="840"
              alt="UnicodeTech contact"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section
        className="company-section contact-form-section"
        aria-labelledby="contact-form-title"
      >
        <div
          className="company-container contact-form-layout"
          style={{ "--image-contactHeroBg": `url(${IMAGES.contactHeroBgNew})` }}
        >
          <div className="contact-form-intro">
            <CompanyHeading
              eyebrow="YOUR NEXT PROJECT"
              title="Share a few details."
              id="contact-form-title"
            />
            <p>
              Tell us about your project so we can understand your goals and
              prepare a proposal.
            </p>
            <ul className="contact-benefits">
              <li>
                <span className="contact-benefit-check" aria-hidden="true">
                  <Check size={12} strokeWidth={3} />
                </span>
                Quick response within 1 business day (PKT)
              </li>
              <li>
                <span className="contact-benefit-check" aria-hidden="true">
                  <Check size={12} strokeWidth={3} />
                </span>
                Clear and honest consultation
              </li>
              <li>
                <span className="contact-benefit-check" aria-hidden="true">
                  <Check size={12} strokeWidth={3} />
                </span>
                Tailored suggestions for your goals
              </li>
            </ul>
          </div>

          <div id="project-inquiry" className="contact-form-panel">
            {status === "success" ? (
              <div className="contact-success">
                <CheckCircle size={52} aria-hidden="true" />
                <h3>Message sent!</h3>
                <p>Thanks — we'll reply within 1 business day.</p>
                <SiteLink schedule className="company-button">
                  Book a Strategy Call
                </SiteLink>
                <button
                  className="company-button contact-success-secondary"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-busy={status === "sending"}
                onChange={() => {
                  if (status === "error") setStatus("idle");
                }}
              >
                <label
                  className="contact-honeypot"
                  aria-hidden="true"
                  tabIndex={-1}
                  style={{
                    display: "none",
                    visibility: "hidden",
                    position: "absolute",
                    left: "-9999px",
                  }}
                >
                  <span aria-hidden="true">Leave this field empty</span>
                  <input
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                </label>

                <div className="contact-form-grid">
                  <label>
                    Full name <span aria-hidden="true">*</span>
                    <input
                      disabled={status === "sending"}
                      name="name"
                      autoComplete="name"
                      maxLength={120}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      className={
                        errors.name ? "contact-input-error" : undefined
                      }
                      onChange={() => clearError("name")}
                    />
                    <FieldError id="err-name" message={errors.name} />
                  </label>

                  <label>
                    Email address <span aria-hidden="true">*</span>
                    <input
                      disabled={status === "sending"}
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      className={
                        errors.email ? "contact-input-error" : undefined
                      }
                      onChange={() => clearError("email")}
                    />
                    <FieldError id="err-email" message={errors.email} />
                  </label>

                  <label>
                    Phone number
                    <input
                      disabled={status === "sending"}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={40}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                      className={
                        errors.phone ? "contact-input-error" : undefined
                      }
                      onChange={() => clearError("phone")}
                    />
                    <FieldError id="err-phone" message={errors.phone} />
                  </label>

                  <label>
                    Company name
                    <input
                      disabled={status === "sending"}
                      name="company"
                      autoComplete="organization"
                      maxLength={160}
                    />
                  </label>
                </div>

                <label>
                  Project details <span aria-hidden="true">*</span>
                  <textarea
                    disabled={status === "sending"}
                    name="message"
                    rows={5}
                    maxLength={2000}
                    placeholder="What would you like to build?"
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "err-message" : undefined
                    }
                    className={
                      errors.message ? "contact-input-error" : undefined
                    }
                    onChange={(e) => {
                      clearError("message");
                      setMessageLength(e.target.value.length);
                    }}
                  />
                  <span className="contact-char-counter" aria-live="polite">
                    {messageLength}/2000
                    {messageLength > 0 &&
                      messageLength < MIN_MESSAGE &&
                      ` (${MIN_MESSAGE - messageLength} more needed)`}
                  </span>
                  <FieldError id="err-message" message={errors.message} />
                </label>

                <div className="contact-form-footer">
                  <p className="contact-form-note">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Your details are safe with us. Read our{" "}
                    <SiteLink href={paths.privacyPolicy}>
                      Privacy Policy
                    </SiteLink>
                    .
                  </p>

                  {status === "error" && (
                    <div
                      className="contact-send-status contact-send-status--error"
                      role="alert"
                      aria-live="polite"
                    >
                      <p>
                        Couldn't send — please try again or{" "}
                        <a href={`mailto:${companyContent.email}`}>
                          email our team
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="company-button"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <>
                        Sending…{" "}
                        <LoaderCircle
                          className="contact-send-spinner"
                          size={18}
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Other Ways to Reach Us */}
      <section
        className="company-section contact-channels-section"
        aria-labelledby="contact-channels-title"
      >
        <div className="company-container">
          <div className="contact-channels-heading">
            <span className="company-eyebrow">CONTACT OPTIONS</span>
            <h2 id="contact-channels-title">Other Ways to Reach Us</h2>
            <p>
              Prefer a different way? You can reach us through email, phone, or
              WhatsApp.
            </p>
          </div>
          <div className="contact-channels-grid">
            <SiteLink
              href={`mailto:${companyContent.email}`}
              className="contact-channel-card"
            >
              <div className="contact-channel-icon contact-channel-icon--primary">
                <Mail size={22} aria-hidden="true" />
              </div>
              <div className="contact-channel-body">
                <h3>Email us</h3>
                <p>{companyContent.email}</p>
              </div>
              <ChevronRight
                size={20}
                className="contact-channel-arrow"
                aria-hidden="true"
              />
            </SiteLink>

            <SiteLink
              href={companyContent.office.phoneHref}
              className="contact-channel-card"
            >
              <div className="contact-channel-icon">
                <Phone size={22} aria-hidden="true" />
              </div>
              <div className="contact-channel-body">
                <h3>Direct line (Lahore)</h3>
                <p>{companyContent.office.phone}</p>
              </div>
              <ChevronRight
                size={20}
                className="contact-channel-arrow"
                aria-hidden="true"
              />
            </SiteLink>

            <SiteLink
              href={companyContent.consultationPhoneHref}
              className="contact-channel-card"
            >
              <div className="contact-channel-icon">
                <Phone size={22} aria-hidden="true" />
              </div>
              <div className="contact-channel-body">
                <h3>US/Canada line</h3>
                <p>{companyContent.consultationPhone}</p>
              </div>
              <ChevronRight
                size={20}
                className="contact-channel-arrow"
                aria-hidden="true"
              />
            </SiteLink>

            <SiteLink
              href="https://wa.me/923244559088"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <div className="contact-channel-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="contact-channel-body">
                <h3>WhatsApp</h3>
                <p>Chat on WhatsApp</p>
              </div>
              <ChevronRight
                size={20}
                className="contact-channel-arrow"
                aria-hidden="true"
              />
            </SiteLink>
          </div>
        </div>
      </section>
    </div>
  );
}
