import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Outlet, NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as blogServices from "../../services/blog.services";
import * as categoryServices from "../../services/category.services";
import { createRequestGuard } from "../../utils/adminState";
import {
  LayoutDashboard,
  FileText,
  Tag,
  Plus,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import "../../assets/styles/pages/admin.css";

const AdminShellContext = createContext({
  counts: { blogs: null, categories: null },
  refreshCounts: async () => {},
});

export const useAdminShell = () => useContext(AdminShellContext);

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counts, setCounts] = useState({ blogs: null, categories: null });
  const countsGuard = useRef(createRequestGuard());

  const refreshCounts = useCallback(async () => {
    const reqId = countsGuard.current.next();
    try {
      const [blogRes, catRes] = await Promise.all([
        blogServices.getBlogsCounts?.(),
        categoryServices.getCategoryCounts?.(),
      ]);
      if (!countsGuard.current.isCurrent(reqId)) return;
      setCounts({
        blogs:
          typeof blogRes?.total === "number"
            ? blogRes.total
            : typeof blogRes?.all === "number"
              ? blogRes.all
              : 0,
        categories: typeof catRes?.total === "number" ? catRes.total : 0,
      });
    } catch {
      // Keep previous counts if background count refresh fails
    }
  }, []);

  useEffect(() => {
    refreshCounts();
    const guard = countsGuard.current;
    return () => {
      guard.invalidate();
    };
  }, [refreshCounts]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleLogout = async () => {
    closeMobileDrawer();
    await logout();
    navigate("/admin/login");
  };

  const getInitials = (email) => {
    if (!email) return "UT";
    return email.slice(0, 2).toUpperCase();
  };

  const shellValue = useMemo(
    () => ({ counts, refreshCounts }),
    [counts, refreshCounts],
  );

  return (
    <AdminShellContext.Provider value={shellValue}>
      <div className="admin-shell">
        <div className="admin-mobile-bar">
          <Link to="/admin" className="admin-brand" onClick={closeMobileDrawer}>
            <div className="admin-brand__mark">UT</div>
            <div className="admin-brand__name">
              UnicodeTech
              <em>Admin Panel</em>
            </div>
          </Link>
          <button
            type="button"
            className="admin-mobile-bar__toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <Menu size={18} />
          </button>
        </div>

        <div
          className={
            "admin-drawer-backdrop" +
            (mobileOpen ? " admin-drawer-backdrop--open" : "")
          }
          onClick={closeMobileDrawer}
          aria-hidden="true"
        />

        <aside
          className={
            "admin-sidebar" + (mobileOpen ? " admin-sidebar--open" : "")
          }
        >
          <div className="admin-sidebar__head">
            <Link
              to="/admin"
              className="admin-brand"
              onClick={closeMobileDrawer}
            >
              <div className="admin-brand__mark">UT</div>
              <div className="admin-brand__name">
                UnicodeTech
                <em>Admin Panel</em>
              </div>
            </Link>
            <button
              type="button"
              className="admin-sidebar__close"
              aria-label="Close navigation"
              onClick={closeMobileDrawer}
            >
              <X size={16} />
            </button>
          </div>

          <nav className="admin-side-nav" aria-label="Admin navigation">
            <span className="admin-nav-label">Workspace</span>

            <NavLink
              to="/admin"
              end
              onClick={closeMobileDrawer}
              className={({ isActive }) =>
                "admin-nav-item" + (isActive ? " admin-nav-item--active" : "")
              }
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/blogs"
              end={!location.pathname.startsWith("/admin/blogs/edit/")}
              onClick={closeMobileDrawer}
              className={({ isActive }) =>
                "admin-nav-item" + (isActive ? " admin-nav-item--active" : "")
              }
            >
              <FileText size={16} />
              <span>Blogs</span>
              {counts.blogs !== null && (
                <span className="admin-nav-count">{counts.blogs}</span>
              )}
            </NavLink>

            <NavLink
              to="/admin/categories"
              onClick={closeMobileDrawer}
              className={({ isActive }) =>
                "admin-nav-item" + (isActive ? " admin-nav-item--active" : "")
              }
            >
              <Tag size={16} />
              <span>Categories</span>
              {counts.categories !== null && (
                <span className="admin-nav-count">{counts.categories}</span>
              )}
            </NavLink>

            <span className="admin-nav-label">Shortcuts</span>

            <NavLink
              to="/admin/blogs/new"
              end
              onClick={closeMobileDrawer}
              className={({ isActive }) =>
                "admin-nav-item" + (isActive ? " admin-nav-item--active" : "")
              }
            >
              <Plus size={16} />
              <span>New Post</span>
            </NavLink>

            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-nav-item"
              onClick={closeMobileDrawer}
            >
              <ExternalLink size={16} />
              <span>View Live Blog</span>
            </a>
          </nav>

          <div className="admin-sidebar__foot">
            <div className="admin-user">
              <div className="admin-avatar">{getInitials(user?.email)}</div>
              <div className="admin-user__meta">
                <strong>Admin</strong>
                <span>{user?.email}</span>
              </div>
            </div>
            <button
              type="button"
              className="admin-logout"
              aria-label="Sign out"
              title="Sign out"
              onClick={handleLogout}
            >
              <LogOut size={15} />
            </button>
          </div>
        </aside>

        <div className="admin-main">
          <div className="admin-wrap">
            <Outlet />
          </div>
        </div>
      </div>
    </AdminShellContext.Provider>
  );
};

export default AdminLayout;
