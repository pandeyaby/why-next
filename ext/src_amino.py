from dsl import T, C, P, R, L, M
D = "Matter & Materials"

# ---------------------------------------------------------------- shapes and chirality (wave 5)
T("aa_shapes", C, D, "Shapes of molecules", "16-18",
  "Predict the shapes and bond angles of simple molecules and ions from the number of bonding pairs and lone pairs around the central atom: linear (180°), trigonal planar (120°), tetrahedral (109.5°), pyramidal (107°) and bent (104.5°)",
  ["Predicts the shape of CH₄, NH₃ and H₂O",
   "Explains why lone pairs reduce bond angles",
   "Draws a tetrahedral carbon with wedge and dash bonds"],
  "If {{name}} is asked why the bond angle in water is smaller than in methane, can they explain using electron pairs?",
  [],
  [("bd_covalent", "h", "Counts bonding pairs and lone pairs from dot-and-cross diagrams"),
   ("at_shells", "s", "The outer-shell electrons of the central atom are counted to find bonding and lone pairs")])

T("aa_chirality", C, D, "Chiral carbon atoms", "17-18",
  "Identify a chiral carbon as one bonded to four different groups, and explain that such a molecule has two non-superimposable mirror-image forms called enantiomers",
  ["Marks the chiral carbon in a structure",
   "Draws the two enantiomers with wedge and dash bonds",
   "Explains why the mirror images cannot be superimposed"],
  "If {{name}} is given butan-2-ol, can they find the chiral carbon and draw both enantiomers in 3-D?",
  [],
  [("aa_shapes", "h", "A tetrahedral carbon with four different groups has two mirror-image arrangements"),
   ("og_stereoisomers", "h", "Enantiomers are a second kind of stereoisomer after E/Z isomers"),
   ("og_skeletal", "s", "Structures are read carefully to find carbons attached to four different groups")])

T("aa_optical_isomerism", C, D, "Optical isomerism and plane-polarised light", "17-18",
  "Explain that enantiomers rotate plane-polarised light by equal amounts in opposite directions, that a racemic mixture gives no overall rotation, and how a polarimeter measures this",
  ["Describes the effect of each enantiomer on plane-polarised light",
   "Explains why a racemic mixture is optically inactive",
   "Describes how a polarimeter is used"],
  "If {{name}} finds that a sample has no effect on plane-polarised light, can they give two possible explanations?",
  [],
  [("aa_chirality", "h", "Only molecules with a chiral carbon exist as enantiomers that rotate polarised light"),
   ("wv_polarisation", "h", "Uses plane-polarised light, in which light oscillates in one plane")])

T("aa_racemic_synthesis", C, D, "Racemic products and single-enantiomer medicines", "17-18",
  "Explain that nucleophilic attack on a planar C=O group is equally likely from either side, giving a racemic mixture, and why medicines often need a single enantiomer (as the thalidomide case showed)",
  ["Explains why adding HCN to ethanal gives a racemic product",
   "Explains why enantiomers can have different effects in the body",
   "Describes one way of making a single enantiomer"],
  "If {{name}} makes 2-hydroxypropanenitrile from ethanal, can they explain why the product is optically inactive?",
  [],
  [("aa_optical_isomerism", "h", "Equal amounts of each enantiomer cancel each other's rotation, so the product is inactive"),
   ("cb_hydroxynitriles", "h", "The cyanide ion attacks the planar carbonyl group from either face"),
   ("aa_enzymes", "s", "Receptors and enzymes are chiral, so they respond differently to each enantiomer")])

# ---------------------------------------------------------------- amino acids
T("aa_structure", C, D, "Structure of amino acids", "17-18",
  "Recognise α-amino acids as H₂N–CHR–COOH, with an amine group and a carboxylic acid group on the same carbon and a side chain R that differs between amino acids",
  ["Draws the general structure of an amino acid",
   "Identifies the R group in glycine and alanine",
   "Names an amino acid systematically, such as 2-aminopropanoic acid"],
  "If {{name}} is shown the structure of alanine, can they identify the amine, carboxylic acid and R groups?",
  [],
  [("cb_amines", "h", "The –NH₂ group on the α-carbon is recognised as a primary amine group"),
   ("og_carboxylic_acids", "h", "The –COOH group on the same carbon is recognised as a carboxylic acid group"),
   ("og_natural_polymers", "s", "Amino acids are introduced as the monomers that join to make proteins")])

T("aa_chiral_amino_acids", C, D, "Chirality in amino acids", "17-18",
  "Explain that every α-amino acid except glycine has a chiral carbon, and that the amino acids in natural proteins are almost all one enantiomer (the L form)",
  ["Explains why glycine is not chiral",
   "Draws the two enantiomers of alanine",
   "Explains why living things use one enantiomer"],
  "If {{name}} compares glycine and alanine, can they explain why only alanine has optical isomers?",
  [],
  [("aa_chirality", "h", "The α-carbon carries H, NH₂, COOH and R, four different groups unless R is H"),
   ("aa_structure", "h", "The general structure H₂N–CHR–COOH shows which carbon can be chiral")])

T("aa_acid_base", C, D, "Amino acids as acids and bases", "17-18",
  "Explain that amino acids react with both acids and bases: in acidic solution the amine group gains H⁺ (–NH₃⁺) and in alkaline solution the carboxylic acid group loses H⁺ (–COO⁻)",
  ["Draws the form of glycine in acid",
   "Draws the form of glycine in alkali",
   "Explains which group reacts in each case"],
  "If {{name}} adds hydrochloric acid to glycine, can they draw the ion formed?",
  [],
  [("aa_structure", "h", "Identifies the basic amine group and the acidic carboxylic acid group"),
   ("ch_acid_ions", "h", "The –COOH group donates H⁺ and the –NH₂ group accepts H⁺, as acids and bases do")])

T("aa_zwitterions", C, D, "Zwitterions and the isoelectric point", "17-18",
  "Explain that amino acids exist as zwitterions (H₃N⁺–CHR–COO⁻) at their isoelectric point, and use this to explain their high melting points and solubility in water",
  ["Draws the zwitterion of an amino acid",
   "Explains why amino acids are crystalline solids with high melting points",
   "Defines the isoelectric point"],
  "If {{name}} is told glycine melts at over 200 °C while ethanoic acid melts at 17 °C, can they explain the difference?",
  [],
  [("aa_acid_base", "h", "A zwitterion forms by internal transfer of H⁺ from –COOH to –NH₂"),
   ("bd_ionic", "h", "Strong attractions between oppositely charged ions explain the high melting point"),
   ("cb_intermolecular", "s", "Compares ionic attractions with hydrogen bonding in similar molecules")])

T("aa_electrophoresis", C, D, "Separating amino acids by charge", "17-18",
  "Explain how amino acids carry different charges at a given pH and so move differently in an electric field (electrophoresis), with no movement at the isoelectric point",
  ["Predicts the charge of an amino acid above and below its isoelectric point",
   "Predicts the direction of movement in electrophoresis",
   "Explains why some amino acids do not move"],
  "If {{name}} runs electrophoresis of glycine at pH 2, can they predict which electrode it moves towards?",
  [],
  [("aa_zwitterions", "h", "An amino acid is positive below its isoelectric point and negative above it"),
   ("el_electric_field", "s", "Charged particles feel a force in an electric field, so ions move toward an electrode")])

# ---------------------------------------------------------------- peptides and proteins
T("aa_peptide_bond", P, D, "Peptide bonds and dipeptides", "17-18",
  "Show how two amino acids join by a condensation reaction to form a dipeptide with a peptide (amide) link, and work out the two possible dipeptides from two different amino acids",
  ["Draws the dipeptide formed from glycine and alanine",
   "Identifies the peptide link and the water lost",
   "Draws both possible dipeptides from two amino acids"],
  "If {{name}} is given glycine and alanine, can they draw both dipeptides they can form?",
  [],
  [("aa_structure", "h", "The –COOH of one amino acid joins the –NH₂ of another to form the link"),
   ("cb_amides", "h", "The peptide link –CONH– is an amide link, as formed in simple amides"),
   ("og_condensation_polymers", "h", "Forming each peptide link releases a molecule of water, a condensation reaction")])

T("aa_hydrolysis", P, D, "Hydrolysis of peptides and proteins", "17-18",
  "Describe the hydrolysis of peptides and proteins to amino acids by heating with concentrated hydrochloric acid or by enzymes, and predict the products",
  ["Writes the products of hydrolysing a dipeptide",
   "Explains why the amino acids form as ammonium salts in acid",
   "Compares acid hydrolysis with enzyme digestion"],
  "If {{name}} hydrolyses a tripeptide, can they draw the amino acids produced?",
  [],
  [("aa_peptide_bond", "h", "Hydrolysis adds water across the peptide links formed in condensation"),
   ("cb_ester_hydrolysis", "s", "Amide links hydrolyse with acid or alkali, as ester links do"),
   ("mt_0NlbulkB5P", "s", "Protein-digesting enzymes in the gut break peptide links to release amino acids")])

T("aa_protein_structure", C, D, "Primary, secondary and tertiary structure of proteins", "17-18",
  "Describe protein structure as the amino-acid sequence (primary), α-helices and β-pleated sheets held by hydrogen bonds (secondary), and the 3-D fold held by hydrogen bonds, ionic interactions, disulfide bridges and hydrophobic interactions (tertiary)",
  ["Describes each level of protein structure",
   "Identifies the bonds and interactions at each level",
   "Explains how the R groups decide the folded shape"],
  "If {{name}} is asked how a single chain of amino acids folds into a specific shape, can they name the interactions that hold it?",
  [],
  [("aa_peptide_bond", "h", "The primary structure is the sequence of peptide-linked amino acids"),
   ("cb_intermolecular", "h", "Hydrogen bonds between C=O and N–H groups hold α-helices and β-pleated sheets"),
   ("og_natural_polymers", "h", "Proteins are natural condensation polymers built from chains of amino acids"),
   ("aa_zwitterions", "s", "Charged R groups form ionic interactions in the folded protein")])

T("aa_enzymes", C, D, "Enzymes, active sites and denaturation", "17-18",
  "Explain enzymes as protein catalysts whose active site matches a substrate in shape (and often in chirality), and how heat or a change in pH denatures them by disrupting hydrogen bonds and ionic interactions",
  ["Explains specificity in terms of the active site",
   "Explains denaturation by heat and pH",
   "Explains why an enzyme may act on only one enantiomer"],
  "If {{name}} sees that an enzyme stops working at 70 °C, can they explain what has happened to its structure?",
  [],
  [("aa_protein_structure", "h", "The shape of the active site depends on the folded tertiary structure"),
   ("ch_rate_factors", "s", "Enzymes are biological catalysts that speed up reactions by lowering activation energy"),
   ("mt_0NlbulkB5P", "s", "Digestive enzymes breaking down food are the first examples of enzyme action")])

T("aa_proteins_vs_nylon", C, D, "Proteins compared with synthetic polyamides", "17-18",
  "Compare proteins with synthetic polyamides such as nylon: both have amide links, but proteins have many different R groups in a specific sequence that gives them a precise folded shape",
  ["Identifies the amide links in nylon and in a protein",
   "Explains why proteins are more varied than nylon",
   "Compares how both can be hydrolysed"],
  "If {{name}} compares a section of nylon-6,6 with a section of a protein, can they describe one similarity and two differences?",
  [],
  [("aa_peptide_bond", "h", "Proteins are held together by peptide links, which are amide links like nylon's"),
   ("cb_polymer_hydrolysis", "h", "Nylon-6,6 is a synthetic polyamide made from a diamine and a dicarboxylic acid")])

# ---------------------------------------------------------------- chromatography
T("aa_chromatography", C, D, "How chromatography separates mixtures", "16-18",
  "Explain chromatography in terms of a stationary phase and a mobile phase, with substances separating because they are attracted to the two phases to different extents",
  ["Identifies the stationary and mobile phases in paper chromatography",
   "Explains why substances travel different distances",
   "Explains how a pure substance gives one spot"],
  "If {{name}} sees ink split into three spots, can they explain why the dyes moved different distances?",
  [],
  [("mt_U_tJvy3cbB", "h", "Paper chromatography, met as a separation technique, is explained with two phases"),
   ("mt_MBTVB-E-S7", "s", "A pure substance gives a single spot, while a mixture separates into several"),
   ("cb_intermolecular", "s", "Attraction to each phase depends on intermolecular forces and polarity")])

T("aa_rf_values", P, D, "Rf values", "16-18",
  "Calculate Rf = distance moved by the substance ÷ distance moved by the solvent, and identify substances by comparing Rf values with known samples under the same conditions",
  ["Calculates an Rf value from a chromatogram",
   "Identifies a substance by comparing Rf values",
   "Explains why the conditions must be the same"],
  "If {{name}} has a spot 3.6 cm from the start and a solvent front at 9.0 cm, can they find the Rf value and use it to identify the substance?",
  [],
  [("aa_chromatography", "h", "Rf compares how far a spot and the solvent front travel up the chromatogram"),
   ("mt_yK51ZnKA8m", "s", "An Rf value is a ratio of two distances, so it is always between 0 and 1")])

T("aa_tlc", P, D, "Thin-layer chromatography of amino acids", "17-18",
  "Use thin-layer chromatography to identify the amino acids in a hydrolysed protein, locating colourless spots with ninhydrin or UV light and comparing Rf values with standards",
  ["Describes how to run a TLC plate",
   "Explains how colourless amino acids are located",
   "Identifies amino acids from Rf values"],
  "If {{name}} hydrolyses a peptide and runs TLC, can they explain how to find which amino acids it contained?",
  [],
  [("aa_rf_values", "h", "Each spot's Rf value is compared with those of known amino acids run alongside"),
   ("aa_hydrolysis", "h", "The amino acids on the plate come from hydrolysing the protein or peptide")])

T("aa_column_chromatography", P, D, "Column chromatography for purification", "17-18",
  "Use column chromatography to separate and collect the components of a mixture, choosing the solvent and collecting fractions",
  ["Describes how a column is packed and run",
   "Explains how fractions are collected",
   "Explains how TLC can check the fractions"],
  "If {{name}} needs to purify a reaction product from a by-product, can they explain how column chromatography would do it?",
  [],
  [("aa_chromatography", "h", "Components separate down the column by their attraction to the two phases"),
   ("cb_practical_techniques", "s", "Column chromatography is added to reflux, distillation and recrystallisation as a purification method")])

T("aa_choose_chromatography", M, D, "Choosing a chromatography method", "17-18",
  "Choose between paper, thin-layer, column and gas chromatography for a task, comparing Rf values with retention times and identification with purification",
  ["Matches a task to a suitable method",
   "Compares Rf values with retention times",
   "Explains when GC–MS is needed"],
  "If {{name}} needs to identify traces of a pesticide in fruit, can they choose a chromatography method and explain why?",
  [],
  [("aa_tlc", "h", "Thin-layer chromatography is the quick choice for identifying components by Rf"),
   ("aa_column_chromatography", "h", "Column chromatography is the choice when components must be collected, not just identified"),
   ("sp_gc_ms", "h", "Knows gas chromatography with retention times and mass spectrometry")])
