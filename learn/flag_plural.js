/* Flagship – regular plural nouns (ages 5–6): tap a pen to add animals and watch "cat" become "cats"; drag -s or -es
   onto fox, cup, dish, bus, hat and watch; clap the beats to hear that -es adds a beat; find the real plurals in a
   sentence (bus and grass end in s but are one thing; takes is a doing word); then fill a shop list where one thing
   gets no ending at all. */
(()=>{const lo=Math.min,hi=Math.max;
 const PENS=[['🐱','cat'],['🐶','dog'],['🐔','hen']];
 const ENDW=[['🦊','fox','es'],['☕','cup','s'],['🍽️','dish','es'],['🚌','bus','es'],['🎩','hat','s'],['⌚','watch','es']];
 const BEAT=[['cats',1,'cats'],['boxes',2,'box·es'],['pens',1,'pens'],['wishes',2,'wish·es'],['frogs',1,'frogs'],['buses',2,'bus·es']];
 const SENT=[[['The',''],['bus','s'],['takes','v'],['two','n'],['kids','p'],['to',''],['the',''],['shops','p']],
  [['A',''],['glass','s'],['and',''],['three','n'],['cups','p'],['sit','']],[['Four','n'],['foxes','p'],['dig',''],['in',''],['the',''],['grass','s']]];
 const SHOP=[['🍎',1,'apple',''],['🍎',3,'apple','s'],['📦',2,'box','es'],['🖌️',1,'brush',''],['🖌️',4,'brush','es'],['🔔',2,'bell','s']];
 const TAILS=['', 's', 'es'],TNAME={'':'no ending',s:'-s',es:'-es'};
 const hiss=w=>(w.match(/(sh|ch|ss|s|x|z)$/)||[''])[0];
 const why=(w,want,got)=>want==='es'?`${w} ends in ${hiss(w)}. After s, x, z, sh or ch we add -es: ${w}es. You hear an extra beat.`
  :want==='s'&&got==='es'?`${w} ends in ${w.slice(-1)}. Just add -s: ${w}s. No extra beat.`:want===''?`There is only one ${w}. One thing has no ending.`:`More than one ${w} needs an ending: ${w}s.`;
VIS.reg('flagplural',c=>{let A,pad,chal,quizN=-1,run=0;c.fig.classList.add('young');
 const K={pen:[1,1,1],ew:0,bad:'',got:[],sorted:[],found:[],si:0,shop:0,drag:null,rects:[],want:()=>{}};
 const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const kind=()=>['pen','end','beat','find','shop','quiz'][A.step];
 const X=f=>f*A.W,Y=f=>f*A.H,big=z=>A.narrow?z:z+5;
 const txt=(x,s,px,py,z,k,w)=>{x.font=`${w||800} ${big(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,px,py,A.W-10)};
 const box=(x,r,k,thick,a)=>{x.fillStyle=A.alpha(k,a==null?.14:a);A.paint.rrect(r.x,r.y,r.w,r.h,16);x.fill();x.strokeStyle=k;x.lineWidth=thick?5:2;x.stroke()};
 const hit=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const oops=t=>{A.sound.miss();tell(t);A.redraw()};
 const yes=t=>{A.sound.pop();tell(t);pads();A.redraw();K.want()};
 // three big ending tiles along the bottom, shared by the ending and shop steps
 const tile=(i,n)=>{const g=10,w=(A.W-(n+1)*g)/n;return{x:g+i*(w+g),y:Y(.76),w,h:Y(.19)}};
 // ---- step 1: one or more ----
 const penR=i=>{const g=10,w=(A.W-4*g)/3;return{x:g+i*(w+g),y:Y(.16),w,h:Y(.6)}};
 function penV(x){const C=A.col;txt(x,'Tap a pen to add one more',A.W/2,Y(.07),15,C.tx);
  PENS.forEach(([e,w],i)=>{const r=penR(i),n=K.pen[i],pl=n>1;box(x,r,pl?C.gr:C.ln,pl,.1);
   const ez=lo(44,r.w*.36);for(let j=0;j<n;j++)txt(x,e,r.x+r.w*(n<2?.5:j%2?.72:.28),r.y+r.h*(.2+.27*Math.floor(j/2)),ez,C.tx,400);
   txt(x,n+' '+w+(pl?'s':''),r.x+r.w/2,r.y+r.h+Y(.1),18,C.tx);if(pl){x.font=`800 ${big(18)}px system-ui`;const full=x.measureText(n+' '+w+'s').width;txt(x,'s',r.x+r.w/2+full/2-x.measureText('s').width/2,r.y+r.h+Y(.1),18,C.gr)}})}
 function addOne(i){K.pen[i]=K.pen[i]>=4?1:K.pen[i]+1;const n=K.pen[i],w=PENS[i][1];
  yes(n>1?`${n} ${w}s. More than one ${w}, so we add s.`:`1 ${w}. Just one, so no s.`)}
 // ---- step 2: -s or -es ----
 function endV(x){const C=A.col,d=K.ew<6?ENDW[K.ew]:null;
  if(d){txt(x,'One '+d[1]+', two ...?',A.W/2,Y(.08),17,C.tx);txt(x,d[0]+' '+d[0],A.W/2,Y(.3),A.narrow?40:56,C.tx,400);
   const r={x:X(.2),y:Y(.45),w:X(.6),h:Y(.2)};box(x,r,K.bad?C.rd:C.cy,!!K.bad);txt(x,d[1]+' + ?',r.x+r.w/2,r.y+r.h/2,26,C.tx);K.rects=[r]}
  else txt(x,'cups, hats: -s.  foxes, dishes, buses, watches: -es.',A.W/2,Y(.4),15,C.gr);
  K.got.forEach((g,i)=>txt(x,g,X((i%3+.5)/3),Y(.68+Math.floor(i/3)*.045),12,C.tx));
  if(d)['s','es'].forEach((t,i)=>{let r=tile(i,2);if(K.drag&&K.drag.t===t)r={...r,x:K.drag.x-r.w/2,y:K.drag.y-r.h/2};box(x,r,C.vi,1,.2);txt(x,'-'+t,r.x+r.w/2,r.y+r.h/2,26,C.tx)})}
 function addEnd(t){const d=ENDW[K.ew];if(!d)return;K.drag=null;if(t!==d[2]){K.bad=t;return oops(why(d[1],d[2],t))}
  K.bad='';K.got.push(d[1]+d[2]);K.ew++;yes(`Yes! ${d[1]}${d[2]}.`+(d[2]==='es'?' Hear the extra beat?':''))}
 // ---- step 3: clap the beats ----
 const pot=i=>({x:i?X(.52):X(.03),y:Y(.58),w:X(.45),h:Y(.38)});
 const card=i=>{const w=(A.W-40)/3;return{x:10+(i%3)*(w+10),y:Y(.08)+Math.floor(i/3)*Y(.21),w,h:Y(.18)}};
 function beatV(x){const C=A.col;[0,1].forEach(b=>{const r=pot(b);box(x,r,b?C.or:C.cy,0,.12);txt(x,b?'👏👏 two claps':'👏 one clap',r.x+r.w/2,r.y+Y(.07),15,C.tx);
   K.sorted.filter(s=>BEAT[s][1]===b+1).forEach((s,j)=>txt(x,BEAT[s][2],r.x+r.w/2,r.y+Y(.16+j*.07),15,C.tx))});
  BEAT.forEach((d,i)=>{if(K.sorted.includes(i))return;let r=card(i);if(K.drag&&K.drag.i===i)r={...r,x:K.drag.x-r.w/2,y:K.drag.y-r.h/2};box(x,r,i===K.si?C.vi:C.ln,i===K.si,.18);txt(x,d[0],r.x+r.w/2,r.y+r.h/2,20,C.tx)})}
 function clap(i,b){K.drag=null;if(K.sorted.includes(i))return A.redraw();const d=BEAT[i];
  if(d[1]!==b){K.si=i;return oops(d[1]===2?`Say ${d[2]} and clap: two claps. The -es is the extra beat.`:`Say ${d[0]} and clap: just one clap. It took -s, so no extra beat.`)}
  K.sorted.push(i);K.si=BEAT.findIndex((_,j)=>!K.sorted.includes(j));yes(`${d[2]}: ${b===2?'two claps, so it is spelt -es':'one clap, so it is spelt -s'}.`)}
 // ---- step 4: find the plurals ----
 function findV(x){const C=A.col,si=lo(K.si,2),s=SENT[si];K.rects=[];x.font=`800 ${big(20)}px system-ui`;let px=10,py=Y(.3);const gap=10,h=Y(.17);
  s.forEach(([w,tag],i)=>{const tw=x.measureText(w).width+22;if(px+tw>A.W-8){px=10;py+=h+10}const r={x:px,y:py,w:tw,h};K.rects.push(r);
   const on=K.found.includes(si+':'+i);box(x,r,on?C.gr:K.bad===i?C.rd:C.ln,on||K.bad===i,on?.25:.08);txt(x,w,r.x+r.w/2,r.y+r.h/2,20,C.tx);px+=tw+gap});
  const left=s.filter(([,t],i)=>t==='p'&&!K.found.includes(K.si+':'+i)).length;
  txt(x,K.si>2?'You found every plural!':left?`Tap the word that means more than one (${left} left)`:'All found here!',A.W/2,Y(.12),15,K.si>2?C.gr:C.tx)}
 function pick(i){if(K.si>2)return;const s=SENT[K.si],[w,tag]=s[i];
  if(tag!=='p'){K.bad=i;return oops(tag==='s'?`${w} ends in s, but it is just one ${w}. Plural means more than one.`:tag==='n'?`${w} is a number word. The plural is the thing there is more of.`
   :tag==='v'?`${w} is a doing word, not a thing. Plural nouns name things.`:`${w} is not a thing there is more than one of.`)}
  K.bad=-1;K.found.push(K.si+':'+i);if(!s.some(([,t],j)=>t==='p'&&!K.found.includes(K.si+':'+j)))K.si++;yes(`Yes! ${w} means more than one.`)}
 // ---- step 5: shop list ----
 function shopV(x){const C=A.col;SHOP.forEach(([e,n,w,t],i)=>{const r={x:X(.04),y:Y(.03+i*.115),w:X(.92),h:Y(.1)},done=i<K.shop;
   box(x,r,done?C.gr:i===K.shop?C.vi:C.ln,i===K.shop,.1);txt(x,`${e} ${n} ${w}${done?t:' ___'}`,r.x+r.w/2,r.y+r.h/2,17,C.tx)});
  if(K.shop<6)TAILS.forEach((t,i)=>{let r=tile(i,3);if(K.drag&&K.drag.t===t)r={...r,x:K.drag.x-r.w/2,y:K.drag.y-r.h/2};box(x,r,C.or,1,.2);txt(x,t?'-'+t:'none',r.x+r.w/2,r.y+r.h/2,22,C.tx)});
  else txt(x,'Shop list done!',A.W/2,Y(.85),20,C.gr)}
 function fill(t){if(K.shop>=6)return;K.drag=null;const[,n,w,want]=SHOP[K.shop];if(t!==want)return oops(want===''?`There is only 1 ${w}. One thing gets no ending: 1 ${w}.`:t===''?`There are ${n}. More than one ${w} needs an ending.`:why(w,want,t));
  K.shop++;yes(`${n} ${w}${want}.`)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=kind();x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.4);x.fillRect(0,0,W,H);
  const f={pen:penV,end:endV,beat:beatV,find:findV,shop:shopV}[v];if(f)f(x);else txt(x,K.pic||'🐾',W/2,H/2,64,C.tx,400);A.fx.draw(x)}
 function pads(){if(!pad)return;pad.innerHTML='';const v=kind(),B=(t,f,al)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);b.onclick=f};
  if(v==='pen')PENS.forEach(([e,w],i)=>B(e+' + 1',()=>addOne(i),`Add one more ${w}`));
  if(v==='end'&&K.ew<6)['s','es'].forEach(t=>B('-'+t,()=>addEnd(t),`Add ${t} to ${ENDW[K.ew][1]}`));
  if(v==='beat'&&K.si>=0&&K.si<6)[1,2].forEach(b=>B('👏'.repeat(b),()=>clap(K.si,b),`${BEAT[K.si][0]}: ${b===1?'one clap':'two claps'}`));
  if(v==='find'&&K.si<3)SENT[K.si].forEach(([w],i)=>B(w,()=>pick(i)));
  if(v==='shop'&&K.shop<6)TAILS.forEach(t=>B(t?'-'+t:'none',()=>fill(t),`${SHOP[K.shop][2]} with ${TNAME[t]}`))}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const play=(fs,ms)=>{const g=++run;fs.forEach((f,j)=>setTimeout(()=>{if(g===run)f()},j*ms))};
 const reset=()=>{run++;K.want=()=>{};K.drag=null;K.bad='';K.rects=[]};
 const steps=[
  {h:'One or more?',p:'A noun names a thing. One thing is singular. More than one is plural. Tap a pen to add an animal and watch the word.',
   predict:{q:'Two cats sit on a mat. What do we say?',opts:['two cat','two cats'],ans:1},task:'Put more than one animal in every pen',
   show:()=>{steps[0].go();play([0,1,2].map(i=>()=>addOne(i)),450)},
   go:()=>{reset();K.pen=[1,1,1];tell('Tap a pen to add one more.');pads();K.want=fin(0,()=>K.pen.every(n=>n>1),'More than one: add s. Cats, dogs, hens.')}},
  {h:'-s or -es?',p:'Most words take -s. Words that end in s, x, z, sh or ch take -es. Drag an ending onto the word.',
   predict:{q:'One fox, two ...?',opts:['foxs','foxes'],ans:1},task:'Give all six words the right ending',
   show:()=>{steps[1].go();play(ENDW.map(d=>()=>addEnd(d[2])),420)},
   go:()=>{reset();K.ew=0;K.got=[];tell('One fox, two ... Drag -s or -es.');pads();K.want=fin(1,()=>K.ew>=6,'Hissing and buzzing ends take -es.')}},
  {h:'Clap the beats',p:'Say each word and clap. When -es adds an extra beat, you hear it. Drag each word to one clap or two claps.',task:'Sort all six words by claps',
   show:()=>{steps[2].go();play(BEAT.map((d,i)=>()=>clap(i,d[1])),420)},
   go:()=>{reset();K.sorted=[];K.si=0;tell('Say cats and clap. One clap or two?');pads();K.want=fin(2,()=>K.sorted.length>=6,'Hear an extra beat? Write -es.')}},
  {h:'Find the plurals',p:'Plural nouns name more than one thing. Some words end in s but are not plural. Tap only the plurals.',
   predict:{q:'Is bus a plural?',opts:['Yes, it ends in s','No, it is one bus'],ans:1},task:'Find all four plurals',
   show:()=>{steps[3].go();play([[0,4],[0,7],[1,4],[2,1]].map(([s,i])=>()=>{K.si=s;pick(i)}),450)},
   go:()=>{reset();K.found=[];K.si=0;K.bad=-1;tell('Tap the word that means more than one.');pads();K.want=fin(3,()=>K.si>2,'Bus and grass end in s, but each is one thing.')}},
  {h:'Shop list',p:'Look at how many. One thing gets no ending. More than one gets -s or -es.',task:'Finish the shop list',
   show:()=>{steps[4].go();play(SHOP.map(d=>()=>fill(d[3])),420)},
   go:()=>{reset();K.shop=0;tell('1 apple. Which ending?');pads();K.want=fin(4,()=>K.shop>=6,'1 apple, 3 apples, 2 boxes, 1 brush, 4 brushes, 2 bells.')}},
  {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
 const QZ=[['One wish, two ...?','⭐',[['wishes','ok'],['wishs','sh'],['wish','none']]],['Which word means more than one?','🐸',[['frogs','ok'],['frog','one'],['bus','bus']]],
  ['One box, three ...?','📦',[['boxes','ok'],['boxs','x'],['box','none']]],['One pen, two ...?','🖊️',[['pens','ok'],['penes','es'],['pen','none']]],
  ['I have 1 ... 🍌','🍌',[['banana','ok'],['bananas','single'],['bananaes','single']]],['🚌🚌 Which is right?','🚌',[['two buses','ok'],['two bus','none'],['two buss','ss']]]];
 let stars=0;
 function quiz(){quizN++;const[q,pic,ops]=QZ[quizN%QZ.length],r=quizN%3;K.pic=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});tell('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! That is the right word.';break;
   case 'sh':m='Wish ends in sh. After sh we add -es: wish-es, two beats.';break;
   case 'x':m='Box ends in x. After x we add -es: box-es, two beats.';break;
   case 'ss':m='Bus ends in s. After s we add -es: bus-es.';break;
   case 'none':m='There is more than one, so the word needs an ending.';break;
   case 'one':m='Frog is just one frog. Frogs means more than one.';break;
   case 'bus':m='Bus ends in s, but it is one bus. Frogs is the plural.';break;
   case 'es':m='Pen ends in n, so just add -s: pens. One beat, no -es.';break;
   default:m='There is only 1, so no ending: 1 banana.'}
  const good=tag==='ok';if(good){stars++;A.win()}else{stars=0;A.sound.miss()}
  fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=kind();K.drag=null;
  if(v==='pen'){const i=PENS.findIndex((_,i)=>hit(p,penR(i)));if(i>=0)addOne(i);return false}
  if(v==='end'&&K.ew<6){const i=[0,1].findIndex(i=>hit(p,tile(i,2)));if(i>=0){K.drag={t:['s','es'][i],x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
  if(v==='beat'){const i=BEAT.findIndex((_,i)=>!K.sorted.includes(i)&&hit(p,card(i)));if(i>=0){K.si=i;pads();K.drag={i,x:p.x,y:p.y};return true}return false}
  if(v==='find'){const i=K.rects.findIndex(r=>hit(p,r));if(i>=0)pick(i);return false}
  if(v==='shop'&&K.shop<6){const i=[0,1,2].findIndex(i=>hit(p,tile(i,3)));if(i>=0){K.drag={t:TAILS[i],x:p.x,y:p.y,x0:p.x,y0:p.y};return true}}return false}
 function move(p){if(K.drag){K.drag.x=p.x;K.drag.y=p.y;A.redraw()}}
 function up(p){const v=kind(),d=K.drag;if(!d)return;const tap=d.x0!=null&&Math.hypot(p.x-d.x0,p.y-d.y0)<12;
  if(v==='end')return tap||hit(p,K.rects[0])?addEnd(d.t):(K.drag=null,A.redraw());
  if(v==='beat'){const b=[0,1].findIndex(b=>hit(p,pot(b)));return b<0?(K.drag=null,A.redraw()):clap(d.i,b+1)}
  if(v==='shop')return tap||p.y<Y(.72)?fill(d.t):(K.drag=null,A.redraw())}
 A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
 A.start()})})();
