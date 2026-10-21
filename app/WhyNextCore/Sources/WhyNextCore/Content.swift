import Foundation

/// One short video reel: `f` is the file stem in the bundled `Web/reels/` folder (`f.mp4`, `f.vtt`, `f.jpg`).
public struct Reel: Decodable, Sendable, Hashable, Identifiable {
    public let file: String
    public let title: String
    public let seconds: Int
    public var id: String { file }

    enum CodingKeys: String, CodingKey { case f, t, d }
    public init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        file = try c.decode(String.self, forKey: .f)
        title = try c.decode(String.self, forKey: .t)
        seconds = try c.decode(Int.self, forKey: .d)
    }
    public init(file: String, title: String, seconds: Int) {
        self.file = file; self.title = title; self.seconds = seconds
    }
}

/// The offline lessons and reels synced from the web build by `tools/sync_content.py` (`Web/content.json`).
public struct BundledContent: Decodable, Sendable {
    /// topic id -> lesson title, for every topic with an interactive lesson in `Web/`.
    public let lessons: [String: String]
    /// topic id -> flagship visual type (the 12 hand-built interactive lessons).
    public let flagships: [String: String]
    /// topic id -> reels for that topic.
    public let reels: [String: [Reel]]

    public static let empty = BundledContent(lessons: [:], flagships: [:], reels: [:])
    public init(lessons: [String: String], flagships: [String: String], reels: [String: [Reel]]) {
        self.lessons = lessons; self.flagships = flagships; self.reels = reels
    }
    public static func load(from url: URL) throws -> BundledContent {
        try JSONDecoder().decode(BundledContent.self, from: Data(contentsOf: url))
    }
    public func hasLesson(_ topicId: String?) -> Bool { topicId.map { lessons[$0] != nil } ?? false }
    public func isFlagship(_ topicId: String?) -> Bool { topicId.map { flagships[$0] != nil } ?? false }
    public func reels(for topicId: String?) -> [Reel] { topicId.flatMap { reels[$0] } ?? [] }
}

/// Picks reels like the website: each visit shows one the learner hasn't seen yet (at random),
/// "Another reel" moves to the next unseen one, and once every reel has been seen the rotation restarts.
public enum ReelRotation {
    /// Returns the reel to show and the updated set of seen files for this topic.
    public static func pick<G: RandomNumberGenerator>(
        from reels: [Reel], seen: Set<String>, avoiding current: String? = nil, using rng: inout G
    ) -> (reel: Reel, seen: Set<String>)? {
        guard !reels.isEmpty else { return nil }
        var seen = seen.intersection(reels.map(\.file))
        var pool = reels.filter { !seen.contains($0.file) && $0.file != current }
        if pool.isEmpty {
            seen = []
            pool = reels.filter { $0.file != current }
            if pool.isEmpty { pool = reels }
        }
        let r = pool.randomElement(using: &rng)!
        seen.insert(r.file)
        return (r, seen)
    }
    public static func pick(from reels: [Reel], seen: Set<String>, avoiding current: String? = nil) -> (reel: Reel, seen: Set<String>)? {
        var g = SystemRandomNumberGenerator()
        return pick(from: reels, seen: seen, avoiding: current, using: &g)
    }
}

/// A WebVTT caption cue.
public struct Cue: Sendable, Hashable {
    public let start: Double
    public let end: Double
    public let text: String
}

/// A small WebVTT reader for the reels' captions (cue timings and text; no styling).
public enum WebVTT {
    public static func parse(_ s: String) -> [Cue] {
        var cues: [Cue] = []
        let blocks = s.replacingOccurrences(of: "\r\n", with: "\n").components(separatedBy: "\n\n")
        for b in blocks {
            let lines = b.split(separator: "\n", omittingEmptySubsequences: true).map(String.init)
            guard let i = lines.firstIndex(where: { $0.contains("-->") }) else { continue }
            let parts = lines[i].components(separatedBy: "-->")
            guard parts.count == 2, let a = time(parts[0]), let e = time(parts[1].split(separator: " ").first.map(String.init) ?? "") else { continue }
            let text = lines[(i + 1)...].joined(separator: "\n")
            if !text.isEmpty { cues.append(Cue(start: a, end: e, text: text)) }
        }
        return cues
    }
    /// "00:00:03.920" or "00:03.920" -> seconds.
    public static func time(_ s: String) -> Double? {
        let f = s.trimmingCharacters(in: .whitespaces).split(separator: ":").map { Double($0) }
        guard !f.isEmpty, f.allSatisfy({ $0 != nil }) else { return nil }
        return f.compactMap { $0 }.reduce(0) { $0 * 60 + $1 }
    }
    /// The caption showing at time t, if any.
    public static func text(at t: Double, in cues: [Cue]) -> String? {
        cues.first { t >= $0.start && t < $0.end }?.text
    }
}
