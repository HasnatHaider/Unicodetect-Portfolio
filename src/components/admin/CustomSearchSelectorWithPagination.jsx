import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { createRequestGuard } from "../../utils/adminState";
import "../../assets/styles/pages/admin.css";

const CustomSearchSelectorWithPagination = ({
  value,
  onChange,
  options = [],
  fetchOptions,
  getLabel = (o) => o.label,
  getValue = (o) => o.value,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  pageSize = 8,
  disabled = false,
  emptyText = "No results found",
  ariaLabel,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [asyncItems, setAsyncItems] = useState([]);
  const [asyncHasMore, setAsyncHasMore] = useState(false);
  const [asyncLoading, setAsyncLoading] = useState(false);

  const lastDocRef = useRef(null);
  const debounceRef = useRef(null);
  const fetchOptionsRef = useRef(fetchOptions);
  const requestGuard = useRef(createRequestGuard());
  const ref = useRef(null);
  const searchRef = useRef(null);

  const isAsync = Boolean(fetchOptions);

  useEffect(() => {
    fetchOptionsRef.current = fetchOptions;
  });

  useEffect(() => {
    const onMouseDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    const guard = requestGuard.current;
    return () => {
      clearTimeout(debounceRef.current);
      guard.invalidate();
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 40);
  }, [open]);

  const fetchAsync = useCallback(async (q, cursor) => {
    if (!fetchOptionsRef.current) return;
    const reqId = requestGuard.current.next();
    setAsyncLoading(true);
    try {
      const result = await fetchOptionsRef.current(q, cursor);
      if (!requestGuard.current.isCurrent(reqId)) return;
      if (cursor) {
        setAsyncItems((prev) => [...prev, ...(result?.items || [])]);
      } else {
        setAsyncItems(result?.items || []);
      }
      setAsyncHasMore(Boolean(result?.hasMore));
      lastDocRef.current = result?.lastDoc ?? null;
    } finally {
      if (requestGuard.current.isCurrent(reqId)) {
        setAsyncLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!open || !fetchOptionsRef.current) {
      clearTimeout(debounceRef.current);
      requestGuard.current.invalidate();
      setAsyncLoading(false);
      return;
    }
    lastDocRef.current = null;
    fetchAsync("", null);
  }, [open, fetchAsync]);

  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
    if (fetchOptionsRef.current) {
      clearTimeout(debounceRef.current);
      requestGuard.current.invalidate();
      debounceRef.current = setTimeout(() => {
        setAsyncItems([]);
        lastDocRef.current = null;
        fetchAsync(val, null);
      }, 300);
    }
  };

  const filtered = useMemo(() => {
    if (isAsync) return [];
    return options.filter((o) =>
      getLabel(o).toLowerCase().includes(search.toLowerCase()),
    );
  }, [isAsync, options, search, getLabel]);

  const visible = isAsync ? asyncItems : filtered.slice(0, page * pageSize);
  const showLoadMore = isAsync
    ? asyncHasMore
    : filtered.length > visible.length;
  const remaining = isAsync ? null : filtered.length - visible.length;

  const selectedId = value ? getValue(value) : null;

  const handleOpen = () => {
    setSearch("");
    setPage(1);
    setOpen((v) => !v);
  };

  const handleSelect = (opt) => {
    onChange(opt);
    setOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  const handleLoadMore = () => {
    if (isAsync) {
      fetchAsync(search, lastDocRef.current);
    } else {
      setPage((p) => p + 1);
    }
  };

  return (
    <div className="csel" ref={ref}>
      <button
        type="button"
        className={"csel__trigger" + (open ? " csel__trigger--open" : "")}
        onClick={handleOpen}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
      >
        <span className="csel__trigger-left">
          {value ? (
            <span className="csel__trigger-label">{getLabel(value)}</span>
          ) : (
            <span className="csel__placeholder">{placeholder}</span>
          )}
        </span>
        <span className="csel__trigger-right">
          {value && (
            <span
              className="csel__clear"
              role="button"
              tabIndex={0}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClear(e);
                }
              }}
              aria-label="Clear"
            >
              ×
            </span>
          )}
          <ChevronDown
            size={14}
            className={"csel__chevron" + (open ? " csel__chevron--open" : "")}
          />
        </span>
      </button>

      {open && (
        <div className="csel__dropdown" role="listbox">
          <div className="csel__search-wrap">
            <div className="csel__search-inner">
              <Search size={13} className="csel__search-icon" />
              <input
                ref={searchRef}
                className="csel__search"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
              />
            </div>
          </div>

          <div className="csel__list">
            {visible.length === 0 && !asyncLoading ? (
              <div className="csel__empty">{emptyText}</div>
            ) : (
              visible.map((opt) => {
                const id = getValue(opt);
                return (
                  <button
                    key={id}
                    type="button"
                    role="option"
                    aria-selected={id === selectedId}
                    className={
                      "csel__option" +
                      (id === selectedId ? " csel__option--active" : "")
                    }
                    onClick={() => handleSelect(opt)}
                  >
                    <span className="csel__option-label">{getLabel(opt)}</span>
                    {id === selectedId && (
                      <Check size={13} className="csel__check" />
                    )}
                  </button>
                );
              })
            )}
            {asyncLoading && (
              <div className="csel__loading">
                <span className="admin-login__spinner csel__spinner" />
              </div>
            )}
          </div>

          {showLoadMore && (
            <button
              type="button"
              className="csel__load-more"
              onClick={handleLoadMore}
              disabled={asyncLoading}
            >
              Load more
              {remaining !== null && (
                <span className="csel__load-more-count">+{remaining}</span>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSearchSelectorWithPagination;
