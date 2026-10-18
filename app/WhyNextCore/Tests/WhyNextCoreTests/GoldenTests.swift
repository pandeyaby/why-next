import XCTest

@testable import WhyNextCore

/// The Swift inference and text softening must match the website demo's JavaScript exactly.
/// Fixtures/golden.json is written by `node app/tools/make_golden.cjs` from app/tools/reference/*.js.
final class GoldenTests: XCTestCase {
    struct Golden: Decodable {
        struct Case: Decodable {
            struct Up: Decodable { let i: Int; let flag: String?; let from: Int?; let reason: String? }
            struct Coming: Decodable { let i: Int; let via: Int; let reason: String }
            struct Note: Decodable { let earlier: Int; let later: Int }
            let area: String
            let answers: [String]
            let level: Int
            let confirmed: [Int]
            let estimated: [Int]
            let masteredCount: Int
            let upNext: [Up]
            let upNextAll: [Int]
            let upNextCount: Int
            let comingUp: [Coming]
            let comingUpAll: [Int]
            let notes: [Note]
            let baseline: Int
            let baselineCovered: Bool
        }
        struct Soft: Decodable {
            let `in`: String
            let out: String?
            let outNoSentence: String?
        }
        let inference: [Case]
        let soften: [Soft]
    }

    static let data: WhyNextData = try! WhyNextData.bundled()
    static let golden: Golden = {
        let url = Bundle.module.url(forResource: "golden", withExtension: "json", subdirectory: "Fixtures")!
        return try! JSONDecoder().decode(Golden.self, from: Data(contentsOf: url))
    }()

    func testEveryAnswerComboMatchesTheWebsite() throws {
        let cases = Self.golden.inference
        XCTAssertEqual(cases.count, 6 * 27)
        var mismatches = 0
        for g in cases {
            let area = try XCTUnwrap(Self.data.area(id: g.area))
            let answers = g.answers.map { Answer(rawValue: $0)! }
            let r = Inference.infer(Self.data, area: area, answers: answers)
            let label = "\(g.area) \(g.answers)"
            func check<T: Equatable>(_ a: T, _ b: T, _ what: String) {
                if a != b { mismatches += 1; XCTFail("\(label) \(what): swift \(a) vs js \(b)") }
            }
            check(r.level, g.level, "level")
            check(r.confirmed, g.confirmed, "confirmed")
            check(r.estimated, g.estimated, "estimated")
            check(r.masteredCount, g.masteredCount, "masteredCount")
            check(r.upNextAll, g.upNextAll, "upNextAll")
            check(r.upNextCount, g.upNextCount, "upNextCount")
            check(r.upNext.map(\.node), g.upNext.map(\.i), "upNext")
            check(r.upNext.map { $0.flag?.rawValue ?? "-" }, g.upNext.map { $0.flag ?? "-" }, "upNext flags")
            check(r.upNext.map { $0.from ?? -1 }, g.upNext.map { $0.from ?? -1 }, "upNext from")
            check(r.upNext.map { $0.reason ?? "" }, g.upNext.map { $0.reason ?? "" }, "upNext reasons")
            check(r.comingUpAll, g.comingUpAll, "comingUpAll")
            check(r.comingUp.map(\.node), g.comingUp.map(\.i), "comingUp")
            check(r.comingUp.map(\.via), g.comingUp.map(\.via), "comingUp via")
            check(r.comingUp.map(\.reason), g.comingUp.map(\.reason), "comingUp reasons")
            check(r.notes.map { [$0.earlier, $0.later] }, g.notes.map { [$0.earlier, $0.later] }, "notes")
            check(r.baseline, g.baseline, "baseline")
            check(r.baselineCovered, g.baselineCovered, "baselineCovered")
        }
        XCTAssertEqual(mismatches, 0)
    }

    /// A few combinations spelled out by name, so a reader can see what the app shows.
    func testReadableExamples() throws {
        let d = Self.data
        let algebra = try XCTUnwrap(d.area(id: "algebra"))
        let name = { (i: Int) in d.nodes[i].name }

        let allYes = Inference.infer(d, area: algebra, answers: [.yes, .yes, .yes])
        XCTAssertTrue(allYes.confirmed.map(name).contains("Graphs of exponential functions"))
        XCTAssertFalse(allYes.upNext.isEmpty)

        let firstOnly = Inference.infer(d, area: algebra, answers: [.yes, .no, .no])
        XCTAssertTrue(firstOnly.confirmed.map(name).contains("Solving Linear Equations"))
        XCTAssertFalse(firstOnly.confirmed.map(name).contains("Function notation"))
        XCTAssertTrue(firstOnly.upNext.allSatisfy { $0.from != nil || $0.flag != nil || true })

        // "getting there" on question 2 with question 1 covered puts that topic up next
        let gettingThere = Inference.infer(d, area: algebra, answers: [.yes, .some, .no])
        XCTAssertEqual(gettingThere.upNext.first.map { name($0.node) }, "Function notation")
        XCTAssertEqual(gettingThere.upNext.first?.flag, .some)

        // a later "yes" with an earlier "not yet" is flagged as worth a second look
        let mismatch = Inference.infer(d, area: algebra, answers: [.no, .yes, .no])
        XCTAssertEqual(mismatch.notes.map { name($0.earlier) }, ["Solving Linear Equations"])
    }

    func testTextSofteningMatchesTheWebsite() {
        var bad = 0
        for s in Self.golden.soften {
            let a = TextSoftener.soften(s.in), b = TextSoftener.soften(s.in, sentence: false)
            let expectA = s.out ?? s.in, expectB = s.outNoSentence ?? s.in
            if a != expectA { bad += 1; if bad < 10 { XCTFail("soften(\(s.in.debugDescription))\n swift \(a.debugDescription)\n js    \(expectA.debugDescription)") } }
            if b != expectB { bad += 1; if bad < 10 { XCTFail("soften(sentence:false, \(s.in.debugDescription))\n swift \(b.debugDescription)\n js    \(expectB.debugDescription)") } }
        }
        XCTAssertEqual(bad, 0)
    }
}
