export const ApiSystemsIntegrationEyebrow = ({
  children,
  variant = "light",
}) => (
  <span
    className={`api-integration-eyebrow api-integration-eyebrow-${variant}`}
  >
    {children}
  </span>
);

const ApiSystemsIntegrationSectionHeading = ({
  eyebrow,
  title,
  children,
  id,
  variant,
}) => (
  <div className="api-integration-section-heading">
    <ApiSystemsIntegrationEyebrow variant={variant}>
      {eyebrow}
    </ApiSystemsIntegrationEyebrow>
    <h2 id={id}>{title}</h2>
    {children ? <p>{children}</p> : null}
  </div>
);

export default ApiSystemsIntegrationSectionHeading;
