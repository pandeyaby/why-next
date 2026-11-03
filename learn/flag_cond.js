/* Flagship – conductors and insulators (ages 8–9): close a gap in a battery-and-bulb circuit with a steel key, drag six
   everyday objects into the gap and record which light the bulb, test a shiny plastic bead against a dull iron nail, clip
   onto a wire's plastic coat and then its stripped copper end, and choose the right material for parts of a cable and plug.
   The Challenge targets the usual slips: thinking shiny means conductor, that hard or heavy things conduct, that a wire
   conducts wherever you touch it, that the plastic coat helps electricity flow, and blaming the battery for an insulator. */
(()=>{const KEY=[['steel key',1]],SIX=[['steel paper clip',1],['plastic spoon',0],['aluminium foil',1],['rubber band',0],['wooden lolly stick',0],['coin',1]],
SHINY=[['shiny plastic bead',0],['dull iron nail',1]],
USES=[['The core of a cable, which carries the electricity',[['copper',1],['plastic',0],['wood',0]]],['The outside case of a plug',[['plastic',1],['steel',0],['copper',0]]],['The handle of an electrician\u2019s screwdriver',[['rubber',1],['steel',0],['aluminium',0]]]];
VIS.reg('flagcond',c=>{let A,ctl,chal,qi=-1,streak=0;
const S={};
const view=()=>['key','six','shiny','wire','use','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1:1.15));
function word(g,s,x,y,n,wt,al,mw){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,mw||A.W-10)}
function box(g,r,col,a,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=warn?4:2;g.strokeStyle=warn?A.col.rd:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* circuit loop: cell on the left, bulb on top, a gap with two clips in the bottom wire */
const loop=()=>({x:A.W*(A.narrow?.1:.2),y:A.H*.17,w:A.W*(A.narrow?.8:.6),h:A.H*.38});
const gap=()=>{const L=loop(),cx=L.x+L.w/2,gw=Math.min(A.W*.13,70);return{x:cx-gw,y:L.y+L.h-18,w:2*gw,h:36,cx,cy:L.y+L.h}};
const tiles=()=>S.items.map((_,i,a)=>{const n=a.length,cols=Math.min(3,n),w=(A.W-20-(cols-1)*8)/cols,row=Math.floor(i/cols);return{x:10+(i%cols)*(w+8),y:A.H*(.64+row*.15),w,h:A.H*.12}});
function circuit(g,lit){const C=A.col,L=loop(),G=gap(),on=lit===1;g.lineWidth=4;g.strokeStyle=C.tx;g.lineCap='round';
 const bx=L.x+L.w/2,by=L.y,br=Math.min(A.H*.075,26);
 g.beginPath();g.moveTo(G.x,G.cy);g.lineTo(L.x,G.cy);g.lineTo(L.x,L.y);g.lineTo(bx-br,by);g.moveTo(bx+br,by);g.lineTo(L.x+L.w,L.y);g.lineTo(L.x+L.w,G.cy);g.lineTo(G.x+G.w,G.cy);g.stroke();
 /* cell */const cy=L.y+L.h/2,cw=Math.min(A.W*.06,26),ch=Math.min(A.H*.2,70);g.fillStyle=A.alpha(C.gr,.35);g.fillRect(L.x-cw/2,cy-ch/2,cw,ch);g.lineWidth=2;g.strokeRect(L.x-cw/2,cy-ch/2,cw,ch);g.fillStyle=C.tx;g.fillRect(L.x-cw/4,cy-ch/2-6,cw/2,6);
 word(g,'+',L.x+cw/2+px(8),cy-ch/2+4,13,800);word(g,'battery',L.x+cw/2+px(6),cy+ch/2+px(10),11,700,'left');
 /* bulb */if(on){g.fillStyle=A.alpha(C.am,.35);g.beginPath();g.arc(bx,by,br*1.6,0,7);g.fill();g.lineWidth=3;g.strokeStyle=C.am;for(let k=0;k<8;k++){const a=k*Math.PI/4;g.beginPath();g.moveTo(bx+Math.cos(a)*br*1.3,by+Math.sin(a)*br*1.3);g.lineTo(bx+Math.cos(a)*br*1.6,by+Math.sin(a)*br*1.6);g.stroke()}}
 g.fillStyle=on?A.alpha(C.am,.9):A.alpha(C.pn,.9);g.beginPath();g.arc(bx,by,br,0,7);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();g.beginPath();g.moveTo(bx-br*.5,by+br*.3);g.lineTo(bx-br*.2,by-br*.3);g.lineTo(bx+br*.2,by+br*.3);g.lineTo(bx+br*.5,by-br*.3);g.stroke();
 word(g,on?'bulb ON':'bulb off',bx+br*1.75,by-br*.9,12,800,'left');
 /* clips */[G.x,G.x+G.w].forEach(x=>{g.fillStyle=A.alpha(C.rd,.5);g.beginPath();g.arc(x,G.cy,7,0,7);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke()})}
function thing(g,name,x,y,w){const h=px(26);box(g,{x:x-w/2,y:y-h/2,w,h},A.col.vi,.22,false);word(g,name,x,y,11,800)}
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'Conductors let electricity through',W/2,H*.3,16,800);word(g,'Most are metals',W/2,H*.48,15,700);word(g,'Insulators block it: plastic, rubber, wood',W/2,H*.66,14,700);return}
 const G=gap();
 if(v==='wire'){circuit(g,S.lit);const y=G.cy,x0=G.x-6,x1=G.x+G.w+6;g.lineCap='butt';
  g.lineWidth=14;g.strokeStyle=A.alpha(C.vi,.75);g.beginPath();g.moveTo(x0,y);g.lineTo(S.strip?x1-px(26):x1,y);g.stroke();
  if(S.strip){g.lineWidth=5;g.strokeStyle=C.or;g.beginPath();g.moveTo(x1-px(28),y);g.lineTo(x1,y);g.stroke()}
  word(g,S.strip?'copper showing':'plastic coat',G.cx,y+px(22),12,800);
  word(g,S.lit===1?'Clip on the copper: the bulb lights!':S.lit===0?'Clip on the coat: no light':'Clip the wire into the gap',W/2,H*.7,14,800);
  const r=wireBtns();box(g,r[0],C.vi,.14,S.oops===0);word(g,'Clip on the coat',r[0].x+r[0].w/2,r[0].y+r[0].h/2,12,800);box(g,r[1],C.or,.14,false);word(g,'Strip it, then clip',r[1].x+r[1].w/2,r[1].y+r[1].h/2,12,800);A.fx.draw(g);return}
 if(v==='use'){const k=Math.min(S.round,USES.length-1),[q,ops]=USES[k];
  word(g,S.round<USES.length?q:'All 3 parts chosen!',W/2,H*.12,13,800);if(S.round<USES.length){word(g,'Which material?',W/2,H*.24,12,600);
   ops.forEach(([o],i)=>{const r=useR(i);box(g,r,C.cy,.14,S.oops===o);word(g,o,r.x+r.w/2,r.y+r.h/2,15,800)})}
  word(g,'Conductor where electricity must flow. Insulator where hands touch.',W/2,H*.9,11,700);A.fx.draw(g);return}
 circuit(g,S.lit);
 if(S.inGap!=null)thing(g,S.items[S.inGap][0],G.cx,G.cy,Math.min(W*.3,150));
 tiles().forEach((r,i)=>{const[n,ok]=S.items[i],t=S.tested[i];box(g,r,t==null?C.vi:t?C.am:C.mu,t==null?.12:.25,false);word(g,n,r.x+r.w/2,r.y+r.h*.36,11,800,0,r.w-6);word(g,t==null?'not tested':t?'lights: conductor':'off: insulator',r.x+r.w/2,r.y+r.h*.72,10,700,0,r.w-6)});
 if(S.drag)thing(g,S.items[S.drag.i][0],S.drag.x,S.drag.y,Math.min(W*.3,150));
 word(g,v==='key'?'Drag the key into the gap':`Tested ${Object.keys(S.tested).length} of ${S.items.length}. Drag one into the gap.`,W/2,H*.97,11,700);
 A.fx.draw(g)}
const useR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.36,w,h:A.H*.2}};
const wireBtns=()=>{const w=(A.W-30)/2;return[{x:10,y:A.H*.8,w,h:A.H*.13},{x:20+w,y:A.H*.8,w,h:A.H*.13}]};
const bad=(t,mark)=>{S.oops=mark;A.sound.miss();tell(t);A.redraw()},good=t=>{S.oops=null;A.sound.pop();tell(t);pad();A.redraw();S.want()};
/* steps 0-2: put object i in the gap */
function test(i){const[n,ok]=S.items[i];S.inGap=i;S.lit=ok;S.tested[i]=ok;A.sound.tick();
 const all=Object.keys(S.tested).length>=S.items.length;
 const msg=ok?`The ${n} lets electricity through. The bulb lights. It is a conductor.`:`The ${n} blocks electricity. The bulb stays off. It is an insulator.`;
 if(all)return good(msg+(view()==='shiny'?' Shiny or dull does not decide it. Metal does.':view()==='six'?' The metal things all lit the bulb.':''));tell(msg);pad();A.redraw()}
/* step 3 */
function clip(strip){if(strip){S.strip=1;S.lit=1;S.tried=1;return good('Stripped. The copper core touches the clip and the bulb lights. Copper is a conductor.')}
 S.lit=0;S.oops=null;A.sound.miss();tell('The clip touches only the plastic coat. Plastic is an insulator, so the bulb stays off.');pad();A.redraw()}
/* step 4 */
function pickUse(o){if(S.round>=USES.length)return;const[q,ops]=USES[S.round],ok=ops.find(x=>x[0]===o)[1];
 if(!ok){const want=S.round===0;return bad(want?`${o} is an insulator. Electricity cannot flow through it, so the cable would not work.`:`${o} is a metal, a conductor. It could carry electricity to your hand. Use an insulator.`,o)}
 S.round++;good(S.round===1?'Yes! Copper is a metal and a good conductor.':`Yes! ${o[0].toUpperCase()+o.slice(1)} is an insulator, so it keeps electricity away from hands.`)}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='key'||v==='six'||v==='shiny')S.items.forEach(([n],i)=>B('Test '+n,()=>test(i),`Put the ${n} in the gap`));
 if(v==='wire'){B('Clip on the coat',()=>clip(0),'Clip onto the plastic coat of the wire');B('Strip it, then clip',()=>clip(1),'Strip the end and clip onto the copper')}
 if(v==='use'&&S.round<USES.length)USES[S.round][1].forEach(([o])=>B(o,()=>pickUse(o),`Use ${o}`))}
function down(p){const v=view();
 if(v==='key'||v==='six'||v==='shiny'){const ts=tiles();for(let i=0;i<ts.length;i++)if(hit(p,ts[i])){S.drag={i,x:p.x,y:p.y,moved:0};A.redraw();return true}return false}
 if(v==='wire'){const r=wireBtns();if(hit(p,r[0]))clip(0);else if(hit(p,r[1])||hit(p,gap()))clip(1);return false}
 if(v==='use'&&S.round<USES.length)USES[S.round][1].forEach(([o],i)=>{if(hit(p,useR(i)))pickUse(o)});return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;S.drag.moved=1;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const G=gap();if(!d.moved||Math.hypot(p.x-G.cx,p.y-G.cy)<Math.max(70,A.W*.15))test(d.i);else{tell('Drop it on the gap between the two clips.');A.redraw()}}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=items=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},items:items||[],tested:{},inGap:null,lit:null,drag:null,round:0,oops:null,strip:0})};
const all=()=>Object.keys(S.tested).length>=S.items.length;
const steps=[
{h:'Close the gap',p:'A bulb lights only when electricity can flow all the way round the loop. There is a gap. Drag the steel key into it.',task:'Light the bulb',
 show:()=>{steps[0].go();play([()=>test(0)],500)},
 go:()=>{reset(KEY);tell('The bulb is off. There is a gap between the clips.');pad();S.want=check(0,all,'The key filled the gap, so electricity flowed.')}},
{h:'Test six things',p:'Put each object in the gap. If the bulb lights, it is a conductor. If not, it is an insulator. Keep everything else the same.',task:'Test all 6',
 show:()=>{steps[1].go();play(SIX.map((_,i)=>()=>test(i)),450)},
 go:()=>{reset(SIX);tell('Six objects to test. Drag one into the gap.');pad();S.want=check(1,all,'Clip, foil and coin are metal conductors. Spoon, band and stick are insulators.')}},
{h:'Shiny is not the clue',p:'Some people think shiny things conduct. Test a shiny plastic bead and a dull iron nail.',predict:{q:'Which one will light the bulb?',opts:['The dull iron nail','The shiny plastic bead','Both of them'],ans:0},task:'Test both',
 show:()=>{steps[2].go();play([0,1].map(i=>()=>test(i)),600)},
 go:()=>{reset(SHINY);tell('A shiny plastic bead and a dull iron nail.');pad();S.want=check(2,all,'The nail is metal, so it conducts. The bead is plastic.')}},
{h:'Why wires have a coat',p:'A wire has a copper core inside a plastic coat. Try clipping onto the coat. Then strip the end and try again.',predict:{q:'The clip touches only the plastic coat. Will the bulb light?',opts:['No, it stays off','Yes, it is a wire'],ans:0},task:'Light the bulb with the wire',
 show:()=>{steps[3].go();play([()=>clip(0),()=>clip(1)],800)},
 go:()=>{reset();tell('A wire is clipped into the gap.');pad();S.want=check(3,()=>S.strip,'Copper conducts. The plastic coat keeps it off your hands.')}},
{h:'Pick the material',p:'Engineers use conductors where electricity must flow and insulators where hands touch. Pick for each part.',task:'Choose for 3 parts',
 show:()=>{steps[4].go();play(USES.map(([,ops])=>()=>pickUse(ops.find(x=>x[1])[0])),700)},
 go:()=>{reset();tell(USES[0][0]+'. Which material?');pad();S.want=check(4,()=>S.round>=USES.length,'Copper inside, plastic and rubber outside.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which of these is a conductor?',[['an iron nail','ok'],['a plastic ruler','plastic'],['a rubber eraser','rubber']]],
 ['A shiny plastic button goes in the gap. What happens?',[['The bulb stays off','ok'],['It lights, because it is shiny','shiny'],['It lights a little','dim']]],
 ['Why do wires have a plastic coat?',[['Plastic is an insulator, so it keeps electricity off your hands','ok'],['Plastic helps electricity flow faster','faster'],['Plastic is a conductor','plastic']]],
 ['Most good conductors of electricity are…',[['metals','ok'],['hard things','hard'],['heavy things','heavy']]],
 ['A wooden stick in the gap: the bulb stays off. What does that tell you?',[['Wood is an insulator','ok'],['The battery has run out','battery'],['The bulb is broken','battery']]],
 ['A clip touches only the plastic coat of a wire. Does the bulb light?',[['No, the coat is an insulator','ok'],['Yes, wires always conduct','wire'],['Yes, but dimly','dim']]]];
function hintFor(t){let m='Conductors let electricity flow. Most are metals. Plastic, rubber and wood are insulators.';
 if(t==='plastic')m='Plastic is an insulator. It blocks electricity, which is why it is used to cover wires.';
 if(t==='rubber')m='Rubber is an insulator. Iron is a metal, and metals are conductors.';
 if(t==='shiny')m='Shiny does not mean metal. A plastic button is still plastic, an insulator.';
 if(t==='dim')m='An insulator blocks the flow. With no flow the bulb does not light at all.';
 if(t==='faster')m='The coat does not speed anything up. It is an insulator that stops electricity reaching you.';
 if(t==='hard')m='Hard is not the clue. A hard plastic ruler or a stone is still an insulator. Look for metal.';
 if(t==='heavy')m='Heavy is not the clue. A heavy wooden block blocks electricity. A light piece of foil lets it through.';
 if(t==='battery')m='Check with a metal key first. If that lights the bulb, the battery and bulb are fine, so the wood is the insulator.';
 if(t==='wire')m='Only the copper core conducts. If the clip touches just the plastic coat, no electricity can flow.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+streak+'.':'✗ '+hintFor(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pad()}});
A.start()})})();
