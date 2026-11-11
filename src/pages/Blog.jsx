import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search, X } from 'lucide-react';
import { getBlogsWithPagination } from '../services/blog.services';
import { searchCategoriesWithPagination } from '../services/category.services';
import CustomSearchSelectorWithPagination from '../components/admin/CustomSearchSelectorWithPagination';
import BlogMedia from '../components/blog/BlogMedia';
import { getPostPresentation, formatBlogDate } from '../utils/blogContent';
import usePageMetadata from '../hooks/usePageMetadata';
import '../assets/styles/pages/blog.css';

export default function Blog() {
  usePageMetadata({ title: 'Blog | UnicodeTech', description: 'Insights, tutorials and updates from the UnicodeTech team.' });
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const cursor = useRef(null);
  const version = useRef(0);
  const loadingPage = useRef(false);
  const categoryKey = category?.searchKey || '';

  useEffect(() => {
    let active = true;
    const current = ++version.current;
    setLoading(true); setError(''); setLoadingMore(false); loadingPage.current = false;
    cursor.current = null;
    const timer = setTimeout(async () => {
      try {
        const result = await getBlogsWithPagination({ status: 'published', search, categorySearchKey: categoryKey });
        if (!active || current !== version.current) return;
        setBlogs(result.blogs); setHasMore(result.hasMore); cursor.current = result.lastDoc;
      } catch {
        if (active && current === version.current) { setBlogs([]); setHasMore(false); setError('We couldn’t load the posts. Please try again.'); }
      } finally { if (active && current === version.current) setLoading(false); }
    }, search ? 300 : 0);
    return () => { active = false; clearTimeout(timer); };
  }, [search, categoryKey, retry]);

  async function loadMore() {
    if (loadingPage.current || loading || !hasMore) return;
    loadingPage.current = true; setLoadingMore(true); setError('');
    const current = version.current;
    try {
      const result = await getBlogsWithPagination({ status: 'published', search, categorySearchKey: categoryKey, lastDoc: cursor.current });
      if (current !== version.current) return;
      setBlogs(previous => [...previous, ...result.blogs.filter(item => !previous.some(post => post.id === item.id))]);
      setHasMore(result.hasMore); cursor.current = result.lastDoc;
    } catch { if (current === version.current) setError('We couldn’t load more posts. Please try again.'); }
    finally { if (current === version.current) { setLoadingMore(false); loadingPage.current = false; } }
  }

  const fetchCategories = useCallback(async (query, lastDoc) => {
    const result = await searchCategoriesWithPagination(query, lastDoc);
    return { items: result.categories, hasMore: result.hasMore, lastDoc: result.lastDoc };
  }, []);
  function changeSearch(value) { if (value !== search) { version.current++; setSearch(value); } }
  function changeCategory(value) { if ((value?.searchKey || '') !== categoryKey) version.current++; setCategory(value); }
  function clearFilters() { version.current++; setSearch(''); setCategory(null); }

  return <div className="blog-page">
    <section className="blog-hero">
      <h1>Ideas for what’s <span>next.</span></h1>
      <p>Engineering, design and automation.<br className="blog-hero__break" /> Insights from the UnicodeTech team.</p>
    </section>
    <section className="blog-listing" aria-label="Blog posts">
      <div className="blog-listing__inner">
        <div className="blog-filters">
          <div className="blog-search">
            <Search size={18} aria-hidden="true" />
            <input aria-label="Search posts" value={search} onChange={event => changeSearch(event.target.value)} placeholder="Search posts…" type="search" />
          </div>
          <div className="blog-cat-filter"><CustomSearchSelectorWithPagination value={category} onChange={changeCategory} fetchOptions={fetchCategories} getLabel={item => item.name} getValue={item => item.id} placeholder="All categories" searchPlaceholder="Search categories…" /></div>
        </div>
        {(search || category) && <div className="blog-filter-summary"><span>{category?.name || 'All categories'}{search ? ` · “${search}”` : ''}</span><button type="button" onClick={clearFilters}>Clear filters <X size={13} /></button></div>}
        {error && <div className="blog-error" role="alert"><p>{error}</p><button type="button" onClick={() => blogs.length ? loadMore() : setRetry(value => value + 1)}>Try again</button></div>}
        {loading ? <div className="blog-grid" role="status" aria-label="Loading posts">{[1,2,3].map(key => <div key={key} className="blog-skeleton" />)}</div>
          : blogs.length === 0 && !error ? <div className="blog-empty"><h2>{search || category ? 'No matching posts' : 'Fresh ideas are on the way.'}</h2><p>{search || category ? 'Try another search or explore all our posts.' : 'Check back soon for insights from the team.'}</p>{(search || category) && <button type="button" onClick={clearFilters}>View all posts <ArrowRight size={15} /></button>}</div>
          : <div className="blog-grid">{blogs.map(blog => {
            const post = getPostPresentation(blog);
            const date = formatBlogDate(blog.createdAt);
            return <article key={blog.id} className="blog-card">
              <Link to={`/blog/${blog.slug}`} className="blog-card__media" tabIndex={-1} aria-hidden="true">
                <BlogMedia image={post.image} title="" provider={post.source?.provider} />
                {blog.category?.name && <span className="blog-card__cat"><span className="blog-category-dot" />{blog.category.name}</span>}
                {post.source && <span className="blog-card__platform">{post.source.provider}</span>}
              </Link>
              <div className="blog-card__body">
                <h2 className="blog-card__title"><Link to={`/blog/${blog.slug}`}>{post.title}</Link></h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <div className="blog-card__foot">{date ? <span className="blog-card__date"><Calendar size={13} />{date}</span> : <span />}
                  <Link to={`/blog/${blog.slug}`} className="blog-card__read" aria-label={`Read ${post.title}`}>Read more <ArrowRight size={15} /></Link>
                </div>
              </div>
            </article>;
          })}</div>}
        {hasMore && !loading && <div className="blog-load-more"><button type="button" onClick={loadMore} disabled={loadingMore} aria-busy={loadingMore}>Load more posts <ArrowRight size={16} /></button><span role="status">{loadingMore ? 'Loading more posts…' : ''}</span></div>}
      </div>
    </section>
  </div>;
}
