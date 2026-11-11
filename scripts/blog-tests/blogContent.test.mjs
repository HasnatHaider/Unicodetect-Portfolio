import test from 'node:test';
import assert from 'node:assert/strict';
import { getSocialSource, getPostPresentation, sanitizeBlogHtml, getStandaloneSocialUrl } from '../../src/utils/blogContent.js';

test('recognizes supported social posts without accepting lookalike hosts or unsafe URLs', () => {
  assert.equal(getSocialSource('https://youtu.be/dQw4w9WgXcQ?t=3').videoId, 'dQw4w9WgXcQ');
  assert.equal(getSocialSource('https://www.youtube.com/shorts/dQw4w9WgXcQ').provider, 'YouTube');
  for (const url of ['http://youtube.com/watch?v=dQw4w9WgXcQ', 'https://youtube.com.evil.test/post', 'https://user@youtube.com/watch', 'https://youtube.com:444/watch', 'javascript:alert(1)']) assert.equal(getSocialSource(url), null);
  assert.equal(getSocialSource('https://www.linkedin.com/posts/example').provider, 'LinkedIn');
});

test('extracts legacy anchors and embedded YouTube sources', () => {
  assert.equal(getPostPresentation({ content: '<p><a href="https://www.instagram.com/p/abc/">View post</a></p>' }).source.provider, 'Instagram');
  const post = getPostPresentation({title:'Youtube', content:'<div data-youtube-video><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe></div>'});
  assert.match(post.image, /i\.ytimg\.com/);
  assert.equal(post.source.videoId, 'dQw4w9WgXcQ');
  assert.equal(post.readMinutes, 0);
});

test('uses authored fields first and useful social fallbacks without displaying raw URLs', () => {
  const post = getPostPresentation({ title:'My take', coverImage:'https://example.com/cover.jpg', excerpt:'My summary', sourceUrl:'https://x.com/example/status/1', sourcePreview:{title:'Remote title',description:'Remote summary',image:'https://example.com/preview.jpg'}});
  assert.equal(post.title, 'My take'); assert.equal(post.image, 'https://example.com/cover.jpg'); assert.equal(post.excerpt, 'My summary');
  const bare = getPostPresentation({content:'<p>https://x.com/example/status/1</p>'});
  assert.equal(bare.title, 'From X'); assert.match(bare.excerpt, /original post on X/); assert.equal(bare.readMinutes, 0);
});

test('ignores stale preview metadata and finds only standalone URL pastes', () => {
  assert.equal(getStandaloneSocialUrl('<p>https://www.instagram.com/p/abc/</p>'), 'https://www.instagram.com/p/abc/');
  assert.equal(getStandaloneSocialUrl('<p>My opinion https://www.instagram.com/p/abc/</p>'), '');
  const post = getPostPresentation({sourceUrl:'https://x.com/a/status/2', sourcePreview:{url:'https://x.com/a/status/1',image:'https://example.com/stale.jpg',title:'Stale'}});
  assert.equal(post.image, ''); assert.notEqual(post.title,'Stale');
});

test('does not hide authored images or embedded media beside a social URL', () => {
  assert.equal(getStandaloneSocialUrl('<img src="https://example.com/authored.jpg"><p>https://www.instagram.com/p/abc/</p>'), '');
  assert.equal(getStandaloneSocialUrl('<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe><p>https://youtu.be/dQw4w9WgXcQ</p>'), '');
});

test('sanitizes unsafe stored HTML while preserving rich text and supported embeds', () => {
  const html = sanitizeBlogHtml('<script>alert(1)</script><h2 onclick="evil()">Title</h2><a href="javascript:evil()">Link</a><img src="https://example.com/a.jpg" onerror="evil()"><iframe src="https://evil.test/embed/x"></iframe><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe><p style="text-align:center;color:#ff0000">Text</p>');
  assert.doesNotMatch(html, /script|onclick|onerror|javascript:|evil\.test/);
  assert.match(html, /<h2>Title<\/h2>/); assert.match(html, /youtube-nocookie\.com\/embed/); assert.match(html, /text-align:center/);
});
