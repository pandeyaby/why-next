/* Flagship 54 – the halogens (Group 7). Slide down the group to see colour, state, melting and boiling points; drop an
   electron into chlorine's outer shell to make Cl⁻; compare how far each outer shell is from the nucleus; pour halogen
   water into potassium halide tubes to discover which displacement reactions happen. Challenge: react or not, colour, why. */
(()=>{const EL=[{s:'F',n:'fluorine',z:9,sh:[2,7],mp:-220,bp:-188,st:'gas',c:'#fde68a',look:'pale yellow gas'},{s:'Cl',n:'chlorine',z:17,sh:[2,8,7],mp:-101,bp:-34,st:'gas',c:'#bef264',look:'yellow-green gas'},
 {s:'Br',n:'bromine',z:35,sh:[2,8,18,7],mp:-7,bp:59,st:'liquid',c:'#9a3412',v:'#ea580c',look:'red-brown liquid, orange vapour'},{s:'I',n:'iodine',z:53,sh:[2,8,18,18,7],mp:114,bp:184,st:'solid',c:'#374151',v:'#a855f7',look:'grey-black solid, purple vapour'},
 {s:'At',n:'astatine',z:85,sh:[2,8,18,32,18,7],st:'solid',c:'#111827',look:'thought to be a dark solid; so radioactive that no one has seen a visible lump'}],
 SOL={1:'#e7f7c4',2:'#f97316',3:'#7c2d12'},CN={1:'very pale green',2:'orange',3:'brown'},SALT=['KCl','KBr','KI'],HW=['chlorine water','bromine water','iodine solution'],sb=s=>s.replace(/2/g,'₂'),cap=s=>s[0].toUpperCase()+s.slice(1);
VIS.reg('flaghal',c=>{let A,pad,chal,read;
 const G={e:1,ex:0,ey:0,eIn:0,drag:null,dp:null,hal:0,tube:[null,null,null],res:{},found:new Set(),want:()=>{},tok:0,flash:0,Q:null,cq:'',said:''};
 const tell=t=>{G.said=t;c.say(t);if(read)read.textContent=t};
 const mode=()=>{const s=A.step;return s<2?'trend':s<4?'atom':s<7?'tube':'q'};
 // ---- trend ----
 const top=()=>A.narrow?60:54;
 function tiles(){const n=A.step===3?4:5,t=Math.min(54,(A.H-top()-12)/(n+.3));return{t,n,x:12,y:top()+4}}
 function pickEl(i){const n=tiles().n;G.e=Math.max(0,Math.min(n-1,i));A.sound.tick();status()}
 function status(){const m=mode(),e=EL[G.e];let t;
  if(m==='trend')t=`${cap(e.n)}, ${e.s}₂: ${e.look}.`+(e.mp!=null?` Melts at ${e.mp} °C, boils at ${e.bp} °C.`:'');
  else if(A.step===2)t=G.eIn?'Chlorine has gained an electron: Cl⁻, with shells 2,8,8. Its outer shell is full.':'Chlorine atom, shells 2,8,7. One space left in the outer shell. A spare electron waits outside.';
  else if(m==='atom')t=`${cap(e.n)}: ${e.sh.length} shells (${e.sh.join(',')}). ${e.sh.slice(0,-1).reduce((a,b)=>a+b,0)} inner electrons shield the outer shell. Reactivity rank ${G.e+1} of 4.`;
  else t=SALT.map((s,k)=>`${s}: ${G.tube[k]==null?'colourless, nothing added':G.res[G.tube[k]+''+k]}`).join('. ')+`. Selected: ${HW[G.hal]}.`;
  tell(t);sync();G.want()}
 // ---- tubes ----
 function pour(h,k){const X=h+1,Y=k+1,key=h+''+k;let msg;G.tube[k]=h;
  if(X===Y)msg=`no reaction: ${EL[X].n} cannot displace itself.`;
  else if(X<Y){msg=`reaction. ${cap(EL[X].n)} is more reactive, so it takes the electron from ${EL[Y].s}⁻: ${EL[X].s}₂ + 2${EL[Y].s}⁻ → 2${EL[X].s}⁻ + ${EL[Y].s}₂. The ${CN[Y]} colour is ${EL[Y].n} being made.`;G.found.add(key);A.sound.pop()}
  else msg=`no reaction. ${cap(EL[X].n)} is less reactive than ${EL[Y].n}; the ${CN[X]} colour is just the ${HW[h]} you added.`;
  G.res[key]=msg[0]==='r'?'reacted':'no reaction';G.flash=.7;A.tween(G,{flash:0},600,'out');tell(`${HW[h]} into ${SALT[k]}: ${msg}`);sync();G.want()}
 const tcol=k=>{const h=G.tube[k];if(h==null)return null;const X=h+1,Y=k+1;return SOL[X<Y?Y:X]};
 function tgeo(){const{W,H}=A,N=A.narrow,y0=top()+4,gw=N?W-24:W*.34,lw=N?W-24:W-gw-36,bw=Math.min(62,lw/3.6),bh=bw*1.05,th=Math.min(N?H*.26:H*.5,bw*2.6);
  const bx=k=>12+lw*(k+.5)/3-bw/2,ty=y0+bh+34,gy=N?ty+th+14:y0+4,gx=N?12:W-gw-12;return{bw,bh,th,bx,y0,ty,gx,gy,gw,gh:N?H-gy-8:Math.min(H-y0-12,gw*.9)}}
 function hitB(p){const g=tgeo();for(let k=0;k<3;k++){const x=g.bx(k);if(p.x>x-6&&p.x<x+g.bw+6){if(p.y>g.y0-6&&p.y<g.y0+g.bh+6)return['b',k];if(p.y>g.ty-6&&p.y<g.ty+g.th+6)return['t',k]}}return null}
 // ---- atom ----
 function atom(ctx,cx,cy,rs,e,gain){const C=A.col,sh=e.sh.slice();ctx.lineWidth=1.5;
  sh.forEach((m,k)=>{const r=rs*(k+1.3),outer=k===sh.length-1,slots=outer?8:m;ctx.strokeStyle=A.alpha(C.tx,.28);ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();
   for(let i=0;i<slots;i++){const a=-Math.PI/2+i*2*Math.PI/slots,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a),has=i<m||(outer&&gain);
    if(has){ctx.fillStyle=outer&&i===7?C.am:outer?C.cy:A.alpha(C.tx,.6);ctx.beginPath();ctx.arc(x,y,outer?5.5:3.2,0,7);ctx.fill()}else{ctx.setLineDash([3,3]);ctx.strokeStyle=C.am;ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,9,0,7);ctx.stroke();ctx.setLineDash([]);G.gap=[x,y]}}});
  A.paint.ball(cx,cy,Math.max(12,rs*.8),'#be123c');ctx.fillStyle='#fff';ctx.font='700 12px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('+'+e.z,cx,cy+1);return rs*(sh.length+.3)}
 // ---- draw ----
 function head(ctx,a,b){const C=A.col;ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.font=`700 ${A.narrow?15:18}px system-ui`;ctx.fillStyle=C.tx;ctx.fillText(a,12,22);ctx.font='600 13px system-ui';ctx.fillStyle=C.mu;ctx.fillText(b,12,A.narrow?44:42)}
 function tileCol(ctx){const{t,n,x,y}=tiles(),C=A.col;for(let i=0;i<n;i++){const e=EL[i],yy=y+i*t*1.04,on=i===G.e;ctx.fillStyle=on?A.alpha(C.am,.3):A.alpha(C.tx,.07);A.paint.rrect(x,yy,t,t,8);ctx.fill();
  if(on){ctx.strokeStyle=C.am;ctx.lineWidth=3;ctx.stroke()}ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${t*.36}px system-ui`;ctx.fillText(e.s,x+t/2,yy+t*.56);ctx.font=`600 ${Math.max(9,t*.2)}px system-ui`;ctx.fillStyle=C.mu;ctx.fillText(e.z,x+t*.22,yy+t*.18)}return x+t+16}
 function jar(ctx,x,y,w,h,e){const C=A.col,P=A.paint;ctx.strokeStyle=A.alpha(C.tx,.5);ctx.lineWidth=2.5;P.rrect(x,y,w,h,14);ctx.stroke();ctx.save();P.rrect(x,y,w,h,14);ctx.clip();
  if(e.st==='gas'){ctx.fillStyle=A.alpha(e.c,.12);ctx.fillRect(x,y,w,h);for(let i=0;i<22;i++){const r=k=>{const q=Math.sin(i*k)*9e3;return q-Math.floor(q)},u=.08+r(12.99)*.84,v=.06+r(78.23)*.88;ctx.fillStyle=A.alpha(e.c,.7);ctx.beginPath();ctx.arc(x+u*w,y+v*h,w*.045,0,7);ctx.fill()}}
  else if(e.st==='liquid'){ctx.fillStyle=A.alpha(e.v,.25);ctx.fillRect(x,y,w,h*.65);ctx.fillStyle=e.c;ctx.fillRect(x,y+h*.65,w,h*.35)}
  else{if(e.v){ctx.fillStyle=A.alpha(e.v,.16);ctx.fillRect(x,y,w,h*.8)}for(let i=0;i<7;i++){P.ball(x+w*(.15+i*.12),y+h*(.86-(i%2)*.05),w*.07,e.c,'#9ca3af')}if(!e.mp){ctx.fillStyle=C.tx;ctx.font='800 40px system-ui';ctx.textAlign='center';ctx.fillText('?',x+w/2,y+h*.45)}}
  ctx.restore()}
 function tube(ctx,x,y,w,h,col,lab){const C=A.col,P=A.paint;ctx.strokeStyle=A.alpha(C.tx,.55);ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+h-w/2);ctx.arc(x+w/2,y+h-w/2,w/2,Math.PI,0,true);ctx.lineTo(x+w,y);ctx.stroke();
  ctx.save();ctx.beginPath();ctx.moveTo(x+2,y+h*.35);ctx.lineTo(x+2,y+h-w/2);ctx.arc(x+w/2,y+h-w/2,w/2-2,Math.PI,0,true);ctx.lineTo(x+w-2,y+h*.35);ctx.closePath();ctx.fillStyle=col||A.alpha('#bae6fd',.35);ctx.fill();ctx.restore();
  ctx.fillStyle=C.tx;ctx.font='700 13px system-ui';ctx.textAlign='center';ctx.textBaseline='alphabetic';ctx.fillText(lab,x+w/2,y-6)}
 function bottle(ctx,x,y,w,h,k,on){const C=A.col;ctx.fillStyle=SOL[k+1];A.paint.rrect(x,y+h*.25,w,h*.75,10);ctx.fill();ctx.fillStyle=A.alpha(C.tx,.4);ctx.fillRect(x+w*.3,y,w*.4,h*.28);
  if(on){ctx.strokeStyle=C.am;ctx.lineWidth=3;A.paint.rrect(x-4,y-4,w+8,h+8,12);ctx.stroke()}ctx.fillStyle=k===0?'#14532d':'#fff';ctx.font='700 13px system-ui';ctx.textAlign='center';ctx.fillText(sb(EL[k+1].s+'2'),x+w/2,y+h*.7)}
 function draw(A){const{ctx,W,H,col:C}=A,m=mode(),e=EL[G.e];ctx.fillStyle=A.mix(C.pn,C.cy,.04);ctx.fillRect(0,0,W,H);
  if(m==='trend'){head(ctx,`${cap(e.n)} · ${e.st}`,e.mp!=null?`melts ${e.mp} °C · boils ${e.bp} °C`:'never collected in bulk');const x=tileCol(ctx);jar(ctx,x,top()+4,W-x-12,H-top()-16,e)}
  else if(m==='atom'){const two=A.step===3,x0=two?tileCol(ctx):0,el=two?e:EL[1],cx=(x0+W)/2,cy=top()+(H-top())/2,rs=Math.min(W-x0-20,H-top()-20)/2/(two?6:4.6);
   head(ctx,two?`${cap(el.n)}: ${el.sh.length} shells`:G.eIn?'Chloride ion, Cl⁻':'Chlorine atom, Cl',two?`reactivity rank ${G.e+1} of 4`:G.eIn?'2,8,8: full outer shell':'2,8,7: one space');
   const R=atom(ctx,cx,cy,rs,el,!two&&G.eIn);
   if(two){const ex=Math.min(W-14,cx+R+26),ar=[5,3.4,2.2,1.4][G.e];ctx.strokeStyle=C.am;ctx.lineWidth=ar;ctx.beginPath();ctx.moveTo(ex-10,cy);ctx.lineTo(cx+R-4,cy);ctx.stroke();A.paint.ball(ex,cy,7,C.cy);
    ctx.fillStyle=C.tx;ctx.font='600 12px system-ui';ctx.textAlign='right';ctx.fillText(['strong pull','','','weak pull'][G.e]||'',W-12,cy-14)}
   else if(!G.eIn){const p=G.drag?G.dp:{x:G.ex||W-30,y:G.ey||top()+24};A.paint.ball(p.x,p.y,8,C.cy);ctx.fillStyle=C.tx;ctx.font='700 12px system-ui';ctx.textAlign='center';ctx.fillText('e⁻',p.x,p.y-14)}}
  else if(m==='tube'){const g=tgeo();for(let k=0;k<3;k++){bottle(ctx,g.bx(k),g.y0,g.bw,g.bh,k,k===G.hal);tube(ctx,g.bx(k)+g.bw*.2,g.ty,g.bw*.6,g.th,tcol(k),SALT[k])}
   const cw=g.gw/4,ch=Math.min(34,g.gh/4.2);ctx.font='700 12px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';
   for(let r=0;r<4;r++)for(let q=0;q<4;q++){const x=g.gx+q*cw,y=g.gy+r*ch;ctx.fillStyle=A.alpha(C.tx,r&&q?.06:0);ctx.fillRect(x+1,y+1,cw-2,ch-2);ctx.fillStyle=C.tx;
    const t=!r&&!q?'':!r?SALT[q-1]:!q?sb(EL[r].s+'2'):r===q?'—':G.res[(r-1)+''+(q-1)]==='reacted'?'✓':G.res[(r-1)+''+(q-1)]?'✗':'';ctx.fillStyle=t==='✓'?C.gr:t==='✗'?C.rd:C.tx;ctx.fillText(t,x+cw/2,y+ch/2)}
   if(G.drag!=null&&G.dp){ctx.globalAlpha=.8;bottle(ctx,G.dp.x-g.bw/2,G.dp.y-g.bh/2,g.bw,g.bh,G.drag,1);ctx.globalAlpha=1}}
  else if(G.Q&&G.Q.k!=='why'){const g=tgeo(),q=G.Q;head(ctx,'Will it react?','');bottle(ctx,W*.25-g.bw/2,top()+20,g.bw,g.bh,q.h,0);tube(ctx,W*.65-g.bw*.3,top()+20,g.bw*.6,Math.min(H-top()-40,g.th),null,SALT[q.t])}
  else if(G.Q){head(ctx,'Chlorine and bromine','');[1,2].forEach((i,k)=>{atom(ctx,W*(k?.72:.28),top()+(H-top())/2,Math.min(W*.4,H-top()-20)/2/5.2,EL[i]);ctx.fillStyle=C.tx;ctx.font='700 13px system-ui';ctx.textAlign='center';ctx.fillText(EL[i].n,W*(k?.72:.28),H-8)})}
  if(G.flash>0){ctx.strokeStyle=A.alpha(C.gr,G.flash);ctx.lineWidth=5;ctx.strokeRect(4,4,W-8,H-8)}A.fx.draw(ctx)}
 // ---- buttons ----
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',A.step===7?G.cq||'Challenge.':G.said);if(!pad)return A.redraw();pad.innerHTML='';const m=mode();
  const B=(t,f,dis)=>{const e=c.el('button',{type:'button',class:'lbtn sm ghost'},pad,t);e.disabled=!!dis;e.onclick=()=>{f();A.sound.tick()}};
  if(m==='trend'||A.step===3){B('▲ Up the group',()=>pickEl(G.e-1),!G.e);B('Down the group ▼',()=>pickEl(G.e+1),G.e>=tiles().n-1)}
  if(A.step===2)B('Move the electron into the gap',addE,G.eIn);
  if(m==='tube'){B('◀ Halogen',()=>{G.hal=(G.hal+2)%3;status()});B('Halogen ▶',()=>{G.hal=(G.hal+1)%3;status()});SALT.forEach((s,k)=>B(`Pour ${sb(EL[G.hal+1].s+'2')} into ${s}`,()=>pour(G.hal,k)))}A.redraw()}
 function addE(){if(G.eIn)return;G.eIn=1;G.drag=null;A.sound.pop();status()}
 // ---- steps ----
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&A.pred[st]!=null){G.flash=1;A.tween(G,{flash:0},1100,'out');A.done(msg()+A.reveal(st))}};
 const fresh=()=>{G.tok++;G.want=()=>{};G.Q=null;G.drag=null},play=(fs,ms=500)=>{const k=++G.tok;let i=0;const nx=()=>{if(k!==G.tok||i>=fs.length)return;fs[i++]();setTimeout(nx,A.reduced()?0:ms)};nx()};
 const tubes=()=>{G.tube=[null,null,null];G.res={};G.found=new Set();G.hal=0};
 const steps=[
  {h:'Down the group',p:'Group 7: the halogens. Drag along the column of elements, or use the buttons, and look at each one at room temperature.',
   predict:{q:'Chlorine is a gas and iodine is a solid. Bromine, between them, is…',opts:['a gas','a solid','a liquid'],ans:2},task:'Find the halogen that is a liquid at room temperature',show:()=>play([()=>pickEl(1),()=>pickEl(2)]),
   go:()=>{fresh();G.e=0;status();G.want=fin(0,()=>G.e===2,()=>'Bromine: a red-brown liquid that boils at 59 °C. Down the group the molecules get bigger, the forces between them get stronger, so melting and boiling points rise and the colours get darker.')}},
  {h:'One more below',p:'Astatine sits under iodine. It is so radioactive that it has never been collected in a visible amount.',
   predict:{q:'Use the trend. Astatine is most likely…',opts:['a pale gas','a colourless liquid','a dark solid'],ans:2},task:'Go to the bottom of the group',show:()=>play([()=>pickEl(3),()=>pickEl(4)]),
   go:()=>{fresh();G.e=3;status();G.want=fin(1,()=>G.e===4,()=>'The trend predicts a dark solid with a higher melting point than iodine. Predicting an element you cannot handle is what a group trend is for.')}},
  {h:'One electron short',p:'Chlorine has 7 electrons in its outer shell. Drag the spare electron into the gap, or use the button.',
   predict:{q:'Chlorine gains one electron. It becomes…',opts:['Cl⁺','Cl²⁻','Cl⁻'],ans:2},task:'Put the electron in the gap',show:()=>play([addE]),
   go:()=>{fresh();G.eIn=0;G.ex=G.ey=0;status();G.want=fin(2,()=>G.eIn,()=>'Cl⁻, a chloride ion: 17 protons, 18 electrons, outer shell full at 8. Every halogen reacts by gaining one electron.')}},
  {h:'Who grabs hardest?',p:'An incoming electron has to land in the outer shell. Compare the atoms going down.',
   predict:{q:'Which halogen is the most reactive?',opts:['iodine: it has the most protons','all the same: all have 7 outer electrons','fluorine'],ans:2},task:'Pick the most reactive halogen',show:()=>play([()=>pickEl(2),()=>pickEl(1),()=>pickEl(0)]),
   go:()=>{fresh();G.e=3;status();G.want=fin(3,()=>G.e===0,()=>'Fluorine. Its outer shell is closest to the nucleus with only 2 inner electrons shielding it, so a new electron is pulled in most easily. Each shell added down the group makes it harder, so reactivity falls.')}},
  {h:'Displacement',p:'Three bottles of halogen in water, three tubes of colourless salt solution. Drag a bottle onto a tube, or pick a halogen and press a pour button.',
   predict:{q:'Chlorine water goes into potassium bromide. What do you see?',opts:['no change','the tube turns green','the tube turns orange'],ans:2},task:'Pour chlorine water into KBr',show:()=>play([()=>{G.hal=0;pour(0,1)}]),
   go:()=>{fresh();tubes();status();G.want=fin(4,()=>G.res['01']==='reacted',()=>'Orange: bromine has been made. Chlorine is more reactive, so it pulls the electron off each Br⁻: Cl₂ + 2KBr → 2KCl + Br₂.')}},
  {h:'Can iodine win?',p:'Try every halogen in every salt. The grid records what reacts.',
   predict:{q:'Iodine solution goes into potassium bromide. What happens?',opts:['bromine is made','they swap halfway','no reaction'],ans:2},task:'Find all three pairs that react',show:()=>play([()=>{G.hal=0;pour(0,1)},()=>pour(0,2),()=>{G.hal=1;pour(1,2)}]),
   go:()=>{fresh();tubes();status();G.want=fin(5,()=>G.found.size===3,()=>'Cl₂ + KBr, Cl₂ + KI and Br₂ + KI. A halogen displaces only those below it. Careful: bromine water in KCl looks orange too, but that is just the bromine you added.')}},
  {h:'Sandbox',p:'Pour anything into anything. Before each pour, say whether it will react and what colour you expect.',go:()=>{fresh();tubes();status()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 // ---- challenge ----
 const PAIRS=[[0,1],[2,0],[1,2],[1,0],[0,2],[2,1],[1,1],[2,2]],KS=['yn','col','yn','why','yn','col','yn'];let qn=-1,run=0;
 function ask(){qn++;const k=KS[qn%KS.length],j=qn%3;let q,ops;
  if(k==='why'){G.Q={k};q='Why is chlorine more reactive than bromine?';ops=[['Its outer shell is nearer the nucleus, so it attracts an extra electron more strongly','ok'],['It has more electrons, so it reacts more','more'],['It loses its outer electron more easily','lose']]}
  else{const R=k==='col'?[[0,1],[0,2],[1,2]][qn%3]:PAIRS[qn%PAIRS.length],[h,t]=R;G.Q={k,h,t};const X=h+1,Y=t+1,re=X<Y;
   if(k==='yn'){q=`${cap(HW[h])} is added to ${SALT[t]} solution. Does a reaction happen?`;ops=[['Yes','yes'],['No','no']].map(([a,b])=>[a,(b==='yes')===re?'ok':b])}
   else{q=`${cap(HW[h])} is added to ${SALT[t]} solution. What colour do you see?`;ops=[['orange',2],['brown',3],['very pale green',1]].map(([a,v])=>[a,v===Y?'ok':'c'+v])}}
  G.Q.ops=ops;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick'),seq=ops.slice(j%ops.length).concat(ops.slice(0,j%ops.length));seq.forEach(([t,tag])=>{const e=c.el('button',{type:'button',class:'lbtn sm'},row,t);e.onclick=()=>judge(tag)});
  G.cq='Challenge: '+q;A.cv.setAttribute('aria-label',G.cq);c.say(G.cq);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),Q=G.Q,X=EL[(Q.h??0)+1],Y=EL[(Q.t??0)+1];let m;
  if(tag==='ok')m='Right.';
  else if(tag==='more')m='Bromine has more electrons, not chlorine. More shells means the nucleus pulls a new electron less strongly.';
  else if(tag==='lose')m='That is the Group 1 story. Halogens react by gaining an electron, not losing one.';
  else if(tag==='yes')m=X===Y?`It is the same halogen as in the salt: there is nothing to swap.`:`${cap(X.n)} is below ${Y.n}, less reactive, so it cannot take the electron from ${Y.s}⁻.`;
  else if(tag==='no')m=`${cap(X.n)} is above ${Y.n}, more reactive, so it takes the electron from ${Y.s}⁻ and ${Y.n} forms.`;
  else if(tag==='c2')m=`Orange is bromine. Here ${Y.n} is made${Y.s==='I'?', and iodine solution is brown':''}.`;
  else if(tag==='c3')m=`Brown is iodine, but there is no iodide in ${SALT[Q.t]}. ${cap(Y.n)} forms: ${CN[Q.t+1]}.`;
  else m=Q.h?`There is no chlorine here. ${cap(X.n)} reacts and ${Y.n} forms: ${CN[Q.t+1]}.`:`The chlorine reacts, so its pale colour is replaced by the ${CN[Q.t+1]} of the ${Y.n} it makes.`;
  if(tag==='ok'){run++;A.win();fb.innerHTML=`✓ ${m} Streak: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();fb.innerHTML=`✗ ${m} <button type="button" class="linkish">Another →</button>`}fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==7;read.hidden=A.step===7;pad.hidden=A.step===7;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},bx);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   const tileAt=p=>{const{t,n,x,y}=tiles();if(p.x<x-8||p.x>x+t+8)return-1;return Math.max(0,Math.min(n-1,Math.floor((p.y-y)/(t*1.04))))};
   A.gest({down:p=>{const m=mode();if(m==='q')return false;
     if(m==='trend'||A.step===3){const i=tileAt(p);if(i<0)return false;G.dragT=1;if(i!==G.e)pickEl(i);return true}
     if(A.step===2){if(G.eIn)return false;const ex=G.ex||A.W-30,ey=G.ey||top()+24;if(Math.hypot(p.x-ex,p.y-ey)<34){G.drag=1;G.dp=p;return true}return false}
     const h=hitB(p);if(!h)return false;if(h[0]==='b'){G.hal=h[1];G.drag=h[1];G.dp=p;status();return true}pour(G.hal,h[1]);return false},
    move:p=>{if(G.dragT){const i=tileAt({x:tiles().x+1,y:p.y});if(i!==G.e)pickEl(i);return}if(G.drag!=null){G.dp=p;A.redraw()}},
    up:p=>{if(G.dragT){G.dragT=0;return}const d=G.drag;G.drag=null;if(d==null)return;
     if(A.step===2){if(G.gap&&Math.hypot(p.x-G.gap[0],p.y-G.gap[1])<40)addE();else{G.ex=p.x;G.ey=p.y;tell('Not quite: drop it on the dashed gap in the outer shell.');A.redraw()}return}
     const h=hitB(p);if(h&&h[0]==='t')pour(d,h[1]);else A.redraw()}});sync()}});
 A.start()})})();
