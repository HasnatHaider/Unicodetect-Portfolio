import { responsiveImages } from "../../utils/responsiveImages";

export default function ResponsiveImage({ src, srcSet, sizes = "(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 800px", ...props }) {
  const variants = srcSet ?? responsiveImages[src];
  return <img {...props} src={src} srcSet={variants} sizes={variants ? sizes : undefined} />;
}
