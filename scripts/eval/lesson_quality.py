#!/usr/bin/env python3
"""Lesson quality score (code graders only, no API calls).

Scores each learn/lessons/*.json out of 100 on structure a learner feels:
both kid and adult explanations, a key idea, family tip, enough practice and
mastery items, and a hint + explain on every item. Prints the weakest lessons.
Usage: python3 scripts/eval/lesson_quality.py [--worst N] [--min SCORE]
--min exits 1 if any lesson scores below SCORE (off by default).
"""
import glob, json, os, re, sys

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')

def words(s): return len(re.findall(r"[A-Za-z']+", s or ''))

def score(d):
    out, pts = [], 0
    def check(ok, w, why):
        nonlocal pts
        if ok: pts += w
        else: out.append(why)
    ex = d.get('explain') or {}
    kid, adult = ' '.join(ex.get('kid') or []), ' '.join(ex.get('adult') or [])
    check(4 <= words(d.get('keyIdea')) <= 30, 10, 'keyIdea missing or too long')
    check(words(kid) >= 20, 15, 'kid explanation thin')
    check(words(adult) >= 25, 10, 'adult explanation thin')
    sl = [words(x) for x in re.split(r'[.!?]+', kid) if x.strip()]
    check(not sl or max(sl) <= 28, 10, 'kid sentence over 28 words')
    check(words(d.get('familyTip')) >= 8, 5, 'familyTip missing')
    pr = d.get('practice') or []
    pool = (d.get('mastery') or {}).get('pool') or []
    check(len(pr) >= 3, 10, f'only {len(pr)} practice items')
    check(len(pool) >= (d.get('mastery') or {}).get('draw', 4), 10, 'mastery pool smaller than draw')
    items = pr + pool
    if items:
        h = sum(1 for i in items if words(i.get('hint')) >= 3) / len(items)
        e = sum(1 for i in items if words(i.get('explain')) >= 3) / len(items)
        pts += round(15 * h) + round(10 * e)
        if h < 1: out.append(f'{round((1-h)*100)}% items have a hint under 3 words')
        if e < 1: out.append(f'{round((1-e)*100)}% items have an explain under 3 words')
    check(bool(d.get('visual')), 5, 'no visual')
    return pts, out

def main():
    a = sys.argv[1:]
    worst = int(a[a.index('--worst') + 1]) if '--worst' in a else 10
    mn = float(a[a.index('--min') + 1]) if '--min' in a else None
    rows = []
    for f in sorted(glob.glob(os.path.join(ROOT, 'learn/lessons/*.json'))):
        d = json.load(open(f, encoding='utf-8'))
        s, why = score(d)
        rows.append((s, os.path.basename(f), why))
    rows.sort()
    avg = sum(r[0] for r in rows) / len(rows)
    print(f'{len(rows)} lessons · mean {avg:.1f}/100 · min {rows[0][0]} · 100s: {sum(r[0]==100 for r in rows)}')
    for s, f, why in rows[:worst]:
        print(f'  {s:3d}  {f}  — ' + '; '.join(why))
    if mn is not None and rows[0][0] < mn: sys.exit(1)

if __name__ == '__main__': main()
