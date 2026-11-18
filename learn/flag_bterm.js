/* Flagship – finding a term or coefficient in a binomial expansion (ages 16–18; A-level Maths: the general term
   ⁿCᵣ aⁿ⁻ʳ bʳ, the term independent of x, an unknown constant from a given coefficient). Slide r along the terms of
   (x + 2/x)⁶ and watch the power of x fall by 2 each step until it hits x⁰; find the right r for three expansions from
   the power rule; build the constant term piece by piece (ⁿCᵣ, then bʳ with its coefficient and sign, then the product);
   sign four terms of (3 − x)⁹ and friends from (−1)ʳ; and hunt every k that makes a coefficient hit its target, where
   k² gives two answers and k³ only one. Not flagbexp (writing out expansions) or flagbapx (approximations).
   Every canvas tap or drag has a button twin; the canvas label says what just happened. */
(()=>{
const SUP={'-':'⁻',0:'⁰',1:'¹',2:'²',3:'³',4:'⁴',5:'⁵',6:'⁶',7:'⁷',8:'⁸',9:'⁹'},sup=n=>String(n).split('').map(d=>SUP[d]).join(''),xp=p=>p===0?'x⁰':p===1?'x':'x'+sup(p);
const nCr=(n,r)=>{let v=1;for(let i=1;i<=r;i++)v=v*(n-r+i)/i;return Math.round(v)},fmt=v=>String(v).replace('-','−');
/* [label, n, power of x for term r, the r that gives x⁰] */
const EXP=[['(x + 2/x)⁸',8,r=>8-2*r,4,'8 − 2r'],['(x² + 1/x)⁶',6,r=>12-3*r,4,'2(6 − r) − r = 12 − 3r'],['(x² − 3/x)⁹',9,r=>18-3*r,6,'2(9 − r) − r = 18 − 3r']];
const BUILD=[['(x + 2/x)⁸, r = 4',[['⁸C₄ = 70',1],['⁸C₃ = 56','r'],['⁸P₄ = 1680','perm']],[['2⁴ = 16',1],['2 × 4 = 8','mul'],['2','nopow']],[['70 × 16 = 1120',1],['70 × 8 = 560','mul'],['70','nob']]],
 ['(x² − 3/x)⁹, r = 6',[['⁹C₆ = 84',1],['⁹C₃ × 2 = 168','dbl'],['9 × 6 = 54','nm']],[['(−3)⁶ = 729',1],['−729','sgn'],['−3 × 6 = −18','mul']],[['84 × 729 = 61 236',1],['−61 236','sgn'],['84 × 18 = 1512','mul']]]];
const BWHY={r:'Use the same r as the power of b: here r = 4, so ⁸C₄.',perm:'Binomial coefficients count choices, not orders: nCr, not nPr.',mul:'bʳ means multiply b by itself r times: a power, not a product with r.',
 nopow:'The 2 comes from (2/x)⁴, so it is raised to the 4th power too.',nob:'You still need the number from bʳ: 70 × 16.',dbl:'Only ⁹C₆ belongs here, and ⁹C₆ = ⁹C₃ = 84.',nm:'ⁿCᵣ is n!/(r!(n − r)!), not n × r.',
 sgn:'(−3) raised to an even power is positive: (−3)⁶ = +729.'};
const SIGN=[['x⁴ term of (3 − x)⁹ (r = 4)',0],['x⁵ term of (3 − x)⁹ (r = 5)',1],['Constant term of (x² − 3/x)⁹ (r = 6)',0],['x³ term of (2 − x)⁷ (r = 3)',1]];
const HUNTK=[['Coefficient of x² in (1 + kx)⁶ is 135',k=>15*k*k,135,[3,-3],'15k²'],['Coefficient of x³ in (2 + kx)⁵ is −320',k=>40*k**3,-320,[-2],'40k³']];
VIS.reg('flagbterm',c=>{let A,ctl,quiz,qk=-1,tok=0;
const init0=()=>({want:()=>{},won:0,r:0,j:0,part:0,k:1,found:[],bad:-1,lock:0,grab:0}),S=init0();
const stage=()=>['slide','rule','build','sign','hunt','quiz'][A.step],rm=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function wr(g,t,x,y,n,wt,al,col){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function chip(g,r,fill,warn){const C=A.col;g.fillStyle=fill||(C.dark?'#1e293b':'#fff');A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=warn?C.rd:C.tx;g.lineWidth=warn?5:1.5;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke()}
const within=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* term row: one chip per r */
const cur=()=>stage()==='slide'?['(x + 2/x)⁶',6,r=>6-2*r,3]:EXP[Math.min(S.j,2)];
const cell=(r,n)=>{const w=(A.W-16)/(n+1);return{x:8+r*w,y:A.H*.3,w:w-4,h:A.H*.22}};
function drawRow(g){const C=A.col,[lab,n,pw]=cur();wr(g,lab,A.W/2,A.H*.08,20,900);
 for(let r=0;r<=n;r++){const z=cell(r,n),p=pw(r),on=r===S.r;chip(g,z,on?A.alpha(p===0?C.gr:C.ac,.35):p===0&&stage()==='slide'&&S.won?A.alpha(C.gr,.25):null,false);
  wr(g,'r='+r,z.x+z.w/2,z.y+z.h*.28,A.narrow?10:12,800);wr(g,xp(p),z.x+z.w/2,z.y+z.h*.68,A.narrow?13:15,900)}
 const p=pw(S.r);wr(g,stage()==='slide'?`r = ${S.r}: ⁶C${sub(S.r)} · x${sup(6-S.r)} · (2/x)${sup(S.r)} = ${nCr(6,S.r)} × ${2**S.r} × ${xp(p)}`:`Power of x = ${EXP[S.j][4]} = ${fmt(p)} when r = ${S.r}`,A.W/2,A.H*.64,A.narrow?12:14,800);
 wr(g,stage()==='slide'?(p===0?`Term independent of x: ${nCr(6,3)} × 8 = 160`:'Each step right: x loses 1 and gains 1/x, so the power drops by 2'):S.won<3?'Find the r that makes the power 0':'All three found.',A.W/2,A.H*.78,12,800)}
const SUB={0:'₀',1:'₁',2:'₂',3:'₃',4:'₄',5:'₅',6:'₆',7:'₇',8:'₈',9:'₉'},sub=n=>String(n).split('').map(d=>SUB[d]).join('');
function setR(r){const[,n,pw]=cur();r=Math.max(0,Math.min(n,r));if(r===S.r)return;S.r=r;A.sound.tick();const p=pw(r);
 if(stage()==='slide'){say(`r = ${r}: ${xp(p)}.${p===0?' No x left: this is the term independent of x, 20 × 8 = 160.':''}`);if(p===0&&!S.won){S.won=1;A.sound.pop();S.want()}}else say(`r = ${r}: power of x is ${fmt(p)}.`);keys();A.redraw()}
function checkR(){if(stage()!=='rule'||S.won>=3||S.lock)return;const[lab,n,pw,ans,rule]=EXP[S.j],p=pw(S.r);
 if(p!==0)return miss(`r = ${S.r} gives ${xp(p)}, not x⁰. Solve ${rule} = 0 for r.`,-1);S.won++;A.sound.pop();say(`Yes: in ${lab}, r = ${ans} gives x⁰ because ${rule} = 0.`);
 if(S.won<3){S.lock=1;later(()=>{S.lock=0;S.j++;S.r=0;keys();A.redraw()},rm()?10:500)}keys();A.redraw();S.want()}
/* build the constant term */
const opt=k=>{const w=(A.W-36)/3;return{x:8+k*(w+10),y:A.H*.62,w,h:A.H*.2}};
function pick(k){if(stage()!=='build'||S.won>=6||S.lock)return;const B=BUILD[S.j],ops=B[S.part+1],o=ops[(k+S.part)%3];if(o[1]!==1)return miss(BWHY[o[1]],k);
 S.won++;A.sound.pop();const done=S.part===2;say(done?`Constant term of ${B[0].split(',')[0]} = ${o[0].split('= ').pop()}.`:`${o[0]}. Next piece.`);
 S.lock=1;later(()=>{S.lock=0;if(done){if(S.j<1){S.j++;S.part=0}}else S.part++;keys();A.redraw()},rm()?10:450);keys();A.redraw();S.want()}
function drawBuild(g){const C=A.col,B=BUILD[Math.min(S.j,1)],part=S.won>=6?3:S.part;wr(g,B[0],A.W/2,A.H*.07,17,900);
 const names=['ⁿCᵣ','bʳ (number)','Constant term'];names.forEach((t,i)=>{const w=(A.W-30)/3,z={x:8+i*(w+7),y:A.H*.17,w,h:A.H*.24};const got=i<part||(S.lock&&i===part);
  chip(g,z,got?A.alpha(C.gr,.3):i===part?A.alpha(C.ac,.18):null);wr(g,t,z.x+z.w/2,z.y+z.h*.3,11,800);wr(g,got?B[i+1].find(o=>o[1]===1)[0].split('= ').pop():'?',z.x+z.w/2,z.y+z.h*.7,A.narrow?13:16,900)});
 if(S.won<6){const ops=B[part+1];wr(g,`Choose ${names[part]}`,A.W/2,A.H*.52,13,800);[0,1,2].forEach(k=>{const z=opt(k);chip(g,z,null,S.bad===k);wr(g,ops[(k+part)%3][0],z.x+z.w/2,z.y+z.h/2,A.narrow?11:14,900)})}
 else wr(g,'Both constant terms built.',A.W/2,A.H*.7,14,900)}
/* sign sort */
const bin=k=>({x:k?A.W*.52:A.W*.04,y:A.H*.58,w:A.W*.44,h:A.H*.28});
function signIt(k){if(stage()!=='sign'||S.won>=4||S.lock)return;const[t,want]=SIGN[S.j];const r=+t.match(/r = (\d)/)[1];
 if(k!==want)return miss(`${t}: b is negative, so the sign is (−1)${sup(r)} = ${r%2?'−1':'+1'}. ${r%2?'Odd':'Even'} r gives ${r%2?'negative':'positive'}.`,k);
 S.won++;A.sound.pop();say(`Right: r = ${r} is ${r%2?'odd, so negative':'even, so positive'}.`);if(S.won<4){S.lock=1;later(()=>{S.lock=0;S.j++;keys();A.redraw()},rm()?10:500)}keys();A.redraw();S.want()}
function drawSign(g){const C=A.col,w=Math.min(A.W-24,480);chip(g,{x:(A.W-w)/2,y:A.H*.1,w,h:A.H*.3});wr(g,SIGN[Math.min(S.j,3)][0],A.W/2,A.H*.25,A.narrow?13:16,900);wr(g,`${Math.min(S.won,4)} of 4`,A.W/2,A.H*.48,12,800);
 ['Positive +','Negative −'].forEach((t,k)=>{const z=bin(k);chip(g,z,A.alpha(k?C.rd:C.gr,.14),S.bad===k);wr(g,t,z.x+z.w/2,z.y+z.h/2,16,900)})}
/* unknown constant hunt */
const KX=k=>A.W*.1+(k+5)/10*A.W*.8,toK=x=>Math.round((x-A.W*.1)/(A.W*.8)*10-5);
function setK(k){if(stage()!=='hunt')return;k=Math.max(-5,Math.min(5,k));if(k===S.k)return;S.k=k;A.sound.tick();const[,f]=HUNTK[Math.min(S.j,1)];say(`k = ${fmt(k)}: coefficient ${fmt(f(k))}.`);keys();A.redraw()}
function markK(){if(stage()!=='hunt'||S.won>=3||S.lock)return;const[q,f,tgt,sols,expr]=HUNTK[S.j];if(f(S.k)!==tgt)return miss(`k = ${fmt(S.k)} gives ${expr} = ${fmt(f(S.k))}, not ${fmt(tgt)}.`,-1);
 if(S.found.includes(S.k))return miss(`k = ${fmt(S.k)} is already marked. ${sols.length>1?'A square has two roots: look on the other side of 0.':''}`,-1);
 S.found.push(S.k);S.won++;A.sound.pop();const left=sols.filter(s=>!S.found.includes(s)).length;
 say(left?`k = ${fmt(S.k)} works. ${expr} = ${fmt(tgt)} has another solution: k² is the same for k and −k.`:`k = ${fmt(S.k)} works.${sols.length===1?' A cube keeps the sign, so k = −2 is the only answer.':' Both found: k = ±3.'}`);
 if(!left&&S.won<3){S.lock=1;later(()=>{S.lock=0;S.j++;S.found=[];S.k=1;keys();A.redraw()},rm()?10:600)}keys();A.redraw();S.want()}
function drawHunt(g){const C=A.col,[q,f,tgt,sols,expr]=HUNTK[Math.min(S.j,1)];wr(g,q,A.W/2,A.H*.07,A.narrow?13:16,900);wr(g,`General term gives ${expr}. Target ${fmt(tgt)}.`,A.W/2,A.H*.17,12,800);
 const base=A.H*.62,top=A.H*.26,mx=S.j?1200:400,v=f(S.k),h=Math.max(-1,Math.min(1,v/mx))*(base-top)*(S.j?.5:1),zero=S.j?(base+top)/2:base;
 g.strokeStyle=C.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(A.W*.06,zero);g.lineTo(A.W*.94,zero);g.stroke();
 const ty=zero-tgt/mx*(base-top)*(S.j?.5:1);g.setLineDash([6,4]);g.strokeStyle=C.or;g.beginPath();g.moveTo(A.W*.06,ty);g.lineTo(A.W*.94,ty);g.stroke();g.setLineDash([]);wr(g,'target '+fmt(tgt),A.W*.07,ty-10,11,800,'left');
 g.fillStyle=A.alpha(v===tgt?C.gr:C.ac,.7);g.fillRect(KX(S.k)-14,Math.min(zero,zero-h),28,Math.abs(h));wr(g,fmt(v),KX(S.k),Math.min(zero,zero-h)-12,12,900);
 for(let k=-5;k<=5;k++){const on=k===S.k,fd=S.found.includes(k);g.fillStyle=fd?C.gr:on?C.ac:A.alpha(C.tx,.35);g.beginPath();g.arc(KX(k),A.H*.8,on?11:7,0,7);g.fill();wr(g,fmt(k),KX(k),A.H*.9,11,on?900:700)}
 wr(g,'k',A.W*.04,A.H*.8,12,900)}
/* shared */
function miss(t,b){A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.04:.25);g.fillRect(0,0,W,H);
 if(v==='quiz'){wr(g,'Tᵣ₊₁ = ⁿCᵣ aⁿ⁻ʳ bʳ',W/2,H*.36,20,900);wr(g,'Set the power of x, solve for r, then multiply',W/2,H*.58,13,800);return}
 if(v==='slide'||v==='rule')drawRow(g);else({build:drawBuild,sign:drawSign,hunt:drawHunt})[v](g);A.fx.draw(g)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='slide'||v==='rule'){B('◀ r − 1',()=>setR(S.r-1),'Decrease r');B('r + 1 ▶',()=>setR(S.r+1),'Increase r');if(v==='rule'&&S.won<3)B('Check this r',checkR)}
 if(v==='build'&&S.won<6)[0,1,2].forEach(k=>B(BUILD[S.j][S.part+1][(k+S.part)%3][0],()=>pick(k)));
 if(v==='sign'&&S.won<4){B('Positive +',()=>signIt(0));B('Negative −',()=>signIt(1))}
 if(v==='hunt'&&S.won<3){B('◀ k − 1',()=>setK(S.k-1),'Decrease k');B('k + 1 ▶',()=>setK(S.k+1),'Increase k');B('Mark this k',markK)}}
function down(p){const v=stage();if(v==='slide'||v==='rule'||v==='hunt'){S.grab=1;move(p);return true}
 if(v==='build'){const k=[0,1,2].find(k=>within(p,opt(k)));if(k!=null)pick(k)}if(v==='sign'){const k=[0,1].find(k=>within(p,bin(k)));if(k!=null)signIt(k)}return false}
function move(p){if(!S.grab)return;const v=stage();if(v==='hunt')return setK(toK(p.x));const n=cur()[1];setR(Math.floor((p.x-8)/((A.W-16)/(n+1))))}
function up(){S.grab=0}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fn,ms)=>{const k=tok;setTimeout(()=>{if(k===tok)fn()},ms)};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const clear=()=>{tok++;Object.assign(S,init0())};
const right=()=>[0,1,2].find(k=>BUILD[S.j][S.part+1][(k+S.part)%3][1]===1);
const steps=[
{h:'Slide along the terms',p:'Term r of (x + 2/x)⁶ is ⁶Cᵣ · x⁶⁻ʳ · (2/x)ʳ. Drag along the terms, or use the buttons, and watch the power of x.',
 predict:{q:'In (x + 2/x)⁶, which term has no x at all?',opts:['The first term','The middle term, r = 3','None: every term has an x'],ans:1},task:'Find the term with no x',
 show:()=>{steps[0].go();demo([1,2,3].map(r=>()=>setR(r)),500)},go:()=>{clear();say('r = 0: x⁶. Drag along the terms.');keys();S.want=ready(0,()=>S.won>=1,'The x and 1/x cancel when r = 3: the term independent of x is 160.')}},
{h:'Power rule',p:'Write the power of x in term r, set it to 0 and solve for r. Then move to that r and check.',task:'Find r for 3 expansions',
 show:()=>{steps[1].go();demo([()=>setR(4),checkR,()=>setR(4),checkR,()=>setR(6),checkR],600)},go:()=>{clear();say('(x + 2/x)⁸: power of x is 8 − 2r.');keys();S.want=ready(1,()=>S.won>=3,'Power of x = 0 gives r. With x² in a, each step drops the power by 3.')}},
{h:'Build the term',p:'The term is ⁿCᵣ × (number from aⁿ⁻ʳ) × (number from bʳ). Here a = x or x², which brings no number. Pick each piece.',
 predict:{q:'The constant term of (x + 2/x)⁸ uses (2/x)⁴. Its number part is…',opts:['2 × 4 = 8','2⁴ = 16','just 2'],ans:1},task:'Build 2 constant terms',
 show:()=>{steps[2].go();demo([0,1,2,3,4,5].map(()=>()=>pick(right())),560)},go:()=>{clear();say('(x + 2/x)⁸, r = 4. Choose ⁸C₄.');keys();S.want=ready(2,()=>S.won>=6,'Raise the whole of b to the power r, sign and all.')}},
{h:'Plus or minus?',p:'When b is negative, the term’s sign is (−1)ʳ. Tap the sign of each term.',task:'Sign 4 terms',
 show:()=>{steps[3].go();demo(SIGN.map(()=>()=>signIt(SIGN[S.j][1])),520)},go:()=>{clear();say(SIGN[0][0]+'. Positive or negative?');keys();S.want=ready(3,()=>S.won>=4,'Even r: positive. Odd r: negative.')}},
{h:'Find the constant k',p:'The general term turns a given coefficient into an equation in k. Slide k, or use the buttons, and mark every k that hits the target.',
 predict:{q:'The coefficient of x² in (1 + kx)⁶ is 135. How many values of k work?',opts:['One: k = 3','Two: k = 3 and k = −3','None'],ans:1},task:'Mark 3 values of k',
 show:()=>{steps[4].go();demo([()=>setK(3),markK,()=>setK(-3),markK,()=>setK(-2),markK],700)},go:()=>{clear();say('Coefficient of x² in (1 + kx)⁶ is 135. k = 1 gives 15.');keys();S.want=ready(4,()=>S.won>=3,'15k² = 135 gives k = ±3; 40k³ = −320 gives only k = −2.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
const QS=[['What is the term independent of x in (x + 3/x)⁴?',[['54','ok'],['6','nob'],['18','mul']]],['Which r gives the constant term of (x² + 1/x)⁹?',[['r = 6','ok'],['r = 4.5','half'],['r = 3','pow']]],
 ['The coefficient of x² in (1 + kx)⁵ is 40. Find k.',[['k = ±2','ok'],['k = 2 only','onlypos'],['k = 4','nosq']]],['What is the sign of the x⁵ term in (3 − x)⁹?',[['Negative','ok'],['Positive, because 3 is positive','signa'],['You must expand fully to tell','cant']]],
 ['Which is the general term of (a + b)ⁿ?',[['ⁿCᵣ aⁿ⁻ʳ bʳ','ok'],['ⁿCᵣ aʳ bʳ','sumpow'],['n × r × aⁿ⁻ʳ bʳ','ncr']]]];
function why(t){let m='Use the general term ⁿCᵣ aⁿ⁻ʳ bʳ and set the power of x.';
 if(t==='nob')m='⁴C₂ = 6 is only the coefficient. Multiply by (3/x)² = 9/x²: 6 × 9 = 54.';if(t==='mul')m='(3/x)² gives 3² = 9, not 3 × 2 = 6: 6 × 9 = 54.';
 if(t==='half')m='That treats each step as dropping the power by 2. Here it is 2(9 − r) − r = 18 − 3r = 0, so r = 6.';if(t==='pow')m='r = 3 gives x¹², x⁻³: x⁹. Solve 18 − 3r = 0 for r = 6.';
 if(t==='onlypos')m='10k² = 40 gives k² = 4, and k² = 4 has two roots: k = 2 and k = −2.';if(t==='nosq')m='⁵C₂ k² = 10k², so 10k² = 40 gives k² = 4, k = ±2, not k = 4.';
 if(t==='signa')m='The sign comes from (−x)⁵ = −x⁵: odd r makes the term negative.';if(t==='cant')m='The general term with r = 5 gives the sign at once: (−1)⁵ = −1.';
 if(t==='sumpow')m='The powers must add to n: aⁿ⁻ʳ bʳ, not aʳ bʳ.';if(t==='ncr')m='The coefficient is ⁿCᵣ = n!/(r!(n − r)!), not n × r.';return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}});
A.start()})})();
