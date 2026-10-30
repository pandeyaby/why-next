/* Flagship – simple molecular substances (14–16): boil water, bonds vs forces, alkane boiling points, conduction, simple vs giant. */
(()=>{const mn=Math.min,mx=Math.max;
const ALK=[['methane','CH₄',1,16,-162],['propane','C₃H₈',3,44,-42],['pentane','C₅H₁₂',5,72,36],['octane','C₈H₁₈',8,114,126]];
const ORDER=[2,0,3,1];
const TEST=[['Pure water',0,'Water molecules have no overall charge, and there are no ions or free electrons.'],
 ['Sugar solution',0,'Sugar dissolves as whole molecules. Molecules have no charge, so the bulb stays off.'],
 ['Candle wax',0,'Wax is big alkane molecules: no charged particles that can move.'],
 ['Salt solution',1,'Salt is ionic, not molecular. Its ions are free to move in water, so it conducts.'],
 ['Copper wire',1,'A metal has free electrons that carry the current.'],
 ['Sulfur',0,'Sulfur is made of S₈ molecules. No ions or free electrons, so no current.']];
const SUBS=[['Oxygen','−218 °C',0],['Diamond','about 3550 °C',1],['Ice (water)','0 °C',0],['Sodium chloride','801 °C',1],['Iodine','114 °C',0],['Silicon dioxide','1710 °C',1],['Methane','−182 °C',0]];
const SWHY=['Low melting point: weak forces between small molecules. Simple molecular.','Very high melting point: millions of strong bonds must break. A giant structure.'];
VIS.reg('flagsimol',c=>{let A,pad,quiz,qi=-1,run=0;
const B0=()=>({want:()=>{},T:20,counted:0,link:0,sorted:[],seq:[],tested:[],cur:-1,k:0,won:0,tip:-1,note:'',grab:null,t:0}),S=B0();
const mode=()=>['heat','link','size','cond','giant','quiz'][A.step];
const fs=n=>Math.round(n*(A.narrow?.95:1.1)),R=()=>A.reduced();
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,n,al,col){g.font=`700 ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function wrap(g,t,x,y,w,n){g.font=`600 ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;const L=[];let cur='';
 t.split(' ').forEach(wd=>{const z=cur?cur+' '+wd:wd;if(g.measureText(z).width>w&&cur){L.push(cur);cur=wd}else cur=z});L.push(cur);const h=fs(n)*1.25;L.forEach((s,i)=>g.fillText(s,x,y+(i-(L.length-1)/2)*h))}
function water(g,x,y,r,a){const C=A.col,h=[[Math.cos(a+.9),Math.sin(a+.9)],[Math.cos(a-.9),Math.sin(a-.9)]];g.strokeStyle=C.tx;g.lineWidth=3;
 h.forEach(([u,v])=>{g.beginPath();g.moveTo(x,y);g.lineTo(x+u*r*1.6,y+v*r*1.6);g.stroke()});A.paint.ball(x,y,r,C.rd);h.forEach(([u,v])=>A.paint.ball(x+u*r*1.6,y+v*r*1.6,r*.6,A.mix(C.tx,'#ffffff',.5)))}
const state=()=>S.T<0?'solid':S.T<100?'liquid':'gas';
function spots(){const W=A.W*.72,H=A.H*.62,ox=A.W*.05,oy=A.H*.24,st=state(),n=8,out=[];
 for(let i=0;i<n;i++){let x,y;if(st==='solid'){x=ox+W*(.3+.14*(i%4));y=oy+H*(.62+.2*Math.floor(i/4))}
  else if(st==='liquid'){x=ox+W*(.22+.16*(i%4)+.05*Math.sin(i*7.3));y=oy+H*(.6+.17*Math.floor(i/4)+.04*Math.cos(i*3.1))}
  else{x=ox+W*(.12+.76*((i*.37)%1));y=oy+H*(.1+.8*((i*.61+.13)%1))}
  const j=R()?0:st==='solid'?2:st==='liquid'?4:9;out.push({x:x+j*Math.sin(S.t*6+i*2),y:y+j*Math.cos(S.t*5+i*3),a:i*1.3+(st==='solid'?0:S.t*(st==='gas'?2:.6))})}return out}
const therm=()=>({x:A.W*.86,y:A.H*.2,w:mx(22,A.W*.05),h:A.H*.66});
const tY=T=>{const t=therm();return t.y+t.h*(1-(T+40)/180)};
function heatDraw(g){const C=A.col,P=spots(),st=state(),r=mn(A.W,A.H)*.03;g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(A.W*.05,A.H*.24,A.W*.72,A.H*.62);
 if(st!=='gas'){g.setLineDash([3,5]);g.strokeStyle=A.alpha(C.cy,.9);g.lineWidth=2;P.forEach((p,i)=>P.forEach((q,j)=>{if(j>i&&Math.hypot(p.x-q.x,p.y-q.y)<A.W*.14){g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke()}}));g.setLineDash([])}
 P.forEach(p=>water(g,p.x,p.y,r,p.a));const t=therm();g.fillStyle=A.alpha(C.tx,.08);A.paint.rrect(t.x,t.y,t.w,t.h,t.w/2);g.fill();g.strokeStyle=C.tx;A.paint.rrect(t.x,t.y,t.w,t.h,t.w/2);g.stroke();
 g.fillStyle=C.rd;const y=tY(S.T);A.paint.rrect(t.x+4,y,t.w-8,t.y+t.h-y-4,(t.w-8)/2);g.fill();[0,100].forEach(v=>{g.strokeStyle=C.tx;g.beginPath();g.moveTo(t.x-6,tY(v));g.lineTo(t.x,tY(v));g.stroke();txt(g,v+'°',t.x-8,tY(v),10,'right')});
 txt(g,`${Math.round(S.T)} °C: ${st}`,A.W*.41,A.H*.17,14);if(S.counted)txt(g,'8 H₂O molecules, 0 loose H or O atoms',A.W*.41,A.H*.93,12)}
function links(){const W=A.W,H=A.H,M=[[W*.25,H*.45],[W*.55,H*.4],[W*.4,H*.75]],r=mn(W,H)*.045,L=[];
 M.forEach(([x,y],m)=>[-.6,.6].forEach((d,k)=>{const a=-1.57+d+m;L.push({b:1,x1:x,y1:y,x2:x+Math.cos(a)*r*2,y2:y+Math.sin(a)*r*2})}));
 [[0,1],[1,2],[0,2]].forEach(([i,j])=>L.push({b:0,x1:M[i][0],y1:M[i][1],x2:M[j][0],y2:M[j][1]}));return{M,r,L:[0,6,1,7,3,8,4,2,5].map(i=>L[i])}}
function linkDraw(g){const C=A.col,{M,r,L}=links();L.forEach((l,i)=>{const done=S.sorted.includes(i),on=i===S.link,dx=l.x2-l.x1,dy=l.y2-l.y1,d=Math.hypot(dx,dy),s=l.b?0:r*1.05/d;
  g.strokeStyle=on?C.or:done?(l.b?C.tx:C.cy):A.alpha(C.tx,.45);g.lineWidth=on?6:done?(l.b?4:2.5):3;if(done&&!l.b)g.setLineDash([5,6]);g.beginPath();g.moveTo(l.x1+dx*s,l.y1+dy*s);g.lineTo(l.x2-dx*s,l.y2-dy*s);g.stroke();g.setLineDash([]);});
 M.forEach(([x,y])=>A.paint.ball(x,y,r,C.rd));L.forEach(l=>{if(l.b)A.paint.ball(l.x2,l.y2,r*.6,A.mix(C.tx,'#ffffff',.5))});txt(g,`Sorted ${S.sorted.length} of ${L.length} lines`,A.W/2,A.H*.1,13);txt(g,'Sorted: solid = bond, dashed = force',A.W/2,A.H*.1+18,10)}
const cards=()=>{const w=(A.W-16-18)/4;return ORDER.map((_,i)=>({x:8+i*(w+6),y:A.H*.76,w,h:A.H*.2}))};
function sizeDraw(g){const C=A.col,top=A.H*.14,bot=A.H*.66,y=T=>bot-(T+180)/320*(bot-top);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(40,top);g.lineTo(40,bot);g.stroke();
 [-150,-50,50,150].forEach(v=>txt(g,v+'°',34,y(v),10,'right'));g.setLineDash([4,4]);g.strokeStyle=C.gr;g.beginPath();g.moveTo(40,y(20));g.lineTo(A.W-8,y(20));g.stroke();g.setLineDash([]);txt(g,'room temperature 20 °C',46,y(20)+9,10,'left');
 S.seq.forEach((k,i)=>{const[n,f,,m,bp]=ALK[k],yy=y(bp);g.fillStyle=C.tx;g.beginPath();g.arc(40,yy,5,0,7);g.fill();chain(g,60,yy,ALK[k][2],mn(14,(A.W*.4)/8));txt(g,`${n} ${f}  Mr ${m}  boils ${bp} °C`,A.W-10,yy,11,'right')});
 cards().forEach((r,i)=>{const k=ORDER[i];if(S.seq.includes(k))return;const bad=S.tip===k;g.fillStyle=A.alpha(bad?C.rd:C.vi,.2);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=C.tx;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke();
  txt(g,ALK[k][0],r.x+r.w/2,r.y+r.h*.3,11);txt(g,ALK[k][1],r.x+r.w/2,r.y+r.h*.68,12)})}
function chain(g,x,y,n,s){const C=A.col;for(let i=0;i<n;i++){if(i){g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x+(i-1)*s,y);g.lineTo(x+i*s,y);g.stroke()}g.fillStyle=C.tx;g.beginPath();g.arc(x+i*s,y,s*.32,0,7);g.fill()}}
const jars=()=>{const w=(A.W-16-25)/6;return TEST.map((_,i)=>({x:8+i*(w+5),y:A.H*.72,w,h:A.H*.24}))};
function condDraw(g){const C=A.col,on=S.cur>=0&&TEST[S.cur][1],bx=A.W/2,by=A.H*.2;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(A.W*.2,A.H*.5);g.lineTo(A.W*.2,by);g.lineTo(A.W*.8,by);g.lineTo(A.W*.8,A.H*.5);g.lineTo(A.W*.6,A.H*.5);g.moveTo(A.W*.4,A.H*.5);g.lineTo(A.W*.2,A.H*.5);g.stroke();
 if(on){A.paint.glow(C.or,30);g.fillStyle=C.or}else g.fillStyle=A.alpha(C.tx,.15);g.beginPath();g.arc(bx,by,A.H*.06,0,7);g.fill();A.paint.noShadow();g.strokeStyle=C.tx;g.stroke();
 g.strokeRect(A.W*.4,A.H*.42,A.W*.2,A.H*.16);wrap(g,S.cur>=0?TEST[S.cur][0]:'test gap',A.W/2,A.H*.5,A.W*.2-6,10);txt(g,`Tested ${S.tested.length} of 6`,A.W/2,A.H*.65,12);
 jars().forEach((r,i)=>{const done=S.tested.includes(i);g.fillStyle=A.alpha(done?(TEST[i][1]?C.or:C.cy):C.tx,.18);A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;A.paint.rrect(r.x,r.y,r.w,r.h,8);g.stroke();wrap(g,TEST[i][0]+(done?(TEST[i][1]?' ✓':' ✗'):''),r.x+r.w/2,r.y+r.h/2,r.w-6,10)})}
const bins=()=>{const w=A.W*.45,h=A.H*.3;return[{x:8,y:A.H-h-8,w,h},{x:A.W-w-8,y:A.H-h-8,w,h}]};
function giantDraw(g){const C=A.col;bins().forEach((b,i)=>{g.fillStyle=A.alpha(i?C.vi:C.cy,.16);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=C.tx;g.setLineDash([6,5]);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.stroke();g.setLineDash([]);
  wrap(g,i?'Giant structure':'Simple molecular',b.x+b.w/2,b.y+fs(16),b.w-10,12);wrap(g,SUBS.filter(s=>s[2]===i&&S.sorted.includes(s[0])).map(s=>s[0]).join(', '),b.x+b.w/2,b.y+b.h*.6,b.w-12,10)});
 if(S.k<SUBS.length){const[n,mp]=SUBS[S.k],p=S.grab&&S.grab.x!=null?S.grab:{x:A.W/2,y:A.H*.3},w=mn(A.W*.6,260),h=A.H*.2;g.fillStyle=A.alpha(S.tip>=0?C.rd:C.or,.22);A.paint.rrect(p.x-w/2,p.y-h/2,w,h,10);g.fill();g.strokeStyle=C.tx;A.paint.rrect(p.x-w/2,p.y-h/2,w,h,10);g.stroke();
  txt(g,n,p.x,p.y-h*.18,14);txt(g,'melts at '+mp,p.x,p.y+h*.2,12)}txt(g,`Sorted ${S.k} of ${SUBS.length}`,A.W/2,A.H*.1,12)}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='heat')heatDraw(g);if(v==='link')linkDraw(g);if(v==='size')sizeDraw(g);if(v==='cond')condDraw(g);if(v==='giant')giantDraw(g);
 if(v==='quiz')water(g,W/2,H/2,mn(W,H)*.07,0);
 A.fx.draw(g)}
const miss=(t,k)=>{A.sound.miss();S.tip=k==null?0:k;speak(t);setTimeout(()=>{S.tip=-1;A.redraw()},R()?10:800);buttons();A.redraw()};
const good=t=>{A.sound.pop();S.tip=-1;speak(t);buttons();A.redraw();S.want()};
function setT(T){if(mode()!=='heat')return;S.T=mx(-40,mn(140,T));const st=state();speak(`${Math.round(S.T)} °C. Water is a ${st}.${st==='gas'?' The molecules are far apart.':''}`);buttons();A.redraw()}
function countGas(){if(mode()!=='heat')return;if(state()!=='gas')return miss('Heat it past 100 °C first, so it boils.');S.counted=1;good('Still 8 whole H₂O molecules. Boiling pulled the molecules apart; no covalent bond broke.')}
function sortLink(kind,i){if(mode()!=='link')return;const{L}=links();if(i!=null){if(S.sorted.includes(i))return speak('That line is sorted already.');S.link=i}const l=L[S.link];if(!l)return;
 if((kind===1)!==!!l.b)return miss(l.b?'This line joins atoms inside one molecule: a strong covalent bond.':'This line is between two separate molecules: a weak intermolecular force.');
 S.sorted.push(S.link);const left=L.map((_,j)=>j).filter(j=>!S.sorted.includes(j));if(left.length){S.link=left[0];A.sound.tick();speak(l.b?'Covalent bond, strong.':'Intermolecular force, weak.');buttons();return A.redraw()}
 S.link=-1;good('6 strong covalent bonds inside molecules, 3 weak forces between them.')}
function pickAlk(k){if(mode()!=='size'||S.seq.length>=4)return;const want=[0,1,2,3].find(j=>!S.seq.includes(j));if(S.seq.includes(k))return;
 if(k!==want)return miss(`${ALK[k][0]} is bigger than ${ALK[want][0]}, so its intermolecular forces are stronger and it boils higher. Pick a smaller molecule.`,k);
 S.seq.push(k);if(S.seq.length<4){A.sound.tick();speak(`${ALK[k][0]} boils at ${ALK[k][4]} °C.`);buttons();return A.redraw()}good('Bigger molecules, stronger forces between them, higher boiling point.')}
function test(i){if(mode()!=='cond')return;S.cur=i;if(!S.tested.includes(i))S.tested.push(i);const[n,on,w]=TEST[i];speak(`${n}: ${on?'the bulb lights.':'the bulb stays off.'} ${w}`);
 if(S.tested.length<6){A.sound.tick();buttons();return A.redraw()}good(`${n}: ${on?'lights':'off'}. Simple molecular substances do not conduct.`)}
function sortSub(b){if(mode()!=='giant'||S.k>=SUBS.length)return;S.grab=null;const[n,mp,ok]=SUBS[S.k];
 if(b!==ok)return miss(ok?`${n} melts at ${mp}. That needs strong bonds to break all through it: a giant structure.`:`${n} melts at ${mp}.${n==='Iodine'||n==='Ice (water)'?' It is a solid at room temperature, but':''} Its molecules are held by weak forces, so it is simple molecular.`);
 S.sorted.push(n);S.k++;if(S.k<SUBS.length){A.sound.tick();speak(SWHY[ok]);buttons();return A.redraw()}good(SWHY[ok])}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='heat'){B('− Cool 20 °C',()=>setT(S.T-20));B('+ Heat 20 °C',()=>setT(S.T+20));B('Count what is in the gas',countGas)}
 if(v==='link'&&S.link>=0){B('Covalent bond (strong)',()=>sortLink(1),'The orange line is a covalent bond');B('Force between molecules (weak)',()=>sortLink(0),'The orange line is an intermolecular force')}
 if(v==='size'&&S.seq.length<4)ORDER.forEach(k=>{if(!S.seq.includes(k))B(`${ALK[k][0]} ${ALK[k][1]}`,()=>pickAlk(k),`Place ${ALK[k][0]} next`)});
 if(v==='cond')TEST.forEach(([n],i)=>B(n,()=>test(i),'Test '+n));
 if(v==='giant'&&S.k<SUBS.length){B('Simple molecular',()=>sortSub(0));B('Giant structure',()=>sortSub(1))}A.redraw()}
const within=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function segD(p,l){const dx=l.x2-l.x1,dy=l.y2-l.y1,t=mx(0,mn(1,((p.x-l.x1)*dx+(p.y-l.y1)*dy)/(dx*dx+dy*dy)));return Math.hypot(p.x-l.x1-t*dx,p.y-l.y1-t*dy)}
function down(p){const v=mode();
 if(v==='heat'){const t=therm();if(Math.abs(p.x-(t.x+t.w/2))<t.w*1.5){S.grab={th:1};move(p);return true}return false}
 if(v==='link'){const{L}=links();let b=-1,d=24;L.forEach((l,i)=>{const e=segD(p,l);if(e<d&&!S.sorted.includes(i)){d=e;b=i}});if(b>=0){S.link=b;speak('Line picked. Bond or force?');buttons()}return false}
 if(v==='size'){const i=cards().findIndex(r=>within(p,r));if(i>=0)pickAlk(ORDER[i]);return false}
 if(v==='cond'){const i=jars().findIndex(r=>within(p,r));if(i>=0)test(i);return false}
 if(v==='giant'&&S.k<SUBS.length&&Math.abs(p.y-A.H*.3)<A.H*.12){S.grab={x:null,y:null};return true}return false}
function move(p){if(!S.grab)return;if(S.grab.th){const t=therm();S.T=mx(-40,mn(140,Math.round((1-(p.y-t.y)/t.h)*180-40)));return A.redraw()}S.grab.x=p.x;S.grab.y=p.y;A.redraw()}
function up(p){const d=S.grab;if(!d)return;S.grab=null;if(d.th)return setT(S.T);const b=bins().findIndex(r=>within(p,r));if(b<0){speak('Drop it in a box.');return A.redraw()}sortSub(b)}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*320))}
const fresh=()=>{run++;Object.assign(S,B0())};
const steps=[
{h:'Boil it',p:'Drag the thermometer or use the buttons. The dashed lines are the weak forces between water molecules.',
 predict:{q:'Water boils at 100 °C. What gets overcome when it boils?',opts:['The O–H covalent bonds','The weak forces between molecules'],ans:1},task:'Boil the water, then count what is in the gas',
 show:()=>{steps[0].go();play([...[40,60,80,100,120].map(T=>()=>setT(T)),countGas])},go:()=>{fresh();speak('Water at 20 °C. Heat it.');buttons();S.want=check(0,()=>S.counted,'Boiling separates whole molecules. The covalent bonds stay.')}},
{h:'Bond or force?',p:'The orange line is picked. Is it a covalent bond inside a molecule, or a force between molecules? Tap any line to pick it.',
 predict:{q:'Which is stronger?',opts:['A force between two molecules','A covalent bond inside a molecule'],ans:1},task:'Sort all 9 lines',
 show:()=>{steps[1].go();const{L}=links();play(L.map(l=>()=>sortLink(l.b?1:0)))},go:()=>{fresh();speak('Bond or force?');buttons();S.want=check(1,()=>S.sorted.length>=9,'Strong bonds inside, weak forces between.')}},
{h:'Bigger molecules',p:'Place the alkanes on the scale, lowest boiling point first. Tap a molecule card.',
 predict:{q:'Octane (C₈H₁₈) or methane (CH₄): which has the higher boiling point?',opts:['Methane: small molecules hold tighter','Octane'],ans:1},task:'Place all 4 in order',
 show:()=>{steps[2].go();play([0,1,2,3].map(k=>()=>pickAlk(k)))},go:()=>{fresh();speak('Which alkane boils lowest?');buttons();S.want=check(2,()=>S.seq.length>=4,'Larger molecules have stronger intermolecular forces, so the boiling point rises.')}},
{h:'Does it conduct?',p:'Tap each sample to put it in the circuit.',
 predict:{q:'Sugar dissolves in water. Will sugar solution light the bulb?',opts:['Yes: it is a solution','No'],ans:1},task:'Test all 6 samples',
 show:()=>{steps[3].go();play(TEST.map((_,i)=>()=>test(i)))},go:()=>{fresh();speak('Tap a sample to test it.');buttons();S.want=check(3,()=>S.tested.length>=6,'Molecules have no overall charge, so simple molecular substances do not conduct.')}},
{h:'Simple or giant?',p:'Use the melting point. Drag the card into a box, or use the buttons.',task:'Sort all 7 substances',
 show:()=>{steps[4].go();play(SUBS.map(s=>()=>sortSub(s[2])))},go:()=>{fresh();speak('Simple molecular or giant structure?');buttons();S.want=check(4,()=>S.k>=SUBS.length,'Low melting point points to simple molecules; very high points to a giant structure.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Why does water boil at only 100 °C, when O–H bonds are strong?',[['Only the weak forces between molecules are overcome','ok'],['The O–H bonds break at 100 °C','bond'],['Water has no bonds','none']]],
 ['Which alkane has the highest boiling point?',[['Octane, C₈H₁₈','ok'],['Methane, CH₄','small'],['They are all the same','same']]],
 ['Why does pure sulfur not conduct electricity?',[['Its molecules have no charge and there are no free electrons','ok'],['It is a solid','solid'],['Its covalent bonds are too strong','strong']]],
 ['Iodine is a solid at room temperature. What is its structure?',[['Simple molecular','ok'],['Giant covalent','solidg'],['Ionic','ion']]],
 ['What is in the steam above boiling water?',[['Whole H₂O molecules','ok'],['Hydrogen and oxygen atoms','bond'],['Hydrogen gas and oxygen gas','gases']]]];
function why(t){let m='Separate the strong bonds inside molecules from the weak forces between them.';
 if(t==='bond')m='Boiling does not break covalent bonds. The molecules separate, but each H₂O stays whole.';
 if(t==='none')m='Water molecules have strong covalent O–H bonds. Only the weak forces between molecules are overcome.';
 if(t==='small')m='Methane is the smallest molecule, so the forces between its molecules are weakest. It boils lowest.';
 if(t==='same')m='Boiling point rises with molecule size because the intermolecular forces get stronger.';
 if(t==='solid')m='Being solid is not the reason: a solid metal conducts. Sulfur has no charged particles that can move.';
 if(t==='strong')m='Bond strength does not decide conduction. You need charged particles that can move.';
 if(t==='solidg')m='Being solid at room temperature does not make it giant. It melts at only 114 °C, so the forces are weak.';
 if(t==='ion')m='Iodine is made of I₂ molecules joined by covalent bonds. There are no ions.';
 if(t==='gases')m='Splitting water into hydrogen and oxygen needs a chemical reaction, such as electrolysis. Boiling is a physical change.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});
  A.every(dt=>{if(mode()!=='heat'||R())return false;S.t+=dt;return true});buttons()}});
A.start()})})();
