/* Flagship: Coasts & Beaches (ages 5–7; KS1 geography vocabulary coast, beach, cliff, sea; Year 2 science habitats).
   Trace where land meets the sea (not a lake shore), look through a hand lens at sandy, rocky and muddy coasts,
   crash waves on a rock until it wears to sand, send six living things to the coast that suits them, and sort clue
   cards. Not flagocean (what the ocean is) or flagseaneed (what sea animals need). */
(()=>{
VIS.reg('flagcoast',c=>{
let V,row,ask,qk=-1;const s={};c.fig.classList.add('young');
const PARTS=['where','lens','grind','homes','clues','chal'];
const part=()=>PARTS[V.step];
const KINDS=[['sand','Sandy','soft sand grains'],['rock','Rocky','hard rocks and pools'],['mud','Muddy','sticky, soft mud']];
const LIVING=[['limpet','🐚','rock','A limpet clamps onto rocks so waves cannot wash it away.'],['lugworm','🪱','sand','A lugworm digs a burrow in the sand and leaves squiggly piles.'],
 ['curlew','🐦','mud','A curlew pokes its long, curved beak into soft mud to find worms.'],['seaweed','🌿','rock','Seaweed holds onto rocks with a strong grip.'],
 ['marram grass','🌾','sand','Marram grass grows on sand dunes. Its long roots hold the sand.'],['samphire','🌱','mud','Samphire grows on salty, muddy marsh.']];
const CLUES=[['Your boots sink in sticky mud','mud'],['Rock pools are left when the sea goes out','rock'],['You can build a sandcastle','sand'],
 ['Seaweed hangs on big rocks','rock'],['Birds with long beaks poke for worms','mud'],['Soft dunes with tall grass','sand']];
const ROCK=['big rock','boulders','pebbles','sand'];
function voice(t){c.say(t);if(V)V.cv.setAttribute('aria-label',t)}
function put(t,x,y,px,o){o=o||{};const g=V.ctx;g.font=`${o.w||700} ${px}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||V.col.tx;g.fillText(String(t),x,y,o.max||V.W-12)}
const rnd=i=>{const x=Math.sin(i*12.9898)*43758.5453;return x-Math.floor(x)};
const hue=k=>{const C=V.col;return k==='sand'?V.mix(C.pn,C.am,C.dark?.45:.4):k==='rock'?V.mix(C.pn,C.mu,C.dark?.5:.45):k==='mud'?V.mix(V.mix(C.am,C.tx,.5),C.pn,C.dark?.35:.3):V.mix(C.pn,C.cy,C.dark?.45:.5)};
function slab(r,k,line){const g=V.ctx;g.fillStyle=hue(k);V.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();if(line!==false){g.strokeStyle=V.col.tx;g.lineWidth=1.5;g.stroke()}}
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function banner(t){const g=V.ctx,px=V.narrow?15:16,ls=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const i=ls.length-1,tr=(ls[i]+' '+w).trim();if(g.measureText(tr).width>V.W-24&&ls[i])ls.push(w);else ls[i]=tr});
 const n=Math.min(4,ls.length),lh=px+5,y0=V.H-n*lh-12;g.fillStyle=V.alpha(V.col.pn,.95);g.fillRect(0,y0,V.W,V.H-y0);ls.slice(0,4).forEach((l,j)=>put(l,V.W/2,y0+6+lh*j+lh/2,px,{w:600}))}
function texture(k,r,zoom){const g=V.ctx,C=V.col;g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();const n=zoom?40:18;
 for(let i=0;i<n;i++){const x=r.x+rnd(i+1)*r.w,y=r.y+rnd(i+50)*r.h;
  if(k==='sand'){g.fillStyle=V.mix(C.am,C.tx,.25);g.beginPath();g.arc(x,y,zoom?2.6:1.6,0,7);g.fill()}
  if(k==='rock'&&i%3===0){g.fillStyle=V.mix(C.mu,C.tx,.3);g.beginPath();g.ellipse(x,y,zoom?16:10,zoom?11:7,rnd(i)*3,0,7);g.fill()}
  if(k==='mud'&&i%4===0){g.strokeStyle=V.mix(C.tx,C.pn,.3);g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x-7,y-9);g.moveTo(x,y);g.lineTo(x,y-11);g.moveTo(x,y);g.lineTo(x+7,y-9);g.stroke()}}
 g.restore()}
/* ---- where: land meets sea ---- */
const shoreX=y=>V.W*.56+Math.sin(y/V.H*9)*V.W*.05;
const lake=()=>({x:V.W*.22,y:V.H*.36,rx:V.W*.11,ry:V.H*.08});
const segY=i=>V.H*(.08+i*.11);
function drawWhere(){const g=V.ctx,C=V.col,top=V.H*.04,bot=V.H*.72;
 g.fillStyle=hue('sea');g.fillRect(0,top,V.W,bot-top);g.fillStyle=V.mix(C.pn,C.gr,C.dark?.42:.4);g.beginPath();g.moveTo(0,top);for(let y=top;y<=bot;y+=6)g.lineTo(shoreX(y),y);g.lineTo(0,bot);g.fill();
 const L=lake();g.fillStyle=hue('sea');g.beginPath();g.ellipse(L.x,L.y,L.rx,L.ry,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.2;g.stroke();
 put('land',V.W*.2,V.H*.6,V.narrow?16:18);put('sea',V.W*.84,V.H*.4,V.narrow?16:18);put('lake',L.x,L.y,V.narrow?13:15,{w:600});
 g.lineWidth=7;g.lineCap='round';for(let i=0;i<6;i++){if(!s.traced[i])continue;g.strokeStyle=C.rd;g.beginPath();g.moveTo(shoreX(segY(i)),segY(i));g.lineTo(shoreX(segY(i)+V.H*.11),segY(i)+V.H*.11);g.stroke()}g.lineCap='butt';
 const n=s.traced.filter(Boolean).length;put(n?`coast traced: ${n} of 6`:'Trace the coast with your finger',V.W/2,V.H*.79,V.narrow?15:17,{ink:n===6?C.gr:C.tx})}
function traceAt(p){const i=Math.floor((p.y/V.H-.08)/.11);if(i<0||i>5)return false;if(Math.abs(p.x-shoreX(p.y))>26)return false;if(!s.traced[i]){s.traced[i]=true;voice(`coast traced: ${s.traced.filter(Boolean).length} of 6`);V.redraw()}return true}
function traceDone(){if(s.traced.filter(Boolean).length===6&&!s.coastOk){s.coastOk=true;say('That line is the coast: the place where the land meets the sea.',true)}}
function wrongWhere(w){say(w==='lake'?'That is the edge of a lake. A lake is fresh water inside the land. A coast is where land meets the sea.':w==='sea'?'That is out in the sea. Find the edge, where the land stops and the sea starts.':'That is inland, far from the sea. Look for where the land meets the sea.',false)}
/* ---- lens: sandy, rocky, muddy ---- */
const strip=i=>{const gap=8,w=(V.W-24-gap*2)/3;return{x:12+i*(w+gap),y:V.H*.14,w,h:V.H*.5}};
function drawLens(){const C=V.col;KINDS.forEach(([k,nm,feel],i)=>{const r=strip(i);slab(r,k);texture(k,r,false);
  if(s.seen[k]){put(nm,r.x+r.w/2,r.y+r.h+18,V.narrow?16:18,{w:800});put(feel,r.x+r.w/2,r.y+r.h+38,V.narrow?12:14,{w:600,max:r.w})}else put('?',r.x+r.w/2,r.y+r.h+20,20,{ink:C.mu})});
 const L=s.glass,g=V.ctx,rad=V.narrow?40:52;if(L){const i=KINDS.findIndex((x,j)=>inR(L,strip(j)));
  g.save();g.beginPath();g.arc(L.x,L.y,rad,0,7);g.clip();if(i>=0){g.fillStyle=hue(KINDS[i][0]);g.fillRect(L.x-rad,L.y-rad,rad*2,rad*2);texture(KINDS[i][0],{x:L.x-rad,y:L.y-rad,w:rad*2,h:rad*2},true)}g.restore();
  g.strokeStyle=C.tx;g.lineWidth=4;g.beginPath();g.arc(L.x,L.y,rad,0,7);g.stroke();g.beginPath();g.moveTo(L.x+rad*.7,L.y+rad*.7);g.lineTo(L.x+rad*1.3,L.y+rad*1.3);g.stroke()}
 put('Drag the hand lens over each coast',V.W/2,V.H*.06,V.narrow?15:17)}
function look(i){const k=KINDS[i][0];const r=strip(i);s.glass={x:r.x+r.w/2,y:r.y+r.h/2};if(s.seen[k])return V.redraw();s.seen[k]=true;
 const line={sand:'Sandy: tiny, soft grains. Good for digging and sandcastles.',rock:'Rocky: hard rocks, with pools of sea water between them.',mud:'Muddy: soft, sticky mud, with bird footprints.'}[k];
 if(KINDS.every(x=>s.seen[x[0]])){s.lensOk=true;return say(line+' Coasts can be sandy, rocky or muddy.',true)}say(line,true)}
/* ---- grind: waves wear rock into sand ---- */
function drawGrind(){const g=V.ctx,C=V.col,base=V.H*.62,cx=V.W*.38;g.fillStyle=hue('sea');g.fillRect(V.W*.55,V.H*.18,V.W*.45,base-V.H*.18);
 g.fillStyle=hue('sand');g.fillRect(0,base,V.W,V.H*.08);
 const st=s.wear,size=[V.W*.16,V.W*.07,V.W*.03,0][st];g.fillStyle=V.mix(C.mu,C.tx,.25);
 if(st===0){g.beginPath();g.ellipse(cx,base-size*.6,size,size*.7,0,0,7);g.fill()}
 else if(st<3){const n=st===1?4:10;for(let i=0;i<n;i++){g.beginPath();g.ellipse(cx-n*size*.45+i*size*.95,base-size*.5-(i%2)*size*.3,size*.5,size*.4,0,0,7);g.fill()}}
 else texture('sand',{x:cx-V.W*.18,y:base-10,w:V.W*.36,h:12},true);
 const wx=s.wave;s.waveAt={x:wx,y:V.H*.38};put('🌊',wx,V.H*.38,V.narrow?44:56);
 put(`Now: ${ROCK[st]}`,V.W/2,V.H*.08,V.narrow?18:20,{w:800});put(`waves: ${s.hits}`,V.W/2,V.H*.14,14,{ink:C.mu,w:600})}
function crash(){if(s.wear>=3)return;s.hits++;s.wave=V.W*.82;s.wear++;
 if(s.wear===3){s.grindOk=true;return say('Rock, then boulders, then pebbles, then sand. Waves and weather do this over a very, very long time. Broken shells make sand too.',true)}
 say(`Crash! The ${ROCK[s.wear-1]} broke into ${ROCK[s.wear]}.`,true)}
/* ---- homes: who lives on which coast ---- */
const zoneR=i=>{const gap=8,w=(V.W-24-gap*2)/3;return{x:12+i*(w+gap),y:V.H*.36,w,h:V.H*.36}};
function drawHomes(){const C=V.col,cur=LIVING[s.li];
 KINDS.forEach(([k,nm],i)=>{const r=zoneR(i);slab(r,k);texture(k,r,false);put(nm,r.x+r.w/2,r.y+18,V.narrow?15:17,{w:800});
  s.placed.filter(x=>x[2]===k).forEach((x,j)=>{const y=r.y+58+j*(V.narrow?52:60),g=V.ctx;g.fillStyle=V.alpha(C.pn,.85);V.paint.rrect(r.x+4,y-20,r.w-8,46,8);g.fill();put(x[1],r.x+r.w/2,y-4,V.narrow?20:24);put(x[0],r.x+r.w/2,y+16,V.narrow?13:15,{max:r.w-10})})});
 if(!cur){put('Everything has a home',V.W/2,V.H*.16,V.narrow?17:19,{ink:C.gr});return}
 const b=s.card=V.narrow?{x:V.W/2-85,y:V.H*.12,w:170,h:58}:{x:V.W/2-100,y:V.H*.1,w:200,h:60},h=s.hold,r=h?{x:h.x-b.w/2,y:h.y-b.h/2,w:b.w,h:b.h}:b,g=V.ctx;
 g.fillStyle=V.mix(C.pn,C.vi,C.dark?.24:.16);V.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();put(cur[1]+' '+cur[0],r.x+r.w/2,r.y+r.h/2,V.narrow?17:19,{max:r.w-8})}
function home(k){const cur=LIVING[s.li];s.hold=null;if(!cur)return;
 if(k!==cur[2]){const nm=KINDS.find(x=>x[0]===k)[1].toLowerCase();return say(`Not the ${nm} coast. ${cur[3]}`,false)}
 s.placed.push(cur);s.li++;if(s.li>=LIVING.length){s.homesOk=true;return say('Each kind of coast has its own plants and animals.',true)}say('Yes! '+cur[3],true)}
/* ---- clues: which coast is it? ---- */
function drawClues(){const C=V.col,cur=CLUES[s.ki];
 KINDS.forEach(([k,nm],i)=>{const r=zoneR(i);slab(r,k);put(nm,r.x+r.w/2,r.y+20,V.narrow?16:18,{w:800});put(`${s.sorted.filter(x=>x===k).length} / 2`,r.x+r.w/2,r.y+r.h*.6,V.narrow?20:22)});
 if(!cur){put('All six clues sorted',V.W/2,V.H*.18,V.narrow?17:19,{ink:C.gr});return}
 const b=s.card=V.narrow?{x:14,y:V.H*.1,w:V.W-28,h:62}:{x:V.W*.15,y:V.H*.1,w:V.W*.7,h:62},h=s.hold,r=h?{x:h.x-b.w/2,y:h.y-b.h/2,w:b.w,h:b.h}:b,g=V.ctx;
 g.fillStyle=V.mix(C.pn,C.cy,C.dark?.24:.16);V.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();put('“'+cur[0]+'”',r.x+r.w/2,r.y+r.h/2,V.narrow?15:17,{max:r.w-10})}
function clue(k){const cur=CLUES[s.ki];s.hold=null;if(!cur)return;
 if(k!==cur[1]){const tip={sand:'Sand is soft and loose: dunes, sandcastles, lugworm piles.',rock:'Rocks and rock pools mean a rocky coast.',mud:'Sinking boots and long-beaked birds mean a muddy coast.'}[cur[1]];return say(tip,false)}
 s.sorted.push(k);s.ki++;if(s.ki>=CLUES.length){s.cluesOk=true;return say('You can tell a coast by its ground and by what lives there.',true)}say('Yes!',true)}
/* ---- frame ---- */
function draw(){const{ctx:g,W,H,col:C}=V,k=part();g.fillStyle=V.mix(C.pn,C.cy,C.dark?.04:.05);g.fillRect(0,0,W,H);
 if(k==='chal'){put('🏖️ Coasts check',W/2,H*.42,V.narrow?20:24);put('Answer below',W/2,H*.56,15,{ink:C.mu,w:500});V.fx.draw(g);return}
 ({where:drawWhere,lens:drawLens,grind:drawGrind,homes:drawHomes,clues:drawClues})[k]();if(s.msg)banner(s.msg);V.fx.draw(g)}
function say(t,good){s.msg=t;if(good)V.sound.pop();else if(good===false)V.sound.miss();voice(t);keys();V.redraw();s.check&&s.check()}
function wipe(){for(const k in s)delete s[k];Object.assign(s,{traced:[],seen:{},wear:0,hits:0,wave:V?V.W*.82:0,li:0,placed:[],ki:0,sorted:[],msg:'',check:()=>{}});if(V)V.redraw()}
function keys(){if(!row)return;row.innerHTML='';const k=part();if(k==='chal')return;
 const b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='where'&&!s.coastOk){b('Trace the next bit of coast',()=>{const i=[0,1,2,3,4,5].find(j=>!s.traced[j]);s.traced[i]=true;voice(`coast traced: ${i+1} of 6`);V.redraw();traceDone()});b('Tap the lake shore',()=>wrongWhere('lake'));b('Tap the open sea',()=>wrongWhere('sea'))}
 if(k==='lens'&&!s.lensOk)KINDS.forEach(([kk],i)=>b(`Look at coast ${i+1}`,()=>look(i),`Put the hand lens on coast ${i+1}`));
 if(k==='grind'&&!s.grindOk)b('Send a wave 🌊',crash);
 if(k==='homes'&&LIVING[s.li])KINDS.forEach(([kk,nm])=>b(nm+' coast',()=>home(kk),`Put the ${LIVING[s.li][0]} on the ${nm.toLowerCase()} coast`));
 if(k==='clues'&&CLUES[s.ki])KINDS.forEach(([kk,nm])=>b(nm,()=>clue(kk),`“${CLUES[s.ki][0]}”: ${nm.toLowerCase()} coast`))}
function press(p){const k=part();if(k==='chal')return false;
 if(k==='where'&&!s.coastOk){if(traceAt(p)){s.trace=true;return true}const L=lake();if(((p.x-L.x)/L.rx)**2+((p.y-L.y)/L.ry)**2<1.6){wrongWhere('lake');return true}if(p.y<V.H*.72){wrongWhere(p.x>shoreX(p.y)?'sea':'land');return true}return false}
 if(k==='lens'){s.glass={x:p.x,y:p.y};s.drag='glass';const i=KINDS.findIndex((x,j)=>inR(p,strip(j)));if(i>=0&&!s.seen[KINDS[i][0]]){look(i);s.glass={x:p.x,y:p.y}}V.redraw();return true}
 if(k==='grind'&&!s.grindOk){if(s.waveAt&&Math.hypot(p.x-s.waveAt.x,p.y-s.waveAt.y)<50){s.drag='wave';return true}return false}
 if((k==='homes'&&LIVING[s.li])||(k==='clues'&&CLUES[s.ki])){if(inR(p,s.card)){s.hold={x:p.x,y:p.y};return true}for(let i=0;i<3;i++)if(inR(p,zoneR(i))){(k==='homes'?home:clue)(KINDS[i][0]);return true}}
 return false}
function drag(p){if(s.trace){traceAt(p);return}if(s.drag==='glass'){s.glass={x:p.x,y:p.y};const i=KINDS.findIndex((x,j)=>inR(p,strip(j)));if(i>=0&&!s.seen[KINDS[i][0]])look(i);else V.redraw();return}
 if(s.drag==='wave'){s.wave=Math.max(V.W*.38,Math.min(V.W*.9,p.x));if(s.wave<V.W*.5){s.drag=null;crash()}else V.redraw();return}if(s.hold){s.hold={x:p.x,y:p.y};V.redraw()}}
function drop(){const k=part();if(s.trace){s.trace=false;traceDone();return}if(s.drag==='wave'){s.wave=V.W*.82;V.redraw()}s.drag=null;
 if(s.hold){const h=s.hold,i=[0,1,2].find(j=>inR(h,zoneR(j)));if(i!=null)return(k==='homes'?home:clue)(KINDS[i][0]);s.hold=null;V.redraw()}}
const met=(i,ok,line)=>()=>{if(V.step===i&&!V.isDone&&(V.pred[i]!=null||!steps[i].predict)&&ok())V.done(line()+V.reveal(i))};
function auto(i,fs){steps[i].go();fs.forEach((f,j)=>setTimeout(()=>{if(V.step===i)f()},V.reduced()?30*(j+1):(j+1)*360))}
function open(i,hint,ok,line){wipe();say(hint);s.check=met(i,ok,line)}
const steps=[
{h:'Where land meets sea',p:'A coast is the place where the land meets the sea. A beach is the part of the coast you can walk on.',
 predict:{q:'What is a coast?',opts:['the edge of any water, like a lake','where the land meets the sea','the middle of the sea'],ans:1},
 task:'Trace the whole coast',show:()=>auto(0,[0,1,2,3,4,5].map(i=>()=>{s.traced[i]=true;V.redraw();traceDone()})),
 go:()=>open(0,'Drag your finger along the line where the land meets the sea.',()=>s.coastOk,()=>'You traced the coast.')},
{h:'Sandy, rocky, muddy',p:'Not every coast is the same. Some are sandy, some are rocky and some are muddy.',
 predict:{q:'Are all beaches sandy?',opts:['yes, every beach is sand','no, some are rocky or muddy'],ans:1},
 task:'Look at all three coasts',show:()=>auto(1,[0,1,2].map(i=>()=>look(i))),
 go:()=>open(1,'Drag the hand lens over each coast to see what it is made of.',()=>s.lensOk,()=>'Three kinds of coast.')},
{h:'Where sand comes from',p:'Waves crash on rocks again and again. Over a very long time, they break rock and shells into tiny bits.',
 predict:{q:'Where does beach sand come from?',opts:['rock and shells broken into tiny bits','it grows on the sea floor'],ans:0},
 task:'Wear the rock down to sand',show:()=>auto(2,[crash,crash,crash]),
 go:()=>open(2,'Drag the wave onto the rock, or press the wave button.',()=>s.grindOk,()=>'Rock became sand.')},
{h:'Who lives where?',p:'Each coast has its own plants and animals. They live where the ground suits them.',
 task:'Find a home for all six',show:()=>auto(3,LIVING.map(x=>()=>home(x[2]))),
 go:()=>open(3,'Drag the card to a coast, or tap a coast.',()=>s.homesOk,()=>'Each coast has its own living things.')},
{h:'Spot the coast',p:'You can tell what kind of coast it is from the ground and from what lives there.',
 task:'Sort all six clues',show:()=>auto(4,CLUES.map(x=>()=>clue(x[1]))),
 go:()=>open(4,'Drag the clue to a coast, or tap a coast.',()=>s.cluesOk,()=>'Two clues for each coast.')},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>s.check()});
const QS=[
 ['What is a coast?',[['where the land meets the sea','ok'],['the edge of a lake','lake'],['the middle of the sea','lake']]],
 ['Are all beaches sandy?',[['no, some are rocky or muddy','ok'],['yes, all of them','all'],['yes, unless it rains','all']]],
 ['Where would you find rock pools?',[['on a rocky coast','ok'],['on a sandy beach','pool'],['on a muddy coast','pool']]],
 ['Where does beach sand come from?',[['rock and shells broken into tiny bits','ok'],['it grows on the sea floor','grow'],['people tip it there','grow']]],
 ['Where would a curlew find its food?',[['in soft mud, using its long beak','ok'],['on bare rocks','bird'],['in the dry dunes','bird']]],
 ['Which lives on a rocky coast?',[['a limpet','ok'],['a lugworm','home'],['marram grass','home']]],
 ['Your boots sink in sticky mud. What kind of coast is it?',[['muddy','ok'],['sandy','clue'],['rocky','clue']]]];
function fb(t){let m='Think about the ground, sand, rock or mud, and what lives there.';
 if(t==='lake')m='A lake is fresh water inside the land. A coast is where the land meets the sea.';
 if(t==='all')m='Some coasts are sandy, but others are rocky or muddy.';
 if(t==='pool')m='Rock pools form in hollows between rocks when the sea goes out, so look on a rocky coast.';
 if(t==='grow')m='Sand comes from rock and shells, worn into tiny bits by waves and weather over a long time.';
 if(t==='bird')m='A curlew pokes its long beak into soft mud to find worms.';
 if(t==='home')m='Lugworms and marram grass need sand. Limpets clamp onto rocks.';
 if(t==='clue')m='Soft, sticky ground that you sink into is mud, so it is a muddy coast.';
 return m}
function quiz(){qk++;const q=QS[qk%QS.length],r=qk%3,opts=[...q[1].slice(r),...q[1].slice(0,r)];
 ask.innerHTML=`<p><b>${q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pick=ask.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},pick,v).onclick=()=>score(t)});voice('Challenge: '+q[0]);V.redraw()}
function score(t){ask.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const out=ask.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)V.win();else V.sound.miss();out.innerHTML=(ok?'✓ Yes! ':'✗ '+fb(t))+' <button type="button" class="linkish">Next one →</button>';out.querySelector('button').onclick=quiz}
V=FK.shell(c,{steps,ratio:.7,tall:1.35,draw,onStep:A=>{ask.hidden=A.step!==5;row.hidden=A.step===5;keys()},
 init:A=>{V=A;wipe();const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Coast buttons'},w);ask=c.el('div',{class:'fl-chal'},A.below);A.gest({down:press,move:drag,up:drop});keys()}});
V.start()})})();
