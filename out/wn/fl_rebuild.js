/* Flagship – taking apart and rebuilding (Science, ages 7-8; NGSS 2-PS1-3 'an object made of a small set of pieces
   can be disassembled and made into a new object'; PS1.A 'a great variety of objects can be built up from a small set
   of pieces'). Take a 6-piece tower apart and count the pieces, rebuild the same pieces into a bridge from the bottom
   up, weigh the tower, the loose pile and the bridge, sort what changed from what stayed the same, and decide which
   models a 4-block, 2-plank kit can build. Data and drawings: rebuild_art.js. */
(()=>{const R=RBD;
VIS.reg('flagrebuild',c=>{c.fig.classList.add('young');
let A,ctl,chal,qi=-1,epoch=0,grab=null,zones=[],bins=[],tray=null,slotR=[];const M={};
const STEPS=['apart','build','weigh','sort','kit','chal'],cur=()=>STEPS[A.step];
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const SLOTNAME=['left pillar, bottom','right pillar, bottom','left pillar, top','right pillar, top','left half of the deck','right half of the deck'];
const kindName=k=>k==='pl'?'long plank':'square block';
function say(msg,bad){M.msg=msg;M.bad=!!bad;c.say(msg);A.cv.setAttribute('aria-label',msg);pads();A.redraw();M.ping()}
const mood=f=>f?'ok':M.bad?'no':'';
const unit=()=>Math.min(54,A.W/7.5);
function stackAt(list,cx,base,u,lift){const out=[];let y=base;list.forEach((k,i)=>{const P=R.KIT[k],w=P.k==='pl'?2*u:u;y-=u*.8;out.push({i,k,...R.piece(A.ctx,P,cx-w/2,y,u,A.col.dark,lift===i)})});return out}
function deck(x0,base,u,fill,ghost){const g=A.ctx,dk=A.col.dark;return R.SLOTS.map((S,i)=>{const r={i,x:x0+S.x*u,y:base-(S.y+1)*u*.8,w:S.w*u,h:u*.8};
 if(fill[i]!=null)R.piece(g,R.KIT[fill[i]],r.x,r.y,u,dk);else if(ghost){g.setLineDash([5,4]);g.strokeStyle=dk?'#cbd5e1':R.EDGE;g.lineWidth=2;g.strokeRect(r.x+2,r.y+2,r.w-4,r.h-4);g.setLineDash([])}return r})}
/* 1 ---- take it apart */
function lift(){const s=M.a;if(!s.tower.length)return;const k=s.tower.pop();s.tray.push(k);A.sound.pop();
 say(s.tower.length?`Took off the ${R.KIT[k].n}. ${s.tray.length} in the tray, ${s.tower.length} left.`:'All apart! 6 pieces in the tray. Every piece is still here.',false)}
function drawApart(){const s=M.a,g=A.ctx,dk=A.col.dark,fin=!s.tower.length,y0=R.top(A,fin?R.DONE[0]:`Take the tower apart, top piece first. (${s.tray.length} of 6)`,mood(fin),M.msg,M.bad);
 const u=unit(),base=A.H-80;g.fillStyle=dk?'#a16207':'#d6a85c';g.fillRect(8,base,A.W-16,6);
 zones=stackAt(s.tower,A.W*.27,base,u,grab?s.tower.length-1:-1);
 tray={x:A.W*.52,y:y0+10,w:A.W*.46,h:base-y0-20};g.fillStyle=dk?'#1e293b':'#f1f5f9';R.round(g,tray.x,tray.y,tray.w,tray.h,12);g.fill();g.strokeStyle=R.EDGE;g.lineWidth=1.5;g.stroke();
 g.font=`800 15px system-ui,sans-serif`;g.fillStyle=dk?R.LIGHT:R.INK;g.textAlign='center';g.textBaseline='top';g.fillText('Tray',tray.x+tray.w/2,tray.y+6);
 const tu=Math.min(u,(tray.w-24)/4);s.tray.forEach((k,i)=>R.piece(g,R.KIT[k],tray.x+8+(i%2)*(tray.w/2),tray.y+30+Math.floor(i/2)*(tu*.95),tu,dk));
 g.font=`800 17px system-ui,sans-serif`;g.fillStyle=dk?R.LIGHT:R.INK;g.textBaseline='top';g.fillText(`Tower: ${s.tower.length}   Tray: ${s.tray.length}   Total: ${s.tower.length+s.tray.length}`,A.W/2,base+16)}
/* 2 ---- build something new */
function fit(slot,k){const s=M.b,S=R.SLOTS[slot],P=R.KIT[k];if(s.fill[slot]!=null||s.fill.includes(k))return;
 if(P.k!==S.need){s.bad=k;A.sound.miss();return say(`That space needs a ${kindName(S.need)}, not a ${kindName(P.k)}.`,true)}
 if(S.below.some(b=>s.fill[b]==null)){s.bad=k;A.sound.miss();return say('Build from the bottom up. Fill the space under it first, or the piece would fall.',true)}
 s.fill[slot]=k;s.bad=null;s.pick=null;A.sound.pop();const n=s.fill.filter(v=>v!=null).length;say(n===6?'Done: a bridge from the same 6 pieces!':`The ${P.n} fits. ${n} of 6 placed.`,false)}
function nextFor(slot){return R.KIT.findIndex((P,k)=>P.k===R.SLOTS[slot].need&&!M.b.fill.includes(k))}
function drawBuild(){const s=M.b,g=A.ctx,dk=A.col.dark,n=s.fill.filter(v=>v!=null).length,fin=n===6,y0=R.top(A,fin?R.DONE[1]:`Drag each piece into a space to build a bridge. (${n} of 6)`,mood(fin),M.msg,M.bad);
 const u=unit(),base=y0+u*.8*3+40;g.fillStyle=dk?'#a16207':'#d6a85c';g.fillRect(8,base,A.W-16,6);slotR=deck(A.W/2-2*u,base,u,s.fill,true);
 if(fin){R.icon(g,'\u{1F697}',A.W/2,base-u*.45,u*.7);zones=[];return}
 const left=R.KIT.map((_,k)=>k).filter(k=>!s.fill.includes(k));let x=12,y=base+22;zones=[];
 left.forEach(k=>{const w=R.KIT[k].k==='pl'?2*u:u;if(x+w>A.W-12){x=12;y+=u+8}if(grab&&grab.k===k){x+=w+14;return}zones.push({k,...R.piece(g,R.KIT[k],x,y,u,dk,s.pick===k)});
  if(s.pick===k||s.bad===k){g.strokeStyle=s.bad===k?R.NO:'#1d4ed8';g.lineWidth=4;g.strokeRect(x,y,w,u*.8)}x+=w+14});
 if(grab)R.piece(g,R.KIT[grab.k],grab.x-u/2,grab.y-u*.4,u,dk,true)}
/* 3 ---- weigh */
function weigh(i){const s=M.w;s.on=i;if(s.got[i]==null){s.got[i]=R.TOTAL;A.sound.pop()}const n=s.got.filter(v=>v!=null).length;
 say(`${R.WEIGH[i].n[0].toUpperCase()+R.WEIGH[i].n.slice(1)}: ${R.TOTAL} g.${n===3?' All three weigh the same!':''}`,false)}
function drawWeigh(){const s=M.w,g=A.ctx,dk=A.col.dark,n=s.got.filter(v=>v!=null).length,fin=n===3,y0=R.top(A,fin?R.DONE[2]:`Tap each one to weigh it. (${n} of 3)`,mood(fin),M.msg,M.bad);
 const u=Math.min(24,A.W/16),cw=(A.W-32)/3,ch=Math.min(150,(A.H-y0)*.34);zones=R.WEIGH.map((W,i)=>({i,x:8+i*(cw+8),y:y0+4,w:cw,h:ch}));
 zones.forEach(r=>{R.card(g,r,'',s.on===r.i?'sel':s.got[r.i]!=null?'ok':'');const cx=r.x+r.w/2,b=r.y+r.h-34;
  if(r.i===0)stackAt(R.TOWER,cx,b,u);else if(r.i===1)[0,1,2,3,4,5].forEach(k=>R.piece(g,R.KIT[k],r.x+8+(k%3)*(r.w-16)/3,b-u*.8*(1+Math.floor(k/3))-(k%2)*4,u,dk));else deck(cx-2*u,b,u,[0,2,3,5,1,4],false);
  g.font=`800 ${A.narrow?13:15}px system-ui,sans-serif`;g.fillStyle=R.INK;g.textAlign='center';g.textBaseline='middle';g.fillText(R.WEIGH[r.i].n,cx,r.y+r.h-16)});
 const sy=y0+ch+20;R.scale(A,A.W/2,sy,Math.min(260,A.W*.7),s.on==null?null:R.TOTAL,dk);let y=sy+90;
 g.font=`700 16px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='top';R.WEIGH.forEach((W,i)=>{g.fillStyle=s.got[i]!=null?(dk?'#86efac':R.OK):(dk?'#cbd5e1':'#475569');g.fillText(`${W.n}: ${s.got[i]!=null?s.got[i]+' g':'not weighed yet'}`,20,y);y+=24})}
/* 4 ---- changed or stayed the same */
function drop(i,z){const s=M.s;if(s.at[i]!=null)return;const C=R.CARDS[i];if(z!==C.z){s.bad=i;A.sound.miss();return say(C.no,true)}
 s.at[i]=z;s.bad=-1;s.pick=null;A.sound.pop();say(`${C.t}: ${R.BINS[z].toLowerCase()}.`,false)}
function drawSort(){const s=M.s,g=A.ctx,dk=A.col.dark,n=Object.keys(s.at).length,fin=n===R.CARDS.length,y0=R.top(A,fin?R.DONE[3]:`Tower to bridge: what changed? Drag each card. (${n} of 6)`,mood(fin),M.msg,M.bad);
 const bh=Math.min(190,(A.H-y0)*.42),bw=(A.W-24)/2;bins=[0,1].map(i=>({i,x:8+i*(bw+8),y:y0+4,w:bw,h:bh}));
 bins.forEach(b=>{g.fillStyle=dk?(b.i?'#1e3a5f':'#3b2a12'):(b.i?'#eff6ff':'#fff7ed');R.round(g,b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=b.i?'#1d4ed8':'#c2410c';g.lineWidth=2.5;g.stroke();
  g.font=`800 ${A.narrow?15:17}px system-ui,sans-serif`;g.fillStyle=dk?R.LIGHT:R.INK;g.textAlign='center';g.textBaseline='top';g.fillText(R.BINS[b.i],b.x+b.w/2,b.y+8);
  let k=0;R.CARDS.forEach((C,i)=>{if(s.at[i]!==b.i)return;g.font=`700 ${A.narrow?12:14}px system-ui,sans-serif`;g.fillStyle=dk?'#86efac':R.OK;R.fit(g,'\u2713 '+C.t,b.w-12,g.font).forEach(t=>{g.fillText(t,b.x+b.w/2,b.y+34+k*18);k++})})});
 if(fin){zones=[];return}zones=[];let j=0;R.CARDS.forEach((C,i)=>{if(s.at[i]!=null)return;if(grab&&grab.i===i){j++;return}const r={i,x:8+(j%2)*(bw+8),y:y0+bh+16+Math.floor(j/2)*64,w:bw,h:56};zones.push(r);j++;
  R.card(g,r,C.t,s.bad===i?'no':s.pick===i?'sel':'',null,A.narrow?14:16)});
 if(grab)R.card(g,{x:grab.x-bw/2,y:grab.y-28,w:bw,h:56},R.CARDS[grab.i].t,'sel',null,14)}
/* 5 ---- what can our kit build */
function decide(yes){const s=M.k;if(s.k>=R.MODELS.length)return;const Q=R.MODELS[s.k];if(!!yes!==!!Q.ok){s.bad=yes?1:0;A.sound.miss();return say(`Check the pieces again. ${Q.why}`,true)}
 s.bad=-1;s.k++;A.sound.pop();say(Q.why,false)}
function drawKit(){const s=M.k,g=A.ctx,dk=A.col.dark,fin=s.k>=R.MODELS.length,Q=R.MODELS[Math.min(s.k,R.MODELS.length-1)],y0=R.top(A,fin?R.DONE[4]:`Can our kit build ${Q.n.toLowerCase()}? (${s.k+1} of 4)`,mood(fin),M.msg,M.bad);
 const u=Math.min(34,A.W/12);g.font=`800 15px system-ui,sans-serif`;g.fillStyle=dk?R.LIGHT:R.INK;g.textAlign='left';g.textBaseline='top';g.fillText('Our kit: 4 blocks, 2 planks, no wheels',14,y0+2);
 let x=14;R.KIT.forEach(P=>{R.piece(g,P,x,y0+26,u,dk);x+=(P.k==='pl'?2*u:u)+6});
 if(fin){zones=[];return}const my=y0+u+44,mh=Math.min(150,(A.H-my)*.42);R.card(g,{x:8,y:my,w:A.W-16,h:mh},'',null);R.icon(g,Q.ic,A.W*.25,my+mh/2,Math.min(70,mh*.6));
 g.font=`800 ${A.narrow?15:17}px system-ui,sans-serif`;g.fillStyle=R.INK;g.textAlign='left';g.textBaseline='middle';
 const need=Object.entries(Q.need).map(([k,v])=>`${v} ${k==='sq'?(v>1?'blocks':'block'):k==='pl'?(v>1?'planks':'plank'):'wheels'}`);g.fillText(Q.n,A.W*.45,my+22);need.forEach((t,i)=>g.fillText('\u2022 needs '+t,A.W*.45,my+48+i*22));
 const ty=my+mh+14,tw=(A.W-28)/2;zones=[1,0].map((v,i)=>({i:v,x:8+i*(tw+12),y:ty,w:tw,h:Math.min(84,A.H-ty-10)}));zones.forEach(r=>R.card(g,r,r.i?'Yes, we can':'No, we cannot',s.bad===r.i?'no':'',r.i?'\u2705':'\u274C',A.narrow?16:18))}
/* ---- wiring ---- */
const VIEW={apart:drawApart,build:drawBuild,weigh:drawWeigh,sort:drawSort,kit:drawKit};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=cur();
 if(k==='chal'){const y=R.top(A,'Challenge: same pieces, new object','ok');R.icon(g,'\u{1F9F1}',A.W*.3,y+70,64);R.icon(g,'\u{1F309}',A.W*.7,y+70,64);return}VIEW[k]();A.fx.draw(g)}
function down(p){const k=cur();
 if(k==='apart'){const t=zones[zones.length-1];if(within(p,t)){grab={x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}if(zones.some(z=>within(p,z))){A.sound.miss();say('Take the top piece first. Pulling one from the middle would make the tower fall.',true)}return false}
 if(k==='build'){const z=zones.find(q=>within(p,q));if(z){grab={k:z.k,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const sl=slotR.find(q=>within(p,q));if(sl&&M.b.pick!=null)fit(sl.i,M.b.pick);return false}
 if(k==='weigh'){const z=zones.find(q=>within(p,q));if(z)weigh(z.i);return false}
 if(k==='sort'){if(M.s.pick!=null){const b=bins.find(q=>within(p,q));if(b){drop(M.s.pick,b.i);return false}}const z=zones.find(q=>within(p,q));if(z){grab={i:z.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='kit'){const z=zones.find(q=>within(p,q));if(z)decide(z.i)}return false}
function move(p){if(grab){grab.x=p.x;grab.y=p.y;A.redraw()}}
function up(p){if(!grab)return;const h=grab,k=cur(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<10;grab=null;
 if(k==='apart'){if(tap||within(p,tray))lift();else A.redraw();return}
 if(k==='build'){const sl=slotR.find(q=>within(p,q));if(sl)return fit(sl.i,h.k);if(tap){M.b.pick=h.k;return say(`Picked the ${R.KIT[h.k].n}. Now tap a space.`,false)}return A.redraw()}
 if(k==='sort'){const b=bins.find(q=>within(p,q));if(b)return drop(h.i,b.i);if(tap){M.s.pick=h.i;return say(`"${R.CARDS[h.i].t}". Now tap a box.`,false)}A.redraw()}}
function wipe(){epoch++;grab=null;for(const k in M)delete M[k];
 Object.assign(M,{a:{tower:[...R.TOWER],tray:[]},b:{fill:Array(6).fill(null),pick:null,bad:null},w:{got:[null,null,null],on:null},s:{at:{},pick:null,bad:-1},k:{k:0,bad:-1},msg:null,bad:false,ping:()=>{}})}
function open(i,over){wipe();c.say(R.DESC[i]);A.cv.setAttribute('aria-label',R.DESC[i]);
 M.ping=()=>{if(A.step===i&&!A.isDone&&over()&&(!PLAN[i].predict||A.pred[i]!=null))A.done(R.DONE[i]+A.reveal(i))};pads();A.redraw()}
function auto(i,list){PLAN[i].go();const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=cur(),b=(t,f,l)=>{const x=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t);x.onclick=f};
 if(k==='apart'&&M.a.tower.length)b('Take off the top piece',lift,`Take the ${R.KIT[M.a.tower[M.a.tower.length-1]].n} off the top of the tower`);
 if(k==='build'){const open=R.SLOTS.map((S,i)=>i).filter(i=>M.b.fill[i]==null&&R.SLOTS[i].below.every(j=>M.b.fill[j]!=null));open.slice(0,2).forEach(i=>b(`${R.SLOTS[i].need==='pl'?'Plank':'Block'}: ${SLOTNAME[i]}`,()=>fit(i,nextFor(i)),`Put a ${kindName(R.SLOTS[i].need)} in the ${SLOTNAME[i]}`))}
 if(k==='weigh')R.WEIGH.forEach((W,i)=>b(`Weigh ${W.n}`,()=>weigh(i)));
 if(k==='sort'){const i=R.CARDS.findIndex((_,j)=>M.s.at[j]==null);if(i>=0)R.BINS.forEach((B,z)=>b(`${R.CARDS[i].t}: ${B}`,()=>drop(i,z),`${R.CARDS[i].t} goes in ${B}`))}
 if(k==='kit'&&M.k.k<R.MODELS.length){b('Yes, we can',()=>decide(1),`Yes, our kit can build ${R.MODELS[M.k.k].n.toLowerCase()}`);b('No, we cannot',()=>decide(0),`No, our kit cannot build ${R.MODELS[M.k.k].n.toLowerCase()}`)}}
const PLAN=[
{h:'Take it apart',p:R.TXT[0],predict:{q:'We take the tower apart. What happens to its pieces?',opts:['Some get used up','They are all still here'],ans:1},task:'Take all 6 pieces off the tower',
 show:()=>auto(0,R.TOWER.map(()=>[450,lift])),go:()=>open(0,()=>!M.a.tower.length)},
{h:'Build something new',p:R.TXT[1],predict:{q:'Can the tower\u2019s pieces make a bridge?',opts:['No, a bridge needs new pieces','Yes, put them together a new way'],ans:1},task:'Fill all 6 spaces in the bridge',
 show:()=>auto(1,R.SLOTS.map((_,i)=>[500,()=>fit(i,nextFor(i))])),go:()=>open(1,()=>M.b.fill.every(v=>v!=null))},
{h:'Weigh them',p:R.TXT[2],predict:{q:'The bridge is longer than the tower is wide. How will its weight compare?',opts:['Heavier: it is longer','The same: same pieces'],ans:1},task:'Weigh the tower, the pile and the bridge',
 show:()=>auto(2,R.WEIGH.map((_,i)=>[650,()=>weigh(i)])),go:()=>open(2,()=>M.w.got.every(v=>v!=null))},
{h:'What changed?',p:R.TXT[3],task:'Sort all 6 cards',
 show:()=>auto(3,R.CARDS.map((C,i)=>[480,()=>drop(i,C.z)])),go:()=>open(3,()=>Object.keys(M.s.at).length===R.CARDS.length)},
{h:'What can our kit build?',p:R.TXT[4],task:'Decide for 4 models',
 show:()=>auto(4,R.MODELS.map(Q=>[650,()=>decide(Q.ok)])),go:()=>open(4,()=>M.k.k>=R.MODELS.length)},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
PLAN.forEach(s=>{if(s.task)s.onPredict=()=>M.ping()});
function slipMsg(tag){let m='Taking apart keeps every piece. Rebuilding puts the same pieces together in a new way.';
 if(tag==='gone')m='Nothing is used up when you take a model apart. Count the pieces: the same number is still there.';
 if(tag==='new')m='You do not need new pieces. The same pieces can be put together in a new way.';
 if(tag==='heavy')m='Same pieces, same weight. A longer or lower shape does not add or lose any weight.';
 if(tag==='changed')m='The pieces themselves do not change. Only where they go changes: the shape and the job.';
 if(tag==='any')m='You can only build what your pieces allow. A car needs wheels, so a kit with no wheels cannot make one.';
 return m}
function ask(){qi++;const Q=R.QS[qi%R.QS.length],all=[[Q.a,'ok'],...Q.o],rot=(qi+2)%3,order=all.slice(rot).concat(all.slice(0,rot));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose one answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},chal.querySelector('.fl-pick'),v).onclick=()=>score(tag,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function score(tag,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),good=tag==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`\u2713 Right: ${a}.`:'\u2717 '+slipMsg(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(good?'Right.':slipMsg(tag))}
FK.shell(c,{steps:PLAN,ratio:.74,tall:1.55,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;pads()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rebuild lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();
  A.gest({down,move,up});pads()}}).start()})})();
