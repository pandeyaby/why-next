/* Flagship: Arctic vs Antarctic (ages 5–7; KS1 geography: the poles, hot and cold areas). Arctic = frozen ocean ringed
   by land, towns, polar bears; Antarctica = icy continent ringed by ocean, penguins, no one lives there all year.
   Drill the ice, fill each map's middle, place buildings, fix two posters, sort clues. Not flagglobe or flagpolaran. */
(()=>{
VIS.reg('flagarcant',c=>{
let Z,btns,quizBox,qn=-1;const m0={};c.fig.classList.add('young');
const STAGE=['drill','middle','build','poster','sort','chal'];
const at=()=>STAGE[Z.step];
const POLE=[['n','Arctic','North Pole'],['s','Antarctic','South Pole']];
const BUILD=[['house','🏠','n'],['school','🏫','n'],['shop','🛒','n'],['science station','🔬','s']];
const POSTER={n:[['polar bear','🐻‍❄️','n'],['walrus','🦭','n'],['penguin','🐧','s']],s:[['penguin','🐧','s'],['whale','🐋','s'],['polar bear','🐻‍❄️','n']]};
const CARDS=[['a frozen ocean','n'],['a continent (land)','s'],['the North Pole','n'],['the South Pole','s'],['towns and schools','n'],['the colder one','s']];
function tell(t){c.say(t);if(Z)Z.cv.setAttribute('aria-label',t)}
function txt(t,x,y,px,o){o=o||{};const g=Z.ctx;g.font=`${o.w||700} ${px}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||Z.col.tx;g.fillText(String(t),x,y,o.max||Z.W-10)}
const C=()=>Z.col,sea=()=>Z.mix(C().pn,C().cy,C().dark?.42:.45),ice=()=>Z.mix(C().pn,'#ffffff',C().dark?.12:.7),rock=()=>Z.mix(C().pn,C().mu,C().dark?.55:.5),land=()=>Z.mix(C().pn,C().gr,C().dark?.4:.38);
const half=k=>{const g=10,w=(Z.W-g*3)/2;return{x:g+(k==='n'?0:w+g),y:Z.H*.1,w,h:Z.H*.64}};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const whichHalf=p=>['n','s'].find(k=>inside(p,half(k)));
function box(r,fill,rad){const g=Z.ctx;g.fillStyle=fill;Z.paint.rrect(r.x,r.y,r.w,r.h,rad||12);g.fill();g.strokeStyle=C().tx;g.lineWidth=1.5;g.stroke()}
function heads(){POLE.forEach(([k,nm,pl])=>{const r=half(k);txt(nm,r.x+r.w/2,Z.H*.03,Z.narrow?16:19,{w:800});txt(pl,r.x+r.w/2,Z.H*.07,Z.narrow?12:14,{ink:C().mu,w:600})})}
function strip(t){const g=Z.ctx,px=Z.narrow?15:16,lines=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const j=lines.length-1,n=(lines[j]+' '+w).trim();if(g.measureText(n).width>Z.W-26&&lines[j])lines.push(w);else lines[j]=n});
 const k=Math.min(4,lines.length),lh=px+5,top=Z.H-k*lh-12;g.fillStyle=Z.alpha(C().pn,.95);g.fillRect(0,top,Z.W,Z.H-top);lines.slice(0,4).forEach((l,j)=>txt(l,Z.W/2,top+6+lh*j+lh/2,px,{w:600}))}
/* ---- 1 drill: what is under the ice? ---- */
const surf=()=>Z.H*.2,iceBot=k=>k==='n'?Z.H*.25:Z.H*.5,floor=()=>Z.H*.7;
function drawDrill(){const g=Z.ctx;heads();['n','s'].forEach(k=>{const r=half(k);g.save();Z.paint.rrect(r.x,r.y,r.w,r.h,12);g.clip();
  g.fillStyle=Z.mix(C().pn,C().cy,.1);g.fillRect(r.x,r.y,r.w,r.h);
  if(k==='n'){g.fillStyle=sea();g.fillRect(r.x,surf(),r.w,floor()-surf());g.fillStyle=rock();g.fillRect(r.x,floor(),r.w,r.y+r.h-floor())}
  else{g.fillStyle=rock();g.fillRect(r.x,iceBot('s'),r.w,r.y+r.h-iceBot('s'))}
  g.fillStyle=ice();g.fillRect(r.x,surf(),r.w,iceBot(k)-surf());g.strokeStyle=C().tx;g.lineWidth=1;g.strokeRect(r.x,surf(),r.w,iceBot(k)-surf());
  txt('ice',r.x+r.w*.78,(surf()+iceBot(k))/2,Z.narrow?12:14,{w:700});
  const d=m0.depth[k],bx=r.x+r.w*.38,tip=surf()-Z.H*.06+d*(r.y+r.h-surf());
  g.strokeStyle=C().tx;g.lineWidth=6;g.beginPath();g.moveTo(bx,r.y+4);g.lineTo(bx,tip);g.stroke();
  g.fillStyle=C().am;g.beginPath();g.moveTo(bx-9,tip-10);g.lineTo(bx+9,tip-10);g.lineTo(bx,tip+6);g.closePath();g.fill();
  m0.handle[k]={x:bx,y:tip};
  if(m0.found[k])txt(k==='n'?'sea water!':'rock: land!',r.x+r.w/2,k==='n'?Z.H*.48:Z.H*.62,Z.narrow?15:18,{w:800});
  else txt('drag down ⇣',bx+(Z.narrow?34:46),r.y+16,Z.narrow?12:14,{w:600});
  g.restore();g.strokeStyle=C().tx;g.lineWidth=1.5;Z.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()})}
function hit(k){if(m0.found[k])return;m0.found[k]=true;m0.depth[k]=k==='n'?.32:.62;
 const both=m0.found.n&&m0.found.s;
 if(k==='n')say('Splash! Under the Arctic ice is sea water. The ice is the top of a frozen ocean, floating like an ice cube.'+(both?' Two poles, two very different places.':''),true);
 else say('Clunk! Under the thick Antarctic ice is rock. Antarctica is land: a continent.'+(both?' Two poles, two very different places.':''),true);
 if(both)m0.drillOk=true;Z.redraw();m0.check()}
function sink(k,y){const r=half(k);m0.depth[k]=Math.max(0,Math.min(.9,(y-surf()+Z.H*.06)/(r.y+r.h-surf())));const tip=surf()-Z.H*.06+m0.depth[k]*(r.y+r.h-surf());
 if(tip>iceBot(k)+6)hit(k);else Z.redraw()}
/* ---- 2 middle: ocean or land in the middle? ---- */
const disc=k=>{const r=half(k);return{x:r.x+r.w/2,y:r.y+r.h*.4,R:Math.min(r.w*.46,r.h*.36)}};
const tokens=()=>{const y=Z.H*.68,w=Z.narrow?130:160;return[{k:'sea',l:'🌊 frozen ocean',x:Z.W*.27-w/2,y,w,h:46},{k:'land',l:'⛰️ icy land',x:Z.W*.73-w/2,y,w,h:46}]};
function drawMiddle(){const g=Z.ctx;heads();['n','s'].forEach(k=>{const d=disc(k),inner=d.R*.5;
  g.fillStyle=k==='n'?land():sea();g.beginPath();g.arc(d.x,d.y,d.R,0,7);g.fill();g.strokeStyle=C().tx;g.lineWidth=1.5;g.stroke();
  const fill=m0.mid[k];g.fillStyle=fill==='sea'?sea():fill==='land'?ice():C().pn;g.beginPath();g.arc(d.x,d.y,inner,0,7);g.fill();g.setLineDash(fill?[]:[6,5]);g.stroke();g.setLineDash([]);
  txt(fill?(fill==='sea'?'ocean':'land'):'?',d.x,d.y,Z.narrow?17:21,{w:800});
  txt(k==='n'?'land all round':'ocean all round',d.x,d.y+d.R+14,Z.narrow?13:15,{w:700,max:half(k).w-6})});
 if(!m0.midOk)tokens().forEach(t=>{const h=m0.carry&&m0.carry.k===t.k?m0.carry:null,r=h?{x:h.x-t.w/2,y:h.y-t.h/2,w:t.w,h:t.h}:t;box(r,t.k==='sea'?sea():ice(),14);txt(t.l,r.x+r.w/2,r.y+r.h/2,Z.narrow?14:16,{max:r.w-8})})}
function fillMid(k,what){if(m0.mid[k]===(k==='n'?'sea':'land'))return;
 if(k==='n'&&what==='land')return say('Remember the drill: under the Arctic ice is sea water. The middle of the Arctic is ocean.',false);
 if(k==='s'&&what==='sea')return say('Remember the drill: under the Antarctic ice is rock. The middle is land, not sea.',false);
 m0.mid[k]=what;
 if(m0.mid.n==='sea'&&m0.mid.s==='land'){m0.midOk=true;say('The Arctic is ocean with land all round it. Antarctica is land with ocean all round it. They are opposites!',true)}
 else say(k==='n'?'Yes. The Arctic is a frozen ocean, with land all round it.':'Yes. Antarctica is a big piece of land, a continent, with ocean all round it.',true);m0.check()}
/* ---- 3 build: who lives there all year? ---- */
function drawBuild(){const g=Z.ctx;heads();['n','s'].forEach(k=>{const r=sortZone(k);box(r,k==='n'?land():ice());
  if(k==='n'){g.fillStyle=sea();g.fillRect(r.x+r.w*.2,r.y+r.h*.06,r.w*.6,r.h*.14);txt('frozen sea',r.x+r.w/2,r.y+r.h*.13,Z.narrow?12:14,{w:700})}
  m0.placed.filter(b=>b[2]===k).forEach((b,j)=>{const x=r.x+r.w*(.28+.44*(j%2)),y=r.y+r.h*(.4+.25*Math.floor(j/2));txt(b[1],x,y,Z.narrow?28:36);txt(b[0],x,y+(Z.narrow?24:30),Z.narrow?13:14,{max:r.w*.48})})});
 const cur=BUILD[m0.bi];if(!cur){txt('Every building has a place',Z.W/2,Z.H*.19,Z.narrow?16:18,{ink:C().gr});return}
 const b=m0.card={x:Z.W/2-(Z.narrow?80:95),y:Z.H*.12,w:Z.narrow?160:190,h:54},h=m0.carry,r=h?{x:h.x-b.w/2,y:h.y-b.h/2,w:b.w,h:b.h}:b;
 box(r,Z.mix(C().pn,C().am,C().dark?.22:.18),14);txt(cur[1]+' '+cur[0],r.x+r.w/2,r.y+r.h/2,Z.narrow?16:18,{max:r.w-8})}
function place(k){const cur=BUILD[m0.bi];m0.carry=null;if(!cur)return Z.redraw();
 if(cur[2]==='n'&&k==='s')return say(`No ${cur[0]} in Antarctica. Nobody lives there all year, so there are no towns, homes or schools.`,false);
 if(cur[2]==='s'&&k==='n')return say('Scientists work in the Arctic too, but it has towns. Put the station where it is the only home.',false);
 m0.placed.push(cur);m0.bi++;
 if(m0.bi>=BUILD.length){m0.buildOk=true;return say('People live in Arctic towns all year. In Antarctica, only scientists stay for a while, then go home.',true)}
 say(cur[2]==='n'?`Yes. Families live in Arctic towns, so there is a ${cur[0]}.`:'Yes.',true)}
/* ---- 4 poster: fix the mistake ---- */
const spot=(k,i)=>{const r=half(k),n=Math.max(3,m0.post[k].length);return{x:r.x+r.w/2,y:r.y+r.h*(.14+.72*i/n),R:Z.narrow?24:30}};
function drawPoster(){const g=Z.ctx;heads();['n','s'].forEach(k=>{const r=half(k);box(r,k==='n'?Z.mix(sea(),ice(),.4):ice());
  m0.post[k].forEach((a,i)=>{const p=m0.lift&&m0.lift.a===a?m0.lift:spot(k,i);txt(a[1],p.x,p.y-6,Z.narrow?32:40);txt(a[0],p.x,p.y+(Z.narrow?20:26),Z.narrow?13:15,{max:r.w-6})})});
 }
function pickAnimal(k,i){const a=m0.post[k][i];if(!a)return;
 if(a[2]===k)return say(a[0]==='walrus'?'Walruses do live in the Arctic. Find the animal from the far south.':a[0]==='whale'?'Whales swim round Antarctica. Find the animal from the far north.':`The ${a[0]} belongs here. Look for the one that does not.`,false);
 m0.post[k].splice(i,1);m0.post[a[2]].push(a);m0.fixed++;
 if(m0.fixed===2){m0.postOk=true;return say('Polar bears live in the north and hunt seals on the frozen sea. Wild penguins live in the south. They never meet!',true)}
 say(a[0]==='penguin'?'Moved! Wild penguins do not live in the Arctic. They live in the south.':'Moved! Polar bears do not live in Antarctica. They need the frozen sea of the Arctic.',true)}
/* ---- 5 sort: clue cards ---- */
function drawSort(){const C0=C();['n','s'].forEach(k=>{const rr=sortZone(k);box(rr,k==='n'?Z.mix(sea(),ice(),.4):ice());
  txt(k==='n'?'Arctic':'Antarctic',rr.x+rr.w/2,rr.y+20,Z.narrow?16:18,{w:800});m0.sorted.filter(x=>x[1]===k).forEach((x,j)=>txt(x[0],rr.x+rr.w/2,rr.y+50+j*(Z.narrow?22:26),Z.narrow?13:15,{w:600,max:rr.w-8}))});
 const cur=CARDS[m0.ci];if(!cur){txt('All six clues sorted',Z.W/2,Z.H*.16,Z.narrow?16:18,{ink:C0.gr});return}
 const b=m0.card={x:Z.W/2-(Z.narrow?90:110),y:Z.H*.1,w:Z.narrow?180:220,h:56},h=m0.carry,r=h?{x:h.x-b.w/2,y:h.y-b.h/2,w:b.w,h:b.h}:b;
 box(r,Z.mix(C0.pn,C0.vi,C0.dark?.24:.16),14);txt(cur[0],r.x+r.w/2,r.y+r.h/2,Z.narrow?15:17,{max:r.w-8})}
const sortZone=k=>({x:half(k).x,y:Z.H*.34,w:half(k).w,h:Z.H*.42});
function file(k){const cur=CARDS[m0.ci];m0.carry=null;if(!cur)return Z.redraw();
 if(k!==cur[1]){const why={'a frozen ocean':'The drill hit water in the north: the Arctic.','a continent (land)':'The drill hit rock in the south: Antarctica.','the North Pole':'The Arctic is round the North Pole.','the South Pole':'Antarctica is round the South Pole.','towns and schools':'Nobody lives in Antarctica all year. Towns and schools are in the Arctic.','the colder one':'Both are very cold, but Antarctica is colder. It is high, thick ice on land.'}[cur[0]];return say(why,false)}
 m0.sorted.push(cur);m0.ci++;if(m0.ci>=CARDS.length){m0.sortOk=true;return say('North: a frozen ocean with towns. South: an icy continent, even colder, with no towns.',true)}
 say(cur[0]==='the colder one'?'Yes. Antarctica is the coldest place on Earth.':'Yes!',true)}
/* ---- frame ---- */
function draw(){const g=Z.ctx,k=at();g.fillStyle=Z.mix(C().pn,C().cy,C().dark?.05:.06);g.fillRect(0,0,Z.W,Z.H);
 if(k==='chal'){txt('🧭 Pole check',Z.W/2,Z.H*.42,Z.narrow?20:24);txt('Answer below',Z.W/2,Z.H*.56,15,{ink:C().mu,w:500});Z.fx.draw(g);return}
 ({drill:drawDrill,middle:drawMiddle,build:drawBuild,poster:drawPoster,sort:drawSort})[k]();if(m0.msg)strip(m0.msg);Z.fx.draw(g)}
function say(t,good){m0.msg=t;if(good)Z.sound.pop();else if(good===false)Z.sound.miss();tell(t);controls();Z.redraw();m0.check&&m0.check()}
function reset(){for(const k in m0)delete m0[k];Object.assign(m0,{depth:{n:0,s:0},found:{},handle:{},mid:{},bi:0,placed:[],post:{n:POSTER.n.slice(),s:POSTER.s.slice()},fixed:0,ci:0,sorted:[],msg:'',check:()=>{}});if(Z)Z.redraw()}
function controls(){if(!btns)return;btns.innerHTML='';const k=at();if(k==='chal')return;
 const add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},btns,t).onclick=f};
 if(k==='drill')POLE.forEach(([p,nm,pl])=>{if(!m0.found[p])add(`Drill at the ${pl}`,()=>{hit(p)},`Drill through the ice at the ${pl} (${nm})`)});
 if(k==='middle'&&!m0.midOk)POLE.forEach(([p,nm])=>{if(m0.mid[p])return;add(`${nm} middle: ocean`,()=>fillMid(p,'sea'));add(`${nm} middle: land`,()=>fillMid(p,'land'))});
 if(k==='build'&&BUILD[m0.bi])POLE.forEach(([p,nm])=>add(`${nm}`,()=>place(p),`Put the ${BUILD[m0.bi][0]} in the ${nm}`));
 if(k==='poster'&&!m0.postOk)POLE.forEach(([p,nm])=>m0.post[p].forEach((a,i)=>add(`${a[1]} ${a[0]} (${nm})`,()=>pickAnimal(p,i),`${a[0]} on the ${nm} poster`)));
 if(k==='sort'&&CARDS[m0.ci])POLE.forEach(([p,nm])=>add(nm,()=>file(p),`“${CARDS[m0.ci][0]}”: ${nm}`))}
function down(p){const k=at();if(k==='chal')return false;
 if(k==='drill'){const h=whichHalf(p);if(!h||m0.found[h])return false;m0.drag=h;sink(h,Math.max(p.y,m0.handle[h]?m0.handle[h].y:0));return true}
 if(k==='middle'&&!m0.midOk){const t=tokens().find(t=>inside(p,t));if(t){m0.carry={k:t.k,x:p.x,y:p.y};return true}return false}
 if(k==='build'&&BUILD[m0.bi]){if(inside(p,m0.card)){m0.carry={x:p.x,y:p.y};return true}const h=['n','s'].find(z=>inside(p,sortZone(z)));if(h){place(h);return true}return false}
 if(k==='poster'&&!m0.postOk){for(const h of ['n','s'])for(let i=0;i<m0.post[h].length;i++){const s=spot(h,i);if(Math.hypot(p.x-s.x,p.y-s.y)<s.R+8){m0.lift={a:m0.post[h][i],from:h,i,x:p.x,y:p.y};return true}}return false}
 if(k==='sort'&&CARDS[m0.ci]){if(inside(p,m0.card)){m0.carry={x:p.x,y:p.y};return true}const h=['n','s'].find(z=>inside(p,sortZone(z)));if(h){file(h);return true}return false}
 return false}
function move(p){if(m0.drag){sink(m0.drag,p.y);return}if(m0.carry){m0.carry.x=p.x;m0.carry.y=p.y;Z.redraw();return}if(m0.lift){m0.lift.x=p.x;m0.lift.y=p.y;Z.redraw()}}
function up(p){const k=at();if(m0.drag){m0.drag=null;Z.redraw();return}
 if(m0.lift){const L=m0.lift;m0.lift=null;const moved=Math.hypot(L.x-spot(L.from,L.i).x,L.y-spot(L.from,L.i).y)>20,h=whichHalf(L);if(!moved||h!==L.from)return pickAnimal(L.from,L.i);return Z.redraw()}
 if(m0.carry){const cy=m0.carry;if(k==='middle'){const h=['n','s'].find(z=>{const d=disc(z);return Math.hypot(cy.x-d.x,cy.y-d.y)<d.R});m0.carry=null;if(h)return fillMid(h,cy.k);return Z.redraw()}
  if(k==='build'){const h=['n','s'].find(z=>inside(cy,sortZone(z)));if(h)return place(h)}
  if(k==='sort'){const h=['n','s'].find(z=>inside(cy,sortZone(z)));if(h)return file(h)}
  m0.carry=null;Z.redraw()}}
const gate=(i,ok,line)=>()=>{if(Z.step===i&&!Z.isDone&&(Z.pred[i]!=null||!steps[i].predict)&&ok())Z.done(line()+Z.reveal(i))};
function demo(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(Z.step===i)f()},Z.reduced()?30*(j+1):(j+1)*380))}
function begin(i,hint,ok,line){reset();say(hint);m0.check=gate(i,ok,line)}
const steps=[
{h:'What is under the ice?',p:'Both poles are white and icy on top. Drill down through the ice to find out what is underneath.',
 predict:{q:'What is under the ice at the North Pole?',opts:['land, like rock','sea water'],ans:1},
 task:'Drill at both poles',show:()=>demo(0,[()=>hit('n'),()=>hit('s')]),
 go:()=>begin(0,'Drag each drill down through the ice, or press a drill button.',()=>m0.drillOk,()=>'North: water. South: rock.')},
{h:'Ocean or land in the middle?',p:'From above, the two poles look like opposites. One is ocean with land round it. The other is land with ocean round it.',
 predict:{q:'What is in the middle of the Antarctic?',opts:['a frozen ocean','a huge piece of land'],ans:1},
 task:'Fill in the middle of both maps',show:()=>demo(1,[()=>fillMid('n','sea'),()=>fillMid('s','land')]),
 go:()=>begin(1,'Drag ocean or land into the middle of each map.',()=>m0.midOk,()=>'Ocean in the north, land in the south.')},
{h:'Who lives there?',p:'About four million people live in the Arctic, in towns round the frozen sea. Antarctica has no towns at all.',
 predict:{q:'Do families live in Antarctica all year, with homes and schools?',opts:['yes, in towns','no, only scientists who visit'],ans:1},
 task:'Find a place for all four buildings',show:()=>demo(2,BUILD.map(b=>()=>place(b[2]))),
 go:()=>begin(2,'Drag each building to the Arctic or Antarctica, or press a button.',()=>m0.buildOk,()=>'Towns in the Arctic, a science station in Antarctica.')},
{h:'Fix the posters',p:'Polar bears live in the north. Penguins live in the south. Some pictures show them together, but that is wrong.',
 predict:{q:'Can a wild polar bear meet a wild penguin?',opts:['yes, they live together on the ice','no, they live at opposite ends of the Earth'],ans:1},
 task:'Move the animal that is in the wrong place on each poster',show:()=>demo(3,[()=>pickAnimal('n',2),()=>pickAnimal('s',2)]),
 go:()=>begin(3,'Drag the wrong animal to the other poster, or tap it.',()=>m0.postOk,()=>'Bears north, penguins south.')},
{h:'Arctic or Antarctic?',p:'Now sort the clues. Think about what the drill found, who lives there and where each pole is.',
 task:'Sort all six clue cards',show:()=>demo(4,CARDS.map(x=>()=>file(x[1]))),
 go:()=>begin(4,'Drag the clue to the Arctic or Antarctic, or press a button.',()=>m0.sortOk,()=>'Three clues for each pole.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>m0.check()});
const QS=[
 ['What is under the ice at the North Pole?',[['sea water','ok'],['rock and soil','under'],['nothing at all','under']]],
 ['What is Antarctica?',[['a huge, icy piece of land: a continent','ok'],['a frozen ocean','middle'],['a small island near the North Pole','where']]],
 ['Where do penguins live in the wild?',[['in the south, round Antarctica','ok'],['in the Arctic','bird'],['at both poles','bird']]],
 ['Where do polar bears live?',[['in the Arctic, in the north','ok'],['in Antarctica','bear'],['at both poles','bear']]],
 ['Where can you find towns where families live all year?',[['in the Arctic','ok'],['in Antarctica','people'],['at both poles','people']]],
 ['Which is colder?',[['the Antarctic','ok'],['the Arctic','cold'],['they are just the same','cold']]],
 ['The Arctic is an ocean with … all round it.',[['land','ok'],['more ocean','middle'],['nothing','middle']]]];
function why(t){let m='Think back to the drill, the maps and the posters.';
 if(t==='under')m='The drill went through the Arctic ice into sea water. The ice floats on top of the ocean.';
 if(t==='middle')m='They are opposites: the Arctic is ocean with land round it; Antarctica is land with ocean round it.';
 if(t==='where')m='Antarctica is a huge continent round the South Pole, bigger than Europe.';
 if(t==='bird')m='Wild penguins live in the south. There are no wild penguins in the Arctic.';
 if(t==='bear')m='Polar bears live only in the north. They hunt seals on the frozen Arctic sea.';
 if(t==='people')m='Nobody lives in Antarctica all year. People live in Arctic towns; Antarctica only has science stations.';
 if(t==='cold')m='Both are very cold, but Antarctica is colder: it is thick ice piled high on land.';
 return m}
function ask(){qn++;const q=QS[qn%QS.length],r=qn%3,opts=[...q[1].slice(r),...q[1].slice(0,r)];
 quizBox.innerHTML=`<p><b>${q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t)});tell('Challenge: '+q[0]);Z.redraw()}
function mark(t){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const out=quizBox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)Z.win();else Z.sound.miss();out.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';out.querySelector('button').onclick=ask}
Z=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{quizBox.hidden=A.step!==5;btns.hidden=A.step===5;controls()},
 init:A=>{Z=A;reset();const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Pole buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});controls()}});
Z.start()})})();
