from dsl import T, C, P, R, L, M
D = "Electricity & Circuits"
K = "KS3.Sci.Phys.ElectricityAndElectromagnetism."

# ---------------------------------------------------------------- charge and static
T("el_charge_electrons", C, D, "Charging by electron transfer", "12-14",
  "Explain charging by friction as the transfer of electrons from one material to another, so one object becomes negative and the other equally positive, with total charge conserved",
  ["Explains which object gains electrons when a balloon is rubbed on hair",
   "States that positive charge is not transferred",
   "Explains why the two objects end up with equal and opposite charges"],
  "If {{name}} rubs a balloon on a jumper and it becomes negative, can they explain what happened to the jumper and why?",
  [K + "5"],
  [("mt_2_YoprauaJ", "h", "KS3 static charge from rubbing is explained by electrons moving from one material to another"),
   ("at_subatomic", "h", "Only electrons move when charging by friction, because protons are fixed in the nucleus")])

T("el_electric_field", C, D, "Electric fields", "14-16",
  "Describe the electric field around a charged object, draw field lines for isolated charges, and explain that a charge in the field feels a force that is stronger closer to the object, causing sparks when the field is strong enough",
  ["Draws field lines around a positive and a negative charge",
   "Explains the direction of force on a charge in a field",
   "Explains why sparks jump from strongly charged objects"],
  "If {{name}} brings a small charged ball near a charged dome, can they describe the field and predict the force on the ball?",
  [K + "5", "HS-PS3-5"],
  [("el_charge_electrons", "h", "An electric field surrounds any charged object, such as one charged by friction"),
   ("mt_56aspHjU19", "s", "Magnetic field lines around a magnet give the model for drawing electric field lines")])

T("el_static_uses", C, D, "Uses and dangers of static electricity", "14-16",
  "Explain dangers of static (sparks when refuelling, shocks) and how earthing prevents them, and describe uses such as electrostatic spray painting, photocopiers and smoke precipitators",
  ["Explains why fuel tankers are earthed",
   "Describes how electrostatic spray painting gives an even coat",
   "Explains what earthing does to excess charge"],
  "If {{name}} sees a fuel tanker connected by a wire to the ground before refuelling, can they explain why?",
  [K + "5"],
  [("el_charge_electrons", "h", "Sparks when refuelling and earthing are explained by electrons building up and flowing away"),
   ("el_electric_field", "s", "Sparks jump where the electric field is strong enough to make the air conduct")])

# ---------------------------------------------------------------- current, pd, resistance
T("el_current_charge", P, D, "Current as rate of flow of charge (Q = It)", "14-16",
  "Define current as the rate of flow of charge and use Q = I × t to calculate charge in coulombs, current in amperes or time",
  ["Calculates charge passing in a given time",
   "Rearranges Q = It to find current",
   "Converts minutes to seconds before calculating"],
  "If {{name}} knows 2 A flows through a lamp for 5 minutes, can they calculate how much charge has passed?",
  [K + "1"],
  [("mt_2bnXrfS4Iq", "h", "The KS3 idea of current as a flow of charge is made quantitative with Q = It"),
   ("el_charge_electrons", "h", "In metal wires the moving charge is carried by free electrons drifting through the metal"),
   ("mt_vHzVa3SURC", "h", "Finding charge, current or time means substituting into Q = It")])

T("el_conventional_current", C, D, "Conventional current and electron flow", "13-15",
  "Explain that conventional current is shown flowing from positive to negative while electrons actually drift from negative to positive, and why the convention persists",
  ["Marks conventional current on a circuit diagram",
   "Marks the direction of electron flow",
   "Explains why the two directions differ"],
  "If {{name}} sees an arrow showing current leaving the positive terminal, can they explain which way the electrons are moving?",
  [],
  [("mt_2bnXrfS4Iq", "h", "The direction shown for current on a circuit diagram is the convention being explained"),
   ("el_charge_electrons", "h", "Electrons are negative, so they drift from negative to positive, against conventional current")])

T("el_pd_energy", C, D, "Potential difference as energy per charge", "14-16",
  "Define potential difference as the energy transferred per unit charge (1 V = 1 J/C) and use V = E/Q",
  ["Explains what 12 V means in joules and coulombs",
   "Calculates energy transferred by a charge moving through a pd",
   "Distinguishes pd across a component from current through it"],
  "If {{name}} is told a battery is 9 V, can they explain what that means for each coulomb of charge?",
  [K + "1"],
  [("el_current_charge", "h", "V = E/Q needs the charge in coulombs, found from current and time"),
   ("mt_2bnXrfS4Iq", "h", "The KS3 picture of voltage as a push is replaced by energy transferred per coulomb"),
   ("mt_Jvg_r4yWaY", "s", "Potential difference measures the energy transferred electrically between stores")])

T("el_measuring", R, D, "Using ammeters and voltmeters", "12-14",
  "Connect ammeters in series and voltmeters in parallel, read analogue and digital meters with suitable ranges, and check for zero errors",
  ["Draws a circuit with an ammeter and a voltmeter correctly placed",
   "Reads an analogue meter scale",
   "Explains why a voltmeter goes in parallel"],
  "If {{name}} wants to measure the current through and voltage across a lamp, can they draw where each meter goes and explain why?",
  [K + "1"],
  [("mt_2bnXrfS4Iq", "h", "Using meters correctly needs to know that ammeters measure current and voltmeters pd"),
   ("mt_NzNLYDb9CZ", "h", "Placing meters in series or parallel is planned on a circuit drawn with standard symbols"),
   ("mt_Psun-u_lPf", "s", "Reading scales accurately and choosing suitable ranges are general measurement skills")])

T("el_symbols", R, D, "Symbols for secondary circuit components", "13-15",
  "Recognise and draw symbols for resistors, variable resistors, diodes, LEDs, LDRs, thermistors, fuses, ammeters and voltmeters, and build circuits from diagrams",
  ["Draws the symbols for an LDR and a thermistor",
   "Builds a circuit correctly from a diagram",
   "Identifies the components in an unfamiliar diagram"],
  "If {{name}} is given a circuit diagram with a thermistor and an LED, can they name every component and build it?",
  [],
  [("mt_NzNLYDb9CZ", "h", "Primary circuit symbols for cells, bulbs and switches are extended to resistors and sensors")])

T("el_resistance_factors", C, D, "What affects the resistance of a wire", "14-16",
  "Investigate how a wire's length, thickness, material and temperature affect its resistance, controlling variables and plotting resistance against length",
  ["Predicts how doubling length changes resistance",
   "Plans a fair test of resistance against length",
   "Explains why thicker wires have lower resistance"],
  "If {{name}} measures the resistance of 20 cm, 40 cm and 60 cm of the same wire, can they predict the pattern and explain it?",
  [K + "1"],
  [("mt_H3ZDK0EYNV", "h", "Each resistance in the investigation is calculated from meter readings with R = V/I"),
   ("mt_ArVBEpMAPk", "s", "Testing length means keeping the material, thickness and temperature the same"),
   ("fm_direct_variation", "s", "A straight line through the origin shows that resistance is proportional to length")])

T("el_resistance_model", C, D, "Resistance explained by electrons and ions", "15-17",
  "Explain resistance in metals as electrons colliding with vibrating metal ions, and use this to explain why resistance rises with temperature and why current heats a wire",
  ["Describes electrons colliding with lattice ions",
   "Explains why a filament's resistance rises as it heats",
   "Links collisions to the heating effect of a current"],
  "If {{name}} sees a bulb filament's resistance increase as it glows, can they explain why using particles?",
  [],
  [("el_resistance_factors", "h", "The particle model explains why longer, thinner and hotter wires have more resistance"),
   ("bd_metallic", "h", "Free electrons moving between a lattice of metal ions is the model of metallic structure used")])

T("el_resistivity", P, D, "Resistivity", "16-18",
  "Use R = ρL/A to calculate resistance from resistivity, length and cross-sectional area, and compare materials",
  ["Calculates resistance of a wire of given dimensions",
   "Finds resistivity from experimental data",
   "Explains why resistance halves when area doubles"],
  "If {{name}} has a copper wire 2 m long with a cross-section of 1 mm², can they calculate its resistance from the resistivity of copper?",
  [],
  [("el_resistance_factors", "h", "R = ρL/A puts numbers to the measured effects of length and cross-sectional area"),
   ("fm_inverse_variation", "s", "Doubling the cross-sectional area halves the resistance, an inverse proportion"),
   ("al_sci_notation_ops", "s", "Resistivities such as 1.7 × 10⁻⁸ Ω m are handled in standard form")])

T("el_iv_graphs", R, D, "I–V characteristics of components", "15-17",
  "Obtain and interpret current–voltage graphs for a fixed resistor (straight line through origin), a filament lamp (curve) and a diode (current one way only), explaining each shape",
  ["Sketches the I–V graph for each component",
   "Explains why the lamp's graph curves",
   "Identifies an ohmic conductor from its graph"],
  "If {{name}} is shown three I–V graphs, can they match each to a resistor, a lamp and a diode and explain the shapes?",
  [],
  [("mt_H3ZDK0EYNV", "h", "Each graph tests whether V = IR holds with a constant resistance"),
   ("el_measuring", "h", "The data come from ammeter and voltmeter readings as the pd is varied"),
   ("fm_linear_nonlinear", "h", "A straight line through the origin means constant resistance; a curve means it changes"),
   ("el_resistance_model", "s", "The lamp's curve is explained by the filament heating up and its resistance rising")])

T("el_sensors", C, D, "LDRs and thermistors", "14-16",
  "Describe how the resistance of a light-dependent resistor falls as light increases and how a thermistor's resistance falls as temperature rises, with uses in automatic lights and thermostats",
  ["States how each component's resistance changes",
   "Sketches resistance against light intensity for an LDR",
   "Suggests a use for each sensor"],
  "If {{name}} is designing a night light, can they explain which component senses the dark and how its resistance changes?",
  [],
  [("el_symbols", "h", "Using LDRs and thermistors in circuits needs their symbols and how they are connected"),
   ("mt_H3ZDK0EYNV", "h", "A falling resistance means a larger current for the same pd, by V = IR")])

T("el_diodes", C, D, "Diodes and LEDs", "14-16",
  "Explain that a diode lets current flow in one direction only, that an LED is a diode that emits light, and why LEDs are more efficient than filament bulbs",
  ["Predicts whether a lamp lights with a diode either way round",
   "Explains what an LED does differently from a filament bulb",
   "Uses diodes to protect a circuit from reversed batteries"],
  "If {{name}} puts a diode in a circuit the wrong way round, can they predict what happens and explain why?",
  [],
  [("el_symbols", "h", "The diode symbol's arrow shows the one direction in which it lets current flow"),
   ("el_conventional_current", "s", "The arrow on the diode symbol points the way conventional current flows"),
   ("mt_JyfLtl_nhw", "s", "LEDs are compared with filament bulbs by efficiency, the useful light output per joule")])

# ---------------------------------------------------------------- series and parallel
T("el_series_resistance", P, D, "Resistance and pd in series circuits", "14-16",
  "Calculate total resistance in series (R = R₁ + R₂ + …), explain that current is the same everywhere and that the supply pd is shared in proportion to resistance",
  ["Calculates total resistance of resistors in series",
   "Finds the current and each pd in a series circuit",
   "Explains why the larger resistor takes the larger share of pd"],
  "If {{name}} has a 6 V battery with 2 Ω and 4 Ω resistors in series, can they find the current and the pd across each?",
  [K + "2"],
  [("mt_loEMaQ8kFA", "h", "KS3 rules that series current is the same everywhere are now used to share the pd"),
   ("mt_H3ZDK0EYNV", "h", "The pd across each resistor is found from V = IR with the common current")])

T("el_parallel_resistance", C, D, "Resistance in parallel circuits", "15-17",
  "Explain why adding resistors in parallel decreases total resistance (more paths), show the total is less than the smallest resistor, and calculate it with 1/R = 1/R₁ + 1/R₂",
  ["Explains why adding a branch increases total current",
   "Calculates total resistance of two resistors in parallel",
   "Checks that the answer is smaller than either resistor"],
  "If {{name}} adds a second lamp in parallel, can they explain why the battery now supplies more current?",
  [K + "2"],
  [("mt_loEMaQ8kFA", "h", "KS3 parallel rules, with the same pd across each branch, explain why resistance falls"),
   ("el_series_resistance", "h", "Parallel resistances are contrasted with series ones, which simply add"),
   ("al_algebraic_fractions", "s", "Using 1/R = 1/R₁ + 1/R₂ means adding fractions and then taking the reciprocal")])

T("el_circuit_problems", P, D, "Solving multi-step circuit problems", "15-17",
  "Combine Ohm's law with series and parallel rules to find unknown currents, potential differences and resistances in mixed circuits",
  ["Finds every current and pd in a circuit with a parallel pair in series with a resistor",
   "Sets out working in clear steps",
   "Checks answers using the rules for pd and current"],
  "If {{name}} is given a mixed circuit and the battery voltage, can they find the current through each resistor?",
  [K + "2"],
  [("el_series_resistance", "h", "In series sections, resistances add and the pd is shared in proportion to resistance"),
   ("el_parallel_resistance", "h", "In parallel sections, branches share the same pd and the combined resistance is found from reciprocals"),
   ("al_equation_word_problems", "s", "An unknown resistance or current is often found by writing and solving a linear equation")])

T("el_kirchhoff", C, D, "Kirchhoff's laws", "16-18",
  "Apply conservation of charge at junctions (currents in = currents out) and conservation of energy round any loop (sum of emfs = sum of pds) to analyse circuits",
  ["Uses the junction rule to find an unknown current",
   "Uses the loop rule to find an unknown pd",
   "Links each law to a conservation principle"],
  "If {{name}} knows the currents in two branches leaving a junction, can they find the current entering it and say which law they used?",
  [],
  [("el_circuit_problems", "h", "The junction and loop rules generalise the series and parallel rules used in mixed circuits"),
   ("mt_68pIoiiG4g", "s", "The loop rule, emfs equal the sum of pds, is conservation of energy for each coulomb")])

T("el_potential_divider", C, D, "Potential dividers", "16-18",
  "Explain how two resistors in series divide the supply pd in the ratio of their resistances, calculate output voltages, and use an LDR or thermistor to make a sensing circuit",
  ["Calculates the output pd of a potential divider",
   "Predicts how the output changes when an LDR is covered",
   "Designs a divider that gives a set output"],
  "If {{name}} builds a potential divider with a thermistor, can they predict whether the output rises or falls when it gets warmer?",
  [],
  [("el_series_resistance", "h", "A potential divider is two resistors in series sharing the supply pd in the ratio of resistances"),
   ("el_sensors", "h", "Sensing circuits replace one resistor with an LDR or thermistor so the output changes with conditions"),
   ("mt_nOCPx5qw0Z", "s", "Working out each output voltage is sharing the supply pd in a given ratio")])

T("el_emf_internal", C, D, "Emf and internal resistance", "16-18",
  "Distinguish emf from terminal pd, explain internal resistance as energy lost inside the source, and use ε = I(R + r) to analyse cells",
  ["Explains why terminal pd drops when more current is drawn",
   "Calculates internal resistance from measurements",
   "Plots terminal pd against current and reads emf and r"],
  "If {{name}} notices car headlights dim when the engine starts, can they explain why using internal resistance?",
  [],
  [("el_pd_energy", "h", "Emf and terminal pd are both energy per coulomb, given to or used by the charge"),
   ("el_circuit_problems", "h", "The cell's internal resistance is treated as a series resistor in the circuit"),
   ("al_line_from_points", "s", "A graph of terminal pd against current is a straight line with intercept ε and gradient −r")])

T("el_circuit_faults", M, D, "Finding faults in circuits", "14-16",
  "Use systematic reasoning and meter readings to locate faults such as open circuits, short circuits and blown components",
  ["Predicts meter readings for an open circuit",
   "Uses a voltmeter to locate a broken connection",
   "Explains why a short circuit is dangerous"],
  "If {{name}} has a series circuit where nothing lights, can they explain how to use a voltmeter to find the broken part?",
  [],
  [("el_measuring", "h", "Fault-finding compares ammeter and voltmeter readings with the values expected"),
   ("mt_loEMaQ8kFA", "h", "Spotting a fault needs the normal current and pd pattern for series and parallel parts")])

T("el_capacitors", C, D, "Capacitors", "16-18",
  "Explain that a capacitor stores energy by separating equal and opposite charges on two plates (the charge Q on each plate), use Q = CV, and describe uses such as camera flashes and smoothing",
  ["Calculates charge stored for a given capacitance and pd",
   "Describes what happens in a capacitor as it charges",
   "Gives a use of a capacitor"],
  "If {{name}} sees a camera flash charge then fire, can they explain what the capacitor is doing?",
  [],
  [("el_current_charge", "h", "The charge Q stored on each plate is measured in coulombs, as in Q = It"),
   ("el_pd_energy", "h", "The charge stored is proportional to the pd across the plates, Q = CV"),
   ("en_field_energy", "s", "A charged capacitor stores energy in the electric field between its plates")])

T("el_capacitor_discharge", R, D, "Capacitor discharge as exponential decay", "16-18",
  "Describe and graph the exponential decay of charge, current and pd as a capacitor discharges through a resistor, and interpret the time constant RC",
  ["Sketches charge against time during discharge",
   "Explains why the current falls more slowly over time",
   "Uses the time constant to estimate discharge time"],
  "If {{name}} sees the voltage across a discharging capacitor halve every few seconds, can they explain why the graph has that shape?",
  [],
  [("el_capacitors", "h", "Discharge describes the stored charge Q = CV flowing away through a resistor"),
   ("fm_exp_decay", "h", "Charge, current and pd each fall by the same factor in equal times, an exponential decay")])

# ---------------------------------------------------------------- mains electricity
T("el_ac_dc", C, D, "Alternating and direct current", "14-16",
  "Distinguish direct current from cells and batteries from alternating current from the mains, and state mains frequency and voltage (230 V at 50 Hz in the UK; 120 V at 60 Hz in the US)",
  ["Sketches pd–time graphs for ac and dc",
   "States mains frequency and voltage for their country",
   "Explains what changes direction in ac"],
  "If {{name}} looks at an oscilloscope trace from a battery and from a mains adapter's input, can they say which is ac and why?",
  [],
  [("mt_2bnXrfS4Iq", "h", "Telling ac from dc means tracking how the current and pd change direction over time"),
   ("wv_period_frequency", "s", "Mains frequency, 50 Hz in the UK, is the number of complete cycles each second")])

T("el_mains_safety", C, D, "Mains wiring and plug safety", "14-16",
  "Identify the live, neutral and earth wires and their functions, and explain how the earth wire and fuse protect people when a fault makes a metal case live",
  ["States the function of each wire in a three-core cable",
   "Explains why touching the live wire is dangerous even when switched off",
   "Explains how earth and fuse work together"],
  "If {{name}} is told a kettle's metal case has become live, can they explain how the earth wire and fuse keep them safe?",
  [],
  [("el_ac_dc", "h", "The live wire carries the alternating pd of the mains supply, with neutral near 0 V"),
   ("mt_d-EKO-pKkP", "s", "Plastic casings and cable insulation protect users because they are electrical insulators")])

T("el_fuses", P, D, "Choosing fuses and circuit breakers", "15-17",
  "Calculate the normal current of an appliance from I = P/V and choose a suitable fuse rating, and compare fuses, circuit breakers and residual current devices",
  ["Calculates the current for a 2 kW kettle on 230 V",
   "Chooses the right fuse from 3 A, 5 A and 13 A",
   "Explains an advantage of a circuit breaker"],
  "If {{name}} has a 1200 W hair dryer on 230 V mains, can they choose the right fuse and explain why?",
  [],
  [("el_mains_safety", "h", "A fuse in the live wire works with the earth wire to cut the supply when a fault occurs"),
   ("en_electrical_power", "h", "The appliance's normal current is found from P = IV before choosing the fuse rating")])

# ---------------------------------------------------------------- magnetism and electromagnetism
T("el_induced_magnets", C, D, "Permanent and induced magnets", "13-15",
  "Distinguish permanent magnets from induced magnets that become magnetic only in a field, and explain that induced magnetism always attracts and is lost when the field is removed",
  ["Explains why a paper clip sticks to a magnet and to another clip",
   "States that induced magnetism always causes attraction",
   "Compares magnetically hard and soft materials"],
  "If {{name}} hangs a chain of paper clips from a magnet, can they explain what happens when the magnet is removed?",
  [K + "4"],
  [("mt_56aspHjU19", "h", "An induced magnet only becomes magnetic while it sits in another magnet's field"),
   ("mt_9NvuqZKNiV", "s", "Only magnetic materials such as iron, nickel and cobalt can become induced magnets")])

T("el_em_devices", C, D, "Electromagnets in devices", "14-16",
  "Explain how electromagnets are used in relays, electric bells, door locks and scrapyard cranes, and why they are useful because they can be switched off",
  ["Explains how a relay lets a small current switch a large one",
   "Describes the action of an electric bell",
   "Explains why an iron core is used"],
  "If {{name}} looks at a relay in a car starter circuit, can they explain how the small switch controls the big motor current?",
  [K + "4"],
  [("mt_2qkn8Lhc8e", "h", "Relays, bells and locks use a KS3 electromagnet that can be switched on and off"),
   ("el_symbols", "s", "Relay and bell circuits are drawn with standard symbols for switches and coils")])

T("el_motor_force", P, D, "Force on a current-carrying wire (F = BIL)", "15-17",
  "Use Fleming's left-hand rule to find the direction of the force on a wire carrying current in a magnetic field, and calculate it with F = BIL",
  ["Uses the left-hand rule to predict force direction",
   "Calculates force from field strength, current and length",
   "Explains why there is no force when the wire is parallel to the field"],
  "If {{name}} sees a wire jump upwards between magnet poles, can they use the left-hand rule to check the current direction?",
  [],
  [("mt__7BVYUN180", "h", "The KS3 motor effect is given a direction rule and a formula, F = BIL"),
   ("mo_current_field", "h", "The force arises because the wire's own magnetic field interacts with the magnet's field"),
   ("mt_vHzVa3SURC", "s", "Calculating the force means substituting field, current and length into F = BIL")])

T("el_dc_motor", C, D, "How a dc motor works", "15-17",
  "Explain how forces on opposite sides of a coil make it turn, why a split-ring commutator is needed to keep it turning, and how to make the motor faster",
  ["Explains why the forces on opposite sides form a turning effect",
   "Explains the job of the split-ring commutator",
   "Lists ways to increase the speed of a motor"],
  "If {{name}} builds a simple motor that rocks back and forth instead of spinning, can they explain what part is missing?",
  [],
  [("el_motor_force", "h", "Opposite sides of the coil carry current in opposite directions, so the forces turn it"),
   ("mt_vuNjYx3qOy", "s", "The forces on the coil sides produce a turning effect, or moment, about the axle")])

T("el_speaker_mic", C, D, "Loudspeakers and microphones", "15-17",
  "Explain that a loudspeaker uses the motor effect to vibrate a cone with a varying current, and that a moving-coil microphone uses induction to turn sound vibrations into a varying current",
  ["Explains how a varying current moves a speaker cone",
   "Explains how a microphone produces a signal",
   "Compares the two as reverse processes"],
  "If {{name}} connects a loudspeaker to an amplifier, can they explain how the electrical signal becomes sound?",
  [],
  [("el_motor_force", "h", "A varying current in the speaker coil gives a varying force that vibrates the cone"),
   ("en_generators", "h", "A microphone's coil moves in a magnetic field, inducing a current that copies the sound"),
   ("wv_compressions", "s", "The vibrating cone pushes the air into compressions and rarefactions, which is sound")])

T("el_lenz", C, D, "Direction of induced current (Lenz's law)", "16-18",
  "Explain that an induced current always flows in a direction that opposes the change producing it, and use this to predict poles and current directions",
  ["Predicts the pole formed when a magnet approaches a coil",
   "Explains why moving a magnet into a coil takes effort",
   "Links Lenz's law to conservation of energy"],
  "If {{name}} pushes a magnet's north pole into a coil, can they predict which pole forms at that end of the coil and explain why?",
  [],
  [("en_generators", "h", "Lenz's law gives the direction of the current produced by induction in a generator"),
   ("mt_68pIoiiG4g", "s", "If the induced current helped the change, energy would be created, breaking conservation")])

T("el_faraday_law", P, D, "Faraday's law of induction", "16-18",
  "State that the induced emf equals the rate of change of magnetic flux linkage, and use it to explain why faster motion, stronger fields and more turns give larger emfs",
  ["Explains induced emf in terms of rate of change",
   "Calculates an average induced emf from a change in flux",
   "Links the law to generator design"],
  "If {{name}} spins a generator twice as fast, can they explain using Faraday's law what happens to the output voltage?",
  [],
  [("el_lenz", "h", "Faraday's law gives the size of the induced emf, while Lenz's law gives its direction"),
   ("fm_gradient_area", "s", "The emf equals the rate of change of flux linkage, the gradient of a flux–time graph")])

T("el_alternator_dynamo", R, D, "Alternators and dynamos", "15-17",
  "Compare an alternator (slip rings, ac output) with a dynamo (split-ring commutator, dc output) and sketch their output graphs, explaining how speed affects frequency and peak voltage",
  ["Sketches output graphs for each",
   "Explains the role of slip rings and commutator",
   "Predicts the effect of turning faster"],
  "If {{name}} turns a bicycle dynamo faster, can they sketch how its output changes?",
  [K + "3"],
  [("en_generators", "h", "Both machines produce current by rotating a coil in a magnetic field"),
   ("el_ac_dc", "h", "An alternator gives ac and a dynamo gives dc, so their output graphs are compared"),
   ("el_dc_motor", "s", "The split-ring commutator in a dynamo works as it does in a dc motor")])

T("el_transformers", C, D, "How transformers work", "15-17",
  "Explain how an alternating current in the primary coil creates a changing magnetic field in an iron core that induces an alternating pd in the secondary, and why transformers do not work with dc",
  ["Labels primary coil, secondary coil and core",
   "Explains why a changing field is needed",
   "Distinguishes step-up from step-down transformers"],
  "If {{name}} connects a transformer to a battery, can they explain why the bulb on the secondary only flickers at switch-on?",
  [],
  [("en_generators", "h", "The changing field in the core induces a pd in the secondary coil by electromagnetic induction"),
   ("el_ac_dc", "h", "Only an alternating current makes the continuously changing field that a transformer needs")])

T("el_transformer_equations", P, D, "Transformer equations", "15-17",
  "Use Vp/Vs = Np/Ns and, for an ideal transformer, Vp × Ip = Vs × Is to calculate voltages, currents and numbers of turns",
  ["Calculates secondary voltage from turns ratio",
   "Finds secondary current using power conservation",
   "Designs a transformer for a given output"],
  "If {{name}} needs 12 V from 230 V mains, can they work out a suitable turns ratio?",
  [],
  [("el_transformers", "h", "The equations describe how the turns on each coil set the step-up or step-down in pd"),
   ("mt_yK51ZnKA8m", "h", "Vp/Vs = Np/Ns says the voltages are in the same ratio as the numbers of turns"),
   ("en_electrical_power", "h", "For an ideal transformer, power in equals power out, so Vp × Ip = Vs × Is")])

T("el_national_grid", C, D, "How the National Grid is organised", "15-17",
  "Describe the National Grid as a network linking power stations to consumers, with step-up transformers to very high voltages for transmission and step-down transformers for safe use",
  ["Draws a labelled block diagram of the grid",
   "States where step-up and step-down transformers are used",
   "Explains why homes are not supplied at transmission voltage"],
  "If {{name}} follows electricity from a power station to a socket, can they describe each stage and why the voltage changes?",
  [],
  [("el_transformers", "h", "Step-up and step-down transformers change the voltage between power station and home"),
   ("en_power_station", "h", "Power stations supply the electricity that the grid carries to consumers")])

T("el_transmission_losses", P, D, "Calculating transmission losses", "16-18",
  "Compare power lost in transmission cables at different voltages using P = I²R and P = IV, showing quantitatively why high-voltage transmission cuts losses",
  ["Calculates current in cables for a given power at two voltages",
   "Calculates power lost in each case",
   "Explains the result in terms of current squared"],
  "If {{name}} compares sending 10 MW at 25 kV and at 400 kV, can they calculate how much less power is wasted?",
  [],
  [("el_national_grid", "h", "The calculation shows numerically why the grid steps the voltage up for transmission"),
   ("el_transformer_equations", "h", "Stepping the voltage up steps the current down by the same factor, for the same power"),
   ("en_electrical_power", "h", "Power lost in the cables is I²R, so reducing the current cuts losses sharply")])

T("el_grid_balancing", M, D, "Balancing supply and demand on the grid", "16-18",
  "Explain how grid operators meet changing demand through the day and year, the challenge of variable renewables, and the role of storage such as pumped hydro and batteries",
  ["Describes a daily demand curve",
   "Explains why wind and solar complicate supply",
   "Evaluates a storage option"],
  "If {{name}} sees demand spike at half-time in a big match, can they explain how the grid keeps up?",
  [],
  [("el_national_grid", "h", "Balancing supply and demand is the day-to-day work of running the grid"),
   ("en_compare_resources", "h", "Which stations can start quickly or vary output depends on the energy resource each uses")])

T("el_solar_cells", C, D, "Solar cells", "16-18",
  "Explain how solar cells release electrons when they absorb light of high enough frequency, producing a pd, and evaluate solar power output and limitations",
  ["Describes the energy transfer in a solar cell",
   "Explains why output depends on light intensity",
   "Evaluates solar panels for a location"],
  "If {{name}} sees a solar-powered calculator stop working in dim light, can they explain why?",
  ["HS-PS4-5"],
  [("wv_wave_particle", "h", "Light of high enough frequency releases electrons, the photon idea behind solar cells"),
   ("el_pd_energy", "h", "A solar cell's output is described as the pd it produces, the energy given to each coulomb")])

T("el_field_strength", P, D, "Electric field strength (E = F/Q)", "16-18",
  "Define electric field strength as force per unit charge, calculate it with E = F/Q, and for parallel plates use E = V/d to describe a uniform field",
  ["Calculates the force on a charge in a known field",
   "Calculates the field between parallel plates",
   "Draws the uniform field between plates"],
  "If {{name}} has two plates 2 cm apart with 400 V across them, can they calculate the field strength and the force on an electron?",
  ["HS-PS3-5"],
  [("el_electric_field", "h", "E = F/Q puts a number to the field drawn qualitatively with field lines"),
   ("el_pd_energy", "h", "Between parallel plates, E = V/d links the field strength to the pd across them"),
   ("al_sci_notation_ops", "s", "Charges such as 1.6 × 10⁻¹⁹ C and large field strengths are handled in standard form")])

T("el_household_parallel", C, D, "Why household circuits are wired in parallel", "14-16",
  "Explain why appliances in homes are connected in parallel — each gets the full mains pd and can be switched independently — and what happens to total current as more appliances are switched on",
  ["Explains two advantages of parallel wiring at home",
   "Predicts how total current changes as appliances are added",
   "Explains why too many appliances on one socket is unsafe"],
  "If {{name}} plugs a heater, kettle and toaster into one extension lead, can they explain why the total current could become dangerous?",
  [K + "2"],
  [("mt_loEMaQ8kFA", "h", "In parallel, each branch gets the full supply pd and can be switched on its own"),
   ("el_ac_dc", "h", "Household circuits run on the mains ac supply, so each appliance gets the full 230 V"),
   ("el_mains_safety", "s", "Adding appliances raises the total current, which is why fuses protect circuits")])
