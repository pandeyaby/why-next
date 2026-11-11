/* Flagship – the molecular ion peak (ages 16–18; A-level Chemistry mass spectrometry: M⁺ is the peak with the highest
   m/z apart from the small M+1 isotope peak, and it gives Mr). Pick M⁺ in real-shaped spectra where the base peak
   is a decoy; skip the ¹³C M+1 peak; work out Mr from formulae to name unknowns; find fragment peaks by mass lost; and
   tell compounds apart by M⁺, including two with the same Mr. Intensities rounded from NIST EI spectra.
   Every tap has a button twin; the canvas label reads the selected peak.
   Not flagtof (how a time-of-flight spectrometer works) or flaginstr (choosing between instrumental methods). */
(()=>{
const SP={
 pentane:{f:'C₅H₁₂',name:'pentane',M:72,p:[[27,30],[29,35],[41,45],[42,55],[43,100],[57,15],[72,10]]},
 ethanol:{f:'C₂H₅OH',name:'ethanol',M:46,p:[[27,21],[29,23],[31,100],[45,51],[46,22]]},
 propanone:{f:'CH₃COCH₃',name:'propanone',M:58,p:[[15,30],[42,8],[43,100],[58,64]]},
 hexane:{f:'C₆H₁₄',name:'hexane',M:86,p:[[29,45],[41,70],[43,80],[56,45],[57,100],[71,20],[86,15],[87,1]]},
 butane:{f:'C₄H₁₀',name:'butane',M:58,p:[[15,7],[27,35],[29,45],[41,30],[43,100],[58,12],[59,.6]]},
 benzene:{f:'C₆H₆',name:'benzene',M:78,p:[[50,15],[51,20],[52,20],[77,20],[78,100],[79,6.6]]},
 propane:{f:'C₃H₈',name:'propane',M:44,p:[[15,6],[26,10],[27,40],[28,60],[29,100],[43,23],[44,27],[45,.9]]},
 propanol:{f:'C₃H₇OH',name:'propan-1-ol',M:60,p:[[27,15],[29,15],[31,100],[42,15],[59,10],[60,6],[61,.2]]},
 butanol:{f:'C₄H₉OH',name:'butan-1-ol',M:74,p:[[27,20],[31,100],[41,60],[43,60],[56,90],[74,2]]}};
const FIND=['pentane','ethanol','propanone'],ISO=['hexane','butane','benzene'];
const IDENT=[['propane',[['C₃H₈',44],['C₂H₆',30],['C₄H₁₀',58]]],['propanol',[['C₂H₅OH',46],['C₃H₇OH',60],['C₃H₆O',58]]],['butanol',[['C₅H₁₂',72],['C₃H₇OH',60],['C₄H₉OH',74]]]];
const FRAG=[['pentane',57,'CH₃',15],['pentane',43,'C₂H₅',29],['ethanol',31,'CH₃',15]];
const PAIRS=[['ethanol','propanol','Which is propan-1-ol, C₃H₇OH (Mr 60)?',1],['hexane','pentane','Which is hexane, C₆H₁₄ (Mr 86)?',0],['butane','propanone','Which is propanone, CH₃COCH₃?',2]];
const top=s=>s.p.reduce((a,b)=>b[1]>a[1]?b:a)[0],mz=(s,i)=>s.p[i][0];
VIS.reg('flagmion',c=>{let A,ctl,quiz,qk=-1,tok=0;const S={};
function fresh(){tok++;Object.assign(S,{want:()=>{},won:0,j:0,bad:-1,lock:0,grab:0,cur:-1,cards:-1})}
const stage=()=>['find','iso','ident','frag','pair','quiz'][A.step],rm=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function write(g,t,x,y,size,weight,align,col){g.font=`${weight||700} ${fs(size)}px system-ui,sans-serif`;g.textAlign=align||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
function tile(g,r,stroke,lw){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=stroke||C.tx;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke()}
const within=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function hold(fn,ms){const k=tok;setTimeout(()=>{if(k===tok)fn()},rm()?10:ms)}
function demo(list,gap){const k=++tok;list.forEach((fn,i)=>setTimeout(()=>{if(k===tok)fn()},rm()?i*40+30:(i+1)*(gap||400)))}
function nope(t,b){A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:1000);A.redraw()}
/* the spectrum currently on screen */
function spec(){const v=stage();if(v==='find')return SP[FIND[Math.min(S.j,2)]];if(v==='iso')return SP[ISO[Math.min(S.j,2)]];if(v==='ident')return SP[IDENT[Math.min(S.j,2)][0]];if(v==='frag')return SP[FRAG[Math.min(S.j,2)][0]];return null}
function frame(){const v=stage();return{x:A.W*.1,y:A.H*.12,w:A.W*.86,h:A.H*(v==='ident'?.46:.66)}}
const maxMz=s=>Math.ceil((s.p[s.p.length-1][0]+8)/10)*10,X=(s,m,r)=>r.x+(m-10)/(maxMz(s)-10)*r.w,Y=(v,r)=>r.y+r.h-v/100*r.h;
function drawSpectrum(g,s,r,opt){const C=A.col;g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(r.x,r.y);g.lineTo(r.x,r.y+r.h);g.lineTo(r.x+r.w,r.y+r.h);g.stroke();
 const M=maxMz(s);for(let m=10;m<=M;m+=M>70?20:10){g.fillStyle=C.tx;g.fillRect(X(s,m,r)-1,r.y+r.h,2,5);write(g,String(m),X(s,m,r),r.y+r.h+13,9,700)}
 if(!opt.small){write(g,'m/z',r.x+r.w,r.y+r.h+26,10,800,'right',C.mu);[50,100].forEach(v=>write(g,String(v),r.x-4,Y(v,r),9,700,'right',C.mu));write(g,'%',r.x-4,r.y-10,9,800,'right',C.mu)}
 const bw=Math.max(4,Math.min(9,r.w/(M-10)*1.2));s.p.forEach(([m,v],i)=>{const sel=i===opt.cur,bad=opt.bad===i,h=Math.max(3,v/100*r.h);
  g.fillStyle=bad?C.rd:sel?C.ac:C.cy;g.fillRect(X(s,m,r)-bw/2,r.y+r.h-h,bw,h);if(sel||bad||opt.all)write(g,String(m),X(s,m,r),r.y+r.h-h-10,opt.small?9:11,900,'center',bad?C.rd:C.tx)})}
function peakAt(s,p,r){let b=-1,d=1e9;s.p.forEach(([m],i)=>{const dx=Math.abs(X(s,m,r)-p.x);if(dx<d){d=dx;b=i}});return d<Math.max(14,r.w/40)?b:-1}
function setCur(i){const s=spec();if(!s||i<0||i>=s.p.length)return;S.cur=i;A.sound.tick();const[m,v]=s.p[i];say(`m/z ${m}, ${v<1?'under 1':Math.round(v)}% of the tallest peak.${v===100?' This is the base peak.':''}`);keys();A.redraw()}
/* step 1 and 2: pick M⁺ */
function pickPeak(){const v=stage();if((v!=='find'&&v!=='iso'&&v!=='frag')||S.lock||S.cur<0)return;const s=spec(),m=mz(s,S.cur);
 if(v==='frag')return pickFrag(m);if(S.won>=3)return;
 if(m!==s.M){let t;if(m===s.M+1)t=`m/z ${m} is the M+1 peak. About 1.1% of carbon atoms are carbon-13, so a few molecules weigh 1 more. M⁺ is the bigger peak just before it, at ${s.M}.`;
  else if(m===top(s))t=`m/z ${m} is the base peak: the tallest, from the most common ion. It is a fragment, not the whole molecule. M⁺ is further right.`;
  else t=`m/z ${m} is a fragment, lighter than the whole molecule. Look further right for M⁺.`;return nope(t,S.cur)}
 S.won++;A.sound.pop();say(`M⁺ = ${s.M}, so the Mr of ${s.name} (${s.f}) is ${s.M}.${top(s)===s.M?' Here M⁺ is also the base peak.':''}`);
 if(S.won<3){S.lock=1;hold(()=>{S.lock=0;S.j++;S.cur=-1;keys();A.redraw();say(`Spectrum ${S.j+1}. Tap the M⁺ peak.`)},900)}keys();A.redraw();S.want()}
/* step 3: name the unknown */
const cardR=k=>{const w=(A.W-32)/3;return{x:8+k*(w+8),y:A.H*.72,w,h:A.H*.2}};
function pickCard(k){if(stage()!=='ident'||S.lock||S.won>=3)return;const[id,opts]=IDENT[S.j],s=SP[id],[f,mr]=opts[k];
 if(mr!==s.M)return nope(`${f} has Mr ${mr}, but M⁺ here is at ${s.M}.${mr===s.M-1||mr===s.M+1?'':' Add up C = 12, H = 1, O = 16.'}`,k);
 S.won++;A.sound.pop();say(`Yes: ${f} has Mr ${mr}, matching M⁺ at ${s.M}. It is ${s.name}.`);
 if(S.won<3){S.lock=1;hold(()=>{S.lock=0;S.j++;S.cur=-1;keys();A.redraw()},900)}keys();A.redraw();S.want()}
/* step 4: fragments */
function pickFrag(m){if(S.won>=3)return;const[id,want,grp,loss]=FRAG[S.j],s=SP[id];
 if(m!==want){const t=m===s.M?`That is M⁺ itself, the whole molecule. Losing ${grp} (${loss}) leaves ${s.M} − ${loss} = ${want}.`:m>s.M?`A fragment cannot be heavier than the molecule.`:`m/z ${m} means losing ${s.M} − ${m} = ${s.M-m}. Losing ${grp} takes away ${loss}.`;return nope(t,S.cur)}
 S.won++;A.sound.pop();say(`m/z ${want} = ${s.M} − ${loss}: ${s.name} lost ${grp}.`);
 if(S.won<3){S.lock=1;hold(()=>{S.lock=0;S.j++;S.cur=-1;keys();A.redraw()},900)}keys();A.redraw();S.want()}
/* step 5: tell two compounds apart */
const half=k=>({x:A.W*(k?.56:.08),y:A.H*.3,w:A.W*.38,h:A.H*.36}),choiceR=k=>({x:8+k*((A.W-24)/3+4),y:A.H*.8,w:(A.W-24)/3-4,h:A.H*.13});
function pickPair(k){if(stage()!=='pair'||S.lock||S.won>=3)return;const[a,b,,ans]=PAIRS[S.j],sa=SP[a],sb=SP[b];
 if(k!==ans){const t=ans===2?`Both have M⁺ at 58: butane C₄H₁₀ is 4×12 + 10 = 58 and propanone C₃H₆O is 3×12 + 6 + 16 = 58. M⁺ alone cannot tell them apart.`:
  k===2?`These M⁺ peaks differ (${sa.M} and ${sb.M}), so M⁺ does tell them apart.`:`Spectrum ${'AB'[k]} has M⁺ at ${[sa,sb][k].M}. The compound asked for has a different Mr.`;return nope(t,k)}
 S.won++;A.sound.pop();say(ans===2?'Right: same Mr, same M⁺. You would need the fragment pattern or another technique.':`Yes: M⁺ at ${[sa,sb][ans].M} matches.`);
 if(S.won<3){S.lock=1;hold(()=>{S.lock=0;S.j++;keys();A.redraw()},900)}keys();A.redraw();S.want()}
function drawPair(g){const C=A.col,[a,b,q]=PAIRS[Math.min(S.j,2)];write(g,S.won<3?q:'All three pairs done.',A.W/2,A.H*.08,A.narrow?12:14,900);
 [a,b].forEach((id,k)=>{const r=half(k);write(g,`Spectrum ${'AB'[k]}`,r.x+r.w/2,r.y-16,12,900,'center',S.bad===k?C.rd:C.tx);drawSpectrum(g,SP[id],r,{small:1,cur:SP[id].p.findIndex(p=>p[0]===SP[id].M)})});
 ['Spectrum A','Spectrum B','M⁺ cannot tell'].forEach((t,k)=>{const r=choiceR(k);tile(g,r,S.bad===k?C.rd:C.ln,S.bad===k?4:2);write(g,t,r.x+r.w/2,r.y+r.h/2,A.narrow?11:13,800)})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#f5f3ff',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){write(g,'M⁺: highest m/z, apart from the tiny M+1',W/2,H*.38,15,900,'center',C.ac);write(g,'m/z of M⁺ = Mr',W/2,H*.58,18,900);return}
 if(v==='pair'){drawPair(g);A.fx.draw(g);return}
 const s=spec(),r=frame(),n=v==='frag'?3:3;drawSpectrum(g,s,r,{cur:S.cur,bad:S.bad});
 const head={find:`Spectrum ${Math.min(S.j,2)+1}: tap the M⁺ peak`,iso:`${s.f}: tap the M⁺ peak`,ident:'Unknown: find M⁺, then tap its formula',frag:`${s.name}, M⁺ = ${s.M}: tap the peak for losing ${FRAG[Math.min(S.j,2)][2]} (${FRAG[Math.min(S.j,2)][3]})`}[v];
 write(g,S.won>=n?'All three done.':head,A.W/2,A.H*.05,A.narrow?12:13,900);
 if(v==='ident'){IDENT[Math.min(S.j,2)][1].forEach(([f],k)=>{const cr=cardR(k);tile(g,cr,S.bad===k?C.rd:C.ln,S.bad===k?4:2);write(g,f,cr.x+cr.w/2,cr.y+cr.h/2,A.narrow?14:17,900)});write(g,'C = 12, H = 1, O = 16',A.W/2,A.H*.67,11,800,'center',C.mu)}
 else write(g,`Drag along the axis or use the buttons. ${Math.min(S.won,3)} of 3`,A.W/2,A.H*.96,11,700,'center',C.mu);A.fx.draw(g)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='pair'){if(S.won<3)['Spectrum A','Spectrum B','M⁺ cannot tell'].forEach((t,k)=>B(t,()=>pickPair(k)));return}
 if(S.won>=3)return;const s=spec();B('◀ Peak',()=>setCur(S.cur<0?s.p.length-1:Math.max(0,S.cur-1)),'Previous peak');B('Peak ▶',()=>setCur(S.cur<0?0:Math.min(s.p.length-1,S.cur+1)),'Next peak');
 if(v==='ident')IDENT[S.j][1].forEach(([f],k)=>B(f,()=>pickCard(k)));else B('Choose this peak',pickPeak)}
function down(p){const v=stage();if(v==='quiz')return false;if(v==='pair'){const k=[0,1,2].find(k=>within(p,choiceR(k)));if(k!=null)pickPair(k);return false}
 if(v==='ident'){const k=[0,1,2].find(k=>within(p,cardR(k)));if(k!=null){pickCard(k);return false}}
 S.grab=1;const i=peakAt(spec(),p,frame());if(i>=0)setCur(i);return true}
function move(p){if(!S.grab)return;const i=peakAt(spec(),p,frame());if(i>=0&&i!==S.cur)setCur(i)}
function up(p){if(!S.grab)return;S.grab=0;const v=stage();if(v==='ident')return;const i=p?peakAt(spec(),p,frame()):-1;if(i>=0&&i===S.cur)pickPeak()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const choose=(id,m)=>[()=>setCur(SP[id].p.findIndex(p=>p[0]===m)),pickPeak,()=>0,()=>0,()=>0];
const steps=[
{h:'Find M⁺',p:'In the spectrometer some whole molecules lose one electron and become molecular ions, M⁺. Others break into fragments. Tap a peak, or step to it with the buttons, and choose the M⁺ peak.',
 predict:{q:'Which peak gives the molecule’s relative molecular mass?',opts:['The tallest peak','The peak with the highest m/z','The first peak on the left'],ans:1},task:'Find M⁺ in 3 spectra',
 show:()=>{steps[0].go();demo(FIND.flatMap(id=>choose(id,SP[id].M)),300)},go:()=>{fresh();keys();say('Spectrum 1. Tap the M⁺ peak.');S.want=ready(0,()=>S.won>=3,'M⁺ is the peak with the highest m/z, not the tallest.')}},
{h:'Skip the tiny M+1',p:'Carbon-13 makes a few molecules 1 heavier, so a very small M+1 peak sits just right of M⁺. Choose the true M⁺ in each spectrum.',
 predict:{q:'Hexane shows a big peak at 86 and a tiny one at 87. Which is M⁺?',opts:['87: it has the highest m/z','86: 87 is a carbon-13 isotope peak','Neither: M⁺ is the base peak at 57'],ans:1},task:'Find M⁺ in 3 more spectra',
 show:()=>{steps[1].go();demo(ISO.flatMap(id=>choose(id,SP[id].M)),300)},go:()=>{fresh();keys();say(`${SP.hexane.f}: tap the M⁺ peak.`);S.want=ready(1,()=>S.won>=3,'Ignore the small M+1 peak. Sometimes M⁺ is the base peak too.')}},
{h:'Name the unknown',p:'Read M⁺ to get Mr. Then add up each formula’s relative atomic masses and tap the one that matches.',task:'Name 3 unknowns',
 show:()=>{steps[2].go();demo(IDENT.flatMap(([id,opts])=>[()=>pickCard(opts.findIndex(o=>o[1]===SP[id].M)),()=>0,()=>0]),400)},go:()=>{fresh();keys();say('Unknown 1. Find M⁺, then tap its formula.');S.want=ready(2,()=>S.won>=3,'Mr from M⁺, then match it to a formula.')}},
{h:'Fragments are lighter',p:'Fragments come from M⁺ breaking. Each peak to the left is M⁺ minus the piece it lost. Tap the peak for each loss.',
 predict:{q:'Can a fragment peak have a higher m/z than M⁺?',opts:['Yes, if it is a big fragment','No: a fragment is only part of the molecule'],ans:1},task:'Find 3 fragment peaks',
 show:()=>{steps[3].go();demo(FRAG.flatMap(([id,m])=>choose(id,m)),300)},go:()=>{fresh();keys();say('Pentane, M⁺ 72. Tap the peak for losing CH₃, mass 15.');S.want=ready(3,()=>S.won>=3,'Mass lost = M⁺ − fragment m/z.')}},
{h:'Tell them apart',p:'Two spectra, highlighted at M⁺. Pick the one that matches the compound, or say that M⁺ alone cannot tell.',
 predict:{q:'Butane C₄H₁₀ and propanone C₃H₆O. Will their M⁺ peaks differ?',opts:['Yes: different formulas give different M⁺','No: both have Mr 58'],ans:1},task:'Decide 3 pairs',
 show:()=>{steps[4].go();demo(PAIRS.flatMap(p=>[()=>pickPair(p[3]),()=>0,()=>0]),400)},go:()=>{fresh();keys();say(PAIRS[0][2]);S.want=ready(4,()=>S.won>=3,'M⁺ tells compounds apart only when their Mr differs.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
const QS=[['A spectrum has its tallest peak at m/z 43 and peaks at 57 and 72, plus a tiny one at 73. What is Mr?',[['72','ok'],['43','base'],['73','m1']]],
 ['Which formula matches an M⁺ peak at m/z 46?',[['C₂H₅OH','ok'],['C₂H₆','sum'],['C₃H₈','sum44']]],
 ['Pentane (M⁺ 72) has a peak at m/z 57. What was lost?',[['CH₃, mass 15','ok'],['C₂H₅, mass 29','frag'],['An electron only','ion']]],
 ['Why is there a tiny peak one unit above M⁺?',[['Some molecules contain a carbon-13 atom','ok'],['It is the real molecular ion','m1'],['Some molecules gained a hydrogen atom','gain']]],
 ['Butane and propanone both show M⁺ at 58. What does that tell you?',[['They have the same Mr; M⁺ alone cannot tell them apart','ok'],['They are the same compound','same'],['One of the spectra is wrong','error']]]];
function why(t){let m='M⁺ is the peak with the highest m/z apart from the tiny M+1, and its m/z equals Mr.';
 if(t==='base')m='43 is the base peak, the most common fragment. M⁺ is at 72, the highest m/z apart from the tiny 73.';if(t==='m1')m='The tiny peak one above M⁺ is the M+1 peak from carbon-13. M⁺ is the bigger peak just before it.';
 if(t==='sum')m='C₂H₆ is 2 × 12 + 6 × 1 = 30, not 46. C₂H₅OH is 24 + 6 + 16 = 46.';if(t==='sum44')m='C₃H₈ is 3 × 12 + 8 = 44, not 46. C₂H₅OH is 46.';
 if(t==='frag')m='72 − 57 = 15, which is CH₃. Losing C₂H₅ (29) would give 43.';if(t==='ion')m='Losing an electron makes M⁺ at 72 itself. A peak at 57 means a piece of mass 15 broke off.';
 if(t==='gain')m='Ions in the spectrometer are not picking up hydrogen. A carbon-13 atom makes the molecule 1 heavier.';
 if(t==='same')m='Same Mr does not mean same compound: C₄H₁₀ and C₃H₆O both add up to 58. Use fragments, IR or NMR to tell them apart.';if(t==='error')m='Both are correct: different formulas can add up to the same Mr of 58.';return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
