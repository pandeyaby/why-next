/* Flagship – number bonds within 10 (ages 4–6): break a cube train of 6 at every gap to find all its pairs (and see that
   2 and 4 is 4 and 2 turned around), fill a ten frame to find the part that goes with 7, 4 and 9 to make 10, work out how
   many bears hide under a cup when you know the whole and one part, and build a part-whole (cherry) model for 10.
   The Challenge targets the usual slips: adding the parts you were given instead of finding the missing part, naming the
   part you can see, being one out when counting on, and thinking a turned-around pair is a new fact. */
(()=>{const TRAIN=6,FRAMES=[7,4,9],CUPS=[[8,5],[6,2],[10,4]];
VIS.reg('flagbond',c=>{let A,ctl,chal,qi=-1,streak=0;c.fig.classList.add('young');
const S={};
const view=()=>['train','frame','cup','cherry','turn','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1.05:1.2));
/* every label is drawn in the theme text colour over a pale tint, so it reads in light and dark themes */
function word(g,s,x,y,n,wt){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-10)}
function tile(g,r,col,a,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=warn?4:2;g.strokeStyle=warn?A.col.rd:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const dot=(g,x,y,r,col)=>{A.paint.ball(x,y,r,col);g.lineWidth=1.5;g.strokeStyle=A.col.tx;g.beginPath();g.arc(x,y,r,0,7);g.stroke()};
/* layout */
const cube=i=>{const s=Math.min((A.W-40)/(TRAIN+1.2),A.H*.2);const x0=(A.W-(TRAIN*s+(S.cut?s*.9:0)))/2;return{x:x0+i*s+(S.cut&&i>=S.cut?s*.9:0),y:A.H*.2,w:s-4,h:s-4}};
const gapAt=k=>{const a=cube(k-1);return{x:a.x+a.w-6,y:a.y-8,w:16,h:a.h+16}};
const cellR=i=>{const s=Math.min((A.W-30)/5,A.H*.27);const x0=(A.W-5*s)/2;return{x:x0+(i%5)*s,y:A.H*.14+Math.floor(i/5)*s,w:s,h:s}};
const ansR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.74,w,h:A.H*.17}};
const cupR=()=>({x:A.W*.56,y:A.H*.14,w:A.W*.34,h:A.H*.42});
const node=k=>{const r=Math.min(A.W*.12,A.H*.12);return k===0?{x:A.W/2,y:A.H*.15,r}:{x:A.W*(k===1?.28:.72),y:A.H*.47,r}};
const numR=n=>{const w=(A.W-16)/6,row=n>5?1:0,col=row?n-6:n;return{x:8+col*w+(row?w/2:0),y:A.H*(row?.84:.72),w:w-4,h:Math.min(w*.8,A.H*.1)}};
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'5 = 4 + 1',W/2,H*.28,22,800);word(g,'10 = 7 + 3',W/2,H*.48,22,800);word(g,'4 + 6 = 6 + 4',W/2,H*.68,20,800);return}
 if(v==='train'){for(let i=0;i<TRAIN;i++){const r=cube(i);tile(g,r,S.cut&&i>=S.cut?C.cy:C.or,.35)}
  for(let k=1;k<TRAIN;k++){if(S.cut)break;const r=gapAt(k);g.fillStyle=A.alpha(C.tx,.25);g.fillRect(r.x+6,r.y,4,r.h)}
  if(S.cut){const a=cube(0),b=cube(TRAIN-1);word(g,String(S.cut),(a.x+cube(S.cut-1).x+a.w)/2,a.y+a.h+px(16),16,800);word(g,String(TRAIN-S.cut),(cube(S.cut).x+b.x+b.w)/2,a.y+a.h+px(16),16,800)}
  word(g,S.cut?`6 is ${S.cut} and ${TRAIN-S.cut}`:'Tap a gap to break the train',W/2,H*.08,15,800);
  const got=S.found.slice().sort((a,b)=>a-b);word(g,'Found: '+(got.length?got.map(k=>`${k} and ${TRAIN-k}`).join(' · '):'none yet'),W/2,H*.7,12,700);
  word(g,`${S.found.length} of ${TRAIN-1} ways`,W/2,H*.82,12,600);if(got.length>1)word(g,'Same numbers, turned around, still make 6.',W/2,H*.92,11,600)}
 if(v==='frame'){const n=FRAMES[Math.min(S.round,FRAMES.length-1)];for(let i=0;i<10;i++){const r=cellR(i);tile(g,r,C.cy,.08,S.oops===i);const rr=r.w*.34;
   if(i<n)dot(g,r.x+r.w/2,r.y+r.h/2,rr,C.rd);else if(i<n+S.added)dot(g,r.x+r.w/2,r.y+r.h/2,rr,C.am)}
  word(g,S.round<FRAMES.length?(S.added+n<10?`${n} red. Tap an empty space to add yellow.`:'Full! How many yellow did you add?'):'All 3 frames done!',W/2,H*.07,13,800);
  if(S.round<FRAMES.length&&S.added+n>=10)opts().forEach((o,i)=>{const r=ansR(i);tile(g,r,C.vi,.14,S.oops==='a'+o);word(g,String(o),r.x+r.w/2,r.y+r.h/2,20,800)});
  word(g,`Frames: ${S.round} of ${FRAMES.length}`,W/2,H*.97,11,600)}
 if(v==='cup'){const k=Math.min(S.round,CUPS.length-1),[all,see]=CUPS[k],cr=cupR(),br=Math.min(W*.035,H*.05);
  word(g,S.round<CUPS.length?`${all} bears in all. How many are under the cup?`:'All 3 cups done!',W/2,H*.07,13,800);
  for(let i=0;i<see;i++)word(g,'🧸',W*.08+(i%5)*br*2.4,H*.24+Math.floor(i/5)*br*2.6,18);
  if(S.lift)for(let i=0;i<all-see;i++)word(g,'🧸',cr.x+cr.w*(.2+(i%3)*.3),cr.y+cr.h*(.12+Math.floor(i/3)*.22),16);
  const y0=cr.y;if(!S.lift){g.fillStyle=A.alpha(C.vi,.3);g.beginPath();g.moveTo(cr.x+cr.w*.2,y0);g.lineTo(cr.x+cr.w*.8,y0);g.lineTo(cr.x+cr.w,y0+cr.h*.6);g.lineTo(cr.x,y0+cr.h*.6);g.closePath();g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();word(g,'?',cr.x+cr.w/2,y0+cr.h*.33,24,800)}
  if(S.round<CUPS.length)cupOpts().forEach((o,i)=>{const r=ansR(i);tile(g,r,C.or,.14,S.oops==='c'+o);word(g,String(o),r.x+r.w/2,r.y+r.h/2,20,800)})}
 if(v==='cherry'){const w=node(0);g.lineWidth=3;g.strokeStyle=C.tx;[1,2].forEach(k=>{const p=node(k);g.beginPath();g.moveTo(w.x,w.y+w.r);g.lineTo(p.x,p.y-p.r);g.stroke()});
  [0,1,2].forEach(k=>{const p=node(k),val=k?S.parts[k-1]:10;g.fillStyle=A.alpha(k?C.gr:C.vi,.2);g.beginPath();g.arc(p.x,p.y,p.r,0,7);g.fill();g.lineWidth=S.oops&&k?4:2;g.strokeStyle=S.oops&&k?C.rd:C.tx;g.stroke();word(g,val==null?'?':String(val),p.x,p.y,22,800)});
  word(g,'whole',w.x+w.r+px(26),w.y,11,600);word(g,'part',node(1).x,node(1).y+node(1).r+px(10),11,600);word(g,'part',node(2).x,node(2).y+node(2).r+px(10),11,600);
  for(let n=0;n<=10;n++){const r=numR(n);tile(g,r,C.or,.14,false);word(g,String(n),r.x+r.w/2,r.y+r.h/2,13,800)}
  if(S.hold!=null){word(g,String(S.hold.n),S.hold.x,S.hold.y,22,800)}
  word(g,'Pairs for 10: '+(S.pairs.length?S.pairs.map(p=>p.join(' and ')).join(' · '):'none yet'),W/2,H*.97,11,700)}
 if(v==='turn'){const k=Math.min(S.round,TURNS.length-1),[a,b]=TURNS[k],s=Math.min((W-20)/(a+b+.5),H*.16),x0=(W-(a+b)*s)/2,y=H*.3;
  for(let i=0;i<a+b;i++){const left=S.flip?i>=b:i<a;tile(g,{x:x0+i*s,y,w:s-3,h:s-3},left?C.or:C.cy,.35)}
  word(g,S.flip?`${b} + ${a} = ?`:`${a} + ${b} = ${a+b}`,W/2,H*.12,18,800);
  word(g,S.round>=TURNS.length?'Turned around, the total stays the same!':S.flip?'Turned around. How many now?':'Tap the train to turn it around',W/2,H*.56,13,700);
  if(S.flip&&S.round<TURNS.length)turnOpts().forEach((o,i)=>{const r=ansR(i);tile(g,r,C.gr,.14,S.oops==='t'+o);word(g,String(o),r.x+r.w/2,r.y+r.h/2,20,800)});
  word(g,`Trains: ${S.round} of ${TURNS.length}`,W/2,H*.97,11,600)}
 A.fx.draw(g)}
const TURNS=[[2,5],[6,3]];
const opts=()=>{const n=FRAMES[S.round];return [[10-n,10,n],[10,n,10-n],[n,10-n,10]][S.round%3]};
const cupOpts=()=>{const[all,see]=CUPS[S.round];return [[all-see,see,all],[all,all-see,see],[see,all,all-see]][S.round%3]};
const turnOpts=()=>{const[a,b]=TURNS[S.round],t=a+b;return S.round%2?[t+1,t,Math.abs(b-a)]:[t,Math.abs(b-a),t+1]};
const bad=(t,mark)=>{S.oops=mark;A.sound.miss();tell(t);A.redraw()},good=t=>{S.oops=null;A.sound.pop();tell(t);pad();A.redraw();S.want()};
/* step 0 */
function cutAt(k){S.cut=k;A.sound.tick();if(S.found.includes(k)){S.oops=null;tell(`6 is ${k} and ${TRAIN-k}. You found that one. Try another gap.`);pad();return A.redraw()}
 S.found.push(k);const twin=S.found.includes(TRAIN-k)&&k!==TRAIN-k;tell(`6 is ${k} and ${TRAIN-k}.`+(twin?` That is ${TRAIN-k} and ${k} turned around.`:''));pad();A.redraw();
 if(S.found.length>=TRAIN-1)setTimeout(()=>{S.cut=0;good('All 5 ways: 1 and 5, 2 and 4, 3 and 3, 4 and 2, 5 and 1. Each pair makes 6.')},A.reduced()?10:500)}
/* step 1 */
function addDot(i){const n=FRAMES[S.round];if(S.round>=FRAMES.length||n+S.added>=10)return;if(i!=null&&i<n+S.added)return bad('That space has a counter. Tap an empty space.',i);S.added++;S.oops=null;A.sound.tick();tell(`${n} red and ${S.added} yellow.`);pad();A.redraw()}
function sayAdded(o){const n=FRAMES[S.round];if(n+S.added<10)return;
 if(o===10)return bad(`10 is all the counters. Count only the yellow ones: ${10-n}.`,'a'+o);
 if(o===n)return bad(`${n} is the red counters you started with. How many yellow did you add?`,'a'+o);
 S.round++;S.added=0;const done=S.round>=FRAMES.length;good(`Yes! ${n} and ${10-n} make 10.`+(done?' Every full frame shows a pair for 10.':''))}
/* step 2 */
function guessCup(o){if(S.round>=CUPS.length)return;const[all,see]=CUPS[S.round],hid=all-see;
 if(o===see)return bad(`${see} is the bears you can see. Count on from ${see} to ${all}.`,'c'+o);
 if(o===all)return bad(`${all} is all the bears. Some are hiding. Start at ${see} and count on to ${all}.`,'c'+o);
 S.lift=1;A.redraw();setTimeout(()=>{S.lift=0;S.round++;good(`Yes! ${see} and ${hid} make ${all}. ${hid} were hiding.`)},A.reduced()?10:700)}
/* step 3 */
function putPart(n){const k=S.parts[0]==null?0:1;S.parts[k]=n;S.hold=null;S.oops=null;A.sound.tick();
 if(k===0){tell(`One part is ${n}. What goes with ${n} to make 10?`);return A.redraw()}
 const[a,b]=S.parts,sum=a+b;if(sum!==10){const t=sum>10?`${a} and ${b} make ${sum}. That is too many. Try a smaller part.`:`${a} and ${b} make ${sum}. That is not enough. Try a bigger part.`;S.parts=[a,null];return bad(t,1)}
 const key=[Math.min(a,b),Math.max(a,b)].join();if(S.pairs.some(p=>[Math.min(...p),Math.max(...p)].join()===key)){S.parts=[null,null];return bad(`${a} and ${b} is a pair you found, turned around. Find a new pair.`,1)}
 S.pairs.push([a,b]);S.parts=[null,null];A.redraw();if(S.pairs.length>=3)return good(`3 pairs for 10! ${S.pairs.map(p=>p.join(' and ')).join(', ')}.`);tell(`${a} and ${b} make 10. Find another pair.`);A.redraw()}
/* step 4 */
function flipIt(){if(S.round>=TURNS.length||S.flip)return;S.flip=1;A.sound.tick();const[a,b]=TURNS[S.round];tell(`Turned around: ${b} + ${a}. How many now?`);pad();A.redraw()}
function sayTurn(o){if(!S.flip)return;const[a,b]=TURNS[S.round],t=a+b;
 if(o!==t)return bad(o===Math.abs(b-a)?`${o} is taking away. Nothing went away. The same cubes are still there: ${t}.`:`Count again. No cube was added. Still ${t}.`,'t'+o);
 S.round++;S.flip=0;good(`Yes! ${b} + ${a} = ${t}, the same as ${a} + ${b}.`)}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='train'&&S.found.length<TRAIN-1)for(let k=1;k<TRAIN;k++)B(`${k} | ${TRAIN-k}`,()=>cutAt(k),`Break the train after ${k} cubes`);
 if(v==='frame'&&S.round<FRAMES.length){if(FRAMES[S.round]+S.added<10)B('➕ Add yellow',()=>addDot(null),'Add a yellow counter');else opts().forEach(o=>B(String(o),()=>sayAdded(o),`I added ${o}`))}
 if(v==='cup'&&S.round<CUPS.length)cupOpts().forEach(o=>B(String(o),()=>guessCup(o),`${o} bears under the cup`));
 if(v==='cherry'&&S.pairs.length<3)for(let n=0;n<=10;n++)B(String(n),()=>putPart(n),`Put ${n} in a part`);
 if(v==='turn'&&S.round<TURNS.length){if(!S.flip)B('🔄 Turn it around',flipIt,'Turn the cube train around');else turnOpts().forEach(o=>B(String(o),()=>sayTurn(o),`It makes ${o}`))}}
function down(p){const v=view();
 if(v==='train'&&S.found.length<TRAIN-1){const was=S.cut;S.cut=0;let j=0;for(let k=1;k<TRAIN;k++){const r=gapAt(k);if(hit(p,{x:r.x-10,y:r.y,w:r.w+20,h:r.h}))j=k}S.cut=was;if(j)cutAt(j);else if(was){S.cut=0;tell('Joined up again. Tap a gap.');A.redraw()}return false}
 if(v==='frame'&&S.round<FRAMES.length){if(FRAMES[S.round]+S.added<10){for(let i=0;i<10;i++)if(hit(p,cellR(i)))addDot(i)}else opts().forEach((o,i)=>{if(hit(p,ansR(i)))sayAdded(o)});return false}
 if(v==='cup'){S.round<CUPS.length&&cupOpts().forEach((o,i)=>{if(hit(p,ansR(i)))guessCup(o)});return false}
 if(v==='cherry'&&S.pairs.length<3){for(let n=0;n<=10;n++)if(hit(p,numR(n))){S.hold={n,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(v==='turn'&&S.round<TURNS.length){if(!S.flip&&p.y<A.H*.5)flipIt();else if(S.flip)turnOpts().forEach((o,i)=>{if(hit(p,ansR(i)))sayTurn(o)})}return false}
function move(p){if(S.hold){S.hold.x=p.x;S.hold.y=p.y;A.redraw()}}
function up(p){const h=S.hold;if(!h)return;const tap=Math.hypot(p.x-h.x0,p.y-h.y0)<12,onPart=[1,2].some(k=>Math.hypot(p.x-node(k).x,p.y-node(k).y)<node(k).r*1.3);if(tap||onPart)putPart(h.n);else{S.hold=null;A.redraw()}}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},cut:0,found:[],round:0,added:0,oops:null,lift:0,parts:[null,null],pairs:[],hold:null,flip:0})};
const steps=[
{h:'Break the train',p:'This train has 6 cubes. Break it into 2 parts. How many ways can you do it?',task:'Find all 5 ways to break 6',
 show:()=>{steps[0].go();play([1,2,3,4,5].map(k=>()=>cutAt(k)),450)},
 go:()=>{reset();tell('Tap a gap between two cubes.');pad();S.want=check(0,()=>S.found.length>=TRAIN-1,'6 can be 1 and 5, 2 and 4, or 3 and 3, and the same pairs turned around.')}},
{h:'Fill the ten frame',p:'A ten frame has 10 spaces. Fill the empty spaces. The yellow ones go with the red ones to make 10.',predict:{q:'7 red dots in a ten frame. How many more to make 10?',opts:['2','3','4'],ans:1},task:'Fill 3 ten frames',
 show:()=>{steps[1].go();const f=[];FRAMES.forEach(n=>{for(let i=0;i<10-n;i++)f.push(()=>addDot(null));f.push(()=>sayAdded(10-n))});play(f,150)},
 go:()=>{reset();tell('7 red counters. Add yellow until the frame is full.');pad();S.want=check(1,()=>S.round>=FRAMES.length,'7 and 3, 4 and 6, 9 and 1: each pair makes 10.')}},
{h:'Under the cup',p:'Some bears hide under the cup. You know how many in all. Count on to find the hidden ones.',predict:{q:'8 bears in all. You see 5. How many are under the cup?',opts:['3','13'],ans:0},task:'Find the hidden bears 3 times',
 show:()=>{steps[2].go();play(CUPS.map(([a,s])=>()=>guessCup(a-s)),900)},
 go:()=>{reset();tell('8 bears in all. You can see 5.');pad();S.want=check(2,()=>S.round>=CUPS.length,'The whole is the two parts together. Count on from the part you see.')}},
{h:'Part, part, whole',p:'The top circle is the whole: 10. Put a number in each part so the two parts make 10.',predict:{q:'Is 4 and 6 a new pair, or 6 and 4 turned around?',opts:['A new pair','The same pair turned around'],ans:1},task:'Make 3 different pairs for 10',
 show:()=>{steps[3].go();play([()=>putPart(6),()=>putPart(4),()=>putPart(8),()=>putPart(2),()=>putPart(5),()=>putPart(5)],300)},
 go:()=>{reset();tell('Drag a number to a part, or tap a number.');pad();S.want=check(3,()=>S.pairs.length>=3,'Two parts make the whole. Turned around, the pair is the same.')}},
{h:'Turn it around',p:'Turn a cube train around. Does the total change?',task:'Turn 2 trains around',
 show:()=>{steps[4].go();const[a,b]=TURNS[0],[c2,d]=TURNS[1];play([flipIt,()=>sayTurn(a+b),flipIt,()=>sayTurn(c2+d)],450)},
 go:()=>{reset();tell('2 + 5 = 7. Tap the train to turn it around.');pad();S.want=check(4,()=>S.round>=TURNS.length,'2 + 5 and 5 + 2 both make 7. Turning the parts around keeps the whole.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['What goes with 6 to make 10?',[['4','ok'],['5','one'],['16','add']]],
 ['9 bears in all. You see 6. How many are hiding?',[['3','ok'],['6','seen'],['15','add']]],
 ['2 + 3 = 5. What is 3 + 2?',[['5','ok'],['6','order'],['1','take']]],
 ['Which pair makes 7?',[['4 and 3','ok'],['4 and 4','one'],['7 and 7','whole']]],
 ['A ten frame has 8 dots. How many empty spaces?',[['2','ok'],['8','seen'],['3','one']]],
 ['Which pair makes 10?',[['8 and 2','ok'],['8 and 3','one'],['10 and 10','whole']]]];
function hintFor(t){let m='Two parts together make the whole.';
 if(t==='one')m='One out! Count on carefully, one number for each step, and check the parts make the whole.';
 if(t==='add')m='You added the numbers. We know the whole already, so find the missing part: count on to the whole.';
 if(t==='seen')m='That is the part you can see. The question asks for the other part.';
 if(t==='order')m='Turning the parts around does not change the total. 3 + 2 is 5, just like 2 + 3.';
 if(t==='take')m='That is taking away. Nothing went away: the same 5 things are there.';
 if(t==='whole')m='Both parts together must make the whole. Each part is smaller than the whole.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+streak+'.':'✗ '+hintFor(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pad()}});
A.start()})})();
