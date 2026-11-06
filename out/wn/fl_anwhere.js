/* Flagship: Animals Everywhere (ages 5–7).
   Place animals on land / in water / in the air; show every continent has animals (even Antarctica);
   match habitat (forest, ocean, desert, ice); reject “only near me / only in zoos”; then challenge.
   Distinct from wild/farm/pet care (flagfarm) and animal homes/habitats detail (flaghome). */
(()=>{
VIS.reg('flaganwhere',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['place','continent','habitat','suit','myth','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function zone(g,x,y,w,h,label,on,col){g.fillStyle=on?A.alpha(col||A.col.ac,.35):A.alpha(A.col.tx,.07);g.fillRect(x,y,w,h);g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);T(label,x+w/2,y+h*.5,A.narrow?11:13)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Animals live everywhere',W/2,H*.3,A.narrow?14:17,{w:900});T('Land · water · air · every continent',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='place'){T('Where does the '+(S.cur||'fish')+' live?',W/2,H*.09,A.narrow?13:15,{w:800});
  zone(g,W*.04,H*.28,W*.29,H*.36,'Land 🌳',S.bin==='land',C.gr);zone(g,W*.355,H*.28,W*.29,H*.36,'Water 🌊',S.bin==='water',C.cy);zone(g,W*.67,H*.28,W*.29,H*.36,'Air ☁️',S.bin==='air',C.am);
  T(S.emoji||'🐟',W/2,H*.18,28);T(S.bin?('Placed: '+S.bin):'Tap a place',W/2,H*.86,A.narrow?13:15,{c:C.mu})}
 if(k==='continent'){T('Does icy Antarctica have animals?',W/2,H*.1,A.narrow?13:15,{w:800});
  T('🐧',W/2,H*.38,42);T(S.picked==null?'Yes — penguins live on the ice':'Picked '+['yes, penguins live there','no, it is empty of animals'][S.picked],W/2,H*.72,A.narrow?12:14,{c:C.mu,max:W*.92})}
 if(k==='habitat'){T('Match '+(S.cur||'camel')+' to its place',W/2,H*.09,A.narrow?13:15,{w:800});
  zone(g,W*.04,H*.26,W*.22,H*.4,'Forest',S.bin==='forest',C.gr);zone(g,W*.275,H*.26,W*.22,H*.4,'Ocean',S.bin==='ocean',C.cy);zone(g,W*.51,H*.26,W*.22,H*.4,'Desert',S.bin==='desert',C.am);zone(g,W*.745,H*.26,W*.22,H*.4,'Ice',S.bin==='ice',C.vi);
  T(S.emoji||'🐪',W/2,H*.16,26);T(S.bin?('Matched: '+S.bin):'Tap a habitat',W/2,H*.86,A.narrow?13:15,{c:C.mu})}
 if(k==='suit'){T('Polar bear in the desert?',W/2,H*.12,A.narrow?14:16,{w:800});
  T('🐻‍❄️  →  🏜️',W/2,H*.4,28);T(S.picked==null?'Good fit or wrong place?':'Picked '+['wrong place — too hot and dry','perfect desert home'][S.picked],W/2,H*.72,A.narrow?12:14,{c:C.mu,max:W*.92})}
 if(k==='myth'){T('Fix the mix-up',W/2,H*.12,A.narrow?15:18,{w:800});
  T('Animals only live near my house?',W/2,H*.4,A.narrow?13:15,{max:W*.9});
  T(S.picked==null?'True or false?':'Picked '+['false — they live worldwide','true — only near me'][S.picked],W/2,H*.7,A.narrow?12:14,{c:C.mu})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{cur:'fish',emoji:'🐟',need:'water',bin:null,picked:null,opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='place'){[['Land','land'],['Water','water'],['Air','air']].forEach(([lab,v])=>btn(lab,()=>{S.bin=v;const ok=S.bin===S.need;A.sound[ok?'tick':'miss']();say(ok?lab+' — good place':'Try another place');A.redraw();if(ok)S.check()},'Place on '+lab))}
 if(kind()==='continent'){btn('Yes — penguins live there',()=>{S.picked=0;A.sound.tick();say('Antarctica has animals like penguins');A.redraw();S.check()},'Yes penguins');btn('No — empty of animals',()=>{S.picked=1;A.sound.miss();say('Antarctica is icy but animals live there');A.redraw()},'No empty')}
 if(kind()==='habitat'){[['Forest','forest'],['Ocean','ocean'],['Desert','desert'],['Ice','ice']].forEach(([lab,v])=>btn(lab,()=>{S.bin=v;const ok=S.bin===S.need;A.sound[ok?'tick':'miss']();say(ok?S.cur+' → '+lab:'Not this habitat');A.redraw();if(ok)S.check()},'Match '+lab))}
 if(kind()==='suit'){btn('Wrong place — too hot and dry',()=>{S.picked=0;A.sound.tick();say('Polar bears need cold ice, not desert');A.redraw();S.check()},'Wrong place');btn('Perfect desert home',()=>{S.picked=1;A.sound.miss();say('Desert is not suited to polar bears');A.redraw()},'Perfect — wrong')}
 if(kind()==='myth'){btn('False — they live worldwide',()=>{S.picked=0;A.sound.tick();say('Animals live on every continent');A.redraw();S.check()},'False worldwide');btn('True — only near me',()=>{S.picked=1;A.sound.miss();say('Animals live far beyond one house');A.redraw()},'True only near')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='place'){S.bin=p.x<A.W/3?'land':p.x<2*A.W/3?'water':'air';const ok=S.bin===S.need;A.sound[ok?'tick':'miss']();A.redraw();if(ok)S.check();return true}
 if(kind()==='habitat'){const i=Math.min(3,Math.floor(p.x/(A.W/4)));S.bin=['forest','ocean','desert','ice'][i];const ok=S.bin===S.need;A.sound[ok?'tick':'miss']();A.redraw();if(ok)S.check();return true}
 if(kind()==='continent'||kind()==='suit'||kind()==='myth'){S.picked=p.x<A.W/2?0:1;if(S.picked===0){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='idea'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Land, water or air?',p:'Animals live on land, in water and in the air. A fish belongs in water.',
 predict:{q:'A fish lives…',opts:['in water','only on dry land','only high in the clouds'],ans:0},
 task:'Place the fish in Water',show:()=>auto(0,[()=>{S.bin='water';A.redraw();S.check()}]),
 go:()=>{reset({cur:'fish',emoji:'🐟',need:'water',bin:null});say('Where does the fish live?');controls();S.check=finish(0,()=>S.bin==='water','Fish → water. Animals use land, water and air.')}},
{h:'Even Antarctica',p:'Every continent has animals — even icy Antarctica. Penguins live on the ice there.',
 predict:{q:'Antarctica…',opts:['has animals like penguins','has no animals at all','only has animals in zoos far away'],ans:0},
 task:'Choose yes — penguins live there',show:()=>auto(1,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Do animals live on Antarctica?');controls();S.check=finish(1,()=>S.picked===0,'Antarctica is icy and still home to animals.')}},
{h:'Match the habitat',p:'Animals suit the places they live. A camel belongs in the desert.',
 predict:{q:'A camel is suited to…',opts:['the hot, dry desert','deep ocean water only','icy Antarctica only'],ans:0},
 task:'Match camel to Desert',show:()=>auto(2,[()=>{S.bin='desert';A.redraw();S.check()}]),
 go:()=>{reset({cur:'camel',emoji:'🐪',need:'desert',bin:null});say('Match the camel.');controls();S.check=finish(2,()=>S.bin==='desert','Camel → desert. Habitats fit the animal.')}},
{h:'Wrong place',p:'A polar bear needs cold ice. The hot desert is the wrong place for it.',
 predict:{q:'Putting a polar bear in a desert is…',opts:['the wrong place — too hot and dry','a perfect desert home','needed because deserts are icy'],ans:0},
 task:'Pick wrong place — too hot and dry',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Polar bear in the desert?');controls();S.check=finish(3,()=>S.picked===0,'Animals are suited to their homes — not any place.')}},
{h:'Not only near you',p:'Animals live all over the world, not only near your house and not only in zoos.',
 predict:{q:'Animals live…',opts:['on land, water and air across the world','only on my street','only inside zoo cages'],ans:0},
 task:'Pick false — they live worldwide',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Only near your house?');controls();S.check=finish(4,()=>S.picked===0,'Animals live worldwide — every continent.')}},
{h:'True sentence',p:'Pick the sentence that matches animals living everywhere.',
 predict:{q:'Saying animals live only in zoos is…',opts:['a mistake — wild places worldwide have animals','always true','required'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Animals live on land, in water and in the air on every continent','Animals live only near my house','Antarctica has no animals at all'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Animals live everywhere — suited to land, water, air and each continent.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A fish lives…',[['in water','ok'],['only on dry land','land'],['only high in the clouds','cloud']]],
 ['Antarctica…',[['has animals like penguins','ok'],['has no animals at all','empty'],['only has animals in zoos far away','zoo']]],
 ['A camel is suited to…',[['the hot, dry desert','ok'],['deep ocean water only','ocean'],['icy Antarctica only','ice']]],
 ['A parrot that flies belongs in…',[['the air (and trees)','ok'],['deep underground only','under'],['icy ocean water only','icy']]],
 ['Polar bear in a desert is…',[['the wrong place — too hot and dry','ok'],['a perfect desert home','perfect'],['needed because deserts are icy','icydes']]],
 ['Animals live…',[['on land, water and air across the world','ok'],['only on my street','street'],['only inside zoo cages','cages']]],
 ['Why match animals to habitats?',[['each animal is suited to where it lives','ok'],['all animals need the same place','same'],['habitats do not matter','matter']]]];
function why(t){let m='Animals live on land, in water and in the air on every continent, each suited to its place.';
 if(t==='land'||t==='cloud'||t==='under'||t==='icy')m='Fish need water; birds use the air; match the place to the animal.';
 if(t==='empty'||t==='zoo'||t==='street'||t==='cages')m='Animals live worldwide — even icy Antarctica — not only near you or in zoos.';
 if(t==='ocean'||t==='ice'||t==='perfect'||t==='icydes')m='Camels suit deserts; polar bears need cold ice. Wrong places do not fit.';
 if(t==='same'||t==='matter')m='Habitats matter. Animals are suited to forests, oceans, deserts or ice.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Habitat controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
