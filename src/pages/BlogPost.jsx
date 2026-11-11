import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowUpRight, Link as LinkIcon, Check } from 'lucide-react';
import { getBlogBySlug } from '../services/blog.services';
import usePageMetadata from '../hooks/usePageMetadata';
import BlogMedia from '../components/blog/BlogMedia';
import { getPostPresentation, formatBlogDate, sanitizeBlogHtml, getStandaloneSocialUrl } from '../utils/blogContent';
import '../assets/styles/pages/blog.css';

function Share({ title }) {
  const [message, setMessage] = useState('');
  const url = typeof window === 'undefined' ? '' : window.location.href;
  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setMessage('Link copied'); }
    catch { setMessage('Couldn’t copy. Copy the address from your browser.'); }
  }
  return <div className="blog-share">
    <span>Share</span>
    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-6.6L6.1 22H3l7.5-8.6L.8 2h6.5l4.5 6L18.9 2ZM17.8 20h1.7L6.3 4H4.5l13.3 16Z" /></svg></a>
    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3V9Zm6 0h4v1.6c.7-1.1 1.8-1.9 3.7-1.9 3.9 0 4.3 2.6 4.3 5.9V21h-4v-5.6c0-1.4 0-3-1.9-3s-2.1 1.5-2.1 2.9V21H9V9Z" /></svg></a>
    <button type="button" onClick={copyLink} aria-label="Copy post link">{message === 'Link copied' ? <Check size={15} /> : <LinkIcon size={15} />}</button>
    <span className="blog-share__status" role="status">{message}</span>
  </div>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [result, setResult] = useState({slug:'',blog:null,state:'loading'});
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const blog = await getBlogBySlug(slug);
        if (active) setResult({slug,retry,blog:blog?.status === 'published' ? blog : null,state:blog?.status === 'published' ? 'ready' : 'missing'});
      } catch { if (active) setResult({slug,retry,blog:null,state:'error'}); }
    }
    load();
    return () => { active = false; };
  }, [slug,retry]);
  const isCurrent = result.slug === slug && result.retry === retry;
  const blog = isCurrent ? result.blog : null;
  const state = isCurrent ? result.state : 'loading';
  const post = useMemo(() => getPostPresentation(blog || {}), [blog]);
  const html = useMemo(() => sanitizeBlogHtml(blog?.content || ''), [blog?.content]);
  usePageMetadata({ title:blog ? `${blog.metaTitle || post.title} | UnicodeTech Blog` : 'Blog | UnicodeTech', description:blog?.metaDescription || (blog ? post.excerpt : ''), ...(post.image ? {ogImage:post.image} : {}) });
  if (state === 'loading') return <div className="blog-post-loading" role="status" aria-label="Loading post"><div className="blog-skeleton blog-skeleton--hero" /></div>;
  if (state !== 'ready') return <div className="blog-not-found"><h1>{state === 'error' ? 'We couldn’t load this post.' : 'Post not found'}</h1><p>{state === 'error' ? 'Please check your connection and try again.' : 'This post may have moved or is no longer available.'}</p>{state === 'error' && <button type="button" onClick={() => setRetry(value => value+1)}>Try again</button>}<Link to="/blog" className="blog-back-link"><ArrowLeft size={15} /> Back to Blog</Link></div>;
  const date = formatBlogDate(blog.createdAt,true);
  const showBody = !getStandaloneSocialUrl(blog.content);
  const embedded = html.includes('youtube-nocookie.com/embed/');
  return <div className="blog-post">
    <div className="blog-post__top">
      <Link to="/blog" className="blog-back-link"><ArrowLeft size={16} /> All Posts</Link>
      <div className="blog-post__cover"><BlogMedia image={post.image} title={post.title} provider={post.source?.provider} priority /></div>
    </div>
    <article className="blog-post__article">
      <header className="blog-post__header">
        {blog.category?.name && <span className="blog-card__cat"><span className="blog-category-dot" />{blog.category.name}</span>}
        <h1 className="blog-post__title">{post.title}</h1>
        <div className="blog-post__meta">{date && <span><Calendar size={14} />{date}</span>}{post.readMinutes > 0 && <span>{post.readMinutes} min read</span>}
          {blog.tags?.length > 0 && <div className="blog-post__tags">{blog.tags.map(tag => <span className="blog-post__tag" key={tag}>{tag}</span>)}</div>}
        </div>
      </header>
      {post.source && <section className="blog-source" aria-label={`${post.source.provider} post`}>
        {post.source.videoId && !embedded && <iframe className="blog-source__video" src={`https://www.youtube-nocookie.com/embed/${post.source.videoId}`} title={post.title} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />}
        <div className="blog-source__details"><div><span className="blog-source__provider">From {post.source.provider}</span><p>{post.excerpt}</p></div><a href={post.source.url} target="_blank" rel="noopener noreferrer">{post.source.provider === 'YouTube' ? 'Watch on YouTube' : `View on ${post.source.provider}`}<ArrowUpRight size={16} /></a></div>
      </section>}
      {showBody && <div className="blog-post__content" dangerouslySetInnerHTML={{__html:html}} />}
      <footer className="blog-post__foot"><Link to="/blog" className="blog-back-link"><ArrowLeft size={15} /> Back to all posts</Link><Share key={slug} title={post.title} /></footer>
    </article>
  </div>;
}
