/* Flagship – structure of information texts (ages 9–10): tap signal words; sort passages into the four structures
   (with a "First, … However" trap); fit four bee passages to graphic organisers; rebuild cause chains written effect-first;
   pick the structure for an author's goal. Every tap or drag has a button twin; the canvas label says what happened. */
(()=>{
const KIND=['Time order','Compare and contrast','Cause and effect','Problem and solution'],SHORT=['Time order','Compare','Cause → effect','Problem → fix'];
const KINDCUE=['when things happen, step by step','how two things are alike and different','why something happens and what it leads to','what is wrong and how it was fixed'];
/* * marks a signal word or phrase; ~ marks a distractor offered as a button */
const PARA=[{k:0,t:'*First, the frog lays ~eggs called frogspawn. *Next, tadpoles hatch and swim. *Then they grow legs. *Finally, the young frog hops out of the ~pond.'},
 {k:2,t:'Bees carry ~pollen from flower to flower. *Because of this, apple trees can make fruit. With fewer bees there are fewer apples, *so farmers plant wild ~flowers. *As a result, the bees come back.'},
 {k:1,t:'Frogs have smooth, ~wet skin. *However, toads have dry, bumpy skin. *Both lay their eggs in ~water. *Unlike most frogs, toads can live far from ponds.'}];
const PASS=[['First, frogs have smooth wet skin. However, toads have dry bumpy skin.',1],['In 1969, Apollo 11 left Earth. Four days later, it landed on the Moon.',0],
 ['Heavy rain fell for a week. As a result, the river burst its banks.',2],['Litter was hurting birds in the park. The solution: more bins and a clean-up club.',3],
 ['Most owls hunt at night, while hawks hunt by day. Both have sharp talons.',1],['The sun warmed the ice, so it melted and the path turned to mud.',2],
 ['Our school threw away lots of food. To fix this, we started a compost heap.',3],['The seed is planted. Then roots grow down. After that, a shoot pushes up.',0]];
const BEE=[['A bee egg hatches into a larva. Next, the larva spins a cocoon. About three weeks after the egg, an adult bee comes out.',0],
 ['Honeybees live in big hives. Bumblebees, however, live in small nests. Both make honey, but bumblebees make only a little.',1],['Bees carry pollen between flowers. Because of this, plants can make fruit and seeds.',2],
 ['Bees are losing the wild flowers they feed on. One solution is to plant flowers in gardens and parks.',3]];
const CHAIN=[{t:'Schools closed because the streets flooded. The streets flooded because the river rose. The river rose after days of heavy rain.',e:['Heavy rain','The river rose','Streets flooded','Schools closed']},
 {t:'Fewer apples grew this year, because fewer flowers were pollinated. That happened because there were fewer bees.',e:['Fewer bees','Fewer flowers pollinated','Fewer apples']}];
const GOAL=[['Explain how a caterpillar becomes a butterfly',0],['Show how bats and birds are alike and different',1],['Explain why the dinosaurs died out',2],['Get the town to fix the broken swings',3],
 ['Tell what happened on the Titanic, hour by hour',0],['Explain why ice melts in the sun',2]];
VIS.reg('flagtstr',c=>{let A,keys,qa,qk=-1,tok=0,adv=0;
const blank=()=>({want:()=>{},won:0,r:0,grab:null,bad:-1,p:0,found:[],c:0,got:[],ok:''}),S=blank();
const phase=()=>['signal','sort','bees','chain','goal','quiz'][A.step],rm=()=>A.reduced(),sz=n=>Math.round(n*(A.narrow?1:1.12));
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const target=()=>({signal:10,sort:6,bees:4,chain:2,goal:5}[phase()]||9);
const HUE=()=>{const d=A.col.dark;return d?['#1e3a8a','#581c87','#7c2d12','#14532d']:['#dbeafe','#f3e8ff','#ffedd5','#dcfce7']};
function say(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
function rows(g,t,maxw,n){g.font=`700 ${sz(n)}px system-ui,sans-serif`;const out=[''];t.split(' ').forEach(w=>{const k=out.length-1,nx=out[k]?out[k]+' '+w:w;if(g.measureText(nx).width>maxw&&out[k])out.push(w);else out[k]=nx});return out}
function para(g,t,x,y,n,maxw,col){const ls=rows(g,t,maxw,n),lh=sz(n)*1.25;ls.forEach((l,i)=>say(g,l,x,y+(i-(ls.length-1)/2)*lh,n,col))}
function tile(g,r,warn,fill,edge){const C=A.col;g.fillStyle=fill||(C.dark?'#1e293b':'#fff');A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=warn?C.rd:edge||C.ln;g.lineWidth=warn?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const within=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* ---- 1 signal words: each word or signal phrase is its own tap target ---- */
function toks(i){const out=[];PARA[i].t.split(' ').forEach(w=>{const m=w[0]==='*'?1:w[0]==='~'?2:0,c=m?w.slice(1):w,last=out[out.length-1];
 if(last&&last.m===1&&!/[,.]$/.test(last.w)&&m===0&&/^(a|of|this|result,)$/.test(c))last.w+=' '+c;else out.push({w:c,m})});return out}
function layout(){const g=A.ctx,ts=toks(S.p%PARA.length);let R;for(const[n,f]of[[17,2],[16,1.7],[14,1.55],[13,1.45]]){const gap=sz(n)*.4,lh=sz(n)*f;g.font=`700 ${sz(n)}px system-ui,sans-serif`;let x=14,y=A.H*.1;
 R=ts.map((t,i)=>{const w=g.measureText(t.w).width+8;if(x+w>A.W-14){x=14;y+=lh}const r={x,y:y-lh*.42,w,h:lh*.84,i,n,...t};x+=w+gap;return r});if(y+lh*.45<A.H*.72)break}return R}
function drawSignal(g){const C=A.col,L=layout(),k=PARA[S.p%PARA.length].k,all=L.filter(t=>t.m===1).length,got=S.found.length;
 L.forEach(t=>{const on=S.found.includes(t.i);if(on){g.fillStyle=HUE()[k];A.paint.rrect(t.x,t.y,t.w,t.h,8);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;A.paint.rrect(t.x,t.y,t.w,t.h,8);g.stroke()}
  if(S.bad===t.i){g.strokeStyle=C.rd;g.lineWidth=4;A.paint.rrect(t.x,t.y,t.w,t.h,8);g.stroke()}say(g,t.w,t.x+4,t.y+t.h/2,t.n,C.tx,on?900:600,'left')});
 const r={x:14,y:A.H*.74,w:A.W-28,h:A.H*.18};tile(g,r,false,got>=all?HUE()[k]:null);
 say(g,got>=all?`Structure: ${KIND[k]}`:`Signal words found: ${got} of ${all}`,A.W/2,r.y+r.h*.35,15,C.tx,800);para(g,got>=all?`It tells ${KINDCUE[k]}.`:'Signal words link the ideas. Tap them.',A.W/2,r.y+r.h*.7,12,r.w-16,got>=all?C.tx:C.mu)}
function tapWord(i){if(phase()!=='signal'||S.won>=target())return;const L=layout(),t=L[i];if(!t||S.found.includes(i))return;
 if(t.m!==1)return miss(`"${t.w.replace(/[,.]/g,'')}" is part of the topic, not a signal word. Signal words link ideas, like first, because or however.`,i);
 S.found.push(i);S.won++;A.sound.pop();const all=L.filter(x=>x.m===1).length,k=PARA[S.p%PARA.length].k;
 if(S.found.length>=all){speak(`All ${all} signal words found. They point to ${KIND[k].toLowerCase()}: the text tells ${KINDCUE[k]}.`);const t0=++adv;
  setTimeout(()=>{if(t0!==adv||S.won>=target())return;S.p++;S.found=[];buttons();A.redraw()},rm()?20:900)}else speak(`"${t.w.replace(/[,.]$/,'')}" is a signal word. ${all-S.found.length} to go.`);
 buttons();A.redraw();S.want()}
/* ---- 2/3/5 card sorters ---- */
const pile=()=>({sort:PASS,bees:BEE,goal:GOAL}[phase()]);
function cardBox(){const g=A.ctx,t=pile()[S.r%pile().length][0],ls=rows(g,t,A.W*.8,14),w=Math.min(A.W-20,Math.max(...ls.map(l=>g.measureText(l).width))+28),h=sz(14)*(1.2+ls.length*1.25);
 return S.grab&&S.grab.x!=null?{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h}:{x:(A.W-w)/2,y:A.H*.04,w,h}}
function binBox(){const two=A.narrow,cols=two?2:4,gap=8,w=(A.W-20-gap*(cols-1))/cols,h=A.H*(two?.2:.34),top=A.H*(two?.5:.56);
 return KIND.map((_,k)=>({x:10+(k%cols)*(w+gap),y:top+Math.floor(k/cols)*(h+gap),w,h}))}
/* little graphic organisers: timeline, Venn, cause arrow, problem box */
function organiser(g,k,x,y,s){const C=A.col;g.strokeStyle=C.tx;g.lineWidth=2.5;g.fillStyle=C.tx;g.beginPath();
 if(k===0){g.moveTo(x-s,y);g.lineTo(x+s,y);g.stroke();[-1,0,1].forEach(i=>{g.beginPath();g.arc(x+i*s*.7,y,4,0,7);g.fill()})}
 if(k===1){g.arc(x-s*.3,y,s*.45,0,7);g.stroke();g.beginPath();g.arc(x+s*.3,y,s*.45,0,7);g.stroke()}
 if(k===2){g.moveTo(x-s,y);g.lineTo(x+s*.8,y);g.stroke();g.beginPath();g.moveTo(x+s,y);g.lineTo(x+s*.6,y-s*.3);g.lineTo(x+s*.6,y+s*.3);g.closePath();g.fill()}
 if(k===3){g.strokeRect(x-s,y-s*.3,s*.7,s*.6);g.strokeRect(x+s*.3,y-s*.3,s*.7,s*.6);g.beginPath();g.moveTo(x-s*.25,y);g.lineTo(x+s*.25,y);g.stroke()}}
function drawSorter(g){const C=A.col,v=phase(),r0=cardBox();binBox().forEach((r,k)=>{tile(g,r,S.bad===k,HUE()[k]);
  if(v==='bees')organiser(g,k,r.x+r.w/2,r.y+r.h*.34,Math.min(r.w*.28,30));else say(g,['⏱','⚖','➜','🔧'][k],r.x+r.w/2,r.y+r.h*.3,18);
  para(g,v==='bees'?['Timeline','Venn diagram','Cause arrow','Problem box'][k]:SHORT[k],r.x+r.w/2,r.y+r.h*.68,13,r.w-12)});
 say(g,`${S.won} of ${target()} ${v==='bees'?'fitted':'sorted'}`,A.W/2,A.H*(A.narrow?.44:.5),12,C.mu,700);
 A.paint.shadow(10,3,.2);tile(g,r0,false,C.dark?'#334155':'#fef9c3');A.paint.noShadow();para(g,pile()[S.r%pile().length][0],r0.x+r0.w/2,r0.y+r0.h/2,14,A.W*.8,C.dark?'#f8fafc':'#111827')}
function drop(k){const v=phase();if(!pile()||S.won>=target())return;const[t,ans]=pile()[S.r%pile().length];
 if(k!==ans){let m=`This one tells ${KINDCUE[ans]}, so it is ${KIND[ans].toLowerCase()}.`;
  if(v==='sort'&&S.r%PASS.length===0&&k===0)m='"First" here just starts a list. "However" sets frogs against toads, so the whole text compares them.';
  else if(v==='goal')m=`To ${t.toLowerCase()}, the reader needs ${KINDCUE[ans]}.`;
  else if(v==='bees')m=`All four passages are about bees, so the topic does not decide. This one tells ${KINDCUE[ans]}.`;return miss(m,k)}
 S.won++;S.r++;A.sound.pop();speak(`Yes! ${KIND[k]}.${v==='bees'?' Same topic, different structure.':''}${S.won<target()?' Next one.':''}`);buttons();A.redraw();S.want()}
/* ---- 4 cause chains ---- */
const chain=()=>CHAIN[S.c%CHAIN.length];
function evBoxes(){const n=chain().e.length,two=A.narrow,cols=2,w=(A.W-30)/cols,h=A.H*.1,order=[2,0,3,1].filter(i=>i<n);
 return order.map((ei,j)=>({x:10+(j%cols)*(w+10),y:A.H*(two?.33:.36)+Math.floor(j/cols)*(h+8),w,h,ei}))}
function slotAt(j,n){const w=(A.W-20-(n-1)*22)/n;return{x:10+j*(w+22),y:A.H*.7,w,h:A.H*.16}}
function drawChain(g){const C=A.col,ch=chain(),n=ch.e.length;tile(g,{x:10,y:A.H*.03,w:A.W-20,h:A.H*.26},false,C.dark?'#1e293b':'#f8fafc');para(g,ch.t,A.W/2,A.H*.16,13,A.W-40);
 evBoxes().forEach(r=>{const used=S.got.includes(r.ei);tile(g,r,S.bad===r.ei,used?A.alpha(C.mu,.2):null);para(g,(used?'✓ ':'')+ch.e[r.ei],r.x+r.w/2,r.y+r.h/2,13,r.w-12,C.tx)});
 say(g,'What happened first? Tap the events in order.',A.W/2,A.H*.64,12,C.mu,700);
 for(let j=0;j<n;j++){const s=slotAt(j,n),e=S.got[j];tile(g,s,false,e!=null?HUE()[2]:null);if(e!=null)para(g,ch.e[e],s.x+s.w/2,s.y+s.h/2,12,s.w-8);else say(g,j===0?'cause':j===n-1?'end':'then',s.x+s.w/2,s.y+s.h/2,11,C.mu);
  if(j<n-1){say(g,'➜',s.x+s.w+11,s.y+s.h/2,14,C.tx,800)}}}
function pick(ei){if(phase()!=='chain'||S.won>=target()||S.got.includes(ei))return;const ch=chain(),want=S.got.length;
 if(ei!==want){const m=ei===ch.e.length-1?`"${ch.e[ei]}" is mentioned first, but it happened last. Look at the "because" part: that came first.`:`Not yet. "${ch.e[ei]}" was caused by something else. Find the event that started the chain.`;return miss(m,ei)}
 S.got.push(ei);A.sound.tick();if(S.got.length<ch.e.length){speak(`${ch.e[ei]}. What did that lead to?`);buttons();return A.redraw()}
 S.won++;const t0=++adv;speak(`Chain built: ${ch.e.join(', then ')}. The text named the effect first, but the cause happened first.`);A.redraw();
 setTimeout(()=>{if(t0!==adv)return;S.c++;S.got=[];buttons();A.redraw();S.want()},rm()?20:900)}
function miss(t,b){A.sound.miss();S.bad=b==null?-1:b;speak(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=phase();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){[0,1,2,3].forEach(k=>organiser(g,k,W*(.14+k*.24),H*.4,Math.min(W*.08,34)));say(g,'Spot the signal words, name the structure.',W/2,H*.72,14,C.tx,800);return}
 if(S.won>=target()){para(g,{signal:'Signal words point to the structure.',sort:'Look at how the whole text is built.',bees:'One topic, four structures.',chain:'The cause comes first, even if it is written last.',goal:'The author picks the structure that fits the goal.'}[v],W/2,H/2,16,W-40);return A.fx.draw(g)}
 if(v==='signal')drawSignal(g);else if(v==='chain')drawChain(g);else drawSorter(g);A.fx.draw(g)}
function buttons(){if(!keys)return;keys.innerHTML='';const v=phase(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};if(v==='quiz'||S.won>=target())return;
 if(v==='signal')layout().filter(t=>t.m&&!S.found.includes(t.i)).forEach(t=>B(t.w.replace(/[,.]$/,''),()=>tapWord(t.i),`Tap the word ${t.w.replace(/[,.]$/,'')}`));
 if(v==='sort'||v==='goal')KIND.forEach((k,i)=>B(k,()=>drop(i)));
 if(v==='bees')['Timeline','Venn diagram','Cause arrow','Problem box'].forEach((k,i)=>B(k,()=>drop(i),`${k}: ${KIND[i]}`));
 if(v==='chain')chain().e.forEach((e,i)=>{if(!S.got.includes(i))B(e,()=>pick(i),`Happened next: ${e}`)})}
function down(p){const v=phase();if(S.won>=target())return false;
 if(v==='signal'){const t=layout().find(r=>within(p,r));if(t)tapWord(t.i);return false}
 if(v==='chain'){const r=evBoxes().find(r=>within(p,r));if(r)pick(r.ei);return false}
 if(within(p,cardBox())){S.grab={x:null,y:null,x0:p.x,y0:p.y};return true}const k=binBox().findIndex(r=>within(p,r));if(k>=0)drop(k);return false}
function move(p){if(!S.grab)return;if(S.grab.x!=null||Math.hypot(p.x-S.grab.x0,p.y-S.grab.y0)>8){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const gr=S.grab;S.grab=null;if(!gr)return;if(gr.x==null){speak('Now tap the box it belongs in.');return A.redraw()}const k=binBox().findIndex(r=>within(p,r));if(k>=0)drop(k);A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const clear=()=>{tok++;adv++;Object.assign(S,blank())};
const sigOrder=()=>{const out=[];PARA.forEach((_,pi)=>{const ts=[];toks(pi).forEach((t,i)=>{if(t.m===1)ts.push(i)});out.push(ts)});return out};
const steps=[
{h:'Signal words',p:'Signal words link ideas: first, because, however. Tap every signal word in each paragraph. They show how the text is built.',task:'Find 10 signal words',
 show:()=>{steps[0].go();const L=sigOrder(),fns=[];L.forEach((ts,pi)=>{ts.forEach(i=>fns.push(()=>tapWord(i)));if(pi<L.length-1)fns.push(...[0,0,0,0].map(()=>()=>{}))});demo(fns,240)},go:()=>{clear();speak('Find the words that link the ideas.');buttons();S.want=ready(0,()=>S.won>=10,'Signal words point to a structure.')}},
{h:'Name the structure',p:'Information texts use four main structures. Drag each passage to its box, or tap a box.',predict:{q:'A passage starts with "First". Must it be in time order?',opts:['Yes, first means time order','No, check how the whole text is built'],ans:1},task:'Sort 6 passages',
 show:()=>{steps[1].go();demo(PASS.slice(0,6).map(([,k])=>()=>drop(k)),320)},go:()=>{clear();speak('Which structure is this passage?');buttons();S.want=ready(1,()=>S.won>=6,'The whole passage decides, not one word.')}},
{h:'One topic, four ways',p:'All four passages are about bees. Fit each to its graphic organiser: timeline, Venn diagram, cause arrow or problem box.',predict:{q:'Does a topic like bees have just one right structure?',opts:['Yes, each topic has its own','No, the author chooses'],ans:1},task:'Fit 4 bee passages',
 show:()=>{steps[2].go();demo(BEE.map(([,k])=>()=>drop(k)),380)},go:()=>{clear();speak('Same topic. Which organiser fits?');buttons();S.want=ready(2,()=>S.won>=4,'The structure comes from the author, not the topic.')}},
{h:'Cause comes first',p:'Writers often name the effect first: "Schools closed because the streets flooded." Tap the events in the order they happened.',predict:{q:'In "Schools closed because the streets flooded", what happened first?',opts:['Schools closed','The streets flooded'],ans:1},task:'Build 2 cause chains',
 show:()=>{steps[3].go();demo([0,1,2,3,null,null,null,0,1,2].map(i=>i==null?()=>{}:()=>pick(i)),380)},go:()=>{clear();speak('Read the text, then tap the first event.');buttons();S.want=ready(3,()=>S.won>=2,'Because points back to the cause.')}},
{h:'Why this structure?',p:'Authors choose a structure that fits their goal. Pick the best one for each.',task:'Match 5 goals',
 show:()=>{steps[4].go();demo(GOAL.slice(0,5).map(([,k])=>()=>drop(k)),320)},go:()=>{clear();speak('What does the reader need?');buttons();S.want=ready(4,()=>S.won>=5,'Goal first, then structure.')}},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['"Sharks have bones made of cartilage. In contrast, most fish have hard bones." Which structure is this?',[['Compare and contrast','ok'],['Cause and effect','because'],['Time order','order']]],
 ['Which signal words point to time order?',[['First, next, finally','ok'],['However, both, unlike','compare'],['Because, so, as a result','cause']]],
 ['"The town flooded because the river burst its banks." What happened first?',[['The river burst its banks','ok'],['The town flooded','mention'],['Both at the same time','same']]],
 ['An author wants readers to help clean up a beach. Which structure fits best?',[['Problem and solution','ok'],['Compare and contrast','compare2'],['Time order','order2']]],
 ['A text about volcanoes explains how an eruption happens, step by step. What does this show?',[['The structure comes from the author\'s goal','ok'],['Volcano texts are always time order','topic'],['Any structure would explain it just as well','any']]]];
function why(t){return{because:'Nothing here causes anything. "In contrast" sets sharks against fish, so it compares.',order:'There are no steps or times. It sets two things side by side, so it compares.',
 compare:'However, both and unlike set two things side by side: compare and contrast.',cause:'Because, so and as a result give reasons: cause and effect.',
 mention:'It is written first, but "because" points to the cause. The river burst first, then the town flooded.',same:'One caused the other, so one came first: the river burst its banks.',
 compare2:'Comparing two beaches would not get anyone to help. Name the problem, then give the fix.',order2:'Steps in time do not say what is wrong. A problem and its solution move readers to act.',
 topic:'Another volcano text could compare two volcanoes. The goal, step by step, decides the structure.',any:'Step-by-step events need time order. A structure that fits the goal makes it easier to follow.'}[t]||'Look at the signal words and the goal.'}
function pose(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 qa.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function mark(t){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! You read the structure.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{qa.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qa=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});buttons()}});
A.start()})})();
