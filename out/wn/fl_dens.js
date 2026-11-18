/* Flagship – Calculating density (ages 12–14; KS3 physics ρ = m/V; displacement; particles). Values: CRC tables. */
(()=>{
const CUBE=[['pine',5,'#d6a76b'],['aluminium',27,'#cbd5e1'],['steel',79,'#94a3b8'],['copper',90,'#d97745']];
const CALC=[[54,20,'aluminium'],[39.5,5,'steel'],[12,24,'pine'],[180,20,'copper']];
const BOXS=[[5,2,2,54,'aluminium'],[4,3,2,12,'pine'],[2,2,2,72,'copper']];
const DROP=[['pebble',20,50],['brass key',4,34],['plastic dinosaur',10,14]];
const SINK=[['cork',.24],['steel bolt',7.9],['ice cube',.92],['PVC brick',1.4],['candle wax',.9],['pine block',.5],['aluminium spoon',2.7],['rubber eraser',1.5]];
const PART=[['lead',11.3,0,7,'#475569'],['aluminium',2.7,0,5,'#94a3b8'],['water',1,1,5,'#38bdf8'],['steam',.0006,2,5,'#7dd3fc']];
const PORD=[2,0,3,1];
VIS.reg('flagdens',c=>{let A,btns,chal,qq=-1,ver=0;
const D={};
const K='#0f172a',GO='#047857',ER='#b91c1c',LN='#64748b',PI='#4338ca',WH='#fff',WATER='#bae6fd';
const u=v=>Math.round(v*(A.narrow?.94:1.08)),fnt=(v,w)=>`${w||800} ${u(v)}px system-ui,sans-serif`,r1=x=>Math.round(x*10)/10;
const now=()=>['cube','calc','box','drop','sink','part','quiz'][A.step],isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function floor(){A.ctx.fillStyle=A.col.dark?'#0b1120':'#f8fafc';A.ctx.fillRect(0,0,A.W,A.H)}
function card(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||WH;A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||10);g.fill();g.lineWidth=o.rim?3.5:1.4;g.strokeStyle=o.rim||LN;g.stroke();
 if(t==null)return;g.fillStyle=o.fg||K;g.font=fnt(o.n||17,o.w||800);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)}
function title(t,won){const g=A.ctx;let n=15;g.font=fnt(n);while(g.measureText(t).width+28>A.W-8&&n>10){n--;g.font=fnt(n)}const w=g.measureText(t).width+24;card({x:A.W/2-w/2,y:A.H*.02,w,h:u(n)+14},t,{bg:won?'#d1fae5':WH,rim:won?GO:null,n})}
function txt(t,x,y,n,col,al){const g=A.ctx;g.fillStyle=col||A.col.tx;g.font=fnt(n||14,700);g.textAlign=al||'center';g.textBaseline='middle';g.fillText(t,x,y,A.W-12)}
const dragged=(r,j)=>D.hold&&D.hold.j===j?{...r,x:D.hold.x-r.w/2,y:D.hold.y-r.h/2}:r;
function choice(list,y){const n=list.length,gp=7,w=Math.min(u(140),(A.W-16-gp*(n-1))/n),h=u(52),tot=n*w+(n-1)*gp;return list.map((t,j)=>({t,j,w,h,y,x:A.W/2-tot/2+j*(w+gp)}))}
function pan(){const w=Math.min(u(170),A.W*.42);return{x:A.W/2-w/2,y:A.H*.32,w,h:u(70)}}
function cubeAt(i){const s=u(48),gp=(A.W-4*s)/5;return{x:gp+i*(s+gp),y:A.H*.8,w:s,h:s,j:i}}
function drawCube(){const s=D.cube,g=A.ctx,P=pan();floor();const n=Object.keys(s.got).length;title(n>=4?'All 4 cubes weighed':`Drag a 10 cm³ cube onto the scale (${n} of 4)`,n>=4);
 g.fillStyle='#334155';g.fillRect(P.x+P.w/2-5,P.y+P.h,10,u(20));card(P,null,{bg:'#e2e8f0',rad:8});const on=s.on;
 card({x:P.x+P.w/2-u(54),y:P.y+P.h+u(20),w:u(108),h:u(34)},on==null?'0 g':`${CUBE[on][1]} g`,{bg:'#0f172a',fg:'#a7f3d0',n:18,rad:6});
 if(on!=null){const c0=CUBE[on];card({x:P.x+P.w/2-u(24),y:P.y-u(48)+u(4),w:u(48),h:u(48)},null,{bg:c0[2],rad:4});txt(`${c0[0]}: ${c0[1]} g ÷ 10 cm³ = ${r1(c0[1]/10)} g/cm³`,A.W/2,A.H*.13,15)}
 CUBE.forEach((c0,i)=>{if(i===on)return;const r=dragged(cubeAt(i),i);card(r,null,{bg:c0[2],rad:4,rim:s.got[i]?GO:null});txt(c0[0],r.x+r.w/2,r.y-u(10),12)});
 }
function weigh(i){const s=D.cube;s.on=i;s.got[i]=1;A.sound.pop();const c0=CUBE[i];say(`${c0[0]}: ${c0[1]} g in 10 cm³, so ${r1(c0[1]/10)} g/cm³.`+(Object.keys(s.got).length>=4?' Same size, different density.':''))}
const calcOpts=()=>{const [m,v]=CALC[D.calc.n],o=[r1(m/v),r1(m*v),Math.round(v/m*100)/100],r=D.calc.n%3;return choice([0,1,2].map(j=>o[(j+r)%3]+' g/cm³'),A.H*.66).map((b,k)=>({...b,j:(k+r)%3}))};
function drawCalc(){const s=D.calc;floor();if(s.n>=CALC.length){title('All 4 densities worked out',1);CALC.forEach((q,i)=>txt(`${q[0]} ÷ ${q[1]} = ${r1(q[0]/q[1])} (${q[2]})`,A.W/2,A.H*(.22+i*.15),14));return}
 const [m,v]=CALC[s.n];title(`Block ${s.n+1} of 4: find the density`);txt(`mass = ${m} g     volume = ${v} cm³`,A.W/2,A.H*.2,18);
 txt('density = mass ÷ volume',A.W/2,A.H*.32,15,PI);const w=Math.min(u(200),A.W*.5);card({x:A.W/2-w/2,y:A.H*.4,w,h:u(52)},'ρ = ?',{rim:s.bad!=null?ER:PI,n:20});
 calcOpts().forEach(b=>card(dragged(b,b.j),b.t,{bg:'#ede9fe',fg:'#4c1d95',n:16,rim:D.hold&&D.hold.j===b.j?PI:s.bad===b.j?ER:null}))}
function calc(j){const s=D.calc;if(s.n>=CALC.length)return;const [m,v,name]=CALC[s.n];
 if(j){s.bad=j;A.sound.miss();return say(j===1?`That multiplied. Divide: ${m} ÷ ${v}.`:`That is ${v} ÷ ${m}. Mass goes on top.`)}
 s.n++;s.bad=null;A.sound.pop();say(`${m} ÷ ${v} = ${r1(m/v)} g/cm³. That matches ${name}.`+(s.n>=CALC.length?' All 4 done.':''))}
const boxOpts=()=>{const [l,w,h]=BOXS[D.box.n],r=(D.box.n+1)%3,o=[`${l}×${w}×${h} = ${l*w*h}`,`${l}+${w}+${h} = ${l+w+h}`,`${l}×${w} = ${l*w}`];return choice([0,1,2].map(j=>o[(j+r)%3]),A.H*.72).map((b,k)=>({...b,j:(k+r)%3}))};
function drawBox(){const s=D.box,g=A.ctx;floor();if(s.n>=BOXS.length){title('All 3 blocks identified',1);BOXS.forEach((q,i)=>txt(`${q[0]}×${q[1]}×${q[2]} cm: ${q[4]}`,A.W/2,A.H*(.25+i*.17),14));return}
 const [l,w,h,m]=BOXS[s.n];title(`Block ${s.n+1} of 3: first the volume`);const S=Math.min(u(26),A.W/14),x0=A.W/2-(l*S+w*S*.5)/2,y0=A.H*.28+w*S*.5,dx=S*.5,dy=-S*.5;
 g.lineWidth=1.5;g.strokeStyle='#334155';const face=(pts,col)=>{g.fillStyle=col;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fill();g.stroke()};
 face([[x0,y0],[x0+l*S,y0],[x0+l*S,y0+h*S],[x0,y0+h*S]],'#cbd5e1');face([[x0,y0],[x0+w*dx,y0+w*dy],[x0+l*S+w*dx,y0+w*dy],[x0+l*S,y0]],'#e2e8f0');face([[x0+l*S,y0],[x0+l*S+w*dx,y0+w*dy],[x0+l*S+w*dx,y0+w*dy+h*S],[x0+l*S,y0+h*S]],'#94a3b8');
 txt(`${l} cm`,x0+l*S/2,y0+h*S+u(12),13);txt(`${h} cm`,x0-u(18),y0+h*S/2,13);txt(`${w} cm`,x0+l*S+w*dx+u(16),y0+w*dy/2,13);txt(`mass ${m} g`,A.W/2,A.H*.62,15);
 boxOpts().forEach(b=>card(b,b.t+' cm³',{n:15,rim:s.bad===b.j?ER:null}))}
function box(j){const s=D.box;if(s.n>=BOXS.length)return;const [l,w,h,m,name]=BOXS[s.n],V=l*w*h;
 if(j){s.bad=j;A.sound.miss();return say(j===1?'Adding sides gives a length. Multiply l × w × h.':'l × w is one face. Multiply by the height too.')}
 s.n++;s.bad=null;A.sound.pop();say(`Volume ${V} cm³. Density ${m} ÷ ${V} = ${r1(m/V)} g/cm³: ${name}.`+(s.n>=BOXS.length?' All 3 identified.':''))}
function tube(){const w=u(70),h=A.H*.5;return{x:A.W*.3-w/2,y:A.H*.2,w,h}}
const lvl=(T,ml)=>T.y+T.h-(ml/100)*T.h;
const objR=()=>({x:A.W*.7-u(40),y:A.H*.25,w:u(80),h:u(54)});
const dropOpts=()=>{const [,v]=DROP[D.drop.n],r=(D.drop.n+2)%3,o=[`${v} cm³`,`${50+v} cm³`,'50 cm³'];return choice([0,1,2].map(j=>o[(j+r)%3]),A.H*.8).map((b,k)=>({...b,j:(k+r)%3}))};
function drawDrop(){const s=D.drop,g=A.ctx,T=tube();floor();if(s.n>=DROP.length){title('All 3 volumes found',1);DROP.forEach((q,i)=>txt(`${q[0]}: ${q[1]} cm³, ${r1(q[2]/q[1])} g/cm³`,A.W/2,A.H*(.25+i*.17),14));return}
 const [name,v,m]=DROP[s.n],ml=s.in?50+v:50;title(s.in?`${name}: what is its volume?`:`Drag the ${name} into the water`);
 g.fillStyle=WATER;g.fillRect(T.x,lvl(T,ml),T.w,T.y+T.h-lvl(T,ml));g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(T.x,T.y,T.w,T.h);
 for(let q=0;q<=100;q+=10){const y=lvl(T,q);g.beginPath();g.moveTo(T.x+T.w,y);g.lineTo(T.x+T.w-(q%50?8:16),y);g.stroke();if(!(q%20))txt(String(q),T.x+T.w+u(16),y,11,null,'center')}
 txt('cm³',T.x+T.w+u(16),T.y-u(10),11);txt(`start 50`,T.x-u(30),lvl(T,50),12,null,'center');if(s.in){txt(`now ${50+v}`,T.x-u(30),lvl(T,50+v),12,PI,'center');card({x:T.x+8,y:T.y+T.h-u(22),w:T.w-16,h:u(18)},null,{bg:'#78716c',rad:6})}
 if(!s.in){const r=dragged(objR(),0);card(r,name,{bg:'#e7e5e4',n:13,rim:D.hold?PI:null});txt(`mass ${m} g`,A.W*.7,A.H*.25+u(70),14)}
 else{txt(`mass ${m} g`,A.W*.7,A.H*.3,15);dropOpts().forEach(b=>card(b,b.t,{bg:'#ede9fe',fg:'#4c1d95',n:16,rim:s.bad===b.j?ER:null}))}}
function sinkIn(){const s=D.drop;if(s.n>=DROP.length||s.in)return;s.in=1;A.sound.pop();const [name,v]=DROP[s.n];say(`The water rises from 50 to ${50+v} cm³. What is the volume of the ${name}?`)}
function drop(j){const s=D.drop;if(s.n>=DROP.length||!s.in)return;const [name,v,m]=DROP[s.n];
 if(j){s.bad=j;A.sound.miss();return say(j===1?`${50+v} is water plus ${name}. Take away the 50.`:'50 cm³ is the water alone.')}
 s.n++;s.in=0;s.bad=null;A.sound.pop();say(`${50+v} − 50 = ${v} cm³. Density ${m} ÷ ${v} = ${r1(m/v)} g/cm³.`+(s.n>=DROP.length?' All 3 done.':''))}
function tank(){return{x:12,y:A.H*.38,w:A.W-24,h:A.H*.58}}
function drawSink(){const s=D.sink,g=A.ctx,T=tank();floor();title(s.n>=SINK.length?'All 8 tested':`${s.n+1} of 8: float or sink?`,s.n>=SINK.length);
 g.fillStyle=A.col.dark?'#0c4a6e':WATER;g.fillRect(T.x,T.y,T.w,T.h);g.fillStyle=A.col.dark?'#e0f2fe':'#0c4a6e';g.font=fnt(13,800);g.textAlign='left';g.textBaseline='top';g.fillText('floats (top half)',T.x+6,T.y+5);g.textBaseline='bottom';g.fillText('sinks (bottom half)',T.x+6,T.y+T.h-5);
 g.strokeStyle=A.col.dark?'#e0f2fe':'#0c4a6e';g.setLineDash([6,5]);g.beginPath();g.moveTo(T.x,T.y+T.h/2);g.lineTo(T.x+T.w,T.y+T.h/2);g.stroke();g.setLineDash([]);
 const fl=SINK.slice(0,s.n).filter(x=>x[1]<1),sk=SINK.slice(0,s.n).filter(x=>x[1]>=1);g.font=fnt(12,700);g.textBaseline='middle';g.textAlign='center';g.fillStyle=A.col.dark?'#e0f2fe':'#0c4a6e';
 g.fillText(fl.map(x=>x[0]).join(' · '),A.W/2,T.y+u(34),A.W-30);g.fillText(sk.map(x=>x[0]).join(' · '),A.W/2,T.y+T.h-u(34),A.W-30);
 if(s.bad!=null){g.strokeStyle=ER;g.lineWidth=4;g.strokeRect(T.x+2,s.bad?T.y+T.h/2:T.y+2,T.w-4,T.h/2-2)}
 if(s.n<SINK.length){const q=SINK[s.n],w=Math.min(A.W-30,u(300));card(dragged({x:A.W/2-w/2,y:A.H*.12,w,h:u(56)},0),`${q[0]}: ${q[1]} g/cm³`,{rim:D.hold?PI:null,n:16})}
 txt('water 1.0 g/cm³',A.W/2,A.H*.32,13)}
function sink(j){const s=D.sink;if(s.n>=SINK.length)return;const [t,d]=SINK[s.n],k=d<1?0:1;
 if(j!==k){s.bad=j;A.sound.miss();return say(k?`${d} is more than water's 1.0, so it sinks.`:`${d} is less than 1.0, so it floats, however big.`)}
 s.n++;s.bad=null;A.sound.pop();say(`${t}: ${d} g/cm³, ${k?'sinks':'floats'}.`+(s.n>=SINK.length?' All 8 tested.':''))}
function cell(i){const gp=8,w=(A.W-16-gp*3)/4,h=Math.min(w*1.15,A.H*.42);return{x:8+i*(w+gp),y:A.H*.2,w,h,j:i}}
function dots(R,kind,rad,col){const g=A.ctx;g.fillStyle=col;const r=u(rad),pts=[];
 if(kind===0){for(let y=R.y+r+3;y<R.y+R.h-r;y+=2*r+1)for(let x=R.x+r+3;x<R.x+R.w-r;x+=2*r+1)pts.push([x,y])}
 else if(kind===1){let n=0;for(let y=R.y+r+5;y<R.y+R.h-r;y+=2*r+3)for(let x=R.x+r+4;x<R.x+R.w-r;x+=2*r+4)pts.push([x+(n%3)-1,y+(n++%5)-2])}
 else[[.3,.25],[.7,.45],[.4,.7],[.75,.85]].forEach(p=>pts.push([R.x+p[0]*R.w,R.y+p[1]*R.h]));pts.forEach(p=>{g.beginPath();g.arc(p[0],p[1],r,0,7);g.fill()})}
function drawPart(){const s=D.part;floor();const n=s.order.length;title(n>=4?'Ranked, densest first':`Tap the densest left (${n} of 4)`,n>=4);
 PART.forEach((q,i)=>{const R=cell(PORD[i]),pos=s.order.indexOf(i);card(R,null,{bg:WH,rim:pos>=0?GO:s.bad===i?ER:null});dots(R,q[2],q[3],q[4]);txt(q[0],R.x+R.w/2,R.y+R.h+u(14),12);
  if(pos>=0){txt(`#${pos+1}`,R.x+R.w/2,R.y+R.h+u(32),14,GO);txt(`${q[1]} g/cm³`,R.x+R.w/2,R.y+R.h+u(50),11)}})}
function part(i){const s=D.part;if(s.order.length>=4||s.order.includes(i))return;const want=s.order.length;
 if(i!==want){s.bad=i;A.sound.miss();const t=PART[i][0];return say(i===1&&want===0?'Both packed tight, but lead particles are heavier: more mass in the same space.':i===3?'Steam particles are far apart, so it is the least dense.':i===2?'Water particles are lighter and less neatly packed than metal ones.':`${t} is not next.`)}
 s.order.push(i);s.bad=null;A.sound.pop();say(`${PART[i][0]}: ${PART[i][1]} g/cm³.`+(s.order.length>=4?' Heavier particles packed closer means higher density.':''))}
function draw(){const k=now();if(k==='quiz'){floor();title('Challenge',1);txt('ρ = m ÷ V',A.W/2,A.H*.5,28);return}
 ({cube:drawCube,calc:drawCalc,box:drawBox,drop:drawDrop,sink:drawSink,part:drawPart})[k]();A.fx.draw(A.ctx)}
function dn(p){const k=now(),take=j=>{D.hold={j,x:p.x,y:p.y};return true};
 if(k==='cube'){const c0=[0,1,2,3].find(i=>i!==D.cube.on&&isIn(p,cubeAt(i)));return c0!=null?take(c0):false}
 if(k==='calc'&&D.calc.n<CALC.length){const b=calcOpts().find(b=>isIn(p,b));return b?take(b.j):false}
 if(k==='box'&&D.box.n<BOXS.length){const b=boxOpts().find(b=>isIn(p,b));if(b)box(b.j);return false}
 if(k==='drop'&&D.drop.n<DROP.length){if(!D.drop.in){if(isIn(p,objR()))return take(0);if(isIn(p,tube()))sinkIn();return false}const b=dropOpts().find(b=>isIn(p,b));if(b)drop(b.j);return false}
 if(k==='sink'&&D.sink.n<SINK.length){if(p.y<A.H*.35)return take(0);const T=tank();if(isIn(p,T))sink(p.y>T.y+T.h/2?1:0);return false}
 if(k==='part'){const i=[0,1,2,3].find(i=>isIn(p,cell(PORD[i])));if(i!=null)part(i)}return false}
function mv(p){if(D.hold){D.hold.x=p.x;D.hold.y=p.y;A.redraw()}}
function upp(p){const h=D.hold;if(!h)return;D.hold=null;const k=now();
 if(k==='cube'){isIn(p,{...pan(),y:pan().y-u(60),h:pan().h+u(60)})?weigh(h.j):A.redraw();return}
 if(k==='calc'){p.y<A.H*.6?calc(h.j):A.redraw();return}
 if(k==='drop'){isIn(p,tube())||p.x<A.W*.5?sinkIn():A.redraw();return}
 if(k==='sink'){const T=tank();isIn(p,T)?sink(p.y>T.y+T.h/2?1:0):A.redraw()}}
function clear(){ver++;for(const x in D)delete D[x];Object.assign(D,{cube:{got:{},on:null},calc:{n:0},box:{n:0},drop:{n:0,in:0},sink:{n:0},part:{order:[]},hold:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();D.check()}
function ready(i,desc,ok,msg){clear();say(desc);D.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function pads(){if(!btns)return;btns.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},btns,t).onclick=f};
 if(k==='cube')CUBE.forEach((c0,i)=>b(`Weigh ${c0[0]}`,()=>weigh(i)));
 if(k==='calc'&&D.calc.n<CALC.length)calcOpts().forEach(o=>b(o.t,()=>calc(o.j),`density ${o.t}`));
 if(k==='box'&&D.box.n<BOXS.length)boxOpts().forEach(o=>b(o.t+' cm³',()=>box(o.j),`volume ${o.t} cubic centimetres`));
 if(k==='drop'&&D.drop.n<DROP.length){if(!D.drop.in)b(`Drop the ${DROP[D.drop.n][0]} in`,sinkIn);else dropOpts().forEach(o=>b(o.t,()=>drop(o.j),`volume ${o.t}`))}
 if(k==='sink'&&D.sink.n<SINK.length)['floats','sinks'].forEach((t,j)=>b(t,()=>sink(j),`${SINK[D.sink.n][0]} ${t}`));
 if(k==='part'&&D.part.order.length<4)[1,3,0,2].forEach(i=>{if(!D.part.order.includes(i))b(PART[i][0],()=>part(i),`Rank next: ${PART[i][0]}`)})}
const steps=[
{h:'Equal cubes',p:'Each cube is 10 cm³. Drag each onto the scale. Density is the mass packed into each cm³.',
predict:{q:'A big pine plank or a small steel nut: which is denser?',opts:['the plank, it is heavier','the steel, more mass per cm³'],ans:1},task:'Weigh all 4 cubes',
show:()=>demo(0,CUBE.map((_,i)=>()=>weigh(i)),600),
go:()=>ready(0,'Four 10 cm³ cubes. Drag one onto the scale.',()=>Object.keys(D.cube.got).length>=4,'Density depends on the material, not the size.')},
{h:'density = mass ÷ volume',p:'Divide mass in g by volume in cm³ to get density in g/cm³. Mass on top. Drag the answer into the box.',task:'Work out all 4',
show:()=>demo(1,CALC.map(()=>()=>calc(0)),600),
go:()=>ready(1,'54 g, 20 cm³. Drag the density into the box.',()=>D.calc.n>=CALC.length,'ρ = m ÷ V, in g/cm³.')},
{h:'Regular blocks',p:'For a cuboid, volume = length × width × height. Then divide the mass by it. Tap the volume.',task:'Identify all 3 blocks',
show:()=>demo(2,BOXS.map(()=>()=>box(0)),600),
go:()=>ready(2,'Block 5 by 2 by 2 cm, 54 g. Tap its volume.',()=>D.box.n>=BOXS.length,'V = l × w × h, then ρ = m ÷ V.')},
{h:'Odd shapes',p:'A pebble has no straight sides. In a measuring cylinder, water rises by its volume. Drag it in, then pick its volume.',
predict:{q:'The water goes from 50 to 70 cm³. The pebble\'s volume is…',opts:['70 cm³','20 cm³'],ans:1},task:'Find all 3 volumes',
show:()=>{steps[3].go();const me=ver;let t=0;DROP.forEach(()=>{t+=450;setTimeout(()=>{if(me===ver)sinkIn()},t);t+=450;setTimeout(()=>{if(me===ver)drop(0)},t)})},
go:()=>ready(3,'50 cm³ of water. Drag the pebble in.',()=>D.drop.n>=DROP.length,'Volume = new reading − start reading.')},
{h:'Float or sink?',p:'Water is 1.0 g/cm³. Less dense floats; denser sinks. Size and weight do not decide it. Drag each into the tank.',
predict:{q:'A huge pine log and a small pebble go in a lake. Which floats?',opts:['the pebble, it is lighter','the log, pine is less dense'],ans:1},task:'Test all 8',
show:()=>demo(4,SINK.map(x=>()=>sink(x[1]<1?0:1)),450),
go:()=>ready(4,'cork, 0.24 g/cm³. Drag it to the top or bottom half.',()=>D.sink.n>=SINK.length,'Below 1.0 floats, above 1.0 sinks.')},
{h:'Why? Particles',p:'Density depends on particle mass and how closely they pack. Tap from most to least dense.',task:'Rank all 4 boxes',
show:()=>demo(5,[0,1,2,3].map(i=>()=>part(i)),600),
go:()=>ready(5,'Lead, aluminium, water, steam. Tap the densest first.',()=>D.part.order.length>=4,'Close, heavy particles make a dense material.')},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>D.check()});
const QS=[
{q:'A stone: 60 g, 24 cm³. Its density:',a:'2.5 g/cm³',o:[['1440 g/cm³','times'],['0.4 g/cm³','flip']]},
{q:'Water rises from 40 to 55 cm³ with a toy in. Its volume:',a:'15 cm³',o:[['55 cm³','reading'],['95 cm³','add']]},
{q:'A block is 3 cm × 2 cm × 2 cm. Its volume is:',a:'12 cm³',o:[['7 cm³','sum'],['6 cm³','face']]},
{q:'Olive oil is 0.92 g/cm³. Poured onto water, it:',a:'floats on top',o:[['sinks, as there is more of it','size'],['mixes evenly','mix']]},
{q:'Cut a steel bar in half. Each half\'s density is:',a:'the same as before',o:[['half as much','half'],['twice as much','half']]},
{q:'1 g/cm³ is the same as:',a:'1000 kg/m³',o:[['1 kg/m³','unit'],['100 kg/m³','unit']]}];
function fix(t){let m='Use density = mass ÷ volume.';switch(t){case 'times':m='That multiplied. Divide: 60 ÷ 24 = 2.5.';break;case 'flip':m='That is volume ÷ mass. Mass goes on top.';break;case 'reading':m='55 is water plus toy. Take away the 40 first.';break;
 case 'add':m='Subtract the readings, do not add them: 55 − 40.';break;case 'sum':m='Adding sides gives a length. Multiply: 3 × 2 × 2.';break;case 'face':m='3 × 2 is one face. Multiply by the height too.';break;
 case 'size':m='Amount does not matter: 0.92 < 1.0, so it floats.';break;case 'mix':m='They do not mix; the less dense one sits on top.';break;case 'half':m='Mass and volume both halve, so mass ÷ volume stays the same.';break;
 case 'unit':m='A m³ holds a million cm³; a million g is 1000 kg.'}return m}
function ask(){qq++;const Q=QS[qq%QS.length],all=[[Q.a,'ok'],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();const m=ok?'':fix(t);
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+m)+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':m)}
FK.shell(c,{steps,ratio:.64,tall:1.2,draw,onStep:B=>{chal.hidden=B.step!==6;btns.hidden=B.step===6;pads()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Density buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down:dn,move:mv,up:upp});pads()}}).start()})})();
