/* Flagship – writing to inform (ages 5–7): pick an opening sentence that names the topic (not "Once upon a time"),
   sort sentences into facts and not-facts (opinions, made-up bits), spot the sentence that wanders off the topic,
   label a butterfly diagram (wing, antenna, body, leg) and build an information page in order: heading, topic
   sentence, facts, closing sentence. Challenge on the usual slips: writing a story instead, "I think" counted as a
   fact, off-topic sentences, "The end." as a closing, labels on the wrong part, the heading at the bottom. */
(()=>{
const OPEN=[['🦋',[['Butterflies are insects.','ok'],['Once upon a time there was a butterfly.','story'],['I like the park.','off']]],
 ['🐸',[['Frogs live in and near ponds.','ok'],['My frog Fred can talk to me.','pretend'],['It is sunny today.','off']]],
 ['🥪',[['This is how to make a jam sandwich.','ok'],['Yum! I love jam so much!','feel'],['The cat sat on the mat.','off']]]];
const SORT=[['Frogs lay eggs called frogspawn.',1],['I think frogs are cute.',0],['Frogs can jump a long way.',1],['My frog can fly a kite.',0],['Tadpoles grow into frogs.',1],['Frogs are the best!',0]];
const PAGES=[['🐝 Bees',['Bees have six legs.','Honey bees make honey.','I had pizza for tea.','Honey bees live in hives.'],2],
 ['🥪 Jam sandwich',['Get two slices of bread.','My dog is brown.','Spread on the jam.','Put the slices together.'],1]];
const PARTS=['wing','antenna','body','leg'];
const CARDS=[['Frogs','head'],['Frogs live in and near ponds.','topic'],['Frogs lay eggs called frogspawn.','fact'],['Tadpoles grow into frogs.','fact'],['Now you know how frogs grow.','close'],['The end.','end']];
VIS.reg('flaginform',c=>{let A,pad,quiz,qn=-1,run1=0;c.fig.classList.add('young');
const B={tok:0,want:()=>{},o:0,named:0,picked:'',s:0,bad:-1,pg:0,found:0,lab:[],page:[],drag:null,shake:0};
const mode=()=>['open','sort','stay','label','build','quiz'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1.1:1.28));
function tx(g,s,x,y,n,col,w,al){g.font=`${w||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W*.9)}
function card(g,r,tint,edge,lw){g.fillStyle=tint;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge||A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
const sbins=()=>[{x:8,y:A.H*.62,w:A.W/2-14,h:A.H*.3},{x:A.W/2+6,y:A.H*.62,w:A.W/2-14,h:A.H*.3}];
const scard=()=>({x:A.W*.06,y:A.H*.1,w:A.W*.88,h:A.H*.3});
const row=k=>({x:A.W*.06,y:A.H*(.2+k*.17),w:A.W*.88,h:A.H*.14});
const spots=()=>[{x:A.W*.36,y:A.H*.3},{x:A.W*.42,y:A.H*.1},{x:A.W*.5,y:A.H*.5},{x:A.W*.6,y:A.H*.64}];
const lbox=k=>[{x:A.W*.02,y:A.H*.2},{x:A.W*.02,y:A.H*.02},{x:A.W*.72,y:A.H*.36},{x:A.W*.72,y:A.H*.62}][k];
const LB=()=>({w:A.W*.26,h:A.H*.13});
function fly(g,C){const cx=A.W*.5,cy=A.H*.42;g.fillStyle=A.alpha(C.vi,.35);[[-1,-1],[1,-1]].forEach(([sx])=>{g.beginPath();g.ellipse(cx+sx*A.W*.1,cy-A.H*.1,A.W*.1,A.H*.12,sx*.5,0,7);g.fill()});
 g.fillStyle=A.alpha(C.cy,.35);[-1,1].forEach(sx=>{g.beginPath();g.ellipse(cx+sx*A.W*.08,cy+A.H*.1,A.W*.07,A.H*.09,-sx*.4,0,7);g.fill()});
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(cx-3,cy-A.H*.18);g.quadraticCurveTo(cx-10,cy-A.H*.3,cx-A.W*.08,cy-A.H*.32);g.moveTo(cx+3,cy-A.H*.18);g.quadraticCurveTo(cx+10,cy-A.H*.3,cx+A.W*.08,cy-A.H*.32);
 for(let k=0;k<3;k++)[-1,1].forEach(sx=>{g.moveTo(cx+sx*4,cy+k*A.H*.05);g.lineTo(cx+sx*A.W*.1,cy+A.H*(.12+k*.05))});g.stroke();g.fillStyle=C.tx;g.beginPath();g.ellipse(cx,cy,6,A.H*.18,0,0,7);g.fill()}
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.06:.4);g.fillRect(0,0,W,H);
 if(m==='quiz'){tx(g,'📝 I can write to inform!',W/2,H*.4,18,C.tx,800);tx(g,'Topic. Facts. Closing.',W/2,H*.58,14);return}
 if(m==='open'){const o=OPEN[B.o%3];card(g,{x:W*.3,y:H*.05,w:W*.4,h:H*.4},A.alpha(C.cy,.12));tx(g,o[0],W/2,H*.25,48);
  tx(g,'First sentence:',W/2,H*.56,12,C.tx,800);card(g,{x:W*.05,y:H*.62,w:W*.9,h:H*.16},A.alpha(B.bad>=0?C.rd:C.gr,.12),B.bad>=0?C.rd:C.tx);tx(g,B.picked||'…',W/2,H*.7,12,C.tx,700);
  tx(g,'Named the topic: '+B.named+' of 3',W/2,H*.92,11,C.tx,600)}
 if(m==='sort'){const bb=sbins();card(g,bb[0],A.alpha(C.gr,.16),B.bad===1?C.rd:C.tx,B.bad===1?4:2);card(g,bb[1],A.alpha(C.or,.18),B.bad===0?C.rd:C.tx,B.bad===0?4:2);
  tx(g,'✅ Fact',bb[0].x+bb[0].w/2,bb[0].y+bb[0].h*.4,14,C.tx,800);tx(g,'true for all frogs',bb[0].x+bb[0].w/2,bb[0].y+bb[0].h*.72,10,C.tx,600);tx(g,'💭 Not a fact',bb[1].x+bb[1].w/2,bb[1].y+bb[1].h*.4,14,C.tx,800);tx(g,'a feeling or made up',bb[1].x+bb[1].w/2,bb[1].y+bb[1].h*.72,10,C.tx,600);
  if(B.s<SORT.length){const r=scard(),d=B.drag;if(d){tx(g,SORT[B.s][0],d.x,d.y,12,C.tx,800)}else{card(g,r,A.alpha(C.cy,.12));tx(g,'🐸',W/2,r.y+r.h*.32,26);tx(g,SORT[B.s][0],W/2,r.y+r.h*.72,12,C.tx,800)}}
  else tx(g,'All sorted!',W/2,H*.25,18,C.tx,800);tx(g,'Sorted '+B.s+' of '+SORT.length,W/2,H*.5,11,C.tx,600)}
 if(m==='stay'){const p=PAGES[B.pg%2];tx(g,p[0],W/2,H*.09,16,C.tx,800);p[1].forEach((s,k)=>{const r=row(k),off=B.found>B.pg%2+(B.pg>1?1:0)&&k===p[2];card(g,r,A.alpha(B.bad===k?C.rd:C.cy,.1),B.bad===k?C.rd:C.tx,B.bad===k?3:2);tx(g,s,W/2,r.y+r.h/2,12,C.tx,700)});
  tx(g,'Off-topic found: '+B.found+' of 2',W/2,H*.93,11,C.tx,600)}
 if(m==='label'){fly(g,C);const sp=spots(),lb=LB();PARTS.forEach((_,k)=>{const b=lbox(k),s=sp[k];g.strokeStyle=A.alpha(C.tx,.6);g.lineWidth=1.5;g.beginPath();g.moveTo(b.x+lb.w/2,b.y+lb.h/2);g.lineTo(s.x,s.y);g.stroke();
   g.fillStyle=C.or;g.beginPath();g.arc(s.x,s.y,5,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();card(g,{x:b.x,y:b.y,w:lb.w,h:lb.h},C.pn,B.bad===k?C.rd:C.tx,B.bad===k?4:2);tx(g,B.lab.includes(k)?PARTS[k]:String(k+1),b.x+lb.w/2,b.y+lb.h/2,12,C.tx,800)});
  const n=B.lab.length;if(n<4){const d=B.drag;tx(g,'🏷️ '+PARTS[n],d?d.x:W/2,d?d.y:H*.9,14,C.tx,800)}else tx(g,'All labelled!',W/2,H*.9,14,C.tx,800)}
 if(m==='build'){const pw={x:W*.06,y:H*.04,w:W*.88,h:H*.62};card(g,pw,A.alpha(C.pn,1),C.tx);B.page.forEach((k,i)=>tx(g,CARDS[k][0],W/2,pw.y+18+i*H*.11,k===0?15:11,C.tx,k===0?800:600));
  if(!B.page.length)tx(g,'Your page',W/2,pw.y+pw.h/2,13,A.alpha(C.tx,.8),600);tx(g,B.page.length>=5?'Page done!':'Tap the next card',W/2,H*.78,13,C.tx,800);
  tx(g,'Cards used: '+B.page.length+' of 5',W/2,H*.92,11,C.tx,600)}
 A.fx.draw(g)}
const no=t=>{A.sound.miss();say(t);A.redraw()},yes=t=>{A.sound.pop();say(t);pads();A.redraw();B.want()};
const wobble=()=>{B.shake=.4;A.tween(B,{shake:0},A.reduced()?1:500,'out')};
function open(tag,s){if(B.named>=3||B.picked&&B.bad<0)return;B.picked=s;
 if(tag!=='ok'){B.bad=1;const m={story:'"Once upon a time" starts a story. Information starts by naming the topic.',off:'That sentence is not about the picture. Name the topic first.',pretend:'A talking frog is made up. Information tells true things.',feel:'That tells how you feel. Say what the page is about.'}[tag];return no(m)}
 B.bad=-1;B.named++;yes(B.named>=3?'Three topics named! Readers know what each page is about.':'Yes! That names the topic.');if(B.named<3){const t=B.tok;setTimeout(()=>{if(t===B.tok){B.o++;B.picked='';pads();A.redraw()}},A.reduced()?20:700)}}
function sortTo(k){B.drag=null;if(B.s>=SORT.length)return A.redraw();const[s,f]=SORT[B.s],want=f?0:1;
 if(k!==want){B.bad=f;wobble();return no(f?'That is true for frogs, so it is a fact.':/I think|best/.test(s)?'"I think" and "the best" tell a feeling. That is not a fact.':'Frogs can not really do that. Made-up things are not facts.')}
 B.bad=-1;B.s++;yes(f?'Yes, a fact about frogs.':'Yes, not a fact. Keep it out of information writing.')}
function stay(k){const p=PAGES[B.pg%2];if(B.found>=2)return;if(k!==p[2]){B.bad=k;return no('That sentence is about '+p[0].slice(3).toLowerCase()+'. It stays. Find the one that is not.')}
 B.bad=-1;B.found++;yes(B.found>=2?'Both found! Every sentence should be about the topic.':'Yes! That one is off the topic. Take it out.');if(B.found<2){const t=B.tok;setTimeout(()=>{if(t===B.tok){B.pg++;pads();A.redraw()}},A.reduced()?20:700)}}
function label(k){B.drag=null;const n=B.lab.length;if(n>=4)return A.redraw();if(B.lab.includes(k)){B.bad=k;return no('That box has a label already.')}
 if(k!==n){B.bad=k;const m=['That line points to a wing.','That line points to an antenna, the feeler on the head.','That line points to the body.','That line points to a leg.'][k];return no(m+' Where does "'+PARTS[n]+'" go?')}
 B.bad=-1;B.lab.push(k);yes(B.lab.length>=4?'All four labels on. Labels tell facts about a picture.':'Yes, that is the '+PARTS[k]+'.')}
function place(k){if(B.page.length>=5||B.page.includes(k))return;const role=CARDS[k][1],n=B.page.length,facts=B.page.filter(i=>CARDS[i][1]==='fact').length;
 const need=n===0?'head':n===1?'topic':facts<2?'fact':'close';
 if(role==='end'){B.bad=k;return no('"The end." is for stories. Information ends with a sentence that sums up.')}
 if(role!==need){B.bad=k;const m={head:'Start with the heading at the top. It names the topic in one or two words.',topic:'After the heading, a sentence tells the reader the topic.',fact:'Now add the facts.',close:'The closing sentence goes last, after the facts.'}[need];return no(m)}
 B.bad=-1;B.page.push(k);yes(B.page.length>=5?'Heading, topic, facts, closing. A full information page!':'Yes. What comes next?')}
function pads(){if(!pad)return;pad.innerHTML='';const m=mode(),K=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='open'&&B.named<3&&!(B.picked&&B.bad<0)){const o=OPEN[B.o%3][1],r=B.o%3;o.slice(r).concat(o.slice(0,r)).forEach(([s,t])=>K(s,()=>open(t,s)))}
 if(m==='sort'&&B.s<SORT.length){const s=SORT[B.s][0];K('✅ Fact',()=>sortTo(0),'Fact: '+s);K('💭 Not a fact',()=>sortTo(1),'Not a fact: '+s)}
 if(m==='stay'&&B.found<2)PAGES[B.pg%2][1].forEach((s,k)=>K(s,()=>stay(k),'Off topic: '+s));
 if(m==='label'&&B.lab.length<4)PARTS.forEach((_,k)=>{if(!B.lab.includes(k))K('Box '+(k+1),()=>label(k),'Put the label '+PARTS[B.lab.length]+' in box '+(k+1))});
 if(m==='build'&&B.page.length<5)CARDS.forEach(([s],k)=>{if(!B.page.includes(k))K(s,()=>place(k),'Add: '+s)})}
function down(p){const m=mode();if(m==='sort'&&B.s<SORT.length&&inR(p,scard())){B.drag={x:p.x,y:p.y};return true}
 if(m==='stay'){for(let k=0;k<4;k++)if(inR(p,row(k)))stay(k);return false}
 if(m==='label'&&B.lab.length<4&&p.y>A.H*.8){B.drag={x:p.x,y:p.y};return true}
 if(m==='label'){const lb=LB();for(let k=0;k<4;k++){const b=lbox(k);if(inR(p,{x:b.x,y:b.y,w:lb.w,h:lb.h}))label(k)}}return false}
function move(p){if(!B.drag)return;B.drag.x=p.x;B.drag.y=p.y;A.redraw()}
function up(p){const m=mode();if(!B.drag)return;
 if(m==='sort'){const bb=sbins();for(let k=0;k<2;k++)if(inR(p,bb[k]))return sortTo(k)}
 if(m==='label'){const lb=LB();for(let k=0;k<4;k++){const b=lbox(k);if(inR(p,{x:b.x-10,y:b.y-10,w:lb.w+20,h:lb.h+20}))return label(k)}}B.drag=null;A.redraw()}
const fin=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const t=++B.tok;fns.forEach((f,j)=>setTimeout(()=>{if(t===B.tok)f()},A.reduced()?j*30+30:(j+1)*ms))};
const reset=()=>{B.tok++;Object.assign(B,{want:()=>{},o:0,named:0,picked:'',s:0,bad:-1,pg:0,found:0,lab:[],page:[],drag:null,shake:0})};
const w0=()=>{};
const steps=[
{h:'Name the topic',p:'Information writing tells true facts. The first sentence names the topic. Pick the best first sentence.',
 predict:{q:'An information text starts with…',opts:['"Once upon a time…"','A sentence that names the topic'],ans:1},task:'Name 3 topics',
 show:()=>{steps[0].go();const o=()=>{const s=OPEN[B.o%3][1][0];open('ok',s[0])};play([o,w0,w0,o,w0,w0,o],330)},
 go:()=>{reset();say('What is this page about? Pick the first sentence.');pads();B.want=fin(0,()=>B.named>=3,'Start by naming the topic, so the reader knows what it is about.')}},
{h:'Fact or not?',p:'A fact is true. "I think" is a feeling. Drag each sentence to a box, or tap a button.',
 predict:{q:'"I think frogs are cute." Is that a fact?',opts:['Yes, it is about frogs','No, it is what I think'],ans:1},task:'Sort all 6',
 show:()=>{steps[1].go();play(SORT.map(s=>()=>sortTo(s[1]?0:1)),330)},
 go:()=>{reset();say('Fact, or not a fact?');pads();B.want=fin(1,()=>B.s>=SORT.length,'Information writing uses facts. Feelings and made-up things stay out.')}},
{h:'Stay on topic',p:'One sentence on each page is not about the topic. Tap it.',task:'Find 2 off-topic sentences',
 show:()=>{steps[2].go();play([()=>stay(PAGES[0][2]),w0,w0,()=>stay(PAGES[1][2])],330)},
 go:()=>{reset();say('A page about bees. Which sentence is not about bees?');pads();B.want=fin(2,()=>B.found>=2,'Every sentence should tell about the topic.')}},
{h:'Label the picture',p:'Labels name the parts of a picture. Drag each label to its box, or tap a box button.',task:'Label all 4 parts',
 show:()=>{steps[3].go();play([0,1,2,3].map(k=>()=>label(k)),330)},
 go:()=>{reset();say('A butterfly. Where does the word wing go?');pads();B.want=fin(3,()=>B.lab.length>=4,'Labels give facts too: a butterfly has wings, antennae, a body and legs.')}},
{h:'Build the page',p:'Put the page in order: heading, topic sentence, facts, then a closing sentence.',
 predict:{q:'How does an information text end?',opts:['"The end."','A sentence that sums it up'],ans:1},task:'Build the frog page',
 show:()=>{steps[4].go();play([0,1,2,3,4].map(k=>()=>place(k)),330)},
 go:()=>{reset();say('Build a page about frogs. What goes first?');pads();B.want=fin(4,()=>B.page.length>=5,'Heading, topic sentence, facts, closing sentence.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>B.want()});
const QS=[['Which is the best first sentence for a page about owls?',[['Owls are birds that hunt at night.','ok'],['Once upon a time an owl met a fox.','story'],['I went to the shop.','off']]],
 ['Which one is a fact?',[['Cows give milk.','ok'],['Cows are the best animals.','opinion'],['My cow can sing songs.','madeup']]],
 ['A page is about trains. Which sentence does not belong?',[['My sister likes cake.','ok'],['Trains run on tracks.','ontopic'],['Some trains carry people.','ontopic2']]],
 ['How should an information page end?',[['Now you know how trains work.','ok'],['The end.','end'],['Once upon a time.','start']]],
 ['Where does the heading go?',[['At the top','ok'],['At the bottom','bottom'],['In the middle of the facts','middle']]],
 ['A label on a picture of a dog says "tail". It should point to…',[['The tail','ok'],['The ear','ear'],['Anywhere on the dog','any']]]];
function why(t){let m='Name the topic, give true facts, stay on topic and end with a closing sentence.';
 if(t==='story')m='"Once upon a time" starts a story. Information names the topic first.';
 if(t==='off')m='The shop is not about owls. Start by naming the topic.';
 if(t==='opinion')m='"The best" is a feeling, not a fact. A fact is true for everyone.';
 if(t==='madeup')m='Cows can not really sing. Made-up things are not facts.';
 if(t==='ontopic')m='Trains run on tracks is about trains, so it belongs. Cake is off the topic.';
 if(t==='ontopic2')m='Some trains carry people is a train fact, so it belongs. Cake is off the topic.';
 if(t==='end')m='"The end." is for stories. Sum up the topic instead.';
 if(t==='start')m='"Once upon a time" starts a story, and it is not an ending.';
 if(t==='bottom')m='The heading names the topic, so it goes at the top.';
 if(t==='middle')m='The heading goes first, at the top, before the facts.';
 if(t==='ear')m='A label points to the part it names. "Tail" points to the tail.';
 if(t==='any')m='A label must point to its own part, or it gives the wrong fact.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const rw=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},rw,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){run1++;A.win()}else{run1=0;A.sound.miss()}fb.innerHTML=(good?'✓ Yes! In a row: '+run1+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}});
A.start()})})();
