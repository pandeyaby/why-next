"""Flesch-Kincaid grade level for lesson explanations (a simple, dependency-free estimate).
Digits, symbols and single-letter algebra are dropped first so maths notation doesn't distort the score."""
import re
TARGETS = {("family", "kid"): 5.0, ("family", "adult"): 10.0, ("learner", "kid"): 6.5, ("learner", "adult"): 9.5}
def syllables(w):
    w = w.lower()
    if len(w) <= 3: return 1
    w = re.sub(r"(?:es|ed|e)$", "", w) if not w.endswith("le") else w
    return max(1, len(re.findall(r"[aeiouy]+", w)))
def fk_grade(text):
    text = re.sub(r"[0-9]+|[=+−×÷/²³½¾¼()□'\"“”‘’…:;→]", " ", text)
    sentences = max(1, len([s for s in re.split(r"[.!?]+", text) if s.strip()]))
    words = [w for w in re.findall(r"[A-Za-z]+", text) if len(w) > 1 or w in ("a", "A", "I")]
    if not words: return 0.0
    return round(0.39 * len(words) / sentences + 11.8 * sum(map(syllables, words)) / len(words) - 15.59, 1)
