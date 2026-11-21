/* Flagship – synthesising across multiple texts (ages 10–11; CCSS RI.5.9, W.5.8). Hedgehogs from a book, a website and
   a leaflet: sort facts by idea, join two sources in one sentence, fit a range to two sources, test own words with a
   copy meter, build a paragraph with a source list. Every move has a button. Data and helpers in learn/synth_art.js. */
(()=>{const {SRC,FACTS,IDEAS,JOIN,RANGE,OWN,PARA,QS}=SYN;
VIS.reg('flagsynth',c=>{let A,pad,quiz,turn=-1,era=0;const G={};
const TXT='#0f172a',GOOD='#047857',SLIP='#b91c1c',LINE='#64748b',SEL='#6d28d9',PAPER='#ffffff',TINT={A:'#dcfce7',B:'#dbeafe',C:'#fee2e2'};
const ORDER=['group','join','range','own','para','quiz'],at=()=>ORDER[A.step];
const px=n=>Math.round(n*(A.narrow?1:1.1)),font=(n,w)=>`${w||700} ${px(n)}px system-ui,sans-serif`;
const hit=(p,b)=>!!b&&p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h;
const {words,copied,rangeSays,JOINWHY}=SYNF;
function flow(t,b,o){o=o||{};const g=A.ctx,W=words(t);let n=px(o.n||12)+1,rows;
 do{n--;g.font=`${o.w||700} ${n}px system-ui,sans-serif`;rows=[[]];let x=0;W.forEach((w,i)=>{const ww=g.measureText(w+' ').width;if(x+ww>b.w-14&&rows[rows.length-1].length){rows.push([]);x=0}rows[rows.length-1].push([w,i,x,ww]);x+=ww})}
 while(rows.length*(n+5)>b.h-8&&n>9);
 const lh=n+5,top=b.y+b.h/2-(rows.length*lh)/2+lh/2;g.textBaseline='middle';g.textAlign='left';
 rows.forEach((r,k)=>{const span=r.reduce((s,q)=>s+q[3],0),x0=o.left?b.x+7:b.x+(b.w-span)/2,y=top+k*lh;
  r.forEach(([w,i,x,ww])=>{if(o.hot&&o.hot[i]){g.fillStyle='#fecaca';g.fillRect(x0+x-1,y-lh/2+1,ww,lh-2)}g.fillStyle=o.hot&&o.hot[i]?'#7f1d1d':TXT;g.fillText(w,x0+x,y)})})}
function card(b,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||PAPER;A.paint.rrect(b.x,b.y,b.w,b.h,9);g.fill();g.setLineDash(o.dash?[6,4]:[]);
 g.lineWidth=o.ring?3.5:1.5;g.strokeStyle=o.ring==='ok'?GOOD:o.ring==='no'?SLIP:o.ring==='sel'?SEL:LINE;g.stroke();g.setLineDash([]);if(t)flow(t,b,o)}
function chip(src,x,y){const g=A.ctx,[ic]=SRC[src];g.font=font(11,800);const w=g.measureText(ic+' '+src).width+10;g.fillStyle=TINT[src];A.paint.rrect(x,y,w,px(16),6);g.fill();g.fillStyle=TXT;g.textAlign='left';g.textBaseline='middle';g.fillText(ic+' '+src,x+5,y+px(8));return w}
function fact(b,f,o){o=o||{};card(b,'',o);chip(f[0],b.x+4,b.y+4);flow(f[1],{x:b.x,y:b.y+px(14),w:b.w,h:b.h-px(14)},{n:o.n||11})}
function head(t,ok){card({x:8,y:8,w:A.W-16,h:px(30)},t,{bg:ok?'#d1fae5':'#ede9fe',ring:ok?'ok':null,n:13,w:800})}
function ground(){const g=A.ctx;g.fillStyle=A.col.dark?'#172033':'#f5f3ff';g.fillRect(0,0,A.W,A.H)}
function grid(n,y,h,cols){cols=cols||(A.narrow?2:3);const rows=Math.ceil(n/cols);h=Math.min(h,(A.H-y-6)/rows-8);const gap=8,w=(A.W-16-gap*(cols-1))/cols;return Array.from({length:n},(_,i)=>({x:8+(i%cols)*(w+gap),y:y+Math.floor(i/cols)*(h+gap),w,h}))}
function row(n,y,h){return grid(n,y,h,n)}
const gBins=()=>A.narrow?IDEAS.map((_,j)=>({x:8,y:px(30)+16+j*(A.H*.15+6),w:A.W-16,h:A.H*.15})):row(3,px(30)+16,A.H*.34),gCards=()=>{const b=gBins()[2];return grid(FACTS.length,b.y+b.h+10,px(62))};
function drawGroup(){const s=G.group,full=s.put.every(v=>v!=null);head(full?'Each idea now joins two sources':'Drag each fact to its idea',full);
 gBins().forEach((b,j)=>{card(b,'',{bg:'#ffffff',dash:true,ring:s.hot===j?'sel':null});const g=A.ctx;g.font=font(13,800);g.fillStyle=TXT;g.textAlign='center';g.textBaseline='top';g.fillText(IDEAS[j].join(' '),b.x+b.w/2,b.y+6);
  const mine=FACTS.map((f,i)=>[f,i]).filter(([,i])=>s.put[i]===j);mine.forEach(([f],m)=>{const r=A.narrow?{x:b.x+4+m*(b.w-8)/2,y:b.y+px(22),w:(b.w-8)/2-4,h:b.h-px(22)-4}:{x:b.x+4,y:b.y+px(24)+m*((b.h-px(28))/2),w:b.w-8,h:(b.h-px(28))/2-4};fact(r,f,{bg:TINT[f[0]],n:10})})});
 gCards().forEach((b,i)=>{if(s.put[i]!=null||(G.drag&&G.drag.i===i))return;const f=FACTS[i];fact(b,f,{bg:TINT[f[0]],ring:s.bad===i?'no':s.sel===i?'sel':null,n:11})});
 if(G.drag){const f=FACTS[G.drag.i],b=gCards()[0];fact({x:G.drag.x-b.w/2,y:G.drag.y-b.h/2,w:b.w,h:b.h},f,{bg:TINT[f[0]],ring:'sel',n:11})}}
function group(i,j){const s=G.group,f=FACTS[i];if(s.put[i]!=null)return;s.sel=null;
 if(f[2]!==j){s.bad=i;A.sound.miss();return say(`That fact is about ${IDEAS[f[2]][1].toLowerCase()}, not ${IDEAS[j][1].toLowerCase()}. Sort by what it is about, not by which source it came from.`)}
 s.put[i]=j;s.bad=null;A.sound.pop();const two=FACTS.filter((q,k)=>s.put[k]===j).map(q=>q[0]);
 say(two.length===2?`${IDEAS[j][1]}: one fact from ${two[0]} and one from ${two[1]}. Two sources, one idea.`:`${IDEAS[j][1]}: from source ${f[0]}.`)}
const jTop=()=>row(2,px(30)+16,A.H*.2),jBox=()=>({x:8,y:px(30)+24+A.H*.2,w:A.W-16,h:A.H*.17}),jOpts=()=>grid(3,px(30)+36+A.H*.37,Math.min(px(70),A.H*.17),A.narrow?1:3);
function drawJoin(){const s=G.join;if(s.k>=JOIN.length){head('3 ideas, each joined from 2 sources',true);JOIN.forEach((J,j)=>card({x:8,y:px(30)+20+j*(A.H*.2),w:A.W-16,h:A.H*.17},J.opts.find(o=>o[1]==='ok')[0],{bg:'#ecfdf5',ring:'ok'}));return}
 const J=JOIN[s.k],pair=FACTS.filter(f=>f[2]===J.idea);head(`Idea ${s.k+1} of 3: ${IDEAS[J.idea].join(' ')}. Join the two facts`);
 jTop().forEach((b,m)=>fact(b,pair[m],{bg:TINT[pair[m][0]],n:11}));
 card(jBox(),s.hot?'Drop it here':'✏️ Your sentence',{dash:true,ring:s.hot?'sel':null,n:12,w:600});
 jOpts().forEach((b,m)=>{if(G.drag&&G.drag.i===m)return;card(b,J.opts[m][0],{ring:s.bad===m?'no':s.sel===m?'sel':null,n:12})});
 if(G.drag){const b=jOpts()[0];card({x:G.drag.x-b.w/2,y:G.drag.y-b.h/2,w:b.w,h:b.h},J.opts[G.drag.i][0],{ring:'sel',n:12})}}
function join(m){const s=G.join;if(s.k>=JOIN.length||s.wait)return;const J=JOIN[s.k],o=J.opts[m];s.sel=null;
 if(o[1]!=='ok'){s.bad=m;A.sound.miss();return say(JOINWHY[o[1]])}
 s.bad=null;A.sound.pop();s.k++;say(`Joined: ${o[0]}`+(s.k<JOIN.length?' Next idea.':' All three ideas joined.'))}
const rLine=()=>{const y=A.H*.55,x0=30,x1=A.W-30;return{y,x0,x1,at:v=>x0+(x1-x0)*v/RANGE.max,of:x=>Math.round(Math.max(0,Math.min(RANGE.max,(x-x0)/(x1-x0)*RANGE.max))*2)/2}};
function drawRange(){const s=G.range,L=rLine(),g=A.ctx,ok=s.lo===RANGE.a[2]&&s.hi===RANGE.b[2];head(ok?'A range that fits both sources':'Drag the two handles to fit both sources',ok);
 row(2,px(30)+16,A.H*.2).forEach((b,m)=>{const f=m?RANGE.b:RANGE.a;fact(b,f,{bg:TINT[f[0]],n:12})});
 g.strokeStyle=A.col.dark?'#cbd5e1':'#334155';g.lineWidth=3;g.beginPath();g.moveTo(L.x0,L.y);g.lineTo(L.x1,L.y);g.stroke();
 for(let v=0;v<=RANGE.max;v+=.5){const x=L.at(v);g.beginPath();g.moveTo(x,L.y-(v%1?5:9));g.lineTo(x,L.y+(v%1?5:9));g.stroke();if(v%1===0){g.font=font(12,800);g.fillStyle=A.col.dark?'#e2e8f0':TXT;g.textAlign='center';g.textBaseline='top';g.fillText(v+' km',x,L.y+12)}}
 g.fillStyle=ok?'#34d399':'#a78bfa';g.fillRect(L.at(s.lo),L.y-7,L.at(s.hi)-L.at(s.lo),14);
 [['lo',s.lo],['hi',s.hi]].forEach(([k,v])=>{const x=L.at(v);g.fillStyle=G.grab===k?SEL:'#ffffff';g.strokeStyle=SEL;g.lineWidth=3;g.beginPath();g.arc(x,L.y,px(13),0,7);g.fill();g.stroke();g.fillStyle=G.grab===k?'#fff':TXT;g.font=font(10,900);g.textAlign='center';g.textBaseline='middle';g.fillText(k==='lo'?'from':'to',x,L.y)});
 card({x:8,y:A.H*.7,w:A.W-16,h:A.H*.13},`Hedgehogs travel about ${s.lo===s.hi?s.lo:s.lo+' to '+s.hi} km a night.`,{bg:ok?'#ecfdf5':'#ffffff',ring:ok?'ok':null,n:13})}
function setRange(k,v){const s=G.range;v=Math.max(0,Math.min(RANGE.max,v));if(k==='lo')s.lo=Math.min(v,s.hi);else s.hi=Math.max(v,s.lo);s.moves++;A.sound.tick();
 say(rangeSays(s.lo,s.hi))}
const oSrc=()=>({x:8,y:px(30)+16,w:A.W-16,h:A.H*.16}),oMeter=()=>({x:8,y:px(30)+22+A.H*.16,w:A.W-16,h:A.H*.25}),oOpts=()=>grid(3,px(30)+30+A.H*.41,Math.min(px(66),A.H*.16),A.narrow?1:3);
function drawOwn(){const s=G.own;if(s.k>=OWN.length){head('Your own words, and the source is named',true);OWN.forEach((O,j)=>card({x:8,y:px(30)+20+j*(A.H*.3),w:A.W-16,h:A.H*.26},O.opts.find(o=>o[1]==='ok')[0],{bg:'#ecfdf5',ring:'ok'}));return}
 const O=OWN[s.k],g=A.ctx;head(`Sentence ${s.k+1} of 2: tap a choice to test it, then use your own words`);
 fact(oSrc(),O.src,{bg:TINT[O.src[0]],n:12});
 const mb=oMeter(),pick=s.look==null?null:O.opts[s.look][0];card(mb,'',{bg:'#ffffff',dash:!pick,ring:s.hot?'sel':null});
 if(pick){const hot=copied(pick,O.src[1]),n=hot.filter(Boolean).length,pct=Math.round(100*n/hot.length);
  card({x:mb.x+4,y:mb.y+4,w:mb.w-8,h:mb.h-px(30)},pick,{hot,n:12,ring:'sel'});
  const bw=mb.w-110,by=mb.y+mb.h-px(20);g.fillStyle='#e2e8f0';g.fillRect(mb.x+8,by,bw,10);g.fillStyle=pct>40?SLIP:pct>0?'#d97706':GOOD;g.fillRect(mb.x+8,by,bw*pct/100,10);
  g.font=font(11,800);g.fillStyle=TXT;g.textAlign='left';g.textBaseline='middle';g.fillText(`Copied: ${pct}%`,mb.x+bw+14,by+5)}
 else{g.font=font(12,700);g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText('🔍 Copy meter: tap a sentence below',mb.x+mb.w/2,mb.y+mb.h/2)}
 oOpts().forEach((b,m)=>{if(G.drag&&G.drag.i===m)return;card(b,O.opts[m][0],{ring:s.bad===m?'no':s.look===m?'sel':null,n:11})});
 if(G.drag){const b=oOpts()[0];card({x:G.drag.x-b.w/2,y:G.drag.y-b.h/2,w:b.w,h:b.h},O.opts[G.drag.i][0],{ring:'sel',n:11})}}
function look(m){const s=G.own;if(s.k>=OWN.length)return;s.look=m;s.bad=null;A.sound.tick();const O=OWN[s.k],hot=copied(O.opts[m][0],O.src[1]);
 say(`Testing: ${O.opts[m][0]} Copied: ${Math.round(100*hot.filter(Boolean).length/hot.length)}% of its words come in runs of 3 or more from the source.`)}
function useOwn(m){const s=G.own;if(s.k>=OWN.length)return;const O=OWN[s.k],o=O.opts[m];s.look=m;
 if(o[1]!=='ok'){s.bad=m;A.sound.miss();return say(o[1]==='copy'?'That is copied word for word. Say it in your own words.':'Swapping one word is still copying. Change the whole sentence, and say where it came from.')}
 s.bad=null;s.k++;s.look=null;A.sound.pop();say(`Used: ${o[0]} New words, and it names the source.`+(s.k<OWN.length?' Next sentence.':''))}
const pSlots=()=>{const h=Math.min(px(58),A.H*.13);return PARA.slots.map((_,j)=>({x:8,y:px(30)+16+j*(h+6),w:A.W-16,h}))},pCards=()=>{const t=pSlots()[3];return grid(4,t.y+t.h+12,Math.min(px(60),A.H*.13),2)};
function drawPara(){const s=G.para,full=s.put.every(v=>v!=null);head(full?'One paragraph, three sources, credited':'Build the paragraph: drag each sentence to its job',full);const g=A.ctx;
 pSlots().forEach((b,j)=>{const i=s.put.indexOf(j);card(b,'',{bg:i>=0?'#ecfdf5':'#ffffff',dash:i<0,ring:i>=0?'ok':s.hot===j?'sel':null});
  g.font=font(10,800);g.fillStyle=SEL;g.textAlign='left';g.textBaseline='top';g.fillText(`${j+1}. ${PARA.slots[j]}`,b.x+8,b.y+4);
  if(i>=0)flow(PARA.items[i][0],{x:b.x,y:b.y+px(12),w:b.w,h:b.h-px(12)},{n:11,left:true})});
 if(full)return;pCards().forEach((b,i)=>{if(s.put[i]!=null||(G.drag&&G.drag.i===i))return;card(b,PARA.items[i][0],{ring:s.bad===i?'no':s.sel===i?'sel':null,n:10})});
 if(G.drag){const b=pCards()[0];card({x:G.drag.x-b.w/2,y:G.drag.y-b.h/2,w:b.w,h:b.h},PARA.items[G.drag.i][0],{ring:'sel',n:10})}}
function para(i,j){const s=G.para,it=PARA.items[i];if(s.put[i]!=null)return;s.sel=null;
 if(it[1]!==j){s.bad=i;A.sound.miss();return say(`That sentence is the ${PARA.slots[it[1]].toLowerCase()}, not the ${PARA.slots[j].toLowerCase()}.`)}
 s.put[i]=j;s.bad=null;A.sound.pop();say(s.put.every(v=>v!=null)?PARA.slots.map((_,q)=>PARA.items[s.put.indexOf(q)][0]).join(' '):`${PARA.slots[j]}: ${it[0]}`)}
const POOL={group:()=>gCards(),join:()=>jOpts(),own:()=>oOpts(),para:()=>pCards()},DROP={group:()=>gBins(),join:()=>[jBox()],own:()=>[oMeter()],para:()=>pSlots()};
const free={group:i=>G.group.put[i]==null,join:()=>G.join.k<JOIN.length,own:()=>G.own.k<OWN.length,para:i=>G.para.put[i]==null};
const act={group:(i,j)=>group(i,j),join:i=>join(i),own:i=>useOwn(i),para:(i,j)=>para(i,j)};
function down(p){const k=at();if(k==='quiz')return false;
 if(k==='range'){const L=rLine(),s=G.range;if(Math.abs(p.y-L.y)>px(30))return false;G.grab=Math.abs(p.x-L.at(s.lo))<=Math.abs(p.x-L.at(s.hi))&&!(s.lo===s.hi&&p.x>L.at(s.hi))?'lo':'hi';A.redraw();return true}
 const i=POOL[k]().findIndex((b,q)=>hit(p,b)&&free[k](q));if(i>=0){G.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 const j=DROP[k]().findIndex(b=>hit(p,b)),s=G[k];if(j>=0&&s.sel!=null)act[k](s.sel,j);return false}
function move(p){const k=at();if(k==='range'&&G.grab){const v=rLine().of(p.x),s=G.range;if(v!==s[G.grab])setRange(G.grab,v);return}
 if(!G.drag)return;G.drag.x=p.x;G.drag.y=p.y;G[k].hot=DROP[k]().findIndex(b=>hit(p,b));if(k!=='group'&&k!=='para')G[k].hot=G[k].hot>=0;A.redraw()}
function up(p){const k=at();if(k==='range'){G.grab=null;A.redraw();return}const d=G.drag;if(!d)return;G.drag=null;const s=G[k];s.hot=-1;
 const j=DROP[k]().findIndex(b=>hit(p,b));if(j>=0)return act[k](d.i,j);
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){if(k==='own')return look(d.i);s.sel=d.i;s.bad=null;return say('Picked. Now tap where it goes.')}A.redraw()}
function draw(){ground();const k=at();if(k==='quiz'){head('Challenge',true);card({x:A.W*.12,y:A.H*.35,w:A.W*.76,h:A.H*.3},'📗 + 💻 + 📰 → one paragraph in your own words',{bg:'#fef9c3',n:15});return}
 ({group:drawGroup,join:drawJoin,range:drawRange,own:drawOwn,para:drawPara})[k]();A.fx.draw(A.ctx)}
function wipe(){era++;for(const k in G)delete G[k];Object.assign(G,{group:{put:FACTS.map(()=>null),sel:null,bad:null,hot:-1},join:{k:0,sel:null,bad:null,hot:false},
 range:{lo:0,hi:RANGE.max,moves:0},own:{k:0,look:null,bad:null,hot:false},para:{put:PARA.items.map(()=>null),sel:null,bad:null,hot:-1},drag:null,grab:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();G.check()}
function keys(){if(!pad)return;pad.innerHTML='';const k=at(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='group'){const s=G.group;if(s.sel==null)FACTS.forEach((f,i)=>{if(s.put[i]==null)B(`${SRC[f[0]][0]} ${f[1]}`,()=>{s.sel=i;s.bad=null;say(`Picked: ${f[1]} Now choose its idea.`)},`Pick fact from source ${f[0]}: ${f[1]}`)});
  else IDEAS.forEach((d,j)=>B(`→ ${d.join(' ')}`,()=>group(s.sel,j),`Put it under ${d[1]}`))}
 if(k==='join'&&G.join.k<JOIN.length)JOIN[G.join.k].opts.forEach((o,m)=>B(`Use: ${o[0]}`,()=>join(m)));
 if(k==='range'){const s=G.range;B('From −',()=>setRange('lo',s.lo-.5),'Lower the start of the range');B('From +',()=>setRange('lo',s.lo+.5),'Raise the start of the range');
  B('To −',()=>setRange('hi',s.hi-.5),'Lower the end of the range');B('To +',()=>setRange('hi',s.hi+.5),'Raise the end of the range')}
 if(k==='own'&&G.own.k<OWN.length)OWN[G.own.k].opts.forEach((o,m)=>{B(`🔍 Test ${m+1}`,()=>look(m),`Test sentence ${m+1} with the copy meter: ${o[0]}`);B(`Use ${m+1}`,()=>useOwn(m),`Use sentence ${m+1}: ${o[0]}`)});
 if(k==='para'){const s=G.para;if(s.sel==null)PARA.items.forEach((it,i)=>{if(s.put[i]==null)B(`Pick: ${it[0]}`,()=>{s.sel=i;s.bad=null;say('Picked. Now choose its job.')})});
  else PARA.slots.forEach((t,j)=>B(`→ ${j+1}. ${t}`,()=>para(s.sel,j)))}}
const fin=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){wipe();say(desc);G.check=fin(i,ok,msg)}
function demo(i,moves,gap){steps[i].go();const e=era;moves.forEach((f,n)=>setTimeout(()=>{if(e===era)f()},gap*(n+1)))}
const steps=[
{h:'Sort by idea',p:'Three sources about hedgehogs: a book, a website and a leaflet. Drag each fact to the idea it is about.',
 predict:{q:'How should you sort notes from three sources?',opts:['One source at a time','By idea, across the sources'],ans:1},task:'Sort all 6 facts',
 show:()=>demo(0,FACTS.map((f,i)=>()=>group(i,f[2])),600),go:()=>begin(0,'Six facts from sources A, B and C. Three ideas: food, winter, helping them.',()=>G.group.put.every(v=>v!=null),'Each idea now has facts from two sources. That is what you will join.')},
{h:'Join, do not stack',p:'Synthesising means joining facts from different sources into one sentence. Drag the sentence that does that into the box.',
 predict:{q:'Is “The book says… The website says…” synthesising?',opts:['Yes, it uses both sources','No, it just lists them'],ans:1},task:'Join all 3 ideas',
 show:()=>demo(1,JOIN.map(J=>()=>join(J.opts.findIndex(o=>o[1]==='ok'))),900),go:()=>begin(1,'Idea 1, food: hedgehogs eat beetles and caterpillars (book); earthworms are a big part of their diet (website).',()=>G.join.k>=JOIN.length,'One sentence per idea, with facts from both sources.')},
{h:'When sources differ',p:'The book says about 1 km a night. The website says up to 2 km. Drag the handles to make a range that fits both. Do not add or drop a fact.',task:'Make the range fit both sources',
 show:()=>demo(2,[()=>setRange('lo',.5),()=>setRange('lo',1),()=>setRange('hi',2.5),()=>setRange('hi',2)],600),go:()=>begin(2,'A line from 0 to 3 km. The range starts at 0 km and ends at 3 km.',()=>G.range.lo===RANGE.a[2]&&G.range.hi===RANGE.b[2],'A range keeps both sources true.')},
{h:'Your own words',p:'Tap a sentence to test it with the copy meter. Red words are copied in runs of 3 or more. Then drag your own-words sentence into the meter.',task:'Write both facts in your own words',
 show:()=>demo(3,[()=>look(1),()=>useOwn(2),()=>look(0),()=>useOwn(0)],900),go:()=>begin(3,'Sentence 1. The leaflet says: never give hedgehogs milk, because it can make them very ill.',()=>G.own.k>=OWN.length,'New words that keep the meaning, and the source is named. That is not plagiarism.')},
{h:'Build the paragraph',p:'A good paragraph has a topic sentence, the joined facts, what to do, and a list of sources. Drag each sentence to its job.',task:'Build the whole paragraph',
 show:()=>demo(4,PARA.items.map((it,i)=>()=>para(i,it[1])),650),go:()=>begin(4,'Four jobs: topic sentence, joined facts, how to help, list of sources. Four sentences.',()=>G.para.put.every(v=>v!=null),'Your paragraph draws on all three sources and says where each fact came from.')},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
function hint(t){let m='Think about how to join the sources fairly.';
 if(t==='stack')m='That goes one source at a time. Synthesis groups facts by idea and joins them.';
 if(t==='one')m='That uses only one source. Synthesis brings in facts from several.';
 if(t==='add')m='No source says that. Do not add facts: use a range that fits both.';
 if(t==='pick')m='The sources do not clash: 1 km and up to 2 km both fit a range.';
 if(t==='patch')m='Changing one word is still copying. Use your own sentence and name the source.';
 if(t==='copy')m='That is the source word for word. Say it your own way and name the source.';
 if(t==='none')m='A source list lets readers check facts and gives credit to the authors.';
 if(t==='wrong')m='The leaflet says milk makes hedgehogs ill. Check facts against the sources.';
 return m}
function next(){turn++;const Q=QS[turn%QS.length],all=[[Q.a,'ok'],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':hint(t))}
FK.shell(c,{steps,ratio:.7,tall:1.5,draw,onStep:X=>{quiz.hidden=X.step!==5;pad.hidden=X.step===5;keys()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Synthesis buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}}).start()})})();
