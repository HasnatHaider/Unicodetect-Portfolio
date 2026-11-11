import { useState, useEffect, useRef, useCallback } from "react";
import {
  searchCategoriesWithPagination,
  getCategoryCounts,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category.services";
import {
  createRequestGuard,
  getCategoryInitials,
  getCategoryTone,
} from "../../utils/adminState";
import { useAdminShell } from "./AdminLayout";
import {
  AdminPageHeader,
  AdminButton,
  AdminIconButton,
  AdminToolbar,
  AdminTable,
  AdminBadge,
  AdminField,
  AdminModal,
  AdminStateBlock,
  AdminToast,
} from "../../components/admin/ui/AdminUi";
import {
  Plus,
  Trash2,
  X,
  Tag,
  Edit2,
  Check,
  Calendar,
  AlertCircle,
} from "lucide-react";

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const TABLE_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  { key: "created", label: "Created" },
  { key: "actions", label: "Actions", align: "right" },
];

const formatCategoryDate = (createdAt) => {
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

const AdminCategories = () => {
  const { refreshCounts } = useAdminShell();

  const [categories, setCategories] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [listError, setListError] = useState("");
  const [actionError, setActionError] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editAutoSlug, setEditAutoSlug] = useState(true);
  const [updateSaving, setUpdateSaving] = useState(false);

  const cursorRef = useRef(null);
  const debounceRef = useRef(null);
  const listGuard = useRef(createRequestGuard());
  const countsGuard = useRef(createRequestGuard());

  const fetchCounts = useCallback(async () => {
    const reqId = countsGuard.current.next();
    try {
      const nextCounts = await getCategoryCounts();
      if (!countsGuard.current.isCurrent(reqId)) return;
      setCounts(nextCounts);
    } catch {
      // Keep existing counts if background count request fails
    }
  }, []);

  const fetchCategories = useCallback(async (q) => {
    const reqId = listGuard.current.next();
    setLoading(true);
    setLoadingMore(false);
    setListError("");
    cursorRef.current = null;
    try {
      const res = await searchCategoriesWithPagination(q);
      if (!listGuard.current.isCurrent(reqId)) return;
      setCategories(res.categories || []);
      setHasMore(Boolean(res.hasMore));
      cursorRef.current = res.lastDoc ?? null;
    } catch (err) {
      if (!listGuard.current.isCurrent(reqId)) return;
      setListError(err?.message || "Failed to load categories. Please try again.");
    } finally {
      if (listGuard.current.isCurrent(reqId)) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchCounts();
    fetchCategories("");
    const currentListGuard = listGuard.current;
    const currentCountsGuard = countsGuard.current;
    return () => {
      clearTimeout(debounceRef.current);
      currentListGuard.invalidate();
      currentCountsGuard.invalidate();
    };
  }, [fetchCounts, fetchCategories]);

  const handleSearchChange = (val) => {
    setSearch(val);
    clearTimeout(debounceRef.current);
    listGuard.current.invalidate();
    debounceRef.current = setTimeout(() => {
      fetchCategories(val);
    }, 300);
  };

  const handleLoadMore = async () => {
    const reqId = listGuard.current.next();
    setLoadingMore(true);
    setActionError("");
    try {
      const res = await searchCategoriesWithPagination(
        search,
        cursorRef.current,
      );
      if (!listGuard.current.isCurrent(reqId)) return;
      setCategories((prev) => [...prev, ...(res.categories || [])]);
      setHasMore(Boolean(res.hasMore));
      cursorRef.current = res.lastDoc ?? null;
    } catch (err) {
      if (!listGuard.current.isCurrent(reqId)) return;
      setActionError(err?.message || "Failed to load more categories.");
    } finally {
      if (listGuard.current.isCurrent(reqId)) {
        setLoadingMore(false);
      }
    }
  };

  const closeAddModal = () => {
    setAddOpen(false);
    setName("");
    setSlug("");
    setAutoSlug(true);
    setError("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (autoSlug) setSlug(slugify(e.target.value));
  };

  const handleSlugChange = (e) => {
    setAutoSlug(false);
    setSlug(e.target.value);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const finalSlug = slug.trim() || slugify(name);
    setSaving(true);
    setError("");
    setActionError("");
    try {
      await createCategory({ name: name.trim(), slug: finalSlug });
      closeAddModal();
      setToastMsg("Category added");
      await Promise.all([fetchCounts(), refreshCounts(), fetchCategories(search)]);
    } catch (err) {
      setError(err?.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (cat) => {
    setActionError("");
    setEditId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setEditAutoSlug(false);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditSlug("");
    setEditAutoSlug(true);
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    const finalSlug = editSlug.trim() || slugify(editName);
    setUpdateSaving(true);
    setActionError("");
    try {
      await updateCategory(id, { name: editName.trim(), slug: finalSlug });
      setCategories((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, name: editName.trim(), slug: finalSlug } : c,
        ),
      );
      cancelEdit();
      setToastMsg("Category updated");
    } catch (err) {
      setActionError(
        err?.message || "Could not update category. Please try again.",
      );
    } finally {
      setUpdateSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    setActionError("");
    try {
      await deleteCategory(id);
      setDeleteId(null);
      setToastMsg("Category deleted");
      await Promise.all([fetchCounts(), refreshCounts(), fetchCategories(search)]);
    } catch (err) {
      setDeleteId(null);
      setActionError(
        err?.message || "Could not delete category. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const dismissToast = useCallback(() => setToastMsg(""), []);

  return (
    <>
      <AdminPageHeader
        eyebrow="Admin / Taxonomy"
        title="Categories"
        badge={
          <AdminBadge variant="count" dot>
            {counts ? `${counts.total} total` : "Loading…"}
          </AdminBadge>
        }
        actions={
          <AdminButton
            variant="primary"
            icon={<Plus size={16} />}
            onClick={() => setAddOpen(true)}
          >
            New Category
          </AdminButton>
        }
      />

      <AdminModal
        open={addOpen}
        onClose={() => !saving && closeAddModal()}
        title="Add New Category"
        subtitle="Create a clean taxonomy bucket for grouping articles."
        ariaLabel="Add category"
      >
        <form className="admin-cat-form" onSubmit={handleAdd}>
          <div style={{ display: "grid", gap: 16 }}>
            <AdminField label="Name" htmlFor="cat-name-input" required>
              <input
                id="cat-name-input"
                className="admin-form-input"
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. AI & Automation"
                autoFocus
              />
            </AdminField>
            <AdminField
              label="Slug"
              htmlFor="cat-slug-input"
              hint="(auto from name)"
            >
              <input
                id="cat-slug-input"
                className="admin-form-input"
                value={slug}
                onChange={handleSlugChange}
                placeholder="ai-automation"
              />
            </AdminField>
            {error && (
              <p className="admin-editor__error" role="alert" style={{ margin: 0 }}>
                {error}
              </p>
            )}
          </div>
          <div className="admin-modal__actions">
            <AdminButton
              variant="ghost"
              onClick={closeAddModal}
              disabled={saving}
            >
              Cancel
            </AdminButton>
            <AdminButton
              type="submit"
              variant="primary"
              loading={saving}
              disabled={!name.trim()}
              icon={<Plus size={15} />}
            >
              Add Category
            </AdminButton>
          </div>
        </form>
      </AdminModal>

      <AdminToolbar
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search categories by name or slug…"
        searchAriaLabel="Search categories"
      />

      {actionError && (
        <p className="admin-editor__error" role="alert">
          {actionError}
        </p>
      )}

      {loading ? (
        <AdminStateBlock variant="loading" title="Loading categories…" />
      ) : listError ? (
        <AdminStateBlock
          variant="error"
          icon={<AlertCircle size={36} />}
          title="Unable to load categories"
          description={listError}
          actionLabel="Retry"
          onAction={() => fetchCategories(search)}
        />
      ) : categories.length === 0 ? (
        <AdminStateBlock
          variant="empty"
          icon={<Tag size={40} />}
          title={
            search ? `No categories found for "${search}"` : "No categories yet"
          }
          description={
            search
              ? "Try a different search term or clear your filter."
              : "No categories yet. Add your first one above."
          }
          actionLabel={!search ? "New Category" : undefined}
          onAction={!search ? () => setAddOpen(true) : undefined}
        />
      ) : (
        <>
          <AdminTable
            title="All Categories"
            accentBar
            badge={`${categories.length} active`}
            columns={TABLE_COLUMNS}
            stackOnMobile
          >
            {categories.map((cat, idx) => {
              const postCount = Array.isArray(cat.blogIds)
                ? cat.blogIds.length
                : 0;
              return (
                <tr key={cat.id}>
                  <td data-label="Name">
                    {editId === cat.id ? (
                      <input
                        className="admin-form-input"
                        aria-label={`Category name for ${cat.name}`}
                        style={{ padding: "8px 11px", fontSize: 13 }}
                        value={editName}
                        onChange={(e) => {
                          setEditName(e.target.value);
                          if (editAutoSlug)
                            setEditSlug(slugify(e.target.value));
                        }}
                        autoFocus
                      />
                    ) : (
                      <div className="admin-cat-cell">
                        <span
                          className={`admin-cat-avatar admin-cat-avatar--${getCategoryTone(idx)}`}
                          aria-hidden="true"
                        >
                          {getCategoryInitials(cat.name)}
                        </span>
                        <div className="admin-cat-cell__info">
                          <strong>{cat.name}</strong>
                          <small>
                            {postCount} {postCount === 1 ? "post" : "posts"}
                          </small>
                        </div>
                      </div>
                    )}
                  </td>
                  <td data-label="Slug">
                    {editId === cat.id ? (
                      <input
                        className="admin-form-input"
                        aria-label={`Category slug for ${cat.name}`}
                        style={{ padding: "8px 11px", fontSize: 13 }}
                        value={editSlug}
                        onChange={(e) => {
                          setEditAutoSlug(false);
                          setEditSlug(e.target.value);
                        }}
                      />
                    ) : (
                      <span className="admin-slug-pill">{cat.slug}</span>
                    )}
                  </td>
                  <td data-label="Created">
                    <span className="admin-date-cell">
                      <Calendar size={14} aria-hidden="true" />
                      {formatCategoryDate(cat.createdAt)}
                    </span>
                  </td>
                  <td data-label="Actions">
                    <div className="admin-table__actions">
                      {editId === cat.id ? (
                        <>
                          <AdminIconButton
                            tone="edit"
                            label="Save"
                            loading={updateSaving}
                            onClick={() => handleUpdate(cat.id)}
                          >
                            <Check size={14} />
                          </AdminIconButton>
                          <AdminIconButton
                            label="Cancel"
                            onClick={cancelEdit}
                            disabled={updateSaving}
                          >
                            <X size={14} />
                          </AdminIconButton>
                        </>
                      ) : (
                        <>
                          <AdminIconButton
                            tone="edit"
                            label={`Edit ${cat.name}`}
                            onClick={() => startEdit(cat)}
                          >
                            <Edit2 size={14} />
                          </AdminIconButton>
                          <AdminIconButton
                            tone="delete"
                            label={`Delete ${cat.name}`}
                            onClick={() => setDeleteId(cat.id)}
                          >
                            <Trash2 size={14} />
                          </AdminIconButton>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
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
        title="Delete Category?"
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
          This will permanently delete the category. Existing posts using it
          will not be affected.
        </p>
      </AdminModal>

      <AdminToast message={toastMsg} onDismiss={dismissToast} />
    </>
  );
};

export default AdminCategories;
