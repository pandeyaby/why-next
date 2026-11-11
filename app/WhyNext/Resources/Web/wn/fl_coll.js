/* Flagship – collision theory (ages 14–16): fire one particle at another to see that only collisions with at least the
   activation energy react, then run 10-second tests in a particle box while changing temperature, concentration and a
   catalyst, record every test in a results table, and read the energy spread of the collisions against Ea. */
(()=>{
const BW=100,BH=60,R=2.2,D2=(2*R)*(2*R),EA=10500,CAT=.6,DT=1/120,NB=40,NU=20,RUNS=[7,11,13,17,19,23,29,31];
VIS.reg('flagcoll',c=>{let A,ctl,tb,rd,qb,qn=-1,run=0,ver=0;
const S={T:20,nA:30,cat:false,P:[],rows:[],hist:[],seed:7,shot:null,bounced:0,reacted:0,flash:[],want:()=>{}};
const md=()=>['shot','temp','conc','cat','goal','quiz'][A.step];
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
/* seeded random numbers so a test at the same settings always gives the same count */
let sd=1;const rnd=()=>{sd=(sd*16807)%2147483647;return sd/2147483647},gauss=()=>{let u=0,v=0;while(!u)u=rnd();v=rnd();return Math.sqrt(-2*Math.log(u))*Math.cos(6.2832*v)};
const sig=T=>60*Math.sqrt((T+273)/293),ea=cat=>EA*(cat?CAT:1);
function part(k,T){const s=sig(T);return{k,x:R+rnd()*(BW-2*R),y:R+rnd()*(BH-2*R),vx:gauss()*s,vy:gauss()*s}}
function fill(o){const P=[];for(let i=0;i<o.nA;i++)P.push(part('a',o.T));for(let i=0;i<NB;i++)P.push(part('b',o.T));return P}
/* one time step: water molecules (not drawn) jostle each particle now and then, holding the temperature steady; then move,
   bounce off walls, and count each acid-and-B pair once when it first touches while closing in */
function step(P,o,log){let hits=0,wins=0;const E0=ea(o.cat),was=o.ct||new Set(),now=new Set();for(const p of P){if(rnd()<NU*DT){const q=sig(o.T);p.vx=gauss()*q;p.vy=gauss()*q}p.x+=p.vx*DT;p.y+=p.vy*DT;if(p.x<R&&p.vx<0||p.x>BW-R&&p.vx>0)p.vx*=-1;if(p.y<R&&p.vy<0||p.y>BH-R&&p.vy>0)p.vy*=-1}
 for(let i=0;i<P.length;i++){const a=P[i];if(a.k!=='a')continue;for(let j=0;j<P.length;j++){const b=P[j];if(b.k!=='b')continue;const dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy;if(d2>D2||d2===0)continue;const key=i*512+j;now.add(key);if(was.has(key))continue;
  const d=Math.sqrt(d2),nx=dx/d,ny=dy/d,vn=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;if(vn<=0)continue;hits++;const E=.25*vn*vn;log&&log(E);
  if(E>=E0){wins++;o.onWin&&o.onWin((a.x+b.x)/2,(a.y+b.y)/2);Object.assign(a,part('a',o.T));Object.assign(b,part('b',o.T))}else{a.vx-=vn*nx;a.vy-=vn*ny;b.vx+=vn*nx;b.vy+=vn*ny}}}o.ct=now;return[hits,wins]}
/* a test is eight 10 s runs from different random starts; the table shows the mean per run */
function test(){const H=[];let h=0,w=0;RUNS.forEach((z,k)=>{sd=z;const o={T:S.T,nA:S.nA,cat:S.cat},P=fill(o);for(let t=0;t<10/DT;t++){const r=step(P,o,k?null:E=>H.push(E));h+=r[0];w+=r[1]}});
 const row={T:S.T,nA:S.nA,cat:S.cat,h:Math.round(h/8),w:Math.round(w/8)};h=row.h;w=row.w;S.rows.push(row);S.hist=H;S.histEa=ea(S.cat);table();A.sound.tick();
 say(`Test at ${row.T} °C, ${row.nA} acid particles${row.cat?', catalyst':''}: ${w} of ${h} collisions reacted (${pc(row)}).`);S.want();A.redraw();return row}
const pc=r=>(r.h?100*r.w/r.h:0).toFixed(1)+'%';
function table(){if(!tb)return;tb.innerHTML=S.rows.length?`<table class="fl-tbl"><caption>Your tests (mean of 8 runs of 10 s)</caption><tr><th>°C</th><th>acid</th><th>cat.</th><th>hits</th><th>reacted</th><th>share</th></tr>${S.rows.slice(-6).map(r=>`<tr><td>${r.T}</td><td>${r.nA}</td><td>${r.cat?'yes':'no'}</td><td>${r.h}</td><td>${r.w}</td><td>${pc(r)}</td></tr>`).join('')}</table>`:''}
function live(){sd=S.seed+S.rows.length;S.P=fill(S);S.lo=null}
function setT(v){const old=S.T;S.T=Math.max(0,Math.min(100,v));const k=Math.sqrt((S.T+273)/(old+273));S.P.forEach(p=>{p.vx*=k;p.vy*=k});say(`Temperature ${S.T} °C. The particles move ${S.T>old?'faster':'slower'}.`);keys();A.redraw()}
function setN(v){S.nA=v;live();say(`${v} acid particles in the box.`);keys();A.redraw()}
function setCat(v){S.cat=v;say(v?'Catalyst on: the activation energy is lower.':'Catalyst off.');keys();A.redraw()}
/* layout: the box on top, the energy panel underneath */
const box=()=>{const w=A.W-20,h=Math.min(A.H*.5,w*BH/BW);return{x:10,y:8,w,h,s:Math.min(w/BW,h/BH)}};
function T(g,t,x,y,n,col,al,w){g.font=`${w||700} ${n}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y)}
function drawBox(g){const b=box(),C=A.col;g.fillStyle=A.mix(C.pn,C.dark?'#0f172a':'#f8fafc',.6);A.paint.rrect(b.x,b.y,BW*b.s,BH*b.s,10);g.fill();g.strokeStyle=A.mix(C.tx,C.pn,.5);g.lineWidth=1.5;g.stroke();
 for(const p of S.P){const r=Math.max(3,R*b.s);const px=b.x+p.x*b.s,py=b.y+p.y*b.s;g.fillStyle=p.k==='a'?C.cy:C.or;if(p.k==='a'){g.beginPath();g.arc(px,py,r,0,7);g.fill()}else g.fillRect(px-r*.9,py-r*.9,r*1.8,r*1.8)}
 S.flash=S.flash.filter(f=>f.t>0);for(const f of S.flash){g.globalAlpha=Math.min(1,f.t*2);g.strokeStyle=C.gr;g.lineWidth=3;g.beginPath();g.arc(b.x+f.x*b.s,b.y+f.y*b.s,(1-f.t)*7+5,0,7);g.stroke()}g.globalAlpha=1;
 T(g,`${S.T} °C · ${S.nA} acid ● · ${NB} B ■${S.cat?' · catalyst':''}`,b.x+6,b.y+BH*b.s+14,12,C.mu,'left')}
function drawHist(g,y0,h){const C=A.col,x0=34,w=A.W-50,E0=ea(S.cat),max=1.6*EA,bins=24,cnt=new Array(bins).fill(0);S.hist.forEach(E=>{const i=Math.min(bins-1,Math.floor(E/max*bins));cnt[i]++});const hot=cnt.filter((n,i)=>(i+.5)*max/bins>=E0),top=Math.max(1,6*Math.max(1,...hot)),cut=cnt.some(n=>n>top);
 g.strokeStyle=A.mix(C.tx,C.pn,.4);g.lineWidth=1;g.beginPath();g.moveTo(x0,y0);g.lineTo(x0,y0+h);g.lineTo(x0+w,y0+h);g.stroke();
 cnt.forEach((n,i)=>{const bx=x0+i*w/bins,bh=Math.min(1,n/top)*(h-6),hot=(i+.5)*max/bins>=E0;g.fillStyle=hot?C.gr:A.mix(C.mu,C.pn,.3);g.fillRect(bx+1,y0+h-bh,w/bins-2,bh);if(n>top)T(g,'▲',bx+w/bins/2,y0+2,10,C.tx)});if(cut)T(g,'▲ bar cut off: most hits are gentle',x0+w,y0-12,11,C.mu,'right');
 const ex=x0+E0/max*w;g.strokeStyle=C.rd;g.lineWidth=2.5;g.setLineDash([6,4]);g.beginPath();g.moveTo(ex,y0-4);g.lineTo(ex,y0+h);g.stroke();g.setLineDash([]);
 T(g,`Ea${S.cat?' (catalyst)':''}`,ex+4,y0+4,12,C.tx,'left',800);T(g,'collision energy →',x0+w,y0+h+12,11,C.mu,'right');T(g,S.hist.length?'green: enough energy':'run a test to see the energy spread',x0+2,y0+h+12,11,C.mu,'left')}
function drawShot(g){const C=A.col,W=A.W,y=A.H*.36,s=S.shot,r=Math.min(26,W*.05);g.fillStyle=A.mix(C.pn,C.dark?'#0f172a':'#f8fafc',.6);A.paint.rrect(10,10,W-20,A.H*.56,12);g.fill();
 if(s.prod){A.paint.ball(s.bx-r*.6,y,r,C.cy);A.paint.ball(s.bx+r*.6,y,r,C.or);T(g,'AB',s.bx,y,15,C.dark?'#0f172a':'#fff','center',800);T(g,'Reacted! New product',s.bx,y-r-16,14,C.gr,'center',800)}else{A.paint.ball(s.ax,y,r,C.cy);A.paint.ball(s.bx,y,r,C.or);T(g,'A',s.ax,y,15,C.dark?'#0f172a':'#fff','center',800);T(g,'B',s.bx,y,15,C.dark?'#0f172a':'#fff','center',800)}
 if(s.pull>0&&!s.flying){g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(s.ax+r,y);g.lineTo(s.home,y);g.stroke()}
 const bx=30,bw=W-60,by=A.H*.74,E=s.E;g.fillStyle=A.mix(C.pn,C.mu,.2);g.fillRect(bx,by,bw,16);g.fillStyle=E>=1?C.gr:C.am;g.fillRect(bx,by,bw*Math.min(1,E/2),16);
 g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(bx+bw/2,by-8);g.lineTo(bx+bw/2,by+24);g.stroke();T(g,'activation energy Ea',bx+bw/2,by-16,12,C.tx,'center',800);
 T(g,s.E?`collision energy: ${(s.E*100).toFixed(0)}% of Ea`:'Pull particle A back, then let go',W/2,by+40,13,C.tx);T(g,'A = acid particle, B = the other reactant',W/2,A.H*.62,11,C.mu)}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=C.pn;g.fillRect(0,0,A.W,A.H);const m=md();
 if(m==='shot')return drawShot(g);if(m==='quiz'){T(g,'React only if: they collide, with at least Ea.',A.W/2,A.H/2,15,C.tx,'center',800);return}
 drawBox(g);const b=box(),y0=b.y+BH*b.s+44;drawHist(g,y0,A.H-y0-24);A.fx.draw(g)}
/* the slingshot: pull distance sets the speed, so the collision energy */
const home=()=>A.W*.12+30;
function shoot(E){const s=S.shot;if(s.flying)return;s.E=E;s.flying=true;s.prod=false;const r=Math.min(26,A.W*.05),k=ver,o={x:s.ax};A.tween(o,{x:s.bx-2*r},A.reduced()?1:420,'io',()=>{if(k!==ver)return;
 if(E>=1){s.prod=true;S.reacted++;A.sound.win();say(`Energy ${(E*100).toFixed(0)}% of Ea: enough. The particles react and make a product.`)}else{S.bounced++;A.sound.miss();say(`Energy ${(E*100).toFixed(0)}% of Ea: not enough. They bounce apart unchanged.`)}
 const back={x:s.bx-2*r};A.tween(back,{x:home()},A.reduced()?1:380,'out',()=>{s.flying=false;s.ax=home();s.pull=0;setTimeout(()=>{if(k===ver){s.prod=false;A.redraw()}},A.reduced()?1:500);S.want()});A.every(()=>{if(s.flying&&k===ver){s.ax=back.x;return true}return false})});
 A.every(()=>{if(s.flying&&k===ver&&o.x<s.bx-2*r){s.ax=o.x;return true}return false})}
function down(p){if(md()!=='shot')return false;const s=S.shot,r=Math.min(26,A.W*.05);if(!s.flying&&Math.hypot(p.x-s.ax,p.y-A.H*.36)<r+20){S.drag=1;return true}return false}
function move(p){const s=S.shot;if(!S.drag)return;s.ax=Math.max(20,Math.min(home(),p.x));s.pull=(home()-s.ax)/(home()-20);s.E=2*s.pull*s.pull;A.redraw()}
function up(){if(!S.drag)return;S.drag=0;const s=S.shot;if(s.pull<.05){s.ax=home();return A.redraw()}s.ax=home();shoot(s.E)}
function keys(){if(!ctl)return;ctl.innerHTML='';const m=md(),B=(t,f,lab)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm'},ctl,t);if(lab)b.setAttribute('aria-label',lab);b.onclick=f;return b};
 if(m==='shot'){B('Gentle push',()=>shoot(.45));B('Hard push',()=>shoot(1.5));return}if(m==='quiz')return;
 if(m==='temp'||m==='goal'){B('− 20 °C',()=>setT(S.T-20),'Cool by 20 degrees');c.el('span',{},ctl,`${S.T} °C`);B('+ 20 °C',()=>setT(S.T+20),'Warm by 20 degrees')}
 if(m==='conc'||m==='goal')[15,30,60].forEach(n=>{const b=B(`${n} acid`,()=>setN(n));b.setAttribute('aria-pressed',String(S.nA===n))});
 if(m==='cat'||m==='goal'){const b=B(S.cat?'Catalyst: on':'Catalyst: off',()=>setCat(!S.cat));b.setAttribute('aria-pressed',String(S.cat))}
 c.el('button',{type:'button',class:'lbtn sm'},ctl,'▶ Run a 10 s test').onclick=test}
function tick(dt){if(!A||A.reduced()||md()==='shot'||md()==='quiz'||!S.P.length)return false;const o=S.lo||(S.lo={onWin:(x,y)=>S.flash.length<10&&S.flash.push({x,y,t:1})});Object.assign(o,{T:S.T,nA:S.nA,cat:S.cat});const n=Math.round(dt/DT*.5);for(let i=0;i<n;i++)step(S.P,o);S.flash.forEach(f=>f.t-=dt*1.5);return true}
const pair=(f)=>{for(let i=0;i<S.rows.length;i++)for(let j=0;j<S.rows.length;j++){const a=S.rows[i],b=S.rows[j];if(f(a,b))return[a,b]}return null};
const tP=()=>pair((a,b)=>a.T<=20&&b.T>=60&&a.nA===b.nA&&!a.cat&&!b.cat),cP=()=>pair((a,b)=>a.nA<b.nA&&a.T===b.T&&!a.cat&&!b.cat),kP=()=>pair((a,b)=>!a.cat&&b.cat&&a.T===b.T&&a.nA===b.nA);
const say2=([a,b])=>`${a.w} of ${a.h} (${pc(a)}) became ${b.w} of ${b.h} (${pc(b)}).`;
const done=(n,f,msg)=>()=>{if(A.step!==n||steps[n].predict&&A.pred[n]==null)return;const r=f();if(r)A.done((typeof msg==='function'?msg(r):msg)+A.reveal(n))};
const go=(n,f,msg,t,o)=>{ver++;Object.assign(S,{T:20,nA:30,cat:false,rows:[],hist:[],bounced:0,reacted:0,flash:[]},o||{});S.shot={ax:home(),bx:A.W*.6,home:home(),pull:0,E:0,flying:false,prod:false};live();table();S.want=done(n,f,msg);say(t);keys()};
const steps=[
{h:'Bounce or react?',p:'Particles must collide to react. But do all collisions work? Pull particle A back and let go. A longer pull means a faster, harder hit.',
 predict:{q:'Two particles collide. Do they always react?',opts:['Yes, every collision reacts','Only if they hit with enough energy'],ans:1},task:'Get one bounce and one reaction',
 show:()=>{steps[0].go();shoot(.45);setTimeout(()=>shoot(1.5),A.reduced()?20:1100)},go:()=>go(0,()=>S.bounced&&S.reacted,'A collision only works if its energy is at least the activation energy, Ea.','Pull particle A back, then let go.')},
{h:'Turn up the heat',p:'Run a 10 s test at 20 °C. Then heat the box to 60 °C or more and run another. Compare the hits and the share that reacted.',
 predict:{q:'Heating speeds up a reaction mainly because…',opts:['Particles collide more often, that is all','The activation energy gets lower','More hits, and a bigger share have at least Ea'],ans:2},task:'Run a test at 20 °C and one at 60 °C or hotter',
 show:()=>{steps[1].go();test();setT(80);test()},go:()=>go(1,tP,p=>`Hotter: ${say2(p)} A few more hits, and a much bigger share above Ea.`,'20 °C. Run a test, then heat it up.')},
{h:'Crowd them in',p:'Concentration is how many particles are in the same space. Run a test, change the number of acid particles, then run another at the same temperature.',
 predict:{q:'You double the acid particles. What happens to the share of hits that react?',opts:['It doubles','It stays about the same'],ans:1},task:'Test two concentrations',
 show:()=>{steps[2].go();test();setN(60);test()},go:()=>go(2,cP,p=>`More crowded: ${say2(p)} More hits per second, but each hit is no harder.`,'30 acid particles. Run a test, then change the number.')},
{h:'Add a catalyst',p:'A catalyst gives the reaction a different route with a lower activation energy. Watch the red Ea line on the energy graph move.',
 predict:{q:'A catalyst speeds up a reaction by…',opts:['Giving particles more energy','Lowering the activation energy','Being used up'],ans:1},task:'Test with and without a catalyst',
 show:()=>{steps[3].go();test();setCat(true);test()},go:()=>go(3,kP,p=>`With a catalyst: ${say2(p)} Same temperature, same speeds: Ea moved, so more bars are green.`,'No catalyst yet. Run a test.')},
{h:'Fastest reaction',p:'Use all three dials. Get at least 600 reactions per 10 s run. Which mix of conditions does it?',task:'Get 600 or more reactions per run',
 show:()=>{steps[4].go();setT(100);setN(60);setCat(true);test()},go:()=>go(4,()=>S.rows.some(r=>r.w>=600),'Hot, crowded and catalysed: more hits, and more of them above Ea.','Set the dials, then run a test.')},
{h:'Challenge',p:'',go:()=>{ver++;S.P=[];quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Why does milk go off more slowly in a fridge?',[['Particles move slower: fewer hits, and fewer with at least Ea','ok'],['The cold stops all particles moving','stop'],['Cold raises the activation energy','eaT']]],
 ['Heating by 10 °C can double a rate, but the number of hits rises only a few %. What explains the rest?',[['Many more hits now have at least Ea','ok'],['The particles get bigger','size'],['The activation energy falls','eaT']]],
 ['Doubling the acid concentration roughly doubles the rate because…',[['There are twice as many hits each second','ok'],['Each hit has twice the energy','energy'],['The particles move twice as fast','speed']]],
 ['Powdered marble reacts with acid faster than one lump because…',[['More surface area, so more particles can be hit','ok'],['Powder is hotter','hot'],['Powder has a lower activation energy','eaS']]],
 ['Which is true of a catalyst?',[['It lowers Ea by a different route and is not used up','ok'],['It gives particles more energy','catE'],['It is used up as the reaction goes','used']]]];
function why(t){let m='Rate depends on how often particles collide and what share of hits have at least Ea.';
 if(t==='stop')m='Particles never stop at fridge temperature. They slow down, so hits are rarer and fewer reach Ea.';
 if(t==='eaT')m='Ea is set by the reaction, not the temperature. Heat changes the particles: faster, so more hits reach Ea.';
 if(t==='size')m='Particle size does not change with temperature. The extra rate comes from the bigger share of hits above Ea.';
 if(t==='energy')m='Crowding does not make hits harder. Your test showed the share that reacts stayed about the same.';
 if(t==='speed')m='Speed depends on temperature, not concentration. More particles just means more hits.';
 if(t==='hot')m='Powder and lump are at the same temperature. Only particles on the surface can be hit, and powder has far more surface.';
 if(t==='eaS')m='Same substance, same reaction, same Ea. Powder wins on surface area, so on how often hits happen.';
 if(t==='catE')m='A catalyst does not speed particles up. It lowers Ea, so more of the same hits are hard enough.';
 if(t==='used')m='A catalyst is left unchanged at the end, so a small amount can be used again and again.';return m}
function quiz(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),ok=t==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}
 fb.innerHTML=(ok?`✓ Right: frequency and energy of collisions. ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.1,draw,onStep:A=>{const q=A.step===5;qb.hidden=!q;ctl.hidden=q;tb.hidden=q||A.step===0;keys();table()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);tb=c.el('div',{class:'fl-read','aria-live':'polite'},w);qb=c.el('div',{class:'fl-chal'},A.below);A.every(tick);A.gest({down,move,up});keys()}});
A.start()})})();
