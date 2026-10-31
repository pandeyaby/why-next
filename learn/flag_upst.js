/* Flagship – bystanders and upstanders (ages 7–9): sort what each child does (joins in, bystander, upstander); stop the
   laughing crowd and watch the unkind child's "audience" meter fall; be the first helper and see others follow; pick a
   safe upstander move for how risky each scene is; and tell "telling to keep someone safe" from telling tales.
   Every canvas tap or drag has a button twin, and the canvas label always says what just happened. */
(()=>{
const ROLE=['Joins in','Bystander','Upstander'],ROLEJOB=['adds to the hurt','watches and does nothing','helps the hurt child'];
const ACTS=[['Ben laughs and copies Zak.',0],['Ola watches and says nothing.',1],['Kai says: Stop, that is not kind.',2],['Ivy films it on her tablet.',0],
 ['Raj looks away and walks past.',1],['Noor asks Mia to come and play.',2],['Sam cheers Zak on.',0],['Lily tells the dinner lady.',2]];
const CROWD=['Ben','Ivy','Sam','Raj'],HELP=[['Ola','Raj','Ivy','Ben','Lily','Sam'],['Ada','Leo','Joe','Fay','Tom','Eva']];
const SCENE=['Zak calls Mia a mean name in class.','A group chat is sending mean messages to Ola.'];
const TOOL=['Speak up','Stand with','Tell a grown-up','Check in later','Be mean back'];
const RISK=[{t:'Zak is pushing Mia hard. She could get hurt.',r:2,ok:[2]},{t:'Some kids say Mia cannot play with them.',r:1,ok:[1,0]},
 {t:'Zak calls Mia a mean name. You feel safe to talk.',r:0,ok:[0,1]},{t:'It is home time. Mia looked sad at lunch.',r:0,ok:[3]}];
const TELL=[['Zak takes Mia\'s lunch every day.',0],['Sam got a sticker and I did not.',1],['Someone sends Ola mean messages.',0],
 ['Raj ate his snack before break.',1],['Mia is left out and cries each day.',0],['Ivy sat in my seat once.',1]];
VIS.reg('flagupst',c=>{let A,keys,qa,qk=-1,tok=0,chain=0;c.fig.classList.add('young');
const base=()=>({want:()=>{},won:0,r:0,grab:null,bad:-1,laugh:[1,1,1,1],help:[],scene:0,last:''}),S=base();
const stage=()=>['roles','crowd','first','tools','tell','quiz'][A.step],quick=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.15));
const note=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const goal=()=>({roles:6,crowd:4,first:2,tools:4,tell:5}[stage()]||9);
function txt(g,t,x,y,n,col,w){g.font=`${w||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function card(g,r,warn,good){const C=A.col;g.fillStyle=good?A.alpha(C.gr,.22):(C.dark?'#1e293b':'#fffbeb');A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();
 g.strokeStyle=warn?C.rd:good?C.gr:C.tx;g.lineWidth=warn||good?5:2.5;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
/* a child: round face with a mood mouth and a name under it */
function kid(g,x,y,r,col,mood,name,ring){const C=A.col;A.paint.ball(x,y,r,col);g.fillStyle='#111';[-1,1].forEach(s=>{g.beginPath();g.arc(x+s*r*.33,y-r*.15,r*.1,0,7);g.fill()});
 g.strokeStyle='#111';g.lineWidth=Math.max(2,r*.1);g.beginPath();if(mood==='sad')g.arc(x,y+r*.55,r*.32,3.6,5.8);else if(mood==='laugh'){g.arc(x,y+r*.15,r*.36,.2,2.9);g.closePath();g.fillStyle='#7f1d1d';g.fill()}
 else if(mood==='flat'){g.moveTo(x-r*.28,y+r*.35);g.lineTo(x+r*.28,y+r*.35)}else g.arc(x,y+r*.1,r*.36,.4,2.7);g.stroke();
 if(ring){g.strokeStyle=ring;g.lineWidth=5;g.beginPath();g.arc(x,y,r+6,0,7);g.stroke()}if(name)txt(g,name,x,y+r+fs(13),12,C.tx,700)}
function lines(g,t,maxw,n){g.font=`800 ${fs(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const w of t.split(' ')){const nx=cur?cur+' '+w:w;if(g.measureText(nx).width>maxw&&cur){out.push(cur);cur=w}else cur=nx}out.push(cur);return out}
function para(g,t,x,y,n,maxw,col){const ls=lines(g,t,maxw,n),lh=fs(n)*1.25;ls.forEach((l,i)=>txt(g,l,x,y+(i-(ls.length-1)/2)*lh,n,col))}
/* a draggable text card that wraps onto two lines on a phone */
function cardFor(t,y){const g=A.ctx,ls=lines(g,t,A.W-56,16),w=Math.min(A.W-20,Math.max(...ls.map(l=>g.measureText(l).width))+36),h=fs(16)*(1.5+ls.length*1.25);
 return S.grab&&S.grab.x!=null?{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h}:{x:(A.W-w)/2,y:A.H*y,w,h}}
const inside=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h,near=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<r;
/* ---- 1 roles ---- */
function roleBins(){const n=3,gap=8,w=(A.W-20-gap*(n-1))/n,h=A.H*(A.narrow?.2:.24);return ROLE.map((_,k)=>({x:10+k*(w+gap),y:A.H*.68,w,h}))}
const actCard=()=>cardFor(ACTS[S.r%ACTS.length][0],.28);
function drawRoles(g){const C=A.col;kid(g,A.W*.3,A.H*.13,A.H*.06,C.or,'laugh','Zak');kid(g,A.W*.7,A.H*.13,A.H*.06,C.cy,'sad','Mia');
 roleBins().forEach((r,k)=>{card(g,r,S.bad===k);txt(g,ROLE[k],r.x+r.w/2,r.y+r.h*.36,14);txt(g,['adds hurt','watches','helps'][k],r.x+r.w/2,r.y+r.h*.7,11,C.mu,700)});
 const r=actCard();card(g,r);para(g,ACTS[S.r%ACTS.length][0],r.x+r.w/2,r.y+r.h/2,16,A.W-56);txt(g,`${S.won} of ${goal()} sorted`,A.W/2,A.H*.56,12,C.mu,700)}
function fileRole(k){if(stage()!=='roles'||S.won>=goal())return;const[t,ans]=ACTS[S.r%ACTS.length],who=t.split(' ')[0];
 if(k!==ans){let m=`${who} ${ROLEJOB[ans]}. That makes ${who} ${ans===2?'an upstander':ans===1?'a bystander':'someone who joins in'}.`;
  if(ans===1&&k===2)m=`${who} did nothing mean, but doing nothing does not help Mia. That is a bystander.`;
  else if(ans===0&&k===1)m=`${who} is not just watching. Laughing, cheering or filming gives Zak an audience. That is joining in.`;
  else if(ans===1&&k===0)m=`${who} did not join in. ${who} did nothing at all, so ${who} is a bystander.`;return miss(m,k)}
 win(`Yes! ${who} ${ROLEJOB[ans]}: ${ROLE[ans].toLowerCase()}.`)}
/* ---- 2 crowd ---- */
const crowdAt=k=>({x:A.W*(.14+k*.24),y:A.H*.62}),zakAt=()=>({x:A.W*.3,y:A.H*.25}),miaAt=()=>({x:A.W*.7,y:A.H*.25});
function drawCrowd(g){const C=A.col,n=S.laugh.reduce((a,b)=>a+b,0),r=A.H*.065;kid(g,zakAt().x,zakAt().y,r,C.or,n?'laugh':'flat','Zak');kid(g,miaAt().x,miaAt().y,r,C.cy,n?'sad':'ok','Mia');
 CROWD.forEach((nm,k)=>{const p=crowdAt(k);kid(g,p.x,p.y,r*.85,S.laugh[k]?C.pk:C.gr,S.laugh[k]?'laugh':'ok',nm,S.bad===k?C.rd:null);if(S.laugh[k])txt(g,'ha ha',p.x,p.y-r*1.5,11,C.rd,800)});
 const bw=A.W*.6,bx=(A.W-bw)/2,by=A.H*.86;g.fillStyle=A.alpha(C.mu,.25);A.paint.rrect(bx,by,bw,16,8);g.fill();g.fillStyle=C.or;A.paint.rrect(bx,by,bw*n/4,16,8);g.fill();
 txt(g,`Zak's audience: ${n} laughing`,A.W/2,by-14,12,C.tx,700)}
function stopLaugh(k){if(stage()!=='crowd'||S.won>=goal())return;if(!S.laugh[k]){note(`${CROWD[k]} already stopped. Tap a child who is still laughing.`);return}
 S.laugh[k]=0;S.won++;A.sound.pop();const n=S.laugh.reduce((a,b)=>a+b,0);note(n?`${CROWD[k]} stops laughing. ${n} still laughing, so Zak still has an audience.`:'Nobody laughs now. Zak has no audience, so the teasing stops.');buttons();A.redraw();S.want()}
/* ---- 3 first helper ---- */
const helpAt=k=>({x:A.W*(.17+(k%3)*.33),y:A.H*(.38+Math.floor(k/3)*.3)});
function drawFirst(g){const C=A.col,names=HELP[S.scene%2],r=A.H*.055;para(g,SCENE[S.scene%2],A.W/2,A.H*.1,14,A.W-30);
 names.forEach((nm,k)=>{const p=helpAt(k),on=S.help.includes(k);kid(g,p.x,p.y,r,on?C.gr:C.vi,on?'ok':'flat',nm,on?C.gr:null);
  txt(g,on?'I will help!':'Someone else?',p.x,p.y-r*1.55,11,on?C.gr:C.mu,700)});txt(g,`Helpers: ${S.help.length} of ${names.length}`,A.W/2,A.H*.94,12,C.tx,700)}
function beFirst(k){if(stage()!=='first'||S.won>=goal()||S.help.length)return;const names=HELP[S.scene%2],t=++chain;S.help=[k];A.sound.tick();note(`${names[k]} goes first. Watch what the others do.`);A.redraw();
 const rest=names.map((_,i)=>i).filter(i=>i!==k);rest.forEach((i,j)=>setTimeout(()=>{if(t!==chain)return;S.help.push(i);A.sound.tick();A.redraw();
  if(S.help.length===names.length){S.won++;S.scene++;note(`One helper went first and ${names.length-1} more joined. Someone has to be first.`);setTimeout(()=>{if(t!==chain)return;S.help=[];buttons();A.redraw();S.want()},quick()?20:500)}},quick()?(j+1)*30:(j+1)*180))}
/* ---- 4 safe tools ---- */
function toolRects(){const n=TOOL.length,two=A.narrow,cols=two?2:n,gap=8,w=(A.W-20-gap*(cols-1))/cols,h=two?A.H*.1:A.H*.17;
 return TOOL.map((_,k)=>{const col=two?k%2:k,row=two?k>>1:0;return{x:10+col*(w+gap)+(two&&k===4?(w+gap)/2:0),y:A.H*(two?.56:.66)+row*(h+6),w,h}})}
function drawTools(g){const C=A.col,s=RISK[S.r%RISK.length],box={x:10,y:A.H*.06,w:A.W-20,h:A.H*.3};card(g,box,false,S.last==='ok');para(g,s.t,A.W/2,box.y+box.h*.33,15,A.W-50);
 const lv=['Low risk','Some risk','Someone could get hurt'][s.r],cl=[C.gr,C.am,C.rd][s.r];g.font=`800 ${fs(12)}px system-ui,sans-serif`;const pw=g.measureText(lv).width+28;g.fillStyle=cl;A.paint.rrect(A.W/2-pw/2,box.y+box.h*.68,pw,fs(24),12);g.fill();txt(g,lv,A.W/2,box.y+box.h*.68+fs(12),12,C.dark?'#111':'#fff',800);
 toolRects().forEach((r,k)=>{const at=S.grab&&S.grab.k===k&&S.grab.x!=null?{...r,x:S.grab.x-r.w/2,y:S.grab.y-r.h/2}:r;card(g,at,S.bad===k);txt(g,TOOL[k],at.x+at.w/2,at.y+at.h/2,13,k===4?C.rd:C.tx)});
 txt(g,`${S.won} of ${goal()} scenes`,A.W/2,A.H*.45,12,C.mu,700)}
function useTool(k){if(stage()!=='tools'||S.won>=goal()||S.last)return;const s=RISK[S.r%RISK.length];
 if(!s.ok.includes(k)){let m=`${TOOL[k]} is not the best move here. Look at the risk.`;if(k===4)m='Being mean back makes it bigger and can hurt you too. Pick a safe move.';
  else if(s.r===2)m=`${TOOL[k]} is kind, but someone could get hurt right now. Get a grown-up fast.`;else if(s.ok[0]===3)m='The unkind moment is over. Now Mia needs a friend to ask: Are you OK?';
  else if(k===3)m='Checking in later is kind, but you can help Mia now, while it is happening.';
  else if(k===2)m='Telling is good, and you can do it later too. Right now you can help Mia yourself, safely.';return miss(m,k)}
 S.last='ok';A.redraw();setTimeout(()=>{S.last='';win(`Yes! ${TOOL[k]} fits ${['low risk','some risk','high risk'][s.r]}.`)},quick()?20:400)}
/* ---- 5 telling ---- */
function tellBins(){const w=(A.W-30)/2,h=A.H*.22;return[0,1].map(k=>({x:10+k*(w+10),y:A.H*.66,w,h}))}
const tellCard=()=>cardFor(TELL[S.r%TELL.length][0],.2);
function drawTell(g){const C=A.col;tellBins().forEach((r,k)=>{card(g,r,S.bad===k);txt(g,['Keeps someone safe','Telling tales'][k],r.x+r.w/2,r.y+r.h*.38,13);txt(g,['tell a grown-up','gets someone in trouble'][k],r.x+r.w/2,r.y+r.h*.7,10,C.mu,700)});
 const r=tellCard();card(g,r);para(g,TELL[S.r%TELL.length][0],r.x+r.w/2,r.y+r.h/2,16,A.W-56);txt(g,`${S.won} of ${goal()} sorted`,A.W/2,A.H*.5,12,C.mu,700)}
function fileTell(k){if(stage()!=='tell'||S.won>=goal())return;const[,ans]=TELL[S.r%TELL.length];
 if(k!==ans){const m=ans===0?'Someone is being hurt again and again. Telling a grown-up keeps them safe. That is not telling tales.':'Nobody is hurt or in danger here. Telling this only gets someone into trouble.';return miss(m,k)}
 win(ans===0?'Yes! Tell a grown-up: it keeps someone safe.':'Yes! Nobody is hurt, so this would be telling tales.')}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){kid(g,W*.35,H*.4,H*.08,C.gr,'ok','You');kid(g,W*.65,H*.4,H*.08,C.cy,'ok','Mia');txt(g,'Be the one who helps.',W/2,H*.75,15);return}
 if(S.won>=goal()){txt(g,sum(),W/2,H/2,15);return A.fx.draw(g)}({roles:drawRoles,crowd:drawCrowd,first:drawFirst,tools:drawTools,tell:drawTell})[v](g);A.fx.draw(g)}
const sum=()=>({roles:'Watching is a choice too.',crowd:'No audience, no show.',first:'Others follow the first helper.',tools:'Match the move to the risk.',tell:'Telling keeps people safe.'}[stage()]);
function miss(t,b){A.sound.miss();S.bad=b==null?-1:b;note(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:900);A.redraw()}
function win(t){S.won++;S.r++;A.sound.pop();note(S.won<goal()?t+' Next one.':t);buttons();A.redraw();S.want()}
function buttons(){if(!keys)return;keys.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};if(v==='quiz'||S.won>=goal())return;
 if(v==='roles')ROLE.forEach((k,i)=>B(k,()=>fileRole(i),`${k}: ${ROLEJOB[i]}`));
 if(v==='crowd')CROWD.forEach((n,i)=>{if(S.laugh[i])B(`${n} stops`,()=>stopLaugh(i),`${n} stops laughing`)});
 if(v==='first'&&!S.help.length)HELP[S.scene%2].forEach((n,i)=>B(n,()=>beFirst(i),`${n} helps first`));
 if(v==='tools')TOOL.forEach((t,i)=>B(t,()=>useTool(i),`Choose: ${t}`));
 if(v==='tell')['Keeps someone safe','Telling tales'].forEach((t,i)=>B(t,()=>fileTell(i),t))}
function down(p){const v=stage();if(S.won>=goal())return false;
 if(v==='roles'){if(inside(p,actCard())){S.grab={x:null,y:null,x0:p.x,y0:p.y};return true}const k=roleBins().findIndex(r=>inside(p,r));if(k>=0)fileRole(k);return false}
 if(v==='tell'){if(inside(p,tellCard())){S.grab={x:null,y:null,x0:p.x,y0:p.y};return true}const k=tellBins().findIndex(r=>inside(p,r));if(k>=0)fileTell(k);return false}
 if(v==='crowd'){const r=A.H*.07,k=CROWD.findIndex((_,i)=>near(p,crowdAt(i),r*1.3));if(k>=0)stopLaugh(k);else if(near(p,zakAt(),r*1.3))miss('Zak is the one being unkind. Tap a child who is laughing: they choose to be his audience.');else if(near(p,miaAt(),r*1.3))miss('Mia is being hurt. The laughing children can change this. Tap one of them.');return false}
 if(v==='first'){const k=HELP[0].findIndex((_,i)=>near(p,helpAt(i),A.H*.08));if(k>=0)beFirst(k);return false}
 if(v==='tools'){const k=toolRects().findIndex(r=>inside(p,r));if(k>=0){S.grab={k,x:null,y:null,x0:p.x,y0:p.y};return true}}return false}
function move(p){if(!S.grab)return;if(S.grab.x!=null||Math.hypot(p.x-S.grab.x0,p.y-S.grab.y0)>8){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const gr=S.grab,v=stage();S.grab=null;if(!gr)return;if(v==='tools'){if(gr.x==null||p.y<A.H*.4)useTool(gr.k);else A.redraw();return}
 if(gr.x==null){note('Now tap the box it belongs in.');return A.redraw()}const k=(v==='roles'?roleBins():tellBins()).findIndex(r=>inside(p,r));if(k>=0)(v==='roles'?fileRole:fileTell)(k);A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},quick()?j*40+30:(j+1)*(gap||300)))}
const restart=()=>{tok++;chain++;Object.assign(S,base())};
const steps=[
{h:'Who is who?',p:'Zak is being unkind to Mia. The other children choose what to do. Drag each card to its box, or tap a box.',predict:{q:'Ola watches and says nothing. Is she helping Mia?',opts:['Yes, she did nothing mean','No, she is a bystander'],ans:1},task:'Sort 6 children',
 show:()=>{steps[0].go();demo(ACTS.slice(0,6).map(([,k])=>()=>fileRole(k)),320)},go:()=>{restart();note('What does this child do?');buttons();S.want=ready(0,()=>S.won>=6,'Each child made a choice.')}},
{h:'The audience',p:'Unkind children often want an audience. Tap each laughing child to stop the laughing. Watch the bar.',predict:{q:'If the watchers stop laughing, what happens to Zak?',opts:['Nothing changes','He loses his audience'],ans:1},task:'Stop all 4 laughing',
 show:()=>{steps[1].go();demo(CROWD.map((_,i)=>()=>stopLaugh(i)),450)},go:()=>{restart();note('4 children laugh. Zak has a big audience.');buttons();S.want=ready(1,()=>S.won>=4,'With no one laughing, Zak stops.')}},
{h:'Be the first',p:'Lots of children see it. Each one thinks: someone else will help. Tap one child to go first.',predict:{q:'Lots of children saw it. Is someone sure to help?',opts:['Yes, with so many, someone will','No, they may all wait'],ans:1},task:'Go first in 2 scenes',
 show:()=>{steps[2].go();demo([()=>beFirst(0),()=>beFirst(2)],1500)},go:()=>{restart();note('Six children, and all of them wait.');buttons();S.want=ready(2,()=>S.won>=2,'One brave helper makes it easy for others.')}},
{h:'Safe ways to help',p:'Upstanders stay safe. Look at the risk. Then drag or tap the best move.',task:'Pick moves for 4 scenes',
 show:()=>{steps[3].go();demo(RISK.map(s=>()=>useTool(s.ok[0])),800)},go:()=>{restart();note('How risky is it? Pick a safe move.');buttons();S.want=ready(3,()=>S.won>=4,'Big risk: get a grown-up.')}},
{h:'Telling or telling tales?',p:'Telling a grown-up is not telling tales when someone is being hurt. Sort each one.',predict:{q:'Is telling a teacher about bullying telling tales?',opts:['Yes, it is snitching','No, it keeps someone safe'],ans:1},task:'Sort 5 cards',
 show:()=>{steps[4].go();demo(TELL.slice(0,5).map(([,k])=>()=>fileTell(k)),320)},go:()=>{restart();note('Is someone being hurt?');buttons();S.want=ready(4,()=>S.won>=5,'Telling to keep safe is brave.')}},
{h:'Challenge',p:'',go:()=>{restart();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Ola sees Zak grab Mia\'s hat. She watches and says nothing. What is Ola?',[['A bystander','ok'],['An upstander','quiet'],['Joining in','notmean']]],
 ['Kids are laughing at Mia. What is a safe way to help?',[['Ask Mia to come and play','ok'],['Laugh too, so they leave you alone','join'],['Push the kids away','push']]],
 ['Two children are fighting. Someone could get hurt. What is the best move?',[['Get a grown-up fast','ok'],['Pull them apart yourself','alone'],['Wait and see','wait']]],
 ['Ten children saw Mia being teased. Why did nobody help?',[['Each one thought someone else would','ok'],['Nobody cared at all','cared'],['It was not unkind','notunkind']]],
 ['You tell a teacher that Mia is left out every day. This is…',[['Keeping Mia safe','ok'],['Telling tales','tales'],['Not your business','business']]]];
function reason(t){let m='Think: does it help the child who is being hurt, and is it safe?';
 if(t==='quiet')m='Ola did not help Mia. Doing nothing while someone is hurt is being a bystander.';if(t==='notmean')m='Ola did not laugh or join Zak. She only watched, so she is a bystander.';
 if(t==='join')m='Laughing gives the unkind kids an audience. That is joining in, and it hurts Mia more.';if(t==='push')m='Pushing can get you or others hurt, and you may get in trouble. Stand with Mia or tell a grown-up.';
 if(t==='alone')m='You could get hurt too. When someone could get hurt, the safe move is to get a grown-up fast.';if(t==='wait')m='Waiting lets someone get hurt. Get a grown-up straight away.';
 if(t==='cared')m='Many cared but waited. Each one thought someone else would help. Be the first.';if(t==='notunkind')m='Teasing is unkind. They saw it, but each one waited for someone else.';
 if(t==='tales')m='Telling tales is to get someone in trouble. This is to keep Mia safe, so it is the right thing.';if(t==='business')m='When someone is hurt again and again, it is everyone\'s business. Telling helps.';return m}
function pose(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 qa.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});note('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! That is what an upstander knows.':'✗ '+reason(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{qa.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qa=E('div',{class:'fl-chal'},A.below);restart();A.gest({down,move,up});buttons()}});
A.start()})})();
