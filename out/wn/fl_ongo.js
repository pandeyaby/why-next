/* Flagship – progressive tenses (ages 9–10; CCSS L.4.1b; NC England Y2): be + -ing on a timeline, -ing spelling, now vs habit,
   interrupted actions, verb slips. */
(()=>{
/* [before gap, after, helper, 0 past 1 now 2 future, subject, I/one/many, clue] */
const HELP=[['Right now I','reading a comic.','am',1,'I','I','Right now'],['At 3 pm yesterday, they','swimming.','were',0,'they','many','At 3 pm yesterday'],
 ['Tomorrow at 3 pm, she','travelling to Leeds.','will be',2,'she','one','Tomorrow at 3 pm'],['Look! The dog','digging a hole.','is',1,'The dog','one','Look!'],
 ['At 8 last night, Sam','watching a film.','was',0,'Sam','one','At 8 last night'],['At noon on Saturday, we','flying to Spain.','will be',2,'we','many','At noon on Saturday']];
const TILES=['am','is','are','was','were','will','will be'],WHEN={am:1,is:1,are:1,was:0,were:0,will:2,'will be':2},ZONE=['the past','now','the future'];
/* [verb, right, [[wrong, why]]] */
const ING=[['run','running',[['runing','Short u, one n: double it. running.'],['runnin','Write the g: ing has three letters, even when we drop it in speech.']]],
 ['make','making',[['makeing','make ends in e. Drop the e before you add ing: making.'],['makking','Do not double the k. Drop the e: making.']]],
 ['swim','swimming',[['swiming','Short i, one m: double it. swimming.'],['swimeing','swim has no e. Double the m: swimming.']]],
 ['write','writing',[['writting','write has a long i. Drop the e; do not double the t: writing.'],['writeing','Drop the e before ing: writing.']]],
 ['play','playing',[['plaing','Keep the y: playing.'],['playin','Write the g at the end: playing.']]],
 ['sit','sitting',[['siting','Short i, one t: double it. sitting.'],['sittin','Write the g at the end: sitting.']]]];
/* [sentence, 0 now / 1 habit, clue] */
const NOWH=[['Shh! The baby is sleeping.',0,'Shh! tells you it is going on now.'],['We walk to school every day.',1,'every day tells you it is a habit.'],
 ['Look, it is snowing!',0,'Look! points at something going on now.'],['Owls hunt at night.',1,'It is always true about owls.'],
 ['I am doing my homework.',0,'am doing is going on as I speak.'],['Water boils at 100 °C.',1,'A fact that is always true uses the simple present.']];
/* [[A, B], long one, sentence, quick event in simple past] */
const CUT=[[['reading a book','the phone ringing'],0,'Mia was reading a book when the phone rang.','rang'],[['walking home','the rain starting'],0,'We were walking home when the rain started.','started'],
 [['the bell ringing','playing football'],1,'They were playing football when the bell rang.','rang'],[['falling over','skating'],1,'I was skating when I fell over.','fell'],
 [['cooking tea','the smoke alarm going off'],0,'Dad was cooking tea when the smoke alarm went off.','went off']];
/* [words, slip indexes, fix, why] */
const SLIP=[[['They','was','playing','outside.'],[1],'were','They is more than one, so it takes were.'],[['She','is','play','the','piano.'],[2],'playing','After is you need the -ing word: is playing.'],
 [['Tomorrow','I','will','travelling','to','Leeds.'],[2,3],'will be travelling','The future progressive is will be + -ing: will be travelling.'],
 [['I','am','knowing','the','answer.'],[1,2],'know','know is a state, not an action, so it does not usually take -ing: I know the answer.'],
 [['We','were','sit','on','the','bus.'],[2],'sitting','were needs the -ing word, and sit doubles the t: sitting.']];
VIS.reg('flagongo',c=>{let A,g,pad,chal,qi=-1,gen=0;const st={};
const INK='#0f172a',OK='#047857',BAD='#be123c',CARD='#ffffff',EDGE='#64748b',BAR='#bfdbfe',BARE='#1d4ed8',DOT='#fde68a',DOTE='#92400e',HOT='#1d4ed8';
const sz=n=>Math.round(n*(A.narrow?.94:1.1)),fnt=(n,w)=>`${w||700} ${sz(n)}px system-ui,sans-serif`,inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const part=()=>['help','ing','nowh','cut','slip','quiz'][A.step],DATA={help:HELP,ing:ING,nowh:NOWH,cut:CUT,slip:SLIP},over=k=>st[k].i>=DATA[k].length;
const warn=()=>A.col.dark?'#fda4af':BAD,good=()=>A.col.dark?'#6ee7b7':OK;
function bg(){g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function font(n,w,al){g.font=fnt(n,w);g.textAlign=al||'center';g.textBaseline='middle'}
function wrapAt(t,x,y,w,n){const rows=[];let r='';t.split(' ').forEach(q=>{const k=r?r+' '+q:q;if(g.measureText(k).width>w&&r){rows.push(r);r=q}else r=k});rows.push(r);
 const lh=sz(n)*1.25;rows.forEach((s,i)=>g.fillText(s,x,y+(i-(rows.length-1)/2)*lh))}
function box(r,t,o){o=o||{};g.fillStyle=o.fill||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.edge?3.5:1.4;g.strokeStyle=o.edge||EDGE;g.stroke();
 if(t!=null){g.fillStyle=o.ink||INK;font(o.n||18,o.w||750);wrapAt(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||18)}}
function head(t,won){font(14,800);const w=Math.min(A.W-8,g.measureText(t).width+26),h=sz(14)+14,y=A.H*.02;box({x:A.W/2-w/2,y,w,h},null,{fill:won?'#d1fae5':CARD,edge:won?OK:null});g.fillStyle=INK;g.fillText(t,A.W/2,y+h/2+1,w-12)}
function say(t,y,n,col){g.fillStyle=col||A.col.tx;font(n||15,650);wrapAt(t,A.W/2,y,A.W-26,n||15)}
function recap(t,L){bg();head(t,1);L.forEach((s,i)=>box({x:12,y:A.H*(.14+i*.2),w:A.W-24,h:A.H*.17},s,{n:17,fill:'#ecfdf5'}))}
function timeline(y,mark){const x0=16,x1=A.W-16,mid=A.W/2;g.strokeStyle=A.col.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(x0,y);g.lineTo(x1-8,y);g.stroke();
 g.beginPath();g.moveTo(x1,y);g.lineTo(x1-12,y-7);g.lineTo(x1-12,y+7);g.closePath();g.fillStyle=A.col.tx;g.fill();
 g.fillRect(mid-1.5,y-16,3,32);font(13,800);g.fillText('NOW',mid,y-24);font(12,650);g.fillText('past',x0+26,y+20);g.fillText('future',x1-34,y+20);
 if(mark!=null){const cx=[A.W*.24,mid,A.W*.76][mark],w=A.W*.2;g.fillStyle=BAR;A.paint.rrect(cx-w/2,y-9,w,18,9);g.fill();g.strokeStyle=BARE;g.lineWidth=2;g.stroke();
  g.fillStyle=A.col.tx;font(12,700);g.fillText('going on',cx,y+36)}}
function hTiles(){const per=A.narrow?4:7,gap=8,w=Math.min(sz(84),(A.W-24-(per-1)*gap)/per),h=sz(50);
 return TILES.map((t,j)=>{const row=Math.floor(j/per),col=j%per,n=Math.min(per,TILES.length-row*per),tot=n*w+(n-1)*gap;return{t,x:A.W/2-tot/2+col*(w+gap),y:A.H*(A.narrow?.64:.7)+row*(h+gap),w,h}})}
function drawHelp(){const s=st.help;bg();if(over('help'))return recap('All 6 sentences built',['am, is, are + -ing: going on now','was, were + -ing: going on in the past','will be + -ing: going on in the future']);
 const [pre,post,ans,when]=HELP[s.i];head(`Sentence ${s.i+1} of 6: drag a helper into the gap`);timeline(A.H*.22,s.won?when:null);
 font(19,750);const txt=`${pre} ____ ${post}`;g.fillStyle=A.col.tx;wrapAt(s.won?`${pre} ${ans} ${post}`:txt,A.W/2,A.H*.42,A.W-24,19);
 if(s.msg)say(s.msg,A.H*.54,14,warn());
 hTiles().forEach(r=>{const d=st.drag&&st.drag.t===r.t;box(d?{...r,x:st.drag.x-r.w/2,y:st.drag.y-r.h/2}:r,r.t,{n:19,w:850,fill:'#e0e7ff',ink:'#1e1b4b',edge:d?HOT:null})})}
function help(t){const s=st.help;if(over('help'))return;const [pre,post,ans,when,subj,who,clue]=HELP[s.i];let m;
 if(t===ans){s.i++;s.msg='';A.sound.pop();return tell(`${pre} ${ans} ${post} The clue ${clue} puts it in ${ZONE[when]}, so the helper is ${ans}.`)}
 A.sound.miss();
 if(t==='will')m=`will on its own is not enough. The future progressive needs will be + -ing: will be ${post.split(' ')[0]}.`;
 else if(WHEN[t]!==when)m=`${t} is for ${ZONE[WHEN[t]]}. The clue "${clue}" points to ${ZONE[when]}.`;
 else m=who==='I'?`With I, use ${ans}.`:who==='one'?`${subj} is one, so use ${ans}, not ${t}.`:`${subj} means more than one, so use ${ans}, not ${t}.`;
 s.msg=m;tell(m)}
function iOpts(){const [,right,bad]=ING[st.ing.i],all=[right,...bad.map(b=>b[0])],k=st.ing.i%3,ord=all.slice(k).concat(all.slice(0,k)),h=sz(54),gp=sz(10);
 return ord.map((t,j)=>({t,x:24,w:A.W-48,h,y:A.H*.3+j*(h+gp)}))}
function drawIng(){const s=st.ing;bg();if(over('ing'))return recap('All 6 -ing words spelt',['run → running, swim → swimming, sit → sitting','make → making, write → writing','play → playing']);
 const [base]=ING[s.i];head(`Word ${s.i+1} of 6: add ing`);say(`${base}  +  ing  =  ?`,A.H*.22,26,A.col.tx);
 iOpts().forEach(r=>box(r,r.t,{n:21,fill:s.bad===r.t?'#ffe4e6':CARD,edge:s.bad===r.t?BAD:null}));if(s.msg)say(s.msg,A.H*.885,13,warn())}
function ing(t){const s=st.ing;if(over('ing'))return;const [base,right,bad]=ING[s.i];let m;
 if(t===right){s.i++;s.bad=null;s.msg='';A.sound.pop();return tell(`${base} + ing = ${right}.`)}
 s.bad=t;A.sound.miss();m=(bad.find(b=>b[0]===t)||[0,''])[1];s.msg=m;tell(m)}
function zones(){const y=A.H*.56,h=A.H*.3,w=(A.W-36)/2;return[{z:0,x:12,y,w,h,t:'going on now'},{z:1,x:24+w,y,w,h,t:'a habit or always true'}]}
function cardR(){const w=Math.min(A.W-24,sz(330)),h=sz(64);return st.drag&&st.drag.card?{x:st.drag.x-w/2,y:st.drag.y-h/2,w,h}:{x:A.W/2-w/2,y:A.H*.2,w,h}}
function drawNowh(){const s=st.nowh;bg();if(over('nowh'))return recap('All 6 sentences sorted',['be + -ing: going on now','simple present: a habit or a fact','Clues: Look! Shh! now; every day, always']);
 head(`Card ${s.i+1} of 6: drag it to the right box`);
 zones().forEach(r=>{box(r,null,{fill:r.z?'#fef9c3':'#dbeafe',edge:s.bad===r.z?BAD:null});g.fillStyle=INK;font(15,800);wrapAt(r.t,r.x+r.w/2,r.y+sz(18),r.w-12,15);
  const ly=r.y+r.h*.66;g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(r.x+10,ly);g.lineTo(r.x+r.w-10,ly);g.stroke();
  if(r.z===0){g.fillStyle=BAR;A.paint.rrect(r.x+r.w*.3,ly-8,r.w*.4,16,8);g.fill();g.strokeStyle=BARE;g.stroke()}
  else for(let k=0;k<5;k++){g.fillStyle=DOTE;g.beginPath();g.arc(r.x+r.w*(.16+k*.17),ly,5,0,7);g.fill()}});
 box(cardR(),NOWH[s.i][0],{n:17,fill:CARD,edge:st.drag?HOT:null});if(s.msg)say(s.msg,A.H*.44,13,warn())}
function nowh(z){const s=st.nowh;if(over('nowh'))return;const [t,ans,clue]=NOWH[s.i];let m;
 if(z===ans){s.i++;s.bad=null;s.msg='';A.sound.pop();return tell(`Yes. ${clue}`)}
 s.bad=z;A.sound.miss();m=ans===0?`This one has be + -ing, so it is going on now, not every day. ${clue}`:`There is no be + -ing here, so it is not only happening now. ${clue}`;s.msg=m;tell(m)}
function cutZones(){const y=A.H*.3;return{long:{x:A.W*.08,y:y-22,w:A.W*.62,h:44},dot:{x:A.W*.74,y:y-26,w:A.W*.18,h:52}}}
function chips(){const [L]=CUT[st.cut.i],w=Math.min((A.W-36)/2,sz(190)),h=sz(56);return L.map((t,j)=>({t,j,x:j?A.W/2+6:A.W/2-w-6,y:A.H*.7,w,h}))}
function drawCut(){const s=st.cut;bg();if(over('cut'))return recap('All 5 timelines built',['long action: was or were + -ing','quick event: simple past','... when the phone rang.']);
 head(`Timeline ${s.i+1} of 5: which action was already going on?`);const Z=cutZones(),y=A.H*.3;
 g.strokeStyle=A.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(12,y);g.lineTo(A.W-12,y);g.stroke();
 g.fillStyle=BAR;A.paint.rrect(Z.long.x,y-12,Z.long.w,24,12);g.fill();g.strokeStyle=BARE;g.lineWidth=2;g.stroke();
 g.fillStyle=DOT;g.beginPath();g.arc(Z.dot.x+Z.dot.w/2,y,15,0,7);g.fill();g.strokeStyle=DOTE;g.stroke();
 g.fillStyle=A.col.tx;font(12,700);g.fillText('long action',Z.long.x+Z.long.w/2,y+30);g.fillText('quick event',Z.dot.x+Z.dot.w/2,y+30);
 if(s.msg)say(s.msg,A.H*.53,13,warn());else say('Drag the long action onto the blue bar.',A.H*.5,14);
 chips().forEach(r=>{const d=st.drag&&st.drag.chip===r.j;box(d?{...r,x:st.drag.x-r.w/2,y:st.drag.y-r.h/2}:r,r.t,{n:16,fill:'#e0e7ff',ink:'#1e1b4b',edge:d||s.bad===r.j?(d?HOT:BAD):null})})}
function cut(j){const s=st.cut;if(over('cut'))return;const [L,lng,sent,past]=CUT[s.i];let m;
 if(j===lng){s.i++;s.bad=null;s.msg='';A.sound.pop();return tell(`${sent} The long action gets was or were + -ing; the quick event gets ${past}.`)}
 s.bad=j;A.sound.miss();m=`${L[j][0].toUpperCase()+L[j].slice(1)} happens at one moment. It cuts into the longer action, so it is the quick event (${past}). The long action was ${L[lng]}.`;s.msg=m;tell(m)}
function words(){const [W]=SLIP[st.slip.i];font(20,750);const h=sz(42);let x=12,y=A.H*.3;return W.map((t,i)=>{const w=g.measureText(t).width+sz(18);if(x+w>A.W-12&&x>12){x=12;y+=h+8}const r={t,i,x,y,w,h};x+=w+7;return r})}
function drawSlip(){const s=st.slip;bg();if(over('slip'))return recap('All 5 sentences fixed',SLIP.slice(1,5).map(q=>q[0].map((t,i)=>i===q[1][q[1].length-1]?q[2]:q[1].includes(i)?'':t).filter(Boolean).join(' ')));
 head(`Sentence ${s.i+1} of 5: tap the verb that slips`);
 words().forEach(r=>box(r,r.t,{n:20,fill:s.bad===r.i?'#ffe4e6':CARD,edge:s.bad===r.i?BAD:null}));if(s.msg)say(s.msg,A.H*.75,14,warn())}
function slip(i){const s=st.slip;if(over('slip'))return;const [W,hit,fix,why]=SLIP[s.i];let m;
 if(hit.includes(i)){s.i++;s.bad=null;s.msg='';A.sound.pop();return tell(`Fixed: ${fix}. ${why}`)}
 s.bad=i;A.sound.miss();m=`“${W[i]}” is fine. Check the helper (am, is, are, was, were, will be) and the -ing word.`;s.msg=m;tell(m)}
function down(p){const k=part();
 if(k==='ing'&&!over('ing')){const r=iOpts().find(r=>inR(p,r));if(r)ing(r.t)}
 if(k==='slip'&&!over('slip')){const r=words().find(r=>inR(p,r));if(r)slip(r.i)}
 if(k==='help'&&!over('help')){const r=hTiles().find(r=>inR(p,r));if(r){st.drag={t:r.t,x:p.x,y:p.y};A.redraw();return true}}
 if(k==='nowh'&&!over('nowh')&&inR(p,cardR())){st.drag={card:1,x:p.x,y:p.y};A.redraw();return true}
 if(k==='cut'&&!over('cut')){const r=chips().find(r=>inR(p,r));if(r){st.drag={chip:r.j,x:p.x,y:p.y};A.redraw();return true}}return false}
function move(p){if(st.drag){st.drag.x=p.x;st.drag.y=p.y;A.redraw()}}
function up(p){const d=st.drag;if(!d)return;st.drag=null;const k=part();
 if(k==='help'&&p.y<A.H*.6)return help(d.t);
 if(k==='nowh'){const z=zones().find(r=>inR(p,r));if(z)return nowh(z.z)}
 if(k==='cut'){const Z=cutZones(),pad2=r=>({x:r.x-10,y:r.y-30,w:r.w+20,h:r.h+60});if(inR(p,pad2(Z.long)))return cut(d.chip);if(inR(p,pad2(Z.dot)))return cut(1-d.chip)}
 A.redraw()}
function fresh(){gen++;for(const k in st)delete st[k];Object.assign(st,{help:{i:0},ing:{i:0},nowh:{i:0},cut:{i:0},slip:{i:0},drag:null,test:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.test()}
function begin(i,first,ok,msg){fresh();tell(first);st.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='help'&&!over('help'))TILES.forEach(t=>b(t,()=>help(t),`Put ${t} in the gap`));
 if(k==='ing'&&!over('ing'))iOpts().forEach(r=>b(r.t,()=>ing(r.t),`Spell it ${r.t}`));
 if(k==='nowh'&&!over('nowh')){b('Going on now',()=>nowh(0),'Put the card in going on now');b('Habit or always true',()=>nowh(1),'Put the card in habit or always true')}
 if(k==='cut'&&!over('cut'))CUT[st.cut.i][0].forEach((t,j)=>b(t,()=>cut(j),`${t} was the long action`));
 if(k==='slip'&&!over('slip'))SLIP[st.slip.i][0].forEach((t,i)=>b(t,()=>slip(i),`${t} is the slip`))}
const steps=[
{h:'Going on at a time',p:'An ongoing action needs a helper and an -ing word. The helper tells you when: am, is or are for now; was or were for the past; will be for the future.',
predict:{q:'Tomorrow at 3 pm she ___ travelling. Which fits?',opts:['will','will be'],ans:1},task:'Build all 6 sentences',
show:()=>demo(0,HELP.map(q=>()=>help(q[2])),600),go:()=>begin(0,'Drag a helper into the gap.',()=>over('help'),'The helper shows when; the -ing word shows it is going on.')},
{h:'Spell the -ing word',p:'Most verbs just add ing. A short vowel then one consonant: double it (run, running). A word ending in e: drop the e (make, making).',
predict:{q:'How do you spell make + ing?',opts:['makeing','making'],ans:1},task:'Spell all 6 words',
show:()=>demo(1,ING.map(q=>()=>ing(q[1])),600),go:()=>begin(1,'Tap the right spelling.',()=>over('ing'),'Double, drop the e, or just add ing.')},
{h:'Now or every day?',p:'Is it going on now, or is it a habit or always true? Now uses am, is or are + -ing. A habit uses the simple present: we walk, owls hunt.',
predict:{q:'Is the person in "I walk to school" walking right now?',opts:['yes','not always: it is a habit'],ans:1},task:'Sort all 6 cards',
show:()=>demo(2,NOWH.map(q=>()=>nowh(q[1])),600),go:()=>begin(2,'Drag the card to a box.',()=>over('nowh'),'be + -ing for now; simple present for habits and facts.')},
{h:'Interrupted!',p:'A long action was going on when a quick event cut in. The long action takes was or were + -ing. The quick event takes the simple past.',
predict:{q:'"I was reading when the phone rang." Which started first?',opts:['the ringing','the reading'],ans:1},task:'Build all 5 timelines',
show:()=>demo(3,CUT.map(q=>()=>cut(q[1])),650),go:()=>begin(3,'Drag the long action onto the blue bar.',()=>over('cut'),'The progressive is the background; the simple past cuts in.')},
{h:'Fix the slip',p:'Each sentence has one verb slip. Check the helper matches who and when, then check the -ing word is there.',task:'Fix all 5 sentences',
show:()=>demo(4,SLIP.map(q=>()=>slip(q[1][q[1].length-1])),650),go:()=>begin(4,'Tap the verb that slips.',()=>over('slip'),'Helper + -ing, every time.')},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.test()});
const QS=[
{q:'At 6 pm yesterday, we ___ eating tea.',a:'were',o:[['are','are is for now. The clue "6 pm yesterday" is in the past.'],['was','we is more than one, so it takes were.']]},
{q:'Which sentence is about right now?',a:'She is singing.',o:[['She sings in a choir.','sings with no -ing is a habit, not right now.'],['She sang.','sang is the simple past: it is finished.']]},
{q:'Next Monday at 9, I ___ sitting my test.',a:'will be',o:[['will','will alone is not enough: the future progressive is will be + -ing.'],['am','am is for now. "Next Monday" is in the future.']]},
{q:'Which is spelt right?',a:'hopping',o:[['hoping','hoping comes from hope. hop has a short o, so double the p: hopping.'],['hopeing','There is no e in hop. Double the p and add ing.']]},
{q:'Ben ___ when he tripped.',a:'was running',o:[['ran','The running was the long action going on, so it takes was + -ing.'],['is running','is is for now. tripped is in the past, so use was.']]},
{q:'Which sentence is right?',a:'I know the answer.',o:[['I am knowing the answer.','know is a state, not an action, so it does not usually take -ing.'],['I knowing the answer.','There is no helper, and know does not take -ing here.']]}];
function next(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,''],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,m])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(m,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(m,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!m;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+m)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':m)}
function draw(){const k=part();if(k==='quiz'){bg();head('Challenge',1);timeline(A.H*.3,1);['am, is, are + -ing: now','was, were + -ing: past','will be + -ing: future'].forEach((t,i)=>say(t,A.H*(.5+i*.14),18));return}
 ({help:drawHelp,ing:drawIng,nowh:drawNowh,cut:drawCut,slip:drawSlip})[k]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Verb buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
