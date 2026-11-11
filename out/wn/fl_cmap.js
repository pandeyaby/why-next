/* Flagship: elaboration and concept maps (ages 14-15). Ask why down a chain of reasons, label concept-map links so each
   reads as a true sentence, add valid cross-links, self-explain a worked example, and sort study habits by depth. */
(()=>{
const CHAIN=[['Arteries have thicker, more elastic walls than veins. Why?',[['Blood in arteries is under high pressure.',1],['Because arteries have thicker walls.',0,'That just repeats the fact. A why-answer must give a reason.'],['Because arteries carry red blood.',0,'Colour does not explain wall thickness. Use what you know about pressure.']]],
 ['Why is the pressure high in arteries?',[['Veins are thinner.',0,'That is a difference, not a cause. What pushes the blood?'],['The heart pumps blood straight into them.',1],['Blood is heavy.',0,'Weight does not explain surges of pressure. Think about the heart.']]],
 ['So what do the elastic walls do?',[['They stop blood needing oxygen.',0,'Walls do not change what blood needs. Think stretch and recoil.'],['They make blood flow backwards.',0,'Valves and pressure keep blood moving forward. Elastic walls do not reverse it.'],['They stretch and recoil, which smooths each surge.',1]]]];
const NODES={P:['Photosynthesis',.27,.31],L:['Light',.76,.31],G:['Glucose',.27,.52],C:['Chlorophyll',.76,.52],R:['Respiration',.27,.73],E:['Energy',.76,.73],O:['Oxygen',.76,.92]};
const LINKS=[['P','G','makes'],['P','L','needs'],['C','L','absorbs'],['R','E','releases']];
const PHR=['makes','needs','absorbs','releases','is a type of'];
const CROSS=[['G','R','is used in',1,'Glucose is used in respiration: true, and it ties the two halves together.'],['C','R','is used in',0,'Chlorophyll is used in respiration? No. Chlorophyll absorbs light in photosynthesis.'],
 ['R','O','uses',1,'Respiration uses oxygen: true. Photosynthesis makes it, respiration uses it.'],['C','E','releases',0,'Chlorophyll releases energy? No. Respiration releases energy from glucose.']];
const WORK=[['3(x + 2) = 18  →  x + 2 = 6',[['Divide both sides by 3. Doing the same to both sides keeps it balanced.',1],['The 3 goes away.',0,'That says what happened, not why it is allowed. Name the rule.'],['Subtract 3 from both sides.',0,'Subtracting 3 would give 3(x + 2) − 3 = 15, not x + 2 = 6.']]],
 ['x + 2 = 6  →  x = 4',[['Move the 2 over and it changes sign.',0,'A trick with no reason. Why does it change sign?'],['Subtract 2 from both sides to undo the + 2.',1],['Guess numbers until it works.',0,'Guessing skips the reason, so it will not help next time.']]],
 ['Check: 3(4 + 2) = 18',[['It looks about right.',0,'“Looks right” is not a check. Put the value back in.'],['4 is a small number, so it is fine.',0,'Size tells you nothing here. Substitute and see.'],['Put x = 4 back in. 3 × 6 = 18, so it is true.',1]]]];
const HAB=[['Reread the chapter three times',1],['Ask “why is this true?” and answer it',0],['Highlight most of the page',1],['Draw a concept map from memory',0],['Copy notes out neatly',1],['Compare two ideas: how alike, how different?',0]];
VIS.reg('flagcmap',c=>{let A,keys,cbox,ix=-1;const K={};
const INK='#0f172a',GOOD='#047857',WRONG='#b91c1c',GREY='#64748b',PICK='#1d4ed8';
const step=()=>['why','label','cross','self','sort','chal'][A.step];
const ff=(px,w)=>`${w||600} ${Math.round(A.narrow?px:px*1.1)}px system-ui,sans-serif`;
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#dcfce7',A.col.dark?.06:.38);g.fillRect(0,0,A.W,A.H)}
function brk(t,w,px,wt){const g=A.ctx;g.font=ff(px,wt);const o=[];let cur='';for(const x of t.split(' ')){const n=cur?cur+' '+x:x;if(cur&&g.measureText(n).width>w){o.push(cur);cur=x}else cur=n}o.push(cur);return o}
function pill(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||10);g.fill();g.lineWidth=o.ok||o.no||o.sel?3.5:1.5;g.strokeStyle=o.ok?GOOD:o.no?WRONG:o.sel?PICK:GREY;g.stroke();
 if(!t)return;const px=o.px||13,L=brk(t,r.w-12,px,o.wt);g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';L.forEach((s,i)=>g.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*px*1.22))}
function top(t,ok){const g=A.ctx;g.font=ff(12,800);const w=Math.min(A.W-10,g.measureText(t).width+24);pill({x:(A.W-w)/2,y:6,w,h:28},t,{px:12,wt:800,ok})}
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function three(y0){const h=Math.min(58,A.H*.12);return[0,1,2].map(i=>({x:10,y:y0+i*(h+8),w:A.W-20,h}))}
/* 1 why chain */
function drawWhy(){const W=K.w,g=A.ctx;paper();const n=CHAIN.length;top(W.k>=n?'Chain of 3 reasons built':`Why ${W.k+1} of ${n}: tap the answer that explains`,W.k>=n);
 const got=CHAIN.slice(0,W.k).map(x=>x[1].find(r=>r[1])[0]),hd=['Arteries: thick, elastic walls',...got];const bw=A.W*.8,bh=34;
 hd.forEach((t,i)=>{const y=A.H*.1+i*(bh+12);pill({x:(A.W-bw)/2,y,w:bw,h:bh},t,{px:12,ok:i>0,bg:i?'#dcfce7':'#ffffff'});if(i<hd.length-1){g.strokeStyle=A.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(A.W/2,y+bh);g.lineTo(A.W/2,y+bh+12);g.stroke()}});
 if(W.k<n){const[q,ch]=CHAIN[W.k];g.fillStyle=A.col.tx;g.font=ff(13,800);g.textAlign='center';g.textBaseline='middle';g.fillText(q.length>40?'Why?':q,A.W/2,A.H*.52);three(A.H*.57).forEach((r,i)=>pill(r,ch[i][0],{px:13,no:W.bad===i}))}}
function why(i){const W=K.w;if(W.k>=CHAIN.length)return;const[,ok,fb]=CHAIN[W.k][1][i];if(!ok){W.bad=i;A.sound.miss();return say(fb)}
 W.k++;W.bad=null;A.sound.pop();say(W.k>=CHAIN.length?'Fact, cause, deeper cause, effect. Each why links the fact to what you already know, so it sticks.':'Yes, a real reason. Ask why again.')}
/* 2 label links */
const NP=k=>({x:NODES[k][1]*A.W,y:NODES[k][2]*A.H});
const mid=(a,b)=>{const p=NP(a),q=NP(b);return{x:(p.x+q.x)/2,y:(p.y+q.y)/2}};
function node(k,hi){const p=NP(k),g=A.ctx;g.font=ff(13,800);const w=Math.min(A.W*.44,g.measureText(NODES[k][0]).width+22);pill({x:p.x-w/2,y:p.y-17,w,h:34},NODES[k][0],{px:13,wt:800,bg:hi?'#fef3c7':'#e0f2fe',sel:hi})}
function line(a,b,o){const p=NP(a),q=NP(b),g=A.ctx;g.save();g.strokeStyle=o.col||GREY;g.lineWidth=o.w||2.5;if(o.dash)g.setLineDash([7,6]);g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke();g.restore()}
function tag(a,b,t,o){const m=mid(a,b),g=A.ctx;g.font=ff(12,700);const w=g.measureText(t||'?').width+18,r={x:m.x-w/2,y:m.y-13,w,h:26};pill(r,t||'?',{px:12,wt:700,rad:13,...o});return r}
function chips(){const n=PHR.length,g=A.ctx;g.font=ff(12,700);const ws=PHR.map(t=>g.measureText(t).width+20),tot=ws.reduce((a,b)=>a+b,0)+(n-1)*6;let x=(A.W-Math.min(tot,A.W-10))/2;const out=[];let y=A.H*.09;
 PHR.forEach((t,i)=>{if(x+ws[i]>A.W-5){x=8;y+=34}out.push({x,y,w:ws[i],h:28,t});x+=ws[i]+6});return out}
function drawLabel(){const L=K.l,g=A.ctx;paper();const n=LINKS.length;top(L.k>=n?'Every link reads as a true sentence':`Link ${L.k+1} of ${n}: drag or tap a linking phrase`,L.k>=n);
 LINKS.forEach(([a,b],i)=>line(a,b,{col:i<L.k?GOOD:i===L.k?(A.col.dark?'#93c5fd':PICK):GREY,w:i===L.k?4:2.5}));Object.keys(NODES).filter(k=>k!=='O').forEach(k=>node(k,L.k<n&&LINKS[L.k].slice(0,2).includes(k)));
 LINKS.forEach(([a,b,t],i)=>tag(a,b,i<L.k?t:'?',{ok:i<L.k,sel:i===L.k,no:i===L.k&&L.bad}));
 chips().forEach(r=>{const d=K.drag&&K.drag.t===r.t?K.drag:null;pill(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,r.t,{px:12,wt:700,rad:14,sel:!!d,bg:'#f5f3ff'})})}
function label(t){const L=K.l;if(L.k>=LINKS.length)return;const[a,b,want]=LINKS[L.k];
 if(t!==want){L.bad=1;A.sound.miss();return say(`Read it as a sentence: “${NODES[a][0]} ${t} ${NODES[b][0].toLowerCase()}”. That is not true. Pick the phrase that makes a true statement.`)}
 L.k++;L.bad=0;A.sound.pop();say(`“${NODES[a][0]} ${t} ${NODES[b][0].toLowerCase()}.” True.`+(L.k>=LINKS.length?' A labelled link turns two boxes into an idea you can test.':''))}
/* 3 cross-links */
function drawCross(){const X=K.x,need=CROSS.filter(x=>x[3]).length;paper();top(X.got.length>=need?'2 true cross-links added':`Tap a dashed link to test it (${X.got.length} of ${need} true found)`,X.got.length>=need);
 LINKS.forEach(([a,b])=>line(a,b,{col:GREY}));CROSS.forEach(([a,b],i)=>line(a,b,X.got.includes(i)?{col:GOOD,w:3.5}:{col:X.no.includes(i)?WRONG:A.col.dark?'#93c5fd':PICK,dash:1}));
 Object.keys(NODES).forEach(k=>node(k));LINKS.forEach(([a,b,t])=>tag(a,b,t,{}));X.r=CROSS.map(([a,b,t],i)=>tag(a,b,t,{ok:X.got.includes(i),no:X.no.includes(i),bg:'#ede9fe'}))}
function cross(i){const X=K.x,need=CROSS.filter(x=>x[3]).length;if(X.got.includes(i)||X.got.length>=need)return;const[,, ,ok,fb]=CROSS[i];
 if(!ok){if(!X.no.includes(i))X.no.push(i);A.sound.miss();return say(fb)}X.got.push(i);A.sound.pop();say(fb+(X.got.length>=need?' Cross-links between branches show real understanding.':''))}
/* 4 self-explain */
function drawSelf(){const S=K.s,g=A.ctx;paper();if(S.k>=WORK.length){top('Every step explained',1);WORK.forEach((x,i)=>pill({x:10,y:A.H*.12+i*A.H*.27,w:A.W-20,h:A.H*.23},x[0]+'  —  '+x[1].find(r=>r[1])[0],{px:13,ok:1}));return}
 top(`Step ${S.k+1} of 3: why is this step allowed?`);const[st,ch]=WORK[S.k];pill({x:10,y:A.H*.14,w:A.W-20,h:A.H*.16},st,{px:18,wt:800,bg:'#f8fafc'});three(A.H*.4).forEach((r,i)=>pill(r,ch[i][0],{px:13,no:S.bad===i}))}
function selfx(i){const S=K.s;if(S.k>=WORK.length)return;const[,ok,fb]=WORK[S.k][1][i];if(!ok){S.bad=i;A.sound.miss();return say(fb)}
 S.k++;S.bad=null;A.sound.pop();say('Yes: you named the rule that makes the step work.'+(S.k>=WORK.length?' Explaining each step to yourself links it to rules you know.':''))}
/* 5 sort habits */
function bins(){const w=(A.W-30)/2,h=A.H*.3;return[{x:10,y:A.H*.64,w,h},{x:20+w,y:A.H*.64,w,h}]}
const card=()=>({x:A.W*.07,y:A.H*.18,w:A.W*.86,h:A.H*.22});
function drawSort(){const H=K.h,g=A.ctx;paper();top(H.k>=HAB.length?'All 6 sorted':`Habit ${H.k+1} of 6: drag it to a box, or tap a box`,H.k>=HAB.length);
 bins().forEach((r,j)=>{pill(r,null,{bg:j?'#fee2e2':'#dcfce7'});g.fillStyle=INK;g.font=ff(13,800);g.textAlign='center';g.textBaseline='top';brk(j?'Repeats: shallow':'Elaborates: builds links',r.w-10,13,800).forEach((s,i)=>g.fillText(s,r.x+r.w/2,r.y+8+i*16));
  g.font=ff(20,800);g.fillText('✓'.repeat(HAB.slice(0,H.k).filter(x=>x[1]===j).length),r.x+r.w/2,r.y+r.h*.6)});
 if(H.k<HAB.length){const r=card(),d=K.drag&&K.drag.card?K.drag:null;pill(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,HAB[H.k][0],{px:16,no:H.bad,sel:!!d})}}
function sortH(j){const H=K.h;if(H.k>=HAB.length)return;const[t,b]=HAB[H.k];
 if(j!==b){H.bad=1;A.sound.miss();return say(b?'This feels busy but only repeats the words. It builds few new links, so it fades fast.':'This makes you connect ideas and explain them. That is elaboration, which builds lasting memory.')}
 H.k++;H.bad=0;A.sound.pop();say((b?'Yes, shallow: it repeats.':'Yes, it elaborates: it builds links.')+(H.k>=HAB.length?' Feeling familiar is not the same as understanding.':''))}
/* frame */
function draw(){const s=step();if(s==='chal'){paper();top('Challenge',1);pill({x:16,y:A.H*.4,w:A.W-32,h:60},'Ask why, label links, cross-link, explain steps, go deep.',{px:13});return}
 ({why:drawWhy,label:drawLabel,cross:drawCross,self:drawSelf,sort:drawSort})[s]();A.fx.draw(A.ctx)}
function down(p){const s=step(),at=rs=>rs.findIndex(r=>on(p,r));
 if(s==='why'&&K.w.k<CHAIN.length){const i=at(three(A.H*.57));if(i>=0)why(i)}
 if(s==='label'&&K.l.k<LINKS.length){const r=chips().find(r=>on(p,r));if(r){K.drag={t:r.t,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}}
 if(s==='cross'&&K.x.r){const i=at(K.x.r);if(i>=0)cross(i)}
 if(s==='self'&&K.s.k<WORK.length){const i=at(three(A.H*.4));if(i>=0)selfx(i)}
 if(s==='sort'&&K.h.k<HAB.length){if(on(p,card())){K.drag={card:1,x:p.x,y:p.y};return true}const j=at(bins());if(j>=0)sortH(j)}return false}
function move(p){if(!K.drag)return;K.drag.x=p.x;K.drag.y=p.y;A.redraw()}
function up(p){const d=K.drag;if(!d)return;K.drag=null;if(d.card){const j=bins().findIndex(r=>on(p,r));if(j>=0)sortH(j);else A.redraw();return}
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<8)return label(d.t);const[a,b]=LINKS[K.l.k],m=mid(a,b);if(Math.hypot(p.x-m.x,p.y-m.y)<60)label(d.t);else{A.redraw();say('Drop the phrase on the blue link.')}}
function fresh(){for(const k in K)delete K[k];Object.assign(K,{w:{k:0,bad:null},l:{k:0,bad:0},x:{got:[],no:[]},s:{k:0,bad:null},h:{k:0,bad:0},drag:null,cb:()=>{},n:(K.n||0)+1})}
function say(t){if(t){c.say(t);A.cv.setAttribute('aria-label',t)}A.redraw();pads();K.cb()}
const met=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function arm(i,d,ok,msg){fresh();say(d);K.cb=met(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const n=K.n;acts.forEach((a,j)=>setTimeout(()=>{if(n===K.n)a()},(A.reduced()?40:ms)*(j+1)))}
function pads(){if(!keys)return;keys.innerHTML='';const s=step(),B=(t,fn,lab)=>{c.el('button',{type:'button',class:'lbtn','aria-label':lab||t},keys,t).onclick=fn};
 if(s==='why'&&K.w.k<CHAIN.length)CHAIN[K.w.k][1].forEach((x,i)=>B(x[0],()=>why(i),'Because: '+x[0]));
 if(s==='label'&&K.l.k<LINKS.length){const[a,b]=LINKS[K.l.k];PHR.forEach(t=>B(t,()=>label(t),`Label: ${NODES[a][0]} ${t} ${NODES[b][0]}`))}
 if(s==='cross')CROSS.forEach(([a,b,t],i)=>{if(!K.x.got.includes(i))B(`${NODES[a][0]} ${t} ${NODES[b][0].toLowerCase()}?`,()=>cross(i),`Test link: ${NODES[a][0]} ${t} ${NODES[b][0]}`)});
 if(s==='self'&&K.s.k<WORK.length)WORK[K.s.k][1].forEach((x,i)=>B(x[0],()=>selfx(i),'Explain: '+x[0]));
 if(s==='sort'&&K.h.k<HAB.length){B('Elaborates',()=>sortH(0),'Elaborates: builds links');B('Repeats',()=>sortH(1),'Repeats: shallow')}}
const right=L=>L.map(x=>()=>{const i=x[1].findIndex(r=>r[1]);return i});
const steps=[
{h:'Ask why, then why again',p:'Elaboration means asking how and why, and answering from what you already know. Build a chain of reasons for one fact.',
 predict:{q:'Which helps you remember a fact better?',opts:['Reading it three more times','Asking why it is true and answering'],ans:1},task:'Build a chain of 3 reasons',
 show:()=>demo(0,right(CHAIN).map(f=>()=>why(f())),600),
 go:()=>arm(0,'A fact about arteries, with three answers to the question why.',()=>K.w.k>=CHAIN.length,'Each why tied the fact to something you knew.')},
{h:'Label the links',p:'In a concept map every line needs a linking phrase, so the two boxes read as a sentence. Drag a phrase onto the blue link.',task:'Label all 4 links',
 show:()=>demo(1,LINKS.map(x=>()=>label(x[2])),500),
 go:()=>arm(1,'A concept map with six boxes about photosynthesis and respiration, and four unlabelled links.',()=>K.l.k>=LINKS.length,'Box, phrase, box: a statement you can check.')},
{h:'Cross-link the branches',p:'The best maps link ideas from different branches. Test each dashed link: is the sentence true?',
 predict:{q:'What makes a concept map good?',opts:['Lots of boxes and colours','Links that each read as a true sentence'],ans:1},task:'Find the 2 true cross-links',
 show:()=>demo(2,CROSS.map((x,i)=>x[3]?()=>cross(i):null).filter(Boolean),600),
 go:()=>arm(2,'The map with four dashed cross-links to test, joining the photosynthesis and respiration branches.',()=>K.x.got.length>=2,'Glucose and oxygen join the two processes.')},
{h:'Explain each step',p:'Self-explanation means saying why each step of a worked example is allowed. Tap the explanation that names the rule.',task:'Explain all 3 steps',
 show:()=>demo(3,right(WORK).map(f=>()=>selfx(f())),600),
 go:()=>arm(3,'A worked example: 3 brackets x plus 2 equals 18. Three possible explanations for the first step.',()=>K.s.k>=WORK.length,'Rules, not tricks.')},
{h:'Deep or shallow?',p:'Some study habits feel busy but only repeat. Others make you build links. Drag each habit to a box.',
 predict:{q:'Rereading makes the page feel familiar. Does that mean you understand it?',opts:['Yes, familiar means learned','No, familiar can fool you'],ans:1},task:'Sort all 6 habits',
 show:()=>demo(4,HAB.map(x=>()=>sortH(x[1])),450),
 go:()=>arm(4,'A study habit card and two boxes: Elaborates, builds links; and Repeats, shallow.',()=>K.h.k>=HAB.length,'Asking why, mapping and comparing build lasting links.')},
{h:'Challenge',p:'',go:()=>{fresh();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.cb()});
const QS=[{q:'Which is elaborative interrogation?',a:'Asking “why is this true?” and answering it',o:[['Reading the fact again','reread'],['Highlighting the key word','highlight']]},
 {q:'A concept map line has no label. What is wrong?',a:'You cannot tell what the link means',o:[['Nothing: lines are enough','nolabel'],['It needs more colours','pretty']]},
 {q:'Which is the best cross-link?',a:'Oxygen is made by photosynthesis and used in respiration',o:[['Chlorophyll is used in respiration','false'],['Photosynthesis is a word','empty']]},
 {q:'Your friend says, “Then you move the 2 over.” Better self-explanation?',a:'Subtract 2 from both sides to keep it balanced',o:[['It just works','trick'],['That is what the teacher did','copy']]},
 {q:'Why does rereading feel like it works?',a:'The page feels familiar, which is not the same as understanding',o:[['It always builds deep memory','reread'],['Your brain records every reading','record']]},
 {q:'When should you draw a concept map?',a:'From memory, then check it against your notes',o:[['Only by copying the textbook diagram','copymap'],['Never: lists are always better','list']]}];
function fb(t){let m='Ask why, label every link, cross-link branches and explain each step in your own words.';
 if(t==='reread')m='Rereading repeats the words. It feels fluent but builds few new links.';
 if(t==='highlight')m='Highlighting marks text but does not make you explain anything.';
 if(t==='nolabel')m='An unlabelled line could mean anything. A linking phrase makes it a statement you can test.';
 if(t==='pretty')m='Colours can help you find things, but the links carry the meaning.';
 if(t==='false')m='Read it as a sentence: chlorophyll is not used in respiration. A cross-link must be true.';
 if(t==='empty')m='That link says nothing about how the ideas connect.';
 if(t==='trick')m='“It just works” has no reason. Name the rule: do the same to both sides.';
 if(t==='copy')m='Copying a method is not explaining it. Say why each step is allowed.';
 if(t==='record')m='Memory is built by thinking about meaning, not by how many times you read.';
 if(t==='copymap')m='Copying a map is shallow. Building it from memory makes you retrieve and connect.';
 if(t==='list')m='A list hides how ideas connect. A map shows the links.';return m}
function nextQ(){ix++;const Q=QS[ix%QS.length],all=[[Q.a,'ok'],...Q.o],r=(ix+1)%3,ord=all.slice(r).concat(all.slice(0,r));
 cbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>check(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function check(t,a){cbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const p=cbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 p.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+fb(t))+' <button type="button" class="linkish">Next one →</button>';p.querySelector('button').onclick=nextQ;c.say(ok?'Yes.':fb(t))}
FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:B=>{cbox.hidden=B.step!==5;keys.hidden=B.step===5;pads()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Concept map lab buttons'},w);cbox=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pads()}}).start()})})();
