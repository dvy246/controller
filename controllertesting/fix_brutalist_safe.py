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
    # 1. Modify class attributes only
    def replace_classes(m):
        class_str = m.group(1)
        
        # Replace doppelrand-shell
        if 'doppelrand-shell' in class_str:
            class_str = re.sub(r'\bdoppelrand-shell\b', 'brutalist-grid-panel border border-[rgba(255,255,255,0.12)] bg-[var(--color-surface-1)] rounded-none', class_str)
            
        if 'card-base' in class_str:
            class_str = re.sub(r'\bcard-base\b', 'brutalist-grid-panel border border-[rgba(255,255,255,0.12)] bg-[var(--color-surface-1)] rounded-none', class_str)
            
        # Strip other classes
        for cls in classes_to_remove:
            class_str = re.sub(cls, '', class_str)
            
        # Strip rounding from badges
        if 'badge-pass' in class_str or 'badge-warning' in class_str or 'badge-fail' in class_str:
            class_str = re.sub(r'rounded-[a-zA-Z0-9_\[\]\(\)-]+', 'rounded-none', class_str)
            
        # Clean up spaces
        class_str = re.sub(r'\s+', ' ', class_str).strip()
        return f'class="{class_str}"'

    content = re.sub(r'class="([^"]*)"', replace_classes, content)
    
    # 2. Modify <style> blocks border-radius
    def fix_style_block(m):
        style_content = m.group(1)
        style_content = re.sub(r'border-radius\s*:\s*[^;]+;', 'border-radius: 0px;', style_content)
        return f'<style>{style_content}</style>'
        
    content = re.sub(r'<style>(.*?)</style>', fix_style_block, content, flags=re.DOTALL)
    
    return content

for filename in files_to_fix:
    path = os.path.join(base_dir, filename)
    if not os.path.exists(path):
        print(f"Skipping {filename}, not found.")
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = process_file(content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {filename}")
