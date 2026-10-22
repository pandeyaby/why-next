# Flagship lesson rubric (the 9/10 bar)

`scripts/lesson_pipeline.py run` commits a lesson only when **every** automatic gate passes **and** the review file scores
every criterion 9 or 10 with concrete evidence. Anything less is logged under `failed` in `queue.json` for a retry.
Cheap or templated lessons fail by design: Abhinav rejected duplicate auto-generated lessons.

## Automatic gates
| Gate | What fails it |
|---|---|
| lab_registered | No `flag…` lab of its own, not registered (LEARN_JS, validate_visuals OPTS, both schema enums), or a lab type another lesson already uses |
| lab_distinct | Lab source more than 30% the same as any other flagship lab (6-token shingles, Jaccard) |
| lab_structure | Fewer than 6 steps, 2 predictions, 3 tasks with Show me; no Challenge; under 3 misconception feedback messages; no drag/tap on the canvas; no live aria-label |
| content | Filler phrases ("in this lesson", "let's explore", "delve", "plays a crucial role", "journey", TODO, placeholder…); explanation more than 12% the same as any other lesson; under 3 kid and 3 adult paragraphs; adult text names no common mistake; status not self-checked |
| items | Under 4 practice items (2 parameterised) or 7 mastery items; duplicate prompts; thin hints or explanations; MC with under 3 distinct choices; a parameterised answer that fails at the corners of its ranges |
| validators | `learn/validate_lessons.py` (schema, readability: learner kid ≤ 6.5, adult ≤ 9.5, items, visuals) |
| browser | Desktop and iPhone 13: every task completes with Show me, the challenge shows, axe (WCAG 2.1 AA) clean in both themes, no console or page errors |

## Review (`learn/pipeline/reviews/<topicId>.json`)
`{"scores": {criterion: {"score": 0-10, "evidence": "..."}}, "sources": ["..."]}`. Score honestly; a 9 needs evidence.
- **accuracy**: every number, definition and rule checked against a named source; no simplification that is wrong.
- **misconceptions**: the predictions and challenge feedback target the real, documented mistakes for this topic.
- **lab_distinct**: the lab is about this topic's own mechanism; it could not be reused for another topic by changing labels.
- **lab_teaches**: doing the tasks teaches the key idea; the learner discovers, the text confirms.
- **predictions**: each prediction has a tempting wrong option that the lab then disproves.
- **challenge_feedback**: wrong answers get feedback that names the specific slip.
- **readability**: plain words, short sentences, age-appropriate; within the readability limits.
- **no_filler**: every sentence teaches or checks; no throat-clearing, no repeated template text.
- **mobile**: usable at 390 px: labels readable, controls reachable, nothing clipped (checked on screenshots).
- **accessibility**: everything doable with buttons as well as drag; live description of the canvas; axe clean.
