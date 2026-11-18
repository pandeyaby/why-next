/* Flagship – roles in a group (ages 7–9): four friends build a treehouse. Too many leaders stalls the build until the
   learner hands out the other badges (ideas person, supporter, peacemaker); match what people say to their role; fix
   three teams by dropping in the missing role; take one role away at a time and watch what breaks; then pick your own
   role and read its strength. Every drag has a big button twin, and the canvas label says what just happened. */
(()=>{
const ROLES=[['👑','Leader','keeps the plan and helps each friend know their job'],['💡','Ideas person','thinks of new things to try'],
 ['🤝','Supporter','helps build and cheers the others on'],['🕊️','Peacemaker','helps both sides be heard, then find a fix']];
const PALS=[['🦊','Fox'],['🐻','Bear'],['🦉','Owl'],['🐰','Rabbit']];
const SAYS=[['“What if we add a rope ladder?”',1,'A new thing to try is an idea.'],['“Floor first, then walls. Fox, you saw. Bear, you hold.”',0,'Making the plan and giving out jobs is what a leader does.'],
 ['Holds the plank still and says “Great job!”',2,'Helping build and cheering is the supporter’s job.'],['“Owl, tell us your plan. Then Rabbit can tell hers.”',3,'Letting both sides be heard is what a peacemaker does.']];
const GAPS=[[[0,1,2],3,'Owl and Rabbit argue about the roof. Nobody helps them sort it out.'],[[0,2,3],1,'“What shall we build?” Nobody has an idea, so they are stuck.'],
 [[1,2,3],0,'Lots of ideas, but no plan. Each friend builds a different thing!']];
const LOSE=['No leader: there is no plan, and two friends build the same wall.','No ideas person: the team cannot think what to add, so the treehouse stays plain.',
 'No supporter: great plans, but nobody holds the planks, so nothing gets built.','No peacemaker: Owl and Rabbit argue, and the work stops.'];
const MINE=['Leaders keep the team on track. Watch out: let others talk first, and do not boss.','Ideas people help a team try new things. Watch out: if the team picks a different idea, help with it.',
 'Supporters make the plan real and keep spirits up. That is a big job, not a small one.','Peacemakers keep the team working together. They do not pick a winner; they help both sides find a fix.'];
VIS.reg('flagroles',c=>{let A,pad,qb,qi=-1,gen=0,run=0;c.fig.classList.add('young');
const fresh=()=>({next:()=>{},n:0,role:[0,1,2,3],tray:[],grab:null,bad:-1,glow:-1,round:0,out:-1,seen:[],pick:-1}),S=fresh();
const mode=()=>['boss','match','gap','drop','me','quiz'][A.step],quick=()=>A.reduced();
const goal=()=>({boss:3,match:4,gap:3,drop:3,me:2}[mode()]||99);
const big=n=>Math.round(n*(A.narrow?1.12:1.18));
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function write(g,t,x,y,n,col,mw){g.font=`800 ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-10)}
/* wrap words onto as many lines as the width needs (at most 3) */
function wrap(g,t,x,y,n,mw,col){g.font=`800 ${big(n)}px system-ui,sans-serif`;const lines=[];let cur='';
 t.split(' ').forEach(w=>{const tryL=cur?cur+' '+w:w;if(g.measureText(tryL).width>mw&&cur){lines.push(cur);cur=w}else cur=tryL});lines.push(cur);
 const L=lines.slice(0,3),gap=big(n)*1.15;L.forEach((l,i)=>write(g,l,x,y+(i-(L.length-1)/2)*gap,n,col,mw))}
function pic(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function box(g,r,fill,edge,w){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=w||2;g.strokeStyle=edge;g.stroke()}
const hit=(p,r)=>r&&p.x>=r.x-6&&p.x<=r.x+r.w+6&&p.y>=r.y-6&&p.y<=r.y+r.h+6;
const edge=()=>A.mix(A.col.tx,A.col.pn,.35),card=()=>A.col.dark?'#1e293b':'#ffffff',tint=(h,k)=>A.mix(A.col.pn,h,A.col.dark?.2:k||.6);
const unit=()=>Math.min(A.W*.19,A.H*.2,90);
/* layout: four friends in a row, a badge tray along the bottom, role bins along the top */
const pal=i=>{const s=unit(),gx=(A.W-4*s)/5;return{x:gx+i*(s+gx),y:A.H*.36,w:s,h:s}};
const trayAt=i=>{const s=unit()*.85,n=Math.max(3,S.tray.length),gx=(A.W-n*s)/(n+1);return{x:gx+i*(s+gx),y:A.H*.78,w:s,h:s}};
const bin=i=>{const w=(A.W-30)/4;return{x:6+i*(w+6),y:A.H*.05,w,h:A.H*.4}};
const sayCard=()=>{const w=Math.min(A.W*.9,380);return{x:A.W/2-w/2,y:A.H*.62,w,h:A.H*.3}};
const seat=()=>pal(3);
const held=r=>{const d=S.grab;return d&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r};
function tree(g,done){const C=A.col,b=A.H*.27;g.fillStyle=C.dark?'#14532d':'#bbf7d0';g.fillRect(0,A.H*.7,A.W,A.H*.3);
 g.fillStyle='#78350f';g.fillRect(A.W/2-10,A.H*.06,20,A.H*.28);
 for(let k=0;k<4;k++){g.fillStyle=k<done?'#b45309':A.alpha(C.mu,.25);g.fillRect(A.W*.3,b-k*A.H*.06,A.W*.4,A.H*.05)}
 write(g,done>=4?'Treehouse built! 🎉':`Treehouse: ${done} of 4 planks`,A.W/2,A.H*.03+8,13,C.tx)}
function friend(g,i,r,role,talk){const C=A.col,red=i===S.bad&&mode()==='boss';box(g,r,tint('#fde68a',.45),i===S.glow?C.vi:red?C.rd:edge(),i===S.glow||red?4:2);
 pic(g,PALS[i][0],r.x+r.w/2,r.y+r.h*.45,r.w*.55);if(role>=0)pic(g,ROLES[role][0],r.x+r.w*.84,r.y+r.h*.14,r.w*.3);
 write(g,PALS[i][1],r.x+r.w/2,r.y+r.h+12,11,C.tx,r.w+10);if(talk)write(g,talk,r.x+r.w/2,r.y-12,11,C.rd,r.w+16)}
function badge(g,k,r){const red=k===S.bad&&mode()!=='boss';box(g,r,card(),red?A.col.rd:edge(),red?4:2);pic(g,ROLES[k][0],r.x+r.w/2,r.y+r.h*.42,r.w*.5);write(g,ROLES[k][1].split(' ')[0],r.x+r.w/2,r.y+r.h*.84,10,A.col.tx,r.w-4)}
function drawBoss(g){const lead=S.role.filter(x=>x===0).length;tree(g,lead===1?4:4-lead);
 PALS.forEach((_,i)=>friend(g,i,pal(i),S.role[i],S.role[i]===0&&lead>1?'My way!':''));
 S.tray.forEach((k,j)=>{const r=S.grab&&S.grab.k===j?held(trayAt(j)):trayAt(j);badge(g,k,r)})}
function drawMatch(g){const C=A.col;ROLES.forEach((R,i)=>{const r=bin(i);box(g,r,tint(['#fde68a','#bae6fd','#bbf7d0','#e9d5ff'][i]),i===S.glow?C.vi:edge(),i===S.glow?5:2);
  pic(g,R[0],r.x+r.w/2,r.y+r.h*.3,Math.min(r.w*.4,40));wrap(g,R[1],r.x+r.w/2,r.y+r.h*.68,11,r.w-8)});
 write(g,`Matched: ${S.n} of 4`,A.W/2,A.H*.52,13,C.tx);const k=S.tray[0];if(k==null)return;const r=held(sayCard());
 box(g,r,card(),S.bad===k?C.rd:edge(),S.bad===k?4:2);wrap(g,SAYS[k][0],r.x+r.w/2,r.y+r.h/2,13,r.w-16)}
function drawGap(g){const C=A.col,G=GAPS[S.round%3];wrap(g,S.n>S.round?'Fixed! The team gets back to work. 😊':G[2],A.W/2,A.H*.14,13,A.W-24,S.n>S.round?C.gr:C.tx);
 G[0].forEach((role,j)=>friend(g,j,pal(j),role,''));const s=seat();g.setLineDash([7,6]);box(g,s,A.alpha(C.vi,.08),S.glow===0?C.vi:edge(),S.glow===0?4:2);g.setLineDash([]);
 if(S.n>S.round){pic(g,PALS[3][0],s.x+s.w/2,s.y+s.h*.45,s.w*.55);pic(g,ROLES[G[1]][0],s.x+s.w*.84,s.y+s.h*.14,s.w*.3)}else write(g,'?',s.x+s.w/2,s.y+s.h/2,26,C.mu);
 write(g,'Rabbit',s.x+s.w/2,s.y+s.h+12,11,C.tx,s.w+10);if(S.n<=S.round)S.tray.forEach((k,j)=>{const r=S.grab&&S.grab.k===j?held(trayAt(j)):trayAt(j);badge(g,k,r)})}
function drawDrop(g){const C=A.col,gone=S.out;tree(g,gone<0?4:2);PALS.forEach((_,i)=>{if(i===gone){const r=pal(i);g.globalAlpha=.35;friend(g,i,r,i,'');g.globalAlpha=1;write(g,'sits out',r.x+r.w/2,r.y-12,11,C.mu,r.w+16)}else friend(g,i,pal(i),i,'')});
 write(g,`Tried: ${S.seen.length} of 3`,A.W/2,A.H*.93,13,C.tx);if(gone>=0){const r={x:8,y:A.H*.72,w:A.W-16,h:A.H*.13};box(g,r,card(),C.rd,3);wrap(g,LOSE[gone],A.W/2,r.y+r.h/2,11,r.w-14,C.tx)}}
function drawMe(g){const C=A.col;ROLES.forEach((R,i)=>{const r=bin(i);box(g,r,i===S.pick?tint('#bbf7d0',.7):card(),i===S.pick?C.gr:edge(),i===S.pick?4:2);pic(g,R[0],r.x+r.w/2,r.y+r.h*.3,Math.min(r.w*.4,40));wrap(g,R[1],r.x+r.w/2,r.y+r.h*.68,11,r.w-8)});
 if(S.pick>=0)wrap(g,MINE[S.pick],A.W/2,A.H*.7,12,A.W-24);else write(g,'Tap the role you like best',A.W/2,A.H*.7,13,C.tx)}
function drawQuiz(g){tree(g,4);PALS.forEach((_,i)=>friend(g,i,pal(i),i,''))}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,A.W,A.H);
 ({boss:drawBoss,match:drawMatch,gap:drawGap,drop:drawDrop,me:drawMe,quiz:drawQuiz}[mode()])(g);A.fx.draw(g)}
function blink(i){S.glow=i;const v=gen;setTimeout(()=>{if(v===gen){S.glow=-1;A.redraw()}},420)}
function miss(t){A.sound.miss();tell(t);A.redraw()}
function good(t){S.n++;S.bad=-1;A.sound.pop();tell(t);keys();A.redraw();S.next()}
/* give badge j from the tray to friend i (who still wears a crown) */
function give(j,i){const k=S.tray[j];if(k==null||S.n>=3)return;if(i==null)i=S.role.findIndex((r,x)=>x>0&&r===0);
 if(S.role[i]!==0){S.bad=i;return miss(`${PALS[i][1]} already has a job. Give the badge to a friend who still wears a crown.`)}
 if(S.role.filter(x=>x===0).length<2)return;blink(i);S.role[i]=k;S.tray.splice(j,1);S.bad=-1;
 good(S.n>=2?`${PALS[i][1]} is the ${ROLES[k][1].toLowerCase()} now. One leader, and every friend has a job. The treehouse gets built!`:`${PALS[i][1]} is the ${ROLES[k][1].toLowerCase()} now and stops saying “My way!”. Another plank goes up.`)}
function sortSay(i){const k=S.tray[0];if(k==null||S.n>=4)return;blink(i);const it=SAYS[k];
 if(it[1]!==i){S.bad=k;return miss(`Not the ${ROLES[i][1].toLowerCase()}. A ${ROLES[i][1].toLowerCase()} ${ROLES[i][2]}. Look again: who would say this?`)}S.tray.shift();good(`${ROLES[i][0]} ${it[2]}`)}
function fill(j){const k=S.tray[j],G=GAPS[S.round%3];if(k==null||S.n>=3||S.n>S.round)return;blink(0);
 if(G[0].includes(k)){S.bad=k;return miss(`The team already has a ${ROLES[k][1].toLowerCase()}. Which job is nobody doing?`)}
 if(k!==G[1]){S.bad=k;return miss(`A ${ROLES[k][1].toLowerCase()} ${ROLES[k][2]}. Will that fix this problem? Read it again.`)}
 const v=gen;good(`Yes! The ${ROLES[k][1].toLowerCase()} ${ROLES[k][2]}.`);if(S.n<3)setTimeout(()=>{if(v===gen){S.round++;S.tray=[0,1,2,3];S.bad=-1;keys();A.redraw()}},quick()?20:1000)}
function sitOut(i){if(S.n>=3&&S.seen.includes(i))return;blink(i);S.out=i;if(S.seen.includes(i)){A.sound.tick();tell(LOSE[i]);return A.redraw()}S.seen.push(i);
 good(LOSE[i]+(S.seen.length>=3?' Every role helps the team.':' Try another friend.'))}
function choose(i){blink(i);const first=!S.seen.includes(i);S.pick=i;if(!first){tell(MINE[i]);return A.redraw()}S.seen.push(i);good(MINE[i])}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||S.n>=goal())return;
 const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='boss'){const i=S.role.findIndex((r,x)=>x>0&&r===0);S.tray.forEach((k,j)=>B(`${ROLES[k][0]} Give to ${PALS[i][1]}`,`Give the ${ROLES[k][1]} badge to ${PALS[i][1]}`,()=>give(j,i)))}
 if(m==='match'&&S.tray.length)ROLES.forEach((R,i)=>B(R[0]+' '+R[1],`${SAYS[S.tray[0]][0]}: ${R[1]}`,()=>sortSay(i)));
 if(m==='gap'&&S.n<=S.round)S.tray.forEach((k,j)=>B(ROLES[k][0]+' '+ROLES[k][1],`Rabbit joins as ${ROLES[k][1]}`,()=>fill(j)));
 if(m==='drop')PALS.forEach((P,i)=>B(`${ROLES[i][0]} Take away the ${ROLES[i][1]}`,`${P[1]}, the ${ROLES[i][1]}, sits out`,()=>sitOut(i)));
 if(m==='me')ROLES.forEach((R,i)=>B(R[0]+' '+R[1],`I like being the ${R[1]}`,()=>choose(i)))}
function down(p){const m=mode();if(m==='quiz'||S.n>=goal())return false;
 if(m==='drop'){const i=PALS.findIndex((_,j)=>hit(p,pal(j)));if(i>=0)sitOut(i);return false}
 if(m==='me'){const i=ROLES.findIndex((_,j)=>hit(p,bin(j)));if(i>=0)choose(i);return false}
 if(m==='boss'||(m==='gap'&&S.n<=S.round)){const j=S.tray.findIndex((_,x)=>hit(p,trayAt(x)));if(j>=0){S.grab={k:j,x:null,x0:p.x,y0:p.y};return true}}
 if(m==='match'){if(S.tray.length&&hit(p,sayCard())){S.grab={k:0,x:null,x0:p.x,y0:p.y};return true}const i=ROLES.findIndex((_,j)=>hit(p,bin(j)));if(i>=0)sortSay(i)}return false}
function move(p){const d=S.grab;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab,m=mode();S.grab=null;if(!d)return;const moved=d.x!=null;
 if(m==='boss'){const i=PALS.findIndex((_,j)=>hit(p,pal(j)));if(moved&&i<0){tell('Drop the badge on a friend who wears a crown.');return A.redraw()}return give(d.k,moved?i:null)}
 if(m==='match'){const i=ROLES.findIndex((_,j)=>hit(p,bin(j)));if(!moved||i<0){tell('Drag the card into a role box, or tap a box.');return A.redraw()}return sortSay(i)}
 if(m==='gap'){if(moved&&!hit(p,seat())){tell('Drop the badge on the empty seat.');return A.redraw()}return fill(d.k)}}
const finish=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,ms){const k=++gen;list.forEach((f,j)=>setTimeout(()=>{if(k===gen)f()},quick()?j*40+30:(j+1)*(ms||600)))}
const reset=(more)=>{gen++;Object.assign(S,fresh(),more||{})};
const steps=[
{h:'Too many leaders',p:'Fox, Bear, Owl and Rabbit all want to be the leader. Drag a badge onto each friend with a crown, but keep one leader.',predict:{q:'Four friends all lead. Will the treehouse get built fast?',opts:['Yes, four leaders is best','No, they all say “my way” and nobody builds'],ans:1},task:'Give out 3 badges',
 show:()=>{steps[0].go();play([()=>give(0,1),()=>give(0,2),()=>give(0,3)])},go:()=>{reset({role:[0,0,0,0],tray:[1,2,3]});tell('Everyone wears a crown and says my way. Drag a badge onto Bear.');keys();S.next=finish(0,()=>S.n>=3,'A group needs one leader and a mix of other jobs.')}},
{h:'Who does what?',p:'Read what each friend says or does. Drag the card to the role it shows.',predict:{q:'What does a peacemaker (mediator) do?',opts:['Picks who is right','Helps both sides be heard and find a fix'],ans:1},task:'Match 4 cards',
 show:()=>{steps[1].go();play([0,1,2,3].map(()=>()=>sortSay(SAYS[S.tray[0]][1])))},go:()=>{reset({tray:[0,1,2,3]});tell('Drag the card into a role box.');keys();S.next=finish(1,()=>S.n>=4,'Each role is a different job: plan, ideas, help, or keep the peace.')}},
{h:'Missing role',p:'Each team has a problem because one job is missing. Drag the missing badge onto Rabbit’s empty seat.',task:'Fix 3 teams',
 show:()=>{steps[2].go();play([()=>fill(3),()=>fill(1),()=>fill(0)],1200)},go:()=>{reset({tray:[0,1,2,3]});tell(GAPS[0][2]+' Which job is missing?');keys();S.next=finish(2,()=>S.n>=3,'When a group gets stuck, ask which job nobody is doing.')}},
{h:'Every role counts',p:'Tap a friend to make them sit out. What goes wrong without that role?',predict:{q:'Is the supporter less important than the leader?',opts:['Yes, the leader matters most','No, the team needs every role'],ans:1},task:'Try 3 friends',
 show:()=>{steps[3].go();play([()=>sitOut(2),()=>sitOut(0),()=>sitOut(3)],900)},go:()=>{reset();tell('All four friends have a job. Tap one to make them sit out.');keys();S.next=finish(3,()=>S.seen.length>=3,'Every role is needed. Without one, the work stops.')}},
{h:'Your role',p:'Which role do you like best? Tap it to see its strength. Then tap another role you could try.',task:'Read 2 roles',
 show:()=>{steps[4].go();play([()=>choose(2),()=>choose(0)],800)},go:()=>{reset();tell('Tap the role you like best.');keys();S.next=finish(4,()=>S.seen.length>=2,'You do not always have to lead. Your role can change from day to day.')}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.next()});
const QS=[['Four friends all want to be the leader. What will most likely happen?',[['They argue, and little gets done','ok'],['They finish fastest','fast'],['Everyone is happy','happy']]],
 ['Mia says, “What if we make it a castle?” Which role is that?',[['Ideas person','ok'],['Leader','lead'],['Peacemaker','peace']]],
 ['Sam and Jo both want the red pen and start to shout. What does a peacemaker do?',[['Helps each one say what they want, then find a fix','ok'],['Picks who is right','judge'],['Takes the pen and walks off','walk']]],
 ['The group did not pick your idea. What helps the group most?',[['Help build the idea the group chose','ok'],['Stop helping until they pick yours','sulk'],['Keep saying yours is better','push']]],
 ['Why does a group need a supporter?',[['To help build and cheer the others on','ok'],['It does not. Only the leader matters','only'],['To tell everyone what to do','boss']]]];
function why(t){let m='Look back at the lab: leader, ideas person, supporter and peacemaker.';
 if(t==='fast')m='Four leaders give four different orders, so nobody builds. One leader is enough.';
 if(t==='happy')m='When everyone wants their own way, friends get cross. A mix of jobs keeps the team happy.';
 if(t==='lead')m='A leader makes the plan and gives out jobs. A new thing to try is an idea.';
 if(t==='peace')m='A peacemaker helps when friends disagree. Thinking of a castle is a new idea.';
 if(t==='judge')m='A peacemaker does not pick a winner. She helps both sides be heard and find a fix, like taking turns.';
 if(t==='walk')m='Walking off with the pen does not help them agree. A peacemaker helps them talk.';
 if(t==='sulk')m='The team needs you, even when it is not your idea. Supporting the plan is a real job.';
 if(t==='push')m='Pushing your idea again and again stops the work. Say it once, then help with the plan.';
 if(t==='only')m='Without a supporter, nobody holds the planks, so nothing gets built. Every role counts.';
 if(t==='boss')m='Telling everyone what to do is the leader’s job. A supporter helps build.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),right=t==='ok';
 if(right){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${right?'✓ Yes! Great team thinking.':'✗ '+why(t)}${right?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
