/* Flagship – pronouns for clarity (ages 7–9): tap repeated names to swap them for pronouns (but keep the first one),
   fill gaps and watch an arrow point back to the noun, pick a clear rewrite when "he" could mean two people, choose
   reflexive pronouns that loop back to the doer, and spot the muddled pronoun in a short passage. */
(()=>{const mn=Math.min,mx=Math.max;
 const SWAP=[['Sam','packed',["Sam's",'his'],'bag.','Then',['Sam','he'],'gave',["Sam's",'his'],'dog','a','hug.'],
  ['Lily','flew',["Lily's",'her'],'kite.','Then',['the kite','it'],'got','stuck.']];
 const GAP=[{s:['Mia','lost','_','hat.'],ant:[0,0],o:['her','his','their'],a:0,bad:['','His is for a boy or man. Mia is a girl, so use her.','Their is for more than one. Mia is one girl.']},
  {s:['The','dogs','wagged','_','tails.'],ant:[1,1],o:['its','their','his'],a:1,bad:['Its is for one thing. Dogs means more than one, so use their.','','His is for one boy. There are lots of dogs, so use their.']},
  {s:['The','box','fell,','and','_','broke.'],ant:[1,1],o:['he','they','it'],a:2,bad:['He is for a boy or man. A box is a thing, so use it.','They is for more than one. There is one box.','']},
  {s:['Raj','and','I','ate','_','lunch.'],ant:[0,2],o:['our','their','my'],a:0,bad:['','Their leaves you out. Raj and I includes you, so use our.','My is just you. Raj and I is two people, so use our.']}];
 const AMB=[{s:'Tom told Jack he was late.',who:['👦 Tom','🧒 Jack'],o:[['Tom told Jack, “I am late.”',''],['He told him he was late.','Now no one is named at all. That is even less clear.'],['Tom told Jack he was very late.','Very late does not say who he is.']]},
  {s:'Amy saw Zoe when she got home.',who:['👧 Amy','👩 Zoe'],o:[['She saw her when she got home.','With no names, the reader cannot tell who anyone is.'],['When Amy got home, she saw Zoe.',''],['Amy saw Zoe when she got home late.','Late does not fix it. She could still be Amy or Zoe.']]},
  {s:'Dad put the cup on the shelf, and it broke.',who:['☕ cup','🪵 shelf'],o:[['Dad put it on it, and it broke.','More its make it more muddled, not less.'],['Dad put the cup on the shelf, and it broke with a bang.','A bang does not tell us which thing broke.'],['Dad put the cup on the shelf, and the cup broke.','']]}];
 const REF=[{s:['I','made','the','cake','_.'],doer:0,o:['meself','myself','me'],a:1,bad:['Meself is not standard English. With I, use myself.','','Me is for someone doing something to you. You did it, so use myself.']},
  {s:['Ben','hurt','_','on','the','slide.'],doer:0,o:['himself','hisself','him'],a:0,bad:['','Hisself sounds right, but it is not standard. Say himself.','Him would mean Ben hurt another boy. Ben hurt his own self, so use himself.']},
  {s:['They','helped','_','to','cake.'],doer:0,o:['them','theirselves','themselves'],a:2,bad:['Them would mean other people. They took cake, so use themselves.','Theirselves is not standard English. Say themselves.','']}];
 const MUD=[{s:['Amy','and','Zoe','went','out.','She','fell','over.'],bad:5,why:'She could be Amy or Zoe.'},
  {s:['Dad','put','the','cup','on','the','table,','and','it','broke.'],bad:8,why:'It could be the cup or the table.'},
  {s:['Leo','met','Max','at','the','park,','and','he','waved.'],bad:7,why:'He could be Leo or Max.'}];
VIS.reg('flagpron',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const K={sr:0,sw:{},gi:0,gok:0,ai:0,aok:0,ri:0,rok:0,mi:0,mok:0,mtap:-1,miss:-1,gen:0,want:()=>{},Q:null};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const st=()=>['swap','gap','amb','ref','mud','quiz'][A.step];
 const px=n=>A.narrow?n:n+3,font=(n,w)=>`${w||700} ${px(n)}px system-ui,sans-serif`;
 const say2=(g,t,x,y,n,col,w)=>{g.font=font(n,w||800);g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)};
 const plate=(g,R,col,thick,a)=>{g.fillStyle=A.alpha(col,a||.13);A.paint.rrect(R.x,R.y,R.w,R.h,12);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()};
 const hit=(p,R)=>R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
 const miss=t=>{A.sound.miss();say(t);A.redraw()};
 function flow(words,top,n){const g=A.ctx;g.font=font(n,700);const pad=10,h=px(n)+18,gap=8,out=[];let x=14,y=top;
  words.forEach(w=>{const ww=g.measureText(w).width+pad*2;if(x+ww>A.W-14&&x>14){x=14;y+=h+gap}out.push({x,y,w:ww,h,t:w});x+=ww+gap});return out}
 function multi(g,t,R,n,col){g.font=font(n,700);const L=[];let cur='';t.split(' ').forEach(w=>{const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>R.w-20&&cur){L.push(cur);cur=w}else cur=tr});L.push(cur);
  const lh=px(n)*1.3;let y=R.y+R.h/2-L.length*lh/2+lh/2;g.fillStyle=col;g.textAlign='center';g.textBaseline='middle';L.forEach(l=>{g.fillText(l,R.x+R.w/2,y);y+=lh})}
 function arc(g,a,b,col,loop){const x1=a.x+a.w/2,x2=b.x+b.w/2,y1=a.y,y2=b.y,top=mn(y1,y2)-(loop?44:30);g.strokeStyle=col;g.lineWidth=3;g.beginPath();g.moveTo(x1,y1);
  g.bezierCurveTo(x1,top,x2,top,x2,y2);g.stroke();g.fillStyle=col;g.beginPath();g.moveTo(x2,y2);g.lineTo(x2-6,y2-10);g.lineTo(x2+6,y2-10);g.fill()}
 const swapToks=()=>SWAP[mn(K.sr,1)].map((t,i)=>Array.isArray(t)?(K.sw[i]?t[1]:t[0]):t);
 const swapLeft=()=>SWAP[mn(K.sr,1)].filter((t,i)=>Array.isArray(t)&&!K.sw[i]).length;
 const firstName=i=>i===0;
 function swapV(g){const C=A.col;if(K.sr>=2)return say2(g,'Name first, then a pronoun points back to it.',A.W/2,A.H*.4,14,C.gr);
  say2(g,`Tap the names said too many times (${K.sr+1} of 2)`,A.W/2,20,12,C.mu,700);const R=flow(swapToks(),50,17),row=SWAP[K.sr];
  R.forEach((r,i)=>{const tap=Array.isArray(row[i])||firstName(i),done=K.sw[i];if(tap)plate(g,r,done?C.gr:K.miss===i?C.rd:C.cy,done||K.miss===i,done?.2:.13);
   say2(g,r.t,r.x+r.w/2,r.y+r.h/2,17,C.tx,done?800:600)});
  R.forEach((r,i)=>{if(K.sw[i])arc(g,r,R[0],A.alpha(C.gr,.8))});say2(g,`Repeats left: ${swapLeft()}`,A.W/2,A.H*.86,14,swapLeft()?C.tx:C.gr)}
 function gapV(g){const C=A.col;if(K.gok>=4)return say2(g,'Each pronoun matches the noun it points back to.',A.W/2,A.H*.4,14,C.gr);const Q=GAP[K.gi];
  say2(g,`Fill the gap (${K.gi+1} of 4)`,A.W/2,20,12,C.mu,700);const R=flow(Q.s.map(w=>w==='_'?'  ?  ':w),A.H*.3,18),gi=Q.s.indexOf('_');
  R.forEach((r,i)=>{if(i===gi)plate(g,r,C.vi,1,.18);else if(i>=Q.ant[0]&&i<=Q.ant[1])plate(g,r,C.am,0,.18);say2(g,r.t,r.x+r.w/2,r.y+r.h/2,18,C.tx)});
  say2(g,'The yellow word is who or what the gap is about',A.W/2,A.H*.62,11,C.mu,600);
  Q.o.forEach((o,i)=>{const B=optR(i,3);plate(g,B,K.miss===i?C.rd:C.cy,K.miss===i);say2(g,o,B.x+B.w/2,B.y+B.h/2,17,C.tx)})}
 const optR=(i,n)=>{const gp=8,w=(A.W-(n+1)*gp)/n,h=mn(62,A.H*.13);return{x:gp+i*(w+gp),y:A.H-h-8,w,h}};
 const stackR=i=>{const h=mn(60,A.H*.14);return{x:10,y:A.H-(3-i)*(h+8)-4,w:A.W-20,h}};
 function ambV(g){const C=A.col;if(K.aok>=3)return say2(g,'Clear writing: the reader always knows who.',A.W/2,A.H*.4,15,C.gr);const Q=AMB[K.ai];
  say2(g,`Pick the clear version (${K.ai+1} of 3)`,A.W/2,18,12,C.mu,700);say2(g,Q.s,A.W/2,46,15,C.tx);
  const y=A.H*.25,xa=A.W*.25,xb=A.W*.75,xm=A.W/2;say2(g,Q.who[0],xa,y+34,16,C.tx);say2(g,Q.who[1],xb,y+34,16,C.tx);
  g.strokeStyle=C.vi;g.lineWidth=3;g.setLineDash([6,5]);[xa,xb].forEach(x=>{g.beginPath();g.moveTo(xm,y-4);g.lineTo(x,y+18);g.stroke()});g.setLineDash([]);
  say2(g,AMB[K.ai].s.includes('it')?'it = ?':K.ai?'she = ?':'he = ?',xm,y-14,14,C.vi);
  Q.o.forEach((o,i)=>{const R=stackR(i);plate(g,R,K.miss===i?C.rd:C.cy,K.miss===i);multi(g,o[0],R,13,C.tx)})}
 function refV(g){const C=A.col;if(K.rok>=3)return say2(g,'-self words loop back to the person doing it.',A.W/2,A.H*.4,15,C.gr);const Q=REF[K.ri];
  say2(g,`Pick the word that points back to the doer (${K.ri+1} of 3)`,A.W/2,18,12,C.mu,700);const R=flow(Q.s.map(w=>w.startsWith('_')?'  ?  '+w.slice(1):w),A.H*.32,18),gi=Q.s.findIndex(w=>w.startsWith('_'));
  R.forEach((r,i)=>{if(i===gi)plate(g,r,C.vi,1,.18);else if(i===Q.doer)plate(g,r,C.am,0,.18);say2(g,r.t,r.x+r.w/2,r.y+r.h/2,18,C.tx)});arc(g,R[gi],R[Q.doer],A.alpha(C.vi,.7),1);
  say2(g,'🔁 points back to the doer',A.W/2,A.H*.62,12,C.mu,600);Q.o.forEach((o,i)=>{const B=optR(i,3);plate(g,B,K.miss===i?C.rd:C.cy,K.miss===i);say2(g,o,B.x+B.w/2,B.y+B.h/2,A.narrow?13:16,C.tx)})}
 function mudV(g){const C=A.col;if(K.mok>=3)return say2(g,'Found all three muddles.',A.W/2,A.H*.4,15,C.gr);const Q=MUD[K.mi];
  say2(g,`Tap the unclear word (${K.mi+1} of 3)`,A.W/2,20,12,C.mu,700);flow(Q.s,A.H*.3,18).forEach((r,i)=>{plate(g,r,K.mtap===i?C.rd:C.cy,K.mtap===i,.1);say2(g,r.t,r.x+r.w/2,r.y+r.h/2,18,C.tx,600)})}
 function draw(A){const{ctx:g,W,H,col:C}=A,s=st();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.35);g.fillRect(0,0,W,H);
  const f={swap:swapV,gap:gapV,amb:ambV,ref:refV,mud:mudV}[s];if(f)f(g);else say2(g,K.Q||'👉',W/2,H/2,54,C.tx);A.fx.draw(g)}
 function swap(i){if(K.sr>=2)return;const t=SWAP[K.sr][i];if(firstName(i)){K.miss=i;return miss(`Keep the first ${t}. The reader needs the name before a pronoun can point back to it.`)}
  if(!Array.isArray(t)||K.sw[i])return;K.miss=-1;K.sw[i]=1;A.sound.pop();if(swapLeft())return tell(`${t[0]} becomes ${t[1]}.`);
  const was=K.sr;tell(`${t[0]} becomes ${t[1]}. That reads much better.`);const g=K.gen;setTimeout(()=>{if(g===K.gen&&K.sr===was){K.sr++;K.sw={};tell()}},A.reduced()?10:600)}
 function gap(i){if(K.gok>=4)return;const Q=GAP[K.gi];if(i!==Q.a){K.miss=i;return miss(Q.bad[i])}K.miss=-1;K.gok++;K.gi=mn(3,K.gok);A.sound.pop();tell(`Yes, ${Q.o[i]} points back to ${Q.s.slice(Q.ant[0],Q.ant[1]+1).join(' ')}.`)}
 function amb(i){if(K.aok>=3)return;const o=AMB[K.ai].o[i];if(o[1]){K.miss=i;return miss(o[1])}K.miss=-1;K.aok++;K.ai=mn(2,K.aok);A.sound.pop();tell('Clear! '+o[0])}
 function ref(i){if(K.rok>=3)return;const Q=REF[K.ri];if(i!==Q.a){K.miss=i;return miss(Q.bad[i])}K.miss=-1;K.rok++;K.ri=mn(2,K.rok);A.sound.pop();tell(`Yes, ${Q.o[i]} loops back to ${Q.s[Q.doer]}.`)}
 function mud(i){if(K.mok>=3)return;const Q=MUD[K.mi];K.mtap=i;if(i!==Q.bad)return miss(`“${Q.s[i]}” is clear. Look for a he, she, it or they that could mean two things.`);
  K.mok++;A.sound.pop();const was=K.mi;tell(`Yes! ${Q.why}`);const g=K.gen;setTimeout(()=>{if(g===K.gen&&K.mi===was&&K.mok<3){K.mi=K.mok;K.mtap=-1;tell()}},A.reduced()?10:600)}
 function tell(msg){const s=st();let t;
  if(s==='swap')t=K.sr>=2?'Both done.':`${swapToks().join(' ')} Repeats left: ${swapLeft()}.`;
  else if(s==='gap')t=K.gok>=4?'All four done.':`${GAP[K.gi].s.join(' ').replace('_','blank')} Choices: ${GAP[K.gi].o.join(', ')}.`;
  else if(s==='amb')t=K.aok>=3?'All three done.':`${AMB[K.ai].s} Who is it about?`;
  else if(s==='ref')t=K.rok>=3?'All three done.':`${REF[K.ri].s.join(' ').replace('_','blank ')} Choices: ${REF[K.ri].o.join(', ')}.`;
  else if(s==='mud')t=K.mok>=3?'All three found.':`${MUD[K.mi].s.join(' ')}`;else t='Challenge time.';
  say((msg?msg+' ':'')+t);buttons();K.want()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const s=st();const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(s==='swap'&&K.sr<2)SWAP[K.sr].forEach((t,i)=>{if(firstName(i))B(t,()=>swap(i),`Change first ${t}`);else if(Array.isArray(t)&&!K.sw[i])B(t[0],()=>swap(i),`Change ${t[0]}, word ${i+1}`)});
  if(s==='gap'&&K.gok<4)GAP[K.gi].o.forEach((o,i)=>B(o,()=>gap(i)));
  if(s==='amb'&&K.aok<3)AMB[K.ai].o.forEach((o,i)=>B(String.fromCharCode(65+i),()=>amb(i),o[0]));
  if(s==='ref'&&K.rok<3)REF[K.ri].o.forEach((o,i)=>B(o,()=>ref(i)));
  if(s==='mud'&&K.mok<3)MUD[K.mi].s.forEach((w,i)=>B(w,()=>mud(i),`Unclear word: ${w}`));A.redraw()}
 const ok=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const seq=(fs,gp)=>{const g=K.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===K.gen)f()},A.reduced()?j*20:j*gp))};
 const fresh=()=>{K.gen++;K.want=()=>{};K.Q=null;K.miss=-1};
 const steps=[
  {h:'Too many names',p:'Saying a name again and again sounds odd. Tap each repeat to swap it for he, his, her or it.',
   predict:{q:'Should you change every Sam, even the first one, to he?',opts:['Yes, every one','No, keep the first name'],ans:1},task:'Fix the repeats in both sentences',
   show:()=>{steps[0].go();seq([2,5,7].map(i=>()=>swap(i)).concat([()=>0,()=>swap(2),()=>swap(5)]),350)},go:()=>{fresh();K.sr=0;K.sw={};tell();K.want=ok(0,()=>K.sr>=2,()=>'Use the name once, then a pronoun.')}},
  {h:'Which pronoun fits?',p:'A pronoun must match the noun it stands for: one or many, a person or a thing. Pick the word for the gap.',task:'Fill four gaps',
   show:()=>{steps[1].go();seq(GAP.map(q=>()=>gap(q.a)),400)},go:()=>{fresh();K.gi=0;K.gok=0;tell();K.want=ok(1,()=>K.gok>=4,()=>'Match the pronoun to its noun.')}},
  {h:'Who is “he”?',p:'If a pronoun could point to two people, the reader gets lost. Pick the version that is clear.',
   predict:{q:'“Tom told Jack he was late.” Do we know who was late?',opts:['Yes, it was Tom','No, it could be either'],ans:1},task:'Fix three muddled sentences',
   show:()=>{steps[2].go();seq(AMB.map(q=>()=>amb(q.o.findIndex(o=>!o[1]))),500)},go:()=>{fresh();K.ai=0;K.aok=0;tell();K.want=ok(2,()=>K.aok>=3,()=>'If two people fit, use a name or reword it.')}},
  {h:'Myself, himself, themselves',p:'When someone does something to their own self, use a -self word. Pick the right one.',
   predict:{q:'Ben hurt ___ on the slide. Which word is right?',opts:['hisself','himself'],ans:1},task:'Pick three -self words',
   show:()=>{steps[3].go();seq(REF.map(q=>()=>ref(q.a)),450)},go:()=>{fresh();K.ri=0;K.rok=0;tell();K.want=ok(3,()=>K.rok>=3,()=>'Myself, himself, herself, ourselves, themselves.')}},
  {h:'Spot the muddle',p:'Read each one. Tap the pronoun that could mean two things.',task:'Find three unclear pronouns',
   show:()=>{steps[4].go();seq(MUD.map(q=>()=>mud(q.bad)),750)},go:()=>{fresh();K.mi=0;K.mok=0;K.mtap=-1;tell();K.want=ok(4,()=>K.mok>=3,()=>'Check each he, she, it and they: who could it be?')}},
  {h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
 const QZ=[['Which is best? “Nina fed Nina’s cat.”','🐈',[['Nina fed her cat.','ok'],['She fed her cat.','noname'],['Nina fed Nina’s cat.','repeat']]],
  ['“The twins lost ___ coats.”','🧥',[['their','ok'],['his','number'],['its','number']]],
  ['“We built the den ___.”','🏕️',[['ourselves','ok'],['ourself','self'],['us','self']]],
  ['“Kai met Leo, and he smiled.” Who smiled?','🙂',[['We cannot tell. It needs a name.','ok'],['Kai','guess'],['Leo','guess']]],
  ['“The ball hit the window and ___ smashed.” Which is clearest?','🪟',[['the window','ok'],['it','unclear'],['they','number']]],
  ['“Gran made the jam ___.”','🍓',[['herself','ok'],['sheself','self'],['her','self']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;K.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tg])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tg)});say('Challenge: '+q);A.redraw()}
 function judge(tg){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tg){case 'ok':m='Yes!';break;
   case 'noname':m='With no name at all, the reader does not know who she is. Name her once first.';break;
   case 'repeat':m='Saying the name twice sounds odd. Swap the second one for a pronoun.';break;
   case 'number':m='Check one or many. The pronoun has to match.';break;
   case 'self':m='That is not the standard -self word. Use myself, herself, ourselves or themselves.';break;
   case 'guess':m='It could be either boy, so we cannot tell. That is why it needs a name.';break;
   default:m='It could be the ball or the window. Naming it makes it clear.'}
  const good=tg==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const s=st();
  if(s==='swap'&&K.sr<2){const i=flow(swapToks(),50,17).findIndex(r=>hit(p,r));if(i>=0)swap(i)}
  else if(s==='gap'||s==='ref'){const i=[0,1,2].find(i=>hit(p,optR(i,3)));if(i!=null)(s==='gap'?gap:ref)(i)}
  else if(s==='amb'){const i=[0,1,2].find(i=>hit(p,stackR(i)));if(i!=null)amb(i)}
  else if(s==='mud'&&K.mok<3){const i=flow(MUD[K.mi].s,A.H*.3,18).findIndex(r=>hit(p,r));if(i>=0)mud(i)}return false}
 A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down});buttons()}});
 A.start()})})();
