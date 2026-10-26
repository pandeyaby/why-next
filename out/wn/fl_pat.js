/* Flagship 61 – spotting patterns (ages 7–8): find the part that repeats and fill the gaps (not "the last one again");
   test number rules against every number, not just the first two; try the -ed pattern on verbs and see where it breaks
   (run, go); ask for one more number before deciding between two rules that both fit; build a pattern of your own.
   Challenge: what comes next, next number, size of the repeating part, enough evidence?, -ed slips, why it works. */
(()=>{const SH=[['red circle','#ef4444'],['blue square','#3b82f6'],['yellow triangle','#eab308'],['green diamond','#16a34a']];
 const UNIT=[0,1,1],SEEN=7,LEN=10,SEQ=[2,4,8],TILES=[10,12,16];
 const RULES=[['Add 2',v=>v+2],['Add 4',v=>v+4],['Double',v=>v*2]];
 const WORDS=[['jump',1],['play',1],['run',0,'ran'],['walk',1],['go',0,'went'],['help',1]];
 const MORE=[1,2,4,7,11,16],GUESS=[['Double each time',[8,16,32]],['Add 1 more each time',[7,11,16]]];
VIS.reg('flagpat',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const G={rep:[],rule:-1,tested:[],put:null,w:{},shown:3,pick:-1,mk:[0,1],dr:null,dp:null,tok:0,want:()=>{},said:'',flash:0,Q:null};
 const tell=t=>{G.said=t;c.say(t);if(read){read.textContent=t;A.cv.setAttribute('aria-label',t)}};
 const mode=()=>['rep','num','word','more','make','q'][A.step];
 const ft=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=a||'center';x.textBaseline='middle'};
 const nm=k=>SH[k][0];
 const want=i=>UNIT[i%UNIT.length];
 function shape(x,k,cx,cy,r){x.fillStyle=SH[k][1];x.strokeStyle='#1f2937';x.lineWidth=2;x.beginPath();
  if(k===0)x.arc(cx,cy,r,0,7);else if(k===1)x.rect(cx-r*.85,cy-r*.85,r*1.7,r*1.7);
  else if(k===2){x.moveTo(cx,cy-r);x.lineTo(cx+r,cy+r*.8);x.lineTo(cx-r,cy+r*.8);x.closePath()}
  else{x.moveTo(cx,cy-r);x.lineTo(cx+r,cy);x.lineTo(cx,cy+r);x.lineTo(cx-r,cy);x.closePath()}x.fill();x.stroke()}
 // n boxes laid out in rows of `per`, centred, starting at y0
 function grid(n,per,y0,sz,gap){const o=[];for(let i=0;i<n;i++){const r=Math.floor(i/per),k=Math.min(per,n-r*per),w=k*sz+(k-1)*gap,x0=(A.W-w)/2;
  o.push({x:x0+(i%per)*(sz+gap),y:y0+r*(sz+gap),w:sz,h:sz,i})}return o}
 const per=n=>A.narrow&&n>6?(n===LEN?6:Math.ceil(n/2)):n;
 const box=(n,y0)=>{const p=per(n),sz=Math.min(62,(A.W-24)/p-8);return grid(n,p,y0,sz,8)};
 const tray=(n,y)=>grid(n,n,y,Math.min(66,(A.W-30)/n-12),14);
 const inR=(p,r)=>p&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 function cell(x,r,fill,stroke){x.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);x.fill();x.strokeStyle=stroke;x.lineWidth=2;x.stroke()}
 function status(){const m=mode();let t;
  if(m==='rep'){const s=[...Array(LEN)].map((_,i)=>i<SEEN?nm(want(i)):G.rep[i-SEEN]!=null?nm(G.rep[i-SEEN]):'gap');t=`Pattern: ${s.join(', ')}.`}
  else if(m==='num')t=`Numbers: 2, 4, 8, ${G.put==null?'gap':G.put}. `+(G.rule<0?'No rule tested yet.':`Testing "${RULES[G.rule][0]}": `+SEQ.slice(0,2).map((v,i)=>`${v} gives ${RULES[G.rule][1](v)}, ${RULES[G.rule][1](v)===SEQ[i+1]?'fits':'does not fit'}`).join('; ')+'.');
  else if(m==='word')t='Words: '+WORDS.map(([w,ok,irr])=>G.w[w]?(ok?w+'ed':`${irr}, not ${w}${w==='run'?'n':''}ed`):w).join(', ')+'.';
  else if(m==='more')t=`Numbers: ${MORE.slice(0,G.shown).join(', ')}, then hidden. `+(G.pick<0?'':`You picked: ${GUESS[G.pick][0]}.`);
  else if(m==='make')t=G.mk.length?`Your part that repeats: ${G.mk.map(nm).join(', ')}. It repeats ${Math.floor(12/G.mk.length)} times in 12.`:'Your part that repeats is empty. Add shapes.';
  else t=G.said;tell(t);sync();G.want()}
 function repView(x){const C=A.col,S=box(LEN,A.H*.1);ft(x,700,14,'left');x.fillStyle=C.mu;x.fillText('Fill the gaps:',12,A.H*.05);
  S.forEach((r,i)=>{const gap=i>=SEEN,v=gap?G.rep[i-SEEN]:want(i);cell(x,r,gap?A.alpha(C.ac,.12):A.alpha(C.tx,.05),gap&&v==null?C.ac:A.alpha(C.tx,.25));if(v!=null)shape(x,v,r.x+r.w/2,r.y+r.h/2,r.w*.32)});
  if(G.rep.filter(v=>v!=null).length===LEN-SEEN&&G.rep.every((v,j)=>v===want(SEEN+j))){x.strokeStyle=C.gr;x.lineWidth=3;
   for(let u=0;u*3<LEN-1;u++){const a=S[u*3],b=S[Math.min(LEN-1,u*3+2)];if(!a||!b||b.y!==a.y)continue;const y=a.y+a.h+6;const l=a.x+3,r=b.x+b.w-3;x.beginPath();x.moveTo(l,y);x.lineTo(l,y+6);x.lineTo(r,y+6);x.lineTo(r,y);x.stroke()}}
  trayView(x,[0,1,2],A.H*.7)}
 function trayView(x,ks,y){tray(ks.length,y).forEach((r,j)=>{const d=G.dr===ks[j]&&G.dp;const cx=d?G.dp.x:r.x+r.w/2,cy=d?G.dp.y:r.y+r.h/2;
  cell(x,{x:cx-r.w/2,y:cy-r.h/2,w:r.w,h:r.h},A.col.pn,A.col.cy);shape(x,ks[j],cx,cy,r.w*.32)})}
 const ruleR=()=>RULES.map((_,i)=>{const w=(A.W-40)/3;return{x:12+i*(w+8),y:A.H*.44,w,h:48,i}});
 function numView(x){const C=A.col,S=box(4,A.H*.08),f=G.rule>=0?RULES[G.rule][1]:null;
  [...SEQ,G.put].forEach((v,i)=>{const r=S[i];cell(x,r,i===3?A.alpha(C.ac,.12):A.alpha(C.tx,.05),i===3?C.ac:A.alpha(C.tx,.25));ft(x,800,24);x.fillStyle=C.tx;x.fillText(v==null?'?':v,r.x+r.w/2,r.y+r.h/2)});
  if(f)SEQ.forEach((v,i)=>{const a=S[i],b=S[i+1];if(!b||b.y!==a.y)return;const p=f(v),ok=i<2?p===SEQ[i+1]:G.put==null?null:p===G.put;if(ok==null)return;
   const y=a.y+a.h+18,mx=(a.x+a.w+b.x)/2;ft(x,800,14);x.fillStyle=ok?C.gr:C.rd;x.fillText(`→${p} ${ok?"✓":"✗"}`,mx,y)});
  ruleR().forEach(r=>{const on=G.rule===r.i;cell(x,r,on?A.alpha(C.vi,.25):A.alpha(C.vi,.08),C.vi);ft(x,700,A.narrow?14:16);x.fillStyle=C.tx;x.fillText(RULES[r.i][0],r.x+r.w/2,r.y+24)});
  ft(x,600,13);x.fillStyle=C.mu;x.fillText('Tap a rule to test it. Drag a number into the ?',A.W/2,A.H*.62);
  tray(3,A.H*.7).forEach((r,j)=>{if(G.put===TILES[j])return;const d=G.dr==='t'+j&&G.dp,cx=d?G.dp.x:r.x+r.w/2,cy=d?G.dp.y:r.y+r.h/2;cell(x,{x:cx-r.w/2,y:cy-r.h/2,w:r.w,h:r.h},C.pn,C.cy);ft(x,800,22);x.fillStyle=C.tx;x.fillText(TILES[j],cx,cy)})}
 const wordR=()=>{const w=(A.W-36)/2,h=Math.min(60,A.H*.16);return WORDS.map((_,i)=>({x:12+(i%2)*(w+12),y:A.H*.3+Math.floor(i/2)*(h+10),w,h,i}))};
 const edR=()=>({x:A.W/2-50,y:A.H*.06,w:100,h:52});
 function wordView(x){const C=A.col,e=edR(),d=G.dr==='ed'&&G.dp,ex=d?G.dp.x-50:e.x,ey=d?G.dp.y-26:e.y;
  cell(x,{x:ex,y:ey,w:100,h:52},A.alpha(C.or,.25),C.or);ft(x,800,22);x.fillStyle=C.tx;x.fillText('+ ed',ex+50,ey+26);
  wordR().forEach(r=>{const[w,ok,irr]=WORDS[r.i],dn=G.w[w];cell(x,r,!dn?C.pn:ok?A.alpha(C.gr,.18):A.alpha(C.or,.18),!dn?C.cy:ok?C.gr:C.or);
   ft(x,800,A.narrow?18:22);x.fillStyle=C.tx;x.fillText(!dn?w:ok?w+'ed ✓':irr+' !',r.x+r.w/2,r.y+r.h/2-(dn&&!ok?8:0));
   if(dn&&!ok){ft(x,600,12);x.fillText(`not ${w}${w==='run'?'n':''}ed`,r.x+r.w/2,r.y+r.h/2+14)}})}
 const moreR=()=>box(6,A.H*.06);
 const guessR=()=>{const w=(A.W-36)/2;return GUESS.map((_,i)=>({x:12+i*(w+12),y:A.H*.58,w,h:Math.min(96,A.H*.26),i}))};
 function moreView(x){const C=A.col,S=moreR();
  S.forEach((r,i)=>{const on=i<G.shown;cell(x,r,on?A.alpha(C.tx,.05):A.alpha(C.ac,.12),on?A.alpha(C.tx,.25):C.ac);ft(x,800,22);x.fillStyle=C.tx;x.fillText(on?MORE[i]:'?',r.x+r.w/2,r.y+r.h/2)});
  if(G.shown>3)for(let i=0;i<G.shown-1;i++){const a=S[i],b=S[i+1];if(b.y!==a.y)continue;ft(x,800,13);x.fillStyle=C.vi;x.fillText('+'+(MORE[i+1]-MORE[i]),(a.x+a.w+b.x)/2,a.y-0+a.h+14)}
  guessR().forEach(r=>{const[g,p]=GUESS[r.i],dead=G.shown>3&&p[0]!==MORE[3],on=G.pick===r.i;cell(x,r,on?A.alpha(C.vi,.22):A.alpha(C.vi,.07),dead?C.rd:C.vi);
   ft(x,700,A.narrow?13:16);x.fillStyle=C.tx;x.fillText(g,r.x+r.w/2,r.y+22);ft(x,600,A.narrow?13:15);x.fillText('says next: '+p.slice(0,2).join(', ')+(dead?' ✗':''),r.x+r.w/2,r.y+50)})}
 function makeView(x){const C=A.col,U=grid(4,4,A.H*.06,Math.min(58,(A.W-60)/4),10);ft(x,600,13);x.fillStyle=C.mu;
  U.forEach((r,i)=>{cell(x,r,A.alpha(C.ac,.1),C.ac);if(G.mk[i]!=null)shape(x,G.mk[i],r.x+r.w/2,r.y+r.h/2,r.w*.32)});
  const R=grid(12,A.narrow?6:12,A.H*.32,Math.min(44,(A.W-24)/(A.narrow?6:12)-6),6);
  R.forEach((r,i)=>{cell(x,r,A.alpha(C.tx,.04),A.alpha(C.tx,.2));if(G.mk.length)shape(x,G.mk[i%G.mk.length],r.x+r.w/2,r.y+r.h/2,r.w*.3)});trayView(x,[0,1,2,3],A.H*.72)}
 function qView(x){const Q=G.Q;if(!Q||!Q.vis)return;const C=A.col,v=Q.vis,S=box(v.length,A.H*.3);
  v.forEach((k,i)=>{const r=S[i];cell(x,r,k==='?'?A.alpha(C.ac,.12):A.alpha(C.tx,.05),k==='?'?C.ac:A.alpha(C.tx,.25));
   if(Q.num||k==='?'){ft(x,800,20);x.fillStyle=C.tx;x.fillText(k,r.x+r.w/2,r.y+r.h/2)}else shape(x,k,r.x+r.w/2,r.y+r.h/2,r.w*.32)})}
 function draw(A){const{ctx:x,W,H,col:C}=A,m=mode();x.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.04:.4);x.fillRect(0,0,W,H);
  ({rep:repView,num:numView,word:wordView,more:moreView,make:makeView,q:qView})[m](x);
  if(G.flash>0){x.strokeStyle=A.alpha(C.gr,G.flash);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 const glow=()=>{G.flash=1;A.tween(G,{flash:0},900,'out')};
 const fresh=()=>{G.tok++;G.want=()=>{};G.Q=null;G.dr=null};
 // put shape k in the first gap (or gap j)
 function place(k,j){if(j==null)j=G.rep.findIndex(v=>v==null);if(j<0||j>=LEN-SEEN)j=[0,1,2].find(i=>G.rep[i]==null);if(j==null)return;
  const pos=SEEN+j,need=want(pos),prev=pos?(G.rep[j-1]!=null?G.rep[j-1]:want(pos-1)):null;
  if(k!==need){A.sound.miss();tell(k===2?'Yellow is not in this pattern at all. Use only shapes from the part that repeats.':k===prev?`Not just the last one again. Find the part that repeats: ${UNIT.map(nm).join(', ')}.`:`This gap needs a ${nm(need)}. The part that repeats is ${UNIT.map(nm).join(', ')}.`);return}
  G.rep[j]=k;A.sound.pop();if(G.rep.filter(v=>v!=null).length===LEN-SEEN)glow();status()}
 function rule(i){G.rule=i;if(!G.tested.includes(i))G.tested.push(i);A.sound.tick();status();
  const f=RULES[i][1];if(f(SEQ[0])===SEQ[1]&&f(SEQ[1])!==SEQ[2])tell(`${RULES[i][0]} works for 2 to 4, but 4 gives ${f(4)}, not 8. A rule must fit every number.`);
  else if(f(SEQ[1])===SEQ[2])tell(`${RULES[i][0]}: 2 gives 4, 4 gives 8. It fits every number!`);else tell(`${RULES[i][0]}: 2 gives ${f(2)}, not 4. It does not fit.`)}
 function putN(j){const v=TILES[j];G.put=v;G.dr=null;if(v!==16){A.sound.miss();status();tell(v===10?'10 is 8 add 2. But 4 add 2 is 6, not 8, so add 2 does not fit.':'12 is 8 add 4. But 2 add 4 is 6, not 4, so add 4 does not fit.');return}A.sound.pop();glow();status()}
 function ed(i){const[w,ok,irr]=WORDS[i];if(G.w[w])return;G.w[w]=1;G.dr=null;status();
  if(ok){A.sound.pop();tell(`${w} + ed = ${w}ed. The pattern works.`)}else{A.sound.miss();tell(`We say ${irr}, not ${w}${w==='run'?'n':''}ed. A pattern helps you guess, then check it sounds right.`)}}
 function more(){if(G.shown<MORE.length){G.shown++;A.sound.tick();status();if(G.shown===4)tell('The next number is 7. Double would give 8, so double does not fit. The jumps grow: +1, +2, +3.')}}
 function pick(i){G.pick=i;if(G.shown<4){G.pick=-1;A.sound.miss();status();tell('Both rules fit 1, 2, 4! You need one more number to be sure. Tap Show the next number.');return}
  if(GUESS[i][1][0]!==MORE[3]){A.sound.miss();status();tell(`Double says 8, but the next number is ${MORE[3]}. Pick the rule that fits every number.`);return}A.sound.pop();glow();status()}
 function mk(k){if(G.mk.length>=4){A.sound.miss();tell('Four shapes is the most. Tap Clear to start again.');return}G.mk.push(k);A.sound.pop();status()}
 function sync(){if(!A)return;if(A.step!==5)A.cv.setAttribute('aria-label',G.said);if(!pad)return A.redraw();pad.innerHTML='';const m=mode();
  const B=(t,f,dis,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!dis;e.onclick=f};
  if(m==='rep'){[0,1,2].forEach(k=>B('Add '+nm(k),()=>place(k),G.rep.filter(v=>v!=null).length>=3));B('Start again',()=>{G.rep=[];status()})}
  if(m==='num'){RULES.forEach((r,i)=>B('Test: '+r[0],()=>rule(i)));TILES.forEach((v,j)=>B('Put '+v,()=>putN(j)))}
  if(m==='word')WORDS.forEach(([w],i)=>B(w+' + ed',()=>ed(i),G.w[w]));
  if(m==='more'){B('Show the next number',more,G.shown>=MORE.length);GUESS.forEach((g,i)=>B('Pick: '+g[0],()=>pick(i)))}
  if(m==='make'){[0,1,2,3].forEach(k=>B('Add '+nm(k),()=>mk(k)));B('Clear',()=>{G.mk=[];status()})}A.redraw()}
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&(!steps[st].predict||A.pred[st]!=null)){A.done(msg()+A.reveal(st))}};
 const later=(fs,ms)=>{const k=G.tok;fs.forEach((f,j)=>setTimeout(()=>{if(k===G.tok)f()},A.reduced()?0:j*ms))};
 const steps=[
  {h:'What repeats?',p:'Red, blue, blue, red, blue, blue, red… Drag shapes into the gaps, or tap the buttons.',
   predict:{q:'Red, blue, blue, red, blue, blue, red. What comes next?',opts:['Red again, like the last one','Blue','Something new, like yellow'],ans:1},task:'Fill all three gaps',
   show:()=>{G.rep=[];status();later([0,1,2].map(j=>()=>place(want(SEEN+j),j)),450)},
   go:()=>{fresh();G.rep=[];status();G.want=fin(0,()=>G.rep.filter(v=>v!=null).length===3,()=>'The part that repeats is red, blue, blue. Spot it, and you can say what comes next.')}},
  {h:'Test the rule',p:'2, 4, 8. Tap a rule to test it on every number. Then drag the next number into the ?',
   predict:{q:'2, 4, 8. What comes next?',opts:['10, because you add 2','16, because it doubles','12, because you add 4'],ans:1},task:'Find the rule that fits and the next number',
   show:()=>{G.put=null;later([()=>rule(0),()=>rule(2),()=>putN(2)],600)},
   go:()=>{fresh();G.rule=-1;G.tested=[];G.put=null;status();G.want=fin(1,()=>G.put===16&&G.rule===2,()=>'Double fits every number: 2, 4, 8, 16. Add 2 only fit the first jump.')}},
  {h:'A word pattern',p:'jump → jumped. Drag + ed onto each word, or tap it. Does the pattern always work?',task:'Try + ed on all six words',
   show:()=>later(WORDS.map((_,i)=>()=>ed(i)),300),
   go:()=>{fresh();G.w={};status();G.want=fin(2,()=>WORDS.every(([w])=>G.w[w]),()=>'Four words follow the pattern. run and go break it: ran, went.')}},
  {h:'Is that enough?',p:'1, 2, 4… Two rules both fit so far. Ask for one more number, then pick the rule.',
   predict:{q:'1, 2, 4… What comes next?',opts:['8, for sure: it doubles','Not sure yet: I need more numbers'],ans:1},task:'Find the rule that fits',
   show:()=>later([more,()=>pick(1)],600),
   go:()=>{fresh();G.shown=3;G.pick=-1;status();G.want=fin(3,()=>G.shown>3&&G.pick===1,()=>'1, 2, 4, 7, 11: add 1 more each time. Three numbers were not enough to be sure.')}},
  {h:'Make your own',p:'Build the part that repeats (up to four shapes). The lab repeats it for you.',go:()=>{fresh();G.mk=[0,1];status()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 const KS=['next','num','unit','enough','ed','why'],UN=[[0,1],[2,2,0],[1,0,0],[3,1,2],[0,3]];let qn=-1,run=0;
 const rnd=n=>Math.floor(Math.random()*n);
 function ask(){qn++;const k=KS[qn%KS.length],j=qn%3;let q,ops,vis=null,num=0;
  if(k==='next'){const u=UN[qn%UN.length],n=u.length*2+1,s=[...Array(n)].map((_,i)=>u[i%u.length]),ans=u[n%u.length],last=s[n-1],nw=[0,1,2,3].find(v=>!u.includes(v));vis=[...s,'?'];q='What comes next?';
   ops=[[nm(ans),'ok']];if(last!==ans)ops.push([nm(last),'last']);ops.push([nm(nw),'new']);if(ops.length<3)ops.push([nm(u.find(v=>v!==ans)),'skip'])}
  else if(k==='num'){const d=[3,5,10][rnd(3)],a=d*(1+rnd(3)),s=[a,a+d,a+2*d,a+3*d];vis=[...s,'?'];num=1;q='What number comes next?';ops=[[String(a+4*d),'ok'],[String(a+3*d+1),'one'],[String((a+3*d)*2),'dbl']]}
  else if(k==='unit'){const u=UN[(qn+2)%UN.length],s=[...Array(u.length*3)].map((_,i)=>u[i%u.length]);vis=s;q='How many shapes are in the part that repeats?';
   const n=u.length;ops=[[String(n),'ok'],[String(s.length),'all'],[String(n+1),'unitc']]}
  else if(k==='enough'){vis=[3,6,'?'];num=1;q='Mia sees 3, 6. She says the next must be 9. Is she sure?';ops=[['Not yet: it could add 3 (9) or double (12)','ok'],['Yes: it adds 3','sure'],['Yes: it doubles','sure2']]}
  else if(k==='ed'){q='Kim says: "I goed to the park." What went wrong?';ops=[['She used the -ed pattern on a word that breaks it','ok'],['Nothing: goed is right','goed'],['She forgot to add -ed','forgot']]}
  else{vis=[2,4,8,16,'?'];num=1;q='2, 4, 8, 16. Why is 32 next?';ops=[['Each number doubles','ok'],['It goes up by 16, the last jump','lastgap'],['32 just looks right','guess']]}
  G.Q={k,vis,num};chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(j%ops.length).concat(ops.slice(0,j%ops.length)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});
  const sv=vis?(num?vis.join(', '):vis.map(v=>v==='?'?'gap':nm(v)).join(', ')):'';tell('Challenge: '+q+(sv?' Shown: '+sv+'.':''));A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  if(tag==='ok')m='Yes!';
  else if(tag==='last')m='Not just the last one again. Find the part that repeats, then carry on from there.';
  else if(tag==='new')m='That shape is not in the pattern. Only use shapes from the part that repeats.';
  else if(tag==='skip')m='Count along the part that repeats. You skipped a place.';
  else if(tag==='one')m='The jump is not 1. Look at the gap between each pair of numbers.';
  else if(tag==='dbl')m='Doubling does not fit the first numbers. Test the rule on every jump.';
  else if(tag==='all')m='That is the whole row. The part that repeats is shorter: find where it starts again.';
  else if(tag==='unitc')m='Point to where the row starts again. The part that repeats ends just before it.';
  else if(tag==='sure'||tag==='sure2')m='Two numbers fit more than one rule. Wait for one more number before you are sure.';
  else if(tag==='goed')m='We say went. Some words break the -ed pattern, so check it sounds right.';
  else if(tag==='forgot')m='She did add -ed. That is the slip: go breaks the pattern, so it is went.';
  else if(tag==='lastgap')m='Check it on every jump: 2 to 4 is not +16. Each number doubles.';
  else m='A pattern needs a reason. Here each number doubles, so 16 × 2 = 32.';
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   const trayHit=(p,n,y)=>tray(n,y).findIndex(r=>inR(p,r));
   A.gest({down:p=>{const m=mode();G.dp=null;G.p0=p;
     if(m==='rep'){const j=trayHit(p,3,A.H*.7);if(j>=0){G.dr=j;return true}return false}
     if(m==='num'){const r=ruleR().find(r=>inR(p,r));if(r){rule(r.i);return false}const j=trayHit(p,3,A.H*.7);if(j>=0&&G.put!==TILES[j]){G.dr='t'+j;return true}return false}
     if(m==='word'){if(inR(p,edR())){G.dr='ed';return true}const r=wordR().find(r=>inR(p,r));if(r)ed(r.i);return false}
     if(m==='more'){const g=guessR().find(r=>inR(p,r));if(g){pick(g.i);return false}if(moreR().some((r,i)=>i>=G.shown&&inR(p,r)))more();return false}
     if(m==='make'){const j=trayHit(p,4,A.H*.72);if(j>=0)mk(j);return false}return false},
    move:p=>{G.dp=p;A.redraw()},
    up:p=>{const d=G.dr,m=mode(),tap=G.p0&&Math.hypot(p.x-G.p0.x,p.y-G.p0.y)<10;G.dr=null;G.dp=null;
     if(m==='rep'&&typeof d==='number'){const j=box(LEN,A.H*.1).findIndex((r,i)=>i>=SEEN&&inR(p,r));if(j>=0)place(d,j-SEEN);else if(tap||p.y<A.H*.6)place(d);else A.redraw()}
     else if(m==='num'&&d){const r=box(4,A.H*.08)[3];if(inR(p,{x:r.x-10,y:r.y-10,w:r.w+20,h:r.h+20})||tap)putN(+d.slice(1));else A.redraw()}
     else if(m==='word'&&d==='ed'){const r=wordR().find(r=>inR(p,r));if(r)ed(r.i);else A.redraw()}}});
   sync()}});
 A.start()})})();
