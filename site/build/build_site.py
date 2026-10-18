#!/usr/bin/env python3
"""Build the draft site.
  site/index.html            (uses assets/*.css|js and fetches data/demo.json)
  /workspace/why-next-site.html (single self-contained file: CSS, JS and data inlined)
Run: python3 site/build/build_site.py"""
import json, os, re, html, subprocess, sys
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.dirname(SITE)
subprocess.run([sys.executable, os.path.join(SITE, 'build/build_data.py')], check=True)
S = json.load(open(os.path.join(SITE, 'data/stats.json')))
demo_raw = open(os.path.join(SITE, 'data/demo.json'), encoding='utf-8').read()
demo = json.loads(demo_raw)
std_ext = json.load(open(os.path.join(ROOT, 'out/standards.ext.json')))
new_std = sum(len(c['topics']) for c in std_ext['curricula'])
GLOSS = {'KS1': 'Key Stage 1: ages 5–7 in England', 'KS2': 'Key Stage 2: ages 7–11 in England',
         'KS3': 'Key Stage 3: ages 11–14 in England', 'KS4': 'Key Stage 4: ages 14–16 in England'}
e = lambda s: html.escape(str(s), quote=True)
rich = lambda s: re.sub(r'\bKS[1-4]\b', lambda m: f'<abbr title="{GLOSS[m.group(0)]}">{m.group(0)}</abbr>', e(s))
personal = lambda q: rich(q).replace('{{name}}', '<span class="who">your child</span>')
ages = lambda a: f'age\u00a0{a[0]}' if a[0] == a[1] else f'ages\u00a0{a[0]}\u2060–\u2060{a[1]}'
fmt = lambda n: f'{n:,}' if isinstance(n, int) else e(n)

def kitchen_card(x):  # mirrors kitchenCard() in assets/app.js
    return (f'<p class="kt-k">{e(x["d"])} · from age {x["a"]}</p><h3>{e(x["n"])} <span class="age">{ages(x["ages"])}</span></h3>'
            f'<p class="kt-sum">{rich(x["s"])}</p><div class="kt-q"><b>Quick check</b>{personal(x["q"])}</div>'
            '<p class="mini-h">What “got it” looks like</p><ul class="kt-ev">' + ''.join(f'<li>{rich(v)}</li>' for v in x['ev']) + '</ul>'
            '<div class="kt-actions"><p class="kt-src">Summary for parents and quick check, both from the map.</p>'
            '<button type="button" class="btn-soft" id="kt-next" hidden>Another idea</button></div>')
k0 = next(i for i, x in enumerate(demo['kitchen']) if x['d'] == S['kitchen']['domain'] and x['a'] == S['kitchen']['clusterAge'])
st = S['step']
tok = {k: fmt(v) for k, v in S.items() if isinstance(v, (int, str))}
tok.update({
  'hero0': e(S['hero'][0]['n']), 'hero0a': S['hero'][0]['a'], 'hero1': e(S['hero'][1]['n']), 'hero1a': S['hero'][1]['a'],
  'hero2': e(S['hero'][2]['n']), 'hero2a': S['hero'][2]['a'], 'hero1why': rich(S['hero'][1]['why']), 'hero2why': rich(S['hero'][2]['why']),
  'stepName': e(st['n']), 'stepAges': f"{st['ages'][0]}–{st['ages'][1]}", 'stepDesc': e(st['desc']), 'stepUnlocks': fmt(st['unlocks']),
  'stepFrom': ''.join(f'<li><b>{e(f["n"])}</b><span>{rich(f["why"])}</span></li>' for f in st['from']),
  'kitchenCard': kitchen_card(demo['kitchen'][k0]),
  'newStandards': fmt(new_std),
  'credit': e(S['credit']),
})
tpl = open(os.path.join(SITE, 'src/index.html'), encoding='utf-8').read()
tpl = tpl.replace('id="kt-card" aria-live="polite">', f'id="kt-card" aria-live="polite" data-start="{k0}">')
def fill(m):
    k = m.group(1) or m.group(2)
    if k not in tok: raise KeyError(f'missing token {k}')
    return str(tok[k])
out = re.sub(r'\{\{\{(\w+)\}\}\}|\{\{(\w+)\}\}', fill, tpl)
assert '{{' not in out.replace('{{name}}', ''), 'unfilled token'
css = open(os.path.join(SITE, 'assets/styles.css'), encoding='utf-8').read()
js_inf = open(os.path.join(SITE, 'assets/infer.js'), encoding='utf-8').read()
js_app = open(os.path.join(SITE, 'assets/app.js'), encoding='utf-8').read()
multi = (out.replace('<!--CSS-->', '<link rel="stylesheet" href="assets/styles.css">')
            .replace('<!--DATA-->', '')
            .replace('<!--JS-->', '<script src="assets/infer.js" defer></script>\n<script src="assets/app.js" defer></script>'))
open(os.path.join(SITE, 'index.html'), 'w', encoding='utf-8').write(multi)
safe_json = demo_raw.replace('</', '<\\/')
single = (out.replace('<!--CSS-->', '<style>\n' + css + '\n</style>')
             .replace('<!--DATA-->', '<script type="application/json" id="whynext-data">' + safe_json + '</script>')
             .replace('<!--JS-->', '<script>\n' + js_inf + '\n</script>\n<script>\n' + js_app + '\n</script>'))
dest = '/workspace/why-next-site.html'
open(dest, 'w', encoding='utf-8').write(single)
print('site/index.html', os.path.getsize(os.path.join(SITE, 'index.html')), 'bytes;', dest, os.path.getsize(dest), 'bytes')
