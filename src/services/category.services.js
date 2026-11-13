import {
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  orderBy,
  where,
  query,
  limit,
  startAfter,
  getCount as getCountFromServer,
} from "firebase/firestore/lite";
import { db } from "../utils/FirebaseConfig";
import { generateCustomId } from "../utils/Helper";

const COL = "categories";
const LIMIT = 20;

const toSearchKey = (str) => str.toLowerCase().replace(/\s+/g, "");

export const getCategories = async () => {
  const snap = await getDocs(query(collection(db, COL), orderBy("name")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getCategoryByName = async (name) => {
  const snap = await getDocs(
    query(collection(db, COL), where("name", "==", name)),
  );
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
};

export const createCategory = async (data) => {
  const id = await generateCustomId(COL);
  return setDoc(doc(db, COL, id), {
    ...data,
    id,
    searchKey: toSearchKey(data.name),
    blogIds: [],
    createdAt: serverTimestamp(),
  });
};

export const updateCategory = (id, data) =>
  updateDoc(doc(db, COL, id), {
    ...data,
    ...(data.name ? { searchKey: toSearchKey(data.name) } : {}),
  });

export const deleteCategory = (id) => deleteDoc(doc(db, COL, id));

export const getCategoryCounts = async () => {
  const snap = await getCountFromServer(collection(db, COL));
  return { total: snap.data().count };
};

export const addBlogToCategory = (categoryId, blogId) =>
  updateDoc(doc(db, COL, categoryId), { blogIds: arrayUnion(blogId) });

export const removeBlogFromCategory = (categoryId, blogId) =>
  updateDoc(doc(db, COL, categoryId), { blogIds: arrayRemove(blogId) });

export const searchCategoriesWithPagination = async (search = "", lastDoc = null) => {
  const constraints = [orderBy("searchKey")];
  if (search.trim()) {
    const key = toSearchKey(search.trim());
    constraints.push(where("searchKey", ">=", key));
    constraints.push(where("searchKey", "<=", key + "\uf8ff"));
  }
  constraints.push(limit(LIMIT + 1));
  if (lastDoc) constraints.push(startAfter(lastDoc));
  const snap = await getDocs(query(collection(db, COL), ...constraints));
  const hasMore = snap.docs.length > LIMIT;
  const docs = snap.docs.slice(0, LIMIT);
  return {
    categories: docs.map((d) => ({ id: d.id, ...d.data() })),
    lastDoc: docs.length ? docs[docs.length - 1] : null,
    hasMore,
  };
};
