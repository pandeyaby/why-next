import SwiftUI
import WhyNextCore

/// One subject: the three questions, then the map. Shows the saved map if this child already did the check.
struct SubjectView: View {
    @Environment(AppModel.self) private var model
    let area: Area
    @State private var answers: [Answer?] = [nil, nil, nil]
    @State private var checkingAgain = false

    var body: some View {
        let saved = model.savedCheck(areaID: area.id)
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                if let saved, !checkingAgain, saved.answers.count == area.probes.count {
                    ResultsView(area: area, answers: saved.answers, date: saved.date) {
                        answers = saved.answers.map { Optional($0) }
                        checkingAgain = true
                    }
                } else {
                    questions
                }
            }
            .padding(20)
            .frame(maxWidth: 1100, alignment: .leading)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.canvas.ignoresSafeArea())
        .navigationTitle(area.label)
        .onAppear {
            if answers.count != area.probes.count { answers = Array(repeating: nil, count: area.probes.count) }
        }
    }

    private var childName: String? { model.selectedChild?.name }
    private var seeMapTitle: String {
        if let childName { return "See \(childName)’s map" }
        return "See the map"
    }

    @ViewBuilder private var questions: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("\(area.label): three quick questions")
                .font(.rounded(.title2))
                .accessibilityAddTraits(.isHeader)
            Text("Answer for \(childName ?? "your child") as best you can. There are no wrong answers; it’s a starting point for a conversation, not a test.")
                .foregroundStyle(.secondary)
        }
        ForEach(Array(area.probes.enumerated()), id: \.offset) { k, probe in
            QuestionCard(index: k, total: area.probes.count, probe: probe, childName: childName, answer: $answers[k])
        }
        HStack {
            if checkingAgain {
                Button("Cancel") { checkingAgain = false }
                    .buttonStyle(.bordered)
            }
            Spacer()
            Button {
                let a = answers.compactMap { $0 }
                guard a.count == area.probes.count else { return }
                model.recordCheck(areaID: area.id, answers: a)
                checkingAgain = false
            } label: {
                Label(seeMapTitle, systemImage: "map")
                    .font(.headline)
                    .padding(.vertical, 4)
            }
            .buttonStyle(.borderedProminent)
            .disabled(answers.contains { $0 == nil })
            .accessibilityHint(answers.contains { $0 == nil } ? "Answer all three questions first" : "Shows what’s mastered, up next and coming up")
        }
    }
}

/// One check question with its three answers.
struct QuestionCard: View {
    @Environment(AppModel.self) private var model
    let index: Int
    let total: Int
    let probe: Probe
    let childName: String?
    @Binding var answer: Answer?

    var body: some View {
        let node = model.data.nodes[probe.topic]
        Card(tint: answer == nil ? nil : Theme.coral) {
            Text("Question \(index + 1) of \(total) · usually \(model.data.ageText(probe.topic))")
                .font(.caption.weight(.semibold))
                .foregroundStyle(.secondary)
            Text(node.name)
                .font(.rounded(.headline))
                .accessibilityAddTraits(.isHeader)
            Text(TextSoftener.personalize(probe.prompt, name: childName))
                .fixedSize(horizontal: false, vertical: true)
            ViewThatFits(in: .horizontal) {
                HStack(spacing: 8) { choices }
                VStack(alignment: .leading, spacing: 8) { choices }
            }
        }
        .accessibilityElement(children: .contain)
    }

    @ViewBuilder private var choices: some View {
        ForEach(Answer.allCases, id: \.self) { option in
            let selected = answer == option
            Button {
                answer = option
            } label: {
                Label(option.label, systemImage: selected ? "largecircle.fill.circle" : "circle")
                    .font(.callout.weight(selected ? .semibold : .regular))
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(Capsule().fill(selected ? Theme.coral.opacity(0.22) : Color.secondary.opacity(0.08)))
                    .overlay(Capsule().strokeBorder(selected ? Theme.coral : Color.secondary.opacity(0.25), lineWidth: selected ? 2 : 1))
                    .contentShape(Capsule())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(option.label)
            .accessibilityAddTraits(selected ? [.isSelected] : [])
            .accessibilityHint("Answer for question \(index + 1)")
        }
    }
}
