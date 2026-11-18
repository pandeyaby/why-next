/* Flagship – two-way tables and relative frequencies (ages 13–15; CCSS 8.SP.4, S-ID.5; GCSE two-way tables). Drop survey
   cards into cells, complete a table from its totals, tap the right denominator (joint vs conditional), drag one row until
   the rows match (no association), and judge links by row percentages, not counts. */
(()=>{
const ROWS=['Year 7','Year 9'],COLS=['Sport','Music'],T=[[18,12],[20,30]];
const rt=r=>T[r][0]+T[r][1],ct=k=>T[0][k]+T[1][k],GT=T[0][0]+T[0][1]+T[1][0]+T[1][1];
/* name, row, column */
const CARDS=[['Ana',0,1],['Ben',1,0],['Cai',1,1],['Dee',0,0],['Eli',1,1],['Fay',0,1],['Gus',1,0],['Hal',1,1]];
/* gap cell [row, col] (col 2 = row total, row 2 = column total), options, why each wrong option is wrong */
const GAPS=[[[0,1],[12,48,18],{48:'You added 18 and 30. The row total already includes 18, so subtract: 30 − 18.',18:'18 is the sport cell. Year 7 music is the rest of the row: 30 − 18.'}],
 [[1,0],[20,56,30],{56:'38 is the sport column total, so subtract Year 7 sport from it: 38 − 18.',30:'30 is Year 9 music. Use the sport column: 38 − 18.'}],
 [[1,2],[50,30,80],{30:'That is just the music cell. The row total adds both cells: 20 + 30.',80:'80 is everyone. The Year 9 row total is 20 + 30.'}],
 [[2,1],[42,38,30],{38:'38 is the sport total. Music adds down its column: 12 + 30.',30:'That is only Year 9. Add Year 7 music too: 12 + 30.'}]];
/* question, numerator cell, the total cell to divide by */
const DEN=[['What fraction of Year 9s prefer music?',[1,1],[1,2]],['What fraction of ALL students are Year 9s who prefer music?',[1,1],[2,2]],
 ['What fraction of sport fans are in Year 7?',[0,0],[2,0]],['What fraction of Year 7s prefer music?',[0,1],[0,2]]];
/* label, rows [[yes,no],[yes,no]] with row names and the yes/no names, linked? */
const JUDGE=[[['Year 7','Year 9'],['Sport','Music'],[[15,15],[25,25]],0],[['Age 13','Age 15'],['Phone','No phone'],[[24,16],[54,6]],1],[['Left-handed','Right-handed'],['Glasses','No glasses'],[[6,14],[24,56]],0]];
VIS.reg('flagtwoway',c=>{let A,pad,cq,qk=-1,epoch=0;
const Z={};
const TXT='#0f172a',RIGHT='#047857',WRONG='#b91c1c',LINE='#64748b',PICK='#1d4ed8',CEL='#ffffff',HEAD='#e0e7ff',TOT='#fef3c7',BLUE='#2563eb',ORNG='#c2410c';
const pz=v=>Math.round(v*(A.narrow?1:1.12)),fo=(v,w)=>`${w||700} ${pz(v)}px system-ui,sans-serif`;
const phase=()=>['sort','fill','den','drag','judge','quiz'][A.step],within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const pct=(a,b)=>Math.round(100*a/b);
function base(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function tag(t,y,ok){const g=A.ctx;let n=15;g.font=fo(n,800);while(g.measureText(t).width+28>A.W-8&&n>10){n--;g.font=fo(n,800)}
 const w=g.measureText(t).width+24,h=pz(n)+14;g.fillStyle=ok?'#d1fae5':CEL;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,6);g.fill();g.lineWidth=ok?2.5:1.5;g.strokeStyle=ok?RIGHT:LINE;g.stroke();
 g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function cellBox(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||CEL;g.fillRect(r.x,r.y,r.w,r.h);g.lineWidth=o.edge?3.5:1.2;g.strokeStyle=o.edge||LINE;g.strokeRect(r.x,r.y,r.w,r.h);
 if(t==null)return;g.fillStyle=o.ink||TXT;g.font=fo(o.n||16,o.w||700);g.textAlign='center';g.textBaseline='middle';g.fillText(String(t),r.x+r.w/2,r.y+r.h/2+1,r.w-6)}
function words(t,y,n){const g=A.ctx;g.font=fo(n||15,600);g.fillStyle=A.col.tx;g.textAlign='center';g.textBaseline='middle';const L=[''];
 t.split(' ').forEach(w=>{const z=L[L.length-1]?L[L.length-1]+' '+w:w;if(g.measureText(z).width>A.W-20)L.push(w);else L[L.length-1]=z});L.forEach((l,k)=>g.fillText(l,A.W/2,y+k*pz(20)));return L.length}
/* 4 x 4 grid: header row/col plus 2 data rows/cols and totals; cell(r,k) uses data indices, -1 for headers */
function grid(y0,hgt){const cw=(A.W-16)/4,ch=hgt||pz(40);return(r,k)=>({x:8+(k+1)*cw,y:y0+(r+1)*ch,w:cw,h:ch})}
function header(G,rows,cols){rows.concat('Total').forEach((t,r)=>cellBox(G(r,-1),t,{bg:HEAD,n:13}));cols.concat('Total').forEach((t,k)=>cellBox(G(-1,k),t,{bg:HEAD,n:13}))}
const val=(r,k)=>r<2&&k<2?T[r][k]:r<2?rt(r):k<2?ct(k):GT;
/* ---- 1: sort survey cards into cells ---- */
const sortCard=()=>({x:A.W/2-pz(90),y:A.H*.08,w:pz(180),h:pz(46)});
function drawSort(){const s=Z.a;base();const G=grid(A.H*.3);header(G,ROWS,COLS);
 const cnt=[[0,0],[0,0]];CARDS.slice(0,s.n).forEach(q=>cnt[q[1]][q[2]]++);
 for(let r=0;r<3;r++)for(let k=0;k<3;k++){const v=r<2&&k<2?cnt[r][k]:r<2?cnt[r][0]+cnt[r][1]:k<2?cnt[0][k]+cnt[1][k]:s.n;cellBox(G(r,k),v,{bg:r===2||k===2?TOT:CEL,edge:s.bad&&s.bad[0]===r&&s.bad[1]===k?WRONG:null})}
 if(s.n>=CARDS.length){tag('All 8 sorted: totals add across and down',A.H*.12,1);return}
 const q=CARDS[s.n],d=Z.drag,r=sortCard();cellBox(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,`${q[0]}: ${ROWS[q[1]]}, ${COLS[q[2]].toLowerCase()}`,{edge:d?PICK:BLUE,n:15});
 words(`Card ${s.n+1} of 8: drop it in its cell`,A.H*.25,13)}
function sortTo(r,k){const s=Z.a;if(s.n>=CARDS.length||r>1||k>1)return;const [nm,qr,qk]=CARDS[s.n];
 if(r!==qr||k!==qk){s.bad=[r,k];A.sound.miss();return say(r!==qr?`${nm} is in ${ROWS[qr]}, so the card goes in the ${ROWS[qr]} row.`:`${nm} chose ${COLS[qk].toLowerCase()}, so it goes in the ${COLS[qk]} column.`)}
 s.n++;s.bad=null;A.sound.pop();say(`${nm}: ${ROWS[qr]} and ${COLS[qk]}. Each person is counted in exactly one cell.`+(s.n>=CARDS.length?' All 8 sorted.':''))}
/* ---- 2: complete the table ---- */
const fOpts=()=>{const w=Math.min(pz(90),(A.W-40)/3),h=pz(48);return[0,1,2].map(j=>({x:A.W/2-(3*w+16)/2+j*(w+8),y:A.H*.78,w,h,j}))};
const gOrder=n=>{const o=GAPS[n][1],r=n%3;return o.slice(r).concat(o.slice(0,r))};
function drawFill(){const s=Z.b;base();const G=grid(A.H*.18),open=GAPS.slice(s.n).map(q=>q[0].join());header(G,ROWS,COLS);
 for(let r=0;r<3;r++)for(let k=0;k<3;k++){const key=[r,k].join(),gap=open.includes(key),cur=s.n<GAPS.length&&GAPS[s.n][0].join()===key;
  cellBox(G(r,k),gap?'?':val(r,k),{bg:r===2||k===2?TOT:CEL,edge:cur?(s.bad?WRONG:PICK):null})}
 if(s.n>=GAPS.length){tag('Table complete: 80 = 30 + 50 = 38 + 42',A.H*.08,1);return}
 tag(`Gap ${s.n+1} of 4: what goes in the blue cell?`,A.H*.08);fOpts().forEach((b,j)=>cellBox(b,gOrder(s.n)[j],{bg:'#ede9fe',ink:'#4c1d95',n:20,w:800}))}
function fillIn(v){const s=Z.b;if(s.n>=GAPS.length)return;const [[r,k],opt,why]=GAPS[s.n];
 if(v!==opt[0]){s.bad=1;A.sound.miss();return say(why[v])}
 s.n++;s.bad=0;A.sound.pop();say(`${v}. Rows add to the row total, columns to the column total.`+(s.n>=GAPS.length?' Table complete.':''))}
/* ---- 3: which total do you divide by? ---- */
function drawDen(){const s=Z.c;base();const G=grid(A.H*.34);header(G,ROWS,COLS);const q=DEN[Math.min(s.n,DEN.length-1)];
 for(let r=0;r<3;r++)for(let k=0;k<3;k++){const num=s.n<DEN.length&&q[1][0]===r&&q[1][1]===k,mis=s.bad&&s.bad[0]===r&&s.bad[1]===k;
  cellBox(G(r,k),val(r,k),{bg:num?'#dbeafe':r===2||k===2?TOT:CEL,edge:mis?WRONG:num?BLUE:null})}
 if(s.n>=DEN.length){tag('All 4: the question says who you divide by',A.H*.08,1);words(s.last||'',A.H*.2,14);return}
 tag(`Question ${s.n+1} of 4: tap the total to divide by`,A.H*.07);words(q[0],A.H*.16,15);if(s.last)words(s.last,A.H*.88,13)}
function den(r,k){const s=Z.c;if(s.n>=DEN.length)return;const [qq,[nr,nk],[dr,dk]]=DEN[s.n],num=val(nr,nk),want=val(dr,dk);
 if(r!==dr||k!==dk){s.bad=[r,k];A.sound.miss();
  return say(r===nr&&k===nk?`${num} is the top of the fraction. Now find the group the question is about.`:r===2&&k===2?`80 is everyone. Dividing by it gives a joint relative frequency, but this question is only about ${dk===2?ROWS[dr]+'s':COLS[dk].toLowerCase()+' fans'}.`:dr===2&&dk===2?`This question is about all students, so divide by the grand total, 80.`:`${val(r,k)} is a different group. The question is about ${dk===2?ROWS[dr]+'s':COLS[dk].toLowerCase()+' fans'}: ${want} people.`)}
 s.n++;s.bad=null;A.sound.pop();s.last=`${num}/${want} = ${(num/want).toFixed(2)}`;say(`${qq} ${num} ÷ ${want} = ${(num/want).toFixed(2)}.`+(s.n>=DEN.length?' All 4 done.':''))}
/* ---- 4: drag Year 9 until the rows match ---- */
const bar=r=>({x:pz(70),y:A.H*(.34+r*.22),w:A.W-pz(70)-14,h:pz(46)});
function drawDrag(){const s=Z.d,g=A.ctx;base();tag(s.won?'No association: 40% in both rows':'Drag the Year 9 bar so the rows match',A.H*.08,s.won);
 words('Share of each year who prefer music',A.H*.2,14);[[12,30],[s.m,50]].forEach(([m,t],r)=>{const b=bar(r),f=m/t;
  g.fillStyle=A.col.dark?'#334155':'#e2e8f0';g.fillRect(b.x,b.y,b.w,b.h);g.fillStyle=ORNG;g.fillRect(b.x,b.y,b.w*f,b.h);g.strokeStyle=r&&Z.drag?PICK:LINE;g.lineWidth=r?2.5:1.2;g.strokeRect(b.x,b.y,b.w,b.h);
  g.fillStyle=A.col.tx;g.font=fo(13,800);g.textAlign='right';g.textBaseline='middle';g.fillText(ROWS[r],b.x-6,b.y+b.h/2);
  g.fillStyle=CEL;A.paint.rrect(b.x+6,b.y+b.h/2-pz(11),pz(108),pz(22),5);g.fill();g.fillStyle=TXT;g.textAlign='left';g.font=fo(13,800);g.fillText(`${m}/${t} = ${pct(m,t)}%`,b.x+10,b.y+b.h/2+1);
  if(r){g.fillStyle=PICK;g.fillRect(b.x+b.w*f-3,b.y-6,6,b.h+12)}});
 const x=bar(0).x+bar(0).w*.4;g.setLineDash([5,4]);g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(x,bar(0).y-8);g.lineTo(x,bar(1).y+bar(1).h+8);g.stroke();g.setLineDash([]);
 words(`Year 9 music count: ${s.m}`,A.H*.86,14)}
function setM(m,final){const s=Z.d;s.m=Math.max(0,Math.min(50,m));if(!final){A.redraw();return}
 if(s.m===20){s.won=1;A.sound.pop();return say('20 of 50 is 40%, the same as 12 of 30. The rows match, so year group and music are not associated here, even though 20 is more than 12.')}
 s.won=0;say(`${s.m} of 50 is ${pct(s.m,50)}%. Year 7 is 40%. ${s.m>20?'Year 9s are now more likely to prefer music':'Year 9s are now less likely to prefer music'}, so there is still a link. Match the percentage, not the count.`)}
function dragAt(p){const b=bar(1);return Math.round(50*Math.max(0,Math.min(1,(p.x-b.x)/b.w)))}
/* ---- 5: linked or not? ---- */
const jBtns=()=>{const w=Math.min(pz(150),(A.W-36)/2),h=pz(50);return['Linked','Not linked'].map((t,j)=>({x:A.W/2+(j?8:-w-8),y:A.H*.8,w,h,t,j}))};
function drawJudge(){const s=Z.e;base();if(s.n>=JUDGE.length){tag('All 3 judged by row percentages',A.H*.08,1);JUDGE.forEach((q,i)=>tag(`${q[0][0]} ${pct(q[2][0][0],q[2][0][0]+q[2][0][1])}% vs ${q[0][1]} ${pct(q[2][1][0],q[2][1][0]+q[2][1][1])}%: ${q[3]?'linked':'not linked'}`,A.H*(.26+i*.17),1));return}
 const [rows,cols,d]=JUDGE[s.n],G=grid(A.H*.2,pz(44));tag(`Table ${s.n+1} of 3: is there an association?`,A.H*.07);
 rows.forEach((t,r)=>cellBox(G(r,-1),t,{bg:HEAD,n:12}));cols.forEach((t,k)=>cellBox(G(-1,k),t,{bg:HEAD,n:12}));cellBox(G(-1,2),'Total',{bg:HEAD,n:12});
 d.forEach((row,r)=>{row.forEach((v,k)=>cellBox(G(r,k),v));cellBox(G(r,2),row[0]+row[1],{bg:TOT})});
 if(s.hint)words(s.hint,A.H*.6,13);jBtns().forEach(b=>cellBox(b,b.t,{bg:'#ede9fe',ink:'#4c1d95',n:17,w:800,edge:s.bad===b.j?WRONG:null}))}
function judge(j){const s=Z.e;if(s.n>=JUDGE.length)return;const [rows,cols,d,link]=JUDGE[s.n],p=d.map(r=>pct(r[0],r[0]+r[1])),line=`${cols[0]}: ${rows[0]} ${p[0]}%, ${rows[1]} ${p[1]}%.`;
 if((j===0)!==!!link){s.bad=j;A.sound.miss();s.hint=line;return say(link?`${line} Very different percentages, so there is an association.`:`${line} The counts differ only because the groups differ in size. Same percentage, no association.`)}
 s.n++;s.bad=null;s.hint='';A.sound.pop();say(`${line} ${link?'Linked':'Not linked'}.`+(s.n>=JUDGE.length?' All 3 judged.':''))}
function draw(){const k=phase();if(k==='quiz'){base();tag('Challenge',A.H*.25,1);tag('joint: ÷ grand total',A.H*.5);tag('conditional: ÷ row or column total',A.H*.66);return}
 ({sort:drawSort,fill:drawFill,den:drawDen,drag:drawDrag,judge:drawJudge})[k]();A.fx.draw(A.ctx)}
function hitCell(p,G){for(let r=0;r<3;r++)for(let k=0;k<3;k++)if(within(p,G(r,k)))return[r,k];return null}
function down(p){const k=phase();
 if(k==='sort'&&Z.a.n<CARDS.length){if(within(p,sortCard())){Z.drag={x:p.x,y:p.y};return true}const h=hitCell(p,grid(A.H*.3));if(h)sortTo(h[0],h[1]);return false}
 if(k==='fill'&&Z.b.n<GAPS.length){const b=fOpts().find(r=>within(p,r));if(b)fillIn(gOrder(Z.b.n)[b.j]);return false}
 if(k==='den'&&Z.c.n<DEN.length){const h=hitCell(p,grid(A.H*.34));if(h)den(h[0],h[1]);return false}
 if(k==='drag'){const b=bar(1);if(within(p,{x:b.x-10,y:b.y-16,w:b.w+20,h:b.h+32})){Z.drag={};setM(dragAt(p));return true}return false}
 if(k==='judge'&&Z.e.n<JUDGE.length){const b=jBtns().find(r=>within(p,r));if(b)judge(b.j)}return false}
function move(p){if(!Z.drag)return;if(phase()==='drag')setM(dragAt(p));else{Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}}
function up(p){const d=Z.drag;if(!d)return;Z.drag=null;const k=phase();
 if(k==='drag')return setM(dragAt(p),1);
 if(k==='sort'){const h=hitCell(p,grid(A.H*.3));if(h)sortTo(h[0],h[1]);else A.redraw()}}
function zero(){epoch++;for(const k in Z)delete Z[k];Object.assign(Z,{a:{n:0},b:{n:0},c:{n:0},d:{m:30,won:0},e:{n:0},drag:null,gate:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();Z.gate()}
function begin(i,desc,ok,msg){zero();say(desc);Z.gate=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=phase(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='sort'&&Z.a.n<CARDS.length)for(let r=0;r<2;r++)for(let q=0;q<2;q++)b(`${ROWS[r]}, ${COLS[q]}`,()=>sortTo(r,q),`Put the card in ${ROWS[r]}, ${COLS[q]}`);
 if(k==='fill'&&Z.b.n<GAPS.length)gOrder(Z.b.n).forEach(v=>b(String(v),()=>fillIn(v),`The gap is ${v}`));
 if(k==='den'&&Z.c.n<DEN.length)[[0,2],[1,2],[2,0],[2,1],[2,2]].forEach(([r,q])=>b(`÷ ${val(r,q)}`,()=>den(r,q),`Divide by ${r===2&&q===2?'the grand total':r===2?COLS[q]+' total':ROWS[r]+' total'}, ${val(r,q)}`));
 if(k==='drag'){[[-5,'−5'],[-1,'−1'],[1,'+1'],[5,'+5']].forEach(([d,t])=>b(t,()=>setM(Z.d.m+d,1),`Year 9 music ${t}`))}
 if(k==='judge'&&Z.e.n<JUDGE.length)['Linked','Not linked'].forEach((t,j)=>b(t,()=>judge(j)))}
const steps=[
{h:'Build the table',p:'Each person goes in one cell: their row (year) and their column (choice). Totals add across each row and down each column. Drag each card to its cell.',task:'Sort all 8 cards',
show:()=>demo(0,CARDS.map(q=>()=>sortTo(q[1],q[2])),450),
go:()=>begin(0,'Ana: Year 7, music. Drag the card into its cell.',()=>Z.a.n>=CARDS.length,'Every person is in exactly one cell, so the cells add up to the grand total.')},
{h:'Fill the gaps',p:'80 students were asked. A row total is the sum of its row; a column total is the sum of its column. Use them to find each missing number.',
predict:{q:'Year 7 total is 30 and Year 7 sport is 18. Year 7 music is…',opts:['48','12'],ans:1},task:'Fill all 4 gaps',
show:()=>demo(1,GAPS.map(q=>()=>fillIn(q[1][0])),600),
go:()=>begin(1,'Gap 1: Year 7 music. Row total 30, sport 18.',()=>Z.b.n>=GAPS.length,'Subtract from a total to find a missing cell.')},
{h:'Joint or conditional?',p:'A relative frequency is a cell divided by a total. Joint: divide by everyone (80). Conditional: divide by the row or column the question is about.',
predict:{q:'What fraction of Year 9s prefer music? Divide 30 by…',opts:['80, everyone','50, the Year 9s'],ans:1},task:'Answer all 4',
show:()=>demo(2,DEN.map(q=>()=>den(q[2][0],q[2][1])),600),
go:()=>begin(2,'What fraction of Year 9s prefer music? Tap the total to divide by.',()=>Z.c.n>=DEN.length,'"Of the Year 9s" means divide by the Year 9 total.')},
{h:'Is there a link?',p:'Two variables are associated if the row percentages differ. Year 7: 12 of 30 prefer music. Drag the Year 9 bar until the two rows show no association.',
predict:{q:'30 Year 9s prefer music but only 12 Year 7s. Does that alone show Year 9s are more likely to?',opts:['Yes, 30 is more','No, compare percentages'],ans:1},task:'Make the rows match',
show:()=>{steps[3].go();const me=epoch;[25,22,20].forEach((m,j)=>setTimeout(()=>{if(me===epoch)setM(m,j===2)},300*(j+1)))},
go:()=>begin(3,'Year 9 music is 30 of 50, 60%. Year 7 is 40%. Drag the Year 9 bar.',()=>Z.d.won,'Same percentage in each row means no association.')},
{h:'Judge the link',p:'Groups often differ in size, so compare percentages, not counts. Decide if each table shows an association.',task:'Judge all 3 tables',
show:()=>demo(4,JUDGE.map(q=>()=>judge(q[3]?0:1)),650),
go:()=>begin(4,'Table 1: Year 7 and Year 9, sport and music. Linked or not linked?',()=>Z.e.n>=JUDGE.length,'An association is not a cause: it only says the percentages differ.')},
{h:'Challenge',p:'',go:()=>{zero();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.gate()});
const QS=[
{q:'18 of the 30 Year 7s walk to school. There are 80 students. What is the relative frequency of walking among Year 7s?',a:'0.6',o:[['0.225','joint'],['0.375','margin']]},
{q:'A table shows 40% of boys and 40% of girls play chess. More boys were asked. Is there an association?',a:'No',o:[['Yes, more boys play','counts'],['Yes, the counts differ','counts']]},
{q:'35 of 50 dog owners walk daily; 10 of 50 non-owners do. Which statement is justified?',a:'Owning a dog is associated with walking daily',o:[['Owning a dog makes people walk','cause'],['No link: both groups are 50','size']]},
{q:'A row total is 45 and one cell in it is 17. What is the other cell?',a:'28',o:[['62','add'],['17','copy']]},
{q:'30 of the 80 students are Year 9s who prefer music. What is the joint relative frequency?',a:'0.375',o:[['0.6','cond'],['30','count']]}];
function fix(t){let m='Find the right cell, then divide by the total the question names.';
 switch(t){case 'joint':m='18 ÷ 80 is the joint relative frequency. "Among Year 7s" means divide by 30.';break;
 case 'margin':m='30 ÷ 80 is the share who are Year 7. Divide the walkers by the Year 7 total.';break;
 case 'counts':m='Equal percentages mean no association, whatever the counts.';break;
 case 'cause':m='A table shows association, not cause. Maybe people who walk choose to get dogs.';break;
 case 'size':m='Equal group sizes say nothing about a link. Compare 70% with 20%.';break;
 case 'add':m='The row total already includes 17, so subtract: 45 − 17.';break;
 case 'copy':m='The two cells add to 45, so the other is 45 − 17.';break;
 case 'cond':m='0.6 is 30 ÷ 50, the share of Year 9s. Joint means divide by everyone: 30 ÷ 80.';break;
 case 'count':m='A relative frequency is a share, so divide the count by the total.';break}
 return m}
function ask(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+fix(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':fix(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{cq.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Two-way table buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);zero();A.gest({down,move,up});keys()}}).start()})})();
