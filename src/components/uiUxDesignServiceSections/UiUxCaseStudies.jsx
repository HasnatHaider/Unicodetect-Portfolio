import ResponsiveImage from "../sharedUi/ResponsiveImage";
import { paths } from "../../routes/paths";
import { ArrowRight } from "lucide-react";
import { caseStudyProjects } from "../../utils/caseStudies";
import { IMAGES } from "../../utils/Constant";
import { SiteLink } from "../sharedUi/Interactive";
import UiUxSectionHeading from "./UiUxSectionHeading";

const stories = caseStudyProjects
  .filter((project) =>
    ["contractor-connect", "task-hive"].includes(project.slug),
  )
  .map((project) => ({
    category: project.category,
    title: project.title,
    description: project.description,
    link: `Read ${project.title} Story`,
    href: project.href,
    image: IMAGES[project.imageKey],
    alt: `${project.title} mobile app interfaces`,
  }));

const UiUxCaseStudies = () => (
  <section
    id="uiux-case-studies"
    className="uiux-section uiux-case-studies"
    aria-labelledby="uiux-case-studies-title"
  >
    <div className="uiux-container">
      <div className="uiux-heading-row">
        <UiUxSectionHeading
          eyebrow="FEATURED OUTCOMES"
          id="uiux-case-studies-title"
        >
          Outcomes that validate our process
        </UiUxSectionHeading>
        <SiteLink className="uiux-text-link" href={paths.caseStudies}>
          View All Case Studies{" "}
          <span aria-hidden="true">
            <ArrowRight size={"1em"} aria-hidden="true" />
          </span>
        </SiteLink>
      </div>
      <div className="uiux-two-grid">
        {stories.map(
          ({ category, title, description, link, href, image, alt }) => (
            <article className="uiux-story" key={title}>
              <ResponsiveImage
                src={image}
                alt={alt}
                width="604"
                height="300"
                loading="lazy"
              />
              <div className="uiux-story-copy">
                <span className="uiux-tag">{category}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <SiteLink className="uiux-text-link" href={href}>
                  {link}{" "}
                  <span aria-hidden="true">
                    <ArrowRight size={"1em"} aria-hidden="true" />
                  </span>
                </SiteLink>
              </div>
            </article>
          ),
        )}
      </div>
    </div>
  </section>
);

export default UiUxCaseStudies;
