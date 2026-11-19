/* Data for flagerupt (Eruption types and volcano shape, ages 9–11). Sources: USGS Volcano Hazards Program ("Principal
   types of volcanoes": shield volcanoes, composite volcanoes or stratovolcanoes; "Lava flows", "Volcanic gases",
   "Mount St. Helens 1980", "Pinatubo 1991", "Mauna Loa 2022", "Kīlauea 2018"); British Geological Survey ("Volcanic
   eruptions: how magma type controls eruption style"); Icelandic Met Office (Fagradalsfjall 2021). Magma figures are
   typical values: basalt about 50% silica at about 1150 °C, andesite about 60% at about 1000 °C, rhyolite 70% or more
   at about 750 °C. More silica and a cooler melt make magma thicker (more viscous), so gas cannot escape and pressure
   builds; runny basalt lets gas bubble out, so it erupts gently as lava flows. Slips it targets: every volcano
   explodes; runny lava builds steep cones; a wide, low volcano must be small; lava rivers are the main killer in an
   explosive eruption; thick magma has no gas. */
const ERP=(()=>{
const MAGMA=[{n:'Runny',rock:'basalt',si:'about 50%',deg:'about 1150 °C',reach:.44,lift:.07,col:'#ea580c'},
 {n:'Medium',rock:'andesite',si:'about 60%',deg:'about 1000 °C',reach:.27,lift:.13,col:'#c2410c'},
 {n:'Sticky',rock:'rhyolite',si:'70% or more',deg:'about 750 °C',reach:.12,lift:.24,col:'#9a3412'}];
/* what happens when gas rises through each magma: pressure reached (0 to 1) and the eruption it gives */
const GAS=[{p:.2,style:'gentle',say:'Bubbles rise and pop at the top. Gas escapes easily, so lava fountains and pours out in rivers: a gentle (effusive) eruption.'},
 {p:.6,style:'mixed',say:'Some bubbles escape, some get stuck and burst. You get lava flows with bursts of hot lava bits: in between.'},
 {p:1,style:'explosive',say:'Bubbles are trapped in the thick magma. Pressure climbs until the magma shatters into ash and rock: an explosive eruption.'}];
/* build targets: four layers each. 'flow' = a runny lava flow (wide and thin), 'ash' = ash and sticky lava (short and thick) */
const BUILD=[{name:'Mauna Loa, Hawaiʻi',shape:'shield',need:'flow',tip:'wide with gentle slopes'},
 {name:'Mount Fuji, Japan',shape:'composite',need:'ash',tip:'a tall, steep cone'}];
const LAYER={flow:{w:.42,t:.055,label:'Runny lava flow'},ash:{w:.17,t:.11,label:'Ash + sticky lava'}};
const CARDS=[{v:'Mauna Loa, Hawaiʻi, 2022',clue:'Runny basalt lava poured out in rivers for 2 weeks.',s:0,shape:'shield'},
 {v:'Mount St Helens, USA, 1980',clue:'A blast blew off the top. Ash rose about 24 km high.',s:1,shape:'composite'},
 {v:'Fagradalsfjall, Iceland, 2021',clue:'Lava fountains and slow lava rivers. People walked up to watch.',s:0,shape:'fissure'},
 {v:'Pinatubo, Philippines, 1991',clue:'Sticky magma. Ash rose about 35 km and fell like snow.',s:1,shape:'composite'},
 {v:'Kīlauea, Hawaiʻi, 2018',clue:'Runny lava flowed from cracks for 3 months.',s:0,shape:'shield'},
 {v:'Vesuvius, Italy, AD 79',clue:'Ash and pumice buried the town of Pompeii.',s:1,shape:'composite'}];
const BINS=['Gentle (effusive)','Explosive'];
const GUIDE=[{s:'All volcanoes explode.',ok:false,fix:'Volcanoes with runny basalt magma, like Mauna Loa, mostly erupt gently with lava flows.'},
 {s:'Mauna Loa is wide and gentle because its lava is runny.',ok:true,fix:'Runny lava flows a long way before it cools, so layer after layer builds a wide shield.'},
 {s:'Steep cones are made by runny lava that flows fast.',ok:false,fix:'Runny lava spreads out. Steep cones build from ash and sticky lava that piles up near the vent.'},
 {s:'Thick magma traps gas, so pressure builds up.',ok:true,fix:'Bubbles cannot rise through thick magma, so the gas pushes harder and harder until it blasts out.'},
 {s:'In an explosive eruption, rivers of lava are the main danger.',ok:false,fix:'The big dangers are ash and fast, hot clouds of ash and gas. Sticky lava hardly flows.'},
 {s:'A low, wide volcano must be a small one.',ok:false,fix:'Mauna Loa looks low, but it is the largest active volcano on Earth. Its slopes are just gentle.'}];
const DESC=['Three cups of magma above a vent. Tap a cup to pour it and see how far the lava flows.',
 'A vent full of magma. Drag the knob or use the buttons to pick runny, medium or sticky magma, then let the gas out.',
 'An empty ground line with a dashed outline of a volcano. Add layers with the two buttons to match the outline.',
 'One eruption card at a time and two boxes: gentle (effusive) and explosive. Tap a box.',
 'A guide robot at a volcano park. Buttons: Right or Slip.'];
const DONE=['Runny lava flows far and stays low. Sticky lava piles up near the vent.',
 'Thick, sticky magma traps gas, so it erupts explosively. Runny magma lets gas out gently.',
 'Runny lava flows build a wide shield. Ash and sticky lava build a steep cone.',
 'Runny basalt lava gives gentle eruptions. Sticky magma gives explosive ones.',
 'You caught the guide: not all volcanoes explode, and a wide volcano can be huge.'];
const QS=[{q:'Which magma is most likely to give an explosive eruption?',a:'Thick, sticky magma with lots of gas',o:[['Runny, hot magma','runny'],['Magma with no gas at all','nogas']]},
 {q:'Mauna Loa is wide with gentle slopes. What is its lava like?',a:'Runny: it flows a long way',o:[['Sticky: it piles up','steep'],['It has no lava, only ash','ashonly']]},
 {q:'Why does sticky magma explode?',a:'Gas is trapped, so pressure builds',o:[['It is hotter than runny magma','hot'],['It has no gas inside','nogas']]},
 {q:'Which shape do layers of ash and sticky lava build?',a:'A tall, steep cone',o:[['A wide, gentle shield','steep'],['A flat plain with no hill','flat']]},
 {q:'Do all volcanoes explode?',a:'No: runny magma often erupts gently',o:[['Yes, every eruption explodes','all'],['Only small volcanoes explode','size']]},
 {q:'A volcano is low and very wide. What can you say?',a:'Its lava was probably runny',o:[['It must be small','size'],['It must be explosive','all']]}];
return{MAGMA,GAS,BUILD,LAYER,CARDS,BINS,GUIDE,DESC,DONE,QS}})();
