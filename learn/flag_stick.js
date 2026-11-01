/* Flagship – sticking with it until it's finished (ages 3–4): drag every jigsaw piece home (the last one counts), spot
   what is still missing before calling a picture done, leave a tower safe at snack time and come back to finish it,
   colour a big caterpillar one part at a time, then finish, say "I finished it!" and show it. Drag or tap, big buttons. */
(()=>{
const PICS=[[['☀️','#7dd3fc'],['☁️','#7dd3fc'],['🌷','#86efac'],['🐞','#86efac']],[['🌙','#a5b4fc'],['⭐','#a5b4fc'],['🏠','#fcd34d'],['🌳','#fcd34d']]];
const SLOT=['top left','top right','bottom left','bottom right'];
const GAPS=[['face','eye',['eye','ear',"It's finished"]],['car','wheel',['hat','wheel',"It's finished"]],['house','door',["It's finished",'door','bed']]];
const STACK=[['tower','block',5,'Snack time!'],['bead snake','bead',6,'Bath time!']];
const WORMS=[['caterpillar',6,'#16a34a'],['snake',8,'#2563eb']];
const ENDS=[['🧩',['Put in the last piece','Say: I finished it!','Show a grown-up']],['🖍️',['Colour the last bit','Say: I finished it!','Put it on the wall']]];
VIS.reg('flagstick',c=>{let A,ctl,chal,qn=-1,gen=0;c.fig.classList.add('young');
const zero=()=>({want:()=>{},won:0,r:0,home:[],pick:-1,drag:null,bad:-1,n:0,phase:'build',seen:false,next:0,col:[],fly:false}),S=zero();
const part=()=>['jig','gap','back','bit','end','quiz'][A.step],quick=()=>A.reduced(),px=n=>Math.round(n*(A.narrow?1:1.15));
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,n,col,w){g.font=`${w||800} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-14)}
function card(g,rc,fill,line,lw){g.fillStyle=fill;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,14);g.fill();g.strokeStyle=line;g.lineWidth=lw||3;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,14);g.stroke()}
const goal=()=>({jig:2,gap:3,back:2,bit:2,end:2}[part()]||9);
/* ---- jigsaw ---- */
function frame(){const s=Math.min(A.W*.5,A.H*.52),x=(A.W-s)/2,y=A.H*.04,h=s/2;return[0,1,2,3].map(k=>({x:x+(k%2)*h,y:y+(k>>1)*h,w:h,h}))}
function trayRects(){const f=frame()[0].w,ps=Math.min(f,(A.W-50)/4),gap=(A.W-4*ps)/5,y=A.H*.66;
 return[0,1,2,3].map(i=>{if(S.drag&&S.drag.i===i&&S.drag.x!=null)return{x:S.drag.x-ps/2,y:S.drag.y-ps/2,w:ps,h:ps};if(S.home[i])return frame()[i];const o=[2,0,3,1].indexOf(i);return{x:gap+o*(ps+gap),y,w:ps,h:ps}})}
function piece(g,i,rc,hot){const[e,bg]=PICS[Math.min(S.r,1)][i];card(g,rc,bg,hot?A.col.vi:'#1e293b',hot?6:2);g.font=`${Math.round(rc.h*.5)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#111';g.fillText(e,rc.x+rc.w/2,rc.y+rc.h/2+2)}
function drawJig(g){const C=A.col;frame().forEach((rc,k)=>{g.setLineDash([7,6]);g.strokeStyle=S.bad===k?C.rd:C.mu;g.lineWidth=S.bad===k?5:3;g.strokeRect(rc.x+3,rc.y+3,rc.w-6,rc.h-6);g.setLineDash([])});
 const rs=trayRects(),left=S.home.filter(x=>!x).length;[0,1,2,3].sort((a,b)=>(S.drag&&S.drag.i===a)-(S.drag&&S.drag.i===b)).forEach(i=>piece(g,i,rs[i],S.pick===i));
 txt(g,left===1?'One more piece!':left?`${4-left} of 4 in`:'Finished!',A.W/2,A.H*.6,15,left===1?C.vi:C.tx)}
function drop(i,k){if(part()!=='jig'||S.home[i])return;S.pick=-1;if(k!==i){const top=i<2;return oops(`That piece has ${top?'sky':'ground'} at the ${top?'top':'bottom'}. Try the ${SLOT[i]} space.`,k)}
 S.home[i]=true;A.sound.tick();const left=S.home.filter(x=>!x).length;if(!left)return won('The last piece is in. Now it is finished!');tell(left===1?'Nearly there. One more piece, then it is finished.':`Yes! ${4-left} pieces in.`);pad();A.redraw()}
function nextPiece(){const left=[0,1,2,3].filter(i=>!S.home[i]);if(!left.length)return;S.pick=left[(left.indexOf(S.pick)+1)%left.length];A.sound.tick();tell(`Picked the ${PICS[Math.min(S.r,1)][S.pick][0]} piece. Tap where it goes.`);A.redraw()}
/* ---- is it finished? ---- */
function drawThing(g,kind,miss,cx,cy,s){const C=A.col,ink=C.dark?'#e2e8f0':'#1e293b';g.lineWidth=4;g.strokeStyle=ink;g.fillStyle=C.dark?'#334155':'#fde68a';
 const ring=(x,y,r,f)=>{g.beginPath();g.arc(x,y,r,0,7);if(f){g.fillStyle=f;g.fill()}g.stroke()};
 if(kind==='face'){ring(cx,cy,s,g.fillStyle);ring(cx-s*.38,cy-s*.2,s*.13,ink);if(miss)ring(cx+s*.38,cy-s*.2,s*.13,ink);g.beginPath();g.arc(cx,cy+s*.15,s*.4,.3,2.8);g.stroke();ring(cx-s*1.02,cy,s*.16,'#fde68a');ring(cx+s*1.02,cy,s*.16,'#fde68a')}
 if(kind==='car'){g.fillStyle='#ef4444';A.paint.rrect(cx-s*1.1,cy-s*.45,s*2.2,s*.7,12);g.fill();g.stroke();g.fillStyle='#bae6fd';A.paint.rrect(cx-s*.5,cy-s*.85,s,s*.42,8);g.fill();g.stroke();ring(cx-s*.6,cy+s*.35,s*.28,'#111');if(miss)ring(cx+s*.6,cy+s*.35,s*.28,'#111')}
 if(kind==='house'){g.fillStyle='#fca5a5';g.fillRect(cx-s*.8,cy-s*.3,s*1.6,s*1.1);g.strokeRect(cx-s*.8,cy-s*.3,s*1.6,s*1.1);g.fillStyle='#78350f';g.beginPath();g.moveTo(cx-s,cy-s*.3);g.lineTo(cx,cy-s*1.05);g.lineTo(cx+s,cy-s*.3);g.closePath();g.fill();g.stroke();
  g.fillStyle='#bae6fd';g.fillRect(cx-s*.6,cy-s*.1,s*.38,s*.32);g.strokeRect(cx-s*.6,cy-s*.1,s*.38,s*.32);if(miss){g.fillStyle='#1d4ed8';g.fillRect(cx+s*.1,cy+s*.2,s*.42,s*.6);g.strokeRect(cx+s*.1,cy+s*.2,s*.42,s*.6)}}}
function choiceRects(n){const gap=10,w=Math.min((A.W-20-gap*(n-1))/n,170),x0=(A.W-n*w-gap*(n-1))/2,h=Math.min(A.H*.2,74);return Array.from({length:n},(_,k)=>({x:x0+k*(w+gap),y:A.H*.74,w,h}))}
function drawChoices(g,list){choiceRects(list.length).forEach((rc,k)=>{card(g,rc,A.col.dark?'#1e293b':'#fffbeb',S.bad===k?A.col.rd:A.col.tx,S.bad===k?5:3);txt(g,list[k],rc.x+rc.w/2,rc.y+rc.h/2,list[k].length>9?13:17,A.col.tx,800)})}
function drawGap(g){const[k,,ops]=GAPS[Math.min(S.r,2)],s=Math.min(A.W*.17,A.H*.2);drawThing(g,k,S.seen,A.W/2,A.H*.36,s);txt(g,S.seen?'Now it is finished!':'Is it finished? Look closely.',A.W/2,A.H*.66,14,A.col.mu,700);drawChoices(g,ops)}
/* ---- come back to it ---- */
function drawBack(g){const C=A.col,[name,,need,stop]=STACK[Math.min(S.r,1)],bw=Math.min(A.W*.2,90),bh=Math.min(A.H*.1,40),x=A.W/2-bw/2,base=A.H*.66;
 g.fillStyle=C.mu;g.fillRect(A.W*.2,base,A.W*.6,4);for(let i=0;i<need;i++){const y=base-(i+1)*bh;if(i<S.n){g.fillStyle=['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#ec4899'][i];if(S.r){g.beginPath();g.arc(A.W/2,y+bh/2,bh*.48,0,7);g.fill()}else{g.fillRect(x,y+2,bw,bh-3)}}
  else{g.setLineDash([5,5]);g.strokeStyle=A.alpha(C.mu,.7);g.lineWidth=2;g.strokeRect(x,y+2,bw,bh-3);g.setLineDash([])}}
 txt(g,`${S.n} of ${need}`,A.W*.84,base-bh,15);
 if(S.phase==='stop'){g.fillStyle=A.alpha(C.pn,.9);g.fillRect(0,A.H*.02,A.W,A.H*.14);txt(g,`⏰ ${stop} Your ${name} is not finished.`,A.W/2,A.H*.09,14,C.tx)}
 if(S.phase==='later')txt(g,'Later… it waited for you!',A.W/2,A.H*.09,15,C.vi);if(S.phase==='stop')drawChoices(g,['Leave it safe','Knock it down'])}
function addOne(){if(part()!=='back'||S.won>=goal())return;const[name,thing,need,stop]=STACK[Math.min(S.r,1)];
 if(S.phase==='stop')return oops(`${stop} First choose what to do with your ${name}.`);S.n++;A.sound.tick();
 if(S.phase==='build'&&S.n===2){S.phase='stop';tell(`${stop} Your ${name} has 2 of ${need}. What will you do with it?`);pad();return A.redraw()}
 if(S.n>=need)return won(`You came back and finished your ${name}!`);tell(`${S.n} of ${need}. ${need-S.n} more to finish.`);pad();A.redraw()}
function choose(k){if(S.phase!=='stop')return;if(k===1){S.n=0;S.phase='build';A.sound.miss();tell('Oh no, it fell down. Now you must start again. Leave it safe, and it waits for you.');pad();return A.redraw()}
 S.phase='later';A.sound.pop();tell(`You left it safe. Later, your ${STACK[Math.min(S.r,1)][0]} is still there. Add a ${STACK[Math.min(S.r,1)][1]}.`);pad();A.redraw()}
/* ---- one bit at a time ---- */
function segs(){const[,n]=WORMS[Math.min(S.r,1)],r=Math.min((A.W-60)/(n*1.75),A.H*.1),y=A.H*.42,x0=A.W/2-(n-1)*r*.85;return Array.from({length:n},(_,i)=>({x:x0+i*r*1.7,y:y+(i%2?-r*.35:r*.35),r}))}
function drawBit(g){const C=A.col,[name,n,hue]=WORMS[Math.min(S.r,1)],ss=segs();ss.forEach((s,i)=>{g.beginPath();g.arc(s.x,s.y,s.r,0,7);g.fillStyle=S.col[i]?hue:(C.dark?'#f8fafc':'#ffffff');g.fill();g.lineWidth=S.bad===i?5:3;g.strokeStyle=S.bad===i?C.rd:(C.dark?'#94a3b8':'#1e293b');g.stroke()});
 const h=ss[ss.length-1];g.font=`${Math.round(h.r*1.3)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(S.r?'🐍':'🐛',h.x+h.r*1.6,h.y);
 const done=S.col.filter(Boolean).length,bw=A.W*.7,bx=A.W*.15,by=A.H*.68;g.fillStyle=A.alpha(C.mu,.25);A.paint.rrect(bx,by,bw,18,9);g.fill();g.fillStyle=C.gr;A.paint.rrect(bx,by,bw*done/n,18,9);g.fill();
 txt(g,done>=n?`Your ${name} is finished!`:`${done} of ${n} done. ${n-done} more.`,A.W/2,by+40,15);if(S.fly&&done<n){g.font=`${px(34)}px system-ui,sans-serif`;g.fillText('🦋',A.W*.86,A.H*.13)}}
function paint1(i){if(part()!=='bit'||S.won>=goal())return;const[name,n]=WORMS[Math.min(S.r,1)];if(S.col[i])return oops('That part is coloured. Find a white part.',i);
 S.col[i]=true;A.sound.tick();const done=S.col.filter(Boolean).length;if(done===3)S.fly=true;if(done>=n)return won(`Bit by bit, you coloured the whole ${name}!`);tell(`${done} of ${n}. Just ${n-done} more.`);pad();A.redraw()}
/* ---- finish and show ---- */
function drawEnd(g){const[pic,list]=ENDS[Math.min(S.r,1)];txt(g,pic,A.W/2,A.H*.18,40,A.col.tx,400);txt(g,'Tap them in order: 1, 2, 3',A.W/2,A.H*.36,14,A.col.mu,700);
 const ord=[1,2,0];endRects().forEach((rc,j)=>{const k=ord[j],on=S.next>k;card(g,rc,on?A.alpha(A.col.gr,.25):(A.col.dark?'#1e293b':'#fffbeb'),S.bad===k?A.col.rd:on?A.col.gr:A.col.tx,S.bad===k||on?5:3);txt(g,(on?`${k+1}. `:'')+list[k],rc.x+rc.w/2,rc.y+rc.h/2,13,A.col.tx,800)})}
function endRects(){const h=Math.min(A.H*.13,56),w=Math.min(A.W*.86,380);return[0,1,2].map(j=>({x:(A.W-w)/2,y:A.H*.44+j*(h+8),w,h}))}
function order(k){if(part()!=='end'||S.won>=goal())return;const list=ENDS[Math.min(S.r,1)][1];if(k!==S.next){
  return oops(k===1?'Not yet! It is not finished until the last bit is done.':k===2&&S.next===0?'Finish it first. Then you have something to show.':'First say: I finished it! Then show it.',k)}
 S.next++;A.sound.tick();if(S.next>=3)return won('You finished it, said so, and showed it. Be proud!');tell(`Yes: ${list[k]}. What comes next?`);A.redraw()}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'🧩 ✓',W/2,H*.4,30,C.tx,400);txt(g,'Keep going until it is done.',W/2,H*.62,15);return}
 if(S.won>=goal()){txt(g,closing(),W/2,H/2,15);return A.fx.draw(g)}
 ({jig:drawJig,gap:drawGap,back:drawBack,bit:drawBit,end:drawEnd})[v](g);A.fx.draw(g)}
const closing=()=>({jig:'Every piece in: that is finished.',gap:'Check closely: is anything missing?',back:'Leave it safe, come back, finish.',bit:'Big jobs get done one bit at a time.',end:'Finish it, say it, show it!'}[part()]);
function oops(t,b){A.sound.miss();S.bad=b==null?-1:b;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:900);A.redraw()}
function reset(){S.pick=-1;S.drag=null;S.home=[false,false,false,false];S.seen=false;S.n=0;S.phase='build';S.next=0;S.fly=false;S.col=Array(WORMS[Math.min(S.r,1)][1]).fill(false)}
function won(t){S.won++;S.r++;A.sound.pop();if(S.won<goal()){reset();tell(t+' Here is another one.')}else tell(t);pad();A.redraw();S.want()}
function gapPick(k){if(part()!=='gap'||S.won>=goal()||S.seen)return;const[thing,need,ops]=GAPS[Math.min(S.r,2)],o=ops[k];
 if(o==="It's finished")return oops(`Look again. The ${thing} has no ${need} on one side. Something is missing.`,k);if(o!==need)return oops(`A ${o}? Look at the ${thing}. What is missing: a ${need}.`,k);
 S.seen=true;A.sound.tick();A.redraw();setTimeout(()=>won(`Yes! The ${need} was missing. Now the ${thing} is finished.`),quick()?20:500)}
function tapRow(k){const v=part();if(v==='gap')gapPick(k);else if(v==='back')choose(k)}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(v==='quiz'||S.won>=goal())return;
 if(v==='jig'){B('Pick a piece ▶',nextPiece,'Pick the next jigsaw piece');SLOT.forEach((s,k)=>B(s,()=>{if(S.pick<0)nextPiece();if(S.pick>=0)drop(S.pick,k)},`Put the picked piece in the ${s} space`))}
 if(v==='gap')GAPS[Math.min(S.r,2)][2].forEach((o,k)=>B(o,()=>gapPick(k)));
 if(v==='back'){if(S.phase==='stop'){B('Leave it safe',()=>choose(0));B('Knock it down',()=>choose(1))}else B(`Add a ${STACK[Math.min(S.r,1)][1]} ＋`,addOne)}
 if(v==='bit')B('Colour the next part 🖍️',()=>paint1(S.col.indexOf(false)),'Colour the next white part');
 if(v==='end')ENDS[Math.min(S.r,1)][1].forEach((t,k)=>B(t,()=>order(k)))}
const hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const v=part();if(S.won>=goal())return false;
 if(v==='jig'){const i=trayRects().findIndex((r,j)=>!S.home[j]&&hit(p,r));if(i>=0){S.drag={i,x:null,y:null,x0:p.x,y0:p.y};return true}const k=frame().findIndex(r=>hit(p,r));if(k>=0&&S.pick>=0)drop(S.pick,k);return false}
 if(v==='gap'||(v==='back'&&S.phase==='stop')){const k=choiceRects(v==='gap'?3:2).findIndex(r=>hit(p,r));if(k>=0)tapRow(k);return false}
 if(v==='back'){if(p.y<A.H*.7&&p.y>A.H*.12)addOne();return false}
 if(v==='bit'){if(S.fly&&p.x>A.W*.76&&p.y<A.H*.24){S.fly=false;tell('The butterfly can wait. Back to your colouring!');A.redraw();return false}const i=segs().findIndex(s=>Math.hypot(p.x-s.x,p.y-s.y)<s.r*1.1);if(i>=0)paint1(i);return false}
 if(v==='end'){const j=endRects().findIndex(r=>hit(p,r));if(j>=0)order([1,2,0][j])}return false}
function move(p){if(!S.drag)return;if(S.drag.x!=null||Math.hypot(p.x-S.drag.x0,p.y-S.drag.y0)>8){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;if(d.x==null){S.pick=d.i;A.sound.tick();tell('Picked a piece. Now tap where it goes.');return A.redraw()}const k=frame().findIndex(r=>hit(p,r));if(k>=0)drop(d.i,k);A.redraw()}
const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,gap){const k=++gen;list.forEach((fn,j)=>setTimeout(()=>{if(k===gen)fn()},quick()?j*40+30:(j+1)*(gap||260)))}
const clean=()=>{gen++;Object.assign(S,zero());if(A)reset()};
const steps=[
{h:'Every piece',p:'Drag each piece to its space. Or tap a piece, then tap its space. Keep going to the very last piece.',predict:{q:'3 pieces are in and 1 is left. Is the jigsaw finished?',opts:['Yes, nearly is done','No, one more piece'],ans:1},task:'Finish 2 jigsaws',
 show:()=>{steps[0].go();auto([0,1].flatMap(()=>[0,1,2,3].map(i=>()=>drop(i,i))),230)},go:()=>{clean();tell('Put every piece in its space.');pad();S.want=when(0,()=>S.won>=2,'Finished means every piece is in.')}},
{h:'Is it finished?',p:'Before you say "finished", look closely. Is a part missing? Tap what it needs.',predict:{q:'The face has one eye. Is it finished?',opts:["Yes, it's finished",'No, something is missing'],ans:1},task:'Finish 3 pictures',
 show:()=>{steps[1].go();auto(GAPS.map(([,need])=>()=>gapPick(GAPS[Math.min(S.r,2)][2].indexOf(GAPS[Math.min(S.r,2)][1]))),650)},go:()=>{clean();tell('What does the face need?');pad();S.want=when(1,()=>S.won>=3,'Look closely, then finish the last part.')}},
{h:'Come back to it',p:'Tap to add blocks. Uh-oh, snack time! You can come back later to finish.',predict:{q:'You stop for snack. Can you still finish your tower after?',opts:['No, start again','Yes, if I leave it safe'],ans:1},task:'Come back and finish 2 things',
 show:()=>{steps[2].go();const a=addOne,k=()=>choose(0);auto([a,a,k,a,a,a,a,a,k,a,a,a,a],230)},go:()=>{clean();tell('Tap to add a block to your tower.');pad();S.want=when(2,()=>S.won>=2,'Stopping is fine. Coming back to finish is the trick.')}},
{h:'One bit at a time',p:'A big job is just lots of little bits. Colour one part at a time. Watch the bar fill up.',task:'Colour 2 big pictures',
 show:()=>{steps[3].go();auto(Array.from({length:14},()=>()=>paint1(S.col.indexOf(false))),200)},go:()=>{clean();tell('Tap a white part to colour it.');pad();S.want=when(3,()=>S.won>=2,'Little bits add up to finished.')}},
{h:'I finished it!',p:'When it is done, say so and show it. Tap the steps in order.',task:'Do 2 finishes',
 show:()=>{steps[4].go();auto([0,1,2,0,1,2].map(k=>()=>order(k)),400)},go:()=>{clean();tell('What do you do first?');pad();S.want=when(4,()=>S.won>=2,'Feeling proud is the best part.')}},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['The jigsaw has one piece left. What do you do?',[['Put in the last piece','ok'],['Stop, it is nearly done','nearly'],['Start a new jigsaw','new']]],
 ['Snack time! Your tower is not finished. What is best?',[['Leave it safe, come back','ok'],['Knock it down','knock'],['Never go back to it','never']]],
 ['Your big drawing has lots to do. What helps?',[['Do one bit at a time','ok'],['Do it all fast','rush'],["Say I can't and stop",'quit']]],
 ['When is a jigsaw finished?',[['When every piece is in','ok'],['When most pieces are in','most'],['When I feel tired','tired']]],
 ['You finished your tower! What can you say?',[['I did it! I finished it!','ok'],['It is no good','bad'],['Say nothing, run off','none']]]];
function because(t){let m='Keep going one bit at a time until it is all done.';
 if(t==='nearly')m='Nearly done is not done. One more piece, and then it is finished.';if(t==='new')m='Finish this one first. Then you can start a new one.';
 if(t==='knock')m='If you knock it down, you must start again. Leave it safe and it waits for you.';if(t==='never')m='You can come back to it later. Then you get to finish it.';
 if(t==='rush')m='Rushing makes it messy. One small bit at a time gets it done.';if(t==='quit')m='Try one small bit. Then one more. Bit by bit, you get there.';
 if(t==='most')m='Most is not all. Look for the gap and put in the last piece.';if(t==='tired')m='You can rest, then come back. It is finished when every piece is in.';
 if(t==='bad')m='You kept going and finished it. That is something to be proud of.';if(t==='none')m='Say: I finished it! Then show a grown-up.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
let run=0;
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! You stick with it.':'✗ '+because(t)}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});pad()}});
A.start()})})();
