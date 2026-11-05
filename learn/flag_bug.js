/* Flagship: what is a minibeast? (topic "What is a minibeast?"; ages 5-7; NC Y1-2 animals including humans and
   living things in their habitats; early-years "minibeasts" = small invertebrates). Sort small animals by backbone,
   lift a log, stone and leaves on a bug hunt, look through a hand lens to count legs (ladybird 6, spider 8), then group
   minibeasts by legs. Every tap or drag has a button twin. */
(()=>{
VIS.reg('flagbug',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
// name, backbone?, legs, colour key
const ZOO={worm:['worm',0,0,'pk'],ladybird:['ladybird',0,6,'rd'],mouse:['mouse',1,4,'mu'],snail:['snail',0,0,'or'],frog:['frog',1,4,'gr'],spider:['spider',0,8,'tx'],
 woodlouse:['woodlouse',0,14,'mu'],ant:['ant',0,6,'tx'],beetle:['beetle',0,6,'vi'],bee:['bee',0,6,'or'],slug:['slug',0,0,'or'],robin:['robin',1,2,'rd']};
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['backbone','hunt','lady','spider','legs','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
// draw one animal; legs are only drawn when big (seen through the lens)
function critter(k,x,y,s,legs,nl){const g=A.ctx,C=A.col,z=ZOO[k],col=C[z[3]]||C.tx;g.save();g.translate(x,y);g.lineWidth=Math.max(1.5,s*.06);g.strokeStyle=C.tx;
 if(legs&&z[2]){const n=z[2]/2;for(let i=0;i<n;i++){const t=n===1?0:(i/(n-1)-.5)*1.4;[-1,1].forEach(sd=>{g.beginPath();g.moveTo(t*s*.5,sd*s*.18);g.lineTo(t*s*.75,sd*s*.62);g.stroke()})}}
 if(k==='worm'||k==='slug'){g.beginPath();g.ellipse(0,0,s*.7,s*.16,0,0,7);g.fillStyle=col;g.fill();g.stroke()}
 else if(k==='snail'){g.beginPath();g.ellipse(0,s*.2,s*.65,s*.14,0,0,7);g.fillStyle=A.alpha(col,.6);g.fill();g.stroke();g.beginPath();g.arc(0,-s*.05,s*.35,0,7);g.fillStyle=col;g.fill();g.stroke()}
 else if(k==='spider'){g.beginPath();g.arc(-s*.2,0,s*.2,0,7);g.fillStyle=A.alpha(col,.8);g.fill();g.stroke();g.beginPath();g.arc(s*.25,0,s*.28,0,7);g.fill();g.stroke()}
 else if(k==='mouse'||k==='frog'||k==='robin'){g.beginPath();g.ellipse(0,0,s*.5,s*.32,0,0,7);g.fillStyle=col;g.fill();g.stroke();g.beginPath();g.arc(s*.5,-s*.12,s*.18,0,7);g.fill();g.stroke()}
 else{const parts=k==='woodlouse'?[[0,.55]]:[[-.4,.17],[-.08,.18],[.32,.3]];parts.forEach(([px,r])=>{g.beginPath();g.ellipse(px*s,0,r*s,(k==='woodlouse'?.3:r)*s,0,0,7);g.fillStyle=col;g.fill();g.stroke()})}
 g.restore();if(!nl)T(z[0],x,y+s*.75+8,A.narrow?12:14,{w:800})}
function bins(names,y){const n=names.length,w=(A.W-12*(n+1))/n;return names.map((t,i)=>({t,x:12+i*(w+12),y,w,h:A.H*.2}))}
function drawBins(bs,sel){const g=A.ctx,C=A.col;bs.forEach((b,i)=>{g.fillStyle=A.alpha(i===sel?C.gr:C.vi,.13);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T(b.t,b.x+b.w/2,b.y+16,A.narrow?11:13,{w:800,max:b.w-6})})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Minibeast = small animal, no backbone',W/2,H*.3,A.narrow?14:18,{w:900});T('Insect: 6 legs, 3 body parts',W/2,H*.5,A.narrow?13:16);T('Spider: 8 legs. Worm, snail, slug: no legs',W/2,H*.66,A.narrow?12:15,{c:C.mu});A.fx.draw(g);return}
 if(k==='backbone'||k==='legs'){const bs=S.bins=bins(k==='backbone'?['Minibeast: no backbone','Has a backbone']:['6 legs','8 legs','Lots of legs','No legs'],H*.76);
  const cur=S.list[S.i];T(cur?`Where does the ${ZOO[cur][0]} go?`:'All sorted!',W/2,H*.07,A.narrow?14:17,{w:800});
  if(cur)critter(cur,W/2,H*.36,Math.min(W,H)*.22,k==='legs');
  drawBins(bs,-1);bs.forEach((b,i)=>{const got=S.placed.filter(p=>p[1]===i).map(p=>ZOO[p[0]][0]).join(', ');T(got,b.x+b.w/2,b.y+b.h*.65,A.narrow?10:12,{c:C.tx,w:600,max:b.w-6})})}
 if(k==='hunt'){T(S.lifted.length<3?'Tap a hiding place to lift it':'You found minibeasts! Put things back.',W/2,H*.07,A.narrow?13:16,{w:800});
  S.spots=[['log',W*.2],['stone',W*.5],['leaves',W*.8]].map(([n,x],i)=>({n,x,y:H*.55,i}));
  S.spots.forEach(s=>{const up=S.lifted.includes(s.i)&&!S.back,u=Math.min(W*.13,H*.2);
   if(up){S.under[s.i].forEach((b,j)=>critter(b,s.x+(j-.5)*u*.9,s.y+u*.25,u*.55,false))}
   g.save();g.translate(s.x,s.y-(up?u*.9:0));g.lineWidth=2;g.strokeStyle=C.tx;
   if(s.n==='log'){g.fillStyle='#92400e';g.fillRect(-u*.9,-u*.3,u*1.8,u*.6);g.strokeRect(-u*.9,-u*.3,u*1.8,u*.6)}
   if(s.n==='stone'){g.beginPath();g.ellipse(0,0,u*.8,u*.42,0,0,7);g.fillStyle='#9ca3af';g.fill();g.stroke()}
   if(s.n==='leaves'){[-.5,0,.5].forEach(d=>{g.beginPath();g.ellipse(d*u,0,u*.45,u*.25,d,0,7);g.fillStyle=C.gr;g.fill();g.stroke()})}
   g.restore();T(s.n,s.x,H*.9,A.narrow?13:15,{w:800})})}
 if(k==='lady'||k==='spider'){const who=k==='lady'?'ladybird':'spider',bx=W*.3,by=H*.5,s=Math.min(W,H)*.09;S.bug=[bx,by];
  T(S.seen?`Count the ${who}'s legs`:'Drag the lens onto the '+who,W/2,H*.07,A.narrow?13:16,{w:800});
  critter(who,bx,by,s,false);
  const[lx,ly]=S.lens,R=Math.min(W,H)*.26;g.save();g.beginPath();g.arc(lx,ly,R,0,7);g.fillStyle=C.pn;g.fill();g.clip();
  g.translate(lx,ly);g.scale(2.4,2.4);g.translate(-lx,-ly);critter(who,bx,by,s,true,1);g.restore();
  g.beginPath();g.arc(lx,ly,R,0,7);g.strokeStyle=C.tx;g.lineWidth=5;g.stroke();g.beginPath();g.moveTo(lx+R*.7,ly+R*.7);g.lineTo(lx+R*1.15,ly+R*1.15);g.lineWidth=10;g.stroke();
  if(S.legs!=null)T(`${S.legs} legs`,W*.82,H*.2,A.narrow?16:20,{w:900,c:C.tx})}
 A.fx.draw(g)}
function sortTo(b){const cur=S.list[S.i];if(!cur)return;const z=ZOO[cur],k=kind();
 const want=k==='backbone'?(z[1]?1:0):(z[2]===6?0:z[2]===8?1:z[2]>8?2:3);
 if(b!==want){A.sound.miss();
  say(k==='backbone'?(z[1]?`A ${z[0]} has a backbone inside, so it is not a minibeast, even though it is small.`:`A ${z[0]} has no backbone. It is a minibeast.`)
   :`Look again: a ${z[0]} has ${z[2]?z[2]+' legs':'no legs'}.`);return}
 A.sound.pop();S.placed.push([cur,b]);S.i++;say(`Yes. ${z[0]}: ${S.bins[b].t}.`+(S.list[S.i]?` Next: the ${ZOO[S.list[S.i]][0]}.`:''));A.redraw();controls();S.check()}
function lift(i){if(S.lifted.includes(i))return;S.lifted.push(i);A.sound.pop();say(`Under the ${S.spots?S.spots[i].n:['log','stone','leaves'][i]}: ${S.under[i].map(b=>ZOO[b][0]).join(' and ')}.`);A.redraw();controls();S.check()}
function putBack(){if(S.lifted.length<3)return;S.back=1;A.sound.tick();say('Everything is put back gently, so the minibeasts keep their homes.');A.redraw();controls();S.check()}
function lensTo(x,y){S.lens=[x,y];const[bx,by]=S.bug||[A.W*.3,A.H*.5];if(Math.hypot(x-bx,y-by)<Math.min(A.W,A.H)*.12&&!S.seen){S.seen=1;A.sound.tick();say('Now you can see the legs. Count them.');controls()}A.redraw()}
function count(n){if(!S.seen){A.sound.miss();say('Put the lens on it first. The legs are too small to count without it.');return}
 const who=kind()==='lady'?'ladybird':'spider',want=ZOO[who][2];
 if(n!==want){A.sound.miss();say(who==='spider'?(n===6?'Six is for insects. Count again: a spider has 4 legs on each side.':'Count again: 4 legs on each side.'):(n===8?'Eight is for spiders. A ladybird has 3 legs on each side.':'Count again: 3 legs on each side.'));return}
 S.legs=n;A.sound.pop();say(who==='spider'?'8 legs. A spider is not an insect.':'6 legs. A ladybird is an insect.');A.redraw();controls();S.check()}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{list:[],i:0,placed:[],lifted:[],back:0,under:[['woodlouse','worm'],['ant','slug'],['beetle','spider']],lens:[0,0],seen:0,legs:null,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*320))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if((k==='backbone'||k==='legs')&&S.list[S.i])(S.bins||[]).forEach((b,i)=>btn(b.t,()=>sortTo(i),'Put the '+ZOO[S.list[S.i]][0]+' in '+b.t));
 if(k==='hunt'){['log','stone','leaves'].forEach((n,i)=>{if(!S.lifted.includes(i))btn('Lift the '+n,()=>lift(i))});if(S.lifted.length>=3&&!S.back)btn('Put them back gently',putBack)}
 if(k==='lady'||k==='spider'){if(!S.seen)btn('Move the lens onto it',()=>lensTo(A.W*.3,A.H*.5));else if(S.legs==null)[6,8,4].forEach(n=>btn(n+' legs',()=>count(n),'It has '+n+' legs'))}}
function down(p){const k=kind();if(k==='chal')return false;
 if((k==='backbone'||k==='legs')&&S.bins){const b=S.bins.findIndex(b=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h);if(b>=0)sortTo(b);return true}
 if(k==='hunt'&&S.spots){const s=S.spots.find(s=>Math.abs(p.x-s.x)<A.W*.15&&Math.abs(p.y-s.y)<A.H*.25);if(s)lift(s.i);return true}
 if(k==='lady'||k==='spider'){S.drag=1;lensTo(p.x,p.y);return true}return false}
const steps=[
{h:'Backbone or not?',p:'A minibeast is a small animal with no backbone. Your backbone is the row of bones down your back. Sort each animal.',
 predict:{q:'A mouse is small. Is a mouse a minibeast?',opts:['No, it has a backbone','Yes, it is small','Yes, it lives outside'],ans:0},
 task:'Sort 6 animals: minibeast or backbone',show:()=>auto(0,[0,0,1,0,1,0].map(b=>()=>sortTo(b))),
 go:()=>{reset({list:['worm','ladybird','mouse','snail','frog','spider']});say('Where does the worm go?');A.redraw();controls();S.check=finish(0,()=>S.i>=6,'Worm, ladybird, snail and spider have no backbone: minibeasts. The mouse and frog are small, but they have backbones.')}},
{h:'Bug hunt',p:'Minibeasts hide in dark, damp places. Lift the log, the stone and the leaves. Then put them back.',
 task:'Lift all 3 hiding places, then put them back',show:()=>auto(1,[()=>lift(0),()=>lift(1),()=>lift(2),putBack]),
 go:()=>{reset();say('Tap the log, the stone or the leaves to lift it.');A.redraw();controls();S.check=finish(1,()=>S.back,'Six minibeasts found, and every home put back.')}},
{h:'Look closely',p:'Some legs are too small to count by eye. Drag the hand lens onto the ladybird and count its legs.',
 predict:{q:'How many legs does a ladybird have?',opts:['6','8','4'],ans:0},
 task:'Use the lens and count the ladybird\'s legs',show:()=>auto(2,[()=>lensTo(A.W*.3,A.H*.5),()=>count(6)]),
 go:()=>{reset({lens:[A.W*.72,A.H*.5]});say('Drag the lens onto the ladybird.');A.redraw();controls();S.check=finish(2,()=>S.legs===6,'A ladybird has 6 legs and 3 body parts. That makes it an insect.')}},
{h:'Is a spider an insect?',p:'Now look at the spider through the lens. Count every leg.',
 predict:{q:'Is a spider an insect?',opts:['No, it has 8 legs','Yes, all bugs are insects','Yes, it is small'],ans:0},
 task:'Use the lens and count the spider\'s legs',show:()=>auto(3,[()=>lensTo(A.W*.3,A.H*.5),()=>count(8)]),
 go:()=>{reset({lens:[A.W*.72,A.H*.5]});say('Drag the lens onto the spider.');A.redraw();controls();S.check=finish(3,()=>S.legs===8,'A spider has 8 legs and 2 body parts, so it is not an insect. It is still a minibeast.')}},
{h:'Sort by legs',p:'Look at the legs and sort each minibeast into a group.',
 task:'Sort 6 minibeasts by their legs',show:()=>auto(4,[0,1,2,3,0,3].map(b=>()=>sortTo(b))),
 go:()=>{reset({list:['ant','spider','woodlouse','worm','bee','snail']});say('Where does the ant go?');A.redraw();controls();S.check=finish(4,()=>S.i>=6,'Ant and bee: 6 legs, insects. Spider: 8. Woodlouse: 14. Worm and snail: none. All minibeasts.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Which one is a minibeast?',[['a woodlouse','ok'],['a mouse','small'],['a robin','bird']]],
 ['How many legs does an insect have?',[['6','ok'],['8','spider'],['lots','many']]],
 ['Is a spider an insect?',[['No, a spider has 8 legs','ok'],['Yes, all bugs are insects','allbugs'],['Yes, because it is small','small2']]],
 ['A worm has no legs. Is it a minibeast?',[['Yes, it is a small animal with no backbone','ok'],['No, it has no legs','nolegs'],['No, it is not an animal','notanimal']]],
 ['What helps you count tiny legs?',[['a hand lens','ok'],['a ruler','ruler'],['a torch only','torch']]],
 ['You find minibeasts under a log. What should you do next?',[['Put the log back gently','ok'],['Take them all home','home'],['Leave the log turned over','leave']]],
 ['What makes an animal a minibeast?',[['It is small and has no backbone','ok'],['It is small','small'],['It lives in a garden','garden']]]];
function why(t){let m='A minibeast is a small animal with no backbone.';
 if(t==='small')m='Small is not enough. A mouse is small but has a backbone, so it is not a minibeast.';
 if(t==='bird')m='A robin has a backbone. Birds are not minibeasts.';
 if(t==='spider')m='Eight legs is a spider. Insects have 6 legs.';
 if(t==='many')m='Lots of legs is a woodlouse or centipede. Insects have exactly 6.';
 if(t==='allbugs')m='Not all minibeasts are insects. Insects have 6 legs; a spider has 8.';
 if(t==='small2')m='Being small does not make it an insect. Count the legs: 8, so not an insect.';
 if(t==='nolegs')m='Legs do not decide it. A worm has no backbone, so it is a minibeast.';
 if(t==='notanimal')m='A worm is alive: it moves, eats and grows. It is an animal.';
 if(t==='ruler')m='A ruler measures length. A hand lens makes tiny things look bigger.';
 if(t==='torch')m='Light helps, but a hand lens makes the legs big enough to count.';
 if(t==='home')m='Minibeasts need their damp, dark home. Look, then leave them be.';
 if(t==='leave')m='A log left turned over dries out. Put it back so their home stays damp.';
 if(t==='garden')m='Lots of animals live in gardens, like robins. A minibeast has no backbone.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Minibeast controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>{if(S.drag&&(kind()==='lady'||kind()==='spider'))lensTo(p.x,p.y)},up:()=>{S.drag=0}});controls()}});
A.start()})})();
