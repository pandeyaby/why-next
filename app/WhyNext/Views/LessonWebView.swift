import SwiftUI
import WebKit
import WhyNextCore

/// The offline lessons and reels synced from the web build (`tools/sync_content.py` -> `Resources/Web`).
enum Offline {
    /// The bundled `Web` folder (a folder reference, so its layout is kept inside the app bundle).
    static let webDir: URL? = Bundle.main.url(forResource: "Web", withExtension: nil)
    static let content: BundledContent = {
        guard let dir = webDir, let c = try? BundledContent.load(from: dir.appendingPathComponent("content.json")) else { return .empty }
        return c
    }()
    static func reelURL(_ r: Reel, _ ext: String) -> URL? {
        webDir?.appendingPathComponent("reels/\(r.file).\(ext)")
    }
}

/// An interactive lesson (one of the 12 flagships, or any other web lesson), run from the bundled web build.
/// Loaded with `loadFileURL(_:allowingReadAccessTo:)` and read access limited to the bundled `Web` folder;
/// links that would leave the bundle open in the system browser instead, so the web view itself never goes online.
struct LessonView: View {
    let topicId: String
    let title: String

    var body: some View {
        Group {
            if let dir = Offline.webDir {
                LessonWebView(topicId: topicId, webDir: dir)
            } else {
                ContentUnavailableView(
                    "Lessons not bundled", systemImage: "shippingbox",
                    description: Text("Run app/tools/sync_content.py before building."))
            }
        }
        .background(Theme.canvas.ignoresSafeArea())
        .navigationTitle(title)
        #if os(iOS)
            .navigationBarTitleDisplayMode(.inline)
        #endif
    }
}

final class LessonWebCoordinator: NSObject, WKNavigationDelegate {
    let webDir: URL
    let open: (URL) -> Void
    init(webDir: URL, open: @escaping (URL) -> Void) { self.webDir = webDir; self.open = open }

    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction, decisionHandler: @escaping @MainActor @Sendable (WKNavigationActionPolicy) -> Void) {
        guard let url = action.request.url else { return decisionHandler(.cancel) }
        if url.isFileURL && url.standardizedFileURL.path.hasPrefix(webDir.standardizedFileURL.path) { return decisionHandler(.allow) }
        if url.scheme == "about" || url.scheme == "blob" || url.scheme == "data" { return decisionHandler(.allow) }
        if action.navigationType == .linkActivated, ["http", "https", "mailto"].contains(url.scheme ?? "") { open(url) }
        decisionHandler(.cancel)
    }
}

enum LessonWeb {
    static func make(topicId: String, webDir: URL, coordinator: LessonWebCoordinator) -> WKWebView {
        let cfg = WKWebViewConfiguration()
        // Persistent store: the lesson page keeps progress and seen-reel memory in localStorage.
        // (.nonPersistent() wiped both every time a lesson was opened.)
        cfg.websiteDataStore = .default()
        cfg.mediaTypesRequiringUserActionForPlayback = []
        #if os(iOS)
            cfg.allowsInlineMediaPlayback = true
        #endif
        let js = "window.WN_TOPIC = \(jsonString(topicId));"
        cfg.userContentController.addUserScript(WKUserScript(source: js, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        let wv = WKWebView(frame: .zero, configuration: cfg)
        wv.navigationDelegate = coordinator
        #if os(iOS)
            wv.isOpaque = false
            wv.scrollView.contentInsetAdjustmentBehavior = .automatic
        #endif
        wv.loadFileURL(webDir.appendingPathComponent("index.html"), allowingReadAccessTo: webDir)
        return wv
    }
    static func jsonString(_ s: String) -> String {
        (try? String(data: JSONEncoder().encode(s), encoding: .utf8)) ?? "\"\""
    }
}

#if os(iOS)
    struct LessonWebView: UIViewRepresentable {
        let topicId: String
        let webDir: URL
        @Environment(\.openURL) private var openURL
        func makeCoordinator() -> LessonWebCoordinator { LessonWebCoordinator(webDir: webDir, open: { url in openURL(url) }) }
        func makeUIView(context: Context) -> WKWebView { LessonWeb.make(topicId: topicId, webDir: webDir, coordinator: context.coordinator) }
        func updateUIView(_ view: WKWebView, context: Context) {}
    }
#else
    struct LessonWebView: NSViewRepresentable {
        let topicId: String
        let webDir: URL
        @Environment(\.openURL) private var openURL
        func makeCoordinator() -> LessonWebCoordinator { LessonWebCoordinator(webDir: webDir, open: { url in openURL(url) }) }
        func makeNSView(context: Context) -> WKWebView { LessonWeb.make(topicId: topicId, webDir: webDir, coordinator: context.coordinator) }
        func updateNSView(_ view: WKWebView, context: Context) {}
    }
#endif
