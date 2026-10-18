import SwiftUI
import WhyNextCore

/// Credit, licences and privacy.
struct AboutView: View {
    @Environment(AppModel.self) private var model

    private var appVersion: String {
        let info = Bundle.main.infoDictionary
        let v = info?["CFBundleShortVersionString"] as? String ?? "0.1"
        let b = info?["CFBundleVersion"] as? String ?? "1"
        return "\(v) (\(b))"
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                HStack(spacing: 16) {
                    AppIconView(size: 72)
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Why Next?").font(.rounded(.title))
                            .accessibilityAddTraits(.isHeader)
                        Text("What to learn next, and why.").foregroundStyle(.secondary)
                        Text("Version \(appVersion) · draft").font(.caption).foregroundStyle(.secondary)
                    }
                }
                Card {
                    SectionHeader(title: "What this is", systemImage: "map")
                    Text(
                        "An open learning map for ages 11 to 18. Three questions per subject give an estimate of what’s in place, what’s up next and why, and what’s coming up. It’s a starting point for a conversation, not an assessment."
                    )
                    Text(
                        "Up next means every step it relies on in that subject looks done, and it’s within about a year of your child’s level. Every “Why now?” reason is the dataset’s own explanation of the link."
                    )
                    .font(.callout).foregroundStyle(.secondary)
                }
                Card(tint: Theme.honey) {
                    SectionHeader(title: "Credit", systemImage: "heart.text.square", tint: Theme.coral)
                    Text(model.data.credit)
                        .textSelection(.enabled)
                    Text("Dataset version \(model.data.version). Topics, links, reasons, prompts and summaries are shown as in the dataset; Key Stage references are shown as ages.")
                        .font(.footnote).foregroundStyle(.secondary)
                }
                Card {
                    SectionHeader(title: "Licences", systemImage: "doc.text")
                    VStack(alignment: .leading, spacing: 6) {
                        Text(
                            "Data: Open Database License (ODbL) 1.0 for the database, and Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0) for the content. The map in this app is a derived dataset shared under the same terms."
                        )
                        Link("opendatacommons.org/licenses/odbl/1-0", destination: URL(string: "https://opendatacommons.org/licenses/odbl/1-0/")!)
                        Link("creativecommons.org/licenses/by-sa/4.0", destination: URL(string: "https://creativecommons.org/licenses/by-sa/4.0/")!)
                        Link("Source data: github.com/withmarbleapp/os-taxonomy", destination: URL(string: "https://github.com/withmarbleapp/os-taxonomy")!)
                        Link("This project: github.com/pandeyaby/why-next", destination: URL(string: "https://github.com/pandeyaby/why-next")!)
                    }
                    .font(.callout)
                    Text("Links open in your browser. The app itself never goes online.")
                        .font(.footnote).foregroundStyle(.secondary)
                }
                Card(tint: Theme.leaf) {
                    SectionHeader(title: "Privacy", systemImage: "lock.shield", tint: Theme.leaf)
                    Text(
                        "No data is collected. First names, ages and answers are saved only on this device, in the app’s private storage. No accounts, no analytics, no ads, no tracking, and no network access."
                    )
                }
            }
            .padding(20)
            .frame(maxWidth: 820, alignment: .leading)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.canvas.ignoresSafeArea())
        .navigationTitle("About")
    }
}
