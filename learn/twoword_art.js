/* Data and drawings for flagtwoword (Putting two words together; English, Speaking & Listening, ages 2-3).
   Sources: CDC Learn the Signs. Act Early. milestones (2022), 2 years: 'says at least two words together, like More
   milk'; Development Matters (2021) Communication and Language, birth to three; Brown (1973) A First Language, stage I
   meanings (more, all gone, no, bye; who does it; whose it is; where it is; what it is like); Cleave, Becker, Curran,
   Owen Van Horne and Fey (2015) meta-analysis of recasts, AJSLP: saying the child's words back a little longer
   helps. Slips it targets: one word when two would say more; a word that does not fit the picture; the words in the
   wrong order ('milk more'); and, for grown-ups, asking for the whole sentence instead of saying it back longer, a reply
   with no words, and a reply that is far too long. */
const TW=(()=>{
const E={more:'\u2795',milk:'\u{1F95B}',car:'\u{1F697}',bed:'\u{1F6CF}\uFE0F',all:'\u{1F450}',gone:'\u{1F4A8}',big:'\u{1F418}',duck:'\u{1F986}',
 bye:'\u{1F44B}',teddy:'\u{1F9F8}',dog:'\u{1F415}',run:'\u{1F3C3}',baby:'\u{1F476}',sleep:'\u{1F634}',eat:'\u{1F944}',bird:'\u{1F426}',fly:'\u{1FAB6}',fish:'\u{1F41F}',ball:'\u26BD',box:'\u{1F4E6}',bath:'\u{1F6C1}'};
/* step 1: ask and tell with two words (meaning words that toddlers join first) */
const ASK=[{sc:'cup',cue:'The cup is empty. Ask for more.',t:['milk','car','more','bed'],a:['more','milk']},
 {sc:'plate',cue:'The plate is empty. What do you say?',t:['duck','gone','big','all'],a:['all','gone']},
 {sc:'away',cue:'The car is going away. Wave and say...',t:['car','more','teddy','bye'],a:['bye','car']}];
/* step 2: who is doing what */
const WHO=[{sc:'dogrun',cue:'Look! What is the dog doing?',t:['run','baby','dog','sleep'],a:['dog','run']},
 {sc:'babysleep',cue:'Shh! What is the baby doing?',t:['dog','sleep','eat','baby'],a:['baby','sleep']},
 {sc:'birdfly',cue:'Up high! What is the bird doing?',t:['fish','fly','bird','run'],a:['bird','fly']}];
/* step 3: whose is it (drag the thing to the person who has the other one) */
const OWN=[{e:'\u{1F468}',n:'Daddy',k:'shoe',ke:'\u{1F45E}',say:'Daddy shoe'},{e:'\u{1F476}',n:'Baby',k:'sock',ke:'\u{1F9E6}',say:'Baby sock'},{e:'\u{1F475}',n:'Gran',k:'hat',ke:'\u{1F452}',say:'Gran hat'}];
/* step 4: where is it: choose the two words that fit */
const WHERE=[{sc:'teddybed',cue:'Where is teddy?',ok:'teddy bed',o:[['bed','one'],['teddy box','fit']]},
 {sc:'ballbox',cue:'Where is the ball?',ok:'ball box',o:[['ball bath','fit'],['ball','one']]},
 {sc:'duckbath',cue:'Where is the duck?',ok:'duck bath',o:[['bath duck','order'],['duck bed','fit']]}];
/* step 5: the grown-up says it back a little longer */
const BACK=[{sc:'away',kid:'car go',ok:'Yes! The car is going.',more:'car going!',o:[['No. Say: the car is going.','fix'],['(nods, says nothing)','flat']]},
 {sc:'cup',kid:'more juice',ok:'More juice, please! Here it is.',more:'more juice please!',o:[['Say it properly first.','fix'],['Look at that lovely juice that I poured for you from the big carton this morning.','long']]},
 {sc:'dogrun',kid:'big dog',ok:'A big dog! The big dog is running.',more:'big dog run!',o:[['Mm.','flat'],['That is not how we say it.','fix']]}];
const DESC=['An empty cup, an empty plate and a car going away. Tap two word cards, or use the buttons, to say it.',
 'A dog runs, a baby sleeps, a bird flies. Tap who, then what they do.',
 'Daddy, Baby and Gran each have one thing. Drag the other one to the right person, or use the buttons.',
 'Teddy, a ball and a duck are in different places. Choose the two words that fit.',
 'A child says two words. Choose what the grown-up says back.'];
const TXT=['Two words say more.','Who and what they do.','Whose is it?','Where is it?','Say it back a bit longer.'];
const DONE=['More milk, all gone, bye car: two words tell what you want.',
 'Dog run, baby sleep, bird fly: who, then what they do.',
 'Daddy shoe, Baby sock, Gran hat: two words say whose it is.',
 'Teddy bed, ball box, duck bath: two words say where it is.',
 'You said it back a bit longer, and the child said more words too.'];
const QS=[{q:'The cup is empty. Which says the most?',a:'more milk',o:[['milk','one'],['more car','fit']]},
 {q:'The dog is running. Which two words fit?',a:'dog run',o:[['baby run','fit'],['run dog','order']]},
 {q:'Teddy is in the box. Which two words fit?',a:'teddy box',o:[['teddy bed','fit'],['box','one']]},
 {q:'Your child says \u201Cbye car\u201D. What helps most?',a:'Bye bye, car! The car is going.',o:[['Say \u201Cgoodbye\u201D, not \u201Cbye\u201D.','fix'],['Say nothing.','flat']]},
 {q:'Baby has one sock on. Here is the other. Whose is it?',a:'Baby sock',o:[['Daddy sock','fit'],['sock','one']]},
 {q:'The plate is empty. Which two words fit?',a:'all gone',o:[['more gone','fit'],['gone','one']]},
 {q:'Your child says \u201Cbig ball\u201D. What helps most?',a:'A big ball! Kick the big ball.',o:[['That big ball rolled all the way under the sofa in the other room last night.','long'],['Say the whole sentence.','fix']]},
 {q:'The bird is flying. Which two words fit?',a:'bird fly',o:[['fly bird','order'],['fish fly','fit']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',FONT='px system-ui,sans-serif';
function emo(g,e,x,y,s,a){g.save();if(a!=null)g.globalAlpha=a;g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(e,x,y);g.restore()}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function wrap(g,t,max){const out=[];let cur='';for(const w of String(t).split(' ')){const nx=cur?cur+' '+w:w;if(cur&&g.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx}if(cur)out.push(cur);return out}
/* an empty cup drawn as a glass with a rim */
function cup(g,x,y,s,dk){g.strokeStyle=dk?'#e2e8f0':'#334155';g.lineWidth=Math.max(3,s*.06);g.fillStyle=dk?'rgba(148,163,184,.25)':'rgba(186,230,253,.55)';g.beginPath();g.moveTo(x-s*.32,y-s*.45);g.lineTo(x-s*.24,y+s*.45);g.lineTo(x+s*.24,y+s*.45);g.lineTo(x+s*.32,y-s*.45);g.stroke()}
function plate(g,x,y,s,dk){g.fillStyle=dk?'#cbd5e1':'#ffffff';g.strokeStyle='#64748b';g.lineWidth=3;g.beginPath();g.ellipse(x,y,s*.55,s*.22,0,0,7);g.fill();g.stroke();g.beginPath();g.ellipse(x,y,s*.34,s*.12,0,0,7);g.stroke();g.fillStyle='#f59e0b';g.beginPath();g.arc(x+s*.12,y-s*.02,s*.03,0,7);g.arc(x-s*.08,y+s*.03,s*.025,0,7);g.fill()}
function lines(g,x,y,s,dk){g.strokeStyle=dk?'#94a3b8':'#64748b';g.lineWidth=3;g.lineCap='round';for(let i=0;i<3;i++){g.beginPath();g.moveTo(x-s*.9,y-s*.2+i*s*.2);g.lineTo(x-s*.55,y-s*.2+i*s*.2);g.stroke()}}
/* one picture per scene key, drawn inside box r */
function scene(g,r,k,dk){const s=Math.min(r.w*.34,r.h*.7),cx=r.x+r.w/2,cy=r.y+r.h/2;g.fillStyle=dk?'#1e293b':'#fef9c3';rr(g,r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=RIM;g.lineWidth=1.5;g.stroke();
 if(k==='cup'){cup(g,cx,cy,s,dk);emo(g,'\u{1F9D2}',cx+s*.95,cy+s*.1,s*.6)}
 else if(k==='plate'){plate(g,cx,cy+s*.1,s,dk);emo(g,'\u{1F9D2}',cx+s*.95,cy,s*.6)}
 else if(k==='away'){emo(g,E.car,cx-s*.1,cy+s*.05,s*.7);lines(g,cx+s*.95,cy+s*.05,s*.5,dk);emo(g,'\u{1F9D2}',cx+s*1.15,cy,s*.5);emo(g,E.bye,cx+s*1.15,cy-s*.42,s*.3)}
 else if(k==='dogrun'){emo(g,E.dog,cx-s*.15,cy,s*.8);lines(g,cx+s*1.05,cy,s*.6,dk)}
 else if(k==='babysleep'){emo(g,E.baby,cx,cy+s*.08,s*.75);emo(g,'\u{1F4A4}',cx+s*.5,cy-s*.35,s*.35)}
 else if(k==='birdfly'){emo(g,E.bird,cx,cy-s*.1,s*.7);emo(g,'\u2601\uFE0F',cx-s*.9,cy+s*.25,s*.4);emo(g,'\u2601\uFE0F',cx+s*.9,cy+s*.2,s*.35)}
 else{const m={teddybed:[E.teddy,E.bed],ballbox:[E.ball,E.box],duckbath:[E.duck,E.bath]}[k];emo(g,m[1],cx,cy+s*.15,s*.9);emo(g,m[0],cx,cy-s*.18,s*.45)}}
/* a speech bubble; returns its height */
function bubble(g,x,y,w,t,n,dk,tone){g.font=`700 ${n}${FONT}`;const R=wrap(g,t,w-20),h=R.length*n*1.25+14;g.fillStyle=tone==='kid'?(dk?'#1e3a8a':'#dbeafe'):(dk?'#14532d':'#dcfce7');g.strokeStyle=RIM;g.lineWidth=2;rr(g,x,y,w,h,12);g.fill();g.stroke();
 g.fillStyle=dk?'#f8fafc':INK;g.textAlign='left';g.textBaseline='top';R.forEach((s,i)=>g.fillText(s,x+10,y+7+i*n*1.25));return h}
return{E,ASK,WHO,OWN,WHERE,BACK,DESC,TXT,DONE,QS,INK,OK,NO,RIM,FONT,emo,rr,wrap,scene,bubble}})();
