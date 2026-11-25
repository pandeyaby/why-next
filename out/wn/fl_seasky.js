/* Flagship – seasonal constellations (ages 9-10; NGSS 5-ESS1-2, NC Year 5 Earth and space). A top-down model of Earth's
   orbit with four constellations in their real directions: drag Earth through the year and see which one the night side
   faces at midnight; find the one hidden in the day sky behind the Sun; sort the four into their northern seasons; step
   through the months at 9 pm and watch Orion slide from the eastern to the western sky (2 hours earlier each month);
   then find the two circumpolar constellations that never set from Britain. Data and drawings: seasky_art.js. */
(()=>{const Y=SKY;
VIS.reg('flagseasky',c=>{let A,P,pad,cq,qn=-1,run=0,grab=null;const G={};
const MODES=['orbit','hidden','sort','nine','north','quiz'],mode=()=>MODES[A.step];
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const HID=[5,8,11];                                            /* June, September, December */
/* ---------- shared space view ---------- */
let SP=null;
function spaceLayout(y0,win){const x=8,w=A.W-16,h=A.H-y0-8;let d,v=null;
 if(!win)d={x,y:y0,w,h};else if(!A.narrow&&w>h*1.3){d={x,y:y0,w:w*.64,h};v={x:x+w*.66,y:y0,w:w*.34,h}}else{d={x,y:y0,w,h:h*.7};v={x,y:y0+h*.72,w,h:h*.28}}
 const Rc=Math.min(d.w,d.h)/2-Math.max(26,Math.min(d.w,d.h)*.1),R=Rc*.52;SP={d,v,cx:d.x+d.w/2,cy:d.y+d.h/2,R,Rc,er:Math.max(10,R*.16),rs:Math.max(12,R*.22)};return SP}
const posE=m=>{const a=Y.ang(Y.anti(m));return{a,x:SP.cx+Math.cos(a)*SP.R,y:SP.cy+Math.sin(a)*SP.R}};
const posK=k=>{const a=Y.ang(Y.RA[k]);return{a,x:SP.cx+Math.cos(a)*SP.Rc,y:SP.cy+Math.sin(a)*SP.Rc}};
function drawSpace(m,o){o=o||{};const g=A.ctx,{d,cx,cy,R,er,rs}=SP;g.fillStyle='#020617';A.paint.rrect(d.x,d.y,d.w,d.h,10);g.fill();
 g.strokeStyle='#475569';g.setLineDash([5,5]);g.lineWidth=1.2;g.beginPath();g.arc(cx,cy,R,0,7);g.stroke();g.setLineDash([]);
 for(let i=0;i<12;i++){const p=posE(i);g.fillStyle=i===m?'#f472b6':'#475569';g.beginPath();g.arc(p.x,p.y,i===m?0:2.5,0,7);g.fill()}
 Y.sun(g,cx,cy,rs);const e=posE(m),far={x:e.x+Math.cos(e.a)*(SP.Rc-R-er*.2),y:e.y+Math.sin(e.a)*(SP.Rc-R-er*.2)};
 g.strokeStyle='#f472b6';g.lineWidth=2;g.setLineDash([3,4]);g.beginPath();g.moveTo(e.x+Math.cos(e.a)*er,e.y+Math.sin(e.a)*er);g.lineTo(far.x,far.y);g.stroke();g.setLineDash([]);
 const s=Math.max(13,SP.Rc*.17);Y.KEYS.forEach(k=>{const p=posK(k),v=Y.vis(k,m),hl=o.pick===k;
  if(hl){g.strokeStyle=o.bad?'#f87171':'#4ade80';g.lineWidth=3;g.beginPath();g.arc(p.x,p.y,s*1.45,0,7);g.stroke()}
  Y.stars(g,k,p.x,p.y,s,0,{dim:v==='day'&&!o.noDim});P.tag(Y.NAME[k],p.x,p.y+s*1.15+8,11,v==='high'?'#fde047':'#e2e8f0')});
 Y.earth(g,e.x,e.y,er,e.a);P.tag(Y.MONTH[m],e.x,e.y-er-12,12,'#f9a8d4');return e}
function windowSky(m){const v=SP.v;if(!v)return;const g=A.ctx;g.fillStyle='#0b1220';A.paint.rrect(v.x,v.y,v.w,v.h,10);g.fill();g.strokeStyle='#64748b';g.lineWidth=1.2;g.stroke();
 const up=Y.KEYS.filter(k=>Y.vis(k,m)==='high'),wide=v.w>v.h*1.5;P.tag('Night side at midnight',v.x+v.w/2,v.y+14,11,'#f9a8d4');
 const n=Math.max(1,up.length),s=Math.min(wide?v.h*.3:v.w*.2,wide?v.w/(n*2.6):v.h/(n*2.8));
 up.forEach((k,i)=>{const x=wide?v.x+v.w*(i+.5)/n:v.x+v.w/2,y=wide?v.y+v.h*.55:v.y+v.h*(i+.6)/(n+.2)+8;Y.stars(g,k,x,y,s,0);P.tag(Y.NAME[k]+' is high',x,y+s+12,11,'#fde047')})}
/* ---------- 1. a year round the Sun ---------- */
function month(m){const o=G.ob;o.m=(m+12)%12;const k=Y.KEYS.find(q=>Y.vis(q,o.m)==='high'&&Y.sep(q,o.m)<=30);if(k)o.seen[k]=1;A.sound.tick();
 const up=Y.KEYS.filter(q=>Y.vis(q,o.m)==='high').map(q=>Y.NAME[q]);
 note(`${Y.MONTH[o.m]} (${Y.SEAS_OF(o.m).toLowerCase()} in the north): at midnight the night side faces ${up.join(' and ')}.`,false)}
function drawOrbit(){const o=G.ob,n=Y.KEYS.filter(k=>o.seen[k]).length,ok=n>=4;
 const y0=P.strip(ok?Y.DONE[0]:`Move Earth round the Sun. Constellations found high at midnight: ${n} of 4.`,ok?'ok':'',G.note,G.bad);spaceLayout(y0,true);drawSpace(o.m);windowSky(o.m)}
/* ---------- 2. hidden behind the Sun ---------- */
function guess(k){const h=G.hd;if(h.i>=HID.length)return;const m=HID[h.i],v=Y.vis(k,m);h.pick=k;
 if(v==='day'){h.bad=false;h.i++;A.sound.pop();return note(`Yes: in ${Y.MONTH[m]} ${Y.NAME[k]} is in the same direction as the Sun, so it is up in the day sky and the bright sky hides it.${h.i<HID.length?' Next month to try: '+Y.MONTH[HID[h.i]]+'.':''}`,false)}
 h.bad=true;A.sound.miss();
 if(v==='high')return note(`${Y.NAME[k]} is on the night side's line in ${Y.MONTH[m]}: it is high at midnight, easy to see. Look for the one past the Sun.`,true);
 note(`${Y.NAME[k]} is off to the side in ${Y.MONTH[m]}: you can see it for part of the night, after dusk or before dawn. Find the one behind the Sun.`,true)}
function drawHidden(){const h=G.hd,ok=h.i>=HID.length,m=HID[Math.min(h.i,HID.length-1)];
 const y0=P.strip(ok?Y.DONE[1]:`${Y.MONTH[m]}: tap the constellation hidden in the day sky (${h.i+1} of 3).`,ok?'ok':h.bad?'no':'',G.note,G.bad);spaceLayout(y0,false);drawSpace(m,{pick:h.pick,bad:h.bad,noDim:!ok})}
/* ---------- 3. which season? ---------- */
let BINS=[],CHIPS=[];
function file(k,s){const t=G.so;if(t.done[k])return;if(Y.SEASON[k]===s){t.done[k]=s;t.sel=null;t.no=null;A.sound.pop();return note(`${Y.NAME[k]}: high on ${s.toLowerCase()} nights.`,false)}
 t.no=s;A.sound.miss();const m=Y.MONTH.findIndex((_,i)=>Y.SEAS_OF(i)===s&&[0,3,6,9].includes(i)),v=Y.vis(k,m);
 note(v==='day'?`Not ${s.toLowerCase()}: then ${Y.NAME[k]} is near the Sun, hidden in the day sky.`:`Not ${s.toLowerCase()}: then ${Y.NAME[k]} is only up for part of the night. Its season is when the night side faces it.`,true)}
function drawSort(){const t=G.so,left=Y.KEYS.filter(k=>!t.done[k]),ok=!left.length;
 const y0=P.strip(ok?Y.DONE[2]:'Put each constellation in its season (north of the world).',ok?'ok':G.bad?'no':'',G.note,G.bad),g=A.ctx;
 const cols=A.narrow?2:4,gp=8,bw=(A.W-16-gp*(cols-1))/cols,rows=4/cols,bh=Math.min(110,(A.H-y0)*.5/rows-gp),by=A.H-8-rows*(bh+gp)+gp;
 BINS=Y.SEASONS.map((s,i)=>{const r={s,x:8+(i%cols)*(bw+gp),y:by+Math.floor(i/cols)*(bh+gp),w:bw,h:bh};P.box(r,{no:t.no===s});P.text(s,r.x+10,r.y+16,15,'left',Y.INK);
  Y.KEYS.filter(k=>t.done[k]===s).forEach(k=>{Y.stars(g,k,r.x+bw/2,r.y+bh*.58,Math.min(bh*.28,bw*.22),0,{col:'#b45309',line:'#475569'});P.tag(Y.NAME[k],r.x+bw/2,r.y+bh-12,11)});return r});
 const cw=Math.min((A.W-16-gp*3)/4,130),ch=Math.min(by-y0-12,cw);CHIPS=left.map((k,i)=>{const hold=grab&&grab.k===k,x=hold?grab.x-cw/2:8+i*(cw+gp),y=hold?grab.y-ch/2:y0+2,r={k,x,y,w:cw,h:ch};
  g.fillStyle='#0b1220';A.paint.rrect(x,y,cw,ch,10);g.fill();g.lineWidth=t.sel===k||hold?3.5:1.5;g.strokeStyle=t.sel===k||hold?'#60a5fa':'#64748b';g.stroke();
  Y.stars(g,k,x+cw/2,y+ch*.44,Math.min(cw,ch)*.3,0);P.tag(Y.NAME[k],x+cw/2,y+ch-13,11);return r})}
/* ---------- 4. 9 pm, month by month ---------- */
let SL=null;
function nine(m){const n=G.nn;n.m=Math.max(0,Math.min(7,m));const mo=(n.m+9)%12,{T,ha}=Y.south(mo),w=Y.where(ha);n.seen[w]=1;A.sound.tick();
 note(w==='below'?`${Y.MONTH[mo]}: at 9 pm Orion has not risen yet or has already set. It is due south at ${Y.clock(T)}.`:`${Y.MONTH[mo]}: at 9 pm Orion is ${w==='east'?'rising in the east':w==='west'?'setting in the west':w==='south'?'high in the south':'in the '+w}. It is due south at about ${Y.clock(T)}.`,false)}
function drawNine(){const n=G.nn,mo=(n.m+9)%12,{ha}=Y.south(mo),ok=n.seen.east&&n.seen.south&&n.seen.west,g=A.ctx;
 const y0=P.strip(ok?Y.DONE[3]:'Find a month when, at 9 pm, Orion is rising in the east, one when it is due south, and one when it is setting in the west.',ok?'ok':'',G.note,G.bad);
 const x=8,w=A.W-16,sh=Math.max(54,Math.min(70,(A.H-y0)*.18)),h=A.H-y0-8-sh,base=y0+h*.86;g.fillStyle=P.dk()?'#020617':'#0f172a';A.paint.rrect(x,y0,w,h,10);g.fill();
 g.fillStyle='#14532d';g.fillRect(x,base,w,y0+h-base);[['East',x+28],['South',x+w/2],['West',x+w-28]].forEach(([t,px])=>P.tag(t,px,base+(y0+h-base)/2,12,'#f8fafc','rgba(2,6,23,.6)'));
 g.strokeStyle='#334155';g.setLineDash([4,5]);g.beginPath();g.ellipse(x+w/2,base,w*.42,(base-y0)*.8,0,Math.PI,2*Math.PI);g.stroke();g.setLineDash([]);
 if(Math.abs(ha)<6){const th=(ha+6)/12*Math.PI,px=x+w/2-Math.cos(th)*w*.42,py=base-Math.sin(th)*(base-y0)*.8;Y.stars(g,'orion',px,Math.min(base-22,py+22),Math.min(w,h)*.11,ha*.18);P.tag('Orion',px,Math.min(base-6,py+22+Math.min(w,h)*.11+12),12,'#fde047')}
 else P.tag('Orion is below the horizon',x+w/2,y0+h*.4,13,'#e2e8f0');
 const sy=y0+h+8,sw=w/8;SL={x,y:sy,w,h:sh-8};for(let i=0;i<8;i++){const r={x:x+i*sw+2,y:sy,w:sw-4,h:sh-8},on=i===n.m;g.fillStyle=on?'#1d4ed8':P.dk()?'#1e293b':'#e2e8f0';A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();
  P.text(Y.MONTH[(i+9)%12].slice(0,3),r.x+r.w/2,r.y+r.h/2,13,'center',on?'#ffffff':P.fg())}}
/* ---------- 5. never setting ---------- */
let CHOICE=[];
function season(s){G.nt.s=s;G.nt.looked[s]=1;A.sound.tick();note(`${s} evening: the Plough is ${({Spring:'high above',Summer:'to the west (left) of',Autumn:'low below',Winter:'to the east (right) of'})[s]} the North Star, and Cassiopeia is on the other side.`,false)}
function always(k){const t=G.nt;if(t.got.includes(k))return;if(k==='plough'||k==='cass'){t.got.push(k);t.no=null;A.sound.pop();return note(`${Y.NAME[k]}: close to the North Star, so it circles it and never sets from Britain. ${t.got.length} of 2.`,false)}
 t.no=k;A.sound.miss();note(`${Y.NAME[k]} is a ${Y.SEASON[k].toLowerCase()} constellation. Part of the year it is in the day sky near the Sun, so you cannot see it every night.`,true)}
function drawNorth(){const t=G.nt,ok=t.got.length>=2,g=A.ctx;
 const y0=P.strip(ok?Y.DONE[4]:`Northern sky, ${t.s} evening. Tap the 2 constellations you can see all year (found ${t.got.length}).`,ok?'ok':G.bad?'no':'',G.note,G.bad);
 const cols=A.narrow?3:6,gp=6,cw=(A.W-16-gp*(cols-1))/cols,ch=Math.min(46,(A.H-y0)*.12),rows=6/cols,top=A.H-8-rows*(ch+gp)+gp,h=top-y0-8,x=8,w=A.W-16;
 g.fillStyle='#020617';A.paint.rrect(x,y0,w,h,10);g.fill();const px=x+w/2,py=y0+h*.5,D=Math.min(w*.28,h*.27),s=D*.4;
 g.fillStyle='#f8fafc';g.beginPath();g.arc(px,py,4.5,0,7);g.fill();P.tag('North Star',px,py+16,11);
 const a=Y.NORTH[t.s];[['plough',a],['cass',a+Math.PI]].forEach(([k,b])=>{const u={x:Math.sin(b),y:-Math.cos(b)};Y.stars(g,k,px+u.x*D,py+u.y*D,s,b+Math.PI,{col:t.got.includes(k)?'#86efac':undefined});const ly=py+u.y*D+(u.y>0?s*.75+10:-s*.75-10);P.tag(Y.NAME[k],px+u.x*D+(Math.abs(u.x)>.5?0:s*1.2),Math.max(y0+12,Math.min(y0+h-12,ly)),11)});
 P.tag('Facing north',x+50,y0+14,11,'#f9a8d4');P.tag('West',x+24,y0+h/2,11);P.tag('East',x+w-24,y0+h/2,11);
 CHOICE=Y.CARDS.map((k,i)=>{const r={k,x:8+(i%cols)*(cw+gp),y:top+Math.floor(i/cols)*(ch+gp),w:cw,h:ch};P.box(r,{ok:t.got.includes(k),no:t.no===k});P.text(Y.NAME[k],r.x+r.w/2,r.y+r.h/2,13,'center',Y.INK);return r})}
/* ---------- wiring ---------- */
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H);const m=mode();
 if(m==='quiz'){P.strip('Challenge: the sky through the year','ok');spaceLayout(A.H*.22,false);drawSpace(11);return}
 ({orbit:drawOrbit,hidden:drawHidden,sort:drawSort,nine:drawNine,north:drawNorth})[m]();A.fx.draw(g)}
function down(p){const m=mode();
 if(m==='orbit'&&SP){const e=posE(G.ob.m);if(Math.hypot(p.x-e.x,p.y-e.y)<SP.er+22){grab={orbit:1};return true}}
 if(m==='hidden'&&SP){const k=Y.KEYS.find(q=>{const r=posK(q);return Math.hypot(p.x-r.x,p.y-r.y)<SP.Rc*.3});if(k)guess(k)}
 if(m==='sort'){const ch=CHIPS.find(r=>inR(p,r));if(ch){grab={k:ch.k,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const b=BINS.find(r=>inR(p,r));if(b&&G.so.sel)file(G.so.sel,b.s)}
 if(m==='nine'&&inR(p,SL)){grab={nine:1};nine(Math.floor((p.x-SL.x)/(SL.w/8)));return true}
 if(m==='north'){const r=CHOICE.find(q=>inR(p,q));if(r)always(r.k)}return false}
function move(p){if(!grab)return;
 if(grab.orbit){let a=Math.atan2(p.y-SP.cy,p.x-SP.cx),h=7.7+(Math.PI/2-a)*12/Math.PI,m=Math.round((((h-7.7)%24+24)%24)/2)%12;if(m!==G.ob.m)month(m);return}
 if(grab.nine){const m=Math.floor((p.x-SL.x)/(SL.w/8));if(m!==G.nn.m&&m>=0&&m<8)nine(m);return}
 grab.x=p.x;grab.y=p.y;A.redraw()}
function up(p){if(!grab)return;const g0=grab;grab=null;if(g0.k){const b=BINS.find(r=>inR(p,r));if(b)file(g0.k,b.s);else if(Math.hypot(p.x-g0.x0,p.y-g0.y0)<8){G.so.sel=g0.k;note(`${Y.NAME[g0.k]} picked. Now tap its season.`,false)}else A.redraw()}}
function fresh(){run++;grab=null;for(const k in G)delete G[k];Object.assign(G,{ob:{m:0,seen:{}},hd:{i:0,pick:null,bad:false},so:{done:{},sel:null,no:null},nn:{m:0,seen:{}},nt:{s:'Winter',got:[],no:null,looked:{Winter:1}},note:null,bad:false,check:()=>{}})}
function note(t,bad){G.note=t;G.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();G.check()}
const watch=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(Y.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();if(i===0){G.ob.seen={};const k=Y.KEYS.find(q=>Y.sep(q,0)<=30);if(k)G.ob.seen[k]=1}c.say(Y.DESC[i]);A.cv.setAttribute('aria-label',Y.DESC[i]);G.check=watch(i,ok);controls();A.redraw()}
function play(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='orbit'){B('\u2190 1 month',()=>month(G.ob.m-1),'Back one month');B('1 month \u2192',()=>month(G.ob.m+1),'Forward one month');B('+3 months',()=>month(G.ob.m+3),'Forward three months')}
 if(m==='hidden'&&G.hd.i<HID.length)Y.KEYS.forEach(k=>B(Y.NAME[k],()=>guess(k),`${Y.NAME[k]} is in the day sky in ${Y.MONTH[HID[G.hd.i]]}`));
 if(m==='sort'){const k=Y.KEYS.find(q=>!G.so.done[q]);if(k)Y.SEASONS.forEach(s=>B(`${Y.NAME[k]}: ${s}`,()=>file(k,s),`${Y.NAME[k]} is high on ${s.toLowerCase()} nights`))}
 if(m==='nine'){B('\u2190 month',()=>nine(G.nn.m-1),'One month earlier');B('month \u2192',()=>nine(G.nn.m+1),'One month later')}
 if(m==='north'){Y.SEASONS.forEach(s=>B(s,()=>season(s),`Show the northern sky on a ${s.toLowerCase()} evening`));Y.CARDS.forEach(k=>{if(!G.nt.got.includes(k))B('All year: '+Y.NAME[k],()=>always(k),`${Y.NAME[k]} can be seen all year`)})}}
const steps=[
{h:'A year round the Sun',p:Y.TXT[0],predict:{q:'Why is Orion easy to see in winter but not in summer?',opts:['Its stars switch off in summer','The night side faces a different way','Summer clouds hide it'],ans:1},task:'Find the month each of the 4 constellations is high at midnight',
 show:()=>play(0,[2,5,8,11].map(m=>[650,()=>month(m)])),go:()=>begin(0,()=>Y.KEYS.every(k=>G.ob.seen[k]))},
{h:'Hidden by daylight',p:Y.TXT[1],predict:{q:'In June, where are the stars of Orion?',opts:['Gone from space until winter','Still there, in the day sky','Moved to the other side of the Sun'],ans:1},task:'Find the hidden constellation in June, September and December',
 show:()=>play(1,[[600,()=>guess('orion')],[700,()=>guess('leo')],[700,()=>guess('scorpius')]]),go:()=>begin(1,()=>G.hd.i>=HID.length)},
{h:'Which season?',p:Y.TXT[2],task:'Put all 4 in their seasons',
 show:()=>play(2,Y.KEYS.map(k=>[500,()=>file(k,Y.SEASON[k])])),go:()=>begin(2,()=>Y.KEYS.every(k=>G.so.done[k]))},
{h:'Earlier each night',p:Y.TXT[3],predict:{q:'Orion is due south at 10 pm in January. Where is it at 10 pm a month later?',opts:['In the same place','Further west','Further east'],ans:1},task:'Find Orion rising, due south and setting at 9 pm',
 show:()=>play(3,[[500,()=>nine(1)],[600,()=>nine(3)],[600,()=>nine(6)]]),go:()=>begin(3,()=>G.nn.seen.east&&G.nn.seen.south&&G.nn.seen.west)},
{h:'Never setting',p:Y.TXT[4],predict:{q:'From Britain, can you see the Plough on summer nights?',opts:['No, it is a winter constellation','Yes, it circles the North Star all year'],ans:1},task:'Find the 2 constellations you can see all year',
 show:()=>play(4,[[500,()=>season('Summer')],[500,()=>always('plough')],[500,()=>season('Autumn')],[500,()=>always('cass')]]),go:()=>begin(4,()=>G.nt.got.length>=2)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
function slip(t){let m='The night sky changes because Earth goes round the Sun, so its night side faces a new part of space.';
 if(t==='off')m='Stars never switch off. A constellation you cannot see is in the day sky, near the Sun, where the bright sky hides it.';
 if(t==='cloud')m='Clouds come and go on any night. Orion is missing all summer because it is near the Sun, not because of clouds.';
 if(t==='move')m='The stars stay where they are, far away, and keep the same patterns. Earth moves round the Sun, so our night view changes.';
 if(t==='tilt')m='The tilt gives us hot and cold seasons. Which stars fill the night sky depends on where Earth is on its orbit.';
 if(t==='season')m='In the north of the world Orion fills winter nights, Leo spring, Scorpius summer and Pegasus autumn.';
 if(t==='time')m='Stars rise about 4 minutes earlier each night, so about 2 hours earlier each month.';
 if(t==='set')m='Constellations near the North Star, like the Plough, circle it and never set from Britain, so they are up all year.';
 if(t==='south')m='Seasons are the other way round in the south. Their summer comes in December, when Orion fills the night sky, upside down to them.';
 return m}
function ask(){qn++;const Q=Y.QS[qn%Y.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}.`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.64,tall:1.36,draw,onStep:X=>{cq.hidden=X.step!==5;pad.hidden=X.step===5;controls()},
 init:X=>{A=X;P=Y.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Seasonal sky lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
