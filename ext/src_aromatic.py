from dsl import T, C, P, R, L, M
D = "Matter & Materials"

# ---------------------------------------------------------------- bonding prerequisites (wave 4)
T("ar_orbitals", C, D, "Electron sub-shells and orbitals", "16-18",
  "Describe electrons in s and p sub-shells and orbitals (an s orbital is spherical and a p orbital is dumbbell-shaped, each holding two electrons), and write electron configurations such as 1s²2s²2p² for carbon",
  ["Writes electron configurations for the first 20 elements using s and p notation",
   "Describes the shapes of s and p orbitals",
   "Explains how sub-shells refine the simple shell model"],
  "If {{name}} is asked for the electron configuration of carbon, can they write it using sub-shells and describe the orbitals involved?",
  [],
  [("at_shells", "h", "Shells are divided into s and p sub-shells, refining 2,8,8 configurations"),
   ("pt_periodic_trends", "s", "Sub-shells explain the s and p blocks and the patterns across a period")])

T("ar_sigma_pi", C, D, "Sigma and pi bonds", "16-18",
  "Explain that a σ bond forms by end-on overlap of orbitals and a π bond by sideways overlap of p orbitals above and below the bond axis, so a C=C double bond is one σ and one π bond and cannot rotate",
  ["Describes how σ and π bonds form",
   "Explains why a C=C bond is weaker than twice a C–C bond",
   "Explains why the π bond prevents rotation and allows E/Z isomers"],
  "If {{name}} is shown the double bond in ethene, can they describe it in terms of σ and π bonds and explain why it is a site of reactivity?",
  [],
  [("ar_orbitals", "h", "σ and π bonds form from end-on and sideways overlap of s and p orbitals"),
   ("bd_covalent", "h", "The shared pair of a covalent bond is described as overlapping orbitals"),
   ("og_stereoisomers", "s", "A π bond prevents rotation about C=C, which is why E/Z isomers exist")])

# ---------------------------------------------------------------- the structure of benzene
T("ar_benzene_formula", C, D, "The puzzle of benzene's structure", "16-18",
  "Explain that benzene, C₆H₆, appears highly unsaturated from its formula yet does not readily undergo addition reactions or decolourise bromine water, which a structure must explain",
  ["Calculates that C₆H₆ has far fewer hydrogens than hexane",
   "Describes benzene's reluctance to decolourise bromine water",
   "States what a successful structure for benzene must explain"],
  "If {{name}} compares benzene with cyclohexene, can they explain why benzene's formula and its reactions seem to contradict each other?",
  [],
  [("og_hydrocarbons", "h", "Benzene, C₆H₆, is a hydrocarbon with far fewer hydrogens than an alkane"),
   ("og_alkenes", "h", "Benzene is compared with alkenes, which readily undergo addition across C=C"),
   ("og_bromine_test", "s", "Benzene does not decolourise bromine water, unlike an alkene with a C=C bond")])

T("ar_kekule", R, D, "The Kekulé model of benzene", "16-18",
  "Draw and describe Kekulé's model of benzene as a six-membered carbon ring with alternating single and double bonds, and the delocalised ring symbol used today",
  ["Draws the Kekulé structure with displayed and skeletal formulae",
   "Draws the delocalised ring symbol",
   "Explains what the Kekulé model predicts about bond lengths and reactions"],
  "If {{name}} draws the Kekulé structure of benzene, can they say what it predicts about the carbon–carbon bond lengths?",
  [],
  [("ar_benzene_formula", "h", "Kekulé's ring of alternating double bonds was proposed to fit the formula C₆H₆"),
   ("og_skeletal", "s", "The benzene ring is usually drawn as a hexagon in skeletal form"),
   ("og_formulae_types", "s", "Kekulé's structure is drawn as a displayed formula showing every bond")])

T("ar_hydrogenation_enthalpy", P, D, "Enthalpy of hydrogenation and benzene's stability", "17-18",
  "Compare benzene's enthalpy of hydrogenation (about −208 kJ mol⁻¹) with the value predicted for the Kekulé structure (three times cyclohexene's −120 kJ mol⁻¹, about −360 kJ mol⁻¹), and show the extra stability on an energy diagram",
  ["Calculates the expected enthalpy of hydrogenation for the Kekulé structure",
   "Calculates the extra stability of about 150 kJ mol⁻¹",
   "Draws an energy level diagram comparing the structures"],
  "If {{name}} is given the enthalpies of hydrogenation of cyclohexene and benzene, can they use them to argue that benzene is more stable than the Kekulé model predicts?",
  ["HS-PS1-4"],
  [("ar_kekule", "h", "Three C=C bonds in the Kekulé model predict a hydrogenation enthalpy of about −360 kJ mol⁻¹"),
   ("ch_bond_energy", "h", "The enthalpy change is explained by the energy of bonds broken and bonds made"),
   ("ch_energy_profile", "h", "The predicted and actual values are compared as levels on an energy diagram"),
   ("og_addition_reactions", "s", "Hydrogenation adds hydrogen across C=C, the addition reaction met with alkenes")])

T("ar_kekule_evidence", C, D, "Evidence against the Kekulé model", "17-18",
  "Evaluate the evidence that led chemists to modify the Kekulé model: all six C–C bonds have the same length (0.139 nm, between C–C at 0.154 nm and C=C at 0.134 nm), the enthalpy of hydrogenation is less exothermic than predicted, and benzene resists addition",
  ["States the bond-length evidence from X-ray diffraction",
   "Uses the enthalpy of hydrogenation as evidence",
   "Explains how the evidence led to a modified model"],
  "If {{name}} is asked why chemists no longer accept the Kekulé structure, can they give three pieces of evidence?",
  [],
  [("ar_kekule", "h", "The evidence is judged against Kekulé's alternating single and double bonds"),
   ("ar_hydrogenation_enthalpy", "h", "Benzene releases about 150 kJ mol⁻¹ less on hydrogenation than the Kekulé model predicts"),
   ("at_model_history", "s", "Like the atomic model, the benzene model was revised when new evidence did not fit")])

T("ar_delocalisation", C, D, "The delocalised model of benzene", "17-18",
  "Describe benzene as a planar ring of six carbon atoms with 120° bond angles in which one p orbital from each carbon overlaps sideways to form a ring of six delocalised π electrons above and below the plane",
  ["Describes the overlap of p orbitals in benzene",
   "Explains how delocalisation accounts for equal bond lengths",
   "Explains the 120° bond angles and planar shape"],
  "If {{name}} is asked to explain why all the carbon–carbon bonds in benzene are the same length, can they use the delocalised model?",
  [],
  [("ar_kekule_evidence", "h", "Equal bond lengths and extra stability are explained by a delocalised ring"),
   ("ar_sigma_pi", "h", "Sideways overlap of p orbitals, as in a π bond, spreads around the whole ring"),
   ("bd_metallic", "s", "Electrons free to move over many atoms were first met in metallic bonding")])

T("ar_aromatic_stability", C, D, "Why benzene prefers substitution to addition", "17-18",
  "Explain that addition to benzene would disrupt the delocalised ring and lose its extra stability, whereas substitution replaces a hydrogen and keeps the ring intact",
  ["Explains why addition is energetically unfavourable for benzene",
   "Contrasts benzene's reactions with those of alkenes",
   "Predicts that benzene will undergo substitution"],
  "If {{name}} sees that bromine adds to cyclohexene but substitutes into benzene, can they explain the difference?",
  [],
  [("ar_delocalisation", "h", "Addition would break up the ring of six delocalised π electrons that stabilises benzene"),
   ("ar_hydrogenation_enthalpy", "h", "The extra stability shown by hydrogenation data would be lost on addition"),
   ("og_reaction_types", "s", "Substitution replaces a hydrogen, whereas addition joins atoms across a double bond")])

T("ar_naming", L, D, "Naming aromatic compounds", "17-18",
  "Name simple aromatic compounds (methylbenzene, chlorobenzene, nitrobenzene, phenol, benzoic acid, phenylamine) and number the ring for disubstituted compounds",
  ["Names monosubstituted benzene compounds",
   "Numbers substituents on a disubstituted ring",
   "Uses 'phenyl' for C₆H₅– in names"],
  "If {{name}} is shown benzene rings with –NO₂, –OH and –CH₃ groups, can they name each compound?",
  [],
  [("og_naming", "h", "Prefixes and suffixes such as chloro- and -ol are applied with benzene as the parent"),
   ("ar_kekule", "h", "The benzene ring must be recognised in a structure before it can be named")])

# ---------------------------------------------------------------- electrophilic substitution
T("ar_electrophiles", C, D, "Electrophiles", "17-18",
  "Explain that an electrophile is an electron-pair acceptor attracted to regions of high electron density, such as the delocalised ring of benzene, and identify electrophiles such as NO₂⁺ and polarised halogens",
  ["Defines an electrophile",
   "Identifies the electrophile in a reaction",
   "Explains why benzene attracts electrophiles"],
  "If {{name}} is given a list of species, can they pick out the electrophiles and explain why benzene reacts with them?",
  [],
  [("og_mechanisms", "h", "Electrophiles were met accepting electron pairs shown by curly arrows in mechanisms"),
   ("ar_delocalisation", "h", "The delocalised π electrons make the ring an electron-rich target for electrophiles")])

T("ar_electrophilic_substitution", C, D, "Electrophilic substitution mechanism", "17-18",
  "Draw the general mechanism of electrophilic substitution: the electrophile accepts a pair of electrons from the ring to form a positively charged intermediate that has lost its delocalisation, and loss of H⁺ restores the ring",
  ["Draws the curly arrows for each step",
   "Draws the intermediate with a partial delocalised ring",
   "Explains why the H⁺ is lost rather than a nucleophile added"],
  "If {{name}} is given a benzene ring and an electrophile E⁺, can they draw the mechanism of substitution?",
  [],
  [("ar_electrophiles", "h", "Each mechanism starts with an electrophile, such as NO₂⁺, accepting electrons from the ring"),
   ("ar_aromatic_stability", "h", "The intermediate loses H⁺ because this restores the stable delocalised ring"),
   ("og_mechanisms", "h", "The mechanism is drawn with curly arrows showing movements of electron pairs")])

T("ar_nitration", P, D, "Nitration of benzene", "17-18",
  "Describe the nitration of benzene with concentrated nitric and sulfuric acids at no more than about 50 °C, including the formation of the NO₂⁺ electrophile (HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻)",
  ["States the reagents and conditions",
   "Writes the equation for forming NO₂⁺",
   "Explains why the temperature is kept low"],
  "If {{name}} is asked how nitrobenzene is made, can they give the reagents, conditions and the electrophile?",
  [],
  [("ar_electrophilic_substitution", "h", "NO₂⁺ attacks the ring by the general electrophilic substitution mechanism"),
   ("ch_acid_ions", "s", "Sulfuric acid, the stronger acid, donates H⁺ to nitric acid to generate NO₂⁺")])

T("ar_halogenation", P, D, "Halogenation of benzene", "17-18",
  "Describe the bromination or chlorination of benzene using a halogen carrier (such as FeBr₃ for bromine or AlCl₃ for chlorine), which polarises the halogen to generate the electrophile, and contrast it with addition to alkenes",
  ["States the reagents and catalyst",
   "Shows how the halogen carrier forms the electrophile",
   "Contrasts the conditions with bromine and alkenes"],
  "If {{name}} is asked why benzene needs a catalyst to react with bromine when cyclohexene does not, can they explain?",
  [],
  [("ar_electrophilic_substitution", "h", "The polarised halogen attacks the ring by the electrophilic substitution mechanism"),
   ("pt_group7", "s", "Bromine and chlorine are halogens, whose reactivity was met in Group 7"),
   ("og_addition_reactions", "s", "Benzene substitutes with bromine, whereas alkenes add bromine across C=C")])

T("ar_friedel_crafts", P, D, "Friedel–Crafts alkylation and acylation", "17-18",
  "Describe Friedel–Crafts acylation (an acyl chloride with an AlCl₃ catalyst forming an aromatic ketone) and alkylation as ways to form new C–C bonds to a benzene ring",
  ["Writes the equation for acylation of benzene",
   "Shows how AlCl₃ forms the electrophile",
   "Explains why these reactions are useful in synthesis"],
  "If {{name}} needs to make phenylethanone from benzene, can they give the reagents and catalyst?",
  [],
  [("ar_halogenation", "h", "AlCl₃ acts as a halogen carrier, as in chlorination, to generate the electrophile"),
   ("og_haloalkanes", "s", "Alkylation uses a haloalkane such as chloromethane as the source of the alkyl group")])

# ---------------------------------------------------------------- phenols
T("ar_phenols", C, D, "Phenols", "17-18",
  "Describe phenols as compounds with –OH bonded directly to a benzene ring, explain that phenol is a weak acid that reacts with sodium hydroxide but not sodium carbonate, and distinguish it from alcohols and carboxylic acids",
  ["Identifies phenols and distinguishes them from alcohols",
   "Writes the equation for phenol and sodium hydroxide",
   "Uses sodium carbonate to tell a phenol from a carboxylic acid"],
  "If {{name}} has unlabelled samples of ethanol, phenol and ethanoic acid, can they plan tests to identify each?",
  [],
  [("ar_naming", "h", "Phenol is named and drawn as a benzene ring carrying an –OH group"),
   ("og_alcohols", "h", "The –OH on a ring behaves differently from the –OH of an alcohol, which is not acidic"),
   ("ch_acid_ions", "h", "Phenol partly releases H⁺, so it is a weak acid that reacts with sodium hydroxide"),
   ("og_carboxylic_acids", "s", "Phenol is weaker than carboxylic acids, so it does not react with sodium carbonate")])

T("ar_phenol_reactivity", P, D, "Why phenol reacts more readily than benzene", "17-18",
  "Explain that a lone pair on the oxygen of phenol is partly delocalised into the ring, increasing its electron density, so phenol decolourises bromine water at room temperature without a catalyst to form a white precipitate of 2,4,6-tribromophenol",
  ["Describes the reaction of phenol with bromine water",
   "Explains the greater reactivity in terms of electron density",
   "Compares the conditions for benzene and phenol"],
  "If {{name}} sees phenol instantly decolourise bromine water, can they explain why benzene does not?",
  [],
  [("ar_phenols", "h", "The –OH group of phenol is the cause of its greater reactivity"),
   ("ar_halogenation", "h", "Phenol reacts with bromine water at room temperature, unlike benzene needing a halogen carrier"),
   ("ar_delocalisation", "h", "An oxygen lone pair joins the delocalised system and raises the ring's electron density")])

T("ar_directing", C, D, "Directing effects of substituents", "17-18",
  "Use the directing effects of substituents to predict products: –OH, –NH₂ and –CH₃ activate the ring and direct to the 2- and 4-positions, while –NO₂ deactivates the ring and directs to the 3-position",
  ["Predicts the product of nitrating methylbenzene",
   "Predicts the product of brominating nitrobenzene",
   "Explains activation in terms of electron density"],
  "If {{name}} needs to make 3-bromonitrobenzene from benzene, can they decide which substituent to add first?",
  [],
  [("ar_phenol_reactivity", "h", "The activating effect of –OH is generalised to other electron-donating groups"),
   ("ar_nitration", "h", "Nitrating methylbenzene or nitrobenzene shows where a second group goes"),
   ("ar_naming", "h", "Products are described by numbering the 2-, 3- and 4-positions on the ring")])

# ---------------------------------------------------------------- aromatic amines and azo dyes
T("ar_reduce_nitro", P, D, "Making phenylamine from nitrobenzene", "17-18",
  "Describe the reduction of nitrobenzene to phenylamine using tin and concentrated hydrochloric acid followed by sodium hydroxide",
  ["States the reagents for the reduction",
   "Writes a simplified equation using [H]",
   "Explains why sodium hydroxide is added afterwards"],
  "If {{name}} has made nitrobenzene, can they explain how to turn it into phenylamine?",
  [],
  [("ar_nitration", "h", "Nitrobenzene, the product of nitration, is the starting material"),
   ("ch_redox", "s", "Converting –NO₂ to –NH₂ removes oxygen and adds hydrogen, so it is a reduction")])

T("ar_amines", C, D, "Aromatic amines", "17-18",
  "Describe phenylamine as a base that accepts H⁺ using the nitrogen lone pair, and explain why it is a weaker base than ammonia because the lone pair is partly delocalised into the ring",
  ["Writes the equation for phenylamine and hydrochloric acid",
   "Orders phenylamine, ammonia and ethylamine by base strength",
   "Explains the order using lone-pair availability"],
  "If {{name}} is asked whether phenylamine or ammonia is the stronger base, can they explain their answer?",
  [],
  [("ar_reduce_nitro", "h", "Phenylamine is made by reducing nitrobenzene with tin and hydrochloric acid"),
   ("ch_acid_ions", "h", "A base accepts H⁺, and phenylamine does this with its nitrogen lone pair"),
   ("ar_delocalisation", "h", "Partial delocalisation of the lone pair into the ring makes phenylamine a weaker base"),
   ("og_functional_groups", "s", "The –NH₂ group attached to the ring is recognised as the amine functional group")])

T("ar_diazonium", P, D, "Diazonium salts", "17-18",
  "Describe making benzenediazonium chloride from phenylamine with nitrous acid (sodium nitrite and hydrochloric acid) below 10 °C, and explain why the salt must be kept cold",
  ["States the reagents and temperature",
   "Writes the structure of the diazonium ion",
   "Explains what happens if the solution warms up"],
  "If {{name}} is preparing a diazonium salt, can they explain why the mixture is kept in an ice bath?",
  [],
  [("ar_amines", "h", "Benzenediazonium chloride is made from phenylamine and nitrous acid"),
   ("ch_rate_factors", "s", "Keeping the salt below 10 °C slows its decomposition, as lower temperature lowers rate")])

T("ar_azo_dyes", P, D, "Coupling reactions and azo dyes", "17-18",
  "Describe coupling a diazonium salt with a phenol in alkaline solution to form an azo compound containing –N=N– linking two rings, and explain the use of azo compounds as dyes",
  ["Writes the coupling reaction with phenol",
   "Identifies the azo group in a dye structure",
   "Gives a use of azo dyes"],
  "If {{name}} mixes benzenediazonium chloride with alkaline phenol, can they draw the coloured product?",
  [],
  [("ar_diazonium", "h", "The diazonium ion acts as the electrophile in the coupling reaction"),
   ("ar_phenols", "h", "Phenol in alkaline solution is the electron-rich coupling partner"),
   ("ar_electrophilic_substitution", "s", "Coupling is an electrophilic substitution of the phenol ring by the diazonium ion")])

T("ar_dye_colour", C, D, "Why extended delocalisation gives colour", "17-18",
  "Explain that extended delocalised systems such as azo dyes absorb visible light because the energy gap for electron transitions is smaller, so the compound appears the complementary colour",
  ["Links absorbed wavelengths to the colour seen",
   "Explains why benzene is colourless but azo dyes are coloured",
   "Relates the energy gap to the frequency absorbed with E = hf"],
  "If {{name}} is shown a yellow azo dye, can they explain which light it absorbs and why?",
  [],
  [("ar_azo_dyes", "h", "Azo dyes have delocalisation extending over both rings and the –N=N– link"),
   ("wv_photon_energy", "h", "A smaller energy gap matches photons of lower frequency, in the visible range"),
   ("mt_qzGADV-NGe", "s", "Objects look coloured from the wavelengths they absorb and reflect")])

T("ar_aromatic_synthesis", M, D, "Planning routes to aromatic compounds", "17-18",
  "Plan two- or three-step syntheses of aromatic compounds, such as benzene to nitrobenzene to phenylamine to an azo dye, giving reagents and conditions and considering directing effects",
  ["Plans a route from benzene to an azo dye",
   "Gives the reagents and conditions for each step",
   "Uses directing effects to choose the order of steps"],
  "If {{name}} needs to make a dye from benzene, can they plan the route with reagents and conditions?",
  [],
  [("ar_azo_dyes", "h", "Azo dyes are typical targets, reached from benzene in several steps"),
   ("ar_directing", "h", "Directing effects decide the order in which groups are added to the ring"),
   ("og_reaction_types", "h", "Each step in a route is chosen as a known reaction type with its conditions"),
   ("ar_friedel_crafts", "s", "Friedel–Crafts reactions are the step that adds a carbon chain to the ring")])
