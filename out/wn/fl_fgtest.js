/* Flagship – tests for functional groups (ages 16–18): add four reagents to four organic liquids and read the
   result grid; learn that "no change" only rules groups out (ketone and tertiary alcohol both stay orange with
   dichromate, so 2,4-DNP is needed); choose the precise observation wording; identify mystery liquids with as few
   tests as possible; predict every positive test for molecules with two functional groups. Button twins throughout. */
(()=>{
const T=[{n:'Bromine water',s:'Br₂(aq)',k:'b',p:'colourless',q:'orange',P:'turns from orange to colourless',Q:'stays orange'},
 {n:'Sodium hydrogencarbonate',s:'NaHCO₃',k:'c',p:'fizz',q:'no fizz',P:'fizzes, and the CO₂ turns limewater cloudy',Q:'does not fizz'},
 {n:'Acidified potassium dichromate(VI), warm',s:'Cr₂O₇²⁻/H⁺',k:'d',p:'green',q:'orange',P:'turns from orange to green',Q:'stays orange'},
 {n:"Tollens' reagent, warm",s:"Tollens'",k:'t',p:'mirror',q:'no change',P:'gives a silver mirror',Q:'gives no silver mirror'},
 {n:'2,4-DNP (Brady\'s reagent)',s:'2,4-DNP',k:'n',p:'orange ppt',q:'no ppt',P:'gives an orange precipitate',Q:'gives no precipitate'}];
const M={'cyclohexene':'b','propan-1-ol':'d','propanal':'dtn','propanoic acid':'c','propanone':'n','butan-2-ol':'d','2-methylpropan-2-ol':'','hex-1-ene':'b','ethanol':'d','ethanal':'dtn','ethanoic acid':'c','prop-2-enoic acid':'bc','2-hydroxypropanoic acid':'cd','prop-2-en-1-ol':'bd'};
const G=[{cols:['cyclohexene','propan-1-ol','propanal','propanoic acid'],tests:[0,1,2,3]},
 {cols:['propanal','propanone','butan-2-ol','2-methylpropan-2-ol'],tests:[2,3,4]},null,
 {cols:['hex-1-ene','ethanol','ethanal','ethanoic acid','2-methylpropan-2-ol'],tests:[0,1,2,3],mys:[2,3,4]},
 {cols:['prop-2-enoic acid','2-hydroxypropanoic acid','prop-2-en-1-ol'],tests:[0,1,2,3]}];
const LAB=[['aldehyde','dtn'],['ketone','n'],['2° alcohol','d'],['3° alcohol','']];
const GN={b:'C=C',c:'–COOH',d:'oxidisable group (1° or 2° –OH, or –CHO)',t:'–CHO (aldehyde) group',n:'C=O (carbonyl) group'};
const OBS=[{a:'Bromine water + an alkene',o:['Turns clear','Orange to colourless','Orange to red'],k:1,w:['Clear means see-through; orange bromine water is clear too. Say colourless.','','Bromine is used up as it adds across C=C, so the colour goes, not deepens.']},
 {a:'NaHCO₃(aq) + a carboxylic acid',o:['Pops with a lighted splint','No visible change','Effervescence; gas turns limewater cloudy'],k:2,w:['A squeaky pop is hydrogen, from metals. Carbonates give CO₂.','The acid is strong enough to react with a carbonate: you see fizzing.','']},
 {a:"Tollens' reagent + an aldehyde, warm",o:['Brick-red precipitate','Silver mirror','Orange to green'],k:1,w:["Brick-red is Fehling's solution. Tollens' gives silver metal.",'','Orange to green is dichromate, not Tollens\'.']},
 {a:'Acidified dichromate(VI) + butan-2-ol, warm',o:['Orange to green','Green to orange','Stays orange'],k:0,w:['','Wrong way round: orange Cr₂O₇²⁻ is reduced to green Cr³⁺.','Butan-2-ol is a secondary alcohol, so it is oxidised to a ketone.']}];
VIS.reg('flagfgtest',c=>{let A,pad,qb,qn=-1,run=0,ver=0;
const S={};const fresh=()=>Object.assign(S,{u:{},ran:new Set(),lab:[-1,-1,-1,-1],mk:0,seen:new Set(),used:0,solved:0,wait:0,gs:[new Set(),new Set(),new Set()],chk:[0,0,0],pick:[-1,-1,-1,-1],want:()=>{}});fresh();
const mode=()=>['grid','grid','obs','mys','two','quiz'][A.step],g0=()=>G[A.step];
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const has=(cm,ti)=>M[cm].includes(T[ti].k);
const fz=n=>Math.round(n*(A.narrow?1:1.15));
function tx(g,t,x,y,n,col,w,al){g.font=`${w||700} ${fz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y)}
function wrap(t,n){const o=[];let l='';t.replace(/(methyl|hydroxy)p/,'$1- p').split(' ').forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});o.push(l);return o.map(l=>l.replace(/- /g,'-'))}
const bg=(h,k)=>A.mix(A.col.pn,h,A.col.dark?k*.3:k);
function tube(g,x,y,w,h,ti,p,u){const C=A.col,k=T[ti]?T[ti].k:'';let col='#e2e8f0';
 if(k==='b')col=A.mix('#ea580c','#f8fafc',p?u:0);if(k==='d')col=A.mix('#ea580c','#16a34a',p?u:0);if(k==='c')col='#e0f2fe';if(k==='n')col='#fdba74';
 g.fillStyle=bg('#ffffff',.9);A.paint.rrect(x-w/2,y,w,h,w/2);g.fill();if(ti>=0){g.fillStyle=col;A.paint.rrect(x-w/2+3,y+h*.35,w-6,h*.65-3,w/2-3);g.fill()}
 if(p&&k==='t'){g.fillStyle=A.alpha('#9ca3af',u);A.paint.rrect(x-w/2,y,w,h,w/2);g.fill()}
 if(p&&k==='c'&&u>.2)for(let i=0;i<6;i++){g.beginPath();g.arc(x-w/4+(i%3)*w/4,y+h*(.85-((u*3+i/6)%1)*.45),2.5,0,7);g.strokeStyle='#0369a1';g.lineWidth=1.5;g.stroke()}
 if(p&&k==='n')for(let i=0;i<9;i++){g.fillStyle=A.alpha('#c2410c',u);g.fillRect(x-w/2+5+(i*7)%(w-10),y+h*.86-(i%3)*3,3,3)}
 g.lineWidth=2;g.strokeStyle=A.mix(C.tx,C.pn,.4);A.paint.rrect(x-w/2,y,w,h,w/2);g.stroke()}
const bot=()=>A.step===1?.87:.97,geo=(n,m)=>{const W=A.W,H=A.H,x0=W*.22,cw=(W-x0-6)/n,y0=H*.16,rh=(H*bot()-y0)/m;return{x0,cw,y0,rh,cx:i=>x0+cw*(i+.5),ry:j=>y0+rh*j}};
function grid(g,cols,tests,cell){const{W,H,col:C}=A,o=geo(cols.length,tests.length),ink=C.tx;
 cols.forEach((cm,i)=>wrap(cm,A.narrow?9:13).forEach((l,j,a)=>tx(g,l,o.cx(i),H*(.08-(a.length-1)*.03+j*.06),A.narrow?9:11,ink,800)));
 tests.forEach((ti,j)=>{const y=o.ry(j);tx(g,T[ti].s,8,y+o.rh*.4,11,ink,800,'left');g.strokeStyle=A.alpha(C.tx,.15);g.lineWidth=1;g.beginPath();g.moveTo(6,y);g.lineTo(W-6,y);g.stroke();
  cols.forEach((cm,i)=>cell(g,o.cx(i),y,Math.min(30,o.cw*.42),o.rh,ti,cm,i))})}
function shown(g,x,y,w,rh,ti,cm){const ink=A.col.tx,u=S.u[ti];if(u==null){g.setLineDash([4,4]);g.strokeStyle=A.col.mu;g.strokeRect(x-w/2,y+rh*.1,w,rh*.55);g.setLineDash([]);return}
 const p=has(cm,ti);tube(g,x,y+rh*.08,w,rh*.6,ti,p,u);if(u>=1)tx(g,p?T[ti].p:T[ti].q,x,y+rh*.84,9,ink,p?800:500)}
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode(),ink=C.tx,mu=C.mu;g.fillStyle=bg('#f0fdf4',.3);g.fillRect(0,0,W,H);
 if(m==='grid'){const d=g0();grid(g,d.cols,d.tests,shown);if(A.step===1)d.cols.forEach((cm,i)=>{const o=geo(4,3),l=S.lab[i];tx(g,l<0?'tap: name it':LAB[l][0]+(l===i?' ✓':''),o.cx(i),H*.93,9,l<0?mu:ink,800)})}
 if(m==='obs')OBS.forEach((r,i)=>{const b={x:8,y:H*(.03+i*.24),w:W-16,h:H*.21},p=S.pick[i],ok=p===r.k;g.fillStyle=p<0?bg('#ffffff',.9):ok?bg('#dcfce7',1):bg('#fee2e2',1);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=2;g.strokeStyle=p>=0&&!ok?C.rd:A.mix(ink,C.pn,.55);g.stroke();
  tx(g,r.a,b.x+10,b.y+b.h*.3,12,ink,800,'left');tx(g,p<0?'Tap for the observation':(ok?'✓ ':'✗ ')+r.o[p],b.x+10,b.y+b.h*.7,12,ink,700,'left')});
 if(m==='mys'){const d=G[3],cm=d.cols[d.mys[S.mk]],x=W*.14,ts=S.ran;tube(g,x,H*.08,Math.min(46,W*.12),H*.42,-1,0,0);tx(g,'?',x,H*.36,26,ink,900);tx(g,`Mystery ${S.mk+1} of 3`,x,H*.56,11,ink,800);
  d.tests.forEach((ti,j)=>{const y=H*(.06+j*.13),b={x:W*.3,y,w:W*.68,h:H*.11};g.fillStyle=bg('#ffffff',.9);A.paint.rrect(b.x,b.y,b.w,b.h,8);g.fill();g.strokeStyle=A.mix(ink,C.pn,.55);g.lineWidth=1.5;g.stroke();
   tx(g,T[ti].s+': '+(ts.has(ti)?(has(cm,ti)?T[ti].p:T[ti].q):'tap to test'),b.x+8,y+b.h/2,11,ts.has(ti)?ink:mu,800,'left')});
  d.cols.forEach((n,i)=>{const b=chip(i);g.fillStyle=bg('#fef3c7',.9);A.paint.rrect(b.x,b.y,b.w,b.h,8);g.fill();g.strokeStyle=A.mix(ink,C.pn,.5);g.stroke();wrap(n,11).forEach((l,j,a)=>tx(g,l,b.x+b.w/2,b.y+b.h/2+(j-(a.length-1)/2)*fz(12),A.narrow?10:11,ink,800))});
  tx(g,`Tests used: ${S.used} · solved ${S.solved}`,W*.64,H*.6,11,mu,700)}
 if(m==='two'){const d=G[4];grid(g,d.cols,d.tests,(g,x,y,w,rh,ti,cm,i)=>{if(S.chk[i]){const p=has(cm,ti),gs=S.gs[i].has(ti);tube(g,x,y+rh*.08,w,rh*.6,ti,p,1);tx(g,(gs===p?'✓ ':'✗ ')+(p?T[ti].p:T[ti].q),x,y+rh*.84,9,gs===p?ink:C.rd,800);return}
  const on=S.gs[i].has(ti);g.fillStyle=on?bg('#fde68a',1):bg('#ffffff',.6);A.paint.rrect(x-w,y+rh*.12,w*2,rh*.6,8);g.fill();g.strokeStyle=on?C.am:A.alpha(ink,.3);g.lineWidth=2;g.stroke();tx(g,on?'+':'–',x,y+rh*.42,16,ink,900)})}
 if(m==='quiz'){tx(g,'C=C: bromine water · –COOH: NaHCO₃',W/2,H*.35,12,ink,800);tx(g,"1°/2° –OH, –CHO: dichromate · –CHO: Tollens'",W/2,H*.47,12,ink,800);tx(g,'C=O: 2,4-DNP · no change only rules groups out',W/2,H*.59,12,ink,800)}A.fx.draw(g)}
const chip=i=>{const W=A.W,H=A.H,cw=(W-16)/3;return{x:8+(i%3)*cw,y:H*(.68+Math.floor(i/3)*.15),w:cw-6,h:H*.12}};
/* actions */
function addR(ti){if(S.ran.has(ti))return;S.ran.add(ti);S.u[ti]=0;const k=ver,d=g0();A.sound.pop();A.tween(S.u,{[ti]:1},A.reduced()?1:1000,'io',()=>{if(k!==ver)return;
 say(`${T[ti].n}: `+d.cols.map(cm=>`${cm} ${has(cm,ti)?T[ti].P:T[ti].Q}`).join('; ')+'.');S.want();keys();A.redraw()})}
function why(pat,actual,tests,ran,what){for(const ti of tests)if(ran.has(ti)&&pat.includes(T[ti].k)!==actual.includes(T[ti].k))return`${T[ti].s} rules that out: ${what} ${pat.includes(T[ti].k)?T[ti].P.replace(/^(turn|give|fizz)e?s/,'would $1'):'would show no change'}, but this one ${actual.includes(T[ti].k)?T[ti].P:T[ti].Q}.`;
 const u=tests.find(ti=>pat.includes(T[ti].k)!==actual.includes(T[ti].k));return u==null?'Those two give the same results in every test here.':`No test so far tells those apart. Try ${T[u].s}.`}
function name(i){const cm=G[1].cols[i];S.lab[i]=(S.lab[i]+1)%4;const l=S.lab[i];A.sound.tick();
 say(l===i?`Yes: ${cm} is the ${LAB[l][0]}.`:why(LAB[l][1],M[cm],G[1].tests,S.ran,(/^[aeiou]/.test(LAB[l][0])?'an ':'a ')+LAB[l][0]));S.want();keys();A.redraw()}
function test3(ti){if(S.wait)return;const d=G[3],cm=d.cols[d.mys[S.mk]];if(!S.ran.has(ti)){S.ran.add(ti);S.used++}A.sound.tick();say(`Mystery ${S.mk+1}: ${T[ti].n} ${has(cm,ti)?T[ti].P:T[ti].Q}.`);keys();A.redraw()}
function guess(i){if(S.wait)return;const d=G[3],a=d.mys[S.mk],cm=d.cols[a];if(i!==a){A.sound.miss();say(why(M[d.cols[i]],M[cm],d.tests,S.ran,d.cols[i]));return}
 S.solved++;S.wait=1;A.sound.pop();const t=`Yes, ${cm}. ${S.ran.size} test${S.ran.size>1?'s':''} for this one.`,k=ver;say(t);
 setTimeout(()=>{if(k!==ver)return;S.wait=0;if(S.solved<3){S.mk++;S.ran=new Set()}say(S.solved<3?t+' Next mystery.':t);S.want();keys();A.redraw()},A.reduced()?5:700)}
function flip(i,ti){if(S.chk[i])S.chk[i]=0;const s=S.gs[i];s.has(ti)?s.delete(ti):s.add(ti);A.sound.tick();say(`${G[4].cols[i]}: ${T[ti].s} ${s.has(ti)?'expected positive':'expected negative'}.`);keys();A.redraw()}
function check(i){const cm=G[4].cols[i],s=S.gs[i];S.chk[i]=1;const bad=G[4].tests.filter(ti=>s.has(ti)!==has(cm,ti));
 if(!bad.length){A.sound.pop();say(`${cm}: all four right. Each group gives its own positive test.`);S.want()}
 else{A.sound.miss();const ti=bad[0];say(has(cm,ti)?`${cm} has a ${GN[T[ti].k]}, so ${T[ti].s} is positive too.`:`${cm} has no ${GN[T[ti].k]}, so ${T[ti].s} stays negative.`)}keys();A.redraw()}
function choose(i,k){S.pick[i]=k;const r=OBS[i];if(k===r.k){A.sound.pop();say(`${r.a}: ${r.o[k]}.`);S.want()}else{A.sound.miss();say(r.w[k])}keys();A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn ghost sm'},pad,t).onclick=f};
 if(m==='grid'){g0().tests.forEach(ti=>{if(!S.ran.has(ti))B(`Add ${T[ti].n}`,()=>addR(ti))});if(A.step===1)G[1].cols.forEach((cm,i)=>{if(S.lab[i]!==i)B(`Name ${cm}: ${LAB[(S.lab[i]+1)%4][0]}?`,()=>name(i))})}
 if(m==='obs')OBS.forEach((r,i)=>{if(S.pick[i]!==r.k)r.o.forEach((o,k)=>B(`${r.a}: ${o}`,()=>choose(i,k)))});
 if(m==='mys'&&S.solved<3){G[3].tests.forEach(ti=>{if(!S.ran.has(ti))B(`Test with ${T[ti].n}`,()=>test3(ti))});G[3].cols.forEach((n,i)=>B(`It is ${n}`,()=>guess(i)))}
 if(m==='two')G[4].cols.forEach((cm,i)=>{if(S.chk[i]&&S.gs[i].size&&G[4].tests.every(ti=>S.gs[i].has(ti)===has(cm,ti)))return;G[4].tests.forEach(ti=>B(`${cm}: ${T[ti].s} ${S.gs[i].has(ti)?'−':'+'}`,()=>flip(i,ti)));B(`Run tests on ${cm}`,()=>check(i))})}
function down(p){const m=mode(),W=A.W,H=A.H;
 if(m==='grid'){const d=g0(),o=geo(d.cols.length,d.tests.length);if(A.step===1&&p.y>H*.87&&p.x>o.x0){name(Math.min(3,Math.floor((p.x-o.x0)/o.cw)));return false}const j=Math.floor((p.y-o.y0)/o.rh);if(j>=0&&j<d.tests.length)addR(d.tests[j]);return false}
 if(m==='obs'){const i=[0,1,2,3].findIndex(k=>p.y>=H*(.03+k*.24)&&p.y<=H*(.24+k*.24));if(i>=0)choose(i,(S.pick[i]+1)%3);return false}
 if(m==='mys'){if(p.x>W*.3&&p.y<H*.58){const j=Math.floor((p.y-H*.06)/(H*.13));if(j>=0&&j<4)test3(G[3].tests[j]);return false}const i=G[3].cols.findIndex((n,k)=>{const b=chip(k);return p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h});if(i>=0)guess(i);return false}
 if(m==='two'){const o=geo(3,4);if(p.y<o.y0){const i=Math.floor((p.x-o.x0)/o.cw);if(i>=0&&i<3)check(i);return false}const i=Math.floor((p.x-o.x0)/o.cw),j=Math.floor((p.y-o.y0)/o.rh);if(i>=0&&i<3&&j>=0&&j<4)flip(i,j)}return false}
const ok=(n,f,msg)=>()=>{if(A.step===n&&f()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const reset=(n,f,msg,t)=>{ver++;fresh();S.want=ok(n,f,msg);say(t);keys()};
function later(fs,gap){const k=ver;fs.forEach((f,j)=>setTimeout(()=>{if(k===ver&&f)f()},A.reduced()?j*30+10:j*gap+200))}
const steps=[
{h:'Four reagents, four liquids',p:'Each reagent tests for one group. Add each one to all four liquids and read the grid: a change is a positive test.',
 predict:{q:'Which liquids will turn acidified dichromate(VI) green?',opts:['Only propan-1-ol: it is the alcohol test','Propan-1-ol and propanal','All four'],ans:1},task:'Add all 4 reagents',
 show:()=>{steps[0].go();later([0,1,2,3].map(ti=>()=>addR(ti)),900)},go:()=>reset(0,()=>S.ran.size>=4,'Each group has its own test, but dichromate also oxidises aldehydes, so green alone does not prove an alcohol.','Cyclohexene, propan-1-ol, propanal, propanoic acid.')},
{h:'No change is evidence too',p:'Propanone and 2-methylpropan-2-ol both leave dichromate orange. Run the tests, then name each liquid (tap the label row).',
 predict:{q:'A liquid leaves acidified dichromate(VI) orange. What does that show?',opts:['It has no functional group','It is not a 1° or 2° alcohol or an aldehyde; it may still be a ketone or 3° alcohol','It must be a tertiary alcohol'],ans:1},task:'Run 3 tests and name all 4',
 show:()=>{steps[1].go();later([()=>addR(2),()=>addR(3),()=>addR(4)].concat([0,1,2,3].flatMap(i=>Array(i+1).fill(()=>name(i)))),400)},go:()=>reset(1,()=>S.ran.size>=3&&S.lab.every((l,i)=>l===i),'A negative result only rules groups out. 2,4-DNP finds the C=O that dichromate missed.','Four liquids that look the same.')},
{h:'Say what you see',p:'Marks go for the exact observation. Tap each row until the wording is right.',task:'Get all 4 observations right',
 show:()=>{steps[2].go();later(OBS.map((r,i)=>()=>choose(i,r.k)),350)},go:()=>reset(2,()=>OBS.every((r,i)=>S.pick[i]===r.k),'Colourless, not clear; effervescence plus limewater; silver mirror; orange to green.','Four positive tests to describe.')},
{h:'Mystery liquids',p:'Five suspects. Run tests on the mystery liquid (tap a test row), then tap the suspect. Use as few tests as you can.',task:'Identify all 3 mysteries',
 show:()=>{steps[3].go();later([()=>test3(3),()=>guess(2),0,0,()=>test3(1),()=>guess(3),0,0,()=>test3(0),()=>test3(1),()=>test3(2),()=>guess(4)],420)},go:()=>reset(3,()=>S.solved>=3,'Choose the test that splits the suspects; a set of negatives can be the answer.','Mystery 1: a colourless liquid.')},
{h:'Two groups at once',p:'Each molecule has two functional groups. Tap a cell to mark the tests you expect to be positive (+), then tap the name to run the tests.',
 predict:{q:'Prop-2-enoic acid, CH₂=CHCOOH, has C=C and –COOH. How many of these four tests are positive?',opts:['One: the stronger group hides the other','Two: each group gives its own result','None: the groups cancel out'],ans:1},task:'Get all 3 molecules right',
 show:()=>{steps[4].go();later([()=>flip(0,0),()=>flip(0,1),()=>check(0),()=>flip(1,1),()=>flip(1,2),()=>check(1),()=>flip(2,0),()=>flip(2,2),()=>check(2)],380)},go:()=>reset(4,()=>[0,1,2].every(i=>S.chk[i]&&G[4].tests.every(ti=>S.gs[i].has(ti)===has(G[4].cols[i],ti))),'Groups act independently, so each one shows up in its own test.','Three molecules, two groups each.')},
{h:'Challenge',p:'',go:()=>{ver++;quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which reagent tells propanal from propanone?',[["Tollens' reagent",'ok'],['2,4-DNP','dnp'],['Bromine water','br']]],
 ['A liquid fizzes with NaHCO₃(aq). Which group is present?',[['–COOH','ok'],['–OH of an alcohol','oh'],['C=C','br']]],
 ['Bromine water stays orange. What can you conclude?',[['There is no C=C','ok'],['There is no functional group','none'],['It is an alcohol','none']]],
 ['Which result is positive for an aldehyde with acidified dichromate(VI)?',[['Orange to green','ok'],['Silver mirror','mix'],['Orange to colourless','mix']]],
 ['2-methylpropan-2-ol with acidified dichromate(VI), warm:',[['Stays orange','ok'],['Turns green','tert'],['Fizzes','oh']]],
 ['Which describes bromine water with cyclohexene?',[['Orange to colourless','ok'],['Orange to clear','clear'],['Colourless to orange','mix']]]];
function hint(t){let m='Match each reagent to the group it detects.';
 if(t==='dnp')m='2,4-DNP gives an orange precipitate with both aldehydes and ketones, so it cannot tell them apart. Tollens\' only reacts with aldehydes.';
 if(t==='br')m='Bromine water detects C=C only. It does not react with –COOH or C=O.';
 if(t==='oh')m='Alcohols are too weakly acidic to react with carbonates. Only carboxylic acids fizz with NaHCO₃.';
 if(t==='none')m='A negative test only rules out the group that test detects. Other groups may still be there.';
 if(t==='tert')m='A tertiary alcohol has no H on its C–OH carbon, so it is not oxidised: the dichromate stays orange.';
 if(t==='mix')m='Each reagent has its own colour change: dichromate orange to green, bromine water orange to colourless, Tollens\' silver mirror.';
 if(t==='clear')m='Clear means see-through, and orange bromine water is already clear. The right word is colourless.';return m}
function quiz(){qn++;const[qq,ops]=QS[qn%QS.length],r=qn%3;qb.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});say('Challenge: '+qq);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),y=t==='ok';if(y){run++;A.win()}else{run=0;A.sound.miss()}
 fb.innerHTML=(y?`✓ Correct. ${run} in a row.`:'✗ '+hint(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move:()=>{},up:()=>{}});keys()}});
A.start()})})();
