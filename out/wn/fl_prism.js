/* Flagship – white light and colour (Science, Waves, Light & Sound, ages 11-12; NC England KS3 Physics: colours and
   the different frequencies of light, white light and prisms, differential colour effects in absorption and diffuse
   reflection). The learner names the bands of a prism's spectrum in frequency order, finds the colour that bends most
   and recombines the colours with a second prism, predicts the colour of shirts in coloured light, builds filter
   stacks to reach a target colour, and picks the filter that makes an object look a given colour.
   Data and drawings: prism_art.js. */
(()=>{const K=PRS;
VIS.reg('flagprism',c=>{let A,tray,chal,qn=-1,tick=0,drag=null;const S={};
const STEPS=['spec','join','see','filt','lit','quiz'],cur=()=>STEPS[A.step];
const inR=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const fs=n=>A.narrow?n:Math.round(n*1.08),dk=()=>A.col.dark;
let TILES=[],BANDS=[],ZONE=null,SLOTS=[],OBJ=null;
const later=(ms,f)=>{const t0=tick;setTimeout(()=>{if(t0===tick)f()},S.auto?Math.round(ms*.3):ms)};
const turn=(list,k)=>{const s=(k+1)%list.length;return list.slice(s).concat(list.slice(0,s))};
function wrap(t,max,font){const g=A.ctx;g.font=font;const out=[];let ln='';for(const w of String(t).split(' ')){const nx=ln?ln+' '+w:w;if(ln&&g.measureText(nx).width>max){out.push(ln);ln=w}else ln=nx}if(ln)out.push(ln);return out}
function banner(t,tone){const g=A.ctx,f=`800 ${fs(16)}${K.FONT}`,L=wrap(t,A.W-34,f),lh=fs(16)*1.3,h=L.length*lh+14;
 g.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');K.box(g,8,8,A.W-16,h,10);g.fill();
 g.lineWidth=tone?2.5:1.2;g.strokeStyle=tone==='ok'?K.OK:tone==='no'?K.NO:K.RIM;g.stroke();g.font=f;g.fillStyle=dk()?'#f1f5f9':K.INK;g.textAlign='left';g.textBaseline='top';L.forEach((r,i)=>g.fillText(r,17,15+i*lh));
 let y=h+12;const rows=A.narrow?3:2;if(S.say&&tone!=='quiz'&&!S.fin){const f2=`700 ${fs(14)}${K.FONT}`;g.font=f2;g.fillStyle=S.bad?(dk()?'#fca5a5':K.NO):(dk()?'#86efac':K.OK);wrap(S.say,A.W-34,f2).slice(0,rows).forEach((r,i)=>g.fillText(r,17,y+i*fs(14)*1.3))}
 return y+rows*fs(14)*1.3+4}
function trayAt(n){const gap=8,cols=A.narrow?(n>3?2:1):Math.min(n,4),rows=Math.ceil(n/cols),h=A.narrow?42:50,w=(A.W-16-gap*(cols-1))/cols,top=A.H-8-rows*h-(rows-1)*gap;
 return Array.from({length:n},(_,i)=>({x:8+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
/* ---- tiles in the tray for each step ---- */
const ORDER7=[3,6,0,5,2,4,1];
function tiles(){const m=cur();if(m==='spec')return ORDER7.map(i=>({t:K.SPEC[i].n,v:i,sw:null}));
 if(m==='join')return S.phase==='join'?[{t:'Second prism, upside down',v:0}]:[];
 if(m==='see')return turn(K.SEE[S.k].o,S.k).map(([t,tag])=>({t,v:tag}));
 return K.FILT.map((f,i)=>({t:`${f.n} filter`,v:i,sw:K.HEX[f.s]}))}
/* ---- step 0 and 1: the prism and its spectrum ---- */
function specGeo(r){const by=r.y+r.h*.42,px=r.x+r.w*.33,s=Math.min(r.h*.5,r.w*.22),sx=r.x+r.w-14-Math.min(70,r.w*.16),top=r.y+10,bh=(r.h-20)/7;
 return{by,px,s,sx,top,bh,ex:px+s*.18,ey:by+s*.06}}
function paintSpec(r){const g=A.ctx,G=specGeo(r);K.rayBox(g,r.x+34,G.by,26);K.beam(g,r.x+34,G.by,G.px-G.s*.12,G.by,'#ffffff',5);
 const joined=cur()==='join'&&S.joined,zx=r.x+r.w*.62;
 BANDS=K.SPEC.map((c,i)=>({x:G.sx,y:G.top+i*G.bh,w:r.x+r.w-8-G.sx,h:G.bh-2,i}));
 K.SPEC.forEach((c,i)=>{const b=BANDS[i],ty=b.y+b.h/2;g.globalAlpha=.9;
  if(joined){const zy=G.by+G.s*.35;K.beam(g,G.ex,G.ey,zx-G.s*.1,zy+(i-3)*G.s*.035,c.c,3)}else K.beam(g,G.ex,G.ey,G.sx,ty,c.c,3);g.globalAlpha=1});
 K.prism(g,G.px,G.by,G.s,false);
 if(joined){const zy=G.by+G.s*.35;K.prism(g,zx,zy,G.s*.8,true);K.beam(g,zx+G.s*.12,zy,G.sx,zy,'#ffffff',5);
  g.fillStyle='#ffffff';K.box(g,G.sx,zy-16,r.x+r.w-8-G.sx,32,6);g.fill();g.fillStyle=K.INK;g.font=`800 ${fs(13)}${K.FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText('White',G.sx+(r.x+r.w-8-G.sx)/2,zy)}
 else BANDS.forEach((b,i)=>{const c=K.SPEC[i],lab=S.named[i];g.fillStyle=c.c;g.fillRect(b.x,b.y,b.w,b.h);
  if(S.miss===i){g.strokeStyle='#f87171';g.lineWidth=3;g.strokeRect(b.x+1,b.y+1,b.w-2,b.h-2)}if(S.hit===i){g.strokeStyle='#ffffff';g.lineWidth=3;g.strokeRect(b.x+1,b.y+1,b.w-2,b.h-2)}
  if(lab||cur()==='join'){g.fillStyle=i>=4?'#ffffff':K.INK;g.font=`800 ${Math.round(Math.min(fs(13),b.h*.7))}${K.FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(c.n,b.x+b.w/2,b.y+b.h/2,b.w-4)}});
 /* frequency arrow down the side of the screen */
 g.strokeStyle='#cbd5e1';g.fillStyle='#cbd5e1';g.lineWidth=2;const ax=G.sx-10;g.beginPath();g.moveTo(ax,G.top+4);g.lineTo(ax,G.top+7*G.bh-8);g.stroke();g.beginPath();g.moveTo(ax-5,G.top+7*G.bh-14);g.lineTo(ax+5,G.top+7*G.bh-14);g.lineTo(ax,G.top+7*G.bh-6);g.closePath();g.fill();
 g.save();g.translate(ax-9,G.top+3.5*G.bh);g.rotate(-Math.PI/2);g.font=`700 ${fs(11)}${K.FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText('frequency increases',0,0);g.restore();
 ZONE=cur()==='join'&&S.phase==='join'&&!S.joined?{x:zx-G.s*.45,y:G.by-G.s*.1,w:G.s*.9,h:G.s*.9}:null;
 if(ZONE){g.setLineDash([6,5]);g.strokeStyle=drag?'#60a5fa':'#94a3b8';g.lineWidth=drag?3:2;K.box(g,ZONE.x,ZONE.y,ZONE.w,ZONE.h,8);g.stroke();g.setLineDash([]);g.fillStyle='#cbd5e1';g.font=`700 ${fs(11)}${K.FONT}`;g.textAlign='center';g.fillText('second prism here',ZONE.x+ZONE.w/2,ZONE.y+ZONE.h+12)}}
function nameBand(v,j){if(S.fin||S.named[j])return;if(v===j){S.named[j]=true;S.miss=null;A.sound.pop();const left=7-Object.keys(S.named).length;if(!left){S.fin=true;return say(K.DONE[0],false)}return say(`Yes, ${K.SPEC[v].n}. ${left} to go.`,false)}
 S.miss=j;A.sound.miss();say(why(v===6-j?'flip':Math.abs(v-j)===1?'near':'order'),true)}
function tapBand(j){if(cur()==='spec'){if(S.sel==null)return say('First pick a colour name from the tray.',true);const v=S.sel;S.sel=null;return nameBand(v,j)}
 if(cur()==='join'&&S.phase==='most'){if(j===6){S.hit=6;S.miss=null;A.sound.pop();S.phase='join';return say('Yes: violet has the highest frequency and bends most. Red bends least. Now drag the second prism into the coloured light.',false)}
  S.miss=j;A.sound.miss();return say(why(j===0?'leastmost':'most'),true)}}
function joinUp(){if(S.phase!=='join'||S.joined)return;S.joined=true;S.fin=true;A.sound.pop();say(K.DONE[1],false)}
/* ---- step 2: objects in coloured light ---- */
function sceneLamp(r,light,filt){const g=A.ctx,lx=r.x+30,ly=r.y+34,ox=r.x+r.w*.66,oy=r.y+r.h*.58,os=Math.min(r.h*.55,r.w*.3);
 K.rayBox(g,lx+18,ly,26);let col=light,fx=r.x+r.w*.26;
 if(filt!==undefined){SLOTS=[{x:fx-9,y:ly-26,w:18,h:52}];K.filter(g,SLOTS[0],filt==null?null:K.FILT[filt],{sel:drag!=null||S.sel!=null,no:S.missSlot===0});K.beam(g,lx+18,ly,fx-9,ly,'#ffffff',5);col=filt==null?light:K.both(light,K.FILT[filt].s)}
 const x0=filt!==undefined?fx+9:lx+18;if(col!==null&&col!==undefined){g.globalAlpha=col===''?0:.35;g.fillStyle=K.HEX[col]||'#fff';g.beginPath();g.moveTo(x0,ly-4);g.lineTo(ox-os*.55,oy-os*.45);g.lineTo(ox+os*.1,oy+os*.5);g.lineTo(x0,ly+4);g.closePath();g.fill();g.globalAlpha=1}
 OBJ={x:ox-os*.55,y:oy-os*.5,w:os*1.1,h:os,ox,oy,os};return col}
function paintSee(r){const g=A.ctx,R=K.SEE[S.k%3],seen=K.both(R.light,R.refl);sceneLamp(r,R.light);
 K.thing(g,OBJ.ox,OBJ.oy,OBJ.os,R.obj,K.HEX[seen],!S.ans);label(r,`${K.NAME[R.light]} light`,`A ${R.obj}${S.ans?': looks '+K.NAME[seen].toLowerCase():''}`)}
function label(r,a,b){const g=A.ctx;g.fillStyle='#e2e8f0';g.font=`800 ${fs(13)}${K.FONT}`;g.textAlign='left';g.textBaseline='top';g.fillText(a,r.x+12,r.y+r.h-22,r.w*.45);g.textAlign='right';g.fillText(b,r.x+r.w-12,r.y+r.h-22,r.w*.55)}
function answerSee(tag){if(S.fin||S.wait)return;const R=K.SEE[S.k];if(tag!=='ok'){A.sound.miss();S.missT=tag;return say(why(tag),true)}
 S.ans=true;S.missT=null;A.sound.pop();S.wait=true;const seen=K.both(R.light,R.refl);say(seen?`Yes: it reflects ${K.NAME[seen].toLowerCase()} light, so it looks ${K.NAME[seen].toLowerCase()}.`:`Yes: there is no red in blue light, so nothing is reflected and it looks black.`,false);
 later(1500,()=>{S.wait=false;S.k++;S.ans=false;if(S.k>=3){S.k=2;S.ans=true;S.fin=true;return say(K.DONE[2],false)}say(`Next: a ${K.SEE[S.k].obj} in ${K.NAME[K.SEE[S.k].light].toLowerCase()} light. What colour does it look?`,false)})}
/* ---- step 3: filter stacks ---- */
const outOf=()=>{const B=K.BEAM[S.k];let l='rgb';const st=(B.pre?[B.pre.s]:[]).concat(S.f.map(i=>K.FILT[i].s));st.forEach(s=>l=K.both(l,s));return l};
function paintFilt(r){const g=A.ctx,B=K.BEAM[Math.min(S.k,2)],by=r.y+r.h*.45,lx=r.x+30,sx=r.x+r.w-60;K.rayBox(g,lx+18,by,26);
 const xs=B.slots===1?[r.x+r.w*.45]:[r.x+r.w*.36,r.x+r.w*.58];SLOTS=xs.map(x=>({x:x-10,y:by-34,w:20,h:68}));
 let l='rgb',x=lx+18;const fil=(B.pre?[B.pre]:[]).concat(S.f.map(i=>K.FILT[i]));
 SLOTS.forEach((s,j)=>{if(l!=='')K.beam(g,x,by,s.x,by,K.HEX[l],5);const f=fil[j]||null;K.filter(g,s,f,{sel:(drag!=null||S.sel!=null)&&!f,no:S.missSlot===j});if(f){l=K.both(l,f.s)}x=s.x+s.w;
  if(f){g.fillStyle='#e2e8f0';g.font=`700 ${fs(11)}${K.FONT}`;g.textAlign='center';g.textBaseline='top';g.fillText(f.n,s.x+s.w/2,s.y+s.h+6)}});
 const done=fil.length===B.slots;if(l!==''&&done)K.beam(g,x,by,sx,by,K.HEX[l],5);else if(l!==''&&!done)K.beam(g,x,by,x+16,by,K.HEX[l],5);
 g.fillStyle=done?(l===''?'#111827':K.HEX[l]):'#1f2937';g.strokeStyle='#94a3b8';g.lineWidth=2;K.box(g,sx,by-46,40,92,6);g.fill();g.stroke();
 label(r,'White light in',done?`Screen: ${l===''?'no light':K.NAME[l].toLowerCase()+' light'}`:'Screen')}
function putFilter(i,slot){if(S.fin||S.wait)return;const B=K.BEAM[S.k],free=B.slots-(B.pre?1:0)-S.f.length;if(free<=0)return;S.sel=null;S.f.push(i);A.sound.tick();
 if(S.f.length+(B.pre?1:0)<B.slots)return say(`Light after the ${K.FILT[i].n.toLowerCase()} filter: ${K.NAME[outOf()].toLowerCase()}. Add the second filter.`,false);
 const got=outOf();if(got===B.goal){A.sound.pop();S.wait=true;say(B.goal===''?'No light: the second filter absorbs the only colour the first let through.':`Yes: ${K.NAME[got].toLowerCase()} light reaches the screen.`,false);
  return later(1500,()=>{S.wait=false;S.f=[];S.k++;if(S.k>=3){S.k=2;S.f=[2];S.fin=true;return say(K.DONE[3],false)}say(K.BEAM[S.k].ask,false)})}
 A.sound.miss();S.missSlot=S.f.length-1+(B.pre?1:0);S.wait=true;
 const tag=S.k===0?'wrongfilter':S.k===1?'same':got==='g'?'cyanpart':'cyanred';say(why(tag),true);later(1600,()=>{S.wait=false;S.f=[];S.missSlot=null;A.redraw();keys()})}
/* ---- step 4: a filter in front of the lamp and an object ---- */
function paintLit(r){const g=A.ctx,L=K.LIT[Math.min(S.k,2)],col=sceneLamp(r,'rgb',S.lf);const seen=S.lf==null?null:K.both(K.FILT[S.lf].s,L.refl);
 K.thing(g,OBJ.ox,OBJ.oy,OBJ.os,L.obj,seen==null?K.HEX[L.refl]:K.HEX[seen],false);label(r,S.lf==null?'White light, no filter':`${K.FILT[S.lf].n} filter`,`${L.obj}: looks ${K.NAME[seen==null?L.refl:seen].toLowerCase()}`)}
function putLit(i){if(S.fin||S.wait)return;const L=K.LIT[S.k];S.sel=null;S.lf=i;const seen=K.both(K.FILT[i].s,L.refl);
 if(seen===L.goal){A.sound.pop();S.wait=true;say(`Yes: only ${K.FILT[i].n.toLowerCase()} light reaches the ${L.obj.split(' ')[1]}, and it ${seen?'reflects '+K.NAME[seen].toLowerCase():'cannot reflect it, so it looks black'}.`,false);
  return later(1600,()=>{S.wait=false;S.lf=null;S.k++;if(S.k>=3){S.k=2;S.lf=0;S.fin=true;return say(K.DONE[4],false)}say(K.LIT[S.k].ask,false)})}
 A.sound.miss();S.missSlot=0;S.wait=true;say(`With a ${K.FILT[i].n.toLowerCase()} filter only ${K.FILT[i].n.toLowerCase()} light arrives. The ${L.obj} ${seen?'reflects it, so it looks '+K.NAME[seen].toLowerCase():'cannot reflect it, so it looks black'}. `+why(L.goal===''?'litblack':'litcol'),true);
 later(1700,()=>{S.wait=false;S.lf=null;S.missSlot=null;A.redraw();keys()})}
/* ---- painting ---- */
function draw(){const g=A.ctx;g.fillStyle=dk()?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H);const m=cur();
 if(m==='quiz'){const y0=banner('Challenge: light and colour','quiz'),r={x:8,y:y0,w:A.W-16,h:Math.min(A.H-y0-12,220)};K.bench(g,r);S.named={0:1,1:1,2:1,3:1,4:1,5:1,6:1};paintSpec(r);return}
 const heads={spec:`Name each band of the spectrum: ${Object.keys(S.named).length} of 7.`,join:S.phase==='most'?'Which colour bent the most? Tap its band.':'Drag the second prism into the coloured light.',see:`A ${K.SEE[Math.min(S.k,2)].obj} in ${K.NAME[K.SEE[Math.min(S.k,2)].light].toLowerCase()} light. What colour does it look? (${Math.min(S.k+1,3)} of 3)`,filt:`${K.BEAM[Math.min(S.k,2)].ask} (${Math.min(S.k+1,3)} of 3)`,lit:`${K.LIT[Math.min(S.k,2)].ask} (${Math.min(S.k+1,3)} of 3)`};
 const y0=banner(S.fin?K.DONE[A.step]:heads[m],S.fin?'ok':S.bad?'no':''),T=S.fin?[]:tiles(),tr=trayAt(Math.max(T.length,1)),bottom=T.length?tr[0].y-10:A.H-10,r={x:8,y:y0,w:A.W-16,h:bottom-y0};
 K.bench(g,r);({spec:paintSpec,join:paintSpec,see:paintSee,filt:paintFilt,lit:paintLit})[m](r);
 TILES=T.map((t,i)=>({...t,...tr[i]}));TILES.forEach((q,i)=>{if(drag&&drag.k===i)return;K.tile(g,q,q.t,{sw:q.sw,sel:S.sel===q.v&&m!=='see',no:m==='see'?S.missT===q.v:false,used:m==='spec'&&S.named[q.v]})});
 if(drag){const q=TILES[drag.k];if(q)K.tile(g,{x:drag.x-q.w/2,y:drag.y-q.h/2,w:q.w,h:q.h},q.t,{sw:q.sw,sel:true})}A.fx.draw(g)}
/* ---- pointer ---- */
function useTile(q){const m=cur();if(m==='spec'){if(S.named[q.v])return;S.sel=q.v;A.sound.tick();return say(`Holding ${K.SPEC[q.v].n}. Now tap its band on the screen.`,false)}
 if(m==='join')return joinUp();if(m==='see')return answerSee(q.v);if(m==='filt')return putFilter(q.v);if(m==='lit')return putLit(q.v)}
function dropTile(q,p){const m=cur();if(m==='spec'){const b=BANDS.find(z=>inR(p,z));if(b)return nameBand(q.v,b.i)}
 if(m==='join'&&inR(p,ZONE))return joinUp();if(m==='see'&&inR(p,OBJ))return answerSee(q.v);if((m==='filt'||m==='lit')&&SLOTS.some(s=>inR(p,{x:s.x-14,y:s.y-14,w:s.w+28,h:s.h+28})))return m==='filt'?putFilter(q.v):putLit(q.v);A.redraw()}
function down(p){const k=TILES.findIndex(b=>inR(p,b));if(k>=0&&!S.fin){drag={k,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 const b=BANDS.find(z=>inR(p,z));if(b&&(cur()==='spec'||cur()==='join'))tapBand(b.i);
 if(cur()==='join'&&ZONE&&inR(p,ZONE))say('Drag the second prism from the tray into this box, or tap it in the tray.',false);return false}
function move(p){if(drag){drag.x=p.x;drag.y=p.y;A.redraw()}}
function up(p){if(!drag)return;const d=drag;drag=null;const q=TILES[d.k];if(!q)return A.redraw();if(Math.hypot(p.x-d.x0,p.y-d.y0)<8)return useTile(q);dropTile(q,p)}
function clear(){tick++;drag=null;for(const k in S)delete S[k];Object.assign(S,{k:0,phase:'most',named:{},sel:null,miss:null,missT:null,missSlot:null,hit:null,joined:false,ans:false,f:[],lf:null,wait:false,fin:false,say:null,bad:false,goal:()=>{}})}
function say(t,bad){S.say=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.goal()}
function open(i){clear();c.say(K.DESC[i]);A.cv.setAttribute('aria-label',K.DESC[i]);S.goal=()=>{if(A.step===i&&S.fin&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(K.DONE[i]+A.reveal(i))};
 say(i===0?'Pick a colour name, then tap or drag it to its band.':i===1?'Which colour bent the most? Tap its band.':i===2?`A ${K.SEE[0].obj} in white light. What colour does it look?`:i===3?K.BEAM[0].ask:K.LIT[0].ask,false)}
/* Show me: keep making the next right move until the step is done */
function auto(i){steps[i].go();S.auto=true;const t0=tick;let n=0;const go=()=>{if(t0!==tick||S.fin||n++>40)return;if(!S.wait){const m=cur();
  if(m==='spec'){const j=[0,1,2,3,4,5,6].find(x=>!S.named[x]);nameBand(j,j)}
  else if(m==='join'){if(S.phase==='most')tapBand(6);else joinUp()}
  else if(m==='see')answerSee('ok');
  else if(m==='filt'){const B=K.BEAM[S.k],plan=S.k===0?[0]:S.k===1?[0,1]:[2];putFilter(plan[S.f.length])}
  else if(m==='lit')putLit([0,1,0][S.k])}
  setTimeout(go,280)};setTimeout(go,280)}
/* the same moves as buttons */
function keys(){if(!tray)return;tray.innerHTML='';const m=cur(),add=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t);b.onclick=f};if(m==='quiz'||S.fin)return;
 if(m==='spec'){if(S.sel==null)ORDER7.forEach(v=>{if(!S.named[v])add(K.SPEC[v].n,()=>useTile({v}),`Pick the colour name ${K.SPEC[v].n}`)});else K.SPEC.forEach((_,j)=>{if(!S.named[j])add(`Band ${j+1}`,()=>tapBand(j),`Put ${K.SPEC[S.sel].n} on band ${j+1} from the top`)});return}
 if(m==='join'){if(S.phase==='most')K.SPEC.forEach((c,j)=>add(`${c.n} band`,()=>tapBand(j),`The ${c.n.toLowerCase()} band bent the most`));else add('Put the second prism in',joinUp);return}
 if(m==='see')return tiles().forEach(q=>add(q.t,()=>answerSee(q.v),`It looks ${q.t.toLowerCase()}`));
 tiles().forEach(q=>add(q.t,()=>useTile(q),`Put the ${q.t.toLowerCase()} in the beam`))}
const steps=[
{h:'Split white light',p:K.TXT[0],predict:{q:'A prism makes colours from white light. Where do the colours come from?',opts:['The glass adds them','They were already in the white light'],ans:1},task:'Name all 7 bands of the spectrum',
 show:()=>auto(0),go:()=>open(0)},
{h:'Bend and rejoin',p:K.TXT[1],predict:{q:'Which colour does the glass bend the most?',opts:['Red','Violet'],ans:1},task:'Find the colour that bends most, then rejoin the colours',
 show:()=>auto(1),go:()=>open(1)},
{h:'Coloured objects',p:K.TXT[2],predict:{q:'A red shirt is lit only by blue light. What colour does it look?',opts:['Purple','Black'],ans:1},task:'Say what colour 3 objects look',
 show:()=>auto(2),go:()=>open(2)},
{h:'Filters',p:K.TXT[3],predict:{q:'What does a red filter do to white light?',opts:['Adds red to the light','Absorbs every colour except red'],ans:1},task:'Build 3 filter stacks for the colour asked',
 show:()=>auto(3),go:()=>open(3)},
{h:'Filter and object',p:K.TXT[4],task:'Choose the filter for 3 objects',
 show:()=>auto(4),go:()=>open(4)},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.goal()});
/* a reply for each slip */
function why(tag){let m=K.WHY[tag]||'White light is a mix of colours; objects reflect some and filters pass some.';
 if(tag==='flip')m='That order is upside down. Red has the lowest frequency and bends least, so it is at the top. Violet bends most.';
 if(tag==='near')m='Close, but one place out. The order is red, orange, yellow, green, blue, indigo, violet.';
 if(tag==='order')m='Not that band. Frequency rises from red at the top to violet at the bottom: red, orange, yellow, green, blue, indigo, violet.';
 return m}
function quiz(){qn++;const Q=K.QS[qn%K.QS.length],opts=turn([[Q.a,'ok'],...Q.o],qn);
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>check(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function check(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`\u2713 Yes: ${a}`:'\u2717 '+why(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=quiz;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.6,draw,onStep:X=>{chal.hidden=X.step!==5;tray.hidden=X.step===5;keys()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Light lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
