/* Flagship: estimating volume (ages 9–10). Build two blocks from 1 cm cubes and compare; fill a box one layer at a time;
   sort everyday objects against benchmark volumes; round the edges of a box to estimate; fill a 10 cm box and pour it
   into a litre jug; then a challenge. Words, objects and sums are in estvol_art.js. */
(()=>{
const E=ESTV;
VIS.reg('flagestvol',c=>{let A,g,ctl,chal,qn=-1,tok=0,hold=null;const st={};
const pal=()=>{const t=A.col;return{ink:t.tx,soft:t.mu,bg:t.pn,dk:t.dark,on:'#0f172a',face:'#7dd3fc',top:'#bae6fd',side:'#38bdf8',faceB:'#fcd34d',topB:'#fde68a',sideB:'#f59e0b',wire:t.dark?'#94a3b8':'#475569',water:'#60a5fa',band:t.dark?'#1e3a8a':'#dbeafe',good:'#166534',bad:'#9f1239',hi:'#db2777'}};
const px=n=>A.narrow?n:Math.round(n*1.12);
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function word(t,x,y,n,col,w,al){g.font=`${w||700} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(String(t),x,y,A.W-10)}
function lines(t,max,n){g.font=`700 ${px(n)}px system-ui,sans-serif`;const out=[];let cur='';String(t).split(' ').forEach(w=>{const tryL=cur?cur+' '+w:w;if(cur&&g.measureText(tryL).width>max){out.push(cur);cur=w}else cur=tryL});out.push(cur);return out}
function box(x,y,w,h,fill,edge,r){A.paint.rrect(x,y,w,h,r==null?8:r);g.fillStyle=fill;g.fill();if(edge){g.lineWidth=2;g.strokeStyle=edge;g.stroke()}}
function banner(t){const k=pal(),L=lines(t,A.W-34,13),lh=px(17),h=L.length*lh+12;box(8,6,A.W-16,h,k.band);L.forEach((r,i)=>word(r,A.W/2,12+lh*(i+.5),13,k.dk?'#f8fafc':k.on));return 6+h+px(8)}
function status(){if(!st.msg)return;const k=pal(),L=lines((st.bad?'✗ ':'✓ ')+st.msg,A.W-38,12),lh=px(16),h=L.length*lh+10,y=A.H-h-6;box(8,y,A.W-16,h,'#ffffff',st.bad?k.bad:k.good);L.forEach((r,i)=>word(r,A.W/2,y+5+lh*(i+.5),12,st.bad?k.bad:k.on))}
const oops=t=>{st.bad=true;st.msg=t;A.sound.miss();speak(t);A.redraw()};
const yes=t=>{st.bad=false;st.msg=t;A.sound.pop();speak(t);A.redraw();st.check()};
const tell=t=>{st.bad=false;st.msg=t;speak(t);A.redraw()};
/* one cube in an oblique view: front square, top and right faces. s = edge in px; depth goes up and right */
function cube(x,y,s,f,t,r,edge){const d=s*.45;g.lineWidth=1.2;g.strokeStyle=edge;
 g.fillStyle=t;g.beginPath();g.moveTo(x,y);g.lineTo(x+d,y-d);g.lineTo(x+s+d,y-d);g.lineTo(x+s,y);g.closePath();g.fill();g.stroke();
 g.fillStyle=r;g.beginPath();g.moveTo(x+s,y);g.lineTo(x+s+d,y-d);g.lineTo(x+s+d,y+s-d);g.lineTo(x+s,y+s);g.closePath();g.fill();g.stroke();
 g.fillStyle=f;g.fillRect(x,y,s,s);g.strokeRect(x,y,s,s)}
/* cuboid of L × W × H cubes, of which the first n are placed (row along L, then across W, then up H). x,y = front bottom left */
function stack(x,y,L,W,H,n,s,blue){const k=pal(),d=s*.45;
 for(let w=W-1;w>=0;w--)for(let h=0;h<H;h++)for(let l=0;l<L;l++){const i=h*L*W+w*L+l;if(i>=n)continue;
  cube(x+l*s+w*d,y-(h+1)*s-w*d,s,blue?k.face:k.faceB,blue?k.top:k.topB,blue?k.side:k.sideB,k.on)}
 return{x,y:y-H*s-W*d,w:L*s+W*d,h:H*s+W*d}}
function outline(x,y,L,W,H,s){const k=pal(),d=s*.45,X=L*s,Y=H*s,D=W*d;g.setLineDash([5,4]);g.lineWidth=1.6;g.strokeStyle=k.wire;
 g.strokeRect(x,y-Y,X,Y);g.beginPath();g.moveTo(x,y-Y);g.lineTo(x+D,y-Y-D);g.lineTo(x+X+D,y-Y-D);g.lineTo(x+X,y-Y);g.moveTo(x+X+D,y-Y-D);g.lineTo(x+X+D,y-D);g.lineTo(x+X,y);g.stroke();g.setLineDash([])}
/* step 1: two blocks */
const BLK=[[3,2,2],[6,2,1]];
function drawBlocks(top){const k=pal(),s=Math.min(px(24),(A.W-px(52))/10.8),base=top+px(150);st.hits=[];
 const xa=px(14),xb=xa+3.9*s+px(24);[[xa,0],[xb,1]].forEach(([x,b])=>{const [L,W,H]=BLK[b];outline(x,base,L,W,H,s);const r=stack(x,base,L,W,H,st.n[b],s,!b);st.hits.push({x:x-6,y:base-H*s-W*s*.45-10,w:L*s+W*s*.45+12,h:H*s+W*s*.45+20,b});
  word(`${b?'B':'A'}: ${L} × ${W} × ${H}`,x,base+px(16),12,k.ink,800,'left');word(`${st.n[b]} cubes = ${st.n[b]} cm³`,x,base+px(34),12,k.ink,800,'left')})}
function addRow(b){const [L,W,H]=BLK[b],full=L*W*H;if(st.n[b]>=full){oops(`Block ${b?'B':'A'} is already full: ${full} cubes. Fill the other block.`);return}
 st.n[b]+=L;A.sound.tick();if(st.n[0]===12&&st.n[1]===12){yes('A: 3 × 2 × 2 = 12 cubes. B: 6 × 2 × 1 = 12 cubes. Different shapes, the same volume: 12 cm³.');return}
 tell(`Block ${b?'B':'A'} has ${st.n[b]} cubes so far.`)}
/* step 2: fill a box by layers */
function drawLayers(top){const k=pal(),s=Math.min(px(30),(A.W-70)/7),x=(A.W-(5*s+4*s*.45))/2,base=top+px(170);outline(x,base,5,4,3,s);stack(x,base,5,4,3,st.n,s,true);
 st.hits=[{x:0,y:top,w:A.W,h:base-top+10}];const lay=Math.floor(st.n/20),rows=Math.floor(st.n%20/5);
 word(`5 cm long · 4 cm wide · 3 cm tall`,A.W/2,base+px(18),12,k.ink,800);word(`${st.n} cubes${lay?` · ${lay} full layer${lay>1?'s':''}`:''}${rows?` · ${rows} row${rows>1?'s':''} of 5`:''}`,A.W/2,base+px(38),13,k.ink,900)}
function fillRow(){if(st.n>=60){oops('The box is full. It is only 3 cm tall, so 3 layers fill it.');return}if(st.n>=20&&st.n%20===0){oops('You know one layer is 20 cubes now. Stack a whole layer instead of filling rows again.');return}
 st.n+=5;A.sound.tick();if(st.n===20)tell('4 rows of 5: one layer is 20 cubes. Now stack layers.');else tell(`${st.n} cubes in the bottom layer.`)}
function addLayer(){let m='';if(st.n<20)m='Finish the bottom layer first, so you know how many cubes are in one layer.';else if(st.n>=60)m='The box is full. It is only 3 cm tall, so it takes 3 layers.';if(m){oops(m);return}
 st.n+=20;A.sound.tick();if(st.n===60)yes('One layer is 5 × 4 = 20 cubes, and 3 layers make 60. The volume is 60 cm³.');else tell(`${st.n/20} layers: ${st.n} cubes.`)}
/* step 3: benchmarks */
function drawBench(top){const k=pal(),it=E.BENCH[st.q];st.hits=[];
 if(it){const r=Math.min(px(60),A.W*.16)*it[3]+px(10),cx0=A.W/2,cy=top+px(50);thing(st.q,cx0,cy,r);word(it[0],cx0,cy+r+px(16),15,k.ink,900)}
 else word('All sorted',A.W/2,top+px(50),15,k.ink,900);
 const by=top+px(118),bw=(A.W-30)/2,bh=px(46);E.BINS.forEach((b,i)=>{const x=10+(i%2)*(bw+10),y=by+Math.floor(i/2)*(bh+8);box(x,y,bw,bh,k.dk?'#334155':'#f1f5f9',k.wire);word(b,x+bw/2,y+px(14),12,k.dk?'#f8fafc':k.on,900);
  word((st.put[i]||[]).join(', '),x+bw/2,y+px(32),10,k.dk?'#e2e8f0':'#334155',700);st.hits.push({x,y,w:bw,h:bh,i})})}
function place(i){const it=E.BENCH[st.q];if(!it)return;if(i!==it[1]){oops(`Not ${E.BINS[i]}. ${it[2]}`);return}
 (st.put[i]=st.put[i]||[]).push(it[0].replace(/^an? /,''));st.q++;A.sound.tick();if(st.q===E.BENCH.length){yes('All eight sorted. A centimetre cube, a matchbox and a litre carton are good measuring sticks for volume.');return}tell(`Yes: ${it[2]}`);tools()}
/* simple pictures of the eight objects, drawn to a rough relative size r */
function thing(i,x,y,r){const k=pal();g.lineWidth=1.5;g.strokeStyle=k.on;
 if(i<2||i===6){cube(x-r*.7,y-r*.4,r*1.2,i===6?'#fca5a5':'#fde68a',i===6?'#fecaca':'#fef3c7',i===6?'#f87171':'#f59e0b',k.on);if(i===1){g.fillStyle=k.on;[[.3,.3],[.6,.6],[.9,.9]].forEach(([a,b])=>{g.beginPath();g.arc(x-r*.7+r*1.2*a*.9+r*.06,y-r*.4+r*1.2*b*.9+r*.06,r*.09,0,7);g.fill()})}return}
 if(i===2){box(x-r,y-r*.45,r*2,r*.9,'#fcd34d',k.on,4);g.fillStyle='#9f1239';g.fillRect(x-r*.9,y-r*.35,r*.25,r*.7);return}
 if(i===3){g.fillStyle='#fef3c7';g.beginPath();g.ellipse(x,y,r*.7,r,0,0,7);g.fill();g.stroke();return}
 if(i===4){box(x-r*.7,y-r*.8,r*1.4,r*1.6,'#c4b5fd',k.on,6);g.beginPath();g.arc(x+r*.75,y,r*.4,-1.4,1.4);g.lineWidth=4;g.strokeStyle='#7c3aed';g.stroke();return}
 g.fillStyle=i===5?'#86efac':'#f8fafc';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.stroke();if(i===7){g.fillStyle=k.on;g.beginPath();g.arc(x,y,r*.3,0,7);g.fill()}else{g.strokeStyle='#166534';g.lineWidth=3;g.beginPath();g.moveTo(x,y-r);g.lineTo(x+r*.2,y-r*1.3);g.stroke()}}
/* step 4: rounding */
function drawRound(top){const k=pal(),y=top+px(70),w=Math.min(A.W*.5,px(190)),h=px(60),x=(A.W-w)/2-px(14);
 g.fillStyle=k.faceB;g.fillRect(x,y,w,h);g.fillStyle=k.topB;g.beginPath();g.moveTo(x,y);g.lineTo(x+px(28),y-px(28));g.lineTo(x+w+px(28),y-px(28));g.lineTo(x+w,y);g.fill();
 g.fillStyle=k.sideB;g.beginPath();g.moveTo(x+w,y);g.lineTo(x+w+px(28),y-px(28));g.lineTo(x+w+px(28),y+h-px(28));g.lineTo(x+w,y+h);g.fill();g.strokeStyle=k.on;g.lineWidth=1.5;g.strokeRect(x,y,w,h);
 word('OAT BAR',x+w/2,y+h/2,14,k.on,900);const v=st.pick;word(`${v[0]!=null?v[0]:'9.8'} cm`,x+w/2,y+h+px(14),13,k.ink,900);word(`${v[1]!=null?v[1]:'5.1'} cm`,x+w+px(30),y-px(28)-px(10),13,k.ink,900,'right');word(`${v[2]!=null?v[2]:'4.2'} cm`,x+w+px(34),y+h/2-px(10),13,k.ink,900,'left');
 st.hits=[{x,y:y-px(30),w:w+px(30),h:h+px(30)}];const q=E.ROUND[st.q];word(q?`Round ${q[0]}: about ?`:'',A.W/2,y+h+px(44),14,k.ink,900);
 if(st.q===3)word('One layer: 10 × 5. How many layers?',A.W/2,y+h+px(66),12,k.ink,800);if(st.q>3)word('10 × 5 = 50 a layer · 4 layers · about 200 cm³',A.W/2,y+h+px(66),13,k.ink,900)}
function pickR(v){const q=E.ROUND[st.q];if(!q)return;if(v!==q[1]){oops(q[3][v]||`Not ${v}. Round to the nearest whole number.`);return}if(st.q<3)st.pick[st.q]=v;st.q++;A.sound.tick();tools();
 if(st.q===4){yes('About 10 × 5 × 4 = 200 cm³. The exact answer is 209.9 cm³, so the estimate is close and quick.');return}tell(st.q===3?'10 cm, 5 cm and 4 cm. Now estimate the volume.':`${q[0]} is about ${v} cm.`)}
/* step 5: litre */
function drawLitre(top){const k=pal(),s=Math.min(px(11),(A.W*.55)/14.5),base=top+px(190),x=px(16);outline(x,base,10,10,10,s);
 const lay=st.poured?0:st.lay;for(let h=0;h<lay;h++){g.fillStyle=k.water;g.globalAlpha=.85;g.fillRect(x,base-(h+1)*s,10*s,s);g.globalAlpha=1;g.strokeStyle='#1e3a8a';g.lineWidth=.8;g.strokeRect(x,base-(h+1)*s,10*s,s)}
 word(`${st.poured?0:lay*100} cm³`,x+5*s,base+px(16),13,k.ink,900);word('10 cm box',x+5*s,base+px(34),11,k.soft,700);
 const jx=A.W-px(96),jw=px(64),jh=px(130),jy=base-jh;g.strokeStyle=k.wire;g.lineWidth=2.5;g.strokeRect(jx,jy,jw,jh);
 if(st.poured){g.fillStyle=k.water;g.fillRect(jx+2,jy+jh*.2,jw-4,jh*.8-2)}g.strokeStyle=k.hi;g.lineWidth=2;g.beginPath();g.moveTo(jx-4,jy+jh*.2);g.lineTo(jx+jw+4,jy+jh*.2);g.stroke();
 word('1 litre',jx+jw/2,jy+jh*.2-px(12),12,k.ink,900);word('jug',jx+jw/2,base+px(16),12,k.ink,800);st.hits=[{x:0,y:top,w:A.W*.62,h:base-top+10,k:'box'},{x:jx-10,y:jy-20,w:jw+20,h:jh+30,k:'jug'}]}
function layer(){if(st.poured)return;if(st.lay>=10){oops('The box is full: 10 layers. Pour it into the jug now.');return}st.lay++;A.sound.tick();tell(`${st.lay} layer${st.lay>1?'s':''} of 10 × 10 = ${st.lay*100} cm³.`)}
function pour(){if(st.poured)return;let m='';if(!st.lay)m='The box is empty. Fill it with layers of 100 cm³ first.';else if(st.lay<10)m=`The box is not full yet: ${st.lay*100} cm³. A litre needs all 10 layers.`;if(m){oops(m);return}st.poured=1;A.sound.tick();yes('1,000 cm³ of water fills the jug exactly to the 1 litre line. 1 cm³ holds 1 ml.')}
const part=()=>['blocks','layers','bench','round','litre','quiz'][A.step];
function draw(a){g=a.ctx;const k=pal(),w=part();g.fillStyle=k.bg;g.fillRect(0,0,A.W,A.H);
 if(w==='quiz'){word('Estimating volume',A.W/2,A.H*.34,16,k.ink,900);word('cubes · layers · benchmarks · litres',A.W/2,A.H*.5,13,k.soft,700);A.fx.draw(g);return}
 const top=banner(st.title||'');({blocks:drawBlocks,layers:drawLayers,bench:drawBench,round:drawRound,litre:drawLitre})[w](top);status();A.fx.draw(g)}
function reset(o){tok++;hold=null;Object.keys(st).forEach(x=>delete st[x]);Object.assign(st,{msg:'',bad:false,check:()=>{},n:0,q:0,put:{},pick:[],lay:0,poured:0,hits:[]},o||{})}
function auto(i,acts){const me=tok;acts.forEach((f,j)=>setTimeout(()=>{if(me===tok&&A.step===i)f()},A.reduced()?30*(j+1):280*(j+1)))}
const when=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function tools(){if(!ctl)return;ctl.innerHTML='';const w=part(),b=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},ctl,t).onclick=f};
 if(w==='blocks'){b('Add a row to A',()=>addRow(0));b('Add a row to B',()=>addRow(1))}
 if(w==='layers'){b('Fill a row of 5',fillRow);b('Stack a layer',addLayer)}
 if(w==='bench'&&E.BENCH[st.q])E.BINS.forEach((x,i)=>b(x,()=>place(i)));
 if(w==='round'&&E.ROUND[st.q])E.ROUND[st.q][2].forEach(v=>b(st.q===3?v+' cm³':v+' cm',()=>pickR(v)));
 if(w==='litre'){b('Add a layer of 100 cm³',layer);b('Pour into the jug',pour)}}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const w=part();if(w==='quiz')return false;const r=(st.hits||[]).find(r=>inside(p,r));
 if(w==='litre'&&r&&r.k==='box'&&st.lay>=10){hold={from:'box'};return true}
 if(!r)return true;if(w==='blocks')addRow(r.b);else if(w==='layers'){if(st.n<20)fillRow();else addLayer()}else if(w==='bench')place(r.i);else if(w==='litre'){if(r.k==='box')layer();else pour()}return true}
function move(){}
function up(p){const h=hold;hold=null;if(h&&h.from==='box'){const r=(st.hits||[]).find(r=>inside(p,r));if(r&&r.k==='jug')pour()}}
const steps=[
{h:'Count the cubes',p:E.STEPP[0],
 predict:{q:'Block A is 3 × 2 × 2 cubes. Block B is 6 × 2 × 1 cubes. Which has the bigger volume?',opts:['A, it is taller','B, it is longer','Neither: the same'],ans:2},
 task:'Build both blocks from 1 cm cubes',show:()=>auto(0,[0,0,0,0,1,1].map(b=>()=>addRow(b))),
 go:()=>{reset({title:E.TITLE[0],n:[0,0]});speak(E.SAY[0]);tools();st.check=when(0,()=>st.n[0]===12&&st.n[1]===12,E.DONE[0])}},
{h:'Layers',p:E.STEPP[1],
 predict:{q:'How many 1 cm cubes fill a box 5 cm long, 4 cm wide and 3 cm tall?',opts:['12','20','60'],ans:2},
 task:'Fill the box: one layer, then stack',show:()=>auto(1,[fillRow,fillRow,fillRow,fillRow,addLayer,addLayer]),
 go:()=>{reset({title:E.TITLE[1]});speak(E.SAY[1]);tools();st.check=when(1,()=>st.n===60,E.DONE[1])}},
{h:'Benchmarks',p:E.STEPP[2],
 task:'Put each object in the right box',show:()=>auto(2,E.BENCH.map(o=>()=>place(o[1]))),
 go:()=>{reset({title:E.TITLE[2]});speak(E.SAY[2]);tools();st.check=when(2,()=>st.q===E.BENCH.length,E.DONE[2])}},
{h:'Round, then estimate',p:E.STEPP[3],
 task:'Estimate the volume of the box',show:()=>auto(3,[10,5,4,200].map(v=>()=>pickR(v))),
 go:()=>{reset({title:E.TITLE[3]});speak(E.SAY[3]);tools();st.check=when(3,()=>st.q===4,E.DONE[3])}},
{h:'Litres and cm³',p:E.STEPP[4],
 predict:{q:'A box is 10 cm long, 10 cm wide and 10 cm tall. How much water does it hold?',opts:['30 ml','100 ml','1 litre'],ans:2},
 task:'Fill the box and pour it into the jug',show:()=>auto(4,Array(10).fill(layer).concat([pour])),
 go:()=>{reset({title:E.TITLE[4]});speak(E.SAY[4]);tools();st.check=when(4,()=>st.poured===1,E.DONE[4])}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>st.check()});
function ask(){qn++;const [q,opts]=E.QZ[qn%E.QZ.length],sh=qn%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=chal.querySelector('.fl-pick');opts.slice(sh).concat(opts.slice(0,sh)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},r,o).onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;function mark(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct! ${streak} in a row.`:'✗ '+(E.WHY[t]||'Try that lab step again.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.64,tall:1.4,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;tools()},
 init:A=>{g=A.ctx;const hold2=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Volume controls'},hold2);chal=c.el('div',{class:'fl-chal'},A.below);reset({n:[0,0]});
  A.gest({down,move,up});tools()}});
A.start()})})();
