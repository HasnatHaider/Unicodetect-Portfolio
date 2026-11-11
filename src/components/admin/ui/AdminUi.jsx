import { useEffect, useId } from "react";
import { X, Search, Check } from "lucide-react";

export const AdminPageHeader = ({
  eyebrow,
  title,
  subtitle,
  badge,
  backButton,
  actions,
}) => (
  <header className="admin-page-header-wrap">
    {backButton && <div className="admin-page-back-row">{backButton}</div>}
    <div className="admin-page-head">
      <div className="admin-page-head__left">
        {eyebrow && <p className="admin-eyebrow">{eyebrow}</p>}
        <h1 className="admin-page-title">{title}</h1>
        {subtitle && <p className="admin-page-sub">{subtitle}</p>}
        {badge && <div className="admin-page-head__badge">{badge}</div>}
      </div>
      {actions && <div className="admin-page-head__actions">{actions}</div>}
    </div>
  </header>
);

export const AdminButton = ({
  as: Component = "button",
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  className = "",
  disabled,
  type = "button",
  ...props
}) => {
  const classes = [
    "admin-btn",
    `admin-btn--${variant}`,
    size === "sm" ? "admin-btn--sm" : "",
    loading ? "admin-spinner-btn" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const componentProps =
    Component === "button"
      ? { type, disabled: disabled || loading, ...props }
      : props;

  return (
    <Component className={classes} {...componentProps}>
      {loading ? (
        <span className="admin-login__spinner" aria-hidden="true" />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </Component>
  );
};

export const AdminIconButton = ({
  as: Component = "button",
  tone = "default",
  loading = false,
  label,
  children,
  className = "",
  disabled,
  type = "button",
  ...props
}) => {
  const classes = [
    "admin-icon-btn",
    tone !== "default" ? `admin-icon-btn--${tone}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const componentProps =
    Component === "button"
      ? { type, disabled: disabled || loading, ...props }
      : props;

  return (
    <Component
      className={classes}
      aria-label={label}
      title={label}
      {...componentProps}
    >
      {loading ? (
        <span
          className="admin-login__spinner admin-login__spinner--brand"
          aria-hidden="true"
        />
      ) : (
        children
      )}
    </Component>
  );
};

export const AdminCard = ({
  as: Component = "section",
  title,
  note,
  badge,
  accentBar = false,
  actions,
  bodyClassName = "",
  className = "",
  children,
  ...props
}) => {
  const hasHeader = Boolean(title || note || badge || actions);
  return (
    <Component
      className={["admin-card", className].filter(Boolean).join(" ")}
      {...props}
    >
      {hasHeader && (
        <div className="admin-card__head">
          <div className="admin-card__head-left">
            {title && (
              <h2
                className={
                  "admin-card__title" +
                  (accentBar ? " admin-card__title--accent" : "")
                }
              >
                {title}
              </h2>
            )}
          </div>
          <div className="admin-card__head-right">
            {note && <span className="admin-card__note">{note}</span>}
            {badge && <span className="admin-card__badge">{badge}</span>}
            {actions}
          </div>
        </div>
      )}
      <div
        className={["admin-card__body", bodyClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </Component>
  );
};

export const AdminStatCard = ({
  icon,
  value,
  label,
  flag,
  quiet = false,
  tone = "brand",
}) => (
  <article
    className={[
      "admin-stat",
      quiet ? "admin-stat--quiet" : "",
      tone ? `admin-stat--${tone}` : "",
    ]
      .filter(Boolean)
      .join(" ")}
  >
    <span className="admin-stat__chip" aria-hidden="true">
      {icon}
    </span>
    {flag && <span className="admin-stat__flag">{flag}</span>}
    <span className="admin-stat__num">{value}</span>
    <span className="admin-stat__label">{label}</span>
  </article>
);

export const AdminBadge = ({
  variant = "draft",
  icon,
  dot = false,
  children,
  className = "",
}) => (
  <span
    className={["admin-badge", `admin-badge--${variant}`, className]
      .filter(Boolean)
      .join(" ")}
  >
    {dot && <span className="admin-badge__dot" aria-hidden="true" />}
    {icon}
    {children}
  </span>
);

export const AdminToolbar = ({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search…",
  searchAriaLabel,
  tabs = [],
  activeTab = "",
  onTabChange,
  tabAriaLabel = "Filter items",
  children,
}) => (
  <div className="admin-filter-bar">
    {onSearchChange && (
      <label className="admin-filter-search">
        <Search size={15} className="admin-filter-search__icon" />
        <input
          type="search"
          className="admin-filter-search__input"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchAriaLabel || searchPlaceholder}
        />
        {searchValue && (
          <button
            type="button"
            className="admin-filter-search__clear"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </label>
    )}
    {tabs.length > 0 && (
      <div className="admin-filter-tabs" role="tablist" aria-label={tabAriaLabel}>
        {tabs.map((t) => {
          const isActive = activeTab === t.value;
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={
                "admin-filter-tab" +
                (isActive ? " admin-filter-tab--active" : "")
              }
              onClick={() => onTabChange?.(t.value)}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    )}
    {children}
  </div>
);

export const AdminTable = ({
  title,
  note,
  badge,
  accentBar = false,
  columns = [],
  stackOnMobile = false,
  children,
  footer,
}) => (
  <section className="admin-table-wrap">
    {(title || note || badge) && (
      <div className="admin-table-wrap__header">
        <h2
          className={
            "admin-table-wrap__title" +
            (accentBar ? " admin-table-wrap__title--accent" : "")
          }
        >
          {title}
        </h2>
        <div className="admin-table-wrap__meta">
          {note && <span className="admin-card__note">{note}</span>}
          {badge && <span className="admin-card__badge">{badge}</span>}
        </div>
      </div>
    )}
    <div className="admin-table-scroll">
      <table
        className={
          "admin-table" + (stackOnMobile ? " admin-table--stack" : "")
        }
      >
        <thead>
          <tr>
            {columns.map((col) => {
              const key = typeof col === "string" ? col : col.key || col.label;
              const label = typeof col === "string" ? col : col.label;
              const align = typeof col === "object" ? col.align : undefined;
              return (
                <th
                  key={key}
                  style={align ? { textAlign: align } : undefined}
                >
                  {label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
    {footer && <div className="admin-table-wrap__footer">{footer}</div>}
  </section>
);

export const AdminField = ({
  label,
  htmlFor,
  required = false,
  hint,
  charCount,
  error,
  prefix,
  className = "",
  children,
}) => (
  <div className={["admin-form-field", className].filter(Boolean).join(" ")}>
    {label && (
      <label className="admin-form-label" htmlFor={htmlFor}>
        {label}{" "}
        {required && (
          <span className="admin-form-label__req" aria-hidden="true">
            *
          </span>
        )}
        {hint && <span className="admin-form-label__hint"> {hint}</span>}
      </label>
    )}
    {prefix ? (
      <div className="admin-editor__slug-wrap">
        <span className="admin-editor__slug-prefix">{prefix}</span>
        {children}
      </div>
    ) : (
      children
    )}
    {charCount && <span className="aed__char-count">{charCount}</span>}
    {error && (
      <p className="admin-field-error" role="alert">
        {error}
      </p>
    )}
  </div>
);

export const AdminModal = ({
  open,
  onClose,
  title,
  subtitle,
  size = "md",
  ariaLabel,
  children,
  actions,
}) => {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="admin-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title}
      aria-labelledby={title ? titleId : undefined}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className={
          "admin-modal" + (size === "sm" ? " admin-modal--sm" : "")
        }
      >
        <div className="admin-modal__head">
          <h2 id={titleId} className="admin-modal__title">
            {title}
          </h2>
          {onClose && (
            <button
              type="button"
              className="admin-modal__close"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {subtitle && <p className="admin-modal__sub">{subtitle}</p>}
        <div className="admin-modal__body">{children}</div>
        {actions && <div className="admin-modal__actions">{actions}</div>}
      </div>
    </div>
  );
};

export const AdminStateBlock = ({
  variant = "empty",
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  if (variant === "loading") {
    return (
      <div className="admin-loading" role="status">
        <span
          className="admin-chart-loader__spinner"
          aria-hidden="true"
          style={{ marginBottom: 10 }}
        />
        <div>{title || "Loading…"}</div>
      </div>
    );
  }

  return (
    <div
      className={
        "admin-empty" +
        (variant === "error" ? " admin-empty--error" : "")
      }
      role={variant === "error" ? "alert" : undefined}
    >
      {icon && <div className="admin-empty__icon">{icon}</div>}
      {title && <h2 className="admin-empty__title">{title}</h2>}
      {description && <p className="admin-empty__desc">{description}</p>}
      {actionLabel && onAction && (
        <AdminButton
          variant={variant === "error" ? "ghost" : "primary"}
          onClick={onAction}
        >
          {actionLabel}
        </AdminButton>
      )}
    </div>
  );
};

export const AdminToast = ({ message, onDismiss }) => {
  useEffect(() => {
    if (!message || !onDismiss) return;
    const timer = setTimeout(onDismiss, 2800);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="admin-toast admin-toast--visible" role="status" aria-live="polite">
      <Check size={15} className="admin-toast__icon" />
      <span>{message}</span>
    </div>
  );
};
