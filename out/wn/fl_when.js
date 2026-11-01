/* Flagship – expressing time, place and cause (ages 7–8): drop the right conjunction into the gap (because, so, before,
   after, while) and hear what a wrong one would mean; swap a story's "then, then, then" for First, Next, After that and
   Finally; sort prepositional phrases into when, where and why; build "because" and "so" sentences with the cause in the
   right half; move a time clause to the front and place its comma; then a challenge on the classic slips. */
(()=>{const mn=Math.min,hy=Math.hypot;
const JOIN=[['We went inside','it was raining.','because',{so:'“So” shows a result. That says going inside made it rain!',before:'“Before” is a time word. The rain is the reason, so we need a cause word.',after:'“After” is about time. The rain is why we went in.',while:'“While” means at the same time. We need the reason why.'}],
 ['It was raining,','we went inside.','so',{because:'“Because” would say the rain started because we went in. Backwards!',before:'“Before” would mean the rain came first in time only. “So” shows the rain caused it.',after:'“After” muddles the order: the rain came first.',while:'“While” means both at once, not one causing the other.'}],
 ['Brush your teeth','you go to bed.','before',{after:'“After” puts bed first. You brush first, then go to bed.',because:'Bed is not the reason you brush. This is about order in time.',so:'“So” would mean brushing makes you go to bed.',while:'You cannot brush and fall asleep at the same time!'}],
 ['Sam read a comic','he waited for the bus.','while',{after:'“After” means one thing ended first. He read and waited at the same time.',before:'“Before” means reading came first. Both happened at once.',because:'Waiting is not the reason he read. This is about time.',so:'“So” would mean reading made him wait.'}]];
const CONJ=['because','so','before','after','while'];
const STORY=['we packed a picnic.','we walked to the park.','we ate our sandwiches.','we went home.'],ADV=['After that,','Finally,','First,','Next,'];
const PHR=[['during the lesson',0],['under the bridge',1],['because of the rain',2],['before lunch',0],['in the garden',1],['because of the noise',2],['on Monday',0],['behind the shed',1]];
const BINS=['⏰ When?','📍 Where?','❓ Why?'],BINQ=['when','where','why'];
const CAUSE=[['so','It was cold','Mia wore a coat'],['because','it heard a knock','The dog barked'],['so','The ice melted','the pond filled up']];
const FRONT=['We','lined','up','after','the','bell','rang.'];
VIS.reg('flagwhen',c=>{let A,pad,chal,qi=-1,run=0;
const K={tok:0,want:()=>{},r:0,miss:'',slot:[],sort:[],cur:0,bin:-1,cs:[],ci:0,moved:0,comma:-1,held:null};
const view=()=>['join','story','sort','cause','front','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.15)),F=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function write(g,t,x,y,n,col,w,al){g.font=F(n,w);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
// lay out pieces in wrapped rows; each piece {t, kind:'word'|'gap'|'tile'}
function flow(g,ps,y0,n){g.font=F(n,700);const pad=z(10),h=z(n)+z(16),out=[];let x=8,y=y0;
 ps.forEach(p=>{const w=Math.max(p.kind==='gap'?z(70):0,g.measureText(p.t).width+pad*2);if(x+w>A.W-8&&x>8){x=8;y+=h+8}out.push({...p,x,y,w,h});x+=w+8});
 const rows={};out.forEach(r=>{(rows[r.y]=rows[r.y]||[]).push(r)});Object.values(rows).forEach(R=>{const L=R[R.length-1],sh=(A.W-(L.x+L.w)-8)/2;R.forEach(r=>r.x+=sh)});return out}
function piece(g,r,n,st){const C=A.col;if(r.kind==='word'){write(g,r.t,r.x+r.w/2,r.y+r.h/2,n,C.tx,600);return}
 g.fillStyle=r.kind==='gap'?A.alpha(st==='bad'?C.rd:st==='ok'?C.gr:C.vi,.14):A.alpha(C.or,.28);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.strokeStyle=r.kind==='gap'?(st==='bad'?C.rd:st==='ok'?C.gr:C.vi):C.tx;g.lineWidth=2;if(r.kind==='gap'&&!r.full)g.setLineDash([6,4]);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.setLineDash([]);
 write(g,r.t,r.x+r.w/2,r.y+r.h/2,n,C.tx,800)}
// ---- geometry for each view: returns {zones:[], tiles:[]} with rects ----
let G={zones:[],tiles:[]};
function geom(g){const v=view(),Z=[],T=[];
 if(v==='join'&&K.r<JOIN.length){const j=JOIN[K.r];flow(g,[{t:j[0],kind:'word'},{t:K.miss||'   ?   ',kind:'gap',z:0},{t:j[1],kind:'word'}],A.H*.22,15).forEach(r=>r.kind==='gap'?Z.push(r):T.push(r));
  const tl=flow(g,CONJ.map((t,i)=>({t,kind:'tile',i})),A.H*.66,15);G={zones:Z,tiles:tl,words:T};return}
 if(v==='story'){const ws=[];STORY.forEach((s,i)=>{const r=flow(g,[{t:K.slot[i]!=null?ADV[K.slot[i]]:'   ?   ',kind:'gap',z:i,full:K.slot[i]!=null},{t:s,kind:'word'}],A.H*(.13+i*.13),13);r.forEach(q=>q.kind==='gap'?Z.push(q):ws.push(q))});
  const tl=flow(g,ADV.map((t,i)=>({t,kind:'tile',i})).filter(p=>!K.slot.includes(p.i)),A.H*.72,14);G={zones:Z,tiles:tl,words:ws};return}
 if(v==='sort'){const w=(A.W-24)/3;BINS.forEach((b,i)=>Z.push({x:8+i*(w+4),y:A.H*.38,w,h:A.H*.58,z:i,t:b}));
  const tl=K.cur<PHR.length?flow(g,[{t:PHR[K.cur][0],kind:'tile',i:K.cur}],A.H*.17,15):[];G={zones:Z,tiles:tl,words:[]};return}
 if(v==='cause'&&K.ci<CAUSE.length){const[cj,a,b]=CAUSE[K.ci],s=K.cs;const ps=[{t:s[0]!=null?[a,b][s[0]]:'   ?   ',kind:'gap',z:0,full:s[0]!=null},{t:cj,kind:'word'},{t:s[1]!=null?[a,b][s[1]]:'   ?   ',kind:'gap',z:1,full:s[1]!=null}];
  const ws=[];flow(g,ps,A.H*.24,14).forEach(r=>r.kind==='gap'?Z.push(r):ws.push(r));const tl=flow(g,[a,b].map((t,i)=>({t,kind:'tile',i})).filter(p=>!s.includes(p.i)),A.H*.68,14);G={zones:Z,tiles:tl,words:ws};return}
 if(v==='front'){const ws=K.moved?['After','the','bell','rang','we','lined','up.']:FRONT;let ps=[];
  if(!K.moved)ps=[{t:'   ?   ',kind:'gap',z:0},...ws.slice(0,3).map(t=>({t,kind:'word'})),{t:'after the bell rang.',kind:'tile',i:0}];
  else ws.forEach((t,i)=>{ps.push({t:t+(K.comma===i?',':''),kind:'word',wi:i});if(i<ws.length-1)ps.push({t:'',kind:'slot',z:i})});
  const rs=flow(g,ps,A.H*.3,15);G={zones:rs.filter(r=>r.kind==='gap'||r.kind==='slot'),tiles:rs.filter(r=>r.kind==='tile'),words:rs.filter(r=>r.kind==='word')};return}
 G={zones:[],tiles:[],words:[]}}
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.05:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){write(g,'because · so · before · after · while',W/2,H*.4,17,C.tx,800);write(g,'when? · where? · why?',W/2,H*.58,15,C.tx,700);return}
 geom(g);const held=K.held;
 if(v==='join'){if(K.r>=JOIN.length){write(g,'Four joins, four meanings!',W/2,H*.4,17,C.gr,800);return}write(g,`Pick the joining word (${K.r+1} of 4)`,W/2,H*.08,14,C.tx,800);
  G.words.forEach(r=>piece(g,r,15));G.zones.forEach(r=>piece(g,r,15,K.miss?'bad':''));write(g,'Drag a conjunction into the gap',W/2,H*.58,12,C.tx,600)}
 if(v==='story'){write(g,'Swap “then, then, then” for time adverbs',W/2,H*.05,13,C.tx,800);G.words.forEach(r=>piece(g,r,13));G.zones.forEach(r=>piece(g,r,13,K.slot[r.z]!=null?'ok':K.bad===r.z?'bad':''))}
 if(v==='sort'){write(g,K.cur<PHR.length?'Does this phrase tell when, where or why?':'All eight sorted!',W/2,H*.07,14,K.cur<PHR.length?C.tx:C.gr,800);
  G.zones.forEach(r=>{g.fillStyle=A.alpha([C.cy,C.gr,C.vi][r.z],K.bin===r.z?.3:.13);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=K.bin===r.z?C.rd:C.tx;g.lineWidth=K.bin===r.z?3:1.5;g.stroke();
   write(g,r.t,r.x+r.w/2,r.y+z(16),13,C.tx,800);PHR.forEach(([p,b],i)=>{if(K.sort[i]===r.z){const k=PHR.filter((q,j)=>K.sort[j]===r.z&&j<i).length;write(g,p,r.x+r.w/2,r.y+z(40)+k*z(19),A.narrow?9:11,C.tx,600)}})})}
 if(v==='cause'){if(K.ci>=CAUSE.length){write(g,'Cause and result in the right halves!',W/2,H*.4,16,C.gr,800);return}
  write(g,'Which half is the cause? Which is the result?',W/2,H*.08,14,C.tx,800);write(g,`Sentence ${K.ci+1} of 3`,W/2,H*.15,12,C.tx,600);
  G.words.forEach(r=>piece(g,r,14));G.zones.forEach(r=>piece(g,r,14,K.cs[r.z]!=null?'ok':K.bad===r.z?'bad':''))}
 if(v==='front'){write(g,K.moved?'Tap the gap where the comma goes':'Drag the time clause to the front',W/2,H*.08,14,C.tx,800);G.words.forEach(r=>piece(g,r,15));
  G.zones.forEach(r=>{if(r.kind==='gap')return piece(g,r,15);const on=K.bad===r.z;g.fillStyle=A.alpha(on?C.rd:C.vi,on?.5:.22);A.paint.rrect(r.x-2,r.y+4,r.w+4,r.h-8,4);g.fill()});
  if(K.comma>=0)write(g,'After the bell rang, we lined up.',W/2,H*.75,15,C.gr,800)}
 G.tiles.forEach(r=>{if(held&&held.i===r.i)return;piece(g,r,v==='story'?14:15)});if(held)piece(g,{...held.r,x:held.x-held.r.w/2,y:held.y-held.r.h/2},15);A.fx.draw(g)}
// ---- actions ----
const bad=(t)=>{A.sound.miss();tell(t);A.redraw()},good=t=>{A.sound.pop();tell(t);pads();A.redraw();K.want()};
function join(w){if(K.r>=JOIN.length)return;const j=JOIN[K.r];if(w!==j[2]){K.miss=w;return bad(j[3][w])}K.miss='';K.r++;good(`Yes: “${j[0]} ${w} ${j[1]}” ${w==='because'?'gives the reason.':w==='so'?'shows the result.':w==='while'?'means at the same time.':'puts things in time order.'}`)}
function story(i,s){if(K.slot[s]!=null||K.slot.includes(i))return A.redraw();const t=ADV[i];K.bad=-1;
 if(t==='First,'&&s!==0){K.bad=s;return bad('“First” means the very first thing. It belongs on the first sentence.')}
 if(t==='Finally,'&&s!==3){K.bad=s;return bad('“Finally” means the last thing. It belongs on the last sentence.')}
 if((t==='Next,'||t==='After that,')&&(s===0||s===3)){K.bad=s;return bad(`“${t.slice(0,-1)}” follows something that already happened. It goes in the middle.`)}
 K.slot[s]=i;good(`“${t} ${STORY[s]}”`)}
function sortP(b){if(K.cur>=PHR.length)return;const[p,ok]=PHR[K.cur];if(b!==ok){K.bin=b;
  return bad(ok===2?`“${p}” tells why it happened: it is a cause.`:ok===0?`“${p}” tells when. ${p.startsWith('in')?'':'Time words: during, before, after, on.'}`:`“${p}” tells where: a place.${p.startsWith('in')?' “In” can be time too, as in “in the morning”, but a garden is a place.':''}`)}
 K.bin=-1;K.sort[K.cur]=b;K.cur++;good(`“${p}” answers ${BINQ[b]}?`)}
function causeP(i,s){if(K.ci>=CAUSE.length||K.cs[s]!=null||K.cs.includes(i))return A.redraw();const want=CAUSE[K.ci][0]==='so'?[0,1]:[1,0];K.bad=-1;
 if(want[s]!==i){K.bad=s;return bad(want[0]===0?'With “so”, the cause comes first and the result after “so”. Swap them.':'With “because”, the cause comes after “because”. Swap them.')}
 K.cs[s]=i;if(K.cs[0]!=null&&K.cs[1]!=null){const[cj,a,b]=CAUSE[K.ci],t=`${[a,b][K.cs[0]]} ${cj} ${[a,b][K.cs[1]]}.`;K.ci++;K.cs=[];return good(`“${t}”`)}A.sound.tick();A.redraw();pads()}
function frontP(){if(K.moved)return;K.moved=1;good('The clause is at the front. Now it needs a comma.')}
function commaP(gp){if(!K.moved||K.comma>=0)return;K.bad=-1;if(gp!==3){K.bad=gp;return bad(gp<3?'That comma cuts the clause “After the bell rang” in half. Put it where the clause ends.':'That is too late. The comma goes straight after the fronted clause, after “rang”.')}K.comma=3;good('“After the bell rang, we lined up.” The comma marks where the fronted clause ends.')}
function drop(i,zn){const v=view();K.held=null;if(zn==null)return A.redraw();if(v==='join')join(CONJ[i]);if(v==='story')story(i,zn);if(v==='sort')sortP(zn);if(v==='cause')causeP(i,zn);if(v==='front')frontP()}
function pads(){if(!pad)return;pad.innerHTML='';const v=view(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(v==='join'&&K.r<JOIN.length)CONJ.forEach(w=>B(w,()=>join(w),'Put '+w+' in the gap'));
 if(v==='story'){const s=[0,1,2,3].find(i=>K.slot[i]==null);if(s!=null){c.el('p',{class:'fl-tk'},pad,`Sentence ${s+1}: ${STORY[s]}`);ADV.forEach((t,i)=>{if(!K.slot.includes(i))B(t,()=>story(i,s),`Put ${t} on sentence ${s+1}`)})}}
 if(v==='sort'&&K.cur<PHR.length){c.el('p',{class:'fl-tk'},pad,`“${PHR[K.cur][0]}”`);BINS.forEach((b,i)=>B(b,()=>sortP(i),`${PHR[K.cur][0]}: ${BINQ[i]}`))}
 if(v==='cause'&&K.ci<CAUSE.length){const s=K.cs[0]==null?0:1,[cj,a,b]=CAUSE[K.ci];c.el('p',{class:'fl-tk'},pad,s?`After “${cj}”:`:`Before “${cj}”:`);[a,b].forEach((t,i)=>{if(!K.cs.includes(i))B(t,()=>causeP(i,s),`${s?'After':'Before'} ${cj}: ${t}`)})}
 if(v==='front'){if(!K.moved)B('Move “after the bell rang” to the front',frontP);else if(K.comma<0)['After','the','bell','rang','we','lined'].forEach((w,i)=>B(`, after “${w}”`,()=>commaP(i),`Comma after ${w}`))}
 A.redraw()}
const inR=(p,r,m)=>p.x>=r.x-(m||0)&&p.x<=r.x+r.w+(m||0)&&p.y>=r.y-(m||0)&&p.y<=r.y+r.h+(m||0);
function down(p){const v=view();if(v==='quiz')return false;if(v==='front'&&K.moved){const s=G.zones.find(r=>inR(p,r,8));if(s)commaP(s.z);return false}
 if(v==='sort'&&!G.tiles.some(r=>inR(p,r))){const b=G.zones.find(r=>inR(p,r));if(b)sortP(b.z);return false}
 const t=G.tiles.find(r=>inR(p,r,4));if(!t)return false;K.held={i:t.i,r:t,x:p.x,y:p.y};A.redraw();return true}
function move(p){if(K.held){K.held.x=p.x;K.held.y=p.y;A.redraw()}}
function up(p){if(!K.held)return;const zn=G.zones.find(r=>inR(p,r,12));drop(K.held.i,zn?zn.z:null)}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fs,ms)=>{const k=++K.tok;fs.forEach((f,j)=>setTimeout(()=>{if(k===K.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=()=>{K.tok++;Object.assign(K,{want:()=>{},r:0,miss:'',slot:[],sort:[],cur:0,bin:-1,cs:[],ci:0,moved:0,comma:-1,held:null,bad:-1})};
const steps=[
{h:'Joining words',p:'A conjunction joins two clauses. Some show time (before, after, while). Some show cause (because, so). Drag one into the gap.',
 predict:{q:'“We went inside ___ it was raining.” Which word fits?',opts:['so','because'],ans:1},task:'Join all four sentences',
 show:()=>{steps[0].go();later(JOIN.map(j=>()=>join(j[2])),550)},go:()=>{fresh();tell('We went inside, gap, it was raining.');pads();K.want=fin(0,()=>K.r>=4,'Because gives a reason, so gives a result, and before, after and while show time.')}},
{h:'Not then, then, then',p:'Time adverbs show the order of events across sentences. Put each one on the right sentence.',task:'Fill all four starts',
 show:()=>{steps[1].go();later([[2,0],[3,1],[0,2],[1,3]].map(([i,s])=>()=>story(i,s)),500)},go:()=>{fresh();tell('Put First, Next, After that and Finally on the four sentences.');pads();K.want=fin(1,()=>K.slot.filter(x=>x!=null).length>=4,'First starts the story, Next and After that move it on, Finally ends it.')}},
{h:'When, where or why?',p:'A preposition starts a phrase that can tell when, where or why. Sort each phrase into a box.',
 predict:{q:'“because of the rain” tells…',opts:['when','why'],ans:1},task:'Sort all eight phrases',
 show:()=>{steps[2].go();later(PHR.map(([,b])=>()=>sortP(b)),380)},go:()=>{fresh();tell('Does “during the lesson” tell when, where or why?');pads();K.want=fin(2,()=>K.cur>=8,'During, before and on tell when; under, in and behind tell where; because of tells why.')}},
{h:'Cause and result',p:'The cause is why it happened. The result is what happened next. Drag each part into its half.',
 predict:{q:'In “It was cold so Mia wore a coat”, the cause comes…',opts:['after “so”','before “so”'],ans:1},task:'Build all three sentences',
 show:()=>{steps[3].go();later([()=>causeP(0,0),()=>causeP(1,1),()=>causeP(1,0),()=>causeP(0,1),()=>causeP(0,0),()=>causeP(1,1)],420)},go:()=>{fresh();tell('It was cold. Mia wore a coat. Which goes before so?');pads();K.want=fin(3,()=>K.ci>=3,'“so” comes before the result; “because” comes before the cause.')}},
{h:'Time clause first',p:'A time clause can move to the front of the sentence. Then a comma marks where it ends.',task:'Move the clause and add the comma',
 show:()=>{steps[4].go();later([frontP,()=>commaP(3)],600)},go:()=>{fresh();tell('We lined up after the bell rang. Move the time clause to the front.');pads();K.want=fin(4,()=>K.comma===3,'A fronted clause is followed by a comma.')}},
{h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
const QS=[['“The plants grew tall ___ we watered them every day.”',[['because','ok'],['so','rev'],['then','then']]],
 ['“We ate lunch. ___, we played outside.”',[['After that','ok'],['Before that','order'],['Because','cause']]],
 ['Which phrase tells WHERE?',[['behind the shed','ok'],['during the film','time'],['because of the fog','why']]],
 ['Which is punctuated correctly?',[['When the bell rang, we ran out.','ok'],['When the bell rang we, ran out.','comma'],['When, the bell rang we ran out.','comma2']]],
 ['“Ben was tired, ___ he went to bed early.”',[['so','ok'],['because','rev2'],['while','while']]],
 ['“Ali packed his bag ___ he left for school.”',[['before','ok'],['after','order2'],['because','cause2']]]];
function slip(tag){let m='Check what the word means: time, place or cause.';
 if(tag==='rev')m='“so” would mean the plants growing made us water them. The watering is the cause, so use “because”.';
 if(tag==='rev2')m='“because” would mean going to bed made Ben tired. Being tired is the cause, so use “so”.';
 if(tag==='then')m='“then” only shows order. Watering is the reason the plants grew, so use a cause word.';
 if(tag==='order')m='“Before that” puts playing first, but lunch came first. “After that” keeps the order.';
 if(tag==='order2')m='“after” would mean he packed once he had already left. He packed first, so use “before”.';
 if(tag==='cause')m='“Because” starts a reason, not a time. Use a time adverb to show what came next.';
 if(tag==='cause2')m='Leaving is not the reason he packed. This sentence is about order in time.';
 if(tag==='time')m='“during the film” tells when. Look for a place word like behind, under or in.';
 if(tag==='why')m='“because of the fog” tells why. A where phrase names a place.';
 if(tag==='comma')m='The comma goes where the fronted clause ends, after “rang”, not after “we”.';
 if(tag==='comma2')m='A comma after “When” splits the clause. Put it after the whole clause “When the bell rang”.';
 if(tag==='while')m='“while” means both at the same time. Being tired caused the early night, so use “so”.';
 return m}
function pose(){qi++;const[q,ops]=QS[qi%QS.length],turn=qi%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});tell('Challenge: '+q);A.redraw()}
function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+slip(tag)}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pads()}});
A.start()})})();
