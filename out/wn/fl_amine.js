/* Flagship – amines as bases and nucleophiles (ages 17–18): classify amines by counting carbons bonded to N (the
   (CH3)3C–NH2 trap is primary), protonate the N lone pair to make an ammonium salt, rank phenylamine < ammonia <
   ethylamine by lone-pair availability, run ammonia + bromoethane at different mole ratios to see why a mixture forms,
   then write the balanced equation (2NH3, NH4Br) with the right conditions. Challenge on the usual slips. */
(()=>{
const AM=[['ethylamine',['CH₂CH₃','H','H'],1],['2-methylpropan-2-amine',['C(CH₃)₃','H','H'],1],['dimethylamine',['CH₃','CH₃','H'],2],['trimethylamine',['CH₃','CH₃','CH₃'],3]];
const CL=['','primary','secondary','tertiary'];
const RX=[['CH₃CH₂NH₂ + HCl','CH₃CH₂',[['CH₃CH₂NH₃⁺ Cl⁻','ok'],['CH₃CH₂Cl + NH₃','sub'],['CH₃CH₂NH⁻ + H₂Cl⁺','rev']],'ethylammonium chloride'],
 ['(CH₃)₂NH + HNO₃','(CH₃)₂',[['(CH₃)₂NH₂⁺ NO₃⁻','ok'],['No reaction: amines are neutral','none'],['(CH₃)₂N⁻ + H₂NO₃⁺','rev']],'dimethylammonium nitrate']];
const BS=[['phenylamine','C₆H₅NH₂',4.6,'The lone pair spreads into the benzene ring, so it is less available for H⁺.'],['ammonia','NH₃',9.3,'No alkyl groups push electrons onto N, and no ring pulls the pair away.'],['ethylamine','CH₃CH₂NH₂',10.7,'The ethyl group pushes electron density onto N (positive inductive effect), so the pair grabs H⁺ more readily.']];
const RAT=[0.25,0.5,1,2,5,10,20];
function sim(r){const N=[r,0,0,0,0],k=[1,1.4,1.2,.8];let B=1;for(let i=0;i<40000&&B>1e-4;i++){const d=k.map((q,j)=>q*N[j]*B*.002);let s=d[0]+d[1]+d[2]+d[3];if(s>B){d.forEach((_,j)=>d[j]*=B/s);s=B}
 for(let j=0;j<4;j++){N[j]-=d[j];N[j+1]+=d[j]}B-=s}const t=N[1]+N[2]+N[3]+N[4];return N.slice(1).map(x=>Math.round(100*x/t))}
const PN=['CH₃CH₂NH₂','(CH₃CH₂)₂NH','(CH₃CH₂)₃N','(CH₃CH₂)₄N⁺ Br⁻'],PL=['primary','secondary','tertiary','quaternary'];
const COND=[['Excess ethanolic NH₃, heated in a sealed tube','ok'],['Aqueous NH₃ at room temperature','aq'],['Dilute HCl, heat under reflux','acid']];
VIS.reg('flagamine',c=>{let A,pad,quiz,qn=-1,row=0;
const P={tok:0,want:()=>{},i:0,got:[],ans:-1,rx:0,rok:0,rank:[],ri:3,dist:null,g1:0,g2:0,co:1,bp:0,cd:-1,eq:0,bad:'',flash:''};
const stage=()=>['class','prot','rank','mix','eq','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const sz=n=>Math.round(n*(A.narrow?1:1.15));
function put(g,s,x,y,n,o={}){g.font=`${o.w||600} ${sz(n)}px system-ui,sans-serif`;g.textAlign=o.a||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-16)}
function wrap(g,s,x,y,maxW,n,lh,o={}){g.font=`${o.w||600} ${sz(n)}px system-ui,sans-serif`;const out=[];let cur='';s.split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(g.measureText(t).width>maxW&&cur){out.push(cur);cur=w}else cur=t});out.push(cur);
 out.forEach((l,i)=>put(g,l,x,y+i*lh,n,{...o,max:maxW}));return out.length}
function panel(g,x,y,w,h,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(x,y,w,h,10);g.fill();g.lineWidth=lw||1.5;g.strokeStyle=edge||A.col.tx;A.paint.rrect(x,y,w,h,10);g.stroke()}
function nAtom(g,x,y,grp,plus,pair,hi){const C=A.col,R=Math.min(A.W,A.H)*.075,L=R*2.6,ang=[-Math.PI/2,Math.PI*5/6,Math.PI/6,Math.PI/2*3+Math.PI];
 grp.forEach((t,j)=>{const a=ang[j],ex=x+Math.cos(a)*L,ey=y+Math.sin(a)*L,isC=t!=='H';g.strokeStyle=isC&&hi?C.or:C.tx;g.lineWidth=isC&&hi?5:2.5;g.beginPath();g.moveTo(x,y);g.lineTo(ex,ey);g.stroke();
  g.fillStyle=A.mix(C.pn,isC?C.or:'#94a3b8',C.dark?.25:.3);g.beginPath();g.arc(ex,ey,R*(isC?1.2:.8),0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();put(g,t,ex,ey,isC?11:13,{w:800,max:R*2.6})});
 g.fillStyle=A.mix(C.pn,C.cy,C.dark?.35:.3);g.beginPath();g.arc(x,y,R,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();put(g,plus?'N⁺':'N',x,y,16,{w:800});
 if(pair){g.fillStyle=C.tx;[-1,1].forEach(s=>{g.beginPath();g.arc(x+s*R*.35,y+R*1.45,R*.17,0,7);g.fill()})}}
function draw(A){const{ctx:g,W,H,col:C}=A,s=stage();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.06:.35);g.fillRect(0,0,W,H);
 if(s==='quiz'){put(g,'Count C on N. Follow the lone pair.',W/2,H*.38,15,{w:800});put(g,'Excess NH₃ for the primary amine.',W/2,H*.56,14);return}
 if(s==='class'){const[nm,grp,k]=AM[P.i%4],done=P.ans>=0;put(g,nm,W/2,H*.07,14,{w:800});nAtom(g,W/2,H*.5,grp,0,1,done);
  put(g,done?`${k} carbon${k>1?'s':''} bonded to N → ${CL[k]}`:'How many carbons are bonded directly to N?',W/2,H*.88,12,{w:700});put(g,'Classified: '+P.got.length+' of 4',W/2,H*.96,11,{w:700})}
 if(s==='prot'){const r=RX[P.rx%2],ok=P.rok>P.rx;put(g,r[0],W/2,H*.07,14,{w:800});
  if(P.rx===0)nAtom(g,W/2,H*.5,['CH₂CH₃','H','H',...(ok?['H']:[])],ok,!ok,0);else nAtom(g,W/2,H*.5,['CH₃','CH₃','H',...(ok?['H']:[])],ok,!ok,0);
  if(!ok){const x=W/2,y=H*.5+Math.min(W,H)*.075*1.45;g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(x,y+8);g.quadraticCurveTo(x+W*.12,y+H*.12,x+W*.26,y+H*.06);g.stroke();put(g,'H⁺',x+W*.32,y+H*.06,15,{w:800})}
  put(g,ok?r[3]+': N now has 4 bonds and a + charge':'The lone pair on N accepts H⁺ (dative bond)',W/2,H*.93,12,{w:700})}
 if(s==='rank'){const bw=(W-40)/3;BS.forEach(([nm,f,pk],j)=>{const x=14+j*(bw+6),pos=P.rank.indexOf(j),h=H*.58,y=H*.12;panel(g,x,y,bw,h,A.alpha(pos>=0?C.gr:C.cy,.12),P.bad===String(j)?C.rd:C.tx,P.bad===String(j)?3.5:1.5);
   put(g,f,x+bw/2,y+18,11,{w:800,max:bw-6});put(g,nm,x+bw/2,y+38,10,{max:bw-6});
   if(pos>=0){const fh=(h-70)*pk/11;g.fillStyle=A.alpha(C.gr,.55);g.fillRect(x+bw*.3,y+h-8-fh,bw*.4,fh);put(g,'pKaH '+pk,x+bw/2,y+h-18,10,{w:800});put(g,['weakest','middle','strongest'][pos],x+bw/2,y+60,10,{w:800})}});
  if(P.flash)wrap(g,P.flash,W/2,H*.8,W-30,11,sz(13),{w:700});put(g,'Ranked: '+P.rank.length+' of 3 (weakest first)',W/2,H*.96,11,{w:700})}
 if(s==='mix'){const r=RAT[P.ri],tx=W*.12,tw=W*.76,ty=H*.12;put(g,'NH₃ : bromoethane = '+r+' : 1',W/2,H*.05,13,{w:800});g.fillStyle=A.alpha(C.tx,.25);g.fillRect(tx,ty-3,tw,6);
  RAT.forEach((v,j)=>{const x=tx+tw*j/6;put(g,String(v),x,ty+28,9)});const kx=tx+tw*P.ri/6;g.fillStyle=C.vi;g.beginPath();g.arc(kx,ty,13,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  const d=P.dist,bh=H*.1;PN.forEach((n,j)=>{const y=H*.3+j*(bh+8),v=d?d[j]:0;g.fillStyle=A.alpha([C.gr,C.or,C.vi,C.rd][j],.5);g.fillRect(W*.36,y,(W*.58)*v/100,bh);g.strokeStyle=C.tx;g.lineWidth=1;g.strokeRect(W*.36,y,W*.58,bh);
   put(g,PL[j],W*.34,y+bh*.32,10,{a:'right',w:800});put(g,n,W*.34,y+bh*.75,9,{a:'right',max:W*.33});if(d)put(g,v+'%',W*.38,y+bh/2,11,{a:'left',w:800})});
  put(g,(P.g1?'✅':'⬜')+' 90%+ primary   '+(P.g2?'✅':'⬜')+' quaternary main',W/2,H*.84,11,{w:700});if(P.flash)wrap(g,P.flash,W/2,H*.91,W-24,10,sz(12),{w:600});}
 if(s==='eq'){put(g,'Make ethylamine from bromoethane',W/2,H*.07,13,{w:800});const bad=P.bad;
  const seg=[['CH₃CH₂Br + ',0],[(P.co===1?'':P.co)+'NH₃',bad==='co'],[' → CH₃CH₂NH₂ + ',0],[P.bp?'NH₄Br':'HBr',bad==='bp']];g.font=`800 ${sz(14)}px system-ui,sans-serif`;
  let tw=seg.reduce((a,[t])=>a+g.measureText(t).width,0),x=(W-tw)/2;const y=H*.32;seg.forEach(([t,b])=>{const w=g.measureText(t).width;if(b){g.strokeStyle=C.rd;g.lineWidth=3;g.strokeRect(x-3,y-16,w+6,32)}put(g,t,x,y,14,{a:'left',w:800});x+=w});
  panel(g,14,H*.46,W-28,H*.2,A.alpha(P.cd>=0?C.cy:C.tx,.08),bad==='cd'?C.rd:C.tx,bad==='cd'?3:1.5);wrap(g,P.cd>=0?COND[P.cd][0]:'Conditions: not chosen yet',W/2,H*.53,W-50,12,sz(14),{w:700});
  if(P.flash)wrap(g,P.flash,W/2,H*.76,W-30,11,sz(13),{w:700});put(g,P.eq?'✅ Balanced, with the right by-product and conditions':'Set the equation, then tap Check',W/2,H*.95,11,{w:700})}
 A.fx.draw(g)}
const nope=t=>{A.sound.miss();speak(t);buttons();A.redraw()},good=t=>{A.sound.pop();speak(t);buttons();A.redraw();P.want()};
function classify(k){if(P.got.length>=4||P.ans>=0)return;const[nm,grp,real]=AM[P.i%4];
 if(k!==real){P.bad='c';return nope(P.i%4===1&&k===3?'The central carbon has three methyls, but only ONE carbon is bonded to N. Count C on N, not on C.':`Count the carbons bonded to N: there ${real>1?'are':'is'} ${real}. ${nm} is ${CL[real]}.`)}
 P.ans=k;P.got.push(P.i);P.bad='';if(P.got.length>=4)return good('All four classified by counting carbons on nitrogen.');A.sound.tick();speak(nm+' is '+CL[k]+'.');A.redraw();const t=P.tok;setTimeout(()=>{if(t===P.tok){P.i++;P.ans=-1;buttons();A.redraw()}},A.reduced()?20:450)}
function prot(j){if(P.rok>=2||P.rok>P.rx)return;const[,,ops,name]=RX[P.rx],tag=ops[j][1];
 if(tag!=='ok')return nope(tag==='sub'?'That swaps groups like a substitution. An acid just gives H⁺ to the lone pair on N.':tag==='none'?'Amines are bases: the N lone pair accepts H⁺ from the acid.':'Backwards: N gains H⁺. The amine is the proton acceptor, not the donor.');
 P.rok++;if(P.rok>=2)return good('Both salts formed: the lone pair on N accepted H⁺.');A.sound.tick();speak('Yes: '+name+'.');A.redraw();const t=P.tok;setTimeout(()=>{if(t===P.tok){P.rx=1;buttons();A.redraw()}},A.reduced()?20:800)}
function rank(j){if(P.rank.length>=3||P.rank.includes(j))return;const want=P.rank.length;
 if(j!==want){P.bad=String(j);P.flash=want===0?(j===2?'Ethylamine is the STRONGEST: the alkyl group feeds electrons to N.':'Ammonia is beaten for weakness: in phenylamine the lone pair is pulled into the ring.'):'Ethylamine is stronger than ammonia: its alkyl group pushes electrons onto N.';return nope(P.flash)}
 P.bad='';P.rank.push(j);P.flash=BS[j][3];if(P.rank.length>=3)return good('Phenylamine < ammonia < ethylamine. More available lone pair, stronger base.');A.sound.tick();speak(BS[j][0]+' placed. '+BS[j][3]);A.redraw()}
function setR(i){i=Math.max(0,Math.min(6,i));if(i===P.ri)return;P.ri=i;P.dist=null;P.flash='';A.sound.tick();speak('Ratio '+RAT[i]+' to 1. Tap Run.');buttons();A.redraw()}
function run(){if(P.g1&&P.g2)return;const r=RAT[P.ri],d=sim(r);P.dist=d;
 if(d[0]>=90){P.g1=1;P.flash='Lots of NH₃ means bromoethane nearly always meets NH₃, not the ethylamine already made.'}
 else if(d[3]>=50){P.g2=1;P.flash='Excess bromoethane keeps alkylating N until it has 4 groups: a quaternary ammonium salt.'}
 else P.flash=`Only ${d[0]}% primary. The ethylamine made is also a nucleophile, so it attacks bromoethane too.`;
 if(P.g1&&P.g2)return good('Ratio controls the mixture: excess ammonia for the primary amine, excess haloalkane for the quaternary salt.');speak(P.flash);(d[0]>=90||d[3]>=50?A.sound.pop:A.sound.miss)();buttons();A.redraw()}
function check(){if(P.eq)return;if(P.co!==2){P.bad='co';P.flash='One NH₃ is not enough. A second NH₃ takes the H⁺, so you need 2NH₃.';return nope(P.flash)}
 if(!P.bp){P.bad='bp';P.flash='HBr cannot stay free with excess ammonia around. It reacts to give NH₄Br.';return nope(P.flash)}
 if(P.cd!==0){P.bad='cd';P.flash=P.cd<0?'Choose the conditions too.':P.cd===1?'Aqueous ammonia brings water and OH⁻, which compete. Use ethanol, and seal it so NH₃ gas stays in when heated.':'Acid turns NH₃ into NH₄⁺, which has no lone pair, so it cannot attack.';return nope(P.flash)}
 P.eq=1;P.bad='';P.flash='CH₃CH₂Br + 2NH₃ → CH₃CH₂NH₂ + NH₄Br, in excess ethanolic NH₃, heated in a sealed tube.';good('Balanced: two ammonia, ammonium bromide, sealed tube.')}
function buttons(){if(!pad)return;pad.innerHTML='';const s=stage(),K=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},pad,t);b.onclick=f};
 if(s==='class'&&P.got.length<4&&P.ans<0)[1,2,3].forEach(k=>K(CL[k],()=>classify(k),'Classify as '+CL[k]));
 if(s==='prot'&&P.rok<2&&P.rok<=P.rx)RX[P.rx][2].forEach(([t],j)=>K(t,()=>prot(j),'Product: '+t));
 if(s==='rank'&&P.rank.length<3)BS.forEach(([nm,f],j)=>{if(!P.rank.includes(j))K(f+' '+nm,()=>rank(j),'Place '+nm+' next, weakest first')});
 if(s==='mix'&&!(P.g1&&P.g2)){K('− less NH₃',()=>setR(P.ri-1),'Less ammonia');K('+ more NH₃',()=>setR(P.ri+1),'More ammonia');K('▶ Run',run,'Run the reaction')}
 if(s==='eq'&&!P.eq){K((P.co===1?'1':'2')+' NH₃ ↻',()=>{P.co=3-P.co;P.bad='';A.sound.tick();buttons();A.redraw()},'Ammonia coefficient, now '+P.co+'. Switch');K('By-product: '+(P.bp?'NH₄Br':'HBr')+' ↻',()=>{P.bp=1-P.bp;P.bad='';A.sound.tick();buttons();A.redraw()},'Switch by-product');
  COND.forEach(([t],j)=>K((P.cd===j?'● ':'○ ')+t,()=>{P.cd=j;P.bad='';A.sound.tick();buttons();A.redraw()},'Conditions: '+t));K('✔ Check',check,'Check the equation and conditions')}}
let drag=0;function down(p){if(stage()==='rank'&&p.y>A.H*.12&&p.y<A.H*.7){rank(Math.max(0,Math.min(2,Math.floor((p.x-14)/((A.W-40)/3+6)))));return true}if(stage()!=='mix'||Math.abs(p.y-A.H*.12)>28)return false;drag=1;move(p);return true}
function move(p){if(drag)setR(Math.round((p.x-A.W*.12)/(A.W*.76)*6))}function up(){drag=0}
const fin=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const t=++P.tok;fns.forEach((f,j)=>setTimeout(()=>{if(t===P.tok)f()},A.reduced()?j*30+30:(j+1)*ms))};
const clear=()=>{P.tok++;drag=0;Object.assign(P,{want:()=>{},i:0,got:[],ans:-1,rx:0,rok:0,rank:[],ri:3,dist:null,g1:0,g2:0,co:1,bp:0,cd:-1,eq:0,bad:'',flash:''})};
const steps=[
{h:'Primary, secondary or tertiary?',p:'Count the carbons bonded directly to the nitrogen. One is primary, two secondary, three tertiary.',
 predict:{q:'(CH₃)₃C–NH₂ has its N on a carbon joined to three others. What class of amine is it?',opts:['Tertiary, like the alcohol','Primary'],ans:1},task:'Classify 4 amines',
 show:()=>{steps[0].go();play([()=>classify(1),()=>classify(1),()=>classify(2),()=>classify(3)],520)},
 go:()=>{clear();speak('Count carbons bonded to N.');buttons();P.want=fin(0,()=>P.got.length>=4,'Amines are classed by carbons on N, not carbons on the C–N carbon as alcohols are.')}},
{h:'The lone pair takes H⁺',p:'An amine is a base. Pick the product when each amine meets an acid.',task:'Form 2 ammonium salts',
 show:()=>{steps[1].go();play([()=>prot(0),()=>{},()=>{},()=>prot(0)],300)},
 go:()=>{clear();speak('The amine meets an acid. What forms?');buttons();P.want=fin(1,()=>P.rok>=2,'RNH₂ + H⁺ → RNH₃⁺: an ammonium salt, held by a dative N–H bond.')}},
{h:'Which base is strongest?',p:'Tap the weakest base first, then the next. The more available the lone pair, the stronger the base.',
 predict:{q:'Which is the strongest base?',opts:['Phenylamine, it has the biggest group','Ethylamine'],ans:1},task:'Rank 3 bases, weakest first',
 show:()=>{steps[2].go();play([()=>rank(0),()=>rank(1),()=>rank(2)],380)},
 go:()=>{clear();speak('Rank phenylamine, ammonia and ethylamine.');buttons();P.want=fin(2,()=>P.rank.length>=3,'Alkyl groups raise electron density on N; a benzene ring delocalises the pair away.')}},
{h:'Why a mixture?',p:'Ammonia attacks bromoethane. Drag the slider or use − and +, then Run. Simple model: each N attacks at a similar rate.',
 predict:{q:'Why does NH₃ + bromoethane give several amines?',opts:['The bromoethane is impure','The amine made is a nucleophile too'],ans:1},task:'Hit both goals',
 show:()=>{steps[3].go();play([()=>setR(5),run,()=>setR(0),run],380)},
 go:()=>{clear();speak('Set the ammonia to bromoethane ratio, then Run.');buttons();P.want=fin(3,()=>P.g1&&P.g2,'Each amine still has a lone pair, so it competes with NH₃. Excess NH₃ favours the primary amine.')}},
{h:'Write it properly',p:'Set the ammonia number, the by-product and the conditions. Then tap Check.',task:'Balance it with the right conditions',
 show:()=>{steps[4].go();play([()=>{P.co=2;A.redraw()},()=>{P.bp=1;A.redraw()},()=>{P.cd=0;A.redraw()},check],300)},
 go:()=>{clear();speak('Write the equation for making ethylamine.');buttons();P.want=fin(4,()=>P.eq,'The second NH₃ mops up HBr as NH₄Br.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.want()});
const QS=[['Classify CH₃CH₂NHCH₃.',[['Secondary','ok'],['Primary','one'],['Tertiary','three']]],
 ['Classify (CH₃)₃C–NH₂.',[['Primary','ok'],['Tertiary','alc'],['Quaternary','quat']]],
 ['Product of CH₃NH₂ + HCl?',[['CH₃NH₃⁺ Cl⁻, methylammonium chloride','ok'],['CH₃Cl + NH₃','sub'],['No reaction','none']]],
 ['Which is the weakest base?',[['Phenylamine','ok'],['Ammonia','nh3'],['Ethylamine','et']]],
 ['How do you get mostly ethylamine from bromoethane?',[['Use a large excess of ammonia','ok'],['Use excess bromoethane','exhal'],['Add dilute acid','acid']]],
 ['Which route gives a pure primary amine with no mixture?',[['Reduce a nitrile with LiAlH₄','ok'],['Excess bromoethane with NH₃','exhal'],['Aqueous NH₃ at room temperature','aq']]],
 ['In CH₃CH₂Br + 2NH₃ → CH₃CH₂NH₂ + X, X is…',[['NH₄Br','ok'],['HBr','hbr'],['Br₂','br2']]]];
function fix(t){let m='Count carbons on N, follow the lone pair, and use excess ammonia for the primary amine.';
 if(t==='one')m='N has two carbons on it: CH₃CH₂ and CH₃. That is secondary.';
 if(t==='three')m='Only two carbons are bonded to N; the third group is H. Secondary.';
 if(t==='alc')m='That is the alcohol rule. For amines count carbons on N: just one, so primary.';
 if(t==='quat')m='Quaternary means N⁺ with four carbons. Here N has one carbon and two H.';
 if(t==='sub')m='Acids protonate amines. The N lone pair takes H⁺ to make an ammonium salt.';
 if(t==='none')m='Amines are bases. The lone pair on N accepts H⁺ from HCl.';
 if(t==='nh3')m='Phenylamine is weaker still: its lone pair is delocalised into the ring.';
 if(t==='et')m='Ethylamine is the strongest of the three. The ethyl group pushes electrons onto N.';
 if(t==='exhal')m='Excess haloalkane drives on to secondary, tertiary and the quaternary salt.';
 if(t==='acid')m='Acid protonates NH₃ to NH₄⁺, which has no lone pair, so it cannot attack.';
 if(t==='aq')m='Excess ammonia still gives some mixture. Nitrile reduction makes only the primary amine.';
 if(t==='hbr')m='Free HBr reacts at once with the excess ammonia, so the by-product is NH₄Br.';
 if(t==='br2')m='No bromine is formed. Br leaves as Br⁻ and ends up in NH₄Br.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>grade(t)});speak('Challenge: '+q);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Right! In a row: '+row+'.':'✗ '+fix(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});buttons()}});
A.start()})})();
