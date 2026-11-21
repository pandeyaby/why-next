/* Flagship – expanded noun phrases with prepositional phrases (ages 9–10; NC England Y4 grammar, Y3 prepositions).
   Tap the preposition and see the phrase it opens, expand “the dog” until it picks out one dog in the picture (each
   adjective or phrase greys out the dogs it rules out), give each phrase its job (which one, or where/when/how),
   see one phrase give a sentence two meanings, and sort phrases from clauses. Drag a card, or tap it and then a
   target; every move has a button too. Data in learn/pphr_art.js. */
(()=>{const P=PPHR;
VIS.reg('flagpphr',c=>{let A,dock,box,qi=-1,run=0,grab=null;const S={};
const INK='#1e293b',OKC='#15803d',NO='#b91c1c',LINE='#64748b',PICK='#7c3aed',PAPER='#ffffff',WON='#dcfce7',PREP='#ddd6fe',NP='#fef3c7',SKY='#f1f5f9';
const KEYS=['spot','grow','job','two','sort','chal'],kk=()=>KEYS[A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.12));
const LIST={grow:[P.GROW],job:P.JOB.rounds.map(r=>({zones:P.JOB.zones,cards:[{t:r.ph,to:r.to,why:r.why}],r})),
 two:P.TWO.rounds.map(r=>r.fix?{zones:['Clear sentence'],cards:r.cards.map(x=>({t:x.t,to:x.ok?0:-1,why:x.why})),r}:{zones:['saw','dog'],cards:[{t:P.TWO.ph,to:r.ans==='saw'?0:1,why:r.why}],r}),sort:[P.SORT]};
const total=k=>k==='spot'?P.SPOT.length:LIST[k].length;
const now=k=>{k=k||kk();const i=Math.min(S[k].i,total(k)-1);return k==='spot'?P.SPOT[i]:LIST[k][i]};
const over=k=>S[k].i>=total(k);
const hit=(p,b)=>!!b&&p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h;
function wordsIn(g,txt,max){const rows=[[]];let w=0;for(const t of txt.split(' ')){const m=g.measureText(t).width;if(w&&w+m>max){rows.push([]);w=0}rows[rows.length-1].push(t);w+=m+g.measureText(' ').width}return rows.map(r=>r.join(' '))}
function chip(b,txt,o){o=o||{};const g=A.ctx;g.beginPath();A.paint.rrect(b.x,b.y,b.w,b.h,o.r||10);g.fillStyle=o.fill||PAPER;g.fill();
 g.lineWidth=o.mark?3:1.5;g.strokeStyle={ok:OKC,no:NO,pick:PICK}[o.mark]||LINE;if(o.dash)g.setLineDash([5,5]);g.stroke();g.setLineDash([]);if(!txt)return;
 let f=sz(o.f||14)+1,rows;for(;;){f--;g.font=`${o.wt||700} ${f}px system-ui,sans-serif`;rows=wordsIn(g,txt,b.w-14);if(rows.length*(f+4)<=b.h-6||f<=9)break}
 g.fillStyle=o.ink||INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((s,i)=>g.fillText(s,b.x+b.w/2,b.y+b.h/2+(i-(rows.length-1)/2)*(f+4)))}
/* a sentence as tappable word tiles, centred, wrapped */
function tiles(text,y){const g=A.ctx,f=sz(17);g.font=`700 ${f}px system-ui,sans-serif`;const h=Math.max(40,f+22),gap=6,out=[];let row=[],w=0;const rows=[];
 text.split(' ').forEach(t=>{const tw=g.measureText(t).width+20;if(row.length&&w+tw>A.W-16){rows.push([row,w]);row=[];w=0}row.push([t,tw]);w+=tw+gap});rows.push([row,w]);
 rows.forEach(([r,rw],ri)=>{let x=(A.W-(rw-gap))/2;r.forEach(([t,tw])=>{out.push({x,y:y+ri*(h+gap),w:tw,h,t});x+=tw+gap})});return{list:out,bottom:y+rows.length*(h+gap)}}
function boxes(n,x,y,w,h,cols){const gp=8,cw=(w-gp*(cols-1))/cols,rows=Math.ceil(n/cols),ch=Math.max(36,Math.min(48,(h-gp*(rows-1))/rows));
 return[...Array(n)].map((_,i)=>({x:x+(i%cols)*(cw+gp),y:y+Math.floor(i/cols)*(ch+gp),w:cw,h:ch}))}
function plan(){const k=kk(),W=A.W,H=A.H,o={bar:{x:8,y:6,w:W-16,h:sz(32)}};let y=o.bar.y+o.bar.h+10;
 if(k==='spot'){const T=tiles(now('spot').w,y+8);o.words=T.list;o.found=T.bottom+sz(40);return o}
 const R=now(k),n=R.cards.length;
 if(k==='grow'){o.pic={x:8,y,w:W-16,h:H*(A.narrow?.3:.34)};y+=o.pic.h+8;o.line={x:8,y,w:W-16,h:sz(34)};y+=o.line.h+8;const zh=sz(A.narrow?100:84);
  o.zones=[{x:8,y,w:(W-24)*.36,h:zh},{x:16+(W-24)*.36,y,w:(W-24)*.64,h:zh}];y+=zh+10;o.pool=boxes(n,8,y,W-16,H-y-6,A.narrow?2:3);return o}
 if(k==='job'){const T=tiles(R.r.s,y);o.words=T.list;y=T.bottom+8;const zh=sz(76);
  o.zones=A.narrow?[{x:8,y,w:W-16,h:zh},{x:8,y:y+zh+8,w:W-16,h:zh}]:[{x:8,y,w:(W-24)/2,h:zh},{x:16+(W-24)/2,y,w:(W-24)/2,h:zh}];y=o.zones[1].y+zh+12;
  o.pool=[{x:W*.2,y,w:W*.6,h:sz(46)}];return o}
 if(k==='two'){o.pic={x:8,y,w:W-16,h:H*(A.narrow?.34:.4)};y+=o.pic.h+8;const T=tiles(P.TWO.s,y);o.words=T.list;y=T.bottom+8;
  if(R.r.fix){o.zones=[{x:8,y,w:W-16,h:sz(66)}];y+=sz(66)+10;o.pool=boxes(n,8,y,W-16,H-y-6,1)}
  else{o.zones=['saw','dog'].map(t=>o.words.find(b=>b.t.replace('.','')===t));o.pool=[{x:W*.2,y:y+4,w:W*.6,h:sz(46)}]}return o}
 const zh=H*(A.narrow?.3:.34);o.zones=[{x:8,y,w:(W-24)/2,h:zh},{x:16+(W-24)/2,y,w:(W-24)/2,h:zh}];y+=zh+10;o.pool=boxes(n,8,y,W-16,H-y-6,A.narrow?2:3);return o}
/* pictures: flat shapes only */
function pup(x,y,s,collar,dim){const g=A.ctx;g.save();g.globalAlpha=dim?.2:1;g.strokeStyle=INK;g.lineWidth=1.6;g.fillStyle='#b45309';
 g.beginPath();[-.45,-.2,.2,.45].forEach(d=>{g.moveTo(x+d*s,y+.2*s);g.lineTo(x+d*s,y+.62*s)});g.stroke();
 g.beginPath();g.moveTo(x-.65*s,y-.05*s);g.lineTo(x-.98*s,y-.42*s);g.stroke();
 g.beginPath();g.ellipse(x,y,.66*s,.32*s,0,0,7);g.fill();g.stroke();g.beginPath();g.arc(x+.72*s,y-.36*s,.28*s,0,7);g.fill();g.stroke();
 g.beginPath();g.moveTo(x+.6*s,y-.58*s);g.lineTo(x+.52*s,y-.86*s);g.lineTo(x+.78*s,y-.62*s);g.closePath();g.fill();g.stroke();
 if(collar){g.strokeStyle=collar;g.lineWidth=Math.max(4,.18*s);g.beginPath();g.moveTo(x+.5*s,y-.3*s);g.lineTo(x+.6*s,y-.05*s);g.stroke()}g.restore()}
function gate(x,y,h){const g=A.ctx;g.strokeStyle=A.col.dark?'#cbd5e1':'#78716c';g.lineWidth=3;g.beginPath();for(let i=0;i<4;i++){g.moveTo(x+i*9,y);g.lineTo(x+i*9,y-h)}g.moveTo(x-3,y-h*.8);g.lineTo(x+30,y-h*.8);g.moveTo(x-3,y-h*.3);g.lineTo(x+30,y-h*.3);g.stroke()}
function tree(x,y,h){const g=A.ctx;g.fillStyle='#7c4a1e';g.fillRect(x-4,y-h*.55,8,h*.55);g.fillStyle='#16a34a';g.beginPath();g.arc(x,y-h*.7,h*.3,0,7);g.fill()}
function dogs(b){const g=A.ctx,s=S.grow,R=now('grow');chip(b,'',{fill:A.col.dark?'#334155':SKY});const n=P.DOGS.length,cols=A.narrow?2:4,cw=b.w/cols,ch=b.h/Math.ceil(n/cols);
 const rules=R.cards.filter((cd,i)=>s.put[i]!=null&&cd.cut).map(cd=>cd.cut);
 P.DOGS.forEach((d,i)=>{const cx=b.x+(i%cols+.5)*cw,cy=b.y+(Math.floor(i/cols)+.5)*ch,base=cy+ch*.32,unit=Math.min(cw,ch)*(d.big?.46:.32),out=rules.some(f=>!f(d));
  if(d.gate)gate(cx-cw*.42,base,ch*.6);else tree(cx-cw*.3,base,ch*.75);pup(cx+cw*.06,base-unit*.62,unit,d.red?'#dc2626':'#2563eb',out);
  if(d.aim){g.strokeStyle=PICK;g.lineWidth=3;g.setLineDash([6,4]);g.beginPath();g.ellipse(cx+cw*.06,base-unit*.6,unit*1.25,unit*.95,0,0,7);g.stroke();g.setLineDash([])}})}
function scope(x,y,ang,len){const g=A.ctx;g.save();g.translate(x,y);g.rotate(ang);g.fillStyle='#475569';g.fillRect(0,-5,len,10);g.fillRect(len-4,-8,10,16);g.restore()}
function twoPic(b,which){const g=A.ctx;chip(b,'',{fill:A.col.dark?'#334155':SKY});const u=Math.min(b.h/4,b.w/8),gx=b.x+b.w*.25,gy=b.y+b.h*.8;
 g.fillStyle='#7c3aed';g.beginPath();A.paint.rrect(gx-u*.45,gy-u*2.2,u*.9,u*1.5,u*.3);g.fill();g.fillStyle='#f5d0a9';g.strokeStyle=INK;g.lineWidth=1.5;g.beginPath();g.arc(gx,gy-u*2.6,u*.42,0,7);g.fill();g.stroke();
 g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(gx-u*.25,gy-u*.7);g.lineTo(gx-u*.3,gy);g.moveTo(gx+u*.25,gy-u*.7);g.lineTo(gx+u*.3,gy);g.stroke();
 g.font=`800 ${sz(13)}px system-ui,sans-serif`;g.fillStyle=A.col.dark?'#f8fafc':INK;g.textAlign='center';g.fillText('Mia',gx,gy+sz(14));
 const dx=b.x+b.w*.72,dy=gy-u*.6;pup(dx,dy,u*1.3,'#dc2626',0);g.fillStyle=A.col.dark?'#f8fafc':INK;g.fillText('dog',dx,gy+sz(14));
 if(which==='mia')scope(gx+u*.3,gy-u*2.65,-.06,u*1.6);else scope(dx+u*.9,dy-u*.55,-.5,u*1.4)}
const DONE={spot:'Preposition + noun phrase = prepositional phrase',grow:'the small dog with a red collar by the gate: just one dog',job:'Which one = adjective job. Where, when or how = adverb job',
 two:'Move the phrase to make the meaning clear',sort:'A phrase has no verb. A clause has a verb'};
function draw(){const g=A.ctx,k=kk();g.fillStyle=A.col.dark?'#0f172a':'#fafaf9';g.fillRect(0,0,A.W,A.H);
 if(k==='chal'){chip({x:A.W*.12,y:A.H*.32,w:A.W*.76,h:A.H*.24},'Find the preposition. Ask: which one, or where, when, how?',{fill:NP,f:16});return}
 const s=S[k],L=plan(),fin=over(k),R=now(k);chip(L.bar,fin?DONE[k]:(k==='spot'?'Tap the preposition':R.ask||(R.r&&R.r.ask)||'Which job does the phrase do?'),{fill:fin?WON:NP,mark:fin?'ok':null,wt:800,f:13});
 if(k==='spot'){const tg=R.tags.split(' '),p=tg.indexOf('P'),showing=s.flash;L.words.forEach((b,i)=>{const inP=showing&&i>=p;chip(b,b.t,{fill:inP?(i===p?PREP:NP):PAPER,mark:s.err===i?'no':inP?'ok':null,f:17})});
  if(showing){const a=L.words[p],z=L.words[L.words.length-1];g.font=`800 ${sz(12)}px system-ui,sans-serif`;g.fillStyle=A.col.dark?'#f8fafc':INK;g.textAlign='center';g.textBaseline='top';
   g.fillText('preposition',a.x+a.w/2,a.y+a.h+4);if(z.y===a.y)g.fillText('+ noun phrase',(L.words[p+1].x+z.x+z.w)/2,a.y+a.h+4)}
  g.font=`700 ${sz(13)}px system-ui,sans-serif`;g.fillStyle=A.col.dark?'#f8fafc':INK;g.textAlign='left';g.textBaseline='top';g.fillText(`Phrases found: ${s.got.length} of ${total(k)}`,10,L.found);
  s.got.forEach((t,i)=>chip({x:10,y:L.found+sz(22)+i*sz(40),w:A.W-20,h:sz(34)},t,{fill:WON,f:14}));return}
 if(L.pic){k==='grow'?dogs(L.pic):twoPic(L.pic,R.r.pic)}
 if(k==='grow'){const pre=R.cards.find((cd,i)=>s.put[i]===0),post=R.cards.filter((cd,i)=>s.put[i]===1).map(x=>x.t);chip(L.line,['the',pre?pre.t:'',`dog`,...post].filter(Boolean).join(' '),{fill:PREP,f:16,wt:800})}
 if(L.words&&k!=='spot'){const ph=(k==='job'?R.r.ph:P.TWO.ph).split(' ');let at=-1;const ws=L.words.map(b=>b.t.replace(/[.,]/g,''));for(let i=0;i+ph.length<=ws.length;i++)if(ph.every((t,j)=>ws[i+j]===t))at=i;
  const tgt=k==='job'&&s.put[0]!=null?ws.indexOf(R.r.word):-1;L.words.forEach((b,i)=>{const isZone=k==='two'&&!R.r.fix&&L.zones.includes(b);chip(b,b.t,{fill:i>=at&&i<at+ph.length?PREP:i===tgt?WON:PAPER,mark:i===tgt?'ok':isZone&&s.hov===L.zones.indexOf(b)?'pick':null,dash:isZone,f:17})});
  if(tgt>=0){const a=L.words[at],b=L.words[tgt];g.strokeStyle=OKC;g.lineWidth=2.5;g.beginPath();g.moveTo(a.x+a.w/2,a.y);g.quadraticCurveTo((a.x+b.x)/2+a.w/2,Math.min(a.y,b.y)-24,b.x+b.w/2,b.y);g.stroke()}}
 if(!(k==='two'&&!R.r.fix))L.zones.forEach((b,j)=>{const mine=R.cards.filter((cd,i)=>s.put[i]===j);chip(b,'',{dash:!mine.length,mark:s.hov===j?'pick':mine.length?'ok':null,fill:mine.length?WON:PAPER});
  g.font=`800 ${sz(12)}px system-ui,sans-serif`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';wordsIn(g,R.zones[j],b.w-12).forEach((t,q)=>g.fillText(t,b.x+b.w/2,b.y+5+q*sz(15)));
  const head=sz(15)*wordsIn(g,R.zones[j],b.w-12).length+8,cols=k==='sort'&&!A.narrow?2:1,cw=(b.w-12)/cols,rh=Math.min(sz(30),(b.h-head-4)/Math.ceil(Math.max(1,mine.length)/cols));
  mine.forEach((cd,m)=>chip({x:b.x+6+(m%cols)*cw,y:b.y+head+Math.floor(m/cols)*rh,w:cw-4,h:rh-3},cd.t,{fill:'#bbf7d0',f:12}))});
 if(!fin)R.cards.forEach((cd,i)=>{if(s.put[i]!=null||(grab&&grab.i===i)||!L.pool[i])return;chip(L.pool[i],cd.t,{mark:s.err===i?'no':s.sel===i?'pick':null,f:14})});
 if(grab){const b=L.pool[grab.i];chip({x:grab.x-b.w/2,y:grab.y-b.h/2,w:b.w,h:b.h},R.cards[grab.i].t,{mark:'pick',fill:PREP,f:14})}A.fx.draw(g)}
function report(k,R,cd,j){if(k==='grow')return`the ${R.cards.filter((x,i)=>S.grow.put[i]===0).map(x=>x.t).join('')} dog ${R.cards.filter((x,i)=>S.grow.put[i]===1).map(x=>x.t).join(' ')}`.replace(/ +/g,' ').trim()+'.';
 if(k==='job')return`“${cd.t}” → ${R.r.word}. ${R.r.why}`;if(k==='two')return R.r.fix?`Clear: ${cd.t}`:`“${cd.t}” goes with ${R.zones[j]}.`;return`“${cd.t}”: ${R.zones[j]}.`}
function drop(i,j){const k=kk(),s=S[k];if(over(k)||s.put[i]!=null||s.lock)return;const R=now(k),cd=R.cards[i];s.sel=null;s.hov=-1;
 const cap=k==='grow'?P.GROW.caps[j]:99;if(cd.to!==j||R.cards.filter((x,q)=>s.put[q]===j).length>=cap){s.err=i;A.sound.miss();return note(cd.why||slip(k,cd))}
 s.put[i]=j;s.err=null;A.sound.pop();let msg=report(k,R,cd,j);if(!R.cards.some((x,q)=>x.to>=0&&s.put[q]==null))msg+=step(k);note(msg)}
function slip(k,cd){if(k==='grow')return cd.to===0?'An adjective goes before the noun: the small dog.':'A prepositional phrase goes after the noun: the dog with a red collar.';
 if(k==='sort')return cd.to===0?`“${cd.t}” has no verb. It is a preposition with a noun phrase.`:`“${cd.t}” has a verb, ${cd.verb}, so it is a clause, not a phrase.`;return'Look again at what the phrase tells you.'}
function step(k){const s=S[k];if(s.i+1<total(k)){s.lock=1;const v=run;setTimeout(()=>{if(v!==run)return;s.i++;s.put={};s.lock=0;s.err=null;s.flash=0;
  note(k==='spot'?`Next: ${now('spot').w}`:k==='job'?`Next: ${now('job').r.s}`:now(k).r.ask)},k==='spot'?900:600);return''}s.i++;return' '+DONE[k]+'.'}
function tapWord(i){const s=S.spot;if(over('spot')||s.lock)return;const R=now('spot'),tg=R.tags.split(' '),ws=R.w.replace(/[.,]/g,'').split(' ');
 if(tg[i]!=='P'){s.err=i;A.sound.miss();return note(P.TAGWHY[tg[i]](ws[i]))}s.err=null;s.flash=1;const ph=ws.slice(i).join(' ');s.got.push(ph);A.sound.pop();
 note(`Yes: “${ws[i]}” is the preposition. “${ph}” is the prepositional phrase: ${ws[i]} + the noun phrase “${ws.slice(i+1).join(' ')}”.`+step('spot'))}
function down(p){const k=kk();if(k==='chal'||over(k)||S[k].lock)return false;const L=plan(),s=S[k];
 if(k==='spot'){const i=L.words.findIndex(b=>hit(p,b));if(i>=0)tapWord(i);return false}
 const i=L.pool.findIndex((b,q)=>hit(p,b)&&s.put[q]==null);if(i>=0){grab={i,x:p.x,y:p.y,ox:p.x,oy:p.y};A.redraw();return true}
 const j=L.zones.findIndex(b=>hit(p,b));if(j>=0&&s.sel!=null)drop(s.sel,j);return false}
function move(p){if(!grab)return;grab.x=p.x;grab.y=p.y;S[kk()].hov=plan().zones.findIndex(b=>hit(p,b));A.redraw()}
function up(p){const gr=grab;if(!gr)return;grab=null;const s=S[kk()];s.hov=-1;const j=plan().zones.findIndex(b=>hit(p,b));if(j>=0)return drop(gr.i,j);
 if(Math.hypot(p.x-gr.ox,p.y-gr.oy)<10){s.sel=gr.i;s.err=null;return note(`Chosen: “${now().cards[gr.i].t}”. Now tap where it goes.`)}A.redraw()}
function wipe(){run++;grab=null;KEYS.slice(0,5).forEach(k=>S[k]={i:0,put:{},sel:null,err:null,hov:-1,lock:0,got:[],flash:0});S.after=()=>{}}
function note(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.after()}
function keys(){if(!dock)return;dock.innerHTML='';const k=kk();if(k==='chal'||over(k)||S[k].lock)return;const s=S[k],add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},dock,t).onclick=f};
 if(k==='spot'){now('spot').w.replace(/[.,]/g,'').split(' ').forEach((w,i)=>add(w,()=>tapWord(i),`Word ${i+1}: ${w}`));return}
 const R=now(k);if(s.sel==null){R.cards.forEach((cd,i)=>{if(s.put[i]==null)add(`Choose: ${cd.t}`,()=>{s.sel=i;s.err=null;note(`Chosen: “${cd.t}”. Now pick where it goes.`)})});return}
 R.zones.forEach((zn,j)=>add(k==='two'&&!R.r.fix?`→ on “${zn}”`:`→ ${zn}`,()=>drop(s.sel,j),`Put “${R.cards[s.sel].t}” ${k==='two'&&!R.r.fix?'with the word '+zn:'in '+zn}`));add('Cancel',()=>{s.sel=null;note('Nothing chosen.')})}
const check=(i,msg)=>()=>{if(A.step===i&&over(KEYS[i])&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,say,msg){wipe();note(say);S.after=check(i,msg)}
function auto(i){steps[i].go();const v=run,k=KEYS[i],todo=[];let t=0;
 if(k==='spot')P.SPOT.forEach(R=>{t+=1000;todo.push([t,()=>tapWord(R.tags.split(' ').indexOf('P'))])});
 else LIST[k].forEach(R=>{R.cards.forEach((cd,q)=>{if(cd.to>=0){t+=380;todo.push([t,()=>drop(q,cd.to)])}});t+=LIST[k].length>1?650:0});
 todo.forEach(([ms,f])=>setTimeout(()=>{if(v===run)f()},ms))}
const steps=[
{h:'Spot the phrase',p:'A preposition is a small linking word, like on, under, with or after. It opens a phrase: the preposition plus a noun phrase. Tap the preposition.',task:'Find all 4 prepositions',show:()=>auto(0),
 go:()=>open(0,`Word tiles: ${P.SPOT[0].w}. Tap the preposition.`,'The preposition plus its noun phrase make a prepositional phrase.')},
{h:'Pick out one dog',p:'An expanded noun phrase adds detail so the reader knows exactly which one. Adjectives go before the noun. Prepositional phrases go after it.',
 predict:{q:'In this picture, how many dogs could “the dog” mean?',opts:['Just one','Any of the 4'],ans:1},task:'Expand the phrase to pick out the ringed dog',show:()=>auto(1),
 go:()=>open(1,'Four dogs: a big one with a red collar by a gate, the ringed small one with a red collar by the gate, a small one with a blue collar by the gate, and a small one with a red collar by a tree.','Each detail ruled out other dogs until only one was left.')},
{h:'Which job?',p:'A prepositional phrase can tell you which one (an adjective job, about a noun) or where, when or how (an adverb job, about a verb).',
 predict:{q:'In “The house on the hill is empty”, what does on the hill tell you?',opts:['Where something happened','Which house'],ans:1},task:'Give all 5 phrases their job',show:()=>auto(2),
 go:()=>open(2,`Sentence: ${P.JOB.rounds[0].s} The phrase is “${P.JOB.rounds[0].ph}”.`,'A place phrase can still do an adjective job when it tells you which one.')},
{h:'One phrase, two meanings',p:'Where a phrase sits changes what it tells you about. The same words can fit two pictures. Drop the phrase on the word it belongs to.',task:'Match both pictures, then fix the sentence',show:()=>auto(3),
 go:()=>open(3,P.TWO.rounds[0].ask+'. Sentence: '+P.TWO.s,'Moving the phrase to the front made it clear who had the telescope.')},
{h:'Phrase or clause?',p:'After, before and because of can open a phrase. If the words after them have a verb, it is a clause, not a phrase.',task:'Sort all 7 cards',show:()=>auto(4),
 go:()=>open(4,'Two boxes: prepositional phrase (no verb) and clause (has a verb). Seven cards.','Look for a verb: no verb means a phrase.')},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
function why(t){let m='Find the preposition first, then ask what the phrase tells you.';
 if(t==='noun')m='That part has no preposition. Look for a small linking word such as behind, under or with, then its noun phrase.';
 if(t==='where')m='A place phrase is not always about where. On the table tells you which cake, so it describes the noun.';
 if(t==='bare')m='That is a noun phrase with nothing added. Expand it with an adjective before the noun or a phrase after it.';
 if(t==='order')m='The prepositional phrase goes after the noun: the tall girl with a blue scarf.';
 if(t==='clause')m='Look for a verb. A clause has one (won, got); a prepositional phrase does not.';
 if(t==='which')m='At the park goes with the verb met. It tells where, so it does an adverb job.';
 return m}
function next(){qi++;const Q=P.QS[qi%P.QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;const said=ok?'Correct: '+a:why(t);c.say(said);A.cv.setAttribute('aria-label',said)}
FK.shell(c,{steps,ratio:.7,tall:1.6,draw,onStep:X=>{box.hidden=X.step!==5;dock.hidden=X.step===5;keys()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);dock=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Phrase buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}}).start()})})();
