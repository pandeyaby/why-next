from dsl import T, C, P, R, L, M
D = "Matter & Materials"

# ---------------------------------------------------------------- particle model, states, phase change
T("pm_kinetic", C, D, "Temperature and particle motion", "12-13",
  "Explain that particles in every substance are constantly moving, and that the temperature of a substance is a measure of the average kinetic energy of its particles — hotter means faster-moving (or more strongly vibrating) particles",
  ["States that particles move faster on average when a substance is heated",
   "Describes particle motion in a solid (vibrating in place), liquid (sliding past) and gas (fast, random, far apart)",
   "Explains why a drop of food colouring spreads faster in hot water than in cold water"],
  "If {{name}} drops food colouring into a glass of hot water and a glass of cold water, can they explain — using moving particles — why it spreads faster in the hot one?",
  ["MS-PS1-4", "KS3.Sci.Chem.PNM.4"],
  [("mt_b6kZgqolEd", "h", "Linking temperature to particle speed builds directly on the KS3 particle model of arrangement and movement"),
   ("mt_Pl-nsjYGZ3", "s", "Primary heating-and-cooling observations give the measured temperatures this idea now explains"),
   ("mt_RVK655t391", "s", "Reading temperatures, including below zero, is needed to compare hot and cold samples")])

T("pm_diffusion", C, D, "Diffusion and particle movement", "11-13",
  "Explain diffusion — the spreading of particles from a region of higher concentration to lower concentration — as a result of random particle motion, and explain why it is fastest in gases and in warmer conditions",
  ["Defines diffusion as net movement from high to low concentration",
   "Explains why a smell spreads across a room without anyone fanning it",
   "Predicts that diffusion is faster in gases than liquids, and faster when warmer"],
  "If someone opens a bottle of perfume at one end of a room, can {{name}} explain why people at the other end smell it a little later, using the idea of moving particles?",
  [],
  [("mt_b6kZgqolEd", "h", "Diffusion is explained by the random motion and spacing of particles described in the particle model"),
   ("mt_Mf-T-fYRLX", "s", "Watching a solute spread through a solvent during dissolving is a familiar example of diffusion")])

T("pm_gas_pressure", C, D, "Gas pressure from particle collisions", "12-14",
  "Explain gas pressure as the result of gas particles colliding with the walls of their container, and predict how pressure changes when the gas is heated, compressed or more gas is added",
  ["Explains that pressure comes from many particle collisions with the container walls",
   "Predicts that heating a sealed container raises the pressure because particles hit the walls harder and more often",
   "Explains why pumping more air into a tyre makes it firmer"],
  "If {{name}} pumps up a bike tyre, can they explain what the air particles inside are doing to make the tyre feel harder?",
  ["KS3.Sci.Phys.MotionAndForces.5"],
  [("mt_b6kZgqolEd", "h", "Pressure is explained by the motion and spacing of gas particles in the particle model"),
   ("pm_kinetic", "h", "Predicting the effect of heating on pressure requires linking temperature to particle speed")])

T("pm_heating_curve", R, D, "Why heating curves have flat sections", "12-14",
  "Explain the shape of temperature–time graphs for a substance being heated or cooled: on the sloping sections energy speeds up particles (temperature rises), while on the flat sections energy is used to overcome the attractions between particles and change their arrangement, so temperature stays constant until the change of state is complete",
  ["Identifies melting and boiling points from the flat sections of a heating curve",
   "Labels which state(s) are present on each section of the curve",
   "Explains why the temperature does not rise while ice is melting even though it is still being heated"],
  "If {{name}} is shown a graph of ice being heated until it boils, can they point to where it is melting and explain why the line goes flat there?",
  ["MS-PS1-4", "KS3.Sci.Chem.ENG.1"],
  [("mt_CyV7crZ8hl", "h", "Interpreting the curve requires knowing the named changes of state and what happens to particles in each"),
   ("pm_kinetic", "h", "Explaining the flat sections depends on linking temperature to particle kinetic energy"),
   ("mt_bESTSBB0wK", "s", "Reading values off a line graph over time is the underlying graph skill"),
   ("mt_Pl-nsjYGZ3", "s", "Primary measurements of the temperatures at which materials melt give real data points for the curve")])

T("pm_evap_cooling", C, D, "Evaporation causes cooling", "12-14",
  "Explain that during evaporation the fastest-moving particles escape from the surface of a liquid, lowering the average kinetic energy of the particles left behind — which is why sweating and wet skin cool us down",
  ["Distinguishes evaporation (at the surface, any temperature) from boiling (throughout, at the boiling point)",
   "Explains cooling by evaporation in terms of the most energetic particles leaving",
   "Lists factors that speed up evaporation (temperature, surface area, airflow)"],
  "If {{name}} gets out of a swimming pool on a windy day and feels cold, can they explain why the evaporating water makes their skin cooler?",
  ["MS-PS1-4"],
  [("mt_Qkewo5M3_c", "h", "Builds on the primary idea that evaporation rate depends on temperature, now explained at particle level"),
   ("pm_kinetic", "h", "Explaining cooling needs the idea that temperature reflects average particle kinetic energy")])

T("pm_density", P, D, "Calculating density", "12-14",
  "Calculate density using density = mass ÷ volume, measure the density of regular and irregular objects (by displacement), and use particle spacing to explain why gases are far less dense than solids and liquids",
  ["Calculates density from mass and volume with correct units (g/cm³ or kg/m³)",
   "Finds the volume of an irregular object by water displacement",
   "Predicts whether an object will float in water by comparing densities"],
  "If {{name}} has a 50 g pebble that pushes the water level in a measuring cylinder up by 20 cm³, can they work out the pebble's density and say whether it will float?",
  ["KS3.Sci.Chem.PNM.3", "KS3.Maths.Ratio.10"],
  [("mt_kLQOzZYrd5", "h", "Density is a compound unit — mass per unit volume — so compound-unit reasoning is required"),
   ("mt_b6kZgqolEd", "s", "The particle model explains why density differs between solids, liquids and gases"),
   ("mt_tpT9brpI6D", "s", "Converting between cm³, ml and m³ is often needed in density problems")])

T("pm_model_limits", M, D, "Strengths and limits of the particle model", "13-15",
  "Evaluate the simple particle model: recognise what it explains well (states, diffusion, pressure) and what it leaves out — particles are not hard coloured spheres, there are forces between them, and real particles are atoms, ions or molecules of different sizes",
  ["Names two things the particle model explains well",
   "Names at least two simplifications in particle diagrams (e.g. no forces shown, particles drawn as identical spheres)",
   "Explains why scientists still use a model they know is simplified"],
  "If {{name}} is shown a textbook particle diagram of a gas, can they say one thing it gets right and one way real gas particles are different from the picture?",
  ["KS3.Sci.WS.ESI.1"],
  [("mt_b6kZgqolEd", "h", "Evaluating a model requires first knowing the model and what it is used to explain"),
   ("mt_1GVAmcwAiO", "s", "The primary idea that science can be revised underpins treating models as improvable"),
   ("pm_gas_pressure", "s", "Pressure is one of the successes of the model worth weighing against its limits")])

T("pm_absolute_zero", C, D, "The Kelvin scale and absolute zero", "14-16",
  "Explain absolute zero (0 K, about −273 °C) as the temperature at which particles have the least possible kinetic energy, and convert between degrees Celsius and kelvin",
  ["Converts temperatures between °C and K by adding or subtracting 273",
   "Explains why there is no temperature below absolute zero using particle motion",
   "Explains why the Kelvin scale has no negative values"],
  "If {{name}} is told that liquid nitrogen boils at about 77 K, can they convert that to degrees Celsius and explain what 0 K would mean for the particles?",
  [],
  [("pm_kinetic", "h", "Absolute zero is defined by the minimum of particle kinetic energy, so the temperature–motion link is needed"),
   ("mt_9QzSnn8m80", "s", "Converting to and from −273 °C requires confident work with negative numbers")])

T("pm_latent_heat", P, D, "Specific latent heat", "15-17",
  "Use the idea that changing state needs energy without a temperature change, and calculate the energy for a change of state using E = mL, distinguishing specific latent heat of fusion from vaporisation",
  ["Explains that energy during a change of state breaks or weakens forces between particles rather than raising temperature",
   "Calculates energy needed to melt or boil a given mass using E = mL",
   "Explains why a scald from steam is worse than from boiling water at the same temperature"],
  "If {{name}} knows it takes 334 000 J to melt 1 kg of ice, can they work out the energy to melt a 0.2 kg ice cube and explain why the thermometer doesn't rise while it melts?",
  ["HS-PS3-2"],
  [("pm_heating_curve", "h", "The flat sections of heating curves are what latent heat quantifies"),
   ("en_specific_heat", "s", "Comparing E = mL with energy for temperature rise helps separate the two ideas"),
   ("mt_vHzVa3SURC", "h", "Using E = mL requires substituting values into a formula")])

T("pm_gas_laws", C, D, "Gas laws: pressure, volume and temperature", "15-17",
  "Describe and use the relationships between pressure, volume and temperature for a fixed mass of gas — pressure × volume is constant at constant temperature (Boyle's law), and volume or pressure is proportional to kelvin temperature — explaining each with particle collisions",
  ["Uses p₁V₁ = p₂V₂ to find a new pressure or volume",
   "Explains why the temperature must be in kelvin for proportional relationships",
   "Explains each law using the frequency and force of particle collisions"],
  "If {{name}} squeezes a sealed syringe of air to half its volume, can they predict what happens to the pressure and explain it in terms of the particles?",
  [],
  [("pm_gas_pressure", "h", "The gas laws quantify the particle-collision explanation of pressure"),
   ("pm_absolute_zero", "h", "Temperature relationships only become proportional on the Kelvin scale"),
   ("fm_inverse_variation", "h", "Boyle's law is an inverse-proportion relationship")])

# ---------------------------------------------------------------- atoms
T("at_subatomic", C, D, "Charges and masses of subatomic particles", "12-14",
  "Describe the atom as a tiny positively charged nucleus containing protons and neutrons, surrounded by electrons, and give the relative charge and relative mass of each particle",
  ["Gives relative charges: proton +1, neutron 0, electron −1",
   "Gives relative masses: proton 1, neutron 1, electron about 1/2000",
   "Explains why an atom has no overall charge"],
  "If {{name}} is asked why an atom with 6 protons isn't positively charged overall, can they explain the role of the electrons?",
  ["KS3.Sci.Chem.AEC.1"],
  [("mt_Z_Wu_77ybI", "h", "Detail on subatomic particles extends the KS3 Bohr picture of nucleus and shells"),
   ("mt_2_YoprauaJ", "s", "Static electricity introduces positive and negative charge, which the atom's structure explains")])

T("at_numbers", P, D, "Atomic number and mass number", "13-15",
  "Use atomic number (number of protons) and mass number (protons + neutrons) to work out the numbers of protons, neutrons and electrons in an atom from its nuclear symbol",
  ["Reads atomic and mass numbers from a nuclear symbol or periodic table",
   "Calculates neutrons as mass number − atomic number",
   "Explains that the atomic number identifies the element"],
  "If {{name}} sees sodium written as ²³₁₁Na, can they work out how many protons, neutrons and electrons a sodium atom has?",
  ["HS-PS1-1"],
  [("at_subatomic", "h", "Counting particles requires knowing what protons, neutrons and electrons are and where they sit"),
   ("mt_wfEfQuHOG-", "s", "Atomic numbers are read from the periodic table")])

T("at_isotopes", C, D, "Isotopes", "14-16",
  "Explain that isotopes are atoms of the same element with the same number of protons but different numbers of neutrons, so they have different mass numbers but almost identical chemical properties",
  ["Defines isotope correctly",
   "Works out neutron numbers for isotopes such as carbon-12 and carbon-14",
   "Explains why isotopes react (almost) the same way chemically, using electron arrangement"],
  "If {{name}} is told about carbon-12 and carbon-14, can they explain what is the same and what is different about these two kinds of carbon atom?",
  [],
  [("at_numbers", "h", "Comparing isotopes depends on reading proton and neutron numbers from mass and atomic number")])

T("at_relative_mass", P, D, "Relative atomic mass", "15-17",
  "Calculate relative atomic mass as the weighted mean mass of an element's isotopes using their percentage abundances, and explain why values like chlorine's 35.5 are not whole numbers",
  ["Calculates a weighted mean from isotope masses and abundances",
   "Explains why chlorine's relative atomic mass is 35.5",
   "Locates relative atomic masses on a periodic table"],
  "If {{name}} learns that chlorine is 75% chlorine-35 and 25% chlorine-37, can they show why its relative atomic mass is 35.5?",
  [],
  [("at_isotopes", "h", "Relative atomic mass is a weighted average over isotopes"),
   ("mt_Cg8VPguS_V", "s", "Weighted means extend the primary idea of calculating a mean"),
   ("mt_iEXqN48w3x", "s", "Isotope abundances are given as percentages")])

T("at_model_history", M, D, "How the model of the atom developed", "13-15",
  "Trace how evidence changed the model of the atom — Dalton's solid spheres, Thomson's plum pudding, Rutherford's gold-foil experiment revealing the nucleus, Bohr's electron shells and Chadwick's discovery of the neutron",
  ["Puts the main atomic models in historical order",
   "Explains what the gold-foil results showed and why the plum pudding model had to change",
   "Uses the story as an example of models being revised by new evidence"],
  "If {{name}} hears that most alpha particles went straight through gold foil but a few bounced back, can they explain what this told Rutherford about the atom?",
  ["KS3.Sci.WS.ESI.1"],
  [("at_subatomic", "h", "Following the history requires knowing the current model it led to"),
   ("mt_1GVAmcwAiO", "s", "The atom's history is a case study of the primary idea that science can be revised")])

T("at_shells", R, D, "Electron shells and configurations", "14-15",
  "Write electron configurations for the first 20 elements using the 2, 8, 8 filling pattern and draw shell diagrams, linking the number of outer-shell electrons to the element's position",
  ["Writes configurations such as 2,8,1 for sodium",
   "Draws a shell diagram for an atom given its atomic number",
   "Identifies the number of outer-shell electrons"],
  "If {{name}} is told magnesium has 12 electrons, can they draw how those electrons are arranged in shells?",
  ["HS-PS1-1", "KS3.Sci.Chem.AEC.1"],
  [("at_numbers", "h", "Electron number comes from the atomic number"),
   ("mt_Z_Wu_77ybI", "s", "Builds on the KS3 Bohr model of electrons in shells")])

T("at_scale", C, D, "The size of atoms and nuclei", "13-15",
  "Appreciate the scale of atoms (about 10⁻¹⁰ m across) and nuclei (about 10⁻¹⁴ to 10⁻¹⁵ m), using scientific notation and analogies to show that an atom is mostly empty space",
  ["Writes the size of an atom in scientific notation",
   "Compares atomic and nuclear radii as a ratio (about 10 000 to 100 000 times)",
   "Uses an analogy (e.g. a pea in a stadium) for the nucleus inside an atom"],
  "If {{name}} is told an atom is about 0.0000000001 m across, can they write that in scientific notation and describe how small the nucleus is by comparison?",
  [],
  [("at_subatomic", "h", "Comparing atom and nucleus size requires knowing the structure being sized"),
   ("mt_bO-njVOige", "h", "Atomic sizes are only manageable in standard form (scientific notation)")])

# ---------------------------------------------------------------- periodic table
T("pt_electron_pattern", C, D, "Periodic table patterns from electrons", "14-16",
  "Explain the structure of the periodic table in terms of electrons — group number matches the number of outer-shell electrons (for main groups) and period number matches the number of occupied shells — and use this to predict similar properties within a group",
  ["Links group number to outer-shell electrons for main-group elements",
   "Links period number to number of shells",
   "Predicts that elements in the same group react similarly because they have the same number of outer electrons"],
  "If {{name}} is told an unfamiliar element is in Group 2, Period 4, can they say how many outer electrons and shells it has, and which element it will behave like?",
  ["HS-PS1-1", "KS3.Sci.Chem.AEC.8"],
  [("at_shells", "h", "Group and period patterns are explained by electron configuration"),
   ("mt_wfEfQuHOG-", "h", "Extends the KS3 periodic table organisation into periods and groups")])

T("pt_group1", C, D, "Alkali metals (Group 1)", "14-16",
  "Describe the properties and reactions of the alkali metals with water and oxygen, and explain why reactivity increases down the group using distance of the outer electron from the nucleus",
  ["Describes lithium, sodium and potassium reacting with water and names the products",
   "States that reactivity increases down Group 1",
   "Explains the trend in terms of the outer electron being lost more easily"],
  "If {{name}} has seen lithium fizz gently in water and potassium burst into flame, can they predict what rubidium would do and explain why?",
  ["HS-PS1-1", "HS-PS1-2"],
  [("pt_electron_pattern", "h", "Group trends are explained using outer-electron arrangements"),
   ("mt_zsYW61cn_q", "s", "The reactivity series gives prior experience of ranking metal reactivity")])

T("pt_group7", C, D, "Halogens (Group 7)", "14-16",
  "Describe the halogens' physical trends and displacement reactions, and explain why reactivity decreases down the group because it becomes harder to gain an electron",
  ["Describes colour and state trend from fluorine to iodine",
   "Predicts whether a halogen will displace another from a salt solution",
   "Explains decreasing reactivity in terms of attracting an extra electron"],
  "If {{name}} adds chlorine water to potassium bromide solution, can they predict what happens and explain why chlorine wins?",
  ["HS-PS1-1", "HS-PS1-2"],
  [("pt_electron_pattern", "h", "Halogen trends are explained by outer-electron arrangement"),
   ("mt_v0K6GRi4ZL", "s", "Displacement reactions were introduced among the KS3 reaction types")])

T("pt_group0", C, D, "Noble gases and stable outer shells", "14-16",
  "Explain that the noble gases are unreactive because their outer shell is full, and use this to explain why other atoms tend to lose, gain or share electrons",
  ["Explains noble-gas unreactivity in terms of a full outer shell",
   "Gives uses that depend on unreactivity (e.g. argon in light bulbs, helium in balloons)",
   "Links full outer shells to how other atoms form bonds"],
  "If {{name}} is asked why balloons are filled with helium rather than hydrogen, can they connect helium's safety to its electron arrangement?",
  ["HS-PS1-1"],
  [("pt_electron_pattern", "h", "Unreactivity is explained by electron arrangement and group position")])

T("pt_periodic_trends", C, D, "Trends across a period", "16-18",
  "Describe and explain trends in atomic radius and in how easily atoms lose electrons across a period and down a group, using nuclear charge and shielding qualitatively",
  ["States that atomic radius decreases across a period and increases down a group",
   "Explains the trend using increasing nuclear charge with the same number of shells",
   "Uses the trends to compare the reactivity of two main-group elements"],
  "If {{name}} compares sodium and chlorine in the same row of the periodic table, can they explain why chlorine's atoms are smaller even though they have more electrons?",
  ["HS-PS1-1"],
  [("pt_group1", "h", "Down-group trends in metals are the first trend to generalise"),
   ("pt_group7", "s", "Down-group trends in a non-metal group are a useful contrast to trends across a period")])

# ---------------------------------------------------------------- bonding & structure
T("bd_ions", C, D, "Forming ions", "14-16",
  "Explain that atoms become ions by losing or gaining electrons to achieve a full outer shell, predict the charge on simple ions from group number, and draw ions with square brackets and charges",
  ["Predicts ion charges for groups 1, 2, 6 and 7",
   "Draws electron diagrams for ions such as Na⁺ and Cl⁻",
   "Explains that metals form positive ions and non-metals negative ions"],
  "If {{name}} is asked what happens to a magnesium atom when it forms an ion, can they say how many electrons it loses and what charge it ends up with?",
  ["HS-PS1-1"],
  [("at_shells", "h", "Predicting gain or loss of electrons requires knowing the outer-shell arrangement"),
   ("pt_group0", "s", "The full outer shell of noble gases is the target that explains ion formation")])

T("bd_ionic", C, D, "Ionic bonding and lattices", "14-16",
  "Explain ionic bonding as the electrostatic attraction between oppositely charged ions in a giant lattice, and use this to explain high melting points and conductivity when molten or dissolved",
  ["Draws a dot-and-cross diagram for sodium chloride",
   "Explains high melting point in terms of many strong attractions in the lattice",
   "Explains why ionic compounds conduct only when molten or in solution"],
  "If {{name}} is asked why salt has to be melted or dissolved before it conducts electricity, can they explain what the ions need to be able to do?",
  ["HS-PS1-1", "HS-PS1-3", "KS3.Sci.Chem.AEC.6"],
  [("bd_ions", "h", "Ionic bonding is the attraction between the ions formed by electron transfer"),
   ("mt_2_YoprauaJ", "s", "Attraction between opposite charges is first met in static electricity")])

T("bd_covalent", C, D, "Covalent bonding", "14-16",
  "Explain covalent bonding as a shared pair of electrons between non-metal atoms, and draw dot-and-cross and displayed diagrams for simple molecules such as H₂, H₂O, CH₄ and CO₂",
  ["Draws dot-and-cross diagrams for simple molecules",
   "Identifies single and double bonds",
   "Explains that covalent bonds form between non-metal atoms"],
  "If {{name}} draws a water molecule, can they show which electrons are shared between the oxygen and the two hydrogens?",
  ["HS-PS1-1", "KS3.Sci.Chem.AEC.6"],
  [("at_shells", "h", "Sharing electrons to fill outer shells requires knowing shell arrangements"),
   ("mt_Sc_SorJhXW", "s", "Recognising non-metals tells you when covalent bonding is expected")])

T("bd_simple_molecular", C, D, "Properties of simple molecular substances", "14-16",
  "Explain why simple molecular substances such as water, oxygen and methane have low melting and boiling points: the covalent bonds inside molecules are strong, but the forces between molecules are weak",
  ["Distinguishes bonds within molecules from forces between molecules",
   "Explains low boiling points using weak intermolecular forces",
   "Explains why simple molecular substances do not conduct electricity"],
  "If {{name}} is asked why water boils at only 100 °C when covalent bonds are strong, can they explain what actually gets overcome when water boils?",
  ["HS-PS1-3", "KS3.Sci.Chem.AEC.6"],
  [("bd_covalent", "h", "Explaining properties requires knowing the covalent bonds inside the molecules"),
   ("mt_CyV7crZ8hl", "s", "Boiling is the change of state being explained at a deeper level")])

T("bd_giant_covalent", C, D, "Giant covalent structures", "15-17",
  "Explain the properties of giant covalent structures — diamond, graphite and silicon dioxide — in terms of networks of strong covalent bonds, including why graphite conducts and is soft while diamond is hard",
  ["Explains the very high melting points of giant covalent structures",
   "Explains graphite's conductivity using delocalised electrons",
   "Contrasts the hardness of diamond with the slipperiness of graphite layers"],
  "If {{name}} is asked why pencil 'lead' (graphite) leaves marks on paper while diamond can cut glass — though both are pure carbon — can they explain using structure?",
  ["HS-PS1-3", "HS-PS2-6"],
  [("bd_covalent", "h", "Giant structures are networks of covalent bonds"),
   ("bd_simple_molecular", "s", "Contrast with simple molecules shows why network structure matters")])

T("bd_metallic", C, D, "Metallic bonding", "15-17",
  "Explain metallic bonding as positive metal ions in a sea of delocalised electrons, and use it to explain conductivity, malleability and why alloys are harder than pure metals",
  ["Draws and labels a model of metallic bonding",
   "Explains electrical conductivity of metals using delocalised electrons",
   "Explains why alloys are harder using disrupted layers of ions"],
  "If {{name}} is asked why copper wire can be bent without snapping and also carries electricity, can they explain both using the structure of the metal?",
  ["HS-PS2-6", "KS3.Sci.Chem.AEC.9"],
  [("mt_Sc_SorJhXW", "h", "Explains the KS3 observed properties of metals at the particle level"),
   ("bd_ions", "h", "Metal ions with delocalised electrons require the idea of positive ions")])

T("bd_compare_structures", P, D, "Inferring bonding from bulk properties", "15-17",
  "Use bulk properties — melting and boiling point, conductivity, solubility, hardness — to infer the type of structure and strength of forces between particles in an unknown substance",
  ["Classifies an unknown substance as ionic, simple molecular, giant covalent or metallic from data",
   "Ranks substances by strength of forces between particles using melting/boiling points",
   "Plans a simple test to distinguish two structures"],
  "If {{name}} is given a white solid that melts at 801 °C and conducts only when dissolved, can they decide what kind of structure it has and justify it?",
  ["HS-PS1-3"],
  [("bd_ionic", "h", "Ionic structures are one of the four categories to recognise"),
   ("bd_simple_molecular", "h", "Simple molecular structures are one of the four categories"),
   ("bd_giant_covalent", "h", "Giant covalent structures are one of the four categories"),
   ("bd_metallic", "h", "Metallic structures are one of the four categories"),
   ("mt_MBTVB-E-S7", "s", "Using melting points to identify substances begins with KS3 pure-substance identification")])

T("bd_designed_materials", C, D, "Molecular structure in designed materials", "15-18",
  "Explain how the molecular-level structure of designed materials — long-chain polymers, alloys, conducting metals, nanoparticles — determines how they function, and communicate this clearly",
  ["Explains why polymers made of long tangled chains are flexible but strong",
   "Explains why electrical wiring is metal using structure",
   "Writes a short technical explanation linking a material's structure to a use"],
  "If {{name}} is asked why plastic bags stretch rather than snap, can they explain it in terms of the long molecules the plastic is made from?",
  ["HS-PS2-6"],
  [("bd_metallic", "h", "Metal and alloy examples depend on metallic bonding"),
   ("bd_simple_molecular", "s", "Forces between molecules explain polymer flexibility"),
   ("mt_w83U-_noVR", "h", "Extends the KS3 qualitative properties of ceramics, polymers and composites")])

T("bd_ionic_formulae", P, D, "Writing formulae of ionic compounds", "14-16",
  "Work out the formula of an ionic compound by balancing the charges on its ions, including compound ions such as sulfate, nitrate and hydroxide",
  ["Writes formulae such as MgCl₂ and Al₂O₃ from ion charges",
   "Uses brackets correctly for compound ions, e.g. Ca(OH)₂",
   "Explains why the total charge in the formula must be zero"],
  "If {{name}} knows calcium forms Ca²⁺ and chloride is Cl⁻, can they work out the formula of calcium chloride and explain why?",
  ["KS3.Sci.Chem.AEC.3"],
  [("bd_ions", "h", "Balancing charges requires knowing the charges on ions"),
   ("ch_formulae", "h", "Writing formulae requires reading subscripts and brackets in formulae")])

# ---------------------------------------------------------------- chemical reactions & conservation of mass
T("ch_formulae", R, D, "Counting atoms in formulae and equations", "12-14",
  "Count the atoms of each element in chemical formulae and equations, correctly handling subscripts, brackets and the large numbers (coefficients) written in front of formulae",
  ["Counts atoms of each element in formulae such as H₂SO₄ and Ca(OH)₂",
   "Distinguishes 2H₂O (two molecules) from H₂O₂ (a different substance)",
   "Names simple compounds from their formulae"],
  "If {{name}} sees the formula H₂SO₄, can they say which elements are in it and how many atoms of each there are?",
  ["MS-PS1-1", "KS3.Sci.Chem.AEC.3"],
  [("mt_Z_Wu_77ybI", "h", "Formulae are introduced in KS3 atoms, elements and compounds"),
   ("mt_KwdjWEmMNo", "s", "Algebraic notation (coefficients and brackets) parallels the notation in chemical formulae")])

T("ch_word_equations", L, D, "Word equations", "12-13",
  "Write and interpret word equations for chemical reactions, identifying reactants and products and using the arrow to mean 'react to form'",
  ["Writes a word equation for a described reaction",
   "Identifies reactants and products in a given equation",
   "Explains that the arrow is not an equals sign"],
  "If {{name}} sees magnesium burning brightly to make a white powder, can they write a word equation for what happened?",
  ["KS3.Sci.Chem.CR.1"],
  [("mt_v0K6GRi4ZL", "h", "Word equations describe the reaction types introduced in KS3"),
   ("mt_1hgck6ucII", "s", "Recognising a chemical change tells you when a word equation is needed")])

T("ch_atoms_rearranged", C, D, "Reactions rearrange atoms", "12-14",
  "Explain that in a chemical reaction atoms are rearranged into new substances but none are created or destroyed, using particle diagrams of reactants and products to show why total mass is conserved",
  ["Draws before-and-after particle diagrams with the same atoms",
   "Explains conservation of mass in terms of atoms",
   "Distinguishes new substances formed from the same atoms"],
  "If {{name}} draws a particle picture of hydrogen and oxygen making water, can they show that every atom at the start is still there at the end?",
  ["MS-PS1-5", "KS3.Sci.Chem.AEC.4"],
  [("mt_ehC1wsdmUz", "h", "Explains the primary-school observation that mass is conserved in terms of atoms"),
   ("ch_formulae", "h", "Counting atoms in reactants and products requires reading formulae"),
   ("mt_htAYR-iCFF", "s", "Drawing particle diagrams is the representation used")])

T("ch_balancing", P, D, "Balancing chemical equations", "13-15",
  "Balance symbol equations by changing only the numbers in front of formulae so that the number of atoms of each element is the same on both sides",
  ["Balances equations such as Mg + O₂ → MgO and CH₄ + O₂ → CO₂ + H₂O",
   "Explains why subscripts must not be changed",
   "Checks a balanced equation by counting atoms of each element"],
  "If {{name}} is given H₂ + O₂ → H₂O, can they balance it and explain why they can't just change H₂O to H₂O₂?",
  ["MS-PS1-5", "HS-PS1-7"],
  [("ch_atoms_rearranged", "h", "Balancing is the symbolic form of conservation of atoms"),
   ("ch_word_equations", "h", "Symbol equations are built from word equations"),
   ("mt_xhoOWnhtHq", "s", "Finding common multiples speeds up balancing")])

T("ch_state_symbols", R, D, "State symbols", "14-15",
  "Add state symbols (s), (l), (g) and (aq) to equations and use them to tell, for example, which product is a gas that escapes or a precipitate that forms",
  ["Adds correct state symbols to a balanced equation",
   "Explains that (aq) means dissolved in water",
   "Uses state symbols to spot a precipitate or gas"],
  "If {{name}} sees CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g), can they say which product bubbles out of the beaker?",
  [],
  [("ch_balancing", "h", "State symbols are added to balanced symbol equations"),
   ("mt_Mf-T-fYRLX", "s", "Understanding dissolving is needed to use (aq)")])

T("ch_open_closed", C, D, "Mass changes in open and closed systems", "13-15",
  "Explain why mass seems to change when a reaction happens in an open container (a gas escapes or is gained from the air) but stays the same in a sealed container",
  ["Predicts the mass change when a gas is produced in an open flask",
   "Explains why metal gains mass when heated in air",
   "Designs a closed-system test to show conservation of mass"],
  "If {{name}} weighs a fizzing tablet dissolving in an open cup and sees the mass go down, can they explain why mass hasn't really been destroyed?",
  ["MS-PS1-5", "KS3.Sci.Chem.AEC.4"],
  [("ch_atoms_rearranged", "h", "Apparent mass change is explained by atoms entering or leaving as gas"),
   ("mt_ehC1wsdmUz", "s", "Builds on primary measurements that mass is conserved")])

T("ch_formula_mass", P, D, "Relative formula mass", "14-16",
  "Calculate the relative formula mass of a compound by adding the relative atomic masses of all the atoms in its formula",
  ["Calculates Mr for compounds like CO₂ and Ca(OH)₂",
   "Uses brackets in formulae correctly when counting atoms",
   "Calculates the percentage by mass of an element in a compound"],
  "If {{name}} is told carbon has relative atomic mass 12 and oxygen 16, can they work out the relative formula mass of carbon dioxide?",
  ["HS-PS1-7"],
  [("ch_formulae", "h", "Counting atoms in the formula comes before adding their masses"),
   ("at_numbers", "s", "Relative atomic masses are read from the periodic table alongside atomic numbers")])

T("ch_mole", C, D, "The mole", "15-17",
  "Understand the mole as a fixed number of particles (6.02 × 10²³, the Avogadro constant), and convert between mass, moles and relative formula mass",
  ["Uses moles = mass ÷ Mr in both directions",
   "Explains why chemists count particles in moles",
   "Uses the Avogadro constant to find a number of particles"],
  "If {{name}} has 36 g of water (Mr 18), can they work out how many moles that is and roughly how many molecules?",
  ["HS-PS1-7"],
  [("ch_formula_mass", "h", "Converting mass to moles uses relative formula mass"),
   ("mt_bO-njVOige", "h", "The Avogadro constant is a number written in standard form (scientific notation)")])

T("ch_reacting_masses", P, D, "Calculating reacting masses", "15-17",
  "Use a balanced equation and moles to calculate the mass of product formed or reactant needed, showing that atoms and mass are conserved mathematically",
  ["Uses mole ratios from a balanced equation",
   "Calculates the mass of product from a given mass of reactant",
   "Checks that the total mass of reactants equals total mass of products"],
  "If {{name}} burns 12 g of carbon completely, can they use C + O₂ → CO₂ to work out the mass of carbon dioxide made?",
  ["HS-PS1-7"],
  [("ch_mole", "h", "Reacting masses are calculated through moles"),
   ("ch_balancing", "h", "Mole ratios come from the balanced equation"),
   ("mt_5mIcmKRCgA", "h", "Scaling quantities by a fixed ratio is proportional reasoning")])

T("ch_limiting_yield", P, D, "Limiting reactants and percentage yield", "16-18",
  "Identify the limiting reactant in a mixture, explain why the other is in excess, and calculate theoretical and percentage yield",
  ["Identifies the limiting reactant from given masses",
   "Calculates percentage yield from actual and theoretical yield",
   "Gives reasons why actual yield is less than theoretical"],
  "If {{name}} makes sandwiches with 10 slices of bread and 3 slices of cheese, can they use that idea to explain what a limiting reactant is in a chemical reaction?",
  ["HS-PS1-7"],
  [("ch_reacting_masses", "h", "Finding the limiting reactant compares calculated reacting amounts"),
   ("mt_iEXqN48w3x", "s", "Percentage yield is a percentage calculation")])

T("ch_concentration", P, D, "Concentration of solutions", "15-17",
  "Calculate the concentration of a solution in g/dm³ and mol/dm³, and explain how dilution changes concentration but not the amount of solute",
  ["Calculates concentration from mass or moles and volume",
   "Converts cm³ to dm³",
   "Explains dilution in terms of the same solute in more solvent"],
  "If {{name}} dissolves 20 g of salt in 500 cm³ of water, can they work out the concentration in grams per dm³?",
  [],
  [("ch_mole", "h", "Molar concentration depends on moles"),
   ("mt_kLQOzZYrd5", "h", "Concentration is a compound unit (amount per volume)"),
   ("mt_Mf-T-fYRLX", "s", "Builds on the primary picture of a solute dissolving in a solvent")])

T("ch_predict_products", C, D, "Predicting reaction outcomes from the periodic table", "15-17",
  "Predict and explain the products of simple reactions between main-group elements (e.g. sodium and chlorine, carbon and oxygen) using outer-electron arrangements and periodic trends",
  ["Predicts the product and formula of a Group 1 metal reacting with a halogen",
   "Explains the outcome using electron transfer or sharing",
   "Predicts which of two similar reactions will be more vigorous"],
  "If {{name}} is asked what forms when potassium reacts with bromine, can they predict the product, write its formula and say why it forms?",
  ["HS-PS1-2"],
  [("bd_ionic", "h", "Metal–non-metal products are ionic compounds"),
   ("pt_group1", "h", "Group 1 reactivity patterns inform the prediction"),
   ("pt_group7", "h", "Halogen reactivity patterns inform the prediction")])

T("ch_combustion", C, D, "Combustion of fuels", "13-15",
  "Describe complete combustion of hydrocarbon fuels to carbon dioxide and water, incomplete combustion producing carbon monoxide and soot, and why incomplete combustion is dangerous",
  ["Writes a word and symbol equation for the complete combustion of methane",
   "States the products of incomplete combustion",
   "Explains why carbon monoxide alarms are needed"],
  "If {{name}} sees a gas flame burning yellow and sooty instead of blue, can they explain what is different about how the fuel is burning and why it matters?",
  ["HS-PS1-2", "KS3.Sci.Chem.CR.1"],
  [("mt_v0K6GRi4ZL", "h", "Combustion was introduced as a KS3 reaction type"),
   ("ch_word_equations", "h", "Describing combustion requires writing equations")])

T("ch_redox", C, D, "Oxidation and reduction as electron transfer", "16-18",
  "Define oxidation as loss of electrons and reduction as gain of electrons, identify what is oxidised and reduced in displacement reactions, and connect this to extracting metals",
  ["Identifies oxidation and reduction in a displacement reaction",
   "Writes half-equations for simple metal/ion changes",
   "Explains why carbon can extract iron but not aluminium from their oxides"],
  "If {{name}} puts an iron nail in copper sulfate solution and it turns pink, can they explain which substance lost electrons and which gained them?",
  ["HS-PS1-2"],
  [("bd_ions", "h", "Electron transfer requires understanding ion formation"),
   ("mt_zsYW61cn_q", "h", "Displacement and extraction examples come from the reactivity series"),
   ("ch_combustion", "s", "Combustion is the familiar 'gain of oxygen' meaning of oxidation that this generalises")])

T("ch_electrolysis", C, D, "Electrolysis of ionic compounds", "15-17",
  "Explain electrolysis as using electricity to break down a molten or dissolved ionic compound, predicting which ions move to each electrode and what forms there",
  ["Explains why the compound must be molten or dissolved",
   "Predicts products at each electrode for a molten binary compound",
   "Explains why aluminium is extracted by electrolysis rather than with carbon"],
  "If {{name}} passes electricity through molten lead bromide, can they predict what appears at each electrode and explain why?",
  [],
  [("bd_ionic", "h", "Electrolysis relies on mobile ions from ionic compounds"),
   ("mt_2bnXrfS4Iq", "s", "Understanding electric current is needed to explain ion movement")])

T("ch_acid_ions", C, D, "Acids, alkalis and hydrogen ions", "15-17",
  "Explain acids as sources of H⁺ ions and alkalis as sources of OH⁻ ions in solution, write the ionic equation for neutralisation, and understand that each pH unit is a tenfold change in H⁺ concentration",
  ["Writes H⁺ + OH⁻ → H₂O for neutralisation",
   "Explains that pH 3 has ten times the H⁺ concentration of pH 4",
   "Distinguishes strong from dilute acids"],
  "If {{name}} compares lemon juice at pH 2 with vinegar at pH 3, can they say how many times more hydrogen ions the lemon juice has?",
  ["KS3.Sci.Chem.CR.2"],
  [("mt_AN2kJE6I0s", "h", "Extends KS3 acids, alkalis and pH to the ionic explanation"),
   ("bd_ions", "h", "Hydrogen and hydroxide ions require the idea of ions"),
   ("mt_bO-njVOige", "s", "The tenfold pH scale is a powers-of-ten idea")])

T("ch_hand_warmer", P, D, "Designing a hand warmer or cold pack", "13-15",
  "Design, test and refine a device that uses an exothermic or endothermic process to warm or cool, choosing amounts of substances and measuring temperature change to evaluate the design",
  ["Chooses an exothermic or endothermic reaction suitable for the purpose",
   "Measures temperature change and compares designs fairly",
   "Suggests one change to improve the device and justifies it"],
  "If {{name}} is asked to make an instant cold pack for a sports injury, can they choose a suitable reaction and describe how they'd test which mix works best?",
  ["MS-PS1-6"],
  [("mt_UoqUPI_uNz", "h", "Design requires knowing which processes release or absorb heat"),
   ("mt_Ae56umVlTT", "s", "Fair comparison of designs needs control of variables")])

T("ch_bond_energy", C, D, "Bond energies and energy change", "15-17",
  "Explain that breaking bonds takes in energy and making bonds releases energy, so whether a reaction is exothermic or endothermic depends on the balance of total bond energies",
  ["States that bond breaking is endothermic and bond making is exothermic",
   "Explains an exothermic reaction as releasing more energy making bonds than breaking them",
   "Calculates an overall energy change from given bond energies"],
  "If {{name}} is asked where the energy of burning methane comes from, can they explain it in terms of bonds broken and bonds made?",
  ["HS-PS1-4"],
  [("mt_UoqUPI_uNz", "h", "Extends KS3 exothermic/endothermic reactions to a bond-level explanation"),
   ("bd_covalent", "h", "Bond energies require understanding covalent bonds")])

T("ch_energy_profile", R, D, "Reaction profiles and activation energy", "15-17",
  "Draw and interpret reaction profile diagrams showing the energy of reactants and products, the overall energy change and the activation energy, including the effect of a catalyst",
  ["Draws profiles for exothermic and endothermic reactions",
   "Labels activation energy and overall energy change",
   "Shows how a catalyst lowers activation energy"],
  "If {{name}} is shown an energy diagram where the products are lower than the reactants, can they say whether the reaction heats or cools its surroundings and point out the activation energy?",
  ["HS-PS1-4"],
  [("ch_bond_energy", "h", "Profiles represent the bond-energy balance graphically")])

T("ch_collision_theory", C, D, "Collision theory", "14-16",
  "Explain that reactions happen only when particles collide with enough energy (at least the activation energy), so the rate depends on the frequency and energy of collisions",
  ["States the two conditions for a successful collision",
   "Explains why not every collision leads to a reaction",
   "Links particle speed to collision energy"],
  "If {{name}} is asked why food goes off more slowly in the fridge, can they explain using collisions between particles?",
  ["HS-PS1-5"],
  [("pm_kinetic", "h", "Collision energy depends on particle speed and hence temperature"),
   ("ch_atoms_rearranged", "s", "Collisions are how atoms get rearranged into new substances")])

T("ch_rate_factors", C, D, "Factors affecting the rate of reaction", "15-16",
  "Explain how temperature, concentration (or gas pressure), surface area and catalysts change the rate of a reaction, in terms of the frequency and energy of collisions",
  ["Predicts the effect of each factor on rate",
   "Explains each effect with collision theory",
   "Explains why powdered solids react faster than lumps"],
  "If {{name}} drops a whole indigestion tablet and a crushed one into water, can they predict which fizzes away faster and explain why?",
  ["HS-PS1-5"],
  [("ch_collision_theory", "h", "Each factor is explained through collision theory"),
   ("ch_energy_profile", "s", "Catalysts are explained by lowered activation energy")])

T("ch_measuring_rate", P, D, "Measuring rates from graphs", "15-17",
  "Measure the rate of a reaction by tracking mass lost or gas produced over time, plot the results and use the gradient to compare rates, including the gradient of a tangent for an instantaneous rate",
  ["Plans an experiment to collect gas volume over time",
   "Calculates mean rate as change in quantity ÷ time",
   "Explains why the curve levels off as the reaction finishes"],
  "If {{name}} plots the volume of gas from a reaction every 10 seconds, can they use the graph to tell when the reaction was fastest and when it stopped?",
  ["HS-PS1-5"],
  [("ch_rate_factors", "s", "Measurements test predictions about what changes the rate"),
   ("fm_avg_rate", "h", "Rate is an average rate of change read from a graph"),
   ("mt_YHsUhi4Prc", "s", "Recording and graphing data is the inquiry skill used")])

T("ch_equilibrium", C, D, "Reversible reactions and dynamic equilibrium", "16-18",
  "Explain that some reactions are reversible and that in a closed system they reach dynamic equilibrium, where the forward and backward reactions continue at equal rates so amounts stay constant",
  ["Uses the ⇌ symbol correctly",
   "Explains why equilibrium is 'dynamic' rather than stopped",
   "Gives an example of a reversible reaction (e.g. heating hydrated copper sulfate)"],
  "If {{name}} sees blue copper sulfate turn white when heated and blue again when water is added, can they explain what makes this reaction reversible?",
  ["HS-PS1-6"],
  [("ch_rate_factors", "h", "Equilibrium is defined as equal forward and backward rates"),
   ("mt_UKmtuAsSLN", "s", "Builds on the primary idea that some changes can be reversed")])

T("ch_le_chatelier", C, D, "Shifting equilibrium (Le Chatelier's principle)", "16-18",
  "Predict how changing concentration, temperature or pressure shifts the position of an equilibrium, and use this to refine conditions that increase the yield of a product (e.g. in the Haber process)",
  ["Predicts the direction of shift when a product is removed",
   "Predicts the effect of temperature on an exothermic equilibrium",
   "Explains the compromise conditions used in an industrial process"],
  "If {{name}} is told a reaction that makes ammonia gives out heat, can they predict whether cooling it would give more or less ammonia, and why factories don't simply make it very cold?",
  ["HS-PS1-6"],
  [("ch_equilibrium", "h", "Shifting an equilibrium requires understanding dynamic equilibrium"),
   ("ch_energy_profile", "s", "Temperature effects depend on whether the forward reaction is exothermic")])

# ---------------------------------------------------------------- nuclear (high school)
T("nu_nucleus", C, D, "Inside the nucleus", "15-17",
  "Describe the nucleus as protons and neutrons held together by the strong nuclear force, which overcomes the electrical repulsion between protons at very short range, and recognise that some nuclei are unstable",
  ["Explains why protons in a nucleus should repel each other",
   "Names the strong nuclear force as what holds the nucleus together",
   "Recognises that the balance of neutrons and protons affects stability"],
  "If {{name}} is asked why a nucleus full of positive protons doesn't fly apart, can they explain what holds it together?",
  ["HS-PS1-8"],
  [("at_numbers", "h", "Discussing nuclear composition requires counting protons and neutrons"),
   ("mt_2_YoprauaJ", "s", "Like charges repelling is the problem the strong force solves")])

T("nu_decay", C, D, "Radioactive decay", "15-17",
  "Explain that unstable nuclei decay randomly by emitting radiation — alpha and beta decay change the nucleus into a different element, while gamma emission releases energy without changing the numbers of protons and neutrons — and that we can predict how a large sample behaves but not when one nucleus will decay",
  ["Defines radioactive decay",
   "Explains why decay is random for one nucleus but predictable for many",
   "Explains that alpha and beta decay change one element into another, but gamma emission does not"],
  "If {{name}} is told a single atom of radon might decay in a second or in a week, can they explain how scientists can still predict what a big sample will do?",
  ["HS-PS1-8"],
  [("nu_nucleus", "h", "Decay is a property of unstable nuclei"),
   ("at_isotopes", "h", "Radioactive isotopes (e.g. carbon-14) are the examples of unstable nuclei")])

T("nu_radiation_types", C, D, "Alpha, beta and gamma radiation", "15-17",
  "Describe alpha particles (helium nuclei), beta particles (fast electrons from the nucleus) and gamma rays (electromagnetic waves), comparing their penetrating power, ionising power and range",
  ["Identifies what each type of radiation is",
   "Ranks the types by penetration (paper, aluminium, lead)",
   "Explains why alpha is most dangerous inside the body but least outside"],
  "If {{name}} is told a radiation source is stopped by a sheet of paper, can they identify which type it is and explain why it would still be dangerous if swallowed?",
  ["HS-PS1-8"],
  [("nu_decay", "h", "These are the products of radioactive decay"),
   ("mt_XSp-S0wter", "s", "Gamma rays are part of the electromagnetic spectrum")])

T("nu_decay_equations", P, D, "Nuclear decay equations", "16-18",
  "Write balanced nuclear equations for alpha and beta decay, showing that the total mass number and total atomic number are conserved even though the element changes",
  ["Writes an alpha decay equation for a given nucleus",
   "Writes a beta decay equation and explains the change in atomic number",
   "Checks that mass numbers and atomic numbers balance"],
  "If {{name}} is told uranium-238 undergoes alpha decay, can they work out the mass number and atomic number of the nucleus it becomes?",
  ["HS-PS1-8"],
  [("nu_radiation_types", "h", "Each equation depends on what alpha and beta particles are"),
   ("ch_balancing", "s", "Balancing chemical equations is a parallel conservation bookkeeping skill"),
   ("at_numbers", "h", "Nuclear symbols use mass and atomic numbers")])

T("nu_half_life", P, D, "Half-life", "16-18",
  "Define half-life as the time for half the unstable nuclei (or the activity) of a sample to decay, read half-life from a decay graph and calculate how much remains after a number of half-lives",
  ["Reads half-life from an activity–time graph",
   "Calculates the fraction remaining after n half-lives",
   "Explains how half-life makes radiocarbon dating possible"],
  "If {{name}} is told a sample has a half-life of 6 hours, can they work out what fraction is left after a day?",
  ["HS-PS1-8"],
  [("nu_decay", "h", "Half-life describes the statistical behaviour of decay"),
   ("fm_exp_decay", "h", "Halving repeatedly is an exponential decay model")])

T("nu_fission", C, D, "Nuclear fission and chain reactions", "16-18",
  "Explain nuclear fission as a large nucleus splitting into two smaller nuclei and releasing neutrons and energy, and how a controlled chain reaction is used in a nuclear power station",
  ["Describes fission of uranium-235 after absorbing a neutron",
   "Explains a chain reaction and how control rods manage it",
   "Compares nuclear power with fossil fuels"],
  "If {{name}} is asked what control rods in a nuclear reactor are for, can they explain using the idea of a chain reaction?",
  ["HS-PS1-8"],
  [("nu_nucleus", "h", "Fission is a change in nuclear composition"),
   ("mt_w2A8D76ymp", "s", "Nuclear power is one of the energy resources compared at KS3")])

T("nu_fusion", C, D, "Nuclear fusion in stars", "16-18",
  "Explain nuclear fusion as light nuclei joining to make a heavier nucleus, releasing energy, why it needs extremely high temperature and pressure, and that it powers the Sun",
  ["Describes hydrogen nuclei fusing to make helium",
   "Explains why fusion needs very high temperatures (overcoming repulsion)",
   "Contrasts fusion with fission"],
  "If {{name}} is asked how the Sun produces its energy, can they explain fusion and why it needs such a hot core?",
  ["HS-PS1-8"],
  [("nu_nucleus", "h", "Fusion is a change in nuclear composition"),
   ("mt_KYx0m4OyZv", "s", "Stellar nucleosynthesis provides the context of fusion in stars")])

T("nu_energy_scale", C, D, "The scale of nuclear energy", "16-18",
  "Compare the energy released in nuclear processes with chemical reactions — millions of times more per kilogram — and explain qualitatively that the energy comes from a tiny decrease in mass (E = mc²)",
  ["States that nuclear reactions release far more energy per kg than burning fuel",
   "Explains that nuclear energy comes from a small loss of mass",
   "Explains why protons + neutrons are conserved in nuclear processes even though atoms are not"],
  "If {{name}} hears that a small pellet of nuclear fuel releases as much energy as a tonne of coal, can they explain where that enormous energy comes from?",
  ["HS-PS1-8"],
  [("nu_fission", "h", "Fission gives a concrete example of nuclear energy release"),
   ("ch_bond_energy", "s", "Comparing with chemical bond energy shows the difference in scale")])

T("nu_radiation_safety", C, D, "Radiation risks and uses", "16-18",
  "Distinguish irradiation from contamination, explain how dose, half-life and type of radiation affect risk, and evaluate uses of radiation in medicine and industry",
  ["Defines irradiation and contamination",
   "Explains how distance, time and shielding reduce exposure",
   "Evaluates a medical use of radiation (e.g. tracers or radiotherapy)"],
  "If {{name}} is asked why a hospital tracer should have a short half-life, can they explain the trade-off between doing its job and keeping the patient safe?",
  [],
  [("nu_radiation_types", "h", "Risk depends on the type of radiation"),
   ("nu_half_life", "h", "Risk depends on how long a source stays active")])
