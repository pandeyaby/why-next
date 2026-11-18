/* Flagship – community rights and responsibilities (ages 9–11). Swipe-sort rights from wants, mirror a right onto
   everyone else, find the punishments that would break a right, level a rights clash on a balance, and hand each right to its duty bearer. */
(()=>{
const DECK=[['Go to school and learn',1,'Article 28'],['A new games console',0],['Be safe from harm and hurt',1,'Article 19'],['Your own phone',0],
 ['Clean water and healthy food',1,'Article 24'],['Stay up as late as you like',0]];
const MIRROR=[{r:'You have the right to say what you think and be listened to (Article 12).',o:['Listen when others speak','Speak louder than everyone','Only listen to my friends'],a:0,
  no:['','Talking over people takes away their same right to be heard.','Everyone has this right, not just your friends.']},
 {r:'You have the right to learn at school (Article 28).',o:['Shout during the lesson','Let others learn without disturbing them','Keep the best books for myself'],a:1,
  no:['Shouting stops everyone else learning. They have the same right.','','Hogging the books stops others learning. They have the same right.']},
 {r:'You have the right to be safe from harm (Article 19).',o:['Hit back harder','Keep quiet if someone is hurt','Never hurt or threaten anyone'],a:2,
  no:['Hitting back harms someone with the same right to be safe.','Staying quiet leaves them unsafe. Telling a trusted adult helps protect their right.','']}];
const SHIELD=[['Miss 10 minutes of golden time',0,'Golden time is a privilege. It can be taken away.'],['Go without lunch today',1,'Food is a right (Article 24). It is never taken away as a punishment.'],
 ['Be called names in front of the class',1,'Discipline must respect a child’s dignity (Article 28). Name-calling is never allowed.'],['Lose his turn on the tablet',0,'Tablet time is a privilege. Losing it is allowed.'],
 ['Not be allowed to explain his side',1,'Every child has the right to be heard (Article 12), even after breaking a rule.']];
const CLASH=[{who:['Ben: play football','Sara: play tag'],o:['Ben keeps the whole field','Split the field or take turns','Nobody plays at all'],a:1,tip:[.35,0,-.3],
  no:['Then only Ben gets his right to play. Sara has it too.','','Now nobody gets the right to play. A fair fix keeps it for both.']},
 {who:['Mo: share his photos','Lily: privacy'],o:['Keep it up, it is funny','Post one of Mo back','Delete it and ask first next time'],a:2,tip:[.35,-.2,0],
  no:['Lily did not agree. Her right to privacy (Article 16) is being broken.','Two wrongs: now Mo’s privacy is broken too.','']},
 {who:['Priya: read quietly','Group: chat and play'],o:['Agree a quiet corner and a chat corner','Priya should just leave','Shout at them to stop'],a:0,tip:[0,-.35,.25],
  no:['','Then only the group gets their right. Priya has a right to rest and learn too.','Shouting is not respectful. A fair fix keeps both rights.']}];
const LANES=['The government','Parents or carers','Children like you'];
const DUTY=[['Free schools and teachers for every child',0,'Governments must provide free primary education (Article 28).'],
 ['A safe, loving home with food and care',1,'Parents or carers have the first duty to bring up the child (Article 18), with help from the government.'],
 ['Everyone in your class gets a turn to speak',2,'Children respect rights too: giving others a turn protects their right to be heard.']];
VIS.reg('flagrights',c=>{let A,pad,quiz,qn=-1,gen=0,run=0;
const clean=()=>({k:0,n:0,goal:3,hold:0,err:-1,got:[],chosen:-1,tilt:0,hand:null,boxes:[],after:()=>{},fast:0}),S=clean();
const part=()=>['deck','mirror','shield','clash','duty','quiz'][A.step];
const q=v=>Math.round(v*(A.narrow?1:1.1)),brisk=()=>A.reduced()||S.fast;
const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function words(g,t,x,y,mw,px,col,wt){g.font=`${wt||700} ${q(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const out=[];for(const w of String(t).split(' ')){const last=out.length-1,cand=last<0?w:out[last]+' '+w;if(last>=0&&g.measureText(cand).width<=mw)out[last]=cand;else out.push(w)}
 out.forEach((s,i)=>g.fillText(s,x,y+(i-(out.length-1)/2)*q(px)*1.25))}
function plate(g,r,mood,lw){const C=A.col,ring={ok:C.gr,bad:C.rd,hot:C.am,cool:C.cy}[mood]||C.ln,tint={ok:C.gr,bad:C.rd,hot:C.am,cool:C.cy}[mood];
 g.save();A.paint.shadow(7,2,.13);g.fillStyle=tint?A.mix(C.pn,tint,.17):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow();g.lineWidth=lw||(mood?3:1.5);g.strokeStyle=ring;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
function kid(g,x,y,s,col){g.fillStyle=col;g.beginPath();g.arc(x,y-s*.9,s*.42,0,7);g.fill();g.beginPath();g.moveTo(x-s*.55,y+s*.6);g.quadraticCurveTo(x,y-s*.75,x+s*.55,y+s*.6);g.closePath();g.fill()}
const row3=(top,h)=>{const n=3,gap=8,w=(A.W-24-gap*(n-1))/n;return[0,1,2].map(i=>({x:12+i*(w+gap),y:top,w,h}))};
const bins=()=>[{x:12,y:A.H*.62,w:A.W/2-18,h:A.H*.3},{x:A.W/2+6,y:A.H*.62,w:A.W/2-18,h:A.H*.3}];
const cardAt=()=>{const w=Math.min(A.W*.7,q(300)),h=q(84),d=S.hand;return{x:(d&&d.x!=null?d.x:A.W/2)-w/2,y:(d&&d.x!=null?d.y:A.H*.33)-h/2,w,h}};
const shieldCards=()=>{const cols=A.narrow?1:2,gap=8,h=A.narrow?q(46):q(56),w=(A.W-24-gap*(cols-1))/cols;return SHIELD.map((_,i)=>({x:12+(i%cols)*(w+gap),y:A.H*.3+Math.floor(i/cols)*(h+gap),w,h}))};
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=part();
 if(p==='quiz'){words(g,'Every child has the same rights. Respecting them for others is your part.',W/2,H*.45,W-40,18,C.tx,800);return}
 if(p==='deck'){words(g,'Drag the card to Right or Want, or tap a box.',W/2,H*.07,W-30,16,C.tx,800);const b=bins();S.boxes=b;
  ['Right (every child has it)','Want (nice, not needed)'].forEach((t,i)=>{plate(g,b[i],S.err===i?'bad':i?'hot':'cool',2.5);words(g,t,b[i].x+b[i].w/2,b[i].y+q(20),b[i].w-10,14,C.tx,800);
   const inBox=S.got.filter(j=>DECK[j][1]===(i?0:1));inBox.forEach((j,m)=>words(g,'✓ '+DECK[j][0],b[i].x+b[i].w/2,b[i].y+q(46)+m*q(19),b[i].w-10,12,C.tx,600))});
  if(S.k<DECK.length&&S.n<S.goal){const r=cardAt();plate(g,r,'',2.5);words(g,DECK[S.k][0],r.x+r.w/2,r.y+r.h/2,r.w-20,19,C.tx,800)}}
 if(p==='mirror'){const m=MIRROR[S.k];words(g,m.r,W/2,H*.1,W-30,15,C.tx,800);const y=H*.42,s=q(30);
  kid(g,W*.28,y,s,C.vi);kid(g,W*.72,y,s,S.chosen>=0?C.gr:A.alpha(C.mu,.6));words(g,'You',W*.28,y+s*1.2,W/3,14,C.tx,800);words(g,'Everyone else',W*.72,y+s*1.2,W/3,14,C.tx,800);
  g.strokeStyle=C.am;g.lineWidth=3;g.setLineDash([6,6]);g.beginPath();g.moveTo(W*.36,y-s*.6);g.lineTo(W*.64,y-s*.6);g.stroke();g.setLineDash([]);words(g,'same right',W/2,y-s*.95,W/3,12,C.mu,700);
  if(S.chosen>=0)words(g,'✓ '+m.o[m.a],W/2,y+s*2.1,W-30,15,C.gr,800);
  const rs=row3(H*.72,q(64));S.boxes=rs;rs.forEach((r,i)=>{if(S.chosen>=0)return;const d=S.hand&&S.hand.i===i&&S.hand.x!=null,rr=d?{...r,x:S.hand.x-r.w/2,y:S.hand.y-r.h/2}:r;plate(g,rr,S.err===i?'bad':'hot');words(g,m.o[i],rr.x+rr.w/2,rr.y+rr.h/2,rr.w-12,14,C.tx,700)})}
 if(p==='shield'){words(g,'Jake broke a class rule. Tap the 3 things that would break one of his rights.',W/2,H*.08,W-30,15,C.tx,800);const jx=W/2,jy=H*.2;
  g.strokeStyle=A.alpha(C.cy,.8);g.lineWidth=4;g.beginPath();g.arc(jx,jy,q(34),0,7);g.stroke();kid(g,jx,jy+q(10),q(18),C.vi);
  const rs=shieldCards();S.boxes=rs;rs.forEach((r,i)=>{const f=S.got.includes(i);plate(g,r,f?'ok':S.err===i?'bad':'');words(g,(f?'Not allowed: ':'')+SHIELD[i][0],r.x+r.w/2,r.y+r.h/2,r.w-14,14,C.tx,700)})}
 if(p==='clash'){const m=CLASH[S.k],cx=W/2,cy=H*.38,L=Math.min(W*.38,q(220)),a=S.tilt;words(g,S.chosen>=0?'Balanced: both rights are kept.':'Two rights clash. Find the fair fix that keeps both.',W/2,H*.07,W-30,15,S.chosen>=0?C.gr:C.tx,800);
  g.fillStyle=C.mu;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx-q(16),cy+q(60));g.lineTo(cx+q(16),cy+q(60));g.closePath();g.fill();
  g.save();g.translate(cx,cy);g.rotate(a);g.strokeStyle=C.tx;g.lineWidth=4;g.beginPath();g.moveTo(-L,0);g.lineTo(L,0);g.stroke();g.restore();
  [-1,1].forEach((sd,i)=>{const px=cx+sd*L*Math.cos(a),py=cy+sd*L*Math.sin(a),w=Math.min(L*.9,W*.42),r={x:Math.max(6,Math.min(W-6-w,px-w/2)),y:py+q(6),w,h:q(48)};plate(g,r,i?'hot':'cool',2);words(g,m.who[i],px,r.y+r.h/2,r.w-8,13,C.tx,800)});
  const rs=row3(H*.7,q(70));S.boxes=rs;rs.forEach((r,i)=>{if(S.chosen>=0&&i!==m.a)return;const d=S.hand&&S.hand.i===i&&S.hand.x!=null,rr=d?{...r,x:S.hand.x-r.w/2,y:S.hand.y-r.h/2}:r;plate(g,rr,S.chosen===i?'ok':S.err===i?'bad':'');words(g,m.o[i],rr.x+rr.w/2,rr.y+rr.h/2,rr.w-12,13,C.tx,700)})}
 if(p==='duty'){words(g,'Whose job is it to make this right happen?',W/2,H*.06,W-30,15,C.tx,800);const lanes=row3(H*.58,H*.36);S.boxes=lanes;
  lanes.forEach((r,i)=>{plate(g,r,S.err===i?'bad':['cool','hot',''][i],2.5);words(g,LANES[i],r.x+r.w/2,r.y+q(22),r.w-10,13,C.tx,800);
   S.got.filter(j=>DUTY[j][1]===i).forEach((j,m)=>words(g,'✓ '+DUTY[j][0],r.x+r.w/2,r.y+q(62)+m*q(40),r.w-10,11,C.tx,600))});
  if(S.k<DUTY.length&&S.n<S.goal){const r=cardAt();r.y=S.hand&&S.hand.x!=null?r.y:H*.2;plate(g,r,'',2.5);words(g,DUTY[S.k][0],r.x+r.w/2,r.y+r.h/2,r.w-20,16,C.tx,800)}}
 A.fx.draw(g)}
function oops(t,j){A.sound.miss();S.err=j==null?-1:j;voice(t);setTimeout(()=>{S.err=-1;A.redraw()},brisk()?10:1300);A.redraw()}
function yes(t,stay){S.n++;A.sound.pop();if(S.n<S.goal&&!stay){const r0=S.k,g0=gen;S.hold=1;setTimeout(()=>{if(S.k!==r0||g0!==gen)return;Object.assign(S,{hold:0,k:S.k+1,chosen:-1,tilt:part()==='clash'?CLASH[S.k+1].tip[0]:0});voice(t+' Next one.');pads();A.redraw()},brisk()?5:1400)}
 else S.hold=!stay;voice(t);pads();A.redraw();S.after()}
function sortCard(bin){if(part()!=='deck'||S.k>=DECK.length||S.n>=S.goal)return;const d=DECK[S.k],isRight=bin===0;
 if(isRight!==!!d[1])return oops(d[1]?`${d[0]} is a right for every child (${d[2]}). It is needed to live, grow and be safe.`:`${d[0]} is nice to have, but it is a want. Children can live, grow and be safe without it.`,bin);
 S.got.push(S.k);S.k++;S.n++;A.sound.pop();voice(`${d[0]}: ${d[1]?'a right, '+d[2]:'a want'}.`+(S.n<S.goal?' Next card.':''));pads();A.redraw();S.after()}
function mirror(i){if(part()!=='mirror'||S.hold)return;const m=MIRROR[S.k];if(i!==m.a)return oops(m.no[i],i);S.chosen=i;yes(`Yes: ${m.o[i]}. Everyone else has the same right.`)}
function shield(i){if(part()!=='shield'||S.n>=S.goal||S.got.includes(i))return;const s=SHIELD[i];if(!s[1])return oops(s[2],i);S.got.push(i);yes(s[2],1)}
function fix(i){if(part()!=='clash'||S.hold)return;const m=CLASH[S.k];A.tween(S,{tilt:m.tip[i]},brisk()?1:500,'out');if(i!==m.a)return oops(m.no[i],i);S.chosen=i;yes(`${m.o[i]}: both rights are kept.`)}
function duty(l){if(part()!=='duty'||S.k>=DUTY.length||S.n>=S.goal)return;const d=DUTY[S.k];if(l!==d[1])return oops(`Not mainly ${LANES[l].toLowerCase()}. ${d[2]}`,l);
 S.got.push(S.k);S.k++;S.n++;A.sound.pop();voice(d[2]+(S.n<S.goal?' Next card.':''));pads();A.redraw();S.after()}
function pads(){if(!pad)return;pad.innerHTML='';const p=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(p==='quiz'||S.n>=S.goal||S.hold)return;
 if(p==='deck'){const t=DECK[S.k][0];B('Right',()=>sortCard(0),t+' is a right');B('Want',()=>sortCard(1),t+' is a want')}
 if(p==='mirror')MIRROR[S.k].o.forEach((t,i)=>B(t,()=>mirror(i)));
 if(p==='shield')SHIELD.forEach((s,i)=>{if(!S.got.includes(i))B(s[0],()=>shield(i),'Breaks a right: '+s[0])});
 if(p==='clash')CLASH[S.k].o.forEach((t,i)=>B(t,()=>fix(i),'Fix: '+t));
 if(p==='duty')LANES.forEach((t,i)=>B(t,()=>duty(i),DUTY[S.k][0]+': '+t))}
const hit=(pt,r,m)=>(m=m||0,pt.x>r.x-m&&pt.x<r.x+r.w+m&&pt.y>r.y-m&&pt.y<r.y+r.h+m);
function down(pt){const p=part();if(p==='quiz'||S.hold||S.n>=S.goal)return false;
 if((p==='deck'||p==='duty')&&hit(pt,cardAt(),6)){S.hand={x:null,x0:pt.x,y0:pt.y};return true}
 const i=S.boxes.findIndex(r=>hit(pt,r,3));if(i<0)return false;
 if(p==='deck')sortCard(i);if(p==='duty')duty(i);if(p==='shield')shield(i);
 if((p==='mirror'&&S.chosen<0)||(p==='clash'&&S.chosen<0)){S.hand={i,x:null,x0:pt.x,y0:pt.y};return true}return false}
function move(pt){const d=S.hand;if(!d)return;if(d.x!=null||Math.hypot(pt.x-d.x0,pt.y-d.y0)>8){d.x=pt.x;d.y=pt.y;A.redraw()}}
function up(pt){const d=S.hand,p=part();S.hand=null;if(!d)return;
 if(p==='deck'||p==='duty'){if(d.x==null){voice('Drag the card into a box, or tap a box.');return A.redraw()}const i=S.boxes.findIndex(r=>hit(pt,r,16));if(i>=0)(p==='deck'?sortCard:duty)(i);else{voice('Drop the card in one of the boxes.');A.redraw()}return}
 if(d.x==null||pt.y<A.H*.66)return(p==='mirror'?mirror:fix)(d.i);voice(p==='mirror'?'Drag the choice up to Everyone else.':'Drag the fix up onto the balance.');A.redraw()}
const finish=(i,msg)=>()=>{if(A.step===i&&S.n>=S.goal&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++gen,go=()=>{if(k!==gen||S.n>=S.goal)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{gen++;Object.assign(S,clean())};
function oneMove(){const p=part();if(S.hold)return;if(p==='deck')return sortCard(DECK[S.k][1]?0:1);if(p==='mirror')return mirror(MIRROR[S.k].a);
 if(p==='shield')return shield(SHIELD.findIndex((s,i)=>s[1]&&!S.got.includes(i)));if(p==='clash')return fix(CLASH[S.k].a);if(p==='duty')return duty(DUTY[S.k][1])}
const show=i=>()=>{steps[i].go();S.fast=1;auto(oneMove)};
const steps=[
{h:'Right or want?',p:'A right is something every child needs to live, grow, be safe and be heard. Sort each card.',predict:{q:'Is having your own phone a right?',opts:['Yes, every child needs one','No, it is a want'],ans:1},task:'Sort 6 cards',show:show(0),
 go:()=>{reset();S.goal=6;voice('Is it a right or a want? Drag the card or tap a box.');pads();S.after=finish(0,'Rights are what every child needs. The UN Convention on the Rights of the Child sets them out: 42 of its 54 articles give rights.')}},
{h:'Same right for all',p:'Your rights belong to everyone else too. Drag the choice that respects their same right onto Everyone else.',predict:{q:'You have the right to be listened to. What does that mean for other people?',opts:['They have it too, so I listen to them','Only I get listened to'],ans:0},task:'Match 3 rights',show:show(1),
 go:()=>{reset();voice('Which choice respects everyone else’s same right?');pads();S.after=finish(1,'Rights are universal. Your responsibility is to respect the same rights in other people.')}},
{h:'Can rights be lost?',p:'Jake broke a rule. Some things can be taken away. Rights cannot. Tap the 3 things that are never allowed.',predict:{q:'If Jake breaks a rule, does he lose his right to be safe?',opts:['Yes, rights have to be earned','No, rights cannot be taken away'],ans:1},task:'Find 3',show:show(2),
 go:()=>{reset();voice('Tap the 3 things that would break one of Jake’s rights.');pads();S.after=finish(2,'Privileges like golden time can be lost. Rights like food, dignity and being heard cannot.')}},
{h:'When rights clash',p:'Sometimes two people’s rights seem to clash. Drag or tap the fix that keeps the balance level.',task:'Balance 3 clashes',show:show(3),
 go:()=>{reset();S.tilt=CLASH[0].tip[0];voice('Find the fair fix that keeps both rights.');pads();S.after=finish(3,'A fair fix keeps both people’s rights: share, take turns, ask first.')}},
{h:'Whose job?',p:'Adults and governments are the duty bearers: they must make rights happen. Children respect rights too. Drag each card to the right box.',task:'Place 3 cards',show:show(4),
 go:()=>{reset();voice('Whose job is it? Drag the card or tap a box.');pads();S.after=finish(4,'Governments and families must provide rights. Your part is to respect other people’s rights.')}},
{h:'Challenge',p:'',go:()=>{reset();challenge()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Which of these is a right for every child?',[['To be safe from harm','ok'],['To have the latest trainers','want'],['To always get your own way','way']]],
 ['Ana keeps interrupting in class. Does she lose her right to be heard?',[['No, but she should let others speak too','ok'],['Yes, she has to earn it back','earn'],['Yes, until she says sorry','earn']]],
 ['Who has the main duty to make sure every child can go to school?',[['The government','ok'],['The child','child'],['A shop','shop']]],
 ['Two groups want the same table at lunch. What is the fair fix?',[['Share it or take turns','ok'],['The bigger group takes it','big'],['Nobody uses it','none']]],
 ['You have the right to say what you think. What is your responsibility?',[['Let others say what they think too','ok'],['Say it louder than anyone','loud'],['Never disagree with anyone','silent']]]];
function why(t){let m='Every child has the same rights, and respecting them in others is your part.';
 if(t==='want')m='Trainers are a want. A right is something every child needs to live, grow and be safe.';if(t==='way')m='Nobody has a right to always get their way. That would break other people’s rights.';
 if(t==='earn')m='Rights are not earned or lost by behaviour. A privilege can be taken away; a right cannot.';if(t==='child')m='Children have a right to education. Making schools exist is the government’s duty.';
 if(t==='shop')m='A shop is not a duty bearer. Governments must provide free schools.';if(t==='big')m='Being bigger does not give more rights. Both groups have the same rights.';
 if(t==='none')m='Taking it from everyone is not fair either. A fair fix keeps the rights of both groups.';if(t==='loud')m='Shouting others down takes away their same right to be heard.';
 if(t==='silent')m='You can disagree. Respect means letting others speak and disagreeing kindly.';return m}
function challenge(){qn++;const[qq,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});voice('Challenge: '+qq);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Stars in a row: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=challenge}
A=FK.shell(c,{steps,ratio:.64,tall:1.3,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}});
A.start()})})();
