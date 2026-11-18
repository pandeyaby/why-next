/* Flagship: adding and subtracting fractions with the same denominator (ages 7-8). Slide fifths from two bars into one,
   answer sums while a wrong "add the bottoms" answer is drawn to scale, cross out parts to subtract, fill a bar to one
   whole, and hop in sevenths along a number line. */
(()=>{
const SUMS=[[5,1,7],[3,4,8],[1,2,4]],SUBS=[[6,3,8],[5,4,6]],WHOLE=[[3,5],[1,4]],HOPS=[[2,3,7],[6,-4,7]];
VIS.reg('flagfadd',c=>{let A,bar,box,qi=-1,run=0;const F={};
const sg=()=>['join','add','sub','whole','line','chal'][A.step];
const sfx=k=>A.sound[k](),draw=()=>A.redraw(),sync=()=>{draw();buttons()};
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const dk=()=>A.col.dark,oc=()=>dk()?'#fb923c':'#c2410c',tc=()=>dk()?'#2dd4bf':'#0f766e',pc=()=>dk()?'#c084fc':'#7e22ce';
function txt(t,x,y,px,ink,wt){const g=A.ctx;g.font=`${wt||800} ${Math.round(px*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;g.fillText(t,x,y,A.W-16)}
/* a stacked fraction: numerator over a line over denominator */
function frac(n,d,x,y,px,ink){const g=A.ctx,s=px*(A.narrow?1:1.12);txt(String(n),x,y-s*.62,px,ink);txt(String(d),x,y+s*.62,px,ink);g.strokeStyle=ink||A.col.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(x-s*.45,y);g.lineTo(x+s*.45,y);g.stroke()}
/* a bar cut into n equal parts; cells[i] is a colour, 'x' for crossed out, or null */
function rowBar(g,y,n,cells,C,hi){const x0=A.W*.16,w=A.W*.78,h=Math.min(A.H*.1,46),cw=w/n;
 for(let i=0;i<n;i++){const x=x0+i*cw,v=cells[i];g.fillStyle=v&&v!=='x'?v:A.alpha(C.tx,.06);g.fillRect(x,y,cw,h);
  if(v==='x'){g.fillStyle=A.alpha(C.mu,.35);g.fillRect(x,y,cw,h);g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(x+6,y+6);g.lineTo(x+cw-6,y+h-6);g.moveTo(x+cw-6,y+6);g.lineTo(x+6,y+h-6);g.stroke()}
  g.strokeStyle=hi===i?C.tx:dk()?'#e2e8f0':'#1f2937';g.lineWidth=hi===i?3:1.6;g.strokeRect(x,y,cw,h)}
 return{x0,w,h,cw,y,n}}
const hitCell=(p,R)=>R&&p.y>=R.y&&p.y<=R.y+R.h&&p.x>=R.x0&&p.x<=R.x0+R.w?Math.floor((p.x-R.x0)/R.cw):-1;
const UN={4:'quarter',5:'fifth',6:'sixth',7:'seventh',8:'eighth'},nm=(n,d)=>`${n} ${UN[d]}${n===1?'':'s'}`,fill=(n,k,col)=>Array.from({length:n},(_,i)=>i<k?col:null);
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef9c3',dk()?.03:.3);g.fillRect(0,0,W,H);({join:dJoin,add:dAdd,sub:dSub,whole:dWhole,line:dLine,chal:dChal})[sg()](g,W,H,C);A.fx.draw(g)}
/* ---- 1: slide parts from two bars into one ---- */
function dJoin(g,W,H,C){const o=oc(),t=tc(),na=2-F.ja,nb=2-F.jb;
 F.RA=rowBar(g,H*.12,5,[...fill(5,2,null)].map((_,i)=>i<na?o:null),C);frac(2,5,W*.07,H*.12+F.RA.h/2,15,o);
 F.RB=rowBar(g,H*.34,5,[...fill(5,2,null)].map((_,i)=>i<nb?t:null),C);frac(2,5,W*.07,H*.34+F.RB.h/2,15,t);
 F.RC=rowBar(g,H*.6,5,fill(5,5,null).map((_,i)=>F.res[i]||null),C);
 txt('one bar, cut into fifths',W/2,H*.6+F.RC.h+16,12,C.mu,600);
 if(F.drag){A.paint.rrect(F.drag.x-F.RA.cw/2,F.drag.y-F.RA.h/2,F.RA.cw,F.RA.h,6);g.fillStyle=F.drag.col;g.fill()}
 const k=F.res.length,y=H*.88;frac(2,5,W*.3,y,15,o);txt('+',W*.4,y,20);frac(2,5,W*.5,y,15,t);txt('=',W*.6,y,20);frac(k===4?4:'?',5,W*.7,y,15,C.tx)}
function slide(which){if(sg()!=='join')return;const k=which?'jb':'ja';if(F[k]>=2){say(`That bar has no ${which?'teal':'orange'} parts left.`);return}
 F[k]++;F.res.push(which?tc():oc());sfx('tick');const n=F.res.length;
 say(n<4?`${n} fifth${n>1?'s':''} in the bar. Each part is still one fifth.`:'4 parts, and each one is a fifth. 2 fifths + 2 fifths = 4 fifths. The bar is still cut into 5, so the denominator stays 5.');sync();F.want()}
/* ---- 2: pick the answer; a wrong 'add the bottoms' answer is drawn to scale ---- */
function dAdd(g,W,H,C){const[a,b,d]=SUMS[Math.min(F.q,2)],o=oc(),t=tc(),done=F.q>=3;
 rowBar(g,H*.1,d,fill(d,a,o),C);frac(a,d,W*.07,H*.1+20,14,o);
 rowBar(g,H*.27,d,fill(d,b,t),C);frac(b,d,W*.07,H*.27+20,14,t);
 const got=F.got||done,R=rowBar(g,H*.46,d,fill(d,0,null).map((_,i)=>got?(i<a?o:i<a+b?t:null):null),C);frac(got?a+b:'?',d,W*.07,H*.46+20,14,C.tx);
 if(F.ghost){const[n,k]=F.ghost;g.globalAlpha=.9;const Q=rowBar(g,H*.66,n,fill(n,k,C.rd),C);g.globalAlpha=1;frac(k,n,W*.07,H*.66+20,14,C.rd);txt(`${k}/${n} drawn to scale: smaller than ${a}/${d} alone!`,W/2,H*.66+Q.h+16,12,C.rd,700)}
 txt(done?'All three sums done!':`${a}/${d} + ${b}/${d} = ?`,W/2,H*.92,17,C.tx)}
function answer(n,d){if(sg()!=='add'||F.q>=3)return;const[a,b,dd]=SUMS[F.q];
 if(n===a+b&&d===dd){F.got=1;F.ghost=null;sfx('pop');say(`Yes: ${nm(a,dd)} and ${nm(b,dd)} make ${nm(a+b,dd)}. Add the numerators. The denominator stays ${dd}.`);sync();
  const k=F.k;setTimeout(()=>{if(k!==F.k)return;F.q++;F.got=0;sync();F.want()},A.reduced()?20:1100)}
 else if(d===2*dd){F.ghost=[d,n];sfx('miss');say(`That adds the denominators too. Look: ${n}/${d} is smaller than ${a}/${dd} on its own, so it cannot be the total. The parts did not change size.`);sync()}
 else{sfx('miss');say(`Count the coloured parts in both bars: ${a} and ${b}.`);sync()}}
const opts=()=>{const[a,b,d]=SUMS[Math.min(F.q,2)];return[[a+b,d],[a+b,2*d],[Math.max(a,b),d]]};
/* ---- 3: take away by crossing out parts ---- */
function dSub(g,W,H,C){const[a,b,d]=SUBS[Math.min(F.q,1)],x=F.cells.filter(v=>v==='x').length,done=F.q>=2;
 F.R=rowBar(g,H*.32,d,F.cells,C,-1);frac(a,d,W*.07,H*.32+F.R.h/2,15,pc());
 txt(done?'Both done!':`Cross out ${b} parts: ${x} so far`,W/2,H*.2,15,C.tx);
 const y=H*.72;frac(a,d,W*.26,y,16,pc());txt('−',W*.37,y,22);frac(b,d,W*.48,y,16,C.rd);txt('=',W*.59,y,22);frac(x===b?a-b:'?',d,W*.7,y,16,C.tx)}
function cross(i){if(sg()!=='sub'||F.q>=2)return;const[a,b,d]=SUBS[F.q];if(i<0)i=F.cells.lastIndexOf(pc());
 if(i<0||i>=d)return;if(F.cells[i]===null){say('That part is empty. Cross out a shaded part.');return}
 F.cells[i]=F.cells[i]==='x'?pc():'x';sfx('tick');const x=F.cells.filter(v=>v==='x').length;
 if(x===b){sfx('pop');say(`${a}/${d} − ${b}/${d} = ${a-b}/${d}. Take away the numerators. The parts are still ${d==8?'eighths':'sixths'}, so the denominator stays ${d}, not 0.`);
  const k=F.k;setTimeout(()=>{if(k!==F.k)return;F.q++;if(F.q<2){const[a2,,d2]=SUBS[F.q];F.cells=fill(d2,a2,pc())}sync();F.want()},A.reduced()?20:1200)}
 else say(x>b?`Too many: that is ${x} crossed out. Tap one to put it back.`:`${x} crossed out. ${b-x} more.`);sync()}
/* ---- 4: fill up to one whole ---- */
function dWhole(g,W,H,C){const[a,d]=WHOLE[Math.min(F.q,1)],k=F.cells.filter(v=>v===tc()).length,done=F.q>=2;
 F.R=rowBar(g,H*.32,d,F.cells,C);frac(a,d,W*.07,H*.32+F.R.h/2,15,oc());
 txt(done?'Both bars make one whole!':'Tap the empty parts to fill the bar',W/2,H*.2,15,C.tx);
 const y=H*.72;frac(a,d,W*.26,y,16,oc());txt('+',W*.37,y,22);frac(k||'?',d,W*.48,y,16,tc());txt('=',W*.59,y,22);txt('1',W*.7,y,30);txt('whole',W*.7,y+30,12,C.mu,600)}
function top(i){if(sg()!=='whole'||F.q>=2)return;const[a,d]=WHOLE[F.q];if(i<0)i=F.cells.indexOf(null);if(i<0||i>=d)return;
 if(F.cells[i]===oc()){say('That part is already there. Fill an empty part.');return}
 F.cells[i]=F.cells[i]?null:tc();sfx('tick');const k=F.cells.filter(v=>v===tc()).length;
 if(k===d-a){sfx('pop');say(`${a}/${d} + ${d-a}/${d} = ${d}/${d}. When the numerator and the denominator are the same, that is one whole.`);
  const q=F.k;setTimeout(()=>{if(q!==F.k)return;F.q++;if(F.q<2){const[a2,d2]=WHOLE[F.q];F.cells=fill(d2,a2,oc())}sync();F.want()},A.reduced()?20:1200)}
 else say(`${a+k} of ${d} parts filled.`);sync()}
/* ---- 5: hop along a number line in sevenths ---- */
const NL=()=>({x0:A.W*.08,x1:A.W*.92,y:A.H*.55});
function dLine(g,W,H,C){const[s,m,d]=HOPS[Math.min(F.q,1)],L=NL(),xs=v=>L.x0+v/d*(L.x1-L.x0),done=F.q>=2;
 g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(L.x0,L.y);g.lineTo(L.x1,L.y);g.stroke();
 for(let v=0;v<=d;v++){const x=xs(v);g.lineWidth=2;g.beginPath();g.moveTo(x,L.y-10);g.lineTo(x,L.y+10);g.stroke();if(v===0||v===d)txt(String(v/d),x,L.y+28,15);else frac(v,d,x,L.y+36,12,C.mu)}
 F.trail.forEach(([a,b])=>{const xa=xs(a),xb=xs(b);g.strokeStyle=m>0?C.gr:C.rd;g.lineWidth=3;g.beginPath();g.moveTo(xa,L.y-12);g.quadraticCurveTo((xa+xb)/2,L.y-60,xb,L.y-12);g.stroke()});
 A.paint.ball(xs(F.pos),L.y-14,11,dk()?'#4ade80':'#15803d');
 txt(done?'Both hops done!':`${s}/${d} ${m>0?'+':'−'} ${Math.abs(m)}/${d}: start at ${s}/${d}, hop ${m>0?'right':'left'}`,W/2,H*.15,15,C.tx);
 if(!done)txt(`Now at ${F.pos}/${d}, ${F.trail.length} hop${F.trail.length===1?'':'s'}`,W/2,H*.86,14,C.mu,700)}
function hop(dir){if(sg()!=='line'||F.q>=2)return;const[s,m,d]=HOPS[F.q],to=F.pos+dir;if(to<0||to>d)return;
 if(Math.sign(m)!==dir){say(m>0?'This is an add. Adding hops to the right.':'This is a take away. Taking away hops to the left.');sfx('miss');return}
 F.trail.push([F.pos,to]);F.pos=to;sfx('tick');
 if(F.trail.length===Math.abs(m)){sfx('pop');say(`${s}/${d} ${m>0?'+':'−'} ${Math.abs(m)}/${d} = ${to}/${d}. Each hop is one seventh, so you counted sevenths, just like counting ones.`);
  const k=F.k;setTimeout(()=>{if(k!==F.k)return;F.q++;if(F.q<2){F.pos=HOPS[F.q][0];F.trail=[]}sync();F.want()},A.reduced()?20:1200)}
 else say(`${to}/${d}.`);sync()}
function dChal(g,W,H,C){rowBar(g,H*.3,5,fill(5,3,oc()).map((v,i)=>i===3?tc():v),C);const y=H*.7;frac(3,5,W*.26,y,16,oc());txt('+',W*.37,y,22);frac(1,5,W*.48,y,16,tc());txt('=',W*.59,y,22);frac(4,5,W*.7,y,16,C.tx)}
function buttons(){if(!bar)return;bar.innerHTML='';const v=sg(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t).onclick=f};
 if(v==='join'){b('Slide an orange fifth',()=>slide(0));b('Slide a teal fifth',()=>slide(1))}
 if(v==='add'&&F.q<3&&!F.got){const o=opts(),r=F.q%3;[...o.slice(r),...o.slice(0,r)].forEach(([n,d])=>b(`${n}/${d}`,()=>answer(n,d),`${n} over ${d}`))}
 if(v==='sub'&&F.q<2)b('Cross out a part',()=>cross(-1));
 if(v==='whole'&&F.q<2)b('Fill a part',()=>top(-1));
 if(v==='line'&&F.q<2){b('◀ Hop back',()=>hop(-1),'Hop one seventh left');b('Hop on ▶',()=>hop(1),'Hop one seventh right')}}
function down(p){const v=sg();
 if(v==='join'){for(const[w,R]of[[0,F.RA],[1,F.RB]]){const i=hitCell(p,R),left=2-(w?F.jb:F.ja);if(i>=0&&i<left){F.drag={w,x:p.x,y:p.y,sx:p.x,sy:p.y,col:w?tc():oc()};draw();return true}}if(hitCell(p,F.RC)>=0)say('Drag a coloured part down into this bar, or press a button.');return false}
 if(v==='sub'){cross(hitCell(p,F.R));return false}if(v==='whole'){top(hitCell(p,F.R));return false}
 if(v==='line'){F.sw={x:p.x};hop(p.x>NL().x0+(NL().x1-NL().x0)*((F.pos+.5)/HOPS[Math.min(F.q,1)][2])?1:-1);return false}return false}
function move(p){if(F.drag){F.drag.x=p.x;F.drag.y=p.y;draw()}}
function up(p){const d=F.drag;F.drag=0;if(d){if(!p||Math.hypot(p.x-d.sx,p.y-d.sy)<10||(p.y>F.RC.y-30&&p.y<F.RC.y+F.RC.h+30))slide(d.w);else{say('Drop it in the empty bar.');draw()}}}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,acts){steps[n].go();const k=F.k;acts.forEach((f,j)=>setTimeout(()=>{if(k===F.k)f()},A.reduced()?40*(j+1):(j+1)*380))}
function reset(v){const k=(F.k||0)+1;for(const x in F)delete F[x];Object.assign(F,{k,want:()=>{},ja:0,jb:0,res:[],q:0,got:0,ghost:null,cells:[],pos:0,trail:[],drag:0});
 if(v==='sub')F.cells=fill(8,6,pc());if(v==='whole')F.cells=fill(5,3,oc());if(v==='line')F.pos=HOPS[0][0]}
const wait=()=>new Promise(r=>setTimeout(r,A.reduced()?60:1300));
const steps=[
{h:'Same-size parts',p:'2/5 means 2 parts out of 5 equal parts. The bottom number is the denominator: it says what size the parts are. The top number is the numerator: it counts the parts.',
 predict:{q:'2/5 + 2/5 = ?',opts:['4/10','4/5','2/5'],ans:1},task:'Move all 4 parts into the empty bar',
 show:()=>play(0,[()=>slide(0),()=>slide(0),()=>slide(1),()=>slide(1)]),
 go:()=>{reset('join');say('Drag a coloured part into the empty bar, or press a button.');buttons();F.want=fin(0,()=>F.res.length>=4,'The parts are fifths before and after, so 2/5 + 2/5 = 4/5.')}},
{h:'Add the numerators',p:'When the denominators are the same, add the numerators and keep the denominator. The parts do not change size, so the bottom number does not change.',
 task:'Answer all three sums',
 show:()=>{steps[1].go();const k=F.k;(async()=>{for(let i=0;i<3;i++){if(k!==F.k)return;const[a,b,d]=SUMS[i];answer(a+b,d);await wait()}})()},
 go:()=>{reset('add');say('Pick the answer for each sum.');buttons();F.want=fin(1,()=>F.q>=3,'5/7 + 1/7 = 6/7, 3/8 + 4/8 = 7/8 and 1/4 + 2/4 = 3/4.')}},
{h:'Take away parts',p:'To subtract, take away some of the parts. Take away the numerators and keep the denominator: the parts that are left are still the same size.',
 predict:{q:'6/8 − 3/8 = ?',opts:['3/0','3/8','3/16'],ans:1},task:'Take away 3/8 from 6/8, then 4/6 from 5/6',
 show:()=>{steps[2].go();const k=F.k;(async()=>{for(const n of[3,4])for(let i=0;i<n;i++){if(k!==F.k)return;cross(-1);await new Promise(r=>setTimeout(r,A.reduced()?40:i===n-1?1400:300))}})()},
 go:()=>{reset('sub');say('Tap shaded parts to cross them out.');buttons();F.want=fin(2,()=>F.q>=2,'6/8 − 3/8 = 3/8 and 5/6 − 4/6 = 1/6.')}},
{h:'Make one whole',p:'A whole bar cut into 5 parts is 5/5. When the numerator and the denominator are the same, the fraction is one whole.',
 predict:{q:'How many fifths make one whole?',opts:['5','1','10'],ans:0},task:'Fill the bar: 3/5 + ? = 1, then 1/4 + ? = 1',
 show:()=>{steps[3].go();const k=F.k;(async()=>{for(const n of[2,3])for(let i=0;i<n;i++){if(k!==F.k)return;top(-1);await new Promise(r=>setTimeout(r,A.reduced()?40:i===n-1?1400:300))}})()},
 go:()=>{reset('whole');say('Tap the empty parts to fill the bar.');buttons();F.want=fin(3,()=>F.q>=2,'3/5 + 2/5 = 5/5 = 1 and 1/4 + 3/4 = 4/4 = 1.')}},
{h:'Hop in sevenths',p:'On a number line from 0 to 1 cut into sevenths, each hop is 1/7. Adding hops right. Taking away hops left.',
 task:'Hop 2/7 + 3/7, then 6/7 − 4/7',
 show:()=>{steps[4].go();const k=F.k;(async()=>{for(const[n,dir]of[[3,1],[4,-1]])for(let i=0;i<n;i++){if(k!==F.k)return;hop(dir);await new Promise(r=>setTimeout(r,A.reduced()?40:i===n-1?1400:300))}})()},
 go:()=>{reset('line');say('Tap to the right of the frog to hop on, to the left to hop back.');buttons();F.want=fin(4,()=>F.q>=2,'2/7 + 3/7 = 5/7 and 6/7 − 4/7 = 2/7.')}},
{h:'Challenge',p:'',go:()=>{reset('chal');ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>F.want()});
const QS=[['1/5 + 3/5 = ?',[['4/5','ok'],['4/10','addden'],['3/5','one']]],
 ['4/9 + 3/9 = ?',[['7/9','ok'],['7/18','addden'],['1/9','sub']]],
 ['7/8 − 2/8 = ?',[['5/8','ok'],['5/0','subden'],['9/8','add']]],
 ['2/6 + ? = 1 whole',[['4/6','ok'],['1/6','one'],['4/12','addden']]],
 ['3/10 + 4/10 = ?',[['7/10','ok'],['12/10','mult'],['7/20','addden']]],
 ['5/7 − 5/7 = ?',[['0','ok'],['0/0','subden'],['5/7','zero']]],
 ['Which one is equal to 1 whole?',[['4/4','ok'],['1/4','unit'],['4/8','half']]]];
function why(t){let m='Add or take away the numerators. Keep the denominator.';
 if(t==='addden')m='That adds the denominators too. The parts stay the same size, so the denominator stays the same: only the numerators add.';
 if(t==='subden')m='That takes away the denominators. The parts are still the same size, so keep the denominator. A denominator of 0 makes no sense.';
 if(t==='one')m='That is only one of the fractions, or one part. Count every part you need.';
 if(t==='sub')m='That takes away. The sign is +, so add the numerators.';
 if(t==='add')m='That adds. The sign is −, so take away the numerators.';
 if(t==='mult')m='That multiplies 3 × 4. To add, 3 tenths + 4 tenths = 7 tenths.';
 if(t==='zero')m='Taking away all of it leaves nothing: 5 sevenths − 5 sevenths = 0.';
 if(t==='unit')m='1/4 is one part of four. A whole needs all the parts: 4/4.';
 if(t==='half')m='4/8 is 4 parts out of 8: only half. A whole is 8/8 or 4/4.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=(qi*2+1)%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');[...ops.slice(rot),...ops.slice(0,rot)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});say('Challenge: '+q);draw()}
function judge(t){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;sfx('miss')}fb.innerHTML=(ok?`✓ Right! ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw:paint,onStep:A=>{box.hidden=A.step!==5;bar.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);reset('join');A.gest({down,move,up});buttons()}});
A.start()})})();
