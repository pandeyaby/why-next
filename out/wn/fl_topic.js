/* Flagship – main topic of informational texts (ages 5–7, with a grown-up): tap a word to see which sentences tell
   about it and find what the whole page is about, sort facts into the book they belong in, pick the best one-sentence
   summary, choose the key facts to retell, and link pairs of facts with "so". */
(()=>{const lo=Math.min;
 const PAGES=[{s:['Owls hunt at night.','Owls have big eyes to see in the dark.','Owls eat mice and bugs.'],c:[['owls',[0,1,2]],['night',[0]],['mice',[2]]],t:0},
  {s:['Bees live in a hive.','Bees drink nectar from flowers.','Bees buzz from flower to flower.'],c:[['flowers',[1,2]],['bees',[0,1,2]],['hive',[0]]],t:1},
  {s:['Frogs start as eggs in a pond.','Then they hatch into tadpoles.','They grow legs and hop out.'],c:[['tadpoles',[1]],['pond',[0]],['frogs',[0,1,2]]],t:2,they:1}];
 const FACT=[['Sharks have rows of sharp teeth.',0],['Dolphins come up to the top of the sea to breathe.',1],['Some sharks are as small as your hand.',0],['Cats like to nap in the sun.',1],['Sharks can smell food from far away.',0]];
 const WHYNOT={1:'Dolphins live in the sea too, but this fact is about dolphins, not sharks.',3:'This fact is about cats. It does not tell us about sharks.'};
 const SUM=[{s:['Penguins have thick feathers.','They huddle close in big groups.','A layer of fat keeps them warm.'],o:[['This page is about how penguins keep warm.','ok'],['Penguins have feathers.','one'],['This page is about the cold sea.','wide']]},
  {s:['A seed needs water to start to grow.','A root goes down into the soil.','A shoot grows up to the light.'],o:[['Seeds are small.','off'],['This page is about how a seed grows into a plant.','ok'],['A root goes down.','one']]}];
 const SUMWHY={one:'That is only one detail. A summary tells what the whole page is about.',wide:'The page is not about the sea. Every sentence tells about penguins keeping warm.',off:'The page does not say that. A summary uses what the page tells you.'};
 const KEY=[['Plants need water to grow.',1],['I like sunflowers best.',0,'That is what someone likes. It does not tell how plants grow.'],['Plants need light from the sun.',1],['My gran has a big garden.',0,'That is about Gran. It is not a fact about how plants grow.'],['Roots take in water from the soil.',1]];
 const LINK=[['It rained all day.','The river got high.'],['The caterpillar ate lots of leaves.','It grew big and fat.'],['The sun came out.','The snow melted.']],RIGHT=[2,0,1];
VIS.reg('flagtopic',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={pg:0,hl:-1,pok:0,fi:0,fok:0,si:0,sok:0,keys:[],bad:-1,sel:-1,links:[],wrong:-1,drag:null,at:null,gen:0,want:()=>{},Q:null};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['topic','belong','sum','key','link','quiz'][A.step];
 const px=n=>A.narrow?n:n+2;
 const font=(n,w)=>`${w||700} ${px(n)}px system-ui,sans-serif`;
 function wrap(x,t,w,n,wt){x.font=font(n,wt);const out=[];let line='';t.split(' ').forEach(word=>{const tr=line?line+' '+word:word;if(x.measureText(tr).width>w&&line){out.push(line);line=word}else line=tr});out.push(line);return out}
 function para(x,t,X,Y,w,n,k,al,wt){const L=wrap(x,t,w,n,wt),lh=px(n)*1.3;x.fillStyle=k;x.textAlign=al||'left';x.textBaseline='middle';L.forEach((l,i)=>x.fillText(l,al==='center'?X+w/2:X,Y+i*lh+lh/2));return L.length*lh}
 const tag=(x,t,X,Y,n,k)=>{x.font=font(n,800);x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 const panel=(x,R,k,on,a)=>{x.fillStyle=A.alpha(k,a||.12);A.paint.rrect(R.x,R.y,R.w,R.h,14);x.fill();x.strokeStyle=k;x.lineWidth=on?4:2;x.stroke()};
 const hit=(p,R)=>p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h,boo=t=>{A.sound.miss();say(t);A.redraw()};
 const row=(i,n,h)=>{const g=8,w=(A.W-(n+1)*g)/n;h=h||lo(70,A.H*.16);return{x:g+i*(w+g),y:A.H-h-10,w,h}};
 function page(x,sents,top,hl,good){const C=A.col,w=A.W-48;let y=top+10;const out=[];sents.forEach((s,i)=>{const L=wrap(x,s,w,15,600).length*px(15)*1.3;
   if(hl&&hl.includes(i)){x.fillStyle=A.alpha(good?C.gr:C.am,.25);A.paint.rrect(20,y-3,A.W-40,L+6,8);x.fill()}para(x,s,24,y,w,15,C.tx,'left',600);out.push({y,h:L});y+=L+10});return y}
 function topicV(x){const C=A.col;if(S.pok>=3)return tag(x,'Three pages, three main topics!',A.W/2,A.H*.4,16,C.gr);const P=PAGES[S.pg];
  tag(x,`Page ${S.pg+1} of 3: what is it all about?`,A.W/2,22,13,C.mu);const end=page(x,P.s,36,S.hl>=0?P.c[S.hl][1]:null,S.hl===P.t);
  if(S.hl>=0){const n=P.c[S.hl][1].length;tag(x,n===3?`“${P.c[S.hl][0]}” is in every sentence${P.they?' (they = frogs)':''}`:`“${P.c[S.hl][0]}” is in ${n} of 3 sentences`,A.W/2,end+12,13,n===3?C.gr:C.tx)}
  P.c.forEach((cand,i)=>{const R=row(i,3);panel(x,R,S.wrong===i?C.rd:C.cy,S.hl===i);tag(x,cand[0],R.x+R.w/2,R.y+R.h/2,17,C.tx)})}
 const bin=i=>row(i,2,lo(90,A.H*.2));
 function belongV(x){const C=A.col;['📘 In the shark book','Not about sharks'].forEach((l,i)=>{const R=bin(i);panel(x,R,i?C.rd:C.gr,S.wrong===i,.1);tag(x,l,R.x+R.w/2,R.y+18,12,C.tx);
   const n=FACT.slice(0,S.fi).filter(f=>f[1]===i).length;tag(x,'●'.repeat(n),R.x+R.w/2,R.y+R.h*.65,16,i?C.rd:C.gr)});
  if(S.fi>=5)return tag(x,'Only shark facts go in the shark book.',A.W/2,A.H*.3,15,C.gr);
  const P=S.drag!=null&&S.at?S.at:{x:A.W/2,y:A.H*.3},w=lo(A.W-40,420),h=lo(110,A.H*.26),R={x:P.x-w/2,y:P.y-h/2,w,h};panel(x,R,C.vi,1,.16);
  para(x,FACT[S.fi][0],R.x+14,R.y+h/2-px(16)*1.3*wrap(x,FACT[S.fi][0],w-28,16,700).length/2,w-28,16,C.tx,'center');tag(x,'Book topic: sharks 🦈',A.W/2,18,13,C.mu)}
 const optR=i=>{const h=lo(64,A.H*.13);return{x:12,y:A.H-(3-i)*(h+8)-6,w:A.W-24,h}};
 function sumV(x){const C=A.col;if(S.sok>=2)return tag(x,'One sentence can tell what a whole page is about.',A.W/2,A.H*.4,14,C.gr);const P=SUM[S.si];
  tag(x,'Which sentence sums up the page?',A.W/2,18,13,C.mu);page(x,P.s,30);
  P.o.forEach((o,i)=>{const R=optR(i);panel(x,R,S.wrong===i?C.rd:C.cy,S.wrong===i);para(x,o[0],R.x+10,R.y+R.h/2-px(13)*1.3*wrap(x,o[0],R.w-20,13,700).length/2,R.w-20,13,C.tx,'center')})}
 const keyR=i=>{const g=6,h=(A.H-44-5*g)/5;return{x:10,y:38+i*(h+g),w:A.W-20,h}};
 function keyV(x){const C=A.col;tag(x,`Page: How plants grow. Retell bag: ${S.keys.length} of 3`,A.W/2,18,13,S.keys.length>=3?C.gr:C.mu);
  KEY.forEach((k,i)=>{const R=keyR(i),on=S.keys.includes(i);panel(x,R,on?C.gr:S.bad===i?C.rd:C.mu,on||S.bad===i,on?.2:.08);
   para(x,(on?'✓ ':'')+k[0],R.x+10,R.y+R.h/2-px(14)*1.3*wrap(x,k[0],R.w-20,14,600).length/2,R.w-20,14,C.tx,'center',600)})}
 const lR=i=>{const g=10,h=(A.H-40-3*g)/3,w=A.W*.42;return{x:8,y:30+i*(h+g),w,h}},rR=i=>{const r=lR(i);return{...r,x:A.W-8-r.w}};
 function linkV(x){const C=A.col;tag(x,'First this happened…   …so this happened',A.W/2,15,12,C.mu);
  S.links.forEach(i=>{const a=lR(i),b=rR(RIGHT.indexOf(i));x.strokeStyle=C.gr;x.lineWidth=4;x.beginPath();x.moveTo(a.x+a.w,a.y+a.h/2);x.lineTo(b.x,b.y+b.h/2);x.stroke();tag(x,'so',A.W/2,(a.y+a.h/2+b.y+b.h/2)/2-10,13,C.gr)});
  if(S.sel>=0&&S.drag!=null&&S.at){const a=lR(S.sel);x.strokeStyle=C.vi;x.lineWidth=3;x.setLineDash([6,5]);x.beginPath();x.moveTo(a.x+a.w,a.y+a.h/2);x.lineTo(S.at.x,S.at.y);x.stroke();x.setLineDash([])}
  LINK.forEach((l,i)=>{const R=lR(i),on=S.links.includes(i);panel(x,R,on?C.gr:S.sel===i?C.vi:C.cy,S.sel===i);para(x,l[0],R.x+8,R.y+R.h/2-px(12)*1.3*wrap(x,l[0],R.w-16,12,600).length/2,R.w-16,12,C.tx,'center',600)});
  RIGHT.forEach((j,i)=>{const R=rR(i),on=S.links.includes(j);panel(x,R,on?C.gr:S.wrong===j?C.rd:C.am,S.wrong===j);para(x,LINK[j][1],R.x+8,R.y+R.h/2-px(12)*1.3*wrap(x,LINK[j][1],R.w-16,12,600).length/2,R.w-16,12,C.tx,'center',600)})}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.04:.35);x.fillRect(0,0,W,H);
  const f={topic:topicV,belong:belongV,sum:sumV,key:keyV,link:linkV}[v];if(f)f(x);else tag(x,S.Q||'📖',W/2,H/2,56,C.tx);A.fx.draw(x)}
 function pickT(i){if(S.pok>=3)return;const P=PAGES[S.pg],cand=P.c[i];S.hl=i;
  if(i!==P.t){S.wrong=i;return boo(`“${cand[0]}” is only in ${cand[1].length} of 3 sentences. It is a detail. Which word does every sentence tell about?`)}
  S.wrong=-1;S.pok++;A.sound.pop();const was=S.pg;tell(`Yes! Every sentence tells about ${cand[0]}${P.they?' (they means frogs)':''}. The main topic is ${cand[0]}.`);
  const g=S.gen;setTimeout(()=>{if(g===S.gen&&S.pok<3&&S.pg===was){S.pg=S.pok;S.hl=-1;tell()}},A.reduced()?10:900)}
 function sort(b){if(S.fi>=5)return;const f=FACT[S.fi];if(f[1]!==b){S.wrong=b;return boo(b?'This fact tells about sharks, so it belongs in the shark book.':WHYNOT[S.fi])}
  S.wrong=-1;S.fi++;S.fok++;A.sound.pop();tell(b?'Right, that fact is not about sharks.':'Yes, that fact is about sharks.')}
 function sum(i){if(S.sok>=2)return;const o=SUM[S.si].o[i];if(o[1]!=='ok'){S.wrong=i;return boo(SUMWHY[o[1]])}
  S.wrong=-1;S.sok++;S.si=lo(1,S.sok);A.sound.pop();tell('Yes! That sentence tells what the whole page is about.')}
 function key(i){if(S.keys.length>=3||S.keys.includes(i))return;const k=KEY[i];if(!k[1]){S.bad=i;return boo(k[2])}
  S.bad=-1;S.keys.push(i);A.sound.pop();tell(S.keys.length>=3?'Three key facts: water, light and roots. Now you can retell the page.':'Yes, that is a key fact about how plants grow.')}
 function first(i){if(S.links.includes(i))return;S.sel=i;A.sound.tick();tell(`Picked: ${LINK[i][0]} Now pick what happened because of it.`)}
 function second(j){if(S.sel<0)return boo('First pick a box on the left: what happened first.');if(S.links.includes(j))return;
  if(j!==S.sel){S.wrong=j;return boo(`“${LINK[S.sel][0]}” did not make “${LINK[j][1]}” happen. Which one did it cause?`)}
  S.wrong=-1;S.links.push(j);S.sel=-1;A.sound.pop();tell(`${LINK[j][0]} So ${LINK[j][1][0].toLowerCase()+LINK[j][1].slice(1)}`)}
 function tell(msg){const v=view();let t;
  if(v==='topic')t=S.pok>=3?'All three pages done.':`Page ${S.pg+1}: ${PAGES[S.pg].s.join(' ')} Words: ${PAGES[S.pg].c.map(c=>c[0]).join(', ')}.`;
  else if(v==='belong')t=S.fi>=5?'All five facts sorted.':`Fact: ${FACT[S.fi][0]} Shark book, or not about sharks?`;
  else if(v==='sum')t=S.sok>=2?'Both pages summed up.':`Page: ${SUM[S.si].s.join(' ')}`;
  else if(v==='key')t=`Key facts picked: ${S.keys.length} of 3.`;
  else if(v==='link')t=`Linked: ${S.links.length} of 3.`;else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();S.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='topic'&&S.pok<3)PAGES[S.pg].c.forEach((cd,i)=>B(cd[0],()=>pickT(i),`Main topic: ${cd[0]}`));
  if(v==='belong'&&S.fi<5){B('📘 Shark book',()=>sort(0));B('Not about sharks',()=>sort(1))}
  if(v==='sum'&&S.sok<2)SUM[S.si].o.forEach((o,i)=>B(String.fromCharCode(65+i),()=>sum(i),o[0]));
  if(v==='key'&&S.keys.length<3)KEY.forEach((k,i)=>{if(!S.keys.includes(i))B(`Fact ${i+1}`,()=>key(i),`Key fact: ${k[0]}`)});
  if(v==='link'&&S.links.length<3){LINK.forEach((l,i)=>{if(!S.links.includes(i))B('First: '+l[0],()=>first(i))});RIGHT.forEach(j=>{if(!S.links.includes(j))B('So: '+LINK[j][1],()=>second(j))})}A.redraw()}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},A.reduced()?j*20:j*gap))};
 const clear=()=>{S.gen++;S.want=()=>{};S.Q=null;S.drag=null;S.at=null;S.wrong=-1;S.bad=-1;S.sel=-1};
 const steps=[
  {h:'What is it all about?',p:'The main topic is what the whole page tells about. Tap a word to see which sentences tell about it.',
   predict:{q:'The owl page says owls eat mice. Is the page mostly about mice?',opts:['Yes, mice are in it','No, mice are just one detail'],ans:1},task:'Find the main topic of three pages',
   show:()=>{steps[0].go();seq([()=>pickT(0),()=>pickT(1),()=>pickT(2)],1100)},go:()=>{clear();S.pg=0;S.pok=0;S.hl=-1;tell();S.want=ok(0,()=>S.pok>=3,()=>'The main topic is what every sentence tells about.')}},
  {h:'Does it belong?',p:'This is a book about sharks. Drag each fact to the right box, or tap a box.',
   predict:{q:'Dolphins live in the sea. Does a dolphin fact belong in the shark book?',opts:['Yes, it is about the sea','No, it is not about sharks'],ans:1},task:'Sort all five facts',
   show:()=>{steps[1].go();seq(FACT.map(f=>()=>sort(f[1])),400)},go:()=>{clear();S.fi=0;S.fok=0;tell();S.want=ok(1,()=>S.fi>=5,()=>'A fact belongs when it tells about the topic, not just something near it.')}},
  {h:'Say it in one sentence',p:'Read the page. Pick the sentence that tells what the whole page is about.',task:'Sum up two pages',
   show:()=>{steps[2].go();seq([()=>sum(0),()=>sum(1)],600)},go:()=>{clear();S.si=0;S.sok=0;tell();S.want=ok(2,()=>S.sok>=2,()=>'A good summary covers the whole page, not one detail.')}},
  {h:'Key facts to retell',p:'Tap three facts that tell how plants grow. Leave out what someone likes.',
   predict:{q:'Is “I like sunflowers best” a key fact about how plants grow?',opts:['Yes, it is about a plant','No, it is what someone likes'],ans:1},task:'Pick three key facts',
   show:()=>{steps[3].go();seq([0,2,4].map(i=>()=>key(i)),450)},go:()=>{clear();S.keys=[];tell();S.want=ok(3,()=>S.keys.length>=3,()=>'Key facts teach about the topic. Likes and side stories are not key.')}},
  {h:'How are they linked?',p:'Some facts are linked: one thing made the next thing happen. Drag from a left box to a right box, or tap one, then the other.',task:'Link three pairs with “so”',
   show:()=>{steps[4].go();seq([0,1,2].flatMap(i=>[()=>first(i),()=>second(i)]),300)},go:()=>{clear();S.links=[];tell();S.want=ok(4,()=>S.links.length>=3,()=>'“So” links what happened first to what it made happen.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['A page says: Whales are huge. Whales sing. Whales eat tiny shrimp. What is it about?','🐋',[['Whales','ok'],['Shrimp','detail'],['Singing','detail']]],
  ['Which fact belongs in a book about trains?','🚂',[['Trains run on tracks.','ok'],['Planes fly in the sky.','near'],['I went to the shop.','me']]],
  ['Which sentence sums up a page about how bees make honey?','🍯',[['This page is about how bees make honey.','ok'],['Bees are yellow.','one'],['This page is about flowers.','wide']]],
  ['Is “I think the moon is pretty” a key fact about the moon?','🌙',[['No, it is what someone thinks','ok'],['Yes, it says moon','word'],['Yes, it is the main topic','detail']]],
  ['It snowed a lot. What could the “so” be?','❄️',[['So we built a snowman.','ok'],['So it was hot.','cause'],['So I like cake.','me']]],
  ['A page about dogs says: They wag their tails. Who is “they”?','🐶',[['The dogs','ok'],['The tails','they'],['Us','they']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;S.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const rw=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tg])=>{const b=c.el('button',{type:'button',class:'lbtn'},rw,o);b.onclick=()=>grade(tg)});say('Challenge: '+q);A.redraw()}
 function grade(tg){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tg){case 'ok':m='Yes!';break;
   case 'detail':m='That is one detail. The main topic is what every sentence tells about.';break;
   case 'near':m='Planes are travel too, but the book is about trains. Pick a train fact.';break;
   case 'me':m='That tells about someone, not about the topic.';break;
   case 'one':m='That is one detail. A summary covers the whole page.';break;
   case 'wide':m='Flowers are in it, but the page is about bees making honey.';break;
   case 'word':m='Having the word moon is not enough. It tells what someone thinks, not a fact.';break;
   case 'cause':m='Snow does not make it hot. Pick what snow could make happen.';break;
   default:m='“They” points back to the topic: the dogs wag their tails.'}
  const good=tg==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=view();S.drag=null;S.at=null;
  if(v==='topic'&&S.pok<3){const i=[0,1,2].find(i=>hit(p,row(i,3)));if(i!=null)pickT(i);return false}
  if(v==='belong'&&S.fi<5){const b=[0,1].find(b=>hit(p,bin(b)));if(b!=null){sort(b);return false}if(p.y<A.H*.55){S.drag=1;S.at=p;return true}return false}
  if(v==='sum'&&S.sok<2){const i=[0,1,2].find(i=>hit(p,optR(i)));if(i!=null)sum(i);return false}
  if(v==='key'){const i=[0,1,2,3,4].find(i=>hit(p,keyR(i)));if(i!=null)key(i);return false}
  if(v==='link'&&S.links.length<3){const i=[0,1,2].find(i=>hit(p,lR(i)));if(i!=null&&!S.links.includes(i)){first(i);S.drag=1;S.at=p;return true}
   const j=[0,1,2].find(j=>hit(p,rR(j)));if(j!=null)second(RIGHT[j])}return false}
 function up(p){const v=view(),d=S.drag;S.drag=null;S.at=null;if(d==null)return A.redraw();
  if(v==='belong'){const b=[0,1].find(b=>hit(p,bin(b)));if(b!=null)sort(b);else A.redraw()}
  else if(v==='link'){const j=[0,1,2].find(j=>hit(p,rR(j)));if(j!=null)second(RIGHT[j]);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{S.at=p;A.redraw()},up});refresh()}});
 A.start()})})();
