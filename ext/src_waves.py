from dsl import T, C, P, R, L, M
D = "Waves, Light & Sound"

# ---------------------------------------------------------------- wave basics
T("wv_energy_not_matter", C, D, "Waves transfer energy, not matter", "12-14",
  "Explain that a wave transfers energy (and information) from one place to another while the particles of the medium only oscillate about fixed positions, using evidence such as a floating cork bobbing on ripples",
  ["Explains why a cork on a pond moves up and down but not along with the ripples",
   "Distinguishes the motion of the wave from the motion of the medium",
   "Identifies the energy carried by everyday waves (sound, light, water)"],
  "If {{name}} watches a duck bobbing as ripples pass, can they explain why the duck isn't carried across the pond?",
  ["KS3.Sci.Phys.Waves.1"],
  [("mt_LxK9OKZQZX", "h", "Builds on KS3 description of transverse and longitudinal waves"),
   ("en_transfer_pathways", "h", "Waves are one of the pathways by which energy is transferred between stores")])

T("wv_amplitude_energy", C, D, "Amplitude and the energy of a wave", "12-14",
  "Describe how the energy carried by a wave increases with its amplitude, linking louder sounds and brighter light to larger amplitudes",
  ["States that larger amplitude means more energy carried",
   "Links loudness of a sound to amplitude",
   "Compares two wave diagrams and says which carries more energy"],
  "If {{name}} is shown two waves with the same wavelength but different heights, can they say which carries more energy and why?",
  ["MS-PS4-1"],
  [("wv_energy_not_matter", "h", "Amplitude only matters once waves are seen as carriers of energy"),
   ("mt__00ZSLnB7p", "s", "Builds on the primary link between volume and the strength of vibrations")])

T("wv_wave_diagrams", R, D, "Reading wave diagrams and graphs", "12-14",
  "Read amplitude and wavelength from a displacement–distance graph and amplitude and period from a displacement–time graph, and explain what each axis shows",
  ["Measures amplitude and wavelength from a displacement–distance graph",
   "Reads the time period from a displacement–time graph",
   "Explains why the two graphs look alike but show different things"],
  "If {{name}} is given a displacement–time graph of a wave, can they read off its amplitude and its period, with units?",
  ["MS-PS4-1"],
  [("mt_LxK9OKZQZX", "h", "Uses KS3 definitions of amplitude and wavelength"),
   ("mt_YHsUhi4Prc", "s", "Reading values from labelled scientific graphs is the underlying skill")])

T("wv_period_frequency", P, D, "Frequency and period (f = 1/T)", "13-15",
  "Define frequency as the number of waves passing a point per second (hertz) and time period as the time for one wave, and convert between them using f = 1/T",
  ["Calculates the frequency of a wave with a period of 0.02 s",
   "Calculates the period of a 440 Hz sound",
   "Explains what 1 Hz means"],
  "If {{name}} knows a wave has a period of 0.25 s, can they work out its frequency and explain what that number means?",
  [],
  [("wv_wave_diagrams", "h", "The period is read from a displacement–time graph"),
   ("mt_vHzVa3SURC", "h", "Using f = 1/T is substitution into a formula")])

T("wv_wave_equation", P, D, "Calculating wave speed (v = fλ)", "13-15",
  "Use the wave equation v = f × λ to calculate wave speed, frequency or wavelength, rearranging as needed and using correct units",
  ["Calculates the speed of a wave from its frequency and wavelength",
   "Rearranges to find wavelength from speed and frequency",
   "Converts kHz and cm into Hz and m before calculating"],
  "If {{name}} is told a sound wave has a frequency of 680 Hz and travels at 340 m/s, can they find its wavelength?",
  ["KS3.Sci.Phys.Waves.2", "HS-PS4-1"],
  [("wv_wave_diagrams", "h", "Wavelength must be identified before it can be used in the equation"),
   ("mt_vHzVa3SURC", "h", "The equation is used by substituting values"),
   ("mt_3qrCtdoVAU", "s", "Finding f or λ requires rearranging a formula"),
   ("mt_kLQOzZYrd5", "s", "Wave speed is a compound unit (m/s)")])

T("wv_measure_speed", P, D, "Measuring the speed of sound and water waves", "14-16",
  "Plan and carry out methods to measure wave speed — timing an echo or using two microphones for sound, and measuring frequency and wavelength in a ripple tank — and evaluate sources of error",
  ["Describes a method to measure the speed of sound in air",
   "Measures wavelength in a ripple tank using a strobe or photo and a ruler",
   "Suggests how to reduce timing errors"],
  "If {{name}} has two microphones and a timer, can they describe how to measure the speed of sound and what would make the result unreliable?",
  ["HS-PS4-1"],
  [("wv_wave_equation", "h", "Results are processed using v = fλ or v = d/t"),
   ("mt_DQk9oDE7gr", "h", "Requires knowing how sound travels through air"),
   ("mt_auJqTemMpI", "s", "Repeat readings and precision are needed to judge the measurement")])

T("wv_medium_speed", C, D, "Wave speed depends on the medium", "14-16",
  "Explain that a wave's speed depends on the medium it travels through — sound is fastest in solids and cannot cross a vacuum, light is slower in glass than in air — and that at a boundary the frequency stays the same while the wavelength changes",
  ["Orders the speed of sound in solids, liquids and gases",
   "Explains why sound cannot travel through space but light can",
   "Predicts that wavelength shortens when a wave slows down at a boundary"],
  "If {{name}} hears that sound travels about four times faster in water than in air, can they say what happens to its wavelength when it passes from air into water?",
  ["KS3.Sci.Phys.Waves.2", "HS-PS4-1"],
  [("wv_wave_equation", "h", "Constant frequency with changing speed means wavelength must change (v = fλ)"),
   ("mt_DQk9oDE7gr", "h", "Builds on KS3 idea that sound needs a medium")])

T("wv_compressions", C, D, "Compressions and rarefactions", "13-15",
  "Describe a longitudinal wave in terms of compressions and rarefactions of the medium, identify the wavelength on a longitudinal diagram, and model it with a slinky",
  ["Labels compressions and rarefactions on a diagram",
   "Marks one wavelength on a longitudinal wave",
   "Uses a slinky to show particles moving parallel to the energy transfer"],
  "If {{name}} pushes and pulls one end of a slinky, can they point to a compression and a rarefaction and show one wavelength?",
  ["KS3.Sci.Phys.Waves.3"],
  [("mt_DQk9oDE7gr", "h", "Sound is the main example of a longitudinal pressure wave"),
   ("mt_LxK9OKZQZX", "h", "Builds on the transverse/longitudinal distinction")])

# ---------------------------------------------------------------- sound
T("wv_hearing_range", C, D, "Hearing range, ultrasound and infrasound", "13-15",
  "State that humans hear roughly 20 Hz to 20 000 Hz, define ultrasound and infrasound by frequency, and compare hearing ranges of animals and of people as they age",
  ["States the approximate human hearing range in Hz",
   "Classifies frequencies as infrasound, audible or ultrasound",
   "Explains why a dog whistle is silent to people"],
  "If {{name}} is told a bat calls at 50 000 Hz, can they explain why people cannot hear it?",
  [],
  [("wv_period_frequency", "h", "Hearing range is defined in terms of frequency"),
   ("mt_KTSoXcO7OL", "h", "Builds on the primary link between pitch and vibration")])

T("wv_oscilloscope", R, D, "Sound waves on an oscilloscope", "14-16",
  "Interpret oscilloscope or microphone traces of sounds — taller traces are louder, more closely packed traces are higher pitched — and calculate frequency from the time base",
  ["Compares two traces for loudness and pitch",
   "Calculates frequency from squares per wave and the time-base setting",
   "Sketches the trace for a quieter, higher note"],
  "If {{name}} sees two oscilloscope traces of notes, can they say which is louder, which is higher, and estimate one frequency from the time base?",
  [],
  [("wv_period_frequency", "h", "Frequency is calculated from the period read on the screen"),
   ("wv_amplitude_energy", "h", "Loudness is read from amplitude"),
   ("mt_KTSoXcO7OL", "s", "Pitch was linked to vibration rate in primary")])

T("wv_echo", P, D, "Echoes and echo-sounding calculations", "14-16",
  "Use echoes to measure distances with distance = speed × time ÷ 2, as in sonar and echo-sounding, explaining why the time is halved",
  ["Calculates the depth of the sea from a sonar echo time",
   "Explains why the time is divided by two",
   "Describes how bats or ships use echoes"],
  "If {{name}} hears an echo from a cliff 2 s after shouting, can they work out how far away the cliff is if sound travels at 340 m/s?",
  ["KS3.Sci.Phys.Waves.3"],
  [("mt_q-1a86ydgU", "h", "Uses speed = distance ÷ time"),
   ("mt_DQk9oDE7gr", "h", "Echoes are reflected sound waves"),
   ("wv_hearing_range", "s", "Sonar often uses ultrasound")])

T("wv_ultrasound_seismic", C, D, "Ultrasound imaging and detection", "15-17",
  "Explain how pulses of ultrasound are partly reflected at each boundary between materials, and how timing the echoes builds an image in prenatal scans, finds cracks in metal (non-destructive testing) and maps the sea bed",
  ["Explains why ultrasound is partly reflected at each tissue boundary",
   "Calculates the depth of a boundary from an echo time",
   "Explains why ultrasound is safer than X-rays for prenatal scans"],
  "If {{name}} sees an ultrasound scan of a baby, can they explain how echoes from different tissues make the picture?",
  ["HS-PS4-5"],
  [("wv_echo", "h", "Imaging relies on timing reflected pulses"),
   ("wv_medium_speed", "h", "Wave behaviour changes at boundaries between media"),
   ("wv_compressions", "s", "Ultrasound is a longitudinal wave"),
   ("mt__kFxuAgs6d", "s", "Seismic waves were the first example of using reflected and refracted waves to see inside something")])

T("wv_decibels", P, D, "Sound level and the decibel scale", "16-18",
  "Interpret the decibel scale as logarithmic — each increase of 10 dB is ten times the intensity — and use it to judge risks of hearing damage",
  ["Explains why 80 dB is 100 times the intensity of 60 dB",
   "Places everyday sounds on the decibel scale",
   "Explains why prolonged exposure above about 85 dB is risky"],
  "If {{name}} is told a concert is 110 dB and a busy street is 80 dB, can they say how many times more intense the concert is?",
  [],
  [("wv_amplitude_energy", "h", "Sound level measures the energy carried by the wave"),
   ("fm_logarithms", "s", "A log scale compresses a huge range of intensities")])

T("wv_resonance", C, D, "Natural frequency and resonance", "15-17",
  "Explain that objects have natural frequencies and that driving them at that frequency produces large-amplitude oscillations (resonance), with examples such as instruments, glasses and bridges",
  ["Defines natural frequency",
   "Explains why pushing a swing in time builds up amplitude",
   "Gives a useful and a harmful example of resonance"],
  "If {{name}} sees a singer break a glass with a note, can they explain why only one particular pitch works?",
  [],
  [("wv_period_frequency", "h", "Resonance is about matching frequencies"),
   ("wv_amplitude_energy", "h", "Resonance shows up as growing amplitude, meaning energy builds up")])

# ---------------------------------------------------------------- wave behaviour
T("wv_superposition", C, D, "Superposition and interference", "15-17",
  "Explain that when waves meet their displacements add (superposition), producing constructive and destructive interference, and that the waves pass through each other unchanged",
  ["Adds two wave pulses on a diagram",
   "Explains how noise-cancelling headphones work",
   "Describes where loud and quiet spots appear between two speakers"],
  "If {{name}} walks between two speakers playing the same note, can they explain why the sound gets louder and quieter in different places?",
  ["HS-PS4-3"],
  [("wv_wave_diagrams", "h", "Adding displacements needs fluent reading of wave diagrams"),
   ("wv_amplitude_energy", "s", "Interference changes amplitude and so energy at a point")])

T("wv_standing_waves", C, D, "Standing waves and harmonics", "16-18",
  "Explain standing waves on a string or in a pipe as the superposition of two waves travelling in opposite directions, identify nodes and antinodes, and relate harmonics to the notes of instruments",
  ["Labels nodes and antinodes on a standing wave",
   "Finds the wavelength of the first harmonic of a string of known length",
   "Explains why shortening a guitar string raises the pitch"],
  "If {{name}} presses a guitar string halfway along, can they explain why the note goes up an octave?",
  [],
  [("wv_superposition", "h", "Standing waves are a superposition pattern"),
   ("wv_wave_equation", "h", "Harmonic frequencies follow from v = fλ"),
   ("wv_resonance", "s", "Instruments resonate at their harmonic frequencies")])

T("wv_diffraction", C, D, "Diffraction", "15-17",
  "Describe diffraction as the spreading of waves through gaps and around obstacles, greatest when the gap is similar to the wavelength, and use it to explain why sound bends round doorways but light does not noticeably",
  ["Sketches wavefronts passing through narrow and wide gaps",
   "States the condition for maximum diffraction",
   "Explains why you can hear but not see round a corner"],
  "If {{name}} can hear someone talking in the next room but can't see them, can they use wavelengths to explain why?",
  ["HS-PS4-3"],
  [("wv_wave_diagrams", "h", "Diffraction is explained in terms of wavelength"),
   ("mt_PifbJOuXrG", "s", "Diffraction is a third wave behaviour after reflection and refraction")])

T("wv_polarisation", C, D, "Polarisation", "16-18",
  "Explain that transverse waves can be polarised to oscillate in one plane, that longitudinal waves cannot, and use this as evidence that light is transverse; describe uses such as polarising sunglasses",
  ["Explains why only transverse waves can be polarised",
   "Describes what happens when two polarising filters are rotated",
   "Explains how polarising sunglasses reduce glare"],
  "If {{name}} looks through two polarising filters and rotates one, can they explain why the view goes dark?",
  [],
  [("mt_LxK9OKZQZX", "h", "Requires the transverse/longitudinal distinction"),
   ("wv_em_properties", "h", "Applies to light as a transverse electromagnetic wave")])

# ---------------------------------------------------------------- light, reflection, refraction
T("wv_reflection_types", C, D, "Specular and diffuse reflection", "13-15",
  "Distinguish specular reflection from smooth surfaces (which forms images) from diffuse reflection from rough surfaces (which scatters light), applying the law of reflection at each point",
  ["Draws rays reflecting from a smooth and a rough surface",
   "Explains why paper reflects light but does not form an image",
   "Uses the law of reflection on an uneven surface"],
  "If {{name}} compares a mirror and a sheet of white paper, can they explain why only one shows their reflection even though both reflect light?",
  ["KS3.Sci.Phys.Waves.4"],
  [("mt_PifbJOuXrG", "h", "Applies the KS3 law of reflection"),
   ("mt_6w2g7aoPgz", "s", "Builds on how we see objects by reflected light")])

T("wv_refraction_wavefronts", C, D, "Explaining refraction with wavefronts", "14-16",
  "Explain refraction as a change in speed at a boundary that makes wavefronts change direction, bending towards the normal when the wave slows down, with no change of direction along the normal",
  ["Draws wavefronts bending as they enter a slower medium",
   "Predicts which way light bends entering and leaving a glass block",
   "Explains why there is no bending at 90° to the surface"],
  "If {{name}} shines a ray into a glass block at an angle, can they explain with wavefronts why it bends towards the normal?",
  ["HS-PS4-1"],
  [("mt_PifbJOuXrG", "h", "Builds on KS3 description of refraction"),
   ("wv_medium_speed", "h", "Refraction is caused by the change in wave speed")])

T("wv_snell", P, D, "Refractive index and Snell's law", "16-18",
  "Use refractive index n = c/v and Snell's law n₁ sin θ₁ = n₂ sin θ₂ to calculate angles of refraction and speeds of light in materials",
  ["Calculates the speed of light in glass from its refractive index",
   "Finds an angle of refraction using Snell's law",
   "Measures n for a glass block from ray data"],
  "If {{name}} measures a ray entering glass at 40° and leaving the surface at 25°, can they calculate the refractive index?",
  [],
  [("wv_refraction_wavefronts", "h", "Snell's law quantifies refraction"),
   ("mt_KB_Czd7RQH", "h", "The law uses sines of angles"),
   ("gt_trig_problems", "s", "Fluent use of inverse sine on a calculator is required")])

T("wv_tir", C, D, "Total internal reflection and optical fibres", "15-17",
  "Explain total internal reflection when light in a denser medium meets a boundary at more than the critical angle, and apply it to optical fibres and endoscopes",
  ["States both conditions for total internal reflection",
   "Draws the path of light along an optical fibre",
   "Explains why fibres carry signals with little loss"],
  "If {{name}} sees light trapped inside a curved glass fibre, can they explain why it doesn't escape through the sides?",
  ["HS-PS4-5"],
  [("wv_refraction_wavefronts", "h", "Total internal reflection is the limiting case of refraction")])

T("wv_lens_types", C, D, "Converging and diverging lenses", "14-16",
  "Describe how converging (convex) and diverging (concave) lenses refract parallel rays, define principal focus and focal length, and use lens symbols in diagrams",
  ["Draws parallel rays passing through each type of lens",
   "Marks the principal focus and focal length",
   "Explains why a diverging lens has a virtual focus"],
  "If {{name}} holds a magnifying glass in sunlight, can they explain where the bright spot forms and what that distance is called?",
  [],
  [("mt_FVERuBoCD1", "h", "Builds on KS3 ray diagrams with converging lenses"),
   ("mt_PifbJOuXrG", "h", "Lenses work by refraction")])

T("wv_magnification", P, D, "Magnification", "15-17",
  "Calculate magnification as image height ÷ object height (a ratio with no units), and relate it to the ray diagram",
  ["Calculates magnification from two heights",
   "Explains why magnification has no unit",
   "Finds an image height from the magnification"],
  "If {{name}} measures a 2 cm object producing a 7 cm image, can they find the magnification and explain what it means?",
  [],
  [("mt_FVERuBoCD1", "h", "Image and object heights are taken from a lens ray diagram"),
   ("wv_lens_types", "h", "Magnification depends on where the object sits relative to the focal point"),
   ("mt_yK51ZnKA8m", "h", "Magnification is a multiplicative ratio"),
   ("mt_y-BuQAfw4B", "s", "Images are enlargements of the object")])

T("wv_lens_equation", P, D, "The thin lens equation", "16-18",
  "Use 1/f = 1/u + 1/v (real-is-positive convention) to find image distances, and calculate lens power in dioptres (P = 1/f, with f in metres)",
  ["Finds the image distance for a given focal length and object distance",
   "Calculates the power of a lens in dioptres",
   "Checks an answer against a scale ray diagram"],
  "If {{name}} has a lens of focal length 10 cm and an object 15 cm away, can they calculate where the image forms?",
  [],
  [("wv_lens_types", "h", "The equation relates distances to the focal length"),
   ("mt_FVERuBoCD1", "h", "Extends ray-diagram image location to an algebraic model"),
   ("wv_magnification", "s", "Magnification can then be found as v/u"),
   ("mt_3qrCtdoVAU", "h", "Requires rearranging a formula"),
   ("al_algebraic_fractions", "s", "The equation combines reciprocals")])

T("wv_eye_camera", C, D, "The eye, cameras and correcting vision", "15-17",
  "Describe the eye and the camera as converging-lens systems that form real images, and explain how short and long sight are corrected with diverging and converging lenses",
  ["Labels the parts of the eye that focus light",
   "Explains short sight and its correction with a ray diagram",
   "Compares the eye with a camera"],
  "If {{name}} is told a friend can't read distant signs, can they explain what is going wrong in the eye and which lens fixes it?",
  [],
  [("wv_lens_types", "h", "Correction uses converging and diverging lenses"),
   ("mt_FVERuBoCD1", "h", "Image formation is explained with ray diagrams"),
   ("mt_6w2g7aoPgz", "s", "Builds on how light entering the eye lets us see")])

# ---------------------------------------------------------------- electromagnetic spectrum
T("wv_em_properties", C, D, "Shared properties of electromagnetic waves", "14-16",
  "State that all electromagnetic waves are transverse, travel at 3 × 10⁸ m/s in a vacuum, need no medium and transfer energy, differing only in wavelength and frequency",
  ["Lists the properties all EM waves share",
   "Explains how light from the Sun reaches Earth",
   "Orders EM waves by frequency and wavelength"],
  "If {{name}} is asked how radio waves and X-rays are alike, can they list what all electromagnetic waves have in common?",
  ["HS-PS4-1"],
  [("mt_XSp-S0wter", "h", "Builds on naming and ordering the spectrum"),
   ("wv_wave_equation", "h", "Same speed with different frequency means different wavelength")])

T("wv_em_calc", P, D, "Calculating with electromagnetic waves", "15-17",
  "Use v = fλ with the speed of light to calculate frequencies and wavelengths across the spectrum, working in standard form",
  ["Calculates the wavelength of a 100 MHz radio wave",
   "Finds the frequency of green light from its wavelength",
   "Uses prefixes such as nano- and mega- correctly"],
  "If {{name}} is told a radio station broadcasts at 98 MHz, can they calculate the wavelength?",
  ["HS-PS4-1"],
  [("wv_em_properties", "h", "Uses the speed of light shared by all EM waves"),
   ("al_sci_notation_ops", "h", "Values span many powers of ten")])

T("wv_em_uses", C, D, "Uses of the electromagnetic spectrum", "14-16",
  "Explain why each region of the spectrum suits its uses — radio for broadcasting, microwaves for satellites and cooking, infrared for heating and remote controls, visible light in fibres, UV for sterilising, X-rays and gamma for imaging and treatment",
  ["Matches each region to a use",
   "Explains a use in terms of a property such as penetration or absorption",
   "Explains why microwaves heat food"],
  "If {{name}} is asked why X-rays are used for broken bones, can they explain using what X-rays do to bone and to soft tissue?",
  ["KS3.Sci.Phys.Waves.1", "HS-PS4-5"],
  [("wv_em_properties", "h", "Uses depend on how each wavelength behaves"),
   ("mt_w5HzPpOUmj", "s", "Uses rely on absorption, transmission and reflection")])

T("wv_em_hazards", C, D, "Ionising and non-ionising radiation risks", "15-17",
  "Explain that higher-frequency EM radiation carries more energy, that UV, X-rays and gamma rays are ionising and can damage cells, and that lower-frequency radiation mainly causes heating",
  ["Separates ionising from non-ionising radiation",
   "Explains why UV can cause skin cancer",
   "Describes how radiographers limit exposure"],
  "If {{name}} is asked why sunscreen blocks UV but nobody worries about radio waves, can they explain the difference?",
  ["HS-PS4-4"],
  [("wv_em_uses", "h", "Hazards are weighed against the uses of each region"),
   ("nu_radiation_types", "s", "Ionisation was met with nuclear radiation")])

T("wv_radiation_claims", M, D, "Evaluating claims about electromagnetic radiation", "16-18",
  "Evaluate claims in media about health effects of EM radiation (mobile phones, Wi-Fi, sunbeds, X-rays), checking frequency, energy, dose, sources and evidence quality",
  ["Identifies the frequency band a claim is about",
   "Judges whether the evidence shows correlation or causation",
   "Checks a source for bias and data"],
  "If {{name}} reads a post claiming Wi-Fi causes cancer, can they judge the claim using what they know about frequency and evidence?",
  ["HS-PS4-4"],
  [("wv_em_hazards", "h", "Judging claims needs the physics of ionising radiation"),
   ("fm_correlation_causation", "s", "Many claims confuse correlation with causation"),
   ("mt_AstzvYDU2m", "s", "Builds on weighing evidence for and against ideas")])

T("wv_radio_aerials", C, D, "Producing and receiving radio waves", "16-18",
  "Explain that oscillating charges in an aerial (driven by an alternating current) emit radio waves, and that absorbed radio waves induce an alternating current of the same frequency in a receiving aerial",
  ["Explains how an alternating current produces radio waves",
   "Explains how a receiver aerial produces a signal",
   "Links the frequency of the current to the frequency of the wave"],
  "If {{name}} is asked how a radio picks up a station, can they explain what the radio wave does to electrons in the aerial?",
  ["HS-PS4-5"],
  [("wv_em_uses", "h", "Radio is one region of the spectrum"),
   ("el_ac_dc", "h", "Aerials are driven by alternating current")])

T("wv_black_body", C, D, "Emission, absorption and temperature", "16-18",
  "Explain that all objects emit and absorb infrared radiation, that hotter objects emit more and at shorter wavelengths, and that an object's temperature stays constant when it absorbs and emits at the same rate, applying this to Earth's temperature",
  ["Explains why a heated metal glows red then white",
   "Explains constant temperature as balanced emission and absorption",
   "Links the balance to Earth's average temperature"],
  "If {{name}} watches a stove ring heating up, can they explain why its colour changes and what happens when its temperature stops rising?",
  [],
  [("en_ir_surfaces", "h", "Builds on emission and absorption of infrared by surfaces"),
   ("wv_em_properties", "h", "Emitted radiation spans the EM spectrum"),
   ("mt_EQQWKz03P8", "s", "Connects to the greenhouse effect")])

T("wv_wave_particle", C, D, "Wave and particle models of light", "16-18",
  "Evaluate evidence that light behaves as a wave (diffraction, interference) and as particles called photons (photoelectric effect), and explain why scientists use whichever model fits a situation",
  ["Gives evidence for the wave model",
   "Describes the photoelectric effect qualitatively",
   "Explains why two models are kept rather than one"],
  "If {{name}} learns that, for some metals, dim blue light can knock electrons out but very bright red light can't, can they explain why this supports a particle model?",
  ["HS-PS4-3"],
  [("wv_diffraction", "h", "Diffraction is the key evidence for the wave model"),
   ("wv_em_properties", "h", "The models describe electromagnetic radiation"),
   ("at_model_history", "s", "Models changing with new evidence was met with the atom")])

T("wv_photon_energy", P, D, "Photon energy (E = hf)", "16-18",
  "Calculate photon energy with E = hf and E = hc/λ, and use it to explain why higher-frequency radiation is more damaging",
  ["Calculates the energy of a photon of given frequency",
   "Compares photon energies for UV and infrared",
   "Explains why photon energy, not brightness, decides ionisation"],
  "If {{name}} compares a UV photon and an infrared photon, can they calculate which carries more energy and by how much?",
  [],
  [("wv_wave_particle", "h", "Photons belong to the particle model"),
   ("wv_em_calc", "h", "Uses frequency and wavelength in standard form")])

# ---------------------------------------------------------------- signals and information
T("wv_analog_digital", C, D, "Analog and digital signals", "13-15",
  "Distinguish analog signals, which vary continuously, from digital signals, which take only a few discrete values (often 0 and 1), using examples such as vinyl records and streamed music",
  ["Sketches an analog and a digital signal",
   "Classifies everyday signals as analog or digital",
   "Explains what 'discrete values' means"],
  "If {{name}} compares a vinyl record and a music file, can they explain how the sound is stored differently?",
  ["MS-PS4-3"],
  [("mt_n5_Jt4ExUd", "h", "Builds on primary use of patterns and codes to send information"),
   ("wv_wave_diagrams", "h", "Signals are read as graphs of a quantity against time")])

T("wv_digital_reliability", C, D, "Why digital signals are more reliable", "14-16",
  "Explain that noise added during transmission can be removed from digital signals by regenerating clean pulses, whereas noise in analog signals is amplified with the signal",
  ["Shows on a sketch how noise affects each type of signal",
   "Explains regeneration of digital pulses",
   "Gives an advantage of digital broadcasting"],
  "If {{name}} hears crackle on an old analog radio but not on digital radio, can they explain the difference?",
  ["MS-PS4-3", "HS-PS4-2"],
  [("wv_analog_digital", "h", "Requires the analog/digital distinction")])

T("wv_sampling", P, D, "Sampling and bit depth", "15-17",
  "Describe how an analog signal is digitised by sampling at regular intervals and storing each sample as a binary number, and calculate how sample rate and bits per sample affect quality and file size",
  ["Digitises a simple waveform at a given sample rate",
   "Calculates the number of values available from n bits",
   "Estimates file size from sample rate, bit depth and duration"],
  "If {{name}} records 10 s of audio at 44 100 samples per second with 16 bits each, can they estimate the file size?",
  ["HS-PS4-2"],
  [("wv_analog_digital", "h", "Sampling converts analog to digital"),
   ("wv_period_frequency", "h", "Sample rate is a frequency"),
   ("mt_hCVPYlF-7Y", "s", "The number of levels is a power of 2")])

T("wv_digital_tradeoffs", M, D, "Pros and cons of digital storage and transmission", "15-17",
  "Evaluate the advantages of digital information (reliable storage, easy copying and sharing, compression) against drawbacks such as easy deletion, security risks and theft",
  ["Lists advantages of digital storage",
   "Explains a security risk of digital information",
   "Argues a position about storing family photos digitally"],
  "If {{name}} is deciding whether to keep only digital copies of family photos, can they weigh up the advantages and risks?",
  ["HS-PS4-2"],
  [("wv_digital_reliability", "h", "Evaluation builds on why digital is reliable")])

T("wv_communication_tech", C, D, "Carrying information with waves", "15-17",
  "Explain how communication systems choose wave types to carry information — radio and microwaves for wireless and satellite links, light in optical fibres — and how signals are encoded on a carrier wave",
  ["Explains why satellites use microwaves",
   "Compares copper cable, optical fibre and wireless links",
   "Describes encoding a signal on a carrier wave"],
  "If {{name}} is asked why internet cables under the sea use optical fibre, can they explain the advantages?",
  ["HS-PS4-5"],
  [("wv_em_uses", "h", "Choice of wave depends on its properties"),
   ("wv_digital_reliability", "h", "Most modern links are digital"),
   ("wv_tir", "s", "Optical fibres rely on total internal reflection")])

T("wv_doppler", C, D, "The Doppler effect", "16-18",
  "Explain that a moving source produces waves bunched up ahead (higher frequency) and stretched out behind (lower frequency), with examples from sirens and astronomy",
  ["Draws wavefronts from a moving source",
   "Explains the change in pitch of a passing siren",
   "Predicts the shift for a source moving away"],
  "If {{name}} hears an ambulance siren drop in pitch as it passes, can they explain with a wavefront drawing what's happening?",
  [],
  [("wv_wave_equation", "h", "Frequency and wavelength change while wave speed stays constant"),
   ("wv_period_frequency", "h", "The effect is a change in received frequency")])

T("wv_red_shift", C, D, "Red-shift and the expanding universe", "16-18",
  "Explain that light from distant galaxies is shifted to longer wavelengths, that more distant galaxies show greater red-shift, and how this supports the Big Bang model",
  ["Explains what red-shift means for spectral lines",
   "Describes the link between distance and red-shift",
   "Explains how red-shift supports an expanding universe"],
  "If {{name}} sees that a galaxy's spectral lines are shifted towards red, can they explain what it tells us about the galaxy's motion?",
  [],
  [("wv_doppler", "h", "Red-shift is the Doppler effect for light"),
   ("mt_rbY77m8_s1", "h", "Builds on astronomy using the EM spectrum")])

T("wv_inverse_square", C, D, "Intensity falls with distance", "16-18",
  "Explain that the intensity of light or sound from a point source falls with the inverse square of distance because the energy spreads over a larger area",
  ["Explains why doubling distance quarters intensity",
   "Calculates intensity at a new distance",
   "Links the law to the area of a sphere"],
  "If {{name}} moves twice as far from a lamp, can they predict how bright it will appear and explain why?",
  [],
  [("fm_power_laws", "h", "Uses the inverse-square relationship"),
   ("wv_amplitude_energy", "s", "Intensity measures energy carried"),
   ("mt_Pau0aqLNgp", "s", "Builds on sound fading with distance")])
