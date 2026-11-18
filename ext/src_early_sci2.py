"""Ages 2-7 (wave 7): more early-years and KS1 Science (EYFS Understanding the World, KS1 hygiene, electricity safety, fungi)."""

from dsl import T, C, P, R, L, M  # noqa: F401

SI, MM, FM, WL, WC = "Scientific Inquiry", "Matter & Materials", "Forces & Motion", "Waves, Light & Sound", "Weather & Climate"

# ---------------------------------------------------------------- wave 7: more Science for ages 2-7
# EYFS Understanding the World (The Natural World; Development Matters 3-4 and Reception) and KS1 Science wording.
from dsl import U  # noqa: E402
ES, HB, EH, EN = "Earth's Systems", "The Human Body", "Ecosystems & Habitats", "Energy"

T("ey_sand_water", P, MM, "Exploring sand and water", "2-3",
  "Pour, fill, dig and mould with sand and water, and notice that dry sand pours while wet sand sticks together and keeps a shape",
  ["Fills and empties containers with sand and with water",
   "Says that wet sand makes a castle but dry sand falls down",
   "Uses the words wet, dry, pour and full"],
  "At the sandpit, can {{name}} show you which sand makes a good castle and tell you why?",
  [], [("ey_senses", "s", "They feel the difference between wet and dry sand")])

T("ey_how_things_work", P, SI, "Exploring how things work", "3-4",
  "Explore how simple everyday things work (a wind-up toy, a torch switch, a tap, a zip, a peg) by trying them and talking about what each part does",
  ["Works a simple mechanism such as a peg or a wind-up toy",
   "Says what happens when a switch or button is pressed",
   "Asks how something works and tries it to find out"],
  "If you give {{name}} a torch, can they find out how to switch it on and tell you what the button does?",
  [], [("ey_wondering_why", "s", "Exploring how things work follows from asking how and why")])

T("ey_loud_quiet", P, WL, "Making loud and quiet sounds", "3-4",
  "Make sounds with voices, bodies and simple instruments, and change them to be loud or quiet, high or low, by how hard they hit, shake or blow",
  ["Plays a drum loudly and then quietly on request",
   "Uses the words loud and quiet to describe sounds",
   "Guesses which hidden instrument made a sound"],
  "If {{name}} has a drum, can they play it loudly and then very quietly, and tell you what they changed?",
  [], [("ey_senses", "h", "Making and comparing sounds uses the sense of hearing")])

T("ey_mixing", P, MM, "Mixing things together", "3-4",
  "Mix materials together (flour and water into dough, paint colours, sand and water, sugar in water) and talk about the differences and changes they notice",
  ["Mixes flour and water and describes the dough",
   "Mixes two paint colours and names the new colour",
   "Says what changed when two things were mixed"],
  "When {{name}} helps make dough, can they tell you how the flour changed when the water went in?",
  [], [("ey_materials_feel", "s", "They describe the mixture with texture words"),
       ("ey_noticing_changes", "h", "Mixing is about noticing how things change")])

T("ey_hot_cold", L, WC, "Hot, warm and cold", "3-4",
  "Feel and compare things that are hot, warm and cold (bath water, a drink, snow, the sunny and shady side of a wall) and know that very hot things can hurt",
  ["Uses the words hot, warm and cold correctly",
   "Sorts pictures into hot and cold things",
   "Says why we wait for hot food to cool down"],
  "If {{name}} touches a cold window and a warm radiator cover, can they tell you which is warmer?",
  [], [("ey_senses", "h", "Feeling temperature uses the sense of touch"),
       ("ey_weather", "s", "Hot and cold days are part of describing the weather")])

T("ey_magnets", P, FM, "Magnets pull some things", "4-5",
  "Play with magnets and find that they pull (attract) some things such as paper clips and fridge doors but not others such as wood, plastic or paper",
  ["Finds three things a magnet sticks to",
   "Finds three things a magnet does not stick to",
   "Uses the word pull or stick to describe the magnet"],
  "If {{name}} has a fridge magnet, can they find things in the kitchen it sticks to and things it doesn't?",
  [], [("ey_push_pull", "h", "A magnet is a pull they can feel"),
       ("ey_will_it_happen", "s", "They guess whether the magnet will stick before trying")])

T("ey_air", C, FM, "Air is all around us", "4-5",
  "Feel air moving (blowing bubbles, waving a scarf, flying a kite, feeling the wind) and know that air is all around us even though we cannot see it",
  ["Blows bubbles or a feather and says air moved it",
   "Says the wind is moving air",
   "Finds things the wind moves outside, such as leaves or washing"],
  "On a windy day, can {{name}} show you something the wind is moving and say what is pushing it?",
  [], [("ey_push_pull", "s", "Moving air pushes things"),
       ("ey_weather", "s", "Wind is a kind of weather they already name")])

T("ey_draw_observe", R, SI, "Drawing what I observe", "4-5",
  "Make observations of plants and animals outside and draw pictures of them, looking back at the real thing to add details such as legs, petals or colours",
  ["Draws a plant or minibeast while looking at it",
   "Adds a detail after looking again",
   "Talks about what their drawing shows"],
  "If {{name}} finds a snail in the garden, can they draw it and show you the shell and the feelers?",
  [], [("ey_noticing_changes", "h", "Drawing from life builds on looking closely")])

T("ey_other_places", C, ES, "Places different from where I live", "4-5",
  "Recognise some environments that are different from the one in which they live (a hot desert, a snowy Arctic, a rainforest, the seaside) and say what is the same and different",
  ["Names a place that is much hotter or colder than home",
   "Says one way a desert or the Arctic is different from home",
   "Matches an animal to a very different environment, such as a polar bear to the Arctic"],
  "If you show {{name}} a picture of the Arctic, can they tell you one way it is different from where you live?",
  [], [("ey_animal_homes", "s", "Matching animals to homes extends to whole environments"),
       ("ey_weather", "s", "Different places have very different weather")])

T("ks1_hygiene", C, HB, "Hygiene: washing away germs", "6-7",
  "Describe the importance of hygiene for humans: washing hands, brushing teeth and covering coughs stop germs spreading and keep us healthy",
  ["Explains why we wash hands before eating and after the toilet",
   "Says how often to brush teeth and why",
   "Says that germs are too small to see but can make us ill"],
  "Can {{name}} explain why they need to wash their hands before eating, even when their hands look clean?",
  [], [("mt_cxJRc15osy", "s", "Hygiene is the next part of looking after the body's needs"),
       ("ey_growing_body", "s", "Healthy habits start with eating, sleeping and moving")])

T("ks1_electric_safety", C, EN, "Using electricity safely", "6-7",
  "Know that many things at home use mains electricity or batteries, and the safety rules: never touch sockets, keep water away from electrical things, and ask an adult",
  ["Names things that plug in and things that use batteries",
   "States two rules for staying safe with electricity",
   "Spots a danger in a picture, such as a drink next to a socket"],
  "If {{name}} sees a hairdryer near a full sink, can they say why that is dangerous?",
  [], [("ey_how_things_work", "s", "Switches and batteries come up when exploring how things work"),
       ("mt_XbGfVhfiUz", "s", "Spotting the devices around them comes before knowing what powers them")])

T("ks1_fungi", C, EH, "Mould and mushrooms (fungi)", "5-7",
  "Know that mushrooms and mould are living things called fungi, not plants: they grow on old food, rotting wood and leaves, and help break dead things down",
  ["Says mould on old bread is alive",
   "Names a mushroom or toadstool as a fungus",
   "Says why we must not eat wild mushrooms"],
  "If {{name}} sees mould on an old piece of fruit, can they tell you whether it is living and how it got there?",
  [], [("mt_zexbopQjG0", "s", "Fungi test the idea of what counts as living"),
       ("ey_living_things", "s", "Sorting living from not living comes first")])

for _k, _id, _s, _r in [
    ("ey_sand_water", "mt_auVZZEuXjs", "s", "Wet and dry sand are early material properties to describe"),
    ("ey_how_things_work", "mt_hi8cVycbwn", "s", "Sketching how a shape helps an object work builds on exploring how things work"),
    ("ey_loud_quiet", "mt_VBl1T1sFCM", "s", "Making loud and quiet sounds comes before learning that vibrations make sound"),
    ("ey_mixing", "mt_auVZZEuXjs", "s", "Talking about changes when mixing builds the vocabulary of material properties"),
    ("ey_hot_cold", "mt_PrWc-HZzDl", "s", "Thermometers measure the hot and cold children already feel"),
    ("ey_magnets", "mt_9NvuqZKNiV", "s", "Magnetic materials builds on finding what a magnet sticks to"),
    ("ey_air", "mt_j7cj9eWN7w", "s", "Learning what wind is builds on feeling moving air"),
    ("ey_draw_observe", "mt_ZFwPZaDJ0_", "s", "Recording data with drawings builds on drawing from observation"),
    ("ey_other_places", "mt_aO018DkCun", "s", "Comparing the Arctic and Antarctic builds on noticing environments unlike home"),
]:
    U(_k, _id, _s, _r)
