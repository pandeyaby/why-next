/* Flagship – book features and author's reasons (ages 5–8, with a grown-up): drag labels onto the front cover, spine,
   back cover and blurb; tap the title, author and illustrator on a title page; tap the sentences that are reasons for
   "Bees are helpful" (not just true facts); sort reasons under the point they back up; then build point + because +
   reason sentences. */
(()=>{const lo=Math.min,hi=Math.max;
 const TAG=[['Front cover','f','The front cover has the title and a big picture. It is what you see first.'],['Spine','s','The spine is the narrow edge that holds the pages. On a shelf you see the spine.'],
  ['Back cover','b','The back cover is behind the last page. Turn the book over to find it.'],['Blurb','u','The blurb is the short bit on the back that tells you what the book is about.']];
 const ROLE=[['title','Busy Bees','the title, the name of the book'],['author','by Ana Reed','the author, who wrote the words'],['illus','pictures by Tom Lee','the illustrator, who drew the pictures']],ASK=[0,2,1];
 const BEE=[['Bees carry pollen, so plants can make fruit.',1,''],['Bees have six legs.',0,'True, but having six legs does not show bees help us. A reason must back up the point.'],
  ['Bees make honey that we can eat.',1,''],['My aunt likes the colour yellow.',0,'That is not about bees at all. It cannot back up the point.'],['Bees help flowers make seeds.',1,''],
  ['I think bees look fuzzy.',0,'That is what someone thinks bees look like. It does not show bees are helpful.']];
 const PT=[['🦮','Dogs are good helpers'],['🥣','Dogs need lots of care']];
 const WHY=[['Dogs can guide people who cannot see.',0],['Dogs need a walk every day.',1],['Dogs can sniff out lost people.',0],['Dogs need fresh water.',1],['Dogs help farmers move sheep.',0],['Dogs must go to the vet.',1]];
 const BEC=[['Frogs need water','their skin must stay wet.',[['their skin must stay wet.','ok'],['frogs are green.','fact'],['I like frogs.','opin']]],
  ['Trees are important','they give us clean air.',[['some trees are tall.','fact'],['they give us clean air.','ok'],['trees are my best thing.','opin']]],
  ['We should brush our teeth','it stops holes in our teeth.',[['I have a red brush.','opin'],['teeth are white.','fact'],['it stops holes in our teeth.','ok']]]];
VIS.reg('flagbook',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const G={ti:0,on:{},bad:null,drag:null,ai:0,hit:[],tap:[],pi:0,box:[[],[]],bi:0,bok:0,gen:0,want:()=>{}};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const at=()=>['parts','page','why','sort','because','quiz'][A.step];
 const sz=z=>A.narrow?z:z+3;
 const pen=(x,t,X,Y,z,k,w,al)=>{x.font=`${w||800} ${sz(z)}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-12)};
 const para=(x,t,X,Y,w,z,k)=>{x.font=`800 ${sz(z)}px system-ui,sans-serif`;const L=[];let r='';t.split(' ').forEach(v=>{const q=r?r+' '+v:v;if(r&&x.measureText(q).width>w-12){L.push(r);r=v}else r=q});L.push(r);
  const g=sz(z)*1.18;L.forEach((l,i)=>pen(x,l,X,Y+(i-(L.length-1)/2)*g,z,k))};
 const pane=(x,R,k,on,a)=>{x.fillStyle=A.alpha(k,a||.13);A.paint.rrect(R.x,R.y,R.w,R.h,12);x.fill();x.strokeStyle=k;x.lineWidth=on?5:2;x.stroke()};
 const inside=(p,R)=>R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h,miss=t=>{A.sound.miss();say(t);A.redraw()};
 // ---- step 1: label the parts ----
 const zone=k=>{const W=A.W,H=A.H,bw=W*.36,bh=H*.5,y=H*.06,sw=W*.1;
  if(k==='f')return{x:W*.04,y,w:bw,h:bh};if(k==='s')return{x:W*.45,y,w:sw,h:bh};const b={x:W*.6,y,w:bw,h:bh};if(k==='b')return b;return{x:b.x+b.w*.1,y:b.y+b.h*.2,w:b.w*.8,h:b.h*.4}};
 const tagR=()=>{const w=lo(A.W*.6,280),h=A.H*.14;return{x:(A.W-w)/2,y:A.H*.76,w,h}};
 function partsV(x){const C=A.col,f=zone('f'),s=zone('s'),b=zone('b'),u=zone('u');
  pane(x,f,C.cy,G.bad==='f',.3);pen(x,'Busy Bees',f.x+f.w/2,f.y+f.h*.18,15,C.tx);pen(x,'🐝',f.x+f.w/2,f.y+f.h*.55,40,C.tx,400);
  pane(x,s,C.am,G.bad==='s',.35);x.save();x.translate(s.x+s.w/2,s.y+s.h/2);x.rotate(Math.PI/2);pen(x,'Busy Bees',0,0,11,C.tx);x.restore();
  pane(x,b,C.vi,G.bad==='b',.22);pane(x,u,C.vi,G.bad==='u',.18);para(x,'Buzz into a bee hive and see how bees help us!',u.x+u.w/2,u.y+u.h/2,u.w,10,C.tx);
  x.fillStyle=C.tx;for(let i=0;i<9;i++)x.fillRect(b.x+b.w*.3+i*b.w*.05,b.y+b.h*.72,i%3?2:4,b.h*.14);
  TAG.forEach(t=>{const k=t[1],z=G.on[k];if(!z)return;const R=zone(k);pen(x,'✓ '+t[0],R.x+R.w/2,k==='u'?R.y-10:R.y+R.h+14,k==='s'?9:12,C.gr)});
  if(G.ti>=TAG.length)return pen(x,'All four parts found!',A.W/2,A.H*.84,16,C.gr);
  const R=tagR(),P=G.drag?{x:G.drag.x-R.w/2,y:G.drag.y-R.h/2,w:R.w,h:R.h}:R;pane(x,P,C.gr,1,.24);pen(x,TAG[G.ti][0],P.x+P.w/2,P.y+P.h/2,16,C.tx);
  if(!G.drag)pen(x,'Drag this label onto the book ↑',A.W/2,A.H*.71,11,C.tx,600)}
 function label(k){if(G.ti>=TAG.length)return;const t=TAG[G.ti];G.drag=null;
  if(k!==t[1]&&!(t[1]==='b'&&k==='u')){G.bad=k;return miss(`Not there. ${t[2]}`)}G.bad=null;G.on[t[1]]=1;G.ti++;A.sound.pop();tell(t[2])}
 const zoneAt=p=>['u','f','s','b'].find(k=>inside(p,zone(k)));
 // ---- step 2: title page ----
 const roleR=i=>{const W=A.W,H=A.H;return[{x:W*.12,y:H*.1,w:W*.76,h:H*.2},{x:W*.2,y:H*.38,w:W*.6,h:H*.13},{x:W*.16,y:H*.58,w:W*.68,h:H*.13}][i]};
 function pageV(x){const C=A.col,P={x:A.W*.08,y:A.H*.03,w:A.W*.84,h:A.H*.9};pane(x,P,C.mu,0,.06);
  ROLE.forEach((r,i)=>{const R=roleR(i),ok=G.hit.includes(i);pane(x,R,ok?C.gr:G.bad===i?C.rd:C.cy,ok||G.bad===i,ok?.2:.08);pen(x,r[1],R.x+R.w/2,R.y+R.h/2,i?13:22,C.tx);if(ok)pen(x,'✓ '+r[0].replace('illus','illustrator'),R.x+R.w/2,R.y+R.h+11,10,C.gr)});
  pen(x,'Hive Books, London',A.W/2,A.H*.86,10,C.tx,600);
  if(G.ai<3)pen(x,`Tap ${ROLE[ASK[G.ai]][2].split(',')[0]}`,A.W/2,A.H*.79,13,C.tx);else pen(x,'Title, author, illustrator!',A.W/2,A.H*.79,14,C.gr)}
 function tapRole(i){if(G.ai>=3||G.hit.includes(i))return;const want=ASK[G.ai];
  if(i!==want){G.bad=i;return miss(`That is ${ROLE[i][2]}. Look for ${ROLE[want][2].split(',')[0]}.`)}G.bad=null;G.hit.push(i);G.ai++;A.sound.pop();tell(`Yes, "${ROLE[i][1]}" is ${ROLE[i][2]}.`)}
 // ---- step 3: reasons that back up the point ----
 const lnR=i=>({x:8,y:A.H*(.19+i*.135),w:A.W-16,h:A.H*.12});
 function whyV(x){const C=A.col;pane(x,{x:8,y:A.H*.02,w:A.W-16,h:A.H*.14},C.am,1,.2);pen(x,'Point: Bees are helpful.',A.W/2,A.H*.09,16,C.tx);
  BEE.forEach((b,i)=>{const R=lnR(i),ok=G.tap.includes(i);pane(x,R,ok?C.gr:G.bad===i?C.rd:C.cy,ok||G.bad===i,ok?.22:.08);para(x,(ok?'✓ ':'')+b[0],R.x+R.w/2,R.y+R.h/2,R.w,12,C.tx)})}
 function tapWhy(i){if(G.tap.includes(i)||G.tap.length>=3)return;const b=BEE[i];if(!b[1]){G.bad=i;return miss(b[2])}G.bad=null;G.tap.push(i);A.sound.pop();tell(`Yes! That shows bees help. Reasons found: ${G.tap.length} of 3.`)}
 // ---- step 4: which point does each reason back up? ----
 const ptR=i=>{const g=10,w=(A.W-3*g)/2;return{x:g+i*(w+g),y:A.H*.04,w,h:A.H*.58}};
 const rsR=()=>{const w=lo(A.W*.8,360),h=A.H*.16;return{x:(A.W-w)/2,y:A.H*.74,w,h}};
 function sortV(x){const C=A.col;PT.forEach((p,i)=>{const R=ptR(i);pane(x,R,i?C.vi:C.cy,G.bad===i);pen(x,p[0],R.x+R.w/2,R.y+A.H*.07,24,C.tx,400);para(x,p[1],R.x+R.w/2,R.y+A.H*.16,R.w,12,C.tx);
   G.box[i].forEach((k,j)=>para(x,WHY[k][0],R.x+R.w/2,R.y+A.H*(.27+j*.1),R.w,9,C.tx))});
  if(G.bi>=WHY.length)return pen(x,'Every reason backs up a point!',A.W/2,A.H*.8,15,C.gr);
  const R=rsR(),P=G.drag?{x:G.drag.x-R.w/2,y:G.drag.y-R.h/2,w:R.w,h:R.h}:R;pane(x,P,C.am,1,.22);para(x,WHY[G.bi][0],P.x+P.w/2,P.y+P.h/2,P.w,13,C.tx);
  if(!G.drag)pen(x,'Drag the reason to its point ↑',A.W/2,A.H*.69,11,C.tx,600)}
 function file(j){if(G.bi>=WHY.length)return;const w=WHY[G.bi];G.drag=null;
  if(j!==w[1]){G.bad=j;return miss(`Does "${w[0].replace('.','')}" show that ${PT[j][1].toLowerCase()}? Try the other point.`)}G.bad=null;G.box[j].push(G.bi);G.bi++;A.sound.pop();tell(`Yes, it backs up "${PT[j][1]}".`)}
 // ---- step 5: point + because + reason ----
 const opR=i=>({x:10,y:A.H*(.5+i*.155),w:A.W-20,h:A.H*.13});
 function becauseV(x){const C=A.col;if(G.bok>=3)return pen(x,'Point, because, reason!',A.W/2,A.H*.45,17,C.gr);const s=BEC[G.pi],R={x:10,y:A.H*.04,w:A.W-20,h:A.H*.36};
  pane(x,R,C.am,0,.16);para(x,s[0],A.W/2,R.y+R.h*.25,R.w,15,C.tx);pen(x,'because …',A.W/2,R.y+R.h*.55,14,C.tx,700);pen(x,'Which reason backs it up?',A.W/2,R.y+R.h*.82,11,C.tx,600);
  s[2].forEach((o,i)=>{const Q=opR(i);pane(x,Q,G.bad===i?C.rd:C.cy,G.bad===i);para(x,o[0],Q.x+Q.w/2,Q.y+Q.h/2,Q.w,13,C.tx)})}
 function join(i){if(G.bok>=3)return;const s=BEC[G.pi],o=s[2][i];
  if(o[1]==='fact'){G.bad=i;return miss(`True, but it does not show why "${s[0].toLowerCase()}". A reason must back up the point.`)}
  if(o[1]==='opin'){G.bad=i;return miss('That is what someone likes. It does not explain the point.')}
  G.bad=null;G.bok++;G.pi=lo(2,G.bok);A.sound.pop();tell(`${s[0]} because ${s[1]}`)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=at();x.fillStyle=A.mix(C.pn,'#fffbeb',C.dark?.05:.45);x.fillRect(0,0,W,H);
  const f={parts:partsV,page:pageV,why:whyV,sort:sortV,because:becauseV}[v];if(f)f(x);else pen(x,G.Q||'📖',W/2,H/2,60,C.tx,400);A.fx.draw(x)}
 function tell(msg){const v=at();let t;
  if(v==='parts')t=G.ti>=TAG.length?'All parts labelled.':`Label: ${TAG[G.ti][0]}. Where does it go?`;
  else if(v==='page')t=G.ai>=3?'Title, author and illustrator found.':`Title page. Find ${ROLE[ASK[G.ai]][2].split(',')[0]}.`;
  else if(v==='why')t=`Point: Bees are helpful. Reasons found: ${G.tap.length} of 3.`;
  else if(v==='sort')t=G.bi>=WHY.length?'All reasons sorted.':`Reason: ${WHY[G.bi][0]} Which point?`;
  else if(v==='because')t=G.bok>=3?'Three sentences built.':`${BEC[G.pi][0]} because … pick a reason.`;else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();G.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=at();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='parts'&&G.ti<TAG.length)[['f','📕 Front'],['s','📏 Spine'],['b','🔙 Back'],['u','📝 Words on the back']].forEach(([k,n])=>B(n,()=>label(k),`Put "${TAG[G.ti][0]}" on: ${n.slice(2)}`));
  if(v==='page'&&G.ai<3)ROLE.forEach((r,i)=>{if(!G.hit.includes(i))B(r[1],()=>tapRole(i))});
  if(v==='why'&&G.tap.length<3)BEE.forEach((b,i)=>{if(!G.tap.includes(i))B(b[0],()=>tapWhy(i))});
  if(v==='sort'&&G.bi<WHY.length)PT.forEach((p,j)=>B(p[0]+' '+p[1],()=>file(j),`Put under: ${p[1]}`));
  if(v==='because'&&G.bok<3)BEC[G.pi][2].forEach((o,i)=>B('because '+o[0],()=>join(i)));A.redraw()}
 const ok=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const seq=(fs,gap)=>{const g=G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},j*gap))};
 const fresh=()=>{G.gen++;G.want=()=>{};G.drag=null;G.bad=null};
 const steps=[
  {h:'Parts of a book',p:'Every book has a front cover, a spine and a back cover. Drag each label to its part.',
   predict:{q:'Where is the blurb that tells you what the book is about?',opts:['On the front cover','On the back cover'],ans:1},task:'Put all four labels on the book',
   show:()=>{steps[0].go();seq(['f','s','b','u'].map(k=>()=>label(k)),450)},go:()=>{fresh();G.ti=0;G.on={};tell();G.want=ok(0,()=>G.ti>=TAG.length,()=>'Front cover first, spine on the shelf, blurb on the back.')}},
  {h:'The title page',p:'Open the book. The title page shows the title, the author and the illustrator.',
   predict:{q:'Who draws the pictures?',opts:['The author','The illustrator'],ans:1},task:'Tap the title, the illustrator and the author',
   show:()=>{steps[1].go();seq(ASK.map(i=>()=>tapRole(i)),450)},go:()=>{fresh();G.ai=0;G.hit=[];tell();G.want=ok(1,()=>G.ai>=3,()=>'The author writes the words. The illustrator draws the pictures.')}},
  {h:'Find the reasons',p:'An author makes a point, then gives reasons to back it up. Tap the 3 reasons that show bees are helpful.',
   predict:{q:'Is "Bees have six legs" a reason bees are helpful?',opts:['Yes, it is true','No, it does not show they help'],ans:1},task:'Tap the 3 reasons',
   show:()=>{steps[2].go();seq([0,2,4].map(i=>()=>tapWhy(i)),450)},go:()=>{fresh();G.tap=[];tell();G.want=ok(2,()=>G.tap.length>=3,()=>'A true fact is not always a reason. A reason shows the point is right.')}},
  {h:'Which point?',p:'This page about dogs makes two points. Drag each reason to the point it backs up.',task:'Sort all six reasons',
   show:()=>{steps[3].go();seq(WHY.map(w=>()=>file(w[1])),380)},go:()=>{fresh();G.bi=0;G.box=[[],[]];tell();G.want=ok(3,()=>G.bi>=WHY.length,()=>'Each reason fits one point. Ask: does this show the point is right?')}},
  {h:'Point because reason',p:'Join a point and a reason with "because". Pick the reason that backs up the point.',
   predict:{q:'"Frogs need water because frogs are green." Does that work?',opts:['Yes, it is true','No, green is not why they need water'],ans:1},task:'Build all three sentences',
   show:()=>{steps[4].go();seq(BEC.map(s=>()=>join(s[2].findIndex(o=>o[1]==='ok'))),450)},go:()=>{fresh();G.pi=0;G.bok=0;tell();G.want=ok(4,()=>G.bok>=3,()=>'Because joins the point to the reason that backs it up.')}},
  {h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.want()});
 const QZ=[['Where do you find the title and a big picture?','📕',[['The front cover','ok'],['The back cover','back'],['The spine','spine']]],
  ['Who wrote the words of the book?','✍️',[['The author','ok'],['The illustrator','illus'],['The reader','reader']]],
  ['What does the blurb tell you?','📝',[['What the book is about','ok'],['Who drew the pictures','who'],['The page numbers','pages']]],
  ['Point: Cats make good pets. Which is a reason?','🐱',[['Cats are easy to look after','ok'],['Cats have whiskers','fact'],['I saw a cat today','off']]],
  ['Point: Exercise is good for you. Which is a reason?','🏃',[['It makes your heart strong','ok'],['I wear red shoes','off'],['Running is a word','fact']]],
  ['Where do you find the author and illustrator together?','📖',[['The title page','ok'],['The spine only','spine'],['The last page','last']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;G.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'back':m='The back cover has the blurb. The title and big picture are on the front.';break;
   case 'spine':m='The spine is the narrow edge. It shows the title small, so you can find the book on a shelf.';break;
   case 'illus':m='The illustrator draws the pictures. The author writes the words.';break;
   case 'reader':m='The reader reads the book. The author wrote it.';break;
   case 'who':m='The title page tells you who drew the pictures. The blurb says what the book is about.';break;
   case 'pages':m='Page numbers are on each page. The blurb tells you what the book is about.';break;
   case 'fact':m='That is true, but it does not show the point is right. A reason must back up the point.';break;
   case 'off':m='That is not about the point at all. Look for a sentence that shows why.';break;
   default:m='The last page is the end of the story. The title page is near the front.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=at();G.drag=null;
  if(v==='parts'&&G.ti<TAG.length){if(inside(p,tagR())){G.drag={x:p.x,y:p.y};return true}const k=zoneAt(p);if(k)label(k);return false}
  if(v==='page'){const i=[0,1,2].find(i=>inside(p,roleR(i)));if(i!=null)tapRole(i);return false}
  if(v==='why'){const i=BEE.findIndex((_,i)=>inside(p,lnR(i)));if(i>=0)tapWhy(i);return false}
  if(v==='sort'&&G.bi<WHY.length){if(inside(p,rsR())){G.drag={x:p.x,y:p.y};return true}const j=[0,1].find(j=>inside(p,ptR(j)));if(j!=null)file(j);return false}
  if(v==='because'){const i=[0,1,2].find(i=>inside(p,opR(i)));if(i!=null)join(i)}return false}
 function move(p){if(!G.drag)return;G.drag.x=p.x;G.drag.y=p.y;A.redraw()}
 function up(p){const v=at();if(!G.drag)return;
  if(v==='parts'){const k=zoneAt(p);if(k)label(k);else{G.drag=null;A.redraw()}}
  if(v==='sort'){const j=[0,1].find(j=>inside(p,ptR(j)));if(j!=null)file(j);else{G.drag=null;A.redraw()}}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
