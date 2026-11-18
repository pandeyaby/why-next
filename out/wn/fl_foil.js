/* Flagship – how the model of the atom developed (ages 13–15, GCSE). Order the five models on a timeline (Dalton,
   Thomson, Rutherford, Bohr, Chadwick), fire alpha particles at gold foil with real inverse-square repulsion (most pass
   straight, a few swing wide, very few bounce back), zoom in and aim one at the nucleus to turn it round, then match
   each piece of evidence to the change it forced. Buttons mirror every gesture. */
(()=>{
const MODELS=[{n:'Dalton',y:1803,k:'Solid sphere',why:'Atoms are tiny solid spheres that cannot be split.',need:''},
 {n:'Thomson',y:1897,k:'Plum pudding',why:'He found the electron, so atoms have smaller parts: negative electrons in a ball of positive charge.',need:'Thomson found parts inside an atom, so solid atoms must come first.'},
 {n:'Rutherford',y:1911,k:'Nuclear',why:'Alpha scattering showed a tiny positive nucleus, with electrons around it.',need:'Rutherford tested the plum pudding, so the pudding must come first.'},
 {n:'Bohr',y:1913,k:'Shells',why:'Electrons orbit the nucleus at fixed distances, called shells or energy levels.',need:'Bohr put electrons in shells around a nucleus, so the nucleus comes first.'},
 {n:'Chadwick',y:1932,k:'Neutrons',why:'He found the neutron: a neutral particle in the nucleus, with the protons.',need:'Neutrons sit inside the nucleus, so the nucleus and shells come first.'}];
const TRAY=[3,0,4,1,2];
const IDEAS=['Atoms contain small negative particles','Most of an atom is empty space','The centre of an atom is positive','The mass is packed in a tiny nucleus','Electrons sit in fixed shells','The nucleus also holds neutrons'];
const CLUES=[['Cathode rays were far lighter than any atom, and bent towards a positive plate.',0],['Most alpha particles went straight through the gold foil.',1],
 ['Some positive alpha particles were pushed off course.',2],['About 1 in 8000 alpha particles bounced straight back.',3],
 ['Hydrogen gives out light in only a few exact colours.',4],['Helium nuclei had twice the mass their 2 protons could explain.',5]];
const MISS={0:'Think about the very first clue that atoms had parts inside.',1:'Passing straight through means nothing was in the way.',2:'Being pushed away means a like charge: positive repels positive.',
 3:'Bouncing back needs something tiny, heavy and very concentrated.',4:'Exact colours mean electrons can only have set energies.',5:'Extra mass with no extra charge means a neutral particle.'};
VIS.reg('flagfoil',c=>{let A,keys,chal,turn=-1,streak=0,ticket=0;
const L={};const fresh=()=>Object.assign(L,{line:[],tray:TRAY.slice(),shots:[],tally:[0,0,0],aim:.55,zoom:0,hits:0,goal:5,clue:0,oops:-1,drag:null,boxes:[],finish:()=>{},fast:0});
const mode=()=>['intro','order','spray','aim','match','test'][A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.12)),quick=()=>A.reduced()||L.fast;
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function txt(g,s,x,y,w,px,col,b){g.font=`${b||700} ${sz(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const rows=[];let cur='';String(s).split(' ').forEach(t=>{const tr=cur?cur+' '+t:t;if(cur&&g.measureText(tr).width>w){rows.push(cur);cur=t}else cur=tr});rows.push(cur);
 rows.forEach((r,i)=>g.fillText(r,x,y+(i-(rows.length-1)/2)*sz(px)*1.28))}
function tile(g,b,tone,soft){const C=A.col,e={g:C.gr,r:C.rd,a:C.am,c:C.cy,v:C.vi}[tone]||C.ln;g.save();if(!soft){A.paint.shadow(5,2,.12);g.fillStyle=tone?A.mix(C.pn,e,.13):C.pn;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();A.paint.noShadow()}
 else g.setLineDash([5,4]);g.strokeStyle=e;g.lineWidth=2;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.stroke();g.restore()}
function glyph(g,i,x,y,r){const C=A.col;g.save();
 if(i===0)A.paint.ball(x,y,r,C.mu);
 if(i===1){A.paint.ball(x,y,r,A.mix(C.rd,C.pn,.45));[[-.4,-.3],[.35,-.45],[.1,.2],[-.3,.45],[.5,.3]].forEach(([a,b])=>{g.fillStyle=C.cy;g.beginPath();g.arc(x+a*r,y+b*r,r*.13,0,7);g.fill()})}
 if(i>=2){g.strokeStyle=A.alpha(C.cy,.7);g.lineWidth=1.5;if(i===2){g.setLineDash([3,3]);g.beginPath();g.arc(x,y,r,0,7);g.stroke();g.setLineDash([])}
  else[.6,1].forEach(k=>{g.beginPath();g.arc(x,y,r*k,0,7);g.stroke()});
  [[1,.6],[2.2,1],[4,1]].forEach(([t,k])=>{g.fillStyle=C.cy;g.beginPath();g.arc(x+Math.cos(t)*r*(i===2?.75:k),y+Math.sin(t)*r*(i===2?.75:k),r*.11,0,7);g.fill()});
  if(i===4){A.paint.ball(x-r*.1,y,r*.16,C.rd);A.paint.ball(x+r*.12,y+r*.05,r*.16,C.mu)}else A.paint.ball(x,y,r*.16,C.rd)}g.restore()}
function fly(b,d,X){const R=X.R,cx=X.cx,cy=X.cy,k=d/2;let x=X.x0,y=cy+b,vx=1,vy=0,n=0;const pts=[[x,y]];
 while(n++<9000&&x>X.x0-2&&x<A.W+4&&y>-4&&y<A.H+4){const dx=x-cx,dy=y-cy,r=Math.max(Math.hypot(dx,dy),.4),h=Math.min(1.5,Math.max(.03,r/10));
  vx+=k*dx/(r*r*r)*h;vy+=k*dy/(r*r*r)*h;x+=vx*h;y+=vy*h;if(n%3===0)pts.push([x,y])}pts.push([x,y]);
 const deg=Math.abs(Math.atan2(vy,vx))*180/Math.PI;return{pts,deg,kind:deg<10?0:deg<90?1:2}}
const rig=()=>{const R=Math.min(A.W*.36,A.H*.3);return{R,cx:A.W*.58,cy:A.H*.42,x0:A.W*.04}};
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,m=mode();L.boxes=[];
 if(m==='test'){txt(g,'New evidence, new model: solid sphere, plum pudding, nuclear, shells, neutrons.',W/2,H*.45,W-40,18,C.tx,800);return}
 if(m==='intro'){[0,1,2,3,4].forEach(i=>glyph(g,i,W*(.12+i*.19),H*.16,Math.min(W*.075,sz(30))));
  txt(g,'Nobody can see inside an atom. So how do we know what is in there?',W/2,H*.38,W-40,19,C.tx,800);
  txt(g,'Scientists built a model, tested it with experiments, and changed it when the evidence did not fit.',W/2,H*.56,W-40,16,C.mu,700);
  txt(g,'1803 → 1932: five models, five steps.',W/2,H*.74,W-40,17,C.gr,800);return}
 if(m==='order'){const n=5,gap=5,sw=(W-24-gap*4)/n,sh=Math.min(sz(116),H*.33);
  for(let i=0;i<n;i++){const b={x:12+i*(sw+gap),y:10,w:sw,h:sh},j=L.line[i];if(j==null){tile(g,b,'v',1);txt(g,String(i+1),b.x+sw/2,b.y+sh/2,sw,20,C.mu,800);if(i===L.line.length)L.slot=b;continue}
   const M=MODELS[j];tile(g,b,'g');glyph(g,j,b.x+sw/2,b.y+sh*.32,Math.min(sw*.3,sz(20)));txt(g,M.n,b.x+sw/2,b.y+sh*.68,sw-4,11,C.tx,800);txt(g,String(M.y),b.x+sw/2,b.y+sh*.86,sw-4,12,C.gr,900)}
  g.strokeStyle=C.ln;g.lineWidth=3;g.beginPath();g.moveTo(14,sh+20);g.lineTo(W-14,sh+20);g.stroke();
  const top=sh+36,cw=(W-24-2*8)/3,ch=Math.min(sz(108),(H-top-14)/2-6);
  L.tray.forEach((j,s)=>{const M=MODELS[j],d=L.drag,lift=d&&d.j===j&&d.x!=null,b=lift?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch,j}:{x:12+(s%3)*(cw+8),y:top+Math.floor(s/3)*(ch+8),w:cw,h:ch,j};
   tile(g,b,L.oops===j?'r':'c');glyph(g,j,b.x+cw/2,b.y+ch*.32,Math.min(cw*.2,sz(22)));txt(g,M.k,b.x+cw/2,b.y+ch*.72,cw-8,13,C.tx,800);L.boxes.push(b)});
  if(!L.tray.length)txt(g,'Each model fixed a problem the one before could not explain.',W/2,top+sz(60),W-30,16,C.gr,800)}
 if(m==='spray'||m==='aim'){const X=rig(),zoomed=m==='aim';
  if(!zoomed){g.fillStyle=A.alpha(C.am,.22);g.fillRect(X.cx-5,8,10,H*.78);txt(g,'gold foil',X.cx,H*.84,120,12,C.mu,800)}
  else{g.setLineDash([4,4]);g.strokeStyle=A.alpha(C.cy,.6);g.beginPath();g.arc(X.cx,X.cy,X.R*.95,0,7);g.stroke();g.setLineDash([])}
  A.paint.ball(X.cx,X.cy,zoomed?sz(9):sz(5),C.rd);
  L.shots.forEach((s,i)=>{const last=i===L.shots.length-1;g.strokeStyle=A.alpha([C.gr,C.am,C.rd][s.kind],last?1:.45);g.lineWidth=last?2.5:1.3;g.beginPath();s.pts.forEach(([x,y],q)=>q?g.lineTo(x,y):g.moveTo(x,y));g.stroke()});
  A.paint.rrect(4,X.cy-X.R-8,sz(18),X.R*2+16,6);g.fillStyle=A.alpha(C.vi,.25);g.fill();
  if(zoomed){const ay=X.cy+L.aim*X.R;g.setLineDash([6,5]);g.strokeStyle=C.vi;g.lineWidth=2;g.beginPath();g.moveTo(X.x0,ay);g.lineTo(X.cx-sz(14),ay);g.stroke();g.setLineDash([]);A.paint.ball(X.x0+sz(8),ay,sz(9),C.vi);
   txt(g,`Aim: ${Math.round(Math.abs(L.aim)*100)}% of the way out from the centre line`,W/2,H*.86,W-30,14,C.tx,800);txt(g,'Zoomed in: real nuclei are about 100,000 times smaller than the atom.',W/2,H*.94,W-30,12,C.mu,700)}
  else txt(g,`Straight ${L.tally[0]} · Pushed off course ${L.tally[1]} · Bounced back ${L.tally[2]}`,W/2,H*.93,W-20,14,C.tx,800);
  if(!zoomed&&L.shots.length>=40)txt(g,'Nucleus drawn bigger than real so you can see it.',W/2,H*.05,W-30,12,C.mu,700)}
 if(m==='match'){const cl=CLUES[L.clue],tb={x:12,y:8,w:W-24,h:sz(70)};tile(g,tb,'a');txt(g,cl?'🔬 '+cl[0]:'✓ Every model change was forced by evidence.',W/2,tb.y+tb.h/2,tb.w-20,15,C.tx,800);
  const y0=tb.y+tb.h+12,hh=Math.min(sz(52),(H-y0-10)/6-6);IDEAS.forEach((t,i)=>{const b={x:12,y:y0+i*(hh+6),w:W-24,h:hh,i},used=i<L.clue;tile(g,b,used?'g':L.oops===i?'r':'c',used);txt(g,(used?'✓ ':'')+t,W/2,b.y+hh/2,b.w-16,14,used?C.mu:C.tx,800);if(!used)L.boxes.push(b)})}
 A.fx.draw(g)}
function wrong(t,j){A.sound.miss();L.oops=j;tell(t);A.redraw();setTimeout(()=>{L.oops=-1;A.redraw()},quick()?10:1800)}
function step(t){L.hits++;A.sound.pop();tell(t);buttons();A.redraw();if(L.hits>=L.goal)L.finish()}
function place(j){if(mode()!=='order'||L.hits>=L.goal)return;const want=L.line.length;if(j!==want)return wrong('Not yet. '+MODELS[j].need,j);
 L.line.push(j);L.tray=L.tray.filter(x=>x!==j);step(`${MODELS[j].y}, ${MODELS[j].n}: ${MODELS[j].why}`)}
function fire(b,zoomed){const X=rig(),s=fly(b*X.R,zoomed?X.R/4:X.R/40,X);L.shots.push(s);if(L.shots.length>60)L.shots.shift();return s}
function spray(n){if(L.hits>=L.goal)return;for(let i=0;i<n&&L.hits<L.goal;i++){const s=fire(Math.random()*2-1,0);L.tally[s.kind]++;L.hits++}A.sound.tick();
 tell(`${L.hits} fired: ${L.tally[0]} straight, ${L.tally[1]} pushed off course, ${L.tally[2]} bounced back.`);buttons();A.redraw();if(L.hits>=L.goal)L.finish()}
function shoot(){if(L.hits>=L.goal)return;const s=fire(L.aim,1);A.redraw();
 if(s.kind<2)return wrong(s.kind?`Turned ${Math.round(s.deg)}°. Closer to the centre line pushes harder.`:'It sailed past: the nucleus is tiny, so most aims miss it.',-1);step(`Turned ${Math.round(s.deg)}°: it bounced back! Only a tiny, dense, positive nucleus could push that hard.`)}
function nudge(k){L.aim=Math.max(-1,Math.min(1,Math.round((L.aim+k)*20)/20));tell(`Aim ${Math.round(Math.abs(L.aim)*100)}% out from the centre line.`);A.redraw()}
function link(i){if(mode()!=='match'||!CLUES[L.clue])return;if(i!==CLUES[L.clue][1])return wrong(MISS[CLUES[L.clue][1]],i);L.clue++;step('Yes: '+IDEAS[i]+'.')}
function buttons(){if(!keys)return;keys.innerHTML='';const m=mode(),K=(t,f,lab)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},keys,t);b.onclick=f};
 if(m==='test'||m==='intro'||L.hits>=L.goal)return;
 if(m==='order')L.tray.forEach(j=>K(MODELS[j].k,()=>place(j),'Place '+MODELS[j].k+' model next'));
 if(m==='spray'){K('Fire 1 α',()=>spray(1),'Fire one alpha particle');K('Fire 10 α',()=>spray(10),'Fire ten alpha particles')}
 if(m==='aim'){K('▲ Up',()=>nudge(-.05),'Aim higher');K('▼ Down',()=>nudge(.05),'Aim lower');K('Fire α',shoot,'Fire the alpha particle')}
 if(m==='match')IDEAS.forEach((t,i)=>{if(i>=L.clue)K(t,()=>link(i))})}
const inside=(p,b)=>p.x>=b.x-3&&p.x<=b.x+b.w+3&&p.y>=b.y-3&&p.y<=b.y+b.h+3;
const gest={down(p){const m=mode();if(L.hits>=L.goal||m==='test'||m==='intro')return false;
  if(m==='spray'){spray(1);return true}if(m==='aim'){L.drag={aim:1};gest.move(p);return true}
  const b=L.boxes.find(q=>inside(p,q));if(!b)return false;L.drag={j:b.j,i:b.i,x:null,sx:p.x,sy:p.y};return true},
 move(p){const d=L.drag;if(!d)return;if(d.aim){const X=rig();L.aim=Math.max(-1,Math.min(1,Math.round((p.y-X.cy)/X.R*40)/40));return A.redraw()}
  if(mode()==='order'&&(d.x!=null||Math.hypot(p.x-d.sx,p.y-d.sy)>8)){d.x=p.x;d.y=p.y;A.redraw()}},
 up(p){const d=L.drag;L.drag=null;if(!d)return;if(d.aim)return shoot();if(mode()==='match')return link(d.i);
  if(d.x==null||(L.slot&&inside(p,L.slot))||p.y<A.H*.4)return place(d.j);tell('Drop it on the next gap in the timeline, or tap it.');A.redraw()}};
function play(f){const t=++ticket,loop=()=>{if(t!==ticket||L.hits>=L.goal)return;f();setTimeout(loop,quick()?5:90)};setTimeout(loop,30)}
function auto(){const m=mode();if(m==='order')return place(L.line.length);if(m==='spray')return spray(10);if(m==='aim'){L.aim=0;return shoot()}if(m==='match')return link(CLUES[L.clue][1])}
const restart=()=>{ticket++;fresh()};
const close=(i,msg)=>()=>{if(A.step===i&&L.hits>=L.goal&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
const demo=i=>()=>{steps[i].go();L.fast=1;play(auto)};
const steps=[
{h:'Models that change',p:'An atom model is a picture scientists build from evidence. When a new experiment does not fit, the model must change.',go:()=>{restart();tell('Five models of the atom, from 1803 to 1932. Each one changed because of new evidence.')}},
{h:'Build the timeline',p:'Put the five models in order. Each one was built on the one before.',predict:{q:'Why did scientists change the model of the atom?',opts:['New evidence did not fit the old model','Newer ideas were more popular'],ans:0},task:'Place all 5 models in order',show:demo(1),
 go:()=>{restart();tell('Drag each model to the next gap on the timeline, or tap it.');buttons();L.finish=close(1,'Solid sphere → plum pudding → nuclear → shells → neutrons. Each step followed new evidence.')}},
{h:'Fire at gold foil',p:'In 1909 Geiger and Marsden, working for Rutherford, fired positive alpha particles at very thin gold foil. Fire some yourself and count where they go.',predict:{q:'In the plum pudding model, positive charge is spread thinly. What should alpha particles do?',opts:['Almost all pass nearly straight through','Many bounce straight back'],ans:0},task:'Fire 40 alpha particles',show:demo(2),
 go:()=>{restart();L.goal=40;tell('Tap the canvas or the fire buttons to send alpha particles at the foil.');buttons();L.finish=close(2,`Most went straight through, as the pudding predicted. But some swung wide, and in the real experiment about 1 in 8000 bounced back. The pudding cannot do that.`)}},
{h:'Aim at the nucleus',p:'Zoom in on one atom. Drag up or down to aim, then let go to fire. Can you turn one right round?',predict:{q:'What could turn an alpha particle right back?',opts:['A tiny, dense, positive centre','The spread-out positive pudding','The light electrons'],ans:0},task:'Make 1 alpha particle bounce back',show:demo(3),
 go:()=>{restart();L.goal=1;tell('Drag to aim, let go to fire. Or use Up, Down and Fire.');buttons();L.finish=close(3,'Only a near hit bounces back. So the positive charge and mass sit in a tiny nucleus, and most of the atom is empty.')}},
{h:'Evidence to model',p:'Match each discovery to what it told scientists about the atom.',predict:{q:'Hydrogen gives out only a few exact colours of light. Which model explained this?',opts:['Bohr: electrons in fixed shells','Dalton: solid spheres'],ans:0},task:'Match all 6 clues',show:demo(4),
 go:()=>{restart();L.goal=6;tell('Read the clue, then tap what it tells us.');buttons();L.finish=close(4,'Electrons (Thomson), empty space, a positive centre and a dense nucleus (Rutherford), shells (Bohr), neutrons (Chadwick).')}},
{h:'Challenge',p:'',go:()=>{restart();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>L.finish()});
const BANK=[['Why did most alpha particles go straight through the gold foil?',[['Most of the atom is empty space','ok'],['There are gaps between gold atoms','gaps'],['Alpha particles are too small to hit anything','small']]],
 ['What did the few large deflections show?',[['A tiny, dense, positive nucleus','ok'],['Positive charge spread through the atom','pudding'],['Electrons pushing the alpha particles','electron']]],
 ['Which model came straight after the plum pudding model?',[['The nuclear model (Rutherford)','ok'],['The solid sphere model (Dalton)','order'],['The neutron model (Chadwick)','order']]],
 ['What did Bohr add to the nuclear model?',[['Electrons in shells at fixed distances','ok'],['The neutron','chad'],['Electrons dotted in positive pudding','pudding']]],
 ['Why was the plum pudding model replaced?',[['The alpha scattering results did not fit it','ok'],['It was too old to trust','old'],['Thomson changed his mind for no reason','whim']]],
 ['What did Chadwick discover in 1932?',[['Neutral neutrons in the nucleus','ok'],['The electron','thom'],['That atoms are solid spheres','dalton']]]];
function why(t){let m='Check the evidence: what each experiment saw, and what it proved.';
 if(t==='gaps')m='Gold foil is many atoms thick with no gaps; the particles passed through the atoms themselves.';
 if(t==='small')m='Some did hit something: a few bounced back. So the atom is mostly empty, not the particle too small.';
 if(t==='pudding')m='Spread-out charge is too weak to swing a fast alpha particle. Only a concentrated positive nucleus can.';
 if(t==='electron')m='Electrons are about 8000 times lighter than an alpha particle. They cannot turn it round.';
 if(t==='order')m='Order: solid sphere (1803), plum pudding (1897), nuclear (1911), shells (1913), neutrons (1932).';
 if(t==='chad')m='Neutrons came later, from Chadwick in 1932. Bohr placed electrons in shells.';
 if(t==='old')m='Age does not end a model. Evidence that does not fit it does.';
 if(t==='whim')m='He did not: the alpha scattering evidence forced the change.';
 if(t==='thom')m='Thomson found the electron, in 1897.';
 if(t==='dalton')m='That was Dalton’s 1803 idea, which the electron disproved.';
 return m}
function next(){turn++;const[q,ops]=BANK[turn%BANK.length],sh=turn%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=(ok?`✓ Correct! Streak: ${streak}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next question →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.72,tall:1.4,draw,onStep:A=>{chal.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);restart();A.gest(gest);buttons()}});
A.start()})})();
