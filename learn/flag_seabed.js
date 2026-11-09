/* Flagship: The Ocean Floor (ages 7–9; NOAA Ocean Exploration "How deep is the ocean?": average depth 3,682 m, Challenger
   Deep in the Mariana Trench 10,935 m; Everest 8,849 m (2020 survey), so about 2,100 m of water would cover it; NOAA "the
   mid-ocean ridge" about 65,000 km long; USGS: Hawaiian islands are tops of undersea volcanoes, Mauna Kea over 10,000 m from
   its base). Ping a ship's echo sounder to map the hidden floor; probe for the deepest spot; name shelf, seamount, plain,
   ridge and trench; lower Everest into the trench; grow an undersea volcano into an island.
   Not flagdepth (light zones), flagocean (shore, shallow, deep) or flagland (land and water shapes). */
(()=>{
VIS.reg('flagseabed',c=>{let A,pad,quiz,qi=-1,gen=0;const S={};c.fig.classList.add('young');
const part=()=>['map','deep','names','everest','island','chal'][A.step];
const INK='#0f172a',PILL='#f8fafc',ROCK='#8b5e34',SAND='#e7c58f';
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const fs=()=>A.narrow?15:18,fsm=()=>A.narrow?13:15,lim=(v,a,b)=>Math.max(a,Math.min(b,v)),num=v=>Math.round(v).toLocaleString('en-GB');
function tag(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';
 const w=g.measureText(s).width+16;x=lim(x,w/2+4,A.W-w/2-4);g.fillStyle=PILL;A.paint.rrect(x-w/2,y-px*.75,w,px*1.5,px*.6);g.fill();
 if(o.edge){g.strokeStyle=o.edge;g.lineWidth=2.5;g.stroke()}g.fillStyle=INK;g.fillText(s,x,y)}
/* ---------- one ocean, cut through from coast to coast (depth in metres, f = 0..1 across) ---------- */
const bump=(f,c,w)=>Math.exp(-(((f-c)/w)**2)),smooth=t=>{t=lim(t,0,1);return t*t*(3-2*t)};
function depth(f){let d=f<.06?60+f/.06*140:f>.93?200+4300*smooth((1-f)/.07):200+4300*smooth((f-.06)/.09);
 d-=3500*bump(f,.3,.035);d-=2000*bump(f,.55,.07);d+=400*bump(f,.55,.012);d+=6435*bump(f,.8,.022);return Math.max(30,d)}
const LIFT=[-26,34,-26,-26,-60],FEAT=[['Continental shelf',.03,'the shallow edge of the land'],['Seamount',.3,'a mountain under the sea'],['Abyssal plain',.43,'wide, flat and deep'],
 ['Mid-ocean ridge',.55,'a long chain of underwater mountains'],['Trench',.8,'the deepest, narrowest valleys']];
const seaY=()=>A.H*.18,fx=f=>A.W*(.03+f*.94),dy=m=>seaY()+m/11500*(A.H*.96-seaY()),toF=x=>lim((x/A.W-.03)/.94,0,1);
function water(top){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.12:.7);g.fillRect(0,0,A.W,top);
 g.fillStyle=A.paint.lin(0,top,0,A.H,[[0,'#38bdf8'],[.35,'#0369a1'],[1,'#082f49']]);g.fillRect(0,top,A.W,A.H-top)}
function floor(alpha){const g=A.ctx;g.globalAlpha=alpha;g.fillStyle=ROCK;g.beginPath();g.moveTo(0,A.H);for(let i=0;i<=200;i++){const f=i/200;g.lineTo(fx(f),dy(depth(f)))}
 g.lineTo(A.W,A.H);g.closePath();g.fill();g.strokeStyle=SAND;g.lineWidth=3;g.stroke();g.globalAlpha=1}
function ship(f){const g=A.ctx,x=fx(f),y=seaY(),s=A.narrow?12:15;g.fillStyle='#f97316';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(x-s*1.6,y-s*.9);g.lineTo(x+s*1.6,y-s*.9);g.lineTo(x+s,y+2);g.lineTo(x-s,y+2);g.closePath();g.fill();g.stroke();
 g.fillStyle='#f8fafc';g.fillRect(x-s*.6,y-s*1.8,s*1.1,s*.9);g.strokeRect(x-s*.6,y-s*1.8,s*1.1,s*.9)}
function scale(){[0,4000,8000].forEach(m=>tag(m?`${num(m)} m`:'0 m',A.W-34,dy(m)+(m?0:12),A.narrow?12:13,{w:600}))}
/* ---------- 1. echo sounder ---------- */
const echo=d=>Math.round(d/750*10)/10;  /* sound goes down and back at about 1,500 m/s, so time = 2d ÷ 1500 */
function drawMap(){water(seaY());floor(S.show);ship(S.ship);const g=A.ctx;
 for(const w of S.waves){const x=fx(w.f),y=seaY()+(dy(w.d)-seaY())*(w.t<.5?w.t*2:2-w.t*2);g.strokeStyle='#fde047';g.lineWidth=3;g.beginPath();g.arc(x,y,10,w.t<.5?.2:3.3,w.t<.5?2.9:6.1);g.stroke()}
 for(const p of S.pings){const x=fx(p),y=dy(depth(p));g.setLineDash([3,5]);g.strokeStyle='#fde047';g.lineWidth=1.5;g.beginPath();g.moveTo(x,seaY());g.lineTo(x,y);g.stroke();g.setLineDash([]);
  g.fillStyle='#fde047';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(x,y,7,0,7);g.fill();g.stroke()}
 tag(S.last==null?`Pings: ${S.pings.length} of 8`:`Echo ${echo(depth(S.last))} s → ${num(depth(S.last))} m deep · ${S.pings.length}/8`,A.W/2,A.H*.06,fs());
 if(S.show<1&&!S.pings.length)tag('Tap the sea to send a ping down',A.W/2,A.H*.55,fsm())}
function ping(f){f=lim(f,0,1);S.ship=f;const w={f,d:depth(f),t:0};S.waves.push(w);A.sound.pop();say(`Ping! The sound goes down to the floor and bounces back up…`);
 A.tween(w,{t:1},A.reduced()?0:300+w.d/11000*500,'io',()=>{S.waves.splice(S.waves.indexOf(w),1);S.pings.push(f);S.last=f;
  if(S.pings.length>=8&&S.show<1)A.tween(S,{show:1},A.reduced()?0:800,'out',()=>after('Your pings show the real shape: not flat at all. There are mountains, a wide flat plain, and a very deep, narrow trench.'));
  else after(`The echo took ${echo(w.d)} seconds, so the floor here is about ${num(w.d)} m down. A longer wait means deeper water.`)})}
/* ---------- 2. where is it deepest? ---------- */
function drawDeep(){water(seaY());floor(1);scale();const g=A.ctx;if(S.probe!=null){const x=fx(S.probe),y=dy(depth(S.probe));g.strokeStyle='#fde047';g.lineWidth=3;g.beginPath();g.moveTo(x,seaY());g.lineTo(x,y);g.stroke();
 g.fillStyle='#fde047';g.beginPath();g.arc(x,y,8,0,7);g.fill()}tag(S.probe==null?'Tap where you think it is deepest':`Here: ${num(depth(S.probe))} m · deepest found: ${num(S.best)} m`,A.W/2,A.H*.06,fs())}
function probe(f){S.probe=lim(f,0,1);const d=depth(S.probe);S.best=Math.max(S.best,d);if(Math.abs(S.probe-.8)<.03)S.found=true;A.sound.tick();
 after(S.found&&Math.abs(S.probe-.8)<.03?`Found it: a trench about ${num(d)} m deep. The deepest place, the Mariana Trench, is about 10,900 m deep. Trenches are near the edges of oceans, not in the middle.`
 :Math.abs(S.probe-.55)<.08?`Only ${num(d)} m. The middle of this ocean has a mountain ridge, so it is not the deepest part.`:`${num(d)} m deep here. Keep looking for somewhere deeper.`)}
/* ---------- 3. name the features ---------- */
function drawNames(){water(seaY());floor(1);const g=A.ctx;FEAT.forEach(([n,f],i)=>{const x=fx(f),y=dy(depth(f));if(S.named[i]){tag(n,x,Math.min(y+LIFT[i],A.H*.9),fsm(),{edge:'#f59e0b'})}
 else{g.fillStyle='#fde047';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(x,y-12,A.narrow?11:13,0,7);g.fill();g.stroke();g.fillStyle=INK;g.font=`800 ${fsm()}px system-ui`;g.textAlign='center';g.fillText('?',x,y-11)}});
 tag(`Named: ${S.named.filter(Boolean).length} of 5`,A.W/2,A.H*.06,fs())}
function name(i){if(i<0)return;S.named[i]=true;A.sound.pop();const[n,,what]=FEAT[i];
 after(`${n}: ${what}.`+(i===3?' Mid-ocean ridges join up into the longest mountain range on Earth, about 65,000 km long.':'')+(i===4?' Trenches are the deepest places on Earth.':''))}
/* ---------- 4. Everest in the Mariana Trench ---------- */
const EV=8849,MT=10935,ek=()=>A.H*.84/(EV+MT+500),ey0=()=>A.H*.1+EV*ek(),ey=m=>ey0()+m*ek();
function drawEverest(){const g=A.ctx,top=ey0(),L=A.W*.33,R=A.W*.67;water(top);g.fillStyle=ROCK;g.beginPath();g.moveTo(0,A.H);g.lineTo(0,ey(4000));g.lineTo(L,ey(4000));
 g.lineTo(L+A.W*.02,ey(MT));g.lineTo(R-A.W*.02,ey(MT));g.lineTo(R,ey(4000));g.lineTo(A.W,ey(4000));g.lineTo(A.W,A.H);g.closePath();g.fill();g.strokeStyle=SAND;g.lineWidth=3;g.stroke();
 const b=ey(S.ev),t=ey(S.ev-EV),hw=A.W*.13;g.fillStyle='#64748b';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(A.W/2-hw,b);g.lineTo(A.W/2,t);g.lineTo(A.W/2+hw,b);g.closePath();g.fill();g.stroke();
 g.fillStyle='#f8fafc';g.beginPath();g.moveTo(A.W/2-hw*.22,t+(b-t)*.22);g.lineTo(A.W/2,t);g.lineTo(A.W/2+hw*.22,t+(b-t)*.22);g.closePath();g.fill();
 tag('Mount Everest 8,849 m',A.W/2,(b+t)/2+10,fsm());const above=S.ev-EV;
 tag(S.ev>=MT?`Top of Everest: ${num(above)} m under water!`:above<0?`Top of Everest: ${num(-above)} m above the sea`:`Top: ${num(above)} m under water`,A.W/2,A.H*.05,fs());
 tag('Mariana Trench 10,935 m',A.W*.82,ey(MT)-14,A.narrow?12:13);tag('sea level',A.W*.12,top-12,A.narrow?12:13)}
function lower(m){S.ev=lim(m,0,MT);A.sound.tick();after(S.ev>=MT?`Everest sits on the bottom of the trench, and its top is still about ${num(MT-EV)} m under the water. The trench is deeper than Everest is tall.`:`Everest is ${num(S.ev)} m down. Keep lowering it to the bottom.`)}
/* ---------- 5. an undersea volcano grows into an island ---------- */
const PL=4000,vk=()=>A.H*.6/PL,vy0=()=>A.H*.34,vy=m=>vy0()+m*vk();
function drawIsland(){const g=A.ctx;water(vy0());g.fillStyle=ROCK;g.fillRect(0,vy(PL),A.W,A.H-vy(PL));const top=vy(PL-S.vh),hw=A.W*.08+S.vh*vk()*1.2;
 g.fillStyle='#57534e';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(A.W/2-hw,vy(PL));g.lineTo(A.W/2-A.W*.05,top);g.lineTo(A.W/2+A.W*.05,top);g.lineTo(A.W/2+hw,vy(PL));g.closePath();g.fill();g.stroke();
 g.fillStyle='#f97316';g.beginPath();g.arc(A.W/2,top,A.narrow?6:8,Math.PI,0);g.fill();
 if(S.vh>PL){g.fillStyle='#16a34a';g.beginPath();g.ellipse(A.W/2,top-4,A.W*.05,8,0,Math.PI,0);g.fill();tag('Island!',A.W/2,top-30,fsm(),{edge:'#16a34a'})}
 const h=S.vh-PL;tag(h>0?`Top: ${num(h)} m above the sea`:`Top: ${num(-h)} m under water`,A.W/2,A.H*.06,fs())}
function erupt(){if(S.vh>=6000)return;A.sound.whoosh();A.tween(S,{vh:S.vh+1000},A.reduced()?0:500,'out',()=>{S.vh=Math.round(S.vh/1000)*1000;
 after(S.vh>PL?'The volcano has broken through the surface: a new island! Hawaii is made this way. Mauna Kea rises over 10,000 m from the sea floor, taller than Everest, though most of it is under water.':`Lava piles up. The volcano is ${num(S.vh)} m tall, still under the sea.`)})}
function draw(){const k=part();if(k==='map')drawMap();if(k==='deep')drawDeep();if(k==='names')drawNames();if(k==='everest')drawEverest();if(k==='island')drawIsland();
 if(k==='chal'){water(seaY());floor(1);FEAT.forEach(([n,f],i)=>tag(n,fx(f),Math.min(dy(depth(f))+LIFT[i],A.H*.9),A.narrow?11:13));tag('Challenge',A.W/2,A.H*.06,fs())}}
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{ship:.05,waves:[],pings:[],last:null,show:0,probe:null,best:0,found:false,named:[0,0,0,0,0],ev:0,vh:1000,ok:()=>{}})}
const doneWhen=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts,gap){steps[i].go();const t=gen;acts.forEach((f,j)=>setTimeout(()=>{if(t===gen)f()},A.reduced()?25*(j+1):(gap||400)*(j+1)))}
function after(m){say(m);A.redraw();keys();S.ok()}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='map')b('Move on and ping',()=>ping(S.pings.length?Math.min(1,S.ship+.11):.05),'Move the ship along and send a ping');
 if(k==='deep'){b('← Probe left',()=>probe((S.probe??.55)-.05),'Probe further left');b('Probe right →',()=>probe((S.probe??.5)+.05),'Probe further right')}
 if(k==='names')b('Name the next one',()=>name(S.named.indexOf(0)));
 if(k==='everest'&&S.ev<MT)b('Lower Everest 2,000 m',()=>lower(S.ev+2000>MT-500?MT:S.ev+2000));
 if(k==='island'&&S.vh<=PL)b('Erupt!',erupt,'Make the volcano erupt')}
function down(p){const k=part(),f=toF(p.x);
 if(k==='map'){if(p.y<seaY()-20)return false;ping(f);return false}
 if(k==='deep'){probe(f);return true}
 if(k==='names'){let best=-1,dd=.07;FEAT.forEach(([,ff],i)=>{if(!S.named[i]&&Math.abs(ff-f)<dd){dd=Math.abs(ff-f);best=i}});name(best);return false}
 if(k==='everest'){if(S.ev>=MT||Math.abs(p.x-A.W/2)>A.W*.16)return false;S.gy=p.y;S.e0=S.ev;return true}
 if(k==='island'){if(Math.abs(p.x-A.W/2)>A.W*.2||S.vh>PL)return false;erupt();return false}return false}
function move(p){const k=part();if(k==='deep'){S.probe=toF(p.x);A.redraw()}if(k==='everest'){S.ev=lim(S.e0+(p.y-S.gy)/ek(),0,MT);A.redraw()}}
function up(){const k=part();if(k==='deep')probe(S.probe);if(k==='everest')lower(S.ev>MT-600?MT:S.ev)}
const steps=[
{h:'Map the hidden floor',p:'Nobody can see the bottom of the deep sea. A ship sends down a ping of sound and times the echo. Tap the sea to ping, or use the button.',
 predict:{q:'What shape do you think the ocean floor is?',opts:['Flat, like the bottom of a bath','Bumpy, with mountains and deep valleys','A smooth bowl'],ans:1},
 task:'Send 8 pings to map the floor',show:()=>auto(0,[.05,.17,.3,.42,.55,.68,.8,.92].map(f=>()=>ping(f)),300),
 go:()=>{fresh();say('A ship on the sea. The ocean floor below is hidden.');keys();S.ok=doneWhen(0,()=>S.show>=1,'The ocean floor is not flat.')}},
{h:'Find the deepest place',p:'Now the floor is mapped. Tap or drag to probe the depth. Where is the water deepest?',
 predict:{q:'Where is the deepest water in an ocean?',opts:['Right in the middle','In a narrow trench','Next to the beach'],ans:1},
 task:'Find the deepest spot',show:()=>auto(1,[()=>probe(.55),()=>probe(.68),()=>probe(.8)],500),
 go:()=>{fresh();say('The ocean floor from one coast to the other.');keys();S.ok=doneWhen(1,()=>S.found,'Trenches are the deepest places on Earth.')}},
{h:'Name the features',p:'Tap each yellow ? to find out what that part of the floor is called.',
 predict:{q:'Where is the longest mountain range on Earth?',opts:['On land','Under the sea','On the Moon'],ans:1},
 task:'Name all 5 features',show:()=>auto(2,[0,1,2,3,4].map(i=>()=>name(i)),350),
 go:()=>{fresh();say('Five places on the ocean floor are marked with a question mark.');keys();S.ok=doneWhen(2,()=>S.named.every(Boolean),'Shelf, seamount, plain, ridge and trench.')}},
{h:'Everest in the trench',p:'Mount Everest is the tallest mountain on land. Drag it down into the Mariana Trench, or use the button.',
 predict:{q:'If Everest stood at the bottom of the Mariana Trench, its top would…',opts:['stick out of the sea','still be under water','just touch the surface'],ans:1},
 task:'Lower Everest to the bottom of the trench',show:()=>auto(3,[2000,4000,6000,8000,MT].map(m=>()=>lower(m)),350),
 go:()=>{fresh();say('Mount Everest sits at sea level above the Mariana Trench.');keys();S.ok=doneWhen(3,()=>S.ev>=MT,'The trench is deeper than Everest is tall.')}},
{h:'Mountains make islands',p:'Some underwater mountains are volcanoes. Each time one erupts, lava piles up. Tap the volcano or press Erupt.',
 predict:{q:'An island in the middle of the ocean is…',opts:['floating on the water','the top of a mountain on the sea floor','a big pile of sand'],ans:1},
 task:'Grow the volcano into an island',show:()=>auto(4,[1,2,3,4].map(()=>erupt),650),
 go:()=>{fresh();say('A small volcano on the sea floor, 4,000 m down.');keys();S.ok=doneWhen(4,()=>S.vh>PL,'Ocean islands are the tops of mountains that rise from the floor.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['Is the ocean floor flat?','No: it has mountains, plains and deep trenches',[['Yes, flat like a bath','flat'],['It is one big round hole','hole']]],
 ['Where is the deepest place on Earth?','The Mariana Trench, in the Pacific Ocean',[['The middle of the Atlantic Ocean','middle'],['Under the ice at the North Pole','pole']]],
 ['Mount Everest is put in the Mariana Trench. What happens?','Its top is still under about 2,000 m of water',[['Its top sticks out of the sea','stick'],['It fills the trench to the top','fill']]],
 ['A ship’s ping takes a long time to echo back. The water there is…','Deep',[['Shallow','echo'],['Full of fish','fish']]],
 ['What is a mid-ocean ridge?','A long chain of mountains under the sea',[['A very deep trench','trench'],['A huge wave','wave']]],
 ['How did the islands of Hawaii form?','Undersea volcanoes grew until their tops came out of the sea',[['They float on the water','float'],['Sand piled up on the sea','sand']]]];
function why(tag){let m='Think back to the map you made with the pings.';
 if(tag==='flat')m='The pings showed mountains, a flat plain and a deep trench. The floor is far from flat.';
 if(tag==='hole')m='The ocean is not one smooth hole. Its floor has mountains, plains and trenches.';
 if(tag==='middle')m='The middle of an ocean often has a ridge of mountains. The deepest places are trenches, like the Mariana Trench in the Pacific.';
 if(tag==='pole')m='The Arctic Ocean is shallow compared with the Pacific. The deepest place is the Mariana Trench.';
 if(tag==='stick')m='Everest is 8,849 m tall but the trench is about 10,900 m deep, so about 2,000 m of water would still be above its top.';
 if(tag==='fill')m='Everest is not tall enough to fill it: the trench is about 2,000 m deeper than Everest is tall.';
 if(tag==='echo')m='The sound has further to go down and back in deep water, so a long wait means deep water.';
 if(tag==='fish')m='The echo time tells you how far away the floor is. A long wait means the floor is a long way down.';
 if(tag==='trench')m='A ridge is the opposite of a trench: it is a raised chain of mountains, not a deep valley.';
 if(tag==='wave')m='Waves are on the surface. A ridge is part of the solid ocean floor.';
 if(tag==='float')m='Islands do not float. They are the tops of mountains that stand on the sea floor.';
 if(tag==='sand')m='Hawaii is made of rock from volcanoes. Lava piled up from the sea floor until it reached the air.';
 return m}
function ask(){qi++;const[q,ans,bad]=QS[qi%QS.length],opts=[[ans,'ok'],...bad],r=qi%3,order=opts.slice(r).concat(opts.slice(0,r));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(t,ans)});say('Challenge: '+q);A.redraw()}
function mark(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():A.sound.miss();say(ok?'Yes. '+ans+'.':why(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:Q=>{quiz.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ocean floor controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
