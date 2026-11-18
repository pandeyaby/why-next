/* Flagship: likelihood language (ages 9-10; the words impossible, unlikely, even chance, likely and certain placed on
   a 0-to-1 likelihood scale, as in KS2 problem solving and the KS3 "probability scale from 0 to 1"). A bag of 8 counters
   and an 8-part spinner: drag a pointer along the scale, paint counters or sectors red until a chance word is true,
   spin to see that likely is not always, then compare two bags with the same number of red. Every drag has a button
   twin. */
(()=>{
VIS.reg('flaglikely',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const kind=()=>['zero','even','unlikely','spin','two','chal'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fg=()=>A.col.tx,soft=()=>A.col.mu;
function txt(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||800} ${Math.round(px*(A.narrow?1:1.1))}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';
 if(o.halo!==false){g.lineJoin='round';g.lineWidth=4;g.strokeStyle=A.col.pn;g.strokeText(t,x,y,o.max||A.W-8)}g.fillStyle=o.c||fg();g.fillText(t,x,y,o.max||A.W-8)}
const word=v=>v<=0?'impossible':v>=8?'certain':v===4?'an even chance':v<4?'unlikely':'likely';
const Word=v=>{const w=word(v);return w[0].toUpperCase()+w.slice(1)};
/* the likelihood scale: 0 to 1 in eighths, with the five words under it */
function sc(){const x0=Math.round(A.W*.08),x1=Math.round(A.W*.92);return{x0,x1,y:Math.round(A.H*.78),st:(x1-x0)/8}}
const WORDS=[['Impossible',0],['Unlikely',2],['Even chance',4],['Likely',6],['Certain',8]];
function scale(){const g=A.ctx,{x0,x1,y,st}=sc(),C=A.col;g.strokeStyle=fg();g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 for(let i=0;i<=8;i++){const x=x0+i*st,big=i%4===0;g.lineWidth=big?3:1.5;g.beginPath();g.moveTo(x,y-(big?9:5));g.lineTo(x,y+(big?9:5));g.stroke()}
 txt('0',x0,y-20,12,{c:soft()});txt('½',x0+4*st,y-20,13,{c:soft()});txt('1',x1,y-20,12,{c:soft()});
 WORDS.forEach(([w,i],j)=>txt(w,x0+i*st,y+(j%2?40:22),A.narrow?11:13,{w:700,c:soft(),al:i===0?'left':i===8?'right':'center'}));
 (S.ptr||[]).forEach(P=>{const x=x0+P.v*st,cl=A.col[P.c]||C.ac;g.fillStyle=cl;g.beginPath();g.moveTo(x,y-4);g.lineTo(x-10,y-26);g.lineTo(x+10,y-26);g.closePath();g.fill();
  if(P.drag){g.beginPath();g.arc(x,y-16,Math.max(14,st*.45),0,7);g.strokeStyle=cl;g.lineWidth=2.5;g.setLineDash([4,3]);g.stroke();g.setLineDash([])}
  if(P.name)txt(P.name,x,y-38,12,{c:cl})})}
/* a bag of counters: red ones carry an R so colour is never the only cue */
function bag(B,cx,cy,w){const g=A.ctx,C=A.col,n=B.n,cols=4,r=Math.min(w/10.4,22),rows=Math.ceil(n/cols),bw=cols*r*2.6,bh=rows*r*2.6+r;
 A.paint.rrect(cx-bw/2,cy-bh/2,bw,bh,14);g.fillStyle=A.alpha(fg(),.06);g.fill();g.strokeStyle=A.alpha(fg(),.5);g.lineWidth=2;g.stroke();B.hit=[];
 for(let i=0;i<n;i++){const x=cx-bw/2+r*1.3+(i%cols)*r*2.6,y=cy-bh/2+r*1.8+Math.floor(i/cols)*r*2.6,red=i<B.red;B.hit.push([x,y,r*1.2]);
  g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=red?C.rd:C.cy;g.fill();g.strokeStyle=fg();g.lineWidth=1.5;g.stroke();txt(red?'R':'B',x,y,Math.round(r*.9),{c:A.col.pn,w:900,halo:false})}
 if(B.name)txt(B.name,cx,cy-bh/2-12,13,{c:soft()})}
function spinner(cx,cy,R){const g=A.ctx,C=A.col;S.hit=[];for(let i=0;i<8;i++){const a0=-Math.PI/2+i*Math.PI/4,a1=a0+Math.PI/4,red=i<S.red;g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,R,a0,a1);g.closePath();
  g.fillStyle=red?C.rd:C.cy;g.fill();g.strokeStyle=fg();g.lineWidth=2;g.stroke();const m=(a0+a1)/2;txt(red?'R':'B',cx+Math.cos(m)*R*.74,cy+Math.sin(m)*R*.74,14,{c:A.col.pn,w:900,halo:false});S.hit.push([a0,a1])}
 const a=S.ang||0;g.strokeStyle=fg();g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*R*.5,cy+Math.sin(a)*R*.5);g.stroke();g.beginPath();g.arc(cx,cy,6,0,7);g.fillStyle=fg();g.fill()}
function lay(){return{cx:A.W/2,cy:A.H*.36,w:Math.min(A.W*.6,300)}}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(kind()==='chal'){txt('Impossible · Unlikely · Even chance · Likely · Certain',W/2,H*.3,A.narrow?13:15);txt('Even chance means half of the outcomes.',W/2,H*.45,14,{c:soft(),w:700});txt('Likely does not mean always.',W/2,H*.6,14,{c:soft(),w:700});A.fx.draw(g);return}
 const L=lay();if(S.bags){const n=S.bags.length;S.bags.forEach((B,i)=>bag(B,n>1?W*(i?.73:.27):W/2,L.cy+8,n>1?W/2.4:L.w*.8))}
 if(S.spin)spinner(L.cx,L.cy,Math.min(H*.25,W*.22));
 if(S.tally)txt(S.tally,W/2,H*.62,13,{c:soft(),w:700});
 scale();txt(S.top||'',8,16,14,{w:700,c:soft(),al:'left'});A.fx.draw(g)}
/* actions */
function setP(i,v){const P=S.ptr[i];v=Math.max(0,Math.min(8,Math.round(v)));if(P.v===v)return;P.v=v;A.sound.tick();say(S.say());A.redraw();S.check()}
function setRed(n,B){B=B||S.bags?.[0]||S;n=Math.max(0,Math.min(8,n));if(B.red===n)return;B.red=n;if(S.follow)S.ptr[0].v=n;A.sound.tick();say(S.say());A.redraw();S.check()}
function spinIt(times){if(S.busy)return;S.busy=1;let red=0;const outs=[];for(let k=0;k<times;k++){const s=Math.floor(Math.random()*8);outs.push(s);if(s<S.red)red++}
 const last=outs[outs.length-1],to=-Math.PI/2+(last+.5)*Math.PI/4+Math.PI*2*3,end=()=>{S.busy=0;S.ang=to;S.spins=(S.spins||0)+times;S.reds=(S.reds||0)+red;
  S.tally=`${S.spins} spins: red ${S.reds}, blue ${S.spins-S.reds}`;say(`${S.tally}. Likely means red comes up more often, not every time.`);A.redraw();S.check()};
 if(A.reduced()){end();return}S.ang=S.ang||0;A.tween(S,{ang:to},900,'out',end)}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;drag=null;for(const x in S)delete S[x];Object.assign(S,{check:()=>{},say:()=>''},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*420))}
const walk=(f,from,to)=>{const a=[];for(let n=from;n!==to;n+=to>from?1:-1){const m=n+(to>from?1:-1);a.push(()=>f(m))}return a};
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 (S.ptr||[]).forEach((P,i)=>{if(P.drag){const nm=P.name?P.name+' ':'';btn(`◀ ${nm}`.trim(),()=>setP(i,P.v-1),`Move the ${nm}pointer one eighth towards impossible`);btn(`${nm}▶`.trim(),()=>setP(i,P.v+1),`Move the ${nm}pointer one eighth towards certain`)}});
 if(S.paint){const B=S.bags?S.bags[0]:S,what=S.spin?'part':'counter';btn(`− red ${what}`,()=>setRed(B.red-1,B),`Make one red ${what} blue`);btn(`+ red ${what}`,()=>setRed(B.red+1,B),`Make one blue ${what} red`)}
 if(S.spin)btn('Spin 10 times',()=>spinIt(10),'Spin the spinner 10 times and count the reds')}
/* drag the pointer along the scale; tap a counter or a spinner part to switch its colour */
let drag=null;
function down(p){const k=kind(),{x0,y,st}=sc();
 if(S.ptr&&Math.abs(p.y-(y-14))<st*1.2+20){let best=-1,bd=1e9;S.ptr.forEach((P,i)=>{if(!P.drag)return;const d=Math.abs(x0+P.v*st-p.x);if(d<bd){bd=d;best=i}});if(best>=0){drag={i:best};move(p);return true}}
 if(S.paint&&S.bags){const B=S.bags[0],j=(B.hit||[]).findIndex(([x,yy,r])=>Math.hypot(p.x-x,p.y-yy)<r);if(j>=0){setRed(j<B.red?j:j+1,B);return true}}
 if(S.paint&&S.spin){const L=lay(),R=Math.min(A.H*.25,A.W*.22),d=Math.hypot(p.x-L.cx,p.y-L.cy);if(d<R){let a=Math.atan2(p.y-L.cy,p.x-L.cx);if(a<-Math.PI/2)a+=Math.PI*2;const j=Math.floor((a+Math.PI/2)/(Math.PI/4));setRed(j<S.red?j:j+1);return true}}
 return false}
function move(p){if(!drag)return;const{x0,st}=sc();setP(drag.i,(p.x-x0)/st)}
const steps=[
{h:'Impossible',p:'Chance words tell how likely something is. They sit on a likelihood scale from 0 to 1. Impossible is 0: it cannot happen at all.',
 predict:{q:'The bag has 8 blue counters and no red ones. You pick one without looking. How likely is it to be red?',opts:['Impossible','Unlikely','Even chance'],ans:0},
 task:'Drag the pointer to show the chance of picking red',show:()=>auto(0,walk(v=>setP(0,v),4,0)),
 go:()=>{reset({bags:[{n:8,red:0}],ptr:[{v:4,drag:1,c:'rd'}],top:'Chance of picking red',
  say:()=>{const v=S.ptr[0].v;return v===0?'Impossible, 0: there are no red counters, so red cannot happen.':`The pointer says ${word(v)}. Look in the bag: how many red counters are there?`}});
  say('A bag of 8 blue counters. Drag the red pointer along the likelihood scale, or use the buttons.');controls();S.check=finish(0,()=>S.ptr[0].v===0,'No red at all: impossible, 0.')}},
{h:'Even chance',p:'Even chance means half and half: it is just as likely to happen as not. On the scale it is ½, right in the middle.',
 predict:{q:'There are 8 counters. How many must be red for an even chance of picking red?',opts:['4','8','2'],ans:0},
 task:'Tap counters to make them red until picking red is an even chance',show:()=>auto(1,walk(n=>setRed(n),1,4)),
 go:()=>{reset({bags:[{n:8,red:1}],paint:1,follow:1,ptr:[{v:1,c:'rd'}],top:'Make red an even chance',
  say:()=>{const r=S.bags[0].red;return r===4?'4 red out of 8 is half: an even chance, ½ on the scale.':`${r} red out of 8: ${word(r)}. ${r<4?'Add':'Take away'} some red.`}});
  say('A bag with 1 red and 7 blue counters. Tap a counter to switch its colour, or use the buttons.');controls();S.check=finish(1,()=>S.bags[0].red===4,'Half the counters are red: even chance.')}},
{h:'Unlikely is not impossible',p:'Unlikely means it could happen, but probably will not. It sits between 0 and ½. One red counter in eight makes red unlikely, not impossible.',
 predict:{q:'A bag has 1 red and 7 blue counters. Picking red is\u2026',opts:['Unlikely','Impossible','Even chance'],ans:0},
 task:'Make picking red unlikely but still possible',show:()=>auto(2,walk(n=>setRed(n),6,2)),
 go:()=>{reset({bags:[{n:8,red:6}],paint:1,follow:1,ptr:[{v:6,c:'rd'}],top:'Unlikely, but possible',
  say:()=>{const r=S.bags[0].red;return r===0?'0 red is impossible, not unlikely. Put at least one red back.':r<4?`${r} red out of 8: unlikely, but it can still happen.`:`${r} red out of 8 is ${word(r)}. Fewer red, please.`}});
  say('A bag with 6 red and 2 blue counters. Tap counters, or use the buttons.');controls();S.check=finish(2,()=>{const r=S.bags[0].red;return r>0&&r<4},'Between 0 and ½: unlikely, but not impossible.')}},
{h:'Likely is not always',p:'Likely means it will probably happen, more than half the time. But likely is not certain. Spin and count: red wins most often, yet blue still turns up.',
 predict:{q:'A spinner has 6 red parts out of 8. Landing on red is\u2026',opts:['Likely','Certain','Unlikely'],ans:0},
 task:'Make red likely on the spinner, then spin it 10 times',show:()=>auto(3,[...walk(n=>setRed(n),2,6),()=>spinIt(10)]),
 go:()=>{reset({spin:1,red:2,ang:-Math.PI/2+Math.PI/8,paint:1,follow:1,ptr:[{v:2,c:'rd'}],top:'Make red likely, then spin',
  say:()=>{const r=S.red;return r>4&&r<8?`${r} red parts out of 8: likely. Now spin it 10 times.`:r===8?'All red is certain, not just likely. Make one part blue.':`${r} red out of 8 is ${word(r)}. Add some red.`}});
  say('A spinner with 8 equal parts, 2 red. Tap a part to switch it, or use the buttons.');controls();
  S.check=()=>{const r=S.red;if(A.step===3&&r>4&&r<8&&S.spins&&A.pred[3]!=null&&!A.isDone)A.done(`Red is likely: ${S.reds} red in ${S.spins} spins, and blue still came up. `+A.reveal(3))}}},
{h:'Compare two bags',p:'The number of red counters is not the whole story. Compare red with the total. 2 red out of 4 is a better chance than 2 red out of 8.',
 task:'Drag each pointer to show the chance of red from bag A and from bag B',show:()=>auto(4,[...walk(v=>setP(0,v),0,2),...walk(v=>setP(1,v),0,4)]),
 go:()=>{reset({bags:[{n:8,red:2,name:'Bag A'},{n:4,red:2,name:'Bag B'}],ptr:[{v:0,drag:1,c:'vi',name:'A'},{v:0,drag:1,c:'gr',name:'B'}],top:'Same red, different chance',
  say:()=>{const[a,b]=S.ptr.map(P=>P.v);return a===2&&b===4?'Bag A: 2 out of 8, unlikely. Bag B: 2 out of 4, an even chance. Bag B gives the better chance.':a===b&&a>0?'Both bags have 2 red, but bag B has fewer counters in all. The chances differ.':`A says ${word(a)}, B says ${word(b)}. Compare red with the total in each bag.`}});
  say('Bag A has 2 red and 6 blue. Bag B has 2 red and 2 blue. Drag pointers A and B, or use the buttons.');controls();
  S.check=()=>{if(A.step===4&&S.ptr[0].v===2&&S.ptr[1].v===4&&!A.isDone)A.done('A is unlikely (2 out of 8) and B an even chance (2 out of 4).')}}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A normal dice is rolled. How likely is it to show 7?',[['Impossible','ok'],['Unlikely','tiny'],['Even chance','half']]],
 ['A fair coin is tossed. How likely is heads?',[['Even chance','ok'],['Likely','favour'],['Certain','sure']]],
 ['A bag has 9 green sweets and 1 pink. You pick one without looking. Picking green is\u2026',[['Likely','ok'],['Certain','sure'],['Unlikely','flip']]],
 ['A spinner is likely to land on red. Spin it 5 times. Which is true?',[['It might land on blue sometimes','ok'],['It lands on red every time','sure'],['It never lands on red','flip']]],
 ['Bag A: 3 red out of 4. Bag B: 3 red out of 10. Which gives the better chance of red?',[['Bag A','ok'],['Bag B','count'],['They are the same','count']]],
 ['Where does \u201ceven chance\u201d go on the likelihood scale from 0 to 1?',[['\u00bd, in the middle','ok'],['0','zero'],['1','sure']]]];
function why(t){let m='Compare the outcomes you want with all the outcomes.';
 if(t==='tiny')m='Unlikely means it could happen. A dice only has 1 to 6, so 7 cannot happen at all: impossible.';
 if(t==='half')m='Even chance needs half the outcomes. No face shows 7, so it is impossible.';
 if(t==='favour')m='Heads and tails are just as likely as each other: 1 out of 2, an even chance.';
 if(t==='sure')m='Certain means it must happen every time. Here something else can still happen, so it is not certain.';
 if(t==='flip')m='Look at which there is more of. More of it means likely, not unlikely.';
 if(t==='count')m='Do not count red alone. 3 out of 4 is most of the bag, 3 out of 10 is less than half.';
 if(t==='zero')m='0 is impossible. Even chance is halfway between impossible and certain: ½.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},box,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.6,tall:.95,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Chance controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:()=>{drag=null}});controls()}});
A.start()})})();
