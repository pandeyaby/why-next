/* Data and drawings for flagsayhow (giving clear instructions; English, Speaking & Listening, ages 4-5). Sources: DfE
   Development Matters (2021), Reception Communication and Language ('use talk to help work out problems and organise
   thinking and activities, and to explain how things work'); EYFS Statutory Framework (2024) ELG Speaking; Talk for
   Writing (Corbett and Strong), oral rehearsal of 'how to' texts in Reception with a doing word at the start of each
   step; EEF Preparing for Literacy (2018), recommendation 1. The robot does exactly what it hears, the classic 'robot
   sandwich' test teachers use for instructions. A spoon spreads the jam, so no knife is needed at this age.
   Slips it targets: an instruction that does not start with a doing word ('I like bread', a fact or a question);
   words that make the listener guess ('Put it there', 'Put jam on'); leaving out what to get ready or adding things
   not needed; steps in the wrong order; giving up instead of fixing the step that went wrong. */
const SAY=(()=>{
/* step 1: which one tells the robot what to do? */
const BOSS=[{e:'\u{1F35E}',a:'Put the bread on the plate.',o:[['I like bread.','like'],['Is it bread?','ask']],did:{base:1}},
 {e:'\u{1F353}',a:'Spread the jam on the bread.',o:[['Jam is red.','fact'],['Do you like jam?','ask']],did:{base:1,jam:1}},
 {e:'\u{1F96A}',a:'Put the other slice on top.',o:[['I had a sandwich.','story'],['Is it big?','ask']],did:{base:1,jam:1,top:1}}];
/* step 2: what do we get ready? */
const KIT=[{e:'\u{1F35E}',t:'Bread',ok:1},{e:'\u26BD',t:'Ball',ok:0},{e:'\u{1F353}',t:'Jam',ok:1},{e:'\u{1F45F}',t:'Shoe',ok:0},{e:'\u{1F944}',t:'Spoon',ok:1},{e:'\u{1F9F8}',t:'Teddy',ok:0},{e:'\u{1F37D}\uFE0F',t:'Plate',ok:1},{e:'\u{1F58D}\uFE0F',t:'Crayon',ok:0}];
/* step 3: say exactly: [vague, exact, what the robot does with the vague words] */
const EXACT=[{v:'Put it there.',x:'Put the bread on the plate.',silly:'head',why:'Put what? Where? The robot had to guess. It put the bread on its head!',did:{base:1}},
 {v:'Put jam on.',x:'Spread a spoon of jam on the bread.',silly:'jar',why:'How much jam? The robot put the whole jar on the bread!',did:{base:1,jam:1}},
 {v:'Put the bread on.',x:'Put the other slice on top.',silly:'floor',why:'On what? The robot put the bread on the floor!',did:{base:1,jam:1,top:1}}];
/* step 4: the steps, in the right order */
const STEPS=['Put bread on the plate.','Spread jam on it.','Put the top slice on.','Eat it!'];
const OOPS=[null,'There is no bread yet! The robot spread jam on the plate.','No jam inside! The robot put the top on too soon.','Not yet! The sandwich is not made.'];
const SILLY_OF=[null,'platejam','nojam','none'];
/* step 5: build it: doing word + thing + place */
const ROWS=[['Put','Spread'],['the bread','the jam'],['on the plate','on the bread','on the floor']];
const GOALS=[{w:[0,0,0],t:'Bread on the plate',did:{base:1}},{w:[1,1,1],t:'Jam on the bread',did:{base:1,jam:1}}];
const DESC=['A robot and a plate. Three cards. Tap the card that tells the robot what to do.',
 'Eight things. Tap the 4 things we need to make a jam sandwich.',
 'Two cards. One says it exactly. Tap the clear one and see what the robot does.',
 'Four step cards are mixed up. Tap them in the order the robot must do them.',
 'Make a whole instruction: tap a doing word, a thing and a place. The robot does just what you say.'];
const TXT=['An instruction starts with a doing word.','Say what we need first.','Say exactly what and where.','Say the steps in order.','Robots do just what you say.'];
const DONE=['Put, Spread, Put: each one starts with a doing word, so the robot knows what to do.',
 'Bread, jam, a spoon and a plate. Only what the steps use.',
 'Clear words, no guessing: the robot made it right.',
 'Bread, then jam, then the top, then eat. The order works!',
 'You said what to do, what and where. The robot did it just right.'];
const QS=[{q:'Which one tells the robot what to do?',a:'Put the bread on the plate.',o:[['I like bread.','like'],['Is it bread?','ask']]},
 {q:'An instruction starts with a\u2026',a:'Doing word, like Spread',o:[['Question, like Is it?','ask'],['Like word, like I like','like']]},
 {q:'You say \u201CPut it there.\u201D What does the robot do?',a:'It does not know what or where',o:[['It knows just what I mean','guess'],['It makes the sandwich','guess']]},
 {q:'What do we get ready for a jam sandwich?',a:'Bread, jam, a spoon, a plate',o:[['A ball and a shoe','need'],['Nothing at all','need']]},
 {q:'Which step comes first?',a:'Put bread on the plate',o:[['Put the top slice on','order'],['Eat it','order']]},
 {q:'Which is clearer?',a:'Spread jam on the bread',o:[['Put jam on','exact'],['Do the jam','exact']]},
 {q:'The robot put jam on the floor. What do you do?',a:'Fix the step: say where',o:[['Shout at the robot','fix'],['Give up','fix']]},
 {q:'Can a robot guess what you mean?',a:'No, it does just what I say',o:[['Yes, always','guess'],['Yes, if I am cross','guess']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif';
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(e,x,y)}
function slice(g,x,y,w,h){const r=Math.min(h*.45,10);g.fillStyle='#b45309';rr(g,x-w/2,y-h/2,w,h,r);g.fill();g.fillStyle='#fde68a';rr(g,x-w/2+3,y-h/2+3,w-6,h-6,Math.max(2,r-3));g.fill()}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
/* the kitchen table: plate, sandwich layers, the robot, and any silly result */
function scene(g,r,st,dk){const cx=r.x+r.w*.62,py=r.y+r.h*.7,pw=Math.min(r.w*.5,r.h*1.1),s=Math.min(r.w*.3,r.h*.55);
 g.fillStyle=dk?'#292524':'#fef3c7';g.fillRect(r.x,r.y+r.h*.55,r.w,r.h*.45);
 g.fillStyle='#f8fafc';g.beginPath();g.ellipse(cx,py,pw/2,pw*.16,0,0,7);g.fill();g.strokeStyle=RIM;g.lineWidth=2;g.stroke();
 const sw=pw*.62,sh=Math.max(10,pw*.09);let y=py-pw*.06-sh/2;
 if(st.base){slice(g,cx,y,sw,sh);y-=sh*.5}
 if(st.jam||st.silly==='platejam'){g.fillStyle='#be123c';rr(g,cx-sw/2+2,y-sh*.35,sw-4,sh*.4,4);g.fill();y-=sh*.4}
 if(st.top||st.silly==='nojam')slice(g,cx,y-sh*.45,sw,sh);
 if(st.silly==='jar'){g.fillStyle='#be123c';g.fillRect(cx-sw*.16,y-sh*3.4,sw*.32,sh*3);g.fillStyle='#e2e8f0';g.fillRect(cx-sw*.19,y-sh*3.8,sw*.38,sh*.6)}
 if(st.eaten)emo(g,'\u{1F60B}',cx,py-pw*.35,s*.5);
 const rx=r.x+r.w*.2,ry=r.y+r.h*.48;emo(g,'\u{1F916}',rx,ry,s);
 if(st.silly==='head')slice(g,rx,ry-s*.58,s*.8,Math.max(10,s*.16));
 if(st.silly==='floor')slice(g,rx+s*.55,r.y+r.h-sh*1.1,sw*.7,sh);
 if(st.silly==='none'||st.silly==='wait')emo(g,'\u2753',rx+s*.5,ry-s*.5,s*.4)}
function PEN(A){const sz=n=>A.narrow?n:Math.round(n*1.12),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(17)}${F}`,L=wrap(t,A.W-34,font),lh=sz(17)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(15)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(15)*1.3));y+=L2.length*sz(15)*1.3+6}return y}
 function card(r,word,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#e2e8f0':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?4:1.8;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(!word)return;
  let n=sz(o.n||17),L;for(;;){L=wrap(word,r.w-14,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-6||n<=12)break;n--}
  c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';const cy=r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,cy+(i-(L.length-1)/2)*n*1.2))}
 function text(t,x,y,n,align,col){const c=g();c.font=`800 ${sz(n)}${F}`;c.fillStyle=col||fg();c.textAlign=align||'left';c.textBaseline='middle';c.fillText(t,x,y)}
 return{wrap,strip,card,text,sz,fg,dk}}
return{BOSS,KIT,EXACT,STEPS,OOPS,SILLY_OF,ROWS,GOALS,DESC,TXT,DONE,QS,emo,scene,PEN}})();
