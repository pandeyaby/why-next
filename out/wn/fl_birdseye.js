/* Flagship – looking from above: bird's-eye view (ages 4-5; Reception spatial reasoning, KS1 plan perspectives):
   match toys to their top views, move an eye from the side to the top and watch the view change, sort toys that look
   the same or different from the side and the top, say whether a bird or a child saw a picture, and find things on a
   bird's-eye plan of a playground. Data and drawings: birdseye_art.js. */
(()=>{const B=BIRDSEYE;
VIS.reg('flagbirdseye',c=>{let A,K,bar,chal,qn=-1,gen=0;const st={};c.fig.classList.add('young');
const mode=()=>['match','eye','same','who','plan','chal'][A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f172a':'#f0f9ff';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. match each toy to its top view ---------- */
let BINS=[],TOY=null;
function drop(k){const s=st.mt,cur=B.MATCH[s.i];if(!cur)return;s.drag=null;if(k!==cur){s.bad=k;A.sound.miss();
  return note(`From above, the ${B.NAME[cur]} is not ${B.TOPWORD[k]}. Picture yourself looking straight down on it.`,true)}
 s.i++;s.bad='';A.sound.pop();note(`Yes: from above, the ${B.NAME[cur]} looks like ${B.TOPWORD[cur]}.`+(s.i<B.MATCH.length?' Next toy.':''),false)}
function drawMatch(){const s=st.mt,cur=B.MATCH[s.i],y0=K.head(cur?`Toy ${s.i+1} of 4: how does the ${B.NAME[cur]} look from above?`:B.DONE[0],cur?(s.bad?'no':''):'ok',st.msg,st.err);
 const gap=6,bw=(A.W-16-gap*3)/4,bh=Math.min(A.H*.34,bw*1.25),by=A.H-bh-8;
 BINS=B.TOPS.map((t,j)=>({k:t.k,l:t.l,x:8+j*(bw+gap),y:by,w:bw,h:bh}));
 BINS.forEach(r=>{const used=B.MATCH.slice(0,s.i).includes(r.k);K.tile(r,r.l,{n:13,no:s.bad===r.k,ok:used});K.toy(r.k,'top',r.x+r.w/2,r.y+r.h*.4,Math.min(r.w*.7,r.h*.55))});
 if(cur){const sz=Math.min(by-y0-14,A.W*.32,150),d=s.drag;TOY={x:d?d.x-sz/2:(A.W-sz)/2,y:d?d.y-sz/2:y0+4,w:sz,h:sz};K.tile(TOY,'',{sel:!!d});K.toy(cur,'toy',TOY.x+sz/2,TOY.y+sz/2,sz*.8)}else TOY=null}
/* ---------- 2. move the eye to the top ---------- */
let EYEP=null,TOPSPOT=null;
function look(top){const s=st.ey,k=B.EYE[s.i];if(!k)return;s.drag=null;if(!top){s.up=false;A.redraw();return note(`From the side, the ${B.NAME[k]} looks like ${B.SIDEWORD[k]}. Move the eye to the top.`,false)}
 s.up=true;A.sound.pop();const k2=k;s.i++;s.up=false;s.last=k2;note(`From above, the ${B.NAME[k2]} looks like ${B.TOPWORD[k2]}. From the side it was ${B.SIDEWORD[k2]}.`+(s.i<B.EYE.length?' Next toy.':''),false)}
function drawEye(){const s=st.ey,k=B.EYE[s.i],y0=K.head(k?`Toy ${s.i+1} of 3. Drag the eye to the top.`:B.DONE[1],k?'':'ok',st.msg,st.err);
 const g=A.ctx,L=A.W*.5,cx=L*.62,cy=y0+(A.H-y0)*.62,sz=Math.min(L*.62,(A.H-y0)*.5);
 const show=k||s.last;if(!show)return;K.toy(show,'toy',cx,cy,sz);
 TOPSPOT={x:cx-34,y:y0+2,w:68,h:56};g.setLineDash([6,5]);g.strokeStyle=K.dk()?'#93c5fd':'#1d4ed8';g.lineWidth=2.5;A.paint.rrect(TOPSPOT.x,TOPSPOT.y,TOPSPOT.w,TOPSPOT.h,12);g.stroke();g.setLineDash([]);
 g.font=`700 ${K.sz(12)}${K.F}`;g.fillStyle=K.fg();g.textAlign='center';g.textBaseline='bottom';g.fillText('top',cx,TOPSPOT.y+TOPSPOT.h+14);
 const d=s.drag,ex=d?d.x:k?Math.max(36,cx-sz*.8):cx,ey=d?d.y:k?cy:TOPSPOT.y+TOPSPOT.h/2;EYEP={x:ex-30,y:ey-22,w:60,h:44};
 g.setLineDash([3,5]);g.strokeStyle=K.dk()?'#fcd34d':'#b45309';g.lineWidth=2;g.beginPath();g.moveTo(ex,ey);g.lineTo(cx,cy);g.stroke();g.setLineDash([]);
 g.fillStyle='#ffffff';g.strokeStyle='#1e293b';g.lineWidth=2.5;g.beginPath();g.ellipse(ex,ey,26,15,0,0,7);g.fill();g.stroke();g.fillStyle='#1d4ed8';g.beginPath();g.arc(ex,ey,8,0,7);g.fill();
 const up=!k||(d&&d.y<cy-sz*.6),px=L+8,pw=A.W-L-16,ph=Math.min(pw,(A.H-y0)*.8),py=y0+(A.H-y0-ph)/2;K.tile({x:px,y:py,w:pw,h:ph},up?'The eye sees: from above':'The eye sees: from the side',{n:13});
 K.toy(show,up?'top':'side',px+pw/2,py+ph*.42,Math.min(pw,ph)*.55)}
/* ---------- 3. same or different? ---------- */
let SBOX=[],STOY=null;
function sortSame(z){const s=st.sm,it=B.SAME[s.i];if(!it)return;s.drag=null;const k=it.k;if(z!==it.s){s.bad=z;A.sound.miss();
  return note(it.s?`Look again: the ${B.NAME[k]} is ${B.SIDEWORD[k]} from the side and ${B.TOPWORD[k]} from above. The same!`:`Look again: the ${B.NAME[k]} is ${B.SIDEWORD[k]} from the side but ${B.TOPWORD[k]} from above.`,true)}
 s.box[z].push(k);s.i++;s.bad=-1;A.sound.pop();note(`Side: ${B.SIDEWORD[k]}. Top: ${B.TOPWORD[k]}. `+(it.s?'Same.':'Different.'),false)}
function drawSame(){const s=st.sm,it=B.SAME[s.i],y0=K.head(it?`Toy ${s.i+1} of 5: same from the side and the top?`:B.DONE[2],it?(s.bad>=0?'no':''):'ok',st.msg,st.err);
 const gap=8,bw=(A.W-16-gap)/2,bh=Math.min(A.H*.36,170),by=A.H-bh-8;SBOX=[{z:1,l:'Same both ways'},{z:0,l:'Different'}].map((b,j)=>({...b,x:8+j*(bw+gap),y:by,w:bw,h:bh}));
 SBOX.forEach(r=>{K.tile(r,r.l,{n:15,no:s.bad===r.z});const L=s.box[r.z],n=Math.max(3,L.length),w=r.w/n;L.forEach((k,j)=>K.toy(k,'toy',r.x+w*(j+.5),r.y+r.h*.42,Math.min(w*.8,r.h*.5)))});
 if(it){const sz=Math.min(by-y0-14,A.W*.3,140),d=s.drag;STOY={x:d?d.x-sz/2:(A.W-sz)/2,y:d?d.y-sz/2:y0+4,w:sz,h:sz};K.tile(STOY,'',{sel:!!d});K.toy(it.k,'toy',STOY.x+sz/2,STOY.y+sz/2,sz*.75)}else STOY=null}
/* ---------- 4. who saw it? ---------- */
let WB=[];
function who(b){const s=st.wh,it=B.WHO[s.i];if(!it)return;const k=it.k;if(b!==it.b){s.bad=b;A.sound.miss();
  return note(it.b?`The child at the side sees ${B.SIDEWORD[k]}. This picture is ${B.TOPWORD[k]}, so it was seen from above.`:`The bird above sees ${B.TOPWORD[k]}. This picture is ${B.SIDEWORD[k]}, so it was seen from the side.`,true)}
 s.i++;s.bad=-1;A.sound.pop();note((it.b?`Yes, the bird saw the ${B.NAME[k]} from above.`:`Yes, the child saw the ${B.NAME[k]} from the side.`)+(s.i<B.WHO.length?' Next picture.':''),false)}
function drawWho(){const s=st.wh,it=B.WHO[s.i],y0=K.head(it?`Picture ${s.i+1} of 5. Who saw the toy like this?`:B.DONE[3],it?(s.bad>=0?'no':''):'ok',st.msg,st.err);
 const bh=Math.min(90,A.H*.2),by=A.H-bh-8,bw=(A.W-24)/2;WB=[{b:1,l:'Bird, from above',x:8,y:by,w:bw,h:bh},{b:0,l:'Child, at the side',x:16+bw,y:by,w:bw,h:bh}];
 WB.forEach(r=>{K.tile(r,r.l,{n:14,no:s.bad===r.b});(r.b?K.bird:K.child)(r.x+r.w/2,r.y+r.h*.38,Math.min(r.h*.7,r.w*.4))});
 if(it){const ph=Math.min(by-y0-12,170),pw=Math.min(A.W*.5,ph*1.3);K.tile({x:(A.W-pw)/2,y:y0+4,w:pw,h:ph},'',{});K.toy(it.k,it.b?'top':'side',A.W/2,y0+4+ph/2,ph*.7)}}
/* ---------- 5. read the plan ---------- */
let PL=[];
function pick(k){const s=st.pl,want=B.FIND[s.i];if(!want)return;const W=B.PLAN.find(p=>p.k===want),T=B.PLAN.find(p=>p.k===k);if(k!==want){s.bad=k;A.sound.miss();
  return note(`That is the ${T.l}. ${T.why} Find the ${W.l}.`,true)}
 s.i++;s.bad='';s.got.push(k);A.sound.pop();note(W.why+(s.i<B.FIND.length?' Next one.':''),false)}
function drawPlan(){const s=st.pl,want=B.FIND[s.i],W=want&&B.PLAN.find(p=>p.k===want),y0=K.head(W?`Find the ${W.l} on the plan.`:B.DONE[4],W?(s.bad?'no':''):'ok',st.msg,st.err);
 const g=A.ctx,px=10,py=y0+2,pw=A.W-20,ph=A.H-py-8;g.fillStyle=K.dk()?'#14532d':'#bbf7d0';A.paint.rrect(px,py,pw,ph,14);g.fill();g.strokeStyle='#166534';g.lineWidth=2;g.stroke();
 PL=B.PLAN.map(p=>({k:p.k,x:px+p.x*pw,y:py+p.y*ph,w:p.w*pw,h:p.h*ph}));PL.forEach(r=>K.planItem(r,r,s.got.includes(r.k)||s.bad===r.k));K.bird(px+pw-30,py+20,40)}
/* ---------- wiring ---------- */
function draw(){ground();const m=mode();if(m==='chal'){K.head('Challenge: looking from above','ok');['hat','tin','pyr'].forEach((k,i)=>{K.toy(k,'side',A.W*(.2+i*.3),A.H*.45,Math.min(A.W*.18,90));K.toy(k,'top',A.W*(.2+i*.3),A.H*.78,Math.min(A.W*.18,90))});return}
 ({match:drawMatch,eye:drawEye,same:drawSame,who:drawWho,plan:drawPlan})[m]();A.fx.draw(A.ctx)}
function down(p){const m=mode();
 if(m==='match'){if(TOY&&hit(p,TOY)){st.mt.drag={x:p.x,y:p.y};return true}const r=BINS.find(r=>hit(p,r));if(r)drop(r.k);return false}
 if(m==='eye'){if(EYEP&&B.EYE[st.ey.i]&&hit(p,EYEP)){st.ey.drag={x:p.x,y:p.y};return true}if(hit(p,TOPSPOT))look(true);return false}
 if(m==='same'){if(STOY&&hit(p,STOY)){st.sm.drag={x:p.x,y:p.y};return true}const r=SBOX.find(r=>hit(p,r));if(r)sortSame(r.z);return false}
 if(m==='who'){const r=WB.find(r=>hit(p,r));if(r)who(r.b);return false}
 if(m==='plan'){const r=PL.find(r=>hit(p,r));if(r)pick(r.k);return false}return false}
function move(p){const m=mode(),d=m==='match'?st.mt.drag:m==='eye'?st.ey.drag:m==='same'?st.sm.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=mode();
 if(m==='match'&&st.mt.drag){st.mt.drag=null;const r=BINS.find(r=>hit(p,r));if(r)drop(r.k);else{A.redraw();note('Drop the toy on a shape.',false)}}
 if(m==='eye'&&st.ey.drag){st.ey.drag=null;look(hit(p,TOPSPOT)||p.y<TOPSPOT.y+TOPSPOT.h+10)}
 if(m==='same'&&st.sm.drag){st.sm.drag=null;const r=SBOX.find(r=>hit(p,r));if(r)sortSame(r.z);else{A.redraw();note('Drop the toy in a box.',false)}}}
function reset(){gen++;for(const k in st)delete st[k];Object.assign(st,{mt:{i:0,bad:'',drag:null},ey:{i:0,drag:null,up:false,last:null},sm:{i:0,box:[[],[]],bad:-1,drag:null},wh:{i:0,bad:-1},pl:{i:0,bad:'',got:[]},msg:null,err:false,check:()=>{}})}
function note(t,bad){st.msg=t;st.err=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();st.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(B.DONE[i]+A.reveal(i))};
function begin(i,ok){reset();c.say(B.DESC[i]);A.cv.setAttribute('aria-label',B.DESC[i]);st.check=finish(i,ok);controls();A.redraw()}
function play(i,list){steps[i].go();const e=gen;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===gen)f()},t)})}
function controls(){if(!bar)return;bar.innerHTML='';const m=mode(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(m==='match'&&B.MATCH[st.mt.i])B.TOPS.forEach(t=>Bt(t.l,()=>drop(t.k),`From above the ${B.NAME[B.MATCH[st.mt.i]]} looks like: ${t.l}`));
 if(m==='eye'&&B.EYE[st.ey.i]){Bt('Look from the side',()=>look(false),`Look at the ${B.NAME[B.EYE[st.ey.i]]} from the side`);Bt('Look from above',()=>look(true),`Look at the ${B.NAME[B.EYE[st.ey.i]]} from above`)}
 if(m==='same'&&B.SAME[st.sm.i]){const k=B.NAME[B.SAME[st.sm.i].k];Bt('Same both ways',()=>sortSame(1),`The ${k} looks the same from the side and the top`);Bt('Different',()=>sortSame(0),`The ${k} looks different from the side and the top`)}
 if(m==='who'&&B.WHO[st.wh.i]){Bt('Bird, from above',()=>who(1),'The bird saw it from above');Bt('Child, at the side',()=>who(0),'The child saw it from the side')}
 if(m==='plan'&&B.FIND[st.pl.i])B.PLAN.forEach(p=>Bt(p.l,()=>pick(p.k),`Tap the ${p.l} on the plan`))}
const steps=[
{h:'From above',p:B.TXT[0],task:'Match all 4 toys to their view from above',
 show:()=>play(0,B.MATCH.map(k=>[450,()=>drop(k)])),go:()=>begin(0,()=>st.mt.i>=B.MATCH.length)},
{h:'Move the eye',p:B.TXT[1],predict:{q:'A party hat stands on a table. From above it looks like ...',opts:['a triangle','a circle with a dot'],ans:1},task:'Look at all 3 toys from above',
 show:()=>play(1,B.EYE.map(()=>[500,()=>look(true)])),go:()=>begin(1,()=>st.ey.i>=B.EYE.length)},
{h:'Same or different?',p:B.TXT[2],predict:{q:'Does a ball look the same from the side and from above?',opts:['No, everything changes from above','Yes, a circle both ways'],ans:1},task:'Sort all 5 toys',
 show:()=>play(2,B.SAME.map(it=>[450,()=>sortSame(it.s)])),go:()=>begin(2,()=>st.sm.i>=B.SAME.length)},
{h:'Who saw it?',p:B.TXT[3],task:'Say who saw all 5 pictures',
 show:()=>play(3,B.WHO.map(it=>[450,()=>who(it.b)])),go:()=>begin(3,()=>st.wh.i>=B.WHO.length)},
{h:'Read the plan',p:B.TXT[4],task:'Find all 3 things on the plan',
 show:()=>play(4,B.FIND.map(k=>[450,()=>pick(k)])),go:()=>begin(4,()=>st.pl.i>=B.FIND.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
function why(t){let m='Picture yourself looking straight down from up high, like a bird.';
 if(t==='side')m='That is how it looks from the side. From above you see its top, not its side.';
 if(t==='guess')m='That shape does not come from this toy. Think of its top: is it round or does it have corners?';
 if(t==='tin')m='A tin is a circle from above but a rectangle from the side. Only a ball is a circle from every side.';
 if(t==='hat')m='A party hat is a triangle from the side. Only a ball is a circle from every side.';
 if(t==='change')m='The toy stays the same. Only where you look from changes, so it looks different.';
 if(t==='plan')m='A plan shows things from above. Something round is drawn as a circle.';
 return m}
function ask(){qn++;const Q=B.QS[qn%B.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function judge(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{chal.hidden=X.step!==5;bar.hidden=X.step===5;controls()},
 init:X=>{A=X;K=B.KIT(A);const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Bird\'s-eye view lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}}).start()})})();
