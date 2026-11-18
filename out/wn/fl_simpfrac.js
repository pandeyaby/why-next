/* Flagship: simplifying fractions (ages 10–11; NC England Y5–6: use common factors to simplify fractions and common
   multiples to express fractions in the same denomination; CCSS 4.NF.A.1). Group the pieces of a bar into bigger equal
   groups, find the HCF from two factor rows, test moves that do and do not keep the amount, re-cut two bars into a common
   denominator and simplify in one move. Every tap on the canvas also has a button. */
(()=>{
const gcd=(a,b)=>b?gcd(b,a%b):a;
const F18=[1,2,3,6,9,18],F24=[1,2,3,4,6,8,12,24],COMMON=[1,2,3,6];
const MOVES=[{t:'÷ 6 top and bottom',n:3,d:4,ok:1},{t:'− 15 top and bottom',n:3,d:9},{t:'÷ 6 on top only',n:3,d:24}];
const DEN=[6,12,16,24],ROUNDS=[[12,16],[15,25],[14,21]],HCH=[2,3,4,5,7];
VIS.reg('flagsimpfrac',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',EDGE='#94a3b8',WHITE='#ffffff',GOOD='#047857',BAD='#b91c1c',NAVY='#1e3a8a',NOTE='#eef2ff',WON='#dcfce7',SH='#60a5fa',SH2='#fbbf24',PICK='#fde68a';
const MODE=['group','hcf','moves','common','one','chal'],mode=()=>MODE[A.step];
const z=n=>Math.round(n*(A.narrow?1:1.1)),font=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function txt(s,x,y,n,col,al){Z.font=font(n);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-14)}
function wrap(s,max,n){Z.font=font(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(r,fill,edge,lw,rad){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,rad==null?9:rad);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function boxText(r,s,n,col){const L=wrap(s,r.w-12,n),lh=z(n)+4;L.forEach((l,i)=>txt(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col))}
function banner(s,ok){const r={x:10,y:8,w:A.W-20,h:A.H*(A.narrow?.1:.12)};box(r,ok?WON:NOTE,ok?GOOD:NAVY,2);boxText(r,s,13,ok?GOOD:INK)}
function note(){if(!S.msg)return;const L=wrap((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-6;box({x:10,y,w:A.W-20,h},WHITE,S.bad?BAD:GOOD,3);L.forEach((l,i)=>txt(l,A.W/2,y+5+lh*(i+.5),13))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const wrong=s=>{S.bad=true;S.msg=s;A.sound.miss();refresh()};
const right=s=>{S.bad=false;S.msg=s;A.sound.pop()};
/* a bar of d equal pieces with n shaded, label n/d at the left */
function bar(n,d,y,col,lab){const x=16+z(50),w=A.W-x-16,h=z(30),pw=w/d;Z.fillStyle=WHITE;Z.fillRect(x,y,w,h);Z.fillStyle=col||SH;Z.fillRect(x,y,pw*n,h);
 Z.strokeStyle=INK;Z.lineWidth=1;for(let i=1;i<d;i++){Z.beginPath();Z.moveTo(x+i*pw,y);Z.lineTo(x+i*pw,y+h);Z.stroke()}Z.lineWidth=2.5;Z.strokeRect(x,y,w,h);
 txt(lab||`${n}/${d}`,16+z(24),y+h/2,15,INK);return{x,y,w,h}}
/* a row of tappable number chips */
function chipR(i,k,y){const w=Math.min(z(54),(A.W-32-(k-1)*8)/k),tot=k*w+(k-1)*8;return{x:(A.W-tot)/2+i*(w+8),y,w,h:z(40)}}
function chips(list,y,state){list.forEach((v,i)=>{const r=chipR(i,list.length,y),st=state(v);box(r,st==='ok'?WON:st==='bad'?'#fee2e2':st==='sel'?PICK:WHITE,st==='ok'?GOOD:st==='bad'?BAD:NAVY,2);txt(v,r.x+r.w/2,r.y+r.h/2,15)})}
const chipAt=(p,list,y)=>list.findIndex((v,i)=>inR(p,chipR(i,list.length,y)));
const HY=k=>A.H*(A.narrow?[.19,.36][k]:[.24,.42][k]);
const Y=k=>A.H*(A.narrow?[.16,.3,.48,.6][k]:[.2,.37,.58,.7][k]);
/* step 1: group pieces */
function drawGroup(){const {n,d}=S,ok=gcd(n,d)===1;banner(ok?`${n}/${d} is in simplest form: only 1 goes into both ${n} and ${d}.`:'Tap a group size. Each group must hold whole pieces of the shaded part AND of the whole bar.',ok);
 bar(18,24,Y(0),SH,'18/24');bar(n,d,Y(1),SH2);txt('Group size:',A.W/2,Y(2)-z(14),12,SOFT);chips([2,3,4,5,6],Y(2),v=>S.tried[v]||'')}
function group(g){if(gcd(S.n,S.d)===1)return;A.sound.tick();const {n,d}=S;
 if(n%g||d%g){S.tried[g]='bad';return wrong(d%g&&n%g?`${g} does not go into ${n} or ${d}.`:n%g?`${g} goes into ${d} but not ${n}: the ${n} shaded pieces will not make whole groups of ${g}.`:`${g} goes into ${n} but not ${d}.`)}
 S.n=n/g;S.d=d/g;S.tried={};S.tried[g]='ok';if(gcd(S.n,S.d)===1)right(`${n}/${d} = ${S.n}/${S.d}. Same shaded length, fewer and bigger pieces.`);else{S.bad=false;S.msg=`${n}/${d} = ${S.n}/${S.d}. Can you make bigger groups still?`}refresh()}
/* step 2: common factors and the HCF */
function drawHcf(){const ok=COMMON.every(v=>S.got.includes(v));banner(ok?'Common factors 1, 2, 3, 6. The highest is 6: 18/24 ÷ 6 = 3/4 in one move.':'Tap every number that is a factor of BOTH 18 and 24.',ok);
 const st=v=>S.got.includes(v)?'ok':S.bad&&S.last===v?'bad':'';txt('Factors of 18',A.W/2,HY(0)-z(11),12,SOFT);chips(F18,HY(0),st);txt('Factors of 24',A.W/2,HY(1)-z(11),12,SOFT);chips(F24,HY(1),st);
 if(ok){bar(18,24,HY(1)+z(52),SH,'18/24');bar(3,4,HY(1)+z(92),SH2,'3/4')}}
function tapF(v){A.sound.tick();S.last=v;if(!COMMON.includes(v))return wrong(`${v} is a factor of ${F18.includes(v)?18:24} but not of ${F18.includes(v)?24:18}: ${F18.includes(v)?24:18} ÷ ${v} leaves a remainder.`);
 if(!S.got.includes(v))S.got.push(v);if(COMMON.every(x=>S.got.includes(x)))right('6 is the highest common factor (HCF). Dividing by it gives the simplest form straight away.');else{S.bad=false;S.msg=`${v} goes into 18 and 24.`}refresh()}
/* step 3: test three moves */
function drawMoves(){const ok=S.tested.length===3;banner(ok?'Only dividing top AND bottom by the same number keeps the amount.':'Tap each move to test it against 18/24.',ok);
 bar(18,24,Y(0),SH,'18/24');const m=MOVES[S.cur];if(m)bar(m.n,m.d,Y(1),m.ok?SH2:'#fca5a5');
 MOVES.forEach((mv,i)=>{const r=moveR(i),t=S.tested.includes(i);box(r,t?(mv.ok?WON:'#fee2e2'):S.cur===i?PICK:WHITE,t?(mv.ok?GOOD:BAD):NAVY,2);boxText(r,mv.t+(t?` → ${mv.n}/${mv.d}`:''),12)})}
const moveR=i=>A.narrow?{x:14,y:Y(2)+i*z(44),w:A.W-28,h:z(38)}:{x:14+i*((A.W-28)/3),y:Y(2),w:(A.W-28)/3-8,h:z(46)};
function tryMove(i){const m=MOVES[i];S.cur=i;A.sound.tick();if(!S.tested.includes(i))S.tested.push(i);
 const done=S.tested.length===3;if(m.ok){S.bad=false;S.msg='18/24 → 3/4: the bars match. Dividing both by 6 is just bigger pieces.'}
 else if(i===1){S.bad=true;S.msg='3/9 is a third, much less than 18/24. Taking the same number away changes the size of the fraction.';A.sound.miss()}
 else{S.bad=true;S.msg='3/24 is far less. Divide the top AND the bottom, or the pieces stay small and you lose shaded ones.';A.sound.miss()}
 if(done&&!S.fin){S.fin=1}refresh()}
/* step 4: common denominator for 2/3 and 5/8 */
function drawCommon(){const D=S.D,ok=D===24;banner(ok?'24 is the lowest common multiple of 3 and 8: 2/3 = 16/24 and 5/8 = 15/24, so 2/3 is bigger.':'Pick a number of pieces BOTH bars can be cut into, so you can compare 2/3 and 5/8.',ok);
 const k3=D&&D%3===0,k8=D&&D%8===0;bar(k3?2*D/3:2,k3?D:3,Y(0),SH,k3?`${2*D/3}/${D}`:'2/3');bar(k8?5*D/8:5,k8?D:8,Y(1),SH2,k8?`${5*D/8}/${D}`:'5/8');
 txt('Cut both bars into:',A.W/2,Y(2)-z(14),12,SOFT);chips(DEN,Y(2),v=>v===D?(ok?'ok':'bad'):'')}
function pickD(v){S.D=v;A.sound.tick();if(v===24){right('16/24 and 15/24 have the same size pieces, so you can compare: 16 > 15. 48 would also work, but 24 is the lowest.');return refresh()}
 wrong(v%3===0?`${v} works for thirds (${v} ÷ 3 = ${v/3}) but not eighths: ${v} ÷ 8 is not a whole number.`:`${v} works for eighths (${v} ÷ 8 = ${v/8}) but not thirds: ${v} ÷ 3 is not a whole number.`)}
/* step 5: one move with the HCF */
function drawOne(){const r=ROUNDS[S.i];banner(r?`Simplify ${r[0]}/${r[1]} in ONE move: tap the highest number that goes into both.`:'HCF first: 12/16 = 3/4, 15/25 = 3/5, 14/21 = 2/3.',!r);
 if(!r){bar(3,4,Y(0),SH2);bar(3,5,Y(1),SH2);bar(2,3,Y(2),SH2);return}const g=gcd(r[0],r[1]);bar(r[0],r[1],Y(0),SH);if(S.hit)bar(r[0]/g,r[1]/g,Y(1),SH2);
 txt('Divide top and bottom by:',A.W/2,Y(2)-z(14),12,SOFT);chips(HCH,Y(2),v=>S.last===v?(v===g?'ok':'bad'):'')}
function hcfTap(v){const r=ROUNDS[S.i];if(!r)return;const [a,b]=r,g=gcd(a,b);S.last=v;A.sound.tick();
 if(v===g){S.hit=0;S.i++;S.last=null;right(`${a}/${b} ÷ ${g} = ${a/g}/${b/g} in one move.`);return refresh()}
 if(a%v===0&&b%v===0)return wrong(`${v} goes into both, but ${a/v}/${b/v} can still be simplified. Look for a higher common factor.`);
 wrong(`${v} does not go into both ${a} and ${b}. Check: ${a%v?a:b} ÷ ${v} leaves a remainder.`)}
/* pointer */
function down(p){const m=mode();let j;
 if(m==='group'){j=chipAt(p,[2,3,4,5,6],Y(2));if(j>=0){group([2,3,4,5,6][j]);return true}}
 if(m==='hcf'){j=chipAt(p,F18,HY(0));if(j>=0){tapF(F18[j]);return true}j=chipAt(p,F24,HY(1));if(j>=0){tapF(F24[j]);return true}}
 if(m==='moves'){j=[0,1,2].find(i=>inR(p,moveR(i)));if(j!=null){tryMove(j);return true}}
 if(m==='common'){j=chipAt(p,DEN,Y(2));if(j>=0){pickD(DEN[j]);return true}}
 if(m==='one'){j=chipAt(p,HCH,Y(2));if(j>=0){hcfTap(HCH[j]);return true}}return false}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();if(m==='group')drawGroup();if(m==='hcf')drawHcf();if(m==='moves')drawMoves();if(m==='common')drawCommon();if(m==='one')drawOne();
 if(m==='chal'){banner('Find the HCF, divide top and bottom by it, and check only 1 goes into both.');bar(18,24,Y(0),SH,'18/24');bar(3,4,Y(1),SH2,'3/4')}
 note();A.fx.draw(Z)}
function refresh(){const m=mode();let s='Challenge.';
 if(m==='group')s=`Top bar: 18 of 24 pieces shaded. Lower bar: ${S.n} of ${S.d} bigger pieces shaded, the same length.`;
 if(m==='hcf')s=`Factors of 18: ${F18.join(', ')}. Factors of 24: ${F24.join(', ')}. Common factors found: ${S.got.join(', ')||'none'}.`;
 if(m==='moves')s='Moves on 18/24: '+MOVES.map((mv,i)=>mv.t+(S.tested.includes(i)?` gives ${mv.n}/${mv.d}, ${mv.ok?'the same amount':'a smaller amount'}`:', not tested')).join('; ')+'.';
 if(m==='common')s=S.D?`Both bars cut into ${S.D}: thirds ${S.D%3?'cannot':'can'}, eighths ${S.D%8?'cannot':'can'}.`:'Bars: 2/3 and 5/8. Choose 6, 12, 16 or 24 pieces.';
 if(m==='one'){const r=ROUNDS[S.i];s=r?`Fraction ${r[0]}/${r[1]}. Divide by 2, 3, 4, 5 or 7.`:'All three simplified.'}
 tell((S.msg?S.msg+' ':'')+s);buttons();S.then()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='group'){[2,3,4,5,6].forEach(g=>b('Groups of '+g,()=>group(g)));b('Start again',()=>{S.n=18;S.d=24;S.tried={};S.msg='';refresh()})}
 if(m==='hcf')[...new Set(F18.concat(F24))].sort((a,b)=>a-b).forEach(v=>b(String(v),()=>tapF(v),'Factor '+v));
 if(m==='moves')MOVES.forEach((mv,i)=>b(mv.t,()=>tryMove(i)));
 if(m==='common')DEN.forEach(v=>b(v+' pieces',()=>pickD(v)));
 if(m==='one'&&ROUNDS[S.i])HCH.forEach(v=>b('÷ '+v,()=>hcfTap(v),'Divide by '+v));
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const fresh=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},n:18,d:24,tried:{},got:[],last:null,tested:[],cur:null,fin:0,D:0,i:0,hit:0,msg:'',bad:false})};
const steps=[
{h:'Bigger pieces',p:'18/24 of the bar is shaded. Put the small pieces into equal groups to make bigger pieces.',
predict:{q:'You regroup 18/24 into bigger pieces. The shaded amount is now…',opts:['the same','less','more'],ans:0},
task:'Group until the fraction is in simplest form',show:()=>{steps[0].go();play([()=>group(2),()=>group(3)],420)},go:()=>{fresh();refresh();S.then=finish(0,()=>gcd(S.n,S.d)===1,'18/24 = 3/4.')}},
{h:'The highest common factor',p:'A number that goes into both the top and the bottom is a common factor. The highest one does the job in one move.',
predict:{q:'Halving 18/24 gives 9/12. Is 9/12 in simplest form?',opts:['No: 3 still goes into 9 and 12','Yes: you have simplified it','Yes: you cannot halve it again'],ans:0},
task:'Find all 4 common factors',show:()=>{steps[1].go();play(COMMON.map(v=>()=>tapF(v)),330)},go:()=>{fresh();refresh();S.then=finish(1,()=>COMMON.every(v=>S.got.includes(v)),'HCF of 18 and 24 is 6.')}},
{h:'Moves that break it',p:'Some moves look like simplifying but change the amount. Compare each result with the 18/24 bar.',
predict:{q:'Take 15 off the top and bottom: 18/24 becomes 3/9. Is it the same amount?',opts:['No, 3/9 is less','Yes, it is the same','No, 3/9 is more'],ans:0},
task:'Test all 3 moves',show:()=>{steps[2].go();play([0,1,2].map(i=>()=>tryMove(i)),420)},go:()=>{fresh();refresh();S.then=finish(2,()=>S.tested.length===3,'Divide both, never subtract.')}},
{h:'A common denominator',p:'To compare 2/3 and 5/8, cut both bars into the same number of pieces. That number must be a multiple of 3 and of 8.',
task:'Find a common denominator',show:()=>{steps[3].go();play([()=>pickD(24)],400)},go:()=>{fresh();refresh();S.then=finish(3,()=>S.D===24,'2/3 = 16/24, 5/8 = 15/24.')}},
{h:'Simplify in one move',p:'Find the highest common factor, then divide the top and the bottom by it.',
task:'Simplify 3 fractions',show:()=>{steps[4].go();play(ROUNDS.map(r=>()=>hcfTap(gcd(r[0],r[1]))),420)},go:()=>{fresh();refresh();S.then=finish(4,()=>S.i>=ROUNDS.length,'HCF, then divide.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['Simplify 20/30 fully.','2/3',[['10/15','early'],['17/27','subtract']]],
['What is the highest common factor of 12 and 18?','6',[['3','notHighest'],['36','lcm']]],
['Is 9/15 in simplest form?','No: 3 goes into both',[['Yes: 9 and 15 are odd','odd'],['Yes: it cannot be halved','halve']]],
['Write 3/4 and 1/6 with a common denominator.','9/12 and 2/12',[['3/10 and 1/10','addBottoms'],['3/12 and 1/12','bottomOnly']]],
['Simplify 16/40 fully.','2/5',[['4/10','early'],['8/40','topOnly']]],
['Which fraction is equal to 4/6?','2/3',[['3/5','subtract'],['2/6','topOnly']]]];
function why(tag){let m='Find the highest number that goes into both, then divide the top and the bottom by it.';
 if(tag==='early')m='That is simpler, but not finished: another common factor still goes into both numbers. Divide by the HCF to finish in one move.';
 if(tag==='subtract')m='Taking the same number off the top and bottom changes the amount. Divide both by a common factor.';
 if(tag==='notHighest')m='3 goes into both, but so does 6, which is higher. The HCF of 12 and 18 is 6.';
 if(tag==='lcm')m='36 is a common multiple, not a factor. A factor goes into the number: 6 goes into 12 and 18.';
 if(tag==='odd')m='Odd numbers can still share a factor. 3 goes into 9 and 15, so 9/15 = 3/5.';
 if(tag==='halve')m='Halving is only one test. 3 goes into 9 and 15, so 9/15 = 3/5.';
 if(tag==='addBottoms')m='Adding 4 and 6 does not give a common denominator. Use a multiple of both: 12, so 9/12 and 2/12.';
 if(tag==='bottomOnly')m='When you change the bottom you must change the top by the same factor: 3/4 = 9/12 and 1/6 = 2/12.';
 if(tag==='topOnly')m='Divide the top AND the bottom by the same number, or the amount changes.';
 return m}
function ask(){qi++;const [qq,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+qq);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Simplifying fractions lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
