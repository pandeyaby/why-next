#!/usr/bin/env python3
"""Build the compact, offline data bundle for the Why Next? app.

    python3 app/tools/build_app_data.py [--data DIR] [--out FILE]

DIR defaults to <repo>/out/merged/data (topics.json, dependencies.json, clusters.json,
manifest.json). FILE defaults to app/WhyNextCore/Sources/WhyNextCore/Resources/whynext-data.json.

The demo part (subjects, 3 check questions per subject, topics with their real prerequisite
reasons, cluster summaries, kitchen-table ideas) mirrors site/build/build_data.py on the
site-draft branch, so the same inference (app/tools/reference/infer.js) runs on either file.
Differences from the site build, all additive or cosmetic:
  * deterministic node numbering (the site build numbers nodes in set-iteration order,
    which changes with PYTHONHASHSEED); here nodes are numbered in sorted-id order;
  * "xd": descriptions for the prerequisite topics that sit outside the six subjects,
    so the app's topic page can show them too;
  * "credit" and "licences" for the About screen.
Nothing is invented: every topic, reason, prompt, summary and number comes from the dataset.
"""
import argparse, collections, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(HERE)
ROOT = os.path.dirname(APP)

CREDIT = ('Builds on the Marble Skill Taxonomy v1 \u00a9 Generative Spark, Inc. (github.com/withmarbleapp/os-taxonomy), '
          'used under ODbL 1.0 and CC BY-SA 4.0; not affiliated with or endorsed by Generative Spark, Inc.')

# Same subjects and the same three check topics as the website demo (site/build/build_data.py).
AREAS = [
 dict(id='algebra', label='Algebra', icon='\U0001d465', sf='x.squareroot', doms=[('Mathematics','Algebra'),('Mathematics','Functions & Modeling')],
      probes=['Solving Linear Equations','Function notation','Graphs of exponential functions']),
 dict(id='geometry', label='Geometry & trig', icon='\u25b3', sf='triangle', doms=[('Mathematics','Geometry')],
      probes=['Angle sums in triangles and polygons','Trigonometry basics','The unit circle']),
 dict(id='stats', label='Statistics & probability', icon='\u2684', sf='dice', doms=[('Mathematics','Data & Statistics'),('Mathematics','Probability')],
      probes=['Experimental probability','Independent events and the AND rule','Binomial probabilities']),
 dict(id='calculus', label='Calculus', icon='\u222b', sf='function', doms=[('Mathematics','Calculus')],
      probes=['From average to instantaneous rate of change','Differentiating powers of x','Stationary points']),
 dict(id='chemistry', label='Chemistry', icon='\u2697', sf='flask', doms=[('Science','Matter & Materials')],
      probes=['Atoms, Elements & Compounds','Covalent bonding','Functional groups']),
 dict(id='physics', label='Physics', icon='\u269b', sf='atom', doms=[('Science','Forces & Motion'),('Science','Energy'),('Science','Electricity & Circuits'),('Science','Waves, Light & Sound')],
      probes=['Resultant Forces','Acceleration','Projectile motion']),
]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--data', default=os.path.join(ROOT, 'out/merged/data'))
    ap.add_argument('--out', default=os.path.join(APP, 'WhyNextCore/Sources/WhyNextCore/Resources/whynext-data.json'))
    args = ap.parse_args()
    D = args.data
    if not os.path.exists(os.path.join(D, 'topics.json')):
        sys.exit(f'No topics.json in {D}. Pass --data /path/to/out/merged/data')

    TL = json.load(open(os.path.join(D, 'topics.json')))['topics']
    T = {t['id']: t for t in TL}
    E = json.load(open(os.path.join(D, 'dependencies.json')))['dependencies']
    C = json.load(open(os.path.join(D, 'clusters.json')))['clusters']
    MAN = json.load(open(os.path.join(D, 'manifest.json')))

    pre = collections.defaultdict(list); post = collections.defaultdict(set); R = {}
    for e in E:
        pre[e['topicId']].append(e['prerequisiteId']); post[e['prerequisiteId']].add(e['topicId'])
        R[(e['topicId'], e['prerequisiteId'])] = e['reason']

    def clos(x, g):
        s, st = set(), [x]
        while st:
            for y in g[st.pop()]:
                if y not in s: s.add(y); st.append(y)
        return s

    names = collections.Counter(t['name'] for t in TL)
    N = {t['name']: t['id'] for t in TL if names[t['name']] == 1}

    nodes, nidx, domains, didx, reasons, ridx = [], {}, [], {}, [], {}
    def dom_i(d):
        if d not in didx: didx[d] = len(domains); domains.append(d)
        return didx[d]
    def node(i):
        if i not in nidx:
            nidx[i] = len(nodes); t = T[i]
            nodes.append({'n': t['name'], 'a': [t['ageRangeStart'], t['ageRangeEnd']], 'd': dom_i(t['domain'])})
        return nidx[i]
    def reason(s):
        if s not in ridx: ridx[s] = len(reasons); reasons.append(s)
        return ridx[s]
    def cluster_for(t):
        best = None
        for k, c in enumerate(C):
            if c['subject'] == t['subject'] and c['domain'] == t['domain'] and c['ageRangeStart'] <= t['ageRangeStart']:
                if best is None or c['ageRangeStart'] > C[best]['ageRangeStart']: best = k
        return best
    clusters_used = {}
    def cl(k):
        if k is None: return None
        if k not in clusters_used: clusters_used[k] = len(clusters_used)
        return clusters_used[k]

    areas_out, in_area = [], set()
    for A in AREAS:
        S = {i for i, t in T.items() if (t['subject'], t['domain']) in A['doms'] and t['ageRangeEnd'] >= 12}
        pids = [N[p] for p in A['probes']]
        for a, b in zip(pids, pids[1:]):
            assert a in clos(b, pre), f"{A['id']}: probe chain broken {T[a]['name']} -> {T[b]['name']}"
        topics = {}
        for i in sorted(S, key=lambda i: (T[i]['ageRangeStart'], T[i]['name'], i)):
            t = T[i]
            topics[node(i)] = {
                'desc': t['description'],
                'pre': [[node(p), reason(R[(i, p)])] for p in pre[i]],
                'ev': t['evidence'][0] if t['evidence'] else None,
                'q': t['assessmentPrompt'],
                'cl': cl(cluster_for(t)),
                'w': len(clos(i, post) & S),
            }
            in_area.add(i)
        probes = [{'t': node(p), 'q': T[p]['assessmentPrompt'], 'anc': sorted(node(x) for x in sorted(clos(p, pre)))} for p in pids]
        areas_out.append({'id': A['id'], 'label': A['label'], 'icon': A['icon'], 'sf': A['sf'],
                          'domains': [d for _, d in A['doms']], 'count': len(S),
                          'ages': [min(T[i]['ageRangeStart'] for i in S), max(T[i]['ageRangeEnd'] for i in S)],
                          'probes': probes, 'topics': topics})

    inv = {v: k for k, v in clusters_used.items()}
    clusters_out = [{'d': C[inv[j]]['domain'], 'a': C[inv[j]]['ageRangeStart'], 's': C[inv[j]]['summary']} for j in range(len(inv))]

    kitchen = []
    for k, c in enumerate(C):
        if c['ageRangeStart'] < 11 or c['subject'] not in ('Mathematics', 'Science'): continue
        nxt = min([x['ageRangeStart'] for x in C if x['domain'] == c['domain'] and x['subject'] == c['subject'] and x['ageRangeStart'] > c['ageRangeStart']] or [99])
        band = [t for t in TL if t['domain'] == c['domain'] and t['subject'] == c['subject'] and c['ageRangeStart'] <= t['ageRangeStart'] < nxt]
        if not band: continue
        dom = {t['id'] for t in TL if t['domain'] == c['domain']}
        top = max(band, key=lambda t: (len(clos(t['id'], post) & dom), -t['ageRangeStart'], t['name']))
        kitchen.append({'d': c['domain'], 'a': c['ageRangeStart'], 's': c['summary'], 'n': top['name'],
                        'ages': [top['ageRangeStart'], top['ageRangeEnd']], 'q': top['assessmentPrompt'], 'ev': top['evidence']})
    kitchen.sort(key=lambda x: (x['a'], x['d'], x['n']))

    # descriptions for prerequisite topics outside the six subjects (shown on the topic page)
    xd = {nidx[i]: T[i]['description'] for i in sorted(nidx, key=lambda i: nidx[i]) if i not in in_area}

    demo = {'kitchen': kitchen, 'v': MAN['taxonomyVersion'], 'domains': domains, 'nodes': nodes, 'reasons': reasons,
            'clusters': clusters_out, 'areas': areas_out, 'xd': xd, 'credit': CREDIT,
            'licences': ['ODbL 1.0 (database)', 'CC BY-SA 4.0 (content)']}
    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, 'w', encoding='utf-8') as f:
        json.dump(demo, f, ensure_ascii=False, separators=(',', ':'))
        f.write('\n')
    print(os.path.relpath(args.out, ROOT), os.path.getsize(args.out), 'bytes;', len(nodes), 'nodes;', len(reasons), 'reasons;',
          len(kitchen), 'kitchen ideas;', [(a['id'], a['count']) for a in areas_out])


if __name__ == '__main__':
    main()
