/* Flagship: friendships change over time (ages 7-9; RSE "caring friendships": friendships have ups and downs, how people
   choose and make friends). Slide through a school year on friendship rings, tell normal change from unkindness, swap
   unhelpful thoughts, pick ways to make a new friend, and keep an old friend close. Not flagfriend, flagagree or flagentry. */
(()=>{
const TERMS=['Autumn','Spring','Summer'];
const PALS=[{n:'Sam',c:'#bfdbfe',ring:[0,1,2],a:-2.75,why:'Sam moved to another class. You see Sam less, so you drifted apart. Nobody did anything wrong.'},
 {n:'Ava',c:'#fbcfe8',ring:[0,0,1],a:-.35,why:'Ava started football at lunch. You still like each other. You just play together less.'},
 {n:'Jo',c:'#bbf7d0',ring:[2,1,0],a:1.2,why:'Jo joined your art club. You both love drawing, and now Jo is a close friend.'},
 {n:'Kit',c:'#fde68a',ring:[1,1,1],a:2.7,why:'Kit is still a friend, just like before. Some friendships stay the same.'}];
const CASES=[['Lily likes horses now. You still like dinosaurs.',0],['Max says you can never play, and tells others not to play with you.',1],['Ben goes to swimming club at lunch now.',0],
 ['Priya moved house and changed school.',0],['Zara and her group laugh at you every day.',1],['Your friend wants to play with someone new today.',0]];
const THINK=[['Nobody will ever like me.','I feel sad now. I can make new friends too.'],['It is all my fault.','Friendships change. It is nobody\'s fault.'],
 ['I can only have one friend.','I can have lots of friends at once.'],['It is OK to feel sad for a bit.',null]];
const IDEAS=[['Join a club you like',1,'At a club you meet people who like the same thing.'],['Wait alone until someone asks you',0,'Waiting can take a long time. Try one small step, like asking to join in.'],
 ['Ask "Can I play too?"',1,'Asking to join a game is a quick way to start.'],['Give sweets so they like you',0,'Friends like you for you. Gifts do not make a friend.'],
 ['Invite someone to play',1,'Asking someone to play shows you are friendly.'],['Ask what they like doing',1,'Finding what you both like gives you things to do together.']];
const KEEP=[['Wave and say hi at playtime',1,'A smile and a hello keep a friendship warm.'],['Make Sam choose: me or them',0,'Friends do not have to choose. Sam can have other friends and still be your friend.'],
 ['Make Sam a card',1,'A card tells Sam you still care.'],['Never talk to Sam again',0,'Sam did nothing wrong by moving class. You can still be friends.'],['Ask a grown-up about a play date',1,'A grown-up can help you meet up out of school.']];
VIS.reg('flagfchg',c=>{let A,bar,qbox,qi=-1;const M={};c.fig.classList.add('young');
const INK='#0f172a',GO='#047857',STOP='#b91c1c',LINE='#64748b',HOT='#1d4ed8';
const phase=()=>['rings','sort','think','ideas','keep','chal'][A.step];
const f=(px,w)=>`${w||700} ${Math.round(A.narrow?px:px*1.15)}px system-ui,sans-serif`;
function sky(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ede9fe',A.col.dark?.07:.45);g.fillRect(0,0,A.W,A.H)}
function lines(t,w,px){const g=A.ctx;g.font=f(px);const out=[];let cur='';t.split(' ').forEach(x=>{const tr=cur?cur+' '+x:x;if(g.measureText(tr).width>w&&cur){out.push(cur);cur=x}else cur=tr});out.push(cur);return out}
function card(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.ok||o.no||o.on?4:2;g.strokeStyle=o.ok?GO:o.no?STOP:o.on?HOT:LINE;g.stroke();
 if(!t)return;const px=o.px||14,ls=lines(t,r.w-16,px);g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';ls.forEach((s,i)=>g.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(ls.length-1)/2)*px*1.25))}
function chip(t,x,y,o){o=o||{};const g=A.ctx;g.font=f(o.px||13,800);const w=Math.min(A.W-8,g.measureText(t).width+22),h=(o.px||13)+16;card({x:Math.max(4,Math.min(A.W-w-4,x-w/2)),y:y-h/2,w,h},t,{...o,px:o.px||13})}
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* rings */
const hub=()=>({x:A.W/2,y:A.H*.43,r:Math.min(A.W*.44,A.H*.34)});
function palAt(p,t){const h=hub(),k=p.ring[Math.floor(t)],k2=p.ring[Math.min(2,Math.ceil(t))],fr=t-Math.floor(t),rr=h.r*(.36+.3*(k+(k2-k)*fr));return{x:h.x+rr*Math.cos(p.a),y:h.y+rr*Math.sin(p.a)*.9}}
const track=()=>({x:A.W*.12,y:A.H*.9,w:A.W*.76});
function drawRings(){const R=M.r,g=A.ctx,h=hub();sky();chip(R.t>=2?(R.seen.length>=3?'Summer: all 3 found':`Summer: tap a friend who moved (${R.seen.length} of 3)`):`Drag the dot to ${TERMS[Math.min(2,Math.floor(R.t)+1)]}`,A.W/2,A.H*.05,{px:12});
 [2,1,0].forEach(k=>{g.beginPath();g.ellipse(h.x,h.y,h.r*(.36+.3*k)+20,(h.r*(.36+.3*k)+20)*.9,0,0,7);g.fillStyle=A.alpha(['#7c3aed','#0891b2','#64748b'][k],A.col.dark?.22:.12);g.fill();g.strokeStyle=LINE;g.lineWidth=1;g.stroke()});
 g.fillStyle=A.col.tx;g.font=f(10,700);g.textAlign='center';['close friends','friends','people I know'].forEach((s,k)=>g.fillText(s,h.x,h.y-(h.r*(.36+.3*k)+20)*.9+9));
 g.beginPath();g.arc(h.x,h.y,22,0,7);g.fillStyle='#ffffff';g.fill();g.strokeStyle=HOT;g.lineWidth=3;g.stroke();g.fillStyle=INK;g.font=f(13,800);g.textBaseline='middle';g.fillText('You',h.x,h.y);
 PALS.forEach((p,i)=>{const q=palAt(p,R.t),s=R.seen.includes(i);g.beginPath();g.arc(q.x,q.y,21,0,7);g.fillStyle=p.c;g.fill();g.lineWidth=s?4:2;g.strokeStyle=s?GO:R.pick===i?HOT:'#334155';g.stroke();g.fillStyle=INK;g.font=f(12,800);g.fillText(p.n,q.x,q.y)});
 const T=track();g.strokeStyle=A.col.tx;g.lineWidth=4;g.beginPath();g.moveTo(T.x,T.y);g.lineTo(T.x+T.w,T.y);g.stroke();
 TERMS.forEach((s,k)=>{const x=T.x+T.w*k/2;g.beginPath();g.arc(x,T.y,6,0,7);g.fillStyle=A.col.tx;g.fill();g.font=f(11,700);g.fillText(s,x,T.y-16)});
 const kx=T.x+T.w*R.t/2;g.beginPath();g.arc(kx,T.y,14,0,7);g.fillStyle=HOT;g.fill();g.strokeStyle='#ffffff';g.lineWidth=3;g.stroke()}
function setTime(t){const R=M.r;R.t=Math.max(R.t,Math.min(2,t));A.redraw();const now=Math.floor(R.t+1e-6);if(now>R.said&&Math.abs(R.t-now)<1e-6){R.said=now;A.sound.tick();tell(now===1?'Spring. Sam moved to another class, and Jo is in your art club.':now===2?'Summer. Who has moved on the rings? Tap them to find out why.':'')}}
function tapPal(i){const R=M.r;if(R.t<2){R.pick=i;return tell(PALS[i].n+' is here for now. Drag the dot to Summer first.')}R.pick=i;const p=PALS[i];if(p.ring[0]===p.ring[2])return tell(p.why);
 if(!R.seen.includes(i)){R.seen.push(i);A.sound.pop()}tell(p.why+(R.seen.length>=3?' Friendships move closer and further. That is normal.':''))}
/* sort */
const bins=()=>{const w=(A.W-30)/2,h=A.H*.34;return[{x:10,y:A.H*.62,w,h},{x:20+w,y:A.H*.62,w,h}]};
const top=()=>({x:A.W*.08,y:A.H*.14,w:A.W*.84,h:A.H*.26});
function drawSort(){const S=M.s,g=A.ctx;sky();chip(S.k>=6?'All 6 sorted':`Card ${S.k+1} of 6: drag it to a box, or tap a box`,A.W/2,A.H*.05,{px:12,ok:S.k>=6});
 bins().forEach((r,j)=>{card(r,null,{bg:j?'#fee2e2':'#dcfce7'});g.fillStyle=INK;g.font=f(13,800);g.textAlign='center';g.textBaseline='top';g.fillText(j?'Unkind: tell a grown-up':'Normal change',r.x+r.w/2,r.y+8,r.w-8);
  g.font=f(22);g.fillText('✓ '.repeat(CASES.slice(0,S.k).filter(x=>x[1]===j).length).trim(),r.x+r.w/2,r.y+r.h*.45,r.w-8)});
 if(S.k<6){const r=top(),d=M.drag;card(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,CASES[S.k][0],{px:16,no:S.bad,on:!!d})}}
function place(j){const S=M.s;if(S.k>=6)return;const[t,b]=CASES[S.k];
 if(j!==b){S.bad=1;A.sound.miss();return tell(b?'This is unkind, not a normal change. Leaving someone out on purpose or laughing at them every day is not OK. Tell a trusted grown-up.':'This is not unkind. People\'s likes, clubs and homes change. It is normal, and nobody is to blame.')}
 S.k++;S.bad=0;A.sound.pop();tell((b?'Yes, that is unkind. A trusted grown-up can help.':'Yes, a normal change. Nobody did anything wrong.')+(S.k>=6?' Change is normal. Unkindness is not.':''))}
/* thoughts */
function bubbles(){const w=A.W-30,h=Math.min(56,A.H*.13);return THINK.map((_,i)=>({x:15,y:A.H*.15+i*(h+10),w,h}))}
function drawThink(){const T=M.t,g=A.ctx;sky();const done=T.sw.length;chip(done>=3?'3 thoughts swapped':`Tap an unhelpful thought to swap it (${done} of 3)`,A.W/2,A.H*.05,{px:12,ok:done>=3});
 bubbles().forEach((r,i)=>{const[bad,good]=THINK[i],sw=T.sw.includes(i);card(r,sw?good:bad,{px:15,ok:sw||(!good&&T.kept),no:T.bad===i,bg:sw||!good?'#f0fdf4':'#fff7ed'})});
 const y=A.H*.88,w=A.W*.7,x=A.W*.15;g.fillStyle=A.alpha(A.col.mu,.3);A.paint.rrect(x,y,w,16,8);g.fill();g.fillStyle=GO;A.paint.rrect(x,y,w*(done+1)/4,16,8);g.fill();g.fillStyle=A.col.tx;g.font=f(11,700);g.textAlign='center';g.fillText('feeling better',A.W/2,y-10)}
function swap(i){const T=M.t;if(T.sw.length>=3||T.sw.includes(i))return;const[bad,good]=THINK[i];if(!good){T.kept=1;A.sound.tick();return tell('That one is already a helpful thought. Sad feelings are OK, and they get smaller. Keep it.')}
 T.sw.push(i);T.bad=null;A.sound.pop();tell(`"${bad}" becomes "${good}"`+(T.sw.length>=3?' Kind thoughts help you feel better and try again.':''))}
/* idea cards (ideas and keep) */
function grid(n){const cols=2,w=(A.W-30)/2,rows=Math.ceil(n/cols),h=Math.min(72,(A.H*.6-(rows-1)*10)/rows);return[...Array(n)].map((_,i)=>({x:10+(i%cols)*(w+10),y:A.H*.3+Math.floor(i/cols)*(h+10),w,h}))}
function drawPick(list,st,title,gain){const g=A.ctx;sky();const need=list.filter(x=>x[1]).length,got=st.got.length;chip(got>=need?`All ${need} found`:`${title} (${got} of ${need})`,A.W/2,A.H*.05,{px:12,ok:got>=need});
 const n=gain(got);g.textAlign='center';g.textBaseline='middle';for(let i=0;i<n.k;i++){const x=A.W/2+(i-(n.k-1)/2)*(n.gap||46);g.beginPath();g.arc(x,A.H*.17,20,0,7);g.fillStyle=n.c;g.fill();g.strokeStyle='#334155';g.lineWidth=2;g.stroke();g.fillStyle=INK;g.font=f(11,800);g.fillText(n.t[i]||'',x,A.H*.17)}
 grid(list.length).forEach((r,i)=>card(r,list[i][0],{px:13,ok:st.got.includes(i),no:st.bad===i}))}
function choose(list,st,i,end){if(st.got.includes(i)||st.got.length>=list.filter(x=>x[1]).length)return;const[t,good,why]=list[i];if(!good){st.bad=i;A.sound.miss();return tell(why)}st.got.push(i);st.bad=null;A.sound.pop();tell(why+(st.got.length>=list.filter(x=>x[1]).length?' '+end:''))}
const pickI=i=>choose(IDEAS,M.i,i,'Small brave steps make new friends.'),pickK=i=>choose(KEEP,M.k,i,'You can keep old friends and make new ones.');
/* frame */
function draw(){const s=phase();if(s==='chal'){sky();chip('Challenge',A.W/2,A.H*.2,{ok:1});chip('Friendships change. You can make new ones.',A.W/2,A.H*.5,{px:13});return}
 if(s==='rings')drawRings();if(s==='sort')drawSort();if(s==='think')drawThink();
 if(s==='ideas')drawPick(IDEAS,M.i,'Tap ideas that help make a friend',n=>({k:n,c:'#bbf7d0',t:['new','new','new','new']}));
 if(s==='keep')drawPick(KEEP,M.k,'Tap ways to stay friends with Sam',n=>({k:2,c:'#bfdbfe',t:['You','Sam'],gap:130-n*28}));A.fx.draw(A.ctx)}
function down(p){const s=phase();
 if(s==='rings'){const T=track(),kx=T.x+T.w*M.r.t/2;if(Math.abs(p.y-T.y)<30){M.drag={w:'t'};setTime((p.x-T.x)/T.w*2);return true}
  const i=PALS.findIndex(q=>{const z=palAt(q,M.r.t);return Math.hypot(p.x-z.x,p.y-z.y)<28});if(i>=0)tapPal(i);return false}
 if(s==='sort'){if(M.s.k>=6)return false;if(within(p,top())){M.drag={w:'c',x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const j=bins().findIndex(r=>within(p,r));if(j>=0)place(j);return false}
 if(s==='think'){const i=bubbles().findIndex(r=>within(p,r));if(i>=0)swap(i);return false}
 if(s==='ideas'||s==='keep'){const LS=s==='ideas'?IDEAS:KEEP,i=grid(LS.length).findIndex(r=>within(p,r));if(i>=0)(s==='ideas'?pickI:pickK)(i)}return false}
function move(p){const d=M.drag;if(!d)return;if(d.w==='t'){const T=track();setTime((p.x-T.x)/T.w*2);return}d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=M.drag;if(!d)return;M.drag=null;if(d.w==='t'){M.r.t=Math.round(M.r.t);setTime(M.r.t);pads();return}const j=bins().findIndex(r=>within(p,r));if(j>=0)place(j);else A.redraw()}
function wipe(){for(const k in M)delete M[k];Object.assign(M,{r:{t:0,said:0,seen:[],pick:null},s:{k:0,bad:0},t:{sw:[],bad:null,kept:0},i:{got:[],bad:null},k:{got:[],bad:null},drag:null,cb:()=>{},gen:(M.gen||0)+1})}
function tell(t){if(t)c.say(t);if(t)A.cv.setAttribute('aria-label',t);A.redraw();pads();M.cb()}
const when=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,d,ok,msg){wipe();tell(d);M.cb=when(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const g0=M.gen;acts.forEach((a,j)=>setTimeout(()=>{if(g0===M.gen)a()},(A.reduced()?40:ms)*(j+1)))}
function pads(){if(!bar)return;bar.innerHTML='';const s=phase(),B=(t,fn,lab)=>{c.el('button',{type:'button',class:'lbtn','aria-label':lab||t},bar,t).onclick=fn};
 if(s==='rings'){if(M.r.t<2)B(`Go to ${TERMS[Math.floor(M.r.t)+1]}`,()=>setTime(Math.floor(M.r.t)+1));else PALS.forEach((p,i)=>B(`What about ${p.n}?`,()=>tapPal(i),`What happened with ${p.n}?`))}
 if(s==='sort'&&M.s.k<6){B('Normal change',()=>place(0));B('Unkind: tell a grown-up',()=>place(1))}
 if(s==='think'&&M.t.sw.length<3)THINK.forEach((x,i)=>{if(!M.t.sw.includes(i))B(x[0],()=>swap(i),`Swap the thought: ${x[0]}`)});
 if(s==='ideas')IDEAS.forEach((x,i)=>{if(!M.i.got.includes(i)&&M.i.got.length<4)B(x[0],()=>pickI(i))});
 if(s==='keep')KEEP.forEach((x,i)=>{if(!M.k.got.includes(i)&&M.k.got.length<3)B(x[0],()=>pickK(i))})}
const goodOf=list=>list.map((x,i)=>x[1]?i:-1).filter(i=>i>=0);
const steps=[
{h:'Friends move around',p:'These rings show who is close to you. Drag the dot from Autumn to Summer and watch the friends move.',
 predict:{q:'Sam moves to another class and plays with new children. What does it mean?',opts:['Something is wrong with me','Friendships change when things change'],ans:1},task:'Reach Summer and tap the 3 friends who moved',
 show:()=>demo(0,[()=>setTime(1),()=>setTime(2),()=>tapPal(0),()=>tapPal(1),()=>tapPal(2)],500),
 go:()=>enter(0,'Autumn. You are in the middle. Sam and Ava are close friends, Kit is a friend, Jo is someone you know.',()=>M.r.seen.length>=3,'Sam drifted, Ava moved a little, Jo came closer. Nobody did anything wrong.')},
{h:'Change or unkind?',p:'Most changes are normal. But some things are unkind, and then you should tell a grown-up. Drag each card to a box.',
 predict:{q:'Your best friend plays with someone new today. What does it mean?',opts:['They do not like me any more','Friends can play with other people too'],ans:1},task:'Sort all 6 cards',
 show:()=>demo(1,CASES.map(x=>()=>place(x[1])),500),
 go:()=>enter(1,'A card: Lily likes horses now. Two boxes: Normal change, and Unkind: tell a grown-up.',()=>M.s.k>=6,'Likes, clubs and homes change. Leaving out on purpose or laughing at someone is unkind.')},
{h:'Kind thoughts',p:'When a friendship changes you might feel sad. Some thoughts make it worse. Tap a thought to swap it for a kinder one.',
 predict:{q:'Is it OK to feel sad when a friend drifts away?',opts:['No, you should not mind','Yes, and the sad feeling gets smaller'],ans:1},task:'Swap 3 unhelpful thoughts',
 show:()=>demo(2,[0,1,2].map(i=>()=>swap(i)),500),
 go:()=>enter(2,'Four thoughts. Three are unhelpful. One is already kind.',()=>M.t.sw.length>=3,'Kind thoughts help you feel better and try again.')},
{h:'Make a new friend',p:'Some ways to make friends work well. Tap the ideas that help.',task:'Find the 4 ideas that help',
 show:()=>demo(3,goodOf(IDEAS).map(i=>()=>pickI(i)),450),
 go:()=>enter(3,'Six ideas for making a new friend.',()=>M.i.got.length>=4,'Join, ask, invite and find what you both like.')},
{h:'Keep an old friend',p:'Sam is in another class now. You can still be friends. Tap the ways that help.',task:'Find 3 ways to stay friends',
 show:()=>demo(4,goodOf(KEEP).map(i=>()=>pickK(i)),450),
 go:()=>enter(4,'You and Sam. Five ideas.',()=>M.k.got.length>=3,'Old friends and new friends can both fit in your rings.')},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.cb()});
const QS=[{q:'Your friend sits with someone new at lunch. What is most likely?',a:'Friendships change, and that is normal',o:[['They hate you now','hate'],['You did something wrong','blame']]},
 {q:'Which is a good way to make a new friend?',a:'Ask "Can I play too?"',o:[['Wait until someone asks you','wait'],['Give them toys so they like you','gift']]},
 {q:'Your friend moved school. What can you do?',a:'Send a card, or call with a grown-up\'s help',o:[['Forget them straight away','forget'],['Never make a new friend','stuck']]},
 {q:'Someone says you can never play and tells others not to play with you. This is…',a:'Unkind: tell a trusted grown-up',o:[['A normal friendship change','normal'],['A secret to keep','secret']]},
 {q:'How many friends can you have at once?',a:'Lots',o:[['Only one best friend','one'],['None, if one friend leaves','none']]},
 {q:'You feel sad that a friend drifted away. That feeling is…',a:'Normal, and it gets smaller',o:[['Wrong: you should not mind','hide'],['A sign something is wrong with you','me']]}];
function fb(t){let m='Friendships change over time. That is normal, and you can make new friends.';
 if(t==='hate')m='Playing with someone new does not mean they hate you. Friends can have more than one friend.';
 if(t==='blame')m='Friendships often change because classes, clubs or likes change. It is usually nobody\'s fault.';
 if(t==='wait')m='Waiting can take a long time. One small step, like asking to join in, works better.';
 if(t==='gift')m='Gifts do not make a friend. People like you for who you are.';
 if(t==='forget')m='You do not have to forget an old friend. A card or a call keeps in touch.';
 if(t==='stuck')m='You can keep an old friend and make new ones too.';
 if(t==='normal')m='Being left out on purpose is unkind, not a normal change. Tell a trusted grown-up.';
 if(t==='secret')m='Unkind things should not be kept secret. A trusted grown-up can help.';
 if(t==='one')m='You can have lots of friends at once, old and new.';
 if(t==='none')m='When one friend leaves you still have others, and you can make more.';
 if(t==='hide')m='Feeling sad is OK. Sad feelings get smaller, and talking helps.';
 if(t==='me')m='Nothing is wrong with you. Friendships change for everyone.';return m}
function next(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=(qi+1)%3,ord=all.slice(r).concat(all.slice(0,r));
 qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const p=qbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 p.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+fb(t))+' <button type="button" class="linkish">Next one →</button>';p.querySelector('button').onclick=next;c.say(ok?'Yes.':fb(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{qbox.hidden=B.step!==5;bar.hidden=B.step===5;pads()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Friendship lab buttons'},w);qbox=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});pads()}}).start()})})();
