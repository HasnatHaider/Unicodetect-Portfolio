import { clientLogos } from "../../utils/clientLogos";
import "../../assets/styles/components/clientLogo.css";

const ClientLogo = ({
  id,
  size = 40,
  variant = "tile",
  initials,
  decorative = false,
  className = "",
}) => {
  const logo = clientLogos[id];
  const classes = `client-logo client-logo--${variant} ${className}`.trim();

  if (!logo) {
    const fallback = initials || "";
    if (!fallback) return null;
    return (
      <span
        className={`${classes} client-logo--initials`}
        style={{ width: size, height: size }}
        aria-hidden={decorative ? "true" : undefined}
      >
        {fallback}
      </span>
    );
  }

  const ratio = logo.width / logo.height;
  const padding = variant === "tile" ? Math.round(size * 0.14) : 0;
  const box = size - padding * 2;
  const isWide = Boolean(logo.wide);

  let imgWidth;
  let imgHeight;
  if (isWide) {
    imgHeight = Math.round(box * (variant === "tile" ? 0.62 : 1));
    imgWidth = Math.round(imgHeight * ratio);
  } else if (variant === "plain") {
    imgHeight = box;
    imgWidth = Math.round(box * ratio);
  } else if (ratio >= 1) {
    imgWidth = box;
    imgHeight = Math.round(box / ratio);
  } else {
    imgHeight = box;
    imgWidth = Math.round(box * ratio);
  }

  const tileWidth = isWide ? imgWidth + padding * 2 : size;
  const style =
    variant === "tile"
      ? { width: tileWidth, height: size, borderRadius: Math.round(size * 0.24) }
      : { width: imgWidth, height: imgHeight };

  return (
    <span className={classes} style={style}>
      <img
        src={logo.src}
        width={imgWidth}
        height={imgHeight}
        alt={decorative ? "" : logo.alt}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
};

export default ClientLogo;
