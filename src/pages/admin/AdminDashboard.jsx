import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { getAnalytics } from "../../services/dashboard.services";
import {
  createRequestGuard,
  normalizeDashboardAnalytics,
} from "../../utils/adminState";
import {
  AdminPageHeader,
  AdminButton,
  AdminCard,
  AdminStatCard,
  AdminBadge,
  AdminStateBlock,
} from "../../components/admin/ui/AdminUi";
import {
  FileText,
  Globe,
  EyeOff,
  Tag,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BRAND = "#e95330";
const MUTED = "#62666f";
const GRID_LINE = "#e6e1d9";
const DRAFT_SLATE = "#d5cec2";
const PIE_COLORS = [BRAND, DRAFT_SLATE];

const ChartLoader = () => (
  <div className="admin-chart-loader" role="status" aria-label="Loading chart">
    <span className="admin-chart-loader__spinner" />
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="admin-chart-tooltip">
      {label && <p className="admin-chart-tooltip__label">{label}</p>}
      {payload.map((p) => (
        <p
          key={p.name}
          className="admin-chart-tooltip__val"
          style={{ color: p.color || BRAND }}
        >
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const requestGuard = useRef(createRequestGuard());

  const load = useCallback(async () => {
    const reqId = requestGuard.current.next();
    setLoading(true);
    setError("");
    try {
      const result = await getAnalytics();
      if (!requestGuard.current.isCurrent(reqId)) return;
      setData(result);
    } catch (err) {
      if (!requestGuard.current.isCurrent(reqId)) return;
      setError(
        err?.message || "Could not load dashboard analytics. Please try again.",
      );
    } finally {
      if (requestGuard.current.isCurrent(reqId)) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    load();
    const guard = requestGuard.current;
    return () => {
      guard.invalidate();
    };
  }, [load]);

  const stats = normalizeDashboardAnalytics(data);

  const statusData =
    stats.totalPosts > 0
      ? [
          { name: "Published", value: stats.published },
          { name: "Drafts", value: stats.drafts },
        ]
      : [{ name: "Empty", value: 1 }];

  return (
    <>
      <AdminPageHeader
        eyebrow="Admin / Overview"
        title="Dashboard"
        subtitle="Overview of your blog content"
        actions={
          <AdminButton
            as={Link}
            to="/admin/blogs"
            variant="primary"
            icon={<FileText size={15} />}
          >
            Manage Blogs
          </AdminButton>
        }
      />

      {error ? (
        <AdminStateBlock
          variant="error"
          icon={<AlertCircle size={36} />}
          title="Unable to load dashboard"
          description={error}
          actionLabel="Retry"
          onAction={load}
        />
      ) : (
        <>
          <div className="admin-stats">
            <AdminStatCard
              icon={<FileText size={18} />}
              value={loading ? "—" : stats.totalPosts}
              label="Total Posts"
            />
            <AdminStatCard
              icon={<Globe size={18} />}
              value={loading ? "—" : stats.published}
              label="Published"
              tone="green"
              flag={!loading && stats.published > 0 ? "Live" : undefined}
            />
            <AdminStatCard
              icon={<EyeOff size={18} />}
              value={loading ? "—" : stats.drafts}
              label="Drafts"
              quiet={!loading && stats.drafts === 0}
              flag={!loading && stats.drafts === 0 ? "All clear" : undefined}
            />
            <AdminStatCard
              icon={<Tag size={18} />}
              value={loading ? "—" : stats.totalCategories}
              label="Categories"
            />
          </div>

          <div className="admin-charts">
            <AdminCard
              title="Posts Over Last 6 Months"
              note={!loading ? stats.monthRangeLabel : undefined}
            >
              {loading ? (
                <ChartLoader />
              ) : (
                <ResponsiveContainer width="100%" height={210}>
                  <AreaChart
                    data={stats.postsLast6Months}
                    margin={{ top: 8, right: 16, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="postsGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={BRAND}
                          stopOpacity={0.22}
                        />
                        <stop offset="95%" stopColor={BRAND} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={GRID_LINE}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: MUTED }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 12, fill: MUTED }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="posts"
                      name="Posts"
                      stroke={BRAND}
                      strokeWidth={2.2}
                      fill="url(#postsGrad)"
                      dot={{ r: 4, fill: BRAND, stroke: "#fff", strokeWidth: 2 }}
                      activeDot={{ r: 5 }}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </AdminCard>

            <AdminCard title="Status Breakdown">
              {loading ? (
                <ChartLoader />
              ) : (
                <div className="admin-donut-wrap">
                  <div className="admin-donut-stage">
                    <ResponsiveContainer width="100%" height={186}>
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={56}
                          outerRadius={80}
                          paddingAngle={stats.totalPosts > 0 ? 3 : 0}
                          dataKey="value"
                          stroke="none"
                          isAnimationActive={false}
                        >
                          {statusData.map((_, i) => (
                            <Cell
                              key={i}
                              fill={
                                stats.totalPosts > 0
                                  ? PIE_COLORS[i]
                                  : DRAFT_SLATE
                              }
                            />
                          ))}
                        </Pie>
                        {stats.totalPosts > 0 && (
                          <Tooltip content={<CustomTooltip />} />
                        )}
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="admin-donut-center">
                      <strong>{stats.publishedPct}%</strong>
                      <span>Published</span>
                    </div>
                  </div>
                  <div className="admin-donut-legend">
                    <span className="admin-donut-legend__item">
                      <span
                        className="admin-donut-legend__dot"
                        style={{ background: BRAND }}
                      />
                      Published ({stats.published})
                    </span>
                    <span className="admin-donut-legend__item">
                      <span
                        className="admin-donut-legend__dot"
                        style={{ background: DRAFT_SLATE }}
                      />
                      Drafts ({stats.drafts})
                    </span>
                  </div>
                </div>
              )}
            </AdminCard>
          </div>

          <div className="admin-charts admin-charts--bottom">
            <AdminCard
              title="Posts by Category"
              note={
                !loading
                  ? `${stats.usedCategoriesCount} of ${stats.totalCategories} categories used`
                  : undefined
              }
            >
              {loading ? (
                <ChartLoader />
              ) : !stats.postsByCategory.length ? (
                <div className="admin-chart-empty">No category data yet</div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={stats.postsByCategory}
                    margin={{ top: 8, right: 16, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={GRID_LINE}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="category"
                      tick={{ fontSize: 12, fill: MUTED }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 12, fill: MUTED }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="count"
                      name="Posts"
                      fill={BRAND}
                      radius={[8, 8, 0, 0]}
                      maxBarSize={48}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </AdminCard>

            <AdminCard
              title="Recent Posts"
              actions={
                <Link to="/admin/blogs" className="admin-chart-link">
                  View all <ArrowRight size={13} />
                </Link>
              }
            >
              {loading ? (
                <ChartLoader />
              ) : !stats.recentPosts.length ? (
                <div className="admin-chart-empty">No posts yet</div>
              ) : (
                <ul className="admin-recent-list">
                  {stats.recentPosts.map((b) => (
                    <li key={b.id} className="admin-recent-item">
                      <span className="admin-recent-thumb" aria-hidden="true">
                        <FileText size={15} />
                      </span>
                      <div className="admin-recent-item__info">
                        <Link
                          to={`/admin/blogs/edit/${b.id}`}
                          className="admin-recent-item__title"
                        >
                          {b.title}
                        </Link>
                        <span className="admin-recent-item__cat">
                          {b.category?.name || "Uncategorized"}
                        </span>
                      </div>
                      <AdminBadge variant={b.status || "draft"}>
                        {b.status || "draft"}
                      </AdminBadge>
                    </li>
                  ))}
                </ul>
              )}
            </AdminCard>
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboard;
