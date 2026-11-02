/* Flagship – proving algebraic identities (ages 16–18). An identity (≡) holds for every value: drag x along a number line
   to test four claims (one counterexample kills a claim, agreeing examples prove nothing), build proofs one line at a
   time from one side to the other, write number facts in algebra (2n, 2n + 1, n and n + 1), and finish proofs by
   choosing the form that shows the fact, e.g. (2n + 1)(2n + 3) ≡ 4(n² + 2n + 1) − 1. */
(()=>{
const CLAIM=[{l:'(x + 3)²',r:'x² + 9',f:x=>(x+3)**2,g:x=>x*x+9,id:0,cx:'x = 1 gives 16 on the left but 10 on the right'},
 {l:'(x + 3)²',r:'x² + 6x + 9',f:x=>(x+3)**2,g:x=>x*x+6*x+9,id:1,ex:'(x + 3)(x + 3) = x² + 3x + 3x + 9'},
 {l:'x(x − 2) + 1',r:'(x − 1)²',f:x=>x*(x-2)+1,g:x=>(x-1)**2,id:1,ex:'x² − 2x + 1 on both sides'},
 {l:'2(x + 4)',r:'2x + 4',f:x=>2*(x+4),g:x=>2*x+4,id:0,cx:'the left is always 4 more: 2x + 8'}];
const PROOF=[{goal:'(n + 1)² − n² ≡ 2n + 1',lines:[['n² + 2n + 1 − n²','n² + 1 − n²','(n + 1 − n)²'],['2n + 1','2n² + 2n + 1','2n − 1']],
  why:[['','(n + 1)² is not n² + 1: the middle term 2n is missing.','You cannot subtract inside a square: (n + 1)² − n² is not (n + 1 − n)².'],['','n² − n² is 0, not 2n².','+1 − 0 stays +1; the sign did not change.']]},
 {goal:'(a + b)² − (a − b)² ≡ 4ab',lines:[['a² + 2ab + b² − (a² − 2ab + b²)','a² + b² − (a² − b²)','(a + b − a + b)²'],['a² + 2ab + b² − a² + 2ab − b²','a² + 2ab + b² − a² − 2ab + b²','2ab + 2b²'],['4ab','2ab','4ab + 2b²']],
  why:[['','Squaring a sum gives a middle term: (a + b)² = a² + 2ab + b².','A difference of squares is not the square of a difference.'],['','The minus sign must change every term in the bracket: −(a² − 2ab + b²) = −a² + 2ab − b².','Jumped ahead with a slip: expand the bracket term by term first.'],['','2ab + 2ab = 4ab, not 2ab.','b² − b² = 0, so no b² is left.']]},
 {goal:'(x + 2)(x − 2) + 4 ≡ x²',lines:[['x² − 2x + 2x − 4 + 4','x² − 4x − 4 + 4','x² + 4 + 4'],['x²','x² + 8','x² − 4x']],
  why:[['','2x − 2x: the two middle terms cancel, they do not add.','Multiply every term: x × x, x × (−2), 2 × x and 2 × (−2).'],['','−4 + 4 = 0, so nothing is left after x².','The x terms already cancelled: −2x + 2x = 0.']]}];
const FORM=[['any even number',['2n','n + 2','n²'],0,'Even means 2 × a whole number: 2n.'],['any odd number',['2n + 1','n + 1','3n'],0,'Odd means one more than an even number: 2n + 1.'],
 ['two consecutive integers',['n and n + 1','n and 2n','n and n + 2'],0,'Consecutive means next to each other: n, then n + 1.'],
 ['two consecutive odd numbers',['2n + 1 and 2n + 3','n + 1 and n + 3','2n + 1 and 2n + 2'],0,'Odd numbers go up in 2s: 2n + 1, then 2n + 3.'],
 ['two odd numbers that may differ',['2m + 1 and 2n + 1','2n + 1 and 2n + 1','2n + 1 and 2n + 3'],0,'Two independent odd numbers need two letters: 2m + 1 and 2n + 1.']];
const FACT=[{fact:'The sum of three consecutive integers is a multiple of 3.',work:'n + (n + 1) + (n + 2) ≡ 3n + 3 ≡ ?',opts:['3(n + 1)','n + n + n + 3','3n + 1 + 2'],why:['','Collecting is not enough: factor out the 3 so the multiple shows.','That undoes the collecting; it shows nothing about 3.'],end:'3(n + 1) is 3 times a whole number, so the sum is a multiple of 3.'},
 {fact:'The product of two consecutive odd numbers is one less than a multiple of 4.',work:'(2n + 1)(2n + 3) ≡ 4n² + 8n + 3 ≡ ?',opts:['4(n² + 2n + 1) − 1','4n² + 8n + 3, which proves it','2(2n² + 4n + 1) + 1'],why:['','+3 does not show “one less than a multiple of 4”: write 3 as 4 − 1.','That shows the product is odd, not that it is one less than a multiple of 4.'],end:'4(n² + 2n + 1) − 1 is a multiple of 4 minus 1.'},
 {fact:'The sum of two odd numbers is even.',work:'(2m + 1) + (2n + 1) ≡ 2m + 2n + 2 ≡ ?',opts:['2(m + n + 1)','2(m + n) + 1','4n + 2'],why:['','1 + 1 = 2, so the + 1 is wrong: 2(m + n) + 2.','Using n for both only proves it when the two odd numbers are equal.'],end:'2(m + n + 1) is 2 times a whole number, so the sum is even.'},
 {fact:'The difference between the squares of consecutive integers is odd.',work:'(n + 1)² − n² ≡ ?',opts:['2n + 1','n² + 1','2n'],why:['','(n + 1)² − n² = n² + 2n + 1 − n²; the middle term 2n is missing.','The + 1 from (n + 1)² is lost: n² + 2n + 1 − n² = 2n + 1.'],end:'2n + 1 is one more than an even number, so it is odd.'}];
VIS.reg('flagproof',c=>{let A,ui,quiz,qn=-1,seq=0,run=0;
const fresh=()=>({k:0,n:0,need:4,bad:-1,x:0,hold:0,row:0,seen:{},spots:[],next:()=>{},fast:0}),P=fresh();
const cur=a=>a[Math.min(P.k,a.length-1)];
const part=()=>['intro','test','build','form','fact','quiz'][A.step];
const sz=v=>Math.round(v*(A.narrow?1:1.08)),brisk=()=>A.reduced()||P.fast;
const read=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function put(g,s,x,y,w,size,col,wt,font){g.font=`${wt||700} ${sz(size)}px ${font||'system-ui,sans-serif'}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const L=[''];String(s).split(' ').forEach(p=>{const i=L.length-1,t=L[i]?L[i]+' '+p:p;if(L[i]&&g.measureText(t).width>w)L.push(p);else L[i]=t});
 const lh=sz(size)*1.3;L.forEach((l,i)=>g.fillText(l,x,y+(i-(L.length-1)/2)*lh))}
const M='"Cambria Math","STIX Two Math",Georgia,serif';
function box(g,r,tone,lw){const C=A.col,h={ok:C.gr,no:C.rd,am:C.am,cy:C.cy,vi:C.vi}[tone];g.save();A.paint.shadow(5,2,.12);g.fillStyle=h?A.mix(C.pn,h,.15):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 A.paint.noShadow();g.lineWidth=lw||(h?2.5:1.4);g.strokeStyle=h||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.restore()}
const axis=()=>({x0:sz(26),x1:A.W-sz(26),y:A.H*.5});
const xAt=v=>{const a=axis();return a.x0+(v+5)/10*(a.x1-a.x0)};
const pads=()=>{const gap=10,w=(A.W-24-gap)/2;return[0,1].map(i=>({x:12+i*(w+gap),y:A.H*.76,w,h:A.H*.18}))};
const choices=(n,top)=>{const h=sz(50),gap=8;return[...Array(n)].map((_,i)=>({x:12,y:top+i*(h+gap),w:A.W-24,h}))};
const order=k=>[(k+seq)%3,(k+seq+1)%3,(k+seq+2)%3];
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,s=part();
 if(s==='quiz'){put(g,'Identity: true for every value. Prove it from one side to the other; disprove it with one counterexample.',W/2,H*.45,W-40,17,C.tx,800);return}
 if(s==='intro'){put(g,'Equation',W*.27,H*.14,W*.4,16,C.mu,800);put(g,'2x + 1 = 7',W*.27,H*.3,W*.44,24,C.tx,700,M);put(g,'true only when x = 3',W*.27,H*.46,W*.42,14,C.tx,700);
  put(g,'Identity',W*.73,H*.14,W*.4,16,C.mu,800);put(g,'2(x + 1) ≡ 2x + 2',W*.73,H*.3,W*.46,22,C.tx,700,M);put(g,'true for every x',W*.73,H*.46,W*.42,14,C.tx,700);
  g.strokeStyle=C.ln;g.lineWidth=1.5;g.beginPath();g.moveTo(W/2,H*.08);g.lineTo(W/2,H*.56);g.stroke();
  put(g,'Proof: start from one side, use valid steps, and finish at the other side.',W/2,H*.78,W-30,16,C.tx,800);return}
 if(s==='test'){const q=cur(CLAIM),a=axis(),L=q.f(P.x),R=q.g(P.x),same=L===R;put(g,`Is ${q.l} ≡ ${q.r} ?`,W/2,H*.08,W-24,21,C.tx,700,M);
  box(g,{x:12,y:H*.17,w:W-24,h:H*.17},same?'ok':'no',2);put(g,`x = ${P.x}:  left = ${L},  right = ${R}  ${same?'(agree)':'(differ)'}`,W/2,H*.255,W-40,16,C.tx,800);
  g.strokeStyle=C.mu;g.lineWidth=2;g.beginPath();g.moveTo(a.x0,a.y);g.lineTo(a.x1,a.y);g.stroke();
  for(let v=-5;v<=5;v++){const x=xAt(v),tried=P.seen[v];g.fillStyle=tried==null?C.mu:tried?C.gr:C.rd;g.fillRect(x-1,a.y-6,2,12);put(g,String(v),x,a.y+sz(20),20,12,C.mu,700);
   if(tried!=null){g.beginPath();g.arc(x,a.y-sz(16),4,0,7);g.fill()}}
  const kx=xAt(P.x);g.save();A.paint.shadow(8,2,.25);g.fillStyle=C.vi;g.beginPath();g.arc(kx,a.y,sz(16),0,7);g.fill();g.restore();put(g,'x',kx,a.y,20,14,'#fff',900);
  put(g,'Drag x along the line, then decide.',W/2,H*.66,W-30,13,C.mu,700);const ps=pads();P.spots=ps;
  [['Identity ≡ (every x)','cy'],['Not an identity','am']].forEach(([t,tn],i)=>{box(g,ps[i],P.bad===i?'no':tn,2.5);put(g,t,ps[i].x+ps[i].w/2,ps[i].y+ps[i].h/2,ps[i].w-12,15,C.tx,800)})}
 if(s==='build'){const p=PROOF[P.k];put(g,'Prove: '+p.goal,W/2,H*.06,W-24,17,C.tx,700,M);const done=p.lines.slice(0,P.row).map(l=>l[0]);
  ['LHS ≡ '+p.goal.split(' ≡ ')[0]].concat(done.map(d=>'≡ '+d)).forEach((t,i)=>put(g,t,W/2,H*.15+i*sz(26),W-30,15,i?C.tx:C.mu,700,M));
  if(P.row<p.lines.length){const cs=choices(3,H*.15+(p.lines.length+1)*sz(26)+sz(4));P.spots=cs;put(g,'Tap the next valid line.',W/2,cs[0].y-sz(12),W-30,12,C.mu,700);
   order(P.row).forEach((j,i)=>{box(g,cs[i],P.bad===j?'no':'',2);put(g,'≡ '+p.lines[P.row][j],W/2,cs[i].y+cs[i].h/2,cs[i].w-16,15,C.tx,700,M)})}
  else{P.spots=[];put(g,'= RHS ✓',W/2,H*.15+(p.lines.length+1)*sz(26),W-30,17,C.gr,900)}}
 if(s==='form'){const f=cur(FORM);put(g,'Write it in algebra (n and m are any integers):',W/2,H*.07,W-30,14,C.mu,700);box(g,{x:12,y:H*.15,w:W-24,h:H*.2},'vi',2.5);put(g,f[0],W/2,H*.25,W-40,22,C.tx,800);
  const cs=choices(3,H*.44);P.spots=cs;order(P.k).forEach((j,i)=>{box(g,cs[i],P.bad===j?'no':P.n>=P.need&&j===f[2]?'ok':'',2);put(g,f[1][j],W/2,cs[i].y+cs[i].h/2,cs[i].w-16,18,C.tx,700,M)})}
 if(s==='fact'){const f=cur(FACT);put(g,f.fact,W/2,H*.09,W-24,15,C.tx,800);box(g,{x:12,y:H*.2,w:W-24,h:H*.16},'cy',2);put(g,f.work,W/2,H*.28,W-36,16,C.tx,700,M);
  put(g,'Which form shows the fact?',W/2,H*.43,W-30,13,C.mu,700);const cs=choices(3,H*.48);P.spots=cs;order(P.k).forEach((j,i)=>{box(g,cs[i],P.bad===j?'no':P.n>=P.need&&!j?'ok':'',2);put(g,f.opts[j],W/2,cs[i].y+cs[i].h/2,cs[i].w-16,16,C.tx,700,M)})}
 A.fx.draw(g)}
function oops(t,j){A.sound.miss();P.bad=j;read(t);setTimeout(()=>{P.bad=-1;A.redraw()},brisk()?10:1400);A.redraw()}
function point(t){P.n++;A.sound.pop();read(t);tools();A.redraw();P.next()}
function setX(v){if(part()!=='test'||P.n>=P.need)return;P.x=Math.max(-5,Math.min(5,Math.round(v)));const q=CLAIM[P.k],L=q.f(P.x),R=q.g(P.x);P.seen[P.x]=L===R;
 A.cv.setAttribute('aria-label',`x = ${P.x}: left ${L}, right ${R}, ${L===R?'they agree':'they differ'}.`);A.redraw()}
function decide(isId){if(part()!=='test'||P.n>=P.need)return;const q=CLAIM[P.k];
 if(isId!==q.id)return oops(q.id?`Every x you try agrees, and expanding shows why: ${q.ex}. It holds for all x, so it is an identity.`:`Agreeing at some x is not enough: ${q.cx}. One counterexample shows it is not an identity.`,isId?0:1);
 P.k++;P.seen={};P.x=0;point(q.id?`Identity: ${q.ex}, so the sides match for every x.`:`Not an identity: ${q.cx}.`)}
function line(j){if(part()!=='build'||P.n>=P.need)return;const p=PROOF[P.k];if(P.row>=p.lines.length)return;
 if(j!==0)return oops(p.why[P.row][j],j);P.row++;seq++;
 if(P.row<p.lines.length){A.sound.tick();read('Valid. Next line?');tools();return A.redraw()}
 const was=P.k,tk=run;point(`Proved: ${p.goal}. One side was rewritten until it became the other.`);
 if(P.n<P.need)setTimeout(()=>{if(tk!==run||P.k!==was)return;P.k++;P.row=0;read('Next proof.');tools();A.redraw()},brisk()?5:1700)}
function form(j){if(part()!=='form'||P.n>=P.need)return;const f=FORM[P.k];
 if(j!==f[2])return oops(`Not quite: ${f[1][j]} does not cover every case of ${f[0]}. ${f[3]}`,j);P.k++;seq++;point(`${f[0]}: ${f[1][0]}. ${f[3]}`)}
function fact(j){if(part()!=='fact'||P.n>=P.need)return;const f=FACT[P.k];if(j!==0)return oops(f.why[j],j);P.k++;seq++;point(f.end)}
function tools(){if(!ui)return;ui.innerHTML='';const s=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ui,t);b.onclick=f};
 if(s==='quiz'||s==='intro'||P.n>=P.need)return;
 if(s==='test'){B('x − 1',()=>setX(P.x-1),'Move x down by 1');B('x + 1',()=>setX(P.x+1),'Move x up by 1');B('Identity ≡',()=>decide(1),'It is an identity');B('Not an identity',()=>decide(0),'It is not an identity')}
 if(s==='build'){const p=PROOF[P.k];if(P.row<p.lines.length)order(P.row).forEach(j=>B('≡ '+p.lines[P.row][j],()=>line(j),'Next line: '+p.lines[P.row][j]))}
 if(s==='form')order(P.k).forEach(j=>B(FORM[P.k][1][j],()=>form(j),FORM[P.k][0]+': '+FORM[P.k][1][j]));
 if(s==='fact')order(P.k).forEach(j=>B(FACT[P.k].opts[j],()=>fact(j),'Form: '+FACT[P.k].opts[j]))}
const within=(p,r,m)=>(m=m||0,p.x>r.x-m&&p.x<r.x+r.w+m&&p.y>r.y-m&&p.y<r.y+r.h+m);
function down(p){const s=part();if(s==='quiz'||s==='intro'||P.n>=P.need)return false;
 if(s==='test'){const a=axis();if(Math.abs(p.y-a.y)<sz(30)&&p.x>a.x0-sz(20)&&p.x<a.x1+sz(20)){P.hold=1;move(p);return true}
  const i=P.spots.findIndex(r=>within(p,r,3));if(i>=0)decide(i===0?1:0);return false}
 const i=P.spots.findIndex(r=>within(p,r,3));if(i<0)return false;const j=s==='build'?order(P.row)[i]:order(P.k)[i];
 if(s==='build')line(j);if(s==='form')form(j);if(s==='fact')fact(j);return false}
function move(p){if(!P.hold)return;const a=axis();setX((p.x-a.x0)/(a.x1-a.x0)*10-5)}
function up(){if(!P.hold)return;P.hold=0;const q=cur(CLAIM);read(`x = ${P.x}: left ${q.f(P.x)}, right ${q.g(P.x)}. Try more values, then decide.`)}
const seal=(i,msg)=>()=>{if(A.step===i&&P.n>=P.need&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++run,go=()=>{if(k!==run||P.n>=P.need)return;f();setTimeout(go,70)};setTimeout(go,30)}
const reset=()=>{run++;seq=0;Object.assign(P,fresh())};
function correct(){const s=part();if(s==='test')return decide(CLAIM[P.k].id);if(s==='build')return line(0);if(s==='form')return form(FORM[P.k][2]);if(s==='fact')return fact(0)}
const demo=i=>()=>{steps[i].go();P.fast=1;auto(correct)};
const steps=[
{h:'Equation or identity?',p:'An equation like 2x + 1 = 7 is true for some values of x. An identity, written with ≡, is true for every value. A proof shows why it must hold for all values, not just the ones you tried.',
 go:()=>{reset();read('Equation: true for some x. Identity: true for every x.')}},
{h:'Test the claim',p:'Drag x along the line and watch both sides. Then decide: identity or not?',predict:{q:'(x + 3)² = x² + 9 is true when x = 0. Is it an identity?',opts:['Yes, it worked for x = 0','No, it must work for every x'],ans:1},task:'Decide on 4 claims',show:demo(1),
 go:()=>{reset();read('Drag x, then decide: identity or not.');tools();P.next=seal(1,'One counterexample is enough to disprove a claim. Agreeing examples never prove one; only algebra can.')}},
{h:'Build the proof',p:'Start from the left side. Choose the next line each time until you reach the right side. Each line must follow from the last.',predict:{q:'To prove LHS ≡ RHS, how should you set it out?',opts:['Write LHS = RHS and change both sides','Rewrite one side until it becomes the other'],ans:1},task:'Build 3 proofs',show:demo(2),
 go:()=>{reset();P.need=3;read('Tap the next valid line.');tools();P.next=seal(2,'Each proof moved one side, step by step, into the other. Nothing was assumed.')}},
{h:'Numbers in algebra',p:'To prove a fact about every even or odd number, write a general one with a letter. Pick the expression that always fits.',predict:{q:'Which pair stands for two consecutive odd numbers?',opts:['n + 1 and n + 3','2n + 1 and 2n + 3'],ans:1},task:'Match 5 descriptions',show:demo(3),
 go:()=>{reset();P.need=5;read('Pick the expression that always fits.');tools();P.next=seal(3,'2n is always even and 2n + 1 always odd; n + 1 is odd only when n is even.')}},
{h:'Prove the number fact',p:'After simplifying, rewrite the expression so the fact is plain to see, such as 3 × (something) for a multiple of 3.',predict:{q:'1 × 3, 3 × 5 and 5 × 7 are each one less than a multiple of 4. Is that a proof?',opts:['Yes, three examples are enough','No, examples cannot cover every n'],ans:1},task:'Finish 4 proofs',show:demo(4),
 go:()=>{reset();read('Choose the form that shows the fact.');tools();P.next=seal(4,'Factorising out 3, 2 or 4 is what turns the algebra into the fact.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.next()});
const QS=[['What does ≡ mean?',[['Equal for every value of the variable','ok'],['Equal for at least one value','eqn'],['Approximately equal','approx']]],
 ['Ana checks x = 0, 1 and 2, and both sides agree. What has she shown?',[['Only that it holds for those values','ok'],['That it is an identity','examples'],['That it is false','false']]],
 ['Which line proves n² + n is always even?',[['n² + n ≡ n(n + 1), and one of two consecutive integers is even','ok'],['2² + 2 = 6, which is even','oneex'],['n² + n ≡ 2n², which is even','combine']]],
 ['Is (a + b)² ≡ a² + b²?',[['No: (a + b)² ≡ a² + 2ab + b²','ok'],['Yes: square each term','fresh'],['Yes: it works when a = 0','zero']]],
 ['How do you show x² + 1 ≡ (x + 1)² is false?',[['One counterexample: x = 1 gives 2 and 4','ok'],['Show the sides differ for every x','all'],['You cannot; it may hold for large x','big']]],
 ['To prove the sum of two consecutive integers is odd, how should you start?',[['n + (n + 1)','ok'],['n + n','same'],['2n + 2n + 1','twice']]]];
function why(t){let m='An identity holds for every value: prove it with algebra, disprove it with one counterexample.';
 if(t==='eqn')m='True for some values is an equation. ≡ means true for every value.';if(t==='approx')m='≈ means approximately. ≡ means identically equal, for every value.';
 if(t==='examples')m='Three values are not every value. Examples cannot prove an identity; algebra can.';if(t==='false')m='Agreeing examples do not make it false either. They just do not settle it.';
 if(t==='oneex')m='One example only checks n = 2. A proof must work for every n.';if(t==='combine')m='n² and n are not like terms, so n² + n is not 2n².';
 if(t==='fresh')m='Squaring a sum gives a middle term: (a + b)(a + b) = a² + 2ab + b².';if(t==='zero')m='Working at a = 0 is one value; it fails at a = b = 1 (4 vs 2).';
 if(t==='all')m='They agree at x = 0, so they do not differ everywhere. One x that fails is all you need.';if(t==='big')m='An identity must hold for every x. Once x = 1 fails, it is not an identity.';
 if(t==='same')m='n + n is one number added to itself, not two consecutive integers.';if(t==='twice')m='Consecutive integers differ by 1, so use n and n + 1. 2n + 2n + 1 is not a sum of two integers in a row.';return m}
function ask(){qn++;const [q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});read('Challenge: '+q);A.redraw()}
let stars=0;function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.64,tall:1.35,draw,onStep:A=>{quiz.hidden=A.step!==5;ui.hidden=A.step===5;tools()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ui=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});tools()}});
A.start()})})();
