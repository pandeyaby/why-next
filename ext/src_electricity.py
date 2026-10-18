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
  [("mt_2_YoprauaJ", "h", "Builds on KS3 description of static charge"),
   ("at_subatomic", "h", "Requires knowing electrons are the mobile charged particles")])

T("el_electric_field", C, D, "Electric fields", "14-16",
  "Describe the electric field around a charged object, draw field lines for isolated charges, and explain that a charge in the field feels a force that is stronger closer to the object, causing sparks when the field is strong enough",
  ["Draws field lines around a positive and a negative charge",
   "Explains the direction of force on a charge in a field",
   "Explains why sparks jump from strongly charged objects"],
  "If {{name}} brings a small charged ball near a charged dome, can they describe the field and predict the force on the ball?",
  [K + "5", "HS-PS3-5"],
  [("el_charge_electrons", "h", "Fields surround charged objects"),
   ("mt_56aspHjU19", "s", "Magnetic fields provide a familiar model of a field")])

T("el_static_uses", C, D, "Uses and dangers of static electricity", "14-16",
  "Explain dangers of static (sparks when refuelling, shocks) and how earthing prevents them, and describe uses such as electrostatic spray painting, photocopiers and smoke precipitators",
  ["Explains why fuel tankers are earthed",
   "Describes how electrostatic spray painting gives an even coat",
   "Explains what earthing does to excess charge"],
  "If {{name}} sees a fuel tanker connected by a wire to the ground before refuelling, can they explain why?",
  [K + "5"],
  [("el_charge_electrons", "h", "Uses and dangers depend on charge transfer"),
   ("el_electric_field", "s", "Sparks occur where the field is strong")])

# ---------------------------------------------------------------- current, pd, resistance
T("el_current_charge", P, D, "Current as rate of flow of charge (Q = It)", "14-16",
  "Define current as the rate of flow of charge and use Q = I × t to calculate charge in coulombs, current in amperes or time",
  ["Calculates charge passing in a given time",
   "Rearranges Q = It to find current",
   "Converts minutes to seconds before calculating"],
  "If {{name}} knows 2 A flows through a lamp for 5 minutes, can they calculate how much charge has passed?",
  [K + "1"],
  [("mt_2bnXrfS4Iq", "h", "Builds on KS3 description of current as flow of charge"),
   ("el_charge_electrons", "h", "Charge is carried by electrons"),
   ("mt_vHzVa3SURC", "h", "Uses substitution into a formula")])

T("el_conventional_current", C, D, "Conventional current and electron flow", "13-15",
  "Explain that conventional current is shown flowing from positive to negative while electrons actually drift from negative to positive, and why the convention persists",
  ["Marks conventional current on a circuit diagram",
   "Marks the direction of electron flow",
   "Explains why the two directions differ"],
  "If {{name}} sees an arrow showing current leaving the positive terminal, can they explain which way the electrons are moving?",
  [],
  [("mt_2bnXrfS4Iq", "h", "Requires the idea of current"),
   ("el_charge_electrons", "h", "Electrons are negative charge carriers")])

T("el_pd_energy", C, D, "Potential difference as energy per charge", "14-16",
  "Define potential difference as the energy transferred per unit charge (1 V = 1 J/C) and use V = E/Q",
  ["Explains what 12 V means in joules and coulombs",
   "Calculates energy transferred by a charge moving through a pd",
   "Distinguishes pd across a component from current through it"],
  "If {{name}} is told a battery is 9 V, can they explain what that means for each coulomb of charge?",
  [K + "1"],
  [("el_current_charge", "h", "Energy per charge needs charge in coulombs"),
   ("mt_2bnXrfS4Iq", "h", "Builds on voltage as a measure of 'push'"),
   ("mt_Jvg_r4yWaY", "s", "Pd describes energy transferred electrically")])

T("el_measuring", R, D, "Using ammeters and voltmeters", "12-14",
  "Connect ammeters in series and voltmeters in parallel, read analogue and digital meters with suitable ranges, and check for zero errors",
  ["Draws a circuit with an ammeter and a voltmeter correctly placed",
   "Reads an analogue meter scale",
   "Explains why a voltmeter goes in parallel"],
  "If {{name}} wants to measure the current through and voltage across a lamp, can they draw where each meter goes and explain why?",
  [K + "1"],
  [("mt_2bnXrfS4Iq", "h", "Requires knowing what each meter measures"),
   ("mt_NzNLYDb9CZ", "h", "Circuits are drawn with standard symbols"),
   ("mt_Psun-u_lPf", "s", "Builds on reading instruments accurately")])

T("el_symbols", R, D, "Symbols for secondary circuit components", "13-15",
  "Recognise and draw symbols for resistors, variable resistors, diodes, LEDs, LDRs, thermistors, fuses, ammeters and voltmeters, and build circuits from diagrams",
  ["Draws the symbols for an LDR and a thermistor",
   "Builds a circuit correctly from a diagram",
   "Identifies the components in an unfamiliar diagram"],
  "If {{name}} is given a circuit diagram with a thermistor and an LED, can they name every component and build it?",
  [],
  [("mt_NzNLYDb9CZ", "h", "Extends primary circuit symbols to new components")])

T("el_resistance_factors", C, D, "What affects the resistance of a wire", "14-16",
  "Investigate how a wire's length, thickness, material and temperature affect its resistance, controlling variables and plotting resistance against length",
  ["Predicts how doubling length changes resistance",
   "Plans a fair test of resistance against length",
   "Explains why thicker wires have lower resistance"],
  "If {{name}} measures the resistance of 20 cm, 40 cm and 60 cm of the same wire, can they predict the pattern and explain it?",
  [K + "1"],
  [("mt_H3ZDK0EYNV", "h", "Resistance is calculated with R = V/I"),
   ("mt_ArVBEpMAPk", "s", "Requires controlling variables"),
   ("fm_direct_variation", "s", "Resistance is proportional to length")])

T("el_resistance_model", C, D, "Resistance explained by electrons and ions", "15-17",
  "Explain resistance in metals as electrons colliding with vibrating metal ions, and use this to explain why resistance rises with temperature and why current heats a wire",
  ["Describes electrons colliding with lattice ions",
   "Explains why a filament's resistance rises as it heats",
   "Links collisions to the heating effect of a current"],
  "If {{name}} sees a bulb filament's resistance increase as it glows, can they explain why using particles?",
  [],
  [("el_resistance_factors", "h", "Explains the observed factors at particle level"),
   ("bd_metallic", "h", "Uses the model of metallic structure")])

T("el_resistivity", P, D, "Resistivity", "16-18",
  "Use R = ρL/A to calculate resistance from resistivity, length and cross-sectional area, and compare materials",
  ["Calculates resistance of a wire of given dimensions",
   "Finds resistivity from experimental data",
   "Explains why resistance halves when area doubles"],
  "If {{name}} has a copper wire 2 m long with a cross-section of 1 mm², can they calculate its resistance from the resistivity of copper?",
  [],
  [("el_resistance_factors", "h", "Resistivity quantifies the length and area effects"),
   ("fm_inverse_variation", "s", "Resistance is inversely proportional to area"),
   ("al_sci_notation_ops", "s", "Resistivities are tiny numbers in standard form")])

T("el_iv_graphs", R, D, "I–V characteristics of components", "15-17",
  "Obtain and interpret current–voltage graphs for a fixed resistor (straight line through origin), a filament lamp (curve) and a diode (current one way only), explaining each shape",
  ["Sketches the I–V graph for each component",
   "Explains why the lamp's graph curves",
   "Identifies an ohmic conductor from its graph"],
  "If {{name}} is shown three I–V graphs, can they match each to a resistor, a lamp and a diode and explain the shapes?",
  [],
  [("mt_H3ZDK0EYNV", "h", "Graphs test whether V = IR holds with constant R"),
   ("el_measuring", "h", "Data come from measuring I and V"),
   ("fm_linear_nonlinear", "h", "Interpreting the graphs means telling linear from nonlinear"),
   ("el_resistance_model", "s", "The lamp's curve is explained by heating")])

T("el_sensors", C, D, "LDRs and thermistors", "14-16",
  "Describe how the resistance of a light-dependent resistor falls as light increases and how a thermistor's resistance falls as temperature rises, with uses in automatic lights and thermostats",
  ["States how each component's resistance changes",
   "Sketches resistance against light intensity for an LDR",
   "Suggests a use for each sensor"],
  "If {{name}} is designing a night light, can they explain which component senses the dark and how its resistance changes?",
  [],
  [("el_symbols", "h", "Requires recognising these components"),
   ("mt_H3ZDK0EYNV", "h", "Changes in resistance change current via V = IR")])

T("el_diodes", C, D, "Diodes and LEDs", "14-16",
  "Explain that a diode lets current flow in one direction only, that an LED is a diode that emits light, and why LEDs are more efficient than filament bulbs",
  ["Predicts whether a lamp lights with a diode either way round",
   "Explains what an LED does differently from a filament bulb",
   "Uses diodes to protect a circuit from reversed batteries"],
  "If {{name}} puts a diode in a circuit the wrong way round, can they predict what happens and explain why?",
  [],
  [("el_symbols", "h", "Requires the diode symbol and its direction"),
   ("el_conventional_current", "s", "The arrow on the symbol shows conventional current"),
   ("mt_JyfLtl_nhw", "s", "Efficiency comparison uses useful energy output")])

# ---------------------------------------------------------------- series and parallel
T("el_series_resistance", P, D, "Resistance and pd in series circuits", "14-16",
  "Calculate total resistance in series (R = R₁ + R₂ + …), explain that current is the same everywhere and that the supply pd is shared in proportion to resistance",
  ["Calculates total resistance of resistors in series",
   "Finds the current and each pd in a series circuit",
   "Explains why the larger resistor takes the larger share of pd"],
  "If {{name}} has a 6 V battery with 2 Ω and 4 Ω resistors in series, can they find the current and the pd across each?",
  [K + "2"],
  [("mt_loEMaQ8kFA", "h", "Builds on KS3 series and parallel rules"),
   ("mt_H3ZDK0EYNV", "h", "Each step uses V = IR")])

T("el_parallel_resistance", C, D, "Resistance in parallel circuits", "15-17",
  "Explain why adding resistors in parallel decreases total resistance (more paths), show the total is less than the smallest resistor, and calculate it with 1/R = 1/R₁ + 1/R₂",
  ["Explains why adding a branch increases total current",
   "Calculates total resistance of two resistors in parallel",
   "Checks that the answer is smaller than either resistor"],
  "If {{name}} adds a second lamp in parallel, can they explain why the battery now supplies more current?",
  [K + "2"],
  [("mt_loEMaQ8kFA", "h", "Builds on KS3 parallel circuit rules"),
   ("el_series_resistance", "h", "Contrasts with how resistances combine in series"),
   ("al_algebraic_fractions", "s", "The formula adds reciprocals")])

T("el_circuit_problems", P, D, "Solving multi-step circuit problems", "15-17",
  "Combine Ohm's law with series and parallel rules to find unknown currents, potential differences and resistances in mixed circuits",
  ["Finds every current and pd in a circuit with a parallel pair in series with a resistor",
   "Sets out working in clear steps",
   "Checks answers using the rules for pd and current"],
  "If {{name}} is given a mixed circuit and the battery voltage, can they find the current through each resistor?",
  [K + "2"],
  [("el_series_resistance", "h", "Uses series rules"),
   ("el_parallel_resistance", "h", "Uses parallel rules"),
   ("al_equation_word_problems", "s", "Multi-step problems are set up as equations")])

T("el_kirchhoff", C, D, "Kirchhoff's laws", "16-18",
  "Apply conservation of charge at junctions (currents in = currents out) and conservation of energy round any loop (sum of emfs = sum of pds) to analyse circuits",
  ["Uses the junction rule to find an unknown current",
   "Uses the loop rule to find an unknown pd",
   "Links each law to a conservation principle"],
  "If {{name}} knows the currents in two branches leaving a junction, can they find the current entering it and say which law they used?",
  [],
  [("el_circuit_problems", "h", "Generalises the series and parallel rules"),
   ("mt_68pIoiiG4g", "s", "The loop rule is conservation of energy")])

T("el_potential_divider", C, D, "Potential dividers", "16-18",
  "Explain how two resistors in series divide the supply pd in the ratio of their resistances, calculate output voltages, and use an LDR or thermistor to make a sensing circuit",
  ["Calculates the output pd of a potential divider",
   "Predicts how the output changes when an LDR is covered",
   "Designs a divider that gives a set output"],
  "If {{name}} builds a potential divider with a thermistor, can they predict whether the output rises or falls when it gets warmer?",
  [],
  [("el_series_resistance", "h", "A divider is a series circuit sharing pd"),
   ("el_sensors", "h", "Sensing circuits use LDRs and thermistors"),
   ("mt_nOCPx5qw0Z", "s", "Sharing in a ratio is the underlying arithmetic")])

T("el_emf_internal", C, D, "Emf and internal resistance", "16-18",
  "Distinguish emf from terminal pd, explain internal resistance as energy lost inside the source, and use ε = I(R + r) to analyse cells",
  ["Explains why terminal pd drops when more current is drawn",
   "Calculates internal resistance from measurements",
   "Plots terminal pd against current and reads emf and r"],
  "If {{name}} notices car headlights dim when the engine starts, can they explain why using internal resistance?",
  [],
  [("el_pd_energy", "h", "Emf and pd are both energy per charge"),
   ("el_circuit_problems", "h", "Treats the source as part of the circuit"),
   ("al_line_from_points", "s", "Emf and r are read from a straight-line graph")])

T("el_circuit_faults", M, D, "Finding faults in circuits", "14-16",
  "Use systematic reasoning and meter readings to locate faults such as open circuits, short circuits and blown components",
  ["Predicts meter readings for an open circuit",
   "Uses a voltmeter to locate a broken connection",
   "Explains why a short circuit is dangerous"],
  "If {{name}} has a series circuit where nothing lights, can they explain how to use a voltmeter to find the broken part?",
  [],
  [("el_measuring", "h", "Fault-finding uses meter readings"),
   ("mt_loEMaQ8kFA", "h", "Requires knowing expected current and pd patterns")])

T("el_capacitors", C, D, "Capacitors", "16-18",
  "Explain that a capacitor stores energy by separating equal and opposite charges on two plates (the charge Q on each plate), use Q = CV, and describe uses such as camera flashes and smoothing",
  ["Calculates charge stored for a given capacitance and pd",
   "Describes what happens in a capacitor as it charges",
   "Gives a use of a capacitor"],
  "If {{name}} sees a camera flash charge then fire, can they explain what the capacitor is doing?",
  [],
  [("el_current_charge", "h", "Capacitors store charge in coulombs"),
   ("el_pd_energy", "h", "Charge stored depends on pd"),
   ("en_field_energy", "s", "Energy is stored in the electric field")])

T("el_capacitor_discharge", R, D, "Capacitor discharge as exponential decay", "16-18",
  "Describe and graph the exponential decay of charge, current and pd as a capacitor discharges through a resistor, and interpret the time constant RC",
  ["Sketches charge against time during discharge",
   "Explains why the current falls more slowly over time",
   "Uses the time constant to estimate discharge time"],
  "If {{name}} sees the voltage across a discharging capacitor halve every few seconds, can they explain why the graph has that shape?",
  [],
  [("el_capacitors", "h", "Discharge is a capacitor behaviour"),
   ("fm_exp_decay", "h", "The decay follows an exponential model")])

# ---------------------------------------------------------------- mains electricity
T("el_ac_dc", C, D, "Alternating and direct current", "14-16",
  "Distinguish direct current from cells and batteries from alternating current from the mains, and state mains frequency and voltage (230 V at 50 Hz in the UK; 120 V at 60 Hz in the US)",
  ["Sketches pd–time graphs for ac and dc",
   "States mains frequency and voltage for their country",
   "Explains what changes direction in ac"],
  "If {{name}} looks at an oscilloscope trace from a battery and from a mains adapter's input, can they say which is ac and why?",
  [],
  [("mt_2bnXrfS4Iq", "h", "Requires the idea of current and pd"),
   ("wv_period_frequency", "s", "Mains frequency is a frequency in hertz")])

T("el_mains_safety", C, D, "Mains wiring and plug safety", "14-16",
  "Identify the live, neutral and earth wires and their functions, and explain how the earth wire and fuse protect people when a fault makes a metal case live",
  ["States the function of each wire in a three-core cable",
   "Explains why touching the live wire is dangerous even when switched off",
   "Explains how earth and fuse work together"],
  "If {{name}} is told a kettle's metal case has become live, can they explain how the earth wire and fuse keep them safe?",
  [],
  [("el_ac_dc", "h", "Mains is an ac supply"),
   ("mt_d-EKO-pKkP", "s", "Builds on conductors and insulators")])

T("el_fuses", P, D, "Choosing fuses and circuit breakers", "15-17",
  "Calculate the normal current of an appliance from I = P/V and choose a suitable fuse rating, and compare fuses, circuit breakers and residual current devices",
  ["Calculates the current for a 2 kW kettle on 230 V",
   "Chooses the right fuse from 3 A, 5 A and 13 A",
   "Explains an advantage of a circuit breaker"],
  "If {{name}} has a 1200 W hair dryer on 230 V mains, can they choose the right fuse and explain why?",
  [],
  [("el_mains_safety", "h", "Fuses are part of mains safety"),
   ("en_electrical_power", "h", "Current is found from P = IV")])

# ---------------------------------------------------------------- magnetism and electromagnetism
T("el_induced_magnets", C, D, "Permanent and induced magnets", "13-15",
  "Distinguish permanent magnets from induced magnets that become magnetic only in a field, and explain that induced magnetism always attracts and is lost when the field is removed",
  ["Explains why a paper clip sticks to a magnet and to another clip",
   "States that induced magnetism always causes attraction",
   "Compares magnetically hard and soft materials"],
  "If {{name}} hangs a chain of paper clips from a magnet, can they explain what happens when the magnet is removed?",
  [K + "4"],
  [("mt_56aspHjU19", "h", "Builds on KS3 magnetic fields and poles"),
   ("mt_9NvuqZKNiV", "s", "Builds on primary magnetic materials")])

T("el_em_devices", C, D, "Electromagnets in devices", "14-16",
  "Explain how electromagnets are used in relays, electric bells, door locks and scrapyard cranes, and why they are useful because they can be switched off",
  ["Explains how a relay lets a small current switch a large one",
   "Describes the action of an electric bell",
   "Explains why an iron core is used"],
  "If {{name}} looks at a relay in a car starter circuit, can they explain how the small switch controls the big motor current?",
  [K + "4"],
  [("mt_2qkn8Lhc8e", "h", "Builds on KS3 electromagnets"),
   ("el_symbols", "s", "Device circuits are drawn with standard symbols")])

T("el_motor_force", P, D, "Force on a current-carrying wire (F = BIL)", "15-17",
  "Use Fleming's left-hand rule to find the direction of the force on a wire carrying current in a magnetic field, and calculate it with F = BIL",
  ["Uses the left-hand rule to predict force direction",
   "Calculates force from field strength, current and length",
   "Explains why there is no force when the wire is parallel to the field"],
  "If {{name}} sees a wire jump upwards between magnet poles, can they use the left-hand rule to check the current direction?",
  [],
  [("mt__7BVYUN180", "h", "Builds on the KS3 motor effect"),
   ("mo_current_field", "h", "The force comes from interacting fields"),
   ("mt_vHzVa3SURC", "s", "Uses substitution into F = BIL")])

T("el_dc_motor", C, D, "How a dc motor works", "15-17",
  "Explain how forces on opposite sides of a coil make it turn, why a split-ring commutator is needed to keep it turning, and how to make the motor faster",
  ["Explains why the forces on opposite sides form a turning effect",
   "Explains the job of the split-ring commutator",
   "Lists ways to increase the speed of a motor"],
  "If {{name}} builds a simple motor that rocks back and forth instead of spinning, can they explain what part is missing?",
  [],
  [("el_motor_force", "h", "The motor relies on forces on the coil sides"),
   ("mt_vuNjYx3qOy", "s", "Turning effects are moments")])

T("el_speaker_mic", C, D, "Loudspeakers and microphones", "15-17",
  "Explain that a loudspeaker uses the motor effect to vibrate a cone with a varying current, and that a moving-coil microphone uses induction to turn sound vibrations into a varying current",
  ["Explains how a varying current moves a speaker cone",
   "Explains how a microphone produces a signal",
   "Compares the two as reverse processes"],
  "If {{name}} connects a loudspeaker to an amplifier, can they explain how the electrical signal becomes sound?",
  [],
  [("el_motor_force", "h", "Speakers use the motor effect"),
   ("en_generators", "h", "Microphones use electromagnetic induction"),
   ("wv_compressions", "s", "The cone produces compressions and rarefactions")])

T("el_lenz", C, D, "Direction of induced current (Lenz's law)", "16-18",
  "Explain that an induced current always flows in a direction that opposes the change producing it, and use this to predict poles and current directions",
  ["Predicts the pole formed when a magnet approaches a coil",
   "Explains why moving a magnet into a coil takes effort",
   "Links Lenz's law to conservation of energy"],
  "If {{name}} pushes a magnet's north pole into a coil, can they predict which pole forms at that end of the coil and explain why?",
  [],
  [("en_generators", "h", "Builds on producing current by induction"),
   ("mt_68pIoiiG4g", "s", "Opposition is required by conservation of energy")])

T("el_faraday_law", P, D, "Faraday's law of induction", "16-18",
  "State that the induced emf equals the rate of change of magnetic flux linkage, and use it to explain why faster motion, stronger fields and more turns give larger emfs",
  ["Explains induced emf in terms of rate of change",
   "Calculates an average induced emf from a change in flux",
   "Links the law to generator design"],
  "If {{name}} spins a generator twice as fast, can they explain using Faraday's law what happens to the output voltage?",
  [],
  [("el_lenz", "h", "Faraday's law gives magnitude; Lenz gives direction"),
   ("fm_gradient_area", "s", "Emf is a rate of change, like a gradient")])

T("el_alternator_dynamo", R, D, "Alternators and dynamos", "15-17",
  "Compare an alternator (slip rings, ac output) with a dynamo (split-ring commutator, dc output) and sketch their output graphs, explaining how speed affects frequency and peak voltage",
  ["Sketches output graphs for each",
   "Explains the role of slip rings and commutator",
   "Predicts the effect of turning faster"],
  "If {{name}} turns a bicycle dynamo faster, can they sketch how its output changes?",
  [K + "3"],
  [("en_generators", "h", "Builds on generators producing current by induction"),
   ("el_ac_dc", "h", "Outputs are compared as ac and dc"),
   ("el_dc_motor", "s", "The commutator also appears in the dc motor")])

T("el_transformers", C, D, "How transformers work", "15-17",
  "Explain how an alternating current in the primary coil creates a changing magnetic field in an iron core that induces an alternating pd in the secondary, and why transformers do not work with dc",
  ["Labels primary coil, secondary coil and core",
   "Explains why a changing field is needed",
   "Distinguishes step-up from step-down transformers"],
  "If {{name}} connects a transformer to a battery, can they explain why the bulb on the secondary only flickers at switch-on?",
  [],
  [("en_generators", "h", "Transformers rely on electromagnetic induction"),
   ("el_ac_dc", "h", "Only ac produces a continuously changing field")])

T("el_transformer_equations", P, D, "Transformer equations", "15-17",
  "Use Vp/Vs = Np/Ns and, for an ideal transformer, Vp × Ip = Vs × Is to calculate voltages, currents and numbers of turns",
  ["Calculates secondary voltage from turns ratio",
   "Finds secondary current using power conservation",
   "Designs a transformer for a given output"],
  "If {{name}} needs 12 V from 230 V mains, can they work out a suitable turns ratio?",
  [],
  [("el_transformers", "h", "Equations describe transformer behaviour"),
   ("mt_yK51ZnKA8m", "h", "Uses equivalent ratios"),
   ("en_electrical_power", "h", "Power in = power out uses P = IV")])

T("el_national_grid", C, D, "How the National Grid is organised", "15-17",
  "Describe the National Grid as a network linking power stations to consumers, with step-up transformers to very high voltages for transmission and step-down transformers for safe use",
  ["Draws a labelled block diagram of the grid",
   "States where step-up and step-down transformers are used",
   "Explains why homes are not supplied at transmission voltage"],
  "If {{name}} follows electricity from a power station to a socket, can they describe each stage and why the voltage changes?",
  [],
  [("el_transformers", "h", "The grid relies on transformers"),
   ("en_power_station", "h", "Power stations feed the grid")])

T("el_transmission_losses", P, D, "Calculating transmission losses", "16-18",
  "Compare power lost in transmission cables at different voltages using P = I²R and P = IV, showing quantitatively why high-voltage transmission cuts losses",
  ["Calculates current in cables for a given power at two voltages",
   "Calculates power lost in each case",
   "Explains the result in terms of current squared"],
  "If {{name}} compares sending 10 MW at 25 kV and at 400 kV, can they calculate how much less power is wasted?",
  [],
  [("el_national_grid", "h", "Quantifies the reason for grid voltages"),
   ("el_transformer_equations", "h", "Voltage changes come with current changes"),
   ("en_electrical_power", "h", "Uses P = IV and P = I²R")])

T("el_grid_balancing", M, D, "Balancing supply and demand on the grid", "16-18",
  "Explain how grid operators meet changing demand through the day and year, the challenge of variable renewables, and the role of storage such as pumped hydro and batteries",
  ["Describes a daily demand curve",
   "Explains why wind and solar complicate supply",
   "Evaluates a storage option"],
  "If {{name}} sees demand spike at half-time in a big match, can they explain how the grid keeps up?",
  [],
  [("el_national_grid", "h", "Balancing is how the grid is operated"),
   ("en_compare_resources", "h", "Uses knowledge of different energy resources")])

T("el_solar_cells", C, D, "Solar cells", "16-18",
  "Explain how solar cells release electrons when they absorb light of high enough frequency, producing a pd, and evaluate solar power output and limitations",
  ["Describes the energy transfer in a solar cell",
   "Explains why output depends on light intensity",
   "Evaluates solar panels for a location"],
  "If {{name}} sees a solar-powered calculator stop working in dim light, can they explain why?",
  ["HS-PS4-5"],
  [("wv_wave_particle", "h", "Solar cells depend on the photoelectric idea"),
   ("el_pd_energy", "h", "Output is described as pd and energy per charge")])

T("el_field_strength", P, D, "Electric field strength (E = F/Q)", "16-18",
  "Define electric field strength as force per unit charge, calculate it with E = F/Q, and for parallel plates use E = V/d to describe a uniform field",
  ["Calculates the force on a charge in a known field",
   "Calculates the field between parallel plates",
   "Draws the uniform field between plates"],
  "If {{name}} has two plates 2 cm apart with 400 V across them, can they calculate the field strength and the force on an electron?",
  ["HS-PS3-5"],
  [("el_electric_field", "h", "Quantifies the field described qualitatively"),
   ("el_pd_energy", "h", "E = V/d links field to potential difference"),
   ("al_sci_notation_ops", "s", "Charges on particles are tiny numbers in standard form")])

T("el_household_parallel", C, D, "Why household circuits are wired in parallel", "14-16",
  "Explain why appliances in homes are connected in parallel — each gets the full mains pd and can be switched independently — and what happens to total current as more appliances are switched on",
  ["Explains two advantages of parallel wiring at home",
   "Predicts how total current changes as appliances are added",
   "Explains why too many appliances on one socket is unsafe"],
  "If {{name}} plugs a heater, kettle and toaster into one extension lead, can they explain why the total current could become dangerous?",
  [K + "2"],
  [("mt_loEMaQ8kFA", "h", "Uses the rules for parallel circuits"),
   ("el_ac_dc", "h", "Household circuits run on mains ac"),
   ("el_mains_safety", "s", "Overloading links to fuse protection")])
