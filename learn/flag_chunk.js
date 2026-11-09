/* Flagship: chunking to remember (ages 6-7; a memory strategy: group items into a few small chunks so working memory
   has fewer pieces to hold). Pour nine single numbers into a memory box with room for about four pieces and watch most
   fall out, split the same number into three chunks so it fits, sort a shopping list into three baskets, split a long
   word into its beats to spell it, and find the hidden words in a string of letters. Not flagmem (ages 11-12 working
   memory model) or flagmnem (first-letter sentences). */
(()=>{
VIS.reg('flagchunk',c=>{let A,pad,quiz,qn=-1,epoch=0;const V={};c.fig.classList.add('young');
const INK='#0f172a',CARD='#fff7ed',GOOD='#15803d',BLUE='#1e40af',BAD='#be123c',TILE='#dbeafe';
const SLOTS=4,NUM='358294716';
const SPLIT={chunk:{s:NUM,ok:b=>chunks(NUM,b).every(q=>q.length>=2&&q.length<=4),show:[3,6]},spell:{s:'yesterday',ok:b=>b.join()==='3,6',show:[3,6]},words:{s:'catdoghen',ok:b=>b.join()==='3,6',show:[3,6]}};
const SHOP=[['apple',0],['soap',1],['bread',2],['milk',2],['pear',0],['shampoo',1],['toothbrush',1],['eggs',2],['banana',0]];
const BASK=['Fruit','Bath time','Breakfast'];
const phase=()=>['flood','chunk','shop','spell','words','chal'][A.step];
const lim=(v,a,b)=>Math.max(a,Math.min(b,v)),inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function chunks(s,b){const out=[];let a=0;[...b,s.length].forEach(e=>{out.push(s.slice(a,e));a=e});return out}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function label(t,x,y,o={}){const g=A.ctx;let f=o.f||(A.narrow?16:19);do g.font=`700 ${f}px system-ui`;while(g.measureText(t).width>(o.w||A.W)-20&&--f>10);
 const w=Math.max(o.w||0,g.measureText(t).width+24),h=o.h||f*1.9,X=lim(x-w/2,4,A.W-w-4);g.fillStyle=o.bg||CARD;A.paint.rrect(X,y-h/2,w,h,12);g.fill();
 g.lineWidth=o.ring?3:1.5;g.strokeStyle=o.ring||'#a8a29e';g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,X+w/2,y);return{x:X,y:y-h/2,w,h}}
/* the memory box: about four slots; pieces past four spill out */
function memBox(pieces,y){const g=A.ctx,w=A.W*(A.narrow?.92:.7),x=(A.W-w)/2,h=A.H*.2,sw=(w-50)/SLOTS;g.fillStyle='#fde68a';g.strokeStyle=INK;g.lineWidth=2.5;A.paint.rrect(x,y,w,h,16);g.fill();g.stroke();
 g.fillStyle=INK;g.font='800 13px system-ui';g.textAlign='left';g.textBaseline='top';g.fillText('My memory',x+10,y+6);
 for(let i=0;i<SLOTS;i++){const sx=x+10+i*(sw+10),sy=y+h*.32,sh=h*.58,p=pieces[i];g.fillStyle=p?'#fff':'#fef3c7';g.strokeStyle=A.alpha(INK,.5);g.lineWidth=1.5;A.paint.rrect(sx,sy,sw,sh,10);g.fill();g.stroke();
  if(p)label(p,sx+sw/2,sy+sh/2,{w:sw-6,h:sh-8,bg:'#dcfce7',ring:GOOD,f:A.narrow?14:18})}
 const lost=pieces.slice(SLOTS);lost.forEach((p,i)=>label(p,x+20+i*(A.narrow?34:44)+(A.narrow?0:20),y+h+A.H*.07+(i%2)*A.H*.06,{bg:'#ffe4e6',ring:BAD,f:14,w:A.narrow?30:38}));
 if(lost.length)label(`${lost.length} fell out!`,A.W/2,y+h+A.H*.22,{ring:BAD,f:14})}
/* ---- 1: nine single numbers flood the box ---- */
function drawFlood(){label('Remember: '+NUM.split('').join(' '),A.W/2,A.H*.1,{ring:BLUE});if(V.poured)memBox(NUM.split(''),A.H*.26);else memBox([],A.H*.26)}
function pour(){if(V.poured)return tell('Only 4 single numbers fit. The other 5 fell out.');V.poured=true;A.sound.miss();tell('Pour! Only 4 numbers fit in your memory. 5 numbers fell out. Too many pieces.')}
/* ---- 2, 4, 5: split a row of tiles into chunks with breaks ---- */
const S=()=>SPLIT[phase()];
function tiles(){const s=S().s,n=s.length,tw=Math.min(52,(A.W-24)/n-4),x0=(A.W-n*(tw+4))/2;return s.split('').map((ch,i)=>({ch,x:x0+i*(tw+4)+(V.br.filter(b=>b<=i).length)*6-V.br.length*3,y:A.H*.14,w:tw,h:Math.max(44,tw*1.15)}))}
function drawSplit(){const g=A.ctx,T=tiles(),k=phase();T.forEach(t=>{g.fillStyle=TILE;g.strokeStyle='#64748b';g.lineWidth=1.5;A.paint.rrect(t.x,t.y,t.w,t.h,8);g.fill();g.stroke();g.fillStyle=INK;g.font=`800 ${Math.round(Math.min(24,t.w*.75))}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(t.ch,t.x+t.w/2,t.y+t.h/2)});
 const cg=T[V.cur]?T[V.cur].x-5:0;g.fillStyle=BLUE;g.beginPath();g.moveTo(cg,T[0].y+T[0].h+8);g.lineTo(cg-9,T[0].y+T[0].h+24);g.lineTo(cg+9,T[0].y+T[0].h+24);g.fill();
 V.br.forEach(b=>{const x=T[b].x-5;g.strokeStyle=BAD;g.lineWidth=4;g.beginPath();g.moveTo(x,T[0].y-6);g.lineTo(x,T[0].y+T[0].h+6);g.stroke()});
 const C=chunks(S().s,V.br);if(k==='chunk')memBox(C,A.H*.44);else{const y=A.H*.5;C.forEach((q,i)=>label(q,A.W*(i+1)/(C.length+1),y,{bg:S().ok(V.br)?'#dcfce7':CARD,ring:S().ok(V.br)?GOOD:null,f:A.narrow?16:20}));
  label(`${C.length} ${C.length===1?'piece':'pieces'} to remember, not ${S().s.length}`,A.W/2,A.H*.72,{f:15})}}
function toggleBreak(g){const s=S().s;if(g<1||g>=s.length)return;const i=V.br.indexOf(g);if(i>=0)V.br.splice(i,1);else V.br.push(g);V.br.sort((a,b)=>a-b);A.sound.tick();judge()}
function judge(){const k=phase(),C=chunks(S().s,V.br);if(S().ok(V.br)){V.win=true;A.sound.pop();
  return tell({chunk:`${C.join(' ')}: ${C.length} chunks. They all fit in your memory!`,spell:'yes, ter, day: 3 beats, 3 chunks. Spell one chunk at a time.',words:'cat, dog, hen: 3 words. Chunks that mean something are the easiest to remember.'}[k])}
 V.win=false;const big=C.find(q=>q.length>4),one=C.find(q=>q.length===1);
 if(k==='chunk')return tell(big?`${big} is too big for one chunk. Break it up.`:one?`${one} on its own is a whole piece. Join it to a neighbour.`:C.length>SLOTS?'Still too many pieces. Make the chunks a bit bigger.':`${C.length} chunks.`);
 if(k==='spell')return tell(V.br.length?'Say it slowly and clap: yes - ter - day. Break where the claps are.':'One long word is hard to spell. Break it into beats.');
 tell(V.br.length?'Read each chunk. Is it a real word? Look for 3 animals.':'Look for the hidden words. Put a break after each one.')}
function showSplit(){const want=S().show;V.br=[];A.redraw();want.forEach((b,i)=>setTimeout(()=>{V.cur=b;toggleBreak(b)},A.reduced()?20*(i+1):500*(i+1)))}
function gapAt(p){const T=tiles();if(p.y<T[0].y-20||p.y>T[0].y+T[0].h+30)return -1;let best=-1,d=1e9;for(let i=1;i<T.length;i++){const x=T[i].x-2,q=Math.abs(p.x-x);if(q<d){d=q;best=i}}return d<T[0].w*.9?best:-1}
/* ---- 3: sort the shopping into baskets ---- */
const items=()=>{const n=A.narrow,cols=3,w=(A.W-40)/cols,h=Math.max(44,A.H*.085);return SHOP.map((_,i)=>({x:20+(i%cols)*w,y:A.H*.12+Math.floor(i/cols)*(h+8),w:w-8,h}))};
const baskets=()=>{const w=(A.W-40)/3,h=Math.max(120,A.H*.32);return BASK.map((_,i)=>({x:16+i*(w+4),y:A.H*.96-h,w,h}))};
function drawShop(){const g=A.ctx;items().forEach((r,i)=>{if(V.put[i]!=null)return;label(SHOP[i][0],r.x+r.w/2,r.y+r.h/2,{w:r.w,h:r.h,bg:V.sel===i?'#dbeafe':CARD,ring:V.sel===i?BLUE:null,f:A.narrow?13:16})});
 baskets().forEach((b,j)=>{g.fillStyle=V.miss===j?'#ffe4e6':'#fef3c7';g.strokeStyle=INK;g.lineWidth=2;A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.stroke();label(BASK[j],b.x+b.w/2,b.y+16,{f:13,w:b.w-8});
  SHOP.forEach((s,i)=>{if(V.put[i]===j){const k=SHOP.slice(0,i).filter((_,z)=>V.put[z]===j).length;g.fillStyle=INK;g.font=`700 ${A.narrow?13:15}px system-ui`;g.textAlign='center';g.fillText(s[0],b.x+b.w/2,b.y+46+k*22,b.w-6)}})});
 const n=V.put.filter(x=>x!=null).length;label(n>8?'9 things, but only 3 groups to remember':`Sorted ${n} of 9`,A.W/2,A.H*.05,{ring:n>8?GOOD:BLUE,f:A.narrow?13:16})}
function nextItem(){return SHOP.findIndex((_,i)=>V.put[i]==null)}
function putIn(j){const i=V.sel!=null?V.sel:nextItem();if(i<0)return;const ok=SHOP[i][1]===j;if(!ok){V.miss=j;A.sound.miss();return tell(`Does ${SHOP[i][0]} go with ${BASK[j].toLowerCase()}? ${['Fruit grows on trees and plants.','Bath time things keep you clean.','Breakfast things are for the morning meal.'][SHOP[i][1]]} Try another basket.`)}
 V.put[i]=j;V.sel=null;V.miss=null;A.sound.pop();const n=V.put.filter(x=>x!=null).length;tell(n>8?'All sorted. Now you only need to remember 3 groups: fruit, bath time and breakfast. Each group helps you remember what is in it.':`${SHOP[i][0]} goes in ${BASK[j].toLowerCase()}.`)}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ede9fe',A.col.dark?.06:.4);g.fillRect(0,0,A.W,A.H);const k=phase();
 if(k==='chal'){label('Challenge',A.W/2,A.H*.14,{ring:BLUE});const Q=CQ[qn%CQ.length];if(Q)label(Q.pic,A.W/2,A.H*.5,{f:A.narrow?18:22});return}
 if(k==='flood')drawFlood();else if(k==='shop')drawShop();else drawSplit()}
function reset(){epoch++;for(const k in V)delete V[k];Object.assign(V,{poured:false,br:[],cur:1,win:false,put:SHOP.map(()=>null),sel:null,miss:null,check:()=>{}})}
function tell(t){speak(t);A.redraw();keys();V.check()}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,say,ok,msg,init){reset();Object.assign(V,init||{});speak(say);keys();V.check=ready(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},A.reduced()?30*(j+1):(ms||400)*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=phase(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='flood')B('Pour them in',pour,'Pour the 9 numbers into my memory');
 if(k==='chunk'||k==='spell'||k==='words'){const s=S().s;B('◀',()=>{V.cur=lim(V.cur-1,1,s.length-1);tell(`Gap after ${s.slice(0,V.cur)}`)},'Move the gap marker left');
  B('▶',()=>{V.cur=lim(V.cur+1,1,s.length-1);tell(`Gap after ${s.slice(0,V.cur)}`)},'Move the gap marker right');
  B(V.br.includes(V.cur)?'Join here':'Break here',()=>toggleBreak(V.cur),V.br.includes(V.cur)?'Remove the break at the marker':'Put a break at the marker')}
 if(k==='shop'){const i=V.sel!=null?V.sel:nextItem();if(i>=0)BASK.forEach((b,j)=>B(`${SHOP[i][0]} → ${b}`,()=>putIn(j),`Put ${SHOP[i][0]} in the ${b} basket`))}}
function down(p){const k=phase();
 if(k==='flood')pour();
 if(k==='chunk'||k==='spell'||k==='words'){const g=gapAt(p);if(g>0){V.cur=g;toggleBreak(g)}}
 if(k==='shop'){const i=items().findIndex((r,z)=>V.put[z]==null&&inR(p,r));if(i>=0){V.sel=i;A.sound.tick();return tell(`${SHOP[i][0]}: tap its basket.`),false}const j=baskets().findIndex(r=>inR(p,r));if(j>=0)putIn(j)}return false}
const steps=[
{h:'Too many pieces',p:'Your memory can only hold a few pieces at once. Pour these 9 numbers in, one number per piece.',
 predict:{q:'How many single numbers will fit in your memory?',opts:['all 9','about 4','none'],ans:1},task:'Pour the numbers in',
 show:()=>play(0,[pour],500),
 go:()=>enter(0,'Nine numbers to remember, and a memory box with 4 spaces.',()=>V.poured,'Your memory holds only a few pieces at a time.')},
{h:'Make chunks',p:'Tap between the numbers to break them into chunks, or use the buttons. Make every chunk fit.',
 predict:{q:'Split 358294716 into 3 chunks. Will they fit?',opts:['no, still too many','yes, 3 chunks fit','only if you shout them'],ans:1},task:'Make chunks that all fit',
 show:()=>{steps[1].go();setTimeout(showSplit,100)},
 go:()=>enter(1,'Nine numbers in a row with no breaks.',()=>V.win,'Chunks turn many pieces into a few.')},
{h:'Group a list',p:'Mum needs 9 things from the shop. Tap a thing, then its basket.',task:'Sort all 9 things',
 show:()=>play(2,SHOP.map((s,i)=>()=>{V.sel=i;putIn(s[1])}),300),
 go:()=>enter(2,'Nine shopping things and three baskets: fruit, bath time and breakfast.',()=>V.put.every(x=>x!=null),'Groups make a long list easy to remember.')},
{h:'Spell in chunks',p:'Long words are easier to spell in chunks. Break this word where you hear the beats.',
 predict:{q:'Which is easier to learn to spell?',opts:['y-e-s-t-e-r-d-a-y','yes-ter-day','both the same'],ans:1},task:'Break the word into its beats',
 show:()=>{steps[3].go();setTimeout(showSplit,100)},
 go:()=>enter(3,'The word yesterday in letter tiles.',()=>V.win,'Spell a long word one beat at a time.')},
{h:'Chunks that mean something',p:'These 9 letters hide 3 words. Break them into the words.',
 predict:{q:'Which is easier to remember?',opts:['C A T D O G H E N','cat dog hen','both the same'],ans:1},task:'Find the 3 words',
 show:()=>{steps[4].go();setTimeout(showSplit,100)},
 go:()=>enter(4,'Nine letters in a row: c a t d o g h e n.',()=>V.win,'Chunks that mean something are the best of all.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.check()});
const CQ=[
 {pic:'7 1 5 3 9 2',q:'What is the best way to remember 715392?',ans:'715 392: two chunks',bad:[['7 1 5 3 9 2: one at a time','single'],['715392: all as one','huge']]},
 {pic:'9 things to buy',q:'How can you remember a long shopping list?',ans:'sort it into a few groups',bad:[['say it once, very fast','fast'],['just hope you remember','hope']]},
 {pic:'wonderful',q:'How would you chunk the word wonderful to spell it?',ans:'won - der - ful',bad:[['w-o-n-d-e-r-f-u-l','letters'],['wonder - f - u - l','uneven']]},
 {pic:'SUNHATBED',q:'What chunks are hiding in SUNHATBED?',ans:'sun, hat, bed',bad:[['su, nha, tbed','nosense'],['sunh, atbed','nosense']]},
 {pic:'my memory',q:'Why do chunks help?',ans:'fewer pieces to hold',bad:[['they make you think faster','faster'],['memory gets bigger','bigger']]},
 {pic:'0 7 1 2 3 4 5 6',q:'Which chunks are best for 07123456?',ans:'0712 3456',bad:[['0 7 1 2 3 4 5 6','single'],['07123456','huge']]}];
function slip(t){let m='Think: fewer, smaller chunks are easier to hold.';
 if(t==='single')m='One at a time means lots of pieces. Your memory holds only about 4. Join them into chunks.';
 if(t==='huge')m='All as one is a giant piece that is hard to hold. Break it into 2 or 3 chunks.';
 if(t==='fast')m='Saying it fast still leaves lots of pieces. Group the list first.';
 if(t==='hope')m='Hoping is not a plan. Group the things, then remember the groups.';
 if(t==='letters')m='Letter by letter is 9 pieces. Clap the beats: won - der - ful is 3.';
 if(t==='uneven')m='Single letters at the end are extra pieces. Use the beats: won - der - ful.';
 if(t==='nosense')m='Those chunks do not mean anything. Look for real words: sun, hat, bed.';
 if(t==='faster')m='Chunks do not speed you up. They make fewer pieces to hold.';
 if(t==='bigger')m='Your memory stays the same size. Chunks just fit more into it.';
 return m}
function ask(){qn++;const Q=CQ[qn%CQ.length],o=[[Q.ans,'ok'],...Q.bad],r=qn%3,ord=o.slice(r).concat(o.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>score(t,Q.ans)});speak('Challenge: '+Q.q);A.redraw()}
function score(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();speak(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:Q=>{quiz.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Chunking lab controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);reset();A.gest({down});keys()}});
A.start()})})();
