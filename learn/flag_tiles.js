/* Flagship: Area by Tiling (ages 8–9; CCSS 3.MD.C.7a "find the area of a rectangle with whole-number side lengths by
   tiling it, and show that the area is the same as would be found by multiplying the side lengths"; NC Y4 area by
   counting squares). Lay rows of unit squares into a 6 by 4 rectangle and watch 6, 12, 18, 24 become 4 × 6; use one
   tiled row and column to multiply instead of count; turn 5 × 3 into 3 × 5; stretch a rectangle to find two with area
   12; double one side and see the area double; tile a 4 m by 3 m room with metre squares and pick m², not m.
   Not flagcover (what area is: gaps, overlaps, half squares, area vs perimeter by counting) or flagarray. */
(()=>{
VIS.reg('flagtiles',c=>{let A,ctl,chal,qn=-1,run=0;const S={};
const MAXC=10,MAXR=6,phase=()=>['lay','mult','turn','twelve','double','room','chal'][A.step];
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function write(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-12)}
const within=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* grid geometry: u is the side of one unit square on screen; the rectangle's top-left corner is fixed at (gx, gy) */
function geo(){const u=Math.floor(Math.min(A.W*.8/MAXC,A.H*.5/MAXR)),gx=Math.round(Math.max(A.W*.13,(A.W-MAXC*u)/2)),gy=Math.round(A.H*.1);return{u,gx,gy}}
const rectBox=()=>{const{u,gx,gy}=geo();return{x:gx,y:gy,w:S.a*u,h:S.b*u}};
const handle=()=>{const r=rectBox();return{x:r.x+r.w,y:r.y+r.h}};
function tileAt(i,j,fill,num){const{u,gx,gy}=geo(),g=A.ctx,x=gx+i*u,y=gy+j*u;g.fillStyle=fill;g.fillRect(x+1.5,y+1.5,u-3,u-3);g.strokeStyle=A.alpha(A.col.tx,.55);g.lineWidth=1;g.strokeRect(x+1.5,y+1.5,u-3,u-3);
 if(num&&u>=24)write(num,x+u/2,y+u/2,Math.min(13,u*.42),{w:700,ink:'#0f172a'})}
function board(){const{u,gx,gy}=geo(),g=A.ctx,C=A.col;g.strokeStyle=A.alpha(C.tx,.13);g.lineWidth=1;
 for(let i=0;i<=MAXC;i++){g.beginPath();g.moveTo(gx+i*u,gy);g.lineTo(gx+i*u,gy+MAXR*u);g.stroke()}for(let j=0;j<=MAXR;j++){g.beginPath();g.moveTo(gx,gy+j*u);g.lineTo(gx+MAXC*u,gy+j*u);g.stroke()}}
/* which unit squares are drawn: 'rows' = the first S.rows rows, 'edge' = first row and first column only, 'all' */
function shape(mode){const r=rectBox(),g=A.ctx,C=A.col,fill=S.room?'#fcd34d':'#7dd3fc';
 for(let j=0;j<S.b;j++)for(let i=0;i<S.a;i++){const on=mode==='all'||(mode==='rows'&&j<S.rows)||(mode==='edge'&&(i===0||j===0));if(on)tileAt(i,j,fill,S.nums?j*S.a+i+1:'')}
 g.strokeStyle=C.tx;g.lineWidth=3;g.strokeRect(r.x,r.y,r.w,r.h);const unit=S.room?' m':'';
 write(S.a+unit,r.x+r.w/2,r.y-A.H*.035,A.narrow?14:16,{w:800});write(S.b+unit,r.x-8,r.y+r.h/2,A.narrow?14:16,{w:800,al:'right'})}
function knob(){const h=handle(),g=A.ctx,C=A.col,R=A.narrow?15:13;g.fillStyle=C.vi;g.beginPath();g.arc(h.x,h.y,R,0,7);g.fill();g.strokeStyle=C.pn;g.lineWidth=3;g.stroke();write('⤡',h.x,h.y+1,R*1.2,{ink:'#fff'})}
const tray=()=>{const{u}=geo(),w=S.a*u*.8;return{x:(A.W-w)/2,y:A.H*.78,w,h:u*.8}};
const CARDS=[['7 + 3','add'],['3 × 7','ok'],['7 + 3 + 7 + 3','perim']];
const cardBox=k=>({x:A.W*(.03+k*.33),y:A.H*.74,w:A.W*.29,h:A.H*.13});
const UNITS=['m','m²'],unitBox=k=>({x:A.W*(.27+k*.26),y:A.H*.76,w:A.W*.2,h:A.H*.12});
function sum(){return S.a+' × '+S.b+' = '+S.a*S.b}
function draw(Q){const C=Q.col,g=Q.ctx,k=phase();g.fillStyle=Q.mix(C.pn,'#e0f2fe',C.dark?.05:.45);g.fillRect(0,0,Q.W,Q.H);
 if(k==='chal'){board();shape(S.mode||'all');Q.fx.draw(g);return}board();const foot=(t,y)=>write(t,Q.W/2,Q.H*(y||.67),Q.narrow?14:16,{w:800,max:Q.W*.94});
 if(k==='lay'){shape('rows');foot(S.rows?`${S.rows} row${S.rows>1?'s':''} of 6 = ${S.rows*6} squares`:'0 squares so far');
  let t=tray();if(S.drag)t={...t,x:S.drag.x-t.w/2,y:S.drag.y-t.h/2};if(S.rows<S.b){const w=t.w/6;for(let i=0;i<6;i++){g.fillStyle='#7dd3fc';g.fillRect(t.x+i*w+1,t.y,w-2,t.h);g.strokeStyle=C.tx;g.strokeRect(t.x+i*w+1,t.y,w-2,t.h)}write('row of 6: drag it up',Q.W/2,t.y+t.h+Q.H*.04,Q.narrow?12:13,{ink:C.mu})}}
 if(k==='mult'){shape(S.full?'all':'edge');foot(S.full?'3 rows of 7 = 3 × 7 = 21':'Every row is the same as the top row');CARDS.forEach(([s,tag],i)=>{const r=cardBox(i);g.fillStyle=S.pick===i?Q.alpha(tag==='ok'?C.gr:C.rd,.3):Q.alpha(C.ac,.16);Q.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();write(s,r.x+r.w/2,r.y+r.h/2,Q.narrow?14:17,{w:900,max:r.w-8})})}
 if(k==='turn'){shape('all');foot(`${S.b} rows of ${S.a} = ${S.a*S.b} squares`);write('Tap the rectangle to turn it',Q.W/2,Q.H*.76,Q.narrow?13:14,{ink:C.mu})}
 if(k==='twelve'||k==='double'){shape('all');knob();foot(`${sum()} square units`);
  const note=k==='twelve'?`Area 12 found: ${S.found.length?S.found.join(' and '):'none yet'}`:'Drag the purple corner to make it 8 long';write(note,Q.W/2,Q.H*.76,Q.narrow?13:14,{ink:C.mu,max:Q.W*.94})}
 if(k==='room'){shape('rows');foot(S.rows<S.b?`${S.rows*4} metre squares laid. Tap the room to lay a row.`:S.unit?`Area = 12 ${S.unit}`:'12 metre squares. Pick the unit.');
  UNITS.forEach((s,i)=>{const r=unitBox(i);g.fillStyle=S.unit===s?Q.alpha(s==='m²'?C.gr:C.rd,.3):Q.alpha(C.am,.18);Q.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();write('12 '+s,r.x+r.w/2,r.y+r.h/2,Q.narrow?17:20,{w:900})})}
 Q.fx.draw(g)}
function reset(o){run++;for(const k in S)delete S[k];Object.assign(S,{a:6,b:4,rows:0,nums:false,room:false,pick:null,full:false,turned:0,found:[],unit:null,drag:null,grab:false,mode:'all',check:()=>{}},o||{})}
const passWhen=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done((typeof msg==='function'?msg():msg)+A.reveal(i))};
function replay(i,acts){steps[i].go();const t=run;acts.forEach((f,j)=>setTimeout(()=>{if(t===run)f()},A.reduced()?25*(j+1):350*(j+1)))}
function layRow(){if(S.rows>=S.b)return;S.rows++;A.sound.pop();const n=S.rows*S.a;
 speak(S.room?`${S.rows} row${S.rows>1?'s':''} of 4 metre squares: ${n}.`:S.rows<S.b?`${S.rows} row${S.rows>1?'s':''} of 6 is ${n} squares.`:`4 rows of 6 is 24. 4 × 6 = 24 square units.`);A.redraw();controls();S.check()}
/* the three calculation cards: feedback names the slip */
function choose(i){S.pick=i;const tag=CARDS[i][1];if(tag==='ok'){S.full=true;A.sound.pop();speak('3 rows of 7. 3 × 7 = 21 square units.')}
 else{A.sound.miss();speak(tag==='add'?'7 + 3 = 10 only adds the two sides. The area is the number of squares inside.':'7 + 3 + 7 + 3 = 20 goes round the edge. That is the perimeter, not the area.')}A.redraw();S.check()}
function turn(){[S.a,S.b]=[S.b,S.a];S.turned++;A.sound.tick();speak(`Now ${S.b} rows of ${S.a}: ${S.a*S.b} squares. ${S.b} × ${S.a} = ${S.a} × ${S.b}.`);A.redraw();S.check()}
function resize(a,b){a=Math.max(1,Math.min(MAXC,a));b=Math.max(1,Math.min(MAXR,b));if(a===S.a&&b===S.b)return;S.a=a;S.b=b;A.sound.tick();const n=a*b;
 if(phase()==='twelve'&&n===12){const key=[Math.min(a,b),Math.max(a,b)].join(' × ');if(!S.found.includes(key)){S.found.push(key);A.sound.pop()}}
 speak(phase()==='double'&&a===8&&b===3?'8 × 3 = 24. That is double 4 × 3 = 12.':`${b} rows of ${a}: ${sum()} square units.`);A.redraw();S.check()}
function pickUnit(s){if(S.rows<S.b){S.unit=null;A.sound.miss();speak('Tile the room first, then name the unit.');A.redraw();return}S.unit=s;
 s==='m²'?A.sound.pop():A.sound.miss();speak(s==='m²'?'12 square metres: 12 m².':'m measures a length. Area counts squares, so the unit is square metres, m².');A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=phase(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='lay'&&S.rows<S.b)b('Lay a row of 6',layRow);
 if(k==='mult')CARDS.forEach(([s],i)=>b(s,()=>choose(i),'Area is '+s));
 if(k==='turn')b('↻ Turn it',turn,'Turn the rectangle on its side');
 if(k==='twelve'||k==='double'){b('Longer →',()=>resize(S.a+1,S.b),'Make it one longer');b('← Shorter',()=>resize(S.a-1,S.b),'Make it one shorter');b('Taller ↓',()=>resize(S.a,S.b+1),'Add a row');b('Less tall ↑',()=>resize(S.a,S.b-1),'Take away a row')}
 if(k==='room'){if(S.rows<S.b)b('Lay a row of metre squares',layRow);UNITS.forEach(s=>b('12 '+s,()=>pickUnit(s),'The area is 12 '+(s==='m'?'metres':'square metres')))}}
function down(p){const k=phase();if(k==='chal')return false;const r=rectBox();
 if(k==='lay'){if(S.rows<S.b&&within(p,tray())){S.drag={x:p.x,y:p.y};return true}if(within(p,r)){layRow();return true}return false}
 if(k==='mult'){const i=[0,1,2].find(j=>within(p,cardBox(j)));if(i!=null){choose(i);return true}return false}
 if(k==='turn'&&within(p,{x:r.x-10,y:r.y-10,w:r.w+20,h:r.h+20})){turn();return true}
 if(k==='twelve'||k==='double'){const h=handle();if(Math.hypot(p.x-h.x,p.y-h.y)<34){S.grab=true;return true}return false}
 if(k==='room'){const i=[0,1].find(j=>within(p,unitBox(j)));if(i!=null){pickUnit(UNITS[i]);return true}if(within(p,r)){layRow();return true}}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw();return}if(S.grab){const{u,gx,gy}=geo();resize(Math.round((p.x-gx)/u),Math.round((p.y-gy)/u))}}
function up(p){S.grab=false;const d=S.drag;S.drag=null;if(d&&p&&p.y<rectBox().y+rectBox().h+geo().u)layRow();A.redraw()}
const steps=[
{h:'Tile it row by row',p:'Cover the 6 by 4 rectangle with unit squares, one row at a time. Drag the row of 6 up into it, or tap the rectangle.',
 predict:{q:'A rectangle is 6 squares long and 4 squares wide. How many unit squares cover it?',opts:['10','20','24'],ans:2},
 task:'Lay all 4 rows',show:()=>replay(0,[layRow,layRow,layRow,layRow]),
 go:()=>{reset({nums:true});speak('An empty rectangle, 6 long and 4 wide.');controls();S.check=passWhen(0,()=>S.rows===4,'4 rows of 6: 6, 12, 18, 24. So 4 × 6 = 24 square units.')}},
{h:'Multiply, do not count',p:'Only the top row and the first column are tiled. Every row is the same as the top row, so you can multiply.',
 predict:{q:'Only one row and one column are tiled. How can you find the area?',opts:['Add the sides: 7 + 3','3 rows of 7: 3 × 7','Tile every square first'],ans:1},
 task:'Pick the calculation that gives the area',show:()=>replay(1,[()=>choose(1)]),
 go:()=>{reset({a:7,b:3});speak('7 long and 3 wide. Only the top row and first column are tiled.');controls();S.check=passWhen(1,()=>S.full,'3 × 7 = 21 square units, without counting one by one.')}},
{h:'Turn it round',p:'Turn the rectangle on its side. The rows become columns, but the same squares cover it.',
 predict:{q:'A 5 by 3 rectangle is turned on its side. What happens to its area?',opts:['It gets bigger','It stays 15','It gets smaller'],ans:1},
 task:'Turn the rectangle',show:()=>replay(2,[turn]),
 go:()=>{reset({a:5,b:3});speak('5 long and 3 wide: 3 rows of 5 is 15.');controls();S.check=passWhen(2,()=>S.turned>0,'3 × 5 = 5 × 3 = 15. Turning it does not change the area.')}},
{h:'Same area, new shape',p:'Drag the purple corner, or use the buttons, to change the sides. Find two different rectangles that each cover 12 squares.',
 predict:{q:'Can two different rectangles both have an area of 12?',opts:['No, only one can','Yes, like 3 × 4 and 2 × 6','Only squares can'],ans:1},
 task:'Make two different rectangles with area 12',show:()=>replay(3,[()=>resize(4,2),()=>resize(4,3),()=>resize(6,3),()=>resize(6,2)]),
 go:()=>{reset({a:2,b:2});speak('A 2 by 2 square. Its area is 4.');controls();S.check=passWhen(3,()=>S.found.length>=2,()=>`${S.found.join(' and ')}: different shapes, both 12 square units.`)}},
{h:'Double one side',p:'This rectangle is 4 by 3, so its area is 12. Stretch it to 8 long and watch what happens to the area.',
 predict:{q:'A 4 by 3 rectangle is made twice as long. What is its new area?',opts:['16: 4 more','24: it doubles','12: it stays the same'],ans:1},
 task:'Make the rectangle 8 long and 3 wide',show:()=>replay(4,[()=>resize(5,3),()=>resize(6,3),()=>resize(7,3),()=>resize(8,3)]),
 go:()=>{reset({a:4,b:3});speak('4 long and 3 wide: area 12.');controls();S.check=passWhen(4,()=>S.a===8&&S.b===3,'8 × 3 = 24, double 12. Each row doubled from 4 to 8 squares.')}},
{h:'Square metres',p:'A room is 4 m long and 3 m wide. Cover it with 1 metre squares, then name the unit. Area is measured in squares.',
 predict:{q:'A room is 4 m long and 3 m wide. What is its area?',opts:['7 m','14 m','12 m²'],ans:2},
 task:'Tile the room, then pick the unit',show:()=>replay(5,[layRow,layRow,layRow,()=>pickUnit('m²')]),
 go:()=>{reset({a:4,b:3,room:true});speak('A room 4 metres long and 3 metres wide. Tap it to lay metre squares.');controls();S.check=passWhen(5,()=>S.rows===3&&S.unit==='m²','3 rows of 4 metre squares: 4 × 3 = 12 m².')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
/* [length, width, what is drawn, wrong options]; every wrong option is a known slip */
const BANK=[[6,4,'edge',['add','perim']],[5,5,'all',['perim','unit']],[8,3,'edge',['shown','add']],[3,7,'edge',['add','unit']],[9,2,'all',['perim','add']],[4,6,'edge',['shown','perim']],[7,5,'edge',['add','shown']]];
function optText(tag,a,b){return tag==='ok'?`${a*b} cm²`:tag==='add'?`${a+b} cm²`:tag==='perim'?`${2*(a+b)} cm`:tag==='shown'?`${a+b-1} cm²`:`${a*b} cm`}
function why(tag,a,b){let m=`Count the rows and how many squares are in each row, then multiply.`;
 if(tag==='add')m=`You added the sides. ${a} + ${b} is not the number of squares inside. ${b} rows of ${a} is ${a} × ${b}.`;
 if(tag==='perim')m=`That is the distance round the edge, the perimeter. Area counts the squares inside: ${a} × ${b}.`;
 if(tag==='shown')m=`You counted only the squares that are drawn. Every row has ${a} squares, and there are ${b} rows.`;
 if(tag==='unit')m=`The number is right, but area is counted in squares, so the unit is cm², not cm.`;
 return m}
function ask(){qn++;const[a,b,mode,bad]=BANK[qn%BANK.length];S.a=a;S.b=b;S.mode=mode;const tags=['ok',...bad],rot=qn%3,order=tags.slice(rot).concat(tags.slice(0,rot));
 chal.innerHTML=`<p><b>Each square is 1 cm². A rectangle is ${a} cm long and ${b} cm wide${mode==='edge'?' (only the edge row and column are drawn)':''}. What is its area?</b></p><div class="fl-pick" role="group" aria-label="Choose the area"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');order.forEach(tag=>{c.el('button',{type:'button',class:'lbtn'},row,optText(tag,a,b)).onclick=()=>mark(tag,a,b)});speak(`Challenge: a ${a} by ${b} rectangle. What is its area?`);A.redraw()}
function mark(tag,a,b){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';if(ok){S.mode='all';A.win()}else A.sound.miss();speak(ok?`Yes: ${a} × ${b} = ${a*b} square centimetres.`:why(tag,a,b));A.redraw();
 fb.innerHTML=(ok?`✓ Yes: ${b} rows of ${a}, ${a} × ${b} = ${a*b} cm².`:'✗ '+why(tag,a,b))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.0,draw,onStep:Q=>{chal.hidden=Q.step!==6;ctl.hidden=Q.step===6;controls()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Tiling controls'},w);chal=c.el('div',{class:'fl-chal'},Q.below);reset();A.gest({down,move,up});controls()}});
A.start()})})();
