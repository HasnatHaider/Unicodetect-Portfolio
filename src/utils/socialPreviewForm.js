import { getSocialSource } from './socialSource.js';
const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

export function replaceSocialSource(form, sourceUrl, autoSlug) {
  if (getSocialSource(form.sourceUrl)?.url && getSocialSource(form.sourceUrl)?.url === getSocialSource(sourceUrl)?.url) return {...form,sourceUrl};
  const next={...form,sourceUrl,sourcePreview:null};
  for(const [field,value] of Object.entries(form.sourcePreview?.generated || {})) {
    if(form[field]===value) next[field]='';
  }
  if(autoSlug && next.title!==form.title) next.slug=slugify(next.title);
  return next;
}

export function applySocialPreview(form, preview, autoSlug) {
  if(!getSocialSource(form.sourceUrl) || getSocialSource(form.sourceUrl)?.url!==preview.url) return form;
  const next={...form};
  const generated={};
  const values={title:preview.title,excerpt:preview.description,coverImage:preview.image};
  for(const [field,value] of Object.entries(values)) {
    const previous=form.sourcePreview?.generated?.[field];
    if((!form[field]?.trim() || (previous && form[field]===previous)) && value) {
      next[field]=value; generated[field]=value;
    } else if(previous && form[field]===previous) generated[field]=previous;
  }
  if(autoSlug && next.title!==form.title) next.slug=slugify(next.title);
  next.sourcePreview={...preview,generated};
  return next;
}

export function setAuthoredField(form, field, value) {
  if(!form.sourcePreview?.generated?.[field]) return {...form,[field]:value};
  const generated={...form.sourcePreview.generated};
  delete generated[field];
  return {...form,[field]:value,sourcePreview:{...form.sourcePreview,generated}};
}
