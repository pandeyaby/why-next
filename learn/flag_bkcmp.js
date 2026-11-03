/* Flagship – comparing books (ages 10–11, NC UKS2 reading comprehension: "making comparisons within and across books" and
   "identifying and discussing themes and conventions in and across a wide range of writing"; CCSS RL.5.9 "compare and
   contrast stories in the same genre on their approaches to similar themes and topics"). Two short made-up novels, The Storm
   Lamp (Nell, a lighthouse island, first person) and River Street (Mo, a flooded city, third person), are dealt one card at a
   time: sort facts into a Venn diagram, sort extracts by how each author shows courage, track how each main character
   changes, sort what each setting does, and choose "similarly" or "whereas" to join comparison sentences.
   Targets the slips that a shared theme means the same message, that comparing means listing facts about each book in
   turn, and that "similarly" can join two differences. */
(()=>{const FONT='Nunito,ui-rounded,system-ui,sans-serif',A1='The Storm Lamp',B1='River Street';
const SCN=[
 {z:['Only '+A1,'Both books','Only '+B1],venn:1,cards:[['A child has to be brave while scared',1,'Nell and Mo are both scared and both act anyway. That is shared, so it goes in the middle.'],
  ['Told by Nell herself: "I", "me"',0,'Only Nell tells her own story. River Street uses "he" and "Mo".'],
  ['Set on a tiny island with a lighthouse',0,'The island belongs to The Storm Lamp. Mo lives in a city.'],
  ['Water is the danger',1,'The sea storm and the flood are both water. Shared, so it goes in the middle.'],
  ['Told by a narrator: "he", "Mo"',2,'Only River Street has a narrator outside the story. Nell says "I".'],
  ['Set in a busy city street',2,'The city is River Street. Nell is on an island.'],
  ['The main character is ten',1,'Nell and Mo are both ten. Shared, so it goes in the middle.']]},
 {z:["Shown through Nell's thoughts","Shown through Mo's actions and words"],cards:[['"My hands shook, but I told myself: one more step."',0,'We are inside Nell\'s head: "I told myself". That is a thought.'],
  ['"Mo grabbed the rope and shouted, \'Hold on, Gran!\'"',1,'We see Mo act and hear him speak. We are not told what he thinks.'],
  ['"I hated the dark. I hated it more when the lamp went out."',0,'Only a first-person narrator can tell us feelings like "I hated". That is Nell.'],
  ['"He waded back for the cat, though the water reached his chest."',1,'"He waded" is an action seen from outside. That is how River Street shows Mo.']]},
 {z:['Nell at the start','Nell by the end','Mo at the start','Mo by the end'],grid:1,cards:[['Boasts that he needs nobody',2,'Boasting comes first for Mo. The flood changes him.'],
  ['Keeps the lamp lit alone all night',1,'This is Nell after she changes. At the start she cannot face the dark.'],
  ['Scared to climb the dark stairs',0,'Fear of the dark is where Nell begins.'],
  ['Knocks on doors to ask for help',3,'Asking for help is how Mo ends. At the start he says he needs nobody.']]},
 {z:['Sets the mood','Causes the problem'],cards:[['"Wind howled round the lighthouse like a hungry wolf."',0,'The wolf simile makes us feel fear. Nothing breaks yet: it is mood.'],
  ['"The flood cut River Street off from the bridge."',1,'Now Mo cannot get out. The setting makes the problem the story is about.'],
  ['"Grey water slapped at the doors, cold and patient."',0,'"Cold and patient" makes the water feel like a threat. That is mood.'],
  ['"The storm knocked out the power to the whole island."',1,'No power means no lamp. The setting creates the problem Nell must solve.']]},
 {z:['Similarly','Whereas'],cards:[['Nell is scared of the dark. ___, Mo is scared of the water.',0,'Both are scared of something. Two alike things take "similarly".'],
  ['Nell tells her own story, ___ Mo\'s story is told by a narrator.',1,'First person and third person are different. "Whereas" joins differences.'],
  ['Nell faces the storm alone, ___ Mo gets help from his street.',1,'Alone versus with help is a difference, so it needs "whereas".'],
  ['The storm puts Nell in danger. ___, the flood traps Mo.',0,'Both are in danger from water. That is alike, so "similarly".']]}];
VIS.reg('flagbkcmp',c=>{let A,pads,quiz,qi=-1,streak=0;const S={};
const sc=()=>['venn','theme','change','setting','join','quiz'][A.step];
const tell=s=>{c.say(s);if(A)A.cv.setAttribute('aria-label',s)};
const fs=n=>Math.round(n*(A.narrow?1:1.2));
function txt(g,s,x,y,n,colr,w){g.font=`${w||800} ${fs(n)}px ${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=colr||A.col.tx;g.fillText(s,x,y,A.W-12)}
function lines(g,s,maxw,n,w){g.font=`${w||700} ${fs(n)}px ${FONT}`;const ws=s.split(' '),ls=[];let cur='';ws.forEach(x=>{const t=cur?cur+' '+x:x;if(g.measureText(t).width>maxw&&cur){ls.push(cur);cur=x}else cur=t});ls.push(cur);return ls}
function wrap(g,s,x,y,maxw,n,colr,w){const ls=lines(g,s,maxw,n,w);ls.forEach((l,i)=>txt(g,l,x,y+(i-(ls.length-1)/2)*fs(n)*1.22,n,colr,w||700));return ls.length*fs(n)*1.22}
const deckR=()=>{const w=Math.min(A.W*.86,440),h=A.H*.2;return{x:(A.W-w)/2,y:A.H-h-A.H*.03,w,h}};
function zoneR(i){const n=S.z.length,gap=A.W*.025,bar=S.venn?fs(20):0,y0=A.H*.02+bar,hh=deckR().y-y0-A.H*.03-bar;
 if(S.grid){const w=(A.W-gap*3)/2,h=(hh-gap)/2;return{x:gap+(i%2)*(w+gap),y:y0+Math.floor(i/2)*(h+gap),w,h}}
 const w=(A.W-gap*(n+1))/n;return{x:gap+i*(w+gap),y:y0,w,h:hh}}
function zone(g,i,r){const K=A.col,hue=(S.grid?[K.ac,K.ac,K.vi,K.vi]:S.venn?[K.ac,K.gr,K.vi]:[K.ac,K.vi])[i]||K.ac;g.save();A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fillStyle=A.mix(K.pn,hue,K.dark?.16:.1);g.fill();g.lineWidth=2;g.strokeStyle=A.mix(K.tx,hue,.4);g.stroke();g.restore();
 g.font=`800 ${fs(12)}px ${FONT}`;const nl=lines(g,S.z[i],r.w-10,12,800).length,hh=wrap(g,S.z[i],r.x+r.w/2,r.y+8+nl*fs(12)*.61,r.w-10,12,K.tx,800);let y=r.y+12+hh;
 S.cards.filter(cd=>cd.at===i).forEach(cd=>{g.font=`700 ${fs(10)}px ${FONT}`;const ls=lines(g,cd.label,r.w-18,10),h=ls.length*fs(10)*1.22+8;
  g.save();A.paint.rrect(r.x+5,y,r.w-10,h,8);g.fillStyle=K.pn;g.fill();g.lineWidth=1.5;g.strokeStyle=K.mu;g.stroke();g.restore();
  ls.forEach((l,j)=>txt(g,l,r.x+r.w/2,y+4+fs(10)*.61+j*fs(10)*1.22,10,K.tx,700));y+=h+4})}
function vennRing(g){const K=A.col,a=zoneR(0),m=zoneR(1),b=zoneR(2),h=fs(16);
 [[a.x,m.x+m.w,a.y-h-3,K.ac,A1],[m.x,b.x+b.w,a.y+a.h+3,K.vi,B1]].forEach(([x0,x1,y,hue,t])=>{g.save();A.paint.rrect(x0,y,x1-x0,h,h/2);g.fillStyle=A.mix(K.pn,hue,K.dark?.3:.18);g.fill();g.lineWidth=1.5;g.strokeStyle=hue;g.stroke();g.restore();txt(g,t+' circle: own side and middle',(x0+x1)/2,y+h/2,10,K.tx,800)})}
function draw(A){const{ctx:g,W,H,col:K}=A,v=sc();g.fillStyle=A.mix(K.pn,K.am,K.dark?.04:.06);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,A1+'  and  '+B1,W/2,H*.3,17);txt(g,'Same theme, different ways',W/2,H*.46,14,K.tx,700);txt(g,'Similarly  ·  whereas  ·  both',W/2,H*.6,14,K.tx,700);return}
 if(S.venn)vennRing(g);S.z.forEach((_,i)=>zone(g,i,zoneR(i)));
 const cd=S.cards[S.i],r=deckR();
 if(cd){const p=S.drag?{x:S.dx,y:S.dy}:{x:r.x+(S.nx||0),y:r.y};g.save();A.paint.rrect(p.x,p.y,r.w,r.h,14);g.fillStyle=S.drag?A.mix(K.pn,K.am,.2):K.pn;g.fill();g.lineWidth=S.drag?3:2;g.strokeStyle=K.tx;g.stroke();g.restore();
  wrap(g,cd.label,p.x+r.w/2,p.y+r.h/2-(S.drag?0:fs(5)),r.w-20,14,K.tx,700);if(!S.drag)txt(g,`card ${S.i+1} of ${S.cards.length} · drag it up`,p.x+r.w/2,p.y+r.h-fs(9),10,K.mu,700)}
 else txt(g,S.msg||'All sorted!',W/2,r.y+r.h/2,15,K.tx,800);A.fx.draw(g)}
function load(spec){const t=S.tok;Object.keys(S).forEach(k=>delete S[k]);S.tok=t||0;S.want=()=>{};S.z=spec.z;S.venn=spec.venn;S.grid=spec.grid;S.i=0;S.drag=null;S.nx=0;
 S.cards=spec.cards.map(([label,want,tip])=>({label,want,tip,at:-1}))}
function put(z){if(sc()==='quiz')return;const cd=S.cards[S.i];if(!cd)return;
 if(z!==cd.want){A.sound.miss();tell(`Not ${S.z[z]}. ${cd.tip}`);A.tween(S,{nx:0},300,'out');S.nx=14;A.redraw();return}
 cd.at=z;S.i++;A.sound.pop();tell(`Yes, ${S.z[z]}. ${cd.tip}`+(S.cards[S.i]?` Next card: ${S.cards[S.i].label}`:''));buttons();A.redraw();
 if(S.i>=S.cards.length){S.ok=1;S.msg='All sorted!';S.want()}}
function buttons(){if(!pads)return;pads.innerHTML='';if(sc()==='quiz'||!S.cards[S.i])return;
 S.z.forEach((z,i)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':`Put "${S.cards[S.i].label}" in ${z}`},pads,z);b.onclick=()=>put(i)})}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){if(sc()==='quiz'||!S.cards[S.i]||!inR(p,deckR()))return false;const r=deckR();S.drag=1;S.dx=r.x;S.dy=r.y;S.off={x:p.x-r.x,y:p.y-r.y};return true}
function move(p){if(!S.drag)return;S.dx=p.x-S.off.x;S.dy=p.y-S.off.y;A.redraw()}
function up(p){if(!S.drag)return;S.drag=null;const r=deckR(),mid={x:S.dx+r.w/2,y:S.dy+r.h*.3};for(let i=0;i<S.z.length;i++)if(inR(mid,zoneR(i))||inR(p,zoneR(i)))return put(i);A.redraw()}
const ok=(n,msg)=>()=>{if(A.step===n&&S.ok&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=ms=>{const k=++S.tok;S.cards.forEach((cd,j)=>setTimeout(()=>{if(k===S.tok)put(cd.want)},A.reduced()?j*30+30:(j+1)*ms))};
const run=(n,say,msg)=>{load(SCN[n]);tell(say+' First card: '+S.cards[0].label);buttons();S.want=ok(n,msg)};
const steps=[
{h:'Same and different',p:'Two books, one diagram. Drag each card to where it belongs: one book only, or the middle if both books share it.',task:'Sort all seven cards into the Venn diagram',
 show:()=>{steps[0].go();play(500)},
 go:()=>run(0,'The Storm Lamp is on the left, River Street on the right, and the middle is for things both books share.',
  'Comparing means finding what is the same and what is different. The middle of the Venn is where the comparison starts.')},
{h:'One theme, two ways',p:'Both books are about courage. Sort each extract by how its author shows it.',predict:{q:'Both books are about courage. Will both authors show courage in the same way?',opts:['Not always: the same theme can be shown in different ways','Yes: the same theme means the same way of writing','You cannot compare two different books'],ans:0},task:'Sort the four extracts',
 show:()=>{steps[1].go();play(500)},
 go:()=>run(1,'Thoughts, or actions and words?',
  'Same theme, different method: Nell tells us her thoughts in first person, and River Street shows Mo through his actions and speech.')},
{h:'How they change',p:'Main characters change. Put each card where it belongs: start or end, Nell or Mo.',predict:{q:'Nell and Mo are both brave by the end. Do the two books say the same thing about courage?',opts:['No: Nell faces fear alone, but Mo learns that asking for help is brave','Yes: brave is brave, so the message is the same','There is no message, only a plot'],ans:0},task:'Track both characters',
 show:()=>{steps[2].go();play(500)},
 go:()=>run(2,'Four boxes: Nell at the start and by the end, Mo at the start and by the end.',
  'Both grow braver, but in different ways. Nell learns to face her fear alone. Mo learns that asking for help is brave too.')},
{h:'What the setting does',p:'A setting can set the mood, or it can cause the problem. Sort each line.',task:'Sort the four setting lines',
 show:()=>{steps[3].go();play(500)},
 go:()=>run(3,'Mood, or problem?',
  'In both books the water does two jobs: it makes us feel the danger, and it creates the problem the hero must solve.')},
{h:'Join the comparison',p:'Good comparisons join the two books in one sentence. Choose the joining word for each gap.',predict:{q:'Which word joins two things that are DIFFERENT?',opts:['Whereas','Similarly','Also'],ans:0},task:'Join all four sentences',
 show:()=>{steps[4].go();play(500)},
 go:()=>run(4,'Similarly joins two things that are alike. Whereas joins two things that are different.',
  '"Similarly" links what is alike. "Whereas" links what is different. One sentence now talks about both books.')},
{h:'Challenge',p:'',go:()=>{load({z:[],cards:[]});ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which sentence compares the two books?',[['Nell tells her own story, whereas Mo\'s is told by a narrator.','ok'],['Nell lives on an island. Mo lives in a city.','list'],['The Storm Lamp is my favourite.','opin']]],
 ['Two books share the theme of friendship. What should you compare next?',[['How each author shows friendship','ok'],['Which cover is nicer','cover'],['Nothing: same theme means same book','same']]],
 ['Which word fits? "Both heroes are ten. ___, both live near water."',[['Similarly','ok'],['Whereas','where'],['However','how']]],
 ['"The fog crept in like a thief." What does this setting line mainly do?',[['Sets a creepy mood','ok'],['Causes the main problem','prob'],['Tells us the time','time']]],
 ['Where does "both main characters are ten" go in the Venn diagram?',[['In the middle','ok'],['Only on one side','side'],['Outside the circles','out']]],
 ['"I couldn\'t breathe. Was that a footstep?" How is the feeling shown?',[['Through the narrator\'s own thoughts','ok'],['Through what other people say','talk'],['Through the setting','set']]]];
function why(t){let m='Look at both books together.';
 if(t==='list')m='That is two facts side by side. A comparison joins them, with a word like "whereas".';
 if(t==='opin')m='That is an opinion about one book. A comparison talks about both.';
 if(t==='cover')m='Covers do not tell you about the writing. Compare how the theme is shown.';
 if(t==='same')m='Many books share a theme. Each author shows it in a different way.';
 if(t==='where')m='"Whereas" is for differences. Being ten is the same, so use "similarly".';
 if(t==='how')m='"However" signals a contrast. These two facts are alike.';
 if(t==='prob')m='The fog does not stop anyone yet. "Like a thief" is there to make us uneasy.';
 if(t==='time')m='Nothing in the line says when. The simile builds a mood.';
 if(t==='side')m='One side is for one book only. Both are ten, so it is shared.';
 if(t==='out')m='Outside is for neither book. This is true of both, so it goes in the middle.';
 if(t==='talk')m='No one else is speaking. "I couldn\'t breathe" is the narrator thinking.';
 if(t==='set')m='The line does not describe a place. It is inside the narrator\'s head.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(good?'Yes! In a row: '+streak+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.35,draw,onStep:A=>{quiz.hidden=A.step!==5;pads.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pads=E('div',{class:'fl-ctl',role:'group','aria-label':'Where does this card go?'},w);quiz=E('div',{class:'fl-chal'},A.below);load(SCN[0]);
  A.gest({down,move,up});if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>requestAnimationFrame(()=>A.redraw())).observe(A.stage);buttons()}});
A.start()})})();
