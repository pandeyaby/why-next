/* Flagship – diffusion and particle movement (11–14): lift a divider and watch coloured particles spread, follow one
   particle's random path, count crossings both ways at equilibrium, race hot vs cold water, and gas vs liquid. */
(()=>{
const VISC=[[5,1.52],[20,1],[35,.72],[50,.55],[65,.43],[80,.355]];
const fT=T=>{let v=1;for(const[t,u]of VISC)if(t===T)v=u;return(T+273)/293/v};
const TS=VISC.map(x=>x[0]),N=60;
function mk(kind,T){const b={kind,T,open:false,P:[],bg:[],cross:[0,0],log:[],t:0,even:0};const liq=kind!=='gas';
 b.k=liq?12:3;b.v=liq?.31*Math.sqrt(fT(T)):.35;
 for(let i=0;i<N;i++){const a=Math.random()*6.283;b.P.push({x:Math.random()*.48+.01,y:Math.random()*.98+.01,a,side:0,tr:null})}
 for(let i=0;i<(liq?110:24);i++)b.bg.push({x:Math.random(),y:Math.random(),p:Math.random()*6});return b}
function stepBox(b,dt){b.t+=dt;const sp=b.v;
 for(const p of b.P){if(Math.random()<b.k*dt)p.a=Math.random()*6.283;let nx=p.x+Math.cos(p.a)*sp*dt,ny=p.y+Math.sin(p.a)*sp*dt;
  if(nx<.01||nx>.99){p.a=Math.PI-p.a;nx=Math.min(.99,Math.max(.01,nx))}if(ny<.01||ny>.99){p.a=-p.a;ny=Math.min(.99,Math.max(.01,ny))}
  if(!b.open&&nx>.49){p.a=Math.PI-p.a;nx=.49}p.x=nx;p.y=ny;const s=p.x>.5?1:0;if(s!==p.side){b.cross[p.side]++;b.log.push([b.t,p.side]);p.side=s}
  if(p.tr){p.tr.push([p.x,p.y]);if(p.tr.length>260)p.tr.shift()}}
 for(const q of b.bg){q.p+=dt*(b.kind==='gas'?3:6)}
 b.log=b.log.filter(e=>e[0]>b.t-5);const r=right(b),c=cols(b);if(b.open&&r>=.4&&Math.min(...c)>=N/5*.55)b.even=b.even||b.t}
const right=b=>b.P.filter(p=>p.x>.5).length/N;
const cols=b=>{const c=[0,0,0,0,0];b.P.forEach(p=>c[Math.min(4,p.x*5|0)]++);return c};
VIS.reg('flagdiff',c=>{let A,pad,quiz,qi=-1;
const S={one:null,duo:null,track:null,turns:0,back:0,ff:1,race:0,res:'',want:()=>{},tl:20,tr:65,lastA:0};
const R=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const mode=()=>['lift','follow','eq','temp','state','quiz'][A.step];
function lay(){const{W,H}=A,v=mode();if(v==='temp'||v==='state'){const g=12,w=(W-3*g)/2,h=Math.min(H*.6,w*1.15);return[{x:g,y:34,w,h},{x:2*g+w,y:34,w,h}]}
 const w=W-24,h=Math.min(H*.6,w*.62);return[{x:12,y:30,w,h}]}
function drawBox(g,b,r,label){const C=A.col;g.fillStyle=b.kind==='gas'?A.mix(C.bg,'#e0f2fe',C.dark?.06:.6):A.mix(C.bg,'#bfdbfe',C.dark?.12:.55);A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.strokeStyle=C.ln;g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,8);g.stroke();
 g.fillStyle=A.alpha(C.mu,.35);for(const q of b.bg){g.beginPath();g.arc(r.x+r.w*(q.x+.004*Math.cos(q.p)),r.y+r.h*(q.y+.004*Math.sin(q.p*1.3)),b.kind==='gas'?2:2.6,0,7);g.fill()}
 if(!b.open){g.strokeStyle=C.tx;g.lineWidth=4;g.beginPath();g.moveTo(r.x+r.w/2,r.y+2);g.lineTo(r.x+r.w/2,r.y+r.h-2);g.stroke()}else{g.setLineDash([3,5]);g.strokeStyle=A.alpha(C.mu,.7);g.lineWidth=1;g.beginPath();g.moveTo(r.x+r.w/2,r.y);g.lineTo(r.x+r.w/2,r.y+r.h);g.stroke();g.setLineDash([])}
 const rad=A.narrow?3.2:4;for(const p of b.P){if(p.tr){g.strokeStyle=C.am;g.lineWidth=2;g.beginPath();p.tr.forEach(([x,y],i)=>i?g.lineTo(r.x+r.w*x,r.y+r.h*y):g.moveTo(r.x+r.w*x,r.y+r.h*y));g.stroke()}
  g.fillStyle=p.tr?C.am:C.vi;g.beginPath();g.arc(r.x+r.w*p.x,r.y+r.h*p.y,p.tr?rad+2.5:rad,0,7);g.fill()}
 const c5=cols(b),bh=36,by=r.y+r.h+8,cw=r.w/5;c5.forEach((n,i)=>{const h=bh*n/(N*.6);g.fillStyle=A.alpha(C.vi,.75);g.fillRect(r.x+i*cw+3,by+bh-Math.min(bh,h),cw-6,Math.min(bh,h))});
 g.strokeStyle=C.ln;g.lineWidth=1;g.beginPath();g.moveTo(r.x,by+bh+.5);g.lineTo(r.x+r.w,by+bh+.5);g.stroke();
 g.fillStyle=C.tx;g.font=`700 ${fs(13)}px system-ui`;g.textAlign='left';g.textBaseline='bottom';g.fillText(label,r.x+2,r.y-6,r.w-4);
 g.font=`600 ${fs(12)}px system-ui`;g.textBaseline='top';g.fillText(`Right half: ${Math.round(right(b)*100)}%`+(b.open&&right(b)>=.4?' · even':''),r.x+2,by+bh+5,r.w-4);return by+bh+22}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,C.bg,.5);g.fillRect(0,0,W,H);if(v==='quiz'){A.fx.draw(g);return}
 const L=lay();let y=0;
 if(S.one&&L.length===1){const b=S.one;y=drawBox(g,b,L[0],{lift:'Scent particles (purple) and air (grey)',follow:'Tap a purple particle to follow it',eq:'Wait for the colour to even out'}[v]);
  if(b.open){const l5=b.log,rt=l5.filter(e=>e[1]===0).length,lt=l5.length-rt;g.font=`700 ${fs(13)}px system-ui`;g.fillStyle=C.tx;g.textAlign='left';g.fillText(`Crossing the middle, last 5 s:  → ${rt}   ← ${lt}`,14,y+2,W-28);
   g.font=`600 ${fs(12)}px system-ui`;const tol=Math.max(3,.3*(rt+lt));g.fillText(rt-lt>tol?'More go right than left: net movement to the right.':b.even&&Math.abs(rt-lt)<=tol?'About the same each way: no net movement.':'Keep watching.',14,y+22,W-28)}
  if(v==='follow'&&S.track){g.font=`600 ${fs(12)}px system-ui`;g.fillStyle=C.tx;g.fillText(`Turns: ${S.turns}  ·  times it headed back left: ${S.back}`,14,y+42,W-28)}}
 if(S.duo&&L.length===2){S.duo.forEach((b,i)=>{const lab=v==='temp'?`Water at ${b.T} °C`:b.kind==='gas'?'Scent in air (gas)':'Ink in water (liquid)';y=Math.max(y,drawBox(g,b,L[i],lab))});
  if(S.res)A.paint.label(S.res,W/2,y+16,{bg:'#14532d',font:`700 ${fs(12)}px system-ui`});else if(!S.race)A.paint.label(v==='temp'?'Set the two temperatures, then start the race':'Start the race',W/2,y+16,{bg:'#1e3a8a',font:`700 ${fs(12)}px system-ui`})}
 A.fx.draw(g)}
let last=0;
function tick(dt){if(!A||A.step>4)return false;dt=Math.min(dt,.05);if(R())dt=Math.min(dt,.03);let any=false;const ff=S.ff;
 if(S.one&&S.one.open){for(let k=0;k<ff;k++){const b=S.one,p=S.track,a0=p?p.a:0;stepBox(b,dt);if(p&&p.a!==a0){S.turns++;if(Math.cos(p.a)<-.3)S.back++}}any=true;S.want()}
 if(S.duo&&S.race&&!S.res){const m=(mode()==='temp'?3:1)*S.ff;S.duo.forEach(b=>{for(let k=0;k<m;k++)stepBox(b,dt)});const w=S.duo.find(b=>b.even);any=true;
  if(w){const o=S.duo.find(b=>b!==w),nm=b=>mode()==='temp'?b.T+' °C':b.kind==='gas'?'The gas':'The liquid';const sh=b=>mode()==='temp'?b.T+' °C':b.kind==='gas'?'Gas':'Liquid',pc=Math.round(right(o)*100);S.res=`${sh(w)} spread first; ${sh(o).toLowerCase()} only ${pc}% across`;speak(`${nm(w)} spread out first. ${nm(o)}: only ${pc}% on the right.`);A.sound.tick();S.race=0;S.won=w;S.want();buttons()}}
 if(any)A.redraw();return any}
function freshOne(){S.one=mk('gas',20);S.track=null;S.turns=0;S.back=0;S.ff=S.demo?4:1;S.won=null}
function freshDuo(){S.ff=S.demo?3:1;S.res='';S.race=0;S.won=null;S.duo=mode()==='temp'?[mk('liq',S.tl),mk('liq',S.tr)]:[mk('gas',20),mk('liq',20)]}
function lift(){const b=S.one;if(!b||b.open)return;b.open=true;A.sound.tick();speak('Divider lifted. Watch where the purple particles go.');buttons();A.redraw()}
function follow(p){const b=S.one;if(!b)return;b.P.forEach(q=>q.tr=null);p=p||b.P.filter(q=>q.x<.5)[Math.random()*20|0]||b.P[0];p.tr=[[p.x,p.y]];S.track=p;S.turns=0;S.back=0;if(!b.open)b.open=true;
 speak('Following one particle. Watch its path.');buttons();A.redraw()}
function setT(side,d){if(S.race)return;const k=side?'tr':'tl',i=Math.max(0,Math.min(TS.length-1,TS.indexOf(S[k])+d));S[k]=TS[i];freshDuo();speak(`${side?'Right':'Left'} box: water at ${S[k]} °C.`);buttons();A.redraw()}
function race(){if(S.race)return;freshDuo();S.duo.forEach(b=>b.open=true);S.race=1;A.sound.tick();speak('Divider lifted in both boxes. Which spreads first?');buttons();A.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l,on)=>{const b=c.el('button',{type:'button',class:'lbtn ghost'+(on?' on':''),'aria-label':l||null,'aria-pressed':on==null?null:String(!!on)},pad,t);b.onclick=fn};
 if(v==='lift'||v==='eq'){if(!S.one.open)B('Lift the divider',lift);if(v==='eq')B('Fast-forward ×4',()=>{S.ff=S.ff>1?1:4;buttons()},'Fast-forward',S.ff>1);B('Reset',()=>{freshOne();buttons();A.redraw()})}
 if(v==='follow'){B(S.track?'Follow a different one':'Follow a particle',()=>follow());B('Reset',()=>{freshOne();buttons();A.redraw()})}
 if(v==='temp'){B('Left −',()=>setT(0,-1),'Left box colder');B('Left +',()=>setT(0,1),'Left box warmer');B('Right −',()=>setT(1,-1),'Right box colder');B('Right +',()=>setT(1,1),'Right box warmer')}
 if(v==='temp'||v==='state')B(S.res?'Race again':'Start the race',race);A.redraw()}
function down(p){const v=mode();if(v==='lift'||v==='eq'){lift();return false}
 if(v==='follow'){const r=lay()[0],b=S.one;let best=null,bd=900;b.P.forEach(q=>{const d=(r.x+r.w*q.x-p.x)**2+(r.y+r.h*q.y-p.y)**2;if(d<bd){bd=d;best=q}});if(best)follow(best);return false}
 if(v==='temp'){const L=lay();L.forEach((r,i)=>{if(p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h)setT(i,p.y<r.y+r.h/2?1:-1)});return false}
 if(v==='state')race();return false}
const steps=[
{h:'Lift the divider',p:'Purple scent particles fill the left half; grey air fills both. Lift the divider and watch. Nobody fans or pushes the scent.',task:'Lift the divider and wait until 35% of the purple is on the right',
 show:()=>{S.demo=1;steps[0].go();S.demo=0;setTimeout(lift,R()?20:400)},go:()=>{freshOne();buttons();speak('Lift the divider.');S.want=()=>{if(A.step===0&&S.one.open&&right(S.one)>=.35)A.done('The scent spread from where there was a lot of it to where there was little.'+A.reveal(0))}}},
{h:'Follow one particle',p:'Why does the purple spread? Tap one particle to draw its path.',
 predict:{q:'Will one purple particle head straight for the empty side?',opts:['Yes, it heads for the space','No, it moves randomly'],ans:1},task:'Follow a particle until it turns back left at least twice',
 show:()=>{S.demo=1;steps[1].go();S.demo=0;setTimeout(()=>follow(),R()?20:300)},go:()=>{freshOne();buttons();speak('Tap a purple particle to follow it.');S.want=()=>{if(A.step===1&&S.track&&S.back>=2&&A.pred[1]!=null)A.done('Each particle zigzags at random. More go left to right only because more start on the left.'+A.reveal(1))}}},
{h:'Is it finished?',p:'Diffusion is the net movement of particles from high to low concentration. Wait until the colour is even, then watch the crossings.',
 predict:{q:'Once the purple is spread evenly, what happens?',opts:['The particles stop moving','They keep moving, just as many each way'],ans:1},task:'Reach an even spread and hold it for 3 s',
 show:()=>{S.demo=1;steps[2].go();S.demo=0;setTimeout(()=>{lift();S.ff=4;buttons()},R()?20:300)},go:()=>{freshOne();buttons();speak('Lift the divider and wait for an even spread.');S.want=()=>{const b=S.one;if(A.step===2&&b.even&&b.t-b.even>3&&A.pred[2]!=null)A.done('At equilibrium the particles still move. Crossings balance, so there is no net movement.'+A.reveal(2))}}},
{h:'Hot or cold water?',p:'Two boxes of water with ink in the left half. Set each temperature with the buttons, or tap the top or bottom of a box. Then race.',
 predict:{q:'Which water will the ink spread through faster?',opts:['Cold water','Hot water','Same speed'],ans:1},task:'Race two boxes at least 30 °C apart',
 show:()=>{S.tl=5;S.tr=65;steps[3].go();setTimeout(()=>{S.demo=1;race();S.demo=0},R()?20:400)},go:()=>{freshDuo();buttons();speak('Set the temperatures, then start the race.');S.want=()=>{if(A.step===3&&S.won&&Math.abs(S.tl-S.tr)>=30&&A.pred[3]!=null)A.done('Hotter particles move faster, so diffusion is faster.'+A.reveal(3))}}},
{h:'Gas or liquid?',p:'Left: scent in air. Right: ink in water, where the particles are packed close and bump all the time.',
 predict:{q:'Which spreads faster?',opts:['Ink in the liquid','Scent in the gas'],ans:1},task:'Race the gas against the liquid',
 show:()=>{steps[4].go();setTimeout(()=>{S.demo=1;race();S.demo=0},R()?20:300)},go:()=>{freshDuo();buttons();speak('Start the race.');S.want=()=>{if(A.step===4&&S.won&&A.pred[4]!=null)A.done('Gas particles travel further between bumps, so diffusion is fastest in gases.'+A.reveal(4))}}},
{h:'Challenge',p:'',go:()=>{next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Someone opens perfume at one end of a still room. Why can people at the far end smell it later?',[['Perfume particles move randomly and spread out','ok'],['Air currents must carry it','fan'],['The particles aim for where there is less perfume','aim']]],
 ['A purple dye has spread evenly through a beaker. What are the dye particles doing now?',[['Still moving, with no net movement','ok'],['They have stopped','stop'],['All moving to one side','side']]],
 ['A tea bag goes into one cup of hot water and one of cold. Where does the colour spread faster?',[['The hot cup','ok'],['The cold cup','cold'],['Same in both','same']]],
 ['Ammonia (light particles) and hydrogen chloride (heavier) diffuse from opposite ends of a tube. Where does the white ring form?',[['Nearer the hydrogen chloride end','ok'],['Nearer the ammonia end','nh3'],['Exactly in the middle','mid']]],
 ['Which is diffusion?',[['Particles spreading from high to low concentration','ok'],['Particles moving from low to high concentration','rev'],['A liquid turning into a gas','evap']]],
 ['Why does a smell spread faster than ink in still water?',[['Gas particles move further between collisions','ok'],['Liquid particles do not move','still'],['Gas particles are bigger','big']]]];
function why(t){let m='Think about random particle motion.';
 if(t==='fan')m='No fan is needed. Random particle motion alone spreads the perfume.';
 if(t==='aim')m='Particles cannot aim. Each moves at random; more move from crowded to empty because there are more of them.';
 if(t==='stop')m='Particles never stop. At equilibrium as many move each way, so the colour stays even.';
 if(t==='side')m='If all moved one way the colour would bunch up. At equilibrium the crossings balance.';
 if(t==='cold')m='Particles in hot water move faster, so the colour spreads faster in the hot cup.';
 if(t==='same')m='Temperature matters: hotter particles move faster, so diffusion is faster.';
 if(t==='nh3')m='Ammonia particles are lighter, so they move faster and travel further. They meet the HCl nearer its end.';
 if(t==='mid')m='They would meet in the middle only if both moved at the same speed. Lighter ammonia is faster.';
 if(t==='rev')m='That is the wrong way round. Net movement is from high to low concentration.';
 if(t==='evap')m='That is evaporation, a change of state. Diffusion is particles spreading out.';
 if(t==='still')m='Liquid particles do move, but they are packed close and bump all the time, so they spread slowly.';
 if(t==='big')m='Size is not the reason. Gas particles are far apart, so they travel further between bumps.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Spot on.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);freshOne();A.gest({down});A.every(tick);buttons()}});
A.start()})})();
