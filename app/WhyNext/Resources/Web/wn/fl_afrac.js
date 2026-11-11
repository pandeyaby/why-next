/* Flagship 32 – simplifying algebraic fractions. A fraction bar on the canvas holds the top and the bottom. At first each
   side is shown as loose terms (x², + 5x, + 6); "Factorise" turns a side into factor cards, and cards for the same factor
   share a colour. The learner drags a card from one side onto its twin on the other side (or taps one, then the other, or
   presses Cancel a common factor) and the pair is struck out. Dragging a term instead (the x of x + 2 onto the x below) is
   refused with the reason: a term is added, not multiplied, so it cannot cancel. A number line under the bar tests any
   x: it shows the value of the original fraction and of what is left, so the learner sees that cancelling factors keeps
   the value, and that the original is undefined where its bottom is 0 even after the factor has gone (x ≠ −2).
   Predictions target cancelling terms, "x² − 9 cannot be used", and crossing out x's across a product. Challenge: pick the
   simplified form; feedback names the slip (cancelled terms, kept the wrong bracket, divided one term only, sign slip in
   the factorising, a leftover factor dropped, or the answer upside down) and tests one value of x to prove it. */
(()=>{const XMIN=-6,XMAX=6,MINUS='−';
 const N=v=>v<0?MINUS+(-v):String(v);
 const fmt=v=>{if(!isFinite(v))return'undefined';const r=Math.round(v*1000)/1000;return N(r)};
 // one factor from its id: 'x+2' → (x + 2), 'x-3' → (x − 3), 'x' → x, '3' → 3
 function factor(id){if(/^-?\d+$/.test(id)){const n=+id;return{id,s:N(n),f:()=>n}}if(id==='x')return{id,s:'x',f:x=>x};
  const m=id.match(/^x([+-])(\d+)$/),b=(m[1]==='-'?-1:1)*+m[2];return{id,s:`(x ${b<0?MINUS:'+'} ${Math.abs(b)})`,f:x=>x+b}}
 const prod=(list,x)=>list.reduce((p,f)=>p*f.f(x),1);
 const bare=s=>s.replace(/^\((.*)\)$/,'$1');
 // a product as text: one factor loses its brackets, none is 1
 const prodText=list=>!list.length?'1':list.length===1?bare(list[0].s):list.map(f=>f.s).join('');
 const fracText=(top,bot)=>{const t=prodText(top);if(!bot.length)return t;const b=prodText(bot),w=s=>/[ ]/.test(s)&&!/^\(.*\)$/.test(s)?`(${s})`:s;return`${w(t)}/${w(b)}`};
 const PAL=['cy','vi','gr','or','pk'];
VIS.reg('flagafrac',c=>{let A,chal,sand,read,btns;const zones=[];
 const st={e:null,top:null,bot:null,ft:false,fb:false,x:3,sel:null,drag:null,goal:'',trapped:false,won:false,run:0,glow:0,chk:()=>{},mode:'teach'};
 const tell=t=>{c.say(t);if(read)read.textContent=t};
 // ---------- the expression on the bar ----------
 function load(e,opt={}){st.run++;st.e=e;st.top=e.tf.map(id=>({...factor(id),gone:false}));st.bot=e.bf.map(id=>({...factor(id),gone:false}));
  st.ft=!!e.mul||e.tt.length<2;st.fb=!!e.mul||e.bt.length<2;st.sel=null;st.drag=null;st.trapped=false;st.won=false;
  if(opt.done){st.ft=st.fb=true;cancelAll(true)}if(opt.x!=null)st.x=opt.x;sync()}
 const rawTop=e=>e.mul?prodText(e.tf.map(factor)):e.tt.join(' '),rawBot=e=>e.mul?prodText(e.bf.map(factor)):e.bt.join(' ');
 const wrap=t=>/ /.test(t)?`(${t})`:t,title=e=>e.mul?e.mul:`${wrap(rawTop(e))} ÷ ${wrap(rawBot(e))}`;
 const left=row=>row.filter(f=>!f.gone);
 const colourOf=id=>{const ids=[...new Set(st.e.tf.concat(st.e.bf))];return A.col[PAL[ids.indexOf(id)%PAL.length]]};
 const origValue=x=>prod(st.top,x)/prod(st.bot,x),nowValue=x=>prod(left(st.top),x)/prod(left(st.bot),x);
 const origBotZero=x=>prod(st.bot,x)===0;
 // a pair still waiting to cancel, or null
 function commonPair(){for(const t of st.top){if(t.gone)continue;const b=st.bot.find(b=>!b.gone&&b.id===t.id);if(b)return[t,b]}return null}
 const simplified=()=>st.ft&&st.fb&&!commonPair();
 const result=()=>fracText(left(st.top),left(st.bot));
 function cancelAll(quiet){let p;while((p=commonPair())){p[0].gone=p[1].gone=true}if(!quiet)status()}
 // ---------- actions ----------
 function factorise(row){const e=st.e,isTop=row==='t';if(isTop?st.ft:st.fb){tell(`The ${isTop?'top':'bottom'} is already in factors.`);return}
  if(isTop)st.ft=true;else st.fb=true;A.sound.pop();const list=isTop?st.top:st.bot,raw=isTop?rawTop(e):rawBot(e);
  tell(list.length===1?`${raw} does not factorise any further: the whole of ${raw} is one factor.`:`${raw} = ${list.map(f=>f.s).join('')}. Matching factors have the same colour.`);sync();st.chk()}
 function cancel(a,b){if(a.id!==b.id){A.sound.miss();tell(`${a.s} and ${b.s} are different factors, so they do not cancel. Only the same factor on the top and the bottom divides out.`);return}
  a.gone=b.gone=true;A.sound.tick();st.glow=1;A.tween(st,{glow:0},700,'out');status();sync();st.chk()}
 function cancelNext(){if(!st.ft||!st.fb){tell('Factorise first. Only factors can cancel, and the loose terms are not factors yet.');A.sound.miss();return}
  const p=commonPair();if(!p){tell(`Nothing else cancels: no factor is on both the top and the bottom. The answer is ${result()}.`);return}cancel(p[0],p[1])}
 // a term was dragged or tapped onto the other side: refuse and say why
 function trap(term,other){A.sound.miss();const e=st.e,x0=4,o=fmt(origValue(x0));const same=other&&other.replace(/^[+−] /,'')===term.replace(/^[+−] /,'');
  const t=term.replace(/^[+−] /,'');tell(`${t} is a term: it is added or taken away, not multiplied, so it cannot cancel${same?` with the ${t} on the other side`:''}. `+
   `Only a factor of the whole top and the whole bottom can cancel. At x = ${x0} the fraction is ${o}; crossing out terms would change that.`);
  st.trapped=true;sync();st.chk()}
 function setX(v){st.x=Math.max(XMIN,Math.min(XMAX,Math.round(v)));status();sync();st.chk()}
 // what the bar says right now, in words
 function status(){const x=st.x,ob=origBotZero(x);let t=`x = ${N(x)}: the original is ${ob?'undefined, because its bottom is 0':`${fmt(prod(st.top,x))} ÷ ${fmt(prod(st.bot,x))} = ${fmt(origValue(x))}`}. `;
  if(st.ft&&st.fb&&st.top.concat(st.bot).some(f=>f.gone))t+=`What is left, ${result()}, gives ${fmt(nowValue(x))}. `+(ob&&isFinite(nowValue(x))?`So the simplified form still needs x ≠ ${N(x)}.`:'');
  else if(simplified())t+=`Nothing cancels: ${result()} is already in its simplest form.`;tell(t.trim())}
 function describe(){const side=(row,f,terms)=>f?row.map(k=>k.s+(k.gone?' (cancelled)':'')).join(', '):terms.join(' ');
  return `Fraction bar. Top: ${side(st.top,st.ft,st.e.tt)}. Bottom: ${side(st.bot,st.fb,st.e.bt)}. ${simplified()?'Simplified: '+result()+'.':'Not simplified yet.'} Test value x = ${N(st.x)}: original ${origBotZero(st.x)?'undefined':fmt(origValue(st.x))}.`}
 function sync(){if(!A||!st.e)return;A.cv.setAttribute('aria-label',describe());if(btns){btns.querySelector('[data-k=ft]').disabled=st.ft;btns.querySelector('[data-k=fb]').disabled=st.fb;
  btns.querySelector('[data-k=xm]').disabled=st.x<=XMIN;btns.querySelector('[data-k=xp]').disabled=st.x>=XMAX}A.redraw()}
 // ---------- layout and drawing ----------
 function geo(A){const nar=A.narrow,cx=nar?A.W/2:A.W*.38,top=nar?118:104,ch=nar?34:38,fs=nar?16:19;
  return{nar,cx,ty:top,by:top+ch/2+12,bty:top+ch+24,ch,fs,rx:nar?A.W/2:A.W*.76,ry:nar?top+ch*2+60:top+ch/2+12,nl:A.H-(nar?54:50)}}
 function chips(A,row,isTop,g){const{ctx}=A,list=isTop?(st.ft?st.top:null):(st.fb?st.bot:null),terms=isTop?st.e.tt:st.e.bt;
  ctx.font=`700 ${g.fs}px system-ui`;const items=list?list.map((f,i)=>({kind:'card',i,s:f.s,f})):terms.map((s,i)=>({kind:'term',i,s}));
  const pad=12,gap=list?4:8,ws=items.map(it=>ctx.measureText(it.s).width+pad*2);let total=ws.reduce((a,b)=>a+b,0)+gap*(items.length-1);
  let x=g.cx-total/2;return items.map((it,k)=>{const r={...it,row,x,y:(isTop?g.ty:g.bty)-g.ch/2,w:ws[k],h:g.ch};x+=ws[k]+gap;return r})}
 function drawChip(A,r,g,dx=0,dy=0){const{ctx,col:C,paint:P}=A,x=r.x+dx,y=r.y+dy,sel=st.sel&&st.sel.row===r.row&&st.sel.i===r.i&&st.sel.kind===r.kind;
  if(r.kind==='card'){const raw=colourOf(r.f.id),base=C.dark?A.mix(raw,'#000000',.38):A.mix(raw,'#000000',.08),gone=r.f.gone;ctx.globalAlpha=gone?.32:1;P.shadow(gone?0:6,2,.18);ctx.fillStyle=P.lin(x,y,x,y+r.h,[[0,A.mix(base,'#ffffff',.15)],[1,base]]);P.rrect(x,y,r.w,r.h,8);ctx.fill();P.noShadow();
   ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`700 ${g.fs}px system-ui`;ctx.fillText(r.s,x+r.w/2,y+r.h/2+1);
   if(gone){ctx.strokeStyle=C.rd;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x+4,y+r.h-4);ctx.lineTo(x+r.w-4,y+4);ctx.stroke()}ctx.globalAlpha=1}
  else{ctx.fillStyle=A.alpha(C.tx,.08);P.rrect(x,y,r.w,r.h,8);ctx.fill();ctx.strokeStyle=A.alpha(C.tx,.35);ctx.setLineDash([4,3]);ctx.lineWidth=1.2;ctx.stroke();ctx.setLineDash([]);
   ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`600 ${g.fs}px system-ui`;ctx.fillText(r.s,x+r.w/2,y+r.h/2+1)}
  if(sel){ctx.strokeStyle=C.am;ctx.lineWidth=3;P.rrect(x-3,y-3,r.w+6,r.h+6,10);ctx.stroke()}}
 function draw(A){const{ctx,W,H,col:C,paint:P}=A,g=geo(A);zones.length=0;
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);if(!st.e)return;
  ctx.textAlign='left';ctx.textBaseline='alphabetic';const f1=g.nar?15:19;ctx.font=`700 ${f1}px system-ui`;ctx.fillStyle=C.tx;
  const head='Simplify '+title(st.e);let fs1=f1;while(ctx.measureText(head).width>W-28&&fs1>11){fs1--;ctx.font=`700 ${fs1}px system-ui`}ctx.fillText(head,14,f1+12);
  ctx.font=`600 ${g.nar?12:13}px system-ui`;ctx.fillStyle=C.mu;ctx.fillText(st.ft&&st.fb?'Drag a card onto its twin (same colour) to cancel it':'Tap “factorise” on a side with loose terms',14,f1+34);
  const tr=chips(A,'t',true,g),br=chips(A,'b',false,g),all=tr.concat(br);
  const span=Math.max(...all.map(r=>r.x+r.w))-Math.min(...all.map(r=>r.x));ctx.strokeStyle=C.tx;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(g.cx-span/2-10,g.by);ctx.lineTo(g.cx+span/2+10,g.by);ctx.stroke();
  for(const r of all){if(st.drag&&st.drag.row===r.row&&st.drag.i===r.i&&st.drag.kind===r.kind&&st.drag.moved)continue;drawChip(A,r,g);zones.push(r)}
  if(st.glow>0){ctx.strokeStyle=A.alpha(C.gr,st.glow);ctx.lineWidth=4;P.rrect(g.cx-span/2-16,g.ty-g.ch/2-8,span+32,g.bty-g.ty+g.ch+16,12);ctx.stroke()}
  // factorise pills beside a side that still shows loose terms
  const pill=(row,y)=>{const b=P.label('factorise ▸',Math.min(W-60,g.cx+span/2+(g.nar?8:22)),y,{align:'left',font:'700 12px system-ui',bg:A.alpha(C.am,.95),col:'#111'});zones.push({kind:'fac',row,x:b.x-6,y:b.y-10,w:b.w+12,h:b.h+20})};
  if(!st.ft)pill('t',g.nar?g.ty-g.ch/2-12:g.ty);if(!st.fb)pill('b',g.nar?g.bty+g.ch/2+12:g.bty);
  // result once nothing more cancels
  if(simplified()){const lt=left(st.top),lb=left(st.bot);ctx.fillStyle=C.gr;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`700 ${g.fs+2}px system-ui`;
   if(!lb.length)ctx.fillText('= '+prodText(lt)+'  ✓',g.rx,g.ry);else{const t=prodText(lt),b=prodText(lb),w=Math.max(ctx.measureText(t).width,ctx.measureText(b).width);
    ctx.fillText('=',g.rx-w/2-18,g.ry);ctx.fillText(t,g.rx,g.ry-18);ctx.fillText(b,g.rx,g.ry+18);ctx.strokeStyle=C.gr;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(g.rx-w/2-4,g.ry);ctx.lineTo(g.rx+w/2+4,g.ry);ctx.stroke();ctx.fillText('✓',g.rx+w/2+18,g.ry)}}
  // the dragged chip follows the finger
  if(st.drag&&st.drag.moved){const r=st.drag.r;drawChip(A,r,g,st.drag.px-st.drag.ox-r.x,st.drag.py-st.drag.oy-r.y)}
  // number line tester
  const L=28,R=W-28,y=g.nl,px=v=>L+(v-XMIN)*(R-L)/(XMAX-XMIN);ctx.strokeStyle=A.alpha(C.tx,.6);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();
  ctx.font='600 11px system-ui';ctx.textAlign='center';ctx.textBaseline='top';for(let v=XMIN;v<=XMAX;v++){const bad=origBotZero(v);ctx.fillStyle=bad?C.rd:C.mu;ctx.fillRect(px(v)-1,y-5,2,10);if(g.nar&&v%2&&v!==st.x)continue;ctx.fillText(N(v),px(v),y+8)}
  const hx=px(st.x),bad=origBotZero(st.x),v1=bad?'undefined':fmt(origValue(st.x)),v2=fmt(nowValue(st.x));P.ball(hx,y,10,bad?C.rd:C.am);zones.push({kind:'nl',x:L-14,y:y-22,w:R-L+28,h:44,px,L,R});
  const touched=st.top.concat(st.bot).some(f=>f.gone);const txt=`x = ${N(st.x)}:  original ${v1}`+(touched?`   ·   left ${v2}`:'');
  P.label(txt,W/2,y-26,{font:'600 13px system-ui',bg:A.alpha(bad?C.rd:C.tx,.88),col:bad?'#fff':C.pn})}
 // ---------- gestures: drag a card (or term) onto the other side; tap = select then tap the partner ----------
 const hit=p=>zones.slice().reverse().find(z=>p.x>=z.x&&p.x<=z.x+z.w&&p.y>=z.y&&p.y<=z.y+z.h);
 function drop(a,b){if(!b||b.row===a.row||(b.kind!=='card'&&b.kind!=='term'))return false;
  if(a.kind==='term')trap(a.s,b.kind==='term'?b.s:b.s);else if(b.kind==='term'){A.sound.miss();tell(`Factorise the ${b.row==='t'?'top':'bottom'} first: ${b.s.replace(/^[+−] /,'')} is a loose term, and a factor can only cancel a whole factor.`)}
  else if(a.f.gone||b.f.gone)tell('That factor has already been cancelled.');else cancel(a.row==='t'?a.f:b.f,a.row==='t'?b.f:a.f);return true}
 function tap(z){if(z.kind==='fac'){factorise(z.row);return}if(z.kind==='nl')return;
  if(st.sel&&st.sel.row!==z.row){const a=st.sel;st.sel=null;drop(a,z);sync();return}st.sel=z;A.sound.tick();tell(`${z.s} selected. Now tap ${z.kind==='card'?'its twin':'something'} on the ${z.row==='t'?'bottom':'top'}.`);sync()}
 // ---------- Show me: factorise, then cancel pair by pair ----------
 function walk(fin){const id=++st.run,q=[];if(!st.ft)q.push(()=>factorise('t'));if(!st.fb)q.push(()=>factorise('b'));
  const next=()=>{if(id!==st.run)return;const f=q.shift();if(f){f();A.tween({k:0},{k:1},420,'io',next);return}const p=commonPair();if(p){cancel(p[0],p[1]);A.tween({k:0},{k:1},420,'io',next);return}fin&&fin()};next()}
 function walkX(to,fin){const id=++st.run;const next=()=>{if(id!==st.run)return;if(st.x===to){fin&&fin();return}setX(st.x+Math.sign(to-st.x));A.sound.tick();A.tween({k:0},{k:1},140,'io',next)};next()}
 const goal=(kind,msg,i)=>{st.chk=()=>{if(!A.extra.querySelector('.fl-task')||st.won)return;const ok=kind==='simp'?simplified():kind==='trap'?st.trapped:origBotZero(st.x);
   if(ok){st.won=true;A.done(msg+A.reveal(i))}}};
 const E1={tt:['x²','+ 5x','+ 6'],bt:['x','+ 2'],tf:['x+2','x+3'],bf:['x+2']},E2={tt:['x','+ 2'],bt:['x'],tf:['x+2'],bf:['x']},
  E3={tt:['2x','+ 6'],bt:['x²','− 9'],tf:['2','x+3'],bf:['x+3','x-3']},E4={tt:[],bt:[],tf:['x+1','x-2'],bf:['x-2','x+5'],mul:'(x + 1)/(x − 2) × (x − 2)/(x + 5)'};
 const steps=[
  {h:'Cancel factors, not terms',p:'A fraction simplifies when the top and the bottom share a factor: something that multiplies the whole of each. Factorise both sides first, then cancel the shared factor.',
   predict:{q:'What is (x² + 5x + 6) ÷ (x + 2) simplified?',opts:['x² + 5x + 3','x + 3','It does not simplify'],ans:1},
   task:'Factorise the top, then drag the (x + 2) card onto its twin below',show:()=>walk(),
   go:()=>{load(E1,{x:3});goal('simp','x² + 5x + 6 = (x + 2)(x + 3), so (x + 2) cancels and x + 3 is left. The test value agrees: at x = 3, 30 ÷ 5 = 6 and 3 + 3 = 6.',0)}},
  {h:'A term is not a factor',p:'In x + 2 the x is added to 2. It is a term, not a factor, so it cannot be crossed out against an x on the other side.',
   predict:{q:'Can the x’s in (x + 2)/x cancel to leave 2?',opts:['Yes, it equals 2','No, it stays (x + 2)/x','Yes, it equals 3'],ans:1},
   task:'Try it: drag the x from x + 2 onto the x on the bottom',show:()=>{const t={kind:'term',row:'t',i:0,s:'x'};trap(t.s,'x')},
   go:()=>{load(E2,{x:4});goal('trap','At x = 4 the fraction is 6 ÷ 4 = 1.5, not 2. (x + 2)/x is already as simple as it gets; you may split it as 1 + 2/x, but nothing cancels.',1)}},
  {h:'Factorise both sides',p:'Look for every kind of factor: a number common to every term (2x + 6 = 2(x + 3)) and a difference of two squares (x² − 9 = (x + 3)(x − 3)).',
   predict:{q:'What is (2x + 6) ÷ (x² − 9) simplified?',opts:['2/(x − 3)','(x − 3)/2','−6/9'],ans:0},
   task:'Factorise the top and the bottom, then cancel the shared factor',show:()=>walk(),
   go:()=>{load(E3,{x:5});goal('simp','2(x + 3) over (x + 3)(x − 3) leaves 2/(x − 3). At x = 5: 16 ÷ 16 = 1, and 2 ÷ 2 = 1.',2)}},
  {h:'Multiplying fractions',p:'To multiply, put every top factor over every bottom factor on one bar. Then a factor on any top cancels the same factor on any bottom.',
   predict:{q:'(x + 1)/(x − 2) × (x − 2)/(x + 5) = ?',opts:['1/5','(x + 1)/(x + 5)','(x + 1)(x − 2)'],ans:1},
   task:'Cancel the factor that is on a top and a bottom',show:()=>walk(),
   go:()=>{load(E4,{x:3});goal('simp','(x − 2) cancels, leaving (x + 1)/(x + 5). Crossing out the x’s to get 1/5 would be cancelling terms: at x = 3 the product is 4/8 = 0.5, not 0.2.',3)}},
  {h:'Values that are not allowed',p:'Cancelling keeps the value everywhere the original works. But the original has a bottom of 0 somewhere, and that x is still not allowed after the factor has gone.',
   task:'Move x to the value where the original cannot be worked out',show:()=>walkX(-2),
   go:()=>{load(E1,{done:true,x:2});goal('zero','At x = −2 the original is 0 ÷ 0: undefined. x + 3 gives 1 there, so the full answer is x + 3, x ≠ −2.',4)}},
  {h:'Sandbox',p:'Pick an expression, factorise, cancel and test values. Try cancelling a term on purpose and read why it is refused.',go:()=>{st.chk=()=>{};newSand()}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.chk()});
 const SAND=[E1,E3,E4,{tt:['x²','− 16'],bt:['x','+ 4'],tf:['x+4','x-4'],bf:['x+4']},{tt:['3x','+ 12'],bt:['x²','+ 4x'],tf:['3','x+4'],bf:['x','x+4']},{tt:['x²','+ x','− 6'],bt:['x²','− 4'],tf:['x+3','x-2'],bf:['x+2','x-2']},{tt:['x','+ 5'],bt:['5'],tf:['x+5'],bf:['5']}];let si=-1;
 function newSand(){si=(si+1)%SAND.length;st.chk=()=>{};load(SAND[si],{x:3});tell(`New expression: ${title(SAND[si])}. Factorise and cancel.`)}
 A=FK.shell(c,{steps,ratio:.6,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;sand.hidden=A.step!==5;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   btns=E('div',{class:'fl-ctl',role:'group','aria-label':'Work on the fraction'},box);
   const mk=(label,aria,k,f)=>{const b=E('button',{type:'button',class:'lbtn sm ghost','aria-label':aria,'data-k':k},btns,label);b.onclick=f};
   mk('Factorise top','Factorise the top of the fraction','ft',()=>factorise('t'));mk('Factorise bottom','Factorise the bottom of the fraction','fb',()=>factorise('b'));
   mk('Cancel a common factor','Cancel a factor that is on the top and the bottom','cn',cancelNext);
   mk('x −1','Test value x down by 1','xm',()=>setX(st.x-1));mk('x +1','Test value x up by 1','xp',()=>setX(st.x+1));
   mk('Reset','Start this fraction again','rs',()=>{load(st.e);st.chk()});
   sand=E('div',{class:'fl-ctl',role:'group','aria-label':'Sandbox'},box);const nb=E('button',{type:'button',class:'lbtn sm'},sand,'New expression');nb.onclick=newSand;
   chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const z=hit(p);if(!z)return false;if(z.kind==='nl'){st.drag={nl:z};setX(XMIN+(p.x-z.L)*(XMAX-XMIN)/(z.R-z.L));return true}
     if(z.kind==='fac'){tap(z);return false}if(z.kind==='card'&&z.f.gone)return false;st.drag={r:z,row:z.row,i:z.i,kind:z.kind,ox:p.x-z.x,oy:p.y-z.y,px:p.x,py:p.y,sx:p.x,sy:p.y,moved:false};return true},
    move:p=>{const d=st.drag;if(!d)return;if(d.nl){const v=Math.round(XMIN+(p.x-d.nl.L)*(XMAX-XMIN)/(d.nl.R-d.nl.L));if(v!==st.x){A.sound.tick();setX(v)}return}
     d.px=p.x;d.py=p.y;if(Math.hypot(p.x-d.sx,p.y-d.sy)>6)d.moved=true;A.redraw()},
    up:p=>{const d=st.drag;st.drag=null;if(!d||d.nl){A.redraw();return}if(!d.moved){tap(d.r);return}st.sel=null;
     const z=p&&zones.find(z=>(z.kind==='card'||z.kind==='term')&&p.x>=z.x&&p.x<=z.x+z.w&&p.y>=z.y-10&&p.y<=z.y+z.h+10);if(!drop(d.r,z))tell('Drop it on a card on the other side of the bar.');A.redraw()}});
   sync()}});
 // ---------- challenge: pick the simplified form; a wrong pick names the slip and tests a value ----------
 const CH=[
  {e:{tt:['x²','+ 7x','+ 12'],bt:['x','+ 4'],tf:['x+3','x+4'],bf:['x+4']},opts:[{t:'x + 4',v:x=>x+4,k:'kept'},{t:'x + 3',v:x=>x+3,ok:1},{t:'x² + 7x + 3',v:x=>x*x+7*x+3,k:'part',w:'12 ÷ 4 = 3'}]},
  {e:{tt:['x','+ 5'],bt:['5'],tf:['x+5'],bf:['5']},opts:[{t:'x',v:x=>x,k:'term',w:'the two 5s'},{t:'x + 1',v:x=>x+1,k:'part',w:'5 ÷ 5 = 1'},{t:'It is already simplest',v:x=>(x+5)/5,ok:1}]},
  {e:{tt:['x²','− 16'],bt:['x','− 4'],tf:['x+4','x-4'],bf:['x-4']},opts:[{t:'4',v:()=>4,k:'term',w:'x² against x and 16 against 4'},{t:'x + 4',v:x=>x+4,ok:1},{t:'x − 4',v:x=>x-4,k:'kept'}]},
  {e:{tt:['3x','+ 12'],bt:['x²','+ 4x'],tf:['3','x+4'],bf:['x','x+4']},opts:[{t:'3/x',v:x=>3/x,ok:1},{t:'3',v:()=>3,k:'lost',w:'x',side:'on the bottom'},{t:'x/3',v:x=>x/3,k:'flip'}]},
  {e:{tt:[],bt:[],tf:['x+1','x-3'],bf:['x-3','x+2'],mul:'(x + 1)/(x − 3) × (x − 3)/(x + 2)'},opts:[{t:'1/2',v:()=>.5,k:'term',w:'the x’s'},{t:'x + 1',v:x=>x+1,k:'lost',w:'(x + 2)',side:'on the bottom'},{t:'(x + 1)/(x + 2)',v:x=>(x+1)/(x+2),ok:1}]},
  {e:{tt:['x²','+ x','− 6'],bt:['x²','− 4'],tf:['x+3','x-2'],bf:['x+2','x-2']},opts:[{t:'(x + 3)/(x + 2)',v:x=>(x+3)/(x+2),ok:1},{t:'(x − 3)/(x − 2)',v:x=>(x-3)/(x-2),k:'sign',w:'(x − 3)(x + 2) = x² − x − 6, not x² + x − 6'},{t:'(x − 6)/(−4)',v:x=>(x-6)/-4,k:'term',w:'the x² terms'}]}];let qi=-1;
 const factText=e=>`${title(e)} = ${e.tf.map(id=>factor(id).s).join('')} over ${e.bf.map(id=>factor(id).s).join('')}`;
 const commonText=e=>{const b=e.bf.slice(),out=[];e.tf.forEach(id=>{const k=b.indexOf(id);if(k>=0){out.push(factor(id).s);b.splice(k,1)}});return out.length?out.join(' and '):'no factor'};
 // the factorised form in words; when nothing is shared, say why instead
 const factSay=e=>commonText(e)==='no factor'?`${rawTop(e)} does not factorise, so it shares no factor with ${rawBot(e)}`:factText(e);
 function newChal(){qi=(qi+1)%CH.length;const it=CH[qi];st.chk=()=>{};load(it.e,{x:3});tell(`Challenge: simplify ${title(it.e)}.`);
  chal.innerHTML=`<p><b>Simplify ${title(it.e)}.</b> Work on the bar if you like, then pick the answer.</p><div class="fl-ctl" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-ctl');it.opts.forEach(o=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,o.t);b.onclick=()=>judge(o)});sync()}
 // the first test value where the original and the wrong answer both exist and differ
 const witness=(o)=>[3,5,1,7,2].find(x=>!origBotZero(x)&&isFinite(o.v(x))&&Math.abs(o.v(x)-origValue(x))>1e-9);
 function judge(o){const it=CH[qi],e=it.e,fb=chal.querySelector('.fl-fb'),ans=it.opts.find(z=>z.ok).t;if(st.won)return;let m;
  if(o.ok){st.won=true;st.run++;st.ft=st.fb=true;cancelAll(true);sync();A.win();fb.innerHTML=`✓ ${factSay(e)}${commonText(e)==='no factor'?'':', and '+commonText(e)+' cancels'}. <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();const ce=commonText(e),fe=factSay(e);
  if(o.k==='term')m=`${o.t} comes from crossing out ${o.w}. Those are terms: they are added or taken away, not multiplied, so they cannot cancel. ${e.mul?'Cancel whole factors only':'Factorise first'}: ${fe}.`;
  else if(o.k==='kept')m=`${fe}. The factor on both the top and the bottom is ${ce}, so that is the one that goes. ${o.t} keeps it and throws away the other bracket.`;
  else if(o.k==='part')m=`${o.w}, but that divides only one term. Dividing the top means dividing every term, and that only works with factors: ${fe}.`;
  else if(o.k==='sign')m=`Check the factorising by expanding: ${o.w}. With the right brackets, ${fe}.`;
  else if(o.k==='lost')m=`After ${ce} cancels, ${o.w} is still left ${o.side}. Nothing cancels it, so it stays: the answer is ${ans}.`;
  else m=`That is upside down. Factors on the top stay on the top: ${fe}, so the answer is ${ans}.`;
  const x0=witness(o);if(x0!=null)m+=` Test x = ${x0}: the original gives ${fmt(origValue(x0))}, but your answer gives ${fmt(o.v(x0))}.`;
  fb.innerHTML=m+' <button type="button" class="linkish fl-hint">Show me</button>';fb.querySelector('.fl-hint').onclick=()=>{load(e,{x:3});walk(()=>{st.won=true;fb.textContent=`${fe}. ${ce==='no factor'?'Nothing cancels':ce+' cancels'}, so the answer is ${ans}.`})}}
 A.start()})})();
