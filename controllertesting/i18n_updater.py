import json
import re

languages = ["en", "es", "de", "fr", "ja", "pt", "ko", "ru", "zh-tw", "it"]

keys = {
  "hero.kicker1": "Controller test / precision diagnostics",
  "hero.kicker2": "Browser / ready",
  "hero.headline.part1": "Is your controller really ",
  "hero.headline.part2": "working correctly?",
  "hero.subtext": "Test sticks, buttons, triggers, vibration, and input stability in your browser.",
  "hero.cta1": "Connect controller",
  "hero.cta2": "Run a quick test",
  "hero.samples": "hardware telemetry samples measured",
  "hero.worksWith": "Works with",

  "stats.label": "Live hardware telemetry",
  "stats.samples": "samples",
  "stats.desc": "drift & circularity measurements from real controller tests",
  "stats.tools": "Hardware tools",
  "stats.controllers": "Controllers tested",
  "stats.privacy": "Privacy preserving",
  "stats.installs": "Installs required",

  "bento.heading1": "39 core diagnostic tools. One controller.",
  "bento.heading2": "Every test you need.",
  "bento.healthScore.badge": "Flagship",
  "bento.healthScore.title": "Controller Health Score",
  "bento.healthScore.desc": "The only 0-100 score that measures drift, buttons, triggers, polling rate, and circularity in a single diagnostic. Get your grade: A+ to F.",
  "common.getScore": "Get your score",
  "bento.healthScore.grade": "GRADE A+",
  "bento.healthScore.drift": "DRIFT:",
  "bento.healthScore.passed": "PASSED",
  "bento.healthScore.polling": "POLLING:",
  "bento.healthScore.circularity": "CIRCULARITY:",
  "bento.healthScore.perfect": "PERFECT",
  "bento.tool.drift.badge": "Most used",
  "bento.tool.drift.name": "Stick Drift Test",
  "bento.tool.drift.desc": "Detect analog stick drift to 0.1% precision",
  "bento.tool.diag.badge": "Flagship",
  "bento.tool.diag.name": "Full Diagnostic",
  "bento.tool.diag.desc": "Complete 2-minute controller health checkup",
  "bento.tool.buttons.name": "Button Tester",
  "bento.tool.buttons.desc": "Test every button for ghosting and response",
  "bento.tool.triggers.name": "Trigger Pressure",
  "bento.tool.triggers.desc": "Measure analog trigger linearity and range",
  "bento.tool.score.badge": "Unique",
  "bento.tool.score.name": "Health Score",
  "bento.tool.score.desc": "Get your controller's 0-100 score + grade",
  "bento.tool.deadzone.name": "Deadzone Visualizer",
  "bento.tool.deadzone.desc": "Find the perfect deadzone for your game",
  "bento.tool.polling.name": "Polling Rate",
  "bento.tool.polling.desc": "Measure input frequency in Hz",
  "bento.tool.circularity.name": "Circularity Test",
  "bento.tool.circularity.desc": "Check stick movement roundness and range",
  "common.runTest": "Run test",
  "bento.viewAll": "View all 29 controller tests",
  "bento.mouseTests": "Mouse tests",
  "bento.keyboardTests": "Keyboard tests",
  "setup.badge": "Full-Setup Testing",
  "setup.title": "Your mouse and keyboard get the same treatment.",
  "setup.desc": "CPS speed, DPI analysis, 8K polling, click latency, double-click faults, scroll-wheel health — 7 mouse tools. Plus a mechanical keyboard sandbox with NKRO matrix verification.",
  "setup.cps": "CPS Test",
  "setup.dpi": "DPI Analyzer",
  "setup.polling": "8K Polling Rate",
  "setup.doubleClick": "Double-Click Fault",
  "setup.keyboard": "Keyboard Sandbox",

  "journey.heading1": "One platform.",
  "journey.heading2": "Every answer.",
  "journey.desc": "When your controller feels off, you currently visit 5-8 websites to solve one problem. We own the entire journey in one place.",
  "journey.start": "Start your journey",
  "journey.test": "Test",
  "journey.testDesc": "Run the Full Diagnostic — takes 2 minutes. Get your Health Score.",
  "journey.diagnose": "Diagnose",
  "journey.diagnoseDesc": "See exactly what's wrong. Drift percentage, trigger wear, button response.",
  "journey.decide": "Decide",
  "journey.decideDesc": "Fix vs Replace Calculator weighs repair cost against replacement price.",
  "journey.fix": "Fix",
  "journey.fixDesc": "Step-by-step repair guide with embedded re-test to verify it worked.",
  "journey.optimize": "Optimize",
  "journey.optimizeDesc": "Get game-specific deadzone and sensitivity settings based on your test.",

  "games.heading1": "Test your controller.",
  "games.heading2": "Then play with it.",
  "games.desc": "5 browser games built around your controller inputs. Earn XP points, level up, build a daily streak. No gaming site has this.",
  "games.precision": "Precision games",
  "games.reflex": "Reflex games",
  "games.2player": "2-Player games",
  "games.openArcade": "Open Arcade",
  "games.sniper.label": "STICK SNIPER",
  "games.sniper.type": "PRECISION",
  "games.sniper.avg": "Avg:",
  "games.sniper.best": "Best:",
  "games.sniper.score": "Score:",
  "games.blitz.label": "BUTTON BLITZ",
  "games.blitz.type": "REFLEX",
  "games.rewards.title": "Earn while you play",
  "games.rewards.test": "Test completion +50 pts",
  "games.rewards.achievements": "Achievements unlock",
  "games.rewards.leaderboard": "Leaderboard rank",

  "moat.heading1": "Built different.",
  "moat.heading2": "Not just another tester.",
  "moat.desc": "Every competitor is a single-page app with 5-30 indexed pages and zero content. We are an 830+ page platform that owns the entire controller lifecycle.",
  "moat.others": "Other sites",
  "moat.others.1": "5-30 indexed pages (SPA)",
  "moat.others.2": "Shows raw data, not answers",
  "moat.others.3": "2-4 minute sessions",
  "moat.others.4": "Zero repair guides or content",
  "moat.others.5": "No games, no engagement loop",
  "moat.us": "ControllerTesting.com",
  "moat.us.1": "830+ indexed pages (Astro SSG)",
  "moat.us.2": "Diagnoses, fixes, and optimizes",
  "moat.us.3": "8-15 minute sessions (games)",
  "moat.us.4": "800+ repair guides and content pages",
  "moat.us.5": "5 games, XP rewards, daily streaks",

  "faq.eyebrow": "Quick answers",
  "faq.heading1": "Before you test,",
  "faq.heading2": "know what to expect.",
  "faq.desc": "Connect a controller, choose the signal you want to inspect, and get a result you can act on. The first test is always free.",

  "cta.heading": "Your controller deserves a real diagnosis.",
  "cta.desc": "Takes 2 minutes. No downloads, no accounts, no data collection. Everything runs in your browser.",
  "common.testController": "Test your controller",
  "cta.quickDrift": "Quick Drift Test",
  "cta.feat1": "Completely free",
  "cta.feat2": "No download required",
  "cta.feat3": "Works in 2 seconds",

  "seo.title1": "The Complete Browser-Based Controller Diagnostic Platform",
  "seo.p1": "Whether you're a competitive esports player looking to eliminate input delay on <strong>controller games</strong>, or a casual gamer verifying a secondhand console to play the <strong>best nintendo switch games</strong>, hardware reliability is critical. From preparing for upcoming <strong>nintendo switch 2 games</strong> on the much-anticipated <strong>nintendo switch 2</strong> console to enjoying classics on a <strong>nintendo switch oled</strong> or <strong>nintendo switch lite</strong>, having a fully functional gamepad is non-negotiable. Our platform provides an instant, installation-free <strong>controller test</strong> directly in your browser. Utilizing the HTML5 Gamepad API, we read raw telemetry from your hardware, allowing you to visualize analog stick accuracy, button actuation, and trigger linearity across all major devices—including the <strong>playstation 5 controller</strong>, the <strong>nintendo switch pro controller</strong>, and the <strong>xbox elite controller series 2</strong>.",
  "seo.title2": "Precision Diagnostics: Visualizing Stick Drift and Wear",
  "seo.p2": "Analog stick degradation is the most common point of hardware failure in modern gamepads. Before you invest in a costly <strong>nintendo switch joy con repair</strong> or buy a new set of <strong>nintendo switch games</strong>, it is crucial to determine if your crosshair movement is caused by a software deadzone configuration or physical potentiometer wear. Our diagnostic suite measures resting axis variance down to a 0.1% margin of error. If you are experiencing unexpected camera movement on your DualSense, running our dedicated test will quickly confirm the presence of <strong>ps5 controller drift</strong>, empowering you to adjust your in-game settings or pursue a warranty claim.",
  "seo.title3": "Supported Hardware: From Next-Gen to Retro",
  "seo.p3": "Our testing engine is built for maximum compatibility. You can perform a rigorous <strong>xbox controller test</strong> to verify the adjustable tension thumbsticks on an <strong>xbox elite controller</strong> (including the <strong>xbox elite controller series</strong> models), or map the unique inputs of a <strong>switch 2 pro controller</strong>. We extensively support <strong>nintendo</strong> hardware; whether you are testing a standard <strong>nintendo switch joy con</strong> or mapping a legacy <strong>super nintendo controller switch</strong> setup via USB, our interface accurately reflects the <strong>nintendo controller layout</strong>. Even an <strong>old nintendo controller</strong> or an <strong>original nintendo controller</strong> paired with an adapter can be analyzed for input latency and ghosting. If you need to test a <strong>joy con controller</strong>, a <strong>switch controller</strong>, or verify <strong>nintendo switch controller</strong> drift, we have you covered.",
  "seo.title4": "Connectivity: Pairing Your Device for PC and Mobile",
  "seo.p4": "A frequent barrier to hardware testing and playing <strong>controller games for pc</strong> is establishing a stable connection. A common question we receive is <strong>how to connect ps5 controller to pc</strong>, <strong>how to connect ps5 controller</strong> generally, or <strong>how to connect ps5 controller to iphone</strong>. For PC, the most reliable method with the lowest latency is a direct USB-C connection. For wireless testing or iOS gaming, simply hold the Create and PS buttons simultaneously until the light bar flashes to initiate Bluetooth pairing. Once connected, your OS will expose the device to the browser, allowing you to instantly play <strong>online controller games</strong> (or <strong>pc controller games</strong>) or run our polling rate diagnostic on your <strong>ps5 controller pro</strong> or standard <strong>ps5 controller</strong>. We also fully support the <strong>xbox controller</strong> and <strong>ps4 controller</strong> for all these features.",
  "seo.title5": "Limitations and Browser Implementation",
  "seo.p5": "While our <strong>ps4 controller test</strong> and <strong>ps5 controller test</strong> suites are highly accurate, it's important to understand the limitations of the Gamepad API. Browsers normalize inputs differently depending on your operating system. For example, Windows may apply a hardware-level deadzone to Xbox controllers before the data ever reaches the browser. Similarly, testing a <strong>nintendo controller switch</strong> setup, a <strong>joy con 2</strong>, or a <strong>switch joy con</strong> wirelessly via Bluetooth can introduce artificial latency compared to a wired connection. We always recommend using a wired connection on a Chromium browser (like Google Chrome or Microsoft Edge) for the most accurate diagnostic results across all your <strong>nintendo switch</strong> and next-gen gaming hardware.",

  "tool.drift.title": "Understanding Your Test Results",
  "tool.drift.desc": "Our interpretation engine compares your drift against a baseline dataset of over 142,000 tested controllers. The exact thresholds depend on your controller model, but generally follow this curve:",
  "tool.drift.result.normal.title": "Normal Variance (Healthy)",
  "tool.drift.result.normal.text": "Drift under ~2.0% (varies by model). No in-game phantom movement will occur, even at 0% deadzone.",
  "tool.drift.result.minor.title": "Minor Wear (Watch)",
  "tool.drift.result.minor.text": "Drift from 2.0% to ~10%. Typical potentiometer aging. Increase deadzone to compensate.",
  "tool.drift.result.severe.title": "Severe Wear (Action Needed)",
  "tool.drift.result.severe.text": "Drift above 10%. Significant hardware degradation. Consider warranty claim or module replacement.",
  "tool.drift.export.title": "Save your drift test snapshot",
  "tool.drift.export.desc": "Export your results as a verified PDF diagnostic report or track drift over time.",
  "tool.drift.export.report": "Generate Health Report",
  "tool.drift.export.timeline": "Save to Timeline",
  "tool.drift.related.diag.badge": "Flagship",
  "tool.drift.related.diag.title": "Full Diagnostic Wizard",
  "tool.drift.related.diag.desc": "Test drift, buttons, triggers, and rumble in 2 minutes.",
  "tool.drift.related.circ.title": "Circularity Test",
  "tool.drift.related.circ.desc": "Measure stick range of motion and outer error boundary.",
  "tool.drift.related.deadzone.title": "Deadzone Visualizer",
  "tool.drift.related.deadzone.desc": "Find the ideal deadzone setting for competitive FPS games.",
  "tool.drift.related.polling.title": "Polling Rate Checker",
  "tool.drift.related.polling.desc": "Test controller response latency and polling rate in Hz.",
  "tool.drift.content.h2_1": "What Is Controller Stick Drift?",
  "tool.drift.content.p1": "Controller stick drift is an analog thumbstick hardware defect where a controller registers phantom movement inputs despite both thumbsticks resting untouched at absolute center. It occurs when mechanical friction degrades potentiometer wiper contacts or dust accumulates inside the thumbstick module, triggering camera jitter or unintended character movement in competitive games.",
  "tool.drift.content.h3_1": "Why Potentiometers Suffer from Drift",
  "tool.drift.content.p2": "Most standard gamepads — including the PlayStation 5 DualSense, Xbox Wireless Controller, and Nintendo Switch Joy-Cons — use resistive potentiometer thumbsticks. Inside each potentiometer, a metallic wiper glides over a resistive graphite track to measure movement. Over time, friction wears down the graphite layer, creating microscopic debris that disrupts electrical resistance readings.",
  "tool.drift.content.h3_2": "How to Fix Stick Drift: 3 Proven Steps",
  "tool.drift.content.li1": "<strong>Clean with Isopropyl Alcohol:</strong> Turn off your controller, apply 2-3 drops of 99% isopropyl alcohol around the thumbstick ball joint, rotate the stick 30 times, and let it dry for 15 minutes.",
  "tool.drift.content.li2": "<strong>Adjust In-Game Deadzone:</strong> Open your game settings (e.g., Controller Settings → Deadzone) and increase the inner deadzone slider until camera movement stops.",
  "tool.drift.content.li3": "<strong>Upgrade to Hall-Effect Sticks:</strong> Replace your traditional potentiometers with Hall-effect magnetic stick modules, which eliminate friction and never suffer from drift.",
  "tool.drift.content.h2_2": "What this test cannot prove",
  "tool.drift.content.p3": "This browser-based test measures the output of your operating system's controller driver, not the raw hardware sensors directly. Therefore, it cannot distinguish between permanent mechanical wear and temporary environmental factors like dust or temperature. It also cannot bypass driver-level deadzones enforced by Windows or macOS. For highest confidence, run this test multiple times over several days via a wired USB connection to rule out Bluetooth transport jitter.",

  "nav.badge.core": "Core",
  "nav.badge.hot": "Hot",
  "nav.desc.ctrl": "Stick drift, circularity & input latency",
  "nav.desc.drift": "High-precision 0.1% drift detection",
  "nav.badge.8k": "8KHz",
  "nav.desc.mouse": "CPS, polling rate, DPI & double-click",
  "nav.badge.midi": "WebMIDI",
  "nav.desc.keyboard": "NKRO matrix & MIDI velocity",
  "nav.wizards": "Wizards & Telemetry",
  "nav.diagWizard": "Full Diagnostic Wizard",
  "nav.badge.pro": "PRO",
  "nav.desc.diagWizard": "5-step hardware checkup & score",
  "nav.quickHealth": "Quick Health Check",
  "nav.badge.60s": "60s",
  "nav.desc.quickHealth": "Instant hardware status grade",
  "nav.passport": "Controller Passport",
  "nav.badge.live": "Live",
  "nav.desc.passport": "Verifiable hardware evidence report",
  "nav.advanced": "Advanced Diagnostics",
  "nav.calibrator": "WebHID Calibrator",
  "nav.badge.new": "New",
  "nav.desc.calibrator": "Hardware zero-point reset",
  "nav.deadzoneSandbox": "Deadzone Sandbox",
  "nav.desc.deadzone": "Game-engine specific tuning",
  "nav.overclock": "Overclock Validator",
  "nav.desc.overclock": "Observed Hz & input latency",
  "nav.haptic": "Haptic Composer",
  "nav.desc.haptic": "WebAudio rumble generation",
  "nav.niche": "Niche Testers",
  "nav.switch": "Nintendo Switch",
  "nav.ps5": "PS5 DualSense",
  "nav.xbox": "Xbox Controller",
  "nav.joycon": "Joy-Con",
  "nav.switchPro": "Switch Pro",
  "nav.joystick": "Joystick Tester",
  "nav.mapping": "Gamepad Mapping",
  "nav.viewAll": "View All 39 Diagnostic Tools",
  "nav.badge.arcade": "Arcade",
  "nav.fixRepair": "Fix & Repair",
  "nav.desc.fixRepair": "Repair cost vs replacement decision calculator",
  "nav.warranty": "Warranty Assistant",
  "nav.desc.warranty": "RMA eligibility checker & claim evidence",
  "nav.widgets": "Widgets & Embeds",
  "nav.badge.widgets": "15 Widgets",
  "nav.desc.widgets": "Embed diagnostic widgets on your site",
  "nav.compat": "Compatibility Matrix",
  "nav.desc.compat": "Browser API support across OS & controllers",
  "nav.learnGuides": "Learn Guides",
  "nav.desc.learn": "Deep-dive technical repair & tuning articles",
  "nav.about": "About Us",
  "nav.desc.about": "Our engineering mission & architecture",
  "nav.contact": "Contact Us",
  "nav.desc.contact": "Get in touch with support & engineering",
  "nav.privacy": "Privacy Policy",
  "nav.desc.privacy": "Zero telemetry tracking & data commitment",
  "nav.terms": "Terms of Service",
  "nav.desc.terms": "Usage terms, disclaimers & licensing",
  "nav.search": "Search diagnostic tools…",
  "nav.howToConnect": "How to Connect",
  "nav.runFullDiag": "Run Full Hardware Diagnostic",

  "footer.tagline": "The only platform that owns the entire controller lifecycle from diagnosis to optimization. Free, instant, private — all processing in your browser.",
  "footer.badge.private": "Private",
  "footer.badge.instant": "Instant",
  "footer.badge.free": "Free Forever",
  "footer.col.moreTests": "More Tests",
  "footer.link.midi": "MIDI & Drum Pads",
  "footer.link.spatial": "Spatial Audio Test",
  "footer.link.hz": "Hz & Ghosting Test",
  "footer.col.compare": "Compare & Data",
  "footer.link.compareDualsenseXbox": "DualSense vs Xbox Series",
  "footer.link.compareEdgeElite": "Edge vs Elite Series 2",
  "footer.link.ps5Profile": "PS5 DualSense Profile",
  "footer.link.xboxProfile": "Xbox Wireless Profile",
  "footer.link.dualsenseReliability": "DualSense Reliability",
  "footer.link.xboxReliability": "Xbox Series X Reliability",
  "footer.link.pressKit": "Press Kit",
  "footer.col.learn": "Learn & Connect",
  "footer.link.shop": "Repair Shop Suite",
  "footer.link.verify": "Verify Certificate",
  "footer.link.passport": "Controller Passport",
  "footer.link.guides": "Controller Guides",
  "footer.link.connectPair": "Connect & Pair",
  "footer.link.hallEffect": "Hall Effect vs Potentiometer",
  "footer.link.methodology": "How Tests Work",
  "footer.link.reliabilityReport": "Monthly Reliability Report",
  "footer.legal": "ControllerTesting.com. All rights reserved. Results are informational only. Controller testing accuracy depends on browser Gamepad API implementation. Repair guides: always consult a professional for complex repairs. We are not responsible for any damage.",
  "footer.affiliate": "<strong>Affiliate disclosure:</strong> Some links on this site are affiliate links. We may earn a commission if you purchase through them, at no extra cost to you. All recommendations are based on our independent testing and analysis."
}

def translate(text, lang):
    # Dummy translation for languages to maintain the keys
    if lang == "en":
        return text
    return f"[{lang.upper()}] {text}"

with open("/Users/divyyadav/final_tool/controllertesting/src/i18n/translations.ts", "r") as f:
    content = f.read()

start_idx = content.find('export const ui = {')
prefix = content[:start_idx]
out = prefix + 'export const ui = {\n'

def extract_original_ui():
    dict_content = content[start_idx:]
    en_block = re.search(r'"en":\s*{(.*?)}', dict_content, re.DOTALL)
    if not en_block: return {}
    en_keys = {}
    for match in re.finditer(r'"([^"]+)":\s*"([^"]+)"', en_block.group(1)):
        en_keys[match.group(1)] = match.group(2)
    return en_keys

orig_keys = extract_original_ui()
for k, v in orig_keys.items():
    if k not in keys:
        keys[k] = v

for lang in languages:
    out += f'  "{lang}": {{\n'
    for k, v in keys.items():
        v = v.replace('"', '\\"')
        val = translate(v, lang)
        out += f'    "{k}": "{val}",\n'
    out += '  },\n'

out += '};\n'

with open("/Users/divyyadav/final_tool/controllertesting/src/i18n/translations.ts", "w") as f:
    f.write(out)

