import os

def update_file(filepath, replacements, lang=None):
    if not os.path.exists(filepath):
        print(f"Skipping {filepath}, does not exist")
        return

    with open(filepath, 'r') as f:
        content = f.read()

    # If it's a page and we need to inject useTranslations
    if lang is not None:
        if "useTranslations" not in content:
            # Inject import and t function
            # Find the first line after ---
            lines = content.split('\n')
            for i, line in enumerate(lines):
                if line.strip() == '---':
                    if i == 0:
                        lines.insert(1, f"import {{ useTranslations }} from '@i18n/utils';\nconst t = useTranslations('{lang}');")
                        break
            content = '\n'.join(lines)
            
            # Note: in index.astro, the imports are:
            # import BaseLayout from '@layouts/BaseLayout.astro';
            # Let's fix the import path. The prompt says: import { useTranslations } from '../../i18n/utils';
            # For index.astro in /es/, it would be ../../i18n/utils.
            # But we can use absolute or relative. Let's use relative or alias.
            # actually utils.ts is in src/i18n/utils.ts, but let's use the exact one in the prompt or something that works.
            # wait, I can just replace the injected part with a regex after finding the frontmatter.
            
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)

# We will just write specialized replacement functions.
def process_header():
    filepath = "src/components/global/Header.astro"
    reps = {
        "{t('nav.tools')}": "{t('nav.tools')}",
        "{t('nav.diagnosticTools')}": "{t('nav.diagnosticTools')}",
        "{t('nav.controllerTests')}": "{t('nav.controllerTests')}",
        "Stick drift, circularity &amp; input latency": "{t('nav.desc.ctrl')}",
        "{t('nav.stickDriftTest')}": "{t('nav.stickDriftTest')}",
        "High-precision 0.1% drift detection": "{t('nav.desc.drift')}",
        "{t('nav.mouseSuite')}": "{t('nav.mouseSuite')}",
        "CPS, polling rate, DPI &amp; double-click": "{t('nav.desc.mouse')}",
        "{t('nav.keyboardSuite')}": "{t('nav.keyboardSuite')}",
        "NKRO matrix &amp; MIDI velocity": "{t('nav.desc.keyboard')}",
        "Wizards &amp; Telemetry": "{t('nav.wizards')}",
        "Full Diagnostic Wizard": "{t('nav.diagWizard')}",
        "5-step hardware checkup &amp; score": "{t('nav.desc.diagWizard')}",
        "Quick Health Check": "{t('nav.quickHealth')}",
        "Instant hardware status grade": "{t('nav.desc.quickHealth')}",
        "Controller Passport": "{t('nav.passport')}",
        "Verifiable hardware evidence report": "{t('nav.desc.passport')}",
        "Advanced Diagnostics": "{t('nav.advanced')}",
        "WebHID Calibrator": "{t('nav.calibrator')}",
        "Hardware zero-point reset": "{t('nav.desc.calibrator')}",
        "Deadzone Sandbox": "{t('nav.deadzoneSandbox')}",
        "Game-engine specific tuning": "{t('nav.desc.deadzone')}",
        "Overclock Validator": "{t('nav.overclock')}",
        "Observed Hz &amp; input latency": "{t('nav.desc.overclock')}",
        "Haptic Composer": "{t('nav.haptic')}",
        "WebAudio rumble generation": "{t('nav.desc.haptic')}",
        "Niche Testers": "{t('nav.niche')}",
        "Nintendo Switch": "{t('nav.switch')}",
        "PS5 DualSense": "{t('nav.ps5')}",
        "Xbox Controller": "{t('nav.xbox')}",
        "Joy-Con": "{t('nav.joycon')}",
        "Switch Pro": "{t('nav.switchPro')}",
        "Joystick Tester": "{t('nav.joystick')}",
        "Gamepad Mapping": "{t('nav.mapping')}",
        "<span>View All 39 Diagnostic Tools</span>": "<span>{t('nav.viewAll')}</span>",
        "Resources\n            <svg": "{t('nav.resources')}\n            <svg",
        "Fix &amp; Repair": "{t('nav.fixRepair')}",
        "Repair cost vs replacement decision calculator": "{t('nav.desc.fixRepair')}",
        "Warranty Assistant": "{t('nav.warranty')}",
        "RMA eligibility checker &amp; claim evidence": "{t('nav.desc.warranty')}",
        "Widgets &amp; Embeds": "{t('nav.widgets')}",
        "Embed diagnostic widgets on your site": "{t('nav.desc.widgets')}",
        "Compatibility Matrix": "{t('nav.compat')}",
        "Browser API support across OS &amp; controllers": "{t('nav.desc.compat')}",
        "Learn Guides": "{t('nav.learnGuides')}",
        "Deep-dive technical repair &amp; tuning articles": "{t('nav.desc.learn')}",
        "About Us": "{t('nav.about')}",
        "Our engineering mission &amp; architecture": "{t('nav.desc.about')}",
        "Contact Us": "{t('nav.contact')}",
        "Get in touch with support &amp; engineering": "{t('nav.desc.contact')}",
        "Privacy Policy": "{t('nav.privacy')}",
        "Zero telemetry tracking &amp; data commitment": "{t('nav.desc.privacy')}",
        "Terms of Service": "{t('nav.terms')}",
        "Usage terms, disclaimers &amp; licensing": "{t('nav.desc.terms')}",
        "Search diagnostic tools…": "{t('nav.search')}",
        "How to Connect": "{t('nav.howToConnect')}",
        "Run Full Hardware Diagnostic": "{t('nav.runFullDiag')}",
        "Search diagnostic tools...": "{t('nav.search')}",
        '<span class="nav-badge badge-core">Core</span>': '<span class="nav-badge badge-core">{t("nav.badge.core")}</span>',
        '<span class="nav-badge badge-speed">Hot</span>': '<span class="nav-badge badge-speed">{t("nav.badge.hot")}</span>',
        '<span class="nav-badge badge-precision">8KHz</span>': '<span class="nav-badge badge-precision">{t("nav.badge.8k")}</span>',
        '<span class="nav-badge badge-midi">WebMIDI</span>': '<span class="nav-badge badge-midi">{t("nav.badge.midi")}</span>',
        '<span class="nav-badge badge-pro">PRO</span>': '<span class="nav-badge badge-pro">{t("nav.badge.pro")}</span>',
        '<span class="nav-badge badge-speed">60s</span>': '<span class="nav-badge badge-speed">{t("nav.badge.60s")}</span>',
        '<span class="nav-badge badge-live">Live</span>': '<span class="nav-badge badge-live">{t("nav.badge.live")}</span>',
        '<span class="nav-badge badge-pass">New</span>': '<span class="nav-badge badge-pass">{t("nav.badge.new")}</span>',
        '<span class="nav-badge badge-games" style="margin-left:4px; font-size:0.65rem; padding:2px 6px; border-radius:10px; background:rgba(236,72,153,0.15); color:#ec4899; border:1px solid rgba(236,72,153,0.3);">Arcade</span>': '<span class="nav-badge badge-games" style="margin-left:4px; font-size:0.65rem; padding:2px 6px; border-radius:10px; background:rgba(236,72,153,0.15); color:#ec4899; border:1px solid rgba(236,72,153,0.3);">{t("nav.badge.arcade")}</span>',
        '<span class="nav-badge badge-widgets">15 Widgets</span>': '<span class="nav-badge badge-widgets">{t("nav.badge.widgets")}</span>',
        'Play\n            <span class="nav-badge badge-games"': '{t("nav.play")}\n            <span class="nav-badge badge-games"',
        '<p class="mobile-nav-heading">Diagnostics</p>': '<p class="mobile-nav-heading">{t("nav.tools")}</p>',
        '<p class="mobile-nav-heading">Arcade Games</p>': '<p class="mobile-nav-heading">{t("nav.arcadeGames")}</p>',
        '<p class="mobile-nav-heading">Resources</p>': '<p class="mobile-nav-heading">{t("nav.resources")}</p>',
        '<span>All 39 Diagnostic Tools</span>': '<span>{t("nav.viewAll")}</span>',
        '<span class="nav-badge badge-games">5 Games</span>': '<span class="nav-badge badge-games">5 Games</span>'
    }
    update_file(filepath, reps)

def process_footer():
    filepath = "src/components/global/Footer.astro"
    reps = {
        "The only platform that owns the entire controller lifecycle from diagnosis to optimization.\n          Free, instant, private — all processing in your browser.": "{t('footer.tagline')}",
        "Private\n          </span>": "{t('footer.badge.private')}\n          </span>",
        "Instant\n          </span>": "{t('footer.badge.instant')}\n          </span>",
        "Free Forever\n          </span>": "{t('footer.badge.free')}\n          </span>",
        "More Tests <span": "{t('footer.col.moreTests')} <span",
        "MIDI &amp; Drum Pads": "{t('footer.link.midi')}",
        "Spatial Audio Test": "{t('footer.link.spatial')}",
        "Hz &amp; Ghosting Test": "{t('footer.link.hz')}",
        "Compare &amp; Data <span": "{t('footer.col.compare')} <span",
        "DualSense vs Xbox Series": "{t('footer.link.compareDualsenseXbox')}",
        "Edge vs Elite Series 2": "{t('footer.link.compareEdgeElite')}",
        "PS5 DualSense Profile": "{t('footer.link.ps5Profile')}",
        "Xbox Wireless Profile": "{t('footer.link.xboxProfile')}",
        "DualSense Reliability": "{t('footer.link.dualsenseReliability')}",
        "Xbox Series X Reliability": "{t('footer.link.xboxReliability')}",
        "Press Kit": "{t('footer.link.pressKit')}",
        "Learn &amp; Connect <span": "{t('footer.col.learn')} <span",
        "Repair Shop Suite": "{t('footer.link.shop')}",
        "Verify Certificate": "{t('footer.link.verify')}",
        "Controller Guides": "{t('footer.link.guides')}",
        "Connect &amp; Pair": "{t('footer.link.connectPair')}",
        "Hall Effect vs Potentiometer": "{t('footer.link.hallEffect')}",
        "How Tests Work": "{t('footer.link.methodology')}",
        "Monthly Reliability Report": "{t('footer.link.reliabilityReport')}",
        "&copy; {new Date().getFullYear()} ControllerTesting.com. All rights reserved.\n        Results are informational only. Controller testing accuracy depends on browser Gamepad API implementation.\n        Repair guides: always consult a professional for complex repairs. We are not responsible for any damage.": "&copy; {new Date().getFullYear()} {t('footer.legal')}",
        "<strong>Affiliate disclosure:</strong> Some links on this site are affiliate links. We may earn a commission if you purchase through them, at no extra cost to you. All recommendations are based on our independent testing and analysis.": "<span set:html={t('footer.affiliate')} />"
    }
    update_file(filepath, reps)

def process_index(filepath, is_localized=False, lang=''):
    reps = {
        "<span>Controller test / precision diagnostics</span>": "<span>{t('hero.kicker1')}</span>",
        '<span class="hero-kicker-meta">Browser / ready</span>': '<span class="hero-kicker-meta">{t("hero.kicker2")}</span>',
        'Is your controller really <span class="text-accent">working correctly?</span>': '{t("hero.headline.part1")}<span class="text-accent">{t("hero.headline.part2")}</span>',
        "Test sticks, buttons, triggers, vibration, and input stability in your browser.": "{t('hero.subtext')}",
        "Connect controller\n              <span": "{t('hero.cta1')}\n              <span",
        "Run a quick test": "{t('hero.cta2')}",
        "hardware telemetry samples measured": "{t('hero.samples')}",
        '<span class="compat-label">Works with</span>': '<span class="compat-label">{t("hero.worksWith")}</span>',
        '<span class="stat-featured-label">Live hardware telemetry</span>': '<span class="stat-featured-label">{t("stats.label")}</span>',
        '<span class="stat-featured-unit">samples</span>': '<span class="stat-featured-unit">{t("stats.samples")}</span>',
        '<span class="stat-featured-desc">drift &amp; circularity measurements from real controller tests</span>': '<span class="stat-featured-desc">{t("stats.desc")}</span>',
        
        "39 core diagnostic tools. One controller.\n            <br />Every test you need.": "{t('bento.heading1')}\n            <br />{t('bento.heading2')}",
        '<span class="bento-badge">Flagship</span>': '<span class="bento-badge">{t("bento.healthScore.badge")}</span>',
        '<h3 class="bento-featured-title">Controller Health Score</h3>': '<h3 class="bento-featured-title">{t("bento.healthScore.title")}</h3>',
        "The only 0-100 score that measures drift, buttons, triggers, polling rate,\n                and circularity in a single diagnostic. Get your grade: A+ to F.": "{t('bento.healthScore.desc')}",
        "Get your score\n                <span": "{t('common.getScore')}\n                <span",
        '<span class="score-label">GRADE A+</span>': '<span class="score-label">{t("bento.healthScore.grade")}</span>',
        '<span class="m-lbl">DRIFT:</span>': '<span class="m-lbl">{t("bento.healthScore.drift")}</span>',
        'PASSED</span>': '{t("bento.healthScore.passed")}</span>',
        '<span class="m-lbl">POLLING:</span>': '<span class="m-lbl">{t("bento.healthScore.polling")}</span>',
        '<span class="m-lbl">CIRCULARITY:</span>': '<span class="m-lbl">{t("bento.healthScore.circularity")}</span>',
        'PERFECT</span>': '{t("bento.healthScore.perfect")}</span>',
        
        "{ name: 'Stick Drift Test', href: '/test/controller/drift', desc: 'Detect analog stick drift to 0.1% precision', badge: 'Most used', icon: 'drift' }": "{ name: t('bento.tool.drift.name'), href: '/test/controller/drift', desc: t('bento.tool.drift.desc'), badge: t('bento.tool.drift.badge'), icon: 'drift' }",
        "{ name: 'Full Diagnostic', href: '/test/controller/full-diagnostic', desc: 'Complete 2-minute controller health checkup', badge: 'Flagship', icon: 'diagnostic' }": "{ name: t('bento.tool.diag.name'), href: '/test/controller/full-diagnostic', desc: t('bento.tool.diag.desc'), badge: t('bento.tool.diag.badge'), icon: 'diagnostic' }",
        "{ name: 'Button Tester', href: '/test/controller/buttons', desc: 'Test every button for ghosting and response', icon: 'buttons' }": "{ name: t('bento.tool.buttons.name'), href: '/test/controller/buttons', desc: t('bento.tool.buttons.desc'), icon: 'buttons' }",
        "{ name: 'Trigger Pressure', href: '/test/controller/triggers', desc: 'Measure analog trigger linearity and range', icon: 'triggers' }": "{ name: t('bento.tool.triggers.name'), href: '/test/controller/triggers', desc: t('bento.tool.triggers.desc'), icon: 'triggers' }",
        "{ name: 'Health Score', href: '/test/controller/health-score', desc: 'Get your controller\\'s 0-100 score + grade', badge: 'Unique', icon: 'score' }": "{ name: t('bento.tool.score.name'), href: '/test/controller/health-score', desc: t('bento.tool.score.desc'), badge: t('bento.tool.score.badge'), icon: 'score' }",
        "{ name: 'Deadzone Visualizer', href: '/test/controller/deadzone', desc: 'Find the perfect deadzone for your game', icon: 'deadzone' }": "{ name: t('bento.tool.deadzone.name'), href: '/test/controller/deadzone', desc: t('bento.tool.deadzone.desc'), icon: 'deadzone' }",
        "{ name: 'Polling Rate', href: '/test/controller/polling-rate', desc: 'Measure input frequency in Hz', icon: 'polling' }": "{ name: t('bento.tool.polling.name'), href: '/test/controller/polling-rate', desc: t('bento.tool.polling.desc'), icon: 'polling' }",
        "{ name: 'Circularity Test', href: '/test/controller/circularity', desc: 'Check stick movement roundness and range', icon: 'circularity' }": "{ name: t('bento.tool.circularity.name'), href: '/test/controller/circularity', desc: t('bento.tool.circularity.desc'), icon: 'circularity' }",
        
        "{ value: '39', label: 'Hardware tools', mono: true }": "{ value: '39', label: t('stats.tools'), mono: true }",
        "{ value: '142k+', label: 'Controllers tested', mono: true }": "{ value: '142k+', label: t('stats.controllers'), mono: true }",
        "{ value: '100%', label: 'Privacy preserving', mono: true }": "{ value: '100%', label: t('stats.privacy'), mono: true }",
        "{ value: '0', label: 'Installs required', mono: true }": "{ value: '0', label: t('stats.installs'), mono: true }",
        
        "Run test\n                  <svg": "{t('common.runTest')}\n                  <svg",
        "View all 29 controller tests\n            <span": "{t('bento.viewAll')}\n            <span",
        "Mouse tests</a>": "{t('bento.mouseTests')}</a>",
        "Keyboard tests</a>": "{t('bento.keyboardTests')}</a>",
        
        "Full-Setup Testing</span>": "{t('setup.badge')}</span>",
        '<h3 class="setup-band-title">Your mouse and keyboard get the same treatment.</h3>': '<h3 class="setup-band-title">{t("setup.title")}</h3>',
        "CPS speed, DPI analysis, 8K polling, click latency, double-click faults, scroll-wheel health —\n                7 mouse tools. Plus a mechanical keyboard sandbox with NKRO matrix verification.": "{t('setup.desc')}",
        "CPS Test</a>": "{t('setup.cps')}</a>",
        "DPI Analyzer</a>": "{t('setup.dpi')}</a>",
        "8K Polling Rate</a>": "{t('setup.polling')}</a>",
        "Double-Click Fault</a>": "{t('setup.doubleClick')}</a>",
        "Keyboard Sandbox</a>": "{t('setup.keyboard')}</a>",
        
        "One platform.\n              <br />Every answer.": "{t('journey.heading1')}\n              <br />{t('journey.heading2')}",
        "When your controller feels off, you currently visit 5-8 websites to\n              solve one problem. We own the entire journey in one place.": "{t('journey.desc')}",
        "Start your journey\n            </a>": "{t('journey.start')}\n            </a>",
        
        "{ num: '01', title: 'Test', desc: 'Run the Full Diagnostic — takes 2 minutes. Get your Health Score.', href: '/test/controller/full-diagnostic' }": "{ num: '01', title: t('journey.test'), desc: t('journey.testDesc'), href: '/test/controller/full-diagnostic' }",
        "{ num: '02', title: 'Diagnose', desc: 'See exactly what\\'s wrong. Drift percentage, trigger wear, button response.', href: '/test/controller/health-score' }": "{ num: '02', title: t('journey.diagnose'), desc: t('journey.diagnoseDesc'), href: '/test/controller/health-score' }",
        "{ num: '03', title: 'Decide', desc: 'Fix vs Replace Calculator weighs repair cost against replacement price.', href: '/fix-or-replace' }": "{ num: '03', title: t('journey.decide'), desc: t('journey.decideDesc'), href: '/fix-or-replace' }",
        "{ num: '04', title: 'Fix', desc: 'Step-by-step repair guide with embedded re-test to verify it worked.', href: '/warranty' }": "{ num: '04', title: t('journey.fix'), desc: t('journey.fixDesc'), href: '/warranty' }",
        "{ num: '05', title: 'Optimize', desc: 'Get game-specific deadzone and sensitivity settings based on your test.', href: '/test/controller/competitive-readiness' }": "{ num: '05', title: t('journey.optimize'), desc: t('journey.optimizeDesc'), href: '/test/controller/competitive-readiness' }",
        
        "Test your controller.\n              <br />Then play with it.": "{t('games.heading1')}\n              <br />{t('games.heading2')}",
        "5 browser games built around your controller inputs. Earn XP points,\n              level up, build a daily streak. No gaming site has this.": "{t('games.desc')}",
        '<span class="games-type-label">Precision games</span>': '<span class="games-type-label">{t("games.precision")}</span>',
        '<span class="games-type-label">Reflex games</span>': '<span class="games-type-label">{t("games.reflex")}</span>',
        '<span class="games-type-label">2-Player games</span>': '<span class="games-type-label">{t("games.2player")}</span>',
        "Open Arcade\n              <span": "{t('games.openArcade')}\n              <span",
        '<span class="game-preview-label">STICK SNIPER</span>': '<span class="game-preview-label">{t("games.sniper.label")}</span>',
        '<span class="game-preview-type">PRECISION</span>': '<span class="game-preview-type">{t("games.sniper.type")}</span>',
        '<span class="gstat">Avg: ': '<span class="gstat">{t("games.sniper.avg")} ',
        '<span class="gstat">Best: ': '<span class="gstat">{t("games.sniper.best")} ',
        '<span class="gstat">Score: ': '<span class="gstat">{t("games.sniper.score")} ',
        '<span class="game-preview-label">BUTTON BLITZ</span>': '<span class="game-preview-label">{t("games.blitz.label")}</span>',
        '<span class="game-preview-type sm">REFLEX</span>': '<span class="game-preview-type sm">{t("games.blitz.type")}</span>',
        '<h3 class="rewards-title">Earn while you play</h3>': '<h3 class="rewards-title">{t("games.rewards.title")}</h3>',
        "Test completion +50 pts": "{t('games.rewards.test')}",
        "Achievements unlock": "{t('games.rewards.achievements')}",
        "Leaderboard rank": "{t('games.rewards.leaderboard')}",
        
        "Built different.<br />Not just another tester.": "{t('moat.heading1')}<br />{t('moat.heading2')}",
        "Every competitor is a single-page app with 5-30 indexed pages and zero content.\n            We are an 830+ page platform that owns the entire controller lifecycle.": "{t('moat.desc')}",
        '<h3 class="compare-heading">Other sites</h3>': '<h3 class="compare-heading">{t("moat.others")}</h3>',
        "5-30 indexed pages (SPA)": "{t('moat.others.1')}",
        "Shows raw data, not answers": "{t('moat.others.2')}",
        "2-4 minute sessions": "{t('moat.others.3')}",
        "Zero repair guides or content": "{t('moat.others.4')}",
        "No games, no engagement loop": "{t('moat.others.5')}",
        '<h3 class="compare-heading">ControllerTesting.com</h3>': '<h3 class="compare-heading">{t("moat.us")}</h3>',
        "830+ indexed pages (Astro SSG)": "{t('moat.us.1')}",
        "Diagnoses, fixes, and optimizes": "{t('moat.us.2')}",
        "8-15 minute sessions (games)": "{t('moat.us.3')}",
        "800+ repair guides and content pages": "{t('moat.us.4')}",
        "5 games, XP rewards, daily streaks": "{t('moat.us.5')}",
        
        '<span class="section-eyebrow">Quick answers</span>': '<span class="section-eyebrow">{t("faq.eyebrow")}</span>',
        "Before you test,<br />know what to expect.": "{t('faq.heading1')}<br />{t('faq.heading2')}",
        "Connect a controller, choose the signal you want to inspect, and get a result you can act on. The first test is always free.": "{t('faq.desc')}",
        
        "Your controller deserves a real diagnosis.": "{t('cta.heading')}",
        "Takes 2 minutes. No downloads, no accounts, no data collection.\n            Everything runs in your browser.": "{t('cta.desc')}",
        "Test your controller\n              <span": "{t('common.testController')}\n              <span",
        "Quick Drift Test\n            </a>": "{t('cta.quickDrift')}\n            </a>",
        "<span>Completely free</span>": "<span>{t('cta.feat1')}</span>",
        "<span>No download required</span>": "<span>{t('cta.feat2')}</span>",
        "<span>Works in 2 seconds</span>": "<span>{t('cta.feat3')}</span>",
        
        "The Complete Browser-Based Controller Diagnostic Platform": "{t('seo.title1')}",
        "Whether you're a competitive esports player looking to eliminate input delay on <strong>controller games</strong>, or a casual gamer verifying a secondhand console to play the <strong>best nintendo switch games</strong>, hardware reliability is critical. From preparing for upcoming <strong>nintendo switch 2 games</strong> on the much-anticipated <strong>nintendo switch 2</strong> console to enjoying classics on a <strong>nintendo switch oled</strong> or <strong>nintendo switch lite</strong>, having a fully functional gamepad is non-negotiable. Our platform provides an instant, installation-free <strong>controller test</strong> directly in your browser. Utilizing the HTML5 Gamepad API, we read raw telemetry from your hardware, allowing you to visualize analog stick accuracy, button actuation, and trigger linearity across all major devices—including the <strong>playstation 5 controller</strong>, the <strong>nintendo switch pro controller</strong>, and the <strong>xbox elite controller series 2</strong>.": "<span set:html={t('seo.p1')} />",
        "Precision Diagnostics: Visualizing Stick Drift and Wear": "{t('seo.title2')}",
        "Analog stick degradation is the most common point of hardware failure in modern gamepads. Before you invest in a costly <strong>nintendo switch joy con repair</strong> or buy a new set of <strong>nintendo switch games</strong>, it is crucial to determine if your crosshair movement is caused by a software deadzone configuration or physical potentiometer wear. Our diagnostic suite measures resting axis variance down to a 0.1% margin of error. If you are experiencing unexpected camera movement on your DualSense, running our dedicated test will quickly confirm the presence of <strong>ps5 controller drift</strong>, empowering you to adjust your in-game settings or pursue a warranty claim.": "<span set:html={t('seo.p2')} />",
        "Supported Hardware: From Next-Gen to Retro": "{t('seo.title3')}",
        "Our testing engine is built for maximum compatibility. You can perform a rigorous <strong>xbox controller test</strong> to verify the adjustable tension thumbsticks on an <strong>xbox elite controller</strong> (including the <strong>xbox elite controller series</strong> models), or map the unique inputs of a <strong>switch 2 pro controller</strong>. We extensively support <strong>nintendo</strong> hardware; whether you are testing a standard <strong>nintendo switch joy con</strong> or mapping a legacy <strong>super nintendo controller switch</strong> setup via USB, our interface accurately reflects the <strong>nintendo controller layout</strong>. Even an <strong>old nintendo controller</strong> or an <strong>original nintendo controller</strong> paired with an adapter can be analyzed for input latency and ghosting. If you need to test a <strong>joy con controller</strong>, a <strong>switch controller</strong>, or verify <strong>nintendo switch controller</strong> drift, we have you covered.": "<span set:html={t('seo.p3')} />",
        "Connectivity: Pairing Your Device for PC and Mobile": "{t('seo.title4')}",
        "A frequent barrier to hardware testing and playing <strong>controller games for pc</strong> is establishing a stable connection. A common question we receive is <strong>how to connect ps5 controller to pc</strong>, <strong>how to connect ps5 controller</strong> generally, or <strong>how to connect ps5 controller to iphone</strong>. For PC, the most reliable method with the lowest latency is a direct USB-C connection. For wireless testing or iOS gaming, simply hold the Create and PS buttons simultaneously until the light bar flashes to initiate Bluetooth pairing. Once connected, your OS will expose the device to the browser, allowing you to instantly play <strong>online controller games</strong> (or <strong>pc controller games</strong>) or run our polling rate diagnostic on your <strong>ps5 controller pro</strong> or standard <strong>ps5 controller</strong>. We also fully support the <strong>xbox controller</strong> and <strong>ps4 controller</strong> for all these features.": "<span set:html={t('seo.p4')} />",
        "Limitations and Browser Implementation": "{t('seo.title5')}",
        "While our <strong>ps4 controller test</strong> and <strong>ps5 controller test</strong> suites are highly accurate, it's important to understand the limitations of the Gamepad API. Browsers normalize inputs differently depending on your operating system. For example, Windows may apply a hardware-level deadzone to Xbox controllers before the data ever reaches the browser. Similarly, testing a <strong>nintendo controller switch</strong> setup, a <strong>joy con 2</strong>, or a <strong>switch joy con</strong> wirelessly via Bluetooth can introduce artificial latency compared to a wired connection. We always recommend using a wired connection on a Chromium browser (like Google Chrome or Microsoft Edge) for the most accurate diagnostic results across all your <strong>nintendo switch</strong> and next-gen gaming hardware.": "<span set:html={t('seo.p5')} />",
    }
    
    with open(filepath, 'r') as f:
        content = f.read()

    # In localized pages, we need to inject the import useTranslations
    if is_localized and "useTranslations" not in content:
        lines = content.split('\n')
        # find where --- ends or something.
        for i, line in enumerate(lines):
            if i > 0 and line.strip() == '---':
                # Insert before the closing ---
                lines.insert(i, f"import {{ useTranslations }} from '../../i18n/utils';\nconst t = useTranslations('{lang}');")
                break
        content = '\n'.join(lines)
    elif not is_localized and "useTranslations" not in content:
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if i > 0 and line.strip() == '---':
                lines.insert(i, f"import {{ useTranslations }} from '../i18n/utils';\nconst t = useTranslations('en');")
                break
        content = '\n'.join(lines)

    for old, new in reps.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)


def process_drift(filepath, is_localized=False, lang=''):
    reps = {
        '<h2 class="section-title">Understanding Your Test Results</h2>': '<h2 class="section-title">{t("tool.drift.title")}</h2>',
        "Our interpretation engine compares your drift against a baseline dataset of over 142,000 tested controllers. The exact thresholds depend on your controller model, but generally follow this curve:": "{t('tool.drift.desc')}",
        '<strong class="legend-title">Normal Variance (Healthy)</strong>': '<strong class="legend-title">{t("tool.drift.result.normal.title")}</strong>',
        "Drift under ~2.0% (varies by model). No in-game phantom movement will occur, even at 0% deadzone.": "{t('tool.drift.result.normal.text')}",
        '<strong class="legend-title">Minor Wear (Watch)</strong>': '<strong class="legend-title">{t("tool.drift.result.minor.title")}</strong>',
        "Drift from 2.0% to ~10%. Typical potentiometer aging. Increase deadzone to compensate.": "{t('tool.drift.result.minor.text')}",
        '<strong class="legend-title">Severe Wear (Action Needed)</strong>': '<strong class="legend-title">{t("tool.drift.result.severe.title")}</strong>',
        "Drift above 10%. Significant hardware degradation. Consider warranty claim or module replacement.": "{t('tool.drift.result.severe.text')}",
        '<h3 class="export-title">Save your drift test snapshot</h3>': '<h3 class="export-title">{t("tool.drift.export.title")}</h3>',
        '<p class="export-desc">Export your results as a verified PDF diagnostic report or track drift over time.</p>': '<p class="export-desc">{t("tool.drift.export.desc")}</p>',
        'Generate Health Report</a>': '{t("tool.drift.export.report")}</a>',
        'Save to Timeline</a>': '{t("tool.drift.export.timeline")}</a>',
        '<span class="tool-badge">Flagship</span>': '<span class="tool-badge">{t("tool.drift.related.diag.badge")}</span>',
        '<h3 class="tool-name">Full Diagnostic Wizard</h3>': '<h3 class="tool-name">{t("tool.drift.related.diag.title")}</h3>',
        '<p class="tool-desc">Test drift, buttons, triggers, and rumble in 2 minutes.</p>': '<p class="tool-desc">{t("tool.drift.related.diag.desc")}</p>',
        '<h3 class="tool-name">Circularity Test</h3>': '<h3 class="tool-name">{t("tool.drift.related.circ.title")}</h3>',
        '<p class="tool-desc">Measure stick range of motion and outer error boundary.</p>': '<p class="tool-desc">{t("tool.drift.related.circ.desc")}</p>',
        '<h3 class="tool-name">Deadzone Visualizer</h3>': '<h3 class="tool-name">{t("tool.drift.related.deadzone.title")}</h3>',
        '<p class="tool-desc">Find the ideal deadzone setting for competitive FPS games.</p>': '<p class="tool-desc">{t("tool.drift.related.deadzone.desc")}</p>',
        '<h3 class="tool-name">Polling Rate Checker</h3>': '<h3 class="tool-name">{t("tool.drift.related.polling.title")}</h3>',
        '<p class="tool-desc">Test controller response latency and polling rate in Hz.</p>': '<p class="tool-desc">{t("tool.drift.related.polling.desc")}</p>',
        '<h2>What Is Controller Stick Drift?</h2>': '<h2>{t("tool.drift.content.h2_1")}</h2>',
        "Controller stick drift is an analog thumbstick hardware defect where a controller registers phantom movement inputs despite both thumbsticks resting untouched at absolute center. It occurs when mechanical friction degrades potentiometer wiper contacts or dust accumulates inside the thumbstick module, triggering camera jitter or unintended character movement in competitive games.": "{t('tool.drift.content.p1')}",
        '<h3>Why Potentiometers Suffer from Drift</h3>': '<h3>{t("tool.drift.content.h3_1")}</h3>',
        "Most standard gamepads — including the PlayStation 5 DualSense, Xbox Wireless Controller, and Nintendo Switch Joy-Cons — use resistive potentiometer thumbsticks.\n      Inside each potentiometer, a metallic wiper glides over a resistive graphite track to measure movement. Over time, friction wears down the graphite layer,\n      creating microscopic debris that disrupts electrical resistance readings.": "{t('tool.drift.content.p2')}",
        '<h3>How to Fix Stick Drift: 3 Proven Steps</h3>': '<h3>{t("tool.drift.content.h3_2")}</h3>',
        "<strong>Clean with Isopropyl Alcohol:</strong> Turn off your controller, apply 2-3 drops of 99% isopropyl alcohol around the thumbstick ball joint,\n        rotate the stick 30 times, and let it dry for 15 minutes.": "<span set:html={t('tool.drift.content.li1')} />",
        "<strong>Adjust In-Game Deadzone:</strong> Open your game settings (e.g., Controller Settings → Deadzone) and increase the inner deadzone slider\n        until camera movement stops.": "<span set:html={t('tool.drift.content.li2')} />",
        "<strong>Upgrade to Hall-Effect Sticks:</strong> Replace your traditional potentiometers with Hall-effect magnetic stick modules, which eliminate friction\n        and never suffer from drift.": "<span set:html={t('tool.drift.content.li3')} />",
        '<h2>What this test cannot prove</h2>': '<h2>{t("tool.drift.content.h2_2")}</h2>',
        "This browser-based test measures the output of your operating system's controller driver, not the raw hardware sensors directly.\n      Therefore, it cannot distinguish between permanent mechanical wear and temporary environmental factors like dust or temperature.\n      It also cannot bypass driver-level deadzones enforced by Windows or macOS. For highest confidence, run this test multiple times over several days via a wired USB connection to rule out Bluetooth transport jitter.": "{t('tool.drift.content.p3')}"
    }

    with open(filepath, 'r') as f:
        content = f.read()

    # In localized pages, we need to inject the import useTranslations
    if is_localized and "useTranslations" not in content:
        lines = content.split('\n')
        # find where --- ends or something.
        for i, line in enumerate(lines):
            if i > 0 and line.strip() == '---':
                # Insert before the closing ---
                lines.insert(i, f"import {{ useTranslations }} from '../../../../i18n/utils';\nconst t = useTranslations('{lang}');")
                break
        content = '\n'.join(lines)
    elif not is_localized and "useTranslations" not in content:
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if i > 0 and line.strip() == '---':
                lines.insert(i, f"import {{ useTranslations }} from '../../../i18n/utils';\nconst t = useTranslations('en');")
                break
        content = '\n'.join(lines)

    for old, new in reps.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)


if __name__ == "__main__":
    process_header()
    process_footer()
    
    # Process English
    process_index("src/pages/index.astro", is_localized=False, lang='en')
    process_drift("src/pages/test/controller/drift.astro", is_localized=False, lang='en')
    
    languages = ["es", "de", "fr", "ja", "pt", "ko", "ru", "zh-tw", "it"]
    for lang in languages:
        idx_path = f"src/pages/{lang}/index.astro"
        drift_path = f"src/pages/{lang}/test/controller/drift.astro"
        process_index(idx_path, is_localized=True, lang=lang)
        process_drift(drift_path, is_localized=True, lang=lang)
