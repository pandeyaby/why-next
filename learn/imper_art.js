/* Data for the metric and imperial lab (flag_imper.js; bundled in the main learn.js so the lab file stays small).
   Exact values: 1 inch = 2.54 cm, 1 lb = 0.45359 kg (1 kg ≈ 2.2 lb), 1 UK pint = 568 ml (1 litre ≈ 1.75 pints).
   RULER: inch targets for the pencil ([inches, prompt]). OPS: conversion cards ([text, rule index, why]) and RULES.
   EST: number-line estimates ([question, unit, max, snap, true value, divide-hint]). bank: challenge [q, answer, wrongs]. */
const IMPART={
RULER:[[4,'Make the pencil 4 inches long'],[8,'Now make it about 20 cm long'],[12,'Make it 1 foot (12 inches) long']],
RULES:['× 2.5','÷ 2.5','× 2.2','÷ 2.2'],
OPS:[['6 inches → cm',0,'Centimetres are smaller than inches, so you need more of them: 6 × 2.5 = 15 cm.'],
 ['50 cm → inches',1,'Inches are bigger, so you need fewer of them: 50 ÷ 2.5 = 20 inches.'],
 ['3 kg → pounds',2,'Pounds are lighter than kilograms, so you need more of them: 3 × 2.2 = 6.6 lb.'],
 ['22 pounds → kg',3,'Kilograms are heavier, so you need fewer of them: 22 ÷ 2.2 = 10 kg.'],
 ['10 inches → cm',0,'More of the smaller unit: 10 × 2.5 = 25 cm.'],
 ['11 pounds → kg',3,'Fewer of the bigger unit: 11 ÷ 2.2 = 5 kg.']],
EST:[['A new baby weighs 7 pounds. About how many kilograms?','kg',10,.5,7/2.2,'Pounds are lighter, so the baby is fewer kilograms: 7 ÷ 2.2 is about 3.'],
 ['A pizza is 12 inches across. About how many centimetres?','cm',50,5,12*2.54,'Centimetres are smaller, so there are more of them: 12 × 2.5 = 30.'],
 ['A jug holds 6 pints. About how many litres?','litres',6,.5,6*.568,'Pints are smaller than litres, so there are fewer litres: 6 ÷ 1.75 is about 3.5.']],
bank:[['About how many centimetres is 1 inch?','2.5 cm',[['1 cm','same'],['10 cm','tenfold']]],
 ['About how many pounds is 1 kilogram?','2.2 pounds',[['Half a pound','flip'],['10 pounds','tenfold']]],
 ['About how many pints is 1 litre?','1.75 pints',[['Half a pint','flip'],['10 pints','tenfold']]],
 ['To change pounds to kilograms, you…','divide by 2.2',[['multiply by 2.2','wrongway'],['add 2.2','add']]],
 ['A bag of flour weighs 2 kg. About how many pounds?','4.4 pounds',[['About 1 pound','wrongway'],['4.2 pounds','add']]],
 ['A ruler is 30 cm long. About how many inches?','12 inches',[['75 inches','wrongway'],['27.5 inches','add']]]],
WHYM:{same:'An inch is longer than a centimetre: about 2.5 cm fit along one inch.',tenfold:'That is far too big. Use the rough rule: about 2.5 cm in an inch, 2.2 lb in a kilogram, 1.75 pints in a litre.',
 flip:'A kilogram is heavier than a pound and a litre is more than a pint, so 1 of the big unit is more than 1 of the small one.',
 wrongway:'Check the size of the answer: changing to a bigger unit gives a smaller number, so divide. Changing to a smaller unit gives a bigger number, so multiply.',
 add:'Converting units means multiplying or dividing by the rate, not adding or taking away.'}};
