import ResponsiveImage from "../components/sharedUi/ResponsiveImage";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, Workflow, Phone } from "lucide-react";
import usePageMetadata from "../hooks/usePageMetadata";
import { getCaseStudy } from "../caseStudies";
import PageBreadcrumb from "../components/sharedUi/PageBreadcrumb";
import { clientReviews } from "../utils/clientReviews";
import ReviewCard from "../components/sharedUi/ReviewCard";
import ClientLogo from "../components/sharedUi/ClientLogo";
import { paths } from "../routes/paths";
import { SiteLink } from "../components/sharedUi/Interactive";
import NotFound from "./NotFound";
import "../assets/styles/pages/projectDetails.css";

function ProjectVideo({ project }) {
  const { video, liveCall, title } = project;
  const [playing, setPlaying] = useState(false);
  const startVideo = () => setPlaying(true);

  return (
    <div className="project-detail-video-shell">
      <div className="project-detail-video">
        <img
          src={video.poster}
          alt={`${title} product video`}
          width="1280"
          height="720"
          fetchPriority="high"
          decoding="async"
        />
        {!playing ? (
          <button
            className="project-detail-video__load"
            type="button"
            onClick={startVideo}
            aria-label={`Play ${title} product video`}
          >
            <span className="project-detail-video__play" aria-hidden="true">
              ▶
            </span>
          </button>
        ) : (
          <video
            src={video.src}
            title={`${title} product video`}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            preload="none"
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
        )}
      </div>
      <div className="project-detail-video-caption">
        <button
          type="button"
          className="project-detail-video-caption__watch"
          onClick={startVideo}
        >
          WATCH NOW
        </button>
        {liveCall?.intro && <span>{liveCall.intro}</span>}
      </div>
      {liveCall && (
        <a
          id={`${project.slug}-live-call`}
          className="project-detail-video-call"
          href={`tel:${liveCall.tel}`}
        >
          <span>
            <Phone size={19} aria-hidden="true" /> {liveCall.label}
          </span>
          <strong>{liveCall.display}</strong>
        </a>
      )}
    </div>
  );
}

function ProjectArtwork({ project }) {
  if (project.video) return <ProjectVideo project={project} />;
  const artInBackground = project.hero.artInBackground;
  const artwork = project.images.heroMockup ?? project.images.card;
  return artwork ? (
    <ResponsiveImage
      src={artwork}
      width="1024"
      height="576"
      alt={`${project.title} project artwork`}
      fetchPriority={artInBackground ? undefined : "high"}
      loading={artInBackground ? "lazy" : undefined}
      decoding="async"
    />
  ) : (
    <div className="project-detail-identity">
      <Workflow size={80} strokeWidth={1} aria-hidden="true" />
      <strong>{project.title}</strong>
      <span>{project.category}</span>
    </div>
  );
}

function ProjectContent({ project }) {
  const details = project.detail;
  const { hero, images } = project;
  usePageMetadata({
    title: `${project.title} Case Study | UnicodeTech`,
    description: project.description,
    bodyClass: "site site-design project-detail-page-body",
  });
  const next = project.next;
  const builtItems = details.built || details.features || [];
  const scopeItems = details.services || details.workflow || [];
  const hasMetrics =
    Array.isArray(details.metrics) && details.metrics.length > 0;
  const clientCompany = project.clientLogo;
  const reviewCard = details.reviewCardId
    ? clientReviews[details.reviewCardId]
    : null;

  return (
    <div className="page-content project-detail-page">
      <section
        className={`project-detail-hero service-hero-theme${hero.dark ? " project-detail-hero--dark" : " project-detail-hero--light"}${hero.artInBackground ? " project-detail-hero--art-bg" : ""}`}
        aria-labelledby="project-detail-title"
        style={{
          ...(images.heroBg
            ? { "--image-caseStudiesHeroBg": `url(${images.heroBg})` }
            : {}),
          ...(hero.dark
            ? {
                "--service-hero-heading-color": "#fff",
                "--service-hero-description-color": "#b8c2cd",
              }
            : {}),
          ...(hero.overlay
            ? { "--project-hero-overlay": hero.overlay }
            : {}),
        }}
      >
        <div className="project-detail-container">
          <SiteLink className="project-detail-back" href={paths.caseStudies}>
            <ArrowLeft size={16} aria-hidden="true" /> All Case Studies
          </SiteLink>
          <div className="project-detail-hero-grid">
            <div>
              <PageBreadcrumb />
              <span className="project-detail-eyebrow">{project.category}</span>
              <div className="client-logo-lockup project-detail-title-row">
                {project.logoId && <ClientLogo id={project.logoId} size={56} />}
                <h1 id="project-detail-title" className="service-hero-title">
                  {project.title}
                </h1>
              </div>
              <p className="service-hero-description">{project.description}</p>
              <SiteLink
                href={`${paths.contact}#project-inquiry`}
                className="service-hero-button service-hero-button--primary"
              >
                Book a Strategy Call{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </SiteLink>
            </div>
            <div className="project-detail-artwork">
              <ProjectArtwork project={project} />
            </div>
          </div>
        </div>
      </section>

      <section
        className="project-detail-section"
        aria-labelledby="project-overview-title"
      >
        <div className="project-detail-container project-detail-overview-grid">
          <div className="project-detail-narrative-stack">
            <div className="project-detail-narrative-block">
              <span className="project-detail-eyebrow">THE CLIENT</span>
              <h2 id="project-overview-title">About {project.title}</h2>
              {clientCompany && (
                <div className="client-logo-lockup project-detail-client">
                  <ClientLogo id={project.clientLogoId} size={36} />
                  <span>{clientCompany.name}</span>
                </div>
              )}
              <p>{details.client || details.overview}</p>
            </div>

            {details.challenge && (
              <div className="project-detail-narrative-block">
                <span className="project-detail-eyebrow">THE CHALLENGE</span>
                <h3>What needed solving</h3>
                <p>{details.challenge}</p>
              </div>
            )}

            {details.role && (
              <div className="project-detail-narrative-block">
                <span className="project-detail-eyebrow">OUR ROLE</span>
                <h3>How UnicodeTech owned delivery</h3>
                <p>{details.role}</p>
              </div>
            )}
          </div>
          <aside className="project-detail-stack">
            <h3>Platforms &amp; technology</h3>
            <ul>
              {project.stack.map((item) => (
                <li key={item}>
                  <Check size={16} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section
        className="project-detail-section project-detail-feature-section"
        aria-labelledby="project-features-title"
      >
        <div className="project-detail-container">
          <span className="project-detail-eyebrow">
            {details.capabilitiesEyebrow || "WHAT WE BUILT"}
          </span>
          <h2 id="project-features-title">
            {details.capabilitiesTitle || "Key product capabilities delivered."}
          </h2>
          <div className="project-detail-features">
            {builtItems.map(([title, description], index) => (
              <article key={title}>
                <span className="project-detail-feature-number">
                  0{index + 1}
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="project-detail-section"
        aria-labelledby="project-scope-title"
      >
        <div className="project-detail-container">
          <span className="project-detail-eyebrow">DELIVERY SCOPE</span>
          <h2 id="project-scope-title">Responsibilities &amp; workflow</h2>
          <ol className="project-detail-scope">
            {scopeItems.map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                <h3>{item}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="project-detail-section project-detail-focus"
        aria-labelledby="project-results-title"
      >
        <div className="project-detail-container">
          <span className="project-detail-eyebrow">
            {details.outcomeEyebrow || "RESULTS & OUTCOME"}
          </span>
          <h2 id="project-results-title">
            {details.outcomeTitle || "Production impact"}
          </h2>
          <p>{details.results || details.focus}</p>
          {hasMetrics && (
            <div className="project-detail-metrics-grid" role="list">
              {details.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="project-detail-metric-card"
                  role="listitem"
                >
                  <strong className="project-detail-metric-value">
                    {metric.value}
                  </strong>
                  <span className="project-detail-metric-label">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {reviewCard ? (
        <section
          className="project-detail-section project-detail-review"
          aria-labelledby="project-review-title"
        >
          <div className="project-detail-container">
            <span
              className="project-detail-eyebrow reviewHeader"
              id="project-review-title"
            >
              WHAT THE CLIENT SAID
            </span>
            <ReviewCard review={reviewCard} variant="case-study" />
          </div>
        </section>
      ) : details.review ? (
        <section
          className="project-detail-section project-detail-review"
          aria-labelledby="project-review-title"
        >
          <div className="project-detail-container">
            <span className="project-detail-eyebrow" id="project-review-title">
              WHAT THE CLIENT SAID
            </span>
            <blockquote className="project-detail-quote">
              {details.review.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <footer>— {project.title}</footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      <section
        className="project-detail-section project-detail-next"
        aria-labelledby="next-project-title"
      >
        <div className="project-detail-container">
          <div>
            <span className="project-detail-eyebrow">NEXT PROJECT</span>
            <h2 id="next-project-title">{next.title}</h2>
            <p>{next.category}</p>
          </div>
          <SiteLink
            href={next.href}
            className="project-detail-next-link"
          >
            Explore Case Study <ArrowUpRight size={20} aria-hidden="true" />
          </SiteLink>
        </div>
      </section>
    </div>
  );
}

export default function ProjectDetails({ slug: pageSlug }) {
  const { slug } = useParams();
  const project = getCaseStudy(pageSlug || slug);
  if (!project) return <NotFound />;
  return <ProjectContent project={project} />;
}
