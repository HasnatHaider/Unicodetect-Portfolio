import { Parser } from 'htmlparser2';
import { getSocialSource, safeImageUrl } from '../src/utils/socialSource.js';

const MAX_BYTES = 512 * 1024;
const json = (data, status = 200) => Response.json(data, {status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});

async function boundedText(response) {
  if (Number(response.headers.get('content-length')) > MAX_BYTES) { await response.body?.cancel(); throw new Error('Response too large'); }
  if (!response.body) return '';
  const reader=response.body.getReader();
  const decoder=new TextDecoder();
  let bytes=0, text='';
  try {
    while (true) {
      const {done,value}=await reader.read();
      if (done) break;
      bytes+=value.byteLength;
      if (bytes>MAX_BYTES) throw new Error('Response too large');
      text+=decoder.decode(value,{stream:true});
    }
    return text+decoder.decode();
  } finally { await reader.cancel(); }
}

export function extractSocialMetadata(html, baseUrl) {
  const meta={};
  let inTitle=false, title='';
  const parser=new Parser({
    onopentag(name,attrs) {
      if(name==='meta') { const key=(attrs.property||attrs.name||'').toLowerCase(); if(!meta[key] && attrs.content) meta[key]=attrs.content; }
      if(name==='title') inTitle=true;
    },
    ontext(value) { if(inTitle) title+=value; },
    onclosetag(name) { if(name==='title') inTitle=false; },
  },{decodeEntities:true});
  parser.end(html);
  const clean=value=>String(value||'').replace(/\s+/g,' ').trim();
  let image='';
  try { image=safeImageUrl(new URL(meta['og:image:secure_url']||meta['og:image']||meta['twitter:image']||'',baseUrl).href); } catch { /* manual image remains available */ }
  if (!meta['og:image:secure_url'] && !meta['og:image'] && !meta['twitter:image']) image='';
  const heading=clean(meta['og:title']||meta['twitter:title']||title).slice(0,300);
  // Login/challenge pages are not post previews.
  if (/^(log ?in|sign ?in|sign ?up|access denied|just a moment|security check|page not found|error)(\b|$)/i.test(heading)) return {title:'',description:'',image:''};
  return {title:heading,description:clean(meta['og:description']||meta['twitter:description']||meta.description).slice(0,1000),image};
}

export function createSocialPreviewHandler({fetcher=fetch, now=Date.now}={}) {
  const cache=new Map(), quotas=new Map();
  let active=0;
  async function fetchProvider(url,signal) {
    let target=url;
    for(let redirects=0;redirects<=3;redirects++) {
      if(!getSocialSource(target)) throw new Error('Unsupported redirect');
      const response=await fetcher(target,{redirect:'manual',signal,headers:{Accept:'text/html, application/json','User-Agent':'UnicodeTech-LinkPreview/1.0'}});
      if([301,302,303,307,308].includes(response.status)) {
        await response.body?.cancel();
        target=new URL(response.headers.get('location'),target).href;
        continue;
      }
      if(!response.ok) { await response.body?.cancel(); throw new Error('Provider unavailable'); }
      return {response,url:target};
    }
    throw new Error('Too many redirects');
  }
  return async function handle(request) {
    if(request.method!=='GET') return new Response(null,{status:405,headers:{Allow:'GET'}});
    const location=new URL(request.url);
    const origin=request.headers.get('origin');
    if(request.headers.get('sec-fetch-site')==='cross-site' || (origin && origin!==location.origin)) return json({error:'Same-origin requests only.'},403);
    const raw=location.searchParams.get('url')||'';
    const source=raw.length<=2048 ? getSocialSource(raw) : null;
    if(!source) return json({error:'Use an HTTPS YouTube, Instagram, Facebook, LinkedIn, X or TikTok link.'},400);
    const key=(request.headers.get('x-forwarded-for')||'local').split(',')[0].trim().slice(0,80);
    const quota=quotas.get(key);
    if(quota && quota.until>now() && quota.count>=30) return json({error:'Too many preview requests. Try again in a minute.'},429);
    if(quotas.size>=500 && !quotas.has(key)) quotas.delete(quotas.keys().next().value);
    quotas.set(key,quota && quota.until>now() ? {...quota,count:quota.count+1} : {until:now()+60000,count:1});
    const cached=cache.get(source.url);
    if(cached?.until>now()) return json(cached.data);
    if(active>=4) return json({error:'Preview service is busy. Please retry shortly.'},429);
    active++;
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),8000);
    let metadata={title:'',description:'',image:source.videoId?`https://i.ytimg.com/vi/${source.videoId}/hqdefault.jpg`:''};
    try {
      const endpoint=source.videoId ? `https://www.youtube.com/oembed?url=${encodeURIComponent(source.url)}&format=json` : source.url;
      const {response,url}=await fetchProvider(endpoint,controller.signal);
      const type=response.headers.get('content-type')||'';
      if(source.videoId) {
        if(!type.includes('json')) { await response.body?.cancel(); throw new Error('Unexpected response'); }
        const data=JSON.parse(await boundedText(response));
        metadata={title:String(data.title||'').slice(0,300),description:data.author_name?`A video by ${String(data.author_name).slice(0,200)} on YouTube.`:'',image:safeImageUrl(data.thumbnail_url)||metadata.image};
      } else {
        if(!type.includes('text/html')) { await response.body?.cancel(); throw new Error('Unexpected response'); }
        metadata=extractSocialMetadata(await boundedText(response),url);
      }
    } catch { /* Providers may block previews; preserve the source and allow manual editing. */ }
    finally {controller.abort();clearTimeout(timer);active--;}
    const status=metadata.title && metadata.image ? 'ready' : metadata.title || metadata.description || metadata.image ? 'partial' : 'unavailable';
    const data={...source,...metadata,status};
    if(cache.size>=200) cache.delete(cache.keys().next().value);
    cache.set(source.url,{data,until:now()+(status==='ready'?900000:60000)});
    return json(data);
  };
}
