/* Flagship: narrator's point of view (ages 9–10; CCSS RL.4.6: compare and contrast the point of view from which stories are
   narrated, first and third person; topic evidence: tell first from third person and say what each lets the reader know,
   compare two tellings of one event, explain why an author picks a narrator). Sort sentences by narrator, switch the narrator
   and try to read each character's mind, tap the words to retell a sentence in third person (speech stays), sort what each of
   two tellers includes, and pick the narrator for four story plans. Every tap and drag has a button. */
(()=>{
const {SPOT,PEOPLE,SWAP,VERSIONS,TELLS,CHOOSE,BANK,WHY}=PERSONART;
const K={ink:'#111827',mute:'#374151',sheet:'#fffdf8',stroke:'#1f2937',hint:'#f5f3ff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',
 one:'#fef3c7',oneE:'#92400e',three:'#e0e7ff',threeE:'#3730a3',think:'#ffffff',swap:'#fde68a',quote:'#f3f4f6'};
VIS.reg('flagperson',c=>{let A,X,keysEl,askEl,qi=-1,gen=0,run=0;const V={after:()=>{}};
const em=n=>Math.round(n*(A.narrow?1.04:1.12));
function tellAll(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function ink(s,x,y,n,col,wt,al){X.font=`${wt||800} ${em(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function split(s,w,n,wt){X.font=`${wt||800} ${em(n)}px system-ui,sans-serif`;const o=[];let line='';String(s).split(' ').forEach(t=>{const nx=line?line+' '+t:t;if(line&&X.measureText(nx).width>w){o.push(line);line=t}else line=nx});o.push(line);return o}
function card(x,y,w,h,fill,edge,lw,r){A.paint.rrect(x,y,w,h,r||12);X.fillStyle=fill;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function fill(s,R,n,col,wt){const o=split(s,R.w-em(14),n,wt),lh=em(n)+4;o.forEach((t,i)=>ink(t,R.x+R.w/2,R.y+R.h/2+(i-(o.length-1)/2)*lh,n,col,wt))}
const over=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
function title(s,won){const o=split(s,A.W-44,15),lh=em(15)+4,h=Math.max(em(38),o.length*lh+12);card(12,10,A.W-24,h,won?K.okBg:K.hint,won?K.ok:K.stroke,2);o.forEach((t,i)=>ink(t,A.W/2,10+h/2+(i-(o.length-1)/2)*lh,15,won?K.ok:K.ink));return 10+h}
function reply(){if(!V.msg)return 0;const o=split((V.bad?'✗ ':'✓ ')+V.msg,A.W-44,13),lh=em(13)+5,h=o.length*lh+12,y=A.H-h-10;card(12,y,A.W-24,h,'#ffffff',V.bad?K.no:K.ok,3);o.forEach((t,i)=>ink(t,A.W/2,y+6+lh*(i+.5),13,V.bad?K.no:K.ink));return h+14}
const nope=s=>{V.bad=true;V.msg=s;A.sound.miss();talk()};
const yep=s=>{V.bad=false;V.msg=s;A.sound.pop()};
const stage=()=>['spot','minds','swap','tells','choose','quiz'][A.step];
/* ---------- steps 0, 3 and 4: one card, a few boxes ---------- */
const pack=()=>({spot:SPOT,tells:TELLS,choose:CHOOSE})[stage()];
const labels=()=>stage()==='tells'?['Only Sam','Only Mrs Patel','Both']:['First person','Third person'];
function drop(b){if(V.won)return;const D=pack(),it=D[V.at];if(b!==it[1])return nope(it[2]);yep(it[2]);V.at++;
 if(V.at>=D.length){V.won=true;V.msg={spot:'Look for who is telling: I and we for first person; he, she and they for third. Speech marks do not count.',tells:'Same crash, two stories. Each narrator chose what to put in and what to leave out.',choose:'First person for closeness and surprise; third person to see many minds and places.'}[stage()]}talk()}
function drawPack(t0,b0){const L=labels(),n=L.length,g=em(8),bw=(A.W-28-g*(n-1))/n,bh=Math.min(em(70),(b0-t0)*.2),by=b0-bh;let top0=t0;
 if(stage()==='tells'){const two=!A.narrow,vw=two?(A.W-28-g)/2:A.W-28;VERSIONS.forEach(([who,txt],i)=>{const o=split(txt,vw-em(16),12,600),h=o.length*(em(12)+4)+em(30),x=14+(two?i*(vw+g):0),y=two?t0:top0;
  card(x,y,vw,h,i?K.three:K.one,i?K.threeE:K.oneE,2,10);ink(who,x+em(8),y+em(12),12,i?K.threeE:K.oneE,900,'left');o.forEach((t,j)=>ink(t,x+em(8),y+em(28)+j*(em(12)+4),12,K.ink,600,'left'));if(!two)top0+=h+g;else top0=Math.max(top0,t0+h+g)})}
 V.boxR=L.map((s,i)=>{const R={x:14+i*(bw+g),y:by,w:bw,h:bh,i};card(R.x,R.y,R.w,R.h,[K.one,K.three,K.okBg][i],K.stroke,2.5);fill(s,R,14,K.ink);return R});
 const D=pack();if(V.at<D.length){const cw=Math.min(A.W-36,em(380)),o=split(D[V.at][0],cw-em(20),15),ch=o.length*(em(15)+5)+em(26),home={x:(A.W-cw)/2,y:top0+(by-top0-ch)/2,w:cw,h:ch},d=V.drag;V.cardR=home;
  const R=d?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch}:home;card(R.x,R.y,R.w,R.h,'#ffffff',d?K.threeE:K.stroke,3);fill(D[V.at][0],R,15,K.ink);ink(`Card ${V.at+1} of ${D.length}`,A.W/2,Math.max(top0+em(4),home.y-em(12)),12,K.mute,800)}}
/* ---------- step 1: whose mind can the narrator see? ---------- */
const NARR=['Ella tells it (first person, "I")','An all-knowing narrator (third person)'];
function setNarr(k){if(V.won)return;V.narr=k;yep(k?'Now the narrator is outside the story. Tap each person again.':'Ella is the narrator. Tap each person to try to read their mind.');talk()}
function peek(i){if(V.won)return;const [who,inner,outer]=PEOPLE[i],key=V.narr+':'+i;if(V.narr===0&&i>0){if(!V.seen.includes(key))V.seen.push(key);nope(`Ella cannot see inside ${who}'s head. She can only say: "${outer}" She has to guess the rest.`)}
 else{if(!V.seen.includes(key))V.seen.push(key);yep(`${V.narr?who+' thinks':'Ella thinks'}: "${inner}"`)}
 if(V.seen.length>=6){V.won=true;V.bad=false;V.msg='First person shows one mind, the narrator\'s. An all-knowing third-person narrator can show every mind.'}talk()}
function drawMinds(t0,b0){const g=em(8),tw=(A.W-28-g)/2,th=em(48);V.narrR=NARR.map((s,k)=>{const R={x:14+k*(tw+g),y:t0,w:tw,h:th,k};card(R.x,R.y,R.w,R.h,V.narr===k?(k?K.three:K.one):'#ffffff',V.narr===k?(k?K.threeE:K.oneE):K.stroke,V.narr===k?3:2,10);fill(s,R,12,K.ink);return R});
 const pw=(A.W-28-2*g)/3,py=t0+th+em(18),ph=Math.max(em(120),b0-py-em(6));V.peopleR=PEOPLE.map(([who,inner,outer],i)=>{const R={x:14+i*(pw+g),y:py,w:pw,h:ph,i},key=V.narr+':'+i,open=V.seen.includes(key);
  card(R.x,R.y,R.w,R.h,'#ffffff',K.stroke,2,12);const cx=R.x+pw/2,hy=R.y+ph*.62;X.fillStyle=['#fcd34d','#93c5fd','#d8b4fe'][i];X.beginPath();X.arc(cx,hy,Math.min(pw,ph)*.16,0,7);X.fill();X.strokeStyle=K.stroke;X.lineWidth=2;X.stroke();
  ink(who,cx,R.y+ph-em(14),13,K.ink,900);const bub={x:R.x+6,y:R.y+6,w:pw-12,h:ph*.4};const known=open&&!(V.narr===0&&i>0);card(bub.x,bub.y,bub.w,bub.h,known?K.okBg:open?'#ffe4e6':K.quote,known?K.ok:open?K.no:'#6b7280',1.5,10);
  fill(known?inner:open?'? can only guess':'tap to read their mind',bub,11,K.ink,known?700:800);return R})}
/* ---------- step 2: retell in third person ---------- */
function tapWord(j){if(V.won)return;const S=SWAP[V.line],[w,to,quoted]=S[j];if(V.fixed.includes(j))return;
 if(quoted)return nope('Words inside speech marks are what Ella really said, so they stay the same. Only the narrator\'s words change.');
 if(!to)return nope(`"${w}" is not one of the narrator's words for themselves. Only I, me and my change here.`);
 V.fixed.push(j);yep(`"${w}" becomes "${to}".`);if(S.every((t,k)=>!t[1]||V.fixed.includes(k))){V.line++;V.fixed=[];if(V.line>=SWAP.length){V.won=true;V.msg='Now the story is told from outside: Ella grabbed her bag. Her own words in speech marks stayed the same.'}else V.msg+=' Sentence done. Next one.'}talk()}
function drawSwap(t0,b0){const done=V.line>=SWAP.length,li=Math.min(V.line,SWAP.length-1),S=SWAP[li],gap=em(8),h=em(46);ink(done?'All 3 sentences retold.':`Sentence ${li+1} of 3: tap the words that must change.`,A.W/2,t0+em(8),13,K.mute,800);
 let x=14,y=t0+em(30);V.wordR=[];S.forEach(([w,to,q],j)=>{const show=(done||V.fixed.includes(j))&&to?to:w;X.font=`800 ${em(18)}px system-ui,sans-serif`;const ww=X.measureText(show).width+em(22);if(x+ww>A.W-14){x=14;y+=h+gap}
  const R={x,y,w:ww,h,j},fixed=done||V.fixed.includes(j);card(R.x,R.y,R.w,R.h,fixed&&to?K.okBg:q?K.quote:'#ffffff',fixed&&to?K.ok:K.stroke,2,10);ink(show,R.x+R.w/2,R.y+h/2,18,K.ink,800);V.wordR.push(R);x+=ww+gap});
 const ly=y+h+em(26);card(14,ly,A.W-28,em(40),K.three,K.threeE,1.5,10);ink('Grey words are inside speech marks.',A.W/2,ly+em(20),12,K.ink,800)}
/* ---------- drawing ---------- */
function draw(){X.fillStyle=A.col.dark?'#1f2937':K.sheet;X.fillRect(0,0,A.W,A.H);X.fillStyle=K.sheet;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const S=stage(),T={spot:['Who is telling? Drag each sentence to first or third person.','You can spot the narrator.'],minds:['Pick a narrator, then tap each person to read their mind.','You found what each narrator can know.'],
  swap:['Retell it from outside: tap each word that must change.','Retold in third person.'],tells:['Read both tellings. Whose version has each detail?','Two tellings compared.'],
  choose:['Which narrator suits each story plan?','Narrators chosen.'],quiz:['Who is telling, and what can they know?','']};
 const t=title(V.won?T[S][1]:T[S][0],V.won),b=A.H-reply()-em(6);
 if(S==='spot'||S==='tells'||S==='choose')drawPack(t+em(10),b);if(S==='minds')drawMinds(t+em(10),b);if(S==='swap')drawSwap(t+em(10),b);
 if(S==='quiz'){const R={x:em(28),y:t+em(26),w:A.W-em(56),h:Math.min(em(150),b-t-em(50))};card(R.x,R.y,R.w,R.h,K.three,K.stroke,2);fill('First person: the narrator is "I" and knows one mind. Third person: the narrator is outside and may know many.',R,16,K.ink)}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let carry=null;
function down(p){const S=stage();
 if((S==='spot'||S==='tells'||S==='choose')&&!V.won){if(over(p,V.cardR)){carry='card';V.drag={x:p.x,y:p.y};A.redraw();return true}const R=(V.boxR||[]).find(q=>over(p,q));if(R){drop(R.i);return true}}
 if(S==='minds'){const N=(V.narrR||[]).find(q=>over(p,q));if(N){setNarr(N.k);return true}const R=(V.peopleR||[]).find(q=>over(p,q));if(R){peek(R.i);return true}}
 if(S==='swap'){const R=(V.wordR||[]).find(q=>over(p,q));if(R){tapWord(R.j);return true}}
 return false}
function move(p){if(carry==='card'){V.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){const g=carry;carry=null;if(g==='card'){V.drag=null;const R=(V.boxR||[]).find(q=>over(p,q));if(R)drop(R.i);else A.redraw()}}
/* ---------- live description and buttons ---------- */
function talk(){const S=stage();let d='Challenge.';
 if(S==='spot'||S==='tells'||S==='choose')d=(S==='tells'?`${VERSIONS.map(v=>v[0]+': '+v[1]).join(' ')} `:'')+(V.won?'All cards sorted.':`Card ${V.at+1} of ${pack().length}: ${pack()[V.at][0]}. Boxes: ${labels().join(', ')}.`);
 if(S==='minds')d=`Narrator: ${NARR[V.narr]}. Minds tried: ${V.seen.length} of 6.`;
 if(S==='swap')d=V.won?'All sentences retold.':`Sentence ${V.line+1}: ${SWAP[V.line].map((t,k)=>V.fixed.includes(k)&&t[1]?t[1]:t[0]).join(' ')}`;
 tellAll((V.msg?V.msg+' ':'')+d);keypad();V.after()}
function keypad(){if(!keysEl)return;keysEl.innerHTML='';const S=stage(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},keysEl,t).onclick=()=>{fn();talk()}};
 if(!V.won){if(S==='spot'||S==='tells'||S==='choose')labels().forEach((n,i)=>b(n,()=>drop(i)));
  if(S==='minds'){b(V.narr?'Make Ella the narrator':'Switch to an all-knowing narrator',()=>setNarr(V.narr?0:1));PEOPLE.forEach((p,i)=>b(`Read ${p[0]}'s mind`,()=>peek(i)))}
  if(S==='swap')SWAP[V.line].forEach((t,j)=>{if(!V.fixed.includes(j))b(`Change "${t[0]}"`,()=>tapWord(j))})}
 A.redraw()}
const ready=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const demo=(fns,ms)=>{const id=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen){f();talk()}},(j+1)*(A.reduced()?50:ms)))};
function wipe(){gen++;Object.assign(V,{after:()=>{},won:false,msg:'',bad:false,at:0,drag:null,narr:0,seen:[],line:0,fixed:[]})}
const fixes=SWAP.flatMap((S,l)=>S.map((t,j)=>t[1]?j:-1).filter(j=>j>=0).map(j=>()=>tapWord(j)));
const steps=[
{h:'Who is telling the story?',p:'The narrator is the voice telling the story. In first person the narrator is in the story and says I or we. In third person the narrator is outside and says he, she or they.',
predict:{q:'"I\'m hungry," Tom said, and he opened the fridge. Who is the narrator?',opts:['Tom, in first person: it says I','Someone outside, in third person'],ans:1},
task:'Sort all 6 sentences',show:()=>{steps[0].go();demo(SPOT.map(k=>()=>drop(k[1])),380)},go:()=>{wipe();talk();V.after=ready(0,()=>V.won,'Narrators spotted.')}},
{h:'What can the narrator know?',p:'Ella has just won a prize. Ben and Grandma are with her. The narrator decides what you find out about each of them.',
predict:{q:'Can a first-person narrator tell you exactly what another character is thinking?',opts:['Yes, they are telling the story','No, they can only guess from what they see'],ans:1},
task:'Try all 3 minds with both narrators',show:()=>{steps[1].go();demo([()=>peek(0),()=>peek(1),()=>peek(2),()=>setNarr(1),()=>peek(0),()=>peek(1),()=>peek(2)],420)},go:()=>{wipe();talk();V.after=ready(1,()=>V.won,'One mind, or every mind.')}},
{h:'Retell it from outside',p:'To change first person into third person, swap the narrator\'s own words: I becomes Ella, my becomes her, me becomes her.',
predict:{q:'Ella says: I shouted, "Wait for me!" In third person, does the "me" in the speech marks change?',opts:['Yes, every me changes','No, speech stays as it was said'],ans:1},
task:'Retell all 3 sentences',show:()=>{steps[2].go();demo(fixes,420)},go:()=>{wipe();talk();V.after=ready(2,()=>V.won,'Retold from outside.')}},
{h:'Two tellings, one event',p:'A ball has smashed a window. Sam kicked it. Mrs Patel lives in the house. Each of them tells what happened.',
predict:{q:'Will both tellings include the same details?',opts:['Yes, it is the same event','No, each narrator chooses what to tell'],ans:1},
task:'Sort all 6 details',show:()=>{steps[3].go();demo(TELLS.map(k=>()=>drop(k[1])),380)},go:()=>{wipe();talk();V.after=ready(3,()=>V.won,'Both tellings compared.')}},
{h:'The author chooses',p:'First person feels close and personal: you only know what the narrator knows. Third person can step back, see many places and, if all-knowing, many minds.',
task:'Choose a narrator for all 4 plans',show:()=>{steps[4].go();demo(CHOOSE.map(k=>()=>drop(k[1])),420)},go:()=>{wipe();talk();V.after=ready(4,()=>V.won,'Good choices.')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>V.after()});
function quiz(){qi++;const [q,good,bad]=BANK[qi%BANK.length],all=[[good,'ok'],...bad],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 askEl.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=askEl.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>score(tag,good)});tellAll('Challenge: '+q);A.redraw()}
function score(tag,good){askEl.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=askEl.querySelector('.fl-fb'),yes=tag==='ok';let m=WHY[tag]||'Ask: who is telling, and what can they know?';
 if(tag==='quote')m=`The "I" belongs to Leo's speech, not to the narrator. The narrator says "his coat", so it is third person.`;
 if(tag==='mind')m=`A first-person narrator is one person in the story. They can only guess what others think.`;
 if(tag==='half')m=`Both narrator words must change: I becomes Kim and my becomes her. ${WHY.half}`;
 if(yes){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Yes: '+good+'. In a row: '+run+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.7,tall:1.55,draw,onStep:B=>{askEl.hidden=B.step!==5;keysEl.hidden=B.step===5;keypad()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);keysEl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Narrator lab buttons'},w);askEl=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
