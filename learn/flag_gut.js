/* Flagship: The Digestive System (ages 8-9; NC Y4: simple functions of the basic parts of the human digestive system).
   Label, chew, squeeze (even upside down), churn, sort what enters the blood, follow a meal. Every drag has a button twin. */
(()=>{
VIS.reg('flaggut',c=>{let A,pad,box,qn=-1,streak=0;const Z={};c.fig.classList.add('young');
const ORG=['Mouth','Oesophagus','Stomach','Small intestine','Large intestine'];
const JOB=['Teeth bite and grind food. Saliva makes it wet.','A muscly tube. It squeezes food down to the stomach.','A stretchy bag. It churns food with acid into a thick soup.','A long, coiled tube. Goodness passes through its wall into the blood.','Takes water back from what is left. The waste leaves through the anus.'];
const mode=()=>['label','chew','squeeze','churn','absorb','tour','chal'][A.step];
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function ink(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||800} ${Math.round(px*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(t,x,y,o.max||A.W-12)}
const B7={w:700},B9={w:900},hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function rbox(x,y,w,h,fill,edge,lw){const g=A.ctx;A.paint.rrect(x,y,w,h,Math.min(10,h/3));g.fillStyle=fill;g.fill();g.lineWidth=lw||2;g.strokeStyle=edge||A.col.tx;g.stroke()}
/* ---------- body map ---------- */
function geo(){const top=A.H*.03,h=mode()==='label'?A.H*.7:A.H*.8,w=Math.min(A.W*.6,h*.55),cx=A.W/2;return{top,h,w,cx}}
function anchor(i){const{top,h,w,cx}=geo();return[[cx,top+.14*h],[cx+.01*w,top+.3*h],[cx+.13*w,top+.46*h],[cx,top+.73*h],[cx+.2*w,top+.62*h]][i]}
function slot(i){const lw=Math.min(132,A.W*.3),hh=Math.max(30,A.H*.065),[,y]=anchor(i),left=i===1||i===3;return{x:left?6:A.W-lw-6,y:y-hh/2,w:lw,h:hh}}
function bodyPic(g,C,lit){const{top,h,w,cx}=geo(),L=A.alpha(C.tx,.5);g.lineWidth=2;g.strokeStyle=L;g.fillStyle=A.alpha(C.tx,.04);
 g.beginPath();g.arc(cx,top+.1*h,.1*h,0,7);g.fill();g.stroke();A.paint.rrect(cx-.27*w,top+.22*h,.54*w,.76*h,w*.12);g.fill();g.stroke();
 const hl=i=>lit===i?C.am:[C.pk,C.cy,C.vi,C.gr,C.or][i];
 g.lineCap='round';g.strokeStyle=hl(0);g.lineWidth=lit===0?6:4;g.beginPath();g.arc(cx,top+.12*h,.035*h,.2,Math.PI-.2);g.stroke();
 g.strokeStyle=hl(1);g.lineWidth=lit===1?9:6;g.beginPath();g.moveTo(cx,top+.17*h);g.lineTo(cx+.02*w,top+.41*h);g.stroke();
 g.fillStyle=A.alpha(hl(2),.35);g.strokeStyle=hl(2);g.lineWidth=lit===2?5:3;g.beginPath();g.ellipse(cx+.12*w,top+.46*h,.12*w,.06*h,-.5,0,7);g.fill();g.stroke();
 g.strokeStyle=hl(4);g.lineWidth=lit===4?12:9;g.beginPath();g.moveTo(cx-.19*w,top+.87*h);g.lineTo(cx-.19*w,top+.56*h);g.lineTo(cx+.19*w,top+.56*h);g.lineTo(cx+.19*w,top+.86*h);g.quadraticCurveTo(cx+.1*w,top+.92*h,cx,top+.92*h);g.lineTo(cx,top+.98*h);g.stroke();
 g.strokeStyle=hl(3);g.lineWidth=lit===3?6:4;g.beginPath();for(let k=0;k<=7;k++){const y=top+(.62+k*.03)*h;g.moveTo(cx-.12*w,y);g.quadraticCurveTo(cx,y+(k%2?.02:-.02)*h,cx+.12*w,y)}g.stroke();g.lineCap='butt'}
function leaders(g,C){for(let i=0;i<5;i++){const s=slot(i),[ax,ay]=anchor(i),left=s.x<A.W/2;g.strokeStyle=A.alpha(C.tx,.55);g.lineWidth=1.5;g.beginPath();g.moveTo(left?s.x+s.w:s.x,ay);g.lineTo(ax,ay);g.stroke();
 const got=Z.lab[i];rbox(s.x,s.y,s.w,s.h,got?A.alpha(C.gr,.25):Z.bad===i?A.alpha(C.rd,.25):A.alpha(C.pn,.9),C.tx,2);ink(got?ORG[i]:`${i+1} ?`,s.x+s.w/2,s.y+s.h/2,12,{w:800,max:s.w-6})}}
function cardR(i){const n=Z.cards.length,per=A.narrow?3:5,w=Math.min(140,(A.W-16)/per-8),h=Math.max(34,A.H*.075),row=Math.floor(i/per),col=i%per,inRow=Math.min(per,n-row*per);
 return{x:A.W/2-(inRow*(w+8))/2+col*(w+8)+4,y:A.H*.76+row*(h+8),w,h}}
function cardsPic(g,C,names){Z.cards.forEach((k,i)=>{if(Z.used[i])return;let r=cardR(i);if(Z.drag&&Z.drag.i===i)r={...r,x:Z.drag.x-r.w/2,y:Z.drag.y-r.h/2};rbox(r.x,r.y,r.w,r.h,Z.pick===i?A.alpha(C.ac,.35):C.pn,C.tx,Z.pick===i?4:2);ink(names[k],r.x+r.w/2,r.y+r.h/2,12,{w:800,max:r.w-6})})}
/* ---------- close-ups ---------- */
function chewPic(g,C){const cx=A.W/2,cy=A.H*.45,R=Math.min(A.W*.38,A.H*.3);g.fillStyle=A.alpha(C.pk,.18);g.beginPath();g.ellipse(cx,cy,R,R*.75,0,0,7);g.fill();g.strokeStyle=C.pk;g.lineWidth=3;g.stroke();
 for(let k=0;k<8;k++){const x=cx-R*.7+k*R*.2;rbox(x-R*.08,cy-R*.72,R*.16,R*.2,'#f8fafc',C.tx,1.5);rbox(x-R*.08,cy+R*.52,R*.16,R*.2,'#f8fafc',C.tx,1.5)}
 const n=2**Z.chew,cols=Math.ceil(Math.sqrt(n)),r=R*.32/Math.sqrt(n);for(let k=0;k<n;k++){const x=cx+((k%cols)-(cols-1)/2)*r*2.3,y=cy+(Math.floor(k/cols)-(Math.ceil(n/cols)-1)/2)*r*2.3;A.paint.ball(x,y,r,C.or)}
 for(let k=0;k<Z.chew*2;k++){g.fillStyle=A.alpha(C.cy,.7);g.beginPath();g.arc(cx-R*.8+((k*53)%100)/100*R*1.6,cy-R*.35+((k*31)%60)/100*R,4,0,7);g.fill()}
 ink(`Chews: ${Z.chew}   Pieces: ${n}`,cx,A.H*.08,15,B9);ink(Z.msg||'Tap the food to chew.',cx,A.H*.9,12,B7)}
const TY=()=>[A.H*.2,A.H*.68];
function tubeY(t){const[y0,y1]=TY();return Z.flip?y1-t*(y1-y0):y0+t*(y1-y0)}
function squeezePic(g,C){const cx=A.W/2,yt=tubeY(0),yb=tubeY(1),wd=26;g.fillStyle=A.alpha(C.cy,.15);g.fillRect(cx-wd,Math.min(yt,yb),wd*2,Math.abs(yb-yt));g.strokeStyle=C.cy;g.lineWidth=3;
 const ry=tubeY(Z.ring);g.beginPath();for(const e of[-wd,wd]){g.moveTo(cx+e,yt);g.lineTo(cx+e,ry);g.lineTo(cx+e*.45,ry);g.lineTo(cx+e,ry+(Z.flip?-18:18));g.lineTo(cx+e,yb)}g.stroke();
 const sy=yb+(Z.flip?-1:1)*A.H*.1;g.fillStyle=A.alpha(C.vi,.3);g.strokeStyle=C.vi;g.beginPath();g.ellipse(cx,sy,A.W*.2,A.H*.08,0,0,7);g.fill();g.stroke();ink('Stomach',cx,sy,13);
 ink('Mouth',cx,yt+(Z.flip?1:-1)*16,13);A.paint.ball(cx,tubeY(Z.ball)+(Z.flip?-1:1)*(Z.ball>=1?A.H*.08:12),15,C.or);
 if(Z.flip)ink('Upside down!',cx,A.H*.84,14,B9);ink(Z.msg||'Drag the squeeze down the tube.',cx,A.H*.95,12,B7)}
function churnPic(g,C){const cx=A.W/2,cy=A.H*.45,rx=Math.min(A.W*.36,A.H*.34),ry=rx*.7,u=Z.mush/100;g.fillStyle=A.mix(A.alpha(C.vi,.18),A.alpha(C.am,.4),u);g.beginPath();g.ellipse(cx,cy,rx,ry,-.3,0,7);g.fill();g.strokeStyle=C.vi;g.lineWidth=4;g.stroke();
 Z.chunks.forEach((p,k)=>{const r=(1-u*.85)*p[2];if(r>2){g.fillStyle=k%2?C.or:C.gr;g.beginPath();g.arc(cx+p[0]*rx*.7+Math.sin(Z.wob+k)*u*6,cy+p[1]*ry*.6,r,0,7);g.fill()}});
 const bw=A.W*.6;rbox(cx-bw/2,A.H*.86,bw,16,A.alpha(C.tx,.08),C.tx,1.5);g.fillStyle=C.am;g.fillRect(cx-bw/2+2,A.H*.86+2,(bw-4)*u,12);ink(`Soup: ${Math.round(Z.mush)}%`,cx,A.H*.82,13);
 ink(Z.msg||'Drag back and forth on the stomach to churn.',cx,A.H*.07,12,B7)}
const ITEMS=['Sugars','Bits of protein','Minerals','Vitamins','Fibre'],GOES=[0,0,0,0,1],BINS=['Into the blood','Moves on to the large intestine'];
function binR(k){const w=(A.W-24)/2;return{x:8+k*(w+8),y:A.H*.52,w,h:A.H*.2}}
function absorbPic(g,C){const y=A.H*.06,h=A.H*.16;g.fillStyle=A.alpha(C.gr,.16);g.fillRect(8,y,A.W-16,h);g.strokeStyle=C.gr;g.lineWidth=2;g.strokeRect(8,y,A.W-16,h);
 for(let x=20;x<A.W-16;x+=22){g.beginPath();g.moveTo(x,y+h);g.quadraticCurveTo(x+6,y+h*.4,x+12,y+h);g.stroke()}ink('Small intestine wall',A.W/2,y+h*.3,13);
 g.fillStyle=A.alpha(C.rd,.2);g.fillRect(8,y+h+4,A.W-16,14);ink('blood',A.W/2,y+h+11,11,{w:800});
 BINS.forEach((nm,k)=>{const r=binR(k);rbox(r.x,r.y,r.w,r.h,A.alpha(k?C.vi:C.rd,Z.bad===k?.35:.12),C.tx,Z.bad===k?4:2);ink(nm,r.x+r.w/2,r.y+16,12,{max:r.w-8});const got=Z.where.map((w,i)=>w===k?ITEMS[i]:0).filter(Boolean);got.forEach((t,j)=>ink(t,r.x+r.w/2,r.y+36+j*16,11,B7))});
 ink(Z.msg||'Drag each card into a box.',A.W/2,A.H*.46,12,B7)}
function tourPic(g,C){bodyPic(g,C,Z.lit);if(Z.dot!=null){const P=[0,1,2,3,4].map(anchor),i=Math.min(3.999,Z.dot*4),k=Math.floor(i),f=i-k;A.paint.ball(P[k][0]+(P[k+1][0]-P[k][0])*f,P[k][1]+(P[k+1][1]-P[k][1])*f,9,C.or)}
 const t=Z.lit!=null?`${ORG[Z.lit]}: ${JOB[Z.lit]}`:'Tap a part, or press Follow a meal.';ink(t,A.W/2,A.H*.9,12,{w:700,max:A.W-12})}
/* ---------- paint ---------- */
function paint(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#fde7f3',C.dark?.06:.3);g.fillRect(0,0,W,H);
 if(m==='label'){bodyPic(g,C,null);leaders(g,C);cardsPic(g,C,ORG)}
 if(m==='chew')chewPic(g,C);if(m==='squeeze')squeezePic(g,C);if(m==='churn')churnPic(g,C);
 if(m==='absorb'){absorbPic(g,C);cardsPic(g,C,ITEMS)}
 if(m==='tour')tourPic(g,C);
 if(m==='chal'){ink('Which part does which job?',W/2,H*.32,19,B9);ink('Mouth → oesophagus → stomach → small → large intestine',W/2,H*.5,12,B7)}
 if(m==='label'&&Z.msg)ink(Z.msg,W/2,H*.73,12,B7);A.fx.draw(g)}
/* ---------- actions ---------- */
function tell(t){Z.msg=t;speak(t);paint2();Z.want()}
function bad(i){A.sound.miss();Z.bad=i;setTimeout(()=>{Z.bad=null;A.redraw()},A.reduced()?10:700)}
const job=i=>{Z.lit=i;speak(`${ORG[i]}: ${JOB[i]}`);A.redraw()};
function label(k,i){if(mode()!=='label'||Z.used[k])return;const o=Z.cards[k];Z.pick=null;
 if(o!==i){bad(i);return tell(o===2&&i===1?'The stomach is the bag. The tube from mouth to stomach is the oesophagus.':o===3&&i===4?'The small intestine is the coiled tube in the middle. The large intestine goes round it.':o===4&&i===3?'The large intestine is the wide tube round the edge.':`That is part ${i+1}. ${ORG[o]}: ${JOB[o]}`)}
 Z.used[k]=1;Z.lab[i]=1;A.sound.pop();tell(`${i+1}. ${ORG[i]}: ${JOB[i]}`)}
function chew(){if(mode()!=='chew')return;if(Z.chew>=4){A.sound.tick();return tell('Ready to swallow!')}Z.chew++;A.sound.pop();tell(Z.chew<4?`Chew ${Z.chew}: smaller pieces, more saliva.`:'16 small, wet pieces: easy to swallow.')}
function squeeze(to){if(mode()!=='squeeze'||Z.ball>=1)return;Z.ring=Math.max(Z.ring,Math.min(1,to));if(Z.ring>Z.ball-.06){Z.ball=Math.min(1,Z.ring+.06);A.sound.tick()}
 if(Z.ball>=1){A.sound.pop();tell(Z.flip?'Even upside down, muscles pushed it in.':'Muscles squeezed it into the stomach.')}else{Z.msg=`Squeezing… ${Math.round(Z.ball*100)}% of the way.`;speak(Z.msg);A.redraw()}}
function churn(d){if(mode()!=='churn'||Z.mush>=100)return;Z.mush=Math.min(100,Z.mush+d);Z.wob+=d*.2;if(Z.mush>=100){A.sound.pop();tell('Thick soup! The acid and churning broke the food down. Now it goes to the small intestine.')}else{Z.msg=`Churning with acid… ${Math.round(Z.mush)}%`;A.redraw()}}
function sortIt(k,b){if(mode()!=='absorb'||Z.used[k])return;const o=Z.cards[k];Z.pick=null;
 if(GOES[o]!==b){bad(b);return tell(o===4?'Fibre is too tough to break down. It moves on and helps push waste along.':`${ITEMS[o]} are small enough after digestion to pass through the wall into the blood.`)}
 Z.used[k]=1;Z.where[o]=b;A.sound.pop();tell(o===4?'Fibre moves on to the large intestine.':`${ITEMS[o]} pass into the blood here.`)}
function tour(){if(mode()!=='tour')return;Z.dot=0;Z.lit=0;const k=Z.k;A.tween(Z,{dot:1},A.reduced()?10:6000,'io',()=>{if(k===Z.k){Z.lit=4;speak(JOB[4]);A.redraw()}});
 for(let i=1;i<5;i++)setTimeout(()=>{if(k===Z.k)job(i)},A.reduced()?20:i*1500)}
/* ---------- buttons ---------- */
function paint2(){A.redraw();buttons()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||t},pad,t).onclick=f};
 if(m==='label'){if(Z.pick==null)Z.cards.forEach((o,k)=>{if(!Z.used[k])b(ORG[o],()=>{Z.pick=k;speak(`${ORG[o]} picked. Now choose a number.`);paint2()},`Pick the ${ORG[o]} label`)});else[0,1,2,3,4].forEach(i=>{if(!Z.lab[i])b('Part '+(i+1),()=>label(Z.pick,i),`Put ${ORG[Z.cards[Z.pick]]} on part ${i+1}`)})}
 if(m==='chew')b('Chew',chew,'Chew the food once');
 if(m==='squeeze'){b('Squeeze',()=>squeeze(Z.ring+.25),'Squeeze the muscles to push the food down');b(Z.flip?'Stand up':'Turn upside down',()=>{Z.flip=!Z.flip;speak(Z.flip?'Upside down. Can the food still get there?':'Standing up.');paint2()},'Turn the body upside down')}
 if(m==='churn')b('Churn',()=>churn(25),'Churn the stomach');
 if(m==='absorb'){if(Z.pick==null)Z.cards.forEach((o,k)=>{if(!Z.used[k])b(ITEMS[o],()=>{Z.pick=k;speak(`${ITEMS[o]} picked. Now choose a box.`);paint2()},`Pick ${ITEMS[o]}`)});else BINS.forEach((nm,j)=>b(nm,()=>sortIt(Z.pick,j),`Put ${ITEMS[Z.cards[Z.pick]]} in ${nm}`))}
 if(m==='tour'){b('Follow a meal',tour,'Follow a meal through the digestive system');ORG.forEach((o,i)=>b(o,()=>job(i),`Show the job of the ${o}`))}}
/* ---------- pointer ---------- */
function down(p){const m=mode();
 if(m==='label'||m==='absorb'){const k=Z.cards.findIndex((_,j)=>!Z.used[j]&&hit(p,cardR(j)));if(k>=0){Z.drag={i:k,x:p.x,y:p.y};Z.pick=k;paint2();return true}
  if(Z.pick!=null){if(m==='label'){const i=[0,1,2,3,4].findIndex(j=>hit(p,slot(j)));if(i>=0)label(Z.pick,i)}else{const j=[0,1].findIndex(q=>hit(p,binR(q)));if(j>=0)sortIt(Z.pick,j)}}return false}
 if(m==='chew'){chew();return false}
 if(m==='squeeze'){if(Math.abs(p.x-A.W/2)<A.W*.3){Z.drag={sq:1};return true}return false}
 if(m==='churn'){Z.drag={x:p.x,y:p.y};return true}
 if(m==='tour'){let best=-1,bd=1e9;for(let i=0;i<5;i++){const[ax,ay]=anchor(i),d=Math.hypot(p.x-ax,p.y-ay);if(d<bd){bd=d;best=i}}if(bd<A.H*.12)job(best);return false}
 return false}
function move(p){const d=Z.drag;if(!d)return;const m=mode();
 if(m==='squeeze'){const[y0,y1]=TY(),t=Z.flip?(y1-p.y)/(y1-y0):(p.y-y0)/(y1-y0);squeeze(Math.max(0,t));return}
 if(m==='churn'){churn(Math.hypot(p.x-d.x,p.y-d.y)/12);d.x=p.x;d.y=p.y;return}
 d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=Z.drag,m=mode();Z.drag=null;if(!d||!p||d.sq||m==='churn'){A.redraw();return}
 if(m==='label'){const i=[0,1,2,3,4].findIndex(j=>hit(p,slot(j)));i>=0?label(d.i,i):paint2()}
 if(m==='absorb'){const j=[0,1].findIndex(q=>hit(p,binR(q)));j>=0?sortIt(d.i,j):paint2()}}
/* ---------- steps ---------- */
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,list){steps[n].go();const k=++Z.k;list.forEach((f,j)=>setTimeout(()=>{if(k===Z.k)f()},A.reduced()?30*(j+1):(j+1)*320))}
function fresh(o){const k=(Z.k||0)+1;for(const x in Z)delete Z[x];Object.assign(Z,{k,want:()=>{},cards:[],used:[],lab:[0,0,0,0,0],where:[null,null,null,null,null],pick:null,bad:null,drag:null,chew:0,ring:0,ball:.1,flip:false,mush:0,wob:0,lit:null,dot:null,
 chunks:[[-.5,-.3,14],[.1,-.5,12],[.5,0,15],[-.2,.3,13],[.3,.5,11],[-.6,.4,10],[0,0,16]],msg:''},o||{})}
const steps=[
{h:'Five parts in order',p:'Food goes on a long trip through you. Put a name on each numbered part, in the order food meets them.',
 predict:{q:'After you swallow, where does food go first?',opts:['Down a tube called the oesophagus','Straight into the stomach','Into the lungs'],ans:0},task:'Label all 5 parts',
 show:()=>play(0,[0,1,2,3,4].map(i=>()=>label(Z.cards.indexOf(i),i))),
 go:()=>{fresh({cards:[2,0,4,1,3],used:[0,0,0,0,0]});speak('Label the 5 parts of the digestive system.');buttons();Z.want=finish(0,()=>Z.lab.every(Boolean),'Mouth, oesophagus, stomach, small intestine, large intestine.')}},
{h:'Mouth: bite and grind',p:'Teeth cut and grind food into small pieces. Saliva makes the pieces wet and soft.',task:'Chew until the food is ready to swallow',
 show:()=>play(1,[chew,chew,chew,chew]),
 go:()=>{fresh();speak('Tap the food to chew.');buttons();Z.want=finish(1,()=>Z.chew>=4,'Small wet pieces are easy to swallow and quicker to break down.')}},
{h:'Oesophagus: squeeze down',p:'The oesophagus is a tube from your mouth to your stomach. Rings of muscle squeeze the food along.',
 predict:{q:'Could food reach your stomach if you were upside down?',opts:['Yes: muscles squeeze it along','No: gravity pulls food down','Only drinks could'],ans:0},task:'Push the food into the stomach',
 show:()=>play(2,[()=>{Z.flip=true;paint2()},()=>squeeze(.3),()=>squeeze(.6),()=>squeeze(1)]),
 go:()=>{fresh();speak('Drag the muscle squeeze down the tube.');buttons();Z.want=finish(2,()=>Z.ball>=1,'Muscles, not gravity, move food. Astronauts can swallow in space.')}},
{h:'Stomach: churn',p:'The stomach is a stretchy bag. Its muscles churn food with acid until it is a thick soup.',
 predict:{q:'What does the stomach do to food?',opts:['Churns it with acid into a thick soup','Soaks most of it into the blood','Turns it straight into poo'],ans:0},task:'Churn until the food is soup',
 show:()=>play(3,[()=>churn(25),()=>churn(25),()=>churn(25),()=>churn(25)]),
 go:()=>{fresh();speak('Churn the stomach.');buttons();Z.want=finish(3,()=>Z.mush>=100,'Churned soup moves on to the small intestine.')}},
{h:'Small intestine: into the blood',p:'The small intestine is a long, coiled tube. Here the goodness from food passes through the wall into the blood.',
 predict:{q:'Where does most goodness from food pass into the blood?',opts:['The small intestine','The stomach','The large intestine'],ans:0},task:'Sort what goes into the blood',
 show:()=>play(4,[0,1,2,3,4].map(o=>()=>sortIt(Z.cards.indexOf(o),GOES[o]))),
 go:()=>{fresh({cards:[4,0,2,1,3],used:[0,0,0,0,0]});speak('Sort the cards.');buttons();Z.want=finish(4,()=>Z.used.every(Boolean),'Sugars, protein, minerals and vitamins go into the blood. Fibre moves on.')}},
{h:'Follow a meal',p:'The large intestine takes water back from what is left. The waste, called faeces, leaves through the anus.',
 go:()=>{fresh();speak('Tap a part to see its job, or follow a meal.');buttons()}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.want()});
/* ---------- challenge ---------- */
const QS=[['Which part takes most goodness from food into the blood?',['Small intestine','Stomach','Large intestine']],
 ['Which tube carries food from your mouth to your stomach?',['Oesophagus','Windpipe','Small intestine']],
 ['Where is food churned with acid?',['Stomach','Mouth','Small intestine']],
 ['Which part takes water back from waste?',['Large intestine','Small intestine','Stomach']],
 ['What do your teeth do?',['Cut and grind food','Take goodness into the blood','Squeeze food down']]];
function why(q,a){let m='Check the order of the parts.';
 if(a==='Stomach')m=q===0?'The stomach churns and breaks food down, but little goodness passes into the blood there.':'The stomach churns food with acid. It does not take water back from waste.';
 if(a==='Large intestine')m='The large intestine mostly takes back water. The goodness went into the blood earlier, in the small intestine.';
 if(a==='Windpipe')m='The windpipe carries air to your lungs, not food. Food goes down the oesophagus.';
 if(a==='Small intestine')m=q===1?'The small intestine comes after the stomach, not before it.':q===2?'The small intestine takes goodness into the blood. Churning with acid is the stomach.':'The small intestine takes in most of the goodness. The large intestine takes back water from what is left.';
 if(a==='Mouth')m='The mouth chews and adds saliva. Churning with acid happens in the stomach.';
 if(a==='Take goodness into the blood')m='That is the small intestine. Teeth cut and grind food into small pieces.';
 if(a==='Squeeze food down')m='That is the oesophagus. Teeth cut and grind food.';
 return m}
function ask(){qn++;const q=qn%QS.length,Q=QS[q],sh=(qn+1)%3;box.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');[...Q[1].slice(sh),...Q[1].slice(0,sh)].forEach(a=>{c.el('button',{type:'button',class:'lbtn'},row,a).onclick=()=>mark(a,q)});speak('Challenge: '+Q[0]);A.redraw()}
function mark(a,q){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=a===QS[q][1][0];
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${streak} in a row.`:'✗ '+why(q,a))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.72,tall:1.3,draw:paint,onStep:A=>{box.hidden=A.step!==6;pad.hidden=A.step===6;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Digestive system controls'},w);box=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
