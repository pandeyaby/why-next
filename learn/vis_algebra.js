/* Why Next? visuals for operations and algebra: balance scale, order-of-operations steps, long multiplication and long division layouts. */
(()=>{const R=VIS.reg,nf=VIS.nf;
/* balance scale. mode "equal": is left sum = right? mode "solve": a·x + b = c, apply the same operation to both sides */
R('balance',c=>{const o=c.opts,eq=o.mode==='equal';const s=c.svg(440,250,'Balance scale');
 c.el('path',{d:'M220 100L180 215H260Z',class:'vis-stand'},s);c.el('rect',{x:150,y:215,width:140,height:10,rx:3,class:'vis-stand'},s);
 const beam=c.el('g',{},s);c.el('rect',{x:70,y:96,width:300,height:8,rx:4,class:'vis-beam'},beam);c.el('circle',{cx:220,cy:100,r:6,class:'vis-stand'},beam);
 const pans=[0,1].map(i=>{const g=c.el('g',{class:'vis-pan'},s);c.el('line',{x1:-45,y1:60,x2:0,y2:0,class:'vis-rope'},g);c.el('line',{x1:45,y1:60,x2:0,y2:0,class:'vis-rope'},g);
  c.el('path',{d:'M-60 60H60L48 72H-48Z',class:'vis-pancup'},g);const items=c.el('g',{},g);const lab=c.el('text',{y:96,'text-anchor':'middle',class:'vis-big'},g);return{g,items,lab}});
 const X=eq?0:(o.c-o.b)/o.a;
 let L=eq?{x:0,k:(o.left||[3,4]).reduce((p,q)=>p+q,0)}:{x:o.a,k:o.b},Rt=eq?{x:0,k:o.right??5}:{x:0,k:o.c},ang=0,log=[];
 const w=S=>S.x*X+S.k;
 const expr=S=>{const p=[];if(S.x)p.push((S.x===1?'':S.x)+'x');if(S.k||!S.x)p.push(String(S.k));return p.join(' + ')};
 function fill(P,S,leftParts){P.items.textContent='';let x=-52;const put=(kind,txt)=>{const g=c.el('g',{transform:`translate(${x},${kind==='x'?32:42})`},P.items);
   if(kind==='x'){c.el('rect',{width:22,height:26,rx:6,class:'vis-bag'},g);c.el('text',{x:11,y:18,'text-anchor':'middle',class:'vis-bagt'},g,'x');x+=25}
   else{const wd=txt>9?30:14;c.el('rect',{width:wd,height:16,rx:2,class:'vis-unit'+(kind==='u2'?' b':'')},g);if(txt>1)c.el('text',{x:wd/2,y:12,'text-anchor':'middle',class:'vis-unitt'},g,String(txt));x+=wd+2}};
  for(let i=0;i<S.x;i++)put('x');
  if(leftParts)leftParts.forEach((n,j)=>{for(let i=0;i<n&&i<6;i++)put(j?'u2':'u',n>6&&i===5?n-5:1)});
  else if(S.k<=6)for(let i=0;i<S.k;i++)put('u',1);else{const tens=Math.floor(S.k/10),ones=S.k%10;for(let i=0;i<tens&&i<4;i++)put('u',tens>4&&i===3?(tens-3)*10:10);for(let i=0;i<ones&&i<5;i++)put('u',ones>5&&i===4?ones-4:1)}
  P.lab.textContent=expr(S)}
 function place(a){[[-150,0],[150,1]].forEach(([dx,i])=>{const r=a*Math.PI/180;pans[i].g.setAttribute('transform',`translate(${220+dx*Math.cos(r)},${100+dx*Math.sin(r)})`)});beam.setAttribute('transform',`rotate(${a} 220 100)`)}
 function draw(msg){fill(pans[0],L,eq?(o.left||[3,4]):null);fill(pans[1],Rt);const diff=w(Rt)-w(L),to=Math.max(-16,Math.min(16,diff*4)),from=ang;ang=to;
  c.tween(700,t=>place(from+(to-from)*t));
  const bal=Math.abs(diff)<1e-9;s.classList.toggle('vis-ok',bal);
  let t=eq?`Left: ${(o.left||[3,4]).join(' + ')} = ${L.k}. Right: ${Rt.k}. `+(bal?`Balanced: ${(o.left||[3,4]).join(' + ')} = ${Rt.k}. The = sign means both sides have the same value.`:`Not balanced: the ${diff>0?'right':'left'} side is heavier, so ${(o.left||[3,4]).join(' + ')} ≠ ${Rt.k}.`)
   :`Left: ${expr(L)}. Right: ${expr(Rt)}. `+(bal?'The scale balances.':`The scale tips ${diff>0?'right':'left'}: the sides are no longer equal.`);
  if(!eq&&bal&&L.x===1&&!L.k&&!Rt.x)t+=` Solved: x = ${Rt.k}.`;c.say((msg?msg+' ':'')+t);sync()}
 const btns={};
 function sync(){if(eq)return;const bal=Math.abs(w(Rt)-w(L))<1e-9;btns.sub.disabled=!bal||L.k<1||Rt.k<1;btns.div.disabled=!bal||L.k!==0||L.x<2||Rt.x||Rt.k%L.x!==0;btns.one.disabled=!bal||L.k<1;btns.back.disabled=bal}
 if(eq){c.btn('Add 1 to the right',()=>{Rt.k=Math.min(20,Rt.k+1);draw()});c.btn('Take 1 from the right',()=>{Rt.k=Math.max(0,Rt.k-1);draw()})}
 else{btns.sub=c.btn('Take 1 from both sides',()=>{L.k--;Rt.k--;log.push('−1 both sides');draw('You took 1 from both sides.')});
  btns.div=c.btn('Divide both sides by '+o.a,()=>{const d=L.x;L.x=1;Rt.k/=d;draw(`You divided both sides by ${d}.`)});
  btns.one=c.btn('Take 1 from the left only',()=>{L.k--;draw('You changed one side only.')},'ghost');
  btns.back=c.btn('Put it back',()=>{L.k++;draw('Put back.')},'ghost');
  c.btn('Start again',()=>{L={x:o.a,k:o.b};Rt={x:0,k:o.c};draw()},'ghost')}
 c.cueEl=pans.map(p=>p.g);draw()});
/* order of operations: step through an expression, highlighting the operation done next */
const OPS={'+':1,'-':1,'−':1,'×':2,'*':2,'÷':2,'/':2};
function tok(s){const t=[];s.replace(/\s+/g,'').replace(/(\d+(?:\.\d+)?|[()[\]]|[+\-−×*÷/])/g,m=>{t.push(/\d/.test(m)?{n:+m}:{o:m});return''});return t}
function show(t){return t.map(x=>x.n!=null?nf(x.n):x.o.replace('-','−').replace('*','×').replace('/','÷')).join(' ').replace(/([([]) /g,'$1').replace(/ ([)\]])/g,'$1')}
function next(t){let lo=0,hi=t.length,open=-1;for(let i=0;i<t.length;i++){if(t[i].o==='('||t[i].o==='[')open=i;if((t[i].o===')'||t[i].o===']')&&open>=0){lo=open+1;hi=i;break}}
 if(hi-lo===1&&lo>0)return{i:lo-1,j:hi+1,v:t[lo].n,why:'The bracket now holds a single number, so the brackets can go.'};
 const inB=lo>0;let k=-1;for(let i=lo;i<hi;i++)if(t[i].o&&OPS[t[i].o]===2){k=i;break}
 if(k<0)for(let i=lo;i<hi;i++)if(t[i].o&&OPS[t[i].o]===1&&i>lo){k=i;break}if(k<0)return null;
 const a=t[k-1].n,b=t[k+1].n,op=t[k].o,v={'+':a+b,'-':a-b,'−':a-b,'×':a*b,'*':a*b,'÷':a/b,'/':a/b}[op];
 const why=inB?'Brackets first.':OPS[op]===2?'× and ÷ come before + and −, working left to right.':'Now + and −, working left to right.';
 return{i:k-1,j:k+2,v,why:`${why} ${nf(a)} ${show([{o:op}])} ${nf(b)} = ${nf(v)}.`}}
R('bidmas',c=>{const o=c.opts;const lines=[tok(o.expr||'3 + 4 × 2')],whys=[];let st=0;
 const box=c.el('div',{class:'vis-steps'},c.stage);
 function hl(t,n){if(!n)return esc(show(t));const a=show(t.slice(0,n.i)),m=show(t.slice(n.i,n.j)),b=show(t.slice(n.j));return `${esc(a)}${a&&!/[([]$/.test(a)?' ':''}<mark class="vis-hl">${esc(m)}</mark>${b&&!/^[)\]]/.test(b)?' ':''}${esc(b)}`}
 function draw(){while(lines.length<=st){const t=lines[lines.length-1],n=next(t);if(!n)break;lines.push([...t.slice(0,n.i),{n:n.v},...t.slice(n.j)]);whys.push(n.why)}
  st=Math.min(st,lines.length-1);box.innerHTML=lines.slice(0,st+1).map((t,i)=>`<div class="vis-line${i===st?' cur':''}">${i?'= ':''}${i===st?hl(t,next(t)):esc(show(t))}</div>`).join('');
  const n=next(lines[st]);c.cueEl=box.querySelector('mark')||box;
  c.say(st?`Step ${st}: ${whys[st-1]} `+(n?'':`Done: the answer is ${show(lines[st])}.`):`${show(lines[0])}. Press Next step to work it out in the right order (BIDMAS/BODMAS, or PEMDAS in the US).`);
  nb.disabled=!n;bb.disabled=!st}
 const nb=c.btn('Next step',()=>{st++;draw()}),bb=c.btn('Back',()=>{st--;draw()});c.btn('Start again',()=>{st=0;draw()},'ghost');draw()});
/* written methods. Each step reveals one line of the layout. */
function grid(c,rows,W){return `<div class="vis-written" aria-hidden="true">${rows.map(r=>`<div class="vis-wl${r.cls?' '+r.cls:''}">${[...r.s.padStart(W,' ')].map((ch,i)=>{const h=r.hl&&r.hl.includes(W-r.s.length+i)?' class="vis-hl"':'';return `<span${h}>${ch===' '?'&nbsp;':esc(ch)}</span>`}).join('')}</div>`).join('')}</div>`}
R('longmul',c=>{const o=c.opts,a=o.a||34,b=o.b||26,bd=String(b).split('').reverse().map(Number),W=String(a*b).length+2;let st=0;const box=c.el('div',{},c.stage);
 const parts=bd.map((d,i)=>a*d*10**i);
 function draw(){const rows=[{s:String(a)},{s:'× '+b,cls:'ul'}];const hlB=st>0&&st<=bd.length?[W-st]:null;if(hlB)rows[1].hl=hlB;
  for(let i=0;i<Math.min(st,bd.length);i++){const s=String(parts[i]).padStart(1,'0'),z=i,hl=i===st-1?[...Array(z).keys()].map(k=>W-1-k):null;rows.push({s:parts[i]===0?'0'.repeat(i+1):s,hl,cls:i===st-1?'cur':''})}
  if(st>bd.length)rows.push({s:String(a*b),cls:'tot cur'});
  box.innerHTML=grid(c,rows,W);c.cueEl=box.querySelector('.cur')||box;
  const d=bd[st-1],pv=10**(st-1);
  c.say(st===0?`${a} × ${b}. Press Next step to multiply by each digit of ${b}, one row at a time.`
   :st<=bd.length?`Row ${st}: ${a} × ${d*pv} = ${parts[st-1]}.`+(st>1?` This digit is worth ${d*pv}, so the row ends in ${st-1===1?'a 0':st-1+' zeros'} (the placeholder).`:'')
   :`Add the rows: ${parts.join(' + ')} = ${a*b}. So ${a} × ${b} = ${a*b}.`);nb.disabled=st>bd.length;bb.disabled=!st}
 const nb=c.btn('Next step',()=>{st++;draw()}),bb=c.btn('Back',()=>{st--;draw()});c.btn('Start again',()=>{st=0;draw()},'ghost');draw()});
R('longdiv',c=>{const o=c.opts,a=o.a||432,b=o.b||15,ds=String(a).split('').map(Number),steps=[];let cur=0,started=false,q='';
 ds.forEach((d,i)=>{cur=cur*10+d;if(!started&&cur<b&&i<ds.length-1){q+=' ';return}started=true;const k=Math.floor(cur/b);steps.push({i,cur,k,p:k*b,r:cur-k*b});q+=k;cur-=k*b});
 const rem=cur,qt=Math.floor(a/b),bl=String(b).length+1,W=bl+ds.length;let st=0;const box=c.el('div',{},c.stage);
 const mult=c.el('p',{class:'vis-mult'},c.stage,`Multiples of ${b}: `+[...Array(9)].map((_,k)=>`${k+1}×${b}=${(k+1)*b}`).join(', '));
 function draw(){const shown=Math.min(st,steps.length),qs=q.slice(0,steps.length?steps[Math.max(0,shown-1)].i+1:0);
  const rows=[{s:(' '.repeat(bl)+(shown?qs:'')).padEnd(W,' '),cls:'q'},{s:`${b})${a}`,cls:'ov'}];
  for(let k=0;k<shown;k++){const S=steps[k],end=bl+S.i+1;rows.push({s:('−'+S.p).padStart(end,' ').padEnd(W,' '),cls:'ul'+(k===shown-1?' cur':'')});
   const nxt=steps[k+1];const rs=nxt?String(nxt.cur):String(S.r);rows.push({s:rs.padStart(nxt?bl+nxt.i+1:end,' ').padEnd(W,' '),cls:k===shown-1?'cur':''})}
  box.innerHTML=grid(c,rows,W);c.cueEl=[...box.querySelectorAll('.cur')];if(!c.cueEl.length)c.cueEl=box;
  const S=steps[shown-1],N=steps[shown];
  let t=!st?`${a} ÷ ${b}. Divide, multiply, subtract, bring down: one digit at a time. Press Next step.`
   :st<=steps.length?`${b} goes into ${S.cur} ${S.k} time${S.k===1?'':'s'} (${S.k} × ${b} = ${S.p}). ${S.cur} − ${S.p} = ${S.r}.`+(N?` Bring down the next digit to make ${N.cur}.`:'')
   :`${a} ÷ ${b} = ${qt}`+(rem?` remainder ${rem}. As a fraction ${qt} ${rem}/${b}; as a decimal ${nf(a/b,3)}. In a word problem, decide whether to round up or down.`:'.');
  c.say(t);nb.disabled=st>steps.length;bb.disabled=!st}
 const nb=c.btn('Next step',()=>{st++;draw()}),bb=c.btn('Back',()=>{st--;draw()});c.btn('Start again',()=>{st=0;draw()},'ghost');draw()});
VIS.parseExpr=tok;VIS.nextStep=next;VIS.showExpr=show;
})();
