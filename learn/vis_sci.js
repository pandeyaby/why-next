/* Why Next? visuals for science sorting and reactions: a card sorter (drag or tap a card, then a box), a pH scale with
   universal-indicator colours, and an energy profile for exothermic and endothermic reactions. */
(()=>{const nf=VIS.nf;
VIS.reg('sorter',c=>{const o=c.opts,bins=o.bins,items=o.items.map(([t,k],i)=>({t,k,i,at:-1}));let picked=null,checked=false;
 const wrap=c.el('div',{class:'vis-sort',style:`grid-template-columns:repeat(${bins.length},minmax(0,1fr))`},c.stage),tray=c.el('div',{class:'vis-tray',role:'group','aria-label':'Cards to sort'},wrap);
 const boxes=bins.map((b,j)=>{const d=c.el('div',{class:'vis-bin',role:'group','aria-label':b},wrap);c.el('div',{class:'vis-binh'},d,b);
  const put=c.el('button',{type:'button',class:'lbtn sm ghost vis-put','aria-label':'Put the chosen card in '+b},d,'Put here');put.onclick=()=>place(j);d.dataset.j=j;return d});
 const cards=items.map(it=>{const b=c.el('button',{type:'button',class:'vis-card','aria-pressed':'false'},tray,it.t);b.onclick=()=>{if(b.dataset.dragged){delete b.dataset.dragged;return}pick(it)};drag(b,it);return b});
 function pick(it){picked=picked===it?null:it;cards.forEach((b,i)=>b.setAttribute('aria-pressed',picked&&picked.i===i));draw()}
 function place(j,it=picked){if(!it)return;it.at=j;picked=null;checked=false;cards.forEach(b=>b.setAttribute('aria-pressed','false'));draw()}
 function drag(b,it){let sx,sy,on=false;b.style.touchAction='none';
  b.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;on=false;b.setPointerCapture(e.pointerId)});
  b.addEventListener('pointermove',e=>{if(!b.hasPointerCapture(e.pointerId))return;const dx=e.clientX-sx,dy=e.clientY-sy;if(!on&&Math.hypot(dx,dy)>6){on=true;b.classList.add('vis-grab')}if(on)b.style.transform=`translate(${dx}px,${dy}px)`});
  b.addEventListener('pointerup',e=>{if(!b.hasPointerCapture(e.pointerId))return;b.releasePointerCapture(e.pointerId);b.style.transform='';b.classList.remove('vis-grab');
   if(on){b.dataset.dragged=1;b.style.visibility='hidden';const t=document.elementFromPoint(e.clientX,e.clientY);b.style.visibility='';const d=t&&t.closest('.vis-bin,.vis-tray');
    if(d&&d.classList.contains('vis-bin'))place(+d.dataset.j,it);else if(d){it.at=-1;draw()}}})}
 function draw(){items.forEach((it,i)=>{const b=cards[i];(it.at<0?tray:boxes[it.at]).insertBefore(b,it.at<0?null:boxes[it.at].querySelector('.vis-put'));
   b.classList.toggle('ok',checked&&it.at===it.k);b.classList.toggle('bad',checked&&it.at>=0&&it.at!==it.k);b.setAttribute('aria-label',it.t+(checked&&it.at>=0?(it.at===it.k?', correct':', not this box'):''))});
  const n=items.filter(i=>i.at>=0).length,ok=items.filter(i=>i.at===i.k).length;
  c.say(checked?`${ok} of ${items.length} in the right box.${ok===items.length?' All sorted!':' '+items.filter(i=>i.at!==i.k).map(i=>`“${i.t}” belongs in ${bins[i.k]}`).slice(0,2).join('; ')+'.'}`
   :`${n} of ${items.length} cards sorted.${picked?` Chosen: “${picked.t}”. Now press “Put here” under a box.`:' Choose a card (tap or drag it), then a box.'}`)}
 c.btn('Check',()=>{checked=true;draw()});c.btn('Start again',()=>{items.forEach(i=>i.at=-1);checked=false;picked=null;draw()},'ghost');c.cueEl=[wrap];draw()});
const UI=['#ee1c25','#f05a28','#f78d2b','#fbb931','#fdea0e','#d0df2f','#7cc242','#21b14b','#1c9a4a','#0b8f6c','#2fb7c5','#3c7fc1','#4153a2','#5c3c93','#462c83'];
const EX=['battery acid','stomach acid','lemon juice','vinegar','orange juice','black coffee','milk','pure water','sea water','baking soda','indigestion tablets','soapy water','ammonia cleaner','bleach','oven cleaner'];
VIS.reg('phscale',c=>{const o=c.opts;let ph=o.ph??7;const W=440,H=150,s=c.svg(W,H,'pH scale with universal indicator colours'),cw=(W-20)/15;
 UI.forEach((col,i)=>{c.el('rect',{x:10+i*cw,y:20,width:cw,height:30,fill:col},s);c.el('text',{x:10+(i+.5)*cw,y:66,'text-anchor':'middle',class:'vis-lab'},s,i)});
 c.el('text',{x:10,y:14,class:'vis-lab b'},s,'acid');c.el('text',{x:W/2,y:14,'text-anchor':'middle',class:'vis-lab b'},s,'neutral');c.el('text',{x:W-10,y:14,'text-anchor':'end',class:'vis-lab b'},s,'alkali');
 const ptr=c.el('polygon',{class:'vis-handle'},s),bk=c.el('path',{d:'M170 80 L170 140 Q170 146 176 146 L264 146 Q270 146 270 140 L270 80',class:'vis-beaker'},s),liq=c.el('rect',{x:172,y:98,width:96,height:46,class:'vis-liq'},s);
 const draw=()=>{const x=10+(ph+.5)*cw;ptr.setAttribute('points',`${x-9},88 ${x+9},88 ${x},72`);liq.setAttribute('fill',UI[ph]);
  const kind=ph<7?(ph<3?'strongly acidic':'acidic'):ph>7?(ph>11?'strongly alkaline':'alkaline'):'neutral';
  c.say(`pH ${ph}: ${kind}. Universal indicator turns ${['red','red','orange-red','orange','yellow','yellow-green','green-yellow','green','green','blue-green','blue-green','blue','blue','violet','purple'][ph]}. Example: ${EX[ph]}.${ph===7?' An acid and an alkali that cancel out make a neutral salt solution and water.':''}`);sync()};
 const sync=c.kslider(ptr,'pH',()=>ph,v=>{ph=v;draw()},0,14,1,v=>`pH ${v}`);c.drag(ptr,s,X=>{ph=Math.max(0,Math.min(14,Math.floor((X-10)/cw)));draw()});
 c.btn('Add acid',()=>{ph=Math.max(0,ph-1);draw()});c.btn('Add alkali',()=>{ph=Math.min(14,ph+1);draw()});c.cueEl=[ptr,liq];draw()});
VIS.reg('energy',c=>{const o=c.opts;let dh=o.dh??-40;const W=440,H=260,s=c.svg(W,H,'Reaction energy profile'),y0=150,k=1.4,act=o.ea??50;
 c.el('line',{x1:40,y1:20,x2:40,y2:H-20,class:'vis-axis'},s);c.el('line',{x1:40,y1:H-20,x2:W-90,y2:H-20,class:'vis-axis'},s);
 c.el('text',{x:16,y:140,class:'vis-lab',transform:'rotate(-90 16 140)','text-anchor':'middle'},s,'energy');c.el('text',{x:200,y:H-4,'text-anchor':'middle',class:'vis-lab'},s,'progress of reaction');
 c.el('line',{x1:120,x2:346,y1:y0,y2:y0,class:'vis-guide'},s);const path=c.el('path',{class:'vis-curve'},s),arr=c.el('line',{class:'vis-rise',x1:342,x2:342},s),lab=c.el('text',{x:347,class:'vis-lab b'},s),h=c.el('rect',{x:250,width:80,height:12,rx:4,class:'vis-handle'},s);
 c.el('text',{x:58,y:y0-8,class:'vis-lab'},s,o.reactants||'reactants');const pl=c.el('text',{x:258,class:'vis-lab'},s);
 const th=c.el('rect',{x:W-30,y:30,width:14,height:180,rx:7,class:'vis-thermo'},s),tl=c.el('rect',{x:W-27,width:8,class:'vis-liqr'},s);c.el('circle',{cx:W-23,cy:216,r:12,class:'vis-bulb'},s);
 const draw=()=>{const yp=y0-dh*k,top=Math.min(y0,yp)-act*k;path.setAttribute('d',`M50 ${y0} L120 ${y0} C170 ${y0} 170 ${top} 200 ${top} S230 ${yp} 260 ${yp} L330 ${yp}`);
  h.setAttribute('y',yp-6);arr.setAttribute('y1',y0);arr.setAttribute('y2',yp);lab.setAttribute('y',(y0+yp)/2+4);lab.textContent=`${dh<0?'−':'+'}${Math.abs(dh)} kJ`;pl.setAttribute('y',yp-10);pl.textContent=o.products||'products';
  const lv=120+dh*-1.1;tl.setAttribute('y',lv);tl.setAttribute('height',212-lv);
  c.say(dh<0?`Exothermic: the products have ${-dh} kJ less energy than the reactants. That energy goes out to the surroundings, so the temperature rises (the thermometer goes up). Examples: burning, neutralisation, hand warmers.`
   :dh>0?`Endothermic: the products have ${dh} kJ more energy than the reactants. Energy is taken in from the surroundings, so the temperature falls (the thermometer goes down). Examples: thermal decomposition, sherbet fizzing, sports cold packs.`
   :'The products have the same energy as the reactants, so the temperature would not change.');sync()};
 const sync=c.kslider(h,'Products energy level',()=>dh,v=>{dh=v;draw()},-80,80,10,v=>`${v} kJ`);c.drag(h,s,(X,Y)=>{dh=Math.max(-80,Math.min(80,Math.round((y0-Y)/k/10)*10));draw()});
 c.btn('Exothermic example',()=>{dh=-60;draw()});c.btn('Endothermic example',()=>{dh=40;draw()});c.cueEl=[arr,tl];draw()});
})();
