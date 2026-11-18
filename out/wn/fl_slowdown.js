/* Flagship: air resistance, water resistance and friction (ages 9–10; National Curriculum in England, Year 5 forces:
   "identify the effects of air resistance, water resistance and friction, that act between moving surfaces").
   Point each resisting force against the motion, drop a 50 g toy from 2 m under four canopy sizes, speed a cyclist up from
   10 to 40 km/h and tuck down, race the same marble down 30 cm of air and of water, then brake a bike with four pad and rim
   conditions. Figures come from a simple drag model (F = ½ρCdAv²) and stopping distance d = v² ÷ 2μg, stated as estimates.
   Every canvas tap has a button twin. */
(()=>{
const C0={ink:'#0f172a',grey:'#475569',line:'#1e3a8a',white:'#ffffff',ok:'#047857',no:'#b91c1c',tint:'#eef2ff',pass:'#dcfce7',fail:'#fee2e2',sky:'#e0f2fe',sea:'#bae6fd',deep:'#7dd3fc',snow:'#f1f5f9',road:'#cbd5e1',move:'#1d4ed8',push:'#b91c1c',toy:'#f59e0b',silk:'#8b5cf6'};
const SCENES=[{who:'Cyclist',goes:'right',med:'air',force:'Air resistance',ans:'left'},{who:'Swimmer',goes:'left',med:'water',force:'Water resistance',ans:'right'},
 {who:'Skydiver',goes:'down',med:'air',force:'Air resistance',ans:'up'},{who:'Sledge',goes:'right',med:'snow',force:'Friction',ans:'left'}];
const DIRS=['left','up','down','right'],ARROW={left:'←',right:'→',up:'↑',down:'↓'};
const CHUTES=[['none',0,0.64],['small',0.03,0.76],['medium',0.12,1.09],['large',0.3,1.58]];
const SPEEDS=[10,20,30,40],DRAG=v=>0.5*1.2*0.4*(v/3.6)**2,TUCK=v=>0.5*1.2*0.25*(v/3.6)**2;
const TUBES=[['air',0.25],['water',0.46]];
const PADS=[['Rubber, dry rim',0.6,1.5],['Rubber, wet rim',0.3,3.0],['Hard plastic',0.2,4.4],['Oil on rim',0.1,8.9]];
VIS.reg('flagslowdown',c=>{let A,P,ctl,chal,n=-1,run=0;const T={hook:()=>{}};
const z=v=>Math.round(v*(A.narrow?1:1.1)),f=v=>`700 ${z(v)}px system-ui,sans-serif`;
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function word(s,x,y,v,col,al){P.font=f(v);P.fillStyle=col||C0.ink;P.textAlign=al||'center';P.textBaseline='middle';P.fillText(String(s),x,y,A.W-12)}
function lines(s,max,v){P.font=f(v);const r=[];let l='';for(const w of String(s).split(' ')){const t=l?l+' '+w:w;if(l&&P.measureText(t).width>max){r.push(l);l=w}else l=t}r.push(l);return r}
function pill(r,fill,edge,lw){P.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);P.fill();if(edge){P.strokeStyle=edge;P.lineWidth=lw||2;P.stroke()}}
function top(s,good){const L=lines(s,A.W-34,13),lh=z(13)+4,r={x:10,y:8,w:A.W-20,h:Math.max(A.H*.1,L.length*lh+12)};pill(r,good?C0.pass:C0.tint,good?C0.ok:C0.line);L.forEach((l,i)=>word(l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,13,good?C0.ok:C0.ink));return r.y+r.h}
function bottom(){if(!T.msg)return;const L=lines((T.bad?'✗ ':'✓ ')+T.msg,A.W-40,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-6;pill({x:10,y,w:A.W-20,h},C0.white,T.bad?C0.no:C0.ok,3);L.forEach((l,i)=>word(l,A.W/2,y+5+lh*(i+.5),13))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{T.bad=true;T.msg=s;A.sound.miss();sync()};
const nice=s=>{T.bad=false;T.msg=s;A.sound.pop()};
function arrow(x,y,dir,len,col,tag){const d={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]}[dir],x2=x+d[0]*len,y2=y+d[1]*len;P.strokeStyle=col;P.fillStyle=col;P.lineWidth=z(5);P.lineCap='round';
 P.beginPath();P.moveTo(x,y);P.lineTo(x2-d[0]*8,y2-d[1]*8);P.stroke();P.beginPath();P.moveTo(x2,y2);P.lineTo(x2-d[0]*14-d[1]*9,y2-d[1]*14-d[0]*9);P.lineTo(x2-d[0]*14+d[1]*9,y2-d[1]*14+d[0]*9);P.closePath();P.fill();
 if(tag){const mx=(x+x2)/2,my=(y+y2)/2;if(d[0])word(tag,mx,my-z(14),12,col);else word(tag,mx+z(8),my,12,col,'left')}}
function choices(list,y,look,name){const w=Math.min(z(92),(A.W-24-(list.length-1)*8)/list.length),all=list.length*w+(list.length-1)*8;
 return list.map((v,i)=>{const r={x:(A.W-all)/2+i*(w+8),y,w,h:z(42)},s=look?look(v,i):'';pill(r,s==='ok'?C0.pass:s==='no'?C0.fail:C0.white,s==='ok'?C0.ok:s==='no'?C0.no:C0.line,2);const L=lines(name?name(v):v,r.w-8,13);L.forEach((l,j)=>word(l,r.x+r.w/2,r.y+r.h/2+(j-(L.length-1)/2)*(z(13)+2),L.length>1?12:15));return r})}
const which=()=>['dir','chute','speed','tube','brake','chal'][A.step];
/* 1: direction of the resisting force */
function drawDir(){const fin=T.si>=SCENES.length,s=SCENES[Math.min(T.si,3)];
 top(fin?'Air resistance, water resistance and friction always push against the way something moves.':`${s.who} moving ${s.goes}. Which way does ${s.force.toLowerCase()} push?`,fin);
 const y0=A.H*.24,h=A.H*.38;P.fillStyle=s.med==='water'?C0.sea:s.med==='snow'?C0.sky:C0.sky;P.fillRect(16,y0,A.W-32,h);if(s.med==='snow'){P.fillStyle=C0.snow;P.fillRect(16,y0+h*.72,A.W-32,h*.28)}
 const cx=A.W/2,cy=y0+h/2,bw=z(92),bh=z(38);pill({x:cx-bw/2,y:cy-bh/2,w:bw,h:bh},C0.white,C0.ink,2);word(s.who,cx,cy,14);
 const vert=s.goes==='down'||s.goes==='up',len=Math.min(z(80),h*.4);
 arrow(vert?cx+bw/2+z(14):s.goes==='right'?cx+bw/2+6:cx-bw/2-6,vert?cy-len/2:cy+(vert?0:-z(4)),s.goes,len,C0.move,'moving');
 const pk=fin?s.ans:T.pick;if(pk){const opp=pk;arrow(opp==='left'?cx-bw/2-6:opp==='right'?cx+bw/2+6:cx-z(20),opp==='up'?cy-bh/2-4:opp==='down'?cy+bh/2+4:cy+z(10),opp,len*.8,pk===s.ans?C0.ok:C0.push,s.force.split(' ')[0])}
 if(!fin)T.dirR=choices(DIRS,y0+h+z(14),v=>v===T.pick?(v===s.ans?'ok':'no'):'',v=>ARROW[v]+' '+v)}
function pickDir(d){if(T.si>=SCENES.length)return;const s=SCENES[T.si];A.sound.tick();T.pick=d;
 if(d===s.goes)return miss(`That is the way the ${s.who.toLowerCase()} moves. ${s.force} pushes the other way, against the motion.`);
 if(d!==s.ans)return miss(`${s.force} acts along the line of motion, not across it. The ${s.who.toLowerCase()} goes ${s.goes}, so it pushes ${s.ans}.`);
 nice(`${s.force} pushes ${s.ans}, against the ${s.goes}ward motion.`);const id=T.run,k=T.si;sync();setTimeout(()=>{if(id!==T.run||k!==T.si)return;T.si++;T.pick=null;sync()},A.reduced()?40:650)}
/* 2: parachutes */
function drawChute(){const fin=CHUTES.every(([k])=>T.dropped.includes(k));top(fin?'The bigger the canopy, the more air it pushes against, so the air resistance is bigger and the toy falls more slowly.':'Same 50 g toy, dropped from 2 m. Tap a canopy size to drop it.',fin);
 const y0=A.H*.24,y1=A.H*.66,w=(A.W-40)/4;T.chuteR=[];
 CHUTES.forEach(([k,area,t],i)=>{const x=20+i*w+w/2,r={x:20+i*w+3,y:y0,w:w-6,h:y1-y0+z(46)};T.chuteR.push(r);pill(r,T.dropped.includes(k)?'#f0fdf4':C0.sky,C0.line,1.5);
  const u=T.fall[k]==null?0:T.fall[k],ty=y0+z(36)+u*(y1-y0-z(46)),cw=area?Math.min(w*.85,z(18)+Math.sqrt(area)*w*1.3):0;
  if(cw){P.fillStyle=C0.silk;P.beginPath();P.arc(x,ty-z(16),cw/2,Math.PI,0);P.closePath();P.fill();P.strokeStyle=C0.ink;P.lineWidth=1;P.beginPath();P.moveTo(x-cw/2,ty-z(16));P.lineTo(x,ty-z(4));P.lineTo(x+cw/2,ty-z(16));P.stroke()}
  P.fillStyle=C0.toy;P.fillRect(x-z(7),ty-z(4),z(14),z(12));
  word(k,x,y1+z(14),12,C0.ink);word(T.dropped.includes(k)?t.toFixed(2)+' s':'?',x,y1+z(32),13,T.dropped.includes(k)?C0.ok:C0.grey)})}
function drop(k){A.sound.tick();if(!T.dropped.includes(k))T.dropped.push(k);T.fall[k]=0;const t=CHUTES.find(x=>x[0]===k)[2];A.tween(T.fall,{[k]:1},Math.round(300+t*500),'io');
 const order=CHUTES.filter(([q])=>T.dropped.includes(q));nice(k==='none'?'No canopy: 0.64 s. Only the small toy pushes on the air.':`${k} canopy: ${t.toFixed(2)} s. ${k==='large'?'The biggest canopy is the slowest.':''}`);
 if(order.length===4)T.msg='Bigger canopy, slower fall: 0.64 s, 0.76 s, 1.09 s, 1.58 s.';sync()}
/* 3: speed and air resistance */
function drawSpeed(){const fin=SPEEDS.every(v=>T.speeds.includes(v))&&T.tucked;top(fin?'Faster means more air resistance: twice the speed gives about 4 times the push. Tucking down makes it smaller.':'Try every speed. Then tuck down at 40 km/h.',fin);
 const y=A.H*.36,x=A.W*.6,F=(T.tuck?TUCK:DRAG)(T.v);P.fillStyle=C0.road;P.fillRect(16,y+z(26),A.W-32,z(6));
 P.strokeStyle=C0.ink;P.lineWidth=3;[x-z(26),x+z(26)].forEach(wx=>{P.beginPath();P.arc(wx,y+z(12),z(14),0,7);P.stroke()});P.beginPath();P.moveTo(x-z(26),y+z(12));P.lineTo(x,y-z(4));P.lineTo(x+z(26),y+z(12));P.stroke();
 P.fillStyle=C0.line;P.beginPath();if(T.tuck){P.ellipse(x+z(4),y-z(14),z(22),z(9),-.2,0,7)}else{P.ellipse(x-z(4),y-z(26),z(9),z(22),.15,0,7)}P.fill();
 arrow(x+z(42),y-z(18),'right',z(44),C0.move,`${T.v} km/h`);const L=Math.max(z(10),Math.min(x-z(50),F*(A.W*.016)));arrow(x-z(30),y-z(10),'left',L,C0.push,'');
 word(`Air resistance ≈ ${F.toFixed(1)} N`,A.W/2,y+z(50),15,C0.push);
 T.spR=choices(SPEEDS,A.H*.54,v=>v===T.v?'ok':'',v=>v+' km/h');T.poseR=choices(['Sit up','Tuck down'],A.H*.54+z(50),(v,i)=>(i===1)===T.tuck?'ok':'')}
function setSpeed(v){A.sound.tick();T.v=v;if(!T.speeds.includes(v))T.speeds.push(v);if(T.tuck&&v===40)T.tucked=true;const F=(T.tuck?TUCK:DRAG)(v);
 nice(v===20&&!T.tuck?'20 km/h: about 7.4 N, 4 times the 1.9 N at 10 km/h.':`${v} km/h: about ${F.toFixed(1)} N of air resistance.`);sync()}
function setPose(t){A.sound.tick();T.tuck=t;if(t&&T.v===40)T.tucked=true;const F=(t?TUCK:DRAG)(T.v);
 nice(t?`Tucked: about ${F.toFixed(1)} N. A smaller front area pushes less air.`:`Sitting up: about ${F.toFixed(1)} N.`);if(t&&T.v!==40){T.msg+=' Now try 40 km/h.'}sync()}
/* 4: air or water */
function drawTube(){const fin=TUBES.every(([k])=>T.tubes.includes(k));top(fin?'Water is much thicker than air, so it pushes back far harder. The same marble takes almost twice as long.':'The same marble falls 30 cm. Tap a tube to drop it.',fin);
 const y0=A.H*.22,y1=A.H*.7,w=Math.min(z(110),(A.W-60)/2);T.tubeR=[];
 TUBES.forEach(([k,t],i)=>{const x=A.W/2+(i?1:-1)*(w/2+z(14)),r={x:x-w/2,y:y0,w,h:y1-y0};T.tubeR.push(r);P.fillStyle=k==='water'?C0.sea:C0.white;P.fillRect(r.x,r.y,r.w,r.h);P.strokeStyle=C0.line;P.lineWidth=2;P.strokeRect(r.x,r.y,r.w,r.h);
  const u=T.sink[k]||0;P.fillStyle=C0.ink;P.beginPath();P.arc(x,y0+z(14)+u*(r.h-z(28)),z(9),0,7);P.fill();word(k,x,y1+z(14),13);word(T.tubes.includes(k)?t.toFixed(2)+' s':'?',x,y1+z(34),14,T.tubes.includes(k)?C0.ok:C0.grey)})}
function sink(k){A.sound.tick();if(!T.tubes.includes(k))T.tubes.push(k);T.sink[k]=0;const t=TUBES.find(x=>x[0]===k)[1];A.tween(T.sink,{[k]:1},Math.round(t*2200),k==='air'?'io':'out');
 nice(k==='air'?'Air: about 0.25 s. Air barely slows a heavy marble.':'Water: about 0.46 s. Water resistance slows it a lot.');if(TUBES.every(([q])=>T.tubes.includes(q)))T.msg='0.25 s in air, 0.46 s in water.';sync()}
/* 5: brakes */
function drawBrake(){const fin=PADS.every(([k])=>T.pads.includes(k));top(fin?'Brakes work by friction between pad and rim. Less grip means less friction, so the bike rolls further before it stops.':'Riding at 15 km/h. Choose a brake pad and rim, and brake.',fin);
 const y=A.H*.34,x0=z(30),x1=A.W-z(20),scale=(x1-x0)/10;P.fillStyle=C0.road;P.fillRect(16,y+z(16),A.W-32,z(5));
 for(let m=0;m<=10;m+=2){const x=x0+m*scale;P.fillStyle=C0.grey;P.fillRect(x-1,y+z(22),2,z(8));word(m+' m',x,y+z(38),11,C0.grey)}
 T.pads.forEach(k=>{const d=PADS.find(p=>p[0]===k)[2];P.fillStyle=k===T.pad?C0.push:C0.grey;P.fillRect(x0+d*scale-1.5,y-z(30),3,z(46))});
 const bx=x0+(T.roll||0)*scale;P.strokeStyle=C0.ink;P.lineWidth=3;[bx-z(18),bx+z(18)].forEach(wx=>{P.beginPath();P.arc(wx,y+z(4),z(11),0,7);P.stroke()});P.beginPath();P.moveTo(bx-z(18),y+z(4));P.lineTo(bx,y-z(10));P.lineTo(bx+z(18),y+z(4));P.stroke();
 if(T.pad){const d=PADS.find(p=>p[0]===T.pad)[2];word(`Stops after about ${d.toFixed(1)} m`,A.W/2,y+z(62),15,C0.push)}
 const half=Math.ceil(PADS.length/2);T.padR=[];[PADS.slice(0,half),PADS.slice(half)].forEach((row,j)=>{choices(row,A.H*.54+j*z(48),p=>T.pads.includes(p[0])?'ok':'',p=>p[0]).forEach((r,i)=>T.padR.push([row[i][0],r]))})}
function brake(k){A.sound.tick();T.pad=k;if(!T.pads.includes(k))T.pads.push(k);const d=PADS.find(p=>p[0]===k)[2];T.roll=0;A.tween(T,{roll:d},Math.round(400+d*120),'out');
 nice(k==='Rubber, dry rim'?'Dry rubber grips best: about 1.5 m.':k==='Oil on rim'?'Oil makes the rim slippery: about 8.9 m, six times as far.':`${k}: about ${d.toFixed(1)} m.`);if(PADS.every(([q])=>T.pads.includes(q)))T.msg='1.5 m, 3.0 m, 4.4 m, 8.9 m: more grip, shorter stop.';sync()}
/* pointer */
function down(p){const m=which();let i;
 if(m==='dir'&&T.dirR){i=T.dirR.findIndex(r=>inside(p,r));if(i>=0){pickDir(DIRS[i]);return true}}
 if(m==='chute'&&T.chuteR){i=T.chuteR.findIndex(r=>inside(p,r));if(i>=0){drop(CHUTES[i][0]);return true}}
 if(m==='speed'){i=(T.spR||[]).findIndex(r=>inside(p,r));if(i>=0){setSpeed(SPEEDS[i]);return true}i=(T.poseR||[]).findIndex(r=>inside(p,r));if(i>=0){setPose(i===1);return true}}
 if(m==='tube'&&T.tubeR){i=T.tubeR.findIndex(r=>inside(p,r));if(i>=0){sink(TUBES[i][0]);return true}}
 if(m==='brake'&&T.padR){const h=T.padR.find(([,r])=>inside(p,r));if(h){brake(h[0]);return true}}return false}
function draw(){P.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);P.fillRect(0,0,A.W,A.H);if(A.col.dark){P.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);P.fill()}
 const m=which();if(m==='dir')drawDir();if(m==='chute')drawChute();if(m==='speed')drawSpeed();if(m==='tube')drawTube();if(m==='brake')drawBrake();
 if(m==='chal'){top('Resisting forces push against motion. More area, more speed, a thicker fluid or a rougher grip make them bigger.');T.v=30;T.tuck=false;const y=A.H*.45;arrow(A.W/2+z(10),y,'right',z(70),C0.move,'moving');arrow(A.W/2-z(10),y,'left',z(70),C0.push,'')}
 bottom();A.fx.draw(P)}
function sync(){const m=which();let s='Challenge.';
 if(m==='dir')s=T.si<SCENES.length?`${SCENES[T.si].who} moving ${SCENES[T.si].goes}.`+(T.pick?` You chose ${T.pick}.`:''):'All 4 forces placed.';
 if(m==='chute')s=`Canopies dropped: ${CHUTES.filter(([k])=>T.dropped.includes(k)).map(([k,,t])=>k+' '+t+' s').join(', ')||'none yet'}.`;
 if(m==='speed')s=`${T.v} km/h, ${T.tuck?'tucked':'sitting up'}: air resistance about ${(T.tuck?TUCK:DRAG)(T.v).toFixed(1)} N. Speeds tried: ${T.speeds.join(', ')||'none'}.`;
 if(m==='tube')s=`Tubes tried: ${TUBES.filter(([k])=>T.tubes.includes(k)).map(([k,t])=>k+' '+t+' s').join(', ')||'none yet'}.`;
 if(m==='brake')s=`Brakes tried: ${PADS.filter(([k])=>T.pads.includes(k)).map(([k,,d])=>k+' '+d.toFixed(1)+' m').join(', ')||'none yet'}.`;
 tell((T.msg?T.msg+' ':'')+s);pads();T.hook()}
function pads(){if(!ctl)return;ctl.innerHTML='';const m=which(),b=(t,fn,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t).onclick=fn};
 if(m==='dir'&&T.si<SCENES.length)DIRS.forEach(d=>b(ARROW[d]+' '+d,()=>pickDir(d),'Force points '+d));
 if(m==='chute')CHUTES.forEach(([k])=>b(k==='none'?'No canopy':k+' canopy',()=>drop(k),'Drop with '+(k==='none'?'no':k)+' canopy'));
 if(m==='speed'){SPEEDS.forEach(v=>b(v+' km/h',()=>setSpeed(v)));b('Sit up',()=>setPose(false));b('Tuck down',()=>setPose(true))}
 if(m==='tube')TUBES.forEach(([k])=>b('Drop in '+k,()=>sink(k)));
 if(m==='brake')PADS.forEach(([k])=>b(k,()=>brake(k),'Brake with '+k));
 A.redraw()}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&!(steps[i].predict&&A.pred[i]==null))A.done(msg+A.reveal(i))};
const replay=(fs,gap)=>{const id=++T.run;fs.forEach((fn,j)=>setTimeout(()=>{if(id===T.run)fn()},(j+1)*(A.reduced()?30:gap)))};
const clean=()=>{T.run=(T.run||0)+1;Object.assign(T,{hook:()=>{},si:0,pick:null,dropped:[],fall:{},v:10,tuck:false,speeds:[],tucked:false,tubes:[],sink:{},pads:[],pad:null,roll:0,msg:'',bad:false})};
const steps=[
{h:'Against the motion',p:'Air resistance, water resistance and friction are forces that slow things down. Which way do they push?',
predict:{q:'A skydiver falls down. Which way does air resistance push on her?',opts:['Up','Down','Sideways'],ans:0},
task:'Place the force for all 4 movers',show:()=>{steps[0].go();replay(SCENES.map(s=>()=>pickDir(s.ans)),800)},go:()=>{clean();sync();T.hook=ready(0,()=>T.si>=SCENES.length,'Always against the motion.')}},
{h:'Parachutes',p:'A canopy catches the air. Air resistance pushes up on it while the toy falls.',
predict:{q:'The same toy gets a bigger parachute. It lands…',opts:['Later','Sooner, it is heavier now','At the same time'],ans:0},
task:'Drop the toy with all 4 canopies',show:()=>{steps[1].go();replay(CHUTES.map(([k])=>()=>drop(k)),500)},go:()=>{clean();sync();T.hook=ready(1,()=>CHUTES.every(([k])=>T.dropped.includes(k)),'Bigger canopy, slower fall.')}},
{h:'Faster and faster',p:'A cyclist pushes through air all the time. Watch the red arrow as the speed goes up.',
predict:{q:'The cyclist goes twice as fast. The air resistance on her…',opts:['Gets bigger','Stays the same','Gets smaller'],ans:0},
task:'Try 4 speeds, then tuck at 40',show:()=>{steps[2].go();replay([()=>setSpeed(10),()=>setSpeed(20),()=>setSpeed(30),()=>setSpeed(40),()=>setPose(true)],420)},go:()=>{clean();sync();T.hook=ready(2,()=>SPEEDS.every(v=>T.speeds.includes(v))&&T.tucked,'More speed, more push.')}},
{h:'Air or water?',p:'Water resistance is like air resistance, but in water. Drop the same marble in each tube.',
task:'Drop the marble in both tubes',show:()=>{steps[3].go();replay(TUBES.map(([k])=>()=>sink(k)),700)},go:()=>{clean();sync();T.hook=ready(3,()=>TUBES.every(([k])=>T.tubes.includes(k)),'Water pushes back harder.')}},
{h:'Brakes and grip',p:'Bike brakes squeeze a pad onto the wheel rim. Friction between them slows the wheel.',
predict:{q:'Rain makes the rim wet. The bike stops…',opts:['Further away','Sooner','In the same place'],ans:0},
task:'Test all 4 brakes',show:()=>{steps[4].go();replay(PADS.map(([k])=>()=>brake(k)),550)},go:()=>{clean();sync();T.hook=ready(4,()=>PADS.every(([k])=>T.pads.includes(k)),'More grip, shorter stop.')}},
{h:'Challenge',p:'',go:()=>{clean();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>T.hook()});
const Q=[['A car drives forwards. Which way does air resistance push on it?','Backwards',[['Forwards','withMotion'],['Down onto the road','gravityMix']]],
['Two parachutes carry the same toy. Which one falls more slowly?','The one with the bigger canopy',[['The one with the smaller canopy','smallFast'],['Both fall at the same speed','sameSpeed']]],
['Why is it harder to walk through a swimming pool than along the path beside it?','Water pushes back much harder than air',[['Water pulls you down more','sinkIdea'],['There is no friction in water','noForce']]],
['A cyclist speeds up from 10 km/h to 20 km/h. What happens to the air resistance?','It gets bigger',[['It stays the same','fixedForce'],['It gets smaller','lessAtSpeed']]],
['Why do bike brake pads use rubber?','Rubber grips the rim, giving lots of friction',[['Rubber is soft so it stops the noise','wrongJob'],['Rubber makes the wheel lighter','massIdea']]],
['Which is true about friction?','It can be useful, like the grip of your shoes',[['It only ever slows things down, so it is always bad','alwaysBad'],['It only happens on rough surfaces','roughOnly']]]];
function why(tag){let m='Find the way the object moves. Resisting forces act along that line, pushing the opposite way.';
 if(tag==='withMotion')m='Air resistance never helps the motion. The car moves forwards, so the air pushes backwards on it.';
 if(tag==='gravityMix')m='Down onto the road is gravity (weight). Air resistance acts against the motion: backwards.';
 if(tag==='smallFast')m='A small canopy pushes on less air. The bigger canopy has more air resistance, so it falls more slowly.';
 if(tag==='sameSpeed')m='Same toy, different canopies: 0.76 s for small but 1.58 s for large. Area changes air resistance.';
 if(tag==='sinkIdea')m='The pull down (your weight) is the same. Water is much thicker than air, so it pushes back much harder as you move.';
 if(tag==='noForce')m='Water does resist motion. That push is called water resistance, and it is far bigger than air resistance at the same speed.';
 if(tag==='fixedForce')m='Air resistance depends on speed. At 20 km/h it is about 4 times what it was at 10 km/h.';
 if(tag==='lessAtSpeed')m='Moving faster means hitting more air each second, harder. The push gets bigger, not smaller.';
 if(tag==='wrongJob')m='The pads are there to slow the wheel. Rubber gives a strong friction grip on the rim.';
 if(tag==='massIdea')m='The pads do not change the wheel\'s mass. They press on the rim and friction slows it.';
 if(tag==='alwaysBad')m='Without friction your shoes would slip and brakes would fail. Friction is often useful.';
 if(tag==='roughOnly')m='Smooth surfaces have friction too, just less. Even ice has a little.';
 return m}
function quiz(){n++;const [qq,ans,bad]=Q[n%Q.length],all=[[ans,'ok']].concat(bad),r=n%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>score(tag,ans)});tell('Challenge: '+qq);A.redraw()}
function score(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;ctl.hidden=B.step===5;pads()},
 init:B=>{A=B;P=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Resisting forces lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
