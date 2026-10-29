/* Flagship – hard, soft, rough and smooth (ages 3–4): PRESS a thing to find out if it squashes (soft) or stays put
   (hard), STROKE a finger across it to feel bumps (rough) or a smooth glide, give one thing two feel words (a ball is
   hard AND smooth), PULL things to find the stretchy ones that spring back, then pick the right material for a job
   (a soft bed for teddy, a hard wall, a towel that soaks up water). Challenge on the usual mix-ups: smooth called soft,
   hard called rough, and choosing by colour or looks instead of by feel. */
(()=>{
const PRESS=[['🧸','teddy',1],['🪨','stone',0],['🍞','bread',1],['🥄','spoon',0]],STROKE=[['🍍','pineapple skin',1],['🍎','apple',0],['🪵','tree bark',1],['🥄','spoon',0]];
const PULL=[['🎈','balloon',1],['✏️','pencil',0],['🧦','sock',1],['🪨','stone',0]];
const TWO=[['🎱','ball',0,0],['🧱','brick',0,1],['🎀','silk ribbon',1,0]];
const JOBS=[['A bed for teddy. It must be soft.',[['🧶','wool',1],['🧱','bricks','hard'],['🪵','bark','rough']]],
 ['A wall the wolf cannot blow down. It must be hard.',[['🧱','bricks',1],['🧶','wool','soft'],['🍞','bread','soft']]],
 ['Dry your wet hands. It must soak up water.',[['🧻','paper towel',1],['🥄','spoon','nosoak'],['🪨','stone','nosoak']]]];
const BINS={press:['Hard','Soft'],stroke:['Smooth','Rough'],pull:['Not stretchy','Stretchy']};
VIS.reg('flagtouch',c=>{let A,pad,quiz,qn=-1,inrow=0;c.fig.classList.add('young');
const F={tok:0,want:()=>{},i:0,felt:0,sq:0,sx:1,trail:[],bad:-1,pick:[-1,-1],job:0,drag:null};
const kind=()=>['press','stroke','two','pull','job','quiz'][A.step];
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fz=n=>Math.round(n*(A.narrow?1.1:1.25));
function say(g,s,x,y,n,col,wt){g.font=`${wt||700} ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-12)}
function card(g,x,y,w,h,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(x,y,w,h,16);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge;A.paint.rrect(x,y,w,h,16);g.stroke()}
const hit=(p,x,y,w,h)=>p.x>x&&p.x<x+w&&p.y>y&&p.y<y+h;
const set=()=>({press:PRESS,stroke:STROKE,pull:PULL})[kind()]||PRESS,thing=()=>set()[Math.min(F.i,set().length-1)];
const spot=()=>({x:A.W*.2,y:A.H*.08,w:A.W*.6,h:A.H*.48});
const binAt=k=>{const w=(A.W-24)/2;return{x:8+k*(w+8),y:A.H*.72,w,h:A.H*.22}};
function paint(A){const{ctx:g,W,H,col:C}=A,v=kind();g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.04:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){say(g,'👆 press · ✋ stroke · 🤏 pull',W/2,H*.36,17,C.tx,800);say(g,'hard · soft · rough · smooth',W/2,H*.56,15,C.tx,700);return}
 if(v==='press'||v==='stroke'||v==='pull'){const t=thing(),s=spot(),cx=s.x+s.w/2,cy=s.y+s.h/2;card(g,s.x,s.y,s.w,s.h,A.alpha(C.cy,.1),C.tx);
  g.save();g.translate(cx,cy+s.h*.3);g.scale(F.sx,1-F.sq);say(g,t[0],0,-s.h*.3,58);g.restore();
  if(v==='press'&&F.sq>.02){g.fillStyle=A.alpha(C.tx,.25);g.beginPath();g.ellipse(cx,cy-s.h*.05,s.w*.08,s.h*.04,0,0,7);g.fill()}
  if(v==='stroke'&&F.trail.length>1){g.strokeStyle=C.vi;g.lineWidth=4;g.beginPath();F.trail.forEach((q,j)=>{const y=q.y+(t[2]?(j%2?-7:7):0);j?g.lineTo(q.x,y):g.moveTo(q.x,y)});g.stroke()}
  say(g,F.felt?(v==='press'?(t[2]?'It squashes!':'It does not squash.'):v==='stroke'?(t[2]?'Bumpy and scratchy!':'It slides along.'):(t[2]?'It stretches, then springs back!':'It does not stretch.')):(v==='press'?'Press it':v==='stroke'?'Stroke it: drag across':'Pull it: drag sideways'),W/2,H*.62,14,C.tx,800);
  BINS[v].forEach((b,k)=>{const r=binAt(k);card(g,r.x,r.y,r.w,r.h,A.alpha(k?C.or:C.gr,.16),F.bad===k?C.rd:C.tx,F.bad===k?4:2);say(g,b,r.x+r.w/2,r.y+r.h/2,17,C.tx,800)});
  say(g,F.i+' of '+set().length+' sorted · '+t[1],W/2,H*.04,11,C.tx,600)}
 if(v==='two'){const t=TWO[Math.min(F.i,2)];say(g,t[0],W/2,H*.18,58);say(g,t[1],W/2,H*.36,13,C.tx,700);
  [['Hard','Soft'],['Smooth','Rough']].forEach((row,r)=>row.forEach((w,k)=>{const bw=(W-30)/2,x=8+k*(bw+14),y=H*(.44+r*.2);const on=F.pick[r]===k;
   card(g,x,y,bw,H*.16,A.alpha(on?C.gr:C.cy,on?.35:.1),F.bad===r*2+k?C.rd:C.tx,on||F.bad===r*2+k?4:2);say(g,(on?'✓ ':'')+w,x+bw/2,y+H*.08,16,C.tx,800)}));
  say(g,'Pick one word from each row · '+F.i+' of 3',W/2,H*.9,12,C.tx,600)}
 if(v==='job'){const[q,ops]=JOBS[Math.min(F.job,2)];say(g,q,W/2,H*.1,13,C.tx,800);ops.forEach((o,k)=>{const w=(W-30)/3,x=6+k*(w+9);card(g,x,H*.24,w,H*.42,A.alpha(C.vi,.12),F.bad===k?C.rd:C.tx,F.bad===k?4:2);say(g,o[0],x+w/2,H*.4,40);say(g,o[1],x+w/2,H*.58,11,C.tx,700)});
  say(g,'Tap the best one · '+F.job+' of 3',W/2,H*.8,12,C.tx,600)}
 A.fx.draw(g)}
const nope=t=>{A.sound.miss();voice(t);A.redraw()},yay=t=>{A.sound.pop();voice(t);ctl();A.redraw();F.want()};
function feel(){const v=kind(),t=thing();F.felt=1;A.sound.tick();
 if(v==='press'){if(t[2]){A.tween(F,{sq:.35},A.reduced()?1:250,'out',()=>A.tween(F,{sq:0},A.reduced()?1:500,'back'))}else{A.tween(F,{sq:.02},60,'out',()=>A.tween(F,{sq:0},120))}voice(t[2]?`The ${t[1]} squashes when you press it.`:`The ${t[1]} does not squash. Your finger stops.`)}
 if(v==='stroke'){const s=spot();if(F.trail.length<2)F.trail=[0,1,2,3,4,5,6,7,8,9,10,11].map(j=>({x:s.x+s.w*(.1+j*.073),y:s.y+s.h*.55}));voice(t[2]?`The ${t[1]} feels bumpy and scratchy.`:`Your finger slides along the ${t[1]}.`)}
 if(v==='pull'){if(t[2])A.tween(F,{sx:1.5},A.reduced()?1:300,'out',()=>A.tween(F,{sx:1},A.reduced()?1:600,'el'));voice(t[2]?`The ${t[1]} stretches, then springs back.`:`The ${t[1]} does not stretch.`)}
 ctl();A.redraw()}
function sort(k){const v=kind(),t=thing(),L=set();if(F.i>=L.length)return;const right=t[2]===k;
 if(!right){F.bad=k;const w=BINS[v][t[2]].toLowerCase();
  if(v==='press')return nope(F.felt?`It ${t[2]?'squashed':'did not squash'}, so it is ${w}.`:`Press the ${t[1]} first. Does it squash?`);
  if(v==='stroke')return nope(F.felt?(t[2]?`Your finger bumped along, so it is rough.`:`Your finger slid along. Hard things can be smooth too.`):`Stroke the ${t[1]} first. Bumpy or not?`);
  return nope(F.felt?`It ${t[2]?'stretched and sprang back':'stayed the same'}, so it is ${w}.`:`Pull the ${t[1]} first. Does it stretch?`)}
 F.bad=-1;F.i++;F.felt=0;F.sq=0;F.sx=1;F.trail=[];yay(`Yes! The ${t[1]} is ${BINS[v][k].toLowerCase()}.`)}
function tap(r,k){if(F.i>=3)return;F.pick[r]=k;F.bad=-1;A.sound.tick();voice(['Hard','Soft','Smooth','Rough'][r*2+k]);ctl();A.redraw()}
function both(){const t=TWO[F.i];if(!t)return;if(F.pick[0]<0||F.pick[1]<0)return nope('Pick one word from each row.');
 if(F.pick[0]!==t[2]){F.bad=F.pick[0];return nope(t[2]?`Press the ${t[1]}: it bends and squashes, so it is soft.`:F.pick[1]===0?`Smooth is not soft. Press the ${t[1]}: it does not squash, so it is hard AND smooth.`:`Press the ${t[1]}: it does not squash, so it is hard.`)}
 if(F.pick[1]!==t[3]){F.bad=2+F.pick[1];return nope(t[3]?`Stroke the ${t[1]}: it is bumpy, so it is rough.`:`Stroke the ${t[1]}: your finger slides, so it is smooth.`)}
 F.bad=-1;F.i++;F.pick=[-1,-1];yay(`Yes! The ${t[1]} is ${t[2]?'soft':'hard'} and ${t[3]?'rough':'smooth'}. One thing, two feel words.`)}
function choose(k){if(F.job>=3)return;const[,ops]=JOBS[F.job],o=ops[k];
 if(o[2]!==1){F.bad=k;return nope(o[2]==='hard'?`${o[1]} are hard. Teddy needs something soft to lie on.`:o[2]==='rough'?`Bark is rough and hard. A bed needs to be soft.`:o[2]==='soft'?`${o[1][0].toUpperCase()+o[1].slice(1)} is soft and squashes. A strong wall must be hard.`:`A ${o[1]} is hard and stays dry. It cannot soak up water.`)}
 F.bad=-1;F.job++;yay(['Wool is soft, so teddy is comfy.','Bricks are hard, so the wall stays up.','Paper towel soaks up water, so your hands get dry.'][F.job-1])}
function ctl(){if(!pad)return;pad.innerHTML='';const v=kind(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='press'||v==='stroke'||v==='pull'){if(F.i>=set().length)return;const t=thing();B(v==='press'?'👆 Press':v==='stroke'?'✋ Stroke':'🤏 Pull',feel,(v==='press'?'Press':v==='stroke'?'Stroke':'Pull')+' the '+t[1]);BINS[v].forEach((b,k)=>B(b,()=>sort(k),'Put the '+t[1]+' in '+b))}
 if(v==='two'&&F.i<3){['Hard','Soft','Smooth','Rough'].forEach((w,j)=>B((F.pick[j>>1]===(j&1)?'✓ ':'')+w,()=>tap(j>>1,j&1)));B('✔ Check',both,'Check both words')}
 if(v==='job'&&F.job<3)JOBS[F.job][1].forEach((o,k)=>B(o[0]+' '+o[1],()=>choose(k)))}
function down(p){const v=kind(),s=spot();
 if(v==='press'||v==='stroke'||v==='pull'){if(hit(p,s.x,s.y,s.w,s.h)){F.drag={x0:p.x,y0:p.y};if(v==='press')feel();if(v==='stroke')F.trail=[p];return true}for(let k=0;k<2;k++){const r=binAt(k);if(hit(p,r.x,r.y,r.w,r.h))sort(k)}return false}
 if(v==='two'){for(let r=0;r<2;r++)for(let k=0;k<2;k++){const bw=(A.W-30)/2;if(hit(p,8+k*(bw+14),A.H*(.44+r*.2),bw,A.H*.16))tap(r,k)}return false}
 if(v==='job'){for(let k=0;k<3;k++){const w=(A.W-30)/3;if(hit(p,6+k*(w+9),A.H*.24,w,A.H*.42))choose(k)}}return false}
function move(p){const d=F.drag;if(!d)return;const v=kind();if(v==='stroke'){F.trail.push(p);if(F.trail.length>60)F.trail.shift();A.redraw()}if(v==='pull'&&thing()[2]){F.sx=1+Math.min(.6,Math.abs(p.x-d.x0)/A.W);A.redraw()}}
function up(p){const d=F.drag;F.drag=null;if(!d)return;const v=kind(),far=Math.abs(p.x-d.x0);if(v==='stroke'){if(far>A.W*.12)feel();else{F.trail=[];voice('Drag your finger across it.');A.redraw()}}if(v==='pull'){if(far>A.W*.08){F.sx=1;feel()}else voice('Drag sideways to pull it.')}}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const t=++F.tok;fns.forEach((f,j)=>setTimeout(()=>{if(t===F.tok)f()},A.reduced()?j*30+30:(j+1)*ms))};
const reset=()=>{F.tok++;Object.assign(F,{want:()=>{},i:0,felt:0,sq:0,sx:1,trail:[],bad:-1,pick:[-1,-1],job:0,drag:null})};
const sortShow=(n,L)=>()=>{steps[n].go();play(L.flatMap(t=>[feel,()=>sort(t[2])]),420)};
const steps=[
{h:'Press it',p:'Press the thing with your finger. Soft things squash. Hard things do not.',task:'Sort 4 things into hard and soft',show:sortShow(0,PRESS),
 go:()=>{reset();voice('Press the teddy. Does it squash?');ctl();F.want=ok(0,()=>F.i>=4,'Soft things squash when you press. Hard things stay the same.')}},
{h:'Stroke it',p:'Drag your finger across it. Rough things feel bumpy. Smooth things let your finger slide.',
 predict:{q:'A stone is hard. Is every hard thing rough?',opts:['Yes, hard means rough','No, some hard things are smooth'],ans:1},task:'Sort 4 things into rough and smooth',show:sortShow(1,STROKE),
 go:()=>{reset();voice('Stroke the pineapple skin.');ctl();F.want=ok(1,()=>F.i>=4,'Rough is bumpy, smooth is slidey. A hard spoon is smooth.')}},
{h:'Two feel words',p:'One thing can have two feel words. Is it hard or soft? Is it smooth or rough?',
 predict:{q:'A ball is smooth. Is it soft too?',opts:['Yes, smooth means soft','No, it is smooth and hard'],ans:1},task:'Give 3 things two words',
 show:()=>{steps[2].go();play(TWO.flatMap(t=>[()=>tap(0,t[2]),()=>tap(1,t[3]),both]),330)},
 go:()=>{reset();voice('Is the ball hard or soft? Smooth or rough?');ctl();F.want=ok(2,()=>F.i>=3,'Smooth and soft are different words. A ball is smooth and hard.')}},
{h:'Pull it',p:'Drag sideways to pull. Stretchy things get longer, then spring back.',task:'Sort 4 things: stretchy or not',show:sortShow(3,PULL),
 go:()=>{reset();voice('Pull the balloon.');ctl();F.want=ok(3,()=>F.i>=4,'Stretchy things get longer when you pull, then go back.')}},
{h:'Pick for the job',p:'Choose the best thing for each job. Think about how it feels.',task:'Do 3 jobs',
 show:()=>{steps[4].go();play([()=>choose(0),()=>choose(0),()=>choose(0)],400)},
 go:()=>{reset();voice(JOBS[0][0]);ctl();F.want=ok(4,()=>F.job>=3,'You chose by how things feel.')}},
{h:'Challenge',p:'',go:()=>{reset();quizNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>F.want()});
const QS=[['You press a sponge and it squashes. The sponge is…',[['Soft','ok'],['Hard','squashhard'],['Rough','squashrough']]],
 ['A spoon is hard. Is it rough?',[['No, it is smooth','ok'],['Yes, hard things are rough','hardrough'],['It is soft','spoonsoft']]],
 ['Which is best for a teddy bed?',[['A soft cushion','ok'],['A hard brick','brickbed'],['A red rock','colour']]],
 ['Tree bark feels bumpy. It is…',[['Rough','ok'],['Smooth','bumpysmooth'],['Soft','barksoft']]],
 ['A glass marble is smooth. Is it soft?',[['No, it is hard','ok'],['Yes, smooth means soft','smoothsoft'],['It is rough','marblerough']]],
 ['You pull a balloon and let go. It…',[['Springs back','ok'],['Stays long','stays'],['Breaks every time','breaks']]]];
function why(t){let m='Press it for hard or soft. Stroke it for rough or smooth.';
 if(t==='squashhard')m='Hard things do not squash. The sponge squashed, so it is soft.';
 if(t==='squashrough')m='Rough is about bumps you stroke. Squashing tells you it is soft.';
 if(t==='hardrough')m='Hard is about pressing; rough is about stroking. A spoon is hard but smooth.';
 if(t==='spoonsoft')m='Press a spoon: it does not squash, so it is hard. And it is smooth.';
 if(t==='brickbed')m='A brick is hard. Teddy needs something soft to lie on.';
 if(t==='colour')m='Colour does not make a thing soft. A rock is hard, whatever its colour.';
 if(t==='bumpysmooth')m='Smooth lets your finger slide. Bumpy means rough.';
 if(t==='barksoft')m='Press bark: it does not squash. It is rough and hard.';
 if(t==='smoothsoft')m='Smooth is not soft. Press the marble: it does not squash, so it is hard and smooth.';
 if(t==='marblerough')m='Your finger slides on a marble. It is smooth, not rough.';
 if(t==='stays')m='A balloon is stretchy. Stretchy things spring back when you let go.';
 if(t==='breaks')m='A gentle pull does not break it. It stretches and springs back.';
 return m}
function quizNext(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});voice('Challenge: '+q);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){inrow++;A.win()}else{inrow=0;A.sound.miss()}fb.innerHTML=(good?'✓ Yes! In a row: '+inrow+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quizNext}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;ctl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctl()}});
A.start()})})();
