import SwiftUI
import WhyNextCore

/// A topic: what it is, what it comes after (and why), and what it unlocks.
struct TopicDetailView: View {
    @Environment(AppModel.self) private var model
    let node: Int
    @State private var showAllUnlocks = false

    var body: some View {
        let d = model.data
        let n = d.nodes[node]
        let topic = d.topic(node)
        let area = d.area(containing: node)
        let before = d.prerequisites(of: node)
        let after = d.unlocks(node)
        let name = model.selectedChild?.name
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                VStack(alignment: .leading, spacing: 8) {
                    Text(n.name)
                        .font(.rounded(.largeTitle))
                        .accessibilityAddTraits(.isHeader)
                    FlowChips(items: [d.ageText(node).capitalizedFirst, d.domainName(of: node)] + (area.map { [$0.label] } ?? []))
                    if let status = model.status(of: node) {
                        HStack(spacing: 6) {
                            StatusBadge(status: status)
                            if let name { Text("for \(name)").font(.caption).foregroundStyle(.secondary) }
                        }
                    }
                }
                if let desc = d.description(of: node) {
                    Text(TextSoftener.soften(desc))
                        .font(.body)
                        .fixedSize(horizontal: false, vertical: true)
                }
                let tid = n.topicId
                let content = Offline.content
                if content.hasLesson(tid), let tid {
                    let flag = content.isFlagship(tid)
                    Card(tint: Theme.sky) {
                        Label(flag ? "Try the interactive lesson" : "Try the lesson", systemImage: flag ? "hand.draw" : "book")
                            .font(.headline)
                            .accessibilityAddTraits(.isHeader)
                        Text(content.lessons[tid] ?? n.name).font(.callout).foregroundStyle(.secondary)
                        NavigationLink(value: Route.lesson(tid, content.lessons[tid] ?? n.name)) {
                            Label(flag ? "Open the flagship lesson" : "Open the lesson", systemImage: "arrow.right.circle.fill")
                        }
                        .buttonStyle(.borderedProminent)
                    }
                }
                let reels = content.reels(for: tid)
                if !reels.isEmpty, let tid {
                    ReelCard(topicId: tid, reels: reels).id(tid)
                }
                if area == nil {
                    Text("This topic sits outside the six subjects in this version. It’s here because topics on the map build on it.")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                }
                if let topic {
                    Card(tint: Theme.honey) {
                        Label("Quick check", systemImage: "questionmark.bubble")
                            .font(.headline)
                            .accessibilityAddTraits(.isHeader)
                        Text(TextSoftener.personalize(topic.prompt, name: name))
                        if let ev = topic.evidence {
                            Text(Rich.text([("“Got it” looks like: ", true), (TextSoftener.soften(ev), false)]))
                                .font(.callout)
                        }
                    }
                }
                if let cl = d.cluster(for: node) {
                    Card {
                        Label("The bigger picture", systemImage: "binoculars")
                            .font(.headline)
                            .accessibilityAddTraits(.isHeader)
                        Text("\(cl.domain), from age \(cl.ageStart)").font(.caption).foregroundStyle(.secondary)
                        Text(TextSoftener.summary(cl.summary, name: name))
                    }
                }

                Card(tint: Theme.leaf) {
                    SectionHeader(
                        title: "Comes after", systemImage: "arrow.turn.left.up", tint: Theme.leaf,
                        subtitle: before.isEmpty ? "Nothing on the map comes before this one." : "And why it needs each of these first.")
                    ForEach(before) { link in
                        NavigationLink(value: Route.topic(link.node)) { TopicRow(node: link.node, reason: link.reason) }
                            .buttonStyle(.plain)
                        if link.id != before.last?.id { Divider() }
                    }
                }

                Card(tint: Theme.sky) {
                    SectionHeader(
                        title: "Unlocks", systemImage: "arrow.turn.right.down", tint: Theme.sky,
                        subtitle: after.isEmpty ? "Nothing in these six subjects builds on it directly." : "\(after.count) \(after.count == 1 ? "topic builds" : "topics build") on it directly.")
                    let shown = showAllUnlocks ? after : Array(after.prefix(8))
                    ForEach(shown) { link in
                        NavigationLink(value: Route.topic(link.node)) { TopicRow(node: link.node, reason: link.reason) }
                            .buttonStyle(.plain)
                        if link.id != shown.last?.id { Divider() }
                    }
                    if after.count > 8 {
                        Button(showAllUnlocks ? "Show fewer" : "Show all \(after.count)") { showAllUnlocks.toggle() }
                            .buttonStyle(.borderless)
                    }
                }
            }
            .padding(20)
            .frame(maxWidth: 820, alignment: .leading)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.canvas.ignoresSafeArea())
        .navigationTitle(n.name)
        #if os(iOS)
            .navigationBarTitleDisplayMode(.inline)
        #endif
    }
}

/// Small grey chips that wrap onto the next line when needed.
struct FlowChips: View {
    let items: [String]

    var body: some View {
        ViewThatFits(in: .horizontal) {
            HStack(spacing: 6) { chips }
            VStack(alignment: .leading, spacing: 6) { chips }
        }
    }

    @ViewBuilder private var chips: some View {
        ForEach(items.filter { !$0.isEmpty }, id: \.self) { s in
            Chip(text: s, tint: .secondary)
        }
    }
}
