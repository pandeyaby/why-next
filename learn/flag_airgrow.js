/* Flagship: plants grow from air and water (ages 10–11; NGSS 5-LS1-1 support an argument that plants get the
   materials they need for growth chiefly from air and water; NC England Y3 plants and KS3 photosynthesis).
   Re-run van Helmont's five-year willow pot, sort what adds mass, watch carbon dioxide fall in a sealed jar under a
   lamp, dry the wood and trace its carbon, hydrogen and oxygen back to air and water, then build the word equation.
   Every drag also has a button. */
(()=>{
const TREE=[2.3,5.4,12.1,24.6,45.2,76.7],SOIL=[90.72,90.71,90.70,90.69,90.68,90.66];
const SRC=[['Carbon dioxide from the air',0],['Water taken up by the roots',0],['Minerals from the soil',1],['Sunlight',2],['Warmth from the Sun',2]];
const BIN=['Adds a lot of mass','Adds a tiny bit','Adds no mass'];
const WHY=['Carbon dioxide gas from the air gives the plant its carbon, the biggest part of dry wood.','Water from the roots gives hydrogen and some oxygen, and fills the living cells.','Minerals such as nitrogen and magnesium matter for health, but they are only a few grams in a big tree.','Light is energy, not matter. It powers the food-making but has no mass of its own.','Warmth is energy too. It speeds growth but adds no mass.'];
const ELEM=[['Carbon','about half',0],['Oxygen','about 44%',2],['Hydrogen','about 6%',1]];
const FROM=['Carbon dioxide (air)','Water','Both air and water'];
const EQ=['carbon dioxide','water','glucose','oxygen'],TILES=['oxygen','soil','carbon dioxide','glucose','water','light'];
VIS.reg('flagairgrow',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',RIM='#94a3b8',CARD='#ffffff',OK='#047857',NO='#b91c1c',GOLD='#b45309',BLUE='#1d4ed8',LEAF='#15803d',PALE='#ecfdf5',HOT='#dcfce7',EARTH='#7c4a1e';
const MODE=['pot','sort','jar','dry','eq','chal'],mode=()=>MODE[A.step];
const q=n=>Math.round(n*(A.narrow?1:1.12)),fo=(n,w)=>`${w||700} ${q(n)}px system-ui,sans-serif`;
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function txt(s,x,y,n,col,al,w){Z.font=fo(n,w);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-16)}
function wrap(s,max,n){Z.font=fo(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(r,fill,edge,lw){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function boxText(r,s,n,col){const L=wrap(s,r.w-14,n),lh=q(n)+4;L.forEach((l,i)=>txt(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col||INK,'center',700))}
function banner(s,done){const r={x:10,y:8,w:A.W-20,h:A.H*.11};box(r,done?HOT:PALE,done?OK:LEAF,2);boxText(r,s,13,done?OK:INK)}
function note(){if(!S.msg)return;const L=wrap((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=q(13)+5,h=L.length*lh+10,y=A.H-h-6;box({x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>txt(l,A.W/2,y+5+lh*(i+.5),13))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const wrong=s=>{S.bad=true;S.msg=s;A.sound.miss();tell(s);A.redraw()};
const right=s=>{S.bad=false;S.msg=s;A.sound.pop()};
const kg=v=>v.toFixed(v<10?1:1);
/* step 1: van Helmont's pot */
const potR=()=>({x:A.W*(A.narrow?.28:.36),y:A.H*.56,w:A.W*(A.narrow?.44:.28),h:A.H*.2});
const canR=()=>{const r=S.can||{x:A.W*.05,y:A.H*.2};return{x:r.x,y:r.y,w:q(70),h:q(46)}};
function tree(px,base,y){const h=A.H*(.06+.16*y/5),w=Math.max(3,2+y*2.2);Z.strokeStyle=EARTH;Z.lineWidth=w;Z.lineCap='round';Z.beginPath();Z.moveTo(px,base);Z.lineTo(px,base-h);Z.stroke();
 const r=Math.min(A.W*(.03+.022*y),A.H*.12);Z.fillStyle=LEAF;for(const [dx,dy] of [[0,0],[-.7,.35],[.7,.35],[-.35,-.3],[.35,-.3]]){Z.beginPath();Z.arc(px+dx*r,base-h+dy*r,r*.7,0,7);Z.fill()}}
function drawPot(){const y=S.year,done=y>=5;banner(done?`Tree +${kg(TREE[5]-TREE[0])} kg. Soil −${Math.round((SOIL[0]-SOIL[5])*1000)} g. The mass did not come from the soil.`:'Drag the watering can to the pot, or tap Water for a year. Watch both scales.',done);
 const p=potR();Z.fillStyle=EARTH;Z.beginPath();Z.moveTo(p.x,p.y);Z.lineTo(p.x+p.w,p.y);Z.lineTo(p.x+p.w*.85,p.y+p.h);Z.lineTo(p.x+p.w*.15,p.y+p.h);Z.closePath();Z.fill();Z.strokeStyle=INK;Z.lineWidth=2;Z.stroke();
 txt('soil',p.x+p.w/2,p.y+p.h*.5,12,'#ffffff','center',800);tree(p.x+p.w/2,p.y,y);
 const c0=canR();box(c0,'#dbeafe',BLUE,2);txt('Water',c0.x+c0.w/2,c0.y+c0.h/2,12,BLUE,'center',800);
 const sx=A.narrow?A.W*.74:A.W*.7,sw=A.W-sx-10;[[`Tree ${kg(TREE[y])} kg`,LEAF,.2],[`Soil ${SOIL[y].toFixed(2)} kg`,EARTH,.36]].forEach(([t,col,f])=>{const r={x:sx,y:A.H*f,w:sw,h:q(34)};box(r,CARD,col,2.5);boxText(r,t,12,col)});
 txt(`Year ${y} of 5`,p.x+p.w/2,p.y+p.h+q(14),13,INK,'center',800)}
function water(){if(S.year>=5){right('Five years are done. Look at the two scales.');return refresh()}S.year++;A.sound.tick();const y=S.year;
 right(y<5?`Year ${y}: only rain water added. Tree ${kg(TREE[y])} kg, soil ${SOIL[y].toFixed(2)} kg.`:`Year 5: the tree gained ${kg(TREE[5]-TREE[0])} kg, but the soil lost only ${Math.round((SOIL[0]-SOIL[5])*1000)} grams.`);refresh()}
/* step 2: sort what adds mass */
const binR=j=>{const w=(A.W-20-12)/3;return{x:10+j*(w+6),y:A.H*.5,w,h:A.H*.3}};
const cardR=()=>({x:A.W*.16,y:A.H*.2,w:A.W*.68,h:q(48)});
function drawSort(){const v=SRC[S.i];banner(v?'Where does the new mass come from? Drag the card to a box, or tap a box.':'Most of the mass comes from air and water. Light is energy, not stuff.',!v);
 BIN.forEach((t,j)=>{const b=binR(j);box(b,S.miss===j?'#fee2e2':CARD,S.miss===j?NO:RIM,S.miss===j?3:2);boxText({x:b.x,y:b.y,w:b.w,h:b.h*.5},t,12);const n=S.sorted.filter(x=>x===j).length;txt(n+' cards',b.x+b.w/2,b.y+b.h-q(14),12,SOFT,'center',600)});
 if(v){const r0=cardR(),r=S.drag?{...r0,x:S.drag.x-r0.w/2,y:S.drag.y-r0.h/2}:r0;box(r,'#fffbeb',GOLD,3);boxText(r,v[0],15)}}
function sortPick(j){const v=SRC[S.i];if(!v)return;if(j===v[1]){S.sorted.push(j);S.i++;S.miss=null;right(WHY[S.i-1]);return refresh()}S.miss=j;
 wrong(j===1&&v[1]===0?`Not a tiny bit. ${WHY[S.i]}`:j===0&&v[1]!==0?`Not a lot. ${WHY[S.i]}`:`Not “${BIN[j]}”. ${WHY[S.i]}`)}
/* step 3: sealed jar */
const jarR=()=>({x:A.W*(A.narrow?.08:.14),y:A.H*.18,w:A.W*(A.narrow?.4:.3),h:A.H*.52});
const lampR=()=>({x:A.W*(A.narrow?.54:.5),y:A.H*.2,w:A.W*(A.narrow?.4:.22),h:q(40)});
const hourR=()=>({x:A.W*(A.narrow?.54:.5),y:A.H*.2+q(50),w:A.W*(A.narrow?.4:.22),h:q(40)});
function drawJar(){const done=S.litH>=2&&S.darkH>=1;banner(done?'In light the plant takes in CO₂. In the dark it gives some back.':'Tap the lamp to switch it, then tap Wait 1 hour. Try light and dark.',done);
 const j=jarR();if(S.lamp){Z.fillStyle='rgba(250,204,21,.25)';Z.fillRect(j.x,j.y,j.w,j.h)}box(j,'rgba(255,255,255,0)',INK,3);
 Z.fillStyle=EARTH;Z.fillRect(j.x+j.w*.3,j.y+j.h*.8,j.w*.4,j.h*.18);Z.strokeStyle=LEAF;Z.lineWidth=4;Z.beginPath();Z.moveTo(j.x+j.w/2,j.y+j.h*.8);Z.lineTo(j.x+j.w/2,j.y+j.h*.45);Z.stroke();
 Z.fillStyle=LEAF;[[-1,.55],[1,.5],[-1,.42],[1,.62]].forEach(([s,f])=>{Z.beginPath();Z.ellipse(j.x+j.w/2+s*j.w*.12,j.y+j.h*f,j.w*.11,j.h*.035,s*.4,0,7);Z.fill()});
 const g=Math.round(S.co2/40);Z.fillStyle='#64748b';for(let k=0;k<g;k++){const x=j.x+10+(j.w-20)*((k*.618034)%1),y=j.y+10+(j.h*.36)*((k*.414214+k*k*.0137)%1);Z.beginPath();Z.arc(x,y,3.5,0,7);Z.fill()}
 const L=lampR();box(L,S.lamp?'#fef9c3':CARD,S.lamp?GOLD:RIM,2.5);boxText(L,S.lamp?'Lamp: ON':'Lamp: OFF',13,S.lamp?GOLD:INK);
 const H=hourR();box(H,CARD,BLUE,2.5);boxText(H,'Wait 1 hour',13,BLUE);
 const m={x:L.x,y:H.y+q(56),w:L.w,h:q(44)};box(m,'#f1f5f9',INK,2);boxText(m,`CO₂ meter: ${S.co2} ppm`,13,INK);
 txt(`Hours: ${S.litH} in light, ${S.darkH} in dark`,L.x+L.w/2,m.y+m.h+q(14),11,SOFT,'center',700)}
function lamp(){S.lamp=!S.lamp;A.sound.tick();right(S.lamp?'Lamp on. Now wait an hour.':'Lamp off: the jar is dark. Now wait an hour.');refresh()}
function hour(){if(S.lamp){S.co2=Math.max(380,S.co2-120);S.litH++;right(`An hour in the light: CO₂ fell to ${S.co2} ppm. The leaves used it to make food.`)}else{S.co2+=30;S.darkH++;right(`An hour in the dark: CO₂ rose to ${S.co2} ppm. With no light the plant only respires and gives CO₂ out.`)}A.sound.tick();refresh()}
/* step 4: dry the wood, trace the atoms */
const ovenR=()=>({x:A.W*.62,y:A.H*.18,w:A.W*.32,h:A.H*.24});
const logR=()=>{const r=S.drag&&S.drag.log?{x:S.drag.x-A.W*.13,y:S.drag.y-q(18)}:{x:A.W*.08,y:A.H*.22};return{x:r.x,y:r.y,w:A.W*.26,h:q(36)}};
const srcR=j=>{const w=(A.W-20-12)/3;return{x:10+j*(w+6),y:A.H*.68,w,h:q(44)}};
function drawDry(){const e=ELEM[S.i],done=S.dried&&!e;banner(!S.dried?'Drag the fresh wood into the oven, or tap Dry it.':e?`${e[0]} is ${e[1]} of dry wood. Where did it come from?`:'Carbon from air, hydrogen from water, oxygen from both.',done);
 const o=ovenR();if(!S.dried){box(o,'#fee2e2',NO,2.5);boxText(o,'Oven',14,NO)}
 if(!S.dried){const l=logR();box(l,'#a16207',INK,2);boxText(l,'Fresh wood 10 kg',12,'#ffffff')}
 else{const bx=A.W*.08,bw=A.W*.5,by=A.H*.22;txt('10 kg fresh = 5 kg water + 5 kg dry wood',bx,by,12,INK,'left',800);
  ELEM.forEach((x,j)=>{const w=bw*(j===0?.5:j===1?.44:.06)/.5,r={x:bx,y:by+q(18)+j*q(26),w:Math.max(6,w*.5),h:q(20)};Z.fillStyle=j===S.i?GOLD:S.i>j?OK:'#94a3b8';Z.fillRect(r.x,r.y,r.w,r.h);txt(`${x[0]} ${x[1]}`,r.x+r.w+6,r.y+r.h/2,11,INK,'left',700)});
  if(e)FROM.forEach((t,j)=>{const b=srcR(j);box(b,S.miss===j?'#fee2e2':CARD,S.miss===j?NO:RIM,S.miss===j?3:2);boxText(b,t,11)})}}
function dry(){if(S.dried)return;S.dried=true;A.sound.whoosh();right('Drying drove off about half the mass as water vapour. What is left is carbon, oxygen and hydrogen, plus under 1% minerals as ash.');refresh()}
const TRACE=['Carbon comes only from carbon dioxide in the air. Soil water has no carbon in it.','Oxygen comes from both: CO₂ and H₂O each contain oxygen atoms.','Hydrogen comes from water, H₂O. Carbon dioxide, CO₂, has no hydrogen.'];
function trace(j){const e=ELEM[S.i];if(!e)return;if(j===e[2]){S.i++;S.miss=null;right(TRACE[S.i-1]);return refresh()}S.miss=j;
 wrong(e[0]==='Carbon'?(j===1?'Water is H₂O: it has no carbon. The carbon must come from CO₂ in the air.':'Only the air has carbon here. Water is H₂O, with no carbon.'):e[0]==='Hydrogen'?(j===0?'CO₂ has no hydrogen atoms. Hydrogen comes from water, H₂O.':'CO₂ has no hydrogen, so it cannot come from both. It is from water.'):'Both CO₂ and H₂O have oxygen atoms, so the oxygen comes from both.')}
/* step 5: word equation */
const slotR=k=>{const w=(A.W-40)/4.6,gap=(A.W-20-4*w)/3.2;const xs=[10,10+w+gap*.6,A.W-10-2*w-gap*.6,A.W-10-w];return{x:xs[k],y:A.H*.24,w,h:q(42)}};
const tileR=k=>{const w=(A.W-20-10)/3;return{x:10+(k%3)*(w+5),y:A.H*.52+Math.floor(k/3)*(q(42)+8),w,h:q(42)}};
function drawEq(){const done=S.k>=4;banner(done?'carbon dioxide + water → glucose + oxygen, powered by light.':'Build the word equation. Tap the tiles in order, or drag one to the next gap.',done);
 for(let k=0;k<4;k++){const r=slotR(k);box(r,S.k>k?HOT:CARD,S.k===k?GOLD:RIM,S.k===k?3:2);if(S.k>k)boxText(r,EQ[k],11,OK)}
 const a=slotR(1),b=slotR(2);txt('+',(slotR(0).x+slotR(0).w+a.x)/2,a.y+a.h/2,16);txt('+',(b.x+b.w+slotR(3).x)/2,a.y+a.h/2,16);
 Z.strokeStyle=INK;Z.lineWidth=2.5;const ax0=a.x+a.w+4,ax1=b.x-4,ay=a.y+a.h/2;Z.beginPath();Z.moveTo(ax0,ay);Z.lineTo(ax1,ay);Z.lineTo(ax1-7,ay-5);Z.moveTo(ax1,ay);Z.lineTo(ax1-7,ay+5);Z.stroke();txt('light',(ax0+ax1)/2,ay-q(14),10,GOLD,'center',800);
 TILES.forEach((t,k)=>{if(S.used.includes(t))return;const r0=tileR(k),r=S.drag&&S.drag.tile===k?{...r0,x:S.drag.x-r0.w/2,y:S.drag.y-r0.h/2}:r0;box(r,S.miss===t?'#fee2e2':'#fffbeb',S.miss===t?NO:GOLD,2.5);boxText(r,t,12)})}
function place(t){if(S.k>=4)return;if((S.k<2&&EQ.slice(0,2).includes(t)&&!S.used.includes(t))||(S.k>=2&&EQ.slice(2).includes(t)&&!S.used.includes(t))){const i=EQ.indexOf(t);if(i!==S.k)[EQ[S.k],EQ[i]]=[EQ[i],EQ[S.k]];S.used.push(t);S.k++;S.miss=null;right(S.k===2?'Reactants done: the plant takes in carbon dioxide and water.':S.k===4?'Products: glucose for growth and oxygen let out into the air.':`${t} goes in.`);return refresh()}
 S.miss=t;wrong(t==='soil'?'Soil is not used up: van Helmont\'s soil lost only grams. The reactants are carbon dioxide and water.':t==='light'?'Light is energy, not a substance, so it goes over the arrow, not in a gap.':t==='oxygen'&&S.k<2?'Oxygen is made and let out by the leaf, so it is a product, not a reactant.':S.k<2?`${t} is made by the leaf, so it is a product. Start with what goes in.`:`${t} goes in, so it is a reactant. After the arrow come the products.`)}
/* pointer */
function down(p){const m=mode();
 if(m==='pot'){if(inR(p,canR())){S.drag={can:1,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}if(inR(p,potR())){water();return true}return false}
 if(m==='sort'){if(!SRC[S.i])return false;if(inR(p,cardR())){S.drag={x:p.x,y:p.y};return true}const j=[0,1,2].find(j=>inR(p,binR(j)));if(j!=null){sortPick(j);return true}return false}
 if(m==='jar'){if(inR(p,lampR())){lamp();return true}if(inR(p,hourR())){hour();return true}return false}
 if(m==='dry'){if(!S.dried){if(inR(p,logR())){S.drag={log:1,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}if(inR(p,ovenR())){dry();return true}return false}const j=[0,1,2].find(j=>inR(p,srcR(j)));if(j!=null&&ELEM[S.i]){trace(j);return true}return false}
 if(m==='eq'){const k=TILES.findIndex((t,k)=>!S.used.includes(t)&&inR(p,tileR(k)));if(k>=0){S.drag={tile:k,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}}return false}
function move(p){if(S.drag){S.drag={...S.drag,x:p.x,y:p.y};if(S.drag.can)S.can={x:p.x-q(35),y:p.y-q(23)};A.redraw()}}
function up(p){if(!S.drag)return;const d=S.drag,at=p||d,tap=d.x0!=null&&Math.hypot(at.x-d.x0,at.y-d.y0)<8;S.drag=null;const m=mode();
 if(m==='pot'){S.can=null;if(tap||inR(at,potR())||inR(at,{x:potR().x,y:A.H*.2,w:potR().w,h:A.H*.4}))return water();return wrong('Pour the water over the pot of soil.')}
 if(m==='sort'){const j=[0,1,2].find(j=>inR(at,binR(j)));if(j!=null)return sortPick(j)}
 if(m==='dry'){if(tap||inR(at,ovenR()))return dry();return wrong('Drop the wood inside the oven to dry it.')}
 if(m==='eq'){if(tap||at.y<A.H*.45)return place(TILES[d.tile])}A.redraw()}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();if(m==='pot')drawPot();if(m==='sort')drawSort();if(m==='jar')drawJar();if(m==='dry')drawDry();if(m==='eq')drawEq();
 if(m==='chal'){banner('A plant is built mostly from air and water, using light energy.');const p=potR();tree(p.x+p.w/2,p.y,5)}
 note();A.fx.draw(Z)}
function refresh(){const m=mode();let s='Challenge.';
 if(m==='pot')s=`Year ${S.year} of 5. Tree ${kg(TREE[S.year])} kilograms, soil ${SOIL[S.year].toFixed(2)} kilograms.`;
 if(m==='sort'){const v=SRC[S.i];s=v?`Card: ${v[0]}. ${BIN.join(', ')}? Sorted ${S.sorted.length} of ${SRC.length}.`:'All five cards sorted.'}
 if(m==='jar')s=`Lamp ${S.lamp?'on':'off'}. Carbon dioxide ${S.co2} parts per million. Hours: ${S.litH} in light, ${S.darkH} in dark.`;
 if(m==='dry'){const e=ELEM[S.i];s=!S.dried?'Fresh wood, 10 kilograms, not dried yet.':e?`${e[0]} is ${e[1]} of dry wood. Source? ${FROM.join(', ')}.`:'All three elements traced.'}
 if(m==='eq')s=`Equation: ${EQ.slice(0,S.k).join(', ')||'empty'}. ${S.k<4?`Gap ${S.k+1} of 4. Tiles: ${TILES.filter(t=>!S.used.includes(t)).join(', ')}.`:'Complete.'}`;
 tell((S.msg?S.msg+' ':'')+s);btns();S.then()}
function btns(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='pot')b('Water for a year',water,'Water the willow and let one year pass');
 if(m==='sort'&&SRC[S.i])BIN.forEach((t,j)=>b(t,()=>sortPick(j),`${SRC[S.i][0]}: ${t}`));
 if(m==='jar'){b(S.lamp?'Lamp off':'Lamp on',lamp);b('Wait 1 hour',hour)}
 if(m==='dry'){if(!S.dried)b('Dry it',dry,'Dry the fresh wood in the oven');else if(ELEM[S.i])FROM.forEach((t,j)=>b(t,()=>trace(j),`${ELEM[S.i][0]} came from ${t}`))}
 if(m==='eq'&&S.k<4)TILES.forEach(t=>{if(!S.used.includes(t))b(t,()=>place(t),`Put ${t} in gap ${S.k+1}`)});
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const reset=()=>{S.run=(S.run||0)+1;EQ.splice(0,4,'carbon dioxide','water','glucose','oxygen');Object.assign(S,{then:()=>{},i:0,year:0,can:null,sorted:[],drag:null,miss:null,lamp:false,co2:900,litH:0,darkH:0,dried:false,k:0,used:[],msg:'',bad:false})};
const steps=[
{h:'The willow in a pot',p:'In the 1600s Jan Baptist van Helmont weighed some dried soil, planted a small willow in it, and gave it only rain water for five years.',
predict:{q:'The willow gains about 74 kg in five years. How much mass does the soil lose?',opts:['Almost none: about 60 grams','About 74 kg, the same as the tree','About half: 37 kg'],ans:0},
task:'Let 5 years pass',show:()=>{steps[0].go();play([0,1,2,3,4].map(()=>water),400)},go:()=>{reset();refresh();S.then=finish(0,()=>S.year>=5,'The soil hardly changed.')}},
{h:'What adds the mass?',p:'A plant takes in several things to grow. Decide how much mass each one adds.',
predict:{q:'A plant needs sunlight to grow. Does light add mass to the plant?',opts:['No: light is energy, not matter','Yes, most of the mass','Yes, about half'],ans:0},
task:'Sort 5 cards',show:()=>{steps[1].go();play(SRC.map(v=>()=>sortPick(v[1])),400)},go:()=>{reset();refresh();S.then=finish(1,()=>S.i>=SRC.length,'Air and water add the mass.')}},
{h:'Leaf in a sealed jar',p:'A plant sits in a sealed jar with a carbon dioxide (CO₂) meter. Run it in the light and in the dark.',
predict:{q:'The lamp is on for an hour. What happens to the CO₂ in the jar?',opts:['It goes down','It goes up','It stays the same'],ans:0},
task:'Run 2 hours of light and 1 of dark',show:()=>{steps[2].go();play([lamp,hour,hour,lamp,hour],450)},go:()=>{reset();refresh();S.then=finish(2,()=>S.litH>=2&&S.darkH>=1,'Leaves take CO₂ from the air in light.')}},
{h:'Dry the wood',p:'Fresh wood is about half water. Dry it, then trace each element in the dry wood back to where it came from.',
predict:{q:'After drying, what is most of the dry wood made of?',opts:['Carbon, oxygen and hydrogen from air and water','Minerals from the soil','Stored sunlight'],ans:0},
task:'Dry it and trace 3 elements',show:()=>{steps[3].go();play([dry,...ELEM.map(e=>()=>trace(e[2]))],450)},go:()=>{reset();refresh();S.then=finish(3,()=>S.dried&&S.i>=ELEM.length,'Dry wood is built from air and water.')}},
{h:'The word equation',p:'Photosynthesis in the leaf: what goes in (reactants) on the left, what is made (products) on the right. Light powers it.',
task:'Fill 4 gaps',show:()=>{steps[4].go();play(['carbon dioxide','water','glucose','oxygen'].map(t=>()=>place(t)),400)},go:()=>{reset();refresh();S.then=finish(4,()=>S.k>=4,'CO₂ + water → glucose + oxygen.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['Where does most of the mass of a big oak tree come from?','Carbon dioxide from the air, and water',[['Soil the roots eat','soil'],['Sunlight stored in the wood','light']]],
['Van Helmont\'s soil lost only about 60 grams. What does that show?','The tree\'s 74 kg did not come from the soil',[['The tree ate 60 grams of soil','ate'],['He weighed it wrong','error']]],
['Which gas does a leaf take in to make food?','Carbon dioxide',[['Oxygen','oxygen'],['Nitrogen','nitrogen']]],
['Why are minerals from the soil still needed?','Small amounts keep the plant healthy',[['They make most of the wood','mineralmass'],['They are the plant\'s food','food']]],
['A potted plant in a dark cupboard for a week. What happens to its mass?','It does not gain mass; it uses up food',[['It grows as normal','dark'],['It gains mass from the soil','soil2']]],
['Which word equation is photosynthesis?','carbon dioxide + water → glucose + oxygen',[['oxygen + water → glucose + carbon dioxide','swap'],['soil + water → glucose + oxygen','soilreact']]]];
function why(tag){let m='Plants build their mass mostly from carbon dioxide and water, using light energy.';
 if(tag==='soil')m='Roots do not eat soil. Van Helmont\'s tree gained 74 kg while the soil lost about 60 grams.';
 if(tag==='light')m='Light is energy, not matter. It powers photosynthesis but adds no mass.';
 if(tag==='ate')m='60 grams is tiny next to 74 kg. Those grams were mostly minerals; the bulk came from air and water.';
 if(tag==='error')m='His result has been repeated many times: soil mass barely changes while a plant grows.';
 if(tag==='oxygen')m='Oxygen is given out by the leaf. The gas it takes in to make glucose is carbon dioxide.';
 if(tag==='nitrogen')m='Air is mostly nitrogen, but leaves cannot use the gas. They take in carbon dioxide.';
 if(tag==='mineralmass')m='Minerals are under 1% of dry wood, like vitamins for us. Most of the wood is from air and water.';
 if(tag==='food')m='Plant food is glucose, made in the leaves. Minerals are not food; they help it stay healthy.';
 if(tag==='dark')m='With no light there is no photosynthesis, so the plant cannot make food or gain mass.';
 if(tag==='soil2')m='Soil does not give the plant mass. In the dark it burns stored food and slowly loses mass.';
 if(tag==='swap')m='That is the wrong way round: carbon dioxide and water go in; glucose and oxygen come out.';
 if(tag==='soilreact')m='Soil is not a reactant. Carbon dioxide from the air is what goes in beside water.';
 return m}
function ask(){qi++;const [qq,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+qq);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Plant growth lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
