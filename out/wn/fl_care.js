/* Flagship – everyday kindness and care (ages 5–7): spot who needs care from faces and what happened, drag the kind act
   to the child who needs it, pick kind words, ask before helping (and accept "no thanks"), and sort kind and unkind acts.
   Tap or drag, big targets, very few words. */
(()=>{
/* a child is [mood, what happened, short label, spoken description] */
const KID={ball:['happy','ball','Playing ball','smiling, playing with a ball'],swing:['happy','swing','On the swing','smiling on the swing'],run:['happy','none','Running','smiling and running'],
 knee:['cry','knee','Fell over','crying, with a hurt knee'],books:['sad','books','Dropped books','sad, books all over the floor'],alone:['sad','alone','No one to play with','sad, sitting on their own'],
 snack:['sad','snack','Forgot snack','sad, with an empty lunch box'],zip:['worried','zip','Stuck zip','worried, pulling at a stuck zip'],tower:['sad','tower','Tower fell','sad, blocks fallen down'],lost:['sad','none','Lost the race','sad after a race']};
const SPOT=[['ball','knee','run'],['swing','run','books'],['alone','ball','swing']];
const GIVE=[[['knee','books','snack'],['Ask "Are you OK?" and get a grown-up','Help pick them up','Share some of yours']],
 [['alone','zip','tower'],['Ask "Do you want to play?"','Ask "Can I help?"','Say "Shall we build it again?"']]];
const NEED={knee:'They are hurt. Check on them and get a grown-up.',books:'Their things fell. Help pick them up.',snack:'They have no food. You could share.',
 alone:'They are on their own. Ask them to play.',zip:'Their zip is stuck. Ask if they want help.',tower:'Their tower fell. Offer to build it again.'};
const SAY=[['tower','Mo\'s tower fell down.',[['That is sad. Shall we build it again?','ok'],['Ha ha, it fell!','laugh'],['Do not be sad, it is only blocks.','stop']]],
 ['alone','Ana is scared to read out loud.',[['I will sit with you. You can do it.','ok'],['You read so slowly.','mean'],['Just do not read.','avoid']]],
 ['lost','Sam came last in the race.',[['I won, you lost!','brag'],['Good try! You ran so hard.','ok'],['Walk off and say nothing.','ignore']]]];
const ASK=[['zip','Lily is stuck with her zip.',[['Ask: "Can I help?"','ok'],['Grab it and do it for her','grab'],['Laugh at her','laugh']]],
 ['zip','Lily says: "No thanks, I can do it!"',[['Do it for her anyway','grab'],['Say: "OK! Tell me if you want help."','ok'],['Get cross with her','cross']]],
 ['tower','Ben is building a tall tower.',[['Fix it for him without asking','grab'],['Say: "That is a bad tower."','mean'],['Ask: "Do you want help?"','ok']]],
 ['tower','Ben says: "Yes please! Hold the bottom."',[['Hold the bottom','ok'],['Take over and build it all','grab'],['Walk away','ignore']]]];
const SORT=[['Share without being asked',0],['Laugh when someone falls',1],['Help a child you do not know',0],['Fix their picture without asking',1],['Tell a grown-up someone is hurt',0],['Leave out the new child',1]];
const WHY={laugh:'Laughing makes them feel worse. Think how you would feel.',stop:'That tells them their feeling is wrong. Say you can see they are sad.',
 mean:'That hurts. Kind words help them feel brave.',avoid:'That does not help them try. Offer to stay close.',brag:'Showing off makes them feel worse. Say what they did well.',
 ignore:'Walking away leaves them alone. A kind word helps.',grab:'Doing it without asking takes it away from them. Ask first, then listen.',cross:'They said no, and that is OK. Stay kind and offer help later.'};
VIS.reg('flagcare',c=>{let A,ctl,chal,ci=-1,tok=0;c.fig.classList.add('young');
const fresh0=()=>({want:()=>{},won:0,r:0,k:0,cards:[],put:[],opts:[],kids:[],sel:-1,drag:null,bad:-1,heart:0}),S=fresh0();
const mode=()=>['spot','give','say','ask','sort','quiz'][A.step];
const slow=()=>A.reduced(),px=n=>Math.round(n*(A.narrow?1:1.15));
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,n,col,wt){g.font=`${wt||800} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function wrap(g,t,x,y,w,n){g.font=`700 ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;const ws=t.split(' '),L=[];let l='';
 ws.forEach(s=>{const z=l?l+' '+s:s;if(g.measureText(z).width>w&&l){L.push(l);l=s}else l=z});L.push(l);const lh=px(n)*1.2;L.forEach((s,i)=>g.fillText(s,x,y+(i-(L.length-1)/2)*lh))}
function face(g,x,y,r,mood){g.fillStyle='#f5c99b';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#5b3a1e';g.lineWidth=2.5;g.stroke();
 g.fillStyle='#3b2a1a';[-1,1].forEach(d=>{g.beginPath();g.arc(x+d*r*.35,y-r*.15,r*.09,0,7);g.fill()});g.lineWidth=3;g.beginPath();
 if(mood==='happy')g.arc(x,y+r*.15,r*.4,.2*Math.PI,.8*Math.PI);else if(mood==='worried'){g.moveTo(x-r*.3,y+r*.45);g.lineTo(x+r*.3,y+r*.4)}else g.arc(x,y+r*.65,r*.35,1.2*Math.PI,1.8*Math.PI);g.stroke();
 if(mood==='worried'){g.beginPath();g.moveTo(x-r*.55,y-r*.45);g.lineTo(x-r*.2,y-r*.35);g.moveTo(x+r*.55,y-r*.45);g.lineTo(x+r*.2,y-r*.35);g.stroke()}
 if(mood==='cry'){g.fillStyle='#38bdf8';[-1,1].forEach(d=>{g.beginPath();g.ellipse(x+d*r*.38,y+r*.18,r*.08,r*.16,0,0,7);g.fill()})}}
function prop(g,what,x,y,r){g.lineWidth=2;
 if(what==='ball'){A.paint.ball(x+r*1.1,y+r*1.3,r*.35,'#ef4444')}
 if(what==='knee'){g.fillStyle='#dc2626';A.paint.rrect(x-r*.3,y+r*1.5,r*.6,r*.25,4);g.fill()}
 if(what==='books')['#2563eb','#16a34a','#f59e0b'].forEach((k,i)=>{g.save();g.translate(x-r+i*r*.8,y+r*1.55);g.rotate(i*.5-.4);g.fillStyle=k;g.fillRect(-r*.3,-r*.18,r*.6,r*.36);g.restore()});
 if(what==='snack'){g.strokeStyle=A.col.tx;g.strokeRect(x-r*.5,y+r*1.3,r,r*.5)}
 if(what==='zip'){g.strokeStyle='#64748b';g.lineWidth=4;g.beginPath();g.moveTo(x,y+r*1.1);g.lineTo(x,y+r*1.9);g.stroke()}
 if(what==='tower')['#a855f7','#f59e0b','#22c55e'].forEach((k,i)=>{g.save();g.translate(x-r*.9+i*r*.9,y+r*1.6);g.rotate(i-1);g.fillStyle=k;g.fillRect(-r*.25,-r*.25,r*.5,r*.5);g.restore()});
 if(what==='swing'){g.strokeStyle=A.col.mu;g.beginPath();g.moveTo(x-r,y-r*1.3);g.lineTo(x-r,y+r);g.moveTo(x+r,y-r*1.3);g.lineTo(x+r,y+r);g.stroke()}}
function kid(g,id,rc,hot,label){const C=A.col,[mood,what,lab]=KID[id],r=Math.min(rc.w*.3,rc.h*.21);g.fillStyle=hot?A.alpha(C.rd,.16):A.alpha(C.cy,.1);A.paint.rrect(rc.x,rc.y,rc.w,rc.h,16);g.fill();
 g.strokeStyle=hot?C.rd:A.alpha(C.cy,.7);g.lineWidth=hot?5:3;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,16);g.stroke();const x=rc.x+rc.w/2,y=rc.y+rc.h*.32;prop(g,what,x,y,r);face(g,x,y,r,mood);if(label)wrap(g,lab,x,rc.y+rc.h-18,rc.w-8,11)}
/* ---- layout ---- */
function cells(n,y,h){const{W}=A,gap=10,w=Math.min((W-20-gap*(n-1))/n,170),x0=(W-n*w-gap*(n-1))/2;return Array.from({length:n},(_,k)=>({x:x0+k*(w+gap),y,w,h}))}
const kidBoxes=()=>mode()==='give'?cells(3,A.H*.42,A.H*.55):cells(3,A.H*.18,A.H*.5);
const optBoxes=()=>cells(3,A.H*.5,A.H*.46);
const sortBins=()=>cells(2,A.H*.55,A.H*.42);
function giveRects(){const rs=cells(3,A.H*.03,A.H*.34);return S.cards.map((_,i)=>S.drag&&S.drag.i===i&&S.drag.x!=null?{...rs[i],x:S.drag.x-rs[i].w/2,y:S.drag.y-rs[i].h/2}:rs[i])}
function card(g,t,rc,hot){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#fffbeb';A.paint.rrect(rc.x,rc.y,rc.w,rc.h,12);g.fill();g.strokeStyle=hot?C.vi:C.tx;g.lineWidth=hot?5:2.5;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,12);g.stroke();wrap(g,t,rc.x+rc.w/2,rc.y+rc.h/2,rc.w-12,12)}
function heart(g,x,y,s,col){g.fillStyle=col;g.beginPath();g.moveTo(x,y+s*.3);g.bezierCurveTo(x-s,y-s*.4,x-s*.4,y-s,x,y-s*.45);g.bezierCurveTo(x+s*.4,y-s,x+s,y-s*.4,x,y+s*.3);g.fill()}
/* ---- drawing ---- */
function scene(g,who,line){const C=A.col,r=Math.min(A.W,A.H)*.09;prop(g,KID[who][1],A.W*.16,A.H*.16,r);face(g,A.W*.16,A.H*.16,r,KID[who][0]);
 g.fillStyle=C.dark?'#1e293b':'#ffffff';A.paint.rrect(A.W*.3,A.H*.05,A.W*.66,A.H*.3,14);g.fill();g.strokeStyle=C.mu;g.lineWidth=2;A.paint.rrect(A.W*.3,A.H*.05,A.W*.66,A.H*.3,14);g.stroke();wrap(g,line,A.W*.63,A.H*.2,A.W*.6,14);
 for(let i=0;i<4;i++)heart(g,A.W*.36+i*24,A.H*.42,10,i<S.heart?C.pk:A.alpha(C.mu,.35))}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){heart(g,W/2,H*.42,40,C.pk);txt(g,'Notice. Ask. Help.',W/2,H*.7,17);return}
 if(S.won>=goal()){heart(g,W/2,H*.3,30,C.pk);txt(g,last(),W/2,H*.6,15);return A.fx.draw(g)}
 if(v==='spot')S.kids.forEach((id,k)=>kid(g,id,kidBoxes()[k],S.bad===k,false));
 if(v==='give'){S.kids.forEach((id,k)=>{const rc=kidBoxes()[k];kid(g,id,rc,S.bad===k,true);if(S.put.includes(k))heart(g,rc.x+rc.w-20,rc.y+22,14,C.pk)});
  const rs=giveRects();S.cards.forEach((t,i)=>{if(S.put[i]<0)card(g,t,rs[i],S.sel===i)})}
 if(v==='say'||v==='ask'){const[who,line]=(v==='say'?SAY:ASK)[Math.min(S.r,v==='say'?2:3)];scene(g,who,line);optBoxes().forEach((rc,k)=>card(g,S.opts[k][0],rc,S.bad===k))}
 if(v==='sort'){const bins=sortBins();['Kind','Not kind'].forEach((t,k)=>{const rc=bins[k];g.fillStyle=A.alpha(k?C.rd:C.gr,S.bad===k?.3:.14);A.paint.rrect(rc.x,rc.y,rc.w,rc.h,16);g.fill();g.strokeStyle=k?C.rd:C.gr;g.lineWidth=3;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,16);g.stroke();txt(g,(k?'✗ ':'♥ ')+t,rc.x+rc.w/2,rc.y+rc.h-22,15)});
  if(S.k<SORT.length){const w=Math.min(W*.6,260),h=H*.3,rc=S.drag&&S.drag.x!=null?{x:S.drag.x-w/2,y:S.drag.y-h/2,w,h}:{x:W/2-w/2,y:H*.08,w,h};card(g,SORT[S.k][0],rc,false)}
  txt(g,`${S.k} of ${SORT.length} sorted`,W/2,H*.47,12,C.mu,700)}A.fx.draw(g)}
const goal=()=>({spot:3,give:2,say:3,ask:4,sort:1}[mode()]||9);
const last=()=>({spot:'Faces and what happened tell you who needs care.',give:'Each person needs a different kind act.',say:'Kind words show you care how they feel.',ask:'Ask first, then listen to the answer.',sort:'Kindness is for everyone, not just friends.'}[mode()]);
const oops=(t,b)=>{A.sound.miss();S.bad=b==null?-1:b;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},slow()?10:900);A.redraw()};
function setup(){const v=mode(),r=S.r;S.sel=-1;S.drag=null;S.k=0;
 if(v==='spot')S.kids=SPOT[Math.min(r,2)];
 if(v==='give'){const[k,t]=GIVE[Math.min(r,1)];S.kids=k;S.cards=[t[1],t[2],t[0]];S.put=S.cards.map(()=>-1)}
 if(v==='say'||v==='ask')S.opts=(v==='say'?SAY:ASK)[Math.min(r,v==='say'?2:3)][2]}
function won(t){S.won++;S.r++;S.heart=Math.min(4,S.heart+1);A.sound.pop();if(S.won<goal()){setup();tell(t+' Next one.')}else tell(t);controls();A.redraw();S.want()}
function spotTap(b){if(mode()!=='spot'||S.won>=3)return;const id=S.kids[b],[mood]=KID[id];
 if(mood==='happy')return oops(`This child is ${KID[id][3]}. They look fine. Look for a sad face, tears or dropped things.`,b);won(`Yes! This child is ${KID[id][3]}. They need some care.`)}
function give(i,b){if(mode()!=='give'||S.put[i]>=0)return;S.sel=-1;const want=GIVE[Math.min(S.r,1)][1].indexOf(S.cards[i]);
 if(S.put.includes(b))return oops('That child has a kind act already. Try another child.',b);
 if(want!==b)return oops(`Not quite. ${NEED[S.kids[b]]}`,b);S.put[i]=b;A.sound.tick();
 if(S.put.every(x=>x>=0))return won('Every child got the care they need!');tell(`Yes! ${NEED[S.kids[b]]}`);controls();A.redraw()}
function choose(b){const v=mode();if(!(v==='say'||v==='ask')||S.won>=goal())return;const tag=S.opts[b][1];if(tag!=='ok')return oops(WHY[tag],b);won(v==='say'?'Kind words!':'Kind and respectful!')}
function sortTo(bin){if(mode()!=='sort'||S.k>=SORT.length)return;const[t,ans]=SORT[S.k];
 if(bin!==ans){const m={0:'Sharing without being asked is kind: you noticed first.',1:'That hurts someone. It is not kind.',2:'Kindness is for everyone, not only friends.',3:'Fixing it without asking takes it away from them. Ask first.',4:'Telling a grown-up gets the right help. That is kind.',5:'Leaving someone out makes them sad. Ask them to join.'}[S.k];return oops(m,bin)}
 S.k++;A.sound.tick();if(S.k>=SORT.length)return won('All sorted!');tell(`Yes, ${bin?'not kind':'kind'}. Next: ${SORT[S.k][0]}.`);A.redraw()}
function pickCard(){const left=S.cards.map((_,i)=>i).filter(i=>S.put[i]<0);if(!left.length)return;S.sel=left[(left.indexOf(S.sel)+1)%left.length];A.sound.tick();tell(`Picked: ${S.cards[S.sel]}. Now pick a child.`);A.redraw()}
function controls(){if(!ctl)return;ctl.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='quiz'||S.won>=goal())return;
 if(v==='spot')S.kids.forEach((id,b)=>B(`Child ${b+1}`,()=>spotTap(b),`Child ${b+1}: ${KID[id][3]}`));
 if(v==='give'){B('Pick a kind act ▶',pickCard,'Pick the next kind act card');S.kids.forEach((id,b)=>B(KID[id][2],()=>{if(S.sel<0)pickCard();if(S.sel>=0)give(S.sel,b)},`Give the picked act to the child: ${KID[id][3]}`))}
 if(v==='say'||v==='ask')S.opts.forEach((o,b)=>B(o[0],()=>choose(b)));
 if(v==='sort'){B('♥ Kind',()=>sortTo(0),'Put the card in Kind');B('✗ Not kind',()=>sortTo(1),'Put the card in Not kind')}}
/* pointer */
const hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const v=mode();if(S.won>=goal())return false;
 if(v==='spot'){const b=kidBoxes().findIndex(r=>hit(p,r));if(b>=0)spotTap(b);return false}
 if(v==='give'){const i=giveRects().findIndex((r,j)=>S.put[j]<0&&hit(p,r));if(i>=0){S.drag={i,x:null,x0:p.x,y0:p.y};return true}const b=kidBoxes().findIndex(r=>hit(p,r));if(b>=0&&S.sel>=0)give(S.sel,b);return false}
 if(v==='sort'){const w=Math.min(A.W*.6,260);if(hit(p,{x:A.W/2-w/2,y:A.H*.08,w,h:A.H*.3})){S.drag={i:0,x:null,x0:p.x,y0:p.y};return true}const b=sortBins().findIndex(r=>hit(p,r));if(b>=0)sortTo(b);return false}
 const b=optBoxes().findIndex(r=>hit(p,r));if(b>=0)choose(b);return false}
function move(p){if(!S.drag)return;if(S.drag.x!=null||Math.hypot(p.x-S.drag.x0,p.y-S.drag.y0)>8){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;
 if(mode()==='sort'){const b=sortBins().findIndex(r=>hit(p,r));if(b>=0)sortTo(b);return A.redraw()}
 if(d.x==null){S.sel=d.i;A.sound.tick();tell(`Picked: ${S.cards[d.i]}. Now tap a child.`);return A.redraw()}const b=kidBoxes().findIndex(r=>hit(p,r));if(b>=0)give(d.i,b);A.redraw()}
const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},slow()?j*40+30:(j+1)*(gap||300)))}
const fresh=()=>{tok++;Object.assign(S,fresh0());if(A)setup()};
const okAt=()=>S.opts.findIndex(o=>o[1]==='ok');
const steps=[
{h:'Who needs care?',p:'Look at each face and what happened. Tap the child who needs some care.',task:'Spot 3 children',
 show:()=>{steps[0].go();auto(SPOT.map(()=>()=>spotTap(S.kids.findIndex(id=>KID[id][0]!=='happy'))),600)},go:()=>{fresh();tell('Who needs some care?');controls();S.want=when(0,()=>S.won>=3,'Sad faces, tears and dropped things are clues.')}},
{h:'The right kind act',p:'Each child needs something different. Drag each card to the child it helps. Or tap a card, then tap a child.',task:'Help 2 groups',
 show:()=>{steps[1].go();auto([0,1].flatMap(()=>[0,1,2].map(i=>()=>give(i,GIVE[Math.min(S.r,1)][1].indexOf(S.cards[i])))),330)},go:()=>{fresh();tell('Match each kind act to a child.');controls();S.want=when(1,()=>S.won>=2,'Notice what happened, then help in that way.')}},
{h:'Kind words',p:'What could you say? Tap the kind words.',predict:{q:'Your friend is crying. Is "Stop crying" kind?',opts:['Yes, it helps','No, say you see they are sad'],ans:1},task:'Pick kind words 3 times',
 show:()=>{steps[2].go();auto(SAY.map(()=>()=>choose(okAt())),600)},go:()=>{fresh();tell("Mo's tower fell down. What could you say?");controls();S.want=when(2,()=>S.won>=3,'Kind words name the feeling and offer help.')}},
{h:'Ask first',p:'Helping is kind when the person wants help. Ask first. Then listen to what they say.',predict:{q:'Lily is stuck with her zip. Should you just do it for her?',opts:['Yes, right away','No, ask her first'],ans:1},task:'Ask and listen 4 times',
 show:()=>{steps[3].go();auto(ASK.map(()=>()=>choose(okAt())),600)},go:()=>{fresh();tell('Lily is stuck with her zip. What do you do?');controls();S.want=when(3,()=>S.won>=4,'Ask, listen, then help the way they want.')}},
{h:'Kind or not?',p:'Drag each card to Kind or Not kind. Or tap a button.',task:'Sort 6 cards',
 show:()=>{steps[4].go();auto(SORT.map(([,a])=>()=>sortTo(a)),380)},go:()=>{fresh();tell('Kind or not kind? '+SORT[0][0]);controls();S.want=when(4,()=>S.won>=1,'Kind acts are for everyone.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A boy drops his crayons. What is kind?',[['Help pick them up','ok'],['Laugh at him','laugh'],['Keep playing, it is not your job','job']]],
 ['A new girl has no one to play with. Who should be kind to her?',[['Anyone, even if she is not your friend','ok'],['Only her friends','friends'],['No one, she is new','none']]],
 ['Your friend is sad. Which words are kind?',[['"You look sad. Do you want a hug?"','ok'],['"Stop being a baby."','mean'],['"Cheer up now!"','rush']]],
 ['Tom is building. You think you can do it better. What do you do?',[['Ask "Do you want help?"','ok'],['Fix it for him','grab'],['Tell him it is bad','mean']]],
 ['A child falls and hurts her knee. What is kind?',[['Ask if she is OK and get a grown-up','ok'],['Walk past','job'],['Tell her to stop crying','rush']]]];
function because(t){let m='Notice how they feel, then do what helps them.';
 if(t==='laugh')m='Laughing makes them feel worse. Helping shows you care.';if(t==='job')m='Anyone can be kind. You noticed, so you can help or get a grown-up.';
 if(t==='friends')m='Kindness is for everyone, not only friends.';if(t==='none')m='New children often feel shy. A kind word helps a lot.';
 if(t==='mean')m='Those words hurt. Kind words make people feel better.';if(t==='rush')m='Telling them to stop does not help. Say you can see how they feel.';
 if(t==='grab')m='Doing it without asking takes it away from him. Ask first.';return m}
function ask(){ci++;const[q,ops]=QS[ci%QS.length],r=ci%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
let run=0;
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! That is kind.':'✗ '+because(t)}${ok?` In a row: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}});
A.start()})})();
