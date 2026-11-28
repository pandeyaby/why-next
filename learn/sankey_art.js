/* Data and drawings for flagsankey (Efficiency, Sankey diagrams and work done; Science, Physics - energy, ages 12-13).
   Sources: DfE (2013) National Curriculum in England, Key Stage 3 science, Physics: Energy ('energy changes and
   transfers ... other processes that involve energy transfer'; 'work done = force x distance'); AQA GCSE Physics 8463
   specification 4.1.1.2 and 4.1.2.2 (efficiency = useful output energy transfer / total input energy transfer, given as
   a decimal or a percentage) and 4.5.2 (work done W = F s, 1 J = 1 N m); Institute of Physics, Supporting Physics
   Teaching 11-14 and Energy (dissipation: wasted energy ends up spread out as thermal energy in the surroundings).
   Slips it targets: thinking energy is 'used up' so wasted energy is 0 J; outputs that add up to more than the input;
   dividing input by useful output (efficiency over 100%); giving the wasted share or the wasted joules as the efficiency;
   ranking devices by the biggest useful output instead of the useful fraction; and thinking a force that moves nothing,
   or a weight held still, does work. */
const SNK=(()=>{
/* step 1: a filament bulb. Input 100 J; the learner sets the light arrow, the thermal arrow is what is left */
const BULB={name:'Filament bulb',inName:'Electrical',input:100,outs:[{n:'Light',useful:true,t:10,v:50},{n:'Thermal',auto:true}],max:100,step:5};
/* step 2: a motor. Input 200 J; three output arrows the learner sets: kinetic 140 (useful), thermal 40, sound 20 */
const MOTOR={name:'Electric motor',inName:'Electrical',input:200,outs:[{n:'Kinetic',useful:true,t:140,v:100},{n:'Thermal',t:40,v:60},{n:'Sound',t:20,v:0}],max:200,step:10};
/* step 3: efficiency of two devices, read from their Sankey diagrams */
const EFF=[{name:'Electric motor',inName:'Electrical',input:200,outs:[{n:'Kinetic',useful:true,v:140},{n:'Thermal',v:40},{n:'Sound',v:20}]},
 {name:'Electric kettle',inName:'Electrical',input:2000,outs:[{n:'Water',useful:true,v:1800},{n:'Air',v:200}]}];
const effNo=(D,v)=>{const u=D.outs.find(o=>o.useful).v,e=Math.round(100*u/D.input),w=100-e;
 if(v>100)return `Over 100% would mean more energy out than in. Efficiency = useful \u00f7 input = ${u} \u00f7 ${D.input}.`;
 if(v===w)return `${w}% is the wasted share. Efficiency is the useful share: ${u} \u00f7 ${D.input}.`;
 return `${v}% of ${D.input} J is ${D.input*v/100} J, but the useful output is ${u} J. Work out ${u} \u00f7 ${D.input}.`};
/* step 4: work done pushing a box along the floor (force fixed each round; learner drags the box) */
const WORK=[{F:200,W:600},{F:300,W:600}],FLOOR=6;
/* step 5: three motors to rank by efficiency */
const MOTORS=[{k:'A',input:1000,use:600},{k:'B',input:200,use:150},{k:'C',input:500,use:200}];
const pct=M=>Math.round(100*M.use/M.input);
const rankNo=(M,best)=>`Motor ${M.k} is ${M.use} \u00f7 ${M.input} = ${pct(M)}%. Motor ${best.k} is ${best.use} \u00f7 ${best.input} = ${pct(best)}%, so ${best.k} comes first.`+(M.use>best.use?` A bigger useful output is not the same as a bigger fraction.`:'');
const DESC=['A Sankey diagram for a filament bulb: 100 J of electrical energy goes in. A slider sets the light arrow; the thermal arrow is what is left. Drag the knob or press the buttons.',
 'A Sankey diagram for an electric motor with 200 J going in and three output arrows: kinetic, thermal and sound. Drag each slider knob, or press the buttons, to set each arrow.',
 'A Sankey diagram for a device and an efficiency scale from 0% to 150%. Drag the marker along the scale, or press a button, to show the efficiency.',
 'A box on a floor marked from 0 to 6 metres, pushed with a fixed force. Drag the box along the floor, or press a button, to choose how far it moves.',
 'Three motor cards and three places: most efficient, middle, least efficient. Drag a card to the places, or tap a card, to put it in the next place.'];
const TXT=['Energy is never used up. It moves to other stores. What a device does not turn into the useful thing is wasted, mostly as heat.',
 'In a Sankey diagram the width of each arrow shows how much energy it carries. The useful arrow goes straight on; wasted arrows bend down. The outputs add up to the input.',
 'Efficiency = useful output energy \u00f7 total input energy. Multiply by 100 to get a percentage. It can never be more than 100%.',
 'Work done is energy moved by a force. Work done (J) = force (N) \u00d7 distance moved (m). If nothing moves, no work is done.',
 'Compare the useful fraction, not the useful joules. A small motor can be more efficient than a big one.'];
const DONE=['10 J of light + 90 J of thermal = 100 J. Nothing was used up: 90 J heated the bulb and the room.',
 '140 J + 40 J + 20 J = 200 J. The arrows out are as wide as the arrow in.',
 'Motor: 140 \u00f7 200 = 0.7 = 70%. Kettle: 1800 \u00f7 2000 = 0.9 = 90%.',
 '200 N \u00d7 3 m = 600 J and 300 N \u00d7 2 m = 600 J. Same work, different force and distance.',
 'B 75%, then A 60%, then C 40%. A gives the most useful joules, but B wastes the smallest fraction.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'A TV takes in 400 J. 100 J comes out as light and sound. What is its efficiency?',a:'25%',o:[['400%','flip'],['300 J','waste']]},
 {q:'An advert says a motor is 120% efficient. Is that possible?',a:'No: no device puts out more energy than goes in',o:[['Yes, if it is a very good motor','over'],['Yes, motors make energy','made']]},
 {q:'200 J goes into a Sankey diagram. The useful arrow is 150 J. How much does the wasted arrow carry?',a:'50 J',o:[['350 J','add'],['150 J','same']]},
 {q:'You push a trolley 4 m with a force of 50 N. How much work do you do?',a:'200 J',o:[['12.5 J','divide'],['54 J','addw']]},
 {q:'You hold a 100 N bag still for 10 seconds. How much work do you do on the bag?',a:'0 J',o:[['1000 J','time'],['100 J','force']]},
 {q:'Motor A: 500 J in, 300 J useful. Motor B: 100 J in, 80 J useful. Which is more efficient?',a:'B (80%)',o:[['A, it gives more useful energy','size'],['They are the same','sameeff']]},
 {q:'Where does most wasted energy end up?',a:'Spread out as thermal energy in the surroundings',o:[['It is destroyed','made'],['It stays stored in the plug','store']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',F='px system-ui,sans-serif';
const COL={Electrical:'#2563eb',Kinetic:'#059669',Light:'#ca8a04',Thermal:'#dc2626',Sound:'#7c3aed',Water:'#059669',Air:'#dc2626'};
function rr(g,x,y,w,h,r){r=Math.max(0,Math.min(r,w/2,h/2));g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function wrap(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
function card(g,r,label,st,size,dk){g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':st==='sel'?'#dbeafe':(dk?'#f8fafc':'#ffffff');rr(g,r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=st==='no'?NO:st==='ok'?OK:st==='sel'?SEL:EDGE;g.lineWidth=st?4:2;g.stroke();
 let n=size||20,rows;do{rows=wrap(g,label,r.w-12,`800 ${n}${F}`);if(rows.length*n*1.2<=r.h-6)break;n--}while(n>12);
 g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*n*1.2))}
function head(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?16:18,f=`800 ${s}${F}`,rows=wrap(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+14;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');rr(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,15+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F}`,r2=wrap(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
function tag(g,x,y,text,col,dk,align){g.font=`800 13${F}`;const w=g.measureText(text).width+12;const bx=align==='right'?x-w:align==='center'?x-w/2:x;
 g.fillStyle=dk?'#0f172a':'#ffffff';rr(g,bx,y-11,w,22,7);g.fill();g.strokeStyle=col;g.lineWidth=2;g.stroke();g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='middle';g.fillText(text,bx+6,y+.5)}
/* Sankey diagram in box b: input arrow from the left, useful output straight on, wasted outputs bending down.
   Every width is (energy x scale), so arrows of equal energy are equal widths. */
function sankey(g,b,D,outs,dk){const inp=D.input,Hin=Math.min(b.h*.42,96),k=Hin/inp,xs=b.x+b.w*.36,yT=b.y+26,outH=outs.reduce((s,o)=>s+o.v*k,0);
 const cin=COL[D.inName]||'#2563eb';g.fillStyle=cin;g.fillRect(b.x,yT,xs-b.x,Hin);tag(g,b.x,yT-14,`${D.inName} ${inp} J`,cin,dk,'left');
 let y=yT;const wasted=outs.filter(o=>!o.useful),use=outs.find(o=>o.useful),xe=b.x+b.w-18;
 if(use&&use.v>0){const h=use.v*k;g.fillStyle=COL[use.n]||OK;g.beginPath();g.moveTo(xs,y);g.lineTo(xe-Math.min(16,h/2+6),y);g.lineTo(xe,y+h/2);g.lineTo(xe-Math.min(16,h/2+6),y+h);g.lineTo(xs,y+h);g.closePath();g.fill()}
 if(use)tag(g,xe,(use.v>0?y:yT)-14,`${use.n} ${use.v} J \u2605`,COL[use.n]||OK,dk,'right');y+=use?use.v*k:0;
 const wsum=wasted.reduce((s,o)=>s+o.v*k,0),yc=y+wsum+10,yEnd=b.y+b.h-24;let ytop=y;
 wasted.forEach((o,i)=>{const h=o.v*k,ro=yc-ytop,ri=ro-h;if(h>0){g.fillStyle=COL[o.n]||NO;g.beginPath();g.moveTo(xs,ytop);g.arc(xs,yc,ro,-Math.PI/2,0);g.lineTo(xs+ro,yEnd-8);g.lineTo(xs+(ro+ri)/2,yEnd);g.lineTo(xs+ri,yEnd-8);g.lineTo(xs+ri,yc);g.arc(xs,yc,ri,0,-Math.PI/2,true);g.closePath();g.fill();
   g.strokeStyle=dk?'#111827':'#ffffff';g.lineWidth=1;g.stroke()}
  tag(g,xs+(ro+ri)/2,yEnd+12-(i%2)*0,`${o.n} ${o.v} J`,COL[o.n]||NO,dk,i?'right':'left');ytop+=h});
 if(Math.round(outH)!==Math.round(Hin)){const sum=outs.reduce((s,o)=>s+o.v,0);g.strokeStyle=NO;g.lineWidth=2.5;g.setLineDash([5,4]);g.strokeRect(xs-3,yT,6,Math.max(outH,Hin));g.setLineDash([]);
  tag(g,b.x,yT+Hin+16,`Out ${sum} J \u2260 in ${inp} J`,NO,dk,'left')}}
/* one slider row: label, track, knob, value. Returns the track geometry for hit tests */
function slider(g,r,label,v,max,col,st,dk){g.font=`800 ${r.h>40?14:13}${F}`;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='middle';g.fillText(label,r.x,r.y+r.h/2);
 const tx=r.x+r.lw,tw=r.w-r.lw-62,ty=r.y+r.h/2;g.strokeStyle=dk?'#475569':'#cbd5e1';g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(tx,ty);g.lineTo(tx+tw,ty);g.stroke();
 g.strokeStyle=col;g.beginPath();g.moveTo(tx,ty);g.lineTo(tx+tw*v/max,ty);g.stroke();g.lineCap='butt';
 g.fillStyle=dk?'#f8fafc':'#ffffff';g.beginPath();g.arc(tx+tw*v/max,ty,13,0,7);g.fill();g.strokeStyle=st==='ok'?OK:st==='no'?NO:col;g.lineWidth=st?4:3;g.stroke();
 g.font=`900 15${F}`;g.fillStyle=st==='ok'?(dk?'#86efac':OK):st==='no'?(dk?'#fca5a5':NO):(dk?LIGHT:INK);g.textAlign='right';g.fillText(`${v} J`,r.x+r.w,ty);
 return{x:tx,w:tw,y:ty-22,h:44,max}}
return{BULB,MOTOR,EFF,effNo,WORK,FLOOR,MOTORS,pct,rankNo,DESC,TXT,DONE,QS,INK,LIGHT,OK,NO,EDGE,SEL,F,COL,rr,wrap,card,head,tag,sankey,slider}})();
