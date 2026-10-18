import Foundation

/// Offline search across every topic in the bundle (the six subjects plus their prerequisites).
public struct TopicSearch: Sendable {
    public struct Hit: Sendable, Hashable, Identifiable {
        public var id: Int { node }
        public let node: Int
        public let score: Int
    }

    private struct Entry: Sendable {
        let node: Int
        let name: String
        let words: [String]
        let domain: String
        let description: String
        let age: Int
    }
    private let entries: [Entry]

    public init(data: WhyNextData) {
        entries = data.nodes.indices.map { i in
            let name = Self.fold(data.nodes[i].name)
            return Entry(
                node: i, name: name,
                words: name.split(whereSeparator: { !$0.isLetter && !$0.isNumber }).map(String.init),
                domain: Self.fold(data.domainName(of: i)),
                description: Self.fold(data.description(of: i) ?? ""),
                age: data.nodes[i].ageStart)
        }
    }

    /// Case- and accent-insensitive.
    static func fold(_ s: String) -> String {
        s.folding(options: [.caseInsensitive, .diacriticInsensitive, .widthInsensitive], locale: nil)
    }

    /// Every query word must appear in the name, strand or description. Name matches rank first.
    public func search(_ query: String, limit: Int = 60) -> [Hit] {
        let terms = Self.fold(query).split(whereSeparator: { $0.isWhitespace }).map(String.init)
        guard !terms.isEmpty else { return [] }
        let whole = terms.joined(separator: " ")
        var hits: [(Hit, Int, String)] = []
        for e in entries {
            var score = 0
            var ok = true
            for t in terms {
                if e.words.contains(where: { $0.hasPrefix(t) }) {
                    score += 30
                } else if e.name.contains(t) {
                    score += 20
                } else if e.domain.contains(t) {
                    score += 8
                } else if e.description.contains(t) {
                    score += 4
                } else {
                    ok = false; break
                }
            }
            guard ok else { continue }
            if e.name == whole { score += 200 } else if e.name.hasPrefix(whole) { score += 100 } else if e.name.contains(whole) { score += 40 }
            hits.append((Hit(node: e.node, score: score), e.age, e.name))
        }
        hits.sort { a, b in
            if a.0.score != b.0.score { return a.0.score > b.0.score }
            if a.1 != b.1 { return a.1 < b.1 }
            return a.2 < b.2
        }
        return hits.prefix(limit).map(\.0)
    }
}
