/* Flagship – camouflage, warning colours and mimicry in insects (ages 7–9; KS2 living things and habitats, adaptation).
   Scenes: hide four insects on the plant part each one looks like; play a young bird that learns from two stings to
   leave yellow-and-black insects alone; judge six stripy insects as real stingers or harmless copycats from clues a child
   can see (wing count, waist, eyes); sort insects into Hide, Warn and Copy; check a robot. Data and pictures in
   learn/mimic_art.js. Distinct from flagcamo (one animal matching a background), flaghunt (predator tricks) and flagvary
   (variation and survival over generations). */
(()=>{const T=MIM;
VIS.reg('flagmimic',c=>{let A,row,quizBox,qq=-1,tick=0;const M={};c.fig.classList.add('young');
const PEN='#111827',PASS='#15803d',FAIL='#b91c1c',RIM='#94a3b8',PICK='#1d4ed8',BG='#f0fdf4',FF='px system-ui,sans-serif';
const now=()=>['hide','peck','copy','sort','robot','quiz'][A.step];
const px=n=>A.narrow?n:Math.round(n*1.2);
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function back(){const g=A.ctx;g.fillStyle=BG;g.fillRect(0,0,A.W,A.H)}
/* a label: white rounded box with dark words, shrinking to fit */
function note(s,x,y,o){o=o||{};const g=A.ctx;let f=px(o.n||14);g.font=`800 ${f}${FF}`;while(f>9&&g.measureText(s).width+24>(o.max||A.W-8)){f--;g.font=`800 ${f}${FF}`}
 const w=g.measureText(s).width+24,h=f+16,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,8);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?PASS:o.no?FAIL:RIM;g.stroke();g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';g.fillText(s,l+w/2,y+1)}
/* a card: optional picture in the top part, words at the bottom */
function card(b,s,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.dim?'#f1f5f9':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();
 g.lineWidth=o.sel||o.no||o.ok?3.5:1.5;g.strokeStyle=o.sel?PICK:o.no?FAIL:o.ok?PASS:RIM;g.stroke();
 if(o.pic)T.paint(g,o.pic,b.x+b.w/2,b.y+(s?b.h*.4:b.h/2),Math.min(b.w*.36,b.h*(s?.3:.4)));if(!s)return;
 let f=px(o.n||12);g.font=`800 ${f}${FF}`;const ws=s.split(' ');let ln=[s];if(g.measureText(s).width>b.w-8&&ws.length>1){const h=Math.ceil(ws.length/2);ln=[ws.slice(0,h).join(' '),ws.slice(h).join(' ')]}
 while(f>9&&ln.some(t=>g.measureText(t).width>b.w-6)){f--;g.font=`800 ${f}${FF}`}g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';
 const cy=o.pic?b.y+b.h-(ln.length*(f+3))/2-5:b.y+b.h/2;ln.forEach((t,k)=>g.fillText(t,b.x+b.w/2,cy+(k-(ln.length-1)/2)*(f+3)))}
const grid=(n,cols,y0,y1)=>{const gap=8,w=(A.W-16-gap*(cols-1))/cols,rows=Math.ceil(n/cols),h=(y1-y0-gap*(rows-1))/rows;return Array.from({length:n},(_,i)=>({i,x:8+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}))};
/* 1. hide each insect */
const bugBoxes=()=>grid(4,4,A.H*.13,A.H*.38),spotBoxes=()=>grid(4,2,A.H*.43,A.H*.97);
function drawHide(){const s=M.hide;back();const n=s.home.filter(x=>x!=null).length;note(n<4?`Hide each insect: ${n} of 4. Tap an insect, then a place.`:'All 4 insects hidden',A.W/2,A.H*.06,{n:12,ok:n>=4});
 bugBoxes().forEach(b=>card(b,T.BUGS[b.i].t,{pic:s.home[b.i]==null?T.BUGS[b.i].k:null,sel:s.sel===b.i,dim:s.home[b.i]!=null,n:11}));
 spotBoxes().forEach(b=>{const S=T.SPOTS[b.i],who=s.home.indexOf(b.i);card(b,S.t+(who>=0?': '+T.BUGS[who].t+' hidden':''),{pic:S.k,ok:who>=0,no:s.miss===b.i,n:11});if(who>=0)T.paint(A.ctx,T.BUGS[who].k,b.x+b.w/2,b.y+b.h*.4,Math.min(b.w*.3,b.h*.25))});
 if(s.drag!=null&&s.at)T.paint(A.ctx,T.BUGS[s.drag].k,s.at.x,s.at.y,Math.min(A.W*.08,36))}
function pickBug(i){const s=M.hide;if(s.home[i]!=null)return tell(`${T.BUGS[i].t} is already hidden.`);s.sel=i;s.miss=-1;A.sound.tick();tell(`${T.BUGS[i].t} picked. Now tap where it hides best.`)}
function hideOn(j){const s=M.hide;if(s.sel<0)return tell('Tap an insect first.');const B=T.BUGS[s.sel];
 if(s.home.includes(j)){return tell(`${T.SPOTS[j].t} already has an insect.`)}
 if(B.home!==j){s.miss=j;A.sound.miss();return tell(`A ${B.t.toLowerCase()} on a ${T.SPOTS[j].t.toLowerCase()} is easy to see: the shape and colour do not match. ${T.HIDEWHY[s.sel]}`)}
 s.home[s.sel]=j;s.sel=-1;s.miss=-1;A.sound.pop();const left=s.home.filter(x=>x==null).length;tell(`Hidden. ${T.HIDEWHY[T.BUGS.indexOf(B)]}`+(left?` ${left} more.`:''))}
/* 2. be the young bird */
const trayBoxes=()=>grid(8,4,A.H*.3,A.H*.95);
function drawPeck(){const s=M.peck,g=A.ctx;back();const eaten=s.state.filter((x,i)=>x==='eaten').length;
 note(`Caterpillars eaten: ${eaten} of 4. Stings: ${s.stung}`,A.W/2,A.H*.06,{n:12,ok:eaten>=4&&s.stung>=T.LEARN});
 const full=Math.min(1,s.stung/T.LEARN),bx=A.W*.15,bw=A.W*.7,by=A.H*.15;g.fillStyle='#e5e7eb';A.paint.rrect(bx,by,bw,A.H*.07,8);g.fill();g.fillStyle='#fbbf24';if(full>0){A.paint.rrect(bx,by,bw*full,A.H*.07,8);g.fill()}
 g.fillStyle=PEN;g.font=`800 ${px(11)}${FF}`;g.textAlign='center';g.textBaseline='middle';g.fillText(full>=1?'Bird remembers: yellow and black = sting!':'Bird\'s memory of stripes: '+s.stung+' of '+T.LEARN,A.W/2,by+A.H*.035);
 trayBoxes().forEach(b=>{const st=s.state[b.i],k=T.TRAY[b.i];card(b,st==='eaten'?'Eaten':st==='stung'?'Ouch! Flew off':st==='left'?'Left alone':'',{pic:st==='eaten'||st==='stung'?null:k,ok:st==='left'||st==='eaten',no:st==='stung',n:10})})}
function peck(i){const s=M.peck,k=T.TRAY[i];if(s.state[i])return tell('That one is gone or left alone already.');
 if(k==='cater'){s.state[i]='eaten';A.sound.pop();return tell('Yum, a tasty green caterpillar.'+(s.stung<T.LEARN?' Try a stripy one too.':''))}
 if(s.stung<T.LEARN){s.stung++;s.state[i]='stung';A.sound.miss();return tell(s.stung<T.LEARN?'Ouch! The yellow and black wasp stung the bird. It will remember that.':'Ouch, again! Now the bird remembers: yellow and black means sting.')}
 s.state[i]='left';A.sound.tick();tell('The bird remembers the stings. It sees yellow and black and leaves this wasp alone.')}
/* 3. real stinger or copycat? */
const yesNo=()=>{const w=Math.min(190,(A.W-30)/2);return[0,1].map(k=>({i:k,t:k?'Copycat: cannot sting':'Can sting',x:A.W/2+(k?6:-w-6),y:A.H*.74,w,h:Math.min(A.H*.2,70)}))};
function drawCopy(){const s=M.copy;back();if(s.i>=T.CARDS.length){note('All 6 insects judged',A.W/2,A.H*.18,{ok:1});note('Copycats look like stingers but have no sting',A.W/2,A.H*.42,{n:12});return}
 const C=T.CARDS[s.i];note(`Insect ${s.i+1} of 6: can it sting?`,A.W/2,A.H*.06,{n:13});card({x:A.W*.12,y:A.H*.13,w:A.W*.76,h:A.H*.42},C.t,{pic:C.k,n:14});note('Clue: '+C.clue,A.W/2,A.H*.63,{n:11});
 yesNo().forEach(b=>card(b,b.t,{no:s.miss===b.i,n:13}))}
function judge(k){const s=M.copy;if(s.i>=T.CARDS.length)return;const C=T.CARDS[s.i],says=k===0;
 if(says!==C.sting){s.miss=k;A.sound.miss();return tell(C.sting?`Careful: a ${C.t.toLowerCase()} can sting. Clue: ${C.clue}.`:`Look at the clue: ${C.clue}. The stripes are a copy; it has no sting.`)}
 s.miss=-1;s.i++;A.sound.pop();tell((C.sting?`Yes, a ${C.t.toLowerCase()} can sting.`:`Yes, a copycat. Birds that learned wasps sting leave it alone too.`)+(s.i<T.CARDS.length?' Next insect.':''))}
/* 4. hide, warn or copy */
const sortBoxes=()=>grid(6,3,A.H*.12,A.H*.6),binBoxes=()=>grid(3,3,A.H*.66,A.H*.95);
function drawSort(){const s=M.sort;back();const n=s.put.filter(x=>x!=null).length;note(n<6?`Sort the insects: ${n} of 6. Tap one, then a box.`:'All 6 sorted',A.W/2,A.H*.05,{n:12,ok:n>=6});
 sortBoxes().forEach(b=>{const S=T.SORT[b.i],p=s.put[b.i];card(b,p==null?S.t:S.t+': '+T.BINS[p],{pic:S.k,sel:s.sel===b.i,ok:p!=null,n:10})});
 binBoxes().forEach(b=>card(b,T.BINS[b.i],{no:s.miss===b.i,n:16}))}
function pickSort(i){const s=M.sort;if(s.put[i]!=null)return tell(`${T.SORT[i].t} is already sorted.`);s.sel=i;s.miss=-1;A.sound.tick();tell(`${T.SORT[i].t} picked. Hide, Warn or Copy?`)}
function putIn(j){const s=M.sort;if(s.sel<0)return tell('Tap an insect first.');const S=T.SORT[s.sel];
 if(S.bin!==j){s.miss=j;A.sound.miss();return tell(j===0?`Not hiding: a ${S.t.toLowerCase()} is easy to see.`:j===1?`Not a warning: ${S.bin===0?'it is not bright at all':'it is safe to eat, it only looks dangerous'}.`:`Not a copy: ${S.bin===0?'it copies a plant, so it is hiding':'it really is nasty, so its colours are an honest warning'}.`)}
 s.put[s.sel]=j;s.sel=-1;s.miss=-1;A.sound.pop();const left=s.put.filter(x=>x==null).length;tell(`${T.BINS[j]}: ${S.why}`+(left?` ${left} more.`:''))}
/* 5. robot */
const rs=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.72,w,h:Math.min(A.H*.18,62)}))};
function drawRobot(){const s=M.robot,g=A.ctx;back();if(s.i>=T.ROBOT.length){note('All 5 sayings checked',A.W/2,A.H*.16,{ok:1});note('Hide, warn or copy: three ways to stay safe',A.W/2,A.H*.4,{n:12});return}
 const Q=T.ROBOT[s.i],x=A.W/2,y=A.H*.2,u=Math.min(A.W*.06,26);g.fillStyle='#cbd5e1';A.paint.rrect(x-u,y-u*.9,u*2,u*1.8,u*.5);g.fill();g.strokeStyle=PEN;g.lineWidth=2;g.stroke();
 g.fillStyle=PEN;g.beginPath();g.arc(x-u*.4,y-u*.15,u*.15,0,7);g.arc(x+u*.4,y-u*.15,u*.15,0,7);g.fill();g.fillRect(x-u*.3,y+u*.4,u*.6,3);
 note(Q.say,A.W/2,A.H*.44,{n:12});note(`Saying ${s.i+1} of ${T.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.58,{n:12});rs().forEach(b=>card(b,b.t,{no:s.miss===b.i,n:16}))}
function robotSay(k){const s=M.robot;if(s.i>=T.ROBOT.length)return;const Q=T.ROBOT[s.i];
 if((k===0)!==Q.ok){s.miss=k;A.sound.miss();return tell(Q.ok?`Think again. ${Q.fix}`:`Careful, that is a slip. ${Q.fix}`)}
 s.miss=-1;s.i++;A.sound.pop();tell((Q.ok?'Yes, right. ':'Yes, a slip. ')+Q.fix)}
function draw(){const k=now();if(k==='quiz'){back();note('Challenge',A.W/2,A.H*.2,{ok:1});note('Insect tricks expert',A.W/2,A.H*.5,{n:13});return}
 ({hide:drawHide,peck:drawPeck,copy:drawCopy,sort:drawSort,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function press(p){const k=now();
 if(k==='hide'){const b=bugBoxes().find(q=>within(p,q));if(b){pickBug(b.i);if(M.hide.sel===b.i){M.hide.drag=b.i;M.hide.at=p;return true}return false}const t=spotBoxes().find(q=>within(p,q));if(t)hideOn(t.i)}
 else if(k==='peck'){const b=trayBoxes().find(q=>within(p,q));if(b)peck(b.i)}
 else if(k==='copy'){const b=yesNo().find(q=>within(p,q));if(b)judge(b.i)}
 else if(k==='sort'){const b=sortBoxes().find(q=>within(p,q));if(b){pickSort(b.i);return false}const t=binBoxes().find(q=>within(p,q));if(t)putIn(t.i)}
 else if(k==='robot'){const b=rs().find(q=>within(p,q));if(b)robotSay(b.i)}
 return false}
function slide(p){if(now()==='hide'&&M.hide.drag!=null){M.hide.at=p;A.redraw()}}
/* dropping a dragged insect on a place counts as tapping that place */
function lift(p){const s=M.hide;if(!s||s.drag==null)return;s.drag=null;const t=p&&spotBoxes().find(q=>within(p,q));s.at=null;if(t)hideOn(t.i);else A.redraw()}
function fresh(){tick++;for(const k in M)delete M[k];Object.assign(M,{hide:{home:[null,null,null,null],sel:-1,miss:-1,drag:null,at:null},peck:{state:T.TRAY.map(()=>null),stung:0},copy:{i:0,miss:-1},sort:{put:T.SORT.map(()=>null),sel:-1,miss:-1},robot:{i:0,miss:-1},hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();M.hook()}
/* every canvas action also has a button under the canvas */
function twins(){if(!row)return;row.innerHTML='';const k=now(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='hide'){const s=M.hide;if(s.sel<0)T.BUGS.forEach((B,i)=>{if(s.home[i]==null)add(B.t,()=>pickBug(i),`Pick the ${B.t.toLowerCase()}`)});else T.SPOTS.forEach((S,j)=>add('On the '+S.t.toLowerCase(),()=>hideOn(j),`Hide the ${T.BUGS[s.sel].t.toLowerCase()} on the ${S.t.toLowerCase()}`))}
 if(k==='peck')T.TRAY.forEach((t,i)=>{if(!M.peck.state[i])add(`Peck ${i+1}`,()=>peck(i),`Peck insect ${i+1}: ${t==='cater'?'green caterpillar':'yellow and black wasp'}`)});
 if(k==='copy'&&M.copy.i<T.CARDS.length){const C=T.CARDS[M.copy.i];add('Can sting',()=>judge(0),`${C.t} can sting`);add('Copycat',()=>judge(1),`${C.t} is a harmless copycat`)}
 if(k==='sort'){const s=M.sort;if(s.sel<0)T.SORT.forEach((S,i)=>{if(s.put[i]==null)add(S.t,()=>pickSort(i),`Pick the ${S.t.toLowerCase()}`)});else T.BINS.forEach((B,j)=>add(B,()=>putIn(j),`Put the ${T.SORT[s.sel].t.toLowerCase()} in ${B}`))}
 if(k==='robot'&&M.robot.i<T.ROBOT.length){add('✓ Right',()=>robotSay(0),'The robot is right');add('✗ Slip',()=>robotSay(1),'The robot made a slip')}}
const settle=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function arrive(i,ok){fresh();tell(T.DESC[i]);M.hook=settle(i,ok,T.DONE[i])}
function auto(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
const steps=[
{h:'Hide!',p:'Many insects stay safe by looking like part of a plant. This is called camouflage. Hide each insect where it looks like the plant.',
 predict:{q:'A stick insect sits on a twig. What helps it hide best?',opts:['Bright colours','Its twig shape, and keeping still'],ans:1},task:'Hide all 4 insects',
 show:()=>auto(0,T.BUGS.flatMap((B,i)=>[()=>pickBug(i),()=>hideOn(B.home)]),420),go:()=>arrive(0,()=>M.hide.home.every(x=>x!=null))},
{h:'Be the bird',p:'You are a young bird looking for food. Peck the insects one by one and watch the bird\'s memory.',
 predict:{q:'Why is a wasp bright yellow and black?',opts:['So birds can find it to eat','To warn birds: I sting!'],ans:1},task:'Eat all 4 caterpillars and learn about the stripes',
 show:()=>auto(1,T.TRAY.map((t,i)=>()=>peck(i)),450),go:()=>arrive(1,()=>M.peck.stung>=T.LEARN&&M.peck.state.filter(x=>x==='eaten').length>=4)},
{h:'Sting or copycat?',p:'Some harmless insects copy the colours of insects that sting. This is called mimicry. Use the clue to decide.',
 predict:{q:'A hoverfly has yellow and black stripes. Can it sting?',opts:['Yes, stripes mean it stings','No, it is a harmless copycat'],ans:1},task:'Judge all 6 insects',
 show:()=>auto(2,T.CARDS.map(C=>()=>judge(C.sting?0:1)),600),go:()=>arrive(2,()=>M.copy.i>=T.CARDS.length)},
{h:'Hide, warn or copy?',p:'Three tricks: hide like the background, warn with bright colours, or copy a nasty insect. Sort each insect.',task:'Sort all 6 insects',
 show:()=>auto(3,T.SORT.flatMap((S,i)=>[()=>pickSort(i),()=>putIn(S.bin)]),380),go:()=>arrive(3,()=>M.sort.put.every(x=>x!=null))},
{h:'Check the robot',p:'The robot says things about insect tricks. Is it right, or a slip?',task:'Check all 5 sayings',
 show:()=>auto(4,T.ROBOT.map(Q=>()=>robotSay(Q.ok?0:1)),600),go:()=>arrive(4,()=>M.robot.i>=T.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{fresh();askQ()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>M.hook()});
/* feedback for each wrong challenge answer, by the slip it shows */
function why(t){let m='Insects stay safe by hiding, by warning, or by copying a nasty insect.';
 if(t==='bright')m='Bright colours on a wasp or ladybird are a warning: I sting or taste bad. Birds learn to leave them alone.';
 if(t==='sting')m='A hoverfly is a fly. It has no sting at all. Its stripes only copy a wasp, so birds leave it alone.';
 if(t==='still')m='A stick insect is slow. It hides by looking like a twig and keeping very still.';
 if(t==='learn')m='A young bird is not born knowing. It gets stung or tastes something nasty once or twice, then remembers.';
 if(t==='clue')m='Stripes and flowers fool us too. Count the wings: flies have 2, wasps and bees have 4.';
 return m}
function askQ(){qq++;const Q=T.QS[qq%T.QS.length],all=[[Q.a,'ok'],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>reply(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function reply(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=askQ;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:x=>{quizBox.hidden=x.step!==5;row.hidden=x.step===5;twins()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Insect tricks lab buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:press,move:slide,up:lift});twins()}}).start()})})();
