/* Flagship – hygiene: washing away germs (ages 6–7): touch things with a germy hand and watch germs spread to them; try
   water only (some germs stay) and then soap and scrubbing (they lift off); scrub every part of the hands for 20 seconds;
   sort moments into wash your hands or no need; and try three ways to sneeze to see which catches the germs.
   The Challenge targets the usual slips: you can see germs, clean-looking hands have no germs, water alone is enough,
   a quick rinse is enough, and sneezing into your hands is fine. */
(()=>{
const THINGS=[['door handle','🚪'],['toy','🧸'],['apple','🍎'],['friend','🧒']];
const PARTS=['palms','backs','between fingers','thumbs','nails'];
const WHEN=[['Before you eat','🍽️',0],['After the toilet','🚽',0],['Reading a book','📖',1],['After stroking a pet','🐶',0],['Watching TV','📺',1],['After playing outside','🌳',0]];
const SNEEZE=[['air','Into the air'],['hands','Into your hands'],['tissue','Into a tissue']];
const SKIN='#f2c29b',GERM='#16a34a';
VIS.reg('flagsoap',c=>{let A,keys,box,qk=-1,good=0;c.fig.classList.add('young');const T={};
const part=()=>['spread','soap','scrub','when','sneeze','quiz'][A.step];
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const sz=n=>Math.round(n*(A.narrow?1:1.2));
function write(g,s,x,y,n,w){g.font=`${w||800} ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-14)}
function emo(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function card(g,r,col,a,line){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.lineWidth=line||2;g.strokeStyle=A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.stroke()}
/* a germ: a green blob with little spikes; positions come from a fixed pattern so they do not jump */
function germ(g,x,y,r){g.strokeStyle=GERM;g.lineWidth=2;for(let k=0;k<6;k++){const a=k*Math.PI/3;g.beginPath();g.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r);g.lineTo(x+Math.cos(a)*r*1.6,y+Math.sin(a)*r*1.6);g.stroke()}
 g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=GERM;g.fill();g.lineWidth=1.5;g.strokeStyle=A.col.tx;g.stroke()}
const spot=(i,r)=>{const a=i*2.4,d=.08+.28*((i*37)%10)/10;return[r.x+r.w*(.5+Math.cos(a)*d),r.y+r.h*(.5+Math.sin(a)*d)]};
function hand(g,cx,cy,s){g.fillStyle=SKIN;g.strokeStyle=A.col.tx;g.lineWidth=2.5;A.paint.rrect(cx-s*.5,cy-s*.2,s,s*.75,s*.2);g.fill();g.stroke();
 for(let f=0;f<4;f++){A.paint.rrect(cx-s*.48+f*s*.25,cy-s*.75,s*.2,s*.62,s*.1);g.fill();g.stroke()}g.save();g.translate(cx+s*.5,cy+s*.05);g.rotate(-.6);A.paint.rrect(-s*.1,-s*.45,s*.2,s*.5,s*.1);g.fill();g.stroke();g.restore()}
function handGerms(g,cx,cy,s,n){for(let i=0;i<n;i++){const a=i*2.4,d=s*(.1+.28*((i*37)%10)/10);germ(g,cx+Math.cos(a)*d,cy+s*.15+Math.sin(a)*d*.8,s*.035+2)}}
const thingR=i=>{const gap=10,w=(A.W-gap*5)/4;return{x:gap+i*(w+gap),y:A.H*.62,w,h:A.H*.3}};
const partR=i=>{const cols=A.narrow?2:3,gap=10,w=(A.W-gap*(cols+1))/cols,h=A.H*(A.narrow?.24:.33);return{x:gap+(i%cols)*(w+gap),y:A.H*.2+Math.floor(i/cols)*(h+gap),w,h}};
const binR=b=>{const gap=12,w=(A.W-gap*3)/2;return{x:gap+b*(w+gap),y:A.H*.46,w,h:A.H*.5}};
const choiceR=i=>{const gap=10,w=(A.W-gap*4)/3;return{x:gap+i*(w+gap),y:A.H*.14,w,h:A.H*.8}};
function render(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){write(g,'Germs are too small to see.',W/2,H*.3,17);write(g,'Soap and scrubbing wash them off.',W/2,H*.48,16);write(g,'Catch sneezes in a tissue.',W/2,H*.66,16);return}
 if(v==='spread'){const s=Math.min(W*.3,H*.42);hand(g,W/2,H*.32,s);handGerms(g,W/2,H*.32,s,10);write(g,`Germs on your hand. Touched ${T.touched.length} of 4`,W/2,H*.05,14);
  THINGS.forEach(([n,e],i)=>{const r=thingR(i),hit=T.touched.includes(i);card(g,r,hit?C.rd:C.cy,hit?.18:.08,i===T.cur?4:2);emo(g,e,r.x+r.w/2,r.y+r.h*.42,Math.min(36,r.h*.4));write(g,n,r.x+r.w/2,r.y+r.h*.84,11,700);
   if(hit)for(let j=0;j<4;j++){const p=spot(j+i,{x:r.x,y:r.y,w:r.w,h:r.h*.7});germ(g,p[0],p[1],4)}});return A.fx.draw(g)}
 if(v==='soap'){const s=Math.min(W*.36,H*.5);hand(g,W/2,H*.42,s);handGerms(g,W/2,H*.42,s,T.germs);
  if(T.bub>0)for(let i=0;i<14;i++){const a=i*1.9,d=s*(.15+.3*((i*53)%10)/10);g.beginPath();g.arc(W/2+Math.cos(a)*d,H*.42+s*.1+Math.sin(a)*d*.7,6+3*(i%3),0,7);g.fillStyle=A.alpha('#e0f2fe',.6*T.bub);g.fill();g.lineWidth=1;g.strokeStyle=A.alpha(C.tx,.4*T.bub);g.stroke()}
  write(g,T.germs?`Germs left: ${T.germs}`:'All clean!',W/2,H*.06,16);write(g,T.water?'Water only got some off.':'Try water first, then soap.',W/2,H*.92,12,700);return A.fx.draw(g)}
 if(v==='scrub'){write(g,`Scrubbing: ${T.secs} of 20 seconds`,W/2,H*.06,15);g.fillStyle=A.alpha(C.cy,.7);g.fillRect(W*.1,H*.11,W*.8*Math.min(1,T.secs/20),10);g.lineWidth=2;g.strokeStyle=C.tx;g.strokeRect(W*.1,H*.11,W*.8,10);
  PARTS.forEach((p,i)=>{const r=partR(i),n=T.left[i];card(g,r,n?C.or:C.gr,n?.1:.25,i===T.cur?4:2);write(g,p,r.x+r.w/2,r.y+r.h*.82,12,800);
   for(let j=0;j<n;j++){const q=spot(j+i*3,{x:r.x,y:r.y,w:r.w,h:r.h*.7});germ(g,q[0],q[1],5)}if(!n)write(g,'✓ clean',r.x+r.w/2,r.y+r.h*.4,13)});return A.fx.draw(g)}
 if(v==='when'){const it=WHEN[Math.min(T.round,WHEN.length-1)];if(T.round<WHEN.length){emo(g,it[1],W/2,H*.18,Math.min(54,H*.16));write(g,it[0],W/2,H*.36,17)}else write(g,'All sorted!',W/2,H*.25,18);
  ['🧼 Wash hands','No need'].forEach((t,b)=>{const r=binR(b);card(g,r,b?C.mu:C.cy,.1);write(g,t,r.x+r.w/2,r.y+22,13);T.sorted.filter(x=>x[1]===b).forEach((x,j)=>write(g,WHEN[x[0]][0],r.x+r.w/2,r.y+50+j*sz(18),10,600))});return A.fx.draw(g)}
 if(v==='sneeze'){write(g,`Tried ${T.tried.length} of 3 ways`,W/2,H*.06,14);SNEEZE.forEach(([k,lab],i)=>{const r=choiceR(i),done=T.tried.includes(k);card(g,r,done?(k==='tissue'?C.gr:C.rd):C.cy,done?.16:.06,T.cur===k?4:2);
  emo(g,'🤧',r.x+r.w/2,r.y+r.h*.25,Math.min(40,r.w*.4));write(g,lab,r.x+r.w/2,r.y+r.h*.9,11,800);
  if(done){const n=k==='air'?12:k==='hands'?6:0;for(let j=0;j<n;j++){const q=spot(j*2+1,{x:r.x,y:r.y+r.h*.38,w:r.w,h:r.h*.28});germ(g,q[0],q[1],4)}
   write(g,k==='tissue'?'Caught! Bin it.':k==='hands'?'On your hands':'Everywhere!',r.x+r.w/2,r.y+r.h*.78,11,800)}});return A.fx.draw(g)}}
/* step 0 */
function touch(i){if(T.touched.includes(i))return;T.cur=i;T.touched.push(i);A.sound.pop();voice(`You touched the ${THINGS[i][0]}. Some germs moved onto it.`+(T.touched.length<4?'':' Germs spread to everything you touch!'));A.redraw();keyPad();T.want()}
/* step 1 */
function wash(soap){if(T.busy||!T.germs)return;T.busy=1;A.sound.whoosh();const me=T.run;
 if(!soap){T.water=1;const n=T.germs>8?T.germs-2:T.germs;T.germs=n;T.busy=0;voice(n>8?'Water only. A few germs came off.':'Water only again. These germs are stuck on. Water alone cannot lift them.');A.redraw();return keyPad()}
 T.bub=1;T.germs=Math.max(0,T.germs-4);A.tween(T,{bub:0},A.reduced()?1:500,'io',()=>{if(me!==T.run)return;T.busy=0;A.redraw()});
 voice(T.germs?`Soap and scrub! ${T.germs} germs left. Keep going.`:'All clean! Soap lifts germs off, and the water rinses them away.');if(!T.germs)A.sound.pop();A.redraw();keyPad();T.want()}
/* step 2 */
function scrub(i){if(!T.left[i])return;T.cur=i;T.left[i]--;T.secs=Math.min(20,T.secs+2);A.sound.tick();
 voice(T.left[i]?`Scrubbing the ${PARTS[i]}.`:`The ${PARTS[i]} are clean.`+(T.left.every(x=>!x)?' Every part, 20 seconds. Now rinse!':''));A.redraw();keyPad();T.want()}
/* step 3 */
function sortAs(b){if(T.round>=WHEN.length)return;const[name,,ans]=WHEN[T.round];
 if(b!==ans){A.sound.miss();voice(ans?`${name} does not spread germs to your food or mouth. No need to wash.`:`${name}: germs can get on your hands or into your food. Wash your hands!`);return}
 T.sorted.push([T.round,b]);T.round++;A.sound.pop();voice(b?'Yes, no need.':'Yes, wash your hands.');A.redraw();keyPad();T.want()}
/* step 4 */
function sneeze(k){T.cur=k;if(!T.tried.includes(k))T.tried.push(k);A.sound.whoosh();
 voice(k==='air'?'Achoo! Germs fly out onto everyone near you.':k==='hands'?'Achoo! The germs are on your hands now. You would spread them to what you touch.':'Achoo! The tissue catches the germs. Bin it, then wash your hands.');A.redraw();keyPad();T.want()}
function keyPad(){if(!keys)return;keys.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};
 if(v==='spread')THINGS.forEach(([n],i)=>{if(!T.touched.includes(i))B('Touch '+n,()=>touch(i),'Touch the '+n)});
 if(v==='soap'&&T.germs){B('Water only',()=>wash(0),'Rinse with water only');B('Soap and scrub',()=>wash(1),'Wash with soap and scrub')}
 if(v==='scrub')PARTS.forEach((p,i)=>{if(T.left[i])B(p[0].toUpperCase()+p.slice(1),()=>scrub(i),'Scrub the '+p)});
 if(v==='when'&&T.round<WHEN.length){B('🧼 Wash hands',()=>sortAs(0),'Sort it as wash your hands');B('No need',()=>sortAs(1),'Sort it as no need to wash')}
 if(v==='sneeze')SNEEZE.forEach(([k,lab])=>B(lab,()=>sneeze(k),'Sneeze '+lab.toLowerCase()))}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function grab(p){const v=part();
 if(v==='spread')THINGS.forEach((t,i)=>{if(inR(p,thingR(i)))touch(i)});
 if(v==='soap')wash(p.x>A.W/2?1:0);
 if(v==='scrub'){PARTS.forEach((q,i)=>{if(inR(p,partR(i)))scrub(i)});return true}
 if(v==='when')[0,1].forEach(b=>{if(inR(p,binR(b)))sortAs(b)});
 if(v==='sneeze')SNEEZE.forEach(([k],i)=>{if(inR(p,choiceR(i)))sneeze(k)});return false}
/* rubbing across a part keeps scrubbing it */
let rub=0;function slide(p){if(part()!=='scrub'||++rub%6)return;PARTS.forEach((q,i)=>{if(inR(p,partR(i)))scrub(i)})}
const okWhen=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function chain(list){const me=(T.run=(T.run||0)+1);let j=0;(function go(){if(me!==T.run||j>=list.length)return;const[f,ms]=list[j++];f();setTimeout(go,A.reduced()?40:ms)})()}
function clean(){const r=(T.run||0)+1;Object.keys(T).forEach(k=>delete T[k]);Object.assign(T,{run:r,want:()=>{},touched:[],cur:null,germs:12,water:0,bub:0,busy:0,left:[2,2,2,2,2],secs:0,round:0,sorted:[],tried:[]})}
const steps=[
{h:'Germs spread',p:'Germs are tiny living things. Some make us ill. Touch things with your germy hand.',predict:{q:'Germs are on your hand. You touch a toy. What happens?',opts:['Some germs go on the toy','The germs vanish','Nothing at all'],ans:0},task:'Touch all 4 things',
 show:()=>{steps[0].go();chain(THINGS.map((t,i)=>[()=>touch(i),400]))},
 go:()=>{clean();voice('Your hand has germs on it. Tap something to touch it.');keyPad();T.want=okWhen(0,()=>T.touched.length>=4,'Germs spread from hands to everything we touch.')}},
{h:'Water or soap?',p:'Try washing with water only. Then try soap and scrubbing.',predict:{q:'Which gets more germs off your hands?',opts:['Soap and water','Water only','They are the same'],ans:0},task:'Get your hand clean',
 show:()=>{steps[1].go();chain([[()=>wash(0),400],[()=>wash(0),400]].concat([0,1,2].map(()=>[()=>wash(1),A.reduced()?40:560])))},
 go:()=>{clean();voice('12 germs on your hand. Try water only first.');keyPad();T.want=okWhen(1,()=>!T.germs&&T.water,'Water alone leaves germs behind. Soap and scrubbing lift them off.')}},
{h:'Scrub every part',p:'Germs hide on every part of your hands. Rub each part. Keep going for 20 seconds.',task:'Scrub all 5 parts',
 show:()=>{steps[2].go();const a=[];PARTS.forEach((p,i)=>a.push([()=>scrub(i),200],[()=>scrub(i),200]));chain(a)},
 go:()=>{clean();voice('Tap or rub each part of your hands to scrub it.');keyPad();T.want=okWhen(2,()=>T.left.every(x=>!x),'Palms, backs, between fingers, thumbs and nails: 20 seconds, like singing Happy Birthday twice.')}},
{h:'When to wash?',p:'Some times are germ times. Sort each one.',task:'Sort all 6',
 show:()=>{steps[3].go();chain(WHEN.map(w=>[()=>sortAs(w[2]),300]))},
 go:()=>{clean();voice('Should you wash your hands? Choose.');keyPad();T.want=okWhen(3,()=>T.round>=WHEN.length,'Wash before you eat and after the toilet, pets and playing outside.')}},
{h:'Catch that sneeze',p:'A sneeze sprays germs. Try three ways to sneeze. Which one stops the germs?',predict:{q:'Where is the best place to sneeze?',opts:['Into a tissue','Into your hands','Into the air'],ans:0},task:'Try all 3 ways',
 show:()=>{steps[4].go();chain(SNEEZE.map(([k])=>[()=>sneeze(k),400]))},
 go:()=>{clean();voice('Tap a way to sneeze.');keyPad();T.want=okWhen(4,()=>T.tried.length>=3,'Catch it in a tissue, bin it, then wash your hands.')}},
{h:'Challenge',p:'',go:()=>{clean();askQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.want()});
const QS=[['Can you see germs on your hands?',[['No, they are too small','ok'],['Yes, they are green','green'],['Yes, they look like mud','mud']]],
 ['Which cleans hands best?',[['Soap and water','ok'],['Water only','wateronly'],['Wiping them on your top','top']]],
 ['Which is a time to wash your hands?',[['After the toilet','ok'],['Before watching TV','tv'],['Before reading a book','book']]],
 ['Your hands look clean. Could there be germs on them?',[['Yes, germs are too small to see','ok'],['No, they look clean','lookclean'],['No, germs are only on mud','onlymud']]],
 ['How long should you scrub with soap?',[['About 20 seconds','ok'],['1 second','quick'],['A whole hour','hour']]],
 ['You need to sneeze. What is best?',[['Use a tissue, then bin it','ok'],['Sneeze into your hands','hands'],['Sneeze into the air','air']]]];
function slip(t){let m='Think about where germs go.';
 if(t==='green')m='Germs are much too small to see. The green ones in the lab are just a picture.';
 if(t==='mud')m='Mud is dirt you can see. Germs are far too small to see.';
 if(t==='wateronly')m='Water only gets some germs off. Soap lifts the rest.';
 if(t==='top')m='Wiping just moves germs onto your clothes. Use soap and water.';
 if(t==='tv')m='Watching TV does not put germs in your mouth. The toilet does.';
 if(t==='book')m='Reading is fine. Wash after the toilet, before eating and after pets.';
 if(t==='lookclean')m='Clean-looking hands can still have germs. They are too small to see.';
 if(t==='onlymud')m='Germs are on lots of things, like door handles and toys, not just mud.';
 if(t==='quick')m='1 second is too quick. Scrub for about 20 seconds.';
 if(t==='hour')m='An hour is far too long! About 20 seconds is enough.';
 if(t==='hands')m='Then the germs are on your hands, and you spread them. Use a tissue.';
 if(t==='air')m='Germs spray onto people near you. Catch it in a tissue.';
 return m}
function askQ(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>reply(t)});voice('Challenge: '+q);A.redraw()}
function reply(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+good+'.':'✗ '+slip(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=askQ}
A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw:render,onStep:A=>{box.hidden=A.step!==5;keys.hidden=A.step===5;keyPad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);clean();A.gest({down:grab,move:slide,up:()=>{}});keyPad()}});
A.start()})})();
