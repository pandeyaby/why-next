/* Data, text helpers and drawings for flagmyname (writing my name, ages 4–5; DfE Development Matters 2021 and EYFS
   ELG Writing: "write recognisable letters, most of which are correctly formed"; Development Matters 3–4: "write some
   or all of their name"; DfE Writing framework 2025 on name writing and letter formation; Read Write Inc. / Letters
   and Sounds formation: o and c-letters start at the top and go anticlockwise, e starts in the middle).
   Slips it targets: "a card that starts with my letter is my card", "the same letters in any order say my name",
   all-capital or all-small names, a capital in the middle, writing from the right, and starting letters anywhere. */
const MYN=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function kit(A,K){const px=n=>Math.round(A.narrow?n:n*1.15);
 function words(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${px(n)}px ${o.f||'system-ui,sans-serif'}`;g.fillStyle=o.c||K.ink;g.textAlign='center';g.textBaseline='middle';
  const rows=[];let line='';for(const w of String(s).split(' ')){const t=line?line+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&line){rows.push(line);line=w}else line=t}rows.push(line);
  const lh=px(n)*1.22;rows.forEach((t,i)=>g.fillText(t,x,y+(i-(rows.length-1)/2)*lh))}
 function card(b,fill,state){const g=A.ctx;g.fillStyle=state==='ok'?'#d1fae5':state==='ko'?'#fee2e2':fill||K.card;A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(12,b.h/3));g.fill();
  g.lineWidth=state?4:2;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[state]||K.rim;g.stroke()}
 function tag(s,x,y,n,state){const g=A.ctx;g.font=`800 ${px(n)}px system-ui,sans-serif`;const w=g.measureText(s).width+px(14),h=px(n)*1.7;card(box(x-w/2,y-h/2,w,h),'#ffffff',state);words(s,x,y,n)}
 return{px,words,card,tag}}
/* 1. find the name card: the target, then six cards on pegs; slip names the near miss */
const ROUNDS=[{who:'Leo',face:'#fcd34d',cards:[['Lee','same1'],['Ole','order'],['Leo',''],['Leon','extra'],['Lea','same1'],['Theo','other']]},
 {who:'Ava',face:'#a16207',cards:[['Ada','same1'],['Eva','other'],['Ava',''],['Ana','same1'],['Avi','same1'],['Aya','same1']]}];
/* 2. build Leo from big and small letter tiles */
const TILES=['L','l','e','E','o','O'],NAME='Leo';
/* 3. put the letters back in order (each round: mixed tiles, the name card) */
const MIXED=[{n:'Leo',t:['e','L','o']},{n:'Ava',t:['v','a','A']},{n:'Ben',t:['n','e','B']}];
/* 4. trace: unit paths inside a letter box (y 0 = top line, .45 = middle line, 1 = base line) */
function glyph(ch){const P=[],arc=(cx,cy,rx,ry,a0,a1,n)=>{for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n;P.push([cx+rx*Math.cos(a),cy+ry*Math.sin(a)])}};
 if(ch==='L'){for(let i=0;i<=10;i++)P.push([.22,i/10]);for(let i=1;i<=6;i++)P.push([.22+.6*i/6,1])}
 if(ch==='e'){for(let i=0;i<=6;i++)P.push([.12+.76*i/6,.72]);arc(.5,.725,.38,.275,0,-5.4,22)}
 if(ch==='o')arc(.5,.725,.38,.275,-Math.PI/2,-Math.PI/2-2*Math.PI+.12,26);
 return P}
const START={L:'at the top',e:'in the middle',o:'at the top'};
const DESC=['Leo is on the left. Six name cards hang on pegs. Tap the card that says Leo. Then find Ava.',
 'Three empty boxes for Leo. Big and small letter tiles below. Drag a tile into the first empty box, or use the buttons.',
 'The letters of a name are mixed up. Tap two letters to swap them, until it says the name on the card.',
 'Leo, in dotted letters on lines. Each letter has a green start dot. Drag from the dot along the dots, left to right.',
 'An empty name card. Use the letter buttons to write your own name, then press Finished.','Challenge.'];
const DONE=['Check every letter: your card has your letters, in your order.','A name starts with a capital letter. The rest are small letters.',
 'The letters go in the same order every time. Then it says the name.','Write from left to right, and start each letter in the right place.',
 'You wrote your name. Those marks say your name!'];
const QS=[{q:'Which card says Leo?',a:'Leo',o:[['Lee','same1','Lee','Leo'],['Ole','order','Ole']]},
 {q:'How does Leo start his name?',a:'With a big L',o:[['With a small l','small1','L'],['With a big O','first']]},
 {q:'Which is Ava written the right way?',a:'Ava',o:[['AVA','capmid','v'],['ava','small1','A']]},
 {q:'Where do you start writing your name?',a:'On the left',o:[['On the right','right'],['Anywhere on the line','right']]},
 {q:'e, L, o has all of Leo’s letters. Does it say Leo?',a:'No, the order is wrong',o:[['Yes, all the letters are there','order'],['Yes, it has a big L','order']]},
 {q:'Where does the letter o start?',a:'At the top',o:[['At the bottom','bottom'],['In the middle','bottom']]},
 {q:'Which card says Ava?',a:'Ava',o:[['Ada','same1','Ada','Ava'],['Eva','other','Eva','Ava']]},
 {q:'Ben writes his name. How many big letters does it have?',a:'1, just the first',o:[['3, all of them','capmid','e'],['0, none','small1','B']]}];
/* ---------- drawings ---------- */
function face(g,x,y,r,skin,hair){g.save();g.lineWidth=2;g.strokeStyle='#1f2937';g.fillStyle=hair;g.beginPath();g.arc(x,y-r*.1,r*1.08,Math.PI,0);g.fill();
 g.fillStyle=skin;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.stroke();g.fillStyle='#1f2937';[-.35,.35].forEach(d=>{g.beginPath();g.arc(x+d*r,y-r*.15,r*.1,0,7);g.fill()});
 g.beginPath();g.arc(x,y+r*.15,r*.45,.3,Math.PI-.3);g.stroke();g.restore()}
function peg(g,x,y,s){g.save();g.fillStyle='#94a3b8';g.strokeStyle='#1f2937';g.lineWidth=2;g.beginPath();g.arc(x,y,s,0,7);g.fill();g.stroke();g.restore()}
function lines(g,x,y,w,h){g.save();g.strokeStyle='#64748b';g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x+w,y);g.moveTo(x,y+h);g.lineTo(x+w,y+h);g.stroke();
 g.setLineDash([6,5]);g.strokeStyle='#94a3b8';g.beginPath();g.moveTo(x,y+h*.45);g.lineTo(x+w,y+h*.45);g.stroke();g.restore()}
return{box,inside,kit,ROUNDS,TILES,NAME,MIXED,glyph,START,DESC,DONE,QS,face,peg,lines}})();
