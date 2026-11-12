/* Flagship – Spellings from Greek, French and Latin (ages 8–10; National Curriculum England, English Appendix 1, Years 3–4:
   /k/ spelt ch (Greek), /ʃ/ spelt ch (mostly French), /g/ spelt -gue and /k/ spelt -que (French), /s/ spelt sc (Latin)). */
(()=>{
/* step 1: what sound does ch make? 0 = /k/ (Greek), 1 = /sh/ (French), 2 = /ch/ (everyday English) */
const CHS=[['chorus',0],['chef',1],['chip',2],['echo',0],['machine',1],['lunch',2],['chemist',0],['brochure',1],['cheese',2],['character',0],['chalet',1],['church',2]];
/* steps 2 and 3: a word with a gap, the sound in the gap, the tiles (first is right) */
const KGAP=[['__emist','k','chemist',['ch','k','c'],'a scientist who mixes chemicals'],['ma__ine','sh','machine',['ch','sh','s'],'it has moving parts and does a job'],['e__o','k','echo',['ch','ck','k'],'a sound that bounces back to you'],['__eme','sk','scheme',['sch','sk','sc'],'a plan'],['__ef','sh','chef',['ch','sh','ti'],'a cook in a restaurant'],['__aracter','k','character',['ch','k','c'],'a person in a story']];
const EGAP=[['lea__','g','league',['gue','g','gg'],'a group of sports teams'],['uni__','k','unique',['que','k','ck'],'the only one of its kind'],['anti__','k','antique',['que','ck','k'],'very old and worth keeping'],['pla__','g','plague',['gue','g','ge'],'a disease that spreads fast'],['che__','k','cheque',['que','ck','k'],'a paper way to pay from a bank'],['va__','g','vague',['gue','g','ge'],'not clear']];
/* step 4: does sc say /s/ (0) or /sk/ (1)? */
const SCW=[['science',0],['scoop',1],['scene',0],['scarf',1],['crescent',0],['scab',1],['discipline',0],['scale',1],['fascinate',0],['scold',1]];
/* step 5: a misspelling, the choices (first is right), the slip each wrong choice makes */
const FIX=[['kemist',['chemist','chemmist','kemmist'],['dbl','k']],['masheen',['machine','mashine','macheen'],['sh','ee']],['leeg',['league','leage','leegue'],['ue','ea']],['sience',['science','scince','siense'],['vow','c']],['uneek',['unique','unick','uniqe'],['ck','u']],['korus',['chorus','corus','khorus'],['kc','kh']]];
VIS.reg('flagorigin',c=>{let A,pad,chal,qk=-1,epoch=0;
const G={};
const PEN='#0f172a',GOOD='#047857',WRONG='#be123c',LINE='#64748b',LIFT='#4338ca',PAPER='#ffffff';
const LANG=[['#dbeafe','#1e3a8a'],['#fce7f3','#831843'],['#fef3c7','#78350f']],TILE=['#ede9fe','#4c1d95'];
const u=v=>Math.round(v*(A.narrow?.94:1.08)),fnt=(v,w)=>`${w||800} ${u(v)}px system-ui,sans-serif`;
const mode=()=>['chs','kgap','egap','scw','fix','quiz'][A.step],inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function clear(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function card(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.rim?3.5:1.5;g.strokeStyle=o.rim||LINE;g.stroke();
 if(t==null)return;g.fillStyle=o.fg||PEN;g.font=fnt(o.n||20,o.w||800);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-10)}
function head(t,won){const g=A.ctx;let n=15;g.font=fnt(n);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=fnt(n)}
 const w=g.measureText(t).width+26,h=u(n)+14,y=A.H*.03;card({x:A.W/2-w/2,y,w,h},t,{bg:won?'#d1fae5':PAPER,rim:won?GOOD:null,n})}
function line(t,y,n,col){const g=A.ctx;g.fillStyle=col||A.col.tx;g.font=fnt(n||14,650);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-14)}
const follow=(r,j)=>G.hold&&G.hold.j===j?{...r,x:G.hold.x-r.w/2,y:G.hold.y-r.h/2}:r;
const pile=()=>{const w=Math.min(A.W-40,u(230));return{x:A.W/2-w/2,y:A.H*.14,w,h:u(58)}};
/* bins along the bottom: one per answer */
function trays(names){const y=A.H*.4,gp=8,n=names.length,w=(A.W-20-gp*(n-1))/n;return names.map((t,j)=>({x:10+j*(w+gp),y,w,h:A.H-y-8,t,j}))}
const CHB=['k: Greek','sh: French','ch: chip'],SCB=['sc says s','sc says sk'];
const SORT={chs:[CHS,CHB],scw:[SCW,SCB]};
function drawSort(key){const [L,B]=SORT[key],s=G[key],g=A.ctx,end=s.n>=L.length;clear();head(end?`All ${L.length} words sorted`:`Word ${s.n+1} of ${L.length}: ${key==='chs'?'what does ch say?':'what does sc say?'}`,end);
 trays(B).forEach(b=>{const hue=LANG[b.j%3];g.fillStyle=hue[0];A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=s.bad===b.j?WRONG:hue[1];g.lineWidth=s.bad===b.j?4:2;g.stroke();
  g.fillStyle=PEN;g.textAlign='center';g.textBaseline='top';g.font=fnt(15,800);g.fillText(b.t,b.x+b.w/2,b.y+7,b.w-6);g.font=fnt(13,650);
  L.slice(0,s.n).filter(x=>x[1]===b.j).forEach((x,i)=>g.fillText(x[0],b.x+b.w/2,b.y+u(29)+i*u(18),b.w-6))});
 if(!end){const w=L[s.n][0],r=follow(pile(),0);card(r,null,{rim:G.hold?LIFT:null});
  const i=w.indexOf(key==='chs'?'ch':'sc'),a=w.slice(0,i),m=w.slice(i,i+2),z=w.slice(i+2);g.font=fnt(24);g.textBaseline='middle';
  const wa=g.measureText(a).width,wm=g.measureText(m).width,wz=g.measureText(z).width;let x=r.x+r.w/2-(wa+wm+wz)/2;const y=r.y+r.h/2+1;g.textAlign='left';
  g.fillStyle=PEN;g.fillText(a,x,y);x+=wa;g.fillStyle=WRONG;g.fillText(m,x,y);g.fillRect(x,y+u(13),wm,3);x+=wm;g.fillStyle=PEN;g.fillText(z,x,y)}}
const SAYS={chs:['ch says k, as in kit. Greek words spell /k/ with ch.','ch says sh, as in shop. French words spell /sh/ with ch.','ch says ch, as in chip. That is the everyday English sound.'],
 scw:['the letter after sc is e or i, so the c is soft: sc says s.','the letter after sc is a, o or u, so the c is hard: sc says sk.']};
function sortTo(key,j){const [L]=SORT[key],s=G[key];if(s.n>=L.length)return;const [w,want]=L[s.n];
 if(j!==want){s.bad=j;A.sound.miss();return speak(`Say ${w} aloud: `+SAYS[key][want])}
 s.n++;s.bad=null;A.sound.pop();speak(`${w}: ${SAYS[key][want].split('.')[0]}.`+(s.n>=L.length?' All sorted.':''))}
/* gap builder: drop a tile into the gap in the word */
const GAPS={kgap:KGAP,egap:EGAP};
function hole(){const w=Math.min(A.W-30,u(320));return{x:A.W/2-w/2,y:A.H*.2,w,h:u(70)}}
function chips(key){const q=GAPS[key][G[key].n],n=q[3].length,gp=10,w=Math.min(u(120),(A.W-20-gp*(n-1))/n),h=u(58),all=n*w+(n-1)*gp,rot=(G[key].n+1)%n;
 return q[3].map((t,j)=>({t,j,w,h,y:A.H*.66,x:A.W/2-all/2+((j+rot)%n)*(w+gp)}))}
function drawGap(key){const L=GAPS[key],s=G[key];clear();if(s.n>=L.length){head(`All ${L.length} words built`,1);L.forEach((q,i)=>line(q[2],A.H*(.18+i*.13),20));return}
 const q=L[s.n];head(`Word ${s.n+1} of ${L.length}: the gap says /${q[1]}/`);const H=hole();card(H,q[0].replace('__','  ?  '),{bg:LANG[key==='kgap'?0:1][0],fg:PEN,n:28,rim:s.bad!=null?WRONG:null});line('Meaning: '+q[4],H.y+H.h+u(18),14);
 line(key==='kgap'?'Drag the spelling that fits the word':'Drag the ending that fits the word',A.H*.55,14);
 chips(key).forEach(r=>card(follow(r,r.j),r.t,{bg:TILE[0],fg:TILE[1],n:22,rim:G.hold&&G.hold.j===r.j?LIFT:s.bad===r.j?WRONG:null}))}
function gapFill(key,j){const L=GAPS[key],s=G[key];if(s.n>=L.length)return;const q=L[s.n],t=q[3][j],word=q[2];
 if(j){s.bad=j;A.sound.miss();let m;
  if(key==='egap')m=t.length===1?`${word} ends with ${q[3][0]}. The u and e are silent, but you still write them.`:`${t} is the English way. This word came from French, so the ending is ${q[3][0]}: ${word}.`;
  else m=q[1]==='sh'?`${word.replace('ch',t)} looks English. This word is French, and French spells /sh/ with ch: ${word}.`:q[1]==='sk'?`${word} is Greek: sch, with ch for the /k/ part.`:`${word} is Greek, and Greek words spell /k/ with ch: ${word}.`;
  return speak(m)}
 s.n++;s.bad=null;A.sound.pop();speak(`${word}.`+(s.n>=L.length?' All built.':''))}
/* proofreading: tap the right spelling */
function opts(){const q=FIX[G.fix.n],gp=8,h=u(58),w=Math.min(A.W-30,u(320)),rot=(G.fix.n+2)%3;return q[1].map((t,j)=>({t,j,x:A.W/2-w/2,w,h,y:A.H*.38+((j+rot)%3)*(h+gp)}))}
function drawFix(){const s=G.fix;clear();if(s.n>=FIX.length){head('All 6 spellings fixed',1);FIX.forEach((q,i)=>line(`${q[0]} → ${q[1][0]}`,A.H*(.18+i*.13),17));return}
 const q=FIX[s.n];head(`Mistake ${s.n+1} of 6: tap the right spelling`);card({...pile(),y:A.H*.15},q[0],{bg:'#ffe4e6',fg:'#881337',n:26});
 line('This is how it sounds. How is it spelt?',A.H*.15+u(58)+u(16),13);opts().forEach(r=>card(r,r.t,{n:22,rim:s.bad===r.j?WRONG:null}))}
const SLIP={dbl:'There is only one m. The /k/ part is ch, as in chorus.',k:'Greek words spell /k/ with ch, not k.',sh:'French words spell /sh/ with ch, not sh.',ee:'The /ee/ sound in machine is spelt i, the French way.',
 ue:'The ending is gue: a silent u and e after the g.',vow:'The vowels are ie: sc-ie-nce.',c:'Keep the c: sc says s before i.',ck:'This French word ends que, not ck.',u:'Keep the u in the que ending.',kh:'Greek /k/ is spelt ch, not kh.',kc:'Greek /k/ is spelt ch: chorus, not c.',ea:'The /ee/ sound in league is spelt ea.'};
function fix(j){const s=G.fix;if(s.n>=FIX.length)return;const q=FIX[s.n];if(j){s.bad=j;A.sound.miss();return speak(SLIP[q[2][j-1]])}
 s.n++;s.bad=null;A.sound.pop();speak(`${q[0]} is spelt ${q[1][0]}.`+(s.n>=FIX.length?' All 6 fixed.':''))}
function draw(){const m=mode();if(m==='quiz'){clear();head('Challenge',1);line('Greek ch · French ch · -gue · -que · sc',A.H*.5,16);return}
 if(SORT[m])drawSort(m);else if(GAPS[m])drawGap(m);else drawFix();A.fx.draw(A.ctx)}
function down(p){const m=mode();
 if(SORT[m]){if(G[m].n>=SORT[m][0].length)return false;if(inside(p,pile())){G.hold={j:0,x:p.x,y:p.y};return true}const b=trays(SORT[m][1]).find(r=>inside(p,r));if(b)sortTo(m,b.j);return false}
 if(GAPS[m]){if(G[m].n>=GAPS[m].length)return false;const r=chips(m).find(r=>inside(p,r));if(r){G.hold={j:r.j,x:p.x,y:p.y};return true}return false}
 if(m==='fix'&&G.fix.n<FIX.length){const r=opts().find(r=>inside(p,r));if(r)fix(r.j)}return false}
function move(p){if(G.hold){G.hold.x=p.x;G.hold.y=p.y;A.redraw()}}
function up(p){const m=mode(),h=G.hold;if(!h)return;G.hold=null;
 if(SORT[m]){const b=trays(SORT[m][1]).find(r=>inside(p,r));b?sortTo(m,b.j):A.redraw();return}
 if(GAPS[m]){const r=chips(m)[h.j];(inside(p,hole())||inside(p,r))?gapFill(m,h.j):A.redraw()}}
function reset(){epoch++;for(const k in G)delete G[k];Object.assign(G,{chs:{n:0},kgap:{n:0},egap:{n:0},scw:{n:0},fix:{n:0},hold:null,check:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();G.check()}
function begin(i,first,ok,msg){reset();speak(first);G.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(SORT[m]&&G[m].n<SORT[m][0].length){const [L,B]=SORT[m];B.forEach((t,j)=>b(t,()=>sortTo(m,j),`${L[G[m].n][0]}: ${t}`))}
 if(GAPS[m]&&G[m].n<GAPS[m].length)chips(m).sort((x,y)=>x.x-y.x).forEach(r=>b(r.t,()=>gapFill(m,r.j),`Fill the gap with ${r.t}`));
 if(m==='fix'&&G.fix.n<FIX.length)opts().sort((x,y)=>x.y-y.y).forEach(r=>b(r.t,()=>fix(r.j),'Spelling: '+r.t))}
const steps=[
{h:'Three sounds for ch',p:'The letters ch can say three different sounds. The sound is a clue to where the word came from. Say each word aloud, then drag it to the sound its ch makes.',
predict:{q:'In the word chorus, what sound does ch make?',opts:['ch, as in chip','k, as in kit'],ans:1},task:'Sort all 12 words',
show:()=>play(0,CHS.map(x=>()=>sortTo('chs',x[1])),380),
go:()=>begin(0,'chorus. Say it, then drag it to its sound.',()=>G.chs.n>=CHS.length,'ch says k in Greek words and sh in French words.')},
{h:'Spell the sound the Greek or French way',p:'In Greek words, /k/ is spelt ch: chemist, echo. In French words, /sh/ is spelt ch: chef, machine. Drag the spelling into the gap.',
predict:{q:'How is the /sh/ sound spelt in machine?',opts:['sh, like ship','ch, the French way'],ans:1},task:'Build all 6 words',
show:()=>play(1,KGAP.map(()=>()=>gapFill('kgap',0)),650),
go:()=>begin(1,'The gap says k. Drag the spelling that fits chemist.',()=>G.kgap.n>=KGAP.length,'Greek: ch says k. French: ch says sh.')},
{h:'French endings: -gue and -que',p:'Some words from French end with a /g/ sound spelt gue, or a /k/ sound spelt que. The u and e are silent, but you still write them. Drag the ending.',task:'Finish all 6 words',
show:()=>play(2,EGAP.map(()=>()=>gapFill('egap',0)),650),
go:()=>begin(2,'lea, then a g sound. Drag the ending that fits league.',()=>G.egap.n>=EGAP.length,'-gue says g and -que says k. Write the silent u and e.')},
{h:'Latin sc: look at the next letter',p:'Many words from Latin have sc. Before e, i or y the c is soft, so sc says s, as in science. Before a, o or u it says sk. Look at the letter after sc, then sort.',
predict:{q:'Does sc always say s?',opts:['yes, always','no: only before e, i or y'],ans:1},task:'Sort all 10 words',
show:()=>play(3,SCW.map(x=>()=>sortTo('scw',x[1])),380),
go:()=>begin(3,'science. Look at the letter after sc, then drag it.',()=>G.scw.n>=SCW.length,'Soft c before e, i or y: the c in sc is silent.')},
{h:'Proofread like a spelling detective',p:'These words are written the way they sound. Use the pattern you know to tap the right spelling.',task:'Fix all 6 mistakes',
show:()=>play(4,FIX.map(()=>()=>fix(0)),600),
go:()=>begin(4,'kemist. Tap the right spelling.',()=>G.fix.n>=FIX.length,'Sound it, then think: Greek ch, French ch, -gue, -que or sc?')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
const QS=[
{q:'Which spelling is right for a person who cooks in a restaurant?',a:'chef',o:[['shef','sh'],['cheff','dbl']]},
{q:'Which word has a Greek ch that says k?',a:'echo',o:[['chip','eng'],['chalet','fr']]},
{q:'Finish the word: a sports lea___',a:'league',o:[['leag','drop'],['leage','drop']]},
{q:'In which word does sc say sk?',a:'scarf',o:[['scene','soft'],['science','soft']]},
{q:'Which spelling is right for something one of a kind?',a:'unique',o:[['unike','eng'],['unick','eng']]},
{q:'A group singing together in a show is a…',a:'chorus',o:[['korus','k'],['corus','k']]}];
function slip(t){let m='Say it aloud and think about where it came from.';switch(t){case 'sh':m='This is a French word, so the /sh/ sound is spelt ch.';break;case 'dbl':m='No double letter at the end here.';break;
 case 'eng':m='That is the everyday English spelling. This word follows a French or Greek pattern.';break;case 'fr':m='That ch says sh: a French word, not Greek.';break;
 case 'drop':m='You dropped the silent letters. The ending is gue: write the u and e.';break;case 'soft':m='There sc comes before e or i, so it says s, not sk.';break;
 case 'k':m='Chorus is a Greek word, so its /k/ sound is spelt ch.'}return m}
function ask(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();const m=ok?'':slip(t);
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+m)+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':m)}
FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Spelling buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
