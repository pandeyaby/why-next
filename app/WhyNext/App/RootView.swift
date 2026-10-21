import SwiftUI
import WhyNextCore

/// Places in the app.
enum SidebarItem: Hashable {
    case subject(String)
    case browse
    case kitchen
    case family
    case about
}

/// Things you can push onto a navigation stack.
enum Route: Hashable {
    case topic(Int)
    case lesson(String, String)
    case subject(String)
    case about
}

struct RootView: View {
    @Environment(AppModel.self) private var model
    #if os(iOS)
        @Environment(\.horizontalSizeClass) private var sizeClass
    #endif

    var body: some View {
        Group {
            if model.children.isEmpty {
                OnboardingView()
            } else {
                #if os(iOS)
                    if sizeClass == .compact { CompactRoot() } else { SplitRoot() }
                #else
                    SplitRoot()
                #endif
            }
        }
        .alert(
            "Saving problem",
            isPresented: Binding(
                get: { model.storageError != nil },
                set: { if !$0 { model.storageError = nil } }
            )
        ) {
            Button("OK", role: .cancel) { model.storageError = nil }
        } message: {
            Text(model.storageError ?? "")
        }
    }
}

// MARK: - iPad and Mac: sidebar + detail

struct SplitRoot: View {
    @Environment(AppModel.self) private var model
    @State private var selection: SidebarItem? = .subject("algebra")
    @State private var path = NavigationPath()

    var body: some View {
        NavigationSplitView {
            List(selection: $selection) {
                Section {
                    ChildSwitcher()
                }
                Section("Check a subject") {
                    ForEach(model.data.areas) { area in
                        NavigationLink(value: SidebarItem.subject(area.id)) {
                            SubjectRowLabel(area: area)
                        }
                    }
                }
                Section("Explore") {
                    NavigationLink(value: SidebarItem.browse) { Label("All topics", systemImage: "magnifyingglass") }
                    NavigationLink(value: SidebarItem.kitchen) { Label("Kitchen-table ideas", systemImage: "cup.and.saucer") }
                }
                Section {
                    NavigationLink(value: SidebarItem.family) { Label("Family", systemImage: "person.2") }
                    NavigationLink(value: SidebarItem.about) { Label("About", systemImage: "info.circle") }
                }
            }
            .navigationTitle("Why Next?")
            #if os(macOS)
                .navigationSplitViewColumnWidth(min: 230, ideal: 260)
            #endif
        } detail: {
            NavigationStack(path: $path) {
                detailRoot
                    .withRoutes()
            }
        }
        .onChange(of: selection) { _, _ in path = NavigationPath() }
    }

    @ViewBuilder private var detailRoot: some View {
        switch selection {
        case .subject(let id):
            if let area = model.data.area(id: id) {
                SubjectView(area: area)
                    .id("\(id)-\(model.selectedChild?.id.uuidString ?? "")")
            }
        case .browse: BrowseView()
        case .kitchen: KitchenView()
        case .family: FamilyView(showsAboutLink: false)
        case .about: AboutView()
        case nil:
            ContentUnavailableView("Pick a subject", systemImage: "sidebar.left", description: Text("Choose a subject to check, or explore all topics."))
        }
    }
}

// MARK: - iPhone: tabs, each with its own stack

struct CompactRoot: View {
    var body: some View {
        TabView {
            NavigationStack { SubjectsListView().withRoutes() }
                .tabItem { Label("Check", systemImage: "checklist") }
            NavigationStack { BrowseView().withRoutes() }
                .tabItem { Label("Topics", systemImage: "magnifyingglass") }
            NavigationStack { KitchenView().withRoutes() }
                .tabItem { Label("Ideas", systemImage: "cup.and.saucer") }
            NavigationStack { FamilyView(showsAboutLink: true).withRoutes() }
                .tabItem { Label("Family", systemImage: "person.2") }
        }
    }
}

/// The subject list used as the first screen on iPhone.
struct SubjectsListView: View {
    @Environment(AppModel.self) private var model

    var body: some View {
        List {
            Section {
                ChildSwitcher()
            }
            Section {
                ForEach(model.data.areas) { area in
                    NavigationLink(value: Route.subject(area.id)) {
                        SubjectRowLabel(area: area)
                    }
                }
            } header: {
                Text("Check a subject")
            } footer: {
                Text("Three quick questions, then a map of what’s in place, what’s up next and why.")
            }
        }
        .navigationTitle("Why Next?")
    }
}

/// Subject name, icon and whether this child has done the check yet.
struct SubjectRowLabel: View {
    @Environment(AppModel.self) private var model
    let area: Area

    var body: some View {
        let done = model.savedCheck(areaID: area.id) != nil
        Label {
            VStack(alignment: .leading, spacing: 2) {
                Text(area.label)
                Text(done ? "Checked · \(area.count) topics" : "\(area.count) topics")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        } icon: {
            Image(systemName: area.symbol)
                .foregroundStyle(Theme.coral)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(area.label), \(area.count) topics\(done ? ", checked" : "")")
    }
}

/// Shows whose map you're looking at, and switches between children.
struct ChildSwitcher: View {
    @Environment(AppModel.self) private var model

    var body: some View {
        Menu {
            ForEach(model.children) { child in
                Button {
                    model.selectChild(id: child.id)
                } label: {
                    if child.id == model.selectedChild?.id {
                        Label("\(child.name), \(child.age)", systemImage: "checkmark")
                    } else {
                        Text("\(child.name), \(child.age)")
                    }
                }
            }
        } label: {
            HStack(spacing: 10) {
                Avatar(name: model.selectedChild?.name ?? "?")
                VStack(alignment: .leading, spacing: 0) {
                    Text(model.selectedChild?.name ?? "No child selected")
                        .font(.headline)
                        .foregroundStyle(.primary)
                    Text(model.selectedChild.map { "Age \($0.age)" } ?? "")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                Spacer(minLength: 0)
                if model.children.count > 1 {
                    Image(systemName: "chevron.up.chevron.down")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .accessibilityHidden(true)
                }
            }
            .contentShape(Rectangle())
        }
        .menuStyle(.button)
        .buttonStyle(.plain)
        .disabled(model.children.count < 2)
        .accessibilityLabel("Showing \(model.selectedChild?.name ?? "no child")'s map")
        .accessibilityHint(model.children.count > 1 ? "Switch to another child" : "")
    }
}

extension View {
    /// Shared destinations for every navigation stack.
    func withRoutes() -> some View {
        navigationDestination(for: Route.self) { route in
            RouteDestination(route: route)
        }
    }
}

struct RouteDestination: View {
    @Environment(AppModel.self) private var model
    let route: Route

    var body: some View {
        switch route {
        case .topic(let node):
            TopicDetailView(node: node)
        case .lesson(let topicId, let title):
            LessonView(topicId: topicId, title: title)
        case .subject(let id):
            if let area = model.data.area(id: id) {
                SubjectView(area: area)
                    .id("\(id)-\(model.selectedChild?.id.uuidString ?? "")")
            }
        case .about:
            AboutView()
        }
    }
}
