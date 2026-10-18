import SwiftUI
import WhyNextCore

/// A rounded card on the warm page background.
struct Card<Content: View>: View {
    var tint: Color? = nil
    @ViewBuilder var content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 10) { content }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(16)
            .background(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .fill(Theme.card)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .strokeBorder((tint ?? .secondary).opacity(tint == nil ? 0.15 : 0.45), lineWidth: 1)
            )
    }
}

/// Section heading with an icon, read as a heading by VoiceOver.
struct SectionHeader: View {
    let title: String
    let systemImage: String
    var tint: Color = .primary
    var subtitle: String? = nil

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Label {
                Text(title).font(.rounded(.title3))
            } icon: {
                Image(systemName: systemImage).foregroundStyle(tint)
            }
            .accessibilityAddTraits(.isHeader)
            if let subtitle {
                Text(subtitle).font(.subheadline).foregroundStyle(.secondary)
            }
        }
    }
}

/// A small coloured capsule, e.g. "You said: getting there".
struct Chip: View {
    let text: String
    var tint: Color = Theme.coral

    var body: some View {
        Text(text)
            .font(.caption.weight(.semibold))
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(Capsule().fill(tint.opacity(0.18)))
            .foregroundStyle(.primary)
    }
}

/// Where a topic sits for the current child.
struct StatusBadge: View {
    let status: TopicStatus

    var body: some View {
        Label(status.label, systemImage: Theme.symbol(for: status))
            .font(.caption.weight(.semibold))
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(Capsule().fill(Theme.color(for: status).opacity(0.22)))
            .accessibilityLabel("Status: \(status.label)")
    }
}

/// Initial in a warm circle.
struct Avatar: View {
    let name: String
    var size: CGFloat = 34

    var body: some View {
        Text(String(name.prefix(1)).uppercased())
            .font(.system(size: size * 0.45, weight: .bold, design: .rounded))
            .foregroundStyle(.white)
            .frame(width: size, height: size)
            .background(Circle().fill(LinearGradient(colors: [Theme.coral, Theme.honey], startPoint: .topLeading, endPoint: .bottomTrailing)))
            .accessibilityHidden(true)
    }
}

/// A tappable topic row: name, ages and (optionally) a reason.
struct TopicRow: View {
    @Environment(AppModel.self) private var model
    let node: Int
    var reason: String? = nil
    var showsStatus = true

    var body: some View {
        let n = model.data.nodes[node]
        let status = showsStatus ? model.status(of: node) : nil
        HStack(alignment: .firstTextBaseline, spacing: 10) {
            if let status {
                Image(systemName: Theme.symbol(for: status))
                    .foregroundStyle(Theme.color(for: status))
                    .accessibilityHidden(true)
            }
            VStack(alignment: .leading, spacing: 3) {
                Text(n.name).font(.body.weight(.medium)).foregroundStyle(.primary)
                Text(model.data.ageText(node).capitalizedFirst + " · " + model.data.domainName(of: node))
                    .font(.caption).foregroundStyle(.secondary)
                if let reason {
                    Text(TextSoftener.soften(reason)).font(.callout).foregroundStyle(.secondary)
                }
            }
            Spacer(minLength: 0)
        }
        .accessibilityElement(children: .combine)
        .accessibilityValue(status?.label ?? "")
    }
}

extension String {
    var capitalizedFirst: String { prefix(1).uppercased() + dropFirst() }
}

/// Builds text with bold runs without parsing Markdown, so dataset text is never misread as formatting.
enum Rich {
    static func text(_ parts: [(String, Bool)]) -> AttributedString {
        var out = AttributedString()
        for (s, bold) in parts {
            var a = AttributedString(s)
            if bold { a.inlinePresentationIntent = .stronglyEmphasized }
            out += a
        }
        return out
    }
}
