/* Flagship: palaeoart and speculation (ages 9–11; topic evidence: say which parts of a dinosaur picture come from fossils and
   which are informed guesses, how skin impressions and feather fossils improved pictures, and how Velociraptor went from
   scaly to feathered). Sort features into fossil / guess, build a reconstruction layer by layer, drag a timeline through four
   discoveries, match rare fossil clues to what they reveal, and check a museum label. Every drag and tap has a button. */
(()=>{
const {KEEP,LAYERS,YEARS,CLUES,CLUEBOX,LABEL,LABELBOX,BANK,WHY}=PALARTART;
const P={ink:'#111827',soft:'#374151',paper:'#fffdf8',line:'#1f2937',note:'#fef9c3',ok:'#166534',okBg:'#dcfce7',bad:'#9f1239',
 rock:'#e7e5e4',rockE:'#57534e',guess:'#ede9fe',guessE:'#5b21b6',boneC:'#f5f5f4',skinC:'#86efac',featC:'#c2410c',stripe:'#fff7ed'};
VIS.reg('flagpalart',c=>{let A,X,btns,chal,ask=-1,seq=0,streak=0;const S={after:()=>{}};
const px=n=>Math.round(n*(A.narrow?1.03:1.1));
function speak(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function txt(s,x,y,n,col,w,al){X.font=`${w||800} ${px(n)}px system-ui,sans-serif`;X.fillStyle=col||P.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function wrap(s,w,n,wt){X.font=`${wt||800} ${px(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const word of String(s).split(' ')){const t=cur?cur+' '+word:word;if(cur&&X.measureText(t).width>w){out.push(cur);cur=word}else cur=t}out.push(cur);return out}
function box(x,y,w,h,f,e,lw,r){A.paint.rrect(x,y,w,h,r||12);X.fillStyle=f;X.fill();if(e){X.lineWidth=lw||2;X.strokeStyle=e;X.stroke()}}
function inside(s,R,n,col,wt){const L=wrap(s,R.w-px(14),n,wt),lh=px(n)+4;L.forEach((t,i)=>txt(t,R.x+R.w/2,R.y+R.h/2+(i-(L.length-1)/2)*lh,n,col,wt))}
const hit=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
const kind=()=>['keep','build','years','clues','label','quiz'][A.step];
const wrong=s=>{S.bad=true;S.msg=s;A.sound.miss();talk()};
const right=s=>{S.bad=false;S.msg=s;A.sound.pop()};
function head(s,won){const L=wrap(s,A.W-44,15),lh=px(15)+4,h=Math.max(px(38),L.length*lh+12);box(12,10,A.W-24,h,won?P.okBg:P.note,won?P.ok:P.line,2);L.forEach((t,i)=>txt(t,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,15,won?P.ok:P.ink));return 10+h}
function foot(){if(!S.msg)return 0;const L=wrap((S.bad?'✗ ':'✓ ')+S.msg,A.W-44,13),lh=px(13)+5,h=L.length*lh+12,y=A.H-h-10;box(12,y,A.W-24,h,'#ffffff',S.bad?P.bad:P.ok,3);L.forEach((t,i)=>txt(t,A.W/2,y+6+lh*(i+.5),13,S.bad?P.bad:P.ink));return h+14}
/* ---------- the dinosaur, drawn in layers (0 bones … 4 colour) ---------- */
const BODY=[[.03,.4],[.2,.37],[.36,.32],[.47,.28],[.58,.29],[.66,.27],[.72,.19],[.78,.13],[.88,.14],[.97,.2],[.9,.25],[.8,.26],[.75,.31],[.71,.42],[.62,.5],[.5,.53],[.38,.46],[.2,.42]];
function dino(R,lvl,look){const at=([u,v])=>[R.x+u*R.w,R.y+v*R.h];const shape=()=>{X.beginPath();const n=BODY.length,mid=i=>{const [a,b]=at(BODY[i%n]),[c2,d]=at(BODY[(i+1)%n]);return[(a+c2)/2,(b+d)/2]};X.moveTo(...mid(0));for(let i=1;i<=n;i++){X.quadraticCurveTo(...at(BODY[i%n]),...mid(i))}X.closePath()};
 const fuzz=look!=='scaly',fill=lvl>=4?(look==='scaly'?'#4ade80':P.featC):lvl>=3?'#d6d3d1':'#fecaca';
 if(lvl<1){txt('Nothing yet: start with the layer that fossils show best.',R.x+R.w/2,R.y+R.h/2,13,P.soft,800);return}
 if(lvl>=2){shape();X.fillStyle=fill;X.fill();X.lineWidth=2;X.strokeStyle=P.line;X.stroke()}
 if(lvl>=3){for(let i=0;i<BODY.length;i++){const [x,y]=at(BODY[i]);if(fuzz){X.strokeStyle=lvl>=4&&i%2?P.stripe:'#7c2d12';X.lineWidth=2.5;X.beginPath();X.moveTo(x,y);X.lineTo(x+(i%3-1)*6,y-9);X.stroke()}else{X.fillStyle='#14532d';X.beginPath();X.arc(x,y,3,0,7);X.fill()}}
  if(look==='feathers'||look==='colour'){X.fillStyle='#7c2d12';X.beginPath();X.moveTo(...at([.7,.34]));X.lineTo(...at([.66,.55]));X.lineTo(...at([.79,.47]));X.closePath();X.fill()}}
 const bone=lvl>=2?'#ffffff':P.rockE;X.strokeStyle=bone;X.lineCap='round';X.lineWidth=lvl>=2?2.5:3.5;
 X.beginPath();BODY.slice(0,7).forEach((q,i)=>{const [x,y]=at([q[0],q[1]+.05]);i?X.lineTo(x,y):X.moveTo(x,y)});X.stroke();X.beginPath();X.moveTo(...at([.79,.17]));X.lineTo(...at([.92,.2]));X.lineTo(...at([.8,.23]));X.closePath();X.stroke();
 for(let i=0;i<5;i++){const [x,y]=at([.53+i*.035,.34]);X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x-6,y+R.h*.07,x-3,y+R.h*.13);X.stroke()}
 [[.52,.44,.5,.72,.56,.95],[.46,.45,.42,.72,.47,.95]].forEach(L=>{X.strokeStyle=lvl>=2?'#7f1d1d':P.rockE;X.lineWidth=5;X.beginPath();X.moveTo(...at([L[0],L[1]]));X.lineTo(...at([L[2],L[3]]));X.lineTo(...at([L[4],L[5]]));X.stroke()});
 X.lineWidth=3.5;X.beginPath();X.moveTo(...at([.7,.34]));X.lineTo(...at([.74,.44]));X.lineTo(...at([.79,.47]));X.stroke();
 const [ex,ey]=at([.86,.18]);X.fillStyle=P.ink;X.beginPath();X.arc(ex,ey,3.5,0,7);X.fill();
 if(look==='colour'){const L={x:R.x+6,y:R.y+6,w:Math.min(R.w*.5,px(190)),h:px(30)};box(L.x,L.y,L.w,L.h,P.guess,P.guessE,1.5,8);inside('Colour: still a guess',L,12,P.guessE,900)}}
/* ---------- steps 0, 3, 4: one card into labelled boxes ---------- */
const deck=()=>({keep:KEEP,clues:CLUES,label:LABEL})[kind()];
const names=()=>kind()==='keep'?['Fossils show it','Artists must guess']:kind()==='clues'?CLUEBOX:LABELBOX;
function place(b){if(S.won)return;const D=deck(),it=D[S.at];if(b!==it[1])return wrong(it[2]);right(it[2]);S.at++;
 if(S.at>=D.length){S.won=true;S.msg={keep:'Hard parts fossilise. Colour, fat and sound usually do not, so artists fill those gaps.',clues:'Rare fossils fill some gaps: skin pattern, feathers, even real colour.',label:'A good label shows which parts are evidence and which are guesses.'}[kind()]}talk()}
function drawDeck(t0,b0){const L=names(),n=L.length,g=px(8),cols=n>3&&A.narrow?2:n,rows=Math.ceil(n/cols),bw=(A.W-28-g*(cols-1))/cols,bh=Math.min(px(62),(b0-t0)*.17),by=b0-rows*bh-(rows-1)*g;
 S.bins=L.map((s,i)=>{const R={x:14+(i%cols)*(bw+g),y:by+Math.floor(i/cols)*(bh+g),w:bw,h:bh,i};box(R.x,R.y,R.w,R.h,[P.rock,P.guess,P.okBg,'#ffe4e6'][i],P.line,2.5);inside(s,R,14,P.ink);return R});
 const D=deck();if(S.at<D.length){const cw=Math.min(A.W-36,px(360)),Ls=wrap(D[S.at][0],cw-px(20),15),ch=Ls.length*(px(15)+5)+px(26),home={x:(A.W-cw)/2,y:t0+(by-t0-ch)/2,w:cw,h:ch},d=S.drag;S.card=home;
  const R=d?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch}:home;box(R.x,R.y,R.w,R.h,'#ffffff',d?P.guessE:P.line,3);inside(D[S.at][0],R,15,P.ink);txt(`Card ${S.at+1} of ${D.length}`,A.W/2,Math.max(t0+px(4),home.y-px(12)),12,P.soft,800)}}
/* ---------- step 1: build a reconstruction in the right order ---------- */
function addLayer(k){if(S.won)return;if(k<S.layer)return;if(k!==S.layer)return wrong(`Not yet. ${LAYERS[S.layer][0]} must go on before ${LAYERS[k][0].toLowerCase()}: each layer sits on the one below.`);
 S.layer++;right(`${LAYERS[k][0]} added. ${LAYERS[k][1]}`);if(S.layer>=LAYERS.length){S.won=true;S.msg='Bones first, colour last. The deeper the layer, the stronger the evidence.'}talk()}
function drawBuild(t0,b0){const g=px(8),side=!A.narrow,tw=side?A.W*.34:(A.W-28-g*3)/4,th=px(46);S.tiles=LAYERS.map(([n],k)=>{const R=side?{x:14,y:t0+k*(th+g),w:tw,h:th,k}:{x:14+k*(tw+g),y:t0,w:tw,h:th,k},on=k<S.layer;
  box(R.x,R.y,R.w,R.h,on?P.okBg:'#ffffff',on?P.ok:P.line,2,10);inside((on?'✓ ':'')+n,R,13,P.ink);return R});
 const R=side?{x:14+tw+g*2,y:t0,w:A.W-28-tw-g*2,h:b0-t0}:{x:14,y:t0+th+g,w:A.W-28,h:b0-t0-th-g};box(R.x,R.y,R.w,R.h,P.paper,P.rockE,1.5,12);dino({x:R.x+8,y:R.y+8,w:R.w-16,h:R.h-16},S.layer,'feathers')}
/* ---------- step 2: drag the timeline through four discoveries ---------- */
function setYear(i){if(S.won)return;i=Math.max(0,Math.min(YEARS.length-1,i));S.yi=i;if(!S.seen.includes(i))S.seen.push(i);right(`${YEARS[i][0]}: ${YEARS[i][1]}`);
 if(S.seen.length>=YEARS.length){S.won=true;S.msg='Same bones, new evidence. Each find changed the picture.'}talk()}
function drawYears(t0,b0){const bar={x:30,y:b0-px(40),w:A.W-60};X.strokeStyle=P.line;X.lineWidth=4;X.beginPath();X.moveTo(bar.x,bar.y);X.lineTo(bar.x+bar.w,bar.y);X.stroke();
 S.stops=YEARS.map(([y],i)=>{const x=bar.x+bar.w*i/(YEARS.length-1),on=S.seen.includes(i);X.fillStyle=i===S.yi?P.featC:on?P.ok:'#ffffff';X.beginPath();X.arc(x,bar.y,px(13),0,7);X.fill();X.strokeStyle=P.line;X.lineWidth=2;X.stroke();txt(y,x,bar.y+px(26),12,P.ink,900);return{x:x-px(22),y:bar.y-px(22),w:px(44),h:px(44),i}});
 S.bar=bar;const R={x:14,y:t0,w:A.W-28,h:bar.y-t0-px(30)};box(R.x,R.y,R.w,R.h,P.paper,P.rockE,1.5,12);dino({x:R.x+8,y:R.y+8,w:R.w-16,h:R.h-px(34)},YEARS[S.yi][2]==='colour'?3:4,YEARS[S.yi][2]);
 txt(`Velociraptor, as drawn after ${YEARS[S.yi][0]}`,A.W/2,R.y+R.h-px(12),12,P.soft,800)}
/* ---------- drawing ---------- */
function draw(){X.fillStyle=A.col.dark?'#1f2937':P.paper;X.fillRect(0,0,A.W,A.H);X.fillStyle=P.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=kind(),T={keep:['Fossil or guess? Drag each feature to a box.','You know what fossils keep.'],build:['Build a dinosaur picture: tap the layers in order.','Reconstruction built.'],
  years:['Drag along the timeline to each discovery.','Four discoveries, four pictures.'],clues:['What does each rare fossil clue reveal?','Clues matched.'],
  label:['Check the museum label: evidence, guess, or wrong?','Label checked.'],quiz:['Evidence first, then careful guesses.','']};
 const t=head(S.won?T[k][1]:T[k][0],S.won),b=A.H-foot()-px(6);
 if(k==='keep'||k==='clues'||k==='label')drawDeck(t+px(10),b);if(k==='build')drawBuild(t+px(10),b);if(k==='years')drawYears(t+px(10),b);
 if(k==='quiz'){const R={x:px(28),y:t+px(26),w:A.W-px(56),h:Math.min(px(150),b-t-px(50))};box(R.x,R.y,R.w,R.h,P.guess,P.line,2);inside('Bones and teeth are evidence. Skin, fat, sound and colour are usually informed guesses, until a rare fossil fills the gap.',R,16,P.ink)}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let held=null;
function down(p){const k=kind();
 if((k==='keep'||k==='clues'||k==='label')&&!S.won){if(hit(p,S.card)){held='card';S.drag={x:p.x,y:p.y};A.redraw();return true}const R=(S.bins||[]).find(q=>hit(p,q));if(R){place(R.i);return true}}
 if(k==='build'){const R=(S.tiles||[]).find(q=>hit(p,q));if(R){addLayer(R.k);return true}}
 if(k==='years'&&S.bar&&Math.abs(p.y-S.bar.y)<px(34)){held='year';slide(p);return true}
 return false}
function slide(p){const f=(p.x-S.bar.x)/S.bar.w,i=Math.round(f*(YEARS.length-1));if(i!==S.yi||!S.seen.includes(i))setYear(i)}
function move(p){if(held==='card'){S.drag={x:p.x,y:p.y};A.redraw()}if(held==='year')slide(p)}
function up(p){const h=held;held=null;if(h==='card'){S.drag=null;const R=(S.bins||[]).find(q=>hit(p,q));if(R)place(R.i);else A.redraw()}}
/* ---------- live description and buttons ---------- */
function talk(){const k=kind();let d='Challenge.';
 if(k==='keep'||k==='clues'||k==='label')d=S.won?'All cards sorted.':`Card ${S.at+1} of ${deck().length}: ${deck()[S.at][0]}. Boxes: ${names().join(', ')}.`;
 if(k==='build')d=`Layers added: ${S.layer} of 4${S.layer?' ('+LAYERS.slice(0,S.layer).map(l=>l[0]).join(', ')+')':''}.`;
 if(k==='years')d=`Timeline at ${YEARS[S.yi][0]}. Discoveries seen: ${S.seen.length} of ${YEARS.length}.`;
 speak((S.msg?S.msg+' ':'')+d);buttons();S.after()}
function buttons(){if(!btns)return;btns.innerHTML='';const k=kind(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},btns,t).onclick=()=>{fn();talk()}};
 if(!S.won){if(k==='keep'||k==='clues'||k==='label')names().forEach((n,i)=>b(n,()=>place(i)));
  if(k==='build')LAYERS.forEach(([n],j)=>{if(j>=S.layer)b(`Add ${n.toLowerCase()}`,()=>addLayer(j))});
  if(k==='years')YEARS.forEach(([y],i)=>b(`Go to ${y}`,()=>setYear(i)))}
 A.redraw()}
const finish=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++seq;fns.forEach((f,j)=>setTimeout(()=>{if(id===seq){f();talk()}},(j+1)*(A.reduced()?50:ms)))};
function reset(){seq++;Object.assign(S,{after:()=>{},won:false,msg:'',bad:false,at:0,drag:null,layer:0,yi:0,seen:[]})}
const steps=[
{h:'What do fossils keep?',p:'A dinosaur picture is called palaeoart. It starts from fossils. But only some parts of a body can become fossils.',
predict:{q:'Do fossils usually show what colour a dinosaur was?',opts:['Yes, the rock keeps the colour','No, colour usually rots away'],ans:1},
task:'Sort all 6 features',show:()=>{steps[0].go();play(KEEP.map(k=>()=>place(k[1])),380)},go:()=>{reset();talk();S.after=finish(0,()=>S.won,'Fossil or guess: sorted.')}},
{h:'Build it in layers',p:'Palaeoartists build a picture from the inside out. Each layer rests on the one below it, and each one is a little less certain.',
predict:{q:'Which layer should an artist start with?',opts:['The bones','The colour'],ans:0},
task:'Add all 4 layers in order',show:()=>{steps[1].go();play(LAYERS.map((l,k)=>()=>addLayer(k)),450)},go:()=>{reset();talk();S.after=finish(1,()=>S.won,'Built from the bones out.')}},
{h:'New fossils, new picture',p:'Velociraptor\'s bones were found in 1924. For years it was drawn like a lizard. Then new fossils turned up.',
predict:{q:'After the new finds, did Velociraptor look more like a lizard or more like a bird?',opts:['More like a lizard','More like a bird'],ans:1},
task:'Visit all 4 discoveries',show:()=>{steps[2].go();play(YEARS.map((y,i)=>()=>setYear(i)),520)},go:()=>{reset();S.seen=[0];talk();S.after=finish(2,()=>S.won,'The picture followed the evidence.')}},
{h:'Rare clues',p:'Now and then a fossil keeps more than bone. Each rare clue fills one gap in the picture.',
task:'Match all 4 clues',show:()=>{steps[3].go();play(CLUES.map(k=>()=>place(k[1])),420)},go:()=>{reset();talk();S.after=finish(3,()=>S.won,'Rare clues matched.')}},
{h:'Check the label',p:'A museum sign says what Velociraptor was like. Some lines are evidence, some are guesses, and some go against the fossils.',
predict:{q:'The museum painting shows bright blue feathers. Is the blue proven?',opts:['Yes, it is in a museum','No, it is the artist\'s guess'],ans:1},
task:'Sort all 6 label lines',show:()=>{steps[4].go();play(LABEL.map(k=>()=>place(k[1])),380)},go:()=>{reset();talk();S.after=finish(4,()=>S.won,'Evidence and guesses kept apart.')}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
function quiz(){ask++;const [q,good,bad]=BANK[ask%BANK.length],all=[[good,'ok'],...bad],r=ask%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,good)});speak('Challenge: '+q);A.redraw()}
function mark(tag,good){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=tag==='ok';let m=WHY[tag]||'Ask: does a fossil show this, or did an artist choose it?';
 if(tag==='bone')m=`Bones and teeth turn to fossils, so they are not guesses. ${WHY.bone}`;
 if(tag==='skin')m=`No Velociraptor skin or feathers survive. The proof is quill knobs on its arm bone.`;
 if(tag==='track')m=`A footprint shows how it walked and how long its steps were, never its colour.`;
 if(yes){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Yes: '+good+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.7,tall:1.5,draw,onStep:B=>{chal.hidden=B.step!==5;btns.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Palaeoart lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
