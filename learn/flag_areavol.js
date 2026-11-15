/* Flagship: area and volume scale factors (ages 15–17; GCSE Maths Higher G19: apply the concepts of congruence and
   similarity, including the relationships between lengths, areas and volumes in similar figures). Enlarge a square
   and count k² tiles, a cube and count k³ cubes, a triangle to see k² holds for any shape, fill a jug twice as tall
   with small jugfuls, then work back from an area or volume factor to k. Every drag has a button. */
(()=>{
const KS={square:[1,2,3,4,5],cube:[1,2,3,4],tri:[1,2,3,4],back:[1,1.5,2,2.5,3,3.5,4,4.5,5]};
const BACK=[['volume',64,4],['area',25,5],['area',2.25,1.5]];
VIS.reg('flagareavol',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',MUTE='#475569',LINE='#94a3b8',CARD='#ffffff',PASS='#047857',FAIL='#b91c1c',ACC='#1d4ed8',FILLA='#bfdbfe',TOPF='#dbeafe',LEFTF='#93c5fd',RIGHTF='#60a5fa',GOLD='#b45309',NOTE='#eef2ff',HAPPY='#dcfce7',WATER='#7dd3fc';
const MODE=['square','cube','tri','jug','back','chal'],mode=()=>MODE[A.step];
const g=n=>Math.round(n*(A.narrow?1:1.1)),ft=(n,w)=>`${w||700} ${g(n)}px system-ui,sans-serif`;
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function put(s,x,y,n,col,al){Z.font=ft(n);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-14)}
function brk(s,max,n){Z.font=ft(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function slab(r,fill,edge,lw){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function slabText(r,s,n,col){const L=brk(s,r.w-12,n),lh=g(n)+4;L.forEach((l,i)=>put(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col))}
function title(s,ok){const r={x:10,y:8,w:A.W-20,h:A.H*.11};slab(r,ok?HAPPY:NOTE,ok?PASS:ACC,2);slabText(r,s,13,ok?PASS:INK)}
function status(){if(!S.msg)return;const L=brk((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=g(13)+5,h=L.length*lh+10,y=A.H-h-6;slab({x:10,y,w:A.W-20,h},CARD,S.bad?FAIL:PASS,3);L.forEach((l,i)=>put(l,A.W/2,y+5+lh*(i+.5),13))}
const voice=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const fine=s=>{S.bad=false;S.msg=s;A.sound.pop()};
const nf=x=>String(Math.round(x*100)/100);
/* drawing area left of the facts card; the slider sits under it */
function zone(){return A.narrow?{x:16,y:A.H*.15,w:A.W-32,h:A.H*.34}:{x:A.W*.05,y:A.H*.17,w:A.W*.55,h:A.H*.52}}
function rail(){const z=zone();return{x1:z.x+g(20),x2:z.x+z.w-g(20),y:z.y+z.h+g(46)}}
function rail_draw(){const r=rail(),ks=KS[mode()],n=ks.length;Z.strokeStyle=LINE;Z.lineWidth=6;Z.lineCap='round';Z.beginPath();Z.moveTo(r.x1,r.y);Z.lineTo(r.x2,r.y);Z.stroke();Z.lineCap='butt';
 ks.forEach((k,i)=>{const x=r.x1+i/(n-1)*(r.x2-r.x1);Z.fillStyle=MUTE;Z.fillRect(x-1,r.y+7,2,6);if(Number.isInteger(k))put(k,x,r.y+g(20),10,MUTE)});
 const i=ks.indexOf(S.k),x=r.x1+i/(n-1)*(r.x2-r.x1);Z.fillStyle=GOLD;Z.beginPath();Z.arc(x,r.y,g(13),0,7);Z.fill();Z.strokeStyle=CARD;Z.lineWidth=3;Z.stroke();put('k = '+nf(S.k),x,r.y-g(22),12,INK)}
function facts(lines){let r;if(A.narrow){r={x:A.W*.06,y:rail().y+g(30),w:A.W*.88,h:g(20)*2+10};lines=[lines[0],lines.slice(1).join(' · ')]}else r={x:A.W*.64,y:A.H*.2,w:A.W*.33,h:g(22)*lines.length+12};
 slab(r,'#f8fafc',LINE,2);lines.forEach((t,i)=>put(t,r.x+r.w/2,r.y+6+(r.h-12)/lines.length*(i+.5),12,INK))}
/* step 1: square */
function drawSquare(){const z=zone(),k=S.k,U=Math.min(z.w,z.h)/5.2,x=z.x+(z.w-5*U)/2,y=z.y;title(k===3?'Lengths × 3, area × 3² = 9.':'Drag the knob to enlarge the 1 × 1 square. Count the unit squares.',k===3);
 Z.fillStyle=FILLA;Z.fillRect(x,y,k*U,k*U);Z.strokeStyle=LINE;Z.lineWidth=1;for(let i=1;i<k;i++){Z.beginPath();Z.moveTo(x+i*U,y);Z.lineTo(x+i*U,y+k*U);Z.moveTo(x,y+i*U);Z.lineTo(x+k*U,y+i*U);Z.stroke()}
 Z.strokeStyle=ACC;Z.lineWidth=3;Z.strokeRect(x,y,k*U,k*U);Z.strokeStyle=INK;Z.lineWidth=2;Z.strokeRect(x,y,U,U);put(`${k} cm`,x+k*U/2,y+k*U+g(10),11,MUTE);
 facts([`Side 1 cm → ${k} cm (× ${k})`,`Area 1 cm² → ${k*k} cm²`,`Area factor ${k}² = ${k*k}`])}
/* step 2 and 5: cube in isometric view, unit grid on the three faces */
function cube(P,L,U,col){const c=Math.cos(Math.PI/6)*L,s=.5*L,ex=[c,-s],ey=[-c,-s],ez=[0,-L];const at=(a,b,d)=>[P[0]+a*ex[0]+b*ey[0]+d*ez[0],P[1]+a*ex[1]+b*ey[1]+d*ez[1]];
 const face=(pts,fill)=>{Z.fillStyle=fill;Z.beginPath();pts.forEach((q,i)=>i?Z.lineTo(q[0],q[1]):Z.moveTo(q[0],q[1]));Z.closePath();Z.fill();Z.strokeStyle=INK;Z.lineWidth=2;Z.stroke()};
 face([at(0,0,0),at(1,0,0),at(1,0,1),at(0,0,1)],col?col[2]:RIGHTF);face([at(0,0,0),at(0,1,0),at(0,1,1),at(0,0,1)],col?col[1]:LEFTF);face([at(0,0,1),at(1,0,1),at(1,1,1),at(0,1,1)],col?col[0]:TOPF);
 const n=L/U;Z.strokeStyle='rgba(15,23,42,.45)';Z.lineWidth=1;const seg=(a,b)=>{Z.beginPath();Z.moveTo(a[0],a[1]);Z.lineTo(b[0],b[1]);Z.stroke()};
 for(let j=1;j<n-1e-6;j++){const f=j/n;seg(at(f,0,0),at(f,0,1));seg(at(0,0,f),at(1,0,f));seg(at(0,f,0),at(0,f,1));seg(at(0,0,f),at(0,1,f));seg(at(f,0,1),at(f,1,1));seg(at(0,f,1),at(1,f,1))}}
function drawCube(){const z=zone(),k=S.k,max=mode()==='back'?5:4,U=Math.min(z.h/(2*max),z.w/(1.8*max+1.6)),P=[z.x+z.w*.58,z.y+z.h];
 if(mode()==='cube')title(k===3?'Edges × 3, volume × 3³ = 27 unit cubes.':'Drag the knob to enlarge the unit cube. Count the cubes.',k===3);
 cube(P,k*U,U);cube([z.x+g(14)+U*.9,z.y+z.h],U,U,['#fde68a','#fcd34d','#f59e0b']);put('1 cm³',z.x+g(14)+U*1.9,z.y+z.h-U*.5,10,MUTE,'left')}
/* step 3: triangle tiled by k² copies */
function drawTri(){const z=zone(),k=S.k,U=Math.min(z.w/4.6,z.h/(4*.87)),h=U*.866,x0=z.x+z.w*.55,y0=z.y+z.h;
 title(k===3?'Any shape: lengths × 3 gives 9 copies, so area × 9.':'Drag to enlarge the triangle. How many copies of the small one fit?',k===3);
 const A0=[x0-k*U/2,y0],B0=[x0+k*U/2,y0],C0=[x0,y0-k*h];Z.fillStyle=FILLA;Z.beginPath();Z.moveTo(...A0);Z.lineTo(...B0);Z.lineTo(...C0);Z.closePath();Z.fill();
 Z.strokeStyle=LINE;Z.lineWidth=1;for(let i=1;i<k;i++){const f=i/k;const L1=[A0[0]+(C0[0]-A0[0])*f,A0[1]+(C0[1]-A0[1])*f],R1=[B0[0]+(C0[0]-B0[0])*f,B0[1]+(C0[1]-B0[1])*f];
  Z.beginPath();Z.moveTo(...L1);Z.lineTo(...R1);Z.stroke();const a=[A0[0]+(B0[0]-A0[0])*f,A0[1]];Z.beginPath();Z.moveTo(...a);Z.lineTo(A0[0]+(C0[0]-A0[0])*(1-f)+(B0[0]-A0[0])*f,A0[1]+(C0[1]-A0[1])*(1-f));Z.stroke();
  Z.beginPath();Z.moveTo(...a);Z.lineTo(...L1);Z.stroke()}
 Z.strokeStyle=ACC;Z.lineWidth=3;Z.beginPath();Z.moveTo(...A0);Z.lineTo(...B0);Z.lineTo(...C0);Z.closePath();Z.stroke();
 const sx=z.x+g(10);Z.fillStyle='#fde68a';Z.beginPath();Z.moveTo(sx,y0);Z.lineTo(sx+U,y0);Z.lineTo(sx+U/2,y0-h);Z.closePath();Z.fill();Z.strokeStyle=INK;Z.lineWidth=2;Z.stroke();
 facts([`Sides × ${k}`,`${k*k} small triangles fit`,`Area factor ${k}² = ${k*k}`])}
/* step 4: jugs (similar cylinders), the big one twice as tall and twice as wide */
function jugR(big){const z=zone(),U=Math.min(z.w/5,z.h/2.4);return big?{x:z.x+z.w*.42,y:z.y+z.h-2*U*1.1,w:2*U*.9,h:2*U*1.1}:{x:z.x+g(8),y:z.y+z.h-U*1.1,w:U*.9,h:U*1.1}}
function jug(r,f){Z.fillStyle=CARD;Z.fillRect(r.x,r.y,r.w,r.h);Z.fillStyle=WATER;Z.fillRect(r.x,r.y+r.h*(1-f),r.w,r.h*f);Z.strokeStyle=INK;Z.lineWidth=2.5;Z.beginPath();Z.moveTo(r.x,r.y);Z.lineTo(r.x,r.y+r.h);Z.lineTo(r.x+r.w,r.y+r.h);Z.lineTo(r.x+r.w,r.y);Z.stroke()}
function drawJug(){const n=S.pours,full=n>=8;title(full?'Twice as tall and similar: 2³ = 8 small jugfuls.':'Tap the small jug to pour it into the big one. Count the jugfuls.',full);
 const s=jugR(0),b=jugR(1);jug(s,full?0:1);jug(b,Math.min(1,n/8));for(let i=1;i<8;i++){Z.strokeStyle=LINE;Z.lineWidth=1;Z.beginPath();Z.moveTo(b.x,b.y+b.h*i/8);Z.lineTo(b.x+g(8),b.y+b.h*i/8);Z.stroke()}
 put('small',s.x+s.w/2,s.y+s.h+g(10),11,MUTE);put('big: × 2 in every length',b.x+b.w/2,b.y+b.h+g(10),11,MUTE);
 facts([`Jugfuls poured: ${n}`,n>=2&&n<8?'2 is just the height factor':'Big jug = 2 × 2 × 2',`Volume factor 2³ = 8`])}
function pour(){if(S.pours>=8)return;S.pours++;A.sound.tick();const n=S.pours;
 S.bad=false;if(n===2)S.msg='2 jugfuls reach only a quarter of the way. Twice as tall is not twice the volume: it is also twice as wide and deep.';else if(n===4)S.msg='4 jugfuls (2²) and it is only half full. Volume needs a third factor of 2.';else if(n===8)fine('8 jugfuls: lengths × 2, so volume × 2 × 2 × 2 = 8.');else S.msg=`${n} jugful${n>1?'s':''}.`;refresh()}
/* step 5: work back from a factor */
function drawBack(){const t=BACK[S.i],k=S.k;title(t?`Find k when the ${t[0]} factor is ${nf(t[1])}.`:'Area factor → square root. Volume factor → cube root.',!t);drawCube();
 facts([t?`Target: ${t[0]} × ${nf(t[1])}`:'All three found',`Length factor k = ${nf(k)}`,`Area × ${nf(k*k)} · Volume × ${nf(k*k*k)}`])}
/* shared */
function setK(k){const ks=KS[mode()];if(!ks||!ks.includes(k))return;S.k=k;A.sound.tick();judge()}
function step(d){const ks=KS[mode()],i=ks.indexOf(S.k)+d;if(i>=0&&i<ks.length)setK(ks[i])}
function judge(){const m=mode(),k=S.k;S.bad=false;
 if(m==='square'){S.msg=k===3?'3 cm sides hold 3 rows of 3: 9 unit squares. The length went × 3 but the area went × 9.':k===2?'Sides × 2, area × 4: 2 rows of 2.':''}
 if(m==='cube'){S.msg=k===3?'3 layers of 3 × 3: 27 unit cubes. Edges × 3, volume × 27.':k===2?'Edges × 2: 2 layers of 2 × 2 = 8 cubes, not 2 or 4.':''}
 if(m==='tri'){S.msg=k===3?'9 copies of the small triangle. Area factor k² works for any shape, not just squares.':''}
 if(m==='back'){const t=BACK[S.i];if(t&&k===t[2]){S.i++;S.msg=`k = ${nf(k)}: ${t[0]} × ${nf(t[1])}, because ${nf(k)}${t[0]==='area'?'²':'³'} = ${nf(t[1])}.`;A.sound.pop()}else if(t){const f=t[0]==='area'?k*k:k*k*k;S.msg=f>t[1]?`Too big: ${t[0]} × ${nf(f)}.`:`${t[0]} × ${nf(f)}: still too small.`}}
 refresh()}
function down(p){const m=mode();if(m==='jug'){if(within(p,jugR(0))||within(p,jugR(1))){pour();return true}return false}
 if(!KS[m])return false;const r=rail();if(Math.abs(p.y-r.y)<g(26)&&p.x>r.x1-g(26)&&p.x<r.x2+g(26)){S.drag=true;move(p);return true}return false}
function move(p){if(!S.drag)return;const r=rail(),ks=KS[mode()],i=Math.round((p.x-r.x1)/(r.x2-r.x1)*(ks.length-1)),k=ks[Math.max(0,Math.min(ks.length-1,i))];if(k!==S.k){S.k=k;S.msg='';A.sound.tick();A.redraw()}}
function up(){if(!S.drag)return;S.drag=false;judge()}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();if(m==='square')drawSquare();if(m==='cube'){drawCube();facts([`Edge 1 cm → ${S.k} cm`,`${S.k**3} unit cubes`,`Volume factor ${S.k}³ = ${S.k**3}`])}if(m==='tri')drawTri();if(m==='jug')drawJug();if(m==='back')drawBack();
 if(KS[m])rail_draw();if(m==='chal'){title('Lengths × k → areas × k² → volumes × k³.');S.k=3;drawCube()}status();A.fx.draw(Z)}
function refresh(){const m=mode(),k=S.k;let s='Challenge.';
 if(m==='square')s=`Square with sides ${k} cm: ${k*k} unit squares, area factor ${k*k}.`;
 if(m==='cube')s=`Cube with edges ${k} cm: ${k**3} unit cubes, volume factor ${k**3}.`;
 if(m==='tri')s=`Triangle with sides × ${k}: ${k*k} copies of the small triangle.`;
 if(m==='jug')s=`${S.pours} of 8 small jugfuls poured into the big jug.`;
 if(m==='back'){const t=BACK[S.i];s=`k = ${nf(k)}, area factor ${nf(k*k)}, volume factor ${nf(k**3)}.`+(t?` Target: ${t[0]} factor ${nf(t[1])}.`:' All found.')}
 voice((S.msg?S.msg+' ':'')+s);knobs();S.then()}
function knobs(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(KS[m]&&!(m==='back'&&!BACK[S.i])){b('Smaller k',()=>step(-1),'Make the scale factor smaller');b('Bigger k',()=>step(1),'Make the scale factor bigger')}
 if(m==='jug'&&S.pours<8)b('Pour one jugful',pour);A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const fresh=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},k:1,i:0,pours:0,drag:false,msg:'',bad:false})};
const upTo=t=>{const ks=KS[mode()],fs=[];for(let i=ks.indexOf(S.k)+1;i<=ks.indexOf(t);i++){const k=ks[i];fs.push(()=>setK(k))}return fs};
const steps=[
{h:'Enlarge a square',p:'Enlarge a 1 cm square by scale factor k. Every length is multiplied by k. Watch what happens to the area.',
predict:{q:'Double every side of a square. Its area is multiplied by…',opts:['4','2','8'],ans:0},
task:'Make k = 3 and count the squares',show:()=>{steps[0].go();play(upTo(3),380)},go:()=>{fresh();refresh();S.then=finish(0,()=>S.k===3,'Area × 9.')}},
{h:'Enlarge a cube',p:'Now a 1 cm cube. Each edge is multiplied by k, so the cube grows in three directions at once.',
predict:{q:'Double every edge of a cube. Its volume is multiplied by…',opts:['8','2','4'],ans:0},
task:'Make k = 3 and count the cubes',show:()=>{steps[1].go();play(upTo(3),420)},go:()=>{fresh();refresh();S.then=finish(1,()=>S.k===3,'Volume × 27.')}},
{h:'Any similar shape',p:'Squares are not special. Enlarge a triangle by k and count how many copies of the small one fit inside.',
task:'Make k = 3 and count the copies',show:()=>{steps[2].go();play(upTo(3),420)},go:()=>{fresh();refresh();S.then=finish(2,()=>S.k===3,'Area × k² for any shape.')}},
{h:'Two similar jugs',p:'The big jug is the same shape as the small one but twice as tall. How many small jugfuls fill it?',
task:'Fill the big jug',show:()=>{steps[3].go();play(Array.from({length:8},()=>pour),280)},go:()=>{fresh();refresh();S.then=finish(3,()=>S.pours>=8,'2³ = 8.')}},
{h:'Work backwards',p:'Given an area or volume factor, find k. An area factor is k², so take the square root. A volume factor is k³, so take the cube root.',
predict:{q:'Two similar solids have volumes in the ratio 1 : 27. What is the ratio of their lengths?',opts:['1 : 3','1 : 9','1 : 27'],ans:0},
task:'Find k for 3 factors',show:()=>{steps[4].go();play([...BACK.map(t=>()=>setK(t[2]))],700)},go:()=>{fresh();refresh();S.then=finish(4,()=>S.i>=BACK.length,'Roots undo powers.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['A photo is enlarged by scale factor 3. Its area is multiplied by…','9',[['3','linear'],['6','doubled']]],
['Similar cylinders are 5 cm and 10 cm tall. The small one holds 40 cm³. The big one holds…','320 cm³',[['80 cm³','linear'],['160 cm³','squared']]],
['Similar solids have surface areas 9 cm² and 25 cm². The ratio of their lengths is…','3 : 5',[['9 : 25','noRoot'],['27 : 125','cubedArea']]],
['Similar cones have volumes in the ratio 8 : 125. The ratio of their surface areas is…','4 : 25',[['8 : 125','volAsArea'],['2 : 5','lengthOnly']]],
['A model car is 1/20 of full size. The real car needs how many times as much paint?','400',[['20','linear'],['8000','cubedPaint']]],
['A cube\'s edges are halved. Its volume becomes…','1/8 of the original',[['1/2 of the original','linear'],['1/4 of the original','squared']]]];
function why(tag){let m='Lengths × k, areas × k², volumes × k³.';
 if(tag==='linear')m='That uses k itself. Only lengths scale by k: areas scale by k² and volumes by k³.';
 if(tag==='doubled')m='3 × 2 is not 3². The photo is 3 times as wide and 3 times as tall: 3 × 3 = 9.';
 if(tag==='squared')m='k² is for areas. Volume grows in three directions, so use k³.';
 if(tag==='noRoot')m='9 : 25 is the area ratio. Lengths are the square roots: 3 : 5.';
 if(tag==='cubedArea')m='Cubing is for going from lengths to volumes. From areas to lengths, take square roots.';
 if(tag==='volAsArea')m='8 : 125 is the volume ratio. Cube root gives lengths 2 : 5, then square for areas: 4 : 25.';
 if(tag==='lengthOnly')m='2 : 5 is the length ratio. Areas need it squared: 4 : 25.';
 if(tag==='cubedPaint')m='Paint covers a surface, which is an area: 20² = 400, not 20³.';
 return m}
function ask(){qi++;const [qq,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});voice('Challenge: '+qq);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;knobs()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Scale factor lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
