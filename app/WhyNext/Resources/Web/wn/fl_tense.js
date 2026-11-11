/* Flagship – past, present and progressive tense (ages 6–9). A timeline from Yesterday to Now: drop sentences where they
   happen, spell -ed past forms (jumped, baked, hopped), build is/are/was/were + -ing, meet irregular pasts (ran, went),
   and catch the verb that slips out of tense in a short story. */
(()=>{
/* when: [sentence, 0 = yesterday (past), 1 = now (present progressive), picture] */
const WHEN=[['I played.',0,'ball'],['She is shouting.',1,'shout'],['The dog barked.',0,'dog'],['I am playing.',1,'ball'],['She shouted.',0,'shout'],['The dog is barking.',1,'dog']];
/* ed: [verb, options (first is right), picture, why-right, why-wrong per option] */
const ED=[['jump',['jumped','jumpt','jumpd'],'frog','Jumped ends with a t sound, but we spell it ed.'],
 ['bake',['baked','bakeed','bakt'],'cake','Bake already ends in e, so just add d: baked.'],
 ['hop',['hopped','hoped','hopt'],'frog','Hop has a short o, so double the p, then add ed: hopped.']];
/* prog: [who, many?, now?, verb-ing, picture] -> helper is/are (now) or was/were (past) */
const PROG=[['Sam',0,1,'running','ball'],['The birds',1,1,'singing','bird'],['Mum',0,0,'drumming','drum'],['We',1,0,'shouting','shout']];
const HELP=['is','are','was','were'],helper=p=>HELP[(p[2]?0:2)+p[1]];
/* odd: [verb, options (first is right), slip name] */
const ODD=[['run',['ran','runned','runed']],['go',['went','goed','wented']],['see',['saw','seed','seen']]];
/* story: [lines as [before, verb, after], index of the slip, fix, tense word] */
const STORY=[[[['Yesterday we','went','to the park.'],['We','play','on the swings.'],['Then we','ate','lunch.']],1,'played','past'],
 [[['Last night the dog','barked','.'],['It','is chasing','a cat.'],['Then it','slept','.']],1,'was chasing','past'],
 [[['Right now Gran','is baking','a cake.'],['She','mixed','the eggs.'],['The cake','is rising','in the oven.']],1,'is mixing','present']];
VIS.reg('flagtense',c=>{let A,pad,quiz,qn=-1,run=0,stars=0;c.fig.classList.add('young');
const S={};const reset=()=>Object.assign(S,{n:0,k:0,bad:-1,hit:-1,drag:null,wait:0,lock:0,hook:()=>{}});reset();
const part=()=>['when','ed','prog','odd','story','quiz'][A.step],quick=()=>A.reduced();
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1:1.12));
function write(g,t,x,y,maxw,n,col,wt){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const out=[];let cur='';for(const w of String(t).split(' ')){const tr=cur?cur+' '+w:w;if(cur&&g.measureText(tr).width>maxw){out.push(cur);cur=w}else cur=tr}out.push(cur);
 const lh=fs(n)*1.25;out.forEach((s,i)=>g.fillText(s,x,y+(i-(out.length-1)/2)*lh))}
const hit=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function card(g,r,st){const C=A.col;g.fillStyle=st==='ok'?A.alpha(C.gr,.2):st==='bad'?A.alpha(C.rd,.16):C.dark?'#172033':'#fff7ed';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.lineWidth=st?4.5:2.5;g.strokeStyle=st==='ok'?C.gr:st==='bad'?C.rd:st==='lift'?C.vi:C.mu;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
function spread(n,y,h,cap){const gap=10,w=Math.min(cap||170,(A.W-24-gap*(n-1))/n),x=(A.W-(w*n+gap*(n-1)))/2;return[...Array(n)].map((_,i)=>({x:x+i*(w+gap),y,w,h}))}
/* pictures: every sentence has a concrete action */
function icon(g,k,x,y,r){const C=A.col,ink='#1f2937';g.save();g.lineWidth=2;g.strokeStyle=ink;const dot=(a,b,s,f)=>{g.fillStyle=f;g.beginPath();g.arc(x+a*r,y+b*r,s*r,0,7);g.fill();g.stroke()};
 if(k==='ball'){dot(0,0,.7,'#f97316');g.beginPath();g.moveTo(x-r*.7,y);g.lineTo(x+r*.7,y);g.moveTo(x,y-r*.7);g.quadraticCurveTo(x+r*.45,y,x,y+r*.7);g.stroke()}
 else if(k==='dog'){g.fillStyle='#b45309';g.beginPath();g.ellipse(x-r*.68,y-r*.05,r*.22,r*.48,.35,0,7);g.ellipse(x+r*.68,y-r*.05,r*.22,r*.48,-.35,0,7);g.fill();dot(0,0,.62,'#d97706');g.fillStyle=ink;g.beginPath();g.arc(x-r*.22,y-r*.12,r*.08,0,7);g.arc(x+r*.22,y-r*.12,r*.08,0,7);g.arc(x,y+r*.2,r*.11,0,7);g.fill()}
 else if(k==='shout'){dot(0,0,.62,'#fcd34d');g.fillStyle=ink;g.beginPath();g.arc(x-r*.2,y-r*.15,r*.07,0,7);g.arc(x+r*.2,y-r*.15,r*.07,0,7);g.fill();g.fillStyle='#7f1d1d';g.beginPath();g.ellipse(x,y+r*.25,r*.18,r*.16,0,0,7);g.fill();
  g.strokeStyle=C.or;g.lineWidth=3;for(const d of[1,1.25])g.beginPath(),g.arc(x+r*.2,y+r*.2,r*d,-.5,.5),g.stroke()}
 else if(k==='drum'){g.fillStyle='#dc2626';g.fillRect(x-r*.6,y-r*.2,r*1.2,r*.75);g.strokeRect(x-r*.6,y-r*.2,r*1.2,r*.75);g.fillStyle='#f5f5f4';g.beginPath();g.ellipse(x,y-r*.2,r*.6,r*.2,0,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(x-r*.7,y-r*.9);g.lineTo(x-r*.15,y-r*.3);g.moveTo(x+r*.7,y-r*.9);g.lineTo(x+r*.15,y-r*.3);g.stroke()}
 else if(k==='bird'){dot(0,.05,.5,'#38bdf8');dot(.38,-.35,.26,'#38bdf8');g.fillStyle='#f59e0b';g.beginPath();g.moveTo(x+r*.62,y-r*.4);g.lineTo(x+r*.9,y-r*.32);g.lineTo(x+r*.62,y-r*.25);g.fill();g.fillStyle=ink;g.beginPath();g.arc(x+r*.42,y-r*.4,r*.05,0,7);g.fill();
  g.strokeStyle=C.vi;g.lineWidth=2.5;g.beginPath();g.moveTo(x+r*.95,y-r*.85);g.lineTo(x+r*.95,y-r*.55);g.stroke();dot(.87,-.53,.08,C.vi)}
 else if(k==='cake'){g.fillStyle='#fbcfe8';g.fillRect(x-r*.6,y-r*.1,r*1.2,r*.6);g.strokeRect(x-r*.6,y-r*.1,r*1.2,r*.6);g.fillStyle='#fef3c7';g.fillRect(x-r*.6,y-r*.25,r*1.2,r*.18);g.strokeRect(x-r*.6,y-r*.25,r*1.2,r*.18);g.fillStyle='#ef4444';g.fillRect(x-r*.05,y-r*.6,r*.1,r*.35)}
 else if(k==='frog'){dot(0,.1,.62,'#22c55e');dot(-.3,-.42,.2,'#22c55e');dot(.3,-.42,.2,'#22c55e');g.fillStyle=ink;g.beginPath();g.arc(x-r*.3,y-r*.42,r*.07,0,7);g.arc(x+r*.3,y-r*.42,r*.07,0,7);g.fill();g.beginPath();g.arc(x,y+r*.1,r*.3,.15*Math.PI,.85*Math.PI);g.stroke()}
 g.restore()}
/* the timeline: Yesterday on the left, Now on the right; a dot marks when; a wavy bar means "still going on" */
function line(g,y,when,going){const C=A.col,W=A.W,x0=W*.1,x1=W*.9;g.strokeStyle=C.mu;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 g.beginPath();g.moveTo(x1,y);g.lineTo(x1-10,y-7);g.lineTo(x1-10,y+7);g.closePath();g.fillStyle=C.mu;g.fill();
 write(g,'Yesterday',W*.27,y+18,W*.3,12,C.mu,600);write(g,'Now',W*.73,y+18,W*.3,12,C.mu,600);
 if(when==null)return;const x=when?W*.73:W*.27;if(going){g.strokeStyle=C.vi;g.lineWidth=5;g.beginPath();for(let i=0;i<=24;i++){const xx=x-W*.12+i*W*.01;g[i?'lineTo':'moveTo'](xx,y+Math.sin(i*.9)*5)}g.stroke()}
 g.fillStyle=when?C.gr:C.or;g.beginPath();g.arc(x,y,9,0,7);g.fill()}
/* ---- step layouts ---- */
const zones=()=>{const h=A.H*.42,y=A.H*.5,w=(A.W-36)/2;return[{x:12,y,w,h},{x:24+w,y,w,h}]};
const cardBox=()=>{const w=Math.min(A.W*.66,300),h=A.H*.22,d=S.drag;return d&&d.x!=null?{x:d.x-w/2,y:d.y-h/2,w,h}:{x:(A.W-w)/2,y:A.H*.12,w,h}};
const tiles=n=>spread(n,A.H*.7,A.H*.17,150),slot=()=>{const w=Math.min(190,A.W*.42);return{x:(A.W-w)/2,y:A.H*.38,w,h:A.H*.17}};
const opts=()=>{const v=part();if(v==='ed')return turn(ED[S.k][1]);if(v==='odd')return turn(ODD[S.k][1]);if(v==='prog')return HELP;return[]};
const turn=a=>a.map((_,i)=>a[(i+S.k+1)%a.length]);
const storyBoxes=()=>{const g=A.ctx,[L]=STORY[S.k];g.font=`700 ${fs(17)}px system-ui`;return L.map(([b,v,a],i)=>{const wb=g.measureText(b+' ').width,wv=g.measureText(v).width+24,wa=g.measureText(' '+a).width,tot=wb+wv+wa,sc=Math.min(1,(A.W-16)/tot),x=(A.W-tot*sc)/2,y=A.H*(.22+i*.24);
 return{b,v,a,sc,x,y,box:{x:x+wb*sc,y:y-A.H*.08,w:wv*sc,h:A.H*.16},wb,wv}})};
/* ---- drawing ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){line(g,H*.45,0,1);line(g,H*.45,1,0);write(g,'Past: jumped, ran, was jumping. Present: is jumping.',W/2,H*.75,W-30,15);return}
 if(S.n>=goal()){write(g,sum(),W/2,H*.45,W-30,17);return A.fx.draw(g)}
 if(v==='when'){const[s,,pic]=WHEN[S.k];zones().forEach((r,j)=>{card(g,r,S.bad===j?'bad':S.hit===j?'ok':'');
   write(g,j?'Now: happening':'Yesterday: done',r.x+r.w/2,r.y+r.h*.2,r.w-12,14);clockOrCal(g,j,r.x+r.w/2,r.y+r.h*.62,Math.min(r.w,r.h)*.22)});
  if(S.hit<0){const r=cardBox();card(g,r,S.drag?'lift':'');icon(g,pic,r.x+r.h*.45,r.y+r.h/2,r.h*.3);write(g,s,r.x+r.w/2+r.h*.25,r.y+r.h/2,r.w-r.h*.9,19)}}
 else if(v==='ed'){const[vb,,pic]=ED[S.k],sl=slot();icon(g,pic,W/2,H*.13,H*.08);write(g,`Today I ${vb}. Yesterday I …`,W/2,H*.28,W-24,16);
  card(g,sl,S.hit>=0?'ok':S.bad>=0?'bad':'');write(g,S.hit>=0?ED[S.k][1][0]:'?',sl.x+sl.w/2,sl.y+sl.h/2,sl.w-8,21,S.hit>=0?C.tx:C.mu);tilesDraw(g)}
 else if(v==='prog'){const p=PROG[S.k],sl=slot();line(g,H*.17,p[2],1);icon(g,p[4],p[2]?W*.73:W*.27,H*.07,H*.05);
  const tx=`${p[0]}  ___  ${p[3]}.`;write(g,tx,W/2,H*.31,W-24,18);card(g,sl,S.hit>=0?'ok':S.bad>=0?'bad':'');write(g,S.hit>=0?helper(p):'is? was?',sl.x+sl.w/2,sl.y+sl.h/2,sl.w-8,S.hit>=0?21:15,S.hit>=0?C.tx:C.mu);
  write(g,`${p[1]?'More than one':'Just one'} · ${p[2]?'going on now':'going on in the past'}`,W/2,H*.62,W-24,13,C.mu,600);tilesDraw(g)}
 else if(v==='odd'){const[vb]=ODD[S.k],sl=slot();write(g,`Today I ${vb}. Yesterday I …`,W/2,H*.2,W-24,18);write(g,'This verb does not take -ed!',W/2,H*.3,W-24,13,C.mu,600);
  card(g,sl,S.hit>=0?'ok':S.bad>=0?'bad':'');write(g,S.hit>=0?ODD[S.k][1][0]:'?',sl.x+sl.w/2,sl.y+sl.h/2,sl.w-8,21,S.hit>=0?C.tx:C.mu);tilesDraw(g)}
 else if(v==='story'){const[,slip,fix,tw]=STORY[S.k];write(g,`This story is in the ${tw}. Tap the verb that slips.`,W/2,H*.07,W-20,14,C.mu,600);
  storyBoxes().forEach((L,i)=>{g.font=`700 ${fs(17)*L.sc}px system-ui`;g.textBaseline='middle';g.textAlign='left';g.fillStyle=C.tx;g.fillText(L.b,L.x,L.y);
   const fixed=S.hit===i;card(g,L.box,fixed?'ok':S.bad===i?'bad':'');g.textAlign='center';g.fillStyle=C.tx;g.fillText(fixed?fix:L.v,L.box.x+L.box.w/2,L.y);g.textAlign='left';g.fillText(L.a,L.box.x+L.box.w+4*L.sc,L.y)})}
 A.fx.draw(g)}
function clockOrCal(g,now,x,y,r){const C=A.col;g.save();g.lineWidth=2.5;g.strokeStyle=C.tx;if(now){g.fillStyle=A.alpha(C.gr,.2);g.beginPath();g.arc(x,y,r,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(x,y);g.lineTo(x,y-r*.7);g.moveTo(x,y);g.lineTo(x+r*.5,y);g.stroke()}
 else{g.fillStyle=A.alpha(C.or,.22);g.fillRect(x-r,y-r*.8,r*2,r*1.7);g.strokeRect(x-r,y-r*.8,r*2,r*1.7);g.fillStyle=C.or;g.fillRect(x-r,y-r*.8,r*2,r*.4);g.beginPath();g.moveTo(x+r*.4,y+r*.3);g.lineTo(x-r*.4,y+r*.3);g.lineTo(x-r*.15,y+r*.05);g.moveTo(x-r*.4,y+r*.3);g.lineTo(x-r*.15,y+r*.55);g.stroke()}g.restore()}
function tilesDraw(g){if(S.hit>=0)return;const o=opts(),R=tiles(o.length);o.forEach((w,i)=>{let r=R[i];const d=S.drag;if(d&&d.i===i&&d.x!=null)r={...r,x:d.x-r.w/2,y:d.y-r.h/2};card(g,r,d&&d.i===i?'lift':S.bad===i+10?'bad':'');write(g,w,r.x+r.w/2,r.y+r.h/2,r.w-8,19)})}
const goal=()=>({when:4,ed:3,prog:4,odd:3,story:3}[part()]||99);
const sum=()=>({when:'Past is done. Present is happening now.',ed:'Regular verbs add -ed for the past: jumped, baked, hopped.',prog:'is/are + -ing: going on now. was/were + -ing: going on in the past.',odd:'Some verbs change instead: run → ran, go → went, see → saw.',story:'Pick a tense and stay in it.'}[part()]);
/* ---- answers ---- */
function miss(t,j){A.sound.miss();S.bad=j;say(t);A.redraw();setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:900)}
function good(t,j){S.hit=j;S.n++;A.sound.pop();say(t);A.redraw();if(S.n<goal()){S.wait=1;const k=S.k,r=run;setTimeout(()=>{if(S.k!==k||r!==run)return;S.wait=0;S.k++;S.hit=-1;S.drag=null;keys();A.redraw();say(prompt())},quick()?5:800)}else keys();S.hook()}
function pickWhen(j){if(part()!=='when'||busy())return;const[s,k]=WHEN[S.k];if(j!==k)return miss(k?`"${s}" uses is or am with -ing. It is happening now.`:`"${s}" ends in -ed. It is done. It happened yesterday.`,j);good(`${s} ${k?'Now: it is happening.':'Yesterday: it is done.'}`,j)}
function pickWord(w,i){const v=part();if(!['ed','prog','odd'].includes(v)||busy())return;
 if(v==='ed'){const[vb,o,,ok]=ED[S.k];if(w!==o[0]){let m=`${w}? `;m+=/t$/.test(w)?'It sounds like t, but the past ending is spelled ed.':w==='hoped'?'Hoped is the past of hope. Hop has a short o: double the p.':w==='bakeed'?'Bake has an e already. Do not write two.':`Spell the past of ${vb} with ed.`;return miss(m,i+10)}return good(ok,0)}
 if(v==='prog'){const p=PROG[S.k],h=helper(p);if(w!==h){let m='';if(HELP.indexOf(w)>>1!==(p[2]?0:1))m=p[2]?`It is going on now, so use is or are, not ${w}.`:`It was going on in the past, so use was or were, not ${w}.`;else m=p[1]?`${p[0]} means more than one, so use ${h}.`:`${p[0]} means just one, so use ${h}.`;return miss(m,i+10)}
  return good(`${p[0]} ${h} ${p[3]}. ${p[2]?'Going on now.':'Going on in the past.'}`,0)}
 const[vb,o]=ODD[S.k];if(w!==o[0])return miss(`${w}? ${vb} is an odd one. We do not add -ed. We say ${o[0]}.`,i+10);good(`Today I ${vb}. Yesterday I ${o[0]}.`,0)}
function pickVerb(i){if(part()!=='story'||busy())return;const[L,slip,fix,tw]=STORY[S.k];if(i!==slip)return miss(`${L[i][1]} is in the ${tw}, like the story. Find the verb that does not match.`,i);good(`${L[i][1]} slips out of the ${tw}. It should be ${fix}.`,i)}
const busy=()=>S.wait||S.n>=goal()||S.hit>=0;
const prompt=()=>{const v=part();return v==='when'?`${WHEN[S.k][0]} Yesterday or now?`:v==='ed'?`Today I ${ED[S.k][0]}. Yesterday I …?`:v==='prog'?`${PROG[S.k][0]} ___ ${PROG[S.k][3]}. Which helper verb?`:v==='odd'?`Today I ${ODD[S.k][0]}. Yesterday I …?`:'Tap the verb that slips out of tense.'};
/* ---- buttons (every drag has a twin) ---- */
function keys(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(v==='quiz'||busy())return;
 if(v==='when')['Yesterday','Now'].forEach((t,j)=>B(t,()=>pickWhen(j),`${WHEN[S.k][0]}: ${t}`));
 if(v==='ed'||v==='prog'||v==='odd')opts().forEach((w,i)=>B(w,()=>pickWord(w,i),`Use ${w}`));
 if(v==='story')STORY[S.k][0].forEach((L,i)=>B(L[1],()=>pickVerb(i),`Fix the verb ${L[1]}`))}
/* ---- gestures ---- */
function down(p){const v=part();if(busy())return false;
 if(v==='when'){if(hit(p,cardBox())){S.drag={x:null,x0:p.x,y0:p.y};return true}const j=zones().findIndex(r=>hit(p,r));if(j>=0)pickWhen(j);return false}
 if(v==='story'){const i=storyBoxes().findIndex(L=>hit(p,L.box));if(i>=0)pickVerb(i);return false}
 const o=opts(),i=tiles(o.length).findIndex(r=>hit(p,r));if(i>=0){S.drag={i,x:null,x0:p.x,y0:p.y};return true}return false}
function move(p){const d=S.drag;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag,v=part();S.drag=null;if(!d)return;
 if(v==='when'){const j=zones().findIndex(r=>hit(p,r));if(d.x!=null&&j>=0)pickWhen(j);else A.redraw();return}
 const o=opts();if(d.x==null||hit(p,slot()))pickWord(o[d.i],d.i);else A.redraw()}
/* ---- steps ---- */
const end=(n,msg)=>()=>{if(A.step===n&&S.n>=goal()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(fs2,ms){const k=++run;fs2.forEach((f,j)=>setTimeout(()=>{if(k===run)f()},quick()?j*60+30:(j+1)*ms))}
const begin=(n,msg)=>{run++;reset();keys();say(prompt());S.hook=end(n,msg)};
const steps=[
{h:'Yesterday or now?',p:'Drag each sentence to when it happens. Or tap a button.',task:'Place 4 sentences',
 show:()=>{steps[0].go();play([0,1,2,3].map(()=>()=>pickWhen(WHEN[S.k][1])),1000)},go:()=>begin(0,'-ed means done. is or am + -ing means happening now.')},
{h:'Add -ed',p:'Drag the right past word into the gap.',predict:{q:'Jumped ends with a t sound. How do we spell the end?',opts:['with a t: jumpt','with ed: jumped'],ans:1},task:'Spell 3 past words',
 show:()=>{steps[1].go();play([0,1,2].map(()=>()=>pickWord(ED[S.k][1][0],0)),1000)},go:()=>begin(1,'The past ending is spelled ed, even when it sounds like t.')},
{h:'Going on',p:'Pick the helper verb: is, are, was or were.',predict:{q:'He was shouting. When was the shouting going on?',opts:['Now','In the past'],ans:1},task:'Build 4 sentences',
 show:()=>{steps[2].go();play([0,1,2,3].map(()=>()=>pickWord(helper(PROG[S.k]),0)),1000)},go:()=>begin(2,'is/are + -ing is now. was/were + -ing is the past.')},
{h:'Odd ones',p:'Some verbs do not take -ed. Drag the right one.',predict:{q:'What is the past of run?',opts:['runned','ran'],ans:1},task:'Find 3 odd past words',
 show:()=>{steps[3].go();play([0,1,2].map(()=>()=>pickWord(ODD[S.k][1][0],0)),1000)},go:()=>begin(3,'Odd verbs change: ran, went, saw.')},
{h:'Keep it the same',p:'Each story stays in one tense. Tap the verb that slips.',task:'Fix 3 stories',
 show:()=>{steps[4].go();play([0,1,2].map(()=>()=>pickVerb(STORY[S.k][1])),1000)},go:()=>begin(4,'A story told in the past keeps its verbs in the past.')},
{h:'Challenge',p:'',go:()=>{run++;reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['Yesterday the cat ___ on the mat.',[['sat','ok'],['sits','mix'],['sitted','ed']]],
 ['Which one is going on right now?',[['The baby is crying.','ok'],['The baby was crying.','was'],['The baby cried.','done']]],
 ['The boys ___ playing football now.',[['are','ok'],['is','one'],['were','was']]],
 ['Which is the past of hop?',[['hopped','ok'],['hoped','dbl'],['hopt','sound']]],
 ['Last week we ___ to the zoo.',[['went','ok'],['goed','ed'],['go','mix']]]];
function why(t){let m='Look at when it happens, then pick the verb form.';
 if(t==='mix')m='The sentence says yesterday or last week, so the verb must be past too.';if(t==='ed')m='That verb is an odd one. It does not take -ed: sat, went.';
 if(t==='was')m='Was + -ing means it was going on in the past, not now.';if(t==='done')m='Cried is the past. It is finished, not going on now.';
 if(t==='one')m='The boys are more than one, so use are.';if(t==='dbl')m='Hoped is the past of hope. Hop has a short o, so double the p: hopped.';if(t==='sound')m='It sounds like t, but the past ending is spelled ed.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const bx=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},bx,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! The verb matches the time.':'✗ '+why(t)}${ok?` Stars in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
A.start()})})();
