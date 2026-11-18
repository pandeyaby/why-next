/* Flagship – personal space (ages 4–5; EYFS Development Matters PSED Reception "see themselves as a valuable individual",
   "build constructive and respectful relationships", "express their feelings and consider the feelings of others"; ELG
   Managing Self and Building Relationships; NSPCC PANTS / Talk PANTS: my body belongs to me, ask before touching).
   Five hands-on scenes: sort too close from just right, drag a line of children until no bubbles squash, spot the signs
   a friend wants space, ask before a hug and do what the answer says, and give family and people you do not know the
   right size of bubble. Not flagplease (manners) or flagfeel (naming feelings). Data in learn/bubble_art.js. */
(()=>{const {NEAR,BINS,WHYN,KIDS,START,GOOD,SIGNS,SNO,ASKS,ODD,PEOPLE,WAYS,WHYP,QS}=BUB;
VIS.reg('flagbubble',c=>{let A,pad,cbox,qi=-1,gen=0;const B={};c.fig.classList.add('young');
const DARK='#0f172a',YES='#047857',BAD='#b91c1c',GREY='#6b7280',HI='#7c3aed',FF='px system-ui,sans-serif';
const scene=()=>['near','line','signs','ask','size','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.15);
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.07:.55);g.fillRect(0,0,A.W,A.H)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||14);g.font=`800 ${n}${FF}`;let w=g.measureText(t).width+26;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${FF}`;w=g.measureText(t).width+26}
 const h=n+16,x0=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle=o.fill||'#ffffff';A.paint.rrect(x0,y-h/2,w,h,h/2);g.fill();
 g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?YES:o.bad?BAD:GREY;g.stroke();g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function wrap(t,max,g){const out=[''];t.split(' ').forEach(w=>{const s=out[out.length-1]?out[out.length-1]+' '+w:w;if(g.measureText(s).width>max&&out[out.length-1])out.push(w);else out[out.length-1]=s});return out}
function tile(r,e,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.grey?'#e5e7eb':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();
 g.lineWidth=o.ok||o.bad||o.sel?4:2;g.strokeStyle=o.ok?YES:o.bad?BAD:o.sel?HI:GREY;g.stroke();g.textAlign='center';g.textBaseline='middle';
 g.font=`${Math.round(Math.min(r.h*.34,r.w*.38))}${FF}`;g.fillStyle='#000';g.fillText(e,r.x+r.w/2,r.y+r.h*.3);
 const n=Math.round(Math.max(11,Math.min(fs(14),r.h*.13)));g.font=`800 ${n}${FF}`;g.fillStyle=DARK;const L=wrap(t,r.w-10,g).slice(0,3);
 L.forEach((s,j)=>g.fillText(s,r.x+r.w/2,r.y+r.h*.7+(j-(L.length-1)/2)*(n+3),r.w-8));
 if(o.ok||o.bad){g.fillStyle=o.ok?YES:BAD;g.beginPath();g.arc(r.x+14,r.y+14,11,0,7);g.fill();g.fillStyle='#ffffff';g.font=`900 13${FF}`;g.fillText(o.ok?'✓':'✗',r.x+14,r.y+15)}}
function tiles(n,cols,top,bot){const gap=10,rows=Math.ceil(n/cols),w=Math.min(165,(A.W-gap*(cols+1))/cols),h=Math.min(w*1.05,(bot-top-gap*(rows-1))/rows),x0=(A.W-(w*cols+gap*(cols-1)))/2;
 return Array.from({length:n},(_,i)=>({i,x:x0+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function pills(n,top,bot){const gap=10,h=Math.max(48,Math.min(66,(bot-top-gap*(n-1))/n)),w=Math.min(A.W-24,460);return Array.from({length:n},(_,j)=>({j,x:(A.W-w)/2,y:top+j*(h+gap),w,h}))}
function pill(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,r.h/2);g.fill();g.lineWidth=o.bad?4:2;g.strokeStyle=o.bad?BAD:GREY;g.stroke();
 g.fillStyle=DARK;g.font=`800 ${fs(15)}${FF}`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-16)}
/* 1. too close or just right */
function bin(k){const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.1,w,h:A.H*.28}}
const nearTiles=()=>tiles(6,3,A.H*.44,A.H*.98);
function drawNear(){const s=B.a,g=A.ctx;ground();
 BINS.forEach(([e,t],k)=>{const r=bin(k);g.fillStyle=k?(A.col.dark?'#064e3b':'#bbf7d0'):(A.col.dark?'#7f1d1d':'#fecaca');A.paint.rrect(r.x,r.y,r.w,r.h,22);g.fill();
  g.lineWidth=s.hot===k?4:2;g.strokeStyle=s.hot===k?HI:GREY;g.stroke();g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.dark?'#f9fafb':DARK;
  g.font=`900 ${fs(17)}${FF}`;g.fillText(e+' '+t,r.x+r.w/2,r.y+r.h*.24,r.w-12);
  const ins=s.in.filter(i=>NEAR[i][2]===k);g.font=`${Math.round(Math.min(r.h*.28,r.w/4.4))}${FF}`;g.fillStyle='#000';ins.forEach((i,j)=>g.fillText(NEAR[i][0],r.x+r.w*(.25+j*.25),r.y+r.h*.7))});
 nearTiles().forEach(r=>{if(s.in.includes(r.i)||(B.drag&&B.drag.i===r.i))return;tile(r,NEAR[r.i][0],NEAR[r.i][1],{bad:s.bad===r.i,sel:s.pick===r.i})});
 if(B.drag){const d=B.drag,r=nearTiles()[d.i];tile({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},NEAR[d.i][0],NEAR[d.i][1],{sel:1})}
 tag(s.in.length>=6?'All 6 sorted':'Too close or just right?',A.W/2,A.H*.045,{n:13,ok:s.in.length>=6})}
function drop(i,k){const s=B.a;if(s.in.includes(i))return;s.pick=null;
 if(NEAR[i][2]!==k){s.bad=i;A.sound.miss();return tell((k?'Not just right. ':'Not too close. ')+WHYN[i])}
 s.in.push(i);s.bad=-1;A.sound.pop();tell(WHYN[i]+(s.in.length>=6?' All 6 sorted: about an arm away is just right.':` ${s.in.length} of 6.`))}
/* 2. line up: no squashed bubbles */
const RAD=.1,kidY=()=>A.H*.55;
const squash=()=>{const x=B.b.x,out=[];for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)if(Math.abs(x[i]-x[j])<RAD*2)out.push(i,j);return[...new Set(out)]};
function drawLine(){const s=B.b,g=A.ctx;ground();const bad=squash(),y=kidY(),R=A.W*RAD;
 g.fillStyle=A.col.dark?'#334155':'#cbd5e1';g.fillRect(0,y+R*.9,A.W,6);
 s.x.forEach((f,i)=>{const x=f*A.W,sq=bad.includes(i);g.fillStyle=sq?'rgba(220,38,38,.18)':'rgba(4,120,87,.14)';g.beginPath();g.arc(x,y,R,0,7);g.fill();
  g.lineWidth=3;g.setLineDash(sq?[]:[6,5]);g.strokeStyle=sq?BAD:YES;g.stroke();g.setLineDash([]);
  g.font=`${Math.round(R*1.3)}${FF}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(KIDS[i][0],x,y);
  g.font=`800 ${fs(12)}${FF}`;g.fillStyle=A.col.tx;g.fillText(KIDS[i][1],x,y+R+18)});
 tag(bad.length?`${bad.length} bubbles squashed: drag children apart`:'No squashed bubbles: everyone has space',A.W/2,A.H*.1,{n:13,ok:!bad.length,bad:!!bad.length})}
function shift(i,f){const s=B.b;s.x[i]=Math.max(.08,Math.min(.92,f));const n=squash().length;tell(`${KIDS[i][1]} moved. `+(n?`${n} bubbles still squashed.`:'No bubbles squashed. Everyone is about an arm apart.'))}
/* 3. signs a friend wants space */
const signTiles=()=>tiles(6,3,A.H*.13,A.H*.98);
function drawSigns(){const s=B.c;ground();tag(s.got.length>=3?'All 3 space signs found':`Space signs: ${s.got.length} of 3`,A.W/2,A.H*.05,{n:13,ok:s.got.length>=3});
 signTiles().forEach(r=>{const x=SIGNS[r.i];tile(r,x[0],x[1],{ok:s.got.includes(r.i),bad:s.bad===r.i,grey:s.got.length>=3&&!x[2]})})}
function spy(i){const s=B.c;if(s.got.includes(i)||s.got.length>=3)return;const [,t,yes]=SIGNS[i];
 if(!yes){s.bad=i;A.sound.miss();return tell(SNO[t])}
 s.got.push(i);s.bad=-1;A.sound.pop();tell(`${t}: your friend wants space. Step back.`+(i===0||i===2?' No words needed: the body tells you.':'')+(s.got.length>=3?' All 3 found.':''))}
/* 4. ask before a hug */
const askOpts=()=>{const s=B.d,yes=ASKS[s.r][3]==='hug',odd=yes?ODD.filter(o=>o[1]!=='push'):[ODD[0],ODD[s.r]],all=[[ASKS[s.r][4],'ok'],...odd],z=(s.r+1)%3;return all.slice(z).concat(all.slice(0,z))};
const askPills=()=>pills(3,A.H*.5,A.H*.97);
function drawAsk(){const s=B.d,g=A.ctx;ground();
 if(s.r>=3){tag('All 3 friends answered',A.W/2,A.H*.08,{n:14,ok:1});tag('Yes → hug',A.W/2,A.H*.3,{n:14});tag('No → okay, step back',A.W/2,A.H*.48,{n:14});tag('High five → high five',A.W/2,A.H*.66,{n:14});return}
 const [e,name,says]=ASKS[s.r];tag(`Friend ${s.r+1} of 3`,A.W/2,A.H*.05,{n:12});
 g.font=`${Math.round(A.H*.1)}${FF}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText('🧒',A.W*.12,A.H*.18);g.fillText(e,A.W*.12,A.H*.37);
 tag('Can I have a hug?',A.W*.55,A.H*.18,{n:15,fill:'#dbeafe'});tag(`${name}: ${says}`,A.W*.55,A.H*.37,{n:15,fill:'#fef9c3'});
 askPills().forEach((r,j)=>{const o=askOpts()[j];pill(r,o[0],{bad:s.bad===o[1]})})}
function answer(t){const s=B.d;if(s.r>=3)return;const name=ASKS[s.r][1];
 if(t!=='ok'){s.bad=t;A.sound.miss();return tell(t==='push'?`${name} did not say yes to a hug. A hug without a yes is not okay.`:t==='nag'?`${name} already answered. Asking again and again is pushing. Do what ${name} said.`:`Grabbing is touching without asking. Do what ${name} said.`)}
 const want=ASKS[s.r][3];s.r++;s.bad=null;A.sound.pop();tell((want==='hug'?`${name} said yes, so a hug is fine.`:want==='stop'?`${name} said no. You said okay and stepped back. That is kind.`:`${name} wanted a high five, not a hug. Slap!`)+(s.r>=3?' Ask first, then do what your friend says.':''))}
/* 5. bubble size: family or someone you do not know */
function lane(k){const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.1,w,h:A.H*.28}}
const whoTiles=()=>tiles(6,3,A.H*.44,A.H*.98);
function drawSize(){const s=B.e,g=A.ctx;ground();
 WAYS.forEach(([e,t],k)=>{const r=lane(k);g.fillStyle=k?(A.col.dark?'#1e3a8a':'#bfdbfe'):(A.col.dark?'#713f12':'#fde68a');A.paint.rrect(r.x,r.y,r.w,r.h,22);g.fill();
  g.lineWidth=s.hot===k?4:2;g.strokeStyle=s.hot===k?HI:GREY;g.stroke();g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.dark?'#f9fafb':DARK;
  g.font=`900 ${fs(15)}${FF}`;g.fillText(e+' '+t,r.x+r.w/2,r.y+r.h*.24,r.w-12);
  const ins=s.in.filter(i=>PEOPLE[i][2]===k);g.font=`${Math.round(Math.min(r.h*.28,r.w/4.4))}${FF}`;g.fillStyle='#000';ins.forEach((i,j)=>g.fillText(PEOPLE[i][0],r.x+r.w*(.25+j*.25),r.y+r.h*.7))});
 whoTiles().forEach(r=>{if(s.in.includes(r.i)||(B.drag&&B.drag.i===r.i))return;tile(r,PEOPLE[r.i][0],PEOPLE[r.i][1],{bad:s.bad===r.i,sel:s.pick===r.i})});
 if(B.drag){const d=B.drag,r=whoTiles()[d.i];tile({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},PEOPLE[d.i][0],PEOPLE[d.i][1],{sel:1})}
 tag(s.in.length>=6?'All 6 sorted':'Hug or wave?',A.W/2,A.H*.045,{n:13,ok:s.in.length>=6})}
function greet(i,k){const s=B.e;if(s.in.includes(i))return;s.pick=null;
 if(PEOPLE[i][2]!==k){s.bad=i;A.sound.miss();return tell(WHYP[i])}
 s.in.push(i);s.bad=-1;A.sound.pop();tell(WHYP[i]+(s.in.length>=6?' Family can hug if you both want. People you do not know get a wave.':` ${s.in.length} of 6.`))}
function draw(){const k=scene();if(k==='quiz'){ground();tag('Challenge',A.W/2,A.H*.16,{ok:1});tag('🫧 My bubble · your bubble · ask first',A.W/2,A.H*.5,{n:14});return}
 ({near:drawNear,line:drawLine,signs:drawSigns,ask:drawAsk,size:drawSize})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene();
 if(k==='near'||k==='size'){const s=k==='near'?B.a:B.e,T=k==='near'?nearTiles():whoTiles(),box=k==='near'?bin:lane;const r=T.find(r=>isIn(p,r)&&!s.in.includes(r.i));if(r){B.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const b=[0,1].find(j=>isIn(p,box(j)));if(b!=null&&s.pick!=null)(k==='near'?drop:greet)(s.pick,b);return false}
 if(k==='line'){const R=A.W*RAD,y=kidY();let best=-1,bd=1e9;B.b.x.forEach((f,i)=>{const d=Math.hypot(p.x-f*A.W,p.y-y);if(d<bd){bd=d;best=i}});if(best>=0&&bd<=Math.max(R,24)){B.drag={kid:best,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(k==='signs'){const r=signTiles().find(r=>isIn(p,r));if(r)spy(r.i);return false}
 if(k==='ask'&&B.d.r<3){const r=askPills().find(r=>isIn(p,r));if(r)answer(askOpts()[r.j][1]);return false}return false}
function move(p){const d=B.drag;if(!d)return;d.x=p.x;d.y=p.y;const k=scene();
 if(k==='line'){B.b.x[d.kid]=Math.max(.08,Math.min(.92,p.x/A.W));A.cv.setAttribute('aria-label',`${KIDS[d.kid][1]} moving. ${squash().length} bubbles squashed.`)}
 if(k==='near'||k==='size'){const box=k==='near'?bin:lane,h=[0,1].find(j=>isIn(p,box(j)));(k==='near'?B.a:B.e).hot=h==null?-1:h}A.redraw()}
function up(p){const d=B.drag;if(!d)return;B.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=scene();
 if(k==='line'){if(!tap)shift(d.kid,p.x/A.W);return}
 const s=k==='near'?B.a:B.e,L=k==='near'?NEAR:PEOPLE,box=k==='near'?bin:lane,act=k==='near'?drop:greet;s.hot=-1;
 const b=[0,1].find(j=>isIn(p,box(j)));if(b!=null)return act(d.i,b);if(tap){s.pick=d.i;return tell(`${L[d.i][1]}: picked. Now tap a box.`)}A.redraw()}
function reset(){gen++;for(const k in B)delete B[k];Object.assign(B,{a:{in:[],bad:-1,hot:-1,pick:null},b:{x:START.slice()},c:{got:[],bad:-1},d:{r:0,bad:null},e:{in:[],bad:-1,hot:-1,pick:null},drag:null,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();B.hook()}
const check=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){reset();tell(desc);B.hook=check(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='near')NEAR.forEach((x,i)=>{if(!B.a.in.includes(i)){Bt(`${x[0]} ${x[1]} → ✋`,()=>drop(i,0),`${x[1]}: too close`);Bt(`${x[0]} ${x[1]} → 👍`,()=>drop(i,1),`${x[1]}: just right`)}});
 if(k==='line')KIDS.forEach((x,i)=>{Bt(`◀ ${x[1]}`,()=>shift(i,B.b.x[i]-.05),`Move ${x[1]} left`);Bt(`${x[1]} ▶`,()=>shift(i,B.b.x[i]+.05),`Move ${x[1]} right`)});
 if(k==='signs'&&B.c.got.length<3)SIGNS.forEach((x,i)=>{if(!B.c.got.includes(i))Bt(`${x[0]} ${x[1]}`,()=>spy(i),`${x[1]}: does it mean give space?`)});
 if(k==='ask'&&B.d.r<3)askOpts().forEach(o=>Bt(o[0],()=>answer(o[1]),`Do this: ${o[0].slice(2)}`));
 if(k==='size')PEOPLE.forEach((x,i)=>{if(!B.e.in.includes(i)){Bt(`${x[0]} ${x[1]} → 🤗`,()=>greet(i,0),`${x[1]}: hug if we both want`);Bt(`${x[0]} ${x[1]} → 👋`,()=>greet(i,1),`${x[1]}: wave or say hi`)}})}
const steps=[
{h:'Too close or just right?',p:'Everyone has a bubble of space around them. Drag each picture to Too close or Just right, or tap it and then tap a box.',
 task:'Sort all 6 pictures',show:()=>auto(0,[[0,0],[1,1],[2,0],[3,1],[4,0],[5,1]].map(([i,k])=>()=>drop(i,k)),600),
 go:()=>begin(0,'Two boxes: Too close and Just right. Six pictures to sort.',()=>B.a.in.length>=6,'Nose to nose, leaning and face in a face are too close. About an arm away is just right.')},
{h:'Line up with space',p:'Four children in a line, each with a bubble. Red bubbles are squashed. Drag the children apart, or use the arrow buttons.',
 predict:{q:'Bea is your best friend. Can you stand right up close to her?',opts:['Yes, friends do not mind','No, friends need space too'],ans:1},task:'Make every bubble green',
 show:()=>auto(1,[0,1,2,3].map(i=>()=>shift(i,GOOD[i])),650),
 go:()=>begin(1,'Ali, Bea, Cal and Dot are squashed in a line. Their bubbles are red.',()=>!squash().length,'About an arm apart, no bubble is squashed. Best friends need space too.')},
{h:'Does my friend want space?',p:'Tap every sign that says: give me some space. Look at bodies, not just words.',
 predict:{q:'Your friend steps back but says nothing. Do they want space?',opts:['No, they did not say stop','Yes, stepping back means space'],ans:1},task:'Find all 3 space signs',
 show:()=>auto(2,[0,1,2].map(i=>()=>spy(i)),650),
 go:()=>begin(2,'Six pictures of a friend. Which ones mean give me space?',()=>B.c.got.length>=3,'Stepping back, saying stop and turning away all mean give me space. A body can say it without words.')},
{h:'Ask before a hug',p:'You ask: Can I have a hug? Your friend answers. Tap what you do next.',
 predict:{q:'Your best friend says no to a hug. What now?',opts:['Hug anyway, we are friends','Say okay and step back'],ans:1},task:'Do what all 3 friends say',
 show:()=>auto(3,[0,1,2].map(()=>()=>answer('ok')),700),
 go:()=>begin(3,'You ask Bear: Can I have a hug? Bear says: Yes, hug!',()=>B.d.r>=3,'Yes means hug. No means okay and step back. A high five instead means a high five.')},
{h:'Big bubble, small bubble',p:'Bubbles change size. Drag each person to Hug if we both want, or Wave or say hi.',
 task:'Sort all 6 people',show:()=>auto(4,[[0,0],[1,1],[2,0],[3,1],[4,0],[5,1]].map(([i,k])=>()=>greet(i,k)),600),
 go:()=>begin(4,'Two boxes: Hug if we both want, and Wave or say hi. Six people.',()=>B.e.in.length>=6,'Family can hug if you both want. People you do not know yet get a big bubble: a wave or a hello.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>B.hook()});
function slip(t){let m='Think: does everyone have room in their bubble?';
 if(t==='close')m='That is too close. Stand about an arm away.';
 if(t==='sign')m='Stepping back means your friend wants more space. Give it.';
 if(t==='push')m='Ask first, and only hug if the answer is yes.';
 if(t==='nag')m='No means no. Asking again and again is pushing.';
 if(t==='mine')m='Your bubble is yours. You can say: please give me some space.';
 if(t==='grab')m='Pushing or grabbing hurts. Use words, and tell a grown-up.';
 if(t==='size')m='You do not know them yet, so keep a big bubble. Wave and say hi.';
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 cbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){cbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:S=>{cbox.hidden=S.step!==5;pad.hidden=S.step===5;buttons()},
 init:S=>{A=S;const box=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Personal space buttons'},box);cbox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
