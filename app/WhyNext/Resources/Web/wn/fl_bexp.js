/* Flagship – binomial expansion for positive integer powers (ages 16–18): multiply out (1 + x)³ by choosing one term
   from each bracket and tally the products by power, slide along (a + b)⁵ to see the powers swap, build the x² term of
   (2 + 3x)⁴ from tiles (with the 3x² and 2⁴ traps), fix the signs of (2 − 3x)⁵, then pull single coefficients
   out without expanding. Every canvas tap or drag has a button twin; the canvas label says what just happened. */
(()=>{
const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹',sup=n=>String(n).split('').map(d=>SUP[+d]).join(''),nCr=(n,r)=>{let v=1;for(let i=1;i<=r;i++)v=v*(n-r+i)/i;return Math.round(v)};
const xp=k=>k===0?'':k===1?'x':'x'+sup(k),ab=(n,r)=>`${nCr(n,r)===1?'':nCr(n,r)}${n-r?'a'+(n-r>1?sup(n-r):''):''}${r?'b'+(r>1?sup(r):''):''}`;
const SIGN=[0,1,2,3,4,5].map(k=>nCr(5,k)*2**(5-k)*3**k);
const PULL=[['Coefficient of x³ in (1 − 2x)⁶',[['−160',1],['160','sign'],['−40','cube'],['20','drop']],'⁶C₃ × (−2)³ = 20 × (−8) = −160'],
 ['Coefficient of x² in (3 + x)⁵',[['90','sq'],['270',1],['30','raise'],['10','drop3']],'⁵C₂ × 3³ = 10 × 27 = 270'],
 ['Coefficient of x⁴ in (2x + 1)⁶',[['30','raise2'],['960','six'],['240',1],['15','drop2']],'⁶C₄ × 2⁴ = 15 × 16 = 240']];
const PWHY={sign:'(−2)³ is negative: an odd power of a negative number stays negative.',cube:'Raise the whole −2x to the power 3: (−2)³ = −8, not −2.',drop:'20 is only ⁶C₃. The −2 inside the bracket must be cubed and multiplied in too.',
 sq:'The 3 is raised to n − r = 5 − 2 = 3, not 2: 3³ = 27.',raise:'The 3 must be raised to the power 3. 10 × 3 forgets the power.',drop3:'10 is only ⁵C₂. Multiply by 3³ for the 3 in each of the other three brackets.',
 raise2:'The 2 belongs to 2x, so it is raised to the power 4 as well: 2⁴ = 16.',six:'Only the four 2x factors carry a 2: use 2⁴, not 2⁶.',drop2:'15 is ⁶C₄, but (2x)⁴ = 16x⁴, so the coefficient is 15 × 16.'};
VIS.reg('flagbexp',c=>{let A,ctl,quiz,qk=-1,tok=0;
const init0=()=>({want:()=>{},won:0,pick:[0,0,0],seen:[],tally:[0,0,0,0],r:-1,ask:0,slot:[null,null,null],grab:null,sg:[1,1,1,1,1,1],q:0,bad:-1,lock:0}),S=init0();
const stage=()=>['pick','slide','term','sign','pull','quiz'][A.step],rm=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function put(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function card(g,r,fill,warn,edge){const C=A.col;g.fillStyle=fill||(C.dark?'#1e293b':'#fff');A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=warn?C.rd:edge||C.ln;g.lineWidth=warn?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const on=()=>A.col.dark?'#1e3a5f':'#dbeafe',hit=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* ---- 1 one term from each bracket ---- */
function brk(i){const w=Math.min((A.W-50)/3,150);return{x:(A.W-(w*3+20))/2+i*(w+10),y:A.H*.05,w,h:A.H*.22}}
function col(k){const w=(A.W-30)/4;return{x:15+k*w,y:A.H*.5,w:w-8,h:A.H*.4}}
function flip(i){if(stage()!=='pick'||S.won>=8)return;S.pick[i]=1-S.pick[i];A.sound.tick();collect(`Bracket ${i+1} now gives ${S.pick[i]?'x':'1'}.`)}
function setPick(s){S.pick=s.split('').map(Number);collect('')}
function collect(pre){const key=S.pick.join(''),k=S.pick.reduce((a,b)=>a+b,0),prod=S.pick.map(b=>b?'x':'1').join(' × ');
 if(S.seen.includes(key)){say(`${pre} ${prod} = ${xp(k)||'1'} is already tallied. Change a bracket.`);keys();return A.redraw()}
 S.seen.push(key);S.tally[k]++;S.won++;A.sound.pop();say(`${pre} ${prod} = ${xp(k)||'1'}. ${S.won} of 8 products.${S.won>=8?' Tally: 1, 3, 3, 1, so (1 + x)³ = 1 + 3x + 3x² + x³.':''}`);keys();A.redraw();S.want()}
function drawPick(g){const C=A.col,k=S.pick.reduce((a,b)=>a+b,0);
 S.pick.forEach((b,i)=>{const r=brk(i);card(g,r,null,false,C.tx);put(g,'(',r.x+8,r.y+r.h/2,30,C.mu,400);put(g,')',r.x+r.w-8,r.y+r.h/2,30,C.mu,400);
  [['1',0],['x',1]].forEach(([t,v],j)=>{const cx=r.x+r.w*(j?.7:.3),sel=b===v;if(sel){g.fillStyle=on();g.beginPath();g.arc(cx,r.y+r.h/2,r.h*.3,0,7);g.fill()}put(g,t,cx,r.y+r.h/2,22,sel?C.tx:C.mu,sel?900:500)});put(g,'+',r.x+r.w/2,r.y+r.h/2,16,C.mu)});
 put(g,`${S.pick.map(b=>b?'x':'1').join(' × ')} = ${xp(k)||'1'}`,A.W/2,A.H*.37,16,C.tx,800);
 for(let j=0;j<4;j++){const r=col(j),h=S.tally[j]*r.h/3.6;g.fillStyle=A.alpha(C.ac,.75);g.fillRect(r.x,r.y+r.h-h-22,r.w,h);put(g,String(S.tally[j]),r.x+r.w/2,r.y+r.h-h-34,14,C.tx,800);put(g,xp(j)||'1',r.x+r.w/2,r.y+r.h-8,14,C.tx,800)}}
/* ---- 2 powers down, powers up ---- */
const ASKS=[['the a²b³ term',3],['the a⁴b term',1],['the b⁵ term',5]];
function cell(r){const w=(A.W-20)/6;return{x:10+r*w,y:A.H*.42,w:w-6,h:A.H*.2}}
function choose(r){if(stage()!=='slide'||S.won>=3||S.lock)return;S.r=r;const[q,want]=ASKS[S.ask];
 if(r!==want){A.redraw();return miss(`That is ⁵C${'₀₁₂₃₄₅'[r]} ${ab(5,r)}: a to the ${5-r}, b to the ${r}. The two powers always add to 5.`,r)}
 S.won++;A.sound.pop();say(`Yes: ${q} is ${ab(5,r)}, with coefficient ⁵C${'₀₁₂₃₄₅'[r]} = ${nCr(5,r)}.${S.won<3?' Now find '+ASKS[S.ask+1][0]+'.':' Power of a goes 5 to 0 as the power of b goes 0 to 5.'}`);
 if(S.won<3){S.lock=1;setTimeout(()=>{S.lock=0;S.ask++;keys();A.redraw()},rm()?10:400)}keys();A.redraw();S.want()}
function drawSlide(g){const C=A.col;put(g,'(a + b)⁵ = sum of ⁵Cᵣ a⁵⁻ʳ bʳ',A.W/2,A.H*.08,15,C.tx,800);put(g,S.won<3?`Tap or drag to ${ASKS[S.ask][0]}`:'All three found.',A.W/2,A.H*.2,14,C.tx,800);
 for(let r=0;r<=5;r++){const b=cell(r);card(g,b,r===S.r?on():null,S.bad===r,r===S.r?C.tx:null);put(g,ab(5,r),b.x+b.w/2,b.y+b.h*.4,A.narrow?11:14,C.tx,800);put(g,`r = ${r}`,b.x+b.w/2,b.y+b.h*.78,11,C.mu)}
 if(S.r>=0){const y=A.H*.74,L=A.W*.18,w=A.W*.64/5;put(g,'a',L-14,y,13,C.tx,800);put(g,'b',L-14,y+26,13,C.tx,800);g.fillStyle=A.alpha(C.ac,.8);g.fillRect(L,y-8,w*(5-S.r),16);g.fillStyle=A.alpha(C.vi,.8);g.fillRect(L,y+18,w*S.r,16);
  put(g,`${5-S.r} + ${S.r} = 5`,A.W/2,y+56,13,C.tx,800)}}
/* ---- 3 raise the whole term ---- */
const TILES=[['⁴C₂ = 6',0],['2² = 4',1],['(3x)² = 9x²',2],['3x²',-1],['2⁴ = 16',-2],['⁴C₃ = 4',-3]];
const TWHY={'-1':'(3x)² squares the 3 as well as the x: 3 × 3 = 9, so (3x)² = 9x², not 3x².','-2':'The 2 appears in the brackets not used for 3x: n − r = 4 − 2 = 2 of them, so 2², not 2⁴.','-3':'x² needs r = 2 brackets giving 3x, so the count is ⁴C₂ = 6, not ⁴C₃.'};
function slot(k){const w=Math.min((A.W-70)/3,160),x0=(A.W-(w*3+50))/2;return{x:x0+k*(w+25),y:A.H*.24,w,h:A.H*.16}}
function tbox(i){const cols=A.narrow?3:6,w=(A.W-20-(cols-1)*8)/cols,h=A.H*(A.narrow?.1:.14);return{x:10+(i%cols)*(w+8),y:A.H*(A.narrow?.66:.72)+Math.floor(i/cols)*(h+8),w,h}}
function place(i){if(stage()!=='term'||S.won>=3)return;const[t,k]=TILES[i];if(k<0)return miss(TWHY[k],i);if(S.slot[k]!=null)return say(`${t} is already placed.`);
 S.slot[k]=i;S.won++;A.sound.pop();say(S.won>=3?'The x² term is 6 × 4 × 9x² = 216x².':`${t}. ${['It counts which 2 of the 4 brackets give 3x.','The other 2 brackets each give a 2.','Each chosen bracket gives the whole 3x.'][k]}`);keys();A.redraw();S.want()}
function drawTerm(g){const C=A.col;put(g,'(2 + 3x)⁴: find the x² term',A.W/2,A.H*.1,16,C.tx,800);
 [0,1,2].forEach(k=>{const r=slot(k),i=S.slot[k];card(g,r,i!=null?on():null,false,C.tx);put(g,i!=null?TILES[i][0]:['ways (nCr)','the 2s','the 3x part'][k],r.x+r.w/2,r.y+r.h/2,i!=null?14:12,i!=null?C.tx:C.mu,800);if(k<2)put(g,'×',r.x+r.w+12,r.y+r.h/2,18,C.tx)});
 put(g,S.won>=3?'= 216x²':'term =',A.W/2,A.H*.52,17,C.tx,900);
 TILES.forEach((t,i)=>{if(S.slot.includes(i))return;let r=tbox(i);if(S.grab&&S.grab.i===i&&S.grab.x!=null)r={...r,x:S.grab.x-r.w/2,y:S.grab.y-r.h/2};card(g,r,C.dark?'#334155':'#fef9c3',S.bad===i);put(g,t[0],r.x+r.w/2,r.y+r.h/2,14,C.dark?'#f8fafc':'#111827',800)})}
/* ---- 4 signs of (2 − 3x)⁵ ---- */
function sbox(k){const cols=A.narrow?2:3,w=(A.W-20-(cols-1)*10)/cols,h=A.H*(A.narrow?.15:.22);return{x:10+(k%cols)*(w+10),y:A.H*.16+Math.floor(k/cols)*(h+10),w,h}}
function toggle(k){if(stage()!=='sign'||S.won>=1)return;S.sg[k]=-S.sg[k];A.sound.tick();say(`The ${xp(k)||'constant'} term is now ${S.sg[k]>0?'+':'−'}${SIGN[k]}${xp(k)}.`);keys();A.redraw()}
function checkSigns(){if(stage()!=='sign'||S.won>=1)return;const bad=[0,1,2,3,4,5].filter(k=>S.sg[k]!==(k%2?-1:1));
 if(bad.length){const k=bad[0];return miss(bad.length>=3&&S.sg.every(s=>s>0)?'b = −3x, not 3x. Odd powers of a negative are negative, so the x, x³ and x⁵ terms are negative.':`The ${xp(k)||'constant'} term contains (−3)${sup(k)}, and ${k} is ${k%2?'odd, so it is negative':'even, so it is positive'}.`,k)}
 S.won=1;A.sound.pop();say('(2 − 3x)⁵ = 32 − 240x + 720x² − 1080x³ + 810x⁴ − 243x⁵. The signs alternate.');keys();A.redraw();S.want()}
function drawSign(g){const C=A.col;put(g,'(2 − 3x)⁵: tap each term to set its sign, then Check',A.W/2,A.H*.07,13,C.tx,800);
 for(let k=0;k<6;k++){const r=sbox(k);card(g,r,S.sg[k]<0?A.alpha(C.rd,.12):on(),S.bad===k,C.tx);put(g,`${S.sg[k]>0?'+':'−'} ${SIGN[k]}${xp(k)}`,r.x+r.w/2,r.y+r.h*.4,18,C.tx,900);put(g,`⁵C${'₀₁₂₃₄₅'[k]} · 2${sup(5-k)} · (−3)${sup(k)}`,r.x+r.w/2,r.y+r.h*.76,11,C.tx)}}
/* ---- 5 pull out one coefficient ---- */
function obox(i){const w=(A.W-50)/4;return{x:10+i*(w+10),y:A.H*.5,w,h:A.H*.2}}
function pick(i){if(stage()!=='pull'||S.won>=3||S.lock)return;const[q,ops,how]=PULL[S.q],[t,ok]=ops[i];if(ok!==1)return miss(PWHY[ok],i);
 S.won++;A.sound.pop();say(`${q} = ${how}.`);if(S.won<3){S.lock=1;setTimeout(()=>{S.lock=0;S.q++;say(PULL[S.q][0]+'?');keys();A.redraw()},rm()?10:500)}keys();A.redraw();S.want()}
function drawPull(g){const C=A.col,[q,ops,how]=PULL[Math.min(S.q,2)];put(g,q,A.W/2,A.H*.12,15,C.tx,800);put(g,'nCr × (first)ⁿ⁻ʳ × (second)ʳ',A.W/2,A.H*.25,13,C.tx);
 ops.forEach(([t],i)=>{const r=obox(i);card(g,r,null,S.bad===i,C.tx);put(g,t,r.x+r.w/2,r.y+r.h/2,18,C.tx,900)});if(S.lock||S.won>=3)put(g,how,A.W/2,A.H*.84,13,C.tx,800)}
/* ---- shared ---- */
function miss(t,b){A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){put(g,'(a + b)ⁿ = Σ ⁿCᵣ aⁿ⁻ʳ bʳ',W/2,H*.4,20,C.tx,800);put(g,'Raise the whole term, keep the sign.',W/2,H*.62,13,C.tx);return}
 ({pick:drawPick,slide:drawSlide,term:drawTerm,sign:drawSign,pull:drawPull})[v](g);A.fx.draw(g)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='pick'&&S.won<8)S.pick.forEach((b,i)=>B(`Bracket ${i+1}: ${b?'x':'1'}`,()=>flip(i),`Switch bracket ${i+1}, now ${b?'x':'1'}`));
 if(v==='slide'&&S.won<3)for(let r=0;r<=5;r++)B(ab(5,r),()=>choose(r),`Term r = ${r}`);
 if(v==='term'&&S.won<3)TILES.forEach((t,i)=>{if(!S.slot.includes(i))B(t[0],()=>place(i),`Place tile ${t[0]}`)});
 if(v==='sign'&&S.won<1){for(let k=0;k<6;k++)B(`${S.sg[k]>0?'+':'−'}${SIGN[k]}${xp(k)}`,()=>toggle(k),`Switch the sign of the ${xp(k)||'constant'} term`);B('Check',checkSigns,'Check the signs')}
 if(v==='pull'&&S.won<3)PULL[S.q][1].forEach(([t],i)=>B(t,()=>pick(i),`Answer ${t}`))}
function down(p){const v=stage();
 if(v==='pick'){const i=[0,1,2].find(i=>hit(p,brk(i)));if(i!=null)flip(i);return false}
 if(v==='slide'){const r=[0,1,2,3,4,5].find(r=>hit(p,cell(r)));if(r!=null){S.grab={slide:1,r};S.r=r;A.redraw();return true}return false}
 if(v==='term'){const i=TILES.findIndex((t,i)=>!S.slot.includes(i)&&hit(p,tbox(i)));if(i>=0){S.grab={i,x:null,x0:p.x,y0:p.y};return true}return false}
 if(v==='sign'){const k=[0,1,2,3,4,5].find(k=>hit(p,sbox(k)));if(k!=null)toggle(k);return false}
 if(v==='pull'){const i=[0,1,2,3].find(i=>hit(p,obox(i)));if(i!=null)pick(i)}return false}
function move(p){const gr=S.grab;if(!gr)return;if(gr.slide){const r=[0,1,2,3,4,5].find(r=>p.x>cell(r).x&&p.x<cell(r).x+cell(r).w+6);if(r!=null&&r!==S.r){S.r=r;say(`Hovering ${ab(5,r)}.`);A.redraw()}return}
 if(gr.x!=null||Math.hypot(p.x-gr.x0,p.y-gr.y0)>8){gr.x=p.x;gr.y=p.y;A.redraw()}}
function up(p){const gr=S.grab;S.grab=null;if(!gr)return;if(gr.slide)return choose(S.r);if(gr.x!=null&&p.y>A.H*.6){say('Drop the tile on the term.');return A.redraw()}place(gr.i);A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const clear=()=>{tok++;Object.assign(S,init0())};
const ALL=['001','010','100','011','101','110','111'];
const steps=[
{h:'One from each bracket',p:'(1 + x)³ is three brackets multiplied. Each product takes 1 or x from every bracket. Tap the brackets to make all 8 products and watch the tally.',predict:{q:'How many of the 8 products equal x²?',opts:['1','2','3'],ans:2},task:'Make all 8 products',
 show:()=>{steps[0].go();demo(ALL.map(s=>()=>setPick(s)),400)},go:()=>{clear();S.seen=['000'];S.tally=[1,0,0,0];S.won=1;say('1 × 1 × 1 = 1 is tallied. Tap a bracket to change it.');keys();S.want=ready(0,()=>S.won>=8,'The tallies 1, 3, 3, 1 are ³C₀ to ³C₃.')}},
{h:'Powers down, powers up',p:'Each term of (a + b)⁵ uses a five times between a and b. Drag along the terms or tap one.',predict:{q:'The term with b³ has which power of a?',opts:['a³','a²','a⁵'],ans:1},task:'Find 3 terms',
 show:()=>{steps[1].go();demo([3,1,5].map(r=>()=>choose(r)),700)},go:()=>{clear();say('Find the a²b³ term.');keys();S.want=ready(1,()=>S.won>=3,'In term r, a has power n − r and b has power r.')}},
{h:'Raise the whole term',p:'Find the x² term of (2 + 3x)⁴ without expanding. Drag or tap the three tiles that multiply to give it.',predict:{q:'What is (3x)²?',opts:['3x²','9x²'],ans:1},task:'Fill the 3 slots',
 show:()=>{steps[2].go();demo([0,1,2].map(i=>()=>place(i)),600)},go:()=>{clear();say('Pick a tile for each slot.');keys();S.want=ready(2,()=>S.won>=3,'Raise the whole second term, 3x, not just x.')}},
{h:'Keep the sign',p:'In (2 − 3x)⁵ the second term is −3x. Tap each term to set its sign, then check.',predict:{q:'Is the x³ term of (2 − 3x)⁵ positive or negative?',opts:['Positive','Negative'],ans:1},task:'Fix all 6 signs',
 show:()=>{steps[3].go();demo([1,3,5].map(k=>()=>toggle(k)).concat([checkSigns]),500)},go:()=>{clear();say('All signs start as plus. Fix them.');keys();S.want=ready(3,()=>S.won>=1,'With a negative second term, odd powers give minus.')}},
{h:'Pull out one coefficient',p:'Exams ask for one coefficient, not the whole expansion. Pick the right value.',task:'Answer 3',
 show:()=>{steps[4].go();demo([0,()=>{},1,()=>{},2].map(j=>typeof j==='function'?j:()=>pick(PULL[S.q][1].findIndex(o=>o[1]===1))),450)},go:()=>{clear();say(PULL[0][0]+'?');keys();S.want=ready(4,()=>S.won>=3,'Choose r from the power of x, then raise both parts.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
const QS=[['Expand (1 + x)³.',[['1 + 3x + 3x² + x³','ok'],['1 + x³','cube'],['1 + 3x + x³','gap']]],
 ['The x² term of (2 + x)⁴ is',[['24x²','ok'],['6x²','noA'],['96x²','pow']]],
 ['The coefficient of x³ in (1 − x)⁴ is',[['−4','ok'],['4','plus'],['−1','noC']]],
 ['How many terms are in the expansion of (a + b)⁷?',[['8','ok'],['7','off'],['14','dbl']]],
 ['The x³ term of (x + 2)⁵ is',[['40x³','ok'],['80x³','swap'],['10x³','noB']]]];
function why(t){let m='Use ⁿCᵣ aⁿ⁻ʳ bʳ and raise each whole part.';
 if(t==='cube')m='(1 + x)³ is not 1 + x³: mixing brackets gives 3x and 3x² as well.';if(t==='gap')m='Every power from x⁰ to x³ appears. The x² term is ³C₂ x² = 3x².';
 if(t==='noA')m='⁴C₂ = 6, but the 2 is raised to 4 − 2 = 2: 6 × 4 = 24.';if(t==='pow')m='The 2 is raised to n − r = 2, not 4: 6 × 2² = 24.';
 if(t==='plus')m='The second term is −x, and (−1)³ = −1, so the coefficient is ⁴C₃ × (−1) = −4.';if(t==='noC')m='Do not forget ⁴C₃ = 4: there are 4 ways to choose the three −x brackets.';
 if(t==='off')m='Powers of b run from 0 to 7, which is 8 terms: n + 1.';if(t==='dbl')m='One term for each power of b from 0 to 7: 8 terms, not 2n.';
 if(t==='swap')m='x³ uses three x brackets, so the 2 comes from the other 5 − 3 = 2: 10 × 2² = 40.';if(t==='noB')m='10 is ⁵C₂. Multiply by 2² = 4 for the two brackets that give 2.';return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}});
A.start()})})();
