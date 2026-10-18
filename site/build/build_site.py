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
KS = {'1': ('5–7', 'early-primary', 'Key Stage 1 in England (Years 1–2), about US kindergarten to grade 1'),
      '2': ('7–11', 'primary', 'Key Stage 2 in England (Years 3–6), about US grades 2–5'),
      '3': ('11–14', 'early-secondary', 'Key Stage 3 in England (Years 7–9), about US grades 6–8'),
      '4': ('14–16', 'mid-secondary', 'Key Stage 4 in England (Years 10–11), about US grades 9–10')}
e = lambda s: html.escape(str(s), quote=True)
def soften(text, sentence=True):
    """Python mirror of assets/soften.js (display only; the dataset is untouched)."""
    s = re.sub(r'\bUS (KS[1-4])\b', r'\1', str(text)); s = re.sub(r'\b(KS[1-4]) US\b', r'\1', s)
    out, last = [], 0
    for m in re.finditer(r'\b(?:(at|from|since|during|by|in) )?(upper )?(?:(an?|the) )?KS([1-4])\b(\s*)', s, re.I):
        prep, upper, art, k, space = m.group(1), m.group(2), m.group(3), KS[m.group(4)], m.group(5)
        nxt = s[m.end():]; ag = '9–11' if upper else k[0]
        ends = (not nxt) or re.match(r'^[.,;:)\u2014\u2013-]|^(as|and|or|is|was|but|so|to|with)\b', nxt, re.I)
        if prep and prep.lower() != 'in' and not art: lead, t = prep + ' ', 'ages ' + ag
        elif prep and not art and ends: lead, t = 'at ', 'ages ' + ag
        else:
            a = ''
            if art:
                a = ('an' if k[1][0] in 'aeiou' else 'a') if re.match(r'^an?$', art, re.I) else art
                if art[0].isupper(): a = a[0].upper() + a[1:]
            lead, t = (prep + ' ' if prep else '') + (a + ' ' if a else ''), ('upper-' if upper else '') + k[1] + ' (ages ' + ag + ')'
        out.append(e(s[last:m.start()]) + e(lead) + f'<span class="ks" title="{e(k[2])}">{e(t)}</span>' + e(space))
        last = m.end()
    out.append(e(s[last:])); h = ''.join(out)
    h = re.sub(r'\bYear ([1-9]|1[0-3])\b', lambda m: f'{m.group(0)} (age {int(m.group(1)) + 4}–{int(m.group(1)) + 5})', h)
    if sentence:
        h = re.sub(r'^((?:<span class="ks" title="[^"]*">)?)([a-z])', lambda m: m.group(1) + m.group(2).upper(), h)
        if not re.search(r'[.!?)]$', s.strip()): h = h.rstrip() + '.'
    return h
rich = soften
personal = lambda q: soften(q).replace('{{name}}', '<span class="who">your child</span>').replace('<span class="who">your child', '<span class="who">Your child', 1 if soften(q).startswith('{{name}}') else 0)
ages = lambda a: f'age\u00a0{a[0]}' if a[0] == a[1] else f'ages\u00a0{a[0]}\u2060–\u2060{a[1]}'
fmt = lambda n: f'{n:,}' if isinstance(n, int) else e(n)

def kitchen_card(x):  # mirrors kitchenCard() in assets/app.js
    return (f'<p class="kt-k">{e(x["d"])} · from age {x["a"]}</p><h3>{e(x["n"])} <span class="age">{ages(x["ages"])}</span></h3>'
            f'<p class="kt-sum">{rich(x["s"])}</p><div class="kt-q"><b>Quick check</b>{personal(x["q"])}</div>'
            '<p class="mini-h">What “got it” looks like</p><ul class="kt-ev">' + ''.join(f'<li>{soften(v, False)}</li>' for v in x['ev']) + '</ul>'
            '<div class="kt-actions"><p class="kt-src">Summary for parents and quick check, both from the map.</p>'
            '<button type="button" class="btn-soft" id="kt-next" hidden>Another idea</button></div>')
k0 = next(i for i, x in enumerate(demo['kitchen']) if x['d'] == S['kitchen']['domain'] and x['a'] == S['kitchen']['clusterAge'])
st = S['step']
tok = {k: fmt(v) for k, v in S.items() if isinstance(v, (int, str))}
tok.update({
  'hero0': e(S['hero'][0]['n']), 'hero0a': S['hero'][0]['a'], 'hero1': e(S['hero'][1]['n']), 'hero1a': S['hero'][1]['a'],
  'hero2': e(S['hero'][2]['n']), 'hero2a': S['hero'][2]['a'], 'hero1why': rich(S['hero'][1]['why']), 'hero2why': rich(S['hero'][2]['why']),
  'stepName': e(st['n']), 'stepAges': f"{st['ages'][0]}–{st['ages'][1]}", 'stepDesc': e(st['desc']), 'stepUnlocks': fmt(st['unlocks']),
  'stepFrom': ''.join(f'<li><b>{e(f["n"])}</b><span>{soften(f["why"])}</span></li>' for f in st['from']),
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
js_soft = open(os.path.join(SITE, 'assets/soften.js'), encoding='utf-8').read()
import base64
font_b64 = base64.b64encode(open(os.path.join(SITE, 'assets/fonts/fraunces-latin-wght.woff2'), 'rb').read()).decode()
ROBOTS = '<meta name="robots" content="noindex">' if '--noindex' in sys.argv else ''
js_app = open(os.path.join(SITE, 'assets/app.js'), encoding='utf-8').read()
multi = (out.replace('<!--ROBOTS-->', ROBOTS)
            .replace('<!--CSS-->', '<link rel="preload" href="assets/fonts/fraunces-latin-wght.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="stylesheet" href="assets/styles.css">')
            .replace('<!--DATA-->', '')
            .replace('<!--JS-->', '<script src="assets/soften.js" defer></script>\n<script src="assets/infer.js" defer></script>\n<script src="assets/app.js" defer></script>'))
open(os.path.join(SITE, 'index.html'), 'w', encoding='utf-8').write(multi)
safe_json = demo_raw.replace('</', '<\\/')
single = (out.replace('<!--ROBOTS-->', ROBOTS).replace('<!--CSS-->', '<style>\n' + css.replace('url("fonts/fraunces-latin-wght.woff2")', 'url(data:font/woff2;base64,' + font_b64 + ')') + '\n</style>')
             .replace('<!--DATA-->', '<script type="application/json" id="whynext-data">' + safe_json + '</script>')
             .replace('<!--JS-->', '<script>\n' + js_soft + '\n</script>\n<script>\n' + js_inf + '\n</script>\n<script>\n' + js_app + '\n</script>'))
dest = '/workspace/why-next-site.html'
open(dest, 'w', encoding='utf-8').write(single)
print('site/index.html', os.path.getsize(os.path.join(SITE, 'index.html')), 'bytes;', dest, os.path.getsize(dest), 'bytes')
