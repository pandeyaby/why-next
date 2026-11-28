/* Flagship – The multiples of 10 (Mathematics, ages 6-7; CCSS 1.NBT.B.2a/2c, NC England Y1-Y2 place value). The learner
   ties loose sticks into bundles of ten, lays 6 bundles on a mat to make 60, writes 40 and 70 with digit tiles in a
   Tens box and a Ones box (the 0 holds the ones place), matches sixty / sixteen / forty / fourteen to bundle pictures,
   and jumps a frog along a 0-100 track in tens. Data and drawings: mult10_art.js. */
(()=>{const Q=MTN;
VIS.reg('flagmult10',c=>{c.fig.classList.add('young');
let A,pad,box,qn=-1,gen=0,hold=null,zones={};const S={};
const KEYS=['tie','mat','write','ty','jump','chal'],key=()=>KEYS[A.step];
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function say(msg,bad){S.msg=msg;S.bad=!!bad;c.say(msg);A.cv.setAttribute('aria-label',msg);buttons();A.redraw();S.check()}
const mood=f=>f?'ok':S.bad?'no':'';
/* ---- step 1: tie bundles of ten ---- */
function addStick(){const t=S.t;if(!t.loose)return;if(t.band>=10){A.sound.miss();return say('The band has 10 sticks. A ten is exactly 10. Tie it before you add more.',true)}
 t.loose--;t.band++;A.sound.tick();say(t.band===10?'10 sticks! Tie the band to make 1 ten.':`${t.band} in the band.`,false)}
function tie(){const t=S.t;if(!t.band)return say('Put sticks in the band first.',true);
 if(t.band<10){A.sound.miss();return say(`That is only ${t.band} sticks. A ten needs 10 sticks, no more and no less.`,true)}
 t.band=0;t.made++;A.sound.pop();say(`${t.made} ${t.made===1?'ten':'tens'} and ${t.loose} loose ${t.loose===1?'stick':'sticks'}.`,false)}
function viewTie(){const t=S.t,g=A.ctx,dk=A.col.dark,fin=t.made===3&&!t.loose;
 const y0=Q.banner(A,fin?Q.DONE[0]:'Put 10 sticks in the band, then tie it. Make bundles of ten.',mood(fin),S.msg,S.bad),hw=(A.W-24)/2,h=Math.max(120,(A.H-y0)*.55);
 const pile={x:8,y:y0+4,w:hw,h},band={x:16+hw,y:y0+4,w:hw,h};zones={pile,band};
 [pile,band].forEach((r,i)=>{const over=hold&&i===1&&inside(hold,r);g.fillStyle=over?(dk?'#1e3a8a':'#dbeafe'):(dk?'#1e293b':'#fffbeb');Q.rr(g,r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=over?Q.SEL:Q.EDGE;g.lineWidth=over?3:1.5;g.stroke();
  g.font=`800 ${A.narrow?15:17}${Q.F}`;g.fillStyle=dk?Q.LIGHT:Q.INK;g.textAlign='center';g.textBaseline='top';g.fillText(i?'Band':`Loose: ${t.loose}`,r.x+r.w/2,r.y+6)});
 const sw=A.narrow?7:9,sh=Math.min(70,h-44);for(let i=0;i<t.loose;i++){if(hold&&i===t.loose-1)continue;const col=i%10,row=Math.floor(i/10);Q.stick(g,pile.x+10+col*(pile.w-24)/10+(row%2)*4,pile.y+32+row*(sh*.32),sw,sh*.9,dk)}
 for(let i=0;i<t.band;i++)Q.stick(g,band.x+band.w/2-5*(sw+3)+i*(sw+3),band.y+34,sw,sh,dk);
 if(t.band===10){g.fillStyle='#dc2626';g.fillRect(band.x+band.w/2-5*(sw+3)-3,band.y+34+sh*.44,10*(sw+3)+3,sh*.12)}
 const by=y0+h+14,bw=A.narrow?38:46;g.font=`800 ${A.narrow?15:17}${Q.F}`;g.fillStyle=dk?Q.LIGHT:Q.INK;g.textAlign='left';g.textBaseline='top';g.fillText(`Tens made: ${t.made}`,12,by);
 for(let i=0;i<t.made;i++)Q.bundle(g,30+i*(bw+18),by+26,bw,Math.min(90,A.H-by-34),dk);
 if(hold)Q.stick(g,hold.x-sw/2,hold.y-sh/2,sw,sh,dk)}
/* ---- step 2: lay 6 tens on the mat ---- */
function putOn(kind){const m=S.m;if(m.b===Q.BUILD)return say(`You have ${Q.BUILD*10}. One more bundle would make ${Q.BUILD*10+10}.`,true);
 if(kind==='one'){A.sound.miss();return say('A single stick is 1 one. 60 has 0 ones, so it needs bundles only.',true)}
 m.b++;A.sound.pop();say(`${m.b} ${m.b===1?'ten':'tens'} is ${m.b*10}.`,false)}
function viewMat(){const m=S.m,g=A.ctx,dk=A.col.dark,fin=m.b===Q.BUILD,y0=Q.banner(A,fin?Q.DONE[1]:'Put tens on the mat to make 60.',mood(fin),S.msg,S.bad);
 const mat={x:8,y:y0+4,w:A.W-16,h:Math.max(110,(A.H-y0)*.42)};zones={mat};const over=hold&&inside(hold,mat);
 g.fillStyle=over?(dk?'#1e3a8a':'#dbeafe'):(dk?'#14532d':'#dcfce7');Q.rr(g,mat.x,mat.y,mat.w,mat.h,14);g.fill();g.strokeStyle=over?Q.SEL:Q.OK;g.lineWidth=2.5;g.stroke();
 const bw=Math.min(40,(mat.w-30)/7-8);for(let i=0;i<m.b;i++)Q.bundle(g,mat.x+20+bw/2+i*(bw+10),mat.y+12,bw,mat.h-24,dk);
 const ry=mat.y+mat.h+10;g.font=`900 ${A.narrow?22:28}${Q.F}`;g.fillStyle=dk?Q.LIGHT:Q.INK;g.textAlign='center';g.textBaseline='top';g.fillText(`${m.b} tens  0 ones  =  ${m.b*10}`,A.W/2,ry);
 const ty=ry+(A.narrow?36:44),tw=(A.W-28)/2,th=Math.max(70,A.H-ty-10);zones.ten={x:8,y:ty,w:tw,h:th,kind:'ten'};zones.one={x:20+tw,y:ty,w:tw,h:th,kind:'one'};
 [zones.ten,zones.one].forEach(r=>{g.fillStyle=dk?'#1e293b':'#ffffff';Q.rr(g,r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=Q.EDGE;g.lineWidth=1.5;g.stroke();
  g.font=`800 ${A.narrow?14:16}${Q.F}`;g.fillStyle=dk?'#cbd5e1':'#334155';g.textAlign='center';g.textBaseline='bottom';g.fillText(r.kind==='ten'?'A ten (10)':'One stick (1)',r.x+r.w/2,r.y+r.h-4);
  const hh=Math.min(70,r.h-30);if(r.kind==='ten')Q.bundle(g,r.x+r.w/2,r.y+6,32,hh,dk);else Q.stick(g,r.x+r.w/2-4,r.y+6,8,hh,dk)});
 if(hold){if(hold.kind==='ten')Q.bundle(g,hold.x,hold.y-30,32,60,dk);else Q.stick(g,hold.x-4,hold.y-30,8,60,dk)}}
/* ---- step 3: write the number with digit tiles ---- */
function drop(d,place){const w=S.w,N=Q.ROUNDS[w.r];if(w.r>=Q.ROUNDS.length||w[place]!=null)return;w.pick=null;
 if(place==='tens'){if(d===N){w.tens=d;A.sound.pop();if(w.ones==null)return say(`${N} tens. The card reads ${N} _ . What goes in the ones box?`,false)}
  else{w.bad=d;A.sound.miss();return say(d===0?`0 in the tens place says no tens, but there are ${N} bundles.`:`Count the bundles: there are ${N}, so the tens digit is ${N}.`,true)}}
 else{if(d===0){w.ones=0;A.sound.pop();if(w.tens==null)return say('0 ones: no loose sticks. Now the tens box.',false)}
  else{w.bad=d;A.sound.miss();return say(d===N?`${N} in the ones place would mean ${N} loose sticks. There are none, so write 0.`:'There are no loose sticks, so the ones digit is 0.',true)}}
 w.ok.push(N*10);w.r++;w.tens=w.ones=null;w.bad=null;say(`${N} tens and 0 ones is ${N*10}.`+(w.r<Q.ROUNDS.length?` Now write ${Q.ROUNDS[w.r]} tens.`:''),false)}
function viewWrite(){const w=S.w,g=A.ctx,dk=A.col.dark,fin=w.r>=Q.ROUNDS.length,N=Q.ROUNDS[Math.min(w.r,Q.ROUNDS.length-1)];
 const y0=Q.banner(A,fin?Q.DONE[2]:`Write the number for ${N} tens.`,mood(fin),S.msg,S.bad),ph=Math.min(110,(A.H-y0)*.26);
 Q.group(g,{x:8,y:y0,w:A.W-16,h:ph},fin?0:N,0,dk);zones={};const bw=Math.min(120,(A.W-48)/2),bh=A.narrow?72:84,bx=A.W/2-bw-6,by=y0+ph+28;
 ['tens','ones'].forEach((pl,i)=>{const r={x:bx+i*(bw+12),y:by,w:bw,h:bh,pl};zones[pl]=r;const v=w[pl],over=hold&&inside(hold,r);
  g.font=`800 ${A.narrow?14:16}${Q.F}`;g.fillStyle=dk?'#cbd5e1':'#334155';g.textAlign='center';g.textBaseline='bottom';g.fillText(i?'Ones':'Tens',r.x+bw/2,r.y-3);
  if(v!=null)Q.tile(g,r,String(v),'ok',44,dk);else{g.fillStyle=over?(dk?'#1e3a8a':'#dbeafe'):(dk?'#0f172a':'#f8fafc');Q.rr(g,r.x,r.y,bw,bh,12);g.fill();g.setLineDash([7,5]);g.strokeStyle=over?Q.SEL:(dk?'#cbd5e1':Q.EDGE);g.lineWidth=2.5;g.stroke();g.setLineDash([])}});
 if(w.ok.length){g.font=`800 ${A.narrow?15:17}${Q.F}`;g.fillStyle=dk?'#86efac':Q.OK;g.textAlign='center';g.textBaseline='top';g.fillText('Written: '+w.ok.join(', '),A.W/2,by+bh+8)}
 zones.tiles=[];if(fin)return;const ts=Math.min(60,(A.W-24)/5-8),ty=by+bh+36;
 for(let d=0;d<10;d++){const r={d,x:A.W/2-2.5*(ts+8)+4+(d%5)*(ts+8),y:ty+Math.floor(d/5)*(ts+8),w:ts,h:ts};zones.tiles.push(r);if(hold&&hold.d===d)continue;Q.tile(g,r,String(d),w.bad===d?'no':w.pick===d?'sel':'',28,dk)}
 if(hold&&hold.d!=null)Q.tile(g,{x:hold.x-ts/2,y:hold.y-ts/2,w:ts,h:ts},String(hold.d),'sel',28,dk)}
/* ---- step 4: -ty or -teen ---- */
function match(wi,pi){const y=S.y,W=Q.WORDS[wi],P=Q.PICS[pi];if(y.at[wi]!=null)return;y.pick=null;
 if(Object.values(y.at).includes(pi))return say('That picture already has its word.',true);
 if(W.t!==P.t||W.o!==P.o){y.bad=wi;A.sound.miss();return say(Q.wordNo(W,P),true)}
 y.at[wi]=pi;y.bad=-1;A.sound.pop();say(`${W.w} is ${W.t*10+W.o}: ${W.t} ${W.t===1?'ten':'tens'} and ${W.o} ones.`,false)}
function viewTy(){const y=S.y,g=A.ctx,dk=A.col.dark,n=Object.keys(y.at).length,fin=n===4,y0=Q.banner(A,fin?Q.DONE[3]:`Drag each word onto its picture. (${n} of 4)`,mood(fin),S.msg,S.bad);
 const pw=(A.W-28)/2,ph=Math.min(120,(A.H-y0)*.3);zones={pics:[],words:[]};
 Q.PICS.forEach((P,i)=>{const r={i,x:8+(i%2)*(pw+12),y:y0+4+Math.floor(i/2)*(ph+10),w:pw,h:ph};zones.pics.push(r);const wi=Object.keys(y.at).find(k=>y.at[k]===i),over=hold&&hold.wi!=null&&inside(hold,r);
  g.fillStyle=wi!=null?(dk?'#14532d':'#dcfce7'):over?(dk?'#1e3a8a':'#dbeafe'):(dk?'#1e293b':'#ffffff');Q.rr(g,r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=wi!=null?Q.OK:over?Q.SEL:Q.EDGE;g.lineWidth=2;g.stroke();
  Q.group(g,{x:r.x,y:r.y,w:r.w*.66,h:r.h-24},P.t,P.o,dk);g.font=`900 ${A.narrow?24:30}${Q.F}`;g.fillStyle=dk?Q.LIGHT:Q.INK;g.textAlign='right';g.textBaseline='middle';g.fillText(String(P.t*10+P.o),r.x+r.w-10,r.y+(r.h-24)/2);
  g.font=`800 ${A.narrow?15:17}${Q.F}`;g.textAlign='center';g.textBaseline='bottom';g.fillStyle=dk?'#86efac':Q.OK;if(wi!=null)g.fillText(Q.WORDS[wi].w,r.x+r.w/2,r.y+r.h-4)});
 const wy=y0+4+2*(ph+10)+8,ww=(A.W-28)/2,wh=52;let j=0;
 Q.WORDS.forEach((W,i)=>{if(y.at[i]!=null)return;const r={wi:i,x:8+(j%2)*(ww+12),y:wy+Math.floor(j/2)*(wh+10),w:ww,h:wh};j++;zones.words.push(r);if(hold&&hold.wi===i)return;Q.tile(g,r,W.w,y.bad===i?'no':y.pick===i?'sel':'',24,dk)});
 if(hold&&hold.wi!=null)Q.tile(g,{x:hold.x-ww/2,y:hold.y-wh/2,w:ww,h:wh},Q.WORDS[hold.wi].w,'sel',24,dk)}
/* ---- step 5: jump in tens ---- */
function hop(v){const j=S.j;if(j.n>=100)return;const opt=Q.next(j.n).find(o=>o[0]===v);if(!opt)return;
 if(opt[1]==='ok'){j.n=v;j.bad=null;A.sound.pop();A.tween(j,{fx:v},380,'out');return say(v===100?'100! 10 tens make 100.':`${v}: ${v/10} tens.`,false)}
 j.bad=v;A.sound.miss();say(opt[1]==='ones'?`${v} is just 1 more than ${j.n}. A jump of 10 lands on ${j.n+10}.`:opt[1]==='big'?'100 is 10 tens. One jump is only 1 ten: 10.':`${v} is just ${v} ones. ${v} tens is written ${v}0.`,true)}
const order=n=>{const o=Q.next(n),k=(n/10)%3;return o.slice(k).concat(o.slice(0,k))};
function viewJump(){const j=S.j,g=A.ctx,dk=A.col.dark,fin=j.n>=100,y0=Q.banner(A,fin?Q.DONE[4]:`Count in tens. Where does the frog land after ${j.n}?`,mood(fin),S.msg,S.bad);
 const x0=24,x1=A.W-24,ly=y0+70,X=v=>x0+(x1-x0)*v/100;g.strokeStyle=dk?'#cbd5e1':Q.EDGE;g.lineWidth=4;g.beginPath();g.moveTo(x0,ly);g.lineTo(x1,ly);g.stroke();
 for(let v=0;v<=100;v+=10){const seen=v<=j.n;g.lineWidth=2;g.beginPath();g.moveTo(X(v),ly-9);g.lineTo(X(v),ly+9);g.stroke();g.font=`800 ${A.narrow?12:15}${Q.F}`;g.fillStyle=seen?(dk?Q.LIGHT:Q.INK):(dk?'#94a3b8':'#475569');g.textAlign='center';g.textBaseline='top';g.fillText(seen?String(v):'?',X(v),ly+13)}
 for(let v=10;v<=j.n;v+=10){g.strokeStyle=dk?'#86efac':Q.OK;g.lineWidth=2.5;g.beginPath();g.arc((X(v)+X(v-10))/2,ly-4,(X(v)-X(v-10))/2,Math.PI,0);g.stroke()}
 Q.frog(g,X(j.fx),ly-20,A.narrow?12:15);
 const t=j.n/10,gy=ly+40;g.font=`800 ${A.narrow?15:17}${Q.F}`;g.fillStyle=dk?Q.LIGHT:Q.INK;g.textAlign='left';g.textBaseline='top';g.fillText(`${t} ${t===1?'ten':'tens'} = ${j.n}`,12,gy);
 Q.group(g,{x:4,y:gy+20,w:A.W-8,h:Math.min(90,(A.H-gy)*.4)},t,0,dk);zones={hops:[]};if(fin)return;
 const tw=Math.min(110,(A.W-40)/3),th=60,ty=A.H-th-12;order(j.n).forEach(([v],i)=>{const r={v,x:A.W/2-1.5*tw-10+i*(tw+10),y:ty,w:tw,h:th};zones.hops.push(r);Q.tile(g,r,String(v),j.bad===v?'no':'',30,dk)})}
/* ---- challenge ---- */
function why(tag){let m='Count the bundles: each one is a ten.';
 if(tag==='zero')m='Without the 0, the digit sits in the ones place and means ones. Write 0 ones to keep the tens in the tens place.';
 if(tag==='teen')m='A -teen number has just 1 ten. A -ty number like sixty has 6 tens.';
 if(tag==='count')m='50 is the number of sticks. Each bundle is 10 sticks, so 50 is 5 tens.';
 if(tag==='place')m='In a two-digit number the left digit counts tens. The 0 is in the ones place.';
 if(tag==='ones')m='That is only 1 more. Counting in tens, each jump adds 10.';
 if(tag==='skip')m='That jumps 2 tens. Count on just 1 ten.';
 if(tag==='none')m='90 is not nothing. The 9 shows 9 tens. The 0 says there are no loose ones.';return m}
function pose(){qn++;const T=Q.QS[qn%Q.QS.length],all=[[T.a,'ok'],...T.o],k=(qn+1)%3,list=all.slice(k).concat(all.slice(0,k));
 box.innerHTML=`<p><b>${T.q}</b></p><div class="fl-pick" role="group" aria-label="Choose one answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 list.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},box.querySelector('.fl-pick'),v).onclick=()=>judge(tag,T.a)});c.say('Challenge: '+T.q);A.cv.setAttribute('aria-label','Challenge: '+T.q);A.redraw()}
function judge(tag,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=tag==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`\u2713 Yes: ${a}.`:'\u2717 '+why(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=pose;c.say(good?'Yes.':why(tag))}
/* ---- wiring ---- */
const VIEW={tie:viewTie,mat:viewMat,write:viewWrite,ty:viewTy,jump:viewJump};
function draw(){const g=A.ctx,dk=A.col.dark;g.fillStyle=dk?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=key();
 if(k==='chal'){const y=Q.banner(A,'Challenge: the multiples of 10','ok');Q.group(g,{x:10,y:y+10,w:A.W-20,h:Math.min(120,A.H-y-20)},5,0,dk);return}VIEW[k]();A.fx.draw(g)}
function down(p){const k=key();
 if(k==='tie'){if(inside(p,zones.pile)&&S.t.loose){hold={x:p.x,y:p.y,x0:p.x,y0:p.y,z:'pile'};A.redraw();return true}if(inside(p,zones.band))tie();return false}
 if(k==='mat'){const r=[zones.ten,zones.one].find(q=>inside(p,q));if(r){hold={kind:r.kind,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='write'){const t=(zones.tiles||[]).find(q=>inside(p,q));if(t){hold={d:t.d,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const pl=['tens','ones'].find(q=>inside(p,zones[q]));if(pl&&S.w.pick!=null)drop(S.w.pick,pl);return false}
 if(k==='ty'){const w=zones.words.find(q=>inside(p,q));if(w){hold={wi:w.wi,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const pc=zones.pics.find(q=>inside(p,q));if(pc&&S.y.pick!=null)match(S.y.pick,pc.i);return false}
 if(k==='jump'){const h=(zones.hops||[]).find(q=>inside(p,q));if(h)hop(h.v);return false}return false}
function move(p){if(hold){hold.x=p.x;hold.y=p.y;A.redraw()}}
function up(p){if(!hold)return;const h=hold,k=key(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<10;hold=null;
 if(k==='tie'){if(tap||inside(p,zones.band))return addStick();return A.redraw()}
 if(k==='mat'){if(tap||inside(p,zones.mat))return putOn(h.kind);return A.redraw()}
 if(k==='write'){const pl=['tens','ones'].find(q=>inside(p,zones[q]));if(pl)return drop(h.d,pl);if(tap){S.w.pick=h.d;return say(`Picked ${h.d}. Now tap a box.`,false)}return A.redraw()}
 if(k==='ty'){const pc=zones.pics.find(q=>inside(p,q));if(pc)return match(h.wi,pc.i);if(tap){S.y.pick=h.wi;return say(`Picked ${Q.WORDS[h.wi].w}. Now tap a picture.`,false)}A.redraw()}}
function reset(){gen++;hold=null;for(const k in S)delete S[k];
 Object.assign(S,{t:{loose:Q.LOOSE,band:0,made:0},m:{b:0},w:{r:0,tens:null,ones:null,pick:null,bad:null,ok:[]},y:{at:{},pick:null,bad:-1},j:{n:0,fx:0,bad:null},msg:null,bad:false,check:()=>{}})}
function begin(i,goal){reset();c.say(Q.DESC[i]);A.cv.setAttribute('aria-label',Q.DESC[i]);
 S.check=()=>{if(A.step===i&&!A.isDone&&goal()&&(!PLAN[i].predict||A.pred[i]!=null))A.done(Q.DONE[i]+A.reveal(i))};buttons();A.redraw()}
function play(i,acts){PLAN[i].go();const e=gen;let t=0;acts.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===gen)f()},t)})}
function buttons(){if(!pad)return;pad.innerHTML='';const k=key(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='tie'&&S.t&&!(S.t.made===3&&!S.t.loose)){b('Put a stick in the band',addStick,`Put one loose stick in the band. ${S.t.band} in the band now`);b('Tie the band',tie,`Tie the ${S.t.band} sticks in the band into a bundle`)}
 if(k==='mat'&&S.m&&S.m.b<Q.BUILD){b('Put a ten on the mat',()=>putOn('ten'),`Put a bundle of 10 on the mat. ${S.m.b} tens now`);b('Put one stick on the mat',()=>putOn('one'),'Put a single stick on the mat')}
 if(k==='write'&&S.w&&S.w.r<Q.ROUNDS.length){const N=Q.ROUNDS[S.w.r],pl=S.w.tens==null?'tens':'ones';[0,N,N===4?6:3].forEach(d=>b(`${d} in ${pl}`,()=>drop(d,pl),`Put the digit ${d} in the ${pl} box`))}
 if(k==='ty'&&S.y){const wi=Q.WORDS.findIndex((_,i)=>S.y.at[i]==null);if(wi>=0)Q.PICS.forEach((P,pi)=>{if(!Object.values(S.y.at).includes(pi))b(`${Q.WORDS[wi].w} = ${P.t*10+P.o}`,()=>match(wi,pi),`Put the word ${Q.WORDS[wi].w} on the picture of ${P.t*10+P.o}`)})}
 if(k==='jump'&&S.j&&S.j.n<100)order(S.j.n).forEach(([v])=>b(`Jump to ${v}`,()=>hop(v),`The frog is on ${S.j.n}. Jump to ${v}`))}
const PLAN=[
{h:'Bundles of ten',p:Q.TXT[0],predict:{q:'30 loose sticks. How many bundles of ten can you make?',opts:['30','3','10'],ans:1},task:'Tie all 30 sticks into tens',
 show:()=>play(0,[0,1,2].flatMap(()=>[...Array(10)].map(()=>[70,addStick]).concat([[120,tie]]))),go:()=>begin(0,()=>S.t.made===3&&!S.t.loose)},
{h:'Six tens',p:Q.TXT[1],predict:{q:'6 bundles of ten. What number is that?',opts:['6','16','60'],ans:2},task:'Put tens on the mat to make 60',
 show:()=>play(1,[...Array(Q.BUILD)].map(()=>[450,()=>putOn('ten')])),go:()=>begin(1,()=>S.m.b===Q.BUILD)},
{h:'The zero',p:Q.TXT[2],predict:{q:'How do you write 4 tens and no ones?',opts:['4','40','400'],ans:1},task:'Write 40, then 70',
 show:()=>play(2,Q.ROUNDS.flatMap(N=>[[500,()=>drop(N,'tens')],[500,()=>drop(0,'ones')]])),go:()=>begin(2,()=>S.w.r>=Q.ROUNDS.length)},
{h:'Sixty or sixteen?',p:Q.TXT[3],task:'Match all 4 words',
 show:()=>play(3,Q.WORDS.map((W,wi)=>[450,()=>match(wi,Q.PICS.findIndex(P=>P.t===W.t&&P.o===W.o))])),go:()=>begin(3,()=>Object.keys(S.y.at).length===4)},
{h:'Count in tens',p:Q.TXT[4],predict:{q:'10, 20, 30 and on. What comes after 90?',opts:['91','100','190'],ans:1},task:'Jump the frog from 0 to 100 in tens',
 show:()=>play(4,[...Array(10)].map((_,i)=>[380,()=>hop(10*i+10)])),go:()=>begin(4,()=>S.j.n>=100)},
{h:'Challenge',p:'',go:()=>{reset();pose()}}];
PLAN.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
FK.shell(c,{steps:PLAN,ratio:.74,tall:1.45,draw,onStep:X=>{box.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Multiples of 10 lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();
  A.gest({down,move,up});buttons()}}).start()})})();
