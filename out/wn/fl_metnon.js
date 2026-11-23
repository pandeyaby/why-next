/* Flagship – metals vs non-metals (ages 11-13): run three bench tests (does it complete a circuit, what does a hammer
   do, does a magnet pull it) on real elements, weigh the evidence for six elements whose single properties mislead
   (shiny iodine, conducting graphite, liquid mercury, soft sodium), place elements either side of the staircase on the
   periodic table (and meet hydrogen), and test metal and non-metal oxides in universal indicator.
   Data and drawings: metnon_art.js. */
(()=>{const M=METNON;
VIS.reg('flagmetnon',c=>{let A,K,ctl,qa,qn=-1,epoch=0;const S={};
const kind=()=>['circ','hamm','magn','evid','table','oxide','quiz'][A.step];
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const SET={circ:M.CIRC,hamm:M.HAMM,magn:M.MAGN};
function bg(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f172a':'#f1f5f9';g.fillRect(0,0,A.W,A.H)}
/* ---------- bench tests: circuit, hammer, magnet ---------- */
let STN=null,CH=[];
function verdict(m,it){if(m==='circ')return it.r?(it.met?`${cap(it.n)} lights the bulb: it conducts, like all metals.`:`${cap(it.n)} lit the bulb! Carbon is a non-metal, but graphite conducts.`):`${cap(it.n)}: no light. It is an electrical insulator, like most non-metals.`;
 if(m==='hamm')return it.r==='flattens'?`${cap(it.n)} flattens instead of breaking: metals are malleable.`:`${cap(it.n)} ${it.r}: solid non-metals are brittle.`;
 return it.r?`${cap(it.n)} sticks to the magnet.`:it.met?`${cap(it.n)} is a metal, but it does not stick. Most metals are not magnetic.`:`${cap(it.n)} does not stick.`}
function test(i){const m=kind(),b=S.b,it=SET[m][i];if(!it||b.res[i]!=null)return;b.res[i]=it.r;b.cur=i;b.drag=null;A.sound.pop();
 const left=SET[m].length-Object.keys(b.res).length;note(verdict(m,it)+(left?` ${left} to test.`:''),false)}
function drawStation(m,r){const g=A.ctx,b=S.b,it=b.cur!=null?SET[m][b.cur]:null,cx=r.x+r.w/2,cy=r.y+r.h/2,u=Math.min(r.w,r.h)/2;
 K.tile(r,'',{bg:A.col.dark?'#1e293b':'#ffffff'});g.lineWidth=3;g.strokeStyle=A.col.dark?'#cbd5e1':'#334155';
 if(m==='circ'){const L=cx-u*1.3,R=cx+u*1.3,T=cy-u*.55,Bm=cy+u*.55;g.beginPath();g.moveTo(L,T);g.lineTo(R,T);g.lineTo(R,Bm);g.lineTo(cx+u*.35,Bm);g.moveTo(cx-u*.35,Bm);g.lineTo(L,Bm);g.lineTo(L,T);g.stroke();
  g.fillStyle='#475569';g.fillRect(L-9,cy-u*.25,18,u*.5);g.fillStyle='#ef4444';g.fillRect(L-9,cy-u*.25,18,8);
  const lit=it&&it.r;if(lit){g.fillStyle='rgba(250,204,21,.45)';g.beginPath();g.arc(cx,T,u*.42,0,7);g.fill()}g.fillStyle=lit?'#facc15':'#e2e8f0';g.beginPath();g.arc(cx,T,u*.22,0,7);g.fill();g.stroke();
  g.fillStyle='#64748b';[-1,1].forEach(d=>{g.beginPath();g.arc(cx+d*u*.35,Bm,5,0,7);g.fill()});if(it)K.lump(cx,Bm,u*.22,it.col);
  label(lit?'bulb ON':it?'bulb off':'gap',cx,T-u*.42)}
 if(m==='hamm'){g.fillStyle='#475569';g.beginPath();g.moveTo(cx-u*.9,cy+u*.2);g.lineTo(cx+u*.9,cy+u*.2);g.lineTo(cx+u*.5,cy+u*.45);g.lineTo(cx+u*.3,cy+u*.8);g.lineTo(cx-u*.3,cy+u*.8);g.lineTo(cx-u*.5,cy+u*.45);g.closePath();g.fill();
  g.fillStyle='#92400e';g.fillRect(cx+u*.55,cy-u*.95,u*.12,u*.75);g.fillStyle='#334155';g.fillRect(cx+u*.35,cy-u*.3,u*.52,u*.25);
  if(it){if(it.r==='flattens'){g.fillStyle=it.col;g.beginPath();g.ellipse(cx-u*.1,cy+u*.12,u*.5,u*.08,0,0,7);g.fill();g.stroke()}else[[-.45,.05],[-.2,.1],[.05,.02],[.28,.1],[-.6,.12],[.4,0]].forEach(([a,q],k)=>K.lump(cx+a*u,cy+q*u,u*(it.r==='crumbles'?.06:.09)+k%2*2,it.col));label(it.r,cx-u*.1,cy-u*.35)}}
 if(m==='magn'){g.lineWidth=u*.26;g.strokeStyle='#dc2626';g.beginPath();g.arc(cx,cy-u*.35,u*.42,Math.PI,0);g.stroke();g.strokeStyle='#94a3b8';g.beginPath();g.moveTo(cx-u*.42,cy-u*.36);g.lineTo(cx-u*.42,cy-u*.05);g.moveTo(cx+u*.42,cy-u*.36);g.lineTo(cx+u*.42,cy-u*.05);g.stroke();g.lineWidth=3;
  if(it){const y=it.r?cy+u*.08:cy+u*.7;K.lump(cx,y,u*.18,it.col);label(it.r?'sticks':'no pull',cx,cy+u*.95>r.y+r.h-12?r.y+r.h-14:cy+u*.95)}}}
function label(t,x,y){const g=A.ctx;g.font=`800 ${K.sz(14)}${K.F}`;g.textAlign='center';g.textBaseline='middle';const w=g.measureText(t).width+14;g.fillStyle='#0f172a';A.paint.rrect(x-w/2,y-12,w,24,8);g.fill();g.fillStyle='#ffffff';g.fillText(t,x,y)}
function drawBench(m){const b=S.b,list=SET[m],all=Object.keys(b.res).length>=list.length,y0=K.banner(all?M.DONE[A.step]:M.TXT[A.step],all?'ok':'',S.msg,S.bad);
 const ch=Math.min(A.H*.24,96),sy=A.H-ch-6;STN={x:8,y:y0,w:A.W-16,h:sy-y0-8};drawStation(m,STN);
 const gap=6,cw=(A.W-16-gap*(list.length-1))/list.length;CH=list.map((it,i)=>({i,x:8+i*(cw+gap),y:sy,w:cw,h:ch}));
 CH.forEach(r=>{const it=list[r.i],d=b.drag&&b.drag.i===r.i?b.drag:null,R=d?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch}:r,res=b.res[r.i];
  K.tile(R,[it.k,it.n.split(' ')[0],res==null?'test me':m==='circ'?(res?'conducts':'no light'):m==='magn'?(res?'sticks':'no pull'):res],{n:15,sel:!!d,ok:res!=null&&!d})})}
/* ---------- weigh the evidence ---------- */
let BX=[],EC=null;
function sortEl(z){const e=S.e,it=M.EVID[e.i];if(!it)return;e.drag=null;if(z!==it.met){e.bad=z;A.sound.miss();return note(it.why,true)}
 e.i++;e.bad=-1;A.sound.pop();note(`${it.n}: ${it.met?'metal':'non-metal'}.`+(e.i<M.EVID.length?' Next element.':''),false)}
function drawEvid(){const e=S.e,it=M.EVID[e.i],y0=K.banner(it?`${e.i+1} of ${M.EVID.length}: metal or non-metal?`:M.DONE[3],it?(e.bad>=0?'no':''):'ok',S.msg,S.bad);
 const gap=10,bw=(A.W-16-gap)/2,bh=Math.min(A.H*.22,100),by=A.H-bh-6;BX=[[1,'Metal'],[0,'Non-metal']].map(([z,l],k)=>{const r={z,x:8+k*(bw+gap),y:by,w:bw,h:bh};K.tile(r,[l,M.EVID.slice(0,e.i).filter(q=>q.met===z).map(q=>q.n.split(' ')[0]).join(', ')||' '],{n:17,no:e.bad===z});return r});
 if(it){const w=Math.min(A.W-30,380),h=Math.min(by-y0-12,120),d=e.drag;EC={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+4,w,h};K.tile(EC,[it.n,it.e],{n:19,sel:!!d})}else EC=null}
/* ---------- the periodic table ---------- */
let PB=[];
function placeEl(z){const t=S.t,it=M.PLACE[t.i];if(!it)return;const row=M.PT.find(q=>q[0]===it.s);if(z!==row[1]){t.bad=z;A.sound.miss();return note(it.why,true)}
 t.done.push(it.s);t.i++;t.bad=-1;A.sound.pop();note(`${it.s}: ${z?'metal':'non-metal'}.`+(t.i<M.PLACE.length?' Next element.':''),false)}
function drawTable(){const t=S.t,it=M.PLACE[t.i],y0=K.banner(it?`Is ${it.s} a metal or a non-metal?`:M.DONE[4],it?(t.bad>=0?'no':''):'ok',S.msg,S.bad),g=A.ctx;
 const bh=Math.min(A.H*.15,64),by=A.H-bh-6,gw=(A.W-16)/9,gh=Math.min((by-y0-10)/4,gw*1.05),X=col=>8+(col===9?8:col)*gw,Y=r=>y0+2+r*gh;
 M.PT.forEach(([s,m,r,col])=>{const shown=t.done.includes(s)||!it,cur=it&&it.s===s,bgc=!shown?'#ffffff':m===1?'#bfdbfe':m===0?'#fde68a':'#e5e7eb';
  K.tile({x:X(col)+1.5,y:Y(r)+1.5,w:gw-3,h:gh-3},col===2?[s,'block']:s,{n:13,bg:cur?'#c7d2fe':bgc,sel:cur})});
 g.strokeStyle=A.col.dark?'#f87171':'#b91c1c';g.lineWidth=4;g.beginPath();g.moveTo(X(3),Y(1));g.lineTo(X(3),Y(2));g.lineTo(X(4),Y(2));g.lineTo(X(4),Y(3));g.lineTo(X(5),Y(3));g.lineTo(X(5),Y(4));g.stroke();
 const gap=10,bw=(A.W-16-gap)/2;PB=[[1,'Metal'],[0,'Non-metal']].map(([z,l],k)=>{const r={z,x:8+k*(bw+gap),y:by,w:bw,h:bh};K.tile(r,l,{n:17,no:t.bad===z,bg:z?'#dbeafe':'#fef3c7'});return r})}
/* ---------- oxides in universal indicator ---------- */
let BK=null,OC=[];
function dunk(i){const o=S.o,it=M.OX[i];if(!it||o.res.includes(i))return;o.res.push(i);o.cur=i;o.drag=null;A.sound.pop();
 const left=M.OX.length-o.res.length;note(`${cap(it.n)}: pH about ${it.ph}, ${it.ph>7?'alkaline':'acidic'}. ${it.met?'A metal oxide is basic.':'A non-metal oxide is acidic.'}`+(left?` ${left} to test.`:''),false)}
function drawOxide(){const o=S.o,all=o.res.length>=M.OX.length,y0=K.banner(all?M.DONE[5]:M.TXT[5],all?'ok':'',S.msg,S.bad),g=A.ctx;
 const ch=Math.min(A.H*.2,84),cy=A.H-ch-6,bw=Math.min(A.W*.32,150),bh=cy-y0-14;BK={x:(A.W-bw)/2,y:y0+4,w:bw,h:bh};const it=o.cur!=null?M.OX[o.cur]:null,ph=it?it.ph:7;
 g.fillStyle=M.uiCol(ph);g.fillRect(BK.x+6,BK.y+bh*.3,bw-12,bh*.7-6);g.strokeStyle=A.col.dark?'#e2e8f0':'#334155';g.lineWidth=3;g.beginPath();g.moveTo(BK.x,BK.y);g.lineTo(BK.x+6,BK.y+bh);g.lineTo(BK.x+bw-6,BK.y+bh);g.lineTo(BK.x+bw,BK.y);g.stroke();
 label(`pH ${ph}`,BK.x+bw/2,BK.y+bh*.62);
 const sx=BK.x+bw+12,sw=Math.min(36,A.W-sx-8);if(sw>18)[1,3,5,7,9,11,13].forEach((p,k)=>{g.fillStyle=M.uiCol(p);g.fillRect(sx,BK.y+k*(bh/7),sw,bh/7-2)});
 const gap=6,cw=(A.W-16-gap*3)/4;OC=M.OX.map((q,i)=>({i,x:8+i*(cw+gap),y:cy,w:cw,h:ch}));
 OC.forEach(r=>{const q=M.OX[r.i],d=o.drag&&o.drag.i===r.i?o.drag:null;K.tile(d?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch}:r,[q.k,o.res.includes(r.i)?`pH ${q.ph}`:q.n.split(' ')[0]],{n:15,sel:!!d,ok:o.res.includes(r.i)&&!d})})}
/* ---------- wiring ---------- */
const cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
function draw(){bg();const m=kind();if(m==='quiz'){K.banner('Challenge: metals and non-metals','ok');return}
 if(SET[m])drawBench(m);else({evid:drawEvid,table:drawTable,oxide:drawOxide})[m]();A.fx.draw(A.ctx)}
function down(p){const m=kind();
 if(SET[m]){const r=CH.find(r=>inR(p,r));if(r&&S.b.res[r.i]==null){S.b.drag={i:r.i,x:p.x,y:p.y,sx:p.x,sy:p.y};return true}return false}
 if(m==='evid'){if(EC&&inR(p,EC)){S.e.drag={x:p.x,y:p.y};return true}const r=BX.find(r=>inR(p,r));if(r)sortEl(r.z);return false}
 if(m==='table'){const r=PB.find(r=>inR(p,r));if(r)placeEl(r.z);return false}
 if(m==='oxide'){const r=OC.find(r=>inR(p,r));if(r&&!S.o.res.includes(r.i)){S.o.drag={i:r.i,x:p.x,y:p.y,sx:p.x,sy:p.y};return true}return false}return false}
function move(p){const m=kind(),d=SET[m]?S.b.drag:m==='evid'?S.e.drag:m==='oxide'?S.o.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=kind();
 if(SET[m]&&S.b.drag){const d=S.b.drag;S.b.drag=null;if(Math.hypot(p.x-d.sx,p.y-d.sy)<=12||inR(p,STN))test(d.i);else{A.redraw();note('Drop the sample on the test at the top.',false)}}
 if(m==='evid'&&S.e.drag){S.e.drag=null;const r=BX.find(r=>inR(p,r));if(r)sortEl(r.z);else{A.redraw();note('Drop the card in Metal or Non-metal.',false)}}
 if(m==='oxide'&&S.o.drag){const d=S.o.drag;S.o.drag=null;if(Math.hypot(p.x-d.sx,p.y-d.sy)<=12||inR(p,BK))dunk(d.i);else{A.redraw();note('Drop the oxide in the beaker.',false)}}}
function wipe(){epoch++;for(const k in S)delete S[k];Object.assign(S,{b:{res:{},cur:null,drag:null},e:{i:0,bad:-1,drag:null},t:{i:0,done:[],bad:-1},o:{res:[],cur:null,drag:null},msg:null,bad:false,chk:()=>{}})}
function note(t,bad){S.msg=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pad();S.chk()}
const fin=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(M.DONE[i]+A.reveal(i))};
function begin(i,ok){wipe();c.say(M.DESC[i]);A.cv.setAttribute('aria-label',M.DESC[i]);S.chk=fin(i,ok);pad();A.redraw()}
function demo(i,acts){steps[i].go();const e=epoch;let t=0;acts.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function pad(){if(!ctl)return;ctl.innerHTML='';const m=kind(),Bn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(SET[m])SET[m].forEach((it,i)=>{if(S.b.res[i]==null)Bn(`Test ${it.n}`,()=>test(i))});
 if(m==='evid'&&M.EVID[S.e.i]){const it=M.EVID[S.e.i];Bn('Metal',()=>sortEl(1),`${it.n} is a metal`);Bn('Non-metal',()=>sortEl(0),`${it.n} is a non-metal`)}
 if(m==='table'&&M.PLACE[S.t.i]){const s=M.PLACE[S.t.i].s;Bn('Metal',()=>placeEl(1),`${s} is a metal`);Bn('Non-metal',()=>placeEl(0),`${s} is a non-metal`)}
 if(m==='oxide')M.OX.forEach((q,i)=>{if(!S.o.res.includes(i))Bn(`Add ${q.n}`,()=>dunk(i))})}
const metOf=s=>M.PT.find(q=>q[0]===s)[1];
const steps=[
{h:'Circuit test',p:M.TXT[0],predict:{q:'Graphite (pencil lead) is carbon, a non-metal. Will it light the bulb?',opts:['No, only metals conduct','Yes, it conducts'],ans:1},task:'Test all 5 elements',
 show:()=>demo(0,M.CIRC.map((_,i)=>[450,()=>test(i)])),go:()=>begin(0,()=>Object.keys(S.b.res).length>=M.CIRC.length)},
{h:'Hammer test',p:M.TXT[1],task:'Hit all 5 samples',
 show:()=>demo(1,M.HAMM.map((_,i)=>[450,()=>test(i)])),go:()=>begin(1,()=>Object.keys(S.b.res).length>=M.HAMM.length)},
{h:'Magnet test',p:M.TXT[2],predict:{q:'Will a magnet pull every metal?',opts:['Yes, all metals are magnetic','No, only a few metals'],ans:1},task:'Test all 5 samples',
 show:()=>demo(2,M.MAGN.map((_,i)=>[450,()=>test(i)])),go:()=>begin(2,()=>Object.keys(S.b.res).length>=M.MAGN.length)},
{h:'Weigh the evidence',p:M.TXT[3],task:'Sort all 6 elements',
 show:()=>demo(3,M.EVID.map(it=>[450,()=>sortEl(it.met)])),go:()=>begin(3,()=>S.e.i>=M.EVID.length)},
{h:'The staircase',p:M.TXT[4],predict:{q:'Hydrogen sits above group 1, on the left. Is it a metal?',opts:['Yes, it is on the left','No, it is a non-metal'],ans:1},task:'Place all 6 elements',
 show:()=>demo(4,M.PLACE.map(it=>[450,()=>placeEl(metOf(it.s))])),go:()=>begin(4,()=>S.t.i>=M.PLACE.length)},
{h:'Oxides: acid or alkali?',p:M.TXT[5],predict:{q:'Magnesium oxide in water with universal indicator turns...',opts:['Red: acidic','Blue: alkaline'],ans:1},task:'Test all 4 oxides',
 show:()=>demo(5,M.OX.map((_,i)=>[450,()=>dunk(i)])),go:()=>begin(5,()=>S.o.res.length>=M.OX.length)},
{h:'Challenge',p:'',go:()=>{wipe();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.chk()});
function why(t){let m='Weigh several properties: shine, conducting, malleability and the oxide all count.';
 if(t==='shiny')m='Shine alone does not decide: iodine is shiny but brittle and an insulator, so it is a non-metal.';
 if(t==='conduct')m='Graphite conducts, but carbon is a non-metal. Conducting alone does not prove metal.';
 if(t==='magnet')m='Only iron, nickel and cobalt (and steel) are magnetic. Copper and aluminium are metals that a magnet ignores.';
 if(t==='solid')m='Mercury is a metal that is liquid at room temperature. Not every metal is a solid.';
 if(t==='left')m='Hydrogen is the exception: it sits above group 1 but is a non-metal gas.';
 if(t==='oxide')m='Metal oxides are basic: in water they make an alkali, so indicator goes blue or purple.';
 return m}
function pose(){qn++;const Q=M.QS[qn%M.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 qa.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=qa.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function grade(t,a){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Correct.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:X=>{qa.hidden=X.step!==6;ctl.hidden=X.step===6;pad()},
 init:X=>{A=X;K=M.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Metals lab buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});pad()}}).start()})})();
