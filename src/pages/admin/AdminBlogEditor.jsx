import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBlog,
  updateBlog,
  getBlogById,
} from "../../services/blog.services";
import { searchCategoriesWithPagination } from "../../services/category.services";
import { useAuth } from "../../contexts/AuthContext";
import { useAdminShell } from "./AdminLayout";
import RichTextEditor from "../../components/admin/RichTextEditor";
import BlogMedia from "../../components/blog/BlogMedia";
import { getPostPresentation, getSocialSource } from "../../utils/blogContent";
import {
  replaceSocialSource,
  applySocialPreview,
  setAuthoredField,
} from "../../utils/socialPreviewForm";
import { getEditorChecklist } from "../../utils/adminState";
import CustomSelector from "../../components/admin/CustomSelector";
import CustomSearchSelectorWithPagination from "../../components/admin/CustomSearchSelectorWithPagination";
import {
  AdminPageHeader,
  AdminButton,
  AdminStateBlock,
} from "../../components/admin/ui/AdminUi";
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Search,
  Share2,
  Globe,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Circle,
} from "lucide-react";
import "../../assets/styles/pages/admin.css";
import "../../assets/styles/pages/admin-editor.css";
import "../../assets/styles/pages/blog.css";
import "../../assets/styles/pages/blog-editor.css";

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const EMPTY = {
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "",
  category: null,
  content: "",
  sourceUrl: "",
  sourcePreview: null,
  status: "draft",
  tags: "",
  metaTitle: "",
  metaDescription: "",
  ogImageUrl: "",
  ogType: "article",
  twitterCard: "summary_large_image",
  twitterImageUrl: "",
  twitterTitle: "",
  twitterDescription: "",
};

const GooglePreview = ({ title, description, slug }) => (
  <div className="seo-preview seo-preview--google">
    <div className="seo-preview__site">
      <div className="seo-preview__favicon" />
      <div>
        <span className="seo-preview__domain">unicodetech.com</span>
        <span className="seo-preview__path"> › blog › {slug || "post"}</span>
      </div>
    </div>
    <div className="seo-preview__title">{title || "Untitled page"}</div>
    <div className="seo-preview__desc">
      {description || "No description set yet."}
    </div>
    <div className="seo-preview__count">
      {(title || "").length}/60 title · {(description || "").length}/160
      description
    </div>
  </div>
);

const SocialCardPreview = ({ mode, title, description, image, provider }) => (
  <div className={`seo-preview seo-preview--${mode}`}>
    <div className="seo-preview-social__media">
      <BlogMedia image={image} title={title} provider={provider} />
    </div>
    <div className="seo-preview-social__domain">
      {mode === "twitter" ? "unicodetech.com · X Card" : "UNICODETECH.COM"}
    </div>
    <div className="seo-preview-social__title">{title || "Untitled page"}</div>
    <p className="seo-preview-social__desc">
      {description || "No description set yet."}
    </p>
  </div>
);

const TABS = ["Content", "SEO & Sharing", "Publish"];

const AdminBlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refreshCounts } = useAdminShell();
  const isEdit = Boolean(id);

  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(EMPTY);
  const [autoSlug, setAutoSlug] = useState(true);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [previewTab, setPreviewTab] = useState("google");
  const [previewState, setPreviewState] = useState("idle");
  const [previewRetry, setPreviewRetry] = useState(0);
  const previewRequest = useRef(0);
  const autoSlugRef = useRef(autoSlug);

  useEffect(() => {
    autoSlugRef.current = autoSlug;
  }, [autoSlug]);

  useEffect(() => {
    if (loading) return;
    const current = ++previewRequest.current;
    const controller = new AbortController();
    const source = getSocialSource(form.sourceUrl);
    if (!form.sourceUrl.trim()) {
      setPreviewState("idle");
      return;
    }
    if (!source) {
      setPreviewState("invalid");
      return;
    }
    setPreviewState("loading");
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/v1/social-preview?url=${encodeURIComponent(source.url)}`,
          { signal: controller.signal },
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Preview unavailable");
        if (current !== previewRequest.current || controller.signal.aborted)
          return;
        setForm((previous) =>
          applySocialPreview(previous, data, autoSlugRef.current),
        );
        setPreviewState(data.status);
      } catch {
        if (current === previewRequest.current && !controller.signal.aborted)
          setPreviewState("unavailable");
      }
    }, 450);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [form.sourceUrl, loading, previewRetry]);

  const changeSource = useCallback((sourceUrl) => {
    previewRequest.current++;
    setForm((previous) =>
      replaceSocialSource(previous, sourceUrl, autoSlugRef.current),
    );
  }, []);

  const fetchCategoryOptions = useCallback(async (search, lastDoc) => {
    const res = await searchCategoriesWithPagination(search, lastDoc);
    return {
      items: res.categories,
      hasMore: res.hasMore,
      lastDoc: res.lastDoc,
    };
  }, []);

  useEffect(() => {
    if (!isEdit) {
      setForm(EMPTY);
      setAutoSlug(true);
      setLoading(false);
      setError("");
      return;
    }
    let active = true;
    setLoading(true);
    async function loadBlog() {
      try {
        const blog = await getBlogById(id);
        if (!active) return;
        if (!blog) {
          navigate("/admin/blogs");
          return;
        }
        setForm({
          ...EMPTY,
          ...blog,
          tags: Array.isArray(blog.tags)
            ? blog.tags.join(", ")
            : blog.tags || "",
        });
        setAutoSlug(false);
      } catch {
        if (active) navigate("/admin/blogs");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadBlog();
    return () => {
      active = false;
    };
  }, [id, isEdit, navigate]);

  const set = (field) => (val) => {
    const value = val?.target !== undefined ? val.target.value : val;
    setForm((prev) => {
      const next = setAuthoredField(prev, field, value);
      if (field === "title" && autoSlug) next.slug = slugify(value);
      return next;
    });
  };

  const handleSubmit = async (e, statusOverride) => {
    e?.preventDefault?.();
    if (form.sourceUrl.trim() && !getSocialSource(form.sourceUrl)) {
      setError("Enter a supported HTTPS social URL or remove the source URL.");
      setTab(0);
      return;
    }
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      setTab(0);
      return;
    }
    setSaving(true);
    setError("");
    try {
      const nextStatus = statusOverride || form.status;
      const payload = {
        ...form,
        status: nextStatus,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (isEdit) {
        await updateBlog(id, payload);
        await refreshCounts();
        navigate("/admin/blogs", { state: { action: "updated", blogId: id } });
      } else {
        await createBlog(payload);
        await refreshCounts();
        navigate("/admin/blogs");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminStateBlock variant="loading" title="Loading post…" />;
  }

  const seoTitle = form.metaTitle || form.title;
  const seoDesc = form.metaDescription || form.excerpt;
  const socialPost = getPostPresentation(form);
  const checklist = getEditorChecklist(form, socialPost);

  return (
    <div className="aed">
      <AdminPageHeader
        backButton={
          <button
            className="admin-editor__back"
            onClick={() => navigate("/admin/blogs")}
            type="button"
          >
            <ArrowLeft size={16} /> Back to Blogs
          </button>
        }
        eyebrow={isEdit ? "Blogs / Edit" : "Blogs / New"}
        title={isEdit ? "Edit Post" : "New Post"}
        subtitle={
          form.status === "published"
            ? `Published · /blog/${form.slug || "post"}`
            : `Draft · ${checklist.completedCount} of ${checklist.totalCount} checklist items complete`
        }
        actions={
          <AdminButton
            variant="primary"
            loading={saving}
            icon={<Save size={15} />}
            className="aed__save-btn"
            onClick={(e) => handleSubmit(e)}
          >
            {isEdit ? "Save Changes" : "Publish Post"}
          </AdminButton>
        }
      />

      {error && (
        <p className="admin-editor__error" role="alert">
          {error}
        </p>
      )}

      <div className="aed__tabs" role="tablist" aria-label="Editor sections">
        {TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === i}
            className={"aed__tab" + (tab === i ? " aed__tab--active" : "")}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab 0: Content ── */}
      {tab === 0 && (
        <div className="aed__grid">
          <div className="aed__content">
            <section
              className="blog-editor-source"
              aria-label="Social post preview"
            >
              <label className="admin-form-label" htmlFor="blog-source-url">
                Social post URL{" "}
                <span className="blog-editor-source__optional">(optional)</span>
              </label>
              <div className="blog-editor-source__input">
                <input
                  id="blog-source-url"
                  className="admin-form-input"
                  type="url"
                  value={form.sourceUrl}
                  onChange={(event) => changeSource(event.target.value)}
                  placeholder="Paste a YouTube, Instagram, Facebook, LinkedIn, X or TikTok link"
                  aria-describedby="blog-source-status"
                />
                {form.sourceUrl && (
                  <button type="button" onClick={() => changeSource("")}>
                    Remove source
                  </button>
                )}
              </div>
              <div
                className="blog-editor-source__status"
                id="blog-source-status"
                role="status"
              >
                {previewState === "idle" &&
                  "Paste a social link here or into the post body. We’ll fetch a preview; all fields remain editable."}
                {previewState === "loading" &&
                  "Fetching preview… You can keep editing."}
                {previewState === "ready" &&
                  "Preview fetched. Edit the title, excerpt or cover image below to make it your own."}
                {previewState === "partial" &&
                  "Some preview details are unavailable. Fill in any missing title, excerpt or cover image below."}
                {previewState === "unavailable" &&
                  "This platform couldn’t provide a preview. Add a title, excerpt and optional cover below; the original link will still work."}
                {previewState === "invalid" &&
                  "Use an HTTPS YouTube, Instagram, Facebook, LinkedIn, X or TikTok URL."}
                {["partial", "unavailable", "ready"].includes(previewState) && (
                  <button
                    type="button"
                    onClick={() => setPreviewRetry((value) => value + 1)}
                  >
                    Retry preview
                  </button>
                )}
              </div>
              {socialPost.source && (
                <div className="blog-editor-preview">
                  <div className="blog-editor-preview__media">
                    <BlogMedia
                      image={socialPost.image}
                      title=""
                      provider={socialPost.source.provider}
                    />
                  </div>
                  <div>
                    <span>{socialPost.source.provider}</span>
                    <strong>{socialPost.title}</strong>
                    <p>{socialPost.excerpt}</p>
                    <a
                      href={socialPost.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open original post
                    </a>
                  </div>
                </div>
              )}
            </section>

            <div className="admin-form-field">
              <label className="admin-form-label" htmlFor="blog-title-input">
                Title <span className="admin-form-label__req" aria-hidden="true">*</span>
              </label>
              <input
                id="blog-title-input"
                className="admin-form-input aed__title-input"
                value={form.title}
                onChange={set("title")}
                placeholder="Enter post title…"
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-field">
                <label className="admin-form-label" htmlFor="blog-slug-input">
                  Slug
                </label>
                <div className="admin-editor__slug-wrap">
                  <span className="admin-editor__slug-prefix">/blog/</span>
                  <input
                    id="blog-slug-input"
                    className="admin-form-input admin-editor__slug-input"
                    value={form.slug}
                    onChange={(e) => {
                      setAutoSlug(false);
                      set("slug")(e);
                    }}
                    placeholder="auto from title"
                  />
                </div>
              </div>
              <div className="admin-form-field">
                <label className="admin-form-label" htmlFor="blog-cover-input">
                  Cover Image URL
                </label>
                <input
                  id="blog-cover-input"
                  className="admin-form-input"
                  value={form.coverImage}
                  onChange={set("coverImage")}
                  placeholder="https://…"
                  type="url"
                />
              </div>
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label" htmlFor="blog-excerpt-input">
                Excerpt
              </label>
              <textarea
                id="blog-excerpt-input"
                className="admin-form-input admin-form-textarea"
                value={form.excerpt}
                onChange={set("excerpt")}
                rows={3}
                placeholder="Short summary shown in the blog listing…"
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Category</label>
              <CustomSearchSelectorWithPagination
                value={form.category}
                onChange={(cat) =>
                  setForm((p) => ({
                    ...p,
                    category: cat
                      ? {
                          id: cat.id,
                          name: cat.name,
                          slug: cat.slug,
                          searchKey: cat.searchKey ?? "",
                        }
                      : null,
                  }))
                }
                fetchOptions={fetchCategoryOptions}
                getLabel={(c) => c.name}
                getValue={(c) => c.id}
                placeholder="Select a category…"
                searchPlaceholder="Search categories…"
                emptyText="No categories found"
                ariaLabel="Select category"
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">
                Post Body — Formatting, Images, YouTube Embeds &amp; Raw HTML
              </label>
              <RichTextEditor
                value={form.content}
                onChange={(val) => setForm((p) => ({ ...p, content: val }))}
                onSocialPaste={changeSource}
              />
            </div>
          </div>

          <aside className="aed__rail" aria-label="Post summary and checklist">
            <div className="aed__rail-card">
              <h2 className="aed__rail-title">Cover preview</h2>
              {socialPost.image || socialPost.source ? (
                <div className="aed__cover-media">
                  <BlogMedia
                    image={socialPost.image}
                    title={socialPost.title}
                    provider={socialPost.source?.provider}
                  />
                </div>
              ) : (
                <div className="aed__cover-ph">
                  <div>
                    <ImageIcon size={22} />
                    <div>Paste a cover URL or social link to preview</div>
                  </div>
                </div>
              )}
            </div>

            <div className="aed__rail-card">
              <h2 className="aed__rail-title">Post details</h2>
              <div className="aed__kv">
                <span>Status</span>
                <b>
                  <span
                    className={
                      "aed__status-dot" +
                      (form.status === "published"
                        ? " aed__status-dot--live"
                        : "")
                    }
                  />
                  {form.status === "published" ? "Published" : "Draft"}
                </b>
              </div>
              <div className="aed__kv">
                <span>Category</span>
                <b>{form.category?.name || "Uncategorized"}</b>
              </div>
              <div className="aed__kv">
                <span>Author</span>
                <b>{user?.email || "Admin"}</b>
              </div>
              <div className="aed__kv">
                <span>Reading time</span>
                <b>
                  {socialPost.readMinutes > 0
                    ? `${socialPost.readMinutes} min read`
                    : socialPost.source
                      ? "Link post"
                      : "—"}
                </b>
              </div>
            </div>

            <div className="aed__rail-card">
              <h2 className="aed__rail-title">Ready to publish?</h2>
              {checklist.items.map((item) => (
                <div
                  key={item.key}
                  className={
                    "aed__check " +
                    (item.ok ? "aed__check--ok" : "aed__check--no")
                  }
                >
                  {item.ok ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <Circle size={15} />
                  )}
                  <span>{item.label}</span>
                </div>
              ))}
              <div className="aed__rail-actions">
                <CustomSelector
                  value={form.status}
                  onChange={set("status")}
                  ariaLabel="Post status"
                  options={[
                    {
                      value: "draft",
                      label: "Draft",
                      icon: <EyeOff size={14} />,
                    },
                    {
                      value: "published",
                      label: "Published",
                      icon: <Eye size={14} />,
                    },
                  ]}
                />
                <AdminButton
                  variant="ghost"
                  size="sm"
                  disabled={saving}
                  onClick={() => handleSubmit(null, "draft")}
                >
                  Save draft
                </AdminButton>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ── Tab 1: SEO & Sharing ── */}
      {tab === 1 && (
        <div className="aed__seo">
          <div className="aed__seo-left">
            <p className="aed__seo-hint">
              Leave any field blank to fall back to the post&apos;s title,
              excerpt, or cover image.
            </p>

            <div className="aed__seo-section">
              <h2 className="aed__seo-section-title">Meta Tags</h2>
              <div className="admin-form-field">
                <label className="admin-form-label" htmlFor="seo-meta-title">
                  Meta Title (browser tab + search results)
                </label>
                <input
                  id="seo-meta-title"
                  className="admin-form-input"
                  value={form.metaTitle}
                  onChange={set("metaTitle")}
                  placeholder={form.title || "Post title"}
                  maxLength={60}
                />
                <span className="aed__char-count">
                  {form.metaTitle.length}/60
                </span>
              </div>
              <div className="admin-form-field" style={{ marginTop: 14 }}>
                <label className="admin-form-label" htmlFor="seo-meta-desc">
                  Meta Description
                </label>
                <textarea
                  id="seo-meta-desc"
                  className="admin-form-input admin-form-textarea"
                  value={form.metaDescription}
                  onChange={set("metaDescription")}
                  rows={3}
                  placeholder={form.excerpt || "Post excerpt"}
                  maxLength={160}
                />
                <span className="aed__char-count">
                  {form.metaDescription.length}/160
                </span>
              </div>
            </div>

            <div className="aed__seo-section">
              <h2 className="aed__seo-section-title">
                Open Graph (Facebook, LinkedIn)
              </h2>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label className="admin-form-label" htmlFor="seo-og-image">
                    OG:Image URL
                  </label>
                  <input
                    id="seo-og-image"
                    className="admin-form-input"
                    value={form.ogImageUrl}
                    onChange={set("ogImageUrl")}
                    placeholder={form.coverImage || "https://…"}
                    type="url"
                  />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">OG:Type</label>
                  <CustomSelector
                    value={form.ogType}
                    onChange={set("ogType")}
                    ariaLabel="Open Graph type"
                    options={[
                      {
                        value: "article",
                        label: "Article",
                        icon: <FileText size={14} />,
                      },
                      {
                        value: "website",
                        label: "Website",
                        icon: <Globe size={14} />,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="aed__seo-section">
              <h2 className="aed__seo-section-title">Twitter Card</h2>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label className="admin-form-label">Twitter:Card</label>
                  <CustomSelector
                    value={form.twitterCard}
                    onChange={set("twitterCard")}
                    ariaLabel="Twitter card type"
                    options={[
                      {
                        value: "summary_large_image",
                        label: "Summary Large Image",
                      },
                      { value: "summary", label: "Summary" },
                    ]}
                  />
                </div>
                <div className="admin-form-field">
                  <label
                    className="admin-form-label"
                    htmlFor="seo-twitter-image"
                  >
                    Twitter:Image URL
                  </label>
                  <input
                    id="seo-twitter-image"
                    className="admin-form-input"
                    value={form.twitterImageUrl}
                    onChange={set("twitterImageUrl")}
                    type="url"
                    placeholder="https://…"
                  />
                </div>
              </div>
              <div className="admin-form-field" style={{ marginTop: 14 }}>
                <label className="admin-form-label" htmlFor="seo-twitter-title">
                  Twitter:Title
                </label>
                <input
                  id="seo-twitter-title"
                  className="admin-form-input"
                  value={form.twitterTitle}
                  onChange={set("twitterTitle")}
                  placeholder={form.title}
                />
              </div>
              <div className="admin-form-field" style={{ marginTop: 14 }}>
                <label className="admin-form-label" htmlFor="seo-twitter-desc">
                  Twitter:Description
                </label>
                <textarea
                  id="seo-twitter-desc"
                  className="admin-form-input admin-form-textarea"
                  value={form.twitterDescription}
                  onChange={set("twitterDescription")}
                  rows={2}
                  placeholder={form.excerpt}
                />
              </div>
            </div>
          </div>

          <div className="aed__seo-right">
            <div className="aed__preview-card">
              <div className="aed__preview-head">
                <span className="aed__preview-label">Live Preview</span>
                <div className="aed__preview-tabs">
                  {[
                    {
                      key: "google",
                      icon: <Search size={12} />,
                      label: "Google",
                    },
                    {
                      key: "facebook",
                      icon: <Share2 size={12} />,
                      label: "Facebook",
                    },
                    {
                      key: "twitter",
                      icon: <Globe size={12} />,
                      label: "Twitter",
                    },
                  ].map(({ key, icon, label }) => (
                    <button
                      key={key}
                      type="button"
                      className={
                        "aed__preview-tab" +
                        (previewTab === key ? " aed__preview-tab--active" : "")
                      }
                      onClick={() => setPreviewTab(key)}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {previewTab === "google" && (
                <GooglePreview
                  title={seoTitle}
                  description={seoDesc}
                  slug={form.slug}
                />
              )}
              {previewTab === "facebook" && (
                <SocialCardPreview
                  mode="facebook"
                  title={seoTitle}
                  description={seoDesc}
                  image={form.ogImageUrl || socialPost.image}
                  provider={socialPost.source?.provider}
                />
              )}
              {previewTab === "twitter" && (
                <SocialCardPreview
                  mode="twitter"
                  title={form.twitterTitle || seoTitle}
                  description={form.twitterDescription || seoDesc}
                  image={
                    form.twitterImageUrl ||
                    form.ogImageUrl ||
                    socialPost.image
                  }
                  provider={socialPost.source?.provider}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 2: Publish ── */}
      {tab === 2 && (
        <div className="aed__publish">
          <div className="aed__publish-col">
            <div className="admin-editor__box">
              <h2 className="admin-editor__box-title">Status</h2>
              <div className="admin-form-field">
                <label className="admin-form-label">Visibility</label>
                <CustomSelector
                  value={form.status}
                  onChange={set("status")}
                  ariaLabel="Visibility"
                  options={[
                    {
                      value: "draft",
                      label: "Draft — not visible to public",
                      icon: <EyeOff size={14} />,
                    },
                    {
                      value: "published",
                      label: "Published — live on the blog",
                      icon: <Eye size={14} />,
                    },
                  ]}
                />
              </div>
              <div className="admin-editor__status-hint">
                {form.status === "published" ? (
                  <>
                    <Eye size={13} /> Visible at /blog/{form.slug || "…"}
                  </>
                ) : (
                  <>
                    <EyeOff size={13} /> Only visible to admins
                  </>
                )}
              </div>
            </div>

            <div className="admin-editor__box">
              <h2 className="admin-editor__box-title">Tags</h2>
              <div className="admin-form-field">
                <label className="admin-form-label" htmlFor="publish-tags-input">
                  Tags{" "}
                  <span className="admin-form-label__hint">
                    (comma-separated)
                  </span>
                </label>
                <input
                  id="publish-tags-input"
                  className="admin-form-input"
                  value={form.tags}
                  onChange={set("tags")}
                  placeholder="ai, automation, react"
                />
              </div>
              {form.tags && (
                <div className="aed__tag-list">
                  {form.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t) => (
                      <span key={t} className="aed__tag">
                        {t}
                      </span>
                    ))}
                </div>
              )}
            </div>

            <div className="admin-editor__box">
              <h2 className="admin-editor__box-title">Cover Image Preview</h2>
              {socialPost.image || socialPost.source ? (
                <div className="aed__cover-media">
                  <BlogMedia
                    image={socialPost.image}
                    title={socialPost.title}
                    provider={socialPost.source?.provider}
                  />
                </div>
              ) : (
                <p style={{ fontSize: 13, color: "var(--adm-muted)", margin: 0 }}>
                  No cover image set. Add one in the Content tab.
                </p>
              )}
            </div>
          </div>

          <div className="aed__publish-actions">
            <AdminButton
              variant="primary"
              loading={saving}
              icon={<Save size={16} />}
              className="aed__final-save"
              onClick={(e) => handleSubmit(e)}
            >
              {isEdit ? "Save & Return" : "Confirm & Save"}
            </AdminButton>
            <AdminButton
              variant="ghost"
              onClick={() => navigate("/admin/blogs")}
              disabled={saving}
            >
              Cancel
            </AdminButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogEditor;
