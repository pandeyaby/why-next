import SwiftUI
import WhyNextCore

@main
struct WhyNextApp: App {
    /// Loads the bundled map and the progress saved on this device. Nothing is fetched from the network.
    @State private var model: AppModel? = try? AppModel.live()

    var body: some Scene {
        WindowGroup {
            Group {
                if let model {
                    RootView()
                        .environment(model)
                } else {
                    DataErrorView()
                }
            }
            .tint(Theme.coral)
        }
        #if os(macOS)
            .defaultSize(width: 1120, height: 780)
            .commands { SidebarCommands() }
        #endif
    }
}

/// Only shown if the bundled data file is missing or damaged (a build problem, not a user problem).
struct DataErrorView: View {
    var body: some View {
        ContentUnavailableView(
            "The learning map couldn’t be loaded",
            systemImage: "exclamationmark.triangle",
            description: Text("The data file that ships with the app is missing. Rebuild the app after running app/tools/build_app_data.py.")
        )
    }
}
