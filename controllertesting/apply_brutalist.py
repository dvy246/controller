import os
import re

files_to_edit = [
    "HealthScore.astro", "Interactive2DVisualizer.astro", "Interactive3DVisualizer.astro",
    "InteractiveSilhouette.astro", "LatencyEstimator.astro", "MicrophoneTester.astro",
    "MultiController.astro", "OverclockValidator.astro", "PSCalibration.astro",
    "PollingRateTester.astro", "PremiumStickCanvas.astro", "QuickHealth.astro",
    "Realistic2DVisualizer.astro", "SettingsOptimizer.astro", "SketchfabVisualizer.astro"
]

base_dir = "/Users/divyyadav/final_tool/controllertesting/src/components/tools/controller/"

def process_file(fpath):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Strip decorative wrapper classes and apply Brutalist wrappers
    # "doppelrand-shell" -> "brutalist-grid-panel rounded-none"
    content = re.sub(r'\bdoppelrand-shell\b', 'brutalist-grid-panel rounded-none', content)
    # "doppelrand-core" -> "border border-[rgba(255,255,255,0.12)] bg-[var(--color-surface-1)] rounded-none"
    content = re.sub(r'\bdoppelrand-core\b', 'border border-[rgba(255,255,255,0.12)] bg-[var(--color-surface-1)] rounded-none', content)
    
    # Strip rounded and shadows
    classes_to_remove = [
        r'\bcard-gradient\b', r'\bcard-hover\b', r'\bambient-glow\b', r'\bcard-base\b',
        r'\brounded-3xl\b', r'\brounded-2xl\b', r'\brounded-xl\b', r'\brounded-lg\b', 
        r'\brounded-md\b', r'\brounded-sm\b', r'\brounded\b', r'\brounded-full\b',
        r'\brounded-\[.*?\]\b', # e.g. rounded-[var(--radius-inner)]
        r'\bshadow-2xl\b', r'\bshadow-xl\b', r'\bshadow-lg\b', r'\bshadow-md\b', r'\bshadow-sm\b', r'\bshadow\b',
        r'\bshadow-\[.*?\]\b',
        r'\bdrop-shadow-2xl\b', r'\bdrop-shadow-xl\b', r'\bdrop-shadow-lg\b', r'\bdrop-shadow-md\b', r'\bdrop-shadow-sm\b', r'\bdrop-shadow\b',
        r'\bdrop-shadow-\[.*?\]\b'
    ]
    for cls in classes_to_remove:
        content = re.sub(cls, '', content)

    # 2. Use 0px border radius for all cards, panels, and badges
    def style_sub(match):
        style_content = match.group(1)
        # replace any border-radius: ...; with border-radius: 0px;
        style_content = re.sub(r'border-radius\s*:\s*[^;]+;', 'border-radius: 0px;', style_content)
        # remove box-shadows just in case
        style_content = re.sub(r'box-shadow\s*:\s*[^;]+;', '', style_content)
        return '<style>' + style_content + '</style>'
        
    content = re.sub(r'<style>(.*?)</style>', style_sub, content, flags=re.DOTALL)

    # Replace specific backgrounds with bg-[var(--color-surface-1)] if they are 0, 2, 3
    content = re.sub(r'bg-\[var\(--color-surface-(?:0|2|3)\)\]', 'bg-[var(--color-surface-1)]', content)
    # Use border solid 1px and ensure rounded-none is applied if they were badges/panels
    
    # Add rounded-none to common div/button/badge definitions if needed, though stripping rounded-* is usually enough in tailwind.
    # Let's ensure any button/badge gets rounded-none
    content = re.sub(r'(class="[^"]*?\bbadge-[a-z]+\b[^"]*?)', r'\1 rounded-none', content)
    
    # 3. Use strict 8px spatial padding (p-4, p-6). Replace non-standard padding.
    content = re.sub(r'\bp-1\.5\b', 'p-2', content)
    content = re.sub(r'\bp-2\.5\b', 'p-2', content)
    content = re.sub(r'\bp-3\b', 'p-4', content)
    content = re.sub(r'\bp-5\b', 'p-6', content)
    content = re.sub(r'\bp-\[0\.375rem\]\b', 'p-2', content)

    # 4. Use monospace fonts (font-mono) for data readouts, labels, metrics
    # In Astro components, anything with text-[color] could be a label, but let's safely add font-mono to text-sm, text-xs
    # content = re.sub(r'\b(text-xs|text-sm)\b', r'\1 font-mono', content) 
    # Actually, let's just make sure headers and labels get it.
    content = re.sub(r'class="([^"]*?)font-sans([^"]*?)"', r'class="\1font-mono\2"', content)
    
    # Additional font-mono injection for labels
    content = re.sub(r'(class="[^"]*?text-sm[^"]*?)(?!font-mono)([^"]*?")', r'\1 font-mono \2', content)
    content = re.sub(r'(class="[^"]*?text-xs[^"]*?)(?!font-mono)([^"]*?")', r'\1 font-mono \2', content)
    content = re.sub(r'(class="[^"]*?text-micro[^"]*?)(?!font-mono)([^"]*?")', r'\1 font-mono \2', content)

    if content != original_content:
        # Cleanup double spaces in classes
        content = re.sub(r'class="([^"]+)"', lambda m: 'class="' + re.sub(r'\s+', ' ', m.group(1)).strip() + '"', content)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(fpath)}")
    else:
        print(f"No changes for {os.path.basename(fpath)}")

for fname in files_to_edit:
    fpath = os.path.join(base_dir, fname)
    if os.path.exists(fpath):
        process_file(fpath)
    else:
        print(f"File not found: {fpath}")
