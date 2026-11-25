/* Data and drawings for flagliketerm (collecting like terms; ages 11-12). Sources: CCSS 6.EE.A.3 and 6.EE.A.4 (apply
   the properties of operations to generate equivalent expressions, e.g. y + y + y = 3y; identify when two expressions
   are equivalent); DfE National Curriculum in England, Key Stage 3 algebra ('simplify and manipulate algebraic
   expressions to maintain equivalence by collecting like terms'); NCETM KS3 'Algebraic notation' and 'Like terms'
   guidance (a term's sign belongs to it; x means 1x; like terms have the same letters to the same powers). Slips it
   targets (Kuchemann 1981, CSMS; Booth 1988; MacGregor and Stacey 1997): 'conjoining' 2x + 3y into 5xy or 3p + 2 into
   5p; x + x = x²; treating x and x² as like terms; dropping the sign in front of a term (7m - 3n - 2m as 9m - 3n);
   reading x as 0x so that 4a - a = 4a; thinking ab and ba are different terms. */
const LKT=(()=>{
const KINDS=['x2','x','y','1'],LAB={x2:'x²',x:'x',y:'y','1':'1'},NAME={x2:'x² terms',x:'x terms',y:'y terms','1':'numbers'};
const COL={x2:['#7c3aed','#a78bfa'],x:['#1d4ed8','#60a5fa'],y:['#c2410c','#fb923c'],'1':['#047857','#34d399']};
const MINUS='\u2212';
/* step 1 and 2: one expression, its terms in the order they are written */
const SORT=[[3,'x'],[2,'y'],[1,'x2'],[5,'x'],[4,'1'],[1,'y'],[2,'x2']];
/* step 3: zero pairs. 5x - 2x + y - 4y */
const PAIRS={x:[5,2],y:[1,4]};
/* step 4: a robot's work; ok says whether it is right */
const CLAIMS=[{t:'2x + 3y = 5xy',ok:0,why:'x and y are different unknowns, so 2x + 3y cannot be collected. It stays 2x + 3y.'},
 {t:'4a '+MINUS+' a = 3a',ok:1,why:'Right: a means 1a, so 4a '+MINUS+' 1a = 3a.'},
 {t:'x + x = x²',ok:0,why:'x + x is two lots of x, which is 2x. x² means x × x.'},
 {t:'3p + 2 = 5p',ok:0,why:'2 has no letter, so it is not like 3p. 3p + 2 is already as simple as it gets.'},
 {t:'6m '+MINUS+' 2n '+MINUS+' m = 5m '+MINUS+' 2n',ok:1,why:'Right: 6m '+MINUS+' m = 5m, and '+MINUS+'2n has nothing to collect with.'},
 {t:'7c '+MINUS+' 3d '+MINUS+' 2c = 9c '+MINUS+' 3d',ok:0,why:'The '+MINUS+' belongs to 2c, so it is 7c '+MINUS+' 2c = 5c. The answer is 5c '+MINUS+' 3d.'}];
/* step 5: build the simplified form of 4x + 3 + 2x - 5 + x² - x */
const SRC=[[4,'x'],[3,'1'],[2,'x'],[-5,'1'],[1,'x2'],[-1,'x']];
const DESC=['A term card at the top and four trays below: x² terms, x terms, y terms and numbers. Tap the tray each term belongs in.',
 'The trays from before, with each term drawn as tiles. Tap a tray to collect its terms into one.',
 'Blue x tiles and orange y tiles. Outlined tiles are negative. Tap a negative tile to cancel it with a positive tile of the same kind.',
 'Six pieces of work by a robot. Some are wrong. Tap every one that is wrong.',
 'A long expression on top, and your answer below with dials for x², x and the number. Tap a dial\u2019s top to add 1 or its bottom to take 1.'];
const TXT=['Like terms have the same letters, raised to the same powers. Sort each term into its tray.',
 'Like terms can be added together, just like counting apples. What do 3x and 5x make?',
 'A term\u2019s sign belongs to it. A positive and a negative of the same term cancel out.',
 'Spot the slips. Which of these are wrong?',
 'Collect the terms yourself. The table checks your answer by trying x = 1, 2 and 3.'];
const DONE=['x and x² are different kinds of term, and so are x and y. Numbers only collect with numbers.',
 '3x² + 8x + 3y + 4: four kinds of term, so four terms. Test x = 2, y = 5: both forms give 47.',
 '5x '+MINUS+' 2x + y '+MINUS+' 4y = 3x '+MINUS+' 3y. Each sign stays with its own term.',
 'Only like terms collect, x + x is 2x, and the sign in front of a term moves with it.',
 'x² + 5x '+MINUS+' 2 gives the same value as the long expression for every x you try.'];
const QS=[{q:'Simplify 4a + 3b + 2a',a:'6a + 3b',o:[['9ab','join'],['6a² + 3b','power']]},
 {q:'Simplify x + x + x',a:'3x',o:[['x³','power'],['3 + x','number']]},
 {q:'Simplify 5y '+MINUS+' 2 + 3',a:'5y + 1',o:[['6y','number'],['5y '+MINUS+' 5','sign']]},
 {q:'Simplify 7m '+MINUS+' 3n '+MINUS+' 2m',a:'5m '+MINUS+' 3n',o:[['9m '+MINUS+' 3n','sign'],['2mn','join']]},
 {q:'Are 2x and 2x² like terms?',a:'No, the powers are different',o:[['Yes, both have x','power'],['Yes, both have a 2','join']]},
 {q:'Simplify p '+MINUS+' 4p',a:MINUS+'3p',o:[['3p','sign'],[MINUS+'4p','one']]},
 {q:'Simplify 3ab + 2ba',a:'5ab',o:[['It cannot be simplified','order'],['5a²b²','power']]},
 {q:'Simplify 2x + 5 + 3x '+MINUS+' 1',a:'5x + 4',o:[['9x','number'],['5x + 6','sign']]}];
/* ---------- helpers ---------- */
function fmt(c){let s='';KINDS.forEach(k=>{const v=c[k]||0;if(!v)return;const a=Math.abs(v),body=k==='1'?String(a):(a===1?'':a)+LAB[k];s+=s?(v<0?' '+MINUS+' ':' + ')+body:(v<0?MINUS:'')+body});return s||'0'}
function sum(list){const c={};list.forEach(([n,k])=>c[k]=(c[k]||0)+n);return c}
function val(c,x,y){return(c.x2||0)*x*x+(c.x||0)*x+(c.y||0)*(y||0)+(c['1']||0)}
function term(n,k,first){const a=Math.abs(n),body=k==='1'?String(a):(a===1?'':a)+LAB[k];return first?(n<0?MINUS:'')+body:(n<0?MINUS+' ':'+ ')+body}
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif';
/* a tile: x² a big square, x a long rod, y a shorter rod, 1 a small square; negative tiles are outlined */
function size(k,u){return k==='x2'?[1.6*u,1.6*u]:k==='x'?[.55*u,1.6*u]:k==='y'?[.55*u,1.1*u]:[.55*u,.55*u]}
function tile(A,x,y,k,u,neg){const g=A.ctx,[w,h]=size(k,u),c=COL[k][A.col.dark?1:0];g.lineWidth=2;
 if(neg){g.fillStyle=A.col.dark?'#0f172a':'#ffffff';A.paint.rrect(x,y,w,h,3);g.fill();g.setLineDash([4,3]);g.strokeStyle=c;g.stroke();g.setLineDash([])}else{g.fillStyle=c;A.paint.rrect(x,y,w,h,3);g.fill()}
 if(w>=14){g.font=`800 ${Math.max(10,Math.min(w,h)*.55)}${F}`;g.fillStyle=neg?(A.col.dark?'#f1f5f9':INK):(A.col.dark?'#0f172a':'#ffffff');g.textAlign='center';g.textBaseline='middle';g.fillText((neg?MINUS:'')+LAB[k],x+w/2,y+h/2)}return[w,h]}
function PEN(A){const sz=n=>A.narrow?n:Math.round(n*1.1),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function banner(t,tone,note,bad){const c=g(),font=`800 ${sz(15)}${F}`,L=wrap(t,A.W-34,font),lh=sz(15)*1.3,h=L.length*lh+12;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#f8fafc');A.paint.rrect(8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,14+i*lh));
  let y=8+h+5;if(note){const f2=`700 ${sz(13)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(13)*1.3));y+=L2.length*sz(13)*1.3+5}return y}
 function text(t,x,y,n,col,al){const c=g();c.font=`800 ${sz(n)}${F}`;c.fillStyle=col||fg();c.textAlign=al||'center';c.textBaseline='middle';c.fillText(t,x,y)}
 function box(x,y,w,h,tone){const c=g();c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):tone==='sel'?(dk()?'#1e3a8a':'#dbeafe'):(dk()?'#0f172a':'#ffffff');A.paint.rrect(x,y,w,h,10);c.fill();c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.lineWidth=tone?2:1.2;c.stroke()}
 return{banner,text,box,wrap,sz,fg}}
return{KINDS,LAB,NAME,COL,MINUS,SORT,PAIRS,CLAIMS,SRC,DESC,TXT,DONE,QS,fmt,sum,val,term,size,tile,PEN,OK,NO,RIM,INK}})();
