/* Data and drawings for flagmorse (Patterns and codes for sending information; ages 9-10; NGSS 4-PS4-3 'generate and
   compare multiple solutions that use patterns to transfer information', with its examples of Morse code, drums and a
   grid of 1s and 0s for a picture). Sources: ITU-R M.1677-1 International Morse code (2009): a dash is three dots long,
   the space inside a letter is one dot, between letters three dots, between words seven dots; letter codes E ·, T −,
   A ·−, I ··, N −·, M −−, S ···, O −−−, U ··−, V ···−, Q −−·−. Lewand (2000) English letter frequencies: E 12.7%,
   T 9.1%, A 8.2%, Q 0.1%. Alfred Vail and Samuel Morse gave the shortest codes to the most used letters by counting the
   type in a printer's case (Smithsonian, 'Morse code and the telegraph'). Repeating a message and taking the majority is
   the simplest error-correcting code (Hamming 1950 starts from it). Slips it targets: gaps are not needed; codes follow
   alphabet order; 1 and 0 swapped in a picture code; trusting one copy of a noisy message; a code works without agreeing
   it; miscounting patterns. */
const MORSE=(()=>{
const CODE={A:'·−',E:'·',T:'−',I:'··',N:'−·',M:'−−',S:'···',O:'−−−',U:'··−',V:'···−',Q:'−−·−'};
const BACK=Object.fromEntries(Object.entries(CODE).map(([k,v])=>[v,k]));
/* step 1: tap SOS. '/' is the letter gap */
const SOS=['·','·','·','/','−','−','−','/','·','·','·'];
/* step 2: a signal received with no gaps: ···− */
const RX=['·','·','·','−'];
function read(gaps){const out=[];let cur='';RX.forEach((s,i)=>{cur+=s;if(i===RX.length-1||gaps[i]){out.push(BACK[cur]||'?');cur=''}});return out.join(' ')}
/* step 3: make your own code; letters in order of use, codes to hand out */
const FREQ=[{l:'E',p:12.7},{l:'T',p:9.1},{l:'A',p:8.2},{l:'Q',p:0.1}];
const CODES=['−−·−','·','·−','−'];
const MSG='EAT TEA';
/* step 4: picture code, 1 = black, 0 = white, read row by row */
const PIC=['01010','01010','00000','10001','01110'];
/* step 5: one message sent 3 times down a noisy line; each copy has one beep flipped */
const TRUE='10110',COPIES=['10010','11110','10111'];
const DESC=['A signal lamp and three big keys: short, long and letter gap. Send S O S: three short, three long, three short.',
 'A signal with no gaps: short, short, short, long. Tap the spaces between beeps to put in letter gaps, and read each answer.',
 'Four letters with how often each is used, and four codes. Give each letter a code, most used letter first.',
 'A 5 by 5 grid and five rows of code. 1 means black and 0 means white. Tap each square that should be black.',
 'Three copies of the same message, each with one wrong beep. Choose 1 or 0 for each place.'];
const TXT=['Morse code sends letters as patterns of short and long signals. Send the call for help.',
 'The receiver hears ···− with no gaps. What could it mean?',
 'Short codes make messages quick. Who should get them?',
 'A picture can travel as numbers. Decode this one.',
 'Noise can flip a beep. Sending it three times lets you fix it.'];
const DONE=['S O S sent: ··· −−− ···. Short, long and the gaps between letters together carry the message.',
 'One pattern, many meanings. The gaps are part of the code, so both people must send and expect them.',
 'The most used letters got the shortest codes, just like real Morse: E is ·, T is −, A is ·−, Q is −−·−.',
 'The numbers became a face. Screens and cameras send pictures as patterns of numbers like this.',
 'You fixed every flipped beep by taking what most copies said: 10110.'];
const QS=[{q:'Why does Morse code leave a gap between letters?',a:'So the receiver knows where each letter ends',o:[['To make it sound nicer','gap'],['Gaps are not needed','gap']]},
 {q:'Which letter has the shortest Morse code?',a:'E, the most used letter',o:[['A, the first letter','alpha'],['Z, the last letter','alpha']]},
 {q:'In a picture code, 1 is black and 0 is white. What does the row 10001 look like?',a:'Black at both ends, white in the middle',o:[['White at both ends, black in the middle','flip'],['All five squares black','flip']]},
 {q:'A message came 3 times. One copy has a different beep in one place. What do you trust?',a:'What most of the copies say',o:[['Only the first copy','one'],['Only the last copy','one']]},
 {q:'Your friend flashes a code you never agreed on. What happens?',a:'You cannot be sure what it means',o:[['You understand it anyway','agree'],['The light explains itself','agree']]},
 {q:'How many different patterns of 2 symbols can you make from dot and dash?',a:'4: ··, ·−, −· and −−',o:[['3','count'],['2','count']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif';
function lamp(g,x,y,r,on){g.fillStyle='#475569';g.fillRect(x-r*.35,y+r*.8,r*.7,r*.9);g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=on?'#facc15':'#e2e8f0';g.fill();g.lineWidth=Math.max(2,r*.08);g.strokeStyle='#334155';g.stroke();
 if(on){g.strokeStyle='#f59e0b';g.lineWidth=Math.max(2,r*.07);for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*r*1.2,y+Math.sin(a)*r*1.2);g.lineTo(x+Math.cos(a)*r*1.55,y+Math.sin(a)*r*1.55);g.stroke()}}}
function beep(g,s,x,y,u){g.fillStyle=INK;if(s==='·'){g.beginPath();g.arc(x,y,u*.22,0,7);g.fill()}else if(s==='−'){g.fillRect(x-u*.45,y-u*.15,u*.9,u*.3)}}
function bar(g,x,y,w,h,p,max){g.fillStyle='#e2e8f0';g.fillRect(x,y,w,h);g.fillStyle='#2563eb';g.fillRect(x,y,Math.max(2,w*p/max),h);g.strokeStyle=RIM;g.lineWidth=1;g.strokeRect(x,y,w,h)}
function face(g,x,y,s,grid,cur){const n=5,c=s/n;for(let r=0;r<n;r++)for(let k=0;k<n;k++){const i=r*n+k;g.fillStyle=grid[i]?INK:'#ffffff';g.fillRect(x+k*c,y+r*c,c,c);
  g.strokeStyle=i===cur?'#2563eb':'#94a3b8';g.lineWidth=i===cur?3.5:1;g.strokeRect(x+k*c+(i===cur?2:0),y+r*c+(i===cur?2:0),c-(i===cur?4:0),c-(i===cur?4:0))}}
function PEN(A){const sz=n=>A.narrow?n:Math.round(n*1.12),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(16)}${F}`,L=wrap(t,A.W-34,font),lh=sz(16)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(14)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+6}return y}
 function card(r,word,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#f1f5f9':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(!word)return;
  let n=sz(o.n||16),L;for(;;){L=wrap(word,r.w-10,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-4||n<=11)break;n--}
  c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';const cy=o.top?r.y+n*.9:r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,cy+(i-(L.length-1)/2)*n*1.2))}
 return{wrap,strip,card,sz,fg,dk,INK,F}}
return{CODE,BACK,SOS,RX,read,FREQ,CODES,MSG,PIC,TRUE,COPIES,DESC,TXT,DONE,QS,lamp,beep,bar,face,PEN}})();
