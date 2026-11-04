/* Flagship: shapes of land and water (ages 7-8). */
(()=>{
const S0=[0,0,2,2,2,2,2,2,2,2,2,2],RAIN=[0,0,0,1,1,2,4,2,1,3,5,6],GOAL=[0,0,1,1,1,2,5,3,1,3,6,4];
const MAP=['OOphhhmmMMmm','OOpLLhhmmMMm','OOpLLhhmmmMm','OOppphhhvvvv','OORRRRRRRRRR','OOppppphvvvv','OOppPpphmmMm','OOppppphhmmm'];
const NAMES={O:'ocean',L:'lake',P:'pond',R:'river',v:'valley',p:'plain',h:'hill',m:'mountain',M:'mountain'};
const BADGE=[['A','ocean',3.5,.5],['B','lake',1.5,3.5],['C','river',4,4],['D','mountain',1,9.5],['E','plain',7,3],['F','valley',5,9.5],['G','pond',6,4],['H','hill',3,6.5]];
const N4=[[1,0],[-1,0],[0,1],[0,-1]],FIND=['lake','river','valley','plain'];
const WHAT={ocean:'The ocean is huge, salty water.',lake:'A lake is water with land all round it. Most lakes are fresh, not salty.',pond:'A pond is a small lake.',river:'A river is water flowing downhill in a line to a lake or the sea.',valley:'A valley is low land between hills or mountains.',plain:'A plain is wide, flat, low land.',hill:'A hill is high land, lower than a mountain.',mountain:'A mountain is very high land with a steep top.'};
VIS.reg('flagland',c=>{let A,bar,box,qi=-1,run=0;const F={};
const sg=()=>['shape','rain','name','river','slice','chal'][A.step];
const dk=()=>A.col.dark,sfx=k=>A.sound[k](),draw=()=>A.redraw(),sync=()=>{draw();buttons()};
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const wc=()=>dk()?'#38bdf8':'#0369a1';
function label(t,x,y,px,ink,wt){const g=A.ctx;g.font=`${wt||800} ${Math.round(px*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;g.fillText(t,x,y,A.W-20)}
const pill=(t,x,y)=>A.paint.label(t,x,y,{bg:dk()?'rgba(15,23,42,.9)':'rgba(17,24,39,.85)',font:'700 13px system-ui,sans-serif'});
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',dk()?.05:.45);g.fillRect(0,0,W,H);const v=sg();
 (v==='shape'||v==='rain'?dSide:v==='chal'?dChal:dMap)(g,W,H,C);A.fx.draw(g)}
const side=()=>{const cw=A.W*.92/12,base=A.H*.9,u=A.H*.095;return{x0:A.W*.04,cw,base,u,cx:i=>A.W*.04+(i+.5)*cw,gy:h=>base-h*u}};
function ground(g,Hs,S,C,top,bot){const pts=Hs.map((h,i)=>[S.cx(i),S.gy(h)]);g.beginPath();g.moveTo(0,bot);g.lineTo(0,pts[0][1]);g.lineTo(pts[0][0],pts[0][1]);
 for(let i=1;i<pts.length;i++){const m=[(pts[i-1][0]+pts[i][0])/2,(pts[i-1][1]+pts[i][1])/2];g.quadraticCurveTo(pts[i-1][0],pts[i-1][1],m[0],m[1])}
 const L=pts[pts.length-1];g.lineTo(L[0],L[1]);g.lineTo(A.W,L[1]);g.lineTo(A.W,bot);g.closePath();g.fillStyle=dk()?'#78563a':'#a87a4f';g.fill();g.lineWidth=5;g.strokeStyle=dk()?'#4ade80':'#15803d';g.stroke()}
function pools(Hs){const out=[];let i=0;while(i<Hs.length&&Hs[i]===0)i++;if(i)out.push({a:0,b:i-1,lv:.8,sea:1});(F.lakes||[]).forEach(L=>out.push(L));return out}
function dSide(g,W,H,C){const S=side(),Hs=F.h;
 pools(Hs).forEach(P=>{g.fillStyle=A.alpha(wc(),.85);const x1=P.sea?0:S.cx(P.a)-S.cw*.75,x2=S.cx(P.b)+S.cw*.75;g.fillRect(x1,S.gy(P.lv),x2-x1,S.base-S.gy(P.lv)+2)});
 ground(g,Hs,S,C,0,H);
 if(sg()==='shape'){const i=F.sel,x=S.cx(i);g.strokeStyle=C.tx;g.setLineDash([5,5]);g.lineWidth=2;g.beginPath();g.moveTo(x,S.gy(6.4));g.lineTo(x,S.base);g.stroke();g.setLineDash([]);}
 const f=feats(Hs);Object.keys(f).forEach(k=>{if(!F.lakes.some(L=>L.a===f[k]))pill(k,S.cx(f[k]),Math.max(40,S.gy(Hs[f[k]])-20))});
 pill('ocean',S.cx(0)+4,S.gy(.4)+4);
 (F.lakes||[]).forEach(L=>pill('lake',S.cx((L.a+L.b)/2),S.gy(L.lv)+16));
 if(F.drop){const d=F.drop,p=dropAt(d,S);A.paint.ball(p.x,p.y,7,wc())}
 label(sg()==='shape'?'Drag the land up or down':'Tap the sky to make it rain',W/2,H*.06,14,C.tx)}
function feats(Hs){const f={},n=Hs.length;
 for(let i=2;i<n;i++){const L=Hs[i-1],R=i+1<n?Hs[i+1]:-1,h=Hs[i];
  if(h>=5&&h>=L&&h>=R&&f.mountain==null)f.mountain=i;else if(h>=2&&h<=4&&h>L&&h>R&&f.hill==null)f.hill=i;
  if(i<n-1&&h<=L&&h<=R&&Math.max(...Hs.slice(2,i))>=h+2&&Math.max(...Hs.slice(i+1))>=h+2&&f.valley==null)f.valley=i}
 for(let i=2;i<n-2;i++)if(Hs[i]===1&&Hs[i+1]===1&&Hs[i+2]===1){f.plain=i+1;break}return f}
function setCol(i,h){if(i<2){say('That part is the sea. Shape the land to the right.');return}h=Math.max(0,Math.min(6,h));F.sel=i;if(F.h[i]===h){draw();return}F.h[i]=h;sfx('tick');
 const f=feats(F.h),got=Object.keys(f).filter(k=>k!=='hill'&&!F.made.includes(k));got.forEach(k=>F.made.push(k));
 if(got.length)say(`You made a ${got[0]}! `+WHAT[got[0]]+(F.made.length<3?` Still to make: ${['mountain','valley','plain'].filter(k=>!F.made.includes(k)).join(', ')}.`:''));
 else say(`Land ${i-1}: height ${h}.`);sync();F.want()}
function flow(Hs,i){const path=[i];for(let s=0;s<40;s++){const h=Hs[i],l=i>0?Hs[i-1]:99,r=i<Hs.length-1?Hs[i+1]:99;let to=-1;
  if(l<h||r<h)to=l<=r?i-1:i+1;else{for(let d of[-1,1]){let j=i;while(Hs[j+d]===h)j+=d;if(Hs[j+d]!=null&&Hs[j+d]<h&&to<0){for(let k=i+d;k!==j+d;k+=d)path.push(k);to=j+d}}}
  if(to<0)break;path.push(to);i=to;if(Hs[i]===0)break}return path}
function dropAt(d,S){const P=d.path,t=d.t;if(t<1)return{x:S.cx(P[0]),y:A.H*.12+(S.gy(F.h[P[0]])-10-A.H*.12)*t};const k=Math.min(P.length-1,Math.floor(t)),a=P[k-1]??P[0],b=P[k],f=t-Math.floor(t);
 return{x:S.cx(a)+(S.cx(b)-S.cx(a))*f,y:S.gy(F.h[a]+(F.h[b]-F.h[a])*f)-8}}
function rain(i){if(sg()!=='rain'||F.drop)return;i=Math.max(0,Math.min(11,i));const path=flow(F.h,i),end=path[path.length-1],sea=F.h[end]===0&&end<3;F.drop={path,t:0};sfx('tick');
 A.tween(F.drop,{t:path.length},A.reduced()?1:150*path.length,'io',()=>{F.drop=0;F.n++;let m;
  if(sea){F.sea=1;m='The rain ran downhill into the ocean.'}
  else{F.lake=1;if(!F.lakes.some(L=>L.a<=end&&L.b>=end)){F.lakes.push({a:end,b:end,lv:Math.min(F.h[end-1],F.h[end+1])})}m='The rain ran into a dip with land on both sides. It is stuck, so it makes a lake.'}
  if(F.n>=3&&!(F.sea&&F.lake))m+=F.sea?' Try the high land.':' Try near the ocean.';say(m);sync();F.want()})}
const MH=(()=>{const T=MAP.map(r=>r.split('')),hs=T.map(r=>r.map(()=>0)),dist=T.map(r=>r.map(t=>'OLPR'.includes(t)?0:99)),q=[];
 dist.forEach((r,y)=>r.forEach((d,x)=>{if(!d)q.push([y,x])}));while(q.length){const[y,x]=q.shift();N4.forEach(([a,b])=>{const Y=y+a,X=x+b;if(dist[Y]&&dist[Y][X]>dist[y][x]+1){dist[Y][X]=dist[y][x]+1;q.push([Y,X])}})}
 T.forEach((r,y)=>r.forEach((t,x)=>{hs[y][x]=t==='R'?.3+.25*(x-2):t==='v'?.7+.25*(x-2):'OLP'.includes(t)?0:({p:1,h:2.5,m:4.5,M:6})[t]+dist[y][x]*(t==='p'?.1:.3)}));return hs})();
const tile=y=>MAP[y],geo=()=>{const sl=sg()==='slice',cs=Math.min(A.W*.94/12,A.H*(sl?.5:.8)/8);return{cs,x0:(A.W-cs*12)/2,y0:A.H*(sl?.1:.12)}};
const COL={O:['#1d4ed8','#1e40af'],L:['#38bdf8','#0284c7'],P:['#38bdf8','#0284c7'],R:['#38bdf8','#0284c7'],v:['#d9f99d','#4d7c0f'],p:['#bbf7d0','#166534'],h:['#65a30d','#3f6212'],m:['#a16207','#713f12'],M:['#f8fafc','#94a3b8']};
function dMap(g,W,H,C){const G=geo(),cs=G.cs,v=sg();
 for(let y=0;y<8;y++)for(let x=0;x<12;x++){const t=tile(y)[x];g.fillStyle=COL[t][dk()?1:0];g.fillRect(G.x0+x*cs,G.y0+y*cs,cs+.5,cs+.5)}
 g.strokeStyle=A.alpha(C.tx,.25);g.lineWidth=1;g.strokeRect(G.x0,G.y0,cs*12,cs*8);
 (F.rivers||[]).forEach(P=>{g.strokeStyle=wc();g.lineWidth=5;g.lineCap='round';g.beginPath();P.forEach(([y,x],k)=>{const X=G.x0+(x+.5)*cs,Y=G.y0+(y+.5)*cs;k?g.lineTo(X,Y):g.moveTo(X,Y)});g.stroke();
  const[y,x]=P[0];A.paint.ball(G.x0+(x+.5)*cs,G.y0+(y+.5)*cs,6,dk()?'#f472b6':'#be185d')});
 if(v==='name')BADGE.forEach(([k,,y,x])=>{const X=G.x0+(x+.5)*cs,Y=G.y0+(y+.5)*cs,done=F.found.includes(k);g.fillStyle=done?C.gr:'#111827';g.beginPath();g.arc(X,Y,Math.max(12,cs*.42),0,7);g.fill();g.lineWidth=2;g.strokeStyle='#fff';g.stroke();label(k,X,Y+1,13,'#fff',900)});
 if(v==='slice'){const Y=G.y0+(F.row+.5)*cs;g.strokeStyle=dk()?'#f472b6':'#be185d';g.lineWidth=3;g.setLineDash([8,5]);g.beginPath();g.moveTo(G.x0-6,Y);g.lineTo(G.x0+cs*12+6,Y);g.stroke();g.setLineDash([]);profile(g,W,H,C,G)}
 if(v!=='slice'){const y=G.y0+cs*8+22;[['water','L'],['plain','p'],['valley','v'],['hill','h'],['mountain','m'],['snow','M']].forEach(([n,t],i)=>{const X=W*.06+(i%3)*W*.31,Y=y+Math.floor(i/3)*28;g.fillStyle=COL[t][dk()?1:0];g.fillRect(X,Y-9,18,18);g.strokeStyle=C.mu;g.strokeRect(X,Y-9,18,18);label(n,X+58,Y+1,13,C.tx,600)})}
 label(v==='name'?(F.k<FIND.length?`Tap the ${FIND[F.k]}`:'You named them all!'):v==='river'?'Tap high land to start a river':'Drag the line to slice the map',W/2,H*.05,14,C.tx)}
function profile(g,W,H,C,G){const row=MH[F.row],top=G.y0+G.cs*8+14,base=H*.97,u=(base-top-18)/6.5,cx=x=>G.x0+(x+.5)*G.cs;
 g.fillStyle=A.alpha(C.tx,.06);g.fillRect(G.x0,top,G.cs*12,base-top);
 const T=tile(F.row);T.split('').forEach((t,x)=>{if('OLP'.includes(t)){g.fillStyle=wc();g.fillRect(G.x0+x*G.cs,base-.7*u,G.cs+.5,.7*u)}});
 g.beginPath();g.moveTo(G.x0,base);row.forEach((h,x)=>g.lineTo(cx(x),base-h*u));g.lineTo(G.x0+G.cs*12,base-row[11]*u);g.lineTo(G.x0+G.cs*12,base);g.closePath();g.fillStyle=dk()?'#78563a':'#a87a4f';g.fill();g.strokeStyle=dk()?'#4ade80':'#15803d';g.lineWidth=3;g.stroke();g.strokeStyle=wc();g.lineWidth=6;g.beginPath();row.forEach((h,x)=>{if(T[x]==='R')g.lineTo(cx(x),base-h*u-3);else g.moveTo(cx(x),base-h*u-3)});g.stroke();
 const seen=new Set();tile(F.row).split('').forEach((t,x)=>{const n=nameAt(F.row,x);if(!seen.has(n)){seen.add(n);pill(n,cx(x),Math.max(top+10,base-row[x]*u-16))}})}
function cellAt(p){const G=geo(),x=Math.floor((p.x-G.x0)/G.cs),y=Math.floor((p.y-G.y0)/G.cs);return x>=0&&x<12&&y>=0&&y<8?[y,x]:null}
function nameAt(y,x){const t=tile(y)[x];return NAMES[t]}
function pick(name,key){if(sg()!=='name'||F.k>=FIND.length)return;const want=FIND[F.k];
 if(name===want){if(key)F.found.push(key);else{const b=BADGE.find(b=>b[1]===name);if(b)F.found.push(b[0])}F.k++;sfx('pop');say(`Yes, that is the ${name}. `+WHAT[name]+(F.k<FIND.length?` Now find the ${FIND[F.k]}.`:''))}
 else{sfx('miss');say(`That is the ${name}, not the ${want}. `+WHAT[name])}sync();F.want()}
function riverFrom(y,x){const P=[[y,x]];for(let s=0;s<60;s++){let best=null,h=MH[y][x];N4.forEach(([a,b])=>{const Y=y+a,X=x+b;if(MH[Y]&&MH[Y][X]!=null&&MH[Y][X]<h){h=MH[Y][X];best=[Y,X]}});if(!best)break;[y,x]=best;P.push(best);if('OLP'.includes(tile(y)[x]))break}return P}
function startRiver(y,x){if(sg()!=='river')return;const t=tile(y)[x];if('OLPR'.includes(t)){say('That is water. Tap high land.');return}
 const P=riverFrom(y,x),[ey,ex]=P[P.length-1],end=NAMES[tile(ey)[ex]];F.rivers.push(P);F.ends[end]=1;sfx('pop');
 const joined=P.some(([a,b])=>tile(a)[b]==='R');let m=`It started on a ${NAMES[t]} and ran downhill${joined?', joined the big river in the valley,':''} and ended in the ${end}.`;
 if(F.rivers.length>=3&&!(F.ends.lake&&F.ends.ocean))m+=F.ends.lake?' Now reach the ocean.':' Try the hill by the lake.';say(m);sync();F.want()}
function slice(r){if(sg()!=='slice')return;r=Math.max(0,Math.min(7,r));if(r===F.row)return;F.row=r;sfx('tick');const t=tile(r);if(t.includes('L'))F.saw.lake=1;if(t.includes('v'))F.saw.valley=1;
 say(t.includes('v')?'This slice crosses the valley: low land between mountains.':t.includes('R')?'This slice runs along the river. It flows downhill to the ocean.':t.includes('L')?'This slice cuts the lake. The water sits in a dip, with land on both sides.':t.includes('M')?'This slice crosses the snowy peaks.':'This slice crosses the plain: flat, low land.');sync();F.want()}
function dChal(g,W,H,C){const S=side();g.fillStyle=A.alpha(wc(),.85);g.fillRect(0,S.gy(.8),S.cx(1)+S.cw*.6,S.base-S.gy(.8));ground(g,GOAL,S,C,0,H);const f=feats(GOAL);Object.keys(f).forEach(k=>pill(k,S.cx(f[k]),S.gy(GOAL[f[k]])-20));label('Land is high or low. Water runs downhill.',W/2,H*.06,14,C.tx)}
const pk=()=>{say(`Land ${F.sel-1}: height ${F.h[F.sel]}.`);sync()};
function buttons(){if(!bar)return;bar.innerHTML='';const v=sg(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t).onclick=f};
 if(v==='shape'){b('◀',()=>{F.sel=Math.max(2,F.sel-1);pk()},'Pick the land to the left');b('▲ Raise',()=>setCol(F.sel,F.h[F.sel]+1),'Raise this land');b('▼ Lower',()=>setCol(F.sel,F.h[F.sel]-1),'Lower this land');b('▶',()=>{F.sel=Math.min(11,F.sel+1);pk()},'Pick the land to the right')}
 if(v==='rain'){b('Rain on the mountain',()=>rain(11));b('Rain on the hill',()=>rain(6));b('Rain by the shore',()=>rain(4))}
 if(v==='name'&&F.k<FIND.length)BADGE.forEach(([k,n])=>b(k,()=>pick(n,k),`Place ${k}`));
 if(v==='river'){b('From the snowy peak',()=>startRiver(1,10));b('From the hill by the lake',()=>startRiver(0,5));b('From the south mountain',()=>startRiver(6,10))}
 if(v==='slice'){b('▲ Slice up',()=>slice(F.row-1),'Move the slice up');b('▼ Slice down',()=>slice(F.row+1),'Move the slice down')}}
function down(p){const v=sg();
 if(v==='shape'){const S=side(),i=Math.floor((p.x-S.x0)/S.cw);if(i<0||i>11)return false;F.drag=1;setCol(i,Math.round((S.base-p.y)/S.u));return true}
 if(v==='rain'){const S=side();rain(Math.floor((p.x-S.x0)/S.cw));return false}
 const cell=cellAt(p);if(v==='name'){const G=geo(),hit=BADGE.find(([k,,y,x])=>Math.hypot(p.x-(G.x0+(x+.5)*G.cs),p.y-(G.y0+(y+.5)*G.cs))<Math.max(16,G.cs*.5));if(hit)pick(hit[1],hit[0]);else if(cell)pick(nameAt(...cell));return false}
 if(v==='river'&&cell){startRiver(...cell);return false}
 if(v==='slice'){F.drag=1;const G=geo();slice(Math.floor((p.y-G.y0)/G.cs));return true}return false}
function move(p){if(!F.drag)return;const v=sg();if(v==='shape'){const S=side(),i=Math.floor((p.x-S.x0)/S.cw);if(i>=0&&i<12)setCol(i,Math.round((S.base-p.y)/S.u))}if(v==='slice'){const G=geo();slice(Math.floor((p.y-G.y0)/G.cs))}}
function up(){F.drag=0}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,acts){steps[n].go();const k=++F.k2;acts.forEach((f,j)=>setTimeout(()=>{if(k===F.k2)f()},A.reduced()?40*(j+1):(j+1)*(sg()==='rain'?1200:420)))}
function reset(v){const k2=(F.k2||0)+1;for(const x in F)delete F[x];Object.assign(F,{k2,want:()=>{},h:(v==='rain'?RAIN:S0).slice(),sel:6,made:[],lakes:[],drop:0,n:0,sea:0,lake:0,k:0,found:[],rivers:[],ends:{},row:0,saw:{},drag:0})}
const steps=[
{h:'High land and low land',p:'Land has shapes. A mountain is very high land. A valley is low land between higher land. A plain is wide, flat, low land.',
 predict:{q:'What is a valley?',opts:['A tall, pointed hill','Low land between hills or mountains','A big lake'],ans:1},task:'Make a mountain, a valley and a plain',
 show:()=>play(0,GOAL.map((h,i)=>()=>setCol(Math.max(2,i),GOAL[Math.max(2,i)])).slice(2)),
 go:()=>{reset('shape');say('Drag the land up or down, or use the arrows and Raise or Lower.');buttons();F.want=fin(0,()=>['mountain','valley','plain'].every(k=>F.made.includes(k)),'Mountains are high, valleys lie low between them, plains are flat.')}},
{h:'Where does rain go?',p:'Rain lands on hills and mountains. Water always runs downhill, to lower land. It ends in the ocean, or it fills a dip and makes a lake.',
 predict:{q:'Rain falls on the top of a mountain. Where does the water go?',opts:['It stays on the top','It runs downhill','It runs up the next mountain'],ans:1},task:'Make rain 3 times: get water into the ocean and into a lake',
 show:()=>play(1,[()=>rain(11),()=>rain(6),()=>rain(4)]),
 go:()=>{reset('rain');say('Tap the sky to make rain, or use the buttons.');buttons();F.want=fin(1,()=>F.n>=3&&F.sea&&F.lake,'Water runs downhill, to the ocean or into a dip as a lake.')}},
{h:'Name the land and water',p:'A map shows land and water from above. Blue is water. Green is low land, darker green is hills, brown is mountains and white is snow on the peaks.',
 task:'Find the lake, the river, the valley and the plain',
 show:()=>play(2,['B','C','F','E'].map(k=>()=>{const b=BADGE.find(b=>b[0]===k);pick(b[1],k)})),
 go:()=>{reset('name');say('Tap a letter or the map. Find the lake.');buttons();F.want=fin(2,()=>F.k>=FIND.length,'You found the lake, river, valley and plain.')}},
{h:'Rivers run downhill',p:'A river starts high up, from rain or melting snow. It always flows downhill. Small rivers join bigger ones, and the water ends in a lake or the sea.',
 predict:{q:'A river starts high in the mountains. Where does it end?',opts:['On top of another mountain','In a lake or the sea','It stops in the middle of dry land'],ans:1},task:'Start 3 rivers: one must end in the lake and one in the ocean',
 show:()=>play(3,[()=>startRiver(1,10),()=>startRiver(0,5),()=>startRiver(6,10)]),
 go:()=>{reset('river');say('Tap high land to start a river.');buttons();F.want=fin(3,()=>F.rivers.length>=3&&F.ends.lake&&F.ends.ocean,'Every river ran from high land down to a lake or the ocean.')}},
{h:'Slice the map',p:'Cut a map along a line and look from the side. Now you can see how high each place is. Water sits in the lowest places.',
 predict:{q:'Is the water in most lakes salty, like the sea?',opts:['Yes, all water is salty','No, most lakes are fresh water','Lakes have no water'],ans:1},task:'Slice through the lake, then the valley',
 show:()=>play(4,[()=>slice(1),()=>slice(2),()=>slice(3),()=>slice(4)]),
 go:()=>{reset('slice');say('Drag the pink line, or use the buttons.');buttons();F.want=fin(4,()=>F.saw.lake&&F.saw.valley,'Water sits in the lowest places: the lake in a dip, the river in the valley.')}},
{h:'Challenge',p:'',go:()=>{reset('shape');ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>F.want()});
const QS=[['Which one is low land between hills or mountains?',[['a valley','ok'],['a mountain','high'],['a lake','sea']]],
 ['Rain falls on a hill. Which way does the water go?',[['downhill','ok'],['uphill','up'],['it stays on top','stay']]],
 ['Which one is water with land all round it?',[['a lake','ok'],['the ocean','sea'],['a river','flow']]],
 ['Which one is wide, flat, low land?',[['a plain','ok'],['a hill','high'],['a valley','vall']]],
 ['Which water is salty?',[['the ocean','ok'],['a lake','fresh'],['a river','fresh']]],
 ['Where does a river start?',[['on high land','ok'],['in the sea','sea2'],['on flat land by the sea','up']]],
 ['On a map, what does blue show?',[['water','ok'],['snow','snow'],['mountains','high']]]];
function why(t){let m='Think about high and low land.';
 if(t==='high')m='That is high land. Mountains and hills stick up. Valleys and plains are low.';
 if(t==='up'||t==='stay')m='Water never flows uphill or stays on a slope. It runs down to lower land.';
 if(t==='sea')m='The ocean is huge and not closed in. A lake has land all round it.';
 if(t==='flow')m='A river flows in a line. A lake has land all round it.';
 if(t==='vall')m='A valley is low, but it sits between hills or mountains. A plain is flat and wide.';
 if(t==='fresh')m='Rivers and most lakes are fresh water. The ocean is salty.';
 if(t==='sea2')m='Rivers end in the sea. They start high up, from rain or melting snow.';
 if(t==='snow')m='Snow is white. Blue shows water: ocean, lakes and rivers.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=(qi*2+1)%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');[...ops.slice(rot),...ops.slice(0,rot)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});say('Challenge: '+q);draw()}
function judge(t){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;sfx('miss')}fb.innerHTML=(ok?`✓ Right! ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw:paint,onStep:A=>{box.hidden=A.step!==5;bar.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);reset('shape');A.gest({down,move,up});buttons()}});
A.start()})})();
