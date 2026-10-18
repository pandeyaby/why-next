import XCTest

@testable import WhyNextCore

final class DataTests: XCTestCase {
    let d = try! WhyNextData.bundled()

    func testBundleShape() {
        XCTAssertEqual(d.areas.map(\.id), ["algebra", "geometry", "stats", "calculus", "chemistry", "physics"])
        for a in d.areas {
            XCTAssertEqual(a.probes.count, 3, a.id)
            XCTAssertEqual(a.topics.count, a.count, a.id)
            for p in a.probes { XCTAssertNotNil(a.topics[p.topic], "\(a.id) probe in subject") }
            for (_, t) in a.topics {
                for p in t.prerequisites {
                    XCTAssertTrue(d.nodes.indices.contains(p.node))
                    XCTAssertTrue(d.reasons.indices.contains(p.reason))
                    XCTAssertFalse(d.reasons[p.reason].isEmpty, "every link has a real reason")
                }
                if let c = t.cluster { XCTAssertTrue(d.clusters.indices.contains(c)) }
            }
        }
        XCTAssertFalse(d.kitchen.isEmpty)
        XCTAssertTrue(d.credit.contains("Marble Skill Taxonomy v1"))
        XCTAssertTrue(d.credit.contains("not affiliated with or endorsed by Generative Spark, Inc."))
        // every node has a description somewhere
        for i in d.nodes.indices { XCTAssertNotNil(d.description(of: i), d.nodes[i].name) }
    }

    func testPrerequisitesAndUnlocksAreInverse() throws {
        let n = try XCTUnwrap(d.nodes.firstIndex { $0.name == "Covalent bonding" })
        let pre = d.prerequisites(of: n)
        XCTAssertFalse(pre.isEmpty)
        for p in pre { XCTAssertTrue(d.unlocks(p.node).contains { $0.node == n && $0.reason == p.reason }) }
        XCTAssertFalse(d.unlocks(n).isEmpty)
    }

    func testSearch() throws {
        let s = TopicSearch(data: d)
        let hits = s.search("quadratic")
        XCTAssertFalse(hits.isEmpty)
        XCTAssertTrue(d.nodes[hits[0].node].name.lowercased().contains("quadratic"))
        XCTAssertEqual(d.nodes[s.search("covalent bonding")[0].node].name, "Covalent bonding")
        XCTAssertFalse(s.search("COVALENT").isEmpty, "case-insensitive")
        XCTAssertTrue(s.search("   ").isEmpty)
        XCTAssertTrue(s.search("zzzzqqq").isEmpty)
    }

    func testPersonalize() {
        let q = "If {{name}} is given an equation like 3x + 7 = 22, can they work through the steps to find the value of x?"
        XCTAssertEqual(TextSoftener.personalize(q, name: "Maya"), "If Maya is given an equation like 3x + 7 = 22, can they work through the steps to find the value of x?")
        XCTAssertEqual(TextSoftener.personalize("{{name}} can do it", name: nil), "Your child can do it.")
        XCTAssertEqual(TextSoftener.personalize("{{name}} can do it", name: "  "), "Your child can do it.")
        XCTAssertEqual(TextSoftener.summary("Your child is starting algebra.", name: "Ravi"), "Ravi is starting algebra.")
        XCTAssertEqual(TextSoftener.sanitizeName(" Zoë-Anne O'Neil <script>1 "), "Zoë-Anne O'Neil script")
    }
}

final class FamilyStoreTests: XCTestCase {
    func tempURL() -> URL {
        FileManager.default.temporaryDirectory.appendingPathComponent("whynext-\(UUID().uuidString)").appendingPathComponent("family.json")
    }

    func testRoundTripAndClamping() throws {
        let store = FamilyStore(url: tempURL())
        XCTAssertEqual(try store.load(), FamilyState())
        var state = FamilyState()
        let a = ChildProfile(name: "Maya", age: 25, checks: ["algebra": SubjectCheck(answers: [.yes, .some, .no], date: Date(timeIntervalSince1970: 1_800_000_000))])
        let b = ChildProfile(name: "Ravi", age: 3)
        XCTAssertEqual(a.age, 18); XCTAssertEqual(b.age, 11)
        state.children = [a, b]; state.selectedChildID = b.id
        try store.save(state)
        XCTAssertEqual(try store.load(), state)
    }

    // XCTest on Linux can't run @MainActor test methods directly; tests run on the main thread.
    func testAppModelMultipleChildren() throws { try MainActor.assumeIsolated { try appModelMultipleChildren() } }
    @MainActor func appModelMultipleChildren() throws {
        let url = tempURL()
        let data = try WhyNextData.bundled()
        let m = AppModel(data: data, store: FamilyStore(url: url))
        XCTAssertNil(m.selectedChild)
        let maya = m.addChild(name: "Maya", age: 12)
        let ravi = m.addChild(name: "Ravi", age: 15)
        XCTAssertEqual(m.selectedChild?.id, ravi.id)
        m.recordCheck(areaID: "physics", answers: [.yes, .yes, .some])
        m.selectChild(id: maya.id)
        XCTAssertNil(m.savedCheck(areaID: "physics"), "checks are per child")
        m.recordCheck(areaID: "algebra", answers: [.yes, .no, .no])

        // reload from disk
        let m2 = AppModel(data: data, store: FamilyStore(url: url))
        XCTAssertEqual(m2.children.map(\.name), ["Maya", "Ravi"])
        XCTAssertEqual(m2.selectedChild?.id, maya.id)
        XCTAssertEqual(m2.savedCheck(areaID: "algebra")?.answers, [.yes, .no, .no])
        let algebra = try XCTUnwrap(data.area(id: "algebra"))
        let r = try XCTUnwrap(m2.savedResult(area: algebra))
        XCTAssertEqual(m2.status(of: r.upNext[0].node), .upNext)
        XCTAssertEqual(m2.status(of: algebra.probes[0].topic), .confirmed)
        m2.selectChild(id: ravi.id)
        XCTAssertEqual(m2.savedCheck(areaID: "physics")?.answers, [.yes, .yes, .some])
        m2.deleteChild(id: ravi.id)
        XCTAssertEqual(m2.selectedChild?.id, maya.id)
        XCTAssertEqual(AppModel(data: data, store: FamilyStore(url: url)).children.count, 1)
    }

    func testCorruptFileDoesNotCrash() throws { try MainActor.assumeIsolated { try corruptFileDoesNotCrash() } }
    @MainActor func corruptFileDoesNotCrash() throws {
        let url = tempURL()
        try FileManager.default.createDirectory(at: url.deletingLastPathComponent(), withIntermediateDirectories: true)
        try Data("not json".utf8).write(to: url)
        let m = AppModel(data: try WhyNextData.bundled(), store: FamilyStore(url: url))
        XCTAssertNotNil(m.storageError)
        XCTAssertTrue(m.children.isEmpty)
        // the unreadable file is kept aside, not overwritten
        let kept = try FileManager.default.contentsOfDirectory(atPath: url.deletingLastPathComponent().path).filter { $0.hasPrefix("family.unreadable-") }
        XCTAssertEqual(kept.count, 1)
        m.addChild(name: "Maya", age: 12)
        XCTAssertEqual(try FamilyStore(url: url).load().children.count, 1)
    }
}
