/* Flagship: Roman numerals to 100 (ages 8–9). Build numbers from I, V, X, L and C tiles: add from the biggest down, take
   away with the four pairs IV, IX, XL and XC, read numerals by splitting them into tens and ones, judge children's
   numerals, then a challenge. Tiles go in by drag or tap; every action has a button too. */
(()=>{
const {SYM,ADD,SUB,TWO,READ,KIDS,QZ,WHY}=ROMANART;
const C={ink:'#111827',mute:'#374151',card:'#fffdf8',edge:'#1f2937',good:'#166534',goodBg:'#dcfce7',bad:'#9f1239',note:'#fff7ed',slot:'#f3f4f6'};
const VAL={I:1,V:5,X:10,L:50,C:100};
const value=s=>{let t=0;for(let i=0;i<s.length;i++){const v=VAL[s[i]],nx=VAL[s[i+1]]||0;t+=v<nx?-v:v}return t};
function roman(n){const T=[[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let o='';for(const [v,r] of T)while(n>=v){o+=r;n-=v}return o}
VIS.reg('flagroman',c=>{let A,X,pad,box,qn=-1,tick=0;const S={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const say=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function txt(t,x,y,n,col,w,al){X.font=`${w||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||C.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(t),x,y)}
function wrap(t,w,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let line='';String(t).split(' ').forEach(word=>{const tryL=line?line+' '+word:word;if(line&&X.measureText(tryL).width>w){out.push(line);line=word}else line=tryL});out.push(line);return out}
function box2(x,y,w,h,f,s,lw){A.paint.rrect(x,y,w,h,10);X.fillStyle=f;X.fill();if(s){X.lineWidth=lw||2;X.strokeStyle=s;X.stroke()}}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function header(t,won){const R=wrap(t,A.W-44,14),lh=z(14)+4,h=Math.max(z(36),R.length*lh+14);box2(12,10,A.W-24,h,won?C.goodBg:C.note,won?C.good:C.edge,2);R.forEach((r,i)=>txt(r,A.W/2,10+h/2+(i-(R.length-1)/2)*lh,14,won?C.good:C.ink));return 10+h}
function footer(){if(!S.msg)return;const R=wrap((S.bad?'✗ ':'✓ ')+S.msg,A.W-48,13),lh=z(13)+5,h=R.length*lh+12,y=A.H-h-10;box2(12,y,A.W-24,h,'#ffffff',S.bad?C.bad:C.good,3);R.forEach((r,i)=>txt(r,A.W/2,y+6+lh*(i+.5),13,S.bad?C.bad:C.ink))}
const oops=m=>{S.bad=true;S.msg=m;A.sound.miss();sync()};
const yes=m=>{S.bad=false;S.msg=m;A.sound.pop()};
const mode=()=>['add','sub','read','two','kids','quiz'][A.step];
const goals=()=>({add:ADD,sub:SUB,two:TWO})[mode()]||[];
/* why a numeral with the right value is still not how we write it */
function slip(s,n){if(/IIII|XXXX|CCCC/.test(s))return `Only three of the same symbol go in a row. Write ${n} as ${roman(n)}.`;
 if(/VV|LL/.test(s))return `V and L are never doubled: VV is X and LL is C. Write ${n} as ${roman(n)}.`;
 for(let i=0;i+1<s.length;i++){const a=s[i],b=s[i+1];if(VAL[a]<VAL[b]&&!['IV','IX','XL','XC'].includes(a+b))return `${a} cannot go before ${b}. Only I goes before V or X, and only X before L or C. Write ${n} as ${roman(n)}.`}
 return `That adds to ${n}, but write the biggest symbols first: ${roman(n)}.`}
/* builder: tiles in the tray, the number they make, a target card */
function drawBuild(t0,b0){const n=goals()[S.k],s=S.row;if(S.won||n==null){goals().forEach((g,i)=>{const y=t0+z(36)+i*z(60);box2(z(30),y-z(24),A.W-z(60),z(48),C.goodBg,C.good,2);txt(`${roman(g)} = ${g}`,A.W/2,y,22,C.ink,900)});return}
 txt(`Make ${n}`,A.W/2,t0+z(22),22,C.ink,900);
 const tw=Math.min(z(46),(A.W-z(40))/Math.max(6,s.length+1)),th=z(52),rw=Math.max(tw*Math.max(s.length,4),z(180)),rx=A.W/2-rw/2-z(8),ry=t0+z(46);
 S.tray={x:rx,y:ry,w:rw+z(16),h:th+z(14)};box2(rx,ry,rw+z(16),th+z(14),C.slot,S.drag?'#1d4ed8':C.edge,S.drag?3:2);
 if(!s.length)txt('Drop tiles here',A.W/2,ry+(th+z(14))/2,13,C.mute,700);
 const x0=A.W/2-tw*s.length/2;s.split('').forEach((ch,i)=>{const col=SYM.find(q=>q[0]===ch)[2];box2(x0+i*tw+2,ry+z(7),tw-4,th,col,C.edge,1.5);txt(ch,x0+i*tw+tw/2,ry+z(7)+th/2,24,C.ink,900)});
 const v=value(s);txt(s.length?`${s} = ${v}`:'= 0',A.W/2,ry+th+z(32),17,v>n?C.bad:C.ink,800);
 if(s.length>1){/* show how it adds up, pair by pair */const parts=[];for(let i=0;i<s.length;i++){const a=VAL[s[i]],b=VAL[s[i+1]]||0;if(a<b){parts.push(`(${b}−${a})`);i++}else parts.push(a)}txt(parts.join(' + '),A.W/2,ry+th+z(54),13,C.mute,700)}
 const gw=Math.min(z(64),(A.W-z(36))/5-z(6)),gh=z(58),gy=b0-gh;S.pal=SYM.map((q,i)=>{const r={x:A.W/2-(5*(gw+z(6)))/2+i*(gw+z(6)),y:gy,w:gw,h:gh,ch:q[0]};box2(r.x,r.y,gw,gh,q[2],C.edge,2);txt(q[0],r.x+gw/2,r.y+gh/2-z(7),24,C.ink,900);txt(q[1],r.x+gw/2,r.y+gh-z(10),11,C.mute,800);return r});
 if(S.drag){const d=S.drag;box2(d.x-tw/2,d.y-th/2,tw,th,SYM.find(q=>q[0]===d.ch)[2],'#1d4ed8',3);txt(d.ch,d.x,d.y,24,C.ink,900)}
 txt(`${Math.min(S.k+1,3)} of 3`,A.W-z(30),t0+z(22),12,C.mute,800)}
function place(ch){if(S.won)return;const n=goals()[S.k];S.row+=ch;A.sound.tick();const v=value(S.row);
 if(v===n){if(S.row===roman(n)){yes(`${S.row} is ${n}.`);S.k++;S.row='';if(S.k>=goals().length){S.won=true;S.msg=({add:'Add the symbols from the biggest down.',sub:'Small before big: take it away.',two:'Tens first, then ones.'})[mode()]}}
  else{const m=slip(S.row,n);S.row='';return oops(m)}}
 else if(v>n){const was=S.row;S.row='';return oops(`${was} is ${v}, more than ${n}. ${n%5===4?'Try a small symbol before a big one.':'Start with the biggest symbol that fits.'}`)}
 else S.msg='';sync()}
function undo(){S.row=S.row.slice(0,-1);S.msg='';sync()}
/* reading: a numeral and three numbers */
function drawRead(t0,b0){if(S.won){READ.forEach(([r,v],i)=>{const y=t0+z(36)+i*z(60);box2(z(30),y-z(24),A.W-z(60),z(48),C.goodBg,C.good,2);txt(`${r} = ${split(r).join(' + ')} = ${v}`,A.W/2,y,18,C.ink,900)});return}const [r]=READ[Math.min(S.k,2)];const parts=split(r);txt(r,A.W/2,t0+z(34),34,C.ink,900);
 if(S.seen)txt(parts.map(p=>`${p} = ${value(p)}`).join('   '),A.W/2,t0+z(70),14,C.good,800);else txt('Tap the numeral to split it',A.W/2,t0+z(70),12,C.mute,700);
 S.word={x:A.W/2-z(90),y:t0+z(10),w:z(180),h:z(50)};
 const opts=ordered(),h=Math.min(z(56),(b0-t0-z(100))/3-z(8));S.cards=opts.map((o,i)=>{const R={x:z(24),y:t0+z(92)+i*(h+z(8)),w:A.W-z(48),h,v:o};box2(R.x,R.y,R.w,h,'#ffffff',C.edge,2);txt(o,A.W/2,R.y+h/2,20,C.ink,900);return R})}
function split(s){const o=[];for(let i=0;i<s.length;i++){const a=s[i],b=s[i+1];if(b&&VAL[a]<VAL[b]){o.push(a+b);i++}else if(o.length&&VAL[o[o.length-1][0]]===VAL[a]&&o[o.length-1].length<4&&o[o.length-1].length===o[o.length-1].split('').filter(x=>x===a).length)o[o.length-1]+=a;else o.push(a)}return o}
function ordered(){const [,ok,bad]=READ[Math.min(S.k,2)],all=[ok,...bad.map(b=>b[0])],r=S.k%3;return all.slice(r).concat(all.slice(0,r))}
function pickRead(v){if(S.won)return;const [r,ok,bad]=READ[S.k];if(v!==ok){const tag=(bad.find(b=>b[0]===v)||[0,'add'])[1];return oops(`${r} is not ${v}. ${WHY[tag]}`)}
 yes(`${r} = ${split(r).join(' + ')} = ${ok}.`);S.k++;S.seen=false;if(S.k>=READ.length){S.won=true;S.msg='Split into tens and ones, then add.'}sync()}
/* children */
function drawKids(t0,b0){const [stem,kids]=KIDS[Math.min(S.k,2)];txt(stem,A.W/2,t0+z(20),18,C.ink,900);const h=Math.min(z(74),(b0-t0-z(44))/3-z(6));
 S.kid=kids.map((k,i)=>{const R={x:z(16),y:t0+z(40)+i*(h+z(6)),w:A.W-z(32),h,i};box2(R.x,R.y,R.w,h,'#ffffff',C.edge,2);X.fillStyle=['#bfdbfe','#fbcfe8','#bbf7d0'][i];X.beginPath();X.arc(R.x+z(26),R.y+h/2,z(15),0,7);X.fill();
  txt(k[0],R.x+z(26),R.y+h/2,11,C.ink,800);wrap(k[1],R.w-z(70),14).forEach((ln,j,T)=>txt(ln,R.x+z(52),R.y+h/2+(j-(T.length-1)/2)*z(18),14,C.ink,700,'left'));return R})}
function judge(i){if(S.won)return;const k=KIDS[S.k][1][i];if(k[2])return oops(`${k[0]} is not right. ${k[2]}`);yes(`${k[0]} is right.`);S.k++;if(S.k>=KIDS.length){S.won=true;S.msg='Three in a row at most, and only IV, IX, XL and XC take away.'}sync()}
function draw(){X.fillStyle=A.col.dark?'#1f2937':C.card;X.fillRect(0,0,A.W,A.H);X.fillStyle=C.card;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const m=mode(),H={add:['Drag or tap tiles to make the number.','All three made by adding.'],sub:['Some numbers need a small tile before a big one.','Small before big takes away.'],read:['What number is it?','All three read.'],two:['Make the tens, then the ones.','Tens first, then ones.'],kids:['Who is right? Tap them.','Numerals checked.'],quiz:['I 1, V 5, X 10, L 50, C 100.','']};
 const t=header(S.won?H[m][1]:H[m][0],S.won),bot=A.H-(S.msg?z(70):z(12));
 if(m==='add'||m==='sub'||m==='two')drawBuild(t,bot);if(m==='read')drawRead(t+z(4),bot);if(m==='kids')drawKids(t+z(4),bot);
 if(m==='quiz'){const w=(A.W-z(30))/5;SYM.forEach((q,i)=>{box2(z(15)+i*w+3,t+z(30),w-6,z(70),q[2],C.edge,2);txt(q[0],z(15)+i*w+w/2,t+z(55),26,C.ink,900);txt(q[1],z(15)+i*w+w/2,t+z(85),13,C.mute,800)})}
 footer();A.fx.draw(X)}
function down(p){const m=mode();if(S.won&&m!=='quiz')return false;
 if(S.pal&&(m==='add'||m==='sub'||m==='two')){const r=S.pal.find(b=>hit(p,b));if(r){S.drag={ch:r.ch,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}
 if(m==='read'){if(hit(p,S.word)){S.seen=true;sync();return true}const r=(S.cards||[]).find(b=>hit(p,b));if(r){pickRead(r.v);return true}}
 if(m==='kids'){const r=(S.kid||[]).find(b=>hit(p,b));if(r){judge(r.i);return true}}
 return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;S.drag=null;if(!d)return;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<z(12);if(tap||hit(p,S.tray))place(d.ch);else A.redraw()}
function sync(){const m=mode();let d='Challenge.';
 if(m==='add'||m==='sub'||m==='two'){const n=goals()[S.k];d=S.won?'All three made.':`Make ${n}. Tiles so far: ${S.row.split('').join(' ')||'none'}, worth ${value(S.row)}.`}
 if(m==='read')d=S.won?'All three read.':`Numeral ${READ[S.k][0]}. Choices: ${ordered().join(', ')}.`+(S.seen?` Split: ${split(READ[S.k][0]).join(' + ')}.`:'');
 if(m==='kids')d=S.won?'All three checked.':`${KIDS[S.k][0]} `+KIDS[S.k][1].map(x=>x[0]+' '+x[1]).join(' ');
 say((S.msg?S.msg+' ':'')+d);buttons();S.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,fn,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost'},pad,t);if(l)e.setAttribute('aria-label',l);e.onclick=()=>{fn();sync()}};
 if(!S.won){if(m==='add'||m==='sub'||m==='two'){SYM.forEach(q=>b('+ '+q[0],()=>place(q[0]),`Add ${q[0]}, worth ${q[1]}`));b('Undo',undo)}
  if(m==='read'){b('Split it',()=>{S.seen=true});ordered().forEach(v=>b(String(v),()=>pickRead(v)))}
  if(m==='kids')KIDS[S.k][1].forEach((x,i)=>b(x[0]+' is right',()=>judge(i)))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tick;fns.forEach((f,j)=>setTimeout(()=>{if(id===tick){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
const spell=list=>list.flatMap(n=>roman(n).split('').map(ch=>()=>place(ch)));
function reset(){tick++;Object.assign(S,{after:()=>{},won:false,msg:'',bad:false,drag:null,k:0,row:'',seen:false})}
const steps=[
{h:'Add them up',p:'Romans wrote numbers with letters. I is 1, V is 5, X is 10, L is 50 and C is 100. Put the biggest first and add.',
predict:{q:'What number is VI?',opts:['4','6','51'],ans:1},
task:'Make 7, 15 and 32',show:()=>{steps[0].go();play(spell(ADD),230)},go:()=>{reset();sync();S.after=ready(0,()=>S.won,'VII, XV and XXXII.')}},
{h:'Small before big',p:'You may not write the same symbol four times. So for 4 and 9, put a small I before a bigger symbol to take it away.',
predict:{q:'What number is IX?',opts:['11','9','10'],ans:1},
task:'Make 4, 9 and 40',show:()=>{steps[1].go();play(spell(SUB),300)},go:()=>{reset();sync();S.after=ready(1,()=>S.won,'IV, IX and XL.')}},
{h:'Read it',p:'To read a numeral, split it into parts. A small symbol before a big one is one part, and you take it away.',
predict:{q:'What number is XIV?',opts:['16','14','114'],ans:1},
task:'Read 3 numerals',show:()=>{steps[2].go();play(READ.map(r=>()=>pickRead(r[1])),450)},go:()=>{reset();sync();S.after=ready(2,()=>S.won,'14, 49 and 94.')}},
{h:'Tens, then ones',p:'Write the tens first, then the ones. 49 is 40 and 9, so it is XL and IX.',
predict:{q:'How do you write 49?',opts:['IL','XLIX','XXXXVIIII'],ans:1},
task:'Make 49, 64 and 99',show:()=>{steps[3].go();play(spell(TWO),230)},go:()=>{reset();sync();S.after=ready(3,()=>S.won,'XLIX, LXIV and XCIX.')}},
{h:'Check the numerals',p:'Three children write Roman numerals. Only one is right each time.',
task:'Find who is right 3 times',show:()=>{steps[4].go();play(KIDS.map(()=>()=>judge(KIDS[S.k][1].findIndex(x=>!x[2]))),450)},go:()=>{reset();sync();S.after=ready(4,()=>S.won,'Numerals checked.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
let streak=0;
function ask(){qn++;const [qq,ok,bad]=QZ[qn%QZ.length],all=[[ok,'ok']].concat(bad),r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>mark(tag,ok)});say('Challenge: '+qq);A.redraw()}
function mark(tag,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=tag==='ok';let m=WHY[tag]||'I 1, V 5, X 10, L 50, C 100.';
 if(tag==='four')m='Never four of the same symbol in a row. Use a pair that takes away: IV, IX, XL or XC.';
 if(tag==='pair')m='V is never taken away. Only I goes before V or X, and only X before L or C.';
 if(tag==='flip')m='The order changes the number. Small before big takes away; small after big adds.';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ok+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Roman numerals lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
