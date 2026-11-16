/* Flagship: reading and writing numbers to 10,000,000 (ages 10–11; NC England Y6 number and place value, CCSS 4.NBT.A.2
   extended). Tap commas into groups of three, say each group's words, build numbers from words with zeros held in their
   places, tap the digit with a given value, and order seven-digit numbers. Every tap has a button twin. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',noBg:'#ffe4e6',tip:'#eef2ff',edge:'#1e293b',
 band:['#dbeafe','#fef3c7','#dcfce7'],bandInk:['#1e3a8a','#78350f','#14532d'],gold:'#a16207',goldSoft:'#fef3c7',tag:'#7c2d12',sel:'#1d4ed8'};
const M=MILART,com=M.com,GN=['Millions','Thousands','Ones'];
VIS.reg('flagmil',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.15));
const say=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)};
function lines(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function banner(s,won){const L=lines(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(38),L.length*lh+14);box(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge);
 L.forEach((r,i)=>say(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function note(){if(!G.msg)return;const L=lines((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-8;
 box(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3);L.forEach((r,i)=>say(r,A.W/2,y+5+lh*(i+.5),13,G.bad?K.no:K.ink))}
const voice=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const wrong=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const right=s=>{G.bad=false;G.msg=s;A.sound.pop();sync()};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- a row of digit boxes, coloured by group (millions, thousands, ones) counted from the right ---- */
function digitRow(s,y,opt){opt=opt||{};const n=s.length,gap=z(opt.gap||12),gg=opt.even?gap:gap+z(8),bw0=(A.W-28-gap*(n-1)-(opt.even?0:(gg-gap)*Math.floor((n-1)/3)))/n,
 bw=Math.min(z(40),bw0),bh=z(opt.h||46),R=[],sp=i=>i<n-1&&(n-1-i)%3===0&&!opt.even?gg:gap;let w=n*bw;for(let i=0;i<n-1;i++)w+=sp(i);let x=(A.W-w)/2;
 for(let i=0;i<n;i++){const g=Math.floor((n-1-i)/3),bi=Math.max(0,2-g),on=opt.hi===i;
  box(x,y,bw,bh,on||opt.plain?K.card:K.band[bi],on?K.sel:K.edge,on?4:1.5,8);say(s[i],x+bw/2,y+bh/2+1,opt.size||24,opt.plain?K.ink:K.bandInk[bi],'center',800);R.push({x,y,w:bw,h:bh,i});
  if(opt.places)say(['M','HTh','TTh','Th','H','T','O'][i+7-n]||'',x+bw/2,y+bh+z(10),9,K.dim,'center',700);
  if(sp(i)===gg&&!opt.even)say(',',x+bw+gg/2,y+bh-z(4),22,K.ink,'center',900);x+=bw+sp(i)}
 return{R,gap,bw,bh}}
function groupTags(row,n,y){for(let g=0;g<3;g++){const idx=[...Array(n).keys()].filter(i=>Math.floor((n-1-i)/3)===g);if(!idx.length)continue;
 const a=row.R[idx[0]],b=row.R[idx[idx.length-1]],bi=2-Math.min(2,g);say(g>2?'':GN[bi],(a.x+b.x+b.w)/2,y,11,K.bandInk[bi],'center',700)}}
/* ---- step 0: commas ---- */
const okGaps=s=>{const n=s.length,o=[];for(let g=1;g<n;g++)if((n-g)%3===0)o.push(g);return o};
function tapGap(g){if(G.won)return;const s=M.COMMA[G.si],n=s.length;
 if(G.commas.has(g)){G.commas.delete(g);G.bad=false;G.msg='Comma taken out.';return sync()}
 if((n-g)%3){return wrong(`A comma after the ${['first','second','third','fourth','fifth','sixth','seventh'][g-1]} digit leaves ${n-g} digits on the right. Count in threes from the ones, on the right.`)}
 G.commas.add(g);const need=okGaps(s);if(need.every(k=>G.commas.has(k))){G.done.push(com(s));
  if(G.si===M.COMMA.length-1){G.won=true;return right(`${com(s)}. Every comma has exactly three digits after it, up to the next comma or the end.`)}
  right(`${com(s)}. Next number.`);G.si++;G.commas=new Set();return}
 G.bad=false;G.msg=`Good: ${n-g} digits to its right. Is another comma needed?`;A.sound.tick();sync()}
function drawCommas(y){const s=M.COMMA[G.si],row=digitRow(s,y,{gap:16});G.gapHit=[];
 for(let g=1;g<s.length;g++){const a=row.R[g-1],gx=a.x+a.w,hit={x:gx-row.bw/2,y:y-6,w:row.gap+row.bw,h:row.bh+z(24),g};G.gapHit.push(hit);
  if(G.commas.has(g)){say(',',gx+row.gap/2,y+row.bh-2,30,K.ink,'center',900)}else{X.fillStyle=K.dim;X.beginPath();X.arc(gx+row.gap/2,y+row.bh+z(8),2.5,0,7);X.fill()}}
 if(G.won||okGaps(s).every(k=>G.commas.has(k)))groupTags(row,s.length,y+row.bh+z(20))}
/* ---- step 1: say each group ---- */
const RQ=()=>M.READ[G.si];
function pickWord(i){if(G.won)return;const part=RQ().parts[G.pi],[w,tag]=part[i];if(tag!=='ok')return wrong(M.WHY[tag]);
 G.said.push(w);G.pi++;if(G.pi<3){right(`${GN[G.pi-1]} group: ${w}.`);return}
 const full=G.said.filter(x=>!/^\(/.test(x)).join(', ');G.done.push(full);
 const n=RQ().n;if(G.si===M.READ.length-1){G.won=true;G.pi=2;return right(`${com(n)}: ${full}. Each group is read like a number up to 999, then its name.`)}
 G.si++;G.pi=0;G.said=[];right(`${com(n)}: ${full}. Next number.`)}
const wordOrder=()=>{const r=(G.si+G.pi)%3;return[0,1,2].map(j=>(j+r)%3)};
function wordTiles(y){const part=RQ().parts[Math.min(G.pi,2)],h=z(34);G.tileHit=wordOrder().map((i,j)=>{const ty=y+j*(h+8);box(16,ty,A.W-32,h,K.goldSoft,K.gold,2,10);say(part[i][0],A.W/2,ty+h/2,13,K.tag);return{x:16,y:ty,w:A.W-32,h,i}})}
/* ---- step 2: build from words ---- */
const WQ=()=>M.WRITE[G.si];
function bump(i){if(G.won)return;G.dig[i]=(G.dig[i]+1)%10;A.sound.tick();G.bad=false;G.msg=`${M.PLACE[i]}: ${G.dig[i]}. The number reads ${com(G.dig.join(''))}.`;sync()}
function checkBuild(){if(G.won)return;const t=WQ().n,s=G.dig.join('');
 if(s===t){G.done.push(com(t));if(G.si===M.WRITE.length-1){G.won=true;return right(`${com(t)}. Zeros hold the empty places, so every digit stays in its column.`)}
  right(`${com(t)}. Next one.`);G.si++;G.dig=[0,0,0,0,0,0,0];return}
 const grp=[[0,1],[1,4],[4,7]].findIndex(([a,b])=>s.slice(a,b)!==t.slice(a,b)),nm=['millions','thousands','ones'][grp],want=t.slice(...[[0,1],[1,4],[4,7]][grp]);
 const moved=[...t].some((d,i)=>d!=='0'&&s[i]!==d&&s.includes(d));
 wrong(`Check the ${nm} group: it should read ${want}.${moved?' A digit is in the wrong column: count its place from the ones.':''} Empty places hold a 0.`)}
/* ---- step 3: value of a digit ---- */
const VQ=()=>M.VALUE[G.si];
function tapDigit(i){if(G.won)return;const Q=VQ(),d=+Q.n[i];if(i!==Q.want){return wrong(`That ${d} is in the ${M.PLACE[i]} place, so it is worth ${M.VAL(d,i)}. Look ${i<Q.want?'further right':'further left'}.`)}
 G.done.push(M.VAL(d,i));if(G.si===M.VALUE.length-1){G.won=true;return right(`Yes: ${M.VAL(d,i)}. The same digit is worth ten times more for each place to the left.`)}
 right(`Yes: in the ${M.PLACE[i]} place it is worth ${M.VAL(d,i)}. Next.`);G.si++}
/* ---- step 4: order ---- */
function tapCard(k){if(G.won||G.order.includes(k))return;const left=M.ORDER.filter((_,j)=>!G.order.includes(j)),v=M.ORDER[k],min=left.reduce((a,b)=>+b<+a?b:a);
 if(v!==min){return wrong(min.length<v.length?`${com(min)} has only ${min.length} digits, so it has no millions: it is smaller than any number with millions.`:`Line up the digits and compare from the left. ${com(v)} and ${com(min)} have the same millions; the first different place decides.`)}
 G.order.push(k);if(G.order.length===M.ORDER.length){G.won=true;return right(`${G.order.map(j=>com(M.ORDER[j])).join(' < ')}.`)}right(`${com(v)} is the smallest left.`)}
/* ---- input and drawing ---- */
const kind=()=>['comma','read','write','value','order','quiz'][A.step];
function down(p){const k=kind(),hit=list=>(list||[]).find(r=>inside(p,r));
 if(k==='comma'){const r=hit(G.gapHit);if(r){tapGap(r.g);sync();return true}}
 if(k==='read'){const r=hit(G.tileHit);if(r){pickWord(r.i);sync();return true}}
 if(k==='write'){const r=hit(G.colHit);if(r){bump(r.i);sync();return true}}
 if(k==='value'){const r=hit(G.digHit);if(r){tapDigit(r.i);sync();return true}}
 if(k==='order'){const r=hit(G.cardHit);if(r){tapCard(r.k);sync();return true}}
 return false}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();let t;
 if(k==='comma'){t=banner(G.won?'Commas split a big number into groups of three, counted from the right.':'Tap the gaps to put commas in '+M.COMMA[G.si]+'.',G.won);drawCommas(t+z(40))}
 if(k==='read'){const Q=RQ();t=banner(G.won?'Read each group as a number up to 999, then say millions or thousands.':`Say ${com(Q.n)}. Pick the words for the ${GN[Math.min(G.pi,2)].toLowerCase()} group.`,G.won);
  const row=digitRow(Q.n,t+z(12),{gap:6,h:40,size:20,hi:null});groupTags(row,7,t+z(12)+row.bh+z(12));
  const sofar=G.said.filter(x=>!/^\(/.test(x)).join(', ');say(sofar||'…',A.W/2,t+z(12)+row.bh+z(34),12,K.dim,'center',600);if(!G.won)wordTiles(t+row.bh+z(70))}
 if(k==='write'){const Q=WQ();t=banner(G.won?'Every place gets a digit. Empty places hold a 0.':`Build: ${Q.w}. Tap a column to add 1, then press Check.`,G.won);
  const row=digitRow(G.dig.join(''),t+z(20),{gap:6,h:54,size:26,places:true});G.colHit=row.R;groupTags(row,7,t+z(20)+row.bh+z(26));say('reads '+com(G.dig.join('')),A.W/2,t+z(20)+row.bh+z(50),15,K.ink)}
 if(k==='value'){const Q=VQ();t=banner(G.won?'A digit’s value is the digit times its place: 3 in the ten-thousands is 30,000.':Q.ask,G.won);
  const row=digitRow(Q.n,t+z(26),{gap:6,h:52,size:26,hi:G.won?Q.want:null,places:G.won});G.digHit=row.R;groupTags(row,7,t+z(26)+row.bh+z(G.won?26:14))}
 if(k==='order'){t=banner(G.won?'Fewer digits means smaller. Same number of digits: compare from the left.':'Tap the numbers from smallest to largest.',G.won);
  const h=z(40),w=Math.min(A.W-40,z(260));G.cardHit=M.ORDER.map((v,j)=>{const y=t+z(14)+j*(h+10),x=(A.W-w)/2,pos=G.order.indexOf(j);
   box(x,y,w,h,pos>=0?K.okBg:K.goldSoft,pos>=0?K.ok:K.gold,2,10);say(com(v),x+w/2,y+h/2,18,pos>=0?K.ok:K.tag,'center',800);if(pos>=0)say(String(pos+1),x+z(18),y+h/2,14,K.ok);return{x,y,w,h,k:j}})}
 if(k==='quiz'){t=banner('Groups of three from the right. Read each group, then its name. Zeros hold empty places.');digitRow('4302561',t+z(26),{gap:6,places:true});}
 note();A.fx.draw(X)}
function sync(){const k=kind();let d='Challenge.';
 if(k==='comma')d=`Digits ${M.COMMA[G.si].split('').join(' ')}. Commas placed after digit ${[...G.commas].sort().join(', ')||'none'}. Done: ${G.done.join('; ')||'none'}.`;
 if(k==='read')d=`Number ${com(RQ().n)}. Said so far: ${G.said.join(', ')||'nothing'}. Choices: ${G.won?'none':RQ().parts[G.pi].map(o=>o[0]).join('; ')}.`;
 if(k==='write')d=`Target: ${WQ().w}. Columns now read ${com(G.dig.join(''))}.`;
 if(k==='value')d=`${VQ().ask} The number is ${com(VQ().n)}.`;
 if(k==='order')d=`Numbers: ${M.ORDER.map(com).join(', ')}. Ordered so far: ${G.order.map(j=>com(M.ORDER[j])).join(', ')||'none'}.`;
 voice((G.msg?G.msg+' ':'')+d);buttons();G.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=()=>{fn();sync()}};
 if(k==='comma'&&!G.won){const s=M.COMMA[G.si];for(let g=1;g<s.length;g++)b(`${s.slice(0,g)} , ${s.slice(g)}`,()=>tapGap(g),`${G.commas.has(g)?'Remove the':'Put a'} comma after digit ${g}`)}
 if(k==='read'&&!G.won)wordOrder().forEach(i=>{const w=RQ().parts[G.pi][i][0];b(w,()=>pickWord(i),`Say ${w}`)});
 if(k==='write'&&!G.won){M.PLACE.forEach((nm,i)=>b(`${nm} +1`,()=>bump(i),`Add 1 in the ${nm} column`));b('Check',checkBuild,'Check the number')}
 if(k==='value'&&!G.won)VQ().n.split('').forEach((d,i)=>b(`${d} (digit ${i+1})`,()=>tapDigit(i),`Digit ${i+1} from the left, a ${d}`));
 if(k==='order'&&!G.won)M.ORDER.forEach((v,j)=>{if(!G.order.includes(j))b(com(v),()=>tapCard(j),`Next smallest: ${com(v)}`)});
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,si:0,pi:0,said:[],done:[],commas:new Set(),dig:[0,0,0,0,0,0,0],order:[]})}
function buildMoves(){const f=[];M.WRITE.forEach(W=>{W.n.split('').forEach((d,i)=>{for(let k=0;k<+d;k++)f.push(()=>bump(i))});f.push(checkBuild)});return f}
const steps=[
{h:'Groups of three',p:'Big numbers are easier to read in groups of three digits. Start at the ones, on the right, and put a comma after every three digits.',
predict:{q:'Where do the commas go in 4302561?',opts:['430,256,1','4,302,561','43,02,561'],ans:1},
task:'Put the commas in all three numbers',show:()=>{steps[0].go();const f=[];M.COMMA.forEach(s=>okGaps(s).forEach(g=>f.push(()=>tapGap(g))));play(f,600)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,'4,302,561, 10,000,000 and 7,045,200.')}},
{h:'Say it',p:'Read the first group, then say “million”. Read the next group, then say “thousand”. Then read the last group. Each group is a number from 0 to 999.',
predict:{q:'How do you say the middle group of 4,302,561?',opts:['thirty-two thousand','three hundred and two thousand','three hundred and twenty thousand'],ans:1},
task:'Say all three numbers',show:()=>{steps[1].go();const f=[];M.READ.forEach(()=>{for(let p=0;p<3;p++)f.push(()=>{const i=RQ().parts[G.pi].findIndex(o=>o[1]==='ok');pickWord(i)})});play(f,380)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'Four million, three hundred and two thousand, five hundred and sixty-one.')}},
{h:'Write it',p:'To write a number from words, fill each group of three. Fifty thousand is the group 050. A place with nothing in it still needs a 0.',
predict:{q:'Which is six million, fifty thousand and nine?',opts:['6,509','6,050,009','6,500,009'],ans:1},
task:'Build both numbers',show:()=>{steps[2].go();play(buildMoves(),85)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'6,050,009 and 3,400,070.')}},
{h:'What is it worth?',p:'A digit’s value depends on its place. Each place is worth ten times the place on its right.',
task:'Find all three digits',show:()=>{steps[3].go();play(M.VALUE.map(Q=>()=>tapDigit(Q.want)),700)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'30,000, then 500, then 7,000,000.')}},
{h:'Order them',p:'A number with more digits is bigger. If two numbers have the same number of digits, compare from the left: the first place that differs decides.',
predict:{q:'Which is smaller: 456,000 or 4,056,000?',opts:['4,056,000','456,000','They are equal'],ans:1},
task:'Put all four in order',show:()=>{steps[4].go();const s=M.ORDER.map((v,j)=>j).sort((a,b)=>+M.ORDER[a]-+M.ORDER[b]);play(s.map(j=>()=>tapCard(j)),650)},go:()=>{reset();sync();G.after=settle(4,()=>G.won,'456,000 < 4,506,000 < 4,560,000 < 4,605,000.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,ans,wrongs]=M.bank[qi%M.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});voice('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';let m=M.WHY[tag]||'Group the digits in threes from the right, then read each group.';
 if(tag==='grpLeft')m='The groups were counted from the left. Count three digits from the ones, on the right, for each comma.';
 if(tag==='noZeros')m='Zeros were left out, so the digits slid into the wrong places. Write every group with three digits: 2 million, then 040 thousand, then 008.';
 if(tag==='faceValue')m='That is the digit, not its value. Multiply the digit by its place: 6 in the hundred-thousands is 6 × 100,000 = 600,000.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.08,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Big number lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
