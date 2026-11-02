/* Flagship – growing from a seed (ages 4–5). Plant and water a seed; slide the days to see a bean's root come out first
   and turn down whichever way it lies; test window, cupboard and fridge; label root, shoot, leaf; order the life story. */
(()=>{
const SEEDS=[{n:'bean',col:'#9a5b34',w:1.3},{n:'sunflower seed',col:'#4b4f58',w:.9},{n:'pea',col:'#6f9a3a',w:1}];
const LIE=[{a:0,say:'This bean lies the right way up.'},{a:Math.PI/2,say:'This bean lies on its side.'},{a:Math.PI,say:'This bean is upside down!'}];
const SPOTS=[{e:'☀️',n:'Sunny window',warm:1,light:1},{e:'🌑',n:'Dark cupboard',warm:1},{e:'❄️',n:'Cold fridge'}];
const PARTS=[{n:'root',where:'under the soil',why:'The root is the white part under the soil. It drinks water.'},{n:'shoot',where:'the stem',why:'The shoot is the green stem. It grows up to the light.'},{n:'leaf',where:'at the top',why:'A leaf is flat and green, at the top. It uses light to make food.'}];
const LIFE=[['seed',0],['tiny root',3.2],['seedling',6.5],['big plant',11]],DECK=[0,2,0,1];/* deck spots for cards 1-3 (card 0 starts in line) */
const DAYS=8;
VIS.reg('flagseed',c=>{let A,pad,quiz,qn=-1,gen=0,streak=0;c.fig.classList.add('young');
const blank=()=>({r:0,n:0,ok:0,busy:0,bad:-1,drag:null,after:()=>{},sown:0,wet:0,day:0,tried:[],at:-1,lined:1,fast:0}),S=blank();
const phase=()=>['plant','sprout','needs','parts','life','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.12)),quick=()=>A.reduced()||S.fast;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function write(g,t,x,y,maxw,px,col,wt){g.font=`${wt||700} ${z(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const rows=[];let cur='';String(t).split(' ').forEach(w=>{const n=cur?cur+' '+w:w;if(g.measureText(n).width>maxw&&cur){rows.push(cur);cur=w}else cur=n});rows.push(cur);
 rows.forEach((s,i)=>g.fillText(s,x,y+(i-(rows.length-1)/2)*z(px)*1.25))}
function emoji(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function tile(g,r,fill,edge,lw,dash){g.save();A.paint.shadow(6,2,.14);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();A.paint.noShadow();if(dash)g.setLineDash([7,5]);g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.stroke();g.restore()}
function seedAt(g,x,y,s,k,rot){const sd=SEEDS[k||0];g.save();g.translate(x,y);g.rotate(rot||0);g.fillStyle=sd.col;g.beginPath();g.ellipse(0,0,s*sd.w*.5,s*.42,0,0,7);g.fill();
 g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=1.5;g.stroke();g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.ellipse(0,s*.26,s*.12,s*.06,0,0,7);g.fill();g.restore()}
/* walk a growing tip from p, starting at angle a0, turning a little each step toward angle aim (down for roots, up for shoots) */
function grow(p,a0,aim,len){const pts=[{...p}];let a=a0,x=p.x,y=p.y;for(let s=0;s<len;s+=3){let d=Math.atan2(Math.sin(aim-a),Math.cos(aim-a));if(Math.abs(d)>3.1)d=.2;a+=Math.sign(d)*Math.min(Math.abs(d),.07);x+=Math.cos(a)*3;y+=Math.sin(a)*3;pts.push({x,y})}return pts}
function stroke(g,pts,col,w){g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.beginPath();pts.forEach((q,i)=>i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y));g.stroke()}
/* a bean at x,y after `day` days, lying at angle rot; pale = grown in the dark. Returns the root, shoot and leaf points */
function plant(g,x,y,s,day,rot,pale){const C=A.col,down=Math.PI/2,root=Math.max(0,Math.min(1,(day-1.5)/6))*s*2.4,sh=Math.max(0,Math.min(1,(day-3.5)/5))*s*2.6+(day>8?(day-8)*s*.5:0);
 const p={x:x+Math.cos(rot+down)*s*.3,y:y+Math.sin(rot+down)*s*.3},R=grow(p,rot+down,down,root),T=grow(p,rot-down,-down,sh);
 stroke(g,R,A.dark?'#e9e2cf':'#a08a62',Math.max(2,s*.1));const green=pale?'#c9b84a':'#3f9a3a';stroke(g,T,green,Math.max(3,s*.14));const tip=T[T.length-1];
 if(day>=6){const L=s*Math.min(1.3,.5+(day-6)*.18);[-1,1].forEach(k=>{g.fillStyle=pale?'#ddd07a':'#4caf4f';g.beginPath();g.ellipse(tip.x+k*L*.55,tip.y,L*.6,L*.28,k*-.5,0,7);g.fill()})}
 if(day>=10){g.fillStyle='#f2c230';g.beginPath();g.arc(tip.x,tip.y-s*.4,s*.4,0,7);g.fill();g.fillStyle='#7a4a1f';g.beginPath();g.arc(tip.x,tip.y-s*.4,s*.16,0,7);g.fill()}
 seedAt(g,x,y,s,0,rot);return[R[Math.floor(R.length*.6)],T[Math.floor(T.length*.5)]||p,tip]}
function pot(g,x,y,w,wet,col){const h=w*.8;g.fillStyle=col||'#c46a3b';g.beginPath();g.moveTo(x-w/2,y);g.lineTo(x+w/2,y);g.lineTo(x+w*.38,y+h);g.lineTo(x-w*.38,y+h);g.closePath();g.fill();g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=2;g.stroke();
 g.fillStyle=wet?'#4a2f1c':'#8a6243';g.beginPath();g.ellipse(x,y,w/2,w*.1,0,0,7);g.fill()}
const potSpot=()=>({x:A.W/2,y:A.H*.56,w:z(150)});
const homes=()=>({seed:{x:A.W*.2,y:A.H*.24},drop:{x:A.W*.8,y:A.H*.24}});
const track=()=>({x0:A.W*.12,x1:A.W*.88,y:A.H*.88});
const jar=()=>{const w=z(170),h=A.H*.6;return{x:A.W/2-w/2,y:A.H*.13,w,h}};
const boxes=n=>{const w=Math.min(z(130),(A.W-24-(n-1)*10)/n),h=z(118),x0=(A.W-(w*n+(n-1)*10))/2;return Array.from({length:n},(_,j)=>({x:x0+j*(w+10),y:A.H-h-12,w,h}))};
const lineRow=()=>{const r=boxes(4);return r.map(b=>({...b,y:A.H*.14}))};
const deck=()=>{const r=boxes(3);return LIFE.map((_,j)=>j?r[DECK[j]]:r[0])};
const partSpots=()=>(S.pts||[]).map(q=>({...q,r:z(36)}));
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=phase(),d=S.drag,hm=homes();
 if(p==='quiz'){write(g,'Water and warmth wake a seed. Root first, then shoot.',W/2,H*.45,W-40,19,C.tx,800);return}
 if(p==='plant'){const ps=potSpot(),sd=SEEDS[S.r];write(g,S.ok?`The ${sd.n} is planted and watered.`:S.sown?'Now drag the water onto the pot.':`Drag the ${sd.n} into the hole.`,W/2,H*.08,W-30,16,S.ok?C.gr:C.tx,800);
  pot(g,ps.x,ps.y,ps.w,S.wet);if(!S.sown){g.fillStyle='#2b1b10';g.beginPath();g.ellipse(ps.x,ps.y,ps.w*.12,ps.w*.04,0,0,7);g.fill();g.strokeStyle=C.am;g.setLineDash([5,4]);g.lineWidth=2.5;g.beginPath();g.arc(ps.x,ps.y,z(30),0,7);g.stroke();g.setLineDash([])}
  else seedAt(g,ps.x,ps.y+2,z(26),S.r,0);
  if(!S.sown){const at=d&&d.what==='seed'&&d.x!=null?d:hm.seed;g.fillStyle=A.alpha(C.am,.14);g.beginPath();g.arc(at.x,at.y,z(42),0,7);g.fill();seedAt(g,at.x,at.y,z(40),S.r,0);write(g,sd.n,hm.seed.x,hm.seed.y+z(52),z(120),14,C.tx,800)}
  if(!S.wet){const at=d&&d.what==='drop'&&d.x!=null?d:hm.drop;g.fillStyle=A.alpha(C.cy,.14);g.beginPath();g.arc(at.x,at.y,z(42),0,7);g.fill();emoji(g,'💧',at.x,at.y,z(50));write(g,'water',hm.drop.x,hm.drop.y+z(52),z(100),14,C.tx,800)}}
 if(p==='sprout'){const j=jar(),lie=LIE[S.r],t=track();tile(g,j,A.alpha(C.cy,.1),A.alpha(C.cy,.8),3);
  write(g,S.day<1?lie.say:S.day<3.5?'A root comes out first!':S.day<6?'Now a shoot pushes up.':'Leaves! It is a seedling.',W/2,H*.06,W-30,16,C.tx,800);
  g.save();g.beginPath();g.rect(j.x,j.y,j.w,j.h);g.clip();plant(g,j.x+j.w/2,j.y+j.h*.42,z(28),S.day,lie.a,0);g.restore();
  g.strokeStyle=C.ln;g.lineWidth=z(8);g.lineCap='round';g.beginPath();g.moveTo(t.x0,t.y);g.lineTo(t.x1,t.y);g.stroke();const kx=t.x0+(t.x1-t.x0)*S.day/DAYS;
  g.strokeStyle=C.gr;g.beginPath();g.moveTo(t.x0,t.y);g.lineTo(kx,t.y);g.stroke();g.fillStyle=C.pn;g.strokeStyle=C.gr;g.lineWidth=3;g.beginPath();g.arc(kx,t.y,z(20),0,7);g.fill();g.stroke();
  write(g,`Day ${Math.floor(S.day)}`,kx,t.y-z(34),z(90),14,C.tx,800)}
 if(p==='needs'){const bx=boxes(3);write(g,S.at>=0?resultLine(S.at):'Where will it sprout?',W/2,H*.07,W-30,16,C.tx,800);
  bx.forEach((r,i)=>{const sp=SPOTS[i],done=S.tried.includes(i);tile(g,r,A.mix(C.pn,i===2?C.cy:i?C.vi:C.am,.14),i===2?C.cy:i?C.vi:C.am,3);emoji(g,sp.e,r.x+z(20),r.y+z(20),z(22));
   write(g,sp.n,r.x+r.w/2,r.y+r.h-z(14),r.w-8,12,C.tx,800);if(done){pot(g,r.x+r.w/2,r.y+r.h*.62,r.w*.42,1);if(sp.warm){plant(g,r.x+r.w/2,r.y+r.h*.6,z(9),7.5,0,!sp.light)}
    else write(g,'no sprout',r.x+r.w/2,r.y+r.h*.42,r.w-8,12,C.tx,800)}});
  if(S.tried.length<3&&!S.busy){const at=d&&d.x!=null?d:{x:W/2,y:H*.34};pot(g,at.x,at.y,z(84),1);seedAt(g,at.x,at.y,z(14),0,0)}}
 if(p==='parts'){const sp=partSpots(),cur=PARTS[S.n]||{};g.fillStyle='#6b4a2e';g.fillRect(20,H*.5+z(10),W-40,H*.3);S.pts=plant(g,W/2,H*.5,z(34),7.5,0,0);
  write(g,S.n>=3?'Root, shoot and leaf.':`Where is the ${cur.n}?`,W/2,H*.07,W-30,16,C.tx,800);
  PARTS.forEach((q,i)=>{const s=sp[i];if(i<S.n){g.fillStyle=A.alpha('#000',.55);A.paint.rrect(s.x+z(26),s.y-z(14),z(70),z(28),12);g.fill();write(g,q.n,s.x+z(61),s.y,z(70),14,'#fff',800)}
   if(S.bad===i){g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.arc(s.x,s.y,s.r,0,7);g.stroke()}});
  if(S.n<3){const at=d&&d.x!=null?d:{x:W/2,y:H-z(40)},r={x:at.x-z(60),y:at.y-z(26),w:z(120),h:z(52)};tile(g,r,C.pn,C.am,3);write(g,cur.n,at.x,at.y,z(110),18,C.tx,800)}}
 if(p==='life'){write(g,S.lined>=4?'Seed, root, seedling, big plant.':'The seed is first. What comes next?',W/2,H*.06,W-30,16,C.tx,800);
  lineRow().forEach((r,j)=>{const on=j<S.lined;tile(g,r,on?A.mix(C.pn,C.gr,.12):A.alpha(C.gr,.05),on?C.gr:C.ln,on?3:2,!on);if(on)stage(g,r,j)});
  if(S.lined<4)deck().forEach((r,j)=>{if(j<S.lined||(d&&d.j===j&&d.x!=null))return;tile(g,r,S.bad===j?A.mix(C.pn,C.rd,.2):C.pn,S.bad===j?C.rd:C.am,S.bad===j?4:2.5);stage(g,r,j)});
  if(d&&d.x!=null){const r=deck()[d.j];stage(g,{...r,x:d.x-r.w/2,y:d.y-r.h/2},d.j)}}
 A.fx.draw(g)}
function stage(g,r,j){const [n,day]=LIFE[j];g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h-z(22));g.clip();g.fillStyle='#6b4a2e';g.fillRect(r.x,r.y+r.h*.62,r.w,r.h);plant(g,r.x+r.w/2,r.y+r.h*.62,z(day>9?8:11),day,0,0);g.restore();write(g,n,r.x+r.w/2,r.y+r.h-z(11),r.w-6,12,A.col.tx,800)}
function resultLine(i){const s=SPOTS[i];if(!s.warm)return'Fridge: too cold. The seed did not wake up.';return s.light?'Window: it sprouted, green and strong.':'Cupboard: it sprouted in the dark! The leaves are pale.'}
function miss(t,j){A.sound.miss();S.bad=j==null?-1:j;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:1100);A.redraw()}
/* one success; after 3 the step is done. Rounds move on after a short pause unless the scene stays */
function yes(t,stay){S.n++;A.sound.pop();if(S.n<3&&!stay){const r0=S.r,g0=gen;S.busy=1;setTimeout(()=>{if(S.r!==r0||g0!==gen)return;Object.assign(S,{busy:0,r:S.r+1,ok:0,sown:0,wet:0,day:0});say(t+' Next one.');buttons();A.redraw()},quick()?5:1300)}say(t);buttons();A.redraw();S.after()}
function sow(){if(phase()!=='plant'||S.busy||S.ok||S.sown)return;S.sown=1;A.sound.tick();say(`The ${SEEDS[S.r].n} is in the soil. Now it needs water.`);buttons();A.redraw()}
function water(){if(phase()!=='plant'||S.busy||S.ok)return;if(!S.sown)return miss(`Plant the ${SEEDS[S.r].n} first. Water on an empty pot does nothing.`);S.wet=1;S.ok=1;yes(`Water and a warm room wake the ${SEEDS[S.r].n} up.`)}
function setDay(v){if(phase()!=='sprout'||S.busy||S.ok)return;S.day=Math.max(S.day,Math.min(DAYS,v));if(S.day>=DAYS){S.ok=1;yes(`Day 8. Root down, shoot up${S.r?', even from a bean '+(S.r===1?'on its side':'upside down'):''}.`)}A.redraw()}
function place(i){if(phase()!=='needs'||S.busy||S.tried.length>=3)return;if(S.tried.includes(i)){return say('Try a new place.')}
 S.busy=1;S.at=-1;say(`${SPOTS[i].n}. Wait 5 days…`);A.redraw();const g0=gen;setTimeout(()=>{if(g0!==gen)return;S.busy=0;S.tried.push(i);S.at=i;S.n=S.tried.length;A.sound.pop();say(resultLine(i));buttons();A.redraw();S.after()},quick()?5:900)}
function label(i){if(phase()!=='parts'||S.n>=3)return;const want=S.n;if(i!==want)return miss(`That is the ${PARTS[i].n}, not the ${PARTS[want].n}. ${PARTS[want].why}`,i);yes(PARTS[i].why,1)}
function line(j){if(phase()!=='life'||S.lined>=4||j<S.lined)return;if(j!==S.lined)return miss(j>S.lined?`The ${LIFE[j][0]} comes later. What grows just after the ${LIFE[S.lined-1][0]}?`:'',j);S.lined++;yes(`${LIFE[j][0]}${j===3?': a big plant makes new seeds.':' comes next.'}`,1)}
function buttons(){if(!pad)return;pad.innerHTML='';const p=phase(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(p==='quiz'||S.n>=3)return;
 if(p==='plant'&&!S.ok){if(!S.sown)B('🌱 Plant the '+SEEDS[S.r].n,sow);B('💧 Water it',water)}
 if(p==='sprout'&&!S.ok){B('➡️ Next day',()=>{setDay(Math.floor(S.day)+1);if(!S.ok)say(`Day ${S.day}.`)})}
 if(p==='needs')SPOTS.forEach((s,i)=>{if(!S.tried.includes(i))B(s.e+' '+s.n,()=>place(i),'Put the wet pot in the '+s.n.toLowerCase())});
 if(p==='parts')PARTS.forEach((q,i)=>B(['⬇️','⬆️','🍃'][i]+' '+q.where,()=>label(i),`Put the ${PARTS[S.n].n} label ${q.where}`));
 if(p==='life')[1,3,2].forEach(j=>{if(j>=S.lined)B(LIFE[j][0],()=>line(j),'Next: '+LIFE[j][0])})}
const near=(q,o,r)=>Math.hypot(q.x-o.x,q.y-o.y)<r,within=(q,r)=>q.x>r.x&&q.x<r.x+r.w&&q.y>r.y&&q.y<r.y+r.h,grown=(_,r)=>({x:r.x-30,y:r.y-30,w:r.w+60,h:r.h+60});
function down(q){const p=phase(),hm=homes();if(p==='quiz'||S.busy||S.ok)return false;
 if(p==='plant'){if(!S.sown&&near(q,hm.seed,z(50))){S.drag={what:'seed',x:null};return true}if(!S.wet&&near(q,hm.drop,z(50))){S.drag={what:'drop',x:null};return true}return false}
 if(p==='sprout'){const t=track(),kx=t.x0+(t.x1-t.x0)*S.day/DAYS;if(Math.abs(q.y-t.y)<z(40)&&q.x>kx-z(40)){S.drag={day:1};return true}return false}
 if(p==='needs'){if(S.tried.length<3&&near(q,{x:A.W/2,y:A.H*.38},z(60))){S.drag={x:null};return true}const i=boxes(3).findIndex(r=>within(q,r));if(i>=0)place(i);return false}
 if(p==='parts'){if(S.n>=3)return false;if(near(q,{x:A.W/2,y:A.H-z(40)},z(60))){S.drag={x:null};return true}const i=partSpots().findIndex(s=>near(q,s,s.r));if(i>=0)label(i);return false}
 if(p==='life'){const j=deck().findIndex((r,i)=>i>=S.lined&&within(q,r));if(j<0)return false;S.drag={j,x:null,x0:q.x,y0:q.y};return true}return false}
function move(q){const d=S.drag;if(!d)return;if(d.day){const t=track();setDay((q.x-t.x0)/(t.x1-t.x0)*DAYS);return}if(d.x!=null||d.x0==null||Math.hypot(q.x-d.x0,q.y-d.y0)>8){d.x=q.x;d.y=q.y;A.redraw()}}
function up(q){const d=S.drag,p=phase();S.drag=null;if(!d)return;
 if(d.day){if(!S.ok)say(`Day ${Math.floor(S.day)}. Keep sliding to day 8.`);return}
 if(p==='plant'){if(d.x!=null&&!near(q,potSpot(),z(80))){say('Drop it on the pot.');return A.redraw()}return d.what==='seed'?sow():water()}
 if(p==='needs'){const i=boxes(3).findIndex(r=>within(q,grown(q,r)));if(i>=0)place(i);else{say('Drop the pot on a place.');A.redraw()}return}
 if(p==='parts'){if(d.x==null)return A.redraw();const i=partSpots().findIndex(s=>near(q,s,s.r*1.3));if(i>=0)label(i);else{say('Drop the label on a part of the plant.');A.redraw()}return}
 if(p==='life'){if(d.x==null)return line(d.j);const r=lineRow()[Math.min(3,S.lined)];if(within(q,grown(q,r)))line(d.j);else{say('Drop it in the next empty box.');A.redraw()}}}
const finish=(i,msg)=>()=>{if(A.step===i&&S.n>=3&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++gen,go=()=>{if(k!==gen||S.n>=3)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{gen++;Object.assign(S,blank())};
function oneMove(){const p=phase();if(S.busy)return;if(p==='plant'){if(S.ok)return;return S.sown?water():sow()}if(p==='sprout'){if(!S.ok)setDay(Math.floor(S.day)+1);return}
 if(p==='needs')return place([0,1,2].find(i=>!S.tried.includes(i)));if(p==='parts')return label(S.n);if(p==='life')return line(S.lined)}
const show=i=>()=>{steps[i].go();S.fast=1;auto(oneMove)};
const steps=[
{h:'Plant a seed',p:'Drag the seed into the hole in the pot. Then drag the water drop onto the pot.',task:'Plant and water 3 seeds',show:show(0),
 go:()=>{reset();say('Plant the bean. Drag it into the hole.');buttons();S.after=finish(0,'A seed goes in the soil, then it gets water.')}},
{h:'Root or shoot first?',p:'A bean in a glass jar lets you see inside. Slide the day dot along, or tap Next day.',predict:{q:'A bean starts to grow. What comes out first?',opts:['A green shoot','A white root'],ans:1},task:'Grow 3 beans to day 8',show:show(1),
 go:()=>{reset();say('This bean lies the right way up. Slide the days along.');buttons();S.after=finish(1,'The root comes out first and turns down. The shoot grows up. It works even if the bean is upside down.')}},
{h:'What wakes a seed?',p:'Every pot is wet. Drag the pot to a sunny window, a dark cupboard or a cold fridge. Wait and see.',predict:{q:'Will a wet bean sprout in a dark cupboard?',opts:['No, it needs light','Yes, it is wet and warm'],ans:1},task:'Try all 3 places',show:show(2),
 go:()=>{reset();say('Drag the wet pot to a place.');buttons();S.after=finish(2,'A seed needs water and warmth to wake up. It can start in the dark, but the leaves need light to grow green.')}},
{h:'Root, shoot, leaf',p:'Drag each label onto the right part of the seedling, or tap the part.',task:'Label 3 parts',show:show(3),
 go:()=>{reset();say('Where is the root? Drag the label.');buttons();S.after=finish(3,'Root under the soil, shoot up the middle, leaves at the top.')}},
{h:'Seed to plant',p:'The seed is first. Drag the picture that comes next into the next box.',predict:{q:'Where do new bean seeds come from?',opts:['From a big bean plant','From the soil'],ans:0},task:'Put 3 pictures in order',show:show(4),
 go:()=>{reset();say('The seed is first. What comes next?');buttons();S.after=finish(4,'Seed, root, seedling, big plant. The big plant makes new seeds, and it starts again.')}},
{h:'Challenge',p:'',go:()=>{reset();challenge()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['What comes out of a seed first?',[['The root','ok'],['A leaf','leaf'],['A flower','flower']]],
 ['What does a seed need to start growing?',[['Water and warmth','ok'],['Only light','light'],['Nothing, just soil','dry']]],
 ['A bean is upside down. Which way does its root grow?',[['Down into the soil','ok'],['Up to the sky','up'],['It cannot grow','stuck']]],
 ['A wet bean sits in a cold fridge. What happens?',[['It does not sprout','ok'],['It sprouts fast','cold'],['It makes a flower','flower']]],
 ['Which picture comes just after the seed?',[['A seed with a root','ok'],['A big plant','jump'],['A flower','flower']]]];
function why(t){let m='A seed needs water and warmth. The root comes first.';
 if(t==='leaf')m='Leaves come later. The root comes out first, so the seed can drink.';if(t==='flower')m='Flowers come last, on a big plant. A seed starts with a root.';
 if(t==='light')m='A seed can start in the dark, under the soil. It needs water and warmth.';if(t==='dry')m='A dry seed just waits. It needs water and warmth to start.';
 if(t==='up')m='Shoots grow up. Roots always turn to grow down, even from an upside down bean.';if(t==='stuck')m='It still grows! The root turns round and grows down.';
 if(t==='cold')m='Too cold! The fridge keeps the seed asleep. It needs warmth to start.';if(t==='jump')m='That skips a step. First the root, then a seedling, then a big plant.';return m}
function challenge(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! You know how a seed grows.':'✗ '+why(t)}${ok?` Stars in a row: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=challenge}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
