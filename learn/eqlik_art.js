/* Data for the equally-likely-outcomes lab (flag_eqlik.js; bundled in the main learn.js like mil_art.js so the lab file
   stays under 20 KB). CARDS: situations to sort as equally likely (0) or not (1), each with the slip a wrong sort shows.
   RNG(seed) is a small seeded generator, so every learner (and the browser gate) sees the same 60 rolls. */
const EQART={
COL:[['Red','#b91c1c'],['Blue','#1d4ed8'],['Gold','#8a5a00']],
START6:[0,0,0,0,1,2],
CARDS:[
 ['Heads or tails when you flip a fair coin',0,'A fair coin has two faces and nothing favours either one, so heads and tails have the same chance.'],
 ['Rolling a 6 or rolling a 1 on a fair dice',0,'A 6 only feels rare because games make us wait for it. A fair dice has one face for each number, so 6 and 1 are equally likely.'],
 ['Red or blue from a bag of 3 red and 1 blue',1,'Two colours does not mean two equal chances. Three of the four counters are red, so red is three times as likely as blue.'],
 ['Your team wins or loses its next match',1,'Two possible results is not the same as a 50-50 chance. A strong team wins far more often than it loses.'],
 ['A drawing pin lands point up or on its side',1,'The pin is not the same on both sides, so there is no reason the two ways to land are equally likely. Only an experiment can tell.'],
 ['Pulling one of 30 names from a hat (all folded the same)',0,'Each folded name is the same size and shape, so every name has a 1 in 30 chance.']],
RNG(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}},
FAIR:r=>1+Math.floor(r()*6),
LOADED:r=>{const u=r();return u<1/3?6:1+Math.floor((u-1/3)/(2/15))},
bank:[
 ['A spinner has 4 sections: red, red, blue and yellow, all the same size. Which colour is most likely?','Red, because it has 2 of the 4 sections',[['They are all equally likely: there are 3 colours','countNames'],['Yellow, because it is last','luckyPlace']]],
 ['You roll a fair dice. Which is true?','A 6 is as likely as a 1',[['A 6 is harder to roll than a 1','sixRare'],['After three 6s in a row, a 6 is less likely','memory']]],
 ['Two dice are rolled and added. Which total is most likely?','7',[['12','bigBetter'],['Every total from 2 to 12 is equally likely','allTotals']]],
 ['A bag has 5 green and 5 purple counters. Are green and purple equally likely?','Yes: 5 of the 10 counters each',[['No: purple is a rarer colour','luckyPlace'],['You cannot know without trying it once','oneTry']]],
 ['A fair dice is rolled 60 times. Which result is most believable?','12 sixes',[['Exactly 10 of every number, every time','exact'],['0 sixes','sixRare']]],
 ['Tomorrow it will either rain or not rain. Is that a 50-50 chance?','No: two outcomes are not always equally likely',[['Yes: there are only two outcomes','twoWays'],['Yes: weather is always 50-50','twoWays']]]],
WHY:{countNames:'That counts the colour names, not the sections. Red covers 2 of the 4 equal sections, so it is twice as likely as blue.',
 luckyPlace:'Where a colour sits, or how rare it seems, does not change its chance. Count the equal parts each outcome has.',
 sixRare:'Every face of a fair dice is the same shape and size, so a 6 is just as likely as any other number.',
 memory:'A dice has no memory. Each roll starts fresh, so after three 6s a 6 is still 1 in 6.',
 bigBetter:'12 needs 6 + 6, only 1 way out of 36. 7 can be made 6 ways: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1.',
 allTotals:'The totals are outcomes, but they are made in different numbers of ways. List the 36 pairs: 7 has 6 of them, 2 has only 1.',
 oneTry:'One try shows one result, not a chance. Here you can count: 5 of 10 counters are green and 5 are purple.',
 exact:'Real results wobble. A fair dice gives about 10 of each in 60 rolls, but rarely exactly 10.',
 twoWays:'Having two possible outcomes does not make them equally likely. Some days are far more likely to be dry than wet.'}};
