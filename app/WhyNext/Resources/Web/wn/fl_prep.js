/* Flagship – prepositions of place and direction (ages 5–7): drag the cat on, under, in and next to; name where the
   ball is; match opposite pairs (in/out, on/off, up/down, to/from); hop the frog off the log, into the pond, out of it
   and to the flower; then follow tidy-up instructions (book on the shelf, teddy under the bed, ball in the box). */
(()=>{const mn=Math.min,mx=Math.max;
 // zones are fractions of the canvas: [x0,y0,x1,y1], with the spot where a thing sits when it lands there
 const ROOM={on:{z:[.06,.2,.5,.45],at:[.28,.37],w:'on the table'},under:{z:[.08,.5,.48,.86],at:[.28,.74],w:'under the table'},
  in:{z:[.56,.5,.8,.86],at:[.68,.72],w:'in the basket'},next:{z:[.8,.5,.99,.9],at:[.9,.76],w:'next to the basket'}};
 const GO=['on','under','in','next'],SAYW={on:'on',under:'under',in:'in',next:'next to'};
 const SLIP={on:{in:'In means inside. On means on top.',under:'Under is below. On means on top.',next:'Next to is at the side. On means on top.'},
  under:{on:'That is on top. Under means below.',in:'That is inside the basket. Under means below the table.',next:'That is at the side. Under means below.'},
  in:{on:'That is on top of the table. In means inside.',under:'That is below the table. In means inside the basket.',next:'Next to is beside it. In means inside it.'},
  next:{in:'That is inside. Next to means beside it, at the side.',on:'That is on top of the table. Next to means beside the basket.',under:'That is under the table. Next to means beside the basket.'}};
 const BALL=['under','in','on','next'];
 const PAIRS=[['in','out'],['on','off'],['up','down'],['to','from']],TILES=[2,3,1,0];
 const POND={log:[.03,.3,.3,.6],flower:[.8,.48,.99,.72]};
 const HOPS=[['off the log','ground','Off means away from the top. Hop down onto the grass.'],['into the pond','pond','Into means going inside. Hop into the water.'],
  ['out of the pond','ground','Out of means leaving. Hop out onto the grass.'],['to the flower','flower','To means going towards it, all the way there.']];
 const TIDY={shelf:{z:[.05,.06,.42,.3],at:[.23,.22],w:'on the shelf'},bedtop:{z:[.45,.32,.97,.55],at:[.7,.47],w:'on the bed'},
  bedunder:{z:[.47,.6,.95,.86],at:[.7,.76],w:'under the bed'},box:{z:[.05,.58,.33,.86],at:[.19,.64],w:'in the box'}};
 const JOBS=[['📕','book','shelf'],['🧸','teddy','bedunder'],['⚽','ball','box']];
VIS.reg('flagprep',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const K={g:0,cat:[.5,.94],bad:'',hold:null,bi:0,pick:-1,match:[],hi:0,frog:[.17,.47],th:[],gen:0,want:()=>{}};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const st=()=>['cat','ball','pair','frog','tidy','quiz'][A.step];
 const fs=z=>A.narrow?z:z+4,X=f=>f*A.W,Y=f=>f*A.H;
 const pen=(x,t,px,py,z,k,w)=>{x.font=`${w||800} ${fs(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,px,py,A.W-12)};
 const pane=(x,r,k,b,a)=>{x.fillStyle=A.alpha(k,a||.15);A.paint.rrect(r.x,r.y,r.w,r.h,14);x.fill();x.strokeStyle=k;x.lineWidth=b?5:2;x.stroke()};
 const R=z=>({x:X(z[0]),y:Y(z[1]),w:X(z[2]-z[0]),h:Y(z[3]-z[1])});
 const inZ=(p,z)=>p.x>=X(z[0])&&p.x<=X(z[2])&&p.y>=Y(z[1])&&p.y<=Y(z[3]);
 const near=(p,q)=>Math.hypot(p.x-X(q[0]),p.y-Y(q[1]))<mx(30,A.W*.08);
 const nope=t=>{A.sound.miss();say(t);A.redraw()};
 const emo=(x,e,f,z)=>pen(x,e,X(f[0]),Y(f[1]),z||34,A.col.tx,400);
 // ---- shared scenery ----
 function table(x){const C=A.col;x.fillStyle=A.mix(C.or,C.tx,.15);x.fillRect(X(.06),Y(.45),X(.44),Y(.04));x.fillRect(X(.09),Y(.49),X(.03),Y(.37));x.fillRect(X(.44),Y(.49),X(.03),Y(.37))}
 function basket(x,front){const C=A.col,r={x:X(.58),y:Y(.62),w:X(.2),h:Y(.24)};x.fillStyle=front?A.alpha(C.am,.85):A.alpha(C.am,.35);A.paint.rrect(r.x,r.y,r.w,r.h,10);x.fill();
  if(front){x.strokeStyle=A.mix(C.am,C.tx,.4);x.lineWidth=2;for(let i=1;i<4;i++){x.beginPath();x.moveTo(r.x+4,r.y+r.h*i/4);x.lineTo(r.x+r.w-4,r.y+r.h*i/4);x.stroke()}}}
 function floor(x,y){x.strokeStyle=A.col.tx;x.lineWidth=3;x.beginPath();x.moveTo(0,Y(y));x.lineTo(A.W,Y(y));x.stroke()}
 function zoneOf(p,Z){return Object.keys(Z).find(k=>inZ(p,Z[k].z))||''}
 // ---- step 1: move the cat ----
 function catV(x){const C=A.col;floor(x,.86);table(x);basket(x,false);const inB=K.g>3?false:zoneOf({x:X(K.cat[0]),y:Y(K.cat[1])},ROOM)==='in';
  if(K.hold)emo(x,'🐱',[K.hold.x/A.W,K.hold.y/A.H]);else emo(x,'🐱',K.cat);basket(x,true);if(inB&&!K.hold)emo(x,'🐱',[K.cat[0],.66],30);
  pen(x,K.g<4?`Put the cat ${ROOM[GO[K.g]].w}`:'The cat went on, under, in and next to!',A.W/2,Y(.08),17,K.g<4?C.tx:C.gr)}
 function putCat(k){if(K.g>=4)return;K.hold=null;const want=GO[K.g];if(k!==want){if(k)K.cat=ROOM[k].at.slice();return nope(k?SLIP[want][k]:`Drag the cat ${ROOM[want].w}.`)}
  K.cat=ROOM[k].at.slice();K.g++;A.sound.pop();tell(`Yes! The cat is ${ROOM[k].w}.`)}
 // ---- step 2: where is the ball? ----
 const chip=i=>{const g=8,w=(A.W-5*g)/4;return{x:g+i*(w+g),y:Y(.03),w,h:Y(.13)}};
 function ballV(x){const C=A.col;floor(x,.86);table(x);basket(x,false);if(K.bi<4){const k=BALL[K.bi];emo(x,'⚽',k==='in'?[.68,.6]:ROOM[k].at,30)}basket(x,true);
  GO.forEach((k,i)=>{const r=chip(i);pane(x,r,K.bad===k?C.rd:C.cy,K.bad===k);pen(x,SAYW[k],r.x+r.w/2,r.y+r.h/2,15,C.tx)});
  pen(x,K.bi<4?'Where is the ball? Tap the word.':'You said where the ball is, every time!',A.W/2,Y(.22),13,K.bi<4?C.tx:C.gr)}
 function nameBall(k){if(K.bi>=4)return;const t=BALL[K.bi];if(k!==t){K.bad=k;return nope(SLIP[t][k])}K.bad='';K.bi++;A.sound.pop();tell(`Yes! The ball is ${ROOM[t].w}.`)}
 // ---- step 3: opposites ----
 const row=i=>({x:X(.04),y:Y(.05+i*.15),w:X(.92),h:Y(.13)});
 const tile=j=>{const g=8,w=(A.W-5*g)/4;return{x:g+j*(w+g),y:Y(.72),w,h:Y(.18)}};
 function pairV(x){const C=A.col;PAIRS.forEach((p,i)=>{const r=row(i),done=K.match.includes(i);pane(x,r,done?C.gr:i===K.hi?C.vi:C.ln,done||i===K.hi,.1);
   pen(x,p[0],r.x+r.w*.25,r.y+r.h/2,18,C.tx);pen(x,'↔',r.x+r.w*.5,r.y+r.h/2,18,C.tx,400);pen(x,done?p[1]:'?',r.x+r.w*.75,r.y+r.h/2,18,C.tx)});
  TILES.forEach((t,j)=>{if(K.match.includes(t))return;const r=K.hold&&K.hold.j===j?{...tile(j),x:K.hold.x-tile(j).w/2,y:K.hold.y-tile(j).h/2}:tile(j);pane(x,r,C.cy,1,.2);pen(x,PAIRS[t][1],r.x+r.w/2,r.y+r.h/2,18,C.tx)});
  if(K.match.length>=4)pen(x,'Four opposite pairs!',A.W/2,Y(.8),16,C.gr)}
 function pair(i,j){const t=TILES[j];K.hold=null;if(K.match.includes(i)||K.match.includes(t))return A.redraw();
  if(t!==i){K.hi=i;return nope(`${PAIRS[t][1]} goes with ${PAIRS[t][0]}. The opposite of ${PAIRS[i][0]} is the other way round.`)}
  K.match.push(i);K.hi=[0,1,2,3].find(r=>!K.match.includes(r));A.sound.pop();tell(`${PAIRS[i][0]} and ${PAIRS[i][1]} are opposites.`)}
 // ---- step 4: frog hops ----
 const pc=()=>({x:X(.55),y:Y(.8),rx:X(.17),ry:Y(.09)});
 function spot(p){const q=pc();if(((p.x-q.x)/q.rx)**2+((p.y-q.y)/q.ry)**2<=1)return'pond';if(inZ(p,POND.log))return'log';if(inZ(p,POND.flower))return'flower';return p.y>Y(.6)?'ground':'air'}
 function frogV(x){const C=A.col;x.fillStyle=A.alpha(C.gr,.25);x.fillRect(0,Y(.66),A.W,Y(.34));const q=pc();x.fillStyle=A.alpha(C.cy,.55);x.beginPath();x.ellipse(q.x,q.y,q.rx,q.ry,0,0,7);x.fill();
  x.fillStyle=A.mix(C.or,C.tx,.3);A.paint.rrect(X(.04),Y(.56),X(.25),Y(.1),12);x.fill();emo(x,'🌻',[.89,.6],34);
  const f=K.hold?[K.hold.x/A.W,K.hold.y/A.H]:K.frog;emo(x,'🐸',f,32);pen(x,K.g<4?`Hop the frog ${HOPS[K.g][0]}`:'Off, into, out of, to: the frog did it all!',A.W/2,Y(.1),17,K.g<4?C.tx:C.gr)}
 function hop(p){if(K.g>=4)return;K.hold=null;const s=spot(p),h=HOPS[K.g];if(s!==h[1]){if(s==='air')return nope('Drop the frog on the grass, the log, the pond or the flower.');return nope(h[2])}
  K.frog=s==='pond'?[.55,.8]:s==='flower'?[.83,.66]:[mn(.95,mx(.05,p.x/A.W)),mn(.95,mx(.7,p.y/A.H))];K.g++;A.sound.pop();tell(`Yes! The frog hopped ${h[0]}.`)}
 const HOPAT=[{x:.25,y:.88},{x:.55,y:.8},{x:.3,y:.92},{x:.88,y:.6}];
 // ---- step 5: tidy up ----
 const home=i=>[.5+i*.17,.94];
 function tidyV(x){const C=A.col;floor(x,.87);x.fillStyle=A.mix(C.or,C.tx,.2);x.fillRect(X(.05),Y(.3),X(.37),Y(.03));
  x.fillStyle=A.alpha(C.vi,.4);x.fillRect(X(.45),Y(.47),X(.52),Y(.1));x.fillStyle=A.mix(C.or,C.tx,.2);x.fillRect(X(.46),Y(.57),X(.03),Y(.3));x.fillRect(X(.93),Y(.57),X(.03),Y(.3));
  x.fillStyle=A.alpha(C.am,.4);x.fillRect(X(.05),Y(.6),X(.28),Y(.27));
  JOBS.forEach((j,i)=>{const f=K.th[i]?TIDY[j[2]].at:K.hold&&K.hold.i===i?[K.hold.x/A.W,K.hold.y/A.H]:home(i);emo(x,j[0],f,28)});
  x.fillStyle=A.alpha(C.am,.85);x.fillRect(X(.05),Y(.68),X(.28),Y(.19));
  const n=JOBS.findIndex((_,i)=>!K.th[i]);pen(x,n<0?'All tidy!':`Put the ${JOBS[n][1]} ${TIDY[JOBS[n][2]].w}`,A.W/2,Y(.04)+8,14,n<0?C.gr:C.tx)}
 function put(i,k){if(K.th[i])return;K.hold=null;const j=JOBS[i];if(k!==j[2])return nope(k?`That is ${TIDY[k].w}. The ${j[1]} goes ${TIDY[j[2]].w}.`:`Drag the ${j[1]} ${TIDY[j[2]].w}.`);
  K.th[i]=true;A.sound.pop();tell(`Yes! The ${j[1]} is ${TIDY[k].w}.`)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=st();x.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.05:.45);x.fillRect(0,0,W,H);
  const f={cat:catV,ball:ballV,pair:pairV,frog:frogV,tidy:tidyV}[v];if(f)f(x);else pen(x,K.Q||'🧭',W/2,H/2,60,C.tx,400);A.fx.draw(x)}
 function tell(msg){const v=st();let t;
  if(v==='cat')t=K.g<4?`Put the cat ${ROOM[GO[K.g]].w}.`:'All four done.';
  else if(v==='ball')t=K.bi<4?'Where is the ball? On, under, in, or next to?':'All named.';
  else if(v==='pair')t=K.match.length<4?`Find the opposite of ${PAIRS[K.hi][0]}.`:'All pairs matched.';
  else if(v==='frog')t=K.g<4?`Hop the frog ${HOPS[K.g][0]}.`:'All hops done.';
  else if(v==='tidy'){const n=JOBS.findIndex((_,i)=>!K.th[i]);t=n<0?'All tidy.':`Put the ${JOBS[n][1]} ${TIDY[JOBS[n][2]].w}.`}else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();K.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=st();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='cat'&&K.g<4)GO.forEach(k=>B('🐱 '+SAYW[k],()=>putCat(k),`Put the cat ${ROOM[k].w}`));
  if(v==='ball'&&K.bi<4)GO.forEach(k=>B(SAYW[k],()=>nameBall(k),`The ball is ${SAYW[k]}`));
  if(v==='pair'&&K.match.length<4)TILES.forEach((t,j)=>{if(!K.match.includes(t))B(PAIRS[K.hi][0]+' ↔ '+PAIRS[t][1],()=>pair(K.hi,j))});
  if(v==='frog'&&K.g<4)[['🌿 grass',0],['💧 pond',1],['🌻 flower',3]].forEach(([n,i])=>B('🐸 '+n,()=>hop({x:X(HOPAT[i].x),y:Y(HOPAT[i].y)}),`Hop to the ${n.split(' ')[1]}`));
  if(v==='tidy'){const n=JOBS.findIndex((_,i)=>!K.th[i]);if(n>=0)Object.keys(TIDY).forEach(k=>B(JOBS[n][0]+' '+TIDY[k].w,()=>put(n,k)))}A.redraw()}
 const fin=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const run=(fl,gap)=>{const g=K.gen;fl.forEach((f,j)=>setTimeout(()=>{if(g===K.gen)f()},j*gap))};
 const fresh=()=>{K.gen++;K.want=()=>{};K.hold=null;K.bad='';K.g=0};
 const steps=[
  {h:'Where is the cat?',p:'Little words tell us where things are: on, under, in, next to. Drag the cat to where the words say.',
   predict:{q:'"The cat is on the table." Where is the cat?',opts:['Inside the table','On top of the table'],ans:1},task:'Put the cat in all four places',
   show:()=>{steps[0].go();run(GO.map(k=>()=>putCat(k)),420)},go:()=>{fresh();K.cat=[.5,.94];tell();K.want=fin(0,()=>K.g>=4,()=>'On is on top, under is below, in is inside, next to is beside.')}},
  {h:'Say where',p:'Now you say it. Look at the ball. Tap the word that tells where it is.',task:'Say where the ball is four times',
   show:()=>{steps[1].go();run(BALL.map(k=>()=>nameBall(k)),420)},go:()=>{fresh();K.bi=0;tell();K.want=fin(1,()=>K.bi>=4,()=>'You can say where things are with one little word.')}},
  {h:'Opposites',p:'Some of these words come in pairs that mean the other way. Drag each word to its opposite.',task:'Match all four pairs',
   predict:{q:'What is the opposite of on?',opts:['in','off'],ans:1},
   show:()=>{steps[2].go();run([0,1,2,3].map(i=>()=>pair(i,TILES.indexOf(i))),420)},go:()=>{fresh();K.match=[];K.hi=0;tell();K.want=fin(2,()=>K.match.length>=4,()=>'In and out, on and off, up and down, to and from.')}},
  {h:'Hop, frog, hop!',p:'Some words tell which way to go. Drag the frog to follow each one.',
   predict:{q:'"Hop off the log." Where is the frog now?',opts:['Still on the log','Down on the grass'],ans:1},task:'Make all four hops',
   show:()=>{steps[3].go();run(HOPAT.map(p=>()=>hop({x:X(p.x),y:Y(p.y)})),450)},go:()=>{fresh();K.frog=[.17,.47];tell();K.want=fin(3,()=>K.g>=4,()=>'Off, into, out of and to tell which way to go.')}},
  {h:'Tidy up time',p:'Listen to each job and put each thing in its place.',task:'Tidy all three things',
   show:()=>{steps[4].go();run(JOBS.map((j,i)=>()=>put(i,j[2])),450)},go:()=>{fresh();K.th=[];tell();K.want=fin(4,()=>K.th.filter(Boolean).length>=3,()=>'You followed every job word.')}},
  {h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
 const QZ=[['Which one matches? 🧢 The hat is on top of my head.','🧢',[['The hat is on my head','ok'],['The hat is under my head','under'],['The hat is in my head','in']]],
  ['Sam jumps ___ the pool. Splash! Now he is wet.','🏊',[['into','ok'],['out of','out'],['under','below']]],
  ['What is the opposite of up?','🎈',[['down','ok'],['on','onup'],['to','toup']]],
  ['Put your shoes under the bed. Where do they go?','👟',[['Below the bed','ok'],['On top of the bed','ontop'],['Inside the bed','inbed']]],
  ['The dog runs ___ the gate to meet you.','🐶',[['to','ok'],['from','from'],['off','off']]],
  ['"The cup is next to the plate." Which words tell where?','☕',[['next to','ok'],['the cup','thing'],['the plate','thing']]]];
 let qn=-1,stars=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;K.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const rw=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},rw,o);b.onclick=()=>check(tag)});say('Challenge: '+q);A.redraw()}
 function check(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! That word tells it right.';break;
   case 'under':m='Under is below. The hat sits on top, so it is on.';break;
   case 'in':m='In means inside. A hat sits on your head, not inside it.';break;
   case 'out':m='Out of means leaving the water. Splash means he went into it.';break;
   case 'below':m='Under the pool is below it, in the ground! He jumps into the water.';break;
   case 'onup':m='On is the opposite of off. Up goes with down.';break;
   case 'toup':m='To is the opposite of from. Up goes with down.';break;
   case 'ontop':m='On top is on the bed. Under means below it.';break;
   case 'inbed':m='Inside is in. Under means below the bed.';break;
   case 'from':m='From means going away. To meet you, the dog runs to the gate.';break;
   case 'off':m='Off means coming down from something. The dog runs to the gate.';break;
   default:m='Cups and plates are things. The words next to tell where.'}
  const good=tag==='ok';if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=st();K.hold=null;
  if(v==='cat'&&K.g<4){if(near(p,K.cat)){K.hold={x:p.x,y:p.y};return true}return false}
  if(v==='ball'&&K.bi<4){const i=GO.findIndex((_,i)=>{const r=chip(i);return p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h});if(i>=0)nameBall(GO[i]);return false}
  if(v==='pair'&&K.match.length<4){const j=TILES.findIndex((t,j)=>{const r=tile(j);return !K.match.includes(t)&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h});
   if(j>=0){K.hold={x:p.x,y:p.y,j,x0:p.x,y0:p.y};return true}const i=PAIRS.findIndex((_,i)=>{const r=row(i);return p.y>=r.y&&p.y<=r.y+r.h});if(i>=0&&!K.match.includes(i)){K.hi=i;tell()}return false}
  if(v==='frog'&&K.g<4){if(near(p,K.frog)){K.hold={x:p.x,y:p.y};return true}return false}
  if(v==='tidy'){const i=JOBS.findIndex((_,i)=>!K.th[i]&&near(p,home(i)));if(i>=0){K.hold={x:p.x,y:p.y,i};return true}}return false}
 function move(p){if(K.hold){K.hold.x=p.x;K.hold.y=p.y;A.redraw()}}
 function up(p){const v=st(),h=K.hold;if(!h)return;
  if(v==='cat')return putCat(zoneOf(p,ROOM));
  if(v==='pair'){const i=PAIRS.findIndex((_,i)=>{const r=row(i);return p.y>=r.y&&p.y<=r.y+r.h}),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<12;return pair(tap||i<0?K.hi:i,h.j)}
  if(v==='frog')return hop(p);if(v==='tidy')return put(h.i,zoneOf(p,TIDY))}
 A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
