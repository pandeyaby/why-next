/* Flagship – volume is additive (ages 10–11; CCSS 5.MD.C.5c: find volumes of solid figures composed of two
   non-overlapping right rectangular prisms by adding the volumes of the non-overlapping parts; NC England Y6
   "calculate, estimate and compare volume of cubes and cuboids using standard units"). Stack layers of unit cubes,
   cut an L-shaped solid flat or upright and add the two cuboids, see that either cut gives the same total, judge
   splits that count the corner twice or leave a piece out, and build an L-shape with an exact volume by dragging. */
(()=>{
 const OPTS={flat:[[[36,'ok'],[18,'area'],[11,'sum']],[[18,'ok'],[6,'area'],[8,'sum']],[[54,'ok'],[648,'mult'],[36,'miss']]],
             up:[[[30,'ok'],[6,'area'],[10,'sum']],[[24,'ok'],[12,'area'],[9,'sum']],[[54,'ok'],[720,'mult'],[66,'twice']]]};
 const PIECES={flat:[[0,0,0,6,3,2],[0,0,2,2,3,3]],up:[[0,0,0,2,3,5],[2,0,0,4,3,2]]};
 const CASES=[{p:[[0,0,0,6,3,2],[0,0,2,2,3,3]],say:'6×3×2 + 2×3×3',v:0},{p:[[0,0,0,6,3,2],[0,0,0,2,3,5]],say:'6×3×2 + 2×3×5',v:1,extra:[0,0,0,2,3,2]},
  {p:[[2,0,0,4,3,2],[0,0,2,2,3,3]],say:'4×3×2 + 2×3×3',v:2,extra:[0,0,0,2,3,2]},{p:[[0,0,0,2,3,5],[2,0,0,4,3,2]],say:'2×3×5 + 4×3×2',v:0}];
 const VERD=['adds up','counts twice','leaves a gap'];
 VIS.reg('flagvadd',c=>{let A,pad,chal;
  const T={seq:0,layers:0,cut:null,first:'flat',ph:0,picked:[],ci:0,len:6,tall:2,grab:null,msg:'',err:false,cb:()=>{}};
  const now=()=>['stack','cut','other','twice','build','chal'][A.step];
  const fs=n=>Math.round(n*(A.narrow?1:1.12));
  const INK='#14213d',MID='#475569',BLU='#2563eb',ORA='#ea580c',RED='#dc2626',GRN='#047857',EDGE='#64748b',WHITE='#ffffff',GHOST='#cbd5e1';
  function say(g,s,x,y,n,col,w,al){g.font=`${w||800} ${fs(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-12)}
  function pill(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,11);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const hitR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function banner(g){if(!T.msg)return;g.font=`800 ${fs(14)}px system-ui,sans-serif`;const lines=[];let cur='';((T.err?'✗ ':'✓ ')+T.msg).split(' ').forEach(t=>{const n=cur?cur+' '+t:t;if(cur&&g.measureText(n).width>A.W-44){lines.push(cur);cur=t}else cur=n});lines.push(cur);
   const lh=fs(14)+6,h=lines.length*lh+14,y=A.H-h-6;pill(g,{x:12,y,w:A.W-24,h},WHITE,T.err?RED:GRN,3);lines.forEach((l,i)=>say(g,l,A.W/2,y+7+lh*(i+.5),14,INK))}
  const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
  const wrong=t=>{T.err=true;T.msg=t;A.sound.miss();tell(t);A.redraw()};
  const right=t=>{T.err=false;T.msg=t;A.sound.pop()};
  // ---- oblique drawing of cuboids made of unit cubes ----
  let U=26,OX=0,OY=0;
  const P=(x,y,z)=>[OX+x*U+y*U*.5,OY-z*U-y*U*.42];
  function frame(w,d,h,top){U=Math.min((A.W*.78)/(w+d*.5),(A.H*(top||.5))/(h+d*.42));OX=(A.W-(w+d*.5)*U)/2;OY=A.H*.06+(h+d*.42)*U}
  function face(g,pts,fill,alpha){g.globalAlpha=alpha==null?1:alpha;g.fillStyle=fill;g.beginPath();pts.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.closePath();g.fill();g.globalAlpha=1;g.strokeStyle='rgba(15,23,42,.75)';g.lineWidth=1.6;g.stroke()}
  function grid(g,a,b,o,n1,n2){g.strokeStyle='rgba(15,23,42,.28)';g.lineWidth=1;for(let i=1;i<n1;i++){const p0=a(i,0),p1=a(i,n2);g.beginPath();g.moveTo(p0[0],p0[1]);g.lineTo(p1[0],p1[1]);g.stroke()}for(let j=1;j<n2;j++){const p0=a(0,j),p1=a(n1,j);g.beginPath();g.moveTo(p0[0],p0[1]);g.lineTo(p1[0],p1[1]);g.stroke()}}
  function cuboid(g,[x,y,z,dx,dy,dz],col,alpha,off){const ox=(off||[0,0])[0],oy=(off||[0,0])[1],Q=(a,b,c2)=>{const q=P(a,b,c2);return[q[0]+ox,q[1]+oy]};
   face(g,[Q(x,y,z),Q(x+dx,y,z),Q(x+dx,y,z+dz),Q(x,y,z+dz)],col,alpha);grid(g,(i,j)=>Q(x+i,y,z+j),0,0,dx,dz);
   face(g,[Q(x,y,z+dz),Q(x+dx,y,z+dz),Q(x+dx,y+dy,z+dz),Q(x,y+dy,z+dz)],A.mix(col,'#ffffff',.4),alpha);grid(g,(i,j)=>Q(x+i,y+j,z+dz),0,0,dx,dy);
   face(g,[Q(x+dx,y,z),Q(x+dx,y+dy,z),Q(x+dx,y+dy,z+dz),Q(x+dx,y,z+dz)],A.mix(col,'#000000',.22),alpha);grid(g,(i,j)=>Q(x+dx,y+i,z+j),0,0,dy,dz)}
  function dims(g,[x,y,z,dx,dy,dz],col,off){const ox=(off||[0,0])[0],oy=(off||[0,0])[1],at=(a,b,c2)=>{const q=P(a,b,c2);return[q[0]+ox,q[1]+oy]};
   const f=at(x+dx/2,y,z),s=at(x+dx,y+dy,z),h=at(x,y,z+dz);
   A.paint.label(String(dx)+' cm',f[0],f[1]+fs(16),{bg:col,font:'800 11px system-ui,sans-serif'});
   A.paint.label(String(dy)+' cm',s[0]+fs(18),s[1]+fs(2),{bg:col,font:'800 11px system-ui,sans-serif'});
   A.paint.label(String(dz)+' cm',h[0]-fs(8),h[1]-fs(12),{bg:col,font:'800 11px system-ui,sans-serif'})}
  function wire(g,[x,y,z,dx,dy,dz]){g.setLineDash([5,4]);g.strokeStyle=EDGE;g.lineWidth=1.5;const E=[[[x,y,z],[x+dx,y,z]],[[x+dx,y,z],[x+dx,y,z+dz]],[[x,y,z],[x,y,z+dz]],[[x,y,z+dz],[x+dx,y,z+dz]],[[x,y,z+dz],[x,y+dy,z+dz]],[[x+dx,y,z+dz],[x+dx,y+dy,z+dz]],[[x,y+dy,z+dz],[x+dx,y+dy,z+dz]],[[x+dx,y,z],[x+dx,y+dy,z]],[[x+dx,y+dy,z],[x+dx,y+dy,z+dz]]];
   E.forEach(([a,b])=>{const p=P(...a),q=P(...b);g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(q[0],q[1]);g.stroke()});g.setLineDash([])}
  // ---- layout ----
  const chipR=k=>{const w=(A.W-36)/3;return{x:12+k*(w+6),y:A.H*.72,w,h:fs(42)}};
  const twoR=k=>{const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.72,w,h:fs(42)}};
  function choices(){const v=now();if(v==='stack')return T.layers<3?[]:[];if((v==='cut'||v==='other')){if(!T.cut)return v==='cut'?[['cut flat','flat'],['cut upright','up']]:[[T.first==='flat'?'cut upright':'cut flat',T.first==='flat'?'up':'flat']];if(T.ph<3)return OPTS[T.cut][T.ph].map(([n,t])=>[`${n} cm³`,n,t])}
   if(v==='twice'&&CASES[T.ci])return VERD.map((t,i)=>[t,i]);return[]}
  const order=(arr,k)=>arr.slice(k%arr.length).concat(arr.slice(0,k%arr.length));
  function drawChips(g){const ch=choices();if(!ch.length)return;const lay=ch.length===3?chipR:twoR,list=ch.length===1?[[...ch[0]]]:ch;
   const shown=(now()==='cut'||now()==='other')&&T.cut?order(list,T.ph+1):list;shown.forEach((o,k)=>{const r=ch.length===1?{x:A.W*.25,y:A.H*.72,w:A.W*.5,h:fs(42)}:lay(k);pill(g,r,WHITE,EDGE,2.5);say(g,o[0],r.x+r.w/2,r.y+r.h/2,A.narrow?14:16,INK,900)});return shown}
  function scene(g){const v=now();
   if(v==='stack'){frame(4,3,3,.5);wire(g,[0,0,0,4,3,3]);if(T.layers)cuboid(g,[0,0,0,4,3,T.layers],BLU);say(g,`${T.layers} layer${T.layers===1?'':'s'} of 4 × 3 = ${T.layers*12} cubes`,A.W/2,A.H*.66,15,INK,900);
    if(T.layers<3){const r={x:A.W*.22,y:A.H*.72,w:A.W*.56,h:fs(46)};pill(g,r,BLU,BLU,2);say(g,'Add a layer',A.W/2,r.y+r.h/2,16,WHITE,900)}}
   if(v==='cut'||v==='other'){frame(6.8,3,5.8,.4);const sep=T.cut==='flat'?[0,-U*.8]:T.cut==='up'?[U*.8,0]:[0,0];
    if(!T.cut){cuboid(g,[0,0,0,6,3,2],'#94a3b8');cuboid(g,[0,0,2,2,3,3],'#94a3b8');g.setLineDash([7,5]);g.lineWidth=3;const opts=v==='cut'?['flat','up']:[T.first==='flat'?'up':'flat'];
      opts.forEach(k=>{g.strokeStyle=k==='flat'?BLU:ORA;const a=k==='flat'?[P(0,0,2),P(2,0,2)]:[P(2,0,0),P(2,0,2)];g.beginPath();g.moveTo(...a[0]);g.lineTo(...a[1]);g.stroke()});g.setLineDash([])}
    else{const [a,b]=PIECES[T.cut];if(T.cut==='flat'){cuboid(g,a,BLU);cuboid(g,b,ORA,1,sep)}else{cuboid(g,a,BLU);cuboid(g,b,ORA,1,sep)}dims(g,a,BLU);dims(g,b,ORA,sep);
     const vA=a[3]*a[4]*a[5],vB=b[3]*b[4]*b[5],labels=[T.ph>0?`blue ${vA}`:'blue ?',T.ph>1?`orange ${vB}`:'orange ?',T.ph>2?`total ${vA+vB} cm³`:'total ?'];say(g,labels.join('  ·  '),A.W/2,A.H*.66,13,INK,900)}
    drawChips(g)}
   if(v==='twice'){frame(6.8,3,5.8,.38);const C=CASES[T.ci];if(!C){say(g,'Every cube counted once: no gaps, no overlaps.',A.W/2,A.H*.3,15,INK);return}
    wire(g,[0,0,0,6,3,2]);wire(g,[0,0,2,2,3,3]);cuboid(g,C.p[0],BLU,.8);cuboid(g,C.p[1],ORA,.8);if(C.v===1)cuboid(g,C.extra,RED,.75);if(C.v===2){g.globalAlpha=.9;wire(g,C.extra);g.globalAlpha=1}
    say(g,C.say,A.W/2,A.H*.66,15,INK,900);drawChips(g)}
   if(v==='build'){frame(9,3,8,.42);cuboid(g,[0,0,0,T.len,3,2],BLU);cuboid(g,[0,0,2,2,3,T.tall],ORA);dims(g,[0,0,0,T.len,3,2],BLU);dims(g,[0,0,2,2,3,T.tall],ORA);
    const vb=T.len*6,vt=T.tall*6;say(g,`${vb} + ${vt} = ${vb+vt} cm³`,A.W/2,A.H*.7,16,vb+vt===60?GRN:INK,900);say(g,'Target: 60 cm³. Drag the blue end or the orange top.',A.W/2,A.H*.78,12,MID,800)}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#eff6ff',C.dark?.04:.5);g.fillRect(0,0,A.W,A.H);
   if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(now()==='chal')say(g,'Split, find each volume, then add.',A.W/2,A.H/2,15,INK);else scene(g);banner(g);A.fx.draw(g)}
  // ---- moves ----
  function addLayer(){if(T.layers>=3)return;T.layers++;right(T.layers<3?`Layer ${T.layers}: ${T.layers*12} cubes so far.`:`3 layers of 12 is 36 cubes. 4 × 3 × 3 = 36 cm³.`);sync()}
  function cutAt(k){if(T.cut)return;if(now()==='other'&&k===T.first)return wrong('You cut that way already. Try the other cut.');T.cut=k;T.ph=0;if(now()==='cut')T.first=k;right(k==='flat'?'Flat cut: a 6 × 3 × 2 block and a 2 × 3 × 3 tower.':'Upright cut: a 2 × 3 × 5 column and a 4 × 3 × 2 block.');sync()}
  function pickV(n,tag){if(!T.cut||T.ph>2)return;const [a,b]=PIECES[T.cut],dimsOf=x=>`${x[3]} × ${x[4]} × ${x[5]}`;
   if(tag!=='ok'){const pc=T.ph===0?a:b,lay=pc[3]*pc[4];
    if(tag==='area')return wrong(`${n} is just one layer: ${pc[3]} × ${pc[4]} = ${lay}. Multiply by the height ${pc[5]} too.`);
    if(tag==='sum')return wrong(`${n} adds the edges. Volume multiplies them: ${dimsOf(pc)}.`);
    if(tag==='mult')return wrong('Putting pieces together means adding their volumes, not multiplying them.');
    if(tag==='miss')return wrong('That leaves out some cubes. Add the whole of both pieces.');
    if(tag==='twice')return wrong('That counts the 2 × 3 × 2 corner twice. Each cube is counted once.');}
   const pc=T.ph===0?a:b;right(T.ph<2?`${dimsOf(pc)} = ${n} cm³.`:`${a[3]*a[4]*a[5]} + ${b[3]*b[4]*b[5]} = 54 cm³ in all.`);T.ph++;sync()}
  function verdict(i){const C=CASES[T.ci];if(!C)return;if(i!==C.v)return wrong(C.v===0?'Look again: the two pieces fill the L with no gap and no overlap.':C.v===1?'The red corner is in both pieces, so it is counted twice. 36 + 30 = 66, not 54.':'The dashed corner is in neither piece, so 12 cubes are missing. 24 + 18 = 42, not 54.');
   right(`${C.say}: ${VERD[C.v]}.`);T.ci++;sync()}
  function setSize(len,tall){T.len=Math.max(3,Math.min(8,len));T.tall=Math.max(1,Math.min(6,tall));const tot=T.len*6+T.tall*6;T.err=false;T.msg=tot===60?`${T.len} × 3 × 2 + 2 × 3 × ${T.tall} = 60 cm³. Exactly!`:'';sync()}
  function sync(){const v=now();let s='';
   if(v==='stack')s=`Box 4 by 3 by 3. ${T.layers} layers in, ${T.layers*12} cubes.`;
   else if(v==='cut'||v==='other')s=!T.cut?'L-shaped solid. Choose where to cut it into two cuboids.':T.ph<3?`${['Blue','Orange','Total'][T.ph]}: choose the volume.`:'Total 54 cubic centimetres.';
   else if(v==='twice')s=CASES[T.ci]?`Split ${CASES[T.ci].say}. Does it add up right, count some twice or leave some out?`:'All four judged.';
   else if(v==='build')s=`Base ${T.len} by 3 by 2, tower 2 by 3 by ${T.tall}. Total ${T.len*6+T.tall*6} cubic centimetres. Target 60.`;else s='Challenge.';
   tell((T.msg?T.msg+' ':'')+s);row();T.cb()}
  function row(){if(!pad)return;pad.innerHTML='';const v=now(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
   if(v==='stack'&&T.layers<3)b('Add a layer',addLayer,'Add a layer of 12 cubes');
   if(v==='cut'||v==='other'){const ch=choices();(T.cut?order(ch,T.ph+1):ch).forEach(o=>b(o[0],()=>T.cut?pickV(o[1],o[2]):cutAt(o[1]),T.cut?`${['Blue piece','Orange piece','Total'][T.ph]}: ${o[1]} cubic centimetres`:null))}
   if(v==='twice'&&CASES[T.ci])VERD.forEach((t,i)=>b(t,()=>verdict(i)));
   if(v==='build'){b('Base longer',()=>setSize(T.len+1,T.tall),`Base longer, now ${T.len}`);b('Base shorter',()=>setSize(T.len-1,T.tall),`Base shorter, now ${T.len}`);b('Tower taller',()=>setSize(T.len,T.tall+1),`Tower taller, now ${T.tall}`);b('Tower shorter',()=>setSize(T.len,T.tall-1),`Tower shorter, now ${T.tall}`)}A.redraw()}
  function down(p){const v=now();
   if(v==='stack'){if(hitR(p,{x:A.W*.22,y:A.H*.72,w:A.W*.56,h:fs(46)})||p.y<A.H*.6)addLayer();return false}
   if(v==='cut'||v==='other'||v==='twice'){const ch=choices();if(!ch.length)return false;const shown=(v!=='twice'&&T.cut)?order(ch,T.ph+1):ch;
    shown.forEach((o,k)=>{const r=ch.length===1?{x:A.W*.25,y:A.H*.72,w:A.W*.5,h:fs(42)}:(ch.length===3?chipR:twoR)(k);if(hitR(p,r)){if(v==='twice')verdict(o[1]);else if(T.cut)pickV(o[1],o[2]);else cutAt(o[1])}});return false}
   if(v==='build'){T.grab={x:p.x,y:p.y,len:T.len,tall:T.tall,which:p.y<P(0,0,2)[1]-U*.2&&p.x<P(2.8,0,0)[0]?'tall':'len'};return true}return false}
  function move(p){if(!T.grab)return;const g=T.grab;if(g.which==='len')setSize(g.len+Math.round((p.x-g.x)/U),T.tall);else setSize(T.len,g.tall+Math.round((g.y-p.y)/U))}
  function up(){T.grab=null}
  // ---- steps ----
  const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const auto=fs2=>{const id=++T.seq,gap=A.reduced()?15:340;fs2.forEach((f,i)=>setTimeout(()=>{if(id===T.seq)f()},i*gap))};
  const clear=()=>{T.seq++;T.cb=()=>{};T.layers=0;T.cut=null;T.ph=0;T.ci=0;T.len=6;T.tall=2;T.grab=null;T.msg='';T.err=false};
  const okPicks=k=>OPTS[k].map(o=>()=>pickV(o[0][0],'ok'));
  const steps=[
   {h:'Volume in layers',p:'Volume is how many unit cubes fit inside. Each cube here is 1 cm³. Fill the box one layer at a time.',
    predict:{q:'One layer holds 4 × 3 = 12 cubes. How many cubes fill 3 layers?',opts:['12 + 3 = 15','12 × 3 = 36'],ans:1},
    task:'Fill 3 layers',show:()=>{steps[0].go();auto([addLayer,addLayer,addLayer])},go:()=>{clear();sync();T.cb=finish(0,()=>T.layers>=3,'Length × width × height: 4 × 3 × 3 = 36 cm³.')}},
   {h:'Cut the L in two',p:'This solid is not a cuboid. Cut it into two cuboids. Find each volume, then add them.',
    task:'Cut, then find 3 volumes',show:()=>{steps[1].go();auto([()=>cutAt('flat')].concat(okPicks('flat')))},go:()=>{clear();sync();T.cb=finish(1,()=>T.ph>=3,'36 + 18 = 54 cm³. Add the volumes of the parts.')}},
   {h:'Cut it the other way',p:'Now cut the same solid the other way. The pieces change size. Find the volumes again.',
    predict:{q:'Cut the other way. Will the total be…',opts:['Different: the pieces are new sizes','The same: it is the same solid'],ans:1},
    task:'Cut, then find 3 volumes',show:()=>{steps[2].go();const k=T.first==='flat'?'up':'flat';auto([()=>cutAt(k)].concat(okPicks(k)))},go:()=>{clear();sync();T.cb=finish(2,()=>T.ph>=3,'Still 54 cm³. Any cut works if every cube is in exactly one piece.')}},
   {h:'Count each cube once',p:'The pieces must not overlap, and no cubes may be left out. Judge each split.',
    predict:{q:'Ben works out 6×3×2 + 2×3×5. Is that right?',opts:['Yes: both pieces are in the L','No: he counts a corner twice'],ans:1},
    task:'Judge 4 splits',show:()=>{steps[3].go();auto(CASES.map(C=>()=>verdict(C.v)))},go:()=>{clear();sync();T.cb=finish(3,()=>T.ci>=CASES.length,'No overlaps, no gaps: then the parts add to the whole.')}},
   {h:'Build to 60 cm³',p:'Drag the end of the blue base, or the top of the orange tower. Make the whole solid exactly 60 cm³.',
    task:'Make exactly 60 cm³',show:()=>{steps[4].go();auto([()=>setSize(6,3),()=>setSize(6,4)])},go:()=>{clear();sync();T.cb=finish(4,()=>T.len*6+T.tall*6===60,'Base plus tower makes 60 cm³.')}},
   {h:'Challenge',p:'',go:()=>{clear();ask()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>T.cb()});
  // ---- challenge: every wrong option names the slip ----
  const Q=[['An L-shape is a 5×2×2 cuboid with a 2×2×3 cuboid on top. Volume?','32 cm³',[['20 cm³','area'],['14 cm³','sum']]],
   ['Two cuboids of 24 cm³ and 18 cm³ make one solid. Volume?','42 cm³',[['432 cm³','mult'],['24 cm³','miss']]],
   ['A step is 6×2×1 and 3×2×1 on top. Volume?','18 cm³',[['12 cm³','miss'],['36 cm³','mult']]],
   ['Pool: shallow part 8×5×1 m, deep part 4×5×2 m. How much water?','80 m³',[['60 m³','area'],['2400 m³','mult']]],
   ['Zara adds 6×3×2 and 2×3×5 for an L that is 6 long and 5 tall. What went wrong?','the corner is counted twice',[['nothing: it is right','twice'],['she should multiply','mult']]],
   ['What unit is volume measured in?','cm³',[['cm²','unit'],['cm','unit']]]];
  function slip(tag){let m='Split into cuboids, find each volume, then add.';
   if(tag==='area')m='That is only the area of one layer. Multiply by the height as well.';
   if(tag==='sum')m='Adding the edge lengths gives a length. Volume is length × width × height.';
   if(tag==='mult')m='The parts join, so add their volumes. Do not multiply one volume by the other.';
   if(tag==='miss')m='A piece was left out. Add the volume of every part.';
   if(tag==='twice')m='Both pieces include the same 2 × 3 × 2 corner, so 12 cubes are counted twice.';
   if(tag==='unit')m='Volume counts cubes, so it is in cubic units: cm³. cm² is for area, cm for length.';
   return m}
  let qi=-1,streak=0;
  function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,ord=all.slice(k).concat(all.slice(0,k));
   chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>judge(tag,ans)});tell('Challenge: '+q);A.redraw()}
  function judge(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
   if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right: '+ans+'. Streak: '+streak+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
  A=FK.shell(c,{steps,ratio:.62,tall:1.02,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;row()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Volume buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
  A.start()})})();
