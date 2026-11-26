/* Data and drawings for flagrebuild (taking apart and rebuilding; Science, ages 7-8).
   Sources: NGSS 2-PS1-3 'Make observations to construct an evidence-based account of how an object made of a small set
   of pieces can be disassembled and made into a new object' (clarification: pieces could include blocks, building
   bricks or other assorted small objects) and DCI PS1.A 'Different properties are suited to different purposes. A great
   variety of objects can be built up from a small set of pieces.'; NC England Year 2 Uses of everyday materials. Slips
   it targets: pieces are used up or gone after taking an object apart; a new object needs new pieces; a bigger or
   longer object must weigh more; the pieces themselves change when the object changes; any object can be built from
   any set of pieces. */
const RBD=(()=>{
/* the kit: 4 square blocks (10 g each) and 2 long planks (20 g each, twice as long) */
const KIT=[{k:'sq',c:'#dc2626',n:'red block'},{k:'pl',c:'#7c3aed',n:'purple plank'},{k:'sq',c:'#2563eb',n:'blue block'},{k:'sq',c:'#ca8a04',n:'yellow block'},{k:'pl',c:'#ea580c',n:'orange plank'},{k:'sq',c:'#16a34a',n:'green block'}];
const GRAMS={sq:10,pl:20},TOTAL=80;
/* tower: kit pieces bottom to top (index into KIT) */
const TOWER=[1,0,2,4,3,5];
/* bridge slots in grid units (x, y from the ground, w); need = piece kind; below = slots that must be filled first */
const SLOTS=[{x:0,y:0,w:1,need:'sq',below:[]},{x:3,y:0,w:1,need:'sq',below:[]},{x:0,y:1,w:1,need:'sq',below:[0]},{x:3,y:1,w:1,need:'sq',below:[1]},
 {x:0,y:2,w:2,need:'pl',below:[2]},{x:2,y:2,w:2,need:'pl',below:[3]}];
/* step 3: things to weigh */
const WEIGH=[{n:'the tower',ic:'\u{1F5FC}'},{n:'the loose pile',ic:'\u{1F9E9}'},{n:'the bridge',ic:'\u{1F309}'}];
/* step 4: changed or stayed the same (0 = changed, 1 = stayed) */
const BINS=['Changed','Stayed the same'];
const CARDS=[{t:'The shape',z:0,no:'A tall tower became a long, low bridge. The shape changed.'},
 {t:'How many pieces',z:1,no:'Count them: 6 pieces in the tower and 6 in the bridge. That stayed the same.'},
 {t:'What it is for',z:0,no:'A tower stands tall. A bridge lets a toy car cross. Its job changed.'},
 {t:'The total weight',z:1,no:'Same pieces, same weight: 80 g both times. That stayed the same.'},
 {t:'Each piece\u2019s colour',z:1,no:'The red block is still red. The pieces did not change, only where they go.'},
 {t:'What the pieces are made of',z:1,no:'They are still the same wooden blocks. Taking apart does not change the material.'}];
/* step 5: can we build it with 4 blocks and 2 planks? need = pieces it uses */
const MODELS=[{n:'A table',ic:'\u{1FA91}',need:{sq:4,pl:2},ok:1,why:'Yes: 4 blocks for legs and 2 planks for the top. It uses every piece.'},
 {n:'A car',ic:'\u{1F697}',need:{sq:2,pl:1,wh:4},ok:0,why:'No: a car needs 4 wheels, and our kit has no wheels.'},
 {n:'A bench',ic:'\u{1F6CB}\uFE0F',need:{sq:2,pl:1},ok:1,why:'Yes: 2 blocks and 1 plank. Some pieces are left over, and that is fine.'},
 {n:'A tower of 8 blocks',ic:'\u{1F5FC}',need:{sq:8},ok:0,why:'No: it needs 8 blocks, but we only have 4.'}];
const DESC=['A tower of 6 pieces and an empty tray. Tap the top piece, or drag it to the tray.',
 'An outline of a bridge and the 6 loose pieces. Drag each piece into a matching space.',
 'A scale. Tap the tower, the loose pile and the bridge to weigh each one.',
 'Six cards about the tower and the bridge. Drag each card into Changed or Stayed the same.',
 'Our kit is 4 blocks and 2 planks. For each model, tap Yes if we can build it or No if we cannot.'];
const TXT=['An object built from pieces can be taken apart. Every piece is still there afterwards.','The same pieces can be put together in a new way to make a new object.',
 'Same pieces, same weight, whatever shape you build.','The shape and the job change. The pieces, how many, and the weight stay the same.',
 'You can only build what your pieces allow. Check the pieces each model needs.'];
const DONE=['6 pieces in the tower, 6 pieces in the tray. Nothing is used up.','The tower\u2019s 6 pieces now make a bridge. No new pieces needed.',
 'Tower, pile and bridge all weigh 80 g: the same 6 pieces each time.','Shape and job changed; the pieces, their number, colour, material and the weight stayed the same.',
 'A table and a bench fit our kit. A car needs wheels, and a big tower needs more blocks.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'Ella takes her block castle apart. What happens to the blocks?',a:'They are all still there',o:[['They are used up','gone'],['They turn into new blocks','changed']]},
 {q:'Tom wants to turn his brick car into a boat. What does he need?',a:'The same bricks, put together a new way',o:[['A new set of bricks','new'],['Nothing: the car turns into a boat by itself','any']]},
 {q:'A 6-brick tower weighs 60 g. The same 6 bricks make a long wall. What does the wall weigh?',a:'60 g',o:[['More than 60 g, it is longer','heavy'],['Less than 60 g, it is lower','heavy']]},
 {q:'A tower is rebuilt into a bridge. What changed?',a:'The shape and what it is for',o:[['The colour of each block','changed'],['The number of blocks','gone']]},
 {q:'A kit has 3 blocks and no wheels. Can you build a car with 4 wheels?',a:'No, the kit has no wheels',o:[['Yes, any kit can make anything','any'],['Yes, if you use more blocks','new']]},
 {q:'Which is true when you rebuild a model?',a:'Same pieces, new shape',o:[['New pieces, same shape','new'],['The pieces melt into a new shape','changed']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',F='px system-ui,sans-serif';
function icon(g,ch,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(ch,x,y)}
function round(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function fit(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
function card(g,r,label,st,ic,size){g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':st==='sel'?'#dbeafe':'#ffffff';round(g,r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=st==='no'?NO:st==='ok'?OK:st==='sel'?SEL:EDGE;g.lineWidth=st?4:1.8;g.stroke();if(ic)icon(g,ic,r.x+r.w/2,r.y+r.h*.32,Math.min(r.h*.36,34));
 let n=size||17,rows;do{rows=fit(g,label,r.w-14,`800 ${n}${F}`);if(rows.length*n*1.2<=(ic?r.h*.5:r.h-8))break;n--}while(n>11);
 g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';const cy=ic?r.y+r.h*.73:r.y+r.h/2;rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,cy+(i-(rows.length-1)/2)*n*1.2))}
function top(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?16:18,f=`800 ${s}${F}`,rows=fit(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');round(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F}`,r2=fit(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
/* one kit piece as a wooden block with grain lines; u = size of one square */
function piece(g,P,x,y,u,dk,lift){const w=P.k==='pl'?2*u:u,h=u*.8;g.fillStyle=P.c;round(g,x+1,y+1,w-2,h-2,5);g.fill();g.strokeStyle=lift?SEL:(dk?'#f8fafc':'#1f2937');g.lineWidth=lift?4:2;g.stroke();
 g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=1.5;g.beginPath();g.moveTo(x+6,y+h*.35);g.lineTo(x+w-6,y+h*.35);g.moveTo(x+6,y+h*.65);g.lineTo(x+w*.6,y+h*.65);g.stroke();return{x,y,w,h}}
/* a kitchen scale with a reading */
function scale(A,cx,y,w,grams,dk){const g=A.ctx;g.fillStyle=dk?'#475569':'#cbd5e1';round(g,cx-w/2,y,w,14,6);g.fill();g.fillStyle=dk?'#334155':'#e2e8f0';round(g,cx-w*.4,y+14,w*.8,56,10);g.fill();
 g.strokeStyle=EDGE;g.lineWidth=1.5;g.stroke();g.fillStyle='#0f172a';round(g,cx-58,y+26,116,34,6);g.fill();g.font=`800 22px ui-monospace,monospace`;g.fillStyle='#86efac';g.textAlign='center';g.textBaseline='middle';g.fillText(grams==null?'-- g':`${grams} g`,cx,y+43)}
return{KIT,GRAMS,TOTAL,TOWER,SLOTS,WEIGH,BINS,CARDS,MODELS,DESC,TXT,DONE,QS,icon,round,fit,card,top,piece,scale,INK,LIGHT,OK,NO,EDGE}})();
