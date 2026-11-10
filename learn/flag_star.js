/* Flagship: the Sun is a star (ages 7-9; NC Y5 Earth and space "describe the Sun, Earth and Moon as approximately
   spherical bodies", "the movement of the Earth, and other planets, relative to the Sun in the solar system").
   Fly away from the Sun until it shrinks to a point like every other star; compare stars' real sizes with how they
   look from Earth; sort things that make their own light from things that reflect it (the Moon, Venus); drag the
   Sun to the centre and run a year; send light from the Sun and two other stars to see how much nearer the Sun is.
   Not flagpname (planet order and names), flagsky (day, night, seasons) or flagsun (sunlight warms things). */
(()=>{
VIS.reg('flagstar',c=>{let A,pad,box,ci=-1,tok=0;const G={};
const INK='#0f172a',CARD='#f8fafc',GOLD='#fbbf24',YES='#047857',NO='#b91c1c',SKY='#0b1026';
const which=()=>['fly','size','glow','centre','light','chal'][A.step];
const lim=(v,a,b)=>Math.max(a,Math.min(b,v));
function voice(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function card(t,x,y,edge,fs){const g=A.ctx;fs=fs||(A.narrow?13:15);g.font=`700 ${fs}px system-ui`;let w=g.measureText(t).width+18;
 while(w>A.W-8&&fs>9){fs--;g.font=`700 ${fs}px system-ui`;w=g.measureText(t).width+18}const h=fs+13,x0=lim(x-w/2,4,A.W-w-4);
 g.fillStyle=CARD;A.paint.rrect(x0,y-h/2,w,h,9);g.fill();g.lineWidth=edge?2.5:1;g.strokeStyle=edge||'#94a3b8';g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
/* a fixed field of faint stars, so the scene is the same every time */
const FIELD=Array.from({length:70},(_,i)=>({u:((i*73)%101)/101,v:((i*37+11)%97)/97,s:.6+((i*29)%5)/4}));
function space(){const g=A.ctx;g.fillStyle=SKY;g.fillRect(0,0,A.W,A.H);g.fillStyle='#e2e8f0';FIELD.forEach(p=>{g.beginPath();g.arc(p.u*A.W,p.v*A.H,p.s,0,7);g.fill()})}
function sun(x,y,r,a){const g=A.ctx;g.save();g.globalAlpha=a==null?1:a;if(r>4){g.fillStyle='rgba(251,191,36,.25)';g.beginPath();g.arc(x,y,r*1.35,0,7);g.fill()}
 g.fillStyle=GOLD;g.beginPath();g.arc(x,y,Math.max(1.4,r),0,7);g.fill();g.restore()}
/* ---- 0: fly away from the Sun ---- */
const FAR=10,sunR=d=>Math.max(1.6,A.H*.36/Math.pow(d,1.6));
function drawFly(){space();const y=A.H*.45;sun(A.W*.5,y,sunR(G.d));if(G.d>=4)card('the Sun',A.W*.5,y+22,0,11);const g=A.ctx,x0=A.W*.1,x1=A.W*.9,ty=A.H*.86,kx=x0+(x1-x0)*(G.d-1)/(FAR-1);
 g.strokeStyle='#cbd5e1';g.lineWidth=4;g.beginPath();g.moveTo(x0,ty);g.lineTo(x1,ty);g.stroke();g.fillStyle='#60a5fa';g.beginPath();g.arc(kx,ty,A.narrow?14:12,0,7);g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.stroke();
 card(G.d>=FAR?'Now the Sun looks like any other star':G.d<2?'Close to the Sun':'Flying away…',A.W/2,A.H*.08,G.d>=FAR?YES:0);card('near',x0,ty+24,0,11);card('very far',x1,ty+24,0,11)}
function fly(d,quiet){G.d=lim(Math.round(d*2)/2,1,FAR);if(quiet)return A.redraw();A.sound.tick();
 say(G.d>=FAR?'From very far away the Sun is a tiny point of light. It looks just like the other stars, because it is one.':G.d<2?'Close up, the Sun is a huge, bright ball of glowing gas.':'The farther away you go, the smaller and fainter the Sun looks.')}
/* ---- 1: real size vs how it looks ---- */
const ST=[['Proxima Centauri',.15,'just over 4 years','smaller than the Sun'],['Sirius',1.7,'about 8½ years','almost twice as wide as the Sun'],['Betelgeuse',700,'hundreds of years','hundreds of times wider than the Sun']];
function drawSize(){space();const g=A.ctx,y=A.H*.5,xs=[.2,.5,.8].map(f=>f*A.W),unit=A.H*.08;
 if(G.real){ST.forEach((s,i)=>{const r=Math.min(s[1]*unit,A.H*.3);if(s[1]>50){g.fillStyle='#f87171';g.beginPath();g.arc(xs[i]+A.H*.6,y,A.H*.62,0,7);g.fill();}else{g.fillStyle=i?'#bfdbfe':'#fca5a5';g.beginPath();g.arc(xs[i],y,r,0,7);g.fill()}});
  sun(A.W*.5,A.H*.82,unit,1);card('the Sun',A.W*.5,A.H*.82+unit+14,0,11)}
 else{ST.forEach((s,i)=>sun(xs[i],y,2.5,.9));sun(A.W*.5,A.H*.82,A.H*.1,1);card('the Sun, from Earth',A.W*.5,A.H*.96,0,11)}
 ST.forEach((s,i)=>card(s[0]+(G.seen[i]?' ✓':''),xs[i],A.H*.24,G.pick===i?GOLD:0,A.narrow?10:12));card(G.real?'Real sizes':'How they look from Earth',A.W/2,A.H*.08,G.real?YES:0)}
function view(r){G.real=r;A.sound.tick();say(r?'Real sizes. Tap a star to compare it with the Sun.':'From Earth, the Sun looks huge and the other stars look like dots.')}
function pick(i){G.pick=i;const s=ST[i];if(G.real)G.seen[i]=1;A.sound.pop();say(`${s[0]} is ${s[3]}. Its light takes ${s[2]} to reach us, so it looks like a dot.`+(G.real?'':' Switch to real sizes to compare.'))}
/* ---- 2: makes light or reflects it ---- */
const THINGS=[['the Sun',1,'The Sun is a star. It makes its own light and heat.'],['the Moon',0,'The Moon makes no light. It shines because sunlight bounces off it.'],
 ['Venus, the bright "evening star"',0,'Venus is a planet. It is bright because it reflects sunlight; it is not a star.'],['Sirius',1,'Sirius is a star, like the Sun, but much farther away.'],
 ['Mars',0,'Mars is a planet. It reflects sunlight.'],['the North Star',1,'The North Star is a real star, far away.']];
function drawGlow(){space();const t=THINGS[G.k%6],g=A.ctx,x=A.W/2,y=A.H*.45;if(t[1])sun(x,y,A.H*.1);else{g.fillStyle='#cbd5e1';g.beginPath();g.arc(x,y,A.H*.09,0,7);g.fill();g.fillStyle=SKY;g.beginPath();g.arc(x+A.H*.04,y-A.H*.02,A.H*.085,0,7);g.fill()}
 card(t[0],x,y+A.H*.18,0,A.narrow?11:13);card(`Sorted right: ${G.ok} of 6`,A.W/2,A.H*.08,G.ok>5?YES:0);
 [['Makes its own light',.25],['Reflects light',.75]].forEach(([l,f])=>{g.strokeStyle='#e2e8f0';g.setLineDash([6,5]);g.lineWidth=2;A.paint.rrect(A.W*f-A.W*.22,A.H*.8,A.W*.44,A.H*.16,10);g.stroke();g.setLineDash([]);card(l,A.W*f,A.H*.88,0,A.narrow?10:12)})}
function sort(own){const t=THINGS[G.k%6];if(!!t[1]===own){G.ok++;G.k++;A.sound.pop();return say('Yes. '+t[2]+(G.ok<6?' Next one.':' All sorted.'))}A.sound.miss();say('Not quite. '+t[2])}
/* ---- 3: put the Sun in the middle ---- */
const RING=[.12,.17,.23,.29,.36,.42,.47,.52];
function drawCentre(){space();const g=A.ctx,o={x:A.W/2,y:A.H*.52},m=Math.min(A.W,A.H*1.4)*.9,mid=G.mid;
 const hub=mid?o:{x:G.sx,y:G.sy};RING.forEach((f,i)=>{const r=f*m*.95;if(mid){g.strokeStyle='rgba(203,213,225,.45)';g.lineWidth=1;g.beginPath();g.ellipse(o.x,o.y,r,r*.55,0,0,7);g.stroke()}
  const a=mid?(i===2?G.ang:i*1.7):0,p=mid?{x:o.x+r*Math.cos(a),y:o.y+r*.55*Math.sin(a)}:{x:o.x+(i-2)*8,y:o.y+(i%3-1)*6};
  if(!mid&&i!==2)return;g.fillStyle=i===2?'#38bdf8':'#a8a29e';g.beginPath();g.arc(p.x,p.y,i===2?7:4,0,7);g.fill();if(i===2)card('Earth',p.x,p.y-20,0,11)});
 if(mid)RING.forEach((f,i)=>{if(i===2)return;const r=f*m*.95,a=i*1.7;g.fillStyle=['#a8a29e','#fde68a','','#f87171','#fdba74','#fde68a','#67e8f9','#60a5fa'][i];g.beginPath();g.arc(o.x+r*Math.cos(a),o.y+r*.55*Math.sin(a),i>3?6:4,0,7);g.fill()});
 sun(hub.x,hub.y,A.H*.05);card(mid?(G.year?'The Earth went round the Sun: one year':'Sun in the middle. Now run a year.'):'Drag the Sun to the middle',A.W/2,A.H*.08,mid?YES:0)}
function place(x,y,quiet){const o={x:A.W/2,y:A.H*.52};G.sx=x;G.sy=y;if(Math.hypot(x-o.x,y-o.y)<A.W*.08)G.mid=1;if(quiet)return A.redraw();A.sound.tick();
 say(G.mid?'The Sun sits at the centre of the solar system. All 8 planets, Earth too, travel round it.':'The Earth is not at the centre. Move the Sun to the middle.')}
function year(){if(!G.mid)return say('Put the Sun in the middle first.');A.sound.whoosh();G.ang=0;A.tween(G,{ang:Math.PI*2},1600,'io',()=>{G.year=1;say('One trip round the Sun takes the Earth one year. The Sun stayed in the middle.')})}
/* ---- 4: light takes time ---- */
const TRIP=[['the Sun','about 8 minutes',.18],['Proxima Centauri','just over 4 years',.62],['Sirius','about 8½ years',.92]];
function drawLight(){space();const g=A.ctx;TRIP.forEach((t,i)=>{const y=A.H*(.25+i*.24),x0=A.W*.08,x1=A.W*(.12+.8*t[2]);g.fillStyle='#38bdf8';g.beginPath();g.arc(x0,y,8,0,7);g.fill();sun(x1,y,i?3:9);
  g.strokeStyle='rgba(251,191,36,.35)';g.setLineDash([4,6]);g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();g.setLineDash([]);const f=G.f[i];
  if(f>0){g.fillStyle=GOLD;g.beginPath();g.arc(x1+(x0-x1)*f,y,5,0,7);g.fill()}card(t[0]+(G.sent[i]?': '+t[1]:''),A.W*.55,y-22,G.sent[i]?YES:0,A.narrow?10:12)});
 card('Earth',A.W*.08+4,A.H*.94,0,11);card(`Light sent: ${G.sent.filter(Boolean).length} of 3`,A.W/2,A.H*.08)}
function send(i){const t=TRIP[i];A.sound.whoosh();G.f[i]=.001;A.tween(G.f,{[i]:1},700+i*500,'io');G.sent[i]=1;
 say(`Light from ${t[0]} takes ${t[1]} to reach Earth. `+(i?'The Sun is far nearer than any other star, so it looks so big and bright.':'It is our closest star.'))}
function draw(){const k=which();if(k==='chal'){space();sun(A.W/2,A.H*.5,A.H*.15);card('Challenge',A.W/2,A.H*.08,GOLD);return}
 ({fly:drawFly,size:drawSize,glow:drawGlow,centre:drawCentre,light:drawLight})[k]()}
/* pointer */
function down(p){const k=which();
 if(k==='fly'&&p.y>A.H*.75){G.hold='fly';move(p);return true}
 if(k==='centre'&&!G.mid&&Math.hypot(p.x-G.sx,p.y-G.sy)<44){G.hold='sun';return true}
 if(k==='size'&&p.y<A.H*.4){pick(p.x<A.W*.35?0:p.x<A.W*.65?1:2);return false}
 if(k==='glow'&&p.y>A.H*.75){sort(p.x<A.W/2);return false}
 if(k==='light'){const i=lim(Math.floor((p.y/A.H-.13)/.24),0,2);send(i);return false}return false}
function move(p){if(G.hold==='fly')fly(1+(p.x-A.W*.1)/(A.W*.8)*(FAR-1),true);if(G.hold==='sun')place(p.x,p.y,true)}
function up(){const h=G.hold;G.hold=null;if(h==='fly')fly(G.d);if(h==='sun')place(G.sx,G.sy)}
function reset(){tok++;for(const k in G)delete G[k];Object.assign(G,{d:1,real:0,pick:-1,seen:[0,0,0],k:0,ok:0,mid:0,sx:A.W*.82,sy:A.H*.3,ang:.6,year:0,f:[0,0,0],sent:[0,0,0],hold:null,test:()=>{}})}
function say(t){voice(t);A.redraw();keys();G.test()}
const met=(i,f,msg)=>()=>{if(A.step===i&&f()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,intro,f,msg){reset();voice(intro);keys();G.test=met(i,f,msg)}
function auto(i,acts,ms){steps[i].go();const v=tok;acts.forEach((f,j)=>setTimeout(()=>{if(v===tok)f()},(ms||500)*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=which(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='fly'){B('Fly farther',()=>fly(G.d+3),'Fly farther away from the Sun');B('Come closer',()=>fly(G.d-3),'Fly back towards the Sun')}
 if(k==='size'){B(G.real?'How they look':'Real sizes',()=>view(!G.real));ST.forEach((s,i)=>B(s[0],()=>pick(i),'Find out about '+s[0]))}
 if(k==='glow'){B('Makes its own light',()=>sort(true));B('Reflects light',()=>sort(false))}
 if(k==='centre'){B('Put the Sun in the middle',()=>place(A.W/2,A.H*.52));B('Run a year',year,'Send the Earth once round the Sun')}
 if(k==='light')TRIP.forEach((t,i)=>B('Light from '+t[0],()=>send(i)))}
const steps=[
{h:'Fly away from the Sun',p:'The Sun is a star. Drag the blue dot, or tap Fly farther, to travel away from it. Watch how it looks.',
 predict:{q:'Fly very far from the Sun. What will it look like?',opts:['still a big yellow ball','a tiny dot, like the other stars','it will vanish: it is not a star'],ans:1},task:'Fly far away from the Sun',
 show:()=>auto(0,[()=>fly(4),()=>fly(7),()=>fly(10)],500),
 go:()=>open(0,'The Sun, big and bright, with small stars all around it in dark space.',()=>G.d>=FAR,'The Sun is a star. From far away it looks like the rest.')},
{h:'Big or just close?',p:'From Earth, the Sun looks far bigger than any star. Switch to Real sizes and tap each star to compare it with the Sun.',
 predict:{q:'Is the Sun the biggest star?',opts:['yes, it looks the biggest','no, it is just much closer','stars are smaller than planets'],ans:1},task:'Compare 3 stars at their real size',
 show:()=>auto(1,[()=>view(1),()=>pick(0),()=>pick(1),()=>pick(2)],500),
 go:()=>open(1,'Three stars that look like dots, and the Sun, which looks big.',()=>G.seen.every(Boolean),'Some stars are bigger than the Sun. It looks biggest because it is closest.')},
{h:'Own light or borrowed?',p:'A star makes its own light. The Moon and planets only reflect sunlight. Sort each one.',
 predict:{q:'The Moon shines at night. Is it a star?',opts:['yes, it shines','no, it reflects the Sun\'s light','yes, the closest star'],ans:1},task:'Sort all 6',
 show:()=>auto(2,THINGS.map(t=>()=>sort(!!t[1])),450),
 go:()=>open(2,'Something shining in the sky, with two boxes: makes its own light, or reflects light.',()=>G.ok>5,'Stars make light. The Moon and planets reflect it.')},
{h:'What is in the middle?',p:'Here the Earth is in the middle. Drag the Sun to the centre, then run a year.',
 predict:{q:'What is at the centre of our solar system?',opts:['the Earth','the Sun','the Moon'],ans:1},task:'Put the Sun in the middle and run a year',
 show:()=>auto(3,[()=>place(A.W/2,A.H*.52),year],600),
 go:()=>open(3,'The Earth in the middle with the Sun off to one side.',()=>G.mid&&G.year,'The Sun is at the centre. All 8 planets orbit it.')},
{h:'How far is a star?',p:'Light is the fastest thing there is. Tap each star to send its light to Earth and see how long it takes.',task:'Send light from all 3',
 show:()=>auto(4,[()=>send(0),()=>send(1),()=>send(2)],600),
 go:()=>open(4,'The Earth on the left, with the Sun and two other stars at different distances.',()=>G.sent.every(Boolean),'The Sun is our closest star by far.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.test()});
const QS=[
 {q:'Is the Sun a star?',ans:'Yes, our closest star',bad:[['No, it is a planet','planet'],['No, stars are tiny','tiny']]},
 {q:'Why does the Sun look bigger than other stars?',ans:'It is much closer to us',bad:[['It is the biggest star','biggest'],['It is not a real star','tiny']]},
 {q:'What is at the centre of our solar system?',ans:'The Sun',bad:[['The Earth','earth'],['The Moon','moon']]},
 {q:'Venus shines brightly in the evening. What is it?',ans:'A planet lit by the Sun',bad:[['A star','venus'],['A small moon','moon']]},
 {q:'Does the Moon make its own light?',ans:'No, it reflects sunlight',bad:[['Yes, it glows','glow'],['Only when it is full','glow']]},
 {q:'Where are the stars in the daytime?',ans:'Still there, hidden by sunlight',bad:[['Gone until night','gone'],['Behind the Sun','gone']]},
 {q:'What goes round the Sun?',ans:'All 8 planets, Earth too',bad:[['Only the Earth','only'],['Nothing: the Sun goes round us','earth']]}];
function hint(t){let m='Think about what a star is: a huge ball of hot gas that makes its own light.';
 if(t==='planet')m='Planets do not make light. The Sun makes its own light and heat, so it is a star.';
 if(t==='tiny')m='Stars look tiny only because they are so far away. The Sun is a star that is close.';
 if(t==='biggest')m='Many stars are bigger. Betelgeuse is hundreds of times wider. The Sun is just much closer.';
 if(t==='earth')m='It looks as if the Sun moves across our sky, but the Earth goes round the Sun.';
 if(t==='moon')m='The Moon goes round the Earth. It is not at the centre of anything this big.';
 if(t==='venus')m='Venus is called the evening star, but it is a planet. It reflects sunlight.';
 if(t==='glow')m='The Moon makes no light. We see sunlight bouncing off it.';
 if(t==='gone')m='The stars are still there. The bright daytime sky hides their faint light.';
 if(t==='only')m='All 8 planets orbit the Sun, not just the Earth.';
 return m}
function quiz(){ci++;const Q=QS[ci%QS.length],l=[[Q.ans,'ok'],...Q.bad],r=ci%3,ord=l.slice(r).concat(l.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pk=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},pk,v).onclick=()=>judge(t,Q.ans)});voice('Challenge: '+Q.q);A.redraw()}
function judge(t,ans){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();voice(ok?'Yes: '+ans+'.':hint(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:Q=>{box.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{A=Q;const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Space controls'},w);box=c.el('div',{class:'fl-chal'},Q.below);reset();A.gest({down,move,up});keys()}}).start()})})();
