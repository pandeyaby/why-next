/* Flagship – life cycle of stars (ages 9–11; NC England Y5 Earth and space extended by the topic's own evidence:
   stars form in nebulae, shine by fusing hydrogen into helium, and end as white dwarfs or, if massive, as supernovae).
   Pull a nebula together until fusion starts, run the Sun's hydrogen clock, rank three stars by how long they live,
   build the two endings card by card, and sort stars by mass into white dwarf or supernova. */
(()=>{
 const LIFE=[['red dwarf','#ef4444',.45,'hundreds of billions of years',0],['the Sun','#facc15',.7,'about 10 billion years',1],['blue giant (10 Suns)','#60a5fa',1,'about 30 million years',2]];
 const CARDS=['red giant','white dwarf','red supergiant','supernova','neutron star or black hole'];
 const PATH=[['A star like the Sun',[0,1]],['A star over 8 Suns heavy',[2,3,4]]];
 const MASS=[[1,0],[20,1],[0.5,0],[12,1],[2,0],[40,1]];   // mass in Suns, ending (0 white dwarf, 1 supernova)
 VIS.reg('flagstarlife',c=>{let A,keys,qbox;
  const Z={tok:0,squeeze:0,age:0,order:[],row:0,slot:0,rows:[[],[]],mi:0,bins:[[],[]],note:'',bad:false,then:()=>{}};
  const where=()=>['born','fuel','life','end','mass','chal'][A.step];
  const fz=n=>Math.round(n*(A.narrow?1:1.12));
  const SPACE='#0b1430',STAR='#f8fafc',DIM='#cbd5e1',GOLD='#facc15',OKC='#34d399',NOC='#fca5a5',PANEL='#16224a',LINE='#94a3b8';
  function tx(g,s,x,y,n,col,w,al){g.font=`${w||800} ${fz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-12)}
  function slab(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function caption(g){if(!Z.note)return;g.font=`800 ${fz(14)}px system-ui,sans-serif`;const out=[];let cur='';((Z.bad?'✗ ':'✓ ')+Z.note).split(' ').forEach(t=>{const n=cur?cur+' '+t:t;if(cur&&g.measureText(n).width>A.W-44){out.push(cur);cur=t}else cur=n});out.push(cur);
   const lh=fz(14)+6,h=out.length*lh+14,y=A.H-h-6;slab(g,{x:12,y,w:A.W-24,h},'#ffffff',Z.bad?'#b91c1c':'#047857',3);out.forEach((l,i)=>tx(g,l,A.W/2,y+7+lh*(i+.5),14,'#172033'))}
  const announce=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
  const oops=t=>{Z.bad=true;Z.note=t;A.sound.miss();announce(t);A.redraw()};
  const good=t=>{Z.bad=false;Z.note=t;A.sound.pop()};
  function starDot(g,x,y,r,col){g.save();g.shadowColor=col;g.shadowBlur=r*.9;g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.restore();g.fillStyle=A.mix(col,'#ffffff',.55);g.beginPath();g.arc(x,y,r*.45,0,7);g.fill()}
  const SPECK=Array.from({length:70},(_,i)=>[(Math.sin(i*12.9898)*43758.5453)%1,(Math.sin(i*78.233)*12345.678)%1].map(v=>Math.abs(v)));
  // ---- layout ----
  const lifeR=k=>{const w=(A.W-36)/3;return{x:12+k*(w+6),y:A.H*.14,w,h:A.H*.44}};
  const cardR=k=>{const w=(A.W-36)/2;return k<4?{x:12+(k%2)*(w+12),y:A.H*(.44+Math.floor(k/2)*.1),w,h:fz(32)}:{x:12,y:A.H*.64,w:A.W-24,h:fz(32)}};
  const binR=k=>{const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.42,w,h:A.H*.34}};
  const pullR=()=>({x:A.W*.2,y:A.H*.66,w:A.W*.6,h:fz(46)});
  function scene(g){const v=where();
   if(v==='born'){const k=Z.squeeze,R=A.W*(.34-k*.065),cx=A.W/2,cy=A.H*.34,col=['#7c3aed','#a855f7','#f97316','#fb923c','#fde047'][k];
    SPECK.forEach(([a,b],i)=>{const ang=a*6.283,d=Math.sqrt(b)*R;g.fillStyle=A.alpha(i%3?'#c4b5fd':'#f0abfc',.55);g.beginPath();g.arc(cx+Math.cos(ang)*d,cy+Math.sin(ang)*d*.8,2+(i%3),0,7);g.fill()});
    if(k>0)starDot(g,cx,cy,fz(6+k*5),col);tx(g,['cold cloud of gas and dust','gravity pulls it in','it gets hotter','hotter still: millions of °C','fusion! a star is born'][k],A.W/2,A.H*.06,15,STAR,900);
    tx(g,`core: about ${[0,1,4,10,15][k]} million °C`,A.W/2,A.H*.6,13,DIM,800);if(k<4){const r=pullR();slab(g,r,'#7c3aed','#c4b5fd',2);tx(g,'Let gravity pull',A.W/2,r.y+r.h/2,16,STAR,900)}}
   if(v==='fuel'){const left=Math.max(0,10-Z.age)/10,cx=A.W*.3,cy=A.H*.33,r=fz(48);starDot(g,cx,cy,Z.age>=10?fz(70):r,Z.age>=10?'#f87171':GOLD);
    const bx=A.W*.58,bw=A.W*.34,by=A.H*.12,bh=A.H*.42;slab(g,{x:bx,y:by,w:bw,h:bh},PANEL,LINE,2);g.fillStyle='#60a5fa';g.fillRect(bx+4,by+4+(bh-8)*(1-left),bw-8,(bh-8)*left);g.fillStyle='#a3e635';g.fillRect(bx+4,by+4,bw-8,(bh-8)*(1-left));
    tx(g,left>0.15?'hydrogen left':'no hydrogen',bx+bw/2,by+4+(bh-8)*(1-left/2),11,left>0.4?'#0b1430':'#f8fafc',900);if(left<.95)tx(g,'helium made',bx+bw/2,by+4+(bh-8)*(1-left)/2,11,'#0b1430',900);
    tx(g,`Sun's age: ${Z.age} billion years`,A.W/2,A.H*.62,16,STAR,900);tx(g,Z.age>=10?'Core hydrogen used up: it swells into a red giant.':Z.age===4?'Now: about 4.6 billion years old, about halfway.':'Hydrogen fuses into helium in the core.',A.W/2,A.H*.69,13,DIM,800)}
   if(v==='life'){tx(g,'Tap the star that lives longest, then the next.',A.W/2,A.H*.06,13,STAR,800);LIFE.forEach((s,k)=>{const r=lifeR(k);slab(g,r,PANEL,Z.order.includes(k)?OKC:LINE,2);starDot(g,r.x+r.w/2,r.y+r.h*.38,fz(8+s[2]*22),s[1]);tx(g,s[0],r.x+r.w/2,r.y+r.h*.78,A.narrow?11:13,STAR,900);
     const at=Z.order.indexOf(k);if(at>=0){tx(g,['1st: longest','2nd','3rd: shortest'][at],r.x+r.w/2,r.y+fz(12),11,OKC,900)}});
    if(Z.order.length)Z.order.forEach((k,i)=>tx(g,`${i+1}. ${LIFE[k][0]}: ${LIFE[k][3]}`,A.W/2,A.H*(.64+i*.05),12,DIM,800))}
   if(v==='end'){PATH.forEach(([name,want],r)=>{const y=A.H*(.04+r*.22);tx(g,name,14,y+fz(10),13,r===Z.row?GOLD:DIM,900,'left');const w=(A.W-28-(want.length-1)*6)/want.length;
     want.forEach((cid,i)=>{const q={x:14+i*(w+6),y:y+fz(22),w,h:fz(36)},got=Z.rows[r][i];slab(g,q,got!=null?'#1e3a5f':PANEL,got!=null?OKC:LINE,2);tx(g,got!=null?CARDS[got]:'?',q.x+q.w/2,q.y+q.h/2,A.narrow?10:12,STAR,800)})});
    if(Z.row<2)CARDS.forEach((t,k)=>{const q=cardR(k);slab(g,q,'#ffffff','#475569',2);tx(g,t,q.x+q.w/2,q.y+q.h/2,A.narrow?13:14,'#172033',900)});else tx(g,'Light stars fade. Heavy stars explode.',A.W/2,A.H*.55,15,STAR,900)}
   if(v==='mass'){const M=MASS[Z.mi];if(M){starDot(g,A.W/2,A.H*.16,fz(Math.min(34,8+Math.sqrt(M[0])*5)),M[0]>=8?'#60a5fa':M[0]>=1?GOLD:'#f97316');tx(g,`${M[0]} × the Sun's mass`,A.W/2,A.H*.32,16,STAR,900)}else tx(g,'All sorted!',A.W/2,A.H*.2,18,OKC,900);
    [['ends as a white dwarf',Z.bins[0]],['ends in a supernova',Z.bins[1]]].forEach(([t,list],k)=>{const q=binR(k);slab(g,q,PANEL,k?'#60a5fa':GOLD,2.5);tx(g,t,q.x+q.w/2,q.y+fz(16),A.narrow?12:14,STAR,900);list.forEach((m,i)=>tx(g,`${m} Suns`,q.x+q.w/2,q.y+fz(40)+i*fz(20),14,DIM,800))})}}
  function draw(A){const g=A.ctx;g.fillStyle=SPACE;g.fillRect(0,0,A.W,A.H);SPECK.forEach(([a,b],i)=>{if(i%2)return;g.fillStyle='rgba(255,255,255,.35)';g.fillRect(a*A.W,b*A.H,1.5,1.5)});
   if(where()==='chal')tx(g,'Cloud → star → giant → white dwarf or supernova',A.W/2,A.H/2,13,STAR);else scene(g);caption(g);A.fx.draw(g)}
  // ---- moves ----
  function pull(){if(Z.squeeze>=4)return;Z.squeeze++;good(Z.squeeze<4?'Gravity pulls the gas closer. Squeezed gas gets hotter.':'Hot enough! Hydrogen nuclei fuse into helium and give out light. A star is born.');refresh()}
  function ageOn(){if(Z.age>=10)return;Z.age+=2;good(Z.age>=10?'10 billion years: the core hydrogen is used up.':`${Z.age} billion years: ${10-Z.age} billion years of hydrogen left.`);refresh()}
  function rank(k){if(Z.order.includes(k)||Z.order.length>=3)return;const want=Z.order.length;if(k!==want)return oops(k>want?(k===2?'The blue giant has the most fuel but burns it fastest. It dies first.':'The Sun lives about 10 billion years. A red dwarf sips its fuel for far longer.'):'Already placed.');Z.order.push(k);good(`${LIFE[k][0]}: ${LIFE[k][3]}.`);refresh()}
  function place(k){if(Z.row>1)return;const [,want]=PATH[Z.row],need=want[Z.slot];
   if(k!==need){let m=`Not next for this star.`;if(Z.row===0&&(k===3||k===4||k===2))m='The Sun is not heavy enough for that. Only stars over about 8 Suns explode.';else if(Z.row===1&&(k===0||k===1))m='A heavy star swells into a red supergiant and explodes. It does not end as a white dwarf.';else m=Z.slot===0?'First the star runs out of hydrogen and swells up.':'Check the order: swell up first, then the ending.';return oops(m)}
   Z.rows[Z.row].push(k);good(`${PATH[Z.row][0]}: ${Z.rows[Z.row].map(i=>CARDS[i]).join(' → ')}.`);Z.slot++;if(Z.slot>=want.length){Z.row++;Z.slot=0}refresh()}
  function sortStar(k){const M=MASS[Z.mi];if(!M)return;if(k!==M[1])return oops(M[1]?`A star of ${M[0]} Suns is over 8 Suns heavy, so it explodes as a supernova.`:`A star of ${M[0]} Sun${M[0]===1?'':'s'} is lighter than 8 Suns, so it swells, puffs off its outside and fades as a white dwarf.`);Z.bins[k].push(M[0]);good(`${M[0]} Suns → ${k?'supernova':'white dwarf'}.`);Z.mi++;refresh()}
  function refresh(){const v=where();let s='';
   if(v==='born')s=`Gas cloud squeezed ${Z.squeeze} of 4 times. Core about ${[0,1,4,10,15][Z.squeeze]} million degrees.`;
   else if(v==='fuel')s=`Sun's age ${Z.age} billion years. ${Math.max(0,10-Z.age)} billion years of hydrogen left.`;
   else if(v==='life')s=Z.order.length<3?`Placed ${Z.order.length} of 3. Pick the star that lives longest of those left.`:'Red dwarf longest, blue giant shortest.';
   else if(v==='end')s=Z.row<2?`${PATH[Z.row][0]}: choose stage ${Z.slot+1}.`:'Both endings built.';
   else if(v==='mass')s=MASS[Z.mi]?`Star of ${MASS[Z.mi][0]} Suns. White dwarf or supernova?`:'All six sorted.';else s='Challenge.';
   announce((Z.note?Z.note+' ':'')+s);controls();Z.then()}
  function controls(){if(!keys)return;keys.innerHTML='';const v=where(),add=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);e.onclick=f};
   if(v==='born'&&Z.squeeze<4)add('Let gravity pull',pull,'Let gravity pull the cloud in');
   if(v==='fuel'&&Z.age<10)add('+2 billion years',ageOn,'Move time on 2 billion years');
   if(v==='life'&&Z.order.length<3)LIFE.forEach((s,k)=>{if(!Z.order.includes(k))add(s[0],()=>rank(k),`${s[0]} lives longest of those left`)});
   if(v==='end'&&Z.row<2)CARDS.forEach((t,k)=>add(t,()=>place(k),`Next stage: ${t}`));
   if(v==='mass'&&MASS[Z.mi]){add('white dwarf',()=>sortStar(0),`${MASS[Z.mi][0]} Suns ends as a white dwarf`);add('supernova',()=>sortStar(1),`${MASS[Z.mi][0]} Suns ends in a supernova`)}A.redraw()}
  function down(p){const v=where();
   if(v==='born'&&(within(p,pullR())||p.y<A.H*.58))pull();
   if(v==='fuel'&&p.y<A.H*.6)ageOn();
   if(v==='life'){const k=[0,1,2].find(k=>within(p,lifeR(k)));if(k!=null)rank(k)}
   if(v==='end'&&Z.row<2){const k=[0,1,2,3,4].find(k=>within(p,cardR(k)));if(k!=null)place(k)}
   if(v==='mass'){const k=[0,1].find(k=>within(p,binR(k)));if(k!=null)sortStar(k)}return false}
  // ---- steps ----
  const doneWhen=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const replay=list=>{const id=++Z.tok,gap=A.reduced()?15:330;list.forEach((f,i)=>setTimeout(()=>{if(id===Z.tok)f()},i*gap))};
  const fresh=()=>{Z.tok++;Z.then=()=>{};Z.squeeze=0;Z.age=0;Z.order=[];Z.row=0;Z.slot=0;Z.rows=[[],[]];Z.mi=0;Z.bins=[[],[]];Z.note='';Z.bad=false};
  const steps=[
   {h:'Born in a cloud',p:'Stars begin in a nebula: a huge cloud of gas and dust. Gravity pulls it together. Tap to let gravity pull.',
    predict:{q:'What turns a cloud of gas into a star?',opts:['It catches fire, like a bonfire','Gravity squeezes it until it is hot enough to fuse'],ans:1},
    task:'Squeeze the cloud 4 times',show:()=>{steps[0].go();replay([pull,pull,pull,pull])},go:()=>{fresh();refresh();Z.then=doneWhen(0,()=>Z.squeeze>=4,'At about 15 million °C, hydrogen fuses into helium. That makes the star shine. It is not fire.')}},
   {h:'Fuel in the core',p:'A star shines by fusing hydrogen into helium in its core. Move time on and watch the Sun\'s fuel.',
    task:'Run the Sun to 10 billion years',show:()=>{steps[1].go();replay([ageOn,ageOn,ageOn,ageOn,ageOn])},go:()=>{fresh();refresh();Z.then=doneWhen(1,()=>Z.age>=10,'The Sun is about 4.6 billion years old: about halfway through its hydrogen.')}},
   {h:'Big stars live fast',p:'Bigger stars have more fuel. But they burn it much faster. Rank the stars from longest life to shortest.',
    predict:{q:'A star 10 times heavier than the Sun has more fuel. Does it live longer?',opts:['Yes: more fuel, longer life','No: it burns so fast it dies sooner'],ans:1},
    task:'Rank 3 stars',show:()=>{steps[2].go();replay([0,1,2].map(k=>()=>rank(k)))},go:()=>{fresh();refresh();Z.then=doneWhen(2,()=>Z.order.length>=3,'Small stars live longest. The heaviest stars live only millions of years.')}},
   {h:'Two endings',p:'When the hydrogen runs out, the star swells up. What happens next depends on its mass. Tap the stages in order.',
    task:'Build both endings',show:()=>{steps[3].go();replay(PATH.flatMap(([,w])=>w.map(k=>()=>place(k))))},go:()=>{fresh();refresh();Z.then=doneWhen(3,()=>Z.row>=2,'Sun-like: red giant, then white dwarf. Heavy: red supergiant, supernova, neutron star or black hole.')}},
   {h:'Which ending?',p:'Stars over about 8 times the Sun\'s mass explode. Lighter ones fade as white dwarfs. Sort each star.',
    predict:{q:'Will our Sun explode as a supernova one day?',opts:['Yes: every star explodes','No: it is too light. It will be a white dwarf'],ans:1},
    task:'Sort 6 stars',show:()=>{steps[4].go();replay(MASS.map(M=>()=>sortStar(M[1])))},go:()=>{fresh();refresh();Z.then=doneWhen(4,()=>Z.mi>=MASS.length,'Mass decides the ending. Supernova dust makes new nebulae, new stars and planets.')}},
   {h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>Z.then()});
  // ---- challenge: every wrong option names the slip ----
  const Q=[['Where are stars born?','in nebulae: clouds of gas and dust',[['inside black holes','end'],['on the surface of planets','planet']]],
   ['What makes a star shine?','hydrogen fusing into helium in its core',[['it is on fire, burning like wood','fire'],['it reflects light from the Sun','reflect']]],
   ['Which star lives longest?','a small red dwarf',[['a huge blue giant','fuel'],['they all live the same time','same']]],
   ['How will the Sun end?','as a red giant, then a white dwarf',[['in a supernova','heavy'],['it will never end','forever']]],
   ['A star is 20 times the Sun\'s mass. How does it end?','in a supernova',[['as a white dwarf','light'],['it turns into a planet','planet']]],
   ['What is left after a supernova?','a neutron star or a black hole',[['a white dwarf','light'],['a red dwarf','fuel']]]];
  function slip(tag){let m='Mass decides how a star lives and how it ends.';
   if(tag==='fire')m='Stars are not on fire. Gravity squeezes the core so hot that hydrogen fuses into helium.';
   if(tag==='reflect')m='Planets and moons reflect light. Stars make their own light by fusion.';
   if(tag==='fuel')m='Big stars have more fuel but burn it far faster, so they live the shortest lives.';
   if(tag==='same')m='Lifetimes range from millions to hundreds of billions of years, set by mass.';
   if(tag==='heavy')m='Only stars over about 8 Suns explode. The Sun will swell, then fade as a white dwarf.';
   if(tag==='light')m='Over about 8 Suns heavy means a supernova. White dwarfs come from lighter stars.';
   if(tag==='forever')m='The Sun\'s hydrogen will run out in about 5 billion years.';
   if(tag==='end')m='Black holes are an ending, not a birthplace. Stars start in clouds of gas and dust.';
   if(tag==='planet')m='Planets form around stars. Stars start in clouds of gas and dust.';
   return m}
  let qi=-1,row=0;
  function quiz(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,ord=all.slice(k).concat(all.slice(0,k));
   qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=qbox.querySelector('.fl-pick');ord.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>score(tag,ans)});announce('Challenge: '+q);A.redraw()}
  function score(tag,ans){qbox.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=qbox.querySelector('.fl-fb');
   if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+row+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
  A=FK.shell(c,{steps,ratio:.62,tall:1,draw,onStep:A=>{qbox.hidden=A.step!==5;keys.hidden=A.step===5;controls()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Star buttons'},w);qbox=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
  A.start()})})();
