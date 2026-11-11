/* Flagship – having a go at something new (ages 3–4): sort new things into "have a go" and "ask a grown-up first" (hot,
   sharp and road things), climb a frame one rung at a time with a breath when it feels wobbly, say "Oops! I'll have
   another go" when paint drips or a tower falls, take tasting steps with a new food (look, smell, touch, lick, tiny bite)
   and fill Bear's brave meter with have-a-go words. Challenge on the usual slips: a mistake means "I'm bad at it",
   "only big kids can", rushing the scary part, everything new is fine to try, all-or-nothing tasting. */
(()=>{
const NEW=[['🥦','a new food',0],['🔥','the hot oven',1],['🧗','the climbing frame',0],['🔪','a sharp knife',1],['🎨','painting',0],['🚗','crossing the road',1]];
const OOPS=[['🎨','The paint drips!','🌸','You made the drip into a flower!'],['🧱','The tower falls down!','🏰','You built it again. It stands!'],['⚽','You kick and miss!','🥅','Another go, and it goes in!']];
const SAY=[['Oops! I will have another go.','ok'],['I am bad at this. I stop.','bad'],['I will never do it again.','never']];
const TASTE=[['👀','Look'],['👃','Smell'],['✋','Touch'],['👅','Lick'],['😋','Tiny bite']];
const WORDS=[["I'll have a go!",1],["I can't do it.",0],["I can't do it yet.",1],["Only big kids can.",0],['I can try a little bit.',1],["It's too hard. I won't.",0]];
VIS.reg('flagbrave',c=>{let A,pad,quiz,qn=-1,run1=0;c.fig.classList.add('young');
const B={tok:0,wt:0,want:()=>{},i:0,bad:-1,rung:0,breath:0,o:0,said:0,fixed:0,t:0,meter:0,used:[],drag:null,shake:0};
const mode=()=>['sort','climb','oops','taste','words','quiz'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1.12:1.3));
function txt(g,s,x,y,n,col,w){g.font=`${w||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-14)}
function tile(g,x,y,w,h,tint,edge,lw){g.fillStyle=tint;A.paint.rrect(x,y,w,h,16);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge||A.col.tx;A.paint.rrect(x,y,w,h,16);g.stroke()}
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
const bins=()=>[{x:8,y:A.H*.6,w:A.W/2-14,h:A.H*.3},{x:A.W/2+6,y:A.H*.6,w:A.W/2-14,h:A.H*.3}];
const card=()=>({x:A.W*.3,y:A.H*.08,w:A.W*.4,h:A.H*.38});
const rungY=r=>A.H*.84-r*A.H*.14;
const spots=()=>TASTE.map((_,i)=>({x:A.W*(.1+i*.2),y:A.H*(i%2?.36:.6),r:Math.min(A.W*.085,A.H*.1)}));
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.06:.4);g.fillRect(0,0,W,H);
 if(m==='quiz'){txt(g,'🌟 I can have a go! 🌟',W/2,H*.4,20,C.tx,800);txt(g,'Oops is OK. Try again.',W/2,H*.58,15);return}
 if(m==='sort'){const bb=bins();tile(g,bb[0].x,bb[0].y,bb[0].w,bb[0].h,A.alpha(C.gr,.18),B.bad===0?C.rd:C.tx,B.bad===0?4:2);tile(g,bb[1].x,bb[1].y,bb[1].w,bb[1].h,A.alpha(C.or,.2),B.bad===1?C.rd:C.tx,B.bad===1?4:2);
  txt(g,'👍 Have a go',bb[0].x+bb[0].w/2,bb[0].y+bb[0].h*.38,14,C.tx,800);txt(g,'✋ Ask first',bb[1].x+bb[1].w/2,bb[1].y+bb[1].h*.38,14,C.tx,800);
  txt(g,'ask a grown-up',bb[1].x+bb[1].w/2,bb[1].y+bb[1].h*.68,11,C.tx,600);txt(g,'try it!',bb[0].x+bb[0].w/2,bb[0].y+bb[0].h*.68,11,C.tx,600);
  if(B.i<NEW.length){const it=NEW[B.i],r=card(),d=B.drag;const x=d?d.x:r.x+r.w/2,y=d?d.y:r.y+r.h*.42;if(!d)tile(g,r.x,r.y,r.w,r.h,A.alpha(C.cy,.14));txt(g,it[0],x+Math.sin(B.shake*30)*B.shake*20,y,40);if(!d)txt(g,it[1],r.x+r.w/2,r.y+r.h*.84,12,C.tx,700)}
  else txt(g,'All sorted!',W/2,H*.27,18,C.tx,800);txt(g,'Sorted '+B.i+' of '+NEW.length,W/2,H*.96,11,C.tx,600)}
 if(m==='climb'){const x0=W*.32,x1=W*.68;g.strokeStyle=C.tx;g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(x0,rungY(0)+16);g.lineTo(x0,rungY(5)-10);g.moveTo(x1,rungY(0)+16);g.lineTo(x1,rungY(5)-10);g.stroke();
  for(let r=1;r<=5;r++){g.strokeStyle=r<=B.rung?C.gr:C.tx;g.lineWidth=r<=B.rung?6:4;g.beginPath();g.moveTo(x0,rungY(r)+10);g.lineTo(x1,rungY(r)+10);g.stroke()}g.lineCap='butt';
  txt(g,'🚩',x1+22,rungY(5)-8,22);const y=B.drag?B.drag.y:rungY(B.rung);txt(g,'🧒',W/2+(B.rung===3&&!B.breath?Math.sin(B.wt*8)*5:0),y-6,30);
  for(let s=0;s<5;s++)txt(g,s<B.rung?'⭐':'☆',W*.12,rungY(s+1)+4,15,C.tx);
  if(B.rung===3&&!B.breath)txt(g,'Wobbly!',W*.84,rungY(3),12,C.tx,800);txt(g,B.rung>=5?'You did it!':'Step '+B.rung+' of 5',W/2,H*.96,12,C.tx,800)}
 if(m==='oops'){const o=OOPS[B.o%3],fixed=B.fixed;tile(g,W*.18,H*.06,W*.64,H*.6,A.alpha(fixed?C.gr:C.or,.14));txt(g,fixed?o[2]:o[0],W/2,H*.3,52);
  if(!fixed){g.fillStyle=A.alpha(C.cy,.5);g.beginPath();g.ellipse(W*.62,H*.46,W*.05,H*.03,0,0,7);g.fill()}
  txt(g,fixed?o[3]:o[1],W/2,H*.58,13,C.tx,800);txt(g,'What do you say?',W/2,H*.76,14,C.tx,800);txt(g,'Another go: '+B.said+' of 3',W/2,H*.94,11,C.tx,600)}
 if(m==='taste'){const sp=spots();g.strokeStyle=A.alpha(C.tx,.5);g.lineWidth=3;g.setLineDash([6,6]);g.beginPath();sp.forEach((s,i)=>i?g.lineTo(s.x,s.y):g.moveTo(s.x,s.y));g.stroke();g.setLineDash([]);
  sp.forEach((s,i)=>{g.beginPath();g.arc(s.x,s.y,s.r,0,7);g.fillStyle=C.pn;g.fill();g.fillStyle=A.alpha(i<B.t?C.gr:C.vi,i<B.t?.35:.12);g.fill();g.lineWidth=B.bad===i?4:2;g.strokeStyle=B.bad===i?C.rd:C.tx;g.stroke();
   txt(g,TASTE[i][0],s.x,s.y-2,20);txt(g,TASTE[i][1],s.x,s.y+s.r+12,10,C.tx,700)});
  const at=B.t?sp[B.t-1]:{x:W*.1,y:H*.14};txt(g,'🥦',B.drag?B.drag.x:at.x,(B.drag?B.drag.y:at.y-(B.t?sp[0].r+14:0)),26);
  txt(g,B.t>=5?'You tasted it!':'Next: '+TASTE[B.t][1],W/2,H*.92,14,C.tx,800)}
 if(m==='words'){txt(g,'🐻',W*.24,H*.5,46);txt(g,'🛝',W*.24,H*.2,30);const bx=W*.42,bw=W*.54;tile(g,bx,H*.08,bw,H*.3,A.alpha(B.bad>=0?C.rd:C.cy,.12),B.bad>=0?C.rd:C.tx);
  txt(g,B.last||'Help Bear!',bx+bw/2,H*.23,12,C.tx,800);const mh=H*.42,my=H*.48;tile(g,W*.82,my,W*.1,mh,A.alpha(C.tx,.06));
  g.fillStyle=A.alpha(C.gr,.7);A.paint.rrect(W*.82+3,my+mh-3-(mh-6)*B.meter/3,W*.1-6,(mh-6)*B.meter/3,10);g.fill();txt(g,'brave',W*.87,my+mh+12,10,C.tx,700);
  txt(g,'Brave meter: '+B.meter+' of 3',W*.55,H*.62,13,C.tx,800);if(B.meter>=3)txt(g,'Bear has a go! 🎉',W*.55,H*.75,14,C.tx,800)}
 A.fx.draw(g)}
const no=t=>{A.sound.miss();say(t);A.redraw()},yes=t=>{A.sound.pop();say(t);pads();A.redraw();B.want()};
const wobble=()=>{B.shake=.4;A.tween(B,{shake:0},A.reduced()?1:500,'out')};
function sortTo(k){B.drag=null;if(B.i>=NEW.length)return A.redraw();const[e,n,ask]=NEW[B.i];
 if(k!==ask){B.bad=k;wobble();return no(ask?`${e} ${n[0].toUpperCase()+n.slice(1)} can hurt you. Ask a grown-up first.`:`${e} ${n[0].toUpperCase()+n.slice(1)} is safe to try. Have a go! A grown-up can stay near.`)}
 B.bad=-1;B.i++;yes(ask?`Yes. Ask a grown-up first about ${n}.`:`Yes! Have a go at ${n}.`)}
function climb(n){if(B.rung>=5)return;B.drag=null;if(n>1){wobble();return no('Whoa! A big jump is hard. One small step at a time.')}
 if(B.rung===3&&!B.breath)return no('Feeling wobbly? Stop and take a big breath first.');B.rung++;A.sound.tick();say(B.rung>=5?'Top! You did it, one step at a time.':'Step '+B.rung+'. Good!');pads();A.redraw();if(B.rung>=5)B.want()}
function breathe(){if(B.rung!==3||B.breath)return;B.breath=1;yes('Big breath in… and out. Now try the next step.')}
function answer(tag){if(B.said>=3||B.fixed)return;if(tag!=='ok'){return no(tag==='bad'?'A mistake does not mean you are bad at it. Everyone makes oops. Have another go!':'Never? One oops is not the end. Try again and it gets easier.')}
 B.fixed=1;B.said++;yes(OOPS[B.o%3][3]);if(B.said<3){const t=B.tok;setTimeout(()=>{if(t===B.tok){B.o++;B.fixed=0;pads();A.redraw()}},A.reduced()?20:800)}}
function taste(i){B.drag=null;if(B.t>=5)return A.redraw();if(i<B.t)return A.redraw();if(i>B.t){B.bad=i;return no(`One step at a time. First ${TASTE[B.t][1].toLowerCase()}.`)}
 B.bad=-1;B.t++;yes(B.t>=5?'A tiny bite! You had a go at a new food.':TASTE[i][1]+'. Well done! Next: '+TASTE[B.t][1].toLowerCase()+'.')}
function word(k){if(B.meter>=3||B.used.includes(k))return;const[w,good]=WORDS[k];B.last='“'+w+'”';
 if(!good){B.bad=k;return no(k===1?'"I can\'t" stops Bear. Add a little word: "I can\'t do it YET."':k===3?'Bear is little, and little ones can try too. Try a have-a-go word.':'Too hard? Bear can try a small bit first. Pick a have-a-go word.')}
 B.bad=-1;B.used.push(k);B.meter++;yes(B.meter>=3?'Bear feels brave and has a go!':'Bear feels braver.')}
function pads(){if(!pad)return;pad.innerHTML='';const m=mode(),K=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='sort'&&B.i<NEW.length){const n=NEW[B.i][1];K('👍 Have a go',()=>sortTo(0),'Have a go at '+n);K('✋ Ask first',()=>sortTo(1),'Ask a grown-up first about '+n)}
 if(m==='climb'&&B.rung<5){K('⬆ One step',()=>climb(1),'Climb one step up');K('⏫ Jump to top',()=>climb(5-B.rung),'Jump straight to the top');if(B.rung===3&&!B.breath)K('😮‍💨 Breathe',breathe,'Take a big breath')}
 if(m==='oops'&&!B.fixed&&B.said<3){const r=B.o%3;SAY.slice(r).concat(SAY.slice(0,r)).forEach(([s,tag])=>K(s,()=>answer(tag)))}
 if(m==='taste'&&B.t<5)TASTE.forEach(([e,n],i)=>K(e+' '+n,()=>taste(i),n));
 if(m==='words'&&B.meter<3)WORDS.forEach(([w],k)=>{if(!B.used.includes(k))K(w,()=>word(k),'Bear says: '+w)})}
function down(p){const m=mode();if(m==='sort'&&B.i<NEW.length&&inR(p,card())){B.drag={x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
 if(m==='climb'&&B.rung<5&&Math.abs(p.y-rungY(B.rung))<A.H*.1&&Math.abs(p.x-A.W/2)<A.W*.2){B.drag={x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
 if(m==='taste'){const sp=spots(),at=B.t?sp[B.t-1]:{x:A.W*.1,y:A.H*.14-0};if(Math.hypot(p.x-at.x,p.y-at.y)<A.W*.1&&B.t<5){B.drag={x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
  sp.forEach((s,i)=>{if(Math.hypot(p.x-s.x,p.y-s.y)<s.r)taste(i)})}return false}
function move(p){if(!B.drag)return;B.drag.x=p.x;B.drag.y=p.y;A.redraw()}
function up(p){const d=B.drag,m=mode();if(!d)return;const far=Math.hypot(p.x-d.x0,p.y-d.y0);
 if(m==='sort'){const bb=bins();for(let k=0;k<2;k++)if(inR(p,bb[k]))return sortTo(k);B.drag=null;return A.redraw()}
 if(m==='climb'){if(far<10){B.drag=null;return A.redraw()}const n=Math.round((rungY(B.rung)-p.y)/(A.H*.14));if(n<1){B.drag=null;return A.redraw()}return climb(n)}
 if(m==='taste'){const sp=spots();for(let i=0;i<5;i++)if(Math.hypot(p.x-sp[i].x,p.y-sp[i].y)<sp[i].r*1.2)return taste(i);B.drag=null;A.redraw()}}
const fin=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const t=++B.tok;fns.forEach((f,j)=>setTimeout(()=>{if(t===B.tok)f()},A.reduced()?j*30+30:(j+1)*ms))};
const reset=()=>{B.tok++;Object.assign(B,{want:()=>{},i:0,bad:-1,rung:0,breath:0,o:0,said:0,fixed:0,t:0,meter:0,used:[],drag:null,last:'',shake:0})};
const wait=()=>{};
const steps=[
{h:'Try it or ask first?',p:'Some new things are fun to try. Hot, sharp and road things need a grown-up first. Drag each one to a box, or tap a button.',
 predict:{q:'Is it good to have a go at every new thing?',opts:['Yes, every new thing','No, ask first about hot or sharp things'],ans:1},task:'Sort all 6',
 show:()=>{steps[0].go();play(NEW.map(it=>()=>sortTo(it[2])),330)},
 go:()=>{reset();say('Sort the new things. Have a go, or ask first?');pads();B.want=fin(0,()=>B.i>=NEW.length,'Have a go at safe new things. Ask a grown-up about hot, sharp and road things.')}},
{h:'One step at a time',p:'The climbing frame is big. Climb one step at a time. Drag the child up, or tap a button.',
 predict:{q:'The climbing frame looks big. What helps most?',opts:['Jump right to the top','One small step at a time'],ans:1},task:'Climb to the top',
 show:()=>{steps[1].go();const s=()=>climb(1);play([s,s,s,breathe,s,s],330)},
 go:()=>{reset();say('Climb to the flag, one step at a time.');pads();B.want=fin(1,()=>B.rung>=5,'Small steps get you to the top. A breath helps when you feel wobbly.')}},
{h:'Oops! Another go',p:'Things go wrong when we try new things. That is how we learn. What do you say?',
 predict:{q:'Your paint drips. That means…',opts:['You are bad at painting','You are learning. Have another go'],ans:1},task:'Have another go, 3 times',
 show:()=>{steps[2].go();play([()=>answer('ok'),wait,wait,()=>answer('ok'),wait,wait,()=>answer('ok')],330)},
 go:()=>{reset();say('Oh no, the paint drips! What do you say?');pads();B.want=fin(2,()=>B.said>=3,'Oops is part of learning. Another go makes it better.')}},
{h:'Tasting steps',p:'A new food! Try it in tiny steps: look, smell, touch, lick, then a tiny bite. Tap the next circle, or drag the food.',task:'Get to a tiny bite',
 show:()=>{steps[3].go();play([0,1,2,3,4].map(i=>()=>taste(i)),330)},
 go:()=>{reset();say('A new food. First, look at it.');pads();B.want=fin(3,()=>B.t>=5,'Tiny steps make a new food less scary. You can stop and try again another day.')}},
{h:'Brave words',p:'Bear wants to try the big slide. Pick words that help Bear have a go.',task:'Fill the brave meter',
 show:()=>{steps[4].go();play([()=>word(0),()=>word(2),()=>word(4)],380)},
 go:()=>{reset();say('Help Bear be brave. Pick a have-a-go word.');pads();B.want=fin(4,()=>B.meter>=3,'"I\'ll have a go" and "not yet" are brave words.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>B.want()});
const QS=[['You see a new climbing frame. What can you say?',[["I'll have a go!",'ok'],["I can't, so I won't try.",'cant'],['Only big kids can.','big']]],
 ['Your painting goes wrong. What now?',[['Have another go','ok'],['Throw it away and stop','stop'],['Say you will never paint again','never']]],
 ['A new food is on your plate. A tiny first step is…',[['Look at it and smell it','ok'],['Eat it all in one go','all'],['Push it away without looking','away']]],
 ['Which one do you ask a grown-up about first?',[['The hot oven','ok'],['A new puzzle','puzzle'],['A new song','song']]],
 ['You fall off your scooter. Are you bad at it?',[['No, I am still learning','ok'],['Yes, I am bad at it','badat'],['Yes, scooters are not for me','notme']]],
 ['The slide feels scary. What can help?',[['A big breath, then one small step','ok'],['Run to the top fast','rush'],['Say "I never will"','nevr']]]];
function why(t){let m='Have a go at safe new things, one small step at a time. Oops is part of learning.';
 if(t==='cant')m='"I can\'t" stops you before you start. Say "I\'ll have a go" or "I can\'t do it yet."';
 if(t==='big')m='Little children can try too. Start with one small step.';
 if(t==='stop')m='A painting that goes wrong is how you learn. Have another go.';
 if(t==='never')m='Never is a long time! One oops does not mean you cannot paint.';
 if(t==='all')m='All at once is a big jump. Tiny steps first: look, smell, touch.';
 if(t==='away')m='You do not have to eat it yet. Just looking is a brave first step.';
 if(t==='puzzle')m='A puzzle is safe. Have a go! Hot things like an oven need a grown-up first.';
 if(t==='song')m='Singing a new song is safe to try. The hot oven needs a grown-up first.';
 if(t==='badat')m='Falling is part of learning to ride. Everyone wobbles at first.';
 if(t==='notme')m='One fall does not mean it is not for you. Get up and have another go.';
 if(t==='rush')m='Rushing makes it scarier. Take a breath and go one step at a time.';
 if(t==='nevr')m='"Never" stops you. Try "not yet", then one small step.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){run1++;A.win()}else{run1=0;A.sound.miss()}fb.innerHTML=(good?'✓ Yes! In a row: '+run1+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});
  A.every(dt=>{if(mode()==='climb'&&B.rung===3&&!B.breath&&!A.reduced()){B.wt+=dt;return true}return false});pads()}});
A.start()})})();
