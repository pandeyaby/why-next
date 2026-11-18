/* Flagship – saying sorry and making up (ages 4–5). After an oops, pick the sorry that names what you did, then drag
   the right fix-it to the hurt child (blocks rebuild the tower, the teddy goes back, a plaster for the sore knee) and
   watch their face and heart fill. Give a sorry to everyone who got hurt, even by accident, mend hurt words with kind
   ones, and choose how to make up. Big pictures, big buttons, very few words. */
(()=>{
/* oops scenes: who did it, who got hurt, words, right fix key, sorry choices [text, tag] */
const OOPS=[{by:'Ben',to:'Mia',what:'Ben knocked down Mia\'s tower.',fix:'blocks',got:'The tower is back up!',
  say:[['Sorry, Mia. I knocked your tower down.','ok'],['It was not me!','fib'],['Ha ha, it fell!','laugh']]},
 {by:'Ava',to:'Leo',what:'Ava grabbed Leo\'s teddy.',fix:'teddy',got:'Leo has his teddy back!',
  say:[['It is mine now.','keep'],['Sorry, Leo. I took your teddy.','ok'],['You are a baby.','mean']]},
 {by:'Sam',to:'Zoe',what:'Sam bumped Zoe. Her knee hurts.',fix:'plaster',got:'A plaster helps Zoe\'s knee.',
  say:[['It was an accident, so no sorry.','acc'],['Get up. You are fine.','shrug'],['Sorry, Zoe. I bumped you.','ok']]}];
/* hurt words and spills: [line, fix key, done line] */
const MORE=[['You said Jo\'s picture is ugly.','kind','Kind words help Jo feel better.','Jo'],['You spilled Raj\'s juice.','cloth','Wipe it up. Raj smiles.','Raj'],
 ['You ripped Kim\'s card.','tape','Tape mends the card.','Kim']];
const KIT={blocks:'Build it again',teddy:'Give it back',plaster:'Get a plaster',kind:'Say a kind thing',cloth:'Wipe it up',tape:'Tape it'};
const NEED={blocks:'the tower built again',teddy:'the teddy back',plaster:'help for the sore knee',kind:'kind words',cloth:'the juice wiped up',tape:'the card mended'};
/* playground: [name, mood, what happened, needs a sorry?] */
const PARK=[['Zoe','cry','You bumped her by mistake',1],['Kai','happy','Kai is on the swing',0],['Raj','sad','You pushed in front of him',1],
 ['Ella','happy','Ella is reading',0],['Jo','cry','Your ball hit her by accident',1]];
/* after a sorry: [what the friend can say, tag] */
const MAKE=[['That is OK. Let us play!','ok'],['Go away for ever!','ever'],['Say sorry ten more times!','more']];
const SAYWHY={fib:'That is a fib. Say what you did.',laugh:'Laughing makes it worse. Say sorry.',keep:'Taking is not fair. Say sorry and give it back.',
 mean:'Mean words hurt more. Say sorry.',acc:'An accident still hurts. Say sorry.',shrug:'Zoe is hurt. Say sorry.'};
VIS.reg('flagsorry',c=>{let A,pad,quiz,qn=-1,run=0,stars=0;c.fig.classList.add('young');
const fresh=()=>({hook:()=>{},wait:0,n:0,k:0,mood:'cry',heart:0,held:'',grab:null,bad:-1,given:[],fixed:0,tray:[]}),S=fresh();
const part=()=>['say','fix','who','words','make','quiz'][A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.15)),fast=()=>A.reduced();
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,w,n,col){g.font=`700 ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const L=[];let s='';
 t.split(' ').forEach(z=>{const q=s?s+' '+z:z;if(g.measureText(q).width>w&&s){L.push(s);s=z}else s=q});L.push(s);const h=sz(n)*1.22;L.forEach((r,i)=>g.fillText(r,x,y+(i-(L.length-1)/2)*h))}
/* a face: round head, eyes, mouth by mood, blue tears when crying */
function face(g,x,y,r,mood,shirt){g.fillStyle=shirt;A.paint.rrect(x-r*.85,y+r*.9,r*1.7,r*1.3,r*.35);g.fill();g.fillStyle='#f1c27d';g.beginPath();g.arc(x,y,r,0,7);g.fill();
 g.strokeStyle='#6b4423';g.lineWidth=2.5;g.stroke();g.fillStyle='#2b1d12';for(const d of[-1,1]){g.beginPath();g.arc(x+d*r*.36,y-r*.1,r*.1,0,7);g.fill()}
 g.lineWidth=3.2;g.beginPath();if(mood==='happy')g.arc(x,y+r*.15,r*.45,.15*Math.PI,.85*Math.PI);else if(mood==='ok'){g.moveTo(x-r*.3,y+r*.5);g.lineTo(x+r*.3,y+r*.5)}
 else g.arc(x,y+r*.7,r*.36,1.15*Math.PI,1.85*Math.PI);g.stroke();
 if(mood==='cry'){g.fillStyle='#38bdf8';for(const d of[-1,1]){g.beginPath();g.ellipse(x+d*r*.38,y+r*.25,r*.08,r*.16,0,0,7);g.fill()}}}
function heart(g,x,y,s,f){const C=A.col;g.save();g.beginPath();g.moveTo(x,y+s*.9);g.bezierCurveTo(x-s*1.4,y,x-s*.7,y-s,x,y-s*.35);g.bezierCurveTo(x+s*.7,y-s,x+s*1.4,y,x,y+s*.9);g.closePath();
 g.lineWidth=3;g.strokeStyle=C.rd;g.stroke();g.clip();g.fillStyle=C.rd;g.fillRect(x-s*1.5,y+s*.9-(s*1.9)*f,s*3,s*1.9*f);g.restore()}
/* the fix-it pictures */
function kit(g,key,x,y,s){g.save();g.lineWidth=2;g.strokeStyle='#1f2937';
 if(key==='blocks')['#ef4444','#3b82f6','#eab308'].forEach((col,i)=>{g.fillStyle=col;g.fillRect(x-s*.5+(i%2)*s*.15,y+s*.25-i*s*.42,s*.6,s*.4);g.strokeRect(x-s*.5+(i%2)*s*.15,y+s*.25-i*s*.42,s*.6,s*.4)});
 if(key==='teddy'){g.fillStyle='#a16207';[[-.3,-.42],[.3,-.42]].forEach(([a,b])=>{g.beginPath();g.arc(x+a*s,y+b*s,s*.16,0,7);g.fill()});g.beginPath();g.arc(x,y-s*.18,s*.3,0,7);g.fill();g.beginPath();g.ellipse(x,y+s*.32,s*.34,s*.3,0,0,7);g.fill()}
 if(key==='plaster'){g.translate(x,y);g.rotate(-.5);g.fillStyle='#fdba74';A.paint.rrect(-s*.55,-s*.18,s*1.1,s*.36,s*.18);g.fill();g.stroke();g.fillStyle='#fed7aa';g.fillRect(-s*.16,-s*.18,s*.32,s*.36)}
 if(key==='kind'){g.fillStyle='#fde68a';A.paint.rrect(x-s*.55,y-s*.4,s*1.1,s*.62,s*.2);g.fill();g.stroke();g.fillStyle='#be123c';g.font=`800 ${s*.34}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText('♥',x,y-s*.1)}
 if(key==='cloth'){g.fillStyle='#93c5fd';g.beginPath();g.moveTo(x-s*.5,y-s*.3);g.quadraticCurveTo(x,y-s*.55,x+s*.5,y-s*.3);g.lineTo(x+s*.4,y+s*.4);g.quadraticCurveTo(x,y+s*.2,x-s*.4,y+s*.4);g.closePath();g.fill();g.stroke()}
 if(key==='tape'){g.fillStyle='#d4d4d8';g.beginPath();g.arc(x,y,s*.42,0,7);g.fill();g.stroke();g.fillStyle=A.col.pn;g.beginPath();g.arc(x,y,s*.16,0,7);g.fill();g.stroke()}g.restore()}
/* what got broken, drawn next to the hurt child; mended once fixed */
function thing(g,i,x,y,s,ok){if(i===0){if(ok)return kit(g,'blocks',x,y,s);['#ef4444','#3b82f6','#eab308'].forEach((col,j)=>{g.save();g.translate(x-s*.5+j*s*.5,y+s*.35);g.rotate(j-.8);g.fillStyle=col;g.fillRect(-s*.2,-s*.15,s*.4,s*.3);g.restore()})}
 if(i===1&&ok)kit(g,'teddy',x,y,s*.8);if(i===2&&ok)kit(g,'plaster',x,y+s*.3,s*.7)}
/* layout */
function row(n,y,h){const{W}=A,gap=10,w=Math.min((W-20-gap*(n-1))/n,190),x0=(W-n*w-gap*(n-1))/2;return Array.from({length:n},(_,k)=>({x:x0+k*(w+gap),y,w,h}))}
const R=()=>Math.min(A.W,A.H)*.085,hurtAt=()=>({x:A.W*.6,y:A.H*.27}),byAt=()=>({x:A.W*.2,y:A.H*.27});
const sayRects=()=>row(3,A.H*.56,A.H*.4),trayRects=()=>{const b=row(3,A.H*.62,A.H*.34);return S.tray.map((k,i)=>S.grab&&S.grab.i===i&&S.grab.x!=null?{...b[i],x:S.grab.x-b[i].w/2,y:S.grab.y-b[i].h/2}:b[i])};
const parkRects=()=>{const n=PARK.length,per=A.narrow?3:n,w=A.W/per,h=A.narrow?A.H*.4:A.H*.62;return PARK.map((_,i)=>{const r=Math.floor(i/per),cnt=Math.min(per,n-r*per),x0=(A.W-cnt*w)/2;return{x:x0+(i%per)*w+3,y:A.H*.1+r*(h+6),w:w-6,h}})};
const makeRects=()=>row(3,A.H*.56,A.H*.4);
function card(g,t,r,on,bad,key){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#fff7ed';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=bad?C.rd:on?C.vi:C.mu;g.lineWidth=bad||on?5:2.5;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();
 if(key){kit(g,key,r.x+r.w/2,r.y+r.h*.36,Math.min(r.w,r.h)*.42);txt(g,t,r.x+r.w/2,r.y+r.h*.8,r.w-10,12)}else txt(g,t,r.x+r.w/2,r.y+r.h/2,r.w-12,13)}
function scene(g,line,byName,toName,i){const C=A.col,r=R(),a=byAt(),b=hurtAt();txt(g,line,A.W/2,A.H*.06,A.W-24,15);
 face(g,a.x,a.y,r,S.mood==='happy'?'happy':'ok','#22c55e');txt(g,byName||'You',a.x,a.y+r*2.5,90,12,C.mu);
 face(g,b.x,b.y,r,S.mood,'#a855f7');txt(g,toName,b.x,b.y+r*2.5,90,12,C.mu);heart(g,b.x+r*1.6,b.y-r*.6,r*.42,S.heart);if(i!=null)thing(g,i,A.W*.86,b.y+r*.6,r*1.2,S.fixed)}
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#fde2e4',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){const r=R();face(g,W*.38,H*.3,r,'happy','#22c55e');face(g,W*.62,H*.3,r,'happy','#a855f7');heart(g,W/2,H*.18,r*.5,1);txt(g,'Say sorry. Help fix it. Play again.',W/2,H*.78,W-30,16);return}
 if(S.n>=goal()){const r=R();face(g,W*.4,H*.3,r,'happy','#22c55e');face(g,W*.6,H*.3,r,'happy','#a855f7');txt(g,wrap(),W/2,H*.7,W-30,15);return A.fx.draw(g)}
 if(v==='say'){const o=OOPS[S.k];scene(g,o.what,o.by,o.to,S.k);sayRects().forEach((r,j)=>card(g,o.say[j][0],r,false,S.bad===j))}
 if(v==='fix'){const o=OOPS[S.k];scene(g,o.to+' is still sad. Help fix it.',o.by,o.to,S.k);dropRing(g);trayRects().forEach((r,j)=>card(g,KIT[S.tray[j]],r,S.held===S.tray[j],S.bad===j,S.tray[j]))}
 if(v==='words'){const m=MORE[S.k];scene(g,m[0],'You',m[3],null);dropRing(g);trayRects().forEach((r,j)=>card(g,KIT[S.tray[j]],r,S.held===S.tray[j],S.bad===j,S.tray[j]))}
 if(v==='who'){txt(g,'Who got hurt? Give them a sorry.',W/2,H*.05,W-20,15);
  parkRects().forEach((rc,i)=>{const[nm,mood,what]=PARK[i],got=S.given.includes(i),r=Math.min(rc.w*.2,rc.h*.15),x=rc.x+rc.w/2,y=rc.y+rc.h*.26;
   g.fillStyle=S.bad===i?A.alpha(C.rd,.15):got?A.alpha(C.gr,.15):A.alpha(C.mu,.06);A.paint.rrect(rc.x,rc.y,rc.w,rc.h,12);g.fill();
   if(S.bad===i){g.strokeStyle=C.rd;g.lineWidth=4;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,12);g.stroke()}face(g,x,y,r,got?'happy':mood,['#a855f7','#22c55e','#f97316','#0ea5e9','#ec4899'][i]);
   txt(g,nm,x,y+r*2.6,rc.w-4,13);txt(g,what,x,rc.y+rc.h*.86,rc.w-8,11,C.mu);if(got)heart(g,x+r*1.2,y-r*1.1,r*.4,1)})}
 if(v==='make'){const o=OOPS[S.k];scene(g,o.by+' said sorry and fixed it. What can '+o.to+' say?',o.by,o.to,S.k);makeRects().forEach((r,j)=>card(g,S.opts[j][0],r,false,S.bad===j))}
 A.fx.draw(g)}
function dropRing(g){const b=hurtAt(),r=R();if(!S.held&&!(S.grab&&S.grab.x!=null))return;g.setLineDash([8,6]);g.strokeStyle=A.col.vi;g.lineWidth=3;g.beginPath();g.arc(b.x,b.y+r*.4,r*2,0,7);g.stroke();g.setLineDash([])}
const goal=()=>({say:3,fix:3,who:3,words:3,make:3}[part()]||99);
const wrap=()=>({say:'Say sorry and say what you did.',fix:'Sorry, then help fix it.',who:'Hurt by mistake still needs a sorry.',words:'Mean words, spills, rips: each has its own fix.',make:'Say: That is OK. Then play again.'}[part()]);
const miss=(t,j)=>{A.sound.miss();S.bad=j==null?-1:j;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:900);A.redraw()};
function deal(){const v=part();S.held='';S.grab=null;S.fixed=0;S.heart=v==='fix'||v==='words'?.35:0;S.mood=v==='fix'||v==='words'?'sad':v==='make'?'ok':'cry';
 if(v==='fix'){const all=['blocks','teddy','plaster'];S.tray=all.slice(S.k).concat(all.slice(0,S.k)).reverse()}
 if(v==='words'){const all=['kind','cloth','tape'];S.tray=all.slice(S.k+1).concat(all.slice(0,S.k+1))}
 if(v==='make'){const r=S.k;S.opts=MAKE.slice(r).concat(MAKE.slice(0,r))}}
function next(t){S.n++;A.sound.pop();if(S.n<goal()){const k=S.k;S.wait=1;setTimeout(()=>{if(S.k!==k)return;S.wait=0;S.k++;deal();tell(t+' Next one.');buttons();A.redraw()},fast()?5:700);tell(t)}else{tell(t);buttons()}A.redraw();S.hook()}
function sorry(j){if(part()!=='say'||S.n>=3||S.wait)return;const[w,tag]=OOPS[S.k].say[j];if(tag!=='ok')return miss(SAYWHY[tag],j);S.mood='sad';S.heart=.35;next(`"${w}" Good sorry! ${OOPS[S.k].to} is still a bit sad.`)}
function mend(key){const v=part();if(!(v==='fix'||v==='words')||S.n>=3||S.wait)return;const want=v==='fix'?OOPS[S.k].fix:MORE[S.k][1],who=v==='fix'?OOPS[S.k].to:MORE[S.k][3],j=S.tray.indexOf(key);S.held='';
 if(key!==want)return miss(`${KIT[key]}? ${who} needs ${NEED[want]}.`,j);S.fixed=1;S.mood='happy';A.tween(S,{heart:1},500,'out');S.tray=S.tray.filter(k=>k!==key);next(v==='fix'?OOPS[S.k].got:MORE[S.k][2])}
function give(i){if(part()!=='who'||S.n>=3||S.given.includes(i))return;const[nm,,what,need]=PARK[i];if(!need)return miss(`${nm} is happy. Nothing went wrong, so no sorry is needed.`,i);
 S.given.push(i);S.n++;A.sound.pop();tell(`Sorry, ${nm}! ${what}.`+(S.n<3?' Who else got hurt?':''));buttons();A.redraw();S.hook()}
function makeUp(j){if(part()!=='make'||S.n>=3||S.wait)return;const tag=S.opts[j][1],to=OOPS[S.k].to;
 if(tag==='ever')return miss(`Not for ever. ${OOPS[S.k].by} said sorry and fixed it. You can be friends again.`,j);if(tag==='more')return miss('One real sorry is enough. Now you can play.',j);S.mood='happy';S.heart=1;next(`${to} says: That is OK. Friends again!`)}
function pick(key){S.held=key;A.sound.tick();tell(`Holding: ${KIT[key]}. Tap your friend to give it.`);A.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(v==='quiz'||S.n>=goal())return;
 if(v==='say')OOPS[S.k].say.forEach((s,j)=>B(s[0],()=>sorry(j)));
 if(v==='fix'||v==='words')S.tray.forEach(k=>B(KIT[k],()=>mend(k),`Give: ${KIT[k]}`));
 if(v==='who')PARK.forEach(([nm,,what],i)=>{if(!S.given.includes(i))B(nm,()=>give(i),`Give a sorry to ${nm}: ${what}`)});
 if(v==='make')S.opts.forEach((o,j)=>B(o[0],()=>makeUp(j)))}
const inside=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h,onHurt=p=>{const b=hurtAt();return Math.hypot(p.x-b.x,p.y-b.y-R()*.4)<R()*2.3};
function down(p){const v=part();if(S.n>=goal())return false;
 if(v==='fix'||v==='words'){const i=trayRects().findIndex(r=>inside(p,r));if(i>=0){S.grab={i,x:null,x0:p.x,y0:p.y};return true}if(onHurt(p)&&S.held)mend(S.held);return false}
 if(v==='say'){const j=sayRects().findIndex(r=>inside(p,r));if(j>=0)sorry(j)}
 if(v==='make'){const j=makeRects().findIndex(r=>inside(p,r));if(j>=0)makeUp(j)}
 if(v==='who'){const i=parkRects().findIndex(r=>inside(p,r));if(i>=0)give(i)}return false}
function move(p){const d=S.grab;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab;S.grab=null;if(!d)return;const key=S.tray[d.i];if(d.x==null)return pick(key);if(onHurt(p))mend(key);else A.redraw()}
const finish=(n,msg)=>()=>{if(A.step===n&&S.n>=goal()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(fns,gap){const k=++run;fns.forEach((f,j)=>setTimeout(()=>{if(k===run)f()},fast()?j*60+30:(j+1)*gap))}
const restart=()=>{run++;Object.assign(S,fresh());if(A)deal()};
const steps=[
{h:'Say sorry',p:'Oops! Something went wrong. Tap the best sorry.',task:'Say sorry 3 times',
 show:()=>{steps[0].go();auto([0,1,2].map(()=>()=>sorry(OOPS[S.k].say.findIndex(s=>s[1]==='ok'))),900)},
 go:()=>{restart();tell(OOPS[0].what+' What does Ben say?');buttons();S.hook=finish(0,'A good sorry says what you did.')}},
{h:'Help fix it',p:'Drag the fix-it to the sad child. Or tap a button.',predict:{q:'Ben said sorry. Is Mia happy again now?',opts:['Yes, sorry fixes it all','Not yet: help build the tower'],ans:1},task:'Fix 3 things',
 show:()=>{steps[1].go();auto([0,1,2].map(()=>()=>mend(OOPS[S.k].fix)),900)},
 go:()=>{restart();tell(OOPS[0].to+' is still sad. What will help?');buttons();S.hook=finish(1,'Sorry is the start. Helping fix it makes it better.')}},
{h:'Who got hurt?',p:'Tap each child who got hurt to say sorry.',predict:{q:'You bump Zoe by mistake. Do you say sorry?',opts:['No, it was an accident','Yes, Zoe is hurt'],ans:1},task:'Find 3 hurt children',
 show:()=>{steps[2].go();auto(PARK.map((k,i)=>k[3]?()=>give(i):null).filter(Boolean),700)},
 go:()=>{restart();tell('Who got hurt? Look at the faces.');buttons();S.hook=finish(2,'Look at faces. If someone is hurt, say sorry, even for a mistake.')}},
{h:'Words can hurt',p:'Mean words and spills hurt too. Drag the right fix-it.',task:'Fix 3 more',
 show:()=>{steps[3].go();auto([0,1,2].map(()=>()=>mend(MORE[S.k][1])),900)},
 go:()=>{restart();tell(MORE[0][0]+' What helps?');buttons();S.hook=finish(3,'Each oops has its own fix.')}},
{h:'Friends again',p:'Your friend said sorry and helped. What can you say?',task:'Make up 3 times',
 show:()=>{steps[4].go();auto([0,1,2].map(()=>()=>makeUp(S.opts.findIndex(o=>o[1]==='ok'))),900)},
 go:()=>{restart();tell('What can Mia say to Ben?');buttons();S.hook=finish(4,'Say: That is OK. Then play again.')}},
{h:'Challenge',p:'',go:()=>{restart();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['You knocked over Tom\'s blocks. What helps most?',[['Say sorry and build them again','ok'],['Say sorry and run off','run'],['Say nothing','none']]],
 ['You stepped on Ana\'s toe by mistake. What do you do?',[['Say sorry. Is your toe OK?','ok'],['Nothing. It was a mistake.','acc'],['Laugh','laugh']]],
 ['You took Kai\'s crayon. What fixes it?',[['Give it back and say sorry','ok'],['Keep it. Say sorry.','keep'],['Hide it','none']]],
 ['Mia said: You are silly. Then she said sorry. What can you say?',[['That is OK. Let us play.','ok'],['Never play with me again!','ever'],['Be mean back','mean']]],
 ['You spilled Raj\'s juice. What helps?',[['Say sorry and wipe it up','ok'],['Say: it was the cup\'s fault','fib'],['Walk away','run']]]];
function why(t){let m='Say sorry, then help put it right.';
 if(t==='run')m='Sorry is a start, but help fix it too.';if(t==='none')m='Saying nothing leaves your friend sad. Say sorry and help.';
 if(t==='acc')m='A mistake can still hurt. Say sorry and check they are OK.';if(t==='laugh')m='Laughing makes it worse. Say sorry.';
 if(t==='keep')m='Sorry is not enough if you keep it. Give it back.';if(t==='ever')m='One fall-out is not for ever. You can make up.';
 if(t==='mean')m='Being mean back hurts more. Make up instead.';if(t==='fib')m='That is a fib. Say what you did, then help.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! Sorry and fix it.':'✗ '+why(t)}${ok?` Hearts in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);restart();A.gest({down,move,up});buttons()}});
A.start()})})();
