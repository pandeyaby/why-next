/* Flagship – arithmetic sequences as linear functions (ages 14–16): drag bars to build a(1) and d, fit a line through the
   points (n, a(n)) and read off slope d and intercept a(1) − d, assemble a(n) = dn + c, hunt for the term that equals a
   value (or prove there is none), then explore freely. Drag on the canvas or use the buttons. */
(()=>{
const BUILD=[[5,3],[20,-4],[-3,2]],LINE=[[2,3],[13,-2],[1,4]],FORM=[[4,3],[10,-3],[-2,5]],FIND=[[7,4,59],[3,5,100],[40,-3,1]];
const GOALS=[['Make every term the same',(a,d)=>d===0],['Make the line go through (0, 0)',(a,d)=>d!==0&&a===d],['Make a falling sequence with a(5) = 0',(a,d)=>d<0&&a+4*d===0]];
const SHOW=[[6,0],[3,3],[8,-2]],LO=-10,HI=30,M='−';
const sg=v=>v<0?M+(-v):''+v,term=(a,d,n)=>a+(n-1)*d,lst=(a,d,k)=>Array.from({length:k},(_,i)=>sg(term(a,d,i+1))).join(', ')+', …';
const fx=(d,c)=>d===0?`a(n) = ${sg(c)}`:`a(n) = ${d===1?'':d===-1?M:sg(d)}n${c?(c<0?' '+M+' '+(-c):' + '+c):''}`;
VIS.reg('flagarith',c=>{let A,box,cq,ix=-1,seq=0;
const blank=()=>({want:()=>{},won:0,r:0,a:0,d:0,L:0,R:0,n:1,pd:null,pc:null,hold:null,bad:-1}),S=blank();
const kind=()=>['build','line','form','find','free','quiz'][A.step];
const fast=()=>A.reduced(),f=n=>Math.round(n*(A.narrow?1:1.12));
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function lab(g,t,x,y,n,col,al){g.font=`700 ${f(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
/* chart: n from 0 to 8 across, values LO..HI up */
const P=()=>({x:A.W*.1,y:A.H*.14,w:A.W*.86,h:A.H*.62});
const X=n=>{const p=P();return p.x+n/8*p.w},Y=v=>{const p=P();return p.y+(HI-v)/(HI-LO)*p.h},V=y=>{const p=P();return Math.round(HI-(y-p.y)/p.h*(HI-LO))};
const clamp=v=>Math.max(LO,Math.min(HI,v));
function axes(g){const C=A.col,p=P();g.lineWidth=1;g.strokeStyle=A.alpha(C.mu,.35);for(let v=LO;v<=HI;v+=5){g.beginPath();g.moveTo(p.x,Y(v));g.lineTo(p.x+p.w,Y(v));g.stroke();lab(g,sg(v),p.x-6,Y(v),10,C.mu,'right')}
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(p.x,Y(0));g.lineTo(p.x+p.w,Y(0));g.moveTo(X(0),p.y);g.lineTo(X(0),p.y+p.h);g.stroke();for(let n=1;n<=8;n++)lab(g,''+n,X(n),p.y+p.h+12,11,C.mu);lab(g,'n',p.x+p.w,p.y+p.h+26,11,C.mu)}
function bars(g,a,d,hot){const C=A.col,w=A.W*.06;for(let n=1;n<=8;n++){const v=term(a,d,n),top=Y(Math.max(v,0)),bot=Y(Math.min(v,0));g.fillStyle=n<3?(n===1?C.cy:C.vi):A.alpha(C.cy,.55);g.fillRect(X(n)-w/2,top,w,Math.max(2,bot-top));
  if(n<3){g.strokeStyle=hot===n?C.rd:C.tx;g.lineWidth=2;g.strokeRect(X(n)-w/2,top,w,Math.max(2,bot-top))}if(v>=LO&&v<=HI)lab(g,sg(v),X(n),v>=0?top-9:bot+9,10)}}
function dots(g,a,d,col,k){for(let n=1;n<=(k||8);n++){const v=term(a,d,n);if(v<LO||v>HI)continue;g.fillStyle=col||A.col.vi;g.beginPath();g.arc(X(n),Y(v),6,0,7);g.fill()}}
function line(g,y0,y8,col,dash){const C=A.col;g.strokeStyle=col||C.am;g.lineWidth=3;if(dash)g.setLineDash([7,6]);g.beginPath();g.moveTo(X(0),Y(y0));g.lineTo(X(8),Y(y8));g.stroke();g.setLineDash([])}
function knob(g,x,y,hot){const C=A.col;g.fillStyle=C.am;g.beginPath();g.arc(x,y,11,0,7);g.fill();g.strokeStyle=hot?C.rd:C.tx;g.lineWidth=hot?4:2;g.stroke()}
/* choice boxes for the formula step: two rows of three */
const rows=()=>[0,1].map(r=>[0,1,2].map(k=>{const w=Math.min(A.W*.28,170),gap=(A.W-3*w)/4;return{x:gap+k*(w+gap),y:A.H*(r?.68:.38),w,h:A.H*.17}}));
const rot=(x,k)=>x.slice(k).concat(x.slice(0,k)),opts=()=>{const r=Math.min(S.r,2),[a,d]=FORM[r];return[rot([d,-d,a],r),rot([a-d,a,a+d],(r+1)%3)]};
function draw(A){const{ctx:g,W,H,col:C}=A,v=kind();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.03:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){lab(g,'a(n) = a(1) + (n − 1)d',W/2,H*.4,18);lab(g,'slope d, intercept a(1) − d',W/2,H*.58,14,C.mu);return}
 if(S.won>=goal()){lab(g,end(),W/2,H/2,14);return A.fx.draw(g)}
 if(v==='build'){const[ta,td]=BUILD[Math.min(S.r,2)];axes(g);bars(g,S.a,S.d,S.bad);lab(g,`Target: ${lst(ta,td,4)}`,W/2,H*.05,13);
  lab(g,`a(1) = ${sg(S.a)}, d = ${sg(S.d)}, so a(10) = ${sg(S.a)} + 9×${S.d<0?'('+sg(S.d)+')':S.d} = ${sg(term(S.a,S.d,10))}`,W/2,H*.93,12,C.mu)}
 if(v==='line'||v==='free'){axes(g);const[a,d]=v==='line'?LINE[Math.min(S.r,2)]:[S.a,S.d];
  if(v==='line'){dots(g,a,d,C.vi,6);line(g,S.L,S.R);knob(g,X(0),Y(S.L),S.bad===0);knob(g,X(8),Y(S.R),S.bad===1);lab(g,`Points of ${lst(a,d,4)}`,W/2,H*.05,13);lab(g,`Your line: slope ${sg((S.R-S.L)/8)}, crosses at ${sg(S.L)}`,W/2,H*.93,12,C.mu)}
  else{line(g,a-d,a+7*d,C.am,1);dots(g,a,d);lab(g,`${GOALS[Math.min(S.r,2)][0]}`,W/2,H*.05,13);lab(g,`${lst(a,d,4)}   ${fx(d,a-d)}`,W/2,H*.93,12,C.mu)}}
 if(v==='form'){const[a,d]=FORM[Math.min(S.r,2)],o=opts();lab(g,lst(a,d,5),W/2,H*.08,16);lab(g,`a(n) = ${S.pd==null?'□':sg(o[0][S.pd])}n + ${S.pc==null?'□':sg(o[1][S.pc])}`,W/2,H*.22,18,C.vi);
  rows().forEach((row,r)=>row.forEach((rc,k)=>{const on=(r?S.pc:S.pd)===k,hot=S.bad===r*3+k;g.fillStyle=on?A.alpha(C.vi,.18):C.dark?'#1e293b':'#ffffff';A.paint.rrect(rc.x,rc.y,rc.w,rc.h,12);g.fill();g.strokeStyle=hot?C.rd:on?C.vi:C.mu;g.lineWidth=hot||on?4:2;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,12);g.stroke();
   lab(g,(r?'+ ':'')+sg(o[r][k])+(r?'':'n'),rc.x+rc.w/2,rc.y+rc.h/2,16)}));lab(g,'slope (the n part)',W/2,H*.34,11,C.mu);lab(g,'constant',W/2,H*.64,11,C.mu)}
 if(v==='find'){const[a,d,t]=FIND[Math.min(S.r,2)],tr=track(),val=term(a,d,S.n);lab(g,`${lst(a,d,4)}   Is ${t} a term?`,W/2,H*.08,14);
  lab(g,`a(${S.n}) = ${a} + ${S.n-1}×${d<0?'('+sg(d)+')':d} = ${sg(val)}`,W/2,H*.3,18,val===t?C.gr:C.tx);lab(g,val===t?'= target!':val<t?'too small':'too big',W/2,H*.42,13,C.mu);
  g.strokeStyle=C.mu;g.lineWidth=3;g.beginPath();g.moveTo(tr.x,tr.y);g.lineTo(tr.x+tr.w,tr.y);g.stroke();for(let n=1;n<=25;n+=4)lab(g,''+n,tr.x+(n-1)/24*tr.w,tr.y+22,10,C.mu);knob(g,tr.x+(S.n-1)/24*tr.w,tr.y,S.bad===0);lab(g,'drag to choose n',W/2,tr.y+44,11,C.mu)}
 A.fx.draw(g)}
const track=()=>({x:A.W*.08,y:A.H*.66,w:A.W*.84});
const goal=()=>({build:3,line:3,form:3,find:3,free:3}[kind()]||9);
const end=()=>({build:'a(1) sets the start; d is added each step.',line:'Slope = d. Intercept = a(1) − d, the zeroth term.',form:'a(n) = dn + (a(1) − d).',find:'A value is a term only if n is a whole number.',free:'d = 0: flat. a(1) = d: proportional.'}[kind()]);
const nope=(t,b)=>{A.sound.miss();S.bad=b==null?-1:b;speak(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:1100);A.redraw()};
function reset(){const v=kind();S.pd=S.pc=null;S.hold=null;S.n=1;
 if(v==='build'){S.a=0;S.d=1}if(v==='line'){S.L=0;S.R=8}if(v==='free'&&!S.won){S.a=5;S.d=3}}
function score(t){S.won++;S.r++;A.sound.pop();if(S.won<goal()){reset();speak(t+' Next one.')}else speak(t);keys();A.redraw();S.want()}
/* build */
function setAD(a,d){if(S.won>=goal())return;S.a=clamp(a);S.d=Math.max(-6,Math.min(6,d));A.sound.tick();const v=kind();
 if(v==='build'){const[ta,td]=BUILD[Math.min(S.r,2)];if(S.a===ta&&S.d===td)return score(`Yes! a(1) = ${sg(ta)} and d = ${sg(td)}: ${lst(ta,td,4)}`);speak(`a(1) = ${sg(S.a)}, d = ${sg(S.d)}: ${lst(S.a,S.d,4)}`)}
 if(v==='free'){const[name,ok]=GOALS[Math.min(S.r,2)];if(ok(S.a,S.d))return score(`Done: ${name}. ${fx(S.d,S.a-S.d)}.`);speak(`${lst(S.a,S.d,4)} ${fx(S.d,S.a-S.d)}`)}A.redraw()}
/* line */
function setLR(L,R){if(kind()!=='line'||S.won>=3)return;S.L=clamp(L);S.R=clamp(R);A.sound.tick();const[a,d]=LINE[Math.min(S.r,2)];
 if(S.L===a-d&&S.R===a+7*d)return score(`Yes! Slope ${sg(d)} = d, and it crosses at ${sg(a-d)} = a(1) − d.`);speak(`Line from ${sg(S.L)} at n = 0 to ${sg(S.R)} at n = 8.`);A.redraw()}
function judgeLine(){if(kind()!=='line'||S.won>=3)return;const[a,d]=LINE[Math.min(S.r,2)],sl=(S.R-S.L)/8;
 if(S.L===a&&sl===d)return nope(`The slope is right, but the line crosses at a(1) = ${sg(a)}. At n = 0 we are one step before the first term: ${sg(a)} ${M} ${sg(d)} = ${sg(a-d)}.`,0);
 if(sl!==d)return nope(`Your line rises ${sg(sl)} per step, but the terms change by ${sg(d)} each step. Make the slope equal d.`,1);nope(`The slope is right. Now slide the line so it goes through the dots: it must cross at ${sg(a-d)}.`,0)}
/* formula */
function pickF(r,k){if(kind()!=='form'||S.won>=3)return;if(r)S.pc=k;else S.pd=k;A.sound.tick();if(S.pd==null||S.pc==null){speak('Now pick the '+(r?'slope':'constant')+'.');return A.redraw()}
 const[a,d]=FORM[Math.min(S.r,2)],o=opts(),dd=o[0][S.pd],cc=o[1][S.pc],hot=dd!==d?S.pd:3+S.pc;if(dd===d&&cc===a-d)return score(`Yes! ${fx(d,a-d)}. Check: n = 1 gives ${sg(a)}.`);
 let t;if(dd===-d)t=`The terms ${d<0?'go down':'go up'}, so d is ${sg(d)}, not ${sg(-d)}. Subtract a term from the next one.`;else if(dd===a)t=`${sg(a)} is the first term, not the step. The step between terms is ${sg(d)}.`;
 else if(cc===a)t=`Check n = 1: ${sg(d)} + ${sg(a)} = ${sg(d+a)}, one step too far. The constant is a(1) ${M} d = ${sg(a-d)}.`;else t=`Check n = 1: it should give ${sg(a)}. The constant is a(1) ${M} d = ${sg(a-d)}.`;
 S.pd=S.pc=null;nope(t,hot)}
/* find */
function setN(n){if(kind()!=='find'||S.won>=3)return;S.n=Math.max(1,Math.min(25,n));A.sound.tick();const[a,d]=FIND[Math.min(S.r,2)];speak(`a(${S.n}) = ${sg(term(a,d,S.n))}`);A.redraw()}
function claim(isTerm){if(kind()!=='find'||S.won>=3)return;const[a,d,t]=FIND[Math.min(S.r,2)],q=(t-a)/d+1,whole=q===Math.round(q)&&q>=1;
 if(isTerm){if(term(a,d,S.n)===t)return score(`Yes! a(${S.n}) = ${t}. Solve ${a} + (n ${M} 1)×${sg(d)} = ${t}: n = ${S.n}.`);
  if(!whole)return nope(`a(${S.n}) = ${sg(term(a,d,S.n))}. The terms jump over ${t}: n would be ${q.toFixed(1)}, not a whole number.`,0);return nope(`a(${S.n}) = ${sg(term(a,d,S.n))}, not ${t}. Move n.`,0)}
 if(whole)return nope(`${t} is a term: (${t} ${M} ${a}) ÷ ${sg(d)} + 1 = ${q}, a whole number. Find it.`,0);score(`Right! (${t} ${M} ${a}) ÷ ${d} + 1 = ${q.toFixed(1)}, so ${t} is not a term.`)}
function keys(){if(!box)return;box.innerHTML='';const v=kind(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},box,t);b.onclick=fn};if(v==='quiz'||S.won>=goal())return;
 if(v==='build'||v==='free'){B(`a(1) ${M}`,()=>setAD(S.a-1,S.d),'Lower the first term');B('a(1) +',()=>setAD(S.a+1,S.d),'Raise the first term');B(`d ${M}`,()=>setAD(S.a,S.d-1),'Lower the common difference');B('d +',()=>setAD(S.a,S.d+1),'Raise the common difference')}
 if(v==='line'){B('Left ▼',()=>setLR(S.L-1,S.R),'Lower the line at n = 0');B('Left ▲',()=>setLR(S.L+1,S.R),'Raise the line at n = 0');B('Right ▼',()=>setLR(S.L,S.R-1),'Lower the line at n = 8');B('Right ▲',()=>setLR(S.L,S.R+1),'Raise the line at n = 8');B('Check',judgeLine,'Check my line')}
 if(v==='form')opts().forEach((row,r)=>row.forEach((o,k)=>B((r?'+ ':'')+sg(o)+(r?'':'n'),()=>pickF(r,k),(r?'Constant ':'Slope ')+sg(o))));
 if(v==='find'){B(`n ${M} 1`,()=>setN(S.n-1));B('n + 1',()=>setN(S.n+1));B('n + 5',()=>setN(S.n+5));B('It is this term',()=>claim(1));B('Not a term',()=>claim(0))}}
/* pointer */
function down(p){const v=kind();if(S.won>=goal())return false;
 if(v==='build'||v==='free'){const k=[1,2].find(n=>Math.abs(p.x-X(n))<A.W*.05);if(k){S.hold=k;move(p);return true}return false}
 if(v==='line'){const k=Math.abs(p.x-X(0))<30?0:Math.abs(p.x-X(8))<30?1:-1;if(k>=0){S.hold=k;move(p);return true}return false}
 if(v==='form'){rows().forEach((row,r)=>row.forEach((rc,k)=>{if(p.x>rc.x&&p.x<rc.x+rc.w&&p.y>rc.y&&p.y<rc.y+rc.h)pickF(r,k)}));return false}
 if(v==='find'){S.hold=1;move(p);return true}return false}
function move(p){if(S.hold==null)return;const v=kind(),val=clamp(V(p.y));
 if(v==='build'||v==='free'){if(S.hold===1){if(val!==S.a)setAD(val,S.d)}else if(val-S.a!==S.d)setAD(S.a,val-S.a)}
 if(v==='line'){if(S.hold===0&&val!==S.L)setLR(val,S.R);if(S.hold===1&&val!==S.R)setLR(S.L,val)}
 if(v==='find'){const tr=track(),n=Math.round((p.x-tr.x)/tr.w*24)+1;if(n!==S.n)setN(n)}}
function up(){S.hold=null}
const gate=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++seq;list.forEach((fn,j)=>setTimeout(()=>{if(k===seq)fn()},fast()?j*40+30:(j+1)*(gap||400)))}
const fresh=()=>{seq++;Object.assign(S,blank());if(A)reset()};
const steps=[
{h:'Build the sequence',p:'An arithmetic sequence starts at a(1) and adds the common difference d each step. Drag bar 1 to set a(1) and bar 2 to set the step. Or use the buttons.',predict:{q:'For 5, 8, 11, … what is a(10)?',opts:['5 + 10×3 = 35','5 + 9×3 = 32'],ans:1},task:'Build 3 target sequences',
 show:()=>{steps[0].go();demo(BUILD.map(([a,d])=>()=>setAD(a,d)),600)},go:()=>{fresh();speak('Build 5, 8, 11, 14.');keys();S.want=gate(0,()=>S.won>=3,'a(n) = a(1) + (n − 1)d: only n − 1 steps are added.')}},
{h:'Points on a line',p:'Plot each term as a point (n, a(n)). Drag the two orange ends so the line goes through every dot.',predict:{q:'Where does the line through 2, 5, 8, … cross the vertical axis?',opts:['At 2, the first term','At −1, one step before'],ans:1},task:'Fit 3 lines',
 show:()=>{steps[1].go();demo(LINE.map(([a,d])=>()=>setLR(a-d,a+7*d)),700)},go:()=>{fresh();speak('Fit a line through the dots.');keys();S.want=gate(1,()=>S.won>=3,'Slope = d; intercept = a(1) − d.')}},
{h:'Write the formula',p:'Write the sequence as a linear function a(n) = dn + c. Pick the slope, then the constant. Check with n = 1.',task:'Write 3 formulas',
 show:()=>{steps[2].go();demo(FORM.flatMap(()=>[()=>{const[a,d]=FORM[Math.min(S.r,2)];pickF(0,opts()[0].indexOf(d))},()=>{const[a,d]=FORM[Math.min(S.r,2)];pickF(1,opts()[1].indexOf(a-d))}]),450)},go:()=>{fresh();speak('Write 4, 7, 10, 13 as dn + c.');keys();S.want=gate(2,()=>S.won>=3,'The constant is the zeroth term, a(1) − d.')}},
{h:'Which term?',p:'Drag n along the track until a(n) hits the target. If the terms jump over it, it is not a term.',task:'Answer 3 questions',
 show:()=>{steps[3].go();demo([()=>setN(14),()=>claim(1),()=>claim(0),()=>setN(14),()=>claim(1)],600)},go:()=>{fresh();speak('Is 59 a term of 7, 11, 15?');keys();S.want=gate(3,()=>S.won>=3,'Solve a(1) + (n − 1)d = target; n must be a whole number.')}},
{h:'Explore',p:'Change a(1) and d freely. Watch the dots, the line and the formula. Meet each goal.',task:'Meet 3 goals',
 show:()=>{steps[4].go();demo(SHOW.map(([a,d])=>()=>setAD(a,d)),700)},go:()=>{fresh();speak('Make every term the same.');keys();S.want=gate(4,()=>S.won>=3,'d is the slope; a(1) − d is the intercept.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['6, 11, 16, … What is a(20)?',[['101','ok'],['106','off'],['120','mult']]],
 ['Which explicit formula gives 9, 7, 5, 3, …?',[['a(n) = 11 − 2n','ok'],['a(n) = 9 − 2n','first'],['a(n) = 2n + 7','sign']]],
 ['The points (n, a(n)) of 4, 7, 10, … lie on a line. Slope and intercept?',[['Slope 3, intercept 1','ok'],['Slope 3, intercept 4','first'],['Slope 4, intercept 3','swap']]],
 ['Is 150 a term of 5, 12, 19, …?',[['No: n − 1 = 145 ÷ 7 is not whole','ok'],['Yes, 150 lies between two terms','between'],['Yes, it is about term 21','round']]],
 ['Why plot 3, 5, 7, … as dots, not a solid line?',[['n counts terms, so n is a whole number','ok'],['The line would be too steep','steep'],['A line would change the slope','slope']]]];
function why(t){let m='Use a(n) = a(1) + (n − 1)d and check it with n = 1.';
 if(t==='off')m='That adds 20 steps. From a(1) to a(20) there are only 19: 6 + 19×5 = 101.';if(t==='mult')m='That treats it as 6n. The sequence starts at 6 and adds 5 each time.';
 if(t==='first')m='The constant is not the first term. Check n = 1: it must give the first term, so c = a(1) − d.';if(t==='sign')m='The terms go down by 2, so d = −2, not +2.';
 if(t==='swap')m='Slope is the step between terms, 3. The intercept is 4 − 3 = 1.';if(t==='between')m='Being between two terms means it is not one of them.';
 if(t==='round')m='n must be exactly whole. 145 ÷ 7 = 20.7…, so rounding hides that 150 is skipped.';if(t==='steep')m='Steepness is just d. The dots stand alone because n is 1, 2, 3, …';
 if(t==='slope')m='The slope is the same either way. Dots are used because there is no term 2.5.';return m}
function quiz(){ix++;const[q,ops]=QS[ix%QS.length],r=ix%3;
 cq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>verdict(t)});speak('Challenge: '+q);A.redraw()}
let hits=0;
function verdict(t){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){hits++;A.win()}else{hits=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${hits}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{cq.hidden=A.step!==5;box.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);box=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);cq=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
