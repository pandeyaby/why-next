/* Flagship – scale of the solar system (ages 9–11). One scale for sizes and distances: match objects to planets next to a
   football Sun, a km-to-metres double ruler, a true-scale zoom, the Moon at 6 cm, a Sun that fits a 100 m field.
   Data in learn/solscale_art.js. Distinct from flagpname (order), flagssys and flagcomet. */
(()=>{const D=SOLS,TAU=Math.PI*2;
VIS.reg('flagsolscale',c=>{let A,bar,chal,qn=-1,run=0;const S={};
const INK='#0f172a',SOFT='#334155',OK='#047857',BAD='#b91c1c',EDGE='#64748b',SPACE='#eef2ff',SUNC='#f59e0b',HAND='#4338ca',FONT='px system-ui,sans-serif';
const scene=()=>['size','inner','outer','poster','moon','field','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.15);
const inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const fmt=(v,d)=>v.toLocaleString('en-GB',{maximumFractionDigits:d||0});
function backdrop(){const g=A.ctx;g.fillStyle=SPACE;g.fillRect(0,0,A.W,A.H)}
/* a text tag with a white box; shrinks the font until it fits the canvas width */
function tag(text,x,y,o){o=o||{};const g=A.ctx;let f=fs(o.f||13);const fit=()=>{g.font=`${o.light?600:700} ${f}${FONT}`;return g.measureText(text).width+18};
 let w=fit();while(f>9&&w>A.W-8){f--;w=fit()}const h=f+12,left=Math.max(4,Math.min(A.W-w-4,x-w/2));
 g.fillStyle='#ffffff';A.paint.rrect(left,y-h/2,w,h,8);g.fill();g.lineWidth=o.ok||o.bad?3:1.2;g.strokeStyle=o.ok?OK:o.bad?BAD:EDGE;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(text,left+w/2,y+1)}
function key(b,text,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':o.ok?'#d1fae5':o.on?'#e0e7ff':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,11);g.fill();
 g.lineWidth=o.bad||o.ok||o.on?3:1.4;g.strokeStyle=o.bad?BAD:o.ok?OK:o.on?HAND:EDGE;g.stroke();let f=fs(14);g.font=`800 ${f}${FONT}`;
 while(f>9&&g.measureText(text).width>b.w-8){f--;g.font=`800 ${f}${FONT}`}g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(text,b.x+b.w/2,b.y+b.h/2)}
const bottomKeys=n=>{const gap=8,w=(A.W-16-gap*(n-1))/n,h=Math.min(58,A.H*.13);return Array.from({length:n},(_,i)=>({i,x:8+i*(w+gap),y:A.H-h-8,w,h}))};
function ball(x,y,r,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.arc(x,y,Math.max(r,1.2),0,TAU);g.fill();if(r>3){g.strokeStyle=INK;g.lineWidth=1.2;g.stroke()}}
/* ---------- 1. what size is each planet next to a football Sun? ---------- */
const sunDisc=()=>({x:A.W*.2,y:A.H*.36,r:Math.min(A.W*.16,A.H*.2)});
const slots=()=>{const x=A.W*.42,w=A.W-x-8,h=Math.min(A.H*.15,70),top=A.H*.06;return D.MATCH.map((m,i)=>({i,x,y:top+i*(h+8),w,h}))};
function drawSize(){const g=A.ctx,s=S.size,O=sunDisc();ball(O.x,O.y,O.r,SUNC);tag('Sun: 22 cm football',O.x,O.y+O.r+fs(16),{f:12});
 slots().forEach(b=>{const m=D.MATCH[b.i],got=s.got[m.p],on=b.i===s.i;g.fillStyle=on?'#e0e7ff':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=on?3:1.3;g.strokeStyle=got!=null?OK:on?HAND:EDGE;g.stroke();
  g.fillStyle=INK;g.textAlign='left';g.textBaseline='middle';g.font=`800 ${fs(14)}${FONT}`;g.fillText(m.p,b.x+10,b.y+b.h*.33);g.font=`600 ${fs(12)}${FONT}`;
  g.fillText(got!=null?`= ${D.THINGS[got].name}, ${fmt(D.sizeMm(D.byName(m.p).km),1)} mm`:on?'Drop a thing here':'Waiting',b.x+10,b.y+b.h*.7);
  if(got!=null){const r=O.r*D.byName(m.p).km/D.SUN_KM;ball(b.x+b.w-18,b.y+b.h/2,r,D.byName(m.p).col)}});
 if(s.i>=D.MATCH.length)tag('True scale: the dots are drawn at the right size next to this Sun',A.W/2,A.H*.66,{f:11,ok:1});
 bottomKeys(4).forEach(b=>{if(s.drag&&s.drag.i===b.i)return;key(b,D.THINGS[b.i].name,{bad:s.miss===b.i})});
 if(s.drag){const k=bottomKeys(4)[s.drag.i];key({x:s.drag.x-k.w/2,y:s.drag.y-k.h/2,w:k.w,h:k.h},D.THINGS[s.drag.i].name,{on:1})}}
function pickThing(i){const s=S.size;if(s.i>=D.MATCH.length)return;const m=D.MATCH[s.i],t=D.THINGS[i];
 if(i!==m.ans){s.miss=i;A.sound.miss();return say(`Not a ${t.name} (${t.mm} mm). ${m.why}`)}
 s.got[m.p]=i;s.miss=-1;s.i++;A.sound.pop();say(`Yes: ${m.p} is a ${t.name}. ${m.why}`+(s.i<D.MATCH.length?` Next: ${D.MATCH[s.i].p}.`:''))}
/* ---------- 2, 3 and 5. the double ruler: real distance above, model distance below ---------- */
const RULERS=D.RULERS;
const band=()=>({x0:26,x1:A.W-26,y:A.H*.5});
const xOf=v=>{const R=RULERS[scene()],B=band();return B.x0+v/R.max*(B.x1-B.x0)};
const vOf=x=>{const R=RULERS[scene()],B=band();return Math.max(0,Math.min(R.max,(x-B.x0)/(B.x1-B.x0)*R.max))};
function drawRuler(){const g=A.ctx,R=RULERS[scene()],L=S.line,B=band(),gap=fs(46);
 if(scene()==='moon'){ball(B.x0,B.y,2,'#2563eb');tag('Earth (pinhead)',B.x0+40,B.y-fs(64),{f:11})}else{g.fillStyle=SUNC;g.beginPath();g.arc(B.x0-4,B.y,fs(14),-Math.PI/2,Math.PI/2);g.fill();tag('Sun',B.x0+12,B.y-fs(64),{f:11})}
 g.strokeStyle=INK;g.lineWidth=2;[B.y,B.y+gap].forEach(y=>{g.beginPath();g.moveTo(B.x0,y);g.lineTo(B.x1,y);g.stroke()});
 g.font=`600 ${fs(11)}${FONT}`;g.fillStyle=SOFT;g.textAlign='center';g.textBaseline='bottom';
 for(let v=0;v<=R.max+1e-9;v+=R.tStep){const x=xOf(v);g.fillRect(x-.75,B.y-6,1.5,6);g.fillText(fmt(v),x,B.y-8)}
 const mMax=R.model(R.max);g.textBaseline='top';for(let m=0;m<=mMax+1e-9;m+=R.bStep){const x=B.x0+m/mMax*(B.x1-B.x0);g.fillRect(x-.75,B.y+gap,1.5,6);g.fillText(fmt(m),x,B.y+gap+8)}
 g.textAlign='right';g.textBaseline='bottom';g.fillText(R.top,B.x1,B.y-fs(22));g.textBaseline='top';g.fillText('model '+R.bot,B.x1,B.y+gap+fs(22));
 if(scene()==='outer')RULERS.inner.names.forEach(n=>ball(xOf(D.byName(n).mkm),B.y,1.6,D.byName(n).col));
 L.placed.forEach((n,k)=>{const x=xOf(R.real(n)),col=n==='Moon'?'#64748b':D.byName(n).col;ball(x,B.y,4,col);g.strokeStyle=col;g.lineWidth=1;g.beginPath();g.moveTo(x,B.y);g.lineTo(x,B.y+gap);g.stroke();
  g.fillStyle=INK;g.font=`700 ${fs(11)}${FONT}`;g.textAlign='center';g.textBaseline='bottom';g.fillText(n,x,B.y-fs(24)-(k%2)*fs(14))});
 if(L.i>=R.names.length){tag(S.doneText||'All placed',A.W/2,A.H*.18,{ok:1});return}
 const n=R.names[L.i],x=xOf(L.v);g.strokeStyle=HAND;g.lineWidth=2;g.setLineDash([4,4]);g.beginPath();g.moveTo(x,B.y);g.lineTo(x,B.y+gap);g.stroke();g.setLineDash([]);
 g.fillStyle=HAND;g.beginPath();g.arc(x,B.y,fs(11),0,TAU);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();
 tag(`${n}: ${fmt(R.real(n),1)} ${R.top} from the ${scene()==='moon'?'Earth':'Sun'}`,A.W/2,A.H*.1,{f:13});
 tag(`Here: ${fmt(L.v,L.v<10?1:0)} ${R.top} = ${fmt(R.model(L.v),1)} ${R.bot} in the model`,A.W/2,A.H*.1+fs(30),{f:12,light:1,bad:L.miss})}
function placeHere(){const R=RULERS[scene()],L=S.line;if(L.i>=R.names.length)return;const n=R.names[L.i],want=R.real(n),off=L.v-want;
 if(Math.abs(off)>R.tol){L.miss=true;A.sound.miss();return say(`That is ${fmt(L.v)} ${R.top}. ${n} is ${fmt(want,1)} ${R.top} away, so move it ${off<0?'further from':'closer to'} the ${scene()==='moon'?'Earth':'Sun'}.`)}
 L.v=want;L.miss=false;L.placed.push(n);L.i++;A.sound.pop();
 say(`${n}: ${fmt(want,1)} ${R.top} is ${fmt(R.model(want),1)} ${R.bot} in the model.`+(L.i<R.names.length?` Next: ${R.names[L.i]}.`:''));if(L.i<R.names.length)L.v=R.max/2}
function nudge(sign){const R=RULERS[scene()],L=S.line;L.v=Math.max(0,Math.min(R.max,L.v+sign*R.nudge));L.miss=false;say(`${fmt(L.v)} ${R.top}: ${fmt(R.model(L.v),1)} ${R.bot} in the model.`)}
/* ---------- 4. one scale on a screen ---------- */
const zTrack=()=>({x:34,x1:A.W-34,y:A.H-fs(40)});
const zx=()=>{const T=zTrack();return T.x+(S.zoom-D.ZMIN)/(D.ZMAX-D.ZMIN)*(T.x1-T.x)};
function posterFacts(){const k=Math.pow(10,S.zoom),earthPx=12756/k,nepX=10+4515e6/k;return{k,earthPx,nepX,fits:nepX<=A.W-10,seen:earthPx>=8}}
function drawPoster(){const g=A.ctx,F=posterFacts(),y=A.H*.42,T=zTrack();g.fillStyle='#1e1b4b';g.fillRect(0,A.H*.2,A.W,A.H*.44);
 g.save();g.beginPath();g.rect(0,A.H*.2,A.W,A.H*.44);g.clip();g.fillStyle=SUNC;g.beginPath();g.arc(10-696350/F.k,y,Math.max(2,696350/F.k),0,TAU);g.arc(10,y,Math.max(2,696350/F.k),0,TAU);g.fill();
 D.PLANETS.forEach(p=>{const x=10+p.mkm*1e6/F.k,r=p.km/2/F.k;if(x>A.W+40)return;if(r>=.4){g.fillStyle='#ffffff';g.beginPath();g.arc(x,y,r+1,0,TAU);g.fill();g.fillStyle=p.col;g.beginPath();g.arc(x,y,r,0,TAU);g.fill()}
  else{g.fillStyle='#e0e7ff';g.fillRect(x-.5,y+8,1,10)}});g.restore();
 tag(`Earth is drawn ${F.earthPx<.01?F.earthPx.toExponential(1):fmt(F.earthPx,F.earthPx<1?3:1)} pixels wide${F.earthPx<.4?': too small to see':''}`,A.W/2,A.H*.08,{f:12,ok:S.seen});
 tag(F.fits?'Neptune is on the screen':`Neptune is ${fmt(F.nepX/A.W)} screens to the right`,A.W/2,A.H*.08+fs(30),{f:12,ok:S.fit});
 g.strokeStyle='#64748b';g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(T.x,T.y);g.lineTo(T.x1,T.y);g.stroke();g.lineCap='butt';
 g.fillStyle=HAND;g.beginPath();g.arc(zx(),T.y,fs(16),0,TAU);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();
 g.fillStyle=INK;g.font=`700 ${fs(11)}${FONT}`;g.textBaseline='bottom';g.textAlign='left';g.fillText('Zoom in',T.x-10,T.y-fs(20));g.textAlign='right';g.fillText('Zoom out',T.x1+10,T.y-fs(20))}
function setZoom(z,quiet){S.zoom=Math.max(D.ZMIN,Math.min(D.ZMAX,z));const F=posterFacts();let news='';
 if(F.fits&&!S.fit){S.fit=true;A.sound.pop();news=`Neptune fits, but Earth is only ${F.earthPx.toExponential(1)} pixels wide: invisible.`}
 if(F.seen&&!S.seen){S.seen=true;A.sound.pop();news=`Earth is ${fmt(F.earthPx,1)} pixels wide, but Neptune is ${fmt(F.nepX/A.W)} screens away.`}
 if(news)say(news+(S.fit&&S.seen?' No screen shows both.':''));else if(!quiet)say(F.fits?'Neptune is on the screen.':`Neptune is ${fmt(F.nepX/A.W)} screens to the right. Earth is ${F.earthPx<.01?'far less than one pixel':fmt(F.earthPx,2)+' pixels'} wide.`);else A.redraw()}
/* ---------- 6. fit the model in a school field ---------- */
const sTrack=()=>({x:34,x1:A.W-34,y:A.H-fs(40)});
const sx=()=>{const T=sTrack();return T.x+(S.sun-D.SUN_MIN)/(D.SUN_MAX-D.SUN_MIN)*(T.x1-T.x)};
function drawField(){const g=A.ctx,T=sTrack(),x0=20,x1=A.W-20,scaleM=140,mx=m=>x0+Math.min(m,scaleM)/scaleM*(x1-x0),y=A.H*.42,f100=mx(D.FIELD_M);
 g.fillStyle='#dcfce7';g.fillRect(x0,y-fs(30),f100-x0,fs(60));g.strokeStyle=OK;g.lineWidth=2;g.strokeRect(x0,y-fs(30),f100-x0,fs(60));
 g.fillStyle=INK;g.font=`700 ${fs(11)}${FONT}`;g.textAlign='center';g.textBaseline='top';g.fillText('100 m field',(x0+f100)/2,y+fs(34));
 ball(x0,y,Math.max(2,S.sun/3),SUNC);
 [['Earth',0],['Jupiter',1],['Neptune',2]].forEach(([n,k])=>{const p=D.byName(n),m=D.awayM(p.mkm,S.sun),x=mx(m);ball(x,y,3,p.col);g.fillStyle=INK;g.textBaseline='bottom';
  g.fillText(m>scaleM?`${n} ${fmt(m)} m →`:n,Math.min(x,A.W-40),y-fs(34)-k*fs(14))});
 const nep=D.awayM(4515,S.sun);tag(`Sun ${S.sun} cm wide · Earth ${fmt(D.sizeMm(12756,S.sun),2)} mm, ${fmt(D.awayM(149.6,S.sun),1)} m away`,A.W/2,A.H*.08,{f:12});
 tag(`Neptune ${fmt(nep,1)} m away: ${nep<=D.FIELD_M?'fits the field':'past the end of the field'}`,A.W/2,A.H*.08+fs(30),{f:12,ok:S.won,bad:nep>D.FIELD_M});
 g.strokeStyle='#64748b';g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(T.x,T.y);g.lineTo(T.x1,T.y);g.stroke();g.lineCap='butt';
 g.fillStyle=HAND;g.beginPath();g.arc(sx(),T.y,fs(16),0,TAU);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();
 g.fillStyle=INK;g.textBaseline='bottom';g.textAlign='left';g.fillText('Smaller Sun',T.x-10,T.y-fs(20));g.textAlign='right';g.fillText('Bigger Sun',T.x1+10,T.y-fs(20))}
function setSun(cm){S.sun=Math.max(D.SUN_MIN,Math.min(D.SUN_MAX,Math.round(cm)));A.redraw()}
function judgeSun(){const nep=D.awayM(4515,S.sun),best=D.fitsSun();
 if(nep>D.FIELD_M){A.sound.miss();return say(`A ${S.sun} cm Sun puts Neptune ${fmt(nep)} m away, past the end of the field. Make the Sun smaller: every distance shrinks with it.`)}
 if(S.sun<best){return say(`It fits: Neptune is ${fmt(nep,1)} m away. A slightly bigger Sun would still fit. Find the biggest.`)}
 S.won=true;A.sound.pop();say(`A ${S.sun} cm Sun puts Neptune ${fmt(nep,1)} m away: it just fits. Earth is now ${fmt(D.sizeMm(12756,S.sun),2)} mm wide, smaller than a grain of sugar.`)}
/* ---------- draw and pointer ---------- */
function draw(){const k=scene();backdrop();if(k==='quiz'){tag('Challenge',A.W/2,A.H*.3,{ok:1});tag('One scale for sizes and distances',A.W/2,A.H*.5);return}
 ({size:drawSize,inner:drawRuler,outer:drawRuler,moon:drawRuler,poster:drawPoster,field:drawField})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene();
 if(k==='size'){const b=bottomKeys(4).find(q=>inside(p,q));if(b&&S.size.i<D.MATCH.length){S.size.drag={i:b.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='inner'||k==='outer'||k==='moon'){const B=band();if(S.line.i<RULERS[k].names.length&&Math.abs(p.y-B.y)<fs(60)){S.grab=true;S.line.v=vOf(p.x);S.line.miss=false;A.redraw();return true}return false}
 if(k==='poster'){const T=zTrack();if(Math.abs(p.y-T.y)<fs(30)){S.grab=true;move(p);return true}return false}
 if(k==='field'){const T=sTrack();if(Math.abs(p.y-T.y)<fs(30)){S.grab=true;move(p);return true}}return false}
function move(p){const k=scene();if(k==='size'&&S.size.drag){Object.assign(S.size.drag,{x:p.x,y:p.y});return A.redraw()}if(!S.grab)return;
 if(k==='poster'){const T=zTrack();setZoom(D.ZMIN+(p.x-T.x)/(T.x1-T.x)*(D.ZMAX-D.ZMIN),true)}
 else if(k==='field'){const T=sTrack();setSun(D.SUN_MIN+(p.x-T.x)/(T.x1-T.x)*(D.SUN_MAX-D.SUN_MIN))}
 else{S.line.v=vOf(p.x);A.redraw()}}
function up(){const k=scene();if(k==='size'&&S.size.drag){const d=S.size.drag;S.size.drag=null;const tapped=Math.hypot(d.x-d.x0,d.y-d.y0)<10,dropped=d.y<bottomKeys(4)[0].y-6;
  if(tapped||dropped)pickThing(d.i);else A.redraw();return}
 if(!S.grab)return;S.grab=false;if(k==='poster')setZoom(S.zoom);else if(k==='field')judgeSun();else placeHere()}
function clear(){run++;for(const k in S)delete S[k];Object.assign(S,{size:{i:0,got:{},miss:-1,drag:null},line:{i:0,v:0,placed:[],miss:false},zoom:5,fit:false,seen:false,sun:10,won:false,grab:false,fast:false,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
/* button twins for every canvas action */
function buttons(){if(!bar)return;bar.innerHTML='';const k=scene(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(k==='size'&&S.size.i<D.MATCH.length)D.THINGS.forEach((t,i)=>add(t.name,()=>pickThing(i),`${D.MATCH[S.size.i].p} is the size of a ${t.name}`));
 if((k==='inner'||k==='outer'||k==='moon')&&S.line.i<RULERS[k].names.length){const n=RULERS[k].names[S.line.i],from=k==='moon'?'Earth':'Sun';
  add('Closer',()=>nudge(-1),`Move ${n} closer to the ${from}`);add('Further',()=>nudge(1),`Move ${n} further from the ${from}`);add('Place here',placeHere,`Place ${n} here`)}
 if(k==='poster'){add('Zoom in',()=>setZoom(S.zoom-D.ZSTEP),'Zoom in so things look bigger');add('Zoom out',()=>setZoom(S.zoom+D.ZSTEP),'Zoom out to see further')}
 if(k==='field'){add('Smaller Sun',()=>{setSun(S.sun-1);judgeSun()},'Make the model Sun 1 cm smaller');add('Bigger Sun',()=>{setSun(S.sun+1);judgeSun()},'Make the model Sun 1 cm bigger')}}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok,setup){clear();if(setup)setup();say(D.DESC[i]);S.hook=watch(i,ok,D.DONE[i])}
function play(i,acts,ms){steps[i].go();S.fast=true;const e=run;acts.forEach((f,j)=>setTimeout(()=>{if(e===run)f()},ms*j+200))}
const placeAll=k=>RULERS[k].names.map(n=>()=>{S.line.v=RULERS[k].real(n);placeHere()});
const steps=[
{h:'How big next to the Sun?',p:'Imagine the Sun shrunk to a football 22 cm wide. Everything else must shrink by the same amount. Pick the thing that is the right size for each planet.',
 predict:{q:'If the Sun were a 22 cm football, how big would Earth be?',opts:['A tennis ball','A grape','A pinhead'],ans:2},task:'Match Earth, Jupiter and Neptune',
 show:()=>play(0,D.MATCH.map(m=>()=>pickThing(m.ans)),600),go:()=>begin(0,()=>S.size.i>=D.MATCH.length)},
{h:'Inner planets',p:'The top ruler shows real distance from the Sun. The bottom ruler shows the same distance in the football model. Drag each planet to its real distance.',
 predict:{q:'The Sun is a football. How far away should the pinhead Earth go?',opts:['About 30 cm','About 24 metres','About 2 km'],ans:1},task:'Place Mercury, Venus, Earth and Mars',
 show:()=>play(1,placeAll('inner'),500),go:()=>begin(1,()=>S.line.i>=4,()=>{S.line.v=120;S.doneText='Mars is 36 m away'})},
{h:'Outer planets',p:'This ruler reaches past Neptune. The inner planets are the dots squashed at the start. Drag each outer planet to its real distance.',task:'Place Jupiter, Saturn, Uranus and Neptune',
 show:()=>play(2,placeAll('outer'),500),go:()=>begin(2,()=>S.line.i>=4,()=>{S.line.v=2400;S.doneText='Neptune is 713 m away'})},
{h:'Can one picture show both?',p:'This picture uses one scale for sizes and distances. Drag the zoom handle along the bottom. Fit Neptune on the screen, then make Earth big enough to see.',
 predict:{q:'A poster 1 metre wide shows sizes and distances to one scale, with Neptune at the edge. How big is Earth on it?',opts:['About as big as a coin','About 1 mm','Far too small to see'],ans:2},task:'Fit Neptune on, then make Earth visible',
 show:()=>play(3,[()=>setZoom(D.ZMAX),()=>setZoom(D.ZMIN)],900),go:()=>begin(3,()=>S.fit&&S.seen)},
{h:'Where is the Moon?',p:'Now zoom in on the pinhead Earth. The top ruler is in thousands of km, the bottom one in model centimetres. Drag the Moon to its real distance.',
 predict:{q:'In the football model, how far is the Moon from the pinhead Earth?',opts:['About 6 cm','About 1 metre','About 24 metres'],ans:0},task:'Place the Moon',
 show:()=>play(4,placeAll('moon'),500),go:()=>begin(4,()=>S.line.i>=1,()=>{S.line.v=150;S.doneText='The Moon is 6 cm from Earth'})},
{h:'Fit the field',p:'A school field is 100 m long. Change the size of the model Sun. Every size and distance changes with it. Find the biggest Sun that keeps Neptune on the field.',task:'Find the biggest Sun that fits',
 show:()=>play(5,[()=>{setSun(8);judgeSun()},()=>{setSun(D.fitsSun());judgeSun()}],800),go:()=>begin(5,()=>S.won)},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.hook()});
function why(t){let m='Use one scale for everything: sizes and distances both shrink by the same amount.';
 if(t==='close')m='Earth is not that close. With a football Sun, Earth is about 24 m away: more than two buses long.';
 if(t==='even')m='The planets are not evenly spaced. Inner planets are close together; the gaps get much bigger further out.';
 if(t==='moon')m='The Moon is very close compared with the planets: 384,000 km, which is only about 6 cm in the football model.';
 return D.WHY[t]||m}
function ask(){qn++;const Q=D.QS[qn%D.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:x=>{chal.hidden=x.step!==6;bar.hidden=x.step===6;buttons()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Solar system scale lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});buttons()}}).start()})})();
