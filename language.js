'use strict';
(() => {
 const select=document.getElementById('site-language');
 if(!select)return;
 const source=new URL(select.dataset.sourcePage,'https://gobiharan1.github.io/loving_lanka/');
 source.searchParams.set('v','20261030-nadika');
 const current=new URL(location.href);
 const translated=current.hostname.endsWith('.translate.goog');
 for(const key of ['journey','interest'])if(current.searchParams.has(key))source.searchParams.set(key,current.searchParams.get(key));
 source.hash=current.hash;
 if(translated){
  document.documentElement.classList.add('translated-view');
  // Keep direct contact links usable after Google's proxy rewrites URLs.
  document.querySelectorAll('a[href]').forEach(link=>{
   const href=link.getAttribute('href');
   if(href.startsWith('tel:')||href.startsWith('mailto:')){
    const direct=new URL(href);['_x_tr_sl','_x_tr_tl','_x_tr_hl'].forEach(key=>direct.searchParams.delete(key));link.href=direct.href;
   }else{
    const url=new URL(href,location.href);
    if(url.hostname==='translate.google.com'&&url.searchParams.has('u')){
     const original=new URL(url.searchParams.get('u'));
     if(original.hostname!==source.hostname)link.href=original.href;
    }
   }
  });
 }
 const active=translated?current.searchParams.get('_x_tr_tl'):'en';
 select.value=['en','de','fr'].includes(active)?active:'en';
 select.addEventListener('change',()=>{
  const language=select.value;
  if(language==='en'){
   if(translated)location.assign(source.href);
   return;
  }
  const target=new URL('https://translate.google.com/translate');
  target.searchParams.set('hl',language);target.searchParams.set('sl','en');target.searchParams.set('tl',language);target.searchParams.set('u',source.href);
  location.assign(target.href);
 });
})();
