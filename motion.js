'use strict';
(() => {
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const motionAllowed=()=>!preference.matches;
 const controllers=[];
 window.siteMotion={};
 const animate=(element,frames,options)=>motionAllowed()&&element?.animate?element.animate(frames,options):null;
 // Each slider owns its timer: manual input resets it, inactive sliders stop it.
 function carousel({name,element,interval,count,current,render,transition}){
  const button=document.querySelector(`[data-slider-pause="${name}"]`);
  const progress=button.parentElement.querySelector('.slider-progress-fill');
  let userPaused=false,hovered=false,focused=false,inView=false,timer,progressAnimation;
  const live=name==='hero'?document.getElementById('hero-copy'):element;
  function refresh(){
   clearTimeout(timer);progressAnimation?.cancel();
   const playing=!userPaused&&!hovered&&!focused&&inView&&!document.hidden&&motionAllowed();
   element.dataset.playing=String(playing);
   if(name==='hero')document.getElementById('hero-image').getAnimations().forEach(a=>playing?a.play():a.pause());
   live.setAttribute('aria-live',playing?'off':'polite');
   button.disabled=preference.matches;
   button.setAttribute('aria-pressed',String(userPaused||preference.matches));
   button.setAttribute('aria-label',`${userPaused?'Play':'Pause'} ${name==='hero'?'hero':'testimonial'} slideshow`);
   button.querySelector('.playback-label').textContent=preference.matches?'Still':userPaused?'Play':'Pause';
   button.querySelector('[aria-hidden]').textContent=userPaused?'▶':'Ⅱ';
   button.title=preference.matches?'Automatic motion is off because of your reduced-motion preference':'';
   if(playing){
    progressAnimation=animate(progress,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:interval,easing:'linear',fill:'forwards'});
    timer=setTimeout(()=>go(current()+1,false),interval);
   }
  }
  function go(index,manual=false){
   index=(index+count)%count;
   if(manual)live.setAttribute('aria-live','polite');
   if(manual||index!==current())transition(index,render);
   refresh();
  }
  button.addEventListener('click',()=>{userPaused=!userPaused;refresh();});
  element.addEventListener('mouseenter',()=>{hovered=true;refresh();});
  element.addEventListener('mouseleave',()=>{hovered=false;refresh();});
  // Stop during keyboard interaction without changing the visitor's pause choice.
  element.addEventListener('focusin',()=>{focused=true;refresh();});
  element.addEventListener('focusout',event=>{if(!element.contains(event.relatedTarget)){focused=false;refresh();}});
  if('IntersectionObserver' in window){
   new IntersectionObserver(entries=>{const visible=entries[0].isIntersecting;if(visible!==inView){inView=visible;refresh();}},{threshold:0,rootMargin:'-30px 0px'}).observe(element);
  }else{inView=true;}
  const controller={go,refresh};controllers.push(controller);refresh();return controller;
 }
 const hero=document.querySelector('.content-hero');
 if(hero){
  const image=document.getElementById('hero-image');
  let request=0,previous,zoom;
  const images=siteContent.slides.map(slide=>{const preload=new Image();preload.src='assets/'+slide.image;return preload;});
  const zoomImage=()=>{zoom?.cancel();zoom=animate(image,[{transform:'scale(1)'},{transform:'scale(1.055)'}],{duration:9500,easing:'linear',fill:'forwards'});};
  async function heroTransition(index,render){
   const token=++request;
   if(motionAllowed())await images[index].decode().catch(()=>{});
   if(token!==request)return;
   previous?.remove();
   if(motionAllowed()){
    previous=image.cloneNode(false);previous.removeAttribute('id');previous.alt='';previous.setAttribute('aria-hidden','true');previous.style.transform=getComputedStyle(image).transform;image.after(previous);
   }
   render(index);zoomImage();if(hero.dataset.playing!=='true')zoom?.pause();
   if(previous){const outgoing=previous;const fade=animate(outgoing,[{opacity:1},{opacity:0}],{duration:1000,easing:'ease-in-out',fill:'forwards'});fade?.finished.then(()=>outgoing.remove()).catch(()=>outgoing.remove());}
   for(const target of [document.getElementById('hero-copy'),document.querySelector('.hero-actions')]){
    target.getAnimations().forEach(a=>a.cancel());animate(target,[{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)'});
   }
  }
  window.siteMotion.hero=carousel({name:'hero',element:hero,interval:8000,count:siteContent.slides.length,current:()=>heroIndex,render:updateHero,transition:heroTransition});
  zoomImage();if(hero.dataset.playing!=='true')zoom?.pause();
  preference.addEventListener('change',()=>{request++;previous?.remove();zoom?.cancel();if(motionAllowed())zoomImage();});
 }
 const reviews=document.getElementById('home-reviews');
 if(reviews){
  // Encompass the controls so focusing a dot or pause button also pauses rotation.
  const section=reviews.closest('section');let animation,request=0;
  // Measure every quote at the current card width to keep the section steady.
  let measuredWidth=0;
  function reserveReviewHeight(){
   const width=reviews.getBoundingClientRect().width;if(!width)return;
   const measure=reviews.cloneNode(false);measure.removeAttribute('id');measure.setAttribute('aria-hidden','true');measure.inert=true;
   Object.assign(measure.style,{position:'absolute',left:'-10000px',top:'0',width:`${width}px`,visibility:'hidden',minHeight:'0',pointerEvents:'none'});
   measure.innerHTML=stories.map(reviewCard).join('');
   [...measure.children].forEach(card=>card.style.display='flex');document.body.append(measure);
   reviews.style.minHeight=`${Math.ceil(Math.max(...[...measure.children].map(card=>card.getBoundingClientRect().height)))}px`;
   measure.remove();measuredWidth=width;
  }
  reserveReviewHeight();document.fonts?.ready.then(reserveReviewHeight);
  if('ResizeObserver' in window)new ResizeObserver(()=>{if(reviews.getBoundingClientRect().width!==measuredWidth)reserveReviewHeight();}).observe(reviews);
  else window.addEventListener('resize',reserveReviewHeight);
  async function reviewTransition(index,render){
   const token=++request;animation?.cancel();
   animation=animate(reviews,[{opacity:1},{opacity:0,transform:'translateX(-12px)'}],{duration:180,fill:'forwards'});
   if(animation)await animation.finished.catch(()=>{});
   if(token!==request)return;
   animation?.cancel();render(index);
   animation=animate(reviews,[{opacity:0,transform:'translateX(18px)'},{opacity:1,transform:'translateX(0)'}],{duration:550,easing:'cubic-bezier(.22,1,.36,1)'});
  }
  window.siteMotion.reviews=carousel({name:'reviews',element:section,interval:10000,count:stories.length,current:()=>reviewIndex,render:updateReview,transition:reviewTransition});
  preference.addEventListener('change',()=>{request++;animation?.cancel();});
 }
 document.addEventListener('visibilitychange',()=>controllers.forEach(c=>c.refresh()));
 preference.addEventListener('change',()=>{document.getAnimations().forEach(a=>a.cancel());controllers.forEach(c=>c.refresh());});
 // Animate content once as it enters view. Everything remains readable without JS.
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   observer.unobserve(entry.target);
   animate(entry.target,[{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,delay:Number(entry.target.dataset.motionDelay||0),easing:'cubic-bezier(.22,1,.36,1)'});
  }),{threshold:0.08});
  function observeContent(container){
   const selector='.section-head,.reviews-head,.gallery-heading,.journey-card,.reason-item,.gallery-destination,.about-text,.about-photos,.vision-grid article,.social-grid>a,.cta-inner,.tour-hero-copy,.tour-hero-photo,.tour-section>h2,.tour-quote-card,.page-intro,.contact-aside,.planner,.all-supplied-reviews .review-card';
   container.querySelectorAll(selector).forEach(element=>{
    const siblings=[...element.parentElement.children];element.dataset.motionDelay=String(Math.min(siblings.indexOf(element)%4,3)*70);observer.observe(element);
   });
  }
  observeContent(main);
  const gallery=document.getElementById('gallery-grid');if(gallery)new MutationObserver(()=>observeContent(gallery)).observe(gallery,{childList:true});
 }
 document.addEventListener('toggle',event=>{if(event.target.matches('details[open]')){const content=event.target.querySelector('.day-story,p');animate(content,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'ease-out'});}},true);
})();
