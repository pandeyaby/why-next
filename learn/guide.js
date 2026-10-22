/* Why Next? Guide: a small talking companion. It lives in a corner button, and is built only when first opened.
   Free and offline: an SVG face with live states (idle, listening, thinking, speaking, celebrating), browser speech
   (speechSynthesis to talk, SpeechRecognition to listen, where the browser has them) and a local "brain" that answers
   from the open lesson: its key idea, explanations, hints and practice. A different brain (an LLM, say) can be plugged
   in with GUIDE.useBrain({reply(ctx, text) => Promise<string>}); none is wired by default, so nothing leaves the device.
   Settings (look, name, tone, pace, encouragement, voice) are saved in localStorage 'wn_guide' and validated on load. */
const GUIDE=(()=>{const KEY='wn_guide';
const LOOKS=['orb','cat','owl'],TONES=['calm','playful','socratic','concise'],CHEERS=['low','some','lots'];
const COLOURS=['#67e8f9','#c4b5fd','#86efac','#fcd34d','#f9a8d4','#fdba74'];
const DEF={look:'orb',colour:COLOURS[0],name:'Nova',tone:'calm',pace:1,cheer:'some',voice:false,open:false};
const escH=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* Accept only known values from storage, so a hand-edited or old blob can never break the guide. */
function validSettings(raw){const o=Object.assign({},DEF),r=raw&&typeof raw==='object'?raw:{};
 if(LOOKS.includes(r.look))o.look=r.look;if(COLOURS.includes(r.colour))o.colour=r.colour;if(TONES.includes(r.tone))o.tone=r.tone;if(CHEERS.includes(r.cheer))o.cheer=r.cheer;
 if(typeof r.name==='string'&&r.name.trim())o.name=r.name.trim().slice(0,16);if(Number.isFinite(r.pace))o.pace=Math.min(1.4,Math.max(.7,r.pace));
 o.voice=r.voice===true;o.open=r.open===true;return o}
let S=validSettings((()=>{try{return JSON.parse(localStorage.getItem(KEY))}catch(x){return null}})());
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(x){}};
const reduced=()=>!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
let root,log,face,stateEl,input,micBtn,ctx={id:null,lastHint:null,hintStep:0,explainStep:0,wrongRun:0},rec=null,busy=false;
// ---------- the face ----------
/* One SVG, three looks: ears for the cat and tufts for the owl are switched on by the data-look attribute. */
const FACE=`<svg viewBox="0 0 120 120" class="gd-svg" aria-hidden="true" focusable="false">
 <circle class="gd-aura" cx="60" cy="62" r="54"/><g class="gd-body">
 <path class="gd-cat" d="M26 42 L34 12 L52 32 Z M94 42 L86 12 L68 32 Z"/><path class="gd-owl" d="M30 36 L22 14 L48 28 Z M90 36 L98 14 L72 28 Z"/>
 <circle class="gd-head" cx="60" cy="64" r="40"/><ellipse class="gd-glass" cx="60" cy="58" rx="30" ry="22"/>
 <g class="gd-eyes"><circle class="gd-eye" cx="47" cy="58" r="6"/><circle class="gd-eye" cx="73" cy="58" r="6"/><circle class="gd-owleye" cx="47" cy="58" r="11"/><circle class="gd-owleye" cx="73" cy="58" r="11"/></g>
 <path class="gd-mouth" d="M48 80 Q60 88 72 80"/><ellipse class="gd-talk" cx="60" cy="82" rx="7" ry="4"/>
 <g class="gd-dots"><circle cx="48" cy="104" r="3"/><circle cx="60" cy="104" r="3"/><circle cx="72" cy="104" r="3"/></g>
 <g class="gd-spark"><path d="M14 30 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z"/><path d="M104 22 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z"/></g></g></svg>`;
const STATE_WORDS={idle:'Ready',listening:'Listening…',thinking:'Thinking…',speaking:'Talking',celebrating:'Yay!'};
function setState(s){if(!root)return;root.dataset.state=s;stateEl.textContent=STATE_WORDS[s]||''}
function applyLook(){if(!root)return;root.dataset.look=S.look;root.style.setProperty('--gd',S.colour);root.querySelector('.gd-name').textContent=S.name;
 const fab=document.getElementById('gdFab');if(fab){fab.style.setProperty('--gd',S.colour);fab.setAttribute('aria-label','Open your guide, '+S.name)}}
// ---------- the local brain ----------
const lesson=()=>ctx.id&&typeof LEARN!=='undefined'&&LEARN.L&&LEARN.L[ctx.id]||null;
const node=()=>ctx.id&&typeof N!=='undefined'&&N.get&&N.get(ctx.id)||null;
const level=()=>typeof LEARN!=='undefined'&&LEARN.level?LEARN.level():'adult';
const sentences=t=>String(t).split(/(?<=[.!?])\s+/).filter(Boolean);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const STOP=new Set('the a an is are of to and in on it this that what why how do does i you me my for with be can about'.split(' '));
const words=t=>String(t).toLowerCase().match(/[a-z0-9×÷=]+/g)||[];
/* The open lesson's text as sentences, so a free question can be answered with the closest sentence. */
function corpus(L){const lv=level(),out=[L.keyIdea,...(L.explain[lv]||[]),...(L.explain[lv==='kid'?'adult':'kid']||[])];(L.practice||[]).forEach(p=>p.explain&&!/\{/.test(p.explain)&&out.push(p.explain));return out.flatMap(sentences)}
/* "What is X?": prefer a sentence that defines X ("X is …", "X means …"). */
function definition(L,q){const m=q.match(/what(?:'s| is| are| does)\s+(?:an?\s+|the\s+)?([a-z][a-z -]{2,30}?)(?:\s+mean)?\s*\??$/);if(!m)return null;const term=m[1].trim().replace(/s$/,'');
 return corpus(L).find(s=>new RegExp('\\b'+term+'s?\\b[^.]{0,30}\\b(is|are|means)\\b','i').test(s))||null}
function bestSentence(L,q){const qs=words(q).filter(w=>!STOP.has(w)&&w.length>2);if(!qs.length)return null;let best=null,bs=0;
 corpus(L).forEach(s=>{const ws=new Set(words(s));const sc=qs.reduce((a,w)=>a+(ws.has(w)||[...ws].some(x=>x.startsWith(w.slice(0,5)))?1:0),0)/Math.sqrt(ws.size+4);if(sc>bs){bs=sc;best=s}});return bs>.15?best:null}
/* The question the learner is most likely stuck on: the last one they asked a hint for, else the first unanswered practice one. */
function currentItem(){if(ctx.lastHint)return ctx.lastHint;const q=document.querySelector('#pbox .qi:not([data-done])');const cur=typeof LEARN_PANEL!=='undefined'&&LEARN_PANEL.cur();
 if(q&&cur){const it=cur[q.dataset.pre][+q.dataset.i];return it&&{hint:it.hint,prompt:it.prompt}}return null}
/* Shape a plain answer to the chosen personality. */
function voice(text,kind){const s=sentences(text);switch(S.tone){
 case'concise':return s.slice(0,kind==='explain'?2:1).join(' ');
 case'playful':return (kind==='hint'?pick(['Ooh, a clue! ','Psst… ','Detective time! ']):kind==='explain'?pick(['Here’s the fun bit: ','Okay, picture this: ']):'')+text+(kind==='hint'?' 🕵️':' ✨');
 case'socratic':return kind==='hint'?`Let me ask you instead: ${s[0].replace(/\.$/,'')}${/\?$/.test(s[0])?'':'. What does that tell you?'}`:kind==='explain'?`${text} So, in your own words: why do you think that is?`:text;
 default:return (kind==='hint'?'No rush. ':kind==='explain'?'Let’s take it one step at a time. ':'')+text}}
const CHEER={right:{low:['Correct.'],some:['Nice work!','That’s it!','Spot on.'],lots:['Brilliant! 🎉','You nailed it! 🌟','Yes! Superstar! 🚀']},
 wrong:{low:[],some:['Mistakes help you learn. Want a hint?'],lots:['So close! You’ve got this. Want a hint?','Great try! Every miss teaches your brain something.']},
 mastered:{low:['Mastered.'],some:['You mastered it! 🎉'],lots:['MASTERED! 🎉🎉 Look at you go!']},labwin:{low:[],some:['Challenge done! 🎯'],lots:['You beat the challenge! 🏆']}};
const localBrain={name:'Offline guide (built in)',reply(c,text){const t=text.toLowerCase().trim(),L=lesson(),n=node();
 if(/^(hi|hello|hey|yo)\b/.test(t))return `Hi! I’m ${S.name}. ${L?`We’re on “${L.title}”. Ask me to explain it, give a hint, or quiz you.`:'Open a topic on the map and I can help with its lesson.'}`;
 if(/thank/.test(t))return pick(['Any time!','Happy to help.','You’re welcome!']);
 if(/what.*next|next topic|learn next/.test(t)&&typeof LEARN!=='undefined'&&LEARN.nextList){const nx=LEARN.nextList(3);return nx.length?'Good next steps: '+nx.map(x=>x.n).join(', ')+'.':'Pick a goal on the map and I can suggest a next step.'}
 if(!L){return n?`“${n.n}” doesn’t have a full lesson yet. ${n.desc?sentences(n.desc)[0]:''} The list under “Learn these first” is a good place to start.`:'Open a topic on the map and I’ll help you with it.'}
 if(/hint|stuck|help|clue|don.?t get|confus/.test(t)){const it=currentItem();if(it&&it.hint)return voice(it.hint,'hint');return voice((L.explain.kid||[L.keyIdea])[ctx.hintStep++%L.explain.kid.length],'hint')}
 if(/simpl|easier|like i.?m|kid/.test(t))return voice(L.explain.kid[ctx.explainStep++%L.explain.kid.length],'explain');
 if(/quiz|test me|question|ask me/.test(t)){const p=pick(L.practice.filter(x=>!x.params));return p?`Try this: ${p.prompt}${p.choices?' Is it '+p.choices.map(x=>'“'+x+'”').join(', or ')+'?':''}`:'Scroll to “Practise”: the questions there have fresh numbers every time.'}
 if(/main idea|big idea|summar|tl;?dr|key/.test(t))return voice(L.keyIdea,'explain');
 if(/explain|what is|what are|why|how|mean|tell me/.test(t)){const b=definition(L,t)||bestSentence(L,t);if(b&&!/^(explain|tell me)/.test(t))return voice(b,'explain');const ex=L.explain[level()];return voice(ex[ctx.explainStep++%ex.length],'explain')}
 const b=bestSentence(L,t);return b?voice(b,'explain'):`I’m a simple offline guide, so I only know this lesson. Try “explain”, “hint”, “simpler”, “quiz me” or “what next?”.`}};
let brain=localBrain;
const TONE_HELLO={calm:'Okay. I’ll keep things calm and go one step at a time.',playful:'Woohoo! Let’s make this fun! ✨',socratic:'From now on I’ll mostly answer with questions. Ready to think?',concise:'Got it. Short answers.'};
/* Plug in another brain. It gets {lesson, topic, level, tone, settings} and the learner's words and returns text (or a Promise). */
function useBrain(b){brain=b&&typeof b.reply==='function'?b:localBrain}
// ---------- talking ----------
const canSpeak=()=>'speechSynthesis' in window;
function say(text,who='bot'){if(!root)return;const p=document.createElement('p');p.className='gd-msg '+who;p.textContent=text;log.append(p);log.scrollTop=log.scrollHeight;
 if(who!=='bot')return;if(S.voice&&canSpeak()){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text.replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu,''));u.rate=S.pace;u.pitch=S.tone==='playful'?1.25:1;
  u.onstart=()=>setState('speaking');u.onend=u.onerror=()=>root.dataset.state==='speaking'&&setState('idle');speechSynthesis.speak(u);return}catch(x){}}
 // no voice: show the speaking face for about as long as reading the line takes, scaled by pace
 setState('speaking');clearTimeout(say.t);say.t=setTimeout(()=>root.dataset.state==='speaking'&&setState('idle'),Math.min(4000,600+text.length*28/S.pace))}
async function ask(text){text=String(text||'').trim();if(!text||busy)return;say(text,'me');busy=true;setState('thinking');
 const c={lesson:lesson(),topic:node(),level:level(),tone:S.tone,settings:Object.assign({},S)};
 let out;try{await new Promise(r=>setTimeout(r,(reduced()?150:450)/S.pace));out=await brain.reply(c,text)}catch(x){out=localBrain.reply(c,text)}
 busy=false;say(String(out||'…'))}
function celebrate(kind){const lines=CHEER[kind]&&CHEER[kind][S.cheer];if(!lines||!lines.length)return;if(!root||!S.open){pulseFab();return}
 if(kind!=='wrong'){setState('celebrating');setTimeout(()=>root.dataset.state==='celebrating'&&setState('idle'),reduced()?900:1600);const p=document.createElement('p');p.className='gd-msg bot';p.textContent=pick(lines);log.append(p);log.scrollTop=log.scrollHeight}
 else say(pick(lines))}
function pulseFab(){const f=document.getElementById('gdFab');if(!f||reduced())return;f.classList.remove('gd-ping');void f.offsetWidth;f.classList.add('gd-ping')}
function listen(){const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R)return;if(rec){rec.stop();return}
 rec=new R();rec.lang=document.documentElement.lang||'en-GB';rec.interimResults=false;setState('listening');micBtn.setAttribute('aria-pressed','true');
 rec.onresult=e=>{const t=e.results[0][0].transcript;ask(t)};rec.onerror=()=>{say('I couldn’t hear that. You can type instead.')};
 rec.onend=()=>{rec=null;micBtn.setAttribute('aria-pressed','false');if(root.dataset.state==='listening')setState('idle')};try{rec.start()}catch(x){rec=null;setState('idle')}}
// ---------- the panel ----------
function settingsHtml(){const opt=(a,v,lab)=>a.map(x=>`<option value="${x}"${x===v?' selected':''}>${lab?lab[x]:x[0].toUpperCase()+x.slice(1)}</option>`).join('');
 return `<details class="gd-set"><summary>⚙ Customise</summary><div class="gd-grid">
 <label>Name <input name="name" maxlength="16" value="${escH(S.name)}"></label>
 <label>Look <select name="look">${opt(LOOKS,S.look,{orb:'Orb bot',cat:'Cat',owl:'Owl'})}</select></label>
 <fieldset><legend>Colour</legend>${COLOURS.map(c=>`<button type="button" class="gd-sw" data-col="${c}" style="--c:${c}" aria-label="Colour ${c}" aria-pressed="${c===S.colour}"></button>`).join('')}</fieldset>
 <label>Personality <select name="tone">${opt(TONES,S.tone,{calm:'Calm',playful:'Playful',socratic:'Socratic (asks questions)',concise:'Concise'})}</select></label>
 <label>Pace <input name="pace" type="range" min=".7" max="1.4" step=".1" value="${S.pace}"></label>
 <label>Encouragement <select name="cheer">${opt(CHEERS,S.cheer,{low:'A little',some:'Some',lots:'Lots'})}</select></label>
 ${canSpeak()?`<label class="gd-chk"><input type="checkbox" name="voice"${S.voice?' checked':''}> Speak out loud</label>`:''}</div></details>`}
function build(){root=document.createElement('aside');root.id='guide';root.className='gd';root.setAttribute('aria-label','Your guide');root.hidden=true;
 const hasMic=!!(window.SpeechRecognition||window.webkitSpeechRecognition);
 root.innerHTML=`<div class="gd-top"><div class="gd-face">${FACE}</div><div><b class="gd-name"></b><span class="gd-state" role="status" aria-live="polite"></span></div><button type="button" class="gd-x" aria-label="Close the guide">✕</button></div>
 <div class="gd-log" role="log" tabindex="0" aria-label="Conversation" aria-live="polite"></div><div class="gd-chips">${['Explain','Hint','Simpler','Quiz me','What next?'].map(c=>`<button type="button" class="gd-chip">${c}</button>`).join('')}</div>
 <form class="gd-in"><input type="text" aria-label="Ask your guide" placeholder="Ask about this lesson" autocomplete="off">${hasMic?'<button type="button" class="gd-mic" aria-pressed="false" aria-label="Talk to the guide">🎤</button>':''}<button type="submit" class="gd-send" aria-label="Send">➤</button></form>${settingsHtml()}`;
 document.body.append(root);log=root.querySelector('.gd-log');stateEl=root.querySelector('.gd-state');input=root.querySelector('.gd-in input');micBtn=root.querySelector('.gd-mic');
 root.querySelector('.gd-in').onsubmit=e=>{e.preventDefault();const t=input.value;input.value='';ask(t)};
 root.querySelector('.gd-x').onclick=()=>toggle(false);if(micBtn)micBtn.onclick=listen;
 root.querySelectorAll('.gd-chip').forEach(b=>b.onclick=()=>ask(b.textContent));
 const set=root.querySelector('.gd-set');set.onchange=e=>{const f=e.target;if(!f.name)return;S=validSettings(Object.assign({},S,{[f.name]:f.type==='checkbox'?f.checked:f.type==='range'?+f.value:f.value}));save();applyLook();if(f.name==='tone')say(TONE_HELLO[S.tone])};
 set.onclick=e=>{const b=e.target.closest('[data-col]');if(!b)return;S=validSettings(Object.assign({},S,{colour:b.dataset.col}));save();applyLook();set.querySelectorAll('[data-col]').forEach(x=>x.setAttribute('aria-pressed',x===b))};
 root.onkeydown=e=>{if(e.key==='Escape')toggle(false)};applyLook();setState('idle');
 const L=lesson();say(L?`Hi, I’m ${S.name}! Stuck on “${L.title}”? Ask me, or tap a button below.`:`Hi, I’m ${S.name}! Open a topic and I’ll help you learn it.`)}
function toggle(on){if(on&&!root)build();if(!root)return;root.hidden=!on;S.open=on;save();const f=document.getElementById('gdFab');if(f){f.hidden=on;f.setAttribute('aria-expanded',on)}if(on)input.focus();else{if(rec)rec.stop();if(canSpeak())speechSynthesis.cancel();f&&f.focus()}}
function init(){if(document.getElementById('gdFab'))return;const f=document.createElement('button');f.type='button';f.id='gdFab';f.className='gd-fab';f.setAttribute('aria-expanded','false');f.innerHTML='<span aria-hidden="true">✦</span> Guide';f.onclick=()=>toggle(true);document.body.append(f);applyLook();if(S.open)toggle(true)}
document.addEventListener('wn:learn',e=>{const d=e.detail||{};if(d.kind==='open'){if(d.id!==ctx.id)ctx={id:d.id,lastHint:null,hintStep:0,explainStep:0,wrongRun:0};return}
 if(d.kind==='hint'){ctx.lastHint={hint:d.hint,prompt:d.prompt};return}
 if(d.kind==='wrong'){ctx.lastHint={hint:d.hint,prompt:d.prompt};if(++ctx.wrongRun>=2){ctx.wrongRun=0;celebrate('wrong')}return}
 ctx.wrongRun=0;celebrate(d.kind)});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
return{useBrain,ask,settings:()=>Object.assign({},S),validSettings,localBrain}})();
