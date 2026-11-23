/* Flagship – formal debates (ages 12–14; KS3 spoken English): sort arguments onto the side they help, order a World
   Schools debate, pick fair rebuttal, find when points of information are allowed, plan a reply speech.
   Data, messages and canvas UI: debate_art.js. */
(()=>{const D=DEBATE;
VIS.reg('flagdebate',c=>{let A,g,tray,qbox,turn=-1,epoch=0;const S={},U=D.ui(()=>A,()=>g,S);
const part=()=>['side','order','rebut','poi','reply','chal'][A.step];
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const PROP='#1d4ed8',OPP='#be123c';
/* 1. sides */
let ZONE=[],HAND=null;
function place(z){const s=S.sd,C=D.CARDS[s.i];if(!C)return;if(z!==C[1]){s.bad=true;A.sound.miss();return say(D.MSG.wrongSide(C[0],C[1]),true)}
 s.pile[z].push(C[0]);s.i++;s.bad=false;A.sound.pop();say(`Yes: that helps the ${z?'opposition':'proposition'}.`+(s.i<6?' Next card.':''))}
function drawSide(){const s=S.sd,C=D.CARDS[s.i],t=U.banner(C?`Card ${s.i+1} of 6. Which side does it help?`:D.DONE[0],C?(s.bad?'no':''):'ok');
 const mh=U.fz(15)*3;U.card({x:10,y:t,w:A.W-20,h:mh},'Motion: '+D.MOTION,{on:1,n:14});const zt=t+mh+8,zh=A.H-zt-10,cw=A.W-40,ch=Math.min(92,zh*.36);
 ZONE=[{x:8,y:zt+ch+12,w:A.W/2-12,h:zh-ch-12},{x:A.W/2+4,y:zt+ch+12,w:A.W/2-12,h:zh-ch-12}];
 ZONE.forEach((r,z)=>{g.fillStyle=U.dk()?(z?'#4c0519':'#172554'):(z?'#ffe4e6':'#dbeafe');A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=z?OPP:PROP;g.lineWidth=2.5;g.stroke();
  g.font=`800 ${U.fz(14)}px system-ui,sans-serif`;g.fillStyle=U.fg();g.textAlign='center';g.textBaseline='top';g.fillText(z?'Opposition: against':'Proposition: for',r.x+r.w/2,r.y+8);
  g.font=`700 ${U.fz(12)}px system-ui,sans-serif`;g.fillText(`${s.pile[z].length} card${s.pile[z].length===1?'':'s'}`,r.x+r.w/2,r.y+8+U.fz(18))
  s.pile[z].slice(-3).forEach((tx,k)=>{const L=U.wrap(tx,r.w-14,`600 ${U.fz(11)}px system-ui,sans-serif`)[0];g.font=`600 ${U.fz(11)}px system-ui,sans-serif`;g.fillText(L+(L===tx?'':'…'),r.x+r.w/2,r.y+16+U.fz(18)*(2+k))})});
 if(C){const d=s.drag;HAND={x:d?d.x-cw/2:(A.W-cw)/2,y:d?d.y-ch/2:zt,w:cw,h:ch};U.card(HAND,C[0],{n:15})}else HAND=null}
/* 2. speaking order */
let SLOT=[],LEFT=[];
function pick(k){const s=S.od;if(s.seq.length===8||s.seq.includes(k))return;const want=s.seq.length;
 if(k!==want){s.bad=k;A.sound.miss();return say(D.MSG.order(want,k),true)}
 s.seq.push(k);s.bad=null;A.sound.pop();say(`${D.SPEECH[k]}.`+(s.seq.length<8?' Who speaks next?':' The proposition speaks first and last.'))}
function drawOrder(){const s=S.od,fin=s.seq.length===8,t=U.banner(fin?D.DONE[1]:`Tap the speeches in order. ${s.seq.length} of 8.`,fin?'ok':s.bad!=null?'no':'');
 const gw=(A.W-16-3*6)/4,sh=Math.min(46,(A.H-t)/6);SLOT=[...Array(8)].map((_,i)=>({x:8+(i%4)*(gw+6),y:t+Math.floor(i/4)*(sh+6),w:gw,h:sh}));
 SLOT.forEach((r,i)=>{const k=s.seq[i];if(k!=null)U.card(r,`${i+1}. ${D.SPEECH[k]}`,{ok:1,n:11});else{g.setLineDash([5,4]);g.strokeStyle='#64748b';g.lineWidth=1.4;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.setLineDash([]);
  g.font=`800 ${U.fz(14)}px system-ui,sans-serif`;g.fillStyle=U.fg();g.textAlign='center';g.textBaseline='middle';g.fillText(String(i+1),r.x+r.w/2,r.y+r.h/2)}});
 const y0=t+2*(sh+6)+14,bw=(A.W-22)/2,bh=Math.min(44,(A.H-y0-10)/4-6);LEFT=D.MIX.map((k,j)=>({k,x:8+(j%2)*(bw+6),y:y0+Math.floor(j/2)*(bh+6),w:bw,h:bh}));
 LEFT.forEach(r=>{if(!s.seq.includes(r.k)){g.fillStyle=r.k%2||r.k===6?OPP:PROP;U.card(r,D.SPEECH[r.k],{no:s.bad===r.k,n:13});g.fillStyle=r.k===6||(r.k<6&&r.k%2)?OPP:PROP;g.fillRect(r.x+4,r.y+6,5,r.h-12)}})}
/* 3. rebuttal */
let OPT=[],BOX=null;
function answer(j){const s=S.rb,R=D.REB[s.k];if(!R)return;const tag=R.opts[j][1];
 if(tag!=='ok'){s.bad=j;A.sound.miss();return say(D.MSG[tag],true)}
 s.k++;s.bad=null;s.got.push(R.opts[j][0]);A.sound.pop();say('Fair summary, then the reason it fails. That is rebuttal.'+(s.k<3?' Next point.':''))}
function drawRebut(){const s=S.rb,R=D.REB[s.k],t=U.banner(R?`${s.k+1} of 3. The proposition said:`:D.DONE[2],R?(s.bad!=null?'no':''):'ok');if(!R){BOX=null;OPT=[];const h=(A.H-t-10)/3-6;s.got.forEach((x,i)=>U.card({x:10,y:t+i*(h+6),w:A.W-20,h},x,{ok:1,n:13}));return}
 const qh=Math.min(64,A.H*.15);U.card({x:10,y:t,w:A.W-20,h:qh},`“${R.said}”`,{on:1,n:14});
 const bh=Math.min(70,A.H*.16);BOX={x:10,y:A.H-bh-8,w:A.W-20,h:bh};g.setLineDash([6,4]);g.strokeStyle=PROP;g.lineWidth=2;A.paint.rrect(BOX.x,BOX.y,BOX.w,BOX.h,12);g.stroke();g.setLineDash([]);
 g.font=`800 ${U.fz(13)}px system-ui,sans-serif`;g.fillStyle=U.fg();g.textAlign='center';g.textBaseline='middle';g.fillText('Your reply: drop it here',BOX.x+BOX.w/2,BOX.y+BOX.h/2);
 const y0=t+qh+10,oh=(BOX.y-y0-12)/3-6;OPT=R.opts.map((o,j)=>({j,x:10,y:y0+j*(oh+6),w:A.W-20,h:oh}));
 OPT.forEach(r=>{if(s.drag&&s.drag.j===r.j)return;U.card(r,R.opts[r.j][0],{no:s.bad===r.j,n:12})});
 if(s.drag){const r=OPT[s.drag.j];U.card({x:s.drag.x-r.w/2,y:s.drag.y-r.h/2,w:r.w,h:r.h},R.opts[r.j][0],{on:1,n:12})}}
/* 4. points of information */
let CELL=[];
function minute(row,m){const s=S.pi,key=row+':'+m;if(s.ok.includes(key))return;
 if(row===1){s.bad=key;A.sound.miss();return say(D.MSG.reply,true)}if(m===0||m===7){s.bad=key;A.sound.miss();return say(D.MSG[m?'last':'first'],true)}
 s.ok.push(key);s.bad=null;A.sound.pop();say(`Minute ${m+1}: points of information allowed.`+(s.ok.length<6?` ${6-s.ok.length} more.`:''))}
function drawPoi(){const s=S.pi,fin=s.ok.length===6,t=U.banner(fin?D.DONE[3]:`Tap every minute when a point of information is allowed. ${s.ok.length} of 6.`,fin?'ok':s.bad?'no':'');
 const cw=(A.W-24)/8,ch=Math.min(60,(A.H-t)/4);CELL=[];[[8,'Main speech: 8 minutes',t+24],[4,'Reply speech: 4 minutes',t+ch+70]].forEach(([n,lab,y],row)=>{
  g.font=`800 ${U.fz(13)}px system-ui,sans-serif`;g.fillStyle=U.fg();g.textAlign='left';g.textBaseline='bottom';g.fillText(lab,12,y-6);
  for(let m=0;m<n;m++){const r={x:12+m*cw,y,w:cw-3,h:ch,row,m},key=row+':'+m,on=s.ok.includes(key),bad=s.bad===key;CELL.push(r);
   g.fillStyle=on?'#bbf7d0':bad?'#fecaca':U.dk()?'#1e293b':'#f1f5f9';g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle=bad?'#b91c1c':'#64748b';g.lineWidth=bad?3:1.2;g.strokeRect(r.x,r.y,r.w,r.h);
   g.font=`800 ${U.fz(13)}px system-ui,sans-serif`;g.fillStyle=on||bad?'#0f172a':U.fg();g.textAlign='center';g.textBaseline='middle';g.fillText(String(m+1),r.x+r.w/2,r.y+r.h/2-(on?8:0));if(on){g.font=`800 ${U.fz(10)}px system-ui,sans-serif`;g.fillText('POI ✓',r.x+r.w/2,r.y+r.h/2+10)}}});
 g.font=`600 ${U.fz(11)}px system-ui,sans-serif`;g.fillStyle=U.fg();g.textAlign='left';g.textBaseline='top';g.fillText('Minute 1 is 0:00 to 1:00, minute 8 is 7:00 to 8:00.',12,t+2*ch+86)}
/* 5. reply speech plan */
let NOTE=[],CHECK=null;
function toggle(i){const s=S.rp;if(s.done)return;s.in[i]=!s.in[i];s.bad=false;A.sound.tick();say(`${s.in[i]?'In':'Out'}: ${D.NOTES[i][0]}.`)}
function check(){const s=S.rp;if(s.done)return;const w=D.NOTES.findIndex((N,i)=>!!s.in[i]!==!!N[1]);
 if(w<0){s.done=true;s.bad=false;A.sound.pop();return say('A strong reply: every clash, one new example, no new argument.')}
 s.bad=true;s.flag=w;A.sound.miss();say(w===3?D.MSG.newArg:w===4?D.MSG.example:D.MSG.dropped,true)}
function drawReply(){const s=S.rp,t=U.banner(s.done?D.DONE[4]:'Plan the reply speech: tap each note in or out, then check.',s.done?'ok':s.bad?'no':'');
 const ch=Math.min(46,A.H*.1),nh=(A.H-t-ch-24)/5-6;NOTE=D.NOTES.map((N,i)=>({i,x:10,y:t+i*(nh+6),w:A.W-20,h:nh}));
 NOTE.forEach(r=>{const on=!!s.in[r.i];U.card({x:r.x+44,y:r.y,w:r.w-44,h:r.h},D.NOTES[r.i][0],{on,no:s.bad&&s.flag===r.i,n:12});g.fillStyle=on?'#047857':'#64748b';A.paint.rrect(r.x,r.y+r.h/2-16,38,32,8);g.fill();
  g.font=`800 ${U.fz(12)}px system-ui,sans-serif`;g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.fillText(on?'IN':'OUT',r.x+19,r.y+r.h/2)});
 CHECK={x:A.W*.25,y:A.H-ch-8,w:A.W*.5,h:ch};U.card(CHECK,s.done?'Reply planned ✓':'Check my reply',{ok:s.done,n:14})}
/* draw + pointer */
function draw(){const m=part();g.fillStyle=U.dk()?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H);
 if(m==='chal')U.banner('Challenge: motions, order, rebuttal, points of information and replies.','ok');else({side:drawSide,order:drawOrder,rebut:drawRebut,poi:drawPoi,reply:drawReply})[m]();A.fx.draw(g)}
function down(p){const m=part();
 if(m==='side'){if(HAND&&isIn(p,HAND)){S.sd.drag={x:p.x,y:p.y};return true}const z=ZONE.findIndex(r=>isIn(p,r));if(z>=0)place(z);return false}
 if(m==='order'){const r=LEFT.find(r=>!S.od.seq.includes(r.k)&&isIn(p,r));if(r)pick(r.k);return false}
 if(m==='rebut'){const r=OPT.find(r=>isIn(p,r));if(r){S.rb.drag={j:r.j,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(m==='poi'){const r=CELL.find(r=>isIn(p,r));if(r)minute(r.row,r.m);return false}
 if(m==='reply'){if(isIn(p,CHECK)){check();return false}const r=NOTE.find(r=>isIn(p,r));if(r)toggle(r.i);return false}
 return false}
function move(p){const m=part(),d=m==='side'?S.sd.drag:m==='rebut'?S.rb.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=part();
 if(m==='side'&&S.sd.drag){S.sd.drag=null;const z=ZONE.findIndex(r=>isIn(p,r));if(z>=0)place(z);else{A.redraw();say('Drop the card on a side.')}}
 if(m==='rebut'&&S.rb.drag){const d=S.rb.drag;S.rb.drag=null;if(isIn(p,BOX)||Math.hypot(p.x-d.x0,p.y-d.y0)<8)answer(d.j);else A.redraw()}}
/* state, words, buttons */
function reset(){epoch++;for(const k in S)delete S[k];Object.assign(S,{sd:{i:0,pile:[[],[]],bad:false,drag:null},od:{seq:[],bad:null},rb:{k:0,bad:null,drag:null,got:[]},pi:{ok:[],bad:null},rp:{in:{},bad:false,done:false,flag:-1},note:null,check:()=>{}})}
function say(t,bad){S.note=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.check()}
const closer=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(D.DONE[i]+A.reveal(i))};
function open(i,ok){reset();c.say(D.DESC[i]);A.cv.setAttribute('aria-label',D.DESC[i]);S.check=closer(i,ok);keys();A.redraw()}
function demo(i,acts){steps[i].go();const e=epoch;let t=0;acts.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function keys(){if(!tray)return;tray.innerHTML='';const m=part(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
 if(m==='side'&&D.CARDS[S.sd.i]){add('Proposition (for)',()=>place(0));add('Opposition (against)',()=>place(1))}
 if(m==='order')D.MIX.forEach(k=>{if(!S.od.seq.includes(k))add(D.SPEECH[k],()=>pick(k))});
 if(m==='rebut'){const R=D.REB[S.rb.k];if(R)R.opts.forEach((o,j)=>add(`Reply ${j+1}`,()=>answer(j),`Reply ${j+1}: ${o[0]}`))}
 if(m==='poi'){for(let k=0;k<8;k++)add(`Main ${k+1}`,()=>minute(0,k),`Main speech, minute ${k+1}`);for(let k=0;k<4;k++)add(`Reply ${k+1}`,()=>minute(1,k),`Reply speech, minute ${k+1}`)}
 if(m==='reply'&&!S.rp.done){D.NOTES.forEach((N,i)=>add(`${S.rp.in[i]?'Leave out':'Put in'}: ${N[0]}`,()=>toggle(i)));add('Check my reply',check)}}
const steps=[
{h:'The motion and the sides',p:D.TXT[0],predict:{q:'You are given the side you disagree with. What do you do?',opts:['Argue it badly or refuse','Argue it as well as you can'],ans:1},task:'Put all 6 cards on the side they help',
 show:()=>demo(0,D.CARDS.map(C=>[250,()=>place(C[1])])),go:()=>open(0,()=>S.sd.i>=6)},
{h:'Speaking order',p:D.TXT[1],predict:{q:'Who gets the very last word in the debate?',opts:['The opposition, answering everything','The proposition'],ans:1},task:'Put all 8 speeches in order',
 show:()=>demo(1,[0,1,2,3,4,5,6,7].map(k=>[200,()=>pick(k)])),go:()=>open(1,()=>S.od.seq.length===8)},
{h:'Rebuttal',p:D.TXT[2],predict:{q:'The best way to answer the other side is to…',opts:['Show the speaker is not very clever','Sum up their point fairly, then show why it fails'],ans:1},task:'Choose the fair rebuttal 3 times',
 show:()=>demo(2,D.REB.map(R=>[400,()=>answer(R.opts.findIndex(o=>o[1]==='ok'))])),go:()=>open(2,()=>S.rb.k>=3)},
{h:'Points of information',p:D.TXT[3],predict:{q:'Can you offer a point of information in the first minute of a speech?',opts:['Yes, at any time','No: the first and last minute are protected'],ans:1},task:'Find all 6 minutes when a POI is allowed',
 show:()=>demo(3,[1,2,3,4,5,6].map(k=>[200,()=>minute(0,k)])),go:()=>open(3,()=>S.pi.ok.length===6)},
{h:'The reply speech',p:D.TXT[4],task:'Plan a reply speech that follows the rules',
 show:()=>demo(4,[...[0,1,2,4].map(i=>[200,()=>toggle(i)]),[300,check]]),go:()=>open(4,()=>S.rp.done)},
{h:'Challenge',p:'',go:()=>{reset();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function slip(t){let m='Think about the rules of a formal debate.';
 if(t==='motion')m='The motion is the statement being debated. One side argues for it and the other against it.';
 if(t==='order')m='The proposition opens and the sides take turns. Replies flip, so the proposition also speaks last.';
 if(t==='poi')m='Points of information are allowed only between the 1st and 7th minute. The first and last minute are protected.';
 if(t==='straw')m='That twists their point into something sillier. Sum it up fairly first, then answer it.';
 if(t==='person')m='That attacks the speaker, not the argument. Answer what they said.';
 if(t==='newarg')m='A reply speech sums up the clashes. A new argument there is not allowed, because no one can answer it.';
 if(t==='side')m='In a formal debate your side is given to you. Arguing it well is the skill, whatever you think yourself.';
 return m}
function pose(){turn++;const Q=D.QS[turn%D.QS.length],all=[[Q.a,'ok'],...Q.o],k=turn%3,shown=all.slice(k).concat(all.slice(0,k));
 qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=qbox.querySelector('.fl-pick');shown.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function grade(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{qbox.hidden=X.step!==5;tray.hidden=X.step===5;keys()},
 init:X=>{A=X;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Debate lab buttons'},w);qbox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}}).start()})})();
