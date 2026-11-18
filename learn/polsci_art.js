/* Data for the polar exploration then-and-now lab (flag_polsci.js; bundled in the main learn.js so the lab file stays small). Dates: Heroic Age 1897–1922; Amundsen left Framheim 19 Oct 1911, reached the Pole 14 Dec 1911 (56 days) and was back 26 Jan 1912 after 99 days and about 3,000 km; first GPS satellite 1978; Sputnik 1957; Byrd's South Pole flight 1929; Halley VI 2013; dogs removed by 1994; first women at the South Pole 1969. KIT/TEAM: [card, bin 0 then / 1 now, why, short tag]. QS: [question, then-tool, now-tool]. CORE: [depth fraction, label, CO2 ppm] */
const POLSCIART=(()=>{
/* [card, right bin, why it is wrong in the other bin] */
const KIT=[['Dog sledge',0,'Dogs pulled sledges in 1911, but they were taken out of Antarctica by 1994 to protect seals, under the Antarctic Treaty rules.','Dog sledge'],
 ['GPS receiver',1,'GPS needs satellites. The first GPS satellite went up in 1978, long after the Heroic Age.','GPS'],
 ['Sextant for Sun sights',0,'A sextant measures the Sun’s height to work out where you are. GPS replaced it: it is right to a few metres.','Sextant'],
 ['Satellite phone',1,'There were no satellites before 1957. In 1911 no one could call home from the ice.','Satellite phone'],
 ['Wooden ship with sails',0,'Today’s polar ships, like RRS Sir David Attenborough, have steel hulls built to break through sea ice.','Wooden ship'],
 ['Ski plane',1,'No plane flew over the South Pole until 1929, after the Heroic Age ended in 1922.','Ski plane'],
 ['Pemmican: dried meat and fat',0,'Pemmican was sledging food in 1911. Today stations have kitchens and food flown in.','Pemmican'],
 ['Station on legs that can move',1,'Halley VI, on legs with skis, opened in 2013. In 1911 teams lived in wooden huts and slept in tents.','Station on legs']];
const TEAM=[['No women went on the expeditions',0,'Women were not taken on Heroic Age expeditions. That changed: in 1969 the first women reached the South Pole, and today women lead polar science teams.','No women'],
 ['Scientists from more than 50 countries share data',1,'This is today. The Antarctic Treaty of 1959 keeps Antarctica for peace and science, and more than 50 countries have joined it.','50+ countries'],
 ['Teams raced to plant their country’s flag first',0,'Racing to be first, like Amundsen and Scott in 1911, was the Heroic Age. Today no country owns the Pole.','Flag races'],
 ['Liz Thomas leads ice-core science for the British Antarctic Survey',1,'This is today. Dr Liz Thomas is a glaciologist who studies past climate in ice cores.','Liz Thomas, ice cores'],
 ['News came home by ship, months later',0,'In 1911 there was no radio on the ice. Amundsen’s news reached the world in March 1912, three months after he got to the Pole.','News by ship'],
 ['Women and men work side by side at research stations',1,'This is today. Women now work at, and run, polar research stations.','Women and men']];
/* old question -> then-tool, right now-tool, wrong now-tool tags */
const QS=[['Where am I?','Sextant and Sun sights','GPS from satellites'],
 ['How cold is it?','Thermometer read by hand','Weather station'],
 ['How thick is the ice?','No way to see under it','Radar from planes'],
 ['What was it like long ago?','Fossils in rocks','Ice cores']];
const TOOLS=['Ice cores','GPS from satellites','Radar from planes','Weather station'];
/* ice-core samples: depth fraction, label, CO2 */
const CORE=[[.12,'Ice from about 1800','about 280'],[.42,'Ice from about 20,000 years ago, in the Ice Age','about 190'],[.93,'Ice from about 800,000 years ago','under 300']];
const DIST=1500,KM='1,500',SLED=56,PLANE=5;
const Q=[['Which of these is new since the Heroic Age?','Satellite phone',[['Dog sledge','dogs'],['Sextant','sext']]],
 ['How did Amundsen’s news reach the world in 1912?','By ship and telegraph, months later',[['By radio from the Pole','radio'],['By satellite phone','sat']]],
 ['Deep ice in an ice core is…','older than the ice above it',[['younger than the ice above it','young'],['the same age all the way down','same']]],
 ['Did Heroic Age explorers do science?','Yes: rocks, fossils and weather records',[['No, they only raced','race'],['Only after 1959','race']]],
 ['Who does polar science today?','Teams of women and men from many countries',[['Only explorers from one country','one'],['Only men, as in 1911','men']]],
 ['Why can today’s scientists stay all winter in comfort?','Heated stations, supplies flown in',[['Better dog sledges','dogs'],['Thicker tents','tent']]]];
const FIX={dogs:'Dog sledges are Heroic Age kit. Dogs were taken out of Antarctica by 1994.',sext:'A sextant is old kit: GPS replaced it.',radio:'There was no radio on the ice in 1911. The news went by ship to Hobart, then by telegraph.',
 sat:'There were no satellites until 1957.',young:'Snow piles up on top each year, so the deepest ice fell first. It is the oldest.',same:'Each year’s snow is a new layer on top. Deeper means older.',
 race:'They did science too: Scott’s team carried fossil rocks back from the Beardmore Glacier.',one:'Today teams are international: more than 50 countries are in the Antarctic Treaty.',men:'Not today. The first women reached the South Pole in 1969, and women now lead polar science teams.',tent:'Scientists today live in heated stations, not tents.'};
return{KIT,TEAM,QS,TOOLS,CORE,DIST,KM,SLED,PLANE,Q,FIX}})();
