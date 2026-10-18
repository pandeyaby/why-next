# Why Next? app (v0.1 draft): iPhone, iPad and Mac

One multiplatform SwiftUI app, fully offline, built on the same data and inference as the website demo.
It runs locally from Xcode with a free Apple ID ("Personal Team"). Nothing here has been submitted or published.

> Builds on the Marble Skill Taxonomy v1 © Generative Spark, Inc. (github.com/withmarbleapp/os-taxonomy), used under ODbL 1.0 and CC BY-SA 4.0; not affiliated with or endorsed by Generative Spark, Inc.

## What it does

- **Onboarding.** The child's first name and age (11 to 18). Stored only on the device.
- **Check a subject.** Pick Algebra, Geometry & trig, Statistics & probability, Calculus, Chemistry or Physics. Answer 3 questions ("Yes, confidently" / "Getting there" / "Not yet"), personalised with the child's name.
- **The map.** Mastered (from your answers, plus "probably in place" estimates), Up next with a **Why now?** reason taken from the dataset's own prerequisite link, Coming up (what the next steps lead to, within about two years), a one-square-per-topic map strip with a key, "worth a second look" notes when answers don't line up, and a **Tonight at the kitchen table** tip (stage summary, quick check, what "got it" looks like).
- **Topic pages.** Description, quick check, the bigger picture, what it **comes after and why**, and what it **unlocks**. Every topic name on every screen links to its page. Shows the child's status for that topic once its subject is checked.
- **Search** across all 1,220 topics in the bundle (names, strands, descriptions; case and accent insensitive), with a subject filter.
- **Kitchen-table ideas**: the 61 teen maths and science stage ideas, filtered to the child's age.
- **Family.** Several children per device. Add, edit, switch, remove. Each child's answers are saved separately.
- **About.** Credit line, licences (ODbL 1.0 + CC BY-SA 4.0), privacy statement.
- **Layout.** NavigationSplitView with a sidebar on iPad and Mac; tabs with a navigation stack on iPhone (and on iPad in narrow Split View).
- **Accessibility.** System text styles everywhere (Dynamic Type), VoiceOver labels, hints, headings, combined rows and selected states; the colour map strip has a spoken text equivalent. Light and dark colours for every palette entry.
- **Privacy.** No accounts, analytics, ads or network code. The Mac build runs in the App Sandbox without the network entitlement, so it can't go online. A privacy manifest (`PrivacyInfo.xcprivacy`) declares no tracking and no collected data.

## Build and run on your Mac

You need a Mac with **Xcode 16 or newer** (the current Xcode from the Mac App Store is fine; the generated project uses the Xcode 16 project format, so Xcode 15 can't open it), **macOS 14 or newer** to run the Mac version, and an **iPhone/iPad on iOS/iPadOS 17 or newer**. You don't need a paid Apple Developer account.

```bash
# 1. get the branch (local only for now)
cd /path/to/why-next            # your clone of the repo
git checkout app-draft          # or: git worktree add ../why-next-app app-draft
cd app

# 2. (optional, recommended) regenerate the Xcode project from project.yml
brew install xcodegen
xcodegen                        # writes WhyNext.xcodeproj; a pre-generated copy is already committed

# 3. open it
open WhyNext.xcodeproj
```

In Xcode:

1. **Sign in once.** Xcode > Settings > Accounts > "+" > Apple ID. This creates your free **Personal Team**.
2. **Choose the team.** Select the **WhyNext** project > target **WhyNext** > **Signing & Capabilities** > check "Automatically manage signing" and set **Team** to "Your Name (Personal Team)".
   - If Xcode says the bundle identifier isn't available, change `com.pandeyaby.whynext` to something unique, e.g. `com.pandeyaby.whynext.dev`.
   - To keep the team after re-running `xcodegen`, put your Team ID in `project.yml` (`DEVELOPMENT_TEAM: ABCDE12345`; it's shown in Xcode > Settings > Accounts).
3. **Run on the Mac.** Pick the **WhyNext** scheme and the destination **My Mac**, then press ⌘R.
4. **Run in the simulator.** Pick an iPhone or iPad simulator, then ⌘R.
5. **Run on your iPhone or iPad.**
   - Connect it with a cable (or the same Wi-Fi after the first pairing) and unlock it. Tap **Trust** on the device.
   - Turn on **Developer Mode**: Settings > Privacy & Security > Developer Mode > On, then restart the device when asked.
   - Choose the device as the destination in Xcode and press ⌘R.
   - The first launch is blocked until you trust your certificate: Settings > General > **VPN & Device Management** > your Apple ID > Trust.
   - With a free Personal Team the app stops opening after **7 days**; run it from Xcode again to refresh it. A free team can have up to 3 such apps on a device at a time.

Unit tests: in Xcode, Product > Test (⌘U) runs the WhyNextCore tests. Or in Terminal: `cd app/WhyNextCore && swift test`.

Command-line builds (optional, handy for checking it compiles):

```bash
cd app
xcodebuild -project WhyNext.xcodeproj -scheme WhyNext -destination 'generic/platform=iOS Simulator' build
xcodebuild -project WhyNext.xcodeproj -scheme WhyNext -destination 'platform=macOS' build CODE_SIGNING_ALLOWED=NO
```

## Project layout

```
app/
  project.yml                 XcodeGen spec: one target, supportedDestinations [iOS, macOS], iOS 17 / macOS 14
  WhyNext.xcodeproj/          generated from project.yml by XcodeGen 2.46.0 (regenerate any time with `xcodegen`)
  WhyNext/                    the SwiftUI app
    App/                      WhyNextApp (entry), RootView (split view vs tabs, routes, child switcher)
    Views/                    Onboarding, Subject (questions), Results, TopicDetail, Browse (search), Kitchen, Family, About
    Design/                   Theme (palette), shared components, AppIconView (SwiftUI-drawn icon)
    Resources/                Assets.xcassets (AppIcon, AccentColor, light/dark colours), PrivacyInfo.xcprivacy, macOS entitlements
    Info.plist                generated by XcodeGen from project.yml
  WhyNextCore/                Swift package, no UI: works on macOS, iOS and Linux
    Sources/WhyNextCore/
      Models.swift            decoding of the bundled JSON + graph helpers (comes after / unlocks)
      Inference.swift         Mastered / Up next / Coming up: a line-by-line port of the website's infer.js
      TextSoftener.swift      Key Stage -> ages and sentence tidying (port of the website's soften.js), {{name}} prompts
      Search.swift            offline topic search
      FamilyStore.swift       children + saved answers, one JSON file in Application Support
      AppModel.swift          @Observable app state used by every screen
      Resources/whynext-data.json   the compact data bundle (733 KB)
    Tests/WhyNextCoreTests/   golden tests against the website JavaScript, data, search, storage
  tools/
    build_app_data.py         builds whynext-data.json from out/merged/data
    make_golden.cjs           runs the website JS over the bundle and writes the test fixture
    check_site_parity.cjs     compares results on the website's demo.json vs the app bundle
    make_icon.py              renders the placeholder icon PNGs and writes the colour sets
    check.sh                  runs every check that doesn't need Xcode
    reference/                read-only snapshots of the website's infer.js and soften.js
```

## Data: what's bundled and how to regenerate it

`whynext-data.json` is generated, never edited by hand. It has the six subjects and their three check questions (the same as the website demo), the 866 topics in those subjects with their real prerequisite reasons, the prerequisite topics they reach outside the subjects (with descriptions), 2,085 link reasons, the stage summaries, the 61 kitchen-table ideas, and the credit line.

```bash
# from the repo root; the merged data lives in out/merged/data (on the site-draft and secondary-extension branches, not on main)
python3 app/tools/build_app_data.py --data out/merged/data
node app/tools/make_golden.cjs          # refresh the expected results the tests use
cd app/WhyNextCore && swift test
```

The build is deterministic (same input, byte-identical output). It follows `site/build/build_data.py`, so the same inference gives the same topics on either file (`node app/tools/check_site_parity.cjs site/data/demo.json` checks it).

If the website's inference changes, copy the new `site/assets/infer.js` (and `soften.js`) into `app/tools/reference/`, run `make_golden.cjs`, and update `Inference.swift` until `swift test` passes.

## What has been checked, and what hasn't

Checked on Linux (Swift 6.2.1, XcodeGen 2.46.0 built from source), with `app/tools/check.sh`:

- The data bundle rebuilds byte-for-byte from `out/merged/data`.
- The Swift inference gives **exactly** the website JavaScript's results for all 162 combinations (6 subjects × 27 answer sets): level, every Mastered/estimated/Up next/Coming up list and its order, flags, "Why now?" reasons, notes. A deliberately broken copy of the Swift code fails 82 checks, so the test does catch differences.
- The website JavaScript gives the same results on the website's `demo.json` and on the app bundle (162/162).
- Text softening matches the website for all 4,017 texts in the bundle.
- Data integrity, comes-after/unlocks inverse, search, multi-child storage, reload from disk, and recovery from a damaged save file (10 tests, all passing).
- All JSON and plist files parse. `swift-format lint --strict` is clean. Every app Swift file parses. XcodeGen generates the project without errors.

Not checked (needs a Mac with Xcode):

- Compiling the SwiftUI app target. Apple's SwiftUI isn't available on Linux, so the UI code has been written carefully and parsed, but not type-checked or run. Expect possibly a few small compile fixes on first build.
- How it looks and behaves on iPhone, iPad and Mac, Dynamic Type at large sizes, VoiceOver, dark mode, the icon in the asset catalog, and signing.

## Later: putting it on the App Store

Not needed to run it yourself. When you want to publish:

1. **Join the Apple Developer Program**: US$99 a year (developer.apple.com/programs). Enrolling as an individual is quickest; an organisation needs a D-U-N-S number.
2. **Bundle ID.** Register a permanent one in Certificates, Identifiers & Profiles (e.g. `com.pandeyaby.whynext`), set it in `project.yml`, and set `DEVELOPMENT_TEAM` to your paid team.
3. **App Store Connect.** Create the app record (iOS and macOS can share one record with Universal Purchase), category **Education**, age rating questionnaire, description, keywords, support URL.
4. **Privacy.** A privacy policy URL is required even when nothing is collected. In the App Privacy section ("nutrition label"), answer **Data Not Collected**. The bundled privacy manifest already says the same. Export compliance: the app uses no encryption (`ITSAppUsesNonExemptEncryption = NO` is set).
5. **Kids.** The app is for parents of 11 to 18 year olds. If you put it in the Kids Category, Apple's extra kids rules apply (no external links without a parental gate, among others); the About screen has links to the licences and repo, so either add a parental gate or keep it out of the Kids Category.
6. **Screenshots** for iPhone (6.9"), iPad (13") and Mac, then **Archive** in Xcode (Product > Archive), upload, test with TestFlight, and submit for review.
7. **Licences.** Keep the credit line in the app and the listing. Because the data is ODbL/CC BY-SA, the derived database must stay available under the same terms (it is, in the public repo). The licence for the app's own source code hasn't been chosen yet.
8. **Polish to do first:** a designed icon to replace the placeholder, real screenshots, a look at copy for younger readers, and VoiceOver and Dynamic Type checks on devices.
