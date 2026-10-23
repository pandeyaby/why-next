import SwiftUI
import WhyNextCore

/// First launch: a child's first name and age. Stored only on this device.
struct OnboardingView: View {
    @Environment(AppModel.self) private var model
    @State private var name = ""
    @State private var age = 12

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                AppIconView(size: 104)
                    .shadow(color: Theme.coral.opacity(0.3), radius: 16, y: 8)
                    .padding(.top, 32)
                VStack(spacing: 8) {
                    Text("Why Next?")
                        .font(.rounded(.largeTitle))
                        .accessibilityAddTraits(.isHeader)
                    Text("What to learn next, and why.")
                        .font(.rounded(.title3, weight: .medium))
                        .foregroundStyle(.secondary)
                }
                Text(
                    "Answer three quick questions about a subject and see what your child probably has in place, what’s up next with the reason it comes now, and an idea to try at the kitchen table."
                )
                .multilineTextAlignment(.center)
                .frame(maxWidth: 520)

                Card {
                    Text("Who are we mapping?")
                        .font(.rounded(.headline))
                        .accessibilityAddTraits(.isHeader)
                    ChildFields(name: $name, age: $age)
                    Button {
                        model.addChild(name: name, age: age)
                    } label: {
                        Text("Start")
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 6)
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(TextSoftener.sanitizeName(name).isEmpty)
                    .accessibilityHint("Saves the name and age on this device")
                }
                .frame(maxWidth: 520)

                Label("Names and answers stay on this device. No accounts, no tracking, no internet needed.", systemImage: "lock.shield")
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                    .frame(maxWidth: 520)
                    .padding(.bottom, 32)
            }
            .padding(.horizontal, 20)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.canvas.ignoresSafeArea())
    }
}

/// Name and age fields, shared by onboarding and the family editor.
struct ChildFields: View {
    @Binding var name: String
    @Binding var age: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            VStack(alignment: .leading, spacing: 6) {
                Text("First name").font(.subheadline.weight(.semibold))
                TextField("First name", text: $name, prompt: Text("Type a name"))
                    .labelsHidden()   // the "First name" header above is the visible label; macOS Forms otherwise draw it twice
                    .textFieldStyle(.roundedBorder)
                    .autocorrectionDisabled()
                    #if os(iOS)
                        .textContentType(.givenName)
                        .textInputAutocapitalization(.words)
                    #endif
                    .accessibilityLabel("Child’s first name")
            }
            Stepper(value: $age, in: ChildProfile.ages) {
                HStack {
                    Text("Age").font(.subheadline.weight(.semibold))
                    Spacer()
                    Text("\(age)").font(.rounded(.title3)).monospacedDigit()
                }
            }
            .accessibilityLabel("Age")
            .accessibilityValue("\(age)")
            Text("Why Next? covers ages 11 to 18.")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
    }
}

/// Add or edit a child (sheet).
struct ChildEditor: View {
    @Environment(AppModel.self) private var model
    @Environment(\.dismiss) private var dismiss
    var child: ChildProfile?
    @State private var name = ""
    @State private var age = 12

    private var title: String {
        if let child { return "Edit \(child.name)" }
        return "Add a child"
    }

    var body: some View {
        NavigationStack {
            Form {
                ChildFields(name: $name, age: $age)
            }
            .formStyle(.grouped)
            .navigationTitle(title)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(child == nil ? "Add" : "Save") {
                        if let child { model.updateChild(id: child.id, name: name, age: age) } else { model.addChild(name: name, age: age) }
                        dismiss()
                    }
                    .disabled(TextSoftener.sanitizeName(name).isEmpty)
                }
            }
        }
        .onAppear {
            if let child { name = child.name; age = child.age }
        }
        #if os(macOS)
            .frame(minWidth: 380, minHeight: 280)
        #endif
    }
}
