export function createRequestGuard() {
  let currentId = 0;
  return {
    next() {
      currentId += 1;
      return currentId;
    },
    isCurrent(id) {
      return id > 0 && id === currentId;
    },
    invalidate() {
      currentId += 1;
      return currentId;
    },
  };
}

export function normalizeDashboardAnalytics(raw) {
  const totalPosts = Number(raw?.totalPosts) || 0;
  const published = Number(raw?.published) || 0;
  const drafts = Number(raw?.drafts) || 0;
  const totalCategories = Number(raw?.totalCategories) || 0;
  const postsLast6Months = Array.isArray(raw?.postsLast6Months)
    ? raw.postsLast6Months
    : [];
  const postsByCategory = Array.isArray(raw?.postsByCategory)
    ? raw.postsByCategory
    : [];
  const recentPosts = Array.isArray(raw?.recentPosts) ? raw.recentPosts : [];

  const publishedPct =
    totalPosts > 0 ? Math.round((published / totalPosts) * 100) : 0;
  const usedCategoriesCount = postsByCategory.filter(
    (item) => (Number(item?.count) || 0) > 0,
  ).length;

  const firstMonth = postsLast6Months[0]?.month || "";
  const lastMonth = postsLast6Months[postsLast6Months.length - 1]?.month || "";
  const year = new Date().getFullYear();
  const monthRangeLabel =
    firstMonth && lastMonth ? `${firstMonth} — ${lastMonth} ${year}` : `${year}`;

  return {
    totalPosts,
    published,
    drafts,
    totalCategories,
    publishedPct,
    usedCategoriesCount,
    monthRangeLabel,
    postsLast6Months,
    postsByCategory,
    recentPosts,
  };
}

const normalizeSearchKey = (str) =>
  String(str || "")
    .toLowerCase()
    .replace(/\s+/g, "");

export function doesBlogMatchFilter(blog, { status = "", search = "" } = {}) {
  if (!blog) return false;
  if (status && blog.status !== status) return false;
  const q = normalizeSearchKey(search.trim());
  if (!q) return true;
  const titleKey = normalizeSearchKey(blog.titleKey || blog.title || "");
  const slugKey = normalizeSearchKey(blog.slug || "");
  return titleKey.includes(q) || slugKey.includes(q);
}

export function reconcileUpdatedBlogList(cached, updatedBlog) {
  const list = Array.isArray(cached?.blogs) ? cached.blogs : [];
  if (!updatedBlog?.id) return list;
  const matches = doesBlogMatchFilter(updatedBlog, {
    status: cached?.status || "",
    search: cached?.search || "",
  });
  if (!matches) {
    return list.filter((item) => item.id !== updatedBlog.id);
  }
  return list.map((item) =>
    item.id === updatedBlog.id ? { ...item, ...updatedBlog } : item,
  );
}

export function getEditorChecklist(form = {}, presentation = {}) {
  const hasTitle = Boolean(form.title?.trim());
  const hasCategory = Boolean(form.category?.id || form.category?.name);
  const hasExcerpt = Boolean(
    form.excerpt?.trim() || presentation?.excerpt?.trim(),
  );
  const hasMedia = Boolean(
    form.coverImage?.trim() || presentation?.image || presentation?.source,
  );

  const items = [
    {
      key: "title",
      label: hasTitle ? "Title added" : "Title missing",
      ok: hasTitle,
    },
    {
      key: "category",
      label: hasCategory ? "Category selected" : "Category not selected",
      ok: hasCategory,
    },
    {
      key: "excerpt",
      label: hasExcerpt ? "Excerpt ready" : "Excerpt missing",
      ok: hasExcerpt,
    },
    {
      key: "media",
      label: hasMedia ? "Cover or social source set" : "Cover image missing",
      ok: hasMedia,
    },
  ];

  const completedCount = items.filter((item) => item.ok).length;
  return {
    items,
    completedCount,
    totalCount: items.length,
    ready: completedCount === items.length,
  };
}

export function getCategoryInitials(name) {
  const words = String(name || "")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase().padEnd(2, "X");
  }
  return "CT";
}

const CATEGORY_TONES = ["c1", "c2", "c3", "c4"];

export function getCategoryTone(index = 0) {
  const safeIndex = Math.abs(Number(index) || 0);
  return CATEGORY_TONES[safeIndex % CATEGORY_TONES.length];
}
