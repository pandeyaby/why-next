import SwiftUI
import WhyNextCore

/// Kitchen-table ideas: a parent-friendly summary of a stage, a quick check to ask, and what "got it" looks like.
struct KitchenView: View {
    @Environment(AppModel.self) private var model

    private var intro: String {
        if let child = model.selectedChild {
            return "Ideas that fit \(child.name) (age \(child.age)) and a little beyond. Each one is a real stage summary and quick check from the map."
        }
        return "Each idea is a real stage summary and quick check from the map."
    }

    var body: some View {
        let ideas = model.kitchenIdeasForChild
        let name = model.selectedChild?.name
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text(intro)
                    .foregroundStyle(.secondary)
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 320), spacing: 16, alignment: .top)], spacing: 16) {
                    ForEach(ideas) { idea in
                        KitchenCard(idea: idea, name: name)
                    }
                }
            }
            .padding(20)
            .frame(maxWidth: 1100, alignment: .leading)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.canvas.ignoresSafeArea())
        .navigationTitle("Kitchen-table ideas")
    }
}

struct KitchenCard: View {
    let idea: KitchenIdea
    let name: String?

    var body: some View {
        Card(tint: Theme.honey) {
            Text("\(idea.domain) · from age \(idea.fromAge)")
                .font(.caption.weight(.bold))
                .textCase(.uppercase)
                .foregroundStyle(.secondary)
            HStack(alignment: .firstTextBaseline) {
                Text(idea.topicName).font(.rounded(.title3)).accessibilityAddTraits(.isHeader)
                Spacer(minLength: 4)
                Text(WhyNextData.ageText(idea.ageStart, idea.ageEnd)).font(.caption).foregroundStyle(.secondary)
            }
            Text(TextSoftener.summary(idea.summary, name: name))
            VStack(alignment: .leading, spacing: 4) {
                Text("Quick check").font(.subheadline.weight(.bold))
                Text(TextSoftener.personalize(idea.prompt, name: name))
            }
            .padding(12)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(RoundedRectangle(cornerRadius: 12, style: .continuous).fill(Theme.honey.opacity(0.15)))
            .accessibilityElement(children: .combine)
            if !idea.evidence.isEmpty {
                Text("What “got it” looks like").font(.subheadline.weight(.bold))
                VStack(alignment: .leading, spacing: 4) {
                    ForEach(idea.evidence, id: \.self) { e in
                        HStack(alignment: .firstTextBaseline, spacing: 6) {
                            Text("•").accessibilityHidden(true)
                            Text(TextSoftener.soften(e, sentence: false))
                        }
                        .font(.callout)
                    }
                }
            }
        }
    }
}
