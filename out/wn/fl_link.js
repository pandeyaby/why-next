/* Flagship – connecting new and old ideas (ages 7–8): link each new idea to something already known that works the same
   way; sort how a heart is like a pump and how it is not; build a web of useful links round a new topic; pick the link
   that explains (how it works) over one that only matches the look; and spot old ideas that mislead. */
(()=>{
const PAIRS=[['A bat’s wing','your hand: it has finger bones too'],['3 × 4','adding 4, three times'],['Your heart','a pump pushing water round'],['A volcano erupting','a shaken fizzy drink bursting out']];
const OLD_ORDER=[2,0,3,1];
const ALIKE=[['Pushes liquid round through tubes',1],['Is made of living muscle',0],['Has flaps so the liquid only goes one way',1],['Speeds up by itself when you run',0],['Squeezes, then lets go, again and again',1],['Needs a plug and electricity',0]];
const WEB=[['Fridge magnets hold up pictures',1],['My favourite colour is red',0],['A compass needle points north',1],['Paper clips stick, but paper does not',1],['I had pasta for lunch',0],['Two magnets can push apart',1]];
const ROUNDS=[['Plants make their food in their leaves, using light.',[['Leaves are like a kitchen: things go in and food is made.','ok'],['Leaves are like grass, because both are green.','look'],['Leaves are like my bedroom, because I like them.','feel']]],
 ['Sound travels out as vibrations.',[['It spreads like ripples in a pond after a splash.','ok'],['It is like music, because both are nice.','feel'],['It is like a drum, because a drum is round.','look']]],
 ['A fraction is one of the equal parts of a whole.',[['Like one slice of a pizza cut into equal slices.','ok'],['Like a pizza, because a pizza is round.','look'],['Like a party, because I like pizza at parties.','feel']]]];
const TRAPS=[['Heavy things sink, so a big ship must sink.',0,'A huge ship floats! Its shape pushes away lots of water. Check an old idea before you lean on it.'],
 ['A bat’s wing has finger bones, like my hand.',1,'This link helps: the bones really match.'],
 ['Plants get food from soil, like I eat dinner.',0,'Plants make food in their leaves from light, air and water. The dinner idea misleads.'],
 ['Times tables are adding the same number again.',1,'This link helps: 3 × 4 is 4 + 4 + 4.'],
 ['Times always makes a number bigger, like 3 × 4 = 12.',0,'Not always! 5 × 1 = 5 and 5 × 0 = 0. The old pattern misleads here.']];
VIS.reg('flaglink',c=>{let A,ctl,qz,qn=-1,tk=0,row=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},p:0,lines:[],f:0,web:[],r:0,t:0,red:'',drag:null}),S=B0();
const stage=()=>['match','alike','web','because','trap','quiz'][A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.12)),Q=()=>A.reduced();
const voice=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function wrap(g,t,x,y,w,n,al){g.font=`700 ${sz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;const ws=t.split(' '),ls=[];let l='';
 ws.forEach(o=>{const tr=l?l+' '+o:o;if(g.measureText(tr).width>w&&l){ls.push(l);l=o}else l=tr});ls.push(l);const lh=sz(n)*1.2;ls.forEach((s,i)=>g.fillText(s,x,y+(i-(ls.length-1)/2)*lh));return ls.length*lh}
function card(g,r,col,t,n){const C=A.col;g.fillStyle=A.alpha(col,.32);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();wrap(g,t,r.x+r.w/2,r.y+r.h/2,r.w-12,n||12)}
const inR=(p,r)=>p&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function cols(){const W=A.W,H=A.H,w=W*.42,h=(H-sz(40))/4-8;return{L:PAIRS.map((_,i)=>({x:8,y:sz(32)+i*(h+8),w,h})),R:OLD_ORDER.map((_,j)=>({x:W-w-8,y:sz(32)+j*(h+8),w,h}))}}
const bins=()=>{const w=A.W*.44,h=A.H*.22;return[{x:8,y:A.H-h-8,w,h},{x:A.W-w-8,y:A.H-h-8,w,h}]};
function nodes(){const W=A.W,H=A.H,cx=W/2,cy=H*.5,rx=W*.33,ry=H*.36;return WEB.map((_,i)=>{const a=-Math.PI/2+i*Math.PI/3,w=W*.3,h=H*.16;return{x:cx+Math.cos(a)*rx-w/2,y:cy+Math.sin(a)*ry-h/2,w,h}})}
function opts(){const W=A.W,H=A.H,h=(H*.62)/3-8;return[0,1,2].map(i=>({x:10,y:H*.34+i*(h+8),w:W-20,h}))}
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){wrap(g,'New idea + something I know = a link that sticks.',W/2,H*.4,W*.8,17);wrap(g,'Check the link works the same way.',W/2,H*.62,W*.8,14);return}
 if(v==='match'){const k=cols();wrap(g,'New idea',k.L[0].x+k.L[0].w/2,sz(14),W*.4,12);wrap(g,'Something I know',k.R[0].x+k.R[0].w/2,sz(14),W*.4,12);
  S.lines.forEach(i=>{const a=k.L[i],b=k.R[OLD_ORDER.indexOf(i)];g.strokeStyle=C.gr;g.lineWidth=4;g.beginPath();g.moveTo(a.x+a.w,a.y+a.h/2);g.lineTo(b.x,b.y+b.h/2);g.stroke()});
  if(S.drag&&S.drag.x!=null){const a=k.L[S.drag.i];g.strokeStyle=C.ac;g.lineWidth=3;g.setLineDash([6,4]);g.beginPath();g.moveTo(a.x+a.w,a.y+a.h/2);g.lineTo(S.drag.x,S.drag.y);g.stroke();g.setLineDash([])}
  PAIRS.forEach(([n],i)=>card(g,k.L[i],S.lines.includes(i)?C.gr:i===S.p?C.or:C.mu,n,13));OLD_ORDER.forEach((i,j)=>card(g,k.R[j],S.lines.includes(i)?C.gr:S.red==='m'+i?C.rd:C.cy,PAIRS[i][1],11))}
 if(v==='alike'||v==='trap'){const bs=bins(),nm=v==='alike'?['🟰 Same as a pump','≠ Not like a pump']:['👍 Helps','⚠️ Misleads'],list=v==='alike'?ALIKE:TRAPS;
  bs.forEach((b,i)=>{g.fillStyle=A.alpha(i?C.pk:C.gr,.15);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.setLineDash([6,5]);g.strokeStyle=C.tx;g.lineWidth=2;A.paint.rrect(b.x,b.y,b.w,b.h,12);g.stroke();g.setLineDash([]);wrap(g,nm[i],b.x+b.w/2,b.y+b.h/2,b.w-10,13)});
  if(v==='alike')wrap(g,'❤️ heart  vs  🚰 pump',W/2,sz(14),W,14);
  if(S.f<list.length){const d=S.drag&&S.drag.x!=null?S.drag:{x:W/2,y:H*.4},r={x:d.x-W*.4,y:d.y-H*.12,w:W*.8,h:H*.24};card(g,r,S.red?C.rd:C.or,list[S.f][0],14)}
  wrap(g,`Sorted ${S.f} of ${list.length}`,W/2,H-bins()[0].h-sz(18),W,12)}
 if(v==='web'){const ns=nodes(),cx=W/2,cy=H*.5;S.web.forEach(i=>{const n=ns[i];g.strokeStyle=C.gr;g.lineWidth=4;g.beginPath();g.moveTo(cx,cy);g.lineTo(n.x+n.w/2,n.y+n.h/2);g.stroke()});
  card(g,{x:cx-W*.14,y:cy-H*.07,w:W*.28,h:H*.14},C.vi,'🧲 New: magnets',14);WEB.forEach(([t],i)=>card(g,ns[i],S.web.includes(i)?C.gr:S.red==='w'+i?C.rd:C.cy,t,10));
  wrap(g,`Useful links: ${S.web.length} of 4`,W/2,H-sz(8),W,12)}
 if(v==='because'&&S.r<ROUNDS.length){const[fact,os]=ROUNDS[S.r];card(g,{x:10,y:sz(26),w:W-20,h:H*.24},C.vi,'New: '+fact,14);wrap(g,`Round ${S.r+1} of 3: which link explains it best?`,W/2,sz(12),W,11);
  const ord=rot(os);opts().forEach((r,i)=>card(g,r,S.red==='b'+i?C.rd:C.cy,ord[i][0],12))}
 if(v==='because'&&S.r>=ROUNDS.length)wrap(g,'Good links match how it works, not how it looks.',W/2,H/2,W*.8,16);
 A.fx.draw(g)}
const rot=os=>{const k=S.r%3;return os.slice(k).concat(os.slice(0,k))};
const wrong=(t,tag)=>{A.sound.miss();S.red=tag||'x';voice(t);setTimeout(()=>{S.red='';A.redraw()},Q()?10:700);pads();A.redraw()};
const right=t=>{A.sound.pop();S.red='';voice(t);pads();A.redraw();S.want()};
function link(i,j){if(stage()!=='match'||S.lines.length>=4)return;S.drag=null;if(S.lines.includes(i))return voice('That new idea is linked already.');
 if(i!==j)return wrong(`${PAIRS[i][0]} and ${PAIRS[j][1]} do not work the same way. Ask: what does it do, and what else I know does that?`,'m'+j);
 S.lines.push(i);S.p=[0,1,2,3].find(k=>!S.lines.includes(k));const t=`${PAIRS[i][0]} is like ${PAIRS[i][1]}.`;if(S.lines.length<4){A.sound.tick();voice(t);pads();return A.redraw()}right(t+' All four linked!')}
function sortIt(bin){const v=stage(),list=v==='alike'?ALIKE:TRAPS;if((v!=='alike'&&v!=='trap')||S.f>=list.length)return;S.drag=null;const it=list[S.f],ok=(bin===0)===!!it[1];
 const say2=v==='alike'?(it[1]?`Yes: a heart and a pump both do this. "${it[0]}."`:`A pump does not do this: "${it[0]}." The link is not perfect.`):it[2];
 if(!ok)return wrong(v==='alike'?(it[1]?`A pump does this too: "${it[0]}". That is how they are alike.`:`Think again: does a pump do this? "${it[0]}". A heart is alive; a pump is a machine.`):(it[1]?`This link really works. Check it: ${it[2]}`:'Check it against what you see. '+it[2]));
 S.f++;if(S.f<list.length){A.sound.tick();voice(say2);pads();return A.redraw()}right(say2+' All sorted!')}
function tie(i){if(stage()!=='web'||S.web.length>=4)return;if(S.web.includes(i))return voice('Linked already.');
 if(!WEB[i][1])return wrong(`"${WEB[i][0]}" is true, but it does not help you understand magnets.`,'w'+i);S.web.push(i);const t=`"${WEB[i][0]}" links to magnets.`;if(S.web.length<4){A.sound.tick();voice(t);pads();return A.redraw()}right(t+' Four useful links!')}
function choose(i){if(stage()!=='because'||S.r>=ROUNDS.length)return;const tag=rot(ROUNDS[S.r][1])[i][1];
 if(tag==='look')return wrong('That only matches how it looks. A good link matches how it works.','b'+i);
 if(tag==='feel')return wrong('That is about what you like, not how it works. It will not help you explain it.','b'+i);
 S.r++;const t='Yes! That link explains how it works.';if(S.r<ROUNDS.length){A.sound.pop();voice(t);pads();A.redraw();S.want()}else right(t+' Three good links.')}
function pads(){if(!ctl)return;ctl.innerHTML='';const v=stage(),P=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='match'&&S.lines.length<4)OLD_ORDER.forEach(j=>P('Link to: '+PAIRS[j][1].split(':')[0],()=>link(S.p,j),`Link ${PAIRS[S.p][0]} to ${PAIRS[j][1]}`));
 if(v==='alike'&&S.f<ALIKE.length){P('🟰 Same',()=>sortIt(0),'A pump does this too');P('≠ Not like a pump',()=>sortIt(1),'A pump does not do this')}
 if(v==='trap'&&S.f<TRAPS.length){P('👍 Helps',()=>sortIt(0),'This link helps');P('⚠️ Misleads',()=>sortIt(1),'This link misleads')}
 if(v==='web'&&S.web.length<4)WEB.forEach(([t],i)=>{if(!S.web.includes(i))P(t,()=>tie(i),'Link to magnets: '+t)});
 if(v==='because'&&S.r<ROUNDS.length)rot(ROUNDS[S.r][1]).forEach(([t],i)=>P(String.fromCharCode(65+i)+': '+t,()=>choose(i)));A.redraw()}
function down(p){const v=stage();
 if(v==='match'){const k=cols(),i=k.L.findIndex(r=>inR(p,r));if(i>=0&&!S.lines.includes(i)){S.p=i;S.drag={i,x:null,y:null,x0:p.x,y0:p.y};pads();return true}const j=k.R.findIndex(r=>inR(p,r));if(j>=0)link(S.p,OLD_ORDER[j]);return false}
 if(v==='alike'||v==='trap'){if(Math.abs(p.x-A.W/2)<A.W*.4&&Math.abs(p.y-A.H*.4)<A.H*.12){S.drag={x:null,y:null,x0:p.x,y0:p.y};return true}return false}
 if(v==='web'){const i=nodes().findIndex(r=>inR(p,r));if(i>=0)tie(i);return false}
 if(v==='because'){const i=opts().findIndex(r=>inR(p,r));if(i>=0)choose(i);return false}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag,v=stage();if(!d)return;S.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<8;
 if(v==='match'){if(tap){voice(`${PAIRS[d.i][0]}: now tap or drag to the thing you know that works the same way.`);return A.redraw()}const j=cols().R.findIndex(r=>inR(p,r));if(j<0)return A.redraw();return link(d.i,OLD_ORDER[j])}
 if(tap){voice('Drag the card to a box, or use the buttons.');return A.redraw()}const b=bins().findIndex(r=>inR(p,r));if(b<0){voice('Drop it in a box.');return A.redraw()}sortIt(b)}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(fs){const k=++tk;fs.forEach((fn,j)=>setTimeout(()=>{if(k===tk)fn()},Q()?j*50+30:(j+1)*380))}
const fresh=()=>{tk++;Object.assign(S,B0())};
const steps=[
{h:'That’s like…',p:'Drag from a new idea to something you already know that works the same way. Or use the buttons.',
 predict:{q:'Which helps you remember a new idea best?',opts:['Reading it again and again','Linking it to something you know'],ans:1},task:'Link all 4 new ideas',
 show:()=>{steps[0].go();demo([0,1,2,3].map(i=>()=>link(i,i)))},go:()=>{fresh();voice('Link each new idea to something you know.');pads();S.want=fin(0,()=>S.lines.length>=4,'A link to something you know gives a new idea a place to stick.')}},
{h:'Alike, but not the same',p:'A heart is like a pump. But is it the same in every way? Sort each fact.',
 predict:{q:'Is a heart exactly like a water pump?',opts:['Yes, exactly the same','Alike in some ways, not in others'],ans:1},task:'Sort all 6 facts',
 show:()=>{steps[1].go();demo(ALIKE.map(a=>()=>sortIt(a[1]?0:1)))},go:()=>{fresh();voice('Does a pump do this too?');pads();S.want=fin(1,()=>S.f>=ALIKE.length,'Every link has limits. Say how it is alike and how it is not.')}},
{h:'Build a web',p:'Magnets are new. Tap the things you already know that link to magnets.',task:'Make 4 useful links',
 show:()=>{steps[2].go();demo(WEB.map((w,i)=>w[1]?()=>tie(i):null).filter(Boolean))},go:()=>{fresh();voice('What do you already know about magnets?');pads();S.want=fin(2,()=>S.web.length>=4,'The more useful links you make, the more ways you can find the idea again.')}},
{h:'Pick the best link',p:'Which link explains the new idea? Tap it or use the buttons.',
 predict:{q:'Which makes a better link?',opts:['It looks the same','It works the same way'],ans:1},task:'Pick the best link 3 times',
 show:()=>{steps[3].go();demo([0,1,2].map(r=>()=>choose(rot(ROUNDS[r][1]).findIndex(o=>o[1]==='ok'))))},go:()=>{fresh();voice('Which link explains it?');pads();S.want=fin(3,()=>S.r>=3,'Match how it works, not just how it looks.')}},
{h:'Helps or misleads?',p:'Old ideas can trick us too. Does each link help, or mislead?',task:'Sort all 5 links',
 show:()=>{steps[4].go();demo(TRAPS.map(t=>()=>sortIt(t[1]?0:1)))},go:()=>{fresh();voice('Does this old idea help?');pads();S.want=fin(4,()=>S.f>=TRAPS.length,'Check an old idea before you lean on it. Some help, some mislead.')}},
{h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['You learn that a bird’s bones are hollow. Which is the best link?',[['Like a straw: light but strong','ok'],['Like a bird toy, because it looks like a bird','look'],['Like my pet, because I love birds','feel']]],
 ['A heart is like a pump. What should you also say?',[['How a heart is not like a pump','ok'],['Nothing, they are the same','same'],['That pumps are boring','feel']]],
 ['You think “plants eat soil, like I eat dinner”. What should you do?',[['Check it: does it match what we know?','ok'],['Trust it, it is an old idea','trust'],['Forget the new idea','drop']]],
 ['Why do links help you remember?',[['The new idea joins things you already know','ok'],['Links make the page look nice','look'],['You only need to read it once','drop']]],
 ['Which link is a good one for 4 × 3?',[['Adding 3, four times','ok'],['A 4-leaf clover, because it has a 4','look'],['My birthday, because I am 4','feel']]]];
function slip(t){let m='Ask: does it work the same way?';
 if(t==='look')m='That only matches the look. A good link matches how it works.';
 if(t==='feel')m='Liking something is not a link to how it works.';
 if(t==='same')m='No link is perfect. Saying how they differ stops you being misled.';
 if(t==='trust')m='Old ideas can be wrong. Check them against what we know.';
 if(t==='drop')m='Keep the new idea and link it. One read is soon forgotten.';
 return m}
function pose(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;
 qz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=qz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>grade(t)});voice('Challenge: '+q);A.redraw()}
function grade(t){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Great linking.':'✗ '+slip(t)}${ok?` Streak: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{qz.hidden=A.step!==5;ctl.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pads()}});
A.start()})})();
