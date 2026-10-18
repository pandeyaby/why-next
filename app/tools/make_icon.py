#!/usr/bin/env python3
"""Renders the placeholder app icon (same design as WhyNext/Design/AppIconView.swift) and writes
WhyNext/Resources/Assets.xcassets: AppIcon (iOS 1024 + macOS sizes), AccentColor and the
light/dark colour sets used by Theme.swift.  Usage: python3 app/tools/make_icon.py  (needs Pillow)"""
import json, os
from PIL import Image, ImageDraw, ImageFilter

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
XC = os.path.join(APP, 'WhyNext/Resources/Assets.xcassets')
S = 4096  # supersampled canvas

def lerp(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def artwork():
    """Full-bleed square artwork (no transparency)."""
    top, bottom = (255, 140, 107), (250, 189, 92)
    # diagonal gradient, top-left to bottom-right
    g = Image.new('RGB', (S, S))
    gd = ImageDraw.Draw(g)
    for k in range(0, 2 * S, 8):
        c = lerp(top, bottom, k / (2 * S))
        gd.line([(k, 0), (0, k)], fill=c, width=12)
    img = g
    d = ImageDraw.Draw(img)
    P = lambda x, y: (x * S, y * S)
    def quad(p0, c, p1, n=60):
        return [((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p1[0], (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p1[1]) for t in [i / n for i in range(n + 1)]]
    pts = quad(P(0.22, 0.74), P(0.30, 0.56), P(0.48, 0.56)) + quad(P(0.48, 0.56), P(0.66, 0.56), P(0.72, 0.34))[1:]
    # dotted path: dots every ~0.075*S along the curve
    r = 0.045 * S / 2
    acc, last = 0.0, pts[0]
    step = 0.075 * S
    for p in pts[1:]:
        seg = ((p[0] - last[0]) ** 2 + (p[1] - last[1]) ** 2) ** 0.5
        acc += seg
        if acc >= step:
            acc = 0
            d.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=(255, 255, 255))
        last = p
    w = int(0.05 * S)
    head = [P(0.64, 0.28), P(0.78, 0.24), P(0.76, 0.39)]
    d.line(head, fill=(255, 255, 255), width=w, joint='curve')
    for q in (head[0], head[2], head[1]):
        d.ellipse([q[0] - w / 2, q[1] - w / 2, q[0] + w / 2, q[1] + w / 2], fill=(255, 255, 255))
    for x, y, rr in [(0.22, 0.74, 0.085), (0.48, 0.56, 0.075)]:
        d.ellipse([(x - rr) * S, (y - rr) * S, (x + rr) * S, (y + rr) * S], fill=(255, 255, 255))
    return img

def mac_icon(art):
    """macOS icons are not masked by the system: rounded square on the 1024 grid (824 px body)."""
    canvas = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    body = int(S * 824 / 1024); off = (S - body) // 2
    mask = Image.new('L', (body, body), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, body - 1, body - 1], radius=int(body * 0.225), fill=255)
    shadow = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    sm = Image.new('L', (S, S), 0); sm.paste(mask, (off, off + int(S * 0.012)))
    shadow.putalpha(sm.filter(ImageFilter.GaussianBlur(S * 0.012)).point(lambda v: int(v * 0.35)))
    canvas = Image.alpha_composite(canvas, shadow)
    canvas.paste(art.resize((body, body), Image.LANCZOS), (off, off), mask)
    return canvas

def colorset(name, light, dark):
    def comp(hexs):
        r, g, b = (int(hexs[i:i + 2], 16) for i in (0, 2, 4))
        return {'color-space': 'srgb', 'components': {'red': f'{r/255:.3f}', 'green': f'{g/255:.3f}', 'blue': f'{b/255:.3f}', 'alpha': '1.000'}}
    p = os.path.join(XC, f'{name}.colorset'); os.makedirs(p, exist_ok=True)
    json.dump({'colors': [{'idiom': 'universal', 'color': comp(light)},
                          {'idiom': 'universal', 'appearances': [{'appearance': 'luminosity', 'value': 'dark'}], 'color': comp(dark)}],
               'info': {'author': 'xcode', 'version': 1}}, open(os.path.join(p, 'Contents.json'), 'w'), indent=2)

def main():
    os.makedirs(XC, exist_ok=True)
    json.dump({'info': {'author': 'xcode', 'version': 1}}, open(os.path.join(XC, 'Contents.json'), 'w'), indent=2)
    icon = os.path.join(XC, 'AppIcon.appiconset'); os.makedirs(icon, exist_ok=True)
    art = artwork()
    art.resize((1024, 1024), Image.LANCZOS).save(os.path.join(icon, 'icon-ios-1024.png'), optimize=True)
    images = [{'filename': 'icon-ios-1024.png', 'idiom': 'universal', 'platform': 'ios', 'size': '1024x1024'}]
    mac = mac_icon(art)
    for pt in (16, 32, 128, 256, 512):
        for scale in (1, 2):
            px = pt * scale; fn = f'icon-mac-{pt}x{pt}@{scale}x.png'
            mac.resize((px, px), Image.LANCZOS).save(os.path.join(icon, fn), optimize=True)
            images.append({'filename': fn, 'idiom': 'mac', 'scale': f'{scale}x', 'size': f'{pt}x{pt}'})
    json.dump({'images': images, 'info': {'author': 'xcode', 'version': 1}}, open(os.path.join(icon, 'Contents.json'), 'w'), indent=2)
    # palette (light, dark)
    colorset('AccentColor', 'D9573B', 'FF8A6E')
    colorset('Coral', 'D9573B', 'FF8A6E')
    colorset('Leaf', '2F8A52', '63C285')
    colorset('LeafSoft', '9ED3AA', '3F7A52')
    colorset('Sky', '3A7FB8', '7DB7E6')
    colorset('Sand', 'E6D9C6', '4A4239')
    colorset('Canvas', 'FFF8F0', '1A1714')
    colorset('Card', 'FFFFFF', '2A2622')
    colorset('Honey', 'E29A2E', 'F5BC5C')
    print('wrote', os.path.relpath(XC, os.path.dirname(APP)))

if __name__ == '__main__':
    main()
