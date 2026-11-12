/* Flagship – irregular past tense verbs (ages 7–8; NC England Y2–3 grammar, Appendix 2: past tense; KS1 common exception verbs).
   Sort -ed verbs from changers, swap a vowel tile (sit → sat), sort past-tense families (-ought, -old, -ew, no change),
   catch over-regularised forms (hided, telled) and finish a diary recount. Not flagtense (timeline, -ed spelling, is/was + -ing). */
(()=>{
const VERBS=[['play',0,'played'],['sit',1,'sat'],['walk',0,'walked'],['hide',1,'hid'],['look',0,'looked'],['tell',1,'told']];
const SORT2=['add -ed','change the word'];
/* vowel swap: [letters, index of the vowel slot, new vowel, past word] */
const SWAP=[['sit',1,'a','sat'],['sing',1,'a','sang'],['get',1,'o','got'],['win',1,'o','won'],['run',1,'a','ran'],['dig',1,'u','dug']];
const VOW=['a','e','o','u'];
const FAM=[{n:'-ought',ex:'brought'},{n:'-old',ex:'told'},{n:'-ew',ex:'grew'},{n:'no change',ex:'cut'}];
const FAMC=[['bring',0,'brought'],['sell',1,'sold'],['grow',2,'grew'],['cut',3,'cut'],['think',0,'thought'],['throw',2,'threw'],['put',3,'put'],['buy',0,'bought']];
/* slips: words, index of the over-regularised verb, fix, reason */
const SLIPS=[{t:['I','hided','the','key','.'],bad:1,fix:'hid',why:'hide does not add -ed. hide → hid.'},
{t:['Mum','telled','a','joke','.'],bad:1,fix:'told',why:'tell is in the -old family: tell → told, like sell → sold.'},
{t:['We','comed','home','late','.'],bad:1,fix:'came',why:'come changes its vowel: come → came.'},
{t:['He','catched','the','ball','.'],bad:1,fix:'caught',why:'catch → caught. It sounds like taught.'}];
/* diary: [before, verb, after, right, wrong choices] */
const DIARY=[['Yesterday we','go','to the beach.','went',['goed','go']],['I','find','a crab.','found',['finded','find']],
['It','hide','under a rock.','hid',['hided','hide']],['We','eat','hot chips.','ate',['eated','eat']],['Then we','come','home.','came',['comed','come']]];
VIS.reg('flagirrpast',c=>{let A,ctl,qbox,qn=-1,gen=0;const S={};
const INK='#111827',GOOD='#065f46',BAD='#b91c1c',RIM='#6b7280',GRAB='#1d4ed8',VT='#5b21b6',VF='#ede9fe',PT='#9a3412',PF='#ffedd5';
const ff=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,big=n=>A.narrow?n:Math.round(n*1.2),mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const stage=()=>['ed','swap','fam','slip','diary','quiz'][A.step],hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const yay=()=>A.sound.pop(),nope=()=>A.sound.miss();
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#faf5ff',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function head(t,y,ok,n){const g=A.ctx;let s=big(n||14);g.font=ff(s);let w=g.measureText(t).width+26;while(w>A.W-10&&s>10){s--;g.font=ff(s);w=g.measureText(t).width+26}
const h=s+16,x=Math.max(5,A.W/2-w/2);g.fillStyle='#ffffff';A.paint.rrect(x,y-h/2,w,h,9);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?GOOD:RIM;g.stroke();g.fillStyle=INK;mid(g);g.fillText(t,x+w/2,y+1)}
function chip(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,11);g.fill();g.lineWidth=(o.ok||o.no||o.held)?4:2;
g.strokeStyle=o.ok?GOOD:o.no?BAD:o.held?GRAB:RIM;if(o.dash)g.setLineDash([6,5]);g.stroke();g.setLineDash([]);if(t==null)return;g.fillStyle=o.ink||INK;g.font=ff(o.px||Math.round(r.h*.46));mid(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)}
function bin(r,t,n,sub){const g=A.ctx;g.fillStyle=PF;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=PT;g.lineWidth=2.5;g.stroke();g.fillStyle=INK;g.font=ff(big(16));g.textAlign='center';g.textBaseline='top';g.fillText(t,r.x+r.w/2,r.y+8,r.w-8);
g.font=ff(big(13),700);if(sub)g.fillText(sub,r.x+r.w/2,r.y+8+big(20),r.w-8);if(n)g.fillText(n,r.x+r.w/2,r.y+r.h-big(22),r.w-8)}
function card(){const w=Math.min(A.W-40,big(200)),h=big(56);return{x:A.W/2-w/2,y:A.H*.2,w,h}}
function dragCard(base,t,o){const d=S.drag;chip(d&&d.card?{...base,x:d.x-base.w/2,y:d.y-base.h/2}:base,t,{held:!!(d&&d.card),...o})}
/* step 1: add -ed or change the word */
function edBins(){const w=(A.W-30)/2,h=A.H*.4;return SORT2.map((t,j)=>({t,j,x:10+j*(w+10),y:A.H*.52,w,h}))}
function drawEd(){const s=S.e;paper();head(s.n>=6?'All 6 sorted':`Verb ${s.n+1} of 6: yesterday I ...`,A.H*.07,s.n>=6,13);
edBins().forEach(r=>{const got=VERBS.slice(0,s.n).filter(v=>v[1]===r.j).map(v=>v[2]);bin(r,r.t,got.join(', '),r.j?'sit → sat':'jump → jumped')});
if(s.n<6)dragCard(card(),VERBS[s.n][0],{no:s.miss,bg:VF,ink:VT,px:big(24)})}
function sortEd(j){const s=S.e;if(s.n>=6)return;const [v,k,p]=VERBS[s.n];
if(j!==k){s.miss=1;nope();return tell(k?`${v}ed is not a word. ${v} changes: yesterday I ${p}.`:`${v} just adds -ed: ${p}. Only some verbs change.`)}
s.n++;s.miss=0;yay();tell(`${v} → ${p}.`+(k?' It changes.':' It adds -ed.')+(s.n>=6?' All 6 sorted.':''))}
/* step 2: swap the vowel tile */
function swapLay(){const q=SWAP[Math.min(S.w.n,5)],n=q[0].length,u=Math.min(big(66),(A.W-40)/(n+1)),gap=10,x0=(A.W-(n*u+gap*(n-1)))/2;
const L=[...q[0]].map((ch,i)=>({ch,i,r:{x:x0+i*(u+gap),y:A.H*.36,w:u,h:u}})),kw=Math.min(big(64),(A.W-50)/4);
return{L,keys:VOW.map((v,j)=>({v,x:(A.W-(4*kw+30))/2+j*(kw+10),y:A.H*.72,w:kw,h:kw}))}}
function drawSwap(){const s=S.w;paper();if(s.n>=6){head('All 6 built',A.H*.07,1);[['i → a','sit → sat, sing → sang, run → ran'],['e/i → o','get → got, win → won'],['i → u','dig → dug']].forEach(([a,b],j)=>head(`${a}: ${b}`,A.H*(.3+j*.18),1,15));return}
const q=SWAP[s.n],R=swapLay(),g=A.ctx;head(`Word ${s.n+1} of 6: today I ${q[0]}. Yesterday I ...`,A.H*.07,0,13);
g.fillStyle=A.col.tx;g.font=ff(big(14),700);mid(g);g.fillText('Drag a new vowel onto the dashed letter.',A.W/2,A.H*.24,A.W-14);
R.L.forEach(o=>{const slot=o.i===q[1];chip(o.r,s.got&&slot?q[2]:o.ch,{dash:slot&&!s.got,no:slot&&s.miss,ok:slot&&s.got,bg:slot?VF:null,ink:slot?VT:INK,px:Math.round(o.r.h*.56)})});
const d=S.drag;R.keys.forEach((k,j)=>chip(d&&d.j===j?{...k,x:d.x-k.w/2,y:d.y-k.h/2}:k,k.v,{bg:PF,ink:PT,held:d&&d.j===j,px:Math.round(k.h*.5)}))}
function putVowel(v){const s=S.w;if(s.n>=6)return;const q=SWAP[s.n],made=q[0].slice(0,q[1])+v+q[0].slice(q[1]+1);
if(v!==q[2]){s.miss=1;nope();return tell(made===q[0]?`That is still ${q[0]}. The vowel must change.`:`${made} is not the past of ${q[0]}. Try another vowel.`)}
s.miss=0;s.n++;yay();tell(`${q[0]} → ${q[3]}. One vowel changed, no -ed.`+(s.n>=6?' All 6 built.':''))}
/* step 3: past-tense families */
function famBins(){const w=(A.W-30)/2,h=A.H*.25;return FAM.map((f,j)=>({...f,j,x:10+(j%2)*(w+10),y:A.H*.42+Math.floor(j/2)*(h+8),w,h}))}
function drawFam(){const s=S.f;paper();head(s.n>=8?'All 8 sorted':`Verb ${s.n+1} of 8: which family is its past in?`,A.H*.07,s.n>=8,13);
famBins().forEach(r=>{const got=FAMC.slice(0,s.n).filter(v=>v[1]===r.j).map(v=>v[2]);bin(r,r.n,got.join(', ')||' ',r.n==='no change'?'cut → cut':'like '+r.ex)});
if(s.n<8){const b=card();dragCard({...b,y:A.H*.17},FAMC[s.n][0],{no:s.miss,bg:VF,ink:VT,px:big(24)})}}
function sortFam(j){const s=S.f;if(s.n>=8)return;const [v,k,p]=FAMC[s.n];
if(j!==k){s.miss=1;nope();return tell(`Say it: yesterday I ${p}. ${p} ends like ${FAM[k].n==='no change'?'the word itself: no change':FAM[k].ex}, so it goes in ${FAM[k].n}.`)}
s.n++;s.miss=0;yay();tell(`${v} → ${p}.`+(s.n>=8?' All 8 sorted.':''))}
/* step 4: catch the slip */
function lineTiles(ws){const g=A.ctx,px=big(19);g.font=ff(px);const hh=px+26,sp=6,wd=ws.map(w=>/^[.?]$/.test(w)?22:Math.max(44,g.measureText(w).width+20));
const tot=wd.reduce((a,b)=>a+b,0)+sp*(wd.length-1),k=Math.min(1,(A.W-12)/tot);let x=(A.W-tot*k)/2;return wd.map(w=>{const r={x,y:A.H*.4,w:w*k,h:hh*Math.max(.8,k)};x+=(w+sp)*k;return r})}
function drawSlip(){const s=S.s;paper();if(s.n>=4){head('All 4 fixed',A.H*.07,1);SLIPS.forEach((q,j)=>head(q.t.map((w,i)=>i===q.bad?q.fix:w).join(' ').replace(/ ([.?])/,'$1'),A.H*(.25+j*.16),1,16));return}
const q=SLIPS[s.n],R=lineTiles(q.t);head(`Line ${s.n+1} of 4: tap the verb that is wrong`,A.H*.07,0,13);
q.t.forEach((w,i)=>{if(/^[.?]$/.test(w)){const g=A.ctx;g.fillStyle=A.col.tx;g.font=ff(big(22));mid(g);g.fillText(w,R[i].x+R[i].w/2,R[i].y+R[i].h/2);return}chip(R[i],w,{no:s.miss===i,px:big(19)})})}
function tapSlip(i){const s=S.s;if(s.n>=4)return;const q=SLIPS[s.n];if(/^[.?]$/.test(q.t[i]))return;
if(i!==q.bad){s.miss=i;nope();return tell(`${q.t[i]} is fine. Find the doing word with a made-up -ed.`)}
s.n++;s.miss=null;yay();tell(`${q.t[i]} → ${q.fix}. ${q.why}`+(s.n>=4?' All 4 fixed.':''))}
/* step 5: diary recount */
const dOrder=n=>{const q=DIARY[n],all=[q[3],...q[4]],r=n%3;return all.slice(r).concat(all.slice(0,r))};
function dKeys(){const w=Math.min(big(118),(A.W-40)/3),h=big(52),x0=(A.W-(3*w+20))/2;return[0,1,2].map(j=>({x:x0+j*(w+10),y:A.H*.76,w,h}))}
function drawDiary(){const s=S.d,g=A.ctx;paper();head(s.n>=5?'Diary done':`Line ${s.n+1} of 5: drag in the past tense`,A.H*.07,s.n>=5,13);
const rows=Math.min(s.n+1,5),lh=Math.min(big(30),A.H*.1);g.font=ff(big(15),700);g.textAlign='left';g.textBaseline='middle';
for(let i=0;i<rows;i++){const q=DIARY[i],y=A.H*.18+i*lh,txt=i<s.n?`${q[0]} ${q[3]} ${q[2]}`:`${q[0]} ___ ${q[2]}  (${q[1]})`;g.fillStyle=i<s.n?(A.col.dark?'#6ee7b7':GOOD):A.col.tx;g.fillText(txt,12,y,A.W-24)}
if(s.n<5){const d=S.drag;dOrder(s.n).forEach((w,j)=>{const b=dKeys()[j];chip(d&&d.j===j?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b,w,{bg:VF,ink:VT,held:d&&d.j===j,no:s.miss===w,px:big(20)})});
const slot={x:A.W/2-big(70),y:A.H*.6,w:big(140),h:big(42)};chip(slot,null,{dash:1});g.fillStyle=INK;g.font=ff(big(12),700);mid(g);g.fillText('drop here',slot.x+slot.w/2,slot.y+slot.h/2)}}
function dSlot(){return{x:A.W/2-big(70),y:A.H*.6,w:big(140),h:big(42)}}
function putDiary(w){const s=S.d;if(s.n>=5)return;const q=DIARY[s.n];
if(w!==q[3]){s.miss=w;nope();return tell(w===q[1]?`${w} is now, but this is yesterday. Use the past: ${q[3]}.`:`${w} is not a real word. ${q[1]} changes: ${q[3]}.`)}
s.n++;s.miss=null;yay();tell(`${q[0]} ${q[3]} ${q[2]}`+(s.n>=5?' The diary is done.':''))}
function draw(){const k=stage();if(k==='quiz'){paper();head('Challenge',A.H*.2,1);head('sit → sat · tell → told · cut → cut',A.H*.5,0,17);return}
({ed:drawEd,swap:drawSwap,fam:drawFam,slip:drawSlip,diary:drawDiary})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();
if(k==='ed'&&S.e.n<6){if(hit(p,card())){S.drag={card:1,x:p.x,y:p.y};return true}const b=edBins().find(r=>hit(p,r));if(b)sortEd(b.j);return false}
if(k==='swap'&&S.w.n<6){const j=swapLay().keys.findIndex(r=>hit(p,r));if(j>=0){S.drag={j,x:p.x,y:p.y};return true}return false}
if(k==='fam'&&S.f.n<8){if(hit(p,{...card(),y:A.H*.17})){S.drag={card:1,x:p.x,y:p.y};return true}const b=famBins().find(r=>hit(p,r));if(b)sortFam(b.j);return false}
if(k==='slip'&&S.s.n<4){const i=lineTiles(SLIPS[S.s.n].t).findIndex(r=>hit(p,r));if(i>=0)tapSlip(i);return false}
if(k==='diary'&&S.d.n<5){const j=dKeys().findIndex(r=>hit(p,r));if(j>=0){S.drag={j,x:p.x,y:p.y};return true}}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
const near=(p,r,m)=>hit(p,{x:r.x-m,y:r.y-m,w:r.w+2*m,h:r.h+2*m});
function up(p){const d=S.drag;if(!d)return;S.drag=null;const k=stage();
if(k==='ed'){const b=edBins().find(r=>hit(p,r));if(b)sortEd(b.j);else A.redraw();return}
if(k==='fam'){const b=famBins().find(r=>hit(p,r));if(b)sortFam(b.j);else A.redraw();return}
if(k==='swap'){const R=swapLay(),sl=R.L[SWAP[S.w.n][1]].r;if(near(p,sl,24)||hit(p,R.keys[d.j]))putVowel(VOW[d.j]);else A.redraw();return}
if(k==='diary'){if(near(p,dSlot(),26)||hit(p,dKeys()[d.j]))putDiary(dOrder(S.d.n)[d.j]);else A.redraw()}}
function wipe(){gen++;for(const k in S)delete S[k];Object.assign(S,{e:{n:0},w:{n:0},f:{n:0},s:{n:0},d:{n:0},drag:null,check:()=>{}})}
function tell(t){if(!t)return;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.check()}
function open(i,desc,ok,msg){wipe();tell(desc);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=stage(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
if(k==='ed'&&S.e.n<6)SORT2.forEach((t,j)=>B(t,()=>sortEd(j),`${VERBS[S.e.n][0]}: ${t}`));
if(k==='swap'&&S.w.n<6)VOW.forEach(v=>B(v,()=>putVowel(v),`Put ${v} in the vowel slot`));
if(k==='fam'&&S.f.n<8)FAM.forEach((f,j)=>B(f.n,()=>sortFam(j),`${FAMC[S.f.n][0]} goes in ${f.n}`));
if(k==='slip'&&S.s.n<4)SLIPS[S.s.n].t.forEach((w,i)=>{if(!/^[.?]$/.test(w))B(w,()=>tapSlip(i),`Is ${w} wrong?`)});
if(k==='diary'&&S.d.n<5)dOrder(S.d.n).forEach(w=>B(w,()=>putDiary(w),`Write ${w}`))}
const steps=[
{h:'Add -ed, or change?',p:'Most verbs add -ed for the past: play, played. Some change instead. Drag each verb to its box.',
predict:{q:'Yesterday I ___ to the park. (go)',opts:['goed','went'],ans:1},task:'Sort all 6 verbs',
show:()=>play(0,VERBS.map(v=>()=>sortEd(v[1])),600),
go:()=>open(0,'Card: play. Boxes: add -ed, or change the word.',()=>S.e.n>=6,'Some verbs change instead of adding -ed.')},
{h:'Swap the vowel',p:'Many irregular verbs change just one vowel: sit, sat. Drag a vowel onto the dashed letter.',
predict:{q:'Today I sing. Yesterday I ...',opts:['singed','sang'],ans:1},task:'Build all 6 past words',
show:()=>play(1,SWAP.map(q=>()=>putVowel(q[2])),650),
go:()=>open(1,'Letters s, i, t. Swap the i for a new vowel.',()=>S.w.n>=6,'sat, sang, got, won, ran, dug: one vowel changed.')},
{h:'Past-tense families',p:'Irregular verbs come in families. bring and think both end in -ought: brought, thought. Drag each verb to its family.',
predict:{q:'cut: what is the past? Yesterday I ...',opts:['cutted','cut'],ans:1},task:'Sort all 8 verbs',
show:()=>play(2,FAMC.map(v=>()=>sortFam(v[1])),500),
go:()=>open(2,'Card: bring. Families: -ought, -old, -ew, no change.',()=>S.f.n>=8,'Learn them in families: -ought, -old, -ew, no change.')},
{h:'Catch the slip',p:'Writers often add -ed to a verb that changes. Tap the wrong verb in each line.',task:'Fix all 4 lines',
show:()=>play(3,SLIPS.map(q=>()=>tapSlip(q.bad)),800),
go:()=>open(3,'I hided the key. Each word is a tile.',()=>S.s.n>=4,'hid, told, came, caught.')},
{h:'Write the diary',p:'This happened yesterday, so every verb must be past tense. Drag in the right word.',task:'Finish the diary',
show:()=>play(4,DIARY.map(q=>()=>putDiary(q[3])),700),
go:()=>open(4,'Yesterday we ___ to the beach. Choices for go.',()=>S.d.n>=5,'A recount stays in the past tense.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'Yesterday Sam ___ on the mat. (sit)',a:'sat',o:[['sitted','ed'],['sit','now']]},
{q:'Which is the past of tell?',a:'told',o:[['telled','ed2'],['tolled','double']]},
{q:'Last night I ___ my shoes. (hide)',a:'hid',o:[['hided','ed3'],['hide','now2']]},
{q:'Which verb is the same in the past?',a:'put',o:[['run','vowel'],['jump','reg']]},
{q:'She ___ a kite yesterday. (bring)',a:'brought',o:[['bringed','ed4'],['brang','sang']]},
{q:'Why do we not write goed?',a:'go changes to went',o:[['goed is fine to write','ok'],['go adds -ed','reg2']]}];
function why(t){let m='Say it in a sentence about yesterday.';
if(t==='ed')m='sitted is not a word. sit swaps a vowel: sat.';
if(t==='now')m='sit is now. Yesterday needs the past: sat.';
if(t==='ed2')m='telled adds -ed, but tell is in the -old family: told.';
if(t==='double')m='tolled is a bell ringing. tell → told, like sell → sold.';
if(t==='ed3')m='hided adds -ed. hide changes: hid.';
if(t==='now2')m='hide is now. Last night needs the past: hid.';
if(t==='vowel')m='run changes its vowel: ran. put stays put.';
if(t==='reg')m='jump adds -ed: jumped. put stays put.';
if(t==='ed4')m='bringed adds -ed. bring is in the -ought family: brought.';
if(t==='sang')m='sing → sang, but bring does not follow it. bring → brought.';
if(t==='ok')m='Little children say goed, but in writing the past of go is went.';
if(t==='reg2')m='go does not add -ed. It turns into a new word: went.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok1'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok1';if(ok)A.win();else nope();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:B=>{qbox.hidden=B.step!==5;ctl.hidden=B.step===5;controls()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Past tense buttons'},bx);qbox=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});controls()}}).start()})})();
