/* Flagship: light travels in straight lines (ages 10-11; NC Y6 Light "recognise that light appears to travel in
   straight lines", "use the idea that light travels in straight lines to explain that objects are seen because they
   give out or reflect light into the eye" and "...to explain why shadows have the same shape as the objects that cast
   them"). Line up three holed cards, build the ray path that lets you see a book, watch straight rays draw a shadow's
   outline, slide a card to grow and shrink its shadow, then use rays to predict where a shadow's edge will fall.
   Not flagshadow (light sources and shadows, ages 4-5) or flagshine (reflection from surfaces). */
(()=>{
VIS.reg('flagray',c=>{let A,keys,ask,ix=-1,ver=0;const K={};
const INK='#0f172a',PAPER='#fefce8',BEAM='#facc15',HIT='#047857',MISS='#b91c1c',WALL='#475569';
const part=()=>['holes','see','shape','size','guess','chal'][A.step];
const cap=(v,a,b)=>Math.max(a,Math.min(b,v));
function narrate(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function chip(t,x,y,line,fs){const g=A.ctx;fs=fs||(A.narrow?12:14);g.font=`700 ${fs}px system-ui`;let w=g.measureText(t).width+16;
 while(w>A.W-8&&fs>9){fs--;g.font=`700 ${fs}px system-ui`;w=g.measureText(t).width+16}const h=fs+12,x0=cap(x-w/2,4,A.W-w-4);
 g.fillStyle=PAPER;A.paint.rrect(x0,y-h/2,w,h,8);g.fill();g.lineWidth=line?2.5:1;g.strokeStyle=line||'#78716c';g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function bg(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#e2e8f0';g.fillRect(0,0,A.W,A.H)}
function torch(x,y,on){const g=A.ctx,s=A.H*.05;g.fillStyle='#334155';A.paint.rrect(x-s*1.6,y-s*.6,s*1.6,s*1.2,4);g.fill();g.fillStyle=on?BEAM:'#94a3b8';g.beginPath();g.moveTo(x,y-s*.9);g.lineTo(x,y+s*.9);g.lineTo(x-s*.4,y+s*.6);g.lineTo(x-s*.4,y-s*.6);g.closePath();g.fill()}
function ray(x0,y0,x1,y1,w,col){const g=A.ctx;g.strokeStyle=col||BEAM;g.lineWidth=w||3;g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();
 const a=Math.atan2(y1-y0,x1-x0),mx=(x0+x1)/2,my=(y0+y1)/2;g.fillStyle=col||BEAM;g.beginPath();g.moveTo(mx+9*Math.cos(a),my+9*Math.sin(a));g.lineTo(mx-7*Math.cos(a-.6),my-7*Math.sin(a-.6));g.lineTo(mx-7*Math.cos(a+.6),my-7*Math.sin(a+.6));g.closePath();g.fill()}
function eye(x,y,lit){const g=A.ctx,r=A.H*.045;g.fillStyle='#fff';g.beginPath();g.ellipse(x,y,r*1.3,r*.8,0,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();g.fillStyle=lit?HIT:'#1e293b';g.beginPath();g.arc(x-r*.3,y,r*.45,0,7);g.fill()}
/* ---- 0: three cards with holes ---- */
const MID=()=>A.H*.5,CX=[.34,.52,.7];
function drawHoles(){bg();const g=A.ctx,y=MID(),tx=A.W*.1,ex=A.W*.9,lined=Math.abs(K.off)<6,ch=A.H*.5;torch(tx,y,1);
 CX.forEach((f,i)=>{const x=A.W*f,o=i===1?K.off:0;g.fillStyle=A.col.dark?'#94a3b8':WALL;g.fillRect(x-5,y-ch/2+o,10,ch/2-9);g.fillRect(x-5,y+9+o,10,ch/2-9);if(i===1){g.fillStyle='#60a5fa';g.beginPath();g.arc(x,y-ch/2+o-12,A.narrow?13:11,0,7);g.fill()}});
 const stop=lined?ex-A.H*.06:A.W*CX[1]-6;ray(tx,y,stop,y,4);if(!lined){g.fillStyle=BEAM;g.beginPath();g.arc(stop,y,7,0,7);g.fill()}eye(ex,y,lined);
 chip(lined?'All three holes in a line: light reaches the eye':'Middle hole off the line: light is blocked',A.W/2,A.H*.08,lined?HIT:MISS)}
function shift(o,quiet){K.off=cap(Math.round(o),-A.H*.2,A.H*.2);if(Math.abs(K.off)<6)K.off=0;if(K.off)K.moved=1;if(quiet)return A.redraw();A.sound.tick();
 tell(K.off===0?'The holes are in a straight line, so the light goes through all three and into the eye.':'The middle hole is off the line. Light cannot bend round to find it, so the card blocks it.')}
/* ---- 1: how we see ---- */
const SPOT={lamp:[.16,.32],book:[.45,.78],eye:[.85,.4]},NAMES={lamp:'lamp',book:'book',eye:'eye'};
function drawSee(){bg();const g=A.ctx,P=k=>({x:A.W*SPOT[k][0],y:A.H*SPOT[k][1]});const L=P('lamp'),B=P('book'),E=P('eye');
 g.fillStyle=BEAM;g.beginPath();g.arc(L.x,L.y,A.H*.06,0,7);g.fill();g.fillStyle='#be123c';g.fillRect(B.x-A.H*.08,B.y-A.H*.05,A.H*.16,A.H*.1);eye(E.x,E.y,K.got.size>1);
 for(let i=1;i<K.path.length;i++){const a=P(K.path[i-1]),b=P(K.path[i]);ray(a.x,a.y,b.x,b.y,3,K.bad?MISS:BEAM)}
 Object.keys(SPOT).forEach(k=>chip(NAMES[k],P(k).x,P(k).y+(k==='book'?A.H*.11:-A.H*.11),K.path.includes(k)?HIT:0,A.narrow?11:13));
 chip(`Paths built: ${K.got.size} of 2${K.got.has('book')?' · see the book ✓':''}${K.got.has('lamp')?' · see the lamp ✓':''}`,A.W/2,A.H*.06,K.got.size>1?HIT:0,A.narrow?10:12)}
function hop(k){if(K.bad||K.fin){K.path=[];K.bad=0;K.fin=0}
 if(!K.path.length&&k==='eye'){K.bad=1;K.path=['eye'];A.sound.miss();return tell('Light does not come out of your eyes. A ray starts at a light source.')}
 if(!K.path.length&&k==='book'){K.bad=1;K.path=['book'];A.sound.miss();return tell('The book makes no light of its own. Start the ray at the lamp.')}
 if(K.path.includes(k))return tell('That point is already on the path.');K.path.push(k);A.sound.tick();const s=K.path.join('>');
 if(s==='lamp>book>eye'){K.got.add('book');K.fin=1;A.sound.pop();return tell('Light travels from the lamp to the book, bounces off, and travels in a straight line into the eye. That is how you see the book.')}
 if(s==='lamp>eye'){K.got.add('lamp');K.fin=1;A.sound.pop();return tell('The lamp is a light source, so its light comes straight into the eye. Now build the path that lets you see the book.')}
 if(s==='lamp>eye>book'){K.bad=1;A.sound.miss();return tell('Light that enters the eye stops there. To see the book, light must go to the book first.')}
 tell(k==='lamp'?'Light leaves the lamp in straight lines. Where does it go next?':'Keep going: where does the light travel next?')}
function clear(){K.path=[];K.bad=0;K.fin=0;A.sound.tick();tell('Path cleared.')}
/* ---- 2: shadow outlines ---- */
const OUT=[['star',k=>Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,r=i%2?.42:1;return[r*Math.cos(a),r*Math.sin(a)]})],
 ['house',()=>[[-.8,1],[.8,1],[.8,-.1],[0,-1],[-.8,-.1]]],['rabbit',()=>[[-.7,1],[.7,1],[.7,.1],[.35,.1],[.55,-1],[.2,-1],[.05,.05],[-.15,.05],[-.3,-1],[-.65,-1],[-.4,.1],[-.7,.1]]]];
function sil(pts,x,y,s,fill){const g=A.ctx;g.beginPath();pts.forEach(([u,v],i)=>i?g.lineTo(x+u*s,y+v*s):g.moveTo(x+u*s,y+v*s));g.closePath();g.fillStyle=fill;g.fill()}
function drawShape(){bg();const g=A.ctx,y=MID(),tx=A.W*.08,ox=A.W*.36,sx=A.W*.6,o=OUT[K.sh%3],pts=o[1](),s=A.H*.09,k=(sx-tx)/(ox-tx);torch(tx,y,1);
 const top=Math.min(...pts.map(p=>p[1])),bot=Math.max(...pts.map(p=>p[1]));[top,bot].forEach(v=>{ray(tx,y,sx,y+(v*s)*k,2);});
 g.fillStyle=A.col.dark?'#cbd5e1':'#f8fafc';g.fillRect(sx,A.H*.12,A.W*.38,A.H*.78);g.strokeStyle=WALL;g.lineWidth=2;g.strokeRect(sx,A.H*.12,A.W*.38,A.H*.78);
 sil(pts,sx+A.W*.19,y,s*k,'#1e293b');g.fillStyle='#b45309';g.fillRect(ox-3,y+top*s,6,(bot-top)*s);sil(pts,ox-A.W*.13,A.H*.26,A.H*.06,'#b45309');chip('card',ox-A.W*.13,A.H*.38,0,11);
 chip(`Card: ${o[0]} · shadow: ${o[0]}`,A.W/2,A.H*.06,K.tried.size>2?HIT:0,A.narrow?11:13);chip('screen',sx+A.W*.19,A.H*.95,0,11);chip(`Shapes tried: ${K.tried.size} of 3`,A.W*.25,A.H*.95,0,11)}
function next(){K.sh++;K.tried.add(K.sh%3);A.sound.tick();const n=OUT[K.sh%3][0];
 tell(`A ${n} card makes a ${n}-shaped shadow. Straight rays that just miss its edges mark the outline on the screen; rays that hit the card are blocked.`)}
/* ---- 3: bigger or smaller ---- */
const TX=()=>A.W*.08,SX=()=>A.W*.9,CARD=()=>A.H*.16;
const tall=x=>CARD()*(SX()-TX())/(x-TX());
function drawSize(){bg();const g=A.ctx,y=MID(),x=A.W*K.cx,h=tall(x),c0=CARD();torch(TX(),y,1);ray(TX(),y,SX(),y-h/2,2);ray(TX(),y,SX(),y+h/2,2);
 g.fillStyle=A.col.dark?'#cbd5e1':'#f8fafc';g.fillRect(SX(),A.H*.04,A.W*.06,A.H*.92);g.fillStyle='#1e293b';g.fillRect(SX(),y-Math.min(h,A.H*.9)/2,A.W*.06,Math.min(h,A.H*.9));
 g.fillStyle='#b45309';g.fillRect(x-4,y-c0/2,8,c0);g.fillStyle='#60a5fa';g.beginPath();g.arc(x,y+c0/2+18,A.narrow?13:11,0,7);g.fill();
 chip(`Shadow ${(h/c0).toFixed(1)}× as tall as the card`,A.W*.45,A.H*.08,0);chip(`${K.big?'✓':'○'} twice as tall · ${K.near?'✓':'○'} nearly the same`,A.W*.45,A.H*.93,K.big&&K.near?HIT:0,A.narrow?10:12)}
function slide(f,quiet){K.cx=cap(f,.2,.84);const r=tall(A.W*K.cx)/CARD();if(r>=2)K.big=1;if(r<=1.25)K.near=1;if(quiet)return A.redraw();A.sound.tick();
 tell(`The shadow is ${r.toFixed(1)} times as tall as the card. `+(r>=2?'Close to the torch, the card blocks a wide fan of rays, so the shadow is big.':r<=1.25?'Close to the screen, the rays have little room to spread, so the shadow is nearly card-sized.':'Move it closer to the torch or to the screen.'))}
/* ---- 4: predict the edge ---- */
const QX=[.3,.55,.4];
function drawGuess(){bg();const g=A.ctx,y=MID(),x=A.W*QX[K.q%3],h=tall(x),c0=CARD();torch(TX(),y,K.lit);g.fillStyle=A.col.dark?'#cbd5e1':'#f8fafc';g.fillRect(SX(),A.H*.04,A.W*.06,A.H*.92);
 g.fillStyle='#b45309';g.fillRect(x-4,y-c0/2,8,c0);if(K.lit){ray(TX(),y,SX(),y-h/2,2);ray(TX(),y,SX(),y+h/2,2);g.fillStyle='#1e293b';g.fillRect(SX(),y-h/2,A.W*.06,h)}
 const my=y-K.mark;g.strokeStyle=MISS;g.lineWidth=3;g.beginPath();g.moveTo(SX()-14,my);g.lineTo(SX()+A.W*.06,my);g.stroke();g.fillStyle=MISS;g.beginPath();g.arc(SX()-16,my,A.narrow?12:10,0,7);g.fill();
 chip(K.lit?`Top edge at ${Math.round(h/2)} · you marked ${Math.round(K.mark)}`:'Mark where the top of the shadow will be',A.W*.45,A.H*.07,K.lit?(K.okNow?HIT:MISS):0,A.narrow?11:13);chip(`Good predictions: ${K.good} of 2`,A.W*.45,A.H*.94,K.good>1?HIT:0,11)}
function mark(v,quiet){K.lit=0;K.mark=cap(v,4,A.H*.46);if(quiet)return A.redraw();A.sound.tick();tell('Marked. Picture a straight line from the torch past the top of the card.')}
function aim(){const x=A.W*QX[K.q%3];return tall(x)/2}
function light(){if(K.lit){K.q++;K.lit=0;K.mark=A.H*.15;return tell('A new card position. Mark the top edge, then switch on.')}K.lit=1;const t=aim(),off=Math.abs(K.mark-t)/t;K.okNow=off<=.12;
 if(K.okNow){K.good++;A.sound.pop()}else A.sound.miss();tell(K.okNow?'Spot on. The straight ray past the top of the card lands where you marked.':K.mark<t?'Too low. The rays keep spreading in straight lines all the way to the screen, so the shadow is taller.':'Too high. Follow the straight line from the torch through the top of the card.')}
function draw(){const k=part();if(k==='chal'){bg();torch(A.W*.2,MID(),1);ray(A.W*.2,MID(),A.W*.8,MID(),4);chip('Challenge',A.W/2,A.H*.1,HIT);return}
 ({holes:drawHoles,see:drawSee,shape:drawShape,size:drawSize,guess:drawGuess})[k]()}
function down(p){const k=part();
 if(k==='holes'&&Math.abs(p.x-A.W*CX[1])<36){K.hold=1;K.dy=p.y-K.off;return true}
 if(k==='see'){const hit=Object.keys(SPOT).find(n=>Math.hypot(p.x-A.W*SPOT[n][0],p.y-A.H*SPOT[n][1])<A.H*.12);if(hit)hop(hit);return false}
 if(k==='shape'){next();return false}
 if(k==='size'&&Math.abs(p.x-A.W*K.cx)<40){K.hold=1;return true}
 if(k==='guess'&&p.x>SX()-50){K.hold=1;mark(MID()-p.y,true);return true}return false}
function move(p){if(!K.hold)return;const k=part();if(k==='holes')shift(p.y-K.dy,true);if(k==='size')slide(p.x/A.W,true);if(k==='guess')mark(MID()-p.y,true)}
function up(){if(!K.hold)return;K.hold=0;const k=part();if(k==='holes')shift(K.off);if(k==='size')slide(K.cx);if(k==='guess')mark(K.mark)}
function blank(){ver++;for(const k in K)delete K[k];Object.assign(K,{off:A.H*.12,moved:1,path:[],bad:0,fin:0,got:new Set(),sh:0,tried:new Set([0]),cx:.5,big:0,near:0,q:0,lit:0,mark:A.H*.15,good:0,okNow:0,hold:0,test:()=>{}})}
function tell(t){narrate(t);A.redraw();pad();K.test()}
const fin=(i,f,msg)=>()=>{if(A.step===i&&f()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function setUp(i,intro,f,msg){blank();narrate(intro);pad();K.test=fin(i,f,msg)}
function run(i,acts,ms){steps[i].go();const v=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v===ver)f()},(ms||500)*(j+1)))}
function pad(){if(!keys)return;keys.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='holes'){B('Middle card up',()=>shift(K.off+A.H*.06),'Move the middle card up');B('Middle card down',()=>shift(K.off-A.H*.06),'Move the middle card down');B('Line it up',()=>shift(0),'Line the middle hole up with the others')}
 if(k==='see'){['lamp','book','eye'].forEach(n=>B(NAMES[n],()=>hop(n),'Add the '+n+' to the light path'));B('Clear',clear,'Clear the path')}
 if(k==='shape')B('Next card',next,'Put the next shaped card in the beam');
 if(k==='size'){B('Closer to torch',()=>slide(K.cx-.1),'Move the card closer to the torch');B('Closer to screen',()=>slide(K.cx+.1),'Move the card closer to the screen')}
 if(k==='guess'){B('Mark higher',()=>mark(K.mark+A.H*.03),'Move my mark up');B('Mark lower',()=>mark(K.mark-A.H*.03),'Move my mark down');B(K.lit?'Next card':'Switch on',light)}}
const steps=[
{h:'Three holes',p:'Light from the torch must pass through a hole in each card to reach the eye. Drag the middle card, or use the buttons.',
 predict:{q:'If the middle hole is off the line, will light still reach the eye?',opts:['yes, light bends round','no, light only travels in straight lines','yes, but a bit dimmer'],ans:1},task:'Line up the holes so light reaches the eye',
 show:()=>run(0,[()=>shift(A.H*.05),()=>shift(0)],500),
 go:()=>setUp(0,'A torch, three cards with holes and an eye. The middle card is out of line.',()=>K.moved&&K.off===0,'Light travels in straight lines: all the holes must line up.')},
{h:'How do we see?',p:'Tap the points in the order light travels, or use the buttons. Build the path for seeing the lamp, and for seeing the book.',
 predict:{q:'How do you see a book?',opts:['light leaves my eyes and hits the book','lamp light bounces off the book into my eyes','the book glows by itself'],ans:1},task:'Build both light paths',
 show:()=>run(1,[()=>hop('lamp'),()=>hop('eye'),clear,()=>hop('lamp'),()=>hop('book'),()=>hop('eye')],400),
 go:()=>setUp(1,'A lamp, a red book and an eye. Tap them in the order that light travels.',()=>K.got.size>1,'We see things when light travels from them into our eyes.')},
{h:'Shadow shapes',p:'Each card blocks the rays that hit it. Tap the picture or press Next card to try other shapes.',
 predict:{q:'A star-shaped card is in the beam. What shape is its shadow?',opts:['a round blob','a star, the same outline','a square, like the torch'],ans:1},task:'Try all 3 cards',
 show:()=>run(2,[next,next],500),
 go:()=>setUp(2,'A torch shining past a star-shaped card onto a screen.',()=>K.tried.size>2,'Straight rays make the shadow the same shape as the card.')},
{h:'Bigger or smaller?',p:'Drag the card, or use the buttons. The two edge rays show how big the shadow will be.',
 predict:{q:'Move the card closer to the torch. What happens to its shadow?',opts:['it gets smaller','it gets bigger','it stays the same'],ans:1},task:'Make a shadow twice as tall, then nearly the same size',
 show:()=>run(3,[()=>slide(.3),()=>slide(.2),()=>slide(.84)],500),
 go:()=>setUp(3,'A card between a torch and a screen, with two rays past its edges.',()=>K.big&&K.near,'Nearer the torch, bigger shadow; nearer the screen, closer to the card\'s size.')},
{h:'Predict the shadow',p:'Before the torch goes on, drag the red marker on the screen to where you think the top of the shadow will be.',task:'Make 2 good predictions',
 show:()=>run(4,[()=>mark(aim()),light,light,()=>{K.mark=aim();A.redraw()},light],450),
 go:()=>setUp(4,'A torch that is off, a card and a screen with a red marker.',()=>K.good>1,'A straight line from the source past the edge shows where the shadow ends.')},
{h:'Challenge',p:'',go:()=>{blank();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.test()});
const QS=[
 {q:'Why can you not see round a corner?',ans:'Light travels in straight lines',bad:[['Light gets too weak','weak'],['Eyes only face forwards','forward']]},
 {q:'How do you see a book in a lit room?',ans:'Light bounces off it into your eyes',bad:[['Light leaves your eyes and hits it','eyes'],['The book gives out light','glow']]},
 {q:'Why is a hand\'s shadow hand-shaped?',ans:'Rays are blocked exactly at its outline',bad:[['A shadow is a reflection','reflect'],['Light bends round the hand','bend']]},
 {q:'You move a toy closer to the torch. Its shadow…',ans:'gets bigger',bad:[['gets smaller','smaller'],['stays the same','same']]},
 {q:'Three cards with holes. One card is moved. What happens?',ans:'The light is blocked',bad:[['Light bends through','bend'],['It gets brighter','brighter']]},
 {q:'In a ray diagram, which way do the arrows point?',ans:'Away from the light source',bad:[['From the eye to the object','eyes'],['Both ways at once','both']]}];
function cue(t){let m='Picture light as straight lines leaving the source.';
 if(t==='weak')m='Light can travel huge distances. It cannot turn the corner, because it goes in straight lines.';
 if(t==='forward')m='Even with your head turned, light from round the corner cannot reach you: it travels in straight lines.';
 if(t==='eyes')m='Eyes do not send out light. Light comes from a source, bounces off things, and enters the eye.';
 if(t==='glow')m='A book is not a light source. In the dark you cannot see it at all.';
 if(t==='reflect')m='A shadow is where light is blocked, not a reflection.';
 if(t==='bend')m='Light does not bend round objects. Straight rays that just miss the edge make the outline.';
 if(t==='smaller')m='Closer to the torch, the toy blocks a wider spread of rays, so the shadow gets bigger.';
 if(t==='same')m='The shadow size depends on the distances. Rays spread out from the torch.';
 if(t==='brighter')m='The moved card blocks the straight path, so no light gets through.';
 if(t==='both')m='Light travels one way: from the source, then to the object, then to the eye.';
 return m}
function quiz(){ix++;const Q=QS[ix%QS.length],l=[[Q.ans,'ok'],...Q.bad],r=ix%3,ord=l.slice(r).concat(l.slice(0,r));
 ask.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pk=ask.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},pk,v).onclick=()=>score(t,Q.ans)});narrate('Challenge: '+Q.q);A.redraw()}
function score(t,ans){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();narrate(ok?'Yes: '+ans+'.':cue(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+cue(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:Q=>{ask.hidden=Q.step!==5;keys.hidden=Q.step===5;pad()},
 init:Q=>{A=Q;const w=c.el('div',{class:'fl-below'},Q.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Light controls'},w);ask=c.el('div',{class:'fl-chal'},Q.below);blank();A.gest({down,move,up});pad()}}).start()})})();
