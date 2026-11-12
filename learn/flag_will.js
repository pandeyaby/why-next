/* Flagship – Simple past, present and future (ages 8–9; CCSS L.3.1e "I walked; I walk; I will walk"). */
(()=>{
const CLUE=[['yesterday',0],['every Saturday',1],['tomorrow',2],['last night',0],['usually',1],['next week',2],['two days ago',0],['always',1],['next summer',2]];
const END=['none','s','es','ies'];
const AGR=[['I','walk',0],['she','walk',1],['he','watch',2],['it','fly',3],['they','play',0],['Mum','fix',2],['the dog','play',1],['my friend','carry',3]];
const WILL=[['Tomorrow I','to school.','walk',['will walk','will walked','will walks']],['Next week she','in the sea.','swim',['will swim','will swims','will swam']],['Soon they','home.','go',['will go','will went','will goes']],['Tonight he','a story.','read',['will read','will reads','will reading']]];
const TROW=['walk','go','try'],TCOL=['Yesterday','Every day','Tomorrow'];
const CELL=[['walked','walks','will walk'],['went','goes','will go'],['tried','tries','will try']];
const ORDER=[[0,2],[1,0],[2,1],[0,0],[1,2],[2,0],[0,1],[1,1],[2,2]];
const PLAN=['Tomorrow','we','will','visit','the','zoo.','We','will','see','the','lions.','Then','we','ate','ice','cream','and','Dad','drives','us','home.'];
const SLIPS={13:'will eat',18:'will drive'};
const BUILD=[['Yesterday',['I','walked','to','school.'],['walk','will']],['Every day',['I','walk','to','school.'],['walked','will']],['Tomorrow',['I','will','walk','to','school.'],['walked','walks']],['Every day',['she','walks','to','school.'],['walk','will']]];
VIS.reg('flagwill',c=>{let A,pad,box,qn=-1,gen=0;
const S={};
const INK='#0f172a',OK='#047857',BAD='#b91c1c',RIM='#64748b',HOLD='#4338ca',CARD='#fff';
const TIME=[['#fde68a','#78350f'],['#bbf7d0','#14532d'],['#bfdbfe','#1e3a8a']],CHIP=['#f5d0fe','#701a75'];
const sz=v=>Math.round(v*(A.narrow?.94:1.08)),font=(v,w)=>`${w||800} ${sz(v)}px system-ui,sans-serif`;
const stage=()=>['clue','agr','will','table','plan','build','quiz'][A.step],hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wash(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function banner(t,y,won){const g=A.ctx;let n=15;g.font=font(n);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=font(n)}
 const w=g.measureText(t).width+26,h=sz(n)+14;g.fillStyle=won?'#d1fae5':CARD;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,9);g.fill();g.lineWidth=won?2.5:1.3;g.strokeStyle=won?OK:RIM;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,11);g.fill();g.lineWidth=o.rim?3.5:1.5;g.strokeStyle=o.rim||RIM;g.stroke();
 if(t==null)return;g.fillStyle=o.fg||INK;g.font=font(o.n||18,o.w||800);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)}
function note(t,y,n,col){const g=A.ctx;g.fillStyle=col||A.col.tx;g.font=font(n||14,650);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-14)}
const moved=(r,j)=>{const h=S.hold;return h&&h.j===j?{...r,x:h.x-r.w/2,y:h.y-r.h/2}:r};const lit=(r,s)=>S.hold&&S.hold.j===r.j?HOLD:s.bad===r.j?BAD:null;
const queue=()=>{const w=Math.min(A.W-40,sz(250));return{x:A.W/2-w/2,y:A.H*.15,w,h:sz(52)}};
function bins(y){const gp=7,w=(A.W-20-gp*2)/3;return TCOL.map((t,j)=>({x:10+j*(w+gp),y,w,h:A.H-y-8,j,t:['Past','Present','Future'][j]}))}
function drawClue(){const s=S.clue,g=A.ctx;wash();banner(s.n>=CLUE.length?'All 9 time clues sorted':`Clue ${s.n+1} of 9: when does it happen?`,A.H*.07,s.n>=CLUE.length);
 bins(A.H*.4).forEach(b=>{g.fillStyle=TIME[b.j][0];A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=s.bad===b.j?BAD:TIME[b.j][1];g.lineWidth=s.bad===b.j?4:2;g.stroke();
  g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';g.font=font(15,800);g.fillText(b.t,b.x+b.w/2,b.y+6,b.w-6);g.font=font(12,600);
  CLUE.slice(0,s.n).filter(x=>x[1]===b.j).forEach((x,i)=>g.fillText(x[0],b.x+b.w/2,b.y+sz(27)+i*sz(17),b.w-6))});
 if(s.n<CLUE.length)tile(moved(queue(),0),CLUE[s.n][0],{rim:S.hold?HOLD:null,n:18})}
function clue(j){const s=S.clue;if(s.n>=CLUE.length)return;const [t,k]=CLUE[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return tell(`${t}: `+[`it is over, so past: I walked.`,`again and again, a habit, so present: I walk.`,`not yet, so future: I will walk.`][k])}
 s.n++;s.bad=null;A.sound.pop();tell(`${t}: ${['past','present','future'][k]}.`+(s.n>=CLUE.length?' All 9 sorted.':''))}
function endKeys(){const gp=6,w=Math.min(sz(118),(A.W-16-gp*3)/4),h=sz(52),tot=4*w+3*gp;return END.map((t,j)=>({x:A.W/2-tot/2+j*(w+gp),y:A.H*.66,w,h,t:j?'+'+t:t,j}))}
function drawAgr(){const s=S.agr;wash();if(s.n>=AGR.length){banner('All 8 present verbs built',A.H*.07,1);[0,4].forEach((o,i)=>note(AGR.slice(o,o+4).map(q=>`${q[0]} ${form(q)}`).join(' · '),A.H*(.35+i*.2),13));return}
 const q=AGR[s.n];banner(`Verb ${s.n+1} of 8: every day…`,A.H*.07);const w=Math.min(A.W-30,sz(300));
 tile({x:A.W/2-w/2,y:A.H*.2,w,h:sz(62)},`${q[0]} ${q[1]}___`,{bg:TIME[1][0],fg:TIME[1][1],n:24,rim:s.bad!=null?BAD:null});
 note(/^(I|they)$/.test(q[0])?'Not he, she or it.':'One person or thing: he, she or it.',A.H*.48,14);
 endKeys().forEach(r=>tile(moved(r,r.j),r.t,{bg:CHIP[0],fg:CHIP[1],n:17,rim:lit(r,s)}))}
function form(q){const [,v,k]=q;return k===3?v.slice(0,-1)+'ies':v+['','s','es'][k]}
function agr(j){const s=S.agr;if(s.n>=AGR.length)return;const q=AGR[s.n],[who,v,k]=q;
 if(j!==k){s.bad=j;A.sound.miss();return tell(k===0?`With ${who}, the present verb has no ending: ${who} ${v}.`:j===0?`${who} is one, so add an ending: ${who} ${form(q)}.`:k===3?`Consonant then y: change y to i, add es: ${form(q)}.`:k===2?`${v} ends in ${v.match(/(ch|sh|x|z|s)$/)[0]}, so add es: ${form(q)}.`:/y$/.test(v)?`Vowel then y: just add s: ${form(q)}.`:`Just add s: ${form(q)}.`)}
 s.n++;s.bad=null;A.sound.pop();tell(`${who} ${form(q)}.`+(s.n>=AGR.length?' All 8 built.':''))}
function willTiles(){const n=WILL[S.will.n][3].length,gp=7,w=Math.min(sz(150),(A.W-16-gp*(n-1))/n),h=sz(54),tot=n*w+(n-1)*gp,rot=(S.will.n+1)%3;
 return WILL[S.will.n][3].map((t,j)=>({t,j,w,h,y:A.H*.68,x:A.W/2-tot/2+((j+rot)%n)*(w+gp)}))}
function gapBox(){const w=Math.min(sz(170),A.W*.42);return{x:A.W/2-w/2,y:A.H*.34,w,h:sz(52)}}
function drawWill(){const s=S.will;wash();if(s.n>=WILL.length){banner('All 4 done',A.H*.07,1);WILL.forEach((q,i)=>note(`${q[0]} ${q[3][0]} ${q[1]}`,A.H*(.22+i*.16),17));return}
 const q=WILL[s.n];banner(`Sentence ${s.n+1} of 4: verb ${q[2]}`,A.H*.07);note(q[0],A.H*.25,20,A.col.tx);tile(gapBox(),'?',{rim:s.bad!=null?BAD:HOLD,n:22});note(q[1],A.H*.34+sz(52)+sz(20),20);
 willTiles().forEach(r=>tile(moved(r,r.j),r.t,{bg:TIME[2][0],fg:TIME[2][1],n:17,rim:lit(r,s)}))}
function will(j){const s=S.will;if(s.n>=WILL.length)return;const q=WILL[s.n],t=q[3][j];
 if(j){s.bad=j;A.sound.miss();return tell(/s$/.test(t)?`After will, no s, even for she: ${q[3][0]}.`:/ing$/.test(t)?`After will, no -ing: ${q[3][0]}.`:`${t.split(' ')[1]} is past. After will, use the plain verb: ${q[3][0]}.`)}
 s.n++;s.bad=null;A.sound.pop();tell(`${q[0]} ${q[3][0]} ${q[1]}`+(s.n>=WILL.length?' All 4 done.':''))}
function grid(){const top=A.H*.3,lw=Math.min(sz(64),A.W*.17),cw=(A.W-16-lw)/3,ch=Math.min(sz(54),(A.H-top-10)/3.4);
 return{top,lw,cw,ch,cell:(r,k)=>({x:8+lw+k*cw+2,y:top+sz(22)+r*(ch+4),w:cw-4,h:ch,r,k})}}
function drawTable(){const s=S.table,G=grid(),g=A.ctx;wash();const left=ORDER.length-s.n;banner(left?`Tile ${s.n+1} of 9: drop it in the table`:'Tense table complete',A.H*.06,!left);
 if(left){const r=queue();tile(moved({...r,y:A.H*.12},0),'she '+CELL[ORDER[s.n][0]][ORDER[s.n][1]],{rim:S.hold?HOLD:null,n:19})}
 g.font=font(12,800);g.textAlign='center';g.textBaseline='middle';TCOL.forEach((t,k)=>{g.fillStyle=A.col.tx;g.fillText(t,8+G.lw+k*G.cw+G.cw/2,G.top+sz(10),G.cw-4)});
 TROW.forEach((v,r)=>{g.fillStyle=A.col.tx;g.textAlign='left';g.font=font(13,800);g.fillText(v,8,G.top+sz(22)+r*(G.ch+4)+G.ch/2);
  TCOL.forEach((_,k)=>{const filled=s.got[r+','+k],b=s.bad&&s.bad[0]===r&&s.bad[1]===k;tile(G.cell(r,k),filled?CELL[r][k]:'',{bg:filled?TIME[k][0]:CARD,fg:TIME[k][1],n:14,rim:b?BAD:null})})})}
function table(r,k){const s=S.table;if(s.n>=ORDER.length)return;const [R,K]=ORDER[s.n],t=CELL[R][K];
 if(r!==R||k!==K){s.bad=[r,k];A.sound.miss();return tell(r!==R?`${t} is a form of ${TROW[R]}, not ${TROW[r]}.`:K===0?`${t} is the past. It goes under Yesterday.`:K===1?`${t}: s for she, no will. That is Every day.`:`will shows the future. It goes under Tomorrow.`)}
 s.got[R+','+K]=1;s.n++;s.bad=null;A.sound.pop();tell(`She ${t}: ${TCOL[K].toLowerCase()}.`+(s.n>=ORDER.length?' Table complete.':''))}
function flow(items,y,h,gp){const g=A.ctx,out=[];let row=[],x=0;const put=()=>{const t=row.reduce((a,r)=>a+r.w,0)+gp*(row.length-1);let xx=A.W/2-t/2;row.forEach(r=>{r.x=xx;xx+=r.w+gp;out.push(r)});row=[]};
 items.forEach(o=>{const w=g.measureText(o.t).width+o.pad;if(x+w>A.W-14&&row.length){put();x=0;y+=h+7}row.push({...o,w,h,y});x+=w+gp});put();return out}
function words(){A.ctx.font=font(16,700);return flow(PLAN.map((t,i)=>({t:S.plan.fix[i]?SLIPS[i]:t,i,pad:14})),A.H*.17,sz(38),5)}
function drawPlan(){const s=S.plan,n=Object.keys(s.fix).length;wash();banner(n>=2?'All in the future':`Tap the 2 slips (${n} fixed)`,A.H*.07,n>=2);
 words().forEach(r=>tile(r,r.t,{n:16,w:700,bg:s.fix[r.i]?'#d1fae5':s.bad===r.i?'#ffe4e6':CARD,fg:s.fix[r.i]?OK:INK,rim:s.fix[r.i]?OK:s.bad===r.i?BAD:null}));if(s.last)note(s.last,A.H*.9,15)}
function plan(i){const s=S.plan;if(Object.keys(s.fix).length>=2||s.fix[i])return;const w=PLAN[i].replace('.','');
 if(!(i in SLIPS)){s.bad=i;A.sound.miss();return tell(/^(will|visit|see)$/.test(w)?`${w} is already in the future.`:`${w} is not a verb.`)}
 s.fix[i]=1;s.bad=null;s.last=`${w} → ${SLIPS[i]}`;A.sound.pop();tell(`${w} → ${SLIPS[i]}.`+(Object.keys(s.fix).length>=2?' Done.':''))}
function chips(){const q=BUILD[S.build.n],all=q[1].slice(0,2).concat(q[2]).concat(q[1].slice(2)),u=S.build.used,list=all.map((t,i)=>({t,i,pad:26})).filter(o=>!u.includes(o.i)),r=(S.build.n+2)%list.length;
 A.ctx.font=font(17,800);return{out:flow(list.slice(r).concat(list.slice(0,r)),A.H*.62,sz(50),7),all}}
function drawBuild(){const s=S.build;wash();if(s.n>=BUILD.length){banner('All 4 built',A.H*.07,1);BUILD.forEach((q,i)=>note(`${q[0]}, ${q[1].join(' ')}`,A.H*(.22+i*.16),17));return}
 const q=BUILD[s.n],{out,all}=chips();banner(`${s.n+1} of 4: ${q[0]}, …`,A.H*.07);
 const said=s.used.map(i=>all[i]).join(' ');const w=Math.min(A.W-20,sz(380));tile({x:A.W/2-w/2,y:A.H*.24,w,h:sz(60)},said||'tap the words in order',{bg:TIME[q[0]==='Yesterday'?0:q[0]==='Tomorrow'?2:1][0],n:said?19:15,w:said?800:600,rim:s.bad?BAD:null});
 note('I walk to school.',A.H*.47,13);out.forEach(r=>tile(r,r.t,{bg:CHIP[0],fg:CHIP[1],n:17}))}
function build(i){const s=S.build;if(s.n>=BUILD.length)return;const q=BUILD[s.n],{all}=chips(),want=q[1][s.used.length],t=all[i];
 if(t!==want){s.bad=1;A.sound.miss();return tell(want==='will'?`${q[0]} needs will first.`:t==='will'?`${q[0]} is not the future: no will.`:/ed$/.test(t)?`${q[0]} is not the past, so not ${t}.`:t==='walks'?`With I, use walk, not walks.`:t==='walk'&&want==='walks'?`she needs s: she walks.`:`${q[0]} is the past: walked.`)}
 s.used.push(i);s.bad=0;A.sound.tick();if(s.used.length>=q[1].length){s.n++;s.used=[];A.sound.pop();tell(`${q[0]}, ${q[1].join(' ')}`+(s.n>=BUILD.length?' All 4 built.':''))}else tell(s.used.map(k=>all[k]).join(' ')+' …')}
function draw(){const k=stage();if(k==='quiz'){wash();banner('Challenge',A.H*.25,1);banner('I walked · I walk · I will walk',A.H*.55);return}
 ({clue:drawClue,agr:drawAgr,will:drawWill,table:drawTable,plan:drawPlan,build:drawBuild})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage(),grab=j=>{S.hold={j,x:p.x,y:p.y};return true};
 if(k==='clue'&&S.clue.n<CLUE.length){if(p.y>A.H*.12&&p.y<A.H*.36)return grab(0);const b=bins(A.H*.4).find(r=>hit(p,r));if(b)clue(b.j);return false}
 if(k==='agr'&&S.agr.n<AGR.length){const r=endKeys().find(r=>hit(p,r));return r?grab(r.j):false}
 if(k==='will'&&S.will.n<WILL.length){const r=willTiles().find(r=>hit(p,r));return r?grab(r.j):false}
 if(k==='table'&&S.table.n<ORDER.length){if(p.y<A.H*.27)return grab(0);const G=grid();for(let r=0;r<3;r++)for(let q=0;q<3;q++)if(hit(p,G.cell(r,q))){table(r,q);return false}return false}
 if(k==='plan'){const r=words().find(r=>hit(p,r));if(r)plan(r.i);return false}
 if(k==='build'&&S.build.n<BUILD.length){const r=chips().out.find(r=>hit(p,r));if(r)build(r.i)}return false}
function move(p){if(S.hold){S.hold.x=p.x;S.hold.y=p.y;A.redraw()}}
function up(p){const h=S.hold;if(!h)return;S.hold=null;const k=stage();
 if(k==='clue'){const b=bins(A.H*.4).find(r=>hit(p,r));b?clue(b.j):A.redraw();return}
 if(k==='agr'){p.y<A.H*.6||hit(p,endKeys()[h.j])?agr(h.j):A.redraw();return}
 if(k==='will'){hit(p,gapBox())||p.y<A.H*.6||hit(p,willTiles()[h.j])?will(h.j):A.redraw();return}
 if(k==='table'){const G=grid();for(let r=0;r<3;r++)for(let q=0;q<3;q++)if(hit(p,G.cell(r,q)))return table(r,q);A.redraw()}}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{clue:{n:0},agr:{n:0},will:{n:0},table:{n:0,got:{}},plan:{fix:{}},build:{n:0,used:[]},hold:null,check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
function begin(i,desc,ok,msg){reset();tell(desc);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=stage(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='clue'&&S.clue.n<CLUE.length)['Past','Present','Future'].forEach((t,j)=>b(t,()=>clue(j),`${CLUE[S.clue.n][0]}: ${t}`));
 if(k==='agr'&&S.agr.n<AGR.length){const q=AGR[S.agr.n];END.forEach((t,j)=>b(j?'+'+t:t,()=>agr(j),`${q[0]} ${q[1]}, ${t}`))}
 if(k==='will'&&S.will.n<WILL.length)WILL[S.will.n][3].forEach((t,j)=>b(t,()=>will(j),`${WILL[S.will.n][0]} ${t} ${WILL[S.will.n][1]}`));
 if(k==='table'&&S.table.n<ORDER.length)TROW.forEach((v,r)=>TCOL.forEach((t,q)=>b(`${v}: ${t}`,()=>table(r,q),`${v}, ${t}`)));
 if(k==='plan'&&Object.keys(S.plan.fix).length<2)PLAN.forEach((t,i)=>{if(!S.plan.fix[i])b(t.replace('.',''),()=>plan(i),`Fix ${t.replace('.','')}`)});
 if(k==='build'&&S.build.n<BUILD.length)chips().out.forEach(r=>b(r.t,()=>build(r.i),`Add ${r.t}`))}
const steps=[
{h:'Time clues',p:'Time clues like yesterday, every Saturday and tomorrow tell you when. Past: it is over. Present: it happens again and again, like a habit. Future: it has not happened yet.',
predict:{q:'"Every Monday I ride my bike." When is this?',opts:['only right now','again and again'],ans:1},task:'Sort all 9 clues',
show:()=>play(0,CLUE.map(x=>()=>clue(x[1])),420),
go:()=>begin(0,'yesterday. Drag it to Past, Present or Future.',()=>S.clue.n>=CLUE.length,'Habits use the simple present: I walk.')},
{h:'Present: he, she, it get an ending',p:'In the simple present, I, you, we and they use the plain verb: we jump. He, she, it or one person adds s: she walks. Add es after ch, sh, s, x or z: he watches. A consonant then y changes to ies: it flies.',
predict:{q:'"My friend ___ every bag." (carry)',opts:['carrys','carries'],ans:1},task:'Build all 8 verbs',
show:()=>play(1,AGR.map(x=>()=>agr(x[2])),500),
go:()=>begin(1,'I walk, gap. Drag an ending onto the verb.',()=>S.agr.n>=AGR.length,'s, es or ies only for he, she and it.')},
{h:'Future: will + the plain verb',p:'The simple future is will and the plain verb, with no ending: I will walk, she will walk, they will go. Drag the right words into the gap.',
predict:{q:'"Tomorrow she ___ to the park."',opts:['will goes','will go'],ans:1},task:'Finish all 4 sentences',
show:()=>play(2,WILL.map(()=>()=>will(0)),700),
go:()=>begin(2,'Tomorrow I, gap, to school. Drag the right words.',()=>S.will.n>=WILL.length,'will is always followed by the plain verb.')},
{h:'The tense table',p:'Each verb has a form for each time: she walked, she walks, she will walk. Some past forms are odd, like went. Drag each tile to its row and column.',task:'Fill all 9 boxes',
show:()=>play(3,ORDER.map(([r,k])=>()=>table(r,k)),520),
go:()=>begin(3,'she walks. Drag it to its verb row and time column.',()=>S.table.n>=ORDER.length,'Past: -ed or odd. Present: s. Future: will.')},
{h:'Keep the plan in one time',p:'Leila wrote her plan for tomorrow, but two verbs slip out of the future. Tap each one to fix it.',task:'Fix both slips',
show:()=>play(4,Object.keys(SLIPS).map(i=>()=>plan(+i)),800),
go:()=>begin(4,PLAN.join(' ')+' Tap the two slips.',()=>Object.keys(S.plan.fix).length>=2,'Then we will eat ice cream and Dad will drive us home.')},
{h:'One sentence, three times',p:'Start from I walk to school. Change only the verb for each time clue. Tap the words in order.',task:'Build all 4 sentences',
go:()=>begin(5,'Yesterday. Tap the words to build the sentence.',()=>S.build.n>=BUILD.length,'Only the verb changes: walked, walk, will walk, walks.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps[5].show=()=>{steps[5].go();const me=gen;let t=0;BUILD.forEach((q,n)=>{const all=q[1].slice(0,2).concat(q[2]).concat(q[1].slice(2));q[1].forEach((w,j)=>{t+=180;setTimeout(()=>{if(me!==gen)return;const idx=all.findIndex((x,i)=>x===w&&!S.build.used.includes(i));build(idx)},t)})})};
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'Which sentence is in the future?',a:'We will swim later.',o:[['We swam later.','past'],['We will swam later.','willed']]},
{q:'Every day the baby ___ . (cry)',a:'cries',o:[['crys','y'],['cry','noend']]},
{q:'Fix the slip: "Yesterday she walks to the shop and bought milk."',a:'walked',o:[['will walk','future'],['walks','keep']]},
{q:'Tomorrow he ___ his gran. (visit)',a:'will visit',o:[['will visits','wills'],['visited','past']]},
{q:'Every morning the fox ___ the bins. (search)',a:'searches',o:[['searchs','es'],['searched','past']]},
{q:'Which clue goes with the present?',a:'usually',o:[['last week','past'],['next year','future']]}];
function why(t){let m='Look at the time clue first.';switch(t){case 'past':m='That is the past. Check the time clue.';break;case 'willed':m='After will, use the plain verb: will swim.';break;case 'wills':m='The verb after will never takes s: he will visit.';break;case 'y':m='Consonant then y: change y to i, add es: cries.';break;case 'noend':m='The baby is one person, so add an ending: cries.';break;case 'future':m='Yesterday means it is over, like bought: walked.';break;case 'keep':m='walks is present, but yesterday and bought are past: walked.';break;case 'es':m='search ends in ch, so add es: searches.'}return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();let m=ok?'':why(t);
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+m)+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':m)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{box.hidden=B.step!==6;pad.hidden=B.step===6;buttons()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Verb buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
