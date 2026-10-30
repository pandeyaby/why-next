/* Flagship – pictures and text (ages 5–9): words vs picture, illustrate, set the mood, the fox the words leave out, bee labels and captions. */
(()=>{
const FACTS=[['Max is a dog','both'],['It is raining','pic'],['Max wants to play','words'],['The ball is red','pic'],['Max is under a tree','pic']];
const BINS=[['Words','words'],['Picture','pic'],['Both','both']];
const ILL=[{w:'Sam sat under a big tree. The sun was hot.',need:['tree','sun'],opts:['tree','moon','sun','snow']},
 {w:'At night, an owl sat on the roof.',need:['moon','owl'],opts:['sun','owl','fish','moon']},
 {w:'A fish swam in the pond in the rain.',need:['fish','rain'],opts:['owl','fish','rain','sun']}];
const WHY={moon:'A moon means night.',sun:'A sun means day.',snow:'The words say hot, not snow.',fish:'The words do not say a fish.',owl:'The words do not say an owl.',tree:'The words do not say a tree.',rain:'The words do not say rain.'};
const MOODS=['scary','happy'],PAGES=['Hen walked across the yard.','She went around the pond.','She went past the haystack and got home for tea.'];
const PARTS=[['wing',.2,-.75],['antenna',-.85,-.7],['leg',.15,.75]],CAPS=[['A bee drinks nectar from a flower.','ok'],['Bee','short'],['I like honey on toast.','off']];
VIS.reg('flagpic',c=>{let A,pad,quiz,qi=-1,run=0;
const B0=()=>({want:()=>{},r:0,won:0,fi:0,got:[],put:[],sky:0,wx:0,face:0,pi:0,tip:-1,drag:null,cap:0}),S=B0();
const mode=()=>['facts','ill','mood','fox','bee','quiz'][A.step];
const fs=n=>Math.round(n*(A.narrow?1:1.12)),R=()=>A.reduced();
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,n,col,w){g.font=`700 ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,w||A.W-16)}
function box(g,x,y,w,h,col,a){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,12);g.fill();g.strokeStyle=col;g.lineWidth=2;A.paint.rrect(x,y,w,h,12);g.stroke()}
const disc=(g,x,y,r,col)=>{g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill()};
/* stickers: tiny drawings shared by every scene */
const ART={tree:(g,x,y,s)=>{g.fillStyle='#92400e';g.fillRect(x-s*.12,y-s*.2,s*.24,s*.7);disc(g,x,y-s*.45,s*.5,'#16a34a')},
 sun:(g,x,y,s)=>disc(g,x,y,s*.35,'#facc15'),moon:(g,x,y,s)=>{disc(g,x,y,s*.35,'#fef3c7');disc(g,x+s*.15,y-s*.1,s*.3,'#1e293b')},
 snow:(g,x,y,s)=>{g.strokeStyle='#93c5fd';g.lineWidth=3;for(let i=0;i<3;i++){const a=i*Math.PI/3;g.beginPath();g.moveTo(x-Math.cos(a)*s*.35,y-Math.sin(a)*s*.35);g.lineTo(x+Math.cos(a)*s*.35,y+Math.sin(a)*s*.35);g.stroke()}},
 owl:(g,x,y,s)=>{g.fillStyle='#a16207';g.beginPath();g.ellipse(x,y,s*.3,s*.4,0,0,7);g.fill();disc(g,x-s*.12,y-s*.12,s*.1,'#fff');disc(g,x+s*.12,y-s*.12,s*.1,'#fff');disc(g,x-s*.12,y-s*.12,s*.04,'#111');disc(g,x+s*.12,y-s*.12,s*.04,'#111')},
 fish:(g,x,y,s)=>{g.fillStyle='#f97316';g.beginPath();g.ellipse(x,y,s*.35,s*.18,0,0,7);g.fill();g.beginPath();g.moveTo(x+s*.3,y);g.lineTo(x+s*.55,y-s*.18);g.lineTo(x+s*.55,y+s*.18);g.fill()},
 rain:(g,x,y,s)=>{disc(g,x,y-s*.15,s*.25,'#94a3b8');disc(g,x+s*.2,y-s*.1,s*.2,'#94a3b8');g.strokeStyle='#3b82f6';g.lineWidth=2;for(let i=-1;i<2;i++){g.beginPath();g.moveTo(x+i*s*.15,y+s*.1);g.lineTo(x+i*s*.15-3,y+s*.35);g.stroke()}}};
function dog(g,x,y,s){g.fillStyle='#b45309';g.beginPath();g.ellipse(x,y,s*.45,s*.25,0,0,7);g.fill();disc(g,x+s*.45,y-s*.25,s*.2,'#b45309');disc(g,x+s*.5,y-s*.3,s*.04,'#111');g.fillRect(x-s*.35,y+s*.15,s*.08,s*.25);g.fillRect(x+s*.25,y+s*.15,s*.08,s*.25)}
function hen(g,x,y,s){disc(g,x,y,s*.3,'#f8fafc');disc(g,x+s*.25,y-s*.25,s*.15,'#f8fafc');disc(g,x+s*.27,y-s*.42,s*.07,'#dc2626');disc(g,x+s*.3,y-s*.27,s*.03,'#111')}
function fox(g,x,y,s){g.fillStyle='#ea580c';g.beginPath();g.moveTo(x-s*.3,y+s*.2);g.lineTo(x,y-s*.3);g.lineTo(x+s*.3,y+s*.2);g.closePath();g.fill();g.beginPath();g.moveTo(x-s*.25,y-s*.05);g.lineTo(x-s*.2,y-s*.4);g.lineTo(x-s*.05,y-s*.15);g.fill();g.beginPath();g.moveTo(x+s*.25,y-s*.05);g.lineTo(x+s*.2,y-s*.4);g.lineTo(x+s*.05,y-s*.15);g.fill();disc(g,x-s*.1,y,s*.04,'#111');disc(g,x+s*.1,y,s*.04,'#111')}
function kid(g,x,y,s,worried){disc(g,x,y-s*.5,s*.25,'#f2c9a0');g.strokeStyle='#111';g.lineWidth=2;g.beginPath();if(worried)g.arc(x,y-s*.38,s*.1,Math.PI*1.15,Math.PI*1.85);else g.arc(x,y-s*.5,s*.12,.3,Math.PI-.3);g.stroke();
 disc(g,x-s*.08,y-s*.56,s*.03,'#111');disc(g,x+s*.08,y-s*.56,s*.03,'#111');g.fillStyle='#7c3aed';g.fillRect(x-s*.18,y-s*.25,s*.36,s*.5)}
const PG=()=>({x:10,y:A.H*.04,w:A.W-20,h:A.H*.52}),U=()=>Math.min(A.W/6,A.H/4.5);
function page(g,sentence,dark){const p=PG();g.fillStyle=dark?'#1e293b':'#e0f2fe';A.paint.rrect(p.x,p.y,p.w,p.h,12);g.fill();txt(g,sentence,A.W/2,p.y+p.h+fs(16),13,A.col.tx,A.W-20)}
function drawFacts(g){const{W,H}=A,C=A.col,p=PG(),s=U();page(g,'"Max the dog wants to play."');ART.tree(g,W*.25,p.y+p.h*.6,s);dog(g,W*.55,p.y+p.h*.78,s);disc(g,W*.8,p.y+p.h*.85,s*.14,'#dc2626');
 g.strokeStyle='#3b82f6';g.lineWidth=2;for(let i=0;i<14;i++){const x=p.x+12+i*(p.w-24)/13;g.beginPath();g.moveTo(x,p.y+10+(i%3)*8);g.lineTo(x-4,p.y+30+(i%3)*8);g.stroke()}
 const f=FACTS[S.fi];if(f)txt(g,`Where do you learn: "${f[0]}"?`,W/2,H*.7,13);const bw=(W-40)/3;BINS.forEach(([t],i)=>{const x=10+i*(bw+10);box(g,x,H*.76,bw,H*.2,S.tip===i?C.rd:[C.ac,C.am,C.gr][i],.15);txt(g,t,x+bw/2,H*.86,14)})}
const slot=(i)=>({x:A.W*(.14+i*.24),y:A.H*.84});
function drawIll(g){const{W,H}=A,C=A.col,p=PG(),s=U(),R0=ILL[Math.min(S.r,2)];page(g,R0.w);S.put.forEach((k,i)=>ART[k](g,W*(.3+i*.4),p.y+p.h*.5,s*1.1));
 R0.opts.forEach((k,i)=>{const o=slot(i),used=S.put.includes(k);if(S.drag&&S.drag.k===k)return;box(g,o.x-s*.45,o.y-s*.45,s*.9,s*.9,S.tip===i?C.rd:C.mu,used?.05:.15);if(!used)ART[k](g,o.x,o.y,s*.8)});
 if(S.drag)ART[S.drag.k](g,S.drag.x,S.drag.y,s)}
function drawMood(g){const{W,H}=A,p=PG(),s=U(),night=S.sky,storm=S.wx;page(g,'"Mia walked into the woods."',night);for(let i=0;i<4;i++){const x=p.x+p.w*(.12+i*.25);g.fillStyle=night?'#14532d':'#16a34a';g.beginPath();g.moveTo(x,p.y+p.h*.25);g.lineTo(x-s*.35,p.y+p.h*.85);g.lineTo(x+s*.35,p.y+p.h*.85);g.fill()}
 if(storm){g.fillStyle='#64748b';[.3,.6].forEach(f=>{disc(g,p.x+p.w*f,p.y+p.h*.14,s*.25,'#64748b');disc(g,p.x+p.w*f+s*.25,p.y+p.h*.16,s*.2,'#64748b')});g.strokeStyle='#facc15';g.lineWidth=3;g.beginPath();g.moveTo(p.x+p.w*.45,p.y+p.h*.2);g.lineTo(p.x+p.w*.41,p.y+p.h*.4);g.lineTo(p.x+p.w*.47,p.y+p.h*.4);g.lineTo(p.x+p.w*.43,p.y+p.h*.6);g.stroke()}
 else (night?ART.moon:ART.sun)(g,p.x+p.w*.85,p.y+p.h*.18,s);kid(g,W/2,p.y+p.h*.9,s*1.1,S.face);txt(g,`Make it feel ${MOODS[Math.min(S.r,1)]}.`,W/2,H*.68,15)}
const foxAt=()=>[[.78,.55],[.2,.72],[.62,.4]][Math.min(S.pi,2)];
function drawFox(g){const{W,H}=A,C=A.col,p=PG(),s=U(),i=Math.min(S.pi,2);page(g,`"${PAGES[i]}"`);if(i===1){g.fillStyle='#3b82f6';g.beginPath();g.ellipse(W/2,p.y+p.h*.72,p.w*.3,p.h*.14,0,0,7);g.fill()}
 if(i===2){g.fillStyle='#eab308';g.beginPath();g.moveTo(W*.5,p.y+p.h*.85);g.quadraticCurveTo(W*.62,p.y+p.h*.2,W*.74,p.y+p.h*.85);g.fill()}
 const[fx,fy]=foxAt();fox(g,p.x+p.w*fx,p.y+p.h*fy,s*.9);hen(g,p.x+p.w*(i===2?.25:.45),p.y+p.h*.55,s);if(S.tip>=0){g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.arc(S.tipx,S.tipy,s*.4,0,7);g.stroke()}
 txt(g,'What does the picture show that the words do not?',W/2,H*.72,13)}
function drawBee(g){const{W,H}=A,C=A.col,p=PG(),s=U()*1.3,bx=W/2,by=p.y+p.h*.55;g.fillStyle=A.mix(C.pn,'#fef9c3',.5);A.paint.rrect(p.x,p.y,p.w,p.h,12);g.fill();
 g.fillStyle=A.alpha('#bae6fd',.9);g.beginPath();g.ellipse(bx+s*.1,by-s*.45,s*.3,s*.18,-.5,0,7);g.fill();g.strokeStyle='#111';g.lineWidth=2;g.beginPath();for(let k=-1;k<2;k+=2){g.moveTo(bx+k*s*.25,by+s*.2);g.lineTo(bx+k*s*.3,by+s*.55)}g.moveTo(bx-s*.55,by-s*.2);g.lineTo(bx-s*.75,by-s*.55);g.stroke();
 g.fillStyle='#facc15';g.beginPath();g.ellipse(bx,by,s*.5,s*.28,0,0,7);g.fill();g.fillStyle='#111';[-.15,.15].forEach(d=>g.fillRect(bx+d*s-s*.05,by-s*.26,s*.1,s*.52));disc(g,bx-s*.55,by,s*.18,'#111');
 S.got.forEach(k=>{const[n,dx,dy]=PARTS.find(q=>q[0]===k);A.paint.label(n,bx+dx*s*1.05,by+dy*s*1.05,{bg:C.gr,col:'#fff',font:'700 13px system-ui'})});
 if(S.tip>=0){const[,dx,dy]=PARTS[S.tip];g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.arc(bx+dx*s*.75,by+dy*s*.7,s*.25,0,7);g.stroke()}
 const nx=PARTS[S.got.length];txt(g,nx?`Tap the ${nx[0]}.`:'Pick the best caption.',W/2,H*.7,15)}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'Words + pictures = the whole story',W/2,H*.45,15);return}
 if(S.won>=lastN()){txt(g,doneText(),W/2,H/2,14);return A.fx.draw(g)}
 ({facts:drawFacts,ill:drawIll,mood:drawMood,fox:drawFox,bee:drawBee})[v](g);A.fx.draw(g)}
const lastN=()=>({facts:1,ill:3,mood:2,fox:3,bee:1}[mode()]||9);
function doneText(){return{facts:'Some things only the picture tells you.',ill:'The picture must match the words.',mood:'Same words. The picture changes the feeling.',fox:'The pictures told a story the words left out.',bee:'Labels name parts. A caption says what it shows.'}[mode()]}
const miss=(t,i)=>{A.sound.miss();S.tip=i==null?-1:i;speak(t);setTimeout(()=>{S.tip=-1;A.redraw()},R()?10:900);A.redraw()};
function win(t){S.won++;S.r++;A.sound.pop();if(S.won<lastN()){speak(t+' Next one.');S.put=[]}else speak(t);buttons();A.redraw();S.want()}
function fact(b){if(mode()!=='facts'||S.won>=1)return;const f=FACTS[S.fi];if(!f)return;const want=BINS.findIndex(x=>x[1]===f[1]);if(b==null)b=want;
 if(b!==want){const m={pic:`The words do not say that. The picture shows it.`,words:`You cannot see wanting. The words tell you.`,both:`The words say "the dog", and the picture shows a dog. That is both.`}[f[1]];return miss(m,b)}
 S.fi++;A.sound.tick();if(S.fi>=FACTS.length)return win('The words and the picture each told you different things.');speak(`Yes. Next: ${FACTS[S.fi][0]}.`);A.redraw()}
function stick(i){if(mode()!=='ill'||S.won>=3)return;const R0=ILL[Math.min(S.r,2)];if(i==null)i=R0.opts.findIndex(k=>R0.need.includes(k)&&!S.put.includes(k));const k=R0.opts[i];if(S.put.includes(k))return;
 if(!R0.need.includes(k))return miss(`${WHY[k]} Read again: ${R0.w}`,i);S.put.push(k);A.sound.tick();if(S.put.length===2)return win('The picture matches the words.');speak(`Yes, the words say ${k==='rain'?'rain':'a '+k}.`);A.redraw()}
function setM(k){if(mode()!=='mood'||S.won>=2)return;S[k]^=1;A.sound.tick();speak(`${S.sky?'Night':'Day'}, ${S.wx?'storm':'sunny'}, Mia ${S.face?'looks worried':'smiles'}.`);A.redraw()}
function moodDone(){if(mode()!=='mood'||S.won>=2)return;const t=MOODS[Math.min(S.r,1)],w=t==='scary'?1:0;
 if(S.sky!==w)return miss(w?'A bright day sky does not feel scary. Make it night.':'A dark night sky feels scary, not happy. Make it day.');
 if(S.wx!==w)return miss(w?'Sunny weather feels calm. A storm feels scary.':'A storm feels scary. Make it sunny.');
 if(S.face!==w)return miss(w?'Mia is smiling. Make her look worried.':'Mia looks worried. Make her smile.');
 win(`Same words, but now the page feels ${t}!`)}
function spot(w,x,y){if(mode()!=='fox'||S.won>=3)return;if(w==null)w='fox';S.tipx=x||0;S.tipy=y||0;
 if(w==='hen')return miss('The words tell you about Hen already. Find what the words leave out.',0);if(w!=='fox')return miss('The words name that place. Look for who follows Hen.',0);
 S.pi++;win(['Yes! A fox. The words never say so.','The fox is in the pond! The words do not say.','The fox is stuck in the hay. Only the picture shows it!'][S.pi-1])}
function label(i){if(mode()!=='bee'||S.won>=1)return;const want=S.got.length;if(want>=3)return;if(i==null)i=want;
 if(i!==want)return miss(`That is the ${PARTS[i][0]}. Find the ${PARTS[want][0]}: ${['the see-through part on top','the feeler on its head','what it stands on'][want]}.`,i);
 S.got.push(PARTS[i][0]);A.sound.tick();speak(`Label: ${PARTS[i][0]}.`);buttons();A.redraw()}
function caption(t){if(mode()!=='bee'||S.got.length<3||S.won>=1)return;if(t==null)t='ok';
 if(t==='short')return miss('"Bee" names it, but a caption should say what the picture shows.');if(t==='off')return miss('That is not about the picture. A caption tells what the picture shows.');win('Labels name the parts. The caption says what the picture shows.')}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;
 if(v==='facts')BINS.forEach(([t],i)=>B(t,()=>fact(i)));
 if(v==='ill')ILL[Math.min(S.r,2)].opts.forEach((k,i)=>B(k,()=>stick(i),`Add a ${k} to the picture`));
 if(v==='mood'){B(S.sky?'Sky: night':'Sky: day',()=>{setM('sky');buttons()});B(S.wx?'Weather: storm':'Weather: sun',()=>{setM('wx');buttons()});B(S.face?'Mia: worried':'Mia: smiling',()=>{setM('face');buttons()});B('Done ✓',moodDone)}
 if(v==='fox')[['Hen','hen'],['A fox','fox'],[['The yard','The pond','The haystack'][Math.min(S.pi,2)],'place']].forEach(([t,w])=>B(t,()=>spot(w)));
 if(v==='bee'){if(S.got.length<3)PARTS.forEach(([n],i)=>B(n,()=>label(i),`This is the ${n}`));else CAPS.forEach(([t,k])=>B(t,()=>caption(k)))}}
function down(p){const v=mode(),{W,H}=A,s=U(),P=PG();if(S.won>=lastN())return false;
 if(v==='facts'&&p.y>H*.76){fact(Math.min(2,Math.floor((p.x-10)/((W-20)/3))))}
 if(v==='ill'){const i=ILL[0].opts.findIndex((k,i)=>Math.hypot(p.x-slot(i).x,p.y-slot(i).y)<s*.5);if(i>=0){S.drag={i,k:ILL[Math.min(S.r,2)].opts[i],x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}
 if(v==='mood'&&p.y<P.y+P.h){if(p.y<P.y+P.h*.35)setM('sky');else if(Math.abs(p.x-W/2)<s*.5)setM('face');else setM('wx');buttons()}
 if(v==='fox'&&p.y<P.y+P.h){const[fx,fy]=foxAt(),i=Math.min(S.pi,2),hx=P.x+P.w*(i===2?.25:.45);if(Math.hypot(p.x-(P.x+P.w*fx),p.y-(P.y+P.h*fy))<s*.5)spot('fox',p.x,p.y);else if(Math.hypot(p.x-hx,p.y-(P.y+P.h*.55))<s*.45)spot('hen',p.x,p.y);else spot('place',p.x,p.y)}
 if(v==='bee'&&S.got.length<3){const bs=s*1.3,bx=W/2,by=P.y+P.h*.55;let best=-1,bd=1e9;PARTS.forEach(([,dx,dy],i)=>{const d=Math.hypot(p.x-(bx+dx*bs*.75),p.y-(by+dy*bs*.7));if(d<bd){bd=d;best=i}});if(bd<bs*.45)label(best)}
 return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;const P=PG();if(Math.hypot(p.x-d.x0,p.y-d.y0)<10||p.y<P.y+P.h)stick(d.i);else A.redraw()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*(gap||300)))}
const fresh=()=>{run++;Object.assign(S,B0())};
const steps=[
{h:'Words or picture?',p:'Read the words. Look at the picture. Where do you find out each thing? Tap a box.',
 predict:{q:'Can a picture tell you something the words do not?',opts:['No, pictures just copy the words','Yes, pictures can add more'],ans:1},task:'Sort all 5 facts',
 show:()=>{steps[0].go();play(FACTS.map(()=>()=>fact()),260)},go:()=>{fresh();speak('Where do you learn that Max is a dog?');buttons();S.want=check(0,()=>S.won>=1,'Some facts come from the words, some from the picture.')}},
{h:'Be the illustrator',p:'Read the words. Drag or tap the two pictures that match them.',task:'Illustrate 3 pages',
 show:()=>{steps[1].go();play([...Array(6)].map(()=>()=>stick()),220)},go:()=>{fresh();speak('Read: '+ILL[0].w);buttons();S.want=check(1,()=>S.won>=3,'An illustrator draws what the words say.')}},
{h:'Set the mood',p:'The words stay the same. Tap the sky, the weather or Mia, or use the buttons. Then tap Done.',
 predict:{q:'Same words, but a dark, stormy picture. Does the story feel the same?',opts:['Yes, the words decide','No, it feels scary now'],ans:1},task:'Make it scary, then happy',
 show:()=>{steps[2].go();play([()=>setM('sky'),()=>setM('wx'),()=>setM('face'),moodDone,()=>setM('sky'),()=>setM('wx'),()=>setM('face'),moodDone].map(f=>()=>{f();buttons()}),230)},go:()=>{fresh();speak('Make the page feel scary. Then make it happy.');buttons();S.want=check(2,()=>S.won>=2,'The picture sets the mood. The words did not change.')}},
{h:'What the words leave out',p:'Read each page. Then tap what the picture shows that the words never say.',
 predict:{q:'The words only talk about Hen. Is Hen the only one in the story?',opts:['Yes, the words say so','No, look at the pictures'],ans:1},task:'Find it on 3 pages',
 show:()=>{steps[3].go();play([0,1,2].map(()=>()=>spot()))},go:()=>{fresh();speak('Read: '+PAGES[0]);buttons();S.want=check(3,()=>S.won>=3,'In some books the pictures tell a second story.')}},
{h:'Labels and captions',p:'Fact books use labels and captions. Tap each part of the bee. Then choose the best caption.',task:'Label the bee and pick a caption',
 show:()=>{steps[4].go();play([()=>label(),()=>label(),()=>label(),()=>caption()],300)},go:()=>{fresh();speak('Tap the wing.');buttons();S.want=check(4,()=>S.won>=1,'A label names a part. A caption tells what the picture shows.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['The words say "Tom ran." The picture shows Tom running in the snow. Where do you learn about the snow?',[['The picture','ok'],['The words','words'],['Nowhere','none']]],
 ['The words say "It was a sunny day." What should the picture show?',[['A sun in the sky','ok'],['A moon and stars','moon'],['A storm','storm']]],
 ['Same words: "Lily opened the door." Picture A is bright. Picture B is dark with a shadow. Which feels scary?',[['Picture B','ok'],['Picture A','bright'],['They feel the same','same']]],
 ['The words only talk about Hen. The pictures show a fox behind her. What do the pictures add?',[['A fox is following Hen','ok'],['Nothing new','nothing'],['Hen is a fox','mix']]],
 ['A photo of a frog has the words "A frog can jump ten times its body length." What are those words?',[['A caption','ok'],['A label','label'],['A title of a story','title']]]];
function why(t){let m='Use the words and the pictures together.';
 if(t==='words')m='The words only say "Tom ran." The snow is in the picture.';
 if(t==='none')m='Look at the picture. The snow is there.';
 if(t==='moon')m='A moon means night, but the words say a sunny day.';
 if(t==='storm')m='A storm does not match "a sunny day". The picture should match.';
 if(t==='bright')m='A bright picture feels safe. Dark and shadows feel scary.';
 if(t==='same')m='The words are the same, but the pictures change the feeling.';
 if(t==='nothing')m='The words never say fox. The pictures add a whole new part.';
 if(t==='mix')m='Hen is a hen. The fox is a different animal, shown only in the pictures.';
 if(t==='label')m='A label is one word naming a part. A sentence about the photo is a caption.';
 if(t==='title')m='It tells about the photo, so it is a caption, not a title.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Good reading.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.7,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
