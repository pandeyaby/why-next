/* Flagship – engaging listeners and valuing viewpoints (ages 7–8): open a talk with a hook and watch the class's
   attention, drag the pace and volume dials and look up from your notes until every listener is with you, read
   listeners' faces mid-talk and pick the fix, build agree / disagree / add-on replies to Priya that each carry a
   reason (and disagree with the idea, not the person), then sort sentences into class-talk or chatting-with-friends. */
(()=>{const mn=Math.min,mx=Math.max,cl=(v,a,b)=>mn(b,mx(a,v));
 const HOOKS=[['"Um... so this is about hamsters."',0,'A mumbled start tells the class nothing interesting. Their attention drops.'],
  ['"Hamsters carry food in their cheeks, like a shopping bag! Want to know how?"',1,'A surprising fact and a question make them want to hear more.'],
  ['(Read the first page of your notes, facing the board.)',0,'With your back to them and eyes on the page, the class drifts off.']];
 const SIGNS=[['😕','Ali frowns and looks puzzled.',[['Say it again with an example',1],['Talk faster to get it done',0,'Faster makes it harder to follow. Explain it again with an example.'],['Carry on, it will be fine',0,'Puzzled faces mean they are lost. Stop and explain again.']]],
  ['🥱','Sam yawns and looks out of the window.',[['Ask the class a question',1],['Read your notes more quietly',0,'Quieter and head-down loses them even more. Bring them back in with a question.'],['Tell Sam off',0,'Telling off does not win interest back. Ask a question, or change your voice.']]],
  ['✋','Mia puts her hand up.',[['Pause and take her question',1],['Ignore the hand and keep going',0,'A hand up is a listener who wants in. Pause and let her ask.'],['Talk louder over her',0,'Talking over someone tells them their idea does not matter. Pause for her.']]],
  ['👂','Leo, at the back, cups his ear.',[['Speak up so the back row can hear',1],['Turn to face the board',0,'Facing away makes you even harder to hear. Face the class and speak up.'],['Speak faster',0,'Faster does not help him hear. Speak up, clearly.']]]];
 const STEMS=[['I agree with Priya because',1],['I disagree with Priya because',-1],["I'd add to Priya's idea:",0],['Priya is being silly.',9]];
 const REASONS=[['hamsters are easy to look after.',1],['they sleep all day, so we would hardly see one.',-1],['we could take turns feeding it at weekends.',0],['just because.',8]];
 const REG=[['Good morning, everyone. Today I will tell you about hamsters.',1],['Guess what! My hamster did the funniest thing!',0],['Thank you for listening. Are there any questions?',1],["Nah, I don't really get it either.",0]];
VIS.reg('flagengage',c=>{let A,pad,chal,q=-1,gen=0;
 const T={hook:-1,att:.35,pace:.88,vol:.25,eyes:0,drag:null,si:0,stem:-1,made:[],ri:0,held:null,wrong:-1,pic:'',want:()=>{}};
 const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const kind=()=>['hook','dial','watch','reply','reg','quiz'][A.step];
 const X=f=>f*A.W,Y=f=>f*A.H,pz=z=>A.narrow?z:z+3;
 const lab=(x,s,px,py,z,k,w)=>{x.font=`${w||700} ${pz(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,px,py,A.W-14)};
 const tile=(x,r,k,a,lw)=>{x.fillStyle=A.alpha(k,a==null?.15:a);A.paint.rrect(r.x,r.y,r.w,r.h,12);x.fill();x.strokeStyle=k;x.lineWidth=lw||2;x.stroke()};
 const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const fold=(x,s,r,z,k)=>{x.font=`600 ${pz(z)}px system-ui,sans-serif`;const out=[];let l='';s.split(' ').forEach(w=>{const t=l?l+' '+w:w;if(x.measureText(t).width>r.w-16&&l){out.push(l);l=w}else l=t});out.push(l);
  out.forEach((t,i)=>lab(x,t,r.x+r.w/2,r.y+r.h/2+(i-(out.length-1)/2)*(pz(z)+3),z,k,600))};
 const miss=t=>{A.sound.miss();voice(t);A.redraw()};
 const hitOk=t=>{A.sound.pop();voice(t);buttons();A.redraw();T.want()};
 // the class: five listeners whose faces show attention
 function audience(x,face,y){const n=5;for(let i=0;i<n;i++){const px=X(.1+i*.2),py=y+(i%2)*Y(.05);x.font=`${mn(A.W*.11,48)}px system-ui`;x.textAlign='center';x.textBaseline='middle';x.fillText(face(i),px,py)}}
 function meter(x,v,y){const C=A.col,r={x:X(.08),y,w:X(.84),h:Y(.05)};x.fillStyle=A.alpha(C.ln,.5);A.paint.rrect(r.x,r.y,r.w,r.h,8);x.fill();x.fillStyle=v>=.8?C.gr:v>=.5?C.am:C.rd;A.paint.rrect(r.x,r.y,r.w*cl(v,.03,1),r.h,8);x.fill();lab(x,'attention',r.x+r.w/2,r.y+r.h+12,11,C.tx,600)}
 // ---- 1: the hook ----
 const hookR=i=>({x:10,y:Y(.48)+i*Y(.17),w:A.W-20,h:Y(.15)});
 function hookV(x){const C=A.col;lab(x,'Your talk: My pet hamster. How will you start?',A.W/2,Y(.06),13,C.tx);audience(x,()=>T.att>=.8?'😀':T.att>=.5?'🙂':'😐',Y(.18));meter(x,T.att,Y(.32));
  HOOKS.forEach((h,i)=>{const r=hookR(i);tile(x,r,T.hook===i?(h[1]?C.gr:C.rd):C.cy,T.hook===i?.2:.1,T.hook===i?4:2);fold(x,h[0],r,12,C.tx)})}
 function hook(i){T.hook=i;const h=HOOKS[i];if(!h[1]){T.att=.22;return miss(h[2])}T.att=.92;hitOk(h[2])}
 // ---- 2: pace, volume, eye contact ----
 const rule=()=>T.pace>.66?['😵','Too fast: they lose track.']:T.pace<.34?['😴','Too slow: they get bored.']:T.vol<.45?['😕','Too quiet: the back row cannot hear.']:T.vol>.82?['😣','Too loud: it hurts their ears.']:!T.eyes?['😐','Eyes on your notes: they feel left out.']:['😀','Everyone is with you!'];
 const dialR=k=>({x:X(.12),y:Y(k?.72:.56),w:X(.76),h:Y(.08)}),eyeR=()=>({x:X(.3),y:Y(.85),w:X(.4),h:Y(.12)});
 function dialV(x){const C=A.col,[f,t]=rule();audience(x,()=>f,Y(.14));lab(x,t,A.W/2,Y(.3),14,f==='😀'?C.gr:C.tx,800);meter(x,f==='😀'?1:.4,Y(.37));
  [['Pace',T.pace,'slow','fast',[.34,.66]],['Volume',T.vol,'quiet','loud',[.45,.82]]].forEach(([n,v,a,b,ok],k)=>{const r=dialR(k),y=r.y+r.h/2;x.fillStyle=A.alpha(C.ln,.6);x.fillRect(r.x,y-3,r.w,6);x.fillStyle=A.alpha(C.gr,.35);x.fillRect(r.x+r.w*ok[0],y-6,r.w*(ok[1]-ok[0]),12);
   A.paint.ball(r.x+r.w*v,y,mx(12,A.W*.03),C.vi);lab(x,n,r.x+r.w/2,r.y-6,12,C.tx,800);lab(x,a,r.x-2,y+18,11,C.tx,600);lab(x,b,r.x+r.w+2,y+18,11,C.tx,600)});
  const e=eyeR();tile(x,e,T.eyes?C.gr:C.am,.18,3);lab(x,T.eyes?'👀 Looking at the class':'📄 Eyes on notes',e.x+e.w/2,e.y+e.h/2,12,C.tx,700)}
 function setDial(k,v){T[k]=cl(v,0,1);A.redraw();check()}
 function check(){if(rule()[0]==='😀'&&!T.won){T.won=1;hitOk('Steady pace, clear voice, eyes on the class: everyone is listening.')}else if(!T.won)voice(rule()[1])}
 // ---- 3: read the room ----
 const optR=i=>({x:10,y:Y(.44)+i*Y(.18),w:A.W-20,h:Y(.15)});
 function watchV(x){const C=A.col;if(T.si>=SIGNS.length)return lab(x,'You noticed every listener and fixed it.',A.W/2,Y(.35),15,C.gr,800);const s=SIGNS[T.si];
  x.font=`${mn(A.W*.18,72)}px system-ui`;x.textAlign='center';x.textBaseline='middle';x.fillText(s[0],A.W/2,Y(.15));lab(x,s[1],A.W/2,Y(.31),14,C.tx,700);
  s[2].forEach((o,i)=>{const r=optR(i);tile(x,r,T.wrong===i?C.rd:C.cy,.12,T.wrong===i?4:2);fold(x,o[0],r,13,C.tx)})}
 function fix(i){if(T.si>=SIGNS.length)return;const o=SIGNS[T.si][2][i];if(!o[1]){T.wrong=i;return miss(o[2])}T.wrong=-1;T.si++;hitOk(`Good fix: ${o[0].toLowerCase()}.`)}
 // ---- 4: build a reply with a reason ----
 const chipR=(i,row)=>{const w=(A.W-30)/2;return{x:10+(i%2)*(w+10),y:Y(row?.72:.42)+Math.floor(i/2)*Y(.13),w,h:Y(.11)}};
 function replyV(x){const C=A.col;lab(x,'Priya: "A hamster would be the best class pet."',A.W/2,Y(.06),13,C.tx,800);
  const s={x:10,y:Y(.13),w:A.W-20,h:Y(.18)};tile(x,s,C.am,.12);fold(x,T.stem>=0?STEMS[T.stem][0]+' …':'Pick a start, then a reason',s,13,C.tx);
  lab(x,`Replies with a reason: ${T.made.length} of 3`,A.W/2,Y(.36),12,T.made.length>=3?C.gr:C.tx,800);
  STEMS.forEach((st,i)=>{let r=chipR(i,0);if(T.held&&T.held.s&&T.held.i===i)r={...r,x:T.held.x-r.w/2,y:T.held.y-r.h/2};tile(x,r,T.stem===i?C.vi:C.cy,T.stem===i?.3:.12,T.made.includes(i)?4:2);fold(x,(T.made.includes(i)?'✓ ':'')+st[0],r,11,C.tx)});
  REASONS.forEach((re,i)=>{let r=chipR(i,1);if(T.held&&!T.held.s&&T.held.i===i)r={...r,x:T.held.x-r.w/2,y:T.held.y-r.h/2};tile(x,r,C.pk,.12);fold(x,'…'+re[0],r,11,C.tx)})}
 function stem(i){if(T.made.length>=3)return;if(STEMS[i][1]===9){T.stem=-1;return miss('That is about Priya, not her idea. Disagree with the idea, never the person.')}if(T.made.includes(i))return miss('You already made that kind of reply. Try a different start.');T.stem=i;A.sound.tick();voice(STEMS[i][0]+' … now pick a reason.');buttons();A.redraw()}
 function reason(j){if(T.made.length>=3)return;if(T.stem<0)return miss('Pick how your reply starts first.');const r=REASONS[j],s=STEMS[T.stem];
  if(r[1]===8)return miss('"Just because" is not a reason. Say why.');
  if(r[1]!==s[1])return miss(s[1]===1?'That reason argues against Priya. It does not fit "I agree".':s[1]===-1?(r[1]===1?'That reason supports Priya. It does not fit "I disagree".':'That is a new idea, not a reason to disagree. Use it to add on.'):'To add on, give a new idea that builds on hers, not a reason for or against.');
  T.made.push(T.stem);const said=s[0]+' '+r[0];T.stem=-1;hitOk(`"${said}" A clear reply with a reason.`)}
 // ---- 5: the right words for the place ----
 const regBin=k=>({x:k?X(.52):X(.02),y:Y(.6),w:X(.46),h:Y(.36)}),cardR=()=>{const r={x:X(.06),y:Y(.18),w:X(.88),h:Y(.24)};return T.held&&T.held.reg?{...r,x:T.held.x-r.w/2,y:T.held.y-r.h/2}:r};
 function regV(x){const C=A.col;[['😄 Chatting with friends',C.am],['🎤 Class talk',C.vi]].forEach(([t,k],i)=>{const r=regBin(i);tile(x,r,k,.1);lab(x,t,r.x+r.w/2,r.y+22,12,C.tx,800)});
  if(T.ri>=REG.length)return lab(x,'Right words for the right place!',A.W/2,Y(.3),15,C.gr,800);lab(x,`Where would you say this? (${T.ri+1} of 4)`,A.W/2,Y(.08),13,C.tx);const r=cardR();tile(x,r,C.cy,.18);fold(x,REG[T.ri][0],r,13,C.tx)}
 function place(k){T.held=null;if(T.ri>=REG.length)return;const g=REG[T.ri];if(k!==g[1])return miss(g[1]?'That sounds like a class talk: a polite greeting or ending in full sentences.':'That is chatty, everyday talk. It fits friends, not the front of the class.');T.ri++;hitOk(g[1]?'Formal: full sentences for the whole class.':'Informal: fine with friends.')}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=kind();x.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);x.fillRect(0,0,W,H);
  const f={hook:hookV,dial:dialV,watch:watchV,reply:replyV,reg:regV}[v];if(f)f(x);else{x.font=`${mn(W*.25,96)}px system-ui`;x.textAlign='center';x.textBaseline='middle';x.fillText(T.pic||'🎤',W/2,H*.5)}A.fx.draw(x)}
 function buttons(){if(!pad)return;pad.innerHTML='';const v=kind(),B=(t,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm'},pad,t);b.onclick=f};
  if(v==='hook'&&T.att<.8)HOOKS.forEach((h,i)=>B(h[0],()=>hook(i)));
  if(v==='dial'&&!T.won){B('🐢 Slower',()=>setDial('pace',T.pace-.12));B('🐇 Faster',()=>setDial('pace',T.pace+.12));B('🔉 Quieter',()=>setDial('vol',T.vol-.12));B('🔊 Louder',()=>setDial('vol',T.vol+.12));B(T.eyes?'📄 Look at notes':'👀 Look at the class',()=>{T.eyes=1-T.eyes;A.redraw();check()})}
  if(v==='watch'&&T.si<SIGNS.length)SIGNS[T.si][2].forEach((o,i)=>B(o[0],()=>fix(i)));
  if(v==='reply'&&T.made.length<3){if(T.stem<0)STEMS.forEach((s,i)=>{if(!T.made.includes(i))B(s[0],()=>stem(i))});else REASONS.forEach((r,j)=>B('… '+r[0],()=>reason(j)))}
  if(v==='reg'&&T.ri<REG.length){B('😄 Chatting with friends',()=>place(0));B('🎤 Class talk',()=>place(1))}}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const seq=(fs,ms)=>{const g=++gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===gen)f()},j*ms))};
 const clear=()=>{gen++;T.want=()=>{};T.held=null;T.drag=null;T.wrong=-1};
 const steps=[
  {h:'Hook your listeners',p:'The first few words decide if the class wants to listen. Pick an opening and watch their faces.',
   predict:{q:'Which opening makes the class want to listen?',opts:['"Um, this is about hamsters."','A surprising fact and a question'],ans:1},task:'Get the attention bar to green',
   show:()=>{steps[0].go();seq([()=>hook(1)],300)},
   go:()=>{clear();T.hook=-1;T.att=.35;voice('Your talk is about your pet hamster. How will you start?');buttons();T.want=fin(0,()=>T.att>=.8,'A hook wins attention.')}},
  {h:'Pace, volume, eyes',p:'Drag the dials. Then look up from your notes. Watch what each listener does.',
   predict:{q:'Does talking really fast keep people interested?',opts:['Yes, it sounds exciting','No, they lose track'],ans:1},task:'Get every listener smiling',
   show:()=>{steps[1].go();seq([()=>setDial('pace',.5),()=>setDial('vol',.65),()=>{T.eyes=1;A.redraw();check()}],600)},
   go:()=>{clear();T.pace=.88;T.vol=.25;T.eyes=0;T.won=0;voice('Too fast: they lose track. Drag the dials.');buttons();T.want=fin(1,()=>T.won,'Steady, clear and looking at them.')}},
  {h:'Read the room',p:'Good speakers keep checking their listeners. Read each face and pick the fix.',task:'Fix four listener signs',
   show:()=>{steps[2].go();seq(SIGNS.map(()=>()=>fix(0)),500)},
   go:()=>{clear();T.si=0;voice('Ali frowns and looks puzzled. What do you do?');buttons();T.want=fin(2,()=>T.si>=SIGNS.length,'Watch faces, then change what you do.')}},
  {h:'Agree, disagree, add on',p:'Priya has an idea. Build a reply: pick a start, then a reason that fits it. Make three kinds of reply.',
   predict:{q:'Is "I disagree" enough on its own?',opts:['Yes, it says what I think','No, it needs a reason'],ans:1},task:'Build three replies with reasons',
   show:()=>{steps[3].go();seq([()=>stem(0),()=>reason(0),()=>stem(1),()=>reason(1),()=>stem(2),()=>reason(2)],450)},
   go:()=>{clear();T.stem=-1;T.made=[];voice('Priya says a hamster would be the best class pet. Pick a start.');buttons();T.want=fin(3,()=>T.made.length>=3,'Agree, disagree or add on, always with a reason.')}},
  {h:'Right words, right place',p:'We talk one way to friends and another way to the whole class. Drag each line to where it fits.',task:'Sort all four lines',
   show:()=>{steps[4].go();seq(REG.map(g=>()=>place(g[1])),450)},
   go:()=>{clear();T.ri=0;voice('Where would you say this?');buttons();T.want=fin(4,()=>T.ri>=REG.length,'Formal for the class, informal with friends.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>T.want()});
 const QZ=[['Your talk is about volcanoes. Which start hooks the class?','🌋',[['"What if the ground under you started to melt?"','ok'],['"My talk is about volcanoes. That is it."','flat'],['"Um... where was I?"','um']]],
  ['Jay says "We should have longer playtimes." You disagree. What do you say?','🗣️',[['"I disagree, because we would miss lesson time."','ok'],['"That is a dumb idea, Jay."','person'],['"No."','bare']]],
  ['Half the class are looking at the floor. What do you do?','🙇',[['Ask them a question','ok'],['Speed up to finish','rush'],['Read your notes more quietly','hide']]],
  ['You are giving a talk to the whole school. Which is the best start?','🏫',[['"Good morning, everyone."','ok'],['"Hiya, guys!"','chatty'],['"Oi, listen!"','rude']]],
  ['Ella says "Dogs are the best pets." You want to add on. What do you say?','🐕',[['"I\'d add that dogs also keep you fit, because you walk them."','ok'],['"Yeah."','bare'],['"Ella always says that."','person']]]];
 let run=0;
 function quiz(){q++;const[t,e,o]=QZ[q%QZ.length],r=q%3;T.pic=e;
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.slice(r).concat(o.slice(0,r)).forEach(([s,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,s);b.onclick=()=>score(tag)});voice('Challenge: '+t);A.redraw()}
 function score(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! That wins your listeners or values their view.';break;
   case 'flat':m='Just naming the topic gives nobody a reason to listen. Hook them with a question or surprise.';break;
   case 'um':m='A lost, mumbled start makes listeners drift. Plan your first line.';break;
   case 'person':m='That attacks the person, not the idea. Disagree with the idea and give a reason.';break;
   case 'bare':m='A reply with no reason does not help the talk. Add "because…".';break;
   case 'rush':m='Rushing loses them faster. Slow down and bring them back with a question.';break;
   case 'hide':m='Hiding in your notes makes it worse. Look up and involve them.';break;
   case 'chatty':m='That is how you talk to friends. A whole-school talk needs formal words.';break;
   default:m='Shouting orders is rude. A polite greeting makes people want to listen.'}
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` In a row: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=kind();T.held=null;
  if(v==='hook'){const i=[0,1,2].findIndex(i=>inR(p,hookR(i)));if(i>=0&&T.att<.8)hook(i);return false}
  if(v==='dial'){if(T.won)return false;if(inR(p,eyeR())){T.eyes=1-T.eyes;A.redraw();check();return false}const k=[0,1].find(k=>{const r=dialR(k);return p.x>r.x-20&&p.x<r.x+r.w+20&&Math.abs(p.y-(r.y+r.h/2))<mx(26,A.H*.06)});if(k!=null){T.drag=k;move(p);return true}return false}
  if(v==='watch'){const i=[0,1,2].findIndex(i=>inR(p,optR(i)));if(i>=0)fix(i);return false}
  if(v==='reply'){const i=STEMS.findIndex((_,i)=>inR(p,chipR(i,0)));if(i>=0){T.held={s:1,i,x:p.x,y:p.y};return true}const j=REASONS.findIndex((_,j)=>inR(p,chipR(j,1)));if(j>=0){T.held={s:0,i:j,x:p.x,y:p.y};return true}return false}
  if(v==='reg'){if(T.ri<REG.length&&inR(p,cardR())){T.held={reg:1,x:p.x,y:p.y};return true}const k=[0,1].find(k=>inR(p,regBin(k)));if(k!=null)place(k)}return false}
 function move(p){if(T.drag!=null){const r=dialR(T.drag);T[T.drag?'vol':'pace']=cl((p.x-r.x)/r.w,0,1);voice(rule()[1]);A.redraw();return}if(T.held){T.held.x=p.x;T.held.y=p.y;A.redraw()}}
 function up(p){const v=kind(),h=T.held;if(T.drag!=null){T.drag=null;check();return}if(!h)return;T.held=null;
  if(v==='reply'){const dropped=p.y<Y(.34)||Math.hypot(p.x-h.x,p.y-h.y)<10;if(!dropped)return A.redraw();return h.s?stem(h.i):reason(h.i)}
  if(v==='reg'){const k=[0,1].find(k=>inR(p,regBin(k)));return k!=null?place(k):A.redraw()}}
 A=FK.shell(c,{steps,ratio:.72,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
 A.start()})})();
