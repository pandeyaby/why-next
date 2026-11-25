/* Data and drawings for flagmoonorbit (the Moon's orbit and why its phases happen; ages 7-9). Sources: NGSS
   5-ESS1-2 and the NGSS middle-school band MS-ESS1-1 (the cyclic patterns of lunar phases explained by the Earth-Sun-
   Moon system); DfE National Curriculum in England, Year 5 'Earth and space' (describe the movement of the Moon
   relative to the Earth; the Moon as an approximately spherical body); NASA Science 'Moon phases' (the Moon is always
   half lit by the Sun; the phase is how much of that sunlit half faces Earth; about 29.5 days from one new moon to the
   next; it orbits Earth anticlockwise seen from above the North Pole, about 27.3 days per orbit against the stars).
   Slips it targets (Trundle, Atwood and Christopher 2002; Baxter 1989): the Moon makes its own light; Earth's
   shadow causes the phases; only the part we see is lit; full moon happens when the Moon is between Earth and the Sun;
   the phase cycle takes a day or a year; the shrinking Moons are lit on the same side as the growing ones. */
const MOB=(()=>{
const LEN=29.5,DAY=360/LEN,norm=a=>((a%360)+360)%360,rad=a=>a*Math.PI/180;
/* e = how far round the Moon is from new moon, in degrees, going the way it really goes (anticlockwise from above) */
function kind(e){e=norm(e);if(e<12||e>348)return'new';if(e<78)return'wxc';if(e<=102)return'fq';if(e<168)return'wxg';if(e<=192)return'full';if(e<258)return'wng';if(e<=282)return'lq';return'wnc'}
const NAME={new:'new moon',wxc:'growing crescent',fq:'half moon (first quarter)',wxg:'growing gibbous',full:'full moon',wng:'shrinking gibbous',lq:'half moon (last quarter)',wnc:'shrinking crescent'};
const LOOK={new:'all dark: the lit half faces away from us',wxc:'a thin curve lit on the right',fq:'the right half lit',wxg:'mostly lit, a dark edge on the left',full:'all lit: the whole lit half faces us',
 wng:'mostly lit, a dark edge on the right',lq:'the left half lit',wnc:'a thin curve lit on the left'};
const GROUP={wxc:'crescent',wnc:'crescent',fq:'half',lq:'half',wxg:'gibbous',wng:'gibbous',new:'new',full:'full'};
/* step 5: seven cards to put in order after new moon; SH says which phase each card A-G shows */
const ORD=[45,90,135,180,225,270,315],SH=[4,1,6,2,0,5,3],LET='ABCDEFG';
const DESC=['Space seen from above. Sunlight comes from the left. Earth is in the middle and the Moon is beside it. Tap the Sun to switch it off or on.',
 'Space seen from above. The Moon goes round Earth on a circle. Drag the Moon, or use the day buttons, and watch the day count.',
 'Space seen from above, with a box showing the Moon as we see it from Earth. Drag the Moon round and watch its shape change.',
 'Eight Moons round Earth, each with its sunlit half towards the Sun. Tap a Moon to see how it looks from Earth.',
 'Earth\u2019s shadow points away from the Sun. Eight Moons sit round Earth. Tap the place where the shadow could reach the Moon.',
 'Seven Moon shapes on cards A to G. Tap them in order, starting just after new moon.'];
const TXT=['The Moon is a big ball of rock. Does it make its own light, like the Sun?',
 'The Moon travels round Earth on a path called its orbit. How long does one trip take?',
 'Watch the Moon from Earth as it goes round. Where is it when we see a full moon?',
 'The Sun always lights half of the Moon. So why do we sometimes see only a thin curve?',
 'Some people think Earth\u2019s shadow makes the Moon\u2019s shape. Let\u2019s test that idea.',
 'Put a month of Moon shapes in order, from just after new moon to just before the next one.'];
const DONE=['The Moon has no light of its own. It shines because sunlight bounces off it, so with no Sun it would be dark.',
 'About 29 and a half days from new moon back to new moon: about a month.',
 'Full moon is when the Moon is on the far side of Earth from the Sun, so its whole lit half faces us. New moon is when it is between us and the Sun.',
 'Every Moon is half lit, all the time. The shape we see is how much of that lit half is turned towards Earth.',
 'Earth\u2019s shadow points away from the Sun, so it could only reach a full moon. When it does, that is an eclipse, not a phase.',
 'Growing Moons are lit on the right and get fuller each night. After full moon they shrink, lit on the left.'];
const QS=[{q:'Why does the Moon shine?',a:'Sunlight bounces off it',o:[['It makes its own light','own'],['It is on fire','own']]},
 {q:'What makes a half moon look half dark?',a:'We see only part of its sunlit half',o:[['Earth\u2019s shadow covers half','shadow'],['A cloud covers it','shadow']]},
 {q:'We see a thin crescent. How much of the Moon is lit by the Sun?',a:'Half of it, as always',o:[['Only the thin crescent','half'],['None of it','half']]},
 {q:'Where is the Moon at full moon?',a:'On the far side of Earth from the Sun',o:[['Between Earth and the Sun','where'],['Next to the Sun','where']]},
 {q:'About how long from one full moon to the next?',a:'About 29 and a half days',o:[['One day','time'],['One year','time']]},
 {q:'A Moon is lit on the left side and is shrinking. What comes next?',a:'A thinner shape, then new moon',o:[['A fuller shape, then full moon','side'],['It stays the same','side']]},
 {q:'Where is the Moon at new moon?',a:'Between Earth and the Sun',o:[['Behind Earth, in its shadow','where'],['On the far side of the Sun','where']]},
 {q:'Does the Moon itself change shape during the month?',a:'No, it is always a round ball',o:[['Yes, it gets smaller','shape'],['Yes, bits break off','shape']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',LIT='#fde68a',SUN='#f59e0b';
/* screen position of a Moon e degrees past new moon: new moon is on the Sun's side (left), first quarter below, full on the right */
function at(cx,cy,R,e){const f=rad(180+e);return{x:cx+R*Math.cos(f),y:cy-R*Math.sin(f)}}
function disc(g,x,y,r,col){g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill()}
/* a ball seen from above with sunlight from the left: the left half lit */
function ball(g,x,y,r,lit,dark,on){disc(g,x,y,r,dark);if(on){g.fillStyle=lit;g.beginPath();g.arc(x,y,r,Math.PI/2,Math.PI*1.5);g.closePath();g.fill()}g.strokeStyle=RIM;g.lineWidth=1.2;g.beginPath();g.arc(x,y,r,0,7);g.stroke()}
/* the Moon as seen from Earth (Northern Hemisphere): the lit part is between the bright edge and the terminator */
function phase(g,x,y,r,e,dk,on){e=norm(e);disc(g,x,y,r,dk?'#334155':'#475569');
 if(on!==false&&kind(e)!=='new'){const k=Math.cos(rad(e)),s=e<=180?1:-1,N=36;g.fillStyle=LIT;g.beginPath();
  for(let i=0;i<=N;i++){const t=-Math.PI/2+Math.PI*i/N;g.lineTo(x+s*r*Math.cos(t),y+r*Math.sin(t))}
  for(let i=N;i>=0;i--){const t=-Math.PI/2+Math.PI*i/N;g.lineTo(x+s*k*r*Math.cos(t),y+r*Math.sin(t))}g.closePath();g.fill()}
 g.strokeStyle=dk?'#94a3b8':'#334155';g.lineWidth=1.5;g.beginPath();g.arc(x,y,r,0,7);g.stroke()}
function sunlight(g,x0,y0,h,on,dk){if(!on)return;g.strokeStyle=dk?'#fbbf24':'#d97706';g.fillStyle=g.strokeStyle;g.lineWidth=2;
 for(let i=0;i<5;i++){const y=y0+h*(i+.5)/5;g.beginPath();g.moveTo(x0,y);g.lineTo(x0+34,y);g.stroke();g.beginPath();g.moveTo(x0+40,y);g.lineTo(x0+31,y-5);g.lineTo(x0+31,y+5);g.closePath();g.fill()}}
function sunDisc(g,x,y,r,on,dk){disc(g,x,y,r,on?SUN:(dk?'#475569':'#94a3b8'));g.strokeStyle=on?'#b45309':RIM;g.lineWidth=2;g.beginPath();g.arc(x,y,r,0,7);g.stroke()}
function PEN(A){const sz=n=>A.narrow?n:Math.round(n*1.1),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function banner(t,tone,note,bad){const c=g(),font=`800 ${sz(15)}${F}`,L=wrap(t,A.W-34,font),lh=sz(15)*1.3,h=L.length*lh+12;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#f8fafc');A.paint.rrect(8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,14+i*lh));
  let y=8+h+5;if(note){const f2=`700 ${sz(13)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(13)*1.3));y+=L2.length*sz(13)*1.3+5}return y}
 function tag(t,x,y,n,col){const c=g();c.font=`800 ${sz(n)}${F}`;const w=c.measureText(t).width+10,h=sz(n)*1.45;c.fillStyle=dk()?'#1e293b':'#ffffff';A.paint.rrect(x-w/2,y-h/2,w,h,6);c.fill();c.strokeStyle=col||RIM;c.lineWidth=1.5;c.stroke();c.fillStyle=fg();c.textAlign='center';c.textBaseline='middle';c.fillText(t,x,y+.5)}
 return{banner,tag,wrap,sz,fg}}
return{LEN,DAY,norm,kind,NAME,LOOK,GROUP,ORD,SH,LET,DESC,TXT,DONE,QS,at,disc,ball,phase,sunlight,sunDisc,PEN,OK,NO,RIM,INK,LIT}})();
