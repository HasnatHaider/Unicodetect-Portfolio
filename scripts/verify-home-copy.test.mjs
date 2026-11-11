import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

test('home copy has the full original structure and no withdrawn claims', async () => {
  const html = await readFile('dist/home-copy.html', 'utf8');
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  assert.equal((html.match(/ service-card /g) ?? []).length, 4);
  assert.equal((html.match(/ home-how-work-card /g) ?? []).length, 5);
  assert.equal((html.match(/<details\b/g) ?? []).length, 8);
  assert.ok(text.includes('150+'));
  assert.ok(text.includes('Since 2016'));
  for (const claim of ['160+', 'since 2018', '8+ Years', '3+ Multi-Year', '5+ Countries', 'US, UK, AUS, CA', 'Senior-led', '1–2 weeks', 'monthly retainers', 'You own everything', '12+ months', 'MOST POPULAR', 'launched on schedule']) {
    assert.ok(!text.includes(claim), `Withdrawn claim: ${claim}`);
  }
  for (const id of ['industries', 'technology', 'why-unicodetech']) {
    assert.ok(html.includes(`id="${id}"`));
  }
  for (const path of ['services']) {
    assert.ok(html.includes(`href="/${path}"`));
    await access(`dist/${path}.html`);
  }
  assert.ok(html.includes('content="noindex, nofollow"'));
  const original = await readFile('dist/index.html', 'utf8');
  assert.ok(!original.includes('home-copy-page'));
  assert.ok(!original.includes('We Build AI-Powered Products That Scale'));
});

test('service and FAQ directories preserve the full content', async () => {
  const services = await readFile('dist/services.html', 'utf8');
  const faq = await readFile('dist/faq.html', 'utf8');
  assert.equal((services.match(/ service-card /g) ?? []).length, 15);
  assert.equal((faq.match(/<details\b/g) ?? []).length, 8);
});
