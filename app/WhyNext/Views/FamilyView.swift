import SwiftUI
import WhyNextCore

/// The children on this device: add, edit, switch, remove.
struct FamilyView: View {
    @Environment(AppModel.self) private var model
    let showsAboutLink: Bool
    @State private var editing: ChildProfile?
    @State private var adding = false
    @State private var pendingDelete: ChildProfile?

    var body: some View {
        List {
            Section {
                ForEach(model.children) { child in
                    Button {
                        model.selectChild(id: child.id)
                    } label: {
                        HStack(spacing: 12) {
                            Avatar(name: child.name, size: 40)
                            VStack(alignment: .leading, spacing: 2) {
                                Text(child.name).font(.headline).foregroundStyle(.primary)
                                Text("Age \(child.age) · \(child.checks.count) of \(model.data.areas.count) subjects checked")
                                    .font(.caption).foregroundStyle(.secondary)
                            }
                            Spacer()
                            if child.id == model.selectedChild?.id {
                                Image(systemName: "checkmark.circle.fill")
                                    .foregroundStyle(Theme.coral)
                                    .accessibilityHidden(true)
                            }
                        }
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    .accessibilityElement(children: .combine)
                    .accessibilityAddTraits(child.id == model.selectedChild?.id ? [.isSelected] : [])
                    .accessibilityHint("Shows this child’s maps")
                    .contextMenu {
                        Button("Edit", systemImage: "pencil") { editing = child }
                        Button("Remove", systemImage: "trash", role: .destructive) { pendingDelete = child }
                    }
                    .swipeActions {
                        Button("Remove", role: .destructive) { pendingDelete = child }
                        Button("Edit") { editing = child }
                    }
                }
                Button {
                    adding = true
                } label: {
                    Label("Add a child", systemImage: "plus.circle.fill")
                }
            } header: {
                Text("Children on this device")
            } footer: {
                Text("Swipe or right-click a child to edit or remove. Names, ages and answers are saved only on this device, in a file the app keeps to itself. Nothing is sent anywhere.")
            }
            if showsAboutLink {
                Section {
                    NavigationLink(value: Route.about) {
                        Label("About Why Next?", systemImage: "info.circle")
                    }
                }
            }
        }
        .navigationTitle("Family")
        .sheet(isPresented: $adding) { ChildEditor(child: nil) }
        .sheet(item: $editing) { child in ChildEditor(child: child) }
        .confirmationDialog(
            "Remove \(pendingDelete?.name ?? "")?",
            isPresented: Binding(get: { pendingDelete != nil }, set: { if !$0 { pendingDelete = nil } }),
            titleVisibility: .visible
        ) {
            Button("Remove", role: .destructive) {
                if let c = pendingDelete { model.deleteChild(id: c.id) }
                pendingDelete = nil
            }
            Button("Cancel", role: .cancel) { pendingDelete = nil }
        } message: {
            Text("Their saved answers will be deleted from this device.")
        }
    }
}
