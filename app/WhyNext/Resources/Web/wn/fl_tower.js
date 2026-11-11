/* Flagship – building towers and bridges (ages 3–4): stack shapes and find that flat faces stack while a ball rolls off
   and a cone can only be the top; build big-to-small towers (a big block on a small one tips); line a block up so its
   middle sits over the block below or it tips off; pick a plank long enough to rest on both pillars (one as long as the
   gap falls in); then make two equal pillars tall enough for a toy car and a bus to drive under. Challenge on the usual
   slips: round or pointy shapes at the bottom, small at the bottom, a plank only as long as the gap, pillars too low. */
(()=>{
const SHAPES=[['cube','flat'],['long block','flat'],['tube','flat'],['ball','round'],['cone','point']];
const SIZES=[[3,2,1],[4,3,2,1]],GAPS=[2,3,4],RIDES=[['car',1.5],['bus',2.5]],FROM=[1.6,-1.7,1.5];
VIS.reg('flagtower',c=>{let A,ctl,chal,qn=-1,streak=0;c.fig.classList.add('young');
const S={run:0,want:()=>{},k:0,done:0,tower:[],fell:'',off:1.6,landed:0,plank:-1,L:1,R:1,bad:0,drag:null,msg:''};
const kind=()=>['stack','size','line','bridge','car','quiz'][A.step];
const f=n=>Math.round(n*(A.narrow?1:1.15));
const U=()=>Math.min(A.W/8,A.H/7.2),G=()=>A.H-f(26),MID=()=>A.W/2;
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(g,t,x,y,n,w,al){g.font=`${w||700} ${f(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(t,x,y,A.W-16)}
function blockAt(g,x,y,w,h,col){const C=A.col;g.fillStyle=A.alpha(col,.55);A.paint.rrect(x,y,w,h,4);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;A.paint.rrect(x,y,w,h,4);g.stroke()}
// one shape sitting with its bottom-middle at (x, y)
function shape(g,name,x,y,u,col){const C=A.col;g.strokeStyle=C.tx;g.lineWidth=2;g.fillStyle=A.alpha(col,.55);
 if(name==='cube')return blockAt(g,x-u/2,y-u,u,u,col),u;
 if(name==='long block')return blockAt(g,x-u,y-u*.7,u*2,u*.7,col),u*.7;
 if(name==='tube'){g.beginPath();g.rect(x-u*.4,y-u,u*.8,u);g.fill();g.stroke();g.beginPath();g.ellipse(x,y-u,u*.4,u*.13,0,0,7);g.fill();g.stroke();return u}
 if(name==='ball'){g.beginPath();g.arc(x,y-u*.45,u*.45,0,7);g.fill();g.stroke();g.fillStyle=A.alpha('#fff',.5);g.beginPath();g.arc(x-u*.15,y-u*.6,u*.1,0,7);g.fill();return u*.9}
 g.beginPath();g.moveTo(x-u*.45,y);g.lineTo(x,y-u*1.1);g.lineTo(x+u*.45,y);g.closePath();g.fill();g.stroke();return u*1.1}
const COLS=()=>{const C=A.col;return[C.cy,C.or,C.gr,C.pk,C.vi]};
const shelf=i=>{const n=kind()==='stack'?5:kind()==='size'?SIZES[Math.min(S.k,1)].length:3,w=(A.W-20)/n;return{x:10+i*w,y:f(24),w:w-6,h:U()*1.5}};
const inside=(p,r)=>p&&r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const towerZone=()=>({x:A.W*.2,y:f(24)+U()*1.6,w:A.W*.6,h:A.H});
function left(){const v=kind();if(v==='size'&&S.k<2){const set=SIZES[Math.min(S.k,1)];return set.filter(w=>!S.tower.includes(w))}return[]}
function draw(A){const{ctx:g,W,H,col:C}=A,v=kind(),u=U(),gy=G(),m=MID();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'Flat faces stack.',W/2,H*.3,19,800);txt(g,'Big at the bottom.',W/2,H*.45,19,800);txt(g,'Planks rest on both sides.',W/2,H*.6,17,800);return}
 g.strokeStyle=C.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(8,gy);g.lineTo(W-8,gy);g.stroke();
 if(S.msg)txt(g,S.msg,W/2,H-f(11),12,800);
 if(v==='stack'){SHAPES.forEach(([n],i)=>{const r=shelf(i);if(S.drag&&S.drag.i===i)return;shape(g,n,r.x+r.w/2,r.y+r.h-f(14),Math.min(u*.85,r.w*.45),COLS()[i]);txt(g,n,r.x+r.w/2,r.y+r.h-f(4),11,700)});
  let y=gy;S.tower.forEach(n=>{y-=shape(g,n,m,y,u,COLS()[SHAPES.findIndex(s=>s[0]===n)])});
  if(S.fell)shape(g,S.fell,m+u*2.2,gy,u,C.rd);txt(g,`Tower: ${S.tower.length} of 4`,12,f(12),12,700,'left')}
 if(v==='size'){const set=SIZES[Math.min(S.k,1)],rest=left();rest.forEach((w,j)=>{const r=shelf(j);if(S.drag&&S.drag.w===w)return;blockAt(g,r.x+r.w/2-w*u*.22,r.y+r.h/2-u*.3,w*u*.44,u*.6,C.or)});
  let y=gy;S.tower.forEach(w=>{y-=u*.75;blockAt(g,m-w*u*.45,y,w*u*.9,u*.75,C.or)});if(S.bad){blockAt(g,m-S.bad*u*.45,y-u*.75,S.bad*u*.9,u*.75,C.rd)}
  if(S.k<2)txt(g,`Tower ${S.k+1} of 2: ${S.tower.length} of ${set.length} blocks`,12,f(12),12,700,'left')}
 if(v==='line'){let y=gy;for(let i=0;i<=S.landed;i++){y-=u;blockAt(g,m-u,y,u*2,u,C.cy)}
  if(S.landed<3){const x=m+S.off*u;blockAt(g,x-u,f(30),u*2,u,S.bad?C.rd:C.vi);g.setLineDash([5,5]);g.strokeStyle=C.tx;g.beginPath();g.moveTo(x,f(30)+u);g.lineTo(x,y);g.stroke();g.setLineDash([]);
   g.beginPath();g.arc(x,f(30)+u/2,4,0,7);g.fillStyle=C.tx;g.fill()}
  txt(g,`On top: ${S.landed} of 3`,12,f(12),12,700,'left')}
 if(v==='bridge'||v==='car'){const gap=v==='bridge'?GAPS[Math.min(S.k,2)]:2,pw=u,lh=v==='car'?S.L:2,rh=v==='car'?S.R:2;const lx=m-gap*u/2-pw,rx=m+gap*u/2;
  for(let i=0;i<lh;i++)blockAt(g,lx,gy-(i+1)*u*.8,pw,u*.8,C.cy);for(let i=0;i<rh;i++)blockAt(g,rx,gy-(i+1)*u*.8,pw,u*.8,C.cy);
  if(v==='bridge'){if(S.k<3){[gap-1,gap,gap+1].forEach((n,j)=>{const r=shelf(j);if(S.drag&&S.drag.i===j)return;blockAt(g,r.x+r.w/2-n*u*.2,r.y+r.h/2-u*.15,n*u*.4,u*.3,C.or);txt(g,n+' long',r.x+r.w/2,r.y+r.h-f(2),11,700)})}
   if(S.plank>=0){const n=S.plank;if(n>gap)blockAt(g,m-n*u/2,gy-2*u*.8-u*.4,n*u,u*.4,C.or);else blockAt(g,m-n*u/2,gy-u*.4,n*u,u*.4,C.rd)}
   txt(g,`Gap: ${gap} blocks wide. Bridges: ${Math.min(S.k,3)} of 3`,12,f(12),12,700,'left')}
  else{const y=gy-Math.max(lh,rh)*u*.8;if(lh===rh)blockAt(g,lx,y-u*.35,gap*u+2*pw,u*.35,C.or);else{g.save();g.translate(m,(gy-lh*u*.8+gy-rh*u*.8)/2-u*.18);g.rotate(Math.atan2((lh-rh)*u*.8,gap*u+2*pw)*-1);blockAt(g,-(gap*u+2*pw)/2,-u*.18,gap*u+2*pw,u*.35,C.rd);g.restore()}
   if(S.k<2){const[n,h]=RIDES[S.k],cx=Math.max(u*.8,m-gap*u/2-pw-u*1.3);g.fillStyle=A.alpha(C.pk,.6);A.paint.rrect(cx-u*.7,gy-h*u*.8,u*1.4,h*u*.8-u*.2,6);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;A.paint.rrect(cx-u*.7,gy-h*u*.8,u*1.4,h*u*.8-u*.2,6);g.stroke();
    [-.4,.4].forEach(d=>{g.beginPath();g.arc(cx+d*u,gy-u*.18,u*.18,0,7);g.fillStyle=C.tx;g.fill()});txt(g,n,cx,gy-h*u*.4-u*.1,11,800)}
   txt(g,`Left ${S.L}, right ${S.R} blocks. Drives: ${Math.min(S.k,2)} of 2`,12,f(12),12,700,'left')}}
 if(S.drag&&S.drag.x!=null){const C2=COLS();if(v==='stack')shape(g,SHAPES[S.drag.i][0],S.drag.x,S.drag.y+u/2,u*.8,C2[S.drag.i]);if(v==='size')blockAt(g,S.drag.x-S.drag.w*u*.45,S.drag.y-u*.37,S.drag.w*u*.9,u*.75,C.or);
  if(v==='bridge'){const n=GAPS[Math.min(S.k,2)]-1+S.drag.i;blockAt(g,S.drag.x-n*u/2,S.drag.y-u*.2,n*u,u*.4,C.or)}}
 A.fx.draw(g)}
const nope=(t,short)=>{A.sound.miss();S.msg=short||'Try again';say(t);ctrl();A.redraw()};
const yes=(t,short)=>{A.sound.pop();S.msg=short;say(t);ctrl();A.redraw();S.want()};
function add(i){if(kind()!=='stack'||S.tower.length>=4)return;const[n,face]=SHAPES[i];S.drag=null;S.fell='';
 if(face==='round'){S.fell=n;return nope('The ball is round all over. It rolls off! Pick a shape with a flat face.','The ball rolled off!')}
 if(face==='point'&&S.tower.length<3){S.fell=n;return nope('A cone has a point on top. Nothing can sit on it. Save it for the very top.','Pointy top! Save it for last.')}
 S.tower.push(n);if(S.tower.length>=4){S.done=1;return yes(`${n==='cone'?'A cone makes a pointy top. ':''}Four tall! Flat faces sit on flat faces.`,'Four tall!')}A.sound.tick();S.msg=`The ${n} has a flat top.`;say(`The ${n} stays. It has a flat face on top.`);ctrl();A.redraw()}
function put(w){if(kind()!=='size'||S.k>=2)return;S.drag=null;const set=SIZES[S.k],big=Math.max(...left());
 if(w!==big){S.bad=w;setTimeout(()=>{S.bad=0;A.redraw()},A.reduced()?10:600);return nope(`A bigger block is still left. If it goes on top of a smaller one, it tips. Put the biggest one at the bottom.`,'Wobble! Bigger ones go lower.')}
 S.tower.push(w);A.sound.tick();if(S.tower.length<set.length){S.msg='Steady!';say('Steady. Now the next biggest.');ctrl();return A.redraw()}
 S.k++;S.done++;const t='Biggest at the bottom, smallest at the top. A wide bottom keeps it steady.';S.tower=[];if(S.k<2){A.sound.pop();S.msg='Steady tower!';say(t);ctrl();A.redraw();S.want()}else yes(t,'Two steady towers!')}
function shift(d){if(kind()!=='line'||S.landed>=3)return;S.off=Math.max(-3,Math.min(3,Math.round((S.off+d)*10)/10));S.bad=0;A.sound.tick();say(Math.abs(S.off)<.05?'Lined up in the middle.':`Moved ${S.off<0?'left':'right'} of the middle.`);A.redraw()}
function drop(){if(kind()!=='line'||S.landed>=3)return;S.drag=null;const o=Math.abs(S.off);
 if(o>1){S.bad=1;return nope('Too far over! The middle of the block is past the edge, so it tips off. Move it over the block below.','It tipped off!')}
 S.landed++;S.done=S.landed;const near=o<.5;S.off=FROM[S.landed%3];S.bad=0;
 if(S.landed>=3)return yes('Three on top, all lined up. Each middle sits over the block below.','Steady and tall!');A.sound.tick();S.msg=near?'Lined up!':'Phew, only just!';say(near?'Lined up: it sits flat and steady.':'It stays, but only just. Its middle was near the edge.');ctrl();A.redraw()}
function span(j){if(kind()!=='bridge'||S.k>=3)return;S.drag=null;const gap=GAPS[S.k],n=gap-1+j;S.plank=n;
 if(n<=gap){const t=n<gap?`A plank ${n} long is shorter than the gap. It falls in.`:`A plank ${n} long is just as long as the gap. It has nothing to sit on, so it falls in. It must reach onto both pillars.`;return nope(t,'It fell in!')}
 S.k++;S.done++;const t=`${n} long is longer than the gap of ${gap}, so it rests on both pillars. A bridge!`;if(S.k<3){A.sound.pop();S.msg='A bridge!';say(t);setTimeout(()=>{S.plank=-1;ctrl();A.redraw()},A.reduced()?10:350);ctrl();A.redraw();S.want()}else yes(t,'Three bridges!')}
function pillar(side,d){if(kind()!=='car'||S.k>=2)return;if(side==='L')S.L=Math.max(1,Math.min(4,S.L+d));else S.R=Math.max(1,Math.min(4,S.R+d));A.sound.tick();S.msg='';
 say(`Left pillar ${S.L} blocks, right pillar ${S.R} blocks.${S.L!==S.R?' The plank is sloping.':''}`);A.redraw()}
function drive(){if(kind()!=='car'||S.k>=2)return;const[n,h]=RIDES[S.k];
 if(S.L!==S.R)return nope(`The pillars are not the same: ${S.L} and ${S.R}. The plank slopes and slides. Make them the same height.`,'Make them the same!');
 if(S.L<h)return nope(`Bump! The ${n} is taller than ${S.L} block${S.L>1?'s':''}. Add one more block to each pillar.`,'Too low! Bump!');
 S.k++;S.done++;const t=`The ${n} fits under. ${S.L} blocks is taller than the ${n}.`;if(S.k<2){A.sound.pop();S.msg='Vroom!';say(t);ctrl();A.redraw();S.want()}else yes(t,'Vroom! Both fit!')}
function ctrl(){if(!ctl)return;ctl.innerHTML='';const v=kind(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='stack'&&S.tower.length<4)SHAPES.forEach(([n],i)=>B(n,()=>add(i),'Put the '+n+' on the tower'));
 if(v==='size'&&S.k<2)left().forEach(w=>B(['','tiny','small','big','biggest'][w]+' block',()=>put(w),'Put the '+['','tiny','small','big','biggest'][w]+' block on the tower'));
 if(v==='line'&&S.landed<3){B('◀ Left',()=>shift(-.5),'Move the block left');B('▶ Right',()=>shift(.5),'Move the block right');B('⬇ Drop',drop,'Drop the block')}
 if(v==='bridge'&&S.k<3){const g=GAPS[S.k];[g-1,g,g+1].forEach((n,j)=>B(`plank ${n} long`,()=>span(j),`Try the plank ${n} blocks long`))}
 if(v==='car'&&S.k<2){B('+ left',()=>pillar('L',1),'Add a block to the left pillar');B('− left',()=>pillar('L',-1),'Take a block off the left pillar');B('+ right',()=>pillar('R',1),'Add a block to the right pillar');B('− right',()=>pillar('R',-1),'Take a block off the right pillar');B('🚗 Drive!',drive,'Drive under the bridge')}
 A.redraw()}
function down(p){const v=kind();
 if(v==='stack'||v==='size'||v==='bridge'){const n=v==='stack'?5:v==='size'?left().length:3;for(let i=0;i<n;i++)if(inside(p,shelf(i))){S.drag={i,w:v==='size'?left()[i]:0,x:null,y:null,x0:p.x,y0:p.y};return true}return false}
 if(v==='line'&&S.landed<3){S.drag={x0:p.x,o0:S.off};return true}
 if(v==='car'){const u=U(),m=MID();if(p.y>G()-u*4){pillar(p.x<m?'L':'R',1);return false}}return false}
function move(p){const d=S.drag;if(!d)return;if(kind()==='line'){S.off=Math.max(-3,Math.min(3,d.o0+(p.x-d.x0)/U()));A.redraw();return}d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=S.drag,v=kind();if(!d)return;S.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<8;
 if(v==='line'){if(tap){S.off=d.o0;return A.redraw()}S.off=Math.round(S.off*10)/10;return drop()}
 if(!tap&&!inside(p,towerZone())){say('Drop it on the tower, or tap it.');return A.redraw()}
 if(v==='stack')add(d.i);if(v==='size')put(d.w);if(v==='bridge')span(d.i)}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function chain(acts){const k=++S.run;acts.forEach((fn,j)=>setTimeout(()=>{if(k===S.run)fn()},A.reduced()?j*40+30:(j+1)*420))}
const reset=()=>{S.run++;Object.assign(S,{want:()=>{},k:0,done:0,tower:[],fell:'',off:1.6,landed:0,plank:-1,L:1,R:1,bad:0,drag:null,msg:''})};
const steps=[
{h:'Which shapes stack?',p:'Drag a shape onto the tower, or tap it. Which ones stay? Which ones roll or wobble off?',
 predict:{q:'Will a ball stay on top of a cube?',opts:['Yes','No, it rolls off'],ans:1},task:'Build a tower 4 tall',
 show:()=>{steps[0].go();chain([()=>add(3),()=>add(0),()=>add(1),()=>add(2),()=>add(4)])},go:()=>{reset();say('Drag a shape onto the tower.');ctrl();S.want=fin(0,()=>S.done>=1,'Shapes with flat faces stack. A ball rolls. A cone only goes on top.')}},
{h:'Big at the bottom',p:'Build a tower with these blocks. Which one goes first, at the bottom?',
 predict:{q:'Which block goes at the bottom?',opts:['The smallest','The biggest'],ans:1},task:'Build two steady towers',
 show:()=>{steps[1].go();chain([3,2,1,4,3,2,1].map(w=>()=>put(w)))},go:()=>{reset();say('Put the blocks on, one at a time.');ctrl();S.want=fin(1,()=>S.done>=2,'A wide base is steady. Big at the bottom, small at the top.')}},
{h:'Line it up',p:'Drag the purple block left or right, then let go. The dotted line shows its middle. Where will it stay?',task:'Put 3 blocks on top',
 show:()=>{steps[2].go();chain([()=>{S.off=0;drop()},()=>{S.off=0;drop()},()=>{S.off=0;drop()}])},go:()=>{reset();say('Drag the block, then let go.');ctrl();S.want=fin(2,()=>S.landed>=3,'A block stays when its middle is over the block below.')}},
{h:'Make a bridge',p:'Pick a plank to go across the gap. It must sit on both pillars.',
 predict:{q:'A plank just as long as the gap. Will it stay up?',opts:['Yes','No, it falls in'],ans:1},task:'Make three bridges',
 show:()=>{steps[3].go();chain([()=>span(2),()=>span(2),()=>span(2)])},go:()=>{reset();say('Drag a plank onto the pillars.');ctrl();S.want=fin(3,()=>S.k>=3,'The plank must be longer than the gap, so each end rests on a pillar.')}},
{h:'Room for the car',p:'Tap a pillar to add a block. Make the bridge high enough, then drive under it.',task:'Let the car and the bus through',
 show:()=>{steps[4].go();chain([()=>pillar('L',1),()=>pillar('R',1),drive,()=>pillar('L',1),()=>pillar('R',1),drive])},go:()=>{reset();say('Tap a pillar to make it taller.');ctrl();S.want=fin(4,()=>S.k>=2,'Both pillars the same, and taller than the car.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which shape is best at the bottom of a tower?',[['A big cube','ok'],['A ball','round'],['A cone','point']]],
 ['Which tower is the most steady?',[['Big blocks at the bottom, small at the top','ok'],['Small at the bottom, big at the top','upside'],['Blocks pushed far to one side','side']]],
 ['The gap is 3 blocks wide. Which plank makes a bridge?',[['4 blocks long','ok'],['3 blocks long','same'],['2 blocks long','short']]],
 ['The car is a bit taller than 1 block. Which pillars let it under?',[['2 blocks on each side','ok'],['1 block on each side','low'],['2 on one side, 1 on the other','uneven']]],
 ['Which shape can only go at the very top?',[['The cone','ok'],['The cube','cube'],['The long block','long']]]];
function slip(t){let m='Think about flat faces and what sits on what.';
 if(t==='round')m='A ball is round all over. Blocks would roll off it.';
 if(t==='point')m='A cone has a point on top. Nothing can sit on a point.';
 if(t==='upside')m='Big on small tips over. Put the biggest at the bottom.';
 if(t==='side')m='If a block’s middle goes past the edge, it tips. Line them up.';
 if(t==='same')m='Just as long as the gap has no ends to rest on. It falls in.';
 if(t==='short')m='2 is shorter than the gap of 3. It falls in.';
 if(t==='low')m='1 block is lower than the car. Bump! Add a block to each side.';
 if(t==='uneven')m='One pillar is taller, so the plank slopes. Make them the same.';
 if(t==='cube'||t==='long')m='That has a flat top, so more can go on it. The cone is pointy.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],turn=qn%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! A good builder.':'✗ '+slip(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;ctrl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrl()}});
A.start()})})();
