import SwiftUI
import WhyNextCore

/// Every topic by subject, with offline search across all of them.
struct BrowseView: View {
    @Environment(AppModel.self) private var model
    @State private var query = ""
    @State private var subjectFilter: String? = nil

    var body: some View {
        List {
            if query.trimmingCharacters(in: .whitespaces).isEmpty {
                ForEach(areas) { area in
                    Section {
                        ForEach(sortedTopics(area), id: \.self) { i in
                            NavigationLink(value: Route.topic(i)) { TopicRow(node: i) }
                        }
                    } header: {
                        Label("\(area.label) · \(area.count)", systemImage: area.symbol)
                    }
                }
            } else {
                let hits = model.search.search(query).filter { hit in
                    guard let id = subjectFilter else { return true }
                    return model.data.area(containing: hit.node)?.id == id
                }
                if hits.isEmpty {
                    ContentUnavailableView.search(text: query)
                } else {
                    Section {
                        ForEach(hits) { hit in
                            NavigationLink(value: Route.topic(hit.node)) { TopicRow(node: hit.node) }
                        }
                    } header: {
                        Text("\(hits.count) \(hits.count == 1 ? "topic" : "topics")")
                    }
                }
            }
        }
        .searchable(text: $query, prompt: "Search topics, e.g. quadratics")
        .navigationTitle("All topics")
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Menu {
                    Picker("Subject", selection: $subjectFilter) {
                        Text("All subjects").tag(String?.none)
                        ForEach(model.data.areas) { a in
                            Text(a.label).tag(Optional(a.id))
                        }
                    }
                } label: {
                    Label("Filter by subject", systemImage: subjectFilter == nil ? "line.3.horizontal.decrease.circle" : "line.3.horizontal.decrease.circle.fill")
                }
            }
        }
    }

    private var areas: [Area] {
        guard let id = subjectFilter else { return model.data.areas }
        return model.data.areas.filter { $0.id == id }
    }

    private func sortedTopics(_ area: Area) -> [Int] {
        let nodes = model.data.nodes
        return area.topicIDs.sorted { (nodes[$0].ageStart, nodes[$0].name) < (nodes[$1].ageStart, nodes[$1].name) }
    }
}
