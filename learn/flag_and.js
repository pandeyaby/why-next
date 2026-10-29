/* Flagship – joining words with "and" (ages 5–7): drag the conjunction "and" between two things (cats and dogs, not
   "and cats dogs"); join two sentences into one, so the first full stop goes and the second start gets a small letter
   (but "I" keeps its capital); build a list with a comma between items and "and" only before the last one; pick an
   idea that belongs with the first one; then break up an "and… and… and…" chain by turning extra ands into full stops.
   Challenge on the usual slips: "and" in the wrong place, two full stops left in, "and" between every list item,
   ideas that do not go together, and run-on chains of ands. */
(()=>{
const PAIR=[['I like','cats','dogs'],['I eat','apples','pears'],['Here come','Sam','Jo']];
const JOIN=[['The dog barked','The cat ran'],['We swam','We had chips'],['I had lunch','I played outside']];
const LIST=[['I packed','a hat','a coat','a scarf'],['I can see','a cat','a dog','a hen'],['We ate','eggs','toast','jam']];
const FIT=[['I was cold','I put on my coat','the fish can swim'],['It was sunny','we went to the beach','my pencil is blue'],['The cake was yummy','I ate it all up','the bus is red']];
const LONG=[['We went to the park','we played on the swings','we had a drink','we went home'],['I got up','I had my breakfast','I brushed my teeth','I went to school']];
const small=w=>w==='I'?w:w[0].toLowerCase()+w.slice(1),big=w=>w[0].toUpperCase()+w.slice(1);
VIS.reg('flagand',c=>{let A,ctl,chal,qn=-1,streak=0;c.fig.classList.add('young');
const S={run:0,k:0,done:0,fill:[null,null],cut:[],bad:-1,badT:'',drag:null,msg:'',want:()=>{}};
const kind=()=>['pair','join','list','fit','long','quiz'][A.step];
const SETS={pair:PAIR,join:JOIN,list:LIST,fit:FIT,long:LONG};
const f=n=>Math.round(n*(A.narrow?1:1.2));
const cur=()=>{const s=SETS[kind()];return s?s[Math.min(S.k,s.length-1)]:null};
const rounds=()=>(SETS[kind()]||[]).length;
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function word(g,t,x,y,n,col,w){g.font=`${w||700} ${f(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
// what the sentence row holds right now: {t} words, {s} drop slots, {a} tappable ands
function items(){const v=kind(),q=cur(),out=[];if(!q)return out;
 if(v==='pair'){const w=[...q[0].split(' '),q[1],q[2]];w.forEach((t,i)=>{out.push({s:i},{t})});out.push({s:w.length});return out}
 if(v==='join'){const a=q[0].split(' '),b=q[1].split(' ');a[a.length-1]+='.';b[b.length-1]+='.';[...a,...b].forEach((t,i)=>{if(i)out.push({s:i});out.push({t})});return out}
 if(v==='list'){q[0].split(' ').forEach(t=>out.push({t}));out.push({t:q[1]},{s:0},{t:q[2]},{s:1},{t:q[3]+'.'});return out}
 if(v==='fit'){out.push({t:q[0]},{t:'and'},{s:0,wide:1},{t:'.'});return out}
 q.forEach((t,i)=>{out.push({t:i&&S.cut.includes(i-1)?big(t):t+(i===3?'.':'')});if(i<3)out.push({a:i})});return out}
function slotText(e){const v=kind();if(S.bad===e.s)return S.badT;if(v==='list'&&S.fill[e.s])return S.fill[e.s];return''}
function lay(){const g=A.ctx,n=f(A.narrow?19:21),gap=f(8),lh=n*2.5,R=[];g.font=`700 ${n}px system-ui,sans-serif`;let x=12,y=A.H*.17;
 items().forEach(e=>{let t=e.t!=null?e.t:e.a!=null?(S.cut.includes(e.a)?'.':'and'):slotText(e),w=e.wide?Math.min(A.W-24,f(210)):Math.max(e.s!=null?f(36):0,g.measureText(t).width+f(16));
  if(x+w>A.W-12&&R.length){x=12;y+=lh}R.push({...e,t,x,y,w,h:n*1.8});x+=w+gap});return R}
const chips=()=>{const v=kind(),q=cur();if(v==='pair'||v==='join')return['and'];if(v==='list')return[',','and'];if(v==='fit')return S.k%2?[q[2],q[1]]:[q[1],q[2]];return[]};
function chipBox(i){const v=kind(),n=chips().length;if(v==='fit'){const h=f(46);return{x:16,y:A.H*.58+i*(h+f(12)),w:A.W-32,h}}
 const s=f(64),gp=f(22),x0=A.W/2-(n*s+(n-1)*gp)/2;return{x:x0+i*(s+gp),y:A.H*.7,w:s,h:s}}
function tile(g,r,fill,edge,dash,lw){g.save();if(dash)g.setLineDash([5,4]);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=edge;g.lineWidth=lw||1.5;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.restore()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=kind();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'“and” joins two things.',W/2,H*.32,18,C.tx,800);word(g,'Lists: a, b and c.',W/2,H*.48,18,C.tx,800);word(g,'Not too many ands!',W/2,H*.64,18,C.tx,800);return}
 g.font=`700 ${f(12)}px system-ui,sans-serif`;g.textAlign='left';g.fillStyle=C.tx;g.fillText(S.k<rounds()?`Round ${S.k+1} of ${rounds()}`:'All done!',12,f(14));
 if(S.k<rounds())lay().forEach(r=>{const y=r.y+r.h/2,cx=r.x+r.w/2;
  if(r.s!=null){const near=S.drag&&S.drag.x!=null&&hit({x:S.drag.x,y:S.drag.y})===r.s,bad=S.bad===r.s,full=!!r.t;
   tile(g,r,A.alpha(bad?C.rd:near?C.gr:full?C.gr:C.or,bad||near||full?.28:.12),bad?C.rd:C.tx,!full&&!bad,bad?3:1.5);if(r.t)word(g,r.t,cx,y,r.wide&&r.t.length>14?15:19,C.tx,800);return}
  if(r.a!=null){tile(g,r,A.alpha(S.cut.includes(r.a)?C.gr:C.vi,.25),C.tx,0,2);word(g,r.t,cx,y,20,C.tx,800);return}
  tile(g,r,A.alpha(C.cy,.12),A.alpha(C.tx,.5));word(g,r.t,cx,y,A.narrow?19:21,C.tx,700)});
 if(S.k<rounds())chips().forEach((t,i)=>{let r=chipBox(i);if(S.drag&&S.drag.i===i&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};tile(g,r,A.alpha(C.vi,.22),C.tx,0,2.5);word(g,t,r.x+r.w/2,r.y+r.h/2,t.length>3?16:26,C.tx,800)});
 if(S.msg){g.font=`800 ${f(13)}px system-ui,sans-serif`;g.textAlign='center';g.fillStyle=C.tx;g.fillText(S.msg,W/2,H-f(14),W-16)}
 A.fx.draw(g)}
function hit(p){let best=-1,d=1e9;lay().forEach(r=>{if(r.s==null)return;const cx=r.x+r.w/2,cy=r.y+r.h/2,dd=Math.hypot(p.x-cx,p.y-cy);if(p.x>r.x-14&&p.x<r.x+r.w+14&&p.y>r.y-16&&p.y<r.y+r.h+16&&dd<d){d=dd;best=r.s}});return best}
const miss=(t,s,bt,short)=>{S.bad=s;S.badT=bt;A.sound.miss();S.msg=short||'Not there. Try again!';say(t);ctrl();A.redraw()};
function good(t,short){A.sound.pop();S.bad=-1;S.k++;S.done++;S.fill=[null,null];S.cut=[];S.msg=short;say(t);ctrl();A.redraw();if(S.k>=rounds())S.want()}
function place(i,s){const v=kind(),q=cur();S.drag=null;if(S.k>=rounds()||s<0)return A.redraw();
 if(v==='pair'){const w=[...q[0].split(' '),q[1],q[2]],n=w.length;if(s===n-1)return good(`${q[0]} ${q[1]} and ${q[2]}. “and” sits between the two things it joins.`,`✓ ${q[0]} ${q[1]} and ${q[2]}.`);
  return miss(s===n?`“${q[2]} and” has nothing after “and”. Put it between ${q[1]} and ${q[2]}.`:s===n-2?`That says “and ${q[1]} ${q[2]}”. Put “and” between the two things.`:`“and” joins ${q[1]} and ${q[2]}. Put it between them.`,s,'and')}
 if(v==='join'){const a=q[0].split(' '),b=q[1].split(' ');if(s===a.length){const one=`${q[0]} and ${[small(b[0]),...b.slice(1)].join(' ')}.`;
   return good(`${one} Now it is one sentence with one full stop. ${b[0]==='I'?'“I” always keeps its capital letter.':'“'+b[0]+'” gets a small letter now.'}`,'✓ '+one)}
  return miss('That cuts an idea in half. Put “and” where the first sentence ends, at its full stop.',s,'and')}
 if(v==='list'){const t=chips()[i];if(s===0&&t!==',')return miss(`Not “and” here. Use a comma between ${q[1]} and ${q[2]}. Save “and” for the last thing.`,0,t,'Comma here!');
  if(s===1&&t!=='and')return miss(`The last two things need “and”: ${q[2]} and ${q[3]}.`,1,t,'“and” before the last one!');
  S.fill[s]=t;S.bad=-1;A.sound.tick();if(S.fill[0]&&S.fill[1])return good(`${q[0]} ${q[1]}, ${q[2]} and ${q[3]}. Commas between, “and” before the last thing.`,`✓ ${q[0]} ${q[1]}, ${q[2]} and ${q[3]}.`);
  S.msg='Now the other box.';say(`${t==='and'?'“and”':'A comma'} goes there.`);ctrl();return A.redraw()}
 if(v==='fit'){const t=chips()[i];if(t===q[1])return good(`${q[0]} and ${q[1]}. Those two ideas go together.`,`✓ ${q[0]} and ${q[1]}.`);
  return miss(`“${q[0]} and ${t}” does not make sense. The ideas do not go together.`,0,'✗','Do they go together?')}}
function snip(a){if(kind()!=='long'||S.k>=rounds())return;const q=cur();S.cut=S.cut.includes(a)?S.cut.filter(x=>x!==a):[...S.cut,a];A.sound.tick();S.bad=-1;
 const left=3-S.cut.length;if(left<=1){const parts=[];let s=q[0];for(let i=1;i<4;i++){if(S.cut.includes(i-1)){parts.push(s+'.');s=big(q[i])}else s+=' and '+q[i]}parts.push(s+'.');
  return good(`${parts.join(' ')} Now each sentence is easy to follow.`,`✓ ${parts.length} sentences!`)}
 S.msg=`${left} ands left.`;say(`${left} ands left. Still a long chain. Tap another “and”.`);ctrl();A.redraw()}
function ctrl(){if(!ctl)return;ctl.innerHTML='';const v=kind(),q=cur(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(!q||S.k>=rounds())return A.redraw();
 if(v==='pair'){const w=[...q[0].split(' '),q[1],q[2]];w.concat(['']).forEach((x,s)=>B(s?`and after “${w[s-1]}”`:`and before “${w[0]}”`,()=>place(0,s),`Put and ${s?'after '+w[s-1]:'before '+w[0]}`))}
 if(v==='join'){const a=q[0].split(' '),b=q[1].split(' '),w=[...a,...b];for(let s=1;s<w.length;s++)B(`and after “${w[s-1]}${s===a.length?'.':''}”`,()=>place(0,s),`Put and after ${w[s-1]}`)}
 if(v==='list')[0,1].forEach(s=>chips().forEach((t,i)=>B(`${t==='and'?'and':'comma'} after “${q[s+1]}”`,()=>place(i,s),`Put ${t==='and'?'and':'a comma'} after ${q[s+1]}`)));
 if(v==='fit')chips().forEach((t,i)=>B('and '+t,()=>place(i,0),`Finish with and ${t}`));
 if(v==='long')[0,1,2].forEach(a=>B(S.cut.includes(a)?`↩ put back and ${a+1}`:`and ${a+1} → full stop`,()=>snip(a),S.cut.includes(a)?`Put and number ${a+1} back`:`Change and number ${a+1} to a full stop`));
 A.redraw()}
function down(p){const v=kind();if(v==='quiz'||S.k>=rounds())return false;
 if(v==='long'){const r=lay().find(r=>r.a!=null&&p.x>=r.x-6&&p.x<=r.x+r.w+6&&p.y>=r.y-6&&p.y<=r.y+r.h+6);if(r)snip(r.a);return false}
 for(let i=0;i<chips().length;i++){const r=chipBox(i);if(p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h){S.drag={i,x:null,y:null,x0:p.x,y0:p.y};return true}}
 if(v==='pair'||v==='join'){const s=hit(p);if(s>=0)place(0,s)}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const s=hit(p);if(s<0){say('Drop it in a box in the sentence.');return A.redraw()}place(d.i,s)}
const fin=(n,msg)=>()=>{if(A.step===n&&S.k>=rounds()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function chain(acts){const k=++S.run;acts.forEach((fn,j)=>setTimeout(()=>{if(k===S.run)fn()},A.reduced()?j*40+30:(j+1)*450))}
const reset=()=>{S.run++;Object.assign(S,{k:0,done:0,fill:[null,null],cut:[],bad:-1,badT:'',drag:null,msg:'',want:()=>{}})};
const go=(n,t,msg)=>()=>{reset();say(t);ctrl();S.want=fin(n,msg)};
const steps=[
{h:'Join two things',p:'Drag “and” into a box, or tap a box. Where does “and” go?',task:'Join 3 pairs',
 show:()=>{steps[0].go();chain(PAIR.map(q=>()=>place(0,q[0].split(' ').length+1)))},go:go(0,'Drag and into the sentence.','“and” goes between the two things it joins.')},
{h:'Join two sentences',p:'Here are two sentences. Drag “and” to make them one sentence.',
 predict:{q:'Two sentences joined with “and”. How many full stops now?',opts:['Two','One, at the very end'],ans:1},task:'Join 3 sets',
 show:()=>{steps[1].go();chain(JOIN.map(q=>()=>place(0,q[0].split(' ').length)))},go:go(1,'Drag and to join the two sentences.','One sentence has one full stop, at the end.')},
{h:'“and” in a list',p:'Drag a comma or “and” into each box.',
 predict:{q:'A list of three things. Where does “and” go?',opts:['Between every thing','Just before the last thing'],ans:1},task:'Make 3 lists',
 show:()=>{steps[2].go();chain([0,1,2].flatMap(()=>[()=>place(0,0),()=>place(1,1)]))},go:go(2,'Drag a comma and an and into the list.','Commas go between things. “and” goes before the last one.')},
{h:'Ideas that go together',p:'Which idea goes after “and”? Drag it into the box.',task:'Finish 3 sentences',
 show:()=>{steps[3].go();chain([0,1,2].map(k=>()=>place(k%2?1:0,0)))},go:go(3,'Drag the idea that goes with the first one.','“and” joins ideas that belong together.')},
{h:'Not too many ands',p:'This is one long chain of ands. Tap an “and” to turn it into a full stop.',
 predict:{q:'Is a sentence with lots of ands the best kind?',opts:['Yes, long is best','No, it is hard to follow'],ans:1},task:'Leave one “and” at most, twice',
 show:()=>{steps[4].go();chain([()=>snip(0),()=>snip(2),()=>snip(1),()=>snip(2)])},go:go(4,'Tap an and to make it a full stop.','Join two ideas with “and”. Then start a new sentence.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which one is joined the right way?',[['I like cats and dogs.','ok'],['I like and cats dogs.','spot'],['I like cats dogs and.','spot']]],
 ['Join “I ran.” and “I jumped.”',[['I ran and I jumped.','ok'],['I ran. and I jumped.','dot'],['I ran and i jumped.','capI']]],
 ['Which list is right?',[['I see a cat, a dog and a hen.','ok'],['I see a cat and a dog and a hen.','every'],['I see a cat, a dog, a hen.','none']]],
 ['Which ideas go together?',[['It was hot and I had an ice lolly.','ok'],['It was hot and my sock is blue.','sense'],['It was hot and.','half']]],
 ['Which is easiest to read?',[['We swam. We had chips and we went home.','ok'],['We swam and we had chips and we went home and we slept.','chain'],['We swam we had chips we went home.','run']]]];
function slip(t){let m='Look at where “and” goes and what it joins.';
 if(t==='spot')m='“and” goes between the two things it joins.';
 if(t==='dot')m='One sentence has one full stop, at the end. Take out the full stop before “and”.';
 if(t==='capI')m='“I” is always a capital letter, even in the middle.';
 if(t==='every')m='In a list, use commas between things and “and” only before the last one.';
 if(t==='none')m='The last two things need “and” to join them.';
 if(t==='sense')m='Socks have nothing to do with being hot. Join ideas that go together.';
 if(t==='half')m='Something must come after “and”. The sentence stops too soon.';
 if(t==='chain')m='Too many ands! It is hard to follow. Use a full stop and start again.';
 if(t==='run')m='There is no full stop and no “and”. The ideas run into each other.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],turn=qn%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Well joined.':'✗ '+slip(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;ctrl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrl()}});
A.start()})})();
