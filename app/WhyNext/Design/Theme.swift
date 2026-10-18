import SwiftUI
import WhyNextCore

/// Warm, family-friendly palette. Every colour has a light and a dark variant in Assets.xcassets.
enum Theme {
    static let coral = Color("Coral")  // accent, "Up next"
    static let leaf = Color("Leaf")  // "Mastered" (from your answers)
    static let leafSoft = Color("LeafSoft")  // "Probably in place" (estimated)
    static let sky = Color("Sky")  // "Coming up"
    static let sand = Color("Sand")  // "Later"
    static let canvas = Color("Canvas")  // page background
    static let card = Color("Card")  // card background
    static let honey = Color("Honey")  // kitchen-table highlight

    static func color(for status: TopicStatus) -> Color {
        switch status {
        case .confirmed: return leaf
        case .estimated: return leafSoft
        case .upNext: return coral
        case .comingUp: return sky
        case .later: return sand
        }
    }

    static func symbol(for status: TopicStatus) -> String {
        switch status {
        case .confirmed: return "checkmark.circle.fill"
        case .estimated: return "checkmark.circle"
        case .upNext: return "arrow.right.circle.fill"
        case .comingUp: return "circle.dashed"
        case .later: return "circle"
        }
    }
}

extension Font {
    /// Rounded headings that still follow Dynamic Type.
    static func rounded(_ style: Font.TextStyle, weight: Font.Weight = .bold) -> Font {
        .system(style, design: .rounded, weight: weight)
    }
}
