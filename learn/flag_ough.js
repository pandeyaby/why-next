/* Flagship: advanced spelling conventions (ages 9–10; National Curriculum in England, English Appendix 1, Years 5–6:
   adding suffixes to words ending in -fer, the /iː/ sound spelt ei after c, and the letter string ough).
   Tap the stressed syllable, build -fer words and see the r double only when -fer stays stressed, fill ie or ei gaps,
   sort ough words by the sound they make, and proofread a note. Every tap has a button too. */
(()=>{
const K={ink:'#111827',dim:'#374151',page:'#fffdf8',edge:'#1f2937',str:'#7c2d12',strBg:'#fed7aa',sel:'#1d4ed8',selBg:'#dbeafe',yes:'#166534',yesBg:'#dcfce7',no:'#9f1239',noBg:'#ffe4e6',hint:'#fff7ed',mute:'#e5e7eb'};
/* [syllables, index of the stressed one] */
const STRESS=[[['re','fer'],1],[['ref','er','ence'],0],[['re','fer','ral'],1],[['pref','er','ence'],0],[['con','fer','ring'],1],[['ref','er','ee'],2]];
/* [root, suffix, right spelling, wrong spelling, syllables of the right word, stressed index] */
const BUILD=[['refer','ing','referring','refering',['re','fer','ring'],1],['refer','ence','reference','referrence',['ref','er','ence'],0],
 ['prefer','ed','preferred','prefered',['pre','ferred'],1],['prefer','ence','preference','preferrence',['pref','er','ence'],0],
 ['infer','ence','inference','inferrence',['in','fer','ence'],0],['refer','al','referral','referal',['re','fer','ral'],1]];
/* [word with gap, right letters, why] */
const GAPS=[['rec_ve','ei','After c, the ee sound is spelt ei: receive.'],['ch_f','ie','No c before it, so i before e: chief.'],['c_ling','ei','After c, the ee sound is spelt ei: ceiling.'],
 ['bel_ve','ie','No c before it: believe.'],['dec_t','ei','After c, the ee sound is spelt ei: deceit.'],['sc_nce','ie','The rule is only for the ee sound. In science you do not say ee, so it is ie.']];
/* ough words by sound group */
const SOUNDS=[['or, as in saw',['thought','bought']],['uff, as in stuff',['rough','enough']],['off, as in off',['cough']],['oh, as in go',['though','dough']],['oo, as in too',['through']],['ow, as in cow',['plough','bough']]];
const OUGH=['thought','rough','though','through','plough','cough','enough','dough','bough','bought'];
const groupOf=w=>SOUNDS.findIndex(g=>g[1].includes(w));
/* proofreading: [word, correct form or null if right, why] */
const NOTE=[['Mum',null,''],['prefered','preferred','Prefer + ed: you still say pre-FERRED, so double the r: preferred.'],['the',null,''],['blue',null,''],['paint,',null,''],['so',null,''],['we',null,''],['recieved','received','After c the ee sound is ei: received.'],['a',null,''],['big',null,''],['tin.',null,''],
 ['The',null,''],['old',null,''],['wall',null,''],['was',null,''],['rough,',null,'rough is right: here ough says uff.'],['but',null,''],['the',null,''],['cieling','ceiling','After c the ee sound is ei: ceiling.'],['in',null,''],['the',null,''],
 ['reference',null,'reference is right: you say REF-er-ence, so the r is not doubled.'],['room',null,''],['looked',null,''],['bright',null,''],['though.',null,'though is right: here ough says oh.']];
const NOTE_BAD=NOTE.map((w,i)=>w[1]?i:-1).filter(i=>i>=0);
const Q=[['Which is right?','transferred',[['transfered','fer1'],['transferd','drop']]],['Which is right?','conference',[['conferrence','fer2'],['confrence','drop']]],
 ['Which is right?','perceive',[['percieve','cei'],['persieve','soft']]],['Which word does not rhyme with “through”?','though',[['threw','rhyme'],['blue','rhyme']]],
 ['Which is right?','ancient',[['anceint','eesound'],['anshent','sh']]],['Which spelling is right?','referee',[['referree','fer2'],['refferee','front']]]];
const FIX={fer1:'trans-FER-red: -fer is still stressed, so double the r.',fer2:'The stress moves off -fer, so the r is not doubled.',drop:'Keep every letter of the root word, then add the ending.',
 cei:'After c, the ee sound is spelt ei: perceive, receive, deceive.',soft:'The s sound before e is spelt c in this word: per-ceive, like receive.',sh:'The sh sound in ancient is spelt ci, as in special.',rhyme:'Threw and blue say oo, like through. Though says oh.',
 eesound:'In ancient you do not say ee, so the ei rule does not apply: it is ie.',front:'The root is refer, with one f.'};
VIS.reg('flagough',c=>{let A,X,pad,box,nq=-1,job=0;const W={after:()=>{}};
const u=n=>Math.round(n*(A.narrow?1:1.12));
const voice=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function put(t,x,y,n,col,wt,al){X.font=`${wt||700} ${u(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(t),x,y)}
function wrap(t,w,n){X.font=`700 ${u(n)}px system-ui,sans-serif`;const L=[];let cur='';for(const wd of String(t).split(' ')){const nx=cur?cur+' '+wd:wd;if(cur&&X.measureText(nx).width>w){L.push(cur);cur=wd}else cur=nx}L.push(cur);return L}
function tile(x,y,w,h,f,s,lw){A.paint.rrect(x,y,w,h,12);X.fillStyle=f;X.fill();if(s){X.lineWidth=lw||2;X.strokeStyle=s;X.stroke()}}
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function top(t,won){const L=wrap(t,A.W-44,14),lh=u(14)+4,h=Math.max(u(36),L.length*lh+14);tile(12,10,A.W-24,h,won?K.yesBg:K.hint,won?K.yes:K.edge,2);L.forEach((r,i)=>put(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,won?K.yes:K.ink));return 10+h}
function bottom(){if(!W.msg)return;const L=wrap((W.bad?'✗ ':'✓ ')+W.msg,A.W-48,13),lh=u(13)+5,h=L.length*lh+12,y=A.H-h-10;tile(12,y,A.W-24,h,'#ffffff',W.bad?K.no:K.yes,3);L.forEach((r,i)=>put(r,A.W/2,y+6+lh*(i+.5),13,W.bad?K.no:K.ink))}
const miss=m=>{W.bad=true;W.msg=m;A.sound.miss();sync()};
const hitOk=m=>{W.bad=false;W.msg=m;A.sound.pop()};
const kind=()=>['stress','fer','ie','ough','proof','quiz'][A.step];
/* syllable strip: highlight the stressed one when shown */
function strip(syl,st,show,y,h,pick){X.font=`900 ${u(22)}px system-ui,sans-serif`;const ws=syl.map(s=>Math.max(u(64),X.measureText(s).width+u(26))),gap=u(8),tot=ws.reduce((a,b)=>a+b,0)+gap*(syl.length-1);let x=(A.W-tot)/2;
 return syl.map((s,i)=>{const r={x,y,w:ws[i],h,i},hot=show&&i===st,wrongPick=pick===i&&i!==st;tile(x,y,ws[i],h,hot?K.strBg:wrongPick?K.noBg:'#ffffff',hot?K.str:wrongPick?K.no:K.edge,hot?3.5:2);put(hot?s.toUpperCase():s,x+ws[i]/2,y+h/2,22,hot?K.str:K.ink,900);x+=ws[i]+gap;return r})}
/* step 0 */
function tapStress(i){if(W.won)return;const [syl,st]=STRESS[W.i];if(i!==st){W.pick=i;return miss(`Say it out loud: ${syl.map((s,j)=>j===st?s.toUpperCase():s).join('-')}. The loud beat is “${syl[st]}”, not “${syl[i]}”.`)}
 W.pick=null;hitOk(`${syl.join('')}: ${syl.map((s,j)=>j===st?s.toUpperCase():s).join('-')}.`);W.i++;if(W.i===STRESS.length){W.won=true;W.msg='When the ending pulls the stress off -fer (REF-er-ence), -fer goes quiet.'}sync()}
/* step 1 */
function spell(k){if(W.won)return;const b=BUILD[W.i],pickW=k?b[3]:b[2],still=b[5]===1;if(k)return miss(still?`You still say ${b[4].map((s,j)=>j===b[5]?s.toUpperCase():s).join('-')}: -fer stays stressed, so double the r: ${b[2]}.`:`Say ${b[4].map((s,j)=>j===b[5]?s.toUpperCase():s).join('-')}: the stress moved off -fer, so keep one r: ${b[2]}.`);
 W.shown=true;hitOk(`${b[2]}: ${still?'-fer still stressed, double r':'stress moved, one r'}.`);setTimeout(()=>{if(kind()!=='fer'||W.won)return;W.shown=false;W.i++;if(W.i===BUILD.length){W.won=true;W.msg='Stress stays on -fer: double the r. Stress moves: one r.'}sync()},A.reduced()?30:650);sync()}
/* step 2 */
function gap(k){if(W.won)return;const g=GAPS[W.i];const pickL=k?'ei':'ie';if(pickL!==g[1])return miss(g[2]);hitOk(g[0].replace('_',g[1])+'. '+g[2]);W.i++;if(W.i===GAPS.length){W.won=true;W.msg='Ei after c, but only for the ee sound. Science and ancient keep ie.'}sync()}
/* step 3 */
function sortOugh(gi){if(W.won||W.i>=OUGH.length)return;const w=OUGH[W.i],g=groupOf(w);if(gi!==g)return miss(`Say “${w}” out loud. It does not sound like ${SOUNDS[gi][0].split(',')[0]}; ough in ${w} says ${SOUNDS[g][0].split(',')[0]}.`);
 W.done[g].push(w);hitOk(`${w}: ough says ${SOUNDS[g][0]}.`);W.i++;if(W.i===OUGH.length){W.won=true;W.msg='One letter string, six sounds. Learn each ough word by sight and sound.'}sync()}
/* step 4 */
function proof(i){if(W.won)return;const n=NOTE[i];if(!n[1])return miss(n[2]||`“${n[0].replace(/[.,]/g,'')}” is spelt right. Look for -fer words, ei after c and ough words.`);if(W.fixed.includes(i))return;W.fixed.push(i);hitOk(`${n[0]} → ${n[1]}. ${n[2]}`);
 if(W.fixed.length===NOTE_BAD.length){W.won=true;W.msg='Three slips fixed. Check -fer words, ei after c and ough words when you proofread.'}sync()}
function drawStress(t0,b0){const [syl,st]=STRESS[Math.min(W.i,STRESS.length-1)];put(`Word ${Math.min(W.i+1,6)} of 6: ${syl.join('')}`,A.W/2,t0+u(22),15,K.dim,800);W.rects=strip(syl,st,W.won,t0+u(44),u(66),W.pick);
 put('Tap the loud beat',A.W/2,t0+u(130),12,K.dim,700)}
function drawFer(t0,b0){const b=BUILD[Math.min(W.i,BUILD.length-1)];put(`${b[0]} + ${b[1]} = ?`,A.W/2,t0+u(24),22,K.ink,900);if(W.shown)strip(b[4],b[5],true,t0+u(46),u(52));
 const y=t0+u(112),w=(A.W-u(48))/2,h=u(58);W.rects=[b[2],b[3]].map((t,k)=>({t,k})).sort((p,q)=>(W.i%2?-1:1)*(p.t<q.t?-1:1)).map((o,j)=>{const r={x:u(16)+j*(w+u(16)),y,w,h,k:o.k};tile(r.x,y,w,h,'#ffffff',K.sel,2.5);put(o.t,r.x+w/2,y+h/2,20,K.ink,900);return r})}
function drawGap(t0,b0){const g=GAPS[Math.min(W.i,GAPS.length-1)],parts=g[0].split('_');if(W.won){put(g[0].replace('_',g[1]),A.W/2,t0+u(46),34,K.yes,900);return}X.font=`900 ${u(34)}px system-ui,sans-serif`;const a=X.measureText(parts[0]).width,bw=X.measureText(parts[1]).width,gw=u(64),tot=a+gw+bw,x0=(A.W-tot)/2,y=t0+u(46);
 put(parts[0],x0,y,34,K.ink,900,'left');tile(x0+a+4,y-u(24),gw-8,u(48),K.selBg,K.sel,2.5);put('?',x0+a+gw/2,y,30,K.sel,900);put(parts[1],x0+a+gw,y,34,K.ink,900,'left');
 const yy=t0+u(96),w=(A.W-u(48))/2,h=u(58);W.rects=['ie','ei'].map((t,k)=>{const r={x:u(16)+k*(w+u(16)),y:yy,w,h,k};tile(r.x,yy,w,h,'#ffffff',K.edge,2.5);put(t,r.x+w/2,yy+h/2,26,K.ink,900);return r})}
function drawOugh(t0,b0){const w0=W.i<OUGH.length?OUGH[W.i]:'';W.cardR=w0?{x:A.W/2-u(80),y:t0+u(4),w:u(160),h:u(44)}:null;
 const cols=A.narrow?2:3,rows=Math.ceil(SOUNDS.length/cols),gy=t0+u(56),w=(A.W-u(24)-u(8)*(cols-1))/cols,h=Math.min(u(74),(b0-gy-u(6))/rows-u(6));
 W.rects=SOUNDS.map((g,i)=>{const r={x:u(12)+(i%cols)*(w+u(8)),y:gy+Math.floor(i/cols)*(h+u(6)),w,h,i};tile(r.x,r.y,w,h,K.selBg,K.sel,2);put(g[0],r.x+w/2,r.y+u(14),12,K.sel,900);put(W.done[i].join(', '),r.x+w/2,r.y+h-u(16),12,K.ink,800);return r});
 if(w0){const d=W.drag,cr=W.cardR,x=d?d.x-cr.w/2:cr.x,y=d?d.y-cr.h/2:cr.y;tile(x,y,cr.w,cr.h,'#ffffff',K.sel,d?4:3);put(w0,x+cr.w/2,y+cr.h/2,22,K.ink,900)}}
function drawProof(t0,b0){let x=u(18),y=t0+u(22);const lh=u(36);W.rects=NOTE.map((n,i)=>{X.font=`800 ${u(17)}px system-ui,sans-serif`;const fix=W.fixed.includes(i),t=fix?n[1]+(/[.,]$/.test(n[0])?n[0].slice(-1):''):n[0],w=X.measureText(t).width+u(12);
  if(x+w>A.W-u(16)){x=u(18);y+=lh}const r={x,y:y-u(15),w,h:u(30),i};if(fix)tile(r.x,r.y,w,r.h,K.yesBg,K.yes,1.5);put(t,x+u(6),y,17,fix?K.yes:K.ink,800,'left');x+=w+u(4);return r});put(`Slips fixed: ${W.fixed.length} of ${NOTE_BAD.length}`,A.W/2,Math.min(b0-u(8),y+lh),12,K.dim,700)}
function draw(){X.fillStyle=A.col.dark?'#1f2937':K.page;X.fillRect(0,0,A.W,A.H);X.fillStyle=K.page;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=kind(),H={stress:['Which beat is loud? Tap it.','You can hear the stress.'],fer:['Tap the right spelling.','-fer words sorted.'],ie:['ie or ei? Tap one.','Ei after c, for the ee sound.'],ough:['What does ough say? Drag the word to its sound, or tap a box.','Six sounds for ough.'],proof:['Tap each misspelt word.','Note proofread.'],quiz:['-fer, ei after c, ough.','']};
 const t=top(H[k][W.won?1:0]||H[k][0],W.won),b=A.H-(W.msg?u(70):u(12));
 if(k==='stress')drawStress(t,b);if(k==='fer')drawFer(t,b);if(k==='ie')drawGap(t,b);if(k==='ough')drawOugh(t,b);if(k==='proof')drawProof(t,b);
 if(k==='quiz')wrap('refer → referring, but reference. receive, ceiling, but science. though, through, thought, rough, cough, plough.',A.W-u(40),15).forEach((r,i)=>put(r,A.W/2,t+u(30)+i*u(24),15,K.dim,700));bottom();A.fx.draw(X)}
let p0=null;
function down(p){const k=kind();p0=p;if(W.won)return false;if(k==='ough'&&on(p,W.cardR)){W.drag={x:p.x,y:p.y};A.redraw();return true}const r=(W.rects||[]).find(q=>on(p,q));if(!r)return false;
 if(k==='ough'){sortOugh(r.i);return true}
 if(k==='stress')tapStress(r.i);if(k==='fer')spell(r.k);if(k==='ie')gap(r.k);if(k==='proof')proof(r.i);return true}
function move(p){if(W.drag){W.drag.x=p.x;W.drag.y=p.y;A.redraw()}}
function up(p){if(!W.drag)return;W.drag=null;const r=(W.rects||[]).find(q=>on(p,q));if(r&&kind()==='ough')sortOugh(r.i);else A.redraw()}
function sync(){const k=kind();let d='Challenge.';
 if(k==='stress')d=W.won?'All six stresses found.':`Word ${W.i+1} of 6: ${STRESS[W.i][0].join('')}. Syllables: ${STRESS[W.i][0].join(', ')}.`;
 if(k==='fer')d=W.won?'All six -fer words built.':`${BUILD[W.i][0]} plus ${BUILD[W.i][1]}. Choices: ${BUILD[W.i][2]} or ${BUILD[W.i][3]}.`;
 if(k==='ie')d=W.won?'All six gaps filled.':`Fill the gap: ${GAPS[W.i][0].replace('_',' blank ')}. ie or ei?`;
 if(k==='ough')d=W.won?'All ough words sorted.':`Word ${W.i+1} of ${OUGH.length}: ${OUGH[W.i]}. Sound boxes: ${SOUNDS.map(g=>g[0]).join('; ')}.`;
 if(k==='proof')d=`Note: ${NOTE.map((n,i)=>W.fixed.includes(i)?n[1]:n[0]).join(' ')} Slips fixed ${W.fixed.length} of ${NOTE_BAD.length}.`;
 voice((W.msg?W.msg+' ':'')+d);buttons();W.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();sync()}};if(W.won)return A.redraw();
 if(k==='stress')STRESS[W.i][0].forEach((s,i)=>b('Loud beat: '+s,()=>tapStress(i)));
 if(k==='fer'){const B=BUILD[W.i];b(B[2],()=>spell(0));b(B[3],()=>spell(1))}
 if(k==='ie'){b('ie',()=>gap(0));b('ei',()=>gap(1))}
 if(k==='ough'&&W.i<OUGH.length)SOUNDS.forEach((g,i)=>b(g[0],()=>sortOugh(i)));
 if(k==='proof')NOTE.forEach((n,i)=>{if(!W.fixed.includes(i)&&(n[1]||n[2]))b('Check “'+n[0].replace(/[.,]/g,'')+'”',()=>proof(i))});
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const demo=(fns,ms)=>{const id=++job;fns.forEach((f,j)=>setTimeout(()=>{if(id===job){f();sync()}},(j+1)*(A.reduced()?60:ms)))};
function fresh(){job++;Object.assign(W,{after:()=>{},won:false,msg:'',bad:false,i:0,pick:null,shown:false,drag:null,done:SOUNDS.map(()=>[]),fixed:[]})}
const steps=[
{h:'Hear the stress',p:'In every long word one beat is louder. That loud beat is the stress. Say re-FER, then REF-er-ence: the stress moves.',
predict:{q:'In “reference”, which beat is loud?',opts:['REF','FER','ENCE'],ans:0},
task:'Find the loud beat in 6 words',show:()=>{steps[0].go();demo(STRESS.map(s=>()=>tapStress(s[1])),380)},go:()=>{fresh();sync();W.after=ready(0,()=>W.won,'Stress found every time.')}},
{h:'Adding endings to -fer',p:'Add an ending that starts with a vowel to a -fer word. If you still say -FER, double the r. If the stress moves away, keep one r.',
predict:{q:'prefer + ence. Which is right?',opts:['preferrence','preference','preferance'],ans:1},
task:'Build 6 -fer words',show:()=>{steps[1].go();demo(BUILD.map(()=>()=>spell(0)),800)},go:()=>{fresh();sync();W.after=ready(1,()=>W.won,'Listen for -FER.')}},
{h:'Ei after c',p:'For the ee sound, it is i before e, except after c: believe, but receive. The rule is only for the ee sound.',
predict:{q:'Which is right?',opts:['recieve','receive','receeve'],ans:1},
task:'Fill 6 gaps',show:()=>{steps[2].go();demo(GAPS.map(g=>()=>gap(g[1]==='ei'?1:0)),380)},go:()=>{fresh();sync();W.after=ready(2,()=>W.won,'Ei after c, for ee.')}},
{h:'The many sounds of ough',p:'The letters ough can say six different sounds. Say each word aloud and listen.',
predict:{q:'Do “though” and “through” rhyme?',opts:['Yes, they look alike','No, though says oh and through says oo','Only in poems'],ans:1},
task:'Sort 10 ough words by sound',show:()=>{steps[3].go();demo(OUGH.map(w=>()=>sortOugh(groupOf(w))),300)},go:()=>{fresh();sync();W.after=ready(3,()=>W.won,'Ough sorted by sound.')}},
{h:'Proofread the note',p:'Use all three rules. Three words in this note are spelt wrong. Tap them.',
task:'Fix the 3 slips',show:()=>{steps[4].go();demo(NOTE_BAD.map(i=>()=>proof(i)),500)},go:()=>{fresh();sync();W.after=ready(4,()=>W.won,'Every slip fixed.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>W.after()});
function ask(){nq++;const [q,ok,bad]=Q[nq%Q.length],all=[[ok,'ok']].concat(bad),r=nq%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>judge(tag,ok)});voice('Challenge: '+q);A.redraw()}
let inrow=0;
function judge(tag,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=tag==='ok';let m=FIX[tag]||'Say the word aloud and check the rule.';
 if(tag==='fer1')m='Say trans-FER-red. The stress stays on -fer, so double the r.';
 if(tag==='cei')m='Per-ceive has the ee sound straight after c, so it is ei.';
 if(tag==='eesound')m='Ancient has no ee sound, so the ei-after-c rule does not apply: an-cient.';
 if(good){inrow++;A.win()}else{inrow=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ok+'. In a row: '+inrow+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Spelling lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
