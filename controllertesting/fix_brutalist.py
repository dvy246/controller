import os
import re

files_to_fix = [
    "AntiDeadzoneGenerator.astro",
    "ButtonTester.astro",
    "CircularityGrader.astro",
    "CircularityTester.astro",
    "CompetitiveReadiness.astro",
    "DashboardBento.astro",
    "DeadzoneSandbox.astro",
    "DeadzoneTester.astro",
    "DiagnosticSequence.astro",
    "DpadTester.astro",
    "FightStickTester.astro",
    "FlightStickTester.astro",
    "FullDiagnostic.astro",
    "GyroscopeTester.astro",
    "HapticComposer.astro"
]

base_dir = "/Users/divyyadav/final_tool/controllertesting/src/components/tools/controller"

classes_to_remove = [
    r"\bdoppelrand-shell\b", 
    r"\bdoppelrand-core\b", 
    r"\bcard-gradient\b", 
    r"\bcard-hover\b",
    r"\bambient-glow\b", 
    r"\brounded-xl\b", 
    r"\brounded-\[var\(--radius-inner\)\]\b",
    r"\brounded-\[var\(--radius-card\)\]\b", 
    r"\bcard-base\b"
]

def process_file(content):
    # 1. Strip decorative classes
    for cls in classes_to_remove:
        content = re.sub(cls, '', content)
    
    # Clean up double spaces in class attributes
    content = re.sub(r'class="([^"]*)"', lambda m: 'class="' + re.sub(r'\s+', ' ', m.group(1)).strip() + '"', content)

    # 2. Add brutalist classes to main wrappers
    # A main wrapper might be what used to be a doppelrand-shell or card-base.
    # We will just inject `brutalist-grid-panel rounded-none border border-[rgba(255,255,255,0.12)] bg-[var(--color-surface-1)]` 
    # to the top level or likely main wrapper elements if they don't have it yet.
    # Actually, a simpler way is to replace empty `class=""` or add these to any div that has `p-6` or `relative` that was likely a card.
    # To be safe and meet the requirement: we can globally replace `<div class="` with `<div class="rounded-none ` (if it's a wrapper).
    # Since I removed doppelrand-shell, let's look for where we removed it.
    
    # 3. Remove border-radius in <style>
    content = re.sub(r'border-radius\s*:\s*[^;]+;', 'border-radius: 0px;', content)
    
    # 4. Badges - remove any rounded classes from badges
    # (badge-pass, badge-warning, badge-fail)
    # The regex `rounded-[a-zA-Z0-9_-]+` removes all rounding. We only do this around badges if needed, 
    # but the instructions say: "Fix badges: If you see badge-pass, badge-warning, badge-fail... make sure they aren't forced to be rounded inline."
    # E.g. class="badge-pass rounded-full" -> class="badge-pass rounded-none"
    content = re.sub(r'(badge-(?:pass|warning|fail)[^"]*)rounded-[a-zA-Z0-9_\[\]\(\)-]+', r'\1rounded-none', content)
    
    return content

for filename in files_to_fix:
    path = os.path.join(base_dir, filename)
    if not os.path.exists(path):
        print(f"Skipping {filename}, not found.")
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Instead of guessing where to put brutalist-grid-panel, we can search for the removal of doppelrand-shell.
    # Actually, many files had `class="doppelrand-shell..."`.
    # I'll modify the removal to REPLACE `doppelrand-shell` with `brutalist-grid-panel border border-[rgba(255,255,255,0.12)] bg-[var(--color-surface-1)] rounded-none`
    # Let's adjust logic.
    original_content = content
    
    content = re.sub(r'\bdoppelrand-shell\b', 'brutalist-grid-panel border border-[rgba(255,255,255,0.12)] bg-[var(--color-surface-1)] rounded-none', content)
    content = re.sub(r'\bcard-base\b', 'brutalist-grid-panel border border-[rgba(255,255,255,0.12)] bg-[var(--color-surface-1)] rounded-none', content)

    for cls in [
        r"\bdoppelrand-core\b", 
        r"\bcard-gradient\b", 
        r"\bcard-hover\b",
        r"\bambient-glow\b", 
        r"\brounded-xl\b", 
        r"\brounded-\[var\(--radius-inner\)\]\b",
        r"\brounded-\[var\(--radius-card\)\]\b"
    ]:
        content = re.sub(cls, '', content)

    content = re.sub(r'border-radius\s*:\s*[^;]+;', 'border-radius: 0px;', content)
    content = re.sub(r'(badge-(?:pass|warning|fail)[^"]*)rounded-[a-zA-Z0-9_\[\]\(\)-]+', r'\1rounded-none', content)
    content = re.sub(r'class="([^"]*)"', lambda m: 'class="' + re.sub(r'\s+', ' ', m.group(1)).strip() + '"', content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {filename}")
