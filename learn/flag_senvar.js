/* Flagship – varying sentence structure (ages 10–11; CCSS L.5.3a expand, combine and reduce sentences; NC 2013 Years
   5-6 writing). Scenes: combine two sentences two ways, expand a short sentence with three add-ons in the right gaps,
   cut repeated words from wordy sentences, pick the structure that fits a writing aim, judge a robot's claims.
   Data in learn/senvar_art.js. */
(()=>{const {BUILD,KIND,BASE,ADDS,CUTS,AIMS,ROBOT,DESC,DONE,QS}=SNV;
VIS.reg('flagsenvar',c=>{let A,keys,box,qi=-1,tick=0;const G={};
const INK='#0f172a',RIGHT='#047857',WRONG='#b91c1c',LINE='#475569',COORD='#dbeafe',SUB='#fce7f3',ADD='#fef3c7',F='px system-ui,sans-serif';
const now=()=>['build','grow','trim','aim','robot','quiz'][A.step];
const em=v=>A.narrow?v:Math.round(v*1.1);
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f5f3ff',A.col.dark?.05:.5);g.fillRect(0,0,A.W,A.H)}
function lines(t,w,v,wt){const g=A.ctx;g.font=`${wt||700} ${em(v)}${F}`;const out=[];let cur='';t.split(' ').forEach(x=>{const n=cur?cur+' '+x:x;if(g.measureText(n).width>w&&cur){out.push(cur);cur=x}else cur=n});if(cur)out.push(cur);return out}
function text(t,x,y,v,col,wt,w){const g=A.ctx,L=w?lines(t,w,v,wt):[t];g.font=`${wt||700} ${em(v)}${F}`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';
 L.forEach((s,i)=>g.fillText(s,x,y+(i-(L.length-1)/2)*em(v)*1.25))}
function tag(t,y,o){o=o||{};const g=A.ctx,v=em(o.v||13),L=lines(t,A.W-36,o.v||13,800);g.font=`800 ${v}${F}`;const w=Math.min(A.W-8,Math.max(...L.map(s=>g.measureText(s).width))+22),h=L.length*v*1.25+12,x0=(A.W-w)/2;
 g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,9);g.fill();g.lineWidth=o.ok?3:1.5;g.strokeStyle=o.ok?RIGHT:LINE;g.stroke();text(t,A.W/2,y,o.v||13,INK,800,A.W-36)}
function card(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||(o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#ede9fe':'#ffffff');A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();
 g.lineWidth=o.no||o.ok||o.sel?3.5:1.5;g.strokeStyle=o.no?WRONG:o.ok?RIGHT:o.sel?'#6d28d9':LINE;if(o.dash)g.setLineDash([5,4]);g.stroke();g.setLineDash([])}
/* lay out labelled boxes left to right, wrapping onto new rows */
function flow(items,y0,h){const g=A.ctx,gap=6;g.font=`800 ${em(13)}${F}`;let x=8,y=y0;return items.map(it=>{const w=it.w||Math.max(40,g.measureText(it.t).width+16);if(x+w>A.W-8){x=8;y+=h+gap}const r={...it,x,y,w,h};x+=w+gap;return r})}
/* ---- scene 1: combine ---- */
const chipR=()=>{const w=(A.W-30)/4,h=Math.min(56,A.H*.13);return BUILD.chips.map((C,i)=>({i,x:6+i*(w+6),y:A.H*.8,w,h}))};
function drawBuild(){const s=G.build;wash();const goal=BUILD.goals[s.g];
 tag(s.g<2?`Make it ${KIND[goal].split(' (')[0].toLowerCase()}: ${KIND[goal].split('(')[1].replace(')','')}`:'Both built',A.H*.08,{ok:s.g>=2,v:12});
 tag(`${BUILD.a}. ${BUILD.b[0].toUpperCase()+BUILD.b.slice(1)}.`,A.H*.22,{v:12});
 s.made.forEach((m,i)=>{const r={x:10,y:A.H*(.34+i*.2),w:A.W-20,h:A.H*.16};card(r,{fill:i?SUB:COORD});text(m,A.W/2,r.y+r.h/2,12,INK,800,A.W-40)});
 if(s.g<2)chipR().forEach(r=>{card(r,{no:s.bad===r.i,fill:BUILD.chips[r.i].k===1?COORD:SUB});text(BUILD.chips[r.i].t,r.x+r.w/2,r.y+r.h/2+1,15,INK,900)})}
function join(i){const s=G.build;if(s.g>=2)return;const C=BUILD.chips[i],goal=BUILD.goals[s.g];
 if(C.k!==goal){s.bad=i;A.sound.miss();return say(goal===1?`"${C.t}" makes one clause depend on the other. First join them as equals.`:`"${C.t}" joins two equal clauses. Now make one depend on the other, to show how they link.`)}
 s.bad=-1;s.made.push(BUILD.make[C.t]);s.g++;A.sound.pop();say(`${BUILD.make[C.t]} `+(s.g<2?'Now make one clause depend on the other.':'Same ideas, two structures.'))}
/* ---- scene 2: expand ---- */
function growItems(){const s=G.grow,fill=k=>{const a=ADDS.findIndex(d=>s.put[ADDS.indexOf(d)]&&d.slot===k);return a};const out=[];
 [0,1,2].forEach(k=>{const a=fill(k);out.push(a>=0?{t:ADDS[a].t,kind:'add'}:{t:'+',slot:k,w:44,kind:'gap'});if(k<2)out.push({t:k===0&&ADDS.some((d,j)=>s.put[j]&&d.slot===0)?BASE[0].toLowerCase():BASE[k],kind:'base'})});
 out.push({t:'.',kind:'base',w:24});return flow(out,A.H*.24,Math.min(44,A.H*.11))}
const addR=()=>{const h=Math.min(48,A.H*.12);return flow(ADDS.map((d,i)=>({t:d.t,i})),A.H*.7,h).filter(r=>!G.grow.put[r.i])};
function drawGrow(){const s=G.grow;wash();const n=Object.keys(s.put).length;tag(n<3?'Drag each add-on to its gap':'Expanded',A.H*.08,{ok:n>=3});
 growItems().forEach(r=>{card(r,{fill:r.kind==='add'?ADD:r.kind==='gap'?(s.hot===r.slot?'#ede9fe':'#ffffff'):'#f1f5f9',dash:r.kind==='gap',no:r.kind==='gap'&&s.bad===r.slot});text(r.t,r.x+r.w/2,r.y+r.h/2+1,13,INK,800)});
 addR().forEach(r=>{const d=s.drag&&s.drag.i===r.i,R=d?{...r,x:s.drag.x-r.w/2,y:s.drag.y-r.h/2}:r;card(R,{fill:ADD,sel:s.pick===r.i||d});text(r.t,R.x+R.w/2,R.y+R.h/2+1,13,INK,800)})}
function slotIt(i,k){const s=G.grow;if(s.put[i])return;const D=ADDS[i];s.pick=null;
 if(D.slot!==k){s.bad=k;A.sound.miss();return say(D.slot===1?'An appositive renames the dog, so it sits right after "the dog", with commas on both sides.':D.slot===0?'"Suddenly," opens the sentence: it goes at the very start.':'"at the gate" tells where the dog barked, so it follows "barked".')}
 s.put[i]=true;s.bad=-1;A.sound.pop();say(`Added ${D.what}.`)}
/* ---- scene 3: reduce ---- */
function trimItems(){const C=CUTS[G.trim.r];return C?flow(C.w.map((t,i)=>({t,i})),A.H*.24,Math.min(44,A.H*.11)):[]}
function drawTrim(){const s=G.trim,g=A.ctx;wash();if(s.r>=CUTS.length){tag('Both trimmed',A.H*.12,{ok:1});CUTS.forEach((C,i)=>tag(C.out,A.H*(.32+i*.14),{v:12}));return}
 const C=CUTS[s.r],left=C.groups.filter(G0=>!G0.some(i=>s.cut.includes(i))).length;tag(left?`Cut the repeats: ${left} to go`:'',A.H*.08);
 trimItems().forEach(r=>{const x=s.cut.includes(r.i);card(r,{fill:x?'#e2e8f0':'#ffffff',no:s.bad===r.i});text(r.t,r.x+r.w/2,r.y+r.h/2+1,13,x?'#475569':INK,800);
  if(x){g.strokeStyle=WRONG;g.lineWidth=2.5;g.beginPath();g.moveTo(r.x+6,r.y+r.h/2);g.lineTo(r.x+r.w-6,r.y+r.h/2);g.stroke()}})}
function cut(i){const s=G.trim;if(s.r>=CUTS.length)return;const C=CUTS[s.r];if(s.cut.includes(i))return;const grp=C.groups.find(G0=>G0.includes(i));
 if(!grp){s.bad=i;A.sound.miss();return say(`"${C.w[i]}" carries meaning. Cutting it changes or breaks the sentence.`)}
 if(grp.some(j=>s.cut.includes(j))){s.bad=i;A.sound.miss();return say('You already cut its twin. Keep one, or the idea disappears.')}
 s.cut.push(i);s.bad=-1;A.sound.pop();const pair=grp.length>1?` It repeats "${C.w[grp.find(j=>j!==i)]}".`:' It repeats an idea already there.';
 if(C.groups.every(G0=>G0.some(j=>s.cut.includes(j)))){s.r++;s.cut=[];return say(`Cut "${C.w[i]}".${pair} Done. One version: ${C.out}`)}say(`Cut "${C.w[i]}".${pair}`)}
/* ---- scene 4: aim ---- */
const optR=()=>{const h=Math.min(A.H*.17,70);return[0,1,2].map(i=>({i,x:10,y:A.H*.24+i*(h+8),w:A.W-20,h}))};
function drawAim(){const s=G.aim;wash();if(s.r>=AIMS.length){tag('All 3 aims matched',A.H*.12,{ok:1});tag('Choose the structure for the job',A.H*.32);return}
 const M=AIMS[s.r];tag(`Aim: ${M.aim}`,A.H*.09,{v:13});optR().forEach(r=>{const o=s.order[r.i];card(r,{no:s.bad===o});text(M.opts[o],A.W/2,r.y+r.h/2,12,INK,700,A.W-44)})}
function choose(o){const s=G.aim;if(s.r>=AIMS.length)return;const M=AIMS[s.r];if(o!==0){s.bad=o;A.sound.miss();return say(M.why[o])}
 s.r++;s.bad=-1;s.order=[[2,0,1],[1,2,0]][s.r-1]||[0,1,2];A.sound.pop();say(`Yes: "${M.opts[0]}" `+(s.r<AIMS.length?'Next aim.':''))}
/* ---- scene 5: robot ---- */
const rk=()=>[0,1].map(k=>{const w=Math.min(170,(A.W-36)/2);return{k,x:A.W/2+(k?6:-w-6),y:A.H*.78,w,h:Math.min(A.H*.15,58)}});
function drawRobot(){const s=G.robot,g=A.ctx;wash();if(s.i>=ROBOT.length){tag('All 5 checked',A.H*.15,{ok:1});tag('Vary length, show links, punctuate add-ons, cut repeats',A.H*.35,{v:12});return}
 const u=Math.min(A.W*.07,30),cx=A.W/2,cy=A.H*.14;g.fillStyle='#cbd5e1';A.paint.rrect(cx-u,cy-u,u*2,u*1.8,9);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 g.fillStyle='#0369a1';[-1,1].forEach(e=>{g.beginPath();g.arc(cx+e*u*.42,cy-u*.25,u*.2,0,7);g.fill()});
 tag(ROBOT[s.i].s,A.H*.45,{v:12});tag(`${s.i+1} of ${ROBOT.length}: right, or a slip?`,A.H*.64,{v:11});rk().forEach(r=>{card(r,{no:s.bad===r.k});text(r.k?'✗ Slip':'✓ Right',r.x+r.w/2,r.y+r.h/2+1,16,INK,900)})}
function rule(k){const s=G.robot;if(s.i>=ROBOT.length)return;const R=ROBOT[s.i];if((k===0)!==R.ok){s.bad=k;A.sound.miss();return say(R.ok?`Check again: ${R.fix}`:`Think again. ${R.fix}`)}
 s.bad=-1;s.i++;A.sound.pop();say((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const k=now();if(k==='quiz'){wash();tag('Challenge',A.H*.2,{ok:1});tag('Combine, expand, cut: choose for the reader',A.H*.5);return}
 ({build:drawBuild,grow:drawGrow,trim:drawTrim,aim:drawAim,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now(),s=G[k];
 if(k==='build'){const r=chipR().find(r=>on(p,r));if(r)join(r.i)}
 if(k==='grow'){const r=addR().find(r=>on(p,r));if(r){s.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const gp=growItems().find(r=>r.kind==='gap'&&on(p,r));if(gp&&s.pick!=null)slotIt(s.pick,gp.slot)}
 if(k==='trim'){const r=trimItems().find(r=>on(p,r));if(r)cut(r.i)}
 if(k==='aim'){const r=optR().find(r=>on(p,r));if(r)choose(s.order[r.i])}
 if(k==='robot'){const r=rk().find(r=>on(p,r));if(r)rule(r.k)}
 return false}
function move(p){const s=G.grow;if(now()!=='grow'||!s.drag)return;s.drag.x=p.x;s.drag.y=p.y;const gp=growItems().find(r=>r.kind==='gap'&&on(p,r));s.hot=gp?gp.slot:-1;A.redraw()}
function up(p){const s=G.grow;if(now()!=='grow'||!s.drag)return;const q=s.drag;s.drag=null;s.hot=-1;const gp=growItems().find(r=>r.kind==='gap'&&on(p,r));if(gp)return slotIt(q.i,gp.slot);
 if(Math.hypot(p.x-q.x0,p.y-q.y0)<10){s.pick=q.i;return say('Add-on picked. Now tap a gap.')}A.redraw()}
function clear(){tick++;for(const k in G)delete G[k];Object.assign(G,{build:{g:0,made:[],bad:-1},grow:{put:{},pick:null,drag:null,hot:-1,bad:-1},trim:{r:0,cut:[],bad:-1},aim:{r:0,bad:-1,order:[1,0,2]},robot:{i:0,bad:-1},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();G.check()}
const finishWhen=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){clear();say(DESC[i]);G.check=finishWhen(i,ok,DONE[i])}
function demo(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
function btns(){if(!keys)return;keys.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='build'&&G.build.g<2)BUILD.chips.forEach((C,i)=>B(C.t,()=>join(i),`Join with ${C.t}`));
 if(k==='grow'){const i=ADDS.findIndex((d,j)=>!G.grow.put[j]);if(i>=0)['at the start','after "the dog"','after "barked"'].forEach((t,kk)=>B(`Put "${ADDS[i].t}" ${t}`,()=>slotIt(i,kk)))}
 if(k==='trim'&&G.trim.r<CUTS.length)CUTS[G.trim.r].w.forEach((w,i)=>{if(!G.trim.cut.includes(i))B(`Cut "${w}"`,()=>cut(i))});
 if(k==='aim'&&G.aim.r<AIMS.length)G.aim.order.forEach((o,n)=>B(`Version ${n+1}`,()=>choose(o),`Version ${n+1}: ${AIMS[G.aim.r].opts[o]}`));
 if(k==='robot'&&G.robot.i<ROBOT.length){B('✓ Right',()=>rule(0),'The robot is right');B('✗ Slip',()=>rule(1),'The robot made a slip')}}
const steps=[
{h:'Combine',p:'Two short sentences can become one. Tap a joining word to build each kind.',
 predict:{q:'Which joining word shows that the storm caused the lights to go out?',opts:['and','because'],ans:1},task:'Build both sentences',
 show:()=>demo(0,[()=>join(1),()=>join(2)],600),go:()=>enter(0,()=>G.build.g>=2)},
{h:'Expand',p:'Grow a short sentence. Drag each add-on into its gap, or tap an add-on then a gap.',
 predict:{q:'"a scruffy terrier" goes after "The dog". How many commas does it need?',opts:['One, before it','Two, one on each side'],ans:1},task:'Place all 3 add-ons',
 show:()=>demo(1,ADDS.map((d,i)=>()=>slotIt(i,d.slot)),500),go:()=>enter(1,()=>Object.keys(G.grow.put).length===ADDS.length)},
{h:'Reduce',p:'Wordy sentences say the same thing twice. Tap each word that repeats an idea to cut it.',
 predict:{q:'Does a longer sentence always say more?',opts:['Yes, more words, more meaning','No, some words repeat an idea'],ans:1},task:'Trim both sentences',
 show:()=>demo(2,CUTS.flatMap(C=>C.groups.map(G0=>()=>cut(G0[0]))),450),go:()=>enter(2,()=>G.trim.r>=CUTS.length)},
{h:'Fit the aim',p:'Writers vary sentences for effect. Tap the version that does the job best.',task:'Match all 3 aims',
 show:()=>demo(3,AIMS.map(()=>()=>choose(0)),600),go:()=>enter(3,()=>G.aim.r>=AIMS.length)},
{h:'Spot the slip',p:'The robot makes claims about sentences. Right, or a slip?',task:'Check all 5 claims',
 show:()=>demo(4,ROBOT.map(R=>()=>rule(R.ok?0:1)),520),go:()=>enter(4,()=>G.robot.i>=ROBOT.length)},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
function why(t){let m='Think about what the reader needs: the link, the detail, or fewer words.';
 if(t==='and')m='"and" only adds ideas. To show cause, join with because, so or as.';
 if(t==='short')m='Two short sentences leave the reader to guess the link. Join them to show it.';
 if(t==='comma')m='Extra information in the middle of a sentence needs a comma on both sides.';
 if(t==='meaning')m='That word carries meaning. Only cut words that repeat an idea already there.';
 if(t==='long')m='Variety matters. After long sentences, a short one stands out.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:st=>{box.hidden=st.step!==5;keys.hidden=st.step===5;btns()},
 init:st=>{A=st;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sentence lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});btns()}}).start()})})();
