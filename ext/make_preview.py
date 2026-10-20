"""Write out/preview.html: the split build's small HTML page with scripts served from jsDelivr at a fixed commit,
so a phone preview (htmlpreview.github.io) loads ~100 KB up front and lazy-loads lessons, instead of the 8 MB single file.
Usage: python3 ext/make_preview.py <commit-sha>"""
import json, re, sys
sha = sys.argv[1]; base = f"https://cdn.jsdelivr.net/gh/pandeyaby/why-next@{sha}/out/"
h = open("out/viewer.html").read()
h = h.replace("<head>", f"<head><script>window.WN_BASE='{base}'</script>", 1)
# Script tags are replaced by an inline loader: preview hosts such as htmlpreview.github.io re-run inline scripts
# but do not run external deferred ones; scripts created with async=false still run in order.
srcs = re.findall(r'<script defer src="(wn/[^"]+)"></script>', h)
h = re.sub(r'<script defer src="wn/[^"]+"></script>', "", h)
loader = "<script>(function(){var B=window.WN_BASE;" + json.dumps(srcs) + ".forEach(function(u){var s=document.createElement('script');s.src=B+u;s.async=false;document.head.appendChild(s)})})()</script>"
h = h.replace("</body>", loader + "</body>", 1)
open("out/preview.html", "w").write(h); print("out/preview.html ->", base)
