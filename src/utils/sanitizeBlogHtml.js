// Separate from blogContent.js: sanitize-html is large, and only the post page
// renders stored HTML, so the blog list should not download it.
import sanitizeHtml from 'sanitize-html';
import { getSocialSource, safeImageUrl } from './socialSource.js';

export function sanitizeBlogHtml(content = '') {
  return sanitizeHtml(content, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'iframe', 's', 'u'],
    allowedAttributes: {
      a: ['href','title','target','rel'], img: ['src','alt','title','width','height','loading'],
      iframe: ['src','title','allow','allowfullscreen','loading'],
      '*': ['style'], td: ['colspan','rowspan'], th: ['colspan','rowspan'],
    },
    allowedSchemes: ['https','mailto','tel'], allowProtocolRelative: false,
    allowedStyles: { '*': { 'text-align': [/^(left|right|center|justify)$/], color: [/^#[0-9a-fA-F]{3,8}$/,/^rgb\([\d\s,]+\)$/] } },
    transformTags: {
      a: (_tag, attrs) => ({ tagName: 'a', attribs: { ...attrs, rel: 'noopener noreferrer', ...(attrs.target ? {target:'_blank'} : {}) } }),
      img: (_tag, attrs) => ({ tagName:'img', attribs:{...attrs, src:safeImageUrl(attrs.src), loading:'lazy'} }),
      iframe: (_tag, attrs) => {
        const source = getSocialSource(attrs.src);
        return { tagName:'iframe', attribs: source?.videoId ? {
          src:`https://www.youtube-nocookie.com/embed/${source.videoId}`, title:'YouTube video',
          allow:'encrypted-media; picture-in-picture; fullscreen', allowfullscreen:'', loading:'lazy',
        } : {} };
      },
    },
    exclusiveFilter: (frame) => ['iframe','img'].includes(frame.tag) && !frame.attribs.src,
  });
}
