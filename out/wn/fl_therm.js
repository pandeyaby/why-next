/* Flagship: temperature and thermometers (ages 5-7). Fool your hand with the three-bowls test, dip a thermometer into
   four cups and watch the red line move, read the scale where the line stops, set the line for a hot, warm, cool or
   cold day, and find that a big bucket is not hotter than a small cup. Big targets; every canvas action has a button. */
(()=>{
const CUPS=[['icy water','🧊',0],['cold milk','🥛',5],['room water','🚰',20],['bath water','🛁',37]];
const READS=[{v:30,o:[[30,'ok'],[40,'tube'],[3,'ten']]},{v:10,o:[[10,'ok'],[40,'tube'],[1,'ten']]},{v:25,o:[[25,'ok'],[20,'under'],[30,'over']]}];
const DAYS=[['a hot day at the beach','🏖️','hot'],['a frosty winter day','❄️','cold'],['a warm spring day','🌷','warm'],['a cool, windy day','🍂','cool']];
const BANDS=[['cold',0,9,'#2563eb'],['cool',10,17,'#0891b2'],['warm',18,25,'#d97706'],['hot',26,40,'#dc2626']];
const word=t=>(BANDS.find(b=>t>=b[1]&&t<=b[2])||BANDS[3])[0];
const PAIR=[['big bucket of cold water','🪣',10],['small cup of warm water','☕',35]];
VIS.reg('flagtherm',c=>{let A,ctl,chal,qn=-1,streak=0;const S={};
const part=()=>['bowls','cups','read','days','big','chal'][A.step];
const beep=k=>A.sound[k](),repaint=()=>A.redraw(),refresh=()=>{repaint();controls()};
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
/* centred text that wraps onto two lines when it is too wide */
function words(t,x,y,px,ink,bold,max){const g=A.ctx,size=Math.round(px*(A.narrow?1:1.15)),room=max||A.W-24;g.font=`${bold||700} ${size}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;
 if(g.measureText(t).width<=room){g.fillText(t,x,y);return}const cut=t.lastIndexOf(' ',Math.ceil(t.length/2)+4);g.fillText(t.slice(0,cut),x,y-size*.62,room);g.fillText(t.slice(cut+1),x,y+size*.62,room)}
function icon(e,x,y,px){const g=A.ctx;g.font=`${Math.round(px)}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(e,x,y)}
function card(r,fill,thick){const g=A.ctx;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fillStyle=fill;g.fill();g.lineWidth=thick||2;g.strokeStyle=A.col.tx;g.stroke()}
const hit=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const red=()=>A.col.dark?'#f87171':'#dc2626';
/* a thermometer: glass tube, round bulb, red liquid up to t, scale 0-40 °C with a mark every 5 and a number every 10 */
function tube(x,top,h,t,scale){const g=A.ctx,C=A.col,w=Math.max(14,h*.075),r=w*1.05,base=top+h-r*1.9,y0=base,y40=top+w*.6,yAt=v=>y0-(v/40)*(y0-y40);
 g.fillStyle=C.dark?'#1e293b':'#f8fafc';A.paint.rrect(x-w/2,top,w,h-r,w/2);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();
 g.fillStyle=red();g.beginPath();g.arc(x,top+h-r,r,0,7);g.fill();g.stroke();const lv=yAt(Math.max(0,Math.min(40,t)));g.fillRect(x-w*.22,lv,w*.44,top+h-r-lv);
 if(scale!==false){g.strokeStyle=C.tx;g.fillStyle=C.tx;g.font=`700 ${A.narrow?12:13}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='middle';
  for(let v=0;v<=40;v+=5){const y=yAt(v),big=v%10===0;g.lineWidth=big?2:1.2;g.beginPath();g.moveTo(x+w/2,y);g.lineTo(x+w/2+(big?12:7),y);g.stroke();if(big)g.fillText(String(v),x+w/2+15,y)}
  g.fillText('°C',x+w/2+15,top-10)}return{x,w,top,h,yAt,lv,tFrom:y=>Math.round((y0-y)/(y0-y40)*40)}}
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.06:.3);g.fillRect(0,0,W,H);
 ({bowls:drawBowls,cups:drawCups,read:drawRead,days:drawDays,big:drawBig,chal:drawChal})[part()](g,W,H,C);A.fx.draw(g)}
/* ---- step 1: three bowls ---- */
const bowlAt=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.52,w,h:A.H*.3}};
const BOWL=[['icy','#3b82f6'],['middle','#94a3b8'],['very warm','#f97316']];
function drawBowls(g,W,H,C){BOWL.forEach((b,i)=>{const r=bowlAt(i);card(r,A.alpha(b[1],C.dark?.3:.22),S.flash===i?4:2);words(b[0],r.x+r.w/2,r.y+r.h*.8,14,C.tx,800,r.w-8)});
 if(S.at!=null){const r=bowlAt(S.at),cold=S.hand==='cold',hot=S.hand==='hot';icon('✋',r.x+r.w/2,r.y+r.h*.32,A.narrow?40:52);if(cold||hot)words(cold?'cold hand':'warm hand',r.x+r.w/2,r.y-14,13,C.tx,800)}
 if(S.meas){const r=bowlAt(1),T=tube(r.x+r.w*.78,H*.12,H*.62,20,false);words('20 °C',T.x,H*.08,15,C.tx,800)}
 const msg=S.meas?'Same water, 20 °C both times.':S.last?`The middle bowl feels ${S.last.toUpperCase()}!`:'Dip your hand in a side bowl, then the middle.';words(msg,W/2,H*.2,16,C.tx,800);
 words(`Felt warm: ${S.felt.warm?'✓':'–'}   Felt cool: ${S.felt.cool?'✓':'–'}`,W/2,H*.92,14,C.tx,700)}
function dipBowl(i){if(part()!=='bowls'||S.meas)return;if(i!==1){S.hand=i?'hot':'cold';S.at=i;S.last=null;beep('tick');tell(i?'Very warm water. Your hand gets warm. Now try the middle bowl.':'Brr! Icy water. Your hand gets cold. Now try the middle bowl.');return refresh()}
 if(!S.hand){S.flash=0;setTimeout(()=>{S.flash=null;repaint()},A.reduced()?10:700);beep('miss');tell('First dip your hand in a side bowl.');return repaint()}
 const felt=S.hand==='cold'?'warm':'cool';S.felt[felt]=1;S.last=felt;S.at=1;S.hand=null;beep('pop');
 tell(felt==='warm'?'The middle bowl feels warm, because your hand was icy.':'The middle bowl feels cool, because your hand was warm.');refresh()}
function measureBowl(){if(part()!=='bowls'||S.meas)return;if(!(S.felt.warm&&S.felt.cool)){beep('miss');tell('Feel the middle bowl twice: once after icy water, once after warm water.');return}
 S.meas=1;beep('pop');tell('The thermometer says 20 °C both times. Your hand was fooled. The thermometer was not.');refresh();S.want()}
/* ---- step 2: dip into cups ---- */
const cupAt=i=>{const w=(A.W-50)/4;return{x:10+i*(w+10),y:A.H*.68,w,h:A.H*.27}};
function drawCups(g,W,H,C){CUPS.forEach((k,i)=>{const r=cupAt(i);card(r,S.seen[i]?A.alpha(C.gr,.22):A.alpha(C.cy,.12));icon(k[1],r.x+r.w/2,r.y+r.h*.42,Math.min(r.h*.42,40));words(k[0],r.x+r.w/2,r.y+r.h*.84,12,C.tx,800,r.w-6)});
 tube(S.px,S.py,H*.5,S.t);words(`${Math.round(S.t)} °C`,S.px-44,S.py+H*.2,15,C.tx,800);
 const n=S.seen.filter(Boolean).length;words(n>=4?'Hotter: the line goes up. Colder: it goes down.':'Drag the thermometer into a cup, or tap a cup.',W/2,H*.06,15,C.tx,800)}
function home(){S.px=A.W*.5;S.py=A.H*.16}
function dipCup(i){if(part()!=='cups')return;const r=cupAt(i),k=CUPS[i];S.in=i;S.px=r.x+r.w/2;S.py=r.y+r.h*.55-A.H*.5;S.seen[i]=1;
 A.tween(S,{t:k[2]},A.reduced()?1:900,'out');beep(k[2]>S.t?'step':'tick');tell(`In ${k[0]} the red line ${k[2]>=S.t?'goes up':'goes down'} to ${k[2]} °C.`);refresh();S.want()}
/* ---- step 3: read the scale ---- */
const pick=i=>{const n=3,w=A.narrow?(A.W-40)/3:A.W*.22,h=Math.min(A.H*.16,70);return A.narrow?{x:10+i*(w+10),y:A.H*.8,w,h}:{x:A.W*.62,y:A.H*.14+i*(h+14),w,h}};
function drawRead(g,W,H,C){if(S.r>=READS.length){words('Read where the red line stops.',W/2,H*.45,17,C.tx,800);return}
 const R=READS[S.r],x=A.narrow?W*.42:W*.3;tube(x,H*.06,A.narrow?H*.7:H*.86,R.v);
 R.o.forEach(([v],i)=>{const b=pick(i);card(b,S.miss===i?A.alpha(C.rd,.22):S.ok&&i===0?A.alpha(C.gr,.25):A.alpha(C.vi,.12));words(`${v} °C`,b.x+b.w/2,b.y+b.h/2,20,C.tx,800)});
 if(!A.narrow)words(S.ok?'Yes!':'What does it say?',W*.62+W*.11,H*.07,15,C.tx,800)}
function readSlip(t,R){if(t==='tube')return'That is the top of the glass tube. Read where the red line stops.';if(t==='ten')return`Look at the numbers on the scale. The line is at ${R.v}, so it is ${R.v} °C.`;
 if(t==='under')return'The line is past 20. It stops half way to 30, at 25.';return'The line does not reach 30. It stops half way between 20 and 30, at 25.'}
function answerRead(i){if(part()!=='read'||S.ok||S.r>=READS.length)return;const R=READS[S.r],[v,t]=R.o[i];
 if(t==='ok'){S.ok=1;beep('pop');tell(`Yes! The red line stops at ${v}. It is ${v} °C.`)}else{S.miss=i;setTimeout(()=>{S.miss=null;repaint()},A.reduced()?10:800);beep('miss');tell(readSlip(t,R))}refresh()}
/* ---- step 4: set the line for a kind of day ---- */
function drawDays(g,W,H,C){if(S.r>=DAYS.length){words('Cold, cool, warm, hot: the number tells you which.',W/2,H*.45,16,C.tx,800);return}
 const D=DAYS[S.r],x=W*.36,T=tube(x,H*.1,H*.84,S.t);S.T=T;
 BANDS.forEach(b=>{const y1=T.yAt(b[1]-.5<0?0:b[1]-.5),y2=T.yAt(Math.min(40,b[2]+.5));g.fillStyle=A.alpha(b[3],C.dark?.35:.18);g.fillRect(x-T.w/2-74,y2,58,y1-y2);words(b[0],x-T.w/2-45,(y1+y2)/2,12,C.tx,800)});
 icon(D[1],W*.78,H*.3,A.narrow?44:58);words(D[0],W*.78,H*.48,13,C.tx,800,W*.4);words(`${S.t} °C`,W*.78,H*.62,22,S.good?C.gr:C.tx,800);
 words(S.good?'Just right!':'Drag the red line',W*.78,H*.76,13,C.tx,700,W*.4)}
function setLine(t){if(part()!=='days'||S.good||S.r>=DAYS.length)return;S.t=Math.max(0,Math.min(40,t));repaint()}
function nudge(d){setLine(S.t+d);beep('tick');tell(`The line is at ${S.t} °C.`);controls()}
function checkDay(){if(part()!=='days'||S.good||S.r>=DAYS.length)return;const want=DAYS[S.r][2],got=word(S.t);
 if(got===want){S.good=1;beep('pop');tell(`Yes! ${S.t} °C is ${want}. That fits ${DAYS[S.r][0]}.`)}
 else{const up=BANDS.findIndex(b=>b[0]===want)>BANDS.findIndex(b=>b[0]===got);beep('miss');tell(`${S.t} °C is ${got}, not ${want}. ${up?'Move the line up: more degrees is hotter.':'Move the line down: fewer degrees is colder.'}`)}refresh()}
/* ---- step 5: big is not hotter ---- */
const potAt=i=>{const w=(A.W-36)/2;return{x:12+i*(w+12),y:A.H*.36,w,h:A.H*.5}};
function drawBig(g,W,H,C){PAIR.forEach((k,i)=>{const r=potAt(i);card(r,S.bad===i?A.alpha(C.rd,.22):S.won&&i===1?A.alpha(C.gr,.25):A.alpha(C.cy,.1));icon(k[1],r.x+r.w*(S.m[i]?.32:.5),r.y+r.h*.42,i?r.h*.3:r.h*.55);
  words(k[0],r.x+r.w/2,r.y+r.h*.88,12,C.tx,800,r.w-10);if(S.m[i]){tube(r.x+r.w*.72,r.y+r.h*.06,r.h*.7,k[2],false);words(`${k[2]} °C`,r.x+r.w*.72,r.y-12,15,C.tx,800)}});
 words(S.won?'The small cup is hotter: 35 is more than 10.':S.m[0]&&S.m[1]?'Now tap the hotter one.':'Tap each one to measure it.',W/2,H*.12,15,C.tx,800)}
function tapPot(i){if(part()!=='big'||S.won)return;if(!(S.m[0]&&S.m[1])){if(!S.m[i]){S.m[i]=1;beep('tick');tell(`The ${PAIR[i][0]} is ${PAIR[i][2]} °C.`)}return refresh()}
 if(i===1){S.won=1;beep('pop');tell('Yes! 35 °C is hotter than 10 °C. Big does not mean hot.');refresh();return S.want()}
 S.bad=0;setTimeout(()=>{S.bad=null;repaint()},A.reduced()?10:800);beep('miss');tell('The bucket is bigger, but 10 °C is colder than 35 °C. Hotter means a bigger number, not a bigger pot.');repaint()}
function drawChal(g,W,H,C){tube(W*.2,H*.08,H*.84,S.cv||25);words('Bigger number, hotter.',W*.66,H*.4,16,C.tx,800,W*.55);words('Read where the red line stops.',W*.66,H*.56,13,C.tx,700,W*.55)}
/* ---- controls (button twin for every canvas action) ---- */
function onward(){const v=part();if(v==='read'&&S.ok){S.r++;S.ok=0;beep('step');if(S.r<READS.length)tell('Next thermometer. What does it say?');refresh();return S.want()}
 if(v==='days'&&S.good){S.r++;S.good=0;S.t=20;beep('step');if(S.r<DAYS.length)tell(`Now show ${DAYS[S.r][0]}.`);refresh();return S.want()}}
function controls(){if(!ctl)return;ctl.innerHTML='';const v=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t).onclick=f};
 if(v==='bowls'&&!S.meas){b('Icy bowl',()=>dipBowl(0));b('Middle bowl',()=>dipBowl(1));b('Very warm bowl',()=>dipBowl(2));b('Use the thermometer',measureBowl)}
 if(v==='cups')CUPS.forEach((k,i)=>b(`Dip in ${k[0]}`,()=>dipCup(i)));
 if(v==='read'&&S.r<READS.length){if(S.ok)b(S.r<READS.length-1?'Next one':'Finish',onward);else READS[S.r].o.forEach(([n],i)=>b(`${n} °C`,()=>answerRead(i),`It says ${n} degrees`))}
 if(v==='days'&&S.r<DAYS.length){if(S.good)b(S.r<DAYS.length-1?'Next day':'Finish',onward);else{b('Warmer ▲',()=>nudge(1),'Make it 1 degree warmer');b('Cooler ▼',()=>nudge(-1),'Make it 1 degree cooler');b('+5 ▲',()=>nudge(5),'Make it 5 degrees warmer');b('−5 ▼',()=>nudge(-5),'Make it 5 degrees cooler');b('Check',checkDay)}}
 if(v==='big'&&!S.won)PAIR.forEach((k,i)=>b(S.m[0]&&S.m[1]?`The ${k[0]} is hotter`:`Measure the ${k[0]}`,()=>tapPot(i)))}
function down(p){const v=part();if(v==='bowls')[0,1,2].forEach(i=>{if(hit(p,bowlAt(i)))dipBowl(i)});
 if(v==='cups'){const i=CUPS.findIndex((_,j)=>hit(p,cupAt(j)));if(i>=0){dipCup(i);return false}if(Math.abs(p.x-S.px)<40&&p.y>S.py-20&&p.y<S.py+A.H*.5+10){S.drag=1;return true}}
 if(v==='read'){if(S.ok)onward();else[0,1,2].forEach(i=>{if(hit(p,pick(i)))answerRead(i)})}
 if(v==='days'&&S.T&&!S.good&&Math.abs(p.x-S.T.x)<50){S.drag=1;setLine(S.T.tFrom(p.y));return true}
 if(v==='days'&&S.good)onward();
 if(v==='big')[0,1].forEach(i=>{if(hit(p,potAt(i)))tapPot(i)});return false}
function move(p){if(!S.drag)return;if(part()==='days'&&S.T)return setLine(S.T.tFrom(p.y));if(part()==='cups'){S.px=p.x;S.py=p.y-A.H*.25;if(S.in!=null){S.in=null;A.tween(S,{t:20},A.reduced()?1:700,'out')}repaint()}}
function up(p){if(!S.drag)return;S.drag=0;if(part()==='cups'){const i=CUPS.findIndex((_,j)=>hit({x:S.px,y:S.py+A.H*.5},cupAt(j)));if(i>=0)dipCup(i);else{home();tell('In the air of the room it reads about 20 °C.')}}
 if(part()==='days'){tell(`The line is at ${S.t} °C.`);controls()}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(n,acts){steps[n].go();const k=++S.k;acts.forEach((f,j)=>setTimeout(()=>{if(k===S.k)f()},A.reduced()?30*(j+1):(j+1)*320))}
function fresh(){const k=(S.k||0)+1;for(const x in S)delete S[x];Object.assign(S,{k,want:()=>{},felt:{},seen:[],m:[],r:0,ok:0,good:0,t:20,px:A?A.W*.5:0,py:A?A.H*.12:0,drag:0})}
const steps=[
{h:'Feel or measure?',p:'Temperature is how hot or cold something is. Your hand can feel it, but your hand can be fooled. Try it.',
 predict:{q:'Your hand was in icy water. Now you dip it in the middle bowl. How will the middle bowl feel?',opts:['Warm','Cold','You can not tell'],ans:0},task:'Fool your hand, then measure',
 show:()=>demo(0,[()=>dipBowl(0),()=>dipBowl(1),()=>dipBowl(2),()=>dipBowl(1),measureBowl]),
 go:()=>{fresh();tell('Dip your hand in a side bowl, then the middle.');controls();S.want=ready(0,()=>S.meas,'The same water felt warm and then cool. A thermometer gave 20 °C both times.')}},
{h:'The red line',p:'A thermometer measures temperature. When it gets hotter, the red line goes up. When it gets colder, the line goes down.',
 predict:{q:'The thermometer goes from icy water into warm bath water. What will the red line do?',opts:['Go up','Go down','Stay the same'],ans:0},task:'Dip it in all 4 cups',
 show:()=>demo(1,CUPS.map((_,i)=>()=>dipCup(i))),
 go:()=>{fresh();home();tell('Drag the thermometer into a cup, or tap a cup.');controls();S.want=ready(1,()=>S.seen.filter(Boolean).length>=4,'Hotter makes the line go up. Colder makes it go down.')}},
{h:'Read it',p:'Find where the red line stops. Read the number on the scale next to it. We say degrees Celsius, written °C.',
 predict:{q:'Where do you read a thermometer?',opts:['At the top of the glass tube','Where the red line stops','At the round bulb'],ans:1},task:'Read 3 thermometers',
 show:()=>demo(2,READS.flatMap(()=>[()=>answerRead(0),onward])),
 go:()=>{fresh();tell('What does the thermometer say?');controls();S.want=ready(2,()=>S.r>=READS.length,'Read the number where the red line stops.')}},
{h:'Hot, warm, cool, cold',p:'We use words for how warm the air feels. Under 10 °C is cold. 10 to 17 is cool. 18 to 25 is warm. Over 25 is hot.',task:'Set the line for 4 days',
 show:()=>demo(3,DAYS.flatMap(d=>{const b=BANDS.find(x=>x[0]===d[2]);return[()=>{S.t=Math.round((b[1]+b[2])/2);repaint()},checkDay,onward]})),
 go:()=>{fresh();tell(`Drag the red line to show ${DAYS[0][0]}.`);controls();S.want=ready(3,()=>S.r>=DAYS.length,'More degrees is hotter. Fewer degrees is colder.')}},
{h:'Big or hot?',p:'A big pot of water is not always hotter. Measure, then look at the numbers.',
 predict:{q:'Which is hotter: a big bucket of cold water or a small cup of warm water?',opts:['The big bucket','The small cup','They are the same'],ans:1},task:'Measure both, tap the hotter one',
 show:()=>demo(4,[()=>tapPot(0),()=>tapPot(1),()=>tapPot(1)]),
 go:()=>{fresh();tell('Tap each one to measure it.');controls();S.want=ready(4,()=>S.won,'Hotter means a bigger number of degrees, not a bigger pot.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['What do we use to measure how hot something is?',[['A thermometer','ok'],['A ruler','ruler'],['A clock','clock']],20],
 ['The red line goes up. The water is getting…',[['Hotter','ok'],['Colder','colder'],['Bigger','bigger']],30],
 ['Which is hotter?',[['30 °C','ok'],['20 °C','lessnum'],['They feel the same, so the same','same']],30],
 ['The thermometer says 3 °C. What is the day like?',[['Cold','ok'],['Hot','hot'],['Warm','warm']],3],
 ['Where do you read a thermometer?',[['Where the red line stops','ok'],['At the top of the tube','tube'],['At the bulb','bulb']],15],
 ['Your hand was in icy water. Now a bowl feels warm. What should you do?',[['Check with a thermometer','ok'],['Trust my hand','hand'],['Say it is cold','guess']],20],
 ['A big pool and a small cup are both 25 °C. Which is hotter?',[['Neither: both are 25 °C','ok'],['The big pool','bigpool'],['The small cup','smallcup']],25]];
function slip(t){let m='Temperature is how hot or cold something is, and a thermometer measures it.';
 if(t==='ruler')m='A ruler measures how long something is. A thermometer measures how hot it is.';
 if(t==='clock')m='A clock tells the time. A thermometer tells the temperature.';
 if(t==='colder')m='Up means hotter. When it gets colder, the red line goes down.';
 if(t==='bigger')m='The water is not growing. The line goes up because the water is getting hotter.';
 if(t==='lessnum')m='20 is less than 30. More degrees means hotter, so 30 °C is hotter.';
 if(t==='same')m='Hands can be fooled. The numbers are different: 30 °C is hotter than 20 °C.';
 if(t==='hot')m='3 °C is under 10, so it is cold. Hot days are over 25 °C.';
 if(t==='warm')m='3 °C is under 10, so it is cold. Warm is about 18 to 25 °C.';
 if(t==='tube')m='The tube top is always the same. Read where the red line stops.';
 if(t==='bulb')m='The bulb holds the red liquid. Read the scale where the line stops.';
 if(t==='hand')m='Your hand was icy, so the bowl feels warm. A thermometer is not fooled.';
 if(t==='guess')m='Do not guess. A thermometer tells you the real temperature.';
 if(t==='bigpool')m='Big does not mean hotter. Both say 25 °C, so they are just as hot.';
 if(t==='smallcup')m='Small does not mean hotter. Both say 25 °C, so they are just as hot.';
 return m}
function quiz(){qn++;const[q,ops,v]=QS[qn%QS.length],turn=(qn*2+1)%3;S.cv=v;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');[...ops.slice(turn),...ops.slice(0,turn)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});tell('Challenge: '+q);repaint()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;beep('miss')}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw:paint,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}});
A.start()})})();
