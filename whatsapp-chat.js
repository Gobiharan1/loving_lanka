'use strict';
(() => {
 const toggle=document.querySelector('.whatsapp-float');
 const panel=document.getElementById('whatsapp-panel');
 if(!toggle||!panel)return;
 const close=panel.querySelector('.whatsapp-panel-close');
 const form=document.getElementById('whatsapp-message-form');
 const message=document.getElementById('whatsapp-message');
 const send=panel.querySelector('.whatsapp-send');
 function setOpen(open,restoreFocus=false){
  panel.hidden=!open;
  toggle.setAttribute('aria-expanded',String(open));
  if(open)message.focus();
  else if(restoreFocus)toggle.focus();
 }
 toggle.addEventListener('click',()=>setOpen(panel.hidden));
 close.addEventListener('click',()=>setOpen(false,true));
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!panel.hidden){event.preventDefault();setOpen(false,true);}
 });
 document.addEventListener('pointerdown',event=>{
  if(!panel.hidden&&!panel.contains(event.target)&&!toggle.contains(event.target))setOpen(false);
 });
 message.addEventListener('input',()=>{message.setCustomValidity('');send.disabled=!message.value.trim();});
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const text=message.value.trim();
  if(!text){message.setCustomValidity('Please type a message first.');message.reportValidity();return;}
  location.assign('https://wa.me/94774751741?text='+encodeURIComponent(text));
 });
})();
