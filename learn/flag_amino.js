/* Flagship – structure of α-amino acids (ages 17–18): find the amine group, carboxylic acid group, α-carbon and R group
   on alanine; build alanine round one carbon from fragments (OH, CHO and a second H are refused with what they would
   make); name glycine, alanine and serine systematically (the COOH carbon is C1); decide which α-carbons are chiral
   (all but glycine); and slide the pH to see the cation, zwitterion and anion of alanine (pKa 2.34 and 9.69).
   Challenge on the usual slips: β instead of α, OH for NH₂, the R group confused with a functional group, forgetting
   to count the COOH carbon, numbering from the wrong end, glycine called chiral, the zwitterion at every pH. */
(()=>{
const PARTS=[['amine group','N'],['carboxylic acid group','A'],['α-carbon','C'],['R group (side chain)','R']];
const FRAG=['NH₂','COOH','H','CH₃','OH','CHO'];
const AA=[['Glycine','H',0],['Alanine','CH₃',1],['Serine','CH₂OH',1],['Valine','CH(CH₃)₂',1]];
const NAMES=[['H',[['2-aminoethanoic acid','ok'],['aminomethanoic acid','count'],['1-aminoethanoic acid','num1']]],
 ['CH₃',[['2-aminopropanoic acid','ok'],['2-aminoethanoic acid','count'],['3-aminopropanoic acid','num3']]],
 ['CH₂OH',[['2-amino-3-hydroxypropanoic acid','ok'],['2-amino-1-hydroxypropanoic acid','num1'],['3-amino-2-hydroxypropanoic acid','swap']]]];
const PK1=2.34,PK2=9.69;
VIS.reg('flagamino',c=>{let A,pad,quiz,qn=-1,run1=0;
const B={tok:0,want:()=>{},ask:0,bad:'',slots:[null,null,null,null],sel:-1,nm:0,named:'',ch:0,ph:7,seen:{},drag:null,last:''};
const mode=()=>['groups','build','name','chiral','ph','quiz'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1:1.15));
function tx(g,s,x,y,n,col,w){g.font=`${w||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W*.9)}
const ctr=()=>({x:A.W*.5,y:A.H*.42}),arm=()=>Math.min(A.W*.2,A.H*.24);
const pos=k=>{const o=ctr(),a=arm();return[{x:o.x-a*1.1,y:o.y},{x:o.x+a*1.1,y:o.y},{x:o.x,y:o.y-a},{x:o.x,y:o.y+a}][k]};
function mol(g,C,grp,hi,ion,labs){const o=ctr();g.strokeStyle=C.tx;g.lineWidth=2.5;[0,1,2,3].forEach(k=>{const p=pos(k);g.beginPath();g.moveTo(o.x+(p.x-o.x)*.25,o.y+(p.y-o.y)*.25);g.lineTo(o.x+(p.x-o.x)*.62,o.y+(p.y-o.y)*.62);g.stroke()});
 const lab=labs||[ion&&ion[0]?ion[0]:'H₂N',ion&&ion[1]?ion[1]:'COOH','H',grp];
 [0,1,2,3].forEach(k=>{const p=pos(k),on=hi===k;if(on){g.fillStyle=A.alpha(C.gr,.25);g.beginPath();g.arc(p.x,p.y,arm()*.42,0,7);g.fill()}if(B.bad==='p'+k){g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.arc(p.x,p.y,arm()*.42,0,7);g.stroke()}tx(g,lab[k]==null?'?':lab[k],p.x,p.y,15,C.tx,800)});
 if(hi===4){g.fillStyle=A.alpha(C.gr,.25);g.beginPath();g.arc(o.x,o.y,arm()*.3,0,7);g.fill()}if(B.bad==='c'){g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.arc(o.x,o.y,arm()*.3,0,7);g.stroke()}tx(g,'C',o.x,o.y,16,C.tx,800)}
const chip=f=>({x:A.W*(.03+f*.16),y:A.H*.76,w:A.W*.145,h:A.H*.1});
const form=()=>B.ph<PK1?0:B.ph<PK2?1:2;
const FORMS=[['H₃N⁺','COOH','cation, overall charge +1'],['H₃N⁺','COO⁻','zwitterion, overall charge 0'],['H₂N','COO⁻','anion, overall charge −1']];
const bar=()=>({x:A.W*.08,y:A.H*.82,w:A.W*.84,h:A.H*.06});
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(m==='quiz'){tx(g,'H₂N–CHR–COOH',W/2,H*.4,20,C.tx,800);tx(g,'α-carbon carries NH₂, COOH, H and R',W/2,H*.58,12);return}
 if(m==='groups'){mol(g,C,'CH₃',-1);for(let k=0;k<Math.min(B.ask,4);k++){const t=PARTS[k][1],p=t==='N'?pos(0):t==='A'?pos(1):t==='R'?pos(3):ctr();tx(g,'✓ '+PARTS[k][0].split(' ')[0],p.x,p.y+arm()*.38,10,C.tx,700)}
  tx(g,'Alanine',W/2,H*.08,13,C.tx,800);tx(g,B.ask<4?'Tap the '+PARTS[B.ask][0]:'All four found!',W/2,H*.88,13,C.tx,800)}
 if(m==='build'){mol(g,C,'',-1,null,B.slots.map(x=>x==null?'?':x));FRAG.forEach((s,f)=>{const q=chip(f);g.fillStyle=A.alpha(B.sel===f?C.gr:C.cy,B.sel===f?.35:.14);A.paint.rrect(q.x,q.y,q.w,q.h,10);g.fill();g.strokeStyle=C.tx;g.lineWidth=B.sel===f?3:1.5;A.paint.rrect(q.x,q.y,q.w,q.h,10);g.stroke();tx(g,s,q.x+q.w/2,q.y+q.h/2,11,C.tx,800)});
  tx(g,'Build alanine, CH₃CH(NH₂)COOH',W/2,H*.07,12,C.tx,800);tx(g,B.sel>=0?'Now tap a ? bond':'Tap a fragment, then a ? bond',W/2,H*.94,11,C.tx,600)}
 if(m==='name'){const n=NAMES[B.nm%3];mol(g,C,n[0],-1);tx(g,'Name it',W/2,H*.08,13,C.tx,800);tx(g,B.named||'…',W/2,H*.86,12,B.bad?C.rd:C.tx,800)}
 if(m==='chiral'){const a=AA[Math.min(B.ch,3)];mol(g,C,a[1],-1);tx(g,a[0],W/2,H*.08,13,C.tx,800);tx(g,B.ch>=4?'All four checked':'Four different groups on the α-carbon?',W/2,H*.86,12,C.tx,800)}
 if(m==='ph'){const f=FORMS[form()];mol(g,C,'CH₃',-1,[f[0],f[1]]);tx(g,'Alanine at pH '+B.ph.toFixed(1),W/2,H*.07,13,C.tx,800);tx(g,f[2],W/2,H*.72,12,C.tx,800);const b=bar();
  [[0,PK1,C.rd],[PK1,PK2,C.gr],[PK2,14,C.cy]].forEach(([a,z,cl])=>{g.fillStyle=A.alpha(cl,.3);g.fillRect(b.x+b.w*a/14,b.y,b.w*(z-a)/14,b.h)});g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(b.x,b.y,b.w,b.h);
  const kx=b.x+b.w*B.ph/14;g.fillStyle=C.tx;g.beginPath();g.arc(kx,b.y+b.h/2,b.h*.75,0,7);g.fill();tx(g,'0',b.x,b.y+b.h*2,10,C.tx,600);tx(g,'14',b.x+b.w,b.y+b.h*2,10,C.tx,600);tx(g,'Forms seen: '+Object.keys(B.seen).length+' of 3',W/2,H*.96,11,C.tx,600)}
 A.fx.draw(g)}
const no=t=>{A.sound.miss();say(t);A.redraw()},yes=t=>{A.sound.pop();say(t);pads();A.redraw();B.want()};
function hit(t){if(B.ask>=4)return;const want=PARTS[B.ask][1];
 if(t!==want){B.bad=t==='C'?'c':'p'+({N:0,A:1,R:3,H:2}[t]);const m={N:'That is the amine group, NH₂.',A:'That is the carboxylic acid group, COOH.',C:'That is the α-carbon: it carries NH₂, COOH, H and R.',R:'That is the R group, the side chain. In alanine it is CH₃.',H:'That is just the hydrogen on the α-carbon.'}[t];return no(m+' Find the '+PARTS[B.ask][0]+'.')}
 B.bad='';B.ask++;yes(B.ask>=4?'All found. NH₂ and COOH sit on the same carbon, the α-carbon, with H and R.':'Yes. Now the '+PARTS[B.ask][0]+'.')}
function put(f,k){const sl=B.slots;if(sl.every(x=>x!=null))return;if(k==null)k=sl.indexOf(null);if(sl[k]!=null){return no('That bond is used. Pick an empty one.')}const s=FRAG[f];B.sel=-1;B.drag=null;B.bad='';
 if(s==='OH')return no('OH in place of NH₂ gives 2-hydroxypropanoic acid (lactic acid). An amino acid needs NH₂.');
 if(s==='CHO')return no('CHO is an aldehyde group. An amino acid needs NH₂ and COOH on the α-carbon.');
 if(sl.includes(s)){const m={'NH₂':'Two NH₂ groups is not alanine. It has one amine group.','COOH':'Two COOH groups would make a dicarboxylic acid. Alanine has one.','H':'Two H atoms makes glycine (R = H). Alanine\'s R group is CH₃.','CH₃':'Alanine has only one CH₃, its R group.'}[s];return no(m)}
 sl[k]=s;A.sound.tick();if(sl.every(x=>x!=null))return yes('Alanine: H₂N–CH(CH₃)–COOH. The four groups can sit in any of the four bonds.');say(s+' added. '+sl.filter(x=>x==null).length+' bonds left.');pads();A.redraw()}
function nameIt(t,s){if(B.nm>=3||B.named&&!B.bad)return;B.named=s;
 if(t!=='ok'){B.bad='n';const m={count:'Count the COOH carbon too. It is C1 of the chain.',num1:'C1 is the COOH carbon, so the NH₂ on the next carbon is on C2.',num3:'3-amino puts NH₂ on the end carbon. That is β-alanine, not an α-amino acid.',swap:'The NH₂ is on C2 and the OH is on C3. Number from the COOH carbon.'}[t];return no(m)}
 B.bad='';B.nm++;yes(B.nm>=3?'Three named. The COOH carbon is C1, so the α-carbon is always C2.':'Correct. Next one.');if(B.nm<3){const k=B.tok;setTimeout(()=>{if(k===B.tok){B.named='';pads();A.redraw()}},A.reduced()?20:700)}}
function chiral(v){if(B.ch>=4)return;const a=AA[B.ch];if(v!==a[2]){return no(a[2]?`${a[0]}'s α-carbon has H, ${a[1]}, NH₂ and COOH: four different groups, so it is chiral.`:'Glycine has two H atoms on the α-carbon, so it is not chiral. Its mirror image is the same molecule.')}
 B.ch++;yes(B.ch>=4?'Only glycine is not chiral. The others exist as two optical isomers.':a[0]+': '+(a[2]?'chiral':'not chiral')+'. Next.')}
function setPh(v){B.ph=Math.max(0,Math.min(14,Math.round(v*10)/10));const f=form();B.seen[f]=1;say('pH '+B.ph.toFixed(1)+': '+FORMS[f][2]+'.');A.redraw();if(Object.keys(B.seen).length>=3){pads();B.want()}}
function pads(){if(!pad)return;pad.innerHTML='';const m=mode(),K=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='groups'&&B.ask<4)[['H₂N','N'],['COOH','A'],['central C','C'],['CH₃','R'],['H','H']].forEach(([s,t])=>K(s,()=>hit(t),'Choose '+s));
 if(m==='build'&&!B.slots.every(x=>x!=null))FRAG.forEach((s,f)=>K('+ '+s,()=>put(f),'Add '+s+' to the next empty bond'));
 if(m==='name'&&B.nm<3&&!(B.named&&!B.bad)){const r=B.nm%3;NAMES[r][1].slice(r).concat(NAMES[r][1].slice(0,r)).forEach(([s,t])=>K(s,()=>nameIt(t,s)))}
 if(m==='chiral'&&B.ch<4){K('Chiral',()=>chiral(1),AA[B.ch][0]+' is chiral');K('Not chiral',()=>chiral(0),AA[B.ch][0]+' is not chiral')}
 if(m==='ph'){K('◀ pH −1',()=>setPh(B.ph-1),'Lower the pH by 1');K('pH +1 ▶',()=>setPh(B.ph+1),'Raise the pH by 1')}}
function down(p){const m=mode(),o=ctr(),r=arm()*.42;
 if(m==='groups'){if(Math.hypot(p.x-o.x,p.y-o.y)<arm()*.3){hit('C');return false}const t=['N','A','H','R'];for(let k=0;k<4;k++){const q=pos(k);if(Math.hypot(p.x-q.x,p.y-q.y)<r){hit(t[k]);return false}}}
 if(m==='build'){for(let f=0;f<FRAG.length;f++)if(p.x>chip(f).x&&p.x<chip(f).x+chip(f).w&&p.y>chip(f).y&&p.y<chip(f).y+chip(f).h){B.sel=f;say('Holding '+FRAG[f]+'. Tap a bond.');A.redraw();return false}
  if(B.sel>=0)for(let k=0;k<4;k++){const q=pos(k);if(Math.hypot(p.x-q.x,p.y-q.y)<r){put(B.sel,k);return false}}}
 if(m==='ph'){const b=bar();if(p.y>b.y-30&&p.y<b.y+b.h+30){B.drag=1;setPh((p.x-b.x)/b.w*14);return true}}return false}
function move(p){if(mode()==='ph'&&B.drag){const b=bar();setPh((p.x-b.x)/b.w*14)}}
function up(){B.drag=null}
const fin=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const t=++B.tok;fns.forEach((f,j)=>setTimeout(()=>{if(t===B.tok)f()},A.reduced()?j*30+30:(j+1)*ms))};
const reset=()=>{B.tok++;Object.assign(B,{want:()=>{},ask:0,bad:'',slots:[null,null,null,null],sel:-1,nm:0,named:'',ch:0,ph:7,seen:{},drag:null,last:''})};
const w0=()=>{};
const steps=[
{h:'Find the groups',p:'Alanine is an α-amino acid. Tap each part as it is named, on the molecule or with the buttons.',
 predict:{q:'In an α-amino acid, the NH₂ is bonded to…',opts:['The carbon furthest from COOH','The carbon next to COOH (the α-carbon)'],ans:1},task:'Find all 4 parts',
 show:()=>{steps[0].go();play(['N','A','C','R'].map(t=>()=>hit(t)),360)},
 go:()=>{reset();say('Alanine. Tap the amine group.');pads();B.want=fin(0,()=>B.ask>=4,'H₂N–CHR–COOH: amine and acid groups on one carbon, plus H and a side chain R.')}},
{h:'Build alanine',p:'Fill the four bonds on the α-carbon. Tap a fragment button, or tap a bond on the molecule after choosing one.',task:'Build alanine',
 show:()=>{steps[1].go();play([0,1,2,3].map(f=>()=>put(f)),360)},
 go:()=>{reset();say('Four empty bonds on the α-carbon. Build alanine.');pads();B.want=fin(1,()=>B.slots.every(x=>x!=null),'Every α-amino acid has NH₂, COOH and H on the α-carbon. Only R changes.')}},
{h:'Name it',p:'Name each amino acid. The chain includes the COOH carbon, which is C1.',
 predict:{q:'Alanine is CH₃CH(NH₂)COOH. Its stem is…',opts:['ethan- (the COOH carbon is not counted)','propan- (the COOH carbon is C1)'],ans:1},task:'Name 3 amino acids',
 show:()=>{steps[2].go();const o=()=>{const n=NAMES[B.nm%3][1][0];nameIt('ok',n[0])};play([o,w0,w0,o,w0,w0,o],330)},
 go:()=>{reset();say('Glycine has R = H. Name it.');pads();B.want=fin(2,()=>B.nm>=3,'Count from the COOH carbon: NH₂ is always on C2.')}},
{h:'Chiral or not?',p:'A carbon with four different groups is a chiral centre. Check each α-carbon.',
 predict:{q:'Are all α-amino acids chiral?',opts:['Yes, every one','All except glycine'],ans:1},task:'Check all 4',
 show:()=>{steps[3].go();play(AA.map(a=>()=>chiral(a[2])),360)},
 go:()=>{reset();say('Glycine. Is its α-carbon chiral?');pads();B.want=fin(3,()=>B.ch>=4,'Glycine (R = H) is the only common amino acid with no chiral centre.')}},
{h:'Charges and pH',p:'Drag along the pH bar, or use the buttons. Watch both groups gain or lose H⁺.',
 predict:{q:'Near pH 6, alanine is mostly…',opts:['Uncharged: H₂N–CHR–COOH','A zwitterion: H₃N⁺–CHR–COO⁻'],ans:1},task:'Find all 3 forms',
 show:()=>{steps[4].go();play([()=>setPh(1),()=>setPh(6),()=>setPh(12)],420)},
 go:()=>{reset();setPh(7);B.seen={};say('pH 7: a zwitterion. Now change the pH.');pads();B.want=fin(4,()=>Object.keys(B.seen).length>=3,'Acid protonates COO⁻, alkali removes H⁺ from NH₃⁺. Between, it is a zwitterion.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>B.want()});
const QS=[['Which is the general formula of an α-amino acid?',[['H₂N–CHR–COOH','ok'],['H₂N–CH₂–CHR–COOH','beta'],['HO–CHR–COOH','hydroxy']]],
 ['In alanine, CH₃CH(NH₂)COOH, the R group is…',[['CH₃','ok'],['NH₂','amine'],['COOH','acid']]],
 ['Name CH₃CH(NH₂)COOH systematically.',[['2-aminopropanoic acid','ok'],['2-aminoethanoic acid','count'],['1-aminopropanoic acid','num1']]],
 ['Which amino acid has no chiral centre?',[['Glycine','ok'],['Alanine','alan'],['Serine','ser']]],
 ['At pH 1, alanine is mainly…',[['H₃N⁺–CH(CH₃)–COOH','ok'],['H₃N⁺–CH(CH₃)–COO⁻','zw'],['H₂N–CH(CH₃)–COO⁻','anion']]],
 ['Which atom is the α-carbon?',[['The carbon bonded to both NH₂ and COOH','ok'],['The carbon in the COOH group','cooh'],['Any carbon in the R group','rgrp']]]];
function why(t){let m='An α-amino acid is H₂N–CHR–COOH: NH₂, COOH, H and R all on the α-carbon.';
 if(t==='beta')m='Here NH₂ is two carbons from COOH, a β-amino acid. In α-amino acids both groups share one carbon.';
 if(t==='hydroxy')m='HO in place of H₂N makes a hydroxy acid. An amino acid needs the NH₂ group.';
 if(t==='amine')m='NH₂ is in every amino acid. R is the part that changes: CH₃ in alanine.';
 if(t==='acid')m='COOH is in every amino acid. The R group is the side chain, CH₃.';
 if(t==='count')m='Ethanoic counts only two carbons. With the COOH carbon there are three: propanoic.';
 if(t==='num1')m='C1 is the COOH carbon itself. NH₂ is on the next carbon, C2.';
 if(t==='alan')m='Alanine\'s α-carbon has H, CH₃, NH₂ and COOH, four different groups, so it is chiral.';
 if(t==='ser')m='Serine has CH₂OH as R, so its α-carbon has four different groups. It is chiral.';
 if(t==='zw')m='The zwitterion is the main form between about pH 2.3 and 9.7. At pH 1 the COO⁻ gains H⁺.';
 if(t==='anion')m='The anion forms in alkali. At pH 1 both groups are protonated: H₃N⁺ and COOH.';
 if(t==='cooh')m='The COOH carbon is C1. The α-carbon is the next one, which carries the NH₂.';
 if(t==='rgrp')m='R group carbons are further out. The α-carbon carries both NH₂ and COOH.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const rw=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},rw,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){run1++;A.win()}else{run1=0;A.sound.miss()}fb.innerHTML=(good?'✓ Correct. In a row: '+run1+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}});
A.start()})})();
