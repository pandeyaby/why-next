/* Flagship: ratio, proportion and per cent vocabulary (ages 9-11; NC Y6 Ratio and proportion). Mix paint cups:
   build 3 : 2 (part-to-part), change it so blue is 1 out of 4 (part-to-whole), shade a hundred grid to turn 3 out of 5
   into 60%, scale 3 : 2 up by a scale factor with the colour as instant proof, and build "twice as much yellow".
   Drag along a row or the grid; every drag has a button twin. */
(()=>{
const MAX=12,BLUE='#2563eb',YEL='#facc15';
VIS.reg('flagratio',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const kind=()=>['ratio','whole','pct','scale','rel','chal'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fg=()=>A.col.tx,soft=()=>A.col.mu;
function write(t,x,y,px,opt){const g=A.ctx,o=opt||{};g.font=`${o.w||800} ${Math.round(px*(A.narrow?1:1.15))}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||fg();g.fillText(t,x,y,o.max||A.W-10)}
/* the colour of a mix: hue walks from blue through green to yellow as the yellow share grows (steepened so a small change in proportion shows) */
function hue(b,y){if(b+y===0)return null;const f=1/(1+Math.exp(-(y/(b+y)-.45)*12));return `hsl(${Math.round(222-172*f)},78%,${Math.round(38+22*f)}%)`}
function rows(){const W=A.W,H=A.H,x0=W*.05,span=W*(kind()==='scale'?.58:.6),cw=span/MAX,h=Math.min(H*.17,46);return{x0,cw,h,b:{y:H*.2},y:{y:H*.2+h+H*.12}}}
function grid(){const s=Math.min(A.H*.84,A.W*.52)/10;return{s,x:A.W*.04,y:(A.H-s*10)/2}}
function pot(x,y,r,fill,lab){const g=A.ctx;g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=fill||A.alpha(fg(),.08);g.fill();g.lineWidth=3;g.strokeStyle=fg();g.stroke();if(lab)write(lab,x,y+r+14,12,{w:700})}
function row(R,n,col,name){const g=A.ctx;for(let i=0;i<MAX;i++){const x=R.x0+i*R.cw;A.paint.rrect(x+1.5,R.yy,R.cw-3,R.h,4);g.fillStyle=i<n?col:A.alpha(fg(),.07);g.fill();g.lineWidth=1.5;g.strokeStyle=A.alpha(fg(),i<n?.7:.3);g.stroke()}
 write(`${name}: ${n} ${n===1?'cup':'cups'}`,R.x0,R.yy-12,13,{al:'left'})}
function drawCups(g,C){const R=rows(),k=kind(),{b,y}=S,tot=b+y;row({...R,yy:R.b.y},b,BLUE,'blue');row({...R,yy:R.y.y},y,YEL,'yellow');
 const pr=Math.min(A.W*(k==='scale'?.075:.1),A.H*.2);
 if(k==='scale'){pot(A.W*.74,A.H*.36,pr,hue(b,y),'your mix');pot(A.W*.91,A.H*.36,pr,hue(3,2),'3 : 2');const same=b*2===y*3&&b>0;write(same?'Same colour':'Not the same colour',A.W*.825,A.H*.64,13,{c:same?fg():C.rd,max:A.W*.32})}
 else pot(A.W*.82,A.H*.38,pr,hue(b,y),tot?'the pot':'empty pot');
 const line1=`blue : yellow = ${b} : ${y}`,line2=tot?`blue is ${b} out of ${tot} cups, yellow is ${y} out of ${tot}`:'the pot is empty';
 write(line1,A.W*.05,A.H*.8,A.narrow?14:16,{al:'left'});write(line2,A.W*.05,A.H*.92,A.narrow?12:14,{al:'left',w:700,c:soft()})}
function drawGrid(g,C){const G=grid();for(let i=0;i<100;i++){const x=G.x+(i%10)*G.s,y=G.y+Math.floor(i/10)*G.s;g.fillStyle=i<S.n?BLUE:A.alpha(fg(),.06);g.fillRect(x+1,y+1,G.s-2,G.s-2)}
 g.lineWidth=2;g.strokeStyle=fg();g.strokeRect(G.x,G.y,G.s*10,G.s*10);
 const rx=G.x+G.s*10+A.W*.05,bw=Math.min((A.W-rx-12)/5,40);write('3 out of 5',rx,A.H*.14,13,{al:'left'});
 for(let i=0;i<5;i++){A.paint.rrect(rx+i*bw+1,A.H*.22,bw-3,bw,5);g.fillStyle=i<3?BLUE:A.alpha(fg(),.07);g.fill();g.strokeStyle=fg();g.lineWidth=1.5;g.stroke()}
 write(`${S.n} out of 100`,rx,A.H*.22+bw+24,A.narrow?15:17,{al:'left',max:A.W-rx-6});write(`= ${S.n}%`,rx,A.H*.22+bw+50,A.narrow?18:22,{al:'left',w:900});
 write('per cent means out of 100',rx,A.H*.9,12,{al:'left',w:700,c:soft(),max:A.W-rx-6})}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);g.fillRect(0,0,W,H);const k=kind();
 if(k==='pct')drawGrid(g,C);else if(k==='chal'){write('Ratio compares part to part: 3 : 2.',W/2,H*.38,15);write('Proportion compares part to whole: 3 out of 5.',W/2,H*.52,14,{c:soft(),w:700});write('Per cent means out of 100: 60%.',W/2,H*.66,14,{c:soft(),w:700})}
 else drawCups(g,C);A.fx.draw(g)}
/* what the learner just built, said in words, with a nudge when it is a known slip */
function note(){const{b,y}=S,k=kind(),t=b+y;let s=`Blue to yellow is ${b} : ${y}. Blue is ${b} out of ${t}.`;
 if(k==='ratio'&&b===2&&y===3)s='That is 2 : 3, two blue for three yellow. The order matters: blue comes first, so you need 3 : 2.';
 if(k==='whole'&&b===1&&y===4)s='That is 1 : 4, so blue is 1 out of 5, not 1 out of 4. Count the whole pot: 1 out of 4 means 1 blue for every 3 yellow.';
 if(k==='scale'&&b===6&&y===5)s='6 : 5 adds 3 to each part. The colour is more yellow than 3 : 2. Ratios scale by multiplying: 3 × 2 = 6, so 2 × 2 = 4.';
 if(k==='scale'&&b===6&&y===4)s='6 : 4 matches. Both parts were multiplied by the scale factor 2, so blue is still 6 out of 10, the same proportion as 3 out of 5.';
 if(k==='rel'&&y===b*2&&t!==9)s=`Twice as much yellow: ${b} : ${y}. Yellow is ${y} out of ${t}, which is 2 out of 3. Now make it 9 cups in all.`;
 say(s)}
function setCups(w,n){const k=kind();if(k==='pct'||k==='chal')return;n=Math.max(0,Math.min(MAX,n));if(S[w]===n)return;S[w]=n;A.sound.tick();note();A.redraw();S.check()}
function setGrid(n){if(kind()!=='pct')return;n=Math.max(0,Math.min(100,n));if(S.n===n)return;S.n=n;A.sound.tick();
 say(n===60?'60 out of 100 squares: 3 out of 5 is the same proportion as 60 out of 100, which is 60%.':n===35?'35 just joins the 3 and the 5. Per cent means out of 100: what is 3 out of 5 out of 100?':`${n} out of 100 squares shaded: ${n}%.`);A.redraw();S.check()}
function at(p){const k=kind();if(k==='pct'){const G=grid(),cx=Math.floor((p.x-G.x)/G.s),cy=Math.floor((p.y-G.y)/G.s);if(cx<0||cx>9||cy<0||cy>9)return;setGrid(cy*10+cx+1);return}
 if(k==='chal')return;const R=rows();for(const w of['b','y']){const top=R[w].y-22;if(p.y>=top&&p.y<=R[w].y+R.h+10&&p.x>=R.x0-10&&p.x<=R.x0+R.cw*MAX+14){setCups(w,Math.round((p.x-R.x0)/R.cw+.45));return}}}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};
 if(k==='pct'){btn('+10',()=>setGrid(S.n+10),'Shade 10 more squares');btn('+1',()=>setGrid(S.n+1),'Shade 1 more square');btn('−1',()=>setGrid(S.n-1),'Unshade 1 square');btn('−10',()=>setGrid(S.n-10),'Unshade 10 squares');return}
 if(k==='chal')return;[['b','blue'],['y','yellow']].forEach(([w,n])=>{btn(`+ ${n}`,()=>setCups(w,S[w]+1),`Add a cup of ${n}`);btn(`− ${n}`,()=>setCups(w,S[w]-1),`Take away a cup of ${n}`)})}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{b:0,y:0,n:0,check:()=>{}},o||{})}
function play(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*260))}
const to=(w,n)=>()=>setCups(w,n);
const steps=[
{h:'Part to part: ratio',p:'A ratio compares one part with another part. 3 cups of blue for every 2 cups of yellow is written 3 : 2 and said "3 to 2". The order matters: blue first means the blue number comes first.',
 predict:{q:'A mix has 3 cups of blue and 2 cups of yellow. How do you write the ratio of blue to yellow?',opts:['3 : 2','3 : 5','2 : 3'],ans:0},task:'Make a mix of 3 cups of blue to 2 cups of yellow',
 show:()=>play(0,[to('b',2),to('b',3),to('y',2)]),
 go:()=>{reset({b:1,y:1});say('1 cup of blue, 1 cup of yellow. Drag along a row, or use the + and − buttons.');controls();S.check=finish(0,()=>S.b===3&&S.y===2,'Blue to yellow is 3 : 2.')}},
{h:'Part to whole: proportion',p:'A proportion compares one part with the whole. In a 3 : 2 mix there are 5 cups in all, so blue is 3 out of 5 of the paint. Always count the whole before you say "out of".',
 predict:{q:'In the 3 : 2 mix, what proportion of the paint is blue?',opts:['3 out of 5','3 out of 2','2 out of 5'],ans:0},task:'Change the mix so blue is 1 out of every 4 cups',
 show:()=>play(1,[to('b',2),to('b',1),to('y',3)]),
 go:()=>{reset({b:3,y:2});say('The pot holds 3 : 2. Change it so that blue is 1 out of 4 of the whole pot.');controls();S.check=finish(1,()=>S.b>0&&S.b*4===S.b+S.y,'Blue is 1 out of 4, so the ratio is 1 : 3.')}},
{h:'Per cent: out of 100',p:'Per cent means "out of 100". To change 3 out of 5 into a per cent, find the same proportion out of 100: 5 × 20 = 100, so 3 × 20 = 60. 3 out of 5 is 60%, the fraction 3/5 and the decimal 0.6.',
 predict:{q:'3 out of 5 cups are blue. What per cent is that?',opts:['60%','35%','30%'],ans:0},task:'Shade the hundred grid to show 3 out of 5 as a per cent',
 show:()=>play(2,[...Array(6)].map((_,j)=>()=>setGrid((j+1)*10))),
 go:()=>{reset({n:0});say('Drag across the hundred grid, or use the buttons, to shade the same proportion as 3 out of 5.');controls();S.check=finish(2,()=>S.n===60,'3 out of 5 = 60 out of 100 = 60%.')}},
{h:'Equivalent ratios and scale',p:'To make more of the same colour, multiply both parts by the same number, the scale factor. 3 : 2 times 2 is 6 : 4, an equivalent ratio. Adding the same amount to each part changes the colour.',
 predict:{q:'To make more 3 : 2 paint, Sam adds 3 cups to each part and gets 6 : 5. Is it the same colour?',opts:['No: multiply both parts by 2 to get 6 : 4','Yes: he added the same to each part','No: it should be 6 : 3'],ans:0},task:'Use 6 cups of blue and match the 3 : 2 colour',
 show:()=>play(3,[to('y',3),to('y',4)]),
 go:()=>{reset({b:6,y:2});say('6 cups of blue, 2 of yellow. Change the yellow until your mix matches the 3 : 2 pot.');controls();S.check=finish(3,()=>S.b===6&&S.y===4,'6 : 4 is equivalent to 3 : 2: scale factor 2.')}},
{h:'Relative size',p:'"Twice as much yellow as blue" is the ratio 1 : 2. For every 1 blue there are 2 yellow, so each group of 3 cups holds 2 yellow. Yellow is 2 out of 3 of the whole pot, however big it is.',
 predict:{q:'There is twice as much yellow as blue. What proportion of the pot is yellow?',opts:['2 out of 3','1 out of 2','2 out of 1'],ans:0},task:'Make 9 cups in all with twice as much yellow as blue',
 show:()=>play(4,[to('b',2),to('b',3),to('y',4),to('y',6)]),
 go:()=>{reset({b:1,y:1});say('Make the pot hold 9 cups, with twice as much yellow as blue.');controls();S.check=finish(4,()=>S.y===S.b*2&&S.b+S.y===9,'3 : 6 is 1 : 2. Yellow is 6 out of 9, which is 2 out of 3.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A fruit bowl has 4 apples and 3 pears. What is the ratio of apples to pears?',[['4 : 3','ok'],['4 : 7','whole'],['3 : 4','order']]],
 ['A fruit bowl has 4 apples and 3 pears. What proportion of the fruit is apples?',[['4 out of 7','ok'],['4 out of 3','ptp'],['3 out of 7','swap']]],
 ['What is 1 out of 4 as a per cent?',[['25%','ok'],['14%','digits'],['4%','four']]],
 ['Paint is mixed 2 : 1. You use 6 cups of the first colour. How many cups of the second?',[['3','ok'],['5','add'],['12','times']]],
 ['Blue to yellow is 1 : 3. What proportion of the pot is blue?',[['1 out of 4','ok'],['1 out of 3','ptp'],['3 out of 4','swap']]],
 ['A photo is enlarged by scale factor 2. A 5 cm line becomes how long?',[['10 cm','ok'],['7 cm','add'],['2.5 cm','down']]],
 ['Which one compares a part with the whole?',[['7 out of 10 children walk to school','ok'],['3 cats for every 2 dogs','ratio'],['Mix flour and water 2 : 1','ratio']]]];
function why(t){let m='Say which two things are compared: part with part is a ratio, part with whole is a proportion.';
 if(t==='whole')m='7 is the whole bowl. A ratio of apples to pears compares the two parts: 4 : 3.';
 if(t==='order')m='The order follows the words: apples first, so the apple number comes first.';
 if(t==='ptp')m='That compares part with part. A proportion is out of the whole, so add the parts first.';
 if(t==='swap')m='That is the other fruit or colour. Check which part the question asks about.';
 if(t==='digits')m='Per cent means out of 100, not the digits side by side. 1 out of 4 = 25 out of 100 = 25%.';
 if(t==='four')m='4% is 4 out of 100, far too small. 4 × 25 = 100, so 1 out of 4 is 25 out of 100.';
 if(t==='add')m='Adding the same amount changes the ratio. Multiply instead: the scale factor keeps the same proportion.';
 if(t==='times')m='The first part went from 2 to 6, times 3. Do the same to the second part: 1 × 3 = 3.';
 if(t==='down')m='Scale factor 2 makes it bigger: multiply by 2, so 5 cm becomes 10 cm.';
 if(t==='ratio')m='"For every" and the colon both compare part with part. That is a ratio, not a proportion.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},box,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let run2=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run2++;A.win()}else{run2=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${run2} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Mixing controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>{at(p);return true},move:p=>at(p),up:()=>{}});controls()}});
A.start()})})();
