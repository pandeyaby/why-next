/* Flagship – peer pressure and resisting it (ages 9–11; PSHE KS2 dares and peer influence; Asch 1956 line study).
   Helpful vs harmful pushes, name the trick, trust your eyes against a crowd (and one ally), hold your line, where is the line. */
(()=>{
const PUSH=[['Come to football club with us!',0],['Just take one sweet. Nobody will see.',1],['You can do it, try the climbing wall!',0],
['Post that funny photo of Sam. He will not mind.',1],['Join our reading club, it is fun.',0],['Everyone is skipping homework. Why bother?',1]];
const TRICKS=[{k:'dare',n:'Dare or tease'},{k:'all',n:'"Everyone does it"'},{k:'once',n:'"Just this once"'},{k:'friend',n:'"Real friends would"'}];
const MSG=[{t:'Go on, are you scared or something?',k:'dare'},{t:'Literally everyone in our class has done it.',k:'all'},
{t:'It is only one time. It does not count.',k:'once'},{t:'If you were my real friend, you would.',k:'friend'}];
const ROUNDS=[{lens:[.55,.85,.4],ref:.85,ok:1,crowd:[0,0,0,0,0]},{lens:[.62,.48,.3],ref:.3,ok:2,crowd:[0,0,0,0,0]},{lens:[.7,.45,.9],ref:.45,ok:1,crowd:[2,2,1,2,2]}];
const LINE=[{say:'Come on, just once!',opts:[['No thanks. I don\u2019t want to.','firm'],['Fine, I\u2019ll do it.','cave'],['You\u2019re all so stupid.','attack']]},
{say:'What, are you scared?',opts:[['Ha, nice try. I\u2019m off to the swings.','humour'],['No! OK, give it here.','cave'],['Shut up, idiot.','attack']]},
{say:'Fine. We\u2019ll go without you.',opts:[['OK. See you later.','walk'],['Wait, I\u2019ll come!','cave'],['Nobody likes you anyway.','attack']]}];
const WHY={firm:'A clear no with a short reason. You do not owe a long speech.',humour:'A joke and a new plan takes the heat out and lets you leave.',walk:'Walking away is allowed. Dropping you for a no is pushing, not friendship.',
cave:'Giving in makes the next push easier, and you still did it.',attack:'An insult starts a fight and the group pushes harder. Say no without hurting anyone.'};
const ZONE=[['Try a new sport because your friends do',0],['Laugh at a joke about a kid\u2019s family',1],['Wear your team\u2019s colours like your mates',0],
['Share someone\u2019s photo without asking',1],['Read the book everyone is talking about',0],['Keep a secret that someone is getting hurt',1],['Join a game at break',0],['Leave a kid out because the group says so',1]];
VIS.reg('flagpeer',c=>{let A,ctl,chal,q=-1,tok=0;const M={};
const DARK='#0f172a',GREEN='#047857',RED='#b91c1c',GREY='#64748b',HELP='#065f46',HELPF='#d1fae5',HARM='#9f1239',HARMF='#ffe4e6',YOU='#6d28d9',CROWD='#475569';
const font=(n,b)=>`${b||700} ${n}px system-ui,sans-serif`,sz=n=>A.narrow?n:Math.round(n*1.18);
const which=()=>['push','trick','lines','hold','zone','quiz'][A.step],inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const good=()=>A.sound.pop(),bad=()=>A.sound.miss();
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ecfeff',A.col.dark?.05:.4);g.fillRect(0,0,A.W,A.H)}
function banner(t,y,ok){const g=A.ctx;let n=sz(13);g.font=font(n,800);let w=g.measureText(t).width+28;while(w>A.W-12&&n>10){n--;g.font=font(n,800);w=g.measureText(t).width+28}
const h=n+16,x=Math.max(6,Math.min(A.W-w-6,A.W/2-w/2));g.fillStyle='#ffffff';A.paint.rrect(x,y-h/2,w,h,h/2);g.fill();g.strokeStyle=ok?GREEN:GREY;g.lineWidth=ok?3:1.5;g.stroke();
g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x+w/2,y+1)}
function wrapText(t,x,y,maxW,n,col,b){const g=A.ctx;g.font=font(n,b||700);g.fillStyle=col||DARK;g.textAlign='center';g.textBaseline='middle';const out=[];let cur='';
t.split(' ').forEach(w=>{const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>maxW&&cur){out.push(cur);cur=w}else cur=tr});if(cur)out.push(cur);
out.forEach((s,i)=>g.fillText(s,x,y+(i-(out.length-1)/2)*n*1.25));return out.length}
function card(b,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.lineWidth=o.on||o.miss||o.held?4:2;g.strokeStyle=o.on?GREEN:o.miss?RED:o.held?'#1d4ed8':(o.edge||GREY);g.stroke();
if(t)wrapText(t,b.x+b.w/2,b.y+b.h/2,b.w-16,o.n||sz(15),o.ink||DARK,800)}
function chat(t,x,y,w,mine){const g=A.ctx,n=sz(15);g.font=font(n,700);const lines=Math.max(1,Math.ceil(g.measureText(t).width/(w-24))),h=lines*n*1.3+18;
g.fillStyle=mine?'#ede9fe':'#ffffff';A.paint.rrect(x,y,w,h,14);g.fill();g.strokeStyle=mine?YOU:GREY;g.lineWidth=2;g.stroke();wrapText(t,x+w/2,y+h/2,w-20,n,DARK);return h}
/* step 1: helpful or harmful push */
function pushBins(){const w=(A.W-30)/2,h=A.H*.3;return[{x:10,y:A.H*.64,w,h},{x:20+w,y:A.H*.64,w,h}]}
function pushCard(){const w=Math.min(sz(330),A.W*.88),h=sz(78);return{x:A.W/2-w/2,y:A.H*.2,w,h}}
function drawBox(list,s,n,head,names){const g=A.ctx;ground();banner(head,A.H*.08,s.k>=n);
pushBins().forEach((b,j)=>{card(b,null,{bg:j?HARMF:HELPF,edge:j?HARM:HELP});g.fillStyle=j?HARM:HELP;g.font=font(sz(14),800);g.textAlign='center';g.textBaseline='top';g.fillText(names[j],b.x+b.w/2,b.y+8);
g.fillStyle=DARK;g.font=font(sz(22),800);g.textBaseline='middle';g.fillText(String(list.slice(0,s.k).filter(x=>x[1]===j).length),b.x+b.w/2,b.y+b.h*.6)});
if(s.k<n){const b=pushCard(),d=M.drag;card(d?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b,list[s.k][0],{held:!!d,miss:s.miss,n:sz(15)})}}
const drawPush=()=>drawBox(PUSH,M.p,6,M.p.k>=6?'All 6 sorted':`Push ${M.p.k+1} of 6: helpful or harmful?`,['Helpful push','Harmful push']);
function sortPush(j){const s=M.p;if(s.k>=6)return;const [t,h]=PUSH[s.k];if(j!==h){s.miss=1;bad();return speak(h?`"${t}" pushes you to do something unkind or against the rules. That is a harmful push.`:`"${t}" pushes you to try something good for you. Friends can push you in a helpful way too.`)}
s.k++;s.miss=0;good();speak((h?'Harmful: it pushes you towards something wrong or unkind.':'Helpful: peer pressure can be positive.')+(s.k>=6?' All 6 sorted.':''))}
/* step 2: name the trick */
function trickTiles(){const w=(A.W-30)/2,h=sz(56);return TRICKS.map((t,i)=>({x:10+(i%2)*(w+10),y:A.H*.56+Math.floor(i/2)*(h+10),w,h}))}
function drawTrick(){const s=M.t;ground();if(s.k>=4){banner('All 4 tricks named',A.H*.08,1);MSG.forEach((m,i)=>banner(`${TRICKS.find(t=>t.k===m.k).n}: ${m.t}`,A.H*(.25+i*.17),1));return}
banner(`Message ${s.k+1} of 4: which trick is this?`,A.H*.08);chat(MSG[s.k].t,A.W*.08,A.H*.18,A.W*.84);
trickTiles().forEach((b,i)=>card(b,TRICKS[i].n,{miss:s.miss===i,n:sz(14)}))}
function pickTrick(i){const s=M.t;if(s.k>=4)return;const m=MSG[s.k];if(TRICKS[i].k!==m.k){s.miss=i;bad();
return speak({dare:'It calls you scared so you try to prove you are not: a dare or tease.',all:'It says everyone has done it, so no feels odd.',once:'It makes the wrong thing sound small: only once.',friend:'It uses your friendship as the prize.'}[m.k])}
s.k++;s.miss=null;good();speak({dare:'Dare or tease: it makes saying no feel like losing.',all:'"Everyone does it": usually not true, and still not a reason.',once:'"Just this once": one time still counts.',friend:'"Real friends would": a real friend accepts your no.'}[m.k]+(s.k>=4?' All 4 named.':''))}
/* step 3: the line test (Asch) */
function lineGeom(){const top=A.H*.2,base=A.H*.62,u=base-top,cx=[.5,.67,.84].map(f=>f*A.W);return{top,base,u,refX:A.W*.18,cx}}
function drawLines(){const s=M.l,g=A.ctx;ground();if(s.k>=3){banner('All 3 rounds done',A.H*.08,1);
wrapText(`You chose what you saw ${s.own} of 3 times.`,A.W/2,A.H*.3,A.W-40,sz(17),A.col.tx);wrapText('In Asch\u2019s study, about 3 in 4 people went along with a wrong group at least once.',A.W/2,A.H*.5,A.W-40,sz(15),A.col.tx);
wrapText('With one ally, going along fell from about 1 in 3 answers to about 1 in 20.',A.W/2,A.H*.72,A.W-40,sz(15),A.col.tx);return}
const r=ROUNDS[s.k],G=lineGeom();banner(`Round ${s.k+1} of 3: which line matches the one on the left?`,A.H*.08);
g.lineCap='round';g.strokeStyle=A.col.tx;g.lineWidth=7;g.beginPath();g.moveTo(G.refX,G.base);g.lineTo(G.refX,G.base-r.ref*G.u);g.stroke();g.fillStyle=A.col.tx;g.font=font(sz(14),800);g.textAlign='center';g.textBaseline='top';g.fillText('Match me',G.refX,G.base+8);
r.lens.forEach((v,i)=>{g.strokeStyle=s.miss===i?RED:YOU;g.beginPath();g.moveTo(G.cx[i],G.base);g.lineTo(G.cx[i],G.base-v*G.u);g.stroke();g.fillStyle=A.col.tx;g.font=font(sz(18),800);g.textAlign='center';g.textBaseline='top';g.fillText('ABC'[i],G.cx[i],G.base+6)});
const n=r.crowd.length,show=Math.min(n,s.seen),w=(A.W-20)/n;for(let i=0;i<show;i++){const x=10+i*w+w/2,y=A.H*.86,ally=r.crowd[i]===r.ok;g.fillStyle=ally?GREEN:CROWD;g.beginPath();g.arc(x,y,sz(15),0,7);g.fill();
g.fillStyle='#ffffff';g.font=font(sz(14),800);g.textAlign='center';g.textBaseline='middle';g.fillText('ABC'[r.crowd[i]],x,y+1)}}
function crowdTalk(){const s=M.l,me=tok;if(s.k>=3)return;s.seen=0;const r=ROUNDS[s.k];r.crowd.forEach((_,i)=>setTimeout(()=>{if(me===tok){s.seen=i+1;A.redraw()}},120*(i+1)))}
function pickLine(i){const s=M.l;if(s.k>=3)return;const r=ROUNDS[s.k];s.seen=r.crowd.length;
if(i!==r.ok){s.miss=i;bad();return speak(i===r.crowd[0]?`You went with the crowd. Look at the lines, not the people: ${'ABC'[r.ok]} matches.`:`Look again: ${'ABC'[i]} is a different length. ${'ABC'[r.ok]} matches.`)}
s.own++;s.k++;s.miss=null;good();speak((r.crowd.some(x=>x===r.ok)?'One person agreed with you. An ally makes it much easier to trust your own eyes.':`Everyone said ${'ABC'[r.crowd[0]]}, but you said what you saw.`)+(s.k>=3?' All 3 rounds done.':''));crowdTalk()}
/* step 4: hold your line */
function holdOpts(){const h=sz(54),gap=8;return[0,1,2].map(i=>({x:12,y:A.H*.5+i*(h+gap),w:A.W-24,h}))}
function drawHold(){const s=M.h;ground();if(s.k>=3){banner('You held your line 3 times',A.H*.08,1);['No thanks. I don\u2019t want to.','Ha, nice try. I\u2019m off to the swings.','OK. See you later.'].forEach((t,i)=>banner(t,A.H*(.3+i*.18),1));return}
const r=LINE[s.k],m=(A.W-24)*Math.min(1,(s.k+1)/3);banner(`Push ${s.k+1} of 3: pick what you say`,A.H*.08);
const g=A.ctx;g.fillStyle=A.mix(A.col.pn,RED,.25);A.paint.rrect(12,A.H*.16,A.W-24,10,5);g.fill();g.fillStyle=RED;A.paint.rrect(12,A.H*.16,m,10,5);g.fill();
chat(r.say,A.W*.06,A.H*.24,A.W*.7);holdOpts().forEach((b,i)=>card(b,r.opts[i][0],{miss:s.miss===i,bg:'#faf5ff',edge:YOU,n:sz(15)}))}
function answer(i){const s=M.h;if(s.k>=3)return;const [t,k]=LINE[s.k].opts[i];if(k==='cave'||k==='attack'){s.miss=i;bad();return speak(WHY[k])}
s.k++;s.miss=null;good();speak(`"${t}" ${WHY[k]}`+(s.k>=3?' Three pushes, three noes.':''))}
/* step 5: where is the line? */
const drawZone=()=>drawBox(ZONE,M.z,8,M.z.k>=8?'All 8 decided':`Choice ${M.z.k+1} of 8: go along, or say no?`,['Fine to go along','Say no / tell']);
function sortZone(j){const s=M.z;if(s.k>=8)return;const [t,h]=ZONE[s.k];if(j!==h){s.miss=1;bad();
return speak(h?(/hurt/.test(t)?'Someone getting hurt is never a secret to keep. Tell a trusted adult.':`"${t}" hurts or leaves out someone else. Doing it with a group does not make it OK.`):`"${t}" harms nobody. Being like your friends is fine when nobody is hurt.`)}
s.k++;s.miss=0;good();speak((h?'Say no. Ask: could someone be hurt, or would I feel bad later?':'Fine: nobody is hurt and you still choose.')+(s.k>=8?' All 8 decided.':''))}
function draw(){const k=which();if(k==='quiz'){ground();banner('Challenge',A.H*.2,1);banner('Your choice, your line',A.H*.5);return}
({push:drawPush,trick:drawTrick,lines:drawLines,hold:drawHold,zone:drawZone})[k]();A.fx.draw(A.ctx)}
function onDown(p){const k=which();
if(k==='push'&&M.p.k<6){if(inside(p,pushCard())){M.drag={x:p.x,y:p.y};return true}const j=pushBins().findIndex(b=>inside(p,b));if(j>=0)sortPush(j);return false}
if(k==='trick'&&M.t.k<4){const i=trickTiles().findIndex(b=>inside(p,b));if(i>=0)pickTrick(i);return false}
if(k==='lines'&&M.l.k<3){const G=lineGeom(),i=G.cx.findIndex(x=>Math.abs(p.x-x)<Math.max(30,A.W*.07)&&p.y>G.top-20&&p.y<G.base+40);if(i>=0)pickLine(i);return false}
if(k==='hold'&&M.h.k<3){const i=holdOpts().findIndex(b=>inside(p,b));if(i>=0)answer(i);return false}
if(k==='zone'&&M.z.k<8){if(inside(p,pushCard())){M.drag={x:p.x,y:p.y};return true}const j=pushBins().findIndex(b=>inside(p,b));if(j>=0)sortZone(j)}return false}
function onMove(p){if(!M.drag)return;M.drag.x=p.x;M.drag.y=p.y;A.redraw()}
function onUp(p){if(!M.drag)return;M.drag=null;const k=which(),bins=k==='push'?pushBins():pushBins(),j=bins.findIndex(b=>inside(p,b));if(j>=0)(k==='push'?sortPush:sortZone)(j);else A.redraw()}
function fresh(){tok++;for(const k in M)delete M[k];Object.assign(M,{p:{k:0},t:{k:0},l:{k:0,own:0,seen:0},h:{k:0},z:{k:0},drag:null,test:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();M.test()}
function enter(i,desc,ok,msg){fresh();speak(desc);if(i===2)crowdTalk();M.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=tok;acts.forEach((f,j)=>setTimeout(()=>{if(me===tok)f()},ms*(j+1)))}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=which(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
if(k==='push'&&M.p.k<6){B('Helpful push',()=>sortPush(0));B('Harmful push',()=>sortPush(1))}
if(k==='trick'&&M.t.k<4)TRICKS.forEach((t,i)=>B(t.n,()=>pickTrick(i),`Trick: ${t.n}`));
if(k==='lines'&&M.l.k<3)['A','B','C'].forEach((t,i)=>B(`Line ${t}`,()=>pickLine(i)));
if(k==='hold'&&M.h.k<3)LINE[M.h.k].opts.forEach((o,i)=>B(o[0],()=>answer(i),`Say: ${o[0]}`));
if(k==='zone'&&M.z.k<8){B('Fine to go along',()=>sortZone(0));B('Say no / tell',()=>sortZone(1))}}
const steps=[
{h:'Helpful or harmful?',p:'Peer pressure is when people your age push you to think or act like them. Some pushes help you. Some push you towards something wrong.',
predict:{q:'Can peer pressure ever be a good thing?',opts:['No, it is always bad','Yes, friends can push you to try good things'],ans:1},task:'Sort all 6 pushes',
show:()=>demo(0,PUSH.map(x=>()=>sortPush(x[1])),500),
go:()=>enter(0,'Card: Come to football club with us! Boxes: helpful push, harmful push.',()=>M.p.k>=6,'Pushes towards good things help. Pushes towards unkind or risky things harm.')},
{h:'Name the trick',p:'Harmful pushes often use the same few tricks. Once you can name the trick, it loses some of its power.',task:'Name all 4 tricks',
show:()=>demo(1,MSG.map(m=>()=>pickTrick(TRICKS.findIndex(t=>t.k===m.k))),650),
go:()=>enter(1,'Message: Go on, are you scared or something? Four trick names to tap.',()=>M.t.k>=4,'Dares, "everyone does it", "just once" and "real friends would" are all pressure, not reasons.')},
{h:'Trust your eyes',p:'In a famous study, people judged which line matched. The others in the room were actors who all gave the same wrong answer. Watch the crowd answer, then choose what you see.',
predict:{q:'When the whole group gave a clearly wrong answer, how many people went along at least once?',opts:['Almost nobody','About 3 in 4 people'],ans:1},task:'Answer all 3 rounds',
show:()=>demo(2,ROUNDS.map(r=>()=>pickLine(r.ok)),900),
go:()=>enter(2,'A line on the left and lines A, B and C. Five people give their answers.',()=>M.l.k>=3,'A crowd can pull you away from what you know. One ally makes it much easier to stand firm.')},
{h:'Hold your line',p:'The push gets stronger each time. Pick a reply that says no without a fight. A joke or walking away also works.',
predict:{q:'Your friends say "Are you scared?" What usually works best?',opts:['Insult them back so they stop','Say no calmly and change the plan'],ans:1},task:'Get through all 3 pushes',
show:()=>demo(3,LINE.map(r=>()=>answer(r.opts.findIndex(o=>o[1]!=='cave'&&o[1]!=='attack'))),800),
go:()=>enter(3,'Push 1: Come on, just once! Three replies to choose from.',()=>M.h.k>=3,'A calm no, a joke, or walking away. You never have to prove anything.')},
{h:'Where is the line?',p:'Being like your friends is often fine. Ask two questions: could someone be hurt? Would I feel bad about it later? If yes, say no or tell a trusted adult.',task:'Decide all 8 choices',
show:()=>demo(4,ZONE.map(x=>()=>sortZone(x[1])),480),
go:()=>enter(4,'Card: Try a new sport because your friends do. Boxes: fine to go along, say no or tell.',()=>M.z.k>=8,'Harmless copying is fine. Hurting, leaving out or keeping someone\u2019s pain a secret is not.')},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.test()});
const QS=[
{q:'Which of these is peer pressure?',a:'Friends daring you to take a sweet from a shop',o:[['Deciding on your own to eat a sweet','alone'],['A teacher setting homework','adult']]},
{q:'"Everyone in our class has a phone." Is that a good reason?',a:'No. Even if it were true, you still choose',o:[['Yes, if everyone does it, it is fine','norm'],['Yes, if a friend says it','friend']]},
{q:'Your friend says "Just this once!" What is the trick?',a:'It makes the wrong thing sound small',o:[['It is not a trick, once is fine','once'],['It is a helpful push','helpful']]},
{q:'A group keeps giving a wrong answer. What helps most to stay with yours?',a:'One person who agrees with you',o:[['Staying quiet','quiet'],['Shouting at the group','attack']]},
{q:'Friends dare you to post a mean photo. What is a strong reply?',a:'"No. That\u2019s not fair on her." Then leave',o:[['"OK, but just one."','once'],['"You\u2019re all losers."','attack']]},
{q:'Someone says they are being hurt and asks you to keep it secret. What do you do?',a:'Tell a trusted adult',o:[['Keep the secret, a friend asked','secret'],['Tell the group chat','spread']]}];
function why(t){let m='Ask: is someone pushing me towards something I know is wrong?';
if(t==='alone')m='Nobody is pushing you there. Peer pressure comes from people your age.';
if(t==='adult')m='A teacher is an adult in charge, not a peer. Peer pressure comes from people your age.';
if(t==='norm')m='"Everyone does it" is a trick. It is often not true, and it is still your choice.';
if(t==='friend')m='A friend saying it does not make it a reason. Real friends accept your no.';
if(t==='once')m='"Just once" makes it sound small, but one time still counts.';
if(t==='helpful')m='A helpful push leads to something good. This one pushes you to do wrong.';
if(t==='quiet')m='Staying quiet lets the crowd win. In the line study, one ally made the biggest difference.';
if(t==='attack')m='Insults start a fight and make the group push harder. A calm, firm no works better.';
if(t==='secret')m='If someone is being hurt, it is never a secret to keep. Tell a trusted adult.';
if(t==='spread')m='Telling the group can make it worse. A trusted adult can actually help.';
return m}
function next(){q++;const Q=QS[q%QS.length],all=[[Q.a,'ok'],...Q.o],r=q%3,ord=all.slice(r).concat(all.slice(0,r));
chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const box=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else bad();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{chal.hidden=B.step!==5;ctl.hidden=B.step===5;pads()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Peer pressure buttons'},bx);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:onDown,move:onMove,up:onUp});pads()}}).start()})})();
