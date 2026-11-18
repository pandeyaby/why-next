/* Flagship: changing environments (ages 8–9; NGSS 3-LS4-4; NC England Year 4 "environments can change"). Sort a drying
   pond, warm a mountain, sort the outcomes of a fire, order the regrowth, follow a drought along a food chain. */
(()=>{
const C={ink:'#0b1324',mute:'#475467',frame:'#344054',paper:'#ffffff',ok:'#0f6b3a',okFill:'#dbf5e4',no:'#a3122b',info:'#eef4ff',
 water:'#1d6fb8',mud:'#8a5a2b',sky:'#dbeafe',trees:'#166534',meadow:'#65a30d',rock:'#64748b',snow:'#f8fafc',pika:'#7c2d12',sun:'#d97706',
 grass:'#4d7c0f',rabbit:'#6b7280',fox:'#c2410c',pick:'#6d28d9'};
const POND={bins:['Dies','Moves away','Moves in'],cards:[['Pond fish',0,'Fish need water to breathe and cannot cross land, so most die.'],
 ['Water lily',0,'A water lily is rooted in the mud and needs water, so it dies.'],
 ['Duck',1,'Ducks can fly, so they leave to find another pond.'],['Dragonfly',1,'Adult dragonflies fly off to find water for their eggs.'],
 ['Grass',2,'Grass seeds blow in and grow on the dry mud.'],['Rabbit',2,'Once grass grows, rabbits come to eat it.']]};
const FIRE={bins:['Survives there','Moves away','Moves in','Dies'],cards:[['Deer',1,'Deer run away from the flames to unburnt forest.'],
 ['Deep-soil earthworms',0,'Soil keeps the heat out, so earthworms deep down survive.'],
 ['Fireweed',2,'Fireweed seeds float in on the wind and grow fast in the sunny, burnt ground.'],
 ['Black-backed woodpecker',2,'These woodpeckers fly in to eat beetle grubs in burnt trees.'],
 ['Young trees',3,'Young trees cannot move and their thin bark does not protect them, so many die.'],
 ['Buried seeds',0,'Many seeds in the soil survive. Some only sprout after a fire.']]};
const STAGES=[['Year 1','Fireweed and grasses'],['Year 5','Bushes and shrubs'],['Year 20','Young trees'],['Year 80','Tall forest again']];
VIS.reg('flagenvchg',c=>{let A,X,btns,chal,q=-1,gen=0,streak=0;const G={after:()=>{}};
const k=v=>Math.round(v*(A.narrow?1:1.1));
function write(t,x,y,size,col,align,wt){X.font=`${wt||700} ${k(size)}px system-ui,sans-serif`;X.fillStyle=col||C.ink;X.textAlign=align||'center';X.textBaseline='middle';X.fillText(String(t),x,y,A.W-12)}
function split(t,maxW,size){X.font=`700 ${k(size)}px system-ui,sans-serif`;const out=[];let cur='';for(const w of String(t).split(' ')){const nxt=cur?cur+' '+w:w;if(cur&&X.measureText(nxt).width>maxW){out.push(cur);cur=w}else cur=nxt}out.push(cur);return out}
function panel(r,fill,line,lw){A.paint.rrect(r.x,r.y,r.w,r.h,8);X.fillStyle=fill;X.fill();if(line){X.strokeStyle=line;X.lineWidth=lw||2;X.stroke()}}
function title(t,good){const L=split(t,A.W-34,13),lh=k(13)+4,r={x:10,y:8,w:A.W-20,h:Math.max(k(40),L.length*lh+12)};panel(r,good?C.okFill:C.info,good?C.ok:C.frame);
 L.forEach((l,i)=>write(l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,13,good?C.ok:C.ink));return r.y+r.h}
function feedback(){if(!G.msg)return 0;const L=split((G.err?'✗ ':'✓ ')+G.msg,A.W-40,12),lh=k(12)+5,h=L.length*lh+10,y=A.H-h-6;panel({x:10,y,w:A.W-20,h},C.paper,G.err?C.no:C.ok,3);
 L.forEach((l,i)=>write(l,A.W/2,y+5+lh*(i+.5),12,G.err?C.no:C.ink));return h+10}
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const wrong=t=>{G.err=true;G.msg=t;A.sound.miss();update()};
const right=t=>{G.err=false;G.msg=t;A.sound.pop();update()};
const hits=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- sorting boards (pond: 3 outcomes, fire: 4 outcomes) ---- */
const board=()=>A.step===0?POND:FIRE;
function choose(i){if(G.done||G.where[i]!=null)return;G.sel=i;A.sound.tick();G.err=false;G.msg=`${board().cards[i][0]}: which box?`;update()}
function place(b){if(G.done)return;if(G.sel==null)return wrong('Pick a card, then a box.');const [name,ans,why]=board().cards[G.sel];
 if(b!==ans){const B=board().bins;return wrong(`Not "${B[b]}". ${why}`)}
 G.where[G.sel]=b;G.sel=null;if(G.where.every(v=>v!=null)){G.done=true;return right(A.step===0?'All sorted. When a pond dries, some living things die, some move away and new ones move in.':'All four kinds of outcome happen after one fire: some survive, some move away, some move in and some die.')}
 right(why)}
function drawBoard(){const B=board(),n=B.bins.length,top=title(G.done?(A.step===0?'A drying pond: fish and lilies die, ducks and dragonflies leave, grass and rabbits move in.':'After a fire: survive, move away, move in or die.'):(A.step===0?'The pond has dried up. Drag each card to what happens to it, or tap a card then a box.':'A fire burned the forest. Sort each living thing into what happens to it.'),G.done);
 const cols=2,cw=(A.W-30)/cols,ch=k(36),bh=k(48),rowsB=n>3?2:1,binTop=A.H-rowsB*(bh+6)-(G.msg?split('✓ '+G.msg,A.W-40,12).length*(k(12)+5)+22:k(12));G.cardR=[];
 B.cards.forEach(([name],i)=>{const r={x:10+(i%cols)*(cw+10),y:top+k(10)+Math.floor(i/cols)*(ch+k(8)),w:cw,h:ch};if(G.where[i]!=null)return G.cardR.push(null);
  if(G.drag&&G.drag.i===i){r.x=G.drag.x-r.w/2;r.y=G.drag.y-r.h/2}
  panel(r,G.sel===i?'#ede9fe':C.paper,G.sel===i?C.pick:C.frame,G.sel===i?3:1.5);const L=split(name,r.w-12,12);L.forEach((l,j)=>write(l,r.x+r.w/2,r.y+r.h/2+(j-(L.length-1)/2)*(k(12)+2),12,C.ink));G.cardR.push(r)});
 const per=n>3?2:3,bw=(A.W-20-(per-1)*8)/per;G.binR=B.bins.map((t,b)=>{const r={x:10+(b%per)*(bw+8),y:binTop+Math.floor(b/per)*(bh+6),w:bw,h:bh};panel(r,'#f8fafc',C.trees,2);write(t,r.x+r.w/2,r.y+k(12),12,C.trees);
  const got=B.cards.filter((cd,i)=>G.where[i]===b).map(cd=>cd[0].split(' ').pop());write(got.join(', ')||'·',r.x+r.w/2,r.y+r.h-k(13),10,C.mute,'center',600);return r})}
/* ---- mountain warming ---- */
function warm(){if(G.done)return;if(G.heat>=3)return;G.heat++;A.sound.tick();
 if(G.heat===3){G.done=true;return right('The trees reached the top. The pika has no cold rocks left: in this model it cannot move higher, so it dies out here.')}
 G.err=false;G.msg=G.heat===1?'Warmer: trees spread uphill; the pika moves up to cooler rocks.':'Warmer again: the cold zone is tiny now.';update()}
function drawMountain(){const top=title(G.done?'Warming pushes cold-loving life uphill until there is no higher place to go.':'Tap the sun to warm the mountain. Watch where the pika and alpine flowers can live.',G.done);
 const base=A.H-(G.msg?k(70):k(20)),peak=top+k(56),mid=A.W*.5,half=Math.min(A.W*.42,k(220)),H=base-peak;
 X.fillStyle=C.sky;X.fillRect(12,top+6,A.W-24,base-top-6);
 const zone=(f0,f1,col)=>{const y0=base-H*f0,y1=base-H*f1,w0=half*(1-f0),w1=half*(1-f1);X.fillStyle=col;X.beginPath();X.moveTo(mid-w0,y0);X.lineTo(mid+w0,y0);X.lineTo(mid+w1,y1);X.lineTo(mid-w1,y1);X.closePath();X.fill()};
 const tree=G.heat>2?1:.42+.19*G.heat,alp=Math.min(1,tree+.15);zone(0,Math.min(tree,1),C.trees);if(tree<1)zone(tree,alp,C.meadow);if(alp<1)zone(alp,1,C.snow);
 X.strokeStyle=C.frame;X.lineWidth=2;X.beginPath();X.moveTo(mid-half,base);X.lineTo(mid,peak);X.lineTo(mid+half,base);X.stroke();
 write('forest',mid,base-H*Math.min(tree,1)*.4,12,'#fff');if(tree<1)write('alpine flowers',mid,base-H*(tree+alp)/2,11,C.ink);
 if(G.heat<3){const py=base-H*(alp<1?(alp+1)/2:(tree+alp)/2);X.fillStyle=C.pika;X.beginPath();X.ellipse(mid,py,k(9),k(6),0,0,7);X.fill();write('pika',mid-k(14),py,11,C.pika,'right')}
 else write('no cold rocks left',mid,peak-k(14),12,C.no);
 const sx=A.W-k(36),sy=top+k(30),R=k(16)+G.heat*k(3);X.fillStyle=C.sun;X.beginPath();X.arc(sx,sy,R,0,7);X.fill();write('+'+G.heat+' °C',sx,sy+R+k(10),11,C.ink);G.sunR={x:sx-R-8,y:sy-R-8,w:2*R+16,h:2*R+16}}
/* ---- regrowth order ---- */
function stage(i){if(G.done||G.order.includes(i))return;if(i!==G.order.length){const want=STAGES[G.order.length];return wrong(`${STAGES[i][1]} need${i===3?'s':''} more time. Before that comes ${want[1].toLowerCase()} (${want[0].toLowerCase()}). Plants that grow fast in sunshine come first; big trees take many years.`)}
 G.order.push(i);A.sound.tick();if(G.order.length===4){G.done=true;return right('Fast-growing plants first, then shrubs, then trees. A tall forest takes many years to come back.')}right(`${STAGES[i][0]}: ${STAGES[i][1].toLowerCase()}.`)}
function drawRegrow(){const top=title(G.done?'After a fire, life comes back in stages over many years.':'Tap the stages in time order, starting just after the fire.',G.done);
 const gy=top+k(118),cards=[2,0,3,1];G.stageR=[];X.fillStyle=C.mud;X.fillRect(14,gy,A.W-28,k(8));
 const last=G.order.length?G.order[G.order.length-1]:-1;for(let x=24;x<A.W-24;x+=k(22)){const h=last<0?k(6):last===0?k(16):last===1?k(34):last===2?k(60):k(96),col=last<=0?C.meadow:C.trees;X.fillStyle=col;
  if(last>=2){X.fillRect(x+k(8),gy-h*.35,k(4),h*.35);X.beginPath();X.arc(x+k(10),gy-h*.6,h*.3,0,7);X.fill()}else{X.beginPath();X.moveTo(x,gy);X.lineTo(x+k(9),gy-h);X.lineTo(x+k(18),gy);X.fill()}}
 const cw=(A.W-30)/2,ch=k(44);cards.forEach((s,j)=>{const r={x:10+(j%2)*(cw+10),y:gy+k(22)+Math.floor(j/2)*(ch+8),w:cw,h:ch},n=G.order.indexOf(s);
  panel(r,n>=0?C.okFill:C.paper,n>=0?C.ok:C.frame,1.5);write(n>=0?`${n+1}. ${STAGES[s][0]}`:'?',r.x+r.w/2,r.y+k(13),11,n>=0?C.ok:C.mute);write(STAGES[s][1],r.x+r.w/2,r.y+r.h-k(13),12,C.ink);G.stageR[s]=r})}
/* ---- knock-on along a food chain ---- */
function year(){if(G.done)return;A.sound.tick();const [g,r]=G.pop;G.pop=[G.rain?100:30,Math.round(g>=90?100:40),Math.round(r>=90?100:40)];G.yr++;G.hist.push(G.pop.slice());
 if(G.rain&&G.low&&G.pop.every(v=>v>=100)){G.done=true;return right('Rain → grass → rabbits → foxes: each comes back one year after the thing it eats.')}
 if(G.pop[2]<100)G.low=true;G.err=false;G.msg=G.pop[2]<100&&!G.rain?`Year ${G.yr}: foxes fall now, a year after the rabbits. Tap the cloud to bring rain back.`:`Year ${G.yr}: grass ${G.pop[0]}%, rabbits ${G.pop[1]}%, foxes ${G.pop[2]}%.`;update()}
function rain(){if(G.done)return;if(G.rain)return;if(!G.low)return wrong('Step the years first to see the drought reach the foxes.');G.rain=true;right('Rain is back. Step the years and watch the order of recovery.')}
function drawChain(){const top=title(G.done?'One change can spread along a food chain, a step at a time.':'Drought: little rain. Tap the calendar for the next year. A simple model, shown as % of normal.',G.done);
 const names=[['Grass',C.grass],['Rabbits',C.rabbit],['Foxes',C.fox]],bx=k(78),bw=A.W-bx-k(20),bh=k(26);
 names.forEach(([n,col],i)=>{const y=top+k(24)+i*(bh+k(18));write(n,bx-8,y+bh/2,13,C.ink,'right');X.fillStyle='#e5e7eb';X.fillRect(bx,y,bw,bh);X.fillStyle=col;X.fillRect(bx,y,bw*G.pop[i]/100,bh);write(G.pop[i]+'%',bx+bw*G.pop[i]/100-6,y+bh/2,12,'#fff','right');if(i<2)write('↓ eaten by',bx+k(40),y+bh+k(9),10,C.mute)});
 const y2=top+k(24)+3*(bh+k(18))+k(4);G.calR={x:A.W/2-k(78),y:y2,w:k(66),h:k(46)};panel(G.calR,C.paper,C.frame,2);write('Year '+G.yr,G.calR.x+G.calR.w/2,y2+k(14),12,C.ink);write('next ▸',G.calR.x+G.calR.w/2,y2+k(32),11,C.mute);
 G.cloudR={x:A.W/2+k(12),y:y2,w:k(66),h:k(46)};panel(G.cloudR,G.rain?'#dbeafe':'#fef3c7',G.rain?C.water:C.sun,2);write(G.rain?'rain':'drought',G.cloudR.x+G.cloudR.w/2,y2+k(23),12,G.rain?C.water:'#92400e')}
/* ---- input, drawing, state ---- */
const view=()=>['sort','mount','sort','regrow','chain','quiz'][A.step];
function down(p){const v=view();
 if(v==='sort'){const i=(G.cardR||[]).findIndex(r=>hits(p,r));if(i>=0){choose(i);G.drag={i,x:p.x,y:p.y,moved:false};return true}const b=(G.binR||[]).findIndex(r=>hits(p,r));if(b>=0){place(b);return true}}
 if(v==='mount'&&hits(p,G.sunR)){warm();return true}
 if(v==='regrow'){const s=(G.stageR||[]).findIndex(r=>hits(p,r));if(s>=0){stage(s);return true}}
 if(v==='chain'){if(hits(p,G.calR)){year();return true}if(hits(p,G.cloudR)){rain();return true}}return false}
function move(p){if(!G.drag)return;G.drag.x=p.x;G.drag.y=p.y;G.drag.moved=true;A.redraw()}
function up(p){const d=G.drag;G.drag=null;if(d&&d.moved&&p){const b=(G.binR||[]).findIndex(r=>hits(p,r));if(b>=0)return place(b)}A.redraw()}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const v=view();if(v==='sort')drawBoard();if(v==='mount')drawMountain();if(v==='regrow')drawRegrow();if(v==='chain')drawChain();
 if(v==='quiz'){title('When a place changes, some living things survive, some move away, some move in, some die.');write('survive · move away · move in · die',A.W/2,A.H*.45,14,C.trees)}
 feedback();A.fx.draw(X)}
function update(){const v=view();let d='Challenge.';
 if(v==='sort')d=board().cards.map((cd,i)=>`${cd[0]}: ${G.where[i]==null?(G.sel===i?'picked':'not sorted'):board().bins[G.where[i]]}.`).join(' ');
 if(v==='mount')d=`Mountain warmed ${G.heat} times. ${G.heat<3?'The pika lives in the cold zone near the top.':'No cold zone left.'}`;
 if(v==='regrow')d=G.order.length?'Order so far: '+G.order.map(i=>STAGES[i][1]).join(', ')+'.':'No stages placed yet.';
 if(v==='chain')d=`Year ${G.yr}, ${G.rain?'rain':'drought'}. Grass ${G.pop[0]}%, rabbits ${G.pop[1]}%, foxes ${G.pop[2]}%.`;
 tell((G.msg?G.msg+' ':'')+d);pad();G.after()}
function pad(){if(!btns)return;btns.innerHTML='';const v=view(),mk=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},btns,t).onclick=f};
 if(v==='sort'&&!G.done){board().cards.forEach((cd,i)=>{if(G.where[i]==null)mk(cd[0],()=>choose(i),'Pick '+cd[0])});board().bins.forEach((t,b)=>mk('→ '+t,()=>place(b),'Put the picked card in: '+t))}
 if(v==='mount'&&!G.done)mk('Warm 1 °C',warm,'Warm the mountain by one degree');
 if(v==='regrow'&&!G.done)STAGES.forEach((s,i)=>{if(!G.order.includes(i))mk(s[1],()=>stage(i),'Next stage: '+s[1])});
 if(v==='chain'&&!G.done){mk('Next year',year);mk('Bring rain',rain,'Bring the rain back')}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const auto=(fs,ms)=>{const id=++gen;fs.forEach((f,j)=>setTimeout(()=>{if(id===gen)f()},(j+1)*(A.reduced()?30:ms)))};
function fresh(){gen++;const n=(A.step===0?POND:FIRE).cards.length;Object.assign(G,{after:()=>{},done:false,msg:'',err:false,where:Array(n).fill(null),sel:null,drag:null,heat:0,order:[],pop:[100,100,100],rain:false,low:false,yr:0,hist:[]})}
const sortAll=B=>B.cards.flatMap((cd,i)=>[()=>choose(i),()=>place(cd[1])]);
const steps=[
{h:'A pond dries up',p:'In a dry summer the pond turns to mud. Not every living thing has the same fate.',
predict:{q:'The pond dries up. What happens to the fish?',opts:['Most die: they cannot leave the water','They walk to another pond','They live happily in the mud'],ans:0},
task:'Sort all six living things',show:()=>{steps[0].go();auto(sortAll(POND),300)},go:()=>{fresh();update();G.after=settle(0,()=>G.done,'Dies, moves away, moves in.')}},
{h:'A warming mountain',p:'Some plants and animals need cold. When a place warms, they can only live higher up, where it is cooler.',
predict:{q:'The mountain warms. Where do the cold-loving pika and alpine flowers end up?',opts:['Higher up, where it is cooler','Down in the warm valley','They stay put and are fine'],ans:0},
task:'Warm the mountain three times',show:()=>{steps[1].go();auto([warm,warm,warm],700)},go:()=>{fresh();update();G.after=settle(1,()=>G.done,'Pushed off the top.')}},
{h:'After a fire',p:'A fire is a fast change. Look for all four outcomes: survive, move away, move in, die.',
predict:{q:'Can a fire bring new living things to a forest?',opts:['Yes: some plants and animals move in after it','No: a fire only kills','Only if people plant them'],ans:0},
task:'Sort all six after the fire',show:()=>{steps[2].go();auto(sortAll(FIRE),300)},go:()=>{fresh();update();G.after=settle(2,()=>G.done,'All four outcomes.')}},
{h:'Growing back',p:'A burnt forest changes again as plants return. What grows back first?',
task:'Put the four stages in time order',show:()=>{steps[3].go();auto([0,1,2,3].map(i=>()=>stage(i)),500)},go:()=>{fresh();update();G.after=settle(3,()=>G.done,'Fast plants first, tall trees last.')}},
{h:'Knock-on effects',p:'Foxes do not eat grass. Can a drought that kills grass still change how many foxes there are?',
predict:{q:'Drought kills the grass. What happens to the foxes?',opts:['They fall too, a bit later','Nothing: foxes eat rabbits, not grass','They go up'],ans:0},
task:'Follow the drought, then bring the rain back',show:()=>{steps[4].go();auto([year,year,year,rain,year,year,year],420)},go:()=>{fresh();update();G.after=settle(4,()=>G.done,'Back in order: grass, rabbits, foxes.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
const QS=[['A pond dries up. What happens to most pond fish?','They die: they cannot leave the water',[['They walk to a new pond','allMove'],['They grow legs so they can leave','adaptNow']]],
['A beaver dam floods a dry wood. Which animals are most likely to move in?','Fish and ducks',[['Moles that dig in dry soil','wrongNeeds'],['None: floods only harm living things','onlyHarm']]],
['Why can a duck leave a drying pond but a water lily cannot?','A duck can fly; a lily is rooted in one place',[['Lilies do not need water','wrongNeeds'],['The lily chooses to stay','choose']]],
['Drought kills grass. Rabbits eat grass. Foxes eat rabbits. What happens to the foxes?','Fewer foxes, a bit later',[['No change: foxes do not eat grass','noKnock'],['More foxes','noKnock']]],
['A mountain warms. Where do pikas that need cold go?','Higher up the mountain',[['Down to the valley','wrongWay'],['They change their bodies to like heat within a year','adaptNow']]],
['After a forest fire, which grows back first?','Fireweed and grasses',[['Tall trees','order'],['Nothing ever grows back','onlyHarm']]]];
function hint(tag){let m='Ask what it needs and whether it can move. That tells you if it survives, moves away, moves in or dies.';
 if(tag==='allMove')m='Only things that can travel can move away. Fish need water all the time and cannot cross dry land.';
 if(tag==='adaptNow')m='A living thing cannot change its body because it needs to. Bodies change only over many generations, far too slowly to escape a change like this.';
 if(tag==='wrongNeeds')m='Match the new place to what each living thing needs. A flood brings water, so water animals gain; dry-soil diggers lose.';
 if(tag==='onlyHarm')m='A change is bad for some living things and good for others. New plants and animals move into the changed place.';
 if(tag==='choose')m='Plants do not choose. A lily is rooted, so it cannot leave even when its home dries up.';
 if(tag==='noKnock')m='Foxes eat rabbits, and rabbits eat grass. Less grass means fewer rabbits, then fewer foxes: the change passes along the food chain.';
 if(tag==='wrongWay')m='Higher up is cooler. Cold-loving life moves uphill as it warms, not down to the warm valley.';
 if(tag==='order')m='Big trees take many years to grow. Fast plants like fireweed and grass come first in the sunny, burnt ground.';
 return m}
function ask(){q++;const [qq,ans,bad]=QS[q%QS.length],all=[[ans,'ok']].concat(bad),r=q%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>judge(tag,ans)});tell('Challenge: '+qq);A.redraw()}
function judge(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+hint(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;btns.hidden=B.step===5;pad()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Environment lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
