import {
  collection,
  getDocs,
  getCount as getCountFromServer,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore/lite";
import { db } from "../utils/FirebaseConfig";

const BLOGS = "blogs";
const CATS = "categories";

export const getAnalytics = async () => {
  const blogsRef = collection(db, BLOGS);
  const catsRef = collection(db, CATS);

  const now = new Date();

  // 6 monthly buckets: [start, end)
  const monthBuckets = Array.from({ length: 6 }, (_, i) => {
    const start = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - 5 + i + 1, 1);
    return {
      label: start.toLocaleString("en-US", { month: "short" }),
      start,
      end,
    };
  });

  // All queries fire in parallel — no waterfall
  const [
    totalSnap,
    publishedSnap,
    draftsSnap,
    catsCountSnap,
    recentSnap,
    catsDocsSnap,
    ...monthlySnaps
  ] = await Promise.all([
    // Total Posts
    getCountFromServer(blogsRef),
    // Published
    getCountFromServer(query(blogsRef, where("status", "==", "published"))),
    // Drafts
    getCountFromServer(query(blogsRef, where("status", "==", "draft"))),
    // Categories
    getCountFromServer(catsRef),
    // Recent 5 posts
    getDocs(query(blogsRef, orderBy("createdAt", "desc"), limit(5))),
    // Category docs (for blogIds counts)
    getDocs(catsRef),
    // Per-month post counts (6 queries)
    ...monthBuckets.map(({ start, end }) =>
      getCountFromServer(
        query(
          blogsRef,
          where("createdAt", ">=", Timestamp.fromDate(start)),
          where("createdAt", "<", Timestamp.fromDate(end)),
        ),
      ),
    ),
  ]);

  return {
    totalPosts: totalSnap.data().count,
    published: publishedSnap.data().count,
    drafts: draftsSnap.data().count,
    totalCategories: catsCountSnap.data().count,

    recentPosts: recentSnap.docs.map((d) => ({ id: d.id, ...d.data() })),

    // blogIds.length from each category doc — no extra query needed
    postsByCategory: catsDocsSnap.docs
      .map((d) => ({
        category: d.data().name,
        count: (d.data().blogIds || []).length,
      }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 7),

    postsLast6Months: monthBuckets.map(({ label }, i) => ({
      month: label,
      posts: monthlySnaps[i].data().count,
    })),
  };
};
