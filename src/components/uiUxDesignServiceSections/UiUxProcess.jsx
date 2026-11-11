import UiUxSectionHeading from "./UiUxSectionHeading";

const steps = [
  [
    "Discover & Define",
    "Deep dive into analytical frameworks, user behavior metrics, and target competitor analysis.",
  ],
  [
    "Structure & Flow",
    "Constructing interactive wireframes and structural blueprints to map explicit, high-friction paths.",
  ],
  [
    "Iterative Design",
    "Translating wireframes into beautiful high-fidelity interfaces wrapped with consistent style tokens.",
  ],
  ["Validate & Deliver", "User testing, stakeholder sign-off and a developer-ready handoff with specs and tokens."],
];

const UiUxProcess = () => (
  <section
    className="uiux-section uiux-process"
    aria-labelledby="uiux-process-title"
  >
    <div className="uiux-container">
      <UiUxSectionHeading eyebrow="THE METHOD" id="uiux-process-title">
        Our strategic design roadmap
      </UiUxSectionHeading>
      <ol className="uiux-four-grid uiux-steps">
        {steps.map(([title, description], index) => (
          <li key={title}>
            <span className="uiux-step-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
      <p className="uiux-process-note">
        Each phase includes client check-ins, design demos, and direct
        coordination with your engineering team.
      </p>
    </div>
  </section>
);

export default UiUxProcess;
