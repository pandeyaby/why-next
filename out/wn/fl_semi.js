/* Flagship – semi-colon, colon and dash between independent clauses (ages 10–11; NC 2013 Year 6 Appendix 2).
   Scenes: sort word groups into clauses that stand alone and parts that cannot, tap the boundary in a run-on sentence
   and choose its mark, sort pairs into colon (explains) or semi-colon (balanced), judge marked sentences with the
   cover test, then pick every fix for a comma splice. Data in learn/semi_art.js. */
(()=>{const {GROUPS,LINES,MARKS,PAIRS,TESTS,FIXES,DESC,DONE,QS}=SEM;
VIS.reg('flagsemi',c=>{let A,keysEl,chal,cq=-1,epoch=0;const M={};
const TXT='#18181b',OKC='#166534',NOC='#b91c1c',LINE='#71717a',SEL='#1d4ed8',F=' system-ui,sans-serif';
const now=()=>['groups','mark','pairs','tests','fix','quiz'][A.step];
const big=n=>A.narrow?n:Math.round(n*1.12);
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0e7ff',A.col.dark?.08:.35);g.fillRect(0,0,A.W,A.H)}
function txt(t,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${big(n)}px${F}`;g.fillStyle=o.col||TXT;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillText(t,x,y)}
function para(t,r,n){const g=A.ctx;g.font=`700 ${big(n)}px${F}`;const rows=[];let cur='';for(const w of t.split(' ')){const nx=cur?cur+' '+w:w;if(cur&&g.measureText(nx).width>r.w-14){rows.push(cur);cur=w}else cur=nx}rows.push(cur);
 const lh=big(n)+4;rows.forEach((ln,i)=>txt(ln,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*lh,n))}
function tag(t,y,good){const g=A.ctx;let n=big(13);g.font=`800 ${n}px${F}`;let w=g.measureText(t).width+26;while(w>A.W-6&&n>10){n--;g.font=`800 ${n}px${F}`;w=g.measureText(t).width+26}
 const h=n+15;g.fillStyle='#f8fafc';A.paint.rrect((A.W-w)/2,y-h/2,w,h,h/2);g.fill();g.lineWidth=good?3:1.5;g.strokeStyle=good?OKC:LINE;g.stroke();g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function tile(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=o.no||o.ok||o.sel?3:1.4;g.strokeStyle=o.no?NOC:o.ok?OKC:o.sel?SEL:LINE;g.stroke()}
function cells(n,cols,y0,h,wMax){const gx=8,w=Math.min(wMax||260,(A.W-14-gx*(cols-1))/cols),x0=(A.W-(w*cols+gx*(cols-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+(i%cols)*(w+gx),y:y0+Math.floor(i/cols)*(h+gx),w,h}))}
/* ---- sorting scenes (groups, pairs, tests) ---- */
const BINSETS={groups:{list:GROUPS,names:['Stands alone','Cannot stand alone'],right:i=>GROUPS[i].ok?0:1,label:i=>GROUPS[i].t},
 pairs:{list:PAIRS,names:['Colon: explains',"Semi-colon: balanced"],right:i=>PAIRS[i].k,label:i=>PAIRS[i].t},
 tests:{list:TESTS,names:['Correct','Wrong'],right:i=>TESTS[i].ok?0:1,label:i=>TESTS[i].t}};
const boxes=()=>[0,1].map(k=>{const w=(A.W-26)/2;return{k,x:9+k*(w+8),y:A.H*.1,w,h:A.H*.24}});
const sortCells=()=>cells(6,A.W<480?2:3,A.H*.4,Math.min(A.H*.16,A.W<480?66:60),240);
function drawSort(k){const B=BINSETS[k],s=M[k],g=A.ctx;paper();const all=s.done.length>=6;
 tag(all?'All sorted':'Drag each card to a box, or tap it then a box',A.H*.045,all);
 boxes().forEach(b=>{g.fillStyle=b.k?'#fef3c7':'#e0f2fe';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.lineWidth=s.over===b.k?4:2;g.strokeStyle=s.over===b.k?SEL:LINE;g.stroke();
  txt(B.names[b.k],b.x+b.w/2,b.y+18,13,{w:800});const n=s.done.filter(i=>B.right(i)===b.k).length;
  for(let j=0;j<n;j++){g.fillStyle=OKC;A.paint.rrect(b.x+12+j*((b.w-24)/3),b.y+b.h*.5,(b.w-24)/3-6,10,5);g.fill()}txt(`${n} here`,b.x+b.w/2,b.y+b.h*.78,12)});
 sortCells().forEach(r=>{if(s.done.includes(r.i)||(M.drag&&M.drag.i===r.i))return;tile(r,{no:s.wrong===r.i,sel:s.held===r.i});para(B.label(r.i),r,k==='groups'?14:12)});
 if(M.drag){const d=M.drag,r=sortCells()[d.i],rr={x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h};tile(rr,{sel:1});para(B.label(d.i),rr,k==='groups'?14:12)}}
function why(k,i,ok){if(k==='groups'){const G=GROUPS[i];return ok?(G.why||`Yes: "${G.t}" has a subject and a verb and makes sense alone.`):(G.ok?`"${G.t}" has a subject and a verb and makes sense alone.`:G.why)}
 return (k==='pairs'?PAIRS:TESTS)[i].why}
function drop(k,i,b){const B=BINSETS[k],s=M[k];if(s.done.includes(i))return;s.held=null;
 if(B.right(i)!==b){s.wrong=i;A.sound.miss();return tell(`Not there. ${why(k,i,false)}`)}
 s.done.push(i);s.wrong=-1;A.sound.pop();tell(`Yes. ${why(k,i,true)}`+(s.done.length>=6?' All sorted.':` ${s.done.length} of 6.`))}
/* ---- mark the boundary ---- */
function wordSize(){const L=LINES[M.mark.n],g=A.ctx;let n=big(17);const need=v=>{g.font=`800 ${v}px${F}`;return L.w.reduce((t,w)=>t+g.measureText(w).width+14,0)+14*(L.w.length-1)+22};while(n>12&&need(n)>A.W)n--;return n}
function wordBoxes(){const L=LINES[M.mark.n],g=A.ctx,n=wordSize();g.font=`800 ${n}px${F}`;const gap=14,h=n+18,out=[];let x=10,y=A.H*.26;
 L.w.forEach((w,i)=>{const ww=g.measureText(w).width+14;if(x+ww>A.W-10){x=10;y+=h+14}out.push({i,x,y,w:ww,h,n});x+=ww+gap});
 [...new Set(out.map(o=>o.y))].forEach(y=>{const row=out.filter(o=>o.y===y),last=row[row.length-1],shift=(A.W-10-(last.x+last.w))/2;row.forEach(o=>o.x+=shift)});return out}
const gapZones=()=>{const W=wordBoxes();return W.slice(0,-1).map((o,i)=>{const nx=W[i+1];return nx.y!==o.y?{i,x:o.x+o.w-4,y:o.y-4,w:30,h:o.h+8}:{i,x:o.x+o.w-6,y:o.y-6,w:nx.x-o.x-o.w+12,h:o.h+12}})};
const markCells=()=>cells(3,3,A.H*.66,Math.min(A.H*.16,64),150);
function drawMark(){const s=M.mark,g=A.ctx;paper();if(s.n>=LINES.length){tag('3 boundaries marked',A.H*.08,1);s.fixed.forEach((t,j)=>txt(t,A.W/2,A.H*(.28+j*.16),14));return}
 tag(s.at==null?`Sentence ${s.n+1} of 3: tap the boundary`:'Now pick the mark',A.H*.07);
 const W=wordBoxes();W.forEach(o=>{tile(o,{});g.font=`800 ${o.n}px${F}`;g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(LINES[s.n].w[o.i],o.x+o.w/2,o.y+o.h/2)});
 gapZones().forEach(z=>{const on=s.at===z.i,bad=s.badGap===z.i;g.fillStyle=on?SEL:bad?NOC:LINE;if(on||bad){A.paint.rrect(z.x+z.w/2-3,z.y,6,z.h,3);g.fill()}else{g.beginPath();g.arc(z.x+z.w/2,z.y+z.h/2,3,0,7);g.fill()}});
 if(s.at==null)txt('Tap a dot between two words',A.W/2,A.H*.5,12,{w:700,col:A.col.dark?'#e5e7eb':TXT});
 if(s.at!=null)markCells().forEach(r=>{tile(r,{no:s.badMark===r.i});txt(MARKS[r.i][0],r.x+r.w/2,r.y+r.h*.42,r.i===2?13:22,{w:900});if(r.i<2)txt(MARKS[r.i][1],r.x+r.w/2,r.y+r.h*.8,11)})}
function pickGap(i){const s=M.mark;if(s.n>=LINES.length||s.at!=null)return;const L=LINES[s.n];
 if(i!==L.gap){s.badGap=i;A.sound.miss();const left=L.w.slice(0,i+1).join(' ');return tell(`"${left}" ${i<L.gap?'is not a full clause yet':'runs past the end of the first clause'}. Find where the first clause ends.`)}
 s.at=i;s.badGap=-1;A.sound.pop();tell(`Yes: "${L.w.slice(0,i+1).join(' ')}" and "${L.w.slice(i+1).join(' ')}" both stand alone. Pick the mark.`)}
function pickMark(j){const s=M.mark;if(s.at==null)return;const L=LINES[s.n];
 if(!MARKS[j][2]){s.badMark=j;A.sound.miss();return tell(j===1?'A comma cannot join two independent clauses. That is a comma splice.':'With no mark the clauses run together into a run-on sentence.')}
 const fixed=L.w.slice(0,s.at+1).join(' ')+'; '+L.w.slice(s.at+1).join(' ')+'.';s.fixed.push(fixed[0].toUpperCase()+fixed.slice(1));s.n++;s.at=null;s.badMark=-1;A.sound.pop();tell(`Yes: ${fixed}`)}
/* ---- fix the comma splice ---- */
const fixCells=()=>cells(5,1,A.H*.16,Math.min(A.H*.13,54),420);
function drawFix(){const s=M.fix;paper();const n=s.got.length;tag(n>=3?'All 3 fixes found':`Tap every version that fixes it (${n} of 3)`,A.H*.06,n>=3);
 fixCells().forEach(r=>{tile(r,{ok:s.got.includes(r.i),no:s.bad===r.i});txt(FIXES[r.i][0],r.x+r.w/2,r.y+r.h/2,14,{w:800})})}
function pickFix(i){const s=M.fix;if(s.got.includes(i)||s.got.length>=3)return;const X=FIXES[i];
 if(!X[1]){s.bad=i;A.sound.miss();return tell(X[2])}s.got.push(i);s.bad=-1;A.sound.pop();tell(`Yes. ${X[2]}`+(s.got.length>=3?' That is all 3.':''))}
/* ---- frame ---- */
function draw(){const k=now();if(k==='quiz'){paper();tag('Challenge',A.H*.25,1);tag('Semi-colon, colon or dash?',A.H*.5);return}
 if(k==='mark')drawMark();else if(k==='fix')drawFix();else drawSort(k);A.fx.draw(A.ctx)}
function down(p){const k=now();
 if(k==='mark'){const s=M.mark;if(s.at==null){const z=gapZones().find(z=>inside(p,z));if(z)pickGap(z.i)}else{const r=markCells().find(r=>inside(p,r));if(r)pickMark(r.i)}return false}
 if(k==='fix'){const r=fixCells().find(r=>inside(p,r));if(r)pickFix(r.i);return false}
 if(!BINSETS[k])return false;const s=M[k],r=sortCells().find(r=>inside(p,r)&&!s.done.includes(r.i));if(r){M.drag={i:r.i,x:p.x,y:p.y,sx:p.x,sy:p.y};A.redraw();return true}
 const b=boxes().find(b=>inside(p,b));if(b&&s.held!=null)drop(k,s.held,b.k);return false}
function move(p){if(!M.drag)return;M.drag.x=p.x;M.drag.y=p.y;const b=boxes().find(b=>inside(p,b));M[now()].over=b?b.k:-1;A.redraw()}
function up(p){const d=M.drag;if(!d)return;M.drag=null;const k=now(),s=M[k];s.over=-1;const b=boxes().find(b=>inside(p,b));if(b)return drop(k,d.i,b.k);
 if(Math.hypot(p.x-d.sx,p.y-d.sy)<10){s.held=d.i;return tell('Picked. Now tap a box.')}A.redraw()}
function fresh(){epoch++;for(const k in M)delete M[k];const box=()=>({done:[],wrong:-1,over:-1,held:null});
 Object.assign(M,{groups:box(),pairs:box(),tests:box(),mark:{n:0,at:null,badGap:-1,badMark:-1,fixed:[]},fix:{got:[],bad:-1},drag:null,check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();M.check()}
const gate=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,ok){fresh();tell(DESC[i]);M.check=gate(i,ok,DONE[i])}
function play(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
function buttons(){if(!keysEl)return;keysEl.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keysEl,t).onclick=f};
 if(BINSETS[k]){const S=BINSETS[k];S.list.forEach((_,i)=>{if(!M[k].done.includes(i))[0,1].forEach(b=>B(`${S.label(i)} → ${S.names[b]}`,()=>drop(k,i,b)))})}
 if(k==='mark'&&M.mark.n<LINES.length){const L=LINES[M.mark.n];if(M.mark.at==null)L.w.slice(0,-1).forEach((w,i)=>B(`Boundary after "${w}"`,()=>pickGap(i)));else MARKS.forEach((m,j)=>B(j<2?`Use a ${m[1]} (${m[0]})`:'Use no mark',()=>pickMark(j)))}
 if(k==='fix'&&M.fix.got.length<3)FIXES.forEach((x,i)=>{if(!M.fix.got.includes(i))B(x[0],()=>pickFix(i),`Fixes it: ${x[0]}`)})}
const steps=[
{h:'Can it stand alone?',p:'An independent clause has a subject and a verb and makes sense on its own. Sort the word groups.',
 predict:{q:'Can "because it snowed" stand alone as a sentence?',opts:['Yes, it has a verb','No, it leaves you asking what happened'],ans:1},task:'Sort all 6 word groups',
 show:()=>play(0,GROUPS.map((G,i)=>()=>drop('groups',i,G.ok?0:1)),450),go:()=>open(0,()=>M.groups.done.length>=6)},
{h:'Mark the boundary',p:'Each sentence has two clauses and no mark. Find where the first clause ends, then choose the mark.',
 predict:{q:'Can a comma join two independent clauses?',opts:['Yes, a comma is a short pause','No, that makes a comma splice'],ans:1},task:'Mark all 3 sentences',
 show:()=>play(1,LINES.flatMap(L=>[()=>pickGap(L.gap),()=>pickMark(0)]),550),go:()=>open(1,()=>M.mark.n>=LINES.length)},
{h:'Colon or semi-colon?',p:'A colon says: here is what I mean. A semi-colon sets two equal clauses side by side. Sort the sentences.',
 predict:{q:'"I knew she was home __ her bike was by the door." The second part explains the first. Which mark?',opts:['A semi-colon','A colon'],ans:1},task:'Sort all 6 sentences',
 show:()=>play(2,PAIRS.map((P,i)=>()=>drop('pairs',i,P.k)),450),go:()=>open(2,()=>M.pairs.done.length>=6)},
{h:'The cover test',p:'Cover each side of the mark. Both sides must stand alone. A dash can do the same job in less formal writing.',task:'Judge all 6 sentences',
 show:()=>play(3,TESTS.map((T,i)=>()=>drop('tests',i,T.ok?0:1)),450),go:()=>open(3,()=>M.tests.done.length>=6)},
{h:'Fix the splice',p:'"It was cold, we wore coats." is a comma splice. Tap every version that fixes it.',task:'Find all 3 fixes',
 show:()=>play(4,[0,2,4].map(i=>()=>pickFix(i)),600),go:()=>open(4,()=>M.fix.got.length>=3)},
{h:'Challenge',p:'',go:()=>{fresh();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.check()});
function hint(t){let m='Check both sides of the mark: each must stand alone.';
 if(t==='splice')m='A comma alone cannot join two independent clauses. Use a semi-colon, a colon, a dash or a full stop.';
 if(t==='join')m='A semi-colon replaces the joining word. Do not use both: drop the "and" or drop the semi-colon.';
 if(t==='cover')m='Cover the part after the mark, then the part before. If one side cannot stand alone, the mark is wrong.';
 if(t==='colon')m='Here the second clause explains the first, so a colon fits. A semi-colon is for two balanced clauses.';
 if(t==='dash')m='Between clauses a dash marks the boundary with an informal pause. It is not used to separate list items.';
 return m}
function nextQ(){cq++;const Q=QS[cq%QS.length],all=[[Q.a,'ok'],...Q.o],rot=cq%3,ord=all.slice(rot).concat(all.slice(0,rot));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ;c.say(ok?'Yes.':hint(t))}
FK.shell(c,{steps,ratio:.72,tall:1.3,draw,onStep:S=>{chal.hidden=S.step!==5;keysEl.hidden=S.step===5;buttons()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);keysEl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Clause boundary lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
