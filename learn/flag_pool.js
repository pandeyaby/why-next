/* Flagship – rock pool habitats (ages 5–7; NC England Y2 living things and habitats; NGSS 2-LS4-1): tide, find,
   who lives in salty water, hold on in a wave, stay wet at low tide, rock pool code. */
(()=>{
/* id: name, how to spot it */
const ANI={crab:['crab','A crab has two claws.'],anem:['sea anemone','An anemone is a red blob with soft arms.'],
 star:['starfish','A starfish has five arms and no tail.'],limp:['limpet','A limpet has a shell like a little hat.'],
 fish:['blenny','A blenny is a small fish.'],prawn:['prawn','A prawn has long feelers.'],
 barn:['barnacle','A barnacle is a tiny white cone.']};
const WHERE=[['crab',0,'Crabs hide in rock pools.'],['frog',1,'A frog needs fresh water, like a pond.'],
 ['limpet',0,'Limpets hold on to the rocks.'],['goldfish',1,'A goldfish needs fresh water, not salty sea water.'],
 ['sea anemone',0,'Anemones stick to the rocks.'],['prawn',0,'Prawns swim in the pool water.'],['starfish',0,'Starfish creep over the rocks.']];
/* wave: [animal, right, wrong, why]; dry zones: 0 hide, 1 shut, 2 fold */
const WAVE=[['limp','clamps down tight','swims away','A limpet cannot swim. It pulls its shell down hard on the rock.'],
 ['crab','hides under a rock','grips with a sticky foot','A crab has no sticky foot. It scuttles under a rock.'],
 ['anem','holds on with a sticky foot','runs under a rock','A sea anemone has no legs. Its sticky foot holds it to the rock.'],
 ['star','grips with tiny tube feet','swims up to the top','A starfish cannot swim. Tiny tube feet under its arms grip the rock.'],
 ['fish','darts into a crack','shuts its shell','A blenny has no shell. It darts into a crack.']];
const DRY=[['anem',2],['crab',0],['limp',1],['barn',1],['fish',0]];
const ZL=[['Hide under','wet seaweed'],['Shut','tight'],['Fold into','a blob']],ZONE=ZL.map(l=>l.join(' '));
const DRYWHY={anem:'An anemone has no shell and cannot run. It pulls its arms in and waits as a jelly blob.',
 crab:'A crab walks off and hides under wet seaweed.',fish:'A blenny wriggles under wet seaweed.',
 limp:'A limpet clamps its shell down, with water inside.',barn:'A barnacle shuts its little doors, with water inside.'};
const CODE=[['Go with a grown-up',0,'Rocks are slippery. A grown-up helps keep you safe.'],['Pull a limpet off the rock',1,'Pulling a limpet off can hurt it. Look, do not pull.'],
 ['Put a rock back the way it was',0,'Animals live under it. Put it back gently.'],['Take a crab home in a bucket',1,'A crab needs its rock pool. Look, then put it back.'],
 ['Check when the tide comes in',0,'Then the sea cannot cut you off.'],['Stay on the rocks as the sea comes in',1,'The sea can cut you off. Head back before the tide comes in.']];
VIS.reg('flagpool',c=>{let A,X,pad,box,qi=-1,run=0,drag=null;const S={};
const INK='#0f172a',CARD='#ffffff',EDGE='#475569',OK='#166534',BAD='#b91c1c',HOT='#1d4ed8';
const k=()=>['tide','find','who','wave','dry','code','quiz'][A.step],z=n=>Math.round(n*(A.narrow?1:1.12)),F=(n,w)=>`${w||800} ${z(n)}px system-ui,sans-serif`;
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(l){X.fillStyle=A.col.dark?'#0c1a2b':l;X.fillRect(0,0,A.W,A.H)}
function txt(t,x,y,n,col,w,mw){X.font=F(n,w);X.fillStyle=col||INK;X.textAlign='center';X.textBaseline='middle';X.fillText(t,x,y,mw||A.W-16)}
function card(r,t,o){o=o||{};X.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,o.rr||12);X.fill();X.lineWidth=o.ring?4:2;X.strokeStyle=o.ring||EDGE;X.stroke();if(!t)return;const n=o.n||18,x=r.x+r.w/2,y=r.y+r.h/2+1,q=t.split(' '),h=Math.ceil(q.length/2);X.font=F(n);
 if(X.measureText(t).width>r.w-12&&q.length>1){txt(q.slice(0,h).join(' '),x,y-z(n)*.55,n,o.ink,0,r.w-8);txt(q.slice(h).join(' '),x,y+z(n)*.6,n,o.ink,0,r.w-8)}else txt(t,x,y,n,o.ink,0,r.w-8)}
function banner(t,good){X.font=F(15);const w=Math.min(A.W-10,X.measureText(t).width+30),h=z(15)+16,y=A.H*.02;card({x:A.W/2-w/2,y,w,h},t,{n:15,rr:h/2,bg:good?'#dcfce7':CARD,ring:good?OK:null})}
/* shore, side view: rock with a hollow; sea at tide t (0 out, 1 in) fills the open air below its level */
const ROCK=[[0,.42],[.08,.4],[.12,.45],[.16,.6],[.22,.9],[.5,.95],[.78,.9],[.84,.6],[.88,.45],[.93,.5],[.96,.7],[.96,1],[0,1]];
function path(L){X.beginPath();L.forEach(([x,y])=>X.lineTo(A.W*x,A.H*y));X.closePath()}
function shore(t){const d=A.col.dark;bg('#e0f2fe');X.fillStyle=d?'#57534e':'#78716c';path(ROCK);X.fill();
 X.save();path(ROCK.slice(2,9));X.clip();X.fillStyle='#0e7490';X.fillRect(0,A.H*.52,A.W,A.H);X.restore();
 const top=A.H*(1-.72*t);X.save();X.beginPath();X.rect(0,0,A.W,A.H);ROCK.forEach(([x,y],i)=>X[i?'lineTo':'moveTo'](A.W*x,A.H*y));X.closePath();X.clip('evenodd');
 X.fillStyle='rgba(3,105,161,.85)';X.fillRect(0,top,A.W,A.H);X.restore();X.strokeStyle='#e0f2fe';X.lineWidth=3;X.beginPath();for(let x=0;x<=A.W;x+=12)X.lineTo(x,top+Math.sin(x/18)*4);X.stroke()}
const SPOT=[['star',.62,.86],['crab',.3,.84],['anem',.27,.64],['limp',.74,.66],['fish',.48,.72],['prawn',.45,.88]];
function pos(id){const s=SPOT.find(v=>v[0]===id);return{x:A.W*s[1],y:A.H*s[2]}}
const size=()=>Math.min(A.W*.07,A.H*.075);
/* flat-shape animals; shut = folded or clamped */
function ov(x,y,rx,ry,col){X.fillStyle=col;X.beginPath();X.ellipse(x,y,rx,ry,0,0,7);X.fill()}
function beast(id,x,y,s,shut){X.save();X.translate(x,y);X.lineWidth=2;
 if(id==='crab'){X.strokeStyle='#7c2d12';X.lineWidth=3;for(const sd of[-1,1])for(let i=0;i<3;i++){X.beginPath();X.moveTo(sd*s*.5,(i-1)*s*.3);X.lineTo(sd*s*1.05,(i-1)*s*.45+s*.2);X.stroke()}
  ov(0,0,s*.75,s*.5,'#ea580c');for(const sd of[-1,1]){ov(sd*s*.7,-s*.75,s*.28,s*.28,'#ea580c');ov(sd*s*.2,-s*.25,s*.08,s*.08,INK)}}
 if(id==='anem'){X.fillStyle='#be123c';if(!shut){X.strokeStyle='#fb7185';X.lineWidth=4;for(let i=0;i<9;i++){const a=Math.PI*(1.05+i*.1);X.beginPath();X.moveTo(0,-s*.2);X.quadraticCurveTo(Math.cos(a)*s*.6,-s*.6,Math.cos(a)*s*.9,Math.sin(a)*s*.9-s*.3);X.stroke()}}
  X.beginPath();X.ellipse(0,0,s*.6,shut?s*.45:s*.35,0,Math.PI,0);X.lineTo(s*.6,s*.25);X.lineTo(-s*.6,s*.25);X.fill()}
 if(id==='star'){X.fillStyle='#f97316';X.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?s*.35:s*.9;X.lineTo(Math.cos(a)*r,Math.sin(a)*r)}X.closePath();X.fill();X.strokeStyle='#9a3412';X.stroke()}
 if(id==='limp'){const h=shut?s*.4:s*.6;X.fillStyle='#a8a29e';X.beginPath();X.moveTo(-s*.75,s*.3);X.quadraticCurveTo(0,-h*1.6,s*.75,s*.3);X.closePath();X.fill();X.strokeStyle='#44403c';X.stroke()}
 if(id==='fish'){ov(0,0,s*.8,s*.35,'#a16207');X.beginPath();X.moveTo(s*.7,0);X.lineTo(s*1.15,-s*.35);X.lineTo(s*1.15,s*.35);X.fill();ov(-s*.45,-s*.08,s*.12,s*.12,'#fff');ov(-s*.45,-s*.08,s*.06,s*.06,INK)}
 if(id==='prawn'){X.strokeStyle='#be185d';X.lineWidth=s*.28;X.lineCap='round';X.beginPath();X.arc(0,0,s*.5,Math.PI*.9,Math.PI*2.1);X.stroke();X.lineWidth=1.5;X.beginPath();X.moveTo(s*.5,-s*.05);X.lineTo(s*1.2,-s*.7);X.moveTo(s*.5,0);X.lineTo(s*1.3,-s*.4);X.stroke()}
 if(id==='barn'){for(const q of[-.5,0,.5]){X.fillStyle='#d6d3d1';X.beginPath();X.moveTo(q*s-s*.3,s*.3);X.lineTo(q*s,-s*.25);X.lineTo(q*s+s*.3,s*.3);X.fill();X.strokeStyle='#57534e';X.stroke()}}
 X.restore()}
function tag(t,x,y){X.font=F(14);const w=X.measureText(t).width+18,h=z(14)+10;card({x:Math.max(4,Math.min(A.W-w-4,x-w/2)),y:y-h/2,w,h},t,{n:14,rr:h/2})}
/* 1 drag the tide */
function drawTide(){const s=S.tide;shore(s.t);banner(s.out&&s.back?'The pool was there all the time':s.t<.15?'Tide out: a rock pool!':'Drag the sea down',s.out&&s.back);
 if(s.t<.5)tag('rock pool: salty sea water',A.W/2,A.H*.47);txt(s.t<.15?'low tide':s.t>.85?'high tide':'',A.W*.85,A.H*.18,15,A.col.tx)}
function setTide(t){const s=S.tide;s.t=Math.max(0,Math.min(1,t));if(s.t<.1&&!s.out){s.out=1;A.sound.pop();say('Low tide. The sea went out, but sea water stays in the hollow: a rock pool.')}
 if(s.out&&s.t>.9&&!s.back){s.back=1;A.sound.pop();say('High tide. The sea covers the pool again. This happens about twice a day.')}A.redraw();keys();S.hook()}
/* 2 find by features */
const ORDER=['star','crab','limp','anem','fish','prawn'];
function drawFind(){const s=S.find;shore(0);const done=s.i>=ORDER.length;banner(done?'All 6 found':`Find the ${ANI[ORDER[s.i]][0]} (${s.i+1} of 6)`,done);
 SPOT.forEach(([id])=>{const p=pos(id),got=ORDER.indexOf(id)<s.i;beast(id,p.x,p.y,size());if(got)tag(ANI[id][0],p.x,p.y+size()*1.25)})}
function pick(id){const s=S.find;if(s.i>=ORDER.length)return;const want=ORDER[s.i];
 if(id!==want){A.sound.miss();const m=`That is the ${ANI[id][0]}. ${ANI[want][1]}`;return say(m)}
 s.i++;A.sound.pop();say(`Yes, the ${ANI[id][0]}.`+(s.i>=ORDER.length?' All 6 found.':''))}
/* 3 lives here or not */
const cols=(n,y)=>{const g=9,w=(A.W-(n+1)*g)/n;return[...Array(n)].map((_,j)=>({j,x:g+j*(w+g),y:A.H*y,w,h:A.H*(.97-y)}))},bins=()=>cols(2,.42),lift=r=>drag?{...r,x:drag.x-r.w/2,y:drag.y-r.h/2}:r;
const deck=()=>{const w=Math.min(A.W-60,z(200));return{x:A.W/2-w/2,y:A.H*.14,w,h:z(58)}};
function drawWho(){const s=S.who;bg('#f0f9ff');const done=s.i>=WHERE.length;banner(done?'All 7 sorted':`Card ${s.i+1} of 7: does it live here?`,done);
 bins().forEach(b=>{card(b,null,{bg:b.j?'#fef3c7':'#cffafe',ring:s.bad===b.j?BAD:EDGE});txt(b.j?'Not in a rock pool':'Lives in a rock pool',b.x+b.w/2,b.y+z(16),14);
  WHERE.slice(0,s.i).filter(v=>v[1]===b.j).forEach((v,m)=>txt(v[0],b.x+b.w/2,b.y+z(42)+m*z(24),16,INK,700))});
 if(!done){const r=deck();card(lift(r),WHERE[s.i][0],{n:24,ring:drag?HOT:null})}}
function sortWho(j){const s=S.who;if(s.i>=WHERE.length)return;const [n,ok,why]=WHERE[s.i];
 if(j!==ok){s.bad=j;A.sound.miss();const m=ok?`Look again. ${why}`:`Not here. ${why}`;return say(m)}s.i++;s.bad=null;A.sound.pop();say(`${n}: ${why}`+(s.i>=WHERE.length?' All 7 sorted.':''))}
/* 4 a big wave */
const opts=()=>{const w=Math.min(z(230),(A.W-30)/2);return[0,1].map(j=>({j,x:A.W/2+(j?6:-w-6),y:A.H*.13,w,h:z(54)}))};
const side=i=>i%2?[WAVE[i][2],WAVE[i][1]]:[WAVE[i][1],WAVE[i][2]];
function drawWave(){const s=S.wave,done=s.i>=WAVE.length;shore(0);banner(done?'Everyone held on':`Wave! How does the ${ANI[WAVE[s.i][0]][0]} hold on?`,done);
 WAVE.forEach(([id],m)=>{const p=pos(id);beast(id,p.x,p.y,size(),m<s.i&&id==='limp');if(m<s.i)tag('safe',p.x,p.y+size()*1.25);if(m===s.i){X.strokeStyle=HOT;X.lineWidth=4;X.beginPath();X.arc(p.x,p.y,size()*1.25,0,7);X.stroke()}});
 if(!done)side(s.i).forEach((t,j)=>card(opts()[j],t,{n:15,bg:s.bad===t?'#fee2e2':CARD,ring:s.bad===t?BAD:null}))}
function trick(t){const s=S.wave;if(s.i>=WAVE.length)return;const [id,good,,why]=WAVE[s.i];
 if(t!==good){s.bad=t;A.sound.miss();return say(why)}s.i++;s.bad=null;A.sound.pop();
 say(`The ${ANI[id][0]} ${good}.`+(s.i>=WAVE.length?' Crash! Everyone holds on.':''))}
/* 5 low tide */
const zones=()=>cols(3,.44);
const hold=()=>{const w=z(150);return{x:A.W/2-w/2,y:A.H*.12,w,h:z(96)}};
function drawDry(){const s=S.dry,done=s.i>=DRY.length;bg('#fef9c3');
 banner(done?'All 5 wait for the sea':`Hot sun! How does it stay wet? (${s.i+1} of 5)`,done);
 zones().forEach(b=>{card(b,null,{bg:['#dcfce7','#e0e7ff','#ffe4e6'][b.j],ring:s.bad===b.j?BAD:EDGE});ZL[b.j].forEach((l,m)=>txt(l,b.x+b.w/2,b.y+z(16)+m*z(17),13));
  DRY.slice(0,s.i).filter(v=>v[1]===b.j).forEach(([id],m)=>beast(id,b.x+b.w/2,b.y+z(70)+m*z(56),size(),1))});
 if(!done){const h=lift(hold()),id=DRY[s.i][0];card(h,null,{ring:drag?HOT:null});beast(id,h.x+h.w/2,h.y+h.h*.42,size()*.9);txt(ANI[id][0],h.x+h.w/2,h.y+h.h-z(14),15)}}
function sortDry(j){const s=S.dry;if(s.i>=DRY.length)return;const [id,ok]=DRY[s.i];
 if(j!==ok){s.bad=j;A.sound.miss();return say(DRYWHY[id])}s.i++;s.bad=null;A.sound.pop();say(DRYWHY[id]+(s.i>=DRY.length?' All 5 can wait for the sea.':''))}
/* 6 the rock pooling code */
const thumbs=()=>{const w=Math.min(z(160),(A.W-30)/2);return[0,1].map(j=>({j,x:A.W/2+(j?8:-w-8),y:A.H*.6,w,h:z(70)}))};
function drawCode(){const s=S.code,done=s.i>=CODE.length;bg('#f0f9ff');
 banner(done?'You know the rock pool code':`Good idea? (${s.i+1} of 6)`,done);
 if(done)return;
 card({x:12,y:A.H*.22,w:A.W-24,h:z(80)},CODE[s.i][0],{n:20});thumbs().forEach(b=>card(b,b.j?'✗ Not good':'✓ Good idea',{n:18,bg:b.j?'#fee2e2':'#dcfce7',ring:s.bad===b.j?BAD:null}))}
function judge(j){const s=S.code;if(s.i>=CODE.length)return;const [t,ok,why]=CODE[s.i];
 if(j!==ok){s.bad=j;A.sound.miss();const m='Think again. '+why;return say(m)}s.i++;s.bad=null;A.sound.pop();say(why+(s.i>=CODE.length?' Code learned.':''))}
/* input */
function down(p){const m=k();
 if(m==='tide'){S.tide.grab=1;setTide((A.H-p.y)/(A.H*.72));return true}
 if(m==='find'){const r=SPOT.find(([id])=>{const q=pos(id);return Math.hypot(p.x-q.x,p.y-q.y)<size()*1.3});if(r)pick(r[0])}
 if(m==='who'){if(S.who.i<WHERE.length&&hit(p,deck())){drag={x:p.x,y:p.y};return true}const b=bins().find(r=>hit(p,r));if(b)sortWho(b.j)}
 if(m==='wave'&&S.wave.i<WAVE.length){const o=opts().find(r=>hit(p,r));if(o)trick(side(S.wave.i)[o.j])}
 if(m==='dry'){if(S.dry.i<DRY.length&&hit(p,hold())){drag={x:p.x,y:p.y};return true}const b=zones().find(r=>hit(p,r));if(b)sortDry(b.j)}
 if(m==='code'){const b=thumbs().find(r=>hit(p,r));if(b)judge(b.j)}return false}
function move(p){if(k()==='tide'&&S.tide.grab)return setTide((A.H-p.y)/(A.H*.72));if(drag){drag.x=p.x;drag.y=p.y;A.redraw()}}
function up(p){S.tide&&(S.tide.grab=0);if(!drag)return;drag=null;const m=k(),b=(m==='who'?bins():zones()).find(r=>hit(p,r));if(b)(m==='who'?sortWho:sortDry)(b.j);else A.redraw()}
function fresh(){run++;drag=null;for(const q in S)delete S[q];S.tide={t:1};['find','who','wave','dry','code'].forEach(q=>S[q]={i:0});S.hook=()=>{}}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.hook()}
function arm(i,first,ready,msg){fresh();say(first);S.hook=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const m=k(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='tide'){b('Tide out',()=>setTide(0));b('Tide in',()=>setTide(1))}
 if(m==='find'&&S.find.i<ORDER.length)SPOT.forEach(([id],n)=>b(`Animal ${n+1}`,()=>pick(id),`Animal ${n+1} in the pool`));
 if(m==='who'&&S.who.i<WHERE.length)['Lives in a rock pool','Not in a rock pool'].forEach((t,j)=>b(t,()=>sortWho(j),`${WHERE[S.who.i][0]}: ${t}`));
 if(m==='wave'&&S.wave.i<WAVE.length)side(S.wave.i).forEach(t=>b(t,()=>trick(t),`The ${ANI[WAVE[S.wave.i][0]][0]} ${t}`));
 if(m==='dry'&&S.dry.i<DRY.length)ZONE.forEach((t,j)=>b(t,()=>sortDry(j),`${ANI[DRY[S.dry.i][0]][0]}: ${t}`));
 if(m==='code'&&S.code.i<CODE.length)['Good idea','Not good'].forEach((t,j)=>b(t,()=>judge(j),`${CODE[S.code.i][0]}: ${t}`))}
const DB=' Drag it to a box, or use the buttons.',steps=[
{h:'Tide out, tide in',p:'The sea comes up the beach and goes back down about twice a day. That is the tide. Drag the sea down, then up.',
predict:{q:'The sea goes out. What is left in the hollow in the rock?',opts:['Nothing. It is dry.','A pool of sea water'],ans:1},task:'Take the tide out, then bring it back in',
show:()=>play(0,[()=>setTide(.5),()=>setTide(0),()=>setTide(.5),()=>setTide(1)],450),go:()=>arm(0,'High tide. The sea covers the rocks. Drag it down.',()=>S.tide.out&&S.tide.back,'A rock pool is sea water left behind by the tide.')},
{h:'Who lives here?',p:'Find each animal by how it looks.',task:'Find all 6 animals',
show:()=>play(1,ORDER.map(id=>()=>pick(id)),500),go:()=>arm(1,'Find the starfish. It has five arms.',()=>S.find.i>=ORDER.length,'Crab, anemone, starfish, limpet, blenny, prawn.')},
{h:'Does it live here?',p:'Rock pool water is salty sea water. Only sea animals live in it. Drag each card to a box.',task:'Sort all 7 cards',
show:()=>play(2,WHERE.map(v=>()=>sortWho(v[1])),420),go:()=>arm(2,'crab.'+DB,()=>S.who.i>=WHERE.length,'Sea animals live in the salty pool.')},
{h:'A big wave!',p:'Waves crash into the pool. Each animal has a way to stay put. Pick the right one.',
predict:{q:'A big wave hits the limpet. What happens?',opts:['It gets washed away','It holds on tight'],ans:1},task:'Keep all 5 animals safe',
show:()=>play(3,WAVE.map(v=>()=>trick(v[1])),550),go:()=>arm(3,'A wave is coming. How does the limpet hold on?',()=>S.wave.i>=WAVE.length,'Clamp, hide, stick or grip.')},
{h:'Low tide, hot sun',p:'The sea is out. Some animals are on the rock in the sun. How does each one stay wet?',
predict:{q:'A sea anemone is on a dry rock. What will it do?',opts:['Dry up and die','Fold up into a jelly blob and wait'],ans:1},task:'Help all 5 animals stay wet',
show:()=>play(4,DRY.map(v=>()=>sortDry(v[1])),500),go:()=>arm(4,'sea anemone.'+DB,()=>S.dry.i>=DRY.length,'Hide, shut tight or fold up, then wait for the sea.')},
{h:'Rock pool code',p:'Keep the animals and yourself safe. Is it a good idea?',task:'Sort all 6',
show:()=>play(5,CODE.map(v=>()=>judge(v[1])),450),go:()=>arm(5,'Go with a grown-up. Good idea?',()=>S.code.i>=CODE.length,'Look, put back, and watch the tide.')},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[
{q:'Is the water in a rock pool salty?',a:'Yes, it is sea water',o:[['No, it is rain water','The tide fills it with sea water, so it is salty.'],['No, it is pond water','A pond has fresh water. A rock pool has sea water.']]},
{q:'Is a sea anemone a plant or an animal?',a:'An animal',o:[['A plant','It looks like a flower, but it is an animal. It catches food.'],['A flower','Flowers grow on plants. An anemone is an animal.']]},
{q:'Is a starfish a fish?',a:'No. It has arms, not fins.',o:[['Yes, it lives in the sea','A fish has fins and a tail. A starfish has arms.'],['Yes, it can swim fast','A starfish creeps on tiny tube feet. It cannot swim.']]},
{q:'A big wave comes. What does a limpet do?',a:'Clamps down tight',o:[['Swims away','A limpet cannot swim. It clamps down.'],['Lets go and floats','If it let go, the wave would wash it away.']]},
{q:'The tide goes out. What is left in the hollow?',a:'A pool of sea water',o:[['Nothing, it drains dry','The rock holds water like a bowl.'],['Just sand','The hollow still holds sea water.']]},
{q:'You lift a rock and find a crab. What next?',a:'Put the rock back gently',o:[['Take the crab home','A crab needs its rock pool. Look, then leave it there.'],['Leave the rock upside down','Animals live under it. Put it back gently.']]}];
function next(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>answer(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function answer(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';let m='Think about salty sea water.';if(!ok)m=t;
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+m)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':m)}
function draw(){const m=k();if(m==='quiz'){shore(0);banner('Challenge',1);SPOT.forEach(([id])=>{const p=pos(id);beast(id,p.x,p.y,size())});return}
 ({tide:drawTide,find:drawFind,who:drawWho,wave:drawWave,dry:drawDry,code:drawCode})[m]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{box.hidden=B.step!==6;pad.hidden=B.step===6;keys()},
 init:B=>{A=B;X=A.ctx;c.fig.classList.add('young');const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rock pool buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}}).start()})})();
