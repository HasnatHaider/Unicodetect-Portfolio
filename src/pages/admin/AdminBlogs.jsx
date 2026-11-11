import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getBlogsWithPagination,
  deleteBlog,
  getBlogById,
  getBlogsCounts,
} from "../../services/blog.services";
import {
  createRequestGuard,
  reconcileUpdatedBlogList,
} from "../../utils/adminState";
import { useAdminShell } from "./AdminLayout";
import {
  AdminPageHeader,
  AdminButton,
  AdminIconButton,
  AdminToolbar,
  AdminTable,
  AdminBadge,
  AdminModal,
  AdminStateBlock,
} from "../../components/admin/ui/AdminUi";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ChevronRight,
  FileText,
  AlertCircle,
} from "lucide-react";

const STATUS_TABS = [
  { label: "All", value: "" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

const TABLE_COLUMNS = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" },
  { key: "date", label: "Date" },
  { key: "actions", label: "Actions", align: "right" },
];

// Module-level cache — survives component unmount, cleared on any fresh fetch
let _cache = null;

const formatBlogDate = (createdAt) => {
  if (!createdAt) return "—";
  const dateObj =
    typeof createdAt?.toDate === "function"
      ? createdAt.toDate()
      : createdAt instanceof Date
        ? createdAt
        : typeof createdAt === "string" || typeof createdAt === "number"
          ? new Date(createdAt)
          : null;
  if (!dateObj || Number.isNaN(dateObj.getTime())) return "—";
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const AdminBlogs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshCounts } = useAdminShell();

  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [counts, setCounts] = useState(null);

  const cursorRef = useRef(null);
  const debounceRef = useRef(null);
  const listGuard = useRef(createRequestGuard());
  const countsGuard = useRef(createRequestGuard());

  const fetchCounts = useCallback(async () => {
    const reqId = countsGuard.current.next();
    try {
      const nextCounts = await getBlogsCounts();
      if (!countsGuard.current.isCurrent(reqId)) return;
      setCounts(nextCounts);
    } catch {
      // Keep existing counts if background count request fails
    }
  }, []);

  // Fresh page-1 fetch — always clears cache and invalidates older requests
  const fetchBlogs = useCallback(async (q, st) => {
    _cache = null;
    const reqId = listGuard.current.next();
    setLoadingBlogs(true);
    setLoadingMore(false);
    setError("");
    cursorRef.current = null;
    try {
      const res = await getBlogsWithPagination({ search: q, status: st });
      if (!listGuard.current.isCurrent(reqId)) return;
      setBlogs(res.blogs || []);
      setHasMore(Boolean(res.hasMore));
      cursorRef.current = res.lastDoc ?? null;
    } catch (err) {
      if (!listGuard.current.isCurrent(reqId)) return;
      setError(err?.message || "Failed to load blog posts. Please try again.");
    } finally {
      if (listGuard.current.isCurrent(reqId)) {
        setLoadingBlogs(false);
      }
    }
  }, []);

  useEffect(() => {
    let active = true;
    const { action, blogId } = location.state || {};

    const init = async () => {
      if (action === "updated" && blogId && _cache) {
        const snapshot = _cache;
        const reqId = listGuard.current.next();
        setBlogs(snapshot.blogs);
        setHasMore(snapshot.hasMore);
        setSearch(snapshot.search);
        setStatus(snapshot.status);
        cursorRef.current = snapshot.cursor;
        setLoadingBlogs(false);

        fetchCounts();
        refreshCounts();

        try {
          const updated = await getBlogById(blogId);
          if (!active || !listGuard.current.isCurrent(reqId)) return;
          if (updated) {
            const nextList = reconcileUpdatedBlogList(
              {
                blogs: snapshot.blogs,
                status: snapshot.status,
                search: snapshot.search,
              },
              updated,
            );
            _cache = { ...snapshot, blogs: nextList };
            setBlogs(nextList);
          }
          navigate(location.pathname, { replace: true, state: null });
        } catch {
          // Keep cached list if individual blog lookup fails
        }
      } else {
        fetchCounts();
        refreshCounts();
        await fetchBlogs("", "");
      }
    };

    init();

    const currentListGuard = listGuard.current;
    const currentCountsGuard = countsGuard.current;
    return () => {
      active = false;
      clearTimeout(debounceRef.current);
      currentListGuard.invalidate();
      currentCountsGuard.invalidate();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchChange = (val) => {
    setSearch(val);
    clearTimeout(debounceRef.current);
    // Invalidate any in-flight pagination or earlier search immediately
    listGuard.current.invalidate();
    debounceRef.current = setTimeout(() => {
      fetchBlogs(val, status);
    }, 300);
  };

  const handleStatusChange = (st) => {
    clearTimeout(debounceRef.current);
    setStatus(st);
    fetchBlogs(search, st);
  };

  const handleLoadMore = async () => {
    const reqId = listGuard.current.next();
    setLoadingMore(true);
    setError("");
    try {
      const res = await getBlogsWithPagination({
        search,
        status,
        lastDoc: cursorRef.current,
      });
      if (!listGuard.current.isCurrent(reqId)) return;
      setBlogs((prev) => [...prev, ...(res.blogs || [])]);
      setHasMore(Boolean(res.hasMore));
      cursorRef.current = res.lastDoc ?? null;
    } catch (err) {
      if (!listGuard.current.isCurrent(reqId)) return;
      setError(err?.message || "Failed to load more posts.");
    } finally {
      if (listGuard.current.isCurrent(reqId)) {
        setLoadingMore(false);
      }
    }
  };

  // Save state before navigating to edit so we can restore it on return
  const handleEdit = (blogId) => {
    _cache = {
      blogs,
      hasMore,
      search,
      status,
      cursor: cursorRef.current,
    };
    navigate(`/admin/blogs/edit/${blogId}`);
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    setError("");
    try {
      await deleteBlog(id);
      setDeleteId(null);
      await Promise.all([fetchCounts(), refreshCounts(), fetchBlogs(search, status)]);
    } catch (err) {
      setDeleteId(null);
      setError(err?.message || "Failed to delete post. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        eyebrow="Admin / Content"
        title="Blog Posts"
        subtitle={
          counts ? (
            <>
              <b>{counts.total} total</b> · {counts.published} published ·{" "}
              {counts.drafts} drafts
            </>
          ) : (
            "Loading…"
          )
        }
        actions={
          <AdminButton
            variant="primary"
            icon={<Plus size={16} />}
            onClick={() => navigate("/admin/blogs/new")}
          >
            New Post
          </AdminButton>
        }
      />

      <AdminToolbar
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search posts…"
        searchAriaLabel="Search posts"
        tabs={STATUS_TABS}
        activeTab={status}
        onTabChange={handleStatusChange}
        tabAriaLabel="Filter posts by status"
      />

      {error && !loadingBlogs && blogs.length > 0 && (
        <p className="admin-editor__error" role="alert">
          {error}
        </p>
      )}

      {loadingBlogs ? (
        <AdminStateBlock variant="loading" title="Loading posts…" />
      ) : error && blogs.length === 0 ? (
        <AdminStateBlock
          variant="error"
          icon={<AlertCircle size={36} />}
          title="Unable to load posts"
          description={error}
          actionLabel="Retry"
          onAction={() => fetchBlogs(search, status)}
        />
      ) : blogs.length === 0 ? (
        <AdminStateBlock
          variant="empty"
          icon={<FileText size={40} />}
          title={search ? `No posts found for "${search}"` : "No blog posts yet"}
          description={
            search
              ? "Try a different search term or switch the status filter."
              : "No blog posts yet. Create your first post!"
          }
          actionLabel={!search ? "Create First Post" : undefined}
          onAction={!search ? () => navigate("/admin/blogs/new") : undefined}
        />
      ) : (
        <>
          <AdminTable
            title="All Posts"
            note={`Showing ${blogs.length} of ${counts?.total ?? blogs.length}`}
            columns={TABLE_COLUMNS}
            stackOnMobile
          >
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td className="admin-table__title-cell" data-label="Title">
                  <div>
                    <button
                      type="button"
                      className="admin-table__title"
                      onClick={() => handleEdit(blog.id)}
                    >
                      {blog.title}
                    </button>
                    <span className="admin-table__slug">/blog/{blog.slug}</span>
                  </div>
                </td>
                <td data-label="Category">
                  {blog.category?.name ? (
                    <AdminBadge variant="category">
                      {blog.category.name}
                    </AdminBadge>
                  ) : (
                    "—"
                  )}
                </td>
                <td data-label="Status">
                  <AdminBadge
                    variant={blog.status || "draft"}
                    icon={
                      blog.status === "published" ? (
                        <Eye size={11} />
                      ) : (
                        <EyeOff size={11} />
                      )
                    }
                  >
                    {blog.status || "draft"}
                  </AdminBadge>
                </td>
                <td className="admin-table__date" data-label="Date">
                  {formatBlogDate(blog.createdAt)}
                </td>
                <td data-label="Actions">
                  <div className="admin-table__actions">
                    <AdminIconButton
                      tone="edit"
                      label={`Edit ${blog.title}`}
                      onClick={() => handleEdit(blog.id)}
                    >
                      <Edit2 size={14} />
                    </AdminIconButton>
                    <AdminIconButton
                      tone="delete"
                      label={`Delete ${blog.title}`}
                      onClick={() => setDeleteId(blog.id)}
                    >
                      <Trash2 size={14} />
                    </AdminIconButton>
                    {blog.status === "published" && (
                      <AdminIconButton
                        as="a"
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        tone="view"
                        label={`View ${blog.title}`}
                      >
                        <ChevronRight size={14} />
                      </AdminIconButton>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </AdminTable>

          {hasMore && (
            <div className="admin-load-more">
              <button
                type="button"
                className="admin-load-more__btn admin-spinner-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <span className="admin-login__spinner admin-login__spinner--brand" />
                ) : (
                  "Load more"
                )}
              </button>
            </div>
          )}
        </>
      )}

      <AdminModal
        open={Boolean(deleteId)}
        onClose={() => !deleting && setDeleteId(null)}
        title="Delete Post?"
        size="sm"
        ariaLabel="Confirm delete"
        actions={
          <>
            <AdminButton
              variant="ghost"
              onClick={() => setDeleteId(null)}
              disabled={deleting}
            >
              Cancel
            </AdminButton>
            <AdminButton
              variant="danger"
              loading={deleting}
              onClick={() => handleDelete(deleteId)}
            >
              Delete
            </AdminButton>
          </>
        }
      >
        <p className="admin-modal__body-text">
          This action cannot be undone. The blog post will be permanently
          deleted.
        </p>
      </AdminModal>
    </>
  );
};

export default AdminBlogs;
