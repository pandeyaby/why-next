/* Flagship – making a picture in my head (ages 7–9; Pressley 1976; Gambrell and Bales 1986; Hegarty and Kozhevnikov
   1999). Build a harbour from the words, change it when new sentences arrive, catch a picture that does not fit,
   picture a problem simply (posts and gaps, a line of children), and rebuild a room from memory. Data: mindpic_art.js. */
(()=>{const {ZONES,BUILD,NEWS,MEM,FIT,PROB,DESC,DONE,TXT,QS}=MINDPIC;
VIS.reg('flagmindpic',c=>{let A,ctl,chal,art,qn=-1,epoch=0;const S={};
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif';
const step=()=>['build','news','fit','prob','mem','quiz'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.15);
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function back(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();
 g.lineWidth=o.no||o.ok||o.sel?3.5:1.6;g.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;g.stroke();let n=sz(o.n||14);g.font=`800 ${n}${F}`;
 while(g.measureText(t).width>r.w-8&&n>8){n--;g.font=`800 ${n}${F}`}g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
const trayR=(i,n)=>{const h=Math.min(A.H*.1,42),w=Math.min(140,(A.W-16-6*(n-1))/n);return{x:(A.W-(n*w+6*(n-1)))/2+i*(w+6),y:A.H-h-6,w,h}};
/* lay out the words on top, the picture in the middle and the tray at the bottom; remember it for taps */
function frame(text,o){const th=text?art.page(text,A.H*.025,o):0,y=A.H*.025+th+6,h=A.H-y-Math.min(A.H*.1,42)-16;S.L={R:{x:8,y,w:A.W-16,h}};return S.L.R}
const zR=(scene,z)=>{const R=S.L.R,Z=ZONES[scene][z];return{x:R.x+R.w*Z.x,y:R.y+R.h*Z.y,w:R.w*Z.w,h:R.h*Z.h}};
const unit=()=>{const R=S.L.R;return Math.min(R.w*.07,R.h*.13,30)};
/* ---------- scenes shared by the build, new-sentence and memory steps ---------- */
function sceneOf(){return step()==='mem'?'room':'harbour'}
/* each place has a spot where things rest: [x, y of the surface, how far the thing's bottom sits below its centre in units] */
const BASE={cat:.45,gull:.22,gulls:.22,crab:.34,lamp:.43,ball:.3,clock:0,boat:0};
function spot(sc,z,k,u){const R=S.L.R,X=f=>R.x+R.w*f,Y=f=>R.y+R.h*f,b=(BASE[k]||0)*u;
 if(sc==='harbour'){if(z==='end')return k==='boat'?[X(.87),Y(.47)]:[X(.72),Y(.43)-b];if(z==='roof')return[X(.87),Y(.47)-u*.45-b];if(z==='post')return[X(.22),Y(.3)-b];
  if(z==='jetty')return[X(.5),Y(.43)-b];if(z==='under')return[X(.51),Y(.64)];if(z==='sand')return[X(.09),Y(.86)-b];return[X(.55),Y(.08)]}
 if(z==='desk')return[X(.18),Y(.52)-b];if(z==='bed')return[X(.78),Y(.56)-b];if(z==='underbed')return[X(.74),Y(.78)-b];if(z==='door')return[X(.42),Y(.11)];
 if(z==='window')return[X(.8),Y(.16)];return[X(.18),Y(.9)-b]}
function where(s,k){const z=s.pos[k];if(!z)return null;const same=Object.keys(s.pos).filter(q=>s.pos[q]===z),i=same.indexOf(k),u=unit(),[x,y]=spot(sceneOf(),z,k,u);return{x:x+(i-(same.length-1)/2)*u*1.25,y}}
function drawScene(s,text,tray,o){const sc=sceneOf(),R=frame(text,o);sc==='room'?art.room(R):art.harbour(R);const u=unit(),g=A.ctx;
 if(s.sel||s.drag)Object.keys(ZONES[sc]).forEach(z=>{if(z==='roof'&&s.pos.boat!=='end')return;const r=zR(sc,z);g.setLineDash([5,4]);g.strokeStyle='#1d4ed8';g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,8);g.stroke();g.setLineDash([])});
 Object.keys(s.pos).forEach(k=>{if(s.drag&&s.drag.k===k)return;const P=where(s,k);art.thing(k,P.x,P.y,u)});
 tray.forEach((k,i)=>{if(s.drag&&s.drag.k===k)return;tile(trayR(i,tray.length),k==='gulls'?'2 gulls':k,{sel:s.sel===k,no:s.bad===k})});
 if(s.drag){art.thing(s.drag.k,s.drag.x,s.drag.y,u*1.2)}}
function zoneAt(p){const sc=sceneOf();return Object.keys(ZONES[sc]).find(z=>inR(p,zR(sc,z)))}
function grabAt(s,p,tray){const i=tray.findIndex((_,i)=>inR(p,trayR(i,tray.length)));if(i>=0)return tray[i];const u=unit();return Object.keys(s.pos).find(k=>{const P=where(s,k);return Math.abs(p.x-P.x)<u*1.1&&Math.abs(p.y-P.y)<u*1.1})}
/* ---------- 1. build the picture from the words ---------- */
const buildTray=()=>BUILD.pieces.map(P=>P.k).filter(k=>!S.a.pos[k]);
function placeBuild(k,z){const s=S.a,P=BUILD.pieces.find(q=>q.k===k),Z=ZONES.harbour[z];s.sel=null;if(!P||!Z)return;
 if(z==='roof'&&s.pos.boat!=='end'){s.bad=k;A.sound.miss();return say('There is no boat yet. Put the boat in first: the words say the cat sleeps on its roof.')}
 if(z!==P.want){s.bad=k;A.sound.miss();return say(`Not ${Z.t}. Read it again: "${P.line}"`)}
 s.pos[k]=z;s.bad='';A.sound.pop();const left=buildTray().length;say(`Yes: the ${k} is ${Z.t}.`+(left?` ${left} to go.`:' Every detail is in the picture.'))}
/* ---------- 2. a new sentence changes the picture ---------- */
function placeNews(k,z){const s=S.b,N=NEWS[s.u];s.sel=null;if(!N)return;const Z=ZONES.harbour[z];
 if(k!==N.k){s.bad=k;A.sound.miss();return say(`The new sentence does not move the ${k}. Read it: "${N.line}"`)}
 if(z!==N.want){s.bad=k;A.sound.miss();return say(`Not ${Z.t}. The new sentence says: "${N.line}"`)}
 s.pos[k]=z;s.bad='';s.u++;A.sound.pop();say(`Yes: ${k==='gulls'?'2 more gulls are':'the '+k+' is'} ${Z.t} now.`+(s.u<NEWS.length?' Next sentence.':' The picture fits the whole story.'))}
/* ---------- 3. does the picture fit the words? ---------- */
function tapPart(k){const s=S.c,R=FIT[s.r];if(!R)return;
 if(k!==R.odd){s.bad=k;A.sound.miss();return say(`The ${k} ${k==='balls'?'fit':'fits'} the words. Find the part that does not.`)}
 s.bad='';s.r++;A.sound.pop();say(R.yes+(s.r<FIT.length?' Next picture.':' When a picture and the words do not match, reread.'))}
/* ---------- 4. picture a problem simply ---------- */
function drawProb(){const s=S.d,g=A.ctx;back();if(s.p>=PROB.length){const R=frame('Both problems solved with simple pictures.',{ok:1});const y1=R.y+R.h*.28,y2=R.y+R.h*.62;g.textAlign='center';g.textBaseline='middle';for(let i=0;i<5;i++){const x=postX(i);g.fillStyle=A.col.dark?'#e2e8f0':INK;g.beginPath();g.arc(x,y1,7,0,7);g.fill();if(i){g.strokeStyle='#3b82f6';g.lineWidth=4;g.beginPath();g.moveTo(postX(i-1)+8,y1);g.lineTo(x-8,y1);g.stroke();g.font=`800 ${sz(12)}${F}`;g.fillStyle=A.col.dark?'#93c5fd':'#1d4ed8';g.fillText('2 m',(postX(i-1)+x)/2,y1-16)}}g.font=`800 ${sz(14)}${F}`;g.fillStyle=A.col.dark?'#f8fafc':INK;g.fillText('5 posts, 4 gaps: 4 × 2 m = 8 m',R.x+R.w/2,y1+30);const w=Math.min((R.w-20)/10,40);for(let i=0;i<10;i++){const x=R.x+R.w*.05+i*w+w/2;g.fillStyle=i===3?'#f59e0b':i>3?'#22c55e':'#cbd5e1';g.beginPath();g.arc(x,y2,w*.38,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke()}g.font=`800 ${sz(14)}${F}`;g.fillStyle=A.col.dark?'#f8fafc':INK;g.fillText('3 in front, Sam, 6 behind',R.x+R.w/2,y2+w*.5+18);return}
 const P=PROB[s.p],R=frame(P.q,{no:!!s.bad});g.fillStyle='#ffffff';A.paint.rrect(R.x,R.y,R.w,R.h,10);g.fill();g.strokeStyle=RIM;g.lineWidth=1.2;g.stroke();
 if(s.ph==='pick'){[0,1].forEach(k=>{const r=pickR(k);g.fillStyle=k?'#f8fafc':'#ecfccb';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=s.bad===(k?'simple':'fancy')?NO:RIM;g.lineWidth=2;g.stroke();
   const y=r.y+r.h*.62;for(let i=0;i<5;i++){const x=r.x+r.w*(.12+i*.19);if(k){g.fillStyle=INK;g.beginPath();g.arc(x,y,5,0,7);g.fill();if(i<4){g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(x+6,y);g.lineTo(x+r.w*.19-6,y);g.stroke()}}
    else{g.fillStyle='#92400e';g.fillRect(x-4,y-r.h*.3,8,r.h*.3);g.fillStyle=['#f472b6','#facc15','#a78bfa','#fb923c','#f472b6'][i];g.beginPath();g.arc(x+r.w*.08,y+6,5,0,7);g.fill();g.fillStyle='#ffffff';g.beginPath();g.arc(x+r.w*.05,r.y+r.h*.2,8,0,7);g.fill()}}
   g.font=`800 ${sz(12)}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(k?'Dots and gaps':'Every flower and cloud',r.x+r.w/2,r.y+r.h*.88)});return}
 if(s.p===0){const y=R.y+R.h*.5;g.strokeStyle='#94a3b8';g.lineWidth=2;g.beginPath();g.moveTo(R.x+R.w*.06,y);g.lineTo(R.x+R.w*.94,y);g.stroke();
  for(let i=0;i<s.n;i++){const x=postX(i);g.fillStyle=INK;g.beginPath();g.arc(x,y,7,0,7);g.fill();if(i){g.strokeStyle='#2563eb';g.lineWidth=4;g.beginPath();g.moveTo(postX(i-1)+8,y);g.lineTo(x-8,y);g.stroke();
   g.font=`800 ${sz(12)}${F}`;g.fillStyle='#1d4ed8';g.textAlign='center';g.fillText('2 m',(postX(i-1)+x)/2,y-16)}}
  g.font=`700 ${sz(12)}${F}`;g.fillStyle=INK;g.textAlign='center';g.fillText(s.n<5?`Tap the line to add posts: ${s.n} of 5`:`5 posts, ${s.n-1} gaps`,R.x+R.w/2,R.y+R.h*.82)}
 else{for(let i=0;i<10;i++){const r=kidR(i),sam=s.n===4;g.fillStyle=sam&&i===3?'#f59e0b':sam&&i>3?'#22c55e':'#cbd5e1';g.beginPath();g.arc(r.x+r.w/2,r.y+r.h/2,r.w*.38,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke()}
  g.font=`700 ${sz(12)}${F}`;g.fillStyle=INK;g.textAlign='left';g.fillText('front →',R.x+6,R.y+R.h*.2);g.textAlign='center';g.fillText(s.n===4?'Sam is orange. Count the green ones behind.':'Tap Sam: the 4th from the front',R.x+R.w/2,R.y+R.h*.82)}
 if(s.ph==='ans')P.opts.forEach(([t,k],i)=>tile(trayR(i,3),t,{no:s.bad===k,n:16}))}
const pickR=k=>{const R=S.L.R,w=(R.w-24)/2;return{x:R.x+8+k*(w+8),y:R.y+8,w,h:R.h-16}};
const postX=i=>{const R=S.L.R;return R.x+R.w*(.12+i*.19)};
const kidR=i=>{const R=S.L.R,w=Math.min((R.w-20)/10,40);return{x:R.x+R.w*.05+i*w,y:R.y+R.h*.35,w,h:w}};
function pickPic(k){const s=S.d;if(s.ph!=='pick')return;if(k==='fancy'){s.bad='fancy';A.sound.miss();return say('Pretty, but the flowers and clouds do not help you count. Pick the picture that shows only the posts and the gaps.')}
 s.bad='';s.ph='build';A.sound.pop();say('Dots for posts, lines for gaps. Now tap the line to put in 5 posts.')}
function addPost(){const s=S.d;if(s.p!==0||s.ph!=='build'||s.n>=5)return;s.n++;A.sound.tick();if(s.n<5)return say(`${s.n} post${s.n>1?'s':''}, ${s.n-1} gap${s.n===2?'':'s'}.`);s.ph='ans';say('5 posts, but only 4 gaps. How far from the first post to the last?')}
function markKid(i){const s=S.d;if(s.p!==1||s.ph!=='build')return;if(i!==3){s.bad='kid';A.sound.miss();return say(`That is child number ${i+1} from the front. Sam is 4th: count 1, 2, 3, 4 from the front.`)}
 s.n=4;s.bad='';s.ph='ans';A.sound.pop();say('That is Sam. 3 in front, Sam, and the rest behind. How many behind Sam?')}
function answer(k){const s=S.d,P=PROB[s.p];if(!P||s.ph!=='ans')return;if(k!=='ok'){s.bad=k;A.sound.miss();return say(P.why[k])}
 s.bad='';A.sound.pop();const msg=P.yes;s.p++;s.ph='build';s.n=0;say(msg+(s.p<PROB.length?' Next problem.':''))}
/* ---------- 5. remember with the picture ---------- */
const memTray=()=>MEM.pieces.map(P=>P.k).filter(k=>!S.e.pos[k]);
function placeMem(k,z){const s=S.e,P=MEM.pieces.find(q=>q.k===k);s.sel=null;if(!P)return;if(!s.hid)return say('First read the words and picture the room. Then tap Hide the words.');
 if(z!==P.want){s.bad=k;A.sound.miss();return say(`Not ${ZONES.room[z].t}. Think back to your picture: ${P.q}`)}
 s.pos[k]=z;s.bad='';A.sound.pop();const left=memTray().length;say(`Yes: the ${k} is ${ZONES.room[z].t}.`+(left?` ${left} to go.`:' The whole room, from the picture in your head.'))}
function hide(v){const s=S.e;if(v&&!s.hid){s.hid=1;say('The words are hidden. Picture the room, then put each thing back.')}else if(!v&&s.hid){s.hid=0;s.peeks++;say('Peeking at the words. Make the picture, then hide them again.')}}
/* ---------- wiring ---------- */
function ctx(){const k=step();return k==='build'?{s:S.a,tray:buildTray(),put:placeBuild}:k==='news'?{s:S.b,tray:NEWS[S.b.u]&&NEWS[S.b.u].fresh&&!S.b.pos.gulls?['gulls']:[],put:placeNews}:k==='mem'?{s:S.e,tray:S.e.hid?memTray():[],put:placeMem}:null}
function draw(){const k=step(),g=A.ctx;back();if(k==='quiz'){const R=frame('Challenge: picture it, check it, keep it simple.',{ok:1});art.harbour(R);return}
 if(k==='build'){const s=S.a;drawScene(s,BUILD.text,buildTray(),{ok:!buildTray().length,no:!!s.bad})}
 if(k==='news'){const s=S.b,N=NEWS[s.u];drawScene(s,N?`New sentence ${s.u+1} of 3: ${N.line}`:'The picture fits all three new sentences.',ctx().tray,{ok:!N,no:!!s.bad,fill:'#ecfeff'})}
 if(k==='fit'){const s=S.c,R0=FIT[s.r];if(!R0){const R=frame('All three mismatches caught.',{ok:1});art.street(R,FIT[2].pic&&{house:.6,tree:.25,sun:.25});return}const R=frame(R0.text,{no:!!s.bad});S.L.parts=art.street(R,R0.pic);
  if(s.bad&&S.L.parts[s.bad]){const r=S.L.parts[s.bad];g.strokeStyle=NO;g.lineWidth=3;g.strokeRect(r.x,r.y,r.w,r.h)}}
 if(k==='prob')drawProb();
 if(k==='mem'){const s=S.e,fin=!memTray().length;drawScene(s,s.hid?(fin?'Room rebuilt from memory.':'Words hidden. Use the picture in your head.'):MEM.text,ctx().tray,{ok:fin,no:!!s.bad});
  if(!s.hid)tile(trayR(0,1),'Hide the words',{n:15,sel:1})}
 A.fx.draw(A.ctx)}
function down(p){const k=step();
 if(k==='fit'){const parts=S.L.parts||{},q=Object.keys(parts).find(q=>inR(p,parts[q]));if(q)tapPart(q);return false}
 if(k==='prob'){const s=S.d;if(s.ph==='pick'){[0,1].forEach(q=>{if(inR(p,pickR(q)))pickPic(q?'simple':'fancy')})}
  else if(s.ph==='ans'){const i=[0,1,2].find(i=>inR(p,trayR(i,3)));if(i!=null)answer(PROB[s.p].opts[i][1])}
  else if(s.p===0&&inR(p,S.L.R))addPost();else if(s.p===1){const i=[...Array(10).keys()].find(i=>inR(p,kidR(i)));if(i!=null)markKid(i)}return false}
 if(k==='mem'&&!S.e.hid){if(inR(p,trayR(0,1)))hide(1);return false}
 const C=ctx();if(!C)return false;const g=grabAt(C.s,p,C.tray);if(g){C.s.drag={k:g,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 if(C.s.sel){const z=zoneAt(p);if(z)C.put(C.s.sel,z)}return false}
function move(p){const C=ctx();if(C&&C.s.drag){C.s.drag.x=p.x;C.s.drag.y=p.y;A.redraw()}}
function up(){const C=ctx();if(!C||!C.s.drag)return;const d=C.s.drag;C.s.drag=null;const z=zoneAt(d);
 if(Math.hypot(d.x-d.x0,d.y-d.y0)>12&&z)C.put(d.k,z);else{C.s.sel=d.k;say(`${d.k==='gulls'?'2 gulls':'The '+d.k} picked up. Tap a place in the picture, or use the buttons.`)}}
function fresh(){epoch++;for(const k in S)delete S[k];Object.assign(S,{L:{R:{x:0,y:0,w:1,h:1}},a:{pos:{},sel:null,drag:null,bad:''},b:{u:0,pos:{boat:'end',cat:'roof',gull:'post',crab:'under'},sel:null,drag:null,bad:''},
 c:{r:0,bad:''},d:{p:0,ph:'pick',n:0,bad:''},e:{pos:{},hid:0,peeks:0,sel:null,drag:null,bad:''},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){fresh();say(DESC[i]);S.check=finish(i,ok,DONE[i])}
function demo(i,list){steps[i].go();const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function buttons(){if(!ctl)return;ctl.innerHTML='';const k=step(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};const C=ctx();
 if(C){if(k==='mem')B(S.e.hid?'Peek at the words':'Hide the words',()=>hide(!S.e.hid));
  const movable=k==='news'?(NEWS[S.b.u]?[NEWS[S.b.u].k]:[]):C.tray;
  if(C.s.sel)Object.keys(ZONES[sceneOf()]).forEach(z=>{if(!(z==='roof'&&k==='build'&&S.a.pos.boat!=='end'))B(`Put it ${ZONES[sceneOf()][z].t}`,()=>C.put(C.s.sel,z))});
  else movable.concat(k==='news'&&NEWS[S.b.u]?['gull']:[]).forEach(q=>{if(k!=='mem'||S.e.hid)B(`Pick up the ${q==='gulls'?'2 gulls':q}`,()=>{C.s.sel=q;say(`${q==='gulls'?'2 gulls':'The '+q} picked up. Now choose a place.`)})})}
 if(k==='fit'&&S.c.r<FIT.length)Object.keys(S.L.parts||{}).forEach(q=>B(`The ${q}`,()=>tapPart(q),`The ${q} does not fit`));
 if(k==='prob'){const s=S.d;if(s.ph==='pick'){B('Every flower and cloud',()=>pickPic('fancy'));B('Dots and gaps',()=>pickPic('simple'))}
  else if(s.ph==='ans'&&PROB[s.p])PROB[s.p].opts.forEach(([t,q])=>B(t,()=>answer(q)));else if(s.p===0&&s.n<5)B('Add a post',addPost);else if(s.p===1)[2,3,4].forEach(i=>B(`Child ${i+1} from the front`,()=>markKid(i)))}}
const steps=[
{h:'Build the picture',p:TXT[0],task:'Put all 4 things where the words say',show:()=>demo(0,BUILD.pieces.map(P=>[220,()=>placeBuild(P.k,P.want)])),go:()=>enter(0,()=>!buildTray().length)},
{h:'A new sentence',p:TXT[1],predict:{q:'Next you read: "The cat wakes up and jumps onto the jetty." What do you do with your picture?',opts:['Keep the cat on the boat roof','Move the cat to the jetty'],ans:1},task:'Change the picture for all 3 sentences',
 show:()=>demo(1,NEWS.map(N=>[240,()=>placeNews(N.k,N.want)])),go:()=>enter(1,()=>S.b.u>=NEWS.length)},
{h:'Does it fit?',p:TXT[2],predict:{q:'Your picture does not match the words. What should you do?',opts:['Reread the words and fix it','Keep reading and ignore it'],ans:0},task:'Find the mismatch in 3 pictures',
 show:()=>demo(2,FIT.map(R=>[240,()=>tapPart(R.odd)])),go:()=>enter(2,()=>S.c.r>=FIT.length)},
{h:'Picture a problem',p:TXT[3],predict:{q:'To solve a word problem, which picture helps more?',opts:['A detailed drawing of everything','A simple one: dots and gaps'],ans:1},task:'Solve both problems with a picture',
 show:()=>demo(3,[[150,()=>pickPic('simple')],...[0,1,2,3,4].map(()=>[110,addPost]),[160,()=>answer('ok')],[160,()=>markKid(3)],[160,()=>answer('ok')]]),go:()=>enter(3,()=>S.d.p>=PROB.length)},
{h:'Remember it',p:TXT[4],predict:{q:'You must remember where 4 things are, with the words hidden. What helps most?',opts:['Say the words over and over','Make a picture, then remember it'],ans:1},task:'Rebuild the room from memory',
 show:()=>demo(4,[[150,()=>hide(1)],...MEM.pieces.map(P=>[200,()=>placeMem(P.k,P.want)])]),go:()=>enter(4,()=>!memTray().length)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Build the picture from the details in the words, change it when they change, and check it against them.';
 if(t==='any')m='Your picture has to come from the words: where things are and how many. Do not add or move things the words do not say.';
 if(t==='keep')m='When a new sentence changes a detail, change your picture too, or it stops matching the story.';
 if(t==='ignore')m='A picture that does not fit is a signal: stop, reread the sentence and fix the picture before you go on.';
 if(t==='fancy')m='Decorations do not help. Picture only what matters for the question: where things are and how many.';
 if(t==='posts')m='Picture the posts as dots: 4 posts make only 3 gaps, and 3 gaps of 5 m is 15 m.';
 if(t==='skip')m='Picturing what you read helps you understand it and remember it later, so keep a picture going as you read.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;buttons()},
 init:X=>{A=X;art=MINDPIC.SHAPES(A);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Picture in my head lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
