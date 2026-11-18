/* Flagship – letter formation families (ages 5–6, NC England Y1): start dots, first moves, family sort, odd one out, slips. */
(()=>{const {PI,cos,sin,hypot,max,min,floor,ceil,abs,atan2}=Math;
/* strokes in u (across), v (0 top, .5 middle, 1 base, 1.4 tail line) */
const seg=(a,b,c,d)=>{const o=[];for(let i=0;i<=10;i++)o.push([a+(c-a)*i/10,b+(d-b)*i/10]);return o};
const bend=(cu,cv,r,a0,a1)=>{const n=max(12,ceil(abs(a1-a0)*10)),o=[];for(let i=0;i<=n;i++){const t=a0+(a1-a0)*i/n;o.push([cu+r*cos(t),cv+r*sin(t)])}return o};
const ROUND=()=>bend(.25,.75,.25,-PI/3,-PI/3-2*PI),HUMP=(x,w)=>[seg(x,1,x,.72),bend(x+w,.72,w,PI,2*PI),seg(x+2*w,.72,x+2*w,1)];
const SHAPE={
l:[seg(.1,0,.1,1)],i:[seg(.1,.5,.1,1)],t:[seg(.15,.15,.15,1),seg(0,.5,.32,.5)],
u:[seg(.05,.5,.05,.8),bend(.25,.8,.2,PI,0),seg(.45,.8,.45,.5),seg(.45,.5,.45,1)],
c:[bend(.25,.75,.25,-PI/3,-5*PI/3)],o:[ROUND()],a:[ROUND(),seg(.5,.5,.5,1)],d:[ROUND(),seg(.5,0,.5,1)],
g:[ROUND(),seg(.5,.5,.5,1.2),bend(.3,1.2,.2,0,PI*.95)],q:[ROUND(),seg(.5,.5,.5,1.4)],
r:[seg(.05,.5,.05,1),seg(.05,1,.05,.72),bend(.25,.72,.2,PI,PI*1.85)],n:[seg(.05,.5,.05,1),...HUMP(.05,.2)],
h:[seg(.05,0,.05,1),...HUMP(.05,.2)],m:[seg(.05,.5,.05,1),...HUMP(.05,.15),...HUMP(.35,.15)],
b:[seg(.05,0,.05,1),seg(.05,1,.05,.75),bend(.3,.75,.25,PI,3*PI)],
v:[seg(0,.5,.25,1),seg(.25,1,.5,.5)],w:[seg(0,.5,.15,1),seg(.15,1,.3,.62),seg(.3,.62,.45,1),seg(.45,1,.6,.5)],z:[seg(0,.5,.45,.5),seg(.45,.5,0,1),seg(0,1,.45,1)]};
const DOTS={i:[.1,.3]};
const FAM=['ladder','curly c','robot','zigzag'],FAMOF={};['litujy','cadesgfqo','rbnhmkp','vwxz'].forEach((s,k)=>[...s].forEach(ch=>FAMOF[ch]=k));
const FMOVE=['pull down from the top','curl back over the top, like c','down, back up the line, then over','slant down, then up'];
const FCOL=[['#dcfce7','#15803d'],['#e0f2fe','#0369a1'],['#fef3c7','#b45309'],['#ede9fe','#6d28d9']];
const START=['l','c','n','a','v','d'],MOVE=[['t',0],['o',1],['n',2],['v',3],['c',1],['r',2]],
SORT=['l','d','n','o','t','v','h','a','z','g','i','r'],ODD=[[[...'clao'],1],[[...'rnmi'],3],[[...'bvwz'],0],[[...'ltou'],2],[[...'gqdh'],3]],
SLIP=[['o','turn'],['l','bottom'],['a','ok'],['d','turn'],['n','ok'],['t','bottom']],SLIPOPT=[['ok','right way'],['bottom','started at the bottom'],['turn','wrong way round']];
VIS.reg('flagltrfam',c=>{let A,tray,cq,qi=-1,ver=0;const S={},no=()=>A.sound.miss(),yes=()=>A.sound.pop();
const INK='#1c1917',OK='#15803d',BAD='#be123c',LINE='#94a3b8',PEN='#2563eb',PAPER='#fffdf7';
const z=v=>Math.round(v*(A.narrow?.95:1.1)),font=(v,w)=>`${w||800} ${z(v)}px system-ui,sans-serif`;
const now=()=>['start','move','sort','odd','slip','quiz'][A.step],hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const mid=g=>{g.textAlign='center';g.textBaseline='middle'},poly=(g,P)=>{g.beginPath();P.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]))};
function ground(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#f5f3ee';g.fillRect(0,0,A.W,A.H)}
function head(t,y,won){const g=A.ctx;let n=15;g.font=font(n);while(g.measureText(t).width+28>A.W-8&&n>10){n--;g.font=font(n)}
const w=g.measureText(t).width+24,h=z(n)+16;g.fillStyle=won?'#dcfce7':'#fff';A.paint.rrect(A.W/2-w/2,y-h/2,w,h,10);g.fill();g.lineWidth=won?2.5:1.5;g.strokeStyle=won?OK:LINE;g.stroke();
g.fillStyle=INK;mid(g);g.fillText(t,A.W/2,y+1)}
function note(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=font(n||14,600);mid(g);g.fillText(t,A.W/2,y,A.W-12)}
function paper(r){const g=A.ctx;g.fillStyle=PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=1.5;g.strokeStyle=LINE;g.stroke();
const s=r.s;[[0,1],[.5,1],[1,2.2],[1.4,1]].forEach(([v,w])=>{g.beginPath();g.moveTo(r.x+8,r.oy+v*s);g.lineTo(r.x+r.w-8,r.oy+v*s);g.lineWidth=w;g.strokeStyle=v===1?'#64748b':'#cbd5e1';g.setLineDash(v===.5?[6,5]:[]);g.stroke()});g.setLineDash([])}
function card(x,y,w,h){const s=min(h/1.7,w/1.1);return{x,y,w,h,s,oy:y+h*.12,ox:x+w/2}}
const span=ch=>max(...SHAPE[ch].flat().map(p=>p[0]));
const at=(r,ch,p)=>[r.ox-span(ch)*r.s/2+p[0]*r.s,r.oy+p[1]*r.s];
function letter(r,ch,o){o=o||{};const g=A.ctx,list=o.strokes||SHAPE[ch],tot=list.reduce((a,s)=>a+s.length-1,0);let left=o.prog==null?tot:o.prog*tot;
g.lineCap='round';g.lineJoin='round';g.strokeStyle=o.ghost?'#cbd5e1':(o.col||INK);g.lineWidth=max(3,r.s*(o.ghost?.07:.09));
for(const s of list){if(left<=0)break;poly(g,s.slice(0,floor(left)+1).map(p=>at(r,ch,p)));g.stroke();left-=s.length-1}
if(DOTS[ch]&&(o.prog==null||o.prog>=1)){const q=at(r,ch,DOTS[ch]);g.fillStyle=g.strokeStyle;g.beginPath();g.arc(q[0],q[1],g.lineWidth*.7,0,7);g.fill()}}
function grow(ch,r){const t={p:0};S.anim={ch,t};A.tween(t,{p:1},900,'io')}
const big=()=>{const w=min(A.W-40,z(230)),h=min(A.H*.5,w*1.1);return card(A.W/2-w/2,A.H*.15,w,h)};
function drawGrow(r){if(S.anim)letter(r,S.anim.ch,{prog:S.anim.t.p,col:OK})}
function mini(cur){if(!S.anim||S.anim.ch===cur)return;const h=A.H*.17,w=h*.9,r=card(A.W/2-w/2,A.H*.81,w,h);paper(r);drawGrow(r)}
function choices(ch){const r=big(),st=SHAPE[ch],first=st[0][0],last=st[st.length-1].slice(-1)[0],mid=st.length>1?st[1][0]:st[0][floor(st[0].length/2)];
const pts=[first,last,mid].map(p=>at(r,ch,p));const o=START.indexOf(ch);
return[0,1,2].map(j=>(j+o)%3).map(k=>({x:pts[k][0],y:pts[k][1],k}))}
function drawStart(){const s=S.start;ground();if(s.n>=START.length){head('All 6 starts found',A.H*.07,1);note('Every letter starts at the top of its first shape.',A.H*.5,15);return}
const ch=START[s.n],r=big();head(`Letter ${s.n+1} of 6: tap where the pencil starts`,A.H*.07);paper(r);letter(r,ch,{ghost:1});
choices(ch).forEach((d,i)=>{const g=A.ctx,R=z(17);g.fillStyle=s.bad===i?'#ffe4e6':'#fff';g.beginPath();g.arc(d.x,d.y,R,0,7);g.fill();g.lineWidth=3;g.strokeStyle=s.bad===i?BAD:PEN;g.stroke();
g.fillStyle=INK;g.font=font(15);mid(g);g.fillText(String(i+1),d.x,d.y+1)});if(s.prev)note(s.prev,A.H*.76,14);mini(ch)}
function start(i){const s=S.start;if(s.n>=START.length)return;const ch=START[s.n],d=choices(ch)[i],f=FAMOF[ch];
if(d.k!==0){s.bad=i;no();return say(d.k===1?`That is where ${ch} finishes. Start at the other end: ${FMOVE[f]}.`:
ch==='d'||ch==='a'?`${ch} does not start with its stick. It starts like c: curl back over the top first, then the stick.`:`That is the middle of ${ch}. Find where the first line begins.`)}
s.n++;s.bad=null;s.prev=`${ch}: ${FMOVE[f]}`;yes();grow(ch);say(`Yes. ${ch} starts there: ${FMOVE[f]}.`+(s.n>=START.length?' All 6 found.':''))}
const MNAME=['pull straight down','curl back to the left','down, back up and over','zigzag down and up'];
function sortPath(path){if(path.length<3)return -1;const x0=path[0].x,y0=path[0].y,R=big().s,dys=path.map(p=>p.y-y0),deep=max(...dys),end=dys[dys.length-1],endx=path[path.length-1].x-x0;
const e=path[max(2,ceil(path.length/6))],ex=e.x-x0,ey=e.y-y0;let turn=0;
for(let i=2;i<path.length;i++){const ax=path[i-1].x-path[i-2].x,ay=path[i-1].y-path[i-2].y,bx=path[i].x-path[i-1].x,by=path[i].y-path[i-1].y;if(hypot(ax,ay)<.5||hypot(bx,by)<.5)continue;turn+=atan2(ax*by-ay*bx,ax*bx+ay*by)}
if(ey>0&&abs(ex)<ey*.35){if(deep>R*.25&&end<deep*.6)return 2;if(deep>R*.25)return 0}
if(abs(turn)>2.3)return turn<0?1:4;
if(deep>R*.2&&endx>R*.15&&end<deep*.6)return 3;return -1}
function drawMove(){const s=S.move;ground();if(s.n>=MOVE.length){head('All 6 first moves made',A.H*.07,1);MNAME.forEach((t,k)=>note(`${FAM[k]}: ${t}`,A.H*(.25+k*.13),16));return}
const [ch]=MOVE[s.n],r=big();head(`Letter ${s.n+1} of 6: drag the first move of ${ch}`,A.H*.07);paper(r);letter(r,ch,{ghost:1});
if(S.anim&&S.anim.ch===ch)drawGrow(r);const q=at(r,ch,SHAPE[ch][0][0]),g=A.ctx;g.fillStyle=OK;g.beginPath();g.arc(q[0],q[1],z(11),0,7);g.fill();
if(S.trail&&S.trail.length>1){g.strokeStyle=PEN;g.lineWidth=z(7);g.lineCap='round';g.beginPath();poly(g,S.trail.map(p=>[p.x,p.y]));g.stroke()}
note(s.prev||'Put your finger on the green dot and move',A.H*.76,14);mini(ch)}
function move(k){const s=S.move;if(s.n>=MOVE.length)return;const [ch,want]=MOVE[s.n];S.trail=null;
if(k!==want){s.bad=k;no();const w=want===1&&k===4?`Wrong way round. ${ch} is a curly c letter: curl back over the top, to the left.`:
want===2&&k===0?`Keep going. ${ch} is a robot letter: down, back up the line, then over.`:
want===0&&k===2?`${ch} is a ladder letter: one pull down, no going back up.`:k<0?`Try again from the green dot. ${ch}: ${FMOVE[want]}.`:`That is the ${FAM[k]} move. ${ch} is a ${FAM[want]} letter: ${FMOVE[want]}.`;return say(w)}
s.n++;s.bad=null;s.prev=`${ch} is a ${FAM[want]} letter`;yes();grow(ch);say(`Yes. ${ch}: ${MNAME[want]}. It is a ${FAM[want]} letter.`+(s.n>=MOVE.length?' All 6 made.':''))}
function boxes(y){const n=4,gap=6,w=(A.W-16-gap*(n-1))/n;return FAM.map((t,j)=>({x:8+j*(w+gap),y,w,h:A.H-y-8,t,j}))}
const tile=()=>{const w=z(70);return{x:A.W/2-w/2,y:A.H*.14,w,h:z(80)}};
function drawSort(){const s=S.sort,g=A.ctx;ground();head(s.n>=SORT.length?'All 12 letters sorted':`Letter ${s.n+1} of 12: which family?`,A.H*.07,s.n>=SORT.length);
boxes(A.H*.46).forEach(b=>{g.fillStyle=FCOL[b.j][0];A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=s.bad===b.j?4:2;g.strokeStyle=s.bad===b.j?BAD:FCOL[b.j][1];g.stroke();
g.fillStyle=INK;g.font=font(13);g.textAlign='center';g.textBaseline='top';g.fillText(b.t,b.x+b.w/2,b.y+7,b.w-4);
const got=SORT.slice(0,s.n).filter(ch=>FAMOF[ch]===b.j);got.forEach((ch,i)=>{const cw=b.w/2-4,r=card(b.x+3+(i%2)*(cw+2),b.y+z(26)+floor(i/2)*z(46),cw,z(44));r.oy=r.y+r.h*.05;r.s=r.h/1.5;letter(r,ch,{col:FCOL[b.j][1]})})});
if(s.n<SORT.length){const t0=tile(),r=S.hold?{...t0,x:S.hold.x-t0.w/2,y:S.hold.y-t0.h/2}:t0,k=card(r.x,r.y,r.w,r.h);paper(k);g.lineWidth=S.hold?3.5:1.5;g.strokeStyle=S.hold?PEN:LINE;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();letter(k,SORT[s.n]);
if(!S.hold)note(s.prev||'Drag it to its family box',A.H*.14+z(94),13)}}
function sort(j){const s=S.sort;if(s.n>=SORT.length)return;const ch=SORT[s.n],f=FAMOF[ch];
if(j!==f){s.bad=j;no();return say(ch==='d'||ch==='g'||ch==='a'?`${ch} starts like c, so it is a curly c letter.`:ch==='h'?`h is tall, but h goes down, back up and over: a robot letter.`:`${ch}: ${FMOVE[f]}. That makes it a ${FAM[f]} letter.`)}
s.n++;s.bad=null;s.prev=`${ch} is a ${FAM[f]} letter`;yes();say(`${ch}: ${FAM[f]}.`+(s.n>=SORT.length?' All 12 sorted.':''))}
function row(){const n=4,gap=8,w=min(z(80),(A.W-20-gap*3)/n),h=w*1.25,x0=A.W/2-(n*w+gap*3)/2;return[0,1,2,3].map(i=>({x:x0+i*(w+gap),y:A.H*.3,w,h,i}))}
function drawOdd(){const s=S.odd,g=A.ctx;ground();if(s.n>=ODD.length){head('All 5 odd ones found',A.H*.07,1);note('Same first move, same family.',A.H*.5,16);return}
head(`Row ${s.n+1} of 5: tap the letter from a different family`,A.H*.07);const [a]=ODD[s.n];
row().forEach(r=>{const k=card(r.x,r.y,r.w,r.h);paper(k);if(s.bad===r.i){g.lineWidth=4;g.strokeStyle=BAD;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}letter(k,a[r.i])});
note('Think about the first move, not the look',A.H*.3+row()[0].h+z(24),14);if(s.prev)note(s.prev,A.H*.78,14)}
function odd(i){const s=S.odd;if(s.n>=ODD.length)return;const [a,k]=ODD[s.n],fam=FAM[FAMOF[a[k]]],rest=FAM[FAMOF[a[(k+1)%4]]];
if(i!==k){s.bad=i;no();return say(`${a[i]} is a ${rest} letter, like the others. Find the one that starts a different way.`)}
s.n++;s.bad=null;s.prev=`${a[k]} is the odd one out`;yes();say(`Yes. The others are ${rest} letters. ${a[k]} is a ${fam} letter.`+(s.n>=ODD.length?' All 5 found.':''))}
function slipStrokes(ch,kind){const st=SHAPE[ch];return kind==='ok'?st:[st[0].slice().reverse(),...st.slice(1)]}
function drawSlip(){const s=S.slip,g=A.ctx;ground();if(s.n>=SLIP.length){head('All 6 checked',A.H*.07,1);note('Start at the top. Curl back to the left.',A.H*.4,16);return}
const [ch,kind]=SLIP[s.n],r=big();head(`Letter ${s.n+1} of 6: is this the right way?`,A.H*.07);paper(r);letter(r,ch,{ghost:1});
const path=slipStrokes(ch,kind)[0],P=path.map(p=>at(r,ch,p));g.strokeStyle=PEN;g.lineWidth=max(3,r.s*.09);g.lineCap='round';poly(g,P);g.stroke();
g.fillStyle=OK;g.beginPath();g.arc(P[0][0],P[0][1],z(10),0,7);g.fill();const m=max(2,floor(P.length*.3)),a=P[m-1],b=P[m],ang=atan2(b[1]-a[1],b[0]-a[0]),L=z(20);
g.fillStyle=PEN;poly(g,[[.6,0],[1,2.5],[1,-2.5]].map(([k,t])=>[b[0]+cos(ang+t)*L*k,b[1]+sin(ang+t)*L*k]));g.fill();
note('Green dot: the start. Arrow: the way it goes.',A.H*.72,13);if(s.prev)note(s.prev,A.H*.8,14)}
function slip(k){const s=S.slip;if(s.n>=SLIP.length)return;const [ch,kind]=SLIP[s.n],f=FAMOF[ch];
if(k!==kind){s.bad=k;no();return say(kind==='ok'?`Look again: the start and the arrow are right. This ${ch} is fine.`:
kind==='bottom'?`The dot is at the bottom, so the pencil pushes up. Start ${ch} at the top.`:`The arrow goes round like a clock. ${ch} is a curly c letter: curl back over the top, to the left.`)}
s.n++;s.bad=null;s.prev=`${ch}: ${SLIPOPT.find(o=>o[0]===kind)[1]}`;yes();say(`Yes: ${SLIPOPT.find(o=>o[0]===kind)[1]}.`+(s.n>=SLIP.length?' All 6 checked.':''))}
function draw(){const k=now();if(k==='quiz'){ground();head('Challenge',A.H*.25,1);head('ladder · curly c · robot · zigzag',A.H*.55);return}
({start:drawStart,move:drawMove,sort:drawSort,odd:drawOdd,slip:drawSlip})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();
if(k==='start'&&S.start.n<START.length){const R=z(24),i=choices(START[S.start.n]).findIndex(d=>hypot(p.x-d.x,p.y-d.y)<R);if(i>=0)start(i);return false}
if(k==='move'&&S.move.n<MOVE.length){const ch=MOVE[S.move.n][0],r=big(),q=at(r,ch,SHAPE[ch][0][0]);if(hypot(p.x-q[0],p.y-q[1])<z(34)){S.trail=[p];A.redraw();return true}return false}
if(k==='sort'&&S.sort.n<SORT.length){if(hit(p,tile())){S.hold={x:p.x,y:p.y};return true}const b=boxes(A.H*.46).find(r=>hit(p,r));if(b)sort(b.j);return false}
if(k==='odd'&&S.odd.n<ODD.length){const r=row().find(r=>hit(p,r));if(r)odd(r.i)}return false}
function drag(p){if(S.trail){S.trail.push(p);A.redraw()}else if(S.hold){S.hold.x=p.x;S.hold.y=p.y;A.redraw()}}
function up(p){if(S.trail){const t=S.trail;t.push(p);move(sortPath(t));return}if(!S.hold)return;S.hold=null;const b=boxes(A.H*.46).find(r=>hit(p,r));if(b)sort(b.j);else A.redraw()}
function reset(){ver++;for(const k in S)delete S[k];Object.assign(S,{start:{n:0},move:{n:0},sort:{n:0},odd:{n:0},slip:{n:0},hold:null,trail:null,anim:null,test:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.test()}
function open(i,desc,ok,msg){reset();say(desc);S.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function buttons(){if(!tray)return;tray.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
if(k==='start'&&S.start.n<START.length){const ch=START[S.start.n];[0,1,2].forEach(i=>b(`Dot ${i+1}`,()=>start(i),`Start ${ch} at dot ${i+1}`))}
if(k==='move'&&S.move.n<MOVE.length)MNAME.forEach((t,j)=>b(t,()=>move(j),`First move of ${MOVE[S.move.n][0]}: ${t}`));
if(k==='sort'&&S.sort.n<SORT.length)FAM.forEach((t,j)=>b(t,()=>sort(j),`${SORT[S.sort.n]} is a ${t} letter`));
if(k==='odd'&&S.odd.n<ODD.length)ODD[S.odd.n][0].forEach((ch,i)=>b(ch,()=>odd(i),`${ch} is the odd one out`));
if(k==='slip'&&S.slip.n<SLIP.length)SLIPOPT.forEach(([v,t])=>b(t,()=>slip(v),`${SLIP[S.slip.n][0]}: ${t}`))}
const steps=[
{h:'Where does it start?',p:'Every letter has a start. Tap the dot where your pencil goes down first. Watch the letter grow.',
predict:{q:'Where does the pencil start on most small letters?',opts:['At the bottom','At the top of the first shape'],ans:1},task:'Find all 6 starts',
show:()=>play(0,START.map(()=>()=>start(choices(START[S.start.n]).findIndex(d=>d.k===0))),520),
go:()=>open(0,'l. Tap the dot where the pencil starts.',()=>S.start.n>=START.length,'No letter starts at the bottom.')},
{h:'The first move',p:'Letters in one family start with the same move. Put your finger on the green dot and make the first move.',task:'Make all 6 first moves',
show:()=>play(1,MOVE.map(m=>()=>move(m[1])),520),
go:()=>open(1,'t. Drag from the green dot: what is the first move?',()=>S.move.n>=MOVE.length,'Four moves start every small letter.')},
{h:'Sort the families',p:'Ladder letters pull down. Curly c letters start like c. Robot letters go down, back up and over. Zigzag letters slant. Drag each letter to its family.',
predict:{q:'d has a tall stick, like l. Which family is d in?',opts:['ladder, like l','curly c, like a'],ans:1},task:'Sort all 12 letters',
show:()=>play(2,SORT.map(ch=>()=>sort(FAMOF[ch])),330),
go:()=>open(2,'l. Drag it to its family box.',()=>S.sort.n>=SORT.length,'The first move decides the family, not the height.')},
{h:'Odd one out',p:'Three letters in each row are in the same family. Tap the one that starts a different way.',task:'Find all 5',
show:()=>play(3,ODD.map(([,k])=>()=>odd(k)),600),
go:()=>open(3,'Row 1. Tap the letter from a different family.',()=>S.odd.n>=ODD.length,'Same first move, same family.')},
{h:'Spot the slip',p:'The green dot shows the start and the arrow shows the way. Is the letter made the right way?',task:'Check all 6',
show:()=>play(4,SLIP.map(q=>()=>slip(q[1])),560),
go:()=>open(4,'o. Is it the right way, started at the bottom, or the wrong way round?',()=>S.slip.n>=SLIP.length,'Top start, curl back to the left.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.test()});
const QS=[
{q:'Which letter is in the same family as c?',a:'a',o:[['l','ladder'],['n','robot']]},
{q:'Where does the pencil start for l?',a:'At the top',o:[['At the bottom','bottom'],['In the middle','middle']]},
{q:'Which way does o go round?',a:'Back over the top, to the left',o:[['Over to the right, like a clock','clock'],['Straight down','ladder']]},
{q:'Which family is h in?',a:'robot: down, back up and over',o:[['ladder: it is tall','tall'],['curly c','curl']]},
{q:'Why do we practise c, a, d and g together?',a:'They start with the same c curve.',o:[['They are all tall.','tall'],['They are next to each other in the ABC.','abc']]},
{q:'Which family is v in?',a:'zigzag',o:[['ladder','ladder'],['robot','robot']]}];
function why(t){let m='Think about the first move.';if(t==='ladder')m='Ladder letters only pull straight down, like l and t.';if(t==='robot')m='Robot letters go down, back up and over, like n and r.';
if(t==='bottom')m='Small letters never start at the bottom. Start at the top and pull down.';if(t==='middle')m='l starts at the very top line, then pulls down.';
if(t==='clock')m='That is the wrong way round. o curls back over the top, to the left, like c.';if(t==='tall')m='Being tall does not choose the family. The first move does.';
if(t==='curl')m='Curly c letters start like c. h starts with a long pull down.';if(t==='abc')m='Families are about the first move, not the ABC.';return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const grp=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else no();
fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+why(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{cq.hidden=B.step!==5;tray.hidden=B.step===5;buttons()},
init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Letter family buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move:drag,up});buttons()}}).start()})})();
