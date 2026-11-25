/* Data and drawings for flagvent (deep-sea life without sunlight; Science, ages 11-13). Sources: NOAA Ocean Exploration
   'What is a hydrothermal vent?' and 'How far does light travel in the ocean?' (sunlight for photosynthesis only in the top
   ~200 m; almost none below ~1,000 m); WHOI / Alvin 1977 Galapagos Rift dive at about 2,500 m; Cavanaugh et al. 1981
   (Science 213) chemosynthetic symbionts in Riftia pachyptila, which has no mouth or gut as an adult; Fisher et al. on
   Calyptogena symbionts in the gills; Micheli et al. 2002 on vent crabs (Bythograea) grazing and eating tube worms; Sancho
   et al. 2005 on the vent eelpout Thermarces cerberus feeding on snails and amphipods; Waite et al. 2017 (Science 356)
   molecular hydrogen in the Enceladus plume from Cassini's October 2015 fly-through; NASA Europa Clipper (launched Oct
   2024, arriving 2030). Chemosynthesis summary equation CO2 + 4H2S + O2 -> CH2O + 4S + 3H2O (balanced).
   Slips it targets: vent life runs on the vent's heat; the base of every food web is plants; tube worms eat with a mouth;
   animals at vents make their own food; vent life needs no Sun at all (the bacteria use oxygen made by photosynthesis);
   a little sunlight reaches the deep floor; any icy or rocky world could host vent life. */
const VENT=(()=>{
const VENT_DEPTH=2500,MAX=3000;
/* light that reaches depth d (m), clear ocean water, attenuation about 0.023 per metre (1% left at 200 m) */
const light=d=>100*Math.exp(-0.023*d);
const zone=d=>d<200?'Sunlight zone':d<1000?'Twilight zone':'Midnight zone';
const lightWords=d=>{const L=light(d);return d<200?`${L>=10?Math.round(L):L.toFixed(1)}% of the surface light: enough for algae to photosynthesise`:d<1000?'a faint blue glow, too dim for photosynthesis':'no sunlight at all'};
/* step 2: sort each fact into the right way of making food (0 = photosynthesis, 1 = chemosynthesis) */
const SORT=[['Energy comes from sunlight',0],['Energy comes from hydrogen sulfide',1],['Algae and plants make the food',0],['Bacteria at the vent make the food',1],['Gives out oxygen',0],['Leaves sulfur behind',1]];
const SORTWHY=['Sunlight powers photosynthesis, so it only works in the sunlit water at the top.','Vent bacteria get energy by reacting hydrogen sulfide from the vent with oxygen from the sea.','In sunlit water, algae (phytoplankton) and plants are the producers.','At the vent there is no light, so bacteria are the producers.','Photosynthesis splits water and gives out oxygen.','Chemosynthesis turns hydrogen sulfide into sulfur, which some bacteria store as yellow grains.'];
/* step 3: where does each animal get its food? answer first, then [wrong, slip] */
const FEED=[{who:'Giant tube worm',q:'The giant tube worm has no mouth and no gut. How does it get food?',a:'Bacteria living inside its body make food for it',o:[['It catches food with its red plume and swallows it','mouth'],['It soaks up sunlight through its tube','sun']],from:0,to:1},
 {who:'Giant clam',q:'Where does the giant vent clam get most of its food?',a:'From bacteria living in its gills',o:[['From seaweed growing on the vent','plant'],['From the heat of the hot water','heat']],from:0,to:2},
 {who:'Vent crab',q:'What does the vent crab eat?',a:'Bacteria mats, and bits of tube worms and clams',o:[['Nothing: it makes its own food','producer'],['Seaweed carried down from the surface','plant']],from:0,to:3,also:1},
 {who:'Eelpout fish',q:'What does the eelpout fish at the vent eat?',a:'Small animals like snails and amphipods',o:[['Sunlit plankton','sun'],['It makes food from sulfur','producer']],from:3,to:4}];
const BEINGS=['Bacteria','Tube worm','Clam','Crab','Eelpout'];
/* step 4: two switches; what each living group does (0-1) */
function pops(sun,vent){return{plankton:sun?1:.05,bacteria:vent?1:.05,worms:vent?1:.08,crabs:vent?.9:.1,deep:sun?1:.3}}
const POPLABEL={plankton:'Sunlit plankton',bacteria:'Vent bacteria',worms:'Tube worms and clams',crabs:'Vent crabs',deep:'Animals living on falling food'};
/* step 5: worlds; ok = an ocean world with signs of vent-like chemistry */
const WORLDS=[{n:'Enceladus',c:['#f1f5f9','#bae6fd'],ok:1,why:'Saturn\u2019s moon Enceladus sprays water from an ocean under its ice. In 2015 Cassini flew through the spray and found hydrogen gas, a sign of hot water reacting with rock on the seafloor.'},
 {n:'Our Moon',c:['#a8a29e','#57534e'],ok:0,why:'Our Moon has no liquid ocean. Its water is ice in dark craters, so there is no seafloor for vents.'},
 {n:'Europa',c:['#fef3c7','#92400e'],ok:1,why:'Jupiter\u2019s moon Europa has a salty ocean under its ice, on a rocky floor that may have vents. NASA\u2019s Europa Clipper arrives in 2030 to study it.'},
 {n:'Mars today',c:['#f97316','#9a3412'],ok:0,why:'Mars has no ocean on its surface today. Its water is mostly ice, so it is not an ocean world like Europa.'}];
const DESC=['A column of sea water from the surface down to the seafloor at 3,000 metres. Drag the probe down, or use the buttons, and read how much sunlight is left.',
 'One card at a time. Tap the box it belongs in: Photosynthesis or Chemosynthesis.',
 'A hydrothermal vent with bacteria, a tube worm, a clam, a crab and an eelpout fish. Answer where each animal gets its food and watch the food web arrows appear.',
 'Two switches: the Sun and the vent. Each bar shows how a group of living things copes. Turn each switch off and on.',
 'Four worlds. Tap the two that are ocean worlds where vents like Earth\u2019s might exist.'];
const TXT=['Sunlight fades fast in sea water. Below about 1,000 metres it is dark.','At a vent, bacteria make food from chemicals, not light.','At a vent, bacteria are the base of the food web.','Vents keep life going without sunlight, but not forever without the Sun.','Vents on other worlds might hold life too.'];
const DONE=['At 2,500 metres there is no sunlight at all, yet the vent is full of life.','Photosynthesis uses light. Chemosynthesis uses chemicals such as hydrogen sulfide.','Every arrow starts at the bacteria: they are the producers here.','No vent, no food. No Sun, and the vent goes on for now, but its oxygen comes from photosynthesis.','Enceladus and Europa have oceans on rock, the kind of place where vents form.'];
const QS=[{q:'What do vent bacteria use for energy?',a:'Chemicals like hydrogen sulfide',o:[['The heat of the vent water','heat'],['Dim sunlight','sun']]},
 {q:'What is the base of the food web at a hydrothermal vent?',a:'Bacteria that use chemosynthesis',o:[['Seaweed and plants','plant'],['Giant tube worms','producer']]},
 {q:'How does a giant tube worm get its food?',a:'Bacteria inside its body make it',o:[['It eats with its mouth','mouth'],['It photosynthesises','sun']]},
 {q:'A vent stops flowing. What happens to the tube worms?',a:'They starve, because the bacteria lose their chemicals',o:[['They switch to sunlight','sun'],['Nothing: they make their own food','producer']]},
 {q:'Could vent life last forever if the Sun went out?',a:'No: the bacteria need oxygen, which photosynthesis makes',o:[['Yes: vents do not need the Sun at all','alone'],['No: vents need sunlight to see','sun']]},
 {q:'Why can chemosynthesis happen 2,500 m down?',a:'It needs chemicals, not light',o:[['A little sunlight still gets there','dark'],['The vent glows like the Sun','heat']]},
 {q:'Why does NASA study Enceladus and Europa?',a:'They have oceans on rocky floors where vents could form',o:[['They are hot like the Sun','ocean'],['They have plants on the surface','plant']]},
 {q:'What does chemosynthesis leave behind?',a:'Sulfur',o:[['Oxygen','oxygen'],['Sunlight','sun']]}];
/* ---------- drawings ---------- */
const F='px system-ui,sans-serif';
function rr(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
/* sea column: blue that darkens with depth; probe at depth d */
function column(g,r,d,dk){const gr=g.createLinearGradient(0,r.y,0,r.y+r.h);gr.addColorStop(0,'#38bdf8');gr.addColorStop(200/MAX,'#0369a1');gr.addColorStop(1000/MAX,'#0c1e3a');gr.addColorStop(1,'#020617');
 g.fillStyle=gr;rr(g,r.x,r.y,r.w,r.h,10);g.fill();const Y=m=>r.y+r.h*m/MAX;
 g.fillStyle='#57534e';g.fillRect(r.x,Y(VENT_DEPTH)+4,r.w,r.y+r.h-Y(VENT_DEPTH)-4);
 g.font=`700 12${F}`;g.textAlign='left';g.textBaseline='middle';
 g.fillStyle='#0f172a';g.textAlign='right';g.fillText('Surface',r.x+r.w-6,r.y+10);g.textAlign='left';
 [[200,'200 m',9],[1000,'1,000 m',-8],[2000,'2,000 m',-8],[VENT_DEPTH,'2,500 m',-8]].forEach(([m,t,o])=>{g.strokeStyle='rgba(255,255,255,.55)';g.setLineDash([4,4]);g.beginPath();g.moveTo(r.x,Y(m));g.lineTo(r.x+r.w*.18,Y(m));g.stroke();g.setLineDash([]);g.fillStyle='#ffffff';g.fillText(t,r.x+4,Y(m)+o)});
 const vx=r.x+r.w*.72,vw=Math.min(r.w*.08,26);smoker(g,vx,Y(VENT_DEPTH)+4,vw);g.font=`700 12${F}`;g.textAlign='center';g.fillStyle='#ffffff';g.fillText('Hydrothermal vent',Math.min(vx,r.x+r.w-60),Y(VENT_DEPTH)+4+(r.y+r.h-Y(VENT_DEPTH))/2);
 const py=Y(d),px=r.x+r.w*.45,s=Math.max(16,Math.min(26,r.w*.06));g.fillStyle='#fbbf24';rr(g,px-s,py-s*.6,s*2,s*1.2,s*.5);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();
 g.fillStyle='#0f172a';g.beginPath();g.arc(px+s*.45,py,s*.32,0,7);g.fill();g.strokeStyle='#fbbf24';g.beginPath();g.moveTo(px,r.y);g.lineTo(px,py-s*.6);g.stroke();
 return{px,py,s,Y}}
function smoker(g,x,base,w){for(let i=0;i<5;i++){g.fillStyle=`rgba(120,113,108,${.8-i*.13})`;g.beginPath();g.arc(x+Math.sin(i*1.7)*w*.3,base-w*3.4-i*w*.7,w*(.45+i*.16),0,7);g.fill()}
 g.fillStyle='#57534e';g.strokeStyle='#a8a29e';g.lineWidth=1.5;g.beginPath();g.moveTo(x-w,base);g.lineTo(x-w*.35,base-w*3);g.lineTo(x+w*.35,base-w*3);g.lineTo(x+w,base);g.closePath();g.fill();g.stroke();
 g.fillStyle='#f97316';g.beginPath();g.ellipse(x,base-w*3,w*.35,w*.14,0,0,7);g.fill()}
/* the vent floor with its community; links = list of [from,to] arrows drawn between the animals' anchor points */
function floor(g,r,links,o){o=o||{};const sea=g.createLinearGradient(0,r.y,0,r.y+r.h);sea.addColorStop(0,'#0b1730');sea.addColorStop(1,'#020617');g.fillStyle=sea;rr(g,r.x,r.y,r.w,r.h,10);g.fill();
 const gy=r.y+r.h*.84,u=Math.min(r.w/9,r.h/5.2),X=f=>r.x+r.w*f;g.fillStyle='#44403c';g.fillRect(r.x,gy,r.w,r.y+r.h-gy);smoker(g,X(.56),gy,u*.55);
 const P=[{x:X(.56),y:gy-4},{x:X(.17),y:gy-r.h*.2},{x:X(.84),y:gy-u*.25},{x:X(.37),y:gy-u*.3},{x:X(.42),y:r.y+r.h*.2}];
 g.fillStyle='#fde047';for(let i=0;i<11;i++){g.beginPath();g.arc(P[0].x-u*1.5+i*u*.3,gy-2-(i%3)*2,2.4,0,7);g.fill()}
 for(let i=0;i<4;i++){const x=P[1].x-u*.6+i*u*.4,top=gy-r.h*(.3+.04*(i%2));g.fillStyle='#f8fafc';g.fillRect(x-3,top,6,gy-top);g.fillStyle='#dc2626';g.beginPath();g.arc(x,top,u*.2,0,7);g.fill()}
 g.fillStyle='#f1f5f9';g.beginPath();g.ellipse(P[2].x,gy-u*.2,u*.55,u*.22,0,0,7);g.fill();g.strokeStyle='#64748b';g.lineWidth=1.5;g.stroke();
 g.fillStyle='#e2e8f0';g.beginPath();g.ellipse(P[3].x,P[3].y,u*.4,u*.24,0,0,7);g.fill();g.strokeStyle='#e2e8f0';g.lineWidth=2.5;[-1,1].forEach(s=>{g.beginPath();g.moveTo(P[3].x+s*u*.36,P[3].y);g.lineTo(P[3].x+s*u*.66,P[3].y-u*.28);g.stroke()});
 g.fillStyle='#c4b5fd';g.beginPath();g.ellipse(P[4].x,P[4].y,u*.7,u*.16,0,0,7);g.fill();g.beginPath();g.moveTo(P[4].x+u*.65,P[4].y);g.lineTo(P[4].x+u*.95,P[4].y-u*.18);g.lineTo(P[4].x+u*.95,P[4].y+u*.18);g.fill();
 (links||[]).forEach(([a,b])=>arrow(g,P[a],P[b],u));
 const fs=Math.max(11,Math.round(u*.28));g.font=`700 ${fs}${F}`;g.textAlign='center';g.textBaseline='top';
 const T=[[P[0].x,gy+5],[P[1].x,gy+5],[P[2].x,gy+5],[P[3].x,gy+5],[P[4].x,P[4].y+u*.3]];BEINGS.forEach((t,i)=>tagBox(g,t,T[i][0],T[i][1]));return P}
function tagBox(g,t,x,y){const w=g.measureText(t).width+10,h=parseInt(g.font)+6;g.fillStyle='rgba(15,23,42,.88)';rr(g,x-w/2,y-2,w,h,6);g.fill();g.fillStyle='#ffffff';g.fillText(t,x,y+1)}
function arrow(g,a,b,u){const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,s=u*.5,x0=a.x+ux*s,y0=a.y+uy*s,x1=b.x-ux*s,y1=b.y-uy*s;
 g.strokeStyle='#4ade80';g.lineWidth=3;g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();g.fillStyle='#4ade80';g.beginPath();g.moveTo(x1,y1);g.lineTo(x1-ux*10-uy*6,y1-uy*10+ux*6);g.lineTo(x1-ux*10+uy*6,y1-uy*10-ux*6);g.closePath();g.fill()}
/* a small globe: base colour, then marks (Europa's brown cracks, craters for the Moon, blue stripes for Enceladus) */
function globe(g,W,x,y,R){g.fillStyle=W.c[0];g.beginPath();g.arc(x,y,R,0,7);g.fill();g.save();g.beginPath();g.arc(x,y,R,0,7);g.clip();g.strokeStyle=W.c[1];g.fillStyle=W.c[1];g.lineWidth=Math.max(1.5,R*.06);
 if(W.n==='Europa')for(let i=0;i<5;i++){g.beginPath();g.moveTo(x-R,y-R*.8+i*R*.4);g.quadraticCurveTo(x,y-R*.5+i*R*.45,x+R,y-R*.9+i*R*.38);g.stroke()}
 else if(W.n==='Enceladus')for(let i=0;i<4;i++){g.beginPath();g.moveTo(x-R*.6+i*R*.3,y+R*.5);g.lineTo(x-R*.3+i*R*.3,y+R);g.stroke()}
 else for(let i=0;i<5;i++){g.globalAlpha=.6;g.beginPath();g.arc(x+Math.cos(i*2.4)*R*.55,y+Math.sin(i*2.4)*R*.5,R*(.1+.05*(i%3)),0,7);g.fill()}
 g.restore();g.globalAlpha=1;g.strokeStyle='#334155';g.lineWidth=1.5;g.beginPath();g.arc(x,y,R,0,7);g.stroke()}
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#0f172a';g.fillText(e,x,y)}
return{VENT_DEPTH,MAX,light,zone,lightWords,SORT,SORTWHY,FEED,BEINGS,pops,POPLABEL,WORLDS,DESC,TXT,DONE,QS,rr,column,floor,globe,emo}})();
