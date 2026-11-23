/* Data and pictures for flagopposite (opposites: hot and cold, up and down; ages 4-5). Sources: DfE Development
   Matters 2021, Reception Communication and Language ('learn new vocabulary'; 'use new vocabulary in different
   contexts'); DfE EYFS statutory framework 2024, ELG Speaking; Murphy and Jones 2008, 'Antonyms in children's and
   child-directed speech', First Language 28(4): 403-430 (children use and hear opposite pairs such as big/little,
   hot/cold early, and adults often say both words of a pair together); Jones and Murphy 2005, 'Using corpora to
   investigate antonym acquisition', International Journal of Corpus Linguistics 10(3): 401-422. Slips it targets:
   picking a word that goes with the word (hot -> sun, fire) instead of its opposite; thinking words that mean the
   same (big, large) are opposites; giving every word an opposite (cat -> dog); swapping the wrong word in a sentence. */
const OPPOS=(()=>{
/* step 1: find the opposite. o = opposite, g = a word that only goes with it */
const MATCH=[{w:'hot',o:'cold',g:'fire'},{w:'wet',o:'dry',g:'rain'},{w:'up',o:'down',g:'sky'},{w:'happy',o:'sad',g:'smile'},{w:'open',o:'closed',g:'key'}];
/* step 2: flip the sentence. k = index of the word to swap; to = its opposite */
const FLIP=[{s:['The','door','is','open'],k:3,to:'closed'},{s:['The','baby','is','awake'],k:3,to:'asleep'},{s:['The','light','is','on'],k:3,to:'off'},{s:['The','towel','is','wet'],k:3,to:'dry'}];
/* step 3: opposites, or the same? z = 0 opposites, 1 same */
const SAME=[{a:'big',b:'little',z:0},{a:'big',b:'large',z:1},{a:'happy',b:'glad',z:1},{a:'happy',b:'sad',z:0},{a:'fast',b:'quick',z:1},{a:'fast',b:'slow',z:0}];
const BINS=['Opposites','Mean the same'];
/* step 4: does it have an opposite? y = 1 yes (o = the opposite) */
const NONE=[{w:'cat',y:0},{w:'hot',y:1,o:'cold'},{w:'chair',y:0},{w:'up',y:1,o:'down'},{w:'red',y:0},{w:'happy',y:1,o:'sad'}];
/* step 5: find the pairs among 6 cards */
const PAIRS=[['day','night'],['loud','quiet'],['fast','slow']],DEAL=['night','fast','loud','day','quiet','slow'];
const DESC=['A picture word at the top and two picture cards below. Drag or tap the card that is the opposite.',
 'A sentence in word tiles under a picture. Tap the word you can swap for its opposite.',
 'Two words, and two boxes: Opposites, and Mean the same. Drag the words to a box, or use the buttons.',
 'One picture word. Choose: it has an opposite, or it has no opposite.',
 'Six picture cards. Tap two cards that are opposites.'];
const TXT=['An opposite is the other end: hot and cold. Find the opposite.','Swap one word for its opposite. What changes?','Opposites, or two words that mean the same?','Does every word have an opposite?','Find the 3 pairs of opposites.'];
const DONE=['Hot and cold are opposites. Fire goes with hot, but it is not the other end.',
 'Swap one word for its opposite, and the sentence means the other thing.',
 'Big and little are opposites. Big and large mean the same.',
 'Some words have no opposite. A dog is not the opposite of a cat.',
 'Day and night, loud and quiet, fast and slow: all opposites.'];
const QS=[{q:'What is the opposite of cold?',a:'hot',o:[['ice','goes'],['snow','goes']]},
 {q:'What is the opposite of up?',a:'down',o:[['sky','goes'],['high','same']]},
 {q:'Are big and large opposites?',a:'No, they mean the same',o:[['Yes','same'],['Only sometimes','same']]},
 {q:'What is the opposite of dog?',a:'It has no opposite',o:[['cat','every'],['puppy','every']]},
 {q:'"The box is full." Swap one word for its opposite.',a:'The box is empty.',o:[['The bag is full.','wrongword'],['The box is big.','wrongword']]},
 {q:'What is the opposite of happy?',a:'sad',o:[['glad','same'],['smile','goes']]},
 {q:'What is the opposite of day?',a:'night',o:[['sun','goes'],['morning','goes']]}];
/* ---------- pictures: always drawn on a white card ---------- */
function icon(g,n,x,y,s){const u=s/2;g.save();g.translate(x,y);g.lineCap='round';g.lineJoin='round';const L=w=>{g.lineWidth=Math.max(2,u*w)};
 const face=(eyes,mouth,col)=>{g.fillStyle=col||'#fde68a';g.beginPath();g.arc(0,0,u*.8,0,7);g.fill();g.strokeStyle='#1e293b';L(.07);g.stroke();
  if(eyes==='open'){g.fillStyle='#1e293b';[-1,1].forEach(d=>{g.beginPath();g.arc(d*u*.28,-u*.18,u*.09,0,7);g.fill()})}else{[-1,1].forEach(d=>{g.beginPath();g.arc(d*u*.28,-u*.2,u*.12,.2,Math.PI-.2);g.stroke()})}
  g.beginPath();if(mouth==='smile')g.arc(0,u*.12,u*.32,.25,Math.PI-.25);else if(mouth==='frown')g.arc(0,u*.5,u*.3,Math.PI+.35,-.35);else{g.moveTo(-u*.15,u*.32);g.lineTo(u*.15,u*.32)}g.stroke()};
 const therm=(lvl,col)=>{g.strokeStyle='#334155';L(.07);g.fillStyle='#ffffff';g.beginPath();g.moveTo(-u*.15,u*.35);g.lineTo(-u*.15,-u*.75);g.arc(0,-u*.75,u*.15,Math.PI,0);g.lineTo(u*.15,u*.35);g.stroke();g.fill();
  g.fillStyle=col;g.beginPath();g.arc(0,u*.55,u*.27,0,7);g.fill();g.fillRect(-u*.08,u*.4-lvl*u*1.1,u*.16,lvl*u*1.1)};
 const drop=(dx,dy,r)=>{g.fillStyle='#0284c7';g.beginPath();g.moveTo(dx,dy-r*1.6);g.quadraticCurveTo(dx+r*1.2,dy,dx,dy+r);g.quadraticCurveTo(dx-r*1.2,dy,dx,dy-r*1.6);g.fill()};
 const shirt=()=>{g.fillStyle='#f97316';g.beginPath();g.moveTo(-u*.35,-u*.6);g.lineTo(-u*.8,-u*.35);g.lineTo(-u*.6,-u*.05);g.lineTo(-u*.45,-u*.15);g.lineTo(-u*.45,u*.7);g.lineTo(u*.45,u*.7);g.lineTo(u*.45,-u*.15);g.lineTo(u*.6,-u*.05);g.lineTo(u*.8,-u*.35);g.lineTo(u*.35,-u*.6);g.quadraticCurveTo(0,-u*.4,-u*.35,-u*.6);g.fill()};
 const cloud=(dy,col)=>{g.fillStyle=col||'#94a3b8';[[-.35,0,.3],[0,-.15,.38],[.35,0,.3]].forEach(([a,b,r])=>{g.beginPath();g.arc(u*a,dy+u*b,u*r,0,7);g.fill()});g.fillRect(-u*.65,dy,u*1.3,u*.28)};
 const sun=(r)=>{g.fillStyle='#f59e0b';g.strokeStyle='#f59e0b';L(.08);for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(Math.cos(a)*u*r*1.3,Math.sin(a)*u*r*1.3);g.lineTo(Math.cos(a)*u*r*1.75,Math.sin(a)*u*r*1.75);g.stroke()}g.beginPath();g.arc(0,0,u*r,0,7);g.fill()};
 const arrow=d=>{g.strokeStyle='#7c3aed';L(.16);g.beginPath();g.moveTo(0,d*u*.7);g.lineTo(0,-d*u*.55);g.stroke();g.fillStyle='#7c3aed';g.beginPath();g.moveTo(0,-d*u*.9);g.lineTo(-u*.35,-d*u*.45);g.lineTo(u*.35,-d*u*.45);g.closePath();g.fill()};
 const door=op=>{g.fillStyle='#78350f';g.fillRect(-u*.5,-u*.85,u*1,u*1.7);if(op){g.fillStyle='#fef3c7';g.fillRect(-u*.4,-u*.75,u*.8,u*1.6);g.fillStyle='#b45309';g.beginPath();g.moveTo(-u*.4,-u*.75);g.lineTo(-u*.05,-u*.6);g.lineTo(-u*.05,u*.95);g.lineTo(-u*.4,u*.85);g.fill()}else{g.fillStyle='#b45309';g.fillRect(-u*.4,-u*.75,u*.8,u*1.6);g.fillStyle='#fde047';g.beginPath();g.arc(u*.25,0,u*.08,0,7);g.fill()}};
 const bulb=on=>{if(on){g.strokeStyle='#f59e0b';L(.06);for(let i=0;i<7;i++){const a=Math.PI*(1.05+i*.15);g.beginPath();g.moveTo(Math.cos(a)*u*.65,-u*.2+Math.sin(a)*u*.65);g.lineTo(Math.cos(a)*u*.85,-u*.2+Math.sin(a)*u*.85);g.stroke()}}
  g.fillStyle=on?'#fde047':'#cbd5e1';g.strokeStyle='#334155';L(.06);g.beginPath();g.arc(0,-u*.2,u*.45,0,7);g.fill();g.stroke();g.fillStyle='#64748b';g.fillRect(-u*.22,u*.25,u*.44,u*.4)};
 const speaker=waves=>{g.fillStyle='#334155';g.fillRect(-u*.7,-u*.2,u*.3,u*.4);g.beginPath();g.moveTo(-u*.4,-u*.2);g.lineTo(-u*.05,-u*.55);g.lineTo(-u*.05,u*.55);g.lineTo(-u*.4,u*.2);g.fill();g.strokeStyle='#334155';L(.07);
  for(let i=1;i<=waves;i++){g.beginPath();g.arc(-u*.05,0,u*(.2+i*.22),-.7,.7);g.stroke()}};
 switch(n){
 case'hot':therm(.95,'#dc2626');break; case'cold':therm(.2,'#2563eb');g.strokeStyle='#38bdf8';L(.06);for(let i=0;i<3;i++){const a=i*Math.PI/3;g.beginPath();g.moveTo(u*.55+Math.cos(a)*u*.25,-u*.45+Math.sin(a)*u*.25);g.lineTo(u*.55-Math.cos(a)*u*.25,-u*.45-Math.sin(a)*u*.25);g.stroke()}break;
 case'fire':g.fillStyle='#ef4444';g.beginPath();g.moveTo(0,-u*.85);g.quadraticCurveTo(u*.75,-u*.1,u*.45,u*.6);g.quadraticCurveTo(0,u*.85,-u*.45,u*.6);g.quadraticCurveTo(-u*.75,-u*.1,0,-u*.85);g.fill();g.fillStyle='#facc15';g.beginPath();g.moveTo(0,-u*.2);g.quadraticCurveTo(u*.35,u*.25,u*.2,u*.6);g.lineTo(-u*.2,u*.6);g.quadraticCurveTo(-u*.35,u*.25,0,-u*.2);g.fill();break;
 case'wet':shirt();drop(-u*.15,u*.05,u*.12);drop(u*.2,u*.35,u*.12);drop(-u*.65,u*.55,u*.1);drop(u*.65,u*.6,u*.1);break;
 case'dry':shirt();g.save();g.translate(u*.55,-u*.6);sun(.18);g.restore();break;
 case'rain':cloud(-u*.45);drop(-u*.35,u*.35,u*.1);drop(0,u*.6,u*.1);drop(u*.35,u*.35,u*.1);break;
 case'up':arrow(1);g.fillStyle='#16a34a';g.beginPath();g.arc(u*.55,-u*.6,u*.2,0,7);g.fill();break; case'down':arrow(-1);g.fillStyle='#16a34a';g.beginPath();g.arc(u*.55,u*.6,u*.2,0,7);g.fill();break;
 case'sky':g.fillStyle='#38bdf8';A0(g,u);cloud(-u*.05,'#ffffff');break;
 case'happy':face('open','smile');break; case'sad':face('open','frown','#bfdbfe');break;
 case'smile':g.strokeStyle='#dc2626';L(.16);g.beginPath();g.arc(0,-u*.2,u*.6,.35,Math.PI-.35);g.stroke();break;
 case'key':g.strokeStyle='#ca8a04';L(.14);g.beginPath();g.arc(-u*.4,0,u*.28,0,7);g.stroke();g.beginPath();g.moveTo(-u*.12,0);g.lineTo(u*.75,0);g.moveTo(u*.55,0);g.lineTo(u*.55,u*.3);g.moveTo(u*.3,0);g.lineTo(u*.3,u*.25);g.stroke();break;
 case'open':door(1);break; case'closed':door(0);break;
 case'awake':face('open','line');break; case'asleep':face('shut','line','#e9d5ff');g.fillStyle='#4338ca';g.font=`800 ${Math.round(u*.4)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText('z',u*.75,-u*.6);g.fillText('z',u*.55,-u*.85);break;
 case'on':bulb(1);break; case'off':bulb(0);break;
 case'day':g.fillStyle='#bae6fd';A0(g,u);sun(.32);break;
 case'night':g.fillStyle='#1e3a8a';A0(g,u);g.fillStyle='#fef9c3';g.beginPath();g.arc(0,0,u*.38,0,7);g.fill();g.fillStyle='#1e3a8a';g.beginPath();g.arc(u*.18,-u*.1,u*.32,0,7);g.fill();g.fillStyle='#fef9c3';[[-.55,-.55],[.55,.5],[-.5,.5]].forEach(([a,b])=>{g.beginPath();g.arc(u*a,u*b,u*.06,0,7);g.fill()});break;
 case'loud':speaker(3);break; case'quiet':speaker(0);g.fillStyle='#334155';g.font=`800 ${Math.round(u*.38)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText('shh',u*.45,0);break;
 case'fast':g.fillStyle='#dc2626';g.beginPath();g.ellipse(u*.2,0,u*.62,u*.3,0,0,7);g.fill();g.fillStyle='#bfdbfe';g.beginPath();g.ellipse(u*.35,-u*.12,u*.22,u*.12,0,0,7);g.fill();g.fillStyle='#1e293b';[-.15,.55].forEach(a=>{g.beginPath();g.arc(u*a,u*.3,u*.16,0,7);g.fill()});g.strokeStyle='#64748b';L(.08);[-.2,0,.2].forEach(b=>{g.beginPath();g.moveTo(-u*.95,u*b);g.lineTo(-u*.5,u*b);g.stroke()});break;
 case'slow':g.fillStyle='#a3e635';g.beginPath();g.ellipse(0,u*.35,u*.7,u*.15,0,0,7);g.fill();g.strokeStyle='#92400e';g.fillStyle='#fbbf24';L(.07);g.beginPath();g.arc(-u*.05,0,u*.38,0,7);g.fill();g.stroke();g.beginPath();g.arc(-u*.05,0,u*.18,0,6);g.stroke();g.strokeStyle='#65a30d';g.beginPath();g.moveTo(u*.55,u*.25);g.lineTo(u*.7,-u*.15);g.stroke();break;
 case'cat':g.fillStyle='#fb923c';g.beginPath();g.moveTo(-u*.6,-u*.1);g.lineTo(-u*.5,-u*.8);g.lineTo(-u*.15,-u*.45);g.lineTo(u*.15,-u*.45);g.lineTo(u*.5,-u*.8);g.lineTo(u*.6,-u*.1);g.arc(0,0,u*.6,0,Math.PI);g.closePath();g.fill();g.fillStyle='#1e293b';[-1,1].forEach(d=>{g.beginPath();g.arc(d*u*.25,-u*.05,u*.07,0,7);g.fill()});g.strokeStyle='#1e293b';L(.04);[-1,1].forEach(d=>{g.beginPath();g.moveTo(d*u*.15,u*.2);g.lineTo(d*u*.7,u*.12);g.moveTo(d*u*.15,u*.25);g.lineTo(d*u*.7,u*.32);g.stroke()});break;
 case'chair':g.strokeStyle='#92400e';L(.14);g.beginPath();g.moveTo(-u*.35,-u*.8);g.lineTo(-u*.35,u*.8);g.moveTo(-u*.35,u*.05);g.lineTo(u*.45,u*.05);g.lineTo(u*.45,u*.8);g.stroke();break;
 case'red':g.fillStyle='#dc2626';g.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5,r=u*(i%2?.5:.75);g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fill();break;
 default:break}
 g.restore()}
function A0(g,u){g.beginPath();g.arc(0,0,u*.85,0,7);g.fill()}
/* canvas helpers */
function PEN(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of t.split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(17)}${F}`,L=wrap(t,A.W-34,font),lh=sz(17)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(15)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(15)*1.3));y+=L2.length*sz(15)*1.3+6}return y}
 function box(r,t,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(!t)return;let n=sz(o.n||18),L;
  for(;;){L=wrap(t,r.w-12,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-8||n<=11)break;n--}c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';
  L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*n*1.2))}
 /* a picture card: the picture on top, the word underneath */
 function pic(r,word,o){o=o||{};box(r,'',o);const c=g(),wh=Math.min(sz(o.n||20)*1.4,r.h*.3),s=Math.min(r.w*.8,r.h-wh-10);icon(c,word,r.x+r.w/2,r.y+6+s/2,s);
  c.font=`800 ${Math.min(sz(o.n||20),Math.round(wh*.8))}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';c.fillText(word,r.x+r.w/2,r.y+r.h-wh/2-4)}
 return{wrap,strip,box,pic,sz,fg,dk,INK,OK,NO,RIM,F}}
return{MATCH,FLIP,SAME,BINS,NONE,PAIRS,DEAL,DESC,TXT,DONE,QS,icon,PEN}})();
