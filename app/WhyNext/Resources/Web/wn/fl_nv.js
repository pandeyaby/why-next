/* Flagship – basic nouns and verbs (ages 5–6): tap the naming words (nouns) in a park picture while the doing-word tags
   (verbs) say what is happening, sort nouns into person, place and thing, drag doing words onto Sam to make him act
   (a noun card makes nothing happen), sort cards with the tests "the ___" and "I can ___", then build "The dog barks."
   style sentences with a naming word before the doing word. Every drag also works with buttons. */
(()=>{const lo=Math.min,hi=Math.max;
 const SCENE=[['👧','girl',.2,.55],['🐕','dog',.5,.68],['⚽','ball',.74,.74],['🌳','tree',.84,.36],['🚲','bike',.4,.32],['🏠','house',.12,.24]];
 const TAGS=[['runs',.2,.4,'girl'],['jumps',.5,.52,'dog']];
 const P3=[['Mum',0],['park',1],['cup',2],['teacher',0],['school',1],['bike',2]],BIN3=['🧑 Person','🏠 Place','🎁 Thing'];
 const ACT=[['run',1],['hat',0],['jump',1],['eat',1],['sleep',1]];
 const NV=[['cake',0],['swim',1],['dog',0],['sing',1],['bed',0],['read',1]];
 const RND=[['🐕','dog','barks','Woof!'],['🐈','cat','sleeps','Zzz'],['🐟','fish','swims','~ ~']],BCARDS=['barks','dog','swims','cat','sleeps','fish'];
VIS.reg('flagnv',c=>{let A,pad,chal,read;
 const S={found:[],sorted:{},acted:[],act:null,cards:[],rects:[],sel:null,drag:null,at:null,moved:0,rd:0,slot:[null,null],built:0,bad:null,gen:0,want:()=>{},note:''};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['find','p3','act','nv','build','quiz'][A.step];
 const fz=z=>A.narrow?z:z+3;
 const txt=(x,t,X,Y,z,k,w)=>{x.font=`${w||800} ${fz(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-12)};
 const oops=t=>{A.sound.miss();say(t);A.redraw()};
 // word cards in a wrapping row starting at y0; remembers rects for hit tests
 function cardRow(x,words,y0,hide,col){const C=A.col,h=hi(40,A.H*.1),gap=10;x.font=`800 ${fz(15)}px system-ui,sans-serif`;const W=words.map(w=>x.measureText(w).width+28);
  const rows=[[]];let used=0;W.forEach((w,i)=>{if(used+w>A.W-24&&rows[rows.length-1].length){rows.push([]);used=0}rows[rows.length-1].push(i);used+=w+gap});
  S.rects=[];rows.forEach((r,ri)=>{const tot=r.reduce((s,i)=>s+W[i]+gap,-gap);let X=(A.W-tot)/2;r.forEach(i=>{const R={i,x:X,y:y0+ri*(h+8),w:W[i],h};X+=W[i]+gap;if(hide(i))return;S.rects.push(R);
   const dr=S.drag===i&&S.moved&&S.at,bx=dr?S.at.x-R.w/2:R.x,by=dr?S.at.y-R.h/2:R.y;card(x,words[i],bx,by,R.w,h,S.sel===i||S.drag===i?C.tx:S.bad===i?C.rd:col(i))})})}
 function card(x,w,X,Y,cw,h,k){const C=A.col;A.paint.shadow(6,2,.2);x.fillStyle=A.mix(C.pn,'#ffffff',C.dark?.06:.6);A.paint.rrect(X,Y,cw,h,12);x.fill();A.paint.noShadow();x.strokeStyle=k;x.lineWidth=3;x.stroke();txt(x,w,X+cw/2,Y+h/2+1,15,C.tx)}
 function bins(n,labels,y,col){const C=A.col,g=8,w=(A.W-24-g*(n-1))/n,h=A.H-y-8;return labels.map((l,b)=>{const X=12+b*(w+g);x0().fillStyle=A.alpha(col(b),.13);A.paint.rrect(X,y,w,h,14);x0().fill();x0().strokeStyle=col(b);x0().lineWidth=2;x0().stroke();txt(x0(),l,X+w/2,y+18,13,C.tx);return{x:X,y,w,h}})}
 const x0=()=>A.ctx;
 const inR=(p,R)=>p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
 function findV(x){const C=A.col;x.fillStyle=A.mix(C.gr,C.pn,C.dark?.7:.65);x.fillRect(0,A.H*.5,A.W,A.H*.5);
  SCENE.forEach(([e,w,fx,fy])=>{const X=fx*A.W,Y=fy*A.H,got=S.found.includes(w);txt(x,e,X,Y,A.narrow?34:44,C.tx,400);if(got){x.font=`800 ${fz(14)}px system-ui,sans-serif`;const cw=x.measureText(w).width+20;
   x.fillStyle=C.dark?C.cy:A.mix(C.cy,'#000',.3);A.paint.rrect(X-cw/2,Y+24,cw,26,10);x.fill();txt(x,w,X,Y+37,14,C.dark?'#0b1220':'#fff')}});
  TAGS.forEach(([w,fx,fy])=>{const X=fx*A.W,Y=fy*A.H;x.font=`700 ${fz(12)}px system-ui,sans-serif`;const cw=x.measureText(w).width+16;x.fillStyle=A.alpha(C.am,.25);A.paint.rrect(X-cw/2,Y-12,cw,24,12);x.fill();x.strokeStyle=C.am;x.lineWidth=1.5;x.stroke();txt(x,w,X,Y,12,C.tx,700)});
  txt(x,S.found.length>=4?'4 naming words found!':`Naming words found: ${S.found.length} of 4`,A.W/2,A.H*.07,15,S.found.length>=4?C.gr:C.tx)}
 function p3V(x){const C=A.col,k=b=>[C.cy,C.vi,C.am][b];cardRow(x,P3.map(p=>p[0]),A.H*.14,i=>S.sorted[i]!=null,()=>C.cy);S.bins=bins(3,BIN3,A.H*.5,k);
  P3.forEach(([w,b],i)=>{if(S.sorted[i]==null)return;const R=S.bins[b],n=P3.filter((q,j)=>S.sorted[j]===b&&j<i).length;txt(x,w,R.x+R.w/2,R.y+50+n*28,14,C.tx,700)});txt(x,S.note||'Drag each noun to a box',A.W/2,A.H*.06,14,C.tx)}
 function kid(x,X,Y,u){const C=A.col,a=S.act,k=a&&a.k,t=a?a.t:0,skin=A.mix(C.pn,'#e0a878',C.dark?.5:.8);x.save();
  if(k==='run')X+=Math.sin(t*Math.PI)*A.W*.12;if(k==='jump')Y-=Math.abs(Math.sin(t*Math.PI*2))*u*1.4;
  if(k==='sleep'){X-=u*.5*lo(1,t*3);x.translate(X,Y+u*1.6);x.rotate(Math.PI/2*hi(0,lo(1,t*3)));x.translate(-X,-Y-u*1.6)}
  x.strokeStyle=A.mix(C.cy,C.tx,.2);x.lineWidth=u*.28;x.lineCap='round';const sw=k==='run'?Math.sin(t*Math.PI*8)*.6:0;
  x.beginPath();x.moveTo(X,Y);x.lineTo(X,Y+u*1.1);x.moveTo(X,Y+u*1.1);x.lineTo(X-u*(.4+sw),Y+u*2);x.moveTo(X,Y+u*1.1);x.lineTo(X+u*(.4+sw),Y+u*2);
  const up=k==='jump'?-.6:0;x.moveTo(X,Y+u*.35);x.lineTo(X-u*.7,Y+u*(.8+up));x.moveTo(X,Y+u*.35);x.lineTo(X+u*.7,Y+u*(k==='eat'?.1:.8+up));x.stroke();
  x.fillStyle=skin;x.beginPath();x.arc(X,Y-u*.45,u*.45,0,7);x.fill();x.fillStyle='#1f2937';[-.15,.15].forEach(d=>{x.beginPath();if(k==='sleep'&&t>.3)x.rect(X+d*u-u*.08,Y-u*.5,u*.16,u*.04);else x.arc(X+d*u,Y-u*.5,u*.06,0,7);x.fill()});x.restore();
  if(k==='eat')txt(x,'🍎',X+u*.85,Y-u*.1,u*(.9-t*.6),C.tx,400);if(k==='sleep'&&t>.3)txt(x,'Z z z',X+u*2,Y+u*.5,14,C.tx);if(k==='run'&&t>0&&t<1)txt(x,'💨',X-u*1.2+Math.sin(t*Math.PI)*A.W*.12,Y+u*1.6,18,C.tx,400)}
 function actV(x){const C=A.col,u=A.H*.11;x.fillStyle=A.alpha(C.gr,.18);x.fillRect(0,A.H*.62,A.W,A.H*.38);S.sam={x:A.W*.3,y:A.H*.3,w:A.W*.3,h:A.H*.45};kid(x,A.W*.3,A.H*.32,u);
  txt(x,S.act&&S.act.k&&S.act.k!=='hat'?`Sam can ${S.act.k}!`:'Sam',A.W*.3,A.H*.06,15,C.tx);
  const R=ACT.map(([w],i)=>({i,x:A.W*.62,y:A.H*(.08+i*.17),w:A.W*.32,h:A.H*.13}));S.rects=R.filter(r=>!S.acted.includes(ACT[r.i][0]));
  S.rects.forEach(r=>{const dr=S.drag===r.i&&S.moved&&S.at;card(x,ACT[r.i][0],dr?S.at.x-r.w/2:r.x,dr?S.at.y-r.h/2:r.y,r.w,r.h,S.sel===r.i||S.drag===r.i?C.tx:S.bad===r.i?C.rd:C.am)})}
 function nvV(x){const C=A.col,k=b=>b?C.am:C.cy;cardRow(x,NV.map(p=>p[0]),A.H*.12,i=>S.sorted[i]!=null,()=>C.mu);S.bins=bins(2,['Noun: naming word','Verb: doing word'],A.H*.56,k);
  NV.forEach(([w,b],i)=>{if(S.sorted[i]==null)return;const R=S.bins[b],n=NV.filter((q,j)=>S.sorted[j]===b&&j<i).length;txt(x,w,R.x+R.w/2,R.y+48+n*26,14,C.tx,700)});
  const s=S.sel!=null?S.sel:S.drag;if(s!=null&&S.sorted[s]==null){const w=NV[s][0];txt(x,`"the ${w}"  or  "I can ${w}"?`,A.W/2,A.H*.47,14,C.tx,700)}else txt(x,'Try: "the ___" or "I can ___"',A.W/2,A.H*.47,13,C.mu,700)}
 function buildV(x){const C=A.col,r=RND[lo(S.rd,2)],done=S.built>=3;txt(x,done?'🐕 🐈 🐟':r[0],A.W*.3,A.H*.16,done?30:46,C.tx,400);if(!done)txt(x,r[3],A.W*.55,A.H*.13,15,C.tx);
  const sw=lo(A.W*.26,150),sh=hi(40,A.H*.1),y=A.H*.3,X0=(A.W-(sw*2+A.W*.18+20))/2;card(x,'The',X0,y,A.W*.13,sh,C.mu);
  S.slots=[0,1].map(j=>({x:X0+A.W*.13+8+j*(sw+8),y,w:sw,h:sh}));S.slots.forEach((R,j)=>{const w=S.slot[j];if(w)card(x,w,R.x,R.y,R.w,R.h,C.gr);else{x.setLineDash([6,5]);x.strokeStyle=C.mu;x.lineWidth=2;A.paint.rrect(R.x,R.y,R.w,R.h,12);x.stroke();x.setLineDash([]);txt(x,j?'doing word':'naming word',R.x+R.w/2,R.y+R.h/2,12,C.mu,600)}});
  txt(x,'.',S.slots[1].x+sw+8,y+sh*.7,26,C.tx);txt(x,done?'3 sentences built!':`Sentence ${S.rd+1} of 3`,A.W/2,A.H*.06,14,done?C.gr:C.tx);
  if(!done)cardRow(x,BCARDS,A.H*.55,i=>S.slot.includes(BCARDS[i]),()=>C.mu)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.05:.35);x.fillRect(0,0,W,H);
  ({find:findV,p3:p3V,act:actV,nv:nvV,build:buildV}[v]||(()=>txt(x,S.Q||'📝',W/2,H/2,60,C.tx,400)))(x);A.fx.draw(x)}
 function tapScene(w){if(S.found.length>=4)return;const tg=TAGS.find(t=>t[0]===w);if(tg)return oops(`"${w}" tells what the ${tg[3]} does. It is a doing word, not a naming word. Tap a thing or a person.`);
  if(S.found.includes(w))return say(`You found "${w}" already.`);S.found.push(w);A.sound.pop();tell(`"${w}" is a noun. It names ${w==='girl'?'a person':w==='dog'?'an animal':'a thing'}.`)}
 function put3(i,b){if(S.sorted[i]!=null)return;S.sel=null;const[w,ok]=P3[i];if(b!==ok){S.bad=i;const why=['a person','a place','a thing'][ok];return oops(`"${w}" names ${why}. It is still a noun. Try the ${BIN3[ok].split(' ')[1]} box.`)}
  S.bad=null;S.sorted[i]=b;A.sound.pop();tell(`Yes! "${w}" is a noun that names ${['a person','a place','a thing'][b]}.`)}
 function act(i,cb){const[w,v]=ACT[i];S.sel=null;if(S.act&&S.act.busy)return;if(!v){S.bad=i;return oops('Sam cannot "hat"! Hat names a thing. It is a noun, not a doing word.')}
  S.bad=null;S.act={k:w,t:0,busy:1};A.sound.whoosh();A.tween(S.act,{t:1},1100,'io',()=>{S.act.busy=0;if(!S.acted.includes(w))S.acted.push(w);if(w==='sleep')S.act.t=1;tell(`"${w}" is a verb. It is something Sam does${w==='sleep'?', even lying still':''}.`);cb&&cb()})}
 function putNV(i,b){if(S.sorted[i]!=null)return;S.sel=null;const[w,ok]=NV[i];if(b!==ok){S.bad=i;return oops(ok?`Can you say "I can ${w}"? Yes! "${w}" is a doing word, a verb.`:`"I can ${w}" sounds wrong. "The ${w}" works, so "${w}" is a naming word, a noun.`)}
  S.bad=null;S.sorted[i]=b;A.sound.pop();tell(ok?`Yes! "I can ${w}". "${w}" is a verb.`:`Yes! "the ${w}". "${w}" is a noun.`)}
 function putW(w,j){if(S.built>=3)return;S.sel=null;const r=RND[S.rd],isV=['barks','sleeps','swims'].includes(w);
  if(j===0&&isV)return oops(`"The ${w}..." does not tell us who. "${w}" is a doing word. Put a naming word first.`);
  if(j===1&&!isV)return oops(`"${w}" is a naming word. The second box needs a doing word: what does it do?`);
  if(w!==(j?r[2]:r[1]))return oops(j?`Look: the ${r[1]} does not ${w.replace(/s$/,'')} here. What does it do?`:`Look at the picture. It is a ${r[1]}, not a ${w}.`);
  S.slot[j]=w;A.sound.pop();if(S.slot[0]&&S.slot[1]){const s=`The ${S.slot[0]} ${S.slot[1]}.`;S.built++;A.sound.win();const g=S.gen;tell(`${s} Naming word, then doing word.`);setTimeout(()=>{if(g!==S.gen)return;if(S.built<3){S.rd=S.built;S.slot=[null,null]}tell()},900)}else tell()}
 function tell(msg){const v=view();let t;
  if(v==='find')t=`Nouns found: ${S.found.join(', ')||'none yet'}.`;else if(v==='p3')t=`Sorted ${Object.keys(S.sorted).length} of 6 nouns.`;
  else if(v==='act')t=`Sam did: ${S.acted.join(', ')||'nothing yet'}.`;else if(v==='nv')t=`Nouns: ${NV.filter((q,i)=>S.sorted[i]===0).map(q=>q[0]).join(', ')||'none'}. Verbs: ${NV.filter((q,i)=>S.sorted[i]===1).map(q=>q[0]).join(', ')||'none'}.`;
  else if(v==='build')t=S.built>=3?'All 3 sentences built.':`Picture: a ${RND[S.rd][1]}. Sentence: The ${S.slot[0]||'blank'} ${S.slot[1]||'blank'}.`;else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();S.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  const pick=(list,done,lab)=>{if(S.sel==null)list.forEach((w,i)=>{if(!done(i))B(w,()=>{S.sel=i;A.sound.tick();tell(`"${w}" picked.`)},`Pick ${w}`)});else{lab.forEach((l,b)=>B(l,()=>v==='p3'?put3(S.sel,b):putNV(S.sel,b),`Put it in ${l}`));B('✋ Another',()=>{S.sel=null;refresh()},'Pick another card')}};
  if(v==='find'&&S.found.length<4){SCENE.forEach(([e,w])=>B(e,()=>tapScene(w),`Tap the ${w}`));TAGS.forEach(([w])=>B(w,()=>tapScene(w),`Tap the tag ${w}`))}
  if(v==='p3')pick(P3.map(p=>p[0]),i=>S.sorted[i]!=null,BIN3);
  if(v==='nv')pick(NV.map(p=>p[0]),i=>S.sorted[i]!=null,['Noun','Verb']);
  if(v==='act')ACT.forEach(([w],i)=>{if(!S.acted.includes(w))B(w,()=>act(i),`Give Sam the word ${w}`)});
  if(v==='build'&&S.built<3){if(S.sel==null)BCARDS.forEach((w,i)=>{if(!S.slot.includes(w))B(w,()=>{S.sel=i;A.sound.tick();tell(`"${w}" picked. First box or second box?`)},`Pick ${w}`)});
   else{const w=BCARDS[S.sel];B('1st box',()=>putW(w,0),'Put it in the first box');B('2nd box',()=>putW(w,1),'Put it in the second box');B('✋ Another',()=>{S.sel=null;refresh()},'Pick another card')}}
  A.redraw()}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*gap))};
 const clear=()=>{S.gen++;S.want=()=>{};S.drag=null;S.at=null;S.sel=null;S.bad=null;S.note='';S.sorted={}};
 const steps=[
  {h:'Naming words',p:'A noun is a naming word. It names a person, a place or a thing. Tap 4 things in the park to hear their names.',task:'Find 4 nouns in the picture',
   show:()=>{steps[0].go();seq(['girl','dog','ball','tree'].map(w=>()=>tapScene(w)),450)},go:()=>{clear();S.found=[];tell();S.want=ok(0,()=>S.found.length>=4,()=>'Girl, dog, ball and tree are all nouns: they name who or what.')}},
  {h:'Person, place or thing',p:'Every noun names a person, a place or a thing. Drag each noun to its box.',predict:{q:'Is "park" a noun?',opts:['No, you cannot hold it','Yes, it names a place'],ans:1},task:'Sort all 6 nouns',
   show:()=>{steps[1].go();seq(P3.map((p,i)=>()=>put3(i,p[1])),420)},go:()=>{clear();tell();S.want=ok(1,()=>P3.every((p,i)=>S.sorted[i]!=null),()=>'People, places and things all have nouns.')}},
  {h:'Doing words',p:'A verb is a doing word. It tells what someone does. Drag a word onto Sam and watch.',predict:{q:'Is "sleep" a doing word?',opts:['No, Sam keeps still','Yes, Sam does it'],ans:1},task:'Make Sam do 4 things',
   show:()=>{steps[2].go();seq([0,2,3,4].map(i=>()=>act(i)),1300)},go:()=>{clear();S.acted=[];S.act=null;tell();S.want=ok(2,()=>S.acted.length>=4,()=>'Run, jump, eat and sleep are all verbs. Hat is a noun.')}},
  {h:'Noun or verb?',p:'Say "the ___". If it sounds right, it is a noun. Say "I can ___". If that sounds right, it is a verb.',task:'Sort 6 words into noun or verb',
   show:()=>{steps[3].go();seq(NV.map((p,i)=>()=>putNV(i,p[1])),420)},go:()=>{clear();tell();S.want=ok(3,()=>NV.every((p,i)=>S.sorted[i]!=null),()=>'Cake, dog and bed are nouns. Swim, sing and read are verbs.')}},
  {h:'Build a sentence',p:'Look at the picture. Put the naming word first, then the doing word.',predict:{q:'Which order makes a sentence?',opts:['The barks dog','The dog barks'],ans:1},task:'Build 3 sentences',
   show:()=>{steps[4].go();const fs=[];RND.forEach(r=>{fs.push(()=>putW(r[1],0),()=>putW(r[2],1),()=>{})});seq(fs,600)},go:()=>{clear();S.rd=0;S.built=0;S.slot=[null,null];tell();S.want=ok(4,()=>S.built>=3,()=>'Who it is, then what it does: The dog barks. The cat sleeps. The fish swims.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Which word is a noun?','⚽',[['ball','ok'],['jump','jump'],['eat','eat']]],
  ['Which word is a verb?','🏊',[['swim','ok'],['cup','cup'],['park','park']]],
  ['"The girl kicks the ball." Which word is the doing word?','👧',[['kicks','ok'],['girl','girl'],['the','the']]],
  ['Is "school" a noun?','🏫',[['Yes, it names a place','ok'],['No, you cannot hold it','hold'],['No, it is a doing word','doing']]],
  ['Which one is a sentence?','🐈',[['The cat sleeps.','ok'],['The sleeps cat.','order'],['the cat sleeps','caps']]],
  ['Is "sleep" a verb?','😴',[['Yes, it is something you do','ok'],['No, you keep still','still'],['No, it names a thing','thing']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;S.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(tag)});say('Challenge: '+q);A.redraw()}
 function grade(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'jump':m='"I can jump" works, so jump is a verb. "The ball" works, so ball is the noun.';break;
   case 'eat':m='Eat is something you do, so it is a verb. Ball names a thing: a noun.';break;
   case 'cup':m='"The cup" names a thing, so cup is a noun. "I can swim" works: swim is the verb.';break;
   case 'park':m='Park names a place, so it is a noun. Swim is the doing word.';break;
   case 'girl':m='Girl names a person, so it is a noun. What does she do? She kicks.';break;
   case 'the':m='"The" is a little helper word. It points to a noun. The doing word is kicks.';break;
   case 'hold':m='A noun does not have to be something you hold. School names a place, so it is a noun.';break;
   case 'doing':m='You cannot "school". It names a place, so it is a noun, not a verb.';break;
   case 'order':m='The doing word came first. Who is it? The cat. Then what it does: sleeps.';break;
   case 'caps':m='The words are right, but a sentence starts with a capital letter and ends with a full stop.';break;
   case 'still':m='A verb does not have to move. Sleep is something you do, so it is a verb.';break;
   default:m='"I can sleep" works, so sleep is a doing word, a verb, not a naming word.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 const hitCard=p=>{const r=S.rects.find(R=>inR(p,R));return r?r.i:null};
 function down(p){const v=view();S.drag=null;S.at=null;S.moved=0;S.d0=p;
  if(v==='find'){const tg=TAGS.find(([w,fx,fy])=>Math.abs(p.x-fx*A.W)<40&&Math.abs(p.y-fy*A.H)<16);if(tg){tapScene(tg[0]);return false}
   let best=null,bd=A.H*.11;SCENE.forEach(([e,w,fx,fy])=>{const d=Math.hypot(p.x-fx*A.W,p.y-fy*A.H);if(d<bd){bd=d;best=w}});if(best)tapScene(best);return false}
  if(v==='quiz')return false;const i=hitCard(p);if(i!=null){S.drag=i;return true}
  if(S.sel!=null&&(v==='p3'||v==='nv')){const b=(S.bins||[]).findIndex(R=>inR(p,R));if(b>=0)(v==='p3'?put3:putNV)(S.sel,b)}
  if(S.sel!=null&&v==='build'){const j=(S.slots||[]).findIndex(R=>inR(p,R));if(j>=0)putW(BCARDS[S.sel],j)}return false}
 function move(p){if(S.drag==null)return;if(Math.hypot(p.x-S.d0.x,p.y-S.d0.y)>10)S.moved=1;S.at=p;A.redraw()}
 function up(p){const i=S.drag,v=view();S.drag=null;if(i==null)return;const moved=S.moved;S.moved=0;S.at=null;
  if(v==='act'){if(!moved||inR(p,S.sam))act(i);else A.redraw();return}
  if(!moved){S.sel=i;A.sound.tick();const w=v==='p3'?P3[i][0]:v==='nv'?NV[i][0]:BCARDS[i];return tell(`"${w}" picked.`)}
  if(v==='build'){const j=S.slots.findIndex(R=>inR(p,R));if(j>=0)putW(BCARDS[i],j);else A.redraw();return}
  const b=(S.bins||[]).findIndex(R=>inR(p,R));if(b>=0)(v==='p3'?put3:putNV)(i,b);else A.redraw()}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
