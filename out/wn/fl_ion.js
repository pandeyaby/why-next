/* Flagship 37 – forming ions. One atom beside a charge ledger: protons (+) against electrons (−); the charge is the
   difference. (1) Drag sodium's outer electron away: 1+ (trap: "it lost something, so it is negative"). (2) Drag spare
   electrons into oxygen: 2− (trap: it loses 6). (3) Group strip: form ions for groups 1, 2, 6 and 7; the strip records each
   charge, so the group rule is discovered. (4) Drag electrons from magnesium to chlorine; one Cl fills after one electron,
   so a second is needed: MgCl₂. (5) Tap the ion to add brackets and pick the charge; Na⁺ keeps 11 protons, so it is not
   neon. Challenge: charge from group, formula from charges, ion diagrams, electron counts; feedback names the slip. */
(()=>{const SY=['','H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca'],
 NM=['','hydrogen','helium','lithium','beryllium','boron','carbon','nitrogen','oxygen','fluorine','neon','sodium','magnesium','aluminium','silicon','phosphorus','sulfur','chlorine','argon','potassium','calcium'];
 const GRP={3:1,11:1,19:1,12:2,20:2,13:3,7:5,8:6,16:6,9:7,17:7},TILES=[11,19,12,20,13,7,8,16,9,17],SAND=[3,11,19,12,20,13,7,8,16,9,17];
 const shells=e=>{const o=[];let r=e;for(const k of[2,8,8,2]){if(r<=0)break;o.push(Math.min(k,r));r-=k}return o},arr=e=>shells(e).join(',');
 const isFull=e=>e===2||e===10||e===18,target=z=>{const g=GRP[z];return g<=3?z-g:z+8-g},q=(z,e)=>z-e;
 const cl=n=>n===0?'0':Math.abs(n)+(n>0?'+':'−'),tag=n=>Math.abs(n)===1?cl(n).slice(1):cl(n),supc=n=>tag(n).replace(/./g,h=>({'2':'²','3':'³','7':'⁷','+':'⁺','−':'⁻','0':''})[h]||h);
 const ionName=(z,e)=>SY[z]+(z===e?'':supc(q(z,e)));
VIS.reg('flagion',c=>{let A,pad,chal,read;
 const S={z:11,e:11,mode:'one',m:12,me:12,cls:[17],ce:[17],br:false,lab:null,tiles:{},drag:null,shake:0,hide:false,goal:()=>{},run:0};
 const say=t=>{c.say(t);if(read)read.textContent=t};
 const miss=t=>{A.sound.miss();S.shake=1;A.tween(S,{shake:0},450,'out');if(t)say(t)};
 const cap=Z=>Z[0].toUpperCase()+Z.slice(1);
 function load(z){S.mode='one';S.z=z;S.e=z;S.br=false;S.lab=null;sync()}
 // ---- one atom: move electrons ----
 function move(d){const z=S.z,ne=S.e+d;if(Math.abs(ne-z)>3){miss(`${cap(NM[z])} is already ${Math.abs(S.e-z)} electrons from neutral. Real ions in this lab never move more than 3.`);sync();return}
  if(ne<0){miss('No electrons left.');sync();return}S.e=ne;A.sound.tick();const n=q(z,ne);
  let t=`${cap(NM[z])}: ${z} protons, ${ne} electrons (${arr(ne)}). Charge ${cl(n)}.`;
  if(isFull(ne)&&ne!==z){t+=` Full outer shell: the ion is ${ionName(z,ne)}.`;if(GRP[z])S.tiles[z]=n;A.sound.pop()}
  else if(ne!==z&&Math.sign(target(z)-z)!==Math.sign(ne-z))t+=` Wrong way: that takes ${cap(NM[z])} further from a full shell.`;
  say(t);sync();S.goal()}
 // ---- transfer: metal gives to non-metals ----
 function pair(m,n,k){S.mode='pair';S.m=m;S.me=m;S.cls=Array(k).fill(n);S.ce=Array(k).fill(n);sync()}
 function give(i){if(S.me<=target(S.m)){miss(`${cap(NM[S.m])} has no outer electrons left to give. It is ${arr(S.me)}, a full shell.`);sync();return}
  if(i>=S.cls.length){miss('Drop the electron on a chlorine atom.');sync();return}
  if(isFull(S.ce[i])){miss(`That ${NM[S.cls[i]]} is already ${arr(S.ce[i])}: full. One more electron has nowhere to go.${S.cls.length<2?' Bring another chlorine.':''}`);sync();return}
  S.me--;S.ce[i]++;A.sound.pop();const left=S.me-target(S.m);
  say(`${cap(NM[S.m])} gives one electron. ${cap(NM[S.cls[i]])} ${i+1} is now ${arr(S.ce[i])}, ${ionName(S.cls[i],S.ce[i])}. ${left?`${cap(NM[S.m])} still has ${left} to give.`:`${cap(NM[S.m])} is ${arr(S.me)}: ${ionName(S.m,S.me)}.`}`);sync();S.goal()}
 function moreCl(){if(S.cls.length>=2){miss('Two chlorines are enough for one magnesium.');sync();return}S.cls.push(17);S.ce.push(17);A.sound.tick();say('A second chlorine arrives, 2,8,7.');sync()}
 function play(list,ms=300){const tok=++S.run;let j=0;const go=()=>{if(tok!==S.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},ms,'io',go)};go()}
 function describe(){if(S.mode==='pair')return `Transfer: ${NM[S.m]} with ${S.me} electrons (${arr(S.me)}, charge ${cl(q(S.m,S.me))}) and ${S.cls.length} chlorine atom${S.cls.length>1?'s':''}: `+S.ce.map((e,i)=>`chlorine ${i+1} ${arr(e)}, charge ${cl(q(17,e))}`).join('; ')+'.';
  if(S.hide)return 'Challenge.';const z=S.z;return `${cap(NM[z])}: ${z} protons, ${S.e} electrons, ${arr(S.e)}. Charge ${cl(q(z,S.e))}.`+(S.br?' Drawn in square brackets':'')+(S.lab!=null?` labelled ${cl(S.lab)}.`:'')+(A.step===2?' Strip: '+TILES.map(t=>`${NM[t]} group ${GRP[t]}${S.tiles[t]!=null?' ion '+cl(S.tiles[t]):''}`).join(', ')+'.':'')}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step,b=(t,aria,f,off)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.disabled=!!off;x.onclick=f};
  if(s===6)return A.redraw();
  if(s===2)TILES.forEach(z=>b(SY[z],`Load ${NM[z]}, group ${GRP[z]}`,()=>load(z),S.z===z));
  if(s===5)SAND.forEach(z=>b(SY[z],`Load ${NM[z]}`,()=>load(z),S.z===z));
  if(S.mode==='one'&&s!==4){b('Remove e⁻','Remove an electron from the outer shell',()=>move(-1));b('Add e⁻','Add an electron to the outer shell',()=>move(1));b('Reset','Make the atom neutral again',()=>load(S.z))}
  if(S.mode==='pair'){S.cls.forEach((n,i)=>b(`Give to Cl ${i+1}`,`Move an electron from magnesium to chlorine ${i+1}`,()=>give(i)));b('Another Cl','Bring another chlorine atom',moreCl,S.cls.length>1);b('Start again','Start the transfer again',()=>pair(12,17,1))}
  if(s===4||s===5){b(S.br?'Brackets off':'Brackets on','Toggle square brackets round the ion',()=>{S.br=!S.br;A.sound.tick();sync();S.goal()});[1,-1,7].forEach(n=>b('Label '+cl(n),'Label the charge '+cl(n),()=>{S.lab=n;A.sound.tick();sync();S.goal()}))}
  A.redraw()}
 // ---- drawing ----
 function atom(x,y,z,e,R,o={}){const{ctx,col:C,paint:P}=A,sh=shells(e),jit=o.shake?S.shake*Math.sin(S.shake*30)*5:0;x+=jit;
  P.ball(x,y,R*.2,'#b91c1c');ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${Math.max(11,R*.13)|0}px system-ui`;ctx.fillText(o.hide?'?':SY[z],x,y-R*.04);ctx.font=`600 ${Math.max(9,R*.08)|0}px system-ui`;ctx.fillText(o.hide?'':z+'p',x,y+R*.09);
  const n=Math.max(1,sh.length),gain=Math.max(0,e-z);let outR=R*.4;
  for(let k=0;k<n;k++){const r=R*(.36+.62*(k+1)/n),cp=[2,8,8,2][k],has=sh[k]||0,out=k===n-1;outR=r;ctx.strokeStyle=A.alpha(C.tx,out?.6:.28);ctx.lineWidth=out?2:1.2;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();
   for(let j=0;j<has;j++){const a=-Math.PI/2+j*2*Math.PI/cp,ex=x+r*Math.cos(a),ey=y+r*Math.sin(a),cross=out&&j>=has-gain;
    if(cross){ctx.strokeStyle=C.cy;ctx.lineWidth=2.6;const d=R*.045+2;ctx.beginPath();ctx.moveTo(ex-d,ey-d);ctx.lineTo(ex+d,ey+d);ctx.moveTo(ex+d,ey-d);ctx.lineTo(ex-d,ey+d);ctx.stroke()}else P.ball(ex,ey,R*.04+2.2,'#2563eb')}}
  if(o.br){ctx.strokeStyle=C.tx;ctx.lineWidth=3;const h=outR+10,w=outR+12;[[-1],[1]].forEach(([s])=>{ctx.beginPath();ctx.moveTo(x+s*(w-10),y-h);ctx.lineTo(x+s*w,y-h);ctx.lineTo(x+s*w,y+h);ctx.lineTo(x+s*(w-10),y+h);ctx.stroke()});
   if(o.lab!=null){ctx.fillStyle=C.tx;ctx.font='800 18px system-ui';ctx.textAlign='left';ctx.fillText(tag(o.lab),x+w+5,y-h+6)}}
  else if(o.lab!=null){ctx.fillStyle=C.tx;ctx.font='800 18px system-ui';ctx.textAlign='left';ctx.fillText(tag(o.lab),x+outR+6,y-outR)}
  return outR}
 function ledger(x,y,w,z,e){const{ctx,col:C,paint:P}=A,n=q(z,e),bh=11,gap=3,cols=A.narrow?5:2,rows=Math.ceil(Math.max(z,e)/cols),cw=Math.min(14,(w-50)/2/cols);
  ctx.fillStyle=A.alpha(C.pn,.9);P.shadow(10,3,.18);P.rrect(x,y,w,34+rows*(bh+gap)+48,12);ctx.fill();P.noShadow();
  ctx.font='700 12px system-ui';ctx.textAlign='center';ctx.textBaseline='alphabetic';ctx.fillStyle=C.rd;ctx.fillText(`+ protons ${z}`,x+w*.27,y+20);ctx.fillStyle=C.ac;ctx.fillText(`− electrons ${e}`,x+w*.73,y+20);
  const half=cols*(cw+2)/2;for(let i=0;i<Math.max(z,e);i++){const r=Math.floor(i/cols),cc=i%cols,yy=y+30+r*(bh+gap);if(i<z){ctx.fillStyle=A.alpha('#dc2626',.85);ctx.fillRect(x+w*.27-half+cc*(cw+2),yy,cw,bh)}if(i<e){ctx.fillStyle=A.alpha('#2563eb',.85);ctx.fillRect(x+w*.73-half+cc*(cw+2),yy,cw,bh)}}
  const by=y+34+rows*(bh+gap);ctx.fillStyle=n===0?C.mu:n>0?C.rd:C.ac;ctx.font='800 17px system-ui';ctx.fillText(n===0?'charge 0: neutral':`charge ${cl(n)}`,x+w/2,by+12);
  ctx.font='600 11px system-ui';ctx.fillStyle=C.mu;ctx.fillText(n===0?'plus = minus':n>0?`${n} more + than −`:`${-n} more − than +`,x+w/2,by+30)}
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,N=A.narrow;S.hot=[];
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.rd,.06)],[1,A.mix(C.pn,C.ac,.06)]]);ctx.fillRect(0,0,W,H);
  if(S.mode==='pair'){const R=Math.min(W*(N?.25:.17),H*.27),mx=W*(N?.3:.27),my=H*(N?.3:.48),k=S.cls.length;S.mAt={x:mx,y:my,r:atom(mx,my,S.m,S.me,R,{shake:1})};
   P.label(`${ionName(S.m,S.me)}  ${arr(S.me)}`,mx,my+R+16,{font:'700 12px system-ui',bg:A.alpha('#0b1220',.75)});S.cAt=[];
   S.cls.forEach((n,i)=>{const cx=N?W*(k>1?.3+.42*i:.72):W*.7,cy=N?H*.75:H*(k>1?.27+.46*i:.48),r2=R*(k>1?.8:.9);S.cAt.push({x:cx,y:cy,r:r2});atom(cx,cy,n,S.ce[i],r2,{});P.label(`${ionName(n,S.ce[i])}  ${arr(S.ce[i])}`,cx,cy+r2+14,{font:'700 12px system-ui',bg:A.alpha('#0b1220',.75)})});
  }else{const top=A.step===2?(N?H*.2:H*.17):0;if(A.step===2){const tw=Math.min(62,(W-20)/TILES.length-4);TILES.forEach((z,i)=>{const x=10+i*(tw+4),y=8,hh=N?H*.15:H*.13,t=S.tiles[z];
     ctx.fillStyle=S.z===z?A.alpha(C.am,.35):A.alpha(C.tx,.07);P.rrect(x,y,tw,hh,8);ctx.fill();ctx.fillStyle=C.mu;ctx.font='600 10px system-ui';ctx.textAlign='center';ctx.fillText('grp '+GRP[z],x+tw/2,y+13);ctx.fillStyle=C.tx;ctx.font='800 15px system-ui';ctx.fillText(SY[z],x+tw/2,y+hh*.55);
     if(t!=null){ctx.fillStyle=t>0?C.rd:C.ac;ctx.font='800 12px system-ui';ctx.fillText(cl(t),x+tw/2,y+hh-6)}S.hot.push({k:'tile',z,x,y,w:tw,h:hh})})}
   const R=N?Math.min(W*.34,(H-top)*.26):Math.min(W*.24,(H-top)*.44),ax=N?W*.5:W*.33,ay=N?top+R+14:top+(H-top)*.5;
   S.aAt={x:ax,y:ay,r:atom(ax,ay,S.z,S.e,R,{shake:1,hide:S.hide,br:S.br,lab:S.lab}),R};
   const lw=N?W*.86:W*.32;if(!S.hide)ledger(N?W*.07:W*.63,N?ay+R+30:top+(H-top)*.5-110,lw,S.hide?0:S.z,S.hide?0:S.e);
   if(A.step!==6&&A.step!==4){const tx=N?W*.06:W*.04,ty=N?(A.step===2?top+2:6):H-62;S.tray={x:tx,y:ty,w:56,h:44};ctx.fillStyle=A.alpha(C.cy,.15);P.rrect(tx,ty,56,44,10);ctx.fill();ctx.strokeStyle=C.cy;ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle=C.tx;ctx.font='700 11px system-ui';ctx.textAlign='center';ctx.fillText('spare e⁻',tx+28,ty+15);P.ball(tx+28,ty+30,6,'#0891b2')}else S.tray=null}
  if(S.drag){ctx.strokeStyle=C.cy;ctx.lineWidth=3;const{x,y}=S.drag;ctx.beginPath();ctx.moveTo(x-6,y-6);ctx.lineTo(x+6,y+6);ctx.moveTo(x+6,y-6);ctx.lineTo(x-6,y+6);ctx.stroke()}
  return S.shake>0}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&A.pred[st]!=null)A.done(msg()+A.reveal(st))};
 const fresh=()=>{S.run++;S.hide=false;S.br=false;S.lab=null;S.goal=()=>{}};
 const steps=[
  {h:'Losing an electron',p:'Sodium is 2,8,1. Its nucleus has 11 protons (+). It has 11 electrons (−). The ledger shows they balance.',
   predict:{q:'Sodium loses its 1 outer electron. Its charge becomes…',opts:['1−, because it lost something','1+','0, still neutral'],ans:1},
   task:'Drag the outer electron off sodium (or press Remove e⁻)',show:()=>{S.e=11;move(-1)},
   go:()=>{fresh();load(11);S.goal=fin(0,()=>S.e===10,()=>'11 protons, 10 electrons: one more plus than minus. Losing a negative electron leaves the ion positive, Na⁺.')}},
  {h:'Gaining electrons',p:'Oxygen is 2,6: 2 gaps in its outer shell. Drag spare electrons onto it. They are drawn as crosses.',
   predict:{q:'To get a full outer shell, oxygen…',opts:['loses 6 and becomes 6+','gains 2 and becomes 2−','gains 2 and becomes 2+'],ans:1},
   task:'Give oxygen electrons until its outer shell is full',show:()=>{load(8);play([()=>move(1),()=>move(1)])},
   go:()=>{fresh();load(8);S.goal=fin(1,()=>S.z===8&&S.e===10,()=>'8 protons, 10 electrons: 2 more minus than plus, O²⁻. Gaining 2 is far easier than losing 6.')}},
  {h:'The group tells the charge',p:'The group number is the number of outer electrons. Tap an element, then fill its outer shell the short way.',
   predict:{q:'Calcium is in group 2. Its ion is…',opts:['Ca²⁺','Ca²⁻','Ca⁶⁻'],ans:0},
   task:'Form an ion for one element in each of groups 1, 2, 6 and 7',show:()=>{const L=[];[11,12,8,17].forEach(z=>{L.push(()=>load(z));const d=target(z)-z;for(let i=0;i<Math.abs(d);i++)L.push(()=>move(Math.sign(d)))});play(L,220)},
   go:()=>{fresh();S.tiles={};load(11);S.goal=fin(2,()=>[1,2,6,7].every(g=>TILES.some(z=>GRP[z]===g&&S.tiles[z]!=null)),()=>'Groups 1, 2 and 3 lose electrons: 1+, 2+, 3+. Groups 5, 6 and 7 gain: 3−, 2−, 1−. The charge is the shortest route to a full shell.')}},
  {h:'Metal to non-metal',p:'In a reaction the electrons go from the metal atom to the non-metal atom. Drag an electron from magnesium onto chlorine.',
   predict:{q:'Magnesium has 2 outer electrons to give. Each chlorine needs 1. How many chlorine atoms does one magnesium need?',opts:['1','2','7'],ans:1},
   task:'Transfer electrons until every atom has a full outer shell',show:()=>{pair(12,17,1);play([()=>give(0),moreCl,()=>give(1)])},
   go:()=>{fresh();pair(12,17,1);S.goal=fin(3,()=>S.me===10&&S.cls.length===2&&S.ce.every(e=>e===18),()=>'Mg²⁺ and two Cl⁻. The charges cancel: 2+ and 2 × 1−. The formula is MgCl₂.')}},
  {h:'Drawing an ion',p:'An ion diagram shows the outer shell, square brackets round the ion, and the charge at the top right. Tap the ion to add brackets.',
   predict:{q:'Na⁺ is 2,8, the same as neon. So Na⁺ is…',opts:['neon now','still sodium: it has 11 protons','a new element'],ans:1},
   task:'Draw the sodium ion: brackets on and the right charge',show:()=>{S.br=true;S.lab=1;sync();S.goal()},
   go:()=>{fresh();load(11);S.e=10;sync();S.goal=fin(4,()=>S.br&&S.lab===1,()=>'[Na]⁺: brackets round it, 1+ at the top right. It has neon’s arrangement but 11 protons, so it is still sodium.')}},
  {h:'Sandbox',p:'Load any element. Move electrons the short way, then draw the ion with brackets and a charge.',go:()=>{fresh();load(13)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.goal()});
 // ---- challenge ----
 const QS=[{t:'grp',z:12},{t:'form',a:'mgo'},{t:'diag'},{t:'grp',z:9},{t:'count'},{t:'form',a:'na2o'},{t:'grp',z:13},{t:'neon'},{t:'grp',z:16}];let qi=-1,streak=0;
 function ask(){qi=(qi+1)%QS.length;const Q=QS[qi];let h,o;S.mode='one';S.br=false;S.lab=null;
  if(Q.t==='grp'){const g=GRP[Q.z],n=q(Q.z,target(Q.z));S.z=Q.z;S.e=Q.z;S.hide=true;h=`<p><b>An element is in group ${g}. What charge does its ion have?</b></p>`;o=[{l:cl(n),s:'ok'},{l:cl(-n),s:'sign'},{l:cl(n>0?-(8-g):g),s:'long'}]}
  else if(Q.t==='form'){S.hide=false;const mg=Q.a==='mgo';S.z=mg?12:8;S.e=10;h=mg?'<p><b>Magnesium forms Mg²⁺ and oxygen forms O²⁻. What is the formula?</b></p>':'<p><b>Sodium forms Na⁺ and oxygen forms O²⁻. What is the formula?</b></p>';
   o=mg?[{l:'MgO',s:'ok'},{l:'MgO₂',s:'nocancel'},{l:'Mg₂O',s:'nocancel'}]:[{l:'Na₂O',s:'ok'},{l:'NaO',s:'nocancel'},{l:'NaO₂',s:'flip'}]}
  else if(Q.t==='diag'){S.z=8;S.e=10;S.hide=false;h='<p><b>Which is the correct way to show the oxide ion?</b></p>';o=[{l:'[O]²⁻, 8 outer electrons',s:'ok'},{l:'[O]²⁺, 8 outer electrons',s:'sign'},{l:'[O]²⁻, 6 outer electrons',s:'six'}]}
  else if(Q.t==='count'){S.z=12;S.e=10;S.hide=false;h='<p><b>How many electrons does a magnesium ion, Mg²⁺, have?</b></p>';o=[{l:'10',s:'ok'},{l:'14',s:'sign'},{l:'12',s:'same'}]}
  else{S.z=11;S.e=10;S.hide=false;h='<p><b>Na⁺ has the same electron arrangement as neon. Why is it not neon?</b></p>';o=[{l:'It still has 11 protons',s:'ok'},{l:'It is neon now',s:'isne'},{l:'It has more electrons than neon',s:'more'}]}
  const k=qi%o.length;o=o.slice(k).concat(o.slice(0,k));chal.innerHTML=h+'<div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>';
  const row=chal.querySelector('.fl-pick');o.forEach(x=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,x.l);b.onclick=()=>judge(Q,x)});sync()}
 function judge(Q,x){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m;S.hide=false;
  if(Q.t==='grp'){S.e=target(Q.z);S.br=true;S.lab=q(Q.z,S.e)}
  if(x.s==='ok')m=Q.t==='grp'?`It could be ${NM[Q.z]}: ${arr(Q.z)} becomes ${arr(S.e)}, ${ionName(Q.z,S.e)}.`:Q.t==='form'?'The charges must add to zero, so the ions combine in that ratio.':Q.t==='diag'?'Oxygen gained 2 electrons: 8 in the outer shell, in brackets, with 2− outside.':Q.t==='count'?'12 protons, and 2 electrons lost: 12 − 2 = 10.':'The number of protons decides the element. 11 protons is always sodium.';
  else if(x.s==='sign')m=Q.t==='count'?'Mg²⁺ lost 2 electrons; it did not gain them. 12 − 2 = 10.':'The sign is the wrong way. Losing electrons (negative) leaves the ion positive; gaining them makes it negative.';
  else if(x.s==='long')m='That is the long way round. Atoms take the shorter route: groups 1 to 3 lose electrons, groups 5 to 7 gain them.';
  else if(x.s==='nocancel')m=Q.a==='mgo'?'Those charges do not add to zero. 2+ and 2− cancel one to one, so it is MgO.':'NaO would leave 1+ and 2−, which do not cancel. Two Na⁺ are needed for one O²⁻: Na₂O.';
  else if(x.s==='flip')m='Check the charges: each Na⁺ is only 1+, so two of them are needed to cancel one O²⁻. Na₂O.';
  else if(x.s==='six')m='6 is the oxygen atom. The ion has gained 2, so its outer shell shows 8.';
  else if(x.s==='same')m='12 is the neutral atom. The 2+ charge means 2 electrons have gone.';
  else if(x.s==='isne')m='Only the electrons changed. The nucleus still has 11 protons, and that makes it sodium.';
  else m='Na⁺ has 10 electrons, the same number as neon. The difference is the 11 protons.';
  if(x.s==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask;sync()}
 A=FK.shell(c,{steps,ratio:.62,tall:1.4,draw,onStep:A=>{chal.hidden=A.step!==6;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Move electrons and draw ions'},box);chal=E('div',{class:'fl-chal'},A.below);
   const inB=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h,near=(p,a,pad)=>a&&Math.hypot(p.x-a.x,p.y-a.y)<a.r+(pad||0),onRing=(p,a)=>a&&Math.abs(Math.hypot(p.x-a.x,p.y-a.y)-a.r)<20;
   A.gest({down:p=>{const s=A.step;if(s===6)return false;const t=S.hot.find(b=>inB(p,b));if(t&&t.k==='tile'){load(t.z);A.sound.tick();return false}
     if(S.mode==='pair'){if(onRing(p,S.mAt)){S.drag={k:'give',x:p.x,y:p.y};return true}return false}
     if(s===4){if(near(p,S.aAt,14)){S.br=!S.br;A.sound.tick();sync();S.goal()}return false}
     if(inB(p,S.tray)){S.drag={k:'in',x:p.x,y:p.y};return true}if(onRing(p,S.aAt)){S.drag={k:'out',x:p.x,y:p.y};return true}return false},
    move:p=>{if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}},
    up:p=>{const d=S.drag;S.drag=null;if(!d||!p){sync();return}
     if(d.k==='give'){const i=(S.cAt||[]).findIndex(a=>near(p,a,10));if(i>=0)give(i);else{say('Drop the electron on a chlorine atom.');sync()}}
     else if(d.k==='in'){if(near(p,S.aAt,10))move(1);else sync()}else{if(!near(p,S.aAt,-4))move(-1);else sync()}}});sync()}});
 A.start()})})();
