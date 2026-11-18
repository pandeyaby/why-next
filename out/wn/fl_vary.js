/* Flagship: variation and survival advantage (ages 8–9; NGSS 3-LS4-2 use evidence to explain how variations in
   characteristics among individuals of the same species may provide advantages in surviving, finding mates and
   reproducing; NC England Year 6 evolution and inheritance: offspring vary, adaptation may lead to evolution).
   Measure six beetles of one species, send birds hunting on dark soil and pale sand, breed the survivors for three
   generations (with a no-birds control), match each difference to the advantage it gives, and judge whether a
   difference helps in a given place. Every tap also has a button. */
(()=>{
const SHADE=['#f3e6c4','#d6b277','#a3733d','#6b4522','#33220f'],SNAME=['very pale','pale','middle','dark','very dark'];
const BUGS=[[13,2],[11,0],[15,4],[12,1],[14,3],[13,3]];
const START=[2,3,2,3,2];
const SOIL={dark:{bg:'#3d2b1f',edge:'#2a1d14',v:4.5,name:'dark soil'},pale:{bg:'#ead9b0',edge:'#b8a274',v:-.5,name:'pale sand'}};
const ADV=['Reaches leaves others cannot','Stays warm in a cold winter','Less likely to be eaten','More likely to attract a mate'];
const VAR=[['A giraffe with a longer neck',0,'A longer neck reaches high leaves when the low ones have all been eaten.'],
 ['A rabbit with thicker fur',1,'Thicker fur keeps more body heat in when the winter is very cold.'],
 ['A rose with sharper thorns',2,'Sharper thorns hurt the mouths of deer and goats, so they eat other plants.'],
 ['A peacock with a bigger, brighter tail',3,'Peahens choose males with showy tails, so he has more chicks.']];
const PLACE=[['Dark beetle on dark soil',1,'It matches the soil, so birds find it less often.'],['Dark beetle on pale sand',0,'It stands out on pale sand, so birds spot it first.'],
 ['Thick fur in the Arctic',1,'Thick fur keeps it warm in the freezing cold.'],['Thick fur in a hot desert',0,'Thick fur would make it too hot in the desert.'],
 ['Long neck when the low leaves are gone',1,'It can still reach food when others cannot.'],['Bright red moth on brown tree bark',0,'It is easy to see, so birds catch it.']];
function hunt(pop,soilV){const p=pop.slice();let left=4;const order=[0,1,2,3,4].sort((a,b)=>Math.abs(b-soilV)-Math.abs(a-soilV)||a-b);for(const s of order){const k=Math.min(p[s],left);p[s]-=k;left-=k;if(!left)break}return p}
function breed(p){const tot=p.reduce((a,b)=>a+b,0),raw=p.map(x=>x*12/tot),out=raw.map(Math.floor);let r=12-out.reduce((a,b)=>a+b,0);
 raw.map((x,i)=>[x-Math.floor(x),i]).sort((a,b)=>b[0]-a[0]||b[1]-a[1]).forEach(([,i])=>{if(r>0){out[i]++;r--}});return out}
VIS.reg('flagvary',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',RIM='#94a3b8',CARD='#ffffff',OK='#047857',NO='#b91c1c',GOLD='#b45309',LEAF='#166534',PALE='#ecfccb',HOT='#dcfce7';
const MODE=['measure','hunt','gens','match','place','chal'],mode=()=>MODE[A.step];
const px=n=>Math.round(n*(A.narrow?1:1.12)),ff=(n,w)=>`${w||700} ${px(n)}px system-ui,sans-serif`;
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function label(s,x,y,n,col,al,w){Z.font=ff(n,w);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-16)}
function chop(s,max,n){Z.font=ff(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function card(r,fill,edge,lw){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function cardText(r,s,n,col){const L=chop(s,r.w-14,n),lh=px(n)+4;L.forEach((l,i)=>label(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col||INK,'center',700))}
function top(s,done){const r={x:10,y:8,w:A.W-20,h:A.H*.11};card(r,done?HOT:PALE,done?OK:LEAF,2);cardText(r,s,13,done?OK:INK)}
function bottom(){if(!S.msg)return;const L=chop((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=px(13)+5,h=L.length*lh+10,y=A.H-h-6;card({x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>label(l,A.W/2,y+5+lh*(i+.5),13))}
const tellAll=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const oops=s=>{S.bad=true;S.msg=s;A.sound.miss();tellAll(s);A.redraw()};
const nice=s=>{S.bad=false;S.msg=s;A.sound.pop()};
function beetle(x,y,len,shade,gone){const s=len/26;Z.save();Z.translate(x,y);Z.globalAlpha=gone?.25:1;Z.strokeStyle='#1f2937';Z.lineWidth=1.6;
 for(const k of[-1,1])for(const j of[-.35,0,.35]){Z.beginPath();Z.moveTo(k*6*s,j*20*s);Z.lineTo(k*15*s,j*24*s+4*s);Z.stroke()}
 Z.beginPath();Z.moveTo(-2*s,-12*s);Z.lineTo(-7*s,-21*s);Z.moveTo(2*s,-12*s);Z.lineTo(7*s,-21*s);Z.stroke();
 Z.fillStyle='#1f2937';Z.beginPath();Z.ellipse(0,-11*s,4.5*s,4*s,0,0,7);Z.fill();
 Z.fillStyle=SHADE[shade];Z.beginPath();Z.ellipse(0,2*s,8*s,12*s,0,0,7);Z.fill();Z.stroke();Z.beginPath();Z.moveTo(0,-9*s);Z.lineTo(0,14*s);Z.stroke();
 if(gone){Z.globalAlpha=1;Z.strokeStyle=NO;Z.lineWidth=3;Z.beginPath();Z.moveTo(-9*s,-9*s);Z.lineTo(9*s,9*s);Z.moveTo(9*s,-9*s);Z.lineTo(-9*s,9*s);Z.stroke()}Z.restore()}
/* step 1: measure */
const bugPos=i=>{const cols=A.narrow?3:6,r=Math.floor(i/cols),q=i%cols,w=(A.W-20)/cols,h=A.H*(A.narrow?.2:.3);return{x:10+q*w,y:A.H*.16+r*h,w,h}};
function drawMeasure(){const all=S.seen.size>=BUGS.length;top(all?'Same kind of beetle, but no two are alike. That is variation.':'These beetles are all one kind. Tap each one to measure it.',all);
 BUGS.forEach(([len,sh],i)=>{const r=bugPos(i),on=S.seen.has(i);card({x:r.x+3,y:r.y+3,w:r.w-6,h:r.h-6},on?'#f0fdf4':CARD,on?OK:RIM,on?2.5:1.5);beetle(r.x+r.w/2,r.y+r.h*.45,len*3.2*(A.narrow?.8:1),sh);
  label(on?`${len} mm, ${SNAME[sh]}`:`Beetle ${i+1}`,r.x+r.w/2,r.y+r.h-px(14),A.narrow?10:11,on?OK:SOFT,'center',700)});
 const last=bugPos(BUGS.length-1),y0=last.y+last.h+px(28),x0=A.W*.12,x1=A.W*.88,X=v=>x0+(v-10)/6*(x1-x0);
 Z.strokeStyle=INK;Z.lineWidth=2;Z.beginPath();Z.moveTo(x0,y0);Z.lineTo(x1,y0);Z.stroke();for(let v=10;v<=16;v++){Z.beginPath();Z.moveTo(X(v),y0-5);Z.lineTo(X(v),y0+5);Z.stroke();label(v,X(v),y0+px(14),11,SOFT)}
 label('shell length (mm)',A.W/2,y0+px(30),11,SOFT);const stack={};[...S.seen].forEach(i=>{const v=BUGS[i][0];stack[v]=(stack[v]||0)+1;Z.fillStyle=LEAF;Z.beginPath();Z.arc(X(v),y0-8-(stack[v]-1)*12,5,0,7);Z.fill()})}
function measure(i){if(S.seen.has(i))return oops(`You measured beetle ${i+1} already: ${BUGS[i][0]} mm. Try one you have not measured.`);S.seen.add(i);A.sound.tick();
 const L=[...S.seen].map(j=>BUGS[j][0]);nice(S.seen.size<BUGS.length?`Beetle ${i+1}: ${BUGS[i][0]} mm, ${SNAME[BUGS[i][1]]} shell.`:`All measured: from ${Math.min(...L)} to ${Math.max(...L)} mm, and from very pale to very dark. One kind, many differences.`);refresh()}
/* steps 2 and 3: the hunt */
const patch=()=>({x:10,y:A.H*.27,w:A.W-20,h:Math.min(A.H*(A.narrow?.32:.4),A.H*.55)});
const soilBtn=j=>{const w=(A.W-30)/2;return{x:10+j*(w+10),y:A.H*.155,w,h:px(30)}};
const goBtn=()=>{const p=patch();return{x:A.W*.25,y:p.y+p.h+px(32),w:A.W*.5,h:px(30)}};
const huntReserve=()=>A.H-(S.msg?px(70):px(28));
function popBugs(pop,gone,soil){const p=patch(),list=[];pop.forEach((n,s)=>{for(let k=0;k<n;k++)list.push(s)});const cols=A.narrow?4:6,rows=Math.ceil(list.length/cols)||1;
 Z.fillStyle=soil?SOIL[soil].bg:'#e5e7eb';A.paint.rrect(p.x,p.y,p.w,p.h,12);Z.fill();Z.strokeStyle=soil?SOIL[soil].edge:RIM;Z.lineWidth=2;Z.stroke();
 if(!soil)label('Choose where the beetles live',p.x+p.w/2,p.y+p.h-px(12),12,SOFT);
 const used=(gone||[]).slice();list.forEach((s,i)=>{const q=i%cols,r=Math.floor(i/cols),x=p.x+p.w*(q+.5)/cols,y=p.y+p.h*(r+.5)/rows-(soil?0:6);let g=false;const j=used.indexOf(s);if(j>=0){used.splice(j,1);g=true}beetle(x,y,A.narrow?30:38,s,g)})}
function goneList(before,after){const g=[];before.forEach((n,s)=>{for(let k=0;k<n-after[s];k++)g.push(s)});return g}
function drawHunt(){const both=S.ran.size>=2;top(both?'Beetles that match the ground survive best.':'Pick the ground, then send the birds. Birds catch the 4 beetles they see first.',both);
 ['dark','pale'].forEach((k,j)=>{const b=soilBtn(j);card(b,S.soil===k?HOT:CARD,S.soil===k?OK:RIM,S.soil===k?3:2);label(SOIL[k].name[0].toUpperCase()+SOIL[k].name.slice(1),b.x+b.w/2,b.y+b.h/2,13,INK,'center',800)});
 popBugs(START,S.after?goneList(START,S.after):null,S.soil);const g=goBtn();card(g,'#fff7ed',GOLD,2.5);label(S.after?'Reset the beetles':'Send the birds',g.x+g.w/2,g.y+g.h/2,13,INK,'center',800);
 if(S.after){const dk=S.after[3]+S.after[4],pl=S.after[0]+S.after[1];const t=`Survivors: ${dk} dark, ${S.after[2]} middle, ${pl} pale`;Z.font=ff(12,700);const w=Z.measureText(t).width+18,pp=patch();card({x:A.W/2-w/2,y:pp.y+pp.h+px(5),w,h:px(22)},INK,null);label(t,A.W/2,pp.y+pp.h+px(16),12,CARD,'center',700)}}
function pickSoil(k){S.soil=k;S.after=null;S.msg='';A.sound.tick();refresh()}
function sendBirds(){if(S.after){S.after=null;S.msg='';return refresh()}if(!S.soil)return oops('Choose where the beetles live first: dark soil or pale sand.');
 if(S.ran.has(S.soil)){S.after=hunt(START,SOIL[S.soil].v);return oops(`You ran a hunt on ${SOIL[S.soil].name} already, and the same beetles were caught. Try the other ground.`)}
 S.after=hunt(START,SOIL[S.soil].v);S.ran.add(S.soil);A.sound.whoosh();
 nice(S.soil==='dark'?'The birds caught the 4 palest beetles. On dark soil the pale shells stand out.':'The birds caught the 4 darkest beetles. On pale sand the dark shells stand out.');refresh()}
/* generations */
function drawGens(){const done=S.gen>=3;top(done?'Survivors had the young, and young look like their parents, so dark became common.':(S.gen===0?'Starting group on dark soil. Birds hunt, then the survivors have young.':`Generation ${S.gen} on dark soil. Birds hunt, then the survivors have young.`),done);
 popBugs(S.pop,null,'dark');const p=patch(),y0=p.y+p.h+px(10),bw=(A.W-40)/5,hmax=A.H*.13,base=y0+hmax;
 S.pop.forEach((n,s)=>{const x=20+s*bw;Z.fillStyle=SHADE[s];Z.fillRect(x+4,base-n/12*hmax*2.2,bw-8,n/12*hmax*2.2);Z.strokeStyle='#334155';Z.lineWidth=1;Z.strokeRect(x+4,base-n/12*hmax*2.2,bw-8,n/12*hmax*2.2);label(n,x+bw/2,base+px(10),11,INK,'center',800)});
 label('pale  ←  shell shade  →  dark',A.W/2,base+px(26),11,SOFT)}
function nextGen(birds){if(S.gen>=3)return oops('Three generations are done. Go on to the next step, or press Show me to run them again.');
 const before=S.pop;if(birds){const after=hunt(before,SOIL.dark.v);S.pop=breed(after);S.gen++;A.sound.whoosh();
  const dk=S.pop[3]+S.pop[4];nice(`Generation ${S.gen}: birds caught the 4 palest, the 8 survivors had young like themselves. Now ${dk} of 12 are dark.`)}
 else{S.pop=breed(before);S.ctrl=true;A.sound.tick();nice('No birds this year: nobody is picked out, so the young have the same mix as before. The birds make the difference.')}
 refresh()}
/* matching */
function opts3(){const v=VAR[S.i];if(!v)return[];const others=[0,1,2,3].filter(j=>j!==v[1]),o=[v[1],others[S.i%3],others[(S.i+1)%3]],r=S.i%3;return o.slice(r).concat(o.slice(0,r))}
const optBox=j=>{const h=px(44),g=8;return{x:20,y:A.H*.42+j*(h+g),w:A.W-40,h}};
function drawMatch(){const v=VAR[S.i];top(v?'Which advantage does this difference give? Tap it.':'Each difference helps in its own way.',!v);
 if(v){const r={x:A.W*.1,y:A.H*.17,w:A.W*.8,h:A.H*.18};card(r,'#fffbeb',GOLD,3);cardText(r,v[0],16);opts3().forEach((j,k)=>{const b=optBox(k);card(b,CARD,S.miss===j?NO:RIM,S.miss===j?3.5:2);cardText(b,ADV[j],13)})}
 else VAR.forEach((x,k)=>{const r={x:16,y:A.H*.18+k*(A.H*.14),w:A.W-32,h:A.H*.12};card(r,HOT,OK,1.5);cardText(r,x[0]+': '+ADV[x[1]].toLowerCase(),13,INK)})}
function matchPick(j){const v=VAR[S.i];if(!v)return;if(j===v[1]){S.i++;S.miss=null;nice(v[2]);return refresh()}S.miss=j;oops(`"${ADV[j]}" belongs to a different difference. ${v[2]}`)}
/* helpful here? */
const binB=j=>{const g=10,w=(A.W-20-g)/2;return{x:10+j*(w+g),y:A.H*.5,w,h:A.H*.26}};
const plCard=()=>({x:A.W*.12,y:A.H*.17,w:A.W*.76,h:A.H*.2});
const BINS=['Does not help here','Helps it survive here'];
function drawPlace(){const v=PLACE[S.i];top(v?'Does this difference help here? Drag the card to a box, or tap a box.':'A difference helps or harms depending on the place.',!v);
 [0,1].forEach(j=>{const b=binB(j);card(b,S.drag&&isIn(S.drag,b)?HOT:CARD,S.miss===j?NO:RIM,S.miss===j?3.5:2);const L=chop(BINS[j],b.w-12,13);L.forEach((l,q)=>label(l,b.x+b.w/2,b.y+px(16)+q*px(17),13,INK,'center',800));
  const n=S.sorted.filter(s=>s[1]===j).length;if(n)label(n===1?'1 card':n+' cards',b.x+b.w/2,b.y+b.h-px(16),12,SOFT,'center',600)});
 if(v){const r0=plCard(),r=S.drag?{...r0,x:S.drag.x-r0.w/2,y:S.drag.y-r0.h/2}:r0;card(r,'#fffbeb',GOLD,3);cardText(r,v[0],15)}}
function placePick(j){const v=PLACE[S.i];if(!v)return;if(j===v[1]){S.sorted.push([S.i,j]);S.i++;S.miss=null;nice(v[2]);return refresh()}S.miss=j;oops((v[1]?'It does help here. ':'It does not help here. ')+v[2])}
/* ---- pointer ---- */
function down(p){const m=mode();
 if(m==='measure'){const i=BUGS.findIndex((_,i)=>isIn(p,bugPos(i)));if(i>=0){measure(i);return true}return false}
 if(m==='hunt'){const j=[0,1].find(j=>isIn(p,soilBtn(j)));if(j!=null){pickSoil(['dark','pale'][j]);return true}if(isIn(p,goBtn())){sendBirds();return true}return false}
 if(m==='gens'){if(isIn(p,patch())){nextGen(true);return true}return false}
 if(m==='match'){if(!VAR[S.i])return false;const k=[0,1,2].find(k=>isIn(p,optBox(k)));if(k!=null){matchPick(opts3()[k]);return true}return false}
 if(m==='place'){if(!PLACE[S.i])return false;if(isIn(p,plCard())){S.drag={x:p.x,y:p.y};return true}const j=[0,1].find(j=>isIn(p,binB(j)));if(j!=null){placePick(j);return true}}return false}
function move(p){if(S.drag){S.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){if(!S.drag)return;const at=p||S.drag;S.drag=null;const j=[0,1].find(j=>isIn(at,binB(j)));if(j!=null)return placePick(j);A.redraw()}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();if(m==='measure')drawMeasure();if(m==='hunt')drawHunt();if(m==='gens')drawGens();if(m==='match')drawMatch();if(m==='place')drawPlace();
 if(m==='chal'){top('Individuals vary. Helpful differences are passed on and become common.');popBugs([0,0,1,5,6],null,'dark')}
 bottom();A.fx.draw(Z)}
function refresh(){const m=mode();let s='Challenge.';
 if(m==='measure')s=`Measured ${S.seen.size} of ${BUGS.length} beetles: ${[...S.seen].map(i=>`beetle ${i+1} ${BUGS[i][0]} mm ${SNAME[BUGS[i][1]]}`).join(', ')||'none yet'}.`;
 if(m==='hunt')s=`Ground: ${S.soil?SOIL[S.soil].name:'not chosen'}. 12 beetles: 2 very pale, 3 pale, 2 middle, 3 dark, 2 very dark.`+(S.after?` Survivors: ${S.after.map((n,i)=>n+' '+SNAME[i]).join(', ')}.`:'')+` Hunts run on: ${[...S.ran].map(k=>SOIL[k].name).join(' and ')||'none'}.`;
 if(m==='gens')s=`${S.gen===0?'Starting group':`Generation ${S.gen}`} on dark soil: ${S.pop.map((n,i)=>n+' '+SNAME[i]).join(', ')}.`;
 if(m==='match'){const v=VAR[S.i];s=v?`${v[0]}. Options: ${opts3().map(j=>ADV[j]).join('; ')}.`:'All four matched.'}
 if(m==='place'){const v=PLACE[S.i];s=v?`Card: ${v[0]}. Does it help here? Sorted ${S.sorted.length} of ${PLACE.length}.`:'All six cards sorted.'}
 tellAll((S.msg?S.msg+' ':'')+s);ctl();S.then()}
function ctl(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='measure')BUGS.forEach((_,i)=>{if(!S.seen.has(i))b(`Measure beetle ${i+1}`,()=>measure(i))});
 if(m==='hunt'){b('Dark soil',()=>pickSoil('dark'),'Put the beetles on dark soil');b('Pale sand',()=>pickSoil('pale'),'Put the beetles on pale sand');b(S.after?'Reset the beetles':'Send the birds',sendBirds)}
 if(m==='gens'&&S.gen<3){b('Next generation',()=>nextGen(true),'Birds hunt, then survivors have young');b('No birds this year',()=>nextGen(false),'Survivors have young with no birds hunting')}
 if(m==='match'&&VAR[S.i])opts3().forEach(j=>b(ADV[j],()=>matchPick(j)));
 if(m==='place'&&PLACE[S.i])BINS.forEach((t,j)=>b(t,()=>placePick(j),`${PLACE[S.i][0]}: ${t}`));
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const clean=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},i:0,seen:new Set(),soil:null,after:null,ran:new Set(),pop:START.slice(),gen:0,ctrl:false,drag:null,miss:null,sorted:[],msg:'',bad:false})};
const steps=[
{h:'No two the same',p:'All six beetles are the same kind. Tap each one to measure its shell. Look at the sizes and the shades.',
predict:{q:'Are all the beetles of one kind exactly the same?',opts:['No, they differ a little','Yes, they are all the same','Only the males and females differ'],ans:0},
task:'Measure 6 beetles',show:()=>{steps[0].go();play(BUGS.map((_,i)=>()=>measure(i)),300)},go:()=>{clean();refresh();S.then=finish(0,()=>S.seen.size>=BUGS.length,'Same kind, different sizes and shades.')}},
{h:'The birds hunt',p:'Birds eat beetles. They catch the ones they can see best. Put the same 12 beetles on dark soil, then on pale sand, and send the birds each time.',
predict:{q:'On dark soil, which beetles will the birds catch most?',opts:['The pale ones','The dark ones','Pale and dark the same'],ans:0},
task:'Run a hunt on both grounds',show:()=>{steps[1].go();play([()=>pickSoil('dark'),sendBirds,()=>pickSoil('pale'),sendBirds],500)},go:()=>{clean();refresh();S.then=finish(1,()=>S.ran.size>=2,'Matching the ground helps a beetle survive.')}},
{h:'Young like their parents',p:'Only the survivors have young, and the young look like their parents. Run three generations on dark soil. Try a year with no birds too.',
predict:{q:'After three generations on dark soil, what will most beetles look like?',opts:['Dark','Pale','The same mix as at the start'],ans:0},
task:'Run 3 generations',show:()=>{steps[2].go();play([()=>nextGen(true),()=>nextGen(true),()=>nextGen(true)],550)},go:()=>{clean();refresh();S.then=finish(2,()=>S.gen>=3,'The helpful shade spreads over generations.')}},
{h:'Other helpful differences',p:'Colour is only one kind of difference. Match each difference to the way it helps the living thing survive or have young.',
task:'Match 4 differences',show:()=>{steps[3].go();play(VAR.map(v=>()=>matchPick(v[1])),450)},go:()=>{clean();refresh();S.then=finish(3,()=>S.i>=VAR.length,'Some help to find food, keep warm, stay safe or find a mate.')}},
{h:'Helpful here, not there',p:'A difference that helps in one place can be a problem in another. Decide for each card.',
task:'Sort 6 cards',show:()=>{steps[4].go();play(PLACE.map(v=>()=>placePick(v[1])),420)},go:()=>{clean();refresh();S.then=finish(4,()=>S.i>=PLACE.length,'It depends on the habitat.')}},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['Do all the beetles of one kind look exactly the same?','No, they vary',[['Yes, always','same'],['Only the babies are different','babies']]],
['On dark soil, why do more dark beetles survive?','Birds spot them less often',[['They try hard to turn dark','try'],['Dark beetles are stronger','strong']]],
['A giraffe stretches its neck to reach leaves. Will its young have longer necks because of the stretching?','No, stretching is not passed on',[['Yes, the stretch is passed on','lamarck'],['Only if it stretches every day','daily']]],
['Thick fur helps a hare in the Arctic. Would thick fur help a camel in a hot desert?','No, it would be too hot',[['Yes, thick fur always helps','always'],['Only at night','night']]],
['Why does a helpful difference become more common over many generations?','Survivors have more young, and young are like their parents',[['Animals choose to change','choose'],['The weather paints the animals','weather']]],
['Peahens pick males with brighter tails. What happens to bright tails over many generations?','They become more common',[['They disappear','vanish'],['Nothing changes','nochange']]]];
function why(tag){let m='Think about who survives and who has young.';
 if(tag==='same')m='Measure them: lengths from 11 to 15 mm and shades from pale to dark. Individuals of one kind vary.';
 if(tag==='babies')m='Grown-ups vary too. The six adult beetles you measured were all different.';
 if(tag==='try')m='A beetle cannot change its shell colour by trying. The dark ones were already dark, and birds missed them.';
 if(tag==='strong')m='Strength is not what saved them. Dark shells match dark soil, so birds see them less often.';
 if(tag==='lamarck')m='Changes during a life, like stretching, are not passed to the young. Giraffes born with longer necks pass those on.';
 if(tag==='daily')m='However often it stretches, the young are not born with a longer neck because of it.';
 if(tag==='always')m='A difference helps only in the right place. Thick fur keeps heat in, which is a problem in a hot desert.';
 if(tag==='night')m='Deserts can be cold at night, but by day thick fur would make the camel far too hot.';
 if(tag==='choose')m='No animal chooses its features. The ones born with a helpful difference survive and have more young.';
 if(tag==='weather')m='The weather does not change a beetle. Birds pick off the ones that stand out, and survivors breed.';
 if(tag==='vanish')m='Bright males have more chicks, and the chicks are like them, so bright tails spread.';
 if(tag==='nochange')m='The brighter males have more chicks each year, so the mix changes over time.';
 return m}
function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tellAll('Challenge: '+q);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.35,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;ctl()},
 init:B=>{A=B;Z=A.ctx;c.fig.classList.add('young');const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Beetle lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
