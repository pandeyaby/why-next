import SwiftUI
import WhyNextCore

/// Mastered / Up next (with "Why now?") / Coming up, plus a kitchen-table tip. Same wording and
/// logic as the website demo.
struct ResultsView: View {
    @Environment(AppModel.self) private var model
    let area: Area
    let answers: [Answer]
    let date: Date
    var onCheckAgain: () -> Void

    private var name: String? { model.selectedChild?.name }
    private var who: String { name ?? "your child" }
    private var whoCapitalized: String { name ?? "Your child" }
    private var title: String {
        if let name { return "\(name)’s \(subject) map" }
        return "Your child’s \(subject) map"
    }
    private var subject: String { area.label.lowercased() }
    private func n(_ i: Int) -> String { model.data.nodes[i].name }

    var body: some View {
        let r = model.result(area: area, answers: answers)
        VStack(alignment: .leading, spacing: 20) {
            header(r)
            ForEach(r.notes, id: \.self) { note in
                Card(tint: Theme.honey) {
                    Label {
                        Text(
                            Rich.text([
                                ("Worth a second look: ", true),
                                (
                                    "\(n(note.later)) builds on \(n(note.earlier)), so we’ve counted \(n(note.earlier)) as done. Gaps like this are common, and often where a quick recap helps most.",
                                    false
                                ),
                            ]))
                    } icon: {
                        Image(systemName: "lightbulb").foregroundStyle(Theme.honey)
                    }
                }
            }
            MapStrip(area: area, result: r)
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 300), spacing: 16, alignment: .top)], alignment: .leading, spacing: 16) {
                mastered(r)
                upNext(r)
                comingUp(r)
            }
            if let top = r.upNext.first {
                kitchenTip(top.node)
            }
            footer
        }
    }

    // MARK: header

    @ViewBuilder private func header(_ r: InferenceResult) -> some View {
        let mc = r.masteredCount
        let pct = area.count > 0 ? Int((100 * Double(mc) / Double(area.count)).rounded()) : 0
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.rounded(.largeTitle))
                .accessibilityAddTraits(.isHeader)
            Text("Checked \(date.formatted(date: .abbreviated, time: .omitted))")
                .font(.caption)
                .foregroundStyle(.secondary)
            Text(summaryText(r, mastered: mc, percent: pct))
                .font(.title3)
            Text(estimateText(r))
                .font(.callout)
                .foregroundStyle(.secondary)
        }
    }

    private func summaryText(_ r: InferenceResult, mastered mc: Int, percent pct: Int) -> AttributedString {
        let roughly = pct >= 5 ? " (roughly \(pct)%)" : ""
        let verb = r.upNextCount == 1 ? "topic is" : "topics are"
        return Rich.text([
            ("\(whoCapitalized) likely has about ", false), ("\(mc)", true),
            (" of the \(area.count) \(subject) topics on the map in place\(roughly), and ", false),
            ("\(r.upNextCount)", true), (" \(verb) within reach right now.", false),
        ])
    }

    private func estimateText(_ r: InferenceResult) -> String {
        var s = "This is an estimate. \(r.confirmed.count) follow directly from your answers"
        if !r.estimated.isEmpty {
            s += "; the other \(r.estimated.count) are earlier \(subject) topics we’d expect at this level, leaving out anything after a “not yet” or “getting there”."
        } else {
            s += "."
        }
        return s + " Their level looks like about age \(r.level)."
    }

    // MARK: columns

    @ViewBuilder private func mastered(_ r: InferenceResult) -> some View {
        Card(tint: Theme.leaf) {
            SectionHeader(title: "Mastered", systemImage: "checkmark.circle.fill", tint: Theme.leaf, subtitle: "What we think is already in place.")
            if r.masteredCount == 0 {
                Text("Nothing in this subject yet, and that’s fine. Everyone starts somewhere.").foregroundStyle(.secondary)
            }
            if !r.confirmed.isEmpty {
                Text("From your answers").font(.subheadline.weight(.semibold))
                ForEach(r.confirmed.prefix(4), id: \.self) { i in
                    NavigationLink(value: Route.topic(i)) { TopicRow(node: i, showsStatus: false) }
                        .buttonStyle(.plain)
                }
                if r.confirmed.count > 4 {
                    MoreTopics(title: "+ \(r.confirmed.count - 4) more they rest on", nodes: Array(r.confirmed.dropFirst(4)))
                }
            }
            if !r.estimated.isEmpty {
                Text("Probably in place too").font(.subheadline.weight(.semibold)).padding(.top, 4)
                ForEach(r.estimated.prefix(3), id: \.self) { i in
                    NavigationLink(value: Route.topic(i)) { TopicRow(node: i, showsStatus: false) }
                        .buttonStyle(.plain)
                }
                if r.estimated.count > 3 {
                    MoreTopics(title: "+ \(r.estimated.count - 3) more, estimated from their level", nodes: Array(r.estimated.dropFirst(3)))
                }
            }
            if !r.baselineCovered {
                Text("We’ve assumed the groundwork before “\(n(r.baseline))” is in place.")
                    .font(.footnote).foregroundStyle(.secondary)
            }
        }
    }

    @ViewBuilder private func upNext(_ r: InferenceResult) -> some View {
        Card(tint: Theme.coral) {
            SectionHeader(
                title: "Up next", systemImage: "arrow.right.circle.fill", tint: Theme.coral,
                subtitle: "Ready now: what these rely on is in place." + (r.upNextCount > r.upNext.count ? " Showing \(r.upNext.count) of \(r.upNextCount), closest to their level first." : ""))
            ForEach(r.upNext, id: \.self) { u in
                NavigationLink(value: Route.topic(u.node)) {
                    VStack(alignment: .leading, spacing: 6) {
                        HStack(alignment: .firstTextBaseline) {
                            Text(n(u.node)).font(.headline)
                            Spacer(minLength: 4)
                            Text(model.data.ageText(u.node)).font(.caption).foregroundStyle(.secondary)
                        }
                        if u.flag == .some { Chip(text: "You said: getting there") }
                        if u.flag == .no { Chip(text: "You said: not yet") }
                        whyNow(u)
                        if let w = area.topics[u.node]?.weight, w > 0 {
                            Text("Unlocks \(w) later \(w == 1 ? "topic" : "topics")").font(.caption).foregroundStyle(.secondary)
                        }
                    }
                    .padding(12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(RoundedRectangle(cornerRadius: 12, style: .continuous).fill(Theme.coral.opacity(0.08)))
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityElement(children: .combine)
                .accessibilityHint("Opens the topic")
            }
            if r.upNextCount > r.upNext.count {
                MoreTopics(title: "The other \(r.upNextCount - r.upNext.count) within reach", nodes: Array(r.upNextAll.dropFirst(r.upNext.count)))
            }
        }
    }

    @ViewBuilder private func whyNow(_ u: InferenceResult.UpNext) -> some View {
        if let from = u.from, let reason = u.reason {
            Text(Rich.text([("Why now? ", true), ("It builds on ", false), (n(from), true), (". " + TextSoftener.soften(reason), false)]))
                .font(.callout)
        } else if u.flag == .some {
            Text("You said \(who) is getting there, so this is the one to finish first.").font(.callout)
        } else {
            Text("A good starting point: it doesn’t depend on earlier \(subject) topics.").font(.callout)
        }
    }

    @ViewBuilder private func comingUp(_ r: InferenceResult) -> some View {
        Card(tint: Theme.sky) {
            SectionHeader(title: "Coming up", systemImage: "circle.dashed", tint: Theme.sky, subtitle: "Where the next steps lead, within about two years.")
            if r.comingUp.isEmpty {
                Text(
                    r.level >= 16
                        ? "They’re close to the end of this subject on the map. The up-next topics are the last big steps."
                        : "Nothing else opens up within two years of these steps alone. Finish the up-next topics first."
                )
                .foregroundStyle(.secondary)
            }
            ForEach(r.comingUp, id: \.self) { c in
                NavigationLink(value: Route.topic(c.node)) {
                    VStack(alignment: .leading, spacing: 4) {
                        HStack(alignment: .firstTextBaseline) {
                            Text(n(c.node)).font(.headline)
                            Spacer(minLength: 4)
                            Text(model.data.ageText(c.node)).font(.caption).foregroundStyle(.secondary)
                        }
                        Text(Rich.text([("After ", false), (n(c.via), true), (". " + TextSoftener.soften(c.reason), false)])).font(.callout)
                    }
                    .padding(12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(RoundedRectangle(cornerRadius: 12, style: .continuous).fill(Theme.sky.opacity(0.10)))
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityElement(children: .combine)
                .accessibilityHint("Opens the topic")
            }
        }
    }

    // MARK: kitchen table + footer

    @ViewBuilder private func kitchenTip(_ node: Int) -> some View {
        let t = area.topics[node]
        Card(tint: Theme.honey) {
            Label("Tonight at the kitchen table", systemImage: "cup.and.saucer.fill")
                .font(.caption.weight(.bold))
                .textCase(.uppercase)
                .foregroundStyle(.secondary)
            Text(n(node)).font(.rounded(.title3)).accessibilityAddTraits(.isHeader)
            if let cl = model.data.cluster(for: node) {
                Text(Rich.text([("The bigger picture (\(model.data.domainName(of: node)), from age \(cl.ageStart)): ", true), (TextSoftener.summary(cl.summary, name: name), false)]))
            }
            if let t {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Quick check").font(.subheadline.weight(.bold))
                    Text(TextSoftener.personalize(t.prompt, name: name))
                }
                .padding(12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(RoundedRectangle(cornerRadius: 12, style: .continuous).fill(Theme.honey.opacity(0.15)))
                .accessibilityElement(children: .combine)
                if let ev = t.evidence {
                    Text(Rich.text([("“Got it” looks like: ", true), (TextSoftener.soften(ev), false)])).font(.callout)
                }
            }
        }
    }

    private var footer: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("A starting point for a conversation, not an assessment. Every topic and reason above comes from the open dataset; Key Stage references are shown as ages.")
                .font(.footnote)
                .foregroundStyle(.secondary)
            Button {
                onCheckAgain()
            } label: {
                Label("Check again", systemImage: "arrow.counterclockwise")
            }
            .buttonStyle(.bordered)
        }
    }
}

/// "+ 12 more" that expands into the full list.
struct MoreTopics: View {
    let title: String
    let nodes: [Int]
    @State private var open = false

    var body: some View {
        DisclosureGroup(isExpanded: $open) {
            VStack(alignment: .leading, spacing: 8) {
                ForEach(nodes, id: \.self) { i in
                    NavigationLink(value: Route.topic(i)) { TopicRow(node: i, showsStatus: false) }
                        .buttonStyle(.plain)
                }
            }
            .padding(.top, 6)
        } label: {
            Text(title).font(.footnote).foregroundStyle(.secondary)
        }
    }
}

/// One square per topic in the subject, youngest first, coloured by status (with a readable key).
struct MapStrip: View {
    @Environment(AppModel.self) private var model
    let area: Area
    let result: InferenceResult

    var body: some View {
        let nodes = model.data.nodes
        let ids = area.topicIDs.sorted { (nodes[$0].ageStart, nodes[$0].name) < (nodes[$1].ageStart, nodes[$1].name) }
        let statuses = ids.map { TopicStatus(node: $0, in: result) }
        let counts = Dictionary(grouping: statuses, by: { $0 }).mapValues(\.count)
        VStack(alignment: .leading, spacing: 10) {
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 10, maximum: 14), spacing: 3)], spacing: 3) {
                ForEach(Array(statuses.enumerated()), id: \.offset) { _, s in
                    RoundedRectangle(cornerRadius: 2.5, style: .continuous)
                        .fill(Theme.color(for: s))
                        .aspectRatio(1, contentMode: .fit)
                }
            }
            .accessibilityHidden(true)
            ViewThatFits(in: .horizontal) {
                HStack(spacing: 14) { legend(counts) }
                VStack(alignment: .leading, spacing: 4) { legend(counts) }
            }
            .font(.caption)
            .accessibilityElement(children: .combine)
            .accessibilityLabel(
                "Map key for \(area.count) \(area.label) topics: \(counts[.confirmed, default: 0]) from your answers, \(counts[.estimated, default: 0]) estimated, \(counts[.upNext, default: 0]) up next, \(counts[.comingUp, default: 0]) coming up, \(counts[.later, default: 0]) later."
            )
        }
    }

    @ViewBuilder private func legend(_ counts: [TopicStatus: Int]) -> some View {
        key("From your answers", counts[.confirmed, default: 0], Theme.leaf)
        key("Estimated", counts[.estimated, default: 0], Theme.leafSoft)
        key("Up next", counts[.upNext, default: 0], Theme.coral)
        key("Coming up", counts[.comingUp, default: 0], Theme.sky)
        key("Later", counts[.later, default: 0], Theme.sand)
    }

    private func key(_ label: String, _ count: Int, _ color: Color) -> some View {
        HStack(spacing: 5) {
            RoundedRectangle(cornerRadius: 2.5).fill(color).frame(width: 10, height: 10)
            Text("\(label) (\(count))")
        }
    }
}
