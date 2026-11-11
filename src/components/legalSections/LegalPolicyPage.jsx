import { FileText, ShieldCheck } from "lucide-react";
import usePageMetadata from "../../hooks/usePageMetadata";
import { SiteLink } from "../sharedUi/Interactive";
import { paths } from "../../routes/paths";
import "../../assets/styles/pages/legalPolicies.css";
import PageBreadcrumb from "../sharedUi/PageBreadcrumb";

const PolicyBlock = ({ node }) => {
  if (typeof node === "string") return node;
  const children = node.children.map((child, index) => (
    <PolicyBlock node={child} key={index} />
  ));
  if (node.tag === "a") {
    const href = /^https?:\/\/(www\.)?unicodetech\.com\/?$/.test(node.href)
      ? "/"
      : node.href;
    return <SiteLink href={href}>{children}</SiteLink>;
  }
  if (node.tag === "br") return <br />;
  const Tag = node.tag;
  return <Tag>{children}</Tag>;
};

const legalDescriptions = {
  privacy: "Read UnicodeTech's Privacy Policy to understand how we collect, use, and protect your personal data.",
  terms: "Review UnicodeTech's Terms and Conditions for using our website and engaging our software development services.",
};

export default function LegalPolicyPage({ policy, type }) {
  usePageMetadata({
    title: `${policy.title} | UnicodeTech`,
    description: legalDescriptions[type] ?? "",
    bodyClass: "site site-design legal-page-body",
  });
  const Icon = type === "privacy" ? ShieldCheck : FileText;
  return (
    <div className="page-content legal-page">
      <section
        className="legal-hero service-hero-theme"
        aria-labelledby="legal-title"
      >
        <div className="legal-container">
          <PageBreadcrumb />
          <span className="legal-eyebrow">
            <Icon size={18} aria-hidden="true" /> LEGAL INFORMATION
          </span>
          <h1 id="legal-title" className="service-hero-title">
            {policy.title}
          </h1>
          <p className="service-hero-description">
            {type === "privacy"
              ? "How we collect, use, and protect your information when you use UnicodeTech’s website and services."
              : "The terms that apply when you use UnicodeTech’s website and related services."}
          </p>
          <p className="legal-updated">
            Last updated: <time dateTime="2024-12-06">{policy.updated}</time>
          </p>
        </div>
      </section>
      <div className="legal-content legal-container">
        <aside className="legal-sidebar">
          <details className="legal-contents" open>
            <summary>On this page</summary>
            <nav aria-label={`${policy.title} contents`}>
              <ol>
                {policy.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </details>
          <SiteLink
            className="legal-related"
            href={
              type === "privacy"
                ? paths.termsAndConditions
                : paths.privacyPolicy
            }
          >
            {type === "privacy" ? "Terms & Conditions" : "Privacy Policy"}
          </SiteLink>
        </aside>
        <article className="legal-document" aria-label={policy.title}>
          {policy.sections.map((section) => (
            <section
              id={section.id}
              className="legal-section"
              key={section.id}
              aria-labelledby={`${section.id}-title`}
            >
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              {section.blocks.map((block, index) => (
                <PolicyBlock node={block} key={index} />
              ))}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
