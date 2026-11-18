/* Flagship – getting better with practice (ages 4–5): cut along a wiggly line again and again and watch the cut get
   neater, spot which try came after practice, race "a little every day" against "one long go", practise the tricky
   bit of writing a name, then fill a week of practice for a skill. Drag on the canvas or tap a big button. */
(()=>{
const SK=[{id:'cut',ic:'✂️',name:'Cutting'},{id:'name',ic:'✍️',name:'Writing my name'},{id:'ball',ic:'🏀',name:'Throwing in a hoop'},{id:'bike',ic:'🚲',name:'Pedalling'}];
const DAYS=['Mon','Tue','Wed','Thu','Fri'];
const PAIRS=[['cut',4,0],['name',0,4],['ball',4,0]];
VIS.reg('flagprac',c=>{let A,pad,qb,qn=-1,good=0,ver=0;c.fig.classList.add('young');
const S={goes:[],pen:null,pair:0,right:0,plans:{},show:null,letters:[.2,.9,.85],used:0,skill:0,week:[],want:()=>{}};
const md=()=>['cut','pairs','plan','tricky','week','quiz'][A.step];
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t);S.note=t};
const fs=n=>Math.round(n*(A.narrow?1:1.15));
/* wobble shrinks with every go: practice makes the hand steadier */
const wob=n=>22*Math.pow(.55,n);
const lineY=x=>A.H*.42+Math.sin(x/A.W*Math.PI*3)*A.H*.08;
const noise=(x,seed)=>Math.sin(x*.09+seed*1.7)*.6+Math.sin(x*.23+seed*3.1)*.4;
function T(g,t,x,y,n,col,w){g.font=`${w||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-12)}
function E(g,e,x,y,n){g.font=`${fs(n)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function stars(n){return '★'.repeat(n)+'☆'.repeat(3-n)}
const score=w=>w>12?1:w>5?2:3;
/* a picture of one try at a skill; lvl 0 = first wobbly try, 4 = after lots of practice */
function attempt(g,kind,lvl,x,y,w,h){const C=A.col,wb=wob(lvl)*.6;g.lineWidth=3;g.strokeStyle=C.tx;
 if(kind==='cut'){g.setLineDash([5,5]);g.strokeStyle=C.mu;g.beginPath();for(let i=0;i<=40;i++){const px=x+w*i/40,py=y+h/2+Math.sin(i/40*Math.PI*2)*h*.15;i?g.lineTo(px,py):g.moveTo(px,py)}g.stroke();g.setLineDash([]);
  g.strokeStyle=C.vi;g.beginPath();for(let i=0;i<=40;i++){const px=x+w*i/40,py=y+h/2+Math.sin(i/40*Math.PI*2)*h*.15+noise(px,lvl+2)*wb;i?g.lineTo(px,py):g.moveTo(px,py)}g.stroke()}
 if(kind==='name'){'SAM'.split('').forEach((ch,i)=>{g.save();g.translate(x+w*(.25+i*.25),y+h/2+noise(i*40,lvl)*wb*.6);g.rotate(noise(i*70,lvl+1)*wb*.03);g.font=`700 ${fs(26)+noise(i*30,lvl)*wb*.4}px system-ui,sans-serif`;g.fillStyle=C.tx;g.textAlign='center';g.textBaseline='middle';g.fillText(ch,0,0);g.restore()})}
 if(kind==='ball'){const hx=x+w/2,hy=y+h/2;g.strokeStyle=C.or;g.lineWidth=4;g.beginPath();g.ellipse(hx,hy,w*.16,h*.12,0,0,7);g.stroke();for(let i=0;i<5;i++){const bx=hx+noise(i*50,lvl)*wb*3.2,by=hy+noise(i*90,lvl+4)*wb*2;A.paint.ball(bx,by,5,C.or)}}}
function draw(A){const{ctx:g,W,H,col:C}=A,m=md();g.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(m==='cut'){g.fillStyle=A.mix(C.pn,'#ffffff',C.dark?.1:.9);A.paint.rrect(10,H*.12,W-20,H*.6,14);g.fill();
  g.setLineDash([8,7]);g.lineWidth=3;g.strokeStyle=C.mu;g.beginPath();for(let x=20;x<=W-20;x+=6){const y=lineY(x);x>20?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();g.setLineDash([]);
  S.goes.forEach((p,i)=>{const last=i===S.goes.length-1;g.globalAlpha=last?1:.35;g.strokeStyle=last?C.vi:C.mu;g.lineWidth=last?4:2;g.beginPath();p.forEach((q,j)=>j?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y));g.stroke();g.globalAlpha=1});
  if(S.pen){g.strokeStyle=C.vi;g.lineWidth=4;g.beginPath();S.pen.forEach((q,j)=>j?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y));g.stroke();const q=S.pen[S.pen.length-1];E(g,'✂️',q.x,q.y-14,22)}else E(g,'✂️',22,lineY(20)-14,22);
  const n=S.goes.length;T(g,n?`Go ${n}: ${stars(score(wob(n-1)))}`:'Start at the scissors',W/2,H*.82,17,C.tx);T(g,'Drag along the dotted line',W/2,H*.93,12,C.mu,700)}
 if(m==='pairs'){const[k,a,b]=PAIRS[S.pair%3],w=(W-30)/2;[a,b].forEach((lvl,i)=>{const x=10+i*(w+10),hot=S.show===i;g.fillStyle=A.mix(C.pn,hot?'#bbf7d0':'#ffffff',C.dark?.12:.8);A.paint.rrect(x,H*.08,w,H*.62,14);g.fill();g.lineWidth=hot?5:2;g.strokeStyle=hot?C.gr:A.mix(C.tx,C.pn,.5);g.stroke();attempt(g,k,lvl,x+10,H*.15,w-20,H*.45);T(g,i?'Try B':'Try A',x+w/2,H*.64,14,C.tx)});
  T(g,'Which try came after lots of practice?',W/2,H*.8,14,C.tx,700)}
 if(m==='plan'){const bw=(W-40)/2;[['daily','A little every day'],['long','One long go']].forEach(([id,lab],i)=>{const x=10+i*(bw+20),p=S.plans[id]||[];g.fillStyle=A.mix(C.pn,'#ffffff',C.dark?.1:.85);A.paint.rrect(x,H*.06,bw,H*.68,12);g.fill();T(g,lab,x+bw/2,H*.12,13,C.tx);
   const base=H*.66,cw=bw/5;p.forEach((v,d)=>{const bh=v/100*H*.44;g.fillStyle=id==='daily'?C.gr:C.or;A.paint.rrect(x+d*cw+5,base-bh,cw-10,bh,4);g.fill();T(g,DAYS[d][0],x+d*cw+cw/2,base+12,11,C.mu,700)});
   if(p.length===5)T(g,`Friday: ${p[4]}% easy`,x+bw/2,H*.2,13,id==='daily'?C.gr:C.or)});T(g,'Same time practising: 5 short goes or 1 long one',W/2,H*.86,12,C.mu,700)}
 if(m==='tricky'){const w=(W-40)/3;'SAM'.split('').forEach((ch,i)=>{const x=10+i*(w+10),v=S.letters[i],ok=v>=.8;g.fillStyle=A.mix(C.pn,ok?'#bbf7d0':'#fecaca',C.dark?.15:.7);A.paint.rrect(x,H*.08,w,H*.5,14);g.fill();g.lineWidth=2;g.strokeStyle=ok?C.gr:C.rd;g.stroke();
   g.save();g.translate(x+w/2,H*.3);g.rotate((1-v)*.5);g.font=`800 ${fs(54)*(0.7+v*.3)}px system-ui,sans-serif`;g.fillStyle=C.tx;g.textAlign='center';g.textBaseline='middle';g.fillText(ch,0,0);g.restore();T(g,ok?'neat ✓':'wobbly',x+w/2,H*.52,13,C.tx,700)});
  const all=S.letters.every(v=>v>=.8);T(g,all?'SAM looks neat now!':'Tap a letter to practise it',W/2,H*.7,15,C.tx);T(g,`Practice goes used: ${S.used}`,W/2,H*.8,12,C.mu,700)}
 if(m==='week'){const sk=SK[S.skill],cw=(W-20)/5;E(g,sk.ic,W/2,H*.14,30);T(g,sk.name,W/2,H*.26,15,C.tx);DAYS.forEach((d,i)=>{const x=10+i*cw,on=i<S.week.length;g.fillStyle=A.mix(C.pn,on?'#fde68a':'#ffffff',C.dark?.15:.8);A.paint.rrect(x+3,H*.36,cw-6,H*.24,10);g.fill();T(g,d,x+cw/2,H*.42,12,C.tx,700);T(g,on?'⭐':'·',x+cw/2,H*.52,18,C.tx)});
  const n=S.week.length,face=['😣','😕','🙂','😊','😄','🤩'][n];E(g,face,W*.25,H*.78,30);T(g,n<5?`${n} of 5 days`:'It feels easy now!',W*.62,H*.78,15,C.tx)}
 if(m==='quiz'){E(g,'🌱',W/2,H*.3,40);T(g,'Hard at first. Easier with practice.',W/2,H*.6,16,C.tx)}A.fx.draw(g)}
function finishGo(path){S.goes.push(path);S.pen=null;const n=S.goes.length,s=score(wob(n-1));A.sound.pop();say(n===1?`Go 1: ${stars(s)}. A bit wobbly. That is fine for a first go!`:`Go ${n}: ${stars(s)}. ${s>score(wob(n-2))?'Neater than before!':'Steady!'} Each go, your hand learns.`);S.want();A.redraw()}
function cutPath(seed,upTo){const n=S.goes.length,w=wob(n),pts=[];for(let x=20;x<=upTo;x+=6)pts.push({x,y:lineY(x)+noise(x,seed)*w});return pts}
function autoCut(){if(S.pen)return;const seed=S.goes.length+1,k=ver,o={u:20};S.pen=[];A.tween(o,{u:A.W-20},A.reduced()?1:600,'io',()=>{if(k===ver)finishGo(cutPath(seed,A.W-20))});A.every(()=>{if(S.pen&&k===ver){S.pen=cutPath(seed,o.u);return o.u<A.W-20}return false})}
function pickPair(i){const[k,a,b]=PAIRS[S.pair%3],later=a>b?0:1;if(i===later){S.right++;S.show=i;A.sound.pop();say(`Yes! Try ${i?'B':'A'} came later. It is neater because of practice.`);const v=ver;setTimeout(()=>{if(v===ver){S.pair++;S.show=null;keys();A.redraw()}},A.reduced()?5:450);S.want()}
 else{A.sound.miss();say(`Look again. Try ${i?'B':'A'} is the wobbly one. First tries are wobbly; practice makes them neater.`)}A.redraw()}
function runPlan(id){if(S.plans[id])return;const v=[];let s=10;for(let d=0;d<5;d++){if(id==='daily'){s=Math.min(100,s+14)}else{s=d===0?s+35:Math.max(10,s-5)}v.push(Math.round(s))}
 S.plans[id]=[];const k=ver;v.forEach((x,d)=>setTimeout(()=>{if(k!==ver)return;S.plans[id].push(x);A.redraw();if(d===4){say(id==='daily'?`A little every day: by Friday it is ${x}% easy.`:`One long go: easy on Monday, then it slips back to ${x}% with no more practice.`);S.want()}},A.reduced()?5:d*160));A.sound.tick();keys()}
function practise(i){if(S.letters.every(v=>v>=.8))return;S.used++;if(S.letters[i]>=.8){A.sound.miss();say(`${'SAM'[i]} is already neat. Practise the wobbly letter instead.`);return A.redraw()}
 S.letters[i]=Math.min(1,S.letters[i]+.35);A.sound.pop();say(S.letters[i]>=.8?`${'SAM'[i]} is neat now! Practising the tricky bit worked.`:`Better! One more go at ${'SAM'[i]}.`);S.want();A.redraw()}
function day(){if(S.week.length>=5)return;S.week.push(1);A.sound.pop();const n=S.week.length;say(n<5?`Day ${n} done. ${SK[S.skill].name} is a little easier.`:`5 days of practice! ${SK[S.skill].name} used to be hard. Now it is easy.`);S.want();keys();A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const m=md(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=f};
 if(m==='cut'&&S.goes.length<3)B('✂️ Cut along the line',autoCut);
 if(m==='pairs'&&S.right<3){B('Try A came later',()=>pickPair(0));B('Try B came later',()=>pickPair(1))}
 if(m==='plan'){if(!S.plans.daily)B('🌱 A little every day',()=>runPlan('daily'));if(!S.plans.long)B('⏳ One long go',()=>runPlan('long'))}
 if(m==='tricky')'SAM'.split('').forEach((ch,i)=>B(`Practise ${ch}`,()=>practise(i)));
 if(m==='week'){if(S.week.length<5)B('⭐ Practise today',day);SK.forEach((s,i)=>{if(i!==S.skill&&!S.week.length)B(`${s.ic} ${s.name}`,()=>{S.skill=i;keys();A.redraw()})})}}
function down(p){const m=md();if(m==='cut'&&!S.pen&&S.goes.length<3&&Math.abs(p.x-22)<50&&Math.abs(p.y-lineY(22))<50){S.pen=[{x:20,y:lineY(20)}];S.seed=S.goes.length+1;return true}
 if(m==='pairs'&&S.right<3&&p.y<A.H*.72){pickPair(p.x<A.W/2?0:1);return false}
 if(m==='plan'&&p.y<A.H*.74){runPlan(p.x<A.W/2?'daily':'long');return false}
 if(m==='tricky'&&p.y<A.H*.6){practise(Math.max(0,Math.min(2,Math.floor((p.x-10)/((A.W-20)/3)))));return false}
 if(m==='week'&&p.y>A.H*.34&&p.y<A.H*.62){day();return false}return false}
function move(p){if(md()!=='cut'||!S.pen)return;const last=S.pen[S.pen.length-1];if(p.x>last.x+5){const x=Math.min(A.W-20,p.x),pull=Math.max(-30,Math.min(30,p.y-lineY(x)));S.pen.push({x,y:lineY(x)+pull*.4+noise(x,S.seed)*wob(S.goes.length)})}A.redraw()}
function up(){if(md()!=='cut'||!S.pen)return;const last=S.pen[S.pen.length-1];if(last.x>=A.W-40)finishGo(S.pen);else{S.pen=null;say('Keep going all the way to the end of the line.')}A.redraw()}
const ok=(n,f,msg)=>()=>{if(A.step===n&&f()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const fresh=(n,f,msg,t)=>{ver++;Object.assign(S,{goes:[],pen:null,pair:0,right:0,plans:{},show:null,letters:[.2,.9,.85],used:0,week:[]});S.want=ok(n,f,msg);say(t);keys()};
function seq(fs,gap){const k=ver;fs.forEach((f,j)=>setTimeout(()=>{if(k===ver)f()},A.reduced()?j*20+10:j*gap+200))}
const steps=[
{h:'Have a go',p:'Cut along the wiggly line. Drag the scissors, or tap the button. Then have another go, and another.',
 predict:{q:'You cut the same line 3 times. What will your 3rd go look like?',opts:['Just as wobbly','Neater','Worse'],ans:1},task:'Cut the line 3 times',
 show:()=>{steps[0].go();seq([autoCut,autoCut,autoCut],900)},go:()=>fresh(0,()=>S.goes.length>=3,'Each go was neater. Doing it again and again makes it easier.','A wiggly line to cut. Start at the scissors.')},
{h:'Then and now',p:'One try was the very first. One came after lots of practice. Can you tell which is which?',
 predict:{q:'Some children are good at cutting. Did they need practice too?',opts:['No, they were just born good','Yes, everyone gets better by practising'],ans:1},task:'Spot the later try 3 times',
 show:()=>{steps[1].go();seq([0,1,2].map(j=>()=>pickPair(PAIRS[j][1]>PAIRS[j][2]?0:1)),700)},go:()=>fresh(1,()=>S.right>=3,'The neat tries all came later. Everyone starts wobbly.','Which try came after lots of practice?')},
{h:'Little and often',p:'Two ways to practise for the same time. Five short goes, one each day. Or one long go on Monday. Try both.',
 predict:{q:'Which helps more by Friday?',opts:['One long go on Monday','A little every day'],ans:1},task:'Try both plans',
 show:()=>{steps[2].go();seq([()=>runPlan('daily'),()=>runPlan('long')],1000)},go:()=>fresh(2,()=>(S.plans.daily||[]).length===5&&(S.plans.long||[]).length===5,'A little every day kept getting better. One long go slipped back.','Pick a plan to practise.')},
{h:'The tricky bit',p:'Sam is learning to write his name. A and M are neat. S is wobbly. Tap a letter to practise it.',
 predict:{q:'What should Sam practise?',opts:['A and M again','The wobbly S','Nothing, just stop'],ans:1},task:'Make all of SAM neat',
 show:()=>{steps[3].go();seq([()=>practise(0),()=>practise(0),()=>practise(0)],500)},go:()=>fresh(3,()=>S.letters.every(v=>v>=.8),'Practising the tricky bit made the whole name neat.','S is wobbly. A and M are neat.')},
{h:'My practice week',p:'Pick a skill you are learning. Practise a little each day, Monday to Friday. Watch the face!',task:'Practise 5 days',
 show:()=>{steps[4].go();seq([day,day,day,day,day],350)},go:()=>fresh(4,()=>S.week.length>=5,'Something that was hard is now easy, because you kept practising.','Pick a skill, then practise it each day.')},
{h:'Challenge',p:'',go:()=>{ver++;quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Your first go at cutting is wobbly. What should you do?',[['Have another go','ok'],['Stop. I am bad at it','quit'],['Ask a grown-up to do it for ever','others']]],
 ['Which helps you get better at riding a bike?',[['A little practice every day','ok'],['One long go, then stop','cram'],['Just watching others ride','watch']]],
 ['Mia can write the M in her name, but i is wobbly. What should she practise?',[['The wobbly i','ok'],['The M again','easy'],['Nothing','quit']]],
 ['Is a neat try made by practice or by luck?',[['Practice','ok'],['Luck','luck'],['Being born good','born']]],
 ['Writing your name used to be hard. Now it is easy. Why?',[['You practised it lots','ok'],['The pencil changed','tool'],['It was always easy','always']]]];
function why(t){let m='Doing something again and again makes it easier.';
 if(t==='quit')m='A wobbly go is not a reason to stop. Every go teaches your hands a little more.';
 if(t==='others')m='Help is good, but if you never try, it never gets easier for you.';
 if(t==='cram')m='One long go helps for a day, then it slips. A little every day keeps getting better.';
 if(t==='watch')m='Watching gives you ideas, but your legs learn by doing it themselves.';
 if(t==='easy')m='The M is already neat. Practise the tricky bit, the part that is still wobbly.';
 if(t==='luck')m='Remember the cutting lab: each go got neater. That was practice, not luck.';
 if(t==='born')m='Everyone starts wobbly. People who are good at things practised a lot.';
 if(t==='tool')m='Same pencil, more practice. Your hand got better, not the pencil.';
 if(t==='always')m='Look back: your first tries were wobbly. It got easy because you kept going.';return m}
function quiz(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>check(t)});say('Challenge: '+q);A.redraw()}
function check(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),y=t==='ok';if(y){good++;A.win()}else{good=0;A.sound.miss()}
 fb.innerHTML=(y?`✓ Yes! Practice makes it easier. ${good} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
