"""Publish batch reels to orphan branches reels-part-<k> of pandeyaby/why-next, served by jsDelivr pinned to a commit.
jsDelivr refuses packages over 50 MB; a commit on an orphan branch holds only that part's reels, so each part stays
under LIMIT bytes. New reels go into the newest part while it has room; when it is full, reels-part-<k+1> is started.
Usage: python3 ext/reels_publish.py <dir with b###.mp4/.jpg/.vtt>   (needs GITHUB_TOKEN; never printed)
Writes learn/reels/parts.json ({"<k>": {"branch", "sha", "files"}}) and sets "x": <k> on each manifest entry.
Local clones live in /workspace/why-next-reels-parts/<repo> (make_viewer.py checks files there when present).
Primary host: every reel is also uploaded (upsert) to the dedicated Supabase project "why-next", public bucket
why-next-reels (REEL_HOST in make_viewer.py). Uploads need WN_REELS_SUPABASE_KEY, a Supabase secret/service key for
that project (never printed). Without it the jsDelivr parts are still published and the Supabase step is skipped
with a warning, so players fall back to jsDelivr for the new reels until it is re-run with the key."""
import base64, json, os, subprocess, sys, urllib.error, urllib.request
OWNER, BR, LIMIT = "pandeyaby", "reels-part-", 45_000_000
ROOT = "/workspace/why-next-reels-parts"; PJ = "learn/reels/parts.json"; MJ = "learn/reels/manifest.json"
src = sys.argv[1]; tok = os.environ["GITHUB_TOKEN"]
H = "AUTHORIZATION: basic " + base64.b64encode(f"x-access-token:{tok}".encode()).decode()
ID = ["-c", "user.name=Abhinav Pandey", "-c", "user.email=8624924+pandeyaby@users.noreply.github.com"]
def git(d, *a):
    r = subprocess.run(["git", "-C", d, *ID, "-c", f"http.https://github.com/.extraheader={H}", *a], text=True, capture_output=True)
    if r.returncode: sys.exit(f"git {a[0]} failed in {d}: " + r.stderr.replace(tok, "***").strip())   # never echo the auth header
    return r.stdout.strip()
SB_UPLOAD = "https://etzqrmcwnxpbysnltdxt.supabase.co/storage/v1/object/why-next-reels/"
CONTENT_TYPES = {".mp4": "video/mp4", ".jpg": "image/jpeg", ".vtt": "text/vtt"}
def upload_to_reel_host(path, key):
    """Upsert one reel file into the Supabase bucket; returns the HTTP status (200 on success)."""
    ext = path[-4:]; assert ext in CONTENT_TYPES, path
    req = urllib.request.Request(SB_UPLOAD + os.path.basename(path), data=open(path, "rb").read(), method="POST",
        headers={"apikey": key, "Authorization": "Bearer " + key, "Content-Type": CONTENT_TYPES[ext],
                 "x-upsert": "true", "cache-control": "max-age=31536000"})
    try: return urllib.request.urlopen(req).status
    except urllib.error.HTTPError as e: return e.code
def size(d): return sum(os.path.getsize(os.path.join(d, f)) for f in os.listdir(d) if not f.startswith("."))
def part_dir(k):
    br = BR + str(k); d = f"{ROOT}/{br}"
    if os.path.isdir(d + "/.git"):
        if git(d, "ls-remote", "origin", br): git(d, "pull", "-q", "--ff-only", "origin", br)
        return d
    os.makedirs(d, exist_ok=True); subprocess.check_call(["git", "init", "-q", "-b", br, d])
    git(d, "remote", "add", "origin", f"https://github.com/{OWNER}/why-next.git")
    if git(d, "ls-remote", "origin", br): git(d, "pull", "-q", "origin", br)
    return d
parts = json.load(open(PJ)) if os.path.exists(PJ) else {}
m = json.load(open(MJ)); where = {f: int(k) for k in parts for f in parts[k].get("files", [])}
slots = sorted({f[:-4] for f in os.listdir(src) if f.endswith(".mp4")})
k = max(map(int, parts), default=1); d = part_dir(k); touched = set()
for s in slots:
    files = [f"{s}{e}" for e in (".mp4", ".jpg", ".vtt")]; n = sum(os.path.getsize(f"{src}/{f}") for f in files)
    tgt = where.get(s)
    if tgt is None:
        if size(d) + n > LIMIT: k += 1; d = part_dir(k)
        tgt = k
    td = f"{ROOT}/{BR}{tgt}"
    for f in files: subprocess.check_call(["cp", f"{src}/{f}", f"{td}/{f}"])
    parts.setdefault(str(tgt), {"branch": BR + str(tgt)}).setdefault("files", [])
    if s not in parts[str(tgt)]["files"]: parts[str(tgt)]["files"].append(s)
    where[s] = tgt; touched.add(tgt)
for t in sorted(touched):
    td = f"{ROOT}/{BR}{t}"
    open(f"{td}/README.md", "w").write(f"# {BR}{t}\n\nOrphan branch of why-next. Short video reels (mp4 + poster + captions) for [Why Next?](https://github.com/{OWNER}/why-next), served via jsDelivr. Part {t}; each part stays under 45 MB (jsDelivr limit 50 MB).\n")
    assert size(td) < 50_000_000
    git(td, "add", "-A")
    if git(td, "status", "--porcelain"): git(td, "commit", "-qm", f"Add/update reels ({len(parts[str(t)]['files'])} total)")
    git(td, "push", "-q", "origin", f"HEAD:refs/heads/{BR}{t}")  # plain push of an orphan branch: never main, never forced
    parts[str(t)]["sha"] = git(td, "rev-parse", "HEAD"); parts[str(t)]["files"].sort()
for L in m.values():
    for e in L:
        if e["f"] in where: e["x"] = where[e["f"]]
sb_key = os.environ.get("WN_REELS_SUPABASE_KEY")
if not sb_key: print("warning: WN_REELS_SUPABASE_KEY not set; new reels are on jsDelivr only (Supabase upload skipped)")
else:
    bad = [f"{s}{e}" for s in slots for e in CONTENT_TYPES if upload_to_reel_host(f"{src}/{s}{e}", sb_key) != 200]
    if bad: sys.exit(f"Supabase upload failed for {len(bad)} files, e.g. {bad[:3]}")
json.dump(parts, open(PJ, "w"), indent=1); json.dump(m, open(MJ, "w"), indent=1, ensure_ascii=False)
print({t: (parts[t]["sha"][:7], len(parts[t]["files"]), size(f"{ROOT}/{BR}{t}")) for t in parts})
