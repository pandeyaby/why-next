// Guide launcher placement: the floating Guide button must never cover lesson content.
// On phones (≤760px) it is a slim tab on the right screen edge; on wider screens it is the full pill when a free spot
// exists, and the same tab otherwise. After scrolling stops, the page changes, or the window resizes, we measure what is on
// screen (canvases, buttons, images, and every line of text) and slide the launcher to the nearest gap in the margin.
(function(){
const GAP=140,PHONE=matchMedia('(max-width:760px)');let timer=0,last=0,moved=0;
const fab=()=>document.getElementById('gdFab'),area=()=>document.getElementById('detail');
const VISIBLE=r=>r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;
function obstacles(root){const out=[];
 root.querySelectorAll('canvas,button,input,select,textarea,a[href],summary,img,video,.reel').forEach(e=>{const r=e.getBoundingClientRect();if(VISIBLE(r))out.push(r)});
 const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}),rg=document.createRange();
 for(let n;(n=walk.nextNode());){const pr=n.parentElement.getBoundingClientRect();if(!VISIBLE(pr)||n.parentElement.closest('[hidden]'))continue;
  rg.selectNodeContents(n);for(const r of rg.getClientRects())if(VISIBLE(r))out.push(r)}
 return out}
const hits=(box,obs,pad)=>obs.some(o=>o.left<box.r+pad&&o.right>box.l-pad&&o.top<box.b+pad&&o.bottom>box.t-pad);
// candidate rows from just above the thumb zone upward, then downward, so the launcher moves as little as possible
function rows(h){const vh=innerHeight,start=Math.max(8,Math.min(110,vh-h-12)),ys=[];for(let y=start;y<=vh-h-8;y+=12)ys.push(y);for(let y=start-12;y>=8;y-=12)ys.push(y);return ys}
function place(){const f=fab(),root=area();if(!f||f.hidden)return;
 const vw=innerWidth,vh=innerHeight,phone=PHONE.matches,obs=root&&root.offsetParent?obstacles(root):[];
 const tryFull=!phone;f.classList.remove('gd-tab');const w=f.offsetWidth,h=f.offsetHeight;let spot=null;
 if(tryFull)search:for(const side of['right','left'])for(const y of rows(h)){const l=side==='right'?vw-12-w:12,box={l,r:l+w,t:vh-y-h,b:vh-y};if(!hits(box,obs,8)){spot={side,y,edge:12};break search}}
 if(!spot){f.classList.add('gd-tab');const tw=f.offsetWidth,th=f.offsetHeight;
  for(const y of rows(th)){const box={l:vw-tw,r:vw,t:vh-y-th,b:vh-y};if(!hits(box,obs,1)){spot={side:'right',y,edge:0};break}}
  if(!spot)spot={side:'right',y:Math.max(8,Math.min(110,vh-th-12)),edge:0}}
 f.style.right=spot.side==='right'?spot.edge+'px':'auto';f.style.left=spot.side==='left'?spot.edge+'px':'auto';f.style.bottom=spot.y+'px';f.dataset.spot=spot.side+':'+spot.y;moved++}
function later(){clearTimeout(timer);const wait=Math.max(GAP,400-(Date.now()-last));timer=setTimeout(()=>{last=Date.now();place()},wait)}
function start(){if(!fab()){setTimeout(start,200);return}
 addEventListener('scroll',later,{passive:true,capture:true});addEventListener('resize',later);addEventListener('orientationchange',later);
 document.addEventListener('click',later);document.addEventListener('wn:learn',later);document.addEventListener('pointerup',later);
 const a=area();if(a)new MutationObserver(later).observe(a,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['hidden','class']});
 new MutationObserver(later).observe(fab(),{attributes:true,attributeFilter:['hidden']});later();window.WN_dock={place,count:()=>moved}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
