#!/usr/bin/env python3
"""Build site/data/demo.json and site/data/stats.json from out/merged/data (the real merged graph).
Nothing here is invented: every topic, reason, prompt, summary and number is read from the data."""
import json, collections, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
D = os.path.join(ROOT, 'out/merged/data/')
OUT = os.path.join(ROOT, 'site/data/')
os.makedirs(OUT, exist_ok=True)
TL = json.load(open(D + 'topics.json'))['topics']
T = {t['id']: t for t in TL}
E = json.load(open(D + 'dependencies.json'))['dependencies']
C = json.load(open(D + 'clusters.json'))['clusters']
MAN = json.load(open(D + 'manifest.json'))
STD = json.load(open(D + 'curriculum-standards.json'))
EXT_T = json.load(open(os.path.join(ROOT, 'out/topics.ext.json')))
EXT_E = json.load(open(os.path.join(ROOT, 'out/dependencies.ext.json')))
EXT_C = json.load(open(os.path.join(ROOT, 'out/clusters.ext.json')))
def L(x, k):  # unwrap {"topics":[...]} or plain list
    return x[k] if isinstance(x, dict) else x
EXT_T, EXT_E, EXT_C = L(EXT_T, 'topics'), L(EXT_E, 'dependencies'), L(EXT_C, 'clusters')
CREDIT = open(os.path.join(ROOT, 'ext/CREDIT.txt')).read().strip()

pre = collections.defaultdict(list); post = collections.defaultdict(set)
R = {}
for e in E:
    pre[e['topicId']].append(e['prerequisiteId']); post[e['prerequisiteId']].add(e['topicId'])
    R[(e['topicId'], e['prerequisiteId'])] = e['reason']
def clos(x, g):
    s, st = set(), [x]
    while st:
        for y in g[st.pop()]:
            if y not in s: s.add(y); st.append(y)
    return s
_names = collections.Counter(t['name'] for t in TL)
N = {t['name']: t['id'] for t in TL if _names[t['name']] == 1}  # probes must use unique names (KeyError otherwise)

AREAS = [
 dict(id='algebra', label='Algebra', icon='𝑥', doms=[('Mathematics','Algebra'),('Mathematics','Functions & Modeling')],
      probes=['Solving Linear Equations','Function notation','Graphs of exponential functions']),
 dict(id='geometry', label='Geometry & trig', icon='△', doms=[('Mathematics','Geometry')],
      probes=['Angle sums in triangles and polygons','Trigonometry basics','The unit circle']),
 dict(id='stats', label='Statistics & probability', icon='⚄', doms=[('Mathematics','Data & Statistics'),('Mathematics','Probability')],
      probes=['Experimental probability','Independent events and the AND rule','Binomial probabilities']),
 dict(id='calculus', label='Calculus', icon='∫', doms=[('Mathematics','Calculus')],
      probes=['From average to instantaneous rate of change','Differentiating powers of x','Stationary points']),
 dict(id='chemistry', label='Chemistry', icon='⚗', doms=[('Science','Matter & Materials')],
      probes=['Atoms, Elements & Compounds','Covalent bonding','Functional groups']),
 dict(id='physics', label='Physics', icon='⚛', doms=[('Science','Forces & Motion'),('Science','Energy'),('Science','Electricity & Circuits'),('Science','Waves, Light & Sound')],
      probes=['Resultant Forces','Acceleration','Projectile motion']),
]

nodes, nidx = [], {}
domains, didx = [], {}
def dom_i(d):
    if d not in didx: didx[d] = len(domains); domains.append(d)
    return didx[d]
reasons, ridx = [], {}
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

areas_out = []
for A in AREAS:
    S = {i for i, t in T.items() if (t['subject'], t['domain']) in A['doms'] and t['ageRangeEnd'] >= 12}
    pids = [N[p] for p in A['probes']]
    for a, b in zip(pids, pids[1:]):
        assert a in clos(b, pre), f"{A['id']}: probe chain broken {T[a]['name']} -> {T[b]['name']}"
    topics = {}
    for i in sorted(S, key=lambda i: (T[i]['ageRangeStart'], T[i]['name'])):
        t = T[i]
        topics[node(i)] = {
            'desc': t['description'],
            'pre': [[node(p), reason(R[(i, p)])] for p in pre[i]],
            'ev': t['evidence'][0] if t['evidence'] else None,
            'q': t['assessmentPrompt'],
            'cl': cl(cluster_for(t)),
            'w': len(clos(i, post) & S),          # how many later topics in this area build on it
        }
    probes = []
    for p in pids:
        probes.append({'t': node(p), 'q': T[p]['assessmentPrompt'], 'anc': sorted(node(x) for x in clos(p, pre))})
    areas_out.append({'id': A['id'], 'label': A['label'], 'icon': A['icon'],
                      'domains': [d for _, d in A['doms']], 'count': len(S),
                      'ages': [min(T[i]['ageRangeStart'] for i in S), max(T[i]['ageRangeEnd'] for i in S)],
                      'probes': probes, 'topics': topics})

inv = {v: k for k, v in clusters_used.items()}
clusters_out = [{'d': C[inv[j]]['domain'], 'a': C[inv[j]]['ageRangeStart'], 's': C[inv[j]]['summary']} for j in range(len(inv))]

# ---------- stats (all computed) ----------
order = []  # topological order for longest chain
indeg = {i: len(set(pre[i])) for i in T}
q = [i for i in T if indeg[i] == 0]
while q:
    x = q.pop(); order.append(x)
    for y in post[x]:
        indeg[y] -= 1
        if indeg[y] == 0: q.append(y)
assert len(order) == len(T), 'graph must be acyclic'
best = {}; prev = {}
for x in order:
    best[x] = 1; prev[x] = None
    for p in set(pre[x]):
        if best[p] + 1 > best[x]: best[x] = best[p] + 1; prev[x] = p
end = max(best, key=lambda k: best[k]); chain = []
while end: chain.append(T[end]['name']); end = prev[end]
chain.reverse()
teen = [t for t in TL if t['ageRangeEnd'] >= 11]
teen_ms = [t for t in teen if t['subject'] in ('Mathematics', 'Science')]
ext_ids = {t['id'] for t in EXT_T}
stats = {
 'topics': len(TL), 'links': len(E), 'clusters': len(C),
 'subjects': len({t['subject'] for t in TL}),
 'curricula': MAN['counts']['curricula'], 'standards': MAN['counts']['curriculumStandards'],
 'linksWithReason': sum(1 for e in E if e.get('reason', '').strip()),
 'minAge': min(t['ageRangeStart'] for t in TL), 'maxAge': max(t['ageRangeEnd'] for t in TL),
 'newTopics': len(EXT_T), 'newLinks': len(EXT_E), 'newClusters': len(EXT_C),
 'teenTopics': len(teen), 'teenMathsScience': len(teen_ms),
 'teenMaths': sum(1 for t in teen if t['subject'] == 'Mathematics'),
 'teenScience': sum(1 for t in teen if t['subject'] == 'Science'),
 'longestChain': len(chain), 'longestChainFrom': chain[0], 'longestChainTo': chain[-1],
 'crossSubjectLinks': sum(1 for e in E if T[e['topicId']]['subject'] != T[e['prerequisiteId']]['subject']),
 'crossDomainTeenLinks': sum(1 for e in E if T[e['topicId']]['domain'] != T[e['prerequisiteId']]['domain'] and T[e['topicId']]['ageRangeEnd'] >= 11),
 'demoTopics': sum(a['count'] for a in areas_out),
 'credit': CREDIT, 'version': MAN['taxonomyVersion'],
}
assert stats['linksWithReason'] == stats['links']
# hero: a real three-step chain with its two real reasons
h = [N['Solving Linear Equations'], N['Solving quadratics by square roots'], N['Completing the square']]
stats['hero'] = [{'n': T[h[0]]['name'], 'a': T[h[0]]['ageRangeStart']},
                 {'n': T[h[1]]['name'], 'a': T[h[1]]['ageRangeStart'], 'why': R[(h[1], h[0])]},
                 {'n': T[h[2]]['name'], 'a': T[h[2]]['ageRangeStart'], 'why': R[(h[2], h[1])]}]
# kitchen-table sample: a real cluster summary + real topic prompt + evidence
kt = T[N['Function notation']]
stats['kitchen'] = {'summary': C[cluster_for(kt)]['summary'], 'clusterAge': C[cluster_for(kt)]['ageRangeStart'],
                    'domain': kt['domain'], 'topic': kt['name'], 'q': kt['assessmentPrompt'], 'ev': kt['evidence'],
                    'ages': [kt['ageRangeStart'], kt['ageRangeEnd']]}
# sample step card (how it works): a real topic, its real incoming reasons, and how much builds on it
st = T[N['Covalent bonding']]
stats['step'] = {'n': st['name'], 'ages': [st['ageRangeStart'], st['ageRangeEnd']], 'desc': st['description'],
                 'from': [{'n': T[p]['name'], 'why': R[(st['id'], p)]} for p in pre[st['id']]],
                 'unlocks': len(clos(st['id'], post))}
# kitchen-table ideas: every teen maths/science cluster summary, paired with the most load-bearing topic in that band
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
kitchen.sort(key=lambda x: (x['a'], x['d']))
stats['kitchenCount'] = len(kitchen)
demo = {'kitchen': kitchen, 'v': MAN['taxonomyVersion'], 'domains': domains, 'nodes': nodes, 'reasons': reasons, 'clusters': clusters_out, 'areas': areas_out}
json.dump(demo, open(OUT + 'demo.json', 'w'), ensure_ascii=False, separators=(',', ':'))
json.dump(stats, open(OUT + 'stats.json', 'w'), ensure_ascii=False, indent=1)
print('demo.json', os.path.getsize(OUT + 'demo.json'), 'bytes;', len(nodes), 'nodes;', len(reasons), 'reasons')
print(json.dumps({k: v for k, v in stats.items() if k not in ('credit', 'hero', 'kitchen')}, ensure_ascii=False))
print([(a['id'], a['count'], a['ages']) for a in areas_out])
