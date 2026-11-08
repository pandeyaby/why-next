/* Flagship: Reading Food Web Diagrams (ages 8–9; NC Y4 Living things: construct and interpret a variety of food chains,
   identifying producers, predators and prey; NGSS 5-LS2-1). One meadow web: find every eater of the mouse, label
   producers, primary and secondary consumers, trace two chains to the hawk and spot shared species, remove frogs and
   then rabbits and follow the knock-on effects, and pass a dead hawk to the decomposers. Distinct from flagchain
   (one straight chain): here every animal has several links, so a change spreads through the web. */
(()=>{
// name, emoji, x, y (0..1)
const N={hawk:['hawk','🦅',.5,.1],snake:['snake','🐍',.24,.33],fox:['fox','🦊',.8,.33],frog:['frog','🐸',.12,.58],mouse:['mouse','🐁',.5,.56],rabbit:['rabbit','🐇',.86,.6],
 grasshopper:['grasshopper','🦗',.16,.8],grass:['grass','🌾',.4,.9],berries:['berries','🍓',.64,.9],fungi:['fungi','🍄',.9,.88]};
// food → eater
const E=[['grass','grasshopper'],['grass','rabbit'],['berries','mouse'],['grasshopper','frog'],['frog','snake'],['frog','hawk'],['mouse','snake'],['mouse','fox'],['mouse','hawk'],['rabbit','fox'],['snake','hawk']];
const LIVE=Object.keys(N).filter(k=>k!=='fungi'),eats=(a,b)=>E.some(e=>e[0]===a&&e[1]===b),foods=k=>E.filter(e=>e[1]===k).map(e=>e[0]),eaters=k=>E.filter(e=>e[0]===k).map(e=>e[1]);
const role=k=>!foods(k).length?'producer':foods(k).every(f=>!foods(f).length)?'primary consumer':'secondary consumer';
const ROLEQ=['grass','rabbit','frog','berries','mouse','hawk'];
VIS.reg('flagfoodweb',c=>{let A,keys,qa,turn=-1;const R={};
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const part=()=>['eaters','roles','chain','frog','rabbit','decomp','quiz'][A.step];
function ink(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-12)}
function start(o){for(const k in R)delete R[k];Object.assign(R,{found:{},ri:0,chain:[],chains:[],gone:null,hit:{},dead:false,fed:false,drag:null,dx:0,dy:0,msg:'',hook:()=>{}},o||{});A.redraw()}
const P=k=>[N[k][2]*A.W,N[k][3]*A.H*.9+A.H*.06],rad=()=>A.narrow?17:22;
function arrow(g,a,b,col,w,dash){const[x0,y0]=P(a),[x1,y1]=P(b),d=Math.hypot(x1-x0,y1-y0),r=rad()+3,ux=(x1-x0)/d,uy=(y1-y0)/d,sx=x0+ux*r,sy=y0+uy*r,ex=x1-ux*r,ey=y1-uy*r;
 g.strokeStyle=col;g.fillStyle=col;g.lineWidth=w;g.setLineDash(dash||[]);g.beginPath();g.moveTo(sx,sy);g.lineTo(ex,ey);g.stroke();g.setLineDash([]);g.beginPath();g.moveTo(ex,ey);g.lineTo(ex-ux*11-uy*6,ey-uy*11+ux*6);g.lineTo(ex-ux*11+uy*6,ey-uy*11-ux*6);g.closePath();g.fill()}
function node(g,k,ring){const C=A.col,[x,y]=P(k),r=rad(),out=R.gone===k;g.globalAlpha=out?.3:1;g.fillStyle=C.pn;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=ring||C.tx;g.lineWidth=ring?4:1.5;if(k==='fungi')g.setLineDash([4,4]);g.stroke();g.setLineDash([]);
 ink(N[k][1],x,y+1,r*1.05);ink(N[k][0],x,y+r+10,A.narrow?11:13,{w:600});if(out)ink('✕',x,y,r*1.6,{c:C.rd});g.globalAlpha=1}
function draw(A){const{ctx:g,W,H,col:C}=A,k=part();g.fillStyle=A.mix(C.pn,C.gr,C.dark?.04:.05);g.fillRect(0,0,W,H);
 if(k==='quiz'){ink('Read the food web',W/2,H*.42,A.narrow?17:20);ink('Answer below',W/2,H*.56,13,{c:C.mu,w:500});A.fx.draw(g);return}
 const inChain=(a,b)=>{for(const ch of[...R.chains,R.chain])for(let i=1;i<ch.length;i++)if(ch[i-1]===a&&ch[i]===b)return true;return false};
 E.forEach(([a,b])=>{const off=R.gone&&(a===R.gone||b===R.gone);let col=A.alpha(C.tx,off?.15:.5),w=2;
  if(k==='eaters'&&a==='mouse'&&R.found[b]){col=C.gr;w=4}if(k==='chain'&&inChain(a,b)){col=C.ac;w=4}if((k==='frog'||k==='rabbit')&&R.gone&&a!==R.gone&&b!==R.gone&&(R.hit[a]||R.hit[b])&&(a===R.gone||eats(R.gone,b)||eats(a,R.gone)||eats(b,R.gone)))col=C.am;arrow(g,a,b,col,w)});
 if(k==='decomp'){arrow(g,'hawk','fungi',R.dead?C.am:A.alpha(C.am,.35),2,[6,5]);if(R.fed)['grass','berries'].forEach(p=>arrow(g,'fungi',p,C.gr,3,[6,5]))}
 const ringOf=n=>{if(k==='eaters'&&R.found[n])return C.gr;if(k==='roles'&&ROLEQ[R.ri]===n)return C.ac;if(k==='chain'&&R.chain.includes(n))return C.ac;if((k==='frog'||k==='rabbit')&&R.hit[n])return C.am;return null};
 (k==='decomp'?Object.keys(N):LIVE).forEach(n=>node(g,n,ringOf(n)));
 if(k==='roles')ROLEQ.slice(0,R.ri).forEach(n=>{const[x,y]=P(n);ink(role(n)==='producer'?'P':role(n)==='primary consumer'?'1st':'2nd',x+rad(),y-rad(),12,{c:C.gr})});
 if(k==='decomp'&&!R.dead){const x=R.drag?R.dx:W*.5,y=R.drag?R.dy:H*.3;ink('💀🦅',x,y,A.narrow?18:22);ink('dead hawk',x,y+20,11,{c:C.mu,w:600})}
 const head={eaters:'Who eats the mouse?',roles:R.ri<ROLEQ.length?`What is the ${ROLEQ[R.ri]}?`:'Every living thing has a role ✓',chain:R.chain.length?R.chain.join(' → '):`Build a chain to the hawk (${R.chains.length} of 2)`,frog:R.gone?'No more frogs: who is affected?':'Tap the frog to take it away',rabbit:R.gone?'No rabbits: what does the fox eat now?':'Tap the rabbit to take it away',decomp:'Who breaks down the dead hawk?'}[k];
 ink(head,W/2,H*.03+6,A.narrow?14:17,{c:C.tx});if(R.msg)ink(R.msg,W/2,H*.985-6,A.narrow?11:13,{c:C.tx,w:600});A.fx.draw(g)}
// ---------- actions ----------
const nm=k=>N[k][0];
function say(m,good){R.msg=m;if(good)A.sound.pop();else if(good===false)A.sound.miss();voice(m);controls();A.redraw();R.hook()}
function tapEaters(k){if(k==='mouse')return say('That is the mouse. Find the animals its arrows point to.');
 if(eats('mouse',k)){R.found[k]=true;return say(`Yes: the arrow goes from the mouse to the ${nm(k)}, so the ${nm(k)} eats mice.`,true)}
 if(eats(k,'mouse'))return say(`That arrow points into the mouse: the mouse eats ${nm(k)}. Arrows point from food to eater.`,false);
 say(`No arrow joins the mouse to the ${nm(k)}.`,false)}
function answerRole(r){const k=ROLEQ[R.ri];if(!k)return;const right=role(k);
 if(r===right){R.ri++;return say(`${nm(k)}: ${right}.`,true)}
 say(r==='producer'?`The ${nm(k)} is an animal. Producers are plants that make food from sunlight.`:right==='producer'?`The ${nm(k)} is a plant: it makes its own food, so it is a producer.`:r==='primary consumer'?`The ${nm(k)} eats animals (${foods(k).map(nm).join(', ')}), so it is a secondary consumer.`:`The ${nm(k)} eats only plants, so it is a primary consumer, whatever its size.`,false)}
function tapChain(k){if(k==='fungi')return;const ch=R.chain;
 if(!ch.length){if(role(k)!=='producer')return say('A food chain starts with a producer: a plant.',false);ch.push(k);return say(`Start: ${nm(k)}. Follow an arrow up.`,true)}
 const last=ch[ch.length-1];if(!eats(last,k))return say(`No arrow from the ${nm(last)} to the ${nm(k)}: the ${nm(k)} does not eat it.`,false);ch.push(k);
 if(k!=='hawk')return say(`${ch.map(nm).join(' → ')}. Keep going to the hawk.`,true);
 const s=ch.join('>');if(R.chains.some(c2=>c2.join('>')===s)){R.chain=[];return say('You already built that chain. Try a different path.',false)}
 R.chains.push([...ch]);R.chain=[];if(R.chains.length<2)return say(`Chain 1 done. Build a different one.`,true);
 const shared=R.chains[0].filter(n=>R.chains[1].includes(n)&&n!=='hawk');say(`Two chains! They share: ${shared.map(nm).join(', ')||'only the hawk'}. Food chains overlap in a web.`,true)}
const EFFECT={frog:{snake:'loses frogs, so it eats more mice',hawk:'loses frogs, so it hunts more snakes and mice',grasshopper:'nothing eats it now, so there will be more'},rabbit:{mouse:'the fox eats more mice instead',grass:'eaten less, so it grows longer'}};
function tapGone(sp,k){if(!R.gone){if(k!==sp)return say(`Tap the ${sp} first.`,false);R.gone=sp;return say(`The ${sp}s are gone. ${sp==='frog'?'Tap every living thing that is affected.':'The fox has lost a food. Tap what it eats now.'}`,true)}
 if(k===sp)return;const e=EFFECT[sp][k];if(e){R.hit[k]=true;return say(`${nm(k)}: ${e}.`,true)}
 if(sp==='rabbit'&&k==='fox')return say('Yes, the fox lost the rabbits. Now tap what else it eats.');say(`The ${nm(k)} was not joined to the ${sp}s by an arrow, so it is not hit straight away.`,false)}
function feed(where){if(!R.dead){if(where!=='fungi')return say('Dead things are broken down by decomposers, not eaten by plants.',false);R.dead=true;return say('Fungi break the dead hawk down into nutrients. Where do the nutrients go?',true)}
 if(where==='grass'||where==='berries'){R.fed=true;return say('The nutrients go into the soil, and plant roots take them up. The web starts again.',true)}say('Nutrients go into the soil for plants.',false)}
function tap(k){({eaters:tapEaters,chain:tapChain,frog:x=>tapGone('frog',x),rabbit:x=>tapGone('rabbit',x),decomp:x=>feed(x)})[part()]?.(k)}
function controls(){if(!keys)return;keys.innerHTML='';const k=part();if(k==='quiz')return;const b=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':lab||t},keys,t).onclick=f};
 if(k==='roles'){if(R.ri<ROLEQ.length)['producer','primary consumer','secondary consumer'].forEach(r=>b(r,()=>answerRole(r),`The ${nm(ROLEQ[R.ri])} is a ${r}`));return}
 if(k==='decomp'){if(!R.dead)['fungi','grass'].forEach(n=>b(`dead hawk → ${n}`,()=>feed(n),`Give the dead hawk to the ${n}`));else if(!R.fed)['grass','berries','hawk'].forEach(n=>b(`nutrients → ${n}`,()=>feed(n)));return}
 LIVE.forEach(n=>b(`${N[n][1]} ${n}`,()=>tap(n),`Tap the ${n}`));if(k==='chain')b('Start again',()=>{R.chain=[];say('Chain cleared.')})}
// ---------- canvas: tap a living thing; drag the dead hawk ----------
const hitNode=p=>Object.keys(N).find(n=>{const[x,y]=P(n);return Math.hypot(p.x-x,p.y-y)<rad()+10});
function down(p){const k=part();if(k==='quiz'||k==='roles')return false;
 if(k==='decomp'&&!R.dead&&Math.hypot(p.x-A.W*.5,p.y-A.H*.3)<40){R.drag=true;R.dx=p.x;R.dy=p.y;return true}
 const n=hitNode(p);if(n){tap(n);return true}return false}
function move(p){if(R.drag){R.dx=p.x;R.dy=p.y;A.redraw()}}
function up(p){if(R.drag){R.drag=false;const n=p&&hitNode(p);if(n)feed(n);A.redraw()}}
const when=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function run(i,list){steps[i].go();list.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*380))}
const steps=[
{h:'Many arrows',p:'A food web joins many food chains. Each arrow points from the food to the eater. Tap every animal that eats the mouse.',
 predict:{q:'How many animals in this web eat the mouse?',opts:['1, the fox','3','none, mice eat berries'],ans:1},
 task:'Find every animal that eats the mouse',show:()=>run(0,[()=>tap('snake'),()=>tap('fox'),()=>tap('hawk')]),
 go:()=>{start();voice('A meadow food web. Tap the animals that eat the mouse.');controls();R.hook=when(0,()=>R.found.snake&&R.found.fox&&R.found.hawk,()=>'Snake, fox and hawk all eat mice. In a web, prey can have many predators.')}},
{h:'Producers and consumers',p:'Producers are plants: they make food from sunlight. Primary consumers eat plants. Secondary consumers eat other animals.',
 predict:{q:'The frog eats grasshoppers. The frog is a…',opts:['producer','primary consumer','secondary consumer'],ans:2},
 task:'Give each living thing its role',show:()=>run(1,ROLEQ.map(n=>()=>answerRole(role(n)))),
 go:()=>{start();voice('What is the grass? Choose a role.');controls();R.hook=when(1,()=>R.ri>=ROLEQ.length,()=>'Grass and berries are producers; rabbit and mouse eat plants; frog and hawk eat animals.')}},
{h:'Trace two chains',p:'Start at a producer and follow the arrows to the hawk. Tap each living thing in order. Then build a different chain.',
 predict:{q:'How many different food chains end at the hawk?',opts:['just one','more than one','none'],ans:1},
 task:'Build two different chains that end at the hawk',show:()=>run(2,['grass','grasshopper','frog','hawk','berries','mouse','hawk'].map(n=>()=>tap(n))),
 go:()=>{start();voice('Tap a producer to start a chain.');controls();R.hook=when(2,()=>R.chains.length>=2,()=>'There are four chains to the hawk here; webs are many chains joined.')}},
{h:'Take the frogs away',p:'Living things in a web depend on each other. Take the frogs away and follow the arrows in and out of the frog.',
 predict:{q:'With no frogs, the grasshoppers will…',opts:['go down too','go up: nothing eats them now','stay the same'],ans:1},
 task:'Remove the frog, then find all three living things it affects',show:()=>run(3,['frog','grasshopper','snake','hawk'].map(n=>()=>tap(n))),
 go:()=>{start();voice('Tap the frog to take it away.');controls();R.hook=when(3,()=>R.hit.snake&&R.hit.hawk&&R.hit.grasshopper,()=>'Its prey go up; its predators must eat more of their other foods.')}},
{h:'A web, not a chain',p:'In the chain grass → rabbit → fox, losing rabbits starves the fox. But in a web the fox has other food.',
 predict:{q:'If the rabbits vanish, the foxes will…',opts:['all die straight away','eat more mice instead','start eating grass'],ans:1},
 task:'Remove the rabbit, then find the fox’s other food and what grows',show:()=>run(4,['rabbit','mouse','grass'].map(n=>()=>tap(n))),
 go:()=>{start();voice('Tap the rabbit to take it away.');controls();R.hook=when(4,()=>R.hit.mouse&&R.hit.grass,()=>'The fox eats more mice, so mice fall too, and the grass grows longer.')}},
{h:'Decomposers',p:'When living things die, decomposers such as fungi break them down. The nutrients go into the soil for plants.',
 predict:{q:'Nothing eats the hawk. When it dies…',opts:['it stays there for ever','decomposers break it down','the grass eats it'],ans:1},
 task:'Drag the dead hawk to the decomposers, then send the nutrients on',show:()=>run(5,[()=>feed('fungi'),()=>feed('grass')]),
 go:()=>{start();voice('Drag the dead hawk to the fungi, or use the buttons.');controls();R.hook=when(5,()=>R.fed,()=>'Fungi recycle dead things into nutrients that plants take up.')}},
{h:'Challenge',p:'',go:()=>{start();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>R.hook()});
const QS=[
 ['In a food web, an arrow goes from the mouse to the snake. It means…',[['the snake eats the mouse','ok'],['the mouse eats the snake','arrow'],['the snake is a producer','prod']]],
 ['Rabbits eat only grass. A rabbit is a…',[['primary consumer','ok'],['producer','prod'],['secondary consumer','big']]],
 ['Only frogs eat grasshoppers. If all the frogs went, grasshoppers would…',[['increase','ok'],['decrease','same'],['not change','link']]],
 ['Foxes eat rabbits and mice. If rabbits vanished, foxes would…',[['eat more mice','ok'],['all die at once','chain'],['start eating grass','prod']]],
 ['What do decomposers such as fungi do?',[['break down dead things into nutrients','ok'],['make food from sunlight','prod'],['hunt the top predators','top']]],
 ['Every food chain in a web starts with…',[['a producer','ok'],['the top predator','top'],['the biggest animal','big']]]];
function why(t){let m='Follow the arrows: from food to eater, starting at a producer.';
 if(t==='arrow')m='Arrows point from the food to the eater, so mouse → snake means the snake eats the mouse.';
 if(t==='prod')m='Producers are plants that make food from sunlight. Animals, and foxes, do not.';
 if(t==='big')m='A role comes from what a living thing eats, not its size. Chains start with plants.';
 if(t==='same')m='With nothing eating them, more grasshoppers survive, so their numbers go up.';
 if(t==='link')m='In a web everything is linked: losing one species changes its prey and its predators.';
 if(t==='chain')m='In a web the fox has more than one food, so it eats more mice instead.';
 if(t==='top')m='Top predators are at the end of chains; decomposers break down dead things.';
 return m}
function next(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t)});voice('Challenge: '+Q[0]);A.redraw()}
function judge(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Right: follow the arrows from food to eater.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.7,tall:1.2,draw,onStep:A=>{qa.hidden=A.step!==6;keys.hidden=A.step===6;controls()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Food web controls'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});controls()}});
A.start()})})();
