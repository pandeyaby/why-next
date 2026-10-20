"""Science archetypes, part 2: waves, electricity, energy, forces, inquiry, living things, Earth and space."""
from items import num, mc, V
from arch_math import A
from arch_sci import lesson_vis
def eco(prey, pred, food):
    return V("ecolab", f"Change the birth and death rates. Can {prey.lower()} and {pred.lower()} both survive?", prey=prey, pred=pred, food=food)
ECO_KID = ["Animals need food to live.", "If there is less food, fewer animals survive."]
ECO_ADULT = ["In a food chain energy passes from producers (plants) to consumers; predator and prey numbers rise and fall together.", "If one population changes, the others that depend on it change too."]
ECO_WORK = ("What happens if the foxes disappear?", ["Fewer foxes means fewer rabbits are eaten.", "Rabbit numbers grow until grass runs short.", "Then rabbits starve and their numbers fall again."])
ECO_P = [num("A food chain passes on about 1/10 of the energy at each step. Plants store {=k*1000} J. How much reaches the rabbits?", "k*100", "Divide by 10.", "{=k*1000} ÷ 10 = {=k*100} J.", {"k": [1, 9]}),
         num("There are {a} rabbits and each fox eats {b} a month. How many rabbits do {c} foxes eat in a month?", "b*c", "Foxes × rabbits each.", "{c} × {b} = {=b*c} rabbits.", {"a": [50, 200], "b": [2, 6], "c": [2, 8]})]
ECO_M = [num("A pond has {a} frogs. {b} are eaten by herons. How many are left?", "a-b", "Subtract.", "{a} − {b} = {=a-b} frogs.", {"a": [30, 90], "b": [5, 25]}),
         num("Plants store {=k*100} J. How much energy reaches the animals that eat them (1/10)?", "k*10", "Divide by 10.", "{=k*100} ÷ 10 = {=k*10} J.", {"k": [1, 9]}),
         mc("In 'grass → rabbit → fox', what is the producer?", ["Grass", "Rabbit", "Fox"], "It makes its own food.", "Grass uses sunlight to make food.")]
def ecoA(name, dom, kw, prey, pred, food):
    return A(name, dom, kw, eco(prey, pred, food), ECO_KID, ECO_ADULT, ECO_WORK, ECO_P, ECO_M)
SCI2 = [
A("waves", r"Waves|Light|Sound", r"",
  V("wavelab", "Change the amplitude, frequency and speed. Match the faint target wave.", a=1.5, f=1, v=4, target=[1, 2]),
  ["Sound and light travel as waves.", "Big waves are loud or bright. Fast wiggles are high notes."],
  ["A wave carries energy but not matter. Its amplitude is its height. Its frequency is how many waves pass each second.", "Wave speed = frequency × wavelength. At a fixed speed, a higher frequency means a shorter wavelength."],
  ("A wave of 4 Hz travels at 2 m/s", ["Use wavelength = speed ÷ frequency.", "2 ÷ 4 = 0.5.", "Each wave is 0.5 m long."]),
  [num("A wave has frequency {f} Hz and wavelength {l} m. What is its speed in m/s?", "f*l", "Speed = f × λ.", "{f} × {l} = {=f*l} m/s.", {"f": [2, 20], "l": [1, 10]}),
   num("Sound travels {=v*t} m in {t} s. What is its speed?", "v", "Distance ÷ time.", "{=v*t} ÷ {t} = {=v} m/s.", {"v": [300, 350], "t": [2, 5]}, "v%10==0")],
  [num("A wave travels at {v} m/s with frequency {f} Hz. What is its wavelength in m?", "v/f", "λ = v ÷ f.", "{v} ÷ {f} = {=v/f} m.", {"v": [10, 60], "f": [2, 5]}, "v%f==0"),
   num("You see lightning and hear thunder {t} s later. Sound travels 340 m/s. How far away was it in m?", "340*t", "Distance = speed × time.", "340 × {t} = {=340*t} m.", {"t": [1, 9]}),
   mc("Which change makes a sound louder?", ["Bigger amplitude", "Higher frequency", "Shorter wavelength"], "Height of the wave.", "Bigger amplitude means louder.")]),
A("electricity", r"Electric|Energy", r"electric|circuit|bulb|battery|switch|current|voltage|resist|conductor|insulator|mains|wire",
  lesson_vis("61"),
  ["Electricity flows round a circuit.", "The circuit must be a full loop for the bulb to light."],
  ["Current flows round a complete circuit; conductors such as metals let it through and insulators such as plastic block it.", "Voltage pushes the current and resistance opposes it: V = I × R."],
  ("Current through a 6 Ω resistor on 12 V", ["Use V = I × R, so I = V ÷ R.", "12 ÷ 6 = 2.", "The current is 2 A."]),
  [num("V = I × R. If I = {i} A and R = {r} Ω, what is V in volts?", "i*r", "Multiply.", "{i} × {r} = {=i*r} V.", {"i": [1, 6], "r": [2, 12]}),
   num("A {=i*r} V battery drives current through {r} Ω. What is the current in A?", "i", "I = V ÷ R.", "{=i*r} ÷ {r} = {=i} A.", {"i": [1, 6], "r": [2, 10]})],
  [num("Power = V × I. A {v} V device uses {i} A. What is its power in watts?", "v*i", "Multiply.", "{v} × {i} = {=v*i} W.", {"v": [3, 12], "i": [1, 5]}),
   num("Two resistors of {a} Ω and {b} Ω are in series. What is the total resistance?", "a+b", "Add in series.", "{a} + {b} = {=a+b} Ω.", {"a": [1, 20], "b": [1, 20]}),
   mc("Which material lets electricity flow?", ["Copper", "Rubber", "Wood"], "Metals conduct.", "Copper is a metal conductor.")]),
A("forces", r"Forces|Energy|Space", r"force|motion|speed|velocity|accelerat|friction|newton|momentum|gravity|weight|mass|work done|kinetic|orbit",
  V("forcelab", "Set the push, mass and friction. Make the cart stop in the green zone.", f=20, m=5, mu=0.2, zone=[15, 18]),
  ["A push or a pull is a force.", "A bigger push makes things speed up more."],
  ["An unbalanced force changes motion: acceleration = force ÷ mass (F = ma).", "Friction acts against motion, so a moving object slows down and stops unless something keeps pushing it."],
  ("A 20 N push on a 5 kg cart, no friction", ["Use a = F ÷ m.", "20 ÷ 5 = 4.", "The cart speeds up by 4 m/s every second."]),
  [num("A force of {=m*a} N acts on a {m} kg mass. What is the acceleration in m/s²?", "a", "a = F ÷ m.", "{=m*a} ÷ {m} = {=a} m/s².", {"m": [2, 10], "a": [1, 8]}),
   num("A car goes {=s*t} m in {t} s. What is its average speed in m/s?", "s", "Distance ÷ time.", "{=s*t} ÷ {t} = {=s} m/s.", {"s": [5, 30], "t": [2, 10]})],
  [num("What force accelerates a {m} kg trolley at {a} m/s²?", "m*a", "F = m × a.", "{m} × {a} = {=m*a} N.", {"m": [2, 20], "a": [1, 5]}),
   num("A {m} kg bag on Earth (g = 10 N/kg). What is its weight in N?", "10*m", "Weight = mass × g.", "{m} × 10 = {=10*m} N.", {"m": [1, 30]}),
   mc("A ball rolls on grass and stops. What stopped it?", ["Friction", "Gravity pulling it forward", "Nothing"], "A force against the motion.", "Friction between the ball and grass slows it.")]),
A("energy", r"Energy", r"",
  V("forcelab", "A bigger push transfers more energy to the cart. How far does it go?", f=30, m=5, mu=0.2, zone=[15, 18]),
  ["Energy makes things happen.", "It moves from one place to another, but it is never used up."],
  ["Energy can be stored in many ways: in moving things, in things lifted up, in food and fuel, and in hot things.", "Energy is never used up. But some is wasted as heat. Efficiency = useful energy out ÷ total energy in."],
  ("A kettle uses 2000 J to give 1600 J to the water", ["Useful output is 1600 J.", "Efficiency = 1600 ÷ 2000 = 0.8.", "So the kettle is 80% efficient; 400 J is wasted heat."]),
  [num("A {p} W lamp is on for {t} s. How much energy does it transfer in J?", "p*t", "Energy = power × time.", "{p} × {t} = {=p*t} J.", {"p": [5, 100], "t": [2, 60]}, "p%5==0"),
   num("A machine gets {=10*k} J and gives out {=10*j} J usefully. What is its efficiency in %?", "100*j/k", "Useful ÷ total × 100.", "{=10*j} ÷ {=10*k} × 100 = {=100*j/k}%.", {"k": [10, 20], "j": [1, 9]}, "(100*j)%k==0")],
  [num("Kinetic energy = ½ × m × v². What is it for m = {m} kg, v = {v} m/s?", "m*v*v/2", "Square v first.", "½ × {m} × {v}² = {=m*v*v/2} J.", {"m": [2, 10], "v": [1, 6]}, "(m*v*v)%2==0"),
   num("Gravitational energy = m × g × h with g = 10. What is it for {m} kg lifted {h} m?", "m*10*h", "Multiply all three.", "{m} × 10 × {h} = {=m*10*h} J.", {"m": [1, 10], "h": [1, 9]}),
   mc("What happens to the energy wasted by a light bulb?", ["It heats the surroundings", "It disappears", "It turns into mass"], "Energy is never destroyed.", "Wasted energy spreads out as heat.")]),
A("inquiry", r"Scientific Inquiry", r"",
  V("statlab", "These are repeat measurements. Drag one to make it an outlier: watch the mean and median.", vals=[12, 13, 13, 14, 15, 16, 17], max=30, target=15),
  ["Scientists test ideas with fair tests.", "They repeat a test to check it."],
  ["A fair test changes one variable, measures another, and keeps everything else the same.", "Repeat each measurement and take the mean. Odd results, called outliers, should be checked and repeated."],
  ("Does the ball bounce higher on carpet or wood?", ["Change only the floor surface.", "Drop the same ball from the same height each time.", "Repeat 3 times and compare the mean bounce heights."]),
  [num("Three repeat readings are {a}, {b} and {c} cm. What is the mean?", "(a+b+c)/3", "Add, then ÷ 3.", "({a} + {b} + {c}) ÷ 3 = {=(a+b+c)/3} cm.", {"a": [10, 20], "b": [10, 20], "c": [10, 20]}, "(a+b+c)%3==0"),
   num("Readings: {a}, {b}, {=a+30}. Which reading is the outlier? Give its value.", "a+30", "One is far from the rest.", "{=a+30} is far from the others: it is the outlier.", {"a": [10, 20], "b": [10, 20]})],
  [num("The range of results is {a} to {b}. What is the spread (range)?", "b-a", "Biggest − smallest.", "{b} − {a} = {=b-a}.", {"a": [5, 20], "b": [21, 40]}),
   num("Each test takes {t} minutes and you repeat it {n} times. How long altogether?", "t*n", "Multiply.", "{t} × {n} = {=t*n} minutes.", {"t": [2, 15], "n": [3, 5]}),
   mc("In a fair test of plant growth and light, what must you keep the same?", ["The amount of water", "The amount of light", "Nothing"], "Change only one thing.", "Light is changed, so water must stay the same.")]),
ecoA("ocean", r"Ocean|Polar", r"", "Fish", "Seals", "plankton"),
ecoA("rainforest", r"Rainforest|Insects", r"", "Insects", "Frogs", "leaves"),
ecoA("ecosystems", r"Ecosystems|Animals|Organisms|Dinosaurs", r"food|predator|prey|habitat|adapt|ecosystem|population|chain|web|consumer|producer|extinct|surviv|compet",
     "Rabbits", "Foxes", "grass"),
]
