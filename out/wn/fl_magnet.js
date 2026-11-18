/* Flagship: magnets pull some things (ages 4-5). Test things with a magnet, fish with a magnet rod, pull a clip
   through paper, find how close it must be, and learn that only some metals are pulled. Big targets; button twins. */
(()=>{
const TEST=[['paper clip','📎',1],['sock','🧦',0],['bolt','🔩',1],['paper','📄',0],['safety pin','🧷',1],['wood','🪵',0]];
const FISH=[1,0,1,0,1],FCOL=['#f97316','#0ea5e9','#a855f7','#22c55e','#ec4899'];
const NEAR=[['paper clip','📎'],['safety pin','🧷']];
const METAL=[['tin can','🥫',1,'The tin is made of steel. Magnets pull steel.'],['gold ring','💍',0,'Gold is a metal, but magnets do not pull gold.'],
 ['scissors','✂️',1,'The blades are steel. Magnets pull steel.'],['trumpet','🎺',0,'A trumpet is brass. Magnets do not pull brass.']];
VIS.reg('flagmag',c=>{let A,pad,cq,num=-1,row=0;const M={};
const now=()=>['test','fish','through','near','metal','chal'][A.step];
const blip=k=>A.sound[k](),draw=()=>A.redraw(),both=()=>{draw();btns()};
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(t,x,y,px,ink,w,max){const g=A.ctx,s=Math.round(px*(A.narrow?1:1.12));max=max||A.W-20;g.font=`${w||700} ${s}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;
 if(g.measureText(t).width<=max)return g.fillText(t,x,y);const at=t.indexOf(' ',Math.floor(t.length/2)),k=at<0?t.lastIndexOf(' '):at;g.fillText(t.slice(0,k),x,y-s*.6,max);g.fillText(t.slice(k+1),x,y+s*.6,max)}
function emo(e,x,y,px){const g=A.ctx;g.font=`${Math.round(px)}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(e,x,y)}
function pad2(r,fill,lw){const g=A.ctx;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fillStyle=fill;g.fill();g.lineWidth=lw||2;g.strokeStyle=A.col.tx;g.stroke()}
const isIn=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* horseshoe magnet with its open end pointing down at (x,y) */
function magnet(x,y,s){const g=A.ctx,C=A.col;g.lineCap='butt';g.lineWidth=s*.34;g.strokeStyle=C.dark?'#f87171':'#dc2626';g.beginPath();g.arc(x,y-s*.55,s*.42,Math.PI,0);g.stroke();
 g.strokeStyle=C.dark?'#f87171':'#dc2626';g.beginPath();g.moveTo(x-s*.42,y-s*.55);g.lineTo(x-s*.42,y-s*.15);g.stroke();g.strokeStyle=C.dark?'#60a5fa':'#2563eb';g.beginPath();g.moveTo(x+s*.42,y-s*.55);g.lineTo(x+s*.42,y-s*.15);g.stroke();
 g.strokeStyle='#cbd5e1';[-1,1].forEach(d=>{g.beginPath();g.moveTo(x+d*s*.42,y-s*.15);g.lineTo(x+d*s*.42,y);g.stroke()})}
function grid(n){const cols=3,rows=Math.ceil(n/cols),gap=10,w=(A.W-24-(cols-1)*gap)/cols,h=Math.min((A.H*.62-(rows-1)*gap)/rows,110);return[...Array(n)].map((_,i)=>({x:12+(i%cols)*(w+gap),y:A.H*.2+Math.floor(i/cols)*(h+gap),w,h}))}
function tileOf(r,item,state){pad2(r,state==null?A.alpha(A.col.cy,.1):state?A.alpha(A.col.gr,.28):A.alpha(A.col.mu,.18),M.bad===r?3:2);
 if(state===1)magnet(r.x+r.w/2,r.y+r.h*.34,r.h*.32);emo(item[1],r.x+r.w/2,r.y+r.h*(state===1?.5:.42),r.h*.36);
 txt(state==null?item[0]:state?'pulls ✓':'no pull',r.x+r.w/2,r.y+r.h*.84,13,state==null?A.col.tx:state?A.col.gr:A.col.tx,800,r.w-6)}
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fee2e2',C.dark?.05:.25);g.fillRect(0,0,W,H);
 ({test:dTest,fish:dFish,through:dThrough,near:dNear,metal:dMetal,chal:dChal})[now()](g,W,H,C);A.fx.draw(g)}
function dTest(g,W,H,C){const t=M.seen.filter(x=>x!=null).length;txt(t>=6?'The magnet pulls some things, not all.':'Tap a thing to try the magnet on it.',W/2,H*.08,16,C.tx,800);grid(6).forEach((r,i)=>tileOf(r,TEST[i],M.seen[i]))}
const fishAt=i=>{const W=A.W,H=A.H;return{x:W*(.14+.18*i),y:H*(.42+(i%2)*.16),r:Math.min(W*.075,34)}};
function dFish(g,W,H,C){g.fillStyle=A.alpha(C.cy,C.dark?.22:.3);A.paint.rrect(8,H*.24,W-16,H*.5,20);g.fill();
 FISH.forEach((clip,i)=>{if(M.got.includes(i))return;const f=fishAt(i),col=FCOL[i];g.fillStyle=col;g.beginPath();g.ellipse(f.x,f.y,f.r,f.r*.6,0,0,7);g.fill();g.beginPath();g.moveTo(f.x+f.r*.8,f.y);g.lineTo(f.x+f.r*1.4,f.y-f.r*.5);g.lineTo(f.x+f.r*1.4,f.y+f.r*.5);g.fill();
  g.fillStyle='#0f172a';g.beginPath();g.arc(f.x-f.r*.45,f.y-f.r*.12,3,0,7);g.fill();if(clip){g.strokeStyle='#94a3b8';g.lineWidth=3;g.beginPath();g.ellipse(f.x-f.r*1.1,f.y,f.r*.28,f.r*.16,0,0,7);g.stroke()}
  if(M.bad===i)txt('no clip',f.x,f.y+f.r+12,12,C.tx,800)});
 txt(`Caught: ${M.got.length} of 3`,W/2,H*.84,17,C.tx,800);txt(M.got.length>=3?'Only fish with a paper clip get pulled.':'Tap a fish to dip the magnet on it.',W/2,H*.1,15,C.tx,800);magnet(W*.88,H*.2,30)}
const track=()=>({x0:A.W*.14,x1:A.W*.84,y:A.H*.46});
function dThrough(g,W,H,C){const T=track();magnet(M.mx,T.y+24,40);g.fillStyle=A.alpha('#fde68a',C.dark?.5:.6);A.paint.rrect(8,H*.2,W-16,H*.5,8);g.fill();txt('paper',W*.12,H*.24,12,C.tx,700);
 emo('🏠',T.x1,T.y-30,A.narrow?36:48);emo('📎',M.cx,T.y,34);txt(M.home?'Home! The magnet pulled it through the paper.':'Drag the magnet under the paper. Take the clip home.',W/2,H*.08,15,C.tx,800);
 txt('The magnet is under the paper. You can see it through.',W/2,H*.82,13,C.tx,600)}
const gap=()=>M.d*A.W*.12;
function dNear(g,W,H,C){const r=Math.min(M.r,1),y=H*.45,cx=W*.78,mx=cx-30-gap();if(M.r>=2){txt('Close up, it pulls. Far away, it does not.',W/2,H*.45,16,C.tx,800);return}
 magnet(mx,y+28,40);emo(NEAR[r][1],M.stuck?mx:cx,M.stuck?y+38:y+10,36);g.strokeStyle=C.mu;g.setLineDash([5,5]);g.beginPath();g.moveTo(mx+30,y+60);g.lineTo(cx,y+60);g.stroke();g.setLineDash([]);
 txt(M.stuck?'Click! Close up, the magnet pulls it.':M.d>1?'Too far. Nothing happens.':'Move the magnet closer.',W/2,H*.1,16,M.stuck?C.gr:C.tx,800);txt(`${NEAR[r][0]}`,cx,y+80,13)}
function dMetal(g,W,H,C){if(M.r>=METAL.length){txt('Magnets pull iron and steel. Not every metal.',W/2,H*.42,16,C.tx,800);return}
 const it=METAL[M.r],r={x:W*.3,y:H*.18,w:W*.4,h:H*.42};pad2(r,M.done?A.alpha(it[2]?C.gr:C.mu,.25):A.alpha(C.cy,.1));if(M.done&&it[2])magnet(r.x+r.w/2,r.y+r.h*.34,r.h*.3);
 emo(it[1],r.x+r.w/2,r.y+r.h*.55,r.h*.38);txt(it[0],r.x+r.w/2,r.y+r.h*.88,14);txt(M.done?(it[2]?'Pulled!':'No pull.'):'It is metal. Will the magnet pull it?',W/2,H*.08,15,C.tx,800);
 if(!M.done)['Pulls','No pull'].forEach((t,i)=>{const b=two(i);pad2(b,M.bad===i?A.alpha(C.rd,.25):A.alpha(C.vi,.13));txt(t,b.x+b.w/2,b.y+b.h/2,19,C.tx,800)});else txt(it[3],W/2,H*.75,14,C.tx,700)}
const two=i=>{const w=(A.W-36)/2,h=Math.min(A.H*.17,72);return{x:12+i*(w+12),y:A.H*.76,w,h}};
function dChal(g,W,H,C){magnet(W/2,H*.4,60);emo('📎',W/2-26,H*.47,30);emo('🧷',W/2+26,H*.47,30);txt('Magnets pull iron and steel.',W/2,H*.75,16,C.tx,800)}
function blink(i){M.bad=i;setTimeout(()=>{M.bad=null;draw()},A.reduced()?10:800)}
function test(i){if(now()!=='test'||M.seen[i]!=null)return;const it=TEST[i];M.seen[i]=it[2];blip(it[2]?'pop':'miss');
 say(it[2]?`Click! The magnet pulls the ${it[0]}. It is made of steel.`:`No pull. The magnet does not pull ${it[0]==='paper'||it[0]==='wood'?'':'the '}${it[0]}.`);both();M.want()}
const untested=()=>M.seen.findIndex(x=>x==null);
function dip(i){if(now()!=='fish'||M.got.length>=3||M.got.includes(i))return;if(!FISH[i]){blip('miss');blink(i);say('No clip on that fish. The magnet cannot pull it.');return draw()}
 M.got.push(i);blip('pop');say(M.got.length>=3?'You caught all 3! They each had a paper clip.':'Got it! The magnet pulls the paper clip.');both();M.want()}
function slide(x){if(now()!=='through'||M.home)return;const T=track();const held=Math.abs(M.mx-M.cx)<46;M.mx=Math.max(T.x0-20,Math.min(T.x1+10,x));if(held||Math.abs(M.mx-M.cx)<46)M.cx=Math.max(T.x0,Math.min(T.x1,M.mx));
 if(M.cx>=T.x1-4){M.home=1;M.cx=T.x1;blip('win');say('Home! The magnet pulled the clip right through the paper.');btns();M.want()}draw()}
function stepRight(){const T=track();slide(Math.min(T.x1,M.mx+(T.x1-T.x0)/4))}
function closer(){if(now()!=='near'||M.stuck||M.r>=2)return;M.d=Math.max(0,M.d-1);if(M.d===0){M.stuck=1;blip('pop');say(`Click! Close up, the magnet pulls the ${NEAR[M.r][0]}.`)}else{blip('tick');say(M.d>1?'Still too far. Nothing happens.':'Nearly. Move it a bit closer.')}both()}
function guess(i){if(now()!=='metal'||M.done||M.r>=METAL.length)return;const it=METAL[M.r],ok=(i===0)===!!it[2];M.done=1;
 if(ok){blip('pop');say('You were right! '+it[3])}else{blip('miss');blink(i);say((it[2]?'It does pull! ':'No pull this time. ')+it[3])}both()}
function onward(){const v=now(),end={near:1,metal:METAL.length-1}[v];if(end==null||M.r>end)return;if(v==='near'&&!M.stuck||v==='metal'&&!M.done)return;
 M.r++;M.d=4;M.stuck=0;M.done=0;blip('step');if(M.r>end){both();return M.want()}say(v==='near'?'Now try the safety pin.':`Next: the ${METAL[M.r][0]}. Will it pull?`);both()}
function btns(){if(!pad)return;pad.innerHTML='';const v=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(v==='test')TEST.forEach((it,i)=>{if(M.seen[i]==null)b('Try '+it[0],()=>test(i))});
 if(v==='fish'&&M.got.length<3)FISH.forEach((k,i)=>{if(!M.got.includes(i))b(`Fish ${i+1}`,()=>dip(i),`Dip the magnet on fish ${i+1}${k?', it has a paper clip':''}`)});
 if(v==='through'&&!M.home)b('Move the magnet →',stepRight,'Move the magnet towards the house');
 if(v==='near'&&M.r<2)M.stuck?b(M.r<1?'Next one':'Finish',onward):b('Move closer',closer);
 if(v==='metal'&&M.r<METAL.length)M.done?b(M.r<METAL.length-1?'Next one':'Finish',onward):['Pulls','No pull'].forEach((t,i)=>b(t,()=>guess(i)))}
function down(p){const v=now();if(v==='test')grid(6).forEach((r,i)=>{if(isIn(p,r))test(i)});
 if(v==='fish')FISH.forEach((_,i)=>{const f=fishAt(i);if(!M.got.includes(i)&&Math.hypot(p.x-f.x,p.y-f.y)<f.r*1.5)dip(i)});
 if(v==='near'){if(M.stuck)onward();else closer()}
 if(v==='metal'){if(M.done)onward();else[0,1].forEach(i=>{if(isIn(p,two(i)))guess(i)})}
 if(v==='through'&&!M.home){M.drag=1;slide(p.x);return true}return false}
function move(p){if(M.drag)slide(p.x)}
function up(){M.drag=0}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(n,list){steps[n].go();const k=++M.k;list.forEach((f,j)=>setTimeout(()=>{if(k===M.k)f()},A.reduced()?30*(j+1):(j+1)*300))}
function wipe(){const k=(M.k||0)+1;for(const x in M)delete M[x];const T=A?track():{x0:0};Object.assign(M,{k,want:()=>{},seen:Array(6).fill(null),got:[],r:0,d:4,stuck:0,done:0,home:0,bad:null,mx:T.x0,cx:T.x0,drag:0})}
const steps=[
{h:'Pull or not?',p:'A magnet pulls some things to it. We say it attracts them. Try the magnet on each thing.',
 predict:{q:'Will the magnet pull a paper clip?',opts:['Yes, it pulls it','No, nothing happens','Only if it is red'],ans:0},task:'Try 6 things',
 show:()=>auto(0,TEST.map((_,i)=>()=>test(i))),
 go:()=>{wipe();say('Tap a thing to try the magnet.');btns();M.want=finish(0,()=>untested()<0,'It pulls the clip, bolt and pin. Not the sock, paper or wood.')}},
{h:'Go fishing',p:'Some fish have a paper clip on their nose. Dip the magnet rod on a fish.',
 predict:{q:'A fish has no paper clip. Will the magnet catch it?',opts:['Yes','No','Only big fish'],ans:1},task:'Catch 3 fish',
 show:()=>auto(1,[0,2,4].map(i=>()=>dip(i))),
 go:()=>{wipe();say('Tap a fish with a paper clip.');btns();M.want=finish(1,()=>M.got.length>=3,'The magnet pulls the clips, so it catches those fish.')}},
{h:'Through paper',p:'A magnet can pull through thin things, like paper. Move the magnet under the paper.',
 predict:{q:'Paper is between the magnet and the clip. Will it still pull?',opts:['Yes, through thin paper','No, paper stops it','Only if the paper is wet'],ans:0},task:'Take the clip home',
 show:()=>auto(2,[stepRight,stepRight,stepRight,stepRight]),
 go:()=>{wipe();say('Drag the magnet under the paper.');btns();M.want=finish(2,()=>M.home,'Magnets can pull through thin paper.')}},
{h:'Near or far?',p:'A magnet pulls best when it is close. Far away, it may not pull at all.',task:'Bring 2 things close',
 show:()=>auto(3,[closer,closer,closer,closer,onward,closer,closer,closer,closer,onward]),
 go:()=>{wipe();say('Move the magnet closer to the clip.');btns();M.want=finish(3,()=>M.r>=2,'Close up, it pulls. Far away, it does not.')}},
{h:'Is all metal pulled?',p:'Magnets pull things made of iron or steel. Some metals, like gold and brass, are not pulled.',
 predict:{q:'Does a magnet pull every metal thing?',opts:['Yes, all metal','No, only some metal','It pulls no metal'],ans:1},task:'Test 4 metal things',
 show:()=>auto(4,METAL.flatMap(it=>[()=>guess(it[2]?0:1),onward])),
 go:()=>{wipe();say('It is metal. Will the magnet pull it?');btns();M.want=finish(4,()=>M.r>=METAL.length,'Magnets pull iron and steel, not every metal.')}},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.want()});
const QS=[['Which one will a magnet pull?',[['A paper clip','ok'],['A sock','soft'],['A wooden block','wood']]],
 ['Which one will a magnet NOT pull?',[['Paper','ok'],['A bolt','bolt'],['A safety pin','pin']]],
 ['Does a magnet pull all metal things?',[['No, only some','ok'],['Yes, all metal','allmetal'],['It pulls no metal','nometal']]],
 ['Can a magnet pull a clip through paper?',[['Yes','ok'],['No','paperstops'],['Only wet paper','wet']]],
 ['When does a magnet pull a clip?',[['When it is close','ok'],['When it is far away','far'],['Only when it is red','colour']]],
 ['A fish has a paper clip on it. Will the magnet catch it?',[['Yes','ok'],['No','nofish'],['Only big fish','size']]],
 ['A gold ring is metal. Will a magnet pull it?',[['No','ok'],['Yes, it is metal','gold'],['Yes, if it is shiny','shiny']]]];
function nope(t){let m='Magnets pull things made of iron or steel.';
 if(t==='soft')m='A sock is soft cloth. A magnet does not pull cloth. It pulls the steel paper clip.';
 if(t==='wood')m='Wood is not pulled. The paper clip is steel, so the magnet pulls it.';
 if(t==='bolt')m='A bolt is steel, so the magnet pulls it. Paper is not pulled.';
 if(t==='pin')m='A safety pin is steel, so the magnet pulls it. Paper is not pulled.';
 if(t==='allmetal')m='Not all metal. Gold and brass are metals, but a magnet does not pull them.';
 if(t==='nometal')m='It does pull some metal: iron and steel, like a paper clip.';
 if(t==='paperstops')m='Thin paper does not stop it. The magnet pulls the clip right through.';
 if(t==='wet')m='Dry paper is fine. A magnet pulls through thin paper.';
 if(t==='far')m='Far away, the pull is too weak. Move the magnet close.';
 if(t==='colour')m='Colour does not matter. Being close matters.';
 if(t==='nofish')m='The clip is steel. The magnet pulls the clip, and the fish comes too.';
 if(t==='size')m='Size does not matter. The paper clip is what the magnet pulls.';
 if(t==='gold')m='Gold is a metal, but magnets do not pull gold.';
 if(t==='shiny')m='Shiny does not matter. Magnets pull iron and steel, not gold.';
 return m}
function ask(){num++;const[q,ops]=QS[num%QS.length],sh=(num*2+1)%3;cq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=cq.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},box,o).onclick=()=>check(t)});say('Challenge: '+q);draw()}
function check(t){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){row++;A.win()}else{row=0;blip('miss')}fb.innerHTML=(ok?`✓ Right! ${row} in a row.`:'✗ '+nope(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw:paint,onStep:A=>{cq.hidden=A.step!==5;pad.hidden=A.step===5;btns()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);cq=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});btns()}});
A.start()})})();
