/* Flagship: reflecting light (ages 7-8; NC Y3 light "notice that light is reflected from surfaces"; smooth, shiny
   surfaces such as mirrors and still water reflect light best). Aim a torch at a mirror so the beam bounces onto a star,
   test six surfaces under the beam and compare how clear the bounce is, switch the torch off to see that a mirror makes
   no light of its own, ripple a puddle to break its reflection, then find the reflecting surfaces in a room.
   Not flagshadow (shadows and light sources) or flagsun (sunlight warms things). */
(()=>{
VIS.reg('flagshine',c=>{let A,pad,quiz,qn=-1,epoch=0;const V={};
const INK='#0f172a',CARD='#fff7ed',GOOD='#15803d',BLUE='#1e40af',BAD='#be123c',BEAM='#facc15';
const SURF=[['mirror',10,'A flat mirror'],['water',8,'Still water'],['foil',7,'Flat foil'],['crumple',3,'Crumpled foil'],['paper',2,'White paper'],['cloth',0,'Black cloth']];
const ROOM=[['mirror','Mirror',1],['spoon','Shiny spoon',1],['floor','Polished floor',1],['pond','Still pond',1],['carpet','Fluffy carpet',0],['bark','Tree bark',0]];
const NOTROOM={carpet:'Carpet is rough and fluffy. It spreads the light about, so you can not see a reflection in it.',bark:'Bark is rough and bumpy. The light bounces off in all directions, so there is no clear reflection.'};
const phase=()=>['aim','test','dark','puddle','room','chal'][A.step];
const lim=(v,a,b)=>Math.max(a,Math.min(b,v)),inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function label(t,x,y,o={}){const g=A.ctx;let f=o.f||(A.narrow?15:18);do g.font=`700 ${f}px system-ui`;while(g.measureText(t).width>(o.w||A.W)-26&&--f>10);
 const w=Math.max(o.w||0,g.measureText(t).width+24),h=o.h||f*1.9,X=lim(x-w/2,4,A.W-w-4);g.fillStyle=o.bg||CARD;A.paint.rrect(X,y-h/2,w,h,12);g.fill();
 g.lineWidth=o.ring?3:1.5;g.strokeStyle=o.ring||'#a8a29e';g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,X+w/2,y);return{x:X,y:y-h/2,w,h}}
function torch(x,y,a,on){const g=A.ctx;g.save();g.translate(x,y);g.rotate(a);g.fillStyle='#334155';A.paint.rrect(-34,-11,40,22,6);g.fill();g.fillStyle=on?BEAM:'#94a3b8';g.beginPath();g.moveTo(6,-14);g.lineTo(16,-18);g.lineTo(16,18);g.lineTo(6,14);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();g.restore()}
function ray(x0,y0,x1,y1,w,al){const g=A.ctx;g.strokeStyle=A.alpha(BEAM,al==null?1:al);g.lineWidth=w||6;g.lineCap='round';g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();
 g.strokeStyle=A.alpha('#a16207',(al==null?1:al)*.8);g.lineWidth=1.5;g.stroke()}
function star(x,y,r,hit){const g=A.ctx;g.fillStyle=hit?BEAM:'#e2e8f0';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();for(let i=0;i<10;i++){const q=i%2?r*.45:r,t=-Math.PI/2+i*Math.PI/5;g.lineTo(x+q*Math.cos(t),y+q*Math.sin(t))}g.closePath();g.fill();g.stroke()}
/* ---- 1: aim the torch so the bounce hits the star ---- */
const geo=()=>({tx:A.W*.1,ty:A.H*.28,my:A.H*.8,m0:A.W*.28,m1:A.W*.72,sx:A.W*.86,sy:A.H*.28,sr:Math.max(18,A.W*.04)});
function trace(){const G=geo(),dx=Math.cos(V.aim),dy=Math.sin(V.aim);if(dy<=.02)return{miss:'up'};const t=(G.my-G.ty)/dy,hx=G.tx+dx*t;
 if(hx<G.m0||hx>G.m1)return{hx,miss:'mirror'};const t2=(G.my-G.sy)/dy,ex=hx+dx*t2;return{hx,ex,hit:Math.abs(ex-G.sx)<G.sr*1.1}}
function drawAim(){const g=A.ctx,G=geo(),R=trace();g.fillStyle='#cbd5e1';g.fillRect(G.m0,G.my,G.m1-G.m0,8);g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(G.m0,G.my,G.m1-G.m0,8);
 g.fillStyle='#e0f2fe';g.fillRect(G.m0+2,G.my+1,G.m1-G.m0-4,3);
 if(R.miss==='mirror')ray(G.tx,G.ty,R.hx,G.my);else if(!R.miss){ray(G.tx,G.ty,R.hx,G.my);ray(R.hx,G.my,R.ex,G.sy,6,.9)}
 star(G.sx,G.sy,G.sr,R.hit);torch(G.tx,G.ty,V.aim,true);
 label(R.hit?'The bounce lights the star!':R.miss==='mirror'?'The beam missed the mirror':'Light bounced off the mirror',A.W/2,A.H*.08,{ring:R.hit?GOOD:BLUE})}
function setAim(a,quiet){V.aim=lim(a,.15,1.4);const R=trace();if(R.hit&&!V.hit){V.hit=true;A.sound.pop();return tell('The light bounced off the mirror and lit up the star. A mirror changes the way light goes.')}
 if(quiet)return A.redraw();tell(R.miss==='mirror'?'The beam hits the floor, not the mirror. Aim at the mirror.':R.ex>geo().sx?'The bounce goes past the star. Aim the torch a bit higher.':'The bounce lands short of the star. Aim the torch a bit lower.')}
function aimRight(){const G=geo();A.tween(V,{aim:Math.atan2(G.my-G.ty,(G.sx-G.tx)/2)},700,'out',()=>setAim(V.aim))}
/* ---- 2: test surfaces under the beam ---- */
function drawTest(){const g=A.ctx,n=A.narrow,cx=n?A.W*.5:A.W*.35,my=A.H*(n?.5:.62),s=SURF[V.surf];const tx=cx-A.W*.22,ty=A.H*.18;
 const col={mirror:'#cbd5e1',water:'#38bdf8',foil:'#e5e7eb',crumple:'#d1d5db',paper:'#ffffff',cloth:'#111827'}[s[0]];g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=2;
 g.beginPath();if(s[0]==='crumple'){for(let i=0;i<=10;i++)g.lineTo(cx-70+i*14,my+(i%2?-6:6))}else{g.moveTo(cx-70,my);g.lineTo(cx+70,my)}g.lineTo(cx+70,my+16);g.lineTo(cx-70,my+16);g.closePath();g.fill();g.stroke();
 ray(tx,ty,cx,my);torch(tx,ty,Math.atan2(my-ty,cx-tx),true);const k=s[1];
 if(k>=7)ray(cx,my,cx+(cx-tx),ty,6,k/10);else if(k>0)for(let i=0;i<9;i++){const a=-Math.PI*(.12+i*.095);ray(cx,my,cx+Math.cos(a)*90,my+Math.sin(a)*90,2.5,.25+k*.08)}
 label(s[2]+(k>=7?': one clear bounce':k>0?': light spreads out':': hardly any bounces'),cx,A.H*.06,{ring:BLUE,f:n?14:16,w:n?A.W-10:A.W*.66});
 const bx=n?A.W*.08:A.W*.72,bw=n?A.W*.84:A.W*.25,by=n?A.H*.62:A.H*.18,rh=n?A.H*.055:A.H*.11;
 SURF.forEach((q,i)=>{const y=by+i*rh,done=V.tested.includes(i);g.fillStyle=A.col.tx;g.font=`700 ${n?12:13}px system-ui`;g.textAlign='left';g.textBaseline='middle';g.fillText(q[2],bx,y+rh*.4);
  g.fillStyle=A.alpha(A.col.tx,.15);g.fillRect(bx+bw*.45,y+rh*.15,bw*.5,rh*.5);if(done){g.fillStyle=q[1]>=7?GOOD:q[1]>0?'#b45309':BAD;g.fillRect(bx+bw*.45,y+rh*.15,bw*.5*q[1]/10,rh*.5)}})}
function testSurf(i){V.surf=i;if(!V.tested.includes(i))V.tested.push(i);A.sound.tick();const s=SURF[i];
 tell(s[1]>=7?`${s[2]} is smooth and shiny. The light bounces off in one clear beam.`:s[1]>0?`${s[2]} is rough or dull. The light bounces off in lots of directions, so there is no clear beam.`:`${s[2]} is dark and dull. Hardly any light bounces back.`)}
/* ---- 3: a mirror needs light to reflect ---- */
const things3=()=>{const n=A.narrow,w=n?A.W*.27:A.W*.2,h=A.H*.3,y=A.H*.42;return[['mirror',A.W*.2],['spoon',A.W*.5],['candle',A.W*.8]].map(([k,x])=>({k,x:x-w/2,y,w,h}))};
function drawDark(){const g=A.ctx;g.fillStyle=V.on?'#334155':'#020617';g.fillRect(0,A.H*.16,A.W,A.H*.84);if(V.on)ray(A.W*.02,A.H*.2,A.W*.2,A.H*.5,10,.5);
 things3().forEach(T=>{const cx=T.x+T.w/2,cy=T.y+T.h/2;g.strokeStyle='#e2e8f0';g.lineWidth=2;
  if(T.k==='mirror'){g.fillStyle=V.on?'#e0f2fe':'#0f172a';g.fillRect(T.x+T.w*.2,T.y,T.w*.6,T.h);g.strokeRect(T.x+T.w*.2,T.y,T.w*.6,T.h);if(V.on)star(cx,cy,10,true)}
  if(T.k==='spoon'){g.fillStyle=V.on?'#e5e7eb':'#1e293b';g.beginPath();g.ellipse(cx,T.y+T.h*.25,T.w*.18,T.h*.22,0,0,7);g.fill();g.stroke();g.fillRect(cx-4,T.y+T.h*.45,8,T.h*.55);if(V.on){g.fillStyle='#fff';g.beginPath();g.arc(cx-6,T.y+T.h*.2,5,0,7);g.fill()}}
  if(T.k==='candle'){g.fillStyle='#fef3c7';g.fillRect(cx-12,T.y+T.h*.35,24,T.h*.65);g.fillStyle='#f59e0b';g.beginPath();g.ellipse(cx,T.y+T.h*.22,9,18,0,0,7);g.fill();g.fillStyle=A.alpha('#fde68a',.25);g.beginPath();g.arc(cx,T.y+T.h*.25,40,0,7);g.fill()}
  if(V.miss===T.k){g.strokeStyle=BAD;g.lineWidth=3;g.strokeRect(T.x,T.y,T.w,T.h)}if(V.pick&&T.k==='candle'){g.strokeStyle='#4ade80';g.lineWidth=3;g.strokeRect(T.x,T.y,T.w,T.h)}});
 label(V.on?'Torch on: the mirror and spoon shine':'Torch off: the mirror and spoon go dark',A.W/2,A.H*.08,{ring:BLUE,f:A.narrow?14:17})}
function torchSwitch(){V.on=!V.on;if(!V.on)V.offs++;A.sound.tick();tell(V.on?'Torch on. Its light bounces off the mirror and the spoon, so they shine.':'Torch off. The mirror and the spoon go dark. They only shone because they reflected the torch light. The candle still glows.')}
function pick3(k){if(V.on)return tell('Turn the torch off first. Then see what still shines.');if(k==='candle'){V.pick=true;V.miss=null;A.sound.pop();return tell('Yes. The candle is a light source: it makes its own light. A mirror only reflects light.')}
 V.miss=k;A.sound.miss();tell(k==='mirror'?'The mirror went dark when the torch went off. It makes no light. It only reflects light.':'The spoon only shone with the torch on. It reflects light. It does not make it.')}
/* ---- 4: ripples break up a reflection ---- */
function tree(wy){const g=A.ctx,x=A.W/2;g.fillStyle='#78350f';g.fillRect(x-8,wy-A.H*.22,16,A.H*.22);g.fillStyle='#16a34a';g.beginPath();g.arc(x,wy-A.H*.3,A.H*.12,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke()}
function drawPuddle(){const g=A.ctx,wy=A.H*.56,x=A.W/2,rx=A.W*.38,ry=A.H*.2;g.fillStyle='#bbf7d0';g.fillRect(0,A.H*.16,A.W,wy-A.H*.16);tree(wy);
 g.fillStyle='#0369a1';g.beginPath();g.ellipse(x,wy+ry,rx,ry,0,0,7);g.fill();
 /* the reflection is the tree flipped about the waterline; when windy each thin slice shifts sideways */
 const n=V.wind>.1?30:1,hh=2*ry/n;for(let i=0;i<n;i++){g.save();g.beginPath();g.ellipse(x,wy+ry,rx,ry,0,0,7);g.clip();g.beginPath();g.rect(0,wy+i*hh,A.W,hh+.5);g.clip();
  g.globalAlpha=.75;g.translate(n>1?Math.sin(i*1.7+V.t*6)*16:0,2*wy);g.scale(1,-1);tree(wy);g.restore()}
 if(V.wind>.1){g.strokeStyle=A.alpha('#e0f2fe',.7);g.lineWidth=2;for(let i=0;i<6;i++){g.beginPath();g.ellipse(x+Math.sin(i*2+V.t)*A.W*.2,wy+A.H*(.06+i*.05),30,4,0,0,7);g.stroke()}}
 label(V.wind>.1?'Windy: ripples break up the reflection':'Calm: a clear upside-down tree',A.W/2,A.H*.08,{ring:V.wind>.1?BLUE:GOOD,f:A.narrow?14:17})}
function setWind(on){V.wind=on?1:0;if(on)V.windy++;A.sound.tick();if(!on&&V.windy)V.calm=true;tell(on?'Windy. The ripples make the water bumpy, so the light bounces off every which way. The reflection breaks up.':'Calm again. The still water is smooth, like a mirror, so you see a clear reflection of the tree.')}
/* ---- 5: find the reflecting surfaces ---- */
const rcards=()=>{const n=A.narrow,cols=n?2:3,w=(A.W-30-(cols-1)*10)/cols,h=Math.max(48,A.H*(n?.2:.28));return ROOM.map((_,i)=>({x:15+(i%cols)*(w+10),y:A.H*.2+Math.floor(i/cols)*(h+10),w,h}))};
function drawRoom(){rcards().forEach((r,i)=>{const R=ROOM[i],f=V.found.includes(i);label(R[1]+(f?' ✓':''),r.x+r.w/2,r.y+r.h/2,{w:r.w,h:r.h,bg:f?'#dcfce7':V.miss===i?'#ffe4e6':CARD,ring:f?GOOD:V.miss===i?BAD:null})});
 label(`Found ${V.found.length} of 4 surfaces you can see yourself in`,A.W/2,A.H*.08,{ring:V.found.length>3?GOOD:BLUE,f:A.narrow?13:16})}
function pickRoom(i){const R=ROOM[i];if(V.found.includes(i))return tell(R[1]+' is found already.');if(R[2]){V.found.push(i);V.miss=null;A.sound.pop();return tell(`Yes: ${R[1].toLowerCase()} is smooth and shiny, so it gives a clear reflection.`+(V.found.length>3?' All 4 found.':''))}
 V.miss=i;A.sound.miss();tell(NOTROOM[R[0]])}
function tickAll(dt){V.t+=dt;return phase()==='puddle'&&V.wind>.1}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef9c3',A.col.dark?.05:.35);g.fillRect(0,0,A.W,A.H);const k=phase();
 if(k==='chal'){label('Challenge',A.W/2,A.H*.14,{ring:BLUE});const Q=CQ[qn%CQ.length];if(Q)label(Q.pic,A.W/2,A.H*.5,{f:A.narrow?18:22});return}
 ({aim:drawAim,test:drawTest,dark:drawDark,puddle:drawPuddle,room:drawRoom})[k]()}
function reset(){epoch++;for(const k in V)delete V[k];Object.assign(V,{aim:.35,hit:false,surf:0,tested:[],on:true,offs:0,pick:false,miss:null,wind:0,windy:0,calm:false,t:0,found:[],check:()=>{}})}
function tell(t){speak(t);A.redraw();keys();V.check()}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,say,ok,msg,init){reset();Object.assign(V,init||{});speak(say);keys();V.check=ready(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},A.reduced()?30*(j+1):(ms||400)*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=phase(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='aim'){B('▲ Aim higher',()=>setAim(V.aim-.05),'Aim the torch higher');B('▼ Aim lower',()=>setAim(V.aim+.05),'Aim the torch lower')}
 if(k==='test')SURF.forEach((s,i)=>B(s[2],()=>testSurf(i),'Put '+s[2].toLowerCase()+' under the beam'));
 if(k==='dark'){B(V.on?'Torch off':'Torch on',torchSwitch,V.on?'Switch the torch off':'Switch the torch on');B('Mirror',()=>pick3('mirror'),'The mirror makes its own light');B('Spoon',()=>pick3('spoon'),'The spoon makes its own light');B('Candle',()=>pick3('candle'),'The candle makes its own light')}
 if(k==='puddle'){B('Make it windy',()=>setWind(true),'Make the wind blow on the puddle');B('Make it calm',()=>setWind(false),'Make the puddle calm')}
 if(k==='room')ROOM.forEach((R,i)=>B(R[1],()=>pickRoom(i),'You can see a clear reflection in the '+R[1].toLowerCase()))}
function down(p){const k=phase();
 if(k==='aim'){V.drag=true;move(p);return true}
 if(k==='test')testSurf((V.surf+1)%SURF.length);
 if(k==='dark'){const T=things3().find(T=>inR(p,T));if(T)pick3(T.k);else torchSwitch()}
 if(k==='puddle')setWind(!(V.wind>.1));
 if(k==='room'){const i=rcards().findIndex(r=>inR(p,r));if(i>=0)pickRoom(i)}return false}
function move(p){if(phase()==='aim'&&V.drag){const G=geo();setAim(Math.atan2(p.y-G.ty,p.x-G.tx),true)}}
function up(){if(phase()==='aim'&&V.drag){V.drag=false;setAim(V.aim)}}
const steps=[
{h:'Light bounces',p:'Shine the torch at the mirror on the floor. Drag to aim it, or use the buttons. Make the light land on the star.',
 predict:{q:'Torch light hits a mirror. The light…',opts:['stops at the mirror','bounces off','goes through it'],ans:1},task:'Light up the star',
 show:()=>play(0,[aimRight],300),
 go:()=>enter(0,'A torch on the left. A mirror on the floor. A star on the right.',()=>V.hit,'Light bounces off a mirror: this is called reflection.')},
{h:'Smooth or rough?',p:'Put different surfaces under the beam. Which ones give one clear bounce?',
 predict:{q:'Which surface reflects light best?',opts:['crumpled foil','a flat mirror','black cloth'],ans:1},task:'Test 4 surfaces, including the mirror',
 show:()=>play(1,[()=>testSurf(3),()=>testSurf(4),()=>testSurf(5),()=>testSurf(0)],600),
 go:()=>enter(1,'A torch shines on a flat mirror.',()=>V.tested.length>=4&&V.tested.includes(0),'Smooth, shiny surfaces reflect light best.')},
{h:'Shiny is not a light',p:'A mirror and a spoon shine in the torch light. Switch the torch off. Then tap the thing that makes its own light.',
 predict:{q:'In the dark with the torch off, the mirror…',opts:['still shines','goes dark','gets brighter'],ans:1},task:'Find what makes its own light',
 show:()=>play(2,[torchSwitch,()=>pick3('candle')],800),
 go:()=>enter(2,'A dark room lit by a torch. A mirror, a spoon and a candle.',()=>V.pick,'A mirror makes no light. It reflects light from a source.')},
{h:'Puddle pictures',p:'Still water works like a mirror. Make the wind blow, then make it calm again.',
 predict:{q:'Wind makes ripples on the puddle. The reflection…',opts:['stays just as clear','breaks up','gets brighter'],ans:1},task:'Make it windy, then calm',
 show:()=>play(3,[()=>setWind(true),()=>setWind(false)],900),
 go:()=>enter(3,'A tree next to a calm puddle.',()=>V.calm,'Still water is smooth, so it reflects well. Ripples break it up.')},
{h:'Find reflections',p:'Where could you see yourself? Tap the 4 smooth, shiny surfaces.',task:'Find all 4',
 show:()=>play(4,[()=>pickRoom(0),()=>pickRoom(1),()=>pickRoom(2),()=>pickRoom(3)],500),
 go:()=>enter(4,'Six things in a house and garden.',()=>V.found.length>3,'Mirrors, spoons, polished floors and still water all reflect light well.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.check()});
const CQ=[
 {pic:'torch → mirror',q:'What happens when light hits a mirror?',ans:'it bounces off',bad:[['it stops dead','stop'],['it goes through','through']]},
 {pic:'mirror or cloth?',q:'Which gives the clearest reflection?',ans:'a flat mirror',bad:[['black cloth','dark'],['crumpled foil','crumple']]},
 {pic:'dark room',q:'Is a mirror a light source?',ans:'no: it only reflects light',bad:[['yes: it shines','source'],['yes, but only in the dark','dark2']]},
 {pic:'windy puddle',q:'Why does a windy puddle give a blurry reflection?',ans:'ripples make the water bumpy',bad:[['the water gets dirty','dirty'],['wind blows the light away','blow']]},
 {pic:'carpet',q:'Why can you not see yourself in a carpet?',ans:'it is rough, so light spreads out',bad:[['no light reaches it','nolight'],['carpets make their own light','source']]},
 {pic:'shiny spoon',q:'Why does a spoon shine in a sunny kitchen?',ans:'it reflects the sunlight',bad:[['it makes light','source'],['it is hot','hot']]}];
function slip(t){let m='Think: does light bounce off it in one clear beam?';
 if(t==='stop')m='Light does not stop at a mirror. It bounces off, and that is reflection.';
 if(t==='through')m='A mirror has a silver back, so light can not pass through. It bounces back.';
 if(t==='dark')m='Black cloth is dark and dull. Hardly any light bounces off it.';
 if(t==='crumple')m='Crumpled foil is shiny but bumpy. The bumps send the light all over, so there is no clear picture.';
 if(t==='source')m='It shines only when light falls on it. It makes no light of its own.';
 if(t==='dark2')m='In the dark a mirror shows nothing. It needs light to reflect.';
 if(t==='dirty')m='The water is just as clean. Ripples make it bumpy, so the light bounces every which way.';
 if(t==='blow')m='Wind does not blow light. It makes ripples, and the bumpy water breaks up the reflection.';
 if(t==='nolight')m='Light does reach the carpet. Its rough surface spreads the light out.';
 if(t==='hot')m='Heat does not make it shine. Sunlight bounces off its smooth, shiny surface.';
 return m}
function ask(){qn++;const Q=CQ[qn%CQ.length],o=[[Q.ans,'ok'],...Q.bad],r=qn%3,ord=o.slice(r).concat(o.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>score(t,Q.ans)});speak('Challenge: '+Q.q);A.redraw()}
function score(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();speak(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:Q=>{quiz.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Reflection lab controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);reset();A.every(tickAll);A.gest({down,move,up});keys()}});
A.start()})})();
