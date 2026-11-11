/* Flagship: classification keys (ages 8-9). Follow a yes/no key to name animals, judge key questions,
   pick a question that splits a group, build a key, then use a leaf key. Canvas taps all have button twins. */
(()=>{
const BUG={q:'Does it have legs?',y:{q:'Does it have 6 legs?',y:['ladybird','🐞'],n:['spider','🕷️']},n:{q:'Does it have a shell?',y:['snail','🐌'],n:['worm','🪱']}};
const BUGS=[['spider','🕷️','A spider has 8 legs.'],['snail','🐌','A snail has no legs, but it has a shell.'],['ladybird','🐞','A ladybird is an insect with 6 legs.'],['worm','🪱','A worm has no legs and no shell.']];
const LEAF={q:'Is the leaf in one piece?',y:{q:'Does it have prickly edges?',y:['holly','holly'],n:['oak','oak']},n:{q:'Do the leaflets spread out like fingers?',y:['horse chestnut','fan'],n:['ash','ash']}};
const LEAVES=[['oak','oak','An oak leaf is one piece with round, wavy edges.'],['ash','ash','An ash leaf has many leaflets in pairs along a stalk.'],['holly','holly','A holly leaf is one piece with sharp prickles.'],['horse chestnut','fan','A horse chestnut leaf has 5 to 7 leaflets spread like fingers.']];
const ASK=[['Is it cute?',0,'People will not agree on cute. A key question needs one clear answer.'],['Does it have wings?',1,'Anyone can look and answer yes or no.'],['Is it big?',0,'Big compared with what? Ask something you can check, like "Is it longer than 10 cm?"'],
 ['Does it have legs and wings?',0,'Two questions in one. What if it has legs but no wings? Ask one thing at a time.'],['Does it have more than 4 legs?',1,'You can count the legs, so everyone gets the same answer.']];
const SPLIT=[{g:[['bee','🐝',1],['butterfly','🦋',1],['fish','🐟',0],['frog','🐸',0]],o:[['Is it an animal?','all'],['Does it have wings?','ok'],['Is it nice?','opinion']]},
 {g:[['cat','🐈',0],['hen','🐔',1],['duck','🦆',1],['dog','🐕',0]],o:[['Does it have 6 legs?','none'],['Does it breathe?','all'],['Does it have feathers?','ok']]},
 {g:[['snake','🐍',0],['lizard','🦎',1],['crocodile','🐊',1],['turtle','🐢',1]],o:[['Does it have legs?','ok'],['Is it scary?','opinion'],['Is it alive?','all']]}];
const BUILD=[{who:'bird, bat, fish, crab',o:[['Is it fast?','opinion'],['Does it have wings?','ok'],['Is it an animal?','all']]},
 {who:'bird, bat',o:[['Does it have feathers?','ok'],['Can it fly?','all'],['Does it have wings?','again']]},
 {who:'fish, crab',o:[['Does it live in water?','all'],['Is it wet?','opinion'],['Does it have a shell?','ok']]}];
const KINDS=['holly','oak','fan','ash'];
const MADE={q:'Does it have wings?',y:{q:'Does it have feathers?',y:['bird','🐦'],n:['bat','🦇']},n:{q:'Does it have a shell?',y:['crab','🦀'],n:['fish','🐟']}};
VIS.reg('flagkey',c=>{let A,ctl,chal,qno=-1,good=0;const K={};
const part=()=>['bug','ask','split','build','leaf','chal'][A.step];
const ping=k=>A.sound[k](),show=()=>A.redraw(),sync=()=>{show();keys()};
function voice(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function label(t,x,y,px,ink,wt,room){const g=A.ctx,f=Math.round(px*(A.narrow?1:1.12));room=room||A.W-20;g.font=`${wt||700} ${f}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;
 if(g.measureText(t).width<=room)return g.fillText(t,x,y);let k=t.indexOf(' ',Math.floor(t.length/2));if(k<0)k=t.lastIndexOf(' ');g.fillText(t.slice(0,k),x,y-f*.6,room);g.fillText(t.slice(k+1),x,y+f*.6,room)}
function tile(r,fill,line){const g=A.ctx;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fillStyle=fill;g.fill();g.lineWidth=line||2;g.strokeStyle=A.col.tx;g.stroke()}
const on=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const two=i=>{const w=(A.W-36)/2,h=Math.min(A.H*.16,64);return{x:12+i*(w+12),y:A.H*.8,w,h}};
const row=i=>{const h=Math.min(A.H*.1,40);return{x:12,y:A.H*.62+i*(h+6),w:A.W-24,h}};
/* depth-2 key: root, two questions, four ends. path = answers so far (1 yes, 0 no) */
function tree(T,path,ends,lit){const g=A.ctx,C=A.col,W=A.W,H=A.H,P={r:[W/2,H*.22],m:[[W*.27,H*.37],[W*.73,H*.37]],e:[W*.13,W*.38,W*.62,W*.87].map(x=>[x,H*.52])};
 const qnode=(q,[x,y],hot,w)=>{const r={x:x-w/2,y:y-15,w,h:30};tile(r,hot?A.alpha(C.vi,.3):A.alpha(C.cy,.12),hot?3:1.5);label(q,x,y,A.narrow?10:11,C.tx,700,w-6)};
 const link=(a,b,yes,used)=>{g.strokeStyle=used?C.vi:A.alpha(C.mu,.7);g.lineWidth=used?4:2;g.beginPath();g.moveTo(a[0],a[1]+15);g.lineTo(b[0],b[1]-15);g.stroke();label(yes?'yes':'no',(a[0]+b[0])/2+(yes?-12:12),(a[1]+b[1])/2+4,11,used?C.vi:C.mu,800)};
 const kids=[T.y,T.n];kids.forEach((m,i)=>{link(P.r,P.m[i],i===0,path[0]===1-i);if(m.q)[m.y,m.n].forEach((e,j)=>link(P.m[i],P.e[i*2+j],j===0,path[0]===1-i&&path[1]===1-j))});
 qnode(T.q,P.r,path.length===0&&lit,Math.min(W*.6,230));kids.forEach((m,i)=>{if(m.q)qnode(m.q,P.m[i],path.length===1&&path[0]===1-i&&lit,W*.44)});
 kids.forEach((m,i)=>[m.y,m.n].forEach((e,j)=>{const[x,y]=P.e[i*2+j],seen=ends.includes(e[0]);g.beginPath();g.arc(x,y,16,0,7);g.fillStyle=seen?A.alpha(C.gr,.3):A.alpha(C.mu,.15);g.fill();g.lineWidth=2;g.strokeStyle=seen?C.gr:C.mu;g.stroke();
  if(seen&&KINDS.includes(e[1]))leafArt(e[1],x,y-1,13);else label(seen?e[1]:'?',x,y+1,seen?17:15,C.tx,800);label(seen?e[0]:'',x,y+27,A.narrow?10:12,C.tx,700,W/4-4)}))}
function nodeAt(T,path){let n=T;path.forEach(a=>{n=a?n.y:n.n});return n}
function leafArt(kind,x,y,s){const g=A.ctx,C=A.col,green=C.dark?'#4ade80':'#15803d';g.fillStyle=A.alpha(green,.75);g.strokeStyle=green;g.lineWidth=2;
 const blob=(cx,cy,a,b,rot,f)=>{g.beginPath();for(let k=0;k<=48;k++){const t=k/48*Math.PI*2,m=f?f(t):1,px=a*Math.cos(t)*m,py=b*Math.sin(t)*m;g.lineTo(cx+px*Math.cos(rot)-py*Math.sin(rot),cy+px*Math.sin(rot)+py*Math.cos(rot))}g.closePath();g.fill();g.stroke()};
 g.beginPath();g.moveTo(x,y+s*.9);g.lineTo(x,y+s*.3);g.stroke();
 if(kind==='holly')blob(x,y,s*.4,s*.75,0,t=>1-.22*Math.abs(Math.sin(t*5)));
 if(kind==='oak')blob(x,y,s*.38,s*.75,0,t=>1+.16*Math.sin(t*10));
 if(kind==='fan')[-1.1,-.55,0,.55,1.1].forEach(a=>blob(x+Math.sin(a)*s*.45,y+s*.3-Math.cos(a)*s*.45,s*.12,s*.42,a,null));
 if(kind==='ash'){g.beginPath();g.moveTo(x,y+s*.3);g.lineTo(x,y-s*.75);g.stroke();[-.45,-.05,.35].forEach(dy=>[-1,1].forEach(sd=>blob(x+sd*s*.22,y+dy*s,s*.2,s*.08,sd*-.25,null)));blob(x,y-s*.78,s*.08,s*.18,0,null)}}
function backdrop(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.3);g.fillRect(0,0,W,H);
 ({bug:()=>follow(BUG,BUGS),ask:drawAsk,split:drawSplit,build:drawBuild,leaf:()=>follow(LEAF,LEAVES),chal:()=>tree(BUG,[],['spider','snail','ladybird','worm'],0)})[part()]();A.fx.draw(g)}
function follow(T,list){const W=A.W,H=A.H,C=A.col;if(K.r>=list.length){tree(T,[],list.map(s=>s[0]),0);label('Answer each question in turn and the key names it.',W/2,H*.7,15,C.tx,800);return}
 const s=list[K.r];if(T===LEAF)leafArt(s[1],W/2,H*.07,H*.07);else{const g=A.ctx;g.beginPath();g.arc(W/2,H*.08,24,0,7);g.fillStyle='#ffffff';g.fill();g.lineWidth=2;g.strokeStyle=C.mu;g.stroke();label(s[1],W/2,H*.08+1,26)}tree(T,K.path,K.found,!K.done);
 const n=nodeAt(T,K.path);label(K.done?`It is ${/^[aeiou]/.test(s[0])?'an':'a'} ${s[0]}!`:n.q,W/2,H*.7,16,K.done?C.gr:C.tx,800);
 if(!K.done)['Yes','No'].forEach((t,i)=>{const r=two(i);tile(r,K.miss===i?A.alpha(C.rd,.25):A.alpha(C.vi,.13));label(t,r.x+r.w/2,r.y+r.h/2,18,C.tx,800)})}
function drawAsk(){const W=A.W,H=A.H,C=A.col;if(K.r>=ASK.length){label('Good key questions have one clear yes or no answer.',W/2,H*.35,16,C.tx,800);label('They ask one thing, and anyone can check it.',W/2,H*.5,15);return}
 const a=ASK[K.r],r={x:20,y:H*.25,w:W-40,h:H*.22};tile(r,A.alpha(C.am,.15));label(`“${a[0]}”`,W/2,r.y+r.h/2,20,C.tx,800);
 label(K.done?a[2]:`Question ${K.r+1} of ${ASK.length}: is this a good key question?`,W/2,H*.1,14,C.tx,700);if(K.done)label(a[1]?'✓ Good key question':'✗ Not a good key question',W/2,H*.62,16,a[1]?C.gr:C.rd,800);
 ['Good question','Not good'].forEach((t,i)=>{const b=two(i);tile(b,K.miss===i?A.alpha(C.rd,.25):K.done&&i===1-a[1]?A.alpha(C.gr,.3):A.alpha(C.vi,.13));label(t,b.x+b.w/2,b.y+b.h/2,17,C.tx,800)})}
function drawSplit(){const W=A.W,H=A.H,C=A.col;if(K.r>=SPLIT.length){label('A good question splits a group into two smaller groups.',W/2,H*.4,16,C.tx,800);return}
 const Q=SPLIT[K.r],n=Q.g.length;label(K.done?`${Q.o.find(o=>o[1]==='ok')[0]} Yes on the left, no on the right.`:'Which question splits this group in two?',W/2,H*.08,14,C.tx,700);
 if(K.done){[1,0].forEach((v,side)=>{const r={x:12+side*(W/2),y:H*.17,w:W/2-24,h:H*.38};tile(r,A.alpha(v?C.gr:C.am,.14));label(v?'Yes':'No',r.x+r.w/2,r.y+14,13,C.tx,800);
  Q.g.filter(x=>x[2]===v).forEach((x,k,arr)=>{label(x[1],r.x+r.w*(k+.5)/arr.length,r.y+r.h*.5,28);label(x[0],r.x+r.w*(k+.5)/arr.length,r.y+r.h*.8,11,C.tx,700,r.w/arr.length-2)})})}
 else Q.g.forEach((x,k)=>{const cx=W*(k+.5)/n;label(x[1],cx,H*.3,34);label(x[0],cx,H*.44,12,C.tx,700,W/n-4)});
 Q.o.forEach((o,i)=>{const r=row(i);tile(r,K.miss===i?A.alpha(C.rd,.25):K.done&&o[1]==='ok'?A.alpha(C.gr,.3):A.alpha(C.vi,.12));label(o[0],W/2,r.y+r.h/2,14,C.tx,700)})}
function drawBuild(){const W=A.W,H=A.H,C=A.col,T={q:K.r>0?MADE.q:'?',y:K.r>1?MADE.y:{q:'?',y:['',''],n:['','']},n:K.r>2?MADE.n:{q:'?',y:['',''],n:['','']}};
 tree(T,[],K.ends,0);if(K.r>=BUILD.length){label('Your key names all 4 animals.',W/2,H*.68,16,C.gr,800);return}
 label(`Choose a question to split: ${BUILD[K.r].who}`,W/2,H*.08,14,C.tx,700);BUILD[K.r].o.forEach((o,i)=>{const r=row(i);tile(r,K.miss===i?A.alpha(C.rd,.25):A.alpha(C.vi,.12));label(o[0],W/2,r.y+r.h/2,14,C.tx,700)})}
function nope(i){K.miss=i;setTimeout(()=>{K.miss=null;show()},A.reduced()?10:800)}
function answer(yes){const v=part(),T=v==='leaf'?LEAF:BUG,L=v==='leaf'?LEAVES:BUGS;if((v!=='bug'&&v!=='leaf')||K.done||K.r>=L.length)return;const s=L[K.r],n=nodeAt(T,K.path),side=yes?n.y:n.n;
 const want=(n.y[0]===s[0]||(n.y.q&&[n.y.y[0],n.y.n[0]].includes(s[0])))?1:0;
 if(yes!==want){ping('miss');nope(yes?0:1);voice(`Look again. ${s[2]} So the answer is ${want?'yes':'no'}.`);return show()}
 K.path.push(yes);ping('tick');if(!side.q){K.done=1;K.found.push(s[0]);ping('pop');voice(`${s[2]} The key says: ${s[0]}.`)}else voice(`${yes?'Yes':'No'}. Next question: ${side.q}`);sync()}
function judge(i){if(part()!=='ask'||K.done||K.r>=ASK.length)return;const a=ASK[K.r];if(i!==1-a[1]){ping('miss');nope(i);voice(a[2]);return show()}K.done=1;ping('pop');voice(a[2]);sync()}
function choose(i){const v=part(),list=v==='split'?SPLIT:BUILD;if((v!=='split'&&v!=='build')||K.done||K.r>=list.length)return;const o=list[K.r].o[i];
 if(o[1]!=='ok'){ping('miss');nope(i);voice(o[1]==='all'?'Every one would say yes. The group does not split.':o[1]==='none'?'Every one would say no. Nothing splits.':o[1]==='again'?'That question was already asked. Both of these have wings.':'People could answer that differently. Ask about something you can see or check.');return show()}
 ping('pop');if(v==='build'){K.r++;if(K.r>1)K.ends.push(...(K.r===2?['bird','bat']:['crab','fish']));voice(K.r>=BUILD.length?'Done. Every animal has its own end in the key.':`Good. Now split: ${BUILD[K.r].who}.`);sync();return K.want()}
 K.done=1;voice(`${o[0]} Yes: ${list[K.r].g.filter(x=>x[2]).map(x=>x[0]).join(', ')}. No: ${list[K.r].g.filter(x=>!x[2]).map(x=>x[0]).join(', ')}.`);sync()}
function onward(){const v=part(),len={bug:BUGS.length,ask:ASK.length,split:SPLIT.length,leaf:LEAVES.length}[v];if(!len||!K.done||K.r>=len)return;K.r++;K.done=0;K.path=[];K.miss=null;ping('step');
 if(K.r>=len){sync();return K.want()}voice(v==='ask'?`Question ${K.r+1}: ${ASK[K.r][0]}`:v==='split'?'Next group.':`Next one. ${(v==='leaf'?LEAF:BUG).q}`);sync()}
function right(){const v=part(),T=v==='leaf'?LEAF:BUG,s=(v==='leaf'?LEAVES:BUGS)[K.r];if(!s||K.done)return;const n=nodeAt(T,K.path);answer(n.y[0]===s[0]||(n.y.q&&[n.y.y[0],n.y.n[0]].includes(s[0]))?1:0)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=part(),add=(t,f)=>{c.el('button',{type:'button',class:'lbtn ghost'},ctl,t).onclick=f};
 const len={bug:BUGS.length,ask:ASK.length,split:SPLIT.length,build:BUILD.length,leaf:LEAVES.length}[v];if(!len||K.r>=len)return;
 if(K.done){add(K.r<len-1?'Next one':'Finish',onward);return}
 if(v==='bug'||v==='leaf'){add('Yes',()=>answer(1));add('No',()=>answer(0))}
 if(v==='ask'){add('Good question',()=>judge(0));add('Not good',()=>judge(1))}
 if(v==='split'||v==='build')(v==='split'?SPLIT:BUILD)[K.r].o.forEach((o,i)=>add(o[0],()=>choose(i)))}
function down(p){const v=part();if(K.done){onward();return false}
 if(v==='bug'||v==='leaf')[0,1].forEach(i=>{if(on(p,two(i)))answer(1-i)});
 if(v==='ask')[0,1].forEach(i=>{if(on(p,two(i)))judge(i)});
 if(v==='split'||v==='build')[0,1,2].forEach(i=>{if(on(p,row(i)))choose(i)});return false}
const gate=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(n,acts){steps[n].go();const t=++K.t;acts.forEach((f,j)=>setTimeout(()=>{if(t===K.t)f()},A.reduced()?30*(j+1):(j+1)*250))}
function clear(){const t=(K.t||0)+1;for(const k in K)delete K[k];Object.assign(K,{t,want:()=>{},r:0,done:0,path:[],found:[],ends:[],miss:null})}
const okAt=list=>()=>choose(list[K.r].o.findIndex(o=>o[1]==='ok'));
const steps=[
{h:'Follow the key',p:'A classification key is a set of yes or no questions. Answer one question, follow the branch, and the key tells you the name.',
 predict:{q:'A spider reaches the question "Does it have 6 legs?". Which way does it go?',opts:['Yes, spiders are insects','No, it has 8 legs','It does not fit the key'],ans:1},task:'Name 4 animals with the key',
 show:()=>demo(0,[0,1,2,3].flatMap(()=>[right,right,onward])),
 go:()=>{clear();voice('Who is this? '+BUG.q);keys();K.want=gate(0,()=>K.r>=BUGS.length,'Each answer takes you down one branch to a name.')}},
{h:'Good questions',p:'A good key question has one clear answer. Everyone who looks gets the same yes or no.',
 predict:{q:'Is "Is it pretty?" a good key question?',opts:['Yes, anyone can answer it','No, people will answer it differently','Only for flowers'],ans:1},task:'Judge 5 questions',
 show:()=>demo(1,ASK.flatMap(a=>[()=>judge(1-a[1]),onward])),
 go:()=>{clear();voice('Question 1: '+ASK[0][0]);keys();K.want=gate(1,()=>K.r>=ASK.length,'Ask about things you can see, count or check.')}},
{h:'Split the group',p:'Each question in a key splits a group into two smaller groups: the yes group and the no group.',task:'Split 3 groups',
 show:()=>demo(2,[0,1,2].flatMap(()=>[okAt(SPLIT),onward])),
 go:()=>{clear();voice('Which question splits this group in two?');keys();K.want=gate(2,()=>K.r>=SPLIT.length,'A useful question gives some yes and some no.')}},
{h:'Build a key',p:'To build a key, keep splitting. Split the whole group, then split each smaller group, until every living thing is on its own.',task:'Choose 3 questions to build a key',
 show:()=>demo(3,[okAt(BUILD),okAt(BUILD),okAt(BUILD)]),
 go:()=>{clear();voice('Choose a question to split bird, bat, fish and crab.');keys();K.want=gate(3,()=>K.r>=BUILD.length,'Keep splitting until each one is alone.')}},
{h:'Leaf key',p:'Keys work for plants too. Look closely at the leaf: is it one piece, or made of small leaflets?',
 predict:{q:'A leaf is made of 5 leaflets that spread like fingers. Is it in one piece?',opts:['Yes','No, it has many leaflets','It is holly'],ans:1},task:'Name 4 leaves with the key',
 show:()=>demo(4,[0,1,2,3].flatMap(()=>[right,right,onward])),
 go:()=>{clear();voice('Look at the leaf. '+LEAF.q);keys();K.want=gate(4,()=>K.r>=LEAVES.length,'Look closely, then answer the key one question at a time.')}},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
const QS=[['What is a classification key for?',[['Naming a living thing by answering questions','ok'],['Counting animals','count'],['Showing who eats what','chain']]],
 ['Which is a good key question?',[['Does it have 6 legs?','ok'],['Is it cute?','opinion'],['Is it big?','vague']]],
 ['A key asks "Does it have 6 legs?" about a spider. The answer is…',[['No, a spider has 8 legs','ok'],['Yes, spiders are insects','insect'],['It depends on the spider','depends']]],
 ['Each question in a key splits a group into…',[['Two smaller groups','ok'],['One group','one'],['As many groups as you like','many']]],
 ['Bee, butterfly, fish, frog. Which question splits them?',[['Does it have wings?','ok'],['Is it alive?','all'],['Is it nice?','opinion2']]],
 ['Why is "Does it have legs and wings?" a poor key question?',[['It asks two things at once','ok'],['It is too short','short'],['No animal has wings','wings']]],
 ['A leaf is in one piece with prickly edges. The leaf key says…',[['Holly','ok'],['Ash','ash'],['Horse chestnut','fan']]]];
function fix(t){let m='Key questions have one clear yes or no answer.';
 if(t==='count')m='A key does not count. It asks yes or no questions until you reach a name.';
 if(t==='chain')m='That is a food chain. A key names a living thing by its features.';
 if(t==='opinion')m='People will not agree on cute. Ask about something you can see, like legs.';
 if(t==='vague')m='Big compared with what? Ask something you can check or count.';
 if(t==='insect')m='Spiders are not insects. A spider has 8 legs, so the answer is no.';
 if(t==='depends')m='Every spider has 8 legs, so the answer is always no.';
 if(t==='one')m='One group means nothing has been split. A question makes a yes group and a no group.';
 if(t==='many')m='A yes or no question gives two groups: yes and no.';
 if(t==='all')m='All four are alive, so all say yes and nothing splits. Wings splits them: bee and butterfly.';
 if(t==='opinion2')m='Nice is an opinion. Wings can be seen: bee and butterfly yes, fish and frog no.';
 if(t==='short')m='Length is not the problem. It asks about legs and wings at once.';
 if(t==='wings')m='Bees and birds have wings. The problem is two questions in one.';
 if(t==='ash')m='An ash leaf is made of many leaflets, not one piece. One piece with prickles is holly.';
 if(t==='fan')m='A horse chestnut leaf has 5 to 7 leaflets. One piece with prickles is holly.';
 return m}
function pose(){qno++;const[q,ops]=QS[qno%QS.length],sh=(qno+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},box,o).onclick=()=>score(t)});voice('Challenge: '+q);show()}
function score(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=t==='ok';
 if(yes){good++;A.win()}else{good=0;ping('miss')}fb.innerHTML=(yes?`✓ Right! ${good} in a row.`:'✗ '+fix(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw:backdrop,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);clear();A.gest({down});keys()}});
A.start()})})();
