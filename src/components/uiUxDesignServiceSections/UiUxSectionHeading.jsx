export const UiUxEyebrow = ({ children }) => (
  <span className="uiux-eyebrow">{children}</span>
);

const UiUxSectionHeading = ({ eyebrow, children, id }) => (
  <div className="uiux-section-heading">
    <UiUxEyebrow>{eyebrow}</UiUxEyebrow>
    <h2 id={id}>{children}</h2>
  </div>
);

export default UiUxSectionHeading;
