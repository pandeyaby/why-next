import Foundation

/// How sure a parent is that their child has a topic.
public enum Answer: String, Codable, CaseIterable, Sendable, Hashable {
    case yes, some, no

    /// Button label, same wording as the website demo.
    public var label: String {
        switch self {
        case .yes: return "Yes, confidently"
        case .some: return "Getting there"
        case .no: return "Not yet"
        }
    }
}

/// A topic on the map (any topic referenced by the bundle, including prerequisites outside the six subjects).
public struct Node: Decodable, Sendable, Hashable {
    public let name: String
    public let ageStart: Int
    public let ageEnd: Int
    public let domain: Int
    /// The dataset topic id (e.g. "mt_EDgw64OmfA"); links the node to bundled lessons and reels.
    public let topicId: String?

    enum CodingKeys: String, CodingKey { case n, a, d, i }
    public init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        name = try c.decode(String.self, forKey: .n)
        let a = try c.decode([Int].self, forKey: .a)
        guard a.count == 2 else { throw DecodingError.dataCorruptedError(forKey: .a, in: c, debugDescription: "age range must have 2 numbers") }
        ageStart = a[0]; ageEnd = a[1]
        domain = try c.decode(Int.self, forKey: .d)
        topicId = try c.decodeIfPresent(String.self, forKey: .i)
    }
    public init(name: String, ageStart: Int, ageEnd: Int, domain: Int, topicId: String? = nil) {
        self.name = name; self.ageStart = ageStart; self.ageEnd = ageEnd; self.domain = domain; self.topicId = topicId
    }
}

/// One "comes after" link: the prerequisite node and the index of its real reason.
public struct Prerequisite: Sendable, Hashable {
    public let node: Int
    public let reason: Int
}

/// Full details for a topic that belongs to one of the six subjects.
public struct Topic: Decodable, Sendable {
    public let description: String
    public let prerequisites: [Prerequisite]
    public let evidence: String?
    public let prompt: String
    public let cluster: Int?
    /// How many later topics in this subject build on it.
    public let weight: Int

    enum CodingKeys: String, CodingKey { case desc, pre, ev, q, cl, w }
    public init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        description = try c.decode(String.self, forKey: .desc)
        let pre = try c.decode([[Int]].self, forKey: .pre)
        prerequisites = try pre.map { pair in
            guard pair.count == 2 else { throw DecodingError.dataCorruptedError(forKey: .pre, in: c, debugDescription: "pre entries are [node, reason]") }
            return Prerequisite(node: pair[0], reason: pair[1])
        }
        evidence = try c.decodeIfPresent(String.self, forKey: .ev)
        prompt = try c.decode(String.self, forKey: .q)
        cluster = try c.decodeIfPresent(Int.self, forKey: .cl)
        weight = try c.decode(Int.self, forKey: .w)
    }
}

/// One of the three check questions for a subject.
public struct Probe: Decodable, Sendable {
    public let topic: Int
    public let prompt: String
    /// Every topic this one rests on (sorted node indices).
    public let ancestors: [Int]
    enum CodingKeys: String, CodingKey { case t, q, anc }
    public init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        topic = try c.decode(Int.self, forKey: .t)
        prompt = try c.decode(String.self, forKey: .q)
        ancestors = try c.decode([Int].self, forKey: .anc)
    }
}

/// A subject ("area") with its check questions and its topics.
public struct Area: Decodable, Sendable, Identifiable {
    public let id: String
    public let label: String
    public let icon: String
    /// SF Symbol name used by the app.
    public let symbol: String
    public let domains: [String]
    public let count: Int
    public let ageStart: Int
    public let ageEnd: Int
    public let probes: [Probe]
    public let topics: [Int: Topic]
    /// Topic node indices in ascending order (the order the website's inference iterates them in).
    public let topicIDs: [Int]

    enum CodingKeys: String, CodingKey { case id, label, icon, sf, domains, count, ages, probes, topics }
    public init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id = try c.decode(String.self, forKey: .id)
        label = try c.decode(String.self, forKey: .label)
        icon = try c.decode(String.self, forKey: .icon)
        symbol = try c.decodeIfPresent(String.self, forKey: .sf) ?? "book"
        domains = try c.decode([String].self, forKey: .domains)
        count = try c.decode(Int.self, forKey: .count)
        let ages = try c.decode([Int].self, forKey: .ages)
        ageStart = ages.first ?? 11; ageEnd = ages.last ?? 18
        probes = try c.decode([Probe].self, forKey: .probes)
        let raw = try c.decode([String: Topic].self, forKey: .topics)
        var t: [Int: Topic] = [:]
        for (k, v) in raw {
            guard let i = Int(k) else { throw DecodingError.dataCorruptedError(forKey: .topics, in: c, debugDescription: "topic key \(k) is not a number") }
            t[i] = v
        }
        topics = t
        topicIDs = t.keys.sorted()
    }

    public func contains(_ node: Int) -> Bool { topics[node] != nil }
}

/// A parent-facing summary of a stage in one strand ("cluster").
public struct Cluster: Decodable, Sendable {
    public let domain: String
    public let ageStart: Int
    public let summary: String
    enum CodingKeys: String, CodingKey { case d, a, s }
    public init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        domain = try c.decode(String.self, forKey: .d)
        ageStart = try c.decode(Int.self, forKey: .a)
        summary = try c.decode(String.self, forKey: .s)
    }
}

/// A kitchen-table idea: a real cluster summary paired with the most load-bearing topic in that band.
public struct KitchenIdea: Decodable, Sendable, Identifiable {
    public var id: String { "\(domain)|\(fromAge)|\(topicName)" }
    public let domain: String
    public let fromAge: Int
    public let summary: String
    public let topicName: String
    public let ageStart: Int
    public let ageEnd: Int
    public let prompt: String
    public let evidence: [String]
    enum CodingKeys: String, CodingKey { case d, a, s, n, ages, q, ev }
    public init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        domain = try c.decode(String.self, forKey: .d)
        fromAge = try c.decode(Int.self, forKey: .a)
        summary = try c.decode(String.self, forKey: .s)
        topicName = try c.decode(String.self, forKey: .n)
        let ages = try c.decode([Int].self, forKey: .ages)
        ageStart = ages.first ?? fromAge; ageEnd = ages.last ?? fromAge
        prompt = try c.decode(String.self, forKey: .q)
        evidence = try c.decode([String].self, forKey: .ev)
    }
}

/// Everything the app shows, loaded from the bundled `whynext-data.json`.
public struct WhyNextData: Decodable, Sendable {
    public let version: String
    public let domains: [String]
    public let nodes: [Node]
    public let reasons: [String]
    public let clusters: [Cluster]
    public let areas: [Area]
    public let kitchen: [KitchenIdea]
    /// Descriptions for prerequisite topics outside the six subjects.
    public let extraDescriptions: [Int: String]
    public let credit: String
    public let licences: [String]

    enum CodingKeys: String, CodingKey { case v, domains, nodes, reasons, clusters, areas, kitchen, xd, credit, licences }
    public init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        if let s = try? c.decode(String.self, forKey: .v) {
            version = s
        } else if let n = try? c.decode(Double.self, forKey: .v) {
            version = n == n.rounded() ? String(Int(n)) : String(n)
        } else {
            version = ""
        }
        domains = try c.decode([String].self, forKey: .domains)
        nodes = try c.decode([Node].self, forKey: .nodes)
        reasons = try c.decode([String].self, forKey: .reasons)
        clusters = try c.decode([Cluster].self, forKey: .clusters)
        areas = try c.decode([Area].self, forKey: .areas)
        kitchen = try c.decode([KitchenIdea].self, forKey: .kitchen)
        let xd = try c.decodeIfPresent([String: String].self, forKey: .xd) ?? [:]
        var x: [Int: String] = [:]
        for (k, v) in xd { if let i = Int(k) { x[i] = v } }
        extraDescriptions = x
        credit = try c.decode(String.self, forKey: .credit)
        licences = try c.decodeIfPresent([String].self, forKey: .licences) ?? []
    }

    public enum LoadError: Error, CustomStringConvertible {
        case missingResource
        public var description: String { "The bundled whynext-data.json is missing." }
    }

    /// Decodes the data that ships inside the WhyNextCore bundle.
    public static func bundled() throws -> WhyNextData {
        guard let url = Bundle.module.url(forResource: "whynext-data", withExtension: "json") else { throw LoadError.missingResource }
        return try load(from: Data(contentsOf: url))
    }

    public static func load(from json: Data) throws -> WhyNextData {
        try JSONDecoder().decode(WhyNextData.self, from: json)
    }

    // MARK: - Graph helpers used by the topic page

    public func area(id: String) -> Area? { areas.first { $0.id == id } }

    /// The subject a topic belongs to (nil for prerequisites outside the six subjects).
    public func area(containing node: Int) -> Area? { areas.first { $0.topics[node] != nil } }

    public func topic(_ node: Int) -> Topic? {
        for a in areas { if let t = a.topics[node] { return t } }
        return nil
    }

    public func domainName(of node: Int) -> String {
        let d = nodes[node].domain
        return domains.indices.contains(d) ? domains[d] : ""
    }

    public func description(of node: Int) -> String? { topic(node)?.description ?? extraDescriptions[node] }

    public struct Link: Sendable, Hashable, Identifiable {
        public var id: Int { node }
        public let node: Int
        public let reason: String
    }

    /// What a topic comes after, each with the dataset's reason.
    public func prerequisites(of node: Int) -> [Link] {
        guard let t = topic(node) else { return [] }
        return t.prerequisites.map { Link(node: $0.node, reason: reasons[$0.reason]) }
    }

    /// Topics (in any of the six subjects) that list this one as a prerequisite, youngest first.
    public func unlocks(_ node: Int) -> [Link] {
        var out: [Link] = []
        var seen = Set<Int>()
        for a in areas {
            for i in a.topicIDs {
                guard let t = a.topics[i], !seen.contains(i) else { continue }
                if let p = t.prerequisites.first(where: { $0.node == node }) {
                    out.append(Link(node: i, reason: reasons[p.reason])); seen.insert(i)
                }
            }
        }
        return out.sorted { (nodes[$0.node].ageStart, nodes[$0.node].name) < (nodes[$1.node].ageStart, nodes[$1.node].name) }
    }

    public func cluster(for node: Int) -> Cluster? {
        guard let c = topic(node)?.cluster, clusters.indices.contains(c) else { return nil }
        return clusters[c]
    }

    /// "age 12" or "ages 12–14".
    public func ageText(_ node: Int) -> String { Self.ageText(nodes[node].ageStart, nodes[node].ageEnd) }
    public static func ageText(_ a: Int, _ b: Int) -> String { a == b ? "age \(a)" : "ages \(a)–\(b)" }
}
