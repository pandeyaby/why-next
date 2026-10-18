import Foundation

/// The answers given for one subject, and when.
public struct SubjectCheck: Codable, Hashable, Sendable {
    public var answers: [Answer]
    public var date: Date
    public init(answers: [Answer], date: Date = Date()) { self.answers = answers; self.date = date.wholeSeconds }
}

/// A child on this device. Only a first name and an age; never leaves the device.
public struct ChildProfile: Codable, Hashable, Identifiable, Sendable {
    public var id: UUID
    public var name: String
    public var age: Int
    public var createdAt: Date
    /// Saved checks keyed by subject id ("algebra", "physics", ...).
    public var checks: [String: SubjectCheck]

    public static let ages = 11...18

    public init(id: UUID = UUID(), name: String, age: Int, createdAt: Date = Date(), checks: [String: SubjectCheck] = [:]) {
        self.id = id
        self.name = TextSoftener.sanitizeName(name)
        self.age = min(max(age, Self.ages.lowerBound), Self.ages.upperBound)
        self.createdAt = createdAt.wholeSeconds
        self.checks = checks
    }
}

/// Everything saved on the device.
public struct FamilyState: Codable, Equatable, Sendable {
    public var formatVersion: Int
    public var children: [ChildProfile]
    public var selectedChildID: UUID?
    public init(formatVersion: Int = 1, children: [ChildProfile] = [], selectedChildID: UUID? = nil) {
        self.formatVersion = formatVersion; self.children = children; self.selectedChildID = selectedChildID
    }
}

/// Saves the family state as one JSON file in the app's private Application Support folder.
/// No accounts, no sync, no network.
public struct FamilyStore: Sendable {
    public let url: URL
    public init(url: URL) { self.url = url }

    /// `<Application Support>/WhyNext/family.json` inside the app's sandbox.
    public static func defaultURL() throws -> URL {
        let base = try FileManager.default.url(for: .applicationSupportDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
        return base.appendingPathComponent("WhyNext", isDirectory: true).appendingPathComponent("family.json")
    }

    static var encoder: JSONEncoder {
        let e = JSONEncoder(); e.dateEncodingStrategy = .iso8601; e.outputFormatting = [.prettyPrinted, .sortedKeys]; return e
    }
    static var decoder: JSONDecoder { let d = JSONDecoder(); d.dateDecodingStrategy = .iso8601; return d }

    /// Returns an empty state when nothing has been saved yet.
    public func load() throws -> FamilyState {
        guard FileManager.default.fileExists(atPath: url.path) else { return FamilyState() }
        return try Self.decoder.decode(FamilyState.self, from: Data(contentsOf: url))
    }

    /// Moves an unreadable file out of the way (so it isn't overwritten) and returns where it went.
    @discardableResult
    public func setAsideUnreadableFile(now: Date = Date()) -> URL? {
        let stamp = Int(now.timeIntervalSince1970)
        let dest = url.deletingLastPathComponent().appendingPathComponent("family.unreadable-\(stamp).json")
        do { try FileManager.default.moveItem(at: url, to: dest); return dest } catch { return nil }
    }

    public func save(_ state: FamilyState) throws {
        try FileManager.default.createDirectory(at: url.deletingLastPathComponent(), withIntermediateDirectories: true)
        var options: Data.WritingOptions = [.atomic]
        #if os(iOS)
            options.insert(.completeFileProtectionUntilFirstUserAuthentication)
        #endif
        try Self.encoder.encode(state).write(to: url, options: options)
    }
}

extension Date {
    /// Dates are saved as ISO 8601 (whole seconds), so keep them at whole seconds in memory too.
    var wholeSeconds: Date { Date(timeIntervalSince1970: timeIntervalSince1970.rounded(.down)) }
}
