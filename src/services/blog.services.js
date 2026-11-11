import {
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
  getCountFromServer,
  startAfter,
} from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";
import { generateCustomId } from "../utils/Helper";
import { addBlogToCategory, removeBlogFromCategory } from "./category.services";

const COL = "blogs";
const LIMIT = 20;

const toTitleKey = (str) => str.toLowerCase().replace(/\s+/g, "");

export const createBlog = async (data) => {
  const id = await generateCustomId(COL);
  await setDoc(doc(db, COL, id), {
    id,
    titleKey: toTitleKey(data.title || ""),
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || "",
    coverImage: data.coverImage || "",
    category: data.category || null,
    content: data.content || "",
    sourceUrl: data.sourceUrl || "",
    sourcePreview: data.sourcePreview || null,
    status: data.status || "draft",
    tags: Array.isArray(data.tags) ? data.tags : [],
    metaTitle: data.metaTitle || "",
    metaDescription: data.metaDescription || "",
    ogImageUrl: data.ogImageUrl || "",
    ogType: data.ogType || "article",
    twitterCard: data.twitterCard || "summary_large_image",
    twitterImageUrl: data.twitterImageUrl || "",
    twitterTitle: data.twitterTitle || "",
    twitterDescription: data.twitterDescription || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  if (data.category?.id) {
    await addBlogToCategory(data.category.id, id);
  }
};

export const updateBlog = async (id, data) => {
  const current = await getBlogById(id);
  await updateDoc(doc(db, COL, id), {
    ...data,
    ...(data.title ? { titleKey: toTitleKey(data.title) } : {}),
    updatedAt: serverTimestamp(),
  });
  const oldCatId = current?.category?.id || "";
  const newCatId = data.category?.id || "";
  if (oldCatId !== newCatId) {
    if (oldCatId) await removeBlogFromCategory(oldCatId, id);
    if (newCatId) await addBlogToCategory(newCatId, id);
  }
};

export const deleteBlog = async (id) => {
  const blog = await getBlogById(id);
  await deleteDoc(doc(db, COL, id));
  if (blog?.category?.id) {
    await removeBlogFromCategory(blog.category.id, id);
  }
};

export const getBlogsWithPagination = async ({
  status = "",
  search = "",
  categorySearchKey = "",
  lastDoc = null,
} = {}) => {
  const ref = collection(db, COL);
  const constraints = [];

  if (search.trim()) {
    const key = toTitleKey(search.trim());
    if (status) constraints.push(where("status", "==", status));
    if (categorySearchKey) constraints.push(where("category.searchKey", "==", categorySearchKey));
    constraints.push(orderBy("titleKey"));
    constraints.push(where("titleKey", ">=", key));
    constraints.push(where("titleKey", "<=", key + "\uf8ff"));
  } else {
    if (status) constraints.push(where("status", "==", status));
    if (categorySearchKey) constraints.push(where("category.searchKey", "==", categorySearchKey));
    constraints.push(orderBy("createdAt", "desc"));
  }

  constraints.push(limit(LIMIT + 1));
  if (lastDoc) constraints.push(startAfter(lastDoc));

  const snap = await getDocs(query(ref, ...constraints));
  const hasMore = snap.docs.length > LIMIT;
  const docs = snap.docs.slice(0, LIMIT);
  return {
    blogs: docs.map((d) => ({ id: d.id, ...d.data() })),
    lastDoc: docs.length ? docs[docs.length - 1] : null,
    hasMore,
  };
};

export const getBlogsCounts = async () => {
  const blogsRef = collection(db, COL);

  const [totalSnap, publishedSnap, draftsSnap] = await Promise.all([
    getCountFromServer(blogsRef),
    getCountFromServer(query(blogsRef, where("status", "==", "published"))),
    getCountFromServer(query(blogsRef, where("status", "==", "draft"))),
  ]);

  return {
    total: totalSnap.data().count,
    published: publishedSnap.data().count,
    drafts: draftsSnap.data().count,
  };
};

export const getAllBlogs = async () => {
  const snap = await getDocs(
    query(collection(db, COL), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getPublishedBlogs = async () => {
  const snap = await getDocs(
    query(
      collection(db, COL),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
    ),
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getBlogById = async (id) => {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

export const getBlogBySlug = async (slug) => {
  const snap = await getDocs(
    query(
      collection(db, COL),
      where("slug", "==", slug),
      where("status", "==", "published"),
      limit(1),
    ),
  );
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
};
