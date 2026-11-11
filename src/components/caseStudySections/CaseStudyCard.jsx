import ResponsiveImage from "../sharedUi/ResponsiveImage";
import { ArrowUpRight, Workflow } from "lucide-react";
import { IMAGES } from "../../utils/Constant";
import { SiteLink } from "../sharedUi/Interactive";
import { paths } from "../../routes/paths";

export default function CaseStudyCard({ project }) {
  return (
    <article className="portfolio-project" id={`project-${project.slug}`}>
      <div className="portfolio-project-content">
        <span className="portfolio-category">{project.category}</span>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <ul
          className="portfolio-stack"
          aria-label={`${project.title} platforms and technologies`}
        >
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <SiteLink
          className="portfolio-project-link"
          href={project.href || `${paths.contact}#project-inquiry`}
          aria-label={
            project.href
              ? `View ${project.title} case study`
              : `Discuss ${project.title}`
          }
        >
          {project.href ? "View Case Study" : "Discuss This Project"}{" "}
          <ArrowUpRight size={18} aria-hidden="true" />
        </SiteLink>
      </div>
      <div className="portfolio-project-image">
        {project.imageKey ? (
          <ResponsiveImage
            src={IMAGES[project.imageKey]}
            alt={`${project.title} project artwork`}
            width="1024"
            height="576"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className={`portfolio-project-identity portfolio-project-identity--${project.slug}`}
          >
            <Workflow size={64} strokeWidth={1} aria-hidden="true" />
            <span className="portfolio-identity-name">{project.title}</span>
            <span className="portfolio-identity-platforms">
              {project.category}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
