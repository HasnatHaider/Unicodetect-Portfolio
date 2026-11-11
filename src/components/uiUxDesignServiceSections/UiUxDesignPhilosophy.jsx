import UiUxSectionHeading from "./UiUxSectionHeading";

const outcomes = [
  ["Fewer", "Support Requests", "Clearer navigation helps users find what they need faster"],
  ["Faster", "Time to Value", "Streamlined flows, faster outcomes"],
  [
    "Stronger",
    "Product Adoption",
    "Intuitive experiences that keep users engaged",
  ],
];

const UiUxDesignPhilosophy = () => (
  <section
    className="uiux-section uiux-philosophy uiux-warm"
    aria-labelledby="uiux-philosophy-title"
  >
    <div className="uiux-container">
      <UiUxSectionHeading
        eyebrow="OUR DESIGN PHILOSOPHY"
        id="uiux-philosophy-title"
      >
        How we turn complex systems
        <br className="uiux-desktop-break" /> into intuitive experiences.
      </UiUxSectionHeading>
      <div className="uiux-philosophy-copy">
        <p>
          Our human-centric approach merges behavioral research with rigorous
          visual design. By understanding your user’s friction points and
          business objectives, we deliver designs that foster engagement, reduce
          support loads, and significantly increase conversion.
        </p>
        <p>
          Whether building a complex SaaS platform, an iOS native application,
          or a high-velocity marketing storefront, we ground every decision in
          data-driven behavioral research.
        </p>
      </div>
      <div className="uiux-outcomes uiux-dark">
        {outcomes.map(([value, label, note]) => (
          <div key={value}>
            <strong>{value}</strong>
            <h3>{label}</h3>
            <p>{note}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UiUxDesignPhilosophy;
