import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const origin='http://127.0.0.1:5173';
const output='.impeccable/review';
await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
const results=[];
const errors=[];
const editorOnly=process.argv.includes('--editor-only');
let posts=[],measures={};
const check=(name,value)=>{assert.ok(value,name);results.push(name);};
async function settle(page) {await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(350);}
async function capture(page,name) {
  await settle(page);
  const height=await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<height;y+=800) {await page.evaluate(top=>window.scrollTo(0,top),y);await page.waitForTimeout(65);}
  await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(250);
  await page.screenshot({path:`${output}/${name}-full.png`,fullPage:true});
  await page.screenshot({path:`${output}/${name}.png`});
}
async function widthCheck(page,name) {check(`${name}: no horizontal overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
if(!editorOnly) {
const context=await browser.newContext({viewport:{width:1440,height:1050},permissions:['clipboard-read','clipboard-write']});
const live=await context.newPage();
live.on('pageerror',error=>errors.push(`live: ${error.message}`));
await live.goto(`${origin}/blog`);
await live.locator('.blog-card').first().waitFor({timeout:25000});
if(await live.getByRole('button',{name:'Decline',exact:true}).isVisible()) await live.getByRole('button',{name:'Decline',exact:true}).click();
await live.locator('.blog-card__media img').first().waitFor();
posts=await live.locator('.blog-card__title a').evaluateAll(links=>links.map(link=>({title:link.textContent,url:link.getAttribute('href')})));
check('Live published index renders existing records',posts.length>0);
const videoCard=live.locator('.blog-card').filter({has:live.locator('.blog-card__platform')}).first();
check('Legacy social card has a thumbnail',await videoCard.locator('img').count()>0);
await capture(live,'desktop'); await widthCheck(live,'Live desktop index');
const article=posts.find(post=>/React vs/.test(post.title))||posts[0];
await live.goto(origin+article.url);
await live.locator('.blog-post__title').waitFor();
check('Live article body is present',await live.locator('.blog-post__content').innerText()!=='');
measures=await live.evaluate(()=>({cover:document.querySelector('.blog-post__cover').getBoundingClientRect().width,body:document.querySelector('.blog-post__article').getBoundingClientRect().width}));
check('Live article uses wide cover and narrow reading column',measures.cover>measures.body);
await live.getByRole('button',{name:'Copy post link'}).click();
await live.getByText('Link copied',{exact:true}).waitFor();results.push('Live copy-link control works');
await capture(live,'post-desktop');
await live.setViewportSize({width:390,height:844});await capture(live,'post-mobile');await widthCheck(live,'Live mobile article');
await live.goto(`${origin}/blog`);await live.locator('.blog-card').first().waitFor();await capture(live,'mobile');await widthCheck(live,'Live mobile index');
const socialPath=await live.locator('.blog-card').filter({has:live.locator('.blog-card__platform')}).first().locator('.blog-card__title a').getAttribute('href');
await live.goto(origin+socialPath);await live.locator('.blog-source').waitFor();
check('Legacy social detail retains source link',await live.locator('.blog-source a').count()===1);
await capture(live,'social-mobile');await widthCheck(live,'Live mobile social post');
const sourceUrl=await live.locator('.blog-source a').getAttribute('href');
const remote=await context.request.get(`${origin}/api/v1/social-preview?url=${encodeURIComponent(sourceUrl)}`,{timeout:12000});
const remoteData=await remote.json();results.push(`Live provider preview: HTTP ${remote.status()}, ${remoteData.provider}, ${remoteData.status}`);
await writeFile(`${output}/live-provider.json`,JSON.stringify(remoteData,null,2));
}

// Browser-only module substitution. No fixture, authentication bypass or database write is shipped to the app.
const fixture=await browser.newContext({viewport:{width:1440,height:1050}});
await fixture.route('**/src/contexts/AuthContext.jsx*',route=>route.fulfill({contentType:'application/javascript',body:`export const AuthProvider=({children})=>children; export const useAuth=()=>({user:{email:'qa@example.invalid'},logout:async()=>{}});`}));
await fixture.route('**/src/services/blog.services.js*',route=>route.fulfill({contentType:'application/javascript',body:`
const posts=[
{id:'article',title:'A thoughtful approach to web development',slug:'fixture-article',excerpt:'Build software with clarity.',coverImage:'/og-image.png',category:{name:'Engineering',searchKey:'engineering'},content:'<h2>Start with the reader</h2><p>A useful article with a clear structure.</p>',status:'published',createdAt:{seconds:1794268800}},
{id:'social',title:'A social update',slug:'fixture-social',sourceUrl:'https://www.instagram.com/p/example/',content:'',status:'published',createdAt:{seconds:1794268800}},
{id:'broken',title:'A missing cover still tells a story',slug:'fixture-broken',coverImage:'/missing-blog-qa.jpg',content:'<p>A short update.</p>',status:'published'},
{id:'more',title:'More engineering ideas',slug:'fixture-more',content:'<p>More content.</p>',status:'published'}];
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
export async function getBlogsWithPagination({search='',categorySearchKey='',lastDoc}={}) { if(search==='error') throw Error('Fixture offline'); if(search==='slow') {await delay(1200);return {blogs:[{...posts[0],title:'Stale response'}],hasMore:false,lastDoc:null};} let items=posts.filter(post=>(!search||post.title.toLowerCase().includes(search.toLowerCase()))&&(!categorySearchKey||post.category?.searchKey===categorySearchKey));return {blogs:items.slice(lastDoc?3:0,lastDoc?4:3),hasMore:!lastDoc&&items.length>3,lastDoc:'page1'}; }
export async function getBlogBySlug(slug) {if(slug==='fixture-error')throw Error('Fixture offline');return posts.find(post=>post.slug===slug)||null;}
export async function getBlogById(id){return posts.find(post=>post.id===id)||null;}
export async function getBlogsCounts(){return {total:4,published:4,drafts:0};}
export async function createBlog(data){window.__blogSaved=data;}
export async function updateBlog(id,data){window.__blogSaved={...data,id};}
export async function deleteBlog(){throw Error('QA never deletes records');}
`}));
await fixture.route('**/src/services/category.services.js*',route=>route.fulfill({contentType:'application/javascript',body:`export async function searchCategoriesWithPagination(){return {categories:[{id:'engineering',name:'Engineering',searchKey:'engineering'}],hasMore:false,lastDoc:null};}`}));
await fixture.route('**/api/v1/social-preview?*',async route=>{
  const url=new URL(route.request().url()).searchParams.get('url');
  if(url.includes('/slow/')) await new Promise(resolve=>setTimeout(resolve,1200));
  const blocked=url.includes('blocked');
  await route.fulfill({json:{url,provider:'Instagram',title:blocked?'':url.includes('/two/')?'Second preview':'Fetched social title',description:blocked?'':'Fetched description',image:blocked?'':'/og-image.png',status:blocked?'unavailable':'ready'}});
});
const page=await fixture.newPage();page.on('pageerror',error=>errors.push(`fixture: ${error.message}`));
page.setDefaultTimeout(30000);
if(!editorOnly) {
await page.goto(`${origin}/blog`);await page.locator('.blog-card').first().waitFor();
if(await page.getByRole('button',{name:'Decline',exact:true}).isVisible()) await page.getByRole('button',{name:'Decline',exact:true}).click();
await page.locator('.blog-card').nth(2).locator('.blog-media__fallback').waitFor();results.push('Broken image falls back to branded media');
await page.getByRole('button',{name:'Load more posts'}).click();await page.locator('.blog-card').nth(3).waitFor();results.push('Load more appends records');
await page.getByRole('searchbox',{name:'Search posts'}).fill('zzzz');await page.getByRole('heading',{name:'No matching posts'}).waitFor();results.push('Search empty state renders');
await page.getByRole('button',{name:'View all posts'}).click();await page.locator('.blog-card').first().waitFor();
await page.getByRole('button',{name:'All categories'}).click();await page.getByRole('button',{name:'Engineering',exact:true}).click();await page.waitForTimeout(150);check('Category filter narrows posts',await page.locator('.blog-card').count()===1);
await page.getByRole('button',{name:'Clear filters'}).click();
const search=page.getByRole('searchbox',{name:'Search posts'});
await search.fill('slow');await page.waitForTimeout(400);await search.fill('social');await page.waitForTimeout(1500);const matchingTitles=await page.locator('.blog-card__title').allTextContents();check('Obsolete search response ignored',matchingTitles.length===1&&matchingTitles[0]==='A social update');
await search.fill('error');await page.getByRole('alert').waitFor();results.push('Listing network failure shows retry');
await page.goto(`${origin}/blog/missing`);await page.getByRole('heading',{name:'Post not found'}).waitFor();results.push('Missing post state renders');
await page.goto(`${origin}/blog/fixture-error`);await page.getByRole('heading',{name:'We couldn’t load this post.'}).waitFor();results.push('Post network failure is distinct from 404');
await page.goto(`${origin}/blog/fixture-social`);await page.locator('.blog-source').waitFor();await capture(page,'fallback-social-desktop');await widthCheck(page,'Fallback social detail');
}
await page.goto(`${origin}/admin/blogs/new`);await page.getByLabel('Social post URL').waitFor();
const sourceInput=page.getByLabel('Social post URL');
const title=page.getByPlaceholder('Enter post title…');
await sourceInput.fill('https://www.instagram.com/p/one/');await page.getByText('Preview fetched.',{exact:false}).waitFor();check('Source paste fetches title',await title.inputValue()==='Fetched social title');
await title.fill('My authored title');
await sourceInput.fill('https://www.instagram.com/p/two/');await page.getByText('Preview fetched.',{exact:false}).waitFor();check('Replacing source preserves authored title',await title.inputValue()==='My authored title');
await page.getByRole('button',{name:'Remove source'}).click();check('Removing source clears generated excerpt',await page.getByPlaceholder('Short summary shown in the blog listing…').inputValue()==='');
await title.fill('');
await page.locator('.tiptap').evaluate(element=>{element.focus();const data=new DataTransfer();data.setData('text/plain','https://www.instagram.com/p/one/');element.dispatchEvent(new ClipboardEvent('paste',{clipboardData:data,bubbles:true,cancelable:true}));});
await page.getByText('Preview fetched.',{exact:false}).waitFor();check('Standalone body paste starts preview workflow',await title.inputValue()==='Fetched social title');
await sourceInput.fill('https://www.instagram.com/p/slow/');await page.waitForTimeout(600);await sourceInput.fill('https://www.instagram.com/p/two/');await page.getByText('Preview fetched.',{exact:false}).waitFor();await page.waitForTimeout(900);check('Stale preview result ignored',await title.inputValue()==='Second preview');
await capture(page,'editor-desktop');
await page.setViewportSize({width:390,height:844});await capture(page,'editor-mobile');await widthCheck(page,'Mobile editor');
await sourceInput.fill('https://www.instagram.com/p/blocked/');await page.getByText('This platform couldn’t provide a preview.',{exact:false}).waitFor();results.push('Blocked preview permits manual authoring and retry');
await title.fill('Manual social post');await page.getByPlaceholder('Short summary shown in the blog listing…').fill('Manual description');
await page.getByRole('button',{name:'Publish Post',exact:true}).click();await page.waitForURL('**/admin/blogs');
const saved=await page.evaluate(()=>window.__blogSaved);check('Manual post saves source fields through existing publishing flow (browser fixture only)',saved?.title==='Manual social post'&&saved.sourceUrl.includes('/blocked/'));
check('No uncaught browser errors',errors.length===0);
await writeFile(`${output}/${editorOnly?'editor-confirmation':'qa-results'}.json`,JSON.stringify({results,errors,livePosts:posts,measures},null,2));
console.log(JSON.stringify({checks:results.length,results,errors},null,2));
} finally { await browser.close(); }
