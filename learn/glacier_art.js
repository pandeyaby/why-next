/* Data for flagglacier (glaciers and ice sheets, ages 9–11). Sources: NSIDC "Glacier quick facts" and "Science of
   glaciers" (snow that survives a melt season becomes firn, about two thirds as dense as water; burial squeezes out
   air until it is glacier ice, which for most glaciers takes more than a hundred years; a glacier flows down and out
   under its own weight; it grows when more snow is gained than lost, mass balance); NSIDC "Ice sheet quick facts"
   (Greenland would raise sea level about 7.4 m, Antarctica about 58 m); NSIDC "Quick facts on Arctic sea ice"
   (floating sea ice does not directly raise sea level when it melts); British Geological Survey and Geological
   Society (abrasion, plucking, U-shaped valleys, moraine); EPICA Dome C ice core (about 800,000 years of trapped air;
   carbon dioxide about 180–190 ppm in ice ages and about 280 ppm in warm times before 1800; NOAA: over 420 ppm now).
   The stack, valley, gauge and core are drawings, not to scale. Slips it targets: a glacier is a frozen river or lake,
   cold alone makes a glacier, a shrinking glacier flows backwards, a river and a glacier leave the same valley shape,
   melting sea ice floods coasts, Greenland holds most ice, and deeper ice is younger. */
const GLAC=(()=>{
const KIND=[{n:'Fresh snow',fill:'#ffffff',ink:'#0f172a',about:'light and fluffy, full of air'},
 {n:'Firn',fill:'#bfdbfe',ink:'#0f172a',about:'old snow that lasted a summer, with grains like sugar and about two thirds as heavy as water'},
 {n:'Glacier ice',fill:'#1d4ed8',ink:'#ffffff',about:'hard blue ice with air only in tiny bubbles'}];
const kindOf=age=>age>=4?2:age>=1?1:0;
const GOALS=[{g:'grow',q:'Make the glacier grow longer.'},{g:'shrink',q:'Now make the glacier shrink.'},{g:'same',q:'Now make it stay the same length.'}];
const SHOW_BAL=[[5,2],[2,5],[3,3]];
const ICE=[{n:'Arctic sea ice',sub:'floats on the sea',m:0},{n:'Greenland ice sheet',sub:'on land',m:7.4},{n:'Antarctic ice sheet',sub:'on land',m:58}];
const CORE=[{n:'Top sample',at:.1,age:'about 200 years old',air:'about 280 ppm of carbon dioxide'},
 {n:'Middle sample',at:.48,age:'about 20,000 years old',air:'about 190 ppm of carbon dioxide: an ice age'},
 {n:'Bottom sample',at:.9,age:'about 800,000 years old',air:'air from long before there were people'}];
const TXT=['A glacier starts as snow. Where more snow falls in winter than melts in summer, the layers pile up. The weight squeezes the old snow into firn, then into hard glacier ice.',
 'Ice is heavy, so a glacier slowly flows downhill. Snow adds ice at the top and melting takes it away at the end. Which one wins decides if the glacier grows or shrinks.',
 'Rocks frozen into the ice scrape the valley like sandpaper. The ice also pulls out loose blocks. A river cuts a V, but a glacier fills the valley and leaves a U.',
 'Greenland and Antarctica are covered by ice sheets: glaciers as big as countries. Ice that melts off the land adds water to the sea.',
 'Each year’s snow lies on top of the last, so deeper ice is older. Bubbles in the ice hold tiny samples of old air.'];
const DESC=['A stack of snow layers with a snow cloud and a summer sun beside it. Drag the cloud onto the stack to add a winter of snow, or use the buttons.',
 'A glacier in a valley, with a bar for winter snow and a bar for summer melt. Set the bars, then run 10 years.',
 'A slice across a river valley with a glacier above it. Drag the glacier down into the valley 3 times, or use the buttons.',
 'Three kinds of ice beside the sea, with a sea level ruler. Drag each one into the sea to melt it, or use the buttons.',
 'A slice through an ice sheet with a drill on top. Drag the drill down to take samples, or use the buttons.'];
const DONE=['Your first snow is now glacier ice. It was squeezed by the layers on top, not frozen from water.',
 'More snow than melt: it grows. More melt than snow: it shrinks. Equal: it stays. The ice always flows downhill.',
 'The glacier scraped the V-shaped river valley into a wide U and left piles of rock called moraine.',
 'Sea ice: almost no change. Greenland: about 7 m. Antarctica: about 58 m. Ice on land raises the sea; floating ice hardly does.',
 'Deeper ice is older. The bottom of the ice sheet holds air from about 800,000 years ago.'];
const QS=[{q:'Where does the ice in a glacier come from?',a:'Snow pressed down over many years',o:[['A frozen river','river'],['A frozen lake','river']]},
 {q:'A glacier’s end has moved 50 m back up its valley. Which way is its ice flowing?',a:'Still down the valley',o:[['Up the valley','back'],['It has stopped moving','back']]},
 {q:'All the floating Arctic sea ice melts. What happens to sea level?',a:'It hardly changes',o:[['It rises about 7 m','sea'],['It rises about 58 m','sea']]},
 {q:'A valley has steep sides and a wide, flat floor. What carved it?',a:'A glacier',o:[['A river','vee'],['The wind','vee']]},
 {q:'Ice from 3 km down in Antarctica and ice from 100 m down: which is older?',a:'The ice 3 km down',o:[['The ice 100 m down','young'],['They are the same age','young']]},
 {q:'Which ice sheet would raise sea level more if it all melted?',a:'Antarctica, about 58 m',o:[['Greenland, about 7 m','size'],['Neither: ice on land cannot raise the sea','land']]},
 {q:'A place is freezing all year, but almost no snow falls. Will a glacier grow there?',a:'No: it needs more snow than melts',o:[['Yes: cold is enough','cold'],['Yes, but only in summer','cold']]}];
/* a snow cloud and a sun, drawn as drag tokens */
const cloud=(g,x,y,r)=>{g.fillStyle='#e2e8f0';g.strokeStyle='#334155';g.lineWidth=1.8;g.beginPath();g.arc(x-r*.45,y+r*.1,r*.45,Math.PI*.5,Math.PI*1.5);g.arc(x,y-r*.2,r*.55,Math.PI,Math.PI*1.95);g.arc(x+r*.5,y+r*.05,r*.45,Math.PI*1.4,Math.PI*.5);g.closePath();g.fill();g.stroke();
 g.strokeStyle='#1e3a8a';g.lineWidth=1.5;[-.4,0,.4].forEach(d=>{const cx=x+d*r,cy=y+r*.75;for(let k=0;k<3;k++){const a=k*Math.PI/3;g.beginPath();g.moveTo(cx-Math.cos(a)*r*.14,cy-Math.sin(a)*r*.14);g.lineTo(cx+Math.cos(a)*r*.14,cy+Math.sin(a)*r*.14);g.stroke()}})};
const sun=(g,x,y,r)=>{g.strokeStyle='#b45309';g.lineWidth=2.4;for(let k=0;k<8;k++){const a=k*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*r*.6,y+Math.sin(a)*r*.6);g.lineTo(x+Math.cos(a)*r*.95,y+Math.sin(a)*r*.95);g.stroke()}g.fillStyle='#facc15';g.beginPath();g.arc(x,y,r*.48,0,7);g.fill();g.stroke()};
/* depth of a valley floor across its width (u from -1 to 1): a V for t=0, a U for t=1 */
const floor=(u,t)=>{const v=1-Math.abs(u),w=Math.sqrt(Math.max(0,1-Math.pow(Math.abs(u),3)));return v*(1-t)+w*t};

const MSG={topNew:'The top ice is the newest: it fell as snow most recently. Snow piles on top each year, so the deepest ice was buried first.',
 deeper:'Deeper ice was buried earlier, so it is older. Which sample left is deepest?',
 summer:'A warm summer melted the top layer. Ice only builds up where more snow falls in winter than melts in summer.',
 nosnow:'There is no snow to melt yet. Add a winter first.',
 first:'A winter of fresh snow. Will it last the summer?',
 three:'Three samples. Now tap them from oldest to youngest.',
 vee:'A V is cut by a river, only at the very bottom. The glacier filled the whole valley and scraped the sides too, so it left a U.',
 uok:'Yes: a U shape, with steep sides and a wide, flat floor. The rock piles it dropped are called moraine.',
 carve:['Rocks frozen into the bottom of the ice scrape the floor like sandpaper. This is called abrasion.','The ice freezes onto loose rock and pulls out blocks. This is called plucking. The sides get steeper.','The ice has scraped the whole valley. Now the climate warms and the glacier melts away, dropping the rocks it carried. What shape is the valley now?'],
 melt:i=>i===0?'Sea level hardly changed. Sea ice already floats, so it was already pushing aside its own weight of water.':i===1?'Up about 7.4 m: higher than a two-storey house. That ice was on land, so its water is new to the sea.':'Up about 58 m: as high as a 20-storey block of flats. Antarctica holds far more ice than Greenland.',
 wrongBal:got=>got==='grow'?'More snow fell than melted, so the glacier grew. Change the bars and run again.':got==='shrink'?'More melted than fell, so the end moved back up the valley. Change the bars and run again.':'Snow in equals melt out, so the length stayed the same. Change the bars and run again.',
 rightBal:got=>got==='grow'?'Yes: more snow than melt, so the end pushed further down the valley.':got==='shrink'?'Yes, it shrank. The end moved up the valley, but watch the stone: the ice still flowed down. It melted faster than it arrived.':'Yes: snow in equals melt out, so the end stays put while the ice keeps flowing.'};
/* canvas UI for the lab: wrapped text, the banner with its feedback line, pills, tags and a row of tap targets */
const ui=(gA,gg,S)=>{const YES='#047857',NO='#b91c1c',RIM='#64748b',PX='px system-ui,sans-serif';let A,g;const fz=n=>A.narrow?n:Math.round(n*1.1),dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':'#0f172a';const sync=()=>{A=gA();g=gg()};
function lines0(t,max,font){g.font=font;const o=[];let cur='';for(const w of t.split(' ')){const tr=cur?cur+' '+w:w;if(cur&&g.measureText(tr).width>max){o.push(cur);cur=w}else cur=tr}if(cur)o.push(cur);return o}
function top0(t,tone){const font=`700 ${fz(15)}${PX}`,L=lines0(t,A.W-34,font),lh=fz(15)*1.3,h=L.length*lh+16;
 g.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);g.fill();
 g.lineWidth=tone?2.5:1.2;g.strokeStyle=tone==='ok'?YES:tone==='no'?NO:RIM;g.stroke();g.font=font;g.fillStyle=fg();g.textAlign='left';g.textBaseline='top';L.forEach((r,i)=>g.fillText(r,17,16+i*lh));
 let y=8+h+6;if(S.note){const f2=`700 ${fz(13)}${PX}`,L2=lines0(S.note,A.W-36,f2).slice(0,4);g.font=f2;g.fillStyle=S.bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':YES);L2.forEach((r,i)=>g.fillText(r,18,y+i*fz(13)*1.3));y+=L2.length*fz(13)*1.3+6}return y}
function pill0(r,t,st){st=st||{};g.fillStyle=st.no?'#fee2e2':st.ok?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=st.no||st.ok?3:1.4;g.strokeStyle=st.no?NO:st.ok?YES:RIM;g.stroke();
 let n=fz(14);g.font=`800 ${n}${PX}`;while(g.measureText(t).width>r.w-8&&n>9){n--;g.font=`800 ${n}${PX}`}g.fillStyle='#0f172a';g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
const tag0=(t,x,y,bg)=>A.paint.label(t,x,y,{font:`800 ${fz(11)}${PX}`,bg:bg||'#1f2937',col:'#ffffff'});
const row0=(i,n,y)=>{const w=Math.min(150,(A.W-16-6*(n-1))/n),h=Math.min(42,A.H*.1);return{x:(A.W-(n*w+6*(n-1)))/2+i*(w+6),y:y==null?A.H-h-6:y,w,h}};
return{lines:(...a)=>{sync();return lines0(...a)},top:(...a)=>{sync();return top0(...a)},pill:(...a)=>{sync();return pill0(...a)},tag:(...a)=>{sync();return tag0(...a)},row:(...a)=>{sync();return row0(...a)}}};
return{ui,MSG,KIND,kindOf,GOALS,SHOW_BAL,ICE,CORE,TXT,DESC,DONE,QS,cloud,sun,floor}})();
