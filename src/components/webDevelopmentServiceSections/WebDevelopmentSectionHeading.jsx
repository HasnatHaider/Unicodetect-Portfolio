export const WebDevelopmentEyebrow = ({ children, badge = false }) => (
  <span className={`web-dev-eyebrow${badge ? " web-dev-eyebrow-badge" : ""}`}>
    {children}
  </span>
);

const WebDevelopmentSectionHeading = ({ eyebrow, title, children, id }) => (
  <div className="web-dev-section-heading">
    <WebDevelopmentEyebrow>{eyebrow}</WebDevelopmentEyebrow>
    <h2 id={id}>{title}</h2>
    {children ? <p>{children}</p> : null}
  </div>
);

export default WebDevelopmentSectionHeading;
