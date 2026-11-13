import { Parser } from 'htmlparser2';
import { getSocialSource, safeImageUrl } from './socialSource.js';
export { getSocialSource } from './socialSource.js';

export function htmlText(html = '') {
  let text = '';
  let hidden = 0;
  const parser = new Parser({
    onopentag(name) { if (['script','style'].includes(name)) hidden++; },
    ontext(value) { if (!hidden) text += value; },
    onclosetag(name) { if (['script','style'].includes(name)) hidden--; text += ' '; },
  }, { decodeEntities: true });
  parser.end(String(html));
  return text.replace(/\s+/g, ' ').trim();
}

export function findContentSource(content = '') {
  let source = null;
  const parser = new Parser({ onopentag(name, attrs) {
    if (!source && ['a','iframe'].includes(name)) source = getSocialSource(attrs.href || attrs.src);
  }});
  parser.end(String(content));
  if (source) return source;
  for (const value of htmlText(content).match(/https:\/\/[^\s<>"']+/g) || []) {
    source = getSocialSource(value);
    if (source) return source;
  }
  return null;
}

export function getStandaloneSocialUrl(content) {
  let hasMedia = false;
  const parser = new Parser({ onopentag(name) { if (!['p','div','span','a','br','strong','em','u','s'].includes(name)) hasMedia = true; } });
  parser.end(String(content || ''));
  if (hasMedia) return '';
  const text = htmlText(content);
  return /^https:\/\/\S+$/.test(text) ? getSocialSource(text)?.url || '' : '';
}

export function getPostPresentation(blog = {}) {
  const source = getSocialSource(blog.sourceUrl) || (!blog.sourceUrl ? findContentSource(blog.content) : null);
  const saved = blog.sourcePreview || {};
  const preview = source && (!saved.url || getSocialSource(saved.url)?.url === source.url) ? saved : {};
  const text = htmlText(blog.content).replace(/https:\/\/\S+/g, '').trim();
  const title = blog.title?.trim();
  const description = blog.excerpt?.trim() || preview.description || text.slice(0, 180);
  return {
    source,
    title: title && !/^https?:\/\//i.test(title) ? title : preview.title || (source ? `From ${source.provider}` : 'Untitled post'),
    excerpt: description || (source ? `Explore the original ${source.provider === 'YouTube' ? 'video' : 'post'} on ${source.provider}.` : 'Ideas and updates from the UnicodeTech team.'),
    image: safeImageUrl(blog.coverImage) || safeImageUrl(preview.image) || (source?.videoId ? `https://i.ytimg.com/vi/${source.videoId}/hqdefault.jpg` : ''),
    readMinutes: text ? Math.max(1, Math.ceil(text.split(/\s+/).length / 220)) : 0,
  };
}

export function formatBlogDate(value, long = false) {
  const date = value?.toDate ? value.toDate() : value?.seconds ? new Date(value.seconds * 1000) : value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString('en-US', { month: long ? 'long' : 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '';
}
