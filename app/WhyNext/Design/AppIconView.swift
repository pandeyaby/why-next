import SwiftUI

/// The app icon, drawn in SwiftUI: three stepping stones on a warm gradient, joined by a path
/// that curves up to an arrow ("what's next, and why"). The PNGs in AppIcon.appiconset are
/// rendered from the same design by app/tools/make_icon.py.
struct AppIconView: View {
    var size: CGFloat = 120
    var rounded = true

    var body: some View {
        Canvas { ctx, sz in
            let s = sz.width
            let p = { (x: CGFloat, y: CGFloat) in CGPoint(x: x * s, y: y * s) }
            // stepping-stone path
            var path = Path()
            path.move(to: p(0.22, 0.74))
            path.addQuadCurve(to: p(0.48, 0.56), control: p(0.30, 0.56))
            path.addQuadCurve(to: p(0.72, 0.34), control: p(0.66, 0.56))
            ctx.stroke(path, with: .color(.white.opacity(0.9)), style: StrokeStyle(lineWidth: s * 0.045, lineCap: .round, dash: [s * 0.0, s * 0.075]))
            // arrow head
            var head = Path()
            head.move(to: p(0.64, 0.28))
            head.addLine(to: p(0.78, 0.24))
            head.addLine(to: p(0.76, 0.39))
            ctx.stroke(head, with: .color(.white), style: StrokeStyle(lineWidth: s * 0.05, lineCap: .round, lineJoin: .round))
            // stones: done, done, next
            let stones: [(CGFloat, CGFloat, CGFloat, Bool)] = [(0.22, 0.74, 0.085, true), (0.48, 0.56, 0.075, true), (0.72, 0.34, 0.0, false)]
            for (x, y, r, filled) in stones where r > 0 {
                let rect = CGRect(x: (x - r) * s, y: (y - r) * s, width: 2 * r * s, height: 2 * r * s)
                ctx.fill(Path(ellipseIn: rect), with: .color(filled ? .white : .clear))
            }
        }
        .frame(width: size, height: size)
        .background(
            LinearGradient(
                colors: [Color(red: 1.0, green: 0.55, blue: 0.42), Color(red: 0.98, green: 0.74, blue: 0.36)],
                startPoint: .topLeading, endPoint: .bottomTrailing)
        )
        .clipShape(RoundedRectangle(cornerRadius: rounded ? size * 0.225 : 0, style: .continuous))
        .accessibilityHidden(true)
    }
}

#Preview {
    AppIconView(size: 240).padding()
}
