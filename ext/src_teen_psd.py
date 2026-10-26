"""Ages 14-18 (wave 6): secondary Personal & Social Development."""

from dsl import T, C, P, R, L, M

RC, WCO, SL, VO, ET = "Reading Comprehension", "Writing Composition", "Speaking & Listening", "Vocabulary", "English Thinking"
LL = "Learning to Learn"
EM, SRR, FC, ESA, SA, RDM = "Emotional Literacy", "Self-Regulation & Resilience", "Friendship & Cooperation", "Empathy & Social Awareness", "Self-Awareness", "Responsible Decision-Making"

# ---------------------------------------------------------------- Personal & Social Development, ages 14-16
T("tn_healthy_relationships", C, FC, "Healthy and unhealthy relationships", "14-16",
  "Recognise features of healthy friendships and relationships (respect, trust, boundaries, kindness) and warning signs of unhealthy ones (control, pressure, jealousy), and know where to get help",
  ["Lists signs of a healthy relationship",
   "Identifies controlling behaviour in a scenario",
   "Names trusted adults and services to go to"],
  "Reading a story about a controlling friendship, can {{name}} spot the warning signs and say what the person could do?",
  [], [("mt_NCrbQe0LdB", "h", "Healthy relationships rely on honest conversations and repair"),
       ("mt_rqLMfiw61L", "s", "Setting boundaries needs assertive communication")])

T("tn_exam_stress", P, SRR, "Coping with exam stress", "14-16",
  "Recognise signs of stress during exam periods and use helpful coping strategies (planning, sleep, exercise, talking, breathing) instead of avoidance",
  ["Names physical and emotional signs of stress",
   "Uses two coping strategies that work for them",
   "Knows when stress is too much and who to talk to"],
  "When exams are close, can {{name}} name what stress feels like for them and the strategies that help?",
  [], [("mt_0VOZSVjo6c", "h", "Exam stress applies understanding of good and bad stress"),
       ("mt_Jd2aWEUJ9G", "h", "It uses their personal coping toolkit")])

T("tn_sleep_screens", C, SRR, "Sleep, screens and wellbeing", "14-15",
  "Understand why teenagers need 8-10 hours of sleep, how late screens and caffeine affect it, and build habits that protect sleep and mood",
  ["Explains the teenage body-clock shift",
   "Describes how screens affect sleep",
   "Sets a realistic wind-down routine"],
  "Can {{name}} explain why their body wants to sleep later as a teenager and one change that would improve their sleep?",
  [], [("mt_0ewYhTSHtP", "h", "Changing sleep routines draws on habits and motivation")])

T("tn_friend_help", P, ESA, "Supporting a friend who is struggling", "14-16",
  "Notice signs a friend may be struggling with their mental health, listen without judging, encourage them to get help, and know when a worry must be shared with a trusted adult",
  ["Names signs a friend may be struggling",
   "Practises supportive listening",
   "Knows that safety worries must be shared even if asked to keep a secret"],
  "If a friend seems withdrawn for weeks, does {{name}} know how to check in, listen and encourage them to talk to an adult?",
  [], [("mt_VA126P6Wp5", "h", "Supporting a friend uses empathy rather than sympathy"),
       ("mt_mydcMoa8gN", "s", "Noticing signs needs emotional intelligence")])

T("tn_digital_footprint", C, RDM, "Digital footprint and reputation", "14-15",
  "Understand that what they post can last and be shared, consider privacy settings, think about future readers (employers, colleges) and respond to online pressure",
  ["Explains what a digital footprint is",
   "Reviews and adjusts privacy settings",
   "Decides whether a post is wise to share"],
  "Before posting a photo, can {{name}} think about who might see it in five years and change their privacy settings?",
  [], [("mt_WtO50EZQkf", "h", "This builds on online identity and misinformation")])

T("tn_budgeting", P, RDM, "Money basics: budgeting and saving", "14-16",
  "Make a simple budget, distinguish needs and wants, save towards a goal and compare prices and deals, including spotting in-app purchase traps",
  ["Writes a monthly budget for income and spending",
   "Separates needs from wants",
   "Plans savings for a goal"],
  "With a part-time income of £60 a month, can {{name}} plan a budget that saves for something they want?",
  [], [("mt_cJjnPjuvCU", "h", "Saving for a goal applies personal goal-setting")])

T("tn_disagreeing", P, FC, "Disagreeing respectfully", "14-16",
  "Disagree with someone's views respectfully — listening, steelmanning their point, using evidence and staying calm — online and face to face",
  ["Summarises an opposing view fairly",
   "Disagrees without personal attacks",
   "Stays calm in a heated discussion"],
  "In a debate about a controversial topic, can {{name}} state the other side's best argument before giving their own view?",
  [], [("mt_NCrbQe0LdB", "h", "Respectful disagreement builds on honest conversations"),
       ("mt_cOknxrYhwL", "s", "Steelmanning needs awareness of your own biases")])

T("tn_values", M, SA, "Values and identity", "14-16",
  "Identify personal values (honesty, fairness, family, achievement), reflect on where they come from, and use them to guide choices when under pressure",
  ["Names three personal values",
   "Explains a choice that reflects a value",
   "Recognises when peers' values differ"],
  "Can {{name}} name what matters most to them and give an example of a decision guided by it?",
  [], [("mt_p-8Hlf6_9k", "h", "Values are part of identity and belonging"),
       ("mt_bkMDDstwwG", "s", "Reflecting on values draws on personal growth over time")])

T("tn_body_image", C, EM, "Media, body image and self-esteem", "14-15",
  "Understand how edited images, filters and social-media comparison affect body image and self-esteem, and practise healthier ways of thinking about appearance",
  ["Explains how images are edited and filtered",
   "Describes how comparison affects mood",
   "Names one way to protect self-esteem online"],
  "When {{name}} sees an influencer's photo, can they explain how it might have been edited and how comparing themselves could affect them?",
  [], [("mt_p-8Hlf6_9k", "h", "Body image is closely tied to adolescent identity"),
       ("mt_WtO50EZQkf", "s", "Builds on understanding how online content can mislead")])

# ---------------------------------------------------------------- Personal & Social Development, ages 16-18
T("tn_consent", C, FC, "Consent and respect", "16-18",
  "Understand consent as freely given, informed, specific and reversible in all kinds of relationships and situations, including online sharing, and know the law and where to get help",
  ["Explains the features of consent",
   "Identifies when consent cannot be given",
   "Knows where to report concerns or get support"],
  "Can {{name}} explain why consent must be freely given and can be withdrawn at any time, including for sharing images?",
  [], [("tn_healthy_relationships", "h", "Consent is central to healthy relationships")])

T("tn_mental_health", P, EM, "Looking after your mental health", "16-18",
  "Recognise common mental-health difficulties such as anxiety and low mood, know the difference between everyday ups and downs and needing support, and know how to access help",
  ["Describes signs of anxiety and depression",
   "Names daily habits that support mental health",
   "Knows how to contact a GP, counsellor or helpline"],
  "Does {{name}} know the signs that low mood has become something to get help for, and how to get that help?",
  [], [("tn_exam_stress", "h", "Coping with stress is one part of mental health"),
       ("tn_friend_help", "s", "Supporting others uses the same signs and routes to help")])

T("tn_career_choices", M, RDM, "Choosing your next steps", "16-18",
  "Research options after school (university, apprenticeships, jobs, gap years), weigh pros and cons against their values and strengths, and make an informed plan",
  ["Compares two post-school routes",
   "Matches options to their strengths and values",
   "Writes an action plan with deadlines"],
  "Can {{name}} compare university and an apprenticeship for a career they're interested in and explain which suits them better?",
  [], [("tn_values", "h", "Choices should match personal values"),
       ("mt_cJjnPjuvCU", "s", "A next-steps plan applies goal-setting")])

T("tn_work_rights", C, RDM, "Rights and responsibilities at work", "16-18",
  "Know basic rights at work (minimum wage, breaks, health and safety, contracts, payslips) and responsibilities (punctuality, reliability), and what to do if treated unfairly",
  ["Reads a payslip and explains deductions",
   "Names three employment rights",
   "Knows where to get advice about a work problem"],
  "If {{name}} starts a part-time job, can they read their payslip and say what to do if they don't get their breaks?",
  [], [("mt_h_shhH-6DC", "h", "Workplace rights extend community rights and responsibilities"),
       ("tn_budgeting", "s", "Reading a payslip connects to budgeting")])

T("tn_credit_debt", P, RDM, "Credit, debt and interest", "16-18",
  "Understand how credit cards, loans, overdrafts, buy-now-pay-later and student finance work, compare interest rates (APR), and avoid debt traps",
  ["Explains APR and compound interest on debt",
   "Compares two credit offers",
   "Identifies risks of buy-now-pay-later"],
  "Can {{name}} explain why paying only the minimum on a credit card costs much more in the end?",
  [], [("tn_budgeting", "h", "Managing debt builds on budgeting"),
       ("mt_JiZ3H90Xg8", "s", "Debt decisions involve risk and cognitive bias")])

T("tn_civic", C, ESA, "Voting and civic participation", "16-18",
  "Understand how to register and vote, how laws are made, and other ways to take part (campaigning, volunteering, petitions), evaluating sources of political information",
  ["Explains how to register to vote",
   "Describes how a law is made",
   "Evaluates a political claim using reliable sources"],
  "Does {{name}} know how to register to vote and how to check whether a political claim is true?",
  [], [("mt_5XLhiqmocP", "h", "Civic participation builds on global citizenship"),
       ("mt_WtO50EZQkf", "s", "Checking political claims uses misinformation skills")])

T("tn_teamwork", P, FC, "Teamwork and conflict in groups", "16-18",
  "Work in teams at college or work: agree roles, communicate clearly, handle free-riding and conflict, and give credit fairly",
  ["Agrees roles and deadlines in a team",
   "Raises a problem with a teammate constructively",
   "Reflects on their own contribution"],
  "In a group project where someone isn't contributing, can {{name}} raise it fairly and help the team move forward?",
  [], [("mt_8StiXnYq1u", "h", "Teamwork builds on leadership styles and influence"),
       ("tn_disagreeing", "h", "Handling conflict needs respectful disagreement")])

T("tn_transitions", M, SRR, "Handling big transitions", "16-18",
  "Prepare for and cope with major transitions (leaving school, moving away, starting work or university): anticipate challenges, build support networks and look after themselves",
  ["Names challenges of a coming transition",
   "Plans how to build a support network",
   "Describes how they handled a past change"],
  "Thinking about leaving school, can {{name}} name what might be hard and how they'll find support?",
  [], [("mt__J2BO4V95l", "h", "Transitions draw on growth through adversity"),
       ("tn_mental_health", "s", "Looking after mental health helps through change")])

T("tn_independent_living", P, RDM, "Living independently", "16-18",
  "Develop practical skills for living independently: cooking simple meals, managing bills and rent, registering with a doctor, and keeping safe in a new place",
  ["Plans and cooks a week of simple meals on a budget",
   "Explains what bills a tenant pays",
   "Knows how to register with a doctor"],
  "Could {{name}} plan a week's food shop and meals on a student budget?",
  [], [("tn_budgeting", "h", "Living independently means sticking to a budget"),
       ("tn_transitions", "s", "Independent living is part of a big transition")])
