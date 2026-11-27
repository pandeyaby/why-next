/* Data and drawings for flagprism (White light and colour; Science, Waves, Light & Sound, ages 11-12).
   Sources: National Curriculum in England (2013) KS3 Physics, Waves: 'colours and the different frequencies of light,
   white light and prisms (qualitative only); differential colour effects in absorption and diffuse reflection';
   Newton (1672) 'New Theory about Light and Colours' (a prism separates white light, a second prism recombines it);
   the visible spectrum runs from red (about 700 nm, lowest frequency) to violet (about 400 nm, highest frequency), and
   glass refracts violet most and red least; a coloured object reflects its own colour and absorbs the rest; a filter
   transmits its own colour and absorbs the rest. The lab uses the school model of light as red, green and blue parts
   (yellow = red + green, cyan = green + blue, magenta = red + blue). Slips it targets: the prism adds colour; red bends
   most; the spectrum order reversed; colours of light mix like paint (a red shirt in blue light looks purple); an
   object keeps its colour in any light; a filter adds colour; two filters add up. */
const PRS=(()=>{
const SPEC=[{n:'Red',c:'#ef4444',nm:700},{n:'Orange',c:'#f97316',nm:610},{n:'Yellow',c:'#facc15',nm:580},{n:'Green',c:'#22c55e',nm:530},{n:'Blue',c:'#3b82f6',nm:470},{n:'Indigo',c:'#6366f1',nm:445},{n:'Violet',c:'#a855f7',nm:410}];
/* light and surfaces as sets of the parts r, g, b */
const NAME={'':'Black','r':'Red','g':'Green','b':'Blue','rg':'Yellow','gb':'Cyan','rb':'Magenta','rgb':'White'};
const HEX={'':'#111827','r':'#ef4444','g':'#22c55e','b':'#3b82f6','rg':'#facc15','gb':'#22d3ee','rb':'#d946ef','rgb':'#ffffff'};
const both=(a,b)=>['r','g','b'].filter(x=>a.includes(x)&&b.includes(x)).join('');
/* objects in coloured light: the shirt, the light, the options with their slips */
const SEE=[{obj:'red shirt',refl:'r',light:'rgb',o:[['Red','ok'],['White','reflectall'],['Black','dark'],['Pink','paint']]},
 {obj:'red shirt',refl:'r',light:'b',o:[['Black','ok'],['Purple','paint'],['Blue','reflectall'],['Red','keeps']]},
 {obj:'white shirt',refl:'rgb',light:'g',o:[['Green','ok'],['White','keeps'],['Black','white'],['Pale green','paint']]}];
/* filters: what goes in the beam, and the goal on the screen */
const FILT=[{n:'Red',s:'r'},{n:'Green',s:'g'},{n:'Blue',s:'b'}];
const BEAM=[{goal:'r',slots:1,pre:null,ask:'Make red light reach the screen.'},
 {goal:'',slots:2,pre:null,ask:'Use two filters so that no light reaches the screen.'},
 {goal:'b',slots:2,pre:{n:'Cyan',s:'gb'},ask:'A cyan filter lets green and blue through. Add one filter to make blue light.'}];
/* filter plus object: the lamp light goes through a filter onto an object */
const LIT=[{obj:'blue shirt',refl:'b',goal:'',ask:'Make the blue shirt look black.'},
 {obj:'white shirt',refl:'rgb',goal:'g',ask:'Make the white shirt look green.'},
 {obj:'yellow banana',refl:'rg',goal:'r',ask:'A yellow banana reflects red and green. Make it look red.'}];
const DESC=['A ray box shines white light into a glass prism. Seven bands of colour land on a screen. Drag each colour name to its band.',
 'The spectrum from a prism. Tap the colour that bent the most, then put a second, upside-down prism in the coloured light.',
 'A lamp shines coloured light on a shirt. Choose the colour the shirt looks. 3 goes.',
 'White light from a lamp goes through filters to a screen. Drag filters into the beam. 3 goes.',
 'A lamp with a filter shines on an object. Choose the filter that gives the colour asked for. 3 goes.'];
const TXT=['White light is a mix of colours.','Violet bends most, red least.','An object reflects its colour, absorbs the rest.','A filter lets its own colour through.','Filter and object: what is left?'];
const DONE=['Red, orange, yellow, green, blue, indigo, violet: lowest frequency to highest.',
 'Violet bent most. A second prism put the colours back together: white light again.',
 'The shirt can only reflect colours that are in the light shining on it.',
 'Filters only take colours away. Two filters with no colour in common let no light through.',
 'The object reflects only the part of the filtered light that it can reflect; if there is none, it looks black.'];
const QS=[{q:'Which colour of the spectrum has the highest frequency?',a:'Violet',o:[['Red','flip'],['Green','order']]},
 {q:'Why does a prism split white light into colours?',a:'Each colour refracts by a different amount',o:[['The glass adds the colours','adds'],['The glass is coloured inside','adds']]},
 {q:'What colour does a red shirt look in blue light?',a:'Black',o:[['Purple','paint'],['Blue','reflectall']]},
 {q:'What colour does a white shirt look in green light?',a:'Green',o:[['White','keeps'],['Black','white']]},
 {q:'White light goes through a red filter, then a green filter. What gets through?',a:'No light',o:[['Yellow light','addfilter'],['Red light','second']]},
 {q:'Why does a black object look black in white light?',a:'It absorbs all the colours',o:[['It reflects all the colours','blackwhite'],['It reflects black light','blacklight']]},
 {q:'Which filter makes a yellow banana look red?',a:'A red filter',o:[['A blue filter','yellowblue'],['A green filter','yellowgreen']]},
 {q:'In the spectrum, which colour comes straight after green?',a:'Blue',o:[['Yellow','flip'],['Indigo','near']]}];
/* a reply for each slip in the lab and the challenge (the order slips live in flag_prism.js) */
const WHY={leastmost:'Red bent the least: it is nearest the straight-on path. The highest frequency, violet, bends most.',
 most:'Look for the band furthest from the straight-on path. Higher frequency bends more.',
 adds:'The glass adds nothing. A second prism turns the colours back into white light, so they were in the white light all along.',
 paint:'Light does not mix like paint. An object can only send back colours that are in the light shining on it.',
 reflectall:'A coloured object does not reflect every colour. A red shirt reflects red and absorbs the rest.',
 keeps:'An object only looks its own colour if that colour is in the light. Change the light and the colour you see changes.',
 dark:'There is red in white light, and the red shirt reflects it. It only looks black when no red light reaches it.',
 white:'A white object reflects every colour, so it shows whatever colour of light falls on it.',
 wrongfilter:'A filter lets only its own colour through. Which filter lets only red through?',
 same:'Two filters of the same colour still let that colour through. The second filter must absorb what the first let through.',
 cyanpart:'Cyan lets green and blue through, and a green filter keeps the green: green light, not blue.',
 cyanred:'Cyan light has no red in it, so a red filter absorbs it all: no light. Which filter keeps only the blue?',
 litblack:'To look black, the object must get no light it can reflect.',
 litcol:'Pick the filter whose colour the object reflects and that matches the colour asked for.',
 addfilter:'Filters only take light away. Red leaves only red, and a green filter absorbs red: no light.',
 second:'The green filter absorbs the red light that the red filter let through.',
 blackwhite:'Reflecting all colours makes an object look white. Black absorbs them all.',
 blacklight:'There is no black light. Black is what we see when no light is reflected.',
 yellowblue:'Yellow reflects red and green, but no blue, so in blue light it looks black.',
 yellowgreen:'A green filter lets green through, and yellow reflects green, so it would look green.'};
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',FONT='px system-ui,sans-serif';
function box(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
/* the dark optics bench: light shows best in a darkened room */
function bench(g,r){g.fillStyle='#0b1220';box(g,r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle='#334155';g.lineWidth=1.5;g.stroke()}
function beam(g,x1,y1,x2,y2,col,w){g.strokeStyle=col;g.lineWidth=w||5;g.lineCap='round';g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();g.lineCap='butt'}
function rayBox(g,x,y,s){g.fillStyle='#475569';box(g,x-s,y-s*.45,s,s*.9,4);g.fill();g.fillStyle='#e2e8f0';g.fillRect(x-3,y-s*.18,3,s*.36)}
/* a triangular glass prism with its point up (flip: point down) */
function prism(g,cx,cy,s,flip,st){const h=s*.87,d=flip?-1:1;g.fillStyle='rgba(186,230,253,.28)';g.strokeStyle=st&&st.sel?'#60a5fa':'#bae6fd';g.lineWidth=st&&st.sel?4:2;g.beginPath();g.moveTo(cx,cy-d*h*.62);g.lineTo(cx+s/2,cy+d*h*.38);g.lineTo(cx-s/2,cy+d*h*.38);g.closePath();g.fill();g.stroke()}
/* a T-shirt or banana in the colour it is seen */
function thing(g,x,y,s,name,col,unknown){g.lineWidth=2.5;g.strokeStyle=unknown?'#94a3b8':col==='#111827'?'#64748b':'#e2e8f0';g.fillStyle=unknown?'#1f2937':col;
 if(/banana/.test(name)){g.beginPath();g.moveTo(x-s*.5,y-s*.1);g.quadraticCurveTo(x,y+s*.55,x+s*.5,y-s*.15);g.quadraticCurveTo(x,y+s*.25,x-s*.5,y-s*.1);g.closePath();g.fill();g.stroke()}
 else{g.beginPath();g.moveTo(x-s*.2,y-s*.45);g.lineTo(x-s*.5,y-s*.3);g.lineTo(x-s*.38,y-s*.05);g.lineTo(x-s*.28,y-s*.1);g.lineTo(x-s*.28,y+s*.45);g.lineTo(x+s*.28,y+s*.45);g.lineTo(x+s*.28,y-s*.1);g.lineTo(x+s*.38,y-s*.05);g.lineTo(x+s*.5,y-s*.3);g.lineTo(x+s*.2,y-s*.45);g.quadraticCurveTo(x,y-s*.3,x-s*.2,y-s*.45);g.closePath();g.fill();g.stroke()}
 if(unknown){g.fillStyle='#f8fafc';g.font=`800 ${Math.round(s*.35)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText('?',x,y+s*.05)}}
/* a filter slot in the beam */
function filter(g,r,f,st){g.fillStyle=f?HEX[f.s]:'rgba(148,163,184,.12)';g.globalAlpha=f?.85:1;box(g,r.x,r.y,r.w,r.h,5);g.fill();g.globalAlpha=1;g.setLineDash(f?[]:[5,4]);g.strokeStyle=st.no?'#f87171':st.sel?'#60a5fa':'#cbd5e1';g.lineWidth=st.no||st.sel?4:2;g.stroke();g.setLineDash([])}
/* a tray tile: a colour name or a filter */
function tile(g,r,t,st){g.fillStyle=st.sel?'#dbeafe':st.no?'#fee2e2':st.used?'#e2e8f0':'#ffffff';g.strokeStyle=st.sel?'#1d4ed8':st.no?NO:RIM;g.lineWidth=st.sel||st.no?4:2;box(g,r.x,r.y,r.w,r.h,10);g.fill();g.stroke();
 let left=r.x+8;if(st.sw){g.fillStyle=st.sw;g.strokeStyle='#334155';g.lineWidth=1.5;box(g,r.x+8,r.y+r.h*.25,r.h*.5,r.h*.5,4);g.fill();g.stroke();left=r.x+r.h*.5+14}
 let k=16;g.font=`800 ${k}${FONT}`;const room=r.x+r.w-6-left;while(g.measureText(t).width>room&&k>11){k--;g.font=`800 ${k}${FONT}`}
 g.fillStyle=st.used?'#475569':INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,left+room/2,r.y+r.h/2)}
return{WHY,SPEC,NAME,HEX,both,SEE,FILT,BEAM,LIT,DESC,TXT,DONE,QS,INK,OK,NO,RIM,FONT,box,bench,beam,rayBox,prism,thing,filter,tile}})();
