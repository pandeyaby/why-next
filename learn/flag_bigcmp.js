/* Flagship: comparing and ordering numbers beyond 1000 (ages 8–9; National Curriculum in England, Year 4 number and place
   value: "order and compare numbers beyond 1000"). Decide pairs by finding the first place value column that differs,
   slide a 3-digit number so its ones sit under the ones of a 4-digit number, order four numbers, build the biggest and
   smallest numbers from four digit cards (no leading zero), and find every missing digit that makes 4,□52 > 4,751 true.
   Every canvas tap has a button twin in the control row. */
(()=>{
const INK='#0f172a',SOFT='#475569',EDGE='#1e3a8a',CARD='#ffffff',GOOD='#047857',BAD='#b91c1c',PALE='#eef2ff',WIN='#dcfce7',GOLD='#fef3c7',MISS='#fee2e2',ZERO='#e2e8f0';
const COLS=['Th','H','T','O'],NAMES=['thousands','hundreds','tens','ones'];
const four=n=>String(n).padStart(4,'0').split('').map(Number);
const fmt=n=>n>=1000?String(n).replace(/\B(?=(\d{3})+(?!\d))/g,','):String(n);
const firstDiff=(a,b)=>{const x=four(a),y=four(b);for(let i=0;i<4;i++)if(x[i]!==y[i])return i;return -1};
const sign=(a,b)=>a<b?'<':a>b?'>':'=';
const PAIRS=[[1999,2001],[4321,4312],[6050,6005],[8016,8106]];
const LINEUP=[[1203,987],[2050,995]];
const SET=[4321,1876,9045,4312],UP=[...SET].sort((a,b)=>a-b);
const DIGS=[3,0,7,5],BIG=7530,SMALL=3057;
const OK_GAP=[7,8,9];
VIS.reg('flagbigcmp',c=>{let A,X,pad,box,qi=-1,wins=0;const S={after:()=>{}};
const k=v=>Math.round(v*(A.narrow?1:1.1)),font=v=>`700 ${k(v)}px system-ui,sans-serif`;
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function txt(s,x,y,v,col,al){X.font=font(v);X.fillStyle=col||INK;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-14)}
function wrapLines(s,w,v){X.font=font(v);const out=[];let cur='';for(const word of String(s).split(' ')){const t=cur?cur+' '+word:word;if(cur&&X.measureText(t).width>w){out.push(cur);cur=word}else cur=t}out.push(cur);return out}
function box2(r,fill,edge,lw){X.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);X.fill();if(edge){X.strokeStyle=edge;X.lineWidth=lw||2;X.stroke()}}
function banner(s,good){const L=wrapLines(s,A.W-34,13),lh=k(13)+4,r={x:10,y:8,w:A.W-20,h:Math.max(A.H*.11,L.length*lh+12)};box2(r,good?WIN:PALE,good?GOOD:EDGE);L.forEach((l,i)=>txt(l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,13,good?GOOD:INK));return r.y+r.h}
function note(){if(!S.msg)return;const L=wrapLines((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=k(13)+5,h=L.length*lh+10,y=A.H-h-6;box2({x:10,y,w:A.W-20,h},CARD,S.bad?BAD:GOOD,3);L.forEach((l,i)=>txt(l,A.W/2,y+5+lh*(i+.5),13))}
const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const wrong=s=>{S.bad=true;S.msg=s;A.sound.miss();refresh()};
const right=s=>{S.bad=false;S.msg=s;A.sound.pop()};
/* place value grid: 4 columns centred; rows of digits under Th H T O */
const cell=()=>Math.min(k(64),(A.W-40)/4.6);
const colX=i=>A.W/2-2*cell()+i*cell();
const rowY=j=>A.H*(A.narrow?.27:.25)+k(26)+j*(cell()*.92);
function heads(){COLS.forEach((h,i)=>txt(h,colX(i)+cell()/2,A.H*(A.narrow?.27:.25)+k(10),13,SOFT))}
function digitRow(n,j,lit,shift){const d=String(n).split(''),off=4-d.length+(shift==null?0:shift-(4-d.length));
 for(let i=0;i<4;i++){const r={x:colX(i)+3,y:rowY(j),w:cell()-6,h:cell()*.82};box2(r,i===lit?GOLD:CARD,EDGE,i===lit?3:1.5)}
 d.forEach((ch,t)=>{const i=off+t;if(i<0||i>3)return;txt(ch,colX(i)+cell()/2,rowY(j)+cell()*.41,22)});return off}
/* round buttons under the grid */
function chips(list,y,state,label){const w=Math.min(k(72),(A.W-24-(list.length-1)*8)/list.length),all=list.length*w+(list.length-1)*8;
 return list.map((v,i)=>{const r={x:(A.W-all)/2+i*(w+8),y,w,h:k(44)},s=state?state(v):'';box2(r,s==='ok'?WIN:s==='no'?MISS:CARD,s==='ok'?GOOD:s==='no'?BAD:EDGE,2);txt(label?label(v):v,r.x+r.w/2,r.y+r.h/2,18);return r})}
const part=()=>['pairs','line','order','build','gap','quiz'][A.step];
/* step 1: decide pairs */
function drawPairs(){const fin=S.pi>=PAIRS.length,[a,b]=PAIRS[Math.min(S.pi,3)];
 banner(fin?'Start at the biggest place. The first column that differs decides; the digits after it do not matter.':`Compare ${fmt(a)} and ${fmt(b)}. Tap <, = or >.`,fin);
 heads();digitRow(a,0,S.lit);digitRow(b,1,S.lit);if(!fin)S.signR=chips(['<','=','>'],rowY(2)+k(6),v=>v===S.tried?'no':'')}
function pickSign(s){if(S.pi>=PAIRS.length)return;const [a,b]=PAIRS[S.pi],good=sign(a,b),d=firstDiff(a,b);A.sound.tick();S.tried=s;
 if(s!==good){const sa=four(a).reduce((p,q)=>p+q),sb=four(b).reduce((p,q)=>p+q);S.lit=d;
  if(sign(sa,sb)===s)return wrong(`Adding up the digits does not compare numbers. Look left first: ${NAMES[d]} ${four(a)[d]} and ${four(b)[d]}.`);
  if(sign(a%10,b%10)===s)return wrong(`That compares the ones. Start on the left: the ${NAMES[d]} differ first (${four(a)[d]} and ${four(b)[d]}).`);
  return wrong(`Look at the ${NAMES[d]}: ${four(a)[d]} and ${four(b)[d]}. The open side of the sign faces the bigger number.`)}
 S.lit=d;S.tried=null;S.pi++;right(`${COLS[d]}: ${four(a)[d]} ${good} ${four(b)[d]}, so ${fmt(a)} ${good} ${fmt(b)}.`);refresh()}
/* step 2: line up the places */
function drawLine(){const fin=S.li>=LINEUP.length,[a,b]=LINEUP[Math.min(S.li,1)],need=4-String(b).length;
 banner(fin?'A 3-digit number has 0 thousands, so any 4-digit number is bigger. Line up the ones, never the first digits.':`Slide ${fmt(b)} so its ones sit under the ones. Drag it, or use the buttons.`,fin);
 heads();digitRow(a,0,-1);if(fin)S.shift=need;const lined=S.shift===need;
 for(let i=0;i<4;i++){const r={x:colX(i)+3,y:rowY(1),w:cell()-6,h:cell()*.82};box2(r,lined&&i<need?ZERO:CARD,EDGE,1.5);if(lined&&i<need)txt('0',r.x+r.w/2,r.y+r.h/2,20,SOFT)}
 const d=String(b).split(''),dx=S.drag?S.drag.dx:0;S.strip={x:colX(S.shift)+dx,y:rowY(1),w:d.length*cell(),h:cell()*.82};
 X.fillStyle='rgba(30,58,138,.12)';A.paint.rrect(S.strip.x,S.strip.y-3,S.strip.w,S.strip.h+6,10);X.fill();X.strokeStyle=EDGE;X.lineWidth=2.5;X.stroke();
 d.forEach((ch,t)=>txt(ch,colX(S.shift)+dx+t*cell()+cell()/2,rowY(1)+cell()*.41,22));
 if(lined)txt(`${fmt(a)} > ${fmt(b)}`,A.W/2,rowY(2)+k(18),20,GOOD)}
function slide(to){if(S.li>=LINEUP.length)return;const [,b]=LINEUP[S.li],need=4-String(b).length;S.shift=Math.max(0,Math.min(need,to));A.sound.tick();
 if(S.shift===need){right(`Ones under ones: ${fmt(b)} has 0 thousands, and ${fmt(LINEUP[S.li][0])} has ${four(LINEUP[S.li][0])[0]}.`);const id=S.run,li=S.li;refresh();setTimeout(()=>{if(id!==S.run||li!==S.li)return;S.li++;S.shift=0;if(S.li<LINEUP.length){S.msg='Now the next pair.';S.bad=false}refresh()},A.reduced()?40:900);return}
 S.bad=true;S.msg=`The ${String(b)[0]} is under the ${NAMES[S.shift]}. Its real place is the hundreds, so it must move right.`;refresh()}
/* step 3: order four numbers */
function drawOrder(){const fin=S.row.length===4;banner(fin?'1,876 < 4,312 < 4,321 < 9,045. When the thousands tie, the hundreds decide; when they tie too, the tens do.':'Tap the numbers from smallest to largest.',fin);
 const left=SET.filter(v=>!S.row.includes(v));S.cardR=chips(left,A.H*(A.narrow?.3:.3),v=>v===S.tried?'no':'',fmt);
 const w=Math.min(k(76),(A.W-24-24)/4),all=4*w+24;for(let i=0;i<4;i++){const r={x:(A.W-all)/2+i*(w+8),y:A.H*(A.narrow?.5:.52),w,h:k(44)};box2(r,S.row[i]?WIN:'#f1f5f9',S.row[i]?GOOD:EDGE,2);if(S.row[i])txt(fmt(S.row[i]),r.x+r.w/2,r.y+r.h/2,16);if(i<3)txt('<',r.x+r.w+4,r.y+r.h/2,14,SOFT)}
 txt('smallest',(A.W-all)/2+w/2,A.H*(A.narrow?.5:.52)+k(58),11,SOFT);txt('largest',(A.W+all)/2-w/2,A.H*(A.narrow?.5:.52)+k(58),11,SOFT)}
function pickNum(v){if(S.row.includes(v)||S.row.length===4)return;A.sound.tick();const m=UP[S.row.length];
 if(v!==m){S.tried=v;const d=firstDiff(v,m);return wrong(`${fmt(m)} is smaller than ${fmt(v)}: the ${NAMES[d]} differ first (${four(m)[d]} < ${four(v)[d]}).`)}
 S.tried=null;S.row.push(v);if(S.row.length===4)right('In order, smallest to largest.');else{S.bad=false;S.msg=`${fmt(v)} is the smallest left.`}refresh()}
/* step 4: biggest and smallest from digit cards */
function drawBuild(){const goal=S.made.length?'smallest':'biggest',fin=S.made.length===2;
 banner(fin?'Biggest: 7,530 (big digits in big places). Smallest: 3,057 (0 cannot go first, so 3 leads and 0 comes next).':`Use each card once to make the ${goal} 4-digit number.`,fin);
 if(!fin){const w=Math.min(k(64),(A.W-60)/4),all=4*w+24;S.slotR=[];for(let i=0;i<4;i++){const r={x:(A.W-all)/2+i*(w+8),y:A.H*(A.narrow?.28:.29),w,h:k(52)};S.slotR.push(r);box2(r,S.slots[i]!=null?CARD:'#f1f5f9',EDGE,2);if(S.slots[i]!=null)txt(S.slots[i],r.x+r.w/2,r.y+r.h/2,24);txt(COLS[i],r.x+r.w/2,r.y-k(10),11,SOFT)}
  S.digR=chips(DIGS,A.H*(A.narrow?.5:.53),v=>S.slots.includes(v)?'ok':'')}
 S.made.forEach((n,j)=>txt(`${j?'Smallest':'Biggest'}: ${fmt(n)}`,A.W/2,A.H*(fin?.36:.7)+j*k(30),18,GOOD))}
function putDigit(d){if(S.made.length===2||S.slots.includes(d))return;A.sound.tick();S.slots.push(d);if(S.slots.length<4){S.bad=false;S.msg='';return refresh()}
 const n=Number(S.slots.join('')),want=S.made.length?SMALL:BIG;
 if(n===want){S.made.push(n);S.slots=[];right(want===BIG?'7,530: the biggest digit in the biggest place.':'3,057 is the smallest 4-digit number from these cards.');return refresh()}
 S.slots=[];
 if(n<1000)return wrong(`0 cannot go first: ${String(n).padStart(4,'0')} is really ${fmt(n)}, a 3-digit number.`+(want===BIG?' 0 is the smallest digit, so it goes last.':' Put 3 first, then 0.'));
 if(want===BIG)return wrong(`${fmt(n)} is not the biggest. Put the biggest digit, 7, in the thousands, then 5, then 3, then 0.`);
 wrong(`${fmt(n)} is not the smallest. Lead with the smallest digit that is not 0 (3), then put 0, 5, 7 in order.`)}
/* step 5: missing digit */
function drawGap(){const fin=OK_GAP.every(d=>S.found.includes(d)),show=S.trial==null?'□':S.trial;
 banner(fin?'7, 8 and 9 work. With 7 the hundreds tie, the tens tie, and the ones decide: 2 > 1.':'4,□52 > 4,751. Tap every digit that makes this true.',fin);
 txt(`4,${show}52 > 4,751`,A.W/2,A.H*(A.narrow?.27:.3),26,S.trial==null?INK:OK_GAP.includes(S.trial)?GOOD:BAD);
 const rows=[[0,1,2,3,4],[5,6,7,8,9]];S.gapR=[];rows.forEach((row,j)=>{const rs=chips(row,A.H*(A.narrow?.42:.45)+j*k(52),v=>S.found.includes(v)?'ok':S.no.includes(v)?'no':'');rs.forEach((r,i)=>S.gapR.push([row[i],r]))})}
function tryGap(d){A.sound.tick();S.trial=d;const n=4052+100*d;
 if(!OK_GAP.includes(d)){if(!S.no.includes(d))S.no.push(d);return wrong(`4,${d}52 < 4,751: the thousands tie, then hundreds ${d} < 7.`)}
 if(!S.found.includes(d))S.found.push(d);
 if(d===7)right('4,752 > 4,751: hundreds 7 = 7, tens 5 = 5, ones 2 > 1. A tie means look at the next place.');else{S.bad=false;S.msg=`4,${d}52 > 4,751: hundreds ${d} > 7, so nothing after matters.`}
 if(OK_GAP.every(x=>S.found.includes(x))){S.bad=false;S.msg='All three found: 7, 8 and 9.'}refresh()}
/* pointer */
function down(p){const m=part();let f;
 if(m==='pairs'&&S.signR){f=S.signR.findIndex(r=>hit(p,r));if(f>=0){pickSign(['<','=','>'][f]);return true}}
 if(m==='line'&&S.strip&&S.li<LINEUP.length&&hit(p,{x:S.strip.x-10,y:S.strip.y-10,w:S.strip.w+20,h:S.strip.h+20})){S.drag={x0:p.x,dx:0};return true}
 if(m==='order'&&S.cardR){const left=SET.filter(v=>!S.row.includes(v));f=S.cardR.findIndex(r=>hit(p,r));if(f>=0){pickNum(left[f]);return true}}
 if(m==='build'&&S.digR){f=S.digR.findIndex(r=>hit(p,r));if(f>=0){putDigit(DIGS[f]);return true}}
 if(m==='gap'&&S.gapR){f=S.gapR.find(([,r])=>hit(p,r));if(f){tryGap(f[0]);return true}}return false}
function move(p){if(!S.drag)return;S.drag.dx=p.x-S.drag.x0;A.redraw()}
function up(){if(!S.drag)return;const steps=Math.round(S.drag.dx/cell());S.drag=null;slide(S.shift+steps)}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const m=part();if(m==='pairs')drawPairs();if(m==='line')drawLine();if(m==='order')drawOrder();if(m==='build')drawBuild();if(m==='gap')drawGap();
 if(m==='quiz'){banner('Line up the places. Compare from the left. The first column that differs decides.');heads();digitRow(4312,0,2);digitRow(4321,1,2)}
 note();A.fx.draw(X)}
function refresh(){const m=part();let s='Challenge.';
 if(m==='pairs')s=S.pi<PAIRS.length?`Pair ${S.pi+1} of 4: ${fmt(PAIRS[S.pi][0])} and ${fmt(PAIRS[S.pi][1])}.`:'All 4 pairs decided.';
 if(m==='line')s=S.li<LINEUP.length?`${fmt(LINEUP[S.li][0])} on top. ${fmt(LINEUP[S.li][1])} below, its first digit under the ${NAMES[S.shift]}.`:'Both pairs lined up.';
 if(m==='order')s=`Placed in order: ${S.row.map(fmt).join(' < ')||'none yet'}. Left: ${SET.filter(v=>!S.row.includes(v)).map(fmt).join(', ')||'none'}.`;
 if(m==='build')s=`Cards 3, 0, 7, 5. Slots: ${S.slots.join(' ')||'empty'}. Made: ${S.made.map(fmt).join(' and ')||'none yet'}.`;
 if(m==='gap')s=`4,□52 > 4,751. Digits that work: ${S.found.join(', ')||'none yet'}. Digits that fail: ${S.no.join(', ')||'none yet'}.`;
 speak((S.msg?S.msg+' ':'')+s);buttons();S.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='pairs'&&S.pi<PAIRS.length){b('<',()=>pickSign('<'),'Less than');b('=',()=>pickSign('='),'Equal to');b('>',()=>pickSign('>'),'Greater than')}
 if(m==='line'&&S.li<LINEUP.length){b('← Slide left',()=>slide(S.shift-1));b('Slide right →',()=>slide(S.shift+1))}
 if(m==='order')SET.filter(v=>!S.row.includes(v)).forEach(v=>b(fmt(v),()=>pickNum(v),'Next smallest: '+fmt(v)));
 if(m==='build'&&S.made.length<2){DIGS.filter(d=>!S.slots.includes(d)).forEach(d=>b('Card '+d,()=>putDigit(d)));if(S.slots.length)b('Clear',()=>{S.slots=[];refresh()})}
 if(m==='gap')[0,1,2,3,4,5,6,7,8,9].forEach(d=>b('Try '+d,()=>tryGap(d),'Try missing digit '+d));
 A.redraw()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const playback=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const fresh=()=>{S.run=(S.run||0)+1;Object.assign(S,{after:()=>{},pi:0,lit:-1,tried:null,li:0,shift:0,drag:null,row:[],slots:[],made:[],found:[],no:[],trial:null,msg:'',bad:false})};
const steps=[
{h:'Which is bigger?',p:'Put the numbers in place value columns. Start at the thousands and move right until two digits differ.',
predict:{q:'Which is bigger: 1,999 or 2,001?',opts:['2,001','1,999, it has more 9s','They are about equal'],ans:0},
task:'Decide all 4 pairs',show:()=>{steps[0].go();playback(PAIRS.map(([a,b])=>()=>pickSign(sign(a,b))),420)},go:()=>{fresh();refresh();S.after=check(0,()=>S.pi>=PAIRS.length,'Biggest place first.')}},
{h:'Line up the ones',p:'Before you compare, the ones must sit under the ones. A shorter number has empty places on the left.',
task:'Line up both pairs',show:()=>{steps[1].go();playback([()=>slide(1),()=>{},()=>{},()=>slide(1)],450)},go:()=>{fresh();refresh();S.after=check(1,()=>S.li>=LINEUP.length,'Ones under ones.')}},
{h:'Put them in order',p:'Find the smallest, then the next smallest. Compare place by place each time.',
task:'Order all 4 numbers',show:()=>{steps[2].go();playback(UP.map(v=>()=>pickNum(v)),380)},go:()=>{fresh();refresh();S.after=check(2,()=>S.row.length===4,'Smallest to largest.')}},
{h:'Biggest and smallest',p:'You have four digit cards: 3, 0, 7 and 5. Each place you fill decides more than every place after it.',
predict:{q:'What is the smallest 4-digit number you can make with 3, 0, 7 and 5?',opts:['3,057','0,357','3,075'],ans:0},
task:'Make the biggest, then the smallest',show:()=>{steps[3].go();playback([7,5,3,0,3,0,5,7].map(d=>()=>putDigit(d)),260)},go:()=>{fresh();refresh();S.after=check(3,()=>S.made.length===2,'7,530 and 3,057.')}},
{h:'The missing digit',p:'4,□52 > 4,751. The thousands match, so the hundreds decide, unless they tie too.',
predict:{q:'Can the missing digit be 7?',opts:['Yes','No, it must be more than 7','Only if the ones match too'],ans:0},
task:'Find every digit that works',show:()=>{steps[4].go();playback(OK_GAP.map(d=>()=>tryGap(d)),400)},go:()=>{fresh();refresh();S.after=check(4,()=>OK_GAP.every(d=>S.found.includes(d)),'7, 8 and 9.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
const QS=[['Which sign makes 5,067 □ 5,607 true?','<',[['>','onesFirst'],['=','sameDigits']]],
['Which number is the largest?','6,102',[['5,999','moreNines'],['998','lengthBlind']]],
['Which list is in order, smallest first?','2,089, 2,098, 2,809',[['2,809, 2,098, 2,089','backwards'],['2,098, 2,089, 2,809','onesFirst']]],
['What is the smallest 4-digit number you can make with 0, 4, 1 and 9?','1,049',[['0,149','leadZero'],['1,094','tensOnes']]],
['4,6□0 < 4,630. Which digit could go in the box?','2',[['3','tie'],['5','biggerHere']]],
['Is 987 bigger or smaller than 1,203?','Smaller: it has 0 thousands',[['Bigger: 9 beats 1','leftAlign'],['Bigger: its digits add up to more','addDigits']]]];
function why(tag){let m='Line the numbers up in place value columns and compare from the thousands down.';
 if(tag==='onesFirst')m='Start on the left, not the right. 5,067 and 5,607: thousands tie, then hundreds 0 < 6, so 5,067 < 5,607.';
 if(tag==='sameDigits')m='The same digits in different places make different numbers. 0 hundreds is less than 6 hundreds.';
 if(tag==='moreNines')m='Lots of 9s do not win. 5 thousands < 6 thousands, so 5,999 < 6,102.';
 if(tag==='lengthBlind')m='998 has only 3 digits, so it has 0 thousands. Any 4-digit number is bigger.';
 if(tag==='backwards')m='That list goes largest first. Smallest first starts with 2,089.';
 if(tag==='leadZero')m='A number cannot start with 0: 0,149 is just 149. Lead with 1, then 0: 1,049.';
 if(tag==='tensOnes')m='1,094 is bigger than 1,049. After 1 and 0, put the smaller digit, 4, in the tens.';
 if(tag==='tie')m='4,630 < 4,630 is false: they are equal. The box needs a digit less than 3.';
 if(tag==='biggerHere')m='4,650 is more than 4,630. Tens 5 > 3, so the sign would be >.';
 if(tag==='leftAlign')m='Line up the ones first. 987 has no thousands digit, so 9 is in the hundreds, not the thousands.';
 if(tag==='addDigits')m='Adding the digits does not compare numbers. Compare 0 thousands with 1 thousand.';
 return m}
function ask(){qi++;const [qq,ans,bad]=QS[qi%QS.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});speak('Challenge: '+qq);A.redraw()}
function mark(tag,ans){box.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=box.querySelector('.fl-fb');
 if(ok){wins++;A.win()}else{wins=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+wins+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Comparing numbers lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
