/* Data for the miles and kilometres lab (flag_miles.js; bundled in the main learn.js so the lab file stays small).
   1 international mile = 1,760 yards = 1.609344 km exactly (international yard and pound agreement, 1959; NIST SP 811).
   So 5 miles = 8.047 km, which is why the school rule 5 miles ≈ 8 km (1 mile ≈ 1.6 km) works. NC England Y6 (statutory):
   "convert between miles and kilometres". WAYS: [given, from unit, answer by the 5 : 8 rule]. RACES: [label, km]. */
const MILESART={
KM:1.609344,
TARGET:40,
WAYS:[[24,'km',15],[40,'km',25],[15,'mi',24]],
CHAINS:[['× 8, then ÷ 5','up'],['÷ 8, then × 5','down']],
RACES:[['3 miles',3*1.609344],['5 km',5],['6 miles',6*1.609344],['10 km',10],['20 km',20],['15 miles',15*1.609344]],
BANK:[['About how many km is 40 miles?','64 km',[['25 km','flip'],['45 km','addfive']]],
 ['Which is longer: a 10 km race or a 6-mile run?','The 10 km race',[['The 6-mile run','sixmi'],['They are exactly the same','same']]],
 ['About how many miles is 80 km?','50 miles',[['128 miles','flip'],['85 miles','addfive']]],
 ['Why is 1 mile about 1.6 km?','8 km ÷ 5 miles = 1.6 km for each mile',[['A mile is 1,600 metres exactly','exact'],['1.6 is half of 3.2','half']]],
 ['A sign says 30 miles to London. About how many km is that?','48 km',[['about 19 km','flip'],['about 35 km','addfive']]],
 ['You change km into miles. What happens to the number?','It gets smaller',[['It gets bigger','bigger'],['It stays the same','same']]]],
WHY:{flip:'That used the rule the wrong way round. Miles are longer, so there are more km than miles: multiply by 8, then divide by 5.',
 addfive:'Adding 5 does not convert. Use the rule: 5 miles is about 8 km, so scale both numbers by the same amount.',
 sixmi:'6 miles is about 6 × 1.6 = 9.6 km. That is a bit less than 10 km.',
 same:'They are close but not the same. 6 miles is about 9.7 km, a little under 10 km.',
 exact:'A mile is about 1,609 metres, not exactly 1,600. The 5 : 8 rule gives 1.6 as a handy estimate.',
 half:'1.6 comes from 8 ÷ 5, the 5 miles ≈ 8 km rule shared out for one mile.',
 bigger:'A mile is longer than a km, so it takes fewer miles to cover the same distance. The number gets smaller.'}};
