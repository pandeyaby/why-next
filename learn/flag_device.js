/* Flagship – figurative language and literary devices (ages 11–14): drag near-synonyms onto a connotation scale, tap the
   word that personifies an object, decode allusions to myths and the Bible, sort irony cards (verbal, situational,
   dramatic, or just bad luck), and pick the analysis sentence that explains an effect instead of only naming a device.
   The Challenge targets the usual slips: treating synonyms as having the same effect, mixing up personification with
   simile, reading an allusion literally, calling bad luck ironic, confusing the kinds of irony, and feature-spotting. */
(()=>{const SETS=[[['slim',0],['thin',1],['scrawny',2]],[['hovel',2],['home',0],['house',1]],[['laughed',1],['cackled',2],['chuckled',0]]],
SENT=[['The old floorboards groaned under his feet.','groaned','floorboards','groan'],['Fear crept slowly up her spine.','crept','Fear','creep'],['All night the city never sleeps.','sleeps','city','sleep']],
ALLU=[['Reading her diary would open Pandora\u2019s box.','Greek myth',[['start a lot of trouble',1],['open a present',0],['find hidden treasure',0]]],
 ['Penalties were his Achilles\u2019 heel.','Greek myth',[['his one weak spot',1],['a sore foot',0],['his best skill',0]]],
 ['The little club beat the giants: David beat Goliath.','the Bible',[['the weak one beat the strong one',1],['two people fought',0],['the strong one won easily',0]]]],
CARDS=[['Soaked to the skin, Ali grins: \u201cLovely weather!\u201d',0],['The fire station burns down.',1],['We know the killer is upstairs. She goes up to look.',2],['It rains on the day of the picnic.',3]],
BINS=['Verbal irony','Situational irony','Dramatic irony','Not irony: bad luck'],ZONES=['Positive','Neutral','Negative'],
EFF=[['\u201cThe classroom was a zoo.\u201d',[['The metaphor suggests the class was wild, noisy and out of control.',1],['This is a metaphor.',0],['There were animals in the classroom.',0]]],
 ['\u201cThe wind clawed at the windows.\u201d',[['Clawed makes the wind seem like a vicious animal, so the storm feels threatening.',1],['This uses personification.',0],['The wind had claws.',0]]],
 ['\u201cIt was his Waterloo.\u201d',[['The allusion to Napoleon\u2019s defeat suggests a final, crushing loss.',1],['This is an allusion.',0],['He went to Waterloo station.',0]]]];
VIS.reg('flagdevice',c=>{let A,ctl,chal,qi=-1,streak=0;
const S={};
const view=()=>['conn','pers','allu','irony','eff','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1:1.15));
const font=(n,wt)=>`${wt||700} ${px(n)}px system-ui,sans-serif`;
function word(g,s,x,y,n,wt,mw){g.font=font(n,wt);g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,mw||A.W-10)}
/* centred text wrapped to width w; returns the number of lines */
function wrap(g,s,x,y,w,n,wt){g.font=font(n,wt);const ws=s.split(' '),L=[];let cur='';ws.forEach(t=>{const tr=cur?cur+' '+t:t;if(g.measureText(tr).width>w&&cur){L.push(cur);cur=t}else cur=tr});L.push(cur);
 const lh=px(n)*1.3;L.forEach((l,i)=>word(g,l,x,y+(i-(L.length-1)/2)*lh,n,wt,w));return L.length}
function box(g,r,col,a,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=warn?4:2;g.strokeStyle=warn?A.col.rd:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const zoneR=k=>{const w=(A.W-40)/3;return{x:10+k*(w+10),y:A.H*.14,w,h:A.H*.44}};
const chipR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.7,w,h:A.H*.13}};
const rowR=i=>({x:10,y:A.H*(.4+i*.19),w:A.W-20,h:A.H*.16});
const binR=k=>{const w=(A.W-30)/2;return{x:10+(k%2)*(w+10),y:A.H*(.46+Math.floor(k/2)*.26),w,h:A.H*.22}};
const cardR=()=>({x:A.W*.08,y:A.H*.07,w:A.W*.84,h:A.H*.3});
/* lay the sentence out word by word so each word can be tapped */
function layout(g,s){g.font=font(17,700);const ws=s.split(' '),out=[],sp=g.measureText(' ').width,maxW=A.W-40,lh=px(17)*2.1;let x=0,row=0;
 ws.forEach(t=>{const w=g.measureText(t).width+14;if(x+w>maxW&&x>0){row++;x=0}out.push({t,clean:t.replace(/[^A-Za-z']/g,''),x,row,w});x+=w+sp});
 const rows=row+1;out.forEach(o=>{const rw=out.filter(q=>q.row===o.row).reduce((m,q)=>Math.max(m,q.x+q.w),0);o.x+=(A.W-rw)/2;o.y=A.H*.32+(o.row-(rows-1)/2)*lh-px(17)*.9;o.h=px(17)*1.8});return out}
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'Name the device, then explain the effect',W/2,H*.3,15,800);word(g,'Connotation: the feeling a word carries',W/2,H*.5,13,700);word(g,'Irony: the opposite of what is said or expected',W/2,H*.7,13,700);return}
 if(v==='conn'){const k=Math.min(S.round,SETS.length-1),set=SETS[k];ZONES.forEach((z,i)=>{const r=zoneR(i);box(g,r,[C.gr,C.cy,C.rd][i],.1,false);word(g,z,r.x+r.w/2,r.y+px(14),13,800,r.w-6)});
  set.forEach(([w,c],i)=>{const at=S.round>=SETS.length?c:S.placed[i],r=at!=null?{...zoneR(at),y:zoneR(at).y+zoneR(at).h*.4,h:zoneR(at).h*.35}:chipR(i);if(S.drag&&S.drag.i===i)return;box(g,r,C.vi,at!=null?.28:.14,S.oops===i);word(g,w,r.x+r.w/2,r.y+r.h/2,15,800,r.w-6)});
  if(S.drag){const r=chipR(S.drag.i);box(g,{x:S.drag.x-r.w/2,y:S.drag.y-r.h/2,w:r.w,h:r.h},C.vi,.3,false);word(g,set[S.drag.i][0],S.drag.x,S.drag.y,15,800,r.w-6)}
  word(g,S.round<SETS.length?'Same meaning, different feeling. Drag each word to its zone.':'All 3 sets placed!',W/2,H*.06,12,800);word(g,`Set ${Math.min(S.round+1,3)} of 3`,W/2,H*.93,11,600)}
 if(v==='pers'){const k=Math.min(S.round,SENT.length-1);S.words=layout(g,SENT[k][0]);
  S.words.forEach((o,i)=>{const r={x:o.x,y:o.y,w:o.w,h:o.h};box(g,r,S.found===i?C.gr:C.vi,S.found===i?.35:.08,S.oops===i);g.font=font(17,700);word(g,o.t,o.x+o.w/2,o.y+o.h/2,17,700)});
  word(g,S.round<SENT.length?'Tap the word that gives a thing a human action.':'All 3 found!',W/2,H*.06,12,800);
  word(g,'Personification: a thing acts or feels like a person.',W/2,H*.72,12,700);word(g,`Sentence ${Math.min(S.round+1,3)} of 3`,W/2,H*.9,11,600)}
 if(v==='allu'){const k=Math.min(S.round,ALLU.length-1),[s,src,ops]=ALLU[k];wrap(g,s,W/2,H*.13,W-30,15,800);word(g,`An allusion to ${src}. It means…`,W/2,H*.29,12,700);
  if(S.round<ALLU.length)alluOpts().forEach(([o],i)=>{const r=rowR(i);box(g,r,C.cy,.12,S.oops===o);word(g,o,r.x+r.w/2,r.y+r.h/2,14,800,r.w-10)});else word(g,'All 3 allusions decoded!',W/2,H*.55,15,800)}
 if(v==='irony'){BINS.forEach((b,k)=>{const r=binR(k);box(g,r,[C.or,C.cy,C.vi,C.mu][k],.1,S.oops===k);word(g,b,r.x+r.w/2,r.y+r.h*.3,13,800,r.w-8);word(g,`${S.sorted.filter(x=>x===k).length?'1 card':''}`,r.x+r.w/2,r.y+r.h*.7,11,700)});
  if(S.round<CARDS.length){const r=cardR(),d=S.drag,cx=d?d.x:r.x+r.w/2,cy=d?d.y:r.y+r.h/2;box(g,{x:cx-r.w/2,y:cy-r.h/2,w:r.w,h:r.h},C.am,.18,false);wrap(g,CARDS[S.round][0],cx,cy,r.w-20,14,700)}
  else word(g,'All 4 cards sorted!',W/2,H*.22,15,800);word(g,`Card ${Math.min(S.round+1,4)} of 4. Drag it to a box, or tap a box.`,W/2,H*.41,11,700)}
 if(v==='eff'){const k=Math.min(S.round,EFF.length-1),[q,ops]=EFF[k];word(g,q,W/2,H*.12,16,800);word(g,'Which sentence explains the EFFECT best?',W/2,H*.25,12,700);
  if(S.round<EFF.length)effOpts().forEach(([o],i)=>{const r=rowR(i);box(g,r,C.gr,.1,S.oops===o);wrap(g,o,r.x+r.w/2,r.y+r.h/2,r.w-16,12,700)});else word(g,'All 3 effects explained!',W/2,H*.55,15,800)}
 A.fx.draw(g)}
const alluOpts=()=>{const ops=ALLU[S.round][2],r=S.round%3;return ops.slice(r).concat(ops.slice(0,r))};
const effOpts=()=>{const ops=EFF[S.round][1],r=S.round%3;return ops.slice(r).concat(ops.slice(0,r))};
const bad=(t,mark)=>{S.oops=mark;A.sound.miss();tell(t);A.redraw()},good=t=>{S.oops=null;A.sound.pop();tell(t);pad();A.redraw();S.want()};
/* step 0 */
function place(i,z){if(S.round>=SETS.length)return;const[w,want]=SETS[S.round][i];
 if(z!==want){const tone=['kind or admiring','plain, with no strong feeling','unkind or scornful'];return bad(`\u201c${w}\u201d is not ${ZONES[z].toLowerCase()}. It sounds ${tone[want]}.`,i)}
 S.placed[i]=z;S.oops=null;A.sound.tick();if(Object.keys(S.placed).length<3){tell(`\u201c${w}\u201d goes in ${ZONES[z]}.`);pad();return A.redraw()}
 const set=SETS[S.round];S.round++;S.placed={};good(`Yes! ${set.slice().sort((a,b)=>a[1]-b[1]).map(x=>x[0]).join(', ')}: same meaning, from kind to unkind.`)}
/* step 1 */
function tapWord(i){if(S.round>=SENT.length)return;const[s,ans,thing,base]=SENT[S.round],o={clean:(s.split(' ')[i]||'').replace(/[^A-Za-z']/g,'')};if(!o.clean)return;
 if(o.clean===thing)return bad(`\u201c${thing}\u201d is the thing being made human. Which word gives it a human action?`,i);
 if(o.clean!==ans)return bad(`\u201c${o.clean}\u201d is literal here. Look for something only a person could do.`,i);
 S.found=i;A.redraw();setTimeout(()=>{S.found=null;S.round++;good(`Yes! ${thing[0].toUpperCase()+thing.slice(1)} cannot really ${base}. \u201c${ans}\u201d gives it a human action.`)},A.reduced()?10:500)}
/* step 2 */
function pickAllu(o){if(S.round>=ALLU.length)return;const ok=ALLU[S.round][2].find(x=>x[0]===o)[1];
 if(!ok)return bad(o.includes('foot')||o.includes('present')||o.includes('fought')?'That reads the allusion literally. Think about what happens in the story.':'That is the opposite of the story. Think about how it ends.',o);
 S.round++;good(`Yes! The story behind it adds that meaning in just a few words.`)}
/* step 3 */
function sortCard(k){if(S.round>=CARDS.length)return;const[t,want]=CARDS[S.round];
 if(k!==want){const m=['Verbal irony is saying the opposite of what you mean.','Situational irony is when the result is the opposite of what you expect.','Dramatic irony is when the audience knows something a character does not.','Bad luck is not irony unless the outcome is the opposite of what was expected.'];return bad(m[k]+' Try another box.',k)}
 S.sorted.push(k);S.round++;good(['Yes! She says lovely but means awful.','Yes! A fire station should be the last place to burn.','Yes! We know, she does not.','Yes! Rain on a picnic is bad luck, not irony.'][want])}
/* step 4 */
function pickEff(o){if(S.round>=EFF.length)return;const ok=EFF[S.round][1].find(x=>x[0]===o)[1];
 if(!ok)return bad(/^This (is|uses)/.test(o)?'That only names the device. Say what it suggests and how it makes the reader feel.':'That reads it literally. The writer means something beyond the words.',o);
 S.round++;good('Yes! It names the device and explains the effect on the reader.')}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='conn'&&S.round<SETS.length){const i=SETS[S.round].findIndex((_,j)=>S.placed[j]==null);if(i>=0){const w=SETS[S.round][i][0];ZONES.forEach((z,k)=>B(`${w} \u2192 ${z}`,()=>place(i,k),`Put ${w} in ${z}`))}}
 if(v==='pers'&&S.round<SENT.length){const ws=SENT[S.round][0].split(' ');ws.forEach((w,i)=>B(w.replace(/[^A-Za-z']/g,''),()=>tapWord(i),`Pick the word ${w.replace(/[^A-Za-z']/g,'')}`))}
 if(v==='allu'&&S.round<ALLU.length)alluOpts().forEach(([o])=>B(o,()=>pickAllu(o),`It means ${o}`));
 if(v==='irony'&&S.round<CARDS.length)BINS.forEach((b,k)=>B(b,()=>sortCard(k),`Put the card in ${b}`));
 if(v==='eff'&&S.round<EFF.length)effOpts().forEach(([o],i)=>B('Sentence '+(i+1),()=>pickEff(o),`Sentence ${i+1}: ${o}`))}
function down(p){const v=view();
 if(v==='conn'&&S.round<SETS.length){for(let i=0;i<3;i++)if(S.placed[i]==null&&hit(p,chipR(i))){S.drag={i,x:p.x,y:p.y};A.redraw();return true}return false}
 if(v==='pers'){S.words.forEach((o,i)=>{if(hit(p,{x:o.x,y:o.y,w:o.w,h:o.h}))tapWord(i)});return false}
 if(v==='allu'&&S.round<ALLU.length){alluOpts().forEach(([o],i)=>{if(hit(p,rowR(i)))pickAllu(o)});return false}
 if(v==='irony'&&S.round<CARDS.length){if(hit(p,cardR())){S.drag={x:p.x,y:p.y};return true}for(let k=0;k<4;k++)if(hit(p,binR(k)))sortCard(k);return false}
 if(v==='eff'&&S.round<EFF.length){effOpts().forEach(([o],i)=>{if(hit(p,rowR(i)))pickEff(o)});return false}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const v=view();
 if(v==='conn'){const z=[0,1,2].find(k=>hit(p,zoneR(k)));if(z!=null)place(d.i,z);else{tell('Drop the word inside a zone.');A.redraw()}}
 if(v==='irony'){const k=[0,1,2,3].find(k=>hit(p,binR(k)));if(k!=null)sortCard(k);else A.redraw()}}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*40+40:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},round:0,oops:null,placed:{},words:[],found:null,sorted:[],drag:null})};
const steps=[
{h:'Words carry feelings',p:'Slim, thin and scrawny all mean not fat. But each carries a different feeling: its connotation. Writers pick words for that feeling.',predict:{q:'Slim and scrawny mean the same thing. Do they have the same effect?',opts:['No, scrawny sounds unkind','Yes, same meaning, same effect'],ans:0},task:'Place 3 sets of words',
 show:()=>{steps[0].go();const acts=[];SETS.forEach(set=>set.forEach((_,i)=>acts.push(()=>place(i,SETS[S.round][i][1]))));play(acts,300)},
 go:()=>{reset();tell('Drag slim, thin and scrawny onto the scale.');pad();S.want=check(0,()=>S.round>=SETS.length,'Writers choose words for their connotations, not just their meaning.')}},
{h:'Personification',p:'Personification gives a thing a human action or feeling. Find the word that does it.',task:'Find it in 3 sentences',
 show:()=>{steps[1].go();play(SENT.map(([s,ans])=>()=>tapWord(s.split(' ').findIndex(w=>w.replace(/[^A-Za-z']/g,'')===ans))),800)},
 go:()=>{reset();tell(SENT[0][0]+' Tap the word that gives a thing a human action.');pad();S.want=check(1,()=>S.round>=SENT.length,'Groaned, crept and sleeps make things seem alive.')}},
{h:'Allusion',p:'An allusion points to a story readers already know, from a myth, the Bible or another book. The story brings its meaning along.',predict:{q:'\u201cIt would open Pandora\u2019s box.\u201d This means it would…',opts:['start a lot of trouble','open a present','find hidden treasure'],ans:0},task:'Decode 3 allusions',
 show:()=>{steps[2].go();play(ALLU.map(([,,ops])=>()=>pickAllu(ops.find(x=>x[1])[0])),700)},
 go:()=>{reset();tell(ALLU[0][0]+' What does it mean?');pad();S.want=check(2,()=>S.round>=ALLU.length,'Pandora let out every trouble, Achilles had one weak heel, little David beat the giant.')}},
{h:'Irony or bad luck?',p:'Irony is a gap between what is said or expected and what is real. Sort each card into the right box.',predict:{q:'It rains on the day of the picnic. Is that irony?',opts:['No, it is just bad luck','Yes, it is ironic'],ans:0},task:'Sort 4 cards',
 show:()=>{steps[3].go();play(CARDS.map(([,k])=>()=>sortCard(k)),600)},
 go:()=>{reset();tell('Card: '+CARDS[0][0]);pad();S.want=check(3,()=>S.round>=CARDS.length,'Verbal, situational, dramatic, and plain bad luck.')}},
{h:'Explain the effect',p:'Naming a device is only the start. A strong answer says what it suggests and how it makes the reader feel.',task:'Pick the best analysis 3 times',
 show:()=>{steps[4].go();play(EFF.map(()=>()=>pickEff(EFF[S.round][1].find(x=>x[1])[0])),700)},
 go:()=>{reset();tell(EFF[0][0]+' Which sentence explains the effect best?');pad();S.want=check(4,()=>S.round>=EFF.length,'Device + what it suggests + effect on the reader.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which word has the most negative connotation?',[['scrawny','ok'],['slim','pos'],['thin','neut']]],
 ['\u201cThe sun smiled down on the fields.\u201d Which device is this?',[['personification','ok'],['simile','simile'],['allusion','allu']]],
 ['\u201cThe final was his Waterloo.\u201d What does the allusion suggest?',[['a crushing, final defeat','ok'],['a trip to Belgium','lit'],['a great victory','rev']]],
 ['A traffic warden gets a parking ticket. What is this?',[['situational irony','ok'],['verbal irony','verbal'],['just bad luck','luck']]],
 ['Best way to write about \u201cThe classroom was a zoo\u201d?',[['The metaphor suggests the class was wild and out of control','ok'],['It is a metaphor','spot'],['There were animals in the room','lit']]],
 ['The audience knows the letter is fake. The hero believes it. This is…',[['dramatic irony','ok'],['situational irony','sit'],['verbal irony','verbal']]]];
function hintFor(t){let m='Name the device, then explain what it suggests and how it makes the reader feel.';
 if(t==='pos')m='Slim sounds admiring. Scrawny suggests too thin and weak, so it is the most negative.';
 if(t==='neut')m='Thin is plain, with no strong feeling. Scrawny adds a sneer.';
 if(t==='simile')m='A simile compares using like or as. Here the sun is given a human action, smiling: personification.';
 if(t==='allu')m='An allusion points to a known story. Here a thing simply acts like a person: personification.';
 if(t==='lit')m='That reads it literally. The writer means something beyond the words.';
 if(t==='rev')m='Napoleon lost at Waterloo. The allusion means a final defeat, not a win.';
 if(t==='verbal')m='Verbal irony is saying the opposite of what you mean. Here nobody is speaking: look at what happens.';
 if(t==='luck')m='It is more than bad luck. The person who hands out tickets getting one is the opposite of what you expect.';
 if(t==='spot')m='That only names the device. Add what it suggests and its effect on the reader.';
 if(t==='sit')m='Situational irony is an unexpected outcome. Here we know something the hero does not: dramatic irony.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+streak+'.':'✗ '+hintFor(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pad()}});
A.start()})})();
