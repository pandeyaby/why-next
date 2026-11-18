/* Data for the brave polar explorers lab (flag_polex.js; bundled in the main learn.js so the lab file stays small).
   Dates from the expedition records: Amundsen left Framheim on 20 October 1911 and reached the South Pole on 14 December
   1911; Scott left Cape Evans on 1 November 1911 and reached the Pole on 17 January 1912, found Amundsen's tent, and died with
   his four companions on the way back. Shackleton's Endurance was trapped in Weddell Sea ice in January 1915, crushed and sank
   in November 1915; the James Caird reached South Georgia after about 16 days; all 28 men were rescued by 30 August 1916.
   RACE: day 0 = 20 October 1911. KIT: [card, helps 1/0, why]. STORY: Endurance events in order. ACTS: [card, brave 1/0, why]. */
const POLEXART={
RACE:{amStart:0,amEnd:55,scStart:12,scEnd:89,last:89},
DATE:d=>{const m=[['October',20,31],['November',1,30],['December',1,31],['January',1,31]];let left=d;for(const [n,s,len] of m){const room=len-s+1;if(left<room)return`${s+left} ${n}`;left-=room}return'later'},
KIT:[['Sled dogs to pull the sledge',1,'Yes. Dogs run on top of the snow and pull heavy sledges. Amundsen used dogs.'],
 ['Ponies in deep snow',0,'Ponies sink in deep snow and get very cold. Scott took ponies, and they could not go on.'],
 ['Skis to slide over the snow',1,'Yes. Skis spread your weight, so you slide on top of the snow and do not sink.'],
 ['Sandals',0,'Sandals let your toes freeze. Explorers wore thick boots made of fur or leather.'],
 ['Warm fur clothes',1,'Yes. Amundsen learned from Inuit people to wear loose fur clothes that keep the cold out.'],
 ['A beach umbrella',0,'An umbrella does not keep you warm, and the strong wind would blow it away.'],
 ['Snow goggles for your eyes',1,'Yes. Bright sun on white snow can hurt your eyes. Goggles protect them.'],
 ['Food left in stores on the way',1,'Yes. Food stores on the way, called depots, mean you do not carry it all at once.']],
STORY:['Endurance sails south','Sea ice traps the ship','The ice crushes the ship','The men camp on the ice',
 'Boats reach Elephant Island','Shackleton sails for help','Every man is saved'],
MIX:[3,0,5,1,6,2,4],
ACTS:[['Keep going when it is cold and hard',1,'That is endurance: not giving up when it is hard.'],
 ['Go out in a storm with no coat',0,'That is not brave, it is not safe. Brave explorers plan and keep safe.'],
 ['Share your food with the team',1,'Caring for your team helped Shackleton bring every man home.'],
 ['Run off and leave your friends',0,'Shackleton never left his men. He went for help and came back for them.'],
 ['Go back again and again to save your crew',1,'Shackleton tried four times before his ship could get through the ice to his men.'],
 ['Give up at the first problem',0,'When the ship sank, Shackleton made a new plan. Giving up would not save anyone.'],
 ['Plan and pack well before you go',1,'Brave and sensible: good plans and good kit kept explorers alive.']],
BANK:[['Who got to the South Pole first?','Roald Amundsen',[['Robert Scott','scott'],['Ernest Shackleton','shack']]],
 ['What pulled Amundsen\'s sledges?','Dogs',[['Ponies','ponies'],['Cars','cars']]],
 ['What happened to the ship Endurance?','Ice crushed it',[['It sailed home','sailed'],['A whale sank it','whale']]],
 ['How many of Shackleton\'s men were saved?','All of them',[['Half of them','half'],['None of them','none']]],
 ['Which of these is brave and sensible?','Pack warm clothes and keep going',[['Go out with no coat','nocoat'],['Leave your team behind','leave']]],
 ['Where is the South Pole?','In Antarctica, the coldest place',[['In the hot desert','desert'],['At the top of the world','north']]]],
WHY:{scott:'Scott got there about 5 weeks later. Amundsen\'s flag and tent were already there.',shack:'Shackleton never reached the South Pole. He is famous for saving his crew.',
 ponies:'Scott took ponies. Amundsen took dogs, which run on top of the snow.',cars:'There were no cars at the South Pole. Amundsen used dogs and skis.',
 sailed:'Endurance did not get home. The sea ice squeezed it until it broke and sank.',whale:'No whale. Thick sea ice froze around the ship and crushed it.',
 half:'Every one of the 28 men got home. Shackleton did not leave anyone behind.',none:'They all got home. Shackleton sailed for help and came back for them.',
 nocoat:'Going out with no coat is not brave, it is not safe. Brave explorers plan well.',leave:'Leaving your team is not brave. Shackleton kept his team together.',
 desert:'The South Pole is in Antarctica. It is covered in ice, not sand.',north:'The top of the world is the North Pole. The South Pole is at the bottom, in Antarctica.'}};
