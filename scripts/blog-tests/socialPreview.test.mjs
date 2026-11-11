import test from 'node:test';
import assert from 'node:assert/strict';
import { createSocialPreviewHandler } from '../../server/socialPreviewHandler.js';
const request = (url) => new Request(`http://localhost/api/v1/social-preview?url=${encodeURIComponent(url)}`);

test('extracts decoded OG metadata independent of attribute order and resolves image URLs', async () => {
  const handle = createSocialPreviewHandler({fetcher:async () => new Response('<meta content="A &amp; B" property="og:title"><meta name="description" content="A useful update"><meta property="og:image" content="/cover.jpg">',{headers:{'content-type':'text/html'}})});
  const response = await handle(request('https://www.linkedin.com/posts/test'));
  assert.equal(response.status,200);
  const data = await response.json();
  assert.equal(data.title,'A & B'); assert.equal(data.description,'A useful update'); assert.equal(data.image,'https://www.linkedin.com/cover.jpg'); assert.equal(data.status,'ready');
});

test('rejects unsupported sources and redirect escapes without fetching their targets', async () => {
  let calls=0;
  const handle=createSocialPreviewHandler({fetcher:async () => {calls++;return new Response(null,{status:302,headers:{location:'http://127.0.0.1/private'}});}});
  assert.equal((await handle(request('https://evil.test/a'))).status,400); assert.equal(calls,0);
  const redirected=await (await handle(request('https://www.instagram.com/p/a'))).json();
  assert.equal(calls,1); assert.equal(redirected.status,'unavailable');
});

test('returns usable fallback metadata for provider failures, invalid images and oversized responses', async () => {
  for (const response of [new Response('blocked',{status:403}),new Response('x'.repeat(524289),{headers:{'content-type':'text/html'}}),new Response('<meta property="og:image" content="javascript:alert(1)">',{headers:{'content-type':'text/html'}})]) {
    const handle=createSocialPreviewHandler({fetcher:async()=>response});
    const data=await (await handle(request('https://www.instagram.com/p/a'))).json();
    assert.equal(data.image,''); assert.equal(data.status,'unavailable'); assert.equal(data.provider,'Instagram');
  }
});

test('uses YouTube oEmbed and retains deterministic thumbnail on timeout', async () => {
  let fetched='';
  const handle=createSocialPreviewHandler({fetcher:async url=>{fetched=String(url);return Response.json({title:'Video title',author_name:'Channel',thumbnail_url:'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'});}});
  const data=await (await handle(request('https://youtu.be/dQw4w9WgXcQ'))).json();
  assert.match(fetched,/youtube\.com\/oembed/); assert.equal(data.title,'Video title'); assert.equal(data.status,'ready');
  const failing=createSocialPreviewHandler({fetcher:async()=>{throw new DOMException('Timed out','TimeoutError');}});
  const fallback=await (await failing(request('https://youtu.be/dQw4w9WgXcQ'))).json();
  assert.match(fallback.image,/ytimg/); assert.equal(fallback.status,'partial');
});

test('caches previews and rejects cross-site requests and unsupported methods',async()=>{
  let calls=0;
  const handle=createSocialPreviewHandler({fetcher:async()=>{calls++;return new Response('<title>Post</title>',{headers:{'content-type':'text/html'}});}});
  await handle(request('https://x.com/a/status/1'));await handle(request('https://x.com/a/status/1'));assert.equal(calls,1);
  assert.equal((await handle(new Request('http://localhost/api/v1/social-preview',{method:'POST'}))).status,405);
  assert.equal((await handle(new Request(request('https://x.com/a/status/1'),{headers:{'sec-fetch-site':'cross-site'}}))).status,403);
});

test('cancels rejected upstream bodies instead of leaving downloads running',async()=>{
  for(const [url,headers] of [
    ['https://www.instagram.com/p/a',{'content-type':'text/html','content-length':'600000'}],
    ['https://youtu.be/dQw4w9WgXcQ',{'content-type':'text/html'}],
  ]) {
    let canceled=false;
    const body=new ReadableStream({cancel(){canceled=true;}});
    const handle=createSocialPreviewHandler({fetcher:async()=>new Response(body,{headers})});
    await handle(request(url));assert.equal(canceled,true);
  }
});
