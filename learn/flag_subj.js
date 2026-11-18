/* Flagship – the subjunctive mood (ages 10–11; NC England Year 6 grammar: subjunctive forms such as If I were or Were they
   to come in very formal writing and speech; glossary: The school requires that all pupils be honest). Drop was or were into
   real and imagined sentences, find the trigger word and pick the base form, build Were they to… inversions, spot the
   subjunctives in a formal letter, and sort formal from everyday versions. */
(()=>{
const IFS=[['If I','a bird, I would fly to school.',1,'imagined: you are not a bird'],['I wish it','the weekend.',1,'a wish: it is not the weekend'],
 ['When I','five, I lived by the sea.',0,'a real fact about the past'],['She acts as if she','the queen.',1,'imagined: she is not the queen'],
 ['If he','late this morning, he missed the register.',0,'a real past event that may have happened']];
const MAND=[['The coach insists that he','on time.','insists',['be','is','was']],['I suggest that Sam','his work again.','suggest',['check','checks','checked']],
 ['It is vital that every pupil','a coat.','vital',['bring','brings','brought']],['The rules demand that she','run in the hall.','demand',['not',"doesn't",'does not']]];
const WHY={is:'Is changes with the person. After insists that, it is be for everyone: that he be on time.',was:'Was is past. After insists that, use the base form be.',
 checks:'Checks has the -s ending. After suggest that, use the base form for everyone: that Sam check.',checked:'Checked is past. The base form is check.',
 brings:'Brings has the -s ending. After vital that, use the base form: that every pupil bring.',brought:'Brought is past. The base form is bring.',
 "doesn't":"Formal writing puts not straight before the base form: that she not run. No does.",'does not':'In the subjunctive, not goes straight before the verb: that she not run.'};
const INV=[['If they were to arrive early,','we would start.',['Were','they','to arrive early,']],['If I were in charge,','lunch would be longer.',['Were','I','in charge,']],
 ['If she were to win,','she would share the prize.',['Were','she','to win,']]];
const LET=[['The school requires that every pupil be on time.',1],['Pupils were late on Monday.',0,'Were here is a plain past fact about many pupils, not a subjunctive.'],
 ['It is vital that each child bring a coat.',1],['If the weather is fine, the trip will go ahead.',0,'This is a real possibility with is. No subjunctive.'],['Were the trip to be cancelled, we would text you.',1]];
const REG=[['If I were you, I would ask.',1],['If I was you, I would ask.',0],['I suggest that he go home.',1],['I suggest he goes home.',0],['I wish it were sunny.',1],['I wish it was sunny.',0]];
VIS.reg('flagsubj',c=>{let A,X,pad,chal,qk=-1,gen=0;const Z={};
const INK='#111827',PAPER='#ffffff',LINE='#4b5563',YES='#15803d',NO='#b91c1c',PEN='#1d4ed8',DREAM='#ede9fe',REAL='#e0f2fe';
const now=()=>['ifs','mand','inv','let','reg','quiz'][A.step],u=n=>Math.round(n*(A.narrow?1:1.15)),ff=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`;
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function put(t,x,y,n,col,w){X.font=ff(n,w);X.fillStyle=col||INK;X.textAlign='center';X.textBaseline='middle';X.fillText(t,x,y,A.W-16)}
function brk(t,max,n,w){X.font=ff(n,w);const L=[];let s='';t.split(' ').forEach(d=>{const z=s?s+' '+d:d;if(s&&X.measureText(z).width>max){L.push(s);s=d}else s=z});if(s)L.push(s);return L}
function block(t,x,y,max,n,col,w){const L=brk(t,max,n,w),lh=u(n)*1.3;L.forEach((s,i)=>put(s,x,y+(i-(L.length-1)/2)*lh,n,col,w))}
function card(r,t,o){o=o||{};X.fillStyle=o.bg||PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,o.r||10);X.fill();X.lineWidth=o.edge?4:2;X.strokeStyle=o.edge||LINE;X.setLineDash(o.dash?[8,6]:[]);X.stroke();X.setLineDash([]);if(t)block(t,r.x+r.w/2,r.y+r.h/2+1,r.w-12,o.n||16,o.ink,o.w||800)}
function base(){X.fillStyle=A.col.dark?'#0f172a':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function pill(t,won){X.font=ff(14,800);const w=Math.min(A.W-10,X.measureText(t).width+28),h=u(14)+16;card({x:A.W/2-w/2,y:A.H*.02,w,h},'',{r:h/2,bg:won?'#dcfce7':PAPER,edge:won?YES:null});put(t,A.W/2,A.H*.02+h/2+1,14,INK,800)}
const sBox=()=>({x:u(12),y:A.H*.13,w:A.W-u(24),h:A.H*.34});
/* ---- 1: was or were ---- */
const vChips=()=>[0,1].map(k=>({k,x:A.W/2+(k?u(10):-u(10)-A.W*.3),y:A.H*.7,w:A.W*.3,h:A.H*.16}));
function drawIfs(){const z=Z.ifs,end=z.i>=IFS.length;base();pill(end?'Imagined: were. Real: was.':`Sentence ${z.i+1} of 5: was or were?`,end);
 if(end){z.made.forEach(([t,k],j)=>{card({x:u(12),y:A.H*(.13+j*.17),w:A.W-u(24),h:A.H*.14},'',{bg:k?DREAM:REAL,dash:k});block(t,A.W/2,A.H*(.2+j*.17),A.W-u(40),14,INK,700)});return}
 const s=IFS[z.i],f=z.fill;card(sBox(),'',{bg:f==null?PAPER:f===s[2]?(f?DREAM:REAL):'#fee2e2',dash:f===1,edge:f==null?PEN:f===s[2]?YES:NO});
 block(`${s[0]} ${f==null?'____':['was','were'][f]} ${s[1]}`,A.W/2,A.H*.27,A.W-u(44),18,INK,700);
 if(f!=null)put(f===s[2]?s[3]:'Try the other one',A.W/2,A.H*.41,13,'#374151',600);
 vChips().forEach(q=>{const r=z.drag&&z.drag.k===q.k?{...q,x:z.drag.x-q.w/2,y:z.drag.y-q.h/2}:q;card(r,['was','were'][q.k],{n:22,bg:q.k?DREAM:REAL,edge:PEN})});
 put('Drag a word into the gap, or tap it',A.W/2,A.H*.6,13,A.col.tx,600)}
function ifsPut(k){const z=Z.ifs;if(z.i>=IFS.length||z.fill===IFS[z.i][2])return;const s=IFS[z.i],t=`${s[0]} ${['was','were'][k]} ${s[1]}`;z.fill=k;
 if(k===s[2]){A.sound.pop();const g=gen;setTimeout(()=>{if(g===gen&&Z.ifs.fill===k){z.made.push([t,k]);z.i++;z.fill=null;A.redraw();say2(z.i>=IFS.length?'All 5 done. Were for imagined, was for real.':'Next sentence.')}},500);return say2(`${t} Yes, ${s[3]}.`)}
 A.sound.miss();let m=`${t} But this is imagined, not real. Formal writing uses were for every subject, even I and he.`;if(!s[2])m=`${t} But this is ${s[3]}, so it takes was. Were is only for imagined or wished things.`;say2(m)}
/* ---- 2: trigger word, then the base form ---- */
function wChips(){const s=MAND[Z.mand.i];if(!s)return[];X.font=ff(17,700);const out=[];let x=0,y=A.H*.15,max=A.W-u(28);
 s[0].split(' ').forEach((w,j)=>{const cw=X.measureText(w).width+u(16);if(x&&x+cw>max){x=0;y+=u(50)}out.push({w0:w,j,x:u(14)+x,y,w:cw,h:u(40)});x+=cw+u(8)});return out}
const fTiles=()=>[0,1,2].map(j=>({j,x:u(14)+j*((A.W-u(28))/3),y:A.H*.7,w:(A.W-u(28))/3-u(8),h:A.H*.17}));
function drawMand(){const z=Z.mand,end=z.i>=MAND.length;base();pill(end?'Trigger word, then the base form':z.got?`Sentence ${z.i+1} of 4: pick the verb`:`Sentence ${z.i+1} of 4: tap the trigger word`,end);
 if(end){z.made.forEach((t,j)=>block(t,A.W/2,A.H*(.21+j*.2),A.W-u(30),15,A.col.tx,700));return}
 const s=MAND[z.i];wChips().forEach(q=>card(q,q.w0,{n:17,w:700,bg:z.got&&q.w0===s[2]?'#dcfce7':z.bad===q.j?'#fee2e2':PAPER,edge:z.got&&q.w0===s[2]?YES:z.bad===q.j?NO:null}));
 block(`… ____ ${s[1]}`,A.W/2,A.H*.5,A.W-u(30),17,A.col.tx,700);
 if(z.got)fTiles().forEach(q=>card(q,s[3][(q.j+z.i)%3],{n:19,bg:z.vbad===s[3][(q.j+z.i)%3]?'#fee2e2':PAPER,edge:z.vbad===s[3][(q.j+z.i)%3]?NO:null}));
 else put('Which word asks for something to happen?',A.W/2,A.H*.78,14,A.col.tx,700)}
function trig(j){const z=Z.mand;if(z.i>=MAND.length||z.got)return;const s=MAND[z.i],w=s[0].split(' ')[j];
 if(w===s[2]){z.got=1;z.bad=null;A.sound.pop();return say2(`${w}: it asks for something to happen, so the next verb takes the base form.`)}
 z.bad=j;A.sound.miss();let m=`"${w}" does not demand or suggest anything. Find the word that does.`;say2(m)}
function form(v){const z=Z.mand;if(z.i>=MAND.length||!z.got)return;const s=MAND[z.i];
 if(v===s[3][0]){const t=`${s[0]} ${v} ${s[1]}`;z.made.push(t);z.i++;z.got=0;z.vbad=null;A.sound.pop();return say2(`${t} Base form, the same for every subject.`+(z.i>=MAND.length?' All 4 done.':''))}
 z.vbad=v;A.sound.miss();say2(WHY[v])}
/* ---- 3: Were they to… ---- */
const pieces=()=>{const s=INV[Z.inv.i];if(!s)return[];const P=['If',...s[2]],o=[3,0,2,1].map(k=>P[k]);return o.map((t,j)=>({t,j,x:u(14)+(j%2)*(A.W/2-u(7)),y:A.H*.52+Math.floor(j/2)*A.H*.2,w:A.W/2-u(21),h:A.H*.16}))};
function drawInv(){const z=Z.inv,end=z.i>=INV.length;base();pill(end?'Were jumps to the front; if drops out':`Sentence ${z.i+1} of 3: build the formal version`,end);
 if(end){z.made.forEach((t,j)=>block(t,A.W/2,A.H*(.22+j*.22),A.W-u(30),16,A.col.tx,700));return}
 const s=INV[z.i];block(`With if: ${s[0]} ${s[1]}`,A.W/2,A.H*.185,A.W-u(30),13,A.col.tx,600);
 card({x:u(12),y:A.H*.27,w:A.W-u(24),h:A.H*.21},`${z.got.join(' ')||'…'} ${z.got.length===3?s[1]:''}`,{n:17,w:700,edge:PEN});
 pieces().forEach(q=>{if(!z.got.includes(q.t))card(q,q.t,{n:18,bg:z.bad===q.t?'#fee2e2':PAPER,edge:z.bad===q.t?NO:null})})}
function pick(t){const z=Z.inv;if(z.i>=INV.length)return;const s=INV[z.i],want=s[2][z.got.length];
 if(t===want){z.got.push(t);z.bad=null;A.sound.pop();if(z.got.length===3){const done=`${z.got.join(' ')} ${s[1]}`;z.made.push(done);z.i++;z.got=[];return say2(`${done} Same meaning as ${s[0].replace(/^If/,'if').replace(/,$/,'')}, but more formal.`+(z.i>=INV.length?' All 3 built.':''))}return say2(z.got.join(' ')+' …')}
 z.bad=t;A.sound.miss();let m=`Start with Were: in the formal version the verb jumps in front of ${s[2][1]}.`;if(t==='If')m='When Were moves to the front, if drops out. Were already does the job of if.';else if(z.got.length===1)m=`After Were comes the subject: Were ${s[2][1]} …`;say2(m)}
/* ---- 4: spot the subjunctive in a formal letter ---- */
const lRows=()=>LET.map((r,j)=>({j,x:u(10),y:A.H*.12+j*A.H*.165,w:A.W-u(20),h:A.H*.145}));
function drawLet(){const z=Z.let,end=z.found.length>=3;base();pill(end?'3 subjunctives found':`Tap each subjunctive (${z.found.length} of 3)`,end);
 lRows().forEach(q=>{const f=z.found.includes(q.j),n=z.nope.includes(q.j);card(q,LET[q.j][0],{n:15,w:700,bg:f?'#dcfce7':n?'#f1f5f9':PAPER,edge:f?YES:null})})}
function spot(j){const z=Z.let;if(z.found.length>=3||z.found.includes(j))return;const r=LET[j];
 if(r[1]){z.found.push(j);A.sound.pop();return say2(`Yes: ${r[0]}`+(z.found.length>=3?' All 3 found: be, bring and Were … to.':''))}
 if(!z.nope.includes(j))z.nope.push(j);A.sound.miss();say2(r[2])}
/* ---- 5: formal or everyday ---- */
const shelves=()=>[{k:1,x:u(12),y:A.H*.12,w:A.W/2-u(18),h:A.H*.46},{k:0,x:A.W/2+u(6),y:A.H*.12,w:A.W/2-u(18),h:A.H*.46}];
const slot=()=>({x:u(20),y:A.H*.67,w:A.W-u(40),h:A.H*.18});
function drawReg(){const z=Z.reg,end=z.i>=REG.length;base();pill(end?'Same meaning, two registers':`Card ${z.i+1} of 6: formal or everyday?`,end);
 shelves().forEach(b=>{card(b,'',{bg:b.k?DREAM:REAL,edge:z.bad===b.k?NO:null});put(b.k?'Formal':'Everyday',b.x+b.w/2,b.y+u(16),15,INK,800);
  z.made.filter(m=>m[1]===b.k).forEach((m,j)=>block(m[0],b.x+b.w/2,b.y+u(46)+j*A.H*.12,b.w-12,12,INK,600))});
 if(end)return;const h=slot(),r=z.drag?{...h,x:z.drag.x-h.w/2,y:z.drag.y-h.h/2}:h;card(r,REG[z.i][0],{n:16,edge:PEN})}
function file(k){const z=Z.reg;if(z.i>=REG.length)return;const s=REG[z.i];
 if(k===s[1]){z.made.push(s);z.i++;z.bad=null;A.sound.pop();return say2(`${s[0]} ${k?'Formal: it uses the subjunctive.':'Everyday: fine when chatting.'}`+(z.i>=REG.length?' All 6 sorted.':''))}
 z.bad=k;A.sound.miss();let m=`${s[0]} uses the subjunctive (were, or a base form like go), so it is the formal one.`;if(k)m=`${s[0]} uses was or goes. That is everyday English, not the formal subjunctive.`;say2(m)}
/* ---- input ---- */
function down(p){const k=now();
 if(k==='ifs'&&Z.ifs.i<IFS.length){const q=vChips().find(q=>on(p,q));if(q){Z.ifs.drag={k:q.k,x:p.x,y:p.y,sx:p.x,sy:p.y};A.redraw();return true}}
 if(k==='mand'){if(Z.mand.got){const q=fTiles().find(q=>on(p,q));if(q)form(MAND[Z.mand.i][3][(q.j+Z.mand.i)%3])}else{const q=wChips().find(q=>on(p,q));if(q)trig(q.j)}}
 if(k==='inv'){const q=pieces().find(q=>on(p,q)&&!Z.inv.got.includes(q.t));if(q)pick(q.t)}
 if(k==='let'){const q=lRows().find(q=>on(p,q));if(q)spot(q.j)}
 if(k==='reg'&&Z.reg.i<REG.length){if(on(p,slot())){Z.reg.drag={x:p.x,y:p.y};A.redraw();return true}const b=shelves().find(b=>on(p,b));if(b)file(b.k)}return false}
function move(p){const d=(Z.ifs&&Z.ifs.drag)||(Z.reg&&Z.reg.drag);if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=Z.ifs.drag;if(d){Z.ifs.drag=null;if(p&&(on(p,sBox())||Math.hypot(p.x-d.sx,p.y-d.sy)<u(12)))return ifsPut(d.k);return A.redraw()}
 if(Z.reg.drag){Z.reg.drag=null;const b=p&&shelves().find(b=>on(p,b));if(b)file(b.k);else A.redraw()}}
function wipe(){gen++;for(const q in Z)delete Z[q];Z.ifs={i:0,made:[]};Z.mand={i:0,made:[]};Z.inv={i:0,got:[],made:[]};Z.let={found:[],nope:[]};Z.reg={i:0,made:[]};Z.cb=()=>{}}
function say2(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();Z.cb()}
function start(i,first,ready,msg){wipe();say2(first);Z.cb=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='ifs'&&Z.ifs.i<IFS.length)['was','were'].forEach((w,j)=>b(w,()=>ifsPut(j),`Fill the gap with ${w}`));
 if(k==='mand'&&Z.mand.i<MAND.length){const s=MAND[Z.mand.i];if(Z.mand.got)s[3].forEach(v=>b(v,()=>form(v),`Use ${v}`));else s[0].split(' ').forEach((w,j)=>b(w,()=>trig(j),`${w} is the trigger word`))}
 if(k==='inv'&&Z.inv.i<INV.length)pieces().forEach(q=>{if(!Z.inv.got.includes(q.t))b(q.t,()=>pick(q.t),`Add ${q.t} next`)});
 if(k==='let'&&Z.let.found.length<3)LET.forEach((r,j)=>{if(!Z.let.found.includes(j))b(`Line ${j+1}`,()=>spot(j),`Subjunctive in: ${r[0]}`)});
 if(k==='reg'&&Z.reg.i<REG.length){b('Formal',()=>file(1),`${REG[Z.reg.i][0]} is formal`);b('Everyday',()=>file(0),`${REG[Z.reg.i][0]} is everyday`)}}
const steps=[
{h:'Imagined or real?',p:'For something imagined or wished, formal English uses were for every subject: If I were a bird. I wish it were Friday. For a real fact, was stays: When I was five.',
predict:{q:'If I ___ a bird, I would fly to school. Which is the formal choice?',opts:['was: I goes with was','were: it is imagined'],ans:1},task:'Fill all 5 gaps',
show:()=>demo(0,IFS.map(s=>()=>ifsPut(s[2])),700),go:()=>start(0,'If I ____ a bird, I would fly to school. Drag was or were into the gap.',()=>Z.ifs.i>=IFS.length,'Were for imagined, was for real.')},
{h:'Insist that he be',p:'Some words ask for something to happen: insist, suggest, demand, recommend, vital, essential. After them, formal English uses the base form of the verb, with no -s and no is: that he be, that Sam check.',
predict:{q:'The coach insists that he ___ on time.',opts:['is: he is one person','be: it comes after insists that'],ans:1},task:'Fix all 4 sentences',
show:()=>demo(1,MAND.flatMap((s,i)=>[()=>trig(s[0].split(' ').indexOf(s[2])),()=>form(s[3][0])]),500),go:()=>start(1,'Tap the word that asks for something to happen.',()=>Z.mand.i>=MAND.length,'Trigger word, then the base form.')},
{h:'Were they to…',p:'Very formal writing can drop if and move were to the front: If they were to arrive early becomes Were they to arrive early. Tap the pieces in order.',task:'Build all 3 sentences',
show:()=>demo(2,INV.flatMap(s=>s[2].map(t=>()=>pick(t))),450),go:()=>start(2,'Build the formal version. Which piece comes first?',()=>Z.inv.i>=INV.length,'Were first, then the subject.')},
{h:'Spot it in a letter',p:'A formal letter from school. Tap the sentences that use the subjunctive. Careful: not every were is a subjunctive.',
predict:{q:'Pupils were late on Monday. Is were a subjunctive here?',opts:['Yes: it uses were','No: it is a plain past fact'],ans:1},task:'Find all 3',
show:()=>demo(3,[0,2,4].map(j=>()=>spot(j)),650),go:()=>start(3,'Tap each sentence that uses the subjunctive.',()=>Z.let.found.length>=3,'Subjunctive: be, bring, Were … to.')},
{h:'Formal or everyday?',p:'In chat, If I was you and I suggest he goes are normal. In formal writing and speeches, use the subjunctive. Drag each card to a shelf, or tap a shelf.',task:'Sort all 6 cards',
show:()=>demo(4,REG.map(s=>()=>file(s[1])),550),go:()=>start(4,'If I were you, I would ask. Formal or everyday?',()=>Z.reg.i>=REG.length,'Same meaning, more formal.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.cb()});
const QS=[
{q:'Formal: "If she ___ the head, she would change the rules."',a:'were',o:[['was','Was is fine when chatting. Formal writing uses were for imagined things, even with she.'],['is','Is is for something real now. She is not the head, so it is imagined: were.']]},
{q:'Which is the formal subjunctive?',a:'I recommend that she attend.',o:[['I recommend that she attends.','Attends has -s. After recommend that, use the base form: attend.'],['I recommend that she will attend.','Will is not needed. The subjunctive is the plain base form: attend.']]},
{q:'Which sentence uses the subjunctive?',a:'It is vital that he be ready.',o:[['He was ready on Monday.','That was is a plain past fact, not a subjunctive.'],['If he is ready, we will go.','That is a real possibility with is, not the subjunctive.']]},
{q:'Fill the gap: "When I ___ six, I broke my arm."',a:'was',o:[['were','This really happened, so it is a fact: was. Were is for imagined things.'],['be','Be is the base form used after words like insist that. Here it is a plain past fact.']]},
{q:'Which means "If they were to win"?',a:'Were they to win',o:[['If were they to win','When were moves to the front, if drops out.'],['They were to win','That is a plain statement about a plan, not an if.']]},
{q:'Formal: "The rules demand that pupils ___ run."',a:'not',o:[["don't","Formal writing puts not straight before the base form: that pupils not run."],['does not','No does in the subjunctive. Just not, then the base form.']]}];
function ask(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,''],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>grade(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(why,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why)}
function draw(){const k=now();if(k==='quiz'){base();pill('Challenge',1);block('If I were you · that he be · Were they to …',A.W/2,A.H*.5,A.W-u(40),17,A.col.tx,800);return}
 ({ifs:drawIfs,mand:drawMand,inv:drawInv,let:drawLet,reg:drawReg})[k]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Subjunctive buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}}).start()})})();
