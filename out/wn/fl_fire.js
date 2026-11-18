/* Flagship – explaining events and ideas in an informational text (ages 9–10; CCSS RI.4.3, RI.5.3; KS2 reading).
   One short text about the Great Fire of London, 1666. Sort causes from effects and details, tap the sentence that
   proves each claim, pick because or so (not then) to show a reason, put the steps of a firebreak in order with the
   reason for each, and build a chain where each effect causes the next link. Drag a card, or tap it and then tap a
   place; every move also has a button. Data in learn/fire_art.js. */
(()=>{const F=FIRE66;
VIS.reg('flagfire',c=>{let A,pad,quiz,qn=-1,epoch=0,D=null;const st={};
const INK='#1f2937',GOOD='#047857',SLIP='#b91c1c',RIM='#6b7280',HOLDC='#c2410c',CARD='#ffffff',PLACED='#e7f6ee',SPARK='#fcd34d',BANNER='#fde7c7';
const SC=['sort','proof','link','steps','chain','chal'],cur=()=>SC[A.step];
const z=n=>Math.round(n*(A.narrow?1:1.1));
/* every drag scene is a list of rounds of {ask, zones, cards}; the link scene is built from LINK, one sentence a round */
const linkRound=L=>({ask:'Pick the word that shows the reason',zones:['gap'],cards:F.WORDS.map(w=>({t:w,to:w===L.ans?0:-1,why:L.no[w]})),L});
const ROUNDS={sort:[F.SORT],link:F.LINK.map(linkRound),steps:[F.STEPS],chain:[F.CHAIN]};
const count=k=>k==='proof'?F.PROOF.length:ROUNDS[k].length;
const rd=k=>{k=k||cur();const s=st[k];return k==='proof'?F.PROOF[Math.min(s.r,F.PROOF.length-1)]:ROUNDS[k][Math.min(s.r,ROUNDS[k].length-1)]};
const finished=k=>st[k].r>=count(k);
function split(g,t,w){const out=[];let line='';t.split(' ').forEach(word=>{const next=line?line+' '+word:word;if(line&&g.measureText(next).width>w){out.push(line);line=word}else line=next});out.push(line);return out}
function tile(r,t,o){o=o||{};const g=A.ctx;A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||8);g.fillStyle=o.bg||CARD;g.fill();
 g.lineWidth=o.ring?3:1.4;g.strokeStyle=o.ring==='good'?GOOD:o.ring==='slip'?SLIP:o.ring==='hold'?HOLDC:RIM;if(o.open)g.setLineDash([6,4]);g.stroke();g.setLineDash([]);if(!t)return;
 let size=z(o.size||13)+1,rows;do{size--;g.font=`${o.weight||700} ${size}px system-ui,sans-serif`;rows=split(g,t,r.w-12)}while(rows.length*(size+3)>r.h-6&&size>9);
 g.fillStyle=o.ink||INK;g.textBaseline='middle';g.textAlign=o.left?'left':'center';const lh=size+3,y0=o.top?r.y+6+size/2:r.y+r.h/2-(rows.length-1)*lh/2;
 rows.forEach((s,i)=>g.fillText(s,o.left?r.x+8:r.x+r.w/2,y0+i*lh))}
function within(p,r){return !!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h}
function grid(n,x,y,w,h,cols){const gap=7,cw=(w-gap*(cols-1))/cols,rows=Math.ceil(n/cols),ch=Math.max(30,Math.min(46,(h-gap*(rows-1))/rows));
 return Array.from({length:n},(_,i)=>({x:x+(i%cols)*(cw+gap),y:y+Math.floor(i/cols)*(ch+gap),w:cw,h:ch}))}
/* where everything sits for the current scene */
function geo(){const k=cur(),W=A.W,H=A.H,bar={x:8,y:6,w:W-16,h:z(30)},out={bar};let y=bar.y+bar.h+8;
 if(k==='proof'){const h=(H-y-8)/F.TEXT.length;out.rows=F.TEXT.map((_,i)=>({x:8,y:y+i*h,w:W-16,h:h-2}));return out}
 const R=rd(k),n=R.cards.length;
 if(k==='sort'){out.event={x:8,y,w:W-16,h:z(30)};y+=z(30)+8;
  if(A.narrow){const fits=R.zones.map((_,j)=>R.cards.filter(cd=>cd.to===j).length),hs=fits.map(f=>z(26)+Math.ceil(f/2)*38+10);
   out.zones=hs.map(h=>{const r={x:8,y,w:W-16,h};y+=h+6;return r});y+=2}
  else{const zh=H*.36,zw=(W-16-14)/3;out.zones=R.zones.map((_,j)=>({x:8+j*(zw+7),y,w:zw,h:zh}));y+=zh+8}
  out.pool=grid(n,8,y,W-16,H-y-6,A.narrow?2:3);return out}
 if(k==='link'){const h=z(78);out.zones=[{x:8,y,w:W-16,h}];y+=h+10;out.pool=grid(n,W*.12,y,W*.76,z(44),3);out.after=y+z(44)+10;return out}
 const left=A.narrow?W-16:(W-24)*.56,gap=k==='chain'?16:20,zh=Math.min(k==='steps'?64:46,(A.narrow?H*.6:H-y-8)/R.zones.length-gap);
 out.zones=R.zones.map((_,j)=>({x:8,y:y+j*(zh+gap),w:left,h:zh}));
 if(A.narrow){const y2=y+R.zones.length*(zh+gap)+2;out.pool=grid(n,8,y2,W-16,H-y2-6,2)}else out.pool=grid(n,16+left,y,W-24-left,Math.min(H-y-8,n*53),1);return out}
function backdrop(){const g=A.ctx;g.fillStyle=A.col.dark?'#1c2230':'#fbf7ef';g.fillRect(0,0,A.W,A.H)}
function arrow(x,y0,y1){const g=A.ctx;g.strokeStyle=A.col.dark?'#e5e7eb':INK;g.fillStyle=g.strokeStyle;g.lineWidth=2;g.beginPath();g.moveTo(x,y0);g.lineTo(x,y1-6);g.stroke();
 g.beginPath();g.moveTo(x-6,y1-8);g.lineTo(x+6,y1-8);g.lineTo(x,y1);g.closePath();g.fill()}
const doneText={sort:'Four causes, two effects and one detail',proof:'Every claim now points to its sentence',link:'Because and so show the reason. Then only shows the order',
 steps:'Each step has a reason that explains it',chain:'Each effect became the cause of the next link'};
function draw(){backdrop();const k=cur(),g=A.ctx;
 if(k==='chal'){tile({x:A.W*.1,y:A.H*.3,w:A.W*.8,h:A.H*.3},'What happened? Why? Where does the text say so?',{bg:BANNER,size:16});return}
 const s=st[k],G=geo(),R=rd(k),over=finished(k);tile(G.bar,over?doneText[k]:R.ask,{bg:over?PLACED:BANNER,ring:over?'good':null,weight:800});
 if(k==='proof'){F.TEXT.forEach((x,i)=>{const lit=s.lit.includes(i),bad=s.bad===i;tile(G.rows[i],`${i+1}. ${x.t}`,{left:true,size:12,weight:lit?800:500,bg:lit?SPARK:CARD,ring:bad?'slip':lit?'good':null,rad:5})});return}
 if(k==='sort'){tile(G.event,'EVENT: '+F.EVENT,{bg:'#fee2e2',size:12,weight:800})}
 G.zones.forEach((r,j)=>{const mine=R.cards.map((cd,i)=>s.at[i]===j?i:-1).filter(i=>i>=0),hot=s.over===j;
  if(k==='link'){const filled=mine.length?R.cards[mine[0]].t:'_____';tile(r,`${R.L.a} ${filled} ${R.L.b}`,{bg:mine.length?PLACED:CARD,ring:mine.length?'good':hot?'hold':null,open:!mine.length,size:16});
   const top=G.after,each=Math.min(z(46),(A.H-top-z(24)-8)/count(k)-6);g.font=`800 ${z(12)}px system-ui,sans-serif`;g.fillStyle=A.col.dark?'#e5e7eb':INK;g.textAlign='left';g.textBaseline='top';
   g.fillText(`Joined so far: ${Math.min(s.r,count(k))} of ${count(k)}`,r.x+2,top);F.LINK.slice(0,s.r).forEach((L,q)=>tile({x:r.x,y:top+z(22)+q*(each+6),w:r.w,h:each},`${L.a} ${L.ans.toUpperCase()} ${L.b}`,{bg:PLACED,size:13,weight:600}));return}
  if(k==='sort'){tile(r,'',{bg:CARD,ring:hot?'hold':null,open:true});const hh=z(26);tile({x:r.x+4,y:r.y+4,w:r.w-8,h:hh},R.zones[j],{bg:j===0?'#ffedd5':j===1?'#dbeafe':'#f3f4f6',size:11,weight:800});
   if(A.narrow){const cw=(r.w-14)/2;mine.forEach((i,m)=>tile({x:r.x+5+(m%2)*(cw+4),y:r.y+hh+8+Math.floor(m/2)*38,w:cw,h:34},R.cards[i].t,{bg:PLACED,size:12}));return}
   const each=Math.min(z(40),(r.h-hh-12)/4);mine.forEach((i,m)=>tile({x:r.x+5,y:r.y+hh+8+m*(each+2),w:r.w-10,h:each},R.cards[i].t,{bg:PLACED,size:11}));return}
  const lab=k==='steps'?R.zones[j]:R.zones[j],lw=z(k==='steps'?58:30);tile({x:r.x,y:r.y,w:lw,h:r.h},lab,{bg:'#ffedd5',size:12,weight:800});
  const body={x:r.x+lw+4,y:r.y,w:r.w-lw-4,h:r.h};
  if(mine.length){const cd=R.cards[mine[0]];tile(body,k==='steps'?`${cd.t}, because ${cd.why1}`:cd.t,{bg:PLACED,ring:'good',size:12})}else tile(body,'',{ring:hot?'hold':null,open:true});
  if(j<G.zones.length-1)arrow(r.x+lw/2,r.y+r.h+1,G.zones[j+1].y-1)});
 if(!over)R.cards.forEach((cd,i)=>{if(s.at[i]!=null||(D&&D.i===i))return;tile(G.pool[i],cd.t,{ring:s.bad===i?'slip':s.held===i?'hold':null,size:k==='link'?16:12})});
 if(D){const p=G.pool[D.i];tile({x:D.x-p.w/2,y:D.y-p.h/2,w:p.w,h:p.h},R.cards[D.i].t,{ring:'hold',bg:SPARK,size:k==='link'?16:12})}A.fx.draw(g)}
/* the drop rule shared by every drag scene: right place, or the card stays out and says why */
function place(i,j){const k=cur(),s=st[k];if(finished(k)||s.at[i]!=null||s.wait)return;const R=rd(k),cd=R.cards[i];s.held=null;s.over=-1;
 if(cd.to!==j){s.bad=i;A.sound.miss();return say(cd.why||missText(k,cd))}
 s.at[i]=j;s.bad=null;A.sound.pop();let msg=k==='link'?`${R.L.a} ${cd.t} ${R.L.b}`:k==='steps'?`Step ${j+1}: ${cd.t}, because ${cd.why1}.`:k==='chain'?`Link ${j+1}: ${cd.t}.`:`${cd.t}: ${R.zones[j]}.`;
 const more=R.cards.some((x,q)=>x.to>=0&&s.at[q]==null);if(!more)msg+=advance(k);say(msg)}
function missText(k,cd){if(k==='sort')return cd.to===0?`“${cd.t}” came before the spread and helped it happen. That makes it a cause.`:`“${cd.t}” happened because of the fire. That makes it an effect.`;
 if(k==='chain')return`“${cd.t}” is link ${cd.to+1}. Ask: what had to happen first?`;return`“${cd.t}” is step ${cd.to+1}. Ask: what must be done before it?`}
function advance(k){const s=st[k];if(s.r+1<count(k)){s.wait=1;const v=epoch;setTimeout(()=>{if(v!==epoch)return;s.r++;s.at={};s.wait=0;s.bad=null;say(k==='proof'?rd(k).ask:'Next sentence: '+rd(k).L.a+' … '+rd(k).L.b)},650);return''}
 s.r++;return ' '+doneText[k]+'.'}
function tapRow(i){const s=st.proof;if(finished('proof')||s.wait)return;const P=rd('proof');
 if(i!==P.ans){s.bad=i;A.sound.miss();return say(`Sentence ${i+1} is about ${F.TEXT[i].about}. Look for the one about ${P.look}.`)}
 s.bad=null;s.lit.push(i);A.sound.pop();say(`Yes: sentence ${i+1} says “${F.TEXT[i].t}”`+advance('proof'))}
function down(p){const k=cur();if(k==='chal'||finished(k)||st[k].wait)return false;const G=geo(),s=st[k];
 if(k==='proof'){const i=G.rows.findIndex(r=>within(p,r));if(i>=0)tapRow(i);return false}
 const i=G.pool.findIndex((r,q)=>within(p,r)&&s.at[q]==null);if(i>=0){D={i,x:p.x,y:p.y,sx:p.x,sy:p.y};A.redraw();return true}
 const j=G.zones.findIndex(r=>within(p,r));if(j>=0&&s.held!=null)place(s.held,j);return false}
function move(p){if(!D)return;D.x=p.x;D.y=p.y;st[cur()].over=geo().zones.findIndex(r=>within(p,r));A.redraw()}
function up(p){if(!D)return;const d=D;D=null;const s=st[cur()];s.over=-1;const j=geo().zones.findIndex(r=>within(p,r));if(j>=0)return place(d.i,j);
 if(Math.hypot(p.x-d.sx,p.y-d.sy)<10){s.held=d.i;s.bad=null;return say(`Holding “${rd().cards[d.i].t}”. Now tap a place.`)}A.redraw()}
function reset(){epoch++;D=null;SC.slice(0,5).forEach(k=>st[k]={r:0,at:{},held:null,bad:null,lit:[],over:-1,wait:0});st.hook=()=>{}}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();st.hook()}
function controls(){if(!pad)return;pad.innerHTML='';const k=cur();if(k==='chal'||finished(k)||st[k].wait)return;const s=st[k];
 const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='proof'){F.TEXT.forEach((x,i)=>btn(`Sentence ${i+1}`,()=>tapRow(i),`Sentence ${i+1}: ${x.t}`));return}
 const R=rd(k);if(s.held==null)R.cards.forEach((cd,i)=>{if(s.at[i]==null)btn(`Take: ${cd.t}`,()=>{s.held=i;s.bad=null;say(`Holding “${cd.t}”. Now choose a place.`)})});
 else{R.zones.forEach((zn,j)=>btn(k==='link'?'→ Into the gap':`→ ${k==='chain'?'Link '+zn:zn}`,()=>place(s.held,j),`Put “${R.cards[s.held].t}” in ${k==='link'?'the gap':k==='chain'?'link '+zn:zn}`));btn('Put back',()=>{s.held=null;say('Nothing held.')})}}
const tick=(i,msg)=>()=>{if(A.step===i&&finished(SC[i])&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,intro,msg){reset();say(intro);st.hook=tick(i,msg)}
function demo(i){steps[i].go();const v=epoch,k=SC[i],plan=[];let t=0;
 if(k==='proof')F.PROOF.forEach(P=>{t+=750;plan.push([t,()=>tapRow(P.ans)])});
 else ROUNDS[k].forEach(R=>{R.cards.forEach((cd,q)=>{if(cd.to>=0){t+=k==='link'?300:420;plan.push([t,()=>place(q,cd.to)])}});t+=k==='link'?700:0});
 plan.forEach(([ms,f])=>setTimeout(()=>{if(v===epoch)f()},ms))}
const steps=[
{h:'Causes and effects',p:`Read the event: ${F.EVENT}. A cause comes before and helps make it happen. An effect comes after, because of it. Some facts are just details.`,
 predict:{q:'The fire began in one bakery. Why did it burn 13,200 houses?',opts:['The bakery fire was huge','Several other things helped it spread'],ans:1},task:'Sort all the cards',show:()=>demo(0),
 go:()=>begin(0,'Three boxes: causes, effects and just a detail. Seven cards.','Explaining an event means giving the causes, not just the start.')},
{h:'Find the proof',p:'An explanation needs evidence. Tap the sentence in the text that proves each claim. Then anyone can check it.',task:'Prove all 4 claims',show:()=>demo(1),
 go:()=>begin(1,'The text has 10 numbered sentences. '+F.PROOF[0].ask,'Every claim points to a sentence, so the reader can check it.')},
{h:'Then or because?',p:'Then only tells the order. Because and so tell the reason. Pick the word that explains each pair.',
 predict:{q:'Which word explains why, not only when?',opts:['then','because'],ans:1},task:'Join all 4 sentences',show:()=>demo(2),
 go:()=>begin(2,`First sentence: ${F.LINK[0].a} … ${F.LINK[0].b} Three words to choose from.`,'Because points back to the cause. So points on to the effect.')},
{h:'Steps and reasons',p:'Texts also explain how things are done. To stop the fire, people made firebreaks. Put the steps in order. Each one shows its reason.',task:'Order the 3 steps',show:()=>demo(3),
 go:()=>begin(3,'Three step boxes. Four cards: one is a step that would not work.','A good explanation of a process says what to do and why each step matters.')},
{h:'One thing led to another',p:'Often an effect becomes the cause of the next thing. Build the chain from the dry summer to the new brick city.',task:'Build the whole chain',show:()=>demo(4),
 go:()=>begin(4,'Five links in a chain, joined by arrows. Five cards.','Read down the arrows: each link caused the next one.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.hook()});
function why(t){let m='Look back at the text and think about what came first.';
 if(t==='one')m='One cause is rarely the whole story. The wind, dry wooden houses and the stores all helped.';
 if(t==='detail')m='That is a detail. It tells you when or who, but not why it happened.';
 if(t==='order')m='And then only gives the order. Because shows that one thing made the other happen.';
 if(t==='flip')m='That came before the fire. A cause comes before. An effect comes after, because of the fire.';
 if(t==='proof')m='Saying it again is not proof. Point to the sentence in the text that says it.';
 if(t==='late')m='A burning house cannot stop a fire. The gaps had to be made before the flames arrived.';
 return m}
function ask(){qn++;const Q=F.QS[qn%F.QS.length],opts=[[Q.a,'ok'],...Q.o],sh=qn%3,list=opts.slice(sh).concat(opts.slice(0,sh));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function judge(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t));A.cv.setAttribute('aria-label',ok?'Correct: '+a:why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.7,draw,onStep:X=>{quiz.hidden=X.step!==5;pad.hidden=X.step===5;controls()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Fire text buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}}).start()})})();
