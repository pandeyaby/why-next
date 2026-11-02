/* Flagship – reading contractions (ages 5–6). Tap out the letters that drop, slot in the apostrophe, unzip short forms,
   find the right gap, spot contractions in a story and squash two words into one. */
(()=>{
const SQ=[{w:['I','am'],c:"I'm",drop:[1]},{w:['do','not'],c:"don't",drop:[3]},{w:['we','will'],c:"we'll",drop:[2,3]}];
const UZ=[["can't",'cannot',['can it','can too'],'no'],["it's",'it is',['is it','it was'],'i'],["I'll",'I will',['I am','ill'],'wi']];
const GP=[['dont',3,'do not','the o from not'],['shes',3,'she is','the i from is'],['theyre',4,'they are','the a from are']];
const ST=[["It's",'It is'],['hot.'],['We'],["can't",'cannot'],['find'],['Tom.'],['Oh,'],["he's",'he is'],['up'],['a'],['tree!']];
const SJ=[{s:['I','do','not','like','rain.'],a:1,c:"don't"},{s:['We','are','late!'],a:0,c:"We're"},{s:['You','will','see.'],a:0,c:"You'll"}];
VIS.reg('flagcontr',c=>{let A,pad,quiz,qn=-1,gen=0,streak=0;c.fig.classList.add('young');
const blank=()=>({r:0,n:0,busy:0,bad:-1,drag:null,after:()=>{},gone:[],fixed:0,put:-1,found:[],sel:[],joined:0,chips:[],fast:0}),S=blank();
const phase=()=>['squash','unzip','gap','spot','join','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.12)),quick=()=>A.reduced()||S.fast;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function write(g,t,x,y,maxw,px,col,wt){g.font=`${wt||700} ${z(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const rows=[];let cur='';String(t).split(' ').forEach(w=>{const n=cur?cur+' '+w:w;if(g.measureText(n).width>maxw&&cur){rows.push(cur);cur=w}else cur=n});rows.push(cur);
 rows.forEach((s,i)=>g.fillText(s,x,y+(i-(rows.length-1)/2)*z(px)*1.25))}
function tile(g,r,fill,edge,lw,dash){g.save();A.paint.shadow(5,2,.12);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow();if(dash)g.setLineDash([6,5]);g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
/* one row of letter tiles, centred; a space leaves a half-tile gap */
function row(str,y){const n=str.length,s=Math.min(z(64),(A.W-24)/(n+.5)),x0=(A.W-s*n)/2;return[...str].map((ch,k)=>({ch,k,x:x0+k*s+2,y,w:s-4,h:s*1.15}))}
const mid=r=>({x:r.x+r.w/2,y:r.y+r.h/2});
const home=()=>({x:A.W/2,y:A.H*.8});
const boxes=n=>{const w=Math.min(z(130),(A.W-24-(n-1)*10)/n),h=z(70),x0=(A.W-(w*n+(n-1)*10))/2;return Array.from({length:n},(_,j)=>({x:x0+j*(w+10),y:A.H-h-14,w,h}))};
const sq=()=>SQ[S.r],allGone=()=>S.gone.length>=sq().drop.length;
function sqTiles(){const q=sq();if(allGone())return row(q.c,A.H*.34);let li=0;return row(q.w.join(' '),A.H*.34).filter(t=>t.ch!==' ').map(t=>({...t,li:li++}))}
const uzOpts=()=>{const u=UZ[S.r],o=[u[1],...u[2]],k=S.r%3;return o.slice(k).concat(o.slice(0,k))};
const gapTiles=()=>row(GP[S.r][0],A.H*.36);
const slots=()=>gapTiles().slice(1).map(t=>({x:t.x-2,y:t.y+t.h/2,k:t.k}));
function chips(g,words,y0,px){g.font=`800 ${z(px)}px system-ui,sans-serif`;const pad=z(12),gap=z(10),hh=z(px)*2,out=[];let line=[],w=0;const lines=[];
 words.forEach((t,i)=>{const cw=g.measureText(t).width+pad*2;if(w+cw>A.W-30&&line.length){lines.push([line,w-gap]);line=[];w=0}line.push([i,cw]);w+=cw+gap});lines.push([line,w-gap]);
 lines.forEach(([ln,lw],j)=>{let x=(A.W-lw)/2;ln.forEach(([i,cw])=>{out[i]={x,y:y0+j*(hh+z(30)),w:cw,h:hh};x+=cw+gap})});return out}
function chipDraw(g,r,t,state,px){const C=A.col,col=state==='ok'?C.gr:state==='bad'?C.rd:state==='sel'?C.am:C.ln;tile(g,r,state==='ok'?A.mix(C.pn,C.gr,.14):state==='sel'?A.mix(C.pn,C.am,.18):C.pn,col,state?3:2);write(g,t,r.x+r.w/2,r.y+r.h/2,r.w+40,px,C.tx,800)}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=phase(),d=S.drag;
 if(p==='quiz'){write(g,"The apostrophe ( ' ) shows where letters are missing.",W/2,H*.45,W-40,19,C.tx,800);return}
 if(p==='squash'){const q=sq(),ts=sqTiles(),gone=allGone();write(g,S.fixed?`${q.w.join(' ')} → ${q.c}`:gone?'Drag the apostrophe into the gap.':`Make ${q.c}. Tap the letters that drop out.`,W/2,H*.08,W-30,17,S.fixed?C.gr:C.tx,800);
  ts.forEach(t=>{if(gone&&t.ch==="'"){if(S.fixed){tile(g,t,A.mix(C.pn,C.am,.3),C.am,3);write(g,"'",t.x+t.w/2,t.y+t.h/2+4,t.w,34,C.tx,900)}else tile(g,t,A.alpha(C.am,.08),C.am,2.5,1);return}
   const out=!gone&&S.gone.includes(t.li),r=out?{...t,y:t.y+t.h*1.5}:t;if(out)g.globalAlpha=.35;tile(g,r,S.bad===t.li&&!gone?A.mix(C.pn,C.rd,.25):C.pn,S.bad===t.li&&!gone?C.rd:C.cy,2.5);write(g,t.ch,r.x+r.w/2,r.y+r.h/2,r.w,26,C.tx,800);g.globalAlpha=1});
  if(gone&&!S.fixed)mark(g,d&&d.x!=null?d:home())}
 if(p==='unzip'){const u=UZ[S.r],at=d&&d.x!=null?d:{x:W/2,y:H*.36},r={x:at.x-z(70),y:at.y-z(38),w:z(140),h:z(76)};write(g,S.busy?`${u[0]} = ${u[1]}`:'What is the long way to say it?',W/2,H*.08,W-30,17,S.busy?C.gr:C.tx,800);
  boxes(3).forEach((b,i)=>{tile(g,b,S.bad===i?A.mix(C.pn,C.rd,.22):A.mix(C.pn,C.vi,.1),S.bad===i?C.rd:C.vi,3);write(g,uzOpts()[i],b.x+b.w/2,b.y+b.h/2,b.w-10,17,C.tx,800)});
  if(!S.busy){tile(g,r,A.mix(C.pn,C.am,.2),C.am,3.5);write(g,u[0],at.x,at.y,r.w,30,C.tx,900)}}
 if(p==='gap'){const q=GP[S.r],ts=S.put>=0?row(q[0].slice(0,q[1])+"'"+q[0].slice(q[1]),H*.36):gapTiles();write(g,S.put>=0?`${q[2]} → ${ts.map(t=>t.ch).join('')}`:`${q[0]} is short for ${q[2]}. Where does the apostrophe go?`,W/2,H*.09,W-30,17,S.put>=0?C.gr:C.tx,800);
  ts.forEach(t=>{const ap=t.ch==="'";tile(g,t,ap?A.mix(C.pn,C.am,.3):C.pn,ap?C.am:C.cy,2.5);write(g,t.ch,t.x+t.w/2,t.y+t.h/2+(ap?4:0),t.w,ap?34:26,C.tx,800)});
  if(S.put<0){slots().forEach((s,i)=>{g.fillStyle=S.bad===s.k?C.rd:A.alpha(C.am,.75);g.beginPath();g.arc(s.x,s.y+gapTiles()[0].h*.75,z(9),0,7);g.fill()});mark(g,d&&d.x!=null?d:home())}}
 if(p==='spot'){write(g,'Find 3 words with an apostrophe. Tap each one.',W/2,H*.07,W-30,16,C.tx,800);S.chips=chips(g,ST.map(s=>s[0]),H*.2,20);
  S.chips.forEach((r,i)=>{const f=S.found.includes(i);chipDraw(g,r,ST[i][0],f?'ok':S.bad===i?'bad':'',20);if(f)write(g,ST[i][1],r.x+r.w/2,r.y+r.h+z(14),r.w+30,13,C.gr,800)})}
 if(p==='join'){const q=SJ[S.r],ws=S.joined?[...q.s.slice(0,q.a),q.c,...q.s.slice(q.a+2)]:q.s;write(g,S.joined?'Two words became one!':'Tap the two words that can squash into one.',W/2,H*.08,W-30,16,S.joined?C.gr:C.tx,800);
  S.chips=chips(g,ws,H*.3,24);S.chips.forEach((r,i)=>chipDraw(g,r,ws[i],S.joined?(i===q.a?'ok':''):S.sel.includes(i)?'sel':S.bad===i?'bad':'',24));
  if(S.joined)write(g,`${q.s[q.a]} ${q.s[q.a+1]} → ${q.c}`,W/2,H*.78,W-30,20,C.gr,800)}
 A.fx.draw(g)}
function mark(g,at){const C=A.col;g.fillStyle=A.alpha(C.am,.18);g.beginPath();g.arc(at.x,at.y,z(38),0,7);g.fill();g.strokeStyle=C.am;g.lineWidth=3;g.stroke();write(g,"'",at.x,at.y+z(8),z(60),52,C.tx,900)}
function miss(t,j){A.sound.miss();S.bad=j==null?-1:j;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:1200);A.redraw()}
function yes(t,stay){S.n++;A.sound.pop();if(S.n<3&&!stay){const r0=S.r,g0=gen;S.busy=1;setTimeout(()=>{if(S.r!==r0||g0!==gen)return;Object.assign(S,{busy:0,r:S.r+1,gone:[],fixed:0,put:-1,sel:[],joined:0});say(t+' Next one.');buttons();A.redraw()},quick()?5:1400)}else S.busy=!stay;say(t);buttons();A.redraw();S.after()}
function drop(li){if(phase()!=='squash'||S.busy||allGone()||S.gone.includes(li))return;const q=sq(),ch=q.w.join('')[li];
 if(!q.drop.includes(li))return miss(`Keep the ${ch}. ${q.c} still has it.`,li);S.gone.push(li);A.sound.tick();
 if(allGone())say(`The letters squash up and leave a gap. Drag the apostrophe into the gap.`);else say(`Yes, the ${ch} drops out. One more.`);buttons();A.redraw()}
function fix(){if(phase()!=='squash'||S.busy||S.fixed)return;if(!allGone())return miss('First tap the letters that drop out. Then there is a gap.');const q=sq(),miss_=q.drop.map(i=>q.w.join('')[i]).join('');S.fixed=1;yes(`${q.w.join(' ')} → ${q.c}. The apostrophe sits where ${miss_} went.`)}
function pick(i){if(phase()!=='unzip'||S.busy)return;const u=UZ[S.r],o=uzOpts()[i];if(o!==u[1])return miss(`Not ${o}. ${u[0]} is short for ${u[1]}. The apostrophe is where ${u[3]} went.`,i);yes(`${u[0]} = ${u[1]}. The apostrophe stands for ${u[3]}.`)}
function put(k){if(phase()!=='gap'||S.busy||S.put>=0)return;const q=GP[S.r];if(k!==q[1])return miss(`Not there. ${q[2]}: ${q[3]} is missing, so the apostrophe goes in that gap.`,k);S.put=k;yes(`Yes! The apostrophe shows ${q[3]} is missing.`)}
function tapWord(i){if(phase()!=='spot'||S.n>=3||S.found.includes(i))return;const s=ST[i];if(!s[1])return miss(`"${s[0]}" has no apostrophe. Look for the little mark ( ' ).`,i);S.found.push(i);yes(`${s[0]} means ${s[1]}.`,1)}
function tapJoin(i){if(phase()!=='join'||S.busy||S.joined||S.sel.includes(i))return;const q=SJ[S.r];if(i!==q.a&&i!==q.a+1)return miss(`Not ${q.s[i]}. Find two words side by side that squash into one short word.`,i);
 S.sel.push(i);A.sound.tick();if(S.sel.length<2){say(`${q.s[i]}… and which word next to it?`);return A.redraw()}S.joined=1;yes(`${q.s[q.a]} ${q.s[q.a+1]} → ${q.c}.`)}
function buttons(){if(!pad)return;pad.innerHTML='';const p=phase(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(p==='quiz'||S.n>=3||S.busy)return;
 if(p==='squash'){const q=sq();if(!allGone())[...q.w.join('')].forEach((ch,li)=>{if(!S.gone.includes(li))B(ch,()=>drop(li),'Tap out the letter '+ch)});else if(!S.fixed)B("Put in the apostrophe ( ' )",fix)}
 if(p==='unzip')uzOpts().forEach((o,i)=>B(o,()=>pick(i),`${UZ[S.r][0]} means ${o}`));
 if(p==='gap'&&S.put<0){const w=GP[S.r][0];for(let k=1;k<w.length;k++)B(w.slice(0,k)+"'"+w.slice(k),()=>put(k))}
 if(p==='spot')ST.forEach((s,i)=>{if(!S.found.includes(i))B(s[0],()=>tapWord(i))});
 if(p==='join'&&!S.joined)SJ[S.r].s.forEach((w,i)=>{if(!S.sel.includes(i))B(w,()=>tapJoin(i))})}
const near=(q,o,r)=>Math.hypot(q.x-o.x,q.y-o.y)<r,within=(q,r,m)=>(m=m||0,q.x>r.x-m&&q.x<r.x+r.w+m&&q.y>r.y-m&&q.y<r.y+r.h+m);
function down(q){const p=phase();if(p==='quiz'||S.busy)return false;
 if(p==='squash'){if(!allGone()){const t=sqTiles().find(t=>within(q,t,4));if(t)drop(t.li);return false}if(!S.fixed&&near(q,home(),z(50))){S.drag={x:null,x0:q.x,y0:q.y};return true}return false}
 if(p==='unzip'){if(near(q,{x:A.W/2,y:A.H*.36},z(70))){S.drag={x:null,x0:q.x,y0:q.y};return true}const i=boxes(3).findIndex(r=>within(q,r));if(i>=0)pick(i);return false}
 if(p==='gap'){if(S.put>=0)return false;if(near(q,home(),z(50))){S.drag={x:null,x0:q.x,y0:q.y};return true}return false}
 if(p==='spot'||p==='join'){const i=S.chips.findIndex(r=>within(q,r,4));if(i>=0)(p==='spot'?tapWord:tapJoin)(i)}return false}
function move(q){const d=S.drag;if(!d)return;if(d.x!=null||Math.hypot(q.x-d.x0,q.y-d.y0)>8){d.x=q.x;d.y=q.y;A.redraw()}}
function up(q){const d=S.drag,p=phase();S.drag=null;if(!d)return;
 if(p==='squash'){if(d.x==null)return fix();const s=sqTiles().find(t=>t.ch==="'");if(s&&near(q,mid(s),s.w*1.2))fix();else{say('Drop the apostrophe in the empty box.');A.redraw()}return}
 if(p==='unzip'){if(d.x==null)return A.redraw();const i=boxes(3).findIndex(r=>within(q,r,20));if(i>=0)pick(i);else{say('Drop the card on the long way to say it.');A.redraw()}return}
 if(p==='gap'){if(d.x==null){say('Drag the apostrophe to a gap between two letters.');return A.redraw()}const s=slots(),best=s.reduce((b,t)=>Math.abs(t.x-q.x)<Math.abs(b.x-q.x)?t:b,s[0]);
  if(best&&Math.abs(best.x-q.x)<z(30)&&Math.abs(q.y-best.y)<z(80))put(best.k);else{say('Drop it in a gap between two letters.');A.redraw()}}}
const finish=(i,msg)=>()=>{if(A.step===i&&S.n>=3&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++gen,go=()=>{if(k!==gen||S.n>=3)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{gen++;Object.assign(S,blank())};
function oneMove(){const p=phase();if(S.busy)return;if(p==='squash')return allGone()?fix():drop(sq().drop.find(i=>!S.gone.includes(i)));if(p==='unzip')return pick(uzOpts().indexOf(UZ[S.r][1]));
 if(p==='gap')return put(GP[S.r][1]);if(p==='spot')return tapWord(ST.findIndex((s,i)=>s[1]&&!S.found.includes(i)));if(p==='join'){const a=SJ[S.r].a;return tapJoin(S.sel.includes(a)?a+1:a)}}
const show=i=>()=>{steps[i].go();S.fast=1;auto(oneMove)};
const steps=[
{h:'Squash two words',p:'Two words can squash into one short word. Tap the letters that drop out, then drag the apostrophe into the gap.',predict:{q:"In I'm, what does the little mark ( ' ) show?",opts:['Where a letter is missing','That I is a name'],ans:0},task:'Make 3 short words',show:show(0),
 go:()=>{reset();say("Make I'm. Tap the letter that drops out.");buttons();S.after=finish(0,'A contraction is two words squashed into one. The apostrophe takes the place of the missing letters.')}},
{h:'Unzip it',p:'Drag the short word onto the long way to say it, or tap a box.',predict:{q:"What does can't mean?",opts:['can it','cannot'],ans:1},task:'Unzip 3 short words',show:show(1),
 go:()=>{reset();say("What is the long way to say can't?");buttons();S.after=finish(1,"Read a contraction as its long words: can't is cannot, it's is it is, I'll is I will.")}},
{h:'Find the gap',p:'Drag the apostrophe to the gap between two letters, where letters went missing.',predict:{q:'Where does the apostrophe go in dont?',opts:["do'nt, between the two words","don't, where the o went"],ans:1},task:'Fix 3 words',show:show(2),
 go:()=>{reset();say('Where does the apostrophe go in dont?');buttons();S.after=finish(2,'The apostrophe goes exactly where the letters were taken out, not between the two words.')}},
{h:'Spot them',p:'Read the little story. Tap every word that has an apostrophe.',task:'Find 3 contractions',show:show(3),
 go:()=>{reset();say("Read the story. Tap the words with an apostrophe.");buttons();S.after=finish(3,"It's, can't and he's are contractions. Each one hides two words.")}},
{h:'Squash it',p:'Tap the two words side by side that can squash into one word.',task:'Squash 3 sentences',show:show(4),
 go:()=>{reset();say('Tap the two words that can squash into one.');buttons();S.after=finish(4,"do not → don't, We are → We're, You will → You'll. The sentence means the same.")}},
{h:'Challenge',p:'',go:()=>{reset();challenge()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[["What does we'll mean?",[['we will','ok'],['well','well'],['we all','all']]],
 ["What does the apostrophe in don't show?",[['Letters are missing','ok'],['Someone owns it','own'],['The word ends','end']]],
 ['Which one is right?',[["can't",'ok'],["ca'nt",'between'],["cant'",'end']]],
 ['What is a short way to say I am?',[["I'm",'ok'],['Im','nomark'],["I'am",'keep']]],
 ["Which word is a contraction? She's my sister.",[["She's",'ok'],['my','none'],['sister','none']]]];
function why(t){let m='The apostrophe shows where letters are missing.';
 if(t==='well')m="Well has no apostrophe. We'll is we will, with the w and i missing.";if(t==='all')m="We'll is short for we will, not we all.";
 if(t==='own')m="Nobody owns anything in don't. The apostrophe shows the o of not is missing.";if(t==='end')m='The apostrophe goes in the gap where letters went, not at the end.';
 if(t==='between')m="Not between the two words. It goes where the o of not was: can't.";if(t==='nomark')m="Im needs an apostrophe to show the a is missing: I'm.";
 if(t==='keep')m="I'am keeps the a. The apostrophe takes the place of the a: I'm.";if(t==='none')m="Look for the word with an apostrophe. She's is short for she is.";return m}
function challenge(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark2(t)});say('Challenge: '+q);A.redraw()}
function mark2(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! You can read contractions.':'✗ '+why(t)}${ok?` Stars in a row: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=challenge}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
