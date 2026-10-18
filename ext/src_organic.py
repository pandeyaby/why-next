from dsl import T, C, P, R, L, M
D = "Matter & Materials"

# ---------------------------------------------------------------- carbon, formulae, hydrocarbons (wave 3)
T("og_carbon_bonding", C, D, "Why carbon forms so many compounds", "14-16",
  "Explain that carbon has four outer electrons and so forms four covalent bonds, and that carbon atoms can bond to each other in chains, branches and rings, giving millions of different compounds",
  ["States that carbon forms four covalent bonds and links this to its four outer electrons",
   "Draws a short carbon chain with every carbon having four bonds",
   "Explains why carbon can form far more compounds than most elements"],
  "If {{name}} is told there are millions of known carbon compounds but only a few hundred of neon, can they explain the difference using outer electrons and bonding?",
  ["HS-PS1-1"],
  [("bd_covalent", "h", "Carbon compounds are held together by covalent bonds"),
   ("at_shells", "h", "Four bonds follow from carbon's four outer-shell electrons")])

T("og_formulae_types", R, D, "Molecular, structural and displayed formulae", "14-16",
  "Represent organic molecules with molecular formulae (C₂H₆), condensed structural formulae (CH₃CH₃) and displayed formulae showing every bond, and convert between them",
  ["Writes the molecular formula from a displayed formula",
   "Draws the displayed formula of propane from CH₃CH₂CH₃",
   "Explains what a displayed formula shows that a molecular formula does not"],
  "If {{name}} is given the displayed formula of a molecule, can they write its molecular and structural formulae?",
  [],
  [("ch_formulae", "h", "Builds on counting atoms in chemical formulae"),
   ("og_carbon_bonding", "h", "Displayed formulae show carbon's four bonds")])

T("og_hydrocarbons", C, D, "Hydrocarbons", "14-16",
  "Define a hydrocarbon as a compound of hydrogen and carbon only, and distinguish hydrocarbons from other carbon compounds such as ethanol or glucose",
  ["Defines a hydrocarbon correctly, including the word 'only'",
   "Sorts formulae into hydrocarbons and non-hydrocarbons",
   "Explains why C₂H₅OH is not a hydrocarbon"],
  "If {{name}} sees the formulae CH₄, C₂H₅OH and C₃H₆, can they pick out the hydrocarbons and explain why?",
  [],
  [("og_carbon_bonding", "h", "Hydrocarbons are the simplest carbon compounds"),
   ("mt_Z_Wu_77ybI", "s", "Uses the distinction between elements and compounds")])

T("og_crude_oil", C, D, "Crude oil as a finite mixture of hydrocarbons", "14-16",
  "Describe crude oil as a mixture of many hydrocarbons, mostly alkanes, formed over millions of years from the remains of ancient marine organisms, and explain why it is a finite resource",
  ["Describes how crude oil formed",
   "Explains that crude oil is a mixture, not a compound",
   "Explains why crude oil is non-renewable"],
  "If {{name}} is told crude oil is 'running out', can they explain how it formed and why it can't be replaced on a human timescale?",
  ["KS3.Sci.Chem.EA.5"],
  [("og_hydrocarbons", "h", "Crude oil is made up of hydrocarbons"),
   ("mt_0e5rZxbAeR", "h", "Builds on fossil fuels as finite resources"),
   ("mt_MBTVB-E-S7", "s", "Uses the idea of a mixture of substances")])

T("og_alkanes", C, D, "Alkanes", "14-16",
  "Identify alkanes as saturated hydrocarbons with the general formula CₙH₂ₙ₊₂, and name and draw the first four (methane, ethane, propane, butane)",
  ["Names and draws methane to butane",
   "Uses CₙH₂ₙ₊₂ to write the formula of an alkane with 8 carbons",
   "Explains the meaning of 'saturated'"],
  "If {{name}} is asked for the formula of the alkane with 10 carbon atoms, can they work it out and explain why it is called saturated?",
  [],
  [("og_hydrocarbons", "h", "Alkanes are a family of hydrocarbons"),
   ("og_formulae_types", "h", "Requires drawing displayed formulae")])

T("og_homologous_series", C, D, "Homologous series", "14-16",
  "Explain that a homologous series is a family of compounds with the same general formula and functional group, where successive members differ by CH₂, with similar chemical properties and gradually changing physical properties",
  ["States the features of a homologous series",
   "Shows that successive alkanes differ by CH₂",
   "Predicts a property of a new member from a trend"],
  "If {{name}} is told about a family of compounds that all react the same way but have steadily rising boiling points, can they explain what makes it a homologous series?",
  [],
  [("og_alkanes", "h", "Alkanes are the first homologous series met"),
   ("mt_fxPtngwUfz", "s", "Spotting the CH₂ pattern uses number-pattern reasoning")])

T("og_alkane_properties", C, D, "Trends in properties of alkanes", "14-16",
  "Describe and explain how boiling point, viscosity and flammability of alkanes change with chain length, in terms of the strength of forces between molecules",
  ["Describes the boiling point trend with chain length",
   "Explains the trend using forces between molecules",
   "Links flammability and viscosity to chain length"],
  "If {{name}} compares petrol and candle wax, can they explain why the longer molecules in wax are solid and harder to light?",
  ["HS-PS1-3"],
  [("og_homologous_series", "h", "Graded physical properties are a feature of a series"),
   ("bd_simple_molecular", "h", "Explained by forces between molecules")])

T("og_fractional_distillation", P, D, "Fractional distillation of crude oil", "14-16",
  "Explain how crude oil is separated into fractions in a fractionating column with a temperature gradient, where hydrocarbons condense at different heights according to boiling point, and name uses of the main fractions",
  ["Describes the temperature gradient in the column",
   "Explains why short-chain fractions leave at the top",
   "Matches fractions to uses (fuel gas, petrol, kerosene, diesel, bitumen)"],
  "If {{name}} sees a diagram of a fractionating column, can they explain why petrol comes out near the top and bitumen at the bottom?",
  [],
  [("og_crude_oil", "h", "Crude oil is the mixture being separated"),
   ("og_alkane_properties", "h", "Separation relies on boiling point varying with chain length"),
   ("mt_U_tJvy3cbB", "h", "Extends simple distillation to many fractions")])

T("og_alkane_combustion", P, D, "Balanced equations for burning alkanes", "14-16",
  "Write balanced symbol equations for the complete combustion of any alkane, including larger alkanes that need fractional or doubled coefficients, and use the general formula to predict the oxygen needed",
  ["Balances the complete combustion of propane",
   "Balances the combustion of octane by doubling coefficients",
   "Explains why longer alkanes need more oxygen per molecule"],
  "If {{name}} writes the equation for burning butane, can they balance the oxygen without leaving a fraction?",
  ["HS-PS1-7"],
  [("ch_combustion", "h", "Extends combustion of fuels to general alkanes"),
   ("og_alkanes", "h", "Requires alkane formulae"),
   ("ch_balancing", "h", "Requires balancing equations")])

T("og_fuel_pollutants", C, D, "Sulfur dioxide, nitrogen oxides and particulates from fuels", "14-16",
  "Explain how sulfur impurities in fuels form sulfur dioxide, how high engine temperatures form nitrogen oxides from air, and how particulates arise, describe their effects (acid rain, breathing problems, global dimming) and how they can be reduced",
  ["Explains why sulfur dioxide and nitrogen oxides form even though fuels are hydrocarbons",
   "Links each pollutant to its effect",
   "Describes a method of reducing emissions, such as catalytic converters or desulfurising fuel"],
  "If {{name}} is asked why diesel cars are linked to poor city air, can they explain which pollutants form in the engine and why?",
  [],
  [("ch_combustion", "h", "Extends the products of combustion beyond CO₂, water, CO and soot"),
   ("mt_mTpV-0rtkO", "s", "Relates to the composition of the atmosphere"),
   ("mt_AN2kJE6I0s", "s", "Acid rain is explained with acidity and pH")])

# ---------------------------------------------------------------- alkenes and cracking
T("og_alkenes", C, D, "Alkenes", "14-16",
  "Identify alkenes as unsaturated hydrocarbons containing a C=C double bond with the general formula CₙH₂ₙ, and name and draw ethene, propene and butene",
  ["Draws ethene and propene showing the double bond",
   "Uses CₙH₂ₙ to identify an alkene from its formula",
   "Explains the meaning of 'unsaturated'"],
  "If {{name}} is shown C₃H₈ and C₃H₆, can they say which is an alkene and draw it?",
  [],
  [("og_homologous_series", "h", "Alkenes are a second homologous series"),
   ("bd_covalent", "h", "Requires the idea of a double covalent bond")])

T("og_bromine_test", P, D, "Testing for alkenes with bromine water", "14-16",
  "Use bromine water to distinguish alkenes from alkanes: orange bromine water turns colourless with an alkene because bromine adds across the double bond",
  ["Describes the result for an alkane and an alkene",
   "Explains the colour change in terms of the double bond",
   "Uses the test to identify an unknown hydrocarbon"],
  "If {{name}} has two unlabelled gases, propane and propene, can they describe a test to tell them apart?",
  [],
  [("og_alkenes", "h", "The test detects the C=C double bond")])

T("og_cracking", P, D, "Cracking long-chain hydrocarbons", "14-16",
  "Explain that cracking breaks long-chain alkanes into shorter alkanes and alkenes using heat and a catalyst or steam, write balanced cracking equations, and explain why it is needed to match supply with demand",
  ["Balances a cracking equation",
   "Explains why cracking is needed using supply and demand data",
   "Names the conditions for catalytic and steam cracking"],
  "If {{name}} sees that refineries produce more heavy fractions than people buy, can they explain how cracking helps and write an equation for it?",
  [],
  [("og_fractional_distillation", "h", "Cracking processes the heavier fractions"),
   ("og_alkenes", "h", "Cracking produces alkenes"),
   ("ch_balancing", "h", "Requires balancing equations")])

T("og_addition_reactions", C, D, "Addition reactions of alkenes", "15-17",
  "Describe how alkenes react by addition across the double bond with hydrogen (with a nickel catalyst), water (steam with a catalyst) and halogens, and draw the products",
  ["Draws the product of ethene with bromine",
   "Describes conditions for hydrogenation and hydration",
   "Explains why alkanes do not undergo addition"],
  "If {{name}} sees ethene react with steam, can they draw the product and explain why it is called an addition reaction?",
  [],
  [("og_alkenes", "h", "Addition happens at the C=C double bond"),
   ("og_bromine_test", "s", "The bromine test is an addition reaction")])

# ---------------------------------------------------------------- functional groups
T("og_functional_groups", C, D, "Functional groups", "15-17",
  "Explain that a functional group is the atom or group of atoms that gives an organic compound its characteristic reactions, and recognise C=C, –OH, –COOH and –COO– in structures",
  ["Identifies the functional group in a given structure",
   "Explains why compounds with the same functional group react similarly",
   "Names the homologous series from the functional group"],
  "If {{name}} is shown the structures of ethanol, ethanoic acid and ethene, can they circle the functional group in each and name the family?",
  [],
  [("og_homologous_series", "h", "Each homologous series is defined by a functional group"),
   ("og_alkenes", "s", "C=C is the first functional group met")])

T("og_naming", L, D, "Naming organic compounds", "15-17",
  "Name simple organic compounds using IUPAC stems (meth-, eth-, prop-, but-), suffixes (-ane, -ene, -ol, -oic acid) and position numbers, and draw a structure from its name",
  ["Names a compound from its displayed formula",
   "Draws propan-2-ol from its name",
   "Explains what the number in but-1-ene means"],
  "If {{name}} is given the name butan-1-ol, can they draw it and explain what each part of the name tells them?",
  [],
  [("og_functional_groups", "h", "Suffixes encode the functional group"),
   ("og_alkanes", "h", "Stems come from the alkane names")])

T("og_alcohols", C, D, "Alcohols", "15-17",
  "Recognise alcohols by the –OH group, name and draw methanol to butanol, and describe their properties and uses as fuels and solvents",
  ["Draws ethanol and propanol",
   "Describes reactions of alcohols with sodium and in combustion",
   "Gives uses of ethanol"],
  "If {{name}} is told hand sanitiser contains an alcohol, can they draw ethanol and describe two of its properties?",
  [],
  [("og_functional_groups", "h", "Alcohols are defined by the –OH functional group")])

T("og_carboxylic_acids", C, D, "Carboxylic acids", "15-17",
  "Recognise carboxylic acids by the –COOH group, name methanoic to butanoic acid, describe their reactions with carbonates and metals, and explain that they are weak acids because they only partly ionise",
  ["Draws ethanoic acid",
   "Writes a word equation for ethanoic acid with sodium carbonate",
   "Explains why vinegar is a weak acid"],
  "If {{name}} adds vinegar to baking soda, can they name the gas produced and explain why vinegar is a weak acid?",
  [],
  [("og_functional_groups", "h", "Defined by the –COOH functional group"),
   ("ch_acid_ions", "h", "Acidity is explained by releasing hydrogen ions"),
   ("mt_QKRYLwaOU8", "s", "Builds on reactions of acids forming salts")])

T("og_alcohol_oxidation", C, D, "Oxidising alcohols to carboxylic acids", "15-17",
  "Describe how ethanol can be oxidised to ethanoic acid by oxidising agents or by microbes in air, explaining why wine left open turns sour",
  ["Writes a word equation for the oxidation of ethanol",
   "Explains why opened wine tastes of vinegar",
   "Identifies oxidation as gain of oxygen or loss of hydrogen here"],
  "If {{name}} leaves a bottle of wine open for a week, can they explain the chemistry behind it tasting sour?",
  [],
  [("og_alcohols", "h", "The starting material is an alcohol"),
   ("og_carboxylic_acids", "h", "The product is a carboxylic acid"),
   ("mt_v0K6GRi4ZL", "s", "Builds on oxidation as a reaction type")])

T("og_esters", C, D, "Esters", "15-17",
  "Describe how an alcohol and a carboxylic acid react with an acid catalyst to form an ester and water, name simple esters such as ethyl ethanoate, and give uses in flavourings and perfumes",
  ["Writes a word equation for making ethyl ethanoate",
   "Identifies the ester link in a structure",
   "Gives a use of esters linked to their smell and volatility"],
  "If {{name}} warms ethanol with ethanoic acid and a few drops of sulfuric acid, can they predict what forms and why it smells fruity?",
  [],
  [("og_alcohols", "h", "One reactant is an alcohol"),
   ("og_carboxylic_acids", "h", "One reactant is a carboxylic acid")])

T("og_ester_equilibrium", C, D, "Esterification as a reversible reaction", "16-18",
  "Explain that esterification is reversible and reaches equilibrium, and suggest ways to increase the yield of ester such as using excess alcohol or removing water",
  ["Writes the equilibrium equation for esterification",
   "Suggests one change that increases ester yield",
   "Explains the role of the acid catalyst at equilibrium"],
  "If {{name}} wants more ethyl ethanoate from a reaction mixture, can they suggest a change and explain it with Le Chatelier's principle?",
  ["HS-PS1-6"],
  [("og_esters", "h", "Applies equilibrium ideas to ester formation"),
   ("ch_le_chatelier", "h", "Uses Le Chatelier's principle")])

T("og_functional_group_tests", P, D, "Tests for functional groups", "16-18",
  "Use chemical tests to identify functional groups: bromine water for C=C, sodium carbonate for –COOH, and acidified potassium dichromate for primary and secondary alcohols",
  ["States the positive result for each test",
   "Plans a sequence of tests to identify three unknowns",
   "Explains why a tertiary alcohol gives no change with dichromate"],
  "If {{name}} has three unlabelled liquids, an alkene, an alcohol and a carboxylic acid, can they plan tests to identify each?",
  [],
  [("og_bromine_test", "h", "Includes the alkene test"),
   ("og_carboxylic_acids", "h", "Uses the carbonate reaction of acids"),
   ("og_alcohol_classes", "h", "The dichromate test depends on alcohol class")])

T("og_alcohol_classes", C, D, "Primary, secondary and tertiary alcohols", "16-18",
  "Classify alcohols as primary, secondary or tertiary from their structure and predict their oxidation products: aldehydes then carboxylic acids, ketones, or no reaction",
  ["Classifies a given alcohol",
   "Predicts the oxidation product of propan-2-ol",
   "Explains why tertiary alcohols resist oxidation"],
  "If {{name}} oxidises propan-1-ol and propan-2-ol, can they predict different products and explain why?",
  [],
  [("og_alcohol_oxidation", "h", "Extends oxidation of ethanol to other alcohols"),
   ("og_isomers", "s", "Positional isomers of alcohols give different classes")])

# ---------------------------------------------------------------- structure and isomerism
T("og_isomers", C, D, "Structural isomers", "16-18",
  "Explain that structural isomers have the same molecular formula but different structures (chain, position or functional-group isomers), and draw and name isomers of small molecules",
  ["Draws two isomers of C₄H₁₀",
   "Identifies positional isomers of an alcohol",
   "Explains why isomers can have different boiling points"],
  "If {{name}} is told butane and methylpropane are both C₄H₁₀, can they draw both and explain why they are different compounds?",
  [],
  [("og_formulae_types", "h", "Isomers share a molecular formula but not a displayed formula"),
   ("og_alkanes", "h", "Chain isomers start with alkanes"),
   ("og_naming", "s", "Isomers are told apart by name")])

T("og_stereoisomers", C, D, "E/Z isomerism", "16-18",
  "Explain that restricted rotation about a C=C bond can give E/Z (geometric) isomers when each carbon of the double bond has two different groups, and identify E and Z forms",
  ["Explains why the C=C bond cannot rotate",
   "Identifies whether an alkene can show E/Z isomerism",
   "Labels the E and Z isomers of but-2-ene"],
  "If {{name}} draws but-2-ene in two ways, can they explain why these are different molecules but but-1-ene has no such pair?",
  [],
  [("og_isomers", "h", "Extends isomerism to spatial arrangements"),
   ("og_alkenes", "h", "Depends on the C=C double bond")])

T("og_skeletal", R, D, "Skeletal formulae", "16-18",
  "Read and draw skeletal formulae, where lines represent carbon chains and hydrogens on carbon are implied, and convert to and from displayed formulae",
  ["Draws the skeletal formula of pentane",
   "Counts carbons and hydrogens from a skeletal formula",
   "Shows a functional group on a skeletal formula"],
  "If {{name}} sees a zig-zag line with an OH at the end, can they name the molecule and give its molecular formula?",
  [],
  [("og_formulae_types", "h", "A further way to represent structures"),
   ("og_naming", "s", "Converting usually involves naming")])

# ---------------------------------------------------------------- polymers
T("og_addition_polymers", C, D, "Addition polymerisation", "15-17",
  "Explain how many alkene monomers join to form an addition polymer, draw the repeating unit from the monomer and the monomer from the repeating unit, and name polymers such as poly(ethene) and poly(chloroethene)",
  ["Draws the repeating unit of poly(propene)",
   "Deduces the monomer from a polymer section",
   "Explains why no other product forms"],
  "If {{name}} is shown a section of a polymer chain, can they draw the monomer it was made from?",
  [],
  [("og_alkenes", "h", "Monomers are alkenes with C=C bonds"),
   ("og_addition_reactions", "s", "Polymerisation is a repeated addition"),
   ("mt_w83U-_noVR", "s", "Builds on KS3 polymers as materials")])

T("og_polymer_properties", C, D, "Polymer structure and properties", "15-17",
  "Explain how chain length, branching and cross-linking affect polymer properties, and distinguish thermosoftening from thermosetting polymers in terms of forces and links between chains",
  ["Explains why thermosoftening polymers melt",
   "Explains why cross-linked polymers are rigid",
   "Links a polymer's structure to a use"],
  "If {{name}} compares a plastic bottle that softens in hot water with a saucepan handle that doesn't, can they explain the difference in structure?",
  ["HS-PS2-6"],
  [("og_addition_polymers", "h", "Requires the idea of long polymer chains"),
   ("mt_w83U-_noVR", "h", "Explains the KS3 qualitative polymer properties at molecular level"),
   ("bd_designed_materials", "s", "Applies structure-function reasoning to polymers")])

T("og_condensation_polymers", C, D, "Condensation polymerisation", "15-17",
  "Explain that condensation polymers form from monomers with two functional groups, losing a small molecule such as water at each link, and describe polyesters and polyamides",
  ["Identifies the small molecule lost",
   "Draws the repeating unit of a polyester from a diol and a dicarboxylic acid",
   "Compares addition and condensation polymerisation"],
  "If {{name}} is given a diol and a dicarboxylic acid, can they show how a polyester forms and what is given off?",
  [],
  [("og_addition_polymers", "h", "Contrasted with addition polymerisation"),
   ("og_esters", "h", "Polyesters are linked by ester bonds")])

T("og_natural_polymers", C, D, "Natural polymers: proteins, starch and DNA", "15-17",
  "Describe proteins, starch, cellulose and DNA as natural condensation polymers built from amino acids, sugars and nucleotides",
  ["Names the monomers of each natural polymer",
   "Explains that proteins form by condensation of amino acids",
   "Links digestion to breaking polymers into monomers"],
  "If {{name}} learns that digestion breaks starch into glucose, can they explain this in terms of polymers and monomers?",
  [],
  [("og_condensation_polymers", "h", "Natural polymers form by condensation"),
   ("mt_6aJUzBYGNs", "s", "Builds on DNA from biology")])

T("og_polymer_disposal", M, D, "Plastics: disposal, recycling and biodegradability", "15-17",
  "Evaluate ways of dealing with waste plastics (landfill, incineration, mechanical and chemical recycling, biodegradable polymers) using data on energy, emissions and persistence",
  ["Explains why most addition polymers are not biodegradable",
   "Compares two disposal methods using data",
   "Evaluates a claim that a plastic is 'eco-friendly'"],
  "If {{name}} reads that a shopping bag is 'biodegradable', can they evaluate the claim and compare it with recycling a normal bag?",
  ["KS3.Sci.Chem.EA.5"],
  [("og_polymer_properties", "h", "Disposal options depend on polymer structure"),
   ("mt_0e5rZxbAeR", "h", "Builds on recycling of finite resources")])

# ---------------------------------------------------------------- reactions and fuels
T("og_substitution", C, D, "Substitution reactions of alkanes", "16-18",
  "Describe how alkanes react with halogens in UV light by substitution, replacing hydrogen atoms with halogen atoms, and explain why mixtures of products form",
  ["Writes an equation for methane with chlorine",
   "Explains why UV light is needed",
   "Explains why several products form"],
  "If {{name}} mixes methane and chlorine in sunlight, can they predict a product and explain why the reaction is called substitution?",
  [],
  [("og_alkanes", "h", "Alkanes are the reactants"),
   ("pt_group7", "h", "Uses the reactivity of halogens")])

T("og_haloalkanes", C, D, "Haloalkanes", "16-18",
  "Name and draw haloalkanes, describe their uses and reactions in which the halogen is replaced, and explain why CFCs damage the ozone layer",
  ["Names a haloalkane from its structure",
   "Describes one substitution reaction of a haloalkane",
   "Explains why CFCs were banned"],
  "If {{name}} is told CFCs were once used in fridges, can they draw one and explain why they were phased out?",
  [],
  [("og_substitution", "h", "Haloalkanes are made by substitution"),
   ("og_naming", "h", "Uses naming conventions with halogen prefixes")])

T("og_mechanisms", R, D, "Curly arrows and reaction mechanisms", "16-18",
  "Use curly arrows to show the movement of electron pairs in reaction mechanisms, such as electrophilic addition of HBr to ethene through a carbocation",
  ["Explains what a curly arrow represents",
   "Draws the mechanism for ethene with HBr",
   "Identifies the electrophile in a reaction"],
  "If {{name}} is asked to show how HBr adds to ethene, can they draw a mechanism with correctly placed curly arrows?",
  [],
  [("og_addition_reactions", "h", "Explains addition reactions step by step"),
   ("bd_covalent", "h", "Curly arrows move shared electron pairs"),
   ("og_skeletal", "s", "Mechanisms are often drawn with skeletal formulae")])

T("og_reaction_types", M, D, "Classifying organic reactions", "16-18",
  "Classify organic reactions as combustion, addition, substitution, oxidation, condensation or cracking from equations, and choose a reaction to convert one compound into another",
  ["Classifies five given reactions",
   "Suggests a two-step route from ethene to ethanoic acid",
   "Explains the difference between addition and substitution"],
  "If {{name}} needs to turn ethene into ethyl ethanoate, can they plan a route and name each reaction type?",
  [],
  [("og_addition_reactions", "h", "Includes addition reactions"),
   ("og_substitution", "h", "Includes substitution reactions"),
   ("og_alcohol_oxidation", "h", "Includes oxidation"),
   ("og_esters", "h", "Includes condensation to esters"),
   ("og_cracking", "s", "Includes cracking")])

T("og_fuel_energy", P, D, "Comparing fuels by energy released", "15-17",
  "Measure and compare the energy released by burning alcohol fuels using simple calorimetry, and explain the trend with chain length in terms of bonds broken and made",
  ["Calculates energy transferred using mass, specific heat capacity and temperature change",
   "Compares energy per gram of different alcohols",
   "Explains sources of error in a spirit-burner experiment"],
  "If {{name}} burns methanol and butanol to heat water, can they calculate which releases more energy per gram and explain why?",
  ["HS-PS1-4"],
  [("og_alcohols", "h", "The fuels compared are alcohols"),
   ("en_specific_heat", "h", "Uses specific heat capacity to calculate energy"),
   ("ch_bond_energy", "s", "The trend is explained by bond energies")])

T("og_making_ethanol", M, D, "Making ethanol: fermentation versus hydration", "15-17",
  "Compare making ethanol by fermenting sugars with yeast and by hydrating ethene with steam, weighing conditions, rate, purity, atom economy and use of renewable raw materials",
  ["Describes the conditions for fermentation",
   "Describes the conditions for hydration of ethene",
   "Evaluates which method suits a given country's resources"],
  "If {{name}} is asked whether a country with lots of sugar cane but no oil should make ethanol by fermentation, can they justify their answer?",
  [],
  [("og_alcohols", "h", "The product is ethanol"),
   ("og_addition_reactions", "h", "Hydration of ethene is an addition reaction"),
   ("mt_TKZefYXaVS", "s", "Fermentation is anaerobic respiration in yeast"),
   ("ch_rate_factors", "s", "Compares rates and conditions")])

T("og_biofuels", M, D, "Biofuels and carbon neutrality", "15-17",
  "Evaluate claims that biofuels such as bioethanol are carbon-neutral, using the carbon cycle and accounting for energy used in farming, processing and transport",
  ["Explains why burning bioethanol is described as carbon-neutral",
   "Identifies hidden carbon dioxide emissions",
   "Weighs land use against benefits"],
  "If {{name}} reads that biofuels are 'carbon-neutral', can they explain the reasoning and why the claim is only partly true?",
  ["KS3.Sci.Chem.EA.3"],
  [("og_making_ethanol", "h", "Bioethanol is made by fermentation"),
   ("mt_Be1A88GUpu", "h", "Uses the carbon cycle"),
   ("en_compare_resources", "s", "Compares energy resources")])
