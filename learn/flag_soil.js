/* Flagship – rocks and soil (Science, ages 7-8; National Curriculum Year 3 Rocks: 'recognise that soils are made from
   rocks and organic matter'). Fill a jar with what soil is really made of (rock bits, humus, water, air, living things;
   plastic and sugar are refused), shake soil in water and name the layers as they settle (sand first, then silt, then
   clay, humus floating), pour 100 ml through sandy, loam and clay soil and read the cylinders, match soils to jobs, and
   put the slow steps of soil-making in order (up to 1,000 years for 1 cm). Data and drawings: soil_art.js. */
(()=>{const Z=SOIL;
VIS.reg('flagsoil',c=>{let A,T,dock,quiz,round=-1,epoch=0,held=null;const G={};c.fig.classList.add('young');
const KIND=['mix','shake','drain','jobs','form','chal'],kind=()=>KIND[A.step];
const hitIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
let SPOTS=[],JAR=null,BINS=[],CARD=null;
function cells(n,y,cols,cap){const gap=8,w=(A.W-16-gap*(cols-1))/cols,rows=Math.ceil(n/cols),h=Math.min((A.H-y-8)/rows-gap,cap);
 const out=[];for(let i=0;i<n;i++)out.push({i,x:8+(i%cols)*(w+gap),y:y+Math.floor(i/cols)*(h+gap),w,h});return out}
function note(t,bad){G.say=t;G.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();fillDock();G.test()}
/* ======== 1. what is soil made of ======== */
function addPart(i){const s=G.mx,x=Z.PARTS[i];if(s.inn.includes(i))return;
 if(!x.ok){s.bad=i;A.sound.miss();return note(`${x.t}? ${x.why}`,true)}
 s.inn.push(i);s.bad=-1;A.sound.pop();note(`${x.t} ${/s$/.test(x.t)?'go':'goes'} in. ${s.inn.length} of 5 parts of soil.`,false)}
function viewMix(){const s=G.mx,full=s.inn.length>=5,y0=T.banner(full?Z.DONE[0]:`Make soil: put its 5 parts in the jar. ${s.inn.length} of 5.`,full?'ok':G.bad?'no':'',G.say,G.bad),g=A.ctx;
 const jh=Math.min((A.H-y0)*.42,210),jw=Math.min(A.W*.34,jh*.8);JAR={x:16,y:y0+14,w:jw,h:jh};
 Z.jar(g,JAR,{dark:A.col.dark,fill:s.inn.map(i=>Z.PARTS[i].e)});
 if(full){const bx=JAR.x+jw+20,bw=A.W-bx-16;let yy=JAR.y+8;T.say('In a typical loam:',bx,yy,14);yy+=22;
  Z.MIX.forEach(([t,pc,col])=>{T.say(`${t}: ${pc}%`,bx,yy,13);g.fillStyle=col;Z.box(g,bx,yy+10,Math.max(8,bw*pc/50),12,4);g.fill();g.strokeStyle='#64748b';g.lineWidth=1;g.stroke();yy+=Math.min(36,(jh-30)/4)})}
 else{const bx=JAR.x+jw+20;T.say('Drag a card',bx,JAR.y+jh*.4,15);T.say('into the jar \u2190',bx,JAR.y+jh*.4+22,15)}
 SPOTS=cells(7,JAR.y+jh+14,4,92);SPOTS.forEach(r=>{const x=Z.PARTS[r.i],on=s.inn.includes(r.i);T.tile(r,x.t,{ok:on,no:s.bad===r.i,n:13,dy:r.h*.24});if(!(held&&held.i===r.i))Z.pic(g,x.e,r.x+r.w/2,r.y+r.h*.34,Math.min(r.w,r.h)*.34)});
 if(held)Z.pic(g,Z.PARTS[held.i].e,held.x,held.y,40)}
/* ======== 2. the shake test ======== */
const ORDER_BTN=[2,0,3,1];
function shakeJar(){const k=G.sk;if(k.shook)return;k.shook=true;k.murky=1;k.settle=0;A.sound.whoosh();note('Shake, shake! Now watch the bits settle.',false);
 A.tween(k,{settle:1,murky:0},1000,'out',()=>note('Settled. Tap the layers from the bottom up.',false))}
function nameLayer(j){const k=G.sk;if(!k.shook||k.settle<1||k.got>=4)return;
 if(j!==k.got){k.miss=j;A.sound.miss();return note(`Not that one yet. ${Z.LAYER_WHY[j]}`,true)}
 k.lab[j]=true;k.got++;k.miss=-1;A.sound.pop();note(Z.LAYER_WHY[j],false)}
function viewShake(){const k=G.sk,full=k.got>=4,y0=T.banner(full?Z.DONE[1]:!k.shook?'A jar of soil and water. Tap Shake.':`Name the layers, bottom first. ${k.got} of 4.`,full?'ok':G.bad?'no':'',G.say,G.bad);
 const jh=Math.min((A.H-y0)*.5,240),jw=Math.min(A.W*.36,jh*.75);JAR={x:A.W*.22-jw/2+8,y:y0+16,w:jw,h:jh};
 Z.jar(A.ctx,JAR,{dark:A.col.dark,water:1,murky:k.shook?k.murky:0,layers:k.shook?Z.LAYERS:[Z.LAYERS[0]],settle:k.shook?k.settle:1,lab:k.lab});
 const right={x:JAR.x+jw+90,y:JAR.y,w:A.W-(JAR.x+jw+98),h:jh};if(!k.shook){T.tile(right,'Shake!',{sel:1,n:20});SPOTS=[Object.assign({i:'go'},right)];}
 else{SPOTS=cells(4,JAR.y+jh+14,A.narrow?2:4,70).map((r,n)=>Object.assign(r,{i:ORDER_BTN[n]}));SPOTS.forEach(r=>T.tile(r,Z.LAYERS[r.i].t+' ('+Z.LAYERS[r.i].mm+')',{ok:k.lab[r.i],no:k.miss===r.i,n:14}))}}
/* ======== 3. the water test ======== */
function pour(){const d=G.dr;if(d.poured)return;d.poured=true;d.t=0;A.sound.whoosh();note('Pouring 100 ml of water on each soil. Watch the cylinders.',false);
 A.tween(d,{t:1},1100,'out',()=>note('One minute later. Tap the soil that let the MOST water through.',false))}
function pickPot(i){const d=G.dr;if(!d.poured||d.t<1||d.ask>=2)return;const P=Z.POTS[i],want=d.ask===0?0:2;
 if(i!==want){d.miss=i;A.sound.miss();return note(d.ask===0?`${P.t} let ${P.ml} ml through. Look for the fullest cylinder.`:`${P.t} let ${P.ml} ml through, so it held ${100-P.ml} ml. Which soil held back the most?`,true)}
 d.mark[i]='ok';d.miss=-1;d.ask++;A.sound.pop();note(d.ask===1?`Sandy: 80 ml through. Big grains leave big gaps. Now tap the soil that HELD the most water.`:'Clay: only 15 ml through. Its tiny bits leave tiny gaps, so it holds water.',false)}
function viewDrain(){const d=G.dr,full=d.ask>=2,y0=T.banner(full?Z.DONE[2]:!d.poured?'Three soils. Tap Pour to add 100 ml of water to each.':d.ask===0?'Which soil let the most water through?':'Which soil held the most water?',full?'ok':G.bad?'no':'',G.say,G.bad);
 const ph=Math.min(A.H-y0-90,260),w=(A.W-16)/3;SPOTS=Z.POTS.map((P,i)=>{const cx=8+w*(i+.5),r=Z.funnel(A.ctx,cx,y0+10,w-10,ph,P,d.poured?P.ml*d.t:0,A.col.dark,d.mark[i]||(d.miss===i?'no':''));
  T.say(P.t,cx,y0+ph+24,15,'center');if(d.poured)T.say(`${Math.round(P.ml*d.t)} ml`,cx,y0+ph+46,15,'center');return Object.assign(r,{i,h:ph+50})});
 if(!d.poured){const r={x:A.W/2-80,y:A.H-52,w:160,h:44};T.tile(r,'Pour 100 ml',{sel:1,n:16});SPOTS=[Object.assign({i:'go'},r)]}}
/* ======== 4. which soil for which job ======== */
function giveJob(s){const j=G.jb;if(j.k>=Z.JOBS.length)return;const J=Z.JOBS[j.k];
 if(s!==J.s){j.miss=s;A.sound.miss();return note(`Not ${Z.POTS[s].t.toLowerCase()}. ${J.why}`,true)}
 j.done.push([j.k,s]);j.k++;j.miss=-1;A.sound.pop();note(J.why,false)}
function viewJobs(){const j=G.jb,full=j.k>=Z.JOBS.length,J=Z.JOBS[Math.min(j.k,Z.JOBS.length-1)],y0=T.banner(full?Z.DONE[3]:`Which soil for this job? (${j.k+1} of 5)`,full?'ok':G.bad?'no':'',G.say,G.bad),g=A.ctx;
 const ch=Math.min(90,(A.H-y0)*.28);CARD=full?null:{x:A.W/2-Math.min(150,A.W*.4),y:y0+6,w:Math.min(300,A.W*.8),h:ch};
 if(CARD){const r=held?Object.assign({},CARD,{x:held.x-CARD.w/2,y:held.y-CARD.h/2}):CARD;T.tile(r,J.t,{sel:1,n:15,dy:ch*.18});Z.pic(g,J.e,r.x+r.w/2,r.y+ch*.3,ch*.36)}
 const by=y0+ch+24,bh=Math.min(A.H-by-10,170),bw=(A.W-16-16)/3;BINS=Z.POTS.map((P,i)=>{const r={i,x:8+i*(bw+8),y:by,w:bw,h:bh};
  Z.grains(g,r.x,r.y,r.w,r.h*.55,P.col,P.t==='Sandy'?4:P.t==='Loam'?2.6:1.3,30+i);g.lineWidth=j.miss===i?4:2;g.strokeStyle=j.miss===i?'#b91c1c':'#64748b';g.strokeRect(r.x,r.y,r.w,r.h*.55);
  T.say(P.t,r.x+r.w/2,r.y+r.h*.65,15,'center');j.done.filter(d=>d[1]===i).forEach((d,n)=>Z.pic(g,Z.JOBS[d[0]].e,r.x+r.w*(.25+.25*n),r.y+r.h*.85,22));return r});SPOTS=BINS}
/* ======== 5. making soil takes ages ======== */
function stage(i){const f=G.fm;if(f.n>=4||f.got.includes(i))return;
 if(i!==f.n){f.miss=i;A.sound.miss();return note(`Not yet. ${Z.MAKE_WHY[f.n]}`,true)}
 f.got.push(i);f.n++;f.miss=-1;A.sound.pop();note(`${f.n}. ${Z.MAKE[i].t}.`,false)}
function viewForm(){const f=G.fm,full=f.n>=4,y0=T.banner(full?Z.DONE[4]:`How is soil made? Tap the steps in order. Next: step ${f.n+1}.`,full?'ok':G.bad?'no':'',G.say,G.bad),g=A.ctx;
 const sh=Math.min((A.H-y0)*.3,120),sw=A.W-16,sy=y0+6;g.fillStyle=A.col.dark?'#1e293b':'#f1f5f9';Z.box(g,8,sy,sw,sh,10);g.fill();
 g.fillStyle='#78716c';g.fillRect(8,sy+sh*.7,sw,sh*.3);const top=sh*.7*Math.min(1,f.n/4);if(f.n>=2)Z.grains(g,8,sy+sh*.7-top*.5,sw,top*.5,'#a16207',2.4,5);if(f.n>=3){g.fillStyle='#3f2a14';g.fillRect(8,sy+sh*.7-top*.5-6,sw,6)}
 if(f.n>=4)Z.pic(g,'\u{1FAB1}',8+sw*.7,sy+sh*.58,26);if(f.n>=1){g.strokeStyle='#0f172a';g.lineWidth=2;g.beginPath();g.moveTo(8+sw*.3,sy+sh*.72);g.lineTo(8+sw*.33,sy+sh*.86);g.lineTo(8+sw*.31,sy+sh*.98);g.stroke()}
 if(full)T.say('1 cm of soil: up to 1,000 years',8+sw/2,sy+sh*.25,16,'center',A.col.dark?'#fde68a':'#92400e');
 SPOTS=cells(4,sy+sh+12,A.narrow?1:2,78).map((r,n)=>Object.assign(r,{i:Z.MAKE_SHOW[n]}));
 SPOTS.forEach(r=>{const k=f.got.indexOf(r.i);T.tile(r,(k>=0?`${k+1}. `:'')+Z.MAKE[r.i].t,{ok:k>=0,no:f.miss===r.i,n:15})})}
/* ======== wiring ======== */
const VIEW={mix:viewMix,shake:viewShake,drain:viewDrain,jobs:viewJobs,form:viewForm};
const TAP={mix:i=>addPart(i),shake:i=>i==='go'?shakeJar():nameLayer(i),drain:i=>i==='go'?pour():pickPot(i),jobs:i=>giveJob(i),form:i=>stage(i)};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#1c1917':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=kind();
 if(k==='chal'){const y0=T.banner('Challenge: rocks and soil','ok'),jh=Math.min(A.H-y0-30,220);Z.jar(g,{x:A.W/2-jh*.4,y:y0+20,w:jh*.8,h:jh},{dark:A.col.dark,water:1,layers:Z.LAYERS,settle:1});return}
 VIEW[k]();A.fx.draw(g)}
function down(p){const k=kind();
 if(k==='mix'){const r=SPOTS.find(q=>hitIn(p,q));if(r&&!G.mx.inn.includes(r.i)){held={i:r.i,x:p.x,y:p.y,from:p};A.redraw();return true}return false}
 if(k==='jobs'&&hitIn(p,CARD)){held={x:p.x,y:p.y};A.redraw();return true}
 const r=SPOTS.find(q=>hitIn(p,q));if(r)TAP[k](r.i);return false}
function move(p){if(held){held.x=p.x;held.y=p.y;A.redraw()}}
function up(p){if(!held)return;const h=held;held=null;const k=kind();
 if(k==='mix'){const tap=Math.hypot(p.x-h.from.x,p.y-h.from.y)<10;if(tap||hitIn(p,JAR))addPart(h.i);else A.redraw();return}
 if(k==='jobs'){const b=BINS.find(q=>hitIn(p,q));if(b)giveJob(b.i);else A.redraw()}}
function clean(){epoch++;held=null;for(const k in G)delete G[k];Object.assign(G,{mx:{inn:[],bad:-1},sk:{shook:false,murky:0,settle:0,got:0,lab:{},miss:-1},dr:{poured:false,t:0,ask:0,mark:{},miss:-1},jb:{k:0,done:[],miss:-1},fm:{n:0,got:[],miss:-1},say:null,bad:null,test:()=>{}})}
function open(i,met){clean();c.say(Z.DESC[i]);A.cv.setAttribute('aria-label',Z.DESC[i]);G.test=()=>{if(A.step===i&&met()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(Z.DONE[i]+A.reveal(i))};fillDock();A.redraw()}
function auto(i,plan){steps[i].go();const e=epoch;let at=0;plan.forEach(([ms,f])=>{at+=ms;setTimeout(()=>{if(e===epoch)f()},at)})}
function fillDock(){if(!dock)return;dock.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},dock,t).onclick=f};
 if(k==='mix'&&G.mx.inn.length<5)Z.PARTS.forEach((x,i)=>{if(!G.mx.inn.includes(i))btn(x.t,()=>addPart(i),`Put ${x.t.toLowerCase()} in the jar`)});
 if(k==='shake'){if(!G.sk.shook)btn('Shake the jar',shakeJar);else if(G.sk.got<4)ORDER_BTN.forEach(j=>{if(!G.sk.lab[j])btn(Z.LAYERS[j].t,()=>nameLayer(j),`Next layer up: ${Z.LAYERS[j].t}`)})}
 if(k==='drain'){if(!G.dr.poured)btn('Pour 100 ml on each',pour);else if(G.dr.ask<2)Z.POTS.forEach((P,i)=>btn(P.t,()=>pickPot(i),`Choose ${P.t} soil`))}
 if(k==='jobs'&&G.jb.k<Z.JOBS.length)Z.POTS.forEach((P,i)=>btn(P.t,()=>giveJob(i),`${Z.JOBS[G.jb.k].t}: ${P.t} soil`));
 if(k==='form'&&G.fm.n<4)Z.MAKE_SHOW.forEach(i=>{if(!G.fm.got.includes(i))btn(Z.MAKE[i].t,()=>stage(i),`Next step: ${Z.MAKE[i].t}`)})}
const steps=[
{h:'What is soil?',p:Z.TXT[0],predict:{q:'Is soil just crushed rock?',opts:['Yes, only crushed rock','No, rock bits mixed with rotted plants, water and air'],ans:1},task:'Put the 5 parts of soil in the jar',
 show:()=>auto(0,Z.PARTS.map((x,i)=>x.ok?[420,()=>addPart(i)]:null).filter(Boolean)),go:()=>open(0,()=>G.mx.inn.length>=5)},
{h:'The shake test',p:Z.TXT[1],predict:{q:'After a shake, which bits sink to the bottom first?',opts:['The tiniest clay bits','The biggest sand grains'],ans:1},task:'Shake, then name the 4 layers from the bottom up',
 show:()=>auto(1,[[300,shakeJar],[1200,()=>nameLayer(0)],[400,()=>nameLayer(1)],[400,()=>nameLayer(2)],[400,()=>nameLayer(3)]]),go:()=>open(1,()=>G.sk.got>=4)},
{h:'The water test',p:Z.TXT[2],predict:{q:'Which soil lets water through fastest?',opts:['Clay, because it is smooth','Sandy, because it has big gaps'],ans:1},task:'Pour, then find the soil that let most through and the one that held most',
 show:()=>auto(2,[[300,pour],[1300,()=>pickPot(0)],[500,()=>pickPot(2)]]),go:()=>open(2,()=>G.dr.ask>=2)},
{h:'Soil jobs',p:Z.TXT[3],task:'Match all 5 jobs to a soil',
 show:()=>auto(3,Z.JOBS.map(J=>[450,()=>giveJob(J.s)])),go:()=>open(3,()=>G.jb.k>=Z.JOBS.length)},
{h:'Making soil',p:Z.TXT[4],task:'Tap the 4 steps in order',
 show:()=>auto(4,[0,1,2,3].map(i=>[500,()=>stage(i)])),go:()=>open(4,()=>G.fm.n>=4)},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.test()});
function slip(tag){let m='Soil is rock bits plus humus, water, air and life; big bits settle and drain fastest; soil forms very slowly.';
 switch(tag){case 'rock':m='Soil is not just rock. It is rock bits mixed with humus (rotted plants), water, air and living things.';break;
  case 'settle':m='Big, heavy sand grains sink first. The tiniest clay bits settle last, so clay ends up on top.';break;
  case 'float':m='Humus is light, so it floats. The biggest rock bits, the sand, sink to the bottom.';break;
  case 'drain':m='Water rushes through the big gaps between sand grains. Tiny clay bits leave tiny gaps, so clay holds water.';break;
  case 'job':m='Pure sand dries out and pure clay gets waterlogged. Loam, a mix with humus, suits most vegetables.';break;
  case 'time':m='Rain, ice and roots crack rock very slowly. It can take up to 1,000 years to make 1 cm of soil.';break}
 return m}
function ask(){round++;const Q=Z.QS[round%Z.QS.length],list=[[Q.a,'ok'],...Q.o],sh=(round*2)%3,ord=list.slice(sh).concat(list.slice(0,sh));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},quiz.querySelector('.fl-pick'),v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),right=t==='ok';right?A.win():A.sound.miss();
 fb.innerHTML=(right?`\u2713 Yes: ${a}`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(right?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.72,tall:1.5,draw,onStep:X=>{quiz.hidden=X.step!==5;dock.hidden=X.step===5;fillDock()},
 init:X=>{A=X;T=Z.TOOLS(A);const w=c.el('div',{class:'fl-below'},A.below);dock=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rocks and soil lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});fillDock()}}).start()})})();
