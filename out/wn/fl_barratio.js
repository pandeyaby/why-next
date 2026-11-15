/* Flagship: bar models for ratios (ages 9–12; NC England Y6 ratio and proportion: solve problems involving unequal
   sharing and grouping using knowledge of fractions and multiples; CCSS 6.RP.A.3 use tape diagrams to solve ratio
   problems). Build the bars for 3 : 2, share a total, scale up from one known part, use a known difference, and pick
   the bar model that matches a story. The box value is set by dragging a slider knob; every drag has a button. */
(()=>{
/* step 5 stories: names, then three candidate models [[boxes row 0, boxes row 1], brace, tag] */
const STORY=[
 {s:'Juice : water = 1 : 4. There is 500 ml of drink in all.',nm:['Juice','Water'],lb:'500 ml',o:[[[1,4],['all'],'ok'],[[1,4],['row',1,0,4],'waterOnly'],[[1,3],['all'],'quarter']]},
 {s:'Tom has 2 cards for every 3 cards Jo has. Jo has 12 cards.',nm:['Tom','Jo'],lb:'12',o:[[[2,3],['all'],'bothBars'],[[3,2],['row',1,0,2],'swapped'],[[2,3],['row',1,0,3],'ok']]},
 {s:'Cats : dogs = 4 : 1 at the rescue centre. There are 9 more cats than dogs.',nm:['Cats','Dogs'],lb:'9',o:[[[4,1],['row',0,0,4],'allCats'],[[4,1],['extra'],'ok'],[[4,1],['all'],'diffTotal']]}];
const TASK={share:{rows:[3,2],nm:['Sam','Ali'],v:4},part:{rows:[3,2],nm:['Sam','Ali'],v:6},diff:{rows:[5,2],nm:['Red','Blue'],v:5}};
VIS.reg('flagbarratio',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',EDGE='#94a3b8',WHITE='#ffffff',GOOD='#047857',BAD='#b91c1c',NAVY='#1e3a8a',TOPF='#bfdbfe',BOTF='#fde68a',KNOB='#b45309',NOTE='#eef2ff',WON='#dcfce7';
const MODE=['build','share','part','diff','story','chal'],mode=()=>MODE[A.step];
const z=n=>Math.round(n*(A.narrow?1:1.1)),font=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function txt(s,x,y,n,col,al){Z.font=font(n);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-14)}
function wrap(s,max,n){Z.font=font(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(r,fill,edge,lw,rad){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,rad==null?9:rad);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function boxText(r,s,n,col){const L=wrap(s,r.w-12,n),lh=z(n)+4;L.forEach((l,i)=>txt(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col))}
function banner(s,ok){const r={x:10,y:8,w:A.W-20,h:A.H*.12};box(r,ok?WON:NOTE,ok?GOOD:NAVY,2);boxText(r,s,13,ok?GOOD:INK)}
function note(){if(!S.msg)return;const L=wrap((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-6;box({x:10,y,w:A.W-20,h},WHITE,S.bad?BAD:GOOD,3);L.forEach((l,i)=>txt(l,A.W/2,y+5+lh*(i+.5),13))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const wrong=s=>{S.bad=true;S.msg=s;A.sound.miss();tell(s);A.redraw()};
const right=s=>{S.bad=false;S.msg=s;A.sound.pop()};
/* bar layout: a label column, then up to 7 equal boxes per bar */
function lay(){const LW=z(52),slots=7,avail=A.narrow?A.W-34-LW:A.W*.6-LW,bw=Math.min(avail/slots,z(58)),bh=z(38),x0=16+LW,y0=A.H*(A.narrow?.2:.24);return{LW,bw,bh,x0,y0,gap:bh+z(28)}}
const rowY=(L,r)=>L.y0+r*L.gap;
function bars(rows,names,val,shownV){const L=lay();rows.forEach((n,r)=>{const y=rowY(L,r);txt(names[r],L.x0-8,y+L.bh/2,13,INK,'right');
  for(let k=0;k<n;k++){const rr={x:L.x0+k*L.bw,y,w:L.bw-3,h:L.bh};box(rr,r?BOTF:TOPF,INK,2,6);txt(shownV?(val||'?'):'',rr.x+rr.w/2,y+L.bh/2,12,INK)}})}
/* braces: ['all'] spans every box of both bars (drawn at the right); ['row',r,a,b] spans boxes a..b-1 of bar r; ['extra'] spans the boxes of bar 0 past the end of bar 1 */
function brace(rows,br,label,L,mini){const m=mini||L;const kind=br[0];Z.strokeStyle=NAVY;Z.lineWidth=2.5;
 if(kind==='all'){const n=Math.max(rows[0],rows[1]),x=m.x0+n*m.bw+6,y1=m.y0,y2=m.y0+m.gap+m.bh;Z.beginPath();Z.moveTo(x,y1);Z.lineTo(x+8,y1);Z.lineTo(x+8,y2);Z.lineTo(x,y2);Z.moveTo(x+8,(y1+y2)/2);Z.lineTo(x+14,(y1+y2)/2);Z.stroke();txt(label,x+16,(y1+y2)/2,mini?10:12,NAVY,'left');return}
 let r,a,b;if(kind==='row'){[,r,a,b]=br}else{r=0;a=rows[1];b=rows[0]}
 const x1=m.x0+a*m.bw,x2=m.x0+b*m.bw-3,y=r===0?m.y0-6:m.y0+m.gap+m.bh+6,d=r===0?-7:7;Z.beginPath();Z.moveTo(x1,y);Z.lineTo(x1,y+d);Z.lineTo(x2,y+d);Z.lineTo(x2,y);Z.stroke();txt(label,(x1+x2)/2,y+d*(mini?1.9:2.2),mini?10:12,NAVY)}
/* slider for the value of one box, 1..12 */
const VMAX=12;function track(){const L=lay(),y=rowY(L,1)+L.bh+z(54),x1=L.x0,x2=L.x0+7*L.bw;return{x1,x2,y}}
const knobX=v=>{const t=track();return t.x1+(v-1)/(VMAX-1)*(t.x2-t.x1)};
function slider(){const t=track();Z.strokeStyle=EDGE;Z.lineWidth=6;Z.lineCap='round';Z.beginPath();Z.moveTo(t.x1,t.y);Z.lineTo(t.x2,t.y);Z.stroke();Z.lineCap='butt';
 for(let v=1;v<=VMAX;v++){const x=knobX(v);Z.fillStyle=SOFT;Z.fillRect(x-1,t.y+7,2,6)}
 const x=knobX(S.v);Z.fillStyle=KNOB;Z.beginPath();Z.arc(x,t.y,z(13),0,7);Z.fill();Z.strokeStyle=WHITE;Z.lineWidth=3;Z.stroke();txt('One box = '+unit(S.v),(t.x1+t.x2)/2,t.y-z(20),12,INK)}
const unit=v=>mode()==='diff'?`${v} bead${v===1?'':'s'}`:`£${v}`;const bx=n=>`${n} box${n===1?'':'es'}`;
function panel(lines){const L=lay();let x,y,w;if(A.narrow){x=A.W*.06;w=A.W*.88;y=TASK[mode()]?track().y+z(26):rowY(L,1)+L.bh+z(18);if(lines.length>2&&TASK[mode()])lines=[lines[0],lines.slice(1).join(' · ')]}else{x=A.W*.64;w=A.W*.33;y=A.H*.24}
 const r={x,y,w,h:z(22)*lines.length+12};box(r,'#f8fafc',EDGE,2);lines.forEach((t,i)=>txt(t,x+w/2,y+6+z(22)*(i+.5),12,INK));return r}
/* step 1: build 3 : 2 */
function drawBuild(){const [a,b]=S.rows,ok=a===3&&b===2;banner(ok?'Sam : Ali = 3 : 2. Five equal boxes; Sam has 3 of the 5.':'Sam gets 3 parts for every 2 parts Ali gets. Tap a bar to add a box.',ok);bars(S.rows,['Sam','Ali'],0,false);
 panel([`Sam : Ali = ${a} : ${b}`,`${a+b} equal boxes in all`,`Sam has ${a}/${a+b} of the total`])}
function addBox(r){S.rows[r]=S.rows[r]>=6?1:S.rows[r]+1;A.sound.tick();const [a,b]=S.rows;
 if(a===3&&b===2){right('3 boxes and 2 boxes make 5. Sam gets 3/5 of the total, not 3/2: the bottom is all 5 boxes.');return refresh()}
 if(a===2&&b===3){S.msg='';return wrong('That is Sam : Ali = 2 : 3. Order matters: the first number is Sam\'s, so Sam needs 3 boxes.')}
 S.bad=false;S.msg=`The ratio is now ${a} : ${b}.`;refresh()}
/* steps 2-4: set the value of one box */
function goalOk(){const t=TASK[mode()];return t&&S.v===t.v}
function setV(v){S.v=Math.max(1,Math.min(VMAX,v));A.sound.tick();judge()}
function judge(){const m=mode(),v=S.v;if(!TASK[m])return refresh();if(goalOk()){if(!S.ready){S.ready=true;
  if(m==='share')right(`5 boxes share £20, so one box is £20 ÷ 5 = £4. Sam gets 3 × £4 = £12 and Ali 2 × £4 = £8. Check: £12 + £8 = £20.`);
  if(m==='part')right(`Sam's 3 boxes are £18, so one box is £18 ÷ 3 = £6. Ali has 2 boxes: £12. Not £17: a ratio multiplies, it never takes off the same amount.`);
  if(m==='diff')right(`The 3 extra red boxes are the 15 more, so one box is 15 ÷ 3 = 5 beads. Red 25, blue 10, and 7 boxes make 35 beads in all.`)}return refresh()}
 S.ready=false;S.bad=false;
 if(m==='share')S.msg=5*v>20?`Too much: 5 boxes × £${v} = £${5*v}, more than £20.`:`5 boxes × £${v} = £${5*v}. The bars must add up to £20.`;
 if(m==='part')S.msg=3*v>18?`Sam's 3 boxes make £${3*v}, more than £18.`:`Sam's 3 boxes make £${3*v}. They must make £18.`;
 if(m==='diff')S.msg=`The 3 extra red boxes hold ${3*v} beads. They must hold 15.`;refresh()}
function drawSet(){const m=mode(),t=TASK[m],ok=S.ready,v=S.v,L=lay();
 const goal={share:'Sam and Ali share £20 in the ratio 3 : 2. Drag the knob until the bars add up to £20.',part:'Sam : Ali = 3 : 2 and Sam gets £18. Drag the knob until Sam\'s bar is £18.',diff:'Red : blue beads = 5 : 2. There are 15 more red than blue. Drag until the extra boxes hold 15.'}[m];
 const done={share:'Total ÷ all the boxes = one box. £20 ÷ 5 = £4.',part:'Known part ÷ its boxes = one box. £18 ÷ 3 = £6.',diff:'Difference ÷ the extra boxes = one box. 15 ÷ 3 = 5.'}[m];
 banner(ok?done:goal,ok);bars(t.rows,t.nm,m==='diff'?String(v):'£'+v,true);
 if(m==='share')brace(t.rows,['all'],'£20',L);if(m==='part')brace(t.rows,['row',0,0,3],'£18',L);if(m==='diff')brace(t.rows,['extra'],'15 more',L);
 slider();
 if(m==='share')panel([`Sam 3 × £${v} = £${3*v}`,`Ali 2 × £${v} = £${2*v}`,`Total £${5*v}`]);
 if(m==='part')panel([`Sam 3 × £${v} = £${3*v}`,`Ali 2 × £${v} = £${2*v}`,`Total £${5*v}`]);
 if(m==='diff')panel([`Red 5 × ${v} = ${5*v}`,`Blue 2 × ${v} = ${2*v}`,`Extra ${3*v} · Total ${7*v}`])}
/* step 5: which bar model? */
const cardR=j=>{if(A.narrow){const h=(A.H*.66)/3-6;return{x:10,y:A.H*.15+j*(h+6),w:A.W-20,h}}const w=(A.W-40)/3;return{x:10+j*(w+10),y:A.H*.3,w,h:A.H*.42}};
function mini(r,o,nm,lb,mark){box(r,mark==='ok'?WON:mark==='bad'?'#fee2e2':WHITE,mark==='ok'?GOOD:mark==='bad'?BAD:EDGE,mark?3.5:2);
 const rows=o[0],bw=Math.min((r.w-z(110))/5,z(26)),bh=Math.max(10,Math.min(z(18),(r.h-48)/2.4)),gap=bh+8,m={x0:r.x+z(50),y0:r.y+16,bw,bh,gap,mini:1};
 rows.forEach((n,i)=>{const y=m.y0+i*gap;txt(nm[i],m.x0-5,y+bh/2,10,INK,'right');for(let k=0;k<n;k++){Z.fillStyle=i?BOTF:TOPF;Z.fillRect(m.x0+k*bw,y,bw-2,bh);Z.strokeStyle=INK;Z.lineWidth=1.5;Z.strokeRect(m.x0+k*bw,y,bw-2,bh)}});
 brace(rows,o[1],lb,null,m)}
function drawStory(){const t=STORY[S.i];banner(t?t.s+' Tap the bar model that fits.':'Ratio = boxes. Total, part or difference = where the bracket goes.',!t);
 if(!t){mini(cardR(1),[[3,2],['all']],['Sam','Ali'],'£20','ok');return}
 t.o.forEach((o,j)=>{const r=cardR(j);mini(r,o,t.nm,t.lb,S.miss===j?'bad':null);txt('ABC'[j],r.x+z(14),r.y+z(14),13,INK)})}
function choose(j){const t=STORY[S.i];if(!t)return;const tag=t.o[j][2];
 if(tag==='ok'){S.i++;S.miss=null;A.sound.tick();right(`Yes, ${'ABC'[j]}: the boxes match the ratio and the bracket sits on what the story gives you.`);return refresh()}S.miss=j;
 const why={waterOnly:'500 ml is all the drink, juice and water together. The bracket must go round every box, not just the water.',
  quarter:'1 : 4 means 1 part juice for every 4 parts water, so 5 boxes. This model has 1 and 3: it shows juice as 1/4 of the drink.',
  bothBars:'12 is only Jo\'s cards, so the bracket goes round Jo\'s 3 boxes, not round both bars.',
  swapped:'Tom comes first in the story, so Tom gets 2 boxes and Jo gets 3. This model swapped them.',
  allCats:'9 is how many MORE cats there are, not the number of cats. Line the bars up: the 3 cat boxes past the dog box make the 9.',
  diffTotal:'9 is the difference, not the total. The bracket goes round the 3 cat boxes that the dog box does not match.'}[tag];
 wrong(why)}
/* pointer */
function down(p){const m=mode(),L=lay();
 if(m==='build'){for(let r=0;r<2;r++){const y=rowY(L,r);if(inR(p,{x:L.x0-L.LW,y:y-6,w:L.LW+7*L.bw,h:L.bh+12})){addBox(r);return true}}return false}
 if(TASK[m]){const t=track();if(Math.abs(p.y-t.y)<z(26)&&p.x>t.x1-z(26)&&p.x<t.x2+z(26)){S.drag=true;move(p);return true}return false}
 if(m==='story'){const j=[0,1,2].find(j=>inR(p,cardR(j)));if(j!=null){choose(j);return true}}return false}
function move(p){if(!S.drag)return;const t=track(),v=Math.round(1+(p.x-t.x1)/(t.x2-t.x1)*(VMAX-1)),nv=Math.max(1,Math.min(VMAX,v));if(nv!==S.v){S.v=nv;A.sound.tick();S.ready=false;S.msg='';A.redraw()}}
function up(){if(!S.drag)return;S.drag=false;judge()}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();if(m==='build')drawBuild();if(TASK[m])drawSet();if(m==='story')drawStory();
 if(m==='chal'){banner('Draw the bars from the ratio. Put the number you know where it belongs. Divide to find one box.');bars([3,2],['Sam','Ali'],'£4',true);brace([3,2],['all'],'£20',lay())}
 note();A.fx.draw(Z)}
function refresh(){const m=mode();let s='Challenge.';
 if(m==='build')s=`Sam's bar has ${bx(S.rows[0])} and Ali's bar has ${bx(S.rows[1])}: the ratio ${S.rows[0]} to ${S.rows[1]}.`;
 if(TASK[m]){const t=TASK[m],v=S.v;s=`${t.nm[0]} bar: ${bx(t.rows[0])} of ${unit(v)}, ${unit(t.rows[0]*v)} in all. ${t.nm[1]} bar: ${bx(t.rows[1])}, ${unit(t.rows[1]*v)}. Total ${unit((t.rows[0]+t.rows[1])*v)}.`}
 if(m==='story'){const t=STORY[S.i];s=t?`${t.s} Models: `+t.o.map((o,j)=>`${'ABC'[j]}: ${t.nm[0]} ${bx(o[0][0])}, ${t.nm[1]} ${bx(o[0][1])}, bracket ${o[1][0]==='all'?'round both bars':o[1][0]==='extra'?'round the extra boxes':'round the '+bx(o[1][3]-o[1][2])+' of '+t.nm[o[1][1]]}`).join('. ')+'.':'All three stories matched.'}
 tell((S.msg?S.msg+' ':'')+s);buttons();S.then()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='build'){b('+ Sam box',()=>addBox(0),'Add a box to Sam\'s bar');b('+ Ali box',()=>addBox(1),'Add a box to Ali\'s bar')}
 if(TASK[m]){b('− One box',()=>setV(S.v-1),'Make one box worth less');b('+ One box',()=>setV(S.v+1),'Make one box worth more')}
 if(m==='story'&&STORY[S.i])['A','B','C'].forEach((t,j)=>b(t,()=>choose(j),`Bar model ${t}`));
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const fresh=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},i:0,rows:[1,1],v:1,ready:false,drag:false,miss:null,msg:'',bad:false})};
const walkTo=t=>{const fs=[];for(let k=S.v;k!==t;k+=t>S.v?1:-1)fs.push(()=>setV(S.v+(t>S.v?1:-1)));return fs.length?fs:[()=>judge()]};
const steps=[
{h:'Build the bars',p:'A ratio says how many equal parts each person gets. Draw one box for each part.',
predict:{q:'Sam and Ali share money in the ratio 3 : 2. What fraction of the money does Sam get?',opts:['3/5','3/2','2/3'],ans:0},
task:'Make Sam : Ali = 3 : 2',show:()=>{steps[0].go();play([()=>addBox(0),()=>addBox(0),()=>addBox(1)],380)},go:()=>{fresh();refresh();S.then=finish(0,()=>S.rows[0]===3&&S.rows[1]===2,'3 : 2 is 5 equal boxes.')}},
{h:'Share a total',p:'Sam and Ali share £20 in the ratio 3 : 2. The bracket shows the £20 covers all 5 boxes.',
predict:{q:'How much does Sam get?',opts:['£12','£10','£6.67'],ans:0},
task:'Make the bars add up to £20',show:()=>{steps[1].go();play(walkTo(4),300)},go:()=>{fresh();refresh();S.then=finish(1,()=>S.ready,'Sam £12, Ali £8.')}},
{h:'One part is known',p:'Same ratio, 3 : 2, but now you only know Sam gets £18. The bracket sits on Sam\'s bar.',
predict:{q:'Sam gets £18. How much does Ali get?',opts:['£12','£17','£9'],ans:0},
task:'Make Sam\'s bar £18',show:()=>{steps[2].go();play(walkTo(6),260)},go:()=>{fresh();refresh();S.then=finish(2,()=>S.ready,'One box £6, Ali £12.')}},
{h:'The difference is known',p:'Red : blue = 5 : 2. Line up the bars: red sticks out by 3 boxes, and those 3 boxes are the 15 extra beads.',
task:'Make the extra boxes hold 15',show:()=>{steps[3].go();play(walkTo(5),260)},go:()=>{fresh();refresh();S.then=finish(3,()=>S.ready,'One box 5, total 35.')}},
{h:'Which bar model?',p:'The ratio sets the boxes. The number in the story goes on the total, on one bar, or on the difference.',
task:'Match 3 stories',show:()=>{steps[4].go();play(STORY.map(t=>()=>choose(t.o.findIndex(o=>o[2]==='ok'))),450)},go:()=>{fresh();refresh();S.then=finish(4,()=>S.i>=STORY.length,'Boxes from the ratio, bracket on what you know.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['Share £35 in the ratio 3 : 4. How much is the bigger share?','£20',[['£15','smaller'],['£8.75','byFour']]],
['Flour : sugar = 5 : 2. You use 300 g of flour. How much sugar?','120 g',[['297 g','takeAway'],['750 g','flipped']]],
['Red : blue = 7 : 3. There are 20 more red beads than blue. How many beads in all?','50',[['20','diffIsTotal'],['35','redOnly']]],
['In the ratio 2 : 3, what fraction of the whole is the first part?','2/5',[['2/3','partOverPart'],['3/5','otherPart']]],
['Boys : girls = 4 : 5 in a class of 27. How many girls?','15',[['12','boys'],['3','oneBox']]],
['Blue : white paint = 1 : 3. You need 2 litres in all. How much blue?','0.5 litres',[['0.67 litres','byThree'],['1 litre','half']]]];
function why(tag){let m='Draw the bars, put your number where it belongs, divide to find one box, then multiply.';
 if(tag==='smaller')m='£15 is the smaller share: 3 boxes of £5. The bigger share is 4 boxes: £20.';
 if(tag==='byFour')m='Divide by all the boxes, not one part: 3 + 4 = 7 boxes, so one box is £35 ÷ 7 = £5, and 4 boxes are £20.';
 if(tag==='takeAway')m='Ratios multiply, they do not take away. 5 boxes = 300 g, so one box = 60 g and sugar is 2 boxes = 120 g.';
 if(tag==='flipped')m='Sugar is the smaller part. One box is 300 ÷ 5 = 60 g, and sugar is 2 boxes: 120 g, not 300 × 5 ÷ 2.';
 if(tag==='diffIsTotal')m='20 is the difference: the 4 extra red boxes. One box is 20 ÷ 4 = 5, and 7 + 3 = 10 boxes make 50.';
 if(tag==='redOnly')m='35 is only the red beads (7 × 5). Add blue, 3 × 5 = 15, to get 50.';
 if(tag==='partOverPart')m='2/3 compares part to part. The whole is 2 + 3 = 5 boxes, so the first part is 2/5.';
 if(tag==='otherPart')m='3/5 is the second part. The first part is 2 of the 5 boxes: 2/5.';
 if(tag==='boys')m='12 is the boys: 4 boxes of 3. Girls are 5 boxes: 15.';
 if(tag==='oneBox')m='3 is one box: 27 ÷ 9. Girls have 5 boxes, so 15.';
 if(tag==='byThree')m='1 : 3 makes 4 parts, not 3. 2 litres ÷ 4 = 0.5 litres of blue.';
 if(tag==='half')m='Half would be a 1 : 1 mix. With 1 : 3, blue is 1 of 4 parts: 0.5 litres.';
 return m}
function ask(){qi++;const [qq,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+qq);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ratio bar lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
