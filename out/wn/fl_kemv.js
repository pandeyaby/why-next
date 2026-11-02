/* Flagship – kinetic energy depends on mass and speed (ages 12–13): load mass blocks, drag speed, complete a
   speed–energy table and graph, judge pairs of moving objects, crash-test a car at 20–60 mph. */
(()=>{
const ke=(m,v)=>.5*m*v*v;
const PAIRS=[{a:['🏀','Basketball',.6,10],b:['🎳','Bowling ball',6,2],ans:0,m:'Basketball: ½ × 0.6 × 10² = 30 J. Bowling ball: ½ × 6 × 2² = 12 J. Ten times the mass lost to five times the speed.'},
 {a:['🛒','Light trolley',20,2],b:['🛒','Full trolley',80,1],ans:2,m:'Both 40 J. Four times the mass at half the speed: halving speed cuts energy to a quarter, so it evens out.'},
 {a:['🚗','Car',1000,30],b:['🚚','Lorry',10000,10],ans:1,m:'Car: 450 000 J. Lorry: 500 000 J. The lorry wins, but only just: the car is three times faster.'},
 {a:['⚽','Football',.4,30],b:['🏏','Cricket ball',.16,40],ans:0,m:'Football: ½ × 0.4 × 30² = 180 J. Cricket ball: ½ × 0.16 × 40² = 128 J.'}];
const MPH=[20,30,40,60],TILES=[6,8,9,12,16],ROWS=[[1,1],[2,4],[3,9],[4,16]];
VIS.reg('flagkemv',c=>{let A,ctl,chal,qi=-1,tok=0,streak=0;
const fresh=()=>({n:0,goal:1,m:1,v:2,dent:0,pos:0,fill:[],row:2,bad:-1,pi:0,tried:[],crash:-1,grab:null,next:()=>{},quick:0}),S=fresh();
const stage=()=>['mass','speed','table','compare','crash','quiz'][A.step];
const z=v=>Math.round(v*(A.narrow?1:1.1)),fast=()=>A.reduced()||S.quick;
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,mw,px,col,wt){g.font=`${wt||700} ${z(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const L=[];String(t).split(' ').forEach(w=>{const k=L.length-1,t2=k<0?w:L[k]+' '+w;if(k>=0&&g.measureText(t2).width<=mw)L[k]=t2;else L.push(w)});
 L.forEach((s,i)=>g.fillText(s,x,y+(i-(L.length-1)/2)*z(px)*1.25))}
function plate(g,r,tone,lw){const C=A.col,edge={ok:C.gr,no:C.rd,hot:C.am,cool:C.cy,vi:C.vi}[tone]||C.ln;g.save();g.fillStyle=tone?A.mix(C.pn,edge,.16):C.pn;
 A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=lw||(tone?3:1.5);g.strokeStyle=edge;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
const inR=(p,r,s)=>(s=s||0,p.x>r.x-s&&p.x<r.x+r.w+s&&p.y>r.y-s&&p.y<r.y+r.h+s);
/* track scene */
const lane=()=>({x:16,y:A.H*(A.narrow?.52:.56),w:A.W-32});
const pile=()=>({x:16,y:A.H*.7,w:A.W-32,h:A.H*.14}),knob=()=>({x:16,y:A.H*.7,w:A.W-32,h:A.H*.14});
const dp=()=>Math.min(z(26),S.dent*z(1.6)),cartR=()=>{const L=lane(),w=z(110),h=z(40);return{x:L.x+z(10)+S.pos*(L.w-z(50)-w)+dp(),y:L.y-h-z(14),w,h}};
function track(g,cap){const C=A.col,L=lane(),cr=cartR(),wall=L.x+L.w-z(40),e=ke(S.m,S.v);
 g.strokeStyle=C.mu;g.lineWidth=3;g.beginPath();g.moveTo(L.x,L.y);g.lineTo(L.x+L.w,L.y);g.stroke();
 const fw=z(34)-dp();g.fillStyle=A.alpha(C.am,.55);g.fillRect(wall-fw+z(34),L.y-z(70),fw,z(70));g.fillStyle=C.tx;g.fillRect(wall+z(34),L.y-z(80),5,z(80));
 txt(g,'foam',wall+z(17),L.y+z(12),z(60),11,C.mu);
 plate(g,cr,'cool',2.5);for(let i=0;i<S.m;i++){const bw=z(18);g.fillStyle=C.vi;A.paint.rrect(cr.x+z(6)+i*(bw+z(2)),cr.y-z(24),bw,z(22),4);g.fill()}
 g.fillStyle=C.tx;[.22,.78].forEach(f=>{g.beginPath();g.arc(cr.x+cr.w*f,cr.y+cr.h+z(6),z(8),0,7);g.fill()});
 txt(g,S.m+' kg',cr.x+cr.w/2,cr.y+cr.h/2,cr.w-8,14,C.tx,800);
 const al=z(18)*S.v;g.strokeStyle=C.or;g.lineWidth=4;g.beginPath();g.moveTo(cr.x+cr.w/2,cr.y-z(38));g.lineTo(cr.x+cr.w/2+al,cr.y-z(38));g.stroke();
 g.fillStyle=C.or;g.beginPath();g.moveTo(cr.x+cr.w/2+al+z(8),cr.y-z(38));g.lineTo(cr.x+cr.w/2+al,cr.y-z(44));g.lineTo(cr.x+cr.w/2+al,cr.y-z(32));g.fill();
 txt(g,S.v+' m/s',cr.x+cr.w/2+al/2,cr.y-z(54),z(90),13,C.tx,800);
 const by=A.H*.13,bx=16,bw=A.W-32,mx=16,f=Math.min(1,e/mx);g.fillStyle=A.alpha(C.mu,.25);A.paint.rrect(bx,by,bw,z(22),8);g.fill();
 g.fillStyle=e>cap?C.rd:C.gr;A.paint.rrect(bx,by,Math.max(6,bw*f),z(22),8);g.fill();
 g.strokeStyle=C.tx;g.lineWidth=2;const tx=bx+bw*cap/mx;g.beginPath();g.moveTo(tx,by-6);g.lineTo(tx,by+z(28));g.stroke();
 txt(g,'Kinetic energy: '+e+' J   (target '+cap+' J)',A.W/2,by+z(40),A.W-30,13,C.tx,800)}
function slider(g){const C=A.col,r=knob(),x=r.x+r.w*(S.v-.5)/3.5;g.fillStyle=A.alpha(C.mu,.3);A.paint.rrect(r.x,r.y+r.h/2-4,r.w,8,4);g.fill();
 for(let v=1;v<=4;v++){const tx=r.x+r.w*(v-.5)/3.5;txt(g,v+' m/s',tx,r.y+r.h+z(8),z(60),11,C.mu)}
 g.fillStyle=C.or;g.beginPath();g.arc(x,r.y+r.h/2,z(18),0,7);g.fill();txt(g,'⇆',x,r.y+r.h/2,z(30),16,'#1b1b1b',800)}
function blocks(g){const C=A.col,r=pile();plate(g,r,'vi',2);for(let i=0;i<3;i++){g.fillStyle=C.vi;A.paint.rrect(r.x+z(12)+i*z(30),r.y+r.h/2-z(12),z(24),z(22),4);g.fill()}
 txt(g,'Drag a 1 kg block onto the cart',r.x+z(108)+(r.w-z(108))/2,r.y+r.h/2,r.w-z(120),13,C.tx,700);
 if(S.grab&&S.grab.x!=null){g.fillStyle=C.vi;A.paint.rrect(S.grab.x-z(12),S.grab.y-z(11),z(24),z(22),4);g.fill()}}
/* table and graph */
const cellR=i=>{const w=A.narrow?(A.W-32)/2:A.W*.4,x=16,h=z(36),y=A.H*.14+(i+1)*h;return{x:x+w/2,y,w:w/2,h}};
const tileR=i=>{const n=TILES.length,gap=8,w=(A.W-32-gap*(n-1))/n;return{x:16+i*(w+gap),y:A.H*.84,w,h:Math.max(52,A.H*.12)}};
const plot=()=>A.narrow?{x:A.W*.56,y:A.H*.16,w:A.W*.38,h:A.H*.4}:{x:A.W*.55,y:A.H*.14,w:A.W*.4,h:A.H*.6};
function table(g){const C=A.col,w=cellR(0).w;txt(g,'Speed (m/s)',16+w/2,A.H*.14+z(18),w,12,C.mu,800);txt(g,'KE (J)',16+w*1.5,A.H*.14+z(18),w,12,C.mu,800);
 ROWS.forEach(([v,e],i)=>{const r=cellR(i),known=i<2||S.fill.includes(i),cur=i===S.row&&S.n<S.goal;plate(g,{x:16,y:r.y,w:r.w-2,h:r.h-4},'',1.5);txt(g,v,16+r.w/2,r.y+r.h/2-2,r.w,15,C.tx,800);
  plate(g,{x:r.x,y:r.y,w:r.w,h:r.h-4},cur?(S.bad>=0?'no':'hot'):known?'ok':'',cur?3:1.5);txt(g,known?e:'?',r.x+r.w/2,r.y+r.h/2-2,r.w,15,C.tx,800)});
 const P=plot(),pts=ROWS.filter((_,i)=>i<2||S.fill.includes(i));g.strokeStyle=C.mu;g.lineWidth=2;g.beginPath();g.moveTo(P.x,P.y);g.lineTo(P.x,P.y+P.h);g.lineTo(P.x+P.w,P.y+P.h);g.stroke();
 txt(g,'speed →',P.x+P.w/2,P.y+P.h+z(14),P.w,11,C.mu);txt(g,'KE ↑',P.x+z(16),P.y-z(10),z(50),11,C.mu);
 const X=v=>P.x+P.w*v/4.3,Y=e=>P.y+P.h-P.h*e/17;if(S.fill.length===2){g.strokeStyle=C.cy;g.lineWidth=2.5;g.beginPath();for(let v=0;v<=4;v+=.1)v?g.lineTo(X(v),Y(v*v)):g.moveTo(X(0),Y(0));g.stroke()}
 g.setLineDash([5,5]);g.strokeStyle=A.alpha(C.mu,.7);g.beginPath();g.moveTo(X(0),Y(0));g.lineTo(X(4),Y(4));g.stroke();g.setLineDash([]);txt(g,'in step with speed',X(3.2),Y(4.9),z(110),10,C.mu);
 pts.forEach(([v,e])=>{g.fillStyle=C.or;g.beginPath();g.arc(X(v),Y(e),z(6),0,7);g.fill()});
 TILES.forEach((t,i)=>{plate(g,tileR(i),'vi',2.5);txt(g,t+' J',tileR(i).x+tileR(i).w/2,tileR(i).y+tileR(i).h/2,tileR(i).w-6,16,C.tx,800)});
 if(S.grab&&S.grab.x!=null){const r={x:S.grab.x-z(30),y:S.grab.y-z(24),w:z(60),h:z(48)};plate(g,r,'hot',3);txt(g,TILES[S.grab.t]+' J',S.grab.x,S.grab.y,z(56),16,C.tx,800)}}
/* compare */
const sideR=k=>{const w=(A.W-40)/2;return{x:16+k*(w+8),y:A.H*.2,w,h:A.H*.46}},sameR=()=>({x:A.W*.28,y:A.H*.72,w:A.W*.44,h:Math.max(52,A.H*.12)});
function compare(g){const C=A.col,P=PAIRS[S.pi];if(!P)return;[P.a,P.b].forEach((o,k)=>{const r=sideR(k);plate(g,r,S.bad===k?'no':'cool',2.5);
  txt(g,o[0],r.x+r.w/2,r.y+r.h*.25,r.w,36);txt(g,o[1],r.x+r.w/2,r.y+r.h*.52,r.w-10,15,C.tx,800);txt(g,o[2]+' kg',r.x+r.w/2,r.y+r.h*.7,r.w-10,13,C.tx,700);txt(g,o[3]+' m/s',r.x+r.w/2,r.y+r.h*.85,r.w-10,13,C.tx,700)});
 plate(g,sameR(),S.bad===2?'no':'hot',2.5);txt(g,'Same energy',A.W/2,sameR().y+sameR().h/2,sameR().w-10,15,C.tx,800)}
/* crash */
const mphR=i=>{const gap=8,w=(A.W-32-gap*3)/4;return{x:16+i*(w+gap),y:A.H*.8,w,h:Math.max(52,A.H*.13)}};
function crash(g){const C=A.col,L=lane(),bw=(A.W-48)/4;txt(g,'Crash energy compared with 20 mph',A.W/2,A.H*.13,A.W-30,13,C.mu,800);
 MPH.forEach((s,i)=>{const done=S.tried.includes(i),k=(s/20)**2,h=A.H*.3*k/9,x=24+i*bw,bh=Math.max(3,done?h:0);g.fillStyle=done?(k>=4?C.rd:k>2?C.am:C.gr):A.alpha(C.mu,.2);
  g.fillRect(x+bw*.2,L.y+z(20)-bh,bw*.6,bh);if(done)txt(g,'×'+k,x+bw/2,L.y+z(8)-bh,bw,13,C.tx,800);txt(g,s+' mph',x+bw/2,L.y+z(32),bw,11,C.mu,700)});
 MPH.forEach((s,i)=>{plate(g,mphR(i),S.tried.includes(i)?'ok':'vi',2.5);txt(g,'🚗 '+s,mphR(i).x+mphR(i).w/2,mphR(i).y+mphR(i).h/2,mphR(i).w-6,15,C.tx,800)})}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=stage();
 if(p==='quiz'){txt(g,'Kinetic energy rises in step with mass, but with speed squared. Double the speed, four times the energy.',W/2,H*.45,W-40,17,C.tx,800);return}
 const head={mass:'Add mass until the cart has 8 J of kinetic energy.',speed:'Drag the speed until the 2 kg cart has 4 J.',table:'Fill in the energy for 3 m/s and 4 m/s.',compare:'Which one has more kinetic energy? Tap it.',crash:'Crash-test the car at all four speeds.'}[p];
 txt(g,head,W/2,H*.05,W-30,15,C.tx,800);
 if(p==='mass'){track(g,8);blocks(g)}if(p==='speed'){track(g,4);slider(g)}if(p==='table')table(g);if(p==='compare')compare(g);if(p==='crash')crash(g);A.fx.draw(g)}
function miss(t,k){A.sound.miss();S.bad=k==null?-1:k;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:1300);A.redraw()}
function got(t){S.n=S.goal;A.sound.pop();tell(t);keys();A.redraw();S.next()}
function roll(){S.pos=0;S.dent=0;A.tween(S,{pos:1,dent:ke(S.m,S.v)},fast()?1:500)}
function load(d){if(stage()!=='mass'||S.n>=S.goal)return;const m=Math.max(1,Math.min(5,S.m+d));if(m===S.m)return;S.m=m;roll();const e=ke(S.m,S.v);
 if(e===8)return got(`4 kg at 2 m/s: 8 J. Four times the mass gave four times the energy. Mass and kinetic energy go up in step.`);A.sound.tick();
 tell(`${S.m} kg at 2 m/s: ${e} J.`+(e>8?' Too much. Take a block off.':''));A.redraw()}
function speed(v){if(stage()!=='speed'||S.n>=S.goal)return;v=Math.round(Math.max(.5,Math.min(4,v))*2)/2;if(v===S.v)return;S.v=v;roll();const e=ke(S.m,v);
 if(e===4)return got('2 m/s: 4 J. The speed only doubled, from 1 to 2 m/s, but the energy went up four times, from 1 J to 4 J.');A.sound.tick();
 tell(`${v} m/s: ${e} J.`+(e>4?' Too fast. Slow it down.':''));A.redraw()}
function put(t){if(stage()!=='table'||S.n>=S.goal)return;const[v,e]=ROWS[S.row],val=TILES[t];
 if(val!==e){let m='Speed '+v+' is '+v+' times 1 m/s, so the energy is '+v+' × '+v+' = '+e+' times 1 J.';if(val===v*2)m='Not '+val+' J. That would be a straight line. '+m;return miss(m,t)}
 S.fill.push(S.row);A.sound.pop();if(S.row===3)return S.n=1,got('16 J at 4 m/s. Each step in speed adds more energy than the last, so the graph curves upward, not a straight line.');
 S.row=3;tell(`${e} J at ${v} m/s: three times the speed, nine times the energy. Now 4 m/s.`);keys();A.redraw()}
function pick(k){if(stage()!=='compare'||S.pi>=PAIRS.length||S.n>=S.goal)return;const P=PAIRS[S.pi];
 if(k!==P.ans){let m=k===2?'Not the same. ':'Look again. ';return miss(m+P.m,k)}S.pi++;S.n++;A.sound.pop();tell(P.m+(S.n<S.goal?' Next pair.':''));
 if(S.n>=S.goal)return got(P.m+' Mass multiplies the energy; speed multiplies it twice.');keys();A.redraw()}
function test(i){if(stage()!=='crash'||S.n>=S.goal||S.tried.includes(i))return;S.tried.push(i);S.n=S.tried.length;const s=MPH[i],k=(s/20)**2;A.sound.pop();A.fx.add(10,j=>({x:24+i*(A.W-48)/4+(A.W-48)/8,y:lane().y,vx:(Math.random()-.5)*200,vy:-Math.random()*200,g:500,life:.6,r:2.5,col:[A.col.rd,A.col.am][j%2],drag:.5}));A.kick&&A.kick();
 if(S.n>=S.goal)return got('From 30 to 60 mph is twice the speed but four times the crash energy. That is why a few mph over the limit does so much more damage.');
 tell(`${s} mph: ${k} times the energy of a 20 mph crash.`);keys();A.redraw()}
function keys(){if(!ctl)return;ctl.innerHTML='';const p=stage(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=f};if(p==='quiz'||S.n>=S.goal)return;
 if(p==='mass'){B('Add a 1 kg block',()=>load(1));B('Take a block off',()=>load(-1))}
 if(p==='speed'){B('Faster (+0.5 m/s)',()=>speed(S.v+.5));B('Slower (−0.5 m/s)',()=>speed(S.v-.5))}
 if(p==='table')TILES.forEach((t,i)=>B(t+' J',()=>put(i),`Put ${t} joules for ${ROWS[S.row][0]} metres per second`));
 if(p==='compare'&&PAIRS[S.pi]){const P=PAIRS[S.pi];B(P.a[1],()=>pick(0),P.a[1]+' has more energy');B('Same energy',()=>pick(2));B(P.b[1],()=>pick(1),P.b[1]+' has more energy')}
 if(p==='crash')MPH.forEach((s,i)=>{if(!S.tried.includes(i))B('Crash at '+s+' mph',()=>test(i))})}
const vAt=x=>{const r=knob();return .5+3.5*Math.max(0,Math.min(1,(x-r.x)/r.w))};
function down(pt){const p=stage();if(p==='quiz'||S.n>=S.goal)return false;
 if(p==='mass'){if(inR(pt,pile())){S.grab={x:null,x0:pt.x,y0:pt.y};return true}const cr=cartR();if(inR(pt,{x:cr.x,y:cr.y-z(28),w:cr.w,h:z(28)}))load(-1);return false}
 if(p==='speed'&&inR(pt,knob(),z(18))){speed(vAt(pt.x));S.grab={};return true}
 if(p==='table'){const t=TILES.findIndex((_,i)=>inR(pt,tileR(i)));if(t>=0){S.grab={t,x:null,x0:pt.x,y0:pt.y};return true}return false}
 if(p==='compare'){if(inR(pt,sameR()))pick(2);else[0,1].forEach(k=>{if(inR(pt,sideR(k)))pick(k)});return false}
 if(p==='crash')MPH.forEach((_,i)=>{if(inR(pt,mphR(i)))test(i)});return false}
function move(pt){const d=S.grab,p=stage();if(!d)return;if(p==='speed')return speed(vAt(pt.x));
 if(d.x!=null||Math.hypot(pt.x-d.x0,pt.y-d.y0)>8){d.x=pt.x;d.y=pt.y;A.redraw()}}
function up(pt){const d=S.grab,p=stage();S.grab=null;if(!d)return;
 if(p==='mass'){if(d.x==null||inR(pt,cartR(),z(40)))load(1);else{tell('Drop the block on the cart.');A.redraw()}}
 if(p==='table'){if(d.x==null||inR(pt,cellR(S.row),z(24)))put(d.t);else{tell('Drop the tile in the highlighted box.');A.redraw()}}}
const close=(i,msg)=>()=>{if(A.step===i&&S.n>=S.goal&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function drive(f){const k=++tok,go=()=>{if(k!==tok||S.n>=S.goal)return;f();setTimeout(go,90)};setTimeout(go,30)}
const clear=()=>{tok++;Object.assign(S,fresh())};
function nudge(){const p=stage();if(p==='mass')return load(1);if(p==='speed')return speed(S.v<2?S.v+.5:S.v-.5);if(p==='table')return put(TILES.indexOf(ROWS[S.row][1]));
 if(p==='compare')return pick(PAIRS[S.pi].ans);if(p==='crash')return test([0,1,2,3].find(i=>!S.tried.includes(i)))}
const show=i=>()=>{steps[i].go();S.quick=1;drive(nudge)};
const steps=[
{h:'Add mass',p:'The cart moves at 2 m/s. Drag 1 kg blocks onto it, or use the buttons. Watch the energy bar and the dent in the foam.',predict:{q:'Same speed, twice the mass. The kinetic energy will…',opts:['Double','Stay the same','Go up four times'],ans:0},task:'Reach 8 J',show:show(0),
 go:()=>{clear();roll();tell('Add mass until the cart has 8 J.');keys();S.next=close(0,'More mass, more energy, in step: twice the mass gives twice the kinetic energy.')}},
{h:'Add speed',p:'Now the cart is 2 kg and moves at 1 m/s, with 1 J. Drag the orange speed knob, or use the buttons.',predict:{q:'Same cart, twice the speed. The kinetic energy will…',opts:['Double','Go up four times','Stay the same'],ans:1},task:'Reach 4 J',show:show(1),
 go:()=>{clear();S.m=2;S.v=1;roll();tell('Drag the speed until the cart has 4 J.');keys();S.next=close(1,'Speed counts twice: double the speed and the energy goes up 2 × 2 = 4 times.')}},
{h:'Read the data',p:'These are results for the 2 kg cart. Drag a tile into the empty box, or tap a tile.',predict:{q:'Plot kinetic energy against speed. The graph will be…',opts:['A straight line','A curve that gets steeper'],ans:1},task:'Fill 2 boxes',show:show(2),
 go:()=>{clear();S.goal=1;tell('Fill in the energy for 3 and 4 metres per second.');keys();S.next=close(2,'Speed ×3 gives energy ×9 and speed ×4 gives ×16. The curve gets steeper and steeper.')}},
{h:'Which has more?',p:'Each card shows a mass and a speed. Decide which has more kinetic energy, or if they are the same.',task:'Judge 4 pairs',show:show(3),
 go:()=>{clear();S.goal=4;tell('Which has more kinetic energy? Tap it, or tap same energy.');keys();S.next=close(3,'Check both: mass multiplies the energy, and speed multiplies it twice over.')}},
{h:'Speed limits',p:'Tap each speed to crash-test the same car into a barrier. The bar shows the crash energy compared with 20 mph.',predict:{q:'A car hits a wall at 60 mph instead of 30 mph. The crash energy is…',opts:['About 2 times as big','About 4 times as big'],ans:1},task:'Test 4 speeds',show:show(4),
 go:()=>{clear();S.goal=4;tell('Crash-test the car at all four speeds.');keys();S.next=close(4,'Small rises in speed mean big rises in crash energy. 40 mph carries four times the energy of 20 mph.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.next()});
const QS=[['A trolley’s mass doubles. Its speed stays the same. Its kinetic energy…',[['Doubles','ok'],['Goes up four times','sq'],['Stays the same','same']]],
 ['A runner doubles her speed. Her kinetic energy…',[['Goes up four times','ok'],['Doubles','lin'],['Goes up eight times','cube']]],
 ['Ball A: 1 kg at 4 m/s. Ball B: 4 kg at 1 m/s. Which has more kinetic energy?',[['Ball A','ok'],['Ball B','mass'],['They are the same','prod']]],
 ['A cyclist speeds up from 3 m/s to 9 m/s. Her kinetic energy becomes…',[['9 times as big','ok'],['3 times as big','lin'],['6 times as big','add']]],
 ['Why do a few extra mph matter so much in a crash?',[['Energy rises with speed squared, so it grows much faster than speed','ok'],['Faster cars are heavier','heavy'],['Kinetic energy only depends on mass','mass']]],
 ['A parked lorry has a mass of 40 000 kg. Its kinetic energy is…',[['Zero','ok'],['Huge, because it is so heavy','park'],['40 000 J','park']]]];
function because(t){let m='Kinetic energy grows in step with mass, and with speed squared.';
 if(t==='sq')m='Only speed is squared. Mass counts once, so twice the mass gives twice the energy.';if(t==='same')m='More mass moving at the same speed carries more energy: twice as much.';
 if(t==='lin')m='Speed counts twice. Twice the speed gives 2 × 2 = 4 times the energy.';if(t==='cube')m='Speed is squared, not cubed: 2 × 2 = 4 times.';
 if(t==='mass')m='Ball A: ½ × 1 × 4² = 8 J. Ball B: ½ × 4 × 1² = 2 J. Speed matters more than mass.';if(t==='prod')m='Mass × speed is the same, but energy uses speed squared: 8 J against 2 J.';
 if(t==='add')m='Three times the speed gives 3 × 3 = 9 times the energy.';if(t==='heavy')m='The car is the same car. Its mass does not change, but its energy grows with speed squared.';
 if(t==='park')m='Kinetic energy is energy of movement. With no speed, it has none, however heavy it is.';return m}
function ask(){qi++;const[qq,ops]=QS[qi%QS.length],r=qi%3;chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});tell('Challenge: '+qq);A.redraw()}
function judge(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Right.':'✗ '+because(t)}${ok?` Stars in a row: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}});
A.start()})})();
