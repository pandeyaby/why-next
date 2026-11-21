/* Flagship – Roman numerals to 1000 (ages 9–10; NC 2013 Year 5 "read Roman numerals to 1000 (M) and recognise years
   written in Roman numerals"). Scenes: make hundreds from C, D and M tiles (CD 400, CM 900); split a numeral into
   place-value chunks by tapping the gaps; dial a year column by column; pick the bigger of two numerals when the longer
   one is smaller; check a robot reading film credits. Data in learn/romanm_art.js. Distinct from flagroman (to 100,
   I to C): this lab adds D and M, reads long numerals by chunking and writes years one place at a time. */
(()=>{const R=RMK;
VIS.reg('flagromanm',c=>{let A,keys,qa,ask=-1,gen=0;const Z={};
const T={ink:'#0f172a',ok:'#15803d',no:'#be123c',line:'#64748b',stone:'#f1f5f9',slab:'#e2e8f0',gold:'#fef3c7',goldRim:'#b45309',sel:'#4338ca'};
const FF='px Georgia,"Times New Roman",serif',SS='px system-ui,sans-serif';
const view=()=>['hund','split','year','cmp','robot','quiz'][A.step];
const k=n=>A.narrow?n:Math.round(n*1.15);
const isIn=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function ground(){const g=A.ctx;g.fillStyle=T.stone;g.fillRect(0,0,A.W,A.H);g.fillStyle=T.slab;g.fillRect(0,A.H*.9,A.W,A.H*.1)}
/* a plaque: white rounded label with dark text, shrunk to fit */
function plaque(t,x,y,o){o=o||{};const g=A.ctx;let n=k(o.n||14);g.font=`800 ${n}${SS}`;while(g.measureText(t).width+24>A.W-8&&n>10){n--;g.font=`800 ${n}${SS}`}
 const w=g.measureText(t).width+24,h=n+16,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,9);g.fill();
 g.lineWidth=o.ok||o.no?3:1.4;g.strokeStyle=o.ok?T.ok:o.no?T.no:T.line;g.stroke();g.fillStyle=T.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
/* a carved box: tap target with optional serif text */
function slabBox(b,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#ffe4e6':o.ok?'#dcfce7':o.gold?T.gold:'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();
 g.lineWidth=o.no||o.ok||o.sel?3.2:1.4;g.strokeStyle=o.no?T.no:o.ok?T.ok:o.sel?T.sel:o.gold?T.goldRim:T.line;g.stroke();if(t==null||t==='')return;
 let n=k(o.n||22);const font=o.sans?SS:FF;g.font=`700 ${n}${font}`;while(g.measureText(t).width>b.w-10&&n>9){n--;g.font=`700 ${n}${font}`}
 g.fillStyle=T.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(t,b.x+b.w/2,b.y+b.h/2+1)}
function txt(t,x,y,n,al){const g=A.ctx;g.font=`700 ${k(n)}${SS}`;g.fillStyle=T.ink;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(t,x,y)}
/* ---- 1. hundreds from C, D and M ---- */
const tileKeys=()=>{const w=Math.min(96,(A.W-40)/3),h=Math.min(A.H*.17,78),x0=(A.W-(w*3+20))/2;return['C','D','M'].map((s,i)=>({i,s,x:x0+i*(w+10),y:A.H*.68,w,h}))};
const trayBox=()=>({x:12,y:A.H*.3,w:A.W-24,h:A.H*.2});
function drawHund(){const s=Z.hund;ground();if(s.i>=R.HUND.length){plaque('All 6 hundreds made',A.W/2,A.H*.16,{ok:1});plaque('C 100 · D 500 · M 1000 · CD 400 · CM 900',A.W/2,A.H*.36,{n:13});return}
 const n=R.HUND[s.i],v=R.value(s.row);plaque(`${s.i+1} of ${R.HUND.length}: make ${n}`,A.W/2,A.H*.08,{n:16});
 slabBox(trayBox(),s.row||'',{n:30,no:s.bad});if(!s.row)txt('Tap tiles to fill the tray',A.W/2,A.H*.4,12);
 plaque(s.row?`${s.row} = ${v}`:'empty',A.W/2,A.H*.58,{n:14,no:s.bad});
 tileKeys().forEach(b=>{slabBox(b,b.s,{gold:1,n:30});txt(String(R.VAL[b.s]),b.x+b.w/2,b.y+b.h+k(11),11)})}
function hundAdd(sym){const s=Z.hund;if(s.i>=R.HUND.length)return;if(s.row.length>=6)return say('The tray is full. Tap it to take the last tile off.');
 s.row+=sym;A.sound.tick();const n=R.HUND[s.i],v=R.value(s.row),want=R.roman(n);
 if(/CCCC/.test(s.row)){s.bad=1;A.sound.miss();return say(`Never four Cs in a row. Take away from the next symbol: ${want} is ${n}. Tap the tray to undo.`)}
 if(/DD|DM/.test(s.row)){s.bad=1;A.sound.miss();return say(`D is never doubled and never goes before M. Tap the tray to undo.`)}
 if(v>n){s.bad=1;A.sound.miss();return say(`${s.row} is ${v}, more than ${n}. Tap the tray to take the last tile off.`)}
 s.bad=0;if(v===n&&s.row===want){s.i++;s.row='';A.sound.pop();return say(`Yes: ${want} = ${n}.`+(s.i<R.HUND.length?' Next number.':''))}
 say(`${s.row} = ${v}. Keep going to ${n}.`)}
function hundUndo(){const s=Z.hund;if(!s.row)return say('The tray is empty.');s.row=s.row.slice(0,-1);s.bad=0;A.sound.tick();say(s.row?`${s.row} = ${R.value(s.row)}.`:'The tray is empty.')}
/* ---- 2. split into chunks ---- */
function splitGeo(){const s=Z.split,str=R.roman(R.SPLIT[s.i]||1),n=str.length,w=Math.min(52,(A.W-24)/n),x0=(A.W-w*n)/2;return{str,n,w,x0,y:A.H*.3,h:Math.min(A.H*.2,w*1.5)}}
const cuts=n=>{let at=0;return R.chunks(n).slice(0,-1).map(c=>at+=c.r.length)};
function drawSplit(){const s=Z.split,g=A.ctx;ground();if(s.i>=R.SPLIT.length){plaque('All 4 numerals split',A.W/2,A.H*.16,{ok:1});plaque('M | CM | XC | IX = 1000 + 900 + 90 + 9',A.W/2,A.H*.36,{n:13});return}
 const G=splitGeo(),need=cuts(R.SPLIT[s.i]);plaque(`${s.i+1} of ${R.SPLIT.length}: tap the gaps between place-value chunks`,A.W/2,A.H*.08,{n:13});
 [...G.str].forEach((ch,j)=>slabBox({x:G.x0+j*G.w+2,y:G.y,w:G.w-4,h:G.h},ch,{gold:1,n:28}));
 s.cut.forEach(j=>{g.strokeStyle=T.sel;g.lineWidth=4;g.beginPath();g.moveTo(G.x0+j*G.w,G.y-10);g.lineTo(G.x0+j*G.w,G.y+G.h+10);g.stroke()});
 if(s.miss>0){g.strokeStyle=T.no;g.lineWidth=3;g.setLineDash([5,4]);g.beginPath();g.moveTo(G.x0+s.miss*G.w,G.y-10);g.lineTo(G.x0+s.miss*G.w,G.y+G.h+10);g.stroke();g.setLineDash([])}
 const parts=R.chunks(R.SPLIT[s.i]);plaque(`${s.cut.length} of ${need.length} gaps found`,A.W/2,A.H*.62,{n:13});
 if(s.cut.length)plaque(parts.slice(0,s.cut.length).map(p=>`${p.r} = ${p.v}`).join('   '),A.W/2,A.H*.76,{n:13})}
function splitTap(j){const s=Z.split;if(s.i>=R.SPLIT.length)return;const n=R.SPLIT[s.i],need=cuts(n),str=R.roman(n);if(s.cut.includes(j))return;
 if(!need.includes(j)){s.miss=j;A.sound.miss();const a=str[j-1],b=str[j];return say(R.VAL[a]<R.VAL[b]?`${a}${b} belong together: ${a} before ${b} takes away, so ${a}${b} is ${R.value(a+b)}. Do not split them.`:`${a} and ${b} are in the same place-value chunk. Split where the thousands, hundreds, tens or ones change.`)}
 s.miss=-1;s.cut.push(j);s.cut.sort((x,y)=>x-y);A.sound.tick();
 if(s.cut.length<need.length)return say(`Good cut. ${need.length-s.cut.length} more to find.`);
 const parts=R.chunks(n),sum=parts.map(p=>p.v).join(' + ');s.i++;s.cut=[];A.sound.pop();say(`${parts.map(p=>p.r).join(' | ')} = ${sum} = ${n}.`+(s.i<R.SPLIT.length?' Next numeral.':''))}
function splitHit(p){const G=splitGeo();if(p.y<G.y-24||p.y>G.y+G.h+24)return -1;const j=Math.round((p.x-G.x0)/G.w);return j>0&&j<G.n?j:-1}
/* ---- 3. dial a year ---- */
const dials=()=>{const gap=8,w=(A.W-24-gap*3)/4;return R.COLS.map((col,i)=>({i,col,x:12+i*(w+gap),y:A.H*.22,w,h:A.H*.42}))};
function yearNow(){return R.COLS.reduce((t,col,i)=>t+Z.year.d[i]*col.p,0)}
function drawYear(){const s=Z.year,g=A.ctx;ground();if(s.i>=R.YEARS.length){plaque('All 4 years written',A.W/2,A.H*.16,{ok:1});plaque('MMXXIV · MLXVI · MCMXCIX · MCDLXXXV',A.W/2,A.H*.36,{n:13});return}
 const y=R.YEARS[s.i],now=yearNow();plaque(`${s.i+1} of ${R.YEARS.length}: write the year ${y}`,A.W/2,A.H*.08,{n:16});
 dials().forEach(b=>{const d=s.d[b.i],ok=d===Math.floor(y/b.col.p)%10;slabBox(b,null,{ok});txt(b.col.name,b.x+b.w/2,b.y+k(13),11);
  txt('▲',b.x+b.w/2,b.y+b.h*.24,18);txt('▼',b.x+b.w/2,b.y+b.h*.86,18);const r=R.roman(d*b.col.p)||'–';g.font=`700 ${k(Math.min(26,b.w/Math.max(2,r.length)*1.5))}${FF}`;g.fillStyle=T.ink;g.textAlign='center';g.fillText(r,b.x+b.w/2,b.y+b.h*.55);txt(String(d*b.col.p),b.x+b.w/2,b.y+b.h*.7,11)});
 plaque(`${R.roman(now)||'–'} = ${now}`,A.W/2,A.H*.74,{n:18,ok:now===y})}
function dialTurn(i,up){const s=Z.year;if(s.i>=R.YEARS.length)return;const col=R.COLS[i],m=col.max+1;s.d[i]=(s.d[i]+(up?1:m-1))%m;A.sound.tick();
 const y=R.YEARS[s.i],now=yearNow();if(now===y){const r=R.roman(y);s.i++;s.d=[0,0,0,0];A.sound.pop();return say(`Yes: ${y} is ${r}, written one place at a time: ${R.chunks(y).map(c=>c.r).join(', ')}.`+(s.i<R.YEARS.length?' Next year.':''))}
 say(`${col.name}: ${R.roman(s.d[i]*col.p)||'nothing'} (${s.d[i]*col.p}). So far ${R.roman(now)||'nothing'} = ${now}.`)}
/* ---- 4. which is bigger ---- */
const pairBoxes=()=>{const w=A.W-24,h=Math.min(A.H*.2,90);return[0,1].map(i=>({i,x:12,y:A.H*(.22+i*.28),w,h}))};
function drawCmp(){const s=Z.cmp;ground();if(s.i>=R.PAIRS.length){plaque('All 4 pairs compared',A.W/2,A.H*.16,{ok:1});plaque('DCCCLXXXVIII is 888, M is 1000',A.W/2,A.H*.36,{n:13});return}
 const P=R.PAIRS[s.i];plaque(`${s.i+1} of ${R.PAIRS.length}: tap the bigger number`,A.W/2,A.H*.08,{n:15});
 pairBoxes().forEach(b=>slabBox(b,P[b.i],{gold:1,n:30,no:s.miss===b.i}));if(s.miss>=0)plaque(`${P[0]} = ${R.value(P[0])}   ${P[1]} = ${R.value(P[1])}`,A.W/2,A.H*.84,{n:13})}
function cmpTap(j){const s=Z.cmp;if(s.i>=R.PAIRS.length)return;const P=R.PAIRS[s.i],v=P.map(R.value),big=v[0]>v[1]?0:1;
 if(j!==big){s.miss=j;A.sound.miss();return say(P[j].length>P[big].length?`${P[j]} is longer, but it is ${v[j]}. ${P[big]} is ${v[big]}. Count value, not letters.`:`${P[j]} is ${v[j]} and ${P[big]} is ${v[big]}. Split each into chunks and compare the thousands first.`)}
 s.miss=-1;s.i++;A.sound.pop();say(`Yes: ${P[big]} = ${v[big]} is bigger than ${P[1-big]} = ${v[1-big]}.`+(s.i<R.PAIRS.length?' Next pair.':''))}
/* ---- 5. robot ---- */
const yesNo=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(i=>({i,x:A.W/2+(i?6:-w-6),y:A.H*.7,w,h:Math.min(A.H*.17,62)}))};
function drawRobot(){const s=Z.robot,g=A.ctx;ground();if(s.i>=R.ROBOT.length){plaque('All 6 credits checked',A.W/2,A.H*.16,{ok:1});plaque('Only IV, IX, XL, XC, CD and CM take away',A.W/2,A.H*.36,{n:13});return}
 const B=R.ROBOT[s.i],x=A.W/2,y=A.H*.17,u=Math.min(A.W*.06,24);g.fillStyle='#cbd5e1';A.paint.rrect(x-u,y-u,u*2,u*2,6);g.fill();g.strokeStyle=T.ink;g.lineWidth=2;g.stroke();
 g.fillStyle=T.ink;g.beginPath();g.arc(x-u*.4,y-u*.2,u*.15,0,7);g.arc(x+u*.4,y-u*.2,u*.15,0,7);g.fill();g.fillRect(x-u*.5,y+u*.4,u,3);
 plaque(`“${B.s}”`,A.W/2,A.H*.42,{n:17});plaque(`${s.i+1} of ${R.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.56,{n:12});
 yesNo().forEach(b=>slabBox(b,b.i?'✗ Slip':'✓ Right',{no:s.miss===b.i,sans:1,n:17}))}
function robotTap(j){const s=Z.robot;if(s.i>=R.ROBOT.length)return;const B=R.ROBOT[s.i];
 if((j===0)!==B.ok){s.miss=j;A.sound.miss();return say(B.ok?`Check again: it is right. ${B.fix}`:`Look at the pairs. ${B.fix}`)}
 s.miss=-1;s.i++;A.sound.pop();say((B.ok?'Yes, right. ':'Yes, a slip. ')+B.fix)}
function draw(){const v=view();if(v==='quiz'){ground();plaque('Challenge',A.W/2,A.H*.22,{ok:1});plaque('Roman numerals to M',A.W/2,A.H*.48,{n:13});return}
 ({hund:drawHund,split:drawSplit,year:drawYear,cmp:drawCmp,robot:drawRobot})[v]();A.fx.draw(A.ctx)}
/* canvas taps go to the scene on show */
function press(p){const v=view();
 if(v==='hund'){const b=tileKeys().find(q=>isIn(p,q));if(b)hundAdd(b.s);else if(isIn(p,trayBox()))hundUndo()}
 if(v==='split'){const j=splitHit(p);if(j>0)splitTap(j)}
 if(v==='year'){const b=dials().find(q=>isIn(p,q));if(b)dialTurn(b.i,p.y<b.y+b.h/2)}
 if(v==='cmp'){const b=pairBoxes().find(q=>isIn(p,q));if(b)cmpTap(b.i)}
 if(v==='robot'){const b=yesNo().find(q=>isIn(p,q));if(b)robotTap(b.i)}
 return false}
function wipe(){gen++;for(const x in Z)delete Z[x];Object.assign(Z,{hund:{i:0,row:'',bad:0},split:{i:0,cut:[],miss:-1},year:{i:0,d:[0,0,0,0]},cmp:{i:0,miss:-1},robot:{i:0,miss:-1},then:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();Z.then()}
/* button twins for every canvas action */
function pads(){if(!keys)return;keys.innerHTML='';const v=view(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(v==='hund'&&Z.hund.i<R.HUND.length){['C','D','M'].forEach(s=>btn(s,()=>hundAdd(s),`Add ${s}, ${R.VAL[s]}`));btn('Undo',hundUndo,'Take the last tile off')}
 if(v==='split'&&Z.split.i<R.SPLIT.length){const str=R.roman(R.SPLIT[Z.split.i]);for(let j=1;j<str.length;j++)if(!Z.split.cut.includes(j))btn(`${str[j-1]}|${str[j]}`,()=>splitTap(j),`Cut between letter ${j} ${str[j-1]} and letter ${j+1} ${str[j]}`)}
 if(v==='year'&&Z.year.i<R.YEARS.length)R.COLS.forEach((col,i)=>{btn(`${col.name} ▲`,()=>dialTurn(i,true),`${col.name} up`);btn(`${col.name} ▼`,()=>dialTurn(i,false),`${col.name} down`)});
 if(v==='cmp'&&Z.cmp.i<R.PAIRS.length)R.PAIRS[Z.cmp.i].forEach((s,j)=>btn(s,()=>cmpTap(j),`${s} is bigger`));
 if(v==='robot'&&Z.robot.i<R.ROBOT.length){btn('✓ Right',()=>robotTap(0),'The robot is right');btn('✗ Slip',()=>robotTap(1),'The robot made a slip')}}
const settle=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,ok){wipe();say(R.DESC[i]);Z.then=settle(i,ok,R.DONE[i])}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
/* shortest dial turns from 0 to each digit of a year */
const dialMoves=y=>R.COLS.flatMap((col,i)=>{const d=Math.floor(y/col.p)%10,m=col.max+1,up=d<=m-d;return[...Array(up?d:m-d)].map(()=>()=>dialTurn(i,up))});
const steps=[
{h:'C, D and M',p:'C is 100, D is 500 and M is 1000. Put C before D or M to take 100 away. Make each number with the fewest tiles.',
 predict:{q:'How is 400 written?',opts:['CCCC','CD'],ans:1},task:'Make all 6 numbers',
 show:()=>demo(0,R.HUND.flatMap(n=>[...R.roman(n)].map(s=>()=>hundAdd(s))),260),go:()=>open(0,()=>Z.hund.i>=R.HUND.length)},
{h:'Split it up',p:'Long numerals are easier in chunks: thousands, hundreds, tens, ones. A take-away pair stays in one chunk.',task:'Split all 4 numerals',
 show:()=>demo(1,R.SPLIT.flatMap(n=>cuts(n).map(j=>()=>splitTap(j))),420),go:()=>open(1,()=>Z.split.i>=R.SPLIT.length)},
{h:'Write the year',p:'Films and buildings show years in Roman numerals. Set each column, from thousands to ones.',
 predict:{q:'Which is 1999?',opts:['MIM','MCMXCIX'],ans:1},task:'Write all 4 years',
 show:()=>demo(2,R.YEARS.flatMap(dialMoves),110),go:()=>open(2,()=>Z.year.i>=R.YEARS.length)},
{h:'Longer is not bigger',p:'Tap the bigger number in each pair. Work out each value before you choose.',
 predict:{q:'Which is bigger: DCCCLXXXVIII or M?',opts:['DCCCLXXXVIII, it is longer','M'],ans:1},task:'Compare all 4 pairs',
 show:()=>demo(3,R.PAIRS.map(P=>()=>cmpTap(R.value(P[0])>R.value(P[1])?0:1)),450),go:()=>open(3,()=>Z.cmp.i>=R.PAIRS.length)},
{h:'Check the credits',p:'A robot reads numerals from film credits and buildings. Is each one right, or a slip?',task:'Check all 6',
 show:()=>demo(4,R.ROBOT.map(B=>()=>robotTap(B.ok?0:1)),450),go:()=>open(4,()=>Z.robot.i>=R.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>Z.then()});
function slipMsg(t){let m='Split into thousands, hundreds, tens and ones, then add the chunks.';
 if(t==='add')m='Not every symbol is added. A smaller symbol before a bigger one is taken away: CM is 900, XC is 90, IV is 4.';
 if(t==='chunk')m='C before M takes away: CM is 900, not 1100. So MCM is 1900.';
 if(t==='four')m='Never four of the same symbol in a row. 400 is CD and 900 is CM.';
 if(t==='flip')m='Order matters: C after D adds (DC is 600); C before D takes away (CD is 400).';
 if(t==='pair')m='Only IV, IX, XL, XC, CD and CM take away. X cannot go before M, so 990 is CM and XC.';
 if(t==='long')m='Length is not value. DCCCLXXXVIII is 888, but M on its own is 1000.';
 if(t==='same')m='They are not equal: 888 is less than 1000.';
 if(t==='digit')m='Roman letters are not place-value digits. MM is 2000, XX is 20, IV is 4: 2000 + 20 + 4.';
 if(t==='sym')m='D is 500. L is 50 and M is 1000.';
 return m}
function quiz(){ask++;const Q=R.QS[ask%R.QS.length],all=[[Q.a,'ok'],...Q.o],r=ask%3,ord=all.slice(r).concat(all.slice(0,r));
 qa.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=qa.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),good=t==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`✓ Yes: ${a}.`:'✗ '+slipMsg(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz;c.say(good?'Yes.':slipMsg(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:x=>{qa.hidden=x.step!==5;keys.hidden=x.step===5;pads()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Roman numerals to 1000 lab buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down:press});pads()}}).start()})})();
