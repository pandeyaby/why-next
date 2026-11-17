/* Data for the Earth's layers lab (flag_layers.js; bundled in learn.js so the lab file stays small).
   Rounded values (USGS, BGS, National Geographic): Earth's radius about 6,371 km; crust about 5–10 km thick under the
   oceans and about 30–70 km under continents (35 km used here); mantle about 2,900 km thick, solid rock that creeps very
   slowly; outer core about 2,200 km thick, liquid iron and nickel; inner core about 1,220 km in radius, solid iron and nickel
   at about 5,000–5,400 °C. Temperatures rise with depth: the top of the mantle is about 1,000 °C. */
const LAYERSART=(()=>{
/* [name, outer radius as a fraction of Earth's radius in the drawing (crust exaggerated), true thickness km, solid?, colour, temperature words] */
const L=[['Crust',1,35,1,'#a16207','cool on top, hot at the bottom'],['Mantle',.9,2900,1,'#ea580c','about 1,000 to 3,700 °C'],['Outer core',.55,2200,0,'#facc15','about 4,000 to 5,000 °C'],['Inner core',.19,1220,1,'#fde68a','about 5,000 °C, as hot as the Sun’s surface']];
const DRAWN=[1,.9,.55,.19];
const LABELS=[2,0,3,1];
const KIDS=[['The mantle is…',[['Ali','a sea of runny lava.','The mantle is mostly solid rock. It is so hot it creeps very slowly, like very stiff toffee.'],['Bea','very hot rock that is mostly solid.',''],['Cal','cold and hard like the crust.','The mantle is very hot: about 1,000 °C at the top and hotter lower down.']]],
 ['The crust is…',[['Dev','the thickest layer.','The crust is the thinnest layer. The mantle is about 80 times thicker.'],['Eli','thin, like the skin on an apple.',''],['Fay','made of metal.','The crust is rock. The core is the metal part.']]],
 ['The core is…',[['Gus','made of rock and ice.','The core is metal, mostly iron and nickel. It is far too hot for ice.'],['Hana','the coolest part of Earth.','The core is the hottest part of Earth.'],['Ivy','hot metal at the centre of Earth.','']]]];
const QZ=[['Which layer do we live on?','The crust',[['The mantle','deep'],['The core','deep']]],
 ['Which layer is the thinnest?','The crust',[['The mantle','thick'],['The inner core','thick']]],
 ['Where is Earth hottest?','At the centre',[['At the crust','hot'],['Halfway down the mantle','hot']]],
 ['Is the mantle a sea of lava?','No, it is mostly solid hot rock',[['Yes, it is all liquid','lava'],['No, it is cold rock','cold']]],
 ['Which layer is liquid metal?','The outer core',[['The inner core','squeeze'],['The crust','deep']]],
 ['Name the layers from the outside in.','Crust, mantle, outer core, inner core',[['Mantle, crust, outer core, inner core','order'],['Crust, outer core, mantle, inner core','order']]]];
const WHY={deep:'We live on the outside layer, the crust. The others are deep under our feet.',thick:'The crust is the thinnest layer by far. On a ball the size of an apple it would be as thin as the skin.',
 hot:'It gets hotter the deeper you go, so the centre is hottest.',lava:'The mantle is mostly solid rock. It is very hot and creeps very slowly, but it is not a sea of lava.',cold:'The mantle is very hot, about 1,000 °C at the top.',
 squeeze:'The inner core is the hottest part, but it is squeezed so hard that it stays solid. The outer core is the liquid one.',order:'From the outside in: crust, then mantle, then outer core, then inner core at the centre.'};
return{L,DRAWN,LABELS,KIDS,QZ,WHY}})();
