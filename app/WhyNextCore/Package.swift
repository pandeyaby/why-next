// swift-tools-version:5.9
// WhyNextCore: the platform-independent part of the Why Next? app (data model, inference,
// text helpers, search, on-device family store). No UI, no network. Builds and tests on
// macOS and Linux: `swift test`.
import PackageDescription

let package = Package(
    name: "WhyNextCore",
    platforms: [.iOS(.v17), .macOS(.v14)],
    products: [
        .library(name: "WhyNextCore", targets: ["WhyNextCore"])
    ],
    targets: [
        .target(
            name: "WhyNextCore",
            resources: [.copy("Resources/whynext-data.json")]
        ),
        .testTarget(
            name: "WhyNextCoreTests",
            dependencies: ["WhyNextCore"],
            resources: [.copy("Fixtures")]
        ),
    ]
)
