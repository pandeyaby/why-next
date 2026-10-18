import Foundation

/// Display-only tidying of dataset text, ported from the website's soften.js (plain text, no HTML):
/// English Key Stage references become ages, "Year 9" gets its age, and sentences get a capital
/// letter and a full stop. The dataset itself is untouched.
public enum TextSoftener {
    private static let keyStages: [Int: (ages: String, adjective: String)] = [
        1: ("5–7", "early-primary"), 2: ("7–11", "primary"), 3: ("11–14", "early-secondary"), 4: ("14–16", "mid-secondary"),
    ]
    private static func regex(_ p: String, _ o: NSRegularExpression.Options = []) -> NSRegularExpression {
        // Patterns are constants; a failure here is a programming error caught by the tests.
        try! NSRegularExpression(pattern: p, options: o)
    }
    private static let usBefore = regex(#"\bUS (KS[1-4])\b"#)
    private static let usAfter = regex(#"\b(KS[1-4]) US\b"#)
    private static let ks = regex(#"\b(?:(at|from|since|during|by|in) )?(upper )?(?:(an?|the) )?KS([1-4])\b(\s*)"#, .caseInsensitive)
    private static let phraseEnd = regex("^[.,;:)\u{2014}\u{2013}-]|^(as|and|or|is|was|but|so|to|with)\\b", .caseInsensitive)
    private static let year = regex(#"\bYear ([1-9]|1[0-3])\b"#)
    private static let anArticle = regex("^an?$", .caseInsensitive)

    private static func group(_ m: NSTextCheckingResult, _ i: Int, in s: NSString) -> String? {
        let r = m.range(at: i)
        return r.location == NSNotFound ? nil : s.substring(with: r)
    }

    public static func soften(_ text: String, sentence: Bool = true) -> String {
        var s = text
        s = usBefore.stringByReplacingMatches(in: s, range: NSRange(location: 0, length: (s as NSString).length), withTemplate: "$1")
        s = usAfter.stringByReplacingMatches(in: s, range: NSRange(location: 0, length: (s as NSString).length), withTemplate: "$1")
        let ns = s as NSString
        var out = ""
        var last = 0
        for m in ks.matches(in: s, range: NSRange(location: 0, length: ns.length)) {
            let prep = group(m, 1, in: ns), upper = group(m, 2, in: ns), art = group(m, 3, in: ns)
            let k = keyStages[Int(group(m, 4, in: ns) ?? "3") ?? 3]!
            let space = group(m, 5, in: ns) ?? ""
            let end = m.range.location + m.range.length
            let next = ns.substring(from: end)
            let ages = upper != nil ? "9–11" : k.ages
            let endsPhrase = next.isEmpty || phraseEnd.firstMatch(in: next, range: NSRange(location: 0, length: (next as NSString).length)) != nil
            let lead: String, t: String
            if let prep, prep.lowercased() != "in", art == nil {
                lead = prep + " "; t = "ages " + ages
            } else if prep != nil, art == nil, endsPhrase {
                lead = "at "; t = "ages " + ages
            } else {
                var a = ""
                if let art {
                    if anArticle.firstMatch(in: art, range: NSRange(location: 0, length: (art as NSString).length)) != nil {
                        a = "aeiou".contains(k.adjective.first!.lowercased()) ? "an" : "a"
                    } else {
                        a = art
                    }
                    let first = String(art.prefix(1))
                    if first == first.uppercased() { a = a.prefix(1).uppercased() + a.dropFirst() }
                }
                lead = (prep.map { $0 + " " } ?? "") + (a.isEmpty ? "" : a + " ")
                t = (upper != nil ? "upper-" : "") + k.adjective + " (ages " + ages + ")"
            }
            out += ns.substring(with: NSRange(location: last, length: m.range.location - last)) + lead + t + space
            last = end
        }
        out += ns.substring(from: last)

        // "Year 9" -> "Year 9 (age 13–14)"
        let yns = out as NSString
        var withYears = ""
        var ylast = 0
        for m in year.matches(in: out, range: NSRange(location: 0, length: yns.length)) {
            let n = Int(yns.substring(with: m.range(at: 1)))!
            withYears += yns.substring(with: NSRange(location: ylast, length: m.range.location - ylast))
            withYears += yns.substring(with: m.range) + " (age \(n + 4)–\(n + 5))"
            ylast = m.range.location + m.range.length
        }
        withYears += yns.substring(from: ylast)
        out = withYears

        if sentence {
            if let f = out.unicodeScalars.first, ("a"..."z").contains(f) {
                out = String(Character(f)).uppercased() + String(out.unicodeScalars.dropFirst())
            }
            let endsWell: (String) -> Bool = { str in
                guard let c = str.trimmingCharacters(in: .whitespacesAndNewlines).last else { return false }
                return ".!?".contains(c)
            }
            let trimmed = out.trimmingCharacters(in: .whitespacesAndNewlines)
            if !(trimmed.last.map { ".!?)".contains($0) } ?? false) && !endsWell(s) {
                while let l = out.last, l.isWhitespace { out.removeLast() }
                out += "."
            }
        }
        return out
    }

    /// Fills in a check question: `{{name}}` becomes the child's name, or "your child".
    public static func personalize(_ prompt: String, name: String?) -> String {
        let soft = soften(prompt)
        let n = sanitizeName(name ?? "")
        if !n.isEmpty { return soft.replacingOccurrences(of: "{{name}}", with: n) }
        var out = soft.replacingOccurrences(of: "{{name}}", with: "your child")
        if out.hasPrefix("your child") { out = "Your child" + out.dropFirst("your child".count) }
        return out
    }

    /// A cluster summary for parents, addressed to this child.
    public static func summary(_ text: String, name: String?) -> String {
        let soft = soften(text)
        let n = sanitizeName(name ?? "")
        if !n.isEmpty, soft.hasPrefix("Your child") { return n + soft.dropFirst("Your child".count) }
        return soft
    }

    /// Letters, marks, apostrophes, spaces and hyphens only (same rule as the website), at most 30 characters.
    public static func sanitizeName(_ raw: String) -> String {
        let kept = raw.unicodeScalars.filter { u in
            u.properties.isAlphabetic || u.properties.generalCategory == .nonspacingMark
                || u.properties.generalCategory == .spacingMark || u.properties.generalCategory == .enclosingMark
                || u == "'" || u == " " || u == "-" || u == "\u{2019}"
        }
        let s = String(String.UnicodeScalarView(kept)).trimmingCharacters(in: .whitespaces)
        return String(s.prefix(30))
    }
}
