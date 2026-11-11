/* Flagship: compound words (ages 5-8; NC Y1 spelling appendix, CCSS L.2.4d). Glue, cut at the join, order by head word,
   sort real compounds from hidden-word tricks, find real rain compounds. Not flagsyl or flagrime. */
(()=>{
const PIC={sunshine:'🌞',football:'⚽',earring:'👂💍',sun:'☀️',foot:'🦶',ear:'👂',shine:'✨',ball:'⚽',ring:'💍',cup:'☕',cake:'🎂',snow:'❄️',man:'👨',tooth:'🦷',brush:'🖌️',bed:'🛏️',room:'🚪'};
const up1=w=>w[0].toUpperCase()+w.slice(1);
const GLUE=[['sun','shine','light from the sun'],['foot','ball','a ball you kick'],['ear','ring','a ring you wear on your ear']];
const BITS=['sun','foot','ear','shine','ball','ring'];
const CUTS=[['cupcake',3],['snowman',4],['toothbrush',5],['bedroom',3]];
const REAL=new Set(['cup','cake','snow','man','tooth','brush','bed','room','be','to','too','a','now','ow','oo']);
const ORD=[['A boat you can live in','house','boat'],['A shed where boats are kept','boat','house'],['A little house for a bird','bird','house']];
const SORTW=[['playground',0,'A playground is ground where you play.'],['carpet',1,'Car and pet hide in carpet, but a carpet is not a car or a pet. The little words must help the meaning.'],
['farmyard',0,'A farmyard is a yard on a farm.'],['button',1,'But and ton hide in button, but a button has nothing to do with them.'],
['blackberry',0,'A blackberry is a berry that is black.'],['season',1,'Sea and son hide in season. But a season, like summer, is not a son by the sea.']];
const SPLIT={playground:'play + ground',farmyard:'farm + yard',blackberry:'black + berry'};
const ENDS=['bow','coat','pen','drop','sit','fall'],GOOD={bow:'a bow of colours after rain',coat:'a coat to keep off the rain',drop:'a drop of rain',fall:'rain that falls'};
VIS.reg('flagcmpd',c=>{let A,pad,quiz,qn=-1,gen=0;const Z={};c.fig.classList.add('young');
const INK='#0f172a',GOODC='#047857',BADC='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',PART1='#1e40af',PART2='#9d174d',TAU=Math.PI*2;
const SF='system-ui,sans-serif',fnt=(n,w)=>`${w||800} ${n}px ${SF}`,sz=n=>A.narrow?n:Math.round(n*1.2);
const mode=()=>['glue','cut','order','sort','rain','chal'][A.step];
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.07:.5);g.fillRect(0,0,A.W,A.H)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=fnt(n);let w=g.measureText(t).width+24;while(w>A.W-10&&n>10){n--;g.font=fnt(n);w=g.measureText(t).width+24}
const h=n+16,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?GOODC:o.bad?BADC:EDGE;g.stroke();
g.fillStyle=INK;mid(g);g.fillText(t,l+w/2,y+1)}
function brick(r,word,o){o=o||{};const g=A.ctx;g.fillStyle=o.ghost?'#f1f5f9':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
g.lineWidth=o.ok||o.bad||o.sel?4:2;g.strokeStyle=o.ok?GOODC:o.bad?BADC:o.sel?SEL:EDGE;if(o.ghost)g.setLineDash([6,5]);g.stroke();g.setLineDash([]);if(!word)return;
const pic=o.pic!==false&&PIC[word];mid(g);
if(pic){g.font=`${Math.round(Math.min(r.h*.36,r.w*.4))}px ${SF}`;g.fillStyle='#000';g.fillText(pic,r.x+r.w/2,r.y+r.h*.34)}
let n=Math.round(Math.max(12,Math.min(sz(20),r.h*(pic?.26:.42))));g.font=fnt(n);while(g.measureText(word).width>r.w-8&&n>10){n--;g.font=fnt(n)}
g.fillStyle=o.col||INK;g.fillText(word,r.x+r.w/2,r.y+r.h*(pic?.78:.52))}
function twoTone(a,b,x,y,n){const g=A.ctx;g.font=fnt(n,900);const wa=g.measureText(a).width,wb=g.measureText(b).width,l=x-(wa+wb)/2;g.textAlign='left';g.textBaseline='middle';
g.fillStyle=A.col.dark?'#93c5fd':PART1;g.fillText(a,l,y);g.fillStyle=A.col.dark?'#f9a8d4':PART2;g.fillText(b,l+wa,y)}
const mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function lay(n,cols,y0,y1){const gap=10,rws=Math.ceil(n/cols),w=Math.min(150,(A.W-gap*(cols+1))/cols),h=Math.min(w,(y1-y0-gap*(rws-1))/rws),x0=(A.W-(w*cols+gap*(cols-1)))/2;
return [...Array(n)].map((_,i)=>({i,x:x0+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}))}
function slotsR(){const w=Math.min(130,A.W*.27),h=Math.min(96,A.H*.2),y=A.H*.14,gap=A.narrow?22:34,x0=A.W/2-w-gap/2-(A.narrow?20:30);return[{x:x0,y,w,h},{x:x0+w+gap,y,w,h}]}
const bitsR=()=>lay(6,3,A.H*.56,A.H*.98);
function drawGlue(){const s=Z.g,g=A.ctx;paper();
if(s.k>=3){tag('3 compound words made',A.W/2,A.H*.07,{ok:1});GLUE.forEach((t,j)=>twoTone(t[0],t[1],A.W/2,A.H*(.25+j*.17),sz(30)));tag('Each word keeps all its letters',A.W/2,A.H*.82,{n:13});return}
const t=GLUE[s.k];tag(`Word ${s.k+1} of 3: make ${t[2]}`,A.W/2,A.H*.06,{n:13});const R=slotsR();
R.forEach((r,j)=>brick(r,s.slot[j],{ghost:!s.slot[j],ok:!!s.slot[j]}));g.fillStyle=A.col.tx;g.font=fnt(sz(26),900);mid(g);
g.fillText('+',(R[0].x+R[0].w+R[1].x)/2,R[0].y+R[0].h/2);const ex=R[1].x+R[1].w+(A.narrow?10:16);g.fillText('=',ex+8,R[0].y+R[0].h/2);
g.font=`${sz(A.narrow?28:36)}px ${SF}`;g.fillStyle='#000';g.fillText(PIC[t[0]+t[1]],Math.min(A.W-30,ex+(A.narrow?40:56)),R[0].y+R[0].h/2);
if(s.made)twoTone(s.made[0],s.made[1],A.W/2,A.H*.43,sz(26));
bitsR().forEach(r=>{const w=BITS[r.i];if(s.used.includes(w)||(Z.drag&&Z.drag.i===r.i))return;brick(r,w,{bad:s.bad===w})});
if(Z.drag){const d=Z.drag,r=bitsR()[d.i];brick({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},BITS[d.i],{sel:1})}}
function glue(i){const s=Z.g;if(s.k>=3)return;const w=BITS[i],t=GLUE[s.k],j=s.slot[0]?1:0;if(s.used.includes(w))return;
if(w!==t[j]){s.bad=w;A.sound.miss();return say(w===t[1-j]?`${up1(w)} is the right word, but it goes ${j?'first':'last'}. ${up1(t[1])}${t[0]} is not a word: say ${t[0]}${t[1]}.`:`${up1(w)} does not help to make ${t[2]}. Look at the picture.`)}
s.slot[j]=w;s.used.push(w);s.bad=null;A.sound.pop();if(!j){s.made=null;return say(`${up1(w)}. Now find the second word.`)}
s.made=[t[0],t[1]];s.k++;s.slot=[null,null];
say(`${up1(t[0])} + ${t[1]} = ${t[0]}${t[1]}.`+(t[0]==='ear'?' Ear ends in r and ring starts with r, so earring has two r\'s. Keep every letter of both words.':' Both words keep all their letters.')+(s.k>=3?' 3 compound words made.':''))}
function letterR(){const w=CUTS[Math.min(Z.c.k,3)][0],n=w.length,pitch=Math.min(sz(46),(A.W-24)/n),x0=(A.W-pitch*n)/2,h=Math.min(64,A.H*.16);return{w,n,pitch,x0,y:A.H*.24,h}}
function drawCut(){const s=Z.c,g=A.ctx;paper();
tag(s.k>=4?'All 4 words cut':`Word ${s.k+1} of 4: tap where the two words join`,A.W/2,A.H*.07,{n:13,ok:s.k>=4});
if(s.k<4){const L=letterR();for(let i=0;i<L.n;i++){const x=L.x0+i*L.pitch;g.fillStyle='#ffffff';A.paint.rrect(x+2,L.y,L.pitch-4,L.h,8);g.fill();g.strokeStyle=EDGE;g.lineWidth=1.5;g.stroke();
g.fillStyle=INK;g.font=fnt(Math.min(sz(26),L.pitch*.7));mid(g);g.fillText(L.w[i],x+L.pitch/2,L.y+L.h/2+1)}
if(s.bad){const x=L.x0+s.bad*L.pitch;g.strokeStyle=BADC;g.lineWidth=4;g.beginPath();g.moveTo(x,L.y-10);g.lineTo(x,L.y+L.h+10);g.stroke()}
g.font=`${sz(24)}px ${SF}`;g.fillStyle='#000';g.fillText('✂️',A.W/2,L.y+L.h+28)}
s.done.forEach((d,j)=>{const y=A.H*(s.k>=4?.25:.62)+j*(A.H*(s.k>=4?.15:.09));const [a,b]=[d[0].slice(0,d[1]),d[0].slice(d[1])];
tag(`${PIC[a]||''} ${a}  +  ${b} ${PIC[b]||''}`,A.W/2,y,{n:s.k>=4?16:13,ok:1})})}
function cut(i){const s=Z.c;if(s.k>=4)return;const [w,at]=CUTS[s.k],a=w.slice(0,i),b=w.slice(i);
if(i!==at){s.bad=i;A.sound.miss();const ok1=REAL.has(a),ok2=REAL.has(b);
return say(`${a} + ${b}: `+(ok1&&!ok2?`${a} is a word, but ${b} is not.`:!ok1&&ok2?`${b} is a word, but ${a} is not.`:'neither part is a word.')+' Cut where both parts are whole words.')}
s.done.push([w,at]);s.k++;s.bad=null;A.sound.pop();say(`${up1(a)} + ${b}. Both parts are real words, and together they make ${w}.`+(s.k>=4?' All 4 cut.':''))}
function ordBits(){const t=ORD[Math.min(Z.o.k,2)],pair=Z.o.k===1?[t[1],t[2]]:[t[2],t[1]],w=Math.min(150,A.W*.36),h=Math.min(80,A.H*.17);
return pair.map((v,j)=>({v,x:A.W/2+(j?10:-10-w),y:A.H*.7,w,h}))}
function drawOrder(){const s=Z.o,g=A.ctx;paper();
if(s.k>=3){tag('3 meanings matched',A.W/2,A.H*.07,{ok:1});['houseboat: a kind of boat','boathouse: a kind of house','birdhouse: a kind of house'].forEach((t,j)=>tag(t,A.W/2,A.H*(.3+j*.16),{n:15,ok:1}));return}
const t=ORD[s.k];tag(`${s.k+1} of 3: ${t[0]}`,A.W/2,A.H*.08,{n:14});const R=slotsR().map(r=>({...r,y:A.H*.25}));
R.forEach((r,j)=>brick(r,s.slot[j],{ghost:!s.slot[j],ok:!!s.slot[j],pic:false}));g.fillStyle=A.col.tx;g.font=fnt(sz(26),900);mid(g);g.fillText('+',(R[0].x+R[0].w+R[1].x)/2,R[0].y+R[0].h/2);
tag('first',R[0].x+R[0].w/2,R[0].y+R[0].h+18,{n:11});tag('last: what it is',R[1].x+R[1].w/2,R[1].y+R[1].h+18,{n:11});
ordBits().forEach(r=>{if(!s.slot.includes(r.v))brick(r,r.v,{bad:s.bad===r.v,pic:false})})}
function order(v){const s=Z.o;if(s.k>=3)return;const t=ORD[s.k],j=s.slot[0]?1:0;if(s.slot.includes(v))return;
if(v!==t[1+j]){s.bad=v;A.sound.miss();return say(`${up1(v)}${t[1]} is not what the clue says. ${t[0]}: it is a kind of ${t[2]}, so ${t[2]} goes last.`)}
s.slot[j]=v;s.bad=null;A.sound.pop();if(!j)return say(`${up1(v)} first. What goes last?`);
s.k++;s.slot=[null,null];say(`${up1(t[1])}${t[2]}: ${t[0].toLowerCase()}. The last word, ${t[2]}, says what it is.`+(s.k>=3?' Swap the words and the meaning changes.':''))}
function binsR(){const w=(A.W-30)/2,h=A.H*.3;return[{x:10,y:A.H*.66,w,h},{x:20+w,y:A.H*.66,w,h}]}
function curR(){const w=Math.min(220,A.W*.6),h=Math.min(80,A.H*.17);return{x:A.W/2-w/2,y:A.H*.2,w,h}}
function drawSort(){const s=Z.s,g=A.ctx;paper();tag(s.k>=6?'All 6 sorted':`Card ${s.k+1} of 6: drag it to a box, or tap a box`,A.W/2,A.H*.07,{n:13,ok:s.k>=6});
binsR().forEach((r,j)=>{g.fillStyle=j?'#fff1f2':'#ecfdf5';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=j?BADC:GOODC;g.lineWidth=2.5;g.stroke();
g.fillStyle=INK;g.font=fnt(sz(14));g.textAlign='center';g.textBaseline='top';g.fillText(j?'Not a compound':'Compound word',r.x+r.w/2,r.y+8);
const got=SORTW.slice(0,s.k).filter(x=>x[1]===j).map(x=>x[0]);g.font=fnt(sz(13),700);got.forEach((w,q)=>g.fillText(w,r.x+r.w/2,r.y+34+q*sz(18)))});
if(s.k<6){const r=curR(),d=Z.drag;brick(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,SORTW[s.k][0],{pic:false,bad:s.bad,sel:!!d})}}
function sortIt(j){const s=Z.s;if(s.k>=6)return;const [w,bin,why]=SORTW[s.k];
if(j!==bin){s.bad=1;A.sound.miss();return say(bin?why:`Look again: ${SPLIT[w]}. ${why} The two words make the meaning, so it is a compound.`)}
s.k++;s.bad=0;A.sound.pop();say((bin?'Right, it is a trick. ':'Yes, a compound. ')+why+(s.k>=6?' All 6 sorted.':''))}
function petalR(){const cx=A.W/2,cy=A.H*.5,rad=Math.min(A.W*.36,A.H*.36),w=Math.min(110,A.W*.27),h=Math.min(62,A.H*.14);
return ENDS.map((e,i)=>{const a=-Math.PI/2+i*TAU/6;return{i,x:cx+rad*Math.cos(a)-w/2,y:cy+rad*Math.sin(a)*.95-h/2,w,h}})}
function drawRain(){const s=Z.r,g=A.ctx;paper();tag(`Real words found: ${s.got.length} of 4`,A.W/2,A.H*.05,{n:13,ok:s.got.length>=4});
const cx=A.W/2,cy=A.H*.5,R=Math.min(48,A.W*.12);g.fillStyle=A.col.dark?'#1e3a8a':'#dbeafe';g.beginPath();g.arc(cx,cy,R,0,TAU);g.fill();g.strokeStyle=SEL;g.lineWidth=3;g.stroke();
g.fillStyle=A.col.dark?'#ffffff':INK;g.font=fnt(sz(20),900);mid(g);g.fillText('rain',cx,cy+1);
petalR().forEach(r=>{const e=ENDS[r.i],ok=s.got.includes(e);brick(r,ok?'rain'+e:e,{ok,bad:s.bad===e,pic:false})})}
function rain(i){const s=Z.r,e=ENDS[i];if(s.got.includes(e)||s.got.length>=4)return;
if(!GOOD[e]){s.bad=e;A.sound.miss();return say(`Rain + ${e} = rain${e}. That is not a real word, so it is not a compound word. Both parts must join to make a real word.`)}
s.got.push(e);s.bad=null;A.sound.pop();say(`Rain + ${e} = rain${e}: ${GOOD[e]}.`+(s.got.length>=4?' Rainbow, raincoat, raindrop, rainfall. One word can start lots of compounds.':''))}
function draw(){const k=mode();if(k==='chal'){paper();tag('Challenge',A.W/2,A.H*.16,{ok:1});tag('Two words join to make one new word',A.W/2,A.H*.5,{n:15});return}
({glue:drawGlue,cut:drawCut,order:drawOrder,sort:drawSort,rain:drawRain})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
if(k==='glue'){const r=bitsR().find(r=>hit(p,r)&&!Z.g.used.includes(BITS[r.i]));if(r&&Z.g.k<3){Z.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
if(k==='sort'){if(Z.s.k>=6)return false;if(hit(p,curR())){Z.drag={x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const b=binsR().findIndex(r=>hit(p,r));if(b>=0)sortIt(b);return false}
if(k==='cut'&&Z.c.k<4){const L=letterR();if(p.y>L.y-24&&p.y<L.y+L.h+24){const i=Math.round((p.x-L.x0)/L.pitch);if(i>=1&&i<=L.n-1)cut(i)}return false}
if(k==='order'){const r=ordBits().find(r=>hit(p,r));if(r)order(r.v);return false}
if(k==='rain'){const r=petalR().find(r=>hit(p,r));if(r)rain(r.i)}return false}
function move(p){if(!Z.drag)return;Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}
function up(p){const d=Z.drag;if(!d)return;Z.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=mode();
if(k==='glue'){if(tap||slotsR().some(r=>hit(p,{x:r.x-20,y:r.y-20,w:r.w+40,h:r.h+40})))glue(d.i);else A.redraw();return}
if(k==='sort'){const b=binsR().findIndex(r=>hit(p,r));if(b>=0)sortIt(b);else A.redraw()}}
function fresh(){gen++;for(const k in Z)delete Z[k];Object.assign(Z,{g:{k:0,slot:[null,null],used:[],bad:null,made:null},c:{k:0,bad:0,done:[]},o:{k:0,slot:[null,null],bad:null},s:{k:0,bad:0},r:{got:[],bad:null},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();Z.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);Z.hook=watch(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function controls(){if(!pad)return;pad.innerHTML='';const k=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
if(k==='glue'&&Z.g.k<3)BITS.forEach((w,i)=>{if(!Z.g.used.includes(w))B(`${PIC[w]} ${w}`,()=>glue(i),`Add the word ${w}`)});
if(k==='cut'&&Z.c.k<4){const w=CUTS[Z.c.k][0];for(let i=1;i<w.length;i++)B(`${w.slice(0,i)} | ${w.slice(i)}`,()=>cut(i),`Cut ${w} into ${w.slice(0,i)} and ${w.slice(i)}`)}
if(k==='order'&&Z.o.k<3)ordBits().forEach(r=>{if(!Z.o.slot.includes(r.v))B(r.v,()=>order(r.v),`Put ${r.v} ${Z.o.slot[0]?'last':'first'}`)});
if(k==='sort'&&Z.s.k<6){const w=SORTW[Z.s.k][0];B('Compound word',()=>sortIt(0),`${w} is a compound word`);B('Not a compound',()=>sortIt(1),`${w} is not a compound word`)}
if(k==='rain'&&Z.r.got.length<4)ENDS.forEach((e,i)=>{if(!Z.r.got.includes(e))B(`rain + ${e}`,()=>rain(i),`Does rain plus ${e} make a real word?`)})}
const steps=[
{h:'Glue two words',p:'Two small words can join to make one new word. Drag a word into a box, or tap it. Build the word for the picture.',
predict:{q:'Ear + ring. How do you spell the new word?',opts:['earing','earring'],ans:1},task:'Make all 3 compound words',
show:()=>play(0,[0,3,1,4,2,5].map(i=>()=>glue(i)),600),
go:()=>open(0,'Two empty boxes, a plus and a sun picture. Six word cards: sun, foot, ear, shine, ball, ring.',()=>Z.g.k>=3,'Sunshine, football, earring. Each part is spelt just as it is on its own, so earring keeps both r\'s.')},
{h:'Cut it in two',p:'A compound word has two whole words inside. Tap the place where they join.',task:'Cut all 4 words at the join',
show:()=>play(1,CUTS.map(c=>()=>cut(c[1])),650),
go:()=>open(1,'The word cupcake in big letters. Tap between two letters to cut it.',()=>Z.c.k>=4,'Cup + cake, snow + man, tooth + brush, bed + room. Each cut leaves two real words.')},
{h:'Which word goes first?',p:'Read the clue. Tap the word that goes first, then the word that goes last.',
predict:{q:'Do houseboat and boathouse mean the same thing?',opts:['Yes, they use the same two words','No, the last word says what it is'],ans:1},task:'Match all 3 clues',
show:()=>play(2,ORD.flatMap(t=>[()=>order(t[1]),()=>order(t[2])]),550),
go:()=>open(2,'Clue: a boat you can live in. Two cards: boat and house.',()=>Z.o.k>=3,'A houseboat is a boat. A boathouse is a house for boats. The last word names the thing.')},
{h:'Real or a trick?',p:'Some long words have little words hiding in them, but they are not compounds. Drag each card to a box.',
predict:{q:'Carpet has car and pet in it. Is it a compound word?',opts:['Yes, it has two words in it','No, a carpet is not a car or a pet'],ans:1},task:'Sort all 6 cards',
show:()=>play(3,SORTW.map(w=>()=>sortIt(w[1])),600),
go:()=>open(3,'A card that says playground. Two boxes: Compound word, and Not a compound.',()=>Z.s.k>=6,'Playground, farmyard and blackberry get their meaning from their two words. Carpet, button and season only hide little words.')},
{h:'Rain plus what?',p:'Rain can start lots of compound words. Tap the endings that make a real word.',task:'Find all 4 real words',
show:()=>play(4,[0,1,3,5].map(i=>()=>rain(i)),600),
go:()=>open(4,'Rain in the middle. Six endings around it: bow, coat, pen, drop, sit, fall.',()=>Z.r.got.length>=4,'Rainbow, raincoat, raindrop and rainfall are real words. Rainpen and rainsit are not.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.hook()});
const QS=[
{q:'Which one is a compound word?',a:'sunflower',o:[['carpet','hide'],['sunny','part']]},
{q:'Ear + ring. Which spelling is right?',a:'earring',o:[['earing','drop'],['ear ring','gap']]},
{q:'Where do you cut toothbrush?',a:'tooth | brush',o:[['too | thbrush','cut'],['toot | hbrush','cut']]},
{q:'What is a goldfish?',a:'A fish that is gold',o:[['Gold that looks like a fish','order'],['Some gold and a fish','both']]},
{q:'Snow + which word makes a real compound?',a:'ball',o:[['sit','fake'],['pen','fake']]},
{q:'Is button a compound word?',a:'No, a button is not a but or a ton',o:[['Yes, it has but and ton in it','hide'],['Yes, it is a long word','long']]}];
function why(t){let m='A compound word is two real words joined into one, and their meanings help the new meaning.';
if(t==='hide')m='Little words can hide in a long word without making a compound. The parts must help the meaning: a carpet is not a car or a pet.';
if(t==='part')m='Sunny is sun + ny, and ny is not a word. Both parts of a compound must be whole words.';
if(t==='drop')m='Keep every letter of both words. Ear ends in r and ring starts with r, so earring has two r\'s.';
if(t==='gap')m='This compound is written as one word, with no gap: earring.';
if(t==='cut')m='Cut where both parts are real words: tooth and brush.';
if(t==='order')m='The last word says what the thing is. A goldfish is a kind of fish, so fish comes last.';
if(t==='both')m='A goldfish is one thing, not two. The two words join to name one new thing.';
if(t==='fake')m='Snowsit and snowpen are not real words. A compound has to be a real word: snowball is.';
if(t==='long')m='Being long does not make a compound. Look for two whole words that build the meaning.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
init:B=>{A=B;const box=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Compound word buttons'},box);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
