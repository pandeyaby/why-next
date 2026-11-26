/* Flagship – same and different: comparing two things (Learning to Learn, ages 4-5; Development Matters 2021
   Characteristics of Effective Learning 'making links and noticing patterns', Reception 'compare and contrast'; EYFS
   ELGs 'similarities and differences'). Compare a cat and a horse one feature at a time, drag both or but into a
   sentence gap, sort a duck's and a fish's features into only-this / both / only-that boxes, find the one way two
   unlike things match, and check two nearly matching houses part by part for a tiny difference. Data and drawings:
   samediff_art.js. */
(()=>{const D=SDF;
VIS.reg('flagsamediff',c=>{let A,pad,quiz,qn=-1,gen=0,held=null;const S={};c.fig.classList.add('young');
const KEYS=['rows','gap','venn','oneway','spot','chal'],key=()=>KEYS[A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
let TAP=[],SLOT=null,BOX=[],HOUSE=null;
function row(n,top,h,gap){const w=(A.W-16-gap*(n-1))/n;return Array.from({length:n},(_,i)=>({i,x:8+i*(w+gap),y:top,w,h}))}
function note(text,bad){S.msg=text;S.bad=!!bad;c.say(text);A.cv.setAttribute('aria-label',text);A.redraw();controls();S.test()}
const mood=fin=>fin?'ok':S.bad?'no':'';
/* ---- 1. one feature at a time ---- */
function judgeRow(same){const s=S.r;if(s.k>=D.ROWS.length)return;const R=D.ROWS[s.k];
 if(same!==R.same){s.wrong=same;A.sound.miss();return note(R.no,true)}
 s.wrong=-1;s.k++;A.sound.pop();note(`${R.f}: ${R.same?'the same':'different'}. Cat ${R.v[0]}, horse ${R.v[1]}.`,false)}
function drawRows(){const s=S.r,fin=s.k>=D.ROWS.length,g=A.ctx,dk=A.col.dark,y0=D.banner(A,fin?D.DONE[0]:`Check the ${D.ROWS[s.k].f.toLowerCase()}. Same or different? (${s.k+1} of 4)`,mood(fin),S.msg,S.bad);
 const ph=Math.min(120,(A.H-y0)*.26);D.pair(A,y0+4,ph,D.PAIR1.l,D.PAIR1.r);let y=y0+ph+14;
 D.ROWS.slice(0,s.k).forEach(R=>{g.font=`700 15px system-ui,sans-serif`;g.fillStyle=dk?(R.same?'#86efac':'#fcd34d'):(R.same?'#047857':'#92400e');g.textAlign='center';g.textBaseline='middle';
  g.fillText(`${R.f}: ${R.v[0]} / ${R.v[1]} \u2192 ${R.same?'same':'different'}`,A.W/2,y+9);y+=22});
 if(fin){TAP=[];return}const R=D.ROWS[s.k];D.tile(A.ctx,{x:A.W*.07,y:y+6,w:A.W*.4,h:58},R.v[0],{ic:R.ic,n:17});D.tile(A.ctx,{x:A.W*.53,y:y+6,w:A.W*.4,h:58},R.v[1],{ic:R.ic,n:17});
 TAP=row(2,y+80,Math.min(86,A.H-y-90),12);TAP.forEach(r=>D.tile(g,r,r.i?'\u2260 Different':'= Same',{state:s.wrong===(r.i?0:1)?'no':'',n:22}))}
/* ---- 2. both or but ---- */
function fillGap(word){const s=S.g;if(s.k>=D.GAPS.length)return;const G=D.GAPS[s.k];
 if(word!==G.w){s.wrong=word;A.sound.miss();return note(D.WORD_NO[word],true)}
 s.wrong=null;s.made.push(G.say);s.k++;A.sound.pop();note(G.say,false)}
function sentence(G,word){const w=word||'_____';return G.pre?`${G.pre} ${w} ${G.post}`:`${w.charAt(0).toUpperCase()+w.slice(1)} ${G.post}`}
function drawGap(){const s=S.g,fin=s.k>=D.GAPS.length,g=A.ctx,dk=A.col.dark,y0=D.banner(A,fin?D.DONE[1]:`Drag both or but into the gap. (${s.k+1} of 4)`,mood(fin),S.msg,S.bad);
 if(fin){TAP=[];SLOT=null;s.made.forEach((t,i)=>D.tile(g,{x:8,y:y0+6+i*60,w:A.W-16,h:52},t,{state:'ok',n:16}));return}
 const G=D.GAPS[s.k],ph=Math.min(100,(A.H-y0)*.22);D.pair(A,y0+4,ph,[G.pic[0],''],[G.pic[1],'']);
 SLOT={x:8,y:y0+ph+16,w:A.W-16,h:Math.max(64,ph*.7)};g.fillStyle=dk?'#0f172a':'#fffbeb';D.box(g,SLOT.x,SLOT.y,SLOT.w,SLOT.h,12);g.fill();g.strokeStyle=s.wrong?'#b91c1c':'#b45309';g.lineWidth=s.wrong?4:2;g.stroke();
 const rows=D.lines(g,sentence(G,s.wrong),SLOT.w-20,'800 18px system-ui,sans-serif');g.fillStyle=dk?D.LIGHT:D.INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((t,i)=>g.fillText(t,A.W/2,SLOT.y+SLOT.h/2+(i-(rows.length-1)/2)*22));
 TAP=row(2,SLOT.y+SLOT.h+22,Math.min(84,A.H-SLOT.y-SLOT.h-34),16);TAP.forEach(r=>{const w=r.i?'but':'both';if(held&&held.i===r.i)return D.tile(g,r,'',{state:'sel'});D.tile(g,r,w,{n:26})});
 if(held)D.tile(g,{x:held.x-55,y:held.y-30,w:110,h:60},held.i?'but':'both',{state:'sel',n:24})}
/* ---- 3. only this one, both, only that one ---- */
function place(i,z){const s=S.v;if(s.at[i]!=null)return;const X=D.FEAT[i];
 if(z!==X.z){s.wrong=i;A.sound.miss();return note(X.no,true)}
 s.at[i]=z;s.wrong=-1;s.pick=null;s.k++;A.sound.pop();note(`${X.t}: ${D.ZONES[z].toLowerCase()}.`,false)}
function drawVenn(){const s=S.v,fin=s.k>=D.FEAT.length,g=A.ctx,dk=A.col.dark,y0=D.banner(A,fin?D.DONE[2]:`Duck or fish or both? Drag each card into a box. (${s.k} of 6 done)`,mood(fin),S.msg,S.bad);
 const bh=Math.min(170,(A.H-y0)*.4);BOX=row(3,y0+4,bh,8).map(r=>{const mid=r.i===1;g.fillStyle=mid?(dk?'#1e3a5f':'#eff6ff'):(dk?'#1e293b':'#ffffff');D.box(g,r.x,r.y,r.w,r.h,14);g.fill();
  g.strokeStyle=mid?'#1d4ed8':'#64748b';g.lineWidth=mid?3:2;g.stroke();const em=r.i===0?D.PAIR3.l[0]:r.i===2?D.PAIR3.r[0]:D.PAIR3.l[0]+D.PAIR3.r[0];D.pic(g,em,r.x+r.w/2,r.y+24,r.i===1?22:30);
  g.font=`800 ${A.narrow?13:15}px system-ui,sans-serif`;g.fillStyle=dk?D.LIGHT:D.INK;g.textAlign='center';g.textBaseline='middle';g.fillText(D.ZONES[r.i],r.x+r.w/2,r.y+50);
  let n=0;D.FEAT.forEach((X,i)=>{if(s.at[i]===r.i){g.font=`700 ${A.narrow?12:14}px system-ui,sans-serif`;g.fillStyle=dk?'#86efac':'#047857';g.fillText('\u2713 '+X.t.replace('Has ','').replace('Can ',''),r.x+r.w/2,r.y+74+n*20);n++}});return r});
 const left=D.FEAT.map((_,i)=>i).filter(i=>s.at[i]==null);if(fin){TAP=[];return}
 TAP=[];const cols=A.narrow?2:3,cw=(A.W-16-10*(cols-1))/cols;left.forEach((i,k)=>TAP.push({i,x:8+(k%cols)*(cw+10),y:y0+bh+18+Math.floor(k/cols)*68,w:cw,h:58}));
 TAP.forEach(r=>{if(held&&held.i===r.i)return D.tile(g,r,'',{state:'sel'});D.tile(g,r,D.FEAT[r.i].t,{state:s.wrong===r.i?'no':s.pick===r.i?'sel':'',n:17})});
 if(held)D.tile(g,{x:held.x-70,y:held.y-28,w:140,h:56},D.FEAT[held.i].t,{state:'sel',n:16})}
/* ---- 4. the same in one way ---- */
function chooseWay(j){const s=S.o;if(s.k>=D.ONEWAY.length)return;const P=D.ONEWAY[s.k],O=P.o[j];
 if(!O[1]){s.wrong=j;A.sound.miss();return note(`${O[0]}? No. ${O[2]}`,true)}
 s.wrong=-1;s.k++;A.sound.pop();note(P.yes,false)}
function drawOneway(){const s=S.o,fin=s.k>=D.ONEWAY.length,g=A.ctx,P=D.ONEWAY[Math.min(s.k,D.ONEWAY.length-1)],y0=D.banner(A,fin?D.DONE[3]:`How are they the SAME? (${s.k+1} of 3)`,mood(fin),S.msg,S.bad);
 const ph=Math.min(130,(A.H-y0)*.3);D.pair(A,y0+4,ph,[P.p[0],P.n[0]],[P.p[1],P.n[1]]);if(fin){TAP=[];return}
 TAP=Array.from({length:3},(_,i)=>({i,x:8,y:y0+ph+18+i*72,w:A.W-16,h:62}));TAP.forEach(r=>D.tile(g,r,P.o[r.i][0],{state:s.wrong===r.i?'no':'',n:20}))}
/* ---- 5. spot the small difference ---- */
function checkPart(name){const s=S.s;if(s.k>=D.SPOT.length)return;const R=D.SPOT[s.k];
 if(name!==R.miss){s.wrong=name;s.checked.push(name);A.sound.miss();return note(`The ${name} is the same in both houses. Check another part.`,true)}
 s.wrong=null;s.checked=[];s.k++;A.sound.pop();note(R.say,false)}
function drawSpot(){const s=S.s,fin=s.k>=D.SPOT.length,g=A.ctx,dk=A.col.dark,y0=D.banner(A,fin?D.DONE[4]:`Find the 1 difference. Tap a part of the right house. (${s.k+1} of 3)`,mood(fin),S.msg,S.bad);
 const hw=(A.W-30)/2,hh=Math.min(hw*1.05,(A.H-y0)*.62),R=D.SPOT[Math.min(s.k,D.SPOT.length-1)],skip=fin?null:R.miss;
 g.font='800 15px system-ui,sans-serif';g.fillStyle=dk?D.LIGHT:D.INK;g.textAlign='center';g.textBaseline='top';g.fillText('Left',8+hw/2,y0+2);g.fillText('Right',22+hw*1.5,y0+2);
 D.house(g,8,y0+24,hw,hh,null,dk);HOUSE=D.house(g,22+hw,y0+24,hw,hh,skip,dk);
 (s.checked||[]).forEach(k=>{const r=HOUSE[k];g.strokeStyle='#64748b';g.setLineDash([5,4]);g.lineWidth=2;g.strokeRect(r.x-3,r.y-3,r.w+6,r.h+6);g.setLineDash([])});
 if(fin){HOUSE=null;g.font='800 17px system-ui,sans-serif';g.fillStyle=dk?'#86efac':'#047857';g.textAlign='center';D.lines(g,'All 3 found: a chimney, a window and a door handle.',A.W-30,g.font).forEach((t,i)=>g.fillText(t,A.W/2,y0+hh+44+i*22))}}
/* ---- wiring ---- */
const DRAW={rows:drawRows,gap:drawGap,venn:drawVenn,oneway:drawOneway,spot:drawSpot};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=key();
 if(k==='chal'){const y0=D.banner(A,'Challenge: same and different','ok');D.pic(g,'\u{1F50E}',A.W*.35,y0+70,70);D.pic(g,'\u2696\uFE0F',A.W*.65,y0+70,70);return}
 DRAW[k]();A.fx.draw(g)}
function down(p){const k=key();
 if(k==='spot'){if(!HOUSE)return false;const n=D.PARTS.find(n=>hit(p,HOUSE[n]));if(n)checkPart(n);return false}
 if(k==='venn'&&S.v.pick!=null){const b=BOX.find(q=>hit(p,q));if(b){const i=S.v.pick;S.v.pick=null;place(i,b.i);return false}}
 const r=TAP.find(q=>hit(p,q));if(!r)return false;
 if(k==='gap'||k==='venn'){held={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 if(k==='rows')judgeRow(r.i?0:1);else if(k==='oneway')chooseWay(r.i);return false}
function move(p){if(held){held.x=p.x;held.y=p.y;A.redraw()}}
function up(p){if(!held)return;const h=held;held=null;const k=key(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<10;
 if(k==='gap'){if(tap||hit(p,SLOT))fillGap(h.i?'but':'both');else A.redraw();return}
 if(k==='venn'){const b=BOX.find(q=>hit(p,q));if(b)place(h.i,b.i);else if(tap){S.v.pick=h.i;note(`"${D.FEAT[h.i].t}". Now tap a box, or use the buttons.`,false)}else A.redraw()}}
function fresh(){gen++;held=null;for(const k in S)delete S[k];Object.assign(S,{r:{k:0,wrong:-1},g:{k:0,wrong:null,made:[]},v:{at:{},k:0,wrong:-1,pick:null},o:{k:0,wrong:-1},s:{k:0,wrong:null,checked:[]},msg:null,bad:false,test:()=>{}})}
function begin(i,finished){fresh();c.say(D.DESC[i]);A.cv.setAttribute('aria-label',D.DESC[i]);S.test=()=>{if(A.step===i&&finished()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(D.DONE[i]+A.reveal(i))};controls();A.redraw()}
function demo(i,moves){steps[i].go();const t=gen;let at=0;moves.forEach(([ms,f])=>{at+=ms;setTimeout(()=>{if(t===gen)f()},at)})}
function controls(){if(!pad)return;pad.innerHTML='';const k=key(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='rows'&&S.r.k<D.ROWS.length){const R=D.ROWS[S.r.k];b('= Same',()=>judgeRow(1),`${R.f}: the same`);b('\u2260 Different',()=>judgeRow(0),`${R.f}: different`)}
 if(k==='gap'&&S.g.k<D.GAPS.length)['both','but'].forEach(w=>b(w,()=>fillGap(w),`Put ${w} in the gap`));
 if(k==='venn'){const i=D.FEAT.findIndex((_,j)=>S.v.at[j]==null);if(i>=0)D.ZONES.forEach((z,zi)=>b(`${D.FEAT[i].t}: ${z}`,()=>place(i,zi),`${D.FEAT[i].t} goes in ${z}`))}
 if(k==='oneway'&&S.o.k<D.ONEWAY.length)D.ONEWAY[S.o.k].o.forEach((O,j)=>b(O[0],()=>chooseWay(j),`They are the same because: ${O[0]}`));
 if(k==='spot'&&S.s.k<D.SPOT.length)D.PARTS.forEach(n=>b(`Check the ${n}`,()=>checkPart(n),`Check the ${n} on the right house`))}
const steps=[
{h:'One thing at a time',p:D.TXT[0],predict:{q:'A cat and a horse. What will we find?',opts:['They are different in every way','Some things the same, some different'],ans:1},task:'Check 4 things: same or different?',
 show:()=>demo(0,D.ROWS.map(R=>[650,()=>judgeRow(R.same)])),go:()=>begin(0,()=>S.r.k>=D.ROWS.length)},
{h:'Both and but',p:D.TXT[1],predict:{q:'Which word tells us what is the SAME?',opts:['but','both'],ans:1},task:'Fill 4 gaps with both or but',
 show:()=>demo(1,D.GAPS.map(G=>[650,()=>fillGap(G.w)])),go:()=>begin(1,()=>S.g.k>=D.GAPS.length)},
{h:'Only one, or both?',p:D.TXT[2],predict:{q:'A duck and a fish can both swim. Where does "can swim" go?',opts:['Only the fish, because fish swim','In the middle: both'],ans:1},task:'Sort all 6 cards',
 show:()=>demo(2,D.FEAT.map((X,i)=>[500,()=>place(i,X.z)])),go:()=>begin(2,()=>S.v.k>=D.FEAT.length)},
{h:'The same in one way',p:D.TXT[3],predict:{q:'A strawberry and a fire engine. Are they the same?',opts:['No, not in any way','Yes, in one way: both are red'],ans:1},task:'Find the same thing in 3 pairs',
 show:()=>demo(3,D.ONEWAY.map(P=>[650,()=>chooseWay(P.o.findIndex(O=>O[1]))])),go:()=>begin(3,()=>S.o.k>=D.ONEWAY.length)},
{h:'Spot the tiny difference',p:D.TXT[4],task:'Find the difference in 3 houses',
 show:()=>demo(4,D.SPOT.map(R=>[700,()=>checkPart(R.miss)])),go:()=>begin(4,()=>S.s.k>=D.SPOT.length)},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.test()});
function slip(tag){let m='Compare one thing at a time. Say both for the same and but for different.';
 switch(tag){case 'whole':m='A quick look at the whole thing misses things. Check one part at a time: some parts match and some do not.';break;
  case 'all':m='Same in one way is not the same in every way. Ask: the same what? Colour, shape, size?';break;
  case 'word':m='Both tells what is the same. But tells what is different.';break;
  case 'zone':m='If both of them can do it, it goes in the middle box: both.';break;
  case 'big':m='Differences can be tiny, like a missing bow. Check every part, big and small.';break}
 return m}
function next(){qn++;const Q=D.QS[qn%D.QS.length],all=[[Q.a,'ok'],...Q.o],r=(qn*2)%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},quiz.querySelector('.fl-pick'),v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.74,tall:1.55,draw,onStep:X=>{quiz.hidden=X.step!==5;pad.hidden=X.step===5;controls()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Same and different lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();
  A.gest({down,move,up});controls()}}).start()})})();
