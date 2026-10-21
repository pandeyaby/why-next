#!/usr/bin/env python3
"""Sync the offline lesson + reel bundle for the app from the Why Next? web build.

  python3 app/tools/sync_content.py                     # web build from github.com/pandeyaby/why-next@main
  python3 app/tools/sync_content.py --ref <commit|branch>
  python3 app/tools/sync_content.py --web /path/to/why-next   # a local checkout (uses its out/ and learn/)
  add --no-reels to skip the video download (lessons only)

Writes app/WhyNext/Resources/Web/ (added to the app as a folder reference, see project.yml):
  index.html   the web viewer (out/viewer.html) with a small app shim: reels play from the bundled reels/ folder
               and window.WN_TOPIC (set by the app) opens that topic once the page is ready
  wn/          the split web build (map, lessons, the 12 flagships, visuals; same files the live site serves)
  content.json what the native app needs: which topics have a lesson / a flagship, and the reel manifest
  reels/       every reel's mp4 + vtt captions + jpg poster, downloaded from the reels-part-<k> branches at the
               commits pinned in learn/reels/parts.json (about 100 MB, so it is git-ignored, never committed)
No network is used at run time; this script is the only step that downloads anything."""
import argparse, io, json, os, re, shutil, sys, tarfile, tempfile, urllib.request
APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(APP, "WhyNext", "Resources", "Web")
REPO = "pandeyaby/why-next"
FLAGS = {"flagderiv", "flagplace", "flagfrac", "flagneg", "flageq", "flagline", "flagarea", "flagatom", "flagacid", "flagstate", "flagprob", "flagpyth"}

def fetch_tree(ref, dest, only=None):
    """Download github.com/REPO at ref as a tarball and extract it (optionally only paths starting with `only`)."""
    url = f"https://codeload.github.com/{REPO}/tar.gz/{ref}"
    with urllib.request.urlopen(url, timeout=300) as r: data = r.read()
    with tarfile.open(fileobj=io.BytesIO(data), mode="r:gz") as t:
        root = t.getmembers()[0].name.split("/")[0]
        for m in t.getmembers():
            rel = m.name[len(root) + 1:]
            if not rel or not m.isfile() or (only and not any(rel.startswith(o) for o in only)): continue
            p = os.path.join(dest, rel); os.makedirs(os.path.dirname(p), exist_ok=True)
            with t.extractfile(m) as f, open(p, "wb") as o: shutil.copyfileobj(f, o)

# Temporary patches T2 (poll for select/WN_WARM) and T3 (captions via blob URLs): see AGENTS.md in the web repo
# (pandeyaby/why-next) for what to undo, when, and how to check.
SHIM = r"""<script>/* Why Next? app shim: offline reels, open the topic the app asks for */
(function(){var P={};Object.defineProperty(window,'WN_RPARTS',{configurable:true,get:function(){return P},set:function(v){P={};for(var k in v)P[k]='reels/'}});
window.WN_APP=1;function go(){if(!window.WN_TOPIC)return;if(typeof select==='function'&&window.WN_WARM){try{select(window.WN_TOPIC)}catch(e){}var c=document.getElementById('learn');if(c)c.scrollIntoView();return}setTimeout(go,60)}
window.addEventListener('load',go);
/* file: pages can't load <track> files directly, so captions come from reels/captions.js as same-origin blob URLs */
function cap(t){var m=(t.getAttribute('src')||'').match(/reels\/([^\/]+)\.vtt$/);if(!m||!window.WN_VTT||!WN_VTT[m[1]])return;t.src=URL.createObjectURL(new Blob([WN_VTT[m[1]]],{type:'text/vtt'}))}
new MutationObserver(function(ms){ms.forEach(function(r){r.addedNodes.forEach(function(n){if(n.querySelectorAll){if(n.tagName==='TRACK')cap(n);n.querySelectorAll('track').forEach(cap)}})})}).observe(document.documentElement,{childList:true,subtree:true})})();</script><script src="reels/captions.js"></script>"""

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--web"); ap.add_argument("--ref", default="main"); ap.add_argument("--no-reels", action="store_true")
    a = ap.parse_args(); tmp = tempfile.mkdtemp()
    src = a.web or tmp
    if not a.web: print("downloading", REPO, "@", a.ref); fetch_tree(a.ref, tmp, only=["out/viewer.html", "out/wn/", "learn/reels/", "learn/lessons/"])
    viewer = open(os.path.join(src, "out/viewer.html"), encoding="utf-8").read()
    assert "wn/app.js" in viewer, "out/viewer.html is not the split web build"
    os.makedirs(OUT, exist_ok=True)
    shutil.rmtree(os.path.join(OUT, "wn"), ignore_errors=True); shutil.copytree(os.path.join(src, "out/wn"), os.path.join(OUT, "wn"))
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(viewer.replace("<head>", "<head>" + SHIM, 1))
    lessons, flags = {}, {}
    for f in sorted(os.listdir(os.path.join(src, "learn/lessons"))):
        if not f.endswith(".json"): continue
        L = json.load(open(os.path.join(src, "learn/lessons", f), encoding="utf-8")); tid = L["topicId"]
        lessons[tid] = L.get("title") or L.get("name") or tid
        m = re.search(r'"(flag[a-z]+)"', json.dumps(L))
        if m and m.group(1) in FLAGS: flags[tid] = m.group(1)
    man = json.load(open(os.path.join(src, "learn/reels/manifest.json"), encoding="utf-8"))
    parts = json.load(open(os.path.join(src, "learn/reels/parts.json"), encoding="utf-8"))
    reels = {t: [{"f": r["f"], "t": r["t"], "d": r["d"]} for r in L] for t, L in sorted(man.items())}
    json.dump({"lessons": lessons, "flagships": flags, "reels": reels}, open(os.path.join(OUT, "content.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0, sort_keys=True)
    assert len(flags) == 12, f"expected 12 flagships, found {len(flags)}: {sorted(flags.values())}"
    need = {r["f"] for L in man.values() for r in L}
    print(f"web: {len(os.listdir(os.path.join(OUT, 'wn')))} files in wn/, {len(lessons)} lessons, {len(flags)} flagships, {len(need)} reels in {len(man)} topics")
    if a.no_reels: print("reels skipped (--no-reels)"); return
    rd = os.path.join(OUT, "reels"); os.makedirs(rd, exist_ok=True)
    for k, p in sorted(parts.items()):
        mine = {f for f in p["files"] if f in need}
        if all(os.path.exists(os.path.join(rd, f + e)) for f in mine for e in (".mp4", ".vtt", ".jpg")) and os.path.exists(os.path.join(rd, f".part{k}-{p['sha']}")): continue
        print(f"downloading reels part {k} @ {p['sha'][:7]} ({len(mine)} reels)")
        pt = tempfile.mkdtemp(); fetch_tree(p["sha"], pt)
        for f in mine:
            for e in (".mp4", ".vtt", ".jpg"): shutil.copy2(os.path.join(pt, f + e), os.path.join(rd, f + e))
        for old in [x for x in os.listdir(rd) if x.startswith(f".part{k}-")]: os.remove(os.path.join(rd, old))
        open(os.path.join(rd, f".part{k}-{p['sha']}"), "w").close(); shutil.rmtree(pt)
    for x in os.listdir(rd):
        if not x.startswith(".") and x != "captions.js" and x.rsplit(".", 1)[0] not in need: os.remove(os.path.join(rd, x))
    open(os.path.join(rd, "captions.js"), "w", encoding="utf-8").write("window.WN_VTT=" + json.dumps({f: open(os.path.join(rd, f + ".vtt"), encoding="utf-8").read() for f in sorted(need) if os.path.exists(os.path.join(rd, f + ".vtt"))}, ensure_ascii=False, separators=(",", ":")) + ";\n")
    miss = [f + e for f in sorted(need) for e in (".mp4", ".vtt", ".jpg") if not os.path.exists(os.path.join(rd, f + e))]
    big = [f for f in need if os.path.getsize(os.path.join(rd, f + ".mp4")) >= 2_000_000] if not miss else []
    assert not miss and not big, f"missing {miss[:5]} / over 2 MB {big[:5]}"
    size = sum(os.path.getsize(os.path.join(rd, x)) for x in os.listdir(rd))
    print(f"reels: {len(need)} reels, {size / 1e6:.1f} MB in Resources/Web/reels")
    shutil.rmtree(tmp, ignore_errors=True)

if __name__ == "__main__": main()
