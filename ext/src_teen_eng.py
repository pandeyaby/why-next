"""Ages 14-18 (wave 6): secondary English, carrying v1 English (which stops at 13-14) through GCSE and A level."""

from dsl import T, C, P, R, L, M

RC, WCO, SL, VO, ET = "Reading Comprehension", "Writing Composition", "Speaking & Listening", "Vocabulary", "English Thinking"
LL = "Learning to Learn"
EM, SRR, FC, ESA, SA, RDM = "Emotional Literacy", "Self-Regulation & Resilience", "Friendship & Cooperation", "Empathy & Social Awareness", "Self-Awareness", "Responsible Decision-Making"

# ---------------------------------------------------------------- English, ages 14-16
T("tn_unseen_poetry", P, RC, "Analysing an unseen poem", "14-16",
  "Read a poem for the first time and build an interpretation under time pressure: work out speaker, situation and tone, then analyse how imagery, form, structure and sound create meaning",
  ["Summarises what a poem is about in one or two sentences after a first read",
   "Picks out three choices of language, form or structure and explains their effect",
   "Writes a short response that links methods to an overall interpretation"],
  "Given a short poem they have never seen, can {{name}} say what it is about and explain how two of the poet's choices shape the mood?",
  [], [("mt_aClzPBiS9k", "h", "Analysing form needs the names and conventions of poetic forms"),
       ("mt_DVSHx3YMkN", "h", "Interpreting imagery relies on recognising figurative language and devices")])

T("tn_compare_poems", P, RC, "Comparing poems", "14-16",
  "Compare two poems on a shared theme (conflict, love, place, power), discussing similarities and differences in ideas, methods and context in an integrated way",
  ["Identifies a shared theme and a key difference in attitude",
   "Writes comparative paragraphs using connectives such as whereas and similarly",
   "Compares methods, not only content"],
  "If {{name}} reads two war poems from different centuries, can they explain how the poets' attitudes differ and how their methods show it?",
  [], [("tn_unseen_poetry", "h", "Each poem must be analysed before the two can be compared"),
       ("mt_1GF5MeNZPA", "h", "Comparing poems applies critical comparison across texts")])

T("tn_shakespeare", C, RC, "Reading Shakespeare in context", "14-16",
  "Read a Shakespeare play in depth, following plot, character and theme through Early Modern English, and connect ideas to Elizabethan and Jacobean beliefs about kingship, gender, fate and order",
  ["Paraphrases a key speech in modern English",
   "Traces how a character changes across the play",
   "Links a theme to a belief of Shakespeare's time"],
  "Can {{name}} explain what Macbeth means in a famous speech and how audiences in 1606 might have reacted to a king being murdered?",
  [], [("mt_tIi6L1n7kF", "h", "Shakespeare's plays are drama written for performance"),
       ("mt_Hqz5y_tWz2", "h", "Following a play needs secure ideas of plot structure and character development")])

T("tn_19c_fiction", C, RC, "Reading nineteenth-century fiction", "14-16",
  "Read a Victorian or Romantic novel or novella (e.g. A Christmas Carol, Jekyll and Hyde, Frankenstein), tackling long sentences and unfamiliar vocabulary, and relate themes to the society that produced it",
  ["Reads and summarises a dense nineteenth-century paragraph",
   "Explains how the writer presents a social issue such as poverty or science",
   "Uses context to support, not replace, analysis"],
  "After reading A Christmas Carol, can {{name}} explain what Dickens wanted his readers to think about poverty and how Scrooge's change shows it?",
  [], [("mt_9k1qcpvVi_", "h", "Older fiction needs stamina built through wide independent reading"),
       ("mt_wGxq92Na5g", "h", "Relating the novel to its society depends on tracing theme across a text")])

T("tn_rhetoric", C, RC, "Rhetoric in non-fiction: ethos, pathos, logos", "14-16",
  "Analyse how writers and speakers persuade through credibility, emotion and reasoning, and identify techniques such as rhetorical questions, anecdote, statistics, triads and direct address",
  ["Labels examples of ethos, pathos and logos in a speech or article",
   "Explains how one technique affects a specific audience",
   "Judges which appeal is most persuasive and why"],
  "Reading a charity appeal, can {{name}} pick out where it appeals to emotion and where it uses facts, and say which is more effective?",
  [], [("mt_gMSFymQlrW", "h", "Rhetorical analysis builds on evaluating arguments in non-fiction"),
       ("mt_jIcgbCmziD", "h", "Persuasive effect depends on purpose, audience and context")])

T("tn_thesis", P, WCO, "Writing an argument with a clear thesis", "14-16",
  "Write an analytical or argumentative essay controlled by a clear thesis statement, with topic sentences that each advance it and a conclusion that does more than repeat",
  ["Writes a thesis that takes a debatable position",
   "Writes topic sentences that link back to the thesis",
   "Writes a conclusion that answers 'so what?'"],
  "If {{name}} is asked whether a character is a hero or villain, can they write a one-sentence thesis and plan three paragraphs that prove it?",
  [], [("mt_Qxyikkkzam", "h", "An argumentative thesis extends persuasive writing skills"),
       ("mt_av-uRBrhwT", "h", "A controlled essay needs planning and revising")])

T("tn_embedding_quotes", P, WCO, "Embedding and analysing quotations", "14-16",
  "Embed short quotations smoothly into their own sentences, then zoom in on individual words to analyse connotations and effect rather than just paraphrasing",
  ["Embeds a two- to four-word quotation in a grammatical sentence",
   "Zooms in on one word and explains its connotations",
   "Avoids long quotations followed by 'this shows'"],
  "Can {{name}} write a sentence that weaves in a short quotation and then explain what one word in it suggests?",
  [], [("mt_dmFnJzxKwz", "h", "Embedding quotations is a refined way of using textual evidence"),
       ("mt_ak_ZgoMKRQ", "s", "Quotations must first be copied accurately")])

T("tn_crafted_narrative", P, WCO, "Crafting descriptive and narrative writing", "14-16",
  "Write a short story or description with deliberate structure (a strong opening, a shift in focus, a cyclical ending) and controlled sentence and vocabulary choices for effect",
  ["Uses a structural shift such as zooming in, a flashback or a change in time",
   "Varies sentence length deliberately for pace and tension",
   "Selects precise vocabulary instead of clichés"],
  "Given a photo of a storm, can {{name}} write an opening that zooms from the wide sky to one small detail, using short sentences to build tension?",
  [], [("mt_s6-6FYb5UQ", "h", "Crafted writing uses writing techniques for effect"),
       ("mt_BLzNxSSdWu", "s", "Narrative writing draws on character and dialogue skills")])

T("tn_persuasive_speech", P, SL, "Giving a persuasive speech", "14-16",
  "Plan and deliver a persuasive speech to an audience, using rhetorical techniques, clear structure, eye contact and controlled pace, and respond to questions afterwards",
  ["Structures a speech with a hook, key points and a call to action",
   "Uses at least three rhetorical techniques on purpose",
   "Answers an audience question clearly"],
  "Can {{name}} give a three-minute speech arguing for a school change, using rhetorical techniques and answering a question at the end?",
  [], [("mt_z07UNAIsNc", "h", "Persuasive speeches build on formal speaking and presentations"),
       ("tn_rhetoric", "h", "Speechwriting uses the appeals and techniques of rhetoric")])

T("tn_writers_methods", L, VO, "Talking about writers' methods precisely", "14-16",
  "Use precise critical vocabulary (juxtaposition, foreshadowing, semantic field, caesura, enjambment, sibilance, motif) accurately, and explain effects instead of just naming techniques",
  ["Uses at least six critical terms correctly in analysis",
   "Explains the effect of a technique, not only its name",
   "Chooses the most precise term for a feature"],
  "When {{name}} spots a pattern of violent words in a poem, can they name it a semantic field and explain what it adds?",
  [], [("mt_HCweOHWSiu", "h", "This extends literary and language terminology"),
       ("mt_MlmIrLb_7x", "s", "Many methods are kinds of advanced figurative language")])

# ---------------------------------------------------------------- English, ages 16-18
T("tn_critical_lenses", C, RC, "Reading through critical lenses", "16-18",
  "Interpret a text through different critical perspectives (feminist, Marxist, postcolonial, psychoanalytic, ecocritical) and evaluate how each opens up or limits meaning",
  ["Explains what one critical lens looks for",
   "Applies two lenses to the same passage",
   "Evaluates which reading is more convincing"],
  "Can {{name}} explain how a feminist reading and a Marxist reading of the same novel might focus on different things?",
  [], [("tn_19c_fiction", "s", "Older novels are common ground for applying critical lenses"),
       ("mt_x2sWtfTeYT", "h", "Questioning a text's perspective is a first step towards critical readings")])

T("tn_close_reading", P, RC, "Close reading of prose extracts", "16-18",
  "Analyse a short prose extract in fine detail — narrative voice, syntax, imagery, structure and tone — and connect the extract to the whole text",
  ["Comments on syntax as well as word choice",
   "Analyses narrative voice and focalisation",
   "Links the extract to the wider novel"],
  "Given one page from a novel, can {{name}} explain how sentence structure and narrative voice create a particular mood?",
  [], [("tn_writers_methods", "h", "Close reading needs precise vocabulary for methods"),
       ("tn_embedding_quotes", "h", "Close reading depends on detailed analysis of short quotations")])

T("tn_comparative_essay", P, WCO, "Writing a comparative essay across texts", "16-18",
  "Write an extended essay comparing two or more texts (possibly from different genres and periods) with an integrated structure that compares throughout, not text by text",
  ["Plans an essay organised by ideas, not by text",
   "Compares methods and contexts in each paragraph",
   "Reaches a nuanced overall judgement"],
  "Can {{name}} plan a comparison of how two novels present ambition, with each paragraph discussing both books?",
  [], [("tn_compare_poems", "h", "Integrated comparison was first practised with poems"),
       ("tn_thesis", "h", "A comparative essay needs a thesis to hold it together")])

T("tn_context_interpretation", C, RC, "Context and interpretation", "16-18",
  "Distinguish contexts of production and reception, and explain how readers in different times and places interpret the same text differently",
  ["Explains context of production with an example",
   "Explains how a modern reader may respond differently",
   "Uses context to sharpen, not replace, an argument"],
  "Can {{name}} explain why a modern audience might react differently to The Taming of the Shrew than an Elizabethan one?",
  [], [("tn_shakespeare", "h", "Shakespeare in context is a first case of context shaping meaning"),
       ("tn_critical_lenses", "s", "Critical lenses are one way readers bring their own context")])

T("tn_tragedy", C, RC, "Tragedy as a genre", "16-18",
  "Understand the conventions of tragedy (the tragic hero, hamartia, peripeteia, catharsis, the fall) from Aristotle to modern drama, and test texts against them",
  ["Defines hamartia and catharsis",
   "Applies tragic conventions to a play",
   "Argues whether a modern play is a tragedy"],
  "Can {{name}} explain what Othello's tragic flaw is, and whether Death of a Salesman is a tragedy in the same sense?",
  [], [("tn_shakespeare", "h", "Shakespearean tragedy is the core example of the genre"),
       ("mt_tIi6L1n7kF", "s", "Tragedy is a dramatic form")])

T("tn_language_change", C, VO, "Language change and variation", "16-18",
  "Investigate how English changes over time (borrowing, new words, shifting meanings, technology) and varies by region, social group and context, and discuss attitudes to 'correct' English",
  ["Gives examples of borrowing, coinage and semantic change",
   "Explains a difference between descriptive and prescriptive views",
   "Analyses features of a regional or online variety"],
  "Can {{name}} explain how a word like 'literally' or 'mouse' has changed meaning and whether that change is a problem?",
  [], [("mt_1ro8W1cZYn", "h", "This deepens knowledge of dialects and registers"),
       ("mt_S2fP8rUwrl", "h", "Debates about 'correct' English start from Standard English")])

T("tn_media_texts", C, RC, "Analysing media and digital texts", "16-18",
  "Analyse how adverts, news sites, podcasts and social media posts combine language, image, sound and layout to target audiences and shape opinions",
  ["Analyses how image and text work together",
   "Identifies the target audience from multiple clues",
   "Explains how a platform's format shapes the message"],
  "Can {{name}} take a social-media advert and explain how the image, caption and hashtags work together to persuade?",
  [], [("tn_rhetoric", "h", "Media texts use the same appeals as written rhetoric"),
       ("mt_xsk3iuNVVI", "s", "Builds on recognising multimedia elements in texts")])

T("tn_referencing", P, WCO, "Referencing sources and avoiding plagiarism", "16-18",
  "Use sources honestly in extended writing: paraphrase and quote correctly, reference in a consistent style (e.g. Harvard), and build a bibliography",
  ["Paraphrases without copying sentence structure",
   "Cites a source in text and in a bibliography",
   "Explains what counts as plagiarism, including AI-generated text"],
  "If {{name}} uses an idea from a website in an essay, can they paraphrase it, cite it and add it to a bibliography correctly?",
  [], [("mt_Qcsl1Z1x0l", "h", "Referencing builds on research and source evaluation"),
       ("tn_embedding_quotes", "s", "Correct quotation is part of using sources")])

T("tn_extended_essay", M, WCO, "Writing an extended independent essay", "16-18",
  "Plan, research, draft and revise a 2,000-3,000 word independent essay on a question they choose, managing argument across sections and responding to feedback",
  ["Writes a focused, answerable question",
   "Organises a long argument into sections",
   "Revises a draft in response to feedback"],
  "Could {{name}} choose their own question about two novels and produce a well-structured 2,500-word essay over several weeks?",
  [], [("tn_comparative_essay", "h", "Extended essays scale up comparative essay structure"),
       ("tn_referencing", "h", "Independent essays must reference sources properly")])

T("tn_political_speeches", P, SL, "Evaluating political speeches and debate", "16-18",
  "Evaluate speeches and debates in public life, spotting logical fallacies (straw man, false dilemma, ad hominem), loaded language and evasion, and judging the strength of arguments",
  ["Identifies three logical fallacies in real speeches",
   "Explains how loaded language frames an issue",
   "Writes a balanced evaluation of a debate"],
  "Watching a political debate clip, can {{name}} spot a straw-man argument and explain why it is unfair?",
  [], [("tn_rhetoric", "h", "Evaluating speeches applies rhetorical analysis"),
       ("mt_Yrjn8jAt1c", "s", "Experience of formal debates helps judge them")])

T("tn_personal_statement", P, WCO, "Writing about yourself: personal statements", "16-18",
  "Write a personal statement or application letter that presents experiences, interests and reflection with evidence, in a confident but honest voice suited to the reader",
  ["Selects relevant experiences and reflects on what they learned",
   "Uses specific evidence rather than general claims",
   "Edits for tone, concision and the reader's needs"],
  "Can {{name}} write a paragraph about an experience that shows their interest in a subject, with evidence and reflection rather than cliché?",
  [], [("mt_v5DyOEpbbr", "h", "Statements need form and tone chosen for the audience"),
       ("mt_av-uRBrhwT", "h", "Good statements go through several revisions")])
