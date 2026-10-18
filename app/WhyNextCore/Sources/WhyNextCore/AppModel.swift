import Foundation
import Observation

/// App state shared by every screen: the bundled data, the children on this device and their saved checks.
@MainActor
@Observable
public final class AppModel {
    public let data: WhyNextData
    public let search: TopicSearch
    public private(set) var family: FamilyState
    /// Last save/load problem, shown to the user. nil when all is well.
    public var storageError: String?

    @ObservationIgnored private let store: FamilyStore?
    @ObservationIgnored private var cache: [String: InferenceResult] = [:]

    public init(data: WhyNextData, store: FamilyStore?) {
        self.data = data
        self.search = TopicSearch(data: data)
        self.store = store
        var loaded = FamilyState()
        if let store {
            do { loaded = try store.load() } catch {
                let kept = store.setAsideUnreadableFile()
                storageError =
                    "Saved progress couldn’t be read, so the app started fresh."
                    + (kept.map { " The old file was kept as \($0.lastPathComponent)." } ?? "")
            }
        }
        self.family = loaded
        if family.selectedChildID == nil || !family.children.contains(where: { $0.id == family.selectedChildID }) {
            family.selectedChildID = family.children.first?.id
        }
    }

    /// The model the app uses: bundled data, progress saved in Application Support.
    public static func live() throws -> AppModel {
        AppModel(data: try WhyNextData.bundled(), store: try? FamilyStore(url: FamilyStore.defaultURL()))
    }

    // MARK: children

    public var children: [ChildProfile] { family.children }
    public var selectedChild: ChildProfile? { family.children.first { $0.id == family.selectedChildID } }

    @discardableResult
    public func addChild(name: String, age: Int) -> ChildProfile {
        let c = ChildProfile(name: name, age: age)
        family.children.append(c)
        family.selectedChildID = c.id
        persist()
        return c
    }

    public func updateChild(id: UUID, name: String, age: Int) {
        guard let k = family.children.firstIndex(where: { $0.id == id }) else { return }
        let fresh = ChildProfile(id: id, name: name, age: age)
        family.children[k].name = fresh.name
        family.children[k].age = fresh.age
        persist()
    }

    public func deleteChild(id: UUID) {
        family.children.removeAll { $0.id == id }
        if family.selectedChildID == id { family.selectedChildID = family.children.first?.id }
        cache = cache.filter { !$0.key.hasPrefix(id.uuidString) }
        persist()
    }

    public func selectChild(id: UUID) {
        guard family.children.contains(where: { $0.id == id }) else { return }
        family.selectedChildID = id
        persist()
    }

    // MARK: checks

    public func savedCheck(areaID: String, child: ChildProfile? = nil) -> SubjectCheck? {
        (child ?? selectedChild)?.checks[areaID]
    }

    public func recordCheck(areaID: String, answers: [Answer]) {
        guard let id = family.selectedChildID, let k = family.children.firstIndex(where: { $0.id == id }) else { return }
        family.children[k].checks[areaID] = SubjectCheck(answers: answers)
        persist()
    }

    public func clearCheck(areaID: String) {
        guard let id = family.selectedChildID, let k = family.children.firstIndex(where: { $0.id == id }) else { return }
        family.children[k].checks[areaID] = nil
        persist()
    }

    /// Inference for a set of answers (memoised; it's a pure function of subject + answers).
    public func result(area: Area, answers: [Answer]) -> InferenceResult {
        let key = area.id + ":" + answers.map(\.rawValue).joined(separator: ",")
        if let r = cache[key] { return r }
        let r = Inference.infer(data, area: area, answers: answers)
        cache[key] = r
        return r
    }

    /// The saved result for the selected child in a subject, if they've done that check.
    public func savedResult(area: Area) -> InferenceResult? {
        guard let c = savedCheck(areaID: area.id), c.answers.count == area.probes.count else { return nil }
        return result(area: area, answers: c.answers)
    }

    /// Where a topic sits for the selected child (nil if its subject hasn't been checked yet).
    public func status(of node: Int) -> TopicStatus? {
        guard let a = data.area(containing: node), let r = savedResult(area: a) else { return nil }
        return TopicStatus(node: node, in: r)
    }

    /// Kitchen-table ideas that fit the selected child's age (everything from age 11 up to a year ahead).
    public var kitchenIdeasForChild: [KitchenIdea] {
        guard let age = selectedChild?.age else { return data.kitchen }
        let fit = data.kitchen.filter { $0.fromAge <= age + 1 }
        return fit.isEmpty ? data.kitchen : fit
    }

    private func persist() {
        guard let store else { return }
        do { try store.save(family); storageError = nil } catch { storageError = "Progress couldn’t be saved: \(error.localizedDescription)" }
    }
}
