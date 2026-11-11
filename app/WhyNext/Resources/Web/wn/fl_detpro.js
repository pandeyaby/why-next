/* Flagship – Year 4 grammar terms: determiner, pronoun, possessive pronoun, adverbial (ages 8–9). Tag the determiners
   and watch each one point at its noun, choose a or an by the first sound, test whether this/some/those has a noun after it,
   turn my into mine without an apostrophe, then label every part of a sentence. */
(()=>{
/* tag: [words, indexes of determiners, noun each one points to] */
const TAG=[[['The','dog','chased','a','red','ball.'],[0,3],{0:1,3:5}],[['My','sister','has','two','cats.'],[0,3],{0:1,3:4}],
 [['This','box','holds','some','green','apples.'],[0,3],{0:1,3:5}]];
const KIND={dog:'noun',ball:'noun',sister:'noun',cats:'noun',box:'noun',apples:'noun',chased:'verb',has:'verb',holds:'verb',red:'adjective',green:'adjective'};
/* aan: [noun, right article, sound hint] */
const AAN=[['apple','an','a-'],['unicorn','a','you-'],['hour','an','ow-'],['umbrella','an','u-']];
/* dp: [sentence, word to test, 0 = determiner (a noun follows), 1 = pronoun (stands alone)] */
const DP=[['I want this.','this',1],['This cake is nice.','This',0],['Some birds can talk.','Some',0],['I ate some.','some',1],['Those are new.','Those',1],['Those shoes are new.','Those',0]];
/* own: [determiner form, possessive pronoun, apostrophe slip, owner] */
const OWN=[['my','mine',"my's",'me'],['your','yours',"your's",'you'],['her','hers',"her's",'her'],['their','theirs',"their's",'them']];
/* label: [sentence parts, index of the part to label, answer index into LAB] */
const LAB=['determiner','pronoun','possessive pronoun','adverbial'];
const ALL=[[['After lunch,','she','put','her','coat','on the peg.'],0,3],[['After lunch,','she','put','her','coat','on the peg.'],1,1],
 [['After lunch,','she','put','her','coat','on the peg.'],3,0],[['That','pen','is','hers.'],3,2],[['We','ran','home','quickly.'],3,3]];
VIS.reg('flagdetpro',c=>{let A,ctl,chal,qi=-1,tok=0,streak=0;
const G={};const clear=()=>Object.assign(G,{n:0,i:0,got:[],wrong:-1,solved:0,hold:null,pause:0,after:()=>{}});clear();
const mode=()=>['tag','aan','dp','own','all','quiz'][A.step],instant=()=>A.reduced();
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1:1.1));
const font=(n,w)=>`${w||700} ${px(n)}px system-ui,sans-serif`;
function label(g,s,x,y,max,n,col,w){g.font=font(n,w);g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const rows=[];let r='';
 String(s).split(' ').forEach(t=>{const nx=r?r+' '+t:t;if(r&&g.measureText(nx).width>max){rows.push(r);r=t}else r=nx});rows.push(r);rows.forEach((q,i)=>g.fillText(q,x,y+(i-(rows.length-1)/2)*px(n)*1.25))}
const within=(p,b)=>!!b&&p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h;
function chip(g,b,how,fill){const C=A.col;g.fillStyle=fill||(how==='good'?A.alpha(C.gr,.2):how==='no'?A.alpha(C.rd,.15):C.dark?'#13233a':'#f0f9ff');A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();
 g.strokeStyle=how==='good'?C.gr:how==='no'?C.rd:how==='up'?C.vi:C.ln;g.lineWidth=how?4:2;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.stroke()}
/* lay words out in rows that fit the canvas width */
function flow(words,y0,n){const g=A.ctx;g.font=font(n);const gap=8,pad=16,hh=px(n)*2,rows=[[]];let w=0;
 words.forEach((s,i)=>{const ww=g.measureText(s).width+pad;if(w+ww>A.W-20&&rows[rows.length-1].length){rows.push([]);w=0}rows[rows.length-1].push([i,ww]);w+=ww+gap});
 const out=[];rows.forEach((r,k)=>{const tot=r.reduce((a,[,ww])=>a+ww+gap,-gap);let x=(A.W-tot)/2;r.forEach(([i,ww])=>{out[i]={x,y:y0+k*(hh+12),w:ww,h:hh};x+=ww+gap})});return out}
function bins(n,y,h,cap){const gap=10,w=Math.min(cap,(A.W-20-gap*(n-1))/n),x0=(A.W-n*w-gap*(n-1))/2;return Array.from({length:n},(_,k)=>({x:x0+k*(w+gap),y,w,h}))}
function arrow(g,a,b,col){const x0=a.x+a.w/2,x1=b.x+b.w/2,y=a.y-4,top=y-26;g.strokeStyle=col;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.quadraticCurveTo((x0+x1)/2,top-12,x1,b.y-4);g.stroke();
 g.fillStyle=col;g.beginPath();g.moveTo(x1,b.y-2);g.lineTo(x1-7,b.y-12);g.lineTo(x1+6,b.y-13);g.closePath();g.fill()}
/* objects for a/an */
function thing(g,k,x,y,r){g.save();g.lineWidth=2;g.strokeStyle='#1f2937';const blob=(a,b,s,f)=>{g.fillStyle=f;g.beginPath();g.arc(x+a*r,y+b*r,s*r,0,7);g.fill();g.stroke()};
 if(k==='apple'){blob(0,.1,.62,'#ef4444');g.fillStyle='#16a34a';g.beginPath();g.ellipse(x+r*.25,y-r*.6,r*.25,r*.12,-.5,0,7);g.fill();g.stroke()}
 else if(k==='unicorn'){blob(0,0,.6,'#f5f3ff');g.fillStyle='#facc15';g.beginPath();g.moveTo(x-r*.12,y-r*.55);g.lineTo(x,y-r*1.15);g.lineTo(x+r*.12,y-r*.55);g.fill();g.stroke();g.fillStyle='#1f2937';g.beginPath();g.arc(x-r*.2,y-r*.05,r*.07,0,7);g.arc(x+r*.2,y-r*.05,r*.07,0,7);g.fill()}
 else if(k==='hour'){blob(0,0,.65,'#e0f2fe');g.beginPath();g.moveTo(x,y);g.lineTo(x,y-r*.45);g.moveTo(x,y);g.lineTo(x+r*.35,y+r*.1);g.stroke()}
 else if(k==='umbrella'){g.fillStyle='#8b5cf6';g.beginPath();g.arc(x,y,r*.7,Math.PI,0);g.closePath();g.fill();g.stroke();g.beginPath();g.moveTo(x,y);g.lineTo(x,y+r*.6);g.arc(x-r*.15,y+r*.6,r*.15,0,Math.PI);g.stroke()}g.restore()}
/* ---- layouts per mode ---- */
const tagChip=()=>{const w=Math.min(170,A.W*.42),h=px(15)*2.4,d=G.hold;return d&&d.x!=null?{x:d.x-w/2,y:d.y-h/2,w,h}:{x:(A.W-w)/2,y:A.H*.74,w,h}};
const tagWords=()=>flow(TAG[G.i][0],A.H*.33,19);
const gap1=()=>{const w=Math.min(110,A.W*.26);return{x:A.W*.5-w-6,y:A.H*.42,w,h:A.H*.16}};
const pickers=()=>bins(2,A.H*.72,A.H*.17,150);
const sortBins=()=>bins(2,A.H*.58,A.H*.36,260);
const sortCard=()=>{const w=Math.min(A.W*.7,300),h=A.H*.22,d=G.hold;return d&&d.x!=null?{x:d.x-w/2,y:d.y-h/2,w,h}:{x:(A.W-w)/2,y:A.H*.13,w,h}};
const ownSlot=()=>{const w=Math.min(150,A.W*.34);return{x:A.W*.62-w/2,y:A.H*.4,w,h:A.H*.16}};
const ownTiles=()=>bins(3,A.H*.72,A.H*.17,140);
const ownOpts=()=>{const o=OWN[G.i];return[o[1],o[0],o[2]].map((_,j,a)=>a[(j+G.i+1)%3])};
const labBins=()=>{const n=4,cols=A.narrow?2:4,gap=8,w=(A.W-20-gap*(cols-1))/cols,h=A.H*(A.narrow?.15:.2);return Array.from({length:n},(_,k)=>({x:10+(k%cols)*(w+gap),y:A.H*(A.narrow?.6:.68)+Math.floor(k/cols)*(h+gap),w,h}))};
const labWords=()=>flow(ALL[G.i][0],A.H*.16,18);
const labChip=()=>{const r=labWords()[ALL[G.i][1]],d=G.hold;return d&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r};
/* ---- draw ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.06:.45);g.fillRect(0,0,W,H);
 if(m==='quiz'){label(g,'the · a · my · this · some → determiners point at a noun',W/2,H*.32,W-30,15);label(g,'she · it · mine · hers → pronouns stand in for a noun',W/2,H*.55,W-30,15);return}
 if(G.n>=need()){label(g,recap(),W/2,H*.45,W-30,17);return A.fx.draw(g)}
 if(m==='tag'){const[ws,dets,noun]=TAG[G.i],R=tagWords();label(g,'Find the 2 determiners. Each one points at a noun.',W/2,H*.08,W-20,14,C.mu,600);
  ws.forEach((s,i)=>{const on=G.got.includes(i);chip(g,R[i],on?'good':G.wrong===i?'no':'',on?A.alpha(C.or,.25):null);label(g,s,R[i].x+R[i].w/2,R[i].y+R[i].h/2,R[i].w,19)});
  G.got.forEach(i=>arrow(g,R[i],R[noun[i]],C.or));const t=tagChip();chip(g,t,G.hold?'up':'',A.alpha(C.or,.3));label(g,'determiner',t.x+t.w/2,t.y+t.h/2,t.w-8,15)}
 else if(m==='aan'){const[nn,art]=AAN[G.i],b=gap1();thing(g,nn,W/2,H*.18,H*.1);chip(g,b,G.solved?'good':G.wrong>=0?'no':'');label(g,G.solved?art:'?',b.x+b.w/2,b.y+b.h/2,b.w,22,G.solved?C.tx:C.mu);
  label(g,nn,W*.5+70,b.y+b.h/2,140,22);label(g,'Say the word out loud. Listen to its first sound.',W/2,H*.64,W-20,13,C.mu,600);
  if(!G.solved)pickers().forEach((r,j)=>{const d=G.hold;const rr=d&&d.j===j&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;chip(g,rr,d&&d.j===j?'up':G.wrong===j?'no':'');label(g,['a','an'][j],rr.x+rr.w/2,rr.y+rr.h/2,rr.w,22)})}
 else if(m==='dp'){const[s,w]=DP[G.i];sortBins().forEach((r,j)=>{chip(g,r,G.wrong===j?'no':G.solved&&DP[G.i][2]===j?'good':'');label(g,j?'Pronoun: stands alone':'Determiner: a noun comes next',r.x+r.w/2,r.y+r.h*.3,r.w-12,15);
   label(g,j?'I want this.':'this cake',r.x+r.w/2,r.y+r.h*.7,r.w-12,13,C.mu,600)});
  if(!G.solved){const r=sortCard();chip(g,r,G.hold?'up':'');label(g,s,r.x+r.w/2,r.y+r.h*.4,r.w-12,19);label(g,`What is "${w}"?`,r.x+r.w/2,r.y+r.h*.78,r.w-12,13,C.mu,600)}}
 else if(m==='own'){const[d,,,who]=OWN[G.i],b=ownSlot();label(g,`It is ${d} bag.`,W/2,H*.15,W-20,19);label(g,'The bag is',W*.62-b.w/2-70,b.y+b.h/2,130,19);
  chip(g,b,G.solved?'good':G.wrong>=0?'no':'');label(g,G.solved?OWN[G.i][1]+'.':'?',b.x+b.w/2,b.y+b.h/2,b.w,21,G.solved?C.tx:C.mu);label(g,`(It belongs to ${who}.)`,W/2,H*.28,W-20,13,C.mu,600);
  if(!G.solved)ownOpts().forEach((s,j)=>{const r0=ownTiles()[j],h=G.hold,r=h&&h.j===j&&h.x!=null?{...r0,x:h.x-r0.w/2,y:h.y-r0.h/2}:r0;chip(g,r,h&&h.j===j?'up':G.wrong===j?'no':'');label(g,s,r.x+r.w/2,r.y+r.h/2,r.w,20)})}
 else if(m==='all'){const[ps,k,ans]=ALL[G.i],R=labWords();label(g,'Drag the bright part to its label.',W/2,H*.06,W-20,13,C.mu,600);
  ps.forEach((s,i)=>{if(i===k)return;chip(g,R[i],'');label(g,s,R[i].x+R[i].w/2,R[i].y+R[i].h/2,R[i].w,18)});
  labBins().forEach((r,j)=>{chip(g,r,G.wrong===j?'no':G.solved&&ans===j?'good':'');label(g,LAB[j],r.x+r.w/2,r.y+r.h/2,r.w-8,14)});
  if(!G.solved){const r=labChip();chip(g,r,'up',A.alpha(C.vi,.22));label(g,ps[k],r.x+r.w/2,r.y+r.h/2,r.w,18)}}
 A.fx.draw(g)}
const need=()=>({tag:3,aan:4,dp:4,own:4,all:5}[mode()]||99);
const recap=()=>({tag:'A determiner comes before a noun and points at it.',aan:'an before a vowel sound, a before a consonant sound.',dp:'Noun next: determiner. Alone: pronoun.',own:'mine, yours, hers, ours, theirs: no apostrophe.',all:'You can name every part.'}[mode()]);
/* ---- judging ---- */
function no(t,j){A.sound.miss();G.wrong=j;voice(t);A.redraw();setTimeout(()=>{G.wrong=-1;A.redraw()},instant()?10:900)}
function yes(t){G.n++;G.solved=1;A.sound.pop();voice(t);A.redraw();const k=tok;if(G.n<need()){G.pause=1;setTimeout(()=>{if(k!==tok)return;G.pause=0;G.i++;G.got=[];G.solved=0;G.hold=null;pads();A.redraw();voice(ask0())},instant()?5:700)}else pads();G.after()}
const idle=()=>G.pause||G.solved||G.n>=need();
function tagAt(i){if(mode()!=='tag'||idle()||G.got.includes(i))return;const[ws,dets,noun]=TAG[G.i],w=ws[i].replace(/\W/g,'');
 if(!dets.includes(i)){const k=KIND[w.toLowerCase()];return no(k==='adjective'?`${w} is an adjective. It describes. The determiner comes first: ${ws[dets.filter(d=>d<i).pop()]} ${w}.`:k==='noun'?`${w} is a noun. Look just before it for the determiner.`:`${w} is a verb, a doing word. Determiners sit in front of nouns.`,i)}
 G.got.push(i);A.sound.tick();if(G.got.length<2){A.redraw();pads();return voice(`${ws[i]} points at ${ws[noun[i]].replace(/\W/g,'')}. Find one more.`)}
 yes(`${ws[dets[0]]} and ${ws[dets[1]]} are determiners. Each points at a noun.`)}
function article(j){if(mode()!=='aan'||idle())return;const[nn,art,snd]=AAN[G.i],pick=['a','an'][j];
 if(pick!==art){let m=art==='an'?`${nn} starts with a vowel sound, ${snd}, so use an.`:`${nn} starts with a y sound, ${snd}, so use a, even though u is a vowel letter.`;if(nn==='hour')m='The h in hour is silent. It starts with an ow sound, so use an.';return no(m,j)}
 yes(`${art} ${nn}. ${nn==='unicorn'?'You-nicorn starts with a y sound.':nn==='hour'?'Silent h: ow-er.':'Vowel sound first.'}`)}
function sortDP(j){if(mode()!=='dp'||idle())return;const[s,w,k]=DP[G.i];if(j!==k){let m=k?`Nothing comes after "${w}". It stands alone for a thing, so it is a pronoun.`:`"${w}" has a noun right after it, so it is a determiner.`;return no(m,j)}
 yes(k?`${w} stands alone: pronoun.`:`${w} points at a noun: determiner.`)}
function own(s,j){if(mode()!=='own'||idle())return;const o=OWN[G.i];if(s!==o[1]){let m=/'/.test(s)?`No apostrophe! Possessive pronouns never take one: ${o[1]}.`:`${s} needs a noun after it, like ${s} bag. To stand alone, use ${o[1]}.`;return no(m,j)}
 yes(`The bag is ${o[1]}. ${o[1]} stands alone, so it is a possessive pronoun.`)}
function name(j){if(mode()!=='all'||idle())return;const[ps,k,ans]=ALL[G.i],s=ps[k];if(j!==ans){const tip=['A determiner comes before a noun.','A pronoun stands in for a noun, like she for Mia.','A possessive pronoun stands alone and shows who owns it: mine, hers.','An adverbial tells when, where or how.'][ans];
  return no(`${s} is not a ${LAB[j]}. ${tip}`,j)}yes(`${s.replace(/[,.]/g,'')} is ${/^[aeiou]/.test(LAB[ans])?'an':'a'} ${LAB[ans]}.`)}
const ask0=()=>{const m=mode();return m==='tag'?`${TAG[G.i][0].join(' ')} Tag the determiners.`:m==='aan'?`a or an? ___ ${AAN[G.i][0]}.`:m==='dp'?`${DP[G.i][0]} Is ${DP[G.i][1]} a determiner or a pronoun?`:m==='own'?`It is ${OWN[G.i][0]} bag. The bag is …?`:`${ALL[G.i][0].join(' ')} Label: ${ALL[G.i][0][ALL[G.i][1]]}`};
/* ---- button twins ---- */
function pads(){if(!ctl)return;ctl.innerHTML='';const m=mode(),add=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=f};if(m==='quiz'||idle())return;
 if(m==='tag')TAG[G.i][0].forEach((s,i)=>{if(!G.got.includes(i))add(s,()=>tagAt(i),`Tag ${s} as a determiner`)});
 if(m==='aan')['a','an'].forEach((s,j)=>add(s,()=>article(j),`${s} ${AAN[G.i][0]}`));
 if(m==='dp')['Determiner','Pronoun'].forEach((s,j)=>add(s,()=>sortDP(j),`${DP[G.i][1]} is a ${s.toLowerCase()}`));
 if(m==='own')ownOpts().forEach((s,j)=>add(s,()=>own(s,j),`The bag is ${s}`));
 if(m==='all')LAB.forEach((s,j)=>add(s,()=>name(j),`Label it ${s}`))}
/* ---- gestures ---- */
function down(p){const m=mode();if(idle())return false;
 if(m==='tag'){if(within(p,tagChip())){G.hold={x:null,x0:p.x,y0:p.y};return true}const i=tagWords().findIndex(b=>within(p,b));if(i>=0)tagAt(i);return false}
 if(m==='aan'){const j=pickers().findIndex(b=>within(p,b));if(j>=0){G.hold={j,x:null,x0:p.x,y0:p.y};return true}return false}
 if(m==='dp'){if(within(p,sortCard())){G.hold={x:null,x0:p.x,y0:p.y};return true}const j=sortBins().findIndex(b=>within(p,b));if(j>=0)sortDP(j);return false}
 if(m==='own'){const j=ownTiles().findIndex(b=>within(p,b));if(j>=0){G.hold={j,x:null,x0:p.x,y0:p.y};return true}return false}
 if(m==='all'){if(within(p,labChip())){G.hold={x:null,x0:p.x,y0:p.y};return true}const j=labBins().findIndex(b=>within(p,b));if(j>=0)name(j)}return false}
function move(p){const h=G.hold;if(h&&(h.x!=null||Math.hypot(p.x-h.x0,p.y-h.y0)>8)){h.x=p.x;h.y=p.y;A.redraw()}}
function up(p){const h=G.hold,m=mode();G.hold=null;if(!h)return;const dragged=h.x!=null;
 if(m==='tag'){const i=tagWords().findIndex(b=>within(p,b));if(dragged&&i>=0)tagAt(i);else A.redraw()}
 else if(m==='aan'){if(!dragged||within(p,gap1()))article(h.j);else A.redraw()}
 else if(m==='dp'){const j=sortBins().findIndex(b=>within(p,b));if(dragged&&j>=0)sortDP(j);else A.redraw()}
 else if(m==='own'){if(!dragged||within(p,ownSlot()))own(ownOpts()[h.j],h.j);else A.redraw()}
 else if(m==='all'){const j=labBins().findIndex(b=>within(p,b));if(dragged&&j>=0)name(j);else A.redraw()}}
/* ---- steps ---- */
const fin=(n,msg)=>()=>{if(A.step===n&&G.n>=need()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,ms){const k=++tok;list.forEach((f,j)=>setTimeout(()=>{if(k===tok)f()},instant()?j*60+30:(j+1)*ms))}
const open=(n,msg)=>{tok++;clear();pads();voice(ask0());G.after=fin(n,msg)};
const steps=[
{h:'Find the determiners',p:'Drag the determiner tag onto a word, or tap the word.',predict:{q:'In "my sister", what job does my do?',opts:['It stands alone for me: a pronoun','It comes before the noun sister: a determiner'],ans:1},task:'Tag 3 sentences',
 show:()=>{steps[0].go();demo([0,1,2].flatMap(()=>[()=>tagAt(TAG[G.i][1][0]),()=>tagAt(TAG[G.i][1][1])]),800)},go:()=>open(0,'Determiners come before a noun: the, a, my, two, this, some.')},
{h:'a or an?',p:'Say the word. Drag a or an into the gap.',predict:{q:'Which is right?',opts:['a hour: h is not a vowel','an hour: it starts with a vowel sound'],ans:1},task:'Choose for 4 words',
 show:()=>{steps[1].go();demo([0,1,2,3].map(()=>()=>article(AAN[G.i][1]==='a'?0:1)),900)},go:()=>open(1,'Listen to the first sound, not the first letter.')},
{h:'Determiner or pronoun?',p:'Look at the word in quotes. Is a noun right after it?',predict:{q:'"I want this." Is this a determiner here?',opts:['Yes, this is always a determiner','No, nothing comes after it, so it is a pronoun'],ans:1},task:'Sort 4 sentences',
 show:()=>{steps[2].go();demo([0,1,2,3].map(()=>()=>sortDP(DP[G.i][2])),900)},go:()=>open(2,'The same word can do both jobs. Check what comes next.')},
{h:'Mine, yours, hers',p:'Make the owner word stand alone.',task:'Finish 4 sentences',
 show:()=>{steps[3].go();demo([0,1,2,3].map(()=>()=>own(OWN[G.i][1],0)),900)},go:()=>open(3,'Possessive pronouns stand alone and have no apostrophe.')},
{h:'Label it all',p:'Drag the bright part to its label, or tap a button.',task:'Label 5 parts',
 show:()=>{steps[4].go();demo([0,1,2,3,4].map(()=>()=>name(ALL[G.i][2])),900)},go:()=>open(4,'Determiner, pronoun, possessive pronoun, adverbial: all named.')},
{h:'Challenge',p:'',go:()=>{tok++;clear();quizNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.after()});
const QZ=[['Which word is a determiner in "Every child got a sticker"?',[['Every','ok'],['child','noun'],['got','verb']]],
 ['Which is right?',[['The coat is hers.','ok'],["The coat is her's.",'apos'],['The coat is her.','form']]],
 ['"Those are mine." What is those here?',[['a pronoun','ok'],['a determiner','alone'],['an adverbial','adv']]],
 ['Which needs an?',[['___ egg','ok'],['___ unicorn','sound'],['___ dog','cons']]],
 ['In "Later, we ate our cake", what is Later?',[['an adverbial','ok'],['a pronoun','pron'],['a determiner','det']]]];
function why(t){let m='Check what the word does in the sentence.';
 if(t==='noun')m='child is a noun. The determiner comes before it: every.';if(t==='verb')m='got is a verb. Determiners point at nouns.';
 if(t==='apos')m="Possessive pronouns never take an apostrophe: hers, yours, theirs.";if(t==='form')m='Her needs a noun after it (her coat). Alone, use hers.';
 if(t==='alone')m='No noun comes after those, so it stands alone: a pronoun.';if(t==='adv')m='An adverbial tells when, where or how. Those stands for things.';
 if(t==='sound')m='Unicorn starts with a y sound, so it takes a: a unicorn.';if(t==='cons')m='Dog starts with a consonant sound, so it takes a.';
 if(t==='pron')m='Later does not stand in for a noun. It tells when: an adverbial.';if(t==='det')m='Later is not before a noun. It tells when, so it is an adverbial.';return m}
function quizNext(){qi++;const[q,ops]=QZ[qi%QZ.length],r=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>judge(t)});voice('Challenge: '+q);A.redraw()}
function judge(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Right term!':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quizNext}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
A.start()})})();
