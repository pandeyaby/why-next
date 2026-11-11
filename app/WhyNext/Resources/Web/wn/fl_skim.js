/* Flagship: reading to study (ages 11-13; skim, scan and question, the survey and question stages of SQ3R). One fact
   page on honeybees drawn as a sheet: skim the title, headings and first lines; scan with a lens for a number; turn
   headings into questions; read one section closely for the sentence that answers; then cover the page and recall.
   Taps on the sheet have button twins; the sheet is paper and ink in both themes. */
(()=>{
const PG={t:'Honeybees',s:[
 ['The queen bee',['Each hive has one queen.','In summer she can lay up to 2,000 eggs a day.','A strong hive can hold 50,000 bees.']],
 ['How bees share news',['A bee that finds flowers does a waggle dance.','The direction of the dance points the way to the flowers.','The longer the waggle, the further away the flowers are.']],
 ['Making honey',['Bees suck nectar from flowers and pass it from bee to bee.','They fan it with their wings to dry it, then seal it in wax.','In its whole life, one bee makes about 1/12 of a teaspoon of honey.']],
 ['Why bees are in danger',['Many wild flowers have gone.','Some farm sprays, called pesticides, harm bees.','A tiny mite called varroa makes hives sick.']]]};
const INK='#1f2937',PAPER='#fffdf6',BAR='#cbd5e1',HI='#fde68a',AC='#1d4ed8';
const QH=[[0,[['What does the queen bee do?','ok'],['Is the queen bee nice?','yesno'],['What is a bee?','broad']]],
 [1,[['Do bees talk?','yesno'],['How do bees tell each other where flowers are?','ok'],['Why do people like honey?','off']]],
 [3,[['How big is a bee?','off'],['Are bees in danger?','yesno'],['Why are bees in danger?','ok']]]];
const RQ=[['How many eggs a day can the queen lay?',['2,000','200','20,000']],['A longer waggle means the flowers are…',['further away','sweeter','closer']],['Name one danger to bees.',['the varroa mite','too much honey','summer rain']]];
VIS.reg('flagskim',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const kind=()=>['skim','scan','question','read','recall','chal'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const words=t=>t.split(/\s+/).filter(Boolean).length;
const TOTAL=words(PG.t)+PG.s.reduce((n,[h,ss])=>n+words(h)+ss.reduce((m,x)=>m+words(x),0),0);
const SKIMW=words(PG.t)+PG.s.reduce((n,[h,ss])=>n+words(h)+words(ss[0]),0);
let PX=15;function fs(){return PX}
/* lay the sheet out into blocks: one per heading and one per sentence, each wrapped into lines */
function layout(){for(PX=A.narrow?14:16;PX>9;PX--){lay();if(S.end<A.H-36)break}return S.B}
function lay(){const g=A.ctx,W=A.W,px=fs(),lh=px*1.38,x0=14,mw=W-28-12;let y=px*2.6+8;const B=[];
 const wrap=(t,f)=>{g.font=f;const out=[];let cur='';t.split(' ').forEach(w=>{const n=cur?cur+' '+w:w;if(g.measureText(n).width>mw&&cur){out.push(cur);cur=w}else cur=n});out.push(cur);return out};
 PG.s.forEach(([h,ss],si)=>{y+=px*.5;const hf=`800 ${px+2}px system-ui,sans-serif`,hl=wrap(h,hf);const hh=hl.length*lh*1.05+(S.mode==='question'?lh:0);B.push({k:'h',si,t:h,lines:hl,f:hf,y,hgt:hh});y+=hh;
  ss.forEach((t,j)=>{const f=`500 ${px}px system-ui,sans-serif`,ls=wrap(t,f);B.push({k:'s',si,j,t,lines:ls,f,y,hgt:ls.length*lh});y+=ls.length*lh+2})});
 S.B=B;S.lh=lh;S.end=y}
function visible(b){const m=S.mode;if(m==='full')return true;if(b.k==='h')return m!=='blur';
 if(m==='skim'||m==='question')return b.j===0;if(m==='scan')return S.lens===S.B.indexOf(b);if(m==='section')return b.si===1;return false}
function drawBlock(b){const g=A.ctx,px=fs(),lh=S.lh,x0=b.k==='s'?22:14,on=visible(b),idx=S.B.indexOf(b);
 if(S.mark===idx){g.fillStyle=HI;g.fillRect(x0-6,b.y-lh*.62,A.W-x0-8,b.hgt+lh*.2)}
 b.lines.forEach((ln,i)=>{const y=b.y+i*lh;g.font=b.f;g.textAlign='left';g.textBaseline='middle';
  if(on){g.fillStyle=INK;g.fillText(ln,x0,y);return}
  let x=x0;ln.split(' ').forEach(w=>{const wd=g.measureText(w).width,sp=g.measureText(' ').width;
   if(S.mode==='scan'&&/\d/.test(w)){g.fillStyle=INK;g.font=`900 ${px}px system-ui,sans-serif`;g.fillText(w,x,y);g.font=b.f}
   else{g.fillStyle=b.k==='h'?'#94a3b8':BAR;A.paint.rrect(x,y-px*.32,wd,px*.64,3);g.fill()}x+=wd+sp})});
}
function draw(A){const{ctx:g,W,H}=A,k=kind();
 if(k==='chal'){g.fillStyle=A.mix(A.col.pn,'#e0e7ff',A.col.dark?.05:.4);g.fillRect(0,0,W,H);const t=(m,y,w)=>{g.font=`${w} ${A.narrow?14:17}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(m,W/2,y,W-12)};
  t('Skim: title, headings, first lines.',H*.3,800);t('Scan: hunt for one word or number.',H*.42,700);t('Question: turn headings into questions.',H*.54,700);t('Read to answer, then cover and recall.',H*.66,700);A.fx.draw(g);return}
 g.fillStyle=A.col.dark?'#0f172a':'#e2e8f0';g.fillRect(0,0,W,H);g.fillStyle=PAPER;A.paint.rrect(4,4,W-8,H-8,10);g.fill();
 const B=layout(),px=fs();g.font=`900 ${px+8}px Georgia,serif`;g.textAlign='left';g.textBaseline='middle';g.fillStyle=S.mode==='blur'?'#94a3b8':INK;
 if(S.mode==='blur'){A.paint.rrect(14,px*1.3-px*.45,g.measureText(PG.t).width,px*.9,4);g.fill()}else g.fillText(PG.t,14,px*1.3);
 B.forEach(drawBlock);
 if(S.mode==='scan'&&S.lens>=0){const b=B[S.lens];g.strokeStyle=AC;g.lineWidth=3;A.paint.rrect(8,b.y-S.lh*.66,W-16,b.hgt+S.lh*.3,8);g.stroke()}
 if(S.qs){B.filter(b=>b.k==='h'&&S.qs[b.si]).forEach(b=>{g.font=`italic 700 ${px}px system-ui,sans-serif`;g.fillStyle=AC;g.textAlign='left';g.fillText('→ '+S.qs[b.si],14,b.y+S.lh*.98,W-28)})}
 if(S.mode==='cover'){g.fillStyle='#334155';A.paint.rrect(10,px*2.4,W-20,H-px*2.4-10,10);g.fill();g.fillStyle='#fff';g.font=`800 ${px+2}px system-ui,sans-serif`;g.textAlign='center';
  g.fillText('Page covered',W/2,H*.3);g.font=`600 ${px}px system-ui,sans-serif`;const r=S.ri<RQ.length?RQ[S.ri][0]:`All ${RQ.length} answered from memory`;g.fillText(r,W/2,H*.42,W-40);g.fillText(`${S.right} of ${RQ.length} right`,W/2,H*.54)}
 if(S.tag){A.paint.label(S.tag,W/2,H-22,{font:`700 ${A.narrow?13:15}px system-ui,sans-serif`,bg:'rgba(17,24,39,.86)',col:'#fff'})}A.fx.draw(g)}
function ensure(){if(!S.B&&A&&A.ctx)layout();return S.B||[]}
function hitBlock(p){ensure();return S.B.findIndex(b=>p.y>=b.y-S.lh*.7&&p.y<=b.y+b.hgt-S.lh*.3)}
function skim(){if(kind()!=='skim')return;S.mode='skim';S.skimmed=true;A.sound.tick();say(`Skimmed: you read ${SKIMW} of ${TOTAL} words and already know the page has four parts: the queen, how bees share news, making honey and danger.`);A.redraw();S.check()}
function readAll(){if(kind()!=='skim')return;S.mode='full';A.sound.tick();say(`Reading every word first means all ${TOTAL} words before you know what matters. Skim first, then decide where to read.`);A.redraw()}
function lensTo(i){if(kind()!=='scan'||i<0)return;S.lens=i;A.sound.tick();const b=S.B[i];
 if(/2,000/.test(b.t)){S.found=true;S.mark=i;say('Found it: up to 2,000 eggs a day. You only read one line, because the digits stood out.')}
 else if(/\d/.test(b.t))say(`This line has a number, but it is about something else: "${b.t}" Keep scanning.`);
 else say('No digits in this line, so a scanner skips it. Look for the next number.');A.redraw();S.check()}
function lensMove(d){if(kind()!=='scan')return;const n=ensure().length;let i=S.lens<0?0:S.lens+d;i=Math.max(0,Math.min(n-1,i));lensTo(i)}
function askQ(t,q){if(kind()!=='question')return;const cur=QH[S.qh];if(!cur)return;A.sound.tick();
 if(t==='ok'){S.qs[cur[0]]=q;S.qh++;say(S.qh<QH.length?`Good question: "${q}" Now the next heading.`:'All three headings are questions now. Each one tells you what to look for when you read.');controls()}
 else{let m='This section will not answer that. Use the words in the heading.';if(t==='yesno')m='A yes or no question gets a one-word answer. Start with how, what or why.';if(t==='broad')m='Too broad: this section is only about the queen, not every bee.';say(m)}
 A.redraw();S.check()}
function pickSent(i){if(kind()!=='read'||i<0)return;const b=S.B[i];if(b.k!=='s'||b.si!==1){say('Stay in the section you need: How bees share news.');return}S.mark=i;A.sound.tick();
 if(b.j===2){S.answered=true;say('Yes: the longer the waggle, the further away the flowers are. That answers how far.')}
 else if(b.j===1)say('That tells the bees which way to go, not how far. Read on.');else say('That says there is a dance, but not how far away the flowers are.');A.redraw();S.check()}
function cover(on){if(kind()!=='recall')return;S.mode=on?'cover':'full';A.sound.tick();say(on?'The page is covered. Answer from memory.':'Peeking shows the page again. Rereading feels easy, but trying to remember is what makes it stick.');controls();A.redraw()}
function recall(a){if(kind()!=='recall'||S.ri>=RQ.length)return;if(S.mode!=='cover'){say('Cover the page first: answering from memory is the point.');return}
 if(a===0){S.right++;S.ri++;A.sound.pop();say(S.ri<RQ.length?'Right, from memory. Next question.':`All ${RQ.length} from memory. Now peek and check: was anything missing?`)}else{A.sound.miss();say('Not quite. Keep it in mind, then check when you peek after the last question.')}
 controls();A.redraw();S.check()}
let swipe=null;
function down(p){const k=kind();if(k==='chal')return false;const i=hitBlock(p);
 if(k==='skim'){skim();return true}if(k==='scan'){if(i>=0)lensTo(i);else swipe=p.y;return true}
 if(k==='read'){pickSent(i);return true}if(k==='recall'){cover(S.mode!=='cover');return true}return false}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};
 if(k==='skim'){btn('Skim: title and headings',skim,'Skim the title, headings and first lines');btn('Read every word',readAll,'Read every word from the top')}
 if(k==='scan'){btn('Lens up',()=>lensMove(-1),'Move the lens up one line');btn('Lens down',()=>lensMove(1),'Move the lens down one line')}
 if(k==='question'&&QH[S.qh])QH[S.qh][1].forEach(([q,t])=>btn(q,()=>askQ(t,q),'Ask: '+q));
 if(k==='read')ensure().forEach((b,i)=>{if(b.k==='s'&&b.si===1)btn('Sentence '+(b.j+1),()=>pickSent(i),'Choose: '+b.t)});
 if(k==='recall'){btn(S.mode==='cover'?'Peek at the page':'Cover the page',()=>cover(S.mode!=='cover'));if(S.ri<RQ.length)RQ[S.ri][1].forEach((o,j)=>btn(o,()=>recall(j),'Answer: '+o))}}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function reset(o){run++;swipe=null;for(const x in S)delete S[x];Object.assign(S,{mode:'blur',lens:-1,mark:-1,qs:null,qh:0,ri:0,right:0,tag:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*450))}
const idxOf=(si,j)=>ensure().findIndex(b=>b.k==='s'&&b.si===si&&b.j===j);
const steps=[
{h:'Skim first',p:'Skimming means looking over a page quickly to get the big picture. Read the title, the headings and the first line of each part. In seconds you know what the page covers and where things are.',
 predict:{q:'You have two minutes to find out what this page is about. What is the best first move?',opts:['skim the title and headings','read every word from the top','highlight as you go'],ans:0},task:'Skim the page: tap it, or press Skim',
 show:()=>auto(0,[skim]),
 go:()=>{reset();say(`A fact page about honeybees. Its words are hidden as grey bars: ${TOTAL} words in four parts. Skim it, or read every word.`);controls();S.check=finish(0,()=>S.skimmed,'Title, headings and first lines give you the map of the page.')}},
{h:'Scan for one fact',p:'Scanning is different. You hunt for one thing, like a number or a name, and skip the rest. Numbers and capital letters stand out, so your eyes can jump straight to them.',
 predict:{q:'You need the number of eggs the queen lays. What do your eyes hunt for?',opts:['digits, like 2,000','the first sentence','the longest words'],ans:0},task:'Move the lens to the line that says how many eggs',
 show:()=>auto(1,[()=>lensTo(idxOf(0,2)),()=>lensTo(idxOf(0,1))]),
 go:()=>{reset({mode:'scan',tag:'Find: how many eggs a day?'});say('Scanning: only the digits show. Tap a line to put the lens on it, or use Lens up and Lens down.');controls();S.check=finish(1,()=>S.found,'Up to 2,000 eggs a day.')}},
{h:'Turn headings into questions',p:'Before you read a part, turn its heading into a question. A good question starts with how, what or why and matches the heading. Now you are reading to find an answer.',
 predict:{q:'Why turn a heading into a question before reading?',opts:['it gives you something to look for','it makes reading slower for no reason','only teachers need questions'],ans:0},task:'Pick the best question for each of the three headings',
 show:()=>auto(2,[()=>askQ('yesno','Is the queen bee nice?'),()=>askQ('ok','What does the queen bee do?'),()=>askQ('ok','How do bees tell each other where flowers are?'),()=>askQ('ok','Why are bees in danger?')]),
 go:()=>{reset({mode:'question',qs:{}});say('The headings are showing. Choose a question for "The queen bee" first.');controls();S.check=finish(2,()=>S.qh>=QH.length,'Three headings, three questions to answer.')}},
{h:'Read to answer',p:'Now read one part closely, with your question in mind. Not every sentence answers it. Find the one that does, and notice the ones that only look close.',
 task:'Tap the sentence that says how far away the flowers are',
 show:()=>auto(3,[()=>pickSent(idxOf(1,1)),()=>pickSent(idxOf(1,2))]),
 go:()=>{reset({mode:'section',tag:'Question: how far away are the flowers?'});say('Only the part called How bees share news is shown. It has three sentences. Tap one, or use the sentence buttons.');A.redraw();controls();S.check=finish(3,()=>S.answered,'The longer the waggle, the further the flowers.')}},
{h:'Cover and recall',p:'Rereading and highlighting feel like learning, but they fade fast. Covering the page and trying to answer from memory is harder, and that effort is what makes it stick.',
 predict:{q:'A week from now, which will help you remember this page best?',opts:['cover it and answer from memory','read it again three times','highlight the key lines'],ans:0},task:'Cover the page and answer all three questions from memory',
 show:()=>auto(4,[()=>cover(true),()=>recall(0),()=>recall(0),()=>recall(0)]),
 go:()=>{reset({mode:'full'});say('The whole page is showing. Cover it, then answer three questions from memory.');controls();S.check=finish(4,()=>S.ri>=RQ.length,'Three answers from memory.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['You need the year a war ended from a long web page. What should you do?',[['scan for a number','ok'],['skim the headings','skimfact'],['read every word','slow']]],
 ['You want to know what a chapter is about before class starts. What should you do?',[['skim the title and headings','ok'],['scan for numbers','scanbig'],['read it all closely','slow']]],
 ['You must explain how bees make honey in your own words. What should you do?',[['read that part closely','ok'],['skim it once','skimdeep'],['scan for numbers','scanbig']]],
 ['The heading is "Why bees are in danger". Which question should you ask?',[['Why are bees in danger?','ok'],['Are bees in danger?','yesno'],['How long is this page?','off']]],
 ['Your friend highlights half the page and stops. Why might that not help?',[['highlighting is not the same as remembering','ok'],['highlighters fade','fade'],['it makes the page too bright','fade']]],
 ['You are scanning a list for a person\u2019s name. What do your eyes look for?',[['a capital letter','ok'],['the longest sentence','slow'],['the last word on the page','off']]]];
function why(t){let m='Think about your job: the big picture, one fact, or a full understanding?';
 if(t==='skimfact')m='Skimming gives the big picture. For one fact, like a year, scan for the digits.';
 if(t==='slow')m='Reading every word takes far longer. Pick the strategy that fits the job.';
 if(t==='scanbig')m='Scanning finds one fact. To get the big picture, skim the title and headings.';
 if(t==='skimdeep')m='Skimming is too quick to explain something. Read that part closely, then say it in your own words.';
 if(t==='yesno')m='A yes or no question gets a one-word answer. Start with why, how or what.';
 if(t==='off')m='That does not help you understand the page. Use the words in front of you.';
 if(t==='fade')m='The real problem: colouring lines in does not test you. Cover the page and try to recall it.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},box,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.95,tall:1.8,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Reading controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>{if(swipe!=null&&kind()==='scan'&&Math.abs(p.y-swipe)>S.lh){lensMove(p.y>swipe?1:-1);swipe=p.y}},up:()=>{swipe=null}});controls()}});
A.start()})})();
