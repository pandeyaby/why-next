/* Flagship: types of teeth (ages 8–9; NC England Y4 "identify the different types of teeth in humans and their simple
   functions"; links to Y2/Y3 animal diets and NGSS 4-LS1-1 structures and functions). Tap a jaw to find incisors, canines,
   premolars and molars, drag foods to the teeth that do the job, build an adult and a milk-tooth quarter, and sort animal
   teeth by diet. Drag or tap on the canvas, or use the buttons. */
(()=>{
const K={ink:'#0f172a',dim:'#334155',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#fff7ed',edge:'#1e293b',gum:'#fecdd3',gumInk:'#881337',sel:'#1d4ed8',
 t:['#bfdbfe','#fecaca','#fde68a','#bbf7d0'],ti:['#1e3a8a','#7f1d1d','#713f12','#14532d']};
const T=TEETHART;
VIS.reg('flagteeth',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const txt=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)};
function lines(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function card(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?10:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function inbox(s,x,y,w,h,n,col,wt){const L=lines(s,w-10,n),lh=z(n)+3;L.forEach((r,i)=>txt(r,x+w/2,y+h/2+(i-(L.length-1)/2)*lh,n,col,'center',wt))}
function head(s,won){const L=lines(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(32),L.length*lh+12);card(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge,2,8);
 L.forEach((r,i)=>txt(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function foot(){if(!G.msg)return;const L=lines((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,12),lh=z(12)+5,h=L.length*lh+10,y=A.H-h-8;
 card(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3,8);L.forEach((r,i)=>txt(r,A.W/2,y+5+lh*(i+.5),12,G.bad?K.no:K.ink))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const good=s=>{G.bad=false;G.msg=s;A.sound.pop();sync()};
const hits=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- a tooth of each type ---- */
function tooth(x,y,s,ty,on){const r=s*[.42,.42,.5,.62][ty];X.fillStyle=on?K.t[ty]:'#ffffff';X.strokeStyle=on?K.ti[ty]:'#64748b';X.lineWidth=2;X.beginPath();
 if(ty===0)A.paint.rrect(x-r,y-r*.55,r*2,r*1.1,3);else if(ty===1){X.moveTo(x,y-r*1.15);X.lineTo(x+r*.9,y+r*.6);X.lineTo(x-r*.9,y+r*.6);X.closePath()}else A.paint.rrect(x-r,y-r,r*2,r*2,r*.5);
 X.fill();X.stroke();if(ty>=2){X.fillStyle=on?K.ti[ty]:'#94a3b8';const n=ty===2?2:4;for(let k=0;k<n;k++){X.beginPath();X.arc(x+(n===2?(k?.35:-.35):(k%2?.35:-.35))*r,y+(n===2?0:(k<2?-.35:.35))*r,r*.14,0,7);X.fill()}}
 if(on)txt('ICPM'[ty],x,y+(ty===1?r*.15:0),9,K.ti[ty],'center',900)}
/* ---- step 0: find all four types in the jaw ---- */
function find(i){if(G.won)return;const ty=T.QUARTER[i%8];if(G.found.has(ty)){G.bad=false;G.msg=`That is another ${T.TYPES[ty][0].toLowerCase()}. Find a different shape.`;A.sound.tick();return sync()}
 G.found.add(ty);const [n,sh,job]=T.TYPES[ty];A.sound.pop();G.bad=false;G.msg=`${n}: ${sh}. Its job: ${job}.`;
 if(G.found.size===4){G.won=true;G.msg='Incisors cut, canines tear, premolars crush, molars grind. Four shapes, four jobs.'}sync()}
function drawJaw(t){const y0=t+z(8),h=A.H-y0-z(78),cx=A.W/2,s=Math.min(z(30),A.W*.075),W=[.84,.84,1,1,1,1.24,1.24,1.24].map(v=>v*s+s*.14);
 const len=W.reduce((p,v)=>p+v,0),Rf=Math.min(A.W*.3,len*.55),arc=Rf*Math.PI/2,cy=y0+s*.8+Rf,run=Math.max(0,len-arc);
 const at=(d,side)=>d<arc?[cx+side*Rf*Math.sin(d/Rf),cy-Rf*Math.cos(d/Rf)]:[cx+side*Rf,cy+(d-arc)];
 X.strokeStyle=K.gum;X.lineWidth=s*1.9;X.lineCap='round';X.lineJoin='round';X.beginPath();X.moveTo(cx-Rf,cy+run);X.lineTo(cx-Rf,cy);X.arc(cx,cy,Rf,Math.PI,Math.PI*2);X.lineTo(cx+Rf,cy+run);X.stroke();X.lineCap='butt';
 txt('Top jaw, seen from below.',cx,cy+z(4),11,K.dim);txt('Front teeth at the top',cx,cy+z(20),11,K.dim);G.toothHit=[];
 for(let side=-1;side<=1;side+=2){let d=0;T.QUARTER.forEach((ty,k)=>{const [x,y]=at(d+W[k]/2,side);d+=W[k];
  tooth(x,y,s,ty,G.found.has(ty));G.toothHit.push({x:x-s*.7,y:y-s*.7,w:s*1.4,h:s*1.4,i:k})})}}
/* ---- step 1: foods to jobs ---- */
function feed(f,ty){if(G.won||G.fed.has(f))return;G.pick=null;const fd=T.FOOD[f];if(fd[1]!==ty)return miss(`Not the ${T.TYPES[ty][0].toLowerCase()}s. ${fd[2]}`);
 G.fed.add(f);A.sound.pop();G.bad=false;G.msg=`${T.TYPES[ty][0]}s: ${T.TYPES[ty][2]}.`;if(G.fed.size===T.FOOD.length){G.won=true;G.msg='Front teeth cut, pointed teeth tear, back teeth crush and grind.'}sync()}
function cols(y,h){const gap=z(6),w=(A.W-28-gap*3)/4;return T.TYPES.map((tp,i)=>({x:14+i*(w+gap),y,w,h,i}))}
function drawFood(t){const y0=t+z(8),gap=z(6),w=(A.W-28-gap)/2,fh=z(42);G.foodHit=[];
 T.FOOD.forEach((fd,i)=>{if(G.fed.has(i))return;const x=14+(i%2)*(w+gap),y=y0+Math.floor(i/2)*(fh+gap),d=G.drag&&G.drag.f===i,on=G.pick===i,px=d?G.drag.x-w/2:x,py=d?G.drag.y-fh/2:y;
  card(px,py,w,fh,on?'#dbeafe':K.card,on?K.sel:K.edge,on?3:1.5,14);inbox(fd[0],px,py,w,fh,12,K.ink,700);G.foodHit.push({x,y,w,h:fh,i})});
 const cy=y0+2*(fh+gap)+z(10),ch=A.H-cy-z(70);G.colHit=cols(cy,ch);G.colHit.forEach(r=>{const ty=r.i,done=T.FOOD.findIndex((fd,f)=>G.fed.has(f)&&fd[1]===ty);
  card(r.x,r.y,r.w,r.h,done>=0?K.okBg:'#f8fafc',done>=0?K.ok:K.ti[ty],done>=0?3:2,10);tooth(r.x+r.w/2,r.y+z(26),z(34),ty,true);
  inbox(T.TYPES[ty][0]+'s',r.x,r.y+z(46),r.w,z(18),11,K.ti[ty],800);if(done>=0)inbox('✓ '+T.FOOD[done][0],r.x,r.y+z(66),r.w,r.h-z(70),10,K.ok,700)})}
/* ---- steps 2 and 4: build a quarter of the mouth ---- */
const PLAN=()=>A.step===4?T.MILK:T.QUARTER;
const HINT=['The middle front teeth come first: flat and sharp, for cutting.','Next comes one long, pointed tooth for tearing.','Behind the canine come two teeth with two bumps each.','The back of the mouth has the widest grinding teeth.'];
function put(ty){if(G.won)return;const P=PLAN(),need=P[G.row.length];
 if(ty!==need)return miss(A.step===4&&ty===2?'Milk teeth have no premolars. Behind the milk canine come milk molars.':HINT[need]);
 G.row.push(ty);A.sound.tick();G.bad=false;G.msg=`${T.TYPES[ty][0]} in place. ${P.length-G.row.length} to go in this quarter.`;
 if(G.row.length===P.length){G.won=true;const n=P.length*4;G.msg=A.step===4?`5 milk teeth a quarter × 4 quarters = ${n}. No premolars yet: they come with the adult teeth.`:`8 teeth a quarter × 4 quarters = ${n}: 8 incisors, 4 canines, 8 premolars, 12 molars.`;A.sound.pop()}sync()}
function drawRow(t){const P=PLAN(),y0=t+z(10),n=P.length,gap=z(4),sw=Math.min(z(54),(A.W-28-gap*(n-1))/n),sx=(A.W-(sw*n+gap*(n-1)))/2;
 txt('Front (middle of mouth)',sx,y0+z(8),11,K.dim,'left');txt('Back',sx+sw*n+gap*(n-1),y0+z(8),11,K.dim,'right');
 G.slotZone={x:10,y:y0+z(16),w:A.W-20,h:sw+z(8)};P.forEach((_,k)=>{const x=sx+k*(sw+gap),y=y0+z(20),ty=G.row[k];card(x,y,sw,sw,ty==null?'#f8fafc':K.t[ty],ty==null?'#94a3b8':K.ti[ty],k===G.row.length?3:1.5,8);
  if(ty!=null)tooth(x+sw/2,y+sw/2,sw*.8,ty,true);else txt(String(k+1),x+sw/2,y+sw/2,11,K.dim)});
 let y=y0+z(28)+sw;if(G.won){const q=A.step===4?20:32;card(14,y,A.W-28,z(34),K.okBg,K.ok,2,10);txt(`4 quarters: ${P.length} + ${P.length} + ${P.length} + ${P.length} = ${q} teeth`,A.W/2,y+z(17),13,K.ok,'center',800);return}
 const gap2=z(6),w=(A.W-28-gap2*3)/4,h=Math.min(z(76),A.H-y-z(80));y+=z(8);G.palHit=T.TYPES.map((tp,i)=>{const x=14+i*(w+gap2),d=G.drag&&G.drag.ty===i,px=d?G.drag.x-w/2:x,py=d?G.drag.y-h/2:y;
  card(px,py,w,h,K.t[i],K.ti[i],2,10);tooth(px+w/2,py+h*.38,Math.min(z(30),h*.5),i,true);txt(tp[0],px+w/2,py+h*.8,11,K.ti[i],'center',800);return{x,y,w,h,i}})}
/* ---- step 3: teeth tell the diet ---- */
function sortA(a,d){if(G.won||G.diet[a]!=null)return;G.pick=null;const k=T.KIDS[a];
 if(k[2]!==d)return miss(`Look again at the ${k[0].toLowerCase()}'s teeth: ${k[1]}. ${['Flat grinding teeth are for plants.','Long canines and cutting back teeth are for meat.','A mix of tooth types means a mixed diet.'][k[2]]}`);
 G.diet[a]=d;A.sound.pop();G.bad=false;G.msg=`${k[0]}: ${k[1]}, so ${T.DIETS[d].toLowerCase()}.`;
 if(T.KIDS.every((_,i)=>G.diet[i]!=null)){G.won=true;G.msg='Teeth match food: canines and slicing teeth for meat, flat grinders for plants, a mix of both for omnivores.'}sync()}
function drawDiet(t){const y0=t+z(8),gap=z(6),w=(A.W-28-gap*2)/3,ah=A.narrow?76:z(60);G.kidHit=[];let n=0;
 T.KIDS.forEach((k,i)=>{if(G.diet[i]!=null)return;const x=14+(n%3)*(w+gap),y=y0+Math.floor(n/3)*(ah+gap);n++;const d=G.drag&&G.drag.a===i,on=G.pick===i,px=d?G.drag.x-w/2:x,py=d?G.drag.y-ah/2:y;
  card(px,py,w,ah,on?'#dbeafe':K.card,on?K.sel:K.edge,on?3:1.5,10);txt(k[0],px+w/2,py+z(12),12,K.ink,'center',900);inbox(k[1],px,py+z(22),w,ah-z(24),10,K.dim,600);G.kidHit.push({x,y,w,h:ah,i})});
 const by=y0+2*(ah+gap)+z(8),bh=A.H-by-z(70);G.binHit=T.DIETS.map((s,d)=>{const x=14+d*(w+gap);card(x,by,w,bh,'#f8fafc',K.edge,2,10);inbox(s,x,by,w,z(34),11,K.ink,800);
  T.KIDS.forEach((k,i)=>{if(G.diet[i]===d){const j=T.KIDS.filter((q,m)=>G.diet[m]===d&&m<i).length;card(x+6,by+z(38)+j*z(26),w-12,z(22),K.okBg,K.ok,1.5,8);txt('✓ '+k[0],x+w/2,by+z(49)+j*z(26),11,K.ok)}});return{x,y:by,w,h:bh,i:d}})}
/* ---- input and drawing ---- */
const kind=()=>['jaw','food','row','diet','row','quiz'][A.step];
let start=null;
function down(p){const k=kind(),hit=L=>(L||[]).find(r=>hits(p,r));start=p;
 if(k==='jaw'){const r=hit(G.toothHit);if(r){find(r.i);return true}}
 if(k==='food'){const f=hit(G.foodHit);if(f){G.pick=f.i;G.drag={f:f.i,x:p.x,y:p.y};A.sound.tick();A.redraw();return true}const r=hit(G.colHit);if(r&&G.pick!=null){feed(G.pick,r.i);return true}}
 if(k==='row'&&!G.won){const r=hit(G.palHit);if(r){G.drag={ty:r.i,x:p.x,y:p.y};A.redraw();return true}}
 if(k==='diet'){const a=hit(G.kidHit);if(a){G.pick=a.i;G.drag={a:a.i,x:p.x,y:p.y};A.sound.tick();A.redraw();return true}const r=hit(G.binHit);if(r&&G.pick!=null){sortA(G.pick,r.i);return true}}
 return false}
function move(p){if(!G.drag)return;G.drag.x=p.x;G.drag.y=p.y;A.redraw()}
function up(p){const d=G.drag,k=kind(),tap=start&&Math.hypot(p.x-start.x,p.y-start.y)<10;G.drag=null;if(!d)return A.redraw();
 if(k==='row'){if(tap||hits(p,G.slotZone))put(d.ty);else A.redraw();return}
 if(k==='food'){const r=(G.colHit||[]).find(q=>hits(p,q));if(r&&!tap)feed(d.f,r.i);else sync();return}
 if(k==='diet'){const r=(G.binHit||[]).find(q=>hits(p,q));if(r&&!tap)sortA(d.a,r.i);else sync()}}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();let t;
 if(k==='jaw'){t=head(G.won?'Four types of teeth, each with its own shape.':'Tap the teeth. Find all 4 different shapes.',G.won);drawJaw(t)}
 if(k==='food'){t=head(G.won?'Each type of tooth has its own job.':'Drag each food job to the teeth that do it. Or tap the job, then the teeth.',G.won);drawFood(t)}
 if(k==='row'){t=head(G.won?(A.step===4?'A child has 20 milk teeth.':'An adult has 32 teeth.'):(A.step===4?'Build one quarter of a child’s milk teeth, front to back.':'Build one quarter of an adult’s top jaw, front to back. Tap or drag a tooth.'),G.won);drawRow(t)}
 if(k==='diet'){t=head(G.won?'You can tell what an animal eats from its teeth.':'Drag each animal to what it eats. Or tap it, then a box.',G.won);drawDiet(t)}
 if(k==='quiz'){t=head('Incisors cut, canines tear, premolars crush, molars grind.');G.found=new Set([0,1,2,3]);drawJaw(t)}
 foot();A.fx.draw(X)}
function sync(){const k=kind();let d='Challenge.';
 if(k==='jaw')d='Top jaw with 16 teeth. Types found: '+([...G.found].map(i=>T.TYPES[i][0]).join(', ')||'none')+'.';
 if(k==='food')d='Jobs left: '+(T.FOOD.filter((_,f)=>!G.fed.has(f)).map(f=>f[0]).join('; ')||'none')+(G.pick!=null?'. Picked: '+T.FOOD[G.pick][0]:'')+'.';
 if(k==='row')d=`Quarter so far, front to back: ${G.row.map(i=>T.TYPES[i][0]).join(', ')||'empty'}. ${PLAN().length-G.row.length} places left.`;
 if(k==='diet')d='Animals left: '+(T.KIDS.filter((_,i)=>G.diet[i]==null).map(a=>a[0]+' ('+a[1]+')').join('; ')||'none')+(G.pick!=null?'. Picked: '+T.KIDS[G.pick][0]:'')+'.';
 tell((G.msg?G.msg+' ':'')+d);btns();G.after()}
function btns(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(s,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,s).onclick=()=>{fn();sync()}};
 if(k==='jaw'&&!G.won)[0,2,3,5].forEach(i=>b('Tap tooth '+(i+1)+' from the front',()=>find(i)));
 if(k==='food'&&!G.won){if(G.pick==null)T.FOOD.forEach((f,i)=>{if(!G.fed.has(i))b('Pick: '+f[0],()=>{G.pick=i;A.sound.tick()})});else{T.TYPES.forEach((tp,i)=>b(`${T.FOOD[G.pick][0]} with: ${tp[0]}s`,()=>feed(G.pick,i)));b('Pick another job',()=>{G.pick=null})}}
 if(k==='row'&&!G.won)T.TYPES.forEach((tp,i)=>b('Add: '+tp[0],()=>put(i)));
 if(k==='diet'&&!G.won){if(G.pick==null)T.KIDS.forEach((a,i)=>{if(G.diet[i]==null)b('Pick: '+a[0],()=>{G.pick=i;A.sound.tick()})});else{T.DIETS.forEach((s,d)=>b(`${T.KIDS[G.pick][0]}: ${s}`,()=>sortA(G.pick,d)));b('Pick another animal',()=>{G.pick=null})}}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,found:new Set(),fed:new Set(),row:[],diet:{},pick:null,drag:null})}
const steps=[
{h:'Not all the same',p:'Run your tongue along your teeth. Some feel thin and sharp, some pointy, some wide and bumpy. Scientists sort teeth into types by their shape.',
predict:{q:'Are all your teeth the same shape?',opts:['Yes: teeth are all the same','No: there are different shapes','Only the size changes, not the shape'],ans:1},
task:'Find all 4 types of teeth in the jaw',show:()=>{steps[0].go();play([0,2,3,5].map(i=>()=>find(i)),450)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,'Incisors, canines, premolars and molars.')}},
{h:'Each tooth has a job',p:'The shape of a tooth matches its job. Your mouth does four jobs when you eat: biting, tearing, crushing and grinding.',
predict:{q:'Which teeth grind a nut into tiny bits?',opts:['The flat front incisors','The pointed canines','The wide back molars'],ans:2},
task:'Match all 4 food jobs to the right teeth',show:()=>{steps[1].go();play(T.FOOD.map((fd,f)=>()=>feed(f,fd[1])),450)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'Cut, tear, crush, grind.')}},
{h:'Count a full set',p:'Your mouth has four quarters: top left, top right, bottom left and bottom right. Each quarter has the same teeth in the same order.',
predict:{q:'How many teeth does an adult usually have?',opts:['20','32','50'],ans:1},
task:'Build one adult quarter from front to back',show:()=>{steps[2].go();play(T.QUARTER.map(ty=>()=>put(ty)),300)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'8 in a quarter, 32 in all.')}},
{h:'Teeth show what animals eat',p:'Animal teeth fit their food too. Meat eaters, plant eaters and animals that eat both have different teeth.',
predict:{q:'A skull has long, pointed canines and sharp back teeth. What did it eat?',opts:['Grass','Meat','Only soft fruit'],ans:1},
task:'Sort all 6 animals by what they eat',show:()=>{steps[3].go();play(T.KIDS.map((k,a)=>()=>sortA(a,k[2])),380)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'Teeth match food.')}},
{h:'Milk teeth',p:'Children have a first set called milk teeth. They fall out from about age 6 and adult teeth grow in their place. The milk set is smaller.',
task:'Build one quarter of milk teeth',show:()=>{steps[4].go();play(T.MILK.map(ty=>()=>put(ty)),350)},go:()=>{reset();sync();G.after=settle(4,()=>G.won,'5 in a quarter, 20 in all, no premolars.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,ans,wrongs]=T.bank[qi%T.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';let m=T.WHYM[tag]||'Match the tooth shape to its job.';
 if(tag==='milk')m='20 is the milk set a child has. Adults have 32: the 12 extra are 8 premolars and 4 more molars.';
 if(tag==='nocanine')m='Rabbits and horses have no big canines but eat well: they cut plants with incisors and grind them with flat back teeth.';
 if(tag==='tear')m='Canines are the pointed ones next to the incisors. They grip and tear; they do not cut or grind.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Types of teeth lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
