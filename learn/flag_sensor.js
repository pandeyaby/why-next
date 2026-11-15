/* Flagship: LDRs and thermistors (ages 14–16; AQA GCSE Physics 4.2.1.4 "the resistance of a thermistor decreases as
   the temperature increases… the resistance of an LDR decreases as light intensity increases", with their uses in
   sensing circuits; OCR Gateway P3 and Edexcel 2.10 equivalents; series pd sharing, AQA 4.2.2). Dim and brighten a lamp
   over an LDR and plot R, heat a thermistor 0–100 °C and plot R, wire a night light (6 V, LDR + 10 kΩ, switch input
   across the right part), pick the fixed resistor that makes a fire alarm ring at 50 °C, and sort real devices.
   Model parts: LDR R = 20 kΩ × (10 lux ÷ E)^0.7; NTC thermistor 10 kΩ at 25 °C, B = 3950 K. Every tap has a button twin. */
(()=>{
const INK='#0f172a',DIM='#475569',WIRE='#1e3a8a',BG='#ffffff',GO='#047857',NO='#b91c1c',PANEL='#eef2ff',WON='#dcfce7';
const SUNC='#b45309',HOT='#c2410c',COLD='#1d4ed8',GRID='#e2e8f0';
const LUX=[5,50,500,5000],LNAME=['Dark','Dim room','Bright room','Daylight'];
const TEMPS=[0,25,50,75,100];
const rLdr=e=>20000*Math.pow(10/e,.7);
const rTh=t=>10000*Math.exp(3950*(1/(t+273.15)-1/298.15));
const ohms=r=>r>=1000?(r/1000).toFixed(r<10000?1:0)+' kΩ':Math.round(r)+' Ω';
const volts=v=>v.toFixed(v<1?2:1)+' V';
const FIXED=[1000,3600,10000,33000];
const trip=rf=>{const k=Math.log(rf/10000)/3950;return 1/(1/298.15+k)-273.15};/* temperature where the thermistor equals rf */
const DEVICES=[['Street lamp that comes on at dusk',0],['Oven thermostat',1],['Phone screen auto-brightness',0],['Digital fever thermometer',1],['Car engine temperature gauge',1],['Burglar alarm light beam',0]];
VIS.reg('flagsensor',c=>{let A,X,pad,box,qi=-1,score=0;const S={after:()=>{}};
const q=v=>Math.round(v*(A.narrow?1:1.1)),fnt=v=>`700 ${q(v)}px system-ui,sans-serif`;
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function put(s,x,y,v,col,al){X.font=fnt(v);X.fillStyle=col||INK;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)}
function split(s,w,v){X.font=fnt(v);const out=[];let cur='';for(const t of String(s).split(' ')){const n=cur?cur+' '+t:t;if(cur&&X.measureText(n).width>w){out.push(cur);cur=t}else cur=n}out.push(cur);return out}
function panel(r,fill,edge,lw){X.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,8);X.fill();if(edge){X.strokeStyle=edge;X.lineWidth=lw||2;X.stroke()}}
function lead(s,good){const L=split(s,A.W-34,13),lh=q(13)+4,r={x:10,y:8,w:A.W-20,h:Math.max(A.H*.1,L.length*lh+12)};panel(r,good?WON:PANEL,good?GO:WIRE);L.forEach((l,i)=>put(l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,13,good?GO:INK));return r.y+r.h}
function tail(){if(!S.msg)return;const L=split((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=q(13)+5,h=L.length*lh+10,y=A.H-h-6;panel({x:10,y,w:A.W-20,h},BG,S.bad?NO:GO,3);L.forEach((l,i)=>put(l,A.W/2,y+5+lh*(i+.5),13))}
const voice=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const nope=s=>{S.bad=true;S.msg=s;A.sound.miss();refresh()};
const good=s=>{S.bad=false;S.msg=s;A.sound.pop();refresh()};
const part=()=>['ldr','therm','night','alarm','sort'][A.step]||'quiz';
/* small R-against-x chart with labelled points */
function chart(r,pts,labels,ymax,col,ylab){X.fillStyle=BG;X.fillRect(r.x,r.y,r.w,r.h);X.strokeStyle=GRID;X.lineWidth=1;for(let i=1;i<4;i++){const y=r.y+r.h*i/4;X.beginPath();X.moveTo(r.x,y);X.lineTo(r.x+r.w,y);X.stroke()}
 X.strokeStyle=INK;X.lineWidth=2;X.beginPath();X.moveTo(r.x,r.y);X.lineTo(r.x,r.y+r.h);X.lineTo(r.x+r.w,r.y+r.h);X.stroke();put(ylab,r.x+4,r.y-q(9),11,DIM,'left');
 const px=i=>r.x+r.w*(i+.5)/labels.length,py=v=>r.y+r.h*(1-Math.min(1,v/ymax));labels.forEach((l,i)=>put(l,px(i),r.y+r.h+q(11),10,DIM));
 const got=pts.map((v,i)=>v==null?null:[px(i),py(v)]).filter(Boolean);if(got.length>1){X.strokeStyle=col;X.lineWidth=2;X.beginPath();got.forEach(([x,y],j)=>j?X.lineTo(x,y):X.moveTo(x,y));X.stroke()}
 got.forEach(([x,y])=>{X.fillStyle=col;X.beginPath();X.arc(x,y,5,0,7);X.fill()})}
function ldrSym(x,y,s,lit){X.strokeStyle=INK;X.lineWidth=2;X.beginPath();X.arc(x,y,s,0,7);X.stroke();X.strokeRect(x-s*.6,y-s*.25,s*1.2,s*.5);X.strokeStyle=lit?SUNC:DIM;for(const d of [-1,1]){X.beginPath();X.moveTo(x-s*1.5+d*6,y-s*1.5);X.lineTo(x-s*.6+d*6,y-s*.6);X.stroke()}}
function thSym(x,y,s){X.strokeStyle=INK;X.lineWidth=2;X.strokeRect(x-s*.7,y-s*.3,s*1.4,s*.6);X.beginPath();X.moveTo(x-s,y+s*.6);X.lineTo(x+s*.7,y-s*.6);X.lineTo(x+s,y-s*.6);X.stroke()}
/* step 0: LDR under a lamp */
function drawLdr(){const all=LUX.every((_,i)=>S.seen.includes(i));const y0=lead(all?'More light, less resistance: 32 kΩ in the dark down to about 260 Ω in daylight. The drop is steep at first, then levels off.':'Drag the light slider (or use the buttons). Read the resistance at all four light levels.',all);
 const sx=q(24),sw=A.W*.42,sy=y0+q(34);X.fillStyle=GRID;X.fillRect(sx,sy-3,sw,6);LUX.forEach((_,i)=>{const x=sx+sw*i/3;X.fillStyle=S.seen.includes(i)?GO:DIM;X.beginPath();X.arc(x,sy,5,0,7);X.fill()});
 const kx=sx+sw*S.li/3;X.fillStyle=SUNC;X.beginPath();X.arc(kx,sy,q(12),0,7);X.fill();X.strokeStyle=BG;X.lineWidth=3;X.stroke();put(`${LNAME[S.li]}: ${LUX[S.li]} lux`,sx+sw/2,sy+q(24),12,INK);S.slide={x:sx-20,y:sy-26,w:sw+40,h:52};
 const lx=A.W*.76,ly=sy+q(10),g=S.li/3;X.fillStyle=`rgba(250,204,21,${.15+.8*g})`;X.beginPath();X.arc(lx,ly-q(16),q(16),0,7);X.fill();X.strokeStyle=INK;X.lineWidth=1.5;X.stroke();ldrSym(lx,ly+q(30),q(13),S.li>0);
 put(ohms(rLdr(LUX[S.li])),lx,ly+q(58),15,WIRE);
 chart({x:q(40),y:sy+q(84),w:A.W-q(64),h:A.H*.25},LUX.map((e,i)=>S.seen.includes(i)?rLdr(e)/1000:null),LNAME.map(n=>n.split(' ')[0]),35,SUNC,'R (kΩ)')}
function setLight(i){S.li=Math.max(0,Math.min(3,i));if(!S.seen.includes(S.li))S.seen.push(S.li);A.sound.tick();S.bad=false;S.msg=`${LNAME[S.li]} (${LUX[S.li]} lux): the LDR reads ${ohms(rLdr(LUX[S.li]))}.`;refresh()}
/* step 1: thermistor in a water bath */
function drawTherm(){const all=TEMPS.every((_,i)=>S.tseen.includes(i));const y0=lead(all?'Hotter, less resistance: about 34 kΩ at 0 °C, 10 kΩ at 25 °C and 0.7 kΩ at 100 °C. A metal wire does the opposite.':'Drag the water temperature (or use the buttons). Read the thermistor at all five temperatures.',all);
 const sx=q(24),sw=A.W*.42,sy=y0+q(34);X.fillStyle=GRID;X.fillRect(sx,sy-3,sw,6);TEMPS.forEach((_,i)=>{const x=sx+sw*i/4;X.fillStyle=S.tseen.includes(i)?GO:DIM;X.beginPath();X.arc(x,sy,5,0,7);X.fill()});
 const t=TEMPS[S.ti],kx=sx+sw*S.ti/4;X.fillStyle=A.mix(COLD,HOT,t/100);X.beginPath();X.arc(kx,sy,q(12),0,7);X.fill();X.strokeStyle=BG;X.lineWidth=3;X.stroke();put(`Water: ${t} °C`,sx+sw/2,sy+q(24),12,INK);S.tslide={x:sx-20,y:sy-26,w:sw+40,h:52};
 const bx=A.W*.68,by=sy-q(14),bw=q(70),bh=q(56);X.fillStyle=A.mix('#bfdbfe','#fecaca',t/100);X.fillRect(bx,by+bh*.3,bw,bh*.7);X.strokeStyle=INK;X.lineWidth=2;X.beginPath();X.moveTo(bx,by);X.lineTo(bx,by+bh);X.lineTo(bx+bw,by+bh);X.lineTo(bx+bw,by);X.stroke();thSym(bx+bw/2,by+bh*.62,q(11));
 put(ohms(rTh(t)),bx+bw/2,by+bh+q(16),15,WIRE);
 chart({x:q(40),y:sy+q(84),w:A.W-q(64),h:A.H*.25},TEMPS.map((tt,i)=>S.tseen.includes(i)?rTh(tt)/1000:null),TEMPS.map(tt=>tt+'°'),35,HOT,'R (kΩ)')}
function setTemp(i){S.ti=Math.max(0,Math.min(4,i));if(!S.tseen.includes(S.ti))S.tseen.push(S.ti);A.sound.tick();S.bad=false;S.msg=`${TEMPS[S.ti]} °C: the thermistor reads ${ohms(rTh(TEMPS[S.ti]))}.`;refresh()}
/* steps 2–3: a 6 V potential divider; the switch input reads the voltage across one part */
function divider(topName,topR,botName,botR,across,drawTop,drawBot){const y0=S.y0,x=q(36),yT=y0+q(26),yB=A.H*(A.narrow?.66:.7),cx=A.W*.34,mid=(yT+yB)/2;
 X.strokeStyle=WIRE;X.lineWidth=2.5;X.beginPath();X.moveTo(x,yT);X.lineTo(cx,yT);X.lineTo(cx,yB);X.lineTo(x,yB);X.lineTo(x,mid+8);X.moveTo(x,mid-8);X.lineTo(x,yT);X.stroke();
 X.strokeStyle=INK;X.lineWidth=3;X.beginPath();X.moveTo(x-12,mid-8);X.lineTo(x+12,mid-8);X.stroke();X.lineWidth=5;X.beginPath();X.moveTo(x-6,mid+8);X.lineTo(x+6,mid+8);X.stroke();put('6 V',x+q(22),mid,12,INK,'left');
 const pT=(yT+mid)/2,pB=(mid+yB)/2;X.fillStyle=BG;X.fillRect(cx-q(16),pT-q(16),q(32),q(32));X.fillRect(cx-q(16),pB-q(16),q(32),q(32));drawTop(cx,pT);drawBot(cx,pB);
 put(topName,cx+q(22),pT-q(7),11,INK,'left');put(ohms(topR),cx+q(22),pT+q(8),11,WIRE,'left');put(botName,cx+q(22),pB-q(7),11,INK,'left');put(ohms(botR),cx+q(22),pB+q(8),11,WIRE,'left');
 const vT=6*topR/(topR+botR),vB=6-vT,v=across===0?vT:vB,on=v>=2.99,yy=across===0?pT:pB;
 if(across!=null){X.strokeStyle=GO;X.lineWidth=3;X.setLineDash([6,4]);X.strokeRect(cx-q(20),yy-q(22),q(40),q(44));X.setLineDash([])}
 S.yB=yB;S.parts=[{x:cx-q(30),y:pT-q(24),w:q(60),h:q(48)},{x:cx-q(30),y:pB-q(24),w:q(60),h:q(48)}];return {v,on,vT,vB}}
function drawNight(){S.y0=lead(S.nightOk?'Across the LDR: dark makes its resistance big, so it takes most of the 6 V and the lamp comes on. In daylight it takes almost none.':'Tap the part the switch should read. The lamp comes on when that part has 3 V or more. Then try dark and daylight.',S.nightOk);
 const R=rLdr(LUX[S.li]),o=divider('LDR',R,'Fixed',10000,S.across,(x,y)=>ldrSym(x,y,q(12),true),(x,y)=>{X.strokeStyle=INK;X.lineWidth=2;X.strokeRect(x-q(12),y-q(5),q(24),q(10))});
 const lx=A.W*.84,ly=S.y0+q(60);put(LNAME[S.li],lx,ly-q(34),12,INK);X.fillStyle=o.on&&S.across!=null?'#facc15':GRID;X.beginPath();X.arc(lx,ly,q(16),0,7);X.fill();X.strokeStyle=INK;X.lineWidth=2;X.stroke();put(S.across==null?'?':volts(o.v),lx,ly+q(30),14,WIRE);put(S.across==null?'lamp':o.on?'lamp ON':'lamp off',lx,ly+q(48),12,o.on&&S.across!=null?GO:DIM)}
function chooseNight(k){A.sound.tick();S.across=k;S.tests={};S.bad=false;S.msg=k===0?'The switch now reads the LDR. Try the light levels.':'The switch now reads the fixed resistor. Try the light levels.';refresh()}
function nightLight(i){if(S.across==null)return nope('First tap the part the switch should read.');S.li=i;const R=rLdr(LUX[i]),v=S.across===0?6*R/(R+10000):6*10000/(R+10000),on=v>=2.99;S.tests[i]=on;A.sound.tick();
 if(S.across===1&&on&&i===3)return nope(`Daylight: the fixed resistor has ${volts(v)}, so the lamp is on in the day and off at night. Read the LDR instead.`);
 if(S.across===1&&!on&&i===0)return nope(`Dark: the LDR takes most of the 6 V, so the fixed resistor has only ${volts(v)}. The lamp stays off at night.`);
 if(S.across===0&&S.tests[0]===true&&S.tests[3]===false){S.nightOk=true;return good(`${LNAME[i]}: the LDR has ${volts(v)}. Dark gives on, daylight gives off.`)}
 S.bad=false;S.msg=`${LNAME[i]}: the ${S.across===0?'LDR':'fixed resistor'} has ${volts(v)}, so the lamp is ${on?'on':'off'}.`;refresh()}
function drawAlarm(){S.y0=lead(S.alarmOk?'3.6 kΩ matches the thermistor at 50 °C, so each takes 3 V there. Hotter, and the fixed resistor takes more: the alarm rings.':'The alarm rings when the fixed resistor has 3 V or more. Pick its value so the alarm stays quiet at 25 °C and rings at 50 °C.',S.alarmOk);
 const t=S.temp,o=divider('Thermistor',rTh(t),'Fixed',S.rf,1,(x,y)=>thSym(x,y,q(12)),(x,y)=>{X.strokeStyle=INK;X.lineWidth=2;X.strokeRect(x-q(12),y-q(5),q(24),q(10))});
 const ax=A.W*.84,ay=S.y0+q(60);put(`${t} °C`,ax,ay-q(34),13,A.mix(COLD,HOT,t/100));X.fillStyle=o.on?NO:GRID;A.paint.rrect(ax-q(18),ay-q(14),q(36),q(28),6);X.fill();X.strokeStyle=INK;X.lineWidth=2;X.stroke();put(o.on?'RING':'quiet',ax,ay,11,o.on?BG:DIM);put(volts(o.vB),ax,ay+q(30),14,WIRE);
 put(`With ${ohms(S.rf)}, the alarm rings from about ${Math.round(trip(S.rf))} °C`,A.W/2,S.yB+q(22),12,INK)}
function pickFixed(rf){S.rf=rf;S.heard={};A.sound.tick();const tt=Math.round(trip(rf));
 if(rf===3600){S.bad=false;S.msg='3.6 kΩ: now test it at 25 °C and at 50 °C.';return refresh()}
 nope(rf>3600?`${ohms(rf)} rings from about ${tt} °C${tt<=25?', so it rings at room temperature':''}. A bigger fixed resistor takes 3 V sooner. Try a smaller one.`:`${ohms(rf)} waits until about ${tt} °C. A smaller fixed resistor needs the thermistor to fall further. Try a bigger one.`)}
function heat(t){S.temp=t;const v=6*S.rf/(S.rf+rTh(t)),on=v>=2.99;S.heard[t]=on;A.sound.tick();
 if(S.rf===3600&&S.heard[25]===false&&S.heard[50]===true){S.alarmOk=true;return good(`${t} °C: ${volts(v)} across the fixed resistor, so the alarm ${on?'rings':'is quiet'}. Quiet at 25 °C, ringing at 50 °C.`)}
 S.bad=false;S.msg=`${t} °C: thermistor ${ohms(rTh(t))}, fixed resistor ${volts(v)}, alarm ${on?'rings':'quiet'}.`;refresh()}
/* step 4: which sensor? */
function drawSort(){const fin=S.di>=DEVICES.length,y0=lead(fin?'Light in, LDR. Temperature in, thermistor. Both change resistance, and a potential divider turns that into a voltage.':'Which sensor does each device need? Tap the LDR box or the thermistor box.',fin);
 const bw=(A.W-q(44))/2,by=A.H*(A.narrow?.5:.52),bh=q(70);S.bins=[{x:q(16),y:by,w:bw,h:bh},{x:q(28)+bw,y:by,w:bw,h:bh}];
 S.bins.forEach((r,k)=>{panel(r,BG,k?HOT:SUNC,3);if(k)thSym(r.x+q(24),r.y+q(22),q(10));else ldrSym(r.x+q(24),r.y+q(24),q(10),true);put(k?'Thermistor':'LDR',r.x+r.w/2+q(14),r.y+q(22),13,INK);put(`${S.placed.filter(p=>p===k).length} placed`,r.x+r.w/2,r.y+bh-q(16),11,DIM)});
 if(!fin){const L=split(DEVICES[S.di][0],A.W-q(60),15);const h=L.length*q(20)+q(16),cy=(y0+by)/2;panel({x:q(24),y:cy-h/2,w:A.W-q(48),h},PANEL,WIRE,2);L.forEach((l,i)=>put(l,A.W/2,cy-h/2+q(18)+i*q(20),15,INK));put(`Card ${S.di+1} of ${DEVICES.length}`,A.W/2,cy+h/2+q(12),11,DIM)}}
function place(k){if(S.di>=DEVICES.length)return;const [name,ans]=DEVICES[S.di];A.sound.tick();
 if(k!==ans)return nope(ans?`${name} senses temperature, not light. It needs a thermistor.`:`${name} senses light, not heat. It needs an LDR.`);
 S.placed.push(k);S.di++;good(`${name}: ${k?'thermistor':'LDR'}.`)}
/* pointer */
function down(p){const m=part();
 if(m==='ldr'&&isIn(p,S.slide)){S.drag='l';setLight(Math.round((p.x-S.slide.x-20)/(S.slide.w-40)*3));return true}
 if(m==='therm'&&isIn(p,S.tslide)){S.drag='t';setTemp(Math.round((p.x-S.tslide.x-20)/(S.tslide.w-40)*4));return true}
 if((m==='night')&&S.parts){const f=S.parts.findIndex(r=>isIn(p,r));if(f>=0){chooseNight(f);return true}}
 if(m==='alarm'&&S.parts&&isIn(p,S.parts[1])){pickFixed(FIXED[(FIXED.indexOf(S.rf)+1)%FIXED.length]);return true}
 if(m==='sort'&&S.bins){const f=S.bins.findIndex(r=>isIn(p,r));if(f>=0){place(f);return true}}return false}
function move(p){if(S.drag==='l'){const i=Math.round((p.x-S.slide.x-20)/(S.slide.w-40)*3);if(Math.max(0,Math.min(3,i))!==S.li)setLight(i)}
 if(S.drag==='t'){const i=Math.round((p.x-S.tslide.x-20)/(S.tslide.w-40)*4);if(Math.max(0,Math.min(4,i))!==S.ti)setTemp(i)}}
function up(){S.drag=null}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const m=part();if(m==='ldr')drawLdr();if(m==='therm')drawTherm();if(m==='night')drawNight();if(m==='alarm')drawAlarm();if(m==='sort')drawSort();
 if(m==='quiz'){const y=lead('LDR: more light, less resistance. Thermistor: hotter, less resistance. In a divider, the part with more resistance takes more of the voltage.');ldrSym(A.W*.33,y+q(70),q(16),true);thSym(A.W*.67,y+q(70),q(16))}
 tail();A.fx.draw(X)}
function refresh(){const m=part();let s='Challenge.';
 if(m==='ldr')s=`Light level ${LNAME[S.li]}, ${LUX[S.li]} lux. LDR resistance ${ohms(rLdr(LUX[S.li]))}. Levels read: ${S.seen.length} of 4.`;
 if(m==='therm')s=`Water at ${TEMPS[S.ti]} degrees Celsius. Thermistor resistance ${ohms(rTh(TEMPS[S.ti]))}. Temperatures read: ${S.tseen.length} of 5.`;
 if(m==='night')s=`Night light: 6 V across an LDR and a 10 kilohm resistor. Switch reads ${S.across==null?'nothing yet':S.across===0?'the LDR':'the fixed resistor'}. Light: ${LNAME[S.li]}.`;
 if(m==='alarm')s=`Fire alarm: thermistor and a ${ohms(S.rf)} fixed resistor. Water ${S.temp} degrees. Rings from about ${Math.round(trip(S.rf))} degrees.`;
 if(m==='sort')s=S.di<DEVICES.length?`Card ${S.di+1} of 6: ${DEVICES[S.di][0]}.`:'All six devices sorted.';
 voice((S.msg?S.msg+' ':'')+s);buttons();S.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='ldr')LNAME.forEach((n,i)=>b(n,()=>setLight(i),`Set light to ${n}, ${LUX[i]} lux`));
 if(m==='therm')TEMPS.forEach((t,i)=>b(t+' °C',()=>setTemp(i),`Set water to ${t} degrees`));
 if(m==='night'){b('Switch reads LDR',()=>chooseNight(0));b('Switch reads fixed',()=>chooseNight(1));b('Dark',()=>nightLight(0),'Make it dark');b('Daylight',()=>nightLight(3),'Make it daylight')}
 if(m==='alarm'){FIXED.forEach(rf=>b(ohms(rf),()=>pickFixed(rf),'Fixed resistor '+ohms(rf)));[25,50,75].forEach(t=>b(t+' °C',()=>heat(t),`Heat to ${t} degrees`))}
 if(m==='sort'&&S.di<DEVICES.length){b('LDR',()=>place(0),'Put in the LDR box');b('Thermistor',()=>place(1),'Put in the thermistor box')}
 A.redraw()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const queue=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const wipe=()=>{S.run=(S.run||0)+1;Object.assign(S,{after:()=>{},li:0,seen:[0],ti:1,tseen:[1],across:null,tests:{},nightOk:false,rf:10000,temp:25,heard:{},alarmOk:false,di:0,placed:[],drag:null,msg:'',bad:false})};
const steps=[
{h:'Light and an LDR',p:'An LDR (light-dependent resistor) changes its resistance with light. Start in the dark and turn the light up.',
predict:{q:'An LDR goes from daylight into the dark. What happens to its resistance?',opts:['It goes up','It goes down','It stays the same'],ans:0},
task:'Read the LDR at all four light levels',show:()=>{steps[0].go();queue([1,2,3].map(i=>()=>setLight(i)),450)},go:()=>{wipe();refresh();S.after=check(0,()=>S.seen.length===4,'More light, less resistance.')}},
{h:'Heat and a thermistor',p:'A thermistor changes its resistance with temperature. Warm the water from 0 °C to 100 °C.',
predict:{q:'A thermistor is heated. What happens to its resistance?',opts:['It falls','It rises, like a metal wire','It stays the same'],ans:0},
task:'Read the thermistor at all five temperatures',show:()=>{steps[1].go();queue([0,2,3,4].map(i=>()=>setTemp(i)),400)},go:()=>{wipe();refresh();S.after=check(1,()=>S.tseen.length===5,'Hotter, less resistance.')}},
{h:'A night light',p:'In series, the 6 V is shared, and the part with more resistance gets more of it. The switch turns the lamp on at 3 V.',
predict:{q:'Which part should the switch read, so the lamp comes on when it gets dark?',opts:['The LDR','The fixed resistor','It makes no difference'],ans:0},
task:'Make the lamp come on in the dark and go off in daylight',show:()=>{steps[2].go();queue([()=>chooseNight(0),()=>nightLight(0),()=>nightLight(3)],600)},go:()=>{wipe();refresh();S.after=check(2,()=>S.nightOk,'The LDR side.')}},
{h:'A fire alarm',p:'Now the switch reads the fixed resistor. As the thermistor heats up, its resistance falls, so the fixed resistor gets more of the 6 V.',
task:'Make the alarm quiet at 25 °C and ringing at 50 °C',show:()=>{steps[3].go();queue([()=>pickFixed(3600),()=>heat(25),()=>heat(50)],600)},go:()=>{wipe();refresh();S.after=check(3,()=>S.alarmOk,'3.6 kΩ trips at 50 °C.')}},
{h:'Which sensor?',p:'Match each device to the sensor it needs: light or temperature.',
task:'Sort all six devices',show:()=>{steps[4].go();queue(DEVICES.map(([,k])=>()=>place(k)),350)},go:()=>{wipe();refresh();S.after=check(4,()=>S.di>=DEVICES.length,'Light: LDR. Heat: thermistor.')}},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
const QS=[['A room gets brighter. What happens to an LDR in it?','Its resistance falls',[['Its resistance rises','backwardsLdr'],['Its resistance stays the same: light is not electricity','noEffect']]],
['A thermistor is put in boiling water. What happens to its resistance?','It falls',[['It rises, as for a metal wire','wireLike'],['It falls to zero','zero']]],
['An LDR (in series with a fixed resistor, 6 V) gets darker. What happens to the voltage across the LDR?','It rises',[['It falls','divBackwards'],['It stays at 6 V','allVolts']]],
['Which device needs a thermistor?','A fridge thermostat',[['Lights that switch on at dusk','wrongSensorL'],['A phone camera exposure meter','wrongSensorL2']]],
['A fire alarm rings too early, at room temperature. How do you fix it? (The switch reads the fixed resistor.)','Use a smaller fixed resistor',[['Use a bigger fixed resistor','biggerFixed'],['Use a bigger battery','battery']]],
['At 25 °C a thermistor is 10 kΩ. In series with a 10 kΩ resistor on 6 V, what is the voltage across the thermistor?','3 V',[['6 V','allVolts'],['0 V','zeroShare']]]];
function why(tag){let m='Both sensors lose resistance as their input goes up. In a series circuit, the part with more resistance takes more of the voltage.';
 if(tag==='backwardsLdr')m='Light frees charge carriers in the LDR, so more light means less resistance. You saw 32 kΩ in the dark and about 260 Ω in daylight.';
 if(tag==='noEffect')m='The LDR\u2019s material conducts better when light hits it. Its resistance fell from 32 kΩ to 260 Ω.';
 if(tag==='wireLike')m='A metal wire\u2019s resistance rises with temperature, but a (negative temperature coefficient) thermistor\u2019s falls: 10 kΩ at 25 °C, 0.7 kΩ at 100 °C.';
 if(tag==='zero')m='It falls, but not to zero: about 700 Ω at 100 °C.';
 if(tag==='divBackwards')m='Darker means the LDR has more resistance, so it takes a bigger share of the 6 V, not a smaller one.';
 if(tag==='allVolts')m='In series the 6 V is shared between the two parts. Only an open switch or an infinite resistance would take all 6 V.';
 if(tag==='wrongSensorL')m='Switching on at dusk senses light, so that needs an LDR. A thermostat senses temperature.';
 if(tag==='wrongSensorL2')m='An exposure meter measures light, so it uses a light sensor. A thermostat senses temperature.';
 if(tag==='biggerFixed')m='A bigger fixed resistor takes 3 V even sooner, so the alarm rings even earlier. Go smaller: 10 kΩ rang at 25 °C, 3.6 kΩ at 50 °C.';
 if(tag==='battery')m='A bigger battery raises the fixed resistor\u2019s voltage at every temperature, so the alarm rings even earlier. Change the fixed resistor instead.';
 if(tag==='zeroShare')m='Equal resistances in series share the voltage equally: 6 V ÷ 2 = 3 V each.';
 return m}
function ask(){qi++;const [qq,ans,bad]=QS[qi%QS.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});voice('Challenge: '+qq);A.redraw()}
function mark(tag,ans){box.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=box.querySelector('.fl-fb');
 if(ok){score++;A.win()}else{score=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+score+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.12,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sensor lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});wipe()}}).start()})})();
