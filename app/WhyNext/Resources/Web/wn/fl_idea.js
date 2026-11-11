/* Flagship – having my own ideas (ages 3–4, EYFS characteristics of effective learning: creating and thinking
   critically, having their own ideas). Copy a grown-up's tower first, then build one of your own that is different,
   make three different dens from the same things, add a new rule to a ball game, and try a new way when an idea does
   not work. The Challenge is for the grown-up and child together: copying first is fine, mess is part of trying,
   and a failed idea means try again, not stop. */
(()=>{const BL=['red','blue','green','orange'],MINE=[0,1,0,1],
FR=['chairs','table','sofa'],CV=['blanket','sheet','towel'],
RU=[['Kick it with your foot','foot'],['Stand far back','far'],['Use 2 balls','two'],['Roll it like before','same']],
FIX=[{p:'My tower keeps falling down.',o:[['Put more on top',0],['Big blocks at the bottom',1],['Stop playing',2]],
  no:['More on top makes it wobble more. What could go at the bottom?','Do not stop yet. Ideas often need a new try.'],yes:'Big blocks at the bottom. Now it stands up!'},
 {p:'My bridge is too short.',o:[['Push the sides apart',0],['Use a longer block',1],['Give up',2]],
  no:['Apart makes the gap bigger. The block needs to be longer.','Do not give up. Try a new way.'],yes:'A longer block reaches. The bridge works!'}];
VIS.reg('flagidea',c=>{let A,ctl,chal,qi=-1,streak=0;c.fig.classList.add('young');
const S={};
const view=()=>['copy','own','den','rule','fix','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1.05:1.2)),R=()=>A.redraw();
const hue=i=>[A.col.rd,A.col.cy,A.col.gr,A.col.or][i];
function txt(g,s,x,y,n,w){g.font=`${w||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-12)}
function card(g,r,col,a,on,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=warn?4:on?3.5:2;g.strokeStyle=warn?A.col.rd:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const fill=(g,col,a)=>{g.fillStyle=A.mix(A.col.pn,col,a);g.fill();g.lineWidth=2.5;g.strokeStyle=A.col.tx;g.stroke()};
/* a stack of blocks, bottom first, standing on y */
function stack(g,arr,x,y,bw,bh,tilt){arr.forEach((k,i)=>{g.save();const dx=tilt?tilt*i*i*bw*.12:0;g.translate(x+dx,y-(i+.5)*bh);g.rotate(tilt?tilt*i*.12:0);A.paint.rrect(-bw/2,-bh/2+2,bw,bh-4,8);fill(g,hue(k),.5);g.restore()})}
/* swatches drawn on the canvas, one per colour, big enough for small fingers */
const sw=i=>{const s=Math.min(A.W/4.6,A.H*.17);return{x:A.W/2+(i-2)*(s+8)+4,y:A.H-s-8,w:s,h:s}};
/* a den: the frame under a cover with a dark doorway */
function den(g,f,v,x,y,w){const h=w*.62,top=y-h*(f===1?.95:.8);if(f===1){g.beginPath();g.rect(x-w*.5,top-6,w,10);fill(g,A.col.or,.6)}
 if(v!=null){g.beginPath();g.moveTo(x-w*.56,y);g.quadraticCurveTo(x-w*.5,top,x-w*.3,top);g.lineTo(x+w*.3,top);g.quadraticCurveTo(x+w*.5,top,x+w*.56,y);g.closePath();fill(g,[A.col.vi,A.col.cy,A.col.or][v],.45);
  g.beginPath();g.moveTo(x-w*.14,y);g.lineTo(x-w*.14,y-h*.38);g.arc(x,y-h*.38,w*.14,Math.PI,0);g.lineTo(x+w*.14,y);g.closePath();fill(g,A.col.tx,.6)}
 if(f===0)[-1,1].forEach(s=>{g.beginPath();g.rect(x+s*w*.42-w*.07,y-h*.95,w*.14,h*.95);fill(g,A.col.gr,.45)});
 if(f===1)[-1,1].forEach(s=>{g.beginPath();g.rect(x+s*w*.44-4,top,8,y-top);fill(g,A.col.or,.6)});
 if(f===2){g.beginPath();g.rect(x+w*.5,y-h*.8,w*.16,h*.8);fill(g,A.col.rd,.4);g.beginPath();g.rect(x-w*.66,y-h*.8,w*.16,h*.8);fill(g,A.col.rd,.4)}
 if(v==null&&f==null){g.setLineDash([8,6]);g.beginPath();g.rect(x-w/2,y-h,w,h);g.lineWidth=2;g.strokeStyle=A.col.mu;g.stroke();g.setLineDash([])}}
const fr=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.1,w,h:A.H*.17}},cv=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.3,w,h:A.H*.17}};
const quad=i=>({x:8+(i%2)*(A.W/2),y:A.H*.56+Math.floor(i/2)*A.H*.22,w:A.W/2-16,h:A.H*.2});
const opt=i=>({x:A.W*.06,y:A.H*.5+i*A.H*.165,w:A.W*.88,h:A.H*.14});
function wrapT(g,t,x,y,w,n){g.font=`800 ${fs(n)}px system-ui,sans-serif`;const L=[];let l='';t.split(' ').forEach(z=>{const q=l?l+' '+z:z;if(g.measureText(q).width>w&&l){L.push(l);l=z}else l=q});L.push(l);L.forEach((l,i)=>txt(g,l,x,y+(i-(L.length-1)/2)*fs(n)*1.25,n))}
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'Copy first, then make it yours',W/2,H*.3,16);txt(g,'Mess and wobbles are part of trying',W/2,H*.48,15);txt(g,'Did not work? Try a new way',W/2,H*.66,17);return}
 if(v==='copy'||v==='own'){const bw=Math.min(W*.22,H*.2),bh=Math.min(H*.12,bw*.55),y=H*.74;
  txt(g,'My tower',W*.27,H*.08,14);txt(g,'Your tower',W*.73,H*.08,14);stack(g,MINE,W*.27,y,bw,bh);stack(g,S.mine,W*.73,y,bw,bh);
  g.beginPath();g.moveTo(10,y);g.lineTo(W-10,y);g.lineWidth=3;g.strokeStyle=C.tx;g.stroke();
  if(!S.mine.length)txt(g,'Tap a colour',W*.73,y-bh,13,700);
  if(S.oops!=null){g.lineWidth=4;g.strokeStyle=C.rd;A.paint.rrect(W*.73-bw/2-6,y-(S.mine.length+1)*bh-4,bw+12,bh+8,10);g.stroke()}
  BL.forEach((n,i)=>{const r=sw(i);g.beginPath();g.arc(r.x+r.w/2,r.y+r.h/2,r.w/2-2,0,7);fill(g,hue(i),.55)})}
 if(v==='den'){FR.forEach((n,i)=>{const r=fr(i);card(g,r,C.gr,S.f===i?.3:.08,S.f===i);txt(g,n,r.x+r.w/2,r.y+r.h/2,14)});
  CV.forEach((n,i)=>{const r=cv(i);card(g,r,[C.vi,C.cy,C.or][i],S.f==null?.04:.14,false);txt(g,n,r.x+r.w/2,r.y+r.h/2,14)});
  den(g,S.f,S.v,W/2,H*.9,Math.min(W*.5,H*.5));
  txt(g,`Dens made: ${S.dens.length} of 3`,W/2,H*.53,13,700);
  txt(g,S.f==null?'1. Pick a frame':S.v==null?'2. Pick a cover':S.dens.length>=3?'3 different dens!':'New den! Pick a new frame',W/2,H*.04+6,14)}
 if(v==='rule'){const far=S.rules.includes('far'),two=S.rules.includes('two'),foot=S.rules.includes('foot'),y=H*.34,lx=far?W*.08:W*.3;
  g.beginPath();g.rect(W*.72,y-H*.1,W*.2,H*.16);fill(g,C.or,.4);txt(g,'box',W*.82,y-H*.13,12,700);
  g.beginPath();g.moveTo(lx,y-H*.18);g.lineTo(lx,y+H*.12);g.lineWidth=5;g.strokeStyle=C.vi;g.stroke();
  (two?[-1,1]:[0]).forEach(k=>{g.beginPath();g.arc(lx+W*.08,y+k*H*.06,Math.min(W,H)*.04,0,7);fill(g,C.rd,.55)});
  if(foot){A.paint.rrect(lx-W*.1,y+H*.08,W*.08,H*.05,8);fill(g,C.tx,.5)}
  txt(g,S.rules.length?`New rules: ${S.rules.length}`:'Roll the ball to the box',W/2,H*.06,15);
  RU.forEach(([n,k],i)=>{const r=quad(i),on=S.rules.includes(k);card(g,r,k==='same'?C.mu:C.cy,on?.3:.08,on,S.oops===k);wrapT(g,n,r.x+r.w/2,r.y+r.h/2,r.w-16,13)})}
 if(v==='fix'){const k=Math.min(S.round,FIX.length-1),P=FIX[k],ok=S.round>k||S.round>=FIX.length,bw=W*.16,bh=H*.07,y=H*.42;
  wrapT(g,S.round<FIX.length?P.p:'Both ideas work now!',W/2,H*.06,W-24,15);
  if(k===0)stack(g,ok?[1,1,0,0]:[0,0,1,1],W/2,y,ok?bw*1.3:bw*.7,bh,ok?0:S.tries?.7:.35);
  else{[-1,1].forEach(s=>{g.beginPath();g.rect(W/2+s*W*.2-bw*.3,y-bh*3,bw*.6,bh*3);fill(g,C.gr,.45)});const pl=ok?W*.52:W*.3;A.paint.rrect(W/2-pl/2+(ok?0:-W*.05),y-bh*3.5,pl,bh*.5,4);fill(g,C.or,.6)}
  g.beginPath();g.moveTo(10,y);g.lineTo(W-10,y);g.lineWidth=3;g.strokeStyle=C.tx;g.stroke();
  if(S.round<FIX.length)P.o.forEach(([t,w],i)=>{const r=opt(i);card(g,r,C.cy,.08,false,S.oops===i);txt(g,t,r.x+r.w/2,r.y+r.h/2,14)})}
 A.fx.draw(g)}
const bad=(t,m)=>{S.oops=m;A.sound.miss();tell(t);R()},good=t=>{S.oops=null;A.sound.pop();tell(t);pad();R();S.want()};
const same=()=>S.mine.length===MINE.length&&S.mine.every((k,i)=>k===MINE[i]);
/* steps 0 and 1: add a block */
function add(i){const v=view();if(S.mine.length>=4)return;
 if(v==='copy'){const want=MINE[S.mine.length];if(i!==want)return bad(`Look at my tower. Next is ${BL[want]}.`,1);S.mine.push(i);S.oops=null;
  if(S.mine.length<4){A.sound.tick();tell(`Yes, ${BL[i]}. Next is ${BL[MINE[S.mine.length]]}.`);pad();return R()}return good('You copied my tower! Red, blue, red, blue.')}
 S.mine.push(i);S.oops=null;
 if(S.mine.length<4){A.sound.tick();tell(`A ${BL[i]} block. ${4-S.mine.length} more.`);pad();return R()}
 if(same()){S.oops=1;A.sound.miss();tell('That is just like mine. Take one off and change it to make it yours.');pad();return R()}
 good(`Your own tower: ${S.mine.map(k=>BL[k]).join(', ')}. It is not like mine. That is your idea!`)}
function off(){if(!S.mine.length)return;S.mine.pop();S.oops=null;A.sound.tick();tell(S.mine.length?`Off it comes. ${S.mine.length} left.`:'All off. Start again.');pad();R()}
/* step 2: a den is a frame and a cover */
function frame(i){if(S.dens.length>=3)return;S.f=i;S.v=null;S.oops=null;A.sound.tick();tell(`The ${FR[i]}. Now pick a cover.`);pad();R()}
function cover(i){if(S.dens.length>=3)return;if(S.f==null)return bad('First pick a frame: chairs, table or sofa.',null);
 const k=S.f+'-'+i;S.v=i;if(S.dens.includes(k)){A.sound.miss();tell('You made that den already. Try a new way.');pad();return R()}
 S.dens.push(k);const t=`A den: the ${FR[S.f]} and a ${CV[i]}.`;if(S.dens.length<3){A.sound.tick();tell(t+' Make a different one.');pad();return R()}good(t+' 3 different dens from the same things!')}
/* step 3: new rules */
function rule(k){if(S.rules.length>=2)return;if(k==='same')return bad('That is the old way. What could be new?','same');if(S.rules.includes(k))return;S.rules.push(k);S.oops=null;
 const t={foot:'New rule: kick it with your foot!',far:'New rule: stand far back. That is harder!',two:'New rule: 2 balls at once!'}[k];
 if(S.rules.length<2){A.sound.tick();tell(t+' Try one more new rule.');pad();return R()}good(t+' You made the game new.')}
/* step 4: try a new way */
function fix(i){if(S.round>=FIX.length)return;const P=FIX[S.round],w=P.o[i][1];
 if(w!==1){S.tries=1;return bad(P.no[w===0?0:1],i)}S.round++;S.tries=0;if(S.round<FIX.length){S.oops=null;A.sound.tick();tell(P.yes+' Next problem.');pad();return R()}good(P.yes)}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if((v==='copy'||v==='own')){if(S.mine.length<4||(v==='own'&&same()))BL.forEach((n,i)=>B(n,()=>add(i),`Add a ${n} block`));if(S.mine.length)B('Take one off',off,'Take the top block off')}
 if(v==='den'&&S.dens.length<3){FR.forEach((n,i)=>B(n,()=>frame(i),`Use the ${n} for the frame`));CV.forEach((n,i)=>B(n,()=>cover(i),`Cover it with a ${n}`))}
 if(v==='rule'&&S.rules.length<2)RU.forEach(([n,k])=>{if(!S.rules.includes(k))B(n,()=>rule(k))});
 if(v==='fix'&&S.round<FIX.length)FIX[S.round].o.forEach(([t],i)=>B(t,()=>fix(i)))}
function down(p){const v=view();
 if(v==='copy'||v==='own'){const i=BL.findIndex((n,i)=>inR(p,sw(i)));if(i>=0)add(i);else if(p.x>A.W/2&&p.y<A.H*.76)off();return false}
 if(v==='den'){FR.forEach((n,i)=>{if(inR(p,fr(i)))frame(i)});CV.forEach((n,i)=>{if(inR(p,cv(i)))cover(i)});return false}
 if(v==='rule'){RU.forEach(([n,k],i)=>{if(inR(p,quad(i)))rule(k)});return false}
 if(v==='fix'){[0,1,2].forEach(i=>{if(inR(p,opt(i)))fix(i)});return false}return false}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},mine:[],oops:null,f:null,v:null,dens:[],rules:[],round:0,tries:0})};
const steps=[
{h:'Copy my tower',p:'First, copy me. Tap the colours to make your tower like mine.',task:'Copy my 4 blocks',
 show:()=>{steps[0].go();play(MINE.map(k=>()=>add(k)),700)},
 go:()=>{reset();tell('My tower is red, blue, red, blue. Can you copy it?');pad();S.want=check(0,()=>S.mine.length>=4,'Copying is a good start.')}},
{h:'My own tower',p:'Now make your own tower, your way. Tap the top block to take it off.',predict:{q:'Is it OK if your tower is not like mine?',opts:['Yes, it is my idea','No, it must be the same','Only if a grown-up says'],ans:0},task:'Build 4 blocks, not like mine',
 show:()=>{steps[1].go();play([2,3,2,0].map(k=>()=>add(k)),700)},
 go:()=>{reset();tell('Make a tower your way. 4 blocks.');pad();S.want=check(1,()=>S.mine.length>=4&&!same(),'Your tower is different. Different is good.')}},
{h:'Den ideas',p:'Make a den. Pick a frame, then a cover. Then make a different den.',task:'Make 3 different dens',
 show:()=>{steps[2].go();play([()=>frame(0),()=>cover(0),()=>frame(1),()=>cover(1),()=>frame(2),()=>cover(2)],600)},
 go:()=>{reset();tell('Pick a frame for a den: chairs, table or sofa.');pad();S.want=check(2,()=>S.dens.length>=3,'The same things made 3 dens.')}},
{h:'A new rule',p:'We roll a ball to the box. Can you make up a new rule?',task:'Try 2 new rules',
 show:()=>{steps[3].go();play([()=>rule('foot'),()=>rule('two')],900)},
 go:()=>{reset();tell('Roll the ball to the box. What new rule could we try?');pad();S.want=check(3,()=>S.rules.length>=2,'New rules make a new game.')}},
{h:'Try a new way',p:'Ideas do not always work at first. Tap a new way to try.',predict:{q:'Your idea did not work. What now?',opts:['Stop playing','Try a new way','Copy a friend'],ans:1},task:'Fix 2 problems',
 show:()=>{steps[4].go();play([()=>fix(1),()=>fix(1)],900)},
 go:()=>{reset();tell(FIX[0].p+' What could you try?');pad();S.want=check(4,()=>S.round>=FIX.length,'Try, look, then try a new way.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Sam builds his tower his own way, not like yours. What do you say?',[['Tell me about your idea!','ok'],['Do it like mine','copy'],['That is wrong','wrong']]],
 ['Your den falls down. What now?',[['Try a new way','ok'],['Stop playing','stop'],['Ask a grown-up to do it all','doit']]],
 ['Which is a new rule for tag?',[['Hop, do not run','ok'],['Run like always','old'],['Stop the game','end']]],
 ['Is it OK to copy first, then change it?',[['Yes, copy, then make it yours','ok'],['No, never copy','never'],['Only copy, do not change','only']]],
 ['Lily makes a mess trying her box idea. What helps?',[['Let her try, then tidy together','ok'],['Stop her now','mess'],['Do it for her','doit']]],
 ['How can you share your idea?',[['Say: I will try it this way','ok'],['Keep it a secret','quiet'],['Wait for a grown-up idea','wait']]]];
function hintFor(t){let m='Your own ideas are good. Try them out.';
 if(t==='copy')m='His tower can be different. Ask him about it. That is his own idea.';
 if(t==='wrong')m='A different way is not wrong. It is a new idea.';
 if(t==='stop')m='Do not stop. A fall shows you what to change. Try a new way.';
 if(t==='doit')m='A grown-up can help, but let the child try first. Ideas grow by trying.';
 if(t==='old')m='That is the old rule. A new rule changes something.';
 if(t==='end')m='Stopping is not a rule. A new rule keeps the game going.';
 if(t==='never')m='Copying is a good start. Then change one thing to make it yours.';
 if(t==='only')m='Copy first, then add your own idea.';
 if(t==='mess')m='Mess is part of making things. Try first, then tidy up together.';
 if(t==='quiet')m='Tell someone! Say what you will do.';
 if(t==='wait')m='You can have the idea first. Say it out loud.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);R()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'Yes, that’s right. In a row: '+streak+'.':'Not this time. '+hintFor(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move:()=>{},up:()=>{}});pad()}});
A.start()})})();
