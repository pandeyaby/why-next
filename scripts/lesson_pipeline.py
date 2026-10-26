#!/usr/bin/env python3
"""Continuous flagship-lesson pipeline (visual-draft only).

    python3 scripts/lesson_pipeline.py next [N]          rank missing topics and refresh the "next" queue
    python3 scripts/lesson_pipeline.py brief             print the authoring brief for the top queued topic
    python3 scripts/lesson_pipeline.py check LESSON.json run every gate, print the report, change nothing
    python3 scripts/lesson_pipeline.py run LESSON.json [--push]
                                                         gates pass  -> rebuild, commit to visual-draft (optionally push)
                                                         gates fail  -> log the topic under "failed" for retry
    python3 scripts/lesson_pipeline.py status            done / failed / next

Authoring (lesson JSON + a new learn/flag_<x>.js lab + learn/pipeline/reviews/<topicId>.json) is done by a person or an
agent; this script is the gate. It never writes lesson content itself, so nothing cheap or templated can slip through on
its own. See learn/pipeline/RUBRIC.md for the bar.
"""
import itertools, json, re, subprocess, sys, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUEUE = ROOT / "learn/pipeline/queue.json"
REVIEWS = ROOT / "learn/pipeline/reviews"
LESSONS = ROOT / "learn/lessons"
PRIORITY = ["mt_pp9vsZ4wu2", "mt_dx_t8RtPt5", "mt_XJJlJ6IQHx", "mt_q8uN41TdjS"]  # electron shells, covalent bonding, unit circle, wave diagrams
CRITERIA = ["accuracy", "misconceptions", "lab_distinct", "lab_teaches", "predictions", "challenge_feedback",
            "readability", "no_filler", "mobile", "accessibility"]
FILLER = [r"\bin this lesson\b", r"\blet'?s (explore|dive|learn)\b", r"\bdelve\b", r"\bfascinating\b", r"\bit is important to note\b",
          r"\bplays a (crucial|vital|key) role\b", r"\bin today'?s world\b", r"\bunlock the (power|secrets)\b", r"\bjourney\b",
          r"\bthe world of\b", r"\bembark\b", r"\bin conclusion\b", r"\blorem\b", r"\bTODO\b", r"\bTBD\b", r"\bplaceholder\b"]
BRANCH = ["git", "rev-parse", "--abbrev-ref", "HEAD"]
GIT_ID = ["-c", "user.name=Abhinav Pandey", "-c", "user.email=8624924+pandeyaby@users.noreply.github.com"]


def sh(cmd, **kw):
    return subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, **kw)


def load_queue():
    q = json.loads(QUEUE.read_text()) if QUEUE.exists() else {}
    if not isinstance(q, dict):
        q = {}
    for key in ("done", "failed", "next"):
        if not isinstance(q.get(key), list):
            q[key] = []
    return q


def save_queue(q):
    QUEUE.write_text(json.dumps(q, indent=1, ensure_ascii=False) + "\n")


def lessons_except(path):
    return [(p, json.loads(p.read_text())) for p in sorted(LESSONS.glob("*.json")) if p.resolve() != Path(path).resolve()]


def text_of(lesson):
    ex = lesson.get("explain") or {}
    return " ".join([lesson.get("keyIdea", "")] + [s for v in ex.values() for s in (v if isinstance(v, list) else [v])])


def shingles(text, n):
    toks = re.findall(r"[a-z0-9]+", text.lower())
    return {tuple(toks[i:i + n]) for i in range(max(0, len(toks) - n + 1))}


def jaccard(a, b):
    return len(a & b) / max(1, len(a | b))


# ---------------- gates ----------------
def gate_validators(lesson, path):
    b = sh(["python3", "ext/make_viewer.py"])  # the validator also checks that the committed bundle is current
    if b.returncode:
        return ["build failed: " + b.stderr[-400:]]
    r = sh(["python3", "learn/validate_lessons.py"])
    return [] if r.returncode == 0 else ["validate_lessons failed: " + (r.stdout + r.stderr).strip()[-600:]]


def gate_lab_registered(lesson, path):
    lab = (lesson.get("lab") or {}).get("type", "")
    if not lab.startswith("flag"):
        return ["lab: a flagship lesson needs its own interactive lab (lab.type flag…)"]
    errs, src = [], lab_file(lab)
    if not src:
        return [f"lab: no learn/flag_*.js registers VIS.reg('{lab}')"]
    if src.name not in (ROOT / "ext/make_viewer.py").read_text():
        errs.append(f"lab: {src.name} is not in LEARN_JS (ext/make_viewer.py)")
    if f'"{lab}"' not in (ROOT / "learn/validate_visuals.py").read_text():
        errs.append(f"lab: {lab} missing from learn/validate_visuals.py OPTS")
    if (ROOT / "learn/lesson.schema.json").read_text().count(f'"{lab}"') < 2:
        errs.append(f"lab: {lab} missing from both enums in learn/lesson.schema.json")
    reused = [p.name for p, other in lessons_except(path) if (other.get("lab") or {}).get("type") == lab]
    if reused:
        errs.append(f"lab: type {lab} is already used by {reused}; each topic needs a distinct lab")
    return errs


def lab_file(lab):
    for p in (ROOT / "learn").glob("flag_*.js"):
        if f"VIS.reg('{lab}'" in p.read_text():
            return p
    return None


def gate_lab_distinct(lesson, path):
    src = lab_file((lesson.get("lab") or {}).get("type", ""))
    if not src:
        return []
    mine, errs = shingles(src.read_text(), 6), []
    for other in (ROOT / "learn").glob("flag_*.js"):
        if other == src or other.name == "flag_kit.js":
            continue
        sim = jaccard(mine, shingles(other.read_text(), 6))
        if sim > 0.30:
            errs.append(f"lab: {src.name} is {sim:.0%} the same as {other.name} (limit 30%); write a lab for this topic, not a copy")
    return errs


def gate_lab_structure(lesson, path):
    src = lab_file((lesson.get("lab") or {}).get("type", ""))
    if not src:
        return []
    code, errs = src.read_text(), []
    steps, predicts, tasks = code.count("{h:'"), code.count("predict:{"), code.count("task:'")
    if steps < 6: errs.append(f"lab: {steps} steps, need at least 6 (teach steps, sandbox, challenge)")
    if predicts < 2: errs.append(f"lab: {predicts} predictions, need at least 2 that target a misconception")
    if tasks < 3: errs.append(f"lab: {tasks} tasks, need at least 3 with a Show me")
    if "h:'Challenge'" not in code: errs.append("lab: no Challenge step")
    feedback = len(re.findall(r"\bm=[`'\"]", code))
    if feedback < 3: errs.append(f"lab: challenge has {feedback} feedback messages for wrong answers, need at least 3 distinct misconceptions")
    if not re.search(r"A\.gest\(|addEventListener\('pointer", code): errs.append("lab: no direct manipulation (drag or tap on the canvas)")
    if "aria-label" not in code: errs.append("lab: canvas has no live aria-label description")
    return errs


def gate_content(lesson, path):
    errs, text = [], text_of(lesson)
    whole = json.dumps(lesson, ensure_ascii=False)
    for pat in FILLER:
        if re.search(pat, whole, re.I):
            errs.append(f"filler: matches /{pat}/")
    mine = shingles(text, 6)
    for p, other in lessons_except(path):
        sim = jaccard(mine, shingles(text_of(other), 6))
        if sim > 0.12:
            errs.append(f"duplicate: explanation is {sim:.0%} the same as {p.name} (limit 12%)")
    if lesson.get("status") != "self-checked":
        errs.append("status must be self-checked")
    for part in ("kid", "adult"):
        paras = (lesson.get("explain") or {}).get(part) or []
        if len(paras) < 3: errs.append(f"explain.{part}: {len(paras)} paragraphs, need 3+")
    adult = " ".join((lesson.get("explain") or {}).get("adult") or [])
    if not re.search(r"slip|mistake|misconception|common error|careful", adult, re.I):
        errs.append("explain.adult: name at least one common mistake")
    return errs


def numeric_combos(item):
    params = item.get("params") or {}
    axes = [sorted({lo, hi, (lo + hi) // 2}) for lo, hi in params.values()]
    return [dict(zip(params, vals)) for vals in itertools.product(*axes)]


def gate_items(lesson, path):
    errs, prac, pool = [], lesson.get("practice") or [], (lesson.get("mastery") or {}).get("pool") or []
    if len(prac) < 4: errs.append(f"practice: {len(prac)} items, need 4+")
    if sum(1 for i in prac if i.get("params")) < 2: errs.append("practice: need 2+ parameterised items")
    if len(pool) < 7: errs.append(f"mastery: pool of {len(pool)}, need 7+")
    prompts = [i.get("prompt", "") for i in prac + pool]
    if len(set(prompts)) != len(prompts): errs.append("items: duplicate prompts")
    for it in prac + pool:
        for key in ("hint", "explain"):
            if len(it.get(key, "")) < 25: errs.append(f"{it.get('id')}: {key} is too thin to teach anything")
        if it.get("type") == "mc":
            ch = it.get("choices") or []
            if len(set(ch)) != len(ch) or len(ch) < 3: errs.append(f"{it.get('id')}: needs 3+ distinct choices")
        if it.get("type") == "numeric" and it.get("params"):
            for env in numeric_combos(it):
                try:
                    v = eval(it["answer"], {"__builtins__": {}}, {**env, "abs": abs, "round": round, "min": min, "max": max})
                except Exception as e:
                    errs.append(f"{it.get('id')}: answer '{it['answer']}' fails for {env}: {e}"); break
                if not isinstance(v, (int, float)) or v != v:
                    errs.append(f"{it.get('id')}: answer not a number for {env}"); break
    return errs


def gate_review(lesson, path):
    f = REVIEWS / f"{lesson.get('topicId')}.json"
    if not f.exists():
        return [f"review: missing {f.relative_to(ROOT)} (strict 9/10 self-review, see RUBRIC.md)"]
    rv, errs = json.loads(f.read_text()), []
    if not isinstance(rv, dict) or not isinstance(rv.get("scores"), dict):
        return ["review: expected {\"scores\": {criterion: {score, evidence}}, \"sources\": [...]}"]
    for c in CRITERIA:
        s = rv["scores"].get(c)
        if not isinstance(s, dict) or not isinstance(s.get("score"), (int, float)):
            errs.append(f"review: {c} not scored"); continue
        if s["score"] < 9: errs.append(f"review: {c} scored {s['score']}/10 (bar is 9)")
        if len(str(s.get("evidence", ""))) < 40: errs.append(f"review: {c} needs concrete evidence, not a bare score")
    if not rv.get("sources"):
        errs.append("review: list at least one source the facts were checked against")
    errs += review_not_copied(f, rv)
    return errs


def review_not_copied(this_file, rv):
    """A review whose evidence repeats another lesson's review word for word was copied, not written for this lesson."""
    def norm(t):
        return re.sub(r"^checked for [^:]*:\s*", "", str(t).strip().lower())
    mine = {c: norm(v.get("evidence", "")) for c, v in rv.get("scores", {}).items() if isinstance(v, dict)}
    errs = []
    for other in sorted(REVIEWS.glob("*.json")):
        if other == this_file:
            continue
        try:
            ov = json.loads(other.read_text()).get("scores", {})
        except (ValueError, AttributeError):
            continue
        for c, ev in mine.items():
            o = ov.get(c)
            if isinstance(o, dict) and len(ev) > 40 and norm(o.get("evidence", "")) == ev:
                errs.append(f"review: {c} evidence is copied from {other.name}; write it from this lesson's own checks")
    return errs


def gate_browser(lesson, path):
    b = sh(["python3", "ext/make_viewer.py"])
    if b.returncode:
        return ["build failed: " + b.stderr[-400:]]
    r = sh(["node", "scripts/pipeline/walk.cjs", lesson["topicId"]], timeout=600)
    return [] if r.returncode == 0 else ["browser walkthrough/axe failed: " + (r.stdout + r.stderr).strip()[-700:]]


GATES = [gate_lab_registered, gate_lab_distinct, gate_lab_structure, gate_content, gate_items, gate_review, gate_validators, gate_browser]


def run_gates(path):
    lesson = json.loads(Path(path).read_text())
    report = {}
    for g in GATES:
        try:
            report[g.__name__] = g(lesson, path)
        except Exception as e:  # a crashing gate is a failure, never a pass
            report[g.__name__] = [f"gate crashed: {e}"]
    return lesson, report


def print_report(report):
    for name, errs in report.items():
        print(("PASS " if not errs else "FAIL ") + name)
        for e in errs:
            print("     - " + e)


# ---------------- commands ----------------
def cmd_next(n=12):
    r = sh(["node", "scripts/pipeline/rank.cjs", "80"], timeout=300)
    ranked = json.loads(r.stdout)
    q = load_queue()
    skip = {d["topic"] for d in q["done"]} | {d["topic"] for d in q.get("skipped", [])}
    first = [t for p in PRIORITY for t in ranked if t["id"] == p]
    rest = [t for t in ranked if t["id"] not in PRIORITY]
    q["next"] = [{"topic": t["id"], "name": t["name"], "subject": t["subject"], "ages": t["ages"], "downstream": t["downstream"], "reels": t["reels"]}
                 for t in first + rest if t["id"] not in skip][:n]
    save_queue(q); cmd_status()


def cmd_brief():
    q = load_queue()
    if not q["next"]:
        print("queue empty: run `next` first"); return
    t = q["next"][0]
    print(f"Next topic: {t['name']} ({t['topic']}), {t['subject']}, ages {t['ages']}, unblocks {t['downstream']} topics, reels: {t['reels']}")
    print("Write: learn/lessons/NNN-<slug>.json, a new learn/flag_<x>.js lab (register in LEARN_JS, validate_visuals OPTS, both schema enums),")
    print(f"and learn/pipeline/reviews/{t['topic']}.json. Then: python3 scripts/lesson_pipeline.py run <lesson.json> --push")


def cmd_check(path):
    _, report = run_gates(path); print_report(report)
    return all(not e for e in report.values())


def restore_missing_tracked_files():
    """The builds read tracked inputs (out/merged/data, site/build). If something removed them from the working tree,
    restore them from HEAD before running, so a lesson commit never carries (or fails on) unrelated deletions."""
    gone = sh(["git", "ls-files", "-d"]).stdout.split("\n")
    gone = [f for f in gone if f]
    if gone:
        print(f"restoring {len(gone)} tracked files missing from the working tree (e.g. {gone[0]})")
        sh(["git", "checkout", "--", *gone])
    return len(gone)


def cmd_run(path, push=False):
    if sh(BRANCH).stdout.strip() != "visual-draft":
        sys.exit("refusing: the pipeline only commits on visual-draft")
    restore_missing_tracked_files()
    lesson, report = run_gates(path); print_report(report)
    q, tid, now = load_queue(), lesson.get("topicId"), datetime.date.today().isoformat()
    q["next"] = [t for t in q["next"] if t["topic"] != tid]
    if any(report.values()):
        prev = next((f for f in q["failed"] if f["topic"] == tid), None)
        entry = {"topic": tid, "lesson": str(Path(path).resolve().relative_to(ROOT)), "date": now, "attempts": (prev or {}).get("attempts", 0) + 1,
                 "reasons": [e for errs in report.values() for e in errs][:12]}
        q["failed"] = [f for f in q["failed"] if f["topic"] != tid] + [entry]
        save_queue(q); print(f"\nNOT committed. Logged {tid} under failed for retry."); sys.exit(1)
    q["failed"] = [f for f in q["failed"] if f["topic"] != tid]
    q["done"] = [d for d in q["done"] if d["topic"] != tid] + [{"topic": tid, "title": lesson["title"], "lesson": str(Path(path).resolve().relative_to(ROOT)),
                                                             "lab": lesson["lab"]["type"], "date": now}]
    save_queue(q)
    for cmd in (["python3", "ext/make_viewer.py"], ["python3", "site/build/build_site.py"]):
        if sh(cmd).returncode: sys.exit(f"build failed: {' '.join(cmd)}")
    sh(["git", "add", "-A", "learn", "ext", "out", "index.html", "site", "tests", "scripts"])
    deleted = sh(["git", "diff", "--cached", "--diff-filter=D", "--name-only"]).stdout.split()
    if deleted:   # a lesson commit only adds or edits files
        sh(["git", "reset", "-q"]); sys.exit(f"refusing to commit: {len(deleted)} staged deletions, e.g. {deleted[0]}")
    c = sh(["git", *GIT_ID, "commit", "-m", f"Pipeline: flagship lesson {lesson['title']} ({tid}), lab {lesson['lab']['type']}"])
    if c.returncode:
        sys.exit("commit failed (hooks are never skipped):\n" + c.stdout + c.stderr)
    print("committed", sh(["git", "rev-parse", "--short", "HEAD"]).stdout.strip())
    if push:
        p = sh(["git", "push", "origin", "visual-draft"])
        print(re.sub(r"https://[^@\s]*@", "https://", p.stdout + p.stderr).strip())


def cmd_status():
    q = load_queue()
    print(f"done {len(q['done'])}: " + ", ".join(d["title"] for d in q["done"]))
    print(f"failed {len(q['failed'])}: " + ", ".join(f"{f['topic']} (x{f['attempts']})" for f in q["failed"]))
    print("next: " + ", ".join(f"{t['name']} [{t['downstream']}]" for t in q["next"][:8]))


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a: print(__doc__); sys.exit(0)
    if a[0] == "next": cmd_next(int(a[1]) if len(a) > 1 else 12)
    elif a[0] == "brief": cmd_brief()
    elif a[0] == "check": sys.exit(0 if cmd_check(a[1]) else 1)
    elif a[0] == "run": cmd_run(a[1], "--push" in a)
    elif a[0] == "status": cmd_status()
    else: print(__doc__); sys.exit(2)
