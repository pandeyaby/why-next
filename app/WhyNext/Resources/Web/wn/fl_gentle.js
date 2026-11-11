/* Flagship – being gentle with people, animals and plants (ages 3–4): stroke a cat slowly (a fast, hard swipe makes it run),
   read the cat's signs (purr: keep going softly; flat ears: stop; walks off: let it go), carry a worm, snail and ladybird
   back to where they live instead of a jar, do kind things for a plant, and choose kind words with a friend. */
(()=>{const lo=Math.min,hi=Math.max;
 const MOOD=[['😺','Purr, purr. It leans on your hand.',0,'It likes it. Keep stroking softly.'],['😾','Ears flat. Tail swishing.',1,'Flat ears mean stop. The cat has had enough.'],
  ['🐈','It walks away from you.',2,'Walking away means no more. Let it go.']];
 const ACTS=[['🖐','Stroke softly'],['✋','Stop'],['👋','Let it go']];
 const BUGS=[['🪱','worm','soil'],['🐌','snail','leaves'],['🐞','ladybird','flower']];
 const HOMES={soil:[.02,.62,.34,.98,'the soil'],leaves:[.36,.62,.66,.98,'the leaves'],flower:[.68,.62,.98,.98,'the flower'],jar:[.75,.27,.98,.57,'the jar']};
 const CARE=[['💧','water',1,'Plants drink water. A little is just right.'],['☀️','sunlight',1,'Plants need light to grow.'],
  ['🖐','soft touch',1,'Touch leaves softly, with one finger.'],['✂️','pick it',0,'Picking the flower hurts the plant. Leave it to grow.'],['🦶','stamp',0,'Stamping squashes the plant. Walk around it.']];
 const TALK=[['🚗','Your friend has the red car. You want a turn.',['Can I have a turn, please?','Mine! Give it!'],'Grabbing and shouting hurts. Ask for a turn, and say please.'],
  ['🖍️','Your friend gives you a crayon.',['Thank you!','(say nothing)'],'When someone is kind to you, say thank you.'],
  ['🤕','Your friend falls over.',['Are you OK?','Ha ha!'],'Laughing hurts their feelings. Ask: are you OK?'],
  ['💥','You bump into a boy by mistake.',['Sorry! Are you OK?','(run away)'],'When we hurt someone by mistake, we stop and say sorry.']];
VIS.reg('flaggentle',c=>{let A,pad,chal,q=-1,gen=0;c.fig.classList.add('young');
 const G={strokes:0,run:0,mi:0,bugs:[],held:null,care:[],grow:0,droop:0,ti:0,picked:-1,pic:'',stroke:null,want:()=>{}};
 const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const now=()=>['cat','mood','bug','plant','talk','quiz'][A.step];
 const X=f=>f*A.W,Y=f=>f*A.H,fz=z=>A.narrow?z:z+5;
 const word=(x,s,px,py,z,k,w)=>{x.font=`${w||800} ${fz(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,px,py,A.W-14)};
 const pic=(x,e,px,py,z)=>word(x,e,px,py,z,A.col.tx,400);
 const card=(x,r,k,on,a)=>{x.fillStyle=A.alpha(k,a==null?.15:a);A.paint.rrect(r.x,r.y,r.w,r.h,18);x.fill();x.strokeStyle=k;x.lineWidth=on?5:2;x.stroke()};
 const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const Z=k=>{const h=HOMES[k];return{x:X(h[0]),y:Y(h[1]),w:X(h[2]-h[0]),h:Y(h[3]-h[1])}};
 const no=t=>{A.sound.miss();say(t);A.redraw()};
 const good=t=>{A.sound.pop();say(t);buttons();A.redraw();G.want()};
 // ---- step 1: stroke the cat ----
 const catAt=()=>({x:X(G.run?.86:.5),y:Y(.55)});
 function catV(x){const C=A.col,p=catAt();pic(x,G.run?'😾':'🐈',p.x,p.y,A.narrow?70:100);
  if(G.strokes&&!G.run)for(let i=0;i<G.strokes;i++)pic(x,'💗',p.x-40+i*40,p.y-Y(.26),26);
  if(G.stroke&&G.stroke.path.length>1){x.strokeStyle=A.alpha(C.vi,.6);x.lineWidth=8;x.lineCap='round';x.beginPath();G.stroke.path.forEach((q,i)=>i?x.lineTo(q.x,q.y):x.moveTo(q.x,q.y));x.stroke()}
  word(x,G.strokes>=3?'Purr! Three soft strokes.':G.run?'Too fast! The cat ran off.':'Stroke the cat slowly, along its back',A.W/2,Y(.1),16,G.strokes>=3?C.gr:C.tx)}
 function stroke(soft){if(G.strokes>=3)return;if(!soft){G.run=1;const g=gen;setTimeout(()=>{if(g===gen&&G.run){G.run=0;say('The cat came back. Try again: slow and soft.');A.redraw()}},1500);return no('Too fast and hard! The cat runs away. Use slow, soft strokes.')}
  G.run=0;G.strokes++;good(G.strokes<3?`Soft and slow. The cat purrs. ${3-G.strokes} more.`:'The cat purrs and stays with you.')}
 // ---- step 2: what is the cat saying? ----
 const act=i=>{const g=10,w=(A.W-4*g)/3;return{x:g+i*(w+g),y:Y(.7),w,h:Y(.25)}};
 function moodV(x){const C=A.col,m=MOOD[lo(G.mi,2)];if(G.mi<3){pic(x,m[0],A.W/2,Y(.32),A.narrow?70:96);word(x,m[1],A.W/2,Y(.58),16,C.tx)}else word(x,'You listened to the cat!',A.W/2,Y(.35),20,C.gr);
  if(G.mi<3)ACTS.forEach(([e,t],i)=>{const r=act(i);card(x,r,G.picked===i?C.rd:C.cy,G.picked===i);pic(x,e,r.x+r.w/2,r.y+r.h*.38,30);word(x,t,r.x+r.w/2,r.y+r.h*.78,13,C.tx)})}
 function answer(i){if(G.mi>=3)return;const m=MOOD[G.mi];if(i!==m[2]){G.picked=i;return no(i===0?`${m[1]} Stop now. Its body says no more.`:i===1&&m[2]===0?'It is purring and leaning in. It likes soft strokes.':m[3])}
  G.picked=-1;G.mi++;good(m[3])}
 // ---- step 3: minibeast homes ----
 const start=i=>({x:X(.15+i*.2),y:Y(.42)});
 function bugV(x){const C=A.col;x.fillStyle=A.alpha(C.or,.12);x.fillRect(0,Y(.32),A.W,Y(.2));word(x,'path',X(.68),Y(.36),12,C.tx,600);
  [['soil','🟫',C.or],['leaves','🍃',C.gr],['flower','🌼',C.am],['jar','🫙',C.ln]].forEach(([k,e,k2])=>{const r=Z(k);card(x,r,k2,0,.18);pic(x,e,r.x+r.w/2,r.y+r.h*.35,30);word(x,HOMES[k][4],r.x+r.w/2,r.y+r.h*.8,12,C.tx)});
  BUGS.forEach(([e,n,h],i)=>{const p=G.bugs[i]?{x:Z(h).x+Z(h).w*.7,y:Z(h).y+Z(h).h*.35}:G.held&&G.held.i===i?G.held:start(i);pic(x,e,p.x,p.y,34)});
  const n=BUGS.findIndex((_,i)=>!G.bugs[i]);word(x,n<0?'Every minibeast is home!':`Carry the ${BUGS[n][1]} home, gently`,A.W/2,Y(.12),15,n<0?C.gr:C.tx)}
 function home(i,k){G.held=null;if(G.bugs[i])return A.redraw();const[,n,h]=BUGS[i];
  if(k!==h)return no(k==='jar'?`A jar is not a home. The ${n} needs to go back where it lives.`:k?`The ${n} does not live there. A ${n} lives in ${HOMES[h][4]}.`:`Carry the ${n} gently to ${HOMES[h][4]}.`);
  G.bugs[i]=true;good(`The ${n} is safe in ${HOMES[h][4]}.`)}
 // ---- step 4: look after the plant ----
 const tool=i=>{const g=8,w=(A.W-6*g)/5;return{x:g+i*(w+g),y:Y(.78),w,h:Y(.18)}};
 function plantV(x){const C=A.col,s=1+G.grow*.18;x.fillStyle=A.alpha(C.or,.5);A.paint.rrect(X(.42),Y(.56),X(.16),Y(.14),8);x.fill();
  x.save();x.translate(X(.5),Y(.56));x.rotate(G.droop?.5:0);x.strokeStyle=C.gr;x.lineWidth=6;x.beginPath();x.moveTo(0,0);x.lineTo(0,-Y(.12)*s);x.stroke();
  pic(x,G.grow>=3?'🌷':'🌱',0,-Y(.17)*s,30*s);x.restore();
  CARE.forEach(([e,t],i)=>{if(G.care.includes(i))return;let r=tool(i);if(G.held&&G.held.i===i)r={...r,x:G.held.x-r.w/2,y:G.held.y-r.h/2};card(x,r,C.vi,0,.15);pic(x,e,r.x+r.w/2,r.y+r.h*.4,24);word(x,t,r.x+r.w/2,r.y+r.h*.82,10,C.tx,700)});
  word(x,G.grow>=3?'Your plant is growing!':'Drag a kind thing to the plant',A.W/2,Y(.08),16,G.grow>=3?C.gr:C.tx)}
 function care(i){G.held=null;if(G.care.includes(i)||G.grow>=3)return A.redraw();const[,t,kind,why]=CARE[i];
  if(!kind){G.droop=1;return no(why)}G.droop=0;G.care.push(i);G.grow++;good(why+(G.grow>=3?' Look, a flower!':''))}
 // ---- step 5: kind words ----
 const bub=i=>({x:X(.05),y:Y(.48+i*.24),w:X(.9),h:Y(.2)});
 function talkV(x){const C=A.col;if(G.ti>=4)return word(x,'Kind words every time!',A.W/2,Y(.4),20,C.gr);const[e,s,o]=TALK[G.ti];
  pic(x,e,A.W/2,Y(.16),A.narrow?44:60);word(x,s,A.W/2,Y(.34),15,C.tx);
  [0,1].forEach(i=>{const j=(G.ti+i)%2,r=bub(i);card(x,r,G.picked===j?C.rd:C.cy,G.picked===j);word(x,'💬 '+o[j],r.x+r.w/2,r.y+r.h/2,17,C.tx)})}
 function reply(j){if(G.ti>=4)return;if(j!==0){G.picked=j;return no(TALK[G.ti][3])}G.picked=-1;const t=TALK[G.ti][2][0];G.ti++;good(`"${t}" Kind words.`)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=now();x.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.4);x.fillRect(0,0,W,H);
  const f={cat:catV,mood:moodV,bug:bugV,plant:plantV,talk:talkV}[v];if(f)f(x);else pic(x,G.pic||'🤲',W/2,H/2,70);A.fx.draw(x)}
 function buttons(){if(!pad)return;pad.innerHTML='';const v=now(),B=(t,f,al)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);b.onclick=f};
  if(v==='cat'&&G.strokes<3){B('🖐 Slow, soft stroke',()=>stroke(true));B('👋 Fast, hard pat',()=>stroke(false))}
  if(v==='mood'&&G.mi<3)ACTS.forEach(([e,t],i)=>B(e+' '+t,()=>answer(i)));
  if(v==='bug'){const i=BUGS.findIndex((_,i)=>!G.bugs[i]);if(i>=0)Object.keys(HOMES).forEach(k=>B(BUGS[i][0]+' to '+HOMES[k][4],()=>home(i,k)))}
  if(v==='plant'&&G.grow<3)CARE.forEach(([e,t],i)=>{if(!G.care.includes(i))B(e+' '+t,()=>care(i))});
  if(v==='talk'&&G.ti<4)[0,1].forEach(i=>{const j=(G.ti+i)%2;B('💬 '+TALK[G.ti][2][j],()=>reply(j))})}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const auto=(fs,ms)=>{const g=++gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===gen)f()},j*ms))};
 const clean=()=>{gen++;G.want=()=>{};G.held=null;G.stroke=null;G.picked=-1};
 const steps=[
  {h:'Gentle hands',p:'Cats like slow, soft strokes along the back. Drag your finger slowly over the cat.',
   predict:{q:'You pat the cat hard and fast. What will it do?',opts:['Purr and stay','Run away'],ans:1},task:'Give the cat three soft strokes',
   show:()=>{steps[0].go();auto([0,1,2].map(()=>()=>stroke(true)),500)},
   go:()=>{clean();G.strokes=0;G.run=0;say('Stroke the cat slowly.');buttons();G.want=fin(0,()=>G.strokes>=3,'Slow and soft: the cat stays.')}},
  {h:'Listen to the cat',p:'A cat cannot talk. Its body tells you yes or no. Look, then choose.',
   predict:{q:'The cat walks away from you. What is kind?',opts:['Pick it up','Let it go'],ans:1},task:'Answer the cat three times',
   show:()=>{steps[1].go();auto(MOOD.map(m=>()=>answer(m[2])),500)},
   go:()=>{clean();G.mi=0;say('Purr, purr. What do you do?');buttons();G.want=fin(1,()=>G.mi>=3,'Purr: go on softly. Flat ears or walking off: stop.')}},
  {h:'Minibeast homes',p:'Worms, snails and ladybirds are small and soft. Carry each one gently back to where it lives.',
   predict:{q:'You find a snail on the path. What is kind?',opts:['Keep it in a jar','Put it back on the leaves'],ans:1},task:'Take all three minibeasts home',
   show:()=>{steps[2].go();auto(BUGS.map((b,i)=>()=>home(i,b[2])),500)},
   go:()=>{clean();G.bugs=[];say('Carry the worm home, gently.');buttons();G.want=fin(2,()=>G.bugs.filter(Boolean).length>=3,'Put minibeasts back where they live.')}},
  {h:'Help the plant',p:'Plants are alive. They need water and light, and soft hands. Drag a kind thing to the plant.',task:'Do three kind things for the plant',
   show:()=>{steps[3].go();auto([0,1,2].map(i=>()=>care(i)),500)},
   go:()=>{clean();G.care=[];G.grow=0;G.droop=0;say('Drag a kind thing to the plant.');buttons();G.want=fin(3,()=>G.grow>=3,'Water, light and soft hands help it grow.')}},
  {h:'Kind words',p:'Gentle is for people too. Tap the kind thing to say.',task:'Choose kind words four times',
   show:()=>{steps[4].go();auto([0,1,2,3].map(()=>()=>reply(0)),500)},
   go:()=>{clean();G.ti=0;say('Your friend has the red car.');buttons();G.want=fin(4,()=>G.ti>=4,'Please, thank you, are you OK, sorry.')}},
  {h:'Challenge',p:'',go:()=>{clean();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.want()});
 const QZ=[['The dog wags its tail and comes to you. How do you stroke it?','🐶',[['Slow and soft','ok'],['Fast and hard','rough'],['Pull its tail','pull']]],
  ['You find a worm on the path. What do you do?','🪱',[['Put it back on the soil','ok'],['Squash it','squash'],['Keep it in my pocket','pocket']]],
  ['The cat puts its ears flat. What do you do?','😾',[['Stop stroking','ok'],['Stroke it more','more'],['Pick it up','lift']]],
  ['Your friend has the ball. You want it. What do you say?','⚽',[['Can I have a turn, please?','ok'],['Give it to me!','grab'],['Push them','push']]],
  ['A pretty flower grows in the park. What is kind?','🌷',[['Look and smell it','ok'],['Pick it','pick'],['Stamp on it','stamp']]]];
 let stars=0;
 function quiz(){q++;const[t,e,o]=QZ[q%QZ.length],r=q%3;G.pic=e;
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.slice(r).concat(o.slice(0,r)).forEach(([s,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,s);b.onclick=()=>judge(tag)});say('Challenge: '+t);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! That is gentle and kind.';break;
   case 'rough':m='Fast and hard can hurt. Dogs like slow, soft strokes.';break;
   case 'pull':m='Pulling a tail hurts. Stroke its back, softly.';break;
   case 'squash':m='Squashing hurts the worm. Put it back on the soil.';break;
   case 'pocket':m='A pocket is not a home. Worms live in the soil.';break;
   case 'more':m='Flat ears mean stop. The cat has had enough.';break;
   case 'lift':m='Flat ears mean leave me be. Stop and let it go.';break;
   case 'grab':m='Shouting is not kind. Ask: can I have a turn, please?';break;
   case 'push':m='Pushing hurts. Use kind words and wait for a turn.';break;
   case 'pick':m='Picking it means no one else can enjoy it. Look and smell.';break;
   default:m='Stamping squashes the flower. Walk around it.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=now();G.held=null;
  if(v==='cat'&&G.strokes<3){const c0=catAt();if(Math.hypot(p.x-c0.x,p.y-c0.y)<hi(70,A.W*.18)){G.run=0;G.stroke={t:performance.now(),d:0,path:[p]};return true}return false}
  if(v==='mood'){const i=[0,1,2].findIndex(i=>inside(p,act(i)));if(i>=0)answer(i);return false}
  if(v==='bug'){const i=BUGS.findIndex((_,i)=>!G.bugs[i]&&Math.hypot(p.x-start(i).x,p.y-start(i).y)<hi(32,A.W*.07));if(i>=0){G.held={i,x:p.x,y:p.y};return true}return false}
  if(v==='plant'){const i=CARE.findIndex((_,i)=>!G.care.includes(i)&&inside(p,tool(i)));if(i>=0){G.held={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
  if(v==='talk'){const i=[0,1].findIndex(i=>inside(p,bub(i)));if(i>=0)reply((G.ti+i)%2)}return false}
 function move(p){const s=G.stroke;if(s){const l=s.path[s.path.length-1];s.d+=Math.hypot(p.x-l.x,p.y-l.y);s.path.push(p);A.redraw()}else if(G.held){G.held.x=p.x;G.held.y=p.y;A.redraw()}}
 function up(p){const v=now(),s=G.stroke,h=G.held;
  if(v==='cat'&&s){G.stroke=null;if(s.d<A.W*.12)return no('Stroke along its back, from head to tail.');const sp=s.d/hi(.05,(performance.now()-s.t)/1000);return stroke(sp<A.W*1.6)}
  if(!h)return;if(v==='bug')return home(h.i,Object.keys(HOMES).find(k=>inside(p,Z(k)))||'');
  if(v==='plant'){const tap=Math.hypot(p.x-h.x0,p.y-h.y0)<12,on=Math.abs(p.x-X(.5))<X(.2)&&p.y<Y(.74);return tap||on?care(h.i):(G.held=null,A.redraw())}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
 A.start()})})();
