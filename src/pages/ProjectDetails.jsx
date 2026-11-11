import ResponsiveImage from "../components/sharedUi/ResponsiveImage";
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, Workflow } from "lucide-react";
import usePageMetadata from "../hooks/usePageMetadata";
import { caseStudyProjects } from "../utils/caseStudies";
import PageBreadcrumb from "../components/sharedUi/PageBreadcrumb";
import { projectDetails } from "../utils/projectDetails";
import { IMAGES } from "../utils/Constant";
import { paths } from "../routes/paths";
import { SiteLink } from "../components/sharedUi/Interactive";
import NotFound from "./NotFound";
import "../assets/styles/pages/projectDetails.css";

function ProjectArtwork({ project }) {
  const artworkKey = project.heroMockupKey ?? project.imageKey;
  return artworkKey ? (
    <ResponsiveImage
      src={IMAGES[artworkKey]}
      width="1024"
      height="576"
      alt={`${project.title} project artwork`}
      fetchPriority="high"
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

function ProjectContent({ project, details }) {
  usePageMetadata({
    title: `${project.title} Case Study | UnicodeTech`,
    description: project.description,
    bodyClass: "site site-design project-detail-page-body",
  });
  const next =
    caseStudyProjects[
      (caseStudyProjects.indexOf(project) + 1) % caseStudyProjects.length
    ];
  const builtItems = details.built || details.features || [];
  const scopeItems = details.services || details.workflow || [];
  const hasMetrics = Array.isArray(details.metrics) && details.metrics.length > 0;

  return (
    <div className="page-content project-detail-page">
      <section
        className="project-detail-hero service-hero-theme"
        aria-labelledby="project-detail-title"
        style={{
          ...(project.heroBgKey
            ? { "--image-caseStudiesHeroBg": `url(${IMAGES[project.heroBgKey]})` }
            : {}),
          ...(project.darkHero
            ? {
                "--service-hero-heading-color": "#fff",
                "--service-hero-description-color": "#b8c2cd",
              }
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
              <h1 id="project-detail-title" className="service-hero-title">
                {project.title}
              </h1>
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
          <span className="project-detail-eyebrow">WHAT WE BUILT</span>
          <h2 id="project-features-title">Key product capabilities delivered.</h2>
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
          <span className="project-detail-eyebrow">RESULTS &amp; OUTCOME</span>
          <h2 id="project-results-title">Production impact</h2>
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

      {details.review && (
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
      )}

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
            href={`/case-studies/${next.slug}`}
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
  const project = caseStudyProjects.find(
    (item) => item.slug === (pageSlug || slug),
  );
  if (!project || !projectDetails[project.slug]) return <NotFound />;
  return (
    <ProjectContent project={project} details={projectDetails[project.slug]} />
  );
}
