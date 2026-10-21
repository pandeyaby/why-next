import XCTest

@testable import WhyNextCore

final class ContentTests: XCTestCase {
    func testDecodeContent() throws {
        let json = #"{"lessons":{"mt_a":"Place value"},"flagships":{"mt_a":"flagplace"},"reels":{"mt_a":[{"f":"b001","t":"Times 10.","d":28},{"f":"b002","t":"Zero","d":14}]}}"#
        let c = try JSONDecoder().decode(BundledContent.self, from: Data(json.utf8))
        XCTAssertTrue(c.isFlagship("mt_a")); XCTAssertTrue(c.hasLesson("mt_a")); XCTAssertFalse(c.hasLesson("mt_b")); XCTAssertFalse(c.isFlagship(nil))
        XCTAssertEqual(c.reels(for: "mt_a").map(\.file), ["b001", "b002"]); XCTAssertEqual(c.reels(for: "mt_a")[0].seconds, 28)
        XCTAssertEqual(c.reels(for: "zz"), [])
    }

    func testRotationShowsUnseenThenRestarts() {
        let reels = (1...4).map { Reel(file: "r\($0)", title: "", seconds: 7) }
        var seen: Set<String> = [], shown: [String] = []
        for _ in 0..<4 {
            let p = ReelRotation.pick(from: reels, seen: seen, avoiding: shown.last)!
            XCTAssertFalse(seen.contains(p.reel.file), "always an unseen reel")
            shown.append(p.reel.file); seen = p.seen
        }
        XCTAssertEqual(Set(shown).count, 4)
        let again = ReelRotation.pick(from: reels, seen: seen, avoiding: shown.last)!
        XCTAssertEqual(again.seen, [again.reel.file], "all seen: rotation restarts")
        XCTAssertNotEqual(again.reel.file, shown.last, "never the same reel twice in a row")
        XCTAssertNil(ReelRotation.pick(from: [], seen: []))
        let one = [Reel(file: "x", title: "", seconds: 1)]
        XCTAssertEqual(ReelRotation.pick(from: one, seen: ["x"], avoiding: "x")?.reel.file, "x")
    }

    func testWebVTT() {
        let v = "WEBVTT\n\n00:00:00.000 --> 00:00:03.920\nTimes 10. Does the decimal point jump?\n\n00:00:03.920 --> 00:00:08.160\nLook closer.\nTwo lines.\n"
        let c = WebVTT.parse(v)
        XCTAssertEqual(c.count, 2); XCTAssertEqual(c[1].start, 3.92, accuracy: 1e-9); XCTAssertEqual(c[1].end, 8.16, accuracy: 1e-9)
        XCTAssertEqual(WebVTT.text(at: 1, in: c), "Times 10. Does the decimal point jump?")
        XCTAssertEqual(WebVTT.text(at: 5, in: c), "Look closer.\nTwo lines.")
        XCTAssertNil(WebVTT.text(at: 9, in: c))
        XCTAssertEqual(WebVTT.time("01:02.5"), 62.5)
    }

    /// The real synced bundle (skipped until tools/sync_content.py has run).
    func testSyncedBundleIfPresent() throws {
        let web = URL(fileURLWithPath: #filePath).deletingLastPathComponent().appendingPathComponent("../../../WhyNext/Resources/Web").standardized
        let url = web.appendingPathComponent("content.json")
        guard FileManager.default.fileExists(atPath: url.path) else { throw XCTSkip("no synced content") }
        let c = try BundledContent.load(from: url)
        XCTAssertEqual(c.flagships.count, 12)
        let d = try WhyNextData.bundled(); let ids = Set(d.nodes.compactMap(\.topicId))
        for t in c.flagships.keys { XCTAssertTrue(ids.contains(t), "flagship \(t) is a node on the map") }
        let reelDir = web.appendingPathComponent("reels")
        if FileManager.default.fileExists(atPath: reelDir.path) {
            for r in c.reels.values.flatMap({ $0 }) {
                for e in ["mp4", "vtt", "jpg"] { XCTAssertTrue(FileManager.default.fileExists(atPath: reelDir.appendingPathComponent("\(r.file).\(e)").path), "\(r.file).\(e)") }
                XCTAssertFalse(WebVTT.parse(try String(contentsOf: reelDir.appendingPathComponent("\(r.file).vtt"), encoding: .utf8)).isEmpty, r.file)
            }
        }
    }
}
