/* Flagship 62 – writing craft vocabulary (ages 8–11): slide a register dial from informal to formal and send each
   message to the right reader; sort openings by purpose (inform, persuade, entertain); link a paragraph with the
   cohesive device each gap needs (example, contrast, cause); label persuasive techniques; free register practice.
   Challenge: pick the register, name the term, read the tone, choose a connective, spot perspective and evidence. */
(()=>{const LV=['Informal','In between','Formal'];
 // each reader: the register that suits them, and the same message written three ways
 const MSG=[{to:'Email to your head teacher',want:2,m:["Hey! Can't finish my project. Gonna hand it in Fri, OK?","Hi Mr Ali, I can't finish my project today. Can I hand it in on Friday?","Dear Mr Ali, I am sorry, but I have not finished my project. Please may I hand it in on Friday? Thank you."]},
  {to:'Text to your best friend',want:0,m:["Running late!! Save me a seat? See ya","Hi Sam, I am running late. Could you save me a seat?","Dear Sam, I regret that I shall be late. Kindly reserve a seat for me."]},
  {to:'Note to a classmate you do not know well',want:1,m:["Oi, got a spare pencil?","Hi, could I borrow a pencil, please?","Dear classmate, I would be most grateful for the loan of a pencil."]},
  {to:'Letter to the council about a broken swing',want:2,m:["The swing's bust. Fix it!","Hi, the swing in the park is broken. Can you fix it?","Dear Sir or Madam, I am writing to report that the swing in Elm Park is broken. Please could it be repaired?"]}];
 const PUR=['Inform','Persuade','Entertain'];
 const OPEN=[['The school fair is on Saturday from 2 pm in the hall.',0],["Don't miss it: the best afternoon of the year, and every penny helps!",1],['Nobody expected the tombola to start talking.',2],
  ['Hedgehogs sleep in the day and feed at night.',0],['Leave a gap in your fence tonight. One small hole could save a hedgehog.',1],['The hedgehog sneezed, and the whole garden went quiet.',2]];
 const WHY=['It gives facts: when, where, what. That informs.','It gives an opinion and tells you what to do. That persuades.','It makes you want to know what happens. That entertains.'];
 const LINK=['For example','However','Because','Then'],JOB=['example','contrast','cause','time order'];
 const PARA=[['Hedgehogs are good for gardens.','they eat slugs that harm plants.',0],['They sleep in the day.','you may spot one at dusk.',1],['','hedgehogs roam far at night, gardens need gaps in fences.',2]];
 const TECH=['Rhetorical question','Evidence','Direct address','Repetition'];
 const TXT=[['Do you want slugs eating your lettuces?',0],['A 2018 report found rural hedgehogs in Britain fell by up to half.',1],['You can help tonight.',2],['Save them, feed them, protect them.',3]];
 const TDEF=['asks a question to make you think, not to get an answer','is a fact or number you can check','talks straight to the reader as "you"','says the same pattern again so it sticks'];
VIS.reg('flagcraft',c=>{let A,pad,chal,read;
 const G={sc:0,lv:1,sent:[],srt:[],cur:0,gap:[null,null,null],ti:0,tl:[],free:3,dr:null,dp:null,p0:null,tok:0,want:()=>{},said:'',flash:0};
 const tell=t=>{G.said=t;c.say(t);if(read){read.textContent=t;A.cv.setAttribute('aria-label',t)}};
 const mode=()=>['reg','pur','coh','tech','reg','q'][A.step];
 const ft=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=a||'center';x.textBaseline='middle'};
 function lines(x,t,w){const o=[];let l='';t.split(' ').forEach(s=>{const k=l?l+' '+s:s;if(x.measureText(k).width>w&&l){o.push(l);l=s}else l=k});o.push(l);return o}
 function para(x,t,cx,y,w,lh){lines(x,t,w).forEach((l,j)=>x.fillText(l,cx,y+j*lh));return lines(x,t,w).length*lh}
 const inR=(p,r)=>p&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 function card(x,r,f,s,rad){x.fillStyle=f;A.paint.rrect(r.x,r.y,r.w,r.h,rad||12);x.fill();x.strokeStyle=s;x.lineWidth=2;x.stroke()}
 function status(){const m=mode();let t;
  if(m==='reg'){const S=MSG[G.sc];t=`${S.to}. Dial: ${LV[G.lv]}. Message: ${S.m[G.lv]}`}
  else if(m==='pur')t=G.srt.length<OPEN.length?`Opening: "${OPEN[G.cur][0]}" Inform, persuade or entertain? ${G.srt.length} of ${OPEN.length} sorted.`:'All six openings are sorted.';
  else if(m==='coh')t='Paragraph: '+PARA.map(([a,b],i)=>`${a} ${G.gap[i]==null?'[gap]':LINK[G.gap[i]]}${i<2?',':''} ${b}`).join(' ');
  else t=G.ti<TXT.length?`Phrase: "${TXT[G.ti][0]}" Which technique is it?`:'All four techniques are labelled.';
  tell(t);sync();G.want()}
 // ---- register dial
 const track=()=>({x:30,y:A.H*.8,w:A.W-60});
 const stopX=i=>{const T=track();return T.x+T.w*i/2};
 const knobX=()=>G.dr==='knob'&&G.dp?Math.max(track().x,Math.min(track().x+track().w,G.dp.x)):stopX(G.lv);
 function regView(x){const C=A.col,S=MSG[G.sc],nar=A.narrow;ft(x,800,nar?15:18,'left');x.fillStyle=C.tx;x.fillText('To: '+S.to,14,22);
  const B={x:14,y:42,w:A.W-28,h:A.H*.5};card(x,B,A.alpha(G.lv===2?C.vi:G.lv?C.cy:C.or,.13),G.lv===2?C.vi:G.lv?C.cy:C.or,16);
  ft(x,600,nar?15:18,'left');x.fillStyle=C.tx;para(x,S.m[G.lv],B.x+14,B.y+24,B.w-28,nar?21:25);
  const T=track();x.strokeStyle=A.alpha(C.tx,.3);x.lineWidth=8;x.lineCap='round';x.beginPath();x.moveTo(T.x,T.y);x.lineTo(T.x+T.w,T.y);x.stroke();
  LV.forEach((l,i)=>{x.fillStyle=i===G.lv?C.ac:A.alpha(C.tx,.4);x.beginPath();x.arc(stopX(i),T.y,7,0,7);x.fill();ft(x,700,nar?12:14,i===0?'left':i===2?'right':'center');x.fillStyle=C.tx;x.fillText(l,i===0?T.x-14:i===2?T.x+T.w+14:stopX(i),T.y-26)});
  A.paint.ball(knobX(),T.y,17,C.ac);
  const done=G.sent.length;if(A.step===0){ft(x,600,13);x.fillStyle=C.mu;x.fillText(`Sent right: ${done} of 2`,A.W/2,A.H*.93)}}
 function setLv(i){G.lv=Math.max(0,Math.min(2,i));A.sound.tick();status()}
 function send(){const S=MSG[G.sc];if(G.lv!==S.want){A.sound.miss();
   tell(S.want===2?(G.lv?'Nearly. For this reader go fully formal: Dear…, full words, please and thank you.':`Too chatty for this reader. Words like "${S.m[0].split(' ')[0].replace(/[!,]/g,'')}" are informal.`):S.want===0?(G.lv===2?'Far too stiff for a best friend. Formal words make you sound cold or cross.':'That works, but friends usually text more casually.'):(G.lv===2?'A bit stiff for a classmate. Polite but plain is right here.':'Too rude for someone you do not know well. Add please.'));return}
  A.sound.pop();G.flash=1;A.tween(G,{flash:0},800,'out');if(!G.sent.includes(G.sc))G.sent.push(G.sc);
  tell(`Sent! ${LV[S.want]} suits: ${S.to.toLowerCase()}.`);if(A.step===0&&G.sc===0){G.sc=1;G.lv=2;setTimeout(()=>{if(A.step===0)status()},A.reduced()?0:900)}else status()}
 // ---- purpose sort
 const bins=()=>{const w=(A.W-40)/3,h=A.H*.42;return PUR.map((n,i)=>({x:12+i*(w+8),y:A.H-h-10,w,h,n,i}))};
 const openR=()=>({x:16,y:14,w:A.W-32,h:A.H*.32});
 function purView(x){const C=A.col,nar=A.narrow,cols=[C.cy,C.or,C.vi];
  bins().forEach(b=>{card(x,b,A.alpha(cols[b.i],.12),cols[b.i],14);ft(x,800,nar?13:16);x.fillStyle=C.tx;x.fillText(b.n,b.x+b.w/2,b.y+18);
   x.save();x.beginPath();x.rect(b.x+3,b.y,b.w-6,b.h);x.clip();G.srt.filter(k=>OPEN[k][1]===b.i).forEach((k,j)=>{ft(x,600,nar?11:13);x.fillText('✓ '+OPEN[k][0].split(' ').slice(0,nar?1:3).join(' ').replace(/[:,]/g,'')+'…',b.x+b.w/2,b.y+44+j*22)});x.restore()});
  if(G.srt.length<OPEN.length){const R=openR(),P=G.dr==='open'&&G.dp?{...R,x:G.dp.x-R.w/2,y:G.dp.y-R.h/2}:R;A.paint.shadow(10,4,.22);card(x,P,'#fffdf5','#d4c48a',14);A.paint.noShadow();
   ft(x,700,nar?15:18);x.fillStyle='#1f2937';const n=lines(x,OPEN[G.cur][0],P.w-24).length;para(x,OPEN[G.cur][0],P.x+P.w/2,P.y+P.h/2-(n-1)*11,P.w-24,22)}}
 function sortTo(b){const k=G.cur,ok=OPEN[k][1]===b;G.dr=null;if(!ok){A.sound.miss();tell(`Not ${PUR[b].toLowerCase()}. ${WHY[OPEN[k][1]]}`);A.redraw();return}
  G.srt.push(k);G.cur=Math.min(OPEN.length-1,G.srt.length);A.sound.pop();status()}
 // ---- cohesion
 const gapR=i=>{const h=A.H*.18;return{x:14,y:12+i*(h+8),w:A.W-28,h}};
 const slotR=i=>{const g=gapR(i),w=Math.min(130,A.W*.34);return{x:g.x+8,y:g.y+(PARA[i][0]?26:8),w,h:30}};
 const tileR=i=>{const w=(A.W-40)/2,h=46;return{x:14+(i%2)*(w+12),y:A.H*.66+Math.floor(i/2)*(h+10),w,h}};
 function cohView(x){const C=A.col,nar=A.narrow;PARA.forEach(([a,b],i)=>{const g=gapR(i),s=slotR(i),v=G.gap[i];card(x,g,A.alpha(C.tx,.04),A.alpha(C.tx,.15),10);
   ft(x,600,nar?13:16,'left');x.fillStyle=C.tx;if(a)x.fillText(a,g.x+10,g.y+16);
   card(x,s,v==null?A.alpha(C.ac,.12):A.alpha(C.gr,.18),v==null?C.ac:C.gr,8);ft(x,700,nar?13:15);x.fillStyle=C.tx;x.fillText(v==null?'?':LINK[v]+(i<2?',':''),s.x+s.w/2,s.y+16);
   ft(x,600,nar?12:15,'left');lines(x,b,g.x+g.w-s.x-s.w-16).forEach((l,j)=>x.fillText(l,s.x+s.w+8,s.y+15+j*17))});
  LINK.forEach((l,i)=>{if(G.gap.includes(i))return;const r=tileR(i),P=G.dr==='t'+i&&G.dp?{...r,x:G.dp.x-r.w/2,y:G.dp.y-r.h/2}:r;card(x,P,A.col.pn,C.cy,10);ft(x,700,nar?15:17);x.fillStyle=C.tx;x.fillText(l,P.x+P.w/2,P.y+P.h/2)})}
 function link(t,i){if(i==null)i=G.gap.findIndex(v=>v==null);if(i<0)return;G.dr=null;const need=PARA[i][2];
  if(t!==need){A.sound.miss();tell(`"${LINK[t]}" shows ${JOB[t]}. This gap needs ${JOB[need]}: ${['the second sentence is an example of the first','the second sentence turns against the first','the first part gives a reason'][i]}.`);A.redraw();return}
  G.gap[i]=t;A.sound.pop();status()}
 // ---- techniques
 const chipR=i=>{const w=(A.W-36)/2,h=Math.min(56,A.H*.14);return{x:12+(i%2)*(w+12),y:A.H*.56+Math.floor(i/2)*(h+10),w,h}};
 function techView(x){const C=A.col,nar=A.narrow;G.tl.forEach((k,j)=>{ft(x,600,nar?12:14,'left');x.fillStyle=C.gr;x.fillText(`✓ ${TECH[TXT[k][1]]}: ${TXT[k][0].slice(0,nar?26:48)}…`,12,14+j*18)});
  if(G.ti<TXT.length){const R={x:14,y:A.H*.2,w:A.W-28,h:A.H*.3};card(x,R,A.alpha(C.or,.12),C.or,14);ft(x,700,nar?16:19);x.fillStyle=C.tx;const n=lines(x,TXT[G.ti][0],R.w-24).length;para(x,TXT[G.ti][0],R.x+R.w/2,R.y+R.h/2-(n-1)*12,R.w-24,24)}
  TECH.forEach((t,i)=>{const r=chipR(i),P=G.dr==='c'+i&&G.dp?{...r,x:G.dp.x-r.w/2,y:G.dp.y-r.h/2}:r;card(x,P,A.alpha(C.vi,.12),C.vi,12);ft(x,700,nar?13:16);x.fillStyle=C.tx;x.fillText(t,P.x+P.w/2,P.y+P.h/2)})}
 function label(i){if(G.ti>=TXT.length)return;G.dr=null;const need=TXT[G.ti][1];if(i!==need){A.sound.miss();tell(`${TECH[i]} ${TDEF[i]}. This one ${TDEF[need]}.`);A.redraw();return}
  G.tl.push(G.ti);G.ti++;A.sound.pop();status()}
 function draw(A){const{ctx:x,W,H,col:C}=A,m=mode();x.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.03:.3);x.fillRect(0,0,W,H);
  if(m==='reg')regView(x);else if(m==='pur')purView(x);else if(m==='coh')cohView(x);else if(m==='tech')techView(x);
  else if(G.Q){ft(x,800,A.narrow?16:20);x.fillStyle=C.tx;para(x,G.Q.show,W/2,H*.3,W-40,26)}
  if(G.flash>0){x.strokeStyle=A.alpha(C.gr,G.flash);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 const fresh=()=>{G.tok++;G.want=()=>{};G.Q=null;G.dr=null};
 const later=(fs,ms)=>{const k=G.tok;fs.forEach((f,j)=>setTimeout(()=>{if(k===G.tok)f()},A.reduced()?0:j*ms))};
 function sync(){if(!A)return;if(A.step!==5)A.cv.setAttribute('aria-label',G.said);if(!pad)return A.redraw();pad.innerHTML='';const m=mode();
  const B=(t,f,dis)=>{const e=c.el('button',{type:'button',class:'lbtn ghost'},pad,t);e.disabled=!!dis;e.onclick=f};
  if(m==='reg'){B('← Less formal',()=>setLv(G.lv-1),G.lv===0);B('More formal →',()=>setLv(G.lv+1),G.lv===2);B('Send',send);if(A.step===4)B('New reader',()=>{G.free=(G.free+1)%MSG.length;G.sc=G.free;G.lv=1;status()})}
  if(m==='pur'&&G.srt.length<OPEN.length)PUR.forEach((p,i)=>B(p,()=>sortTo(i)));
  if(m==='coh'){LINK.forEach((l,i)=>B(l,()=>link(i),G.gap.includes(i)));B('Clear',()=>{G.gap=[null,null,null];status()})}
  if(m==='tech'&&G.ti<TXT.length)TECH.forEach((t,i)=>B(t,()=>label(i)));A.redraw()}
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&(!steps[st].predict||A.pred[st]!=null)){A.done(msg()+A.reveal(st))}};
 const steps=[
  {h:'Register',p:'Register means how formal or chatty writing is. Slide the dial, then send each message to its reader.',
   predict:{q:'You email your head teacher. Which is best?',opts:['Dear Mr Ali, please may I…','Hey! Can I…','Either: the facts are the same'],ans:0},task:'Send both messages in the right register',
   show:()=>{fresh();G.sc=0;G.lv=1;G.sent=[];status();G.want=fin(0,()=>G.sent.length>=2,()=>'Formal for the head teacher, informal for a friend. The reader decides the register.');later([()=>setLv(2),send,()=>setLv(1),()=>setLv(0),send],500)},
   go:()=>{fresh();G.sc=0;G.lv=1;G.sent=[];status();G.want=fin(0,()=>G.sent.length>=2,()=>'Formal for the head teacher, informal for a friend. The reader decides the register.')}},
  {h:'Purpose',p:'Every piece of writing has a purpose. Drag each opening into a box, or press a button.',
   predict:{q:'"Don\'t miss it: the best afternoon of the year!" What is its purpose?',opts:['To inform: it tells you about the fair','To persuade: it wants you to come','To entertain'],ans:1},task:'Sort all six openings',
   show:()=>later(OPEN.map(()=>()=>{if(G.srt.length<OPEN.length)sortTo(OPEN[G.cur][1])}),300),
   go:()=>{fresh();G.srt=[];G.cur=0;status();G.want=fin(1,()=>G.srt.length===OPEN.length,()=>'Facts inform, opinions and orders persuade, a story hook entertains.')}},
  {h:'Cohesion',p:'Cohesion means the sentences link up. Drag the linking word each gap needs. One tile is spare.',
   predict:{q:'What makes a paragraph cohesive?',opts:['Long, fancy words','Linking words that show how ideas connect','Lots of short sentences'],ans:1},task:'Link all three gaps',
   show:()=>{G.gap=[null,null,null];later([0,1,2].map(i=>()=>link(PARA[i][2],i)),450)},
   go:()=>{fresh();G.gap=[null,null,null];status();G.want=fin(2,()=>G.gap.every((v,i)=>v===PARA[i][2]),()=>'For example adds an example, however turns, because gives a reason. Then was spare: nothing here is in time order.')}},
  {h:'Techniques',p:'Writers choose techniques on purpose. Drag a label onto the phrase, or press a button.',task:'Label all four phrases',
   show:()=>later(TXT.map(()=>()=>label(TXT[Math.min(G.ti,TXT.length-1)][1])),400),
   go:()=>{fresh();G.ti=0;G.tl=[];status();G.want=fin(3,()=>G.ti>=TXT.length,()=>'Each technique is a choice to make the reader think, trust, feel involved or remember.')}},
  {h:'Your turn',p:'Pick a new reader, set the dial and send.',go:()=>{fresh();G.sc=G.free;G.lv=1;status()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 const KS=['reg','term','tone','link','persp','evid','form'];let qn=-1,run=0;
 function ask(){qn++;const k=KS[qn%KS.length],j=qn%3;let q,ops,show='';
  if(k==='reg'){q='You write to a newspaper about litter in the park. Which register?';show='To: the editor';ops=[['Formal','ok'],['Informal, like a text','chatty'],['It does not matter','nomatter']]}
  else if(k==='term'){q='Which word means how formal or chatty a piece of writing is?';ops=[['Register','ok'],['Tone','tone'],['Form','form']]}
  else if(k==='tone'){q='What is the tone of this line?';show='"Oh great. Thanks a LOT for losing my book."';ops=[['Sarcastic and cross','ok'],['Grateful','literal'],['Formal','regtone']]}
  else if(k==='link'){q='Which word fills the gap?';show='It was raining. ____, we still played outside.';ops=[['However','ok'],['Because','cause'],['For example','example']]}
  else if(k==='persp'){q='Which perspective is this written from?';show='I crept into the cave and held my breath.';ops=[['First person','ok'],['Third person','third'],['Second person','second']]}
  else if(k==='evid'){q='Which one is evidence?';ops=[['9 out of 10 pupils said the field was muddy.','ok'],['The field is the worst place ever.','opinion'],['Is the field muddy?','question']]}
  else{q='A letter, a poster and a poem are different…';ops=[['forms','ok'],['tones','tone2'],['registers','reg2']]}
  G.Q={k,show};chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(j%ops.length).concat(ops.slice(0,j%ops.length)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});
  tell('Challenge: '+q+(show?' '+show:''));A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  if(tag==='ok')m='Yes!';
  else if(tag==='chatty')m='A newspaper editor is a stranger in a public role: write formally.';
  else if(tag==='nomatter')m='The reader decides the register. An editor expects formal writing.';
  else if(tag==='tone')m='Tone is the feeling (cross, warm, funny). How formal it is, is the register.';
  else if(tag==='form')m='Form is the kind of text: letter, poem, poster. How formal it is, is the register.';
  else if(tag==='literal')m='The words say thanks, but losing a book is bad news. Saying the opposite is sarcasm.';
  else if(tag==='regtone')m='"Oh great" is chatty, not formal. The feeling here is sarcastic and cross.';
  else if(tag==='cause')m='Because gives a reason. Here the second idea goes against the first, so it is a contrast: however.';
  else if(tag==='example')m='Playing outside is not an example of rain. It goes against it: however.';
  else if(tag==='third')m='Third person uses he, she or they. "I" means first person.';
  else if(tag==='second')m='Second person talks to "you". "I" means first person.';
  else if(tag==='opinion')m='"The worst place ever" is an opinion. Evidence is something you can check, like a survey number.';
  else if(tag==='question')m='A question is not evidence. Evidence is a fact or number you can check.';
  else if(tag==='tone2')m='Tone is the feeling. Letter, poster and poem are kinds of text: forms.';
  else m='Register is how formal it is. Letter, poster and poem are forms.';
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const m=mode();G.dp=null;G.p0=p;
     if(m==='reg'){const T=track();if(Math.abs(p.y-T.y)<34&&p.x>T.x-24&&p.x<T.x+T.w+24){G.dr='knob';G.dp=p;A.redraw();return true}return false}
     if(m==='pur'){if(G.srt.length<OPEN.length&&inR(p,openR())){G.dr='open';return true}const b=bins().find(b=>inR(p,b));if(b&&G.srt.length<OPEN.length)sortTo(b.i);return false}
     if(m==='coh'){const i=LINK.findIndex((_,i)=>!G.gap.includes(i)&&inR(p,tileR(i)));if(i>=0){G.dr='t'+i;return true}return false}
     if(m==='tech'){const i=TECH.findIndex((_,i)=>inR(p,chipR(i)));if(i>=0){G.dr='c'+i;return true}return false}return false},
    move:p=>{G.dp=p;A.redraw()},
    up:p=>{const d=G.dr,tap=G.p0&&Math.hypot(p.x-G.p0.x,p.y-G.p0.y)<10;G.dr=null;G.dp=null;if(!d)return;
     if(d==='knob'){const T=track();setLv(Math.round((Math.max(T.x,Math.min(T.x+T.w,p.x))-T.x)/T.w*2))}
     else if(d==='open'){const b=bins().find(b=>inR(p,{...b,y:b.y-20,h:b.h+20}));if(b)sortTo(b.i);else A.redraw()}
     else if(d[0]==='t'){const i=[0,1,2].find(i=>inR(p,gapR(i)));if(i!=null)link(+d.slice(1),i);else if(tap)link(+d.slice(1));else A.redraw()}
     else if(d[0]==='c'){if(tap||p.y<A.H*.52)label(+d.slice(1));else A.redraw()}}});
   sync()}});
 A.start()})})();
