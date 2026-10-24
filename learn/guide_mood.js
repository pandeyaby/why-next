/* Why Next? Guide, part 2: an on-device learner model that lets the Guide adapt in real time.
   It watches a few behaviour signals (time on a step, idle time, wrong-answer runs, fast correct streaks, hints, skipped
   lessons, rapid repeated clicks, late-night sessions) and optional mood check-ins, and turns them into one simple state
   with a plain-English reason. The rules are in STATE_RULES below, in priority order, so anyone can read why the Guide
   reacted. The Guide then changes its face, tone and pace, and offers a hint, a simpler explanation, a worked example,
   a break, or a challenge. It offers; it never forces, nags, guilt-trips or counts down.
   The learner can also state requirements (goal, course or exam, time available, style, explanation level, reduced
   motion, larger text), which the whole page follows.
   Privacy: everything stays in this browser (localStorage 'wn_learner'); nothing is sent anywhere. Turning
   "Adapt to how I'm doing" off stops all signal tracking and clears the signals; "Reset" forgets everything. */
const GUIDE_MOOD=(()=>{const KEY='wn_learner',VERSION=1;
const {REACT,FACE_WORD,MOOD_BTN,EXAMS}=GUIDE_COPY;
const STYLES=['balanced','visual','steps','brief'],LEVELS=['auto','kid','adult'],TIMES=[0,5,10,20,45];
const MOODS=['great','ok','stuck','frustrated','bored','tired'];
const STATES=['focused','struggling','frustrated','bored','confident','tired','away'];
const DEF_PROFILE={goal:'',exam:'',time:0,style:'balanced',level:'auto',reducedMotion:false,largerText:false,adapt:true,checkins:true};
const MIN=60e3;
// ---------- stored data (validated on every read: never trust localStorage) ----------
function validProfile(raw){const o=Object.assign({},DEF_PROFILE),r=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{};
 if(typeof r.goal==='string')o.goal=r.goal.trim().slice(0,80);if(EXAMS.includes(r.exam))o.exam=r.exam;if(TIMES.includes(r.time))o.time=r.time;
 if(STYLES.includes(r.style))o.style=r.style;if(LEVELS.includes(r.level))o.level=r.level;
 ['reducedMotion','largerText'].forEach(k=>o[k]=r[k]===true);['adapt','checkins'].forEach(k=>o[k]=r[k]!==false);return o}
const count=v=>Number.isFinite(v)&&v>=0?Math.min(1e6,Math.floor(v)):0;
/* Lifetime tallies shown in the "what I've learned" panel. Each field is checked on its own so one bad value can't wipe the rest. */
function validStats(raw){const r=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{},o={};
 ['right','wrong','hints','skips','sessions','lateSessions','fastStreaks','breaks','examples','challenges'].forEach(k=>o[k]=count(r[k]));
 o.moods=Array.isArray(r.moods)?r.moods.filter(m=>m&&MOODS.includes(m.m)&&Number.isFinite(m.t)).slice(-12).map(m=>({m:m.m,t:m.t})):[];
 o.stepMs=Array.isArray(r.stepMs)?r.stepMs.filter(x=>Number.isFinite(x)&&x>0&&x<36e5).slice(-30):[];
 o.states={};if(r.states&&typeof r.states==='object')STATES.forEach(s=>{if(Number.isFinite(r.states[s]))o.states[s]=count(r.states[s])});return o}
function load(){let raw=null;try{raw=JSON.parse(localStorage.getItem(KEY))}catch(x){}const r=raw&&typeof raw==='object'?raw:{};return{v:VERSION,profile:validProfile(r.profile),stats:validStats(r.stats)}}
let D=load();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(D))}catch(x){}};
// ---------- live session signals (memory only) ----------
const now=()=>Date.now();
let sig=freshSignals(),state={id:'focused',why:'Getting started.'},lastNudge={},clock=0,el=null;
function freshSignals(){const t=now();return{start:t,lastAct:t,stepStart:t,lesson:null,lessonOpenAt:t,touched:false,
 wrongRun:0,rightRun:0,rightTimes:[],wrongTimes:[],hintTimes:[],skipTimes:[],clicks:[],rage:0,selfMood:null,selfAt:0,timeUpSaid:false,breakUntil:0}}
const within=(list,ms)=>list.filter(t=>now()-t<ms).length;
const lateNight=()=>{const h=new Date().getHours();return h>=23||h<5};
const SELF_STATE={great:'confident',ok:'focused',stuck:'struggling',frustrated:'frustrated',bored:'bored',tired:'tired'};
/* The rules, in priority order. The first match wins; each one says in plain words why it fired. */
const STATE_RULES=[
 {id:'frustrated',test:()=>sig.selfMood==='frustrated'&&now()-sig.selfAt<15*MIN,why:()=>'You told me this is frustrating.'},
 {id:'frustrated',test:()=>now()-sig.rage<2*MIN,why:()=>'Lots of quick repeated taps on the same spot.'},
 {id:'frustrated',test:()=>within(sig.wrongTimes,3*MIN)>=4,why:()=>'Several wrong answers in the last few minutes.'},
 {id:'tired',test:()=>sig.selfMood==='tired'&&now()-sig.selfAt<30*MIN,why:()=>'You said you’re tired.'},
 {id:'tired',test:()=>lateNight()&&now()-sig.start>25*MIN,why:()=>'It’s late and you’ve been at it a while.'},
 {id:'struggling',test:()=>sig.selfMood==='stuck'&&now()-sig.selfAt<10*MIN,why:()=>'You said you’re stuck.'},
 {id:'struggling',test:()=>sig.wrongRun>=2,why:()=>`${sig.wrongRun} wrong answers in a row.`},
 {id:'struggling',test:()=>within(sig.hintTimes,4*MIN)>=2,why:()=>'You asked for a couple of hints.'},
 {id:'struggling',test:()=>sig.lesson&&sig.touched&&now()-sig.stepStart>6*MIN&&now()-sig.lastAct<MIN,why:()=>'You’ve been on this step for over 6 minutes.'},
 {id:'away',test:()=>now()-sig.lastAct>3*MIN,why:()=>'No activity for a few minutes.'},
 {id:'bored',test:()=>sig.selfMood==='bored'&&now()-sig.selfAt<10*MIN,why:()=>'You said this is boring.'},
 {id:'bored',test:()=>within(sig.skipTimes,5*MIN)>=2,why:()=>'You skipped through a few lessons quickly.'},
 {id:'confident',test:()=>sig.selfMood==='great'&&now()-sig.selfAt<10*MIN,why:()=>'You said it’s going well.'},
 {id:'confident',test:()=>sig.rightRun>=3&&fastStreak(),why:()=>`${sig.rightRun} right in a row, quickly, without hints.`},
 {id:'focused',test:()=>true,why:()=>sig.lesson?'Working steadily.':'Exploring the map.'}];
/* A fast streak: the last three right answers came within 45 s of each other, with no hint in between. */
function fastStreak(){const r=sig.rightTimes.slice(-3);return r.length===3&&r[2]-r[0]<90e3&&!sig.hintTimes.some(t=>t>r[0])}
function infer(){const rule=STATE_RULES.find(r=>r.test());return{id:rule.id,why:rule.why()}}
// ---------- how the Guide changes with the state ----------
const pick=a=>a[Math.floor(Math.random()*a.length)];
const G=()=>typeof GUIDE!=='undefined'?GUIDE:null;
/* Re-infer the state; on a change, update the face and (at most once every 2 minutes per state) offer help. */
function update(){if(!D.profile.adapt){setState({id:'focused',why:'Adapting is off.'});return}
 const next=infer();const changed=next.id!==state.id;setState(next);timeCheck();
 if(changed){D.stats.states[next.id]=(D.stats.states[next.id]||0)+1;save();react(next.id)}}
function setState(s){state=s;const g=G(),root=g&&g.el(),fab=document.getElementById('gdFab');
 [root,fab].forEach(x=>{if(x)x.dataset.mood=s.id});if(el){el.querySelector('.gm-state').textContent=FACE_WORD[s.id];el.querySelector('.gm-why').textContent=s.why}}
function react(id){const r=REACT[id];if(!r||!r.say.length)return;if(now()-(lastNudge[id]||0)<2*MIN)return;lastNudge[id]=now();
 const g=G();if(!g)return;if(!g.isOpen()){g.pulse();return}g.say(pick(r.say));offer(r.offer)}
/* Quick-reply buttons under a Guide message. */
function offer(labels){const g=G(),root=g&&g.el();if(!root||!labels.length)return;const log=root.querySelector('.gd-log'),row=document.createElement('div');row.className='gm-offer';
 labels.forEach(l=>{const b=document.createElement('button');b.type='button';b.className='gd-chip';b.textContent=l;b.onclick=()=>{row.remove();g.ask(l)};row.append(b)});log.append(row);log.scrollTop=log.scrollHeight}
/* The learner's own time budget: one gentle note when it's used up, never a countdown. */
function timeCheck(){const t=D.profile.time;if(!t||sig.timeUpSaid||now()-sig.start<t*MIN)return;sig.timeUpSaid=true;const g=G();
 if(g&&g.isOpen()){g.say(`That’s the ${t} minutes you planned. A good place to stop, or carry on if you’re enjoying it.`);offer(['Key idea'])}else g&&g.pulse()}
// ---------- reshaping the Guide's words ----------
const sentences=t=>String(t).split(/(?<=[.!?])\s+/).filter(Boolean);
function shape(out,kind,raw){const p=D.profile,st=D.profile.adapt?state.id:'focused';if(kind!=='hint'&&kind!=='explain')return out;
 if(p.style==='brief')return sentences(out).slice(0,kind==='explain'?2:1).join(' ');
 if(p.style==='steps'&&kind==='explain'){const s=sentences(out);if(s.length>1)return s.map((x,i)=>`${i+1}. ${x}`).join(' ')}
 if(p.style==='visual'&&kind==='explain'&&document.querySelector('#detail .vis'))out+=' Try it in the interactive picture in the lesson: seeing it move helps.';
 if(st==='frustrated'||st==='struggling')return sentences(out).slice(0,2).join(' ');return out}
const paceFactor=()=>!D.profile.adapt?1:state.id==='frustrated'||state.id==='struggling'||state.id==='tired'?.9:state.id==='confident'||state.id==='bored'?1.1:1;
const level=()=>D.profile.level==='auto'?null:D.profile.level;
// ---------- typed or spoken mood check-ins and the "break / skip" requests ----------
const MOOD_WORDS=[['frustrated',/frustrat|annoy|angry|hate this|ugh+|argh/],['tired',/tired|sleepy|exhausted|knackered/],['bored',/bor(ed|ing)|too easy|dull/],['stuck',/i.?m (stuck|lost|confused)|no idea/],['great',/(feel|feeling|going) (good|great)|i.?m (good|great)|easy peasy/],['ok',/^(i.?m )?(ok|okay|fine|alright)[.!]?$/]];
function onText(text){const t=text.toLowerCase();
 if(/^take a break$|^break$|need a break/.test(t))return takeBreak();
 if(/skip ahead|next topic please|skip this/.test(t))return skipAhead();
 if(/^key idea$/.test(t))return null;
 for(const[m,re]of MOOD_WORDS)if(re.test(t)&&t.length<60)return checkIn(m,true);return null}
function checkIn(m,typed){if(!MOODS.includes(m))return null;D.stats.moods.push({m,t:now()});D.stats.moods=D.stats.moods.slice(-12);save();
 if(D.profile.adapt){sig.selfMood=m;sig.selfAt=now();lastNudge={};update()}
 const reply=GUIDE_COPY.CHECKIN_REPLY[m];
 setTimeout(()=>offer((REACT[SELF_STATE[m]]||{}).offer||[]),0);return reply}
function takeBreak(){D.stats.breaks++;save();sig.breakUntil=now()+5*MIN;sig.wrongRun=0;sig.wrongTimes=[];sig.rage=0;
 return 'Good call. Stand up, stretch, get some water. Your progress is saved, so come back whenever you like.'}
function skipAhead(){const nx=typeof LEARN!=='undefined'&&LEARN.nextList?LEARN.nextList(3).filter(x=>x.id!==sig.lesson):[];if(!nx.length)return 'Pick a goal on the map and I’ll suggest where to jump to.';
 setTimeout(()=>{const g=G(),root=g&&g.el();if(!root)return;const log=root.querySelector('.gd-log'),row=document.createElement('div');row.className='gm-offer';
  const b=document.createElement('button');b.type='button';b.className='gd-chip';b.textContent='Open “'+nx[0].n+'”';b.onclick=()=>{row.remove();if(typeof select==='function')select(nx[0].id)};row.append(b);log.append(row);log.scrollTop=log.scrollHeight},0);
 return `Ready to move on? A good next step is “${nx[0].n}”.`}
// ---------- the panel inside the Guide ----------
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function panelHtml(){const p=D.profile,o=(a,v,lab)=>a.map(x=>`<option value="${esc(x)}"${x===v?' selected':''}>${esc(lab?lab(x):x)}</option>`).join('');
 return `<div class="gm-now" aria-live="polite"><span class="gm-dot" aria-hidden="true"></span><b class="gm-state"></b> <span class="gm-why"></span></div>
 <div class="gm-check" role="group" aria-label="How’s this feeling?"${p.checkins?'':' hidden'}><span>How’s this feeling?</span>${MOODS.map(m=>`<button type="button" class="gm-mood" data-mood="${m}">${MOOD_BTN[m]}</button>`).join('')}</div>
 <details class="gd-set gm-you"><summary>🎯 About me</summary><div class="gd-grid">
 <label>My goal <input name="goal" maxlength="80" placeholder="e.g. pass my maths mock" value="${esc(p.goal)}"></label>
 <label>Course or exam <select name="exam">${o(EXAMS,p.exam,x=>x||'Not set')}</select></label>
 <label>Time today <select name="time">${o(TIMES.map(String),String(p.time),x=>x==='0'?'No limit':x+' min')}</select></label>
 <label>I like <select name="style">${o(STYLES,p.style,x=>({balanced:'A mix',visual:'Pictures and visuals',steps:'Step by step',brief:'Short and to the point'}[x]))}</select></label>
 <label>Explanations <select name="level">${o(LEVELS,p.level,x=>({auto:'Match my age',kid:'Simpler',adult:'Fuller'}[x]))}</select></label>
 <label class="gd-chk"><input type="checkbox" name="reducedMotion"${p.reducedMotion?' checked':''}> Reduce motion</label>
 <label class="gd-chk"><input type="checkbox" name="largerText"${p.largerText?' checked':''}> Larger text</label>
 <label class="gd-chk"><input type="checkbox" name="adapt"${p.adapt?' checked':''}> Adapt to how I’m doing</label>
 <label class="gd-chk"><input type="checkbox" name="checkins"${p.checkins?' checked':''}> Show mood check-ins</label></div></details>
 <details class="gd-set gm-learned"><summary>🔍 What I’ve learned about you</summary><div class="gm-list"></div>
 <p class="gm-priv">This stays on this device. Nothing is sent anywhere.</p><button type="button" class="gd-chip gm-reset">Forget everything</button></details>`}
const TIMEFMT=ms=>ms<MIN?Math.round(ms/1e3)+' s':Math.round(ms/MIN)+' min';
/* Plain-English list of everything stored or inferred, so nothing about the learner is hidden from them. */
function learnedItems(){const p=D.profile,s=D.stats,out=[];
 out.push(`Right now: ${FACE_WORD[state.id].toLowerCase()}, because: ${state.why}`);
 if(p.goal)out.push(`Your goal: “${p.goal}”.`);if(p.exam)out.push(`Course or exam: ${p.exam}.`);
 if(p.time)out.push(`You planned ${p.time} minutes a session.`);if(p.style!=='balanced')out.push(`You prefer: ${({visual:'pictures and visuals',steps:'step-by-step',brief:'short answers'})[p.style]}.`);
 if(p.level!=='auto')out.push(`Explanations: ${p.level==='kid'?'simpler':'fuller'}.`);if(p.reducedMotion)out.push('Reduced motion is on.');if(p.largerText)out.push('Larger text is on.');
 if(s.right+s.wrong)out.push(`Answers checked: ${s.right} right, ${s.wrong} not yet.`);if(s.hints)out.push(`Hints asked for: ${s.hints}.`);
 if(s.stepMs.length)out.push(`Typical time per question: about ${TIMEFMT(s.stepMs.slice().sort((a,b)=>a-b)[s.stepMs.length>>1])}.`);
 if(s.skips)out.push(`Lessons skipped quickly: ${s.skips}.`);if(s.fastStreaks)out.push(`Fast streaks: ${s.fastStreaks}.`);
 if(s.lateSessions)out.push(`Late-night sessions: ${s.lateSessions}.`);if(s.moods.length)out.push(`Recent check-ins: ${s.moods.slice(-5).map(m=>MOOD_BTN[m.m]).join(', ')}.`);
 if(!p.adapt)out.push('Adapting is off, so I’m not tracking how you’re doing.');return out}
function renderLearned(){if(!el)return;el.querySelector('.gm-list').innerHTML='<ul>'+learnedItems().map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>'}
/* Apply the learner's page-wide needs: reduced motion and larger text. */
function applyProfile(){const h=document.documentElement;h.classList.toggle('wn-rm',D.profile.reducedMotion);h.classList.toggle('wn-lt',D.profile.largerText);
 if(el)el.querySelector('.gm-check').hidden=!D.profile.checkins}
function onField(f){const v=f.type==='checkbox'?f.checked:f.name==='time'?+f.value:f.value;D.profile=validProfile(Object.assign({},D.profile,{[f.name]:v}));
 if(f.name==='adapt'&&!v){sig=freshSignals();D.stats=validStats({sessions:D.stats.sessions})}save();applyProfile();update();renderLearned()}
function mount(root){if(!root||root.querySelector('.gm'))return;const box=document.createElement('div');box.className='gm';box.innerHTML=panelHtml();
 const top=root.querySelector('.gd-top');top.after(box.querySelector('.gm-now'));root.querySelector('.gd-chips').after(box.querySelector('.gm-check'));
 const set=root.querySelector('.gd-set');const you0=box.querySelector('.gm-you');set.after(you0);you0.after(box.querySelector('.gm-learned'));/* after Customise, so the Guide's own settings stay first */el=root;
 root.querySelectorAll('.gm-mood').forEach(b=>b.onclick=()=>{const g=G();g.say(b.textContent,'me');g.say(checkIn(b.dataset.mood,false))});
 const you=root.querySelector('.gm-you');you.onchange=e=>e.target.name&&onField(e.target);you.oninput=e=>e.target.name==='goal'&&onField(e.target);
 const learned=root.querySelector('.gm-learned');learned.ontoggle=renderLearned;
 root.querySelector('.gm-reset').onclick=()=>{reset();const g=G();g.say('Done. I’ve forgotten everything about you on this device.');rebuild(root)};
 setState(state);renderLearned()}
function rebuild(root){root.querySelectorAll('.gm-now,.gm-check,.gm-you,.gm-learned').forEach(x=>x.remove());root.querySelector('.gm')&&root.querySelector('.gm').remove();el=null;mount(root)}
function reset(){try{localStorage.removeItem(KEY)}catch(x){}D=load();sig=freshSignals();state={id:'focused',why:'Getting started.'};lastNudge={};applyProfile()}
// ---------- listening to the page ----------
/* Behaviour events from the lesson panel: open, hint, right, wrong, mastered. */
function onLearn(d){if(!D.profile.adapt)return;const t=now();sig.lastAct=t;
 if(d.kind==='open'){if(sig.lesson&&d.id!==sig.lesson&&!sig.touched&&t-sig.lessonOpenAt<25e3){sig.skipTimes.push(t);D.stats.skips++}
  if(d.id!==sig.lesson){sig.lesson=d.id;sig.lessonOpenAt=t;sig.stepStart=t;sig.touched=false;sig.wrongRun=0;sig.rightRun=0}}
 else if(d.kind==='hint'){sig.hintTimes.push(t);sig.touched=true;D.stats.hints++}
 else if(d.kind==='wrong'){sig.wrongRun++;sig.rightRun=0;sig.wrongTimes.push(t);sig.touched=true;D.stats.wrong++}
 else if(d.kind==='right'){D.stats.stepMs.push(t-sig.stepStart);D.stats.stepMs=D.stats.stepMs.slice(-30);sig.stepStart=t;sig.wrongRun=0;sig.rightRun++;sig.rightTimes.push(t);sig.touched=true;D.stats.right++;if(sig.rightRun===3&&fastStreak())D.stats.fastStreaks++}
 else sig.touched=true;
 ['hintTimes','wrongTimes','rightTimes','skipTimes'].forEach(k=>sig[k]=sig[k].slice(-20));save();update()}
/* Rapid clicking: 6+ clicks within 2.5 s on the same non-draggable control looks like frustration. Labs, sliders and canvases are skipped. */
function onClick(e){if(!D.profile.adapt)return;sig.lastAct=now();const tgt=e.target;if(!(tgt instanceof Element)||tgt.closest('canvas,svg,input,.vis,.fl,#guide,.gd-fab'))return;
 const key=tgt.closest('button,a,li,label')||tgt;sig.clicks=sig.clicks.filter(c=>now()-c.t<2500&&c.k===key);sig.clicks.push({t:now(),k:key});
 if(sig.clicks.length>=6){sig.rage=now();sig.clicks=[];update()}}
const active=()=>{if(!D.profile.adapt)return;const wasAway=state.id==='away';sig.lastAct=now();if(wasAway)update()};
function start(){D.stats.sessions++;if(lateNight())D.stats.lateSessions++;save();applyProfile();
 document.addEventListener('wn:learn',e=>onLearn(e.detail||{}));document.addEventListener('wn:guide',e=>{const d=e.detail||{};if(d.kind==='built')mount(d.root)});
 document.addEventListener('click',onClick,true);['keydown','pointerdown','scroll','wheel','touchstart'].forEach(ev=>addEventListener(ev,active,{passive:true,capture:true}));
 clock=setInterval(()=>{if(!document.hidden)update()},15e3);const g=G();if(g&&g.el())mount(g.el());update()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
return{onText,shape,paceFactor,level,checkIn,snapshot:()=>({state:state.id,why:state.why,profile:Object.assign({},D.profile)}),state:()=>Object.assign({},state),
 profile:()=>Object.assign({},D.profile),learned:learnedItems,update,reset,validProfile,validStats,rules:STATE_RULES.map(r=>r.id),_sig:()=>sig}})();
