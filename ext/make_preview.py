"""Write out/preview.html: the split build's small HTML page with scripts served from jsDelivr at a fixed commit,
so a phone preview (htmlpreview.github.io) loads ~100 KB up front and lazy-loads lessons, instead of the 8 MB single file.
Usage: python3 ext/make_preview.py <commit-sha>"""
import re, sys
sha = sys.argv[1]; base = f"https://cdn.jsdelivr.net/gh/pandeyaby/why-next@{sha}/out/"
h = open("out/viewer.html").read()
h = h.replace("<head>", f"<head><script>window.WN_BASE='{base}'</script>", 1)
h = re.sub(r'src="wn/', f'src="{base}wn/', h)
open("out/preview.html", "w").write(h); print("out/preview.html ->", base)
