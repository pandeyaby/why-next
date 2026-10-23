/* Flagship 21 – evaluating expressions with negative values. A substitution machine: drag the "x = −3" chip into an
   expression (or press the button) and every x becomes (−3), in brackets. Then the learner works it out one operation at a
   time by tapping an operator on the canvas or its button below. Only an operation whose inputs are already numbers can be
   done, so tapping one that is not ready names what has to come first (powers, then ×, then + and − left to right). Each
   result is written on a new line, like written working, with exact fractions. Predictions target "(−3)² = −9",
   "−x² = (−x)²", "5 − (−6) = −1" and "2x² = (2x)²". Challenge: type the value of a new expression, with feedback that
   names the slip: a negative squared to a negative, −x² read as (−x)², a dropped sign, a − (−b) done as a − b, or 2x read
   as 2 + x. */
(()=>{const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
 const R=(n,d=1)=>{if(d<0){n=-n;d=-d}const g=gcd(n,d);return{n:n/g,d:d/g}};
 const add=(a,b)=>R(a.n*b.d+b.n*a.d,a.d*b.d),sub=(a,b)=>R(a.n*b.d-b.n*a.d,a.d*b.d),mul=(a,b)=>R(a.n*b.n,a.d*b.d),neg=a=>R(-a.n,a.d);
 const pw=(a,k)=>{let r=R(1);for(let i=0;i<k;i++)r=mul(r,a);return r},val=a=>a.n/a.d,isNeg=a=>a.n<0,absR=a=>R(Math.abs(a.n),a.d);
 const fmt=a=>(a.n<0?'−':'')+Math.abs(a.n)+(a.d>1?'/'+a.d:'');
 const SUP={2:'²',3:'³',4:'⁴'},OPW={'+':'+','-':'−','*':'×'};
 /* ---------- a tiny parser: x, numbers, + − ×, implicit 2x, ^, brackets, a minus in front ---------- */
 let uid=0;
 function parse(src){const s=src.replace(/\s+/g,'');let i=0;const peek=()=>s[i];
  const num=()=>{let j=i;while(/[\d.]/.test(s[i]||''))i++;return{t:'n',v:R(+s.slice(j,i)),id:++uid}};
  function atom(){if(peek()==='('){i++;const e=expr();i++;return e}if(peek()==='x'){i++;return{t:'x',id:++uid}}return num()}
  function power(){const b=atom();if(peek()==='^'){i++;const e=+s[i++];return{t:'p',b,e,id:++uid}}return b}
  function unary(){if(peek()==='-'){i++;const a=unary();if(a.t==='n')return{t:'n',v:neg(a.v),id:a.id};return{t:'u',a,id:++uid}}return power()}
  function term(){let l=unary();for(;;){if(peek()==='*'){i++;l={t:'b',op:'*',l,r:unary(),id:++uid}}else if(peek()==='x'||peek()==='('){l={t:'b',op:'*',imp:true,l,r:power(),id:++uid}}else return l}}
  function expr(){let l=term();while(peek()==='+'||peek()==='-'){const op=s[i++];l={t:'b',op,l,r:term(),id:++uid}}return l}
  return expr()}
 const prec=n=>n.t==='b'?(n.op==='*'?2:1):n.t==='u'?1.5:n.t==='p'?3:4;
 const clone=n=>JSON.parse(JSON.stringify(n));
 /* Tokens for one line of working. Negative numbers get brackets unless they lead the line or a + / − chain. */
 function toks(n,free,out=[]){const par=(c,need,f)=>{if(need)out.push({s:'(',k:'par'});toks(c,need?true:f,out);if(need)out.push({s:')',k:'par'})};
  if(n.t==='n'){const br=isNeg(n.v)&&!free;if(br)out.push({s:'(',k:'par',sub:n.sub});out.push({s:fmt(n.v),k:'num',node:n,sub:n.sub,fresh:n.fresh});if(br)out.push({s:')',k:'par',sub:n.sub})}
  else if(n.t==='x')out.push({s:'x',k:'x',node:n});
  else if(n.t==='b'){const p=prec(n);par(n.l,prec(n.l)<p,free&&n.op!=='*');const hid=n.imp&&(n.r.t==='x'||(n.r.t==='p'&&n.r.b.t==='x'))&&n.l.t==='n'&&!isNeg(n.l.v);
   out.push({s:hid?'':n.op==='*'?' × ':` ${OPW[n.op]} `,k:'op',node:n});par(n.r,prec(n.r)<p||(prec(n.r)===p&&n.op==='-'),false)}
  else if(n.t==='p'){par(n.b,prec(n.b)<4,false);out.push({s:SUP[n.e]||'^'+n.e,k:'sup',node:n})}
  else if(n.t==='u'){out.push({s:'−',k:'op',node:n});if(n.a.t==='n'&&!isNeg(n.a.v)){out.push({s:'(',k:'par'});toks(n.a,true,out);out.push({s:')',k:'par'})}else par(n.a,prec(n.a)<2,false)}
  return out}
 const text=(n,free=true)=>toks(n,free).map(t=>t.s).join('').replace(/\s+/g,' ').trim();
 const ops=(n,a=[])=>{if(n.t==='b'){ops(n.l,a);a.push(n);ops(n.r,a)}else if(n.t==='p'){ops(n.b,a);a.push(n)}else if(n.t==='u'){a.push(n);ops(n.a,a)}return a};
 const hasX=n=>n.t==='x'||(n.t==='b'&&(hasX(n.l)||hasX(n.r)))||(n.t==='p'&&hasX(n.b))||(n.t==='u'&&hasX(n.a));
 const kids=n=>n.t==='b'?[n.l,n.r]:n.t==='p'?[n.b]:n.t==='u'?[n.a]:[];
 const ready=n=>kids(n).every(k=>k.t==='n');
 /* Evaluate with the right rules, or with one named slip switched on. */
 function ev(n,x,slip){const E=k=>ev(k,x,slip);
  if(n.t==='n')return n.v;if(n.t==='x')return slip==='drop'?absR(x):x;
  if(n.t==='p'){const b=E(n.b);if(slip==='sqneg'&&isNeg(b))return neg(pw(absR(b),n.e));return pw(b,n.e)}
  if(n.t==='u'){if(slip==='negsq'&&n.a.t==='p')return pw(neg(E(n.a.b)),n.a.e);return neg(E(n.a))}
  const l=E(n.l),r=E(n.r);if(n.op==='+')return add(l,r);if(n.op==='-')return slip==='subneg'&&isNeg(r)?add(l,r):sub(l,r);
  return slip==='impadd'&&n.imp&&n.r.t==='x'?add(l,r):mul(l,r)}
 const same=(a,b)=>a.n===b.n&&a.d===b.d;
VIS.reg('flagsub',c=>{let A,chal,sand,read,btnRow,subBtn,undoBtn,resetBtn;const hits=[];
 const st={run:0,src:'5-2x',x:R(-3),tree:parse('5-2x'),lines:['5 − 2x'],hist:[],chip:{x:0,y:0,drag:false,home:true},glow:0,chk:()=>{},lock:false,q:null,won:false,showing:false};
 const words=n=>n.t==='p'?`the power in ${text(n,false)}`:n.t==='u'?`the minus sign in front of ${text(n.a,false)}`:{'+':'the addition','-':'the subtraction','*':'the multiplication'}[n.op]+` ${text(n,false)}`;
 function load(src,x){uid=0;st.run++;st.src=src;st.x=x;st.tree=parse(src);st.lines=[text(st.tree)];st.hist=[];st.chip.home=true;st.chip.drag=false;st.won=false;st.glow=0;sync()}
 const done=()=>st.tree.t==='n';
 function push(line){st.lines.push(line);if(st.lines.length>6)st.lines.splice(1,1)}
 function clearFresh(n){n.fresh=false;kids(n).forEach(clearFresh)}
 /* Put the value in for every x, in brackets. */
 function substitute(){if(st.lock&&!st.showing){tell('In the challenge, work it out yourself, then type the answer.');return}if(!hasX(st.tree))return;st.hist.push(clone(st.tree));
  const put=n=>{if(n.t==='x')return{t:'n',v:st.x,id:n.id,sub:true};if(n.t==='b'){n.l=put(n.l);n.r=put(n.r)}else if(n.t==='p')n.b=put(n.b);else if(n.t==='u')n.a=put(n.a);return n};
  st.tree=put(st.tree);push(text(st.tree));tell(`Every x is now (${fmt(st.x)}), in brackets, so the minus sign stays with the number. Next: powers first.`);flash();sync();st.chk()}
 /* Do one operation, if its inputs are ready. Otherwise say what has to come first. */
 function act(n){if(st.lock&&!st.showing){tell('In the challenge, work it out yourself, then type the answer.');return}
  if(hasX(st.tree)){A.sound.miss();tell(`Put in x = ${fmt(st.x)} first: drag the chip, tap an x, or press the button.`);return}
  if(!ready(n)){A.sound.miss();const b=kids(n).find(k=>k.t!=='n');
   if(n.t==='u'&&b.t==='p')tell(`Not yet. ${text(n,false)} means the negative of ${text(b,false)}. Powers come first: work out ${text(b,false)}, then put the minus in front.`);
   else if(b.t==='p')tell(`Not yet: powers come first. Work out ${text(b,false)} before ${words(n)}.`);
   else if(b.t==='b'&&b.op==='*')tell(`Not yet: multiply before you add or subtract. Work out ${text(b,false)} first.`);
   else if(b.t==='b')tell(`Not yet: work left to right. Do ${text(b,false)} first.`);
   else tell(`Not yet: work out ${text(b,false)} first.`);return}
  st.hist.push(clone(st.tree));clearFresh(st.tree);const v=ev(n,st.x),k=kids(n).map(z=>z.v);let why='';
  if(n.t==='p'){const b=k[0];why=isNeg(b)?(n.e%2?`An odd number of negatives multiplied stays negative.`:`A negative times a negative is positive.`):'';why=`(${fmt(b)})${SUP[n.e]} = ${Array(n.e).fill(isNeg(b)?`(${fmt(b)})`:fmt(b)).join(' × ')} = ${fmt(v)}. `+why}
  else if(n.t==='u')why=`The negative of ${fmt(k[0])} is ${fmt(v)}.`;
  else if(n.op==='-'&&isNeg(k[1]))why=`${fmt(k[0])} − (${fmt(k[1])}) = ${fmt(k[0])} + ${fmt(absR(k[1]))} = ${fmt(v)}: taking away a negative adds.`;
  else if(n.op==='*'&&(isNeg(k[0])!==isNeg(k[1])))why=`${text(n,false)} = ${fmt(v)}: positive times negative is negative.`;
  else why=`${text(n,false)} = ${fmt(v)}.`;
  const rep=t=>{if(t===n)return{t:'n',v,id:n.id,fresh:true};if(t.t==='b'){t.l=rep(t.l);t.r=rep(t.r)}else if(t.t==='p')t.b=rep(t.b);else if(t.t==='u')t.a=rep(t.a);return t};
  st.tree=rep(st.tree);push(text(st.tree));A.sound.tick();tell(why+(done()?` The value is ${fmt(st.tree.v)}.`:''));flash();sync();st.chk()}
 function undo(){if(!st.hist.length||st.lock&&!st.showing)return;st.tree=st.hist.pop();st.lines.pop();if(!hasX(st.tree)){}else st.chip.home=true;tell('Undone. '+text(st.tree));sync()}
 const flash=()=>{st.glow=1;A.tween(st,{glow:0},900,'out')};
 /* The machine works it out by itself: substitute, then the leftmost ready operation each time. */
 function auto(fin){st.showing=true;const id=++st.run;const next=()=>{if(id!==st.run)return;if(hasX(st.tree)){substitute();return A.tween({k:0},{k:1},550,'io',next)}
   if(done()){st.showing=false;st.chk();fin&&fin();return}const n=ops(st.tree).find(ready);act(n);A.tween({k:0},{k:1},550,'io',next)};next()}
 const tell=t=>{c.say(t);if(read)read.textContent=t};
 function describe(){const nx=hasX(st.tree)?`Next: put in x = ${fmt(st.x)}.`:done()?`The value is ${fmt(st.tree.v)}.`:`Ready to work out: ${ops(st.tree).filter(ready).map(n=>text(n,false)).join(', ')}.`;
  return `Substitution machine. x = ${fmt(st.x)}. Working: ${st.lines.join(', = ')}. ${nx}`}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(btnRow){btnRow.innerHTML='';const off=st.lock&&!st.showing;subBtn.disabled=off||!hasX(st.tree);subBtn.textContent=`Put in x = ${fmt(st.x)}`;undoBtn.disabled=off||!st.hist.length;resetBtn.disabled=off;
   if(!hasX(st.tree)&&!done())ops(st.tree).forEach(n=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost'+(ready(n)?' fl-rdy':''),'aria-label':`Work out ${words(n)}${ready(n)?'':' (not ready yet)'}`},btnRow,text(n,false));b.disabled=off;b.onclick=()=>act(n)})}
  A.redraw()}
 // ---------- drawing ----------
 const fsz=A0=>A0.narrow?26:34;
 function chipBox(A){const w=A.narrow?104:120,h=38;return{x:16,y:14,w,h}}
 function draw(A){const{ctx,W,H,paint:P,col:C}=A;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);hits.length=0;
  // the x chip: at home in the corner, or following the finger
  const cb=chipBox(A),inX=hasX(st.tree),cx=st.chip.drag?st.chip.x-cb.w/2:cb.x,cy=st.chip.drag?st.chip.y-cb.h/2:cb.y;
  ctx.globalAlpha=inX?1:.45;P.shadow(10,3,.3);ctx.fillStyle=P.lin(cx,cy,cx+cb.w,cy+cb.h,[[0,C.cy],[1,C.vi]]);P.rrect(cx,cy,cb.w,cb.h,19);ctx.fill();P.noShadow();
  ctx.fillStyle='#fff';ctx.font=`700 ${A.narrow?17:19}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(`x = ${fmt(st.x)}`,cx+cb.w/2,cy+cb.h/2+1);ctx.globalAlpha=1;
  if(inX&&!st.chip.drag&&!st.lock)P.label('👆 drag me into the expression',cb.x+cb.w+8,cb.y+cb.h/2,{align:'left',font:'600 12px system-ui',bg:A.alpha(C.am,.95),col:'#111'});
  // earlier lines of working, smaller, then the live line, big and tappable
  const L=st.lines,top=cb.y+cb.h+22,small=A.narrow?16:19,gap=A.narrow?26:30;ctx.textAlign='left';ctx.textBaseline='alphabetic';
  L.slice(0,-1).forEach((s,i)=>{ctx.font=`500 ${small}px system-ui`;ctx.fillStyle=A.alpha(C.tx,.62);const t=(i?'= ':'')+s;ctx.fillText(t,24,top+i*gap+small)});
  const y=top+(L.length-1)*gap+fsz(A)+6;drawLine(A,y,L.length>1);
  if(done()){const v=st.tree.v;P.label(isNeg(v)?'negative answer':v.n===0?'zero':'positive answer',W-16,y-fsz(A)/2,{align:'right',font:'700 12px system-ui',bg:A.alpha(isNeg(v)?C.pk:C.gr,.95),col:C.dark?'#0b1220':'#fff'})}
  else if(!inX)P.label('tap an underlined step',W-16,H-18,{align:'right',font:'600 12px system-ui',bg:A.alpha(C.am,.9),col:'#111'})}
 function drawLine(A,y,eqs){const{ctx,W,col:C}=A,T=toks(st.tree,true);let f=fsz(A);const sup=()=>Math.round(f*.62);
  const wOf=t=>{ctx.font=t.k==='sup'?`700 ${sup()}px system-ui`:`600 ${f}px system-ui`;return ctx.measureText(t.s).width};
  const pre=eqs?'= ':'';const total=()=>{ctx.font=`600 ${f}px system-ui`;return ctx.measureText(pre).width+T.reduce((a,t)=>a+wOf(t),0)};
  while(total()>W-40&&f>14)f--;let x=24;ctx.font=`600 ${f}px system-ui`;ctx.fillStyle=A.alpha(C.tx,.7);ctx.fillText(pre,x,y);x+=ctx.measureText(pre).width;
  const live=!hasX(st.tree)&&!done();
  T.forEach(t=>{const w=wOf(t),isOp=(t.k==='op'||t.k==='sup')&&t.s.trim()!=='',rd=isOp&&live&&ready(t.node);let col=C.tx;
   if(t.k==='x')col=C.vi;else if(t.sub)col=C.cy;if(t.fresh&&st.glow>0)col=A.mix(C.tx,C.gr,.4+.6*st.glow);if(t.fresh)col=A.mix(col,C.gr,.6);
   if(rd){ctx.fillStyle=A.alpha(C.am,.18);A.paint.rrect(x-2,y-f*.95,w+4,f*1.25,6);ctx.fill();ctx.fillStyle=C.am;ctx.fillRect(x+1,y+6,w-2,3)}
   else if(isOp&&live){ctx.fillStyle=A.alpha(C.tx,.25);ctx.fillRect(x+1,y+6,w-2,1.5)}
   ctx.font=t.k==='sup'?`700 ${sup()}px system-ui`:`${t.k==='x'?'italic 700':'600'} ${f}px system-ui`;ctx.fillStyle=rd?C.am:col;ctx.fillText(t.s,x,t.k==='sup'?y-f*.42:y);
   if(isOp||t.k==='x'){const cx=x+w/2,hw=Math.max(w/2,18);hits.push({x:cx-hw,y:y-f-10,w:hw*2,h:f+24,node:t.node,k:t.k})}x+=w});
  st.lineBox={x:16,y:y-f-14,w:Math.max(x,W*.6)-8,h:f+30}}
 // ---------- steps ----------
 const fresh=(src,x)=>{st.lock=false;st.showing=false;load(src,x);if(read)read.textContent='';st.chk=()=>{}};
 const target=(want,msg,i)=>()=>{if(!A.extra.querySelector('.fl-task'))return;if(done()&&same(st.tree.v,want))A.done(msg+A.reveal(i))};
 const steps=[
  {h:'Brackets in',p:'An expression is a rule. To use it for one value of x, swap each x for that number. Put a negative number in brackets, so its minus sign stays with it.',
   predict:{q:'What is 5 − 2x when x = −3?',opts:['−1','11','−11'],ans:1},
   task:'Drag the x = −3 chip into 5 − 2x, then tap each underlined step',show:()=>auto(),
   go:()=>{fresh('5-2x',R(-3));st.chk=target(R(11),'5 − 2 × (−3) = 5 − (−6) = 11. 2x means 2 × x, and taking away −6 is the same as adding 6.',0)}},
  {h:'Square a negative',p:'x² means x × x. With brackets, (−3)² means (−3) × (−3): the whole number, sign and all, is squared.',
   predict:{q:'What is x² when x = −3?',opts:['−9','9','−6'],ans:1},
   task:'Work out x² for x = −3',show:()=>auto(),
   go:()=>{fresh('x^2',R(-3));st.chk=target(R(9),'(−3) × (−3) = 9. A negative times a negative is positive, so a square is never negative.',1)}},
  {h:'−x² is not (−x)²',p:'Now the minus is outside: −x² means “the negative of x²”. The power comes before that front minus.',
   predict:{q:'What is −x² when x = −3?',opts:['9','−9','6'],ans:1},
   task:'Work out −x² for x = −3 (try tapping the front minus first)',show:()=>auto(),
   go:()=>{fresh('-x^2',R(-3));st.chk=target(R(-9),'−(−3)² = −9: square first to get 9, then put the minus in front. Only (−x)² would give 9.',2)}},
  {h:'Two terms',p:'In 2x² − 5x, the power belongs to x only. Do the power, then each multiplication, then the subtraction.',
   predict:{q:'What is 2x² − 5x when x = −2?',opts:['−2','18','2'],ans:1},
   task:'Work out 2x² − 5x for x = −2',show:()=>auto(),
   go:()=>{fresh('2x^2-5x',R(-2));st.chk=target(R(18),'2 × 4 − 5 × (−2) = 8 − (−10) = 18. 2x² is 2 × x², so it is 2 × 4 = 8, not (2x)² = 16.',3)}},
  {h:'Odd powers keep the sign',p:'A cube multiplies three copies: (−2)³ = (−2) × (−2) × (−2). Count the minus signs.',
   predict:{q:'What is x³ + x² when x = −2?',opts:['12','−4','4'],ans:1},
   task:'Work out x³ + x² for x = −2',show:()=>auto(),
   go:()=>{fresh('x^3+x^2',R(-2));st.chk=target(R(-4),'(−2)³ = −8 and (−2)² = 4, so −8 + 4 = −4. Even powers of a negative are positive; odd powers stay negative.',4)}},
  {h:'Sandbox',p:'Pick an expression and a value of x, halves too, and work it out. Tap a step that is not ready to see what must come first.',go:()=>{fresh(SAND[si],st.x&&st.src===SAND[si]?st.x:R(-2))}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.chk()});
 const SAND=['x^2-4x','-x^2','3-x^2','2x^2-5x','x^3','(x+1)^2','10-3x','4x^2-1','x^2+x'];let si=0;
 A=FK.shell(c,{steps,ratio:.5,tall:.95,draw,onStep:A=>{chal.hidden=A.step!==6;sand.hidden=A.step!==5;sync()},
  init:A=>{const E=c.el,ctl=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},ctl);
   const r=E('div',{class:'fl-ctl',role:'group','aria-label':'Substitute and undo'},ctl);
   subBtn=E('button',{type:'button',class:'lbtn sm'},r,'Put in x');subBtn.onclick=substitute;
   undoBtn=E('button',{type:'button',class:'lbtn sm ghost'},r,'↶ Undo');undoBtn.onclick=undo;
   resetBtn=E('button',{type:'button',class:'lbtn sm ghost'},r,'Start again');resetBtn.onclick=()=>{load(st.src,st.x);tell('Back to the start: '+text(st.tree))};
   btnRow=E('div',{class:'fl-ctl',role:'group','aria-label':'Work out one step'},ctl);
   sand=E('div',{class:'fl-ctl',role:'group','aria-label':'Choose the expression and x'},ctl);
   const sb=(label,aria,f)=>{const b=E('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},sand,label);b.onclick=f};
   sb('Next expression','Next expression',()=>{si=(si+1)%SAND.length;load(SAND[si],st.x);tell('New expression: '+text(st.tree))});
   const setX=d=>{const v=add(st.x,d);if(Math.abs(val(v))>6)return;load(st.src,v);tell(`x = ${fmt(v)}`)};
   sb('x − 1','Decrease x by 1',()=>setX(R(-1)));sb('x + 1','Increase x by 1',()=>setX(R(1)));sb('x − ½','Decrease x by one half',()=>setX(R(-1,2)));sb('x + ½','Increase x by one half',()=>setX(R(1,2)));
   chal=E('div',{class:'fl-chal'},A.below);
   // the chip can be dragged into the live line; operators and x tokens can be tapped
   const inBox=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
   A.gest({down:p=>{const cb=chipBox(A),pad=10;
     if(hasX(st.tree)&&!st.lock&&p.x>=cb.x-pad&&p.x<=cb.x+cb.w+pad&&p.y>=cb.y-pad&&p.y<=cb.y+cb.h+pad){Object.assign(st.chip,{drag:true,x:p.x,y:p.y});A.redraw();return true}
     const h=hits.find(t=>inBox(p,t));if(!h)return false;if(h.k==='x')substitute();else act(h.node);return false},
    move:p=>{if(!st.chip.drag)return;st.chip.x=p.x;st.chip.y=p.y;A.redraw()},
    up:p=>{if(!st.chip.drag)return;st.chip.drag=false;const b=st.lineBox,over=b&&p&&p.y>=b.y-20&&p.y<=b.y+b.h+20;
     if(over)substitute();else{tell('Drop the chip on the expression to put the value in.');A.redraw()}}});
   sync()}});
 // ---------- challenge: type the value, get the slip named ----------
 const CH=[['x^2-4x',R(-1)],['2x^2-5x',R(-2)],['-x^2+3',R(-4)],['3-x^2',R(-5)],['x^3+2x',R(-2)],['(x+1)^2',R(-4)],['10-3x',R(-2)],['4x^2-1',R(-1,2)]];let qi=-1;
 function newChal(){qi=(qi+1)%CH.length;const[src,x]=CH[qi];st.lock=true;st.showing=false;load(src,x);st.chk=()=>{};if(read)read.textContent='';
  st.q={src,x,want:ev(st.tree,x)};
  chal.innerHTML=`<p><b>Work out ${text(st.tree)} when x = ${fmt(x)}.</b> Use brackets in your head, then type the value (a fraction like 3/4 is fine).</p><label>Answer <input type="text" inputmode="text" class="fl-in" aria-label="your answer"></label> <button type="button" class="lbtn sm">Check</button><p class="fl-fb" role="status" aria-live="polite"></p>`;
  chal.querySelector('.lbtn').onclick=judge;chal.querySelector('.fl-in').onkeydown=e=>{if(e.key==='Enter')judge()};sync()}
 function readNum(s){s=s.trim().replace(/[−–]/g,'-').replace(/\s+/g,'');let m=s.match(/^(-?)(\d+)\/(\d+)$/);if(m&&+m[3])return R((m[1]?-1:1)*+m[2],+m[3]);
  if(/^-?\d*\.?\d+$/.test(s)){const v=+s;for(const d of [1,2,4,8,10,100,1000]){if(Math.abs(Math.round(v*d)-v*d)<1e-9)return R(Math.round(v*d),d)}}return null}
 function judge(){const fb=chal.querySelector('.fl-fb'),q=st.q;if(!q||st.won)return;const n=readNum(chal.querySelector('.fl-in').value);
  if(!n){fb.textContent='Type a number first, for example −7 or 1/4.';return}
  const showBtn=' <button type="button" class="linkish fl-work">Show the working</button>';
  if(same(n,q.want)){st.won=true;fb.innerHTML=`✓ ${text(st.tree)} = ${fmt(q.want)} when x = ${fmt(q.x)}. Watch the working appear above. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;auto();return}
  A.sound.miss();let m;const sq=pw(q.x,2);const tryS=s=>{const v=ev(parse(q.src),q.x,s);return !same(v,q.want)&&same(v,n)};
  if(tryS('negsq'))m=`${fmt(n)} treats −x² as (−x)². In −x² the power comes first: x² = ${fmt(sq)}, then the minus in front makes it ${fmt(neg(sq))}.`;
  else if(tryS('sqneg')){const t=parse(q.src),pn=ops(t).find(o=>o.t==='p'&&isNeg(ev(o.b,q.x))),b=ev(pn.b,q.x);m=`${fmt(n)} would need (${fmt(b)})${SUP[pn.e]} to be negative. A negative times a negative is positive: (${fmt(b)}) × (${fmt(b)}) = ${fmt(pw(b,2))}.`}
  else if(tryS('subneg'))m=`Check the subtraction. Taking away a negative is the same as adding: a − (−b) = a + b.`;
  else if(tryS('drop'))m=`${fmt(n)} is the value for x = ${fmt(absR(q.x))}. Keep the minus sign: write (${fmt(q.x)}) in brackets for every x.`;
  else if(tryS('impadd')){const k=ops(parse(q.src)).find(o=>o.imp&&o.l.t==='n');m=`A number next to x means multiply: ${fmt(k.l.v)}x is ${fmt(k.l.v)} × x, not ${fmt(k.l.v)} + x.`}
  else m=`Not ${fmt(n)}. Replace every x with (${fmt(q.x)}), then do powers, then ×, then + and − from left to right.`;
  fb.innerHTML=m+showBtn;fb.querySelector('.fl-work').onclick=()=>{load(q.src,q.x);auto(()=>{tell(`The value is ${fmt(q.want)}. Try the next one.`);st.won=true;fb.innerHTML=`The working is on the canvas: ${fmt(q.want)}. <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=newChal})}}
 A.start()})})();
