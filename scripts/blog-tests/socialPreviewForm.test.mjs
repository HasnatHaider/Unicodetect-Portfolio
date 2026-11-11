import test from 'node:test';
import assert from 'node:assert/strict';
import { replaceSocialSource, applySocialPreview, setAuthoredField } from '../../src/utils/socialPreviewForm.js';
const source='https://www.instagram.com/p/one/';
const preview={url:source,title:'Remote title',description:'Remote summary',image:'https://example.com/image.jpg',provider:'Instagram',status:'ready'};

test('fills blank fields and creates a slug, preserving authored overrides',()=>{
  const result=applySocialPreview({sourceUrl:source,title:'My title',excerpt:'',coverImage:'',slug:'my-title'},preview,false);
  assert.equal(result.title,'My title'); assert.equal(result.excerpt,'Remote summary'); assert.equal(result.slug,'my-title');
  const fresh=applySocialPreview({sourceUrl:source,title:'',excerpt:'',coverImage:'',slug:''},preview,true);
  assert.equal(fresh.title,'Remote title'); assert.equal(fresh.slug,'remote-title');
});

test('changing or removing URL clears generated values but retains authored fields',()=>{
  let form=applySocialPreview({sourceUrl:source,title:'',excerpt:'',coverImage:'',slug:''},preview,true);
  form=setAuthoredField(form,'excerpt','My summary');
  const next=replaceSocialSource(form,'https://x.com/a/status/2',true);
  assert.equal(next.title,''); assert.equal(next.coverImage,''); assert.equal(next.excerpt,'My summary'); assert.equal(next.sourcePreview,null); assert.equal(next.slug,'');
  const removed=replaceSocialSource({...form,title:'My title'},'',false);
  assert.equal(removed.title,'My title'); assert.equal(removed.sourceUrl,'');
});

test('ignores stale results and refetch cannot overwrite manually edited values',()=>{
  const original={sourceUrl:'https://x.com/a/status/2',title:'Keep me'};
  assert.equal(applySocialPreview(original,preview,true),original);
  let form=applySocialPreview({sourceUrl:source,title:'',excerpt:'',coverImage:'',slug:''},preview,true);
  form=setAuthoredField(form,'title','My new title');
  const next=applySocialPreview(form,{...preview,title:'Changed remotely'},true);
  assert.equal(next.title,'My new title');
});
