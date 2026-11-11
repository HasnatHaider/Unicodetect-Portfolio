import { useState } from 'react';
import { ArrowUpRight, FileText, Play } from 'lucide-react';

function Media({ image, title, provider, priority = false }) {
  const [failed, setFailed] = useState(false);
  if (image && !failed) return <img src={image} alt={title} className="blog-media__image" onError={() => setFailed(true)} loading={priority ? 'eager' : 'lazy'} decoding="async" />;
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
