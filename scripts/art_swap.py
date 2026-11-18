"""Subject icon slots in assets/art/ (flat shapes for now). Swap real icons in as WebP under 150 KB each.
Usage: python3 scripts/art_swap.py [SRC_DIR] (default /workspace/why_art). Files are matched by name stem
(e.g. why-bird-hello.png -> assets/art/why-bird-hello.webp). With --placeholders, (re)draws simple placeholders."""
import os, sys, io
from PIL import Image, ImageDraw
ART = os.path.join(os.path.dirname(__file__), '..', 'assets', 'art')
NAMES = {'subject-maths': 256, 'subject-science': 256, 'subject-english': 256, 'subject-computing': 256,
         'subject-learning-to-learn': 256, 'subject-personal-social': 256}
LIMIT = 150 * 1024
def save(img, stem, size):
    img = img.convert('RGBA'); img.thumbnail((size, size), Image.LANCZOS)
    for q in (88, 80, 72, 64, 56, 48, 40, 32):
        b = io.BytesIO(); img.save(b, 'WEBP', quality=q, method=6)
        if b.tell() <= LIMIT: break
    open(os.path.join(ART, stem + '.webp'), 'wb').write(b.getvalue()); return b.tell()
SHAPES = {'subject-maths': ('square', (42, 75, 160)), 'subject-science': ('circle', (47, 107, 58)), 'subject-english': ('triangle', (184, 67, 28)),
          'subject-computing': ('diamond', (61, 69, 86)), 'subject-learning-to-learn': ('circle', (138, 90, 0)), 'subject-personal-social': ('square', (122, 62, 122))}
def placeholder(stem, size):
    """A flat shape in the subject colour: no character, no gradient."""
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0)); d = ImageDraw.Draw(im); m = size // 5; e = size - m; c = size // 2
    kind, col = SHAPES[stem]
    if kind == 'square': d.rounded_rectangle([m, m, e, e], radius=size // 12, fill=col)
    elif kind == 'circle': d.ellipse([m, m, e, e], fill=col)
    elif kind == 'triangle': d.polygon([(c, m), (e, e), (m, e)], fill=col)
    else: d.polygon([(c, m), (e, c), (c, e), (m, c)], fill=col)
    return im
if __name__ == '__main__':
    os.makedirs(ART, exist_ok=True)
    if '--placeholders' in sys.argv:
        for s, z in NAMES.items(): print(s, save(placeholder(s, z), s, z))
        sys.exit()
    src = next((a for a in sys.argv[1:] if not a.startswith('-')), '/workspace/why_art')
    for f in sorted(os.listdir(src)):
        stem = os.path.splitext(f)[0].lower().replace('_', '-').replace(' ', '-')
        if stem in NAMES: print(stem, save(Image.open(os.path.join(src, f)), stem, NAMES[stem]), 'bytes')
        else: print('skipped (unknown name):', f)
