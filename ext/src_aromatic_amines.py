from dsl import T, C, P, R, L, M
D = "Matter & Materials"

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
