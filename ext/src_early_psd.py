"""Ages 2-4 (wave 6): early-years Personal & Social Development."""

from dsl import T, C, P, R, L, M

SI, OL, MM, FM, WL, WC = "Scientific Inquiry", "Organisms & Life Processes", "Matter & Materials", "Forces & Motion", "Waves, Light & Sound", "Weather & Climate"
EM, SRR, FC, ESA, SA, RDM = "Emotional Literacy", "Self-Regulation & Resilience", "Friendship & Cooperation", "Empathy & Social Awareness", "Self-Awareness", "Responsible Decision-Making"
LL = "Learning to Learn"
CC, GE, ME, MT = "Counting & Cardinality", "Geometry", "Measurement", "Mathematical Thinking"

# ---------------------------------------------------------------- Personal & Social Development, ages 2-4
T("ey_feeling_words", L, EM, "Happy, sad, angry and scared", "2-3",
  "Name four basic feelings, point to faces in books that show them, and begin to say 'I feel sad' instead of only crying or shouting",
  ["Names happy, sad, angry and scared on picture faces",
   "Uses a feeling word about themselves",
   "Pulls a happy, sad or cross face on request"],
  "When {{name}} reads a picture book with you, can they point to a character who looks sad and say what that feeling is called?",
  [], [])

T("ey_feelings_body", C, EM, "Feelings in my body", "3-4",
  "Notice where feelings show up in the body (hot cheeks when angry, a wobbly tummy when worried, a big smile when happy) and say what might have caused them",
  ["Points to where they feel a feeling",
   "Says what made them feel that way",
   "Notices that feelings change and go away"],
  "After {{name}} gets cross about a broken tower, can they tell you where they felt it in their body and what made them feel that way?",
  [], [("ey_feeling_words", "h", "They need the feeling words before linking them to body signals")])

T("ey_calm_down", P, SRR, "Calming down with big breaths", "3-4",
  "Use a simple calming strategy when upset — slow 'smell the flower, blow out the candle' breaths, a cuddle, a quiet corner, squeezing a soft toy — with a grown-up's help",
  ["Does three slow breaths when reminded",
   "Chooses a calm-down activity they like",
   "Calms enough to say what is wrong"],
  "When {{name}} is very upset, can they take some 'flower and candle' breaths with you and then tell you what's wrong?",
  [], [("ey_feelings_body", "h", "Noticing the feeling in their body tells them it is time to calm down")])

T("ey_waiting", P, SRR, "Waiting for my turn", "3-4",
  "Wait a short time for something they want (a turn on the slide, a snack, a grown-up to finish speaking) using a strategy such as counting, singing or watching a timer",
  ["Waits for a short turn without grabbing",
   "Uses counting or a song to help them wait",
   "Says 'my turn next' instead of pushing in"],
  "At the playground, can {{name}} wait in line for the slide, perhaps counting or singing while they wait?",
  [], [("ey_calm_down", "s", "Waiting is easier when they can calm the strong feeling of wanting")])

T("ey_try_again", M, SRR, "Trying again after a tumble", "4-5",
  "Keep going when something is hard or goes wrong (a puzzle piece won't fit, they fall off a scooter) by having another go or asking for help instead of giving up",
  ["Has another go after a first try fails",
   "Says 'I can't do it yet' or asks for help",
   "Shows pride after succeeding at something tricky"],
  "When {{name}}'s tower falls down, do they build it again, perhaps a different way, rather than walking off?",
  [], [("ey_calm_down", "h", "Calming the frustrated feeling comes before having another go")])

T("ey_play_together", P, FC, "Playing alongside and together", "2-3",
  "Move from playing next to other children to playing with them: copying, passing toys, joining a simple game such as chase or building together",
  ["Plays happily near other children",
   "Passes or swaps a toy with another child",
   "Joins a simple game with one other child"],
  "At a playgroup, does {{name}} start playing with another child, such as passing bricks to build one tower?",
  [], [])

T("ey_sharing_turns", P, FC, "Sharing and taking turns", "3-4",
  "Share toys and take turns in simple games, understanding that everyone gets a go and that the toy comes back",
  ["Takes turns in a simple game with a grown-up's help",
   "Offers a toy to another child",
   "Uses 'my turn' and 'your turn'"],
  "When playing a game with a friend, can {{name}} take turns rolling the dice and say whose turn it is?",
  [], [("ey_play_together", "h", "Sharing grows out of playing with other children"),
       ("ey_waiting", "h", "Taking turns means waiting while someone else has a go")])

T("ey_joining_in", P, FC, "Asking to join in", "4-5",
  "Join a group's play by watching first, then asking 'Can I play?' or offering an idea, and cope if the answer is 'not now'",
  ["Asks to join a game using words",
   "Suggests a role or idea in pretend play",
   "Finds something else to do if told 'not now'"],
  "If {{name}} sees children playing shops, can they ask to join in and suggest a part they could play?",
  [], [("ey_sharing_turns", "h", "Joining a game means being ready to share and take turns in it")])

T("ey_sorry", P, FC, "Saying sorry and making up", "4-5",
  "After hurting or upsetting someone, say sorry and do something to help put it right (fetch a tissue, give the toy back, rebuild the tower)",
  ["Says sorry with a grown-up's prompt",
   "Does something to help put it right",
   "Can play happily together again after a falling-out"],
  "If {{name}} knocks down a friend's sandcastle by accident, can they say sorry and offer to help rebuild it?",
  [], [("ey_noticing_upset", "h", "They say sorry once they notice the other child is upset")])

T("ey_noticing_upset", C, ESA, "Noticing when someone is upset", "3-4",
  "Notice when another child or adult looks sad or hurt (crying, frowning, a quiet face) and do something kind such as bringing a toy or telling a grown-up",
  ["Points out when someone looks sad",
   "Offers comfort, a toy or a hug",
   "Tells a grown-up when a friend is hurt"],
  "When another child at nursery is crying, does {{name}} notice and try to help or fetch a grown-up?",
  [], [("ey_feeling_words", "h", "Spotting sadness in others uses the same feeling words they use for themselves")])

T("ey_gentle_hands", P, ESA, "Being gentle with people, animals and plants", "3-4",
  "Use gentle hands and kind words with others, stroke pets softly, and look after plants and minibeasts instead of squashing or pulling them",
  ["Strokes a pet gently when shown how",
   "Puts a minibeast back where they found it",
   "Uses kind words such as please and thank you"],
  "When {{name}} meets a friend's cat, can they stroke it gently and stop if the cat walks away?",
  [], [("ey_noticing_upset", "s", "Being gentle comes from noticing how others feel")])

T("ey_all_about_me", L, SA, "All about me and my family", "2-3",
  "Say their name and age, name the people in their family or home, and talk about what makes them special",
  ["Says their first name and how old they are",
   "Names people who live with them or look after them",
   "Shares one thing that is special about them"],
  "Can {{name}} tell a new friend their name and age and who lives in their home?",
  [], [])

T("ey_i_can", M, SA, "Things I like and things I can do", "3-4",
  "Talk about their likes and dislikes and things they can do by themselves (put on shoes, pour a drink), and notice that friends may like different things",
  ["Names favourite toys, foods or games",
   "Shows something they can do by themselves",
   "Says 'I like... but my friend likes...'"],
  "Can {{name}} tell you one thing they can now do all by themselves and one thing they want to learn?",
  [], [("ey_all_about_me", "h", "Talking about likes and skills builds on knowing who they are")])

T("ey_safety_rules", C, RDM, "Rules that keep us safe", "3-4",
  "Follow simple safety rules (hold hands near roads, walk inside, hot things can burn) and say why each rule matters",
  ["Holds hands near a road without reminding",
   "Says why we walk, not run, indoors",
   "Knows to stay away from hot ovens and kettles"],
  "When you walk to the shops, can {{name}} tell you why they hold your hand by the road?",
  [], [])

T("ey_helping", P, RDM, "Tidying up and helping out", "3-4",
  "Help with simple jobs (tidy toys, set out cups, feed a pet) and understand that helping makes things better for everyone",
  ["Tidies toys away when asked",
   "Offers to help with a simple job",
   "Says why tidying matters, such as 'so no one trips'"],
  "When it's tidy-up time, does {{name}} help put toys back where they belong?",
  [], [("ey_safety_rules", "s", "Tidying away toys is one way of keeping everyone safe")])

T("ey_tell_grownup", C, RDM, "Telling a grown-up when something feels wrong", "4-5",
  "Know which trusted grown-ups they can tell when they feel worried, hurt, lost or uncomfortable, and that it is always OK to say no and tell",
  ["Names two trusted grown-ups",
   "Says what to do if they get lost in a shop",
   "Knows that they can say 'no' and tell a grown-up if something feels wrong"],
  "Can {{name}} tell you who they would go to if they felt worried or got lost, and what they would say?",
  [], [("ey_safety_rules", "h", "Telling a grown-up is a safety rule"),
       ("ey_feelings_body", "s", "A worried feeling in their body is a sign to tell someone")])
