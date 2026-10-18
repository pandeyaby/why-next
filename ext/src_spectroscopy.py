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
  [("og_functional_group_tests", "h", "Builds on chemical tests for functional groups"),
   ("og_functional_groups", "h", "Instruments identify functional groups and structure")])

T("sp_em_link", C, D, "Spectroscopy across the electromagnetic spectrum", "16-18",
  "Explain that different regions of the electromagnetic spectrum probe different changes in molecules (radio waves for nuclear spin in NMR, infrared for bond vibrations, visible and ultraviolet for electron transitions), because the photon energy must match the energy change",
  ["Matches each spectroscopic technique to its region of the spectrum",
   "Uses E = hf to compare the energy changes involved",
   "Explains why a molecule absorbs only certain frequencies"],
  "If {{name}} is asked why NMR uses radio waves but IR spectroscopy uses infrared, can they explain using photon energy?",
  [],
  [("wv_photon_energy", "h", "Absorption needs photon energy to match the energy change"),
   ("mt_XSp-S0wter", "h", "Uses the regions of the electromagnetic spectrum"),
   ("wv_em_uses", "s", "Extends the uses of electromagnetic waves")])

# ---------------------------------------------------------------- mass spectrometry
T("sp_mass_spec_principle", C, D, "How a mass spectrometer works", "16-18",
  "Describe the stages of a time-of-flight mass spectrometer (ionisation, acceleration, a flight tube where lighter ions travel faster, and detection) and explain that ions are separated by mass-to-charge ratio",
  ["Describes each stage of the mass spectrometer",
   "Explains why ions with smaller m/z arrive first",
   "Explains why the sample must be ionised"],
  "If {{name}} is shown a diagram of a time-of-flight mass spectrometer, can they explain how it separates ions?",
  [],
  [("at_isotopes", "s", "Separating isotopes by mass is a key use"),
   ("bd_ions", "h", "The sample is turned into positive ions"),
   ("en_ke_calc", "s", "Ions with the same kinetic energy move faster if lighter")])

T("sp_element_spectra", P, D, "Mass spectra of elements", "16-18",
  "Read the mass spectrum of an element to find its isotopes and their relative abundances, calculate the relative atomic mass, and predict the peaks for a diatomic element such as Cl₂ (at 70, 72 and 74 in the ratio 9:6:1)",
  ["Reads isotopic masses and abundances from a spectrum",
   "Calculates relative atomic mass from the spectrum",
   "Predicts the molecular-ion peaks of Cl₂"],
  "If {{name}} is given the mass spectrum of a sample of magnesium, can they find its relative atomic mass?",
  [],
  [("sp_mass_spec_principle", "h", "Interprets the output of a mass spectrometer"),
   ("at_relative_mass", "h", "Calculates the weighted mean of isotope masses"),
   ("pb_independence", "s", "Peak ratios for Cl₂ come from multiplying isotope probabilities")])

T("sp_molecular_ion", C, D, "The molecular ion peak", "16-18",
  "Identify the molecular ion peak (M⁺) in the mass spectrum of a compound as the peak with the highest m/z, apart from small isotope peaks, and use it to find the relative molecular mass",
  ["Identifies the M⁺ peak",
   "Uses it to find the relative molecular mass",
   "Distinguishes compounds with different molecular masses"],
  "If {{name}} is shown the mass spectrum of an unknown hydrocarbon, can they find its relative molecular mass?",
  [],
  [("sp_mass_spec_principle", "h", "Molecules are ionised in the spectrometer"),
   ("ch_formula_mass", "h", "Compares with calculated relative formula masses")])

T("sp_fragmentation", P, D, "Fragmentation patterns", "17-18",
  "Explain that molecular ions break into a positive fragment ion and a neutral radical, identify common fragments (such as CH₃⁺ at 15, C₂H₅⁺ at 29, CH₃CO⁺ at 43 and C₆H₅⁺ at 77) and use them to distinguish isomers",
  ["Writes an equation for a fragmentation",
   "Identifies the fragments responsible for major peaks",
   "Distinguishes propan-1-ol from propan-2-ol by their fragments"],
  "If {{name}} sees a large peak at m/z = 43 in the spectrum of a ketone, can they suggest which fragment causes it?",
  [],
  [("sp_molecular_ion", "h", "Fragments come from the molecular ion"),
   ("og_isomers", "h", "Distinguishes structural isomers"),
   ("og_skeletal", "s", "Draws the structures of fragments")])

T("sp_isotope_peaks", P, D, "M+1 and M+2 peaks", "17-18",
  "Use the small M+1 peak (from carbon-13, about 1.1% per carbon atom) to estimate the number of carbon atoms, and M+2 peaks to detect chlorine (M:M+2 about 3:1) or bromine (about 1:1)",
  ["Estimates the number of carbons from the M+1 peak",
   "Recognises the chlorine and bromine patterns",
   "Explains where the M+1 peak comes from"],
  "If {{name}} sees two molecular-ion peaks of equal height two mass units apart, can they explain what element the compound contains?",
  [],
  [("sp_molecular_ion", "h", "Isotope peaks sit next to the molecular ion"),
   ("sp_element_spectra", "h", "Uses natural isotope abundances")])

T("sp_high_resolution", P, D, "High-resolution mass spectrometry", "17-18",
  "Use accurate masses to four decimal places to decide between molecular formulae with the same nominal mass, such as CO (27.9949), N₂ (28.0061) and C₂H₄ (28.0313)",
  ["Calculates accurate masses from isotopic masses",
   "Chooses the molecular formula that matches a measured mass",
   "Explains why low-resolution spectra cannot separate these"],
  "If {{name}} is told a compound has M⁺ at 44.0262, can they decide between C₂H₄O, CO₂ and C₃H₈?",
  [],
  [("sp_molecular_ion", "h", "Refines the molecular ion measurement"),
   ("og_formulae_types", "s", "Works with molecular formulae")])

T("sp_empirical_formula", P, D, "Empirical formula from percentage composition", "16-18",
  "Calculate the empirical formula of a compound from masses or percentage composition by mass, dividing by relative atomic masses and finding the simplest whole-number ratio",
  ["Calculates an empirical formula from percentages",
   "Handles ratios that need multiplying, such as 1 : 1.5",
   "Explains the difference between empirical and molecular formulae"],
  "If {{name}} knows a compound is 85.7% carbon and 14.3% hydrogen by mass, can they find its empirical formula?",
  [],
  [("ch_mole", "h", "Converts masses to amounts in moles"),
   ("ch_formula_mass", "h", "Uses relative atomic masses"),
   ("mt_yK51ZnKA8m", "s", "Simplifies a ratio to whole numbers")])

T("sp_molecular_formula", P, D, "Molecular formula from empirical formula and Mr", "16-18",
  "Find the molecular formula from the empirical formula and the relative molecular mass, such as one read from the molecular ion peak",
  ["Finds the molecular formula from CH₂ and Mr = 56",
   "Uses a mass spectrum to supply Mr",
   "Checks the formula against the data"],
  "If {{name}} has found an empirical formula of CH₂O and a molecular ion at 60, can they find the molecular formula?",
  [],
  [("sp_empirical_formula", "h", "Starts from the empirical formula"),
   ("sp_molecular_ion", "s", "Mr can come from the molecular ion peak")])

# ---------------------------------------------------------------- infrared spectroscopy
T("sp_bond_vibrations", C, D, "Bonds absorb infrared radiation by vibrating", "16-18",
  "Explain that covalent bonds vibrate (stretch and bend) at frequencies in the infrared range that depend on bond strength and the masses of the atoms, so each bond absorbs infrared at characteristic frequencies",
  ["Explains why bonds absorb infrared radiation",
   "Predicts that stronger bonds absorb at higher frequency",
   "Links infrared absorption by CO₂ and H₂O to the greenhouse effect"],
  "If {{name}} is asked why water vapour absorbs infrared radiation, can they explain in terms of bond vibrations?",
  [],
  [("bd_covalent", "h", "The vibrating bonds are covalent bonds"),
   ("sp_em_link", "h", "Infrared photons match vibrational energy changes"),
   ("en_ir_surfaces", "s", "Builds on infrared as radiated energy")])

T("sp_ir_reading", L, D, "Reading an infrared spectrum", "16-18",
  "Read an infrared spectrum with transmittance against wavenumber (in cm⁻¹, from about 4000 down to 500), recognising absorptions as downward troughs and the fingerprint region below about 1500 cm⁻¹",
  ["Explains what wavenumber measures",
   "Identifies absorptions on a spectrum",
   "Explains what the fingerprint region is used for"],
  "If {{name}} is shown an infrared spectrum, can they read the wavenumber of the strongest absorption and explain the axes?",
  [],
  [("sp_bond_vibrations", "h", "Troughs show frequencies absorbed by bonds"),
   ("wv_wave_equation", "s", "Wavenumber is the reciprocal of wavelength")])

T("sp_ir_groups", P, D, "Identifying functional groups from IR absorptions", "16-18",
  "Use a data table of characteristic absorptions to identify functional groups, such as a broad O–H in alcohols (about 3200–3550 cm⁻¹), a very broad O–H in carboxylic acids (about 2500–3300 cm⁻¹) and a strong C=O (about 1680–1750 cm⁻¹)",
  ["Identifies an alcohol, an aldehyde or ketone, and a carboxylic acid from spectra",
   "Uses a data table to assign absorptions",
   "Explains why the absence of a peak is also evidence"],
  "If {{name}} is given the IR spectrum of an unknown compound with a strong absorption at 1715 cm⁻¹ and no broad peak above 2500 cm⁻¹, can they identify the functional group?",
  [],
  [("sp_ir_reading", "h", "Reads absorptions from the spectrum"),
   ("og_functional_groups", "h", "Recognises functional groups"),
   ("og_carboxylic_acids", "s", "Distinguishes acids from alcohols")])

T("sp_ir_reactions", P, D, "Using IR to follow reactions and check purity", "17-18",
  "Use IR spectra to show that a reaction has happened, such as the oxidation of an alcohol (O–H absorption disappears, C=O appears), and compare fingerprint regions with reference spectra to identify a product",
  ["Explains how IR shows an alcohol has been oxidised",
   "Matches a fingerprint region to a reference spectrum",
   "Identifies unreacted starting material from a spectrum"],
  "If {{name}} has oxidised propan-2-ol, can they explain how an IR spectrum would show the reaction worked?",
  [],
  [("sp_ir_groups", "h", "Identifies the groups before and after reaction"),
   ("og_alcohol_oxidation", "h", "Uses the oxidation of alcohols as the example")])

T("sp_ir_sensors", C, D, "Infrared absorption in breathalysers and gas sensors", "16-18",
  "Explain how breathalysers and gas monitors detect substances such as ethanol, carbon monoxide or carbon dioxide by measuring the absorption of infrared at a characteristic wavenumber",
  ["Explains how an IR breathalyser measures ethanol",
   "Explains why the absorption chosen must not overlap with water",
   "Relates the amount absorbed to the concentration"],
  "If {{name}} is asked how a roadside breathalyser works, can they explain the role of infrared absorption?",
  ["HS-PS4-5"],
  [("sp_ir_groups", "h", "Each substance absorbs at characteristic wavenumbers"),
   ("og_alcohols", "s", "Ethanol is the substance detected")])

# ---------------------------------------------------------------- NMR spectroscopy
T("sp_nmr_principle", C, D, "How NMR spectroscopy works", "17-18",
  "Explain that nuclei such as ¹H and ¹³C behave like tiny magnets, so in a strong magnetic field they absorb radio-frequency radiation at frequencies that depend on their chemical environment, measured relative to TMS",
  ["Explains why a strong magnetic field is needed",
   "Explains why TMS is used as a reference",
   "Explains why deuterated solvents such as CDCl₃ are used"],
  "If {{name}} is asked what is actually absorbed in an NMR spectrometer, can they explain in terms of nuclei, a magnetic field and radio waves?",
  [],
  [("sp_why_instruments", "h", "NMR is one of the main instrumental methods"),
   ("sp_em_link", "h", "NMR absorbs in the radio region"),
   ("at_isotopes", "s", "Only some isotopes, such as ¹³C, are detected"),
   ("mo_current_field", "s", "Builds on magnetic fields")])

T("sp_environments", C, D, "Chemical environments in NMR", "17-18",
  "Use symmetry to decide how many different chemical environments of carbon or hydrogen atoms a molecule has, such as two carbon environments and three hydrogen environments in propan-2-ol",
  ["Counts carbon environments in a molecule",
   "Counts hydrogen environments in a molecule",
   "Distinguishes isomers by the number of environments"],
  "If {{name}} compares propan-1-ol and propan-2-ol, can they predict how many carbon environments each has?",
  [],
  [("sp_nmr_principle", "h", "Environments decide where nuclei absorb"),
   ("og_isomers", "h", "Compares isomers"),
   ("og_skeletal", "s", "Reads molecular structures")])

T("sp_chemical_shift", P, D, "Chemical shift", "17-18",
  "Use chemical shift (δ, in ppm relative to TMS) and data tables to identify environments, explaining that nearby electronegative atoms such as oxygen move absorptions to higher δ",
  ["Assigns peaks to environments using a data table",
   "Explains why H next to oxygen has a higher shift",
   "Explains why TMS is set at δ = 0"],
  "If {{name}} sees a ¹H NMR peak at δ = 3.6, can they use a data table to suggest the environment?",
  [],
  [("sp_environments", "h", "Each environment gives a different shift"),
   ("pt_periodic_trends", "s", "Uses differences in electronegativity")])

T("sp_c13_nmr", P, D, "Carbon-13 NMR spectra", "17-18",
  "Interpret ¹³C NMR spectra, using the number of peaks for the number of carbon environments and shift ranges (such as C=O at about 160–220 ppm) to identify groups, knowing that routine spectra show single peaks whose heights are not proportional to the number of carbons",
  ["Counts carbon environments from a spectrum",
   "Assigns a C=O carbon from its shift",
   "Matches a spectrum to one of several isomers"],
  "If {{name}} is given the ¹³C NMR spectrum of a C₄H₈O compound with four peaks, one at 209 ppm, can they suggest a structure?",
  [],
  [("sp_chemical_shift", "h", "Uses chemical shift data"),
   ("sp_environments", "h", "Peaks correspond to carbon environments")])

T("sp_integration", P, D, "Proton NMR: peak areas and integration", "17-18",
  "Use the relative areas of ¹H NMR peaks, often shown as an integration trace, to find the ratio of hydrogen atoms in each environment",
  ["Finds the ratio of hydrogens from integration values",
   "Uses the ratio with the molecular formula to find actual numbers",
   "Matches integration ratios to a structure"],
  "If {{name}} sees ¹H NMR peaks with areas in the ratio 3:2:1, can they suggest which groups of hydrogens they represent?",
  [],
  [("sp_chemical_shift", "h", "Each peak belongs to an environment"),
   ("mt_yK51ZnKA8m", "s", "Simplifies and scales ratios")])

T("sp_splitting", P, D, "Spin–spin splitting and the n + 1 rule", "17-18",
  "Use the n + 1 rule (a peak is split into n + 1 lines by n hydrogens on adjacent carbons) to identify singlets, doublets, triplets and quartets, recognising patterns such as the ethyl group's triplet and quartet",
  ["Predicts the splitting for each environment",
   "Recognises the ethyl pattern",
   "Uses Pascal's triangle for the relative heights within a peak"],
  "If {{name}} sees a triplet and a quartet in a ¹H NMR spectrum, can they explain which group is likely to be present?",
  [],
  [("sp_chemical_shift", "h", "Splitting is read for each shifted peak"),
   ("sp_environments", "h", "Counts hydrogens on adjacent carbons"),
   ("sr_pascal", "s", "Line intensities follow Pascal's triangle")])

T("sp_d2o", P, D, "Identifying O–H and N–H protons with D₂O", "17-18",
  "Identify O–H and N–H peaks in ¹H NMR spectra by shaking the sample with D₂O, which exchanges these protons for deuterium so their peaks disappear, and recognise that O–H peaks are usually singlets",
  ["Explains why the O–H peak disappears with D₂O",
   "Uses before-and-after spectra to locate an O–H peak",
   "Explains why O–H protons usually appear as singlets"],
  "If {{name}} sees a peak vanish after adding D₂O, can they explain what it tells them about the molecule?",
  [],
  [("sp_integration", "h", "Interprets peaks in a proton NMR spectrum"),
   ("sp_splitting", "s", "Explains why O–H peaks are not usually split"),
   ("og_alcohols", "s", "Alcohols contain O–H protons")])

T("sp_h1_interpret", P, D, "Interpreting proton NMR spectra", "17-18",
  "Combine chemical shift, integration and splitting from a ¹H NMR spectrum to deduce the structure of a compound with a known molecular formula",
  ["Assigns every peak in a spectrum",
   "Deduces the structure of an ester from its spectrum",
   "Checks the proposed structure against all the data"],
  "If {{name}} is given the molecular formula C₄H₈O₂ and a ¹H NMR spectrum, can they deduce which ester it is?",
  [],
  [("sp_integration", "h", "Uses integration ratios"),
   ("sp_splitting", "h", "Uses splitting patterns"),
   ("sp_d2o", "s", "Identifies O–H or N–H peaks"),
   ("og_esters", "s", "Isomeric esters are a common example")])

T("sp_mri", C, D, "From NMR to MRI", "17-18",
  "Explain that magnetic resonance imaging uses the same principle as NMR, detecting hydrogen nuclei in water and fat in the body with radio waves in a strong magnetic field, and compare its risks with X-ray imaging",
  ["Explains what MRI detects",
   "Explains why MRI uses non-ionising radiation",
   "Compares MRI with X-ray imaging"],
  "If {{name}} is asked why an MRI scan does not carry the same risks as a CT scan, can they explain?",
  ["HS-PS4-5"],
  [("sp_nmr_principle", "h", "MRI applies the principle of NMR"),
   ("wv_em_hazards", "s", "Compares ionising and non-ionising radiation")])

T("sp_gc_ms", C, D, "Gas chromatography–mass spectrometry", "17-18",
  "Explain how gas chromatography separates a mixture by retention time and mass spectrometry then identifies each component, with uses in forensics, drug testing and environmental monitoring",
  ["Describes what retention time measures",
   "Explains why the two techniques are combined",
   "Gives a use of GC–MS"],
  "If {{name}} is asked how a laboratory identifies a banned substance in an athlete's urine, can they explain GC–MS?",
  [],
  [("sp_fragmentation", "h", "Identifies components from mass spectra"),
   ("mt_U_tJvy3cbB", "h", "Chromatography is a separation technique"),
   ("og_fractional_distillation", "s", "Separation by differences in boiling point")])

T("sp_combined", M, D, "Combined structure determination", "17-18",
  "Deduce the structure of an unknown organic compound by combining evidence from percentage composition, mass spectrometry, infrared, ¹³C NMR and ¹H NMR spectra and checking that every piece of evidence agrees",
  ["Uses each technique for the information it gives best",
   "Deduces a structure consistent with all the data",
   "Explains how each spectrum rules out alternative isomers"],
  "If {{name}} is given the composition, mass spectrum, IR spectrum and both NMR spectra of an unknown compound, can they deduce its structure and justify it?",
  [],
  [("sp_molecular_formula", "h", "Starts from the molecular formula"),
   ("sp_fragmentation", "h", "Uses the mass spectrum"),
   ("sp_ir_groups", "h", "Uses the IR spectrum"),
   ("sp_c13_nmr", "h", "Uses the carbon-13 NMR spectrum"),
   ("sp_h1_interpret", "h", "Uses the proton NMR spectrum")])
