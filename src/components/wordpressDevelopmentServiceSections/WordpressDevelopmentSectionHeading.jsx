export const WordpressDevelopmentEyebrow = ({ children, badge = false }) => (
  <span className={`wp-dev-eyebrow${badge ? " wp-dev-eyebrow-badge" : ""}`}>
    {children}
  </span>
);

const WordpressDevelopmentSectionHeading = ({
  eyebrow,
  title,
  children,
  id,
}) => (
  <div className="wp-dev-section-heading">
    <WordpressDevelopmentEyebrow>{eyebrow}</WordpressDevelopmentEyebrow>
    <h2 id={id}>{title}</h2>
    {children ? <p>{children}</p> : null}
  </div>
);

export default WordpressDevelopmentSectionHeading;
