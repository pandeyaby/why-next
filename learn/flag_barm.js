/* Flagship: two-step word problems within 100 (ages 7-8; CCSS 2.OA.1 "use addition and subtraction within 100 to solve
   one- and two-step word problems ... with unknowns in all positions"; NC Y2 "solve problems with addition and
   subtraction"). Bar models: drag a split to show what is left, drag a marker to find the difference between two bars,
   pick the equation with a box for an unknown start, chain two steps on a bus, then check answers by estimating.
   Not flagstory (one-step stories within 10), flagcountup (missing addend) or flaginvadd (inverse facts). */
(()=>{
VIS.reg('flagbarm',c=>{let A,G,keys,chal,qi=-1,ver=0;const W={};
const PEN='#111827',CARDBG='#f0fdf4',GOOD='#047857',ASK='#1e40af',SLIP='#be123c',PART1='#fdba74',PART2='#c4b5fd',GAP='#fde047';
const STOPS=[['−18','off',-18],['+25','on',25],['+18','trap',18]];
const CHECKS=[['92 cards, lost 37. Kit says 55 left.',1],['64 apples, 29 more came. Kit says 35.',0],['Two bags: 48 and 39 sweets. Kit says 87.',1],['81 pages, read 46. Kit says 127 left.',0]];
const EQS=[['? + 17 = 52',1],['52 + 17 = ?',0],['? − 17 = 52',0]];
const ANS3=[[35,1],[69,0],[45,0]];
const stage=()=>['part','comp','start','two','check','chal'][A.step];
const pin=(v,lo,hi)=>Math.max(lo,Math.min(hi,v)),inBox=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function chip(t,x,y,o){o=o||{};const g=A.ctx;let px=o.f||(A.narrow?15:18);g.font=`700 ${px}px system-ui`;while(px>11&&g.measureText(t).width>(o.w||A.W)-22){px--;g.font=`700 ${px}px system-ui`}
 const w=Math.max(o.w||0,g.measureText(t).width+22),h=o.h||px*2,L=pin(x-w/2,4,A.W-w-4);g.fillStyle=o.bg||CARDBG;A.paint.rrect(L,y-h/2,w,h,10);g.fill();g.lineWidth=o.edge?3:1.5;g.strokeStyle=o.edge||'#6b7280';g.stroke();
 g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';g.fillText(t,L+w/2,y+1);return{x:L,y:y-h/2,w,h}}
function strip(x,y,w,h,fill,text){const g=A.ctx;if(w<=0)return;g.fillStyle=fill;g.fillRect(x,y,w,h);g.strokeStyle=PEN;g.lineWidth=2;g.strokeRect(x,y,w,h);
 if(text){g.fillStyle=PEN;g.font=`700 ${A.narrow?13:16}px system-ui`;g.textAlign='left';g.textBaseline='middle';if(g.measureText(text).width<w-10)g.fillText(text,x+8,y+h/2)}}
const span=()=>({x:A.W*.06,w:A.W*.88});
const xOf=(v,tot)=>span().x+span().w*v/tot,vOf=(x,tot)=>Math.round(pin((x-span().x)/span().w,0,1)*tot);
function story(t){const g=A.ctx,px=A.narrow?13:16,mw=A.W-36;g.font=`700 ${px}px system-ui`;const lines=[''];t.split(' ').forEach(w=>{const k=lines.length-1,try1=(lines[k]+' '+w).trim();if(g.measureText(try1).width>mw)lines.push(w);else lines[k]=try1});
 const lh=px*1.3,h=lines.length*lh+10,x=8,w=A.W-16;g.fillStyle=CARDBG;A.paint.rrect(x,4,w,h,10);g.fill();g.lineWidth=2;g.strokeStyle=ASK;g.stroke();g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';lines.forEach((l,i)=>g.fillText(l,A.W/2,9+lh*(i+.5)))}
/* ---- 1: part-whole, unknown change ---- */
function drawPart(){const S=span(),y1=A.H*.3,y2=A.H*.5,h=A.H*.13,cut=xOf(W.cut,78);story('Sam had 78 stickers, gave some away, and has 45 left.');
 strip(S.x,y1,S.w,h,'#e5e7eb','78 at the start');strip(S.x,y2,cut-S.x,h,PART1,W.cut+' left');strip(cut,y2,S.x+S.w-cut,h,W.cut===45?GAP:PART2,W.cut===45?'? given away':String(78-W.cut));
 const g=A.ctx;g.fillStyle=ASK;g.beginPath();g.moveTo(cut-11,y2+h+18);g.lineTo(cut+11,y2+h+18);g.lineTo(cut,y2+h+2);g.fill();
 chip(W.cut===45?(W.sum?'78 − 45 = 33 given away':'Now pick the sum that finds ?'):'Drag the split so the left part is 45',A.W/2,A.H*.84,{f:A.narrow?13:16,edge:W.sum?GOOD:ASK})}
function setCut(v,quiet){W.cut=pin(v,1,77);if(quiet)return A.redraw();say(W.cut===45?'The left part is 45, the stickers left. The other part is the ones given away: the unknown.':`The left part shows ${W.cut}. Sam has 45 left, so move the split ${W.cut<45?'right':'left'}.`)}
function pickSum(k){if(W.cut!==45)return say('First drag the split to 45.');if(k==='minus'){W.sum=true;A.sound.pop();return say('Yes. Whole take away the part you know: 78 − 45 = 33. Sam gave away 33.')}
 A.sound.miss();say(k==='plus'?'78 + 45 would be more than Sam started with. He gave some away, so the answer must be less than 78.':'45 − 78 takes the bigger number from the smaller one. Start from the whole: 78 − 45.')}
/* ---- 2: compare, how many more ---- */
function drawComp(){const S=span(),h=A.H*.13,ya=A.H*.3,yb=A.H*.5;story('Ava has 63 shells. Ben has 38. How many more has Ava?');
 strip(S.x,ya,S.w*.9,h,PART1,'Ava 63');strip(S.x,yb,S.w*.9*38/63,h,PART2,'Ben 38');
 const g=A.ctx,mx=S.x+S.w*.9*W.mark/63;g.strokeStyle=ASK;g.lineWidth=4;g.setLineDash([6,4]);g.beginPath();g.moveTo(mx,ya-12);g.lineTo(mx,yb+h+12);g.stroke();g.setLineDash([]);
 if(W.mark===38){strip(mx,ya,S.x+S.w*.9-mx,h,GAP,'? = 25');}
 chip(W.mark===38?'The gap is the difference: 63 − 38 = 25':`Marker at ${W.mark}. Line it up with the end of Ben's bar.`,A.W/2,A.H*.84,{f:A.narrow?13:16,edge:W.mark===38?GOOD:ASK})}
function setMark(v,quiet){const was=W.mark===38;W.mark=pin(v,0,63);if(quiet)return A.redraw();
 if(W.mark===38&&!was){W.compOK=true;A.sound.pop();return say('The marker lines up with the end of Ben\'s bar. The extra bit of Ava\'s bar is the difference: 63 − 38 = 25 more.')}
 say(`The marker is at ${W.mark}. Ben has 38.`)}
/* ---- 3: unknown start ---- */
function drawStart(){story('Some birds were on a tree. 17 more landed. Now there are 52.');const S=span(),y=A.H*.32,h=A.H*.13;
 strip(S.x,y,S.w,h,'#e5e7eb','52 now');strip(S.x,y+h+8,S.w*35/52,h,W.eq?GAP:PART2,W.eq?'? at the start':'?');strip(S.x+S.w*35/52,y+h+8,S.w*17/52,h,PART1,'17 landed');
 const cards=eqCards();EQS.forEach((e,i)=>chip(W.got===i||(!W.eq&&i===W.eqMiss)?e[0]+(e[1]?' ✓':' ✗'):e[0],cards[i].x+cards[i].w/2,cards[i].y+cards[i].h/2,{w:cards[i].w,h:cards[i].h,f:A.narrow?13:16,edge:W.eq&&e[1]?GOOD:i===W.eqMiss?SLIP:null}));
 if(W.eq)chip(W.start?'52 − 17 = 35 birds at the start':'What number is the ?',A.W/2,A.H*.93,{f:A.narrow?13:15,edge:W.start?GOOD:ASK})}
const eqCards=()=>{const n=A.narrow,w=n?A.W*.3:A.W*.26,gap=(A.W-3*w)/4;return EQS.map((_,i)=>({x:gap+i*(w+gap),y:A.H*.66,w,h:A.H*.13}))};
function pickEq(i){if(W.eq)return say('The equation is chosen. Now find the number for ?');if(EQS[i][1]){W.eq=true;W.got=i;W.eqMiss=null;A.sound.pop();return say('Yes: an unknown number plus 17 makes 52. The ? is the start.')}
 W.eqMiss=i;A.sound.miss();say(i===1?'52 is already the total after they landed. Adding 17 again counts those birds twice.':'The birds landed, so the group got bigger. That is plus 17, not minus.')}
function pickStart(v){if(!W.eq)return say('Choose the equation first.');const a=ANS3.find(x=>x[0]===v);if(a[1]){W.start=true;A.sound.pop();return say('Yes: 52 − 17 = 35. Check: 35 + 17 = 52.')}
 A.sound.miss();say(v===69?'69 is 52 + 17. "More landed" does not mean add here: 52 already includes them, so take 17 away.':'Check: 45 + 17 = 62, not 52. Take away 17 carefully: 52 − 17 = 35.')}
/* ---- 4: two steps on a bus ---- */
function drawTwo(){story('46 on the bus. 18 get off. Then 25 get on. How many now?');const g=A.ctx,vals=[46].concat(W.path),S=span(),y=A.H*.42;
 const bw=(S.w-20)/3;vals.forEach((v,i)=>{chip(String(v),S.x+bw/2+i*(bw+10),y,{w:bw*.8,h:A.H*.16,f:A.narrow?20:26,edge:i===2?GOOD:ASK,bg:i?'#fef9c3':CARDBG});
  if(i){g.fillStyle=A.col.tx;g.font=`700 ${A.narrow?13:15}px system-ui`;g.textAlign='center';g.fillText(W.ops[i-1],S.x+i*(bw+10)-5,y-A.H*.12)}});
 for(let i=vals.length;i<3;i++){g.strokeStyle=A.alpha(A.col.tx,.45);g.setLineDash([6,5]);g.lineWidth=2;g.strokeRect(S.x+i*(bw+10)+bw*.1,y-A.H*.08,bw*.8,A.H*.16);g.setLineDash([])}
 const bx=tiles();STOPS.forEach((s,i)=>chip(s[0],bx[i].x+bx[i].w/2,bx[i].y+bx[i].h/2,{w:bx[i].w,h:bx[i].h,f:A.narrow?18:22,edge:W.used.includes(i)?GOOD:W.tMiss===i?SLIP:null,bg:W.used.includes(i)?'#dcfce7':'#fff7ed'}));
 chip(W.path.length>1?'Two steps: 46 − 18 = 28, then 28 + 25 = 53':'Drag or tap the steps in story order',A.W/2,A.H*.92,{f:A.narrow?12:15,edge:W.path.length>1?GOOD:ASK})}
const tiles=()=>{const w=A.narrow?A.W*.26:A.W*.18,gap=(A.W-3*w)/4;return STOPS.map((_,i)=>({x:gap+i*(w+gap),y:A.H*.64,w,h:A.H*.14}))};
function useStop(i){if(W.path.length>1)return say('Both steps are done: 53 people.');const s=STOPS[i],now=W.path.length?W.path[W.path.length-1]:46;
 if(s[1]==='trap'){W.tMiss=i;A.sound.miss();return say('18 people got off, so there are fewer. That is take away 18, not add.')}
 const want=W.path.length?'on':'off';if(s[1]!==want){W.tMiss=i;A.sound.miss();return say('Follow the story: first 18 get off, then 25 get on.')}
 W.tMiss=null;W.used.push(i);W.ops.push(s[0]);W.path.push(now+s[2]);A.sound.pop();say(W.path.length>1?`${now} + 25 = ${now+25}. Two steps: there are 53 on the bus now.`:`46 − 18 = 28. That is step one. Now step two.`)}
/* ---- 5: does it make sense? ---- */
function drawCheck(){const C=CHECKS[W.ci];story(C?`Card ${W.ci+1} of 4: is Kit's answer sensible?`:'All 4 checked');if(C)chip(C[0],A.W/2,A.H*.45,{w:A.W*.92,h:A.H*.2,f:A.narrow?14:18,edge:W.cMiss?SLIP:'#7c3aed',bg:'#f5f3ff'});
 chip(`Checked ${W.ci} of 4`,A.W/2,A.H*.8,{f:14,edge:W.ci>3?GOOD:ASK})}
function judgeCheck(sense){const C=CHECKS[W.ci];if(!C)return say('All 4 are checked.');const ok=(sense?1:0)===C[1];
 if(ok){W.ci++;W.cMiss=false;A.sound.pop();return say(sense?'Yes, that makes sense.':W.ci===2?'Right: 29 more came, so there must be more than 64. 35 is far too small.':'Right: you cannot have more pages left than the book has. 81 − 46 is about 80 − 50 = 30.')}
 W.cMiss=true;A.sound.miss();say(sense?(W.ci===1?'Estimate: 64 + 29 is about 60 + 30 = 90. 35 can not be right.':'Estimate: about 80 − 50 = 30. Kit added instead of taking away.'):'Estimate it: '+(W.ci===0?'90 − 40 is about 50, so 55 is sensible.':'50 + 40 is about 90, so 87 is sensible.'))}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ecfccb',A.col.dark?.04:.3);g.fillRect(0,0,A.W,A.H);const k=stage();
 if(k==='chal'){chip('Challenge',A.W/2,A.H*.15,{edge:ASK});const Q=QS[qi%QS.length];if(Q)chip(Q.pic,A.W/2,A.H*.5,{f:A.narrow?17:21});return}
 ({part:drawPart,comp:drawComp,start:drawStart,two:drawTwo,check:drawCheck})[k]()}
function clear(){ver++;for(const k in W)delete W[k];Object.assign(W,{cut:20,sum:false,mark:10,compOK:false,eq:false,got:-1,eqMiss:null,start:false,path:[],ops:[],used:[],tMiss:null,ci:0,cMiss:false,drag:null,after:()=>{}})}
function say(t){tell(t);A.redraw();redoKeys();W.after()}
const when=(i,test,msg)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function setup(i,intro,test,msg){clear();tell(intro);redoKeys();W.after=when(i,test,msg)}
function replay(i,acts,ms){steps[i].go();const v=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v===ver)f()},A.reduced()?30*(j+1):(ms||450)*(j+1)))}
function redoKeys(){if(!keys)return;keys.innerHTML='';const k=stage(),K=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='part'){K('◀ 10',()=>setCut(W.cut-10),'Move the split 10 left');K('◀ 1',()=>setCut(W.cut-1),'Move the split 1 left');K('1 ▶',()=>setCut(W.cut+1),'Move the split 1 right');K('10 ▶',()=>setCut(W.cut+10),'Move the split 10 right');
  if(W.cut===45){K('78 − 45',()=>pickSum('minus'));K('78 + 45',()=>pickSum('plus'));K('45 − 78',()=>pickSum('back'))}}
 if(k==='comp'){K('◀ 10',()=>setMark(W.mark-10),'Move the marker 10 left');K('◀ 1',()=>setMark(W.mark-1),'Move the marker 1 left');K('1 ▶',()=>setMark(W.mark+1),'Move the marker 1 right');K('10 ▶',()=>setMark(W.mark+10),'Move the marker 10 right')}
 if(k==='start'){if(!W.eq)EQS.forEach((e,i)=>K(e[0],()=>pickEq(i),'Equation '+e[0].replace('?','unknown')));else ANS3.forEach(a=>K(String(a[0]),()=>pickStart(a[0]),'There were '+a[0]+' birds at the start'))}
 if(k==='two')STOPS.forEach((s,i)=>K(s[0],()=>useStop(i),(s[2]<0?'Take away ':'Add ')+Math.abs(s[2])));
 if(k==='check'){K('Makes sense',()=>judgeCheck(true),"Kit's answer makes sense");K('Cannot be right',()=>judgeCheck(false),"Kit's answer cannot be right")}}
function down(p){const k=stage();
 if(k==='part'){W.drag='cut';setCut(vOf(p.x,78),true);return true}
 if(k==='comp'){W.drag='mark';setMark(Math.round(pin((p.x-span().x)/(span().w*.9),0,1)*63),true);return true}
 if(k==='start'){const i=eqCards().findIndex(b=>inBox(p,b));if(i>=0)pickEq(i)}
 if(k==='two'){const i=tiles().findIndex(b=>inBox(p,b));if(i>=0){W.drag={i,x:p.x,y:p.y};return true}}
 if(k==='check')judgeCheck(p.x<A.W/2);return false}
function move(p){if(W.drag==='cut')setCut(vOf(p.x,78),true);else if(W.drag==='mark')setMark(Math.round(pin((p.x-span().x)/(span().w*.9),0,1)*63),true);else if(W.drag&&W.drag.i!=null){W.drag.x=p.x;W.drag.y=p.y}}
function up(){const d=W.drag;W.drag=null;if(d==='cut')setCut(W.cut);else if(d==='mark')setMark(W.mark);else if(d&&d.i!=null)useStop(d.i)}
const steps=[
{h:'Show what is left',p:'Sam had 78 stickers. He gave some away. Now he has 45. Drag the split on the bar, then choose the sum.',
 predict:{q:'Which sum finds how many Sam gave away?',opts:['78 + 45','78 − 45','45 − 78'],ans:1},task:'Split the bar at 45 and pick the sum',
 show:()=>replay(0,[()=>setCut(30),()=>setCut(40),()=>setCut(45),()=>pickSum('minus')],450),
 go:()=>setup(0,'A bar for 78 stickers. A bar split into what is left and what was given away.',()=>W.sum,'Whole − known part = unknown part.')},
{h:'How many more?',p:'Ava has 63 shells and Ben has 38. Drag the marker to the end of Ben\'s bar. The gap is the answer.',
 predict:{q:'"How many more has Ava?" Which do you do?',opts:['add: 63 + 38','take away: 63 − 38','count Ben\'s shells'],ans:1},task:'Line the marker up with Ben\'s bar',
 show:()=>replay(1,[()=>setMark(20),()=>setMark(30),()=>setMark(38)],450),
 go:()=>setup(1,'Two bars: Ava 63 on top, Ben 38 below.',()=>W.compOK,'"How many more" is the difference: take away.')},
{h:'Unknown start',p:'Some birds were on a tree. 17 more landed. Now there are 52. Use ? for the number you do not know.',
 predict:{q:'The story says "17 more". Do you work out 52 + 17?',opts:['yes: "more" means add','no: 52 is the total, so take 17 away','no: take 52 away from 17'],ans:1},task:'Pick the equation, then find ?',
 show:()=>replay(2,[()=>pickEq(0),()=>pickStart(35)],700),
 go:()=>setup(2,'A bar of 52 split into an unknown start and 17 that landed. Three equation cards.',()=>W.start,'Read the story, not one word: ? + 17 = 52, so ? = 35.')},
{h:'Two steps',p:'46 people are on a bus. At one stop 18 get off. At the next, 25 get on. Drag the steps into the boxes, in story order.',task:'Do both steps',
 show:()=>replay(3,[()=>useStop(0),()=>useStop(1)],700),
 go:()=>setup(3,'A bus count of 46 with two empty boxes for after each stop.',()=>W.path.length>1,'Two-step problems: answer step one, then use it in step two.')},
{h:'Does it make sense?',p:'Kit solved four problems. Estimate with tens. Is each answer sensible, or can it not be right?',task:'Check all 4 answers',
 show:()=>replay(4,[()=>judgeCheck(true),()=>judgeCheck(false),()=>judgeCheck(true),()=>judgeCheck(false)],500),
 go:()=>setup(4,'A card with a word problem and Kit\'s answer.',()=>W.ci>3,'Estimate to check: round to tens and see if the answer is close.')},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.after()});
const QS=[
 {pic:'78 → ? → 45',q:'Sam had 78 stickers, gave some away and has 45. How many did he give away?',ans:'33',bad:[['123','plus'],['43','place']]},
 {pic:'63 vs 38',q:'Ava has 63 shells. Ben has 38. How many more has Ava?',ans:'25',bad:[['101','more'],['35','place']]},
 {pic:'? + 17 = 52',q:'Some birds, then 17 more landed. Now 52. How many at the start?',ans:'35',bad:[['69','keyword'],['45','place']]},
 {pic:'46 − 18 + 25',q:'46 on a bus, 18 get off, 25 get on. How many now?',ans:'53',bad:[['28','onestep'],['89','alladd']]},
 {pic:'? − 24 = 30',q:'Jo had some cards. She gave away 24 and has 30 left. How many at first?',ans:'54',bad:[['6','backwards'],['24','copy']]},
 {pic:'two bags',q:'A bag has 35 beads, another has 18 fewer. How many beads in both bags?',ans:'52',bad:[['17','onestep'],['88','fewer']]}];
function slip(t){let m='Draw the bar model and check which part is unknown.';
 if(t==='plus')m='He gave stickers away, so the answer is less than 78. Whole take away part: 78 − 45.';
 if(t==='place')m='Check the tens and ones. Count on from the smaller number to the bigger one to check.';
 if(t==='more')m='"How many more" asks for the gap between the bars. Take away: 63 − 38.';
 if(t==='keyword')m='Do not add just because you read "more". 52 is the total, so take away the 17.';
 if(t==='onestep')m='That is only step one. Use that answer in step two.';
 if(t==='alladd')m='People who get off make fewer. Take 18 away, then add 25.';
 if(t==='backwards')m='She had more at first than she has now. Add back what she gave away: 30 + 24.';
 if(t==='copy')m='24 is what she gave away, not what she started with.';
 if(t==='fewer')m='"18 fewer" means the second bag has 35 − 18 = 17. Then add the bags: 35 + 17.';
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],list=[[Q.ans,'ok'],...Q.bad],r=qi%3,ord=list.slice(r).concat(list.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>grade(t,Q.ans)});tell('Challenge: '+Q.q);A.redraw()}
function grade(t,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();tell(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
G=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:Q=>{chal.hidden=Q.step!==5;keys.hidden=Q.step===5;redoKeys()},
 init:Q=>{A=Q;const w=c.el('div',{class:'fl-below'},Q.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Bar model controls'},w);chal=c.el('div',{class:'fl-chal'},Q.below);clear();A.gest({down,move,up});redoKeys()}});
G.start()})})();
