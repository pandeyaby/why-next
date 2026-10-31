/* Flagship – copying and making repeating patterns (ages 3–4): continue an ABAB bead string, copy a model string bead
   by bead, carry on a clap-and-stamp pattern, spot and fix the one bead that breaks a pattern, then build a short
   "unit of repeat" and watch the pattern machine repeat it. Drag a bead to the gap, or tap a bead or a big button. */
(()=>{
const BEAD={r:['red','#dc2626','●'],b:['blue','#2563eb','■'],y:['yellow','#eab308','▲'],g:['green','#16a34a','◆']};
const MOVE={c:['clap','👏'],s:['stamp','🦶']};
const GOON=[{seq:'rbrbr',add:3},{seq:'gygyg',add:3}],COPY=['byby','rggrgg'],BEAT=[{seq:'cscs',add:2},{seq:'ccsccs',add:3}];
const FIX=[{seq:'rbrrrb',bad:3,ok:'b'},{seq:'yygyyy',bad:5,ok:'g'},{seq:'bgbggg',bad:4,ok:'b'}];
VIS.reg('flagabab',c=>{let A,pad,qbox,qi=-1,ver=0;c.fig.classList.add('young');
const fresh=()=>({want:()=>{},won:0,r:0,row:[],drag:null,bad:-1,glow:-1,core:[],made:0,shown:0}),S=fresh();
const mode=()=>['goon','copy','beat','fix','make','quiz'][A.step],fast=()=>A.reduced();
const fsz=n=>Math.round(n*(A.narrow?1:1.15)),say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const kinds=()=>mode()==='beat'?['c','s']:mode()==='goon'&&S.r>0||mode()==='copy'&&S.r>0?['r','b','y','g']:['r','b','y'];
const nameOf=k=>(BEAD[k]||MOVE[k])[0],need=()=>({goon:2,copy:2,beat:2,fix:3,make:2}[mode()]||9);
function text(g,t,x,y,n,col,wt){g.font=`${wt||800} ${fsz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
/* one bead: a coloured shape with its own mark, so colour is never the only clue */
function bead(g,k,x,y,R,ring){if(MOVE[k]){g.font=`${Math.round(R*1.5)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#111';g.fillText(MOVE[k][1],x,y);}
 else{A.paint.ball(x,y,R,BEAD[k][1]);g.font=`900 ${Math.round(R*.9)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=k==='y'?'#422006':'#fff';g.fillText(BEAD[k][2],x,y+1)}
 if(ring){g.strokeStyle=ring;g.lineWidth=5;g.beginPath();g.arc(x,y,R+6,0,7);g.stroke()}}
function gapRing(g,x,y,R,on){g.setLineDash([6,5]);g.strokeStyle=on?A.col.vi:A.col.mu;g.lineWidth=on?4:2.5;g.beginPath();g.arc(x,y,R,0,7);g.stroke();g.setLineDash([])}
const slotR=n=>Math.min((A.W-30)/n/2-4,A.H*.085,34),slotX=(i,n)=>{const R=slotR(n),w=2*R+8;return(A.W-n*w)/2+w*i+w/2};
function trayAt(i){const n=kinds().length,R=Math.min(A.W/(n*2.6),A.H*.11,44),w=A.W/n;return{x:w*i+w/2,y:A.H*.84,R}}
/* ---- shared row helpers ---- */
const target=()=>{const v=mode();if(v==='goon'){const p=GOON[S.r%2];return full(p.seq,p.seq.length+p.add)}if(v==='beat'){const p=BEAT[S.r%2];return full(p.seq,p.seq.length+p.add)}if(v==='copy')return COPY[S.r%2];return''};
function full(seq,n){const u=unit(seq);let s='';while(s.length<n)s+=u;return s.slice(0,n)}
function unit(seq){for(let L=1;L<=seq.length;L++){const u=seq.slice(0,L);if([...seq].every((ch,i)=>ch===u[i%L]))return u}return seq}
const given=()=>{const v=mode();return v==='goon'?GOON[S.r%2].seq:v==='beat'?BEAT[S.r%2].seq:''};
function drawRow(g,y,str,n,opts){const R=slotR(n);for(let i=0;i<n;i++){const x=slotX(i,n),k=str[i];if(k)bead(g,k,x,y,R,i===S.bad&&opts.badRow?A.col.rd:i===S.glow&&opts.glowRow?A.col.vi:null);else gapRing(g,x,y,R,i===str.length)}}
function drawTray(g){kinds().forEach((k,i)=>{let{x,y,R}=trayAt(i);if(S.drag&&S.drag.k===k&&S.drag.x!=null){x=S.drag.x;y=S.drag.y}bead(g,k,x,y,R)});}
/* ---- 1 keep it going, 3 clap and stamp ---- */
function drawGoOn(g){const tg=target(),have=given()+S.row.join('');text(g,mode()==='beat'?'Clap or stamp? Do what comes next.':'What comes next?',A.W/2,A.H*.12,16);
 drawRow(g,A.H*.36,have,tg.length,{});text(g,`${have.length-given().length} of ${tg.length-given().length} filled`,A.W/2,A.H*.58,13,A.col.mu,700);drawTray(g)}
function place(k){const v=mode();if(!['goon','beat','copy'].includes(v)||S.won>=need())return;const tg=target(),start=v==='copy'?0:given().length,at=start+S.row.length;if(at>=tg.length)return;
 if(k!==tg[at]){const u=unit(given()||tg);return miss(v==='copy'?`Look at the top row. Bead ${at+1} is ${nameOf(tg[at])}. Match it.`:
   v==='beat'?`Say it out loud: ${[...u].map(nameOf).join(', ')}, then again. Next is ${nameOf(tg[at])}.`:
   `Say the colours: ${[...u].map(nameOf).join(', ')}, ${[...u].map(nameOf).join(', ')}… The part that repeats tells you: next is ${nameOf(tg[at])}.`)}
 S.row.push(k);A.sound.tick();if(start+S.row.length>=tg.length)return got(v==='copy'?'Same as the top row: you copied it!':v==='beat'?'You kept the clap and stamp going!':'Yes! The pattern keeps going.');
 say(`${nameOf(k)}. ${tg.length-start-S.row.length} more to go.`);keys();A.redraw()}
/* ---- 2 copy my pattern ---- */
function drawCopy(g){const tg=target();text(g,'Copy the top row',A.W/2,A.H*.08,16);drawRow(g,A.H*.24,tg,tg.length,{});text(g,'Your row',A.W/2,A.H*.41,13,A.col.mu,700);
 drawRow(g,A.H*.55,S.row.join(''),tg.length,{});drawTray(g)}
/* ---- 4 fix the mistake ---- */
function drawFix(g){const p=FIX[S.r%3],s=S.row.length?S.row.join(''):p.seq;text(g,'One bead is wrong. Tap it!',A.W/2,A.H*.14,16);drawRow(g,A.H*.42,s,s.length,{badRow:1,glowRow:1});
 text(g,`Say it: ${[...s].map(nameOf).join(', ')}`,A.W/2,A.H*.68,13,A.col.mu,700)}
function pickBead(i){if(mode()!=='fix'||S.won>=need())return;const p=FIX[S.r%3];if(i!==p.bad){S.bad=i;A.redraw();return miss(`Bead ${i+1} fits. Say the colours from the start: ${[...unit(p.seq.slice(0,3))].map(nameOf).join(', ')}, again and again. Which one breaks it?`,i)}
 const s=[...p.seq];s[i]=p.ok;S.row=s;S.glow=i;A.sound.pop();A.redraw();const v=ver;setTimeout(()=>{if(v===ver)got(`Bead ${i+1} broke the pattern. Now it is ${nameOf(p.ok)}, and it repeats all the way.`)},fast()?10:700)}
/* ---- 5 make your own ---- */
function drawMake(g){const n=Math.max(2,S.core.length),R=Math.min(slotR(9),30);text(g,S.shown?'The pattern machine repeats your part 3 times!':'Make the part that repeats: 2 or 3 beads.',A.W/2,A.H*.08,15);
 const coreR=Math.min(A.W*.08,40);for(let i=0;i<3;i++){const x=A.W/2+(i-1)*(coreR*2+14);if(S.core[i])bead(g,S.core[i],x,A.H*.25,coreR);else gapRing(g,x,A.H*.25,coreR,i===S.core.length)}
 if(S.shown){const s=S.core.join('').repeat(3);for(let i=0;i<s.length;i++)bead(g,s[i],slotX(i,s.length),A.H*.5,Math.min(R,slotR(s.length)),i%S.core.length===0?A.col.vi:null)}
 else text(g,`${n>0?'Then tap Repeat it!':''}`,A.W/2,A.H*.5,13,A.col.mu,700);drawTray(g)}
function addCore(k){if(mode()!=='make'||S.won>=need())return;if(S.shown){S.core=[];S.shown=0}if(S.core.length>=3)return miss('Three beads is plenty. Tap Repeat it!');S.core.push(k);A.sound.tick();say(`Your part: ${S.core.map(nameOf).join(', ')}.`);keys();A.redraw()}
function repeatIt(){if(mode()!=='make'||S.won>=need()||S.shown)return;const u=S.core;if(u.length<2)return miss('Put in two or more beads first, like red, blue.');
 if(new Set(u).size<2)return miss(`All ${nameOf(u[0])}? Use two colours, like ${nameOf(u[0])}, blue, so we can see where it repeats.`);
 S.shown=1;S.made++;S.won++;A.sound.pop();say(`Your pattern: ${u.map(nameOf).join(', ')}, then ${u.map(nameOf).join(', ')}, then ${u.map(nameOf).join(', ')}. It repeats!`);keys();A.redraw();
 if(S.won>=need())A.win();S.want()}
function clearCore(){if(mode()!=='make')return;S.core=[];S.shown=0;say('Cleared. Make a new part that repeats.');keys();A.redraw()}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){['r','b','r','b','r'].forEach((k,i)=>bead(g,k,W/2+(i-2)*Math.min(W*.13,64),H*.42,Math.min(W*.05,26)));text(g,'Find the part that repeats.',W/2,H*.68,15);return}
 if(S.won>=need()&&v!=='make'&&v!=='fix'){text(g,{goon:'Red, blue, red, blue… it keeps going.',copy:'Same beads, same order.',beat:'Clap, stamp, clap, stamp…'}[v],W/2,H/2,15);return A.fx.draw(g)}
 ({goon:drawGoOn,beat:drawGoOn,copy:drawCopy,fix:drawFix,make:drawMake})[v](g);A.fx.draw(g)}
function miss(t,i){A.sound.miss();S.bad=i==null?-1:i;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:900);A.redraw()}
function got(t){S.won++;S.r++;S.row=[];S.glow=-1;A.sound.pop();say(S.won<need()?t+' Here is a new one.':t);keys();A.redraw();S.want()}
function keys(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};if(v==='quiz'||S.won>=need()&&v!=='make')return;
 if(v==='goon'||v==='copy'||v==='beat')kinds().forEach(k=>B(MOVE[k]?`${MOVE[k][1]} ${cap(MOVE[k][0])}`:`${BEAD[k][2]} ${cap(BEAD[k][0])}`,()=>place(k),`Put ${nameOf(k)} next`));
 if(v==='fix'){const p=FIX[S.r%3];[...p.seq].forEach((k,i)=>B(`${i+1}`,()=>pickBead(i),`Bead ${i+1}: ${nameOf(k)}`))}
 if(v==='make'&&S.won<need()){kinds().forEach(k=>B(`${BEAD[k][2]} ${cap(BEAD[k][0])}`,()=>addCore(k),`Add ${nameOf(k)} to my part`));B('🔁 Repeat it!',repeatIt,'Repeat my part three times');B('Clear',clearCore,'Clear my part')}}
const cap=s=>s[0].toUpperCase()+s.slice(1);
function down(p){const v=mode();if(v==='quiz'||S.won>=need()&&v!=='make')return false;
 if(v==='fix'){const s=FIX[S.r%3].seq,R=slotR(s.length);for(let i=0;i<s.length;i++)if(Math.hypot(p.x-slotX(i,s.length),p.y-A.H*.42)<R+6){pickBead(i);break}return false}
 const k=kinds().find((k,i)=>{const t=trayAt(i);return Math.hypot(p.x-t.x,p.y-t.y)<t.R+8});if(k){S.drag={k,x:null,y:null,x0:p.x,y0:p.y};return true}return false}
function move(p){if(!S.drag)return;if(S.drag.x!=null||Math.hypot(p.x-S.drag.x0,p.y-S.drag.y0)>8){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;if(d.x!=null&&p.y>A.H*.72){say('Drop the bead up in the gap.');return A.redraw()}if(mode()==='make')addCore(d.k);else place(d.k);A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},fast()?j*40+30:(j+1)*(gap||300)))}
const wipe=()=>{ver++;Object.assign(S,fresh())};
const answers=(set)=>set.flatMap(p=>[...full(p.seq,p.seq.length+p.add).slice(p.seq.length)]);
const steps=[
{h:'What comes next?',p:'Red, blue, red, blue… Drag the bead that comes next into the gap, or tap it.',predict:{q:'Red, blue, red, blue, red… What comes next?',opts:['Red','Blue'],ans:1},task:'Finish 2 patterns',
 show:()=>{steps[0].go();play(answers(GOON).map(k=>()=>place(k)),280)},go:()=>{wipe();say('Red, blue, red, blue, red. What comes next?');keys();S.want=ready(0,()=>S.won>=2,'The part that repeats tells you what comes next.')}},
{h:'Copy my pattern',p:'Make your row the same as the top row. Start at the left and match each bead.',task:'Copy 2 patterns',
 show:()=>{steps[1].go();play([...COPY.join('')].map(k=>()=>place(k)),260)},go:()=>{wipe();say('Copy the top row: blue, yellow, blue, yellow.');keys();S.want=ready(1,()=>S.won>=2,'Same beads in the same order: a copy.')}},
{h:'Clap and stamp',p:'Patterns can be sounds too. Say it and do it: clap, stamp, clap, stamp. Then add what comes next.',predict:{q:'Clap, clap, stamp, clap, clap, stamp… What comes next?',opts:['Stamp','Clap'],ans:1},task:'Keep 2 sound patterns going',
 show:()=>{steps[2].go();play(answers(BEAT).map(k=>()=>place(k)),300)},go:()=>{wipe();say('Clap, stamp, clap, stamp. What comes next?');keys();S.want=ready(2,()=>S.won>=2,'Clap, clap, stamp is the part that repeats.')}},
{h:'Oops! Fix it',p:'One bead breaks the pattern. Say the colours out loud, then tap the bead that is wrong.',predict:{q:'Red, blue, red, red, red, blue. Is it a pattern all the way?',opts:['Yes','No, one is wrong'],ans:1},task:'Fix 3 patterns',
 show:()=>{steps[3].go();play(FIX.flatMap(p=>[()=>pickBead(p.bad),()=>{}]),500)},go:()=>{wipe();say('One bead is wrong. Tap it.');keys();S.want=ready(3,()=>S.won>=3,'You found the bead that broke the pattern.')}},
{h:'Make your own',p:'Pick 2 or 3 beads for the part that repeats. Then tap Repeat it! and the machine makes the pattern.',task:'Make 2 patterns',
 show:()=>{steps[4].go();play([()=>addCore('r'),()=>addCore('y'),repeatIt,()=>addCore('b'),()=>addCore('b'),()=>addCore('r'),repeatIt],330)},go:()=>{wipe();say('Make the part that repeats. Pick 2 or 3 beads.');keys();S.want=ready(4,()=>S.made>=2,'A pattern is one part, repeated again and again.')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Red, blue, red, blue, red… What comes next?',[['Blue','ok'],['Red','same'],['Green','new']]],
 ['Clap, stamp, clap, stamp, clap… What comes next?',[['Stamp','ok'],['Clap','same'],['Jump','new']]],
 ['Car, car, bus, car, car, bus, car… What comes next?',[['Car','ok'],['Bus','swap'],['Bike','new']]],
 ['Which one is a pattern?',[['Red, blue, red, blue','ok'],['Red, blue, blue, red, green','random'],['Red, blue, then stop','short']]],
 ['Red, blue, red, red, red, blue. Which one is wrong?',[['The 4th one, red','ok'],['The 1st one, red','first'],['None, it is fine','fine']]]];
function hint(t){let m='Find the part that repeats, then say it again.';
 if(t==='same')m='The same one does not come twice here. Say it out loud: red, blue, red, blue. It swaps every time.';
 if(t==='new')m='A pattern uses the same things again. Nothing new comes in. Say the part that repeats.';
 if(t==='swap')m='Car, car, bus is the part that repeats. After one car, there is one more car before the bus.';
 if(t==='random')m='Red, blue, blue, red, green does not repeat the same part. It is all mixed up.';
 if(t==='short')m='Red, blue once is not enough to see it repeat. A pattern goes again and again.';
 if(t==='first')m='The first one starts the pattern. Say it: red, blue, red, blue. The 4th should be blue.';
 if(t==='fine')m='Say it: red, blue, red, then red again. It should be blue. One bead is wrong.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! You found the pattern.':'✗ '+hint(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}});
A.start()})})();
