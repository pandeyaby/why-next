import AVKit
import SwiftUI
import WhyNextCore

/// A topic's short video reels, like the website: a random reel you haven't seen yet, "Another reel" swaps,
/// and once you've seen them all the rotation restarts. Plays the bundled mp4 (captions are burned in; the WebVTT overlay is optional and off by default).
struct ReelCard: View {
    let topicId: String
    let reels: [Reel]
    @AppStorage("wn_reels_seen") private var seenJSON = "{}"
    @State private var current: Reel?
    @State private var player: AVPlayer?
    @State private var cues: [Cue] = []
    @State private var caption: String?
    @State private var observer: Any?
    /// The reels have burned-in captions, so the WebVTT overlay is off by default (the cue data is still loaded).
    @AppStorage("wn_reel_caption_overlay") private var showCaptionOverlay = false

    var body: some View {
        Card(tint: Theme.coral) {
            Label("Watch", systemImage: "play.rectangle")
                .font(.headline)
                .accessibilityAddTraits(.isHeader)
            if let r = current {
                ZStack(alignment: .bottom) {
                    if let player {
                        VideoPlayer(player: player)
                    } else {
                        Button {
                            play(r)
                        } label: {
                            ZStack {
                                poster(r)
                                Image(systemName: "play.circle.fill").font(.system(size: 54)).foregroundStyle(.white, .black.opacity(0.5))
                            }
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel("Play video: \(r.title) (\(r.seconds) seconds, with captions)")
                    }
                    if showCaptionOverlay, let caption, player != nil {
                        Text(caption)
                            .font(.callout.weight(.semibold))
                            .multilineTextAlignment(.center)
                            .foregroundStyle(.white)
                            .padding(.horizontal, 10).padding(.vertical, 6)
                            .background(.black.opacity(0.7), in: RoundedRectangle(cornerRadius: 8))
                            .padding(.bottom, 48).padding(.horizontal, 8)
                            .allowsHitTesting(false)
                    }
                }
                .aspectRatio(9 / 16, contentMode: .fit)
                .frame(maxWidth: 240)
                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                Text(r.title).font(.callout).foregroundStyle(.secondary)
                if reels.count > 1 {
                    HStack {
                        Text("\((reels.firstIndex(of: r) ?? 0) + 1) of \(reels.count)").font(.caption).foregroundStyle(.secondary)
                        Button("Another reel ↻") { next() }.buttonStyle(.borderless)
                    }
                }
            }
        }
        .onAppear { if current == nil { next() } }
        .onDisappear { stop() }
    }

    @ViewBuilder private func poster(_ r: Reel) -> some View {
        if let url = Offline.reelURL(r, "jpg"), let img = PlatformImage(contentsOfFile: url.path) {
            Image(platformImage: img).resizable().scaledToFill()
        } else {
            Rectangle().fill(.black)
        }
    }

    private func next() {
        stop()
        var all = ReelRotation.decodeSeen(seenJSON)
        guard let p = ReelRotation.pick(from: reels, seen: Set(all[topicId] ?? []), avoiding: current?.file) else { return }
        all[topicId] = p.seen.sorted()
        if let d = try? JSONEncoder().encode(all), let s = String(data: d, encoding: .utf8) { seenJSON = s }
        current = p.reel
    }

    private func play(_ r: Reel) {
        guard let url = Offline.reelURL(r, "mp4") else { return }
        cues = Offline.reelURL(r, "vtt").flatMap { try? String(contentsOf: $0, encoding: .utf8) }.map(WebVTT.parse) ?? []
        let p = AVPlayer(url: url)
        observer = p.addPeriodicTimeObserver(forInterval: CMTime(value: 1, timescale: 10), queue: .main) { t in
            MainActor.assumeIsolated { caption = WebVTT.text(at: t.seconds, in: cues) }
        }
        player = p
        p.play()
    }

    private func stop() {
        if let o = observer { player?.removeTimeObserver(o) }
        observer = nil
        player?.pause()
        player = nil
        caption = nil
    }
}

#if os(iOS)
    typealias PlatformImage = UIImage
    extension Image { init(platformImage: UIImage) { self.init(uiImage: platformImage) } }
#else
    typealias PlatformImage = NSImage
    extension Image { init(platformImage: NSImage) { self.init(nsImage: platformImage) } }
#endif
