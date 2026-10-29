/* Flagship – identifying the reasons behind a speaker's points (ages 9–10): sort each line of a short talk into point,
   reason or evidence; tap the signal words that flag a reason or evidence; drag claims into "supports the point" or
   "off the point"; judge reasoning as strong or name its weakness (too few examples, just an opinion, does not follow);
   and pick the follow-up question that tests the weak spot. Every drag also has a button. */
(()=>{const mn=Math.min;
const TALK=[['We should turn the empty corner of the field into a school garden.',0],['First, a garden would help us learn science outside.',1],
 ['For example, in Year 3 we grew beans and measured them every day.',2],['Second, it would give the kitchen fresh food.',1],
 ['Our cook says one bed can grow about 20 lettuces a term.',2]];
const TAGS=['Point','Reason','Evidence'],TAGW=[
 ['This is what Sam wants us to agree with. That makes it the main point.','It tells us what Sam wants. That is the point. Reasons explain why.','It is Sam\'s main idea, not a fact or example. It is the point.'],
 ['This line explains why we should do it. That is a reason.','It says why, so it is a reason. It is not a fact or example yet.','It answers "why?", so it is a reason, not evidence.'],
 ['This is an example or a fact. Evidence backs up a reason.','It gives a real example or number. That makes it evidence.','A real example or a fact is evidence. It supports a reason.']];
const SIG=[[['We','need','more','benches','because','many','of','us','sit','on','the','floor.'],4,'"because" brings in a reason.'],
 [['For example,','twelve','children','ate','lunch','on','the','steps','today.'],0,'"For example" brings in evidence.'],
 [['According to','the','nurse,','sun','cream','stops','sunburn.'],0,'"According to" tells you where the evidence comes from.'],
 [['Bikes','make','no','smoke,','so','more','people','should','cycle.'],4,'"so" shows the point that the reason leads to.']];
const REL=[['The dinner queue takes 15 minutes.',0,'Yes: a long queue eats up lunch time.'],['I really love lunch.',1,'It is about lunch, but loving lunch does not show we need more time.'],
 ['Many of us finish eating with five minutes left to play.',0,'Yes: it shows the break is too short.'],['My cousin\'s school has a swimming pool.',1,'A pool has nothing to do with the length of the break.'],
 ['Children who play at lunch focus better after.',0,'Yes: it gives a benefit of more time to play.'],['Pizza is the best lunch.',1,'An opinion about food. It says nothing about time.']];
const LOGIC=[['In our survey, 180 of 200 pupils said the queue is too long. So the queue needs fixing.',0],['Two of my friends were bored in assembly. So everyone finds assembly boring.',1],
 ['Blue is the best colour. So all the doors should be blue.',2],['We won the football match. So we should have a longer lunch.',3]];
const LOGW=['Strong','Too few examples','Just an opinion','Does not follow'],LOGF=['Lots of people asked, and it fits the claim. Strong reasoning.',
 'Two friends cannot speak for everyone. Too few examples.','"Best colour" is an opinion, not evidence.','Winning a match has nothing to do with lunch. It does not follow.'];
const ASK=[['"Our team lost because the referee was unfair."',[['Are there other reasons we lost?',1],['Who was the referee?',0],['Was it a fun game?',0]],'It tests the reason: maybe the other team just played better.'],
 ['"Most children want a pet day."',[['How do you know most children want it?',1],['What pet do you have?',0],['Can you say that louder?',0]],'It asks for the evidence behind "most".'],
 ['"Phones make children sleep less."',[['What evidence supports that?',1],['Do you have a phone?',0],['Do you like phones?',0]],'It asks the speaker to show the evidence.']];
VIS.reg('flagreason',c=>{let A,pad,chal,q=-1,gen=0;
const S={i:0,bad:-1,held:null,want:()=>{},n:[0,0,0]};
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const view=()=>['tag','sig','rel','logic','ask','quiz'][A.step];
const X=f=>f*A.W,Y=f=>f*A.H,big=n=>A.narrow?n:n+3;
function lines(x,s,w,px){x.font=px;const out=[];let cur='';s.split(' ').forEach(wd=>{const t=cur?cur+' '+wd:wd;if(x.measureText(t).width>w&&cur){out.push(cur);cur=wd}else cur=t});if(cur)out.push(cur);return out}
function para(x,s,cx,cy,w,n,col,wt){const px=`${wt||700} ${big(n)}px system-ui,sans-serif`,L=lines(x,s,w,px),lh=big(n)*1.3;x.font=px;x.fillStyle=col||A.col.tx;x.textAlign='center';x.textBaseline='middle';
 L.forEach((l,k)=>x.fillText(l,cx,cy+(k-(L.length-1)/2)*lh));return L.length*lh}
const head=(x,s)=>para(x,s,A.W/2,Y(.07),A.W-20,14,A.col.tx,800);
const DATA={tag:TALK,rel:REL,logic:LOGIC,ask:ASK,sig:SIG};
const zonesFor=v=>v==='tag'?TAGS:v==='rel'?['✓ Supports the point','✗ Off the point']:v==='logic'?LOGW:v==='ask'?ASK[mn(S.i,2)][1].map(o=>o[0]):[];
function zone(i,n){const v=view();if(v==='ask'){const h=Y(.15);return{x:10,y:Y(.44)+i*(h+8),w:A.W-20,h}}
 if(n===4){const w=(A.W-30)/2,h=Y(.17);return{x:10+(i%2)*(w+10),y:Y(.6)+Math.floor(i/2)*(h+8),w,h}}const w=(A.W-10*(n+1))/n;return{x:10+i*(w+10),y:Y(.68),w,h:Y(.27)}}
const card=()=>({x:16,y:Y(.17),w:A.W-32,h:Y(view()==='ask'?.2:.36)});
function bubble(x,r,s,col){const C=A.col;x.fillStyle=A.alpha(col,.16);A.paint.rrect(r.x,r.y,r.w,r.h,16);x.fill();x.strokeStyle=col;x.lineWidth=2.5;x.stroke();para(x,s,r.x+r.w/2,r.y+r.h/2,r.w-24,15,C.tx,700)}
function drawZones(x){const C=A.col,Z=zonesFor(view());Z.forEach((t,i)=>{const r=zone(i,Z.length),b=S.bad===i;x.fillStyle=A.alpha(b?C.rd:C.vi,b?.2:.12);A.paint.rrect(r.x,r.y,r.w,r.h,14);x.fill();x.strokeStyle=b?C.rd:C.vi;x.lineWidth=b?3:1.5;x.stroke();
 para(x,view()==='tag'?`${t} (${S.n[i]})`:t,r.x+r.w/2,r.y+r.h/2,r.w-14,view()==='ask'?14:13,C.tx,800)})}
function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.3);x.fillRect(0,0,W,H);
 if(v==='quiz'){para(x,'Point → reason → evidence. Does it really support the point?',W/2,H/2,W-40,17,C.tx,800);return}
 const D=DATA[v],end=S.i>=D.length;
 if(v==='sig'){if(end){para(x,'Signal words: because, for example, according to, so.',W/2,H*.45,W-40,16,C.gr,800);return}
  head(x,`Tap the signal word (${S.i+1} of ${D.length})`);const [ws]=D[S.i];chips().forEach((r,k)=>{const b=S.bad===k;x.fillStyle=A.alpha(b?C.rd:C.cy,b?.22:.12);A.paint.rrect(r.x,r.y,r.w,r.h,10);x.fill();x.strokeStyle=b?C.rd:C.cy;x.lineWidth=b?3:1.5;x.stroke();
  x.font=`700 ${big(15)}px system-ui,sans-serif`;x.fillStyle=C.tx;x.textAlign='center';x.textBaseline='middle';x.fillText(ws[k],r.x+r.w/2,r.y+r.h/2)});return}
 const top={tag:`Sam's talk to the school council. Line ${mn(S.i+1,5)} of 5`,rel:'Point: "We need a longer lunch break."',logic:'Strong reasoning, or what is wrong?',ask:'Pick the question that tests the reasoning'}[v];head(x,top);
 if(end){para(x,{tag:'1 point, 2 reasons, each backed by evidence.',rel:'Only claims about time support this point.',logic:'Check every "so": does it really follow?',ask:'Good questions ask for evidence or other reasons.'}[v],W/2,H*.4,W-40,16,C.gr,800)}
 else{const r=card(),s=v==='ask'?D[S.i][0]:D[S.i][0];let p=r;if(S.held)p={...r,x:S.held.x-r.w/2,y:S.held.y-r.h/2};bubble(x,p,s,C.or)}
 if(!end)drawZones(x);A.fx.draw(x)}
function chips(){const ws=SIG[mn(S.i,SIG.length-1)][0],x=A.ctx,out=[];x.font=`700 ${big(15)}px system-ui,sans-serif`;let px=12,py=Y(.24);const h=big(15)+22;
 ws.forEach(w=>{const wd=x.measureText(w).width+22;if(px+wd>A.W-12){px=12;py+=h+10}out.push({x:px,y:py,w:wd,h});px+=wd+8});return out}
const bad=(i,t)=>{S.bad=i;A.sound.miss();tell(t);A.redraw()};
const good=t=>{S.bad=-1;S.i++;A.sound.pop();tell(t);pads();A.redraw();S.want()};
function choose(i){const v=view(),D=DATA[v];if(S.i>=D.length)return;const it=D[S.i];S.held=null;
 if(v==='tag'){if(i!==it[1])return bad(i,TAGW[it[1]][i]);S.n[i]++;return good(`${TAGS[i]}. ${TAGW[it[1]][0]}`)}
 if(v==='rel'){if(i!==it[1])return bad(i,(i===0?'Look again. ':'')+it[2]);return good(it[2])}
 if(v==='logic'){if(i!==it[1])return bad(i,i===0?'Look at the evidence: is it enough, and is it a fact? '+LOGF[it[1]]:`Not "${LOGW[i]}". `+LOGF[it[1]]);return good(LOGF[i])}
 if(v==='ask'){const o=it[1][i];if(!o[1])return bad(i,'That question does not test the reason or the evidence. '+it[2]);return good(it[2])}}
function tapWord(k){if(S.i>=SIG.length)return;const it=SIG[S.i];if(k!==it[1])return bad(k,`"${it[0][k].replace(/[,.]/g,'')}" does not flag a reason or evidence. Look for a joining word or a source.`);good(it[2])}
function pads(){if(!pad)return;pad.innerHTML='';const v=view(),B=(t,f,al)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);b.onclick=f};
 if(v==='sig'&&S.i<SIG.length)SIG[S.i][0].forEach((w,k)=>B(w,()=>tapWord(k)));
 else if(DATA[v]&&S.i<DATA[v].length)zonesFor(v).forEach((t,i)=>B(t,()=>choose(i)))}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fs,ms)=>{const g=++gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===gen)f()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{gen++;S.want=()=>{};S.held=null;S.i=0;S.bad=-1;S.n=[0,0,0]};
const go=(n,txt,end)=>()=>{reset();tell(txt);pads();A.redraw();S.want=fin(n,()=>S.i>=DATA[view()].length,end)};
const steps=[
 {h:'Point, reason, evidence',p:'A point is what the speaker wants you to agree with. A reason says why. Evidence is a fact or example that backs up a reason. Drag each line to its box.',
  predict:{q:'"For example, in Year 3 we grew beans and measured them." Is this…',opts:['A reason','Evidence','The main point'],ans:1},task:'Sort all 5 lines of the talk',
  show:()=>{steps[0].go();play(TALK.map(t=>()=>choose(t[1])),600)},go:go(0,'Line 1: point, reason or evidence?','A good talk: one point, reasons that say why, and evidence for each reason.')},
 {h:'Signal words',p:'Speakers use signal words to show what is coming. Tap the word that brings in a reason or evidence.',task:'Find 4 signal words',
  show:()=>{steps[1].go();play(SIG.map(s=>()=>tapWord(s[1])),600)},go:go(1,'Tap the signal word.','Listen for because, for example, according to and so.')},
 {h:'Does it support it?',p:'A reason must be about the point. A true sentence on the same topic can still be off the point. Drag each claim.',
  predict:{q:'Point: "We need a longer lunch break." Does "I really love lunch" support it?',opts:['Yes, it is about lunch','No, it is off the point'],ans:1},task:'Sort all 6 claims',
  show:()=>{steps[2].go();play(REL.map(r=>()=>choose(r[1])),550)},go:go(2,'Does it support the point?','Relevant means it helps show the point is true, not just that it shares a word.')},
 {h:'Strong or weak?',p:'Check the "so". Is there enough evidence, is it a fact, and does the point really follow? Drag each argument to a box.',
  predict:{q:'"Two of my friends were bored, so everyone finds assembly boring." This is…',opts:['Strong: it has a reason','Weak: too few examples'],ans:1},task:'Judge all 4 arguments',
  show:()=>{steps[3].go();play(LOGIC.map(l=>()=>choose(l[1])),600)},go:go(3,'Strong, or what is wrong?','Weak reasoning: too few examples, an opinion used as a fact, or a point that does not follow.')},
 {h:'Ask about it',p:'A good listener asks a follow-up question that tests the reason or the evidence. Tap the best question.',task:'Pick 3 good questions',
  show:()=>{steps[4].go();play(ASK.map(a=>()=>choose(a[1].findIndex(o=>o[1]))),600)},go:go(4,'Which question tests the reasoning?','Ask: "What evidence supports that?" or "Are there other explanations?"')},
 {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QZ=[['"We should ban homework because children need time to play." What is the reason?',[['Children need time to play','ok'],['We should ban homework','point'],['Homework','word']]],
 ['"Dogs make good pets. For example, they can learn over 100 words." Which part is evidence?',[['They can learn over 100 words','ok'],['Dogs make good pets','point'],['For example','signal']]],
 ['Point: "Our school needs more bike racks." Which reason supports it?',[['The racks are full by 8:30 every day','ok'],['Bikes come in many colours','topic'],['I got a new bike','me']]],
 ['"My sister hates maths, so all girls hate maths." What is wrong?',[['Too few examples','ok'],['Nothing: it has a reason','has'],['It has no point','nopt']]],
 ['A speaker says sweets cause tooth decay. Which question tests the evidence?',[['What evidence supports that?','ok'],['Do you like sweets?','like'],['Can you repeat that?','repeat']]]];
let stars=0;
function quiz(){q++;const[s,o]=QZ[q%QZ.length],r=q%3;chal.innerHTML=`<p><b>${s}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');o.slice(r).concat(o.slice(0,r)).forEach(([t,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,t);b.onclick=()=>mark(tag)});tell('Challenge: '+s);A.redraw()}
function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
 switch(tag){case 'ok':m='Yes. You found how the argument is built.';break;
  case 'point':m='That is the point: what the speaker wants. The reason or evidence comes after it.';break;
  case 'word':m='One word is not a reason. A reason is a whole idea that answers "why?".';break;
  case 'signal':m='"For example" is the signal word. The evidence is the fact that comes after it.';break;
  case 'topic':m='It is about bikes, but colours do not show we need more racks. Off the point.';break;
  case 'me':m='One new bike does not show the racks are full. Look for evidence about the racks.';break;
  case 'has':m='Having a "so" is not enough. One sister cannot speak for all girls.';break;
  case 'nopt':m='There is a point: "all girls hate maths". The problem is the evidence behind it.';break;
  case 'like':m='Liking sweets is not about the evidence. Ask how the speaker knows.';break;
  default:m='Repeating does not test it. Ask for the evidence or another explanation.'}
 const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const v=view();S.held=null;if(v==='sig'){const k=chips().findIndex(r=>inside(p,r));if(k>=0)tapWord(k);return false}
 const D=DATA[v];if(!D||S.i>=D.length)return false;const Z=zonesFor(v),z=Z.findIndex((_,i)=>inside(p,zone(i,Z.length)));if(z>=0){choose(z);return false}
 if(v!=='ask'&&inside(p,card())){S.held={x:p.x,y:p.y};return true}return false}
function move(p){if(S.held){S.held.x=p.x;S.held.y=p.y;A.redraw()}}
function up(p){if(!S.held)return;const Z=zonesFor(view()),z=Z.findIndex((_,i)=>inside(p,zone(i,Z.length)));S.held=null;if(z>=0)choose(z);else A.redraw()}
A=FK.shell(c,{steps,ratio:.8,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
A.start()})})();
