/* Flagship – linking paragraphs with adverbials (ages 9–11): sort adverbials by what they do (time, place, number);
   drop a time adverbial into a paragraph opener and watch the reader's pin jump along a story timeline; drop a place
   adverbial and watch the camera fly across a story map; put a report's paragraphs in order from their number
   adverbials; and replace a run of vague "Then," openers with adverbials that match each paragraph's clue. */
(()=>{
const KIND=['Time','Place','Number'],KINDJOB=['says when','says where','orders the points'];
const WORDS=[['Meanwhile',0],['Beyond the river',1],['Secondly',2],['Later that night',0],['Nearby',1],['In addition',2],['The next morning',0],['Far away',1],['Firstly',2]];
const SLOT=['morning','noon','night','next day'],TT=[['Meanwhile',-1],['Earlier that day',0],['Later that night',2],['The next morning',3]];
const TL=[{prev:'At noon, Ella reached the castle gate.',gap:'her brother was still lost in the forest.',at:1,clue:'"still lost" means at the same time'},
 {prev:'Ella waited at the gate all afternoon.',gap:'the owls began to hoot.',at:2,clue:'owls hoot at night'},
 {prev:'Ella slept by the gate under the stars.',gap:'the sun rose and the gate swung open.',at:3,clue:'"the sun rose" means a new day'}];
const SPOT=[['forest',.2,.3],['castle',.75,.28],['river',.3,.72],['cave',.78,.72]],PT=['Deep in the forest','Back at the castle','Across the river','Inside the cave'];
const PL=[{gap:'the bats woke and flapped round her head.',ok:3,clue:'bats roost in the cave'},{gap:'the ferry rocked as the boatman pulled the rope.',ok:2,clue:'a ferry crosses the river'},
 {gap:'the guards were still asleep at the gate.',ok:1,clue:'the guards are at the castle'}];
const REP=['Firstly, a garden gives us fresh food for lunch.','Secondly, growing plants teaches us science.','In addition, a garden is a calm place at break.','Finally, it brings bees and butterflies to school.'],MIX=[2,0,3,1];
const FIX=[{s:'the fox crept into the hen house.',clue:'same time as the farmer slept',ok:0},{s:'the farmer found feathers all over the yard.',clue:'the day after',ok:1},{s:'the fox fed her hungry cubs.',clue:'a new place: the woods',ok:2}],FT=['Meanwhile','The next morning','Deep in the woods','Secondly'];
VIS.reg('flagadvl',c=>{let A,keys,qa,qk=-1,tok=0;
const fresh=()=>({want:()=>{},won:0,r:0,grab:null,bad:-1,pin:1,cam:1,order:[],fixed:[],flash:''}),S=fresh();
const part=()=>['sort','time','place','number','then','quiz'][A.step],rm=()=>A.reduced(),px=n=>Math.round(n*(A.narrow?1:1.12));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const target=()=>({sort:6,time:3,place:3,number:4,then:3}[part()]||9);
function T(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
function wrap(g,t,maxw,n,wt){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;const out=[''];t.split(' ').forEach(w=>{const k=out.length-1,nx=out[k]?out[k]+' '+w:w;if(g.measureText(nx).width>maxw&&out[k])out.push(w);else out[k]=nx});return out}
function block(g,t,r,n,col,wt){const ls=wrap(g,t,r.w-20,n,wt),lh=px(n)*1.3;ls.forEach((l,i)=>T(g,l,r.x+r.w/2,r.y+r.h/2+(i-(ls.length-1)/2)*lh,n,col,wt))}
function tile(g,r,hot,ok,dim){const C=A.col;g.fillStyle=ok?A.alpha(C.gr,.24):dim?A.alpha(C.mu,.12):(C.dark?'#172033':'#f8fafc');A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.strokeStyle=hot?C.rd:ok?C.gr:A.alpha(C.tx,.7);g.lineWidth=hot||ok?4:2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const hit=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* option tiles in a 2 x 2 grid on a phone, one row on a wide screen */
function opts(n,y){const two=A.narrow&&n>3,cols=two?2:n,gap=8,w=(A.W-20-gap*(cols-1))/cols,h=px(two?40:46);return[...Array(n)].map((_,k)=>({x:10+(k%cols)*(w+gap),y:A.H*y+Math.floor(k/cols)*(h+gap),w,h}))}
function dragged(r,k){return S.grab&&S.grab.k===k&&S.grab.x!=null?{...r,x:S.grab.x-r.w/2,y:S.grab.y-r.h/2}:r}
/* ---- sort ---- */
function bins(){const w=(A.W-36)/3;return KIND.map((_,k)=>({x:10+k*(w+8),y:A.H*.64,w,h:A.H*.26}))}
function slip(){const g=A.ctx,t=WORDS[S.r%WORDS.length][0];g.font=`800 ${px(17)}px system-ui,sans-serif`;const w=g.measureText(t).width+44,h=px(46);return dragged({x:(A.W-w)/2,y:A.H*.24,w,h},'s')}
function drawSort(g){const C=A.col;T(g,'What job does this adverbial do?',A.W/2,A.H*.09,14,C.mu);bins().forEach((r,k)=>{tile(g,r,S.bad===k);T(g,KIND[k],r.x+r.w/2,r.y+r.h*.38,15,C.tx,800);T(g,['when?','where?','which point?'][k],r.x+r.w/2,r.y+r.h*.68,12,C.mu)});
 const r=slip();tile(g,r);T(g,WORDS[S.r%WORDS.length][0]+',',r.x+r.w/2,r.y+r.h/2,17,C.tx,800);T(g,`${S.won} of ${target()} sorted`,A.W/2,A.H*.5,12,C.mu)}
function put(k){if(part()!=='sort'||S.won>=target())return;const[w,ans]=WORDS[S.r%WORDS.length];
 if(k!==ans){let m=`"${w}" ${KINDJOB[ans]}, so it is an adverbial of ${KIND[ans].toLowerCase()}.`;if(w==='Meanwhile')m='Meanwhile says when: at the same time as the last paragraph. It is an adverbial of time.';
  else if(ans===2&&k===0)m=`"${w}" does not say when. It orders the points in a report, so it is an adverbial of number.`;return fail(m,k)}
 good(`Yes: "${w}" ${KINDJOB[ans]}.`)}
/* ---- time ---- */
const slotX=i=>A.W*(.14+i*.24);
function drawTime(g){const C=A.col,q=TL[Math.min(S.r,2)],y=A.H*.47;block(g,q.prev,{x:10,y:A.H*.02,w:A.W-20,h:A.H*.13},13,C.mu);
 const gap={x:10,y:A.H*.15,w:A.W-20,h:A.H*.17};tile(g,gap,false,S.flash==='ok');block(g,(S.flash==='ok'?TT.find(t=>t[1]===q.at||t[1]<0&&q.at===1)[0]:'______')+', '+q.gap,gap,14,C.tx,800);
 g.strokeStyle=A.alpha(C.tx,.6);g.lineWidth=3;g.beginPath();g.moveTo(slotX(0),y);g.lineTo(slotX(3),y);g.stroke();
 SLOT.forEach((s,i)=>{g.fillStyle=C.pn;g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.arc(slotX(i),y,8,0,7);g.fill();g.stroke();T(g,s,slotX(i),y+22,11,C.tx)});
 A.paint.ball(A.W*.14+S.pin*A.W*.24,y-20,10,C.vi);T(g,'reader',A.W*.14+S.pin*A.W*.24,y-40,10,C.vi,800);
 opts(4,.62).forEach((r,k)=>{const d=dragged(r,k);tile(g,d,S.bad===k);T(g,TT[k][0],d.x+d.w/2,d.y+d.h/2,13,C.tx,800)})}
function setTime(k){if(part()!=='time'||S.won>=target()||S.flash)return;const q=TL[Math.min(S.r,2)],to=TT[k][1]<0?(S.r===0?1:S.pin):TT[k][1];
 A.tween(S,{pin:to},rm()?1:450);if(to!==q.at){const m=TT[k][1]<0?`Meanwhile keeps the same time as the last paragraph. But ${q.clue}, so the story has moved on.`:`"${TT[k][0]}" puts the reader at ${SLOT[to]}. But ${q.clue}.`;
  return fail(m,k,()=>A.tween(S,{pin:S.r===0?1:S.r},rm()?1:350))}
 S.flash='ok';setTimeout(()=>{S.flash='';good(`Yes: "${TT[k][0]}," moves the reader to ${SLOT[q.at]==='noon'?'the same time, in a new place':SLOT[q.at]}.`)},rm()?20:650)}
/* ---- place ---- */
function drawPlace(g){const C=A.col,q=PL[Math.min(S.r,2)],m={x:10,y:A.H*.2,w:A.W-20,h:A.H*.4};g.fillStyle=A.alpha(C.gr,C.dark?.12:.15);A.paint.rrect(m.x,m.y,m.w,m.h,14);g.fill();
 g.strokeStyle=A.alpha(C.cy,.8);g.lineWidth=7;g.beginPath();g.moveTo(m.x,m.y+m.h*.55);g.bezierCurveTo(m.x+m.w*.3,m.y+m.h*.4,m.x+m.w*.6,m.y+m.h*.7,m.x+m.w,m.y+m.h*.5);g.stroke();
 SPOT.forEach(([n,x,y],i)=>{const X=m.x+m.w*x,Y=m.y+m.h*y;g.fillStyle=[C.gr,C.vi,C.cy,C.or][i];g.beginPath();g.arc(X,Y,12,0,7);g.fill();T(g,n,X,Y+30,12,C.tx,800)});
 const cx=m.x+m.w*(SPOT[Math.floor(S.cam)][1]+(SPOT[Math.ceil(S.cam)][1]-SPOT[Math.floor(S.cam)][1])*(S.cam%1)),cy=m.y+m.h*(SPOT[Math.floor(S.cam)][2]+(SPOT[Math.ceil(S.cam)][2]-SPOT[Math.floor(S.cam)][2])*(S.cam%1));
 g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.arc(cx,cy,18,0,7);g.stroke();T(g,'reader',cx,cy-28,10,C.rd,800);
 const gap={x:10,y:A.H*.02,w:A.W-20,h:A.H*.16};tile(g,gap,false,S.flash==='ok');block(g,(S.flash==='ok'?PT[q.ok]:'______')+', '+q.gap,gap,14,C.tx,800);
 opts(4,.66).forEach((r,k)=>{const d=dragged(r,k);tile(g,d,S.bad===k);T(g,PT[k],d.x+d.w/2,d.y+d.h/2,12,C.tx,800)})}
function setPlace(k){if(part()!=='place'||S.won>=target()||S.flash)return;const q=PL[Math.min(S.r,2)],from=S.cam;A.tween(S,{cam:k},rm()?1:500);
 if(k!==q.ok)return fail(`"${PT[k]}" flies the reader to the ${SPOT[k][0]}. But ${q.clue}.`,k,()=>A.tween(S,{cam:from},rm()?1:350));
 S.flash='ok';setTimeout(()=>{S.flash='';good(`Yes: "${PT[k]}," moves the reader to the ${SPOT[k][0]} before the paragraph starts.`)},rm()?20:650)}
/* ---- number ---- */
function cards(){const h=A.H*.15;return MIX.map((_,i)=>({x:10,y:A.H*.18+i*(h+6),w:A.W-20,h}))}
function drawNumber(g){const C=A.col;T(g,'Why our school needs a garden',A.W/2,A.H*.05,15,C.tx,800);T(g,`Tap the paragraphs in order (${S.order.length} of 4)`,A.W/2,A.H*.12,12,C.mu);
 cards().forEach((r,i)=>{const p=MIX[i],n=S.order.indexOf(p);tile(g,r,S.bad===i,n>=0);block(g,REP[p],{...r,x:r.x+(n>=0?28:0),w:r.w-(n>=0?28:0)},13,C.tx);if(n>=0)T(g,String(n+1),r.x+18,r.y+r.h/2,16,C.gr,900)})}
function pick(i){if(part()!=='number'||S.won>=target())return;const p=MIX[i],need=S.order.length;if(S.order.includes(p))return say('That paragraph is already in place. Pick the next one.');
 if(p!==need){const w=REP[p].split(',')[0];let m=`"${w}" is not paragraph ${need+1}.`;if(p===3)m='Finally signals the last point, so it goes at the end.';else if(p===2)m='In addition adds a point after the numbered ones. Look for the next number word.';
  else if(p===1)m='Secondly needs a first point before it. Find Firstly.';return fail(m,i)}
 S.order.push(p);S.won++;A.sound.tick();say(S.won<4?`Paragraph ${need+1}: ${REP[p].split(',')[0]}. Next?`:'Firstly, Secondly, In addition, Finally: the number adverbials guide the reader through the points.');buttons();A.redraw();S.want()}
/* ---- replace Then ---- */
function drawThen(g){const C=A.col,q=FIX[Math.min(S.r,2)];T(g,'Draft: every paragraph starts with "Then,"',A.W/2,A.H*.05,13,C.mu);
 FIX.forEach((f,i)=>{const r={x:10,y:A.H*(.1+i*.14),w:A.W-20,h:A.H*.12},done=S.fixed[i]!=null;tile(g,r,false,done,i>S.r);block(g,(done?FT[S.fixed[i]]:'Then')+', '+f.s,r,13,i===Math.min(S.r,2)&&!done?C.tx:C.mu,i===Math.min(S.r,2)?800:600)});
 T(g,`Clue: ${q.clue}`,A.W/2,A.H*.56,13,C.vi,800);opts(4,.62).forEach((r,k)=>{const d=dragged(r,k);tile(g,d,S.bad===k);T(g,FT[k],d.x+d.w/2,d.y+d.h/2,13,C.tx,800)})}
function swap(k){if(part()!=='then'||S.won>=target())return;const q=FIX[Math.min(S.r,2)];
 if(k!==q.ok){let m=`"${FT[k]}" does not match the clue: ${q.clue}.`;if(k===3)m='Secondly numbers points in a report. A story moves on by time or place.';
  else if(k===0)m='Meanwhile means at the same time. This clue says the story has moved on.';return fail(m,k)}
 S.fixed[S.r]=k;good(`Yes: "${FT[k]}," tells the reader ${['when','when','where'][S.r]}, which "Then" never did.`)}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){['Meanwhile, …','Beyond the hills, …','Finally, …'].forEach((t,i)=>T(g,t,W/2,H*(.3+i*.1),15,C.tx,800));T(g,'When? Where? Which point?',W/2,H*.66,14,C.mu);return}
 if(S.won>=target()){T(g,ends(),W/2,H/2,15,C.tx,800);return A.fx.draw(g)}({sort:drawSort,time:drawTime,place:drawPlace,number:drawNumber,then:drawThen})[v](g);A.fx.draw(g)}
const ends=()=>({sort:'Time, place or number.',time:'Time adverbials move the clock.',place:'Place adverbials move the camera.',number:'Number adverbials order the points.',then:'Say when or where, not just Then.'}[part()]);
function fail(t,b,after){A.sound.miss();S.bad=b==null?-1:b;say(t);setTimeout(()=>{S.bad=-1;after&&after();A.redraw()},rm()?10:900);A.redraw()}
function good(t){S.won++;S.r++;A.sound.pop();say(S.won<target()?t+' Next one.':t);buttons();A.redraw();S.want()}
function buttons(){if(!keys)return;keys.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};if(v==='quiz'||S.won>=target())return;
 if(v==='sort')KIND.forEach((k,i)=>B(k,()=>put(i),`Adverbial of ${k.toLowerCase()}`));
 if(v==='time')TT.forEach((t,i)=>B(t[0],()=>setTime(i),`Start with ${t[0]}`));
 if(v==='place')PT.forEach((t,i)=>B(t,()=>setPlace(i),`Start with ${t}`));
 if(v==='number')MIX.forEach((p,i)=>{if(!S.order.includes(p))B(REP[p].split(',')[0],()=>pick(i),`Next paragraph: ${REP[p]}`)});
 if(v==='then')FT.forEach((t,i)=>B(t,()=>swap(i),`Replace Then with ${t}`))}
function down(p){const v=part();if(S.won>=target())return false;
 if(v==='sort'){if(hit(p,slip())){S.grab={k:'s',x:null,y:null,x0:p.x,y0:p.y};return true}const k=bins().findIndex(r=>hit(p,r));if(k>=0)put(k);return false}
 if(v==='number'){const i=cards().findIndex(r=>hit(p,r));if(i>=0)pick(i);return false}
 const k=opts(4,v==='place'?.66:.62).findIndex(r=>hit(p,r));if(k>=0){S.grab={k,x:null,y:null,x0:p.x,y0:p.y};return true}return false}
function move(p){if(!S.grab)return;if(S.grab.x!=null||Math.hypot(p.x-S.grab.x0,p.y-S.grab.y0)>8){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
const act=k=>({time:setTime,place:setPlace,then:swap}[part()])(k);
function up(p){const gr=S.grab,v=part();S.grab=null;if(!gr)return;
 if(v==='sort'){if(gr.x==null){say('Now tap the box for its job, or drag the card there.');return A.redraw()}const k=bins().findIndex(r=>hit(p,r));if(k>=0)put(k);return A.redraw()}
 if(gr.x==null||p.y<A.H*.58)act(gr.k);A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const reset=()=>{tok++;Object.assign(S,fresh())};
const steps=[
{h:'Three jobs',p:'A linking adverbial at the start of a paragraph tells the reader when, where, or which point comes next. Drag each one to its job, or tap a box.',task:'Sort 6 adverbials',
 show:()=>{steps[0].go();demo(WORDS.slice(0,6).map(([,k])=>()=>put(k)),300)},go:()=>{reset();say('Time, place or number?');buttons();S.want=ready(0,()=>S.won>=6,'Each adverbial does one job.')}},
{h:'Jump in time',p:'A time adverbial moves the story clock. Drag one into the gap and watch the reader move along the timeline.',predict:{q:'"Meanwhile" tells the reader the next paragraph happens…',opts:['later on','at the same time'],ans:1},task:'Link 3 paragraphs in time',
 show:()=>{steps[1].go();demo([()=>setTime(0),()=>setTime(2),()=>setTime(3)],900)},go:()=>{reset();say('The reader is at noon. Where does the next paragraph happen in time?');buttons();S.want=ready(1,()=>S.won>=3,'The adverbial sets the time before the paragraph begins.')}},
{h:'Move the camera',p:'A place adverbial moves the reader to a new place. Use the clue in the paragraph to choose.',predict:{q:'Does "Across the river" tell the reader when or where?',opts:['when','where'],ans:1},task:'Link 3 paragraphs in place',
 show:()=>{steps[2].go();demo(PL.map(q=>()=>setPlace(q.ok)),900)},go:()=>{reset();say('The reader is at the castle. Where does the next paragraph happen?');buttons();S.want=ready(2,()=>S.won>=3,'Place adverbials move the camera.')}},
{h:'Order the points',p:'In a report, number adverbials show the order of the points. Tap the paragraphs in order.',predict:{q:'Which comes straight after "Firstly"?',opts:['In addition','Secondly'],ans:1},task:'Order 4 paragraphs',
 show:()=>{steps[3].go();demo([0,1,2,3].map(p=>()=>pick(MIX.indexOf(p))),350)},go:()=>{reset();say('Which paragraph comes first?');buttons();S.want=ready(3,()=>S.won>=4,'The number words guide the reader point by point.')}},
{h:'Not just Then',p:'This draft starts every paragraph with "Then". Swap each one for an adverbial that matches its clue.',predict:{q:'Why swap "Then" at the start of each paragraph?',opts:['Then is bad grammar','Then does not say when or where'],ans:1},task:'Fix 3 openers',
 show:()=>{steps[4].go();demo(FIX.map(f=>()=>swap(f.ok)),500)},go:()=>{reset();say('Read the clue. Which adverbial fits?');buttons();S.want=ready(4,()=>S.won>=3,'Varied openers guide the reader.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which adverbial moves the reader to a new place?',[['Beyond the hills,','ok'],['Moments later,','time'],['In addition,','num']]],
 ['"Meanwhile" means…',[['at the same time','ok'],['a long time later','later'],['the last point','last']]],
 ['A report gives three reasons. Which opener fits the third one?',[['Finally,','ok'],['Meanwhile,','story'],['Firstly,','first']]],
 ['Why swap "Then" at the start of every paragraph?',[['It does not say when or where','ok'],['"Then" is a spelling mistake','wrong'],['Paragraphs cannot start with an adverbial','cant']]],
 ['Which opener is punctuated correctly?',[['Later that night, the wind dropped.','ok'],['Later that night the wind, dropped.','comma'],['Later, that night the wind dropped.','split']]]];
function why(t){let m='Ask: does the adverbial say when, where, or which point comes next?';
 if(t==='time')m='"Moments later" moves the clock, not the place. It is an adverbial of time.';if(t==='num')m='"In addition" adds another point. It does not move the reader anywhere.';
 if(t==='later')m='"Meanwhile" does not jump forward. It means at the same time, often somewhere else.';if(t==='last')m='That is "Finally". "Meanwhile" is about time: at the same time.';
 if(t==='story')m='"Meanwhile" links story events in time. A report orders its points with number adverbials.';if(t==='first')m='"Firstly" opens the first point. The last of three points can open with "Finally".';
 if(t==='wrong')m='"Then" is spelled right and is not wrong. It just tells the reader nothing new each time.';if(t==='cant')m='Paragraphs often start with an adverbial. That is how they link to the last paragraph.';
 if(t==='comma')m='The comma goes straight after the whole fronted adverbial, "Later that night", not inside the clause.';if(t==='split')m='"Later that night" is one adverbial, so do not split it with a comma.';return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 qa.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
let run=0;
function mark(t){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right: that adverbial does the job.':'✗ '+why(t)}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{qa.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qa=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
