/* Data and drawings for flagspend (spending and saving: needs and wants; ages 6-7). Sources: PSHE Association
   Programme of Study 2020, KS1 Living in the wider world: L10 what money is and where it comes from, L11 that people
   make different choices about how to save and spend money, L12 the difference between needs and wants and that
   people may not always be able to have the things they want, L13 that money needs to be looked after and ways of
   doing this; MoneyHelper (Money and Pensions Service) Financial education planning framework 3-11 (needs before
   wants, saving over time, keeping money safe); Whitebread and Bingham 2013 for the Money Advice Service (money habits
   are forming by about age 7). Prices are simple whole pounds so the sums stay within Year 1 and Year 2 number work.
   Slips it targets: 'I really want it, so it is a need'; spending on wants before needs; thinking spent money comes
   back; thinking saving a little is pointless; leaving money somewhere it can be lost; thinking you can have every
   want if you choose carefully. */
const SPD=(()=>{
/* step 1: need (1) or want (0)? */
const SORT=[{e:'🍎',t:'Food',n:1},{e:'🧸',t:'Teddy',n:0},{e:'💧',t:'Water',n:1},{e:'🍬',t:'Sweets',n:0},{e:'🧥',t:'Warm coat',n:1},{e:'🎮',t:'Video game',n:0},{e:'💊',t:'Medicine when ill',n:1},{e:'🏠',t:'A home',n:1}];
/* step 2: the shop; you have 10 pounds */
const PURSE=10,SHOP=[{e:'🍞',t:'Bread',p:2,n:1},{e:'🥛',t:'Milk',p:1,n:1},{e:'🍏',t:'Apples',p:2,n:1},{e:'🤖',t:'Toy robot',p:8,n:0},{e:'📖',t:'Comic',p:3,n:0}];
/* step 3: 2 pounds pocket money a week; the kite costs 10 pounds */
const WEEK=2,KITE=10;
/* step 4: where to keep money; ok = safe */
const PLACES=[{e:'🐷',t:'Money box',ok:1},{e:'🪑',t:'Park bench',ok:0,why:'Money left on a park bench can be lost or taken. Keep it somewhere safe.'},{e:'🏦',t:'Bank',ok:1},
 {e:'👖',t:'Pocket with a hole',ok:0,why:'Coins fall out of a hole in a pocket. Then they are lost.'},{e:'👛',t:"Grown-up's purse",ok:1},{e:'🏖️',t:'In the sand',ok:0,why:'Money in the sand gets lost. You may never find it again.'}];
/* step 5: 5 pounds and three wants: you cannot have them all */
const LEFT=5,WANTS=[{e:'⚽',t:'Ball',p:4},{e:'📖',t:'Comic',p:3},{e:'⭐',t:'Stickers',p:2}];
const DESC=['A card shows one thing. Two boxes: Need and Want. Drag the card to a box, or tap a box.',
 'A shop with bread, milk, apples, a toy robot and a comic. You have 10 pounds. Tap a thing to put it in the basket. Tap it again to put it back.',
 'A money jar and a sweet shop. Each week you get 2 pounds. Tap the jar to save it, or the sweets to spend it. The kite costs 10 pounds.',
 'Six places to keep money. Tap the safe places.',
 'You have 5 pounds left. A ball, a comic and stickers. Tap the ones you choose.'];
const TXT=['A need is something we must have to live and stay well. A want is nice to have.','Money runs out. What do you buy first?','Save a little each week to get something bigger.','Money needs to be kept safe.','You cannot have every want. Choose!'];
const DONE=['Food, water, a warm coat, medicine and a home are needs. Teddies, sweets and games are wants.',
 'Needs first: bread, milk and apples cost 5 pounds. There is 5 pounds left, not enough for the robot.',
 '5 weeks of saving 2 pounds makes 10 pounds. You got the kite!',
 'A money box, a bank and a grown-up\'s purse keep money safe.',
 'You chose, and you gave something up. That is OK. You could save up for it next time.'];
const QS=[{q:'Are sweets a need or a want?',a:'A want',o:[['A need, I really want them','want'],['A need, everyone has them','want']]},
 {q:'You have 5 pounds. You need bread and want a toy. Which do you buy first?',a:'The bread',o:[['The toy','first'],['Both, always','all']]},
 {q:'You spend your 2 pounds on sweets. Where is the money now?',a:'It is gone',o:[['Back in my jar','gone'],['It comes back next day','gone']]},
 {q:'You save 2 pounds each week. How much after 3 weeks?',a:'6 pounds',o:[['2 pounds','save'],['3 pounds','save']]},
 {q:'Where is a safe place to keep money?',a:'A money box',o:[['On a park bench','safe'],['In a pocket with a hole','safe']]},
 {q:'Is a warm coat in winter a need or a want?',a:'A need',o:[['A want','need'],['Neither','need']]},
 {q:'You have 5 pounds. A ball is 4 pounds and a comic is 3 pounds. Can you have both?',a:'No, that is 7 pounds',o:[['Yes, if I choose well','all'],['Yes, money never runs out','all']]},
 {q:'Is it worth saving just 1 pound a week?',a:'Yes, it adds up',o:[['No, it is too little','save'],['No, saving is only for grown-ups','save']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif';
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(e,x,y)}
function jar(g,x,y,w,h,v,max,dk){g.fillStyle=dk?'#334155':'#e2e8f0';g.fillRect(x,y,w,h);const f=Math.min(1,v/max);g.fillStyle='#facc15';g.fillRect(x,y+h*(1-f),w,h*f);g.lineWidth=3;g.strokeStyle=dk?'#cbd5e1':'#334155';g.strokeRect(x,y,w,h);
 g.strokeStyle=OK;g.setLineDash([6,4]);g.beginPath();g.moveTo(x-4,y);g.lineTo(x+w+4,y);g.stroke();g.setLineDash([])}
function PEN(A){const sz=n=>A.narrow?n:Math.round(n*1.12),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(16)}${F}`,L=wrap(t,A.W-34,font),lh=sz(16)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(14)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+6}return y}
 function card(r,word,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#f1f5f9':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(!word)return;
  let n=sz(o.n||15),L;for(;;){L=wrap(word,r.w-10,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-4||n<=11)break;n--}
  c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';const cy=r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,cy+(i-(L.length-1)/2)*n*1.2))}
 function meter(x,y,w,h,v,max,col,mark){const c=g();c.fillStyle=dk()?'#334155':'#e2e8f0';A.paint.rrect(x,y,w,h,h/2);c.fill();c.fillStyle=col;A.paint.rrect(x,y,Math.max(h,w*Math.min(1,v/max)),h,h/2);c.fill();
  if(mark!=null){const mx=x+w*mark/max;c.strokeStyle=fg();c.lineWidth=3;c.beginPath();c.moveTo(mx,y-4);c.lineTo(mx,y+h+4);c.stroke()}}
 function text(t,x,y,n,align,col){const c=g();c.font=`800 ${sz(n)}${F}`;c.fillStyle=col||fg();c.textAlign=align||'left';c.textBaseline='middle';c.fillText(t,x,y)}
 return{wrap,strip,card,meter,text,sz,fg,dk,INK,F}}
return{SORT,PURSE,SHOP,WEEK,KITE,PLACES,LEFT,WANTS,DESC,TXT,DONE,QS,emo,jar,PEN}})();
