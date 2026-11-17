/* Flagship: suffixes for ages 9–10 (National Curriculum in England, English Appendix 1, Years 5–6: endings that sound
   like /ʃəs/ spelt -cious or -tious, endings that sound like /ʃəl/ spelt -cial or -tial, and -ant/-ance/-ancy versus
   -ent/-ence/-ency). Use the clue word to pick c or t, look at the letter before -ial, drop a or e into the gap from a
   related word or a soft c, g or qu, keep word families together, then fix a café sign. Buttons do every action too. */
(()=>{
const {P,SHUS,SHUL,ANCE,FAM,SIGN,QS}=CIOUSART;
const BAD_AT=SIGN.map((w,i)=>w[1]?i:-1).filter(i=>i>=0);
VIS.reg('flagcious',c=>{let A,G,keys,quiz,qk=-1,tick=0;const R={after:()=>{}};
const sz=n=>Math.round(n*Math.min(1.22,Math.max(1,A.W/380)));
const tell=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
const part=()=>['shus','shul','ance','fam','sign','quiz'][A.step];
const within=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function pen(n,w){G.font=`${w||800} ${sz(n)}px system-ui,sans-serif`}
function word(t,x,y,n,col,w,al){pen(n,w);G.fillStyle=col||P.ink;G.textAlign=al||'center';G.textBaseline='middle';G.fillText(String(t),x,y)}
function rows(t,maxW,n){pen(n,700);const out=[];let cur='';for(const w of String(t).split(' ')){const nx=cur?cur+' '+w:w;if(cur&&G.measureText(nx).width>maxW){out.push(cur);cur=w}else cur=nx}out.push(cur);return out}
function pad(x,y,w,h,fill,edge,lw){A.paint.rrect(x,y,w,h,11);G.fillStyle=fill;G.fill();if(edge){G.lineWidth=lw||2;G.strokeStyle=edge;G.stroke()}}
function banner(t,done){const L=rows(t,A.W-44,14),lh=sz(14)+4,h=Math.max(sz(34),L.length*lh+12);pad(12,10,A.W-24,h,done?P.okBg:'#fff7ed',done?P.okc:P.rim,2);L.forEach((r,i)=>word(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,done?P.okc:P.ink,700));return 10+h}
function footer(){if(!R.msg)return;const L=rows((R.bad?'✗ ':'✓ ')+R.msg,A.W-48,13),lh=sz(13)+5,h=L.length*lh+12,y=A.H-h-10;pad(12,y,A.W-24,h,'#ffffff',R.bad?P.bad:P.okc,3);L.forEach((r,i)=>word(r,A.W/2,y+6+lh*(i+.5),13,R.bad?P.bad:P.ink,700))}
const nope=m=>{R.bad=true;R.msg=m;A.sound.miss();sync()};
const yep=m=>{R.bad=false;R.msg=m;A.sound.pop()};
function finish(n,m){R.i++;if(R.i===n){R.won=true;R.msg=m}sync()}
/* a word with a gap: [before][gap][after]; the gap shows the chosen letters once filled */
function gapWord(before,after,fill,y,n,mark){pen(n,900);const a=G.measureText(before).width,b=G.measureText(after).width,g=sz(n*1.5),x0=(A.W-a-g-b)/2;
 if(mark){const m=G.measureText(before.slice(-1)).width;pad(x0+a-m-3,y-sz(n*.75),m+6,sz(n*1.5),mark[0],mark[1],2)}word(before,x0,y,n,P.ink,900,'left');
 pad(x0+a+3,y-sz(n*.8),g-6,sz(n*1.6),fill?P.okBg:P.gapBg,fill?P.okc:P.gap,2.5);word(fill||'?',x0+a+g/2,y,n,fill?P.okc:P.gap,900);word(after,x0+a+g,y,n,P.ink,900,'left');return{x:x0+a,y:y-sz(n*.8),w:g,h:sz(n*1.6)}}
function choiceRow(labels,y,h){const w=(A.W-sz(16)*(labels.length+1))/labels.length;return labels.map((t,k)=>{const r={x:sz(16)+k*(w+sz(16)),y,w,h,k};pad(r.x,y,w,h,'#ffffff',P.gap,2.5);word(t,r.x+w/2,y+h/2,24,P.gap,900);return r})}
function clueChip(t,y,col,bg){pen(15,800);const w=G.measureText(t).width+sz(28);pad((A.W-w)/2,y,w,sz(32),bg||P.clueBg,col||P.clue,2);word(t,A.W/2,y+sz(16),15,col||P.clue,800);return y+sz(32)}
/* step 0 */
function shus(k){if(R.won)return;const s=SHUS[R.i],l=k?'t':'c';if(l!==s[1])return nope(s[3]);yep(s[0]+s[1]+'ious. '+s[3]);finish(SHUS.length,'Root ends in -ce: c. Related word with -tion: t.')}
/* step 1 */
function shul(k){if(R.won)return;const s=SHUL[R.i],l=k?'t':'c';if(l!==s[1])return nope(s[3]);yep(s[0]+s[1]+'ial. '+s[3]);finish(SHUL.length,'After a vowel: -cial. After a consonant: -tial. Finance, commerce and province keep their c.')}
/* step 2 */
function ance(k){if(R.won)return;const s=ANCE[R.i],l=k?'e':'a';if(l!==s[2])return nope(`Use the clue “${s[3]}”. ${s[4]}`);R.fill=l;yep(s[0]+l+s[1]+'. '+s[4]);
 setTimeout(()=>{if(part()!=='ance'||R.won)return;R.fill=null;finish(ANCE.length,'An -ation word or a clear a sound: a. Soft c, soft g, qu or a clear e sound: e.')},A.reduced()?20:420);sync()}
/* step 3 */
function fam(k){if(R.won)return;const f=FAM[R.i];if(k)return nope(`${f[0]} has an ${/ant$/.test(f[0])?'a':'e'} before nt, and its family keeps it: ${f[1]}.`);R.tree.push([f[0],f[1]]);yep(`${f[0]} → ${f[1]}.`);finish(FAM.length,'Families stick together: -ant, -ance, -ancy and -ent, -ence, -ency.')}
/* step 4 */
function sign(i){if(R.won)return;const w=SIGN[i];if(!w[1])return nope(w[2]||`“${w[0].replace(/[.,]/g,'')}” is spelt right. Check the endings: -cious, -cial, -ance.`);if(R.fixed.includes(i))return;R.fixed.push(i);
 yep(`${w[0]} → ${w[1][0]}. ${w[2]}`);if(R.fixed.length===BAD_AT.length){R.won=true;R.msg='Three endings fixed with the rules.'}sync()}
function paintShus(t,b){const s=SHUS[Math.min(R.i,SHUS.length-1)];let y=t+sz(12);y=clueChip('Clue word: '+s[2],y)+sz(40);gapWord(s[0],'ious',R.won?s[1]:null,y,30);R.boxes=choiceRow(['c','t'],y+sz(46),sz(58));
 word(`Word ${Math.min(R.i+1,SHUS.length)} of ${SHUS.length}`,A.W/2,y+sz(120),12,P.dim,700)}
function paintShul(t,b){const s=SHUL[Math.min(R.i,SHUL.length-1)],v=/[aeiou]/.test(s[2]);let y=t+sz(16);
 word(`The letter before the ending is ${s[2]}: ${v?'a vowel':'a consonant'}`,A.W/2,y+sz(8),13,v?P.vow:P.cons,800);y+=sz(56);gapWord(s[0],'ial',null,y,30,v?[P.vowBg,P.vow]:[P.consBg,P.cons]);
 R.boxes=choiceRow(['c','t'],y+sz(46),sz(58));word(`Word ${Math.min(R.i+1,SHUL.length)} of ${SHUL.length}`,A.W/2,y+sz(120),12,P.dim,700)}
function paintAnce(t,b){const s=ANCE[Math.min(R.i,ANCE.length-1)];let y=t+sz(12);y=clueChip('Clue: '+s[3],y)+sz(40);R.slot=gapWord(s[0],s[1],R.fill,y,30);
 const tiles=['a','e'],w=sz(70),h=sz(58),gap=sz(30),x0=(A.W-2*w-gap)/2,ty=y+sz(56);R.boxes=tiles.map((t,k)=>{const d=R.drag&&R.drag.k===k,r={x:x0+k*(w+gap),y:ty,w,h,k};
  pad(d?R.drag.x-w/2:r.x,d?R.drag.y-h/2:ty,w,h,'#ffffff',P.gap,d?4:2.5);word(t,(d?R.drag.x-w/2:r.x)+w/2,(d?R.drag.y-h/2:ty)+h/2,28,P.gap,900);return r});
 word('Drag a or e into the gap, or tap it',A.W/2,ty+h+sz(18),12,P.dim,700)}
function paintFam(t,b){const f=FAM[Math.min(R.i,FAM.length-1)];let y=t+sz(14);if(!R.won){clueChip(f[0],y,P.ink,'#ffffff');y+=sz(44);word('Which word is in its family?',A.W/2,y,13,P.dim,700);
 const two=[f[1],f[2]];if(R.i%2)two.reverse();const w=(A.W-sz(48))/2,h=sz(52);R.boxes=two.map((t,j)=>{const r={x:sz(16)+j*(w+sz(16)),y:y+sz(16),w,h,k:t===f[1]?0:1};pad(r.x,r.y,w,h,'#ffffff',P.gap,2.5);word(t,r.x+w/2,r.y+h/2,19,P.ink,900);return r});y+=sz(84)}else{R.boxes=[];y+=sz(4)}
 const colW=(A.W-36)/2;['-ant family','-ent family'].forEach((hd,k)=>{const x=12+k*(colW+12);pad(x,y,colW,Math.max(sz(70),b-y-4),k?P.clueBg:P.okBg,k?P.clue:P.okc,2);word(hd,x+colW/2,y+sz(14),13,k?P.clue:P.okc,900);
  R.tree.filter(p=>/ant$/.test(p[0])!==!!k).forEach((p,j)=>word(`${p[0]} → ${p[1]}`,x+colW/2,y+sz(36)+j*sz(20),12,P.ink,700))})}
function paintSign(t,b){pad(16,t+sz(8),A.W-32,b-t-sz(16),'#fefce8',P.rim,3);let x=sz(28),y=t+sz(34);const lh=sz(36);R.boxes=SIGN.map((w,i)=>{pen(18,800);const ok=R.fixed.includes(i),s=ok?w[1][0]+(/[.,]$/.test(w[0])?w[0].slice(-1):''):w[0],ww=G.measureText(s).width+sz(12);
 if(x+ww>A.W-sz(26)){x=sz(28);y+=lh}const r={x,y:y-sz(15),w:ww,h:sz(30),i};if(ok)pad(r.x,r.y,ww,r.h,P.okBg,P.okc,1.5);word(s,x+sz(6),y,18,ok?P.okc:P.ink,800,'left');x+=ww+sz(4);return r});
 word(`Endings fixed: ${R.fixed.length} of ${BAD_AT.length}`,A.W/2,Math.min(b-sz(16),y+lh),12,P.dim,700)}
function draw(){G.fillStyle=A.col.dark?'#111827':P.paper;G.fillRect(0,0,A.W,A.H);G.fillStyle=P.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);G.fill();
 const k=part(),T={shus:['c or t? Use the clue word. Tap a letter.','-cious and -tious sorted.'],shul:['c or t? Look at the letter before the ending.','-cial and -tial sorted.'],ance:['a or e? Use the clue.','-ant and -ent sorted.'],
  fam:['Tap the word in the same family.','Families kept together.'],sign:['Tap each word with a wrong ending.','Sign fixed.'],quiz:['-cious, -tial, -ance, -ence.','']};
 const t=banner(T[k][R.won?1:0]||T[k][0],R.won),b=A.H-(R.msg?sz(70):sz(12));
 if(k==='shus')paintShus(t,b);if(k==='shul')paintShul(t,b);if(k==='ance')paintAnce(t,b);if(k==='fam')paintFam(t,b);if(k==='sign')paintSign(t,b);
 if(k==='quiz')rows('space → spacious, caution → cautious. official, partial. observation → observant, innocent, frequent.',A.W-40,15).forEach((r,i)=>word(r,A.W/2,t+sz(30)+i*sz(24),15,P.dim,700));footer();A.fx.draw(G)}
function down(p){const k=part();if(R.won)return false;const r=(R.boxes||[]).find(q=>within(p,q));if(!r)return false;
 if(k==='ance'){R.drag={x:p.x,y:p.y,k:r.k,x0:p.x,y0:p.y};A.redraw();return true}
 if(k==='shus')shus(r.k);if(k==='shul')shul(r.k);if(k==='fam')fam(r.k);if(k==='sign')sign(r.i);return true}
function move(p){if(R.drag){R.drag.x=p.x;R.drag.y=p.y;A.redraw()}}
function up(p){const d=R.drag;if(!d)return;R.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<8;if(tap||within(p,R.slot))ance(d.k);else A.redraw()}
function sync(){const k=part();let d='Challenge.';
 if(k==='shus')d=R.won?'All -cious and -tious words done.':`Fill the gap: ${SHUS[R.i][0]} blank ious. Clue word: ${SHUS[R.i][2]}. c or t?`;
 if(k==='shul')d=R.won?'All -cial and -tial words done.':`Fill the gap: ${SHUL[R.i][0]} blank ial. The letter before the gap is ${SHUL[R.i][2]}. c or t?`;
 if(k==='ance')d=R.won?'All -ant and -ent words done.':`Fill the gap: ${ANCE[R.i][0]} blank ${ANCE[R.i][1]}. Clue: ${ANCE[R.i][3]}. a or e?`;
 if(k==='fam')d=R.won?'All six families built.':`${FAM[R.i][0]}: is its family word ${FAM[R.i][1]} or ${FAM[R.i][2]}?`;
 if(k==='sign')d=`Sign: ${SIGN.map((w,i)=>R.fixed.includes(i)?w[1][0]:w[0]).join(' ')} Fixed ${R.fixed.length} of ${BAD_AT.length}.`;
 tell((R.msg?R.msg+' ':'')+d);keypad();R.after()}
function keypad(){if(!keys)return;keys.innerHTML='';const k=part(),add=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},keys,t).onclick=()=>{fn();sync()}};if(R.won)return A.redraw();
 if(k==='shus'){add('c',()=>shus(0));add('t',()=>shus(1))}if(k==='shul'){add('c',()=>shul(0));add('t',()=>shul(1))}if(k==='ance'){add('a',()=>ance(0));add('e',()=>ance(1))}
 if(k==='fam'){const f=FAM[R.i];add(f[1],()=>fam(0));add(f[2],()=>fam(1))}
 if(k==='sign')SIGN.forEach((w,i)=>{if(!R.fixed.includes(i)&&(w[1]||w[2]))add('Check “'+w[0].replace(/[.,]/g,'')+'”',()=>sign(i))});A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const auto=(fns,ms)=>{const id=++tick;fns.forEach((f,j)=>setTimeout(()=>{if(id===tick){f();sync()}},(j+1)*(A.reduced()?60:ms)))};
function clean(){tick++;Object.assign(R,{after:()=>{},won:false,msg:'',bad:false,i:0,fill:null,drag:null,tree:[],fixed:[],boxes:[]})}
const steps=[
{h:'-cious or -tious?',p:'Both endings say “shus”. Find a related word. If the root ends in -ce, use c: space, spacious. If a related word has -tion, use t: caution, cautious.',
predict:{q:'space → spa_ious. Which is right?',opts:['spatious','spacious','spashous'],ans:1},
task:'Fill 8 gaps with c or t',show:()=>{steps[0].go();auto(SHUS.map(s=>()=>shus(s[1]==='t'?1:0)),380)},go:()=>{clean();sync();R.after=ready(0,()=>R.won,'The clue word chose the letter.')}},
{h:'-cial or -tial?',p:'Both endings say “shul”. Look at the letter before the ending. After a vowel, write -cial. After a consonant, write -tial. Finance, commerce and province keep their c.',
predict:{q:'par_ial (part of something). Which is right?',opts:['parcial','partial','parshal'],ans:1},
task:'Fill 7 gaps with c or t',show:()=>{steps[1].go();auto(SHUL.map(s=>()=>shul(s[1]==='t'?1:0)),380)},go:()=>{clean();sync();R.after=ready(1,()=>R.won,'Vowel: c. Consonant: t.')}},
{h:'-ant or -ent?',p:'Use -ant or -ance if a related word has an a sound there, often an -ation word. Use -ent or -ence after a soft c, a soft g or qu, or if a related word has a clear e sound.',
predict:{q:'toler_nce. The related word is toleration. Which is right?',opts:['tolerence','tolerance','tolerants'],ans:1},
task:'Drop a or e into 8 gaps',show:()=>{steps[2].go();auto(ANCE.map(s=>()=>ance(s[2]==='e'?1:0)),560)},go:()=>{clean();sync();R.after=ready(2,()=>R.won,'Clue first, then the letter.')}},
{h:'Word families',p:'Words in one family keep the same letter: observant, observance; frequent, frequency. Some, like obedient, give no clue, so learn one and its family follows.',
task:'Build 6 families',show:()=>{steps[3].go();auto(FAM.map(()=>()=>fam(0)),420)},go:()=>{clean();sync();R.after=ready(3,()=>R.won,'Each family kept its letter.')}},
{h:'Fix the café sign',p:'Use all three rules. Three words on this sign have the wrong ending. Tap them.',
task:'Fix the 3 endings',show:()=>{steps[4].go();auto(BAD_AT.map(i=>()=>sign(i)),500)},go:()=>{clean();sync();R.after=ready(4,()=>R.won,'Every ending fixed.')}},
{h:'Challenge',p:'',go:()=>{clean();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>R.after()});
function pose(){qk++;const [q,ok,bad]=QS[qk%QS.length],all=[[ok,'ok']].concat(bad),r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ok)});tell('Challenge: '+q);A.redraw()}
let run=0;
function mark(tag,ok){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';let m='Find the clue first: a related word, the letter before the ending, or a soft c, g or qu.';
 if(tag==='sound')m='Spelling it as it sounds does not work for these endings. Use the rule: a related word or the letter before.';
 if(tag==='keepe')m='The e of space goes when you add -ious, and the c stays: spacious.';
 if(tag==='cons')m='Look at the letter before the ending: r is a consonant, so -tial: partial.';
 if(tag==='softc')m='The c in innocent says s. After a soft c, use e: innocent.';
 if(tag==='root')m='The root keeps its double n: in + nocent, innocent.';
 if(tag==='fam')m='Observant has an a, and its family keeps it: observance. Observation is a clue too.';
 if(tag==='tion')m='The related word is nutrition, with -tion, so the ending is -tious: nutritious.';
 if(tag==='qu')m='After qu, use e: frequent, so frequency.';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ok+'. In a row: '+run+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{quiz.hidden=B.step!==5;keys.hidden=B.step===5;keypad()},
 init:B=>{A=B;G=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Suffix lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
