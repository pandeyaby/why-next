/* Flagship: climate change basics (ages 9–11; NGSS 5-ESS3-1). Greenhouse blanket, CO₂ sources, CO₂ dial, ice, chain. */
(()=>{
const TEMPS=[-18,-7,4,15,18,21,24];
const CARDS=[['Coal power station',1,'Burning coal gives off lots of CO₂.'],['Wind turbine',0,'A wind turbine uses moving air. Nothing burns, so it adds almost no CO₂ as it runs.'],
 ['Petrol car',1,'Petrol comes from oil. Burning it puts CO₂ out of the exhaust.'],['Solar panels',0,'Solar panels use sunlight. Nothing burns, so they add almost no CO₂ as they work.'],
 ['Gas boiler',1,'A boiler burns gas to heat water, and that makes CO₂.'],['Riding a bike',0,'Your legs push the bike. No fuel burns, so it adds almost no CO₂.'],
 ['Burning a forest',1,'Trees hold carbon. Burning them puts it in the air as CO₂, and dead trees soak up no more.']];
const CHAIN=['Burn coal, oil and gas','More CO₂ in the air','More heat is trapped','Earth warms up','Land ice melts, seas rise'],DECOY='The ozone hole gets bigger';
VIS.reg('flagclimate',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',GREY='#475569',RIM='#94a3b8',PAPER='#ffffff',OK='#047857',NO='#b91c1c',BLUE='#1d4ed8',HEAT='#c2410c',SUNC='#f59e0b',SKY='#dbeafe',AIR='#bfdbfe',LAND='#86efac',SOIL='#a16207',SEA='#60a5fa',ICE='#e0f2fe',PALE='#eef2ff',WIN='#dcfce7';
const MODE=['trap','sort','dial','ice','chain','chal'],mode=()=>MODE[A.step];
const u=n=>Math.round(n*(A.narrow?1:1.1)),fnt=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`;
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function word(s,x,y,n,col,al){Z.font=fnt(n);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-14)}
function split(s,max,n){Z.font=fnt(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function tile(r,fill,edge,lw){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function tileText(r,s,n,col){const L=split(s,r.w-12,n),lh=u(n)+4;L.forEach((l,i)=>word(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col))}
function top(s,good){const r={x:10,y:8,w:A.W-20,h:A.H*.11};tile(r,good?WIN:PALE,good?OK:BLUE,2);tileText(r,s,13,good?OK:INK)}
function foot(){if(!S.msg)return;const L=split((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=u(13)+5,h=L.length*lh+10,y=A.H-h-6;tile({x:10,y,w:A.W-20,h},PAPER,S.bad?NO:OK,3);L.forEach((l,i)=>word(l,A.W/2,y+5+lh*(i+.5),13))}
const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{S.bad=true;S.msg=s;A.sound.miss();speak(s);A.redraw()};
const good=s=>{S.bad=false;S.msg=s;A.sound.pop()};
function arrow(x1,y1,x2,y2,col,w,dash){Z.strokeStyle=col;Z.fillStyle=col;Z.lineWidth=w||3;Z.setLineDash(dash?[6,5]:[]);Z.beginPath();Z.moveTo(x1,y1);Z.lineTo(x2,y2);Z.stroke();Z.setLineDash([]);const a=Math.atan2(y2-y1,x2-x1),k=u(9),tip=d=>Z.lineTo(x2-k*Math.cos(a+d),y2-k*Math.sin(a+d));Z.beginPath();Z.moveTo(x2,y2);tip(-.45);tip(.45);Z.fill()}
function co2(x,y,r){Z.fillStyle='#b91c1c';[-1,1].forEach(s=>{Z.beginPath();Z.arc(x+s*r*1.5,y,r*.85,0,7);Z.fill()});Z.fillStyle='#334155';Z.beginPath();Z.arc(x,y,r,0,7);Z.fill()}
function thermo(x,y,h,t,lo,hi,label){const f=Math.max(0,Math.min(1,(t-lo)/(hi-lo))),w=u(14);tile({x:x-w/2,y,w,h},PAPER,INK,2);Z.fillStyle=t<0?BLUE:HEAT;Z.fillRect(x-w/2+3,y+h-(h-6)*f-3,w-6,(h-6)*f);Z.beginPath();Z.arc(x,y+h+w*.5,w*.8,0,7);Z.fill();word(label,x,y-u(12),13,INK)}
/* step 1: the greenhouse effect */
const band=()=>({x:12,y:A.H*.26,w:A.W*(A.narrow?.72:.66),h:A.H*.2});
const ground=()=>A.H*(A.narrow?.66:.74);
function drawTrap(){const n=S.n,T=TEMPS[n],b=band(),gy=ground(),ok=n===3;
 top(ok?'Greenhouse gases trap heat like a blanket: about 15 °C.':n>3?'Extra gas traps more heat: warmer than 15 °C.':'Tap the air to add greenhouse gas.',ok);
 Z.fillStyle=SKY;Z.fillRect(12,A.H*.14,b.w,gy-A.H*.14);Z.fillStyle=AIR;Z.fillRect(b.x,b.y,b.w,b.h);word('air',b.x+u(18),b.y+b.h-u(9),11,GREY);
 Z.fillStyle=LAND;Z.fillRect(12,gy,b.w,u(16));Z.fillStyle=SOIL;Z.fillRect(12,gy+u(16),b.w,u(10));
 const sx=b.x+u(26),sy=A.H*.19;Z.fillStyle=SUNC;Z.beginPath();Z.arc(sx,sy,u(16),0,7);Z.fill();
 [.3,.5].forEach(f=>arrow(sx+u(14),sy+u(12),b.x+b.w*f,gy-4,SUNC,3));
 const caught=Math.min(6,n*2);for(let i=0;i<6;i++){const x=b.x+b.w*(.42+i*.1);if(i<caught){arrow(x,gy-4,x,b.y+b.h*.6,HEAT,3);arrow(x+u(8),b.y+b.h*.7,x+u(8),gy-6,HEAT,2,true)}else arrow(x,gy-4,x,A.H*.19,HEAT,3)}
 S.mol.slice(0,n).forEach(m=>co2(b.x+b.w*m[0],b.y+b.h*m[1],u(6)));
 const tx=A.narrow?A.W-u(34):A.W*.8;thermo(tx,A.H*.3,A.H*.3,T,-25,30,`${T>0?'+':''}${T} °C`);
 word('sunlight',b.x+4,sy+u(30),11,'#92400e','left');word('heat out',b.x+b.w,A.H*.165,11,HEAT,'right')}
function addGas(d){const n=Math.max(0,Math.min(6,S.n+d));if(n===S.n)return refresh();S.n=n;A.sound.tick();const T=TEMPS[n];
 if(n===3){good('Now Earth averages about 15 °C. With no gas it would be about −18 °C.');return refresh()}
 if(n===0){S.msg='';return miss('No greenhouse gas: all the heat escapes and Earth is about −18 °C. The greenhouse effect keeps us alive.')}
 S.bad=false;S.msg=n>3?`More gas than the natural amount: ${T} °C. Extra gas makes the blanket thicker.`:`${T} °C. Still colder than our real Earth.`;refresh()}
/* step 2: sort what adds CO₂ */
const binR=k=>{const w=(A.W-30)/2,h=A.H*.25;return{x:10+k*(w+10),y:A.H*(A.narrow?.52:.5),w,h}};
const cardR=()=>({x:A.W*.2,y:A.H*.2,w:A.W*.6,h:A.H*.14});
function drawSort(){const t=CARDS[S.i];top(t?'Does it add CO₂ to the air? Tap the right box.':'Burning adds CO₂. Wind, sun and legs add almost none.',!t);
 ['Adds CO₂','Adds almost no CO₂'].forEach((s,k)=>{const r=binR(k);tile(r,k?'#ecfdf5':'#fff7ed',k?OK:HEAT,2.5);word(s,r.x+r.w/2,r.y+u(16),13,k?OK:HEAT);
  S.sorted.filter(j=>CARDS[j][1]!==k).forEach((j,i)=>word(CARDS[j][0],r.x+r.w/2,r.y+u(36)+i*u(15),11,INK))});
 if(t){const r=cardR();tile(r,PAPER,INK,2.5);tileText(r,t[0],15)}
 word(`${S.sorted.length} of ${CARDS.length} sorted`,A.W/2,A.H*.43,12,GREY)}
function drop(k){const t=CARDS[S.i];if(!t)return;const adds=k===0;
 if((t[1]===1)===adds){S.sorted.push(S.i);S.i++;A.sound.tick();good(t[2]);return refresh()}
 miss((adds?'Not this one. ':'Look again. ')+t[2])}
/* step 3: CO₂ dial */
const PPM=[260,500];const warm=p=>Math.max(0,(p-280)/140*1.3);
function plot(){return{x:u(44),w:A.W-u(70),y:A.H*.2,h:A.H*.3}}
const px=(g,p)=>g.x+(p-PPM[0])/(PPM[1]-PPM[0])*g.w,py=(g,t)=>g.y+g.h-t/2.5*g.h;
function slide(){const g=plot();return{x1:g.x,x2:g.x+g.w,y:g.y+g.h+u(48)}}
function drawDial(){const p=S.ppm,g=plot(),ok=p===420,t=warm(p);top(ok?'Today: about 420 ppm, up from 280. About 1.3 °C warmer.':'Drag the knob to today\'s CO₂ level.',ok);
 tile({x:g.x,y:g.y,w:g.w,h:g.h},PAPER,RIM,1.5);Z.strokeStyle='#e2e8f0';Z.lineWidth=1;for(let k=.5;k<2.5;k+=.5){Z.beginPath();Z.moveTo(g.x,py(g,k));Z.lineTo(g.x+g.w,py(g,k));Z.stroke();word(`+${k}`,g.x-4,py(g,k),10,GREY,'right')}
 Z.strokeStyle=HEAT;Z.lineWidth=3;Z.beginPath();Z.moveTo(px(g,280),py(g,0));Z.lineTo(px(g,Math.max(280,p)),py(g,warm(Math.max(280,p))));Z.stroke();
 [[280,'1800s'],[420,'today']].forEach(([q,s])=>{Z.strokeStyle=GREY;Z.setLineDash([4,4]);Z.beginPath();Z.moveTo(px(g,q),g.y);Z.lineTo(px(g,q),g.y+g.h);Z.stroke();Z.setLineDash([]);word(s,px(g,q),g.y+u(10),11,GREY)});
 Z.fillStyle=HEAT;Z.beginPath();Z.arc(px(g,p),py(g,t),u(6),0,7);Z.fill();word('warming °C',g.x+u(4),g.y-u(9),11,GREY,'left');word('CO₂ (ppm)',g.x+g.w,g.y+g.h+u(12),11,GREY,'right');
 const s=slide();Z.strokeStyle=RIM;Z.lineWidth=6;Z.lineCap='round';Z.beginPath();Z.moveTo(s.x1,s.y);Z.lineTo(s.x2,s.y);Z.stroke();Z.lineCap='butt';const kx=s.x1+(p-PPM[0])/(PPM[1]-PPM[0])*(s.x2-s.x1);
 Z.fillStyle='#b45309';Z.beginPath();Z.arc(kx,s.y,u(13),0,7);Z.fill();Z.strokeStyle=PAPER;Z.lineWidth=3;Z.stroke();word(`${p} ppm`,kx,s.y-u(22),12,INK);
 const L=[`CO₂: about ${(p/100).toFixed(1)} in every 10,000 air particles`,`Warming: +${t.toFixed(1)} °C (simple model)`];
 L.forEach((l,i)=>word(l,A.W/2,s.y+u(30)+i*u(17),12,INK))}
function setPpm(p){S.ppm=Math.max(PPM[0],Math.min(PPM[1],p));A.sound.tick();judgeDial()}
function judgeDial(){const p=S.ppm;if(p===420){if(!S.ready){S.ready=true;good('CO₂ is a tiny part of the air, but it traps heat. Going from about 3 to 4 in 10,000 has warmed Earth by about 1.3 °C.')}return refresh()}S.ready=false;S.bad=false;
 S.msg=p<280?'Below the 1800s level.':p===280?'The 1800s level.':p<420?`${p} ppm: CO₂ has been rising since people began burning coal.`:`${p} ppm: higher than today. Keep burning fuels and CO₂ keeps rising.`;refresh()}
/* step 4: land ice and sea ice */
const tankR=k=>{const w=(A.W-40)/2,h=A.H*(A.narrow?.36:.44);return{x:10+k*(w+20),y:A.H*.2,w,h}};
function tank(k){const r=tankR(k),m=k?S.seaM:S.landM,base=r.y+r.h*.55,lvl=k?base:base-m*r.h*.14;tile(r,PAPER,INK,2);
 Z.fillStyle=SEA;Z.fillRect(r.x+2,lvl,r.w-4,r.y+r.h-lvl-2);Z.strokeStyle=BLUE;Z.lineWidth=2;Z.setLineDash([5,4]);Z.beginPath();Z.moveTo(r.x,base);Z.lineTo(r.x+r.w,base);Z.stroke();Z.setLineDash([]);
 if(!k){Z.fillStyle=GREY;Z.fillRect(r.x+r.w*.55,r.y+r.h*.3,r.w*.45-2,r.h*.7-2)}const f=1-m;if(f>0){const bw=r.w*.32*f,bh=r.h*.2*f,bx=r.x+r.w*(k?.3:.62),by=k?lvl-bh*.12:r.y+r.h*.3-bh;Z.fillStyle=ICE;Z.strokeStyle=BLUE;Z.lineWidth=1.5;Z.fillRect(bx,by,bw,bh);Z.strokeRect(bx,by,bw,bh)}
 word(k?'Sea ice (floating)':'Land ice (on rock)',r.x+r.w/2,r.y+r.h+u(14),12,INK);word(m>=1?(k?'level: no change':'level: rose'):'tap to melt',r.x+r.w/2,r.y+r.h+u(30),12,m>=1?(k?GREY:NO):BLUE)}
function drawIce(){const both=S.landM>=1&&S.seaM>=1;top(both?'Land ice adds new water. Floating ice was already in the sea.':'Tap each tank to melt its ice.',both);tank(0);tank(1)}
function melt(k){const key=k?'seaM':'landM';if(S[key]>=1)return;A.sound.whoosh();A.tween(S,{[key]:1},A.reduced()?10:900,'io',()=>{if(mode()!=='ice')return;
 good(k?'Floating ice melted and the level stayed put: it already pushed aside its own weight of water.':'Land ice melted into the sea, so the level rose. Greenland and Antarctica hold land ice.');refresh()})}
/* step 5: the chain */
const linkR=j=>{const cols=2,w=(A.W-30)/cols,h=A.H*(A.narrow?.1:.12);return{x:10+(j%cols)*(w+10),y:A.H*.42+Math.floor(j/cols)*(h+8),w,h}};
function drawChain(){const done=S.k>=CHAIN.length;top(done?'From cause to effect: burning fuels ends in rising seas.':'Tap the cards in order, cause first.',done);
 const got=CHAIN.slice(0,S.k);const L=split(got.length?got.join(' → '):'Start with the cause.',A.W-40,12);L.forEach((l,i)=>word(l,A.W/2,A.H*.2+i*u(17),12,got.length?OK:GREY));
 S.deck.forEach((s,j)=>{const r=linkR(j),used=CHAIN.indexOf(s)>-1&&CHAIN.indexOf(s)<S.k;tile(r,used?WIN:S.miss===j?'#fee2e2':PAPER,used?OK:S.miss===j?NO:INK,used||S.miss===j?3:2);tileText(r,(used?(CHAIN.indexOf(s)+1)+'. ':'')+s,12)})}
function link(j){const s=S.deck[j];if(S.k>=CHAIN.length)return;if(s===CHAIN[S.k]){S.k++;S.miss=null;A.sound.tick();good(S.k>=CHAIN.length?'The whole chain is in order.':`Yes: "${s}". What happens next?`);return refresh()}S.miss=j;
 if(s===DECOY)return miss('The ozone hole is a different problem, about UV light. It is not what warms Earth.');
 if(CHAIN.indexOf(s)<S.k)return refresh();miss(`Not yet: "${s}" comes later. What happens straight after "${S.k?CHAIN[S.k-1]:'the start'}"?`)}
/* pointer */
function down(p){const m=mode();
 if(m==='trap'){const b=band();if(hit(p,{x:b.x,y:A.H*.14,w:b.w,h:ground()-A.H*.14})){if(S.n<6){S.mol[S.n]=[Math.max(.05,Math.min(.95,(p.x-b.x)/b.w)),Math.max(.2,Math.min(.8,(p.y-b.y)/b.h))]}addGas(1);return true}return false}
 if(m==='sort'){const k=[0,1].find(k=>hit(p,binR(k)));if(k!=null){drop(k);return true}return false}
 if(m==='dial'){const s=slide();if(Math.abs(p.y-s.y)<u(26)&&p.x>s.x1-u(26)&&p.x<s.x2+u(26)){S.drag=true;move(p);return true}return false}
 if(m==='ice'){const k=[0,1].find(k=>hit(p,tankR(k)));if(k!=null){melt(k);return true}return false}
 if(m==='chain'){const j=S.deck.findIndex((s,j)=>hit(p,linkR(j)));if(j>-1){link(j);return true}}return false}
function move(p){if(!S.drag)return;{const s=slide(),v=PPM[0]+Math.round((p.x-s.x1)/(s.x2-s.x1)*12)*20,nv=Math.max(PPM[0],Math.min(PPM[1],v));if(nv!==S.ppm){S.ppm=nv;S.ready=false;S.msg='';A.sound.tick();A.redraw()}}}
function up(){if(!S.drag)return;S.drag=false;judgeDial()}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();if(m==='trap')drawTrap();if(m==='sort')drawSort();if(m==='dial')drawDial();if(m==='ice')drawIce();if(m==='chain')drawChain();
 if(m==='chal'){S.n=4;drawTrap()}
 foot();A.fx.draw(Z)}
function refresh(){const m=mode();let s='Challenge.';
 if(m==='trap')s=`${S.n} gas particles; ${Math.min(6,S.n*2)} of 6 heat arrows sent back. Earth: ${TEMPS[S.n]} °C.`;
 if(m==='sort'){const t=CARDS[S.i];s=t?`Card: ${t[0]}. ${S.sorted.length} of 7 sorted.`:'All sorted.'}
 if(m==='dial')s=`CO₂ ${S.ppm} ppm, warming ${warm(S.ppm).toFixed(1)} °C.`;
 if(m==='ice')s=`Land ice ${S.landM>=1?'melted, level rose':'frozen'}. Sea ice ${S.seaM>=1?'melted, level same':'frozen'}.`;
 if(m==='chain')s=S.k>=CHAIN.length?'Chain: '+CHAIN.join(', then ')+'.':`Chain: ${CHAIN.slice(0,S.k).join(', ')||'empty'}.`;
 speak((S.msg?S.msg+' ':'')+s);controls();S.then()}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='trap'){b('+ Gas',()=>{if(S.n<6)S.mol[S.n]=SLOTS[S.n];addGas(1)},'Add greenhouse gas');b('− Gas',()=>addGas(-1),'Remove greenhouse gas')}
 if(m==='sort'&&CARDS[S.i]){b('Adds CO₂',()=>drop(0));b('Adds almost no CO₂',()=>drop(1))}
 if(m==='dial'){b('− 20 ppm',()=>setPpm(S.ppm-20),'Less CO₂');b('+ 20 ppm',()=>setPpm(S.ppm+20),'More CO₂')}
 if(m==='ice'){if(S.landM<1)b('Melt land ice',()=>melt(0));if(S.seaM<1)b('Melt sea ice',()=>melt(1))}
 if(m==='chain'&&S.k<CHAIN.length)S.deck.forEach((s,j)=>b(s,()=>link(j)));
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const SLOTS=[[.15,.35],[.5,.6],[.8,.3],[.3,.75],[.65,.25],[.9,.7]];
const fresh=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},n:0,mol:[],i:0,sorted:[],ppm:280,ready:false,landM:0,seaM:0,k:0,deck:[CHAIN[2],DECOY,CHAIN[0],CHAIN[4],CHAIN[3],CHAIN[1]],drag:false,miss:null,msg:'',bad:false})};
const steps=[
{h:'A blanket of gas',p:'Sunlight warms the ground, and the ground sends heat back up. Gases like CO₂ catch some of it and send it back down.',
predict:{q:'With no greenhouse gases at all, Earth\'s average temperature would be about…',opts:['−18 °C','15 °C, the same','40 °C'],ans:0},
task:'Warm Earth to about 15 °C',show:()=>{steps[0].go();play([0,1,2].map(()=>()=>{S.mol[S.n]=SLOTS[S.n];addGas(1)}),380)},go:()=>{fresh();refresh();S.then=finish(0,()=>S.n===3,'About 15 °C.')}},
{h:'What adds CO₂?',p:'Coal, oil and gas formed from things that lived long ago. Burning them puts their carbon in the air as CO₂.',
task:'Sort all 7 cards',show:()=>{steps[1].go();play(CARDS.map(t=>()=>drop(t[1]?0:1)),330)},go:()=>{fresh();refresh();S.then=finish(1,()=>S.i>=CARDS.length,'Burning adds CO₂.')}},
{h:'Turn up the CO₂',p:'In the 1800s there were about 280 CO₂ particles in every million air particles (280 ppm). Today there are about 420.',
predict:{q:'CO₂ is under 1 part in 2,000 of the air. Can more of it warm Earth?',opts:['Yes: it traps heat','No: there is too little','No: CO₂ cools the air'],ans:0},
task:'Set the dial to today: 420 ppm',show:()=>{steps[2].go();play([0,1,2,3,4,5,6].map(()=>()=>setPpm(S.ppm+20)),240)},go:()=>{fresh();refresh();S.then=finish(2,()=>S.ready,'About 1.3 °C warmer.')}},
{h:'Ice and the sea',p:'A warmer Earth melts ice. Some sits on land, like the sheet on Greenland. Some floats, like the ice at the North Pole.',
predict:{q:'Floating sea ice melts. What happens to the sea level?',opts:['It hardly changes','It rises a lot','It falls'],ans:0},
task:'Melt both kinds of ice',show:()=>{steps[3].go();play([()=>melt(0),()=>melt(1)],600)},go:()=>{fresh();refresh();S.then=finish(3,()=>S.landM>=1&&S.seaM>=1,'Land ice raises the sea.')}},
{h:'Cause and effect',p:'Put the chain in order, from what people do to what happens to the planet. One card does not belong.',
task:'Build the chain',show:()=>{steps[4].go();play(CHAIN.map(s=>()=>link(S.deck.indexOf(s))),420)},go:()=>{fresh();refresh();S.then=finish(4,()=>S.k>=CHAIN.length,'Cause to effect.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['Which gas from burning fuels warms Earth most?','Carbon dioxide (CO₂)',[['Oxygen','oxygen'],['Ozone','ozone']]],
['Is the greenhouse effect good or bad?','Good: it keeps us warm. Extra gas makes it too strong.',[['Bad: we should get rid of it','allBad'],['It has nothing to do with heat','noHeat']]],
['A winter week is very cold. Does that prove Earth is not warming?','No: climate is a long-term average',[['Yes: cold means no warming','weather'],['Yes: warm Earths have no snow','noSnow']]],
['Which raises the sea level more?','Ice on land melting into the sea',[['Floating sea ice melting','seaIce'],['Both raise it the same','same']]],
['How has CO₂ in the air changed since the 1800s?','From about 280 ppm to about 420 ppm',[['No change','noChange'],['It went down','down']]]];
function why(tag){let m='Extra CO₂ from burning fuels traps more heat, so Earth warms.';
 if(tag==='oxygen')m='Burning uses up oxygen. The gas it adds is CO₂.';
 if(tag==='ozone')m='The ozone hole is a separate problem about UV light. The main warming gas is CO₂.';
 if(tag==='allBad')m='Without it Earth would average about −18 °C. The problem is the extra gas.';
 if(tag==='noHeat')m='It is all about heat: the gases catch heat from the ground and send some back.';
 if(tag==='weather')m='One cold week is weather. Climate is the average over about 30 years, and that average is rising.';
 if(tag==='noSnow')m='A warmer world still has snow, just less on average.';
 if(tag==='seaIce')m='Floating ice already pushes aside its own weight of water. Land ice adds new water.';
 if(tag==='same')m='Land ice adds new water; floating ice was already in the sea.';
 if(tag==='noChange')m='Bubbles in old ice and Mauna Loa readings show a rise from about 280 to 420 ppm.';
 if(tag==='down')m='Burning fuels and cutting forests pushed it up, from 280 to about 420 ppm.';
 return m}
function ask(){qi++;const [qq,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});speak('Challenge: '+qq);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Climate lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
