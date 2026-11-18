/* Flagship – tragedy as a genre (16–18): sad vs tragic, the tragic arc, hamartia, Othello's turning points, and
   Aristotle's pity and fear meters. Every drag has a button twin. */
(()=>{
const EVENTS=[['A hiker is struck by lightning on a clear path.',0,'Nothing he chose caused it: pathos, not tragedy.'],
 ['Macbeth murders Duncan to take the crown, and the murder destroys him.',1,'His own choice, driven by ambition, causes his fall.'],
 ['A town is flooded after a freak storm.',0,'A disaster, but no hero\'s error caused it.'],
 ['Oedipus hunts the king\'s killer and discovers it is himself.',1,'His own search brings the terrible truth.'],
 ['An old dog dies peacefully in its sleep.',0,'Sad, but no flaw, reversal or recognition.'],
 ['Othello trusts Iago over his wife and kills her in jealousy.',1,'His credulity and jealousy turn his love into murder.']];
const PTS=['Exposition','Rising action','Climax','Falling action','Catastrophe'],PX=[.1,.3,.5,.7,.9],GOAL=[.7,.85,.95,.5,.08];
const HEROES=[['Macbeth','kills a sleeping king, his guest',0],['Othello','believes Iago\'s lies about Desdemona',1],['King Lear','banishes the one daughter who will not flatter him',2]];
const FLAWS=['Ambition','Jealousy','Pride','Bad luck'],FLAW_TRAY=[2,3,0,1];
const MOMENTS=[['Act 3','Othello accepts Iago\'s lie and vows revenge: his fortune turns.',0],['Act 5','Emilia exposes Iago; Othello sees what he has done.',1],['Act 5','Othello kills himself beside Desdemona.',2],['Audience','We leave shaken, our pity and fear released.',3]];
const TERMS=['Peripeteia','Anagnorisis','Catastrophe','Catharsis'],TERM_TRAY=[3,1,0,2];
const TERM_JOB=['Peripeteia is the reversal, when fortune swings the other way.','Anagnorisis is recognition: ignorance turns to knowledge.','Catastrophe is the final ruin, usually a death.','Catharsis happens in the audience: pity and fear released.'];
const TRAITS=[['Hero',['A villain','Wholly good','Good but flawed']],['Fall caused by',['Bad luck','Own error']],['Falls from',['Nowhere much','A great height']]];
VIS.reg('flagtragic',c=>{let A,box,qz,q=-1,run=0;const T={};
const part=()=>['swipe','arc','flaw','turn','meter','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
function txt(g,s,x,y,w,px,o){o=o||{};g.font=`${o.b||600} ${Math.round(px*(A.narrow?1:1.1))}px Georgia,serif`;g.fillStyle=o.c||A.col.tx;g.textAlign=o.a||'center';g.textBaseline='middle';
 const rows=[];let cur='';for(const w2 of s.split(' ')){const t2=cur?cur+' '+w2:w2;if(cur&&g.measureText(t2).width>w){rows.push(cur);cur=w2}else cur=t2}rows.push(cur);
 rows.forEach((r,i)=>g.fillText(r,x,y+(i-(rows.length-1)/2)*px*1.28))}
function chip(g,b,label,kind,px){const C=A.col,f={ok:C.gr,no:C.rd,hot:C.am,dim:C.mu}[kind]||C.vi;g.fillStyle=A.alpha(f,kind==='dim'?.06:.15);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();
 g.strokeStyle=kind==='dim'?C.mu:C.tx;g.lineWidth=kind==='hot'?3:1.8;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.stroke();if(label)txt(g,label,b.x+b.w/2,b.y+b.h/2,b.w-14,px||13)}
const mv=r=>({...r,x:T.hold.x-r.w/2,y:T.hold.y-r.h/2});
const hit=(p,b)=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h;
const evR=()=>({x:A.W*.12,y:A.H*.2,w:A.W*.76,h:A.H*.3});
const plot={l:()=>28,r:()=>A.W-14,t:()=>A.H*.14,b:()=>A.H*.66};
const ptXY=i=>({x:plot.l()+(plot.r()-plot.l())*PX[i],y:plot.b()-(plot.b()-plot.t())*T.v[i]});
const heroR=i=>({x:12,y:A.H*(.1+i*.155),w:A.W-24,h:A.H*.14});
const flawR=j=>{const w=(A.W-36)/2;return{x:12+(j%2)*(w+12),y:A.H*(.66+Math.floor(j/2)*.14),w,h:A.H*.11}};
const dotX=i=>A.W*(.14+i*.24);
const termR=j=>{const w=(A.W-36)/2;return{x:12+(j%2)*(w+12),y:A.H*(.68+Math.floor(j/2)*.14),w,h:A.H*.11}};
function paint(A){const{ctx:g,W,H,col:C}=A,pt=part();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.06:.4);g.fillRect(0,0,W,H);
 if(pt==='quiz'){g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();[[.08,.6],[.3,.4],[.5,.25],[.7,.55],[.92,.85]].forEach(([x,y],i)=>i?g.lineTo(W*x,H*y):g.moveTo(W*x,H*y));g.stroke();txt(g,'Rise, reversal, recognition, ruin.',W/2,H*.1,W-20,16,{b:700});return}
 if(pt==='swipe'){txt(g,T.i<EVENTS.length?`Sad, or tragic? (${T.i+1} of ${EVENTS.length})`:'All six judged.',W/2,H*.06,W-20,15,{b:700});
  txt(g,'◀ Just sad',W*.2,H*.13,W*.4,13,{b:700,c:C.tx});txt(g,'Tragic ▶',W*.8,H*.13,W*.4,13,{b:700,c:C.tx});
  if(T.i<EVENTS.length){const r=evR(),dx=T.hold&&T.hold.x!=null?T.hold.x-T.hold.sx:0;g.save();g.translate(r.x+r.w/2+dx,r.y+r.h/2);g.rotate(dx/900);chip(g,{x:-r.w/2,y:-r.h/2,w:r.w,h:r.h},EVENTS[T.i][0],T.bad===1?'no':'hot',15);g.restore()}
  if(T.msg)txt(g,T.msg,W/2,H*.6,W-28,13,{b:600,c:T.msgOk?C.gr:C.rd});
  const sad=T.done.filter(i=>!EVENTS[i][1]).length,tr=T.done.length-sad;txt(g,`Just sad: ${sad}   ·   Tragic: ${tr}`,W/2,H*.9,W-20,14,{b:700});return A.fx.draw(g)}
 if(pt==='arc'){txt(g,T.verdict||'Shape the hero\'s fortune over the play.',W/2,H*.05,W-20,14,{b:700,c:T.good?C.gr:C.tx});
  g.strokeStyle=C.mu;g.lineWidth=1.5;g.beginPath();g.moveTo(plot.l(),plot.t());g.lineTo(plot.l(),plot.b());g.lineTo(plot.r(),plot.b());g.stroke();
  g.save();g.translate(12,(plot.t()+plot.b())/2);g.rotate(-Math.PI/2);txt(g,'Fortune',0,0,120,11,{b:700});g.restore();
  g.strokeStyle=T.good?C.gr:C.vi;g.lineWidth=4;g.beginPath();PTS.forEach((p,i)=>{const q2=ptXY(i);i?g.lineTo(q2.x,q2.y):g.moveTo(q2.x,q2.y)});g.stroke();
  PTS.forEach((p,i)=>{const q2=ptXY(i);g.fillStyle=i===T.sel?C.am:C.pn;g.beginPath();g.arc(q2.x,q2.y,i===T.sel?13:10,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2.5;g.stroke();
   txt(g,p,q2.x,plot.b()+18+(i%2)*26,(plot.r()-plot.l())*.26,10.5,{b:i===T.sel?800:500})});
  txt(g,`Selected: ${PTS[T.sel]}`,W/2,H*.86,W-20,13,{b:700});return A.fx.draw(g)}
 if(pt==='flaw'){txt(g,'Pin the hamartia on each hero.',W/2,H*.05,W-20,14,{b:700});const nx=T.pinned.length;
  HEROES.forEach(([n,deed,f],i)=>{const r=heroR(i);chip(g,r,'',i<nx?'ok':i===nx?'hot':'dim');txt(g,n,r.x+12,r.y+r.h*.3,r.w-24,14,{b:800,a:'left'});txt(g,i<nx?`${FLAWS[f]} → ${deed}`:deed,r.x+12,r.y+r.h*.68,r.w-24,12,{a:'left'})});
  FLAW_TRAY.forEach((f,j)=>{if(T.pinned.includes(f))return;let r=flawR(j);if(T.hold&&T.hold.f===f&&T.hold.x!=null)r=mv(r);chip(g,r,FLAWS[f],T.bad===f?'no':'',14)});
  if(T.msg)txt(g,T.msg,W/2,H*.605,W-24,12,{c:T.msgOk?C.gr:C.rd});return A.fx.draw(g)}
 if(pt==='turn'){const k=T.k;txt(g,'Othello: name each turn.',W/2,H*.05,W-20,14,{b:700});
  g.strokeStyle=C.mu;g.lineWidth=3;g.beginPath();g.moveTo(dotX(0),H*.2);g.lineTo(dotX(3),H*.2);g.stroke();
  MOMENTS.forEach(([act],i)=>{g.fillStyle=i<k?C.gr:i===k?C.am:C.pn;g.beginPath();g.arc(dotX(i),H*.2,i===k?14:10,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
   txt(g,act,dotX(i),H*.12,W*.22,11,{b:700});if(i<k)txt(g,TERMS[i],dotX(i),H*.28,W*.24,10.5,{b:700,c:C.tx})});
  if(k<4)chip(g,{x:12,y:H*.34,w:W-24,h:H*.2},MOMENTS[k][1],'hot',14);else txt(g,'Reversal, recognition, catastrophe, then catharsis in us.',W/2,H*.44,W-28,14,{b:700,c:C.gr});
  if(T.msg)txt(g,T.msg,W/2,H*.6,W-24,12,{c:C.rd});
  TERM_TRAY.forEach((t,j)=>{if(t<k)return;let r=termR(j);if(T.hold&&T.hold.t===t&&T.hold.x!=null)r=mv(r);chip(g,r,TERMS[t],T.bad===t?'no':'',14)});return A.fx.draw(g)}
 if(pt==='meter'){const[pi,fe]=meters();txt(g,T.note||'Build the hero who moves us most.',W/2,H*.05,W-20,13,{b:700,c:pi>=.8&&fe>=.8?C.gr:C.tx});
  const cliff=T.t[2]?.42:.12,cx=W*.26,base=H*.82;g.fillStyle=A.alpha(C.mu,.35);g.fillRect(cx-W*.16,base-H*cliff,W*.18,H*cliff);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(cx-W*.16,base-H*cliff,W*.18,H*cliff);
  g.font=`${Math.round(H*.07)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='bottom';g.fillStyle='#000';g.fillText(['🦹','😇','🤴'][T.t[0]],cx-W*.07,base-H*cliff);
  txt(g,TRAITS.map((tr,i)=>tr[1][T.t[i]]).join(' · '),W*.26,H*.9,W*.5,11,{b:600});
  [['Pity',pi],['Fear',fe]].forEach(([n,v],i)=>{const x=W*(.6+i*.2),h=H*.5,y=H*.2;g.fillStyle=A.alpha(C.mu,.15);g.fillRect(x,y,W*.12,h);g.fillStyle=v>=.8?C.gr:C.vi;g.fillRect(x,y+h*(1-v),W*.12,h*v);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,W*.12,h);
   g.setLineDash([5,4]);g.beginPath();g.moveTo(x-4,y+h*.2);g.lineTo(x+W*.12+4,y+h*.2);g.stroke();g.setLineDash([]);txt(g,n,x+W*.06,y+h+16,W*.18,13,{b:800});txt(g,Math.round(v*100)+'%',x+W*.06,y-12,W*.18,12,{b:700})});return A.fx.draw(g)}}
/* pity and fear for the current hero, after Aristotle (Poetics 13) */
function meters(){const[h,cause,height]=T.t;let pi=[0,.3,.45][h],fe=[.05,.2,.45][h];if(cause){pi+=.15;fe+=.3}else{pi+=.05;fe+=.05}if(height){pi+=.25;fe+=.2}return[Math.min(1,pi),Math.min(1,fe)]}
const unflash=()=>setTimeout(()=>{T.bad=-1;A.redraw()},A.reduced()?10:900);
function judge(side){if(part()!=='swipe'||T.i>=EVENTS.length)return;const[e,isTr,why]=EVENTS[T.i];T.hold=null;
 if(side!==isTr){T.bad=1;T.msg=(isTr?'Tragic: ':'Just sad: ')+why;T.msgOk=0;A.sound.miss();tell(T.msg);setTimeout(()=>{T.bad=0;A.redraw()},A.reduced()?10:700);return A.redraw()}
 T.done.push(T.i);T.i++;T.msg=why;T.msgOk=1;T.bad=0;A.sound.whoosh();tell(why);A.redraw();keys();T.tick()}
function nudge(d){if(part()!=='arc')return;T.v[T.sel]=Math.max(0,Math.min(1,Math.round((T.v[T.sel]+d)*20)/20));T.verdict='';T.good=0;A.redraw()}
function pick(d){if(part()!=='arc')return;T.sel=(T.sel+d+5)%5;tell(`${PTS[T.sel]} selected, fortune ${Math.round(T.v[T.sel]*100)}%.`);A.redraw()}
function test(){if(part()!=='arc')return;const v=T.v;let m='';
 if(v[0]<.55)m='A tragic hero starts high: status, success, respect. Raise the exposition.';
 else if(v[2]<Math.max(v[0],v[1],v[3],v[4])||v[2]<.75)m='Fortune should peak at the climax, just before the reversal. Raise the climax.';
 else if(v[3]>v[2]-.2)m='After the reversal the fall is steep. Lower the falling action.';
 else if(v[4]>.2||v[4]>v[0]-.4)m='The catastrophe ends far below where the hero began. Lower it.';
 if(m){T.verdict=m;T.good=0;A.sound.miss();tell(m);return A.redraw()}
 T.verdict='Tragic arc: high, higher, then a steep fall to ruin.';T.good=1;A.sound.pop();tell(T.verdict);A.redraw();T.tick()}
function setArc(){T.v=GOAL.slice();T.sel=2;A.redraw()}
function pin(f){if(part()!=='flaw'||T.pinned.includes(f)||T.pinned.length>=3)return;const[n,deed,want]=HEROES[T.pinned.length];
 if(f!==want){T.bad=f;T.msgOk=0;T.msg=f===3?'Bad luck is not hamartia: the fall must come from the hero\'s own error.':`${FLAWS[f]} is not ${n}'s flaw. Ask why he ${deed}.`;A.sound.miss();tell(T.msg);unflash();return A.redraw()}
 T.pinned.push(f);T.msgOk=1;T.msg=`${n}: ${FLAWS[f].toLowerCase()} drives the deed. He ${deed}.`;A.sound.pop();tell(T.msg);A.redraw();keys();T.tick()}
function name(t){if(part()!=='turn'||T.k>=4||t<T.k)return;
 if(t!==T.k){T.bad=t;T.msg=TERM_JOB[t];A.sound.miss();tell(T.msg);unflash();return A.redraw()}
 T.k++;T.msg='';A.sound.pop();tell(`${TERMS[t]}. ${TERM_JOB[t]}`);A.redraw();keys();T.tick()}
function flip(i){if(part()!=='meter')return;T.t[i]=(T.t[i]+1)%TRAITS[i][1].length;const[pi,fe]=meters(),h=T.t[0];
 T.note=h===0?'A villain\'s fall feels deserved.':h===1?'A perfect hero ruined is shocking, not tragic.':!T.t[1]?'Bad luck is sad. His own error makes us fear.':!T.t[2]?'Tragic heroes fall from a height.':'Like us, but greater, undone by an error: pity and fear.';
 tell(`${TRAITS[i][0]}: ${TRAITS[i][1][T.t[i]]}. Pity ${Math.round(pi*100)}%, fear ${Math.round(fe*100)}%. ${T.note}`);A.sound.pop();A.redraw();keys();T.tick()}
function keys(){if(!box)return;box.innerHTML='';const pt=part(),K=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},box,t);b.onclick=fn};
 if(pt==='swipe'&&T.i<EVENTS.length){K('◀ Just sad',()=>judge(0),'Just sad');K('Tragic ▶',()=>judge(1),'Tragic')}
 if(pt==='arc'){K('◀ Point',()=>pick(-1),'Previous point');K('Point ▶',()=>pick(1),'Next point');K('Raise',()=>nudge(.1),'Raise selected point');K('Lower',()=>nudge(-.1),'Lower selected point');K('Test my arc',test,'Test the arc')}
 if(pt==='flaw'&&T.pinned.length<3)FLAW_TRAY.forEach(f=>{if(!T.pinned.includes(f))K(FLAWS[f],()=>pin(f),`Pin ${FLAWS[f]} on ${HEROES[T.pinned.length][0]}`)});
 if(pt==='turn'&&T.k<4)TERM_TRAY.forEach(t=>{if(t>=T.k)K(TERMS[t],()=>name(t),`Name this moment ${TERMS[t]}`)});
 if(pt==='meter')TRAITS.forEach(([n,o],i)=>K(`${n}: ${o[T.t[i]]}`,()=>flip(i),`Change ${n}, now ${o[T.t[i]]}`))}
function grab(p){const pt=part();
 if(pt==='swipe'&&T.i<EVENTS.length&&hit(p,evR())){T.hold={sx:p.x,sy:p.y,x:null,y:null};return true}
 if(pt==='arc'){let best=-1,bd=40;PTS.forEach((n,i)=>{const d=Math.hypot(p.x-ptXY(i).x,p.y-ptXY(i).y);if(d<bd){bd=d;best=i}});if(best>=0){T.sel=best;T.hold={arc:1,sx:p.x,sy:p.y,x:null,y:null};A.redraw();return true}return false}
 if(pt==='flaw'){const f=FLAW_TRAY.find((f,j)=>!T.pinned.includes(f)&&hit(p,flawR(j)));if(f!=null){T.hold={f,sx:p.x,sy:p.y,x:null,y:null};return true}return false}
 if(pt==='turn'){const t=TERM_TRAY.find((t,j)=>t>=T.k&&hit(p,termR(j)));if(t!=null){T.hold={t,sx:p.x,sy:p.y,x:null,y:null};return true}return false}
 return false}
function drag(p){const h=T.hold;if(!h)return;if(h.x==null&&Math.hypot(p.x-h.sx,p.y-h.sy)<7)return;h.x=p.x;h.y=p.y;
 if(h.arc){T.v[T.sel]=Math.max(0,Math.min(1,(plot.b()-p.y)/(plot.b()-plot.t())));T.verdict='';T.good=0}A.redraw()}
function drop(p){const h=T.hold,pt=part();T.hold=null;if(!h)return;
 if(pt==='swipe'){const dx=h.x==null?0:p.x-h.sx;if(Math.abs(dx)>A.W*.18)judge(dx>0?1:0);else{tell('Swipe left for just sad, right for tragic.');A.redraw()}}
 if(pt==='arc'){T.v[T.sel]=Math.round(T.v[T.sel]*20)/20;tell(`${PTS[T.sel]}: fortune ${Math.round(T.v[T.sel]*100)}%.`);A.redraw()}
 if(pt==='flaw'){const tgt=HEROES.findIndex((x,i)=>hit(p,heroR(i)));if(h.x==null||tgt===T.pinned.length)pin(h.f);else A.redraw()}
 if(pt==='turn'){if(h.x==null||p.y<A.H*.58)name(h.t);else A.redraw()}}
function clear(){const v=(T.v0||0)+1;for(const k in T)delete T[k];Object.assign(T,{v0:v,tick:()=>{},i:0,done:[],msg:'',msgOk:0,bad:-1,hold:null,v:[.5,.5,.5,.5,.5],sel:0,verdict:'',good:0,pinned:[],k:0,t:[0,0,0],note:''})}
function seq(fs,ms){const v=++T.v0;fs.forEach((f,j)=>setTimeout(()=>{if(T.v0===v)f()},A.reduced()?30*(j+1):ms*(j+1)))}
const finish=(n,ok,line)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(line+A.reveal(n))};
const steps=[
{h:'Sad or tragic?',p:'Not every sad story is a tragedy. Does the hero\'s own choice cause the fall? Swipe each event.',predict:{q:'A hiker is killed by lightning. Is that a tragedy in Aristotle\'s sense?',opts:['No: nothing he chose caused it','Yes: any death is tragic'],ans:0},task:'Judge all 6 events',
 show:()=>{steps[0].go();seq(EVENTS.map(e=>()=>judge(e[1])),380)},
 go:()=>{clear();tell(`Sad, or tragic? ${EVENTS[0][0]}`);keys();T.tick=finish(0,()=>T.i>=EVENTS.length,'Tragedy is suffering the hero helps to cause, not random misfortune.')}},
{h:'The tragic arc',p:'Drag the five points to show the hero\'s fortune through the play, then test your arc.',predict:{q:'Where does a tragic hero\'s fortune end?',opts:['Far below where it began','Back where it started','Higher than at the start'],ans:0},task:'Make an arc that passes the test',
 show:()=>{steps[1].go();seq([setArc,test],600)},
 go:()=>{clear();tell('Drag the points, or use Raise and Lower.');keys();T.tick=finish(1,()=>T.good,'High status, a peak, a reversal, then a steep fall to catastrophe.')}},
{h:'Hamartia',p:'Hamartia is the hero\'s error or flaw. Pin the right one on each hero.',predict:{q:'Is hamartia the same as being evil?',opts:['No: it is an error in a mostly admirable person','Yes: tragic heroes are villains'],ans:0},task:'Pin a flaw on all 3 heroes',
 show:()=>{steps[2].go();seq([0,1,2].map(f=>()=>pin(f)),450)},
 go:()=>{clear();tell('Macbeth kills a sleeping king, his guest. Which flaw drives him?');keys();T.tick=finish(2,()=>T.pinned.length>=3,'Each fall grows from a flaw inside a great man.')}},
{h:'Reversal and recognition',p:'Aristotle named the turning points. Put each term on its moment in Othello.',task:'Name all 4 moments',
 show:()=>{steps[3].go();seq([0,1,2,3].map(t=>()=>name(t)),450)},
 go:()=>{clear();tell(`Act 3. ${MOMENTS[0][1]} Which term fits?`);keys();T.tick=finish(3,()=>T.k>=4,'Reversal and recognition drive the plot; catharsis happens in us.')}},
{h:'Pity and fear',p:'Tragedy should stir pity and fear. Change the hero until both meters pass the line.',predict:{q:'Which hero moves an audience most?',opts:['A good person with one fatal flaw','A pure villain','A perfect saint'],ans:0},task:'Fill both meters past the line',
 show:()=>{steps[4].go();seq([()=>flip(0),()=>flip(0),()=>flip(1),()=>flip(2)],450)},
 go:()=>{clear();tell('Start: a villain, bad luck, a small fall.');keys();T.tick=finish(4,()=>{const[a,b]=meters();return a>=.8&&b>=.8},'Pity for undeserved suffering; fear, as he is like us.')}},
{h:'Challenge',p:'',go:()=>{clear();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.tick()});
const POOL=[['A character dies in a car crash on the way home. In Aristotle\'s sense, is this a tragedy?',[['No: it is sad, but no choice or flaw of theirs causes it','ok'],['Yes: any death is tragic','anydeath'],['Yes: the ending is unhappy','ending']]],
 ['What is hamartia?',[['The error or flaw that leads to the hero\'s fall','ok'],['The villain who destroys the hero','villain'],['The moment the audience weeps','cath']]],
 ['Oedipus learns that the man he killed was his father. This is …',[['Anagnorisis: a change from ignorance to knowledge','ok'],['Catharsis','cath'],['Hamartia','mixup']]],
 ['Why does Aristotle reject a wholly evil hero?',[['Their fall feels deserved, so it stirs no pity or fear','ok'],['Villains are boring to watch','taste'],['Villains cannot be of high status','status']]],
 ['Miller\'s Death of a Salesman makes a travelling salesman its hero. Which idea does it challenge?',[['That a tragic hero must be of high status','ok'],['That tragedy needs a death','ending'],['That plays need dialogue','taste']]],
 ['Where is the peripeteia in Othello best placed?',[['Act 3, when Othello accepts Iago\'s lies','ok'],['Act 1, at the wedding','mixup'],['After the play, in the audience','cath']]]];
function fix(tag){let m='Ask what drives the fall.';
 if(tag==='anydeath')m='Death alone is sad, not tragic. Tragedy needs the hero\'s own choice or flaw to drive the fall.';
 if(tag==='ending')m='An unhappy ending is not enough. Look for a fall caused by the hero\'s own error, with reversal and recognition.';
 if(tag==='villain')m='Hamartia is the hero\'s own error, even if Iago exploits it.';
 if(tag==='cath')m='Catharsis is the audience\'s release of pity and fear, not a moment in the plot.';
 if(tag==='mixup')m='Match term to job: hamartia is the flaw, peripeteia the reversal, anagnorisis the recognition.';
 if(tag==='taste')m='Not taste: Aristotle asked which hero stirs pity and fear.';
 if(tag==='status')m='Villains can be kings (Claudius). A deserved fall stirs no pity.';
 return m}
function nextQ(){q++;const[s,ch]=POOL[q%POOL.length],sh=(q+1)%3;qz.innerHTML=`<p><b>${s}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pk=qz.querySelector('.fl-pick');ch.slice(sh).concat(ch.slice(0,sh)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},pk,o);b.onclick=()=>score(tag)});tell('Challenge: '+s);A.redraw()}
function score(tag){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct. ${run} in a row.`:'✗ '+fix(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ}
A=FK.shell(c,{steps,ratio:.62,tall:1.4,draw:paint,onStep:A=>{qz.hidden=A.step!==5;box.hidden=A.step===5;keys()},
 init:A=>{const wr=c.el('div',{class:'fl-below'},A.below);box=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},wr);qz=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down:grab,move:drag,up:drop});keys()}});
A.start()})})();
