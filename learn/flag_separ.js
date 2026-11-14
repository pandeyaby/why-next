/* Flagship – separating mixtures (ages 9–10; NC England Y5 properties and changes of materials: "use knowledge of solids,
   liquids and gases to decide how mixtures might be separated, including through filtering, sieving and evaporating";
   NGSS 5-PS1-3/5-PS1-4 background). Shake a sieve so sand drops through and gravel stays; pour sand-water and salt
   water through filter paper (the sand stays, but dissolved salt goes through); heat salt water until only crystals
   are left; pick the method for six mixtures; then build two separation plans in order (sand, salt and water;
   gravel, sand and salt). */
(()=>{
 const NAMES={sieve:'Sieve',stir:'Add water and stir',filter:'Filter',evap:'Evaporate'};
 const POUR=[['sand and water','sand'],['salt water','salt']];
 const MIXES=[['peas and flour','big','sieve'],['chalk dust in water','bits','filter'],['sugar dissolved in tea','dis','evap'],['pebbles and sand','big','sieve'],['muddy pond water','bits','filter'],['sea water, to get the salt','dis','evap']];
 const PLANS=[['sand, salt and water',['filter','evap'],{filter:'sand',evap:'salt'}],['dry gravel, sand and salt',['sieve','stir','filter','evap'],{sieve:'gravel',filter:'sand',evap:'salt'}]];
 VIS.reg('flagsepar',c=>{let A,tray,ask;
  const K={mv:false,shake:0,pour:0,heat:0,mx:0,pl:0,done:[],bins:[0,0,0],say:'',bad:false,next:()=>{},dx:0,lx:null};
  const kind=()=>['sieve','pour','heat','pick','plan','chal'][A.step];
  const px=n=>Math.round(n*(A.narrow?1:1.1));
  const INK='#172033',GREY='#475569',EDGE='#64748b',WHITE='#ffffff',WET='#bfdbfe',WATERL='#1d4ed8',SANDC='#d97706',ROCK='#57534e',SALTC='#64748b',OK='#047857',NO='#b91c1c',HOT='#c2410c';
  function word(g,s,x,y,n,col,al){g.font=`800 ${px(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-14)}
  function fold(g,s,max,n){g.font=`800 ${px(n)}px system-ui,sans-serif`;const L=[];let cur='';s.split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>max){L.push(cur);cur=w}else cur=t});L.push(cur);return L}
  function card(g,r,fill,line,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=line;g.lineWidth=lw||2;g.stroke()}
  const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function notice(g){if(!K.say)return;const L=fold(g,(K.bad?'✗ ':'✓ ')+K.say,A.W-44,13),lh=px(13)+6,h=L.length*lh+12,y=A.H-h-6;card(g,{x:10,y,w:A.W-20,h},WHITE,K.bad?NO:OK,3);L.forEach((l,i)=>word(g,l,A.W/2,y+6+lh*(i+.5),13,INK))}
  const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
  const nope=s=>{K.bad=true;K.say=s;A.sound.miss();tell(s);A.redraw()};
  const good=s=>{K.bad=false;K.say=s;A.sound.pop()};
  const rnd=k=>{const v=Math.sin(k*91.7+3.1)*43758.5;return v-Math.floor(v)};
  // ---- pictures ----
  function beaker(g,x,y,w,h,level,col){g.fillStyle=col||WET;g.fillRect(x+2,y+h*(1-level),w-4,h*level-2);g.strokeStyle=EDGE;g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.lineTo(x,y+h);g.lineTo(x+w,y+h);g.lineTo(x+w,y);g.stroke()}
  function sieveScene(g){const cx=A.W/2+Math.sin(K.dx)*8,top=A.H*.16,w=Math.min(A.W*.6,260),fallen=K.shake/3;
   g.strokeStyle=EDGE;g.lineWidth=3;g.beginPath();g.ellipse(cx,top+40,w/2,40,0,0,Math.PI);g.stroke();
   g.setLineDash([3,4]);g.beginPath();g.ellipse(cx,top+40,w/2-6,34,0,0,Math.PI);g.stroke();g.setLineDash([]);
   for(let k=0;k<7;k++){g.fillStyle=ROCK;g.beginPath();g.arc(cx-w*.3+k*w*.1,top+50+rnd(k)*10,px(9),0,7);g.fill()}
   const by=A.H*.48,bw=w*.8;beaker(g,A.W/2-bw/2,by,bw,A.H*.2,0,WHITE);
   for(let k=0;k<40;k++){const down=rnd(k+9)<fallen;g.fillStyle=SANDC;g.beginPath();g.arc(A.W/2-bw*.42+rnd(k+50)*bw*.84,down?by+A.H*.2-6-rnd(k+90)*A.H*.06:top+46+rnd(k+70)*16,2.6,0,7);g.fill()}
   word(g,'gravel',A.W/2,top+8,13,ROCK);word(g,'sand',A.W/2,by+A.H*.2+px(12),13,SANDC);word(g,`shakes: ${K.shake} of 3`,A.W/2,A.H*.06,15,INK)}
  function funnel(g,round,poured){const cx=A.W/2,top=A.H*.12,w=Math.min(A.W*.42,190),h=A.H*.2;
   g.fillStyle='#f8fafc';g.beginPath();g.moveTo(cx-w/2,top);g.lineTo(cx+w/2,top);g.lineTo(cx+8,top+h);g.lineTo(cx-8,top+h);g.closePath();g.fill();g.strokeStyle=EDGE;g.lineWidth=3;g.stroke();
   g.setLineDash([4,3]);g.strokeStyle=GREY;g.beginPath();g.moveTo(cx-w/2+10,top+4);g.lineTo(cx,top+h-6);g.lineTo(cx+w/2-10,top+4);g.stroke();g.setLineDash([]);
   g.fillStyle=EDGE;g.fillRect(cx-6,top+h,12,A.H*.08);const by=top+h+A.H*.1,bw=w*.7;beaker(g,cx-bw/2,by,bw,A.H*.2,poured?.6:0);
   if(poured&&round===0){for(let k=0;k<30;k++){const yy=top+h*(.2+rnd(k+5)*.4),half=(w/2-10)*(1-(yy-top)/h)*.8;g.fillStyle=SANDC;g.beginPath();g.arc(cx+(rnd(k)*2-1)*half,yy,2.8,0,7);g.fill()}word(g,'sand stays on the paper',cx,A.H*.06+px(17),12,SANDC)}
   if(poured)word(g,round?'still salty water':'clear water',cx,by+A.H*.12,13,WATERL);word(g,poured?`Poured: ${POUR[round][0]}`:`Pour: ${POUR[0][0]}`,cx,A.H*.05,15,INK)}
  function heatScene(g){const bw=Math.min(A.W*.5,220),bx=A.W/2-bw/2,by=A.H*.2,bh=A.H*.3,lev=(4-K.heat)/4;beaker(g,bx,by,bw,bh,lev*.8);
   for(let k=0;k<K.heat*5;k++){g.fillStyle=SALTC;g.fillRect(bx+8+rnd(k+3)*(bw-24),by+bh-10-rnd(k+11)*8,6,6)}
   if(K.heat){g.strokeStyle=GREY;g.lineWidth=2;for(let k=0;k<3;k++){g.beginPath();const x=bx+bw*(.3+k*.2);g.moveTo(x,by-4);g.quadraticCurveTo(x+10,by-14,x,by-24);g.stroke()}word(g,'water vapour',A.W/2,by-px(34),12,GREY)}
   g.fillStyle=HOT;g.beginPath();g.moveTo(A.W/2-16,by+bh+A.H*.13);g.quadraticCurveTo(A.W/2,by+bh+6,A.W/2+16,by+bh+A.H*.13);g.closePath();g.fill();
   word(g,K.heat>=4?'only salt crystals left':`water left: ${Math.round(lev*100)}%`,A.W/2,A.H*.045,15,INK)}
  const boxAt=(k,n,y,h)=>{const w=(A.W-20-(n-1)*8)/n;return{x:10+k*(w+8),y,w,h}};
  const PICK=['sieve','filter','evap'];
  function pickScene(g){const m=MIXES[K.mx],top={x:A.W*.12,y:A.H*.08,w:A.W*.76,h:A.H*.2};card(g,top,m?'#fef3c7':WHITE,m?'#b45309':EDGE,2.5);word(g,m?m[0]:'All 6 mixtures done',A.W/2,top.y+top.h/2,m?17:15,m?INK:OK);
   PICK.forEach((t,k)=>{const b=boxAt(k,3,A.H*.38,A.H*.26);card(g,b,'#f1f5f9',EDGE,2.5);word(g,NAMES[t],b.x+b.w/2,b.y+b.h*.38,A.narrow?13:15,INK);word(g,K.bins[k]?'●'.repeat(K.bins[k]):'tap',b.x+b.w/2,b.y+b.h*.72,13,GREY)})}
  function planScene(g){const P=PLANS[K.pl];if(!P){word(g,'Both plans work!',A.W/2,A.H*.35,17,OK);return}word(g,`Separate: ${P[0]}`,A.W/2,A.H*.06,15,INK);
   const left=['gravel','sand','salt'].filter(s=>P[0].includes(s)&&!K.done.some(d=>P[2][d]===s));
   word(g,'Still mixed: '+(left.join(', ')||'nothing')+(P[0].includes('water')||K.done.includes('stir')?' + water':''),A.W/2,A.H*.15,13,GREY);
   P[1].forEach((s,k)=>{const b=boxAt(k,P[1].length,A.H*.22,A.H*.16),got=K.done[k];card(g,b,got?'#dcfce7':WHITE,got?OK:EDGE,2);word(g,`${k+1}`,b.x+12,b.y+12,11,GREY);
    if(got){word(g,NAMES[got].replace('Add water and stir','Add water'),b.x+b.w/2,b.y+b.h*.45,A.narrow?11:13,INK);if(P[2][got])word(g,'→ '+P[2][got],b.x+b.w/2,b.y+b.h*.78,11,OK)}});
   Object.keys(NAMES).forEach((t,k)=>{const b=boxAt(k,4,A.H*.45,A.H*.17);card(g,b,'#f1f5f9',EDGE,2);fold(g,NAMES[t],b.w-8,A.narrow?11:13).forEach((l,i,L)=>word(g,l,b.x+b.w/2,b.y+b.h/2+(i-(L.length-1)/2)*px(15),A.narrow?11:13,INK))})}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   const v=kind();if(v==='sieve')sieveScene(g);if(v==='pour')funnel(g,Math.max(0,K.pour-1),K.pour>0);if(v==='heat')heatScene(g);if(v==='pick')pickScene(g);if(v==='plan')planScene(g);
   if(v==='chal')word(g,'Size, dissolving and boiling decide the method.',A.W/2,A.H/2,14,INK);notice(g);A.fx.draw(g)}
  // ---- actions ----
  function shakeIt(){if(K.shake>=3)return;K.shake++;good(K.shake<3?'Small sand grains drop through the holes.':'All the sand is through. The gravel is too big for the holes, so it stays.');sync()}
  function pourIt(){if(K.pour>=2)return;const r=K.pour;if(r===0)good('The sand grains are too big for the tiny holes in the paper, so they stay. Clear water drips through.');
   else good('Nothing stays on the paper. Dissolved salt is in tiny bits mixed through the water, so it goes through too.');K.pour++;sync()}
  function heatIt(){if(K.heat>=4)return;K.heat++;good(K.heat<4?'Some water turns into water vapour and leaves. The salt cannot.':'All the water has evaporated. The salt is left as crystals.');sync()}
  function why(type,chose){const m=MIXES[K.mx];let msg='';
   if(type==='dis'&&chose==='filter')msg=`${m[0]}: the solid has dissolved, so it goes straight through filter paper. Evaporate the water to get it back.`;
   if(type==='dis'&&chose==='sieve')msg='Dissolved bits are far too tiny for a sieve. Evaporate the water and the solid is left.';
   if(type==='bits'&&chose==='sieve')msg='Bits this small slip through a sieve. Filter paper has much tinier holes.';
   if(type==='bits'&&chose==='evap')msg='This solid has not dissolved. Filter paper catches it quickly, with no heating needed.';
   if(type==='big'&&chose==='filter')msg='These are dry bits of different sizes, not a solid in a liquid. A sieve sorts them by size.';
   if(type==='big'&&chose==='evap')msg='There is no water to evaporate. A sieve sorts dry bits by size.';return msg}
  function pickIt(k){const m=MIXES[K.mx];if(!m)return;if(PICK[k]!==m[2])return nope(why(m[1],PICK[k]));K.bins[k]++;
   good(m[1]==='big'?'Different sizes: the sieve keeps the big bits.':m[1]==='bits'?'Undissolved bits: filter paper catches them.':'Dissolved: evaporate the water and the solid is left.');K.mx++;sync()}
  function planWhy(P,pos,s){const want=P[1][pos];let m=`Not yet. Think about what is still mixed.`;
   if(s==='evap'&&!P[0].includes('water')&&!K.done.includes('stir'))m='There is no water to evaporate yet.';
   else if(s==='evap')m='Evaporating now leaves the salt mixed with sand. Take the sand out first.';
   else if(s==='filter'&&want==='sieve')m='Nothing is wet yet, and gravel would clog the paper. Sieve out the big gravel first.';
   else if(s==='filter'&&want==='stir')m='Sand and salt are both dry grains, so filter paper cannot split them. Add water so the salt dissolves.';
   else if(s==='filter')m='The liquid has already been filtered. Now get the salt back.';
   else if(s==='sieve'&&K.done.includes('sieve'))m='The gravel is already out. Sand and salt are too small for a sieve.';
   else if(s==='sieve')m='Sand grains and salt water both pass through a sieve’s holes.';
   else if(s==='stir'&&(P[0].includes('water')||K.done.includes('stir')))m='The salt has already dissolved. Stirring does not separate anything.';
   else if(s==='stir')m='Take the big gravel out first, while everything is dry.';return m}
  function planIt(s){const P=PLANS[K.pl];if(!P)return;const pos=K.done.length;if(P[1][pos]!==s)return nope(planWhy(P,pos,s));K.done.push(s);
   const out={sieve:'Gravel stays in the sieve.',stir:'The salt dissolves. The sand does not.',filter:'Sand stays on the filter paper. Salt water goes through.',evap:'Water evaporates. Salt crystals are left.'}[s];
   if(K.done.length===P[1].length){good(out+' All separated!');K.pl++;K.done=[]}else good(out);sync()}
  function sync(){const v=kind();let s='';
   if(v==='sieve')s=`Sieve with gravel and sand. Shakes ${K.shake} of 3.`;
   else if(v==='pour')s=K.pour<2?`Next to pour through filter paper: ${POUR[K.pour][0]}.`:'Both poured.';
   else if(v==='heat')s=`Salt water on the heat. Water left ${Math.round((4-K.heat)/4*100)}%.`;
   else if(v==='pick')s=MIXES[K.mx]?`Mixture: ${MIXES[K.mx][0]}. Sieve, filter or evaporate?`:'All six mixtures done.';
   else if(v==='plan')s=PLANS[K.pl]?`Plan for ${PLANS[K.pl][0]}. Steps chosen: ${K.done.map(d=>NAMES[d]).join(', ')||'none'}.`:'Both plans done.';else s='Challenge.';
   tell((K.say?K.say+' ':'')+s);pads();K.next()}
  function pads(){if(!tray)return;tray.innerHTML='';const v=kind(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},tray,t);e.onclick=f};
   if(v==='sieve'&&K.shake<3)b('Shake',shakeIt,'Shake the sieve');if(v==='pour'&&K.pour<2)b('Pour',pourIt,`Pour the ${POUR[K.pour][0]} into the filter`);
   if(v==='heat'&&K.heat<4)b('Heat',heatIt,'Heat the salt water');if(v==='pick'&&MIXES[K.mx])PICK.forEach((t,k)=>b(NAMES[t],()=>pickIt(k),`Use ${NAMES[t].toLowerCase()}`));
   if(v==='plan'&&PLANS[K.pl])Object.keys(NAMES).forEach(t=>b(NAMES[t],()=>planIt(t),`Next step: ${NAMES[t]}`));A.redraw()}
  function down(p){const v=kind();
   if(v==='sieve'){K.lx=p.x;K.mv=false;return true}if(v==='pour')pourIt();if(v==='heat')heatIt();
   if(v==='pick'){const k=[0,1,2].find(k=>hit(p,boxAt(k,3,A.H*.38,A.H*.26)));if(k!=null)pickIt(k)}
   if(v==='plan'){const t=Object.keys(NAMES).find((t,k)=>hit(p,boxAt(k,4,A.H*.45,A.H*.17)));if(t)planIt(t)}return false}
  function move(p){if(K.lx==null)return;K.dx+=(p.x-K.lx)/12;if(Math.abs(p.x-K.lx)>40){K.lx=p.x;K.mv=true;shakeIt()}A.redraw()}
  function up(){if(K.lx!=null&&!K.mv)shakeIt();K.lx=null}
  // ---- steps ----
  const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const auto=fs=>{const id=++K.run,gap=A.reduced()?15:300;fs.forEach((f,i)=>setTimeout(()=>{if(id===K.run)f()},i*gap))};
  const clean=()=>{K.run=(K.run||0)+1;K.next=()=>{};K.shake=0;K.pour=0;K.heat=0;K.mx=0;K.pl=0;K.done=[];K.bins=[0,0,0];K.say='';K.bad=false};
  const steps=[
   {h:'Sieve: sort by size',p:'A sieve has holes. Shake it: drag side to side on the sieve, or tap Shake.',
    predict:{q:'Gravel and sand go in the sieve. What stays in it?',opts:['The big gravel','The sand','Nothing: it all falls through'],ans:0},
    task:'Shake the sieve 3 times',show:()=>{steps[0].go();auto([shakeIt,shakeIt,shakeIt])},go:()=>{clean();sync();K.next=ready(0,()=>K.shake>=3,'Bits smaller than the holes fall through. Bigger bits stay.')}},
   {h:'Filter: tiny holes',p:'Filter paper has holes too tiny to see. Pour each mixture into the funnel.',
    predict:{q:'Salt water goes through filter paper. What drips out?',opts:['Salty water','Pure water: the salt stays on the paper'],ans:0},
    task:'Pour both mixtures',show:()=>{steps[1].go();auto([pourIt,pourIt])},go:()=>{clean();sync();K.next=ready(1,()=>K.pour>=2,'Filtering catches bits that have not dissolved. Dissolved salt goes through.')}},
   {h:'Evaporate: get it back',p:'Heat the salt water. Tap Heat, or tap the beaker, and watch the water level.',
    predict:{q:'All the water evaporates. Where is the salt?',opts:['Left in the beaker as crystals','Gone into the air with the water','Gone for ever'],ans:0},
    task:'Heat until it is dry',show:()=>{steps[2].go();auto([heatIt,heatIt,heatIt,heatIt])},go:()=>{clean();sync();K.next=ready(2,()=>K.heat>=4,'Water evaporates as a gas. Salt does not, so the crystals stay.')}},
   {h:'Pick the method',p:'Big bits: sieve. Bits that have not dissolved: filter. Dissolved: evaporate.',
    task:'Sort 6 mixtures',show:()=>{steps[3].go();auto(MIXES.map(m=>()=>pickIt(PICK.indexOf(m[2]))))},go:()=>{clean();sync();K.next=ready(3,()=>K.mx>=MIXES.length,'You chose by size and by whether the solid had dissolved.')}},
   {h:'Make a plan',p:'Some mixtures need more than one step. Tap the steps in order.',
    task:'Plan 2 separations',show:()=>{steps[4].go();auto(PLANS.flatMap(P=>P[1].map(s=>()=>planIt(s))))},go:()=>{clean();sync();K.next=ready(4,()=>K.pl>=PLANS.length,'Take out the biggest bits first, dissolve, filter, then evaporate.')}},
   {h:'Challenge',p:'',go:()=>{clean();quiz()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>K.next()});
  // ---- challenge: each wrong answer names its slip ----
  const Q=[['How do you get the sand out of sandy water?','Filter it',[['Evaporate it','heat'],['Sieve it','holes']]],
   ['How do you get salt back from salt water?','Evaporate the water',[['Filter it','through'],['Sieve it','tiny']]],
   ['You filter salt water. What is in the beaker under the funnel?','Salty water',[['Pure water','stays'],['Only salt','only']]],
   ['Salt water evaporates. What is left?','Salt crystals',[['Nothing','gone'],['Salt water','half']]],
   ['Stones, sand and salt, all dry. What is the first step?','Sieve out the stones',[['Evaporate','dry'],['Filter','wet']]],
   ['Why does sand stay on filter paper?','The grains are bigger than the holes',[['Sand is heavy','heavy'],['Sand dissolves','sol']]]];
  function slip(tag){let m='Ask: how big are the bits, and has anything dissolved?';
   if(tag==='heat')m='Evaporating would dry it out but takes heat and time. The sand has not dissolved, so filter paper catches it.';
   if(tag==='holes')m='Sand grains are smaller than a sieve’s holes and fall through with the water.';
   if(tag==='through')m='Dissolved salt passes through filter paper with the water. Only evaporating leaves it behind.';
   if(tag==='tiny')m='Dissolved salt is in bits far too tiny for any sieve.';
   if(tag==='stays')m='Filter paper cannot catch dissolved salt. The liquid that comes through is still salty.';
   if(tag==='only')m='The water goes through the paper too, so the beaker has salty water in it.';
   if(tag==='gone')m='Only the water turns into a gas. The salt does not evaporate, so it stays.';
   if(tag==='half')m='Once all the water has evaporated there is no water left, only the salt.';
   if(tag==='dry')m='There is no water to evaporate yet. Start with the biggest bits.';
   if(tag==='wet')m='Filtering needs a liquid. Sieve the dry stones out first.';
   if(tag==='heavy')m='Weight is not the reason. The paper’s holes are smaller than the grains.';
   if(tag==='sol')m='Sand does not dissolve. If it did, it would go through the paper.';return m}
  let qi=-1,row=0;
  function quiz(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
   ask.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=ask.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>score(tag,ans)});tell('Challenge: '+q);A.redraw()}
  function score(tag,ans){ask.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=ask.querySelector('.fl-fb');
   if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+row+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
  A=FK.shell(c,{steps,ratio:.62,tall:1.08,draw,onStep:A=>{ask.hidden=A.step!==5;tray.hidden=A.step===5;pads()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);ask=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
  A.start()})})();
