/* Flagship: transparent, translucent & opaque (ages 6–7; KS1: light through materials).
   Shine a beam through clear (see clearly), frosted (blurry light), and card (blocked),
   sort materials into three classes, predict a new material, then challenge.
   Distinct from light sources/shadows of toys (flagshadow). */
(()=>{
VIS.reg('flagtto',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['clear','frost','block','sort','predict','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function beam(g,mode){const{W,H,col:C}=A;g.fillStyle=A.alpha(C.am,.85);g.beginPath();g.moveTo(W*.08,H*.45);g.lineTo(W*.08,H*.55);g.lineTo(W*.35,H*.62);g.lineTo(W*.35,H*.38);g.closePath();g.fill();
 g.fillStyle=A.alpha(C.tx,.15);g.fillRect(W*.35,H*.28,W*.12,H*.44);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.35,H*.28,W*.12,H*.44);
 if(mode==='clear'){g.fillStyle=A.alpha(C.am,.55);g.beginPath();g.moveTo(W*.47,H*.4);g.lineTo(W*.47,H*.6);g.lineTo(W*.85,H*.66);g.lineTo(W*.85,H*.34);g.closePath();g.fill();T('see star clearly',W*.72,H*.22,A.narrow?12:14);g.fillStyle=C.am;g.beginPath();star(g,W*.78,H*.5,10);g.fill()}
 if(mode==='frost'){g.fillStyle=A.alpha(C.am,.25);g.fillRect(W*.47,H*.34,W*.4,H*.32);T('blurry glow',W*.72,H*.22,A.narrow?12:14)}
 if(mode==='block'){g.fillStyle=A.alpha(C.tx,.55);g.fillRect(W*.47,H*.28,W*.12,H*.44);T('no light past',W*.72,H*.5,A.narrow?12:14)}}
function star(g,x,y,r){g.moveTo(x,y-r);for(let i=0;i<5;i++){g.lineTo(x+Math.sin((i*4/5)*Math.PI)*r*.4,y-Math.cos((i*4/5)*Math.PI)*r*.4);g.lineTo(x+Math.sin(((i+0.5)*4/5)*Math.PI)*r,y-Math.cos(((i+0.5)*4/5)*Math.PI)*r)}g.closePath()}
function bin(g,x,y,w,h,label,on){g.fillStyle=on?A.alpha(A.col.ac,.3):A.alpha(A.col.tx,.08);g.fillRect(x,y,w,h);g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);T(label,x+w/2,y+h/2,A.narrow?11:13,{max:w-6})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Light through materials',W/2,H*.32,A.narrow?14:17,{w:900});T('Clear / blurry / blocked',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='clear'){T('Transparent: see clearly',W/2,H*.08,A.narrow?14:17,{w:800});beam(g,'clear');T(S.done?'Transparent glass':'Shine through clear glass',W/2,H*.9,A.narrow?12:14,{c:C.mu})}
 if(k==='frost'){T('Translucent: blurry light',W/2,H*.08,A.narrow?13:16,{w:800});beam(g,'frost');T(S.done?'Translucent tissue':'Shine through frosted sheet',W/2,H*.9,A.narrow?12:14,{c:C.mu})}
 if(k==='block'){T('Opaque: light stopped',W/2,H*.08,A.narrow?14:17,{w:800});beam(g,'block');T(S.done?'Opaque card':'Shine at thick card',W/2,H*.9,A.narrow?12:14,{c:C.mu})}
 if(k==='sort'){T('Sort the materials',W/2,H*.08,A.narrow?15:18,{w:800});
  bin(g,W*.04,H*.22,W*.3,H*.2,'Transparent',S.bin==='tr');bin(g,W*.35,H*.22,W*.3,H*.2,'Translucent',S.bin==='tl');bin(g,W*.66,H*.22,W*.3,H*.2,'Opaque',S.bin==='op');
  T(`Item: ${S.item||'clear glass'}`,W/2,H*.55,A.narrow?14:16,{w:800});
  T(`${S.ok||0}/3 sorted`,W/2,H*.78,13,{c:C.mu});T(S.msg||'Pick the matching bin',W/2,H*.92,12,{c:C.mu})}
 if(k==='predict'){T('Predict for wood',W/2,H*.1,A.narrow?15:18,{w:800});
  ['Transparent — see clearly','Translucent — blurry glow','Opaque — blocks light'].forEach((t,i)=>{const y=H*(.32+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{done:0,bin:null,item:'clear glass',ok:0,sorted:{},msg:'',picked:null,opts:[],check:()=>{}},o||{});if(!S.sorted)S.sorted={}}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
const ITEMS=[['clear glass','tr'],['frosted tissue','tl'],['thick card','op']];
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='clear'||kind()==='frost'||kind()==='block'){btn('Shine the torch',()=>{S.done=1;A.sound.tick();say(kind()==='clear'?'See clearly — transparent':kind()==='frost'?'Blurry glow — translucent':'Blocked — opaque');A.redraw();S.check()},'Shine torch through material')}
 if(kind()==='sort'){btn('Transparent',()=>pickBin('tr'),'Bin transparent');btn('Translucent',()=>pickBin('tl'),'Bin translucent');btn('Opaque',()=>pickBin('op'),'Bin opaque')}
 if(kind()==='predict'||kind()==='idea')(S.opts||['Transparent — see clearly','Translucent — blurry glow','Opaque — blocks light']).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function pickBin(b){S.bin=b;const need=(ITEMS.find(x=>x[0]===S.item)||[])[1];
 if(b!==need){A.sound.miss();S.msg='Try another bin';A.redraw();return}
 S.sorted[S.item]=1;S.ok=Object.keys(S.sorted).length;A.sound.tick();S.msg='Correct: '+S.item;
 const next=ITEMS.find(x=>!S.sorted[x[0]]);S.item=next?next[0]:S.item;S.bin=null;A.redraw();S.check()}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='clear'||kind()==='frost'||kind()==='block'){S.done=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='sort'){const b=p.x<A.W*.33?'tr':p.x<A.W*.66?'tl':'op';pickBin(b);return true}
 if(kind()==='predict'||kind()==='idea'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Transparent',p:'Transparent materials let light through so you can see clearly on the other side — like clear glass.',
 predict:{q:'Transparent means…',opts:['you can see clearly through it','light is fully blocked','it is always metal'],ans:0},
 task:'Shine through clear glass',show:()=>auto(0,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({done:0});say('Shine through clear glass.');controls();S.check=finish(0,()=>S.done,'Clear glass is transparent — you see clearly.')}},
{h:'Translucent',p:'Translucent materials let some light through but the view is blurry — like frosted glass or tissue.',
 predict:{q:'Translucent means…',opts:['some light passes, but the view is blurry','you see every detail clearly','no light passes at all'],ans:0},
 task:'Shine through frosted tissue',show:()=>auto(1,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({done:0});say('Shine through frosted tissue.');controls();S.check=finish(1,()=>S.done,'Frosted tissue is translucent — blurry glow.')}},
{h:'Opaque',p:'Opaque materials block light. You cannot see through them — like thick card or wood.',
 predict:{q:'Opaque means…',opts:['light is blocked','you see clearly through it','it must be see-through plastic'],ans:0},
 task:'Shine at thick card',show:()=>auto(2,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({done:0});say('Shine at thick card.');controls();S.check=finish(2,()=>S.done,'Thick card is opaque — light stops.')}},
{h:'Sort materials',p:'Sort clear glass, frosted tissue and thick card into transparent, translucent and opaque.',
 predict:{q:'Thick card belongs in…',opts:['opaque','transparent','translucent'],ans:0},
 task:'Sort all three materials',show:()=>auto(3,[()=>{S.sorted={'clear glass':1,'frosted tissue':1,'thick card':1};S.ok=3;A.redraw();S.check()}]),
 go:()=>{reset({sorted:{},ok:0,item:'clear glass',msg:''});say('Sort each material.');controls();S.check=finish(3,()=>S.ok>=3,'All three materials sorted into the right light class.')}},
{h:'Predict wood',p:'Predict before you test: will wood let you see clearly, glow blurry, or block the beam?',
 predict:{q:'Wood is usually…',opts:['opaque','transparent','translucent like tissue'],ans:0},
 task:'Pick opaque for wood',show:()=>auto(4,[()=>{S.picked=2;A.redraw();S.check()}]),
 go:()=>{reset({picked:null,opts:['Transparent — see clearly','Translucent — blurry glow','Opaque — blocks light']});say('Predict for wood.');controls();S.check=finish(4,()=>S.picked===2,'Wood is opaque — it blocks the light beam.')}},
{h:'True sentence',p:'Pick the sentence that matches how light meets materials.',
 predict:{q:'Transparent, translucent and opaque describe…',opts:['how much light passes through a material','only the colour of shadows','how loud a material is'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Transparent sees clearly; translucent is blurry; opaque blocks light','Every material is transparent','Opaque means you can read through it'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Three classes: clear view, blurry glow, or blocked light.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Transparent means…',[['you can see clearly through it','ok'],['light is fully blocked','blocked'],['it is always metal','metal']]],
 ['Translucent means…',[['some light passes, but blurry','ok'],['perfect clear detail','clear'],['no light at all','none']]],
 ['Opaque means…',[['light is blocked','ok'],['you see every detail','detail'],['must be clear plastic','plastic']]],
 ['Clear glass is…',[['transparent','ok'],['opaque','op'],['only translucent','onlytl']]],
 ['Thick card is…',[['opaque','ok'],['transparent','tr'],['always translucent','alwaystl']]],
 ['Frosted tissue is…',[['translucent','ok'],['opaque wood','wood'],['perfectly transparent','perf']]],
 ['Why test with a torch?',[['to see if light passes, blurs or stops','ok'],['to make the material louder','loud'],['because colour never matters for light','nocolour']]]];
function why(t){let m='Transparent: see clearly. Translucent: blurry light. Opaque: light blocked.';
 if(t==='blocked'||t==='none'||t==='op'||t==='wood'||t==='metal')m='Opaque blocks light. Transparent is the clear view — not metal or card.';
 if(t==='clear'||t==='detail'||t==='plastic'||t==='tr'||t==='perf')m='Clear detail means transparent. Plastic can be clear, but opaque materials are not see-through.';
 if(t==='onlytl'||t==='alwaystl')m='Frosted tissue is translucent (blurry). Clear glass is transparent; card is opaque.';
 if(t==='loud'||t==='nocolour')m='A torch beam shows whether light passes clearly, blurs, or stops — that is the test.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Light through materials controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
