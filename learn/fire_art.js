/* Data for the explaining-events-and-ideas flagship (flagfire), ages 9–10. CCSS ELA RI.4.3 ("explain events,
   procedures, ideas, or concepts in a historical, scientific, or technical text, including what happened and why,
   based on specific information in the text") and RI.5.3; National Curriculum England KS2 reading (retrieve, record
   and present information from non-fiction; explain and discuss understanding). The short text about the Great Fire
   of London is checked against the Museum of London and the National Archives teaching pages. */
const FIRE66=(()=>{
const EVENT='The fire spread across most of the City of London (2 to 6 September 1666)';
const TEXT=[
 {t:'On Sunday 2 September 1666, a fire started in a bakery on Pudding Lane.',about:'where and when it started'},
 {t:'The summer had been hot and dry, so the wooden houses were very dry.',about:'the dry summer'},
 {t:'The houses stood close together, and their top floors leaned out over narrow streets.',about:'how close the houses were'},
 {t:'A strong wind from the east blew sparks from roof to roof.',about:'the wind'},
 {t:'Stores by the river were full of things that burn fast, like oil, tar and coal.',about:'the stores by the river'},
 {t:'At first the Lord Mayor would not let houses be pulled down to stop the fire.',about:'what the Lord Mayor did'},
 {t:'Later, houses were blown up with gunpowder to make gaps the fire could not cross.',about:'the gaps made with gunpowder'},
 {t:'On 5 September the wind dropped, and the fire slowed down.',about:'the wind dropping'},
 {t:'About 13,200 houses and 87 churches burned down, as well as St Paul’s Cathedral.',about:'what burned down'},
 {t:'London was rebuilt in brick and stone, and some streets were made wider.',about:'how London was rebuilt'}];
/* scene 1: causes, effects, details */
const SORT={ask:'Why did it spread, and what did it lead to? Sort the cards',zones:['Causes: why it spread','Effects: what it led to','Just a detail'],cards:[
 {t:'A hot, dry summer',to:0},{t:'13,200 houses burned down',to:1},{t:'A strong east wind',to:0},
 {t:'It started on a Sunday',to:2,why:'The day of the week did not make the fire spread. It tells you when, not why.'},
 {t:'Houses packed close together',to:0},{t:'London rebuilt in brick and stone',to:1},{t:'Stores full of oil, tar and coal',to:0}]};
/* scene 2: tap the sentence that proves the claim */
const PROOF=[{ask:'Prove it: the wind helped the fire spread',ans:3,look:'the wind'},
 {ask:'Prove it: flames could jump easily between houses',ans:2,look:'how close the houses were'},
 {ask:'Prove it: people were slow to act at first',ans:5,look:'what someone in charge did at the start'},
 {ask:'Prove it: the fire changed how London was built',ans:9,look:'what happened after the fire'}];
/* scene 3: a word that shows the reason, not only the order */
const LINK=[{a:'The summer was hot and dry,',b:'the wooden houses burned easily.',ans:'so',
  no:{because:'Because would mean the houses made the summer dry. The dry summer came first, so use so.',then:'Then only says what came next. It hides the reason: the dry summer helped the houses burn.'}},
 {a:'The fire spread fast',b:'a strong wind was blowing.',ans:'because',
  no:{so:'So would mean the fire made the wind blow. The wind came first. The fire spread because of it.',then:'Then says the wind came later. It was already blowing, and it is the reason: because.'}},
 {a:'Houses were blown up with gunpowder,',b:'the fire had nothing to burn in the gaps.',ans:'so',
  no:{because:'Because would mean the gaps caused the houses to be blown up. It is the other way round: so.',then:'Then gives only the order. Blowing up houses made the gaps, so the fire stopped there.'}},
 {a:'London was rebuilt in brick and stone',b:'the wooden houses had burned so fast.',ans:'because',
  no:{so:'So would mean the new brick houses made the old wooden ones burn. They came later: because.',then:'Then gets the order wrong. The fire came first. The rebuilding happened because of it.'}}];
const WORDS=['because','so','then'];
/* scene 4: a procedure, with the reason for each step */
const STEPS={ask:'How to make a firebreak: put the steps in order',zones:['Step 1','Step 2','Step 3'],cards:[
 {t:'Get everyone out of those houses',to:1,why1:'people must be safe before any house comes down'},
 {t:'Wait until the houses catch fire',to:-1,why:'A burning house cannot stop a fire. The gap has to be made before the flames arrive.'},
 {t:'Pick houses in the path of the fire',to:0,why1:'the gap must be where the fire is going'},
 {t:'Pull or blow the houses down before the flames arrive',to:2,why1:'a gap with nothing to burn stops the fire'}]};
/* scene 5: a chain where each effect is the cause of the next link */
const CHAIN={ask:'One thing led to another: build the chain',zones:['1','2','3','4','5'],cards:[
 {t:'13,200 houses burn down',to:3},{t:'A long, hot, dry summer',to:0},{t:'London is rebuilt in brick',to:4},
 {t:'Sparks set roof after roof alight',to:2},{t:'The wooden houses dry out',to:1}]};
const QS=[
 {q:'Why did the fire spread so far?',a:'Wind, dry wooden houses close together, and stores of oil and tar',o:[['Because it started in a bakery','one'],['Because it was a Sunday','detail']]},
 {q:'Which sentence explains, not just tells?',a:'The fire spread fast because a strong wind was blowing',o:[['The fire started, and then the wind blew','order'],['There was a fire in 1666','detail']]},
 {q:'Which of these is an effect of the fire?',a:'London was rebuilt in brick and stone',o:[['A hot, dry summer','flip'],['A strong east wind','flip']]},
 {q:'You say the houses were close together. How do you back it up?',a:'Quote sentence 3: the houses stood close together',o:[['Say that everyone knows it','proof'],['Say it again, more loudly','proof']]},
 {q:'Why were houses blown up on purpose?',a:'To make gaps the fire could not cross',o:[['Because they were already burning','late'],['To punish the baker','detail']]},
 {q:'Sentence 8 says the wind dropped. What did that change?',a:'The fire slowed down, so the gaps could hold',o:[['Nothing, wind does not matter','one'],['The fire got bigger','flip']]}];
return{EVENT,TEXT,SORT,PROOF,LINK,WORDS,STEPS,CHAIN,QS}})();
