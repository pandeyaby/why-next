/* Flagship – addition in any order (ages 6–7): turn a domino round and see 3 + 8 and 8 + 3 make the same total; choose
   the bigger number to count on from, so 2 + 9 needs 2 hops, not 9; find the turnaround fact for an addition (and reject a
   take-away decoy); take counters away to see that 5 − 3 = 2 but 3 − 5 cannot be done the same way, so subtraction does
   not turn round; and add three numbers in the easiest order by spotting two that make 10. The Challenge targets the usual
   slips: thinking the order changes the total, swapping a subtraction, writing the digits side by side (83), counting the
   start number as a hop, and always starting on the first number. Every tap on the picture has a button twin. */
(()=>{
const DOMS=[[3,8],[6,4],[2,7]],ONS=[[2,9],[3,8],[1,7]],TAKES=[[5,3],[7,4],[6,2]],TRIOS=[[7,5,3],[4,9,6],[8,6,2]];
const TURNS=[['4 + 7',[['7 + 4','ok'],['7 − 4','take'],['4 + 4','same'],['11 + 4','tot']]],
 ['5 + 9',[['9 − 5','take'],['9 + 5','ok'],['5 + 5','same'],['14 + 9','tot']]],
 ['6 + 2',[['2 + 2','same'],['6 − 2','take'],['8 + 6','tot'],['2 + 6','ok']]]];
const PIPS={1:[[1,1]],2:[[0,0],[2,2]],3:[[0,0],[1,1],[2,2]],4:[[0,0],[2,0],[0,2],[2,2]],5:[[0,0],[2,0],[1,1],[0,2],[2,2]],
 6:[[0,0],[2,0],[0,1],[2,1],[0,2],[2,2]],7:[[0,0],[2,0],[0,1],[1,1],[2,1],[0,2],[2,2]],8:[[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2]],
 9:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]};
VIS.reg('flagaddord',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');const S={};
const view=()=>['domino','counton','turn','take','trio','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1:1.2));
function write(g,t,x,y,n,col,w){g.font=`${w||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-14)}
const total=t=>t.split(' + ').reduce((x,y)=>x+Number(y),0);
const hit=(p,b)=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function card(g,b,fill,edge,r){g.fillStyle=fill;A.paint.rrect(b.x,b.y,b.w,b.h,r||14);g.fill();g.lineWidth=2.5;g.strokeStyle=edge||A.col.tx;A.paint.rrect(b.x,b.y,b.w,b.h,r||14);g.stroke()}
const wobble=(k,v)=>{S[k]=v;setTimeout(()=>{S[k]=null;A.redraw()},A.reduced()?10:850)};
/* ---- where things sit ---- */
function domRect(){const w=Math.min(A.W*.72,330),h=Math.min(w*.48,A.H*.34);return{x:(A.W-w)/2,y:A.H*.17,w,h}}
function onCards(){const w=Math.min(A.W*.42,190),h=Math.min(A.H*.15,64),y=A.H*.2;return[{x:A.W/2-w-8,y,w,h},{x:A.W/2+8,y,w,h}]}
function cell(i,n){const w=Math.min((A.W-20)/n,70);return{x:(A.W-n*w)/2+i*w+2,y:A.H*.58,w:w-4,h:Math.min(w*1.2,A.H*.17)}}
function turnCard(i){const w=(A.W-36)/2,h=Math.min(A.H*.17,70);return{x:12+(i%2)*(w+12),y:A.H*.42+Math.floor(i/2)*(h+12),w,h}}
function dot(i,n){const gap=Math.min((A.W-40)/Math.max(n,7),58),r=gap*.36;return{x:(A.W-(n-1)*gap)/2+i*gap,y:A.H*.42,r}}
function trioCard(i){const w=Math.min((A.W-48)/3,130),h=Math.min(A.H*.2,86);return{x:(A.W-3*w-24)/2+i*(w+12),y:A.H*.3,w,h}}
/* ---- pictures ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.06:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){write(g,'3 + 8 = 8 + 3',W/2,H*.36,30);write(g,'5 − 3 ≠ 3 − 5',W/2,H*.56,30);write(g,'Adding turns round. Taking away does not.',W/2,H*.8,15);return}
 ({domino:drawDomino,counton:drawCountOn,turn:drawTurn,take:drawTake,trio:drawTrio})[v](g,W,H,C);A.fx.draw(g)}
function pips(g,b,n,col){const s=Math.min(b.w,b.h)/3.4;(PIPS[n]||[]).forEach(([i,j])=>A.paint.ball(b.x+b.w/2+(i-1)*s,b.y+b.h/2+(j-1)*s,s*.32,col))}
function drawDomino(g,W,H,C){const r=Math.min(S.r,2),[a,b]=DOMS[r],d=domRect(),swap=S.flipped||(S.spin||0)>Math.PI/2,L=swap?b:a,R=swap?a:b;
 write(g,S.r>=3?'Three dominoes turned.':'Tap the domino to turn it round.',W/2,H*.07,15);
 const sq=Math.abs(Math.cos(S.spin||0)),cx=W/2,w=d.w*Math.max(.08,sq);g.save();g.translate(cx,0);g.scale(w/d.w,1);g.translate(-cx,0);
 card(g,d,C.dark?'#f8fafc':'#ffffff',C.tx,18);g.lineWidth=3;g.strokeStyle='#1f2937';g.beginPath();g.moveTo(cx,d.y+10);g.lineTo(cx,d.y+d.h-10);g.stroke();
 pips(g,{x:d.x,y:d.y,w:d.w/2,h:d.h},L,'#1d4ed8');pips(g,{x:cx,y:d.y,w:d.w/2,h:d.h},R,'#b91c1c');g.restore();
 write(g,`${L} + ${R} = ${a+b}`,W/2,H*.66,26);if(S.full)write(g,`${R} + ${L} = ${a+b} too. Same dots, same total.`,W/2,H*.8,17)}
function drawCountOn(g,W,H,C){const r=Math.min(S.r,2),[a,b]=ONS[r],cards=onCards();
 write(g,S.r>=3?'Start on the bigger number.':`${a} + ${b} = ?  Pick where to start.`,W/2,H*.08,16);
 [a,b].forEach((n,i)=>{const q=cards[i],pick=S.start===n,bad=S.bad===n;card(g,q,bad?A.alpha(C.rd,.25):pick?A.alpha(C.gr,.3):A.alpha(C.cy,.14),C.tx);write(g,`Start on ${n}`,q.x+q.w/2,q.y+q.h/2,18)});
 if(S.start==null||S.r>=3)return;const big=Math.max(a,b),small=Math.min(a,b),n=small+2;
 for(let i=0;i<n;i++){const q=cell(i,n),num=big+i;card(g,q,num===S.at?A.alpha(C.am,.35):A.alpha(C.mu,.1),C.tx,10);write(g,String(num),q.x+q.w/2,q.y+q.h*.7,16)}
 for(let k=0;k<S.hops;k++){const p=cell(k,n),q=cell(k+1,n),x0=p.x+p.w/2,x1=q.x+q.w/2;g.lineWidth=3;g.strokeStyle=C.vi;g.beginPath();g.moveTo(x0,p.y);g.quadraticCurveTo((x0+x1)/2,p.y-36,x1,p.y);g.stroke();write(g,String(k+1),(x0+x1)/2,p.y-30,14)}
 const f=cell(S.at-big,n);g.font=`${Math.round(Math.min(26,f.h*.4))}px system-ui,sans-serif`;g.textAlign='center';g.fillStyle='#000';g.fillText('🐰',f.x+f.w/2,f.y+f.h*.3);
 write(g,S.full?`${big} + ${small} = ${big+small}. Only ${small} hops!`:`Hops: ${S.hops} of ${small}. Tap the next number.`,W/2,H*.88,16)}
function drawTurn(g,W,H,C){const r=Math.min(S.r,2),[sum,opts]=TURNS[r];write(g,S.r>=3?'All turned round!':'Which card is the same sum turned round?',W/2,H*.07,15);
 const top={x:W*.25,y:H*.16,w:W*.5,h:Math.min(H*.18,74)};card(g,top,A.alpha(C.vi,.18),C.vi);write(g,S.full?`${sum} = ${total(sum)}`:sum,W/2,top.y+top.h/2,26);
 if(S.r>=3)return;opts.forEach(([t,k],i)=>{const q=turnCard(i);card(g,q,S.bad===i?A.alpha(C.rd,.25):S.full&&k==='ok'?A.alpha(C.gr,.3):A.alpha(C.or,.14),C.tx);write(g,t,q.x+q.w/2,q.y+q.h/2,22)})}
function drawTake(g,W,H,C){const r=Math.min(S.r,2),[a,b]=TAKES[r],have=S.phase?b:a,need=S.phase?a:b;
 if(S.r>=3){write(g,'Taking away does not turn round.',W/2,H*.08,15);TAKES.forEach(([x,y],i)=>{write(g,`${x} − ${y} = ${x-y}`,W*.28,H*(.3+i*.18),20,C.tx);write(g,`${y} − ${x} ✗`,W*.74,H*(.3+i*.18),20,C.rd)});write(g,'✗ = not enough to take away',W/2,H*.86,14,C.rd);return}
 write(g,S.phase?`Now ${b} − ${a}. Only ${b} counters.`:`${a} − ${b}. Tap ${b} counters to take them away.`,W/2,H*.08,15);
 for(let i=0;i<have;i++){const p=dot(i,have),gone=i>=have-S.taken;A.paint.ball(p.x,gone?p.y+H*.22:p.y,p.r,gone?A.alpha(C.mu,.35):C.cy);if(gone){g.lineWidth=2;g.strokeStyle=C.tx;g.beginPath();g.arc(p.x,p.y+H*.22,p.r,0,7);g.stroke()}}
 write(g,`Taken: ${S.taken} of ${need}`,W/2,H*.76,17);
 if(S.done0&&!S.phase)write(g,`${a} − ${b} = ${a-b}`,W/2,H*.9,22);if(S.full)write(g,`None left! ${b} − ${a} is not ${a-b}.`,W/2,H*.9,18,C.rd)}
function drawTrio(g,W,H,C){const r=Math.min(S.r,2),nums=TRIOS[r];write(g,S.r>=3?'Make 10 first.':'Tap two numbers that make 10.',W/2,H*.08,16);
 write(g,nums.join(' + ')+' = ?',W/2,H*.19,24);
 nums.forEach((n,i)=>{const q=trioCard(i),on=S.picks.includes(i);card(g,q,S.bad&&S.bad.includes(i)?A.alpha(C.rd,.25):on?A.alpha(C.gr,.3):A.alpha(C.am,.16),C.tx);write(g,String(n),q.x+q.w/2,q.y+q.h/2,30)});
 if(S.full){const[i,j]=S.picks,k=3-i-j;write(g,`${nums[i]} + ${nums[j]} = 10`,W/2,H*.66,22,C.tx);write(g,`10 + ${nums[k]} = ${10+nums[k]}`,W/2,H*.8,24)}}
/* ---- what each action does ---- */
function turnDomino(){if(view()!=='domino'||S.full||S.r>=3)return;const[a,b]=DOMS[S.r];A.sound.whoosh();S.spin=0;
 A.tween(S,{spin:Math.PI},A.reduced()?1:600,'io',()=>{S.spin=0;S.flipped=1;S.full=1;speak(`Turned round: ${b} + ${a} = ${a+b}. ${a} + ${b} was ${a+b} too. Same total.`);A.redraw();buttons();S.want()})}
function chooseStart(n){if(view()!=='counton'||S.r>=3||S.start!=null)return;const[a,b]=ONS[S.r],big=Math.max(a,b),small=Math.min(a,b);
 if(n!==big){A.sound.miss();wobble('bad',n);speak(`Starting on ${n} means ${big} hops. Turn it round: start on ${big} and you only hop ${small}.`);return A.redraw()}
 S.start=n;S.at=n;A.sound.tick();speak(`Start on ${big}. Now hop ${small}.`);A.redraw();buttons()}
function hop(n){if(view()!=='counton'||S.start==null||S.full)return;const[a,b]=ONS[S.r],small=Math.min(a,b);
 if(n!==S.at+1){A.sound.miss();speak(n<=S.at?`Hop forward, to ${S.at+1}.`:`One number at a time, so you can count the hops.`);return}
 S.at=n;S.hops++;A.sound.tick();if(S.hops===small){S.full=1;speak(`Landed on ${n}. ${a} + ${b} = ${n}, in just ${small} hops.`)}else speak(`${S.hops} hop${S.hops>1?'s':''}, on ${n}.`);A.redraw();buttons()}
function pickTurn(i){if(view()!=='turn'||S.full||S.r>=3)return;const[sum,opts]=TURNS[S.r],[t,k]=opts[i];
 if(k!=='ok'){A.sound.miss();wobble('bad',i);speak(k==='take'?`${t} is a take-away. It does not make the same as ${sum}.`:k==='same'?`${t} changes a number. Turning round keeps both numbers: just swap them.`:`${t} adds the total on again. Just swap the two numbers.`);return A.redraw()}
 S.full=1;A.sound.pop();speak(`Yes. ${t} is ${sum} turned round. Both make ${total(sum)}.`);A.redraw();buttons()}
function takeOne(){if(view()!=='take'||S.full||S.r>=3||(S.done0&&!S.phase))return;const[a,b]=TAKES[S.r],have=S.phase?b:a,need=S.phase?a:b;
 if(S.taken>=have)return;S.taken++;A.sound.pop();
 if(!S.phase&&S.taken===need){S.done0=1;speak(`${a} take away ${b} leaves ${a-b}. Now try it the other way round.`);A.redraw();buttons();return}
 if(S.phase&&S.taken===have){S.full=1;speak(`No counters left, but you needed to take ${a}. ${b} − ${a} is not ${a-b}. Taking away does not turn round.`);A.redraw();buttons();return}
 speak(`Taken ${S.taken}. ${have-S.taken} left.`);A.redraw();buttons()}
function otherWay(){if(!S.done0||S.phase)return;S.phase=1;S.taken=0;speak(`${TAKES[S.r][1]} − ${TAKES[S.r][0]}: tap the counters.`);A.redraw();buttons()}
function pickTrio(i){if(view()!=='trio'||S.full||S.r>=3||S.picks.includes(i))return;S.picks.push(i);A.sound.tick();if(S.picks.length<2){speak(`${TRIOS[S.r][i]}. Pick one more.`);A.redraw();buttons();return}
 const nums=TRIOS[S.r],[x,y]=S.picks;if(nums[x]+nums[y]!==10){A.sound.miss();const tot=nums[0]+nums[1]+nums[2];wobble('bad',[x,y]);speak(`${nums[x]} + ${nums[y]} = ${nums[x]+nums[y]}. The total is still ${tot}, but find two that make 10 for an easy start.`);S.picks=[];A.redraw();buttons();return}
 S.full=1;A.sound.pop();speak(`${nums[x]} + ${nums[y]} = 10, then 10 + ${nums[3-x-y]} = ${10+nums[3-x-y]}.`);A.redraw();buttons()}
function next(){if(!S.full||S.r>=3)return;S.r++;Object.assign(S,{full:0,flipped:0,start:null,at:0,hops:0,taken:0,phase:0,done0:0,picks:[],bad:null});A.sound.step();
 if(S.r>=3){A.redraw();buttons();return S.want()}const v=view();
 speak(v==='domino'?`${DOMS[S.r][0]} + ${DOMS[S.r][1]}. Turn it round.`:v==='counton'?`${ONS[S.r][0]} + ${ONS[S.r][1]}. Where will you start?`:v==='turn'?`Turn round ${TURNS[S.r][0]}.`:v==='take'?`${TAKES[S.r][0]} − ${TAKES[S.r][1]}.`:`${TRIOS[S.r].join(' + ')}. Which two make 10?`);A.redraw();buttons()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=view(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(S.r>=3)return;if(S.full){B(S.r<2?'Next one':'Finish',next);return}
 if(v==='domino')B('Turn it round',turnDomino,'Turn the domino round');
 if(v==='counton'){const[a,b]=ONS[S.r];if(S.start==null){B(`Start on ${a}`,()=>chooseStart(a));B(`Start on ${b}`,()=>chooseStart(b))}else B(`Hop to ${S.at+1}`,()=>hop(S.at+1))}
 if(v==='turn')TURNS[S.r][1].forEach(([t],i)=>B(t,()=>pickTurn(i),`Choose ${t}`));
 if(v==='take'){if(S.done0&&!S.phase)B(`Try ${TAKES[S.r][1]} − ${TAKES[S.r][0]}`,otherWay);else B('Take one away',takeOne,'Take one counter away')}
 if(v==='trio')TRIOS[S.r].forEach((n,i)=>{if(!S.picks.includes(i))B(String(n),()=>pickTrio(i),`Pick ${n}`)})}
/* ---- taps on the picture ---- */
function down(p){const v=view();if(S.full&&S.r<3){next();return false}if(S.r>=3)return false;
 if(v==='domino'&&hit(p,domRect()))turnDomino();
 if(v==='counton'){const[a,b]=ONS[S.r];if(S.start==null)onCards().forEach((q,i)=>{if(hit(p,q))chooseStart([a,b][i])});else{const big=Math.max(a,b),n=Math.min(a,b)+2;for(let i=0;i<n;i++)if(hit(p,cell(i,n)))hop(big+i)}}
 if(v==='turn')[0,1,2,3].forEach(i=>{if(hit(p,turnCard(i)))pickTurn(i)});
 if(v==='take'){if(S.done0&&!S.phase){otherWay();return false}const have=S.phase?TAKES[S.r][1]:TAKES[S.r][0];for(let i=0;i<have-S.taken;i++){const d=dot(i,have);if(Math.hypot(p.x-d.x,p.y-d.y)<d.r+12){takeOne();break}}}
 if(v==='trio')[0,1,2].forEach(i=>{if(hit(p,trioCard(i)))pickTrio(i)});return false}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const me=++S.ver;list.forEach((f,j)=>setTimeout(()=>{if(me===S.ver)f()},A.reduced()?40*(j+1):(j+1)*gap))}
function fresh(){const v=(S.ver||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{ver:v,want:()=>{},r:0,full:0,flipped:0,spin:0,start:null,at:0,hops:0,taken:0,phase:0,done0:0,picks:[],bad:null})}
const rounds=f=>[0,1,2].flatMap(f);
const steps=[
{h:'Turn the domino',p:'A domino has 3 dots and 8 dots. 3 + 8 = 11. Turn it round. Does the total change?',predict:{q:'3 + 8 = 11. What is 8 + 3?',opts:['11','5','83'],ans:0},task:'Turn 3 dominoes',
 show:()=>{steps[0].go();play(rounds(()=>[turnDomino,next]),700)},
 go:()=>{fresh();speak('3 + 8. Tap the domino to turn it round.');buttons();S.want=finish(0,()=>S.r>=3,'Turning an addition round keeps the total the same.')}},
{h:'Start on the big one',p:'You can add in any order. So for 2 + 9, start on 9 and count on 2. That is quicker.',predict:{q:'2 + 9. Which start needs fewer hops?',opts:['Start on 2','Start on 9','Both the same']
 ,ans:1},task:'Count on 3 times',
 show:()=>{steps[1].go();play(rounds(r=>{const[a,b]=ONS[r],big=Math.max(a,b),L=[()=>chooseStart(big)];for(let k=1;k<=Math.min(a,b);k++)L.push(()=>hop(big+k));return L.concat(next)}),260)},
 go:()=>{fresh();speak('2 + 9. Tap where you will start.');buttons();S.want=finish(1,()=>S.r>=3,'Start on the bigger number and count on the smaller one.')}},
{h:'Turnaround facts',p:'4 + 7 turned round is 7 + 4. Find the turnaround card for each sum.',task:'Find 3 turnarounds',
 show:()=>{steps[2].go();play(rounds(r=>[()=>pickTurn(TURNS[r][1].findIndex(o=>o[1]==='ok')),next]),420)},
 go:()=>{fresh();speak('4 + 7. Which card is the same sum turned round?');buttons();S.want=finish(2,()=>S.r>=3,'Swap the two numbers and the total stays the same.')}},
{h:'Take-away is different',p:'Take 3 away from 5. Then try to take 5 away from 3. What happens?',predict:{q:'5 − 3 = 2. Is 3 − 5 also 2?',opts:['Yes, it is 2','No, you cannot take 5 from 3','Yes, it is 8'],ans:1},task:'Try 3 take-aways both ways',
 show:()=>{steps[3].go();play(rounds(r=>{const[a,b]=TAKES[r];return[...Array(b).fill(takeOne),otherWay,...Array(b).fill(takeOne),next]}),200)},
 go:()=>{fresh();speak('5 − 3. Tap 3 counters to take them away.');buttons();S.want=finish(3,()=>S.r>=3,'Adding turns round. Taking away does not.')}},
{h:'Make 10 first',p:'With three numbers, add any two first. Look for two that make 10. Then add the last one.',predict:{q:'7 + 5 + 3. Does the order change the total?',opts:['Yes','No, it is always 15','Only if 7 is first'],ans:1},task:'Add 3 sums the easy way',
 show:()=>{steps[4].go();play(rounds(r=>{const n=TRIOS[r],P=[[0,1],[0,2],[1,2]].find(([i,j])=>n[i]+n[j]===10);return[()=>pickTrio(P[0]),()=>pickTrio(P[1]),next]}),380)},
 go:()=>{fresh();speak('7 + 5 + 3. Tap two numbers that make 10.');buttons();S.want=finish(4,()=>S.r>=3,'Any order gives the same total, so pick the easy order.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['3 + 8 = 11. What is 8 + 3?',[['11','ok'],['5','minus'],['83','join']]],
 ['2 + 9. Which way is quick?',[['Start on 9, count on 2','ok'],['Start on 2, count on 9','slow'],['Count all from 1','all']]],
 ['Is 6 − 2 the same as 2 − 6?',[['No','ok'],['Yes, both are 4','swap'],['Yes, both are 8','plus']]],
 ['5 + 9 = 14. Which is also 14?',[['9 + 5','ok'],['9 − 5','minus2'],['5 + 5','change']]],
 ['7 + 5 + 3. Which two make 10?',[['7 and 3','ok'],['7 and 5','twelve'],['5 and 3','eight']]],
 ['9 + 3. Start on 9 and count on 3. Where do you land?',[['12','ok'],['11','start'],['13','extra']]]];
function why(t){let m='Turn it round in your head and check the total.';
 if(t==='minus')m='That is 8 take away 3. Turning round still adds: 8 + 3 = 11.';
 if(t==='join')m='83 puts the digits side by side. 8 + 3 means 8 and 3 more, which is 11.';
 if(t==='slow')m='That works, but it is 9 hops. Start on 9 and it is only 2 hops: 10, 11.';
 if(t==='all')m='Counting all from 1 is slow. Start on the bigger number, 9, and count on 2.';
 if(t==='swap')m='Take-away does not turn round. 6 − 2 = 4, but you cannot take 6 away from 2.';
 if(t==='plus')m='8 is 6 + 2. The question is take-away, and 6 − 2 is not the same as 2 − 6.';
 if(t==='minus2')m='9 − 5 is a take-away and makes 4. Keep the + sign: 9 + 5 = 14.';
 if(t==='change')m='5 + 5 changes a number. Turning round keeps 5 and 9: 9 + 5.';
 if(t==='twelve')m='7 + 5 is 12. Look again: 7 + 3 = 10.';
 if(t==='eight')m='5 + 3 is 8. Look again: 7 + 3 = 10.';
 if(t==='start')m='Do not count the 9 you start on. 10, 11, 12 is 3 hops, so you land on 12.';
 if(t==='extra')m='That is one hop too many. 10, 11, 12: you land on 12.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],k=qi%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(k).concat(ops.slice(0,k)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${run} right in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.64,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down});buttons()}});
A.start()})})();
