/* Flagship – talking about writers' methods precisely (ages 14–16): tap the words that build a semantic field of war
   over a kitchen scene; tag marked points in a quatrain as caesura, enjambment or end-stopped; sort lines by sibilance
   (hissing s/sh/z SOUNDS, not the letter s, and not plosive alliteration); name the structural method each clue on a
   story timeline shows (juxtaposition, foreshadowing, motif); then build a method + evidence + effect sentence where
   vague or literal options are rejected. Challenge: choose the most precise term or the strongest analysis. */
(()=>{
const PASSAGE='The kitchen was a battlefield: pans clashed, the kettle sounded the alarm, and Mum marched past troops of plates.'.split(' ');
const WAR=[4,6,11,14,16];
const POEM=['The tide pulled back. The empty shore','lay flat as glass beneath the sky.','No wind. No gull. Only the roar','of water, waiting to reply.'];
const SPOTS=[[0,'The tide pulled back.',0],[0,null,1],[1,null,2],[2,'No wind.',0]],TAGS=['Caesura','Enjambment','End-stopped'];
const TAGWHY=[['','The full stop sits in the middle of the line, so the line pauses inside itself: a caesura.','A full stop mid-line is a caesura; end-stopping is a pause at the END of a line.'],
 ['There is no punctuation at the end of this line; the sentence runs on into the next: enjambment.','','This line ends with no punctuation, so it is not end-stopped: the sense spills over.'],
 ['A caesura is a pause inside a line. This pause comes at the end, after the full stop.','The full stop closes the sentence at the line end, so nothing runs on.','']];
const SIB=[['The sea sighed softly on the stones.',1],['Big bold bells boomed.',0,'That repeats a “b” sound: plosive alliteration. Sibilance is only hissing s, sh and z sounds.'],['Ships slid past in silence.',1],['The cold wind howled.',0,'No hissing sounds repeat here. The effect comes from the long “ow” vowel.'],['Sure, she wished for shelter.',1]];
const SCENES=[['🪞🧣','A mirror cracks. A red scarf hangs by the door.'],['🎉🧒','A feast inside. A hungry boy at the gate.'],['🌊🧣','The red scarf blows into the river.'],['❄️','Winter. The house goes quiet.'],['⚰️🧣','Grandad dies. The scarf is found on his coat.']];
const CLUES=[['Scene 2 sets a feast right beside a starving child.',[1],0],['The cracked mirror in Scene 1 hints at the death in Scene 5.',[0,4],1],['The red scarf returns in Scenes 1, 3 and 5.',[0,2,4],2]];
const TERMS=['Juxtaposition','Foreshadowing','Motif'];
const SLOTS=[['Method',[['a semantic field of war',1],['imagery',0,'“Imagery” is true but too broad: which kind? Name the most precise term.'],['sibilance',0,'There is no run of hissing sounds here; the method is the cluster of war words.']]],
 ['Evidence',[['“Mum marched past troops of plates”',1],['the whole paragraph',0,'Pointing at the whole paragraph gives no evidence. Quote the exact words.']]],
 ['Effect',[['turns the kitchen into a tense battle, Mum its weary general',1],['makes it more interesting',0,'“More interesting” could describe any method. Say what the reader sees or feels.'],['shows there is a real war',0,'That is too literal: the kitchen is not at war. The war words are a metaphor for chaos.']]]];
VIS.reg('flagmethod',c=>{let A,ctl,chal,ask=-1,streak=0;
const S={id:0,want:()=>{},on:[],err:-1,tag:[],cur:0,hold:null,pos:[],sib:0,put:[],clue:0,named:[],slot:0,pick:[],flash:''};
const stage=()=>['field','lines','sound','structure','build','quiz'][A.step];
const note=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const em=n=>Math.round(n*(A.narrow?1:1.15));
function put(g,t,x,y,n,k,w,al,mw){g.font=`${w||600} ${em(n)}px Georgia,serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=k||A.col.tx;g.fillText(t,x,y,mw||A.W-16)}
function sans(g,t,x,y,n,k,w){g.font=`${w||700} ${em(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=k||A.col.tx;g.fillText(t,x,y,A.W-12)}
function pill(g,r,f,e,lw){g.fillStyle=f;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=lw||1.5;g.strokeStyle=e;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke()}
const within=(p,r)=>p&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function flow(g){const out=[],gap=em(7),lh=em(34);let x=10,y=A.H*.08;g.font=`600 ${em(14)}px Georgia,serif`;
 PASSAGE.forEach(w=>{const ww=g.measureText(w).width+em(12);if(x+ww>A.W-10){x=10;y+=lh}out.push({x,y,w:ww,h:lh-gap});x+=ww+gap});return out}
const chip=(i,n)=>{const w=(A.W-12-(n-1)*8)/n;return{x:6+i*(w+8),y:A.H*.84,w,h:A.H*.12}};
const scene=i=>{const w=(A.W-12)/5;return{x:6+i*w,y:A.H*.3,w:w-6,h:A.H*.4}};
const row=i=>({x:A.W*.04,y:A.H*(.06+i*.115),w:A.W*.92,h:A.H*.1}),tray=i=>({x:6+i*A.W/2,y:A.H*.66,w:A.W/2-12,h:A.H*.3});
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.06:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){sans(g,'Name the method precisely.',W/2,H*.38,16,C.tx,800);sans(g,'Then explain its effect.',W/2,H*.54,16,C.tx,800);return}
 if(v==='field'){S.pos=flow(g);S.pos.forEach((r,i)=>{const on=S.on.includes(i);pill(g,r,A.alpha(on?C.rd:C.cy,on?.24:.07),S.err===i?C.rd:A.alpha(C.tx,.4),S.err===i||on?3:1);put(g,PASSAGE[i],r.x+r.w/2,r.y+r.h/2,14,C.tx,on?800:500)});
  sans(g,`War words found: ${S.on.length} of 5`,W/2,H*.82,12,C.tx,700);if(S.on.length>=5)sans(g,'A domestic scene described as combat',W/2,H*.92,12,C.tx,600)}
 if(v==='lines'){const x0=W*.05,lh=H*.13;g.font=`600 ${em(15)}px Georgia,serif`;S.pos=SPOTS.map(([l,pre])=>{const t=pre||POEM[l];return{x:x0+g.measureText(t).width+em(6),y:H*.1+l*lh}});
  POEM.forEach((t,i)=>put(g,t,x0,H*.1+i*lh,15,C.tx,500,'left'));
  S.pos.forEach((p,i)=>{const done=S.tag[i]!=null,cur=i===S.cur;g.fillStyle=done?A.alpha(C.gr,.9):cur?C.vi:A.alpha(C.tx,.3);g.beginPath();g.arc(p.x,p.y-em(14),em(9),0,7);g.fill();
   sans(g,String(i+1),p.x,p.y-em(14),10,'#fff',800);if(done)sans(g,TAGS[S.tag[i]],Math.min(W-40,p.x),p.y+em(15),9,C.tx,700)});
  TAGS.forEach((t,i)=>{if(S.hold&&S.hold.i===i)return;const r=chip(i,3);pill(g,r,A.alpha(C.vi,.16),C.tx,2);sans(g,t,r.x+r.w/2,r.y+r.h/2,12)});
  if(S.cur<4)sans(g,`Tag point ${S.cur+1}`,W/2,H*.76,12,C.tx,700);if(S.hold){const r={x:S.hold.x-W*.15,y:S.hold.y-H*.05,w:W*.3,h:H*.1};pill(g,r,A.alpha(C.vi,.35),C.tx,2);sans(g,TAGS[S.hold.i],S.hold.x,S.hold.y,12)}}
 if(v==='sound'){const top={x:W*.06,y:H*.06,w:W*.88,h:H*.2};if(S.sib<SIB.length){const r=S.hold?{...top,x:S.hold.x-top.w/2,y:S.hold.y-top.h/2}:top;pill(g,r,A.alpha(C.or,.22),C.tx,2);put(g,SIB[S.sib][0],r.x+r.w/2,r.y+r.h/2,15,C.tx,600)}else sans(g,'All sorted',W/2,top.y+top.h/2,15,C.gr,800);
  ['🐍 Sibilance','✖ Not sibilance'].forEach((n,i)=>{const r={x:6+i*W/2,y:H*.32,w:W/2-12,h:H*.64};pill(g,r,A.alpha([C.gr,C.cy][i],.1),S.err===i?C.rd:C.tx,S.err===i?3:1.5);sans(g,n,r.x+r.w/2,r.y+em(16),12,C.tx,800);
   S.put.filter(k=>SIB[k][1]===1-i).forEach((k,j)=>put(g,SIB[k][0],r.x+r.w/2,r.y+em(44)+j*em(26),A.narrow?9:11,C.tx,500))})}
 if(v==='structure'){const cl=CLUES[Math.min(S.clue,2)];SCENES.forEach(([e,t],i)=>{const r=scene(i),lit=S.clue<3&&cl[1].includes(i);pill(g,r,A.alpha(lit?C.or:C.cy,lit?.3:.08),lit?C.or:A.alpha(C.tx,.4),lit?3:1.5);
   sans(g,'Scene '+(i+1),r.x+r.w/2,r.y+em(14),A.narrow?9:11,C.tx,800);sans(g,e,r.x+r.w/2,r.y+r.h*.45,A.narrow?16:22)});
  if(S.clue<3){const w=cl[0].split(' '),h=Math.ceil(w.length/2);[w.slice(0,h).join(' '),w.slice(h).join(' ')].forEach((l,k)=>put(g,l,W/2,H*(.1+k*.08),13,C.tx,600))}else sans(g,'Three structural methods named',W/2,H*.14,14,C.gr,800);
sans(g,S.named.map(t=>TERMS[t]).join(' · '),W/2,H*.76,11,C.tx,700);
  TERMS.forEach((t,i)=>{if(S.hold&&S.hold.i===i)return;const r=chip(i,3);pill(g,r,A.alpha(C.vi,.16),C.tx,2);sans(g,t,r.x+r.w/2,r.y+r.h/2,A.narrow?10:12)});
  if(S.hold){const r={x:S.hold.x-W*.16,y:S.hold.y-H*.05,w:W*.32,h:H*.1};pill(g,r,A.alpha(C.vi,.35),C.tx,2);sans(g,TERMS[S.hold.i],S.hold.x,S.hold.y,11)}}
 if(v==='build'){SLOTS.forEach(([n],i)=>{const r=row(i),f=S.pick[i];pill(g,r,A.alpha(f!=null?C.gr:i===S.slot?C.or:C.ln,.18),i===S.slot&&f==null?C.or:C.tx,i===S.slot?3:1.5);
   sans(g,n,r.x+em(36),r.y+r.h/2,10,C.tx,800);put(g,f!=null?SLOTS[i][1][f][0]:'…',r.x+r.w/2+em(30),r.y+r.h/2,A.narrow?10:12,C.tx,600,0,r.w-em(76))});
  if(S.slot<3)SLOTS[S.slot][1].forEach(([t],j)=>{const r={x:A.W*.04,y:A.H*(.44+j*.17),w:A.W*.92,h:A.H*.14};pill(g,r,A.alpha(C.vi,.12),S.err===j?C.rd:C.tx,S.err===j?3:1.5);put(g,t,W/2,r.y+r.h/2,A.narrow?10:12,C.tx,600,0,r.w-10)});
  else{put(g,'Method → evidence → effect.',W/2,H*.52,15,C.gr,700);put(g,'Precise term, exact words, what it does.',W/2,H*.64,12,C.tx,500)}}
 A.fx.draw(g)}
const wrong=t=>{A.sound.miss();note(t);A.redraw()},right=t=>{A.sound.pop();note(t);pads();A.redraw();S.want()};
function tapWord(i){if(S.on.includes(i))return;if(!WAR.includes(i)){S.err=i;const w=PASSAGE[i].replace(/[:,.]/g,'');return wrong(w==='kitchen'||w==='plates'||w==='pans'||w==='kettle'?`“${w}” is the literal kitchen. The semantic field is the war words laid over it.`:`“${w}” does not belong to the language of war.`)}
 S.err=-1;S.on.push(i);right(S.on.length>=5?'battlefield, clashed, alarm, marched, troops: a semantic field of war makes the kitchen feel like combat.':`“${PASSAGE[i].replace(/[:,.]/g,'')}” is a war word.`)}
function tag(k){S.hold=null;if(k<0||S.cur>=4)return A.redraw();const want=SPOTS[S.cur][2];if(k!==want){S.err=S.cur;return wrong(`Point ${S.cur+1}: ${TAGWHY[want][k]}`)}
 S.tag[S.cur]=k;S.cur++;right([`Caesura: the pause inside the line slows the reader.`,`Enjambment: the line spills over, like the tide pulling the sense onward.`,`End-stopped: the full stop at the line end gives a firm halt.`][k])}
function sound(b){S.hold=null;if(S.sib>=SIB.length||b<0)return A.redraw();const[t,s,why]=SIB[S.sib];if(b!==(1-s)){S.err=b;return wrong(s?(/Sure/.test(t)?'Listen, do not look: “Sure”, “she”, “wished” and “shelter” all hiss with a “sh” sound.':`Say it aloud: “${t}” repeats hissing s sounds. That is sibilance.`):why)}
 S.err=-1;S.put.push(S.sib);S.sib++;right(s?`Sibilance: “${t}”`:`Not sibilance: “${t}”`)}
function name(k){S.hold=null;if(k<0||S.clue>=3)return A.redraw();const want=CLUES[S.clue][2];if(k!==want){const m={0:'Juxtaposition places two contrasting things side by side, here and now.',1:'Foreshadowing is an early hint at something that happens later.',2:'A motif is an image that keeps returning through the text.'};return wrong(`Not ${TERMS[k].toLowerCase()}. ${m[k]} Read the clue again.`)}
 S.named.push(k);S.clue++;right([`Juxtaposition: feast beside hunger sharpens the contrast.`,`Foreshadowing: the cracked mirror plants an omen early.`,`Motif: each return of the scarf ties the story together.`][k])}
function fill(j){const s=SLOTS[S.slot];if(!s)return;const o=s[1][j];if(!o)return;if(!o[1]){S.err=j;return wrong(o[2])}S.err=-1;S.pick[S.slot]=j;S.slot++;
 right(S.slot>=3?'The writer uses a semantic field of war in “Mum marched past troops of plates” to turn a busy kitchen into a tense battle.':`${s[0]}: ${o[0]}.`)}
function pads(){if(!ctl)return;ctl.innerHTML='';const v=stage(),K=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='field')PASSAGE.forEach((w,i)=>{if(!S.on.includes(i))K(w.replace(/[:,.]/g,''),()=>tapWord(i),'Mark '+w.replace(/[:,.]/g,''))});
 if(v==='lines'&&S.cur<4)TAGS.forEach((t,k)=>K(`Point ${S.cur+1}: ${t}`,()=>tag(k)));
 if(v==='sound'&&S.sib<SIB.length){K('🐍 Sibilance',()=>sound(0));K('✖ Not sibilance',()=>sound(1))}
 if(v==='structure'&&S.clue<3)TERMS.forEach((t,k)=>K(t,()=>name(k)));
 if(v==='build'&&S.slot<3)SLOTS[S.slot][1].forEach(([t],j)=>K(t,()=>fill(j),`${SLOTS[S.slot][0]}: ${t}`));A.redraw()}
function down(p){const v=stage();
 if(v==='field'){const i=S.pos.findIndex(r=>within(p,r));if(i>=0)tapWord(i);return false}
 if(v==='lines'||v==='structure'){const i=[0,1,2].find(i=>within(p,chip(i,3)));if(i!=null){S.hold={i,x:p.x,y:p.y};return true}return false}
 if(v==='sound'&&S.sib<SIB.length&&p.y<A.H*.28){S.hold={x:p.x,y:p.y};return true}
 if(v==='build'&&S.slot<3){const j=SLOTS[S.slot][1].findIndex((_,j)=>within(p,{x:A.W*.04,y:A.H*(.44+j*.17),w:A.W*.92,h:A.H*.14}));if(j>=0)fill(j)}return false}
function move(p){if(S.hold){S.hold.x=p.x;S.hold.y=p.y;A.redraw()}}
function up(p){const v=stage(),h=S.hold;if(!h)return;
 if(v==='lines'){const s=S.pos[S.cur];return tag(s&&Math.hypot(p.x-s.x,p.y-s.y)<A.W*.25?h.i:-1)}
 if(v==='structure')return name(p.y<A.H*.74?h.i:-1);
 if(v==='sound')return sound(p.y>A.H*.32?(p.x<A.W/2?0:1):-1)}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const run=(fs,ms)=>{const k=++S.id;fs.forEach((fn,j)=>setTimeout(()=>{if(k===S.id)fn()},A.reduced()?j*25+25:(j+1)*ms))};
const fresh=()=>{S.id++;Object.assign(S,{want:()=>{},on:[],err:-1,tag:[],cur:0,hold:null,sib:0,put:[],clue:0,named:[],slot:0,pick:[]})};
const steps=[
{h:'Semantic field',p:'A semantic field is a group of words linked by one theme. Tap every word that belongs to the language of war.',
 predict:{q:'A semantic field is…',opts:['one striking word','a group of words sharing a theme'],ans:1},task:'Find all 5 war words',
 show:()=>{steps[0].go();run(WAR.map(i=>()=>tapWord(i)),420)},go:()=>{fresh();note('Which words in the kitchen scene belong to war?');pads();S.want=fin(0,()=>S.on.length>=5,'One theme, many words: that is a semantic field.')}},
{h:'Caesura or enjambment?',p:'Drag a tag onto the glowing point. Is the pause inside the line, at its end, or does the sense run on?',
 predict:{q:'A full stop in the middle of a line is…',opts:['enjambment','a caesura'],ans:1},task:'Tag all 4 points',
 show:()=>{steps[1].go();run(SPOTS.map(s=>()=>tag(s[2])),480)},go:()=>{fresh();note('Point 1: after “The tide pulled back.”');pads();S.want=fin(1,()=>S.cur>=4,'Caesura pauses inside a line; enjambment runs over its end.')}},
{h:'Sibilance',p:'Sibilance repeats hissing sounds: s, sh, z. Read each line aloud, then drag it into a box.',
 predict:{q:'“Big bold bells boomed.” Is that sibilance?',opts:['Yes, a sound repeats','No, b is not a hissing sound'],ans:1},task:'Sort all 5 lines',
 show:()=>{steps[2].go();run(SIB.map(s=>()=>sound(1-s[1])),420)},go:()=>{fresh();note('The sea sighed softly on the stones. Sibilance?');pads();S.want=fin(2,()=>S.sib>=5,'Listen for the sound, not the letter: “sure” hisses too.')}},
{h:'Structure across a text',p:'Some methods work across a whole story. Drag the right term onto the timeline for each clue.',
 predict:{q:'A red scarf that keeps coming back is…',opts:['foreshadowing','a motif'],ans:1},task:'Name all 3 methods',
 show:()=>{steps[3].go();run(CLUES.map(c=>()=>name(c[2])),520)},go:()=>{fresh();note('Scene 2 sets a feast beside a starving child. Which method?');pads();S.want=fin(3,()=>S.clue>=3,'Juxtaposition contrasts, foreshadowing hints, a motif recurs.')}},
{h:'Name it, then explain it',p:'Build one sentence of analysis: the most precise method, the exact words, and the effect on the reader.',
 predict:{q:'Which earns more credit in an exam answer?',opts:['naming five techniques','explaining one effect well'],ans:1},task:'Build the analysis',
 show:()=>{steps[4].go();run([()=>fill(0),()=>fill(0),()=>fill(0)],520)},go:()=>{fresh();note('Pick the method for the kitchen passage.');pads();S.want=fin(4,()=>S.slot>=3,'Precise term plus effect beats a list of labels.')}},
{h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['“The bell tolled. Silence. Then rain.” The full stops inside the line create…',[['caesurae','ok'],['enjambment','enj'],['sibilance','sib']]],
 ['A sentence that runs past the end of a line into the next is…',[['enjambment','ok'],['a caesura','cae'],['juxtaposition','jux']]],
 ['“wound”, “bleed”, “scar” in a poem about a break-up form…',[['a semantic field of injury','ok'],['a motif','mot'],['foreshadowing','fore']]],
 ['A storm in chapter 1 hints at the shipwreck in chapter 9. This is…',[['foreshadowing','ok'],['juxtaposition','jux2'],['a motif','mot2']]],
 ['Which is the strongest analysis?',[['The sibilance in “silent, soft sea” hushes the line, so the calm feels uneasy.','ok'],['The writer uses sibilance.','label'],['The sibilance makes it more interesting.','vague']]],
 ['A lavish party scene placed straight after a beggar freezing in the snow is…',[['juxtaposition','ok'],['a semantic field','sem'],['enjambment','enj2']]]];
function why(t){let m='Check the definition: what exactly is the writer doing?';
 if(t==='enj')m='Enjambment runs over a line END. Full stops inside a line are caesurae.';
 if(t==='sib')m='Sibilance is repeated hissing sounds. This is about pauses inside the line.';
 if(t==='cae')m='A caesura is a pause inside a line. Running on past the line end is enjambment.';
 if(t==='jux')m='Juxtaposition sets two things side by side. This is about line endings.';
 if(t==='mot')m='A motif recurs across a text. A cluster of linked words in one place is a semantic field.';
 if(t==='fore')m='Foreshadowing hints at later events. These words share one theme: a semantic field.';
 if(t==='jux2')m='Juxtaposition contrasts things placed together. An early hint at a later event is foreshadowing.';
 if(t==='mot2')m='A motif keeps returning. One early hint at a later event is foreshadowing.';
 if(t==='label')m='That only names the technique. Add the exact words and the effect on the reader.';
 if(t==='vague')m='“More interesting” fits any method. Say what this sound does: it hushes, it unsettles.';
 if(t==='sem')m='A semantic field is a group of linked words. Two contrasting scenes side by side are juxtaposition.';
 if(t==='enj2')m='Enjambment is about poetry line breaks. Placing contrasting scenes together is juxtaposition.';
 return m}
function pose(){ask++;const[q,ops]=QS[ask%QS.length],r=ask%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>check(t)});note('Challenge: '+q);A.redraw()}
function check(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Precise. Streak: ${streak}.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pads()}});
A.start()})})();
