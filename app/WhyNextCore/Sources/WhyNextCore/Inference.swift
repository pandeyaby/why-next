import Foundation

/// Mastered / Up next / Coming up for one subject, from the three check answers.
///
/// A line-by-line port of the website demo's `infer()` (site/assets/infer.js on the site-draft
/// branch; snapshot in app/tools/reference/infer.js). `swift test` checks that it gives exactly the
/// same results as the JavaScript for every subject and every answer combination.
///
/// Mastered has two tiers:
///  - confirmed: the "yes" topics plus everything they depend on (follows logically from the answers);
///  - estimated: other topics in the same strand that start at a younger age than a "yes" topic
///    (or 2+ years younger in the subject's other strands), unless they sit on or after a
///    "not yet"/"getting there" topic. This is an estimate and the UI says so.
/// Up next = not mastered, every step in this subject already mastered, within ~1 year of the level.
/// Coming up = builds on an up-next topic, at most one other step missing, within ~2 years of the level.
public struct InferenceResult: Sendable, Equatable {
    public struct UpNext: Sendable, Equatable, Hashable {
        public let node: Int
        /// What the parent said about this topic, if it was one of the questions and isn't mastered.
        public let flag: Answer?
        /// The prerequisite it builds on most directly, with the dataset's reason ("Why now?").
        public let from: Int?
        public let reason: String?
    }
    public struct ComingUp: Sendable, Equatable, Hashable {
        public let node: Int
        public let via: Int
        public let reason: String
    }
    public struct Note: Sendable, Equatable, Hashable {
        /// A question answered "getting there"/"not yet" whose topic a later "yes" depends on.
        public let earlier: Int
        public let later: Int
    }

    /// Inferred level, as an age.
    public let level: Int
    public let confirmed: [Int]
    public let estimated: [Int]
    public let masteredCount: Int
    /// Up to four, closest to the child's level first.
    public let upNext: [UpNext]
    public let upNextAll: [Int]
    public let upNextCount: Int
    /// Up to four, at most two hanging off the same up-next topic.
    public let comingUp: [ComingUp]
    public let comingUpAll: [Int]
    public let notes: [Note]
    public let baseline: Int
    public let baselineCovered: Bool
}

public enum Inference {
    /// Lexicographic comparison matching the JS `cmp` (larger keys first).
    static func before(_ ka: [Double], _ kb: [Double]) -> Bool? {
        for k in 0..<min(ka.count, kb.count) where ka[k] != kb[k] { return ka[k] > kb[k] }
        return nil
    }

    /// Stable sort (like Array.prototype.sort in modern JS engines) by descending keys.
    static func stableSorted(_ xs: [Int], key: (Int) -> [Double]) -> [Int] {
        let keyed = xs.enumerated().map { (offset: $0.offset, value: $0.element, key: key($0.element)) }
        return keyed.sorted { a, b in
            if let r = before(a.key, b.key) { return r }
            return a.offset < b.offset
        }.map(\.value)
    }

    // One-letter set names (C, E, M, L, MU) match infer.js so the two can be read side by side.
    public static func infer(_ data: WhyNextData, area: Area, answers: [Answer]) -> InferenceResult {
        precondition(answers.count == area.probes.count, "one answer per question")
        let nodes = data.nodes, topics = area.topics, probes = area.probes, ids = area.topicIDs
        func inArea(_ i: Int) -> Bool { topics[i] != nil }
        func age(_ i: Int) -> Int { nodes[i].ageStart }

        var post: [Int: [Int]] = [:]
        for i in ids { for p in topics[i]!.prerequisites where inArea(p.node) { post[p.node, default: []].append(i) } }
        func below(_ start: Int) -> Set<Int> {  // start plus everything in this subject that builds on it
            var s: Set<Int> = [start]; var st = [start]
            while let x = st.popLast() { for j in post[x] ?? [] where !s.contains(j) { s.insert(j); st.append(j) } }
            return s
        }

        // 1. confirmed
        // swift-format-ignore: AlwaysUseLowerCamelCase
        var C = Set<Int>()
        var notes: [InferenceResult.Note] = []
        C.formUnion(probes[0].ancestors)  // groundwork before question 1 is assumed
        for (k, p) in probes.enumerated() where answers[k] == .yes { C.insert(p.topic); C.formUnion(p.ancestors) }
        for (k, p) in probes.enumerated() where answers[k] != .yes && C.contains(p.topic) {
            if let j = probes.indices.first(where: { $0 > k && answers[$0] == .yes && probes[$0].ancestors.contains(p.topic) }) {
                notes.append(.init(earlier: p.topic, later: probes[j].topic))
            }
        }
        // 2. blocked: a "not yet"/"getting there" topic and everything after it
        var blocked = Set<Int>()
        for (k, p) in probes.enumerated() where answers[k] != .yes && !C.contains(p.topic) { blocked.formUnion(below(p.topic)) }
        // 3. estimated
        // swift-format-ignore: AlwaysUseLowerCamelCase
        var E = Set<Int>()
        for (k, p) in probes.enumerated() where answers[k] == .yes {
            let d = nodes[p.topic].domain, a = age(p.topic)
            for i in ids where !C.contains(i) && !blocked.contains(i) {
                if (nodes[i].domain == d && age(i) < a) || age(i) < a - 1 { E.insert(i) }
            }
        }
        // swift-format-ignore: AlwaysUseLowerCamelCase
        let M = C.union(E)
        // inferred level
        // swift-format-ignore: AlwaysUseLowerCamelCase
        var L = 0
        for (k, p) in probes.enumerated() where answers[k] == .yes || (answers[k] == .some && !C.contains(p.topic)) { L = max(L, age(p.topic)) }
        if L == 0 { L = age(probes[0].topic) }
        let probeDomains = Set(probes.map { nodes[$0.topic].domain })

        // 2 = builds on something they have; 1 = a starting point of this subject they're ready for; 0 = not yet
        func ready(_ i: Int) -> Int {
            var linked = false, anyInArea = false
            for pr in topics[i]!.prerequisites {
                let p = pr.node
                if inArea(p) { anyInArea = true }
                if M.contains(p) { if inArea(p) { linked = true }; continue }
                if inArea(p) { return 0 }
                if age(p) > L { return 0 }  // a step in another subject that is ahead of their level
            }
            if linked { return 2 }
            return (!anyInArea && probeDomains.contains(nodes[i].domain)) ? 1 : 0
        }
        func bestPre(_ i: Int, _ pool: Set<Int>) -> (p: Int, r: String)? {
            var best: (p: Int, r: String, s: Double)?
            for pr in topics[i]!.prerequisites where pool.contains(pr.node) {
                let s =
                    (inArea(pr.node) ? 1000.0 : 0) + (C.contains(pr.node) ? 100.0 : 0) + Double(age(pr.node))
                    + (topics[pr.node].map { Double($0.weight) / 1000 } ?? 0)
                if best == nil || s > best!.s { best = (pr.node, data.reasons[pr.reason], s) }
            }
            return best.map { ($0.p, $0.r) }
        }

        var flagged: [Int: Answer] = [:]
        for (k, p) in probes.enumerated() where !M.contains(p.topic) { flagged[p.topic] = answers[k] }
        var rd: [Int: Int] = [:]
        var frontier = ids.filter { i in
            if M.contains(i) || age(i) > L + 1 { return false }
            let r = ready(i); rd[i] = r; return r > 0
        }
        for (k, p) in probes.enumerated() {  // "getting there" is up next once every earlier question is covered
            let earlierOk = probes[0..<k].allSatisfy { M.contains($0.topic) }
            if answers[k] == .some && earlierOk && !M.contains(p.topic) && !frontier.contains(p.topic) { frontier.append(p.topic); rd[p.topic] = 2 }
        }
        func rankUp(_ i: Int) -> [Double] {
            let f: Double = flagged[i] == .some ? 3 : flagged[i] == .no ? 2 : 0
            let b = bestPre(i, M)
            return [f, Double(rd[i] ?? 0), (b != nil && C.contains(b!.p)) ? 1 : 0, -Double(abs(age(i) - L)), Double(topics[i]!.weight)]
        }
        frontier = stableSorted(frontier, key: rankUp)
        let upShown = Array(frontier.prefix(4)), shownSet = Set(upShown)
        // swift-format-ignore: AlwaysUseLowerCamelCase
        let MU = M.union(frontier)

        var later: [Int] = [], missing: [Int: Int] = [:]
        for i in ids where !MU.contains(i) && age(i) <= L + 2 {
            var viaShown = false, miss = 0
            for pr in topics[i]!.prerequisites {
                let p = pr.node
                if shownSet.contains(p) { viaShown = true }
                if MU.contains(p) { continue }
                if inArea(p) || age(p) > L + 1 { miss += 1 }
            }
            if viaShown && miss <= 1 { later.append(i); missing[i] = miss }
        }
        later = stableSorted(later) { [-Double(missing[$0]!), -Double(age($0)), Double(topics[$0]!.weight)] }
        var per: [Int: Int] = [:], comingUp: [InferenceResult.ComingUp] = []
        for i in later where comingUp.count < 4 {
            guard let via = bestPre(i, shownSet) else { continue }
            per[via.p, default: 0] += 1
            if per[via.p]! <= 2 { comingUp.append(.init(node: i, via: via.p, reason: via.r)) }
        }
        let probeTopics = Set(probes.map(\.topic))
        let confirmed = stableSorted(ids.filter { C.contains($0) }) {
            [probeTopics.contains($0) ? 1 : 0, Double(age($0)), Double(topics[$0]!.weight)]
        }
        let estimated = stableSorted(ids.filter { E.contains($0) }) { [Double(age($0)), Double(topics[$0]!.weight)] }
        return InferenceResult(
            level: L, confirmed: confirmed, estimated: estimated, masteredCount: confirmed.count + estimated.count,
            upNext: upShown.map { i in
                let b = bestPre(i, M)
                return .init(node: i, flag: flagged[i], from: b?.p, reason: b?.r)
            },
            upNextAll: frontier, upNextCount: frontier.count,
            comingUp: comingUp, comingUpAll: later, notes: notes,
            baseline: probes[0].topic, baselineCovered: M.contains(probes[0].topic))
    }
}

/// Where a topic sits for a child, given their saved answers for its subject.
public enum TopicStatus: String, Sendable, Hashable {
    case confirmed, estimated, upNext, comingUp, later

    public var label: String {
        switch self {
        case .confirmed: return "Mastered"
        case .estimated: return "Probably in place"
        case .upNext: return "Up next"
        case .comingUp: return "Coming up"
        case .later: return "Later"
        }
    }

    public init(node: Int, in r: InferenceResult) {
        if r.confirmed.contains(node) {
            self = .confirmed
        } else if r.estimated.contains(node) {
            self = .estimated
        } else if r.upNextAll.contains(node) {
            self = .upNext
        } else if r.comingUpAll.contains(node) {
            self = .comingUp
        } else {
            self = .later
        }
    }
}
