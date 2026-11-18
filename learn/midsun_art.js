/* Data and sky maths for the midnight sun lab (flag_midsun.js; bundled in the main learn.js so the lab file stays small).
   Sun height: sin(alt) = sin(lat)·sin(dec) + cos(lat)·cos(dec)·cos(hour angle), no refraction. Dates: 21 June (dec +23.44°)
   and 21 December (dec −23.44°). Home is latitude 51.5° N (London): about 16.4 h of light in June. At the North Pole the
   Sun's height equals the declination all day, so it circles at about 23° in June and stays about 23° below in December.
   PLACES: [label, latitude, declination]. CARDS: sort cards [text, bin, why]. BANK/WHY: challenge. */
const MIDSUN=(()=>{const R=Math.PI/180,TILT=23.44;
const alt=(lat,dec,hour)=>Math.asin(Math.sin(lat*R)*Math.sin(dec*R)+Math.cos(lat*R)*Math.cos(dec*R)*Math.cos((hour-12)*15*R))/R;
const PLACES={home:['At home, 21 June',51.5,TILT],june:['North Pole, 21 June',90,TILT],dec:['North Pole, 21 December',90,-TILT]};
const BINS=['At home','North Pole in summer','North Pole in winter'];
const CARDS=[['Sun up at midnight',1,'Only near the poles in summer. At the North Pole in June the Sun never sets.'],
 ['Dark at lunchtime',2,'In polar winter the Sun stays below the land, even at lunchtime.'],
 ['Sunrise in the morning, sunset in the evening',0,'At home the Sun comes up and goes down every day.'],
 ['The Sun goes round the sky but never sets',1,'Midnight sun: in polar summer it circles the sky all day and night.'],
 ['Stars out all day long',2,'Polar night: the sky stays dark, so you can see stars at any time.'],
 ['Light for breakfast, dark at bedtime',0,'At home each day has some light and some dark.']];
const BANK=[['Summer at the North Pole. Where is the Sun at midnight?','Still in the sky',[['Gone, below the snow','set'],['Right overhead','overhead']]],
 ['Winter at the North Pole. What do you see at lunchtime?','A dark sky, maybe stars',[['Bright sunshine','lunch'],['A sunset','sunsetw']]],
 ['Why does the North Pole get the midnight sun in June?','Earth leans the pole toward the Sun',[['The Sun comes closer','closer'],['The Sun gets hotter','hotter']]],
 ['In June the North Pole has the midnight sun. What does the South Pole have?','Polar night: dark',[['The midnight sun too','both'],['Day and night, like home','likehome']]],
 ['At home, what happens every day?','Some light and some dark',[['Light all day and night','allday'],['Dark all day','alldark']]],
 ['How long can the polar night last at the North Pole?','Months',[['One night','onenight'],['Forever','forever']]]];
const WHY={set:'In polar summer the Sun does not set. At midnight it is still low in the sky.',overhead:'Even in summer the polar Sun stays low. It circles the sky; it is never right overhead.',
 lunch:'In polar winter the Sun never comes up, not even at lunchtime.',sunsetw:'There is no sunset: the Sun never came up. It is polar night.',closer:'The Sun does not move closer. Earth leans, so the North Pole tips toward the Sun in June.',
 hotter:'The Sun is the same. What changes is which way Earth leans.',both:'When the North Pole leans toward the Sun, the South Pole leans away. It is dark there.',
 likehome:'Poles are not like home. In June the South Pole leans away from the Sun, so it stays dark.',allday:'Night still comes at home. Only places near the poles get the midnight sun.',
 alldark:'Even in winter, home gets some daylight every day.',onenight:'At the pole the dark lasts for months, not one night.',forever:'It ends. In spring the Sun comes back up and stays up for months.'};
return{alt,TILT,PLACES,BINS,CARDS,BANK,WHY}})();
