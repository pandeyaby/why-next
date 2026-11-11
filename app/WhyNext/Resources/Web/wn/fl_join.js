/* Flagship – joining letters (6–10): find where each letter finishes (on the line, at the top, or a break letter);
   drag a diagonal join from a letter ending on the line and a horizontal join from o, r, v, w to where the next letter
   starts (small-letter height or ascender height); mark which gaps in a word join and which stay open after break
   letters; spot letters written the wrong size against the four handwriting lines. */
(()=>{
const LOW='acdehiklmnstu',HIGH='orvw',BRK='bgjpqxyz',TALL='bdfhklt',DESC='gjpqy';
const END=['a','o','g','w'],DIAG=['in','al','ea'],HORI=['on','wh','ri'],WORDS=['jump','gap','boy'];
const ODDS=[['hat',1,'tall'],['dog',2,'short'],['lid',0,'small']];
const ex=ch=>LOW.includes(ch)?0:HIGH.includes(ch)?1:2; // 0 ends on the line, 1 ends at the top, 2 break letter
VIS.reg('flagjoin',c=>{let A,pad,quiz,qi=-1,run=0;
const B0=()=>({want:()=>{},won:0,r:0,jn:[],drag:null,bad:-1,ok:-1,said:''}),S=B0();
const mode=()=>['end','diag','hori','gaps','size','quiz'][A.step];
const R=()=>A.reduced(),speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
/* four handwriting lines from the real font metrics: ascender, x-height, baseline, descender */
function lines(px){const g=A.ctx;g.font=`500 ${px}px system-ui,sans-serif`;g.textBaseline='alphabetic';const m=k=>g.measureText(k);
 return{px,xh:m('x').actualBoundingBoxAscent,asc:m('l').actualBoundingBoxAscent,dsc:m('p').actualBoundingBoxDescent}}
function word(w,cx,base,px,gap){const g=A.ctx,L=lines(px);g.font=`500 ${px}px system-ui,sans-serif`;const ws=[...w].map(ch=>g.measureText(ch).width),tot=ws.reduce((a,b)=>a+b,0)+gap*(w.length-1);
 let x=cx-tot/2;return[...w].map((ch,i)=>{const o={ch,x,w:ws[i],base,L};x+=ws[i]+gap;return o})}
function ruled(g,x0,x1,base,L){const C=A.col;[[base-L.asc,'tall'],[base-L.xh,'small'],[base,'line'],[base+L.dsc,'tail']].forEach(([y,t],k)=>{g.strokeStyle=k===2?C.tx:A.alpha(C.mu,.8);g.lineWidth=k===2?2:1;g.setLineDash(k===2?[]:[6,5]);
 g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();g.setLineDash([]);g.font='600 12px system-ui,sans-serif';g.fillStyle=C.tx;g.textAlign='left';g.textBaseline='middle';g.fillText(t,4,y-7)})}
function glyph(g,o,col,sy,dy){g.save();g.font=`500 ${o.L.px}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='alphabetic';g.fillStyle=col||A.col.tx;
 g.translate(o.x,o.base+(dy||0));g.scale(1,sy||1);g.fillText(o.ch,0,0);g.restore()}
const exitPt=o=>({x:o.x+o.w-o.w*.08,y:ex(o.ch)?o.base-o.L.xh:o.base});
const entryY=(o,k)=>[o.base,o.base-o.L.xh,o.base-o.L.asc][k];
function join(g,a,b,ty,col){const p=exitPt(a),q={x:b.x+b.w*.12,y:ty};g.strokeStyle=col||A.col.vi;g.lineWidth=Math.max(3,a.L.px/18);g.lineCap='round';g.beginPath();g.moveTo(p.x,p.y);
 if(p.y>q.y+2)g.quadraticCurveTo(p.x+(q.x-p.x)*.7,p.y,q.x,q.y);else g.quadraticCurveTo((p.x+q.x)/2,Math.min(p.y,q.y)-a.L.xh*.15,q.x,q.y);g.stroke()}
const MID=()=>(52+A.W-8)/2,big=()=>Math.min(A.W*(A.narrow?.46:.26),A.H*.5);
function pairNow(){const v=mode(),set=v==='diag'?DIAG:HORI;return set[Math.min(S.r,2)]}
function targets(){const o=word(pairNow(),MID(),A.H*.68,big(),big()*.55)[1];return[0,1,2].map(k=>({x:o.x-big()*.1,y:entryY(o,k),k}))}
function endDots(o){return[{x:o.x+o.w+12,y:o.base,k:0},{x:o.x+o.w+12,y:o.base-o.L.xh,k:1},{x:o.x+o.w+12,y:o.base+o.L.dsc*.9,k:2}]}
function curWord(){const v=mode(),px=Math.min(A.W*(A.narrow?.24:.13),A.H*.3);if(v==='gaps')return word(WORDS[Math.min(S.r,2)],MID(),A.H*.6,px,px*.32);
 const[w]=ODDS[Math.min(S.r,2)];return word(w,MID(),A.H*.6,px,px*.3)}
function dot(g,p,col,r){g.fillStyle=col;g.beginPath();g.arc(p.x,p.y,r||12,0,7);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=2;g.stroke()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#f5f3ff',C.dark?.05:.5);g.fillRect(0,0,W,H);
 const head=t=>{g.font='800 16px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(t,W/2,22,W-20)};
 if(v==='quiz'){head('Line, top or break letter?');return}
 if(v==='end'){const ch=END[Math.min(S.r,3)],o=word(ch,MID()-12,H*.62,big(),0)[0];ruled(g,50,W-8,o.base,o.L);glyph(g,o);
  endDots(o).forEach(p=>dot(g,p,S.bad===p.k?C.rd:S.ok===p.k?C.gr:A.alpha(C.cy,.85),A.narrow?11:12));head(S.won>=4?'Done!':`Where does ${ch} finish?`)}
 if(v==='diag'||v==='hori'){const ws=word(pairNow(),MID(),H*.68,big(),big()*.55);ruled(g,50,W-8,ws[0].base,ws[0].L);ws.forEach(o=>glyph(g,o));
  if(S.ok>=0)join(g,ws[0],ws[1],entryY(ws[1],S.ok),C.gr);else{const p=exitPt(ws[0]);dot(g,p,C.am,9);if(S.drag){g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(S.drag.x,S.drag.y);g.stroke()}
   targets().forEach(t=>dot(g,t,S.bad===t.k?C.rd:A.alpha(C.cy,.85),A.narrow?10:11))}
  head(S.won>=3?'Done!':`Join ${pairNow()[0]} to ${pairNow()[1]}`)}
 if(v==='gaps'){const ws=curWord();ruled(g,50,W-8,ws[0].base,ws[0].L);ws.forEach(o=>glyph(g,o));
  ws.slice(0,-1).forEach((a,i)=>{const b=ws[i+1],mx=(a.x+a.w+b.x)/2;if(S.jn[i])join(g,a,b,entryY(b,TALL.includes(b.ch)?2:1),S.bad===i?C.rd:C.vi);
   g.fillStyle=S.bad===i?C.rd:C.tx;g.font='800 16px system-ui';g.textAlign='center';g.fillText(S.jn[i]?'✓':'✗',mx,a.base+a.L.dsc+22)});head(S.won>=3?'Done!':'Tap each gap: join or not?')}
 if(v==='size'){const ws=curWord(),[,wi,kind]=ODDS[Math.min(S.r,2)];ruled(g,50,W-8,ws[0].base,ws[0].L);
  ws.forEach((o,i)=>{const L=o.L;let sy=1,dy=0;if(i===wi&&S.won<=S.r){if(kind==='tall')sy=L.asc/L.xh;if(kind==='short')dy=-L.dsc;if(kind==='small')sy=L.xh/L.asc}glyph(g,o,S.bad===i?C.rd:null,sy,dy)});head(S.won>=3?'Done!':'Tap the letter that is the wrong size.')}
 A.fx.draw(g)}
const lastN=()=>({end:4,diag:3,hori:3,gaps:3,size:3}[mode()]||9);
const miss=(t,k)=>{A.sound.miss();S.bad=k;speak(t);setTimeout(()=>{S.bad=-1;A.redraw()},R()?10:900);A.redraw()};
function win(t){S.won++;A.sound.pop();speak(S.won<lastN()?t+' Next one.':t);setTimeout(()=>{if(S.won<lastN()&&S.won>S.r){S.r++;S.ok=-1;S.jn=[];A.redraw();buttons()}},R()?20:700);buttons();A.redraw();S.want()}
function pickEnd(k){if(mode()!=='end'||S.won>S.r||S.won>=4)return;const ch=END[Math.min(S.r,3)],e=ex(ch);
 if(k!==e){const m=e===2?`${ch} is a break letter. It ends with a tail or hook, so we do not join from it.`:e===1?`${ch} finishes at the top, at the height of small letters. Its join goes across.`:`${ch} finishes on the line with a little flick up.`;return miss(m,k)}
 S.ok=k;win(e===2?`Yes, ${ch} is a break letter.`:e?`Yes, ${ch} ends at the top.`:`Yes, ${ch} ends on the line.`)}
function pickJoin(k){const v=mode();if(!(v==='diag'||v==='hori')||S.won>S.r||S.won>=3)return;const[a,b]=pairNow(),want=TALL.includes(b)?2:1;
 if(k!==want){const m=k===0?(v==='hori'?`${a} ends at the top, so the join stays up there. No dip to the line.`:`A join does not run flat along the line. It climbs up to where ${b} starts.`):k===2?`${b} is a small letter. The join only goes up to the top of small letters.`:`${b} is tall. The join climbs right up to the top of its ascender.`;return miss(m,k)}
 S.ok=k;win(`${v==='diag'?'Diagonal':'Horizontal'} join: ${a} to ${b}, up to the ${k===2?'top of the tall letter':'top of small letters'}.`)}
function flip(i){if(mode()!=='gaps'||S.won>S.r||S.won>=3)return;S.jn[i]=!S.jn[i];A.sound.tick();const w=WORDS[Math.min(S.r,2)];speak(`${w[i]} and ${w[i+1]}: ${S.jn[i]?'joined':'gap'}.`);A.redraw()}
function checkGaps(){if(mode()!=='gaps'||S.won>S.r)return;const w=WORDS[Math.min(S.r,2)];
 for(let i=0;i<w.length-1;i++){const brk=ex(w[i])===2;if(brk&&S.jn[i])return miss(`${w[i]} is a break letter: leave a small gap after it.`,i);
  if(!brk&&!S.jn[i])return miss(`${w[i]} ends ${ex(w[i])?'at the top':'on the line'}, so join it to ${w[i+1]}. We can join to a break letter.`,i)}
 win(`Yes! In ${w}, only the gap after a break letter stays open.`)}
function pickSize(i){if(mode()!=='size'||S.won>S.r||S.won>=3)return;const[w,wi,kind]=ODDS[Math.min(S.r,2)],ch=w[i];
 if(i!==wi)return miss(`${ch} is the right size: ${TALL.includes(ch)?'a tall letter reaching the top line':DESC.includes(ch)?'its tail goes below the line':'a small letter between the line and the dashed line'}.`,i);
 win(kind==='tall'?`Yes! ${ch} is a small letter. It should stop at the dashed line.`:kind==='short'?`Yes! ${ch} needs its tail to go below the line.`:`Yes! ${ch} is tall. Its ascender should reach the top line.`)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;
 if(v==='end'){B('On the line',()=>pickEnd(0),'It finishes on the line');B('At the top',()=>pickEnd(1),'It finishes at the top of small letters');B('Break letter',()=>pickEnd(2),'It is a break letter')}
 if(v==='diag'||v==='hori'){B('To the line',()=>pickJoin(0),'Join along the line');B('Top of small letters',()=>pickJoin(1),'Join up to the top of small letters');B('Top of tall letters',()=>pickJoin(2),'Join up to the top of tall letters')}
 if(v==='gaps'){const w=WORDS[Math.min(S.r,2)];for(let i=0;i<w.length-1;i++)B(`${w[i]}–${w[i+1]}`,()=>flip(i),`Join or leave a gap between ${w[i]} and ${w[i+1]}`);B('Check ✓',checkGaps,'Check my joins')}
 if(v==='size'){const w=ODDS[Math.min(S.r,2)][0];[...w].forEach((ch,i)=>B(ch,()=>pickSize(i),`The letter ${ch} is the wrong size`))}}
const near=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<r,best=(p,L,r)=>{let b=null,d=r;L.forEach(t=>{const e=Math.hypot(p.x-t.x,p.y-t.y);if(e<d){d=e;b=t}});return b};
function down(p){const v=mode(),r=A.narrow?26:22;
 if(v==='end'){const o=word(END[Math.min(S.r,3)],MID()-12,A.H*.62,big(),0)[0],d=best(p,endDots(o),r);if(d)pickEnd(d.k);return false}
 if(v==='diag'||v==='hori'){const t=best(p,targets(),r);if(t){pickJoin(t.k);return false}const e=exitPt(word(pairNow(),MID(),A.H*.68,big(),big()*.55)[0]);if(near(p,e,r*1.4)){S.drag={x:p.x,y:p.y};return true}return false}
 if(v==='gaps'){const ws=curWord();ws.slice(0,-1).forEach((a,i)=>{const b=ws[i+1];if(p.x>a.x+a.w*.5&&p.x<b.x+b.w*.5)flip(i)});return false}
 if(v==='size'){curWord().forEach((o,i)=>{if(p.x>o.x-4&&p.x<o.x+o.w+4)pickSize(i)});return false}return false}
function move(p){if(S.drag){S.drag=p;A.redraw()}}
function up(p){if(!S.drag)return;S.drag=null;const t=best(p,targets(),A.narrow?30:24);if(t)pickJoin(t.k);else{speak('Drop the join on a dot.');A.redraw()}}
const chk=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*60+40:(j+1)*(gap||300)))}
const fresh=()=>{run++;Object.assign(S,B0())};
const steps=[
{h:'Where does it finish?',p:'Every letter finishes somewhere. Some end on the line with a flick. Some end at the top. Break letters end with a tail or hook. Tap the dot where the pen stops.',task:'Find the finish of 4 letters',
 show:()=>{steps[0].go();play(END.map(ch=>()=>pickEnd(ex(ch))),800)},go:()=>{fresh();speak('Where does a finish?');buttons();S.want=chk(0,()=>S.won>=4,'Where a letter finishes decides its join.')}},
{h:'The diagonal join',p:'From a letter that ends on the line, the join slants up to where the next letter starts. Drag from the orange dot to a blue dot, or tap a dot.',
 predict:{q:'To join i to n, which way does the pen go?',opts:['Flat along the line','Up on a slant','Lift the pen off'],ans:1},task:'Make 3 diagonal joins',
 show:()=>{steps[1].go();play(DIAG.map(w=>()=>pickJoin(TALL.includes(w[1])?2:1)),800)},go:()=>{fresh();speak('Join i to n.');buttons();S.want=chk(1,()=>S.won>=3,'Diagonal joins climb from the line.')}},
{h:'The horizontal join',p:'o, r, v and w end at the top. Their join runs across the top to the next letter.',
 predict:{q:'o ends at the top. To join o to n, the pen goes…',opts:['Down to the line, then up','Straight across the top'],ans:1},task:'Make 3 horizontal joins',
 show:()=>{steps[2].go();play(HORI.map(w=>()=>pickJoin(TALL.includes(w[1])?2:1)),800)},go:()=>{fresh();speak('Join o to n.');buttons();S.want=chk(2,()=>S.won>=3,'Horizontal joins stay high.')}},
{h:'Break letters',p:'We do not join from b, g, j, p, q, x, y or z. We still join to them. Tap each gap to join it or leave it open, then check.',
 predict:{q:'Should every letter in a word be joined?',opts:['Yes, all of them','No, not after break letters'],ans:1},task:'Mark the joins in 3 words',
 show:()=>{steps[3].go();const L=[];WORDS.forEach(w=>{[...w].slice(0,-1).forEach((ch,i)=>{if(ex(ch)!==2)L.push(()=>flip(i))});L.push(checkGaps,()=>{},()=>{},()=>{})});play(L,330)},
 go:()=>{fresh();speak('Tap each gap in jump.');buttons();S.want=chk(3,()=>S.won>=3,'Join after most letters. Leave a gap after break letters.')}},
{h:'Right size',p:'Small letters sit between the line and the dashed line. Tall letters reach the top line. Tails go below the line. Tap the letter that is the wrong size.',task:'Find 3 wrong sizes',
 show:()=>{steps[4].go();play(ODDS.map(o=>()=>pickSize(o[1])),800)},go:()=>{fresh();speak('Which letter is the wrong size?');buttons();S.want=chk(4,()=>S.won>=3,'Even sizes make joined writing easy to read.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which pair has a horizontal join?',[['on','ok'],['in','diag'],['an','diag2']]],
 ['Which one is a break letter?',[['g','ok'],['a','low'],['o','top']]],
 ['You join a to l. Where does the join go up to?',[['The top of the tall l','ok'],['The top of small letters','short'],['Along the line','flat']]],
 ['You write jam. Which gap stays open?',[['Between j and a','ok'],['Between a and m','join'],['Both gaps','all']]],
 ['Which letter needs a tail below the line?',[['y','ok'],['t','tall'],['n','small']]]];
function why(t){let m='Look at where the first letter finishes.';
 if(t==='diag')m='i ends on the line, so its join slants up. That is diagonal.';
 if(t==='diag2')m='a ends on the line, so the join is diagonal, not across.';
 if(t==='low')m='a ends on the line with a flick, so it joins. It is not a break letter.';
 if(t==='top')m='o ends at the top and joins across. It is not a break letter.';
 if(t==='short')m='l is a tall letter, so the join climbs to the top of its ascender.';
 if(t==='flat')m='Joins do not run flat along the line. They climb to where the next letter starts.';
 if(t==='join')m='a ends on the line, so a joins to m. Only the gap after j stays open.';
 if(t==='all')m='Only j is a break letter. a joins to m.';
 if(t==='tall')m='t is a tall letter. It goes up, not below the line.';
 if(t==='small')m='n is a small letter. It sits on the line.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.58,tall:.95,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
