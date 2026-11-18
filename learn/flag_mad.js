/* Flagship: Mean absolute deviation (ages 11–13; CCSS 6.SP.5c / KS3 statistics — MAD as average
   |value − mean|). Find the mean, mark absolute deviations, average into MAD, compare two same-mean
   sets, catch “MAD = range” and “MAD = mean” myths. Distinct from flagspread (statistical questions /
   range), flaghist (dot plots), flagsample (populations). */
(()=>{
VIS.reg('flagmad',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['mean','devs','mad','compare','myth','order','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function meanOf(d){return d.reduce((a,b)=>a+b,0)/d.length}
function madOf(d){const m=meanOf(d);return d.reduce((a,v)=>a+Math.abs(v-m),0)/d.length}
function dots(g,W,H,data,y0,markDevs){const C=A.col,m=meanOf(data),min=Math.min(...data),max=Math.max(...data),span=Math.max(1,max-min+2),x0=W*.1,w=W*.8;
 data.forEach((v,i)=>{const x=x0+((v-(min-1))/span)*w;g.beginPath();g.arc(x,y0,10,0,7);g.fillStyle=A.alpha(C.ac,.75);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T(String(v),x,y0-18,12,{w:800});
  if(markDevs){g.strokeStyle=C.or||C.am;g.setLineDash([4,3]);g.beginPath();g.moveTo(x,y0+12);g.lineTo(x0+((m-(min-1))/span)*w,y0+12);g.stroke();g.setLineDash([]);T('|'+Math.abs(v-m)+'|',x,y0+28,11,{c:C.mu})}});
 // mean line
 const mx=x0+((m-(min-1))/span)*w;g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(mx,y0-40);g.lineTo(mx,y0+40);g.stroke();T('mean '+m,mx,y0-52,12,{c:C.mu})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.1:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Mean absolute deviation',W/2,H*.3,A.narrow?14:17,{w:900});T('mean → |x − mean| → average = MAD',W/2,H*.52,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='mean'){T(S.title||'Find the mean',W/2,H*.08,A.narrow?13:15,{w:800});
  dots(g,W,H,S.data||[2,4,6],H*.45,false);T(S.meanOn?('Mean = '+meanOf(S.data||[2,4,6])):(S.msg||'Tap to reveal the mean.'),W/2,H*.82,13,{c:C.mu,max:W*.92})}
 if(k==='devs'){T(S.title||'Absolute deviations',W/2,H*.08,A.narrow?13:15,{w:800});
  dots(g,W,H,S.data||[2,4,6],H*.4,!!S.showDev);T(S.msg||'Mark each |value − mean|.',W/2,H*.82,12,{c:C.mu,max:W*.92})}
 if(k==='mad'){T(S.title||'Average into MAD',W/2,H*.08,A.narrow?13:15,{w:800});
  dots(g,W,H,S.data||[2,4,6],H*.38,true);
  const madv=madOf(S.data||[2,4,6]);T(S.madOn?('MAD = '+madv): (S.msg||'Average the absolute deviations.'),W/2,H*.78,13,{c:C.mu,max:W*.92})}
 if(k==='compare'){T(S.title||'Same mean, different MAD',W/2,H*.07,A.narrow?12:14,{w:800});
  T('Set A: 4,5,5,6',W/2,H*.22,13,{w:800});T('Set B: 1,5,5,9',W/2,H*.36,13,{w:800});
  T(S.picked!=null?(S.picked===1?'Set B has the larger MAD.':'Not the more spread set.'):(S.msg||'Which set has the larger MAD?'),W/2,H*.55,13,{c:C.mu,max:W*.9});
  [['Set A',0],['Set B',1],['Same MAD',2]].forEach(([lab,i],idx)=>{const x=W*(.1+idx*.3);g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x,H*.68,W*.26,H*.18);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,H*.68,W*.26,H*.18);T(lab,x+W*.13,H*.77,13,{w:800})})}
 if(k==='myth'||k==='order'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{data:[2,4,6],meanOn:0,showDev:0,madOn:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='mean'){btn('Show mean',()=>{S.meanOn=1;S.msg='Mean = '+meanOf(S.data);A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal the mean');
  btn('Reset',()=>{S.meanOn=0;S.msg='Find the mean of the dots.';A.redraw()},'Reset mean')}
 if(kind()==='devs'){btn('Mark |x − mean|',()=>{S.showDev=1;S.msg='Each dashed length is an absolute deviation.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show absolute deviations');
  btn('Reset',()=>{S.showDev=0;A.redraw()},'Reset deviations')}
 if(kind()==='mad'){btn('Average into MAD',()=>{S.madOn=1;S.showDev=1;S.msg='MAD = '+madOf(S.data);A.sound.tick();say(S.msg);A.redraw();S.check()},'Compute MAD');
  btn('Reset',()=>{S.madOn=0;A.redraw()},'Reset MAD')}
 if(kind()==='compare'){[['Set A',0],['Set B',1],['Same MAD',2]].forEach(([lab,i])=>btn(lab,()=>{S.picked=i;A.sound.tick();say(lab);A.redraw();S.check()},'Pick '+lab))}
 if(kind()==='myth'||kind()==='order')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='mean'){S.meanOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='devs'){S.showDev=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='mad'){S.madOn=1;S.showDev=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='compare'){const i=Math.max(0,Math.min(2,Math.floor((p.x-A.W*.1)/(A.W*.3))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'||kind()==='order'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Find the mean first',p:'MAD starts from the mean. For 2, 4, 6 the mean is (2+4+6)/3 = 4. Every later distance is measured from that centre.',
 predict:{q:'First step for MAD?',opts:['find the mean of the data','find the range only','ignore the centre'],ans:0},
 task:'Reveal the mean of 2, 4, 6',show:()=>auto(0,[()=>{S.meanOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Find the mean',data:[2,4,6],meanOn:0,msg:'Tap to show the mean.'});say('Find the mean.');controls();S.check=finish(0,()=>!!S.meanOn,'Mean of 2, 4, 6 is 4.')}},
{h:'Absolute deviations',p:'Absolute deviation is |value − mean|. Signs are dropped so distances above and below do not cancel. For 2, 4, 6 about mean 4 the absolute deviations are 2, 0 and 2.',
 predict:{q:'Why take the absolute value?',opts:['so distances above and below do not cancel','so MAD equals the range','so MAD equals the mean'],ans:0},
 task:'Mark each |value − mean|',show:()=>auto(1,[()=>{S.showDev=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'|value − mean|',data:[2,4,6],showDev:0,msg:'Mark absolute deviations.'});say('Show absolute deviations.');controls();S.check=finish(1,()=>!!S.showDev,'Absolute deviations drop the sign.')}},
{h:'Average into MAD',p:'MAD is the average of those absolute deviations. For 2, 0, 2 the MAD is (2+0+2)/3 = 4/3. That is the typical distance from the mean.',
 predict:{q:'MAD equals…',opts:['the average of the absolute deviations','the largest value only','the mean itself'],ans:0},
 task:'Average the absolute deviations into MAD',show:()=>auto(2,[()=>{S.showDev=1;S.madOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Compute MAD',data:[2,4,6],madOn:0,showDev:0,msg:'Average |x − mean|.'});say('Compute the MAD.');controls();S.check=finish(2,()=>!!S.madOn,'MAD averages the absolute deviations.')}},
{h:'Same mean, different MAD',p:'Set A: 4, 5, 5, 6 and Set B: 1, 5, 5, 9 both have mean 5, but Set B sits farther from 5 on average, so Set B has the larger MAD.',
 predict:{q:'Same mean means…',opts:['MAD can still differ','MAD must match','range must be zero'],ans:0},
 task:'Pick the set with the larger MAD',show:()=>auto(3,[()=>{S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Compare MAD',picked:null,msg:'Which set has the larger MAD?'});say('Compare two sets.');controls();S.check=finish(3,()=>S.picked===1,'Same mean can hide different MAD.')}},
{h:'Catch a mix-up',p:'Slips: calling MAD the range; thinking MAD is another name for the mean; forgetting absolute value so signed deviations cancel to zero.',
 predict:{q:'Which is the mix-up?',opts:['MAD is the same as the range','MAD averages |value − mean|','Same mean can hide different MAD'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['MAD is the same as the range','MAD averages |value − mean|','Same mean can hide different MAD'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'MAD is not the range.')}},
{h:'Order the MAD steps',p:'Order: find the mean → compute each |value − mean| → average those absolute deviations. Skipping the absolute value or stopping at the range breaks the measure.',
 predict:{q:'Correct order starts with…',opts:['mean → |x − mean| → average','range → call it MAD','add raw values and stop'],ans:0},
 task:'Tap the correct order',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'MAD steps',opts:['mean → |x − mean| → average','range → call it MAD','add raw values and stop'],picked:null});say('Pick the order.');controls();S.check=finish(5,()=>S.picked===0,'Mean, absolute deviations, then average.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['MAD is…',[['average of |x − mean|','ok'],['the range','range'],['the mean itself','mean']]],
 ['Why absolute value?',[['distances do not cancel','ok'],['to match the range','range'],['to match the mean','mean']]],
 ['Same mean means…',[['MAD can still differ','ok'],['MAD must match','same'],['range must be 0','range']]],
 ['Which is the mix-up?',[['MAD equals the range','ok'],['MAD uses every value','true'],['MAD needs the mean first','true']]],
 ['Data 5,5,5 MAD is…',[['0','ok'],['5','mean'],['15','sum']]],
 ['Order starts with…',[['find the mean','ok'],['find the range only','range'],['skip the centre','mean']]],
 ['Bigger MAD means…',[['farther from the mean on average','ok'],['a larger mean','mean'],['no spread','range']]]];
function why(t){let m='MAD = average of |value − mean|. Same mean can hide different MAD.';
 if(t==='range')m='Range is max − min. MAD averages every absolute deviation from the mean — different measure.';
 if(t==='mean')m='The mean is the centre. MAD measures typical distance from that centre, not the centre itself.';
 if(t==='same')m='Two sets can share a mean and still have different typical distances from it.';
 if(t==='true')m='That statement is true — not the mix-up.';
 if(t==='sum')m='Do not add the raw values for MAD. Average the absolute deviations from the mean.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'MAD controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
