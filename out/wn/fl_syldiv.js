/* Flagship – breaking longer written words into syllables to read them (ages 6–9): mark the vowel sounds, cut
   between two middle consonants, try an open syllable before a closed one, keep consonant-le together, and sort
   first syllables into open (long vowel) and closed (short vowel). Every canvas target has a matching button. */
(()=>{
 const isV=ch=>'aeiou'.includes(ch);
 // runs of vowel letters: a vowel team such as ai or ea is one vowel sound
 function teams(w){const out=[];for(let i=0;i<w.length;i++){if(!isV(w[i]))continue;let j=i;while(j+1<w.length&&isV(w[j+1]))j++;out.push([i,j]);i=j}return out}
 const VOWEL_WORDS=['sunset','rain','robot','teapot'];
 const TWO_CONS=[['rabbit',3],['napkin',3],['picnic',3],['basket',3]];
 const LE_WORDS=[['table',2],['puddle',3],['candle',3],['bubble',3]];
 // one consonant between two vowels: [word, open cut, closed cut, which is right, how each way sounds]
 const ONE_CONS=[['tiger',2,3,'open','ty-ger','tig-er'],['cabin',2,3,'closed','cay-bin','cab-in'],['music',2,3,'open','myoo-sic','muss-ic'],
  ['lemon',2,3,'closed','lee-mon','lem-on'],['robot',2,3,'open','roh-bot','rob-ot']];
 const FIRST=[['pa','per',0],['nap','kin',1],['pi','lot',0],['bas','ket',1],['ze','ro',0],['pup','pet',1]];
 const BINS=[['Open','ends in a vowel','long sound'],['Closed','ends in a consonant','short sound']];
 const HUE=['#f59e0b','#8b5cf6','#0ea5e9','#ec4899'];
VIS.reg('flagsyldiv',c=>{let A,pad,chal;c.fig.classList.add('young');
 const S={k:0,lit:new Set(),cut:null,bad:false,note:'',sorted:0,hold:null,at:null,gen:0,check:()=>{}};
 const kind=()=>['vowels','twocons','onecons','le','sort','chal'][A.step];
 const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
 const oops=t=>{S.bad=true;S.note='✗ '+t;A.sound.miss();say(t);A.redraw()};
 const big=n=>Math.round(A.narrow?n:n*1.2);
 function write(g,t,x,y,n,col,wt){g.font=`${wt||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
 function box(g,r,col,fill,thick){g.fillStyle=A.alpha(col,fill);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=thick?4:2;g.strokeStyle=col;g.stroke()}
 // the latest feedback, wrapped onto up to three lines
 function noteAt(g,y){if(!S.note)return;const C=A.col,n=13;g.font=`700 ${big(n)}px system-ui,sans-serif`;const lines=[];let cur='';
  for(const wd of S.note.split(' ')){const t=cur?cur+' '+wd:wd;if(g.measureText(t).width>A.W-40&&cur){lines.push(cur);cur=wd}else cur=t}lines.push(cur);
  const lh=big(n)+5,h=lines.length*lh+12;box(g,{x:12,y:y-h/2,w:A.W-24,h},S.note[0]==='✗'?C.rd:C.gr,.1,false);lines.slice(0,3).forEach((l,i)=>write(g,l,A.W/2,y-h/2+6+lh*(i+.5),n,C.tx,700))}
 const inside=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 const strip=w=>{const s=Math.min(62,(A.W-24)/w.length),h=Math.min(84,A.H*.21);return{x:A.W/2-s*w.length/2,s,y:A.H*.24,h}};
 const okBtn=()=>({x:A.W*.28,y:A.H*.78,w:A.W*.44,h:Math.min(62,A.H*.15)});
 const optR=j=>{const w=(A.W-36)/2;return{x:12+j*(w+12),y:A.H*.34,w,h:A.H*.42}};
 const binR=j=>{const w=(A.W-36)/2;return{x:12+j*(w+12),y:A.H*.6,w,h:A.H*.34}};
 const word=()=>{const v=kind();return v==='vowels'?VOWEL_WORDS[S.k]:v==='twocons'?(TWO_CONS[S.k]||[])[0]:v==='le'?(LE_WORDS[S.k]||[])[0]:null};
 const listLen=()=>({vowels:VOWEL_WORDS,twocons:TWO_CONS,le:LE_WORDS,onecons:ONE_CONS}[kind()]||[]).length;

 // ---------- drawing ----------
 function letters(g,w){const C=A.col,L=strip(w),tm=teams(w);
  for(let i=0;i<w.length;i++){const r={x:L.x+i*L.s+3,y:L.y,w:L.s-6,h:L.h},t=tm.findIndex(([a,b])=>i>=a&&i<=b),on=kind()==='vowels'?S.lit.has(t):t>=0;
   const piece=S.cut!=null&&i>=S.cut?1:0;box(g,r,on?C.am:(kind()==='vowels'?C.mu:HUE[piece+1]),on?.32:.1,on);write(g,w[i],r.x+r.w/2,r.y+r.h/2,24,C.tx)}
  tm.forEach(([a,b],t)=>{if(kind()==='vowels'&&S.lit.has(t)&&b>a){g.strokeStyle=C.am;g.lineWidth=3;g.beginPath();g.moveTo(L.x+a*L.s+8,L.y+L.h+8);g.lineTo(L.x+(b+1)*L.s-8,L.y+L.h+8);g.stroke()}});
  if(S.cut!=null){const x=L.x+S.cut*L.s;g.setLineDash([7,5]);g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.moveTo(x,L.y-18);g.lineTo(x,L.y+L.h+18);g.stroke();g.setLineDash([])}
  return L}
 function sceneVowels(g){const C=A.col;if(S.k>=VOWEL_WORDS.length)return write(g,'One vowel sound in each syllable.',A.W/2,A.H*.45,16,C.gr);
  const w=VOWEL_WORDS[S.k];write(g,`Word ${S.k+1} of ${VOWEL_WORDS.length}: tap the vowels`,A.W/2,A.H*.1,14,C.mu,700);const L=letters(g,w);
  write(g,`Vowel sounds found: ${S.lit.size} of ${teams(w).length}`,A.W/2,L.y+L.h+40,15,C.tx,700);noteAt(g,A.H*.84)}
 function sceneCut(g,list){const C=A.col;if(S.k>=list.length)return write(g,'All cut! Now read each piece and blend.',A.W/2,A.H*.45,16,C.gr);
  const w=list[S.k][0];write(g,`Word ${S.k+1} of ${list.length}: tap a gap to cut`,A.W/2,A.H*.1,14,C.mu,700);const L=letters(g,w);
  const shown=S.cut==null?'no cut yet':w.slice(0,S.cut)+'  |  '+w.slice(S.cut);write(g,shown,A.W/2,L.y+L.h+40,17,C.tx);
  const b=okBtn();box(g,b,S.bad?C.rd:C.gr,.2,S.bad);write(g,'✓ Check',b.x+b.w/2,b.y+b.h/2,17,C.tx);noteAt(g,A.H*.66)}
 function sceneOne(g){const C=A.col;if(S.k>=ONE_CONS.length)return write(g,'Try open first. If it is not a word, try closed.',A.W/2,A.H*.45,15,C.gr);
  const [w,oc,cc,,os,cs]=ONE_CONS[S.k];write(g,w,A.W/2,A.H*.13,30,C.tx);write(g,`Which way makes a real word?`,A.W/2,A.H*.26,14,C.mu,700);
  [[w.slice(0,oc)+' | '+w.slice(oc),'open',os],[w.slice(0,cc)+' | '+w.slice(cc),'closed',cs]].forEach(([t,lab,s],j)=>{const r=optR(j);
   box(g,r,S.bad===j?C.rd:HUE[j+1],.16,S.bad===j);write(g,t,r.x+r.w/2,r.y+r.h*.3,22,C.tx);write(g,`${lab}: say “${s}”`,r.x+r.w/2,r.y+r.h*.62,13,C.tx,700);
   write(g,lab==='open'?'long vowel':'short vowel',r.x+r.w/2,r.y+r.h*.82,12,C.mu,700)});noteAt(g,A.H*.9)}
 function sceneSort(g){const C=A.col;if(S.sorted>=FIRST.length)return write(g,'Sorted! The end of the syllable tells you the vowel sound.',A.W/2,A.H*.4,14,C.gr);
  const [a,b]=FIRST[S.sorted];let r={x:A.W/2-90,y:A.H*.04,w:180,h:A.H*.3};if(S.hold&&S.at)r={...r,x:S.at.x-90,y:S.at.y-r.h/2};
  box(g,r,C.cy,.16,false);write(g,a+' - '+b,r.x+r.w/2,r.y+r.h*.42,24,C.tx);write(g,'first part: '+a,r.x+r.w/2,r.y+r.h*.75,13,C.mu,700);
  BINS.forEach((t,j)=>{const q=binR(j);box(g,q,S.bad===j?C.rd:HUE[j*2],.14,S.bad===j);write(g,t[0],q.x+q.w/2,q.y+q.h*.25,18,C.tx);write(g,t[1],q.x+q.w/2,q.y+q.h*.55,12,C.tx,700);write(g,t[2],q.x+q.w/2,q.y+q.h*.78,12,C.tx,700)});noteAt(g,A.H*.5)}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.06:.4);g.fillRect(0,0,W,H);const v=kind();
  if(v==='vowels')sceneVowels(g);else if(v==='twocons')sceneCut(g,TWO_CONS);else if(v==='le')sceneCut(g,LE_WORDS);else if(v==='onecons')sceneOne(g);else if(v==='sort')sceneSort(g);
  else write(g,'Cut, read, blend.',W/2,H/2,22,C.tx);A.fx.draw(g)}

 // ---------- actions ----------
 function tapLetter(i){const w=VOWEL_WORDS[S.k];if(!w||i<0||i>=w.length)return;const tm=teams(w),t=tm.findIndex(([a,b])=>i>=a&&i<=b);
  if(t<0)return oops(`${w[i]} is a consonant. The vowels are a, e, i, o and u.`);S.bad=false;S.lit.add(t);A.sound.tick();
  const [a,b]=tm[t];S.note=b>a?`${w.slice(a,b+1)} is a vowel team: two letters, one sound.`:`${w[i]} is a vowel.`;if(S.lit.size<tm.length)return refresh(S.note);
  S.note=`${w}: ${tm.length} vowel ${tm.length>1?'sounds':'sound'}, so ${tm.length} ${tm.length>1?'syllables':'syllable'}.`;A.sound.pop();S.k++;S.lit=new Set();refresh(S.note)}
 function setCut(i){const w=word();if(!w||i<1||i>=w.length)return;S.bad=false;S.note='';S.cut=S.cut===i?null:i;A.sound.tick();refresh('')}
 function judgeCut(){const v=kind(),list=v==='le'?LE_WORDS:TWO_CONS,item=list[S.k];if(!item)return;const [w,want]=item;let m='';
  if(S.cut==null)return oops('Tap a gap between two letters first.');
  const parts=[w.slice(0,S.cut),w.slice(S.cut)],empty=parts.find(p=>!teams(p).length);
  if(S.cut===want){S.bad=false;S.note=`${parts.join(' | ')}: read ${parts[0]}, then ${parts[1]}, then blend: ${w}.`;A.sound.pop();S.k++;S.cut=null;return refresh(S.note)}
  if(empty)m=`${empty} has no vowel. Every syllable needs a vowel sound.`;
  else if(v==='le')m=`The le grabs the consonant before it: ${w.slice(want)}. Cut just before ${w[want]}.`;
  else m=`Find the two consonants in the middle, ${w[want-1]} and ${w[want]}. Cut between them.`;
  oops(m)}
 function choose(j){const item=ONE_CONS[S.k];if(!item)return;const [w,,,right,os,cs]=item,isOpen=j===0;
  if((right==='open')!==isOpen){S.bad=j;return oops(isOpen?`“${os}” is not a word. Now try closed: “${cs}”, with a short vowel.`:`Try open first. ${w.slice(0,2)} ends in a vowel, so it says its name: “${os}”.`)}
  S.bad=false;S.note=`${right==='open'?os:cs}: ${w}!`;A.sound.pop();S.k++;refresh(S.note)}
 function drop(j){const it=FIRST[S.sorted];if(!it)return;const [a,,cls]=it;
  if(j!==cls){S.bad=j;return oops(cls?`${a} ends with ${a.slice(-1)}, a consonant. It is closed, so the vowel is short.`:`${a} ends with ${a.slice(-1)}, a vowel. It is open, so the vowel says its name.`)}
  S.bad=false;S.sorted++;A.sound.pop();S.note=`${a}: ${cls?'closed, short sound':'open, long sound'}.`;refresh(S.note)}

 // ---------- screen-reader text and button pad ----------
 function refresh(msg){const v=kind(),w=word();let t='';
  if(v==='vowels')t=w?`Word: ${w}. Vowel sounds marked: ${S.lit.size}.`:'All vowel words done.';
  else if(v==='twocons'||v==='le')t=w?`Word: ${w}. ${S.cut==null?'No cut yet.':'Cut: '+w.slice(0,S.cut)+' then '+w.slice(S.cut)+'.'}`:'All words cut.';
  else if(v==='onecons')t=S.k<ONE_CONS.length?`Word: ${ONE_CONS[S.k][0]}. Choose open or closed.`:'All words read.';
  else if(v==='sort')t=S.sorted<FIRST.length?`Card: ${FIRST[S.sorted][0]}-${FIRST[S.sorted][1]}. Open or closed?`:'All cards sorted.';else t='Challenge.';
  say((msg?msg+' ':'')+t);buildPad();S.check()}
 function buildPad(){if(!pad)return;pad.innerHTML='';const v=kind(),w=word();const add=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
  if(v==='vowels'&&w)[...w].forEach((ch,i)=>add(ch,()=>tapLetter(i),`Letter ${i+1}: ${ch}`));
  if((v==='twocons'||v==='le')&&w){for(let i=1;i<w.length;i++)add(w.slice(0,i)+'|'+w.slice(i),()=>setCut(i),`Cut after ${w.slice(0,i)}`);add('✓ Check',judgeCut,'Check the cut')}
  if(v==='onecons'&&S.k<ONE_CONS.length){const [x,oc,cc]=ONE_CONS[S.k];add('Open: '+x.slice(0,oc)+'|'+x.slice(oc),()=>choose(0));add('Closed: '+x.slice(0,cc)+'|'+x.slice(cc),()=>choose(1))}
  if(v==='sort'&&S.sorted<FIRST.length)['Open (long)','Closed (short)'].forEach((t,j)=>add(t,()=>drop(j)));A.redraw()}

 // ---------- pointer ----------
 function down(p){const v=kind();S.hold=null;S.at=null;
  if(v==='vowels'||v==='twocons'||v==='le'){const w=word();if(!w)return false;const L=strip(w);
   if(v!=='vowels'&&inside(p,okBtn())){judgeCut();return false}
   if(p.y>L.y-30&&p.y<L.y+L.h+30){if(v==='vowels')tapLetter(Math.floor((p.x-L.x)/L.s));else setCut(Math.round((p.x-L.x)/L.s))}return false}
  if(v==='onecons'){const j=[0,1].find(j=>inside(p,optR(j)));if(j!=null)choose(j);return false}
  if(v==='sort'&&S.sorted<FIRST.length){const j=[0,1].find(j=>inside(p,binR(j)));if(j!=null){drop(j);return false}S.hold=true;S.at=p;return true}
  return false}
 function up(p){if(!S.hold)return;S.hold=null;S.at=null;const j=[0,1].find(j=>inside(p,binR(j)));if(j!=null)drop(j);else A.redraw()}

 // ---------- steps ----------
 const completeWhen=(n,test,msg)=>()=>{if(A.step!==n||!test())return;if(steps[n].predict&&A.pred[n]==null)return;A.done(msg+A.reveal(n))};
 const auto=list=>{const g=++S.gen,gap=A.reduced()?15:240;list.forEach((f,i)=>setTimeout(()=>{if(g===S.gen)f()},i*gap))};
 const clear=()=>{S.gen++;S.check=()=>{};S.k=0;S.lit=new Set();S.cut=null;S.bad=false;S.note='';S.sorted=0;S.hold=null};
 const steps=[
  {h:'Find the vowel sounds',p:'Every syllable has one vowel sound. Tap the vowels in each word. Two vowels side by side, like ai in rain, make one sound.',
   predict:{q:'Rain has two vowel letters, a and i. How many syllables?',opts:['1 syllable','2 syllables'],ans:0},task:'Tap the vowel sounds in 4 words',
   show:()=>{steps[0].go();auto(VOWEL_WORDS.flatMap(w=>teams(w).map(([a])=>()=>tapLetter(a))))},
   go:()=>{clear();refresh();S.check=completeWhen(0,()=>S.k>=VOWEL_WORDS.length,'Sun-set 2, rain 1, ro-bot 2, tea-pot 2. Count vowel sounds, not vowel letters.')}},
  {h:'Two consonants in the middle',p:'Look at the letters between the two vowels. If there are two consonants, cut between them. Then read each part.',
   predict:{q:'Where does napkin split?',opts:['na | pkin','nap | kin'],ans:1},task:'Cut 4 words between the two consonants',
   show:()=>{steps[1].go();auto(TWO_CONS.flatMap(([,k])=>[()=>setCut(k),judgeCut]))},
   go:()=>{clear();refresh();S.check=completeWhen(1,()=>S.k>=TWO_CONS.length,'Rab-bit, nap-kin, pic-nic, bas-ket. Both parts are closed, so the vowels are short.')}},
  {h:'One consonant: open or closed?',p:'One consonant in the middle? Try an open cut first: the first part ends in a vowel, and the vowel says its name. If that is not a word, try closed.',
   predict:{q:'Camel. Which way makes a real word?',opts:['ca | mel (cay-mel)','cam | el'],ans:1},task:'Read 5 words the right way',
   show:()=>{steps[2].go();auto(ONE_CONS.map(x=>()=>choose(x[3]==='open'?0:1)))},
   go:()=>{clear();refresh();S.check=completeWhen(2,()=>S.k>=ONE_CONS.length,'Ti-ger, cab-in, mu-sic, lem-on, ro-bot. Open first, closed if it is not a word.')}},
  {h:'Consonant-le',p:'Words that end in a consonant and le, like table, keep those three letters together. Cut just before them.',
   predict:{q:'Where does table split?',opts:['tab | le','ta | ble'],ans:1},task:'Cut 4 consonant-le words',
   show:()=>{steps[3].go();auto(LE_WORDS.flatMap(([,k])=>[()=>setCut(k),judgeCut]))},
   go:()=>{clear();refresh();S.check=completeWhen(3,()=>S.k>=LE_WORDS.length,'Ta-ble, pud-dle, can-dle, bub-ble. The le always takes a friend.')}},
  {h:'Open or closed?',p:'Look at the end of the first part. Ends in a vowel? Open, so the vowel is long. Ends in a consonant? Closed, so it is short. Drag the card, or tap a box.',
   task:'Sort 6 cards',show:()=>{steps[4].go();auto(FIRST.map(x=>()=>drop(x[2])))},
   go:()=>{clear();refresh();S.check=completeWhen(4,()=>S.sorted>=FIRST.length,'Pa, pi and ze are open. Nap, bas and pup are closed.')}},
  {h:'Challenge',p:'',go:()=>{clear();next()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.check()});

 // ---------- challenge: every wrong split is tagged with the rule it breaks ----------
 const QS=[['magnet',['mag | net','ok'],['ma | gnet','cc'],['magn | et','cc']],['pilot',['pi | lot','ok'],['pil | ot','closed'],['p | ilot','none']],
  ['seven',['sev | en','ok'],['se | ven','open'],['seve | n','none']],['puzzle',['puz | zle','ok'],['puzz | le','le'],['pu | zzle','cc']],
  ['raincoat',['rain | coat','ok'],['ra | incoat','team'],['rainc | oat','cc']],['dentist',['den | tist','ok'],['de | ntist','cc'],['dent | ist','cc']]];
 function because(tag,w){let m=`Say it: that does not sound like ${w}.`;
  if(tag==='cc')m=`Two consonants sit in the middle of ${w}. Cut between them.`;
  if(tag==='closed')m=`Try open first: pi ends in a vowel, so i says its name. Pi-lot.`;
  if(tag==='open')m=`“See-ven” is not a word. Try closed: sev-en, with a short e.`;
  if(tag==='le')m=`Keep consonant-le together: zle. Puz-zle.`;
  if(tag==='team')m=`ai is a vowel team, one sound. Never cut a team apart.`;
  if(tag==='none')m=`One part has no vowel. Every syllable needs a vowel sound.`;
  return m}
 let qi=-1,run=0;
 function next(){qi++;const [w,...opts]=QS[qi%QS.length],turn=qi%3,order=opts.slice(turn).concat(opts.slice(0,turn));
  chal.innerHTML=`<p><b>Where does ${w} split into syllables?</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');order.forEach(([t,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,t);b.onclick=()=>mark(tag,w,opts[0][0])});say(`Challenge: where does ${w} split?`);A.redraw()}
 function mark(tag,w,right){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! '+right+'.':'✗ '+because(tag,w)}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Next word →</button>`;fb.querySelector('button').onclick=next}

 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;buildPad()},
  init:A=>{const holder=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Syllable cutting controls'},holder);chal=c.el('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{S.at=p;A.redraw()},up})}});
 A.start()})})();
