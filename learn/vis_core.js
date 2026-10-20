/* Why Next? interactive visuals: shared helpers. Each visual type registers a builder with VIS.reg(name, fn).
   A builder gets a context (stage, controls, say, svg, drag helpers) and draws into it. Every visual has a
   live text description (the text alternative), keyboard-operable controls, pointer (mouse/touch/pen) dragging,
   and respects prefers-reduced-motion. Lesson JSON chooses a visual with "visual": {"type": ..., "caption": ..., "opts": {...}}. */
const VIS=(()=>{
const T={},NS='http://www.w3.org/2000/svg';
const reduced=()=>!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
let uid=0;
function el(tag,attrs,parent,text){const svg=/^(svg|g|rect|circle|line|path|text|polygon|polyline|ellipse|title|tspan|clipPath)$/.test(tag);
 const e=svg?document.createElementNS(NS,tag):document.createElement(tag);
 for(const k in attrs||{})if(attrs[k]!=null)e.setAttribute(k,attrs[k]);if(text!=null)e.textContent=text;if(parent)parent.appendChild(e);return e}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const nf=(x,dp=2)=>{const r=Math.round(x*10**dp)/10**dp;return (r<0?'−':'')+String(Math.abs(r))};
/* tween: calls f(t) for t in 0..1; instant when reduced motion is on */
function tween(ms,f,done){if(reduced()||ms<=0){f(1);done&&done();return}const t0=performance.now();
 const step=now=>{const t=Math.min(1,(now-t0)/ms);f(t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2);if(t<1)requestAnimationFrame(step);else done&&done()};requestAnimationFrame(step)}
/* svg point from a pointer event */
function pt(svg,e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=svg.getScreenCTM();return m?p.matrixTransform(m.inverse()):{x:0,y:0}}
/* make an svg node draggable; move(x,y) gets svg coordinates. Pointer capture stays on the node, which is never re-parented. */
/* touch slop: a press on the picture within 26 px of a handle grabs that handle, so small handles are easy to hit */
function slop(svg,node){if(!svg.__h){svg.__h=[];svg.dataset.slop='26';svg.addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('[role=slider],.vis-handle'))return;let best=null,bd=26;
 for(const h of svg.__h){if(!h.isConnected)continue;const r=h.getBoundingClientRect(),d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2))-r.width/2;if(d<bd){bd=d;best=h}}
 if(best)best.dispatchEvent(new PointerEvent('pointerdown',{pointerId:e.pointerId,clientX:e.clientX,clientY:e.clientY,bubbles:false,pointerType:e.pointerType,isPrimary:true}))})}svg.__h.push(node)}
function drag(node,svg,move,end){slop(svg,node);node.style.touchAction='none';node.style.cursor='grab';
 node.addEventListener('pointerdown',e=>{e.preventDefault();node.setPointerCapture(e.pointerId);node.classList.add('vis-grab');const p=pt(svg,e);move(p.x,p.y,true)});
 node.addEventListener('pointermove',e=>{if(!node.hasPointerCapture(e.pointerId))return;const p=pt(svg,e);move(p.x,p.y,false)});
 const up=e=>{if(!node.hasPointerCapture(e.pointerId))return;node.releasePointerCapture(e.pointerId);node.classList.remove('vis-grab');end&&end()};
 node.addEventListener('pointerup',up);node.addEventListener('pointercancel',up)}
/* keyboard slider semantics for an svg handle */
function kslider(node,label,get,set,min,max,step,text){Object.entries({role:'slider',tabindex:0,'aria-label':label,'aria-valuemin':min,'aria-valuemax':max}).forEach(([k,v])=>node.setAttribute(k,v));
 const sync=()=>{const v=get();node.setAttribute('aria-valuenow',v);node.setAttribute('aria-valuetext',text?text(v):String(v))};
 node.addEventListener('keydown',e=>{const k={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1,PageUp:5,PageDown:-5}[e.key];
  if(k){e.preventDefault();set(clamp(+(get()+k*step).toFixed(6),min,max))}else if(e.key==='Home'){e.preventDefault();set(min)}else if(e.key==='End'){e.preventDefault();set(max)}sync()});
 sync();return sync}
function mount(host,spec){const f=T[spec.type];if(!f){host.innerHTML='';return null}const id='v'+(++uid);
 host.innerHTML=`<figure class="vis" data-vtype="${spec.type}" aria-labelledby="${id}-c"><figcaption id="${id}-c"><span class="vis-tag">Try it</span> ${esc(spec.caption||'')}</figcaption><div class="vis-stage"></div><div class="vis-ctl"></div><p class="vis-desc" id="${id}-d" aria-live="polite"></p></figure>`;
 const fig=host.firstChild,stage=fig.querySelector('.vis-stage'),ctl=fig.querySelector('.vis-ctl'),desc=fig.querySelector('.vis-desc');
 const ctx={id,fig,stage,ctl,opts:spec.opts||{},el,clamp,nf,tween,drag,kslider,reduced,cueEl:null,stops:[],
  say:t=>{if(desc.textContent!==t)desc.textContent=t},
  svg:(w,h,label)=>{const s=el('svg',{viewBox:`0 0 ${w} ${h}`,role:'group','aria-label':label,'aria-describedby':`${id}-d`,class:'vis-svg',style:`max-width:${Math.round(w*1.35)}px`},stage);return s},
  btn:(label,fn,cls)=>{const b=el('button',{type:'button',class:'lbtn sm'+(cls?' '+cls:'')},ctl,label);b.onclick=fn;return b},
  range:(label,min,max,step,val,fn)=>{const w=el('label',{class:'vis-range'},ctl);el('span',{},w,label+' ');const r=el('input',{type:'range',min,max,step,value:val},w);r.oninput=()=>fn(+r.value);return r}};
 try{f(ctx)}catch(err){host.innerHTML='';console.warn('visual failed',spec.type,err);return null}
 return {fig,cue(){const t=ctx.cueEl||stage;const els=Array.isArray(t)?t:[t];els.forEach(x=>{x.classList.remove('vis-cue');void x.getBoundingClientRect();x.classList.add('vis-cue')});
   setTimeout(()=>els.forEach(x=>x.classList.remove('vis-cue')),2600);},
  destroy(){ctx.stops.forEach(s=>s())}}}
let cur=null;
function show(host,spec){if(cur)cur.destroy();cur=spec?mount(host,spec):null;return cur}
return{reg:(n,f)=>{T[n]=f},types:()=>Object.keys(T),mount,show,cue:()=>cur&&cur.cue(),current:()=>cur,reduced,nf}})();
