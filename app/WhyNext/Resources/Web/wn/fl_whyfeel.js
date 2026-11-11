/* Flagship: culture and experience shape emotions (ages 9-11, RSHE mental wellbeing, CASEL social awareness).
   Event, thought (appraisal), feeling; past and culture shape the thought. Every gesture has a button twin. */
(()=>{
const KIDS=[['Ava','😨','scared'],['Jo','🤩','excited'],['Sam','😐','calm']];
const PASTS=[['A storm once blew a tree onto her roof.',0],['She counts the seconds to the thunder with Grandad.',1],['He used to live where it storms most afternoons.',2]];
const THINK=[['“I must be in trouble.”','worried','😟'],['“Maybe she liked my story!”','excited','🤩'],['“She probably needs a helper.”','calm','🙂']];
const GOAL=[0,1,2];
const DOG=[['Bitten by a dog at age 5','“It will bite me!”','scared','😨'],['Has hardly ever met a dog','“What will it do?”','unsure','😟'],
 ['Next-door dog is gentle','“Dogs are mostly friendly.”','calm','🙂'],['Grew up with a dog','“A new friend!”','delighted','😄']];
const AIM=[0,1,3];
const NORMS=[['The head teacher praises you by name in front of the whole school.',[['Leo','At home, big wins are cheered loudly and shared.',0],['Kai','At home, praise is given quietly. Standing out in a crowd feels like showing off.',1]]],
 ['A friend asks loudly what your new trainers cost.',[['Ana','In her family, prices are talked about like the weather.',0],['Ben','In his family, money is a private topic.',1]]]];
const FACE=[['😊','Proud or relaxed'],['😳','Embarrassed or uneasy']];
const REPLY=[['“It\'s only a tiny dog. Stop being silly.”',1,'This dismisses her feeling. To her the fear is real.'],['“That looks scary for you. Shall we move away?”',0,'This names her feeling and offers help.'],
 ['“Everyone else likes it.”',1,'Comparing her with others makes her feel wrong. People feel differently for good reasons.'],['“Has something happened with a dog before?”',0,'A kind, curious question. Her past may explain the fear.'],
 ['“Just stroke it, you\'ll be fine.”',1,'Pushing her ignores what she feels. Let her choose.']];
VIS.reg('flagwhyfeel',c=>{let A,ctl,chal,qi=-1,run=0,wins=0;
const base=()=>({after:()=>{},n:0,got:[],drag:null,miss:-1,lit:-1,slot:-1,past:1,flip:[],ans:{},pile:[]}),S=base();
const zone=()=>['storm','thought','dog','norms','reply','chal'][A.step],instant=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
function voice(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function say1(g,t,x,y,n,col,b,al,mw){g.font=`${b||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-10)}
function lines(g,t,cx,y,w,n,col,b){g.font=`${b||600} ${fs(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const v of t.split(' ')){const tr=cur?cur+' '+v:v;if(g.measureText(tr).width>w&&cur){out.push(cur);cur=v}else cur=tr}out.push(cur);
 const lh=fs(n)*1.25,y0=y-(out.length-1)*lh/2;out.forEach((l,i)=>say1(g,l,cx,y0+i*lh,n,col,b,'center',w));return out.length*lh}
function face(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function tile(g,r,fill,edge,lw,dash){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();if(dash)g.setLineDash([7,5]);g.lineWidth=lw||2;g.strokeStyle=edge;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.setLineDash([])}
const on=(p,r)=>r&&p.x>=r.x-5&&p.x<=r.x+r.w+5&&p.y>=r.y-5&&p.y<=r.y+r.h+5;
const sheet=()=>A.col.dark?'#1e293b':'#fff',rim=()=>A.mix(A.col.tx,A.col.pn,.42),wash=(h,k)=>A.mix(A.col.pn,h,A.col.dark?.2:k||.6);
const carry=r=>S.drag&&S.drag.x!=null?{...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2}:r;
/* step 1 */
const kidR=i=>{const w=A.W/3;return{x:i*w+6,y:A.H*.1,w:w-12,h:A.H*.42}};
const pastR=i=>{const h=A.H*.12;return{x:12,y:A.H*.56+i*(h+6),w:A.W-24,h}};
function drawStorm(g){const C=A.col;say1(g,'⛈️ The same storm, three children',A.W/2,A.H*.05,14,C.tx,900);
 KIDS.forEach((k,i)=>{const r=kidR(i),j=S.got.findIndex(v=>v===i),hit=j>=0;tile(g,r,hit?wash('#bbf7d0'):sheet(),i===S.miss?C.rd:i===S.lit?C.vi:hit?C.gr:rim(),i===S.miss||hit||i===S.lit?4:2);
  face(g,k[1],r.x+r.w/2,r.y+r.h*.3,Math.min(r.w*.4,58));say1(g,`${k[0]} feels ${k[2]}`,r.x+r.w/2,r.y+r.h*.62,13,C.tx,800,'center',r.w-6);if(hit)lines(g,'✓ past matched',r.x+r.w/2,r.y+r.h*.85,r.w-8,11,C.gr,700)});
 PASTS.forEach((p,i)=>{if(S.got[i]!=null)return;const r=S.drag&&S.drag.k===i?carry(pastR(i)):pastR(i);tile(g,r,wash('#fde68a',.5),S.slot===i?C.ac:rim(),S.slot===i?4:2);lines(g,p[0],r.x+r.w/2,r.y+r.h/2,r.w-16,12.5,C.tx,700)})}
function match(i,k){if(S.got[i]!=null||S.n>=3)return;const want=PASTS[i][1];S.lit=k;
 if(k!==want){S.miss=k;A.sound.miss();voice(`That past would make someone feel ${KIDS[want][2]}, not ${KIDS[k][2]}. Think about what each child expects a storm to do.`);return A.redraw()}
 S.got[i]=k;S.n++;S.miss=-1;S.slot=-1;A.sound.pop();voice(`Yes: ${KIDS[k][0]} feels ${KIDS[k][2]} because of what happened before.${S.n<3?'':' Same storm, three feelings.'}`);pad();A.redraw();S.after()}
/* step 2 */
const chainR=()=>{const w=(A.W-40)/3;return[0,1,2].map(i=>({x:10+i*(w+10),y:A.H*.16,w,h:A.H*.34}))};
const thinkR=i=>{const h=A.H*.11;return{x:14,y:A.H*.6+i*(h+6),w:A.W-28,h}};
function drawThought(g){const C=A.col,R=chainR(),goal=THINK[GOAL[Math.min(S.n,2)]];
 say1(g,S.n<3?`Goal ${S.n+1} of 3: make the feeling ${goal[1]}`:'Three thoughts, three feelings.',A.W/2,A.H*.06,14,C.tx,900);
 ['Event','Thought','Feeling'].forEach((h,i)=>{const r=R[i];tile(g,r,i===1?A.alpha(C.vi,.08):sheet(),i===1&&S.lit===0?C.vi:rim(),i===1&&S.lit===0?4:2,i===1&&S.slot<0);say1(g,h,r.x+r.w/2,r.y+16,12,C.mu,800)});
 lines(g,'Teacher: “Can you come to my desk?”',R[0].x+R[0].w/2,R[0].y+R[0].h*.58,R[0].w-10,12,C.tx,700);
 if(S.slot>=0){lines(g,THINK[S.slot][0],R[1].x+R[1].w/2,R[1].y+R[1].h*.58,R[1].w-10,12,C.tx,700);face(g,THINK[S.slot][2],R[2].x+R[2].w/2,R[2].y+R[2].h*.5,Math.min(R[2].w*.36,52));say1(g,THINK[S.slot][1],R[2].x+R[2].w/2,R[2].y+R[2].h*.85,13,C.tx,800)}
 else say1(g,'?',R[2].x+R[2].w/2,R[2].y+R[2].h*.55,26,C.mu,900);
 [R[0],R[1]].forEach(r=>say1(g,'→',r.x+r.w+5,r.y+r.h/2,16,C.tx,900));
 THINK.forEach((t,i)=>{const r=S.drag&&S.drag.k===i?carry(thinkR(i)):thinkR(i);tile(g,r,wash('#ddd6fe',.5),S.miss===i?C.rd:rim(),S.miss===i?4:2);say1(g,t[0],r.x+r.w/2,r.y+r.h/2,13,C.tx,700,'center',r.w-12)})}
function think(i){if(S.n>=3)return;const want=GOAL[S.n];S.slot=i;S.lit=0;
 if(i!==want){S.miss=i;A.sound.miss();voice(`That thought makes you feel ${THINK[i][1]}. Same event, but the goal is ${THINK[want][1]}: which thought leads there?`);return A.redraw()}
 S.n++;S.miss=-1;A.sound.pop();voice(`Yes: thinking ${THINK[i][0]} makes the feeling ${THINK[i][1]}. The event did not change; the thought did.`);pad();A.redraw();S.after()}
/* step 3 */
const rail=()=>({x:A.W*.1,y:A.H*.8,w:A.W*.8,h:34});
function drawDog(g){const C=A.col,P=DOG[S.past],aim=DOG[AIM[Math.min(S.n,2)]],cx=A.W/2;
 say1(g,S.n<3?`Target ${S.n+1} of 3: Mia feels ${aim[2]}`:'Three pasts, three feelings.',cx,A.H*.05,14,C.tx,900);
 face(g,'🐕',A.W*.2,A.H*.25,Math.min(A.W*.16,70));say1(g,'wagging, running up',A.W*.2,A.H*.4,11,C.mu,600);
 face(g,P[3],A.W*.72,A.H*.22,Math.min(A.W*.16,70));say1(g,`Mia: ${P[2]}`,A.W*.72,A.H*.37,14,C.tx,900);
 const b={x:A.W*.42,y:A.H*.44,w:A.W*.54,h:A.H*.12};tile(g,b,sheet(),rim());lines(g,'thinks '+P[1],b.x+b.w/2,b.y+b.h/2,b.w-10,12.5,C.tx,700);
 lines(g,'Her past: '+P[0],cx,A.H*.66,A.W-30,13,C.tx,800);const r=rail();g.strokeStyle=rim();g.lineWidth=5;g.beginPath();g.moveTo(r.x,r.y+r.h/2);g.lineTo(r.x+r.w,r.y+r.h/2);g.stroke();
 DOG.forEach((d,i)=>{const x=r.x+r.w*i/3;g.fillStyle=i===S.past?C.ac:rim();g.beginPath();g.arc(x,r.y+r.h/2,i===S.past?15:7,0,7);g.fill()});say1(g,'scary past',r.x,r.y+r.h+12,11,C.mu,600);say1(g,'happy past',r.x+r.w,r.y+r.h+12,11,C.mu,600)}
function slide(i){if(i===S.past)return;S.past=i;A.sound.tick();voice(`Past: ${DOG[i][0]}. Mia thinks ${DOG[i][1]} and feels ${DOG[i][2]}.`);pad();A.redraw()}
function test(){if(S.n>=3)return;const want=AIM[S.n];if(S.past!==want){A.sound.miss();voice(`Not yet: with this past Mia feels ${DOG[S.past][2]}. Which past would make her think ${DOG[want][1]}?`);return A.redraw()}
 S.n++;A.sound.pop();voice(`Yes: ${DOG[want][0].toLowerCase()}, so she feels ${DOG[want][2]}. Same dog, different past.`);pad();A.redraw();S.after()}
/* step 4 */
const who=()=>NORMS[Math.min(S.n>>1,1)][1][S.n&1],faceR=i=>{const w=Math.min(A.W*.42,200);return{x:A.W/2+(i?6:-w-6),y:A.H*.72,w,h:A.H*.18}};
function drawNorms(g){const C=A.col,sit=NORMS[Math.min(S.n>>1,1)];
 const top={x:10,y:8,w:A.W-20,h:A.H*.2};tile(g,top,wash('#fde68a',.45),rim());lines(g,sit[0],A.W/2,top.y+top.h/2,top.w-20,13,C.tx,800);
 if(S.n<4){const k=who(),r={x:20,y:A.H*.27,w:A.W-40,h:A.H*.38};tile(g,r,sheet(),rim());say1(g,`How might ${k[0]} feel?`,A.W/2,r.y+22,14,C.tx,900);
  if(S.flip[S.n])lines(g,k[1],A.W/2,r.y+r.h*.6,r.w-24,13,C.tx,600);else say1(g,'Tap here to read about their family',A.W/2,r.y+r.h*.6,13,C.ac,700);
  FACE.forEach((f,i)=>{const q=faceR(i);tile(g,q,wash(i?'#fecaca':'#bbf7d0',.55),S.miss===i?C.rd:rim(),S.miss===i?4:2);face(g,f[0],q.x+q.h*.45,q.y+q.h/2,q.h*.5);lines(g,f[1],q.x+q.h+(q.w-q.h)/2-4,q.y+q.h/2,q.w-q.h-6,12,C.tx,800)})}
 else lines(g,'What each family values shapes pride and embarrassment.',A.W/2,A.H*.55,A.W-40,14,C.gr,800)}
function feel(i){if(S.n>=4)return;const k=who();S.flip[S.n]=1;if(i!==k[2]){S.miss=i;A.sound.miss();voice(`Read ${k[0]}'s family card again: ${k[1]} Would that make this feel ${FACE[i][1].toLowerCase()}?`);return A.redraw()}
 S.n++;S.miss=-1;A.sound.pop();voice(`Yes. ${k[0]} feels ${FACE[i][1].toLowerCase()} because of what ${k[0]}'s family values.${S.n===2?' Next event.':''}`);pad();A.redraw();S.after()}
/* step 5 */
const binsR=()=>[0,1].map(i=>({x:8+i*(A.W/2),y:8,w:A.W/2-16,h:A.H*.5})),replyR=()=>({x:16,y:A.H*.66,w:A.W-32,h:A.H*.2});
function drawReply(g){const C=A.col;binsR().forEach((r,i)=>{tile(g,r,wash(i?'#fecaca':'#bbf7d0',.55),i===S.lit?C.vi:rim(),i===S.lit?4:2);say1(g,i?'👎 Unhelpful':'👍 Helpful',r.x+r.w/2,r.y+20,14,C.tx,900);
  S.pile.filter(k=>REPLY[k][1]===i).forEach((k,j)=>lines(g,REPLY[k][0],r.x+r.w/2,r.y+52+j*fs(11)*3.2,r.w-12,11,C.tx,600))});
 say1(g,'Zara is scared of a small dog that everyone else thinks is cute.',A.W/2,A.H*.58,12,C.mu,700);
 if(S.n<5){const r=carry(replyR());tile(g,r,sheet(),S.miss>=0?C.rd:rim(),S.miss>=0?4:2);lines(g,REPLY[S.n][0],r.x+r.w/2,r.y+r.h/2,r.w-20,14,C.tx,800)}}
function reply(i){if(S.n>=5)return;const R=REPLY[S.n];S.lit=i;if(i!==R[1]){S.miss=1;A.sound.miss();voice('Look again. '+R[2]);return A.redraw()}
 S.pile.push(S.n);S.n++;S.miss=-1;A.sound.pop();voice((i?'Unhelpful. ':'Helpful. ')+R[2]);pad();A.redraw();S.after()}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.32);g.fillRect(0,0,A.W,A.H);
 ({storm:drawStorm,thought:drawThought,dog:drawDog,norms:drawNorms,reply:drawReply,chal:drawDog}[zone()])(g);A.fx.draw(g)}
function pad(){if(!ctl)return;ctl.innerHTML='';const z=zone(),B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},ctl,t);b.onclick=f};
 if(z==='storm'&&S.n<3){const i=PASTS.findIndex((_,j)=>S.got[j]==null);KIDS.forEach((k,j)=>B(`${k[1]} ${k[0]}`,`Give the past "${PASTS[i][0]}" to ${k[0]}`,()=>match(i,j)))}
 if(z==='thought'&&S.n<3)THINK.forEach((t,i)=>B(t[0],`Use the thought ${t[0]}`,()=>think(i)));
 if(z==='dog'&&S.n<3){B('◀ Scarier past','Move to a worse past with dogs',()=>slide(Math.max(0,S.past-1)));B('Happier past ▶','Move to a better past with dogs',()=>slide(Math.min(3,S.past+1)));B('Check Mia','Check Mia\'s feeling against the target',test)}
 if(z==='norms'&&S.n<4){B('Read family card','Read about their family',()=>{S.flip[S.n]=1;voice(who()[1]);A.redraw()});FACE.forEach((f,i)=>B(`${f[0]} ${f[1]}`,`They feel ${f[1].toLowerCase()}`,()=>feel(i)))}
 if(z==='reply'&&S.n<5){B('👍 Helpful','This reply is helpful',()=>reply(0));B('👎 Unhelpful','This reply is unhelpful',()=>reply(1))}}
function down(p){const z=zone();if(z==='chal')return false;
 if(z==='storm'){const i=PASTS.findIndex((_,j)=>S.got[j]==null&&on(p,pastR(j)));if(i>=0){S.drag={k:i,x:p.x,y:p.y};S.slot=i;A.redraw();return true}
  const k=KIDS.findIndex((_,j)=>on(p,kidR(j)));if(k>=0&&S.slot>=0)match(S.slot,k);return false}
 if(z==='thought'){const i=THINK.findIndex((_,j)=>on(p,thinkR(j)));if(i>=0){S.drag={k:i,x:p.x,y:p.y};return true}return false}
 if(z==='dog'){const r=rail();if(on(p,{x:r.x-15,y:r.y-10,w:r.w+30,h:r.h+20})){S.drag={};roll(p);return true}return false}
 if(z==='norms'){if(on(p,{x:20,y:A.H*.27,w:A.W-40,h:A.H*.38})){S.flip[S.n]=1;voice(who()[1]);A.redraw();return false}const i=[0,1].findIndex(j=>on(p,faceR(j)));if(i>=0)feel(i);return false}
 if(z==='reply'){if(S.n<5&&on(p,replyR())){S.drag={k:0,x:p.x,y:p.y};return true}const i=[0,1].findIndex(j=>on(p,binsR()[j]));if(i>=0)reply(i);return false}return false}
function roll(p){const r=rail();slide(Math.round(Math.max(0,Math.min(1,(p.x-r.x)/r.w))*3))}
function move(p){if(!S.drag)return;if(zone()==='dog')return roll(p);S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag,z=zone();S.drag=null;if(!d)return;
 if(z==='storm'){const k=KIDS.findIndex((_,j)=>on(p,kidR(j)));if(k>=0)match(d.k,k);else{voice('Card picked up. Tap its child.');A.redraw()}}
 if(z==='thought'){if(on(p,chainR()[1]))think(d.k);else A.redraw()}
 if(z==='dog')voice(`Mia feels ${DOG[S.past][2]}. Press Check Mia when it matches the target.`);
 if(z==='reply'){const i=[0,1].findIndex(j=>on(p,binsR()[j]));if(i>=0)reply(i);else A.redraw()}}
const wrap=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,ms){const v=++run;list.forEach((f,j)=>setTimeout(()=>{if(v===run)f()},instant()?j*40+30:(j+1)*(ms||500)))}
const begin=()=>{run++;Object.assign(S,base())};
const steps=[
{h:'Same storm, different feelings',p:'Three children hear the same storm. Drag each past onto the child it explains, or tap a card and then a child.',predict:{q:'It is the same storm. Will all three feel the same?',opts:['Yes, storms scare everyone','No, it depends on what each has lived through'],ans:1},task:'Match all 3 pasts',
 show:()=>{steps[0].go();auto(PASTS.map((p,i)=>()=>match(i,p[1])),600)},go:()=>{begin();voice('Ava is scared, Jo is excited, Sam is calm. Match each past.');pad();S.after=wrap(0,()=>S.n>=3,'Past experiences shape what we expect, so one event can trigger different emotions.')}},
{h:'The thought in the middle',p:'Between an event and a feeling there is a thought: what you think the event means. Drag a thought into the middle box.',predict:{q:'What decides the feeling most?',opts:['The event on its own','What you think the event means'],ans:1},task:'Reach all 3 goal feelings',
 show:()=>{steps[1].go();auto(GOAL.map(i=>()=>think(i)),650)},go:()=>{begin();voice('Event: your teacher asks you to come to her desk. Choose a thought.');pad();S.after=wrap(1,()=>S.n>=3,'Same event, three thoughts, three feelings. Psychologists call the thought an appraisal.')}},
{h:'Your past shapes the thought',p:'A dog runs up to Mia, wagging. Slide Mia\'s past with dogs and watch her thought and feeling change. Press Check Mia.',task:'Hit 3 target feelings',
 show:()=>{steps[2].go();auto([()=>slide(0),test,()=>slide(1),test,()=>slide(3),test],450)},go:()=>{begin();voice('Slide Mia\'s past until she feels scared, then check.');pad();S.after=wrap(2,()=>S.n>=3,'The dog was the same each time. Mia\'s past changed her thought, and the thought changed the feeling.')}},
{h:'Culture: pride or embarrassment?',p:'Families and cultures differ in what they value. Read each child\'s family card, then choose how they might feel.',predict:{q:'Could praise in front of the whole school make someone embarrassed?',opts:['No, praise always feels good','Yes, it depends on what their family values'],ans:1},task:'Choose for all 4 children',
 show:()=>{steps[3].go();auto([0,1,0,1].map(i=>()=>feel(i)),600)},go:()=>{begin();voice('Read Leo\'s family card, then choose his feeling.');pad();S.after=wrap(3,()=>S.n>=4,'Neither child is wrong. What a culture or family values shapes what makes us proud or embarrassed.')}},
{h:'Respond with understanding',p:'Zara is scared of a small dog. Sort each reply into Helpful or Unhelpful: drag it, or tap a box.',task:'Sort all 5 replies',
 show:()=>{steps[4].go();auto(REPLY.map(R=>()=>reply(R[1])),550)},go:()=>{begin();voice('Is this reply helpful or unhelpful?');pad();S.after=wrap(4,()=>S.n>=5,'Take a feeling seriously, name it, and get curious about the story behind it.')}},
{h:'Challenge',p:'',go:()=>{begin();S.past=3;ask()}}];
const QS=[['Two friends watch the same scary film. One loves it, one has nightmares. Why?',[['Their past experiences and what they expect differ','ok'],['One of them is wrong to feel that way','wrong'],['The film was different for each','event']]],
 ['What is an appraisal?',[['What you think an event means','ok'],['The event itself','event2'],['How your face looks','face']]],
 ['Kai feels embarrassed when praised in front of everyone. What is the kindest thought about this?',[['His family may value quiet praise','ok'],['He is being ungrateful','judge'],['Everyone loves praise, so he is pretending','same']]],
 ['A friend is scared of fireworks but you love them. What is a good reply?',[['“They seem scary for you. Want to watch from inside?”','ok'],['“Don\'t be a baby.”','dismiss'],['“Nobody else is scared.”','compare']]],
 ['Which sentence is true?',[['The same event can cause different emotions in different people','ok'],['Every event has one right emotion','oneright'],['Culture changes the event itself','event3']]]];
function why(t){let m='Think: event, then thought, then feeling.';
 if(t==='wrong'||t==='oneright')m='No feeling is wrong. Different pasts and cultures lead to different, real feelings.';
 if(t==='event'||t==='event2'||t==='event3')m='The event stays the same. What changes is the thought about it, shaped by past and culture.';
 if(t==='face')m='A face shows a feeling. An appraisal is the thought in the middle: what the event means to you.';
 if(t==='judge'||t==='same')m='That judges him by your own norms. In some families quiet praise is the respectful kind.';
 if(t==='dismiss')m='Calling names dismisses a real fear. Name the feeling and offer a choice.';
 if(t==='compare')m='Comparing makes her feel wrong. Her past may explain the fear, so ask or help.';return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});voice('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok){wins++;A.win()}else{wins=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Correct. Streak: '+wins+'.':'✗ '+why(t)} <button type="button" class="linkish">Next question →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
A=FK.shell(c,{steps,ratio:.68,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pad()}});
A.start()})})();
