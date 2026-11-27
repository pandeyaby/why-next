/* Data and drawings for flagcard (Writing a card: To, a message and From; English, Writing Composition, ages 4-5).
   Sources: DfE Development Matters (2021) Reception Literacy ('write short sentences with words with known
   sound-letter correspondences using a capital letter and full stop'); EYFS Statutory Framework (2024) ELG Writing
   ('write simple phrases and sentences that can be read by others'); National Curriculum in England (2013) English
   Year 1 and Year 2 Writing composition (say it out loud first; writing for different purposes). Slips it targets:
   putting your own name after To; writing From where To goes; a message that does not fit the card (Happy birthday
   on a get-well card); Love from at the top, or the other person's name after Love from; the To part at the bottom;
   the sender's name on the envelope; names without a capital letter. */
const CRD=(()=>{
/* three cards: who it is to, who it is from, the picture and the message that fits */
const CARDS=[{to:'Gran',from:'Sam',pic:'\u{1F382}',kind:'birthday',msg:'Happy birthday!'},
 {to:'Dad',from:'Mia',pic:'\u{1F381}',kind:'thanks',msg:'Thank you for the kite!'},
 {to:'Nan',from:'Leo',pic:'\u{1F912}',kind:'poorly',msg:'Get well soon!'}];
const OTHER=['Dad','Nan','Gran'];
const KIND={birthday:'a birthday card',thanks:'a thank-you card',poorly:'a get-well card'};
const DESC=['A card with an empty top line. Drag the right To tag onto the card, or use the buttons. 3 cards.',
 'Three cards with pictures: a cake, a present and a poorly face. Drag each message onto the card it fits.',
 'A card with To and a message. Drag the right Love from tag to the bottom of the card. 3 cards.',
 'An empty card with a top, a middle and a bottom. Drag each part to its place.',
 'A finished card and three envelopes. Drag the card into the envelope with the right name. 3 cards.'];
const TXT=['To, then the name of the person it is for.','The message fits why you are sending it.','Love from, then your own name, at the bottom.','Top: To. Middle: the message. Bottom: Love from.','The envelope gets the name after To.'];
const DONE=['Each card says who it is for: To Gran, To Dad, To Nan.',
 'Happy birthday for the cake, Thank you for the present, Get well soon for the poorly face.',
 'Each card says who it is from, at the bottom: Love from Sam, Mia and Leo.',
 'To Dad at the top, the message in the middle, Love from Mia at the bottom. A whole card!',
 'Each card went in the envelope with the name after To. Off to the post box!'];
const QS=[{q:'Sam makes a card for Gran. What goes at the top?',a:'To Gran',o:[['To Sam','self'],['From Gran','word']]},
 {q:'Nan is poorly. Which message fits her card?',a:'Get well soon!',o:[['Happy birthday!','fit'],['Thank you for the kite!','fit']]},
 {q:'Mia made the card. What goes at the bottom?',a:'Love from Mia',o:[['Love from Dad','who'],['To Mia','word2']]},
 {q:'Where does the message go?',a:'In the middle',o:[['At the very top','mid'],['Under Love from','mid']]},
 {q:'Leo\u2019s card says To Nan. What goes on the envelope?',a:'Nan',o:[['Leo','env'],['Gran','other']]},
 {q:'Which name is written the right way?',a:'Gran',o:[['gran','cap'],['gRAN','cap']]},
 {q:'Where does Love from go?',a:'At the bottom',o:[['At the top','place'],['On the envelope','env']]},
 {q:'Dad gave Mia a kite. Which card fits?',a:'A thank-you card',o:[['A get-well card','fit'],['A birthday card','fit']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',FONT='px system-ui,sans-serif';
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(e,x,y)}
function box(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
/* the three writing places on a card, as rectangles */
function slots(r){const p=r.w*.08,h=r.h*.2;return[{x:r.x+p,y:r.y+r.h*.1,w:r.w-2*p,h},{x:r.x+p,y:r.y+r.h*.4,w:r.w-2*p,h},{x:r.x+p,y:r.y+r.h*.7,w:r.w-2*p,h}]}
function fitText(g,t,w,n){let k=n;g.font=`800 ${k}${FONT}`;while(g.measureText(t).width>w-10&&k>11){k--;g.font=`800 ${k}${FONT}`}return k}
/* a card: cream paper, a picture in the corner, and three writing places that are dashed until filled */
function card(g,r,st){g.fillStyle='#fffbeb';g.strokeStyle=st.lit?'#1d4ed8':RIM;g.lineWidth=st.lit?4:2;box(g,r.x,r.y,r.w,r.h,10);g.fill();g.stroke();
 if(st.pic)emo(g,st.pic,r.x+r.w-r.w*.13,r.y+r.h*.14,Math.min(r.w,r.h)*.17);
 slots(r).forEach((s,i)=>{const t=st.lines&&st.lines[i];if(!t){if(st.dash===false)return;g.setLineDash([6,5]);g.strokeStyle=st.bad===i?NO:'#94a3b8';g.lineWidth=st.bad===i?3:2;box(g,s.x,s.y,s.w*(st.pic&&i===0?.78:1),s.h,8);g.stroke();g.setLineDash([]);return}
  const n=fitText(g,t,s.w*(st.pic&&i===0?.78:1),Math.round(Math.min(26,s.h*.55)));g.fillStyle=i===0?'#1d4ed8':i===2?'#be185d':INK;g.textAlign='left';g.textBaseline='middle';g.fillText(t,s.x+6,s.y+s.h/2)})}
/* an envelope with a name on the front */
function envelope(g,r,name,st){g.fillStyle=st.ok?'#dcfce7':st.no?'#fee2e2':'#ffffff';g.strokeStyle=st.ok?OK:st.no?NO:RIM;g.lineWidth=st.ok||st.no?4:2;box(g,r.x,r.y,r.w,r.h,8);g.fill();g.stroke();
 g.strokeStyle='#94a3b8';g.lineWidth=2;g.beginPath();g.moveTo(r.x+4,r.y+4);g.lineTo(r.x+r.w/2,r.y+r.h*.45);g.lineTo(r.x+r.w-4,r.y+4);g.stroke();
 const n=fitText(g,name,r.w,Math.round(Math.min(24,r.h*.3)));g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(name,r.x+r.w/2,r.y+r.h*.72);if(st.ok)emo(g,'\u2709\uFE0F',r.x+r.w-14,r.y+r.h-14,18)}
/* a draggable word tag */
function tag(g,r,t,st){g.fillStyle=st.sel?'#dbeafe':st.no?'#fee2e2':st.used?'#e2e8f0':'#ffffff';g.strokeStyle=st.sel?'#1d4ed8':st.no?NO:RIM;g.lineWidth=st.sel||st.no?4:2;box(g,r.x,r.y,r.w,r.h,12);g.fill();g.stroke();
 const n=fitText(g,t,r.w,17);g.fillStyle=st.used?'#475569':INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2)}
return{CARDS,OTHER,KIND,DESC,TXT,DONE,QS,INK,OK,NO,RIM,FONT,emo,box,slots,card,envelope,tag}})();
