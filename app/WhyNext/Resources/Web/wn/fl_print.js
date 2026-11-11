/* Flagship 57 – understanding print (ages 4–6, read with a grown-up): slide a reading finger along a line and watch the
   words light up left to right; jump back to the start of the next line; tap one dot under each word (gaps split words);
   sort single letters from words; flip and turn a book to its front cover; build a sentence and read it back.
   Challenge: where to start, which way, how many words, letter or word, the return sweep, the front cover. */
(()=>{const PAGE=[['The','cat','sat'],['on','the','mat.']],COUNT=['My','dog','can','run'],
 TILES=[['b',0],['cat',1],['m',0],['sun',1],['s',0],['dog',1]],CARDS=['The','big','dog','can','run','I','see','a','cat'],
 SENT=[['I','can','hop'],['We','like','cake'],['A','big','red','bus'],['Mum','can','see','me'],['The','sun','is','hot'],['Go','to','bed']];
VIS.reg('flagprint',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const G={lit:0,fx:-1,fy:0,dots:[],sorted:[],tile:0,tp:null,front:0,rot:Math.PI,built:[],blit:0,flash:0,want:()=>{},Q:null,said:'',tok:0,dr:null,x0:0,box:[]};
 const tell=t=>{G.said=t;c.say(t);if(read){read.textContent=t;A.cv.setAttribute('aria-label',t)}};
 const mode=()=>['read','sweep','count','sort','book','build','q'][A.step],FS=()=>A.narrow?30:40;
 const ft=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=a||'left';x.textBaseline='middle'};
 const pageWords=()=>PAGE[0].concat(PAGE[1]);
 // where each word sits on the canvas (used for drawing and for hit tests)
 function lay(lines,y0,fs,centre){const x=A.ctx;ft(x,700,fs);const sp=fs*.62,out=[];
  lines.forEach((ws,li)=>{const tw=ws.reduce((s,w)=>s+x.measureText(w).width,0)+sp*(ws.length-1);let px=centre?(A.W-tw)/2:(A.narrow?20:44);
   ws.forEach((w,wi)=>{const ww=x.measureText(w).width;out.push({li,wi,w,x:px,y:y0+li*fs*1.75,ww,h:fs*1.35});px+=ww+sp})});return out}
 const pic=()=>({x:16,y:14,w:A.W-32,h:A.H*.4}),pageBox=()=>{const p=pic(),fs=FS();return G.box=lay(PAGE,p.y+p.h+fs*1.15,fs)};
 const hit=(p,B)=>B.findIndex(b=>p.x>b.x-8&&p.x<b.x+b.ww+8&&Math.abs(p.y-b.y)<b.h*.7);
 function status(){const m=mode();let t;
  if(m==='read'||m==='sweep'){const w=pageWords();t=G.lit?`Read so far: ${w.slice(0,G.lit).join(' ')}`:'A page: a cat on a mat, and two lines of words. The finger waits at the start.';
   if(m==='read'&&G.lit>=3)t+='. That is the top line, read from left to right.';if(G.lit>=6)t+='. The whole page is read.'}
  else if(m==='count')t=`${COUNT.join(' ')}. Dots: ${G.dots.length} of ${COUNT.length} words.`;
  else if(m==='sort'){const n=G.sorted.length;t=n<TILES.length?`Card: "${TILES[G.tile][0]}". Is it a letter or a word? ${n} of ${TILES.length} sorted.`:'All six cards are sorted.'}
  else if(m==='book')t=`The ${G.front?'front':'back'} of the book, ${up()?'the right way up':'upside down'}.`+(G.front&&up()?' The title says Pip the Cat.':'');
  else t=G.built.length?`Your sentence: ${G.built.join(' ')}.`:'Tap word cards to make a sentence.';
  tell(t);sync();G.want()}
 const up=()=>Math.abs(Math.cos(G.rot)-1)<.01;
 // ---- drawing ----
 function catPic(x,cx,cy,s){const C=A.col;x.fillStyle='#dc2626';A.paint.rrect(cx-s*1.5,cy+s*.55,s*3,s*.35,6);x.fill();
  x.fillStyle='#f59e0b';x.beginPath();x.ellipse(cx,cy+s*.2,s*.8,s*.5,0,0,7);x.fill();x.beginPath();x.arc(cx+s*.7,cy-s*.35,s*.42,0,7);x.fill();
  [[.42,-.6],[.86,-.6]].forEach(([a,b])=>{x.beginPath();x.moveTo(cx+s*(a-.14),cy+s*(b+.05));x.lineTo(cx+s*a,cy+s*(b-.35));x.lineTo(cx+s*(a+.14),cy+s*(b+.05));x.fill()});
  x.strokeStyle='#f59e0b';x.lineWidth=s*.14;x.lineCap='round';x.beginPath();x.moveTo(cx-s*.75,cy+s*.2);x.quadraticCurveTo(cx-s*1.3,cy-s*.1,cx-s*1.1,cy-s*.6);x.stroke();
  x.fillStyle='#111827';x.beginPath();x.arc(cx+s*.58,cy-s*.4,s*.06,0,7);x.arc(cx+s*.86,cy-s*.4,s*.06,0,7);x.fill();
  x.fillStyle='#facc15';x.beginPath();x.arc(A.W-s*1.1,cy-s*.7,s*.38,0,7);x.fill()}
 function finger(x,px,py){x.fillStyle=A.col.am;x.beginPath();x.arc(px,py,15,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.moveTo(px,py-9);x.lineTo(px+8,py+6);x.lineTo(px-8,py+6);x.fill()}
 function words(x,B,litN,dots){const C=A.col;B.forEach((b,i)=>{const on=i<litN;if(on){x.fillStyle='#fde047';A.paint.rrect(b.x-6,b.y-b.h/2,b.ww+12,b.h,10);x.fill()}
   ft(x,700,b.h/1.35);x.fillStyle=on?'#111827':C.tx;x.fillText(b.w,b.x,b.y);if(dots&&dots.includes(i)){x.fillStyle=C.gr;x.beginPath();x.arc(b.x+b.ww/2,b.y+b.h*.72,9,0,7);x.fill()}})}
 function page(x){const p=pic(),fs=FS();x.fillStyle=A.alpha('#38bdf8',.18);A.paint.rrect(p.x,p.y,p.w,p.h,12);x.fill();catPic(x,p.x+p.w*.45,p.y+p.h*.55,p.h*.36);
  const B=pageBox();words(x,B,G.lit);if(G.fx>=0)finger(x,G.fx,G.fy)}
 function draw(A){const{ctx:x,W,H,col:C}=A,m=mode();x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.35);x.fillRect(0,0,W,H);
  if(m==='read'||m==='sweep')page(x);
  else if(m==='count'){const fs=FS()*1.1,B=lay([COUNT],H*.36,fs,1);G.box=B;words(x,B,0,G.dots);ft(x,800,A.narrow?26:32,'center');x.fillStyle=C.tx;x.fillText(`Words: ${G.dots.length}`,W/2,H*.7)}
  else if(m==='sort'){const b=bins();['Letter','Word'].forEach((n,i)=>{const r=b[i];x.fillStyle=A.alpha(i?C.vi:C.cy,.16);A.paint.rrect(r.x,r.y,r.w,r.h,14);x.fill();x.strokeStyle=i?C.vi:C.cy;x.lineWidth=3;x.stroke();
    ft(x,800,A.narrow?20:24,'center');x.fillStyle=C.tx;x.fillText(n==='Letter'?'One letter':'A word',r.x+r.w/2,r.y+24);
    G.sorted.filter(k=>TILES[k][1]===i).forEach((k,j)=>{ft(x,700,22,'center');x.fillText(TILES[k][0],r.x+r.w/2,r.y+58+j*28)})});
   if(G.sorted.length<TILES.length){const t=tileR(),p=G.tp||{x:t.x+t.w/2,y:t.y+t.h/2};x.fillStyle='#fff';A.paint.shadow(10,4,.25);A.paint.rrect(p.x-t.w/2,p.y-t.h/2,t.w,t.h,14);x.fill();A.paint.noShadow();
    ft(x,800,A.narrow?38:46,'center');x.fillStyle='#111827';x.fillText(TILES[G.tile][0],p.x,p.y+2)}}
  else if(m==='book')book(x);
  else if(m==='build'){const fs=A.narrow?28:36,B=lay([G.built.length?G.built:['…']],H*.2,fs,1);words(x,G.built.length?B:[],G.blit);if(!G.built.length){ft(x,600,18,'center');x.fillStyle=C.mu;x.fillText('Tap the cards below',W/2,H*.2)}
   if(G.fx>=0)finger(x,G.fx,G.fy);cards().forEach(k=>{x.fillStyle=A.alpha(C.ac,.14);A.paint.rrect(k.x,k.y,k.w,k.h,10);x.fill();x.strokeStyle=C.ac;x.lineWidth=2;x.stroke();ft(x,700,22,'center');x.fillStyle=C.tx;x.fillText(k.t,k.x+k.w/2,k.y+k.h/2)})}
  else if(G.Q){const k=G.Q.k;if(k==='count'){lay([G.Q.s],H*.4,FS(),1).forEach(b=>{ft(x,700,FS());x.fillStyle=C.tx;x.fillText(b.w,b.x,b.y)})}
   else if(k==='lw'){ft(x,800,64,'center');x.fillStyle=C.tx;x.fillText(G.Q.t,W/2,H*.42)}else if(k==='front'){G.front=0;G.rot=0;book(x,.5)}else{G.lit=0;G.fx=-1;page(x)}}
  if(G.flash>0){x.strokeStyle=A.alpha(C.gr,G.flash);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 const bins=()=>{const w=(A.W-36)/2,h=A.H*.38,y=A.H-h-14;return[{x:12,y,w,h},{x:24+w,y,w,h}]};
 const tileR=()=>{const s=A.narrow?96:110;return{x:A.W/2-s*.75,y:A.H*.08,w:s*1.5,h:s}};
 const bookR=()=>{const h=Math.min(A.H*.72,300),w=h*.72;return{cx:A.W/2,cy:A.H*.5,w,h}};
 function book(x,sc){const C=A.col,b=bookR(),s=sc||1,w=b.w*s,h=b.h*s;x.save();x.translate(b.cx,b.cy);x.rotate(G.rot);
  x.fillStyle=G.front?'#2563eb':'#475569';A.paint.shadow(14,5,.3);A.paint.rrect(-w/2,-h/2,w,h,10);x.fill();A.paint.noShadow();
  const sx=G.front?-w/2:w/2-w*.1;x.fillStyle='rgba(0,0,0,.28)';x.fillRect(sx,-h/2,w*.1,h);
  if(G.front){ft(x,800,Math.max(16,w*.14),'center');x.fillStyle='#fff';x.fillText('Pip the Cat',w*.04,-h*.36);catPic2(x,w*.04,h*.05,w*.22)}
  else{x.fillStyle='#fff';x.fillRect(-w*.05,h*.22,w*.4,h*.16);x.fillStyle='#111';for(let i=0;i<14;i++)x.fillRect(-w*.03+i*w*.026,h*.24,i%3?2:4,h*.1)}x.restore()}
 function catPic2(x,cx,cy,s){x.fillStyle='#f59e0b';x.beginPath();x.arc(cx,cy,s,0,7);x.fill();x.beginPath();x.moveTo(cx-s*.9,cy-s*.3);x.lineTo(cx-s*.6,cy-s*1.3);x.lineTo(cx-s*.1,cy-s*.9);x.fill();
  x.beginPath();x.moveTo(cx+s*.9,cy-s*.3);x.lineTo(cx+s*.6,cy-s*1.3);x.lineTo(cx+s*.1,cy-s*.9);x.fill();x.fillStyle='#111827';x.beginPath();x.arc(cx-s*.35,cy-s*.1,s*.12,0,7);x.arc(cx+s*.35,cy-s*.1,s*.12,0,7);x.fill()}
 function cards(){const out=[],gap=8,h=48;let px=12,py=A.H*.42;const x=A.ctx;ft(x,700,22);
  CARDS.forEach(t=>{const w=Math.max(56,x.measureText(t).width+28);if(px+w>A.W-12){px=12;py+=h+gap}out.push({t,x:px,y:py,w,h});px+=w+gap});return out}
 // ---- actions ----
 const fresh=()=>{G.tok++;G.want=()=>{};G.Q=null;G.dr=null;G.tp=null},play=(fs,ms=420)=>{const k=++G.tok;let i=0;const nx=()=>{if(k!==G.tok||i>=fs.length)return;fs[i++]();setTimeout(nx,A.reduced()?0:ms)};nx()};
 // move the finger under page word i and light it, one word at a time
 const lightTo=i=>()=>{const b=pageBox()[i];if(!b)return;G.lit=Math.max(G.lit,i+1);G.fx=b.x+b.ww/2;G.fy=b.y+b.h*.85;A.sound.tick();A.redraw();if(G.lit===3||G.lit===6)status()};
 const sweepLine=(from,to)=>{A.redraw();const s=[];for(let i=from;i<to;i++)s.push(lightTo(i));play(s)};
 function tapPage(i){if(i<0)return;if(i===3){tell('Yes: back to the left, then along the line.');sweepLine(3,6)}
  else if(i===5){shake();tell('"mat." is at the end of the line. Jump back to the left side first.')}
  else if(i===4){shake();tell('Nearly. Go right back to the very left of the line.')}else{shake();tell('That line is already read. Go down to the next line, on the left.')}}
 function dot(i){if(i<0){tell('That is a gap. Gaps are not words: they show where a word stops.');return}if(!G.dots.includes(i)){G.dots.push(i);A.sound.pop()}status()}
 function sortAs(bin){const t=TILES[G.tile];G.tp=null;if(t[1]!==bin){shake();tell(t[1]?`"${t[0]}" has ${t[0].length} letters side by side, so it is a word.`:`"${t[0]}" is one letter on its own.`);return}
  G.sorted.push(G.tile);G.tile=Math.min(TILES.length-1,G.sorted.length);A.sound.pop();status()}
 function flip(){G.front^=1;A.sound.tick();status()}function turn(){A.tween(G,{rot:G.rot+Math.PI},A.reduced()?0:600,'io',status)}
 function addWord(t){if(G.built.length<6){G.built.push(t);G.blit=0;G.fx=-1;A.sound.tick()}status()}
 function readBuilt(){if(!G.built.length)return;const B=lay([G.built],A.H*.2,A.narrow?28:36,1);G.blit=0;play(B.map((b,i)=>()=>{G.blit=i+1;G.fx=b.x+b.ww/2;G.fy=b.y+b.h*.85;A.sound.tick();A.redraw()}))}
 function shake(){A.sound.miss();try{navigator.vibrate&&navigator.vibrate(12)}catch(e){}}
 function sync(){if(!A)return;if(A.step!==6)A.cv.setAttribute('aria-label',G.said);if(!pad)return A.redraw();pad.innerHTML='';const m=mode();
  const B=(t,f,dis,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!dis;e.onclick=()=>f()};
  if(m==='read'){B('Read the top line →',()=>{G.lit=0;sweepLine(0,3)},G.lit>=3);B('Start again',()=>{G.lit=0;G.fx=-1;status()})}
  if(m==='sweep')[[3,'on'],[5,'mat.'],[2,'sat']].forEach(([i,w])=>B(w,()=>tapPage(i),G.lit>=6,`Read "${w}" next`));
  if(m==='count'){COUNT.forEach((w,i)=>B(w,()=>dot(i),G.dots.includes(i),`Dot under "${w}"`));B('Start again',()=>{G.dots=[];status()})}
  if(m==='sort'&&G.sorted.length<TILES.length){B('Letter',()=>sortAs(0),0,`"${TILES[G.tile][0]}" is a letter`);B('Word',()=>sortAs(1),0,`"${TILES[G.tile][0]}" is a word`)}
  if(m==='book'){B('Flip it over',flip);B('Turn it round',turn)}
  if(m==='build'){CARDS.slice(0,5).forEach(t=>B(t,()=>addWord(t),G.built.length>=6,`Add "${t}"`));B('Read it',readBuilt,!G.built.length);B('Clear',()=>{G.built=[];G.fx=-1;status()})}A.redraw()}
 // ---- steps ----
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&(!steps[st].predict||A.pred[st]!=null)){G.flash=1;A.tween(G,{flash:0},1100,'out');A.done(msg()+A.reveal(st))}};
 const steps=[
  {h:'Which way?',p:'Slide the orange finger under the top line, or press the button. Say each word as it lights up.',
   predict:{q:'Where do we start reading?',opts:['At the first word: top, left','At the last word: bottom, right','At the picture'],ans:0},task:'Read the top line with the finger',show:()=>{G.lit=0;sweepLine(0,3)},
   go:()=>{fresh();G.lit=0;G.fx=-1;status();G.want=fin(0,()=>G.lit>=3,()=>'The cat sat. We start on the left and go this way →.')}},
  {h:'Next line',p:'The top line is done. Tap the word you read next.',
   predict:{q:'At the end of a line, where do your eyes go?',opts:['Straight down, to "mat."','Back to the left, to "on"','Back along the top line'],ans:1},task:'Tap the next word to read',show:()=>tapPage(3),
   go:()=>{fresh();G.lit=3;const b=pageBox()[2];G.fx=b?b.x+b.ww/2:-1;G.fy=b?b.y+b.h*.85:0;status();G.want=fin(1,()=>G.lit>=6,()=>'The cat sat on the mat. At the end of a line we jump back to the left.')}},
  {h:'Count the words',p:'Tap each word to put a dot under it. Tap a gap and see what happens.',
   predict:{q:'How many words are in "My dog can run"?',opts:['11: one for each letter','4','3'],ans:1},task:'Put one dot under each word',show:()=>play(COUNT.map((w,i)=>()=>dot(i))),
   go:()=>{fresh();G.dots=[];status();G.want=fin(2,()=>G.dots.length===COUNT.length,()=>'4 words, but 11 letters. The gaps show where each word stops.')}},
  {h:'Letter or word?',p:'Drag the card into a box, or press Letter or Word.',task:'Sort all six cards',show:()=>play(TILES.map(()=>()=>sortAs(TILES[G.tile][1]))),
   go:()=>{fresh();G.sorted=[];G.tile=0;status();G.want=fin(3,()=>G.sorted.length===TILES.length,()=>'A letter is one shape on its own. A word is letters side by side, with a gap round it.')}},
  {h:'Front of the book',p:'Tap the book to flip it over. Swipe across it to turn it round.',
   predict:{q:'How can you tell the front of a book?',opts:['It has the barcode','It has the title and a picture','You can’t tell'],ans:1},task:'Show the front, the right way up',show:()=>play([()=>{if(!G.front)flip()},()=>{if(!up())turn()}],700),
   go:()=>{fresh();G.front=0;G.rot=Math.PI;status();G.want=fin(4,()=>G.front&&up(),()=>'Now the title is at the top: Pip the Cat. The title tells you the name of the book.')}},
  {h:'Make a sentence',p:'Tap cards to build a sentence. Then press Read it and watch the finger.',go:()=>{fresh();G.built=[];G.blit=0;G.fx=-1;status()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 // ---- challenge ----
 const KS=['start','count','lw','dir','next','count','front','lw'];let qn=-1,run=0;
 function ask(){qn++;const k=KS[qn%KS.length],j=qn%3;let q,ops,s=SENT[qn%SENT.length],t=TILES[(qn*5)%6];
  if(k==='start'){q='Where do you start reading this page?';ops=[['The top line, on the left','ok'],['The bottom line, on the right','end'],['In the middle','mid']]}
  else if(k==='count'){const n=s.length,l=s.join('').length;q='How many words?';ops=[[String(n),'ok'],[String(l),'letters'],[String(n-1),'gaps']]}
  else if(k==='lw'){q=`Is "${t[0]}" a letter or a word?`;ops=[['A letter',t[1]?'lw1':'ok'],['A word',t[1]?'ok':'lw0']]}
  else if(k==='dir'){q='Which way does the finger move along a line?';ops=[['→ left to right','ok'],['← right to left','rtl'],['↓ down the page','down2']]}
  else if(k==='next'){q='You read "sat" at the end of the top line. What next?';ops=[['"on", at the left of the next line','ok'],['"mat.", straight down','down'],['"The", back along the top','back']]}
  else{q='Is this the front of the book?';ops=[['No: it has the barcode, so it is the back','ok'],['Yes: it is a book','none'],['Yes: the barcode is the title','barcode']]}
  G.Q={k,s,t:t[0]};chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(j%ops.length).concat(ops.slice(0,j%ops.length)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});
  const say='Challenge: '+q+(k==='count'?' '+s.join(' '):'');A.cv.setAttribute('aria-label',say);c.say(say);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),w=G.Q.t;let m;
  if(tag==='ok')m='Yes!';
  else if(tag==='end')m='That is where the page ends. We start at the top, on the left.';
  else if(tag==='mid')m='Start at the very first word: the top line, on the left.';
  else if(tag==='letters')m='That counts the letters. A word is a group of letters with a gap on each side.';
  else if(tag==='gaps')m='That counts the gaps. There is always one more word than gaps.';
  else if(tag==='lw1')m=`"${w}" has ${w.length} letters side by side, so it is a word.`;
  else if(tag==='lw0')m=`"${w}" is one letter on its own, so it is a letter.`;
  else if(tag==='rtl')m='In English the finger goes left to right →, from the first word to the last.';
  else if(tag==='down2')m='Along the line first, left to right. We go down only at the end of a line.';
  else if(tag==='down')m='Straight down skips words. Jump back to the left of the next line.';
  else if(tag==='back')m='That line is already read. Go on to the start of the next line.';
  else if(tag==='barcode')m='The barcode is on the back. The title is on the front, with a picture.';
  else m='This side has no title, only a barcode. That means it is the back.';
  if(tag==='ok'){run++;A.win();fb.innerHTML=`✓ ${m} Stars: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();fb.innerHTML=`✗ ${m} <button type="button" class="linkish">Another →</button>`}fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;read.hidden=A.step===6;pad.hidden=A.step===6;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const m=mode();G.x0=p;
     if(m==='read'){const B=G.box;if(B[0]&&Math.abs(p.y-B[0].y)<B[0].h){G.dr='f';G.warn=0;G.fx=p.x;G.fy=B[0].y+B[0].h*.85;return true}return false}
     if(m==='sweep'){tapPage(hit(p,G.box));return false}
     if(m==='count'){if(G.box[0]&&Math.abs(p.y-G.box[0].y)<G.box[0].h)dot(hit(p,G.box));return false}
     if(m==='sort'){const t=tileR();if(G.sorted.length<TILES.length&&p.x>t.x&&p.x<t.x+t.w&&p.y>t.y&&p.y<t.y+t.h){G.dr='t';G.tp=p;return true}return false}
     if(m==='book'){const b=bookR();if(Math.abs(p.x-b.cx)<b.w/2+20&&Math.abs(p.y-b.cy)<b.h/2+20){G.dr='b';return true}return false}
     if(m==='build'){const k=cards().find(k=>p.x>k.x&&p.x<k.x+k.w&&p.y>k.y&&p.y<k.y+k.h);if(k)addWord(k.t);return false}return false},
    move:p=>{if(G.dr==='f'){G.fx=p.x;const i=G.box.findIndex(b=>b.li===0&&p.x>b.x&&p.x<b.x+b.ww);
      if(i>=0&&i===G.lit){G.lit++;A.sound.tick();if(G.lit===3)status()}else if(i>G.lit&&!G.warn++)tell(G.lit?'Keep going in order, one word at a time.':'Start on the left, under "The", and slide this way →.');A.redraw()}
     else if(G.dr==='t'){G.tp=p;A.redraw()}},
    up:p=>{const d=G.dr;G.dr=null;if(d==='f'&&G.lit<3&&!G.warn)tell('Slide all the way to the end of the line.');
     if(d==='t'){const b=bins(),i=b.findIndex(r=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y-20);if(i>=0)sortAs(i);else{G.tp=null;A.redraw()}}
     if(d==='b'){Math.hypot(p.x-G.x0.x,p.y-G.x0.y)>40?turn():flip()}}});
   sync()}});
 A.start()})})();
