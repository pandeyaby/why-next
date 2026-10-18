from dsl import T, C, P, R, L, M
D = "Matter & Materials"

# ---------------------------------------------------------------- foundations (wave 4)
T("sp_why_instruments", C, D, "Identifying compounds with instrumental analysis", "16-18",
  "Explain why chemists use instrumental methods (mass spectrometry, infrared and NMR spectroscopy) alongside chemical tests: they are fast, sensitive, need small samples and give different, complementary information about structure",
  ["Compares instrumental methods with chemical tests",
   "States what each main technique reveals",
   "Gives a use of instrumental analysis in industry, medicine or forensics"],
  "If {{name}} is identifying an unknown liquid, can they explain what instrumental methods add to chemical tests?",
  [],
  [("og_functional_group_tests", "h", "Instruments are compared with test-tube tests for functional groups"),
   ("og_functional_groups", "h", "Instruments reveal which functional groups are present and how atoms are joined")])

T("sp_em_link", C, D, "Spectroscopy across the electromagnetic spectrum", "16-18",
  "Explain that different regions of the electromagnetic spectrum probe different changes in molecules (radio waves for nuclear spin in NMR, infrared for bond vibrations, visible and ultraviolet for electron transitions), because the photon energy must match the energy change",
  ["Matches each spectroscopic technique to its region of the spectrum",
   "Uses E = hf to compare the energy changes involved",
   "Explains why a molecule absorbs only certain frequencies"],
  "If {{name}} is asked why NMR uses radio waves but IR spectroscopy uses infrared, can they explain using photon energy?",
  [],
  [("wv_photon_energy", "h", "A photon is absorbed only if its energy hf matches the energy change in the molecule"),
   ("mt_XSp-S0wter", "h", "Radio, infrared, visible and ultraviolet are regions of the electromagnetic spectrum"),
   ("wv_em_uses", "s", "Using radiation to analyse molecules extends the uses of electromagnetic waves")])

# ---------------------------------------------------------------- mass spectrometry
T("sp_mass_spec_principle", C, D, "How a mass spectrometer works", "16-18",
  "Describe the stages of a time-of-flight mass spectrometer (ionisation, acceleration, a flight tube where lighter ions travel faster, and detection) and explain that ions are separated by mass-to-charge ratio",
  ["Describes each stage of the mass spectrometer",
   "Explains why ions with smaller m/z arrive first",
   "Explains why the sample must be ionised"],
  "If {{name}} is shown a diagram of a time-of-flight mass spectrometer, can they explain how it separates ions?",
  [],
  [("at_isotopes", "s", "Isotopes of an element have different masses, so the spectrometer separates them"),
   ("bd_ions", "h", "The sample is ionised by losing an electron, forming positive ions"),
   ("en_ke_calc", "s", "With equal kinetic energy ½mv², lighter ions travel faster and arrive sooner")])

T("sp_element_spectra", P, D, "Mass spectra of elements", "16-18",
  "Read the mass spectrum of an element to find its isotopes and their relative abundances, calculate the relative atomic mass, and predict the peaks for a diatomic element such as Cl₂ (at 70, 72 and 74 in the ratio 9:6:1)",
  ["Reads isotopic masses and abundances from a spectrum",
   "Calculates relative atomic mass from the spectrum",
   "Predicts the molecular-ion peaks of Cl₂"],
  "If {{name}} is given the mass spectrum of a sample of magnesium, can they find its relative atomic mass?",
  [],
  [("sp_mass_spec_principle", "h", "Each peak is ions of one m/z reaching the detector, with height showing abundance"),
   ("at_relative_mass", "h", "Relative atomic mass is the abundance-weighted mean of the isotope masses"),
   ("pb_independence", "s", "Peak ratios for Cl₂ come from multiplying isotope probabilities")])

T("sp_molecular_ion", C, D, "The molecular ion peak", "16-18",
  "Identify the molecular ion peak (M⁺) in the mass spectrum of a compound as the peak with the highest m/z, apart from small isotope peaks, and use it to find the relative molecular mass",
  ["Identifies the M⁺ peak",
   "Uses it to find the relative molecular mass",
   "Distinguishes compounds with different molecular masses"],
  "If {{name}} is shown the mass spectrum of an unknown hydrocarbon, can they find its relative molecular mass?",
  [],
  [("sp_mass_spec_principle", "h", "Whole molecules ionised in the spectrometer give the molecular ion M⁺"),
   ("ch_formula_mass", "h", "The m/z of M⁺ equals the relative formula mass calculated from the formula")])

T("sp_fragmentation", P, D, "Fragmentation patterns", "17-18",
  "Explain that molecular ions break into a positive fragment ion and a neutral radical, identify common fragments (such as CH₃⁺ at 15, C₂H₅⁺ at 29, CH₃CO⁺ at 43 and C₆H₅⁺ at 77) and use them to distinguish isomers",
  ["Writes an equation for a fragmentation",
   "Identifies the fragments responsible for major peaks",
   "Distinguishes propan-1-ol from propan-2-ol by their fragments"],
  "If {{name}} sees a large peak at m/z = 43 in the spectrum of a ketone, can they suggest which fragment causes it?",
  [],
  [("sp_molecular_ion", "h", "Fragments form when the molecular ion breaks into an ion and a radical"),
   ("og_isomers", "h", "Structural isomers have the same M⁺ but break into different fragments"),
   ("og_skeletal", "s", "Fragments such as CH₃CO⁺ are identified by drawing parts of the structure")])

T("sp_isotope_peaks", P, D, "M+1 and M+2 peaks", "17-18",
  "Use the small M+1 peak (from carbon-13, about 1.1% per carbon atom) to estimate the number of carbon atoms, and M+2 peaks to detect chlorine (M:M+2 about 3:1) or bromine (about 1:1)",
  ["Estimates the number of carbons from the M+1 peak",
   "Recognises the chlorine and bromine patterns",
   "Explains where the M+1 peak comes from"],
  "If {{name}} sees two molecular-ion peaks of equal height two mass units apart, can they explain what element the compound contains?",
  [],
  [("sp_molecular_ion", "h", "The M+1 and M+2 peaks sit one and two units above the molecular ion"),
   ("sp_element_spectra", "h", "Natural abundances, such as ³⁵Cl:³⁷Cl about 3:1, set the peak height ratios")])

T("sp_high_resolution", P, D, "High-resolution mass spectrometry", "17-18",
  "Use accurate masses to four decimal places to decide between molecular formulae with the same nominal mass, such as CO (27.9949), N₂ (28.0061) and C₂H₄ (28.0313)",
  ["Calculates accurate masses from isotopic masses",
   "Chooses the molecular formula that matches a measured mass",
   "Explains why low-resolution spectra cannot separate these"],
  "If {{name}} is told a compound has M⁺ at 44.0262, can they decide between C₂H₄O, CO₂ and C₃H₈?",
  [],
  [("sp_molecular_ion", "h", "The molecular ion's m/z is measured to four decimal places instead of a whole number"),
   ("og_formulae_types", "s", "Candidate molecular formulae with the same nominal mass are compared")])

T("sp_empirical_formula", P, D, "Empirical formula from percentage composition", "16-18",
  "Calculate the empirical formula of a compound from masses or percentage composition by mass, dividing by relative atomic masses and finding the simplest whole-number ratio",
  ["Calculates an empirical formula from percentages",
   "Handles ratios that need multiplying, such as 1 : 1.5",
   "Explains the difference between empirical and molecular formulae"],
  "If {{name}} knows a compound is 85.7% carbon and 14.3% hydrogen by mass, can they find its empirical formula?",
  [],
  [("ch_mole", "h", "Each element's mass is divided by its relative atomic mass to give moles"),
   ("ch_formula_mass", "h", "Relative atomic masses from the periodic table convert masses to amounts"),
   ("mt_yK51ZnKA8m", "s", "The mole ratio between elements is simplified to the smallest whole numbers")])

T("sp_molecular_formula", P, D, "Molecular formula from empirical formula and Mr", "16-18",
  "Find the molecular formula from the empirical formula and the relative molecular mass, such as one read from the molecular ion peak",
  ["Finds the molecular formula from CH₂ and Mr = 56",
   "Uses a mass spectrum to supply Mr",
   "Checks the formula against the data"],
  "If {{name}} has found an empirical formula of CH₂O and a molecular ion at 60, can they find the molecular formula?",
  [],
  [("sp_empirical_formula", "h", "The empirical formula is multiplied by Mr ÷ empirical formula mass"),
   ("sp_molecular_ion", "s", "The Mr needed can be read from the molecular ion peak of a mass spectrum")])

# ---------------------------------------------------------------- infrared spectroscopy
T("sp_bond_vibrations", C, D, "Bonds absorb infrared radiation by vibrating", "16-18",
  "Explain that covalent bonds vibrate (stretch and bend) at frequencies in the infrared range that depend on bond strength and the masses of the atoms, so each bond absorbs infrared at characteristic frequencies",
  ["Explains why bonds absorb infrared radiation",
   "Predicts that stronger bonds absorb at higher frequency",
   "Links infrared absorption by CO₂ and H₂O to the greenhouse effect"],
  "If {{name}} is asked why water vapour absorbs infrared radiation, can they explain in terms of bond vibrations?",
  [],
  [("bd_covalent", "h", "The bonds that stretch and bend are covalent bonds between atoms"),
   ("sp_em_link", "h", "Infrared photons have the right energy to change how a bond vibrates"),
   ("en_ir_surfaces", "s", "Infrared radiation, met as radiated heat energy, is what the bonds absorb")])

T("sp_ir_reading", L, D, "Reading an infrared spectrum", "16-18",
  "Read an infrared spectrum with transmittance against wavenumber (in cm⁻¹, from about 4000 down to 500), recognising absorptions as downward troughs and the fingerprint region below about 1500 cm⁻¹",
  ["Explains what wavenumber measures",
   "Identifies absorptions on a spectrum",
   "Explains what the fingerprint region is used for"],
  "If {{name}} is shown an infrared spectrum, can they read the wavenumber of the strongest absorption and explain the axes?",
  [],
  [("sp_bond_vibrations", "h", "Each trough shows a frequency absorbed by a particular bond vibrating"),
   ("wv_wave_equation", "s", "Wavenumber is 1/λ, so it rises with frequency through v = fλ")])

T("sp_ir_groups", P, D, "Identifying functional groups from IR absorptions", "16-18",
  "Use a data table of characteristic absorptions to identify functional groups, such as a broad O–H in alcohols (about 3200–3550 cm⁻¹), a very broad O–H in carboxylic acids (about 2500–3300 cm⁻¹) and a strong C=O (about 1680–1750 cm⁻¹)",
  ["Identifies an alcohol, an aldehyde or ketone, and a carboxylic acid from spectra",
   "Uses a data table to assign absorptions",
   "Explains why the absence of a peak is also evidence"],
  "If {{name}} is given the IR spectrum of an unknown compound with a strong absorption at 1715 cm⁻¹ and no broad peak above 2500 cm⁻¹, can they identify the functional group?",
  [],
  [("sp_ir_reading", "h", "Absorptions are located on the wavenumber axis before matching to a table"),
   ("og_functional_groups", "h", "Each absorption is matched to a functional group such as C=O or O–H"),
   ("og_carboxylic_acids", "s", "A very broad O–H plus C=O shows a carboxylic acid rather than an alcohol")])

T("sp_ir_reactions", P, D, "Using IR to follow reactions and check purity", "17-18",
  "Use IR spectra to show that a reaction has happened, such as the oxidation of an alcohol (O–H absorption disappears, C=O appears), and compare fingerprint regions with reference spectra to identify a product",
  ["Explains how IR shows an alcohol has been oxidised",
   "Matches a fingerprint region to a reference spectrum",
   "Identifies unreacted starting material from a spectrum"],
  "If {{name}} has oxidised propan-2-ol, can they explain how an IR spectrum would show the reaction worked?",
  [],
  [("sp_ir_groups", "h", "Groups identified before and after a reaction show what has changed"),
   ("og_alcohol_oxidation", "h", "Oxidising an alcohol is the example, with O–H lost and C=O gained")])

T("sp_ir_sensors", C, D, "Infrared absorption in breathalysers and gas sensors", "16-18",
  "Explain how breathalysers and gas monitors detect substances such as ethanol, carbon monoxide or carbon dioxide by measuring the absorption of infrared at a characteristic wavenumber",
  ["Explains how an IR breathalyser measures ethanol",
   "Explains why the absorption chosen must not overlap with water",
   "Relates the amount absorbed to the concentration"],
  "If {{name}} is asked how a roadside breathalyser works, can they explain the role of infrared absorption?",
  ["HS-PS4-5"],
  [("sp_ir_groups", "h", "Each gas absorbs infrared at characteristic wavenumbers, which the sensor measures"),
   ("og_alcohols", "s", "Breathalysers detect ethanol, the alcohol absorbing through its C–H and O–H bonds")])

# ---------------------------------------------------------------- NMR spectroscopy
T("sp_nmr_principle", C, D, "How NMR spectroscopy works", "17-18",
  "Explain that nuclei such as ¹H and ¹³C behave like tiny magnets, so in a strong magnetic field they absorb radio-frequency radiation at frequencies that depend on their chemical environment, measured relative to TMS",
  ["Explains why a strong magnetic field is needed",
   "Explains why TMS is used as a reference",
   "Explains why deuterated solvents such as CDCl₃ are used"],
  "If {{name}} is asked what is actually absorbed in an NMR spectrometer, can they explain in terms of nuclei, a magnetic field and radio waves?",
  [],
  [("sp_why_instruments", "h", "NMR is one of the instrumental methods used to identify unknown compounds"),
   ("sp_em_link", "h", "NMR uses radio waves, the lowest-energy region of the electromagnetic spectrum"),
   ("at_isotopes", "s", "¹³C is the isotope detected in carbon NMR, since ¹²C gives no signal"),
   ("mo_current_field", "s", "Nuclei line up in a strong applied magnetic field like tiny bar magnets")])

T("sp_environments", C, D, "Chemical environments in NMR", "17-18",
  "Use symmetry to decide how many different chemical environments of carbon or hydrogen atoms a molecule has, such as two carbon environments and three hydrogen environments in propan-2-ol",
  ["Counts carbon environments in a molecule",
   "Counts hydrogen environments in a molecule",
   "Distinguishes isomers by the number of environments"],
  "If {{name}} compares propan-1-ol and propan-2-ol, can they predict how many carbon environments each has?",
  [],
  [("sp_nmr_principle", "h", "Nuclei in different environments absorb at different frequencies"),
   ("og_isomers", "h", "Counting environments distinguishes structural isomers with the same formula"),
   ("og_skeletal", "s", "Environments are found by reading the structure and spotting symmetry")])

T("sp_chemical_shift", P, D, "Chemical shift", "17-18",
  "Use chemical shift (δ, in ppm relative to TMS) and data tables to identify environments, explaining that nearby electronegative atoms such as oxygen move absorptions to higher δ",
  ["Assigns peaks to environments using a data table",
   "Explains why H next to oxygen has a higher shift",
   "Explains why TMS is set at δ = 0"],
  "If {{name}} sees a ¹H NMR peak at δ = 3.6, can they use a data table to suggest the environment?",
  [],
  [("sp_environments", "h", "Each distinct environment of carbon or hydrogen appears at its own chemical shift"),
   ("pt_periodic_trends", "s", "Highly electronegative atoms such as oxygen pull electrons away and raise δ")])

T("sp_c13_nmr", P, D, "Carbon-13 NMR spectra", "17-18",
  "Interpret ¹³C NMR spectra, using the number of peaks for the number of carbon environments and shift ranges (such as C=O at about 160–220 ppm) to identify groups, knowing that routine spectra show single peaks whose heights are not proportional to the number of carbons",
  ["Counts carbon environments from a spectrum",
   "Assigns a C=O carbon from its shift",
   "Matches a spectrum to one of several isomers"],
  "If {{name}} is given the ¹³C NMR spectrum of a C₄H₈O compound with four peaks, one at 209 ppm, can they suggest a structure?",
  [],
  [("sp_chemical_shift", "h", "Shift ranges, such as C=O at about 160–220 ppm, identify the type of carbon"),
   ("sp_environments", "h", "The number of peaks equals the number of carbon environments in the molecule")])

T("sp_integration", P, D, "Proton NMR: peak areas and integration", "17-18",
  "Use the relative areas of ¹H NMR peaks, often shown as an integration trace, to find the ratio of hydrogen atoms in each environment",
  ["Finds the ratio of hydrogens from integration values",
   "Uses the ratio with the molecular formula to find actual numbers",
   "Matches integration ratios to a structure"],
  "If {{name}} sees ¹H NMR peaks with areas in the ratio 3:2:1, can they suggest which groups of hydrogens they represent?",
  [],
  [("sp_chemical_shift", "h", "Each peak, identified by its shift, belongs to one hydrogen environment"),
   ("mt_yK51ZnKA8m", "s", "Peak areas give a ratio of hydrogens, simplified and scaled to the formula")])

T("sp_splitting", P, D, "Spin–spin splitting and the n + 1 rule", "17-18",
  "Use the n + 1 rule (a peak is split into n + 1 lines by n hydrogens on adjacent carbons) to identify singlets, doublets, triplets and quartets, recognising patterns such as the ethyl group's triplet and quartet",
  ["Predicts the splitting for each environment",
   "Recognises the ethyl pattern",
   "Uses Pascal's triangle for the relative heights within a peak"],
  "If {{name}} sees a triplet and a quartet in a ¹H NMR spectrum, can they explain which group is likely to be present?",
  [],
  [("sp_chemical_shift", "h", "Each peak at its chemical shift is examined for the number of lines it has split into"),
   ("sp_environments", "h", "The n in n + 1 counts hydrogens in environments on adjacent carbons"),
   ("sr_pascal", "s", "The relative heights of lines in a split peak follow Pascal's triangle")])

T("sp_d2o", P, D, "Identifying O–H and N–H protons with D₂O", "17-18",
  "Identify O–H and N–H peaks in ¹H NMR spectra by shaking the sample with D₂O, which exchanges these protons for deuterium so their peaks disappear, and recognise that O–H peaks are usually singlets",
  ["Explains why the O–H peak disappears with D₂O",
   "Uses before-and-after spectra to locate an O–H peak",
   "Explains why O–H protons usually appear as singlets"],
  "If {{name}} sees a peak vanish after adding D₂O, can they explain what it tells them about the molecule?",
  [],
  [("sp_integration", "h", "A peak that vanishes on shaking with D₂O removes its share of the integration"),
   ("sp_splitting", "s", "O–H protons exchange rapidly, which is why their peaks are not usually split"),
   ("og_alcohols", "s", "Alcohols contain O–H protons, which D₂O exchanges for deuterium")])

T("sp_h1_interpret", P, D, "Interpreting proton NMR spectra", "17-18",
  "Combine chemical shift, integration and splitting from a ¹H NMR spectrum to deduce the structure of a compound with a known molecular formula",
  ["Assigns every peak in a spectrum",
   "Deduces the structure of an ester from its spectrum",
   "Checks the proposed structure against all the data"],
  "If {{name}} is given the molecular formula C₄H₈O₂ and a ¹H NMR spectrum, can they deduce which ester it is?",
  [],
  [("sp_integration", "h", "Integration ratios give the number of hydrogens in each environment"),
   ("sp_splitting", "h", "Splitting patterns such as a quartet and triplet show which groups are adjacent"),
   ("sp_d2o", "s", "O–H or N–H peaks are identified by their disappearance with D₂O"),
   ("og_esters", "s", "Isomeric esters are a common example that proton NMR can tell apart")])

T("sp_mri", C, D, "From NMR to MRI", "17-18",
  "Explain that magnetic resonance imaging uses the same principle as NMR, detecting hydrogen nuclei in water and fat in the body with radio waves in a strong magnetic field, and compare its risks with X-ray imaging",
  ["Explains what MRI detects",
   "Explains why MRI uses non-ionising radiation",
   "Compares MRI with X-ray imaging"],
  "If {{name}} is asked why an MRI scan does not carry the same risks as a CT scan, can they explain?",
  ["HS-PS4-5"],
  [("sp_nmr_principle", "h", "MRI detects hydrogen nuclei in a magnetic field with radio waves, as NMR does"),
   ("wv_em_hazards", "s", "MRI uses radio waves, which are non-ionising, unlike X-ray imaging")])

T("sp_gc_ms", C, D, "Gas chromatography–mass spectrometry", "17-18",
  "Explain how gas chromatography separates a mixture by retention time and mass spectrometry then identifies each component, with uses in forensics, drug testing and environmental monitoring",
  ["Describes what retention time measures",
   "Explains why the two techniques are combined",
   "Gives a use of GC–MS"],
  "If {{name}} is asked how a laboratory identifies a banned substance in an athlete's urine, can they explain GC–MS?",
  [],
  [("sp_fragmentation", "h", "Each separated component is identified from its fragmentation pattern"),
   ("mt_U_tJvy3cbB", "h", "Gas chromatography is a separation technique that splits a mixture into components"),
   ("og_fractional_distillation", "s", "Like fractional distillation, GC separates partly by differences in boiling point")])

T("sp_combined", M, D, "Combined structure determination", "17-18",
  "Deduce the structure of an unknown organic compound by combining evidence from percentage composition, mass spectrometry, infrared, ¹³C NMR and ¹H NMR spectra and checking that every piece of evidence agrees",
  ["Uses each technique for the information it gives best",
   "Deduces a structure consistent with all the data",
   "Explains how each spectrum rules out alternative isomers"],
  "If {{name}} is given the composition, mass spectrum, IR spectrum and both NMR spectra of an unknown compound, can they deduce its structure and justify it?",
  [],
  [("sp_molecular_formula", "h", "The molecular formula found from composition and Mr is the starting point"),
   ("sp_fragmentation", "h", "Fragments in the mass spectrum suggest groups present in the molecule"),
   ("sp_ir_groups", "h", "The IR spectrum shows which functional groups, such as C=O or O–H, are present"),
   ("sp_c13_nmr", "h", "The ¹³C spectrum gives the number and types of carbon environments"),
   ("sp_h1_interpret", "h", "The proton spectrum shows how the groups are joined together")])
