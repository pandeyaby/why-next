/* Flagship – Electromagnets (Science, Forces & Motion, ages 12-13; NGSS MS-PS2-3, KS3 Physics 'the magnetic effect of
   a current, electromagnets'). The learner moves a compass round a straight wire and reverses the current, winds a
   coil and finds its north end from the field arrows, runs fair tests of turns, current and core on a paperclip tray
   (the lab spots a test that changes two things at once), switches off soft iron and steel cores, and sorts uses that
   need a magnet that switches. Data and drawings: emag_art.js. */
(()=>{const E=EMG;
VIS.reg('flagemag',c=>{
let A,ctl,chal,qi=-1,epoch=0,grab=null,hot=[];const M={};
const STEPS=['wire','coil','test','off','uses','chal'],now=()=>STEPS[A.step];
const TOP=()=>A.narrow?100:88,within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function note(msg,bad){M.msg=msg;M.bad=!!bad;c.say(msg);A.cv.setAttribute('aria-label',msg);pads();A.redraw();M.check()}
const mood=fin=>fin?'ok':M.bad?'no':'';
/* ---- step 1: compass round a wire ---- */
function wireGeo(){const room=A.H-TOP()-80,R=Math.min(A.W*.3,room*.36);return{cx:A.W/2,cy:TOP()+10+room/2,R}}
const needle=p=>E.needle(p,wireGeo(),M.w.on,M.w.out),WAY=E.way;
function wireSwitch(){const w=M.w;w.on=!w.on;A.sound.pop();note(w.on?'Current on. The ring of compasses swings round the wire.':'Current off. Every compass points north again: no current, no field.',false)}
function wireReverse(){const w=M.w;if(!w.on)return note('Switch the current on first, then reverse it.',true);w.out=!w.out;w.rev=true;A.sound.pop();
 note(`Current reversed: now flowing ${w.out?'towards you':'away from you'}. Every compass turned round.`,false)}
function probeAt(p){const w=M.w,G=wireGeo();w.probe={x:Math.max(24,Math.min(A.W-24,p.x)),y:Math.max(TOP()+24,Math.min(A.H-96,p.y))};if(!w.on)return note('The compass points north. Switch the current on to see what the wire does.',false);
 const d=Math.hypot(w.probe.x-G.cx,w.probe.y-G.cy);if(d>2.6*G.R)return note('Out here the field from the wire is weak, so the compass points nearly north. Move it closer.',false);
 if(!w.spots.some(s=>Math.hypot(s.x-w.probe.x,s.y-w.probe.y)<45))w.spots.push({...w.probe});
 note(`Here the compass points ${WAY(needle(w.probe))}: round the wire, not at it. ${Math.min(3,w.spots.length)} of 3 places.`,false)}
function drawWire(){const g=A.ctx,dk=A.col.dark,w=M.w,G=wireGeo(),fin=M.over();E.strip(A,fin?E.DONE[0]:M.msg||E.TXT[0],mood(fin),TOP()-12);
 for(let j=0;j<8;j++){const a=j*Math.PI/4,p={x:G.cx+Math.cos(a)*G.R,y:G.cy+Math.sin(a)*G.R};E.compass(g,p.x,p.y,15,needle(p),dk)}
 E.wireEnd(g,G.cx,G.cy,17,w.on,w.out,dk);g.font='700 13px system-ui,sans-serif';g.fillStyle=dk?'#cbd5e1':'#334155';g.textAlign='center';g.textBaseline='top';
 g.fillText(w.on?(w.out?'current towards you':'current away from you'):'no current',G.cx,G.cy+G.R+20);E.arrow(g,A.W-26,TOP()+40,A.W-26,TOP()+12,dk?'#cbd5e1':'#334155',2);g.fillText('N',A.W-26,TOP()+42);
 const pr=grab&&grab.k==='probe'?grab:w.probe;E.compass(g,pr.x,pr.y,22,needle(pr),dk);
 hot=[{k:'sw',x:12,y:A.H-66,w:(A.W-36)/2,h:54},{k:'rev',x:24+(A.W-36)/2,y:A.H-66,w:(A.W-36)/2,h:54}];E.pill(g,hot[0],w.on?'Switch off':'Switch on',w.on?'on':'',dk);E.pill(g,hot[1],'Reverse current','',dk)}
/* ---- step 2: wind a coil and find north ---- */
function coilGeo(){const y=TOP()+(A.H-TOP()-80)*.48,h=Math.min(84,(A.H-TOP())*.2);return{x0:A.W*.24,x1:A.W*.76,y,h}}
function wind(k){const s=M.k;if(s.n>=14)return note('That is plenty of turns for this coil.',false);s.n=Math.min(14,s.n+k);A.sound.tick();
 note(`${s.n} turns.${s.on?' More turns, more field lines.':''}${s.n<8?' Wind at least 8.':''}`,false)}
function coilSwitch(){const s=M.k;s.on=!s.on;A.sound.pop();note(s.on?'Current on. Look where the field arrows come out and where they go in.':'Current off: the field has gone.',false)}
function coilReverse(){const s=M.k;s.flip=!s.flip;s.found=false;A.sound.pop();note(s.on?'Current reversed. Look at the arrows now: the ends have swapped.':'Current reversed. Switch on to see what changed.',false)}
function tapEnd(right){const s=M.k;if(!s.on)return note('Switch the current on first, then look at the field arrows.',true);if(s.n<8)return note('Wind at least 8 turns first, so the field is clear.',true);
 const north=!s.flip;if(right===north){s.found=true;A.sound.pop();return note(`Yes: field lines come out of the ${right?'right':'left'} end, so it is north. They go back in at the south end.`,false)}
 A.sound.miss();note(`Field lines go into the ${right?'right':'left'} end, so that end is the south pole. North is where they come out.`,true)}
function drawCoil(){const g=A.ctx,dk=A.col.dark,s=M.k,G=coilGeo(),fin=M.over();E.strip(A,fin?E.DONE[1]:M.msg||`Drag across the coil to wind it, then switch on. (${s.n} turns)`,mood(fin),TOP()-12);
 if(s.on&&s.n)E.coilField(g,G.x0,G.x1,G.y,G.h,!s.flip,s.n<4?1:s.n<8?2:3,dk);E.coil(g,G.x0,G.x1,G.y,G.h,s.n,'air',dk);if(s.on&&s.n){const f=s.flip?-1:1;E.arrow(g,A.W/2-f*G.h*.6,G.y,A.W/2+f*G.h*.6,G.y,dk?'#93c5fd':'#1d4ed8',4)}
 E.battery(A,G,s.flip);
 hot=[{k:'L',x:4,y:G.y-36,w:G.x0-22,h:72},{k:'R',x:G.x1+18,y:G.y-36,w:A.W-G.x1-22,h:72},{k:'sw',x:12,y:A.H-66,w:(A.W-36)/2,h:54},{k:'rev',x:24+(A.W-36)/2,y:A.H-66,w:(A.W-36)/2,h:54}];
 [hot[0],hot[1]].forEach((r,j)=>E.pill(g,r,s.found&&(j===1)===!s.flip?'N':'Tap: N?',s.found&&(j===1)===!s.flip?'ok':'',dk));E.pill(g,hot[2],s.on?'Switch off':'Switch on',s.on?'on':'',dk);E.pill(g,hot[3],'Reverse current','',dk)}
/* ---- step 3: fair tests on a tray of clips ---- */
function setting(k,d){const t=M.t,L=k==='n'?E.TURNS:E.AMPS,i=L.indexOf(t[k])+d;if(i<0||i>=L.length)return;t[k]=L[i];A.sound.tick();note(`${k==='n'?'Turns':'Current'}: ${t[k]}${k==='n'?'':' A'}. Drag the magnet down to test.`,false)}
function setCore(k){M.t.core=k;A.sound.tick();note(`Core: ${E.CORES.find(c=>c.k===k).name}. Drag the magnet down to test.`,false)}
function runTest(){const t=M.t,got=E.clips(t.n,t.i,t.core),prev=t.tests[t.tests.length-1],row={n:t.n,i:t.i,core:t.core,c:got};t.tests.push(row);t.best=Math.max(t.best,got);t.drop=0;t.held=got;
 const name={n:'turns',i:'current',core:'core'},diff=prev?['n','i','core'].filter(k=>prev[k]!==row[k]):[];
 if(!prev){A.sound.pop();return note(`Test 1: ${got} clips. Now change one thing and test again.`,false)}
 if(!diff.length){A.sound.miss();return note(`Same settings as last time, so the same ${got} clips. Change one thing.`,true)}
 if(diff.length>1){A.sound.miss();return note(`You changed ${diff.map(k=>name[k]).join(' and ')} at once, so you cannot tell which one made the ${got} clips. Change one thing at a time.`,true)}
 t.fair++;A.sound.pop();const k=diff[0],from=k==='core'?E.CORES.find(c=>c.k===prev.core).name:prev[k],to=k==='core'?E.CORES.find(c=>c.k===row.core).name:row[k];
 note(`Fair test: only the ${name[k]} changed (${from} to ${to}). Clips: ${prev.c} to ${got}.${k==='core'&&row.core==='copper'?' Copper is not magnetic.':''}${t.best<10?' Try for 10 or more.':''}`,false)}
function testGeo(){const y0=TOP()+4,rowH=46,rows=A.narrow?2:1,cy=y0+rows*(rowH+6),magTop=cy+rowH+30,tray=A.H-(A.narrow?118:96);return{y0,rowH,rows,cy,magTop,tray}}
function drawTest(){const g=A.ctx,dk=A.col.dark,t=M.t,G=testGeo(),fin=M.over(),W=A.W;E.strip(A,fin?E.DONE[2]:M.msg||E.TXT[2],mood(fin),TOP()-12);hot=[];
 const half=A.narrow?W-16:(W-24)/2,pw=46;[['n','Turns',t.n],['i','Current',t.i+' A']].forEach(([k,lab,v],j)=>{const x=8+(A.narrow?0:j*(half+8)),y=G.y0+(A.narrow?j*(G.rowH+6):0);
  g.font='800 15px system-ui,sans-serif';g.fillStyle=dk?P1:P0;g.textAlign='center';g.textBaseline='middle';g.fillText(`${lab}: ${v}`,x+half/2,y+G.rowH/2);
  const a={k:k+'-',x,y,w:pw,h:G.rowH},b={k:k+'+',x:x+half-pw,y,w:pw,h:G.rowH};hot.push(a,b);E.pill(g,a,'\u2212','',dk);E.pill(g,b,'+','',dk)});
 const cw=(W-16-18)/4;E.CORES.forEach((C,j)=>{const r={k:'core:'+C.k,x:8+j*(cw+6),y:G.cy,w:cw,h:G.rowH};hot.push(r);E.pill(g,r,C.name,t.core===C.k?'sel':'',dk)});
 const span=G.tray-G.magTop-56,my=G.magTop+(grab&&grab.k==='mag'?grab.drop:t.drop)*span,mw=Math.min(150,W*.42);M.mag={x:W/2-mw/2-20,y:my-6,w:mw+40,h:62};
 g.strokeStyle=dk?'#94a3b8':'#64748b';g.lineWidth=2;g.beginPath();g.moveTo(W/2,G.magTop-8);g.lineTo(W/2,my);g.stroke();E.coil(g,W/2-mw/2,W/2+mw/2,my+24,40,Math.min(14,t.n/3+2|0),t.core,dk);
 g.font='700 12px system-ui,sans-serif';g.fillStyle=dk?'#cbd5e1':'#475569';g.textAlign='center';g.textBaseline='middle';g.textAlign='right';if(!t.tests.length&&!grab)g.fillText('drag me down \u2193',W/2-mw/2-6,my+24);
 for(let j=0;j<t.held;j++)E.clip(g,W/2-mw/2+10+(j%10)*(mw-20)/9,my+56+Math.floor(j/10)*20,.2*(j%3-1),dk);
 g.fillStyle=dk?'#1e293b':'#e7e5e4';E.rr(g,8,G.tray,W-16,34,8);g.fill();for(let j=0;j<20-t.held;j++)E.clip(g,22+j*(W-44)/19,G.tray+17,1.57+.3*(j%3-1),dk);
 E.table(A,t.tests,G.tray+42)}
const P0='#0f172a',P1='#f1f5f9';
/* ---- step 4: switch off with iron and with steel ---- */
function offSwitch(){const s=M.o;if(s.on){s.on=false;const keep=s.core==='steel'?Math.floor(s.held*.4):0;s.left=keep;s.seen[s.core]=true;s.fall=0;A.tween(s,{fall:1},700,'out');A.sound.pop();
  return note(s.core==='iron'?`Off: soft iron let go of all ${s.held} clips at once.`:`Off: steel kept ${keep} of ${s.held} clips. Steel stays magnetised, so it cannot let go properly.`,false)}
 s.on=true;s.held=E.clips(40,1.5,s.core);s.left=s.held;s.fall=0;A.sound.pop();note(`On: the ${s.core==='iron'?'soft iron':'steel'} core lifts ${s.held} clips. Now switch off.`,false)}
function offCore(k){const s=M.o;if(s.core===k)return;s.core=k;s.on=false;s.held=0;s.left=0;A.sound.tick();note(`Core: ${k==='iron'?'soft iron':'steel'}. Switch on to lift clips.`,false)}
function drawOff(){const fin=M.over();E.strip(A,fin?E.DONE[3]:M.msg||E.TXT[3],mood(fin),TOP()-12);hot=E.offView(A,M.o,TOP()+4)}
/* ---- step 5: which uses need a magnet that switches? ---- */
function sortUse(i,e){const s=M.u;if(s.at[i]!=null)return;const U=E.USES[i];if(e!==U.e){s.bad=i;A.sound.miss();return note(U.why,true)}s.at[i]=e;s.bad=-1;s.pick=null;A.sound.pop();note(`${U.t}: ${e?'electromagnet':'permanent magnet'}. ${U.why}`,false)}
function drawUses(){const s=M.u,n=Object.keys(s.at).length,fin=n===E.USES.length;E.strip(A,fin?E.DONE[4]:M.msg||`Sort each use. (${n} of ${E.USES.length})`,mood(fin),TOP()-12);const v=E.sortView(A,s,grab,TOP()+2,fin,within);hot=v.bins;M.cards=v.cards}
/* ---- challenge ---- */
function slipMsg(tag){let m='Current, turns and a soft iron core set the strength. Change one thing at a time to test them.';
 if(tag==='copper')m='Copper is not a magnetic material, so a copper core does nothing. Soft iron is what makes it much stronger.';
 if(tag==='length')m='A longer wire with the same turns has more resistance, so less current and a weaker magnet. Turns and current count, not length.';
 if(tag==='core'||tag==='battery')m='The field comes from the moving charge in the wire. Stop the current and the field stops; soft iron then loses its magnetism.';
 if(tag==='fair')m='Two things changed at once, so the test cannot show which one helped. Change one thing and keep the rest the same.';
 if(tag==='radial')m='The compasses line up along circles round the wire, at right angles to a line to the wire, not pointing at it.';
 if(tag==='none')m='With a current there is a field, so the compasses near the wire swing round. Only far away do they point north.';
 if(tag==='stronger'||tag==='stop')m='Reversing the current reverses the field: north and south swap ends. The strength stays the same.';
 if(tag==='steel')m='Steel makes a strong magnet but stays magnetised when switched off, so it does not let go. Soft iron does.';
 if(tag==='fewer'||tag==='same')m='More current gives a stronger field, so more clips are lifted.';
 return m}
function ask(){qi++;const Q=E.QS[qi%E.QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,order=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose one answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},chal.querySelector('.fl-pick'),v).onclick=()=>mark(tag,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(tag,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),good=tag==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`\u2713 Right: ${a}.`:'\u2717 '+slipMsg(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(good?'Right.':slipMsg(tag))}
/* ---- pointer ---- */
function down(p){const k=now(),h=hot.find(r=>within(p,r));
 if(k==='wire'){if(h){h.k==='sw'?wireSwitch():wireReverse();return false}const w=M.w;if(Math.hypot(p.x-w.probe.x,p.y-w.probe.y)<44){grab={k:'probe',x:p.x,y:p.y};return true}return false}
 if(k==='coil'){if(h){({L:()=>tapEnd(false),R:()=>tapEnd(true),sw:coilSwitch,rev:coilReverse})[h.k]();return false}const G=coilGeo();if(p.x>G.x0-10&&p.x<G.x1+10&&Math.abs(p.y-G.y)<G.h){grab={k:'wind',x:p.x,acc:0};return true}return false}
 if(k==='test'){if(h){if(h.k.startsWith('core:'))setCore(h.k.slice(5));else setting(h.k[0],h.k[1]==='+'?1:-1);return false}if(within(p,M.mag)){grab={k:'mag',y0:p.y,drop:M.t.drop};M.t.held=0;return true}return false}
 if(k==='off'){if(h){h.k==='sw'?offSwitch():offCore(h.k);}return false}
 if(k==='uses'){if(M.u.pick!=null&&h){sortUse(M.u.pick,h.e);return false}const cd=(M.cards||[]).find(r=>within(p,r));if(cd){grab={i:cd.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}return false}
function move(p){if(!grab)return;const k=now();if(k==='wire'){grab.x=p.x;grab.y=p.y}
 if(k==='coil'){grab.acc+=Math.abs(p.x-grab.x);grab.x=p.x;while(grab.acc>22){grab.acc-=22;wind(1)}}
 if(k==='test'){const G=testGeo();grab.drop=Math.max(0,Math.min(1,M.t.drop+(p.y-grab.y0)/(G.tray-G.magTop-56)))}
 if(k==='uses'){grab.x=p.x;grab.y=p.y}A.redraw()}
function up(p){if(!grab)return;const g0=grab,k=now();grab=null;
 if(k==='wire')return probeAt(p);if(k==='coil')return A.redraw();
 if(k==='test'){if(g0.drop>.85)return runTest();M.t.drop=0;return note('Drag the magnet all the way down to the clips to test it.',false)}
 if(k==='uses'){const b=hot.find(r=>within(p,r)),tap=Math.hypot(p.x-g0.x0,p.y-g0.y0)<10;if(b&&!tap)return sortUse(g0.i,b.e);if(tap){M.u.pick=g0.i;return note(`Picked "${E.USES[g0.i].t}". Now tap a box.`,false)}A.redraw()}}
/* ---- state ---- */
function wipe(){epoch++;grab=null;for(const k in M)delete M[k];Object.assign(M,{w:{on:false,out:true,probe:{x:A?A.W*.82:300,y:A?A.H-130:300},spots:[],rev:false},k:{n:2,on:false,flip:false,found:false},
 t:{n:10,i:1,core:'air',drop:0,tests:[],fair:0,best:0,held:0},o:{core:'iron',on:false,held:0,left:0,fall:0,seen:{}},u:{at:{},pick:null,bad:-1},msg:null,bad:false,mag:null,check:()=>{},over:()=>false})}
function open(i,over){wipe();M.over=over;c.say(E.DESC[i]);A.cv.setAttribute('aria-label',E.DESC[i]);
 M.check=()=>{if(A.step===i&&!A.isDone&&over()&&(!PLAN[i].predict||A.pred[i]!=null))A.done(E.DONE[i]+A.reveal(i))};pads();A.redraw()}
function auto(i,list){PLAN[i].go();const e=epoch;let t=0;list.forEach(f=>{t+=480;setTimeout(()=>{if(e===epoch)f()},t)})}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=now(),b=(t,f,l)=>{const x=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t);x.onclick=f};
 if(k==='wire'){const G=wireGeo();b(M.w.on?'Switch off':'Switch on',wireSwitch,'Switch the current in the wire on or off');b('Reverse current',wireReverse);
  [['above',0,-1],['right',1,0],['below',0,1],['left',-1,0]].forEach(([n,dx,dy])=>b(`Compass ${n}`,()=>probeAt({x:G.cx+dx*G.R*.55,y:G.cy+dy*G.R*.55}),`Move the compass ${n} the wire`))}
 if(k==='coil'){b('+1 turn',()=>wind(1),'Wind one more turn on the coil');b(M.k.on?'Switch off':'Switch on',coilSwitch,'Switch the coil current on or off');b('Reverse current',coilReverse);b('Left end is N',()=>tapEnd(false),'Say the left end is the north pole');b('Right end is N',()=>tapEnd(true),'Say the right end is the north pole')}
 if(k==='test'){b('Turns \u2212',()=>setting('n',-1),'Fewer turns');b('Turns +',()=>setting('n',1),'More turns');b('Current \u2212',()=>setting('i',-1),'Less current');b('Current +',()=>setting('i',1),'More current');
  E.CORES.forEach(C=>b(C.name,()=>setCore(C.k),`Use ${C.name.toLowerCase()} as the core`));b('Test it',runTest,'Lower the magnet onto the clips and record the test')}
 if(k==='off'){b('Soft iron core',()=>offCore('iron'));b('Steel core',()=>offCore('steel'));b(M.o.on?'Switch off':'Switch on',offSwitch,'Switch the electromagnet on or off')}
 if(k==='uses'){const i=E.USES.findIndex((_,j)=>M.u.at[j]==null);if(i>=0){b('Electromagnet',()=>sortUse(i,true),`${E.USES[i].t}: needs an electromagnet`);b('Permanent magnet',()=>sortUse(i,false),`${E.USES[i].t}: a permanent magnet is fine`)}}}
const VIEW={wire:drawWire,coil:drawCoil,test:drawTest,off:drawOff,uses:drawUses};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=now();
 if(k==='chal'){E.strip(A,'Challenge: electromagnets','ok',TOP()-12);const mw=Math.min(200,A.W*.5);E.coil(g,A.W/2-mw/2,A.W/2+mw/2,TOP()+70,50,10,'iron',A.col.dark);return}VIEW[k]();A.fx.draw(g)}
const PLAN=[
{h:'Field round a wire',p:E.TXT[0],predict:{q:'A current flows in a straight wire. Which way do compasses near it point?',opts:['Straight at the wire','In circles round the wire','Still north, no change'],ans:1},task:'Switch on, put the compass in 3 places, and reverse the current',
 show:()=>{const G=wireGeo(),at=d=>({x:G.cx+Math.cos(d)*G.R*1.4,y:G.cy+Math.sin(d)*G.R*1.4});auto(0,[wireSwitch,()=>probeAt(at(-1.1)),()=>probeAt(at(.35)),()=>probeAt(at(2.4)),wireReverse])},go:()=>open(0,()=>M.w.on&&M.w.spots.length>=3&&M.w.rev)},
{h:'Coil it up',p:E.TXT[1],predict:{q:'Wire wound into a coil carries a current. Its field looks like the field of…',opts:['A bar magnet','Nothing: the circles cancel out','Only rings round each single wire'],ans:0},task:'Wind 8 or more turns, switch on, and tap the north end',
 show:()=>auto(1,[()=>wind(3),()=>wind(3),coilSwitch,()=>tapEnd(!M.k.flip)]),go:()=>open(1,()=>M.k.found)},
{h:'Fair tests',p:E.TXT[2],predict:{q:'You slide a soft iron core into the coil. The magnet will…',opts:['Get much stronger','Stay the same','Get weaker: iron blocks the field'],ans:0},task:'Run fair tests (one change each) and lift 10 or more clips',
 show:()=>auto(2,[runTest,()=>setCore('iron'),runTest,()=>setting('n',1),()=>setting('n',1),runTest]),go:()=>open(2,()=>M.t.fair>=2&&M.t.best>=10)},
{h:'Switch it off',p:E.TXT[3],predict:{q:'The current stops. What happens to clips on a soft iron core?',opts:['They stay stuck','They drop off','They jump to the battery'],ans:1},task:'Switch off once with soft iron and once with steel',
 show:()=>auto(3,[offSwitch,offSwitch,()=>offCore('steel'),offSwitch,offSwitch]),go:()=>open(3,()=>M.o.seen.iron&&M.o.seen.steel)},
{h:'Where are they used?',p:E.TXT[4],task:'Sort all 7 uses',show:()=>auto(4,E.USES.map((U,i)=>()=>sortUse(i,U.e))),go:()=>open(4,()=>Object.keys(M.u.at).length===E.USES.length)},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
PLAN.forEach(s=>{if(s.task)s.onPredict=()=>M.check()});
FK.shell(c,{steps:PLAN,ratio:.74,tall:1.5,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;pads()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Electromagnet lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();
  A.gest({down,move,up});pads()}}).start()})})();
