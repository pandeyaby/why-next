/* Flagship – reading through critical lenses (16–18): drag each lens onto the question it asks, hunt for the phrase in
   Blake's "London" (1794) that backs each reading, sort readings of the opening of Pride and Prejudice into backed or
   not backed by the words, turn a lens dial to name the lens a critic is using, and build a critical paragraph in order. */
(()=>{const lim=(v,a,b)=>v<a?a:v>b?b:v;
 const SHORT=['Marxist','Femin.','Postcol.','Eco','Psycho'];
 const LENS=['Marxist','Feminist','Postcolonial','Ecocritical','Psychoanalytic'];
 const ASK=['Who has money and power, and who does the work?','How are women and gender roles shown?','How are empire and colonised people shown?',
  'How is nature shown, and how do people treat it?','What hidden fears or wishes drive people?'];
 const HUNT=[{l:0,claim:'Ordinary people live in a city owned and controlled by others.',ph:['I wander','charter’d street','every face I meet','midnight streets'],ans:1,
   why:'“Charter’d” means licensed or owned by charter: even the streets belong to someone with money.'},
  {l:3,claim:'Even nature has been turned into property.',ph:['Palace walls','Marriage hearse','charter’d Thames','every face I meet'],ans:2,
   why:'A river cannot be owned, yet Blake calls the Thames “charter’d”: nature is a business asset.'},
  {l:1,claim:'Young women are harmed by a society that leaves them few choices.',ph:['Soldiers sigh','youthful Harlots curse','blackning Church','charter’d street'],ans:1,
   why:'The “youthful Harlot” is pushed into selling sex, and her curse spreads harm to the next generation.'},
  {l:4,claim:'People’s own minds hold them prisoner.',ph:['mind-forg’d manacles','Chimney-sweepers cry','Palace walls','new-born Infants tear'],ans:0,
   why:'“Mind-forg’d manacles” are chains made by the mind itself: fear and habits people have taken inside.'}];
 const PP=[['Marxist: “good fortune” shows marriage treated as a money deal',0],['The narrator is mocking what “everyone” claims to know',0],
  ['Feminist: the irony hints it is really women who need a rich husband',0],['Austen hated every marriage she ever saw',1],
  ['The single man is secretly poor',1],['Ecocritical: the line is really about farming the land',1]];
 const PPWHY=['Yes: the words back it. “Good fortune”, “universally acknowledged” and the twist of “in want of a wife” are all on the page.',
  'Nothing in these words backs it. A reading has to point to the text, or it is a guess.'];
 const CRIT=[['The soldier bleeds so that the palace stays safe and rich.',0],['Elizabeth’s family may lose their home, because only a male heir can inherit it.',1],
  ['Sir Thomas’s wealth in Mansfield Park comes from Antigua, and the house goes silent when slavery is raised.',2],
  ['Soot blackens church and child alike: the city poisons air and people together.',3],['The “manacles” are fears people have locked inside their own heads.',4]];
 const PARA=['Read through a Marxist lens, London shows the poor paying for the comfort of the powerful.',
  'Blake writes that the soldier’s sigh “Runs in blood down Palace walls”.','The blood stains the palace, suggesting the rulers are guilty of the deaths of the poor who fight for them.',
  'A psychoanalytic reading might instead stress the “mind-forg’d manacles”, chains people put on their own thinking.'];
 const PARTS=['your claim through the lens','the quotation as evidence','your analysis of the words','an alternative reading'];
 const SHUF=[2,0,3,1];
VIS.reg('flaglens',c=>{let A,keys,quiz,read;
 const L0={m:0,hit:[],h:0,miss:null,p:0,ok:[],dial:2,c:0,b:[],grab:null,gx:0,gy:0,ver:0,fin:()=>{},icon:null,flash:null};
 const st=()=>['match','hunt','backed','dial','build','quiz'][A.step];
 const px=n=>A.narrow?n:n+2;
 function txt(x,s,X,Y,n,k,b,al){x.font=`${b||700} ${px(n)}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,X,Y)}
 function wrap(x,s,R,n,k,b){x.font=`${b||700} ${px(n)}px system-ui,sans-serif`;const ls=[];let cur='';for(const w of s.split(' ')){const t=cur?cur+' '+w:w;if(cur&&x.measureText(t).width>R.w-18){ls.push(cur);cur=w}else cur=t}ls.push(cur);
  const lh=px(n)*1.25;ls.forEach((l,i)=>txt(x,l,R.x+R.w/2,R.y+R.h/2+(i-(ls.length-1)/2)*lh,n,k,b))}
 function card(x,R,k,bold,a){x.fillStyle=A.mix(A.col.pn,k,a==null?.12:a);A.paint.rrect(R.x,R.y,R.w,R.h,10);x.fill();x.lineWidth=bold?3.5:1.5;x.strokeStyle=k;x.stroke()}
 const inR=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
 const top=()=>({x:14,y:A.H*.03,w:A.W-28,h:A.H*.2});
 const askR=i=>{const h=A.H*.122;return{x:10,y:A.H*.3+i*(h+5),w:A.W-20,h}};
 const phR=i=>{const g=8,w=(A.W-3*g)/2,h=A.H*.17;return{x:g+(i%2)*(w+g),y:A.H*.42+Math.floor(i/2)*(h+g),w,h}};
 const binR=i=>{const g=8,w=(A.W-3*g)/2;return{x:g+i*(w+g),y:A.H*.56,w,h:A.H*.4}};
 const strip=()=>({x:12,y:A.H*.64,w:A.W-24,h:A.H*.13});
 const segX=i=>{const S=strip();return S.x+S.w*(i+.5)/5};
 const rowR=i=>{const h=A.H*.17;return{x:10,y:A.H*.2+i*(h+6),w:A.W-20,h}};
 function matchD(x){const C=A.col;
  ASK.forEach((q,i)=>{const R=askR(i),d=L0.hit.includes(i),bad=L0.miss===i;card(x,R,d?C.gr:bad?C.rd:C.cy,d||bad,d?.24:.08);wrap(x,(d?'✓ '+LENS[i]+': ':'')+q,R,11,C.tx,d?800:600)});
  if(L0.m<5){const T=top(),R=L0.grab==='card'?{x:L0.gx-T.w*.3,y:L0.gy-T.h*.4,w:T.w*.6,h:T.h*.8}:{x:T.x+T.w*.2,y:T.y,w:T.w*.6,h:T.h*.8};
   card(x,R,C.vi,1,.28);txt(x,'🔍 '+LENS[L0.m],R.x+R.w/2,R.y+R.h/2,16,C.tx,900);if(L0.grab!=='card')txt(x,'drag me to my question',A.W/2,T.y+T.h*.93,11,C.mu,700)}
  else txt(x,'All five lenses matched',A.W/2,A.H*.12,16,C.gr,800)}
 function huntD(x){const C=A.col,T={x:12,y:A.H*.03,w:A.W-24,h:A.H*.3};
  if(L0.h<HUNT.length){const H0=HUNT[L0.h];card(x,T,C.vi,1,.2);txt(x,LENS[H0.l]+' reading '+(L0.h+1)+' of 4',A.W/2,T.y+16,11,C.mu,800);
   wrap(x,'“'+H0.claim+'”',{x:T.x,y:T.y+22,w:T.w,h:T.h-22},13,C.tx,800);txt(x,'Tap the phrase from London that backs it best',A.W/2,A.H*.375,11,C.mu,700);
   H0.ph.forEach((p,i)=>{const R=phR(i),bad=L0.miss===i;card(x,R,bad?C.rd:C.am,bad,.1);wrap(x,(bad?'✗ ':'')+'“'+p+'”',R,13,C.tx,800)})}
  else{txt(x,'Four readings, one poem, all backed',A.W/2,A.H*.3,15,C.gr,800);txt(x,'by Blake’s own words',A.W/2,A.H*.38,13,C.gr,700)}}
 function backedD(x){const C=A.col;wrap(x,'“It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.”',{x:6,y:0,w:A.W-12,h:A.H*.12},10,C.mu,600);
  if(L0.p<PP.length){const T={x:14,y:A.H*.13,w:A.W-28,h:A.H*.3},R=L0.grab==='pp'?{x:L0.gx-T.w*.35,y:L0.gy-T.h*.35,w:T.w*.7,h:T.h*.7}:T;card(x,R,L0.miss!=null?C.rd:C.vi,1,.22);wrap(x,PP[L0.p][0],R,13,C.tx,800)}
  else txt(x,'All six readings sorted',A.W/2,A.H*.28,16,C.gr,800);
  ['Backed by the words','Not backed'].forEach((b,i)=>{const B=binR(i);card(x,B,i?C.rd:C.gr,0,.07);txt(x,b,B.x+B.w/2,B.y+15,12,C.tx,900);
   L0.ok.filter(j=>PP[j][1]===i).forEach((j,k)=>txt(x,'✓ reading '+(j+1),B.x+B.w/2,B.y+38+k*20,11,C.mu,700))})}
 function dialD(x){const C=A.col,T={x:12,y:A.H*.03,w:A.W-24,h:A.H*.4},S=strip();
  if(L0.c<CRIT.length){card(x,T,C.vi,1,.2);txt(x,'Critic '+(L0.c+1)+' of 5 says:',A.W/2,T.y+15,11,C.mu,800);wrap(x,'“'+CRIT[L0.c][0]+'”',{x:T.x,y:T.y+20,w:T.w,h:T.h-20},13,C.tx,800);
   txt(x,'Turn the dial to the lens they are using',A.W/2,A.H*.47,11,C.mu,700)}else txt(x,'All five critics named',A.W/2,A.H*.22,16,C.gr,800);
  x.fillStyle=A.alpha(C.mu,.16);A.paint.rrect(S.x,S.y,S.w,S.h,S.h/2);x.fill();txt(x,'🔍 '+LENS[Math.round(L0.dial)],A.W/2,S.y-18,15,C.vi,900);
  LENS.forEach((l,i)=>{const X=segX(i),on=Math.round(L0.dial)===i;txt(x,A.narrow?SHORT[i]:l,X,S.y+S.h+14,10,on?C.vi:C.mu,on?900:700);
   x.fillStyle=on?C.vi:A.alpha(C.mu,.5);x.beginPath();x.arc(X,S.y+S.h/2,4,0,7);x.fill()});
  const X=S.x+S.w*(L0.dial+.5)/5;A.paint.ball(X,S.y+S.h/2,S.h*.48,L0.flash==='bad'?C.rd:L0.flash==='ok'?C.gr:C.am);txt(x,'🔍',X,S.y+S.h/2,14,'#000')}
 function buildD(x){const C=A.col;txt(x,L0.b.length<4?`Tap sentence ${L0.b.length+1}: ${PARTS[L0.b.length]}`:'Paragraph built',A.W/2,A.H*.08,12,L0.b.length<4?C.tx:C.gr,800);
  SHUF.forEach((s,i)=>{const R=rowR(i),n=L0.b.indexOf(s),bad=L0.miss===i;card(x,R,n>=0?C.gr:bad?C.rd:C.cy,n>=0||bad,n>=0?.22:.08);
   if(n>=0)txt(x,String(n+1),R.x+14,R.y+R.h/2,14,C.gr,900);wrap(x,PARA[s],{x:R.x+18,y:R.y,w:R.w-18,h:R.h},10,C.tx,n>=0?700:600)})}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);x.fillRect(0,0,W,H);
  const f={match:matchD,hunt:huntD,backed:backedD,dial:dialD,build:buildD}[st()];if(f)f(x);else txt(x,L0.icon||'🔍',W/2,H/2,Math.min(W,H)*.22,'#000');A.fx.draw(x)}
 function nope(i,m){A.sound.miss();L0.miss=i;const v=L0.ver;setTimeout(()=>{if(v===L0.ver){L0.miss=null;A.redraw()}},800);tell(m)}
 function match(q){if(L0.m>=5)return;if(q!==L0.m)return nope(q,`Not that one. ${LENS[L0.m]} critics ask: ${ASK[L0.m]}`);L0.hit.push(q);L0.m++;A.sound.pop();tell(`Yes: ${LENS[q]} asks “${ASK[q]}”`)}
 function hunt(i){if(L0.h>=HUNT.length)return;const H0=HUNT[L0.h];if(i!==H0.ans)return nope(i,`“${H0.ph[i]}” does not really back this claim. Look for the words that do the work.`);L0.h++;A.sound.pop();tell(H0.why)}
 function sort(b){if(L0.p>=PP.length)return;const want=PP[L0.p][1];if(b!==want)return nope(1,(want?'Look again: what words on the page back that? ':'Look again: the words do back this. ')+PPWHY[want]);L0.ok.push(L0.p);L0.p++;A.sound.pop();tell(PPWHY[b])}
 function turn(v){L0.dial=lim(v,0,4);A.redraw()}
 function name(i){if(L0.c>=CRIT.length)return;turn(i);const want=CRIT[L0.c][1],v=L0.ver;if(i!==want){L0.flash='bad';setTimeout(()=>{if(v===L0.ver){L0.flash=null;A.redraw()}},700);
   return nope(null,`That critic is not asking “${ASK[i]}” Which question are they answering?`)}L0.flash='ok';setTimeout(()=>{if(v===L0.ver){L0.flash=null;A.redraw()}},500);L0.c++;A.sound.pop();tell(`Yes: ${LENS[i]}, asking “${ASK[i]}”`)}
 function place(i){const s=SHUF[i];if(L0.b.includes(s)||L0.b.length>=4)return;const want=L0.b.length;if(s!==want)return nope(i,`Not yet. Sentence ${want+1} should be ${PARTS[want]}. This one is ${PARTS[s]}.`);L0.b.push(s);A.sound.pop();tell(`Sentence ${want+1}: ${PARTS[s]}.`)}
 function tell(m){const k=st();let s;
  if(k==='match')s=L0.m<5?`Lens: ${LENS[L0.m]}. ${L0.m} of 5 matched.`:'All five lenses matched.';
  else if(k==='hunt')s=L0.h<4?`${LENS[HUNT[L0.h].l]} reading: ${HUNT[L0.h].claim} Phrases: ${HUNT[L0.h].ph.join(', ')}. ${L0.h} of 4 found.`:'All four readings backed.';
  else if(k==='backed')s=L0.p<6?`Reading: ${PP[L0.p][0]}. ${L0.p} of 6 sorted.`:'All six readings sorted.';
  else if(k==='dial')s=(L0.c<5?`Critic: ${CRIT[L0.c][0]} `:'All five critics named. ')+`Dial on ${LENS[Math.round(L0.dial)]}.`;
  else if(k==='build')s=L0.b.length<4?`${L0.b.length} of 4 sentences placed. Next: ${PARTS[L0.b.length]}.`:'Paragraph built in order.';else s='Challenge time.';
  s=(m?m+' ':'')+s;c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=s;pads();L0.fin()}
 function pads(){if(!A||!keys)return;keys.innerHTML='';const k=st();
  const add=(s,f,lab)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},keys,s).onclick=f};
  if(k==='match'&&L0.m<5)LENS.forEach((l,i)=>add(ASK[i],()=>match(i),`${LENS[L0.m]} asks: ${ASK[i]}`));
  if(k==='hunt'&&L0.h<4)HUNT[L0.h].ph.forEach((p,i)=>add('“'+p+'”',()=>hunt(i),'Evidence: '+p));
  if(k==='backed'&&L0.p<6){add('Backed by the words',()=>sort(0));add('Not backed',()=>sort(1))}
  if(k==='dial'&&L0.c<5)LENS.forEach((l,i)=>add(l,()=>name(i),'Lens: '+l));
  if(k==='build'&&L0.b.length<4)SHUF.forEach((s,i)=>{if(!L0.b.includes(s))add(PARA[s],()=>place(i),'Place: '+PARA[s])});A.redraw()}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const seq=(fs,ms)=>{const v=L0.ver;fs.forEach((f,j)=>setTimeout(()=>{if(v===L0.ver)f()},A.reduced()?j*25:j*ms))};
 const reset=()=>{L0.ver++;L0.fin=()=>{};L0.icon=null;L0.miss=null;L0.grab=null;L0.flash=null};
 const steps=[
  {h:'A lens is a question',p:'A critical lens is a set of questions you bring to a text. Drag each lens onto the question it asks.',
   predict:{q:'If you read a poem through a feminist lens, are you claiming that was the author’s plan?',opts:['Yes: a lens shows what the author meant','No: it is a question you bring to the text'],ans:1},task:'Match all five lenses',
   show:()=>{steps[0].go();seq([0,1,2,3,4].map(i=>()=>match(i)),450)},go:()=>{reset();L0.m=0;L0.hit=[];tell();L0.fin=fin(0,()=>L0.m>=5,()=>'Each lens asks its own question: power and money, gender, empire, nature, or the hidden mind. It is a tool you choose, not a claim about the author’s plan.')}},
  {h:'Hunt the evidence',p:'William Blake wrote London in 1794. Four critics read it four ways. Find the phrase that backs each reading.',
   predict:{q:'Can one poem support more than one strong reading?',opts:['No: there is one right reading','Yes: if each is backed by the words'],ans:1},task:'Back all four readings',
   show:()=>{steps[1].go();seq(HUNT.map(H0=>()=>hunt(H0.ans)),550)},go:()=>{reset();L0.h=0;tell();L0.fin=fin(1,()=>L0.h>=4,()=>'One poem, four strong readings. Each lens notices different words, and each reading is anchored in a phrase Blake really wrote.')}},
  {h:'Backed or not?',p:'Here is the famous first line of Pride and Prejudice (1813). Drag each reading into a box: is it backed by the words?',
   predict:{q:'Once you choose a lens, is any reading as good as any other?',opts:['Yes: it is all opinion','No: it still needs evidence from the text'],ans:1},task:'Sort all six readings',
   show:()=>{steps[2].go();seq(PP.map(r=>()=>sort(r[1])),450)},go:()=>{reset();L0.p=0;L0.ok=[];tell();L0.fin=fin(2,()=>L0.p>=6,()=>'Many readings are possible, but not anything goes. A reading is strong when you can point to the words that back it.')}},
  {h:'Turn the lens',p:'Real critics rarely name their lens. Read each one, then drag the dial to the lens they are using.',task:'Name the lens for all five critics',
   show:()=>{steps[3].go();seq(CRIT.map(r=>()=>name(r[1])),550)},go:()=>{reset();L0.c=0;L0.dial=2;tell();L0.fin=fin(3,()=>L0.c>=5,()=>'You can spot a lens from the question a critic is answering: who has power, how gender works, what empire hides, how nature is used, or what the mind conceals.')}},
  {h:'Build the paragraph',p:'A strong critical paragraph has four moves. Tap the sentences in the right order.',
   predict:{q:'What should come straight after your claim?',opts:['A quotation that backs it','A different reading'],ans:0},task:'Put all four sentences in order',
   show:()=>{steps[4].go();seq([1,3,0,2].map(i=>()=>place(i)),500)},go:()=>{reset();L0.b=[];tell();L0.fin=fin(4,()=>L0.b.length>=4,()=>'Claim through a lens, quotation, close analysis of the words, then an alternative reading. Weighing other readings is what lifts an essay to the top band.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>L0.fin()});
 const QS=[['A classmate says your feminist reading of London is wrong because Blake was not a feminist. Best reply?','💬',[['A lens reading is judged on evidence in the text, not on the author’s views','ok'],['You are right: only the author’s intention counts','intent'],['Every reading is right, so it does not matter','any']]],
  ['Which lens asks who has money and power, and who does the work?','🏭',[['Marxist','ok'],['Ecocritical','eco'],['Psychoanalytic','psy']]],
  ['A critic says the river in a poem shows people treating nature as something to own. Which lens is that?','🌊',[['Ecocritical','ok'],['Feminist','fem'],['Postcolonial','post']]],
  ['Your reading of a novel is exciting, but you cannot find any words in it that back it up. What should you do?','📖',[['Drop or change it: a reading needs textual evidence','ok'],['Keep it: lenses let you say anything','free'],['Say the author secretly meant it','secret']]],
  ['What makes a lens essay reach the top band?','🏆',[['Weighing your reading against another one','ok'],['Using as many lenses as possible in one paragraph','many'],['Retelling the plot in detail','plot']]]];
 let qn=-1,run=0;
 function ask(){qn++;const[q,ic,ops]=QS[qn%QS.length],r=qn%3;L0.icon=ic;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});c.say('Challenge: '+q);A.redraw()}
 function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';let m='Right.';
  if(t==='intent')m='A lens is a question you bring, not a claim about what Blake planned. Readers judge it on the words.';
  if(t==='any')m='Not every reading is right. The strong ones point to words in the text.';
  if(t==='eco')m='Ecocritics ask how nature is shown. Money and work is the Marxist question.';
  if(t==='psy')m='Psychoanalytic critics look for hidden fears and wishes. Money and work is Marxist.';
  if(t==='fem')m='Feminist critics look at gender. Nature as property is the ecocritical question.';
  if(t==='post')m='Postcolonial critics look at empire. Nature as property is the ecocritical question.';
  if(t==='free')m='A lens opens new questions, but the answers still have to come from the text.';
  if(t==='secret')m='You cannot prove a secret plan. Look for words on the page instead.';
  if(t==='many')m='Piling up lenses makes it thin. Develop one reading, then weigh it against another.';
  if(t==='plot')m='Retelling is not analysing. Examiners reward a reading weighed against another.';
 
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const k=st();
  if(k==='match'&&L0.m<5){const T=top();if(inR(p,{x:T.x+T.w*.2,y:T.y,w:T.w*.6,h:T.h*.8})){L0.grab='card';L0.gx=p.x;L0.gy=p.y;A.redraw();return true}const q=ASK.findIndex((a,i)=>inR(p,askR(i)));if(q>=0)match(q);return false}
  if(k==='hunt'){const i=[0,1,2,3].find(i=>inR(p,phR(i)));if(i!=null)hunt(i);return false}
  if(k==='backed'&&L0.p<6){if(inR(p,{x:14,y:A.H*.13,w:A.W-28,h:A.H*.3})){L0.grab='pp';L0.gx=p.x;L0.gy=p.y;A.redraw();return true}const b=[0,1].find(i=>inR(p,binR(i)));if(b!=null)sort(b);return false}
  if(k==='dial'){const S=strip();if(inR(p,{x:S.x-10,y:S.y-24,w:S.w+20,h:S.h+48})){L0.grab='dial';move(p);return true}return false}
  if(k==='build'){const i=[0,1,2,3].find(i=>inR(p,rowR(i)));if(i!=null)place(i);return false}return false}
 function move(p){if(!L0.grab)return;if(L0.grab==='dial'){const S=strip();return turn((p.x-S.x)/S.w*5-.5)}L0.gx=p.x;L0.gy=p.y;A.redraw()}
 function up(p){const g=L0.grab;L0.grab=null;if(g==='card'){const q=ASK.findIndex((a,i)=>inR(p||{x:L0.gx,y:L0.gy},askR(i)));if(q>=0)match(q);else A.redraw()}
  if(g==='pp'){const b=[0,1].find(i=>inR(p||{x:L0.gx,y:L0.gy},binR(i)));if(b!=null)sort(b);else A.redraw()}
  if(g==='dial'&&L0.c<5)name(Math.round(L0.dial))}
 A=FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:A=>{const q=A.step===5;quiz.hidden=!q;read.hidden=q;keys.hidden=q;pads()},
  init:A=>{const E=c.el,hold=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},hold);quiz=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});pads()}});
 A.start()})})();
