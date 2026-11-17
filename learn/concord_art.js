/* Data for the agreement lab (flag_concord.js; bundled in the main learn.js so the lab file stays small).
   Subject–verb agreement: the verb agrees with the head noun of the subject, not with a noun inside a phrase after it
   (the box of crayons is). Each, every, everyone and one of take a singular verb; with neither … nor or either … or the
   verb agrees with the nearer subject; in there is / there are the subject comes after the verb. Pronoun–antecedent
   agreement: a pronoun matches the noun it stands for (its antecedent) in number. Collective nouns (team, group) and
   singular they are avoided in scored items because British English and current style guides accept both forms. */
const CONCORDART=(()=>{
const P={paper:'#fffdf7',ink:'#111827',dim:'#374151',rim:'#a16207',tile:'#ffffff',tileEdge:'#1e3a8a',head:'#1e3a8a',headBg:'#dbeafe',
 strike:'#6b7280',gap:'#7c2d12',gapBg:'#ffedd5',okc:'#166534',okBg:'#dcfce7',bad:'#9f1239',badBg:'#ffe4e6',link:'#7c3aed',linkBg:'#ede9fe'};
/* head noun: [words, index of head noun, [first, last] of the phrase to cross out, verb, why a wrong tap is wrong] */
const HEAD=[[['The','box','of','crayons','___','on','the','shelf.'],1,[2,3],'is','Crayons is inside the phrase “of crayons”. Cross it out: the box is.'],
 [['The','children','in','the','park','___','loud.'],1,[2,4],'are','Park is inside “in the park”. The children are loud.'],
 [['The','key','to','the','doors','___','lost.'],1,[2,4],'is','Doors is inside “to the doors”. One key is lost.'],
 [['A','bowl','of','strawberries','___','on','the','table.'],1,[2,3],'sits','Strawberries is inside “of strawberries”. One bowl sits there.'],
 [['The','pupils','with','a','red','badge','___','first.'],1,[2,5],'go','Badge is inside “with a red badge”. The pupils go first.'],
 [['The','list','of','names','___','long.'],1,[2,3],'is','Names is inside “of names”. One list is long.']];
/* verb drag: [before gap, after gap, right verb, wrong verb, why] */
const DRAG=[['One of my friends','a dog.','has','have','The subject is one, not friends: one has.'],
 ['The bag of apples','heavy.','is','are','Cross out “of apples”: the bag is heavy.'],
 ['There','two pens on the desk.','are','is','In “there is/are” the subject comes after the verb: two pens are.'],
 ['The cakes on the plate','gone.','are','is','Cross out “on the plate”: the cakes are gone.'],
 ['There','a fox in the garden.','is','are','The subject comes after the verb: a fox is.'],
 ['The noise of the drums','loud.','was','were','Cross out “of the drums”: the noise was loud.'],
 ['My shoes, as well as my coat,','wet.','are','is','Cross out “as well as my coat”: my shoes are wet.']];
/* each / every / neither…nor: [sentence with ___, options (first right), rule shown, why] */
const RULE=[['Each of the boys ___ a lunchbox.',['has','have'],'each = one','Each means every single one, so it is singular: each has.'],
 ['Everyone ___ here.',['is','are'],'everyone = one','Everyone is one word for every single person, so it is singular: everyone is.'],
 ['Neither the cat nor the dogs ___ hungry.',['are','is'],'nearer subject','With neither … nor, match the nearer subject. Dogs is nearer: are.'],
 ['Either the dogs or the cat ___ the bowl.',['licks','lick'],'nearer subject','The cat is nearer the verb, so the cat licks.'],
 ['Every boy and girl ___ a turn.',['gets','get'],'every = one','Every makes each one count on its own: every boy and girl gets.'],
 ['Sam and Ali ___ the bus.',['catch','catches'],'and = more than one','Two people joined by and make a plural subject: Sam and Ali catch.']];
/* pronoun: [sentence parts before / after the gap, antecedent word, right pronoun, wrong pronoun, why] */
const PRON=[['The tree dropped','leaves.','tree','its','their','The antecedent is the tree, one thing: its leaves.'],
 ['The girls packed','bags.','girls','their','her','The antecedent is the girls, more than one: their bags.'],
 ['The box of pens fell.','lid came off.','box','Its','Their','The lid belongs to the box, not the pens: its lid.'],
 ['The bikes were muddy. Dad washed','.','bikes','them','it','Them points back to the bikes in the first sentence. Two or more bikes: them.'],
 ['Mia and Sam lost','map.','Mia and Sam','their','her','Mia and Sam is two people joined by and: their map.'],
 ['My brother found a shell. He gave','to me.','shell','it','them','It points back to one shell in the sentence before.']];
/* note to fix: [word, fix or null, why]; three agreement errors */
const NOTE=[['The',null],['bag',null],['of',null],['apples',null],['are',['is'],'Cross out “of apples”: the bag is.'],['on',null],['the',null],['table.',null],
 ['Each',null],['of',null],['the',null],['boys',null],['want',['wants'],'Each is singular: each wants.'],['one.',null],
 ['The',null],['apples',null],['are',null,'This one is right: the apples are, more than one.'],['sweet,',null],['so',null],['eat',null],['it',['them'],'It points back to the apples, more than one: them.'],['slowly.',null]];
/* challenge: [question, right, [[wrong, tag]...]] */
const QS=[['The basket of eggs ___ full.','is',[['are','near']]],
 ['One of the windows ___ open.','is',[['are','near'],['were','near']]],
 ['There ___ three birds on the fence.','are',[['is','there']]],
 ['Neither my sister nor my parents ___ coming.','are',[['is','nor']]],
 ['Each of the girls ___ a medal.','has',[['have','each']]],
 ['The dogs barked. I gave ___ a bone each.','them',[['it','ante'],['him','ante']]],
 ['The cupboard of toys lost ___ handle.','its',[['their','pnear']]],
 ['Tom and his dad ___ fishing.','go',[['goes','and']]]];
return {P,HEAD,DRAG,RULE,PRON,NOTE,QS}})();
