/* Flagship: tracing a theme (ages 11–14; CCSS RL/RI.6–8.2). Original story: sort topic/theme/plot, sharpen theme
   statements, place beats on the theme's thread, graph the change, strike opinions from a summary. */
(()=>{const lo=Math.min;
const SORT=[['Pride',0],['Pride can stop people getting the help they need',1],['Mara repairs her grandad\'s boat',2],['Accepting help can take courage',1],['Help',0],['A neighbour shows Mara how to seal a seam',2]];
const BINS=['Topic','Theme','Plot'];
const LADDER=[['Help',[['Accepting help can take courage','ok'],['Help and pride','topicword'],['Mara gets some help','specific']]],
 ['Mara learns to accept help',[['Mara learns to accept help from Mr Osei','specific'],['Always ask for help','command'],['People can grow when they let others help them','ok']]],
 ['Pride is bad',[['You must never be proud','command'],['Pride can cut us off from people who want to help','ok'],['Pride is very, very bad','vague']]]];
const BEATS=[['"I don\'t need anyone," Mara tells her brother, and drags Grandad\'s boat into the yard.',0],['The boat is green, with a cracked oar and a name half worn away.',4],
 ['After three weekends the hull still leaks. Mara throws a tarp over it so her friends won\'t see.',1],['Mr Osei, a retired carpenter, offers to show her how to seal a seam. She waits a long moment, then nods.',2],
 ['At the launch, Mara hands a small boy the paintbrush. "Nobody builds a boat alone," she says.',3]];
const STAGE=['Introduces','Develops','Turning point','Resolves','Setting only'];
const LEVEL=['Refuses help','Starting to change','Values help'],GRAPH=[[0,0],[2,0],[3,1],[4,2]];
const SUM=[['Mara tries to repair her grandad\'s old boat on her own.',0],['She is so stubborn it is honestly annoying.',1],['After weeks of work the boat still leaks, and she hides it.',0],
 ['A retired carpenter offers to help, and she accepts.',0],['I think the ending is the best part.',1],['Mr Osei should have helped her much sooner.',1]];
VIS.reg('flagtheme',c=>{let A,pad,quiz,qn=-1;const S={};
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#475569',SEL='#6d28d9',TINT=['#fde68a','#bbf7d0','#bfdbfe','#ddd6fe','#e2e8f0'];
const font=(n,w)=>`${w||700} ${n}px system-ui,sans-serif`,sz=n=>A.narrow?n:Math.round(n*1.15);
const mode=()=>['sort','ladder','trace','graph','sum','chal'][A.step];
const mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function back(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ede9fe',A.col.dark?.06:.4);g.fillRect(0,0,A.W,A.H)}
function wrap(t,w,n){const g=A.ctx;g.font=font(n);const out=[];let line='';t.split(' ').forEach(word=>{const tr=line?line+' '+word:word;if(g.measureText(tr).width>w&&line){out.push(line);line=word}else line=tr});if(line)out.push(line);return out}
function para(t,r,n,col,wt){const g=A.ctx;let k=sz(n),L=wrap(t,r.w-16,k);while(L.length*(k*1.25)>r.h-8&&k>10){k--;L=wrap(t,r.w-16,k)}g.font=font(k,wt);mid(g);g.fillStyle=col||INK;L.forEach((l,j)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+(j-(L.length-1)/2)*k*1.25))}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.ok||o.bad||o.on?3.5:1.6;g.strokeStyle=o.ok?OK:o.bad?NO:o.on?SEL:RIM;g.stroke();para(t,r,o.n||14,INK,o.w);
 if(o.strike){g.strokeStyle=NO;g.lineWidth=3;g.beginPath();g.moveTo(r.x+10,r.y+r.h/2);g.lineTo(r.x+r.w-10,r.y+r.h/2);g.stroke()}}
function head(t,y,x,w){const g=A.ctx;g.font=font(sz(13),800);mid(g);g.fillStyle=x?INK:A.col.tx;g.fillText(t,x||A.W/2,y,w||A.W-12)}
/* bins in a grid: 3 or 5 boxes along the bottom */
function grid(n,top,h){const cols=A.narrow&&n>3?3:n,rows=Math.ceil(n/cols),gap=8,w=(A.W-16-gap*(cols-1))/cols,bh=(h-gap*(rows-1))/rows;
 return Array.from({length:n},(_,i)=>{const r=Math.floor(i/cols),inRow=r<rows-1?cols:n-cols*(rows-1),off=(A.W-16-(inRow*w+gap*(inRow-1)))/2;return{i,x:8+off+(i%cols)*(w+gap),y:top+r*(bh+gap),w,h:bh}})}
const bigCard=()=>({x:A.W*.08,y:A.H*.1,w:A.W*.84,h:A.H*.3});
function dragged(r){return S.drag?{...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2}:r}
/* 1. topic, theme or plot */
const sortBins=()=>grid(3,A.H*.56,A.H*.36);
function drawSort(){const s=S.s;back();sortBins().forEach(b=>{tile(b,'',{bg:TINT[b.i]});head(BINS[b.i],b.y+18,b.x+b.w/2,b.w-6);const n=s.at.filter(x=>SORT[x][1]===b.i).length;para(n?`${n} card${n>1?'s':''}`:'',{x:b.x,y:b.y+b.h*.45,w:b.w,h:b.h*.4},12,INK)});
 if(s.k<SORT.length){head(`Card ${s.k+1} of ${SORT.length}`,A.H*.05);tile(dragged(bigCard()),SORT[s.k][0],{n:17,w:800,bad:s.bad,on:!!S.drag})}else head('All 6 sorted.',A.H*.25)}
function sortTo(b){const s=S.s;if(s.k>=SORT.length)return;const [t,want]=SORT[s.k];
 if(b!==want){s.bad=1;A.sound.miss();return say(why(want===0?'topicword':b===0?'nottopic':want===1?'themeplot':'plot'))}
 s.at.push(s.k);s.k++;s.bad=0;A.sound.pop();say(`Yes: "${t}" is ${['a topic: a word or phrase for what the text is about','a theme: a statement about life that the text suggests','plot: something that happens'][want]}.`)}
/* 2. sharpen it */
const opts=()=>{const h=lo(64,A.H*.15);return[0,1,2].map(i=>({i,x:A.W*.06,y:A.H*.44+i*(h+10),w:A.W*.88,h}))};
function drawLadder(){const s=S.l;back();if(s.k>=3){head('3 statements sharpened',A.H*.3);para('A theme is a full statement, true beyond this story, not an order.',{x:A.W*.06,y:A.H*.4,w:A.W*.88,h:A.H*.25},14,A.col.tx);return}
 head(`Weak statement ${s.k+1} of 3`,A.H*.06);tile({x:A.W*.12,y:A.H*.12,w:A.W*.76,h:A.H*.16},'"'+LADDER[s.k][0]+'"',{n:17,w:800,bg:'#fef3c7'});head('Which rewrite works as a theme?',A.H*.37);
 opts().forEach(r=>tile(r,LADDER[s.k][1][r.i][0],{bad:s.bad===r.i}))}
function climb(i){const s=S.l;if(s.k>=3)return;const [t,tag]=LADDER[s.k][1][i];if(tag!=='ok'){s.bad=i;A.sound.miss();return say(why(tag))}
 s.k++;s.bad=null;A.sound.pop();say(`Yes: "${t}" is a full statement about people in general, not an order and not just about Mara.`)}
/* 3. trace the thread */
const stageBins=()=>grid(5,A.H*.52,A.H*.42);
function drawTrace(){const s=S.t,g=A.ctx;back();stageBins().forEach(b=>{tile(b,'',{bg:TINT[b.i]});head(STAGE[b.i],b.y+16,b.x+b.w/2,b.w-6);const k=s.at.findIndex(x=>x===b.i);if(k>=0)para(`Beat ${k+1}`,{x:b.x,y:b.y+b.h*.4,w:b.w,h:b.h*.5},14,INK,800)});
 if(s.k<BEATS.length){head(`Beat ${s.k+1} of 5: what does it do?`,A.H*.05);tile(dragged({x:A.W*.06,y:A.H*.1,w:A.W*.88,h:A.H*.36}),BEATS[s.k][0],{n:15,bad:s.bad,on:!!S.drag})}
 else{head('Theme: accepting help can take courage.',A.H*.22)}}
function trace(b){const s=S.t;if(s.k>=BEATS.length)return;const want=BEATS[s.k][1];
 if(b!==want){s.bad=1;A.sound.miss();return say(traceWhy(s.k,b))}
 s.at[s.k]=b;s.k++;s.bad=0;A.sound.pop();say(['Introduces: "I don\'t need anyone" sets up Mara\'s pride.','Setting only: the colour and the oar paint the scene but say nothing about help.','Develops: hiding the leak shows what pride costs her.','Turning point: her long pause, then the nod, is where she changes.','Resolves: her line "Nobody builds a boat alone" shows the change is complete.'][s.k-1])}
function traceWhy(k,b){if(k===1)return'Does the boat\'s colour say anything about help? A vivid detail is not always a theme detail.';
 if(b===4)return'This beat is about Mara\'s choice to work alone or accept help, so it does carry the theme.';
 return['The idea first appears here: Mara refuses help. It introduces the theme.','','She is still alone, now hiding it. Nothing has turned yet: it develops the theme.','Here she changes her mind: the turning point.','The end shows the change lasts. It resolves the theme.'][k]}
/* 4. graph the change */
const plot=()=>{const x0=A.W*(A.narrow?.3:.24),x1=A.W*.94,y0=A.H*.14,y1=A.H*.6;return{x0,x1,y0,y1,cx:i=>x0+(x1-x0)*(i+.5)/4,ry:l=>y1-(y1-y0)*(l+.5)/3}};
function drawGraph(){const s=S.g,g=A.ctx,P=plot();back();head('How Mara\'s view of help changes',A.H*.05);
 LEVEL.forEach((t,l)=>{g.strokeStyle=A.alpha(A.col.tx,.25);g.lineWidth=1;g.beginPath();g.moveTo(P.x0,P.ry(l));g.lineTo(P.x1,P.ry(l));g.stroke();g.font=font(sz(11),700);g.textAlign='right';g.textBaseline='middle';g.fillStyle=A.col.tx;
  wrap(t,P.x0-12,sz(11)).forEach((w,j,a)=>g.fillText(w,P.x0-6,P.ry(l)+(j-(a.length-1)/2)*sz(13)))});
 GRAPH.forEach(([b],i)=>{g.font=font(sz(12),800);mid(g);g.fillStyle=A.col.tx;g.fillText(`Beat ${b+1}`,P.cx(i),P.y1+sz(14))});
 g.strokeStyle=SEL;g.lineWidth=3;g.beginPath();s.lv.forEach((l,i)=>{if(l==null)return;i?g.lineTo(P.cx(i),P.ry(l)):g.moveTo(P.cx(i),P.ry(l))});g.stroke();
 s.lv.forEach((l,i)=>{if(l==null)return;g.fillStyle=SEL;g.beginPath();g.arc(P.cx(i),P.ry(l),sz(8),0,7);g.fill()});
 if(s.k<4){g.strokeStyle=s.bad?NO:OK;g.lineWidth=2;g.setLineDash([5,4]);g.strokeRect(P.cx(s.k)-(P.x1-P.x0)/8+3,P.y0,(P.x1-P.x0)/4-6,P.y1-P.y0);g.setLineDash([]);
  tile({x:A.W*.06,y:A.H*.7,w:A.W*.88,h:A.H*.26},BEATS[GRAPH[s.k][0]][0],{n:14})}else para('Flat, flat, up, up: the turning point is where the line climbs.',{x:A.W*.06,y:A.H*.7,w:A.W*.88,h:A.H*.2},14,A.col.tx,800)}
function level(l){const s=S.g;if(s.k>=4)return;const want=GRAPH[s.k][1];
 if(l!==want){s.bad=1;A.sound.miss();return say('Look at the beat again: '+['"I don\'t need anyone" is a refusal.','she hides the leak and still works alone.','she waits, then nods: a first step, not the whole change.','she now tells others that nobody builds a boat alone.'][s.k])}
 s.lv[s.k]=l;s.k++;s.bad=0;A.sound.pop();say(['Beat 1: she refuses help.','Beat 3: still refusing, so the line stays flat. The theme develops through what pride costs her.','Beat 4: the line starts to climb. This is the turning point.','Beat 5: she values help. Tracing a theme means showing how the idea changes, beat by beat.'][s.k-1])}
const cellAt=p=>{const P=plot();if(p.y<P.y0||p.y>P.y1||p.x<P.x0)return null;return{i:Math.floor((p.x-P.x0)/((P.x1-P.x0)/4)),l:Math.floor((P.y1-p.y)/((P.y1-P.y0)/3))}};
/* 5. objective summary */
const lines=()=>{const h=(A.H*.86)/6-6;return SUM.map((v,i)=>({i,x:A.W*.04,y:A.H*.1+i*(h+6),w:A.W*.92,h}))};
function drawSum(){const s=S.u;back();head(s.done?'Objective summary: facts only':`Strike out the opinions (${s.cut.length} of 3)`,A.H*.05);lines().forEach(r=>tile(r,SUM[r.i][0],{n:13,strike:s.cut.includes(r.i),bad:s.bad===r.i,ok:s.done&&!SUM[r.i][1]}))}
function cut(i){const s=S.u;if(s.done||s.cut.includes(i))return;if(!SUM[i][1]){s.bad=i;A.sound.miss();return say(`Keep it: "${SUM[i][0]}" is a fact from the story, not your view of it.`)}
 s.cut.push(i);s.bad=null;A.sound.pop();if(s.cut.length>=3)s.done=1;say(s.done?'Done. What is left says what happens and how Mara changes, with no "I think".':`Cut: "${SUM[i][0]}" is ${i===5?'a judgement of what a character should have done':'an opinion'}.`)}
function draw(){const k=mode();if(k==='chal'){back();head('Challenge',A.H*.3);para('Topic: a word. Theme: a claim about life. Summary: no opinions.',{x:A.W*.08,y:A.H*.4,w:A.W*.84,h:A.H*.3},15,A.col.tx);return}
 ({sort:drawSort,ladder:drawLadder,trace:drawTrace,graph:drawGraph,sum:drawSum})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
 if(k==='sort'&&S.s.k<SORT.length&&inside(p,bigCard())){S.drag={x:p.x,y:p.y};return true}
 if(k==='sort'){const b=sortBins().find(b=>inside(p,b));if(b)sortTo(b.i);return false}
 if(k==='ladder'){const r=opts().find(r=>inside(p,r));if(r)climb(r.i);return false}
 if(k==='trace'&&S.t.k<BEATS.length&&p.y<A.H*.46){S.drag={x:p.x,y:p.y};return true}
 if(k==='trace'){const b=stageBins().find(b=>inside(p,b));if(b)trace(b.i);return false}
 if(k==='graph'){const q=cellAt(p);if(q&&q.i===S.g.k&&q.l>=0&&q.l<3)level(q.l);return false}
 if(k==='sum'){const r=lines().find(r=>inside(p,r));if(r)cut(r.i)}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){if(!S.drag)return;S.drag=null;const k=mode(),b=(k==='sort'?sortBins():stageBins()).find(b=>inside(p,b));if(b)(k==='sort'?sortTo:trace)(b.i);else A.redraw()}
function fresh(){for(const k in S)delete S[k];Object.assign(S,{s:{k:0,at:[],bad:0},l:{k:0,bad:null},t:{k:0,at:[],bad:0},g:{k:0,lv:[null,null,null,null],bad:0},u:{cut:[],bad:null,done:0},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);S.hook=watch(i,ok,msg)}
function play(i,acts){steps[i].go();const s0=S.s;acts.forEach(([ms,f])=>setTimeout(()=>{if(S.s===s0)f()},ms))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=mode(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn sm'},pad,t).onclick=f};
 if(k==='sort'&&S.s.k<SORT.length)BINS.forEach((b,j)=>B(`${b}`,()=>sortTo(j)));
 if(k==='ladder'&&S.l.k<3)LADDER[S.l.k][1].forEach((o,j)=>B(o[0],()=>climb(j)));
 if(k==='trace'&&S.t.k<BEATS.length)STAGE.forEach((t,j)=>B(t,()=>trace(j)));
 if(k==='graph'&&S.g.k<4)LEVEL.forEach((t,j)=>B(`Beat ${GRAPH[S.g.k][0]+1}: ${t}`,()=>level(j)));
 if(k==='sum'&&!S.u.done)SUM.forEach((v,j)=>{if(!S.u.cut.includes(j))B(`Strike: ${v[0]}`,()=>cut(j))})}
const steps=[
{h:'Topic, theme or plot?',p:'Mara wants to fix her grandad\'s boat alone and will not ask for help, until a neighbour steps in. Sort each card: topic (a word or phrase), theme (a statement about life) or plot (what happens).',
 predict:{q:'Which one is a theme?',opts:['Pride','Pride can stop people getting the help they need'],ans:1},task:'Sort all 6 cards',
 show:()=>play(0,SORT.map((v,j)=>[450*(j+1),()=>sortTo(v[1])])),
 go:()=>open(0,'Card 1 of 6: Pride. Three boxes: Topic, Theme, Plot.',()=>S.s.k>=SORT.length,'A topic names what a text is about; a theme says what it suggests about that.')},
{h:'Sharpen the statement',p:'Weak theme statements are one word, are only about one character, or give an order. Pick the rewrite that works.',
 predict:{q:'Is "Mara learns to accept help" a theme?',opts:['Yes, it sums up the story','No, it is only about Mara'],ans:1},task:'Sharpen all 3 statements',
 show:()=>play(1,LADDER.map((L,j)=>[500*(j+1),()=>climb(L[1].findIndex(o=>o[1]==='ok'))])),
 go:()=>open(1,'Weak statement 1: Help. Pick the rewrite that works as a theme.',()=>S.l.k>=3,'A theme is a full, general statement, not a single word, a plot point or a command.')},
{h:'Trace the thread',p:'Theme: accepting help can take courage. Drag each beat of the story to what it does for that theme. One beat is setting only.',
 predict:{q:'"The boat is green, with a cracked oar." Does this develop the theme?',opts:['Yes: it is a vivid detail','No: it only sets the scene'],ans:1},task:'Place all 5 beats',
 show:()=>play(2,BEATS.map((b,j)=>[450*(j+1),()=>trace(b[1])])),
 go:()=>open(2,'Beat 1 of 5 and five boxes: Introduces, Develops, Turning point, Resolves, Setting only.',()=>S.t.k>=BEATS.length,'Key details introduce, develop, turn and resolve a theme; some details only set the scene.')},
{h:'Graph the change',p:'Plot where Mara stands on help at each theme beat. Tap a row in the dashed column.',
 predict:{q:'Where does Mara\'s view change most?',opts:['Beat 3: three weekends of work','Beat 4: she nods to Mr Osei','Beat 5: the launch'],ans:1},task:'Plot all 4 beats',
 show:()=>play(3,GRAPH.map((v,j)=>[450*(j+1),()=>level(v[1])])),
 go:()=>open(3,'A graph: rows Refuses help, Starting to change, Values help; columns for beats 1, 3, 4, 5.',()=>S.g.k>=4,'The line is flat until the turning point, then climbs: that is how the theme develops.')},
{h:'Keep it objective',p:'An objective summary says what happens and how the idea develops. It leaves out your opinions. Tap each opinion to strike it out.',
 predict:{q:'Should a summary say whether you liked the story?',opts:['Yes, readers want to know','No, that is opinion'],ans:1},task:'Strike all 3 opinions',
 show:()=>play(4,[[400,()=>cut(1)],[900,()=>cut(4)],[1400,()=>cut(5)]]),
 go:()=>open(4,'A draft summary of six sentences. Three are opinions.',()=>S.u.done,'Objective means facts from the text, not likes, judgements or what someone should have done.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[
 {q:'Which is a theme, not a topic?',a:'Pride can stop people asking for help',o:[['Pride','topicword'],['Mara fixes a boat','plot']]},
 {q:'Which sentence belongs in an objective summary?',a:'Mara accepts a neighbour\'s help to seal the boat.',o:[['Mara is so stubborn it is annoying.','opinion'],['Mr Osei should have helped sooner.','judge']]},
 {q:'"The boat is green." Why is this weak evidence for the theme?',a:'It sets the scene but says nothing about help',o:[['It is not in the story','notext'],['Colours always stand for the theme','symbol']]},
 {q:'Which theme statement is strongest?',a:'Accepting help can be a sign of strength',o:[['You should always ask for help','command'],['Mara learns to accept help','specific']]},
 {q:'Where does a theme usually show most clearly how it develops?',a:'At the turning point and the ending',o:[['Only in the first line','firstline'],['In the title alone','title']]},
 {q:'A text\'s theme is…',a:'What it suggests about life or people',o:[['What it is about, in one word','topicword'],['What happens, in order','plot']]}];
function why(t){let m='Check: is it a full statement about life, true beyond this story?';
 if(t==='topicword')m='That is a topic: a word or phrase. A theme says something about it, such as "pride can stop people getting help".';
 if(t==='nottopic')m='A topic is just a word or short phrase. This card is a full sentence, so it is a theme or plot.';
 if(t==='plot')m='That is plot: it tells what happens to these characters. A theme is a general idea that the events suggest.';
 if(t==='themeplot')m='This is a general statement about people, not an event in the story. That makes it a theme.';
 if(t==='specific')m='Still tied to one character. A theme should hold for people in general, so drop the names.';
 if(t==='command')m='That gives an order. A theme is a statement the text suggests, not a rule telling readers what to do.';
 if(t==='vague')m='Still vague: bad in what way? Say what pride does, such as cutting us off from help.';
 if(t==='opinion')m='That is your opinion of a character. An objective summary leaves out likes and dislikes.';
 if(t==='judge')m='That judges what a character should have done. An objective summary reports what happens.';
 if(t==='notext')m='It is in the story (beat 2). It is weak evidence because it says nothing about help or pride.';
 if(t==='symbol')m='Not every detail is a symbol. Use details that show the idea changing.';
 if(t==='firstline')m='The opening may introduce it, but a theme develops across the text.';
 if(t==='title')m='A title can hint, but you trace a theme through key events.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,list=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Theme lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);
  fresh();A.gest({down,move,up});buttons()}}).start()})})();
