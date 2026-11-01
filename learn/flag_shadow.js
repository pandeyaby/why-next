/* Flagship – light, dark and shadows (ages 4–5): in a dark room, find the things that give light (not the shiny spoon or
   the Moon); put a teddy in a torch beam to make a shadow on the wall; switch the torch off and the shadow goes; move the
   teddy to grow and shrink its shadow; guess which toy made a shadow from its shape. Drag or tap, big targets, few words. */
(()=>{
const THINGS=[['torch',1],['teddy',0],['lamp',1],['spoon',0],['candle',1],['Moon',0]];
const WHO=[['cup','#2563eb'],['star','#ca8a04'],['ball','#dc2626']],ROUNDS=[0,1,2],TAN=.42;
const NOT={teddy:'A teddy does not make light. It needs light to be seen.',spoon:'Shiny things bounce light, but they do not make it.',Moon:'The Moon looks bright, but it makes no light. Sunlight bounces off it.'};
VIS.reg('flagshadow',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},won:0,r:0,lit:[],on:true,fx:.45,fy:.6,grab:null,goal:'big',bad:-1,flash:''}),S=B0();
const mode=()=>['find','make','off','size','who','quiz'][A.step];
const R=()=>A.reduced(),fz=n=>Math.round(n*(A.narrow?1:1.15));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function label(g,t,x,y,n,col){g.font=`800 ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||'#f8fafc';g.fillText(t,x,y,A.W-16)}
/* geometry: torch on the left, a screen on the right, the teddy in between */
const G=()=>{const{W,H}=A;return{tx:W*.1,ty:H*.55,wall:W*.72,sx:W*.84,top:H*.06,bot:H*.94,s:Math.min(W,H)*.07}};
const OX=()=>S.fx*A.W,OY=()=>S.fy*A.H,scale=()=>{const g=G();return(g.wall-g.tx)/(OX()-g.tx)};
function inBeam(){const g=G();return OX()>g.tx+g.s*1.2&&Math.abs(OY()-g.ty)<(OX()-g.tx)*TAN-g.s*.3}
const shadowOn=()=>S.on&&inBeam();
function teddy(g,x,y,s,col,line){g.fillStyle=col;[[x-s*.42,y-s*.92,s*.22],[x+s*.42,y-s*.92,s*.22],[x,y-s*.45,s*.55],[x,y+s*.6,s*.75]].forEach(([a,b,r])=>{g.beginPath();g.arc(a,b,r,0,7);g.fill();if(line){g.strokeStyle=line;g.lineWidth=2;g.stroke()}})}
function shape(g,k,x,y,s,col){g.fillStyle=col;g.beginPath();
 if(k==='ball')g.arc(x,y,s,0,7);
 if(k==='cup'){g.rect(x-s*.7,y-s*.8,s*1.4,s*1.6);g.fill();g.beginPath();g.lineWidth=s*.28;g.strokeStyle=col;g.arc(x+s*.75,y,s*.45,-1.4,1.4);g.stroke();return}
 if(k==='star'){for(let i=0;i<10;i++){const a=-1.571+i*.6283,r=i%2?s*.45:s*1.05;g.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}g.closePath()}g.fill()}
function torch(g){const{tx,ty,s}=G(),C=A.col;g.fillStyle='#64748b';A.paint.rrect(tx-s*1.4,ty-s*.35,s*1.4,s*.7,6);g.fill();g.fillStyle=S.on?'#fde047':'#334155';A.paint.rrect(tx-s*.15,ty-s*.55,s*.35,s*1.1,5);g.fill();
 g.strokeStyle=S.bad===9?C.rd:'#f8fafc';g.lineWidth=2;A.paint.rrect(tx-s*.15,ty-s*.55,s*.35,s*1.1,5);g.stroke()}
function beam(g){const{tx,ty,wall}=G(),d=(wall-tx)*TAN;g.fillStyle='rgba(253,224,71,.28)';g.beginPath();g.moveTo(tx+4,ty-8);g.lineTo(wall,ty-d);g.lineTo(wall,ty+d);g.lineTo(tx+4,ty+8);g.closePath();g.fill()}
function screen(g){const{wall,top,bot,ty,tx}=G(),{W}=A,d=(wall-tx)*TAN,w=W*.96-wall;g.fillStyle='#475569';g.fillRect(wall,top,w,bot-top);
 if(S.on){g.fillStyle='#fef9c3';g.fillRect(wall,Math.max(top,ty-d),w,Math.min(bot,ty+d)-Math.max(top,ty-d))}
 g.save();g.beginPath();g.rect(wall,top,w,bot-top);g.clip();const sh=mode()==='who'?null:shadowOn();
 if(sh){const k=scale(),y=ty+(OY()-ty)*k;teddy(g,G().sx,y,G().s*k,'#111827')}
 if(mode()==='who'&&S.on){const[k]=WHO[ROUNDS[Math.min(S.r,2)]];shape(g,k,G().sx-G().s*.3,ty,G().s*1.05,'#111827')}g.restore()}
function room(g){const{W,H}=A;g.fillStyle=S.on||mode()==='find'?'#1e293b':'#020617';g.fillRect(0,0,W,H)}
/* step 1: what gives light */
function cells(){const{W,H}=A,w=W/3,h=H*.42;return THINGS.map((_,i)=>({x:(i%3)*w,y:H*.1+Math.floor(i/3)*h,w,h}))}
function thing(g,k,x,y,s,lit){if(lit){g.fillStyle=A.paint.rad(x,y,s*.2,s*2.2,[[0,'rgba(253,224,71,.75)'],[1,'rgba(253,224,71,0)']]);g.beginPath();g.arc(x,y,s*2.2,0,7);g.fill()}
 const dim=lit?'#facc15':'#94a3b8';g.fillStyle=dim;g.strokeStyle='#f8fafc';g.lineWidth=2;
 if(k==='torch'){g.fillStyle='#64748b';g.fillRect(x-s,y-s*.3,s*1.5,s*.6);g.fillStyle=lit?'#fde047':'#475569';g.fillRect(x+s*.5,y-s*.45,s*.4,s*.9)}
 if(k==='lamp'){g.fillStyle=lit?'#fde047':'#94a3b8';g.beginPath();g.moveTo(x-s*.4,y-s);g.lineTo(x+s*.4,y-s);g.lineTo(x+s*.7,y-s*.2);g.lineTo(x-s*.7,y-s*.2);g.closePath();g.fill();g.fillStyle='#64748b';g.fillRect(x-s*.08,y-s*.2,s*.16,s);g.fillRect(x-s*.5,y+s*.8,s,s*.16)}
 if(k==='candle'){g.fillStyle='#e2e8f0';g.fillRect(x-s*.25,y-s*.3,s*.5,s*1.1);g.fillStyle=lit?'#f97316':'#475569';g.beginPath();g.ellipse(x,y-s*.6,s*.16,s*.3,0,0,7);g.fill()}
 if(k==='teddy')teddy(g,x,y,s*.75,'#a16207');
 if(k==='spoon'){g.fillStyle='#cbd5e1';g.beginPath();g.ellipse(x,y-s*.5,s*.35,s*.5,0,0,7);g.fill();g.fillRect(x-s*.08,y,s*.16,s)}
 if(k==='Moon'){g.fillStyle='#e2e8f0';g.beginPath();g.arc(x,y,s*.8,0,7);g.fill();g.fillStyle='#1e293b';g.beginPath();g.arc(x+s*.4,y-s*.2,s*.7,0,7);g.fill()}}
function draw(A){const{ctx:g,W,H}=A,v=mode();room(g);
 if(v==='quiz'){label(g,'Light comes from a light source.',W/2,H*.4,15);label(g,'Block it and you make a shadow.',W/2,H*.56,15);return}
 if(v==='find'){cells().forEach((r,i)=>{const[k]=THINGS[i],cx=r.x+r.w/2,cy=r.y+r.h*.45;if(S.bad===i){g.strokeStyle=A.col.rd;g.lineWidth=4;A.paint.rrect(r.x+6,r.y+4,r.w-12,r.h-8,14);g.stroke()}
  thing(g,k,cx,cy,Math.min(r.w,r.h)*.2,S.lit.includes(i));label(g,k,cx,r.y+r.h*.86,13)});label(g,S.flash||`Lights found: ${S.lit.length} of 3`,W/2,H*.05,15);return A.fx.draw(g)}
 if(S.on)beam(g);screen(g);torch(g);
 if(v==='who'){const y=A.H*.86;WHO.forEach(([k,col],i)=>{const x=W*(.2+i*.2);if(S.bad===i){g.strokeStyle=A.col.rd;g.lineWidth=4;g.beginPath();g.arc(x,y,G().s*1.15,0,7);g.stroke()}shape(g,k,x,y,G().s*.7,col)});label(g,'Who made this shadow?',W*.36,H*.12,14)}
 else{teddy(g,OX(),OY(),G().s,'#a16207','#f8fafc');
  const t=S.flash||(v==='size'?(S.goal==='big'?'Make a BIG shadow.':'Now make a small shadow.'):v==='off'?(S.on?'Tap the torch to switch it off.':'Dark. No light, no shadow.'):shadowOn()?'A shadow!':'Drag the teddy into the light.');label(g,t,W*.36,H*.12,14)}
 A.fx.draw(g)}
const lastN=()=>({find:1,make:1,off:1,size:2,who:3}[mode()]||9);
const miss=(t,b)=>{A.sound.miss();S.bad=b==null?-1:b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},R()?10:900);A.redraw()};
function setup(){const v=mode(),g=G();S.grab=null;S.flash='';S.on=true;S.lit=[];S.goal=S.r?'small':'big';
 if(v==='make'){S.fx=.4;S.fy=.85}else{S.fx=.45;S.fy=(g.ty+g.s*.2)/A.H}}
function win(t){S.won++;S.r++;A.sound.pop();if(S.won<lastN()){const keep=[S.fx,S.fy];setup();if(mode()==='size'){S.fx=keep[0];S.fy=keep[1]}say(t+' Next one.')}else say(t);buttons();A.redraw();S.want()}
function find(i){if(mode()!=='find'||S.won)return;const[k,src]=THINGS[i];if(!src)return miss(NOT[k],i);if(S.lit.includes(i))return say(`The ${k} is on already. Find another.`);
 S.lit.push(i);A.sound.tick();if(S.lit.length>=3)return win('Torch, lamp and candle all give light. They are light sources.');say(`Yes! The ${k} gives light.`);A.redraw()}
/* after each move, say what the light does now */
function judge(){const v=mode(),k=scale();if(S.won>=lastN())return;
 if(v==='make'){if(shadowOn())return win('The teddy blocks the light, so a shadow falls on the wall behind it.');return miss('The teddy is not in the light, so nothing is blocked. Move it into the yellow beam.')}
 if(v==='size'){if(!inBeam())return miss('Keep the teddy in the light, or there is no shadow at all.');
  if(S.goal==='big'){if(k>2.3)return win('Close to the torch, the teddy blocks lots of light. Big shadow!');return miss('Still quite small. Move the teddy closer to the torch.')}
  if(k<1.45)return win('Close to the wall, the shadow is small, just a bit bigger than the teddy.');return miss('Still big. Move the teddy closer to the wall.')}
 say(shadowOn()?'The teddy blocks the light. There is its shadow.':'No shadow here.')}
function moveTo(x,y){const g=G();S.fx=Math.max(g.tx+g.s*1.3,Math.min(A.W*.66,x))/A.W;S.fy=Math.max(A.H*.26,Math.min(A.H*.88,y))/A.H;A.redraw()}
function nudge(dx,dy){if(!['make','off','size'].includes(mode()))return;moveTo(OX()+dx*A.W*.09,OY()+dy*A.H*.09);A.sound.tick();judge()}
function flip(){const v=mode();if(!['make','off','size'].includes(v))return;S.on=!S.on;A.sound.tick();
 if(v==='off'&&!S.on&&S.won<1){A.redraw();return win('Torch off: no light to block, so the shadow is gone.')}say(S.on?'Torch on.':'Torch off. It is dark.');A.redraw()}
function guess(i){if(mode()!=='who'||S.won>=3)return;const want=ROUNDS[Math.min(S.r,2)];
 const looks={cup:'a cup with a handle',star:'five points',ball:'round'};
 if(i!==want)return miss(`The ${WHO[i][0]} would make a shadow that is ${looks[WHO[i][0]]}. A shadow has no colour. Look at the shape.`,i);win(`Yes, the ${WHO[want][0]}! A shadow has the same shape as the thing that blocks the light.`)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;
 if(v==='find')THINGS.forEach(([k],i)=>B(k,()=>find(i),`The ${k} gives light`));
 if(['make','off','size'].includes(v)){B('◀ To torch',()=>nudge(-1,0),'Move the teddy closer to the torch');B('To wall ▶',()=>nudge(1,0),'Move the teddy closer to the wall');B('▲ Up',()=>nudge(0,-1),'Move the teddy up');B('▼ Down',()=>nudge(0,1),'Move the teddy down');
  B(S.on?'Torch off 🔦':'Torch on 🔦',()=>{flip();buttons()},'Switch the torch on or off')}
 if(v==='who')WHO.forEach(([k],i)=>B(k,()=>guess(i),`The ${k} made the shadow`))}
/* pointer */
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const v=mode(),g=G();if(S.won>=lastN())return false;
 if(v==='find'){const i=cells().findIndex(r=>inR(p,r));if(i>=0)find(i);return false}
 if(v==='who'){const i=WHO.findIndex((_,j)=>Math.hypot(p.x-A.W*(.2+j*.2),p.y-A.H*.86)<g.s*1.2);if(i>=0)guess(i);return false}
 if(Math.hypot(p.x-g.tx,p.y-g.ty)<g.s*1.3){flip();buttons();return false}
 if(Math.hypot(p.x-OX(),p.y-OY())<g.s*1.4){S.grab={dx:OX()-p.x,dy:OY()-p.y};return true}return false}
function move(p){if(S.grab)moveTo(p.x+S.grab.dx,p.y+S.grab.dy)}
function up(){if(!S.grab)return;S.grab=null;judge()}
const chk=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*(gap||260)))}
const fresh=()=>{run++;Object.assign(S,B0());if(A)setup()};
const place=(fx,fy)=>()=>{moveTo(A.W*fx,fy==null?G().ty:A.H*fy);judge()};
const steps=[
{h:'What gives light?',p:'It is dark. Tap the things that make their own light.',task:'Find the 3 light sources',
 show:()=>{steps[0].go();play([0,2,4].map(i=>()=>find(i)),450)},go:()=>{fresh();say('It is dark. What gives light?');buttons();S.want=chk(0,()=>S.won>=1,'A light source makes its own light.')}},
{h:'Make a shadow',p:'Drag the teddy into the yellow light. Or use the arrow buttons.',predict:{q:'Where will the teddy\u2019s shadow be?',opts:['Next to the torch','On the wall behind the teddy'],ans:1},task:'Make a shadow on the wall',
 show:()=>{steps[1].go();play([place(.42)],300)},go:()=>{fresh();say('Put the teddy in the light.');buttons();S.want=chk(1,()=>S.won>=1,'The shadow is on the side away from the light.')}},
{h:'Switch it off',p:'The teddy is in the light. Now tap the torch to switch it off.',predict:{q:'Torch off. What happens to the shadow?',opts:['It stays on the wall','It goes away'],ans:1},task:'Switch off the torch',
 show:()=>{steps[2].go();play([flip],300)},go:()=>{fresh();say('Switch off the torch.');buttons();S.want=chk(2,()=>S.won>=1,'A shadow needs light. In the dark there is no shadow.')}},
{h:'Big and small',p:'Move the teddy near the torch, then near the wall. Watch the shadow.',predict:{q:'Teddy goes close to the torch. The shadow gets…',opts:['Smaller','Bigger'],ans:1},task:'Make a big shadow, then a small one',
 show:()=>{steps[3].go();play([place(.2),place(.64)],600)},go:()=>{fresh();say('Make a big shadow.');buttons();S.want=chk(3,()=>S.won>=2,'Closer to the light, bigger shadow.')}},
{h:'Whose shadow?',p:'Look at the shadow on the wall. Which toy made it?',task:'Name 3 shadows',
 show:()=>{steps[4].go();play(ROUNDS.map(i=>()=>guess(i)),500)},go:()=>{fresh();say('Who made this shadow?');buttons();S.want=chk(4,()=>S.won>=3,'Same shape, but dark with no colour.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which one is a light source?',[['A lamp','ok'],['A shiny spoon','shiny'],['A teddy','teddy']]],
 ['The sun is behind you. Where is your shadow?',[['In front of me','ok'],['Behind me, by the sun','toward'],['On top of me','top']]],
 ['You switch off every light. Can you see your shadow?',[['No, it is dark','ok'],['Yes, shadows are always there','always'],['Yes, it is darker','darker']]],
 ['A red ball blocks the light. What colour is its shadow?',[['Dark, no colour','ok'],['Red','colour'],['Yellow','yellow']]],
 ['You move a toy close to the torch. What happens to its shadow?',[['It gets bigger','ok'],['It gets smaller','smaller'],['It goes away','gone']]]];
function why(t){let m='A shadow forms where something blocks the light.';
 if(t==='shiny')m='Shiny things bounce light. They do not make it.';if(t==='teddy')m='A teddy makes no light. A lamp does.';
 if(t==='toward')m='The shadow is on the other side of you, away from the light.';if(t==='top')m='Light comes from behind, so the shadow lies in front.';
 if(t==='always')m='No light, no shadow. A shadow needs light to block.';if(t==='darker')m='When it is all dark, nothing is lit, so there is no shadow to see.';
 if(t==='colour')m='A shadow is where light cannot get to, so it has no colour.';if(t==='yellow')m='The light is yellow, but the shadow is where the light is blocked.';
 if(t==='smaller')m='Close to the torch it blocks more light, so the shadow grows.';if(t==='gone')m='It still blocks the light, so the shadow is still there, just bigger.';return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Bright thinking.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
