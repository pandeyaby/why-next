/* Flagship: Mains wiring and plug safety (ages 14–16; AQA GCSE Physics 4.2.3 domestic uses and safety). Wire a UK plug;
   probe each wire with the lamp switched off; touch an unearthed live case; reconnect the earth so the fault current blows
   the fuse; pick 3 A, 5 A or 13 A fuses from I = P ÷ V. Not flagzap (young-child safety) or flagcirc. */
(()=>{
VIS.reg('flagplug',c=>{let A,pad,quiz,qn=-1,gen=0;const S={};
const part=()=>['wire','probe','shock','earth','rating','chal'][A.step];
const INK='#0f172a',PILL='#f8fafc',BROWN='#92400e',BLUE='#2563eb',GY='#65a30d',DANGER='#dc2626',SAFE='#15803d',CU='#f59e0b';
const WIRES=[['live','brown',BROWN,'L'],['neutral','blue',BLUE,'N'],['earth','green and yellow',GY,'E']];
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const f1=()=>A.narrow?14:17,f2=()=>A.narrow?12:14,lim=(v,a,b)=>Math.max(a,Math.min(b,v)),ink=()=>A.col.dark?'#e2e8f0':INK;
function pill(s,x,y,px,edge){const g=A.ctx;g.font=`700 ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';const w=g.measureText(s).width+16;
 x=lim(x,w/2+4,A.W-w/2-4);g.fillStyle=PILL;A.paint.rrect(x-w/2,y-px*.8,w,px*1.6,px*.6);g.fill();if(edge){g.strokeStyle=edge;g.lineWidth=2.5;g.stroke()}g.fillStyle=INK;g.fillText(s,x,y)}
function wire(pts,col,w,stripe){const g=A.ctx;g.lineCap='round';g.lineJoin='round';g.strokeStyle=col;g.lineWidth=w||7;g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();
 if(stripe){g.strokeStyle='#facc15';g.setLineDash([8,8]);g.stroke();g.setLineDash([])}}
/* step 1: the plug */
function plugGeo(){const w=Math.min(A.W*.62,300),h=A.H*.72,x=A.W/2-w/2,y=A.H*.15;
 return{x,y,w,h,T:{E:[A.W/2,y+h*.2],N:[x+w*.2,y+h*.58],L:[x+w*.8,y+h*.58]},grip:[A.W/2,y+h*.93]}}
function looseEnd(i,P){return[P.grip[0]+(i-1)*P.w*.16,P.grip[1]-P.h*.16]}
function endOf(i,P){if(S.hold&&S.hold.i===i)return[S.hold.x,S.hold.y];const t=S.to[i];return t?P.T[t]:looseEnd(i,P)}
function drawPlug(){const g=A.ctx,P=plugGeo();g.fillStyle=A.col.dark?'#334155':'#e5e7eb';A.paint.rrect(P.x,P.y,P.w,P.h,18);g.fill();g.strokeStyle=ink();g.lineWidth=2.5;g.stroke();
 const fx=P.T.L[0],fy=P.T.L[1]-P.h*.24;g.fillStyle='#fde68a';A.paint.rrect(fx-10,fy-P.h*.13,20,P.h*.26,6);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();pill('fuse',fx,fy-P.h*.17,f2());
 Object.entries(P.T).forEach(([k,[x,y]])=>{g.fillStyle='#d4a017';g.beginPath();g.arc(x,y,13,0,7);g.fill();g.strokeStyle=INK;g.stroke();pill(k==='E'?'top':k==='N'?'left':'right',x,y+(k==='E'?-26:28),f2())});
 g.fillStyle='#475569';g.fillRect(P.grip[0]-P.w*.2,P.grip[1]-8,P.w*.4,16);
 WIRES.forEach(([n,cn,col],i)=>{const e=endOf(i,P),bend=[P.grip[0]+(i-1)*8,P.grip[1]-14];wire([[P.grip[0]+(i-1)*8,P.grip[1]+30],bend,e],col,8,i===2);
  g.fillStyle='#d4a017';g.beginPath();g.arc(e[0],e[1],6,0,7);g.fill()});
 const done=Object.keys(S.to).length;pill(done===3?'Wired correctly':`Wires connected: ${done} of 3`,A.W/2,A.H*.06,f1(),done===3?SAFE:null)}
function connect(i,t){if(S.to[i])return;const want=WIRES[i][3];
 if(t!==want){S.bad++;A.sound.miss();return after(i===0?'Brown live goes to the right terminal, through the fuse, so the fuse can cut off the 230 V.':i===1?'The blue neutral wire goes to the left terminal (blue, bottom left).':'Green-and-yellow earth goes to the top terminal, the long earth pin.')}
 S.to[i]=t;A.sound.pop();const n=Object.keys(S.to).length;after(n===3?'All three wires on. A big current melts the fuse and cuts off the live wire.':`${WIRES[i][1]} ${WIRES[i][0]} wire connected.`)}
const nextWire=()=>[0,1,2].find(i=>!S.to[i]);
/* steps 2-4: socket, cable, appliance */
function lanes(){const y0=A.H*.3,gap=A.H*.13;return{x0:A.W*.14,x1:A.W*.72,y:[y0,y0+gap,y0+2*gap],sw:A.W*.56}}
function drawSocket(L){const g=A.ctx;g.fillStyle=A.col.dark?'#334155':'#e5e7eb';A.paint.rrect(8,L.y[0]-30,L.x0-8,L.y[2]-L.y[0]+60,10);g.fill();g.strokeStyle=ink();g.lineWidth=2;g.stroke();
 ['L','N','E'].forEach((k,i)=>pill(k,(8+L.x0)/2,L.y[i],f2()))}
function drawProbe(){const g=A.ctx,L=lanes();drawSocket(L);const on=S.sw;
 WIRES.forEach(([n,cn,col],i)=>{if(i===0){wire([[L.x0,L.y[0]],[L.sw-18,L.y[0]]],col,7);wire([[L.sw+22,L.y[0]],[L.x1,L.y[0]]],col,7);
   g.strokeStyle=ink();g.lineWidth=4;g.beginPath();g.moveTo(L.sw-18,L.y[0]);g.lineTo(L.sw+20,on?L.y[0]:L.y[0]-24);g.stroke();pill(on?'switch on':'switch off',L.sw,L.y[0]-36,f2())}
  else wire([[L.x0,L.y[i]],[L.x1,L.y[i]]],col,7,i===2);pill(n,L.x0+44,L.y[i]+18,f2())});
 g.fillStyle=A.col.dark?'#475569':'#cbd5e1';A.paint.rrect(L.x1,L.y[0]-26,A.W-L.x1-10,L.y[2]-L.y[0]+52,12);g.fill();g.strokeStyle=ink();g.lineWidth=2;g.stroke();pill('lamp',(L.x1+A.W-10)/2,L.y[1],f2());
 if(S.at!=null){const x=S.at===3?(L.sw+L.x1)/2+12:L.x0+L.sw*.25,y=L.y[S.at===3?0:S.at];g.fillStyle=DANGER;g.beginPath();g.arc(x,y,9,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke()}
 pill(S.at==null?'Voltmeter: tap a wire':`Voltmeter: ${volts(S.at)} V`,A.W/2,A.H*.08,f1(),S.at!=null&&volts(S.at)>0?DANGER:null)}
const volts=i=>i===0?230:i===3?(S.sw?230:0):0;
function probe(i){S.at=i;if(i===0&&!S.sw)S.offLive=true;A.sound.tick();const n=i===3?'live wire after the switch':WIRES[i][0]+' wire';
 after(`${n}: ${volts(i)} V compared with the earth.`+(i===0?(S.sw?' The live wire carries the 230 V.':' The lamp is off, but the live wire in the cable is still at 230 V. Touching it would still drive a current through you.'):i===1?' The neutral wire completes the circuit and stays close to 0 V.':i===2?' The earth wire is at 0 V. It only carries a current if there is a fault.':''))}
function toggle(){S.sw=!S.sw;A.sound.step();after(S.sw?'Switched on: current flows in on the live wire and back on the neutral.':'Switched off. The switch is in the live wire, but the cable up to it is still live.')}
/* steps 3-4: live case fault */
function drawFault(){const g=A.ctx,L=lanes(),k=part(),blown=S.blown;drawSocket(L);const fx=L.x0+L.sw*.28;
 wire([[L.x0,L.y[0]],[fx-16,L.y[0]]],BROWN,7);if(!blown)wire([[fx+16,L.y[0]],[L.x1,L.y[0]]],BROWN,7);else wire([[fx+22,L.y[0]],[L.x1,L.y[0]]],BROWN,7);
 g.fillStyle=blown?'#9ca3af':'#fde68a';A.paint.rrect(fx-16,L.y[0]-10,32,20,5);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();if(blown){g.strokeStyle=DANGER;g.lineWidth=3;g.beginPath();g.moveTo(fx-8,L.y[0]-8);g.lineTo(fx+8,L.y[0]+8);g.stroke()}
 pill(blown?'fuse melted':'fuse',fx,L.y[0]-24,f2(),blown?DANGER:null);wire([[L.x0,L.y[1]],[L.x1,L.y[1]]],BLUE,7);
 if(S.earthed)wire([[L.x0,L.y[2]],[L.x1+14,L.y[2]]],GY,7,1);else{wire([[L.x0,L.y[2]],[L.x1-60,L.y[2]]],GY,7,1);pill('earth cut',L.x1-40,L.y[2]+20,f2(),DANGER)}
 const cx=L.x1,cw=A.W-L.x1-10,live=!blown&&(!S.earthed||S.fault);g.fillStyle=live&&!S.earthed?A.alpha(DANGER,.35):(A.col.dark?'#64748b':'#cbd5e1');A.paint.rrect(cx,L.y[0]-26,cw,L.y[2]-L.y[0]+52,12);g.fill();g.strokeStyle=ink();g.lineWidth=3;g.stroke();
 pill('metal case',cx+cw/2,L.y[0]-40,f2());g.strokeStyle=DANGER;g.lineWidth=4;g.beginPath();g.moveTo(cx,L.y[0]);g.lineTo(cx+12,L.y[0]+10);g.lineTo(cx+4,L.y[0]+20);g.lineTo(cx+16,L.y[0]+30);g.stroke();
 const hx=cx+cw/2,hy=L.y[2]+56,gy=A.H*.95;if(S.touch){g.strokeStyle=ink();g.lineWidth=4;g.beginPath();g.arc(hx,hy,10,0,7);g.moveTo(hx,hy+10);g.lineTo(hx,gy-22);g.moveTo(hx,hy+18);g.lineTo(hx,L.y[2]+26);g.moveTo(hx,gy-22);g.lineTo(hx-10,gy);g.moveTo(hx,gy-22);g.lineTo(hx+10,gy);g.stroke();
  if(S.zap){g.strokeStyle=CU;g.lineWidth=5;g.setLineDash([6,6]);g.beginPath();g.moveTo(hx+6,L.y[2]+26);g.lineTo(hx+6,gy);g.stroke();g.setLineDash([])}}
 g.strokeStyle=ink();g.lineWidth=2;g.beginPath();g.moveTo(L.x1-20,gy);g.lineTo(A.W-6,gy);g.stroke();
 if(S.flow){g.strokeStyle=CU;g.lineWidth=4;g.setLineDash([10,8]);g.beginPath();g.moveTo(L.x0,L.y[0]-12);g.lineTo(L.x1,L.y[0]-12);g.moveTo(L.x1,L.y[2]-12);g.lineTo(L.x0,L.y[2]-12);g.stroke();g.setLineDash([])}
 pill(blown?'Case: 0 V, safe to touch':S.zap?'Case: 230 V. Current flows through you!':S.earthed?'Earth connected':'Fault: the live wire touches the case',A.W/2,A.H*.08,f1(),blown?SAFE:S.zap?DANGER:null)}
function touch(){if(S.touch&&!S.blown)return;S.touch=true;S.zap=!S.earthed&&!S.blown;S.zap?A.sound.miss():A.sound.pop();
 after(S.zap?'Shock! The case is at 230 V and you are at 0 V, so current flows through you to the ground.':'The fuse has melted, so the live wire is cut off. The case is at 0 V and safe to touch.')}
function fault(){if(!S.earthed||S.blown)return;S.fault=true;S.flow=true;A.sound.whoosh();after('The earth wire gives an easy path. A very large current flows through the live and earth wires...');
 const t=gen;setTimeout(()=>{if(t!==gen)return;S.blown=true;S.flow=false;A.sound.pop();after('...so the fuse melts and cuts off the live wire. The case is safe.')},A.reduced()?30:900)}
function reEarth(){if(S.earthed)return;S.earthed=true;A.sound.tick();after('The earth wire is connected to the metal case again. Now switch the kettle on with the fault.')}
/* step 5: fuse rating */
const APPS=[['lamp',60,3],['iron',1100,5],['kettle',2760,13]],FUSES=[3,5,13];
function drawRating(){const g=A.ctx,i=Math.min(S.app,2),[n,p,f]=APPS[i],I=p/230;
 pill(`${n}: ${p} W on 230 V`,A.W/2,A.H*.12,f1());pill(`I = P ÷ V = ${p} ÷ 230 = ${I.toFixed(2)} A`,A.W/2,A.H*.24,f1());
 FUSES.forEach((r,j)=>{const x=fuseX(j),y=A.H*.55,picked=S.pickF===j;g.fillStyle='#fde68a';A.paint.rrect(x-24,y-50,48,100,10);g.fill();g.strokeStyle=picked?(r===f?SAFE:DANGER):INK;g.lineWidth=picked?5:2;g.stroke();
  g.fillStyle='#94a3b8';g.fillRect(x-24,y-50,48,16);g.fillRect(x-24,y+34,48,16);pill(r+' A',x,y,f1())});
 pill(`Fuses fitted: ${Math.min(S.app,3)} of 3`,A.W/2,A.H*.9,f2())}
const fuseX=j=>A.W*(j+1)/4;
function fit(j){if(S.app>2)return;const [n,p,f]=APPS[S.app],r=FUSES[j],I=p/230;S.pickF=j;
 if(r!==f){A.sound.miss();return after(r<I?`${r} A is less than the ${I.toFixed(1)} A the ${n} needs, so the fuse would melt in normal use.`:`${r} A works, but a fault current could reach nearly ${r} A without melting it. Choose the smallest rating just above ${I.toFixed(2)} A.`)}
 S.app++;A.sound.pop();after(`${r} A is the smallest fuse above ${I.toFixed(2)} A, right for the ${n}.`+(S.app>2?' All three fitted.':` Next: the ${APPS[S.app][0]}.`));S.pickF=null}
function draw(){const g=A.ctx,k=part();g.fillStyle=A.mix(A.col.pn,'#fef9c3',A.col.dark?.05:.35);g.fillRect(0,0,A.W,A.H);
 if(k==='wire')drawPlug();if(k==='probe')drawProbe();if(k==='shock'||k==='earth')drawFault();if(k==='rating')drawRating();if(k==='chal'){WIRES.forEach(([n,cn,col],i)=>{const y=A.H*(.35+i*.2);wire([[A.W*.15,y],[A.W*.85,y]],col,9,i===2);pill(`${n}: ${cn}`,A.W/2,y-20,f2())});pill('Challenge',A.W/2,A.H*.1,f1())}}
function fresh(o){gen++;for(const k in S)delete S[k];Object.assign(S,{to:{},bad:0,hold:null,sw:true,at:null,offLive:false,earthed:false,touch:false,zap:false,fault:false,flow:false,blown:false,app:0,pickF:null,ok:()=>{}},o||{})}
const doneIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts,gap){steps[i].go();const t=gen;acts.forEach((f,j)=>setTimeout(()=>{if(t===gen)f()},A.reduced()?40*(j+1):(gap||600)*(j+1)))}
function after(m){say(m);A.redraw();keys();S.ok()}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='wire'){const i=nextWire();if(i!=null)[['left','N'],['top','E'],['right, through the fuse','L']].forEach(([w,t])=>b(`${WIRES[i][1]} → ${w.split(',')[0]}`,()=>connect(i,t),`Connect the ${WIRES[i][1]} wire to the ${w} terminal`))}
 if(k==='probe'){b(S.sw?'Switch off':'Switch on',toggle);WIRES.forEach(([n],i)=>b(`Probe ${n}`,()=>probe(i),`Measure the ${n} wire with the voltmeter`))}
 if(k==='shock'&&!S.touch)b('Touch the case',touch);
 if(k==='earth'){if(!S.earthed)b('Reconnect the earth',reEarth);else if(!S.blown)b('Switch on with the fault',fault);else if(!S.touch)b('Touch the case',touch)}
 if(k==='rating'&&S.app<3)FUSES.forEach((r,j)=>b(`${r} A fuse`,()=>fit(j),`Fit a ${r} amp fuse to the ${APPS[S.app][0]}`))}
/* pointer: drag wires, tap wires, case or fuses */
function down(p){const k=part();
 if(k==='wire'){const P=plugGeo(),i=[0,1,2].find(j=>!S.to[j]&&Math.hypot(p.x-looseEnd(j,P)[0],p.y-looseEnd(j,P)[1])<26);if(i==null)return false;S.hold={i,x:p.x,y:p.y};A.redraw();return true}
 if(k==='probe'){const L=lanes();if(p.x<L.x0||p.x>L.x1)return false;let i=-1,bd=30;L.y.forEach((y,j)=>{if(Math.abs(p.y-y)<bd){bd=Math.abs(p.y-y);i=j}});if(i===0&&p.x>L.sw+20)i=3;if(i>=0)probe(i);return false}
 if(k==='shock'||k==='earth'){const L=lanes();if(p.x>L.x1){k==='shock'||S.blown?touch():S.earthed?fault():reEarth()}return false}
 if(k==='rating'){const j=FUSES.findIndex((r,j2)=>Math.abs(p.x-fuseX(j2))<34&&Math.abs(p.y-A.H*.55)<56);if(j>=0)fit(j);return false}return false}
function move(p){if(S.hold){S.hold.x=p.x;S.hold.y=p.y;A.redraw()}}
function up(p){if(!S.hold)return;const i=S.hold.i,P=plugGeo();S.hold=null;const t=p&&Object.keys(P.T).find(k=>Math.hypot(p.x-P.T[k][0],p.y-P.T[k][1])<34);t?connect(i,t):A.redraw()}
const steps=[
{h:'Wire the plug',p:'This is a UK plug with the cover off. Drag each coloured wire to its terminal, or use the buttons.',
 predict:{q:'The fuse sits in which wire?',opts:['neutral (blue)','live (brown)','earth (green and yellow)'],ans:1},
 task:'Connect all three wires correctly',show:()=>auto(0,[()=>connect(0,'L'),()=>connect(1,'N'),()=>connect(2,'E')]),
 go:()=>{fresh();say('A plug with the cover off: terminals top, left and right, a fuse by the right one, and three loose wires.');keys();S.ok=doneIf(0,()=>Object.keys(S.to).length===3,'Brown to the right through the fuse, blue left, green-and-yellow top.')}},
{h:'Is it still live?',p:'A voltmeter measures each wire against the earth. Switch the lamp off, then probe the live wire in the cable.',
 predict:{q:'The lamp is switched off. The live wire in its cable is at…',opts:['0 V, because it is off','about 230 V','about 115 V'],ans:1},
 task:'Switch off, then probe the live wire',show:()=>auto(1,[toggle,()=>probe(0)],700),
 go:()=>{fresh();say('A socket on the left, three wires and a lamp on the right. A switch sits in the live wire.');keys();S.ok=doneIf(1,()=>S.offLive,'An open switch does not make the live wire safe to touch.')}},
{h:'A fault, no earth',p:'Inside this kettle the live wire has come loose and touches the metal case. Its earth wire has been cut. Tap the case to touch it.',
 predict:{q:'With no earth wire, touching the case…',opts:['is safe, the kettle still works','gives you a shock','melts the fuse at once'],ans:1},
 task:'Touch the faulty case',show:()=>auto(2,[touch]),
 go:()=>{fresh();say('A faulty kettle: the live wire touches its metal case, and the earth wire is cut.');keys();S.ok=doneIf(2,()=>S.zap,'The case is at 230 V, so the current flows through you instead.')}},
{h:'Earth and fuse together',p:'Reconnect the earth wire. Then switch on with the same fault and watch the fuse.',
 predict:{q:'With the earth connected, when the live wire touches the case…',opts:['nothing happens','a huge current flows to earth and the fuse melts','the neutral wire melts'],ans:1},
 task:'Make the faulty kettle safe',show:()=>auto(3,[reEarth,fault,()=>0,touch],700),
 go:()=>{fresh();say('The same faulty kettle. The earth wire is cut.');keys();S.ok=doneIf(3,()=>S.blown,'Earth wire + fuse: the fault current melts the fuse and cuts the live wire.')}},
{h:'Pick the fuse',p:'Normal current I = P ÷ V. Choose the smallest fuse (3 A, 5 A or 13 A) that is just above it, for each appliance.',
 predict:{q:'Which fuse should a 60 W lamp have?',opts:['13 A, the biggest is safest','3 A','It does not matter'],ans:1},
 task:'Fit the right fuse to all three appliances',show:()=>auto(4,[()=>fit(0),()=>fit(1),()=>fit(2)],700),
 go:()=>{fresh();say('A 60 watt lamp on 230 volts, and fuses of 3, 5 and 13 amps.');keys();S.ok=doneIf(4,()=>S.app>2,'The fuse rating is just above the normal current.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[
 {q:'Which wire carries the 230 V and goes through the fuse?',ans:'The brown live wire',bad:[['The blue neutral wire','neutral'],['The green-and-yellow earth wire','earthlive']]},
 {q:'A lamp is off at its own switch. Why is touching the live wire in its cable still dangerous?',ans:'It is still at 230 V, and you are at 0 V',bad:[['It is not dangerous when switched off','offsafe'],['The neutral wire is now live','swap']]},
 {q:'A metal kettle\'s live wire touches its case. How does the earth wire protect you?',ans:'A large current flows to earth and melts the fuse',bad:[['It stops any current flowing at all','stopflow'],['It soaks up the voltage like a sponge','sponge']]},
 {q:'A hair dryer is rated 1200 W on 230 V. Which fuse should it have?',ans:'13 A',bad:[['5 A','toolow'],['3 A','toolow']]},
 {q:'Why fit a 3 A fuse to a 60 W lamp, not a 13 A one?',ans:'A 13 A fuse might not melt in a fault, so the cable could overheat',bad:[['13 A would make the lamp brighter','brighter'],['A 3 A fuse uses less electricity','useless']]},
 {q:'Why does an appliance with a plastic case and two wires need no earth wire?',ans:'The case cannot become live, because plastic is an insulator',bad:[['They do not use mains electricity','notmains'],['The fuse does the job of the earth','fusealone']]}];
function why(t){let m='Live is brown with the fuse, neutral blue, earth green and yellow.';
 if(t==='neutral')m='The neutral wire completes the circuit and stays near 0 V. The fuse goes in the brown live wire to cut off the 230 V.';
 if(t==='earthlive')m='The earth wire is at 0 V and only carries a current in a fault. The live wire is brown.';
 if(t==='offsafe')m='The switch breaks the circuit at the lamp, but the cable up to it is still joined to the 230 V supply.';
 if(t==='swap')m='Switching off does not swap the wires. The live wire stays at 230 V back to the socket.';
 if(t==='stopflow')m='The earth does not block current. It gives a very easy path, so a big current flows and the fuse melts.';
 if(t==='sponge')m='Voltage is not soaked up. The earth gives an easy path, so a large current melts the fuse.';
 if(t==='toolow')m='I = 1200 ÷ 230 ≈ 5.2 A, more than 5 A, so a 5 A or 3 A fuse would melt in normal use. 13 A is the next size up.';
 if(t==='brighter')m='The fuse does not change how much current the lamp takes. It only melts if the current gets too big.';
 if(t==='useless')m='The fuse does not change the energy used. A rating close to the normal current makes it melt quickly in a fault.';
 if(t==='notmains')m='They do use mains. They are double insulated: the case is plastic, so it cannot become live.';
 if(t==='fusealone')m='The fuse only melts if a big current flows. A plastic case cannot become live in the first place.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],opts=[[Q.ans,'ok'],...Q.bad],r=qn%3,order=opts.slice(r).concat(opts.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(t,Q.ans)});say('Challenge: '+Q.q);A.redraw()}
function mark(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():A.sound.miss();say(ok?'Yes: '+ans+'.':why(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1,draw,onStep:Q=>{quiz.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Plug controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
