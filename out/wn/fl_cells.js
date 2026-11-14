/* Flagship – more cells, brighter bulb (ages 10–11; NC England Y6 Electricity: associate the brightness of a lamp or the
   volume of a buzzer with the number and voltage of cells; compare and give reasons for variations in how components
   work). Slide 1.5 V cells into a holder and watch a 3 V bulb go dim, bright, too bright and then blow; flip a cell that
   faces the wrong way; swap an AA for a C and a D cell (same 1.5 V, same glow); turn up a buzzer and a motor; and feed
   two bulbs in one loop until each gets 3 V. Tap or drag on the canvas; a button row below repeats every move. */
(()=>{
 const V1=1.5,RATE=3;                                    // one cell = 1.5 V; the bulb is stamped 3 V
 const KINDS=[['AA',.62],['C',.82],['D',1]];               // cell name, drawn size (all are 1.5 V)
 VIS.reg('flagcells',c=>{let A,keys,quiz;
  const K={run:0,cells:[],blown:false,seen:{},kind:-1,tested:{},part:'buzzer',spin:0,held:null,note:'',sad:false,test:()=>{}};
  const room=()=>['add','flip','size','buzz','share','quiz'][A.step];
  const slots=()=>({add:4,flip:2,size:1,buzz:3,share:4}[room()]||0);
  const fs=k=>Math.round(k*(A.narrow?1:1.1));
  function word(g,s,x,y,k,col,w,al){g.font=`${w||700} ${fs(k)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-12)}
  function lines(g,s,x,y,k,col,mw){g.font=`700 ${fs(k)}px system-ui,sans-serif`;const out=[];let cur='';s.split(' ').forEach(t=>{const tr=cur?cur+' '+t:t;if(cur&&g.measureText(tr).width>mw){out.push(cur);cur=t}else cur=tr});out.push(cur);const lh=fs(k)+5;out.forEach((l,i)=>word(g,l,x,y+(i-(out.length-1)/2)*lh,k,col))}
  function tile(g,r,col,a,lw){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.strokeStyle=col;g.lineWidth=lw||1.8;g.stroke()}
  const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function notice(g){if(!K.note)return;const C=A.col;g.font=`700 ${fs(13)}px system-ui,sans-serif`;const out=[];let cur='';((K.sad?'✗ ':'✓ ')+K.note).split(' ').forEach(t=>{const tr=cur?cur+' '+t:t;if(cur&&g.measureText(tr).width>A.W-44){out.push(cur);cur=t}else cur=tr});out.push(cur);
   const lh=fs(13)+5,h=out.length*lh+12,y=A.H-h-6;tile(g,{x:12,y,w:A.W-24,h},K.sad?C.rd:C.gr,.13);out.forEach((l,i)=>word(g,l,A.W/2,y+6+lh*(i+.5),13,C.tx))}
  const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
  const oops=t=>{K.sad=true;K.note=t;A.sound.miss();tell(t);A.redraw()};
  const good=t=>{K.sad=false;K.note=t;A.sound.pop()};
  const volts=()=>Math.abs(K.cells.reduce((s,d)=>s+d*V1,0));
  const fmt=v=>String(+v.toFixed(1));
  // ---- circuit geometry ----
  const box=()=>({l:A.W*.17,r:A.W*.83,t:A.H*.2,b:A.H*.6});
  const slotR=i=>{const n=slots(),B=box(),w=Math.min(fs(58),(B.r-B.l)*.8/Math.max(n,1)),x0=A.W/2-n*w/2;return{x:x0+i*w,y:B.t-fs(15),w,h:fs(30)}};
  const trayR=i=>{const w=fs(56);return{x:A.W/2-2*w-12+i*(w+8),y:A.H*.68,w,h:fs(30)}};
  function cell(g,r,dir,scale){const C=A.col,s=scale||1,w=r.w*s-6,h=r.h*s,x=r.x+(r.w-w)/2,y=r.y+(r.h-h)/2;g.fillStyle=C.dark?'#334155':'#1f2937';A.paint.rrect(x,y,w,h,5);g.fill();
   const px=dir>0?x+w*.72:x,pw=w*.28;g.fillStyle=C.am;g.fillRect(px,y,pw,h);g.fillStyle=C.am;g.fillRect(dir>0?x+w:x-4,y+h*.3,4,h*.4);
   word(g,'+',dir>0?x+w*.86:x+w*.14,y+h/2,Math.max(10,13*s),'#111',900);word(g,'−',dir>0?x+w*.3:x+w*.7,y+h/2,Math.max(10,13*s),'#fff',900)}
  function bulb(g,x,y,v,rate,label,side){side=side||-1;const C=A.col,r=fs(17),lv=K.blown?0:v/rate;
   if(lv>0){const R=r+fs(30)*Math.min(lv,1.6);g.fillStyle=A.alpha('#facc15',Math.min(.75,.18+lv*.35));g.beginPath();g.arc(x,y,R,0,7);g.fill()}
   g.fillStyle=lv>0?A.mix('#fde68a','#fff7c2',Math.min(1,lv*.6)):(C.dark?'#475569':'#e5e7eb');g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
   g.strokeStyle=K.blown?C.rd:'#92400e';g.lineWidth=2;g.beginPath();if(K.blown){g.moveTo(x-8,y+6);g.lineTo(x-2,y-4);g.moveTo(x+2,y-6);g.lineTo(x+8,y+6)}else{g.moveTo(x-8,y+6);g.lineTo(x-4,y-5);g.lineTo(x,y+3);g.lineTo(x+4,y-5);g.lineTo(x+8,y+6)}g.stroke();
   word(g,label||`${rate} V bulb`,x+side*(r+fs(8)),y,11,C.tx,800,side<0?'right':'left')}
  const glowWord=(v,rate)=>K.blown?'blown':v===0?'off':v<rate?'dim':v===rate?'bright':'too bright';
  function loop(g){const C=A.col,B=box();g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(B.l,B.t);g.lineTo(B.r,B.t);g.lineTo(B.r,B.b);g.lineTo(B.l,B.b);g.closePath();g.stroke();
   const n=slots(),a=slotR(0),z=slotR(n-1);g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.08:.6);g.fillRect(a.x-4,a.y-4,z.x+z.w-a.x+8,a.h+8);g.strokeStyle=C.mu;g.lineWidth=1.5;g.strokeRect(a.x-4,a.y-4,z.x+z.w-a.x+8,a.h+8);
   for(let i=0;i<n;i++){const r=slotR(i);if(K.cells[i]!=null)cell(g,r,K.cells[i],room()==='size'&&K.kind>=0?KINDS[K.kind][1]:1);else{g.setLineDash([4,4]);g.strokeStyle=C.mu;g.strokeRect(r.x+3,r.y+3,r.w-6,r.h-6);g.setLineDash([])}}}
  function meter(g,txt){word(g,txt,A.W/2,A.H*.07,14,A.col.tx,800)}
  function tray(g,n){for(let i=0;i<n;i++)cell(g,trayR(i),1);if(n)word(g,'spare cells: tap or drag one up',A.W/2,A.H*.68+fs(44),11,A.col.mu,700)}
  function buzzer(g,x,y,v){const C=A.col;g.fillStyle=C.dark?'#475569':'#d1d5db';g.beginPath();g.arc(x,y+6,fs(16),Math.PI,0);g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
   const n=Math.round(v/V1);g.strokeStyle=C.vi;g.lineWidth=2.5;for(let i=1;i<=n;i++){g.beginPath();g.arc(x,y-2,fs(16)+i*fs(8),-Math.PI*.8,-Math.PI*.2);g.stroke()}word(g,'4.5 V buzzer',x-fs(26),y+fs(16),11,C.tx,800,'right')}
  function motor(g,x,y,v){const C=A.col,R=fs(18);g.fillStyle=C.dark?'#475569':'#e5e7eb';g.beginPath();g.arc(x,y,R,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
   g.strokeStyle=C.cy;g.lineWidth=4;for(let k=0;k<3;k++){const a=K.spin+k*2.094;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*R*.9,y+Math.sin(a)*R*.9);g.stroke()}
   const n=Math.round(v/V1);for(let i=0;i<n;i++){g.strokeStyle=A.alpha(C.cy,.7);g.lineWidth=2;g.beginPath();g.arc(x,y,R+5+i*5,-.6,.6);g.stroke()}word(g,'4.5 V motor',x-R-fs(10),y+R*.9,11,C.tx,800,'right')}
  const chipR=k=>{const w=fs(96);return{x:A.W/2-w-6+k*(w+12),y:A.H*.68,w,h:fs(32)}};
  const kindR=k=>{const w=(A.W-56)/3;return{x:16+k*(w+12),y:A.H*.66,w,h:fs(44)}};
  function draw(A){const g=A.ctx,C=A.col,B=box();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,A.W,A.H);const v=room(),V=volts();
   if(v==='quiz'){word(g,'more cells, more push',A.W/2,A.H/2,16,C.tx,800);return notice(g)}
   loop(g);const mid=(B.t+B.b)/2;
   if(v==='add'||v==='flip'||v==='size'){bulb(g,B.r,mid,V,RATE);meter(g,`${K.cells.length} cell${K.cells.length===1?'':'s'}: ${fmt(V)} V → ${glowWord(V,RATE)}`)}
   if(v==='add')tray(g,4-K.cells.length);
   if(v==='flip')word(g,'tap a cell to turn it round',A.W/2,A.H*.7,12,C.mu,700);
   if(v==='size'){KINDS.forEach(([nm,s],k)=>{const r=kindR(k);tile(g,r,k===K.kind?C.am:C.cy,k===K.kind?.25:.1,k===K.kind?3:1.6);cell(g,{x:r.x+r.w*.1,y:r.y+4,w:r.w*.55,h:r.h-8},1,s);word(g,nm,r.x+r.w*.8,r.y+r.h/2,14,C.tx,800)})}
   if(v==='buzz'){if(K.part==='buzzer')buzzer(g,B.r,mid,V);else motor(g,B.r,mid,V);meter(g,`${K.cells.length} cell${K.cells.length===1?'':'s'}: ${fmt(V)} V → ${K.part==='buzzer'?['silent','quiet','louder','loudest'][K.cells.length]:['still','slow','faster','fastest'][K.cells.length]}`);
    ['buzzer','motor'].forEach((nm,k)=>{const r=chipR(k);tile(g,r,nm===K.part?C.vi:C.mu,nm===K.part?.22:.08,nm===K.part?3:1.4);word(g,nm,r.x+r.w/2,r.y+r.h/2,14,C.tx,800)})}
   if(v==='share'){const each=V/2;bulb(g,B.r,mid,each,RATE,'bulb 1: 3 V');bulb(g,B.l,mid,each,RATE,'bulb 2: 3 V',1);meter(g,`${fmt(V)} V shared by 2 bulbs = ${fmt(each)} V each → ${glowWord(each,RATE)}`);tray(g,4-K.cells.length)}
   if(K.held){cell(g,{x:K.held.x-fs(28),y:K.held.y-fs(15),w:fs(56),h:fs(30)},1)}notice(g);A.fx.draw(g)}
  // ---- moves ----
  function add(){const n=slots();if(K.cells.length>=n)return oops(`The holder is full: ${n} cells.`);if(K.blown)return oops('The bulb is blown: its thin wire has melted, so the circuit has a gap. Take a cell out first.');
   K.cells.push(1);const V=volts();K.seen[K.cells.length]=1;if(room()==='buzz')K.seen[K.part+K.cells.length]=1;const v=room(),rate=v==='share'?2*RATE:RATE;
   if(v==='add'&&V>RATE*1.5){K.blown=true;oops(`${fmt(V)} V is twice the 3 V stamped on the bulb. The thin wire inside got too hot and melted, so now nothing lights. More cells is not always better.`);return sync()}
   if(v==='buzz')good(`${K.cells.length} cells: ${fmt(V)} V. A bigger push means more current, so the ${K.part} ${K.part==='buzzer'?'is louder':'spins faster'}.`);
   else good(V<rate?`${fmt(V)} V: more push, more current, a brighter glow.`:V===rate?`${fmt(V)} V matches the bulb${v==='share'?'s: 3 V each':''}. Full brightness.`:`${fmt(V)} V is more than the 3 V label: very bright, but the bulb will not last.`);sync()}
  function take(){if(!K.cells.length)return;K.cells.pop();if(K.blown){K.blown=false;good('New bulb fitted. Fewer cells, less push.')}else good(`${K.cells.length} cell${K.cells.length===1?'':'s'}: ${fmt(volts())} V. Less push, less glow.`);sync()}
  function flip(i){if(K.cells[i]==null)return;K.cells[i]*=-1;const V=volts();K.seen['f'+K.cells.join('')]=1;
   if(V===0)oops('Now the cells push against each other: 1.5 V one way and 1.5 V back. The total is 0 V, so the bulb is off.');
   else good('Both cells face the same way, so their pushes add: 1.5 V + 1.5 V = 3 V. The bulb lights.');sync()}
  function pickKind(k){K.kind=k;K.cells=[1];K.tested[k]=1;good(`${KINDS[k][0]} cell: 1.5 V. ${k===0?'Small cell, normal glow.':'Bigger cell, same 1.5 V, same glow. It holds more energy, so it lasts longer.'}`);sync()}
  function setPart(nm){if(K.part===nm)return;K.part=nm;K.cells=[];good(`Now a ${nm}. Add cells and watch it.`);sync()}
  function sync(){const v=room(),V=volts();let s='';
   if(v==='add')s=`${K.cells.length} cells in the holder, ${fmt(V)} volts. The 3 volt bulb is ${glowWord(V,RATE)}.`;
   else if(v==='flip')s=`Cells: ${K.cells.map(d=>d>0?'facing right':'facing left').join(', ')}. ${fmt(V)} volts. Bulb ${glowWord(V,RATE)}.`;
   else if(v==='size')s=K.kind<0?'Choose an AA, C or D cell.':`${KINDS[K.kind][0]} cell, 1.5 volts, bulb dim. Tested ${Object.keys(K.tested).length} of 3.`;
   else if(v==='buzz')s=`${K.part}, ${K.cells.length} cells, ${fmt(V)} volts.`;
   else if(v==='share')s=`Two 3 volt bulbs in one loop. ${K.cells.length} cells, ${fmt(V)} volts, ${fmt(V/2)} volts each, ${glowWord(V/2,RATE)}.`;else s='Challenge.';
   tell((K.note?K.note+' ':'')+s);pad();K.test()}
  function pad(){if(!keys)return;keys.innerHTML='';const v=room(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);e.onclick=f};
   if(v==='add'||v==='buzz'||v==='share'){b('+ cell',add,'Add a cell to the holder');b('− cell',take,'Take a cell out')}
   if(v==='flip')K.cells.forEach((d,i)=>b(`Turn cell ${i+1}`,()=>flip(i),`Turn cell ${i+1} round; it now faces ${d>0?'right':'left'}`));
   if(v==='size')KINDS.forEach(([nm],k)=>b(`${nm} cell`,()=>pickKind(k),`Put in an ${nm} cell`));
   if(v==='buzz')['buzzer','motor'].forEach(nm=>b(nm[0].toUpperCase()+nm.slice(1),()=>setPart(nm),`Use the ${nm}`));A.redraw()}
  function down(p){const v=room(),n=slots();
   if(v==='add'||v==='share'){for(let i=0;i<4-K.cells.length;i++)if(hit(p,trayR(i))){K.held={x:p.x,y:p.y};A.redraw();return true}
    for(let i=0;i<n;i++)if(K.cells[i]!=null&&hit(p,slotR(i))){take();return false}return false}
   if(v==='buzz'){const k=[0,1].find(k=>hit(p,chipR(k)));if(k!=null){setPart(['buzzer','motor'][k]);return false}for(let i=0;i<n;i++)if(hit(p,slotR(i))){if(K.cells[i]!=null)take();else add();return false}return false}
   if(v==='flip'){for(let i=0;i<n;i++)if(hit(p,slotR(i))){flip(i);return false}return false}
   if(v==='size'){const k=[0,1,2].find(k=>hit(p,kindR(k)));if(k!=null)pickKind(k);return false}return false}
  function move(p){if(!K.held)return;K.held={x:p.x,y:p.y};A.redraw()}
  function up(p){if(!K.held)return;const h=K.held;K.held=null;if(h.y<A.H*.45||(p&&p.y<A.H*.45))add();else if(Math.abs(h.y-A.H*.7)<A.H*.08){add()}else A.redraw()}
  // ---- steps ----
  const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const auto=list=>{const id=++K.run,gap=A.reduced()?15:320;list.forEach((f,i)=>setTimeout(()=>{if(id===K.run)f()},i*gap))};
  const clear=()=>{K.run++;K.test=()=>{};K.cells=[];K.blown=false;K.seen={};K.kind=-1;K.tested={};K.part='buzzer';K.held=null;K.note='';K.sad=false};
  const steps=[
   {h:'Add a cell',p:'Each cell gives a push of 1.5 volts (V). The bulb is stamped 3 V: that is the push it is made for. Drag or tap spare cells into the holder, and tap a cell in the holder to take it out.',
    predict:{q:'One cell lights the bulb. You add a second cell, facing the same way. The bulb will be…',opts:['The same: a bulb is just on or off','Brighter: two cells push harder'],ans:1},
    task:'Light the bulb with 1 cell, then at its 3 V label',show:()=>{steps[0].go();auto([add,add])},
    go:()=>{clear();sync();K.test=fin(0,()=>K.seen[1]&&K.cells.length===2&&!K.blown,'1 cell: 1.5 V, dim. 2 cells: 3 V, full brightness. Try 4 cells to see why the label matters.')}},
   {h:'Which way round?',p:'A cell pushes from its + end. These two cells face opposite ways. Tap a cell to turn it round.',
    predict:{q:'Two cells, one turned the wrong way. The bulb will be…',opts:['Bright: two cells are two cells','Off: the pushes cancel out'],ans:1},
    task:'Make both cells push the same way',show:()=>{steps[1].go();auto([()=>flip(1)])},
    go:()=>{clear();K.cells=[1,-1];sync();K.test=fin(1,()=>K.cells.length===2&&K.cells[0]===K.cells[1],'Same way round: 3 V. Opposite ways: 0 V. Direction matters.')}},
   {h:'Big cell, small cell',p:'AA, C and D cells come in different sizes. Put each one in the holder and compare the bulb.',
    predict:{q:'A D cell is much bigger than an AA cell. With a D cell, the bulb will be…',opts:['Brighter: a bigger cell pushes harder','The same: both are 1.5 V'],ans:1},
    task:'Test all 3 cells',show:()=>{steps[2].go();auto([0,1,2].map(k=>()=>pickKind(k)))},
    go:()=>{clear();sync();K.test=fin(2,()=>Object.keys(K.tested).length===3,'All three give 1.5 V and the same glow. Size changes how long a cell lasts, not its push.')}},
   {h:'Buzzers and motors',p:'Cells push current through any part, not only bulbs. Add cells to the buzzer, then switch to the motor and do the same.',
    task:'Make the buzzer loudest, then the motor fastest',show:()=>{steps[3].go();auto([add,add,add,()=>setPart('motor'),add,add,add])},
    go:()=>{clear();sync();K.test=fin(3,()=>K.seen.buzzer3&&K.seen.motor3,'3 cells: 4.5 V, the label on both. Loudest buzzer, fastest motor.')}},
   {h:'Two bulbs share the push',p:'Two 3 V bulbs sit in one loop, so they share the voltage. Add cells until each bulb glows as brightly as one bulb did on 2 cells.',
    task:'Get 3 V across each bulb',show:()=>{steps[4].go();auto([add,add,add,add])},
    go:()=>{clear();sync();K.test=fin(4,()=>K.cells.length===4,'4 cells: 6 V, shared by 2 bulbs, is 3 V each. Brightness depends on the push each bulb gets.')}},
   {h:'Challenge',p:'',go:()=>{clear();ask()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>K.test()});
  // ---- challenge: every wrong option names the slip ----
  const Q=[['A torch has 2 cells. You add a third, the same way round. The bulb gets…','brighter',[['dimmer','dimmer'],['no brighter','nochange']]],
   ['Two 1.5 V cells, one turned the wrong way. What is the total push?','0 V',[['3 V','ignoredir'],['1.5 V','half']]],
   ['You swap an AA cell for a D cell. Both are 1.5 V. The bulb…','is just as bright',[['is brighter','size'],['goes out','fit']]],
   ['A bulb stamped 3 V is joined to four 1.5 V cells. What happens?','It blows: 6 V is too much',[['It is very bright and safe','safe'],['It is dim: it needs 9 V','under']]],
   ['One bulb glows well on 2 cells. Add a second bulb to the same loop. To get both that bright, use…','4 cells',[['2 cells','same'],['3 cells','close']]],
   ['Which change makes a buzzer louder?','add a cell the same way round',[['use a bigger cell with the same voltage','size'],['turn one cell round','ignoredir']]]];
  function slip(tag,w){let m='Count the cells that face the same way and add their volts.';
   if(tag==='dimmer')m='More cells the same way give a bigger push, so more current flows. Dimmer comes from extra bulbs, not extra cells.';
   if(tag==='nochange')m='A bulb is not just on or off. 4.5 V pushes more current than 3 V, so it glows brighter.';
   if(tag==='ignoredir')m='Direction matters. A cell turned round pushes the other way, so it takes away 1.5 V instead of adding it.';
   if(tag==='half')m='1.5 V would be one cell alone. Two cells facing opposite ways cancel: 1.5 − 1.5 = 0 V.';
   if(tag==='size')m='Cell size is not voltage. AA, C and D cells are all 1.5 V. A bigger cell lasts longer but pushes the same.';
   if(tag==='fit')m='A D cell still completes the circuit. It gives the same 1.5 V, so the bulb glows the same.';
   if(tag==='safe')m='6 V is twice the 3 V the bulb is made for. The thin wire overheats and melts.';
   if(tag==='under')m='Four cells give 4 × 1.5 = 6 V, which is already more than the 3 V label.';
   if(tag==='same')m='Two bulbs in one loop share the push. 2 cells give 3 V, so each bulb gets only 1.5 V and is dim.';
   if(tag==='close')m='3 cells give 4.5 V, which is 2.25 V each: still dimmer than 3 V each. You need 4 cells.';
   return m}
  let qn=-1,row=0;
  function ask(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
   quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>score(tag,w,ans)});tell('Challenge: '+q);A.redraw()}
  function score(tag,w,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=quiz.querySelector('.fl-fb');
   if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right: '+ans+'. Streak: '+row+'.':'✗ '+slip(tag,w)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
  A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{quiz.hidden=A.step!==5;keys.hidden=A.step===5;pad()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Circuit controls'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});
    A.every(dt=>{if(room()==='buzz'&&K.part==='motor'&&K.cells.length&&!A.reduced()){K.spin+=dt*K.cells.length*3;return true}return false})}});
  A.start()})})();
