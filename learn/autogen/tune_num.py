"""Number-topic tuners and shared helpers (see tune.py)."""
import re
from items import num, mc
W = {"one": 1, "single": 1, "two": 2, "three": 3, "four": 4, "1": 1, "2": 2, "3": 3, "4": 4}
def digits(text):
    return [W[m.lower()] for m in re.findall(r"\b(one|single|two|three|four|[1-4])[- ]digit", text, re.I)]
def nd(rng, k): return rng.randint(10 ** (k - 1) if k > 1 else 2, 10 ** k - 1)
def within(text, d=20):
    m = re.search(r"(?:within|to|up to|beyond)\s+(\d[\d,]*)", text); return int(m.group(1).replace(",", "")) if m else d
def fmt(x): return f"{x:,}".replace(",", " ") if isinstance(x, int) and abs(x) >= 10000 else (str(int(x)) if float(x).is_integer() else f"{x:g}")
def spot(q, ans, wrong, why):
    """An applied 'check someone's working' question: harder than recall, needs the method."""
    ch = [fmt(ans)] + [fmt(w) for w in wrong if fmt(w) != fmt(ans)][:2]
    return mc(f"Sam worked out {q} and got {ch[1]}. What is the correct answer?", ch, "Redo it step by step and compare.", f"{q} = {fmt(ans)}. {why}") if len(set(ch)) == 3 else None

def t_mulw(t, r, x):
    d = digits(x); da, db = (d + [2, 2])[:2] if len(d) >= 2 else ((3 if r.random() < .5 else 2), 1) if d == [1] else (d[0], d[0]) if d else (2, 2)
    if da < db: da, db = db, da
    a, b = nd(r, da), nd(r, db); steps, parts = [], []
    for i, ch in enumerate(reversed(str(b))):
        v = a * int(ch) * 10 ** i; parts.append(v)
        steps.append(f"{a} × {int(ch) * 10 ** i} = {v}" + (" (put a 0 in the ones place first)." if i == 1 else "."))
    if len(parts) > 1: steps.append("Add: " + " + ".join(map(str, parts)) + f" = {a * b}.")
    steps.append(f"So {a} × {b} = {a * b}.")
    return dict(vis=dict(a=a, b=b) if b >= 10 else {}, worked=(f"{a} × {b}", steps), say=f"For example, {a} × {b} = {a * b}.",
                applied=[spot(f"{a} × {b}", a * b, [a * b - a * (b % 10) + a, a * (b % 10) + a * (b // 10)], "Multiply by every digit, using its place value.")])
def t_divw(t, r, x):
    d = digits(x); db = 1 if (d and min(d) == 1) or not d else min(d); dq = max(d) if d and max(d) > db else 2 + (db > 1)
    b = nd(r, db); q = nd(r, max(1, dq - db + 1)); rem = r.randint(1, b - 1) if re.search("remainder", x, re.I) and b > 2 else 0
    a = b * q + rem; steps, carry = [], 0
    for ch in str(a):
        cur = carry * 10 + int(ch); k = cur // b; carry = cur - k * b
        if cur >= b or steps: steps.append(f"{cur} ÷ {b} = {k}" + (f", remainder {carry}." if carry else "."))
    steps.append(f"So {a} ÷ {b} = {q}" + (f" remainder {rem}." if rem else "."))
    return dict(vis=dict(a=a, b=b), worked=(f"{a} ÷ {b}", steps), say=f"For example, {a} ÷ {b} = {q}" + (f" r {rem}." if rem else "."),
                applied=[spot(f"{a} ÷ {b}", q, [q + 1, q * 10 if q < 100 else q // 10], "Check by multiplying back: " + f"{q} × {b}" + (f" + {rem}" if rem else "") + f" = {a}.")])
def t_mul(t, r, x):
    tabs = [int(n) for n in re.findall(r"\b(\d{1,2})\b", t["name"]) if 2 <= int(n) <= 12] or [r.randint(3, 9)]
    a, b = r.choice(tabs), r.randint(3, 9)
    div = re.search(r"divi|shar", x, re.I)
    w = (f"{a * b} ÷ {a}", [f"Think: {a} × what = {a * b}?", f"Count in {a}s: " + ", ".join(str(a * i) for i in range(1, b + 1)) + ".", f"That is {b} jumps, so {a * b} ÷ {a} = {b}."]) if div else \
        (f"{a} × {b}", [f"{a} × {b} means {a} groups of {b}.", f"Count in {b}s: " + ", ".join(str(b * i) for i in range(1, a + 1)) + ".", f"So {a} × {b} = {a * b}."])
    return dict(vis=dict(rows=a, cols=b, split=max(1, a // 2)), worked=w, say=f"For example, {a} × {b} = {a * b}.",
                applied=[spot(f"{a} × {b}", a * b, [a + b, a * b + a], f"{a} groups of {b} make {a * b}.")])
def t_addsub(t, r, x):
    n = within(x, 20); sub = re.search(r"subtract|take away|minus|difference|fewer", x, re.I)
    if n <= 10: a = r.randint(4, 8); b = r.randint(1, 10 - a)
    elif n <= 20: a = r.randint(6, 9); b = r.randint(11 - a, 9)
    else: a = r.randint(n // 4, n // 2); b = r.randint(n // 8, n // 3)
    s = a + b
    if sub: w = (f"{s} − {b}", [f"Start at {s}.", f"Count back {b}" + (f": first back to 10, then {b - (s - 10)} more." if s > 10 > s - b else "."), f"So {s} − {b} = {a}."]); sy = f"For example, {s} − {b} = {a}."
    else: w = (f"{a} + {b}", ([f"Make 10 first: {a} + {10 - a} = 10.", f"{b} − {10 - a} = {b - 10 + a} left over.", f"10 + {b - 10 + a} = {s}."] if a < 10 < s and s <= 20 else [f"Start at {a}.", f"Count on {b}.", f"So {a} + {b} = {s}."])); sy = f"For example, {a} + {b} = {s}."
    vis = dict(a=min(a, 10), b=min(b, 10)) if s <= 20 else {}
    return dict(vis=vis, worked=w, say=sy, applied=[spot(f"{s} − {b}" if sub else f"{a} + {b}", a if sub else s, [a + 1, a - 1] if sub else [s + 1, s - 1], "Count carefully and check with the inverse.")])
def t_pv(t, r, x):
    n = within(x, 1000); n = max(n, 100); v = r.randint(n // 10 + 1, n - 1); ds = str(v); L = len(ds)
    names = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"]
    parts = [f"{int(c) * 10 ** (L - 1 - i)}" for i, c in enumerate(ds) if c != "0"]
    return dict(worked=(f"Partition {fmt(v)}", [f"{c} in the {names[L - 1 - i]} place is worth {fmt(int(c) * 10 ** (L - 1 - i))}." for i, c in enumerate(ds) if c != "0"][:4] + [f"So {fmt(v)} = " + " + ".join(parts) + "."]),
                say=f"For example, {fmt(v)} = " + " + ".join(parts) + ".", vis=dict(n=round(v / 10 ** (L - 1), 1)),
                applied=[spot(f"the value of the first digit in {fmt(v)}", int(ds[0]) * 10 ** (L - 1), [int(ds[0]), int(ds[0]) * 10 ** max(0, L - 2)], "Its value depends on its place.")])
def t_pct(t, r, x):
    p, n = r.choice([10, 15, 20, 25, 30, 40, 75]), r.choice([40, 60, 80, 120, 200, 240]); a = p * n / 100
    inc = re.search(r"increase|decrease|change|discount|interest|profit", x, re.I)
    w = (f"{p}% of {n}", [f"10% of {n} = {fmt(n / 10)}.", f"{p}% = {p / 10:g} × 10%.", f"{p / 10:g} × {fmt(n / 10)} = {fmt(a)}."] + ([f"A {p}% increase gives {n} + {fmt(a)} = {fmt(n + a)}."] if inc else []))
    return dict(vis=dict(p=p, of=n if n <= 200 else 200), worked=w, say=f"For example, {p}% of {n} is {fmt(a)}.", applied=[spot(f"{p}% of {n}", a, [n / p, a * 10], "Find 10% first, then scale.")])
def t_frac(t, r, x):
    d = r.choice([3, 4, 5, 6, 8]); k = r.randint(1, d - 1); n = d * r.randint(2, 6)
    w = (f"{k}/{d} of {n}", [f"Split {n} into {d} equal parts: {n} ÷ {d} = {n // d}.", f"Take {k} part{'s' if k > 1 else ''}: {k} × {n // d} = {k * n // d}.", f"So {k}/{d} of {n} = {k * n // d}."])
    if re.search(r"equivalen|simplif", x, re.I): m = r.randint(2, 4); w = (f"{k}/{d} = ?/{d * m}", [f"The new denominator is {d} × {m}.", f"Multiply the top by {m} too: {k} × {m} = {k * m}.", f"So {k}/{d} = {k * m}/{d * m}."])
    return dict(vis=dict(d=d, shade=k, compare=d * 2, compareShade=k * 2), worked=w, say=f"For example, {k}/{d} of {n} is {k * n // d}.", applied=[spot(f"{k}/{d} of {n}", k * n // d, [n // d, n * k], "Divide by the bottom, multiply by the top.")])
def t_ratio(t, r, x):
    a, b = r.choice([(1, 2), (2, 3), (3, 4), (1, 3), (2, 5), (3, 5)]); m = r.randint(2, 8); tot = (a + b) * m
    return dict(vis=dict(a=b / a if a else 1, targets=[[a, b], [a * 2, b * 2]]), worked=(f"Share {tot} in the ratio {a} : {b}", [f"Total parts: {a} + {b} = {a + b}.", f"One part: {tot} ÷ {a + b} = {m}.", f"So the shares are {a * m} and {b * m}."]),
                say=f"For example, {tot} shared in the ratio {a} : {b} gives {a * m} and {b * m}.", applied=[spot(f"the smaller share when {tot} is split {a} : {b}", a * m, [tot // 2, a * tot // b if b else 0], "Find one part first.")])
def t_neg(t, r, x):
    a, b = r.randint(2, 9), r.randint(3, 12)
    return dict(vis=dict(start=a - b, target=-a), worked=(f"{a} − {b}", [f"Start at {a} on the number line.", f"Count back {a} to reach 0.", f"Count back {b - a} more to reach {a - b}." if b > a else f"Count back {b} to {a - b}.", f"So {a} − {b} = {a - b}."]),
                say=f"For example, {a} − {b} = {a - b}.", applied=[spot(f"{a} − {b}", a - b, [b - a, -(a + b)], "Below zero the numbers grow more negative.")])
