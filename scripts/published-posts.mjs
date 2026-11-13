// Reads published blog posts from Firestore at build time, using the same
// public web config and read rules as the browser (no admin credentials).
import { existsSync } from "node:fs";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;

/** Firestore Timestamps become {seconds, nanoseconds}, which formatBlogDate reads. */
const toPlain = (value) => JSON.parse(JSON.stringify(value));

export async function loadPublishedPosts() {
  if (existsSync(".env")) process.loadEnvFile(".env");
  const env = process.env;
  if (!env.VITE_FIREBASE_PROJECT_ID || !env.VITE_FIREBASE_API_KEY) {
    throw new Error("VITE_FIREBASE_PROJECT_ID / VITE_FIREBASE_API_KEY not set");
  }
  const app = initializeApp(
    {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      appId: env.VITE_FIREBASE_APP_ID,
    },
    "prerender",
  );
  const snap = await getDocs(
    query(
      collection(getFirestore(app), "blogs"),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
    ),
  );
  return snap.docs
    .map((doc) => toPlain({ id: doc.id, ...doc.data() }))
    .filter((post) => {
      if (SLUG.test(post.slug ?? "")) return true;
      console.warn(`Skipping blog post ${post.id}: unusable slug "${post.slug}"`);
      return false;
    });
}

/** YYYY-MM-DD of the latest edit, for sitemap <lastmod>. */
export function postLastmod(post) {
  const stamp = post.updatedAt ?? post.createdAt;
  const date = stamp?.seconds ? new Date(stamp.seconds * 1000) : new Date();
  return date.toISOString().slice(0, 10);
}
