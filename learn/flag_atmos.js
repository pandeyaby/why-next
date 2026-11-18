/* Flagship – the atmosphere (ages 9–11; NC England Y5/KS2 Earth and space and states of matter, NGSS 5-ESS2-1).
   Fill 100 squares of air with nitrogen and oxygen, weigh a pumped balloon, carry a sealed packet up a mountain,
   drag weather, ozone, meteors and the aurora into their layers, then add the ozone shield and switch the heat
   blanket off and on. Every action also has a button. */
(()=>{
const GAS=[['nitrogen',78,'#1d4ed8'],['oxygen',21,'#047857']];
/* [card, layer index 0 tropo .. 3 thermo, why when wrong] */
const LAY=['Troposphere','Stratosphere','Mesosphere','Thermosphere'],KM=['0 to about 12 km','12 to 50 km','50 to 85 km','85 to 600 km'];
const CARDS=[['Clouds and rain',0,'Nearly all clouds, rain and wind are in the lowest layer, the troposphere.'],
 ['The ozone layer',1,'The ozone layer is in the stratosphere, about 15 to 35 km up, above the weather.'],
 ['The top of Mount Everest',0,'Everest is under 9 km high, so its top is still in the troposphere.'],
 ['Most meteors burn up',2,'Meteors burn up in the mesosphere, 50 to 85 km up, where there is just enough air to heat them.'],
 ['The northern lights',3,'The aurora glows high in the thermosphere, around 100 to 300 km up.'],
 ['The space station',3,'The space station orbits about 400 km up, in the thin thermosphere.']];
const P0=1013,pAt=h=>Math.round(P0*Math.exp(-h/8));
VIS.reg('flagatmos',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',RIM='#64748b',CARD='#ffffff',OK='#047857',NO='#b91c1c',SKY='#e0f2fe',HOT='#dcfce7',GOLD='#b45309',ROCK='#78716c',SNOW='#f1f5f9',UV='#7c3aed';
const VIEW=['mix','weigh','climb','layers','shield','chal'],view=()=>VIEW[A.step];
const k=n=>Math.round(n*(A.narrow?1.02:1.15)),ft=(n,w)=>`${w||700} ${k(n)}px system-ui,sans-serif`;
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function txt(s,x,y,n,col,al,w){Z.font=ft(n,w);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-16)}
function wrap(s,max,n){Z.font=ft(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(r,fill,edge,lw,rad){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,rad||10);Z.fill();Z.strokeStyle=edge||RIM;Z.lineWidth=lw||2;Z.stroke()}
function banner(s,good){const r={x:10,y:8,w:A.W-20,h:A.H*.12};box(r,good?HOT:SKY,good?OK:'#0369a1',2);const L=wrap(s,r.w-16,14);L.forEach((l,i)=>txt(l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*k(18),14,good?OK:INK))}
function footer(){if(!S.msg)return;const L=wrap((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=k(13)+5,h=L.length*lh+10,y=A.H-h-6;box({x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>txt(l,A.W/2,y+5+lh*(i+.5),13))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{S.bad=true;S.msg=s;A.sound.miss();tell(s);A.redraw()};
const good=s=>{S.bad=false;S.msg=s;A.sound.pop()};
/* 1: a 100-square jar of air */
const grid=()=>{const s=Math.min(A.W*.62,A.H*.46)/10;return{x:A.W/2-s*5,y:A.H*.2,s}};
function drawMix(){const g=GAS[S.gi],G=grid();banner(g?`Drag across the squares to show how much is ${g[0]}.`:'Air: 78 nitrogen, 21 oxygen, 1 other gases, in every 100.',!g);
 let n=0;const col=[];GAS.forEach((x,i)=>{if(i<S.gi)for(let j=0;j<x[1];j++)col[n++]=x[2]});const start=n;if(g)for(let j=0;j<S.n;j++)col[n++]=g[2];if(!g)col[99]=GOLD;
 for(let i=0;i<100;i++){const x=G.x+(i%10)*G.s,y=G.y+Math.floor(i/10)*G.s;Z.fillStyle=col[i]||'#f8fafc';Z.fillRect(x+1,y+1,G.s-2,G.s-2);Z.strokeStyle='#94a3b8';Z.lineWidth=1;Z.strokeRect(x+1,y+1,G.s-2,G.s-2)}
 const ly=G.y+G.s*10+k(16);txt(g?`${g[0]}: ${S.n} of 100 squares`:'nitrogen 78 · oxygen 21 · argon, carbon dioxide and others 1',A.W/2,ly,A.narrow&&!g?11:14,INK,'center',800);
 if(g&&start)txt(`already placed: ${GAS.slice(0,S.gi).map(x=>x[0]+' '+x[1]).join(', ')}`,A.W/2,ly+k(20),12,SOFT)}
function setN(n){const g=GAS[S.gi];if(!g)return;const room=100-GAS.slice(0,S.gi).reduce((a,x)=>a+x[1],0);S.n=Math.max(0,Math.min(room,n));S.msg='';tell(`${g[0]}: ${S.n} of 100 squares.`);A.redraw()}
function lockMix(){const g=GAS[S.gi];if(!g)return;const v=S.n;
 if(Math.abs(v-g[1])<=2){S.gi++;S.n=0;good(S.gi===1?'Yes: about 78 in every 100 parts of air are nitrogen.':'Yes: about 21 in every 100 are oxygen. That leaves just 1 for argon, carbon dioxide and the rest.');return update()}
 if(g[0]==='nitrogen'&&Math.abs(v-21)<=4)return miss(`${v} is about how much oxygen there is. Nitrogen is far more: nearly 4 in every 5 squares.`);
 if(g[0]==='nitrogen'&&v>=95)return miss('Too much: oxygen and other gases need room too. Nitrogen is a bit under 4 in every 5.');
 if(g[0]==='oxygen'&&v>=40)return miss('Too much: air is not mostly oxygen. Only about 1 in 5 squares is oxygen.');
 miss(`${v<g[1]?'Too few':'Too many'}: ${v} squares. Try ${v<g[1]?'more':'fewer'}.`)}
/* 2: weigh a balloon */
function drawWeigh(){banner(S.out?'Air out, level again. The air had weight.':S.pumps>=3?'Full balloon side went down. Now let the air out.':`Pump air into the left balloon. Pumps: ${S.pumps} of 3.`,S.out);
 const cx=A.W/2,py=A.H*.3,tilt=Math.min(.18,S.pumps*.06),arm=A.W*.32;Z.strokeStyle=INK;Z.lineWidth=4;Z.beginPath();Z.moveTo(cx,py);Z.lineTo(cx,A.H*.66);Z.stroke();
 Z.fillStyle=ROCK;Z.fillRect(cx-A.W*.12,A.H*.66,A.W*.24,k(10));
 const ex=Math.cos(tilt)*arm,ey=Math.sin(tilt)*arm,L={x:cx-ex,y:py+ey},R={x:cx+ex,y:py-ey};Z.beginPath();Z.moveTo(L.x,L.y);Z.lineTo(R.x,R.y);Z.stroke();
 Z.fillStyle=INK;Z.beginPath();Z.arc(cx,py,6,0,7);Z.fill();
 const ball=(p,r,col)=>{Z.strokeStyle=SOFT;Z.lineWidth=1.5;Z.beginPath();Z.moveTo(p.x,p.y);Z.lineTo(p.x,p.y+k(28));Z.stroke();Z.fillStyle=col;Z.beginPath();Z.ellipse(p.x,p.y+k(28)+r,r*.85,r,0,0,7);Z.fill();Z.strokeStyle=INK;Z.lineWidth=2;Z.stroke()};
 ball(L,k(10)+S.pumps*k(11),'#f97316');ball(R,k(10),'#38bdf8');
 txt(S.pumps?`left: +${S.pumps} pumps of air`:'both balloons empty',A.W/2,A.H*.72,12,SOFT);
 const pump={x:A.W*.04,y:A.H*.5,w:A.W*.2,h:k(34)};box(pump,'#ffedd5',GOLD,2);txt('Pump',pump.x+pump.w/2,pump.y+pump.h/2,13,INK,'center',800)}
function pumpIt(){if(S.out)return;if(S.pumps>=3)return miss('It is full. Now let the air out and watch the balance.');S.pumps++;A.sound.tick();
 if(S.pumps===3)good('The left side went down. The air you pumped in has weight.');else S.msg='';update()}
function letOut(){if(S.out)return;if(!S.pumps)return miss('There is no extra air in it yet. Pump first.');if(S.pumps<3)return miss('Pump it full first, 3 pumps, so the tip is easy to see.');S.pumps=0;S.out=true;good('Level again. With the air gone, the extra weight went too.');update()}
/* 3: climb a mountain */
const mt=()=>({x0:A.W*.06,x1:A.W*.62,base:A.H*.74,top:A.H*.2});
const hY=h=>{const m=mt();return m.base-(m.base-m.top)*h/8.85};
function drawClimb(){const m=mt(),h=S.h,p=pAt(h);banner(S.top&&h<=.5?'Back at sea level, the packet is flat again.':S.top?'Top! Now come back down.':'Carry the sealed packet up the mountain.',S.top&&h<=.5);
 Z.fillStyle=ROCK;Z.beginPath();Z.moveTo(m.x0,m.base);Z.lineTo((m.x0+m.x1)/2,m.top);Z.lineTo(m.x1,m.base);Z.closePath();Z.fill();
 Z.fillStyle=SNOW;Z.beginPath();Z.moveTo((m.x0+m.x1)/2,m.top);Z.lineTo((m.x0+m.x1)/2-(m.x1-m.x0)*.09,m.top+(m.base-m.top)*.18);Z.lineTo((m.x0+m.x1)/2+(m.x1-m.x0)*.09,m.top+(m.base-m.top)*.18);Z.closePath();Z.fill();
 const y=hY(h),x=m.x0+(m.x1-m.x0)/2*(h/8.85)*.98;Z.fillStyle='#1e3a8a';Z.beginPath();Z.arc(x,y-k(10),k(7),0,7);Z.fill();
 const puff=Math.min(2.2,P0/p),w=k(18)*Math.sqrt(puff),hh=k(10)*puff;box({x:x+k(8),y:y-k(10)-hh/2,w,h:hh},'#fde68a',GOLD,2,6);
 const dots=Math.round(p/1013*24);Z.fillStyle='#0369a1';for(let i=0;i<dots;i++){const a=i*2.4;Z.beginPath();Z.arc(A.W*.82+Math.cos(a)*(8+i*1.6)*.9,A.H*.4+Math.sin(a)*(8+i*1.6),2.5,0,7);Z.fill()}
 txt('air around you',A.W*.82,A.H*.25,11,SOFT);
 txt(`${h.toFixed(1)} km up`,A.W*.82,A.H*.56,14,INK,'center',800);txt(`${p} hPa`,A.W*.82,A.H*.56+k(20),14,'#0369a1','center',800);txt('sea level 1013',A.W*.82,A.H*.56+k(38),11,SOFT)}
function setH(h){if(S.done3)return;S.h=Math.max(0,Math.min(8.85,Math.round(h*10)/10));if(S.h>=8.8&&!S.top){S.top=true;good(`At 8.8 km the pressure is only about ${pAt(8.8)} hPa, a third of sea level. Less air pushes on the packet, so it puffs up.`)}
 else if(S.top&&S.h<=.5){S.done3=true;good('More air is above you again and it presses harder, so the packet is squashed back down.')}
 else S.msg=S.msg&&!S.bad?S.msg:'';update()}
/* 4: the layers */
const band=i=>{const t=A.H*.15,b=A.H*.7,h=(b-t)/4;return{x:A.W*.04,y:b-(i+1)*h,w:A.W*.92,h}};
const card4=()=>({x:A.W*.52,y:A.H*.03,w:A.W*.44,h:k(32)});
function drawLayers(){const q=CARDS[S.ci];
 const fills=['#dbeafe','#e0e7ff','#ede9fe','#f5f3ff'];for(let i=0;i<4;i++){const r=band(i);box(r,S.drag&&inR(S.drag,r)?HOT:fills[i],S.wrong===i?NO:RIM,S.wrong===i?3.5:1.5,6);
  txt(LAY[i],r.x+8,r.y+k(12),13,INK,'left',800);txt(KM[i],r.x+8,r.y+k(28),11,SOFT,'left',600);
  S.put.filter(x=>CARDS[x][1]===i).forEach((x,j)=>txt('✓ '+CARDS[x][0],r.x+r.w-8,r.y+k(14)+j*k(17),11,OK,'right',700))}
 Z.fillStyle='#57534e';Z.fillRect(A.W*.04,A.H*.7,A.W*.92,k(8));txt('ground',A.W/2,A.H*.7+k(18),11,SOFT);
 if(q){txt('Where does it go?',A.W*.04,A.H*.07,13,INK,'left',800);const r0=card4(),r=S.drag?{...r0,x:S.drag.x-r0.w/2,y:S.drag.y-r0.h/2}:r0;box(r,'#fffbeb',GOLD,3);txt(q[0],r.x+r.w/2,r.y+r.h/2,13,INK,'center',800)}
 else txt('Weather low down, ozone above it, space station high up.',A.W/2,A.H*.08,13,OK,'center',800)}
function putCard(i){const q=CARDS[S.ci];if(!q)return;if(i===q[1]){S.wrong=null;S.put.push(S.ci);S.ci++;good(`Yes: ${q[0].toLowerCase()} → ${LAY[i].toLowerCase()}.`);return update()}
 S.wrong=i;miss(`Not the ${LAY[i].toLowerCase()}. ${q[2]}`)}
/* 5: shield and blanket */
function drawShield(){const t=S.blanket?15:-18,done=S.oz&&S.seenOff&&S.blanket;banner(done?'Ozone stops most UV. The air keeps Earth about 15 °C on average.':!S.oz?'Sun’s UV is getting through. Add the ozone layer.':!S.seenOff?'Now switch the heat blanket off.':'Switch the blanket back on.',done);
 const cx=A.W*.34,cy=A.H*.56,R=Math.min(A.W*.19,A.H*.2);
 if(S.blanket){Z.fillStyle='rgba(56,189,248,.35)';Z.beginPath();Z.arc(cx,cy,R*1.28,0,7);Z.fill()}
 if(S.oz){Z.strokeStyle=UV;Z.lineWidth=k(6);Z.beginPath();Z.arc(cx,cy,R*1.22,Math.PI*1.05,Math.PI*1.95);Z.stroke();txt('ozone',cx,cy-R*1.42,12,UV,'center',800)}
 Z.fillStyle='#2563eb';Z.beginPath();Z.arc(cx,cy,R,0,7);Z.fill();Z.fillStyle='#16a34a';Z.beginPath();Z.ellipse(cx-R*.3,cy-R*.1,R*.35,R*.25,.4,0,7);Z.fill();Z.beginPath();Z.ellipse(cx+R*.35,cy+R*.3,R*.28,R*.2,-.3,0,7);Z.fill();
 const sx=A.W*.84,sy=A.H*.24;Z.fillStyle='#facc15';Z.beginPath();Z.arc(sx,sy,k(18),0,7);Z.fill();txt('Sun',sx,sy+k(28),12,INK,'center',800);
 for(let i=0;i<3;i++){const ex=cx+R*(.2+i*.2),ey=cy-R*.95+i*R*.25,stop=S.oz?.62:1,bx=sx+(ex-sx)*stop,by=sy+(ey-sy)*stop;Z.strokeStyle=UV;Z.lineWidth=3;Z.setLineDash([7,5]);Z.beginPath();Z.moveTo(sx-10,sy+8);Z.lineTo(bx,by);Z.stroke();Z.setLineDash([])}
 txt(S.oz?'UV mostly stopped':'UV gets through',A.W*.74,A.H*.44,12,UV,'center',800);
 const th={x:A.W*.72,y:A.H*.5,w:A.W*.24,h:k(56)};box(th,t>0?'#ffedd5':'#e0f2fe',t>0?GOLD:'#0369a1',2);txt('average',th.x+th.w/2,th.y+k(14),11,SOFT);txt(`${t} °C`,th.x+th.w/2,th.y+k(36),18,INK,'center',800);
 txt(S.blanket?'blanket on':'blanket off',A.W*.84,th.y+th.h+k(14),11,SOFT)}
function addOz(){if(S.oz)return miss('The ozone layer is already in place.');S.oz=true;good('The ozone layer, high in the stratosphere, soaks up most of the Sun’s harmful UV.');update()}
function blanket(on){if(!S.oz)return miss('Add the ozone layer first, then try the blanket.');if(on===S.blanket)return miss(on?'The blanket is already on.':'It is already off.');
 S.blanket=on;if(!on){S.seenOff=true;good('Without the air’s blanket, heat escapes to space: Earth would average about −18 °C. Sunlight still gets in.')}else good(S.seenOff?'Blanket back on: the air holds in heat, about 15 °C on average.':'On.');update()}
/* ---- pointer ---- */
function down(p){const v=view();
 if(v==='mix'){if(!GAS[S.gi])return false;const G=grid();if(inR(p,{x:G.x-20,y:G.y-10,w:G.s*10+40,h:G.s*10+20})){S.slide=1;setN(Math.round(Math.floor((p.y-G.y)/G.s)*10+(p.x-G.x)/G.s));return true}return false}
 if(v==='weigh'){if(S.out)return false;if(p.x<A.W*.3&&p.y>A.H*.4){pumpIt();return true}if(p.x>=A.W*.3){S.pumps>=3?letOut():pumpIt();return true}return false}
 if(v==='climb'){if(S.done3)return false;const m=mt();if(p.x<m.x1+20){S.slide=1;setH((m.base-p.y)/(m.base-m.top)*8.85);return true}return false}
 if(v==='layers'){if(!CARDS[S.ci])return false;if(inR(p,card4())){S.drag={x:p.x,y:p.y};return true}const i=[0,1,2,3].find(i=>inR(p,band(i)));if(i!=null){putCard(i);return true}return false}
 if(v==='shield'){if(!S.oz){addOz();return true}if(!S.seenOff){blanket(false);return true}if(!S.blanket){blanket(true);return true}return false}return false}
function move(p){const v=view();if(S.slide&&v==='mix'){const G=grid();return setN(Math.round(Math.floor((p.y-G.y)/G.s)*10+(p.x-G.x)/G.s))}if(S.slide&&v==='climb'){const m=mt();return setH((m.base-p.y)/(m.base-m.top)*8.85)}if(S.drag){S.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){const v=view();if(S.slide){S.slide=0;if(v==='mix')return lockMix();return}if(!S.drag)return;const at=p||S.drag;S.drag=null;const i=[0,1,2,3].find(i=>inR(at,band(i)));if(i!=null)return putCard(i);A.redraw()}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const v=view();if(v==='mix')drawMix();if(v==='weigh')drawWeigh();if(v==='climb')drawClimb();if(v==='layers')drawLayers();if(v==='shield')drawShield();
 if(v==='chal'){for(let i=0;i<4;i++){const r=band(i);box(r,['#dbeafe','#e0e7ff','#ede9fe','#f5f3ff'][i],RIM,1.5,6);txt(LAY[i],r.x+8,r.y+r.h/2,13,INK,'left',800);txt(KM[i],r.x+r.w-8,r.y+r.h/2,11,SOFT,'right',600)}txt('Air: mostly nitrogen. It has weight and presses on us.',A.W/2,A.H*.08,12,INK,'center',800)}
 footer();A.fx.draw(Z)}
function update(){const v=view();let s='Challenge.';
 if(v==='mix')s=GAS[S.gi]?`Show ${GAS[S.gi][0]}: ${S.n} of 100 squares so far.`:'Nitrogen 78 and oxygen 21 placed; 1 square is other gases.';
 if(v==='weigh')s=S.out?'Balance level again after letting the air out.':`Left balloon pumped ${S.pumps} of 3 times; the left side is ${S.pumps?'lower':'level'}.`;
 if(v==='climb')s=`${S.h.toFixed(1)} km up, air pressure about ${pAt(S.h)} hPa. ${S.top?'Top reached.':'Climb to the top.'}`;
 if(v==='layers')s=CARDS[S.ci]?`Card: ${CARDS[S.ci][0]}. Which layer?`:'All six cards placed in their layers.';
 if(v==='shield')s=`Ozone layer ${S.oz?'on':'off'}, heat blanket ${S.blanket?'on':'off'}, average ${S.blanket?15:-18} °C.`;
 tell((S.msg?S.msg+' ':'')+s);buttons();S.then()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=view(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(v==='mix'&&GAS[S.gi]){const g=GAS[S.gi][0];b('− 10',()=>setN(S.n-10),`10 fewer ${g} squares`);b('− 1',()=>setN(S.n-1),`1 fewer ${g} square`);b('+ 1',()=>setN(S.n+1),`1 more ${g} square`);b('+ 10',()=>setN(S.n+10),`10 more ${g} squares`);b('That much',lockMix,`Lock in ${S.n} squares of ${g}`)}
 if(v==='weigh'&&!S.out){b('Pump',pumpIt,'Pump air into the left balloon');b('Let the air out',letOut,'Let the air out of the left balloon')}
 if(v==='climb'&&!S.done3){b('Climb 1 km',()=>setH(S.h+1),'Climb 1 km higher');b('Go down 1 km',()=>setH(S.h-1),'Go down 1 km')}
 if(v==='layers'&&CARDS[S.ci])LAY.forEach((n,i)=>b(n,()=>putCard(i),`Put ${CARDS[S.ci][0]} in the ${n.toLowerCase()}`));
 if(v==='shield'){b('Add ozone layer',addOz,'Add the ozone layer');b('Blanket off',()=>blanket(false),'Switch the heat blanket of air off');b('Blanket on',()=>blanket(true),'Switch the heat blanket of air on')}
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const reset=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},gi:0,n:0,pumps:0,out:false,h:0,top:false,done3:false,ci:0,put:[],oz:false,blanket:true,seenOff:false,drag:null,slide:0,wrong:null,msg:'',bad:false})};
const steps=[
{h:'What is air made of?',p:'Air is a mix of gases. These 100 squares stand for the air. Drag across them, or use the buttons, to show how many squares each gas fills.',
predict:{q:'Which gas makes up most of the air?',opts:['Nitrogen','Oxygen','Carbon dioxide'],ans:0},
task:'Show nitrogen and oxygen',show:()=>{steps[0].go();play([()=>setN(78),lockMix,()=>setN(21),lockMix],450)},go:()=>{reset();update();S.then=finish(0,()=>S.gi>=GAS.length,'About 78 nitrogen and 21 oxygen in every 100.')}},
{h:'Air has weight',p:'Hang two balloons on a balance. Pump air into one. Tap the pump or the picture, or use the buttons.',
predict:{q:'You pump air into the left balloon. What does the balance do?',opts:['The left side goes down','The left side goes up','It stays level'],ans:0},
task:'Pump 3 times, then let it out',show:()=>{steps[1].go();play([pumpIt,pumpIt,pumpIt,letOut],450)},go:()=>{reset();update();S.then=finish(1,()=>S.out,'Air is matter. It has mass, so it has weight.')}},
{h:'Air presses on everything',p:'The air above us pushes down. This push is air pressure. Drag the climber up the mountain, or use the buttons. Watch the sealed packet.',
predict:{q:'Where is the air pressure highest?',opts:['At sea level','At the top of the mountain','The same everywhere'],ans:0},
task:'Climb to the top and back',show:()=>{steps[2].go();play([3,6,8.85,4,0].map(h=>()=>setH(h)),420)},go:()=>{reset();update();S.then=finish(2,()=>S.done3,'Less air above means less pressure.')}},
{h:'Layers of the atmosphere',p:'The atmosphere has layers. Drag each card to the layer where it belongs, or use the buttons.',
predict:{q:'Where does almost all weather happen?',opts:['In the lowest layer','In the highest layer','In every layer the same'],ans:0},
task:'Place 6 cards',show:()=>{steps[3].go();play(CARDS.map(q=>()=>putCard(q[1])),400)},go:()=>{reset();update();S.then=finish(3,()=>S.ci>=CARDS.length,'Weather is in the troposphere, the lowest layer.')}},
{h:'A shield and a blanket',p:'The atmosphere protects us. Add the ozone layer, then switch the heat blanket off and on. Tap the picture or use the buttons.',
predict:{q:'If Earth had no air, would it be warmer or colder?',opts:['Much colder','Hotter, nothing would block the Sun','About the same'],ans:0},
task:'Add ozone, test the blanket',show:()=>{steps[4].go();play([addOz,()=>blanket(false),()=>blanket(true)],600)},go:()=>{reset();update();S.then=finish(4,()=>S.oz&&S.seenOff&&S.blanket,'The air shields us from UV and keeps Earth warm enough for life.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['Which gas is most of the air?','Nitrogen',[['Oxygen','oxy'],['Carbon dioxide','co2']]],
['Does air have weight?','Yes, a little',[['No, air is weightless','none'],['Only when it is windy','wind']]],
['Where is air pressure lowest?','At the top of a high mountain',[['At sea level','sea'],['Inside a cave','cave']]],
['In which layer do clouds and rain form?','Troposphere',[['Stratosphere','strat'],['Thermosphere','space']]],
['What does the ozone layer do?','Soaks up most of the Sun’s UV',[['Makes the rain','ozrain'],['Holds the air down','ozhold']]],
['Without its air, Earth would be…','Much colder',[['Hotter','hot'],['The same','same']]]];
function why(tag){let m='Think about the layer of air around the Earth.';
 if(tag==='oxy')m='Oxygen is only about 21 in every 100 parts. Nitrogen is about 78.';
 if(tag==='co2')m='Carbon dioxide is tiny: under 1 part in 2,000 of the air. Nitrogen is most of it.';
 if(tag==='none')m='Air is matter, so it has mass and weight. The pumped balloon pulled its side down.';
 if(tag==='wind')m='Air has weight all the time. Wind is just air moving.';
 if(tag==='sea')m='At sea level the most air is above you, so the pressure is highest there.';
 if(tag==='cave')m='Going down, more air is above you, so the pressure goes up, not down.';
 if(tag==='strat')m='The stratosphere is above the weather. It holds the ozone layer.';
 if(tag==='space')m='The thermosphere is hundreds of km up, where the space station flies. Weather is lower.';
 if(tag==='ozrain')m='Rain forms from clouds in the troposphere. Ozone is higher and blocks UV.';
 if(tag==='ozhold')m='Gravity holds the air to Earth. Ozone soaks up UV light.';
 if(tag==='hot')m='Sunlight would still reach the ground, but the heat would escape to space. Earth would average about −18 °C.';
 if(tag==='same')m='The air works like a blanket. Without it, Earth would be about 33 °C colder on average.';
 return m}
function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Atmosphere lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
