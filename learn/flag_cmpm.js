/* Flagship: Comparing and ordering measurements (ages 6–7; NC Y2 Measurement: "compare and order lengths, mass,
   volume/capacity and record the results using >, < and ="). Measure first, then compare the numbers with their units:
   slide a ribbon so it starts at 0 before reading it, write 45 cm > 32 cm, find a small tin heavier than a big box on
   a kitchen scale, pour a tall jug and a wide jug to find they hold the same, order three strings that do not start
   in line, and change 1 m to 100 cm before comparing it with 90 cm.
   Not flagord1k / flagcmp2d (numbers only), flaglenht / flagmass / flagcups (non-standard units) or flagunits. */
(()=>{
VIS.reg('flagcmpm',c=>{let A,ctl,chal,qn=-1,tok=0;const S={};c.fig.classList.add('young');
const stage=()=>['ruler','sym','scale','jug','order','unit','chal'][A.step];
function voice(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function tx(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-10)}
function card(r,fill,lw){const g=A.ctx;g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=lw||1.5;g.stroke()}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* a ruler from 0 to max cm across the canvas; returns the x of a cm mark */
function ruler(y,max){const g=A.ctx,C=A.col,x0=A.W*.06,x1=A.W*.94,cm=v=>x0+(x1-x0)*v/max;
 g.fillStyle=A.mix(C.pn,'#fde68a',C.dark?.25:.7);g.fillRect(x0-6,y,x1-x0+12,A.H*.1);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(x0-6,y,x1-x0+12,A.H*.1);
 const every=max>=100?(A.narrow?20:10):max>30?(A.narrow?10:5):A.narrow?5:1,minor=max>50?5:1;for(let v=0;v<=max;v+=minor){const big=v%(max>50?10:5)===0;g.lineWidth=big?2:1;g.beginPath();g.moveTo(cm(v),y);g.lineTo(cm(v),y+(big?A.H*.045:A.H*.025));g.stroke();if(v%every===0)tx(v,cm(v),y+A.H*.072,A.narrow?11:12,{b:700})}
 tx('cm',x1-4,y-A.H*.02,A.narrow?11:12,{al:'right',ink:C.mu});return cm}
function strip(cm,a,b,y,col,label){const g=A.ctx;g.fillStyle=col;A.paint.rrect(cm(a),y,cm(b)-cm(a),A.H*.05,6);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.2;g.stroke();if(label)tx(label,(cm(a)+cm(b))/2,y-A.H*.03,A.narrow?13:14,{b:800})}
const tiles=()=>['<','=','>'].map((s,i)=>({s,x:A.W*(.17+i*.26)-A.W*.08,y:A.H*.8,w:A.W*.16,h:A.H*.14}));
const gapBox=()=>({x:A.W*.42,y:A.H*.6,w:A.W*.16,h:A.H*.14});
/* the "a ? b" sentence with a gap for the symbol, plus the three symbol tiles */
function sentence(){const C=A.col,r=gapBox();tx(S.la,A.W*.2,r.y+r.h/2,A.narrow?20:26,{b:900});tx(S.lb,A.W*.8,r.y+r.h/2,A.narrow?20:26,{b:900});
 A.ctx.setLineDash(S.sym?[]:[7,6]);card(r,S.sym?A.alpha(S.right?C.gr:C.rd,.3):A.alpha(C.tx,.04));A.ctx.setLineDash([]);if(S.sym&&!S.held)tx(S.sym,r.x+r.w/2,r.y+r.h/2,A.narrow?30:36,{b:900});
 tiles().forEach(t=>{let q=t;if(S.held===t.s)q={...t,x:S.hx-t.w/2,y:S.hy-t.h/2};card(q,A.alpha(C.ac,.22));tx(t.s,q.x+q.w/2,q.y+q.h/2,A.narrow?28:32,{b:900})})}
function drawRuler(){const C=A.col,cm=ruler(A.H*.4,20);strip(cm,S.off,S.off+12,A.H*.31,A.alpha(C.vi,.55),'ribbon');
 tx(S.off===0?'Starts at 0, ends at 12: 12 cm':`Starts at ${S.off}, ends at ${S.off+12}`,A.W/2,A.H*.12,A.narrow?15:17,{b:800});tx('Drag the ribbon so it starts at 0',A.W/2,A.H*.65,A.narrow?13:14,{ink:C.mu})}
function drawSym(){const C=A.col,cm=ruler(A.H*.32,50);strip(cm,0,45,A.H*.1,A.alpha(C.cy,.6),'45 cm');strip(cm,0,32,A.H*.22,A.alpha(C.am,.6),'32 cm');sentence()}
function parcel(i,r){const g=A.ctx,C=A.col;if(i===0){g.fillStyle='#f1c27d';g.fillRect(r.x+r.w*.1,r.y+r.h*.1,r.w*.8,r.h*.64);g.strokeStyle=C.tx;g.strokeRect(r.x+r.w*.1,r.y+r.h*.1,r.w*.8,r.h*.64);tx('🍿 big box',r.x+r.w/2,r.y+r.h*.42,A.narrow?13:15,{ink:'#111827'})}
 else{g.fillStyle='#94a3b8';g.fillRect(r.x+r.w*.38,r.y+r.h*.46,r.w*.24,r.h*.28);g.strokeStyle=C.tx;g.strokeRect(r.x+r.w*.38,r.y+r.h*.46,r.w*.24,r.h*.28);tx('small tin',r.x+r.w/2,r.y+r.h*.3,A.narrow?13:15,{b:800})}}
const thing=i=>({x:A.W*(.04+i*.5),y:A.H*.04,w:A.W*.42,h:A.H*.28});
function drawScale(){const C=A.col,g=A.ctx,cx=A.W/2,cy=A.H*.455,R=Math.min(A.W,A.H)*.125;[0,1].forEach(i=>{const r=thing(i);card(r,S.on===i?A.alpha(C.ac,.25):A.alpha(C.tx,.04),S.on===i?3:1.5);parcel(i,r);if(S.read[i])tx(S.mass[i]+' g',r.x+r.w/2,r.y+r.h*.87,A.narrow?15:17,{b:900})});
 g.fillStyle=A.alpha(C.tx,.06);g.beginPath();g.arc(cx,cy,R,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();for(let v=0;v<=500;v+=100){const a=-Math.PI*1.25+Math.PI*1.5*v/500;g.beginPath();g.moveTo(cx+Math.cos(a)*R*.8,cy+Math.sin(a)*R*.8);g.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);g.stroke();if(v===0||v===500)tx(v,cx+Math.cos(a)*R*.55,cy+Math.sin(a)*R*.55,A.narrow?10:11)}
 const a=-Math.PI*1.25+Math.PI*1.5*S.needle/500;g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*R*.85,cy+Math.sin(a)*R*.85);g.stroke();tx('g',cx,cy+R*.45,A.narrow?11:12,{ink:C.mu});sentence()}
function jug(i,r){const g=A.ctx,C=A.col,w=i?r.w*.6:r.w*.26,h=i?r.h*.4:r.h*.72,x=r.x+(r.w-w)/2,y=r.y+r.h*.9-h,lvl=S.read[i]?0:.85;
 g.fillStyle=A.alpha(C.cy,.45);g.fillRect(x,y+h*(1-lvl),w,h*lvl);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);tx((i?'wide jug':'tall jug')+(S.read[i]?': 500 ml':''),r.x+r.w/2,r.y+r.h*.08,A.narrow?13:15,{b:800})}
function drawJug(){const C=A.col,g=A.ctx;[0,1].forEach(i=>{const r=thing(i);card(r,A.alpha(C.tx,.04));jug(i,r)});
 const x=A.W*.43,y=A.H*.38,w=A.W*.14,h=A.H*.19,f=S.pour/600;g.fillStyle=A.alpha(C.cy,.55);g.fillRect(x,y+h*(1-f),w,h*f);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);
 for(let v=100;v<=600;v+=100){const yy=y+h*(1-v/600);g.beginPath();g.moveTo(x,yy);g.lineTo(x+w*.25,yy);g.stroke();if(v%200===0)tx(v,x+w+4,yy,A.narrow?10:11,{al:'left'})}tx('ml',x+w/2,y-A.H*.02,A.narrow?11:12,{ink:C.mu});sentence()}
const STR=[{n:'red',cm:15,at:9,col:'#ef4444'},{n:'blue',cm:9,at:14,col:'#3b82f6'},{n:'green',cm:22,at:0,col:'#22c55e'}];
const pick=i=>({x:A.W*(.04+i*.32),y:A.H*.42,w:A.W*.28,h:A.H*.12}),seat=k=>({x:A.W*(.04+k*.32),y:A.H*.66,w:A.W*.28,h:A.H*.12});
function drawOrder(){const C=A.col,cm=ruler(A.H*.24,25);STR.forEach((s,i)=>strip(cm,s.at,s.at+s.cm,A.H*(.05+i*.06),s.col));
 STR.forEach((s,i)=>{if(S.seat.includes(i))return;let r=pick(i);if(S.drag&&S.drag.i===i)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};card(r,S.sel===i?A.alpha(C.ac,.35):A.alpha(s.col,.3),S.sel===i?3:1.5);tx(`${s.n} ${s.cm} cm`,r.x+r.w/2,r.y+r.h/2,A.narrow?14:17,{b:900})});
 for(let k=0;k<3;k++){const r=seat(k),i=S.seat[k];A.ctx.setLineDash(i==null?[6,5]:[]);card(r,i==null?A.alpha(C.tx,.04):A.alpha(C.gr,.3));A.ctx.setLineDash([]);tx(['shortest','middle','longest'][k],r.x+r.w/2,r.y-A.H*.025,A.narrow?11:13,{ink:C.mu});if(i!=null)tx(STR[i].cm+' cm',r.x+r.w/2,r.y+r.h/2,A.narrow?16:19,{b:900});if(k<2)tx('<',r.x+r.w+A.W*.02,r.y+r.h/2,A.narrow?18:22,{b:900})}
 tx(S.msg||'Drag a string card to a seat, or tap a card then a seat.',A.W/2,A.H*.9,A.narrow?12:14,{ink:C.mu,max:A.W*.94})}
function drawUnit(){const C=A.col,cm=ruler(A.H*.3,100);strip(cm,0,100,A.H*.08,A.alpha(C.vi,.55),S.conv?'1 m = 100 cm':'1 m');strip(cm,0,90,A.H*.19,A.alpha(C.am,.6),'90 cm');sentence()}
function draw(Q){const C=Q.col,k=stage();Q.ctx.fillStyle=Q.mix(C.pn,'#fef3c7',C.dark?.06:.4);Q.ctx.fillRect(0,0,Q.W,Q.H);
 ({ruler:drawRuler,sym:drawSym,scale:drawScale,jug:drawJug,order:drawOrder,unit:drawUnit}[k]||(()=>{tx('Measure, then compare',Q.W/2,Q.H*.36,Q.narrow?20:26,{b:900});tx('< less than   = same as   > greater than',Q.W/2,Q.H*.55,Q.narrow?13:15,{ink:C.mu})}))();Q.fx.draw(Q.ctx)}
function reset(o){tok++;for(const k in S)delete S[k];Object.assign(S,{off:4,la:'',lb:'',a:0,b:0,sym:null,right:false,held:null,read:[false,false],mass:[150,400],needle:0,on:null,pour:0,seat:[null,null,null],sel:null,drag:null,msg:'',conv:false,ok:()=>{}},o||{})}
const okWhen=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function play(i,acts){steps[i].go();const t=tok;acts.forEach((f,j)=>setTimeout(()=>{if(t===tok)f()},A.reduced()?20*(j+1):300*(j+1)))}
function slide(o){S.off=Math.max(0,Math.min(8,Math.round(o)));voice(S.off?`The ribbon starts at ${S.off} and ends at ${S.off+12}. It is not ${S.off+12} cm long.`:'It starts at 0 and ends at 12, so the ribbon is 12 cm long.');S.off?A.sound.tick():A.sound.pop();A.redraw();S.ok()}
/* pick a symbol; feedback names the slip */
function choose(s){S.sym=s;S.held=null;const want=S.a>S.b?'>':S.a<S.b?'<':'=';S.right=s===want;S.right?A.sound.pop():A.sound.miss();
 if(S.right)voice(`${S.la} ${s} ${S.lb}.`);else if(S.needRead&&!S.read.every(Boolean))voice('Measure both first, then compare.');
 else voice(s==='='?'They are not the same amount. Compare the measurements.':want==='='?'The measurements are the same, so use =.':'The open side faces the bigger amount. Look at the measurements again.');A.redraw();S.ok()}
function weigh(i){S.on=i;S.read[i]=true;A.sound.tick();A.tween(S,{needle:S.mass[i]},A.reduced()?1:500,'out');voice(i?'The small tin is 400 g.':'The big box is only 150 g.');A.redraw();S.ok()}
function pour(i){S.read[i]=true;S.pour=0;A.sound.tick();A.tween(S,{pour:500},A.reduced()?1:600,'out');voice((i?'The wide jug':'The tall jug')+' fills the measuring jug to 500 ml.');A.redraw();S.ok()}
function place(i,k){if(S.seat.includes(i)||S.seat[k]!=null)return;S.sel=null;const want=[1,0,2][k];
 if(i===want){S.seat[k]=i;A.sound.pop();S.msg=S.seat.every(x=>x!=null)?'9 cm < 15 cm < 22 cm':`${STR[i].cm} cm goes here.`}else{A.sound.miss();S.msg=k===2&&i===0?'Red reaches farthest, but it starts at 9. Compare the cm numbers.':`${STR[i].cm} cm is not the ${['shortest','middle','longest'][k]}. Compare the numbers.`}
 voice(S.msg);A.redraw();buttons();S.ok()}
function buttons(){if(!ctl)return;ctl.innerHTML='';const k=stage(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='ruler'){b('◀ Slide left',()=>slide(S.off-1),'Slide the ribbon left');b('Slide right ▶',()=>slide(S.off+1),'Slide the ribbon right')}
 if(k==='scale'){b('Weigh the box',()=>weigh(0));b('Weigh the tin',()=>weigh(1))}
 if(k==='jug'){b('Pour the tall jug',()=>pour(0));b('Pour the wide jug',()=>pour(1))}
 if(k==='unit'&&!S.conv)b('Change 1 m to cm',()=>{S.conv=true;S.la='100 cm';A.sound.tick();voice('1 metre is 100 centimetres.');A.redraw();buttons()});
 if(['sym','scale','jug','unit'].includes(k))['<','=','>'].forEach(s=>b(s,()=>choose(s),'Put '+s+' in the gap'));
 if(k==='order'){if(S.sel==null)STR.forEach((s,i)=>{if(!S.seat.includes(i))b(`${s.n} ${s.cm} cm`,()=>{S.sel=i;voice(`${s.cm} cm picked. Choose a seat.`);A.redraw();buttons()},`Pick the ${s.n} string, ${s.cm} cm`)});
  else['shortest','middle','longest'].forEach((n,k2)=>{if(S.seat[k2]==null)b('Put '+n,()=>place(S.sel,k2),`Put ${STR[S.sel].cm} cm in the ${n} seat`)})}}
function down(p){const k=stage();if(k==='chal')return false;
 if(k==='ruler'){S.grab=p.x;S.grab0=S.off;return true}
 if(k==='scale'&&p.y<A.H*.37){const i=[0,1].find(j=>inside(p,thing(j)));if(i!=null){weigh(i);return true}}
 if(k==='jug'&&p.y<A.H*.37){const i=[0,1].find(j=>inside(p,thing(j)));if(i!=null){pour(i);return true}}
 if(k==='order'){const i=STR.findIndex((_,j)=>!S.seat.includes(j)&&inside(p,pick(j)));if(i>=0){S.drag={i,x:p.x,y:p.y};S.sel=i;A.redraw();return true}const s=[0,1,2].find(j=>inside(p,seat(j)));if(s!=null&&S.sel!=null)place(S.sel,s);return false}
 const t=tiles().find(t=>inside(p,t));if(t&&k!=='order'){S.held=t.s;S.hx=p.x;S.hy=p.y;A.redraw();return true}return false}
function move(p){if(S.grab!=null){slide(S.grab0+(p.x-S.grab)/(A.W*.88/20));return}if(S.held){S.hx=p.x;S.hy=p.y;A.redraw()}if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){S.grab=null;if(S.held){const s=S.held;S.held=null;if(p&&inside(p,{...gapBox(),x:gapBox().x-A.W*.08,w:gapBox().w+A.W*.16,y:gapBox().y-A.H*.08,h:gapBox().h+A.H*.12}))choose(s);else A.redraw();return}
 const d=S.drag;S.drag=null;if(!d||!p){A.redraw();return}const s=[0,1,2].find(j=>inside(p,seat(j)));if(s!=null)place(d.i,s);else{A.redraw();buttons()}}
const steps=[
{h:'Start at 0',p:'Line up the start of the ribbon with 0 on the ruler. Then the number at the end is its length.',
 predict:{q:'A ribbon starts at 4 and ends at 16. How long is it?',opts:['16 cm','12 cm','20 cm'],ans:1},
 task:'Slide the ribbon to start at 0',show:()=>play(0,[()=>slide(2),()=>slide(0)]),
 go:()=>{reset();voice('A ribbon on a ruler. It starts at 4.');buttons();S.ok=okWhen(0,()=>S.off===0,'12 cm. Start at 0, or count the gap from start to end.')}},
{h:'Write it with a symbol',p:'45 cm is longer than 32 cm. > means greater than. The open side faces the bigger amount.',
 predict:{q:'Which symbol makes 45 cm _ 32 cm true?',opts:['<','>','='],ans:1},
 task:'Drag the right symbol into the gap',show:()=>play(1,[()=>choose('>')]),
 go:()=>{reset({la:'45 cm',lb:'32 cm',a:45,b:32});voice('45 cm and 32 cm. Which symbol goes in the gap?');buttons();S.ok=okWhen(1,()=>S.right,'45 cm > 32 cm.')}},
{h:'Weigh, do not guess',p:'Big does not always mean heavy. Weigh both things on the scale, then compare the grams.',
 predict:{q:'Which is heavier: the big box or the small tin?',opts:['The big box','The small tin','They are the same'],ans:1},
 task:'Weigh both, then pick the symbol',show:()=>play(2,[()=>weigh(0),()=>weigh(1),()=>choose('<')]),
 go:()=>{reset({la:'box',lb:'tin',a:150,b:400,needRead:true});voice('A big box and a small tin. Weigh each one.');buttons();S.ok=okWhen(2,()=>S.right&&S.read.every(Boolean),'150 g < 400 g. The small tin is heavier.')}},
{h:'Same amount: =',p:'A tall jug can look like it holds more. Pour each into a measuring jug and read the ml.',
 predict:{q:'Which jug holds more water?',opts:['The tall jug','The wide jug','They hold the same'],ans:2},
 task:'Pour both, then pick the symbol',show:()=>play(3,[()=>pour(0),()=>pour(1),()=>choose('=')]),
 go:()=>{reset({la:'tall',lb:'wide',a:500,b:500,needRead:true});voice('A tall jug and a wide jug. Pour each one.');buttons();S.ok=okWhen(3,()=>S.right&&S.read.every(Boolean),'500 ml = 500 ml. Same capacity, different shapes.')}},
{h:'Order three',p:'These strings do not start in line. Use their lengths in cm to put them in order.',
 predict:{q:'Which string is the longest?',opts:['Red, it reaches farthest','Green, 22 cm','Blue, 9 cm'],ans:1},
 task:'Put the strings in order, shortest first',show:()=>play(4,[()=>place(1,0),()=>place(0,1),()=>place(2,2)]),
 go:()=>{reset();voice('Three strings: red 15 cm, blue 9 cm, green 22 cm.');buttons();S.ok=okWhen(4,()=>S.seat.join()==='1,0,2','9 cm < 15 cm < 22 cm.')}},
{h:'Same units first',p:'To compare 1 m and 90 cm, change 1 m into 100 cm. Then compare 100 and 90.',
 predict:{q:'Which is longer: 1 m or 90 cm?',opts:['90 cm, 90 is more than 1','1 m','They are the same'],ans:1},
 task:'Change to cm, then pick the symbol',show:()=>play(5,[()=>{S.conv=true;S.la='100 cm';A.redraw();buttons()},()=>choose('>')]),
 go:()=>{reset({la:'1 m',lb:'90 cm',a:100,b:90});voice('1 m and 90 cm. Which is longer?');buttons();S.ok=okWhen(5,()=>S.right&&S.conv,'100 cm > 90 cm, so 1 m > 90 cm.')}},
{h:'Challenge',p:'',go:()=>{reset();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const BANK=[['45 cm','32 cm','>',{'<':'flip','=':'same'}],['big box 150 g','small tin 400 g','<',{'>':'size','=':'same'}],['tall jug 500 ml','wide jug 500 ml','=',{'>':'tall','<':'tall'}],
 ['1 m','90 cm','>',{'<':'unit','=':'unit'}],['60 cm','6 cm','>',{'<':'flip','=':'digit'}],['a pencil from 2 to 10 on a ruler','10 cm','<',{'=':'zero','>':'zero'}],['3 kg','5 kg','<',{'>':'flip','=':'same'}]];
function why(tag){let m='Measure both, then compare the numbers and units.';
 if(tag==='flip')m='The symbol points the wrong way. The open side faces the bigger amount.';
 if(tag==='same')m='= means the same amount. These measurements are different.';
 if(tag==='size')m='Big does not mean heavy. Read the grams: the bigger number is heavier.';
 if(tag==='tall')m='Tall does not mean more. Both jugs hold 500 ml, so use =.';
 if(tag==='unit')m='Use the same units first. 1 m is 100 cm, and 100 cm is more than 90 cm.';
 if(tag==='digit')m='Same digit, different amount. 60 cm is ten times as long as 6 cm.';
 if(tag==='zero')m='It did not start at 0. From 2 to 10 is only 8 cm, so it is less than 10 cm.';
 return m}
function nextQ(){qn++;const[a,b,ans,bad]=BANK[qn%BANK.length];chal.innerHTML=`<p><b>${a} ? ${b}</b></p><div class="fl-pick" role="group" aria-label="Choose a symbol"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');['<','=','>'].forEach(s=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Choose '+s},row,s).onclick=()=>grade(s===ans?'ok':bad[s],a,b,ans)});voice(`Challenge: ${a} compared with ${b}`);A.redraw()}
function grade(tag,a,b,ans){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a} ${ans} ${b}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:Q=>{chal.hidden=Q.step!==6;ctl.hidden=Q.step===6;buttons()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Measuring controls'},w);chal=c.el('div',{class:'fl-chal'},Q.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
