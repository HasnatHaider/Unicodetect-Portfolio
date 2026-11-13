import { useState } from 'react';
import { ArrowUpRight, FileText, Play } from 'lucide-react';

const UNSPLASH = /^https:\/\/images\.unsplash\.com\//;
const WIDTHS = [480, 800, 1200];

// Posts often use raw Unsplash links, which serve the multi-MB original.
// Unsplash resizes and re-encodes on request, so ask it for screen-sized files.
function unsplashAt(url, width) {
  const resized = new URL(url);
  resized.searchParams.set('w', String(width));
  resized.searchParams.set('q', '70');
  resized.searchParams.set('auto', 'format');
  resized.searchParams.set('fit', 'max');
  return resized.toString();
}

function responsiveSource(image) {
  if (!UNSPLASH.test(image)) return { src: image };
  try {
    return {
      src: unsplashAt(image, 800),
      srcSet: WIDTHS.map((width) => `${unsplashAt(image, width)} ${width}w`).join(', '),
    };
  } catch {
    return { src: image };
  }
}

function Media({ image, title, provider, priority = false, sizes = '(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 400px' }) {
  const [failed, setFailed] = useState(false);
  if (image && !failed) return <img {...responsiveSource(image)} sizes={UNSPLASH.test(image) ? sizes : undefined} alt={title} className="blog-media__image" onError={() => setFailed(true)} loading={priority ? 'eager' : 'lazy'} decoding="async" />;
  const Icon = provider === 'YouTube' ? Play : provider ? ArrowUpRight : FileText;
  return <div className="blog-media__fallback">
    <span className="blog-media__wordmark">Unicode<span>Tech</span></span>
    <Icon size={38} strokeWidth={1.3} aria-hidden="true" />
    <span className="blog-media__label">{provider ? `On ${provider}` : 'Ideas worth sharing'}</span>
  </div>;
}

export default function BlogMedia(props) {
  return <Media key={props.image || 'fallback'} {...props} />;
}
