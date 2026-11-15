/* Flagship: area with fractional side lengths (ages 10–11; CCSS 5.NF.B.4b find the area of a rectangle with
   fractional side lengths by tiling it with unit squares of the appropriate unit fraction side lengths, and show
   that the area is the same as multiplying the side lengths; NC England Y6 multiply simple pairs of proper
   fractions). Cut a unit square into thirds and quarters, drag a corner to build 3/4 × 2/3, count tiles for three
   products, stretch past 1 with 1 1/2 × 2/3, and pick the rectangle that shows a product. Every drag has a button. */
(()=>{
const BUILD=[[1,2,1,3],[2,5,3,4],[2,3,4,5]];
const MATCH=[[3,5,1,2,[[5,2,3,1,'ok'],[5,2,3,2,'whole'],[5,2,2,1,'num']]],[3,4,2,3,[[4,3,3,2,'ok'],[4,3,3,3,'whole'],[4,3,1,2,'num']]],[1,4,1,2,[[4,2,1,1,'ok'],[4,2,1,2,'whole'],[4,2,2,1,'num']]]];
const pl=(n,w)=>`${n} ${w}${n===1?'':'s'}`,gcd=(a,b)=>b?gcd(b,a%b):a,fr=(n,d)=>`${n}/${d}`,simp=(n,d)=>{const g=gcd(n,d);return d/g===1?`${n/g}`:`${n/g}/${d/g}`};
VIS.reg('flagfracarea',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',RIM='#94a3b8',CARD='#ffffff',OK='#047857',NO='#b91c1c',GOLD='#b45309',BLUE='#1d4ed8',SKY='#bfdbfe',TEAL='#0f766e',PALE='#e0f2fe',HOT='#dcfce7';
const MODE=['cut','build','count','long','match','chal'],mode=()=>MODE[A.step];
const q=n=>Math.round(n*(A.narrow?1:1.12)),fo=(n,w)=>`${w||700} ${q(n)}px system-ui,sans-serif`;
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function say(s,x,y,n,col,al,w){Z.font=fo(n,w);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-16)}
function lines(s,max,n){Z.font=fo(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function card(r,fill,edge,lw){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function cardText(r,s,n,col){const L=lines(s,r.w-14,n),lh=q(n)+4;L.forEach((l,i)=>say(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col||INK,'center',700))}
function head(s,done){const r={x:10,y:8,w:A.W-20,h:A.H*.11};card(r,done?HOT:PALE,done?OK:BLUE,2);cardText(r,s,13,done?OK:INK)}
function msg(){if(!S.msg)return;const L=lines((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=q(13)+5,h=L.length*lh+10,y=A.H-h-6;card({x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>say(l,A.W/2,y+5+lh*(i+.5),13))}
const live=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const oops=s=>{S.bad=true;S.msg=s;A.sound.miss();live(s);A.redraw()};
const yes=s=>{S.bad=false;S.msg=s;A.sound.pop()};
/* the grid: S.units unit squares side by side, S.cols columns and S.rows rows per unit */
function geo(){const units=S.units||1,availW=A.W*(A.narrow?.8:.52),availH=A.H*(A.narrow?.34:.56),U=Math.min(availW/units,availH),x=A.narrow?(A.W-U*units)/2:A.W*.06,y=A.H*.2;return{U,x,y,units,cw:U/S.cols,rh:U/S.rows,ncol:S.cols*units}}
function grid(shade){const g=geo();for(let u=0;u<g.units;u++){Z.fillStyle=CARD;Z.fillRect(g.x+u*g.U,g.y,g.U,g.U)}
 if(shade){Z.fillStyle=SKY;Z.fillRect(g.x,g.y,S.w*g.cw,S.h*g.rh);Z.strokeStyle=BLUE;Z.lineWidth=3;Z.strokeRect(g.x,g.y,S.w*g.cw,S.h*g.rh)}
 Z.strokeStyle=RIM;Z.lineWidth=1.2;for(let i=1;i<g.ncol;i++){Z.beginPath();Z.moveTo(g.x+i*g.cw,g.y);Z.lineTo(g.x+i*g.cw,g.y+g.U);Z.stroke()}for(let j=1;j<S.rows;j++){Z.beginPath();Z.moveTo(g.x,g.y+j*g.rh);Z.lineTo(g.x+g.units*g.U,g.y+j*g.rh);Z.stroke()}
 Z.strokeStyle=INK;Z.lineWidth=2.5;for(let u=0;u<g.units;u++)Z.strokeRect(g.x+u*g.U,g.y,g.U,g.U);
 say('1',g.x+g.U/2,g.y+g.U+q(12),11,SOFT);say('1',g.x-q(10),g.y+g.U/2,11,SOFT);if(g.units>1)say('1',g.x+g.U*1.5,g.y+g.U+q(12),11,SOFT);
 if(shade){const hx=g.x+S.w*g.cw,hy=g.y+S.h*g.rh;Z.fillStyle=GOLD;Z.beginPath();Z.arc(hx,hy,q(10),0,7);Z.fill();Z.strokeStyle='#ffffff';Z.lineWidth=2;Z.stroke()}}
const handle=()=>{const g=geo();return{x:g.x+S.w*g.cw-q(22),y:g.y+S.h*g.rh-q(22),w:q(44),h:q(44)}};
function sideW(){const n=S.w,d=S.cols;if(S.units>1&&n>=d){const wh=Math.floor(n/d),r=n%d;return r?`${wh} ${r}/${d}`:`${wh}`}return fr(n,d)}
function info(lines2){if(A.narrow&&lines2.length>2)lines2=[lines2[0],lines2.slice(1).join(' · ')];const x=A.narrow?A.W*.08:A.W*.62,w=A.narrow?A.W*.84:A.W*.34,g=geo(),y=A.narrow?g.y+g.U+q(26):A.H*.22;const r={x,y,w,h:q(22)*lines2.length+12};card(r,'#f8fafc',RIM,2);lines2.forEach((t,i)=>say(t,x+w/2,y+6+q(22)*(i+.5),12,INK,'center',700));return r}
/* step 1: cut */
const chipR=k=>{const g=geo();if(A.narrow){const w=(A.W*.84-8)/2;return{x:A.W*.08+k*(w+8),y:g.y+g.U+q(24),w,h:q(38)}}return{x:A.W*.62,y:A.H*.48+k*q(46),w:A.W*.34,h:q(38)}};
function drawCut(){const ok=S.cols*S.rows===12&&[S.cols,S.rows].sort().join()==='3,4';head(ok?'Twelve equal tiles: each is 1/3 × 1/4 = 1/12 of the square.':'Cut the square into thirds one way and quarters the other.',ok);grid(false);
 if(!A.narrow)info([`${pl(S.cols,'column')} × ${pl(S.rows,'row')}`,`${pl(S.cols*S.rows,'tile')}, each 1/${S.cols*S.rows}`]);
 [[(A.narrow?'+ col (':'+ column (now ')+S.cols+')',0],[(A.narrow?'+ row (':'+ row (now ')+S.rows+')',1]].forEach(([t,k])=>{const r=chipR(k);card(r,CARD,BLUE,2.5);cardText(r,t,12,BLUE)})}
function addCut(k){if(k===0)S.cols=S.cols>=5?1:S.cols+1;else S.rows=S.rows>=5?1:S.rows+1;A.sound.tick();const n=S.cols*S.rows;
 if(n===12&&[S.cols,S.rows].sort().join()==='3,4'){yes(`3 strips one way and 4 the other make 12 tiles. Each tile is 1/12, not 1/7: you multiply 3 × 4, you do not add.`);return refresh()}
 if(n===12){S.msg='';return oops(`${S.cols} × ${S.rows} also makes twelfths, but we need thirds one way (3) and quarters the other (4).`)}
 S.bad=false;S.msg=`${S.cols} × ${S.rows} = ${pl(n,'tile')}, so each is 1/${n} of the square.`;refresh()}
/* steps 2-4: build */
function setTo(w,h){S.w=Math.max(1,Math.min(S.cols*(S.units||1),w));S.h=Math.max(1,Math.min(S.rows,h));A.sound.tick();check()}
function want(){const m=mode();if(m==='build')return[3,2];if(m==='count'){const t=BUILD[S.i];return t?[t[0]*(S.cols/t[1]),t[2]*(S.rows/t[3])]:null}if(m==='long')return[3,2];return null}
function check(){const t=want();if(!t)return refresh();if(S.w===t[0]&&S.h===t[1]){S.ready=true;const m=mode(),n=S.w*S.h,d=S.cols*S.rows;
  if(m==='build')yes(`3/4 wide and 2/3 tall: ${n} of the ${d} tiles, so 3/4 × 2/3 = ${fr(n,d)} = ${simp(n,d)}. Smaller than 3/4, because you took 2/3 of it.`);
  else if(m==='count')yes('That is the rectangle. Now pick its area.');else yes('1 1/2 wide and 2/3 tall. Each tile is 1/6 of one square. Pick the area.')}
 else{S.ready=false;S.bad=false;S.msg=`Width ${sideW()}, height ${fr(S.h,S.rows)}: ${pl(S.w*S.h,'tile')} shaded.`}refresh()}
function drawBuild(){const m=mode(),t=m==='count'?BUILD[S.i]:null,done=m==='build'?S.ready:m==='count'?!t:S.picked;
 const goal=m==='build'?'3/4 wide × 2/3 tall':m==='count'?(t?`${fr(t[0],t[1])} wide × ${fr(t[2],t[3])} tall`:''):'1 1/2 wide × 2/3 tall';
 head(done?(m==='count'?'Tiles shaded over tiles in one square: multiply the tops, multiply the bottoms.':m==='long'?'1 1/2 × 2/3 = 6/6 = 1 whole square.':'3/4 × 2/3 = 6/12 = 1/2.'):`Drag the gold corner to make ${goal}. Or use the buttons.`,done);
 if(m==='count'&&!t){grid(false);info(BUILD.map(b=>`${fr(b[0],b[1])} × ${fr(b[2],b[3])} = ${fr(b[0]*b[2],b[1]*b[3])}`));return}
 grid(true);const n=S.w*S.h,d=S.cols*S.rows;info([`Width ${sideW()}, height ${fr(S.h,S.rows)}`,`${n} tiles of 1/${d}`,S.ready&&m!=='build'&&!S.picked?'Area = ?':`Area = ${fr(n,d)}`]);
 if(S.ready&&m!=='build'&&!A.narrow&&!S.picked)opts().forEach(([s,tag],j)=>{const r=optR(j);card(r,CARD,S.miss===tag?NO:RIM,S.miss===tag?3.5:2);cardText(r,s,14)})}
const optR=j=>{const g=geo(),w=A.narrow?(A.W-30)/3:A.W*.34,h=q(36);return A.narrow?{x:10+j*(w+5),y:g.y+g.U+q(100),w,h}:{x:A.W*.62,y:A.H*.5+j*(h+6),w,h}};
function opts(){const m=mode();let o;if(m==='count'){const [a,b,c2,d]=BUILD[S.i];o=[[fr(a*c2,b*d),'ok'],[fr(a+c2,b+d),'add'],[fr(a*c2,b+d),'den']]}else o=[['1','ok'],['1 2/3','addwhole'],['3/6','onesq']];const r=S.i%3;return o.slice(r).concat(o.slice(0,r))}
function pick(tag){const m=mode();if(!S.ready)return;if(tag==='ok'){if(m==='count'){const [a,b,c2,d]=BUILD[S.i];S.i++;S.ready=false;S.miss=null;S.cols=4;S.rows=4;yes(`${fr(a,b)} × ${fr(c2,d)} = ${fr(a*c2,b*d)}: ${pl(a*c2,'tile')}, each 1/${b*d}.`);if(BUILD[S.i])setup();return refresh()}S.picked=true;S.miss=null;yes('6 tiles of 1/6 make 6/6 = 1. So 1 1/2 × 2/3 = 3/2 × 2/3 = 6/6 = 1.');return refresh()}
 S.miss=tag;const t=BUILD[S.i];
 if(tag==='add')return oops(`You added: ${t[0]}+${t[2]} over ${t[1]}+${t[3]}. Count the tiles: ${t[0]*t[2]} shaded, and one square holds ${t[1]} × ${t[3]} = ${t[1]*t[3]} tiles.`);
 if(tag==='den')return oops(`The top is right: ${pl(t[0]*t[2],'tile')}. But one square holds ${t[1]} × ${t[3]} = ${t[1]*t[3]} tiles, not ${t[1]+t[3]}.`);
 if(tag==='addwhole')return oops('You added 1 and 2/3. The side is 1 1/2 and you multiply: 6 tiles of 1/6 fill exactly one square.');
 if(tag==='onesq')return oops('3/6 counts only the part in the first square. All 6 shaded tiles are sixths of one square, so the area is 6/6.')}
function setup(){const m=mode();S.units=m==='long'?2:1;if(m==='build'){S.cols=4;S.rows=3}if(m==='count'){const t=BUILD[S.i];if(t){S.cols=t[1];S.rows=t[3]}}if(m==='long'){S.cols=2;S.rows=3}S.w=1;S.h=1;S.ready=false}
/* step 5: match */
const miniR=j=>{const w=A.narrow?(A.W-30)/3:(A.W-40)/3,h=A.narrow?A.H*.3:A.H*.48;return{x:10+j*(w+10),y:A.H*.26,w,h}};
function mini(r,o,mark){card(r,mark==='ok'?HOT:mark==='bad'?'#fee2e2':CARD,mark==='ok'?OK:mark==='bad'?NO:RIM,mark?3.5:2);const [cols,rows,cw,rh]=o,U=Math.min(r.w,r.h)-q(18),x=r.x+(r.w-U)/2,y=r.y+(r.h-U)/2;
 Z.fillStyle=SKY;Z.fillRect(x,y,U*cw/cols,U*rh/rows);Z.strokeStyle=RIM;Z.lineWidth=1;for(let i=1;i<cols;i++){Z.beginPath();Z.moveTo(x+i*U/cols,y);Z.lineTo(x+i*U/cols,y+U);Z.stroke()}for(let j=1;j<rows;j++){Z.beginPath();Z.moveTo(x,y+j*U/rows);Z.lineTo(x+U,y+j*U/rows);Z.stroke()}
 Z.strokeStyle=INK;Z.lineWidth=2;Z.strokeRect(x,y,U,U);Z.strokeStyle=BLUE;Z.lineWidth=2.5;Z.strokeRect(x,y,U*cw/cols,U*rh/rows)}
function drawMatch(){const t=MATCH[S.i];head(t?`Tap the square that shows ${fr(t[0],t[1])} × ${fr(t[2],t[3])}.`:'Width across, height down: the shaded part is the product.',!t);
 if(!t){mini(miniR(1),[4,3,3,2],'ok');return}t[4].forEach((o,j)=>{mini(miniR(j),o,S.miss===j?'bad':null);say(['A','B','C'][j],miniR(j).x+q(14),miniR(j).y+q(14),13,INK,'center',800)})}
function choose(j){const t=MATCH[S.i];if(!t)return;const o=t[4][j];if(o[4]==='ok'){S.i++;S.miss=null;A.sound.tick();yes(`Yes: ${o[2]} of ${o[0]} columns and ${o[3]} of ${o[1]} rows, ${o[2]*o[3]} of ${o[0]*o[1]} tiles = ${fr(o[2]*o[3],o[0]*o[1])}.`);return refresh()}S.miss=j;
 if(o[4]==='whole')return oops(`${['A','B','C'][j]} is shaded the full height, so it shows ${fr(o[2],o[0])} × 1, not × ${fr(t[2],t[3])}.`);
 oops(`${['A','B','C'][j]} shows ${fr(o[2],o[0])} × ${fr(o[3],o[1])}. Count the shaded columns and rows again.`)}
/* pointer */
function down(p){const m=mode();
 if(m==='cut'){const k=[0,1].find(k=>hit(p,chipR(k)));if(k!=null){addCut(k);return true}return false}
 if(m==='build'||m==='count'||m==='long'){if(S.ready&&m!=='build'&&!A.narrow&&!S.picked){const o=opts(),j=[0,1,2].find(j=>hit(p,optR(j)));if(j!=null){pick(o[j][1]);return true}}
  if(m==='count'&&!BUILD[S.i])return false;if(hit(p,handle())){S.drag=true;return true}const g=geo();if(hit(p,{x:g.x,y:g.y,w:g.U*g.units,h:g.U})){S.drag=true;move(p);return true}return false}
 if(m==='match'){const j=[0,1,2].find(j=>hit(p,miniR(j)));if(j!=null){choose(j);return true}}return false}
function move(p){if(!S.drag)return;const g=geo(),w=Math.round((p.x-g.x)/g.cw),h=Math.round((p.y-g.y)/g.rh);const W2=Math.max(1,Math.min(g.ncol,w)),H2=Math.max(1,Math.min(S.rows,h));if(W2!==S.w||H2!==S.h){S.w=W2;S.h=H2;A.sound.tick();S.ready=false;S.msg='';A.redraw()}}
function up(){if(!S.drag)return;S.drag=false;check()}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();if(m==='cut')drawCut();if(m==='build'||m==='count'||m==='long')drawBuild();if(m==='match')drawMatch();
 if(m==='chal'){head('Area of a fraction rectangle = width × height: multiply tops, multiply bottoms.');S.units=1;S.cols=4;S.rows=3;S.w=3;S.h=2;grid(true)}
 msg();A.fx.draw(Z)}
function refresh(){const m=mode();let s='Challenge.';
 if(m==='cut')s=`Square cut into ${pl(S.cols,'column')} and ${pl(S.rows,'row')}: ${pl(S.cols*S.rows,'tile')}, each 1/${S.cols*S.rows} of the square.`;
 if(m==='build'||m==='count'||m==='long'){if(m==='count'&&!BUILD[S.i])s='All three areas found.';else s=`Rectangle ${sideW()} wide and ${fr(S.h,S.rows)} tall: ${pl(S.w*S.h,'tile')}, each 1/${S.cols*S.rows} of a square.${S.ready&&m!=='build'?' Area options: '+opts().map(o=>o[0]).join(', ')+'.':''}`}
 if(m==='match'){const t=MATCH[S.i];s=t?`Which square shows ${fr(t[0],t[1])} times ${fr(t[2],t[3])}? ${t[4].map((o,j)=>`${'ABC'[j]}: ${o[2]} of ${o[0]} columns, ${o[3]} of ${o[1]} rows`).join('. ')}.`:'All three matched.'}
 live((S.msg?S.msg+' ':'')+s);btns();S.then()}
function btns(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='cut'){b('+ column',()=>addCut(0),'Add a column cut');b('+ row',()=>addCut(1),'Add a row cut')}
 if((m==='build'||m==='count'||m==='long')&&!(m==='count'&&!BUILD[S.i])){b('Wider',()=>setTo(S.w+1,S.h));b('Narrower',()=>setTo(S.w-1,S.h));b('Taller',()=>setTo(S.w,S.h+1));b('Shorter',()=>setTo(S.w,S.h-1));if(S.ready&&m!=='build'&&!S.picked)opts().forEach(([t,tag])=>b(t,()=>pick(tag),`Area ${t}`))}
 if(m==='match'&&MATCH[S.i])['A','B','C'].forEach((t,j)=>b(t,()=>choose(j),`Square ${t}`));
 A.redraw()}
const finish=(n,ok,txt)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(txt+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const fresh=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},i:0,units:1,cols:1,rows:1,w:1,h:1,ready:false,picked:false,drag:false,miss:null,msg:'',bad:false})};
const buildTo=()=>{const t=want();if(t)setTo(t[0],t[1])};
const steps=[
{h:'Cut the unit square',p:'Start with a square 1 unit by 1 unit. Its area is 1. Cut it into equal strips both ways.',
predict:{q:'Cut the square into thirds one way and quarters the other. What fraction of the square is each tile?',opts:['1/12','1/7','1/4'],ans:0},
task:'Make 12 tiles: thirds and quarters',show:()=>{steps[0].go();play([()=>addCut(0),()=>addCut(0),()=>addCut(0),()=>addCut(1),()=>addCut(1)],350)},go:()=>{fresh();refresh();S.then=finish(0,()=>S.cols*S.rows===12&&[S.cols,S.rows].sort().join()==='3,4','Each tile is 1/12.')}},
{h:'Build 3/4 × 2/3',p:'Now shade a rectangle 3/4 of a unit wide and 2/3 of a unit tall. Count the tiles inside it.',
predict:{q:'Is the area of a 3/4 by 2/3 rectangle bigger or smaller than 3/4?',opts:['Smaller','Bigger','The same'],ans:0},
task:'Make the 3/4 × 2/3 rectangle',show:()=>{steps[1].go();play([buildTo],300)},go:()=>{fresh();setup();refresh();S.then=finish(1,()=>S.ready,'3/4 × 2/3 = 6/12.')}},
{h:'Count the tiles',p:'For each rectangle: shaded tiles go on top, the tiles in one whole square go on the bottom.',
task:'Find 3 areas',show:()=>{steps[2].go();const one=()=>[buildTo,()=>pick('ok')];play([...one(),...one(),...one()],450)},go:()=>{fresh();setup();refresh();S.then=finish(2,()=>S.i>=BUILD.length,'Area = width × height.')}},
{h:'Longer than 1',p:'A side can be longer than 1. Here are two unit squares side by side, cut into halves across and thirds down.',
predict:{q:'What is 1 1/2 × 2/3?',opts:['1','1 2/3','2/6'],ans:0},
task:'Build 1 1/2 × 2/3 and find its area',show:()=>{steps[3].go();play([buildTo,()=>pick('ok')],500)},go:()=>{fresh();setup();refresh();S.then=finish(3,()=>S.picked,'3/2 × 2/3 = 1.')}},
{h:'Which rectangle?',p:'Width is across and height is down. Find the square that shows each product.',
task:'Match 3 products',show:()=>{steps[4].go();play(MATCH.map(t=>()=>choose(t[4].findIndex(o=>o[4]==='ok'))),450)},go:()=>{fresh();refresh();S.then=finish(4,()=>S.i>=MATCH.length,'The shaded part is the product.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['What is 2/3 × 1/4?','2/12',[['3/7','add'],['2/7','den']]],
['Is 1/2 × 1/3 bigger or smaller than 1/2?','Smaller: it is 1/6',[['Bigger: multiplying makes bigger','bigger'],['The same as 1/2','same']]],
['A rug is 3/4 m long and 1/2 m wide. What is its area?','3/8 m²',[['4/6 m²','add'],['3/6 m²','den']]],
['A square is cut into fifths one way and halves the other. Each tile is…','1/10 of the square',[['1/7 of the square','addtile'],['1/5 of the square','onecut']]],
['What is 1 1/2 × 1/2?','3/4',[['1 1/4','addwhole'],['1/4','dropwhole']]],
['A 2/5 × 3/4 rectangle covers how many 1/20 tiles?','6',[['5','addnum'],['20','all']]]];
function why(tag){let m='Area = width × height: multiply the tops, and multiply the bottoms.';
 if(tag==='add')m='You added the tops and the bottoms. Area multiplies: tiles shaded = top × top, tiles in one square = bottom × bottom.';
 if(tag==='den')m='The top is right, but the bottom is the number of tiles in one square: multiply the bottoms, do not add them.';
 if(tag==='bigger')m='Multiplying by a fraction less than 1 takes part of the number, so the answer is smaller: 1/2 × 1/3 = 1/6.';
 if(tag==='same')m='Taking 1/3 of a 1/2 strip leaves less than the strip: 1/6.';
 if(tag==='addtile')m='5 strips one way and 2 the other make 5 × 2 = 10 tiles, not 5 + 2.';
 if(tag==='onecut')m='1/5 is a whole strip. Cutting each strip in half makes 10 tiles, so each is 1/10.';
 if(tag==='addwhole')m='1 1/2 is 3/2. 3/2 × 1/2 = 3/4. Adding 1 and 1/4 skips the multiplying.';
 if(tag==='dropwhole')m='1/4 is only 1/2 × 1/2. The side is 1 1/2 = 3/2, so the area is 3/2 × 1/2 = 3/4.';
 if(tag==='addnum')m='You added 2 + 3. Shaded tiles = 2 columns × 3 rows = 6.';
 if(tag==='all')m='20 tiles fill the whole square. Only 2 × 3 = 6 of them are inside the rectangle.';
 return m}
function ask(){qi++;const [qq,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});live('Challenge: '+qq);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Fraction area lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
