"""Dedicated archetypes: scientific inquiry and electromagnetism/charge."""
from items import mc, num, V
from arch_sci3 import D, Q
INQ = [
D("investigate", r"Scientific Inquiry|Inquiry", r"",
  V("statlab", "These are repeat measurements from one test. Drag a value to make an outlier and watch the mean and median.", vals=[12, 13, 13, 14, 15, 16, 17], max=30, target=14),
  ["Scientists ask questions and test them.", "A fair test changes one thing."],
  ["In a fair test you change one thing and measure another. Everything else stays the same.", "Repeat each measurement to make results reliable. Two things changing together does not prove one causes the other."],
  ("Does the height of a ramp change how far a car rolls?", ["Question: does ramp height change the distance?", "Change only the ramp height (independent variable).", "Measure the distance (dependent variable) three times for each height.", "Keep the same car, surface and release (control variables), then look at the pattern."]),
  [Q("In a fair test, how many variables do you change?", "One", "All of them", "None", "Change one variable and keep the others the same."),
   Q("Why repeat a measurement?", "To make the results more reliable", "To make the test unfair", "To change the question", "Repeats help you spot mistakes and outliers."),
   Q("What is an observation?", "Something you notice using your senses or instruments", "A guess about the future", "An opinion", "Observations are what you actually see or measure; interpretation explains them."),
   Q("Ice cream sales and sunburn both rise in summer. What does this show?", "A correlation, not proof that one causes the other", "Ice cream causes sunburn", "Sunburn causes ice cream", "Both are caused by hot sunny weather."),
   Q("What should a conclusion be based on?", "The evidence from the results", "What you hoped would happen", "A friend's opinion", "Conclusions must be supported by data."),
   Q("Which is the best way to show how a plant grows over 10 days?", "A line graph", "A pie chart", "A list of names", "Line graphs show change over time.")]),
D("electromag", r"Electric|Force|Energy", r"induc|transformer|motor|generator|dynamo|alternator|static|charge|electric field|capacitor|grid|mains|fuse|plug|loudspeaker|microphone|solar cell",
  V("sorter", "Sort each device: does it turn electricity into movement, movement into electricity, or change voltage?", bins=["Electricity → movement", "Movement → electricity", "Changes voltage"], items=[["Electric motor", 0], ["Loudspeaker", 0], ["Fan", 0], ["Dynamo", 1], ["Wind turbine generator", 1], ["Microphone", 1], ["Phone charger transformer", 2], ["Substation transformer", 2]]),
  ["Electricity is moving charge.", "It can make things move and light up."],
  ["Moving a magnet near a wire makes a voltage. Generators and transformers use this.", "A wire carrying a current in a magnetic field feels a force. That force turns motors.", "Rubbing can move electrons from one material to another. This builds up static charge."],
  ("How a transformer steps voltage down", ["Alternating current in the primary coil makes a changing magnetic field in the iron core.", "The changing field induces a voltage in the secondary coil.", "Fewer turns on the secondary coil means a lower voltage: Vs/Vp = Ns/Np."]),
  [Q("Which device turns movement into electricity?", "A generator", "A motor", "A bulb", "Generators use induction to make a current."),
   Q("What do transformers change?", "The voltage of an alternating current", "Light into sound", "Direct current into heat only", "Transformers step voltage up or down."),
   Q("Why does a balloon stick to a wall after rubbing it on hair?", "It has gained static charge", "It is magnetic", "It is sticky", "Rubbing moves electrons, leaving the balloon charged."),
   Q("What does a fuse do?", "Melts and breaks the circuit if the current is too big", "Makes the current bigger", "Stores charge", "Fuses protect against too much current."),
   Q("Why does the National Grid transmit at high voltage?", "Less energy is wasted as heat in the cables", "It is safer at home", "It makes the cables shorter", "A higher voltage means a lower current and smaller heating losses."),
   Q("What makes a motor turn?", "The force on a current-carrying wire in a magnetic field", "Static charge", "Light", "This is the motor effect.")]),
]
