/* Flagship: comparing design solutions (ages 5-8; NGSS K-2-ETS1-3 "analyze data from tests of two objects designed to
   solve the same problem to compare the strengths and weaknesses of how each performs"). Two foil boats carry
   marbles: load each until it sinks, make the test fair, repeat it and spot the odd result, race them for strengths
   and weaknesses, then recommend one for the job and improve it by changing one thing.
   Not flagfairvar/flagsimtest (fair tests) or flagfloat (floating and sinking). */
(()=>{
VIS.reg('flagdesign',c=>{let A,K,ctl,cq,turn=-1,gen=0;const S={};c.fig.classList.add('young');
const INK='#1c1917',PAPER='#fffbeb',OK='#166534',CUE='#1d4ed8',NO='#9f1239',POND='#7dd3fc',DEEP='#0369a1';
const BOAT={A:{name:'Boat A',cap:12,col:'#fca5a5',wide:1},B:{name:'Boat B',cap:7,col:'#93c5fd',wide:0}};
const FAIR=[['Water','calm','wavy',1,'Now both boats float on calm water.'],['Marbles','small','big',1,'Now both boats get small marbles.'],['Putting in','one by one','all at once',1,'Now both boats get marbles one by one.'],['Colour','red','blue',0]];
const TRY={A:[12,12,11],B:[7,3,7]};
const CARDS=[['Boat A holds 12 marbles',1],['Boat A is slow',0],['Boat B is fast',1],['Boat B holds only 7',0]];
const FIX=[['sail','Add a sail'],['paint','Paint it green'],['small','Make it smaller']];
const at=()=>['load','fair','again','good','pick','chal'][K.step];
const clamp=(v,a,b)=>v<a?a:v>b?b:v,hit=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const narrate=t=>{c.say(t);K.cv.setAttribute('aria-label',t)};
function card(t,x,y,o={}){const g=K.ctx;let fs=o.f||(K.narrow?15:18);for(;;){g.font=`700 ${fs}px system-ui`;if(g.measureText(t).width<=(o.w||K.W)-24||fs<=11)break;fs--}
 const w=Math.max(o.w||0,g.measureText(t).width+22),h=o.h||fs*2,X=clamp(x-w/2,4,K.W-w-4),Y=y-h/2;g.fillStyle=o.bg||PAPER;K.paint.rrect(X,Y,w,h,14);g.fill();
 g.lineWidth=o.edge?3:1.5;g.strokeStyle=o.edge||'#a8a29e';g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,X+w/2,y+1);return{x:X,y:Y,w,h}}
function marble(x,y,r,col){const g=K.ctx;g.fillStyle=col||'#a855f7';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=1.2;g.stroke();g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.arc(x-r*.3,y-r*.3,r*.3,0,7);g.fill()}
/* more marbles, lower boat; past its limit it sinks */
const lake=()=>({top:K.H*.58});
const hullOf=k=>{const n=K.narrow,w=BOAT[k].wide?(n?K.W*.36:K.W*.3):(n?K.W*.2:K.W*.15),h=BOAT[k].wide?K.H*.1:K.H*.2,cx=k==='A'?K.W*.28:K.W*.72;
 const load=S.load[k],cap=BOAT[k].cap,sunk=S.sunk[k],dip=sunk?h*1.4:h*.15+h*.7*Math.min(load,cap)/cap,top=lake().top-h+dip;return{x:cx-w/2,y:top,w,h,cx}};
function drawHull(k){const g=K.ctx,b=hullOf(k),B=BOAT[k];g.fillStyle=B.col;g.strokeStyle=INK;g.lineWidth=2.5;g.beginPath();g.moveTo(b.x,b.y);g.lineTo(b.x+b.w,b.y);g.lineTo(b.x+b.w*.88,b.y+b.h);g.lineTo(b.x+b.w*.12,b.y+b.h);g.closePath();g.fill();g.stroke();
 const n=Math.min(S.load[k],B.cap+1),r=K.narrow?5:6,per=Math.max(1,Math.floor((b.w*.7)/(2*r+1)));for(let i=0;i<n;i++)marble(b.x+b.w*.15+r+(i%per)*(2*r+1),b.y+b.h-r-2-Math.floor(i/per)*(2*r+1),r);if(S.sunk[k]){g.fillStyle='rgba(3,105,161,.45)';g.fillRect(b.x-4,lake().top,b.w+8,b.h*1.6)}}
function pond(){const g=K.ctx,L=lake();g.fillStyle=POND;g.fillRect(0,L.top,K.W,K.H-L.top);g.strokeStyle=DEEP;g.lineWidth=2;g.beginPath();for(let x=0;x<=K.W;x+=20)g.lineTo(x,L.top+Math.sin(x/16)*1.5);g.stroke()}
function drawLoad(){pond();['A','B'].forEach(k=>{drawHull(k);const b=hullOf(k);card(S.sunk[k]?`${BOAT[k].name}: held ${BOAT[k].cap}`:`${BOAT[k].name}: ${S.load[k]}`,b.cx,K.H*.2,{f:K.narrow?14:17,edge:S.sunk[k]?NO:CUE})});
 const P=pile();marble(P.x+P.w/2,P.y+P.h/2,K.narrow?9:11,'#a855f7');card('marbles',P.x+P.w/2,P.y-12,{f:12,bg:'#ede9fe'});if(S.hold)marble(S.hold.x,S.hold.y,K.narrow?7:8);
 card(S.sunk.A&&S.sunk.B?'Both tested: A held 12, B held 7':'Load each boat until it sinks',K.W/2,K.H*.07,{edge:CUE,f:K.narrow?14:17})}
const pile=()=>({x:K.W/2-26,y:K.H*.3,w:52,h:48});
function drop(k){if(S.sunk[k])return say(`${BOAT[k].name} has sunk already. It held ${BOAT[k].cap} marbles.`);S.load[k]++;K.sound.tick();
 if(S.load[k]>BOAT[k].cap){S.sunk[k]=true;K.sound.miss();return say(`Splash! Marble ${S.load[k]} sank ${BOAT[k].name}. So it held ${BOAT[k].cap} marbles.`+(S.sunk.A&&S.sunk.B?' Boat A held more.':''))}
 say(`${BOAT[k].name} has ${S.load[k]} marble${S.load[k]>1?'s':''} and still floats.`)}
/* ---- 2: a fair test changes only the boat ---- */
const rows=()=>{const top=K.H*.22,h=Math.min(K.H*.16,(K.H*.74)/4);return FAIR.map((_,i)=>({x:10,y:top+i*(h+4),w:K.W-20,h}))};
function drawFair(){const g=K.ctx;rows().forEach((r,i)=>{const F=FAIR[i],same=S.same[i];g.fillStyle=same?'#dcfce7':F[3]?'#ffe4e6':'#f5f5f4';K.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=same?OK:F[3]?NO:'#a8a29e';g.lineWidth=2;g.stroke();
 g.fillStyle=INK;g.font=`700 ${K.narrow?11:16}px system-ui`;g.textBaseline='middle';g.textAlign='left';g.fillText(F[0],r.x+10,r.y+r.h/2);g.textAlign='center';
 g.fillText('A: '+F[1],r.x+r.w*.52,r.y+r.h/2);g.fillText('B: '+(same?F[1]:F[2]),r.x+r.w*.82,r.y+r.h/2)});
 const left=FAIR.filter((F,i)=>F[3]&&!S.same[i]).length;card(left?`${left} thing${left>1?'s are':' is'} not the same yet`:'Fair! Only the boat is different',K.W/2,K.H*.08,{edge:left?CUE:OK,f:K.narrow?14:17})}
function evenUp(i){const F=FAIR[i];if(S.same[i])return say(`${F[0]} is the same for both boats now.`);K.sound.tick();
 if(!F[3])return say('Colour does not change how many marbles a boat can hold. You do not need to change it.');
 S.same[i]=true;say(F[4]+(FAIR.every((G,j)=>!G[3]||S.same[j])?' It is a fair test: only the boat is different.':''))}
/* ---- 3: test more than once and spot the odd result ---- */
const slots=()=>{const n=K.narrow,bw=n?K.W*.12:K.W*.08,base=K.H*.86,top=K.H*.24,xs=[.14,.27,.4,.6,.73,.86];return xs.map((f,i)=>{const k=i<3?'A':'B',v=TRY[k][i%3],h=(base-top)*v/13;return{k,i:i%3,v,x:K.W*f-bw/2,y:base-h,w:bw,h}})};
function drawAgain(){const g=K.ctx,base=K.H*.86;g.strokeStyle=K.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(10,base);g.lineTo(K.W-10,base);g.stroke();
 slots().forEach(s=>{const shown=S.runs[s.k]>s.i;if(!shown){g.strokeStyle=K.alpha(K.col.tx,.35);g.setLineDash([5,5]);g.strokeRect(s.x,base-30,s.w,30);g.setLineDash([]);return}
  g.fillStyle=S.odd&&s.v===3?'#fde68a':BOAT[s.k].col;g.fillRect(s.x,s.y,s.w,s.h);g.strokeStyle=S.oddMiss===s.k+s.i?NO:INK;g.lineWidth=S.oddMiss===s.k+s.i?4:2;g.strokeRect(s.x,s.y,s.w,s.h);
  card(String(s.v),s.x+s.w/2,s.y-16,{f:14,h:26})});
 card('Boat A tries',K.W*.27,K.H*.94,{f:K.narrow?12:14,bg:'#fee2e2'});card('Boat B tries',K.W*.73,K.H*.94,{f:K.narrow?12:14,bg:'#dbeafe'});
 card(S.odd?'3 was the odd one out':S.runs.A+S.runs.B<6?'Test each boat 3 times':'Tap the result that does not fit',K.W/2,K.H*.08,{edge:S.odd?OK:CUE,f:K.narrow?14:17})}
function retest(k){if(S.runs[k]>=3)return say(`${BOAT[k].name} has had 3 tries: ${TRY[k].join(', ')}.`);const v=TRY[k][S.runs[k]++];K.sound.tick();
 say(`${BOAT[k].name}, try ${S.runs[k]}: it held ${v} marbles.`+(k==='B'&&v===3?' Hmm, much lower than before. Someone tipped them in all at once.':'')+(S.runs.A+S.runs.B===6?' Now tap the result that does not fit.':''))}
function oddPick(k,i){if(S.runs.A+S.runs.B<6)return say('Finish all 6 tries first.');const v=TRY[k][i];
 if(v===3){S.odd=true;S.oddMiss=null;K.sound.pop();return say('Yes. Boat B held 7, 3, 7. The 3 was a slip in the test, so Boat B usually holds 7. Boat A usually holds 12.')}
 S.oddMiss=k+i;K.sound.miss();say(`${v} fits with the other tries of ${BOAT[k].name}. Look for one that is far from its neighbours.`)}
/* ---- 4: race, then sort strengths and weaknesses ---- */
function drawGood(){const g=K.ctx,lane=K.H*.36;g.fillStyle=POND;g.fillRect(0,K.H*.16,K.W,lane);g.fillStyle=OK;g.fillRect(K.W-24,K.H*.16,8,lane);
 [['A',.27,'#fca5a5'],['B',.4,'#93c5fd']].forEach(([k,f,col])=>{const x=20+(K.W-80)*Math.min(1,S.race*(k==='A'?4/9:1)),y=K.H*(.16+f*.6);g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.ellipse(x+20,y,k==='A'?28:16,10,0,0,7);g.fill();g.stroke();
  g.fillStyle=INK;g.font='700 13px system-ui';g.textAlign='center';g.fillText(k,x+20,y+1)});
 if(S.raced)card('Race: Boat B 4 seconds, Boat A 9 seconds',K.W/2,K.H*.58,{f:K.narrow?13:16,edge:CUE});
 const C=CARDS[S.card];if(S.raced&&C)card(C[0],K.W/2,K.H*.78,{f:K.narrow?16:19,edge:'#7c3aed',bg:'#f5f3ff'});
 card(!S.raced?'Blow the boats across the pond':S.card<4?`Sort card ${S.card+1} of 4`:'Each boat has a strength and a weakness',K.W/2,K.H*.07,{edge:S.card>3?OK:CUE,f:K.narrow?14:17})}
function blow(){if(S.raced)return say('The race is done: Boat B 4 seconds, Boat A 9 seconds.');K.sound.tick();K.tween(S,{race:1},K.reduced()?10:1400,'io',()=>{S.raced=true;say('Boat B, the small cup, wins: 4 seconds. Boat A, the wide tray, takes 9 seconds. Now sort the cards.')})}
function sortCard(good){if(!S.raced)return say('Race the boats first.');const C=CARDS[S.card];if(!C)return say('All 4 cards are sorted.');
 if((good?1:0)===C[1]){S.card++;K.sound.pop();return say(`Yes: "${C[0]}" is a ${good?'strength':'weakness'}.`+(S.card>3?' Boat A holds more, Boat B is faster. Neither is best at everything.':''))}
 K.sound.miss();say(C[1]?`"${C[0]}" helps the job, so it is a strength.`:`"${C[0]}" makes the job harder, so it is a weakness.`)}
/* ---- 5: recommend, then change one thing ---- */
function drawPick(){card('Job: carry 10 marbles across the pond',K.W/2,K.H*.07,{edge:CUE,f:K.narrow?14:17});
 ['A','B'].forEach((k,j)=>{const x=K.W*(j?.72:.28),ok=S.rec===k;card(`${BOAT[k].name}: holds ${BOAT[k].cap}, ${k==='A'?(S.fixed?'5':'9'):'4'} s`,x,K.H*.3,{w:K.narrow?K.W*.46:K.W*.4,h:K.H*.16,f:K.narrow?13:16,edge:ok?OK:S.recMiss===k?NO:null,bg:ok?'#dcfce7':PAPER})});
 if(S.rec==='A')FIX.forEach((F,i)=>card(F[1]+(S.fixed===F[0]?' ✓':''),K.W/2,K.H*(.55+i*.14),{w:K.narrow?K.W*.8:K.W*.5,f:K.narrow?14:16,edge:S.fixed===F[0]?OK:S.fixMiss===F[0]?NO:null}));
 if(S.fixed)card('New race: Boat A takes 5 seconds',K.W/2,K.H*.95,{f:13,edge:OK})}
function recommend(k){K.sound.tick();if(k==='B'){S.recMiss='B';K.sound.miss();return say('Boat B is faster, but it holds only 7. With 10 marbles it would sink. Use the data for the job.')}
 S.rec='A';S.recMiss=null;say('Yes. Only Boat A can hold 10 marbles. Its weakness is speed. Pick one change to make it better.')}
function improve(f){if(S.rec!=='A')return say('First choose the boat for the job.');K.sound.tick();
 if(f==='sail'){S.fixed='sail';S.fixMiss=null;K.sound.pop();return say('Test again: with a sail Boat A crosses in 5 seconds, not 9, and still holds 12. One change, and the data shows it helped.')}
 S.fixMiss=f;K.sound.miss();say(f==='paint'?'Colour does not make a boat faster or stronger. It would still take 9 seconds.':'A smaller boat would hold fewer marbles. Then it could not carry 10.')}
function draw(){const g=K.ctx;g.fillStyle=K.mix(K.col.pn,'#fef3c7',K.col.dark?.04:.3);g.fillRect(0,0,K.W,K.H);const p=at();
 if(p==='chal'){card('Challenge',K.W/2,K.H*.15,{edge:CUE});const Q=QS[turn%QS.length];if(Q)card(Q.pic,K.W/2,K.H*.5,{f:K.narrow?17:21});return}
 ({load:drawLoad,fair:drawFair,again:drawAgain,good:drawGood,pick:drawPick})[p]()}
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{load:{A:0,B:0},sunk:{A:false,B:false},hold:null,same:[false,false,false,false],runs:{A:0,B:0},odd:false,oddMiss:null,
 race:0,raced:false,card:0,rec:null,recMiss:null,fixed:null,fixMiss:null,gate:()=>{}})}
function say(t){narrate(t);K.redraw();buttons();S.gate()}
const finish=(i,test,msg)=>()=>{if(K.step===i&&test()&&(!steps[i].predict||K.pred[i]!=null)&&!K.isDone)K.done(msg+K.reveal(i))};
function begin(i,intro,test,msg,extra){fresh();Object.assign(S,extra||{});narrate(intro);buttons();S.gate=finish(i,test,msg)}
function demo(i,list,gap){steps[i].go();const me=gen;list.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},K.reduced()?25*(j+1):(gap||350)*(j+1)))}
function buttons(){if(!ctl)return;ctl.innerHTML='';const p=at(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(p==='load'){add('Marble in Boat A',()=>drop('A'),'Put a marble in Boat A, the wide tray');add('Marble in Boat B',()=>drop('B'),'Put a marble in Boat B, the tall cup')}
 if(p==='fair')FAIR.forEach((F,i)=>add('Same '+F[0].toLowerCase(),()=>evenUp(i),'Make the '+F[0].toLowerCase()+' the same for both boats'));
 if(p==='again'){add('Test Boat A again',()=>retest('A'));add('Test Boat B again',()=>retest('B'));if(S.runs.A+S.runs.B>5)slots().forEach(s=>add(`${s.k} try ${s.i+1}: ${s.v}`,()=>oddPick(s.k,s.i),`Boat ${s.k} try ${s.i+1}, ${s.v} marbles, does not fit`))}
 if(p==='good'){if(!S.raced)add('Blow!',blow,'Blow both boats across the pond');else{add('Strength',()=>sortCard(true),'This card is a strength');add('Weakness',()=>sortCard(false),'This card is a weakness')}}
 if(p==='pick'){add('Choose Boat A',()=>recommend('A'));add('Choose Boat B',()=>recommend('B'));if(S.rec==='A')FIX.forEach(F=>add(F[1],()=>improve(F[0]),'Change Boat A: '+F[1].toLowerCase()))}}
function down(p){const k=at();
 if(k==='load'){if(hit(p,pile())){S.hold={x:p.x,y:p.y};return true}const b=['A','B'].find(q=>hit(p,hullOf(q)));if(b)drop(b)}
 if(k==='fair'){const i=rows().findIndex(r=>hit(p,r));if(i>=0)evenUp(i)}
 if(k==='again'){const s=slots().find(s=>S.runs[s.k]>s.i&&hit(p,{x:s.x,y:s.y-28,w:s.w,h:s.h+28}));if(s)oddPick(s.k,s.i);else if(S.runs.A+S.runs.B<6)retest(p.x<K.W/2?'A':'B')}
 if(k==='good'){if(!S.raced)blow();else sortCard(p.x<K.W/2)}
 if(k==='pick'){if(p.y<K.H*.42)recommend(p.x<K.W/2?'A':'B');else if(S.rec==='A'){const i=Math.floor((p.y-K.H*.48)/(K.H*.14));if(FIX[i])improve(FIX[i][0])}}return false}
function move(p){if(S.hold){S.hold={x:p.x,y:p.y};K.redraw()}}
function up(p){if(!S.hold)return;S.hold=null;const b=['A','B'].find(q=>hit(p,{...hullOf(q),y:hullOf(q).y-40,h:hullOf(q).h+60}));if(b)drop(b);else say('Drop the marble into a boat.')}
const steps=[
{h:'Which boat holds more?',p:'Both boats must carry marbles across a pond. Drag marbles in, or tap a boat, until each one sinks.',
 predict:{q:'Which boat will hold more marbles?',opts:['the tall cup, B','the wide tray, A','both the same'],ans:1},task:'Test both boats until they sink',
 show:()=>demo(0,[...Array(13)].map(()=>()=>drop('A')).concat([...Array(8)].map(()=>()=>drop('B'))),90),
 go:()=>begin(0,'A pond with two foil boats: a wide tray, Boat A, and a tall cup, Boat B.',()=>S.sunk.A&&S.sunk.B,'The wide tray held 12. The tall cup held 7.')},
{h:'Make it fair',p:'Another class tested the boats in different ways. Make everything the same except the boat.',
 predict:{q:'Boat B was tested in wavy water with big marbles. It sank sooner. Was that fair?',opts:['yes: B is worse','no: the tests were not the same','yes: B is blue'],ans:1},task:'Make the 3 things that matter the same',
 show:()=>demo(1,[()=>evenUp(0),()=>evenUp(1),()=>evenUp(2)],500),
 go:()=>begin(1,'A table of how each boat was tested.',()=>S.same[0]&&S.same[1]&&S.same[2],'Fair test: only the thing you are comparing changes.')},
{h:'Test again',p:'One test can go wrong. Test each boat 3 times. Then tap the result that does not fit.',
 predict:{q:'One test of Boat B gave 3 marbles. Should we trust that one number?',opts:['yes: one test is enough','no: test again to see what usually happens','yes: the lowest one counts'],ans:1},task:'Run 6 tests and find the odd one',
 show:()=>demo(2,[()=>retest('A'),()=>retest('A'),()=>retest('A'),()=>retest('B'),()=>retest('B'),()=>retest('B'),()=>oddPick('B',1)],300),
 go:()=>begin(2,'A bar chart with spaces for 3 tries of each boat.',()=>S.odd,'Repeat tests. A result far from the rest is checked, not trusted.')},
{h:'Good and not so good',p:'Race the boats. Then sort each card: is it a strength or a weakness?',task:'Race, then sort 4 cards',
 show:()=>demo(3,[blow,()=>{},()=>{},()=>{},()=>{},()=>sortCard(true),()=>sortCard(false),()=>sortCard(true),()=>sortCard(false)],400),
 go:()=>begin(3,'Two boats ready to race across the pond.',()=>S.card>3,'Every design has strengths and weaknesses.')},
{h:'Choose and improve',p:'Use the data. Which boat suits the job? Then change one thing to fix its weakness.',task:'Choose a boat and make it better',
 show:()=>demo(4,[()=>recommend('A'),()=>improve('sail')],700),
 go:()=>begin(4,'The job card and the two boats with their results.',()=>S.rec==='A'&&S.fixed==='sail','Choose with evidence. Change one thing, then test again.')},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.gate()});
const QS=[
 {pic:'A: 12   B: 7',q:'Boat A held 12 marbles. Boat B held 7. Which holds more?',ans:'Boat A, by 5',bad:[['Boat B, it is taller','tall'],['Boat A, by 19','add']]},
 {pic:'one test only',q:'A boat sank with 3 marbles once. What should you do?',ans:'test it again a few times',bad:[['say it holds 3','once'],['give up on it','quit']]},
 {pic:'red boat, blue boat',q:'Does the colour of a boat change how many marbles it holds?',ans:'no, colour does not matter here',bad:[['yes, red is stronger','colour'],['yes, blue floats better','colour']]},
 {pic:'calm and wavy',q:'Boat A in calm water, Boat B in waves. Is that a fair test?',ans:'no, the water must be the same',bad:[['yes, both are on water','fair'],['yes, if B wins','win']]},
 {pic:'fast but small',q:'Boat B is fast but holds only 7. You must carry 10. Which boat?',ans:'Boat A: it can hold 10',bad:[['Boat B: it is faster','fast'],['Boat B: I like it best','like']]},
 {pic:'make A faster',q:'You want Boat A to be faster. What is a good next step?',ans:'add a sail, then test again',bad:[['change lots of things at once','many'],['paint it red','colour']]}];
function slip(t){let m='Look at the test data again.';
 if(t==='tall')m='Taller is not always better. Look at the numbers: 12 is more than 7.';
 if(t==='add')m='"How many more" means find the gap: 12 take away 7 is 5. Do not add.';
 if(t==='once')m='One test can go wrong. Test again and see what usually happens.';
 if(t==='quit')m='Do not give up. Test again: a slip in the test can make one result low.';
 if(t==='colour')m='Colour does not change how much a boat can hold or how fast it goes.';
 if(t==='fair')m='Only the boat should be different. Waves are a second change, so the test is not fair.';
 if(t==='win')m='A test is fair because it is the same for both, not because of who wins.';
 if(t==='fast')m='Speed is a strength, but 10 marbles would sink Boat B. Use the data for the job.';
 if(t==='like')m='Choose with evidence, not what you like. The data says only Boat A can carry 10.';
 if(t==='many')m='Change one thing at a time. Then you know which change helped.';
 return m}
function next(){turn++;const Q=QS[turn%QS.length],o=[[Q.ans,'ok'],...Q.bad],r=turn%3,list=o.slice(r).concat(o.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(t,Q.ans)});narrate('Challenge: '+Q.q);K.redraw()}
function mark(t,ans){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),good=t==='ok';if(good)K.win();else K.sound.miss();narrate(good?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(good?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
K=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:Q=>{cq.hidden=Q.step!==5;ctl.hidden=Q.step===5;buttons()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Boat test controls'},w);cq=c.el('div',{class:'fl-chal'},Q.below);fresh();A=Q;A.gest({down,move,up});buttons()}});
K.start()})})();
