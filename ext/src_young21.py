"""Wave 21 (24 Nov 2026): one new young Personal & Social topic for ages 6-7, because Personal & Social was due and
every young v1 Personal & Social topic without a lesson already overlaps an existing lesson. It fills a gap, checked
against lesson titles, key ideas and kid text on 24 Nov 2026:
- Spending and saving: needs and wants (PSD 6-7): 'Coin values' and 'Working with money' teach the maths of coins and
  change; 'Money basics: budgeting and saving' (ages 14+) teaches payday budgets and emergency funds; 'What living
  things need' sorts the needs of animals and plants for survival. No lesson teaches a young child that money is
  limited so people choose, how to tell a need (food, water, a home, warm clothes, medicine) from a want (toys, sweets,
  games), to pay for needs first, to save a little at a time in a safe place for a bigger want, that spent money is
  gone, and that choosing one want means giving up another. PSHE Association Programme of Study 2020, KS1 Living in
  the wider world L10-L13 ('the difference between needs and wants; that sometimes people may not always be able to
  have the things they want'; 'that people make different choices about how to save and spend money'; 'that money
  needs to be looked after; different ways of doing this'); MoneyHelper / Money and Pensions Service, Financial
  education planning framework 3-11; Whitebread and Bingham 2013, Habit formation and learning in young children
  (Money Advice Service: core money habits are forming by about age 7)."""

from dsl import T, C

RDM = "Responsible Decision-Making"

# ---------------------------------------------------------------- Personal & Social Development, ages 6-7 (PSHE KS1 L10-L13)
T("y21_spend_save", C, RDM, "Spending and saving: needs and wants", "6-7",
  "Know that money is limited, so people choose what to spend it on; tell a need (something we must have to live and stay safe and well: food, water, a home, warm clothes, medicine) from a want (something nice to have, such as toys, sweets and games), and know that wanting something a lot does not make it a need; pay for needs first and only then for wants; save a little at a time in a safe place (a money box or a bank) to buy a bigger want later, knowing that money once spent is gone; and know that choosing one want can mean going without another, and that is OK",
  ["Sorts pictures of things into needs and wants and says why sweets are a want",
   "Chooses the needs first when there is not enough money for everything on the list",
   "Works out how many weeks of saving buy a toy, and says what happens to the money if it is spent on sweets instead"],
  "Next time you shop together, ask {{name}} to point to one need and one want in the basket, and to say which one you would buy first if there was only enough money for one.",
  [], [("mt_cPZwlUk8Nd", "h", "Choosing what you can afford uses knowing what each coin is worth"),
       ("ey_waiting", "s", "Saving up for a want means waiting for something later, the same patience as waiting for a turn")])
