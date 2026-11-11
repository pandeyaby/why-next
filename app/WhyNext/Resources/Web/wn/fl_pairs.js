/* Flagship: equations with two unknowns (ages 10-11; NC Y6 algebra "find pairs of numbers that satisfy an equation
   with two unknowns" and "enumerate possibilities of combinations of two variables"). Tap grid points to test pairs
   (a, b), list every whole-number solution in order, see the pattern (a up 1, b down 1 or 2), and add a second clue
   that pins down one pair. Every tap has a button twin (steppers plus Try). */
(()=>{
VIS.reg('flagpairs',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['many','list','double','clue','sand','chal'][A.step];
const EQS={sum10:{k:[1,1],n:10,t:'a + b = 10'},sum8:{k:[1,1],n:8,t:'a + b = 8'},dbl15:{k:[2,1],n:15,t:'2a + b = 15'},
 diff2:{k:[1,-1],n:2,t:'a − b = 2'},sum12:{k:[1,1],n:12,t:'a + b = 12'},dbl20:{k:[2,1],n:20,t:'2a + b = 20'},tri18:{k:[1,3],n:18,t:'a + 3b = 18'}};
const val=(e,a,b)=>e.k[0]*a+e.k[1]*b,fits=(e,a,b)=>val(e,a,b)===e.n;
const show=(e,a,b)=>(e.k[0]===1?'':e.k[0]+'×')+a+(e.k[1]<0?' − ':' + ')+(Math.abs(e.k[1])===1?'':Math.abs(e.k[1])+'×')+b+' = '+val(e,a,b);
function all(e,pos){const o=[];for(let a=pos?1:0;a<=20;a++)for(let b=pos?1:0;b<=20;b++)if(fits(e,a,b))o.push([a,b]);return o}
function G(){const nar=A.narrow,x0=34,y0=28,w=(nar?A.W-12:A.W*.62)-x0,h=(nar?A.H*.74:A.H-40)-y0;return{x0,y0,w,h,sx:w/S.amax,sy:h/S.bmax}}
const px=(a,b)=>{const g=G();return[g.x0+a*g.sx,g.y0+g.h-b*g.sy]};
function T(t,x,y,p,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${p}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function grid(){const g=A.ctx,C=A.col,q=G();g.strokeStyle=A.alpha(C.tx,.12);g.lineWidth=1;
 for(let a=0;a<=S.amax;a++){const[x]=px(a,0);g.beginPath();g.moveTo(x,q.y0);g.lineTo(x,q.y0+q.h);g.stroke();if(a%(S.amax>12?2:1)===0)T(String(a),x,q.y0+q.h+12,11,{c:C.mu})}
 for(let b=0;b<=S.bmax;b++){const[,y]=px(0,b);g.beginPath();g.moveTo(q.x0,y);g.lineTo(q.x0+q.w,y);g.stroke();if(b%(S.bmax>12?3:2)===0)T(String(b),q.x0-14,y,11,{c:C.mu})}
 T('b ↑',q.x0-14,q.y0-16,12,{c:C.mu,w:800});T('a →',q.x0+q.w,q.y0-16,12,{c:C.mu,w:800,al:'right'})}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);g.fillRect(0,0,W,H);const k=kind();
 if(k==='chal'){T('An equation with two unknowns can have many pairs',W/2,H*.3,A.narrow?13:17);T('List them in order: a up by 1, then find b',W/2,H*.48,A.narrow?13:16);T('A second clue can pin down one pair',W/2,H*.66,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 grid();
 if(S.clue2)S.found2.forEach(([a,b])=>{const[x,y]=px(a,b);g.strokeStyle=C.or;g.lineWidth=3;g.beginPath();g.arc(x,y,9,0,7);g.stroke()});
 S.found.forEach(([a,b])=>{const[x,y]=px(a,b);g.fillStyle=C.gr;g.beginPath();g.arc(x,y,6,0,7);g.fill()});
 S.miss.forEach(([a,b])=>{const[x,y]=px(a,b);g.strokeStyle=C.rd;g.lineWidth=2.5;g.beginPath();g.moveTo(x-5,y-5);g.lineTo(x+5,y+5);g.moveTo(x+5,y-5);g.lineTo(x-5,y+5);g.stroke()});
 const[cx,cy]=px(S.a,S.b);g.strokeStyle=C.ac;g.lineWidth=2;g.setLineDash([3,3]);g.strokeRect(cx-11,cy-11,22,22);g.setLineDash([]);
 const eq=S.eq.t+(S.clue2?'  and  '+S.clue2.t:''),list=S.found.slice().sort((p,q)=>p[0]-q[0]).map(p=>'('+p[0]+', '+p[1]+')');
 if(A.narrow){T(eq+'   now: a = '+S.a+', b = '+S.b,W/2,H*.82,13,{w:800});T(list.join(' ')||'No pairs yet',W/2,H*.9,12,{c:C.mu,w:600});T('Found '+S.found.length+(S.need?' of '+S.need:''),W/2,H*.97,12,{w:800})}
 else{const x=W*.68;T(eq,x,30,17,{al:'left',w:900});T('a = '+S.a+',  b = '+S.b,x,58,15,{al:'left'});T('Found '+S.found.length+(S.need?' of '+S.need:''),x,86,14,{al:'left',w:800});
  list.forEach((s,i)=>T(s,x+(i>7?92:0),112+(i%8)*22,14,{al:'left',w:600,c:C.mu}))}
 A.fx.draw(g)}
function tryPair(a,b){S.a=a;S.b=b;const e=S.eq;
 if(S.found.some(p=>p[0]===a&&p[1]===b)){say('('+a+', '+b+') is already on your list.');A.redraw();return}
 if(S.pos&&(a<1||b<1)){A.sound.miss();say('Here a and b must both be at least 1.');A.redraw();return}
 const ok=fits(e,a,b),ok2=!S.clue2||fits(S.clue2,a,b);
 if(S.clue2&&fits(S.clue2,a,b)&&!S.found2.some(p=>p[0]===a&&p[1]===b))S.found2.push([a,b]);
 if(ok){S.found.push([a,b]);A.sound.tick();say(show(e,a,b)+'. ('+a+', '+b+') works'+(S.clue2?(ok2?' for both clues!':' for the first clue but '+show(S.clue2,a,b)+', not '+S.clue2.n+'.'):'.'))}
 else{S.miss.push([a,b]);A.sound.miss();let m=show(e,a,b)+', not '+e.n+'.';if(e.k[0]===2&&a+b===e.n)m+=' You added a + b. 2a means 2 × a.';else if(e.k[0]===2&&2*b+a===e.n)m+=' You doubled b. Only a is doubled.';say(m)}
 A.redraw();S.check()}
function step(d,which){S[which]=Math.max(0,Math.min(which==='a'?S.amax:S.bmax,S[which]+d));A.sound.tick();say('a = '+S.a+', b = '+S.b+'. Press Try to test it.');A.redraw()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{a:0,b:0,amax:10,bmax:10,eq:EQS.sum10,clue2:null,found:[],found2:[],miss:[],pos:false,need:0,check:()=>{}},o||{})}
function auto(i,pairs){steps[i].go();const r=run;pairs.forEach(([a,b],j)=>setTimeout(()=>{if(r===run)tryPair(a,b)},A.reduced()?30*(j+1):(j+1)*260))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 btn('a −',()=>step(-1,'a'),'Make a one less');btn('a +',()=>step(1,'a'),'Make a one more');btn('b −',()=>step(-1,'b'),'Make b one less');btn('b +',()=>step(1,'b'),'Make b one more');
 btn('Try (a, b)',()=>tryPair(S.a,S.b),'Try the pair a, b');
 if(k==='sand')['sum12','dbl20','tri18'].forEach(id=>btn(EQS[id].t,()=>{reset({eq:EQS[id],amax:id==='dbl20'?10:18,bmax:id==='dbl20'?20:12});say('New equation: '+EQS[id].t+'.');controls();S.check=sandCheck;A.redraw()}))}
function down(p){if(kind()==='chal')return false;const q=G(),a=Math.round((p.x-q.x0)/q.sx),b=Math.round((q.y0+q.h-p.y)/q.sy);
 if(a<0||b<0||a>S.amax||b>S.bmax)return false;tryPair(a,b);return true}
const sandCheck=finish(4,()=>S.found.length>=3,'Three pairs for one equation, and there are more.');
const steps=[
{h:'More than one answer',p:'a + b = 10. Tap a point on the grid: across is a, up is b. Find pairs that make 10.',
 predict:{q:'How many whole-number pairs make a + b = 10?',opts:['more than one','exactly one','none'],ans:0},
 task:'Find 3 pairs that fit a + b = 10',show:()=>auto(0,[[3,7],[6,4],[10,0]]),
 go:()=>{reset();say('Tap a grid point to try a pair.');controls();S.check=finish(0,()=>S.found.length>=3,'a + b = 10 has many answers: 11 whole-number pairs from (0, 10) to (10, 0).')}},
{h:'List them all',p:'a + b = 8 with a and b at least 1. Be systematic: start at a = 1, then a = 2, and so on, so none are missed.',
 predict:{q:'Are (3, 5) and (5, 3) different pairs?',opts:['yes: a and b swap','no: same pair','only if a is bigger'],ans:0},
 task:'Find all 7 pairs for a + b = 8',show:()=>auto(1,[1,2,3,4,5,6,7].map(a=>[a,8-a])),
 go:()=>{reset({eq:EQS.sum8,pos:true,need:7});say('Start with a = 1.');controls();S.check=finish(1,()=>S.found.length===7,'a goes 1 to 7 and b goes 7 down to 1. When a goes up 1, b goes down 1.')}},
{h:'When a is doubled',p:'2a + b = 15 means 2 lots of a, plus b. Try a = 1, 2, 3 … and work out b each time.',
 predict:{q:'If a = 4, what is b?',opts:['7','11','4'],ans:0},
 task:'Find all 7 pairs with a and b at least 1',show:()=>auto(2,[1,2,3,4,5,6,7].map(a=>[a,15-2*a])),
 go:()=>{reset({eq:EQS.dbl15,pos:true,need:7,bmax:15});say('Start with a = 1: 2 × 1 = 2, so b = 13.');controls();S.check=finish(2,()=>S.found.length===7,'Each time a goes up 1, b goes down 2. At a = 8, b would be −1, so the list stops at 7.')}},
{h:'Two clues, one answer',p:'a + b = 10 has many pairs. Add a second clue: a − b = 2. Only one pair fits both.',
 predict:{q:'How many pairs fit both a + b = 10 and a − b = 2?',opts:['exactly one','none','eleven'],ans:0},
 task:'Find the pair that fits both clues',show:()=>auto(3,[[5,5],[6,4]]),
 go:()=>{reset({clue2:EQS.diff2});say('Green dots fit a + b = 10. Orange rings fit a − b = 2.');controls();S.check=finish(3,()=>S.found.some(([a,b])=>a===6&&b===4),'(6, 4) is the only pair: 6 + 4 = 10 and 6 − 4 = 2.')}},
{h:'Free play',p:'Pick an equation and find pairs. Look for the pattern in your list.',
 task:'Find 3 pairs for any equation',show:()=>auto(4,[[4,8],[6,6],[9,3]]),
 go:()=>{reset({eq:EQS.sum12,amax:18,bmax:12});say('Free play: a + b = 12. Pick another equation any time.');controls();S.check=sandCheck}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['2a + b = 15 and a = 5. What is b?',[['5','ok'],['10','sub'],['7.5','half']]],
 ['How many pairs of whole numbers from 1 up make a + b = 6?',[['5','ok'],['3','swap'],['1','one']]],
 ['Which pair fits 2a + b = 12?',[['(3, 6)','ok'],['(6, 3)','rev'],['(4, 8)','add']]],
 ['a + b = 9 and a − b = 1. The pair is…',[['(5, 4)','ok'],['(4, 5)','rev'],['(6, 3)','clue']]],
 ['In a list for a + b = 10, a goes up by 1. b…',[['goes down by 1','ok'],['goes up by 1','up'],['stays the same','same']]],
 ['a + 3b = 18 and b = 4. What is a?',[['6','ok'],['14','sub'],['9','half']]],
 ['Ben finds (2, 6) for a + b = 8 and stops. What is wrong?',[['there are more pairs','ok'],['(2, 6) does not fit','none'],['a must be bigger than b','one']]]];
function why(t){let m='Put the numbers back into the equation to check.';
 if(t==='sub')m='You took a (or b) away without multiplying first. Work out 2 × a (or 3 × b), then subtract.';
 if(t==='half')m='Halving the total is not the rule here. Multiply the known number, then take it away from the total.';
 if(t==='swap')m='(2, 4) and (4, 2) are different pairs, because a and b swap. Count both.';
 if(t==='one'||t==='none')m='An equation with two unknowns usually has many pairs. List them in order to find them all.';
 if(t==='rev')m='Order matters: (a, b) means a first. Check: put a and b into the equation.';
 if(t==='add')m='4 + 8 = 12 adds a and b, but 2a means 2 × a: 2 × 4 + 8 = 16.';
 if(t==='clue')m='(6, 3) fits a + b = 9, but 6 − 3 = 3, not 1. A pair must fit both clues.';
 if(t==='up'||t==='same')m='The total stays 10, so if a gets 1 bigger, b must get 1 smaller.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Pair controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p)});controls()}});
A.start()})})();
