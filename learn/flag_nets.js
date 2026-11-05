/* Flagship: nets of 3-D shapes (ages 8-11; NC Y5 "identify 3-D shapes, including cubes and other cuboids, from 2-D
   representations" and nets). Fold a cube net, reject false nets, build a cuboid net from matching rectangles, and
   match nets to solids. Every tap has a button twin. */
(()=>{
VIS.reg('flagnets',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['fold','reject','cuboid','match','sand','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
/* cells are unit squares in a grid; net = list of [c,r] */
function drawNet(cells,ox,oy,s,col,mark){const g=A.ctx,C=A.col;cells.forEach(([c,r],i)=>{const x=ox+c*s,y=oy+r*s;A.paint.rrect(x+1,y+1,s-2,s-2,6);g.fillStyle=A.alpha(col,.35);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
 if(mark&&mark.has(i)){g.fillStyle=C.gr;g.beginPath();g.arc(x+s/2,y+s/2,s*.18,0,7);g.fill()}})}
function drawRectNet(faces,ox,oy,u,col){const g=A.ctx,C=A.col;faces.forEach(f=>{const x=ox+f.c*u,y=oy+f.r*u,w=f.w*u,h=f.h*u;A.paint.rrect(x+1,y+1,w-2,h-2,6);g.fillStyle=A.alpha(f.on?C.gr:col,.35);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T(f.lab,x+w/2,y+h/2,A.narrow?11:13,{w:800})})}
const CUBE_OK=[[1,0],[0,1],[1,1],[2,1],[1,2],[1,3]]; // cross
const ROW6=[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0]];
const BLOCK23=[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]];
const ZIG=[[0,0],[1,0],[1,1],[2,1],[2,2],[3,2]];
function foldStep(){if(S.n>=6)return;S.n++;A.sound.tick();say(S.n===6?'All 6 faces folded: a cube.':`Folded ${S.n} of 6 faces.`);A.redraw();S.check()}
function pickReject(which){if(S.chosen.has(which))return;const ok=which!=='cross';if(!ok){A.sound.miss();say('The cross is a real cube net. Pick a false one.');return}
 S.chosen.add(which);A.sound.tick();say(which==='row'?'A straight row of 6 cannot fold into a cube.':'A 2-by-3 block makes faces overlap.');A.redraw();S.check()}
function placeFace(lab){const f=S.faces.find(x=>x.lab===lab&&!x.on);if(!f){A.sound.miss();say('That face is already placed, or it does not match.');return}
 /* place in predetermined slot order */
 const slots=S.slots.filter(s=>!s.used);const slot=slots.find(s=>s.lab===lab)||slots[0];if(!slot||slot.lab!==lab){A.sound.miss();say('Pick the face that matches the empty outline: '+((slots[0]||{}).lab||''));return}
 f.on=1;slot.used=1;A.sound.tick();say(lab+' face placed.');A.redraw();S.check()}
function pickMatch(netId,solid){const key=netId+'|'+solid;if(S.paired.has(netId))return;const ok=(netId==='cube'&&solid==='cube')||(netId==='cuboid'&&solid==='cuboid')||(netId==='tri'&&solid==='prism');
 if(!ok){A.sound.miss();say('That net does not make that solid. Count the faces and their shapes.');return}
 S.paired.add(netId);A.sound.tick();say('Matched '+netId+' net to '+solid+'.');A.redraw();S.check()}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.04:.3);g.fillRect(0,0,W,H);const k=kind(),s=Math.min(W,H)*.12;
 if(k==='chal'){T('A net folds into a solid: faces join edge to edge',W/2,H*.3,A.narrow?13:16);T('Cube = 6 squares (11 nets)   Cuboid = matching rectangles',W/2,H*.5,A.narrow?12:14);T('Row of 6 or 2×3 block: not a cube net',W/2,H*.68,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='fold'||k==='sand'){drawNet(S.zig?ZIG:CUBE_OK,W*.2,H*.12,s,C.ac,new Set([...Array(S.n).keys()]));T(`Folded faces: ${S.n} / 6`,W/2,H*.88,A.narrow?14:17,{w:800});A.fx.draw(g);return}
 if(k==='reject'){const ys=[H*.08,H*.36,H*.64];[['cross',CUBE_OK,C.gr],['row',ROW6,C.rd],['block',BLOCK23,C.or]].forEach(([id,cells,col],i)=>{T(id==='cross'?'Cross (real?)':id==='row'?'Row of 6':'2×3 block',W*.08,ys[i]+s*.4,13,{al:'left',c:C.mu});drawNet(cells,W*.32,ys[i],s*.7,S.chosen.has(id)?C.gr:col,null)});A.fx.draw(g);return}
 if(k==='cuboid'){drawRectNet(S.faces,W*.1,H*.2,Math.min(W,H)*.14,C.vi);T('Tap a face name to place it on the net',8,H-14,12,{al:'left',c:C.mu});A.fx.draw(g);return}
 if(k==='match'){const nets=[{id:'cube',cells:CUBE_OK,y:H*.08},{id:'cuboid',y:H*.38},{id:'tri',y:H*.68}];
  nets.forEach(n=>{T(n.id,W*.06,n.y+20,13,{al:'left',c:C.mu,w:800});if(n.cells)drawNet(n.cells,W*.22,n.y,s*.55,S.paired.has(n.id)?C.gr:C.ac,null);
   else if(n.id==='cuboid'){drawRectNet([{c:1,r:0,w:2,h:1,lab:'',on:S.paired.has('cuboid')},{c:0,r:1,w:1,h:1,lab:'',on:0},{c:1,r:1,w:2,h:1,lab:'',on:0},{c:3,r:1,w:1,h:1,lab:'',on:0},{c:1,r:2,w:2,h:1,lab:'',on:0}],W*.22,n.y,s*.4,C.vi)}
   else { /* triangle prism sketch */ const u=s*.45,x=W*.22,y=n.y;g.strokeStyle=C.tx;g.lineWidth=2;[[0,1],[1,0],[2,1],[0,1]].forEach((p,i,a)=>{if(!i)g.beginPath(),g.moveTo(x+p[0]*u,y+p[1]*u);else g.lineTo(x+p[0]*u,y+p[1]*u)});g.stroke();
    [[0,1],[0,2.2],[1,0],[1,1.2],[2,1],[2,2.2]].forEach((p,i)=>{if(i%2===0){g.beginPath();g.moveTo(x+p[0]*u,y+p[1]*u)}else {g.lineTo(x+p[0]*u,y+p[1]*u);g.stroke()}});if(S.paired.has('tri')){g.fillStyle=C.gr;g.beginPath();g.arc(x+u,y+u,8,0,7);g.fill()}}});
  T('Match: cube · cuboid · triangular prism',W/2,H*.96,12,{c:C.mu});A.fx.draw(g)}}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:0,chosen:new Set(),paired:new Set(),check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*240))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='fold'||k==='sand'){btn('Fold one face',foldStep,'Fold the next face of the cube net');return}
 if(k==='reject'){btn('Reject row of 6',()=>pickReject('row'));btn('Reject 2×3 block',()=>pickReject('block'));btn('Keep the cross',()=>pickReject('cross'));return}
 if(k==='cuboid'){S.faces.filter(f=>!f.on).forEach(f=>btn('Place '+f.lab,()=>placeFace(f.lab)));return}
 if(k==='match'){[['cube','cube'],['cuboid','cuboid'],['tri','prism']].forEach(([n,s])=>btn(`Match ${n} → ${s}`,()=>pickMatch(n,s)));btn('Wrong: cube → prism',()=>pickMatch('cube','prism'))}}
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='fold'||k==='sand'){foldStep();return true}
 if(k==='reject'){const band=((p.y/A.H)*3)|0;pickReject(['cross','row','block'][Math.max(0,Math.min(2,band))]);return true}
 if(k==='cuboid'){const f=S.faces.find(f=>!f.on);if(f)placeFace(f.lab);return true}
 if(k==='match'){const band=((p.y/A.H)*3)|0;const ids=['cube','cuboid','tri'],solids=['cube','cuboid','prism'];pickMatch(ids[band]||'cube',solids[band]||'cube');return true}
 return false}
const steps=[
{h:'Fold a cube net',p:'A cube has 6 square faces. This cross is one of the 11 cube nets. Fold each face up to build the cube.',
 predict:{q:'How many faces does a cube have?',opts:['6','4','8'],ans:0},
 task:'Fold all 6 faces of the cross net',show:()=>auto(0,Array(6).fill(foldStep)),
 go:()=>{reset({n:0});say('A cross of 6 squares. Fold one face at a time.');controls();S.check=finish(0,()=>S.n>=6,'Six squares fold into a cube.')}},
{h:'Reject false nets',p:'Not every pattern of 6 squares is a net. A straight row and a 2-by-3 block both fail when you fold them.',
 predict:{q:'Can a straight row of 6 squares fold into a cube?',opts:['No','Yes','Only if you tape them'],ans:0},
 task:'Reject the row of 6 and the 2×3 block',show:()=>auto(1,[()=>pickReject('row'),()=>pickReject('block')]),
 go:()=>{reset({chosen:new Set()});say('Three patterns. Keep the real net; reject the two false ones.');controls();S.check=finish(1,()=>S.chosen.has('row')&&S.chosen.has('block'),'Row of 6 and 2×3 block are not cube nets. The cross is.')}},
{h:'Build a cuboid net',p:'A cuboid needs matching rectangles: two fronts, two sides, two tops. Place each face on the net.',
 predict:{q:'A cuboid net uses…',opts:['rectangles that match its faces','6 equal squares always','only triangles'],ans:0},
 task:'Place front, side and top faces on the cuboid net',show:()=>auto(2,[()=>['front','side','top','side2','top2','front2'].forEach(placeFace)]),
 go:()=>{reset({faces:[
  {c:1,r:0,w:2,h:1,lab:'top',on:0},{c:0,r:1,w:1,h:1,lab:'side',on:0},{c:1,r:1,w:2,h:1,lab:'front',on:0},
  {c:3,r:1,w:1,h:1,lab:'side2',on:0},{c:1,r:2,w:2,h:1,lab:'top2',on:0},{c:1,r:3,w:2,h:1,lab:'front2',on:0}],
  slots:[{lab:'top'},{lab:'side'},{lab:'front'},{lab:'side2'},{lab:'top2'},{lab:'front2'}].map(s=>({...s,used:0}))});
  say('Place each named face onto its outline.');controls();S.check=finish(2,()=>S.faces.every(f=>f.on),'Matching rectangles make a cuboid net.')}},
{h:'Match net to solid',p:'Match each net to the solid it folds into: cube, cuboid, or triangular prism.',
 predict:{q:'A net with 2 triangles and 3 rectangles folds into a…',opts:['triangular prism','cube','sphere'],ans:0},
 task:'Match all three nets to the right solids',show:()=>auto(3,[()=>pickMatch('cube','cube'),()=>pickMatch('cuboid','cuboid'),()=>pickMatch('tri','prism')]),
 go:()=>{reset({paired:new Set()});say('Three nets. Match each to cube, cuboid or triangular prism.');controls();S.check=finish(3,()=>S.paired.size===3,'Cube, cuboid and triangular-prism nets matched.')}},
{h:'Sandbox: test a zigzag',p:'Free play. Fold a zigzag cube net of 6 squares, one face at a time, to check it works.',
 predict:{q:'Do some zigzags of 6 squares fold into a cube?',opts:['Yes, some do','No, never','Only with 7 squares'],ans:0},
 task:'Fold all 6 faces of the zigzag net',show:()=>auto(4,Array(6).fill(foldStep)),
 go:()=>{reset({n:0,zig:1});say('A zigzag of 6 squares. Fold each face.');controls();S.check=finish(4,()=>S.n>=6,'This zigzag is one of the 11 cube nets.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['How many faces on a cube?',[['6','ok'],['4','four'],['8','eight']]],
 ['Is a 2×3 block of squares a cube net?',[['No','ok'],['Yes','yes'],['Only sideways','yes']]],
 ['A cube has how many distinct nets?',[['11','ok'],['1','one'],['6','six']]],
 ['Tabs on a cardboard net are…',[['for gluing, not faces','ok'],['extra faces','face'],['to count volume','vol']]],
 ['A cylinder net is roughly…',[['a rectangle plus two circles','ok'],['6 squares','six'],['4 triangles','tri']]],
 ['Lee draws 7 squares and calls it a cube net. Right?',[['No, a cube has 6 faces','ok'],['Yes','yes'],['Yes if one is a tab counted as a face','face']]],
 ['What must match on a cuboid net?',[['face sizes (edge lengths)','ok'],['colours only','col'],['only the number 6','six']]]];
function why(t){let m='Count faces, check shapes, and ask whether folding would overlap.';
 if(t==='four'||t==='eight')m='A cube has 6 faces — think of a dice.';
 if(t==='yes')m='A 2×3 block overlaps when folded. It is not a cube net.';
 if(t==='one'||t==='six')m='There are 11 distinct cube nets, not just one or six.';
 if(t==='face')m='Tabs are flaps for glue. They are not faces of the solid.';
 if(t==='vol')m='Nets show faces for surface, not volume.';
 if(t==='tri')m='A cylinder unwraps to a rectangle with a circle at each end.';
 if(t==='col')m='Colours do not matter; matching edge lengths do.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.55,tall:.95,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Nets controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p)});controls()}});
A.start()})})();
