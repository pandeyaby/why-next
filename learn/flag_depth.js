/* Flagship: Ocean Depth Zones (ages 7–9; NOAA Ocean Exploration and Smithsonian Ocean: sunlight zone 0–200 m,
   twilight zone 200–1000 m, midnight zone below 1000 m with no sunlight at all). Dive a submarine and watch the light
   meter fall; name the three zones from top to bottom; plant tiny sea plants and see they only grow where there is
   light; give a turtle, a lanternfish and an anglerfish their zones; drop "marine snow" to feed the deep.
   Not flagocean (shore, shallow, deep), flagseaneed (what sea animals need) or flagovar (variety of sea animals). */
(()=>{
VIS.reg('flagdepth',c=>{let A,pad,quizBox,item=-1,run=0;const S={};c.fig.classList.add('young');
const part=()=>['dive','name','plant','home','snow','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const ZN=['Sunlight zone','Twilight zone','Midnight zone'],TOP=[0,200,1000],BOT=[200,1000,4000];
const sky=()=>A.H*.15,share=[.24,.3,.46];
const bandTop=z=>{let y=sky();for(let i=0;i<z;i++)y+=share[i]*(A.H-sky());return y},bandH=z=>share[z]*(A.H-sky());
function yOf(d){const z=d<200?0:d<1000?1:2;return bandTop(z)+Math.min(1,(d-TOP[z])/(BOT[z]-TOP[z]))*bandH(z)}
function depthOf(y){if(y<=sky())return 0;for(let z=0;z<3;z++){const t=bandTop(z),h=bandH(z);if(y<t+h||z===2){const f=Math.max(0,Math.min(1,(y-t)/h));return TOP[z]+f*(BOT[z]-TOP[z])}}return 0}
const zoneAt=y=>y<sky()?-1:y<bandTop(1)?0:y<bandTop(2)?1:2;
/* sunlight drops to about 1 part in 100 by 200 m (clear ocean); none is left below 1000 m */
const light=d=>d>=1000?0:Math.exp(-d/43);
const lightWord=d=>{const p=light(d);return d>=1000?'none':p>=.3?'lots':p>=.05?'some':p>=.005?'a little':'almost none'};
function txt(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';
 if(o.pill){const w=g.measureText(s).width+16;const x0=o.al==='left'?x-8:o.al==='right'?x-w+8:x-w/2;g.fillStyle=o.pill;A.paint.rrect(x0,y-px*.75,w,px*1.5,px*.6);g.fill()}
 g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y)}
const fs=()=>A.narrow?15:18;
const WATER=[['#7dd3fc','#0284c7'],['#1e40af','#172554'],['#0b1120','#020617']];
function ocean(){const g=A.ctx;for(let z=0;z<3;z++){const t=bandTop(z),h=bandH(z);g.fillStyle=A.paint.lin(0,t,0,t+h,[[0,WATER[z][0]],[1,WATER[z][1]]]);g.fillRect(0,t,A.W,h+1)}
 g.setLineDash([6,6]);g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;[1,2].forEach(z=>{g.beginPath();g.moveTo(0,bandTop(z));g.lineTo(A.W,bandTop(z));g.stroke()});g.setLineDash([]);
 txt('0 m',A.W-8,sky()+14,A.narrow?13:14,{al:'right',ink:'#0f172a',pill:'rgba(255,255,255,.85)'});
 txt('200 m',A.W-8,bandTop(1),A.narrow?13:14,{al:'right',ink:'#0f172a',pill:'rgba(255,255,255,.85)'});txt('1000 m',A.W-8,bandTop(2),A.narrow?13:14,{al:'right',ink:'#0f172a',pill:'rgba(255,255,255,.85)'});
 txt('not to scale',A.W-8,A.H-14,A.narrow?12:13,{al:'right',ink:'#e2e8f0',w:600})}
function names(){for(let z=0;z<3;z++)if(S.named[z])txt(ZN[z],10,bandTop(z)+bandH(z)/2,fs(),{al:'left',ink:'#0f172a',pill:'#f8fafc',w:800})}
function skyBg(){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.6);g.fillRect(0,0,A.W,sky())}
function sub(x,y){const g=A.ctx,r=A.narrow?20:26;g.fillStyle='#facc15';g.beginPath();g.ellipse(x,y,r*1.6,r,0,0,7);g.fill();g.strokeStyle='#0f172a';g.lineWidth=2;g.stroke();
 g.fillStyle='#bae6fd';g.beginPath();g.arc(x+r*.6,y,r*.4,0,7);g.fill();g.stroke();g.fillStyle='#facc15';g.fillRect(x-r*.3,y-r*1.5,r*.5,r*.6);g.strokeRect(x-r*.3,y-r*1.5,r*.5,r*.6)}
function drawDive(){const C=A.col,y=yOf(S.d),p=light(S.d);sub(A.W*.42,y);
 const bw=A.W*.34,bx=A.W*.6,by=sky()*.5;txt('Light:',bx-8,by,fs(),{al:'right',w:800});A.ctx.strokeStyle=C.tx;A.ctx.lineWidth=2;A.ctx.strokeRect(bx,by-10,bw,20);
 A.ctx.fillStyle='#f59e0b';A.ctx.fillRect(bx+1,by-9,Math.max(0,(bw-2)*p),18);
 txt(`${Math.round(S.d)} m deep · light: ${lightWord(S.d)}`,A.W*.42,Math.min(A.H-34,y+(A.narrow?40:50)),fs(),{ink:'#0f172a',pill:'#f8fafc',w:800});
 txt('☀️',A.W*.1,by,A.narrow?22:28)}
function drawChips(){const r=chipBox;for(let i=0;i<3;i++){if(S.named[i])continue;const b=r(i);if(S.held===i&&S.drag)continue;
 const g=A.ctx;g.fillStyle=S.held===i?A.col.ac:A.mix(A.col.pn,'#ffffff',.5);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=2;g.stroke();
 txt(ZN[i].split(' ')[0],b.x+b.w/2,b.y+b.h/2,fs(),{ink:S.held===i?'#ffffff':A.col.tx,w:800})}
 if(S.drag&&S.held!=null)txt(ZN[S.held].split(' ')[0],S.drag.x,S.drag.y,fs(),{ink:'#0f172a',pill:'#fde68a',w:800})}
const chipBox=i=>{const w=A.W*.28,h=Math.min(40,sky()*.7);return{x:A.W*(.04+i*.33),y:(sky()-h)/2,w,h}};
function plant(x,y,z,t){const g=A.ctx,s=(A.narrow?7:9)*(z===0?1+Math.min(1,t)*1.2:1);g.fillStyle=z===0?'#22c55e':'#94a3b8';
 for(let k=0;k<5;k++){g.beginPath();g.arc(x+Math.cos(k*1.26)*s*.7,y+Math.sin(k*1.26)*s*.7,s*.55,0,7);g.fill()}
 if(z>0)txt('✗',x,y-s*1.8,A.narrow?14:16,{ink:'#fca5a5',w:900})}
/* anglerfish: dark body with a pale outline (visible on black), teeth, and a glowing lure on a stalk */
function angler(x,y,s){const g=A.ctx;g.fillStyle='#57534e';g.strokeStyle='#e7e5e4';g.lineWidth=2;g.beginPath();g.ellipse(x,y,s,s*.7,0,0,7);g.fill();g.stroke();
 g.beginPath();g.moveTo(x+s*.9,y);g.lineTo(x+s*1.5,y-s*.5);g.lineTo(x+s*1.5,y+s*.5);g.closePath();g.fill();g.stroke();
 g.fillStyle='#f8fafc';for(let k=0;k<4;k++){g.beginPath();g.moveTo(x-s*.95+k*s*.18,y+s*.05);g.lineTo(x-s*.86+k*s*.18,y+s*.3);g.lineTo(x-s*.77+k*s*.18,y+s*.05);g.fill()}
 g.beginPath();g.arc(x-s*.35,y-s*.25,s*.14,0,7);g.fill();g.strokeStyle='#e7e5e4';g.beginPath();g.moveTo(x-s*.2,y-s*.65);g.quadraticCurveTo(x-s*.6,y-s*1.5,x-s*1.15,y-s*1.05);g.stroke();
 A.paint.glow('#fde047',16);g.fillStyle='#fde047';g.beginPath();g.arc(x-s*1.15,y-s*1.05,s*.2,0,7);g.fill();A.paint.noShadow()}
const ANI=[['🐢','sea turtle'],['🐟','lanternfish'],['','anglerfish']],HOME=[0,1,2];
const aniStart=i=>({x:A.W*(.2+i*.3),y:sky()/2});
function drawHome(){for(let i=0;i<3;i++){const p=S.ani[i]||aniStart(i);if(S.held===i&&S.drag)continue;i===2?angler(p.x,p.y,A.narrow?13:16):txt(ANI[i][0],p.x,p.y,A.narrow?28:34);
 txt(ANI[i][1],p.x,p.y+(A.narrow?24:28),A.narrow?13:14,{ink:S.ani[i]?'#0f172a':A.col.tx,pill:S.ani[i]?'#f8fafc':null,w:800});
}
 if(S.drag&&S.held!=null)S.held===2?angler(S.drag.x,S.drag.y,A.narrow?14:17):txt(ANI[S.held][0],S.drag.x,S.drag.y,A.narrow?30:36)}
function drawSnow(){const g=A.ctx,ax=A.W*.5,ay=bandTop(2)+bandH(2)*.6;angler(ax,ay,A.narrow?18:22);
 for(const f of S.flakes){g.fillStyle='#f1f5f9';g.beginPath();g.arc(f.x,f.y,A.narrow?4:5,0,7);g.fill()}
 txt(`Food that reached the anglerfish: ${S.fed}`,A.W/2,sky()*.5,fs(),{w:800});txt('Tap the top zone to drop food',A.W/2,bandTop(0)+18,A.narrow?13:15,{ink:'#0f172a',pill:'#f8fafc'})}
function draw(Q){skyBg();ocean();const k=part();
 if(k==='dive')drawDive();
 if(k==='name'){names();drawChips()}
 if(k==='plant'){S.named=[...ZN];names();S.plants.forEach(p=>plant(p.x,p.y,p.z,p.t));txt(`Growing plants: ${S.plants.filter(p=>p.z===0).length}`,Q.W/2,sky()*.5,fs(),{w:800})}
 if(k==='home'){S.named=[...ZN];names();drawHome()}
 if(k==='snow'){S.named=[...ZN];names();drawSnow()}
 if(k==='chal'){S.named=[...ZN];names();txt(S.q?'Challenge':'',Q.W/2,sky()*.5,fs(),{w:800})}}
function fresh(o){run++;for(const k in S)delete S[k];Object.assign(S,{d:0,named:[null,null,null],held:null,drag:null,plants:[],ani:[null,null,null],flakes:[],fed:0,q:'',ok:()=>{}},o||{})}
const finishIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts,gap){steps[i].go();const t=run;acts.forEach((f,j)=>setTimeout(()=>{if(t===run)f()},A.reduced()?25*(j+1):(gap||380)*(j+1)))}
function after(m){tell(m);A.redraw();keys();S.ok()}
/* dive */
function setDepth(d){S.d=Math.max(0,Math.min(4000,d));const w=lightWord(S.d);
 after(S.d>=1000?`${Math.round(S.d)} m. No sunlight reaches here at all. It is dark all day and all night.`:S.d>=200?`${Math.round(S.d)} m. Only dim blue light. Light left: ${w}.`:`${Math.round(S.d)} m. Light left: ${w}.`)}
const STOPS=[0,50,100,150,200,400,600,800,1000,2000,4000];
const deeper=()=>setDepth(STOPS.find(s=>s>S.d+1)??4000),upper=()=>setDepth([...STOPS].reverse().find(s=>s<S.d-1)??0);
/* name zones */
function place(i,z){S.held=null;S.drag=null;
 if(S.named[z]){A.sound.miss();return after(`That zone already has a name: ${S.named[z]}.`)}
 if(i===z){S.named[z]=ZN[i];A.sound.pop();const n=S.named.filter(Boolean).length;
  return after(n===3?'Sunlight on top, then twilight, then midnight. Each zone is darker than the one above.':`Yes, the ${ZN[i].toLowerCase()} is ${['the top 200 m, full of light','from 200 m to 1000 m, where light fades','below 1000 m, where it is always dark'][i]}.`)}
 A.sound.miss();after(i===2?'Midnight means dark. The darkest water is the deepest, so midnight goes at the bottom.':i===1?(z===0?'Twilight means dim light, like the evening. The top gets the most light, so it is the sunlight zone.':'Twilight is the dim middle zone, between bright and dark.'):'Sunlight shines in from the top. The sunlight zone is the one nearest the surface.')}
function nameNext(){const z=S.named.findIndex(x=>!x);if(z>=0)place(z,z)}
/* plant */
function sow(z,x){const y=bandTop(z)+bandH(z)*(.3+.4*Math.random()),p={x:x??A.W*(.5+.12*(S.plants.length%4)),y,z,t:0};S.plants.push(p);A.tween(p,{t:1},700,'out');
 const n=S.plants.filter(q=>q.z===0).length;z===0?A.sound.pop():A.sound.miss();
 after(z===0?(n>=3?`${n} plants are growing in the sunlight zone. Plants need light to make their food.`:'It grows! There is plenty of light here.'):z===1?'It does not grow. The twilight zone has too little light for a plant to make food.':'It cannot grow. There is no light at all in the midnight zone.')}
/* homes */
function settle(i,z,x){S.held=null;S.drag=null;
 if(z!==HOME[i]){A.sound.miss();return after(i===0?'A sea turtle must swim up to breathe air, and it eats sea grass and jellyfish. It lives in the sunlit top zone.':
  i===1?'A lanternfish hides in dim light in the day and swims up at night to eat. Its home is the twilight zone.':'An anglerfish makes its own light to catch food in the dark. It lives deep in the midnight zone.')}
 S.ani[i]={x:x??A.W*.55,y:bandTop(z)+bandH(z)*.55};A.sound.pop();const n=S.ani.filter(Boolean).length;
 after(n===3?'Every animal is home. Most sea life is in the sunlight zone, because that is where plants grow and make food.':`Yes, the ${ANI[i][1]} lives in the ${ZN[z].toLowerCase()}.`)}
function homeNext(){const i=S.ani.findIndex(a=>!a);if(i>=0)settle(i,HOME[i])}
/* marine snow */
function drop(x){if(S.flakes.length>=3||S.fed>=3)return;const f={x:x??A.W*(.42+.08*S.flakes.length),y:bandTop(0)+30};S.flakes.push(f);A.sound.tick();tell('Food bits sink down through the dark…');
 A.tween(f,{x:A.W*.5-(A.narrow?16:20),y:bandTop(2)+bandH(2)*.6+2},1100,'io',()=>{S.flakes.splice(S.flakes.indexOf(f),1);S.fed++;A.sound.pop();
  after(S.fed>=3?'The anglerfish ate 3 times without any plants nearby. Deep animals eat bits of dead plants and animals that sink from above. This is called marine snow.':`Food reached the anglerfish: ${S.fed}.`)})}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='dive'){b('Dive deeper',deeper);b('Go up',upper)}
 const where=(f,lab)=>['top','middle','bottom'].forEach((w,z)=>b(`→ ${w}`,()=>f(z),`Put the ${lab} in the ${w} zone`));
 if(k==='name'){for(let i=0;i<3;i++)if(!S.named[i])b(ZN[i].split(' ')[0],()=>{S.held=i;A.redraw();keys();tell(`Holding ${ZN[i]}. Now choose top, middle or bottom.`)},`Pick ${ZN[i]}`);
  if(S.held!=null)where(z=>place(S.held,z),ZN[S.held])}
 if(k==='plant'){b('Plant at the top',()=>sow(0));b('Plant in the middle',()=>sow(1));b('Plant at the bottom',()=>sow(2))}
 if(k==='home'){for(let i=0;i<3;i++)if(!S.ani[i])b(ANI[i][1],()=>{S.held=i;A.redraw();keys();tell(`Holding the ${ANI[i][1]}. Now choose top, middle or bottom.`)},`Pick the ${ANI[i][1]}`);
  if(S.held!=null)where(z=>settle(S.held,z),ANI[S.held][1])}
 if(k==='snow'&&S.fed<3)b('Drop food',()=>drop())}
const hitBox=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const k=part();
 if(k==='dive'){if(p.y<sky())return false;setDepth(Math.round(depthOf(p.y)/50)*50);return true}
 if(k==='name'){for(let i=0;i<3;i++)if(!S.named[i]&&hitBox(p,chipBox(i))){S.held=i;S.drag=null;A.redraw();keys();tell(`Holding ${ZN[i]}. Drag it, or tap a zone.`);return true}
  if(S.held!=null){const z=zoneAt(p.y);if(z>=0){place(S.held,z);return true}}return false}
 if(k==='plant'){const z=zoneAt(p.y);if(z<0)return false;sow(z,p.x);return true}
 if(k==='home'){for(let i=0;i<3;i++){const q=aniStart(i);if(!S.ani[i]&&Math.hypot(p.x-q.x,p.y-q.y)<A.W*.12){S.held=i;S.drag=null;A.redraw();keys();tell(`Holding the ${ANI[i][1]}. Drag it, or tap a zone.`);return true}}
  if(S.held!=null){const z=zoneAt(p.y);if(z>=0){settle(S.held,z,p.x);return true}}return false}
 if(k==='snow'){if(zoneAt(p.y)!==0)return false;drop(p.x);return true}return false}
function move(p){const k=part();if(k==='dive'){setDepth(Math.round(depthOf(p.y)/50)*50);return}if((k==='name'||k==='home')&&S.held!=null){S.drag=p;A.redraw()}}
function up(p){const k=part();if(!p||S.held==null||!S.drag)return;const z=zoneAt(p.y);if(z<0){S.drag=null;A.redraw();return}k==='name'?place(S.held,z):settle(S.held,z,p.x)}
const steps=[
{h:'Dive down',p:'Sunlight shines into the sea from above. Take the submarine down and watch the light meter.',
 predict:{q:'As you go deeper, what happens to the sunlight?',opts:['It stays bright all the way down','It fades until there is none','It gets brighter near the sea floor'],ans:1},
 task:'Dive to 1000 m or deeper',show:()=>auto(0,[100,200,400,800,1000].map(d=>()=>setDepth(d))),
 go:()=>{fresh();tell('A submarine at the surface. Drag it down, or use the buttons.');keys();S.ok=finishIf(0,()=>S.d>=1000,'Light fades fast. By 200 m almost all of it is gone, and below 1000 m there is none.')}},
{h:'Name the zones',p:'Scientists split the open ocean into zones by how much light there is. Drag each name to its zone, or tap a name and then a zone.',
 predict:{q:'Which zone do you think is the deepest?',opts:['Sunlight zone','Twilight zone','Midnight zone'],ans:2},
 task:'Put all 3 names in the right zones',show:()=>auto(1,[nameNext,nameNext,nameNext]),
 go:()=>{fresh();tell('Three bands of water, light to dark. Three names to place: Sunlight, Twilight, Midnight.');keys();S.ok=finishIf(1,()=>S.named.every(Boolean),'Sunlight 0–200 m, twilight 200–1000 m, midnight below 1000 m.')}},
{h:'Where can plants grow?',p:'Sea plants, like seaweed and tiny floating plants, use light to make their food. Tap a zone to plant one there.',
 predict:{q:'Where can sea plants grow?',opts:['In all three zones','Only in the sunlight zone','Only in the midnight zone'],ans:1},
 task:'Get 3 plants growing',show:()=>auto(2,[()=>sow(1),()=>sow(0),()=>sow(0),()=>sow(0)]),
 go:()=>{fresh();tell('The three zones are named. Tap a zone to plant a tiny sea plant.');keys();S.ok=finishIf(2,()=>S.plants.filter(p=>p.z===0).length>=3,'Plants only grow where light reaches, in the sunlight zone.')}},
{h:'Who lives where?',p:'Each animal suits its zone. Drag each one to its home.',
 task:'Give all 3 animals a home',show:()=>auto(3,[homeNext,homeNext,homeNext]),
 go:()=>{fresh();tell('A sea turtle, a lanternfish and an anglerfish wait above the water.');keys();S.ok=finishIf(3,()=>S.ani.every(Boolean),'Turtle on top, lanternfish in the twilight, anglerfish in the dark.')}},
{h:'Food from above',p:'No plants grow in the midnight zone. So how do the animals down there eat? Drop some food in the sunlight zone and watch.',
 predict:{q:'Nothing grows in the midnight zone. What do the animals there eat?',opts:['Plants that grow in the dark','Bits of food that sink from above','Nothing at all'],ans:1},
 task:'Feed the anglerfish 3 times',show:()=>auto(4,[drop,drop,drop],420),
 go:()=>{fresh();tell('An anglerfish in the midnight zone. Its glowing lure helps it hunt.');keys();S.ok=finishIf(4,()=>S.fed>=3,'Deep animals live on food that falls from the sunlit zone.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['What happens to sunlight as you go deeper in the sea?','It fades until there is none',[['It stays the same all the way down','same'],['It gets brighter near the bottom','same']]],
 ['Which zone is at the top of the ocean?','Sunlight zone',[['Midnight zone','order'],['Twilight zone','order']]],
 ['Why do sea plants only grow in the sunlight zone?','They need light to make food',[['The water is too salty lower down','plant'],['Fish eat them all lower down','plant']]],
 ['Is the midnight zone dark in the daytime?','Yes, it is always dark',[['No, it is only dark at night','night'],['No, the Sun lights it at midday','night']]],
 ['Where does an anglerfish with a glowing lure live?','Midnight zone',[['Sunlight zone','lure'],['Twilight zone','lure']]],
 ['Nothing grows in the midnight zone. What do animals there eat?','Food that sinks from above',[['Plants that grow in the dark','plant'],['They do not eat','snow']]]];
function why(tag){let m='Think about how much light reaches each zone.';
 if(tag==='same')m='Water soaks up sunlight. The deeper you go, the less light is left, until below 1000 m there is none.';
 if(tag==='order')m='The zones go from most light to least: sunlight on top, then twilight, then midnight at the bottom.';
 if(tag==='plant')m='Plants need light to make their food. Below the sunlight zone there is too little light.';
 if(tag==='night')m='Midnight is just the zone’s name. Sunlight never reaches it, so it is dark day and night.';
 if(tag==='lure')m='A glowing lure only helps where it is dark. The anglerfish lives deep in the midnight zone.';
 if(tag==='snow')m='Deep animals do eat: bits of dead plants and animals sink down from above, like snow.';
 return m}
function ask(){item++;const[q,ans,bad]=QS[item%QS.length],opts=[[ans,'ok'],...bad],r=item%3,order=opts.slice(r).concat(opts.slice(0,r));S.q=q;
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
function mark(tag,ans){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();tell(ok?'Yes. '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.15,draw,onStep:Q=>{quizBox.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ocean controls'},w);quizBox=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
