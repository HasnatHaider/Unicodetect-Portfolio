import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  createRequestGuard,
  normalizeDashboardAnalytics,
  reconcileUpdatedBlogList,
  getEditorChecklist,
  getCategoryInitials,
  getCategoryTone,
} from '../../src/utils/adminState.js';

test('admin design tokens use website typography and coral palette without Instrument Serif', async () => {
  const adminCss = await readFile(new URL('../../src/assets/styles/pages/admin.css', import.meta.url), 'utf8');
  assert.doesNotMatch(adminCss, /Instrument\s+Serif/i);
  assert.match(adminCss, /--adm-font-display:\s*Manrope/i);
  assert.match(adminCss, /--adm-brand:\s*#e95330/i);
  assert.match(adminCss, /--adm-paper:\s*#(?:faf9f6|fbfaf7|fbfbfb)/i);

  const uiSource = await readFile(new URL('../../src/components/admin/ui/AdminUi.jsx', import.meta.url), 'utf8');
  for (const name of [
    'AdminPageHeader',
    'AdminButton',
    'AdminIconButton',
    'AdminCard',
    'AdminStatCard',
    'AdminBadge',
    'AdminToolbar',
    'AdminTable',
    'AdminField',
    'AdminModal',
    'AdminStateBlock',
    'AdminToast',
  ]) {
    assert.match(uiSource, new RegExp(`export\\s+(const|function)\\s+${name}\\b`));
  }
});

test('createRequestGuard rejects stale and invalidated request IDs', () => {
  const guard = createRequestGuard();
  const first = guard.next();
  const second = guard.next();
  assert.equal(guard.isCurrent(first), false);
  assert.equal(guard.isCurrent(second), true);
  guard.invalidate();
  assert.equal(guard.isCurrent(second), false);
});

test('normalizeDashboardAnalytics safely handles null, zero, and populated payloads', () => {
  const empty = normalizeDashboardAnalytics(null);
  assert.equal(empty.totalPosts, 0);
  assert.equal(empty.published, 0);
  assert.equal(empty.drafts, 0);
  assert.equal(empty.totalCategories, 0);
  assert.equal(empty.publishedPct, 0);
  assert.equal(empty.usedCategoriesCount, 0);
  assert.deepEqual(empty.postsLast6Months, []);
  assert.deepEqual(empty.postsByCategory, []);
  assert.deepEqual(empty.recentPosts, []);

  const populated = normalizeDashboardAnalytics({
    totalPosts: 4,
    published: 3,
    drafts: 1,
    totalCategories: 5,
    postsLast6Months: [
      { month: 'Jun', posts: 0 },
      { month: 'Jul', posts: 1 },
      { month: 'Nov', posts: 3 },
    ],
    postsByCategory: [
      { category: 'AI & Automation', count: 2 },
      { category: 'Web Development', count: 1 },
    ],
    recentPosts: [{ id: '1', title: 'Hello', status: 'published' }],
  });
  assert.equal(populated.publishedPct, 75);
  assert.equal(populated.usedCategoriesCount, 2);
  assert.match(populated.monthRangeLabel, /Jun\s*[—–-]\s*Nov/);
  assert.equal(populated.recentPosts.length, 1);
});

test('reconcileUpdatedBlogList updates matching items and removes items that no longer match active filters', () => {
  const baseBlogs = [
    { id: '1', title: 'React Guide', slug: 'react-guide', status: 'published' },
    { id: '2', title: 'AI Workflows', slug: 'ai-workflows', status: 'published' },
  ];

  // Still matches status='published' -> updated in place
  const updatedInPlace = reconcileUpdatedBlogList(
    { blogs: baseBlogs, status: 'published', search: '' },
    { id: '1', title: 'React 19 Guide', slug: 'react-guide', status: 'published' },
  );
  assert.equal(updatedInPlace.length, 2);
  assert.equal(updatedInPlace[0].title, 'React 19 Guide');

  // Status changed to 'draft' while status='published' filter is active -> removed from filtered view
  const removedByStatus = reconcileUpdatedBlogList(
    { blogs: baseBlogs, status: 'published', search: '' },
    { id: '1', title: 'React 19 Guide', slug: 'react-guide', status: 'draft' },
  );
  assert.equal(removedByStatus.length, 1);
  assert.equal(removedByStatus[0].id, '2');

  // Title changed so it no longer matches active search='react' -> removed from filtered view
  const removedBySearch = reconcileUpdatedBlogList(
    { blogs: baseBlogs, status: '', search: 'react' },
    { id: '1', title: 'Vue Guide', slug: 'vue-guide', status: 'published' },
  );
  assert.equal(removedBySearch.length, 1);
  assert.equal(removedBySearch[0].id, '2');
});

test('getEditorChecklist evaluates post readiness across title, category, excerpt, and media', () => {
  const emptyCheck = getEditorChecklist(
    { title: '', category: null, excerpt: '', coverImage: '', sourceUrl: '' },
    { image: '', excerpt: '', source: null },
  );
  assert.equal(emptyCheck.completedCount, 0);
  assert.equal(emptyCheck.totalCount, 4);
  assert.equal(emptyCheck.ready, false);

  const readyCheck = getEditorChecklist(
    {
      title: 'Shipping Admin UI',
      category: { id: 'cat-1', name: 'Engineering' },
      excerpt: 'How we unified the admin experience.',
      coverImage: '',
      sourceUrl: 'https://youtu.be/dQw4w9WgXcQ',
    },
    {
      image: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      excerpt: 'How we unified the admin experience.',
      source: { provider: 'YouTube', url: 'https://youtu.be/dQw4w9WgXcQ' },
    },
  );
  assert.equal(readyCheck.completedCount, 4);
  assert.equal(readyCheck.ready, true);
  assert.ok(readyCheck.items.every((item) => item.ok));
});

test('getCategoryInitials and getCategoryTone produce clean deterministic badges', () => {
  assert.equal(getCategoryInitials('AI & Automation'), 'AA');
  assert.equal(getCategoryInitials('Mobile App Development'), 'MA');
  assert.equal(getCategoryInitials('Web Development'), 'WD');
  assert.equal(getCategoryInitials('SaaS'), 'SA');
  assert.equal(getCategoryInitials(''), 'CT');
  assert.equal(getCategoryTone(0), 'c1');
  assert.equal(getCategoryTone(1), 'c2');
  assert.equal(getCategoryTone(2), 'c3');
  assert.equal(getCategoryTone(3), 'c4');
  assert.equal(getCategoryTone(4), 'c1');
});
