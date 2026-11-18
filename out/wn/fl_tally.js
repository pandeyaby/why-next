/* Flagship – pictograms and tally charts (ages 6–8, NC Year 2 statistics: "interpret and construct simple pictograms,
   tally charts, block diagrams and simple tables"; Year 3: pictograms where one picture stands for more than one).
   Tally fruit votes in gates of five, turn the tally into a pictogram, build a pictogram where each picture means 2
   with a half picture for 1, build a block diagram from a tally, and find how many more by matching blocks. Targets
   tallying five as five upright lines, counting pictures instead of votes, and adding when asked how many more. */
(()=>{
VIS.reg('flagtally',c=>{let A,pads,quiz,qn=-1,run=0;c.fig.classList.add('young');const Z={};
const scene=()=>['tally','picto','key','blocks','compare','quiz'][A.step];
const speak=s=>{c.say(s);if(A)A.cv.setAttribute('aria-label',s)};
const big=n=>Math.round(n*(A.narrow?1.05:1.2)),again=()=>A.redraw();
const FR=['apple','banana','grapes'],FC=['#d62828','#f4c20d','#7a3f9e'],VOTES=[0,1,0,2,0,0,2,1,0,2,0],FT=[6,2,3];
const PETS=['dog','cat','fish'],PC=['#9a5b2e','#e07b1f','#1d74c4'],PT=[8,5,2],WAY=['walk','car','bus'],WC=['#2f9b47','#d62828','#1d5fc4'],WT=[6,4,2];
function word(g,s,x,y,n,colr,wt,al){g.font=`${wt||800} ${big(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=colr||A.col.tx;g.fillText(s,x,y,A.W-14)}
const rh=()=>Math.min(A.H*.19,70),y0=()=>A.H*.3,lw=()=>A.W*.24;
const row=i=>({x:8,y:y0()+i*rh(),w:A.W-16,h:rh()-8});
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y-4&&p.y<r.y+r.h+4;
function tally(g,n,x,y,mh){const sp=mh*.3;g.lineWidth=Math.max(2,mh*.09);g.strokeStyle=A.col.tx;g.lineCap='round';let cx=x;
 for(let k=0;k<n;k++){const j=k%5;if(j===4){g.beginPath();g.moveTo(cx-sp*.5,y+mh*.35);g.lineTo(cx+sp*3.5,y-mh*.35);g.stroke();cx+=sp*5.4;continue}
  g.beginPath();g.moveTo(cx+j*sp,y-mh/2);g.lineTo(cx+j*sp,y+mh/2);g.stroke();if(k===n-1)cx+=0}g.lineCap='butt'}
function pic(g,x,y,r,colr,half){g.beginPath();if(half){g.arc(x,y,r,Math.PI/2,Math.PI*1.5);g.closePath()}else g.arc(x,y,r,0,7);g.fillStyle=colr;g.fill();g.lineWidth=2;g.strokeStyle=A.col.tx;g.stroke()}
function rows(g,names,cols,fill){const K=A.col;names.forEach((nm,i)=>{const r=row(i);g.fillStyle=A.mix(K.pn,cols[i],Z.flash===i?.3:.1);g.fillRect(r.x,r.y,r.w,r.h);g.lineWidth=1.5;g.strokeStyle=K.ln;g.strokeRect(r.x,r.y,r.w,r.h);
 g.beginPath();g.moveTo(lw(),r.y);g.lineTo(lw(),r.y+r.h);g.stroke();word(g,nm,r.x+8,r.y+r.h/2,14,K.tx,800,'left');fill(i,r)})}
const bx=()=>({base:A.H*.8,u:Math.min(A.H*.58/8,32),cw:Math.min(A.W*.16,70),xs:[.36,.6,.84].map(f=>A.W*f),ax:A.W*.16});
function blocks(g,cnt,marks){const K=A.col,B=bx();g.lineWidth=1.5;g.strokeStyle=K.ln;
 for(let v=0;v<=8;v+=2){const y=B.base-v*B.u;g.beginPath();g.moveTo(B.ax,y);g.lineTo(A.W-8,y);g.stroke();word(g,String(v),B.ax-12,y,11,K.mu,700)}
 WAY.forEach((nm,i)=>{const x=B.xs[i];for(let k=0;k<cnt[i];k++){const y=B.base-(k+1)*B.u;g.fillStyle=marks&&marks(i,k)?K.tx:WC[i];g.fillRect(x-B.cw/2,y+1,B.cw,B.u-2);g.lineWidth=1.5;g.strokeStyle=K.tx;g.strokeRect(x-B.cw/2,y+1,B.cw,B.u-2)}
  word(g,nm,x,B.base+14,13,K.tx,800);if(scene()==='blocks'){tally(g,WT[i],x-B.cw*.45,B.base+38,15)}})}
function draw(A){const{ctx:g,W,H,col:K}=A,v=scene();g.fillStyle=A.mix(K.pn,K.cy,K.dark?.04:.06);g.fillRect(0,0,W,H);
 if(v==='tally'){const nx=VOTES[Z.i];word(g,Z.i<VOTES.length?`Vote ${Z.i+1} of ${VOTES.length}:`:'All votes counted',W/2,H*.08,14,K.mu,700);
  if(Z.i<VOTES.length){pic(g,W/2-60,H*.18,14,FC[nx]);word(g,FR[nx],W/2-36,H*.18,17,K.tx,800,'left')}
  rows(g,FR,FC,(i,r)=>tally(g,Z.n[i],lw()+16,r.y+r.h/2,r.h*.6))}
 if(v==='picto'){word(g,'Tally chart',lw()*.6,H*.16,12,K.mu,700);word(g,'Each picture = 1 vote',W*.62,H*.16,13,K.tx,800);
  rows(g,FR,FC,(i,r)=>{tally(g,FT[i],lw()+10,r.y+r.h*.5,r.h*.38);const x0=lw()+r.h*.95+24,s=Math.min(r.h*.3,(W-x0-12)/13.8);for(let k=0;k<Z.n[i];k++)pic(g,x0+s+k*s*2.3,r.y+r.h/2,s,FC[i])})}
 if(v==='key'){word(g,'Votes: dog 8, cat 5, fish 2',W/2,H*.08,13,K.tx,700);pic(g,W*.3,H*.18,12,K.mu);word(g,'= 2 votes',W*.3+20,H*.18,14,K.tx,800,'left');pic(g,W*.62,H*.18,12,K.mu,1);word(g,'= 1 vote',W*.62+10,H*.18,14,K.tx,800,'left');
  rows(g,PETS,PC,(i,r)=>{const s=Math.min(r.h*.32,(W-lw()-30)/11);let k=0;for(;k<Math.floor(Z.n[i]/2);k++)pic(g,lw()+20+k*s*2.4,r.y+r.h/2,s,PC[i]);if(Z.n[i]%2)pic(g,lw()+20+k*s*2.4,r.y+r.h/2,s,PC[i],1);
   word(g,`${Z.n[i]} of ${PT[i]}`,r.x+r.w-8,r.y+r.h/2,12,K.mu,700,'right')})}
 if(v==='blocks'){word(g,'Tally: how we get to school',W/2,H*.07,13,K.tx,800);blocks(g,Z.n)}
 if(v==='compare'){word(g,'How many more walk than go by car?',W/2,H*.07,13,K.tx,800);const B=bx();blocks(g,WT,(i,k)=>i===0&&Z.hit.includes(k));
  g.setLineDash([5,4]);g.strokeStyle=K.mu;for(let k=0;k<4;k++){const y=B.base-(k+.5)*B.u;g.beginPath();g.moveTo(B.xs[0]+B.cw/2,y);g.lineTo(B.xs[1]-B.cw/2,y);g.stroke()}g.setLineDash([])}
 if(v==='quiz'&&Z.q){const f=Z.q;if(f.f==='tally'){const mh=Math.min(H*.25,W*.2);tally(g,f.n,W/2-.81*mh*Math.ceil(f.n/5),H*.45,mh)}
  if(f.f==='pic'){for(let k=0;k<f.n;k++)pic(g,W*.25+k*W*.14,H*.42,W*.05,PC[1]);if(f.h)pic(g,W*.25+f.n*W*.14,H*.42,W*.05,PC[1],1);word(g,'Key: each picture = 2 votes',W/2,H*.75,14)}
  if(f.f==='bars')blocks(g,WT)}
 A.fx.draw(g)}
const oops=s=>{A.sound.miss();speak(s);again()},yay=s=>{A.sound.pop();speak(s);buttons();again();Z.want()};
const flash=i=>{Z.flash=i;setTimeout(()=>{if(Z.flash===i){Z.flash=-1;again()}},250)};
function tap(i){const v=scene();if(v==='tally'){if(Z.i>=VOTES.length)return;const want=VOTES[Z.i];if(i!==want)return oops(`That vote is for ${FR[want]}, not ${FR[i]}. Tap the ${FR[want]} row.`);
  Z.n[i]++;Z.i++;A.sound.tick();flash(i);if(Z.i>=VOTES.length)return yay('All 11 votes are tallied: apple 6, banana 2, grapes 3. A crossed gate is 5.');
  speak(Z.n[i]%5===0?`Five for ${FR[i]}! The 5th line goes across the other 4.`:`${FR[i]}: ${Z.n[i]}. Next vote.`);buttons();return again()}
 if(v==='picto'){if(Z.n[i]>=FT[i])return oops(`${FR[i]} has ${FT[i]} tally marks, and there are ${FT[i]} pictures already. One picture for each vote.`);Z.n[i]++;A.sound.tick();flash(i);
  if(Z.n.every((n,j)=>n===FT[j]))return yay('The pictogram matches the tally: 6, 2 and 3 pictures.');speak(`${FR[i]}: ${Z.n[i]} pictures.`);buttons();return again()}
 if(v==='key')return add(i,2);
 if(v==='blocks'){if(Z.n[i]>=WT[i])return oops(`The tally for ${WAY[i]} is ${WT[i]}. That column already has ${WT[i]} blocks.`);Z.n[i]++;A.sound.tick();
  if(Z.n.every((n,j)=>n===WT[j]))return yay('The block diagram matches the tally: walk 6, car 4, bus 2.');speak(`${WAY[i]}: ${Z.n[i]} blocks.`);buttons();return again()}}
function add(i,k){if(scene()!=='key')return;const left=PT[i]-Z.n[i];if(!left)return oops(`${PETS[i]} has all ${PT[i]} votes already.`);
 if(k===2&&left===1)return oops(`${PETS[i]} needs just 1 more vote. A whole picture is 2. Use a half picture.`);
 if(k===1&&left>1)return oops(`A half picture is only 1 vote. ${PETS[i]} still needs ${left}: use whole pictures first.`);
 Z.n[i]+=k;A.sound.tick();flash(i);if(Z.n.every((n,j)=>n===PT[j]))return yay('Dog 4 pictures, cat 2 and a half, fish 1. Each picture is 2 votes.');
 speak(`${PETS[i]}: ${Z.n[i]} votes so far.`);buttons();again()}
function pick(k){if(scene()!=='compare'||Z.hit.length>=2)return;if(Z.hit.includes(k))return;
 if(k<4)return oops(`Walk block ${k+1} has a partner at the same height in the car column. Find a block with no partner.`);
 Z.hit.push(k);A.sound.tick();if(Z.hit.length===2)return yay('2 walk blocks have no partner. 2 more children walk than go by car: 6 take away 4 is 2.');speak('No partner! Find another one.');buttons();again()}
function buttons(){if(!pads)return;pads.innerHTML='';const v=scene(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pads,t);b.onclick=fn};
 if(v==='tally'&&Z.i<VOTES.length)FR.forEach((f,i)=>B(`Tally ${f}`,()=>tap(i),`Add a tally mark for ${f}, now ${Z.n[i]}`));
 if(v==='picto')FR.forEach((f,i)=>B(`Picture for ${f}`,()=>tap(i),`Add a picture for ${f}, now ${Z.n[i]} of ${FT[i]}`));
 if(v==='key'){PETS.forEach((f,i)=>B(`Whole: ${f}`,()=>add(i,2),`Add a whole picture, 2 votes, for ${f}, now ${Z.n[i]} of ${PT[i]}`));PETS.forEach((f,i)=>B(`Half: ${f}`,()=>add(i,1),`Add a half picture, 1 vote, for ${f}`))}
 if(v==='blocks')WAY.forEach((f,i)=>B(`Block for ${f}`,()=>tap(i),`Add a block for ${f}, now ${Z.n[i]} of ${WT[i]}`));
 if(v==='compare'&&Z.hit.length<2)for(let k=0;k<6;k++)if(!Z.hit.includes(k))B(`Walk block ${k+1}`,()=>pick(k))}
function down(p){const v=scene();if(v==='quiz')return false;
 if(v==='blocks'||v==='compare'){const B=bx();for(let i=0;i<3;i++)if(Math.abs(p.x-B.xs[i])<B.cw*.7&&p.y<B.base+20){if(v==='blocks')tap(i);else{if(i!==0){oops('Tap blocks in the walk column.');return false}const k=Math.floor((B.base-p.y)/B.u);if(k>=0&&k<6)pick(k)}return false}return false}
 for(let i=0;i<3;i++)if(inR(p,row(i))){tap(i);return false}return false}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const k=++Z.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===Z.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const fresh=()=>{const t=(Z.tok||0)+1;Object.keys(Z).forEach(k=>delete Z[k]);Object.assign(Z,{tok:t,want:()=>{},n:[0,0,0],i:0,hit:[],flash:-1,q:null})};
const steps=[
{h:'Tally the votes',p:'Children voted for a fruit. Tap the right row for each vote.',predict:{q:'How do you show 5 with tally marks?',opts:['4 lines and 1 across them','5 lines standing up','Write the number 5'],ans:0},task:'Tally all 11 votes',
 show:()=>{steps[0].go();seq(VOTES.map(i=>()=>tap(i)),250)},
 go:()=>{fresh();speak('Votes for apple, banana or grapes. Tap the right row for each vote.');buttons();Z.want=ok(0,()=>Z.i>=VOTES.length,'Gates of 5 are quick to count.')}},
{h:'Make a pictogram',p:'Each picture means 1 vote. Add pictures to match the tally.',task:'Match the tally',
 show:()=>{steps[1].go();seq([0,0,0,0,0,0,1,1,2,2,2].map(i=>()=>tap(i)),250)},
 go:()=>{fresh();speak('Tally: apple 6, banana 2, grapes 3. Add one picture for each vote.');buttons();Z.want=ok(1,()=>Z.n.every((n,j)=>n===FT[j]),'One picture for each vote.')}},
{h:'A picture for 2',p:'Now each picture means 2 votes. A half picture means 1.',predict:{q:'Each picture means 2. Dog has 4 pictures. How many votes?',opts:['8','4','6'],ans:0},task:'Show dog 8, cat 5, fish 2',
 show:()=>{steps[2].go();seq([()=>add(0,2),()=>add(0,2),()=>add(0,2),()=>add(0,2),()=>add(1,2),()=>add(1,2),()=>add(1,1),()=>add(2,2)],300)},
 go:()=>{fresh();speak('Votes: dog 8, cat 5, fish 2. Each picture means 2 votes.');buttons();Z.want=ok(2,()=>Z.n.every((n,j)=>n===PT[j]),'Count in 2s to read it.')}},
{h:'Block diagram',p:'Read each tally. Stack one block for each mark.',task:'Build the block diagram',
 show:()=>{steps[3].go();seq([0,0,0,0,0,0,1,1,1,1,2,2].map(i=>()=>tap(i)),250)},
 go:()=>{fresh();speak('Tallies: walk 6, car 4, bus 2. Tap a column to stack a block.');buttons();Z.want=ok(3,()=>Z.n.every((n,j)=>n===WT[j]),'Taller column, more children.')}},
{h:'How many more?',p:'Each walk block is matched with a car block. Tap the walk blocks with no partner.',predict:{q:'Walk has 6. Car has 4. How many more walk?',opts:['2','10','4'],ans:0},task:'Find the extra walk blocks',
 show:()=>{steps[4].go();seq([()=>pick(4),()=>pick(5)],500)},
 go:()=>{fresh();speak('Walk has 6 blocks and car has 4. Dashed lines join partners.');buttons();Z.want=ok(4,()=>Z.hit.length===2,'How many more is the difference.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.want()});
const QS=[['How many do these tally marks show?',{f:'tally',n:7},[['7','ok'],['6','four'],['2','after']]],
 ['Each picture means 2 votes. How many votes?',{f:'pic',n:3},[['6','ok'],['3','pics'],['5','plus']]],
 ['Each whole picture means 2 votes. How many votes here?',{f:'pic',n:2,h:1},[['5','ok'],['3','halfone'],['6','halfwhole']]],
 ['How many more children walk than go by bus?',{f:'bars'},[['4','ok'],['8','add'],['6','big']]],
 ['Which way to school is least popular?',{f:'bars'},[['Bus','ok'],['Walk','most'],['Car','mid']]],
 ['How many do these tally marks show?',{f:'tally',n:10},[['10','ok'],['8','four'],['2','groups']]]];
function why(t){let m='Count carefully.';
 if(t==='four')m='The line across is the 5th mark. Each gate of 4 lines and a line across is 5.';
 if(t==='after')m='Count the gate too: a crossed gate is 5, then add the single lines.';
 if(t==='pics')m='Count the votes, not the pictures. Each picture is 2, so count in 2s: 2, 4, 6.';
 if(t==='plus')m='Do not add the key on. 3 pictures of 2 votes is 2, 4, 6.';
 if(t==='halfone')m='There are 2 whole pictures and a half. Count 2, 4, then the half is 1 more: 5.';
 if(t==='halfwhole')m='The last picture is only half, so it means 1 vote, not 2.';
 if(t==='add')m='How many more means find the difference, not add. Walk 6, bus 2: 6 take away 2.';
 if(t==='big')m='6 is how many walk. Compare it with bus: 6 take away 2 is 4.';
 if(t==='most')m='Walk has the tallest column, so it is the most popular.';
 if(t==='mid')m='Car is in the middle. Bus has the shortest column.';
 if(t==='groups')m='There are 2 gates, and each gate is 5. Count 5, 10.';
 return m}
function ask(){qn++;const[q,fig,ops]=QS[qn%QS.length],rot=qn%3;Z.q=fig;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});
 const d=fig.f==='tally'?`${fig.n} tally marks in gates of 5`:fig.f==='pic'?`${fig.n} whole pictures${fig.h?' and a half picture':''}; each whole picture means 2 votes`:'Block diagram: walk 6, car 4, bus 2';speak('Challenge: '+q+' '+d);again()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),right=t==='ok';
 if(right){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(right?'Yes! In a row: '+run+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pads.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pads=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();
  A.gest({down});buttons()}});
A.start()})})();
