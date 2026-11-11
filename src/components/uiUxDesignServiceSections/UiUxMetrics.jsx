const metrics = [
  ["WCAG 2.1 AA", "Accessibility Standard", "Every deliverable meets AA compliance"],
  [
    "Production-ready",
    "Design Handoff",
    "Developer-annotated specs and assets",
  ],
  ["Full coverage", "Responsive Design", "Mobile, tablet, and desktop layouts"],
  ["Documented", "Design System", "Components, tokens, and usage guidelines"],
];

const UiUxMetrics = () => (
  <section
    className="uiux-section uiux-metrics uiux-dark"
    aria-labelledby="uiux-metrics-title"
  >
    <div className="uiux-container">
      <span className="uiux-plain-eyebrow">BUSINESS IMPACT BY THE NUMBERS</span>
      <h2 id="uiux-metrics-title">Measurable, bottom-line results</h2>
      <div className="uiux-metric-grid">
        {metrics.map(([value, label, note]) => (
          <div key={label}>
            <strong>{value}</strong>
            <h3>{label}</h3>
            <p>{note}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UiUxMetrics;
