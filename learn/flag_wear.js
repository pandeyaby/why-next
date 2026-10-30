/* Flagship – weather and what to wear (3–4): name the weather, dress a child for rain, sun and snow, spot what wind moves. */
(()=>{
const WX={sunny:'Sunny',rainy:'Rainy',windy:'Windy',snowy:'Snowy',cloudy:'Cloudy',foggy:'Foggy'};
const LOOK=['rainy','cloudy','sunny','foggy','snowy'];
const KIT=[['tee','T-shirt','b'],['jumper','Jumper','b'],['rain','Raincoat','b'],['coat','Warm coat','b'],['sandal','Sandals','f'],['welly','Wellies','f'],['sunhat','Sun hat','h'],['woolhat','Woolly hat','h'],['gloves','Gloves','x'],['umb','Umbrella','u']];
const DK='#1f2937',lc=t=>t.toLowerCase(),name=id=>KIT.find(k=>k[0]===id)[1],slot=id=>KIT.find(k=>k[0]===id)[2];
const WIND=[['leaves','Tree leaves',1],['wash','Washing',1],['kite','Kite',1],['house','House',0],['rock','Rock',0]];
VIS.reg('flagwear',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},won:0,r:0,on:{},res:'',ok:0,found:{},hop:0,fx:[]}),S=B0();
const mode=()=>['look','rain','sun','wind','snow','quiz'][A.step];
const R=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.15));
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const sceneH=()=>A.H*(mode()==='look'||mode()==='wind'||mode()==='quiz'?.97:.6);
const cols=()=>A.narrow?5:10,card=()=>{const w=(A.W-12)/cols();return{w,h:Math.min(w*.95,(A.H-sceneH()-8)/(10/cols()))}};
const cardXY=i=>{const{w,h}=card(),k=cols();return{x:6+(i%k)*w,y:sceneH()+6+Math.floor(i/k)*h,w,h}};
function seed(){S.fx=[];const n=S.wx==='rainy'?70:S.wx==='snowy'?45:S.wx==='windy'?14:0;for(let i=0;i<n;i++)S.fx.push({x:Math.random(),y:Math.random(),s:.6+Math.random()*.6})}
function sky(g,W,H){const w=S.wx,top={sunny:'#60a5fa',rainy:'#64748b',windy:'#7dd3fc',snowy:'#cbd5e1',cloudy:'#94a3b8',foggy:'#cbd5e1'}[w];
 g.fillStyle=A.paint.lin(0,0,0,H,[[0,top],[1,'#e0f2fe']]);g.fillRect(0,0,W,H);const gy=H*.78;
 g.fillStyle=w==='snowy'?'#f8fafc':'#4ade80';g.fillRect(0,gy,W,H-gy);
 if(w==='rainy'){g.fillStyle='#60a5fa';[[.18,.88],[.8,.9]].forEach(([a,b])=>{g.beginPath();g.ellipse(W*a,H*b,W*.09,H*.03,0,0,7);g.fill()})}
 if(w==='sunny'||w==='snowy'){const x=W*.84,y=H*.16,r=Math.min(W,H)*.07;g.strokeStyle='#f59e0b';g.lineWidth=3;for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*r*1.3,y+Math.sin(a)*r*1.3);g.lineTo(x+Math.cos(a)*r*1.8,y+Math.sin(a)*r*1.8);g.stroke()}A.paint.ball(x,y,r,'#fbbf24')}
 if(w==='rainy'||w==='cloudy'||w==='snowy')[[.25,.14],[.58,.1]].forEach(([a,b])=>cloud(g,W*a,H*b,Math.min(W,H)*.08,w==='rainy'?'#475569':'#e2e8f0'));
 g.fillStyle='#b45309';g.fillRect(W*.06,gy-H*.2,W*.14,H*.2);g.fillStyle='#dc2626';g.beginPath();g.moveTo(W*.04,gy-H*.2);g.lineTo(W*.13,gy-H*.31);g.lineTo(W*.22,gy-H*.2);g.fill();
 const t=w==='windy'?Math.sin(performance.now()/300)*.04:0;g.fillStyle='#78350f';g.fillRect(W*.9-4,gy-H*.22,8,H*.22);g.fillStyle='#15803d';g.beginPath();g.ellipse(W*(.9+t),gy-H*.27,W*.07,H*.09,t,0,7);g.fill();
 if(mode()==='wind'){const y=gy-H*.32;g.strokeStyle='#334155';g.lineWidth=2;g.beginPath();g.moveTo(W*.28,y);g.lineTo(W*.62,y);g.stroke();
  ['#f472b6','#facc15','#38bdf8'].forEach((cl,i)=>{const x=W*(.33+i*.1),sw=Math.sin(performance.now()/200+i)*8+14;g.fillStyle=cl;g.beginPath();g.moveTo(x,y);g.lineTo(x+18,y);g.lineTo(x+18+sw,y+24);g.lineTo(x+sw,y+24);g.fill()});
  const kx=W*.66+Math.sin(performance.now()/500)*10,ky=H*.15;g.fillStyle='#ef4444';g.beginPath();g.moveTo(kx,ky-16);g.lineTo(kx+12,ky);g.lineTo(kx,ky+16);g.lineTo(kx-12,ky);g.fill();g.strokeStyle='#334155';g.beginPath();g.moveTo(kx,ky+16);g.lineTo(W*.7,gy);g.stroke();
  g.fillStyle='#78716c';g.beginPath();g.ellipse(W*.75,gy+H*.06,W*.05,H*.035,0,0,7);g.fill()}
 S.fx.forEach(p=>{const x=p.x*W,y=p.y*gy;if(w==='rainy'){g.strokeStyle='#1d4ed8';g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x-3,y+12*p.s);g.stroke()}
  else if(w==='snowy'){g.fillStyle='#fff';g.beginPath();g.arc(x,y,3*p.s,0,7);g.fill()}else{g.fillStyle='#16a34a';g.beginPath();g.ellipse(x,y,7,4,p.x*9,0,7);g.fill()}});
 if(w==='foggy'){for(let i=0;i<4;i++){g.fillStyle='rgba(241,245,249,.55)';g.fillRect(0,H*(.15+i*.18),W,H*.12)}}}
function cloud(g,x,y,r,cl){g.fillStyle=cl;[[0,0,1],[-.9,.25,.7],[.9,.25,.75]].forEach(([a,b,k])=>{g.beginPath();g.arc(x+a*r,y+b*r,r*k,0,7);g.fill()})}
function icon(g,id,x,y,s){g.save();g.translate(x,y);g.scale(s/40,s/40);g.lineWidth=2;g.strokeStyle=DK;
 const body=(cl,long,puff)=>{g.fillStyle=cl;g.beginPath();g.moveTo(-10,-14);g.lineTo(10,-14);g.lineTo(18,-6);g.lineTo(long?16:13,long?10:-1);g.lineTo(10,-4);g.lineTo(long?12:10,long?20:12);g.lineTo(long?-12:-10,long?20:12);g.lineTo(-10,-4);g.lineTo(long?-16:-13,long?10:-1);g.lineTo(-18,-6);g.closePath();g.fill();g.stroke();
  if(puff)for(let k=-6;k<18;k+=6){g.beginPath();g.moveTo(-11,k);g.lineTo(11,k);g.stroke()}};
 if(id==='tee')body('#22d3ee');if(id==='jumper'){body('#f472b6',1);g.beginPath();g.moveTo(-11,14);g.lineTo(11,14);g.stroke()}
 if(id==='rain'){body('#facc15',1);g.fillStyle=DK;[-6,2,10].forEach(k=>{g.beginPath();g.arc(0,k,1.6,0,7);g.fill()})}if(id==='coat')body('#8b5cf6',1,1);
 if(id==='sandal'||id==='welly'){[-9,9].forEach(d=>{g.fillStyle=id==='welly'?'#16a34a':'#a16207';if(id==='welly'){g.fillRect(d-5,-14,10,22);g.strokeRect(d-5,-14,10,22)}g.fillRect(d-6,8,14,6);g.strokeRect(d-6,8,14,6);if(id==='sandal'){g.beginPath();g.moveTo(d-5,4);g.lineTo(d+6,4);g.stroke()}})}
 if(id==='sunhat'){g.fillStyle='#fde68a';g.beginPath();g.ellipse(0,4,20,6,0,0,7);g.fill();g.stroke();g.beginPath();g.ellipse(0,-2,10,9,0,Math.PI,0);g.fill();g.stroke()}
 if(id==='woolhat'){g.fillStyle='#ef4444';g.beginPath();g.arc(0,6,13,Math.PI,0);g.fill();g.stroke();g.fillRect(-14,4,28,6);g.strokeRect(-14,4,28,6);g.fillStyle='#fff';g.beginPath();g.arc(0,-9,5,0,7);g.fill();g.stroke()}
 if(id==='gloves')[-9,9].forEach(d=>{g.fillStyle='#2563eb';A.paint.rrect(d-7,-10,14,20,6);g.fill();g.stroke();g.beginPath();g.ellipse(d+(d<0?-7:7),-2,3,6,0,0,7);g.fill();g.stroke()});
 if(id==='umb'){g.fillStyle='#ec4899';g.beginPath();g.arc(0,-2,18,Math.PI,0);g.closePath();g.fill();g.stroke();g.beginPath();g.moveTo(0,-2);g.lineTo(0,16);g.arc(-4,16,4,0,Math.PI);g.stroke()}
 g.restore()}
function child(g,x,y,s){const o=S.on,hop=S.hop;y-=hop;g.fillStyle='#f5d0a9';g.strokeStyle=DK;g.lineWidth=2;
 g.fillStyle='#1e3a8a';g.fillRect(x-s*.16,y+s*.35,s*.12,s*.45);g.fillRect(x+s*.04,y+s*.35,s*.12,s*.45);
 g.fillStyle='#f5d0a9';g.fillRect(x-s*.12,y+s*.6,s*.08,s*.2);g.fillRect(x+s*.04,y+s*.6,s*.08,s*.2);
 const b=Object.keys(o).find(k=>o[k]&&slot(k)==='b');if(b)icon(g,b,x,y+s*.16,s*.95);else{g.fillStyle='#e5e7eb';g.fillRect(x-s*.2,y-s*.15,s*.4,s*.5);g.strokeRect(x-s*.2,y-s*.15,s*.4,s*.5)}
 const f=Object.keys(o).find(k=>o[k]&&slot(k)==='f');if(f)icon(g,f,x,y+s*.72,s*.6);
 if(o.gloves){icon(g,'gloves',x-s*.42,y+s*.25,s*.35);icon(g,'gloves',x+s*.42,y+s*.25,s*.35)}
 g.fillStyle='#f5d0a9';g.beginPath();g.arc(x,y-s*.38,s*.22,0,7);g.fill();g.stroke();g.fillStyle=DK;[-1,1].forEach(d=>{g.beginPath();g.arc(x+d*s*.08,y-s*.4,s*.025,0,7);g.fill()});
 g.beginPath();g.arc(x,y-s*.33,s*.07,.2,Math.PI-.2,S.ok<0);g.stroke();
 const h=Object.keys(o).find(k=>o[k]&&slot(k)==='h');if(h)icon(g,h,x,y-s*.56,s*.6);if(o.umb)icon(g,'umb',x+s*.5,y-s*.55,s*.8)}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode(),sh=sceneH();g.fillStyle=C.pn;g.fillRect(0,0,W,H);g.save();g.beginPath();g.rect(0,0,W,sh);g.clip();sky(g,W,sh);
 if(v!=='look'&&v!=='wind'&&v!=='quiz')child(g,W*.5,sh*.5,Math.min(sh*.62,W*.32));
 if(v==='look'){g.strokeStyle='#78350f';g.lineWidth=10;g.strokeRect(5,5,W-10,sh-10);g.beginPath();g.moveTo(W/2,5);g.lineTo(W/2,sh-5);g.moveTo(5,sh/2);g.lineTo(W-5,sh/2);g.stroke()}
 if(v==='wind')WIND.forEach(([k,l])=>{if(S.found[k]){const p=spot(k);A.paint.label('✓ '+l,p.x,p.y-24,{bg:'#14532d',font:`700 ${fs(13)}px system-ui`})}});
 g.restore();
 if(S.res)A.paint.label(S.res,W/2,sh-18,{bg:S.ok>0?'#14532d':'#7f1d1d',font:`700 ${fs(13)}px system-ui`});
 if(sh<H*.9)KIT.forEach(([id,l],i)=>{const r=cardXY(i),on=S.on[id],dr=S.grab&&S.grab.id===id;g.fillStyle=on?A.alpha(C.gr,.25):C.bg;A.paint.rrect(r.x+2,r.y+2,r.w-4,r.h-4,10);g.fill();
  g.strokeStyle=on?C.gr:C.ln;g.lineWidth=on?3:1.5;A.paint.rrect(r.x+2,r.y+2,r.w-4,r.h-4,10);g.stroke();if(!dr)icon(g,id,r.x+r.w/2,r.y+r.h*.42,Math.min(r.w,r.h)*.55);
  g.fillStyle=C.tx;g.font=`700 ${fs(11)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(l,r.x+r.w/2,r.y+r.h*.84,r.w-6)});
 if(S.grab&&S.grab.x!=null)icon(g,S.grab.id,S.grab.x,S.grab.y,48);A.fx.draw(g)}
const spot=k=>{const W=A.W,H=sceneH(),gy=H*.78;return{leaves:{x:W*.9,y:gy-H*.27},wash:{x:W*.43,y:gy-H*.28},kite:{x:W*.66,y:H*.15},house:{x:W*.13,y:gy-H*.12},rock:{x:W*.75,y:gy+H*.06}}[k]};
const miss=t=>{A.sound.miss();S.ok=-1;speak(t);buttons();A.redraw()};
function pickLook(w){if(mode()!=='look'||S.won>=3)return;const ok=LOOK[S.r%LOOK.length];
 if(w!==ok){const m=w==='rainy'&&ok==='cloudy'?'There are clouds, but no rain is falling. That is cloudy.':w==='cloudy'&&ok==='rainy'?'Look for drops falling. Rain is falling, so it is rainy.':w==='sunny'&&ok==='snowy'?'The sun is out, but look at the white snow. It is snowy.':w==='cloudy'&&ok==='foggy'?'The grey is low down, all around the house. That is fog.':'Look again at the sky and the ground.';return miss(m)}
 S.won++;S.r++;A.sound.tick();if(S.won<3){S.wx=LOOK[S.r%LOOK.length];seed();S.ok=1;speak(`Yes, it is ${lc(WX[ok])}! What is the weather now?`)}else{S.ok=1;speak(`Yes, ${lc(WX[ok])}! You looked and named the weather.`);S.want()}buttons();A.redraw()}
function wear(id){const v=mode();if(!['rain','sun','snow'].includes(v)||S.won)return;const sl=slot(id),was=S.on[id];if(sl!=='x'&&sl!=='u')KIT.forEach(k=>{if(k[2]===sl)S.on[k[0]]=0});S.on[id]=was?0:1;S.res='';S.ok=0;A.sound.tick();
 const now=Object.keys(S.on).filter(k=>S.on[k]).map(name);speak(now.length?'Wearing: '+now.join(', ')+'.':'Nothing on yet.');buttons();A.redraw()}
function judge(v,o){const b=['tee','jumper','rain','coat'].find(k=>o[k]),f=o.sandal?'sandal':o.welly?'welly':'',h=o.sunhat?'sunhat':o.woolhat?'woolhat':'';
 if(v==='rain'){if(b!=='rain')return b==='jumper'?'The rain soaks into the jumper. A raincoat is waterproof: rain runs off.':b==='coat'?'A warm coat is for cold days. A raincoat keeps the rain out.':'Your T-shirt is soaking wet! Put on a raincoat to keep dry.';
  if(f!=='welly')return f?'Splash! Toes get wet in sandals. Wellies keep feet dry.':'Bare feet in puddles? Put on wellies.';return''}
 if(v==='sun'){if(b&&b!=='tee')return`Phew, too hot! A ${lc(name(b))} is too warm for a hot sunny day. A T-shirt keeps you cool.`;if(!b)return'Put on a T-shirt.';
  if(h!=='sunhat')return h?'A woolly hat is too hot. A sun hat shades your face.':'The sun is strong. A sun hat shades your face.';
  if(o.gloves)return'Gloves are for cold days. Your hands get hot!';if(f!=='sandal')return f?'Hot feet in wellies! Sandals keep feet cool.':'Hot ground! Put on sandals.';return''}
 if(b!=='coat')return b==='rain'?'A raincoat is thin. Snow means cold: put on a warm coat.':b?`Brr! A ${lc(name(b))} is not warm enough in the snow. Put on a warm coat.`:'Brr! Put on a warm coat.';
 if(h!=='woolhat')return h?'The sun is out, but snow is cold. A woolly hat keeps ears warm.':'Cold ears! Put on a woolly hat.';
 if(!o.gloves)return'Cold hands in the snow! Gloves keep them warm.';if(f!=='welly')return f?'Cold toes! Sandals let the snow in. Put on wellies.':'Put on wellies for the snow.';return''}
function goOut(){const v=mode();if(!['rain','sun','snow'].includes(v)||S.won)return;const bad=judge(v,S.on);
 if(bad){S.res='✗ Not yet';return miss(bad)}S.res='✓ Just right!';S.ok=1;S.won=1;S.hop=0;A.tween(S,{hop:20},220,'out',()=>A.tween(S,{hop:0},260,'io'));A.sound.pop();
 speak({rain:'Dry and happy! Raincoat and wellies keep the rain out.',sun:'Cool and safe! T-shirt to keep cool, sun hat for shade.',snow:'Warm and cosy! Snow is cold: coat, woolly hat and gloves.'}[v]);buttons();A.redraw();S.want()}
function tapWind(k){if(mode()!=='wind')return;const it=WIND.find(w=>w[0]===k);if(!it[2])return miss(`The ${lc(it[1])} does not move. The wind cannot push it.`);
 if(S.found[k])return;S.found[k]=1;S.ok=1;A.sound.tick();const n=Object.keys(S.found).length;
 speak(n<3?`Yes! The wind moves the ${lc(it[1])}. Find more.`:'You cannot see the wind, but you see what it moves.');buttons();A.redraw();if(n>=3)S.want()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l,on)=>{const b=c.el('button',{type:'button',class:'lbtn ghost'+(on?' on':''),'aria-label':l||null,'aria-pressed':on==null?null:String(!!on)},pad,t);b.onclick=fn};
 if(v==='look'&&S.won<3)Object.keys(WX).forEach(w=>B(WX[w],()=>pickLook(w),'The weather is '+WX[w].toLowerCase()));
 if(['rain','sun','snow'].includes(v)&&!S.won){KIT.forEach(([id,l])=>B(l,()=>wear(id),(S.on[id]?'Take off ':'Put on ')+l,!!S.on[id]));B('🚪 Go outside',goOut,'Go outside and test the clothes')}
 if(v==='wind')WIND.forEach(([k,l])=>B(l,()=>tapWind(k),'Does the wind move the '+lc(l)+'?'));A.redraw()}
function hitCard(p){for(let i=0;i<KIT.length;i++){const r=cardXY(i);if(p.x>=r.x&&p.x<r.x+r.w&&p.y>=r.y&&p.y<r.y+r.h)return KIT[i][0]}return null}
function down(p){const v=mode();if(v==='wind'){let best=null,d=1e9;WIND.forEach(([k])=>{const s=spot(k),e=Math.hypot(s.x-p.x,s.y-p.y);if(e<d){d=e;best=k}});if(d<A.W*.12)tapWind(best);return false}
 if(['rain','sun','snow'].includes(v)){if(p.y<sceneH())return false;const id=hitCard(p);if(!id)return false;S.grab={id,x:null,y:null,x0:p.x,y0:p.y};return true}return false}
function move(p){if(!S.grab)return;S.grab.x=p.x;S.grab.y=p.y;A.redraw()}
function up(p){const d=S.grab;if(!d)return;S.grab=null;if(Math.hypot(p.x-d.x0,p.y-d.y0)<8)return wear(d.id);if(p.y<sceneH()){if(!S.on[d.id])wear(d.id);else A.redraw()}else{speak('Drag it up onto the child.');A.redraw()}}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*300))}
const fresh=wx=>{run++;Object.assign(S,B0());S.wx=wx;seed()};
const dress=(v,ids)=>()=>{steps[v].go();play([...ids.map(id=>()=>wear(id)),goOut])};
const steps=[
{h:'Look out of the window',p:'What is the weather today? Look at the sky and the ground, then tap a weather word.',task:'Name the weather 3 times',
 show:()=>{steps[0].go();play([0,1,2].map(i=>()=>pickLook(LOOK[i])))},go:()=>{fresh(LOOK[0]);speak('What is the weather?');S.want=check(0,()=>S.won>=3,'Look, then say: sunny, rainy, cloudy, foggy, windy or snowy.')}},
{h:'Rainy day',p:'It is raining and there are puddles. Tap or drag clothes onto the child. Then tap Go outside.',
 predict:{q:'It is raining. What keeps you dry?',opts:['A woolly jumper: it is cosy','A raincoat'],ans:1},task:'Get ready for the rain and go outside',
 show:dress(1,['jumper','sandal','rain','welly']),go:()=>{fresh('rainy');speak('It is raining. Get ready to go out.');S.want=check(1,()=>S.won,'Waterproof clothes keep the rain out.')}},
{h:'Hot sunny day',p:'The sun is hot. Pick clothes to keep cool, and something to shade your face.',task:'Get ready for the hot sun and go outside',
 show:dress(2,['coat','tee','sunhat','sandal']),go:()=>{fresh('sunny');speak('It is hot and sunny. Get ready to go out.');S.want=check(2,()=>S.won,'Thin clothes keep you cool. A sun hat shades your face.')}},
{h:'Spot the wind',p:'Can you see the wind? Tap the things that the wind is moving.',
 predict:{q:'Can you see the wind?',opts:['Yes, it is a grey cloud','No, but we see what it moves'],ans:1},task:'Find 3 things the wind moves',
 show:()=>{steps[3].go();play([()=>tapWind('house'),()=>tapWind('leaves'),()=>tapWind('wash'),()=>tapWind('kite')])},go:()=>{fresh('windy');speak('It is windy. What is the wind moving?');S.want=check(3,()=>Object.keys(S.found).length>=3,'We see the wind push leaves, washing and kites.')}},
{h:'Sunny but snowy',p:'The sun is shining, but there is snow on the ground. Get ready to play in the snow.',
 predict:{q:'The sun is out, and there is snow. Which hat?',opts:['A sun hat: the sun is out','A woolly hat: snow means cold'],ans:1},task:'Get ready for the snow and go outside',
 show:dress(4,['sunhat','coat','woolhat','gloves','welly']),go:()=>{fresh('snowy');speak('The sun is out, and there is snow. Get ready to go out.');S.want=check(4,()=>S.won,'Snow means cold, even when the sun shines.')}},
{h:'Challenge',p:'',go:()=>{fresh('sunny');next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Water drops are falling from the clouds. What is the weather?',[['Rainy','ok'],['Cloudy','cloud'],['Foggy','fog']]],
 ['It is very windy. Is an umbrella a good idea?',[['No, the wind can blow it inside out','ok'],['Yes, it stops the wind','umb'],['Yes, it keeps you warm','warm']]],
 ['There is snow, and the sun is out. What do you wear?',[['Coat, woolly hat and gloves','ok'],['Sun hat and T-shirt','sunsnow'],['Raincoat and sandals','thin']]],
 ['There are big puddles. What goes on your feet?',[['Wellies','ok'],['Sandals','toes'],['Just socks','socks']]],
 ['It is a hot sunny day. What do you wear?',[['T-shirt and sun hat','ok'],['Warm coat','hot'],['Woolly hat and gloves','hot2']]],
 ['How can you tell it is windy?',[['Leaves and washing move','ok'],['The sky is blue','blue'],['It is cold','cold']]]];
function why(t){let m='Look at the weather first.';
 if(t==='cloud')m='Clouds alone are cloudy. Drops falling means rainy.';
 if(t==='fog')m='Fog is a cloud down low, all around you. Falling drops are rain.';
 if(t==='umb')m='An umbrella does not stop the wind. Strong wind can blow it inside out.';
 if(t==='warm')m='An umbrella keeps rain off, not cold. In strong wind it can blow inside out.';
 if(t==='sunsnow')m='The sun is out, but snow means it is cold. You need a coat, a woolly hat and gloves.';
 if(t==='thin')m='A raincoat is thin and sandals let snow in. Snow needs warm clothes.';
 if(t==='toes')m='Sandals let the water in. Wellies keep your feet dry.';
 if(t==='socks')m='Socks soak up puddle water. Wellies are waterproof.';
 if(t==='hot')m='A warm coat makes you too hot in the sun. Wear a T-shirt and a sun hat.';
 if(t==='hot2')m='Woolly hats and gloves are for cold days. In hot sun, wear a sun hat.';
 if(t==='blue')m='The sky can be blue on a still day. Look for things moving: leaves, washing, a kite.';
 if(t==='cold')m='A cold day can be still. Wind is moving air: look for things it pushes.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Good weather watching.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh('rainy');A.gest({down,move,up});
  A.every(dt=>{if(!S.fx.length||R())return false;S.fx.forEach(p=>{if(S.wx==='rainy')p.y+=dt*1.4*p.s;else if(S.wx==='snowy'){p.y+=dt*.15*p.s;p.x+=Math.sin(p.y*9)*dt*.03}else{p.x+=dt*.35*p.s;p.y+=Math.sin(p.x*12)*dt*.05}if(p.y>1)p.y=0;if(p.x>1)p.x=0});return true});buttons()}});
A.start()})})();
