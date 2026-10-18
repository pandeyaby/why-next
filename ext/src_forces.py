from dsl import T, C, P, R, L, M
D = "Forces & Motion"

T("mo_scalar_vector", C, D, "Scalars and vectors", "13-15",
  "Distinguish scalar quantities (magnitude only: distance, speed, mass, energy) from vector quantities (magnitude and direction: displacement, velocity, force, acceleration), and represent vectors as arrows",
  ["Classifies quantities as scalar or vector",
   "Explains the difference between distance and displacement",
   "Draws vectors to scale with arrows"],
  "If {{name}} runs one full lap of a 400 m track, can they explain why their distance is 400 m but their displacement is zero?",
  ["N-VM.1"],
  [("mt_AiWlJfvC3O", "h", "Forces as vectors with magnitude and direction are introduced at KS3"),
   ("mt_q-1a86ydgU", "h", "Speed, met with distance–time graphs, is the scalar that velocity extends by adding direction")])

T("mo_velocity", C, D, "Displacement and velocity", "14-15",
  "Use displacement and velocity as signed quantities in one dimension, choosing a positive direction, and calculate average velocity as displacement ÷ time",
  ["Chooses a positive direction and uses negative values for the opposite way",
   "Calculates average velocity for a journey that turns back",
   "Explains how velocity can change while speed stays constant"],
  "If {{name}} walks 30 m east then 10 m west in 20 s, can they work out their average speed and their average velocity?",
  [],
  [("mo_scalar_vector", "h", "Displacement and velocity are signed because they are vectors with a direction"),
   ("mt_9QzSnn8m80", "h", "Opposite directions are represented by positive and negative numbers")])

T("mo_acceleration", C, D, "Acceleration", "14-16",
  "Define acceleration as the rate of change of velocity (a = Δv/t, in m/s²), including deceleration as negative acceleration, and calculate it from data",
  ["Calculates acceleration from change in velocity and time",
   "Explains what 2 m/s² means in words",
   "Interprets negative acceleration"],
  "If {{name}} is told a car goes from 0 to 20 m/s in 5 seconds, can they work out its acceleration and explain what the number means?",
  ["HS-PS2-1"],
  [("mo_velocity", "h", "Acceleration is the change in velocity per second, so velocity must be understood as signed"),
   ("mt_kLQOzZYrd5", "h", "Acceleration is measured in m/s², a compound unit meaning metres per second every second")])

T("mo_vt_graphs", R, D, "Velocity–time graphs", "14-16",
  "Draw and interpret velocity–time graphs, using the gradient to find acceleration and the area under the graph to find displacement",
  ["Identifies constant velocity, acceleration and deceleration sections",
   "Calculates acceleration from the gradient",
   "Calculates distance travelled from the area under the graph"],
  "If {{name}} sees a velocity–time graph of a train leaving a station, can they find its acceleration and how far it travelled in the first 20 seconds?",
  ["HS-PS2-1"],
  [("mo_acceleration", "h", "The gradient of a velocity–time graph is read as the acceleration, Δv/t"),
   ("mt_OUv-QXmW7_", "h", "Reading distance–time graphs carries over, with the new rule that area gives displacement"),
   ("mt_WBdHkc2HTf", "s", "Finding acceleration means calculating the gradient of a straight-line section of the graph")])

T("mo_instantaneous_speed", P, D, "Instantaneous speed from curved graphs", "15-17",
  "Find the speed at a particular instant from a curved distance–time graph by drawing a tangent and calculating its gradient, distinguishing it from average speed",
  ["Draws a tangent to a curve at a point",
   "Calculates the gradient of the tangent",
   "Explains the difference between instantaneous and average speed"],
  "If {{name}} has a curved distance–time graph for a sprinter, can they find how fast the sprinter was going exactly 3 seconds in?",
  [],
  [("mt_q-1a86ydgU", "h", "Speed as the gradient of a distance–time graph is extended to curves by drawing a tangent"),
   ("fm_avg_rate", "h", "Instantaneous rate is the limit of average rates over shrinking intervals")])

T("mo_suvat", P, D, "Equations of uniformly accelerated motion", "15-17",
  "Use the equations of motion for constant acceleration (v = u + at, s = ut + ½at², v² = u² + 2as, s = ½(u + v)t), choosing the right one and rearranging to find unknowns",
  ["Lists known and unknown quantities before choosing an equation",
   "Solves a problem using v² = u² + 2as",
   "Checks the answer for sign and size"],
  "If {{name}} is told a car accelerates from 10 m/s at 2 m/s² for 5 s, can they find its final speed and how far it travelled?",
  ["HS-PS2-1"],
  [("mo_acceleration", "h", "The four equations hold only when acceleration is constant, so its meaning must be secure"),
   ("al_formula_powers", "h", "Solving for unknowns requires rearranging formulas with squares"),
   ("mo_vt_graphs", "s", "The equations can be derived from the area under a v–t graph")])

T("mo_free_fall", C, D, "Free fall", "14-16",
  "Explain that without air resistance all objects near Earth's surface fall with the same acceleration (g ≈ 9.8 m/s²), regardless of mass, and calculate speeds of falling objects",
  ["States that a hammer and feather fall together in a vacuum",
   "Explains why heavier objects don't fall faster, using F = ma",
   "Calculates the speed of a falling object after a given time"],
  "If {{name}} drops a bowling ball and a tennis ball from the same height, can they predict which lands first and explain why?",
  ["HS-PS2-1"],
  [("mt_AvrQauS_zX", "h", "The primary idea that unsupported objects fall is made precise as acceleration g ≈ 9.8 m/s²"),
   ("mo_acceleration", "h", "Free fall is uniform acceleration, so speeds are found from v = gt"),
   ("mt_sUVeVXzRuq", "h", "Weight = mg explains why acceleration is independent of mass")])

T("mo_free_body", R, D, "Free-body diagrams", "13-15",
  "Draw free-body diagrams for a single object showing every force acting on it as a labelled arrow from the object, with lengths showing relative size, and use them to find the resultant force",
  ["Draws all forces on a single object (weight, normal, friction, tension, drag)",
   "Labels each force with its type",
   "Uses arrow lengths to show balanced or unbalanced forces"],
  "If {{name}} draws a book resting on a table, can they show every force on the book and explain why it doesn't move?",
  ["KS3.Sci.Phys.MotionAndForces.4"],
  [("mt_k7GOtslF-x", "h", "Force diagrams are refined into free-body diagrams with every force on one object only"),
   ("mt_AiWlJfvC3O", "h", "The forces on a free-body diagram are combined to find the resultant force")])

T("mo_net_force", P, D, "Calculating net force", "13-15",
  "Calculate the net (resultant) force on an object in one dimension by adding forces with signs for direction, and predict whether the object speeds up, slows down or keeps a constant velocity",
  ["Calculates the resultant of opposing forces",
   "Uses positive and negative signs for direction",
   "Predicts the motion from the net force"],
  "If {{name}} sees a 500 N driving force and 350 N of drag on a car, can they work out the net force and say what happens to the car's speed?",
  ["MS-PS2-2"],
  [("mo_free_body", "h", "The net force is found by adding the forces drawn on the free-body diagram"),
   ("mt_9QzSnn8m80", "h", "Forces in opposite directions are added using positive and negative numbers"),
   ("mt_3WMADSy0mA", "s", "Primary balanced and unbalanced forces are made numerical as a net force of zero or not")])

T("mo_inertia", C, D, "Inertia and mass", "13-15",
  "Explain inertia as an object's tendency to resist changes in its motion, with mass as its measure, and use it to explain seatbelts, headrests and why heavy objects are hard to start and stop",
  ["Defines inertia",
   "Explains why a passenger lurches forward when a bus brakes",
   "Explains why more massive objects need bigger forces to change motion"],
  "If {{name}} pulls a tablecloth quickly from under some plates, can they explain why the plates stay put?",
  ["MS-PS2-2"],
  [("mt_tXxxCFl32J", "h", "Inertia is the idea behind Newton's first law: an object keeps its motion unless a net force acts")])

T("mo_f_ma_problems", P, D, "Applying F = ma", "14-16",
  "Use F = ma with the net force to solve multi-step problems — finding acceleration from several forces, or the force needed for a given acceleration — and link to the equations of motion",
  ["Calculates acceleration from net force and mass",
   "Finds the driving force needed against friction for a given acceleration",
   "Combines F = ma with a = Δv/t"],
  "If {{name}} is told a 1200 kg car has a 3000 N engine force and 600 N of resistance, can they work out its acceleration?",
  ["HS-PS2-1"],
  [("mt_tXxxCFl32J", "h", "The KS3 statement of F = ma is used here in multi-step problems"),
   ("mo_net_force", "h", "The F in F = ma is the net force, found by combining all the forces with their signs"),
   ("mo_acceleration", "h", "The acceleration found from F = ma is linked to changes in velocity by a = Δv/t")])

T("mo_newton2_data", P, D, "Newton's second law from data", "15-17",
  "Analyse data from experiments (e.g. trolleys pulled by different forces) to show that acceleration is proportional to net force and inversely proportional to mass",
  ["Plots acceleration against force and identifies a straight line through the origin",
   "Explains why a vs 1/m gives a straight line",
   "Identifies sources of error in the experiment"],
  "If {{name}} is given a table of forces and accelerations for a trolley, can they plot a graph and explain what it shows about Newton's second law?",
  ["HS-PS2-1"],
  [("mo_f_ma_problems", "h", "Knowing F = ma tells students to look for a ∝ F at fixed mass and a ∝ 1/m at fixed force"),
   ("fm_line_fit", "h", "A straight line through the origin on a graph of a against F shows proportionality"),
   ("fm_inverse_variation", "s", "Acceleration falling as mass rises is inverse proportion, a ∝ 1/m")])

T("mo_terminal_velocity", C, D, "Terminal velocity", "15-17",
  "Explain how drag increases with speed until it balances weight so a falling object reaches terminal velocity, and interpret velocity–time graphs for a skydiver",
  ["Describes forces on a skydiver at each stage",
   "Explains why acceleration decreases as drag grows",
   "Interprets the v–t graph of a skydiver opening a parachute"],
  "If {{name}} sees a skydiver's speed graph level off, can they explain what is happening to the forces?",
  ["HS-PS2-1"],
  [("mo_free_fall", "h", "Terminal velocity changes free fall by adding a drag force that grows with speed"),
   ("mt_Y9k86G8BBT", "h", "Primary work on air resistance slowing falling objects is the drag force used here"),
   ("mo_f_ma_problems", "h", "The falling acceleration shrinks because the net force, weight minus drag, shrinks")])

T("mo_friction", C, D, "Friction and normal force", "15-17",
  "Model friction as depending on the normal force and the surfaces, distinguish static friction (up to a maximum) from kinetic friction, and use F ≤ μN in simple problems",
  ["Explains what the normal force is",
   "Distinguishes static and kinetic friction",
   "Calculates maximum friction from μ and N"],
  "If {{name}} pushes a heavy box that won't move at first, then suddenly slides, can they explain what is happening to the friction force?",
  [],
  [("mo_free_body", "h", "Friction and the normal force are drawn as arrows on a free-body diagram before calculating"),
   ("mt_-p_xp4hMvh", "s", "Primary observations that rough surfaces grip more are modelled with a friction coefficient")])

T("mo_momentum", C, D, "Momentum", "14-16",
  "Define momentum as mass × velocity (p = mv, in kg m/s), recognise it as a vector, and compare the momentum of different objects",
  ["Calculates momentum with correct units",
   "Explains why a slow truck can have more momentum than a fast bike",
   "Uses sign to show direction of momentum"],
  "If {{name}} compares a 2000 kg truck at 5 m/s with a 70 kg cyclist at 10 m/s, can they work out which has more momentum?",
  ["HS-PS2-2"],
  [("mo_velocity", "h", "Momentum is mass times velocity, so it has a direction and can be negative"),
   ("mt_tXxxCFl32J", "s", "Newton's laws link momentum to force, since a net force changes an object's motion")])

T("mo_momentum_conservation", P, D, "Conservation of momentum in collisions", "15-17",
  "Use conservation of momentum (total momentum before = after when no external force acts) to calculate velocities after collisions in one dimension",
  ["States the conservation of momentum principle",
   "Calculates the velocity after two objects stick together",
   "Explains conservation using Newton's third law"],
  "If {{name}} sees a moving trolley hit and stick to a stationary one of equal mass, can they predict the speed afterwards?",
  ["HS-PS2-2", "MS-PS2-1"],
  [("mo_momentum", "h", "Conservation sums the momentum of every object before and after the collision"),
   ("mt_fbYbe3YSVj", "h", "Equal and opposite third-law forces during a collision explain why momentum is conserved"),
   ("mt_1MLi55bPnt", "s", "Primary predictions about what happens when things collide are made quantitative"),
   ("mt_QhFEDyIwSO", "s", "The unknown velocity after the collision is found by solving a linear equation")])

T("mo_recoil", P, D, "Recoil and explosions", "15-17",
  "Apply conservation of momentum to explosions and recoil, where total momentum before is zero, to explain rockets, recoiling guns and jumping off a boat",
  ["Explains why total momentum after an explosion is zero",
   "Calculates a recoil velocity",
   "Explains how a rocket accelerates in space"],
  "If {{name}} jumps forward off a small rowing boat, can they explain why the boat moves backwards and estimate how fast?",
  ["HS-PS2-2"],
  [("mo_momentum_conservation", "h", "Recoil is conservation of momentum with zero total momentum before the explosion")])

T("mo_impulse", C, D, "Impulse and force over time", "15-17",
  "Relate force to change in momentum (FΔt = Δp, so F = Δp/Δt), and explain why increasing collision time reduces force",
  ["Uses F = Δp/Δt to calculate an average force",
   "Explains why airbags and crumple zones reduce injury",
   "Explains why you bend your knees when landing"],
  "If {{name}} is asked why it hurts less to land on a crash mat than on concrete, can they explain using momentum and time?",
  ["HS-PS2-3"],
  [("mo_momentum", "h", "Impulse is defined as the change in momentum, Δp = mv − mu, so momentum must be calculated first"),
   ("mo_f_ma_problems", "h", "F = Δp/Δt is F = ma rewritten by substituting a = Δv/Δt and multiplying by the mass")])

T("mo_collision_safety", P, D, "Designing to reduce collision forces", "15-18",
  "Design, evaluate and refine a device that minimises the force on an object during a collision (e.g. egg-drop protector, helmet, crumple zone), using impulse reasoning and test data",
  ["Uses impulse ideas to justify design choices",
   "Tests designs and records results",
   "Refines the design based on evidence"],
  "If {{name}} designs a package to protect an egg dropped from a height, can they explain the physics of why their design works?",
  ["HS-PS2-3"],
  [("mo_impulse", "h", "Crumple zones and helmets work by increasing the collision time, which lowers the force")])

T("mo_elastic_inelastic", C, D, "Elastic and inelastic collisions", "16-18",
  "Distinguish elastic collisions (kinetic energy conserved) from inelastic ones (kinetic energy transferred to other stores), noting that momentum is conserved in both",
  ["Checks whether kinetic energy is conserved in a collision",
   "Explains where kinetic energy goes in an inelastic collision",
   "States that momentum is conserved in both types"],
  "If {{name}} works out the kinetic energy before and after two trolleys stick together, can they explain why it went down even though momentum stayed the same?",
  ["HS-PS2-2"],
  [("mo_momentum_conservation", "h", "Momentum is conserved in both kinds of collision; only kinetic energy separates them"),
   ("en_ke_calc", "h", "Comparing kinetic energy before and after requires calculating it")])

T("mo_vectors_resolve", P, D, "Adding and resolving vectors", "15-17",
  "Add perpendicular vectors using Pythagoras' theorem and trigonometry, and resolve a force or velocity into horizontal and vertical components",
  ["Finds the resultant of two perpendicular forces",
   "Resolves a force at an angle into components",
   "Solves a boat-crossing-a-river velocity problem"],
  "If {{name}} swims across a river at 2 m/s while the current flows at 1 m/s, can they find their actual speed and direction?",
  ["N-VM.3", "N-VM.4a"],
  [("mo_scalar_vector", "h", "Only vector quantities such as force and velocity are added by direction or resolved"),
   ("mt_KB_Czd7RQH", "h", "Resolving and combining vectors uses right-angled trigonometry")])

T("mo_slopes", P, D, "Forces on a slope", "16-18",
  "Resolve weight into components parallel and perpendicular to an inclined plane, and calculate the acceleration of an object sliding down a slope with or without friction",
  ["Resolves weight on a slope into two components",
   "Calculates acceleration down a frictionless slope",
   "Includes friction in a slope calculation"],
  "If {{name}} is told a box sits on a 30° ramp, can they work out the part of its weight pulling it down the slope?",
  ["HS-PS2-1"],
  [("mo_vectors_resolve", "h", "Weight is resolved into components parallel and perpendicular to the slope"),
   ("mo_f_ma_problems", "h", "The acceleration down the slope comes from the net force along it divided by the mass"),
   ("mo_friction", "s", "On a rough slope, friction acts up the slope and reduces the net force")])

T("mo_projectiles", P, D, "Projectile motion", "16-18",
  "Analyse projectile motion by treating horizontal motion (constant velocity) and vertical motion (constant acceleration g) independently, and calculate range, time of flight and maximum height",
  ["Explains why horizontal and vertical motion are independent",
   "Calculates time of flight for a horizontally launched object",
   "Calculates the range of a projectile"],
  "If {{name}} rolls a ball off a 1.25 m high table at 2 m/s, can they work out how far from the table it lands?",
  [],
  [("mo_suvat", "h", "The vertical motion is constant acceleration g, so it is solved with the suvat equations"),
   ("mo_vectors_resolve", "h", "The launch velocity is resolved into horizontal and vertical components"),
   ("al_quad_function", "s", "Height as a function of time, or of horizontal distance, is a parabola")])

T("mo_circular", C, D, "Circular motion", "16-18",
  "Explain that an object moving in a circle at constant speed is accelerating towards the centre because its velocity direction changes, requiring a centripetal force supplied by tension, friction or gravity",
  ["Explains why constant speed in a circle still means acceleration",
   "Identifies the force providing the centripetal force in examples",
   "Predicts the path if the centripetal force is removed"],
  "If {{name}} whirls a ball on a string and the string snaps, can they predict which way the ball flies and explain why?",
  [],
  [("mo_vectors_resolve", "h", "Constant speed in a circle still means a changing velocity, because its direction changes"),
   ("mt_1nl396BaVa", "s", "Orbits are the familiar example of circular motion under gravity"),
   ("mo_f_ma_problems", "h", "An acceleration towards the centre needs a net force towards the centre, by F = ma")])

T("mo_gravitation", P, D, "Newton's law of gravitation", "16-18",
  "Use Newton's law of universal gravitation F = Gm₁m₂/r² to describe and predict the gravitational force between two objects, including the inverse-square effect of distance",
  ["Calculates the gravitational force between two masses",
   "Predicts the effect of doubling the distance",
   "Explains why g is smaller on the Moon"],
  "If {{name}} is told a satellite moves to twice its distance from Earth's centre, can they predict how the gravitational force changes?",
  ["HS-PS2-4"],
  [("mt_oLjz18CxDg", "h", "The KS3 idea that all masses attract is made quantitative with F = Gm₁m₂/r²"),
   ("fm_power_laws", "h", "Gravity is an inverse-square law, so doubling the distance quarters the force"),
   ("al_sci_notation_ops", "h", "G = 6.67 × 10⁻¹¹ and planetary masses are handled in scientific notation")])

T("mo_coulomb", P, D, "Coulomb's law", "16-18",
  "Use Coulomb's law F = kq₁q₂/r² to describe and predict the electrostatic force between two charged objects, comparing its form with gravitation",
  ["Calculates the force between two charges",
   "Predicts attraction or repulsion from the signs",
   "Compares the structure of Coulomb's law with gravitation"],
  "If {{name}} halves the distance between two charged balloons, can they predict how the force between them changes?",
  ["HS-PS2-4"],
  [("mt_2_YoprauaJ", "h", "Static charge, with like charges repelling and unlike attracting, is the force measured here"),
   ("fm_power_laws", "h", "Coulomb's law is an inverse-square law, so the force falls with the square of the separation"),
   ("mo_gravitation", "s", "Comparing F = kq₁q₂/r² with F = Gm₁m₂/r² highlights the shared inverse-square form")])

T("mo_fields", C, D, "Fields and forces at a distance", "15-17",
  "Explain non-contact forces using fields — gravitational, electric and magnetic — drawing field-line diagrams and describing field strength and direction",
  ["Draws field lines around a magnet, a charge and a planet",
   "Explains what closer field lines mean",
   "Explains how a field transfers a force without contact"],
  "If {{name}} sees iron filings around a bar magnet, can they explain what the pattern tells them about the magnetic field?",
  ["HS-PS2-4", "HS-PS3-5"],
  [("mt_56aspHjU19", "h", "KS3 magnetic field lines around a bar magnet are the model for gravitational and electric fields"),
   ("mt_lcf8lx-LkZ", "s", "The primary distinction between contact and non-contact forces is explained using fields")])

T("mo_current_field", R, D, "Magnetic field patterns of wires and solenoids", "15-17",
  "Map and draw the magnetic field patterns produced by a current in a straight wire (concentric circles) and in a solenoid (like a bar magnet), use the right-hand grip rule to find field direction, and plan an investigation showing that reversing the current reverses the field",
  ["Describes the field pattern around a straight wire",
   "Explains how a solenoid's field is strengthened",
   "Uses the right-hand grip rule to find field direction"],
  "If {{name}} places a compass next to a wire and switches on the current, can they explain why the needle moves?",
  ["HS-PS2-5"],
  [("mt_2qkn8Lhc8e", "h", "KS3 electromagnets are explained by the field pattern of a current-carrying solenoid"),
   ("mo_fields", "h", "The field around a wire or solenoid is drawn with field lines showing strength and direction")])

T("mo_hooke_graph", P, D, "Force–extension graphs and spring constant", "14-16",
  "Investigate Hooke's law (F = ke), plot force–extension graphs, find the spring constant from the gradient and identify the limit of proportionality",
  ["Plots force against extension",
   "Calculates the spring constant from the gradient",
   "Identifies where the graph stops being linear"],
  "If {{name}} hangs weights on a spring and records its extension, can they find the spring constant from a graph?",
  [],
  [("mt_vuNjYx3qOy", "h", "KS3 Hooke's law is investigated with force–extension graphs and a spring constant"),
   ("fm_direct_variation", "h", "F = ke is direct proportion, so the spring constant is the gradient of the straight line")])

T("mo_liquid_pressure", P, D, "Calculating pressure in liquids (p = ρgh)", "14-16",
  "Explain that pressure in a liquid increases with depth and density (p = ρgh), and use it to explain dams, diving and upthrust",
  ["Calculates pressure at a given depth",
   "Explains why dams are thicker at the bottom",
   "Explains upthrust as a pressure difference"],
  "If {{name}} dives to the bottom of a swimming pool and feels their ears hurt, can they explain why pressure is greater there?",
  [],
  [("mt_fkwcCB5px7", "h", "The KS3 idea that liquid pressure increases with depth is made quantitative with p = ρgh"),
   ("pm_density", "h", "The ρ in p = ρgh is the liquid's density, so denser liquids give greater pressure")])

T("mo_stopping_distance", C, D, "Stopping distances", "14-16",
  "Explain stopping distance as thinking distance plus braking distance, and how speed, reaction time, road conditions and vehicle condition affect each",
  ["Distinguishes thinking and braking distance",
   "Lists factors affecting each",
   "Explains why braking distance increases more than speed"],
  "If {{name}} is told a driver is tired and the road is wet, can they explain which part of the stopping distance each one affects?",
  [],
  [("mo_acceleration", "h", "Braking distance depends on the deceleration a car can achieve"),
   ("en_ke_qualitative", "s", "Braking distance grows with kinetic energy, which grows with speed squared")])
