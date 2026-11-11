import UiUxSectionHeading from "./UiUxSectionHeading";

const deliverables = [
  "Fully responsive, production-ready Figma architectures",
  "Interactive design tokens integrated directly with Git",
  "WCAG 2.1 AA accessibility checklists",
  "High-fidelity interactive prototype flows for stakeholders",
  "Coded UI library reference models (CSS/Tailwind)",
  "Post-handoff support for your engineering team",
];

const UiUxDeliverables = () => (
  <section
    className="uiux-section uiux-deliverables"
    aria-labelledby="uiux-deliverables-title"
  >
    <div className="uiux-container uiux-two-grid">
      <div>
        <UiUxSectionHeading eyebrow="THE HANDOFF" id="uiux-deliverables-title">
          Assets engineered for developer synergy.
        </UiUxSectionHeading>
        <p>
          We don’t just dump raw Figma files. We export interactive design
          tokens, code-mapped component guidelines, and exhaustive responsive
          spec outlines.
        </p>
      </div>
      <ul>
        {deliverables.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default UiUxDeliverables;
