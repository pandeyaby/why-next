/* Flagship – changing your mind with evidence (ages 6–8; NC KS1/Y3 working scientifically). Judge results against an idea,
   choose the next move, test a better idea, sort plant evidence and scientist habits. Buttons repeat every canvas move. */
(()=>{
 // [name, big?, floats?, colour, shape]
 const OBJ={rock:['rock',1,0,'#78716c','blob'],apple:['apple',1,1,'#dc2626','apple'],coin:['coin',0,0,'#ca8a04','disc'],cork:['cork',0,1,'#d6a76b','bar'],
  key:['metal key',0,0,'#64748b','key'],log:['wooden log',1,1,'#92400e','bar'],spoon:['wooden spoon',0,1,'#b45309','bar']};
 const FIRST=['rock','apple','coin','cork'],NEWTEST=['spoon','key','log'];
 const fitsBig=o=>o[1]?!o[2]:!!o[2]; // old idea: big sink, small float
 const MOVES=[['2 results fit the idea "big things sink, small things float". 2 do not.',[['Change the idea'],['Keep it: 2 results fitted','An idea has to fit all the results. 2 did not fit.'],['Say the test went wrong','Do not throw out results you do not like.']]],
  ['Mia thinks heavy balls fall faster. She drops a heavy ball and a light ball at the same time. They land together.',[['Mia changes her idea'],['Mia hides the result','Hiding a result is not fair.'],['Mia drops them again until the heavy one wins','Testing until it fits is not fair.']]],
  ['Leo tested 6 times. 5 results fit his idea. 1 surprised him.',[['Test again to check the surprise'],['Change the idea straight away','One odd result could be a slip. Test again first.'],['Forget the surprise','Never forget a surprise. Test again.']]]];
 const IDEAS=[['What it is made of matters: wood and cork float, stone and metal sink'],['Round things float','The coin is round, and it sank.'],['Big things float, small things sink','The big rock sank. Flipping the idea does not fit.']];
 const PLANT=[['Cress grew on wet cotton wool, with no soil.',1,'It grew with no soil, so it does not fit.'],['A bean in soil, with water and light, grew.',0,'It had soil and grew. That fits the idea.'],['A plant cutting grew roots in a jar of water.',1,'It grew with no soil, so it does not fit.']];
 const PIDEAS=[['Plants need water and light, not always soil'],['Plants need soil and nothing else','The cress and the cutting grew with no soil.'],['Cress is not a real plant','Cress is a real plant. Do not throw out evidence.']];
 const HABITS=[['I will test it again to check.',0,'Scientists test again to check.'],['That result is wrong, because I am right.',1,'Being sure is not a reason.'],['I changed my mind because of what I saw.',0,'Changing your mind with evidence is good science.'],['I will hide the result that did not fit.',1,'Hiding a result is never good science.'],['My idea fits all my results so far.',0,'A good idea, and it can still change.'],['Everyone thinks it, so it must be true.',1,'A crowd is not evidence.']];
 VIS.reg('flagrethink',c=>{let A,keys,quiz;c.fig.classList.add('young');
 const R={then:()=>{}};
 const now=()=>['tank','next','better','plant','habit','chal'][A.step];
 const INK='#1f2937',DIM='#4b5563',RIM='#6b7280',PAPER='#fff',YES='#047857',NOPE='#b91c1c',NOTE='#fef9c3',WATER='#bfdbfe',CHOSEN='#d1fae5';
 const fs=n=>Math.round(n*(A.narrow?1.05:1.2));
 const font=n=>`700 ${fs(n)}px system-ui,sans-serif`;
 function say(g,s,x,y,n,col,al){g.font=font(n);g.fillStyle=col||INK;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y)}
 function split(g,s,max,n){g.font=font(n);const out=[];let cur='';s.split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>max){out.push(cur);cur=w}else cur=t});out.push(cur);return out}
 function card(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
 function para(g,s,r,n,col){const L=split(g,s,r.w-16,n),lh=fs(n)+4;L.forEach((l,i)=>say(g,l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col))}
 const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function head(g,s,col){const r={x:10,y:8,w:A.W-20,h:A.H*.12};card(g,r,NOTE,'#a16207',2);para(g,s,r,14,col)}
 function result(g){if(!R.msg)return;const L=split(g,(R.bad?'✗ ':'✓ ')+R.msg,A.W-40,13),lh=fs(13)+5,h=L.length*lh+10,y=A.H-h-6;card(g,{x:10,y,w:A.W-20,h},PAPER,R.bad?NOPE:YES,3);L.forEach((l,i)=>say(g,l,A.W/2,y+5+lh*(i+.5),13))}
 const voice=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
 const no=s=>{R.bad=true;R.msg=s;A.sound.miss();voice(s);A.redraw()};
 const ok=s=>{R.bad=false;R.msg=s;A.sound.pop()};
 const tank=()=>A.narrow?{x:A.W*.12,y:A.H*.3,w:A.W*.76,h:A.H*.3}:{x:A.W*.06,y:A.H*.3,w:A.W*.5,h:A.H*.45};
 function thing(g,key,x,y){const o=OBJ[key],r=o[1]?fs(24):fs(12);g.fillStyle=o[3];g.strokeStyle='#1f2937';g.lineWidth=1.5;g.beginPath();
 if(o[4]==='blob')g.ellipse(x,y,r*1.2,r*.85,0,0,7);else if(o[4]==='apple'){g.arc(x,y,r,0,7)}else if(o[4]==='disc')g.ellipse(x,y,r,r*.45,0,0,7);
 else if(o[4]==='bar')A.paint.rrect(x-r*1.3,y-r*.55,r*2.6,r*1.1,r*.5);else{g.arc(x-r*.6,y,r*.55,0,7);g.rect(x-r*.1,y-r*.2,r*1.6,r*.4)}
 g.fill();g.stroke();if(o[4]==='apple'){g.strokeStyle='#166534';g.lineWidth=3;g.beginPath();g.moveTo(x,y-r);g.lineTo(x+3,y-r-8);g.stroke()}return r}
 function drawTank(g){const T=tank();g.fillStyle=WATER;g.fillRect(T.x,T.y+T.h*.2,T.w,T.h*.8);g.strokeStyle=RIM;g.lineWidth=3;g.beginPath();g.moveTo(T.x,T.y);g.lineTo(T.x,T.y+T.h);g.lineTo(T.x+T.w,T.y+T.h);g.lineTo(T.x+T.w,T.y);g.stroke()}
 function dropAt(key){const T=tank(),o=OBJ[key],r=o[1]?fs(24):fs(12),surface=T.y+T.h*.2;return o[2]?surface:T.y+T.h-r*.9}
 function drop(key,after){const T=tank(),d={key,y:T.y-fs(30),x:T.x+T.w*.5};R.fall=d;A.tween(d,{y:dropAt(key)},A.reduced()?1:450,'out',()=>{if(R.fall!==d)return;R.landed=key;after&&after();A.redraw()});
 (function tick(){if(R.fall===d&&R.landed!==key){A.redraw();requestAnimationFrame(tick)}})()}
 const shelf=()=>A.narrow?{x:A.W*.3,y:A.H*.15,w:A.W*.4,h:A.H*.12}:{x:A.W*.62,y:A.H*.18,w:A.W*.32,h:A.H*.12};
 function board(g,list){const x0=A.narrow?16:A.W*.6,y0=A.narrow?A.H*.645:A.H*.32,lh=A.narrow?fs(17):fs(22);
 list.forEach(([k,fit],i)=>say(g,`${fit?'✓ fits':'✗ does not fit'}: ${OBJ[k][0]} ${OBJ[k][2]?'floated':'sank'}`,x0,y0+i*lh,11,fit?YES:NOPE,'left'))}
 function drawTankStep(g){const k=FIRST[R.i];head(g,k?(R.landed===k?`Does the ${OBJ[k][0]} fit the idea?`:`Idea: big things sink, small things float. Drop the ${OBJ[k][0]} in.`):'2 results did not fit the idea.',k?INK:YES);
 drawTank(g);if(R.fall)thing(g,R.fall.key,R.fall.x,R.fall.y);else if(k){const S=shelf(),grab=R.grab||{x:S.x+S.w/2,y:S.y+S.h/2};thing(g,k,grab.x,grab.y);say(g,OBJ[k][1]?'big':'small',S.x+S.w/2,S.y+S.h+fs(6),10,DIM)}board(g,R.log)}
 function dropFirst(){const k=FIRST[R.i];if(!k||R.fall&&R.fall.key===k)return;R.msg='';drop(k,()=>{voice(`The ${OBJ[k][0]} ${OBJ[k][2]?'floated':'sank'}. Does it fit the idea?`);keysFor()})}
 function judge(fit){const k=FIRST[R.i];if(!k)return;const o=OBJ[k];if(R.landed!==k)return no(`Test it first: drop the ${o[0]} in the water.`);
 const truth=fitsBig(o);if(fit!==truth)return no(`The ${o[0]} is ${o[1]?'big':'small'} and ${o[2]?'floated':'sank'}. The idea said ${o[1]?'sink':'float'}, so it ${truth?'fits':'does not fit'}.`);
 ok(truth?`Fits: the ${o[0]} did what the idea said.`:`Does not fit: the ${o[0]} surprised us.`);R.log.push([k,truth]);R.i++;R.fall=null;R.landed=null;update()}
 const padAt=(i,n,top)=>{const h=Math.min(fs(48),(A.H*.86-top)/n-8);return{x:14,y:top+i*(h+8),w:A.W-28,h}};
 function pads(g,opts,top){opts.forEach(([t],i)=>{const r=padAt(i,opts.length,top);card(g,r,PAPER,RIM,2.5);para(g,t,r,12)})}
 function drawNext(g){const m=MOVES[R.i];head(g,m?'What should a scientist do next?':'Ideas follow the evidence.',m?INK:YES);if(!m)return;const st={x:14,y:A.H*.16,w:A.W-28,h:A.H*.2};card(g,st,'#eef2ff','#4338ca',2);para(g,m[0],st,12);pads(g,m[1],A.H*.4)}
 function chooseMove(i){const m=MOVES[R.i];if(!m)return;const o=m[1][i];if(o[1])return no(o[1]);
 ok(['2 results did not fit, so the idea changes.','The balls landed together, so Mia changes her mind.','If the surprise comes back, change the idea.'][R.i]);R.i++;update()}
 function drawBetter(g){if(!R.picked){head(g,'Which new idea fits all 4 results?');pads(g,IDEAS,A.H*.18);board(g,FIRST.map(k=>[k,fitsBig(OBJ[k])]));return}
 const k=NEWTEST[R.i];head(g,k?`Use the new idea. Will the ${OBJ[k][0]} float or sink?`:'The new idea worked 3 times out of 3!',k?INK:YES);drawTank(g);
 if(R.fall)thing(g,R.fall.key,R.fall.x,R.fall.y);else if(k){const S=shelf();thing(g,k,S.x+S.w/2,S.y+S.h/2)}board(g,R.log)}
 function pickIdea(i){if(R.picked)return;if(IDEAS[i][1])return no(IDEAS[i][1]);
 R.picked=true;ok('That fits all 4 results.');update()}
 function guess(fl){const k=NEWTEST[R.i];if(!R.picked||!k||R.fall)return;const o=OBJ[k];
 if(!!fl!==!!o[2])return no(`Use the new idea: the ${o[0]} is made of ${k==='key'?'metal, so it sinks':'wood, so it floats'}${o[1]&&o[2]?', even though it is big':''}.`);
 ok(`The idea said ${fl?'float':'sink'}, and it ${fl?'floated':'sank'}!`);drop(k,()=>{R.log.push([k,1]);R.i++;R.fall=null;R.landed=null;update()})}
 // drag a card onto a pile (plant evidence, habits)
 const pileR=i=>({x:14+i*((A.W-36)/2+8),y:A.H*.58,w:(A.W-36)/2,h:A.H*.2}),cardR=()=>({x:A.W*.1,y:A.H*.17,w:A.W*.8,h:A.H*.17});
 function piles(g,names,deck,pos,col){names.forEach((n,i)=>{const r=pileR(i);card(g,r,R.drag&&within(R.drag,r)?CHOSEN:PAPER,RIM,2.5);para(g,n,{...r,h:fs(30)},12,col[i]);
 deck.filter((d,j)=>j<pos&&d[1]===i).forEach((d,k)=>say(g,'• '+d[0].split(' ').slice(0,4).join(' ')+' …',r.x+6,r.y+fs(34)+k*fs(15),9,DIM,'left'))});
 const d=deck[pos];if(!d)return;const h=cardR(),r=R.drag?{...h,x:R.drag.x-h.w/2,y:R.drag.y-h.h/2}:h;card(g,r,'#ede9fe','#6d28d9',3);para(g,d[0],r,12)}
 function drawPlant(g){if(R.i<PLANT.length){head(g,'Idea: plants need soil to grow. Drag each result to a pile.');piles(g,['Fits the idea','Does not fit'],PLANT,R.i,[YES,NOPE]);return}
 if(!R.picked){head(g,'2 results did not fit. Pick a better idea.');pads(g,PIDEAS,A.H*.2);return}
 head(g,'New idea: plants need water and light.',YES);PLANT.forEach((e,i)=>{const r={x:14,y:A.H*(.2+i*.15),w:A.W-28,h:A.H*.12};card(g,r,PAPER,e[1]?NOPE:YES,2.5);para(g,(e[1]?'✗ did not fit: ':'✓ fits: ')+e[0],r,11)})}
 const deck=()=>now()==='plant'?PLANT:HABITS;
 function sortCard(p){const d=deck()[R.i];if(!d)return;if(p!==d[1])return no(d[2]);ok(['Fits the idea.','Does not fit.','Good science.','Not good science.'][p+(now()==='habit'?2:0)]);R.i++;update()}
 function pickPlant(i){if(R.picked||R.i<PLANT.length)return;if(PIDEAS[i][1])return no(PIDEAS[i][1]);R.picked=true;ok('That fits all 3 results.');update()}
 function drawHabit(g){head(g,R.i<HABITS.length?'Is it good science? Drag each card to a pile.':'Good scientists follow the evidence.',R.i<HABITS.length?INK:YES);piles(g,['Good science','Not good science'],HABITS,R.i,[YES,NOPE])}
 function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
 const v=now();if(v==='tank')drawTankStep(g);if(v==='next')drawNext(g);if(v==='better')drawBetter(g);if(v==='plant')drawPlant(g);if(v==='habit')drawHabit(g);
 if(v==='chal'){head(g,'A surprise is evidence.');drawTank(g);board(g,FIRST.map(k=>[k,fitsBig(OBJ[k])]))}result(g);A.fx.draw(g)}
 function update(){const v=now();let s='Challenge.';
 if(v==='tank')s=FIRST[R.i]?`Next: the ${OBJ[FIRST[R.i]][0]}.`:'2 fit, 2 do not.';
 if(v==='next')s=MOVES[R.i]?MOVES[R.i][0]:'All 3 decided.';
 if(v==='better')s=!R.picked?'Pick a new idea.':NEWTEST[R.i]?`Will the ${OBJ[NEWTEST[R.i]][0]} float or sink?`:'Tested 3 times.';
 if(v==='plant')s=PLANT[R.i]?PLANT[R.i][0]:R.picked?'Done.':'Pick a better idea.';
 if(v==='habit')s=HABITS[R.i]?HABITS[R.i][0]:'All 6 sorted.';
 voice((R.msg?R.msg+' ':'')+s);keysFor();R.then()}
 function keysFor(){if(!keys)return;keys.innerHTML='';const v=now(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);e.onclick=f};
 if(v==='tank'&&FIRST[R.i]){const k=FIRST[R.i];if(R.landed!==k)b(`Drop the ${OBJ[k][0]} in`,dropFirst);else{b('Fits the idea',()=>judge(true));b('Does not fit',()=>judge(false))}}
 if(v==='next'&&MOVES[R.i])MOVES[R.i][1].forEach(([t],i)=>b(t,()=>chooseMove(i)));
 if(v==='better'){if(!R.picked)IDEAS.forEach(([t],i)=>b(t,()=>pickIdea(i)));else if(NEWTEST[R.i]){b('It will float',()=>guess(1));b('It will sink',()=>guess(0))}}
if(v==='plant'&&!PLANT[R.i]){if(!R.picked)PIDEAS.forEach(([t],i)=>b(t,()=>pickPlant(i)))}else if((v==='plant'||v==='habit')&&deck()[R.i])(v==='plant'?['Fits the idea','Does not fit']:['Good science','Not good science']).forEach((t,i)=>b(t,()=>sortCard(i)));
A.redraw()}
 function down(p){const v=now();
 if(v==='tank'){const k=FIRST[R.i];if(!k)return false;if(R.landed!==k&&within(p,shelf())){R.grab={x:p.x,y:p.y};return true}if(R.landed!==k&&within(p,tank())){dropFirst();return true}return false}
 if(v==='next'&&MOVES[R.i]){const i=MOVES[R.i][1].findIndex((_,i)=>within(p,padAt(i,3,A.H*.4)));if(i>=0){chooseMove(i);return true}return false}
 if(v==='better'){if(!R.picked){const i=IDEAS.findIndex((_,i)=>within(p,padAt(i,3,A.H*.18)));if(i>=0){pickIdea(i);return true}return false}if(NEWTEST[R.i]&&within(p,tank())){no('First tap It will float or It will sink.');return true}return false}
if((v==='plant'||v==='habit')&&deck()[R.i]){if(within(p,cardR())){R.drag={x:p.x,y:p.y};return true}const i=[0,1].find(i=>within(p,pileR(i)));if(i!=null){sortCard(i);return true}return false}
if(v==='plant'&&!R.picked){const i=[0,1,2].find(i=>within(p,padAt(i,3,A.H*.2)));if(i!=null){pickPlant(i);return true}}return false}
 function move(p){if(R.grab){R.grab={x:p.x,y:p.y};A.redraw()}if(R.drag){R.drag={x:p.x,y:p.y};A.redraw()}}
 function up(p){const v=now();if(R.grab){const g=R.grab;R.grab=null;if(within(p||g,tank()))dropFirst();else A.redraw();return}
if(!R.drag)return;const q=p||R.drag,i=[0,1].find(i=>within(q,pileR(i)));R.drag=null;if(i==null)return A.redraw();sortCard(i)}
 const close=(n,done,msg)=>()=>{if(A.step===n&&done()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const auto=(list,gap)=>{const id=++R.run;list.forEach((f,k)=>setTimeout(()=>{if(id===R.run)f()},k*(A.reduced()?30:gap)))};
 const reset=()=>{R.run=(R.run||0)+1;Object.assign(R,{then:()=>{},i:0,log:[],fall:null,landed:null,grab:null,drag:null,picked:false,msg:'',bad:false})};
 const steps=[
 {h:'Test the idea',p:'Idea: big things sink, small things float. Drag each thing into the water. Does the result fit the idea?',
 predict:{q:'The idea says big things sink. What will the big apple do?',opts:['It floats','It sinks','It sinks, then floats'],ans:0},
 task:'Test 4 things',show:()=>{steps[0].go();const L=[];FIRST.forEach(k=>{L.push(dropFirst);L.push(()=>judge(fitsBig(OBJ[k])))});auto(L,600)},go:()=>{reset();update();R.then=close(0,()=>R.i>=FIRST.length,'The apple and the coin did not fit the idea.')}},
 {h:'What next?',p:'A result did not fit. Pick what a good scientist does next.',
 predict:{q:'Which result teaches you more?',opts:['One that surprises you','One that fits what you thought','They teach the same'],ans:0},
 task:'Decide 3 times',show:()=>{steps[1].go();auto(MOVES.map(()=>()=>chooseMove(0)),400)},go:()=>{reset();update();R.then=close(1,()=>R.i>=MOVES.length,'Change the idea when results do not fit. Test again if one is odd.')}},
 {h:'A better idea',p:'Pick a new idea that fits every result. Then use it to predict, and test it.',
 task:'Test the new idea 3 times',show:()=>{steps[2].go();auto([()=>pickIdea(0)].concat(NEWTEST.map(k=>()=>guess(OBJ[k][2]))),900)},go:()=>{reset();update();R.then=close(2,()=>R.picked&&R.i>=NEWTEST.length,'What it is made of matters more than how big it is.')}},
 {h:'Another surprise',p:'Idea: plants need soil to grow. Sort each result, then pick a better idea.',
 predict:{q:'Cress grows on wet cotton wool. What does that tell you?',opts:['Some plants grow with no soil','Cress is not a real plant','Nothing: one test is never enough'],ans:0},
 task:'Sort 3 results and fix the idea',show:()=>{steps[3].go();auto(PLANT.map(e=>()=>sortCard(e[1])).concat([()=>pickPlant(0)]),400)},go:()=>{reset();update();R.then=close(3,()=>R.picked,'Plants need water and light. Some can grow with no soil.')}},
 {h:'Good science?',p:'Drag each card to Good science or Not good science.',
 predict:{q:'Is it OK for a scientist to change their mind?',opts:['Yes, when the evidence says so','No, it means they were bad','Only if a friend says so'],ans:0},
 task:'Sort 6 cards',show:()=>{steps[4].go();auto(HABITS.map(h=>()=>sortCard(h[1])),350)},go:()=>{reset();update();R.then=close(4,()=>R.i>=HABITS.length,'Test again, count every result, and follow the evidence.')}},
 {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>R.then()});
 const Q=[['Idea: heavy things sink. A heavy log floats. What now?','Change the idea',[['Keep it: logs do not count','skip'],['Say the water was wrong','water']]],
 ['You test 5 times. 1 result surprises you. What first?','Test again to check',[['Change your idea at once','rush'],['Forget that result','forget']]],
 ['Which is good science?','I changed my mind because of what I saw',[['I hid the result that did not fit','hide'],['Everyone says so, so it is true','crowd']]],
 ['A result surprises you. Is that bad?','No: surprises teach us the most',[['Yes: it means you failed','fail'],['Yes: you should test until it fits','fit']]],
 ['Big rock sinks, small coin sinks, big apple floats. Does "big things sink" fit?','No',[['Yes: the rock sank','one'],['Yes: most things sank','most']]],
 ['Your new idea fits every result so far. Can it still change?','Yes, if new evidence does not fit',[['No: it is proved for ever','proved'],['No: ideas never change','never']]]];
 function slip(tag){let m='Look at the evidence.';
 if(tag==='skip')m='Every result counts. The log does not fit.';
 if(tag==='water')m='Blaming the test needs a reason. Test again.';
 if(tag==='rush')m='One odd result could be a slip. Test again first.';
 if(tag==='forget')m='Never forget a surprise. Test again.';
 if(tag==='hide')m='Hiding results is not fair. Every result is evidence.';
 if(tag==='crowd')m='Lots of people thinking it is not evidence. Test it.';
 if(tag==='fail')m='A surprise is not a failure. It shows where your idea must change.';
 if(tag==='fit')m='Testing until it fits is not fair. Count every result.';
 if(tag==='one')m='One is not enough. The idea has to fit every result.';
 if(tag==='most')m='Most is not all. The apple and the coin do not fit.';
 if(tag==='proved')m='Ideas fit the evidence so far. New evidence can change them.';
 if(tag==='never')m='Ideas change when new evidence does not fit.';
 return m}
 let qi=-1,run=0;
 function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>score(tag,ans)});voice('Challenge: '+q);A.redraw()}
 function score(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const good=tag==='ok',fb=quiz.querySelector('.fl-fb');
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;keys.hidden=A.step===5;keysFor()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
 A.start()})})();
