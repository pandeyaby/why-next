/* Flagship – how minibeasts move (ages 5–7; NC England Y1–2: compare animals and how they move). Match crawl, fly, slither
   or jump; tap the moving part; count legs; race a grasshopper, ant and snail; build a mover. Buttons repeat every move. */
(()=>{
 const MOVES=['crawl','fly','slither','jump'];
 const WHO=[['ant',0],['butterfly',1],['worm',2],['grasshopper',3],['bee',1],['slug',2]];
 const SLIP={worm:'A worm has no legs. It squeezes and stretches its body: it slithers.',slug:'A slug has no legs. It slithers along on slime.',
 butterfly:'A butterfly has big wings. It flies.',bee:'A bee has wings. It flies to flowers.',ant:'An ant has 6 legs and no wings. It crawls.',
 grasshopper:'Look at its long back legs. They push it up: it jumps.'};
 const CLUE=[['grasshopper','back','long back legs','jump'],['butterfly','wings','wings','fly'],['ant','legs','legs','crawl']];
 const PARTNAME={back:'long back legs',wings:'wings',legs:'legs',feelers:'feelers',head:'head'};
 const COUNT=[['ant',6],['spider',8],['worm',0]];
 const KIT=[['Wings','wings'],['Legs','legs'],['Long back legs','back']];
 const GOALS=[['fly','wings'],['jump','back'],['slither','none']];
 VIS.reg('flagmbmove',c=>{let A,keys,quiz;c.fig.classList.add('young');
 const K={run:0,parts:{},kit:{}};
 const part=()=>['match','clue','count','race','build','chal'][A.step];
 const fz=n=>Math.round(n*(A.narrow?1.05:1.2)),L3=[0,1,2];
 const INK='#172033',MUTE='#475569',EDGE='#64748b',WHITE='#ffffff',GOOD='#047857',BAD='#b91c1c',SOIL='#a16207',GRASS='#86efac',PICK='#dcfce7';
 function label(g,s,x,y,n,col,al){g.font=`800 ${fz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-14)}
 function rows(g,s,max,n){g.font=`800 ${fz(n)}px system-ui,sans-serif`;const out=[];let r='';s.split(' ').forEach(w=>{const t=r?r+' '+w:w;if(r&&g.measureText(t).width>max){out.push(r);r=w}else r=t});out.push(r);return out}
 function tile(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
 const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function strip(g){if(!K.note)return;const L=rows(g,(K.bad?'✗ ':'✓ ')+K.note,A.W-44,13),lh=fz(13)+6,h=L.length*lh+12,y=A.H-h-6;tile(g,{x:10,y,w:A.W-20,h},WHITE,K.bad?BAD:GOOD,3);L.forEach((l,i)=>label(g,l,A.W/2,y+6+lh*(i+.5),13,INK))}
 const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
 const nope=s=>{K.bad=true;K.note=s;A.sound.miss();speak(s);A.redraw()};
 const yes=s=>{K.bad=false;K.note=s;A.sound.pop()};
 // bug() draws one and returns its part positions
 function ln(g,a,b,col,w){g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke()}
 function blob(g,x,y,rx,ry,col){g.fillStyle=col;g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fill()}
 function bug(g,kind,x,y,s,o){o=o||{};const P={legs:[]},lw=Math.max(2,s*.07),mark=o.mark||[];
 const legsFrom=(hx,hy,tips,col)=>tips.forEach((t,i)=>{const tip=[x+s*t,y],knee=[(hx+tip[0])/2,hy-s*.25];g.strokeStyle=mark.includes(i)?GOOD:col;g.lineWidth=mark.includes(i)?lw*1.8:lw;g.beginPath();g.moveTo(hx,hy);g.lineTo(knee[0],knee[1]);g.lineTo(tip[0],tip[1]);g.stroke();P.legs.push(tip)});
 const feel=(hx,hy,col)=>{ln(g,[hx,hy],[hx+s*.35,hy-s*.5],col,lw);ln(g,[hx,hy],[hx+s*.15,hy-s*.6],col,lw);P.feelers=[hx+s*.3,hy-s*.5]};
 if(kind==='ant'){const c1='#7c2d12';legsFrom(x+s*.2,y-s*.45,[-.75,-.4,-.05,.3,.6,.95],c1);blob(g,x-s*.5,y-s*.5,s*.38,s*.28,c1);blob(g,x+s*.2,y-s*.48,s*.22,s*.18,c1);blob(g,x+s*.75,y-s*.55,s*.24,s*.22,c1);feel(x+s*.85,y-s*.7,c1);P.head=[x+s*.75,y-s*.55];P.body=[x-s*.5,y-s*.5]}
 if(kind==='spider'){const c1='#334155';legsFrom(x+s*.2,y-s*.5,[-1.1,-.8,-.5,-.2,.6,.9,1.2,1.5],c1);blob(g,x-s*.35,y-s*.55,s*.42,s*.36,c1);blob(g,x+s*.3,y-s*.5,s*.28,s*.24,c1);P.body=[x-s*.35,y-s*.55];P.head=[x+s*.3,y-s*.5]}
 if(kind==='worm'){const ph=o.ph||0;g.strokeStyle='#db2777';g.lineWidth=s*.32;g.lineCap='round';g.beginPath();for(let k=0;k<=20;k++){const u=k/20,px=x-s*1.1+u*s*2.2,py=y-s*.2-Math.sin(u*9+ph)*s*.14;k?g.lineTo(px,py):g.moveTo(px,py)}g.stroke();P.body=[x,y-s*.2];P.head=[x+s*1.1,y-s*.2]}
 if(kind==='slug'||kind==='snail'){const c1=kind==='slug'?'#92400e':'#a16207';blob(g,x,y-s*.2,s*1.0,s*.22,c1);ln(g,[x+s*.8,y-s*.3],[x+s*1.05,y-s*.75],c1,lw);ln(g,[x+s*.7,y-s*.3],[x+s*.8,y-s*.7],c1,lw);P.feelers=[x+s*1.0,y-s*.7];P.body=[x,y-s*.2];P.head=[x+s*.8,y-s*.3];
 if(kind==='snail'){blob(g,x-s*.15,y-s*.6,s*.5,s*.45,'#b45309');g.strokeStyle='#78350f';g.lineWidth=lw;g.beginPath();g.arc(x-s*.15,y-s*.6,s*.25,0,5);g.stroke()}}
 if(kind==='butterfly'||kind==='bee'||kind==='grasshopper'||kind==='kit'){
 const flap=Math.abs(Math.cos(o.ph||0)),kit=kind==='kit'?(o.kit||K.kit):null,col={butterfly:'#1e293b',bee:'#ca8a04',grasshopper:'#15803d',kit:'#7c3aed'}[kind];
 const six=kind==='bee'||kind==='butterfly'||(kit&&kit.legs),back=kind==='grasshopper'||(kit&&kit.back),wings=kind==='butterfly'||kind==='bee'||(kit&&kit.wings);
 if(six)legsFrom(x,y-s*.4,back?[-.15,.15,.45,.75]:[-.7,-.4,-.1,.2,.5,.8],col);
 if(back){g.strokeStyle=col;g.lineWidth=lw*1.6;g.beginPath();g.moveTo(x-s*.2,y-s*.45);g.lineTo(x-s*.55,y-s*1.0);g.lineTo(x-s*1.0,y);g.stroke();P.back=[x-s*.55,y-s*.9];if(!six)legsFrom(x,y-s*.4,[.2,.6],col)}
 if(wings){const wc=kind==='butterfly'?'#f97316':'rgba(148,163,184,.85)',ws=kind==='butterfly'?1:.55;blob(g,x-s*.1,y-s*(.6+.55*ws),s*.45*ws,s*.6*ws*(.4+.6*flap),wc);blob(g,x+s*.3,y-s*(.6+.45*ws),s*.35*ws,s*.5*ws*(.4+.6*flap),wc);P.wings=[x,y-s*(.6+.6*ws)]}
 blob(g,x,y-s*.45,s*(kind==='butterfly'?.55:.75),s*(kind==='butterfly'?.12:.24),col);
 if(kind==='bee')[-.3,0,.3].forEach(f=>{g.fillStyle='#111827';g.fillRect(x+s*f-s*.06,y-s*.66,s*.12,s*.42)});
 blob(g,x+s*.8,y-s*.5,s*.18,s*.18,col);feel(x+s*.9,y-s*.6,col);P.head=[x+s*.8,y-s*.5];P.body=[x-s*.2,y-s*.45]}
 return P}
 const ground=()=>A.H*.62;
 const padR=(i,n)=>{const w=(A.W-24-(n-1)*8)/n;return{x:12+i*(w+8),y:A.H*.665,w,h:A.H*.13}};
 function top(g,s,col){const r={x:12,y:A.H*.03,w:A.W-24,h:A.H*.15};tile(g,r,'#fef3c7','#b45309',2.5);const L=rows(g,s,r.w-20,15);L.forEach((l,i)=>label(g,l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*fz(19),15,col||INK))}
 function field(g){g.fillStyle='#e0f2fe';g.fillRect(12,A.H*.2,A.W-24,ground()-A.H*.2);g.fillStyle=GRASS;g.fillRect(12,ground()-4,A.W-24,8);g.fillStyle='#fde68a';g.fillRect(12,ground()+4,A.W-24,A.H*.02)}
 const sz=()=>Math.min(A.W*.14,(ground()-A.H*.22)*.45);
 function mover(g,kind,how,t){const s=sz(),x=A.W*.14+t*A.W*.68;let y=ground();
 if(how==='fly')y-=s*1.4+Math.sin(t*14)*s*.25;if(how==='jump')y-=Math.abs(Math.sin(t*Math.PI*3))*s*1.5;
 return bug(g,kind,x,y,s,{ph:t*30,kit:K.mv&&K.mv.kit})}
 function scene(g){const v=part();
 if(v==='match'){const w=WHO[K.wi];top(g,w?`How does the ${w[0]} move?`:'All 6 minibeasts on the move!',w?INK:GOOD);field(g);
 if(K.mv)mover(g,K.mv.kind,K.mv.how,K.mv.t);else if(w)bug(g,w[0],A.W*.3,ground(),sz());
 MOVES.forEach((m,i)=>{const r=padR(i,4);tile(g,r,WHITE,EDGE,2.5);label(g,m,r.x+r.w/2,r.y+r.h/2,15,INK)})}
 if(v==='clue'){const q=CLUE[K.ci];top(g,q?`Tap the part that helps the ${q[0]} move.`:'Body parts do the moving!',q?INK:GOOD);field(g);if(q)K.parts=bug(g,q[0],A.W*.5,ground(),sz()*1.7,{})}
 if(v==='count'){const q=COUNT[K.li];top(g,q?`Count the ${q[0]}'s legs. Tap each leg.`:'Ant 6, spider 8, worm 0.',q?INK:GOOD);field(g);if(q){K.parts=bug(g,q[0],A.W*.5,ground(),sz()*1.7,{mark:K.tapped});label(g,`Legs counted: ${K.tapped.length}`,A.W/2,A.H*.73,16,INK)}}
 if(v==='race'){top(g,K.raced?(K.order.length<3?'Tap them: 1st, 2nd, 3rd.':'Grasshopper, ant, snail!'):'Press Go to race to the leaf.',K.order.length>=3?GOOD:INK);field(g);
 g.fillStyle='#16a34a';g.beginPath();g.ellipse(A.W*.88,ground()-sz()*1.2,sz()*.5,sz()*1.1,.3,0,7);g.fill();
 const s=sz()*.7,lane=k=>A.H*.3+k*(ground()-A.H*.3)/3+s*.9,dist=[1,.62,.08];['grasshopper','ant','snail'].forEach((n,k)=>{const t=Math.min(1,K.rt*dist[k]),x=A.W*.2+t*A.W*.56,hop=n==='grasshopper'?Math.abs(Math.sin(t*Math.PI*4))*s*.9:0;
 ln(g,[A.W*.06,lane(k)+2],[A.W*.82,lane(k)+2],'#cbd5e1',2);bug(g,n,x,lane(k)-hop,s,{});const at=K.order.indexOf(k);if(at>=0)label(g,['1st','2nd','3rd'][at],A.W*.03,lane(k)-s*.4,12,GOOD,'left')})}
 if(v==='build'){const q=GOALS[K.gi];top(g,q?`Build a minibeast that can ${q[0]}. Then test it.`:'Wings fly. Back legs jump. No legs slither.',q?INK:GOOD);field(g);
 K.mv&&K.mv.kind==='kit'?mover(g,'kit',K.mv.how,K.mv.t):bug(g,'kit',A.W*.3,ground(),sz(),{});
 if(q)KIT.forEach(([t,k],i)=>{const r=padR(i,3),on=K.kit[k];tile(g,r,on?PICK:WHITE,on?GOOD:EDGE,on?3.5:2);rows(g,(on?'✓ ':'')+t,r.w-10,12).forEach((l,j,a)=>label(g,l,r.x+r.w/2,r.y+r.h/2+(j-(a.length-1)/2)*fz(15),12,INK))})}}
 function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
 if(part()==='chal'){top(g,'Legs, wings or no legs?');field(g);bug(g,'grasshopper',A.W*.5,ground(),sz())}else scene(g);strip(g);A.fx.draw(g)}
 function run(kind,how,after,kit){const o={kind,how,kit,t:0};K.mv=o;A.tween(o,{t:1},A.reduced()?1:900,'io',()=>{if(K.mv!==o)return;K.mv=null;after&&after();A.redraw()});(function tick(){if(K.mv===o){A.redraw();requestAnimationFrame(tick)}})()}
 function pickMove(i){const w=WHO[K.wi];if(!w)return;if(i!==w[1])return nope(SLIP[w[0]]);yes(`The ${w[0]} can ${MOVES[i]}!`);K.wi++;run(w[0],MOVES[i],update);update()}
 function tapPart(n){const q=CLUE[K.ci];if(!q||!n)return;if(n!==q[1])return nope(`That is its ${PARTNAME[n]||n}. ${n==='feelers'?'Feelers touch and smell. ':''}It does not make it ${q[3]}. Try again.`);
 yes(`Yes! Its ${q[2]} help the ${q[0]} ${q[3]}.`);K.ci++;update()}
 function tapLeg(i){const q=COUNT[K.li];if(!q)return;if(i<0){if(q[1])return nope(`Look again: the ${q[0]} has legs. Tap each one.`);yes('No legs! A worm slithers.');K.li++;K.tapped=[];return update()}
 if(K.tapped.includes(i))return;K.tapped.push(i);K.note='';if(K.tapped.length===q[1]){yes(q[1]===6?'6 legs: an ant is an insect.':'8 legs: a spider is not an insect.');K.li++;K.tapped=[]}update()}
 function race(){if(K.racing||K.raced)return;K.racing=true;const id=K.run,o={t:0};A.tween(o,{t:1},A.reduced()?1:1600,'io',()=>{if(id!==K.run)return;K.racing=false;K.raced=true;K.rt=1;yes('The grasshopper got there first!');update();K.auto&&K.auto()});
 (function tick(){if(K.racing&&id===K.run){K.rt=o.t;A.redraw();requestAnimationFrame(tick)}})()}
 function place(k){if(!K.raced||K.order.includes(k)||K.order.length>=3)return;const want=K.order.length;if(k!==want){if(k===2)return nope('The snail slides on slime. It is very slow, so it came last.');return nope('The ant crawled fast, but the grasshopper jumped further.')}
 K.order.push(k);yes(['Big jumps: 1st.','Fast legs: 2nd.','Slow slime: 3rd.'][k]);update()}
 const how=()=>K.kit.wings?'fly':K.kit.back?'jump':K.kit.legs?'crawl':'slither';
 function toggle(k){if(!GOALS[K.gi])return;K.kit[k]=K.kit[k]?0:1;K.note='';update()}
 function test(){const q=GOALS[K.gi];if(!q)return;const h=how(),kit={...K.kit};
 if(h!==q[0]){const m=h==='fly'?'It flew! Wings make it fly. Take the wings off.':h==='crawl'?'It crawled. Short legs walk. ':h==='jump'?'It jumped! Long back legs make it jump.':'It slithered: no legs at all.';
 return run('kit',h,()=>nope(m+(q[0]==='jump'?' Add long back legs.':q[0]==='fly'?' Add wings.':' Take all the legs off.')),kit)}
 yes(`It can ${q[0]}!`);run('kit',h,null,kit);K.gi++;K.kit={wings:0,legs:0,back:0};update()}
 function update(){const v=part();let s='';
 if(v==='match')s=WHO[K.wi]?`A ${WHO[K.wi][0]}. Does it crawl, fly, slither or jump?`:'All six matched.';
 else if(v==='clue')s=CLUE[K.ci]?`A ${CLUE[K.ci][0]}. Which part helps it move?`:'All three found.';
 else if(v==='count')s=COUNT[K.li]?`A ${COUNT[K.li][0]}. Legs counted: ${K.tapped.length}.`:'All three counted.';
 else if(v==='race')s=!K.raced?'Race to the leaf. Press Go.':`Placed ${K.order.length} of 3.`;
 else if(v==='build')s=GOALS[K.gi]?`Goal: ${GOALS[K.gi][0]}. Parts on: ${KIT.filter(k=>K.kit[k[1]]).map(k=>k[0]).join(', ')||'none'}.`:'All three built.';else s='Challenge.';
 speak((K.note?K.note+' ':'')+s);knobs();K.then()}
 function knobs(){if(!keys)return;keys.innerHTML='';const v=part(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);e.onclick=f};
 if(v==='match'&&WHO[K.wi])MOVES.forEach((m,i)=>b(m,()=>pickMove(i),`It can ${m}`));
 if(v==='clue'&&CLUE[K.ci])['back','wings','legs','feelers','head'].filter(n=>K.parts[n]).forEach(n=>b(PARTNAME[n],()=>tapPart(n),`Tap the ${PARTNAME[n]}`));
 if(v==='count'&&COUNT[K.li]){b('Count a leg',()=>{const q=K.parts.legs||[];const i=q.findIndex((_,j)=>!K.tapped.includes(j));if(i>=0)tapLeg(i);else nope('No legs left to count.')},'Count the next leg');b('No legs',()=>tapLeg(-1),'It has no legs')}
 if(v==='race'){if(!K.raced)b('Go',race,'Start the race');else if(K.order.length<3)['Grasshopper','Ant','Snail'].forEach((n,k)=>{if(!K.order.includes(k))b(n,()=>place(k),`${n} next`)})}
 if(v==='build'&&GOALS[K.gi]){KIT.forEach(([t,k])=>b(t,()=>toggle(k),`${K.kit[k]?'Remove':'Add'} ${t.toLowerCase()}`));b('Test',test,'Test my minibeast')}A.redraw()}
 function down(p){const v=part(),d=(a)=>a?Math.hypot(p.x-a[0],p.y-a[1]):1e9;
 if(v==='match'){const i=[0,1,2,3].find(i=>hit(p,padR(i,4)));if(i!=null)pickMove(i);return i!=null}
 if(v==='clue'){let best=null,bd=Math.max(sz()*.55,24);['back','wings','legs','feelers','head','body'].forEach(n=>{const pts=n==='legs'?(K.parts.legs||[]):[K.parts[n]];pts.forEach(a=>{if(d(a)<bd){bd=d(a);best=n}})});if(best)tapPart(best);return !!best}
 if(v==='count'){const L=K.parts.legs||[];let bi=-1,bd=Math.max(sz()*.4,22);L.forEach((a,i)=>{if(d(a)<bd){bd=d(a);bi=i}});if(bi>=0)tapLeg(bi);else if(d(K.parts.body)<sz()*1.4){if(COUNT[K.li]&&!COUNT[K.li][1])tapLeg(-1);else nope('That is its body. Tap each leg.')}return true}
 if(v==='race'){if(!K.raced){race();return true}const k=L3.find(k=>Math.abs(p.y-(A.H*.3+k*(ground()-A.H*.3)/3+sz()*.6))<(ground()-A.H*.3)/6);if(k!=null)place(k);return k!=null}
 if(v==='build'){const i=L3.find(i=>hit(p,padR(i,3)));if(i!=null){toggle(KIT[i][1]);return true}if(p.y<ground()&&p.y>A.H*.2){test();return true}}return false}
 const close=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const play=(fs,gap)=>{const id=++K.run;fs.forEach((f,k)=>setTimeout(()=>{if(id===K.run)f()},k*(A.reduced()?30:gap||450)))};
 const wipe=()=>{K.run++;Object.assign(K,{then:()=>{},wi:0,ci:0,li:0,tapped:[],raced:false,racing:false,rt:0,order:[],gi:0,kit:{wings:0,legs:0,back:0},mv:null,auto:null,note:'',bad:false})};
 const steps=[
 {h:'Ways to move',p:'Minibeasts move in different ways. Pick crawl, fly, slither or jump for each one.',
 predict:{q:'A worm has no legs. How does it move?',opts:['It slithers: squeeze and stretch','It cannot move','It walks on tiny legs'],ans:0},
 task:'Match 6 minibeasts',show:()=>{steps[0].go();play(WHO.map(w=>()=>pickMove(w[1])),300)},go:()=>{wipe();update();K.then=close(0,()=>K.wi>=WHO.length,'Ants crawl, butterflies and bees fly, worms and slugs slither, grasshoppers jump.')}},
 {h:'Body clues',p:'The body tells you how it moves. Tap the part that does the moving.',
 predict:{q:'Which part helps a grasshopper jump?',opts:['its long back legs','its feelers','its head'],ans:0},
 task:'Find 3 moving parts',show:()=>{steps[1].go();play(CLUE.map(q=>()=>tapPart(q[1])))},go:()=>{wipe();update();K.then=close(1,()=>K.ci>=CLUE.length,'Long back legs jump, wings fly and legs crawl.')}},
 {h:'Count the legs',p:'Tap each leg to count it. If there are no legs, tap No legs.',
 predict:{q:'How many legs does a spider have?',opts:['8','6','10'],ans:0},
 task:'Count 3 minibeasts',show:()=>{steps[2].go();play([...Array(6).keys()].map(i=>()=>tapLeg(i)).concat([...Array(8).keys()].map(i=>()=>tapLeg(i)),[()=>tapLeg(-1)]),150)},go:()=>{wipe();update();K.then=close(2,()=>K.li>=COUNT.length,'Insects like ants have 6 legs. Spiders have 8. Worms have none.')}},
 {h:'The big race',p:'A grasshopper, an ant and a snail race to the leaf. Press Go, then tap who came 1st, 2nd and 3rd.',
 predict:{q:'Who will get to the leaf first?',opts:['the grasshopper','the snail','the ant'],ans:0},
 task:'Race and place 3',show:()=>{steps[3].go();K.auto=()=>play(L3.map(k=>()=>place(k)),300);race()},go:()=>{wipe();update();K.then=close(3,()=>K.order.length>=3,'Big jumps win. The snail slides slowly on its slime.')}},
 {h:'Build a mover',p:'Add wings, legs or long back legs. Press Test to see how it moves.',
 task:'Build 3 movers',show:()=>{steps[4].go();const fs=[];GOALS.forEach(q=>{if(q[1]!=='none')fs.push(()=>toggle(q[1]));fs.push(test)});play(fs,450)},go:()=>{wipe();update();K.then=close(4,()=>K.gi>=GOALS.length,'Wings make it fly, long back legs make it jump, and no legs means it slithers.')}},
 {h:'Challenge',p:'',go:()=>{wipe();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>K.then()});
 // challenge: every wrong answer names its slip
 const Q=[['A worm has no legs. How does it move?','It slithers: it squeezes and stretches',[['It walks','walk'],['It flies','fly']]],
 ['Which part helps a grasshopper jump?','Its long back legs',[['Its feelers','feel'],['Its eyes','eyes']]],
 ['How many legs does an ant have?','6',[['8','eight'],['4','four']]],
 ['A spider has 8 legs. Is it an insect?','No: insects have 6 legs',[['Yes: all minibeasts are insects','all'],['Yes: it has legs','legs']]],
 ['Which minibeast flies?','A bee',[['A slug','slug'],['A worm','wormfly']]],
 ['Who would win a race, a snail or an ant?','The ant',[['The snail','snail'],['They would tie','tie']]]];
 function slip(tag){let m='Look at the body: legs, wings or no legs?';
 if(tag==='walk')m='Walking needs legs. A worm has none, so it squeezes and stretches: it slithers.';
 if(tag==='fly')m='Flying needs wings. A worm has no wings.';
 if(tag==='feel')m='Feelers touch and smell. The long back legs push it up into a jump.';
 if(tag==='eyes')m='Eyes see. The long back legs do the jumping.';
 if(tag==='eight')m='8 legs is a spider. An ant is an insect: 6 legs.';
 if(tag==='four')m='Count again: an ant has 3 legs on each side, so 6 legs.';
 if(tag==='all')m='Not all minibeasts are insects. Insects have 6 legs. A spider has 8.';
 if(tag==='legs')m='Legs are not enough. Insects have exactly 6 legs. A spider has 8.';
 if(tag==='slug')m='A slug has no wings. It slithers on slime.';
 if(tag==='wormfly')m='A worm has no wings. It slithers and digs.';
 if(tag==='snail')m='A snail slides very slowly on its slime. The ant crawls much faster.';
 if(tag==='tie')m='The ant runs on 6 legs. It is much faster than a sliding snail.';
 return m}
 let qn=-1,best=0;
 function ask(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>mark(tag,ans)});speak('Challenge: '+q);A.redraw()}
 function mark(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=quiz.querySelector('.fl-fb');
 if(ok){best++;A.win()}else{best=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+best+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;keys.hidden=A.step===5;knobs()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
 A.start()})})();
