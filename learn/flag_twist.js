/* Flagship – changing the shapes of solids (ages 6–7, Y2 uses of everyday materials): squash, stretch, bend and twist
   four things by dragging, see that squashed clay is still the same clay on a balance, test which materials change
   shape, stay the same or snap, sort things that spring back from things that stay changed, and name the action in
   everyday jobs. Wrong answers name the slip: less stuff after squashing, a new material, wood that should bend. */
(()=>{const ACT={squash:'squash',stretch:'stretch',bend:'bend',twist:'twist'},
FOUR=[['dough','squash','Squash the dough'],['band','stretch','Stretch the band'],['pipe','bend','Bend the pipe cleaner'],['cloth','twist','Twist the cloth']],
NICE={dough:'pizza dough',band:'elastic band',pipe:'pipe cleaner',cloth:'wet cloth',twig:'dry twig',block:'wooden block',foil:'foil',sponge:'sponge',spring:'spring'},
CLAY=['pancake','sausage','snake'],RES=['changes shape','no change','snaps'],
TESTS=[['pipe','bend',0],['twig','bend',2],['block','squash',1],['foil','squash',0]],
BACK=[['sponge','squash',1],['dough','squash',0],['band','stretch',1],['foil','squash',0],['spring','stretch',1],['pipe','bend',0]],
LIFE=[['Wring out a wet cloth','cloth','twist'],['Roll out pizza dough','dough','squash'],['Pull a hair band on','band','stretch'],['Make a pipe cleaner hook','pipe','bend']];
VIS.reg('flagtwist',c=>{let A,pads,quiz,qn=-1,run=0;c.fig.classList.add('young');
const S={};
const mode=()=>['four','clay','test','back','life','quiz'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1.05:1.2)),R=()=>A.redraw();
/* labels use the theme text colour on pale fills, so they read in both themes */
function txt(g,s,x,y,n,w){g.font=`${w||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-12)}
function card(g,r,col,a,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=warn?4:2;g.strokeStyle=warn?A.col.rd:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const Up=w=>w[0].toUpperCase()+w.slice(1),inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const row=(i,n)=>{const w=(A.W-10*(n+1))/n;return{x:10+i*(w+10),y:A.H*.7,w,h:A.H*.27}};
/* one solid, centred on x,y about 2s across, changed by t (0 = as it was, 1 = fully changed) */
function thing(g,n,x,y,s,t,how){const C=A.col,fill=(c,a)=>{g.fillStyle=A.mix(C.pn,c,a);g.fill();g.lineWidth=2.5;g.strokeStyle=C.tx;g.stroke()};t=t||0;
 if(n==='dough'){const rx=s*(.62+.55*t),ry=s*(.55-.36*t);g.beginPath();g.ellipse(x,y+s*.5-ry,rx,ry,0,0,7);fill(C.or,.35)}
 if(n==='band'){const w=s*(.55+.75*t),h=s*(.45-.2*t);g.lineWidth=7;g.strokeStyle=A.mix(C.pn,C.rd,.65);A.paint.rrect(x-w,y-h,w*2,h*2,h);g.stroke();g.lineWidth=2;g.strokeStyle=C.tx;A.paint.rrect(x-w-4,y-h-4,w*2+8,h*2+8,h+4);g.stroke()}
 if(n==='pipe'){const a=t*2.4,L=s*.9;g.lineCap='round';g.lineWidth=11;g.strokeStyle=C.tx;g.beginPath();g.moveTo(x-Math.cos(a/2)*L,y-Math.sin(a/2)*L*.9+s*.3);g.lineTo(x,y+s*.3);g.lineTo(x+Math.cos(a/2)*L,y-Math.sin(a/2)*L*.9+s*.3);g.stroke();g.lineWidth=7;g.strokeStyle=A.mix(C.pn,C.vi,.55);g.stroke();g.lineCap='butt'}
 if(n==='cloth'){const w=s*.95,h=s*(.55-.3*t),k=2+Math.round(t*7);g.beginPath();g.rect(x-w,y-h,w*2,h*2);fill(C.cy,.3);g.lineWidth=2;g.strokeStyle=C.tx;for(let i=1;i<k;i++){const X=x-w+i*w*2/k;g.beginPath();g.moveTo(X-t*w*.25,y-h);g.lineTo(X+t*w*.25,y+h);g.stroke()}}
 if(n==='sponge'){const w=s*.8,h=s*(.5-.3*t);g.beginPath();g.rect(x-w,y+s*.5-h*2,w*2,h*2);fill(C.am,.45);[[-.4,.5],[.1,.3],[.45,.65],[-.1,.75]].forEach(([a,b])=>{g.beginPath();g.ellipse(x+a*w,y+s*.5-h*2+b*h*2,s*.08,s*.08*(1-t*.6),0,0,7);g.fillStyle=C.tx;g.fill()})}
 if(n==='foil'){const k=9,r=s*(.75-.3*t);g.beginPath();for(let i=0;i<k*2;i++){const a=i/(k*2)*6.283,j=i%2?1-.35*t:1;g[i?'lineTo':'moveTo'](x+Math.cos(a)*r*j*(t>0?1:1.1),y+Math.sin(a)*r*j*(t>0?1:.45))}g.closePath();fill(C.mu,.25)}
 if(n==='twig'){const gap=how==='snap'?s*.12:0,a=how==='snap'?.35:0;g.lineCap='round';g.lineWidth=9;g.strokeStyle=A.mix(C.pn,C.or,.85);[[-1,-a],[1,a]].forEach(([sd,an])=>{g.save();g.translate(x+sd*gap,y);g.rotate(an);g.beginPath();g.moveTo(0,0);g.lineTo(sd*s*.9,0);g.stroke();g.restore()});g.lineCap='butt'}
 if(n==='block'){g.beginPath();g.rect(x-s*.6,y-s*.5,s*1.2,s);fill(C.or,.6);g.lineWidth=1.5;for(let i=1;i<4;i++){g.beginPath();g.moveTo(x-s*.6,y-s*.5+i*s*.25);g.quadraticCurveTo(x,y-s*.42+i*s*.25,x+s*.6,y-s*.5+i*s*.25);g.stroke()}}
 if(n==='spring'){const L=s*(.7+.6*t);g.lineWidth=4;g.strokeStyle=C.tx;g.beginPath();for(let i=0;i<=40;i++){const X=x-L+i*L*2/40,Y=y+Math.sin(i*1.25)*s*.28;i?g.lineTo(X,Y):g.moveTo(X,Y)}g.stroke()}}
/* the clay on a balance with 5 cubes on the other side: it stays level whatever its shape */
function clay(g,x,y,s,k){const C=A.col,f=a=>{g.fillStyle=A.mix(C.pn,C.pk,a);g.fill();g.lineWidth=2.5;g.strokeStyle=C.tx;g.stroke()};g.beginPath();
 if(k==='ball')g.arc(x,y-s*.42,s*.42,0,7);if(k==='pancake')g.ellipse(x,y-s*.14,s*.85,s*.14,0,0,7);if(k==='sausage')A.paint.rrect(x-s*.7,y-s*.36,s*1.4,s*.36,s*.18);
 if(k==='snake'){g.moveTo(x-s*.95,y-s*.1);for(let i=0;i<=20;i++)g.lineTo(x-s*.95+i*s*.095,y-s*.14+Math.sin(i*.8)*s*.1);for(let i=20;i>=0;i--)g.lineTo(x-s*.95+i*s*.095,y-s*.02+Math.sin(i*.8)*s*.1);g.closePath()}f(.4)}
function scale(g,W,H,k){const C=A.col,b=H*.5,L=W*.3,s=Math.min(W,H)*.12;g.lineWidth=4;g.strokeStyle=C.tx;g.beginPath();g.moveTo(W/2-L,b);g.lineTo(W/2+L,b);g.moveTo(W/2,b);g.lineTo(W/2,H*.64);g.moveTo(W/2-s,H*.64);g.lineTo(W/2+s,H*.64);g.stroke();
 clay(g,W/2-L,b,s*1.1,k);for(let i=0;i<5;i++){g.beginPath();g.rect(W/2+L-s*.75+(i%3)*s*.5,b-s*.5*(1+Math.floor(i/3)),s*.46,s*.46);g.fillStyle=A.mix(C.pn,C.gr,.35);g.fill();g.lineWidth=2;g.stroke()}
 txt(g,'Level: the same amount of clay',W/2,H*.12,15)}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode(),s=Math.min(W,H)*.16;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'Squash, stretch, bend, twist',W/2,H*.32,19);txt(g,'New shape, same stuff',W/2,H*.5,18);txt(g,'Some things snap or stay the same',W/2,H*.68,15,700);return}
 if(v==='four'){const k=Math.min(S.round,3),[n,act,line]=FOUR[k];thing(g,n,W/2,H*.42,s*1.4,S.round>=4?1:S.t,act);txt(g,S.round<4?line:'You did all four!',W/2,H*.08,17);
  FOUR.forEach(([n2,a2],i)=>{const r=row(i,4);r.y=H*.78;r.h=H*.19;card(g,r,i<S.round?C.gr:C.cy,i<S.round?.3:.1,false);txt(g,a2,r.x+r.w/2,r.y+r.h/2,13)});
  if(S.round<4)txt(g,'Drag on the picture',W/2,H*.7,13,700)}
 if(v==='clay'){scale(g,W,H,S.shape);CLAY.forEach((k,i)=>{const r=row(i,3);r.y=H*.74;r.h=H*.23;card(g,r,C.pk,S.made.includes(k)?.28:.08,false);clay(g,r.x+r.w/2,r.y+r.h*.55,s*.5,k);txt(g,k,r.x+r.w/2,r.y+r.h*.84,13)})}
 if(v==='test'){const k=Math.min(S.round,TESTS.length-1),[n,act,res]=TESTS[k],dn=S.round>k||S.seen;thing(g,n,W/2,H*.36,s*1.2,dn&&res===0?1:0,dn&&res===2?'snap':'');if(S.round>0&&S.round<TESTS.length){const[pn,,pr]=TESTS[S.round-1];thing(g,pn,W*.12,H*.3,s*.45,pr===0?1:0,pr===2?'snap':'');txt(g,RES[pr],W*.12,H*.46,11,700)}
  txt(g,S.round<TESTS.length?`${Up(act)} the ${NICE[n]}. What happens?`:'All 4 tested!',W/2,H*.08,16);RES.forEach((w,i)=>{const r=row(i,3);card(g,r,[C.gr,C.cy,C.rd][i],.1,S.oops===i);txt(g,w,r.x+r.w/2,r.y+r.h/2,14)})}
 if(v==='back'){[['Goes back',C.gr],['Stays changed',C.vi]].forEach(([w,cl],i)=>{const r=row(i,2);card(g,r,cl,.12,S.oops===i);txt(g,w,r.x+r.w/2,r.y+r.h*.3,14);
   const got=BACK.filter((b,j)=>j<S.round&&b[2]===1-i).map(b=>NICE[b[0]]);got.forEach((z,j)=>txt(g,z,r.x+r.w/2,r.y+r.h*(.55+j*.15),11,700))});
  if(S.round<BACK.length){const[n,act]=BACK[S.round];thing(g,n,S.drag?S.dx:W/2,S.drag?S.dy:H*.38,s,S.t,act);txt(g,`${Up(act)} the ${NICE[n]}, then let go.`,W/2,H*.08,16)}else txt(g,'All sorted!',W/2,H*.08,17)}
 if(v==='life'){const k=Math.min(S.round,LIFE.length-1),[line,n,act]=LIFE[k];thing(g,n,W/2,H*.36,s*1.2,.6,act);txt(g,S.round<LIFE.length?line:'You named them all!',W/2,H*.08,16);txt(g,'Which way is it?',W/2,H*.6,13,700);
  Object.keys(ACT).forEach((a,i)=>{const r=row(i,4);r.y=H*.68;card(g,r,C.or,.1,S.oops===a);txt(g,a,r.x+r.w/2,r.y+r.h/2,13)})}
 A.fx.draw(g)}
const no=(t,m)=>{S.oops=m;A.sound.miss();say(t);R()},yes=t=>{S.oops=null;A.sound.pop();say(t);fill();R();S.want()};
/* step 0: drag (or the button) changes the shape; t near 1 finishes that thing */
function finish(){const[n,act]=FOUR[S.round];S.round++;S.t=0;if(S.round<4){A.sound.tick();say(`You ${act==='stretch'?'stretched':act==='squash'?'squashed':act==='bend'?'bent':'twisted'} the ${NICE[n]}. New shape, still ${NICE[n]}. Now: ${FOUR[S.round][2].toLowerCase()}.`);fill();return R()}
 yes('Squash, stretch, bend and twist. Four ways to change a shape.')}
function doFour(){if(S.round>=4||S.busy)return;S.busy=1;A.tween(S,{t:1},600,'io',()=>{S.busy=0;finish()})}
/* step 1 */
function mould(k){S.shape=k;if(!S.made.includes(k))S.made.push(k);A.sound.tick();if(S.made.length<3){say(`A ${k}. The scale is still level. Same clay, new shape.`);fill();return R()}yes('Ball, pancake, sausage, snake: always the same amount of clay.')}
/* step 2 */
const WHY={pipe:'A pipe cleaner has wire inside. It bends and keeps its new shape.',twig:'A dry twig is stiff. When you bend it too far, it snaps.',block:'Wood is hard. Your hands cannot squash a block.',foil:'Foil is thin metal. It squashes into a ball and stays that way.'};
function guess(i){if(S.round>=TESTS.length)return;const[n,,res]=TESTS[S.round];if(i!==res)return no(`Look again. ${WHY[n]}`,i);S.seen=1;R();S.round++;S.seen=0;
 if(S.round<TESTS.length){A.sound.tick();S.oops=null;say(`Yes, it ${RES[res]==='no change'?'does not change':RES[res]}. ${WHY[n]}`);fill();return R()}yes(`Yes. ${WHY[n]} Some materials change shape, some stay the same, and some snap.`)}
/* step 3 */
const LET={sponge:'A sponge springs back when you let go.',dough:'Dough stays squashed. It does not spring back.',band:'An elastic band goes back when you let go.',foil:'Squashed foil stays squashed.',spring:'A spring goes back after a small stretch.',pipe:'A bent pipe cleaner stays bent.'};
function sortIt(bin){if(S.round>=BACK.length)return;const[n,,bk]=BACK[S.round];if(bin!==1-bk)return no(`Watch it when you let go. ${LET[n]}`,bin);S.t=0;S.round++;
 if(S.round<BACK.length){A.sound.tick();S.oops=null;say(`Yes. ${LET[n]}`);fill();return R()}yes(`Yes. ${LET[n]} Some things spring back, some stay changed.`)}
function letGo(){const[n,,bk]=BACK[S.round];say(bk?`You let go. The ${NICE[n]} goes back!`:`You let go. The ${NICE[n]} stays changed.`);if(bk)A.tween(S,{t:0},500);R()}
/* step 4 */
const SLIP={twist:'Twisting turns one end one way and the other end the other way, like wringing a cloth.',squash:'Squashing pushes down and makes it flatter, like a rolling pin.',stretch:'Stretching pulls the ends apart, so it gets longer.',bend:'Bending makes a curve or a corner in it, like a hook.'};
function name(a){if(S.round>=LIFE.length)return;const[,,ok]=LIFE[S.round];if(a!==ok)return no(`Not this one. ${SLIP[a]}`,a);S.round++;if(S.round<LIFE.length){A.sound.tick();S.oops=null;say(`Yes, that is ${ok}ing. ${SLIP[ok]}`);fill();return R()}yes('Twist, squash, stretch, bend: you named them all.')}
function fill(){if(!pads)return;pads.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pads,t);b.onclick=fn};
 if(v==='four'&&S.round<4)B(FOUR[S.round][1],doFour,FOUR[S.round][2]);
 if(v==='clay')CLAY.forEach(k=>B(`make a ${k}`,()=>mould(k),`Roll the clay into a ${k}`));
 if(v==='test'&&S.round<TESTS.length)RES.forEach((w,i)=>B(w,()=>guess(i),`It ${w}`));
 if(v==='back'&&S.round<BACK.length){B(`${BACK[S.round][1]} and let go`,()=>{S.t=1;letGo()});['Goes back','Stays changed'].forEach((w,i)=>B(w,()=>sortIt(i),`Sort it: ${w}`))}
 if(v==='life'&&S.round<LIFE.length)Object.keys(ACT).forEach(a=>B(a,()=>name(a),`It is ${a}ing`))}
function down(p){const v=mode();S.p0=p;
 if(v==='four'&&S.round<4){const i=[0,1,2,3].find(j=>{const r=row(j,4);r.y=A.H*.78;r.h=A.H*.19;return inside(p,r)});if(i==null)return true;if(i===S.round)doFour();else no(`That card says ${FOUR[i][1]}. ${FOUR[S.round][2]} first.`,null);return false}
 if(v==='clay'){CLAY.forEach((k,i)=>{const r=row(i,3);r.y=A.H*.74;r.h=A.H*.23;if(inside(p,r))mould(k)});return false}
 if(v==='test'){RES.forEach((w,i)=>{if(inside(p,row(i,3)))guess(i)});return false}
 if(v==='back'&&S.round<BACK.length){if(Math.hypot(p.x-A.W/2,p.y-A.H*.38)<A.W*.22){S.drag=1;S.dx=p.x;S.dy=p.y;return true}[0,1].forEach(i=>{if(inside(p,row(i,2)))sortIt(i)});return false}
 if(v==='life'){Object.keys(ACT).forEach((a,i)=>{const r=row(i,4);r.y=A.H*.68;if(inside(p,r))name(a)});return false}return false}
function move(p){const v=mode(),d=Math.hypot(p.x-S.p0.x,p.y-S.p0.y);if(v==='four'&&!S.busy){S.t=Math.min(1,d/(A.W*.3));R()}if(v==='back'&&S.drag){S.t=Math.min(1,d/(A.W*.25));S.dx=p.x;S.dy=p.y;R()}}
function up(p){const v=mode();if(v==='four'){if(S.t>.8)return finish();if(S.round<4){say('Keep dragging, a bit further.');A.tween(S,{t:0},300)}return}
 if(v==='back'&&S.drag){S.drag=0;const j=[0,1].find(i=>inside(p,row(i,2)));if(j==null){letGo();return}sortIt(j)}}
const when=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const auto=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const fresh=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},round:0,t:0,oops:null,shape:'ball',made:[],drag:0,p0:{x:0,y:0}})};
const steps=[
{h:'Four ways',p:'You can change the shape of some solids. Drag on the picture to squash, stretch, bend or twist it.',task:'Change 4 shapes',
 show:()=>{steps[0].go();auto([0,1,2,3].map(()=>()=>{S.busy=0;S.t=1;finish()}),900)},
 go:()=>{fresh();say('Squash the dough. Drag on it.');fill();S.want=when(0,()=>S.round>=4,'Squash, stretch, bend, twist.')}},
{h:'Same stuff',p:'Roll the clay into new shapes. Watch the scale.',predict:{q:'You squash a ball of clay flat. Is there less clay now?',opts:['No, the same clay','Yes, less clay','It is not clay now'],ans:0},task:'Make 3 new shapes',
 show:()=>{steps[1].go();auto(CLAY.map(k=>()=>mould(k)),900)},
 go:()=>{fresh();say('A ball of clay. The scale is level.');fill();S.want=when(1,()=>S.made.length>=3,'New shapes, same clay.')}},
{h:'Test it',p:'Not every material changes shape. Guess what happens, then see.',predict:{q:'You bend a dry twig a lot. What happens?',opts:['It bends and stays bent','It snaps','It stretches'],ans:1},task:'Test 4 things',
 show:()=>{steps[2].go();auto(TESTS.map(([,,r])=>()=>guess(r)),900)},
 go:()=>{fresh();say('Bend the pipe cleaner. What happens?');fill();S.want=when(2,()=>S.round>=TESTS.length,'Bendy, hard or snappy.')}},
{h:'Back or not?',p:'Change it, then let go. Does it go back? Drag it to a box.',predict:{q:'You squash a sponge, then let go. What happens?',opts:['It stays flat','It springs back','It breaks'],ans:1},task:'Sort 6 things',
 show:()=>{steps[3].go();auto(BACK.map(([,,b])=>()=>sortIt(1-b)),650)},
 go:()=>{fresh();say('Squash the sponge, then let go.');fill();S.want=when(3,()=>S.round>=BACK.length,'Some spring back, some stay.')}},
{h:'Which way?',p:'We change shapes every day. Which way is each job?',task:'Name 4 jobs',
 show:()=>{steps[4].go();auto(LIFE.map(([,,a])=>()=>name(a)),900)},
 go:()=>{fresh();say(LIFE[0][0]+'. Which way is it?');fill();S.want=when(4,()=>S.round>=LIFE.length,'Twist, squash, stretch, bend.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Ali squashes a clay ball flat. What is true?',[['Same clay, new shape','ok'],['There is less clay now','less'],['It is a new material','new']]],
 ['Which one goes back after you stretch it?',[['An elastic band','ok'],['Pizza dough','dough'],['A dry twig','twig']]],
 ['Wringing a wet cloth is…',[['Twisting','ok'],['Squashing','squash'],['Stretching','stretch']]],
 ['Why can you not squash a wooden block with your hands?',[['Wood is hard','ok'],['You are doing it wrong','wrong'],['Wood is not a solid','solid']]],
 ['You bend a dry twig a lot. What happens?',[['It snaps','ok'],['It bends and stays bent','stay'],['It goes back','back']]],
 ['Squash, stretch, bend and twist are all…',[['Pushes and pulls','ok'],['Ways to make a new material','new'],['Only for clay','clay']]]];
function why(t){let m='Think about what you saw in the lab.';
 if(t==='less')m='It only looks thinner. It is spread out. The scale stayed level, so it is the same amount.';
 if(t==='new')m='The material does not change. Squashed clay is still clay. Only the shape is new.';
 if(t==='dough')m='Dough stays stretched. It does not spring back.';
 if(t==='twig')m='A dry twig does not stretch. It snaps if you pull or bend it too much.';
 if(t==='squash')m='Squashing pushes down. Wringing turns the two ends opposite ways: twisting.';
 if(t==='stretch')m='Stretching pulls the ends apart. Wringing turns them opposite ways: twisting.';
 if(t==='wrong')m='It is not you. Wood is hard, so it does not squash with a hand push.';
 if(t==='solid')m='Wood is a solid. Some solids are hard and keep their shape.';
 if(t==='stay')m='A pipe cleaner bends and stays. A dry twig is stiff, so it snaps.';
 if(t==='back')m='A twig is not springy like a band. Bend it a lot and it snaps.';
 if(t==='clay')m='You can twist a cloth, stretch a band and bend a pipe cleaner too.';
 return m}
function next(){qn++;const[q,ops]=QS[qn%QS.length],sh=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const rw=quiz.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},rw,o);b.onclick=()=>answer(t)});say('Challenge: '+q);R()}
function answer(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(ok?'Yes, that’s right. In a row: '+run+'.':'Not this time. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pads.hidden=A.step===5;fill()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pads=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});fill()}});
A.start()})})();
