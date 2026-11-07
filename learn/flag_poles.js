/* Flagship: magnetic poles (ages 7-9; NC Year 3 forces and magnets, NGSS 3-PS2-3/3-PS2-4). A hanging magnet turns
   so its north-seeking pole points north; opposite poles attract, like poles repel (felt as a push when dragged);
   a results table builds the rule from all four pairings; clips cling at the poles; repulsion identifies an unknown pole. */
(()=>{
VIS.reg('flagpoles',c=>{let A,ctl,qa,qi=-1,run=0;const P={};c.fig.classList.add('young');
const part=()=>['swing','pull','push','table','clips','mystery','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function label(t,x,y,px,ink,w){const g=A.ctx;g.font=`${w||800} ${Math.round(px*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;g.fillText(t,x,y,A.W-16)}
const red=()=>A.col.dark?'#fca5a5':'#b91c1c',blue=()=>A.col.dark?'#93c5fd':'#1d4ed8',ink=()=>A.col.dark?'#111':'#fff';
/* bar magnet centred at (x,y), angle a; left half shows pole L ('N'/'S'/'?') */
function bar(x,y,len,a,leftPole,grey){const g=A.ctx,h=len*.26;g.save();g.translate(x,y);g.rotate(a||0);
 const right=leftPole==='N'?'S':leftPole==='S'?'N':'?';[[leftPole,-len/2],[right,0]].forEach(([pl,x0])=>{g.fillStyle=grey?(A.col.dark?'#cbd5e1':'#64748b'):pl==='N'?red():blue();g.fillRect(x0,-h/2,len/2,h);
  g.fillStyle=grey?(A.col.dark?'#111':'#fff'):ink();g.font=`900 ${Math.round(h*.6)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(grey?(x0<0?'A':'B'):pl,x0+len/4,1)});
 g.lineWidth=2.5;g.strokeStyle=A.col.tx;g.strokeRect(-len/2,-h/2,len,h);g.restore()}
const L=()=>Math.min(A.W*.36,190),midY=()=>A.H*.46;
const fixedX=()=>A.W*.06+L()/2,gapX=()=>fixedX()+L()/2;
function forceArrows(x,dir,col){const g=A.ctx,y=midY()-L()*.26;g.strokeStyle=col;g.fillStyle=col;g.lineWidth=3;[-1,1].forEach(s=>{const x0=x+s*8,x1=x0+s*dir*26;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();g.beginPath();g.moveTo(x1+s*dir*7,y);g.lineTo(x1,y-6);g.lineTo(x1,y+6);g.fill()})}
/* ---------- drawing ---------- */
function draw(A){const{ctx:g,W,H,col:C}=A,k=part();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.06:.35);g.fillRect(0,0,W,H);
 if(k==='swing'){const cx=W/2,cy=H*.5;g.strokeStyle=A.alpha(C.tx,.25);g.lineWidth=1.5;g.beginPath();g.arc(cx,cy,L()*.62,0,7);g.stroke();
  [['North',0,-1],['South',0,1],['East',1,0],['West',-1,0]].forEach(([t,dx,dy])=>label(t,cx+dx*L()*.82,cy+dy*L()*.78,13,t==='North'?C.tx:C.mu,t==='North'?900:700));
  label('▲',cx,cy-L()*.66,12,C.gr);bar(cx,cy,L(),P.ang-Math.PI/2,'S');g.fillStyle=C.tx;g.beginPath();g.arc(cx,cy,4,0,7);g.fill();
  label(P.msg||'Drag the magnet round, then let go.',W/2,H*.07,13,C.tx,700);label(`Settled: ${P.settles} of 2`,W/2,H*.94,13)}
 if(k==='pull'||k==='push'||k==='table'){const fl=P.fl,mx=P.mx;bar(fixedX(),midY(),L(),0,fl);bar(mx,midY(),L(),0,P.ml);
  const fa=fl==='N'?'S':'N',fb=P.ml;label(`${fa} faces ${fb}`,(gapX()+mx-L()/2)/2,midY()+L()*.3,13,C.tx,800);
  if(P.state==='snap')forceArrows((gapX()+mx-L()/2)/2,-1,C.gr);if(P.state==='push')forceArrows((gapX()+mx-L()/2)/2,1,C.rd);
  label(P.msg||(k==='table'?'Flip a magnet, then push them together.':'Drag the right magnet towards the left one.'),W/2,H*.08,13,C.tx,700);
  if(k==='table'){const rows=[['N','N'],['N','S'],['S','N'],['S','S']],tw=Math.min(W*.9,360),x0=(W-tw)/2,y0=H*.66,rh=Math.min(22,H*.075);
   rows.forEach(([a,b],i)=>{const key=a+b,res=P.res[key],y=y0+i*rh;g.fillStyle=A.alpha(res?res==='pull'?C.gr:C.rd:C.tx,res?.22:.05);g.fillRect(x0,y,tw,rh-2);
    label(`${a} faces ${b}`,x0+tw*.28,y+rh/2-1,12,C.tx,700);label(res?res==='pull'?'pull together':'push apart':'?',x0+tw*.72,y+rh/2-1,12,C.tx,900)})}}
 if(k==='clips'){const cx=W/2,y=H*.32;bar(cx,y,L()*1.4,0,'N');[[-1,'N end'],[0,'middle'],[1,'S end']].forEach(([s,t],i)=>{const x=cx+s*L()*.58,n=P.clips[i];
   label(n==null?'tap':t,x,y+L()*.32,12,n==null?C.mu:C.tx,800);if(n!=null){for(let j=0;j<n;j++){const yy=y+L()*.44+j*14;g.strokeStyle=C.mu;g.lineWidth=2.5;g.beginPath();g.ellipse(x+(j%2?4:-4),yy,9,5,0,0,7);g.stroke()}
    label(`${n} clips`,x,H*.92,13,C.tx,900)}});label(P.msg||'Tap each part of the magnet to dip it in the clips.',W/2,H*.08,13,C.tx,700)}
 if(k==='mystery'){bar(W*.5,H*.3,L()*1.2,0,'?',true);const t=P.test;if(t){const x=t==='A'?W*.5-L()*.6-L()*.62:W*.5+L()*.6+L()*.62;bar(x,H*.3,L()*.9,0,t==='A'?'S':'N');label(P.hit,W/2,H*.55,15,P.hit.startsWith('Push')?C.rd:C.gr,900)}
  label(`Your magnet's N end tests the grey bar.`,W/2,H*.08,13,C.tx,700);label(`A: ${P.seen.A||'not tested'}   B: ${P.seen.B||'not tested'}`,W/2,H*.7,13,C.tx,800);if(P.msg)label(P.msg,W/2,H*.85,12,C.tx,700)}
 if(k==='chal'){bar(W*.3,H*.42,L(),0,'N');bar(W*.7,H*.42,L(),0,'N');label('Like poles push. Unlike poles pull.',W/2,H*.72,15,C.tx,900)}
 A.fx.draw(g)}
/* ---------- physics-ish moves ---------- */
const touchX=()=>gapX()+L()/2+2,pushStop=()=>gapX()+L()/2+L()*.45;
function attracts(){const fa=P.fl==='N'?'S':'N';return fa!==P.ml}
function slide(x){const k=part();if(!(k==='pull'||k==='push'||k==='table')||P.state==='snap')return;const lim=attracts()?touchX():pushStop();
 P.mx=Math.max(lim,Math.min(A.W-L()/2-4,x));const near=P.mx-touchX()<L()*.5;
 if(attracts()&&near){P.state='snap';A.tween(P,{mx:touchX()},A.reduced()?1:250,'io');A.sound.pop();record('pull');P.msg='Click! They pull together.';tell(P.msg+' Opposite poles attract.');P.want()}
 else if(!attracts()&&P.mx<=pushStop()+2){if(P.state!=='push'){P.state='push';A.sound.miss();record('push');P.msg='It pushes back! Like poles repel.';tell(P.msg);P.want()}}
 else if(P.state==='push')P.state=null;A.redraw()}
function record(r){const fa=P.fl==='N'?'S':'N';P.res[fa+P.ml]=r;if(part()==='push')P.pushed=1;buttons()}
function release(){if(P.state==='push'||(!attracts()&&P.mx<pushStop()+L()*.4)){A.tween(P,{mx:Math.min(A.W-L()/2-4,pushStop()+L()*.7)},A.reduced()?1:350,'out');P.state=null}}
function nudge(){slide(attracts()?touchX()+L()*.3:pushStop());release()}
function flip(which){if(part()!=='table')return;if(which==='L')P.fl=P.fl==='N'?'S':'N';else P.ml=P.ml==='N'?'S':'N';P.state=null;P.mx=A.W-L()/2-8;P.msg='';A.sound.tick();tell(`Now ${P.fl==='N'?'S':'N'} faces ${P.ml}.`);buttons();A.redraw()}
function spin(a){if(part()!=='swing')return;P.ang=a;A.redraw()}
function letGo(){if(part()!=='swing'||P.busy)return;P.busy=1;const r=run;const back=()=>{if(r!==run)return;P.busy=0;P.settles++;A.sound.pop();P.msg=`It stopped with N pointing north. (${P.settles})`;tell(P.msg);buttons();P.want()};
 const turns=Math.round(P.ang/(2*Math.PI));A.tween(P,{ang:turns*2*Math.PI},A.reduced()?1:900,'out',back)}
function twist(){if(part()!=='swing'||P.busy)return;P.ang=P.ang+Math.PI*(.6+.3*(P.settles%2));A.sound.tick();A.redraw();letGo()}
function dip(i){if(part()!=='clips'||P.clips[i]!=null)return;P.clips[i]=[6,0,6][i];A.sound[i===1?'miss':'pop']();P.msg=i===1?'Hardly any clips in the middle.':'Lots of clips! The pull is strongest at a pole.';tell(P.msg);buttons();A.redraw();P.want()}
function probe(e){if(part()!=='mystery')return;P.test=e;P.hit=e==='A'?'Pull: they stick':'Push: it moves away';P.seen[e]=e==='A'?'pulls':'pushes';A.sound[e==='A'?'pop':'miss']();tell(`End ${e}: ${P.hit}.`);buttons();A.redraw()}
function choose(e){if(part()!=='mystery'||P.solved)return;if(e==='B'){P.solved=1;A.sound.win();P.msg='Yes! B pushed your N away, so B is an N pole.'}
 else{A.sound.miss();P.msg=P.seen.A?'A pulled your N. Pulling means A is the opposite pole: S.':'Test it first. Only a push tells you for sure.'}tell(P.msg);buttons();A.redraw();P.want()}
/* ---------- buttons ---------- */
function buttons(){if(!ctl)return;ctl.innerHTML='';const k=part(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||t},ctl,t).onclick=f};
 if(k==='swing')btn('Spin and let go',twist,'Turn the magnet away from north and let it go');
 if(k==='pull'||k==='push'){btn('Move closer',nudge,'Move the right magnet towards the left magnet')}
 if(k==='table'){btn('Flip left',()=>flip('L'),'Flip the left magnet round');btn('Flip right',()=>flip('R'),'Flip the right magnet round');btn('Push together',nudge,'Push the magnets together')}
 if(k==='clips')['N end','middle','S end'].forEach((t,i)=>{if(P.clips[i]==null)btn('Dip '+t,()=>dip(i),'Dip the '+t+' in paper clips')});
 if(k==='mystery'&&!P.solved){btn('Test end A',()=>probe('A'),'Bring your N pole to end A');btn('Test end B',()=>probe('B'),'Bring your N pole to end B');btn('A is N',()=>choose('A'));btn('B is N',()=>choose('B'))}}
/* ---------- pointer ---------- */
function down(p){const k=part();
 if(k==='swing'){if(P.busy)return false;P.grab=1;spin(Math.atan2(p.x-A.W/2,-(p.y-A.H*.5)));return true}
 if(k==='pull'||k==='push'||k==='table'){if(Math.abs(p.x-P.mx)<L()*.6&&Math.abs(p.y-midY())<L()*.5){P.grab=p.x-P.mx;return true}return false}
 if(k==='clips'){const cx=A.W/2;[-1,0,1].forEach((s,i)=>{if(Math.abs(p.x-(cx+s*L()*.58))<L()*.3&&Math.abs(p.y-A.H*.32)<L()*.4)dip(i)});return false}
 if(k==='mystery'){if(Math.abs(p.y-A.H*.3)<L()*.3){probe(p.x<A.W/2?'A':'B')}return false}
 return false}
function move(p){const k=part();if(P.grab==null)return;if(k==='swing')spin(Math.atan2(p.x-A.W/2,-(p.y-A.H*.5)));else slide(p.x-P.grab)}
function up(){const k=part(),had=P.grab!=null;P.grab=null;if(!had)return;if(k==='swing')letGo();else release()}
/* ---------- steps ---------- */
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(i,acts,ms){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?40*(j+1):(j+1)*(ms||700)))}
function reset(o){run++;for(const x in P)delete P[x];Object.assign(P,{want:()=>{},ang:Math.PI*.7,settles:0,busy:0,fl:'N',ml:'N',mx:A?A.W-L()/2-8:400,state:null,res:{},pushed:0,clips:[null,null,null],test:null,hit:'',seen:{},solved:0,grab:null,msg:''},o||{})}
const steps=[
{h:'Which way?',p:'Hang a bar magnet so it can turn freely. Each end is called a pole. Watch where it stops.',
 predict:{q:'A magnet can turn freely. Where does it stop?',opts:['One end points north','Any way at all','It never stops'],ans:0},
 task:'Spin it and let go, 2 times',show:()=>auto(0,[twist,twist],1100),
 go:()=>{reset();tell('Drag the magnet round, then let go.');buttons();P.want=finish(0,()=>P.settles>=2,'The end that points north is the north pole, N. The other end is the south pole, S.')}},
{h:'N meets S',p:'Now bring two magnets close. Here the S pole of one faces the N pole of the other.',
 predict:{q:'S faces N. What happens?',opts:['They pull together','They push apart','Nothing'],ans:0},
 task:'Bring S and N close',show:()=>auto(1,[nudge]),
 go:()=>{reset({fl:'N',ml:'N'});tell('S faces N. Drag the right magnet closer.');buttons();P.want=finish(1,()=>P.state==='snap','Opposite poles attract: they pull together.')}},
{h:'N meets N',p:'Turn one magnet round. Now N faces N. Try to push them together.',
 predict:{q:'N faces N. What happens?',opts:['They push apart','They pull together','Nothing'],ans:0},
 task:'Push N towards N',show:()=>auto(2,[nudge]),
 go:()=>{reset({fl:'S',ml:'N'});tell('N faces N. Drag the right magnet closer.');buttons();P.want=finish(2,()=>P.pushed,'Like poles repel: you feel a push.')}},
{h:'Test every pair',p:'Flip the magnets to try all four pairs. Fill in the table and look for the rule.',
 predict:{q:'S faces S. What happens?',opts:['They push apart','They pull together','Nothing'],ans:0},
 task:'Fill all 4 rows',show:()=>auto(3,[nudge,()=>flip('R'),nudge,()=>flip('L'),nudge,()=>flip('R'),nudge],550),
 go:()=>{reset({fl:'S',ml:'N'});tell('Flip a magnet, then push them together.');buttons();P.want=finish(3,()=>Object.keys(P.res).length>=4,'Same poles push apart. Different poles pull together.')}},
{h:'Where is the pull?',p:'Dip each part of a bar magnet into a pile of paper clips. Count the clips.',
 predict:{q:'Where will the most clips stick?',opts:['At the ends','In the middle','The same all along'],ans:0},
 task:'Dip all 3 parts',show:()=>auto(4,[()=>dip(0),()=>dip(1),()=>dip(2)]),
 go:()=>{reset();tell('Tap each part of the magnet.');buttons();P.want=finish(4,()=>P.clips.every(n=>n!=null),'The pull is strongest at the poles, the two ends.')}},
{h:'Mystery magnet',p:'This grey magnet has no labels. Use the N end of your magnet. A push is the only sure test.',
 task:'Find the N end',show:()=>auto(5,[()=>probe('A'),()=>probe('B'),()=>choose('B')]),
 go:()=>{reset();tell('Test end A and end B with your N pole.');buttons();P.want=finish(5,()=>P.solved,'B repelled N, so B is N and A is S.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.want()});
/* ---------- challenge ---------- */
const QS=[['N faces S. What happens?',[['They pull together','ok'],['They push apart','pushun'],['Nothing','none']]],
 ['S faces S. What happens?',[['They push apart','ok'],['They pull together','pullsame'],['Nothing','none']]],
 ['Where is the pull of a bar magnet strongest?',[['At the poles','ok'],['In the middle','middle'],['The same everywhere','same']]],
 ['A magnet hangs freely and stops. Its N pole points…',[['North','ok'],['South','south'],['Any way','any']]],
 ['A bar is pulled by BOTH ends of your magnet. It is…',[['Plain iron, not a magnet','ok'],['Surely a magnet','pullproof'],['A broken magnet','broken']]],
 ['You snap a bar magnet in half. Each piece has…',[['An N and an S pole','ok'],['Only one pole','onepole'],['No poles','nopole']]],
 ['Which test proves a bar is a magnet?',[['It pushes away a pole','ok'],['A magnet pulls it','pullproof'],['It is shiny','shiny']]]];
function why(t){let m='Like poles repel and unlike poles attract.';
 if(t==='pushun')m='N and S are different poles. Different poles pull together.';
 if(t==='pullsame')m='S and S are the same pole. Same poles push apart.';
 if(t==='none')m='Poles always do something when close: they pull or they push.';
 if(t==='middle'||t==='same')m='The clips cling to the ends. The pull is strongest at the poles.';
 if(t==='south'||t==='any')m='A free magnet lines up so its north pole points north. That is how a compass works.';
 if(t==='pullproof')m='A magnet pulls plain iron too, so a pull proves nothing. Only a push proves it is a magnet.';
 if(t==='broken'||t==='shiny')m='Look for a push. Only another magnet can push a pole away.';
 if(t==='onepole'||t==='nopole')m='Each piece becomes a whole magnet with its own N and S pole.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi*2)%3;qa.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});tell('Challenge: '+q);A.redraw()}
let inRow=0;function judge(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){inRow++;A.win()}else{inRow=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${inRow} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{qa.hidden=A.step!==6;ctl.hidden=A.step===6;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Magnet controls'},w);qa=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down,move,up});buttons()}});
A.start()})})();
