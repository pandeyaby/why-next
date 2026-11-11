/* Flagship: where water is found on Earth (topic "Where water is found on Earth"; ages 7-8; NGSS 2-ESS2-3 "identify where
   water is found on Earth and that it can be solid or liquid"; figures from USGS "Where is Earth's water?" after Gleick 1996:
   oceans about 96.5 %, all salty water about 97.5 %, ice caps and glaciers about 1.7 %, fresh groundwater about 0.8 %; of the
   fresh water about 69 % is ice, 30 % groundwater, about 1 % lakes, rivers, soil and air). Sort water places, pour Earth's
   water into 100 cups, split the fresh share, dig a well to groundwater and find fresh water on a map.
   Every tap or drag has a button twin. */
(()=>{
VIS.reg('flagwater',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['sort','cups','fresh','well','map','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
const SEA='#1d4ed8',FRESH='#38bdf8',ICE='#e0f2fe',ROCK='#78716c';
// water places: name, bin (0 salty, 1 fresh liquid, 2 frozen), picture
const PL={ocean:['the ocean',0,'wave'],river:['a river',1,'river'],glacier:['a glacier',2,'ice'],lake:['a lake',1,'lake'],sea:['the sea',0,'wave'],snow:['snow on a mountain',2,'snow'],pond:['a pond',1,'lake'],sheet:['an ice sheet',2,'ice']};
function pic(k,x,y,s){const g=A.ctx,C=A.col,t=PL[k][2];g.save();g.translate(x,y);g.lineWidth=2;g.strokeStyle=C.tx;
 if(t==='wave'){g.fillStyle=SEA;A.paint.rrect(-s,-s*.5,2*s,s,10);g.fill();g.strokeStyle='#fff';for(let r=0;r<2;r++){g.beginPath();for(let i=0;i<=8;i++){const px=-s+i*s/4;g.lineTo(px,-s*.15+r*s*.35+Math.sin(i*1.6)*s*.08)}g.stroke()}}
 if(t==='river'){g.fillStyle=A.mix(C.pn,'#16a34a',.35);A.paint.rrect(-s,-s*.5,2*s,s,10);g.fill();g.strokeStyle=FRESH;g.lineWidth=s*.22;g.beginPath();g.moveTo(-s,-s*.3);g.bezierCurveTo(-s*.2,-s*.4,-s*.2,s*.4,s,s*.3);g.stroke()}
 if(t==='lake'){g.fillStyle=A.mix(C.pn,'#16a34a',.35);A.paint.rrect(-s,-s*.5,2*s,s,10);g.fill();g.beginPath();g.ellipse(0,0,s*.7,s*.3,0,0,7);g.fillStyle=FRESH;g.fill();g.stroke()}
 if(t==='ice'||t==='snow'){g.fillStyle=t==='ice'?A.mix(C.pn,'#94a3b8',.4):ROCK;g.beginPath();g.moveTo(-s,s*.5);g.lineTo(0,-s*.6);g.lineTo(s,s*.5);g.closePath();g.fill();g.stroke();
  g.fillStyle=ICE;g.beginPath();if(t==='snow'){g.moveTo(-s*.35,-s*.2);g.lineTo(0,-s*.6);g.lineTo(s*.35,-s*.2)}else{g.moveTo(-s*.9,s*.5);g.lineTo(-s*.2,-s*.4);g.lineTo(s*.2,-s*.4);g.lineTo(s*.9,s*.5)}g.closePath();g.fill();g.stroke()}
 g.restore()}
function bins(){const n=3,w=(A.W-12*(n+1))/n;return['Salty water','Fresh water','Frozen (solid)'].map((t,i)=>({t,x:12+i*(w+12),y:A.H*.68,w,h:A.H*.28}))}
function sortDraw(){const g=A.ctx,C=A.col,cur=S.list[S.i];T(cur?`Where does ${PL[cur][0]} go?`:'All sorted!',A.W/2,A.H*.07,A.narrow?14:17,{w:800});
 if(cur){pic(cur,A.W/2,A.H*.35,Math.min(A.W*.2,A.H*.24));T(PL[cur][0],A.W/2,A.H*.56,A.narrow?14:16,{w:900})}
 S.bins=bins();S.bins.forEach((b,i)=>{g.fillStyle=A.alpha([SEA,FRESH,C.mu][i],.16);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T(b.t,b.x+b.w/2,b.y+16,A.narrow?11:14,{w:900,max:b.w-6});
  S.placed.filter(p=>p[1]===i).forEach((p,j)=>T(PL[p[0]][0],b.x+b.w/2,b.y+38+j*15,A.narrow?10:12,{w:600,max:b.w-6}))})}
function sortTo(b){const cur=S.list[S.i];if(!cur)return;const want=PL[cur][1];
 if(b!==want){A.sound.miss();say(want===0?`${PL[cur][0]} is salty. You could not drink it.`:want===2?`${PL[cur][0]} is frozen water: solid ice. It is fresh water, but it is not liquid.`:`${PL[cur][0]} holds fresh liquid water, not salty water.`);return}
 A.sound.pop();S.placed.push([cur,b]);S.i++;say(`Yes. ${PL[cur][0]}: ${S.bins[b].t}.`);A.redraw();controls();S.check()}
// 100 cups
const JARS=[['Ocean and seas',97,SEA],['Ice',2,ICE],['Under the ground',1,FRESH],['Lakes and rivers',0,'#0ea5e9']];
function cupAt(i){const cols=10,w=Math.min(A.W*.9/cols,A.H*.055),x0=(A.W-cols*w)/2;return[x0+(i%cols)*w,A.H*.12+Math.floor(i/cols)*w*1.0,w-3]}
function jarAt(i){const w=(A.W-12*5)/4;return{x:12+i*(w+12),y:A.H*.12+10*Math.min(A.W*.9/10,A.H*.055)+14,w,h:A.H*.2}}
function cupsDraw(){const g=A.ctx,C=A.col;let k=0;const fill=[];JARS.forEach((j,i)=>{if(S.poured.includes(i))for(let n=0;n<j[1];n++)fill[k++]=j[2]});
 T(S.poured.length<4?'Tap a jar to pour its share into the 100 cups':'100 cups of Earth\'s water',A.W/2,A.H*.05,A.narrow?13:16,{w:900});
 for(let i=0;i<100;i++){const[x,y,s]=cupAt(i);A.paint.rrect(x,y,s,s,3);g.fillStyle=fill[i]||A.alpha(C.tx,.05);g.fill();g.strokeStyle=A.alpha(C.tx,.4);g.lineWidth=1;g.stroke()}
 if(S.poured.includes(3)){const[x,y,s]=cupAt(99);g.beginPath();g.arc(x+s/2,y+s/2,s*.22,0,7);g.fillStyle='#0ea5e9';g.fill();g.strokeStyle=C.tx;g.stroke()}
 JARS.forEach((j,i)=>{const b=jarAt(i),done=S.poured.includes(i);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fillStyle=done?A.alpha(C.tx,.05):A.alpha(j[2],.35);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  T(j[0],b.x+b.w/2,b.y+b.h*.3,A.narrow?10:13,{w:800,max:b.w-4});T(done?(j[1]?`${j[1]} cup${j[1]>1?'s':''}`:'a few drops'):'tap',b.x+b.w/2,b.y+b.h*.68,A.narrow?12:15,{w:900,max:b.w-4})})}
function pour(i){if(S.poured.includes(i))return;S.poured.push(i);A.sound.pop();const j=JARS[i];
 say(i===0?'97 cups are salty ocean and sea water.':i===1?'2 cups are frozen ice, in glaciers and ice sheets.':i===2?'About 1 cup is fresh water hidden under the ground.':'Lakes and rivers hold only a few drops of the 100 cups.');A.redraw();controls();S.check()}
// the fresh water split
const PARTS=[['Ice',69],['Under the ground',30],['Lakes and rivers',1]],SIZE=['biggest part','middle part','tiny sliver'];
function seg(i){const x0=A.W*.05,W=A.W*.9,ws=[W*.64,W*.3,W*.06];let x=x0;for(let j=0;j<i;j++)x+=ws[j];return{x,y:A.H*.36,w:ws[i],h:A.H*.22}}
function freshDraw(){const g=A.ctx,C=A.col,cur=S.order[S.i];T('All the fresh water: which part is which?',A.W/2,A.H*.07,A.narrow?13:16,{w:900});
 if(cur!=null){T(`Where does "${PARTS[cur][0]}" go?`,A.W/2,A.H*.2,A.narrow?14:17,{w:900,c:C.ac})}else T('Most fresh water is frozen.',A.W/2,A.H*.2,A.narrow?14:17,{w:900,c:C.gr});
 for(let i=0;i<3;i++){const b=seg(i),got=S.got.includes(i);g.fillStyle=got?[ICE,FRESH,'#0ea5e9'][i]:A.alpha(C.tx,.08);g.fillRect(b.x,b.y,b.w,b.h);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(b.x,b.y,b.w,b.h);
  T(got?PARTS[i][0]:'?',b.x+b.w/2,b.y+b.h/2,A.narrow?12:15,{w:900,c:got?'#0f172a':C.tx,max:Math.max(b.w-4,10)});
  T(SIZE[i],i===2?A.W*.9:b.x+b.w/2,b.y+b.h+16+(i===2?16:0),A.narrow?10:12,{c:C.mu,al:i===2?'right':'center'})}}
function putPart(s){const cur=S.order[S.i];if(cur==null)return;
 if(s!==cur){A.sound.miss();say(cur===2?'Lakes and rivers look big when you visit them, but they hold only about 1 in 100 parts of the fresh water. They are the tiny sliver.':cur===0?'Ice holds the most fresh water: about 69 of every 100 parts, frozen in ice sheets and glaciers.':'Water under the ground is about 30 of every 100 parts: the middle part.');return}
 S.got.push(s);S.i++;A.sound.pop();say(`Yes: ${PARTS[s][0]} is the ${SIZE[s]}.`);A.redraw();controls();S.check()}
// digging a well
function wellDraw(){const g=A.ctx,C=A.col,top=A.H*.25,L=[['soil',.12,'#92400e'],['rock with air in its gaps',.2,ROCK],['rock with water in its gaps',.28,'#1e40af'],['solid rock',.15,'#44403c']];let y=top;
 g.fillStyle=A.mix(C.pn,'#16a34a',.3);g.fillRect(0,top-8,A.W,8);
 L.forEach(([n,h,col],i)=>{const hh=h*A.H;g.fillStyle=col;g.fillRect(0,y,A.W*.62,hh);for(let k=0;k<40;k++){const gx=(k*53)%(A.W*.6)+6,gy=y+((k*37)%Math.max(8,hh-8))+4;g.beginPath();g.arc(gx,gy,3,0,7);g.fillStyle=i===2?'#93c5fd':A.alpha('#fff',.25);g.fill()}
  T(n,A.W*.64,y+hh/2,A.narrow?10:13,{al:'left',c:C.tx,w:800,max:A.W*.35});y+=hh});
 S.table=top+(.12+.2)*A.H;S.bottom=y;const px=A.W*.3,tip=top+S.depth*(S.bottom-top);g.fillStyle=C.tx;g.fillRect(px-7,top-30,14,tip-top+30);g.fillStyle=C.pn;g.fillRect(px-3,top-30,6,tip-top+30);
 g.fillStyle=C.tx;g.fillRect(px-24,top-40,48,12);if(S.pumped){g.fillStyle=FRESH;g.beginPath();g.arc(px+30,top-20,9,0,7);g.fill()}
 T(S.pumped?'Fresh groundwater!':tip>=S.table?'The pipe reached water. Pump it up!':'Drag the pipe down to dig the well',A.W/2,A.H*.07,A.narrow?13:16,{w:900})}
function dig(d){const old=S.depth;S.depth=Math.max(0,Math.min(1,d));if(S.depth===old)return;const tip=A.H*.25+S.depth*((S.bottom||A.H)-A.H*.25);
 if(!S.wet&&tip>=(S.table||A.H*.57)){S.wet=1;A.sound.pop();say('Water! Under the ground, water fills the tiny gaps between bits of rock and soil.')}A.redraw();controls()}
function pump(){if(!S.wet){A.sound.miss();say('No water yet. Up here the gaps in the rock are full of air. Dig deeper.');return}S.pumped=1;A.sound.pop();say('Groundwater comes up the well. It was in the gaps in the rock, not in an underground lake.');A.redraw();controls();S.check()}
// map of places
function spots(){const W=A.W,H=A.H;return[['the ocean',0,W*.2,H*.78,W*.16],['an iceberg',1,W*.12,H*.6,W*.06],['a glacier',1,W*.8,H*.25,W*.09],['a river',1,W*.66,H*.55,W*.06],['a lake',1,W*.47,H*.75,W*.09],['a cloud',1,W*.3,H*.2,W*.09]]}
function mapDraw(){const g=A.ctx,C=A.col,W=A.W,H=A.H;g.fillStyle=A.mix(C.pn,'#16a34a',.25);g.fillRect(0,H*.35,W,H*.65);g.fillStyle=SEA;g.fillRect(0,H*.55,W*.36,H*.45);
 g.fillStyle=ROCK;g.beginPath();g.moveTo(W*.6,H*.5);g.lineTo(W*.8,H*.1);g.lineTo(W,H*.5);g.fill();g.fillStyle=ICE;g.beginPath();g.moveTo(W*.72,H*.26);g.lineTo(W*.8,H*.1);g.lineTo(W*.88,H*.26);g.lineTo(W*.84,H*.4);g.lineTo(W*.76,H*.4);g.fill();
 g.strokeStyle=FRESH;g.lineWidth=7;g.beginPath();g.moveTo(W*.78,H*.42);g.bezierCurveTo(W*.6,H*.5,W*.7,H*.62,W*.52,H*.72);g.stroke();g.fillStyle=FRESH;g.beginPath();g.ellipse(W*.47,H*.75,W*.09,H*.06,0,0,7);g.fill();
 g.fillStyle=ICE;g.beginPath();g.moveTo(W*.07,H*.64);g.lineTo(W*.11,H*.54);g.lineTo(W*.17,H*.64);g.fill();g.fillStyle=A.mix(C.pn,'#94a3b8',.75);[[-.04,0],[0,-.03],[.04,0]].forEach(([dx,dy])=>{g.beginPath();g.arc(W*(.3+dx),H*(.2+dy),W*.04,0,7);g.fill()});
 spots().forEach(([n,f,x,y,r],i)=>{if(S.found.includes(i)){g.strokeStyle=C.gr;g.lineWidth=4;g.beginPath();g.arc(x,y,r,0,7);g.stroke();T('✓ '+n,x,y-r-10,A.narrow?11:13,{w:900,c:C.tx})}});
 if(S.bad>=0){const[,,x,y,r]=spots()[S.bad];g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.arc(x,y,r,0,7);g.stroke()}
 T(`Tap every place with fresh water (${S.found.length} of 5)`,W/2,H*.05,A.narrow?13:16,{w:900})}
function tapSpot(i){const[n,f]=spots()[i];if(S.found.includes(i))return;
 if(!f){A.sound.miss();S.bad=i;say('The ocean is salty water. Look for fresh water: solid or liquid.');A.redraw();return}
 S.found.push(i);S.bad=-1;A.sound.pop();say(i===1?'An iceberg floats in the salty sea, but it broke off a glacier, so it is frozen fresh water.':i===5?'A cloud is made of tiny drops of fresh water.':`Yes: ${n} holds fresh water.`);A.redraw();controls();S.check()}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Of 100 cups: 97 salty, 2 ice, 1 underground',W/2,H*.3,A.narrow?13:17,{w:900});T('Lakes and rivers: just a few drops',W/2,H*.47,A.narrow?13:16);T('Water can be liquid or solid (ice)',W/2,H*.62,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 ({sort:sortDraw,cups:cupsDraw,fresh:freshDraw,well:wellDraw,map:mapDraw})[k]();A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{list:[],i:0,placed:[],poured:[],order:[2,1,0],got:[],depth:0,wet:0,pumped:0,found:[],bad:-1,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*320))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='sort'&&S.list[S.i])['Salty water','Fresh water','Frozen (solid)'].forEach((t,i)=>btn(t,()=>sortTo(i),`Put ${PL[S.list[S.i]][0]} in ${t}`));
 if(k==='cups')JARS.forEach((j,i)=>{if(!S.poured.includes(i))btn('Pour: '+j[0],()=>pour(i))});
 if(k==='fresh'&&S.order[S.i]!=null)SIZE.forEach((t,i)=>btn(t[0].toUpperCase()+t.slice(1),()=>putPart(i),`Put ${PARTS[S.order[S.i]][0]} on the ${t}`));
 if(k==='well'&&!S.pumped){if(S.depth<1)btn('Dig deeper',()=>dig(S.depth+.25));btn('Pump',pump,'Pump water up the well')}
 if(k==='map')spots().forEach(([n],i)=>{if(!S.found.includes(i))btn(n,()=>tapSpot(i),'Tap '+n)})}
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='sort'&&S.bins){const b=S.bins.findIndex(b=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h);if(b>=0)sortTo(b);return true}
 if(k==='cups'){const i=JARS.findIndex((j,i)=>{const b=jarAt(i);return p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h});if(i>=0)pour(i);return true}
 if(k==='fresh'){for(let i=0;i<3;i++){const b=seg(i),pad=i===2?14:0;if(p.x>=b.x-pad&&p.x<=b.x+b.w+pad&&p.y>=b.y&&p.y<=b.y+b.h){putPart(i);break}}return true}
 if(k==='well'){S.drag=1;if(p.y>A.H*.2&&!S.pumped)dig((p.y-A.H*.25)/((S.bottom||A.H)-A.H*.25));if(S.wet&&p.y<A.H*.25)pump();return true}
 if(k==='map'){const i=spots().findIndex(([,,x,y,r])=>Math.hypot(p.x-x,p.y-y)<r*1.1);if(i>=0)tapSpot(i);return true}return false}
const steps=[
{h:'Salty, fresh or frozen?',p:'Sea water is salty. Rivers, lakes and ponds are fresh water. Ice and snow are water too, but solid. Sort each place.',
 predict:{q:'Is the water in the sea salty or fresh?',opts:['Salty','Fresh','Frozen'],ans:0},
 task:'Sort 6 water places',show:()=>auto(0,[0,1,2,1,0,2].map(b=>()=>sortTo(b))),
 go:()=>{reset({list:['ocean','river','glacier','lake','sea','snow']});say('Where does the ocean go?');A.redraw();controls();S.check=finish(0,()=>S.i>=6,'Oceans and seas are salty. Rivers and lakes are fresh liquid water. Glaciers and snow are fresh water frozen solid.')}},
{h:'100 cups of water',p:'Pretend all the water on Earth is 100 cups. Pour each part into the cups and see how much there is.',
 predict:{q:'Of the 100 cups, how many are salty sea water?',opts:['About 97','About 50','About 70'],ans:0},
 task:'Pour all 4 jars into the 100 cups',show:()=>auto(1,[0,1,2,3].map(i=>()=>pour(i))),
 go:()=>{reset();say('Tap a jar to pour it.');A.redraw();controls();S.check=finish(1,()=>S.poured.length===4,'97 cups are salty. Only about 3 cups are fresh, and most of that is ice.')}},
{h:'Where is the fresh water?',p:'Now take only the fresh water and split it into parts. Put each name on its part.',
 predict:{q:'Where is most of Earth\'s fresh water?',opts:['Frozen as ice','In rivers and lakes','In clouds'],ans:0},
 task:'Put all 3 names on the right part',show:()=>auto(2,[2,1,0].map(s=>()=>putPart(s))),
 go:()=>{reset();say('Where does Lakes and rivers go?');A.redraw();controls();S.check=finish(2,()=>S.got.length===3,'Ice is the biggest part, water under the ground is next, and lakes and rivers are a tiny sliver.')}},
{h:'Water under the ground',p:'Some fresh water is hidden under the ground. Drag the pipe down to dig a well, then pump.',
 predict:{q:'What is water under the ground like?',opts:['Water in tiny gaps in rock','A big underground lake','A river in a pipe'],ans:0},
 task:'Dig down to the water and pump it up',show:()=>auto(3,[()=>dig(.25),()=>dig(.5),()=>dig(.75),pump]),
 go:()=>{reset();say('Drag the pipe down, or press Dig deeper.');A.redraw();controls();S.check=finish(3,()=>S.pumped,'Groundwater fills the tiny gaps in rock and soil, like water in a sponge.')}},
{h:'Find fresh water',p:'Look at the map. Tap every place that has fresh water, solid or liquid. Watch out for salty water.',
 task:'Find all 5 places with fresh water',show:()=>auto(4,[1,2,3,4,5].map(i=>()=>tapSpot(i))),
 go:()=>{reset();say('Tap a place with fresh water.');A.redraw();controls();S.check=finish(4,()=>S.found.length===5,'Glacier, iceberg, river, lake and cloud all hold fresh water. Only the ocean is salty.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Where is most of Earth\'s water?',[['In the oceans','ok'],['In rivers','river'],['In clouds','cloud']]],
 ['Is a glacier salty, fresh or not water?',[['Fresh water, frozen solid','ok'],['Salty water','salty'],['Not water, just rock','rock']]],
 ['Where is most fresh water?',[['Frozen as ice','ok'],['In lakes and rivers','river'],['In the sea','sea']]],
 ['Can we drink sea water?',[['No, it is too salty','ok'],['Yes, it is just water','drink'],['Yes, if it is cold','cold']]],
 ['What is water under the ground like?',[['Water in tiny gaps in rock','ok'],['A big underground lake','lake'],['There is no water under the ground','none']]],
 ['Water can be solid or liquid. Which is solid water?',[['Ice on a pond','ok'],['Rain','rain'],['A river','river2']]],
 ['An iceberg floats in the salty sea. What is it made of?',[['Frozen fresh water','ok'],['Frozen salty sea water','bergsalt'],['White rock','rock']]]];
function why(t){let m='Most water is salty and in the oceans; most fresh water is ice.';
 if(t==='river')m='Rivers and lakes hold only a few drops of every 100 cups. Most water is in the oceans; most fresh water is ice.';
 if(t==='cloud')m='Clouds hold only a tiny bit of water. Most of Earth\'s water is in the salty oceans.';
 if(t==='salty')m='A glacier is made of snow piled up on land, so its ice is fresh water.';
 if(t==='rock')m='It looks white and hard, but it is ice: frozen fresh water. Ice is solid water.';
 if(t==='sea')m='Sea water is salty, not fresh. Most fresh water is frozen as ice.';
 if(t==='drink')m='Sea water is salty. It is not safe to drink.';
 if(t==='cold')m='Cold sea water is still salty. Cooling it does not take the salt out.';
 if(t==='lake')m='Most groundwater is not a big lake. It fills tiny gaps in rock and soil, like a sponge.';
 if(t==='none')m='There is water under the ground. Wells pump it up from the gaps in rock.';
 if(t==='rain')m='Rain is liquid water falling from clouds. Ice is the solid one.';
 if(t==='river2')m='A river flows, so it is liquid water. Ice is solid water.';
 if(t==='bergsalt')m='An iceberg breaks off a glacier, which formed from snow, so it is fresh water.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Water controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>{if(S.drag&&kind()==='well'&&!S.pumped&&p.y>A.H*.25)dig((p.y-A.H*.25)/((S.bottom||A.H)-A.H*.25))},up:()=>{S.drag=0}});controls()}});
A.start()})})();
