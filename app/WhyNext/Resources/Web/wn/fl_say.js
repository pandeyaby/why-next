/* Flagship – saying number names in order (ages 2–3, with a grown-up): climb a staircase saying one to five; fill the
   missing carriage on a number train; spot where Silly Bear skips or repeats a number; hop a frog across ten stones;
   then count back from five for a rocket. The number names always come in the same order. */
(()=>{
 const W=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
 const GAPS=[3,5,2];                      // the missing number on the 1–5 train, one per round
 // [what Bear says, index of his first slip, kind of slip]
 const FIX=[[[1,2,4,5],2,'skip'],[[1,2,3,3],3,'twice'],[[1,2,3,4,6],4,'skip']];
VIS.reg('flagsay',c=>{let A,pad,quiz;c.fig.classList.add('young');
 const st={n:0,round:0,bad:null,held:null,at:null,from:null,fly:0,tok:0,onChange:()=>{}};
 const mode=()=>['stairs','gap','fix','ten','back','quiz'][A.step];
 const total=()=>({stairs:5,ten:10,back:5})[mode()]||0;
 function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}

 // ---------- layout ----------
 const big=n=>A.narrow?n:Math.round(n*1.2);
 const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function stairR(i){const w=(A.W-24)/5,h=A.H*(.16+.14*i);return{x:12+i*w,y:A.H*.94-h,w:w-4,h}}
 function stoneR(i){const g=10,w=(A.W-g*6)/5,h=Math.min(w*.9,A.H*.3);return{x:g+(i%5)*(w+g),y:i<5?A.H*.16:A.H*.6,w,h}}
 function lightR(i){const g=10,w=(A.W-g*6)/5,h=Math.min(w,A.H*.26);return{x:g+i*(w+g),y:A.H*.7,w,h}}
 function carR(i){const g=8,w=(A.W-g*6)/5;return{x:g+i*(w+g),y:A.H*.1,w,h:Math.min(w*1.1,A.H*.32)}}
 function choR(j){const g=16,w=Math.min(120,(A.W-g*4)/3),x0=(A.W-(w*3+g*2))/2;return{x:x0+j*(w+g),y:A.H*.6,w,h:Math.min(w,A.H*.32)}}
 function duckR(i,n){const g=8,w=(A.W-g*(n+1))/n;return{x:g+i*(w+g),y:A.H*.22,w,h:A.H*.5}}
 function write(g,t,x,y,n,col,w){g.font=`${w||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
 function glyph(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
 function tile(g,r,col,thick,a){g.fillStyle=A.alpha(col,a||.15);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 const pill=(t,x,y,bg)=>A.paint.label(t,x,y,{font:`800 ${big(12)}px system-ui,sans-serif`,bg});
 function card(g,r,v,col,thick,a){tile(g,r,col,thick,a);const s=Math.min(r.w*.55,r.h*.5);
  write(g,String(v),r.x+r.w/2,r.y+r.h*.4,Math.round(s/(A.narrow?1:1.2)),A.col.tx);write(g,W[v]||'',r.x+r.w/2,r.y+r.h*.82,11,A.col.tx,700)}

 // ---------- drawing ----------
 function drawStairs(g){const C=A.col;for(let i=0;i<5;i++){const r=stairR(i),on=i<st.n,next=i===st.n;
   tile(g,r,st.bad===i?C.rd:on?C.gr:next?C.or:C.mu,next,on?.25:.1);
   if(on)write(g,String(i+1),r.x+r.w/2,r.y+r.h*.35,Math.min(28,r.w*.4),C.tx);if(on)write(g,W[i+1],r.x+r.w/2,r.y+r.h*.35+big(22),11,C.tx,700)}
  const r=st.n?stairR(st.n-1):{x:0,y:A.H*.94,w:24};glyph(g,'🧸',st.n?r.x+r.w/2:16,r.y-A.H*.08,Math.min(40,A.H*.13));
  write(g,st.n>=5?'Top! Five steps.':st.n?`${W[st.n]}…`:'Tap the first step',A.W*.3,A.H*.1,15,C.tx)}
 function drawTen(g){const C=A.col;for(let i=0;i<10;i++){const r=stoneR(i),on=i<st.n,next=i===st.n;
   tile(g,r,st.bad===i?C.rd:on?C.gr:next?C.or:C.mu,next,on?.25:.1);if(on||next)card(g,r,i+1,on?C.gr:C.or,next,.0001);
   if(i===st.n-1)glyph(g,'🐸',r.x+r.w*.82,r.y+4,Math.min(30,r.w*.4))}
  write(g,st.n>=10?'Ten! You counted to ten.':st.n?`Next: ${W[st.n+1]}`:'Tap stone one',A.W/2,A.H*.5,14,C.tx)}
 function drawBack(g){const C=A.col,s=Math.min(70,A.H*.2),y=A.H*.42-st.fly*A.H*.6;
  glyph(g,'🚀',A.W/2,y,s);if(st.fly)glyph(g,'💨',A.W/2,y+s*.9,s*.6);
  for(let i=0;i<5;i++){const r=lightR(i),on=i<st.n,next=i===st.n;card(g,r,5-i,st.bad===i?C.rd:on?C.gr:next?C.or:C.mu,next,on?.25:.1)}
  write(g,st.n>=5?'Blast off!':`Next: ${W[5-st.n]}`,A.W/2,A.H*.08,15,C.tx)}
 function drawGap(g){const C=A.col,gv=GAPS[Math.min(st.round,2)],fill=st.round>=3;
  for(let i=0;i<5;i++){const r=carR(i),v=i+1;if(v===gv&&!fill){tile(g,r,C.or,true,.08);write(g,'?',r.x+r.w/2,r.y+r.h*.45,26,C.tx)}else card(g,r,v,C.cy,false,.14)}
  g.strokeStyle=C.mu;g.lineWidth=3;g.beginPath();g.moveTo(8,carR(0).y+carR(0).h+6);g.lineTo(A.W-8,carR(0).y+carR(0).h+6);g.stroke();
  if(fill){write(g,'All 3 gaps filled!',A.W/2,A.H*.62,15,C.gr);return}
  write(g,'Which number goes in the gap?',A.W/2,A.H*.52,13,C.tx);
  opts().forEach((v,j)=>{let r=choR(j);if(st.held===j&&st.at)r={...r,x:st.at.x-r.w/2,y:st.at.y-r.h/2};card(g,r,v,st.bad===j?C.rd:C.or,st.held===j,.14)})}
 function drawFix(g){const C=A.col;if(st.round>=3){write(g,'Bear counts right now!',A.W/2,A.H*.5,15,C.gr);return}
  const[said,wrong]=FIX[st.round],n=said.length;glyph(g,'🐻',A.W/2,A.H*.1,Math.min(40,A.H*.13));
  said.forEach((v,i)=>{const r=duckR(i,n),fixed=st.ok&&i===wrong,sh=fixed?i+1:v;tile(g,r,st.bad===i?C.rd:fixed?C.gr:C.mu,fixed,.12);
   glyph(g,'🦆',r.x+r.w/2,r.y+r.h*.3,Math.min(36,r.w*.5));write(g,String(sh),r.x+r.w/2,r.y+r.h*.62,18,C.tx);write(g,W[sh],r.x+r.w/2,r.y+r.h*.85,11,C.tx,700)});
  write(g,'Tap where Bear goes wrong',A.W/2,A.H*.86,13,C.tx)}
 function draw(A){const{ctx:g,W:w,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.35);g.fillRect(0,0,w,H);const v=mode();
  if(v==='stairs')drawStairs(g);if(v==='ten')drawTen(g);if(v==='back')drawBack(g);if(v==='gap')drawGap(g);if(v==='fix')drawFix(g);
  if(v==='quiz')glyph(g,'🔢',w/2,H/2,70);A.fx.draw(g)}

 // ---------- actions ----------
 const opts=()=>{const v=GAPS[Math.min(st.round,2)],o=[v,v+1,v>1?v-1:v+2],k=st.round%3;return o.slice(k).concat(o.slice(0,k))};
 function hop(i){const N=total(),v=mode();if(st.n>=N)return;const say=k=>v==='back'?W[5-k]:W[k+1];
  if(i===st.n){st.n++;st.bad=null;A.sound.pop();
   if(v==='back'&&st.n>=5){report('One… blast off! Five, four, three, two, one.');A.tween(st,{fly:1},A.reduced()?1:1400,'io',()=>st.onChange());return}
   report(`${say(st.n-1)[0].toUpperCase()+say(st.n-1).slice(1)}!`);return}
  st.bad=i;A.sound.miss();speak(i>st.n?`Oops, that jumps ahead. One at a time. Next is ${say(st.n)}.`:`We said ${say(i)} already. Next is ${say(st.n)}.`);A.redraw()}
 function pick(j){if(st.round>=3)return;const v=opts()[j],gv=GAPS[st.round];st.held=null;st.at=null;
  if(v!==gv){st.bad=j;A.sound.miss();speak(v>gv?`${W[v]} skips ${W[gv]}. Say it: ${W[gv-1]||'start'}, ${W[gv]}.`:`${W[v]} comes before. We go up: ${W[gv-1]}, ${W[gv]}.`);A.redraw();return}
  st.bad=null;A.sound.pop();st.round++;report(`Yes! ${[1,2,3,4,5].map(k=>W[k]).join(', ')}.`)}
 function spot(i){if(st.round>=3||st.ok)return;const[said,wrong,kind]=FIX[st.round];
  if(i!==wrong){st.bad=i;A.sound.miss();speak(i<wrong?`${W[said[i]]} is right there. Listen on.`:`Look back. Bear goes wrong before that.`);A.redraw();return}
  st.bad=null;st.ok=1;A.sound.pop();const lst=said.map((v,k)=>W[k+1]).join(', ');
  speak(kind==='skip'?`Yes! Bear skipped ${W[wrong+1]}. It goes ${lst}.`:`Yes! Bear said ${W[said[i]]} two times. It goes ${lst}.`);
  later([()=>{st.ok=0;st.round++;report()}],700)}
 function report(msg){const v=mode();let t='';
  if(v==='stairs'||v==='ten')t=st.n<total()?`Next is ${W[st.n+1]}.`:'All counted, in order.';
  else if(v==='back')t=st.n<5?`Next is ${W[5-st.n]}.`:'';
  else if(v==='gap')t=st.round<3?`Train ${st.round+1}: one, two, three, four, five, but one is missing.`:'All gaps filled.';
  else if(v==='fix')t=st.round<3?`Bear says: ${FIX[st.round][0].map(k=>W[k]).join(', ')}. Where is the slip?`:'Bear counts right now.';
  else t='Challenge time.';speak((msg?msg+' ':'')+t);buttons();st.onChange()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const v=mode();const b=(t,f,label)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':label||null},pad,t);e.onclick=f;return e};
  if((v==='stairs'||v==='ten')&&st.n<total())b(`⬆️ Say ${W[st.n+1]}`,()=>hop(st.n));
  if(v==='back'&&st.n<5)b(`🚀 Say ${W[5-st.n]}`,()=>hop(st.n));
  if(v==='gap'&&st.round<3)opts().forEach((x,j)=>b(`${x} ${W[x]}`,()=>pick(j),`Put ${W[x]} in the gap`));
  if(v==='fix'&&st.round<3)FIX[st.round][0].forEach((x,i)=>b(`🦆 ${i+1}: ${W[x]}`,()=>spot(i),`Duck ${i+1}, Bear says ${W[x]}`));A.redraw()}

 // ---------- canvas input ----------
 function down(p){const v=mode();st.at=p;st.from=p;
  if(v==='stairs'){for(let i=0;i<5;i++)if(inside(p,stairR(i)))hop(i);return false}
  if(v==='ten'){for(let i=0;i<10;i++)if(inside(p,stoneR(i)))hop(i);return false}
  if(v==='back'){for(let i=0;i<5;i++)if(inside(p,lightR(i)))hop(i);return false}
  if(v==='fix'&&st.round<3){const n=FIX[st.round][0].length;for(let i=0;i<n;i++)if(inside(p,duckR(i,n)))spot(i);return false}
  if(v==='gap'&&st.round<3){const j=[0,1,2].find(j=>inside(p,choR(j)));if(j!=null){st.held=j;st.bad=null;A.redraw();return true}}
  return false}
 function up(p){const j=st.held;if(j==null)return;const moved=st.from&&Math.hypot(p.x-st.from.x,p.y-st.from.y)>12,gi=GAPS[st.round]-1;
  if(!moved||inside(p,carR(gi)))pick(j);else{st.held=null;st.at=null;speak('Drop it on the gap in the train.');A.redraw()}}

 // ---------- steps ----------
 const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
 const fresh=()=>{st.tok++;st.onChange=()=>{};st.n=0;st.round=0;st.bad=null;st.held=null;st.at=null;st.ok=0;st.fly=0};
 const taps=n=>Array.from({length:n},()=>()=>hop(st.n));
 const steps=[
  {h:'Climb and count',p:'Tap each step to climb. Say each number with me.',task:'Climb 5 steps',
   show:()=>{steps[0].go();later(taps(5),450)},go:()=>{fresh();report();st.onChange=whenDone(0,()=>st.n>=5,'One, two, three, four, five. Same order every time.')}},
  {h:'What comes next?',p:'One number is missing from the train. Drag the right one in, or tap it.',
   predict:{q:'One, two, … what comes next?',opts:['four','three'],ans:1},task:'Fill 3 gaps',
   show:()=>{steps[1].go();later([0,1,2].map(()=>()=>pick(opts().indexOf(GAPS[st.round]))),500)},go:()=>{fresh();report();st.onChange=whenDone(1,()=>st.round>=3,'Each number has its own place. Three comes after two.')}},
  {h:'Silly Bear',p:'Bear counts the ducks. Tap the duck where he goes wrong.',
   predict:{q:'Bear says: one, two, four. Is that right?',opts:['Yes, that is fine','No, he missed three'],ans:1},task:'Fix 3 slips',
   show:()=>{steps[2].go();later([0,1,2].map(k=>()=>spot(FIX[k][1])),900)},go:()=>{fresh();report();st.onChange=whenDone(2,()=>st.round>=3,'No skipping, no saying a number twice.')}},
  {h:'Count to 10',p:'Hop the frog onto each stone. Say each number.',task:'Count to 10',
   show:()=>{steps[3].go();later(taps(10),300)},go:()=>{fresh();report();st.onChange=whenDone(3,()=>st.n>=10,'Six, seven, eight, nine, ten come after five.')}},
  {h:'Count back',p:'Count back for the rocket: five, four, three, two, one!',
   predict:{q:'We count back. Five, … what comes next?',opts:['six','four'],ans:1},task:'Blast off',
   show:()=>{steps[4].go();later(taps(5),450)},go:()=>{fresh();report();st.onChange=whenDone(4,()=>st.n>=5,'Back is the same names, the other way.')}},
  {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.onChange()});

 // ---------- challenge ----------
 const QS=[['One, two, … what comes next?','🧸',[['three','ok'],['four','skip'],['one','back']]],
  ['Three, four, … what comes next?','🦆',[['five','ok'],['six','skip'],['four','twice']]],
  ['Bear says: one, two, two, three. What went wrong?','🐻',[['He said two twice','ok'],['Nothing, it is right','fine'],['He missed four','skip']]],
  ['Six, seven, … what comes next?','🐸',[['eight','ok'],['nine','skip'],['six','back']]],
  ['Rocket count back: three, two, …?','🚀',[['one','ok'],['three','up'],['four','up']]],
  ['Which one is in the right order?','🔢',[['one, two, three','ok'],['one, three, two','mix'],['two, one, three','mix']]]];
 function slip(tag){let m='Say them in order: one, two, three, four, five.';
  if(tag==='skip')m='That jumps over a number. Say every number, one at a time.';
  if(tag==='back')m='That goes backwards. Counting up, the next number is bigger.';
  if(tag==='twice')m='That says a number twice. Each number comes once.';
  if(tag==='fine')m='Listen again. Two came twice. It goes one, two, three.';
  if(tag==='up')m='Counting back goes down. Three, two, one!';
  if(tag==='mix')m='The names always come in the same order: one, two, three.';
  return m}
 let qk=-1,stars=0;
 function pose(){qk++;const[q,e,ops]=QS[qk%QS.length],turn=qk%3;
  quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
 function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes!':'✗ '+slip(tag)}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}

 A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
   fresh();A.gest({down,move:p=>{st.at=p;A.redraw()},up});buttons()}});
 A.start()})})();
