import React, { useState } from "react";
import "../assets/styles/pages/RedesignLandingPage.css";
import usePageMetadata from "../hooks/usePageMetadata";
import CalendlyLink from "../components/sharedUi/CalendlyLink";
import { SiteLink } from "../components/sharedUi/Interactive";
import { paths } from "../routes/paths";
import logoBms from "../assets/images/logo-bms.png";
import logoBellReserve from "../assets/images/logo-bellreserve.png";
import logoIconicBeauti from "../assets/images/logo-iconic-beauti.png";
import logoSpinTheNight from "../assets/images/logo-spin-the-night.png";

const RedesignLandingPage = () => {
  // Redesign preview: kept out of search results and the sitemap.
  usePageMetadata({
    title: "AI Agents for US & UK Teams | UnicodeTech",
    description:
      "UnicodeTech designs, builds and connects production-ready AI agents to the tools you already use. Most clients have a working agent live in 4–6 weeks.",
    bodyClass: "rlp-page-body",
    noIndex: true,
  });
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How long until a working agent?",
      a: "Most clients have a working agent in production within 4–6 weeks. The first two weeks cover discovery and architecture.",
    },
    {
      q: "How much does it cost?",
      a: "Sprints start from $3,500. After the strategy call you get a fixed quote for your scope, with no hidden costs.",
    },
    {
      q: "Do we have to replace our existing tools?",
      a: "No. We connect agents to the tools you already use: your CRM, Slack, Google Workspace, databases or any system with an API.",
    },
    {
      q: "What happens when the AI gets something wrong?",
      a: "Every agent ships with guardrails: confidence thresholds, retry logic and escalation to a person for anything uncertain.",
    },
    {
      q: "Can you work in our time zone?",
      a: "Yes. Our Lahore team overlaps with US Eastern mornings and UK afternoons, with weekly demos on a call.",
    },
  ];

  return (
    <div className="rlp-root">
      {/* ── Header ── */}
      <header className="rlp-header">
        <div className="rlp-header__inner">
          <SiteLink href="/" className="rlp-logo" aria-label="UnicodeTech home">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <path
                d="M5 4v9a8 8 0 0 0 16 0V4"
                fill="none"
                stroke="#15171c"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="13" cy="13" r="2.6" fill="#F45B35" />
            </svg>
            <span className="rlp-logo__text">
              Unicode<span className="rlp-logo__accent">Tech</span>
            </span>
          </SiteLink>
          <CalendlyLink
            className="rlp-btn rlp-btn--primary"
            data-source="redesign-landing-header"
          >
            Book a Strategy Call
          </CalendlyLink>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="top" className="rlp-hero">
        <div className="rlp-container rlp-hero__inner">
          <div className="rlp-hero__copy">
            <div className="rlp-badge">
              <span className="rlp-badge__dot" />
              AI agents for US &amp; UK teams
            </div>
            <h1 className="rlp-hero__h1">
              AI agents that answer calls, qualify leads and clear the busywork.
            </h1>
            <p className="rlp-hero__sub">
              We design, build and connect production-ready AI agents to the
              tools you already use. Most clients have a working agent live in
              4–6 weeks.
            </p>
            <div className="rlp-hero__ctas">
              <CalendlyLink
                className="rlp-btn rlp-btn--primary rlp-btn--lg"
                data-source="redesign-landing-hero"
              >
                Book a free 30-min call
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CalendlyLink>
              <SiteLink href="#how" className="rlp-btn rlp-btn--outline rlp-btn--lg">
                See how it works
              </SiteLink>
            </div>
            <p className="rlp-hero__meta">
              30+ in-house engineers · 100+ products delivered · Clients in 15+
              countries
            </p>
          </div>

          {/* Hero visual */}
          <div className="rlp-hero__visual">
            <div className="rlp-call-card">
              <div className="rlp-call-card__header">
                <div className="rlp-call-card__caller">
                  <span className="rlp-call-card__icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"
                        fill="none"
                        stroke="#c93a17"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="rlp-call-card__title">Incoming call</div>
                    <div className="rlp-call-card__time">
                      Thu, 9:42 pm · after hours
                    </div>
                  </div>
                </div>
                <span className="rlp-call-card__status">AI answering</span>
              </div>
              <div className="rlp-bubble rlp-bubble--left">
                Hi, can I book a table for four tomorrow at 7?
              </div>
              <div className="rlp-bubble rlp-bubble--right">
                Of course. 7:00 pm tomorrow is available for four. Can I take a
                name?
              </div>
              <div className="rlp-call-card__summary">
                <div>
                  <div className="rlp-call-card__label">Intent</div>
                  <div className="rlp-call-card__value">Reservation</div>
                </div>
                <div>
                  <div className="rlp-call-card__label">Party</div>
                  <div className="rlp-call-card__value">4 guests</div>
                </div>
                <div>
                  <div className="rlp-call-card__label">Time</div>
                  <div className="rlp-call-card__value">Tomorrow, 7:00 pm</div>
                </div>
                <div>
                  <div className="rlp-call-card__label">Status</div>
                  <div className="rlp-call-card__value rlp-call-card__value--accent">
                    Sent to staff
                  </div>
                </div>
              </div>
              <div className="rlp-call-card__caption">
                Example call flow, based on BellReserve
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo strip ── */}
      <section className="rlp-logos">
        <div className="rlp-logos__inner">
          <span className="rlp-logos__label">
            Trusted by teams we've built with
          </span>
          <img src={logoBms} alt="BMS" className="rlp-logos__img" />
          <span className="rlp-logos__text-logo">LiftPitch</span>
          <img
            src={logoBellReserve}
            alt="BellReserve"
            className="rlp-logos__img"
          />
          <img
            src={logoSpinTheNight}
            alt="Spin The Night"
            className="rlp-logos__img"
          />
          <img
            src={logoIconicBeauti}
            alt="Iconic Beauti"
            className="rlp-logos__img"
          />
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="rlp-section">
        <div className="rlp-container">
          <div className="rlp-section__heading">
            <div className="rlp-eyebrow">The problem</div>
            <h2 className="rlp-h2">
              Your team is doing work an agent could handle.
            </h2>
          </div>
          <div className="rlp-cards rlp-cards--3">
            <div className="rlp-card">
              <h3 className="rlp-card__title">Missed calls after hours</h3>
              <p className="rlp-card__body">
                Every unanswered call is a booking or a lead that goes to
                someone else.
              </p>
            </div>
            <div className="rlp-card">
              <h3 className="rlp-card__title">Leads going cold</h3>
              <p className="rlp-card__body">
                Research, follow-ups and qualification wait until someone has
                time.
              </p>
            </div>
            <div className="rlp-card">
              <h3 className="rlp-card__title">Staff stuck copying data</h3>
              <p className="rlp-card__body">
                Invoices, forms and CRM updates moved by hand, one system at a
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we build ── */}
      <section className="rlp-section rlp-section--tinted">
        <div className="rlp-container">
          <div className="rlp-section__heading">
            <div className="rlp-eyebrow">What we build</div>
            <h2 className="rlp-h2">
              The model is one layer. The value is the workflow around it.
            </h2>
          </div>
          <div className="rlp-cards rlp-cards--4">
            <div className="rlp-card rlp-card--white">
              <span className="rlp-icon-wrap">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect
                    x="9"
                    y="3"
                    width="6"
                    height="11"
                    rx="3"
                    fill="none"
                    stroke="#c93a17"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M5 11a7 7 0 0 0 14 0M12 18v3"
                    fill="none"
                    stroke="#c93a17"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <h3 className="rlp-card__title">Voice &amp; conversational AI</h3>
              <p className="rlp-card__body">
                Agents that answer calls, capture intent and hand structured
                details to your team.
              </p>
            </div>
            <div className="rlp-card rlp-card--white">
              <span className="rlp-icon-wrap">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    cx="5"
                    cy="6"
                    r="2.2"
                    fill="none"
                    stroke="#c93a17"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="19"
                    cy="6"
                    r="2.2"
                    fill="none"
                    stroke="#c93a17"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="18"
                    r="2.2"
                    fill="none"
                    stroke="#c93a17"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M7 7l4 9M17 7l-4 9M7.2 6h9.6"
                    fill="none"
                    stroke="#c93a17"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>
              <h3 className="rlp-card__title">Agentic workflow automation</h3>
              <p className="rlp-card__body">
                AI that reasons across steps, tools and business rules, with a
                human in the loop.
              </p>
            </div>
            <div className="rlp-card rlp-card--white">
              <span className="rlp-icon-wrap">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="14"
                    rx="3"
                    fill="none"
                    stroke="#c93a17"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M12 8l1 2.2 2.2 1-2.2 1L12 14.4 11 12.2 8.8 11.2 11 10.2z"
                    fill="#c93a17"
                  />
                </svg>
              </span>
              <h3 className="rlp-card__title">AI inside your product</h3>
              <p className="rlp-card__body">
                Search, summaries, recommendations and copilots inside your SaaS
                or mobile app.
              </p>
            </div>
            <div className="rlp-card rlp-card--white">
              <span className="rlp-icon-wrap">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M9 7H6a4 4 0 0 0 0 8h3M15 7h3a4 4 0 0 1 0 8h-3M8 11h8"
                    fill="none"
                    stroke="#c93a17"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <h3 className="rlp-card__title">Data &amp; system integration</h3>
              <p className="rlp-card__body">
                Connected to your CRM, Slack, Google Workspace, databases and
                APIs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof: BellReserve + review ── */}
      <section className="rlp-section rlp-section--dark">
        <div className="rlp-container rlp-proof">
          <div className="rlp-proof__copy">
            <div className="rlp-eyebrow rlp-eyebrow--light">
              Built by us · Live product
            </div>
            <h2 className="rlp-h2 rlp-h2--light">
              BellReserve: an AI receptionist for restaurants.
            </h2>
            <p className="rlp-proof__body">
              It answers calls, understands whether the caller wants to order,
              reserve or ask a question, and sends staff the details with the
              transcript and recording.
            </p>
            <div className="rlp-flow-tags">
              <span className="rlp-flow-tag">Incoming call</span>
              <span className="rlp-flow-arrow" aria-hidden="true">
                →
              </span>
              <span className="rlp-flow-tag">Understand intent</span>
              <span className="rlp-flow-arrow" aria-hidden="true">
                →
              </span>
              <span className="rlp-flow-tag">Capture details</span>
              <span className="rlp-flow-arrow" aria-hidden="true">
                →
              </span>
              <span className="rlp-flow-tag rlp-flow-tag--accent">
                Staff view
              </span>
            </div>
            <SiteLink
              href={`${paths.caseStudies}/bellreserve`}
              className="rlp-proof__link"
            >
              See BellReserve →
            </SiteLink>
          </div>
          <div className="rlp-review-card">
            <div className="rlp-review-card__top">
              <span className="rlp-review-card__logo">LiftPitch</span>
              <span
                className="rlp-stars"
                role="img"
                aria-label="Rated 5 out of 5"
              >
                ★★★★★
              </span>
            </div>
            <p className="rlp-review-card__quote">
              "Mohsin was very responsive and asked all the right questions in
              order to understand the brief. He was easy to work with and very
              responsive to messages and questions from me. I would definitely
              work with Mohsin again and thank him."
            </p>
            <div className="rlp-review-card__attr">
              <div className="rlp-review-card__name">
                nesloang · Australia · LiftPitch client
              </div>
              <div className="rlp-review-card__source">
                Client review of our founder's work, verified on Fiverr
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="rlp-section">
        <div className="rlp-container">
          <div className="rlp-section__heading">
            <div className="rlp-eyebrow">How it works</div>
            <h2 className="rlp-h2">
              From first call to a live agent in about six weeks.
            </h2>
          </div>
          <ol className="rlp-steps">
            <li className="rlp-step rlp-step--active">
              <div className="rlp-step__label">Step 1 · Day 1</div>
              <div className="rlp-step__title">Strategy call</div>
              <p className="rlp-step__body">
                30 minutes, free. We map the workflow and tell you honestly if
                AI is the right fit.
              </p>
            </li>
            <li className="rlp-step">
              <div className="rlp-step__label">Step 2 · Weeks 1–2</div>
              <div className="rlp-step__title">
                Discovery &amp; architecture
              </div>
              <p className="rlp-step__body">
                Scope, data, integrations and success measures agreed before we
                build.
              </p>
            </li>
            <li className="rlp-step">
              <div className="rlp-step__label">Step 3 · Weeks 3–5</div>
              <div className="rlp-step__title">Build &amp; integrate</div>
              <p className="rlp-step__body">
                Weekly demos as the agent connects to your tools, with
                guardrails and testing.
              </p>
            </li>
            <li className="rlp-step">
              <div className="rlp-step__label">Step 4 · Week 6+</div>
              <div className="rlp-step__title">Launch &amp; improve</div>
              <p className="rlp-step__body">
                Go live, monitor accuracy and cost, and keep improving after
                launch.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="rlp-section rlp-section--tinted">
        <div className="rlp-container">
          <div className="rlp-section__heading">
            <div className="rlp-eyebrow">Why UnicodeTech</div>
            <h2 className="rlp-h2">A product team, not a prompt shop.</h2>
          </div>
          <div className="rlp-cards rlp-cards--4">
            {[
              {
                title: "Your hours, our overlap",
                body: "Based in Lahore with daily overlap for US and UK teams. Replies within 1 business day.",
              },
              {
                title: "You own 100% of the code",
                body: "Source code and IP are yours, in writing, before work starts. NDA on request.",
              },
              {
                title: "Model-agnostic",
                body: "OpenAI, Anthropic Claude or Google Gemini, chosen for accuracy, speed and cost.",
              },
              {
                title: "Guardrails built in",
                body: "Confidence thresholds, retries and handoff to a person when the agent isn't sure.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="rlp-card rlp-card--white">
                <h3 className="rlp-card__title">{title}</h3>
                <p className="rlp-card__body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="rlp-section">
        <div className="rlp-container">
          <div className="rlp-section__heading">
            <div className="rlp-eyebrow">Ways to work</div>
            <h2 className="rlp-h2">Start small. Scale what works.</h2>
          </div>
          <div className="rlp-pricing">
            <div className="rlp-plan rlp-plan--featured">
              <div className="rlp-plan__top">
                <h3 className="rlp-plan__name">AI &amp; Automation Sprint</h3>
                <span className="rlp-plan__badge">Most popular</span>
              </div>
              <p className="rlp-plan__desc">
                One workflow mapped, built and connected: a working agent and a
                next-step roadmap.
              </p>
              <div className="rlp-plan__price">From $3,500</div>
              <ul className="rlp-plan__features">
                <li>4–6 weeks to production</li>
                <li>Discovery, build, integration and testing</li>
                <li>30 days of post-launch support</li>
              </ul>
              <CalendlyLink
                className="rlp-btn rlp-btn--primary rlp-btn--full"
                data-source="redesign-landing-pricing"
              >
                Book a Strategy Call
              </CalendlyLink>
            </div>
            <div className="rlp-plan">
              <h3 className="rlp-plan__name">Dedicated AI team</h3>
              <p className="rlp-plan__desc">
                An embedded team for several agents or a product with AI at its
                core.
              </p>
              <div className="rlp-plan__price">
                From $4,500
                <span className="rlp-plan__period"> / month</span>
              </div>
              <ul className="rlp-plan__features">
                <li>Engineers, designer and QA on your roadmap</li>
                <li>Monthly rolling, 30-day flexibility</li>
                <li>Daily standups in your time zone</li>
              </ul>
              <SiteLink
                href={paths.contact}
                className="rlp-btn rlp-btn--outline rlp-btn--full"
              >
                Talk to us
              </SiteLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="rlp-section rlp-section--tinted">
        <div className="rlp-faq-wrap">
          <h2 className="rlp-h2 rlp-h2--center">Questions before we start</h2>
          <div className="rlp-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="rlp-faq-item">
                <button
                  className="rlp-faq-item__q"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={openFaq === i}
                >
                  {faq.q}
                  <span
                    className={`rlp-faq-item__icon ${openFaq === i ? "rlp-faq-item__icon--open" : ""}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {openFaq === i && <p className="rlp-faq-item__a">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section id="book" className="rlp-section rlp-section--dark rlp-cta">
        <div className="rlp-cta__inner">
          <h2 className="rlp-h2 rlp-h2--light">
            Bring one workflow. Leave with a plan.
          </h2>
          <p className="rlp-cta__sub">
            A focused 30-minute call to map the workflow, the risks and the most
            useful next step. No pressure: if we're not the right fit, we'll say
            so.
          </p>
          <div className="rlp-cta__buttons">
            <CalendlyLink
              className="rlp-btn rlp-btn--primary rlp-btn--xl"
              data-source="redesign-landing-cta"
            >
              Book a free strategy call
            </CalendlyLink>
            <a
              href="https://wa.me/923244559088"
              target="_blank"
              rel="noopener noreferrer"
              className="rlp-btn rlp-btn--ghost rlp-btn--xl"
            >
              Chat on WhatsApp
            </a>
          </div>
          <p className="rlp-cta__email">
            Or email{" "}
            <a
              href="mailto:info@unicodetech.com"
              className="rlp-cta__email-link"
            >
              info@unicodetech.com
            </a>
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="rlp-footer">
        <div className="rlp-footer__inner">
          <span>© 2026 UnicodeTech (Pvt) Ltd · Based in Lahore, Pakistan</span>
          <span className="rlp-footer__links">
            <SiteLink href={paths.privacyPolicy} className="rlp-footer__link">
              Privacy Policy
            </SiteLink>
            <SiteLink
              href={paths.termsAndConditions}
              className="rlp-footer__link"
            >
              Terms
            </SiteLink>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default RedesignLandingPage;
